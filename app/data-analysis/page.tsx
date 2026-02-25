"use client"

import { useState, useEffect, useRef } from "react"
import Navigation from "@/components/navigation"
import StatisticsPanel from "@/components/data-analysis/statistics-panel"
import VisualizationBuilder from "@/components/data-analysis/visualization-builder"
import { motion, AnimatePresence } from "framer-motion"
import Link from "next/link"
import Papa from "papaparse"

interface DataSet {
  raw: any[]
  columns: string[]
  columnTypes: { [key: string]: "numeric" | "categorical" }
}

interface Project {
  id: string
  name: string
  description: string
  authors: string
  url: string
  variableExplanations?: { [key: string]: string }
}

const PROJECTS: Project[] = [
  {
    id: "project1",
    name: "Digital Literacy Survey 2024",
    description: "Study examining digital literacy skills across different demographics",
    authors: "Philipp K. Masur, Dominik DiFranzo, Natalie N. Bazarova",
    url: "https://raw.githubusercontent.com/masurp/VU_CADC/refs/heads/main/tutorials/data/masur-et-al_2021_literacy.csv",
    variableExplanations: {
      age: "Age of participant in years",
      gender: "Gender identity",
      education: "Highest level of education completed",
      digital_literacy: "Digital literacy score (0–100)",
      platform_usage: "Hours per week spent on digital platforms",
      data_concern: "Level of concern about data privacy (1–5 scale)",
    },
  },
]

// ─── Filter popover ───────────────────────────────────────────────────────────

