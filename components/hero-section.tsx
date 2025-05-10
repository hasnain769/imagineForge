"use client"

import { useEffect, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { ArrowRight, ChevronDown } from "lucide-react"

export default function HeroSection() {
  const [showContent, setShowContent] = useState(false)
  const [hasScrolled, setHasScrolled] = useState(false)

  useEffect(() => {
    // Delay showing the hero content until after the logo animation is complete
    const timer = setTimeout(() => {
      setShowContent(true)
    }, 2600) // Initial black screen (300ms) + centered logo (1500ms) + animation to navbar (800ms)

    // Add scroll event listener
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setHasScrolled(true)
      } else {
        setHasScrolled(false)
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => {
      clearTimeout(timer)
      window.removeEventListener("scroll", handleScroll)
    }
  }, [])

  return (
    <section
      id="hero"
      className="min-h-screen w-full flex items-center justify-center py-24 px-4 md:px-8 bg-transparent"
    >
      <AnimatePresence>
        {showContent && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.7 }}
            className="max-w-4xl mx-auto text-center z-10 content-padding"
          >
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
              className="text-3xl md:text-6xl font-bold mb-4"
            >
              You Grow the Vision, we <span className="text-cream-400 glow-text">Automate</span> the Work.
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="text-xl md:text-2xl mb-8 text-gray-300 max-w-2xl mx-auto"
            >
              Helping businesses scale the smart way. 
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.4 }}
            >
              <Button onClick={() => window.location.href = "#contact"}
                size="lg"
                className="bg-cream-400 hover:bg-cream-300 text-black font-medium px-8 py-6 rounded-full transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-cream-400/30"
              >
                Let's Talk
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </motion.div>

            {/* Scroll indicator moved into main content */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: hasScrolled ? 0 : 1, y: hasScrolled ? 10 : 0 }}
              transition={{ duration: 0.3, delay: 0.3 }}
              className="mt-24 pt-10"
            >
              <motion.div
                animate={{ y: [0, 10, 0] }}
                transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
                className="flex flex-col items-center"
              >
                <span className="text-sm text-gray-400 mb-2">Scroll Down</span>
                <ChevronDown className="h-6 w-6 text-cream-400" />
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}
