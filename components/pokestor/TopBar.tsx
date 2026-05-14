"use client"

import { motion } from "framer-motion"
import { Sparkles, ArrowRight } from "lucide-react"

export function TopBar() {
  return (
    <motion.header
      className="fixed top-0 left-0 right-0 z-50 px-4 py-4 md:px-8"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Logo */}
        <motion.div 
          className="flex items-center gap-2"
          whileHover={{ scale: 1.02 }}
        >
          <div className="relative">
            <Sparkles className="w-5 h-5 text-purple-400" />
            <motion.div
              className="absolute inset-0"
              animate={{
                opacity: [0.5, 1, 0.5],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
              }}
            >
              <Sparkles className="w-5 h-5 text-purple-300" />
            </motion.div>
          </div>
          <span 
            className="text-white font-bold tracking-wider"
            style={{ 
              fontFamily: "'Press Start 2P', monospace",
              fontSize: "12px",
              textShadow: "0 0 20px rgba(139, 92, 246, 0.5)",
            }}
          >
            POKESTOR
          </span>
        </motion.div>

        {/* Enter button */}
        <motion.a
          href="#"
          className="flex items-center gap-2 px-4 py-2 rounded-full border transition-all"
          style={{
            borderColor: "rgba(255, 255, 255, 0.2)",
            background: "rgba(255, 255, 255, 0.05)",
            backdropFilter: "blur(8px)",
          }}
          whileHover={{ 
            borderColor: "rgba(139, 92, 246, 0.6)",
            background: "rgba(139, 92, 246, 0.1)",
          }}
        >
          <span 
            className="text-white/90 font-medium"
            style={{ 
              fontFamily: "'Press Start 2P', monospace",
              fontSize: "9px",
            }}
          >
            ENTRAR
          </span>
          <ArrowRight className="w-3 h-3 text-white/70" />
        </motion.a>
      </div>
    </motion.header>
  )
}
