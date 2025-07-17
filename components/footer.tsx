"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"

export default function Footer() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      const scrollHeight = document.documentElement.scrollHeight
      const scrollTop = document.documentElement.scrollTop
      const clientHeight = document.documentElement.clientHeight

      // Show footer when scrolled to within 100px of the bottom
      const isAtBottom = scrollTop + clientHeight >= scrollHeight - 100
      setIsVisible(isAtBottom)
    }

    window.addEventListener("scroll", handleScroll)
    handleScroll() // Check initial position

    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
  }

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.footer
          initial={{ opacity: 0, y: 100 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 100 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="fixed bottom-0 left-0 right-0 z-30 bg-[#238acc] text-white"
        >
          <div className="container mx-auto px-4 py-6 sm:py-8">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 sm:gap-8">
              {/* VU Logo and Branding */}
              <div className="md:col-span-1 flex flex-col items-center md:items-start">
                <motion.div
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  className="mb-4"
                >
                  <img
                    src="https://keystoneacademic-res.cloudinary.com/image/upload/c_pad,w_640,h_304/dpr_auto/f_auto/q_auto/v1/element/11/119258_VUlogo_NL_Blauw_HR_RGB_tcm289-2013751.png"
                    alt="VU Amsterdam Logo"
                    className="h-12 sm:h-16 w-auto"
                  />
                </motion.div>
                <p className="text-sm text-blue-200 text-center md:text-left">Vrije Universiteit Amsterdam</p>
              </div>

              {/* Quick Navigation */}
              <div className="md:col-span-1">
                <motion.h3
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                  className="text-lg font-semibold mb-4 text-center md:text-left"
                >
                  Quick Links
                </motion.h3>
                <motion.ul
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.4 }}
                  className="space-y-2 text-center md:text-left"
                >
                  <li>
                    <button
                      onClick={() => scrollToSection("hero")}
                      className="text-blue-200 hover:text-white transition-colors text-sm"
                    >
                      Home
                    </button>
                  </li>
                  <li>
                    <button
                      onClick={() => scrollToSection("mission")}
                      className="text-blue-200 hover:text-white transition-colors text-sm"
                    >
                      Mission
                    </button>
                  </li>
                  <li>
                    <button
                      onClick={() => scrollToSection("team")}
                      className="text-blue-200 hover:text-white transition-colors text-sm"
                    >
                      Our Team
                    </button>
                  </li>
                  <li>
                    <button
                      onClick={() => scrollToSection("research")}
                      className="text-blue-200 hover:text-white transition-colors text-sm"
                    >
                      Research
                    </button>
                  </li>
                  <li>
                    <button
                      onClick={() => scrollToSection("publications")}
                      className="text-blue-200 hover:text-white transition-colors text-sm"
                    >
                      Publications
                    </button>
                  </li>
                  <li>
                    <button
                      onClick={() => scrollToSection("contact")}
                      className="text-blue-200 hover:text-white transition-colors text-sm"
                    >
                      Contact
                    </button>
                  </li>
                </motion.ul>
              </div>

              {/* Resources */}
              <div className="md:col-span-1">
                <motion.h3
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.5 }}
                  className="text-lg font-semibold mb-4 text-center md:text-left"
                >
                  Resources
                </motion.h3>
                <motion.ul
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.6 }}
                  className="space-y-2 text-center md:text-left"
                >
                  <li>
                    <a
                      href="https://vu.nl/en/about-vu/faculties/faculty-of-social-sciences/departments/communication-science"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-200 hover:text-white transition-colors text-sm"
                    >
                      Communication Science
                    </a>
                  </li>
                  <li>
                    <a
                      href="https://dmb-lab.nl"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-200 hover:text-white transition-colors text-sm"
                    >
                      DMB Lab
                    </a>
                  </li>
                  <li>
                    <a
                      href="https://vu.nl/en/research"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-200 hover:text-white transition-colors text-sm"
                    >
                      VU Research
                    </a>
                  </li>
                  <li>
                    <a
                      href="https://vu.nl/en/education"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-200 hover:text-white transition-colors text-sm"
                    >
                      Education
                    </a>
                  </li>
                </motion.ul>
              </div>

              {/* Legal & Contact */}
              <div className="md:col-span-1">
                <motion.h3
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.7 }}
                  className="text-lg font-semibold mb-4 text-center md:text-left"
                >
                  Legal & Info
                </motion.h3>
                <motion.ul
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.8 }}
                  className="space-y-2 text-center md:text-left"
                >
                  <li>
                    <a
                      href="https://vu.nl/en/about-vu/privacy-statement"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-200 hover:text-white transition-colors text-sm"
                    >
                      Privacy Policy
                    </a>
                  </li>
                  <li>
                    <a
                      href="https://vu.nl/en/about-vu/legal-information"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-200 hover:text-white transition-colors text-sm"
                    >
                      Legal Information
                    </a>
                  </li>
                  <li>
                    <a
                      href="https://vu.nl/en/about-vu/contact"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-200 hover:text-white transition-colors text-sm"
                    >
                      VU Contact
                    </a>
                  </li>
                  <li>
                    <a
                      href="https://vu.nl/en/about-vu/accessibility"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-200 hover:text-white transition-colors text-sm"
                    >
                      Accessibility
                    </a>
                  </li>
                </motion.ul>
              </div>
            </div>

            {/* Bottom Bar */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.9 }}
              className="border-t border-blue-400/30 mt-6 pt-6 flex flex-col sm:flex-row justify-between items-center text-sm text-blue-200"
            >
              <div className="mb-2 sm:mb-0">
                <p>© 2025 Digital Literacy Hub, VU Amsterdam. All rights reserved.</p>
              </div>
              <div className="flex items-center space-x-4">
              </div>
            </motion.div>
          </div>
        </motion.footer>
      )}
    </AnimatePresence>
  )
}
