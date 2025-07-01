import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Digital Literacy Hub @ VU",
  description:
    "Empowering digital citizenship through research, design, and dialogue. The Digital Literacy Hub at VU Amsterdam explores how people navigate, resist, and reshape the digital world.",
  keywords: [
    "digital literacy",
    "VU Amsterdam",
    "research",
    "digital citizenship",
    "privacy",
    "social media",
    "AI ethics",
  ],
  authors: [{ name: "Digital Literacy Hub" }],
  openGraph: {
    title: "Digital Literacy Hub @ VU Amsterdam",
    description: "Empowering digital citizenship through research, design, and dialogue",
    url: "https://digitalliteracyhub.vu.nl",
    siteName: "Digital Literacy Hub",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Digital Literacy Hub @ VU Amsterdam",
    description: "Empowering digital citizenship through research, design, and dialogue",
  },
    generator: 'v0.dev'
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
