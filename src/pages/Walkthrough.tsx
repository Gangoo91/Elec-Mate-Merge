import { useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSwipeable } from 'react-swipeable';
import { AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import WalkthroughSlide from '@/components/onboarding/WalkthroughSlide';
import { Zap, GraduationCap, FileCheck, Sparkles, ArrowRight } from 'lucide-react';
import { cn } from '@/lib/utils';

const WALKTHROUGH_KEY = 'walkthrough_completed';

const slides = [
  {
    icon: Zap,
    title: 'Your Complete Electrical Toolkit',
    description:
      'AI assistants trained on BS 7671, 50+ calculators, and digital certificates — all in one app.',
    features: [
      '5 AI specialists for every job',
      'Cable sizing & volt drop calculators',
      'Voice quotes & invoices',
      'Stripe payments built in',
    ],
    accentColour: '#FACC15',
    iconBgColour: 'rgba(250, 204, 21, 0.15)',
  },
  {
    icon: GraduationCap,
    title: 'Train & Qualify',
    description:
      'Level 2 & 3 courses, 2,000+ practice questions, AM2 prep, and HNC modules — study anywhere.',
    features: [
      '22 courses from apprentice to advanced',
      '2,000+ exam-style questions',
      'AM2 practical & theory prep',
      'Flashcards & mock exams',
    ],
    accentColour: '#34D399',
    iconBgColour: 'rgba(52, 211, 153, 0.15)',
  },
  {
    icon: FileCheck,
    title: 'Certificates Made Easy',
    description:
      'EICR, EIC, Minor Works, Fire Alarm and more — fill in on site, sign digitally, export as PDF.',
    features: [
      '8 certificate types',
      'AI board scanner auto-populates circuits',
      'Digital signatures',
      'Professional PDF export',
    ],
    accentColour: '#60A5FA',
    iconBgColour: 'rgba(96, 165, 250, 0.15)',
  },
  {
    icon: Sparkles,
    title: 'Start Your Free Trial',
    description:
      'Get full access for 7 days — completely free. No charge until day 8, cancel anytime.',
    features: [
      '7 days free, then from £4.99/month',
      'Cancel anytime — no contracts',
      'All features unlocked instantly',
      'Used by 430+ UK electricians',
    ],
    accentColour: '#FACC15',
    iconBgColour: 'rgba(250, 204, 21, 0.15)',
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
            className="text-sm text-white/40 hover:text-white/60 transition-colors py-2 px-3 rounded-xl touch-manipulation min-h-[44px] flex items-center"
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
