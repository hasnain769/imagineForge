'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { ArrowRight } from 'lucide-react'
import Image from 'next/image'

const caseStudies = [
  {
    title: "Restaurant Reservation Voice Agent",
    excerpt: "An AI-powered voice agent that can handle restaurant reservations over the phone, reducing the workload on staff and improving the customer experience.",
    link: "/case-studies/restaurant-voice-agent",
    image: "https://placehold.co/1200x600/081a04/F1DAD4?text=Restaurant+Voice+Agent",
  },
  {
    title: "AI Waiter for Restaurants",
    excerpt: "An AI-powered waiter that can take orders, answer questions, and process payments, freeing up human waiters to focus on providing excellent customer service.",
    link: "/case-studies/ai-waiter",
    image: "https://placehold.co/1200x600/081a04/F1DAD4?text=AI+Waiter",
  },
  {
    title: "Booking Assistant for Salons",
    excerpt: "An AI-powered booking assistant that can schedule appointments, send reminders, and manage cancellations, reducing no-shows and improving efficiency.",
    link: "/case-studies/salon-booking-assistant",
    image: "https://placehold.co/1200x600/081a04/F1DAD4?text=Salon+Booking+Assistant",
  },
  {
    title: "BotHarbor: AI Chatbots as a Service",
    excerpt: "A SaaS platform for building and deploying AI-powered chatbots for customer support, e-commerce, and small businesses.",
    link: "/case-studies/botharbor",
    image: "https://placehold.co/1200x600/081a04/F1DAD4?text=BotHarbor",
  },
]

export default function CaseStudiesSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: false, amount: 0.1 })

  return (
    <section id="case-studies" className="min-h-screen w-full py-24 px-4 md:px-8 bg-transparent">
      <div className="max-w-6xl mx-auto z-10 pt-16">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-3xl md:text-4xl font-bold mb-12 text-center"
        >
          Our <span className="text-cream-400 glow-text">Case Studies</span>
        </motion.h2>

        <div ref={ref} className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {caseStudies.map((study, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{
                duration: 0.7,
                delay: index * 0.1,
                ease: "easeOut",
              }}
              className="bg-black/40 backdrop-blur-sm border border-gray-800 rounded-xl p-6 hover:border-cream-400/50 transition-all duration-300 group overflow-hidden"
            >
              <div className="relative w-full h-64 mb-4">
                <Image src={study.image} alt={study.title} layout="fill" objectFit="cover" />
              </div>
              <h3 className="text-xl font-bold mb-3 group-hover:text-cream-400 transition-colors">{study.title}</h3>
              <p className="text-gray-300 mb-6">{study.excerpt}</p>
              <Button
                onClick={() => (window.location.href = study.link)}
                className="bg-transparent border border-cream-400 text-cream-400 hover:bg-cream-400 hover:text-black font-medium rounded-full transition-all duration-300 group-hover:scale-105"
              >
                View Case Study
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
