import { useState, useEffect } from 'react';
import { Star, Users } from 'lucide-react';
import { USER_COUNT, MINI_TESTIMONIALS } from '@/constants/social-proof';

/**
 * Social proof strip — sits below hero, rotates mini testimonials.
 * Builds trust early before the reader scrolls into content.
 */
export function SEOSocialProofBar() {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % MINI_TESTIMONIALS.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  const current = MINI_TESTIMONIALS[activeIndex];

  return (
    <div className="rounded-2xl bg-white/[0.03] border border-white/[0.06] p-4 sm:p-5 mb-8">
      <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4">
        {/* User count */}
        <div className="flex items-center gap-2 shrink-0">
          <div className="w-8 h-8 rounded-full bg-green-500/15 border border-green-500/25 flex items-center justify-center">
            <Users className="w-4 h-4 text-green-400" />
          </div>
          <div>
            <p className="text-sm font-bold text-white leading-tight">{USER_COUNT}</p>
            <p className="text-[11px] text-white/50">UK electricians</p>
          </div>
        </div>

        {/* Separator — yellow line on mobile, vertical on desktop */}
        <div className="w-full h-px bg-yellow-500/20 sm:hidden" />
        <div className="hidden sm:block w-px h-8 bg-white/10" />

        {/* Rotating testimonial */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-0.5 mb-1">
            {Array.from({ length: current.stars }).map((_, i) => (
              <Star key={i} className="w-3 h-3 fill-yellow-400 text-yellow-400" />
            ))}
          </div>
          <p className="text-sm text-white leading-snug line-clamp-2 italic">
            &ldquo;{current.quote}&rdquo;
          </p>
          <p className="text-[11px] text-white mt-1">
            {current.name} — {current.company}
          </p>
        </div>
      </div>
    </div>
  );
}
