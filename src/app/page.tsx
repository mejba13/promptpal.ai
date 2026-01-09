import { Header, Footer } from '@/components/layout';
import {
  HeroSection,
  FeaturesSection,
  HowItWorksSection,
  PricingSection,
  TestimonialsSection,
  SolutionsSection,
  FAQSection,
  CTASection,
} from '@/components/landing';

export default function HomePage() {
  return (
    <div className="relative min-h-screen bg-page-gradient">
      {/* Global background glow accents */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1200px] h-[600px] bg-gradient-radial from-mint-100/30 via-mint-50/10 to-transparent blur-3xl" />
        <div className="absolute top-1/3 right-0 w-[600px] h-[600px] bg-gradient-radial from-mint-100/20 to-transparent blur-3xl" />
        <div className="absolute bottom-1/4 left-0 w-[500px] h-[500px] bg-gradient-radial from-mint-50/25 to-transparent blur-3xl" />
      </div>

      <Header />
      <main className="relative">
        <HeroSection />
        <FeaturesSection />
        <HowItWorksSection />
        <SolutionsSection />
        <PricingSection />
        <TestimonialsSection />
        <FAQSection />
        <CTASection />
      </main>
      <Footer />
    </div>
  );
}
