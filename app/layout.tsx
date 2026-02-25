import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"

const inter = Inter({ subsets: ["latin"] })

const BASE_URL = "https://www.digitalliteracyhub.nl"

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: {
    default: "Digital Literacy Hub @ VU Amsterdam",
    template: "%s | Digital Literacy Hub",
  },
  description:
    "Research group at VU Amsterdam studying how people navigate digital media, privacy, and AI. Led by Dr. Philipp Masur, we produce evidence-based insights on digital literacy, social media, and algorithmic literacy.",
  keywords: [
    "digital literacy",
    "VU Amsterdam",
    "research",
    "digital citizenship",
    "privacy",
    "social media",
    "AI ethics",
    "media psychology",
    "communication science",
  ],
  authors: [{ name: "Digital Literacy Hub" }],
  alternates: {
    canonical: BASE_URL,
  },
  openGraph: {
    title: "Digital Literacy Hub @ VU Amsterdam",
    description:
      "Research group at VU Amsterdam studying how people navigate digital media, privacy, and AI. Evidence-based insights on digital literacy, social media, and algorithmic literacy.",
    url: BASE_URL,
    siteName: "Digital Literacy Hub",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Digital Literacy Hub @ VU Amsterdam",
    description:
      "Research group at VU Amsterdam studying how people navigate digital media, privacy, and AI. Evidence-based insights on digital literacy, social media, and algorithmic literacy.",
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

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.ico" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#2563eb" />
      </head>
      <body className={inter.className}>{children}</body>
    </html>
  )
}
