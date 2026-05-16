import type { MetadataRoute } from "next"
import { resolveSiteUrl, siteUrl } from "@/lib/site"

export const dynamic = "force-static"

export default function sitemap(): MetadataRoute.Sitemap {
  if (!siteUrl) {
    return []
  }

  return [
    {
      url: resolveSiteUrl("/"),
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
    },
  ]
}
