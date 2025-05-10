"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Menu, X } from "lucide-react"
import Image from "next/image"
import Logo from'@/public/vistaFlowLogo.svg'
export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [animationStage, setAnimationStage] = useState(0)
  // 0: Hidden
  // 1: Show navbar without logo
  // 2: Show navbar with logo

  useEffect(() => {
    // Delay showing the navbar until after the logo animation starts moving to navbar
    // Increased by 200ms as requested
    const navbarTimer = setTimeout(() => {
      setAnimationStage(1) // Show navbar without logo

      // Delay showing the navbar logo until after the animated logo has completed
      const logoTimer = setTimeout(() => {
        setAnimationStage(2) // Show navbar with logo
      }, 800) // Match the duration of the logo animation

      return () => clearTimeout(logoTimer)
    }, 2000) // Initial black screen (300ms) + centered logo (1500ms) + additional 200ms delay

    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true)
      } else {
        setIsScrolled(false)
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => {
      window.removeEventListener("scroll", handleScroll)
      clearTimeout(navbarTimer)
    }
  }, [])

  const navLinks = [
    { name: "Home", href: "#hero" },
    { name: "Services", href: "#services" },
    { name: "About", href: "#about" },
    { name: "Contact", href: "#contact" },
  ]

  return (
    <AnimatePresence>
      {animationStage > 0 && (
        <motion.nav
        key={"key"}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className={`sticky top-0 left-0 right-0 z-50 transition-all duration-300 ${
            isScrolled ? "bg-black/60 backdrop-blur-md py-3" : "bg-transparent py-5"
          }`}
        >
          <div className="container mx-auto px-4 flex justify-between items-center">
            <AnimatePresence mode="wait">
              {animationStage === 1 ? (
                <motion.div
                  key="placeholder"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 0 }}
                  exit={{ opacity: 0 }}
                  className="text-2xl font-bold flex items-center invisible"
                  style={{ height: "32px" }} // Ensure consistent height
                >
                  <span>ista</span>
                  <span>Flow</span>
                </motion.div>
              ) : (
<motion.a
  id="navbar-logo"
  key="logo"
  href="#hero"
  initial={{ opacity: 0 }}
  animate={{ opacity: 1 }}
  transition={{ duration: 0.3 }}
  className="text-2xl font-bold flex items-center"
>
  <Image src={Logo} alt="V" className="inline-block h-9 w-8 pb-[0.165rem] " />
  <span className="text-cream-400 -ml-1.5">ista</span>
  <span className="text-cream-400">Flow</span>
</motion.a>

              )}
            </AnimatePresence>

            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="hidden md:flex items-center space-x-8"
            >
              {navLinks.map((link, index) => (
                <motion.a
                  key={link.name}
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
                  href={link.href}
                  className="text-gray-300 hover:text-cream-400 transition-colors"
                >
                  {link.name}
                </motion.a>
              ))}

              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.6 }}
              >
                <Button onClick={() => window.location.href = "#contact"} className="bg-cream-400 hover:bg-cream-300 text-black font-medium rounded-full transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-cream-400/30">
                  Let's Talk
                </Button>
              </motion.div>
            </motion.div>

            <motion.button
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="md:hidden text-white"
              onClick={() => setIsMobileMenuOpen(true)}
            >
              <Menu className="h-6 w-6" />
            </motion.button>
          </div>
        </motion.nav>
      )}

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 bg-black z-[80] flex flex-col"
          >
            <div className="flex justify-between items-center p-4">
              <a href="#hero" className="text-2xl font-bold flex items-center">
                <span className="text-cream-400">Vista</span>
                <span className="text-cream-400">Flow</span>
              </a>
              <button className="text-white" onClick={() => setIsMobileMenuOpen(false)}>
                <X className="h-6 w-6" />
              </button>
            </div>

            <div className="flex flex-col items-center justify-center flex-1 space-y-8">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  className="text-xl text-gray-300 hover:text-cream-400 transition-colors"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {link.name}
                </a>
              ))}

              <Button className="bg-cream-400 hover:bg-cream-300 text-black font-medium rounded-full transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-cream-400/30">
                Get in Touch
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </AnimatePresence>
  )
}
