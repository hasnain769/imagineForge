'use client'

import { useRef } from 'react'
import { useInView } from 'framer-motion'
import ReadMoreButton from './read-more-button'
import AnimatedDiv from './animated-div'
import AnimatedH1 from './animated-h1'

export default function BlogSectionClient({ posts, title }: { posts: { id: string, date: string, title: string, excerpt: string, image: string }[], title: React.ReactNode }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: false, amount: 0.1 })

  return (
    <div ref={ref}>
      <AnimatedH1>{title}</AnimatedH1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {posts.map((post, index) => (
          <AnimatedDiv
            key={post.id}
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{
              duration: 0.7,
              delay: index * 0.1,
              ease: 'easeOut',
            }}
            className="bg-black/40 backdrop-blur-sm border border-gray-800 rounded-xl p-6 hover:border-cream-400/50 transition-all duration-300 group"
          >
            <h3 className="text-xl font-bold mb-3 group-hover:text-cream-400 transition-colors">{post.title}</h3>
            <p className="text-gray-400 text-sm mb-4">{post.date}</p>
            <p className="text-gray-300 mb-6">{post.excerpt}</p>
            <ReadMoreButton id={post.id} />
          </AnimatedDiv>
        ))}
      </div>
    </div>
  )
}
