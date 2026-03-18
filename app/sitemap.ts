import type { MetadataRoute } from "next"

const BASE_URL = "https://www.digitalliteracyhub.nl"

export default function sitemap(): MetadataRoute.Sitemap {
  const pages = ["", "/digital-literacy", "/data-analysis", "/privacy", "/accessibility"]

  const nlUrls = pages.map((page) => ({
    url: `${BASE_URL}${page}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: page === "" ? 1 : 0.8,
  }))

  const enUrls = pages.map((page) => ({
    url: `${BASE_URL}/en${page}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: page === "" ? 0.9 : 0.7,
  }))

  return [...nlUrls, ...enUrls]
}
