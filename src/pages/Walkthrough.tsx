import { useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSwipeable } from 'react-swipeable';
import { AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import WalkthroughSlide from '@/components/onboarding/WalkthroughSlide';
import {
  Zap,
  GraduationCap,
  Briefcase,
  Users,
  Sparkles,
  ArrowRight,
  Cpu,
  PoundSterling,
  Wrench,
  ShieldCheck,
  FileWarning,
  Calculator,
  FileCheck,
  ScanLine,
  Receipt,
  Contact,
  Package,
  ClipboardList,
} from 'lucide-react';
import { cn } from '@/lib/utils';

const WALKTHROUGH_KEY = 'walkthrough_completed';

const slides = [
  {
    icon: Zap,
    title: "The UK's All-in-One Electrical App",
    description:
      'Certificates, quotes, invoices, RAMS — done in minutes, not hours. Built for BS 7671 by UK electricians.',
    features: [],
    accentColour: '#FACC15',
    variant: 'hero' as const,
  },
  {
    icon: Cpu,
    title: '8 AI Specialist Agents',
    description: 'Trained on BS 7671:2018 + A3:2024 and real UK trade data.',
    features: [],
    accentColour: '#A78BFA',
    variant: 'showcase' as const,
    showcaseItems: [
      { icon: Cpu, label: 'Circuit Designer' },
      { icon: PoundSterling, label: 'Cost Engineer' },
      { icon: Wrench, label: 'Installation' },
      { icon: ShieldCheck, label: 'Health & Safety' },
      { icon: FileWarning, label: 'RAMS in 2 Minutes' },
      { icon: Calculator, label: '70+ Calculators' },
    ],
  },
  {
    icon: GraduationCap,
    title: 'Train at Every Level',
    description: '',
    features: [
      '48 structured courses',
      'AM2 exam prep',
      'Level 2 & 3 complete pathways',
      'Flashcards & OJT diary',
    ],
    accentColour: '#34D399',
    variant: 'stats' as const,
    statCallout: '6,800+',
  },
  {
    icon: Briefcase,
    title: 'Your Complete Business Hub',
    description: 'Certificates, quotes, and site docs — all on site.',
    features: [],
    accentColour: '#60A5FA',
    variant: 'feature-grid' as const,
    gridItems: [
      { icon: FileCheck, label: '8 Certificate Types' },
      { icon: ScanLine, label: 'AI Board Scanner' },
      { icon: Receipt, label: 'Quotes & Invoices' },
      { icon: Contact, label: 'Customer Management' },
      { icon: Package, label: 'Live Material Pricing' },
      { icon: ClipboardList, label: '30-Page RAMS in Minutes' },
    ],
  },
  {
    icon: Users,
    title: 'Choose Your Path',
    description: '',
    features: [],
    accentColour: '#FACC15',
    variant: 'tiers' as const,
    tierCards: [
      {
        name: 'Apprentice',
        colour: '#34D399',
        description: 'Courses, calculators & exam prep',
        price: 'From £4.99/mo',
      },
      {
        name: 'Electrician',
        colour: '#FACC15',
        description: 'AI agents, certs & business tools',
        price: 'From £9.99/mo',
        badge: 'Most Popular',
      },
      {
        name: 'Employer',
        colour: '#60A5FA',
        description: 'Team management, GPS & safety hub',
        price: 'From £29.99/mo',
        badge: 'Coming Soon',
        badgeColour: '#60A5FA',
      },
    ],
  },
  {
    icon: Sparkles,
    title: 'Try Everything Free for 7 Days',
    description: '',
    features: ['7-day free trial', 'Cancel anytime', 'All features unlocked', 'Secure payments'],
    accentColour: '#FACC15',
    variant: 'cta' as const,
  },
];

const Walkthrough = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const navigate = useNavigate();
  const isLastSlide = currentSlide === slides.length - 1;

  const completeWalkthrough = useCallback(() => {
    localStorage.setItem(WALKTHROUGH_KEY, 'true');
  }, []);

  const handleGetStarted = useCallback(() => {
    completeWalkthrough();
    navigate('/auth/signup');
  }, [completeWalkthrough, navigate]);

  const handleLogIn = useCallback(() => {
    completeWalkthrough();
    navigate('/auth/signin');
  }, [completeWalkthrough, navigate]);

  const handleSkip = useCallback(() => {
    completeWalkthrough();
    navigate('/');
  }, [completeWalkthrough, navigate]);

  const goNext = useCallback(() => {
    if (currentSlide < slides.length - 1) {
      setCurrentSlide((prev) => prev + 1);
    }
  }, [currentSlide]);

  const goPrev = useCallback(() => {
    if (currentSlide > 0) {
      setCurrentSlide((prev) => prev - 1);
    }
  }, [currentSlide]);

  const swipeHandlers = useSwipeable({
    onSwipedLeft: goNext,
    onSwipedRight: goPrev,
    trackMouse: false,
    preventScrollOnSwipe: true,
  });

  return (
    <div
      className="min-h-[100svh] flex flex-col bg-gradient-to-b from-zinc-900 via-black to-black"
      style={{
        paddingTop: 'env(safe-area-inset-top, 0px)',
        paddingBottom: 'env(safe-area-inset-bottom, 0px)',
      }}
    >
      {/* Skip button */}
      {!isLastSlide && (
        <div className="flex justify-end px-4 pt-4">
          <button
            onClick={handleSkip}
            className="text-sm text-white hover:text-white transition-colors py-2 px-3 rounded-xl touch-manipulation min-h-[44px] flex items-center"
          >
            Skip
          </button>
        </div>
      )}
      {isLastSlide && <div className="h-[60px]" />}

      {/* Slide content */}
      <div
        {...swipeHandlers}
        className="flex-1 flex items-center justify-center touch-manipulation"
      >
        <AnimatePresence mode="wait">
          <WalkthroughSlide key={currentSlide} {...slides[currentSlide]} />
        </AnimatePresence>
      </div>

      {/* Bottom section */}
      <div className="px-6 pb-6 space-y-4">
        {/* Dot indicators */}
        <div className="flex justify-center gap-2">
          {slides.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrentSlide(i)}
              className={cn(
                'transition-all duration-200 rounded-full touch-manipulation',
                i === currentSlide ? 'w-6 h-2 bg-elec-yellow' : 'w-2 h-2 bg-white/20'
              )}
              aria-label={`Go to slide ${i + 1}`}
            />
          ))}
        </div>

        {/* Buttons */}
        {isLastSlide ? (
          <div className="space-y-3">
            <Button
              onClick={handleGetStarted}
              className="w-full h-14 text-base font-semibold bg-elec-yellow hover:bg-elec-yellow/90 text-black rounded-2xl shadow-lg shadow-elec-yellow/25 touch-manipulation"
            >
              Get Started
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <Button
              onClick={handleLogIn}
              variant="outline"
              className="w-full h-14 text-base font-semibold border-white/20 text-white hover:bg-white/5 rounded-2xl touch-manipulation"
            >
              I already have an account
            </Button>
          </div>
        ) : (
          <Button
            onClick={goNext}
            className="w-full h-14 text-base font-semibold bg-white/10 hover:bg-white/15 text-white border border-white/20 rounded-2xl touch-manipulation"
          >
            Next
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        )}
      </div>
    </div>
  );
};

export default Walkthrough;
