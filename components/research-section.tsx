"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"

const researchProjects = [
  {
    id: 1,
    title: "Digital Privacy Interventions",
    description:
      "Developing and testing interventions to improve digital privacy awareness and behavior among social media users.",
    team: ["Philipp Masur", "Jolanda Veldhuis"],
    status: "Active",
    icon: "🔒",
  },
  {
    id: 2,
    title: "Social Media Literacy",
    description:
      "Creating educational frameworks to enhance critical thinking about social media content and algorithms.",
    team: ["Jolanda Veldhuis", "Douglas Parry"],
    status: "Active",
    icon: "📱",
  },
  {
    id: 3,
    title: "Digital Wellbeing Metrics",
    description: "Developing new measures and methodologies for assessing digital wellbeing in various contexts.",
    team: ["Douglas Parry", "Philipp Masur"],
    status: "Planning",
    icon: "💚",
  },
  {
    id: 4,
    title: "AI Ethics Education",
    description: "Designing curricula and tools for teaching AI ethics and algorithmic awareness to diverse audiences.",
    team: ["All Team Members"],
    status: "Active",
    icon: "🤖",
  },
]

export default function ResearchSection() {
  const [selectedProject, setSelectedProject] = useState<(typeof researchProjects)[0] | null>(null)

  return (
    <div className="relative w-full min-h-screen bg-gradient-to-br from-green-50 via-blue-50 to-purple-50 overflow-hidden">
      {/* Content Overlay */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-4 py-12 sm:py-16">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="text-center mb-8 sm:mb-12"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-800 mb-3 sm:mb-4">
            Our{" "}
            <span className="bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">Research</span>
          </h2>
          <p className="text-base sm:text-lg text-gray-600 max-w-2xl mx-auto px-4">
            Exploring the intersection of technology, society, and human behavior
          </p>
        </motion.div>

        {/* Research Project Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 max-w-4xl mx-auto w-full">
          {researchProjects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
              whileHover={{ scale: 1.02 }}
              onClick={() => setSelectedProject(project)}
              className="bg-white/80 backdrop-blur-sm rounded-xl p-4 sm:p-6 shadow-lg cursor-pointer hover:shadow-xl transition-all duration-300"
            >
              <div className="text-2xl sm:text-3xl mb-3 sm:mb-4">{project.icon}</div>
              <h3 className="text-lg sm:text-xl font-semibold text-gray-800 mb-2">{project.title}</h3>
              <p className="text-gray-600 text-xs sm:text-sm mb-3 sm:mb-4 line-clamp-2">{project.description}</p>
              <div className="flex items-center justify-between">
                <span
                  className={`px-2 sm:px-3 py-1 rounded-full text-xs font-medium ${
                    project.status === "Active" ? "bg-green-100 text-green-800" : "bg-yellow-100 text-yellow-800"
                  }`}
                >
                  {project.status}
                </span>
                <span className="text-xs text-gray-500 hidden sm:inline">Click to learn more</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Project Detail Modal */}
      <AnimatePresence>
        {selectedProject && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setSelectedProject(null)}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              className="bg-white rounded-2xl p-6 sm:p-8 max-w-lg mx-auto max-h-[90vh] overflow-y-auto relative"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close X button */}
              <button
                onClick={() => setSelectedProject(null)}
                className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-full bg-gray-100 hover:bg-gray-200 text-gray-600 hover:text-gray-800 transition-all duration-200 z-10"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
              <div className="text-3xl sm:text-4xl mb-3 sm:mb-4">{selectedProject.icon}</div>
              <h3 className="text-xl sm:text-2xl font-bold text-gray-800 mb-3 sm:mb-4">{selectedProject.title}</h3>
              <p className="text-gray-600 leading-relaxed mb-4 sm:mb-6 text-sm sm:text-base">
                {selectedProject.description}
              </p>
              <div className="mb-3 sm:mb-4">
                <h4 className="font-semibold text-gray-800 mb-2 text-sm sm:text-base">Team Members:</h4>
                <p className="text-gray-600 text-sm sm:text-base">{selectedProject.team.join(", ")}</p>
              </div>
              <div className="mb-4 sm:mb-6">
                <span
                  className={`px-3 py-1 rounded-full text-sm font-medium ${
                    selectedProject.status === "Active"
                      ? "bg-green-100 text-green-800"
                      : "bg-yellow-100 text-yellow-800"
                  }`}
                >
                  Status: {selectedProject.status}
                </span>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
