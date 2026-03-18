"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import Navigation from "@/components/navigation"
import { useTranslations, useLocale } from "next-intl"

export default function DigitalLiteracyPage() {
  const t = useTranslations("pages.digitalLiteracy")
  const locale = useLocale()
  const prefix = locale === "nl" ? "" : "/en"

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
      <Navigation />

      <main className="relative z-10 pt-20 sm:pt-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          {/* Back Link */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-8"
          >
            <Link href={`${prefix}/#mission`}>
              <span className="text-teal-600 hover:text-teal-700 font-semibold cursor-pointer transition-colors duration-300 flex items-center gap-2">
                {t("back")}
              </span>
            </Link>
          </motion.div>

          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="mb-12"
          >
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-gray-800 mb-4 leading-tight">
              <span className="bg-gradient-to-r from-teal-600 via-emerald-600 to-cyan-600 bg-clip-text text-transparent">
                {t("title")}
              </span>
            </h1>
            <p className="text-lg sm:text-xl text-gray-600 mt-6">{t("subtitle")}</p>
          </motion.div>

          {/* Content Section */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 sm:p-10 shadow-xl mb-12"
          >
            <div className="prose prose-sm sm:prose lg:prose-lg max-w-none text-gray-700">
              <p className="text-base sm:text-lg leading-relaxed mb-6">{t("p1")}</p>
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-4">
                {t("h2Skills").split("{gradient}")[0]}
                <span className="bg-gradient-to-r from-teal-600 via-emerald-600 to-cyan-600 bg-clip-text text-transparent">
                  {t("h2SkillsGradient")}
                </span>
                {t("h2Skills").split("{gradient}")[1]}
              </h2>
              <p className="text-base sm:text-lg leading-relaxed mb-6">{t("p2")}</p>
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-4">
                {t("h2Interventions").split("{gradient}")[0]}
                <span className="bg-gradient-to-r from-teal-600 via-emerald-600 to-cyan-600 bg-clip-text text-transparent">
                  {t("h2InterventionsGradient")}
                </span>
                {t("h2Interventions").split("{gradient}")[1]}
              </h2>
              <p className="text-base sm:text-lg leading-relaxed mb-6">{t("p3")}</p>
            </div>
          </motion.div>

          {/* Featured Image Section */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-xl overflow-hidden mb-12"
          >
            <div className="aspect-video bg-gradient-to-br from-teal-400 via-emerald-400 to-cyan-400 rounded-lg flex items-center justify-center">
              <img
                src="https://dmb-lab.nl/wp-content/uploads/2026/01/digital_literacy-scaled.png"
                alt="Digital Literacy Framework"
                className="w-full h-full object-cover rounded-lg"
              />
            </div>
          </motion.div>

          {/* CTA Section */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-6">{t("ctaTitle")}</h2>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href={`${prefix}/#research`}>
                <button className="px-8 py-3 bg-gradient-to-r from-teal-600 to-emerald-600 text-white font-semibold rounded-lg hover:shadow-lg transition-all duration-300 hover:scale-105">
                  {t("ctaResearch")}
                </button>
              </Link>
              <Link href={`${prefix}/#contact`}>
                <button className="px-8 py-3 bg-white/80 text-teal-600 font-semibold rounded-lg hover:shadow-lg transition-all duration-300 hover:scale-105">
                  {t("ctaContact")}
                </button>
              </Link>
            </div>
          </motion.div>
        </div>
      </main>

      <div className="h-12" />
    </div>
  )
}
