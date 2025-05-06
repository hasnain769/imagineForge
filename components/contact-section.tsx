"use client"

import { useRef } from "react"
import { motion, useInView } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Send } from "lucide-react"

export default function ContactSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: false, amount: 0.1 })

  const formFields = [
    { id: "name", label: "Full Name", type: "text", placeholder: "Enter your name" },
    { id: "phone", label: "Contact Number", type: "tel", placeholder: "Enter your phone number" },
    { id: "email", label: "Email", type: "email", placeholder: "Enter your email" },
  ]

  return (
    <section id="contact" className="min-h-screen w-full py-24 px-4 md:px-8 bg-transparent">
      <div className="max-w-3xl mx-auto w-full z-10 pt-16">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-3xl md:text-4xl font-bold mb-8 text-center"
        >
          Get in <span className="text-cream-400 glow-text">Touch</span>
        </motion.h2>

        <motion.form
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="bg-black/40 backdrop-blur-sm border border-gray-800 rounded-xl p-6 md:p-8"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            {formFields.map((field, index) => (
              <motion.div
                key={field.id}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.1 + index * 0.1 }}
              >
                <label htmlFor={field.id} className="block text-sm font-medium mb-2">
                  {field.label}
                </label>
                <Input
                  id={field.id}
                  type={field.type}
                  placeholder={field.placeholder}
                  className="bg-neutral-900/80 border-gray-700 focus:border-cream-400 focus:ring-2 focus:ring-cream-400/20 transition-all duration-300"
                />
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="mb-6"
          >
            <label htmlFor="message" className="block text-sm font-medium mb-2">
              Message
            </label>
            <Textarea
              id="message"
              placeholder="Tell us about your project..."
              rows={5}
              className="bg-neutral-900/80 border-gray-700 focus:border-cream-400 focus:ring-2 focus:ring-cream-400/20 transition-all duration-300 w-full"
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="text-center"
          >
            <Button
              type="submit"
              size="lg"
              className="bg-cream-400 hover:bg-cream-300 text-black font-medium px-8 py-6 rounded-full transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-cream-400/30"
            >
              Send Message
              <Send className="ml-2 h-5 w-5" />
            </Button>
          </motion.div>
        </motion.form>
      </div>
    </section>
  )
}
