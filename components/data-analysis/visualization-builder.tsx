"use client"

import { useState, useMemo, useRef } from "react"
import {
  ComposedChart,
  BarChart,
  Bar,
  Area,
  Line,
  Scatter,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  ErrorBar,
  Cell,
} from "recharts"
import html2canvas from "html2canvas"

interface VisualizationBuilderProps {
  dataset: { raw: any[]; columns: string[]; columnTypes: { [key: string]: "numeric" | "categorical" } }
  filteredData: any[]
}

// ─── Helpers ──────────────────────────────────────────────────────────────────

function humanize(col: string) {
  return col.replace(/_/g, " ").replace(/\b\w/g, (c) => c.toUpperCase())
}

const PALETTE = ["#3b82f6", "#f59e0b", "#10b981", "#ef4444", "#8b5cf6", "#06b6d4", "#f97316", "#ec4899"]

/** OLS regression — returns params needed for ribbon + line */
function ols(data: { x: number; y: number }[]) {
  const n = data.length
  if (n < 3) return null
  const meanX = data.reduce((s, d) => s + d.x, 0) / n
  const meanY = data.reduce((s, d) => s + d.y, 0) / n
  const ssXX = data.reduce((s, d) => s + (d.x - meanX) ** 2, 0)
  const ssXY = data.reduce((s, d) => s + (d.x - meanX) * (d.y - meanY), 0)
  if (ssXX === 0) return null
  const slope = ssXY / ssXX
  const intercept = meanY - slope * meanX
  const residuals = data.map((d) => d.y - (slope * d.x + intercept))
  const mse = residuals.reduce((s, r) => s + r * r, 0) / (n - 2)
  const se = Math.sqrt(mse)
  return { slope, intercept, se, minX: Math.min(...data.map((d) => d.x)), maxX: Math.max(...data.map((d) => d.x)), meanX, ssXX, n }
}

/** Build ribbon points: fitted values ± 1.96 * SE_fit */
function regressionRibbon(reg: NonNullable<ReturnType<typeof ols>>, steps = 50) {
  const { slope, intercept, se, minX, maxX, meanX, ssXX, n } = reg
  return Array.from({ length: steps + 1 }, (_, i) => {
    const x = minX + ((maxX - minX) * i) / steps
    const yHat = slope * x + intercept
    const seFit = se * Math.sqrt(1 / n + (x - meanX) ** 2 / ssXX)
    return { x, yHat, upper: yHat + 1.96 * seFit, lower: yHat - 1.96 * seFit }
  })
}

/** Gaussian KDE (Silverman bandwidth) */
function kde(values: number[], steps = 80) {
  if (values.length < 2) return []
  const n = values.length
  const mean = values.reduce((a, b) => a + b, 0) / n
  const std = Math.sqrt(values.reduce((a, v) => a + (v - mean) ** 2, 0) / n)
  const h = 1.06 * std * Math.pow(n, -0.2)
  if (h === 0) return []
  const minV = Math.min(...values)
  const maxV = Math.max(...values)
  return Array.from({ length: steps + 1 }, (_, i) => {
    const x = minV + ((maxV - minV) * i) / steps
    const density =
      values.reduce((s, v) => s + Math.exp(-0.5 * ((x - v) / h) ** 2), 0) /
      (n * h * Math.sqrt(2 * Math.PI))
    return { x: +x.toFixed(3), density: +density.toFixed(6) }
  })
}

/** Mean + 95% CI */
function meanCI(values: number[]) {
  if (!values.length) return { mean: 0, ciHalf: 0 }
  const n = values.length
  const mean = values.reduce((a, b) => a + b, 0) / n
  const variance = values.reduce((a, v) => a + (v - mean) ** 2, 0) / Math.max(n - 1, 1)
  return { mean, ciHalf: 1.96 * Math.sqrt(variance / n) }
}

