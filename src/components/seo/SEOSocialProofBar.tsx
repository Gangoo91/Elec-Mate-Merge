import { useState, useEffect } from 'react';
import { USER_COUNT, MINI_TESTIMONIALS } from '@/constants/social-proof';
import { PANEL } from '@/components/seo/seoSurface';

/**
 * Social proof strip — sits below hero, rotates mini testimonials.
 * Builds trust early before the reader scrolls into content.
 *
 * Design: the figure carries the proof, so it's set as a figure — no avatar
 * circle, no star glyphs. The rating is stated in words, which is also what
 * an answer engine can quote. Rotation pauses for anyone who has asked for
 * reduced motion; a strip that swaps text under you is exactly what that
 * preference is for.
 */
export function SEOSocialProofBar() {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    if (window.matchMedia?.('(prefers-reduced-motion: reduce)').matches) return;
    const timer = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % MINI_TESTIMONIALS.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const current = MINI_TESTIMONIALS[activeIndex];

  return (
    <div className={`${PANEL} mb-8 px-4 py-4 sm:px-5`}>
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:gap-6">
        <div className="shrink-0">
          <p className="text-[19px] font-bold leading-none tracking-[-0.02em] tabular-nums text-white">
            {USER_COUNT}
          </p>
          <p className="mt-1.5 text-[12.5px] text-white">UK electricians</p>
        </div>

        {/* Quiet separator — hairline, never a coloured rule */}
        <div className="h-px w-full bg-white/[0.12] sm:h-10 sm:w-px" />

        <blockquote className="min-w-0 flex-1">
          <p className="line-clamp-2 text-[14.5px] leading-snug text-white">
            &ldquo;{current.quote}&rdquo;
          </p>
          <footer className="mt-1.5 text-[12.5px] text-white">
            {current.name}, {current.company} · {current.stars} out of 5
          </footer>
        </blockquote>
      </div>
    </div>
  );
}
