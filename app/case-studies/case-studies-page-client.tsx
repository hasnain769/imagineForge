import AnimatedH1 from '@/components/animated-h1'
import AnimatedDiv from '@/components/animated-div'
import ReadMoreButton from '@/components/read-more-button'
import Image from 'next/image'

export default function CaseStudiesPageClient({ caseStudies }: { caseStudies: { id: string, date: string, title: string, excerpt: string, image: string }[] }) {
  return (
    <section id="case-studies" className="min-h-screen w-full py-24 px-4 md:px-8 bg-transparent">
      <div className="max-w-6xl mx-auto z-10 pt-16">
        <AnimatedH1>Our <span className="text-cream-400 glow-text">Case Studies</span></AnimatedH1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {caseStudies.map((caseStudy, index) => (
            <AnimatedDiv
              key={caseStudy.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.7,
                delay: index * 0.1,
                ease: 'easeOut',
              }}
              className="bg-black/40 backdrop-blur-sm border border-gray-800 rounded-xl p-6 hover:border-cream-400/50 transition-all duration-300 group overflow-hidden"
            >
              <div className="relative w-full h-48 mb-4">
                <Image src={caseStudy.image} alt={`A decorative image for the case study titled: ${caseStudy.title}`} fill style={{objectFit: "cover"}} />
              </div>
              <h3 className="text-xl font-bold mb-3 group-hover:text-cream-400 transition-colors">{caseStudy.title}</h3>
              <p className="text-gray-400 text-sm mb-4">{caseStudy.date}</p>
              <p className="text-gray-300 mb-6">{caseStudy.excerpt}</p>
              <ReadMoreButton id={caseStudy.id} basePath="/case-studies" />
            </AnimatedDiv>
          ))}
        </div>
      </div>
    </section>
  )
}
