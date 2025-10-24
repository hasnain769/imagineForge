import { getSortedPostsData } from '@/lib/content'
import BlogPageClient from '@/app/blog/blog-page-client'

export default function BlogPage() {
  const allPostsData = getSortedPostsData()
  const recentPosts = allPostsData.slice(0, 3)
  return <BlogPageClient posts={recentPosts} />
}
