import HeroSection from "@/components/hero-section"
import ServicesSection from "@/components/services-section"
import AboutSection from "@/components/about-section"
import ContactSection from "@/components/contact-section"
import VantaBackground from "@/components/vanta-background"
import LogoAnimation from "@/components/logo-animation"
import BackgroundElements from "@/components/background-elements"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"

export default function Home() {
  return (
    <main className="min-h-screen w-full relative scroll-smooth">
      <BackgroundElements/>
      {/* <VantaBackground /> */}
      <LogoAnimation />
      <Navbar />
      <HeroSection />
      <ServicesSection />
      <AboutSection />
      <ContactSection />
      <Footer />
    </main>
  )
}
