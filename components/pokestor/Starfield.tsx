"use client"

import { useEffect, useRef } from "react"
import { motion } from "framer-motion"

interface Star {
  x: number
  y: number
  size: number
  opacity: number
  twinkleSpeed: number
  twinkleDelay: number
}

export function Starfield() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const starsRef = useRef<Star[]>([])
  const mouseRef = useRef({ x: 0, y: 0 })
  const animationRef = useRef<number>(0)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const isMobile = window.matchMedia("(pointer: coarse)").matches || window.innerWidth < 768
    const pixelRatio = isMobile ? 0.8 : Math.min(window.devicePixelRatio || 1, 1.25)
    const starDensityDivisor = isMobile ? 14000 : 8000
    const enableParallax = !isMobile
    const enableGlow = !isMobile
    let lastFrameTime = 0

    const resizeCanvas = () => {
      canvas.style.width = `${window.innerWidth}px`
      canvas.style.height = `${window.innerHeight}px`
      canvas.width = Math.floor(window.innerWidth * pixelRatio)
      canvas.height = Math.floor(window.innerHeight * pixelRatio)
      ctx.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0)
      generateStars()
    }

    const generateStars = () => {
      const stars: Star[] = []
      const numStars = Math.floor((window.innerWidth * window.innerHeight) / starDensityDivisor)
      
      for (let i = 0; i < numStars; i++) {
        stars.push({
          x: Math.random() * window.innerWidth,
          y: Math.random() * window.innerHeight,
          size: Math.random() * 2 + 0.5,
          opacity: Math.random() * 0.8 + 0.2,
          twinkleSpeed: Math.random() * 2 + 1,
          twinkleDelay: Math.random() * Math.PI * 2,
        })
      }
      starsRef.current = stars
    }

    const handleMouseMove = (e: MouseEvent) => {
      if (!enableParallax) return

      mouseRef.current = {
        x: (e.clientX - window.innerWidth / 2) / 50,
        y: (e.clientY - window.innerHeight / 2) / 50,
      }
    }

    const animate = (time: number) => {
      if (isMobile && time - lastFrameTime < 32) {
        animationRef.current = requestAnimationFrame(animate)
        return
      }

      lastFrameTime = time
      ctx.clearRect(0, 0, window.innerWidth, window.innerHeight)
      
      const { x: offsetX, y: offsetY } = mouseRef.current

      starsRef.current.forEach((star) => {
        const twinkle = Math.sin(time / 1000 * star.twinkleSpeed + star.twinkleDelay) * 0.3 + 0.7
        const parallaxX = star.x + offsetX * (star.size * 0.5)
        const parallaxY = star.y + offsetY * (star.size * 0.5)
        
        ctx.beginPath()
        ctx.arc(parallaxX, parallaxY, star.size, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(255, 255, 255, ${star.opacity * twinkle})`
        ctx.fill()
        
        // Add subtle glow for larger stars
        if (enableGlow && star.size > 1.5) {
          ctx.beginPath()
          ctx.arc(parallaxX, parallaxY, star.size * 2, 0, Math.PI * 2)
          const gradient = ctx.createRadialGradient(
            parallaxX, parallaxY, 0,
            parallaxX, parallaxY, star.size * 2
          )
          gradient.addColorStop(0, `rgba(200, 180, 255, ${star.opacity * twinkle * 0.3})`)
          gradient.addColorStop(1, "transparent")
          ctx.fillStyle = gradient
          ctx.fill()
        }
      })

      animationRef.current = requestAnimationFrame(animate)
    }

    resizeCanvas()
    window.addEventListener("resize", resizeCanvas)
    if (enableParallax) {
      window.addEventListener("mousemove", handleMouseMove)
    }
    animationRef.current = requestAnimationFrame(animate)

    return () => {
      window.removeEventListener("resize", resizeCanvas)
      if (enableParallax) {
        window.removeEventListener("mousemove", handleMouseMove)
      }
      cancelAnimationFrame(animationRef.current)
    }
  }, [])

  return (
    <>
      <canvas
        ref={canvasRef}
        className="fixed inset-0 pointer-events-none"
        style={{ zIndex: 0 }}
      />
      {/* Nebula overlay */}
      <motion.div
        className="fixed inset-0 pointer-events-none"
        style={{ zIndex: 1 }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 2 }}
      >
        {/* Purple nebula top-left */}
        <div 
          className="absolute -top-32 -left-32 w-[600px] h-[600px] rounded-full blur-[120px]"
          style={{ 
            background: "radial-gradient(ellipse at center, rgba(139, 92, 246, 0.15) 0%, transparent 70%)" 
          }}
        />
        {/* Cyan nebula bottom-right */}
        <div 
          className="absolute -bottom-32 -right-32 w-[500px] h-[500px] rounded-full blur-[100px]"
          style={{ 
            background: "radial-gradient(ellipse at center, rgba(34, 211, 238, 0.1) 0%, transparent 70%)" 
          }}
        />
        {/* Magenta subtle center */}
        <div 
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] rounded-full blur-[150px]"
          style={{ 
            background: "radial-gradient(ellipse at center, rgba(217, 70, 239, 0.08) 0%, transparent 60%)" 
          }}
        />
      </motion.div>
    </>
  )
}
