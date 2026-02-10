"use client"

import { useState, useMemo } from "react"
import { motion } from "framer-motion"
import { BarChart, Bar, LineChart, Line, ScatterChart, Scatter, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, ReferenceLine } from "recharts"
import html2canvas from "html2canvas"

interface VisualizationBuilderProps {
  dataset: { raw: any[]; columns: string[]; columnTypes: { [key: string]: "numeric" | "categorical" } }
  filteredData: any[]
}

export default function VisualizationBuilder({ dataset, filteredData }: VisualizationBuilderProps) {
  const numericColumns = dataset.columns.filter(
    (col) => dataset.columnTypes[col] === "numeric" && !col.toLowerCase().includes("id"),
  )
  const categoricalColumns = dataset.columns.filter(
    (col) => dataset.columnTypes[col] === "categorical" && !col.toLowerCase().includes("id"),
  )

  const [chartType, setChartType] = useState<"histogram" | "scatter" | "bar">("histogram")
  const [binWidth, setBinWidth] = useState(10)
  const [histColumn, setHistColumn] = useState(numericColumns[0] || "")
  const [scatterX, setScatterX] = useState(numericColumns[0] || "")
  const [scatterY, setScatterY] = useState(numericColumns.length > 1 ? numericColumns[1] : numericColumns[0] || "")
  const [scatterRegressionLine, setScatterRegressionLine] = useState(false)
  const [barColumn, setBarColumn] = useState(numericColumns[0] || "")
  const [barCategories, setBarCategories] = useState<string[]>(categoricalColumns.slice(0, 1))
  const [barShowCI, setBarShowCI] = useState(false)
  const [barUseLineChart, setBarUseLineChart] = useState(false)
  const [scatterFacet, setScatterFacet] = useState<string | null>(null)

  const getUniqueValues = (column: string) => {
    return [...new Set(filteredData.map((row) => String(row[column])))].sort()
  }

  // Histogram data
  const histogramData = useMemo(() => {
    if (!histColumn) return []
    const values = filteredData.map((row) => Number(row[histColumn])).filter((v) => !isNaN(v))
    if (values.length === 0) return []

    const min = Math.min(...values)
    const max = Math.max(...values)
    const bins: { [key: number]: number } = {}

    for (let i = min; i <= max; i += binWidth) {
      bins[i] = 0
    }

    values.forEach((v) => {
      const binKey = Math.floor(v / binWidth) * binWidth
      bins[binKey] = (bins[binKey] || 0) + 1
    })

    return Object.entries(bins).map(([key, count]) => ({
      range: `${key}-${Number(key) + binWidth}`,
      count,
    }))
  }, [histColumn, binWidth, filteredData])

  // Scatter data - simplified without faceting
  const scatterData = useMemo(() => {
    if (!scatterX || !scatterY) return []

    const data = filteredData
      .map((row) => ({
        x: Number(row[scatterX]),
        y: Number(row[scatterY]),
      }))
      .filter((d) => !isNaN(d.x) && !isNaN(d.y))

    return data
  }, [scatterX, scatterY, filteredData])

  // Calculate regression line if requested
  const regressionLine = useMemo(() => {
    if (!scatterRegressionLine || scatterData.length < 2) return { slope: 0, intercept: 0, data: [] }

    const n = scatterData.length
    const sumX = scatterData.reduce((acc, d) => acc + d.x, 0)
    const sumY = scatterData.reduce((acc, d) => acc + d.y, 0)
    const sumXY = scatterData.reduce((acc, d) => acc + d.x * d.y, 0)
    const sumX2 = scatterData.reduce((acc, d) => acc + d.x * d.x, 0)

    const slope = (n * sumXY - sumX * sumY) / (n * sumX2 - sumX * sumX)
    const intercept = (sumY - slope * sumX) / n

    // Calculate residuals for confidence interval
    const residuals = scatterData.map((d) => d.y - (slope * d.x + intercept))
    const mse = residuals.reduce((acc, r) => acc + r * r, 0) / (n - 2)
    const se = Math.sqrt(mse)

    const minX = Math.min(...scatterData.map((d) => d.x))
    const maxX = Math.max(...scatterData.map((d) => d.x))

    const regressionData = [
      { x: minX, y: slope * minX + intercept, upper: slope * minX + intercept + 1.96 * se, lower: slope * minX + intercept - 1.96 * se },
      { x: maxX, y: slope * maxX + intercept, upper: slope * maxX + intercept + 1.96 * se, lower: slope * maxX + intercept - 1.96 * se },
    ]

    return { slope, intercept, data: regressionData }
  }, [scatterRegressionLine, scatterData])

  // Bar chart data with multiple categorical variables
  const barData = useMemo(() => {
    if (barCategories.length === 0 || !barColumn) return []

    if (barCategories.length === 1) {
      // Single category: simple grouping by category
      const grouped: { [key: string]: number } = {}

      filteredData.forEach((row) => {
        const key = String(row[barCategories[0]])
        grouped[key] = (grouped[key] || 0) + Number(row[barColumn])
      })

      return Object.entries(grouped).map(([key, value]) => ({
        category: key,
        value,
      }))
    } else {
      // Multiple categories: group by first category, color by second
      const grouped: { [key: string]: { [key: string]: number } } = {}

      filteredData.forEach((row) => {
        const xKey = String(row[barCategories[0]])
        const colorKey = String(row[barCategories[1]])

        if (!grouped[xKey]) grouped[xKey] = {}
        grouped[xKey][colorKey] = (grouped[xKey][colorKey] || 0) + Number(row[barColumn])
      })

      // Flatten to array format for Recharts with color groups
      const allColorKeys = [...new Set(filteredData.map((row) => String(row[barCategories[1]])))]

      return Object.entries(grouped).map(([xKey, colorGroups]) => {
        const dataPoint: any = { name: xKey }
        allColorKeys.forEach((colorKey) => {
          dataPoint[colorKey] = colorGroups[colorKey] || 0
        })
        return dataPoint
      })
    }
  }, [barColumn, barCategories, filteredData])

  const exportChart = async (chartId: string) => {
    const element = document.getElementById(chartId)
    if (element) {
      const canvas = await html2canvas(element, { backgroundColor: "#0f172a" })
      const link = document.createElement("a")
      link.href = canvas.toDataURL("image/png")
      link.download = `chart-${Date.now()}.png`
      link.click()
    }
  }

  const COLORS = ["#14b8a6", "#06b6d4", "#0891b2", "#0284c7", "#2563eb", "#7c3aed", "#a855f7", "#d946ef"]

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="space-y-6"
    >
      {/* Chart Type Selector */}
      <div className="bg-slate-800/50 backdrop-blur-sm border border-teal-500/20 rounded-xl p-6">
        <h3 className="text-lg font-bold text-teal-300 mb-4">Choose Visualization</h3>
        <div className="flex flex-wrap gap-2">
          {["histogram", "scatter", "bar"].map((type) => (
            <button
              key={type}
              onClick={() => setChartType(type as "histogram" | "scatter" | "bar")}
              className={`px-4 py-2 rounded-lg font-semibold transition-all ${
                chartType === type
                  ? "bg-gradient-to-r from-teal-600 to-emerald-600 text-white"
                  : "bg-slate-700 text-gray-300 hover:bg-slate-600"
              }`}
            >
              {type.charAt(0).toUpperCase() + type.slice(1)}
            </button>
          ))}
        </div>
      </div>

      {/* Histogram */}
      {chartType === "histogram" && (
        <div className="space-y-4">
          <div className="bg-slate-800/50 backdrop-blur-sm border border-teal-500/20 rounded-xl p-6">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-teal-300 mb-2">Variable</label>
                <select
                  value={histColumn}
                  onChange={(e) => setHistColumn(e.target.value)}
                  className="w-full px-4 py-2 bg-slate-700 text-gray-100 border border-teal-500/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                >
                  {numericColumns.map((col) => (
                    <option key={col} value={col}>
                      {col}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-semibold text-teal-300 mb-2">Bin Width</label>
                <input
                  type="number"
                  value={binWidth}
                  onChange={(e) => setBinWidth(Math.max(1, Number(e.target.value)))}
                  className="w-full px-4 py-2 bg-slate-700 text-gray-100 border border-teal-500/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                />
              </div>
            </div>
          </div>

          {histogramData.length > 0 && (
            <div id="histogram-chart" className="bg-slate-800/50 backdrop-blur-sm border border-teal-500/20 rounded-xl p-6">
              <ResponsiveContainer width="100%" height={400}>
                <BarChart data={histogramData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                  <XAxis dataKey="range" tick={{ fill: "#cbd5e1", fontSize: 12 }} />
                  <YAxis tick={{ fill: "#cbd5e1", fontSize: 12 }} />
                  <Tooltip
                    contentStyle={{ backgroundColor: "#1e293b", border: "1px solid #14b8a6", borderRadius: "8px" }}
                    formatter={(value) => (typeof value === "number" ? value.toFixed(2) : value)}
                  />
                  <Bar dataKey="count" fill="#14b8a6" radius={[8, 8, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
              <button
                onClick={() => exportChart("histogram-chart")}
                className="mt-4 w-full px-4 py-2 bg-emerald-700 hover:bg-emerald-600 text-white rounded-lg transition-colors font-semibold"
              >
                Export as PNG
              </button>
            </div>
          )}
        </div>
      )}

      {/* Scatter Plot */}
      {chartType === "scatter" && (
        <div className="space-y-4">
          <div className="bg-slate-800/50 backdrop-blur-sm border border-teal-500/20 rounded-xl p-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-semibold text-teal-300 mb-2">X Variable</label>
                <select
                  value={scatterX}
                  onChange={(e) => setScatterX(e.target.value)}
                  className="w-full px-4 py-2 bg-slate-700 text-gray-100 border border-teal-500/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                >
                  {numericColumns.map((col) => (
                    <option key={col} value={col}>
                      {col}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-semibold text-teal-300 mb-2">Y Variable</label>
                <select
                  value={scatterY}
                  onChange={(e) => setScatterY(e.target.value)}
                  className="w-full px-4 py-2 bg-slate-700 text-gray-100 border border-teal-500/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                >
                  {numericColumns.map((col) => (
                    <option key={col} value={col}>
                      {col}
                    </option>
                  ))}
                </select>
              </div>
              <div className="flex items-end">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={scatterRegressionLine}
                    onChange={(e) => setScatterRegressionLine(e.target.checked)}
                    className="w-4 h-4 rounded bg-slate-700 border-teal-500/50 accent-teal-500"
                  />
                  <span className="text-sm text-teal-300 font-semibold">Add Regression Line</span>
                </label>
              </div>
            </div>
          </div>

          {scatterData.length > 0 && (
            <div id="scatter-chart" className="bg-slate-800/50 backdrop-blur-sm border border-teal-500/20 rounded-xl p-6">
              <ResponsiveContainer width="100%" height={400}>
                <ScatterChart margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                  <XAxis type="number" dataKey="x" tick={{ fill: "#cbd5e1", fontSize: 12 }} label={{ value: scatterX, position: "right", offset: 0, fill: "#cbd5e1" }} />
                  <YAxis type="number" dataKey="y" tick={{ fill: "#cbd5e1", fontSize: 12 }} label={{ value: scatterY, angle: -90, position: "left", fill: "#cbd5e1" }} />
                  <Tooltip
                    contentStyle={{ backgroundColor: "#1e293b", border: "1px solid #14b8a6", borderRadius: "8px" }}
                    formatter={(value) => (typeof value === "number" ? value.toFixed(2) : value)}
                  />
                  <Scatter name="Data" data={scatterData} fill="#14b8a6" />
                  {scatterRegressionLine && regressionLine.data.length > 0 && (
                    <Scatter name="Regression" data={regressionLine.data} line={{ stroke: "#f97316", strokeWidth: 2 }} fill="none" />
                  )}
                </ScatterChart>
              </ResponsiveContainer>
              <button
                onClick={() => exportChart("scatter-chart")}
                className="mt-4 w-full px-4 py-2 bg-emerald-700 hover:bg-emerald-600 text-white rounded-lg transition-colors font-semibold"
              >
                Export as PNG
              </button>
            </div>
          )}
        </div>
      )}

      {/* Bar/Line Chart */}
      {chartType === "bar" && (
        <div className="space-y-4">
          <div className="bg-slate-800/50 backdrop-blur-sm border border-teal-500/20 rounded-xl p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-teal-300 mb-2">Value Variable</label>
                <select
                  value={barColumn}
                  onChange={(e) => setBarColumn(e.target.value)}
                  className="w-full px-4 py-2 bg-slate-700 text-gray-100 border border-teal-500/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                >
                  {numericColumns.map((col) => (
                    <option key={col} value={col}>
                      {col}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-semibold text-teal-300 mb-2">Category Variables</label>
                <div className="flex flex-wrap gap-2">
                  {categoricalColumns.map((col) => (
                    <button
                      key={col}
                      onClick={() =>
                        setBarCategories(
                          barCategories.includes(col) ? barCategories.filter((c) => c !== col) : [...barCategories, col],
                        )
                      }
                      className={`px-3 py-1 rounded text-xs font-semibold transition-all ${
                        barCategories.includes(col)
                          ? "bg-teal-600 text-white"
                          : "bg-slate-700 text-gray-300 hover:bg-slate-600"
                      }`}
                    >
                      {col}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="mt-4 flex flex-wrap gap-4 border-t border-teal-500/10 pt-4">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={barUseLineChart}
                  onChange={(e) => setBarUseLineChart(e.target.checked)}
                  className="w-4 h-4 rounded bg-slate-700 border-teal-500/50 accent-teal-500"
                />
                <span className="text-sm text-teal-300 font-semibold">Use Line Chart</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={barShowCI}
                  onChange={(e) => setBarShowCI(e.target.checked)}
                  className="w-4 h-4 rounded bg-slate-700 border-teal-500/50 accent-teal-500"
                />
                <span className="text-sm text-teal-300 font-semibold">Show 95% Confidence Intervals</span>
              </label>
            </div>
          </div>

          {barData.length > 0 && (
            <div id="bar-chart" className="bg-slate-800/50 backdrop-blur-sm border border-teal-500/20 rounded-xl p-6">
              <ResponsiveContainer width="100%" height={400}>
                {barUseLineChart ? (
                  <LineChart data={barData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                    <XAxis dataKey="name" tick={{ fill: "#cbd5e1", fontSize: 12 }} />
                    <YAxis tick={{ fill: "#cbd5e1", fontSize: 12 }} />
                    <Tooltip
                      contentStyle={{ backgroundColor: "#1e293b", border: "1px solid #14b8a6", borderRadius: "8px" }}
                      formatter={(value) => (typeof value === "number" ? value.toFixed(2) : value)}
                    />
                    {barCategories.length > 1 && <Legend />}
                    {barCategories.length > 1 ? (
                      [...new Set(filteredData.map((row) => String(row[barCategories[1]])))].map((colorKey, idx) => (
                        <Line key={colorKey} type="monotone" dataKey={colorKey} stroke={COLORS[idx % COLORS.length]} dot={{ fill: COLORS[idx % COLORS.length] }} />
                      ))
                    ) : (
                      <Line type="monotone" dataKey="value" stroke="#14b8a6" dot={{ fill: "#14b8a6" }} />
                    )}
                  </LineChart>
                ) : (
                  <BarChart data={barData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                    <XAxis dataKey="name" tick={{ fill: "#cbd5e1", fontSize: 12 }} />
                    <YAxis tick={{ fill: "#cbd5e1", fontSize: 12 }} />
                    <Tooltip
                      contentStyle={{ backgroundColor: "#1e293b", border: "1px solid #14b8a6", borderRadius: "8px" }}
                      formatter={(value) => (typeof value === "number" ? value.toFixed(2) : value)}
                    />
                    {barCategories.length > 1 && <Legend />}
                    {barCategories.length > 1 ? (
                      [...new Set(filteredData.map((row) => String(row[barCategories[1]])))].map((colorKey, idx) => (
                        <Bar key={colorKey} dataKey={colorKey} fill={COLORS[idx % COLORS.length]} />
                      ))
                    ) : (
                      <Bar dataKey="value" fill="#14b8a6" />
                    )}
                  </BarChart>
                )}
              </ResponsiveContainer>
              <button
                onClick={() => exportChart("bar-chart")}
                className="mt-4 w-full px-4 py-2 bg-emerald-700 hover:bg-emerald-600 text-white rounded-lg transition-colors font-semibold"
              >
                Export as PNG
              </button>
            </div>
          )}
        </div>
      )}
    </motion.div>
  )
}
