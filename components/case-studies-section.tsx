import { getSortedCaseStudiesData } from '@/lib/content'
import CaseStudiesPageClient from '@/app/case-studies/case-studies-page-client'

export default function CaseStudiesPage() {
  const allCaseStudiesData = getSortedCaseStudiesData()
  return <CaseStudiesPageClient caseStudies={allCaseStudiesData} />
}
