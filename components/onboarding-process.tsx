"use client"

import { useRef, useState } from "react"
import { motion, useInView, useScroll, useTransform } from "framer-motion"
import { Search, FileText, Zap, Users, CheckCircle2 } from "lucide-react"

// Process step data
const processSteps = [
  {
    number: 1,
    title: "Discovery & Consultation",
    description:
      "We begin by speaking directly with you, to understand your vision and identify any pain points holding your business back. We focus on key areas like time inefficiencies, workflow optimisations, and opportunities for automation.",
    icon: <Search className="h-8 w-8 text-cream-400" />,
    color: "from-cream-400/20 to-cream-400/5",
  },
  {
    number: 2,
    title: "Custom Strategy & Planning",
    description:
      "Once we've identified areas for improvement, Me and my team of expert developers create a personalised, strategic plan tailored to your specific goals. This blueprint is designed to help your business scale efficiently - powered by the right AI solutions.",
    icon: <FileText className="h-8 w-8 text-cream-400" />,
    color: "from-cream-400/30 to-cream-400/5",
  },
  {
    number: 3,
    title: "Seamless Implementation",
    description:
      "With your custom plan in place, we begin integrating the AI tools into your operations. To ensure a smooth transition, we offer a 7-day free trial, giving you the opportunity to experience the impact before making a commitment.",
    icon: <Zap className="h-8 w-8 text-cream-400" />,
    color: "from-cream-400/40 to-cream-400/5",
  },
  {
    number: 4,
    title: "Long-Term Partnership & Support",
    description:
      "At Imagine Forge, we don't just install solutions—we become your long-term growth partner. Our ongoing support ensures your AI systems stay updated, aligned, and optimized as your business evolves. You stay focused on what you do best—while we keep everything flowing behind the scenes.",
    icon: <Users className="h-8 w-8 text-cream-400" />,
    color: "from-cream-400/50 to-cream-400/5",
  },
]

