import { getSortedPostsData } from '@/lib/content'
import BlogSectionClient from './blog-section-client'

export default function BlogSection() {
  const allPostsData = getSortedPostsData()
  const blogPosts = allPostsData.slice(0, 3)

  return (
    <section id="blog" className="min-h-screen w-full py-24 px-4 md:px-8 bg-transparent">
      <div className="max-w-6xl mx-auto z-10 pt-16">
        <BlogSectionClient posts={blogPosts} title={<span>From Our <span className="text-cream-400 glow-text">Blog</span></span>} />
      </div>
    </section>
  )
}
