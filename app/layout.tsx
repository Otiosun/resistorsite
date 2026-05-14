import type { Metadata, Viewport } from "next"
import { Pixelify_Sans, Press_Start_2P, Space_Grotesk, VT323 } from "next/font/google"
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

export const metadata: Metadata = {
  title: "Pokestor | Jornada cósmica de monstros",
  description:
    "Landing page neon-retro para o universo Pokestor: Pokédex, captura, exploração, eventos e canal em uma experiência inspirada em aventura espacial.",
  keywords: ["Pokestor", "landing page", "Pokédex", "captura", "exploração", "eventos", "canal"],
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
  return (
    <html lang="pt-BR" className="bg-background">
      <body
        className={`${bodyFont.variable} ${brandFont.variable} ${displayFont.variable} ${terminalFont.variable} min-h-screen bg-background font-sans antialiased text-foreground`}
      >
        {children}
      </body>
    </html>
  )
}
