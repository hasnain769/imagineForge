'use client'

import { Button } from '@/components/ui/button'
import { ArrowRight } from 'lucide-react'

export default function ReadMoreButton({ id, basePath }: { id: string, basePath: string }) {
  return (
    <Button
      onClick={() => (window.location.href = `${basePath}/${id}`)}
      className="bg-transparent border border-cream-400 text-cream-400 hover:bg-cream-400 hover:text-black font-medium rounded-full transition-all duration-300 group-hover:scale-105"
    >
      Read More
      <ArrowRight className="ml-2 h-5 w-5" />
    </Button>
  )
}
