"use client"

import { useState, useEffect, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Image from "next/image"
import Logo from '@/public/imagineForgeLogo.svg'
export default function LogoAnimation() {
  const [animationStage, setAnimationStage] = useState(0)
  // 0: Initial black screen
  // 1: Logo centered
  // 2: Logo animating to navbar
  // 3: Animation complete

  const [navbarLogoPosition, setNavbarLogoPosition] = useState({ top: 0, left: 0 })
  const [navbarLogoSize, setNavbarLogoSize] = useState({ width: 0, height: 0 })
  const [navbarMounted, setNavbarMounted] = useState(false)
  const logoRef = useRef<HTMLDivElement>(null)

  // Fine-tuning offset - adjust this value as needed
  const horizontalOffset = 8 // pixels to move right

  // Function to get the navbar logo position
  const updateNavbarLogoPosition = () => {
    const navbarLogo = document.getElementById("navbar-logo")
    if (navbarLogo) {
      const rect = navbarLogo.getBoundingClientRect()
      setNavbarLogoPosition({
        top: rect.top,
        // Add the horizontal offset to move slightly right
        left: rect.left + horizontalOffset,
      })
      setNavbarLogoSize({ width: rect.width, height: rect.height })
      setNavbarMounted(true)
    }
  }

  useEffect(() => {
    // Initial black screen for a brief moment
    const stage0Timer = setTimeout(() => {
      setAnimationStage(1) // Show centered logo

      // After logo is visible in center, start animation to navbar
      const stage1Timer = setTimeout(() => {
        // Before starting the animation, get the navbar logo position
        updateNavbarLogoPosition()

        // Only proceed with animation if navbar is mounted
        if (document.getElementById("navbar-logo")) {
          setAnimationStage(2) // Start animation to navbar

          // After animation to navbar is complete
          const stage2Timer = setTimeout(() => {
            setAnimationStage(3) // Animation complete
          }, 800) // Duration of animation to navbar

          return () => clearTimeout(stage2Timer)
        } else {
          // If navbar logo isn't mounted yet, check again in 100ms
          const checkNavbarTimer = setInterval(() => {
            if (document.getElementById("navbar-logo")) {
              clearInterval(checkNavbarTimer)
              updateNavbarLogoPosition()
              setAnimationStage(2) // Start animation to navbar

              // After animation to navbar is complete
              const stage2Timer = setTimeout(() => {
                setAnimationStage(3) // Animation complete
              }, 800) // Duration of animation to navbar
            }
          }, 100)

          return () => clearInterval(checkNavbarTimer)
        }
      }, 1300) // Duration logo stays in center

      return () => clearTimeout(stage1Timer)
    }, 300) // Initial black screen duration

    // Add resize listener to update position if window is resized
    window.addEventListener("resize", updateNavbarLogoPosition)

    return () => {
      clearTimeout(stage0Timer)
      window.removeEventListener("resize", updateNavbarLogoPosition)
    }
  }, [])

  // Calculate scale factor based on the size difference between animated logo and navbar logo
  const getScaleFactor = () => {
    if (!logoRef.current || !navbarMounted) return 0.45

    const animatedLogoRect = logoRef.current.getBoundingClientRect()
    const animatedLogoWidth = animatedLogoRect.width

    // If we have navbar logo size, calculate exact scale
    if (navbarLogoSize.width > 0) {
      return navbarLogoSize.width / animatedLogoWidth
    }

    return 0.45 // Fallback scale
  }

  return (
    <>
      {/* Initial black overlay */}
      <AnimatePresence>
        {animationStage < 3 && (
          <motion.div
            initial={{ opacity: 1 }}
            animate={{
              opacity: animationStage === 0 ? 1 : animationStage === 1 ? 1 : animationStage === 2 ? 0.9 : 0,
            }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="fixed inset-0 bg-black z-[60]"
          />
        )}
      </AnimatePresence>

      {/* Centered logo that animates to navbar */}
      <AnimatePresence>
        {animationStage >= 1 && animationStage <= 2 && (
          <motion.div
            ref={logoRef}
            initial={{
              scale: 0.8,
              opacity: 0,
              top: "50%",
              left: "50%",
              x: "-50%",
              y: "-50%",
            }}
            animate={{
              scale: animationStage === 1 ? 1 : getScaleFactor(),
              // Decrease opacity as it travels to navbar position
              opacity: animationStage === 1 ? 1 : 0.5,
              top: animationStage === 1 ? "50%" : `${navbarLogoPosition.top}px`,
              left: animationStage === 1 ? "50%" : `${navbarLogoPosition.left}px`,
              x: animationStage === 1 ? "-50%" : "0%",
              y: animationStage === 1 ? "-50%" : "0%",
            }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
            className="fixed text-5xl font-bold flex items-center z-[70]"
          >
            {/* <Image src={Logo} alt="V" className="  h-[4.5rem] w-[3.5rem] pb-[0.380rem]" /> */}
            <span className="text-cream-400 -ml-3 ">Imagine</span>
            <span className="text-cream-400 ">Forge</span>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
