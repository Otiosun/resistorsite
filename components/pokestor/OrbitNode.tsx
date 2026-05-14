"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { NodePanel } from "./NodePanel"

interface OrbitNodeProps {
  title: string
  description: string
  color: string
  secondaryColor: string
  position: { x: number; y: number }
  delay: number
  iconType: "pokedex" | "captura" | "exploracao" | "eventos" | "canal"
}

// Custom SVG icons inspired by monster-collection themes
function PokedexIcon({ color }: { color: string }) {
  return (
    <svg viewBox="0 0 24 24" className="w-6 h-6">
      <rect x="3" y="2" width="18" height="20" rx="2" fill="none" stroke={color} strokeWidth="1.5" />
      <path d="M7 6h10M7 10h10M7 14h6" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
      <circle cx="17" cy="17" r="3" fill={color} fillOpacity="0.3" stroke={color} strokeWidth="1" />
    </svg>
  )
}

function CapturaIcon({ color }: { color: string }) {
  return (
    <svg viewBox="0 0 24 24" className="w-6 h-6">
      <circle cx="12" cy="12" r="9" fill="none" stroke={color} strokeWidth="1.5" />
      <circle cx="12" cy="12" r="5" fill="none" stroke={color} strokeWidth="1" strokeDasharray="2 2" />
      <circle cx="12" cy="12" r="2" fill={color} />
      <path d="M12 3v3M12 18v3M3 12h3M18 12h3" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  )
}

function ExploracaoIcon({ color }: { color: string }) {
  return (
    <svg viewBox="0 0 24 24" className="w-6 h-6">
      <path d="M12 2l3 7h7l-5.5 4.5 2 7.5-6.5-4.5-6.5 4.5 2-7.5L2 9h7l3-7z" fill={color} fillOpacity="0.3" stroke={color} strokeWidth="1.5" strokeLinejoin="round" />
    </svg>
  )
}

function EventosIcon({ color }: { color: string }) {
  return (
    <svg viewBox="0 0 24 24" className="w-6 h-6">
      <rect x="3" y="4" width="18" height="16" rx="2" fill="none" stroke={color} strokeWidth="1.5" />
      <path d="M3 9h18" stroke={color} strokeWidth="1.5" />
      <path d="M8 2v4M16 2v4" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
      <circle cx="8" cy="14" r="1.5" fill={color} />
      <circle cx="12" cy="14" r="1.5" fill={color} />
      <circle cx="16" cy="14" r="1.5" fill={color} fillOpacity="0.4" />
    </svg>
  )
}

function CanalIcon({ color }: { color: string }) {
  return (
    <svg viewBox="0 0 24 24" className="w-6 h-6">
      <rect x="2" y="3" width="14" height="12" rx="2" fill="none" stroke={color} strokeWidth="1.5" />
      <rect x="4" y="6" width="10" height="6" fill={color} fillOpacity="0.2" />
      <circle cx="18" cy="9" r="4" fill="none" stroke={color} strokeWidth="1.5" strokeDasharray="2 2" />
      <path d="M8 18v3M12 17v4" stroke={color} strokeWidth="2" strokeLinecap="round" />
    </svg>
  )
}

const iconMap = {
  pokedex: PokedexIcon,
  captura: CapturaIcon,
  exploracao: ExploracaoIcon,
  eventos: EventosIcon,
  canal: CanalIcon,
}

