import type { Metadata, Viewport } from "next"
import { Pixelify_Sans, Press_Start_2P, Space_Grotesk, VT323 } from "next/font/google"
import { Analytics } from "@vercel/analytics/react"
import { resolveSiteUrl, siteDescription, siteKeywords, siteName, siteTitle, siteUrl, siteWhatsAppUrl } from "@/lib/site"
import "./globals.css"

const bodyFont = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-body",
})

const brandFont = Pixelify_Sans({
  subsets: ["latin"],
  variable: "--font-brand",
})

const displayFont = Press_Start_2P({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-display",
})

const terminalFont = VT323({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-terminal",
})

const metadataBase = siteUrl ? new URL(siteUrl) : undefined

export const metadata: Metadata = {
  metadataBase,
  title: siteTitle,
  description: siteDescription,
  applicationName: siteName,
  keywords: siteKeywords,
  category: "games",
  referrer: "origin-when-cross-origin",
  alternates: siteUrl
    ? {
        canonical: "/",
      }
    : undefined,
  openGraph: {
    type: "website",
    locale: "pt_BR",
    url: siteUrl ?? undefined,
    siteName,
    title: siteTitle,
    description: siteDescription,
    images: [
      {
        url: "/social-card.png",
        width: 1200,
        height: 630,
        alt: "Pokestor - jornada cosmica de monstros",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: siteTitle,
    description: siteDescription,
    images: ["/social-card.png"],
  },
  manifest: "/manifest.webmanifest",
  icons: {
    icon: [
      {
        url: "/icon-light-32x32.png",
        media: "(prefers-color-scheme: light)",
      },
      {
        url: "/icon-dark-32x32.png",
        media: "(prefers-color-scheme: dark)",
      },
      {
        url: "/icon.svg",
        type: "image/svg+xml",
      },
    ],
    apple: "/apple-icon.png",
  },
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: siteName,
  },
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
}

export const viewport: Viewport = {
  themeColor: "#05010e",
  width: "device-width",
  initialScale: 1,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const structuredData = siteUrl
    ? {
        "@context": "https://schema.org",
        "@graph": [
          {
            "@type": "WebSite",
            name: siteName,
            url: siteUrl,
            description: siteDescription,
            inLanguage: "pt-BR",
          },
          {
            "@type": "Organization",
            name: siteName,
            url: siteUrl,
            logo: resolveSiteUrl("/pokestor-assets/logo.webp"),
            sameAs: siteWhatsAppUrl ? [siteWhatsAppUrl] : undefined,
            contactPoint: siteWhatsAppUrl
              ? [
                  {
                    "@type": "ContactPoint",
                    contactType: "customer support",
                    url: siteWhatsAppUrl,
                    availableLanguage: ["pt-BR"],
                  },
                ]
              : undefined,
          },
        ],
      }
    : null

  return (
    <html lang="pt-BR" className="bg-background">
      <body
        className={`${bodyFont.variable} ${brandFont.variable} ${displayFont.variable} ${terminalFont.variable} min-h-screen bg-background font-sans antialiased text-foreground`}
      >
        {structuredData ? (
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
          />
        ) : null}
        <Analytics />
        {children}
      </body>
    </html>
  )
}
