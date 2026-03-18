import Link from "next/link"
import Navigation from "@/components/navigation"
import type { Metadata } from "next"
import { getTranslations } from "next-intl/server"

const LAST_REVIEWED = "25 February 2026"

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>
}): Promise<Metadata> {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: "metadata" })
  return {
    title: t("accessibilityTitle"),
    description: t("accessibilityDescription"),
  }
}

export default async function AccessibilityPage({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: "pages.accessibility" })
  const prefix = locale === "nl" ? "" : "/en"

  const s2Items = t.raw("s2Items") as string[]
  const s3Items = t.raw("s3Items") as string[]

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />

      <div className="max-w-3xl mx-auto px-4 py-16">
        <div className="mb-8">
          <Link href={`${prefix}/`} className="text-blue-600 hover:text-blue-700 text-sm inline-flex items-center gap-1 mb-6">
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            {t("back")}
          </Link>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">{t("title")}</h1>
          <p className="text-sm text-gray-400">{t("lastReviewed").replace("{date}", LAST_REVIEWED)}</p>
        </div>

        <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-8 space-y-8 text-gray-700 leading-relaxed">

          <section>
            <h2 className="text-lg font-semibold text-gray-900 mb-3">{t("s1Title")}</h2>
            <p>
              {t("s1Body").split("Web Content Accessibility Guidelines (WCAG) 2.1")[0]}
              <a href="https://www.w3.org/TR/WCAG21/" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                Web Content Accessibility Guidelines (WCAG) 2.1
              </a>
              {t("s1Body").split("Web Content Accessibility Guidelines (WCAG) 2.1")[1]}
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-gray-900 mb-3">{t("s2Title")}</h2>
            <ul className="ml-5 list-disc space-y-1 text-sm">
              {s2Items.map((item, i) => <li key={i}>{item}</li>)}
            </ul>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-gray-900 mb-3">{t("s3Title")}</h2>
            <p>{t("s3Intro")}</p>
            <ul className="mt-2 ml-5 list-disc space-y-2 text-sm">
              {s3Items.map((item, i) => {
                const dashIdx = item.indexOf(" — ")
                if (dashIdx === -1) return <li key={i}>{item}</li>
                const bold = item.slice(0, dashIdx)
                const rest = item.slice(dashIdx + 3)
                return <li key={i}><strong>{bold}</strong> — {rest}</li>
              })}
            </ul>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-gray-900 mb-3">{t("s4Title")}</h2>
            <p>{t("s4Body")}</p>
            <p className="mt-2">
              <a href="mailto:p.k.masur@vu.nl" className="text-blue-600 hover:underline">p.k.masur@vu.nl</a>
            </p>
            <p className="mt-2 text-sm text-gray-500">{t("s4Response")}</p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-gray-900 mb-3">{t("s5Title")}</h2>
            <p className="text-sm">{t("s5Body")}</p>
          </section>

        </div>
      </div>
    </div>
  )
}
