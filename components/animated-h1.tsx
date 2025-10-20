'use client'

import { motion } from 'framer-motion'

export default function AnimatedH1({ children }: { children: React.ReactNode }) {
  return (
    <motion.h1
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7 }}
      className="text-4xl md:text-5xl font-bold mb-12 text-center"
    >
      {children}
    </motion.h1>
  )
}
