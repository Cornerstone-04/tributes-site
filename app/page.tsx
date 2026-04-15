import { HeroSection } from "@/components/home/hero-section";
import { LandingCta } from "@/components/home/landing-cta";
import { PhotoStrip } from "@/components/home/photo-strip";
import { TimelineSection } from "@/components/home/timeline-section";
import { Footer } from "@/components/layout/footer";
import { Navbar } from "@/components/layout/navbar";

export default function LandingPage() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <Navbar />
      <HeroSection />
      <TimelineSection />
      <PhotoStrip />
      <LandingCta />
      <Footer />
    </main>
  );
}
