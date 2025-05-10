"use client"

import { useRef } from "react"
import { motion, useInView } from "framer-motion"

const aboutBlocks = [
  {
    title: "About VistaFlow",
    content:
      "VistaFlow is a modern AI consultancy dedicated to helping businesses scale smarter by integrating intelligent automation solutions. We work directly with business owners to identify paint points that can help reduce costs and streamline workflows using the power of AI. With a bespoke and personalised plan for each customer, we design and implement tailored solutions that align with your vision and goals. Our ongoing partnership model ensures that as your business grows, your systems evolve with it - keeping everything flowing efficiently behind the scenes. You grow the vision, we automate the work.",
  },
  {
    title: "Our Philosophy",
    content:
      "We believe smart growth comes from aligning human vision with intelligent systems. At VistaFlow, we empower businesses to scale by automating what slows them down - so they can focus on what moves them forward.",
  },
  {
    title: "Vision for the Future",
    content:
      "With foresee a future where intelligent automation is integrated  into the fabric of every growing business - removing friction by enhancing creativity, and unlocking new levels of performance. At VistaFlow, our goal is to lead this transformation by making AI easily accessible and specifically tailored to each client’s journey. As technology evolves, so will we! With a team of experienced and highly skilled developers, we will continue to ensure that our partners are always steps ahead, with systems that scale effortlessly and strategies that drive meaningful impact.",
  },

  {
    title: "Research & Innovation",
    content:
      "Our dedicated research team stays ahead of the curve, continuously exploring new and emerging AI technologies. This commitment to innovation ensures our clients gain a competitive edge through access to the latest advancements in artificial intelligence.",
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
