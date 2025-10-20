import { getPostData, getAllPostIds } from '@/lib/content'
import BlogPostPageClient from './blog-post-page-client'
import JsonLd from '@/components/json-ld'

export async function generateStaticParams() {
  const paths = getAllPostIds()
  return paths
}

export default async function BlogPostPage({ params }: { params: { slug: string } }) {
  const postData = await getPostData(params.slug)

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: postData.title,
    image: postData.image,
    datePublished: postData.date,
    author: {
      '@type': 'Organization',
      name: 'Imagine Forge',
      url: 'https://www.imagineforge.ai/',
    },
  }

  return (
    <>
      <JsonLd data={jsonLd} />
      <BlogPostPageClient postData={postData} />
    </>
  )
}
