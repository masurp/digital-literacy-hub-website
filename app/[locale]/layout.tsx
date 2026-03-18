import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "../globals.css"
import { NextIntlClientProvider } from "next-intl"
import { getMessages, getTranslations } from "next-intl/server"
import { routing } from "@/i18n/routing"
import { notFound } from "next/navigation"

const inter = Inter({ subsets: ["latin"] })

const BASE_URL = "https://www.digitalliteracyhub.nl"

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>
}): Promise<Metadata> {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: "metadata" })

  return {
    metadataBase: new URL(BASE_URL),
    title: {
      default: t("title"),
      template: "%s | Digital Literacy Hub",
    },
    description: t("description"),
    keywords: [
      "digital literacy",
      "digitale geletterdheid",
      "VU Amsterdam",
      "research",
      "privacy",
      "social media",
      "AI ethics",
      "media psychology",
      "communication science",
    ],
    authors: [{ name: "Digital Literacy Hub" }],
    alternates: {
      canonical: BASE_URL,
      languages: {
        nl: BASE_URL,
        en: `${BASE_URL}/en`,
      },
    },
    openGraph: {
      title: t("title"),
      description: t("description"),
      url: locale === "nl" ? BASE_URL : `${BASE_URL}/en`,
      siteName: "Digital Literacy Hub",
      type: "website",
      locale: locale === "nl" ? "nl_NL" : "en_US",
    },
    twitter: {
      card: "summary_large_image",
      title: t("title"),
      description: t("description"),
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
  }
}

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }))
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params

  if (!routing.locales.includes(locale as "nl" | "en")) {
    notFound()
  }

  const messages = await getMessages()

  return (
    <html lang={locale}>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#2563eb" />
      </head>
      <body className={inter.className}>
        <NextIntlClientProvider messages={messages}>
          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  )
}