export function OrbitNode({ title, description, color, secondaryColor, position, delay, iconType }: OrbitNodeProps) {
  const [isHovered, setIsHovered] = useState(false)
  const [isPanelOpen, setIsPanelOpen] = useState(false)

  const Icon = iconMap[iconType]

  return (
    <>
      <motion.button
        className="absolute cursor-pointer group"
        style={{
          left: `${position.x}%`,
          top: `${position.y}%`,
          transform: "translate(-50%, -50%)",
        }}
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ 
          delay: delay, 
          duration: 0.8, 
          type: "spring", 
          stiffness: 80 
        }}
        whileHover={{ scale: 1.08 }}
        onHoverStart={() => setIsHovered(true)}
        onHoverEnd={() => setIsHovered(false)}
        onClick={() => setIsPanelOpen(true)}
      >
        {/* Planet container */}
        <div className="relative">
          {/* Outer glow ring */}
          <motion.div
            className="absolute -inset-4 rounded-full"
            style={{
              background: `radial-gradient(circle, ${color}30 0%, transparent 70%)`,
            }}
            animate={{
              opacity: isHovered ? 1 : 0.5,
              scale: isHovered ? 1.2 : 1,
            }}
            transition={{ duration: 0.3 }}
          />

          {/* Planet orbital ring */}
          <motion.div
            className="absolute -inset-3"
            style={{
              border: `1px solid ${color}40`,
              borderRadius: "50%",
              transform: "rotateX(70deg)",
            }}
            animate={{
              rotate: 360,
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "linear",
            }}
          >
            {/* Orbiting moon */}
            <div 
              className="absolute w-2 h-2 rounded-full"
              style={{
                background: secondaryColor,
                top: "50%",
                left: "-4px",
                transform: "translateY(-50%)",
                boxShadow: `0 0 6px ${secondaryColor}`,
              }}
            />
          </motion.div>

          {/* Main planet body */}
          <motion.div 
            className="relative w-16 h-16 lg:w-20 lg:h-20 rounded-full flex items-center justify-center overflow-hidden"
            style={{
              background: `radial-gradient(circle at 30% 30%, ${color}60 0%, ${color}30 40%, ${secondaryColor}20 100%)`,
              border: `2px solid ${color}80`,
              boxShadow: isHovered 
                ? `0 0 40px ${color}60, inset -8px -8px 20px rgba(0,0,0,0.4), inset 4px 4px 10px ${color}40`
                : `0 0 20px ${color}40, inset -8px -8px 20px rgba(0,0,0,0.4), inset 4px 4px 10px ${color}30`,
            }}
            animate={{
              y: isHovered ? -4 : [0, -3, 0],
            }}
            transition={isHovered ? { duration: 0.2 } : {
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            {/* Surface details */}
            <div 
              className="absolute inset-0 opacity-30"
              style={{
                background: `
                  radial-gradient(circle at 25% 25%, ${color}50 0%, transparent 30%),
                  radial-gradient(circle at 70% 60%, ${secondaryColor}30 0%, transparent 25%)
                `,
              }}
            />
            
            {/* Icon */}
            <motion.div
              animate={{ scale: isHovered ? 1.1 : 1 }}
              transition={{ duration: 0.2 }}
            >
              <Icon color={color} />
            </motion.div>
          </motion.div>

          {/* Label badge */}
          <motion.div
            className="absolute -bottom-10 left-1/2 -translate-x-1/2 whitespace-nowrap"
            animate={{
              y: isHovered ? 2 : 0,
            }}
            transition={{ duration: 0.2 }}
          >
            <span 
              className="flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-full border"
              style={{
                fontFamily: "'Press Start 2P', monospace",
                fontSize: "7px",
                color: color,
                borderColor: `${color}60`,
                background: `linear-gradient(135deg, ${color}15 0%, rgba(3,1,8,0.9) 100%)`,
                textShadow: `0 0 10px ${color}80`,
                boxShadow: isHovered ? `0 0 15px ${color}40` : "none",
              }}
            >
              <svg viewBox="0 0 8 8" className="w-2 h-2" fill={color}>
                <circle cx="4" cy="4" r="3" />
              </svg>
              {title}
            </span>
          </motion.div>
        </div>
      </motion.button>

      <NodePanel
        isOpen={isPanelOpen}
        onClose={() => setIsPanelOpen(false)}
        title={title}
        description={description}
        icon={<Icon color={color} />}
        color={color}
      />
    </>
  )
}
