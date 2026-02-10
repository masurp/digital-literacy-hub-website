"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import Navigation from "@/components/navigation"

export default function DigitalLiteracyPage() {
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
            <Link href="/#mission">
              <span className="text-teal-600 hover:text-teal-700 font-semibold cursor-pointer transition-colors duration-300 flex items-center gap-2">
                ← Back
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
              How We View{" "}
              <span className="bg-gradient-to-r from-teal-600 via-emerald-600 to-cyan-600 bg-clip-text text-transparent">
                Digital Literacy
              </span>
            </h1>
            <p className="text-lg sm:text-xl text-gray-600 mt-6">
              Understanding digital literacy as dynamic competencies for navigating our increasingly complex digital world.
            </p>
          </motion.div>

          {/* Content Section */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 sm:p-10 shadow-xl mb-12"
          >
            <div className="prose prose-sm sm:prose lg:prose-lg max-w-none text-gray-700">
              <p className="text-base sm:text-lg leading-relaxed mb-6">
                We often think of "digital literacy" as a simple checklist — knowing how to use a search engine or change privacy settings. But in a world filled with AI, complex algorithms, and constant connectivity, being digitally literate means much more. At the Digital Literacy Hub, we view literacy not as a static list of technical skills, but as a dynamic set of four core competencies applied to the areas of life that matter most. We view this as a "map" that connects key skills —Technical Skills, Information Processing, Communication, and Content Creation — to critical environments: e.g., Computer & Internet, Privacy & Data, News & Misinformation, Advertising, AI & Algorithms, or Digital Well-being. True literacy isn't just about pressing buttons; it is about people having the critical thinking to spot a deepfake, the creativity to use AI tools effectively, and the reflection skills to manage screen time for better mental health.
              </p>
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-4">Skills do not exist in <span className="bg-gradient-to-r from-teal-600 via-emerald-600 to-cyan-600 bg-clip-text text-transparent">isolation</span></h2>
              <p className="text-base sm:text-lg leading-relaxed mb-6">
                A key part of our philosophy is that these skills do not exist in isolation—they are deeply connected. We believe in a "ripple effect" of digital learning: the strengths people build in one area often help them in others. For example, adolescents who are highly skilled at communicating on social media might need help transferring those skills to understand data privacy or the impact of algorithms. Conversely, seniors might approach the digital world with great caution and safety awareness but require more support with basic technical navigation. This interconnected view allows us to see the full picture of a person's digital life. It recognizes that someone isn't simply "literate" or "illiterate," but has a unique profile of strengths and gaps—whether they are a "socializer" excellent at connection or an "information seeker" who excels at research but struggles with digital stress.
              </p>
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-4">The need for <span className="bg-gradient-to-r from-teal-600 via-emerald-600 to-cyan-600 bg-clip-text text-transparent">tailored interventions</span></h2>
              <p className="text-base sm:text-lg leading-relaxed mb-6">
                This holistic view underscores why a "one-size-fits-all" approach to digital education falls short. Because every individual—from a teenager navigating social pressures to a professional adapting to AI—has a different "map" of competencies, education must be tailored to match. By understanding digital literacy as a flexible, multidimensional web of skills, we can move away from generic lectures and towards personalized learning pathways. Our framework is designed to identify exactly where specific groups shine and where they face challenges, allowing for the creation of adaptive tools that meet people where they are. Ultimately, this tailored approach empowers everyone to move beyond basic participation and navigate the digital world with confidence, safety, and purpose.
              </p>
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
              <div className="text-center">
                <img src="https://dmb-lab.nl/wp-content/uploads/2026/01/digital_literacy-scaled.png" alt="Digital Literacy Framework" className="w-full h-full object-cover rounded-lg" />
              </div>
            </div>
          </motion.div>

          {/* CTA Section */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-6">Interested in Our Work?</h2>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/#research">
                <button className="px-8 py-3 bg-gradient-to-r from-teal-600 to-emerald-600 text-white font-semibold rounded-lg hover:shadow-lg transition-all duration-300 hover:scale-105">
                  Explore Our Research
                </button>
              </Link>
              <Link href="/#contact">
                <button className="px-8 py-3 bg-white/80 text-teal-600 font-semibold rounded-lg hover:shadow-lg transition-all duration-300 hover:scale-105">
                  Get in Touch
                </button>
              </Link>
            </div>
          </motion.div>
        </div>
      </main>

      {/* Footer spacing */}
      <div className="h-12" />
    </div>
  )
}
