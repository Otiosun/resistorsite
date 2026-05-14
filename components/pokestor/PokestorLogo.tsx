"use client"

import { motion } from "framer-motion"
import { ElementIconsRow } from "./ElementIcons"

export function PokestorLogo() {
  const letters = "POKESTOR".split("")
  
  // Colors matching the reference - purple to pink to cyan gradient
  const colors = [
    "#A855F7", // P - purple
    "#C084FC", // O - light purple
    "#EC4899", // K - pink
    "#F472B6", // E - light pink
    "#A855F7", // S - purple
    "#8B5CF6", // T - violet
    "#06B6D4", // O - cyan
    "#22D3EE", // R - light cyan
  ]

  return (
    <motion.div
      className="text-center"
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 1, delay: 0.5 }}
    >
      {/* Main logo text */}
      <h1 className="flex justify-center items-center">
        {letters.map((letter, index) => (
          <motion.span
            key={index}
            className="text-4xl md:text-6xl lg:text-7xl font-bold"
            style={{
              fontFamily: "'Press Start 2P', monospace",
              color: colors[index],
              textShadow: `
                0 0 20px ${colors[index]}90,
                0 0 40px ${colors[index]}60,
                0 0 60px ${colors[index]}40,
                0 0 80px ${colors[index]}20
              `,
              WebkitTextStroke: `1px ${colors[index]}`,
            }}
            initial={{ opacity: 0, y: 30, scale: 0.5 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ 
              delay: 0.6 + index * 0.08,
              type: "spring",
              stiffness: 120,
              damping: 12,
            }}
            whileHover={{
              scale: 1.15,
              y: -5,
              textShadow: `
                0 0 30px ${colors[index]},
                0 0 60px ${colors[index]}90,
                0 0 90px ${colors[index]}60
              `,
            }}
          >
            {letter}
          </motion.span>
        ))}
      </h1>

      {/* Tagline */}
      <motion.p
        className="mt-6 tracking-[0.15em] text-white/40"
        style={{ fontFamily: "'Press Start 2P', monospace", fontSize: "8px" }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4, duration: 0.8 }}
      >
        SUA AVENTURA. SEUS MONSTROS. SUA HISTÓRIA.
      </motion.p>

      {/* Element icons */}
      <ElementIconsRow />
    </motion.div>
  )
}
