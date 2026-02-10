"use client"

import { useState, useEffect } from "react"
import Navigation from "@/components/navigation"
import ProjectSelector from "@/components/data-analysis/project-selector"
import FilterPanel from "@/components/data-analysis/filter-panel"
import StatisticsPanel from "@/components/data-analysis/statistics-panel"
import VisualizationBuilder from "@/components/data-analysis/visualization-builder"
import TutorialSection from "@/components/data-analysis/tutorial-section"
import { motion } from "framer-motion"
import Link from "next/link"

interface DataSet {
  raw: any[]
  columns: string[]
  columnTypes: { [key: string]: "numeric" | "categorical" }
}

interface Project {
  id: string
  name: string
  description: string
  url: string
  variableExplanations?: { [key: string]: string }
}

export default function DataAnalysisPage() {
  const [dataset, setDataset] = useState<DataSet | null>(null)
  const [currentProject, setCurrentProject] = useState<Project | null>(null)
  const [filteredData, setFilteredData] = useState<any[]>([])
  const [filters, setFilters] = useState<{ [key: string]: any }>({})
  const [activeTab, setActiveTab] = useState<"tutorial" | "analysis">("tutorial")
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    // Apply filters to data
    if (dataset) {
      let filtered = dataset.raw

      Object.keys(filters).forEach((key) => {
        if (filters[key] && filters[key].length > 0) {
          filtered = filtered.filter((row) => filters[key].includes(String(row[key])))
        }
      })

      setFilteredData(filtered)
    }
  }, [dataset, filters])

  const handleProjectLoad = (data: DataSet, project: Project) => {
    setDataset(data)
    setCurrentProject(project)
    setFilters({})
    setActiveTab("analysis")
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      <Navigation />

      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="border-b border-teal-500/20 bg-slate-900/50 backdrop-blur-sm sticky top-0 z-40"
      >
        <div className="max-w-7xl mx-auto px-4 py-6 sm:py-8">
          <Link href="/" className="text-teal-400 hover:text-teal-300 transition-colors text-sm mb-4 inline-block">
            ← Back to Hub
          </Link>
          <h1 className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-teal-400 via-emerald-400 to-cyan-400 bg-clip-text text-transparent">
            Data Analysis Explorer
          </h1>
          <p className="text-gray-400 mt-2">Explore research datasets with interactive statistics and visualizations</p>
        </div>
      </motion.div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Tabs */}
        <div className="flex gap-2 mb-8">
          {["tutorial", "analysis"].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab as "tutorial" | "analysis")}
              className={`px-4 sm:px-6 py-2 rounded-lg font-semibold transition-all duration-300 ${
                activeTab === tab
                  ? "bg-gradient-to-r from-teal-600 to-emerald-600 text-white shadow-lg"
                  : "bg-slate-700/50 text-gray-300 hover:bg-slate-600/50"
              }`}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </button>
          ))}
        </div>

        {/* Tutorial Tab */}
        {activeTab === "tutorial" && <TutorialSection />}

        {/* Analysis Tab */}
        {activeTab === "analysis" && (
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            {/* Sidebar */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="lg:col-span-1 space-y-6"
            >
              <div className="bg-slate-800/50 backdrop-blur-sm border border-teal-500/20 rounded-xl p-6">
                {!dataset ? (
                  <ProjectSelector onDataLoaded={handleProjectLoad} loading={loading} setLoading={setLoading} />
                ) : (
                  <div>
                    <h3 className="text-lg font-bold text-teal-300 mb-2">Current Project</h3>
                    <p className="text-sm text-gray-300 mb-4">{currentProject?.name}</p>
                    <button
                      onClick={() => {
                        setDataset(null)
                        setCurrentProject(null)
                        setFilters({})
                        setActiveTab("tutorial")
                      }}
                      className="w-full px-4 py-2 bg-slate-700 hover:bg-slate-600 text-gray-300 rounded-lg transition-colors"
                    >
                      Load Different Project
                    </button>
                  </div>
                )}
              </div>

              {dataset && <FilterPanel dataset={dataset} filters={filters} setFilters={setFilters} />}
            </motion.div>

            {/* Main Content */}
            {dataset && (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
                className="lg:col-span-3 space-y-6"
              >
                {filteredData.length > 0 ? (
                  <>
                    <StatisticsPanel dataset={dataset} filteredData={filteredData} project={currentProject} />
                    <VisualizationBuilder dataset={dataset} filteredData={filteredData} />
                  </>
                ) : (
                  <div className="bg-slate-800/50 backdrop-blur-sm border border-teal-500/20 rounded-xl p-12 text-center">
                    <p className="text-gray-400">No data matches the selected filters. Try adjusting your filters.</p>
                  </div>
                )}
              </motion.div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
