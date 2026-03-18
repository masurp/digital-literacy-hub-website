"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { useTranslations } from "next-intl"
import LanguageToggle from "@/components/language-toggle"

function DLHLogo({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 40 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      <defs>
        <linearGradient id="logoGrad" x1="0" y1="0" x2="40" y2="40" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#2563eb" />
          <stop offset="50%" stopColor="#7c3aed" />
          <stop offset="100%" stopColor="#0d9488" />
        </linearGradient>
      </defs>
      {/* Connecting spokes */}
      <line x1="20" y1="20" x2="20" y2="9"   stroke="url(#logoGrad)" strokeWidth="1.5" strokeLinecap="round" />
      <line x1="20" y1="20" x2="30" y2="14"  stroke="url(#logoGrad)" strokeWidth="1.5" strokeLinecap="round" />
      <line x1="20" y1="20" x2="30" y2="26"  stroke="url(#logoGrad)" strokeWidth="1.5" strokeLinecap="round" />
      <line x1="20" y1="20" x2="20" y2="31"  stroke="url(#logoGrad)" strokeWidth="1.5" strokeLinecap="round" />
      <line x1="20" y1="20" x2="10" y2="26"  stroke="url(#logoGrad)" strokeWidth="1.5" strokeLinecap="round" />
      <line x1="20" y1="20" x2="10" y2="14"  stroke="url(#logoGrad)" strokeWidth="1.5" strokeLinecap="round" />
      {/* Outer nodes */}
      <circle cx="20" cy="9"  r="2.5" fill="#2563eb" />
      <circle cx="30" cy="14" r="2.5" fill="#4f46e5" />
      <circle cx="30" cy="26" r="2.5" fill="#7c3aed" />
      <circle cx="20" cy="31" r="2.5" fill="#0d9488" />
      <circle cx="10" cy="26" r="2.5" fill="#0d9488" />
      <circle cx="10" cy="14" r="2.5" fill="#2563eb" />
      {/* Central hub node */}
      <circle cx="20" cy="20" r="4" fill="url(#logoGrad)" />
    </svg>
  )
}

export default function Navigation() {
  const t = useTranslations("nav")
  const [activeSection, setActiveSection] = useState("hero")
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  const navItems = [
    { id: "hero",         label: t("home") },
    { id: "mission",      label: t("mission") },
    { id: "team",         label: t("team") },
    { id: "publications", label: t("publications") },
    { id: "contact",      label: t("contact") },
  ]

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
      const sections = navItems.map((item) => document.getElementById(item.id))
      const scrollPosition = window.scrollY + 80

      for (let i = sections.length - 1; i >= 0; i--) {
        const section = sections[i]
        if (section && section.offsetTop <= scrollPosition) {
          setActiveSection(navItems[i].id)
          break
        }
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) element.scrollIntoView({ behavior: "smooth" })
    setIsMenuOpen(false)
  }

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-white/90 backdrop-blur-md shadow-sm border-b border-gray-200/60"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">

          {/* Logo + brand */}
          <button
            onClick={() => scrollToSection("hero")}
            className="flex items-center gap-3 group"
          >
            <DLHLogo className="w-9 h-9 flex-shrink-0 group-hover:scale-105 transition-transform duration-200" />
            <span className={`font-bold text-base sm:text-lg leading-tight transition-colors duration-300 ${
              scrolled ? "text-gray-800" : "text-gray-800"
            }`}>
              <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-teal-600 bg-clip-text text-transparent">
                Digital Literacy Hub
              </span>
            </span>
          </button>

          {/* Desktop nav links */}
          <nav className="hidden lg:flex items-center gap-1">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className={`relative px-4 py-2 text-sm font-medium rounded-lg transition-all duration-200 ${
                  activeSection === item.id
                    ? "text-blue-600"
                    : "text-gray-600 hover:text-gray-900 hover:bg-gray-100/70"
                }`}
              >
                {item.label}
                {activeSection === item.id && (
                  <motion.div
                    layoutId="activeBar"
                    className="absolute bottom-0 left-2 right-2 h-0.5 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"
                    initial={false}
                    transition={{ type: "spring", stiffness: 400, damping: 35 }}
                  />
                )}
              </button>
            ))}
          </nav>

          {/* Right side: language toggle + mobile hamburger */}
          <div className="flex items-center gap-3">
            <div className="hidden sm:block">
              <LanguageToggle />
            </div>

            {/* Mobile hamburger */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="lg:hidden p-2 rounded-lg text-gray-600 hover:bg-gray-100 transition-colors"
              aria-label="Toggle menu"
            >
              <motion.div animate={{ rotate: isMenuOpen ? 45 : 0 }} transition={{ duration: 0.2 }}>
                {isMenuOpen ? (
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                ) : (
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                  </svg>
                )}
              </motion.div>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile dropdown */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.18 }}
            className="lg:hidden bg-white border-t border-gray-200 shadow-lg"
          >
            <div className="px-4 py-3 space-y-1">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className={`block w-full text-left px-4 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                    activeSection === item.id
                      ? "bg-blue-50 text-blue-600"
                      : "text-gray-700 hover:bg-gray-100"
                  }`}
                >
                  {item.label}
                </button>
              ))}
              <div className="pt-2 pb-1 px-4">
                <LanguageToggle />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
