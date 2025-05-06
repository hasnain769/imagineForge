"use client"

import { useEffect, useRef } from "react"
import { motion } from "framer-motion"

export default function BackgroundElements() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    canvas.width = window.innerWidth
    canvas.height = window.innerHeight

    // Particles configuration
    const particles: Particle[] = []
    const particleCount = 100
    const connectionDistance = 150
    const mouseRadius = 150

    // Mouse position
    const mouse = {
      x: null as number | null,
      y: null as number | null,
    }

    // Track mouse position
    window.addEventListener("mousemove", (event) => {
      mouse.x = event.x
      mouse.y = event.y
    })

    // Reset mouse position when mouse leaves window
    window.addEventListener("mouseout", () => {
      mouse.x = null
      mouse.y = null
    })

    class Particle {
      x: number
      y: number
      size: number
      baseSize: number
      speedX: number
      speedY: number
      color: string

      constructor() {
        this.x = Math.random() * canvas.width
        this.y = Math.random() * canvas.height
        this.baseSize = Math.random() * 2 + 0.5
        this.size = this.baseSize
        this.speedX = (Math.random() - 0.5) * 0.5
        this.speedY = (Math.random() - 0.5) * 0.5

        // Use brand colors - cream color
        const colors = [
          "rgba(239, 222, 205, 0.7)", // Cream color
          "rgba(239, 222, 205, 0.5)", // Lighter cream
        ]
        this.color = colors[Math.floor(Math.random() * colors.length)]
      }

      update() {
        // Move particles
        this.x += this.speedX
        this.y += this.speedY

        // Wrap around screen edges
        if (this.x > canvas.width) this.x = 0
        else if (this.x < 0) this.x = canvas.width
        if (this.y > canvas.height) this.y = 0
        else if (this.y < 0) this.y = canvas.height

        // Interact with mouse
        if (mouse.x !== null && mouse.y !== null) {
          const dx = mouse.x - this.x
          const dy = mouse.y - this.y
          const distance = Math.sqrt(dx * dx + dy * dy)

          if (distance < mouseRadius) {
            // Increase size when near mouse
            this.size = this.baseSize * 3

            // Move away from mouse
            const forceDirectionX = dx / distance
            const forceDirectionY = dy / distance
            const force = (mouseRadius - distance) / mouseRadius

            this.speedX -= forceDirectionX * force * 0.6
            this.speedY -= forceDirectionY * force * 0.6
          } else {
            // Return to base size
            this.size = this.baseSize
          }
        }
      }

      draw() {
        if (!ctx) return
        ctx.beginPath()
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2)
        ctx.fillStyle = this.color
        ctx.fill()
      }
    }

    // Create connections between particles
    function connect() {
      for (let a = 0; a < particles.length; a++) {
        for (let b = a; b < particles.length; b++) {
          const dx = particles[a].x - particles[b].x
          const dy = particles[a].y - particles[b].y
          const distance = Math.sqrt(dx * dx + dy * dy)

          if (distance < connectionDistance) {
            // Calculate opacity based on distance
            const opacity = 1 - distance / connectionDistance

            // Draw line between particles
            if (ctx) {
              ctx.strokeStyle = `rgba(239, 222, 205, ${opacity * 0.2})`
              ctx.lineWidth = 1
              ctx.beginPath()
              ctx.moveTo(particles[a].x, particles[a].y)
              ctx.lineTo(particles[b].x, particles[b].y)
              ctx.stroke()
            }
          }
        }
      }
    }

    // Initialize particles
    const init = () => {
      for (let i = 0; i < particleCount; i++) {
        particles.push(new Particle())
      }
    }

    // Animation loop
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // Update and draw particles
      for (let i = 0; i < particles.length; i++) {
        particles[i].update()
        particles[i].draw()
      }

      // Draw connections
      connect()

      requestAnimationFrame(animate)
    }

    // Handle window resize
    const handleResize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    window.addEventListener("resize", handleResize)

    init()
    animate()

    return () => {
      window.removeEventListener("resize", handleResize)
      window.removeEventListener("mousemove", (event) => {
        mouse.x = event.x
        mouse.y = event.y
      })
      window.removeEventListener("mouseout", () => {
        mouse.x = null
        mouse.y = null
      })
    }
  }, [])

  return (
    <>
      <canvas ref={canvasRef} className="fixed inset-0 pointer-events-none z-0" />

      {/* Gradient orbs with brand colors */}
      <motion.div
        className="fixed top-1/4 -left-20 w-40 h-40 rounded-full bg-cream-400/20 blur-3xl"
        animate={{
          x: [0, 30, 0],
          opacity: [0.2, 0.3, 0.2],
        }}
        transition={{
          duration: 8,
          repeat: Number.POSITIVE_INFINITY,
          ease: "easeInOut",
        }}
      />

      <motion.div
        className="fixed bottom-1/4 -right-20 w-60 h-60 rounded-full bg-cream-400/20 blur-3xl"
        animate={{
          x: [0, -40, 0],
          opacity: [0.2, 0.3, 0.2],
        }}
        transition={{
          duration: 10,
          repeat: Number.POSITIVE_INFINITY,
          ease: "easeInOut",
        }}
      />

      {/* Additional floating elements */}
      <motion.div
        className="fixed top-2/3 left-1/3 w-32 h-32 rounded-full bg-cream-400/10 blur-2xl"
        animate={{
          y: [0, -20, 0],
          opacity: [0.1, 0.2, 0.1],
        }}
        transition={{
          duration: 12,
          repeat: Number.POSITIVE_INFINITY,
          ease: "easeInOut",
        }}
      />

      <motion.div
        className="fixed top-1/3 right-1/3 w-24 h-24 rounded-full bg-cream-400/10 blur-2xl"
        animate={{
          y: [0, 15, 0],
          opacity: [0.1, 0.15, 0.1],
        }}
        transition={{
          duration: 9,
          repeat: Number.POSITIVE_INFINITY,
          ease: "easeInOut",
        }}
      />
    </>
  )
}
