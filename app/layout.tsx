import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Digital Literacy Hub @ VU Amsterdam",
  description:
    "Research hub empowering digital citizenship. Evidence-based insights on social media literacy, privacy, AI ethics at VU Amsterdam.",
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
  openGraph: {
    title: "Digital Literacy Hub @ VU Amsterdam",
    description: "Research hub empowering digital citizenship through evidence-based insights on social media literacy, privacy, and AI ethics",
    url: "https://digitalliteracyhub.vu.nl",
    siteName: "Digital Literacy Hub",
    type: "website",
    images: [
      {
        url: "https://digitalliteracyhub.vu.nl/og-image.png",
        width: 1200,
        height: 630,
        alt: "Digital Literacy Hub - Empowering Digital Citizenship",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Digital Literacy Hub @ VU Amsterdam",
    description: "Research hub empowering digital citizenship through evidence-based insights on social media literacy, privacy, and AI ethics",
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
    generator: 'v0.app'
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
