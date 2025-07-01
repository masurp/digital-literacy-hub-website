"use client"

import { motion } from "framer-motion"

export default function MissionSection() {
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
            Our{" "}
            <span className="bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">Mission</span>
          </h2>
          <p className="text-base sm:text-lg text-gray-600 max-w-2xl mx-auto px-4">
            Empowering digital citizenship through research, collaboration, and innovation
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
              At the Digital Literacy Hub, we explore how people navigate, resist, and reshape the digital world. Our
              mission is to empower individuals and communities through research-driven insights and tailored
              interventions that foster critical, confident, and responsible digital engagement. We believe that digital
              literacy is not a static skillset, but a dynamic and evolving capacity—one that must be cultivated in
              dialogue with rapidly shifting technologies, platforms, and societal norms.
            </p>
            <p className="text-base sm:text-lg text-gray-700 leading-relaxed">
              Rooted in academic excellence and interdisciplinary collaboration, the Hub brings together researchers,
              educators, designers, and policymakers to co-create solutions that matter. From AI-driven personalization
              and social media behavior to platform governance and data ethics, our work addresses the pressing
              challenges of digital life. We aim to bridge theory and practice—translating complex insights into
              practical tools and strategies that support digital citizenship, safeguard privacy, and promote media
              wellbeing for all.
            </p>
          </motion.div>

          {/* Key Values Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="bg-white/80 backdrop-blur-sm rounded-xl p-4 sm:p-6 shadow-lg"
            >
              <div className="text-2xl sm:text-3xl mb-3 sm:mb-4 text-center">🔍</div>
              <h3 className="text-lg sm:text-xl font-semibold text-gray-800 mb-2 text-center">Research-Driven</h3>
              <p className="text-gray-600 text-sm sm:text-base text-center">
                Grounding our work in rigorous academic research and evidence-based insights
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="bg-white/80 backdrop-blur-sm rounded-xl p-4 sm:p-6 shadow-lg"
            >
              <div className="text-2xl sm:text-3xl mb-3 sm:mb-4 text-center">🤝</div>
              <h3 className="text-lg sm:text-xl font-semibold text-gray-800 mb-2 text-center">Collaborative</h3>
              <p className="text-gray-600 text-sm sm:text-base text-center">
                Bringing together diverse perspectives from academia, industry, and civil society
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="bg-white/80 backdrop-blur-sm rounded-xl p-4 sm:p-6 shadow-lg"
            >
              <div className="text-2xl sm:text-3xl mb-3 sm:mb-4 text-center">⚖️</div>
              <h3 className="text-lg sm:text-xl font-semibold text-gray-800 mb-2 text-center">Ethical</h3>
              <p className="text-gray-600 text-sm sm:text-base text-center">
                Promoting responsible digital practices and safeguarding individual rights and wellbeing
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="bg-white/80 backdrop-blur-sm rounded-xl p-4 sm:p-6 shadow-lg"
            >
              <div className="text-2xl sm:text-3xl mb-3 sm:mb-4 text-center">🌍</div>
              <h3 className="text-lg sm:text-xl font-semibold text-gray-800 mb-2 text-center">Inclusive</h3>
              <p className="text-gray-600 text-sm sm:text-base text-center">
                Ensuring digital literacy solutions work for diverse communities and contexts
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.7 }}
              className="bg-white/80 backdrop-blur-sm rounded-xl p-4 sm:p-6 shadow-lg"
            >
              <div className="text-2xl sm:text-3xl mb-3 sm:mb-4 text-center">🚀</div>
              <h3 className="text-lg sm:text-xl font-semibold text-gray-800 mb-2 text-center">Innovative</h3>
              <p className="text-gray-600 text-sm sm:text-base text-center">
                Developing cutting-edge approaches to address emerging digital challenges
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
              className="bg-white/80 backdrop-blur-sm rounded-xl p-4 sm:p-6 shadow-lg"
            >
              <div className="text-2xl sm:text-3xl mb-3 sm:mb-4 text-center">🎯</div>
              <h3 className="text-lg sm:text-xl font-semibold text-gray-800 mb-2 text-center">Impact-Focused</h3>
              <p className="text-gray-600 text-sm sm:text-base text-center">
                Translating research into practical tools and strategies that make a real difference
              </p>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  )
}
