"use client"

import { useEffect, useRef } from "react"
import HeroSection from "@/components/hero-section"
import TeamSection from "@/components/team-section"
import ResearchSection from "@/components/research-section"
import PublicationsSection from "@/components/publications-section"
import ContactSection from "@/components/contact-section"
import Navigation from "@/components/navigation"
import ScrollHeader from "@/components/scroll-header"
import Footer from "@/components/footer"
import MissionSection from "@/components/mission-section"

export default function Home() {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // Smooth scrolling behavior
    document.documentElement.style.scrollBehavior = "smooth"

    return () => {
      document.documentElement.style.scrollBehavior = "auto"
    }
  }, [])

  return (
    <div ref={containerRef} className="relative">
      <Navigation />
      <ScrollHeader />

      <main className="relative">
        <section id="hero" className="min-h-screen">
          <HeroSection />
        </section>

        <section id="mission" className="min-h-screen">
          <MissionSection />
        </section>

        <section id="team" className="min-h-screen">
          <TeamSection />
        </section>

        <section id="publications" className="min-h-screen">
          <PublicationsSection />
        </section>

        <section id="contact" className="min-h-screen">
          <ContactSection />
        </section>
      </main>

      <Footer />
    </div>
  )
}
