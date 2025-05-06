"use client"

import { useRef } from "react"
import { motion, useInView } from "framer-motion"
import { Cpu, Lightbulb, BarChart, Brain, Database, LineChart } from "lucide-react"

const services = [
  {
    icon: <Lightbulb className="h-10 w-10 text-cream-400" />,
    title: "AI Strategy Consulting",
    description: "Develop a comprehensive AI roadmap tailored to your business needs and objectives.",
  },
  {
    icon: <Cpu className="h-10 w-10 text-cream-400" />,
    title: "AI Automation Solutions",
    description: "Implement cutting-edge AI systems to automate processes and enhance operational efficiency.",
  },
  {
    icon: <BarChart className="h-10 w-10 text-cream-400" />,
    title: "Continuous AI Assistance",
    description: "Ongoing support and optimization of your AI systems to ensure maximum performance.",
  },
  {
    icon: <Brain className="h-10 w-10 text-cream-400" />,
    title: "Machine Learning Integration",
    description: "Seamlessly integrate machine learning models into your existing business processes.",
  },
  {
    icon: <Database className="h-10 w-10 text-cream-400" />,
    title: "Data Analytics & Insights",
    description: "Transform raw data into actionable insights with advanced AI-powered analytics.",
  },
  {
    icon: <LineChart className="h-10 w-10 text-cream-400" />,
    title: "Predictive Business Intelligence",
    description: "Leverage AI to forecast trends and make data-driven business decisions.",
  },
]

export default function ServicesSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: false, amount: 0.1 })

  return (
    <section id="services" className="min-h-screen w-full py-24 px-4 md:px-8 bg-transparent">
      <div className="max-w-6xl mx-auto z-10 pt-16">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-3xl md:text-4xl font-bold mb-12 text-center"
        >
          Our <span className="text-cream-400 glow-text">Services</span>
        </motion.h2>

        <div ref={ref} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{
                duration: 0.7,
                delay: index * 0.1,
                ease: "easeOut",
              }}
              className="bg-black/40 backdrop-blur-sm border border-gray-800 rounded-xl p-6 hover:border-cream-400/50 transition-all duration-300 hover:shadow-lg hover:shadow-cream-400/10 group"
            >
              <div className="mb-4 p-3 rounded-full bg-gray-900/80 inline-block group-hover:glow transition-all duration-300">
                {service.icon}
              </div>
              <h3 className="text-xl font-bold mb-3 group-hover:text-cream-400 transition-colors">{service.title}</h3>
              <p className="text-gray-400">{service.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
