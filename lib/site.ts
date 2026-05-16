export const siteName = "Pokestor"
export const siteTitle = "Pokestor | Jornada cosmica de monstros"
export const siteDescription =
  "Explore o universo Pokestor com Pokedex, captura, exploracao, eventos e canal em uma landing neon-retro pronta para publicacao."

export const siteKeywords = [
  "Pokestor",
  "Pokedex",
  "captura",
  "exploracao",
  "eventos",
  "canal",
  "landing page",
  "monstros",
  "aventura",
]

export const siteWhatsAppUrl = process.env.NEXT_PUBLIC_WHATSAPP_URL?.trim() || null
export const hasWhatsAppContact = Boolean(siteWhatsAppUrl)

const deploymentUrl =
  process.env.NEXT_PUBLIC_SITE_URL?.trim() ||
  (process.env.VERCEL_PROJECT_PRODUCTION_URL
    ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
    : process.env.VERCEL_URL
      ? `https://${process.env.VERCEL_URL}`
      : "")

export const siteUrl = deploymentUrl.replace(/\/+$/, "") || null

export function resolveSiteUrl(path = "/") {
  if (!siteUrl) {
    return path
  }

  return new URL(path, `${siteUrl}/`).toString()
}
