'use client'

import { motion } from 'framer-motion'

export default function AnimatedDiv({ children, ...props }: { children: React.ReactNode, [key: string]: any }) {
  return (
    <motion.div {...props} suppressHydrationWarning>
      {children}
    </motion.div>
  )
}
