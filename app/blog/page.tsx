import { getSortedPostsData } from '@/lib/content'
import BlogPageClient from './blog-page-client'

export default function BlogPage() {
  const allPostsData = getSortedPostsData()
  return <BlogPageClient posts={allPostsData} />
}
