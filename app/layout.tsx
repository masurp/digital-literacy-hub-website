import type React from "react"

// Root layout — locale-specific layout in app/[locale]/layout.tsx handles
// all rendering. This file is required by Next.js App Router.
export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
