"use client"

import { motion } from "framer-motion"

type ElementIconProps = {
  className?: string
}

function iconClassName(className?: string) {
  return className ?? "h-4 w-4"
}

export function GrassEnergyIcon({ className }: ElementIconProps) {
  return (
    <svg viewBox="0 0 24 24" className={iconClassName(className)} fill="none" aria-hidden="true">
      <path
        d="M18.6 6.4c-5.4-.2-9.8 2.2-11.5 6.4-.8 2-.6 4.3.5 6.1 1.7-2.2 4.1-4.3 7.2-5.7"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M8.1 17.9c1.6.4 3.5.3 5-.3 3.6-1.5 5.4-5 5.1-11.2-4 0-6.8 1.2-8.8 3.4-1.3 1.4-2.1 3.1-2.4 5"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

export function FireEnergyIcon({ className }: ElementIconProps) {
  return (
    <svg viewBox="0 0 24 24" className={iconClassName(className)} fill="none" aria-hidden="true">
      <path
        d="M12.3 3.2c.4 2.8-.5 4.2-1.8 5.7-1 1.2-1.7 2.3-1.7 4 0 2 1.5 3.8 3.6 3.8 2.4 0 4-1.7 4-4.2 0-2.4-1.2-4.2-4.1-9.3Z"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M12.2 10c-.2 1.3-.9 2-1.5 2.7-.5.6-.7 1.1-.7 1.9 0 1.1.8 2 2 2 1.4 0 2.3-1 2.3-2.5 0-1.3-.7-2.3-2.1-4.1Z"
        fill="currentColor"
        fillOpacity="0.28"
      />
    </svg>
  )
}

export function WaterEnergyIcon({ className }: ElementIconProps) {
  return (
    <svg viewBox="0 0 24 24" className={iconClassName(className)} fill="none" aria-hidden="true">
      <path
        d="M12 3.3c-1.7 2.7-4.8 5.8-4.8 9.7 0 2.8 2.2 4.9 4.8 4.9s4.8-2.1 4.8-4.9c0-3.9-3.1-7-4.8-9.7Z"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M10.1 12.4c.3 1.7 1.5 2.9 3.3 3.3"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
      />
    </svg>
  )
}

export function LightningEnergyIcon({ className }: ElementIconProps) {
  return (
    <svg viewBox="0 0 24 24" className={iconClassName(className)} fill="none" aria-hidden="true">
      <path
        d="M13.3 2.8 6.6 12.1h4.3l-.8 9.1 7.3-10.2H13l.3-8.2Z"
        fill="currentColor"
        fillOpacity="0.18"
      />
      <path
        d="M13.3 2.8 6.6 12.1h4.3l-.8 9.1 7.3-10.2H13l.3-8.2Z"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinejoin="round"
      />
    </svg>
  )
}

export function PsychicEnergyIcon({ className }: ElementIconProps) {
  return (
    <svg viewBox="0 0 24 24" className={iconClassName(className)} fill="none" aria-hidden="true">
      <circle cx="12" cy="12" r="5.1" stroke="currentColor" strokeWidth="1.8" />
      <circle cx="12" cy="12" r="1.8" fill="currentColor" />
      <path
        d="M12 3.8c-1.8 0-3.2.4-4.5 1.2M12 20.2c1.8 0 3.2-.4 4.5-1.2"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
      <path
        d="M7.8 6.2c2-.7 5.2-.9 7.9-.1"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        opacity="0.9"
      />
    </svg>
  )
}

export function DarknessEnergyIcon({ className }: ElementIconProps) {
  return (
    <svg viewBox="0 0 24 24" className={iconClassName(className)} fill="none" aria-hidden="true">
      <path
        d="M15.8 4.8a7.9 7.9 0 0 0-8.6 2.4 7.7 7.7 0 0 0 6.2 12.4c2.1 0 4.1-.8 5.5-2.3-4.3.2-7.3-2.7-7.3-6.1 0-2.8 1.7-5.1 4.2-6.4Z"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle cx="15.8" cy="10.1" r="1.15" fill="currentColor" />
    </svg>
  )
}

export const elementRuneIcons = [
  { Icon: GrassEnergyIcon, color: "#7df9ae" },
  { Icon: FireEnergyIcon, color: "#ff875f" },
  { Icon: WaterEnergyIcon, color: "#67d7ff" },
  { Icon: LightningEnergyIcon, color: "#ffd86d" },
  { Icon: PsychicEnergyIcon, color: "#ef8fff" },
  { Icon: DarknessEnergyIcon, color: "#d3b3ff" },
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
          <Icon className="h-4 w-4 opacity-80" />
        </motion.div>
      ))}
    </motion.div>
  )
}