export default function OnboardingProcess() {
  const containerRef = useRef(null)
  const sectionRef = useRef(null)
  const isInView = useInView(sectionRef, { once: false, amount: 0.1 })
  const [hoveredStep, setHoveredStep] = useState<number | null>(null)

  // Get scroll progress for the section
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  })

  // Transform scroll progress to use for animations
  const pathLength = useTransform(scrollYProgress, [0, 0.8], [0, 1])

  return (
    <section
      id="process"
      ref={sectionRef}
      className="min-h-screen w-full py-24 px-4 md:px-8 bg-transparent overflow-hidden"
    >
      <div className="max-w-7xl mx-auto" ref={containerRef}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Our <span className="text-cream-400 glow-text">4-Step</span> Onboarding Process
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            We've refined our approach to ensure a smooth, efficient journey from consultation to implementation.
          </p>
        </motion.div>

        {/* Desktop Timeline (hidden on mobile) */}
        <div className="hidden lg:block relative">
          {/* Connecting line */}
          <div className="absolute left-1/2 top-0 h-full -translate-x-1/2 flex items-center justify-center">
            <div className="h-full w-1 bg-gray-800 rounded-full relative overflow-hidden">
              <motion.div
                className="absolute top-0 left-0 right-0 bottom-0 bg-cream-400/50 origin-top"
                style={{ scaleY: pathLength }}
              />
            </div>
          </div>

          {/* Timeline steps */}
          <div className="relative">
            {processSteps.map((step, index) => (
              <motion.div
                key={step.number}
                initial={{ opacity: 0 }}
                animate={isInView ? { opacity: 1 } : {}}
                transition={{ duration: 0.7, delay: index * 0.2 }}
                className={`flex items-center mb-32 ${index % 2 === 0 ? "flex-row" : "flex-row-reverse"}`}
              >
                {/* Content */}
                <motion.div
                  className="w-5/12"
                  initial={{ x: index % 2 === 0 ? -50 : 50, opacity: 0 }}
                  whileInView={{ x: 0, opacity: 1 }}
                  transition={{ duration: 0.7, delay: 0.2 }}
                  viewport={{ once: false, amount: 0.3 }}
                >
                  <motion.div
                    className={`bg-black/40 backdrop-blur-sm border border-gray-800 rounded-xl p-6 hover:border-cream-400/50 transition-all duration-500 ${
                      hoveredStep === step.number ? "shadow-lg shadow-cream-400/10" : ""
                    }`}
                    whileHover={{ scale: 1.03, transition: { duration: 0.3 } }}
                    onHoverStart={() => setHoveredStep(step.number)}
                    onHoverEnd={() => setHoveredStep(null)}
                  >
                    <div className="flex items-center mb-4">
                      <div
                        className={`flex items-center justify-center w-12 h-12 rounded-full bg-gradient-to-br ${step.color} mr-4`}
                      >
                        {step.icon}
                      </div>
                      <h3 className="text-xl font-bold text-cream-400">{step.title}</h3>
                    </div>
                    <p className="text-gray-300">{step.description}</p>
                  </motion.div>
                </motion.div>

                {/* Center circle */}
                <div className="w-2/12 flex justify-center relative">
                  <motion.div
                    className={`w-16 h-16 rounded-full bg-black flex items-center justify-center border-4 z-10 ${
                      hoveredStep === step.number ? "border-cream-400 shadow-lg shadow-cream-400/30" : "border-gray-800"
                    }`}
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    transition={{ type: "spring", stiffness: 200, damping: 15, delay: index * 0.2 + 0.3 }}
                    viewport={{ once: false, amount: 0.8 }}
                  >
                    <span className="text-2xl font-bold text-cream-400">{step.number}</span>
                  </motion.div>
                </div>

                {/* Empty space for alternating layout */}
                <div className="w-5/12"></div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Mobile Timeline (visible only on mobile) */}
        <div className="lg:hidden relative">
          {/* Connecting line */}
          <div className="absolute left-8 top-0 h-full flex items-center justify-center">
            <div className="h-full w-1 bg-gray-800 rounded-full relative overflow-hidden">
              <motion.div
                className="absolute top-0 left-0 right-0 bottom-0 bg-cream-400/50 origin-top"
                style={{ scaleY: pathLength }}
              />
            </div>
          </div>

          {/* Timeline steps */}
          <div className="relative">
            {processSteps.map((step, index) => (
              <motion.div
                key={step.number}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: false, amount: 0.3 }}
                className="flex mb-16"
              >
                {/* Circle with number */}
                <div className="mr-8 relative">
                  <motion.div
                    className="w-14 h-14 rounded-full bg-black flex items-center justify-center border-4 border-gray-800 z-10"
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    transition={{ type: "spring", stiffness: 200, damping: 15, delay: index * 0.1 + 0.2 }}
                    viewport={{ once: false, amount: 0.8 }}
                  >
                    <span className="text-xl font-bold text-cream-400">{step.number}</span>
                  </motion.div>
                </div>

                {/* Content */}
                <motion.div
                  className="flex-1"
                  initial={{ y: 20, opacity: 0 }}
                  whileInView={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.5, delay: index * 0.1 + 0.3 }}
                  viewport={{ once: false, amount: 0.3 }}
                >
                  <div className="bg-black/40 backdrop-blur-sm border border-gray-800 rounded-xl p-5">
                    <div className="flex items-center mb-3">
                      <div
                        className={`flex items-center justify-center w-10 h-10 rounded-full bg-gradient-to-br ${step.color} mr-3`}
                      >
                        {step.icon}
                      </div>
                      <h3 className="text-lg font-bold text-cream-400">{step.title}</h3>
                    </div>
                    <p className="text-sm text-gray-300">{step.description}</p>
                  </div>
                </motion.div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Final checkmark animation */}
        <motion.div
          initial={{ opacity: 0, scale: 0 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ type: "spring", stiffness: 200, damping: 15, delay: 0.8 }}
          viewport={{ once: false, amount: 0.8 }}
          className="flex justify-center mt-8"
        >
          <div className="bg-cream-400/10 p-4 rounded-full">
            <CheckCircle2 className="h-12 w-12 text-cream-400" />
          </div>
        </motion.div>
      </div>
    </section>
  )
}
