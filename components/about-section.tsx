"use client"

import { useRef } from "react"
import { motion, useInView } from "framer-motion"

const aboutBlocks = [
  {
    title: "About VistaFlow",
    content:
      "VistaFlow is a pioneering AI consultancy dedicated to helping businesses harness the transformative power of artificial intelligence. Our team of experts combines deep technical knowledge with strategic business acumen to deliver solutions that drive real results.",
  },
  {
    title: "Our Philosophy",
    content:
      "We believe in the synergy between human creativity and artificial intelligence. Our approach focuses on augmenting human capabilities rather than replacing them, creating systems where AI and humans work together to achieve extraordinary outcomes.",
  },
  {
    title: "Vision for the Future",
    content:
      "We envision a future where AI is seamlessly integrated into every aspect of business operations, enabling unprecedented levels of efficiency, innovation, and growth. VistaFlow is committed to guiding organizations through this transformation.",
  },
  {
    title: "Our Approach",
    content:
      "We take a collaborative, client-centered approach to every project. By deeply understanding your business challenges and goals, we develop AI solutions that address your specific needs rather than offering one-size-fits-all implementations.",
  },
  {
    title: "Research & Innovation",
    content:
      "Our dedicated research team stays at the forefront of AI advancements, continuously exploring new technologies and methodologies. This commitment to innovation ensures our clients always benefit from the latest developments in artificial intelligence.",
  },
]

export default function AboutSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: false, amount: 0.1 })

  return (
    <section id="about" className="min-h-screen w-full py-24 px-4 md:px-8 bg-transparent">
      <div className="max-w-4xl mx-auto z-10 pt-16">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-3xl md:text-4xl font-bold mb-12 text-center"
        >
          About <span className="text-cream-400 glow-text">Us</span>
        </motion.h2>

        <div ref={ref} className="space-y-6">
          {aboutBlocks.map((block, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{
                duration: 0.7,
                delay: index * 0.1,
                ease: "easeOut",
              }}
              className="bg-black/40 backdrop-blur-sm border border-gray-800 rounded-xl p-6 hover:border-cream-400/50 transition-all duration-300"
            >
              <h3 className="text-xl font-bold mb-3 text-cream-400">{block.title}</h3>
              <p className="text-gray-300">{block.content}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
