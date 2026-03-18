"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { useTranslations } from "next-intl"

const projectKeys = ["privacy", "socialMedia", "wellbeing", "ai"] as const
const projectIcons = ["🔒", "📱", "💚", "🤖"]
const projectTeams = [
  ["Philipp Masur", "Jolanda Veldhuis"],
  ["Jolanda Veldhuis", "Douglas Parry"],
  ["Douglas Parry", "Philipp Masur"],
  ["All Team Members"],
]

export default function ResearchSection() {
  const t = useTranslations("research")
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null)

  const projects = projectKeys.map((key, i) => ({
    id: i + 1,
    key,
    title: t(`projects.${key}.title`),
    description: t(`projects.${key}.description`),
    team: projectTeams[i],
    status: i === 2 ? t("statusPlanning") : t("statusActive"),
    statusRaw: i === 2 ? "Planning" : "Active",
    icon: projectIcons[i],
  }))

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
            <span className="bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">{t("title")}</span>
          </h2>
          <p className="text-base sm:text-lg text-gray-600 max-w-2xl mx-auto px-4">
            {t("subtitle")}
          </p>
        </motion.div>

        {/* Research Project Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 max-w-4xl mx-auto w-full">
          {projects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
              whileHover={{ scale: 1.02 }}
              onClick={() => setSelectedIndex(index)}
              className="bg-white/80 backdrop-blur-sm rounded-xl p-4 sm:p-6 shadow-lg cursor-pointer hover:shadow-xl transition-all duration-300"
            >
              <div className="text-2xl sm:text-3xl mb-3 sm:mb-4">{project.icon}</div>
              <h3 className="text-lg sm:text-xl font-semibold text-gray-800 mb-2">{project.title}</h3>
              <p className="text-gray-600 text-xs sm:text-sm mb-3 sm:mb-4 line-clamp-2">{project.description}</p>
              <div className="flex items-center justify-between">
                <span
                  className={`px-2 sm:px-3 py-1 rounded-full text-xs font-medium ${
                    project.statusRaw === "Active" ? "bg-green-100 text-green-800" : "bg-yellow-100 text-yellow-800"
                  }`}
                >
                  {project.status}
                </span>
                <span className="text-xs text-gray-500 hidden sm:inline">{t("clickToLearnMore")}</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Project Detail Modal */}
      <AnimatePresence>
        {selectedIndex !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setSelectedIndex(null)}
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
                onClick={() => setSelectedIndex(null)}
                className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-full bg-gray-100 hover:bg-gray-200 text-gray-600 hover:text-gray-800 transition-all duration-200 z-10"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
              {selectedIndex !== null && (() => {
                const p = projects[selectedIndex]
                return (
                  <>
                    <div className="text-3xl sm:text-4xl mb-3 sm:mb-4">{p.icon}</div>
                    <h3 className="text-xl sm:text-2xl font-bold text-gray-800 mb-3 sm:mb-4">{p.title}</h3>
                    <p className="text-gray-600 leading-relaxed mb-4 sm:mb-6 text-sm sm:text-base">{p.description}</p>
                    <div className="mb-3 sm:mb-4">
                      <h4 className="font-semibold text-gray-800 mb-2 text-sm sm:text-base">{t("teamMembersLabel")}</h4>
                      <p className="text-gray-600 text-sm sm:text-base">{p.team.join(", ")}</p>
                    </div>
                    <div className="mb-4 sm:mb-6">
                      <span
                        className={`px-3 py-1 rounded-full text-sm font-medium ${
                          p.statusRaw === "Active" ? "bg-green-100 text-green-800" : "bg-yellow-100 text-yellow-800"
                        }`}
                      >
                        {t("statusLabel")} {p.status}
                      </span>
                    </div>
                  </>
                )
              })()}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
