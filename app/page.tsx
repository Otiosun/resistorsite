"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { Starfield } from "@/components/pokestor/Starfield"
import { CosmicPortal } from "@/components/pokestor/CosmicPortal"
import { PokestorLogo } from "@/components/pokestor/PokestorLogo"
import { OrbitSystem } from "@/components/pokestor/OrbitSystem"
import { WelcomeCard } from "@/components/pokestor/WelcomeCard"
import { TopBar } from "@/components/pokestor/TopBar"

export default function Home() {
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 1024)
    checkMobile()
    window.addEventListener("resize", checkMobile)
    return () => window.removeEventListener("resize", checkMobile)
  }, [])

  return (
    <main className="relative h-screen w-full overflow-hidden bg-[#030108]">
      {/* Deep space background */}
      <Starfield />
      
      {/* Top navigation - minimal */}
      <TopBar />

      {/* Main cosmic interface */}
      <div className="relative z-10 h-full w-full">
        {isMobile ? <MobileLayout /> : <DesktopLayout />}
      </div>
    </main>
  )
}

function DesktopLayout() {
  return (
    <div className="relative h-full w-full flex items-center justify-center">
      {/* Central cosmic portal - largest visual element */}
      <div className="absolute">
        <CosmicPortal />
      </div>

      {/* Logo floating in center of portal */}
      <div className="absolute z-20">
        <PokestorLogo />
      </div>

      {/* Orbit system with floating nodes */}
      <OrbitSystem />

      {/* Welcome card - positioned at bottom center */}
      <motion.div
        className="absolute bottom-6 left-1/2 -translate-x-1/2 z-30"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 2.2, duration: 0.8 }}
      >
        <WelcomeCard />
      </motion.div>
    </div>
  )
}

function MobileLayout() {
  const [activeNode, setActiveNode] = useState<string | null>(null)

  const nodes = [
    { id: "pokedex", title: "POKÉDEX", color: "#A855F7", description: "Descubra e colecione informações sobre todos os monstros do universo." },
    { id: "captura", title: "CAPTURA", color: "#22C55E", description: "Aprenda as técnicas de captura e amplie sua coleção." },
    { id: "exploracao", title: "EXPLORAÇÃO", color: "#F59E0B", description: "Explore regiões misteriosas e descubra segredos." },
    { id: "eventos", title: "EVENTOS", color: "#EF4444", description: "Participe de eventos especiais e ganhe recompensas." },
    { id: "canal", title: "CANAL", color: "#06B6D4", description: "Conecte-se com outros treinadores no WhatsApp." },
  ]

  return (
    <div className="relative h-full w-full flex flex-col items-center justify-center px-4 py-16 gap-6 overflow-y-auto">
      {/* Portal and logo - scaled for mobile */}
      <div className="relative flex items-center justify-center shrink-0">
        <div className="absolute scale-50">
          <CosmicPortal />
        </div>
        <div className="relative z-10">
          <PokestorLogo />
        </div>
      </div>

      {/* Mobile navigation nodes - floating pill buttons */}
      <motion.div 
        className="flex flex-wrap justify-center gap-3 max-w-sm mt-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
      >
        {nodes.map((node, index) => (
          <motion.button
            key={node.id}
            className="relative px-4 py-2.5 rounded-full border backdrop-blur-sm transition-all"
            style={{
              borderColor: activeNode === node.id ? node.color : `${node.color}50`,
              background: activeNode === node.id 
                ? `radial-gradient(circle, ${node.color}30 0%, ${node.color}10 100%)`
                : `radial-gradient(circle, ${node.color}15 0%, transparent 100%)`,
              boxShadow: activeNode === node.id ? `0 0 25px ${node.color}50` : `0 0 10px ${node.color}20`,
            }}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 1.6 + index * 0.1 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setActiveNode(activeNode === node.id ? null : node.id)}
          >
            {/* Mini orbiting dot */}
            <motion.span
              className="absolute w-1.5 h-1.5 rounded-full"
              style={{ background: node.color, top: 4, right: 4 }}
              animate={{ opacity: [0.4, 1, 0.4] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
            <span 
              style={{
                fontFamily: "'Press Start 2P', monospace",
                fontSize: "7px",
                color: node.color,
                textShadow: `0 0 8px ${node.color}`,
              }}
            >
              {node.title}
            </span>
          </motion.button>
        ))}
      </motion.div>

      {/* Expanded node info */}
      {activeNode && (
        <motion.div
          className="w-full max-w-sm p-4 rounded-xl border backdrop-blur-md"
          style={{
            borderColor: `${nodes.find(n => n.id === activeNode)?.color}40`,
            background: "linear-gradient(135deg, rgba(15, 10, 30, 0.95) 0%, rgba(25, 15, 50, 0.9) 100%)",
            boxShadow: `0 0 30px ${nodes.find(n => n.id === activeNode)?.color}20`,
          }}
          initial={{ opacity: 0, y: -10, height: 0 }}
          animate={{ opacity: 1, y: 0, height: "auto" }}
          exit={{ opacity: 0, y: -10, height: 0 }}
        >
          <p className="text-xs text-white/70 leading-relaxed text-center">
            {nodes.find(n => n.id === activeNode)?.description}
          </p>
        </motion.div>
      )}

      {/* Welcome card */}
      <motion.div
        className="mt-auto"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 2 }}
      >
        <WelcomeCard />
      </motion.div>
    </div>
  )
}
