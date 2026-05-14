"use client"

import { motion } from "framer-motion"
import { OrbitNode } from "./OrbitNode"

const nodes = [
  {
    id: "pokedex",
    title: "POKÉDEX",
    description: "Descubra e colecione informações sobre todos os monstros do universo Pokestor. Cada criatura tem sua história única esperando para ser revelada.",
    color: "#A855F7",
    secondaryColor: "#7C3AED",
    position: { x: 50, y: 8 }, // Top center
    iconType: "pokedex" as const,
    delay: 1.0,
  },
  {
    id: "captura",
    title: "CAPTURA",
    description: "Aprenda as técnicas de captura e amplie sua coleção. Use diferentes estratégias para encontrar e capturar monstros raros.",
    color: "#22C55E",
    secondaryColor: "#16A34A",
    position: { x: 88, y: 40 }, // Right
    iconType: "captura" as const,
    delay: 1.2,
  },
  {
    id: "exploracao",
    title: "EXPLORAÇÃO",
    description: "Explore regiões misteriosas e descubra segredos escondidos. Cada área oferece novos desafios e recompensas únicas.",
    color: "#F59E0B",
    secondaryColor: "#D97706",
    position: { x: 78, y: 78 }, // Bottom right
    iconType: "exploracao" as const,
    delay: 1.4,
  },
  {
    id: "canal",
    title: "CANAL",
    description: "Entre no canal oficial do WhatsApp e conecte-se com outros treinadores. Participe de discussões e fique por dentro das novidades.",
    color: "#06B6D4",
    secondaryColor: "#0891B2",
    position: { x: 22, y: 78 }, // Bottom left
    iconType: "canal" as const,
    delay: 1.6,
  },
  {
    id: "eventos",
    title: "EVENTOS",
    description: "Participe de eventos especiais e ganhe recompensas exclusivas. Desafios limitados aguardam os treinadores mais dedicados.",
    color: "#EF4444",
    secondaryColor: "#DC2626",
    position: { x: 12, y: 40 }, // Left
    iconType: "eventos" as const,
    delay: 1.8,
  },
]

export function OrbitSystem() {
  return (
    <div className="absolute inset-0">
      {/* Dotted orbital paths SVG */}
      <svg 
        className="absolute inset-0 w-full h-full pointer-events-none"
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
      >
        <defs>
          <radialGradient id="orbitGradient" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="rgba(139, 92, 246, 0)" />
            <stop offset="70%" stopColor="rgba(139, 92, 246, 0.1)" />
            <stop offset="100%" stopColor="rgba(139, 92, 246, 0)" />
          </radialGradient>
        </defs>
        
        {/* Outer elliptical orbit path */}
        <motion.ellipse
          cx="50"
          cy="50"
          rx="42"
          ry="35"
          fill="none"
          stroke="rgba(139, 92, 246, 0.2)"
          strokeWidth="0.2"
          strokeDasharray="1 2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 1 }}
        />
        
        {/* Inner orbit path */}
        <motion.ellipse
          cx="50"
          cy="50"
          rx="32"
          ry="26"
          fill="none"
          stroke="rgba(139, 92, 246, 0.15)"
          strokeWidth="0.15"
          strokeDasharray="0.5 1.5"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 1 }}
        />

        {/* Connecting lines between nodes - very subtle */}
        {nodes.map((node, i) => {
          const nextNode = nodes[(i + 1) % nodes.length]
          return (
            <motion.line
              key={`line-${node.id}`}
              x1={node.position.x}
              y1={node.position.y}
              x2={nextNode.position.x}
              y2={nextNode.position.y}
              stroke="rgba(139, 92, 246, 0.08)"
              strokeWidth="0.1"
              strokeDasharray="0.5 2"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 2 + i * 0.1, duration: 0.5 }}
            />
          )
        })}
      </svg>

      {/* Orbit nodes */}
      {nodes.map((node) => (
        <OrbitNode
          key={node.id}
          title={node.title}
          description={node.description}
          color={node.color}
          secondaryColor={node.secondaryColor}
          position={node.position}
          delay={node.delay}
          iconType={node.iconType}
        />
      ))}
    </div>
  )
}
