"use client"

import { motion } from "framer-motion"
import { Github, Twitter, Linkedin, Mail, MapPin, Phone } from "lucide-react"

export default function Footer() {
  const currentYear = new Date().getFullYear()

  const socialLinks = [
    { icon: <Github className="h-5 w-5" />, href: "#", label: "GitHub" },
    { icon: <Twitter className="h-5 w-5" />, href: "#", label: "Twitter" },
    { icon: <Linkedin className="h-5 w-5" />, href: "#", label: "LinkedIn" },
  ]

  const contactInfo = [
    { icon: <Mail className="h-5 w-5 mr-2" />, text: "info@vistaflow.ai" },
    { icon: <MapPin className="h-5 w-5 mr-2" />, text: "123 AI Boulevard, Tech City" },
    { icon: <Phone className="h-5 w-5 mr-2" />, text: "+1 (555) 123-4567" },
  ]

  const footerLinks = [
    { title: "Company", links: ["About Us", "Careers", "Partners", "Blog"] },
    { title: "Services", links: ["AI Strategy", "Machine Learning", "Data Analytics", "Consulting"] },

  ]

  return (
    <footer className="w-full bg-black/40 backdrop-blur-md border-t border-gray-800 pt-16 pb-8 px-4 md:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 mb-12">
          {/* Logo and Contact Info */}
          <div className="lg:col-span-2">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="mb-6"
            >
              <a href="#hero" className="text-2xl font-bold flex items-center">
                <span className="text-cream-400">Vista</span>
                <span className="text-cream-400">Flow</span>
              </a>
              <p className="text-gray-400 mt-4 max-w-md">
                Transforming businesses through cutting-edge AI solutions and strategic consulting. Let us help you
                navigate the future of artificial intelligence.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              viewport={{ once: true }}
              className="space-y-3"
            >
              {contactInfo.map((item, index) => (
                <div key={index} className="flex items-center text-gray-400 hover:text-cream-400 transition-colors">
                  {item.icon}
                  <span>{item.text}</span>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Footer Links */}
          {footerLinks.map((section, sectionIndex) => (
            <motion.div
              key={section.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 + sectionIndex * 0.1 }}
              viewport={{ once: true }}
            >
              <h3 className="text-cream-400 font-semibold mb-4">{section.title}</h3>
              <ul className="space-y-2">
                {section.links.map((link, linkIndex) => (
                  <li key={linkIndex}>
                    <a href="#" className="text-gray-400 hover:text-cream-400 transition-colors">
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        {/* Bottom Bar */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          viewport={{ once: true }}
          className="pt-8 border-t border-gray-800 flex flex-col md:flex-row justify-between items-center"
        >
          <p className="text-gray-500 text-sm mb-4 md:mb-0">© {currentYear} VistaFlow AI. All rights reserved.</p>

          <div className="flex space-x-4">
            {socialLinks.map((social, index) => (
              <a
                key={index}
                href={social.href}
                aria-label={social.label}
                className="text-gray-400 hover:text-cream-400 transition-colors p-2 rounded-full hover:bg-gray-800"
              >
                {social.icon}
              </a>
            ))}
          </div>
        </motion.div>
      </div>
    </footer>
  )
}
