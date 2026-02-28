import { useState, useCallback, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSwipeable } from 'react-swipeable';
import { AnimatePresence, motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import WalkthroughSlide from '@/components/onboarding/WalkthroughSlide';
import type { TestimonialData, ScreenshotItem } from '@/components/onboarding/WalkthroughSlide';
import { Zap, Sparkles, ArrowRight, ShieldCheck, ChevronLeft } from 'lucide-react';
import { useHaptics } from '@/hooks/useHaptics';

const WALKTHROUGH_KEY = 'walkthrough_completed';
const SLIDE_DURATION_DEFAULT = 5000; // 5 seconds per slide
const SLIDE_DURATIONS = [5000, 15000, 5000, 5000]; // Slide 2 longer for feature showcase

/* ── Testimonials — real businesses, real logos ── */
const testimonials: TestimonialData[] = [
  {
    quote:
      "Everything is practical, easy to use, and actually useful on site. It saves time, takes the hassle out of calculations and checks — it's an absolute game-changer.",
    name: 'Cole Humphreys',
    company: 'Corevolt Electrical',
    companyLogo: '/images/testimonials/corevolt.jpg',
    logoBg: '#fff',
  },
  {
    quote:
      'Elec-Mate has replaced 2/3 other apps and merged them into one. The AI circuit designer in our handover packs has already won us additional contracts.',
    name: 'Dan Palmer',
    company: 'Dan Palmer Services',
    companyLogo: '/images/testimonials/dan-palmer.jpg',
    logoBg: '#fff',
  },
  {
    quote:
      'Really easy to use and keeps everything in one place. The calculation and circuit design features are a big help when pricing jobs on site.',
    name: 'Nathan Perry',
    company: 'NP Electrical Services',
    companyLogo: '/images/testimonials/np-electrical.png',
    logoBg: '#3f3f46',
  },
];

/* ── Screenshots — App Store versions (black bg + headlines baked in) ── */
const solutionScreenshots: ScreenshotItem[] = [
  { src: '/images/walkthrough/appstore-certs.png', alt: 'Certificates', caption: '' },
  { src: '/images/walkthrough/appstore-quotes.png', alt: 'Quoting', caption: '' },
  { src: '/images/walkthrough/appstore-rams.png', alt: 'RAMS', caption: '' },
  { src: '/images/walkthrough/appstore-ai.png', alt: 'AI', caption: '' },
  { src: '/images/walkthrough/appstore-designer.png', alt: 'Designer', caption: '' },
  { src: '/images/walkthrough/appstore-calculators.png', alt: 'Calculators', caption: '' },
  { src: '/images/walkthrough/appstore-study.png', alt: 'Study', caption: '' },
];

/* ── Per-slide CTA button text ── */
const ctaTexts = [
  "See What's Inside",
  'See What Others Say',
  'Start Free Trial',
  "Get Started — It's Free",
];

/* ── Slides ── */
const slides = [
  {
    icon: Zap,
    title: null,
    titleWords: [] as string[],
    accentWord: '',
    description: '',
    accentColour: '#FACC15',
    variant: 'hero-pain' as const,
    badgeText: '',
    heroImage: '/images/walkthrough/appstore-dashboard.png',
  },
  {
    icon: Zap,
    title: null,
    titleWords: [] as string[],
    accentWord: '',
    description: '',
    accentColour: '#FACC15',
    variant: 'solution-demo' as const,
    screenshots: solutionScreenshots,
  },
  {
    icon: ShieldCheck,
    title: null,
    titleWords: ['Trusted', 'by', 'UK', 'Electricians'],
    accentWord: 'Electricians',
    description: '',
    accentColour: '#FACC15',
    variant: 'proof' as const,
    testimonials,
  },
  {
    icon: Sparkles,
    title: null,
    titleWords: ['Try', 'Everything', 'Free', 'for', '7', 'Days'],
    accentWord: '7 Days',
    description: '',
    accentColour: '#FACC15',
    variant: 'cta-final' as const,
    subtitle: 'No commitment. Cancel anytime.',
    checkmarks: [
      'All features unlocked',
      'Cancel anytime from your account',
      'Takes 30 seconds to sign up',
      "Card won't be charged for 7 days",
    ],
  },
];

/* ── Ambient orb component ── */
const AmbientOrb = ({
  colour,
  size,
  top,
  left,
  delay,
  duration,
}: {
  colour: string;
  size: number;
  top: string;
  left: string;
  delay: number;
  duration: number;
}) => (
  <motion.div
    className="absolute rounded-full pointer-events-none"
    style={{
      backgroundColor: colour,
      width: size,
      height: size,
      top,
      left,
      filter: 'blur(120px)',
      transform: 'translate(-50%, -50%)',
    }}
    animate={{
      scale: [1, 1.15, 1],
      opacity: [0.04, 0.08, 0.04],
    }}
    transition={{
      duration,
      repeat: Infinity,
      ease: 'easeInOut',
      delay,
    }}
  />
);

const Walkthrough = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [direction, setDirection] = useState(1);
  const [isMobile, setIsMobile] = useState(true);
  const [isPaused, setIsPaused] = useState(false);
  const [elapsed, setElapsed] = useState(0);
  const [hasInteracted, setHasInteracted] = useState(false);
  const lastTimeRef = useRef(Date.now());
  const navigate = useNavigate();
  const isLastSlide = currentSlide === slides.length - 1;
  const { tap } = useHaptics();

  useEffect(() => {
    setIsMobile(window.innerWidth < 768);
  }, []);

  // Preload all walkthrough images so they're cached before the user reaches them
  useEffect(() => {
    const urls = [
      slides[0].heroImage,
      ...solutionScreenshots.map((s) => s.src),
      ...testimonials.map((t) => t.companyLogo),
      '/images/walkthrough/appstore-dashboard.png',
    ].filter(Boolean) as string[];

    urls.forEach((url) => {
      const img = new Image();
      img.src = url;
    });
  }, []);

  // Reset progress when slide changes
  useEffect(() => {
    setElapsed(0);
    lastTimeRef.current = Date.now();
  }, [currentSlide]);

  // Auto-advance timer using requestAnimationFrame
  useEffect(() => {
    if (isPaused || isLastSlide) return;

    let raf: number;
    const tick = () => {
      const now = Date.now();
      const delta = now - lastTimeRef.current;
      lastTimeRef.current = now;

      const dur = SLIDE_DURATIONS[currentSlide] ?? SLIDE_DURATION_DEFAULT;
      setElapsed((prev) => {
        const next = prev + delta;
        if (next >= dur) return dur;
        return next;
      });

      raf = requestAnimationFrame(tick);
    };

    lastTimeRef.current = Date.now();
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [isPaused, currentSlide, isLastSlide]);

  // Auto-advance when timer fills — reset elapsed FIRST to prevent skip
  useEffect(() => {
    const dur = SLIDE_DURATIONS[currentSlide] ?? SLIDE_DURATION_DEFAULT;
    if (elapsed >= dur && currentSlide < slides.length - 1) {
      setElapsed(0);
      lastTimeRef.current = Date.now();
      setDirection(1);
      setCurrentSlide((prev) => prev + 1);
      tap();
    }
  }, [elapsed, currentSlide, tap]);

  const slideDur = SLIDE_DURATIONS[currentSlide] ?? SLIDE_DURATION_DEFAULT;
  const progress = Math.min(elapsed / slideDur, 1);

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

  const goNext = useCallback(() => {
    if (currentSlide < slides.length - 1) {
      setDirection(1);
      setCurrentSlide((prev) => prev + 1);
      setHasInteracted(true);
      tap();
    }
  }, [currentSlide, tap]);

  const goPrev = useCallback(() => {
    if (currentSlide > 0) {
      setDirection(-1);
      setCurrentSlide((prev) => prev - 1);
      setHasInteracted(true);
      tap();
    }
  }, [currentSlide, tap]);

  const goToSlide = useCallback(
    (i: number) => {
      setDirection(i > currentSlide ? 1 : -1);
      setCurrentSlide(i);
      setHasInteracted(true);
      tap();
    },
    [currentSlide, tap]
  );

  const swipeHandlers = useSwipeable({
    onSwipedLeft: goNext,
    onSwipedRight: goPrev,
    trackMouse: false,
    preventScrollOnSwipe: true,
  });

  return (
    <div
      className="min-h-[100svh] flex flex-col relative overflow-hidden"
      style={{
        backgroundColor: '#000000',
        paddingTop: 'env(safe-area-inset-top, 0px)',
        paddingBottom: 'env(safe-area-inset-bottom, 0px)',
      }}
      onTouchStart={() => setIsPaused(true)}
      onTouchEnd={() => setIsPaused(false)}
      onMouseDown={() => setIsPaused(true)}
      onMouseUp={() => setIsPaused(false)}
    >
      {/* ── Subtle outer-edge accent glow ── */}
      <div className="absolute inset-0 pointer-events-none">
        <AmbientOrb
          colour="#FACC15"
          size={isMobile ? 180 : 250}
          top="0%"
          left="0%"
          delay={0}
          duration={6}
        />
        <AmbientOrb
          colour="#FACC15"
          size={isMobile ? 160 : 220}
          top="90%"
          left="95%"
          delay={3}
          duration={8}
        />
      </div>

      {/* ── Top bar: logo + stories progress ── */}
      <div className="relative z-10 px-5 pt-3">
        {/* Elec-Mate wordmark */}
        <div className="flex items-center justify-center mb-3">
          <span className="text-[15px] font-bold tracking-tight">
            <span className="text-[#FACC15]">Elec-</span>
            <span className="text-white">Mate</span>
          </span>
        </div>

        {/* Stories-style progress bars */}
        <div className="flex gap-1.5">
          {slides.map((_, i) => (
            <button
              key={i}
              onClick={() => goToSlide(i)}
              className="flex-1 h-[3px] rounded-full bg-white/15 overflow-hidden touch-manipulation"
              aria-label={`Go to slide ${i + 1}`}
            >
              <div
                className="h-full rounded-full"
                style={{
                  backgroundColor: '#FACC15',
                  width:
                    i < currentSlide ? '100%' : i === currentSlide ? `${progress * 100}%` : '0%',
                  transition: isPaused ? 'none' : undefined,
                }}
              />
            </button>
          ))}
        </div>
      </div>

      {/* Slide content */}
      <div
        {...swipeHandlers}
        className="flex-1 flex items-center justify-center touch-manipulation overflow-hidden relative z-10"
      >
        <AnimatePresence mode="wait" custom={direction}>
          <WalkthroughSlide key={currentSlide} {...slides[currentSlide]} direction={direction} />
        </AnimatePresence>

        {/* ── Swipe hint — slide 1 only, fades after interaction ── */}
        {currentSlide === 0 && !hasInteracted && (
          <motion.div
            className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-1.5 pointer-events-none"
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 0.5, 0] }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: 'easeInOut',
              delay: 2,
            }}
          >
            <ChevronLeft className="w-4 h-4 text-white" />
            <span className="text-white text-xs font-medium">Swipe to explore</span>
          </motion.div>
        )}
      </div>

      {/* ── Bottom bar — persistent every slide ── */}
      <div className="px-6 pb-6 flex-shrink-0 relative z-10">
        {/* CTA — slides 0-1 advance, slides 2-3 navigate to signup */}
        <motion.div whileTap={{ scale: 0.97 }} className="relative">
          {/* Pulsing glow on final slide */}
          {isLastSlide && (
            <motion.div
              className="absolute -inset-1 rounded-2xl pointer-events-none"
              style={{ backgroundColor: '#FACC15' }}
              animate={{ opacity: [0.15, 0.35, 0.15] }}
              transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
            />
          )}
          <Button
            onClick={currentSlide <= 1 ? goNext : handleGetStarted}
            className="relative w-full h-[56px] text-[16px] font-bold bg-elec-yellow hover:bg-elec-yellow/90 text-black rounded-2xl shadow-[0_4px_24px_rgba(250,204,21,0.3)] touch-manipulation transition-shadow hover:shadow-[0_4px_32px_rgba(250,204,21,0.4)]"
          >
            {ctaTexts[currentSlide]}
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </motion.div>

        {/* Secondary links */}
        <div className="flex items-center justify-between mt-2">
          <button
            onClick={handleLogIn}
            className="text-[13px] text-white font-medium py-2 px-1 touch-manipulation min-h-[44px] flex items-center"
          >
            I have an account
          </button>
          {!isLastSlide && (
            <button
              onClick={goNext}
              className="text-[13px] text-white font-medium py-2 px-1 touch-manipulation min-h-[44px] flex items-center gap-1"
            >
              Next
              <ArrowRight className="h-3.5 w-3.5" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Walkthrough;
