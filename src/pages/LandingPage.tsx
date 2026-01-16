import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';
import {
  LandingHero,
  SocialProofBar,
  HubsGrid,
  AIAgentsCarousel,
  InspectionShowcase,
  StudyCentrePreview,
  MentalHealthPreview,
  ElecIdBanner,
  SocialValueBanner,
  TestimonialCarousel,
  PricingSection,
  FinalCTA,
  LandingFooter,
  MobileNavSheet,
} from '@/components/landing';

const LandingPage = () => {
  const { user } = useAuth();
  const [isNavOpen, setIsNavOpen] = useState(false);

  return (
    <div className="min-h-screen bg-black text-white antialiased">
      {/* Navigation - cleaner, more minimal */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-black/70 backdrop-blur-xl border-b border-white/[0.04]">
        <div className="max-w-6xl mx-auto px-5 sm:px-8 h-14 sm:h-16 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2 group">
            <div className="w-8 h-8 rounded-lg overflow-hidden transition-transform group-hover:scale-105">
              <img src="/logo.jpg" alt="Elec-Mate" className="w-full h-full object-cover" />
            </div>
            <span className="text-base sm:text-lg font-bold">
              Elec-<span className="text-yellow-400">Mate</span>
            </span>
          </Link>

          {/* Desktop nav */}
          <div className="hidden sm:flex items-center gap-3">
            {user ? (
              <Button asChild size="sm" className="h-10 bg-yellow-500 hover:bg-yellow-400 text-black font-semibold">
                <Link to="/dashboard">Dashboard</Link>
              </Button>
            ) : (
              <>
                <Link to="/auth/signin" className="text-sm text-white/50 hover:text-white transition-colors px-3 py-2">
                  Sign in
                </Link>
                <Button asChild size="sm" className="h-10 bg-yellow-500 hover:bg-yellow-400 text-black font-semibold">
                  <Link to="/auth/signup">Start Free Trial</Link>
                </Button>
              </>
            )}
          </div>

          {/* Mobile nav button */}
          <button
            onClick={() => setIsNavOpen(true)}
            className="sm:hidden w-10 h-10 rounded-lg bg-white/[0.06] flex items-center justify-center text-white touch-manipulation active:scale-95 transition-transform"
            aria-label="Open menu"
          >
            <Menu className="w-5 h-5" />
          </button>
        </div>
      </nav>

      {/* Mobile nav sheet */}
      <MobileNavSheet isOpen={isNavOpen} onClose={() => setIsNavOpen(false)} />

      {/* Main content */}
      <main>
        {/* Hero - Full viewport, premium gradient background */}
        <LandingHero />

        {/* Social Proof Bar - Animated counters */}
        <SocialProofBar />

        {/* Four Hubs - 2x2 grid on mobile */}
        <HubsGrid />

        {/* AI Agents - Horizontal scroll mobile */}
        <AIAgentsCarousel />

        {/* Inspection Suite Showcase */}
        <InspectionShowcase />

        {/* Study Centre Preview */}
        <StudyCentrePreview />

        {/* Mental Health Hub Preview */}
        <MentalHealthPreview />

        {/* Elec-ID Banner */}
        <ElecIdBanner />

        {/* Social Value - £1 to charity */}
        <SocialValueBanner />

        {/* Testimonials - Carousel mobile */}
        <TestimonialCarousel />

        {/* Pricing Section */}
        <PricingSection />

        {/* Final CTA */}
        <FinalCTA />
      </main>

      {/* Footer */}
      <LandingFooter />
    </div>
  );
};

export default LandingPage;
