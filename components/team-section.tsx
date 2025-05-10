"use client"

import { useState, useRef, useEffect } from "react"
import { motion, useInView } from "framer-motion"
import Image from "next/image"
import Hasnain from "@/public/hasnain.jpeg"
import George from "@/public/george.png"
import Sophia from "@/public/sophia.jpeg"
import { Instagram, Linkedin, Facebook } from "lucide-react"

// Team member data
const teamMembers = [
  {
    name: "George Ishmail",
    role: "Founder & CEO",
    image: George,
    bio: "With over 15 years in AI development and strategic consulting, George leads VistaFlow's vision to transform businesses through innovative AI solutions.",
    social: { linkedin: "#", instagram: "#", facebook: "#" },
  },
  {
    name: "Syed Hasnain",
    role: "Chief Technology Officer",
    image: Hasnain,
    bio: "Hasnain brings deep expertise in machine learning and neural networks, overseeing the technical development of all VistaFlow's cutting-edge AI implementations.",
    social: { linkedin: "#", instagram: "#", facebook: "#" },
  },
  {
    name: "Sophia Rodriguez",
    role: "Head of AI Strategy",
    image: Sophia,
    bio: "Sophia specializes in translating complex business challenges into practical AI solutions, helping clients navigate their digital transformation journey.",
    social: { linkedin: "#", instagram: "#", facebook: "#" },
  },
]

const SocialIcon = ({ platform, url }: { platform: string; url: string }) => {
  const icons = {
    instagram: <Instagram className="h-5 w-5" />, 
    linkedin: <Linkedin className="h-5 w-5" />,
    facebook: <Facebook className="h-5 w-5" />,
  }
  return (
    <motion.a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className="text-gray-400 hover:text-cream-400 transition-colors duration-300"
      whileHover={{ scale: 1.2, rotate: 5 }}
      whileTap={{ scale: 0.95 }}
      aria-label={`${platform} profile`}
    >
      {icons[platform as keyof typeof icons]}
    </motion.a>
  )
}

export default function TeamSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const isInView = useInView(sectionRef, { once: false, amount: 0.1 })
  const [activeCardIndex, setActiveCardIndex] = useState<number | null>(null)
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const onResize = () => setIsMobile(window.innerWidth < 768)
    onResize()
    window.addEventListener("resize", onResize)
    return () => window.removeEventListener("resize", onResize)
  }, [])

  return (
    <section
      id="team"
      ref={sectionRef}
      className="min-h-screen w-full py-24 px-4 md:px-8 bg-transparent overflow-hidden"
    >
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Meet Our <span className="text-cream-400 glow-text">Team</span>
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            The brilliant minds behind VistaFlow's innovative AI solutions and strategic vision.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 justify-items-center gap-8 md:gap-12 mt-12">
          {teamMembers.map((member, index) => (
            <TeamMemberCard
              key={member.name}
              member={member}
              index={index}
              isMobile={isMobile}
              activeCardIndex={activeCardIndex}
              setActiveCardIndex={setActiveCardIndex}
            />
          ))}
        </div>
      </div>
    </section>
  )
}

type CardProps = {
  member: typeof teamMembers[0]
  index: number
  isMobile: boolean
  activeCardIndex: number | null
  setActiveCardIndex: (i: number | null) => void
}

const TeamMemberCard = ({ member, index, isMobile, activeCardIndex, setActiveCardIndex }: CardProps) => {
  const [isFlipped, setIsFlipped] = useState(false)
  const cardRef = useRef<HTMLDivElement>(null)
  const cardInView = useInView(cardRef, { amount: 0.8, once: false })

  useEffect(() => {
    if (isMobile) {
      if (cardInView) setActiveCardIndex(index)
      else if (activeCardIndex === index) setActiveCardIndex(null)
    }
  }, [cardInView, index, isMobile, activeCardIndex, setActiveCardIndex])

  const isActuallyFlipped = isMobile ? activeCardIndex === index : isFlipped

  const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: (i: number) => ({ opacity: 1, y: 0, transition: { delay: i * 0.2, duration: 0.7, ease: "easeOut" } }),
    flip: { rotateY: 180 },
    unflip: { rotateY: 0 },
  }

  return (
    <motion.div
      ref={cardRef}
      className={`px-4 w-full h-[350px] md:h-[450px] lg:h-[470px] ${
        isMobile ? "sm:w-[48%]" : "md:w-[350px] lg:w-[400px]"
      } cursor-pointer`}
      variants={cardVariants}
      initial="hidden"
      animate="visible"
      custom={index}
      onHoverStart={() => !isMobile && setIsFlipped(true)}
      onHoverEnd={() => !isMobile && setIsFlipped(false)}
    >
      <motion.div
        className="relative w-full h-full preserve-3d transition-all duration-400"
        animate={isActuallyFlipped ? "flip" : "unflip"}
        variants={cardVariants}
      >
        {/* Front */}
        <div className="absolute w-full h-full backface-hidden rounded-xl overflow-hidden border border-gray-800 bg-black/40 backdrop-blur-sm hover:border-cream-400/50 transition-colors duration-300">
          <div className="relative w-full h-[70%] overflow-hidden">
            <Image
              src={member.image}
              alt={member.name}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 300px"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
          </div>
          <div className="absolute bottom-0 left-0 right-0 p-6">
            <h3 className="text-xl font-bold text-cream-400">{member.name}</h3>
            <p className="text-gray-300">{member.role}</p>
          </div>
        </div>

        {/* Back */}
        <div className="absolute w-full h-full backface-hidden rounded-xl overflow-hidden border border-gray-800 bg-black/40 backdrop-blur-sm hover:border-cream-400/50 transition-colors duration-300 rotateY-180 p-6 flex flex-col justify-between">
          <div>
            <h3 className="text-xl font-bold text-cream-400 mb-2">{member.name}</h3>
            <p className="text-gray-300 mb-4">{member.role}</p>
            <p className="text-gray-400">{member.bio}</p>
          </div>
          <div className="flex justify-center space-x-6 mt-4">
            {Object.entries(member.social).map(([plat, url]) => (
              <SocialIcon key={plat} platform={plat} url={url} />
            ))}
          </div>
        </div>
      </motion.div>
    </motion.div>
  )
}