/** Boxplot stats */
function boxStats(values: number[]) {
  if (!values.length) return null
  const s = [...values].sort((a, b) => a - b)
  const q = (p: number) => {
    const i = p * (s.length - 1)
    const lo = Math.floor(i)
    return s[lo] + (s[Math.ceil(i)] - s[lo]) * (i - lo)
  }
  const q1 = q(0.25), q2 = q(0.5), q3 = q(0.75)
  const iqr = q3 - q1
  const wLo = s.find((v) => v >= q1 - 1.5 * iqr) ?? q1
  const wHi = [...s].reverse().find((v) => v <= q3 + 1.5 * iqr) ?? q3
  return { q1, q2, q3, iqr, wLo, wHi }
}

// ─── Boxplot SVG shape ────────────────────────────────────────────────────────

function BoxShape(props: any) {
  const { x, y: _y, width, payload, yAxis } = props
  if (!payload?.boxKey || !yAxis?.scale) return null
  const box = payload[payload.boxKey]
  if (!box) return null
  const { q1, q2, q3, wLo, wHi, fill } = box
  const sc = yAxis.scale
  const cx = x + width / 2
  const bL = x + width * 0.2
  const bR = x + width * 0.8

  return (
    <g>
      <line x1={cx} y1={sc(wHi)} x2={cx} y2={sc(q3)} stroke={fill} strokeWidth={1.5} />
      <line x1={bL} y1={sc(wHi)} x2={bR} y2={sc(wHi)} stroke={fill} strokeWidth={1.5} />
      <line x1={cx} y1={sc(wLo)} x2={cx} y2={sc(q1)} stroke={fill} strokeWidth={1.5} />
      <line x1={bL} y1={sc(wLo)} x2={bR} y2={sc(wLo)} stroke={fill} strokeWidth={1.5} />
      <rect
        x={bL} y={sc(q3)} width={bR - bL} height={Math.abs(sc(q1) - sc(q3))}
        fill={fill} fillOpacity={0.18} stroke={fill} strokeWidth={1.5}
      />
      <line x1={bL} y1={sc(q2)} x2={bR} y2={sc(q2)} stroke={fill} strokeWidth={2.5} />
    </g>
  )
}

// ─── Export button ────────────────────────────────────────────────────────────

function ExportButton({ chartRef }: { chartRef: React.RefObject<HTMLDivElement | null> }) {
  const run = async () => {
    if (!chartRef.current) return
    const canvas = await html2canvas(chartRef.current, { backgroundColor: "#ffffff", scale: 2 })
    const a = document.createElement("a")
    a.href = canvas.toDataURL("image/png")
    a.download = `chart-${Date.now()}.png`
    a.click()
  }
  return (
    <button
      onClick={run}
      title="Export as PNG"
      className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-gray-500 border border-gray-200 bg-white hover:bg-gray-50 rounded-lg transition-colors"
    >
      <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
      </svg>
      Export PNG
    </button>
  )
}

// ─── Shared styles ────────────────────────────────────────────────────────────

const selectCls = "w-full px-3 py-2 bg-white text-gray-700 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
const labelCls = "block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1"
const axisStyle = { fill: "#6b7280", fontSize: 11 }
const gridStroke = "#f3f4f6"
const tooltipStyle = {
  contentStyle: {
    backgroundColor: "#fff",
    border: "1px solid #e5e7eb",
    borderRadius: "8px",
    fontSize: "12px",
    boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1)",
  },
}

// ─── Main component ───────────────────────────────────────────────────────────

