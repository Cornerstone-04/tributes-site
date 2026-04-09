import { HeroSection } from "@/components/home/hero-section";
import { LandingCta } from "@/components/home/landing-cta";
import { TimelineSection } from "@/components/home/timeline-section";
import { Footer } from "@/components/layout/footer";
import { Navbar } from "@/components/layout/navbar";
import { SectionDivider } from "@/components/shared/section-divider";

export default function LandingPage() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <Navbar />
      <HeroSection />
      <TimelineSection />
      <SectionDivider />
      <LandingCta />
      <Footer />
    </main>
  );
}
