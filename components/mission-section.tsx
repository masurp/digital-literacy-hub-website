"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import { useTranslations } from "next-intl"
import { useLocale } from "next-intl"

export default function MissionSection() {
  const t = useTranslations("mission")
  const locale = useLocale()
  const digitalLiteracyHref = locale === "nl" ? "/digital-literacy" : "/en/digital-literacy"

  return (
    <div className="relative w-full min-h-screen bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-50 overflow-hidden">
      {/* Content Overlay */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-4 py-12 sm:py-16">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="text-center mb-8 sm:mb-12"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-800 mb-3 sm:mb-4">
            <span className="bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">{t("title")}</span>
          </h2>
          <p className="text-base sm:text-lg text-gray-600 max-w-2xl mx-auto px-4">
            {t("subtitle")}
          </p>
        </motion.div>

        {/* Mission Statement */}
        <div className="max-w-4xl mx-auto w-full">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 sm:p-8 shadow-xl mb-6 sm:mb-8"
          >
            <p className="text-base sm:text-lg text-gray-700 leading-relaxed mb-4 sm:mb-6">
              {t("p1")}
            </p>
            <p className="text-base sm:text-lg text-gray-700 leading-relaxed">
              {t("p2")}
            </p>
            <Link href={digitalLiteracyHref}>
              <p className="text-center mt-6 sm:mt-8">
                <span className="text-teal-600 hover:text-teal-700 font-semibold cursor-pointer transition-colors duration-300">
                  {t("learnMore")}
                </span>
              </p>
            </Link>
          </motion.div>

          {/* Key Values Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {(["research", "collaborative", "ethical", "inclusive", "innovative", "impact"] as const).map(
              (key, i) => (
                <motion.div
                  key={key}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.3 + i * 0.1 }}
                  className="bg-white/80 backdrop-blur-sm rounded-xl p-4 sm:p-6 shadow-lg"
                >
                  <div className="text-2xl sm:text-3xl mb-3 sm:mb-4 text-center">
                    {["🔍", "🤝", "⚖️", "🌍", "🚀", "🎯"][i]}
                  </div>
                  <h3 className="text-lg sm:text-xl font-semibold text-gray-800 mb-2 text-center">
                    {t(`values.${key}.title`)}
                  </h3>
                  <p className="text-gray-600 text-sm sm:text-base text-center">
                    {t(`values.${key}.description`)}
                  </p>
                </motion.div>
              )
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
