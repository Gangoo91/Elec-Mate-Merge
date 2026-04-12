import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { type LucideIcon, CircleCheck, Star } from 'lucide-react';

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

const slideVariants = {
  enter: { opacity: 0 },
  center: { opacity: 1 },
  exit: { opacity: 0 },
};

const slideTransition = {
  opacity: { duration: 0.16 },
};

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
      {words.map((word, index) => {
        const isAccent = accentWords.includes(word);
        return (
          <motion.span
            key={`${word}-${index}`}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.28, delay: 0.05 * index, ease: [0.25, 0.1, 0.25, 1] }}
            className="mr-[0.26em] inline-block"
            style={isAccent ? { color: accentColour } : undefined}
          >
            {word}
          </motion.span>
        );
      })}
    </motion.h2>
  );
};

const FeatureShowcase = ({
  screenshots,
  accentColour,
}: {
  screenshots: ScreenshotItem[];
  accentColour: string;
}) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const active = screenshots[activeIndex];

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % screenshots.length);
    }, 2600);
    return () => clearInterval(interval);
  }, [screenshots.length]);

  return (
    <div className="w-full">
      <div className="mx-auto max-w-[302px]">
        <AnimatePresence mode="wait" initial={false}>
          <motion.img
            key={active.src}
            src={active.src}
            alt={active.alt}
            initial={{ opacity: 0, scale: 1.01 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
            className="w-full rounded-[2rem]"
            loading="eager"
          />
        </AnimatePresence>
      </div>

      <div className="mt-3 text-center">
        <div className="text-[11px] font-semibold uppercase tracking-[0.16em]" style={{ color: accentColour }}>
          {active.caption}
        </div>
      </div>

      <div className="mx-auto mt-3 flex justify-center gap-1.5">
        {screenshots.map((item, index) => {
          const isActive = item.src === active.src;
          return (
            <button
              key={item.src}
              onClick={() => setActiveIndex(index)}
              className="p-1 touch-manipulation"
              aria-label={`Show ${item.caption}`}
            >
              <div
                className="rounded-full transition-all duration-300"
                style={{
                  width: isActive ? 16 : 5,
                  height: 5,
                  backgroundColor: isActive ? accentColour : 'rgba(255,255,255,0.2)',
                }}
              />
            </button>
          );
        })}
      </div>
    </div>
  );
};

const TestimonialShowcase = ({
  testimonials,
  accentColour,
}: {
  testimonials: TestimonialData[];
  accentColour: string;
}) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const active = testimonials[activeIndex];

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % testimonials.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [testimonials.length]);

  return (
    <div className="mx-auto w-full max-w-sm">
      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={`${active.name}-${active.company}`}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.35 }}
          className="rounded-xl border border-white/[0.08] bg-white/[0.05] p-4 text-left"
        >
          <div className="mb-2 flex items-center gap-2.5">
            <div
              className="h-9 w-9 flex-shrink-0 overflow-hidden rounded-lg"
              style={{ backgroundColor: active.logoBg || '#fff' }}
            >
              <img src={active.companyLogo} alt={active.company} className="h-full w-full object-contain" />
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-[13px] font-bold leading-tight text-white">{active.name}</p>
              <p className="text-[12px] font-medium" style={{ color: accentColour }}>
                {active.company}
              </p>
            </div>
            <div className="flex flex-shrink-0 gap-px">
              {Array.from({ length: 5 }).map((_, starIndex) => (
                <Star key={starIndex} className="h-3 w-3 fill-yellow-400 text-yellow-400" />
              ))}
            </div>
          </div>
          <p className="text-[12px] leading-[1.55] text-white">&ldquo;{active.quote}&rdquo;</p>
        </motion.div>
      </AnimatePresence>

      <div className="mt-3 flex justify-center gap-1.5">
        {testimonials.map((testimonial, index) => {
          const isActive = testimonial.name === active.name;
          return (
            <button
              key={testimonial.name}
              onClick={() => setActiveIndex(index)}
              className="p-1 touch-manipulation"
              aria-label={`Show testimonial from ${testimonial.name}`}
            >
              <div
                className="rounded-full transition-all duration-300"
                style={{
                  width: isActive ? 16 : 5,
                  height: 5,
                  backgroundColor: isActive ? accentColour : 'rgba(255,255,255,0.2)',
                }}
              />
            </button>
          );
        })}
      </div>
    </div>
  );
};

