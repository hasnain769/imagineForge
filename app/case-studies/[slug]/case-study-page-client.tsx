'use client'

import AnimatedH1 from '@/components/animated-h1'
import AnimatedDiv from '@/components/animated-div'
import Image from 'next/image'

export default function CaseStudyPageClient({ caseStudyData }: { caseStudyData: { title: string, date: string, contentHtml: string, image: string } }) {
  return (
    <section className="min-h-screen w-full py-24 px-4 md:px-8 bg-transparent">
      <div className="max-w-4xl mx-auto z-10 pt-24">
        <AnimatedH1>{caseStudyData.title}</AnimatedH1>
        <AnimatedDiv
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="text-center text-gray-400 mb-8"
        >
          {caseStudyData.date}
        </AnimatedDiv>
        <AnimatedDiv
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="relative w-full h-96 mb-8"
        >
          <Image src={caseStudyData.image} alt={caseStudyData.title} fill style={{objectFit: "cover"}} />
        </AnimatedDiv>
        <AnimatedDiv
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="bg-black/40 backdrop-blur-sm border border-gray-800 rounded-xl p-6 md:p-8 prose prose-invert max-w-none pb-20"
          dangerouslySetInnerHTML={{ __html: caseStudyData.contentHtml }}
        />
      </div>
    </section>
  )
}
