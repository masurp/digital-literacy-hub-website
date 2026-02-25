"use client"

import { useState } from "react"
import { Canvas } from "@react-three/fiber"
import { Suspense } from "react"
import { motion } from "framer-motion"
import { OrbitControls } from "@react-three/drei"
import DigitalWaves from "@/components/3d/digital-waves"

const AUDIENCES = [
  {
    id: "policymaker",
    label: "Policymakers & Politicians",
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
      </svg>
    ),
    description: "We provide expert testimony, policy briefs, and advisory input on digital literacy, online safety, and AI regulation.",
  },
  {
    id: "ngo",
    label: "NGOs & Civil Society",
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
      </svg>
    ),
    description: "We are open to partner with organizations working on digital rights, digital and media literacy, and online safety.",
  },
  {
    id: "educator",
    label: "Schools & Educators",
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
      </svg>
    ),
    description: "We offer teacher training and workshops on digital literacy tailored for all age groups. We are also interested in collaborating on curriculum development and educational research projects.",
  },
  {
    id: "journalist",
    label: "Journalists & Media",
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
      </svg>
    ),
    description: "We provide expert commentary and data on digital media, privacy and data protection, misinformation, and AI for your stories.",
  },
  {
    id: "researcher",
    label: "Fellow Researchers",
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
      </svg>
    ),
    description: "We are open to collaboration on digital literacy, communication, and media research.",
  },
]

const FORMSPREE_ENDPOINT = "https://formspree.io/f/xnjblwbj"

