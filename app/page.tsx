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
import Script from "next/script"

export default function Home() {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // Smooth scrolling behavior
    document.documentElement.style.scrollBehavior = "smooth"

    return () => {
      document.documentElement.style.scrollBehavior = "auto"
    }
  }, [])

  // JSON-LD structured data for Organization
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "ResearchOrganization",
    name: "Digital Literacy Hub",
    alternateName: "Digital Literacy Hub @ VU Amsterdam",
    url: "https://digitalliteracyhub.vu.nl",
    logo: "https://vu.nl/en/images/logo.svg",
    description:
      "Research hub empowering digital citizenship through evidence-based research, intervention design, and public dialogue on digital literacy, privacy, AI ethics, and social media.",
    foundingDate: "2024",
    parentOrganization: {
      "@type": "EducationalOrganization",
      name: "Vrije Universiteit Amsterdam",
      url: "https://vu.nl/en",
    },
    member: [
      {
        "@type": "Person",
        name: "Philipp K. Masur",
        jobTitle: "Co-Director & Associate Professor",
        url: "https://www.philippmasur.de/",
        sameAs: ["https://research.vu.nl/en/persons/philipp-k-masur"],
      },
      {
        "@type": "Person",
        name: "Douglas Parry",
        jobTitle: "Co-Director & Assistant Professor",
        url: "https://dougaparry.com/",
        sameAs: ["https://research.vu.nl/en/persons/douglas-parry"],
      },
      {
        "@type": "Person",
        name: "Jolanda Veldhuis",
        jobTitle: "Co-Director & Associate Professor",
        sameAs: ["https://research.vu.nl/en/persons/jolanda-veldhuis"],
      },
    ],
    areaServed: "International",
    keywords: [
      "digital literacy",
      "media literacy",
      "digital citizenship",
      "social media literacy",
      "news literacy",
      "privacy",
      "misinformation",
      "AI ethics",
      "media psychology",
      "communication science",
      "communication,"
    ],
  }

  return (
    <>
      {/* JSON-LD Structured Data */}
      <Script id="structured-data" type="application/ld+json" strategy="beforeInteractive">
        {JSON.stringify(structuredData)}
      </Script>

      <div ref={containerRef} className="relative">
        <Navigation />
        <ScrollHeader />

        <main className="relative">
          <section id="hero" className="min-h-screen" aria-label="Hero section">
            <HeroSection />
          </section>

          <section id="mission" className="min-h-screen" aria-label="Mission and digital literacy">
            <MissionSection />
          </section>

          <section id="team" className="min-h-screen" aria-label="Team members and partners">
            <TeamSection />
          </section>

          <section id="publications" className="min-h-screen" aria-label="Research publications">
            <PublicationsSection />
          </section>

          <section id="contact" className="min-h-screen" aria-label="Contact information">
            <ContactSection />
          </section>
        </main>

        <Footer />
      </div>
    </>
  )
}
