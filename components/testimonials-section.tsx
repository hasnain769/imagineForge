"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { motion, useAnimation, useMotionValue } from "framer-motion"
import { useInView } from "framer-motion"
import Image from "next/image"
import { Quote, ChevronLeft, ChevronRight } from "lucide-react"

// Testimonial data
const testimonials = [
  {
    id: 1,
    name: "Sarah Johnson",
    role: "CTO",
    company: "TechVision Inc.",
    quote:
      "Imagine Forge transformed our approach to AI implementation. Their strategic guidance helped us achieve a 40% increase in operational efficiency within just three months.",
    avatar: "https://placehold.co/80x80/081a04/F1DAD4?text=SJ",
  },
  {
    id: 2,
    name: "Michael Chen",
    role: "Director of Innovation",
    company: "Global Systems",
    quote:
      "The team at Imagine Forge doesn't just understand AI—they understand business. They helped us identify opportunities we hadn't even considered, resulting in new revenue streams.",
    avatar: "https://placehold.co/80x80/081a04/F1DAD4?text=MC",
  },
  {
    id: 3,
    name: "Elena Rodriguez",
    role: "VP of Operations",
    company: "Nexus Enterprises",
    quote:
      "Working with Imagine Forge was a game-changer for our organization. Their AI solutions streamlined our data processing workflows and improved decision-making across all departments.",
    avatar: "https://placehold.co/80x80/081a04/F1DAD4?text=ER",
  },
  {
    id: 4,
    name: "David Park",
    role: "CEO",
    company: "Innovate AI",
    quote:
      "Imagine Forge's consultancy services provided us with a clear roadmap for AI integration. Their expertise and hands-on approach made the entire process seamless and effective.",
    avatar: "https://placehold.co/80x80/081a04/F1DAD4?text=DP",
  },
  {
    id: 5,
    name: "Aisha Patel",
    role: "Head of Data Science",
    company: "FutureTech Solutions",
    quote:
      "The custom machine learning models developed by Imagine Forge have significantly improved our predictive capabilities. Their ongoing support ensures we stay ahead of the curve.",
    avatar: "https://placehold.co/80x80/081a04/F1DAD4?text=AP",
  },
]

// Double the testimonials array for seamless infinite scrolling
const doubledTestimonials = [...testimonials, ...testimonials]

