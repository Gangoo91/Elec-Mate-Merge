import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, Zap } from 'lucide-react';
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
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-xl border-b border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2 group">
            <div className="w-9 h-9 rounded-lg overflow-hidden transition-transform group-hover:scale-105">
              <img src="/logo.jpg" alt="Elec-Mate" className="w-full h-full object-cover" />
            </div>
            <span className="text-lg font-bold">
              Elec-<span className="text-yellow-400">Mate</span>
            </span>
          </Link>

          {/* Desktop nav */}
          <div className="hidden sm:flex items-center gap-4">
            {user ? (
              <Button asChild size="sm" className="h-10 bg-yellow-500 hover:bg-yellow-400 text-black font-semibold">
                <Link to="/dashboard">Dashboard</Link>
              </Button>
            ) : (
              <>
                <Link to="/auth/signin" className="text-sm text-white/70 hover:text-white transition-colors">
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
            className="sm:hidden w-10 h-10 rounded-lg bg-white/10 flex items-center justify-center text-white touch-manipulation"
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
        {/* Hero - Full viewport, animated gradient background */}
        <LandingHero />

        {/* Social Proof Bar - Animated counters */}
        <SocialProofBar />

        {/* Four Hubs - Grid on desktop, stack on mobile */}
        <HubsGrid />

        {/* AI Agents - Horizontal scroll mobile, grid desktop */}
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

        {/* Testimonials - Carousel mobile, grid desktop */}
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
