import { getCaseStudyData, getAllCaseStudyIds } from '@/lib/content'
import CaseStudyPageClient from './case-study-page-client'
import JsonLd from '@/components/json-ld'

export async function generateStaticParams() {
  const paths = getAllCaseStudyIds()
  return paths
}

export default async function CaseStudyPage({ params }: { params: { slug: string } }) {
  const awaitedParams = await params;
  const caseStudyData = await getCaseStudyData(awaitedParams.slug)

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: caseStudyData.title,
    image: caseStudyData.image,
    datePublished: caseStudyData.date,
    author: {
      '@type': 'Organization',
      name: 'Imagine Forge',
      url: 'https://www.imagineforge.tech/',
    },
  }

  return (
    <>
      <JsonLd data={jsonLd} />
      <CaseStudyPageClient caseStudyData={caseStudyData} />
    </>
  )
}