export default function TestimonialsSection() {
  const [isPaused, setIsPaused] = useState(false)
  const [activeIndex, setActiveIndex] = useState(0)
  const carouselRef = useRef<HTMLDivElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const controls = useAnimation()
  const x = useMotionValue(0)
  const ref = useRef(null)
  const isInView = useInView(ref, { once: false, amount: 0.3 })

  // Calculate animation duration based on the number of testimonials
  const animationDuration = testimonials.length * 10 // 10 seconds per testimonial

  // Update active index based on scroll position
  useEffect(() => {
    const updateActiveIndex = () => {
      if (!carouselRef.current) return

      // Calculate which testimonial is most visible
      const scrollPosition = Math.abs(x.get())
      const itemWidth = carouselRef.current.scrollWidth / doubledTestimonials.length
      const newActiveIndex = Math.round(scrollPosition / itemWidth) % testimonials.length

      setActiveIndex(newActiveIndex)
    }

    const unsubscribe = x.onChange(updateActiveIndex)
    return () => unsubscribe()
  }, [x, testimonials.length])

  useEffect(() => {
    let timeoutId: NodeJS.Timeout

    const startAnimation = () => {
      // Get container and carousel widths
      if (!containerRef.current || !carouselRef.current) return

      const containerWidth = containerRef.current.offsetWidth
      const carouselWidth = carouselRef.current.scrollWidth / 2 // Divide by 2 because we doubled the items

      // Start the animation
      controls.start({
        x: [-carouselWidth, 0],
        transition: {
          x: {
            repeat: Number.POSITIVE_INFINITY,
            repeatType: "loop",
            duration: animationDuration,
            ease: "linear",
          },
        },
      })
    }

    // Start animation after a short delay to ensure everything is rendered
    timeoutId = setTimeout(startAnimation, 500)

    return () => {
      clearTimeout(timeoutId)
      controls.stop()
    }
  }, [controls, animationDuration])

  // Pause animation on hover or focus
  useEffect(() => {
    if (isPaused) {
      controls.stop()
    } else {
      controls.start({
        x: [-carouselRef.current?.scrollWidth! / 2, 0],
        transition: {
          x: {
            repeat: Number.POSITIVE_INFINITY,
            repeatType: "loop",
            duration: animationDuration,
            ease: "linear",
          },
        },
      })
    }
  }, [isPaused, controls, animationDuration])

  // Handle keyboard navigation
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowLeft" || e.key === "ArrowRight") {
      setIsPaused(true)
    }
  }

  // Navigate to previous testimonial
  const goToPrev = () => {
    if (!carouselRef.current) return

    // Get the current position
    const currentPosition = x.get()

    // Calculate the width of a single card
    const cardWidth = carouselRef.current.scrollWidth / doubledTestimonials.length

    // Calculate the new position - move one card to the right (since we're moving in reverse)
    const newPosition = currentPosition + cardWidth

    // Stop current animation
    controls.stop()

    // Animate to the new position
    controls.start({
      x: newPosition,
      transition: { duration: 0.5, ease: "easeInOut" },
    })

    // Pause the carousel
    setIsPaused(true)

    // After a delay, resume the infinite scrolling animation
    const timeoutId = setTimeout(() => {
      setIsPaused(false)
    }, 3000)
  }

  // Navigate to next testimonial - move exactly one card
  const goToNext = () => {
    if (!carouselRef.current) return

    // Get the current position
    const currentPosition = x.get()

    // Calculate the width of a single card
    const cardWidth = carouselRef.current.scrollWidth / doubledTestimonials.length

    // Calculate the new position - move one card to the left
    const newPosition = currentPosition - cardWidth

    // Stop current animation
    controls.stop()

    // Animate to the new position
    controls.start({
      x: newPosition,
      transition: { duration: 0.5, ease: "easeInOut" },
    })

    // Pause the carousel
    setIsPaused(true)

    // After a delay, resume the infinite scrolling animation
    const timeoutId = setTimeout(() => {
      setIsPaused(false)
    }, 3000)
  }

  // This function is no longer used with the new navigation approach, but we'll keep it
  // for potential future use with index-based navigation
  const navigateToIndex = (index: number) => {
    // Calculate the target position for this testimonial
    const targetPosition = (-index * (carouselRef.current?.scrollWidth || 0)) / doubledTestimonials.length

    // Stop current animation and animate to the target position
    controls.stop()
    controls.start({
      x: targetPosition,
      transition: { duration: 0.8, ease: "easeInOut" },
    })

    // Pause the carousel
    setIsPaused(true)

    // After a delay, resume the infinite scrolling animation
    const timeoutId = setTimeout(() => {
      setIsPaused(false)
    }, 3000)
  }

  return (
    <section id="testimonials" className="py-24 px-4 md:px-8 bg-transparent overflow-hidden" ref={ref}>
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            What Our <span className="text-cream-400 glow-text">Clients</span> Say
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Discover how Imagine Forge has helped businesses across industries harness the power of AI to drive innovation
            and growth.
          </p>
        </motion.div>

        {/* Testimonials Carousel with Navigation Arrows */}
        <div className="relative">
          {/* Left Arrow */}
          <button
            onClick={goToPrev}
            className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-black/60 hover:bg-black/80 text-cream-400 p-2 rounded-full transform -translate-x-1/2 md:translate-x-0 transition-all duration-300 hover:scale-110 focus:outline-none focus:ring-2 focus:ring-cream-400/50"
            aria-label="Previous testimonial"
          >
            <ChevronLeft className="h-6 w-6 md:h-8 md:w-8" />
          </button>

          {/* Carousel Container */}
          <div
            ref={containerRef}
            className="relative overflow-hidden px-8 md:px-12"
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
            onFocus={() => setIsPaused(true)}
            onBlur={() => setIsPaused(false)}
            tabIndex={0}
            onKeyDown={handleKeyDown}
            aria-label="Testimonials carousel"
          >
            <motion.div ref={carouselRef} className="flex" animate={controls} style={{ x }}>
              {doubledTestimonials.map((testimonial, index) => (
                <div
                  key={`${testimonial.id}-${index}`}
                  className="flex-shrink-0 w-full sm:w-1/2 lg:w-1/3 px-2 sm:px-4"
                  style={{ minWidth: "250px", maxWidth: "450px" }}
                  tabIndex={0}
                >
                  <div className="bg-black/40 backdrop-blur-sm border border-gray-800 rounded-xl p-4 sm:p-6 h-full flex flex-col hover:border-cream-400/50 transition-all duration-300 hover:shadow-lg hover:shadow-cream-400/10">
                    <div className="mb-4 sm:mb-6 text-cream-400">
                      <Quote className="h-6 w-6 sm:h-8 sm:w-8 opacity-50" />
                    </div>
                    <p className="text-sm sm:text-base text-gray-300 mb-4 sm:mb-6 flex-grow">{testimonial.quote}</p>
                    <div className="flex items-center">
                      <div className="mr-3 sm:mr-4 rounded-full overflow-hidden bg-gray-800 flex-shrink-0">
                        <Image
                          src={testimonial.avatar || "/placeholder.svg"}
                          alt={`A portrait of ${testimonial.name}, a satisfied client of Imagine Forge`}
                          width={40}
                          height={40}
                          className="object-cover"
                        />
                      </div>
                      <div>
                        <h4 className="font-semibold text-cream-400 text-sm sm:text-base">{testimonial.name}</h4>
                        <p className="text-xs sm:text-sm text-gray-400">
                          {testimonial.role}, {testimonial.company}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Right Arrow */}
          <button
            onClick={goToNext}
            className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-black/60 hover:bg-black/80 text-cream-400 p-2 rounded-full transform translate-x-1/2 md:translate-x-0 transition-all duration-300 hover:scale-110 focus:outline-none focus:ring-2 focus:ring-cream-400/50"
            aria-label="Next testimonial"
          >
            <ChevronRight className="h-6 w-6 md:h-8 md:w-8" />
          </button>
        </div>
      </div>
    </section>
  )
}
