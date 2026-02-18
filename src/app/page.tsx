import Navbar from "@/components/layout/Navbar";
import Hero from "@/components/home/Hero";

export default function Home() {
  return (
    <main className="min-h-screen bg-background">
      <Navbar />
      <Hero />

      {/* Spacer for content below fold */}
      <section className="py-20 bg-background text-center">
        <div className="container mx-auto px-4">
          <h3 className="text-2xl font-bold mb-4">More Than Equipment</h3>
          <p className="text-muted-foreground">Scroll down to see the rest of the landing page content.</p>
        </div>
      </section>
    </main>
  );
}