export default function VisualizationBuilder({ dataset, filteredData }: VisualizationBuilderProps) {
  const numericCols = dataset.columns.filter(
    (col) => dataset.columnTypes[col] === "numeric" && !col.toLowerCase().includes("id"),
  )
  const catCols = dataset.columns.filter(
    (col) => dataset.columnTypes[col] === "categorical" && !col.toLowerCase().includes("id"),
  )

  const [chartType, setChartType] = useState<"histogram" | "scatter" | "bar">("histogram")

  // Histogram
  const [histCol, setHistCol] = useState(numericCols[0] || "")
  const [numBins, setNumBins] = useState(20)
  const [showDensity, setShowDensity] = useState(false)
  const histRef = useRef<HTMLDivElement>(null)

  // Scatter
  const [scatterX, setScatterX] = useState(numericCols[0] || "")
  const [scatterY, setScatterY] = useState(numericCols[1] ?? numericCols[0] ?? "")
  const [scatterGroup, setScatterGroup] = useState("none")
  const [showRegLine, setShowRegLine] = useState(false)
  const [showRibbon, setShowRibbon] = useState(false)
  const scatterRef = useRef<HTMLDivElement>(null)

  // Bar / Boxplot
  const [barY, setBarY] = useState(numericCols[0] || "")
  const [barX, setBarX] = useState("none")
  const [barGroup, setBarGroup] = useState("none")
  const [showBoxplot, setShowBoxplot] = useState(false)
  const barRef = useRef<HTMLDivElement>(null)

  const getGroups = (col: string) =>
    col === "none" ? ["All"] : [...new Set(filteredData.map((r) => String(r[col])))].sort()

  // ── Histogram ───────────────────────────────────────────────────────────────

  const { histBins, densityCurve, histTotal } = useMemo(() => {
    const values = filteredData.map((r) => Number(r[histCol])).filter((v) => !isNaN(v))
    if (!values.length || !histCol) return { histBins: [], densityCurve: [], histTotal: 0 }
    const min = Math.min(...values), max = Math.max(...values)
    const bw = (max - min) / numBins || 1
    const counts = Array(numBins).fill(0)
    values.forEach((v) => {
      const idx = Math.min(numBins - 1, Math.floor((v - min) / bw))
      counts[idx]++
    })
    const histBins = counts.map((count, i) => {
      const x0 = min + i * bw
      return { mid: +(( x0 + bw / 2)).toFixed(3), count }
    })
    return { histBins, densityCurve: kde(values), histTotal: values.length }
  }, [histCol, numBins, filteredData])

  // ── Scatter ──────────────────────────────────────────────────────────────────

  const scatterGroups = getGroups(scatterGroup)

  const scatterPoints = useMemo(() => {
    const result: Record<string, { x: number; y: number }[]> = {}
    scatterGroups.forEach((g) => {
      const rows = scatterGroup === "none" ? filteredData : filteredData.filter((r) => String(r[scatterGroup]) === g)
      result[g] = rows.map((r) => ({ x: +r[scatterX], y: +r[scatterY] })).filter((d) => !isNaN(d.x) && !isNaN(d.y))
    })
    return result
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [scatterX, scatterY, scatterGroup, filteredData])

  const ribbons = useMemo(() => {
    if (!showRegLine) return {}
    const result: Record<string, ReturnType<typeof regressionRibbon>> = {}
    scatterGroups.forEach((g) => {
      const reg = ols(scatterPoints[g] || [])
      if (reg) result[g] = regressionRibbon(reg)
    })
    return result
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [showRegLine, scatterPoints])

  // ── Bar / Boxplot ────────────────────────────────────────────────────────────

  const barXGroups = getGroups(barX)
  const barColorGroups = getGroups(barGroup)

  const barData = useMemo(() => {
    return barXGroups.map((xg) => {
      const xRows = barX === "none" ? filteredData : filteredData.filter((r) => String(r[barX]) === xg)
      const entry: any = { category: xg }
      barColorGroups.forEach((cg, idx) => {
        const cgRows = barGroup === "none" ? xRows : xRows.filter((r) => String(r[barGroup]) === cg)
        const vals = cgRows.map((r) => Number(r[barY])).filter((v) => !isNaN(v))
        if (showBoxplot) {
          const b = boxStats(vals)
          if (b) entry[`_box_${idx}`] = { ...b, fill: PALETTE[idx % PALETTE.length], label: cg }
        } else {
          const { mean, ciHalf } = meanCI(vals)
          entry[`mean_${idx}`] = mean
          entry[`ci_${idx}`] = ciHalf
        }
      })
      return entry
    })
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [barY, barX, barGroup, showBoxplot, filteredData])

  // Y-domain for boxplot
  const boxYDomain = useMemo(() => {
    if (!showBoxplot) return ["auto", "auto"] as [string, string]
    const vals: number[] = []
    barData.forEach((d) => {
      barColorGroups.forEach((_, idx) => {
        const b = d[`_box_${idx}`]
        if (b) vals.push(b.wLo, b.wHi)
      })
    })
    if (!vals.length) return ["auto", "auto"] as [string, string]
    const pad = (Math.max(...vals) - Math.min(...vals)) * 0.1
    return [Math.min(...vals) - pad, Math.max(...vals) + pad] as [number, number]
  }, [showBoxplot, barData, barColorGroups])

  // ─────────────────────────────────────────────────────────────────────────────

  return (
    <div className="space-y-6">
      {/* Chart type pills */}
      <div className="flex flex-wrap gap-2">
        {([
          { id: "histogram", label: "Histogram" },
          { id: "scatter", label: "Scatter Plot" },
          { id: "bar", label: "Bar / Boxplot" },
        ] as const).map(({ id, label }) => (
          <button
            key={id}
            onClick={() => setChartType(id)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all border ${
              chartType === id
                ? "bg-blue-600 text-white border-blue-600 shadow-sm"
                : "bg-white text-gray-600 border-gray-300 hover:bg-gray-50"
            }`}
          >
            {label}
          </button>
        ))}
      </div>

      {/* ═══ HISTOGRAM ═══════════════════════════════════════════════════════ */}
      {chartType === "histogram" && (
        <div className="space-y-4">
          <div className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm">
            <h3 className="text-sm font-semibold text-gray-700 mb-4">Settings</h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className={labelCls}>Variable</label>
                <select value={histCol} onChange={(e) => setHistCol(e.target.value)} className={selectCls}>
                  {numericCols.map((col) => <option key={col} value={col}>{humanize(col)}</option>)}
                </select>
              </div>
              <div>
                <label className={labelCls}>Bins</label>
                <input type="number" min={3} max={100} value={numBins}
                  onChange={(e) => setNumBins(Math.max(3, Math.min(100, +e.target.value)))}
                  className={selectCls}
                />
              </div>
              <div className="flex items-end pb-1">
                <label className="flex items-center gap-2 text-sm text-gray-600 cursor-pointer">
                  <input type="checkbox" checked={showDensity} onChange={(e) => setShowDensity(e.target.checked)} className="rounded accent-blue-600" />
                  Overlay density curve
                </label>
              </div>
            </div>
          </div>

          {histBins.length > 0 && (
            <div className="bg-white border border-gray-200 rounded-xl shadow-sm">
              <div className="flex items-center justify-between px-5 pt-4 pb-2">
                <div>
                  <p className="text-sm font-semibold text-gray-700">Distribution of {humanize(histCol)}</p>
                  <p className="text-xs text-gray-400">n = {histTotal} observations</p>
                </div>
                <ExportButton chartRef={histRef} />
              </div>
              <div ref={histRef} className="px-5 pb-5 bg-white">
                <ResponsiveContainer width="100%" height={380}>
                  <ComposedChart data={histBins} margin={{ top: 10, right: 20, bottom: 40, left: 20 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke={gridStroke} />
                    <XAxis dataKey="mid" type="number" domain={["auto", "auto"]} tick={axisStyle}
                      label={{ value: humanize(histCol), position: "insideBottom", offset: -26, fill: "#6b7280", fontSize: 12 }}
                      tickFormatter={(v) => (+v).toFixed(1)}
                    />
                    <YAxis tick={axisStyle}
                      label={{ value: "Count", angle: -90, position: "insideLeft", offset: 15, fill: "#6b7280", fontSize: 12 }}
                    />
                    <Tooltip {...tooltipStyle}
                      formatter={(val, name) => [val, name === "count" ? "Count" : "Density"]}
                      labelFormatter={(v) => `Value ≈ ${(+v).toFixed(2)}`}
                    />
                    <Bar dataKey="count" fill="#3b82f6" fillOpacity={0.75} radius={[3, 3, 0, 0]} />
                  </ComposedChart>
                </ResponsiveContainer>
                {showDensity && densityCurve.length > 0 && (
                  <div className="mt-1">
                    <p className="text-xs text-gray-400 text-center mb-1">Density curve (Gaussian KDE, Silverman bandwidth)</p>
                    <ResponsiveContainer width="100%" height={120}>
                      <ComposedChart data={densityCurve} margin={{ top: 5, right: 20, bottom: 10, left: 20 }}>
                        <CartesianGrid strokeDasharray="3 3" stroke={gridStroke} />
                        <XAxis dataKey="x" type="number" domain={["auto", "auto"]} tick={{ ...axisStyle, fontSize: 10 }}
                          tickFormatter={(v) => (+v).toFixed(1)}
                        />
                        <YAxis tick={{ ...axisStyle, fontSize: 10 }}
                          label={{ value: "Density", angle: -90, position: "insideLeft", offset: 15, fill: "#6b7280", fontSize: 10 }}
                          tickFormatter={(v) => (+v).toFixed(4)}
                        />
                        <Area dataKey="density" type="monotone" stroke="#ef4444" fill="#ef4444" fillOpacity={0.15} strokeWidth={2} dot={false} />
                      </ComposedChart>
                    </ResponsiveContainer>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      )}

      {/* ═══ SCATTER PLOT ════════════════════════════════════════════════════ */}
      {chartType === "scatter" && (
        <div className="space-y-4">
          <div className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm">
            <h3 className="text-sm font-semibold text-gray-700 mb-4">Settings</h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-4">
              <div>
                <label className={labelCls}>X axis</label>
                <select value={scatterX} onChange={(e) => setScatterX(e.target.value)} className={selectCls}>
                  {numericCols.map((col) => <option key={col} value={col}>{humanize(col)}</option>)}
                </select>
              </div>
              <div>
                <label className={labelCls}>Y axis</label>
                <select value={scatterY} onChange={(e) => setScatterY(e.target.value)} className={selectCls}>
                  {numericCols.map((col) => <option key={col} value={col}>{humanize(col)}</option>)}
                </select>
              </div>
              <div>
                <label className={labelCls}>Color groups</label>
                <select value={scatterGroup} onChange={(e) => setScatterGroup(e.target.value)} className={selectCls}>
                  <option value="none">None</option>
                  {catCols.map((col) => <option key={col} value={col}>{humanize(col)}</option>)}
                </select>
              </div>
            </div>
            <div className="flex flex-wrap gap-5 pt-3 border-t border-gray-100">
              <label className="flex items-center gap-2 text-sm text-gray-600 cursor-pointer">
                <input type="checkbox" checked={showRegLine} onChange={(e) => setShowRegLine(e.target.checked)} className="rounded accent-blue-600" />
                Regression line
              </label>
              <label className="flex items-center gap-2 text-sm text-gray-600 cursor-pointer">
                <input type="checkbox" checked={showRibbon} onChange={(e) => setShowRibbon(e.target.checked)} disabled={!showRegLine} className="rounded accent-blue-600 disabled:opacity-40" />
                95% confidence ribbon
              </label>
            </div>
          </div>

          {Object.values(scatterPoints).some((pts) => pts.length > 0) && (
            <div className="bg-white border border-gray-200 rounded-xl shadow-sm">
              <div className="flex items-center justify-between px-5 pt-4 pb-2">
                <div>
                  <p className="text-sm font-semibold text-gray-700">{humanize(scatterY)} vs. {humanize(scatterX)}</p>
                  {scatterGroup !== "none" && <p className="text-xs text-gray-400">Grouped by {humanize(scatterGroup)}</p>}
                </div>
                <ExportButton chartRef={scatterRef} />
              </div>
              <div ref={scatterRef} className="px-5 pb-5 bg-white">
                <ResponsiveContainer width="100%" height={420}>
                  <ComposedChart margin={{ top: 10, right: 30, bottom: 40, left: 20 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke={gridStroke} />
                    <XAxis dataKey="x" type="number" domain={["auto", "auto"]} tick={axisStyle} name={humanize(scatterX)}
                      label={{ value: humanize(scatterX), position: "insideBottom", offset: -26, fill: "#6b7280", fontSize: 12 }}
                    />
                    <YAxis dataKey="y" type="number" domain={["auto", "auto"]} tick={axisStyle} name={humanize(scatterY)}
                      label={{ value: humanize(scatterY), angle: -90, position: "insideLeft", offset: 15, fill: "#6b7280", fontSize: 12 }}
                    />
                    <Tooltip {...tooltipStyle} formatter={(v, name) => [typeof v === "number" ? v.toFixed(2) : v, name]} />
                    {scatterGroups.length > 1 && <Legend verticalAlign="top" />}

                    {scatterGroups.map((g, idx) => (
                      <Scatter key={`pts-${g}`} name={g} data={scatterPoints[g] || []}
                        fill={PALETTE[idx % PALETTE.length]} fillOpacity={0.55} r={3}
                      />
                    ))}

                    {showRegLine && showRibbon && scatterGroups.map((g, idx) => {
                      const pts = ribbons[g]
                      if (!pts) return null
                      return (
                        <Area key={`rib-${g}`} data={pts} dataKey="upper" stroke="none"
                          fill={PALETTE[idx % PALETTE.length]} fillOpacity={0.1} type="monotone"
                          legendType="none" isAnimationActive={false}
                        />
                      )
                    })}

                    {showRegLine && scatterGroups.map((g, idx) => {
                      const pts = ribbons[g]
                      if (!pts) return null
                      return (
                        <Line key={`reg-${g}`} data={pts.map((p) => ({ x: p.x, y: p.yHat }))} dataKey="y"
                          stroke={PALETTE[idx % PALETTE.length]} strokeWidth={2} dot={false} type="monotone"
                          legendType="none" isAnimationActive={false}
                        />
                      )
                    })}
                  </ComposedChart>
                </ResponsiveContainer>
              </div>
            </div>
          )}
        </div>
      )}

      {/* ═══ BAR / BOXPLOT ═══════════════════════════════════════════════════ */}
      {chartType === "bar" && (
        <div className="space-y-4">
          <div className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm">
            <h3 className="text-sm font-semibold text-gray-700 mb-4">Settings</h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-4">
              <div>
                <label className={labelCls}>Numeric variable (Y)</label>
                <select value={barY} onChange={(e) => setBarY(e.target.value)} className={selectCls}>
                  {numericCols.map((col) => <option key={col} value={col}>{humanize(col)}</option>)}
                </select>
              </div>
              <div>
                <label className={labelCls}>X axis groups</label>
                <select value={barX} onChange={(e) => setBarX(e.target.value)} className={selectCls}>
                  <option value="none">None (overall)</option>
                  {catCols.map((col) => <option key={col} value={col}>{humanize(col)}</option>)}
                </select>
              </div>
              <div>
                <label className={labelCls}>Color groups</label>
                <select value={barGroup} onChange={(e) => setBarGroup(e.target.value)} className={selectCls}>
                  <option value="none">None</option>
                  {catCols.filter((c) => c !== barX).map((col) => <option key={col} value={col}>{humanize(col)}</option>)}
                </select>
              </div>
            </div>
            <div className="flex flex-wrap gap-5 pt-3 border-t border-gray-100">
              <label className="flex items-center gap-2 text-sm text-gray-600 cursor-pointer">
                <input type="checkbox" checked={showBoxplot} onChange={(e) => setShowBoxplot(e.target.checked)} className="rounded accent-blue-600" />
                Show boxplots
              </label>
              {!showBoxplot && <span className="text-xs text-gray-400 self-center">Bars show group means ± 95% CI</span>}
            </div>
          </div>

          {barData.length > 0 && (
            <div className="bg-white border border-gray-200 rounded-xl shadow-sm">
              <div className="flex items-center justify-between px-5 pt-4 pb-2">
                <div>
                  <p className="text-sm font-semibold text-gray-700">
                    {showBoxplot ? "Distribution of" : "Mean"} {humanize(barY)}
                    {barX !== "none" && ` by ${humanize(barX)}`}
                    {barGroup !== "none" && `, grouped by ${humanize(barGroup)}`}
                  </p>
                  {!showBoxplot && <p className="text-xs text-gray-400">Error bars = 95% CI for the mean</p>}
                </div>
                <ExportButton chartRef={barRef} />
              </div>
              <div ref={barRef} className="px-5 pb-5 bg-white">
                <ResponsiveContainer width="100%" height={380}>
                  <BarChart data={barData} margin={{ top: 10, right: 30, bottom: 40, left: 20 }} barCategoryGap="25%" barGap={4}>
                    <CartesianGrid strokeDasharray="3 3" stroke={gridStroke} />
                    <XAxis dataKey="category" tick={axisStyle}
                      label={barX !== "none" ? { value: humanize(barX), position: "insideBottom", offset: -26, fill: "#6b7280", fontSize: 12 } : undefined}
                    />
                    <YAxis domain={boxYDomain} tick={axisStyle}
                      label={{ value: showBoxplot ? humanize(barY) : `Mean ${humanize(barY)}`, angle: -90, position: "insideLeft", offset: 15, fill: "#6b7280", fontSize: 12 }}
                    />
                    <Tooltip
                      {...tooltipStyle}
                      content={showBoxplot ? ({ active, payload }) => {
                        if (!active || !payload?.length) return null
                        const d = payload[0]?.payload
                        return (
                          <div className="bg-white border border-gray-200 rounded-lg p-3 text-xs shadow-lg space-y-2">
                            <p className="font-semibold text-gray-700">{d?.category}</p>
                            {barColorGroups.map((cg, idx) => {
                              const b = d?.[`_box_${idx}`]
                              if (!b) return null
                              return (
                                <div key={cg}>
                                  {barColorGroups.length > 1 && <p className="text-gray-500 font-medium capitalize">{cg}</p>}
                                  <p>Median: <span className="font-semibold">{b.q2.toFixed(2)}</span></p>
                                  <p>Q1–Q3: {b.q1.toFixed(2)} – {b.q3.toFixed(2)}</p>
                                  <p>Whiskers: {b.wLo.toFixed(2)} – {b.wHi.toFixed(2)}</p>
                                </div>
                              )
                            })}
                          </div>
                        )
                      } : undefined}
                      formatter={!showBoxplot ? (val, name) => [typeof val === "number" ? val.toFixed(2) : val, name] : undefined}
                    />
                    {barColorGroups.length > 1 && <Legend verticalAlign="top" />}

                    {barColorGroups.map((cg, idx) => (
                      showBoxplot ? (
                        <Bar key={cg} dataKey={`_box_${idx}`} name={cg === "All" ? humanize(barY) : cg}
                          fill="transparent" stroke="transparent"
                          shape={(props: any) => (
                            <BoxShape {...props} payload={{ ...props.payload, boxKey: `_box_${idx}` }} />
                          )}
                        >
                          {barData.map((_, i) => <Cell key={i} fill={PALETTE[idx % PALETTE.length]} />)}
                        </Bar>
                      ) : (
                        <Bar key={cg} dataKey={`mean_${idx}`} name={cg === "All" ? humanize(barY) : cg}
                          fill={PALETTE[idx % PALETTE.length]} fillOpacity={0.8} radius={[4, 4, 0, 0]}
                        >
                          <ErrorBar dataKey={`ci_${idx}`} width={4} strokeWidth={1.5} stroke={PALETTE[idx % PALETTE.length]} />
                        </Bar>
                      )
                    ))}
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  )
}
