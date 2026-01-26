"use client"

import { motion } from "framer-motion"

export default function TutorialSection() {
  const steps = [
    {
      title: "1. Select a Project",
      description: "Choose from our curated research datasets. Each project includes variable explanations and metadata.",
      icon: "📂",
    },
    {
      title: "2. Filter Your Data",
      description: "Optionally filter by demographic variables (gender, age group, education, etc.) to focus on specific subgroups.",
      icon: "🔍",
    },
    {
      title: "3. Explore Statistics",
      description: "View descriptive statistics including mean, median, standard deviation, quartiles, and correlation matrices.",
      icon: "📊",
    },
    {
      title: "4. Create Visualizations",
      description: "Build histograms with custom bin widths, scatter plots with faceting, and multi-variable bar charts.",
      icon: "📈",
    },
    {
      title: "5. Export Results",
      description: "Export your charts as PNG images to use in reports, presentations, or publications.",
      icon: "💾",
    },
  ]

  return (
    <div className="space-y-8">
      {/* Welcome Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="bg-gradient-to-r from-teal-600 via-emerald-600 to-cyan-600 rounded-2xl p-8 sm:p-12 text-white shadow-xl"
      >
        <h1 className="text-3xl sm:text-4xl font-bold mb-4">Data Analysis Explorer</h1>
        <p className="text-lg mb-2 text-white/95">
          Analyze research datasets with powerful statistics and interactive visualizations.
        </p>
        <p className="text-base text-white/85">
          Select a project below to get started, then filter, analyze, and visualize the data.
        </p>
      </motion.div>

      {/* Steps */}
      <div>
        <h2 className="text-2xl font-bold text-teal-300 mb-6">How to Use</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
          {steps.map((step, index) => (
            <motion.div
              key={step.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="bg-slate-800/50 backdrop-blur-sm border border-teal-500/20 rounded-xl p-6 hover:border-teal-400/40 transition-all"
            >
              <div className="text-4xl mb-3">{step.icon}</div>
              <h3 className="text-sm font-bold text-teal-300 mb-2">{step.title}</h3>
              <p className="text-xs text-gray-400 leading-relaxed">{step.description}</p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Features */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.5 }}
        className="bg-slate-800/50 backdrop-blur-sm border border-teal-500/20 rounded-xl p-8"
      >
        <h2 className="text-2xl font-bold text-teal-300 mb-6">Features</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h3 className="text-lg font-semibold text-emerald-400 mb-3">Descriptive Statistics</h3>
            <ul className="space-y-2 text-sm text-gray-400">
              <li>✓ Mean, median, and standard deviation</li>
              <li>✓ Minimum and maximum values</li>
              <li>✓ First and third quartiles (Q1, Q3)</li>
              <li>✓ Correlation matrices with color coding</li>
              <li>✓ Variable explanations and metadata</li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-cyan-400 mb-3">Visualizations</h3>
            <ul className="space-y-2 text-sm text-gray-400">
              <li>✓ Histograms with adjustable bin width</li>
              <li>✓ Scatter plots with optional faceting</li>
              <li>✓ Multi-variable bar charts</li>
              <li>✓ Interactive tooltips with rounded values</li>
              <li>✓ PNG export for all charts</li>
            </ul>
          </div>
        </div>
      </motion.div>

      {/* Tips */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.6 }}
        className="bg-cyan-900/20 border border-cyan-500/30 rounded-xl p-6"
      >
        <h3 className="text-lg font-semibold text-cyan-300 mb-4">Getting Started</h3>
        <div className="space-y-3 text-sm text-gray-300">
          <p>
            • Start by selecting a project from the sidebar to load a dataset
          </p>
          <p>
            • Use filters to explore subgroups within the data
          </p>
          <p>
            • Compare correlations between variables to identify relationships
          </p>
          <p>
            • Adjust bin width and faceting options to customize your visualizations
          </p>
          <p>
            • Export charts directly from the Analysis tab for reports or presentations
          </p>
        </div>
      </motion.div>
    </div>
  )
}