export default function ContactSection() {
  const [selectedAudience, setSelectedAudience] = useState("")
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle")

  const handleSubmit = async (e: React.BaseSyntheticEvent) => {
    e.preventDefault()
    setStatus("sending")
    const form = e.currentTarget as HTMLFormElement
    const data = new FormData(form)

    try {
      const res = await fetch(FORMSPREE_ENDPOINT, {
        method: "POST",
        body: data,
        headers: { Accept: "application/json" },
      })
      if (res.ok) {
        setStatus("success")
        form.reset()
        setSelectedAudience("")
      } else {
        setStatus("error")
      }
    } catch {
      setStatus("error")
    }
  }

  return (
    <div className="relative w-full bg-gradient-to-br from-slate-900 via-teal-950 to-blue-950 overflow-hidden">
      {/* 3D Background */}
      <div className="absolute inset-0">
        <Canvas camera={{ position: [0, 0, 8], fov: 75 }}>
          <Suspense fallback={null}>
            <ambientLight intensity={0.6} />
            <pointLight position={[10, 10, 10]} />
            <DigitalWaves />
          </Suspense>
          <OrbitControls enableZoom={false} enablePan={false} />
        </Canvas>
      </div>

      {/* Content */}
      <div className="relative z-10 px-4 py-20 sm:py-28 max-w-6xl mx-auto">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-14"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4">
            Get in{" "}
            <span className="bg-gradient-to-r from-teal-400 to-blue-400 bg-clip-text text-transparent">
              Touch
            </span>
          </h2>
          <p className="text-base sm:text-lg text-blue-100 max-w-2xl mx-auto">
            Whether you're shaping policy, teaching the next generation, reporting on digital society, or conducting research — we'd love to connect.
          </p>
        </motion.div>

        {/* Audience cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 mb-16 items-start">
          {AUDIENCES.map((audience, i) => (
            <motion.button
              key={audience.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              viewport={{ once: true }}
              onClick={() => {
                setSelectedAudience(audience.id)
                document.getElementById("contact-form")?.scrollIntoView({ behavior: "smooth", block: "center" })
              }}
              className={`text-left p-5 rounded-2xl border transition-all duration-200 cursor-pointer group ${
                selectedAudience === audience.id
                  ? "bg-white/20 border-teal-400 shadow-lg shadow-teal-500/20"
                  : "bg-white/8 border-white/15 hover:bg-white/15 hover:border-white/30"
              }`}
            >
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center mb-3 transition-colors ${
                selectedAudience === audience.id
                  ? "bg-teal-500 text-white"
                  : "bg-white/10 text-teal-300 group-hover:bg-white/20"
              }`}>
                {audience.icon}
              </div>
              <p className="text-sm font-semibold text-white mb-1.5">{audience.label}</p>
              <p className="text-xs text-blue-200 leading-relaxed">{audience.description}</p>
            </motion.button>
          ))}
        </div>

        {/* Contact form */}
        <motion.div
          id="contact-form"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="max-w-2xl mx-auto bg-white/10 backdrop-blur-sm rounded-2xl p-6 sm:p-8 border border-white/20 shadow-xl"
        >
          <h3 className="text-xl font-semibold text-white mb-6 text-center">Send us a message</h3>

          {status === "success" ? (
            <div className="text-center py-8">
              <div className="w-14 h-14 bg-teal-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-7 h-7 text-teal-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <p className="text-white font-semibold text-lg mb-1">Message sent!</p>
              <p className="text-blue-200 text-sm">We'll get back to you as soon as possible.</p>
              <button
                onClick={() => setStatus("idle")}
                className="mt-5 text-teal-400 hover:text-teal-300 text-sm underline transition-colors"
              >
                Send another message
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Hidden subject line built from audience */}
              <input
                type="hidden"
                name="_subject"
                value={
                  selectedAudience
                    ? `Message from ${AUDIENCES.find((a) => a.id === selectedAudience)?.label ?? "visitor"} — Digital Literacy Hub`
                    : "New message — Digital Literacy Hub"
                }
              />

              {/* I am a... */}
              <div>
                <label className="block text-xs font-semibold text-teal-300 uppercase tracking-wide mb-1.5">
                  I am a…
                </label>
                <select
                  name="audience_type"
                  value={selectedAudience}
                  onChange={(e) => setSelectedAudience(e.target.value)}
                  required
                  className="w-full px-4 py-2.5 bg-white/10 text-white border border-white/20 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-teal-500 [&>option]:text-gray-900"
                >
                  <option value="" disabled>Select your background…</option>
                  {AUDIENCES.map((a) => (
                    <option key={a.id} value={a.id}>{a.label}</option>
                  ))}
                  <option value="other">Other</option>
                </select>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-teal-300 uppercase tracking-wide mb-1.5">
                    Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    required
                    placeholder="Your name"
                    className="w-full px-4 py-2.5 bg-white/10 text-white placeholder-white/40 border border-white/20 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-teal-300 uppercase tracking-wide mb-1.5">
                    Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    required
                    placeholder="your@email.com"
                    className="w-full px-4 py-2.5 bg-white/10 text-white placeholder-white/40 border border-white/20 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-teal-300 uppercase tracking-wide mb-1.5">
                  Message
                </label>
                <textarea
                  name="message"
                  required
                  rows={5}
                  placeholder="Tell us about your interest or request…"
                  className="w-full px-4 py-2.5 bg-white/10 text-white placeholder-white/40 border border-white/20 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-teal-500 resize-none"
                />
              </div>

              {status === "error" && (
                <p className="text-red-400 text-sm text-center">
                  Something went wrong. Please try again or email us directly.
                </p>
              )}

              <button
                type="submit"
                disabled={status === "sending"}
                className="w-full py-3 bg-gradient-to-r from-teal-500 to-blue-500 hover:from-teal-600 hover:to-blue-600 disabled:opacity-60 text-white font-semibold rounded-lg transition-all duration-200 text-sm shadow-lg shadow-teal-500/25"
              >
                {status === "sending" ? "Sending…" : "Send Message"}
              </button>

              <p className="text-center text-xs text-blue-300/60">
                Or reach us directly at{" "}
                <a href="mailto:p.k.masur@vu.nl" className="text-teal-400 hover:text-teal-300 transition-colors">
                  p.k.masur@vu.nl
                </a>
              </p>
            </form>
          )}
        </motion.div>

      </div>
    </div>
  )
}
