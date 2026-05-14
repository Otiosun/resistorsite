"use client"

import { motion, AnimatePresence } from "framer-motion"
import { X } from "lucide-react"

interface NodePanelProps {
  isOpen: boolean
  onClose: () => void
  title: string
  description: string
  icon: React.ReactNode
  color: string
}

export function NodePanel({ isOpen, onClose, title, description, icon, color }: NodePanelProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />
          
          {/* Panel */}
          <motion.div
            className="fixed top-1/2 left-1/2 z-50 w-[320px] md:w-[380px]"
            initial={{ opacity: 0, scale: 0.9, x: "-50%", y: "-50%" }}
            animate={{ opacity: 1, scale: 1, x: "-50%", y: "-50%" }}
            exit={{ opacity: 0, scale: 0.9, x: "-50%", y: "-50%" }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
          >
            <div 
              className="relative p-6 rounded-lg border backdrop-blur-md"
              style={{
                background: "linear-gradient(135deg, rgba(15, 10, 30, 0.95) 0%, rgba(20, 15, 40, 0.9) 100%)",
                borderColor: color,
                boxShadow: `0 0 40px ${color}30, inset 0 1px 0 rgba(255,255,255,0.1)`,
              }}
            >
              {/* Close button */}
              <button
                onClick={onClose}
                className="absolute top-3 right-3 p-1 rounded-full transition-colors hover:bg-white/10"
              >
                <X className="w-4 h-4 text-white/60" />
              </button>

              {/* Icon */}
              <div 
                className="w-12 h-12 rounded-lg flex items-center justify-center mb-4"
                style={{ 
                  background: `linear-gradient(135deg, ${color}30 0%, ${color}10 100%)`,
                  border: `1px solid ${color}50`,
                }}
              >
                {icon}
              </div>

              {/* Title */}
              <h3 
                className="text-lg font-bold mb-2 tracking-wide"
                style={{ 
                  fontFamily: "'Press Start 2P', monospace",
                  fontSize: "14px",
                  color: color,
                  textShadow: `0 0 20px ${color}80`,
                }}
              >
                {title}
              </h3>

              {/* Description */}
              <p className="text-sm text-white/70 leading-relaxed mb-4">
                {description}
              </p>

              {/* Decorative corner */}
              <div 
                className="absolute bottom-0 right-0 w-16 h-16 opacity-20"
                style={{
                  background: `radial-gradient(circle at bottom right, ${color} 0%, transparent 70%)`,
                }}
              />
              
              {/* Pixel corners */}
              <div className="absolute top-0 left-0 w-2 h-2" style={{ background: color, opacity: 0.5 }} />
              <div className="absolute top-0 right-0 w-2 h-2" style={{ background: color, opacity: 0.5 }} />
              <div className="absolute bottom-0 left-0 w-2 h-2" style={{ background: color, opacity: 0.5 }} />
              <div className="absolute bottom-0 right-0 w-2 h-2" style={{ background: color, opacity: 0.5 }} />
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
