import Link from "next/link"
import Navigation from "@/components/navigation"
import type { Metadata } from "next"
import { getTranslations } from "next-intl/server"

const LAST_UPDATED = "25 February 2026"

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>
}): Promise<Metadata> {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: "metadata" })
  return {
    title: t("privacyTitle"),
    description: t("privacyDescription"),
  }
}

export default async function PrivacyPage({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: "pages.privacy" })
  const prefix = locale === "nl" ? "" : "/en"

  const s2Items = t.raw("s2Items") as string[]
  const s6Items = t.raw("s6Items") as string[]

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
          <p className="text-sm text-gray-400">{t("lastUpdated").replace("{date}", LAST_UPDATED)}</p>
        </div>

        <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-8 space-y-8 text-gray-700 leading-relaxed">

          <section>
            <h2 className="text-lg font-semibold text-gray-900 mb-3">{t("s1Title")}</h2>
            <p>{t("s1Body")}</p>
            <p className="mt-2">
              {t("s1Contact")}{" "}
              <a href="mailto:p.k.masur@vu.nl" className="text-blue-600 hover:underline">p.k.masur@vu.nl</a>.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-gray-900 mb-3">{t("s2Title")}</h2>
            <p>{t("s2Body")}</p>
            <p className="mt-2">{t("s2Body2")}</p>
            <ul className="mt-2 ml-5 list-disc space-y-1 text-sm">
              {s2Items.map((item, i) => <li key={i}>{item}</li>)}
            </ul>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-gray-900 mb-3">{t("s3Title")}</h2>
            <p>{t("s3Body")}</p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-gray-900 mb-3">{t("s4Title")}</h2>
            <p>
              {t("s4Body").split("Formspree,")[0]}
              <a href="https://formspree.io" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                Formspree
              </a>
              ,{t("s4Body").split("Formspree,")[1]}
            </p>
            <p className="mt-2">
              {t("s4Body2").split(locale === "nl" ? "het privacybeleid van Formspree" : "Formspree's privacy policy")[0]}
              <a href="https://formspree.io/legal/privacy-policy" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                {locale === "nl" ? "het privacybeleid van Formspree" : "Formspree's privacy policy"}
              </a>.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-gray-900 mb-3">{t("s5Title")}</h2>
            <p>
              {t("s5Body")}{" "}
              <a href="mailto:p.k.masur@vu.nl" className="text-blue-600 hover:underline">p.k.masur@vu.nl</a>.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-gray-900 mb-3">{t("s6Title")}</h2>
            <p>{t("s6Intro")}</p>
            <ul className="mt-2 ml-5 list-disc space-y-1 text-sm">
              {s6Items.map((item, i) => {
                const dashIdx = item.indexOf(" — ")
                if (dashIdx === -1) return <li key={i}>{item}</li>
                const bold = item.slice(0, dashIdx)
                const rest = item.slice(dashIdx)
                return <li key={i}><strong>{bold}</strong>{rest}</li>
              })}
            </ul>
            <p className="mt-2">
              {t("s6Contact")}{" "}
              <a href="mailto:p.k.masur@vu.nl" className="text-blue-600 hover:underline">p.k.masur@vu.nl</a>.{" "}
              {t("s6Response")}
            </p>
            <p className="mt-2">
              {t("s6Authority").split("Autoriteit Persoonsgegevens")[0]}
              <a href="https://www.autoriteitpersoonsgegevens.nl/en" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                Autoriteit Persoonsgegevens
              </a>.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-gray-900 mb-3">{t("s7Title")}</h2>
            <p>{t("s7Body")}</p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-gray-900 mb-3">{t("s8Title")}</h2>
            <p>{t("s8Body")}</p>
          </section>

        </div>
      </div>
    </div>
  )
}
