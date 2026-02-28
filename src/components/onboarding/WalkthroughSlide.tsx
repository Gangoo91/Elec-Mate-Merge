import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { type LucideIcon, Star } from 'lucide-react';

export interface ScreenshotItem {
  src: string;
  alt: string;
  caption: string;
}

export interface TestimonialData {
  quote: string;
  name: string;
  company: string;
  companyLogo: string;
  logoBg?: string;
}

type SlideVariant = 'hero-pain' | 'solution-demo' | 'proof' | 'cta-final';

interface WalkthroughSlideProps {
  icon: LucideIcon;
  title: React.ReactNode;
  titleWords: string[];
  accentWord: string;
  description: string;
  accentColour: string;
  variant: SlideVariant;
  subtitle?: string;
  badgeText?: string;
  heroImage?: string;
  screenshots?: ScreenshotItem[];
  testimonials?: TestimonialData[];
  checkmarks?: string[];
  direction?: number;
}

/* ── mask-image style for screenshot bottom-fade ── */
const maskFadeStyle: React.CSSProperties = {
  maskImage: 'linear-gradient(to bottom, black 0%, black 90%, transparent 100%)',
  WebkitMaskImage: 'linear-gradient(to bottom, black 0%, black 90%, transparent 100%)',
};

/* ── Fast crossfade variants — no lag ── */
const slideVariants = {
  enter: () => ({
    opacity: 0,
  }),
  center: {
    opacity: 1,
  },
  exit: () => ({
    opacity: 0,
  }),
};

const slideTransition = {
  opacity: { duration: 0.15 },
};

/* ── Word-by-word headline component ── */
const WordRevealHeadline = ({
  words,
  accentWord,
  accentColour,
  className,
}: {
  words: string[];
  accentWord: string;
  accentColour: string;
  className?: string;
}) => {
  if (!words.length) return null;
  const accentWords = accentWord.split(' ');
  return (
    <motion.h2 className={className}>
      {words.map((word, i) => {
        const isAccent = accentWords.includes(word);
        return (
          <motion.span
            key={`${word}-${i}`}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.3,
              delay: 0.06 * i,
              ease: [0.25, 0.1, 0.25, 1],
            }}
            className="inline-block mr-[0.3em]"
            style={isAccent ? { color: accentColour } : undefined}
          >
            {word}
          </motion.span>
        );
      })}
    </motion.h2>
  );
};