const WalkthroughSlide = ({
  titleWords,
  accentWord,
  description,
  accentColour,
  variant,
  subtitle,
  badgeText,
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
      className="flex w-full flex-col items-center overflow-hidden text-center"
    >
      {variant === 'hero-pain' && (
        <div className="w-full px-6">
          {badgeText && (
            <div className="mx-auto inline-flex items-center rounded-full border border-yellow-400/20 bg-yellow-400/8 px-4 py-2 text-[10px] font-semibold uppercase tracking-[0.2em] text-yellow-300">
              {badgeText}
            </div>
          )}

          <WordRevealHeadline
            words={titleWords}
            accentWord={accentWord}
            accentColour={accentColour}
            className="mx-auto mt-4 max-w-[10ch] text-[32px] font-extrabold leading-[1.02] tracking-tight text-white"
          />

          {description && (
            <p className="mx-auto mt-3 max-w-[312px] text-[13px] leading-6 text-white/72">{description}</p>
          )}

          {heroImage && (
            <motion.div
              initial={{ opacity: 0, y: 28 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ type: 'spring', stiffness: 90, damping: 16, delay: 0.12 }}
              className="mx-auto mt-5 w-full max-w-[270px]"
            >
              <img src={heroImage} alt="Elec-Mate platform preview" className="w-full" loading="eager" />
            </motion.div>
          )}

          {checkmarks && (
            <div className="mx-auto mt-4 flex max-w-sm flex-wrap justify-center gap-2">
              {checkmarks.map((item, index) => (
                <motion.div
                  key={item}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.12 + index * 0.06 }}
                  className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-2 text-[11px] font-medium text-white/86"
                >
                  {item}
                </motion.div>
              ))}
            </div>
          )}
        </div>
      )}

      {variant === 'solution-demo' && (
        <div className="w-full px-6">
          <WordRevealHeadline
            words={titleWords}
            accentWord={accentWord}
            accentColour={accentColour}
            className="mx-auto max-w-[11ch] text-[29px] font-extrabold leading-[1.08] tracking-tight text-white"
          />
          {description && (
            <p className="mx-auto mt-3 max-w-[312px] text-[13px] leading-6 text-white/72">{description}</p>
          )}

          {screenshots && <div className="mt-5"><FeatureShowcase screenshots={screenshots} accentColour={accentColour} /></div>}
        </div>
      )}

      {variant === 'proof' && (
        <div className="w-full px-5">
          <WordRevealHeadline
            words={titleWords}
            accentWord={accentWord}
            accentColour={accentColour}
            className="mx-auto max-w-[10ch] text-[31px] font-extrabold leading-[1.08] tracking-tight text-white"
          />
          {description && (
            <p className="mx-auto mt-3 max-w-[312px] text-[13px] leading-6 text-white/72">{description}</p>
          )}

          {testimonials && <div className="mt-5"><TestimonialShowcase testimonials={testimonials} accentColour={accentColour} /></div>}
        </div>
      )}

      {variant === 'cta-final' && (
        <div className="relative flex w-full flex-col items-center px-8">
          <div className="pointer-events-none absolute inset-0 flex items-center justify-center opacity-[0.06]">
            <img
              src="/images/walkthrough/appstore-dashboard.png"
              alt=""
              className="w-full max-w-[400px]"
            />
          </div>

          <div className="relative z-10 flex w-full flex-col items-center">
            <WordRevealHeadline
              words={titleWords}
              accentWord={accentWord}
              accentColour={accentColour}
              className="mx-auto max-w-[10ch] text-[29px] font-extrabold leading-[1.1] tracking-tight text-white"
            />
            {subtitle && (
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.28, delay: 0.24 }}
                className="mt-3 max-w-[290px] text-[14px] leading-6 text-white/78"
              >
                {subtitle}
              </motion.p>
            )}

            {checkmarks && (
              <div className="mt-6 w-full max-w-xs space-y-3">
                {checkmarks.map((item, index) => (
                  <motion.div
                    key={item}
                    initial={{ opacity: 0, x: -16 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ type: 'spring', stiffness: 120, damping: 15, delay: 0.08 * index }}
                    className="flex items-start gap-3.5 text-left"
                  >
                    <div
                      className="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full"
                      style={{ backgroundColor: accentColour }}
                    >
                      <CircleCheck className="h-3.5 w-3.5 text-black" />
                    </div>
                    <span className="text-[14px] font-medium text-white">{item}</span>
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
