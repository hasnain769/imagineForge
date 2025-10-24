import Navbar from "@/components/navbar";
import Footer from "@/components/footer";

export default function PricingLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen w-full relative scroll-smooth">
      <Navbar />
      <main className="pt-20">
        {children}
      </main>
      <Footer />
    </div>
  );
}