/* ── Auto-cycling feature showcase — smooth crossfade dissolve ── */
const FeatureShowcase = ({
  screenshots,
  accentColour,
}: {
  screenshots: ScreenshotItem[];
  accentColour: string;
}) => {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % screenshots.length);
    }, 2500);
    return () => clearInterval(interval);
  }, [screenshots.length]);

  return (
    <div className="flex flex-col items-center w-full">
      {/* Overlapping crossfade — both images present during transition */}
      <div className="relative w-full max-w-[320px]" style={{ aspectRatio: '1284/2778' }}>
        <AnimatePresence initial={false}>
          <motion.img
            key={activeIndex}
            src={screenshots[activeIndex].src}
            alt={screenshots[activeIndex].alt}
            initial={{ opacity: 0, scale: 1.02 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
            className="absolute inset-0 w-full h-full object-contain"
            loading="eager"
          />
        </AnimatePresence>
      </div>

      {/* Mini dot indicators for features */}
      <div className="flex gap-1 mt-3">
        {screenshots.map((_, i) => (
          <button key={i} onClick={() => setActiveIndex(i)} className="touch-manipulation p-1">
            <div
              className="rounded-full transition-all duration-300"
              style={{
                width: i === activeIndex ? 16 : 4,
                height: 4,
                backgroundColor: i === activeIndex ? accentColour : 'rgba(255,255,255,0.2)',
              }}
            />
          </button>
        ))}
      </div>
    </div>
  );
};

const WalkthroughSlide = ({
  title: _title,
  titleWords,
  accentWord,
  description,
  accentColour,
  variant,
  subtitle,
  heroImage,
  screenshots,
  testimonials,
  checkmarks,
  direction = 1,
}: WalkthroughSlideProps) => {
  return (
    <motion.div
      custom={direction}
      variants={slideVariants}
      initial="enter"
      animate="center"
      exit="exit"
      transition={slideTransition}
      className="flex flex-col items-center text-center w-full overflow-hidden"
    >
      {/* ─── SLIDE 1: HERO — full App Store image ─── */}
      {variant === 'hero-pain' && (
        <div className="flex flex-col items-center w-full px-6">
          {heroImage && (
            <motion.div
              initial={{ opacity: 0, y: 60 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                type: 'spring',
                stiffness: 80,
                damping: 15,
                delay: 0.1,
              }}
              className="relative w-full max-w-[320px]"
            >
              <img
                src={heroImage}
                alt="Elec-Mate app"
                className="relative w-full h-auto"
                style={maskFadeStyle}
                loading="eager"
              />
            </motion.div>
          )}
        </div>
      )}

      {/* ─── SLIDE 2: SOLUTION — auto-cycling single feature showcase ─── */}
      {variant === 'solution-demo' && (
        <div className="flex flex-col items-center w-full px-6">
          {/* Headline */}
          {titleWords.length > 0 && (
            <div className="mb-6">
              <WordRevealHeadline
                words={titleWords}
                accentWord={accentWord}
                accentColour={accentColour}
                className="text-[28px] leading-[1.15] font-extrabold text-white tracking-tight"
              />
            </div>
          )}

          {/* Auto-cycling feature showcase — no swipe conflict */}
          {screenshots && <FeatureShowcase screenshots={screenshots} accentColour={accentColour} />}
        </div>
      )}

      {/* ─── SLIDE 3: SOCIAL PROOF ─── */}
      {variant === 'proof' && (
        <div className="flex flex-col items-center w-full px-5">
          <WordRevealHeadline
            words={titleWords}
            accentWord={accentWord}
            accentColour={accentColour}
            className="text-[32px] leading-[1.1] font-extrabold text-white mb-6 tracking-tight"
          />

          {testimonials && (
            <div className="w-full max-w-sm space-y-2.5">
              {testimonials.map((t, i) => (
                <motion.div
                  key={t.name}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.25, delay: 0.08 * i }}
                  className="w-full rounded-xl bg-white/[0.05] border border-white/[0.08] p-4 text-left"
                >
                  <div className="flex items-center gap-2.5 mb-2">
                    <div
                      className="w-9 h-9 rounded-lg overflow-hidden flex-shrink-0"
                      style={{ backgroundColor: t.logoBg || '#fff' }}
                    >
                      <img
                        src={t.companyLogo}
                        alt={t.company}
                        className="w-full h-full object-contain"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-white text-[13px] font-bold leading-tight">{t.name}</p>
                      <p className="text-[12px] font-medium" style={{ color: accentColour }}>
                        {t.company}
                      </p>
                    </div>
                    <div className="flex gap-px flex-shrink-0">
                      {Array.from({ length: 5 }).map((_, j) => (
                        <Star key={j} className="w-3 h-3 text-yellow-400 fill-yellow-400" />
                      ))}
                    </div>
                  </div>
                  <p className="text-white text-[12px] leading-[1.5]">&ldquo;{t.quote}&rdquo;</p>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* ─── SLIDE 4: CTA FINAL ─── */}
      {variant === 'cta-final' && (
        <div className="flex flex-col items-center px-8 w-full relative">
          {/* Faded background screenshot for visual depth */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-[0.06]">
            <img
              src="/images/walkthrough/appstore-dashboard.png"
              alt=""
              className="w-full max-w-[400px] h-auto"
              style={maskFadeStyle}
            />
          </div>

          <div className="relative z-10 flex flex-col items-center w-full">
            <WordRevealHeadline
              words={titleWords}
              accentWord={accentWord}
              accentColour={accentColour}
              className="text-[28px] leading-[1.15] font-extrabold text-white mb-2 tracking-tight"
            />
            {subtitle && (
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3, delay: 0.3 }}
                className="text-white text-[15px] mb-8 max-w-[280px] leading-relaxed"
              >
                {subtitle}
              </motion.p>
            )}

            {checkmarks && (
              <div className="space-y-4 w-full max-w-xs">
                {checkmarks.map((item, i) => (
                  <motion.div
                    key={item}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{
                      type: 'spring',
                      stiffness: 120,
                      damping: 15,
                      delay: 0.08 * i,
                    }}
                    className="flex items-center gap-3.5 text-left"
                  >
                    <div
                      className="w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0"
                      style={{ backgroundColor: accentColour }}
                    >
                      <svg
                        className="w-3.5 h-3.5 text-black"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={3}
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <span className="text-[15px] text-white font-medium">{item}</span>
                  </motion.div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </motion.div>
  );
};

export default WalkthroughSlide;
