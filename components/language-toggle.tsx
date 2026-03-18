"use client"

import { useLocale } from "next-intl"
import { useRouter, usePathname } from "next/navigation"
import { useTransition } from "react"

export default function LanguageToggle() {
  const locale = useLocale()
  const router = useRouter()
  const pathname = usePathname()
  const [isPending, startTransition] = useTransition()

  const switchLocale = (newLocale: string) => {
    // pathname is like /nl/privacy or /en/privacy or / (nl default)
    // We strip the current locale prefix and add the new one
    const segments = pathname.split("/")
    // segments[1] is the locale when it's present (e.g. "en"), or a page segment
    const knownLocales = ["nl", "en"]
    if (knownLocales.includes(segments[1])) {
      segments[1] = newLocale === "nl" ? "nl" : newLocale
    } else {
      segments.splice(1, 0, newLocale)
    }
    // For default locale (nl) the middleware strips the prefix, but we can navigate to /nl/... too
    const newPath = segments.join("/") || "/"
    startTransition(() => {
      router.push(newPath)
    })
  }

  return (
    <div className="flex items-center gap-1 text-xs font-semibold">
      <button
        onClick={() => switchLocale("nl")}
        disabled={isPending}
        className={`px-2 py-1 rounded transition-colors ${
          locale === "nl"
            ? "bg-blue-600 text-white"
            : "text-gray-500 hover:text-gray-800"
        }`}
      >
        NL
      </button>
      <span className="text-gray-300">|</span>
      <button
        onClick={() => switchLocale("en")}
        disabled={isPending}
        className={`px-2 py-1 rounded transition-colors ${
          locale === "en"
            ? "bg-blue-600 text-white"
            : "text-gray-500 hover:text-gray-800"
        }`}
      >
        EN
      </button>
    </div>
  )
}
