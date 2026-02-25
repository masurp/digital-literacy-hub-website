import Link from "next/link"
import Navigation from "@/components/navigation"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "Privacy policy for the Digital Literacy Hub website, explaining how we handle personal data in compliance with GDPR.",
}

const LAST_UPDATED = "25 February 2026"

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />

      <div className="max-w-3xl mx-auto px-4 py-16">
        <div className="mb-8">
          <Link href="/" className="text-blue-600 hover:text-blue-700 text-sm inline-flex items-center gap-1 mb-6">
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back to Hub
          </Link>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Privacy Policy</h1>
          <p className="text-sm text-gray-400">Last updated: {LAST_UPDATED}</p>
        </div>

        <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-8 space-y-8 text-gray-700 leading-relaxed">

          <section>
            <h2 className="text-lg font-semibold text-gray-900 mb-3">1. Who we are</h2>
            <p>
              This website is operated by the Digital Literacy Hub, a research group based at the Department of
              Communication Science, Vrije Universiteit Amsterdam (VU Amsterdam), De Boelelaan 1105,
              1081 HV Amsterdam, the Netherlands.
            </p>
            <p className="mt-2">
              The hub is led by Dr. Philipp K. Masur. For questions about this privacy policy or your personal data,
              please contact us at{" "}
              <a href="mailto:p.k.masur@vu.nl" className="text-blue-600 hover:underline">
                p.k.masur@vu.nl
              </a>.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-gray-900 mb-3">2. What data we collect</h2>
            <p>
              This website does not use cookies, tracking technologies, or analytics tools, and does not collect
              any personal data from visitors simply browsing the site.
            </p>
            <p className="mt-2">
              The only situation in which personal data is collected is when you voluntarily submit the{" "}
              <strong>contact form</strong>. In that case, the following data is collected:
            </p>
            <ul className="mt-2 ml-5 list-disc space-y-1 text-sm">
              <li>Your name</li>
              <li>Your email address</li>
              <li>Your message</li>
              <li>Your stated background or role (e.g. researcher, journalist)</li>
            </ul>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-gray-900 mb-3">3. Why we collect it</h2>
            <p>
              Contact form data is collected solely to respond to your enquiry. The legal basis for processing
              this data is <strong>legitimate interest</strong> (Article 6(1)(f) GDPR) — specifically, the
              legitimate interest in being able to respond to messages sent to us through the site.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-gray-900 mb-3">4. How data is processed — Formspree</h2>
            <p>
              Contact form submissions are handled by{" "}
              <a
                href="https://formspree.io"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:underline"
              >
                Formspree
              </a>
              , a third-party form processing service operated by Formspree, Inc. (United States). When you
              submit the contact form, your data is transmitted to and temporarily stored on Formspree's servers
              before being forwarded to us by email.
            </p>
            <p className="mt-2">
              Formspree acts as a data processor on our behalf. The transfer of data to the US is based on
              Formspree's compliance with applicable data transfer mechanisms. For more information, see{" "}
              <a
                href="https://formspree.io/legal/privacy-policy"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:underline"
              >
                Formspree's privacy policy
              </a>.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-gray-900 mb-3">5. How long we keep your data</h2>
            <p>
              We retain contact form submissions only as long as necessary to handle your enquiry, typically no
              longer than 12 months. You can request deletion at any time by contacting us at{" "}
              <a href="mailto:p.k.masur@vu.nl" className="text-blue-600 hover:underline">
                p.k.masur@vu.nl
              </a>.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-gray-900 mb-3">6. Your rights under GDPR</h2>
            <p>If you are based in the EU/EEA, you have the following rights regarding your personal data:</p>
            <ul className="mt-2 ml-5 list-disc space-y-1 text-sm">
              <li><strong>Right of access</strong> — you can request a copy of the data we hold about you</li>
              <li><strong>Right to rectification</strong> — you can ask us to correct inaccurate data</li>
              <li><strong>Right to erasure</strong> — you can ask us to delete your data</li>
              <li><strong>Right to restrict processing</strong> — you can ask us to limit how we use your data</li>
              <li><strong>Right to object</strong> — you can object to our processing based on legitimate interest</li>
            </ul>
            <p className="mt-2">
              To exercise any of these rights, contact us at{" "}
              <a href="mailto:p.k.masur@vu.nl" className="text-blue-600 hover:underline">
                p.k.masur@vu.nl
              </a>. We will respond within 30 days.
            </p>
            <p className="mt-2">
              You also have the right to lodge a complaint with the Dutch data protection authority,
              the{" "}
              <a
                href="https://www.autoriteitpersoonsgegevens.nl/en"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:underline"
              >
                Autoriteit Persoonsgegevens
              </a>.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-gray-900 mb-3">7. External links</h2>
            <p>
              This website contains links to external websites (e.g. published research, VU Amsterdam pages).
              We are not responsible for the privacy practices of those sites and encourage you to review their
              respective privacy policies.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-gray-900 mb-3">8. Changes to this policy</h2>
            <p>
              We may update this privacy policy from time to time. The date at the top of this page reflects
              when it was last revised. We encourage you to review it periodically.
            </p>
          </section>

        </div>
      </div>
    </div>
  )
}