function FilterPopover({
  dataset,
  filters,
  setFilters,
}: {
  dataset: DataSet
  filters: { [key: string]: string[] }
  setFilters: (f: { [key: string]: string[] }) => void
}) {
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  const categoricalCols = dataset.columns.filter(
    (col) => dataset.columnTypes[col] === "categorical" && !col.toLowerCase().includes("id"),
  )

  const activeCount = Object.values(filters).filter((v) => v?.length > 0).length

  const getUniqueValues = (col: string) =>
    [...new Set(dataset.raw.map((row) => String(row[col])))].sort()

  const toggle = (col: string, val: string) => {
    const cur = filters[col] || []
    const updated = cur.includes(val) ? cur.filter((v) => v !== val) : [...cur, val]
    setFilters({ ...filters, [col]: updated })
  }

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false)
    }
    if (open) document.addEventListener("mousedown", handler)
    return () => document.removeEventListener("mousedown", handler)
  }, [open])

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen(!open)}
        className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg border text-sm font-medium transition-colors ${
          activeCount > 0
            ? "bg-blue-50 border-blue-300 text-blue-700"
            : "bg-white border-gray-300 text-gray-600 hover:bg-gray-50"
        }`}
      >
        <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2a1 1 0 01-.293.707L13 13.414V19a1 1 0 01-.553.894l-4 2A1 1 0 017 21v-7.586L3.293 6.707A1 1 0 013 6V4z"
          />
        </svg>
        Filter
        {activeCount > 0 && (
          <span className="bg-blue-600 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center leading-none">
            {activeCount}
          </span>
        )}
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            transition={{ duration: 0.15 }}
            className="absolute top-full left-0 mt-1 w-72 bg-white border border-gray-200 rounded-xl shadow-lg z-50 p-4 space-y-4"
          >
            <div className="flex items-center justify-between">
              <span className="text-sm font-semibold text-gray-700">Filter by</span>
              {activeCount > 0 && (
                <button
                  onClick={() => setFilters({})}
                  className="text-xs text-gray-400 hover:text-gray-600 underline"
                >
                  Clear all
                </button>
              )}
            </div>
            {categoricalCols.length === 0 ? (
              <p className="text-sm text-gray-400">No categorical variables available</p>
            ) : (
              categoricalCols.map((col) => (
                <div key={col}>
                  <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1">
                    {col.replace(/_/g, " ")}
                  </p>
                  <div className="space-y-1 max-h-32 overflow-y-auto">
                    {getUniqueValues(col).map((val) => (
                      <label
                        key={val}
                        className="flex items-center gap-2 text-sm text-gray-600 cursor-pointer hover:text-gray-900 py-0.5"
                      >
                        <input
                          type="checkbox"
                          checked={(filters[col] || []).includes(val)}
                          onChange={() => toggle(col, val)}
                          className="rounded accent-blue-600"
                        />
                        {val}
                      </label>
                    ))}
                  </div>
                </div>
              ))
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

// ─── Overview tab ─────────────────────────────────────────────────────────────

function OverviewTab({
  dataset,
  filteredData,
  project,
}: {
  dataset: DataSet
  filteredData: any[]
  project: Project
}) {
  const numericCols = dataset.columns.filter(
    (col) => dataset.columnTypes[col] === "numeric" && !col.toLowerCase().includes("id"),
  )
  const categoricalCols = dataset.columns.filter(
    (col) => dataset.columnTypes[col] === "categorical" && !col.toLowerCase().includes("id"),
  )

  const getStats = (col: string) => {
    const vals = filteredData.map((row) => Number(row[col])).filter((v) => !isNaN(v))
    if (!vals.length) return null
    const mean = vals.reduce((a, b) => a + b, 0) / vals.length
    const sorted = [...vals].sort((a, b) => a - b)
    const variance = vals.reduce((a, v) => a + (v - mean) ** 2, 0) / vals.length
    return {
      n: vals.length,
      mean: mean.toFixed(2),
      sd: Math.sqrt(variance).toFixed(2),
      min: sorted[0].toFixed(2),
      max: sorted[sorted.length - 1].toFixed(2),
    }
  }

  return (
    <div className="space-y-6">
      {/* Dataset card */}
      <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
        <h3 className="text-base font-semibold text-gray-800 mb-1">{project.name}</h3>
        <p className="text-sm text-gray-500 mb-1">{project.description}</p>
        <p className="text-xs text-gray-400">Authors: {project.authors}</p>
        <div className="mt-5 grid grid-cols-2 sm:grid-cols-4 gap-4">
          {[
            { label: "Rows", value: filteredData.length },
            { label: "Variables", value: dataset.columns.length },
            { label: "Numeric", value: numericCols.length },
            { label: "Categorical", value: categoricalCols.length },
          ].map((item) => (
            <div key={item.label} className="bg-gray-50 rounded-lg p-3 text-center">
              <p className="text-2xl font-bold text-blue-600">{item.value}</p>
              <p className="text-xs text-gray-500 mt-0.5">{item.label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Numeric summary table */}
      {numericCols.length > 0 && (
        <div className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden">
          <div className="px-6 pt-5 pb-3">
            <h3 className="text-base font-semibold text-gray-800">Numeric Variables</h3>
            <p className="text-xs text-gray-400 mt-0.5">Descriptive summary for filtered rows</p>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-gray-50 border-y border-gray-200">
                <tr>
                  {["Variable", "N", "Mean", "SD", "Min", "Max", "Description"].map((h) => (
                    <th
                      key={h}
                      className={`py-2.5 text-xs font-semibold text-gray-500 uppercase tracking-wide ${
                        h === "Variable" || h === "Description" ? "text-left px-6" : "text-right px-4"
                      }`}
                    >
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {numericCols.map((col) => {
                  const s = getStats(col)
                  return (
                    <tr key={col} className="hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-3 font-medium text-gray-800 capitalize">
                        {col.replace(/_/g, " ")}
                      </td>
                      <td className="px-4 py-3 text-right text-gray-600 tabular-nums">{s?.n ?? "—"}</td>
                      <td className="px-4 py-3 text-right text-gray-600 tabular-nums">{s?.mean ?? "—"}</td>
                      <td className="px-4 py-3 text-right text-gray-600 tabular-nums">{s?.sd ?? "—"}</td>
                      <td className="px-4 py-3 text-right text-gray-600 tabular-nums">{s?.min ?? "—"}</td>
                      <td className="px-4 py-3 text-right text-gray-600 tabular-nums">{s?.max ?? "—"}</td>
                      <td className="px-6 py-3 text-gray-400 text-xs max-w-xs">
                        {project.variableExplanations?.[col] ?? ""}
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Categorical variables */}
      {categoricalCols.length > 0 && (
        <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
          <h3 className="text-base font-semibold text-gray-800 mb-1">Categorical Variables</h3>
          <p className="text-xs text-gray-400 mb-4">Value counts for filtered rows</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {categoricalCols.map((col) => {
              const counts: Record<string, number> = {}
              filteredData.forEach((row) => {
                const v = String(row[col])
                counts[v] = (counts[v] || 0) + 1
              })
              const entries = Object.entries(counts).sort((a, b) => b[1] - a[1])
              return (
                <div key={col} className="border border-gray-100 rounded-lg p-4">
                  <p className="text-sm font-semibold text-gray-700 mb-1 capitalize">
                    {col.replace(/_/g, " ")}
                  </p>
                  {project.variableExplanations?.[col] && (
                    <p className="text-xs text-gray-400 mb-2">{project.variableExplanations[col]}</p>
                  )}
                  <div className="space-y-1.5 mt-2">
                    {entries.slice(0, 6).map(([val, cnt]) => (
                      <div key={val} className="flex items-center gap-2 text-xs">
                        <span className="text-gray-600 w-20 truncate capitalize">{val}</span>
                        <div className="flex-1 bg-gray-100 rounded-full h-1.5">
                          <div
                            className="bg-blue-400 h-1.5 rounded-full transition-all"
                            style={{ width: `${(cnt / filteredData.length) * 100}%` }}
                          />
                        </div>
                        <span className="text-gray-400 w-8 text-right tabular-nums">{cnt}</span>
                      </div>
                    ))}
                    {entries.length > 6 && (
                      <p className="text-xs text-gray-400">+{entries.length - 6} more values</p>
                    )}
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      )}
    </div>
  )
}

// ─── Main page ────────────────────────────────────────────────────────────────

export default function DataAnalysisPage() {
  const [dataset, setDataset] = useState<DataSet | null>(null)
  const [currentProject, setCurrentProject] = useState<Project | null>(null)
  const [filteredData, setFilteredData] = useState<any[]>([])
  const [filters, setFilters] = useState<{ [key: string]: string[] }>({})
  const [activeTab, setActiveTab] = useState<"overview" | "visualize" | "statistics">("overview")
  const [loading, setLoading] = useState<string | null>(null) // project id being loaded
  const [error, setError] = useState<string | null>(null)

  // Apply filters
  useEffect(() => {
    if (!dataset) return
    let filtered = dataset.raw
    Object.keys(filters).forEach((key) => {
      if (filters[key]?.length > 0) {
        filtered = filtered.filter((row) => filters[key].includes(String(row[key])))
      }
    })
    setFilteredData(filtered)
  }, [dataset, filters])

  const loadProject = async (project: Project) => {
    setLoading(project.id)
    setError(null)
    try {
      const response = await fetch(project.url)
      if (!response.ok) throw new Error("Failed to fetch dataset")
      const csvText = await response.text()
      Papa.parse(csvText, {
        header: true,
        skipEmptyLines: true,
        complete: (results) => {
          const data = results.data as any[]
          if (data.length === 0) {
            setError("No data found in file")
            setLoading(null)
            return
          }
          const columns = Object.keys(data[0])
          const columnTypes: { [key: string]: "numeric" | "categorical" } = {}
          columns.forEach((col) => {
            const values = data.map((row) => row[col]).filter((v) => v !== null && v !== undefined && v !== "")
            const numericCount = values.filter((v) => !isNaN(Number(v))).length
            columnTypes[col] = numericCount / values.length > 0.8 ? "numeric" : "categorical"
          })
          setDataset({ raw: data, columns, columnTypes })
          setCurrentProject(project)
          setFilters({})
          setActiveTab("overview")
          setLoading(null)
        },
        error: (err: any) => {
          setError(`Parse error: ${err.message}`)
          setLoading(null)
        },
      })
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unknown error")
      setLoading(null)
    }
  }

  const TABS = [
    { id: "overview", label: "Overview" },
    { id: "visualize", label: "Visualize" },
    { id: "statistics", label: "Statistics" },
  ] as const

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />

      {/* Page header */}
      <div className="border-b border-gray-200 bg-white">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <Link href="/" className="text-blue-600 hover:text-blue-700 text-sm mb-3 inline-flex items-center gap-1">
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back to Hub
          </Link>
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Data Analysis Explorer</h1>
          <p className="text-gray-500 mt-1 text-sm">
            Explore research datasets with interactive statistics and visualizations
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <AnimatePresence mode="wait">
          {/* ── Landing: no dataset loaded ── */}
          {!dataset ? (
            <motion.div
              key="landing"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.4 }}
              className="max-w-2xl mx-auto"
            >
              <div className="text-center mb-8">
                <div className="inline-flex items-center justify-center w-14 h-14 bg-blue-100 rounded-2xl mb-4">
                  <svg className="w-7 h-7 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.5}
                      d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                    />
                  </svg>
                </div>
                <h2 className="text-xl font-semibold text-gray-800 mb-2">Choose a dataset to explore</h2>
                <p className="text-gray-500 text-sm">
                  Select a research dataset to get started with interactive analysis
                </p>
              </div>

              {error && (
                <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg">
                  <p className="text-sm text-red-600">{error}</p>
                </div>
              )}

              <div className="space-y-3">
                {PROJECTS.map((project) => (
                  <button
                    key={project.id}
                    onClick={() => loadProject(project)}
                    disabled={loading !== null}
                    className="w-full text-left p-5 bg-white border border-gray-200 rounded-xl hover:border-blue-400 hover:shadow-md transition-all duration-200 disabled:opacity-60 disabled:cursor-not-allowed group"
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1">
                        <h3 className="font-semibold text-gray-800 group-hover:text-blue-700 transition-colors mb-1">
                          {project.name}
                        </h3>
                        <p className="text-sm text-gray-500 mb-1">{project.description}</p>
                        <p className="text-xs text-gray-400">{project.authors}</p>
                      </div>
                      <div className="flex-shrink-0 mt-1">
                        {loading === project.id ? (
                          <svg
                            className="w-5 h-5 text-blue-500 animate-spin"
                            fill="none"
                            viewBox="0 0 24 24"
                          >
                            <circle
                              className="opacity-25"
                              cx="12"
                              cy="12"
                              r="10"
                              stroke="currentColor"
                              strokeWidth="4"
                            />
                            <path
                              className="opacity-75"
                              fill="currentColor"
                              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                            />
                          </svg>
                        ) : (
                          <svg
                            className="w-5 h-5 text-gray-300 group-hover:text-blue-400 transition-colors"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                          </svg>
                        )}
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </motion.div>
          ) : (
            /* ── Analysis view ── */
            <motion.div
              key="analysis"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4 }}
            >
              {/* Sticky analysis bar */}
              <div className="sticky top-0 z-30 bg-gray-50 border-b border-gray-200 -mx-4 px-4 py-3 mb-6 flex flex-wrap items-center gap-3">
                <div className="flex-1 min-w-0">
                  <span className="text-sm font-semibold text-gray-800 truncate">{currentProject?.name}</span>
                  <span className="ml-2 text-xs text-gray-400 tabular-nums">
                    {filteredData.length.toLocaleString()} rows
                    {Object.values(filters).some((v) => v?.length) &&
                      ` (filtered from ${dataset.raw.length.toLocaleString()})`}
                  </span>
                </div>
                <FilterPopover dataset={dataset} filters={filters} setFilters={setFilters} />
                <button
                  onClick={() => {
                    setDataset(null)
                    setCurrentProject(null)
                    setFilters({})
                    setError(null)
                  }}
                  className="flex items-center gap-1.5 px-3 py-1.5 text-sm text-gray-500 hover:text-gray-700 border border-gray-300 bg-white rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4l16 16M4 20L20 4" />
                  </svg>
                  Change dataset
                </button>
              </div>

              {/* Tab bar */}
              <div className="flex gap-1 mb-6 bg-white border border-gray-200 rounded-xl p-1 w-fit">
                {TABS.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                      activeTab === tab.id
                        ? "bg-blue-600 text-white shadow-sm"
                        : "text-gray-600 hover:text-gray-800 hover:bg-gray-100"
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>

              {/* Tab content */}
              <AnimatePresence mode="wait">
                {activeTab === "overview" && (
                  <motion.div
                    key="overview"
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.25 }}
                  >
                    <OverviewTab dataset={dataset} filteredData={filteredData} project={currentProject!} />
                  </motion.div>
                )}

                {activeTab === "visualize" && (
                  <motion.div
                    key="visualize"
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.25 }}
                  >
                    {filteredData.length > 0 ? (
                      <VisualizationBuilder dataset={dataset} filteredData={filteredData} />
                    ) : (
                      <div className="bg-white border border-gray-200 rounded-xl p-12 text-center">
                        <p className="text-gray-400">No data matches the selected filters.</p>
                      </div>
                    )}
                  </motion.div>
                )}

                {activeTab === "statistics" && (
                  <motion.div
                    key="statistics"
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.25 }}
                  >
                    {filteredData.length > 0 ? (
                      <StatisticsPanel
                        dataset={dataset}
                        filteredData={filteredData}
                        project={currentProject}
                      />
                    ) : (
                      <div className="bg-white border border-gray-200 rounded-xl p-12 text-center">
                        <p className="text-gray-400">No data matches the selected filters.</p>
                      </div>
                    )}
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}
