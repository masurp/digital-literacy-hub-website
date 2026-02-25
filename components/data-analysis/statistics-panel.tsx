"use client"

import { useState, useMemo } from "react"

interface Project {
  id: string
  name: string
  variableExplanations?: { [key: string]: string }
}

interface StatisticsPanelProps {
  dataset: { raw: any[]; columns: string[]; columnTypes: { [key: string]: "numeric" | "categorical" } }
  filteredData: any[]
  project?: Project | null
}

function humanize(col: string) {
  return col.replace(/_/g, " ").replace(/\b\w/g, (c) => c.toUpperCase())
}

export default function StatisticsPanel({ dataset, filteredData, project }: StatisticsPanelProps) {
  const numericCols = dataset.columns.filter(
    (col) => dataset.columnTypes[col] === "numeric" && !col.toLowerCase().includes("id"),
  )
  const [selectedCol, setSelectedCol] = useState(numericCols[0] || "")

  if (selectedCol && !numericCols.includes(selectedCol)) {
    setSelectedCol(numericCols[0] || "")
  }

  const stats = useMemo(() => {
    if (!selectedCol || !numericCols.includes(selectedCol)) return null
    const values = filteredData.map((r) => Number(r[selectedCol])).filter((v) => !isNaN(v))
    if (!values.length) return null
    const sorted = [...values].sort((a, b) => a - b)
    const n = values.length
    const mean = values.reduce((a, b) => a + b, 0) / n
    const variance = values.reduce((a, v) => a + (v - mean) ** 2, 0) / n
    const sd = Math.sqrt(variance)
    const q = (p: number) => {
      const i = p * (sorted.length - 1)
      const lo = Math.floor(i)
      return sorted[lo] + (sorted[Math.ceil(i)] - sorted[lo]) * (i - lo)
    }
    const skewness =
      values.reduce((a, v) => a + ((v - mean) / sd) ** 3, 0) / n
    const kurtosis =
      values.reduce((a, v) => a + ((v - mean) / sd) ** 4, 0) / n - 3
    return {
      n,
      mean: mean.toFixed(3),
      median: q(0.5).toFixed(3),
      sd: sd.toFixed(3),
      se: (sd / Math.sqrt(n)).toFixed(3),
      min: sorted[0].toFixed(3),
      max: sorted[sorted.length - 1].toFixed(3),
      q1: q(0.25).toFixed(3),
      q3: q(0.75).toFixed(3),
      skewness: skewness.toFixed(3),
      kurtosis: kurtosis.toFixed(3),
    }
  }, [selectedCol, filteredData, numericCols.join(",")])

  const correlations = useMemo(() => {
    if (numericCols.length < 2) return {}
    const result: Record<string, number> = {}
    for (let i = 0; i < numericCols.length; i++) {
      for (let j = i + 1; j < numericCols.length; j++) {
        const c1 = numericCols[i], c2 = numericCols[j]
        const v1 = filteredData.map((r) => +r[c1]).filter((v) => !isNaN(v))
        const v2 = filteredData.map((r) => +r[c2]).filter((v) => !isNaN(v))
        if (!v1.length || !v2.length) continue
        const m1 = v1.reduce((a, b) => a + b, 0) / v1.length
        const m2 = v2.reduce((a, b) => a + b, 0) / v2.length
        const len = Math.min(v1.length, v2.length)
        let num = 0, d1 = 0, d2 = 0
        for (let k = 0; k < len; k++) {
          num += (v1[k] - m1) * (v2[k] - m2)
          d1 += (v1[k] - m1) ** 2
          d2 += (v2[k] - m2) ** 2
        }
        const r = num / Math.sqrt(d1 * d2)
        result[`${c1}|||${c2}`] = isNaN(r) ? 0 : r
      }
    }
    return result
  }, [numericCols.join(","), filteredData])

  if (numericCols.length === 0) {
    return (
      <div className="bg-white border border-gray-200 rounded-xl p-8 text-center shadow-sm">
        <p className="text-gray-400">No numeric variables available</p>
      </div>
    )
  }

  const getCorr = (c1: string, c2: string) => {
    if (c1 === c2) return 1
    const key = correlations[`${c1}|||${c2}`] !== undefined ? `${c1}|||${c2}` : `${c2}|||${c1}`
    return correlations[key] ?? 0
  }

  const corrColor = (r: number) => {
    const a = Math.abs(r)
    if (r === 1) return "bg-gray-100 text-gray-500"
    if (r > 0) {
      if (a > 0.7) return "bg-blue-600 text-white"
      if (a > 0.4) return "bg-blue-400 text-white"
      if (a > 0.2) return "bg-blue-200 text-blue-800"
      return "bg-gray-50 text-gray-500"
    }
    if (a > 0.7) return "bg-red-600 text-white"
    if (a > 0.4) return "bg-red-400 text-white"
    if (a > 0.2) return "bg-red-200 text-red-800"
    return "bg-gray-50 text-gray-500"
  }

  const statRows = stats
    ? [
        { label: "N", value: String(stats.n) },
        { label: "Mean", value: stats.mean },
        { label: "Median", value: stats.median },
        { label: "Std. Deviation", value: stats.sd },
        { label: "Std. Error", value: stats.se },
        { label: "Min", value: stats.min },
        { label: "Max", value: stats.max },
        { label: "Q1 (25th pct.)", value: stats.q1 },
        { label: "Q3 (75th pct.)", value: stats.q3 },
        { label: "Skewness", value: stats.skewness },
        { label: "Excess Kurtosis", value: stats.kurtosis },
      ]
    : []

  return (
    <div className="space-y-6">
      {/* Descriptive stats */}
      <div className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden">
        <div className="px-6 pt-5 pb-3">
          <h3 className="text-base font-semibold text-gray-800">Descriptive Statistics</h3>
        </div>
        <div className="px-6 pb-5 space-y-3">
          <div>
            <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1">Variable</label>
            <select
              value={selectedCol}
              onChange={(e) => setSelectedCol(e.target.value)}
              className="w-full sm:w-72 px-3 py-2 bg-white text-gray-700 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            >
              {numericCols.map((col) => <option key={col} value={col}>{humanize(col)}</option>)}
            </select>
            {project?.variableExplanations?.[selectedCol] && (
              <p className="mt-2 text-xs text-gray-400 bg-gray-50 border border-gray-200 rounded-lg px-3 py-2">
                {project.variableExplanations[selectedCol]}
              </p>
            )}
          </div>

          {statRows.length > 0 && (
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              {statRows.map(({ label, value }) => (
                <div key={label} className="bg-gray-50 border border-gray-100 rounded-lg px-4 py-3">
                  <p className="text-xs text-gray-400 mb-0.5">{label}</p>
                  <p className="text-base font-semibold text-gray-800 tabular-nums">{value}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Correlation matrix */}
      {numericCols.length >= 2 && (
        <div className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden">
          <div className="px-6 pt-5 pb-3">
            <h3 className="text-base font-semibold text-gray-800">Zero-Order Correlations</h3>
            <p className="text-xs text-gray-400 mt-0.5">Pearson r · Blue = positive, Red = negative</p>
          </div>
          <div className="px-6 pb-5 overflow-x-auto">
            <table className="text-xs">
              <thead>
                <tr>
                  <th className="px-2 py-1.5 text-left text-gray-400 font-semibold min-w-[100px]"></th>
                  {numericCols.map((col) => (
                    <th key={col} className="px-2 py-1.5 text-center text-gray-500 font-semibold whitespace-nowrap min-w-[60px]">
                      {humanize(col)}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {numericCols.map((col1) => (
                  <tr key={col1}>
                    <td className="px-2 py-1.5 text-gray-600 font-semibold whitespace-nowrap">{humanize(col1)}</td>
                    {numericCols.map((col2) => {
                      const r = getCorr(col1, col2)
                      return (
                        <td key={col2} className="px-1 py-1">
                          <div className={`rounded px-2 py-1.5 text-center font-semibold tabular-nums ${corrColor(r)}`}>
                            {r.toFixed(2)}
                          </div>
                        </td>
                      )
                    })}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  )
}
