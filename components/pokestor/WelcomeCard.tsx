"use client"

import { motion } from "framer-motion"
import { Sparkles, ArrowRight } from "lucide-react"

export function WelcomeCard() {
  return (
    <motion.div
      className="relative max-w-md mx-auto"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 2, duration: 0.8 }}
    >
      {/* Main card */}
      <div 
        className="relative px-6 py-4 rounded-lg border backdrop-blur-md"
        style={{
          background: "linear-gradient(135deg, rgba(10, 5, 20, 0.95) 0%, rgba(20, 10, 40, 0.9) 100%)",
          borderColor: "rgba(139, 92, 246, 0.4)",
          boxShadow: "0 0 40px rgba(139, 92, 246, 0.15), inset 0 1px 0 rgba(255,255,255,0.03)",
        }}
      >
        {/* Decorative corner accents */}
        <div className="absolute top-0 left-0 w-3 h-3 border-t-2 border-l-2 border-purple-500/50 rounded-tl" />
        <div className="absolute top-0 right-0 w-3 h-3 border-t-2 border-r-2 border-purple-500/50 rounded-tr" />
        <div className="absolute bottom-0 left-0 w-3 h-3 border-b-2 border-l-2 border-cyan-500/50 rounded-bl" />
        <div className="absolute bottom-0 right-0 w-3 h-3 border-b-2 border-r-2 border-cyan-500/50 rounded-br" />

        {/* Title row */}
        <div className="flex items-center justify-center gap-2 mb-2">
          <Sparkles className="w-3 h-3 text-yellow-400" />
          <h3 
            className="text-xs font-bold tracking-wider text-purple-300"
            style={{ fontFamily: "'Press Start 2P', monospace", fontSize: "9px" }}
          >
            BEM-VINDO, TREINADOR
          </h3>
          <Sparkles className="w-3 h-3 text-yellow-400" />
        </div>

        {/* Description */}
        <p className="text-xs text-white/50 mb-4 leading-relaxed text-center">
          Um universo de descobertas espera por você.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-2 justify-center">
          {/* Primary CTA */}
          <motion.a
            href="#"
            className="flex items-center justify-center gap-2 px-5 py-2.5 rounded-md text-xs font-semibold transition-all"
            style={{
              fontFamily: "'Press Start 2P', monospace",
              fontSize: "8px",
              background: "linear-gradient(135deg, #8B5CF6 0%, #A855F7 50%, #C084FC 100%)",
              color: "#fff",
              boxShadow: "0 0 25px rgba(139, 92, 246, 0.5), inset 0 1px 0 rgba(255,255,255,0.2)",
            }}
            whileHover={{ 
              scale: 1.03,
              boxShadow: "0 0 35px rgba(139, 92, 246, 0.7), inset 0 1px 0 rgba(255,255,255,0.2)",
            }}
            whileTap={{ scale: 0.98 }}
          >
            <Sparkles className="w-3 h-3" />
            COMEÇAR JORNADA
          </motion.a>

          {/* Secondary CTA */}
          <motion.a
            href="#"
            className="flex items-center justify-center gap-2 px-5 py-2.5 rounded-md text-xs font-semibold transition-all border"
            style={{
              fontFamily: "'Press Start 2P', monospace",
              fontSize: "8px",
              background: "rgba(6, 182, 212, 0.1)",
              borderColor: "rgba(6, 182, 212, 0.5)",
              color: "#22D3EE",
            }}
            whileHover={{ 
              scale: 1.03,
              borderColor: "rgba(6, 182, 212, 0.9)",
              boxShadow: "0 0 25px rgba(6, 182, 212, 0.4)",
            }}
            whileTap={{ scale: 0.98 }}
          >
            ENTRAR NO CANAL
            <ArrowRight className="w-3 h-3" />
          </motion.a>
        </div>
      </div>
    </motion.div>
  )
}
