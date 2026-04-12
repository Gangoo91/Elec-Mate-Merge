import { useState, useCallback, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSwipeable } from 'react-swipeable';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowRight, ChevronLeft, ShieldCheck, Sparkles, Zap } from 'lucide-react';

import { Button } from '@/components/ui/button';
import WalkthroughSlide from '@/components/onboarding/WalkthroughSlide';
import type { ScreenshotItem, TestimonialData } from '@/components/onboarding/WalkthroughSlide';
import { useHaptic } from '@/hooks/useHaptic';
import { storageSetSync } from '@/utils/storage';

const WALKTHROUGH_KEY = 'walkthrough_completed';
const SLIDE_DURATION_DEFAULT = 6000;
const SLIDE_DURATIONS = [7000, 12000, 6500, 7000];

const testimonials: TestimonialData[] = [
  {
    quote: 'It saves time, takes the hassle out of calculations and checks, and makes day-to-day work smoother.',
    name: 'Cole Humphreys',
    company: 'Corevolt Electrical',
    companyLogo: '/images/testimonials/corevolt.jpg',
    logoBg: '#fff',
  },
  {
    quote: 'It has replaced multiple apps for us and the circuit designer has already helped us win more work.',
    name: 'Dan Palmer',
    company: 'Dan Palmer Services',
    companyLogo: '/images/testimonials/dan-palmer.jpg',
    logoBg: '#fff',
  },
  {
    quote: 'Quoting, invoicing and managing jobs all feel easier because everything lives in the same place.',
    name: 'Nathan Perry',
    company: 'NP Electrical Services',
    companyLogo: '/images/testimonials/np-electrical.png',
    logoBg: '#3f3f46',
  },
];

const heroProof = ['Quotes to certs', 'Training to tools', 'Web, iPhone and Android'];

const solutionScreenshots: ScreenshotItem[] = [
  { src: '/images/walkthrough/appstore-dashboard.png', alt: 'Dashboard', caption: 'Platform Home' },
  { src: '/images/walkthrough/appstore-certs.png', alt: 'Certificates', caption: 'Certificates' },
  { src: '/images/walkthrough/appstore-quotes.png', alt: 'Quotes', caption: 'Quotes & Invoices' },
  { src: '/images/walkthrough/appstore-rams.png', alt: 'RAMS', caption: 'RAMS' },
  { src: '/images/walkthrough/appstore-designer.png', alt: 'Designer', caption: 'Designer' },
  { src: '/images/walkthrough/appstore-calculators.png', alt: 'Calculators', caption: 'Calculators' },
  { src: '/images/walkthrough/appstore-study.png', alt: 'Study', caption: 'Study Centre' },
  { src: '/images/walkthrough/appstore-ai.png', alt: 'Elec-AI', caption: 'Elec-AI' },
];

const ctaTexts = ['See What It Covers', 'Why People Switch', 'Continue', 'Go To Landing Page'];

