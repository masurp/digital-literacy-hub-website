"use client"

import { useState } from "react"
import Papa from "papaparse"
import { motion } from "framer-motion"

interface Project {
  id: string
  name: string
  description: string
  url: string
  variableExplanations?: { [key: string]: string }
}

interface ProjectSelectorProps {
  onDataLoaded: (data: any, project: Project) => void
  loading: boolean
  setLoading: (loading: boolean) => void
}

const PROJECTS: Project[] = [
  {
    id: "project1",
    name: "Digital Literacy Survey 2024",
    description: "Study examining digital literacy skills across different demographics",
    authors: "Philipp K. Masur, Dominik DiFranzo, Natalie, N. Bazarova",
    url: "https://raw.githubusercontent.com/masurp/VU_CADC/refs/heads/main/tutorials/data/masur-et-al_2021_literacy.csv",
    variableExplanations: {
      age: "Age of participant in years",
      gender: "Gender identity",
      education: "Highest level of education completed",
      digital_literacy: "Digital literacy score (0-100)",
      platform_usage: "Hours per week spent on digital platforms",
      data_concern: "Level of concern about data privacy (1-5 scale)",
    },
  },
  {
    id: "project2",
    name: "Social Media & Well-being Study",
    authors: "Philipp K. Masur",
    description: "Research on social media usage patterns and digital well-being",
    url: "https://example.com/data2.csv",
    variableExplanations: {
      participant_id: "Unique participant identifier",
      age_group: "Age group category",
      daily_usage: "Daily social media usage in minutes",
      well_being_score: "Self-reported well-being score (1-10)",
      platform: "Primary social media platform used",
    },
  },
]

export default function ProjectSelector({ onDataLoaded, loading, setLoading }: ProjectSelectorProps) {
  const [error, setError] = useState<string | null>(null)
  const [selectedProject, setSelectedProject] = useState<Project | null>(null)

  const loadProject = async (project: Project) => {
    setLoading(true)
    setError(null)
    setSelectedProject(project)

    try {
      const response = await fetch(project.url)
      if (!response.ok) throw new Error("Failed to fetch data")

      const csvText = await response.text()

      Papa.parse(csvText, {
        header: true,
        skipEmptyLines: true,
        complete: (results) => {
          const data = results.data as any[]

          if (data.length === 0) {
            setError("No data found in file")
            setLoading(false)
            return
          }

          const columns = Object.keys(data[0])
          const columnTypes: { [key: string]: "numeric" | "categorical" } = {}

          // Detect column types
          columns.forEach((col) => {
            const values = data.map((row) => row[col]).filter((v) => v !== null && v !== undefined && v !== "")
            const numericCount = values.filter((v) => !isNaN(Number(v))).length

            columnTypes[col] = numericCount / values.length > 0.8 ? "numeric" : "categorical"
          })

          onDataLoaded(
            {
              raw: data,
              columns,
              columnTypes,
            },
            project,
          )

          setLoading(false)
        },
        error: (error: any) => {
          setError(`Parse error: ${error.message}`)
          setLoading(false)
        },
      })
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unknown error")
      setLoading(false)
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="space-y-4"
    >
      <h2 className="text-lg font-bold text-gray-100 mb-4">Select a Project</h2>

      <div className="grid gap-4">
        {PROJECTS.map((project) => (
          <motion.button
            key={project.id}
            whileHover={{ scale: 1.02 }}
            onClick={() => loadProject(project)}
            disabled={loading}
            className="p-4 bg-gray-800/50 backdrop-blur-sm border border-teal-500/30 rounded-lg hover:border-teal-400/60 text-left transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed group"
          >
            <h3 className="text-base font-semibold text-teal-300 group-hover:text-teal-200 mb-1">{project.name}</h3>
            <p className="text-sm text-gray-300">{project.description}</p>
          </motion.button>
        ))}
      </div>

      {error && (
        <div className="p-3 bg-red-900/30 border border-red-500/50 rounded-lg">
          <p className="text-sm text-red-300">{error}</p>
        </div>
      )}

      {selectedProject && !loading && (
        <div className="p-3 bg-emerald-900/30 border border-emerald-500/50 rounded-lg">
          <p className="text-sm text-emerald-300 font-medium">{selectedProject.name} loaded successfully</p>
        </div>
      )}
    </motion.div>
  )
}
