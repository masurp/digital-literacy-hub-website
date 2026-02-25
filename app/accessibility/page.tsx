import Link from "next/link"
import Navigation from "@/components/navigation"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Accessibility",
  description: "Accessibility statement for the Digital Literacy Hub website, outlining our commitment to inclusive design and known limitations.",
}

const LAST_REVIEWED = "25 February 2026"

export default function AccessibilityPage() {
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
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Accessibility Statement</h1>
          <p className="text-sm text-gray-400">Last reviewed: {LAST_REVIEWED}</p>
        </div>

        <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-8 space-y-8 text-gray-700 leading-relaxed">

          <section>
            <h2 className="text-lg font-semibold text-gray-900 mb-3">Our commitment</h2>
            <p>
              The Digital Literacy Hub is committed to making this website as accessible as possible to all
              visitors, including people with disabilities. We aim to meet the{" "}
              <a
                href="https://www.w3.org/TR/WCAG21/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:underline"
              >
                Web Content Accessibility Guidelines (WCAG) 2.1
              </a>{" "}
              at Level AA, in line with the EU Web Accessibility Directive.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-gray-900 mb-3">What works well</h2>
            <ul className="ml-5 list-disc space-y-1 text-sm">
              <li>All pages can be navigated using a keyboard</li>
              <li>Text content uses sufficient colour contrast against its background</li>
              <li>The site uses semantic HTML headings to structure content logically</li>
              <li>All form fields are labelled</li>
              <li>The site works without JavaScript for its core informational content</li>
              <li>Text can be resized up to 200% without loss of content or functionality</li>
            </ul>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-gray-900 mb-3">Known limitations</h2>
            <p>We are transparent about the following areas where the site does not fully meet WCAG 2.1 AA:</p>
            <ul className="mt-2 ml-5 list-disc space-y-2 text-sm">
              <li>
                <strong>3D animations</strong> — The interactive 3D visualisations on the homepage (network
                animation, wave background, floating nodes) are decorative and not accessible to screen
                readers. They do not convey information and are marked as presentational where possible.
              </li>
              <li>
                <strong>Motion</strong> — The site uses animations and motion effects that cannot currently be
                disabled via a preference setting. We aim to respect the{" "}
                <code className="text-xs bg-gray-100 px-1 py-0.5 rounded">prefers-reduced-motion</code> system
                setting in a future update.
              </li>
              <li>
                <strong>Data analysis page</strong> — The interactive data analysis tool requires mouse or
                pointer interaction for some features and may not be fully usable with keyboard-only navigation.
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-gray-900 mb-3">Report an issue</h2>
            <p>
              If you encounter an accessibility barrier on this site, or if you need content in an alternative
              format, please contact us and we will do our best to help:
            </p>
            <p className="mt-2">
              <a href="mailto:p.k.masur@vu.nl" className="text-blue-600 hover:underline">
                p.k.masur@vu.nl
              </a>
            </p>
            <p className="mt-2 text-sm text-gray-500">
              We aim to respond to accessibility queries within 5 working days.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-gray-900 mb-3">Technical information</h2>
            <p className="text-sm">
              This website is built with Next.js and React. It has been tested in modern versions of Chrome,
              Firefox, and Safari on desktop and mobile. It has not yet been formally audited by an independent
              accessibility specialist.
            </p>
          </section>

        </div>
      </div>
    </div>
  )
}
