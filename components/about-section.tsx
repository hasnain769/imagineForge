"use client"

import { useRef } from "react"
import { motion, useInView } from "framer-motion"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"
import JsonLd from "./json-ld"

const aboutBlocks = [
  {
    title: "About Imagine Forge",
    content:
      "Imagine Forge is a team of builders, thinkers, and innovators dedicated to turning your imagination into reality. We specialize in creating intelligent AI automations, systems, and SaaS products that transform your workflows and elevate your business. We work with you to understand your vision and build the tools you need to succeed.",
  },
  {
    title: "Our Philosophy",
    content:
      "We believe that anything you can imagine, we can build. Our philosophy is centered around the idea that technology should be a tool for empowerment, enabling businesses to reach their full potential. We are committed to building solutions that are not only powerful but also intuitive and easy to use.",
  },
  {
    title: "Vision for the Future",
    content:
      "Our vision is to be the leading force in AI-driven innovation, creating a future where intelligent systems are seamlessly integrated into every aspect of business. We are constantly exploring new technologies and pushing the boundaries of what is possible, ensuring that our clients always have access to the most advanced solutions.",
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

  const faqData = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": aboutBlocks.map(block => ({
      "@type": "Question",
      "name": block.title,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": block.content
      }
    }))
  }

  return (
    <section id="about" className="min-h-screen w-full py-24 px-4 md:px-8 bg-transparent">
      <JsonLd data={faqData} />
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
        <div className="text-center mt-12">
          <Button onClick={() => window.location.href = "/blog"} className="bg-cream-400 hover:bg-cream-300 text-black font-medium rounded-full transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-cream-400/30">
            Read Our Blog
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </div>
      </div>
    </section>
  )
}
