"use client"

import { motion } from "framer-motion"
import {
  Droplets,
  Flame,
  Leaf,
  MoonStar,
  Sparkles,
  Zap,
  type LucideIcon,
} from "lucide-react"

type ElementRune = {
  Icon: LucideIcon
  color: string
}

export const elementRuneIcons: ElementRune[] = [
  { Icon: Leaf, color: "#7df9ae" },
  { Icon: Flame, color: "#ff875f" },
  { Icon: Droplets, color: "#67d7ff" },
  { Icon: Zap, color: "#ffd86d" },
  { Icon: Sparkles, color: "#ef8fff" },
  { Icon: MoonStar, color: "#d3b3ff" },
]

export function ElementIconsRow() {
  return (
    <motion.div
      className="mt-4 flex items-center justify-center gap-3"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 1.5, duration: 0.8 }}
    >
      {elementRuneIcons.map(({ Icon, color }, index) => (
        <motion.div
          key={color}
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 1.5 + index * 0.1, type: "spring", stiffness: 200 }}
          style={{ color }}
        >
          <Icon className="h-4 w-4 opacity-70" strokeWidth={1.9} />
        </motion.div>
      ))}
    </motion.div>
  )
}
