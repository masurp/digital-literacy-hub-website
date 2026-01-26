"use client"

import { useState, useMemo } from "react"
import { motion } from "framer-motion"

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

export default function StatisticsPanel({ dataset, filteredData, project }: StatisticsPanelProps) {
  // Get numeric columns, excluding ID variables
  const numericColumns = dataset.columns.filter(
    (col) => dataset.columnTypes[col] === "numeric" && !col.toLowerCase().includes("id"),
  )
  const [selectedColumn, setSelectedColumn] = useState(numericColumns[0] || "")

  // Update selectedColumn if it becomes invalid
  if (selectedColumn && !numericColumns.includes(selectedColumn)) {
    setSelectedColumn(numericColumns[0] || "")
  }

  const statistics = useMemo(() => {
    if (!selectedColumn || numericColumns.length === 0) return null
    if (!numericColumns.includes(selectedColumn)) return null

    const values = filteredData.map((row) => Number(row[selectedColumn])).filter((v) => !isNaN(v))

    if (values.length === 0) return null

    const sorted = [...values].sort((a, b) => a - b)
    const sum = values.reduce((a, b) => a + b, 0)
    const mean = sum / values.length
    const median = sorted[Math.floor(sorted.length / 2)]
    const min = Math.min(...values)
    const max = Math.max(...values)

    // Quartiles
    const q1Index = Math.floor(sorted.length * 0.25)
    const q3Index = Math.floor(sorted.length * 0.75)
    const q1 = sorted[q1Index]
    const q3 = sorted[q3Index]

    // Standard deviation
    const variance = values.reduce((acc, val) => acc + Math.pow(val - mean, 2), 0) / values.length
    const stdDev = Math.sqrt(variance)

    return {
      count: values.length,
      mean,
      median,
      stdDev,
      min,
      max,
      q1,
      q3,
    }
  }, [selectedColumn, filteredData, numericColumns.join(",")])

  // Calculate correlations
  const correlations = useMemo(() => {
    if (numericColumns.length < 2) return {}

    const result: { [key: string]: number } = {}

    for (let i = 0; i < numericColumns.length; i++) {
      for (let j = i + 1; j < numericColumns.length; j++) {
        const col1 = numericColumns[i]
        const col2 = numericColumns[j]

        const values1 = filteredData.map((row) => Number(row[col1])).filter((v) => !isNaN(v))
        const values2 = filteredData.map((row) => Number(row[col2])).filter((v) => !isNaN(v))

        if (values1.length === 0 || values2.length === 0) continue

        const mean1 = values1.reduce((a, b) => a + b, 0) / values1.length
        const mean2 = values2.reduce((a, b) => a + b, 0) / values2.length

        let numerator = 0
        let denom1 = 0
        let denom2 = 0

        for (let k = 0; k < Math.min(values1.length, values2.length); k++) {
          const diff1 = values1[k] - mean1
          const diff2 = values2[k] - mean2
          numerator += diff1 * diff2
          denom1 += diff1 * diff1
          denom2 += diff2 * diff2
        }

        const correlation = numerator / Math.sqrt(denom1 * denom2)
        result[`${col1} vs ${col2}`] = isNaN(correlation) ? 0 : correlation
      }
    }

    return result
  }, [numericColumns.join(","), filteredData])

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="space-y-6"
    >
      {numericColumns.length === 0 ? (
        <div className="bg-slate-800/50 backdrop-blur-sm border border-teal-500/20 rounded-xl p-6">
          <p className="text-gray-400">No numeric variables available for analysis</p>
        </div>
      ) : (
        <>
          {/* Descriptive Statistics */}
          <div className="bg-slate-800/50 backdrop-blur-sm border border-teal-500/20 rounded-xl p-6">
            <h3 className="text-lg font-bold text-teal-300 mb-4">Descriptive Statistics</h3>
            
            <div className="mb-4">
              <label className="block text-sm font-semibold text-teal-300 mb-2">Select Variable</label>
              <select
                value={selectedColumn}
                onChange={(e) => setSelectedColumn(e.target.value)}
                className="w-full px-4 py-2 bg-slate-700 text-gray-100 border border-teal-500/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
              >
                {numericColumns.map((col) => (
                  <option key={col} value={col}>
                    {col}
                  </option>
                ))}
              </select>

              {project?.variableExplanations && selectedColumn && project.variableExplanations[selectedColumn] && (
                <div className="p-3 bg-cyan-900/30 border border-cyan-500/30 rounded-lg mt-3">
                  <p className="text-sm text-cyan-300">{project.variableExplanations[selectedColumn]}</p>
                </div>
              )}
            </div>

            {statistics && (
              <div className="grid grid-cols-2 gap-3">
                {[
                  { label: "Count", value: String(statistics.count) },
                  { label: "Mean", value: statistics.mean?.toFixed(2) || "N/A" },
                  { label: "Median", value: statistics.median?.toFixed(2) || "N/A" },
                  { label: "Std Dev", value: statistics.stdDev?.toFixed(2) || "N/A" },
                  { label: "Min", value: statistics.min?.toFixed(2) || "N/A" },
                  { label: "Max", value: statistics.max?.toFixed(2) || "N/A" },
                  { label: "Q1", value: statistics.q1?.toFixed(2) || "N/A" },
                  { label: "Q3", value: statistics.q3?.toFixed(2) || "N/A" },
                ].map((stat) => (
                  <div key={stat.label} className="bg-slate-700/50 border border-teal-500/20 rounded-lg p-3">
                    <p className="text-xs text-gray-400 mb-1">{stat.label}</p>
                    <p className="text-lg font-bold text-teal-300">{stat.value}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </>
      )}

      {/* Correlations - Zero-Order Correlation Matrix */}
      {Object.keys(correlations).length > 0 && (
        <div className="bg-slate-800/50 backdrop-blur-sm border border-teal-500/20 rounded-xl p-6">
          <h3 className="text-lg font-bold text-teal-300 mb-4">Zero-Order Correlations</h3>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr>
                  <th className="text-left text-gray-400 font-semibold px-3 py-2"></th>
                  {numericColumns.map((col) => (
                    <th key={col} className="text-center text-gray-400 font-semibold px-3 py-2 whitespace-nowrap text-xs">
                      {col}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {numericColumns.map((col1, i) => (
                  <tr key={col1}>
                    <td className="text-gray-400 font-semibold px-3 py-2 text-xs">{col1}</td>
                    {numericColumns.map((col2, j) => {
                      let corr = 0
                      if (i === j) {
                        corr = 1
                      } else if (i < j) {
                        corr = correlations[`${col1} vs ${col2}`] || 0
                      } else {
                        corr = correlations[`${col2} vs ${col1}`] || 0
                      }

                      // Color scale: 0 = white, ±1 = red/green
                      const absCorr = Math.abs(corr)
                      let bgColor = "bg-slate-700"
                      if (corr > 0) {
                        bgColor =
                          absCorr > 0.7
                            ? "bg-emerald-700"
                            : absCorr > 0.4
                              ? "bg-emerald-600"
                              : absCorr > 0.2
                                ? "bg-emerald-500"
                                : "bg-slate-700"
                      } else if (corr < 0) {
                        bgColor =
                          absCorr > 0.7
                            ? "bg-red-700"
                            : absCorr > 0.4
                              ? "bg-red-600"
                              : absCorr > 0.2
                                ? "bg-red-500"
                                : "bg-slate-700"
                      }

                      return (
                        <td key={`${col1}-${col2}`} className={`text-center px-3 py-2 ${bgColor} rounded`}>
                          <span className="text-white font-semibold text-xs">{corr.toFixed(2)}</span>
                        </td>
                      )
                    })}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="mt-4 text-xs text-gray-400">
            <p>Color scale: Green = positive correlation, Red = negative correlation, Intensity = strength</p>
          </div>
        </div>
      )}
    </motion.div>
  )
}
