import Navbar from "@/components/navbar";
import Footer from "@/components/footer";

export default function CaseStudyLayout({ children }: { children: React.ReactNode }) {
  return (
    <main className="min-h-screen w-full relative scroll-smooth">
      <Navbar />
      {children}
      <Footer />
    </main>
  );
}
