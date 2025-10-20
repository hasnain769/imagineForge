"use client"

import { motion } from "framer-motion"
import { Github, Twitter, Linkedin, Mail, MapPin, Phone, Instagram } from "lucide-react"
import Logo from '@/public/imagineForgeLogo.svg'
import Image from "next/image"
export default function Footer() {
  const currentYear = new Date().getFullYear()

  const socialLinks = [
    { icon: <Instagram className="h-5 w-5" />, href: "https://www.instagram.com/imagineforge.uae?igsh=MXBqdGZ2Y2M3YWpmbg%3D%3D&utm_source=qr", label: "Twitter" },
    { icon: <Linkedin className="h-5 w-5" />, href: "#", label: "LinkedIn" },
  ]

  const contactInfo = [
    { icon: <Mail className="h-5 w-5 mr-2" />, text: "info@imagineforge.ai" },
    { icon: <MapPin className="h-5 w-5 mr-2" />, text: "123 AI Boulevard, Tech City" },
    { icon: <Phone className="h-5 w-5 mr-2" />, text: "+971 58 674 3326" },
  ]

  const footerLinks = [
    {
      title: "Company",
      links: [
        { text: "About Us", href: "/#about" },
        { text: "Onboarding Process", href: "/#process" },
        { text: "Contact Us", href: "/#contact" }
      ]
    },
    {
      title: "Services",
      links: [
        { text: "AI Strategy Consulting", href: "/#services" },
        { text: "Intelligent Automations", href: "/#services" },
        { text: "Ongoing Support", href: "/#services" },
        { text: "Machine Learning Integration", href: "/#services" },
        { text: "Agentic Workflows Design", href: "/#services" },
        { text: "Predictive Business Intelligence", href: "/#services" }
      ]
    }
  ];


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
              <a href="/" className="text-2xl font-bold flex items-center">
                <Image src={Logo} alt="V" className="inline-block h-9 w-8 pb-[0.165rem] " />
                <span className="text-cream-400 -ml-1.5">magine</span>
                <span className="text-cream-400">Forge</span>
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
          {footerLinks.map((section) => (
            <div key={section.title}>
              <h4>{section.title}</h4>
              <ul>
                {section.links.map((link, index) => (
                  <li key={index} className="mt-2">
                    <a href={link.href} className="hover:underline text-gray-300">{link.text}</a>
                  </li>
                ))}
              </ul>
            </div>
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
          <p className="text-gray-500 text-sm mb-4 md:mb-0">© {currentYear} Imagine Forge AI. All rights reserved.</p>

          <div className="flex space-x-4">
            {socialLinks.map((social, index) => (
              <a
                key={index}
                href={social.href}
                aria-label={social.label}
                target="_blank"
                rel="noopener noreferrer"
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