const slides = [
  {
    icon: Zap,
    title: null,
    titleWords: ['One', 'Platform', 'for', 'the', 'Trade'],
    accentWord: 'Platform',
    description:
      'Commercial workflows, compliance, study and specialist tools in one connected system for UK electricians.',
    accentColour: '#FACC15',
    variant: 'hero-pain' as const,
    badgeText: 'The first look at Elec-Mate',
    heroImage: '/images/walkthrough/appstore-dashboard.png',
    checkmarks: heroProof,
  },
  {
    icon: Zap,
    title: null,
    titleWords: ['Run', 'the', 'Job', 'Without', 'the', 'Tool', 'Chaos'],
    accentWord: 'Without',
    description:
      'See the core platform first, then the specialist tools that make it feel deeper once you are in.',
    accentColour: '#FACC15',
    variant: 'solution-demo' as const,
    screenshots: solutionScreenshots,
  },
  {
    icon: ShieldCheck,
    title: null,
    titleWords: ['Trusted', 'by', 'UK', 'Electricians'],
    accentWord: 'Electricians',
    description:
      'People stay because the platform saves time, sharpens output and removes friction from the week.',
    accentColour: '#FACC15',
    variant: 'proof' as const,
    testimonials,
  },
  {
    icon: Sparkles,
    title: null,
    titleWords: ['Start', 'Free', 'and', 'Feel', 'the', 'Difference'],
    accentWord: 'Free',
    description: '',
    accentColour: '#FACC15',
    variant: 'cta-final' as const,
    subtitle: 'No charge for 7 days. Cancel in a couple of clicks if it is not right for you.',
    checkmarks: [
      'Every feature unlocked from day one',
      'You will not be charged for 7 days',
      'Simple signup and role-based setup',
      'Go from walkthrough to platform to trial in minutes',
    ],
  },
];

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
    animate={{ scale: [1, 1.12, 1], opacity: [0.04, 0.08, 0.04] }}
    transition={{ duration, repeat: Infinity, ease: 'easeInOut', delay }}
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
  const { light } = useHaptic();

  useEffect(() => {
    setIsMobile(window.innerWidth < 768);
  }, []);

  useEffect(() => {
    const urls = [
      '/images/walkthrough/appstore-dashboard.png',
      ...solutionScreenshots.map((s) => s.src),
      ...testimonials.map((t) => t.companyLogo),
    ];

    urls.forEach((url) => {
      const img = new Image();
      img.src = url;
    });
  }, []);

  useEffect(() => {
    setElapsed(0);
    lastTimeRef.current = Date.now();
  }, [currentSlide]);

  useEffect(() => {
    if (isPaused || isLastSlide) return;

    let raf: number;
    const tick = () => {
      const now = Date.now();
      const delta = now - lastTimeRef.current;
      lastTimeRef.current = now;

      const duration = SLIDE_DURATIONS[currentSlide] ?? SLIDE_DURATION_DEFAULT;
      setElapsed((prev) => {
        const next = prev + delta;
        return next >= duration ? duration : next;
      });

      raf = requestAnimationFrame(tick);
    };

    lastTimeRef.current = Date.now();
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [currentSlide, isLastSlide, isPaused]);

  useEffect(() => {
    const duration = SLIDE_DURATIONS[currentSlide] ?? SLIDE_DURATION_DEFAULT;
    if (elapsed >= duration && currentSlide < slides.length - 1) {
      setElapsed(0);
      lastTimeRef.current = Date.now();
      setDirection(1);
      setCurrentSlide((prev) => prev + 1);
      light();
    }
  }, [currentSlide, elapsed, light]);

  const slideDuration = SLIDE_DURATIONS[currentSlide] ?? SLIDE_DURATION_DEFAULT;
  const progress = Math.min(elapsed / slideDuration, 1);

  const completeWalkthrough = useCallback(() => {
    storageSetSync(WALKTHROUGH_KEY, 'true');
  }, []);

  const handleContinue = useCallback(() => {
    completeWalkthrough();
    navigate('/');
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
      light();
    }
  }, [currentSlide, light]);

  const goPrev = useCallback(() => {
    if (currentSlide > 0) {
      setDirection(-1);
      setCurrentSlide((prev) => prev - 1);
      setHasInteracted(true);
      light();
    }
  }, [currentSlide, light]);

  const goToSlide = useCallback(
    (index: number) => {
      setDirection(index > currentSlide ? 1 : -1);
      setCurrentSlide(index);
      setHasInteracted(true);
      light();
    },
    [currentSlide, light]
  );

  const swipeHandlers = useSwipeable({
    onSwipedLeft: goNext,
    onSwipedRight: goPrev,
    trackMouse: false,
    preventScrollOnSwipe: true,
  });

  return (
    <div
      className="relative flex min-h-[100svh] flex-col overflow-hidden bg-black"
      style={{
        paddingTop: 'env(safe-area-inset-top, 0px)',
        paddingBottom: 'env(safe-area-inset-bottom, 0px)',
      }}
      onTouchStart={() => setIsPaused(true)}
      onTouchEnd={() => setIsPaused(false)}
      onMouseDown={() => setIsPaused(true)}
      onMouseUp={() => setIsPaused(false)}
    >
      <div className="absolute inset-0 pointer-events-none">
        <AmbientOrb colour="#FACC15" size={isMobile ? 180 : 260} top="0%" left="0%" delay={0} duration={6} />
        <AmbientOrb colour="#FACC15" size={isMobile ? 180 : 240} top="92%" left="95%" delay={3} duration={8} />
      </div>

      <div className="relative z-10 px-5 pt-3">
        <div className="mb-3 flex items-center justify-center">
          <span className="text-[15px] font-bold tracking-tight">
            <span className="text-[#FACC15]">Elec-</span>
            <span className="text-white">Mate</span>
          </span>
        </div>

        <div className="flex gap-1.5">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className="h-[3px] flex-1 overflow-hidden rounded-full bg-white/15 touch-manipulation"
              aria-label={`Go to slide ${index + 1}`}
            >
              <div
                className="h-full rounded-full bg-[#FACC15]"
                style={{
                  width:
                    index < currentSlide
                      ? '100%'
                      : index === currentSlide
                        ? `${progress * 100}%`
                        : '0%',
                  transition: isPaused ? 'none' : undefined,
                }}
              />
            </button>
          ))}
        </div>
      </div>

      <div
        {...swipeHandlers}
        className="relative z-10 flex flex-1 items-center justify-center overflow-hidden px-1 pt-2 touch-manipulation"
      >
        <AnimatePresence mode="wait" custom={direction}>
          <WalkthroughSlide key={currentSlide} {...slides[currentSlide]} direction={direction} />
        </AnimatePresence>

        {currentSlide === 0 && !hasInteracted && (
          <motion.div
            className="pointer-events-none absolute bottom-4 left-1/2 flex -translate-x-1/2 items-center gap-1.5"
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 0.5, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
          >
            <ChevronLeft className="h-4 w-4 text-white" />
            <span className="text-xs font-medium text-white">Swipe to explore</span>
          </motion.div>
        )}
      </div>

      <div className="relative z-10 flex-shrink-0 px-6 pb-5">
        <motion.div whileTap={{ scale: 0.98 }} className="relative">
          {isLastSlide && (
            <motion.div
              className="absolute -inset-1 rounded-2xl bg-[#FACC15] pointer-events-none"
              animate={{ opacity: [0.15, 0.32, 0.15] }}
              transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
            />
          )}

          <Button
            onClick={currentSlide < slides.length - 1 ? goNext : handleContinue}
            className="relative h-[56px] w-full rounded-2xl bg-elec-yellow text-[16px] font-bold text-black shadow-[0_4px_24px_rgba(250,204,21,0.3)] transition-shadow hover:bg-elec-yellow/90 hover:shadow-[0_4px_32px_rgba(250,204,21,0.4)]"
          >
            {ctaTexts[currentSlide]}
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </motion.div>

        <div className="mt-2 flex items-center justify-between">
          <button
            onClick={handleLogIn}
            className="min-h-[44px] px-1 py-2 text-[13px] font-medium text-white touch-manipulation"
          >
            I have an account
          </button>
          {!isLastSlide && (
            <button
              onClick={goNext}
              className="flex min-h-[44px] items-center gap-1 px-1 py-2 text-[13px] font-medium text-white touch-manipulation"
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
