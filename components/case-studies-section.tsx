import { getSortedCaseStudiesData } from '@/lib/content'
import CaseStudiesPageClient from '@/app/case-studies/case-studies-page-client'

export default function CaseStudiesPage() {
  const allCaseStudiesData = getSortedCaseStudiesData()
  const recentCaseStudies = allCaseStudiesData.slice(0, 3)
  return <CaseStudiesPageClient caseStudies={recentCaseStudies} />
}
