"use client"

import { motion } from "framer-motion"

interface FilterPanelProps {
  dataset: { raw: any[]; columns: string[]; columnTypes: { [key: string]: "numeric" | "categorical" } }
  filters: { [key: string]: any }
  setFilters: (filters: { [key: string]: any }) => void
}

export default function FilterPanel({ dataset, filters, setFilters }: FilterPanelProps) {
  // Get only categorical columns, excluding ID variables
  const categoricalCols = dataset.columns.filter(
    (col) => dataset.columnTypes[col] === "categorical" && !col.toLowerCase().includes("id"),
  )

  const toggleFilter = (column: string, value: string) => {
    const current = filters[column] || []
    const updated = current.includes(value) ? current.filter((v: string) => v !== value) : [...current, value]
    setFilters({ ...filters, [column]: updated })
  }

  const getUniqueValues = (column: string) => {
    return [...new Set(dataset.raw.map((row) => String(row[column])))].sort()
  }

  const clearAllFilters = () => {
    setFilters({})
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="bg-slate-800/50 backdrop-blur-sm border border-teal-500/20 rounded-xl p-6 space-y-4"
    >
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-base font-bold text-teal-300">Filters</h3>
        {Object.keys(filters).some((key) => filters[key]?.length > 0) && (
          <button
            onClick={clearAllFilters}
            className="text-xs text-gray-400 hover:text-gray-300 transition-colors underline"
          >
            Clear all
          </button>
        )}
      </div>

      {categoricalCols.length === 0 ? (
        <p className="text-sm text-gray-400">No categorical variables available for filtering</p>
      ) : (
        <div className="space-y-4">
          {categoricalCols.map((col) => (
            <div key={col} className="space-y-2">
              <h4 className="text-sm font-semibold text-gray-300">{col}</h4>
              <div className="space-y-1 max-h-40 overflow-y-auto">
                {getUniqueValues(col).map((value) => (
                  <label
                    key={`${col}-${value}`}
                    className="flex items-center gap-2 cursor-pointer hover:bg-slate-700/50 px-2 py-1 rounded transition-colors"
                  >
                    <input
                      type="checkbox"
                      checked={filters[col]?.includes(value) || false}
                      onChange={() => toggleFilter(col, value)}
                      className="w-4 h-4 rounded bg-slate-700 border-teal-500/50 accent-teal-500 cursor-pointer"
                    />
                    <span className="text-sm text-gray-400">{value}</span>
                  </label>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}

      <div className="pt-2 border-t border-teal-500/10">
        <p className="text-xs text-gray-500">
          Showing {Object.keys(filters).filter((k) => filters[k]?.length > 0).length} active filter
          {Object.keys(filters).filter((k) => filters[k]?.length > 0).length !== 1 ? "s" : ""}
        </p>
      </div>
    </motion.div>
  )
}
