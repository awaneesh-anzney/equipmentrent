import Navbar from "@/components/layout/Navbar";
import Hero from "@/components/home/Hero";
import FeatureCards from "@/components/home/FeatureCards";
import CallToActionSection from "@/components/home/CallToActionSection";
import Footer from "@/components/layout/Footer";


export default function Home() {
  return (
    <main className="min-h-screen bg-background text-foreground font-sans">
      <Navbar />
      <Hero />
      <FeatureCards />
      <CallToActionSection />
      <Footer />
    </main>
  );
}
