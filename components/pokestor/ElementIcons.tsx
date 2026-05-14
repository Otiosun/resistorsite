"use client"

import { motion } from "framer-motion"

export function LeafIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor">
      <path d="M17 8c-4 0-8 3-9 7-1-2-1-5 1-7 2-2 5-3 8-3 0 1 0 2 0 3z" />
      <path d="M7 14c1-3 4-5 7-5 0 1 0 2-1 3-1 1-3 2-5 2h-1z" opacity="0.7" />
    </svg>
  )
}

export function FlameIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor">
      <path d="M12 2c-2 4-5 6-5 10 0 3 2 5 5 5s5-2 5-5c0-4-3-6-5-10z" />
      <ellipse cx="12" cy="14" rx="2" ry="3" opacity="0.6" />
    </svg>
  )
}

export function WaterIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor">
      <path d="M12 3c-3 5-6 8-6 12 0 3 3 6 6 6s6-3 6-6c0-4-3-7-6-12z" />
      <ellipse cx="10" cy="13" rx="2" ry="3" opacity="0.5" />
    </svg>
  )
}

export function LightningIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor">
      <path d="M13 2L4 14h6l-1 8 9-12h-6l1-8z" />
    </svg>
  )
}

export function MoonIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor">
      <path d="M12 3c-5 0-9 4-9 9s4 9 9 9c1 0 2 0 3-1-5-1-8-5-8-8s3-7 8-8c-1-1-2-1-3-1z" />
    </svg>
  )
}

export function StarIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor">
      <path d="M12 2l2 6h6l-5 4 2 6-5-4-5 4 2-6-5-4h6z" />
    </svg>
  )
}

export function ElementIconsRow() {
  const icons = [
    { Icon: LeafIcon, color: "text-emerald-400" },
    { Icon: FlameIcon, color: "text-orange-400" },
    { Icon: WaterIcon, color: "text-cyan-400" },
    { Icon: LightningIcon, color: "text-yellow-400" },
    { Icon: StarIcon, color: "text-purple-400" },
    { Icon: MoonIcon, color: "text-indigo-300" },
  ]

  return (
    <motion.div 
      className="flex items-center justify-center gap-3 mt-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 1.5, duration: 0.8 }}
    >
      {icons.map(({ Icon, color }, index) => (
        <motion.div
          key={index}
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 1.5 + index * 0.1, type: "spring", stiffness: 200 }}
        >
          <Icon className={`w-4 h-4 ${color} opacity-70`} />
        </motion.div>
      ))}
    </motion.div>
  )
}
