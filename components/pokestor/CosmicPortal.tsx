"use client"

import { useEffect, useRef } from "react"
import { motion } from "framer-motion"

export function CosmicPortal() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const animationRef = useRef<number>(0)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const size = 700
    canvas.width = size
    canvas.height = size

    interface Particle {
      angle: number
      radius: number
      speed: number
      size: number
      opacity: number
      hue: number
      layer: number
    }

    const particles: Particle[] = []
    const numParticles = 200

    // Create particles in multiple layers
    for (let i = 0; i < numParticles; i++) {
      const layer = Math.floor(Math.random() * 3)
      const baseRadius = 180 + layer * 40
      particles.push({
        angle: Math.random() * Math.PI * 2,
        radius: baseRadius + Math.random() * 30,
        speed: (0.003 + Math.random() * 0.004) * (layer === 1 ? -1 : 1),
        size: Math.random() * 2.5 + 0.5,
        opacity: Math.random() * 0.8 + 0.2,
        hue: Math.random() > 0.6 ? 280 : Math.random() > 0.3 ? 320 : 200, // Purple, magenta, or cyan
        layer,
      })
    }

    const animate = (time: number) => {
      ctx.clearRect(0, 0, size, size)
      
      const centerX = size / 2
      const centerY = size / 2

      // Draw main glowing elliptical rings
      for (let i = 0; i < 5; i++) {
        const ringRadius = 160 + i * 35
        const ellipseRatio = 0.38
        const rotation = time * 0.00008 * (i % 2 === 0 ? 1 : -1)
        const glowIntensity = 0.4 - i * 0.06
        
        ctx.save()
        ctx.translate(centerX, centerY)
        ctx.rotate(rotation)
        
        // Glow effect for each ring
        const gradient = ctx.createLinearGradient(-ringRadius, 0, ringRadius, 0)
        gradient.addColorStop(0, `hsla(280, 80%, 60%, 0)`)
        gradient.addColorStop(0.3, `hsla(300, 80%, 60%, ${glowIntensity})`)
        gradient.addColorStop(0.5, `hsla(320, 90%, 70%, ${glowIntensity * 1.5})`)
        gradient.addColorStop(0.7, `hsla(300, 80%, 60%, ${glowIntensity})`)
        gradient.addColorStop(1, `hsla(280, 80%, 60%, 0)`)
        
        ctx.beginPath()
        ctx.strokeStyle = gradient
        ctx.lineWidth = 3 - i * 0.4
        ctx.ellipse(0, 0, ringRadius, ringRadius * ellipseRatio, 0, 0, Math.PI * 2)
        ctx.stroke()
        
        // Add blur glow layer
        ctx.beginPath()
        ctx.strokeStyle = `hsla(300, 80%, 60%, ${glowIntensity * 0.3})`
        ctx.lineWidth = 12 - i * 2
        ctx.filter = "blur(8px)"
        ctx.ellipse(0, 0, ringRadius, ringRadius * ellipseRatio, 0, 0, Math.PI * 2)
        ctx.stroke()
        ctx.filter = "none"
        
        ctx.restore()
      }

      // Inner dark void
      const voidGradient = ctx.createRadialGradient(centerX, centerY, 0, centerX, centerY, 140)
      voidGradient.addColorStop(0, "rgba(3, 1, 8, 1)")
      voidGradient.addColorStop(0.7, "rgba(3, 1, 8, 0.95)")
      voidGradient.addColorStop(1, "rgba(3, 1, 8, 0)")
      ctx.beginPath()
      ctx.arc(centerX, centerY, 140, 0, Math.PI * 2)
      ctx.fillStyle = voidGradient
      ctx.fill()

      // Animate particles along elliptical paths
      particles.forEach((p) => {
        p.angle += p.speed
        
        const ellipseRatio = 0.38
        const x = centerX + Math.cos(p.angle) * p.radius
        const y = centerY + Math.sin(p.angle) * (p.radius * ellipseRatio)
        
        const pulse = Math.sin(time * 0.002 + p.angle * 2) * 0.4 + 0.6
        const currentSize = p.size * pulse
        const currentOpacity = p.opacity * pulse
        
        // Particle core
        ctx.beginPath()
        ctx.arc(x, y, currentSize, 0, Math.PI * 2)
        ctx.fillStyle = `hsla(${p.hue}, 85%, 75%, ${currentOpacity})`
        ctx.fill()
        
        // Particle glow
        const glow = ctx.createRadialGradient(x, y, 0, x, y, currentSize * 4)
        glow.addColorStop(0, `hsla(${p.hue}, 90%, 80%, ${currentOpacity * 0.6})`)
        glow.addColorStop(0.5, `hsla(${p.hue}, 85%, 70%, ${currentOpacity * 0.2})`)
        glow.addColorStop(1, "transparent")
        ctx.beginPath()
        ctx.arc(x, y, currentSize * 4, 0, Math.PI * 2)
        ctx.fillStyle = glow
        ctx.fill()
      })

      // Central bright point
      const centerGlow = ctx.createRadialGradient(centerX, centerY, 0, centerX, centerY, 80)
      centerGlow.addColorStop(0, "rgba(167, 139, 250, 0.15)")
      centerGlow.addColorStop(0.5, "rgba(139, 92, 246, 0.05)")
      centerGlow.addColorStop(1, "transparent")
      ctx.beginPath()
      ctx.arc(centerX, centerY, 80, 0, Math.PI * 2)
      ctx.fillStyle = centerGlow
      ctx.fill()

      animationRef.current = requestAnimationFrame(animate)
    }

    animationRef.current = requestAnimationFrame(animate)

    return () => cancelAnimationFrame(animationRef.current)
  }, [])

  return (
    <motion.div
      className="relative"
      initial={{ scale: 0.8, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 1.5, ease: "easeOut" }}
    >
      <canvas
        ref={canvasRef}
        className="w-[500px] h-[500px] lg:w-[700px] lg:h-[700px]"
        style={{ 
          filter: "drop-shadow(0 0 60px rgba(192, 132, 252, 0.4))",
        }}
      />
    </motion.div>
  )
}
