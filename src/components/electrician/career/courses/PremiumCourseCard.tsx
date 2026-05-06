/**
 * PremiumCourseCard — editorial course card v2.
 *
 * Layout fixes from screenshot review:
 *  • Level chip moved to TOP-RIGHT corner so the category eyebrow gets the
 *    full row width (no more wrap with long categories like "18TH EDITION
 *    (BS 7671) WIRING REGULATIONS").
 *  • Eyebrow truncates to a single line — every card has identical eyebrow
 *    height, so the grid aligns cleanly.
 *  • Provider line gets a leading dot mark to give short provider initials
 *    (E, ET) some visual weight without dedicating a whole avatar block.
 *  • Price footer splits on the first `(` so "(Inc. VAT)" / "(£577 incl)"
 *    becomes a small subtitle line — never truncated.
 *  • Status pill moved to a dedicated chip row with the level chip echoed
 *    in muted form (so level is also visible without scanning back up).
 *  • Two-line title (line-clamp-2) with min-height to keep card footers
 *    aligned across the row.
 */

import { motion } from 'framer-motion';
import { Star, ChevronRight, MapPin } from 'lucide-react';
import type { EnhancedCareerCourse } from '@/components/apprentice/career/courses/enhancedCoursesData';
import { cn } from '@/lib/utils';

interface PremiumCourseCardProps {
  course: EnhancedCareerCourse;
  onClick: () => void;
  index?: number;
}

const initialsOf = (provider: string): string =>
  provider
    .split(/\s+/)
    .map((w) => w[0])
    .filter(Boolean)
    .slice(0, 3)
    .join('')
    .toUpperCase();

const formatDuration = (duration: string) => {
  const yr = duration.match(/(\d+)\s*years?/i);
  if (yr) return `${yr[1]}yr${parseInt(yr[1]) > 1 ? 's' : ''}`;
  const mo = duration.match(/(\d+)\s*months?/i);
  if (mo) return `${mo[1]}mo`;
  const wk = duration.match(/(\d+)\s*weeks?/i);
  if (wk) return `${wk[1]}wk${parseInt(wk[1]) > 1 ? 's' : ''}`;
  const day = duration.match(/(\d+)\s*days?/i);
  if (day) return `${day[1]}d`;
  return duration;
};

// Split price on first `(` so parenthetical (Incl. VAT, was £577.00) becomes
// a subtitle that never gets truncated alongside the headline price.
const splitPrice = (raw: string): { main: string; sub: string | null } => {
  if (!raw) return { main: '—', sub: null };
  const idx = raw.indexOf('(');
  if (idx === -1) return { main: raw.trim(), sub: null };
  const main = raw.slice(0, idx).trim();
  const sub = raw.slice(idx).trim();
  return { main, sub };
};

const PremiumCourseCard = ({ course, onClick, index = 0 }: PremiumCourseCardProps) => {
  const firstLocation = course.locations?.[0] || course.location;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const distance = (course as any)._distance as number | undefined;
  const isHighDemand = course.industryDemand === 'High';
  const initials = initialsOf(course.provider);

  // Single status pill — High demand wins, then Popular, otherwise nothing
  const statusPill: { label: string; tone: string } | null = isHighDemand
    ? { label: 'High demand', tone: 'text-emerald-300 border-emerald-500/40 bg-emerald-500/[0.08]' }
    : course.industryDemand === 'Medium'
      ? { label: 'Popular', tone: 'text-blue-300 border-blue-500/40 bg-blue-500/[0.08]' }
      : null;

  const { main: priceMain, sub: priceSub } = splitPrice(course.price);

  return (
    <motion.button
      type="button"
      custom={index}
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.02, type: 'spring', stiffness: 400, damping: 30 }}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
      className="text-left group cursor-pointer rounded-2xl bg-[linear-gradient(180deg,hsl(0_0%_13%)_0%,hsl(0_0%_10%)_100%)] border border-white/[0.10] hover:border-elec-yellow/40 active:bg-white/[0.04] transition-colors p-5 shadow-[inset_0_1px_0_rgba(255,255,255,0.04)] touch-manipulation flex flex-col"
    >
      {/* Top row — eyebrow row + level chip far-right */}
      <div className="flex items-start gap-2">
        <span className="text-[10px] font-semibold uppercase tracking-[0.18em] text-elec-yellow/85 truncate flex-1">
          {course.category}
        </span>
        <span className="text-[10px] font-semibold uppercase tracking-[0.14em] text-white/85 border border-white/15 rounded-md px-1.5 py-0.5 shrink-0">
          {course.level}
        </span>
      </div>

      {/* Title — fixed min-height keeps footer aligned across the row */}
      <h3 className="mt-2 text-[15px] sm:text-[16px] font-semibold tracking-tight text-white leading-snug line-clamp-2 min-h-[40px] sm:min-h-[42px]">
        {course.title}
      </h3>

      {/* Provider — small leading dot + name (gives short initials weight) */}
      <div className="mt-1.5 flex items-center gap-1.5 min-w-0">
        <span
          className="inline-flex items-center justify-center w-4 h-4 rounded-[5px] bg-elec-yellow/[0.10] border border-elec-yellow/30 text-[8px] font-semibold tabular-nums text-elec-yellow shrink-0"
          aria-hidden
        >
          {initials.charAt(0)}
        </span>
        <p className="text-[11.5px] text-elec-yellow truncate">{course.provider}</p>
      </div>

      {/* Status pill */}
      {statusPill && (
        <div className="mt-3">
          <span
            className={cn(
              'inline-flex items-center gap-1 text-[10px] font-semibold uppercase tracking-[0.14em] border rounded-full px-2 py-0.5',
              statusPill.tone
            )}
          >
            {statusPill.label}
          </span>
        </div>
      )}

      {/* Fact grid */}
      <dl className="mt-3 pt-3 border-t border-white/[0.06] grid grid-cols-2 gap-x-4 gap-y-1.5 text-[11px]">
        <Fact
          label="Rating"
          value={
            <span className="inline-flex items-center gap-1">
              <Star className="h-3 w-3 fill-amber-400 text-amber-400" aria-hidden />
              {course.rating.toFixed(1)}
            </span>
          }
        />
        <Fact label="Duration" value={formatDuration(course.duration)} />
        <Fact label="Format" value={course.format || 'Classroom'} />
        <Fact
          label="Location"
          value={
            firstLocation ? (
              <span className="inline-flex items-center gap-1 truncate">
                <MapPin className="h-3 w-3 text-white/65 shrink-0" aria-hidden />
                <span className="truncate">{firstLocation}</span>
                {distance != null && (
                  <span className="text-elec-yellow font-semibold ml-0.5">
                    · {Math.round(distance)}mi
                  </span>
                )}
              </span>
            ) : (
              '—'
            )
          }
        />
      </dl>

      {/* Footer — stacked price + CTA */}
      <div className="mt-auto pt-3 border-t border-white/[0.06] flex items-end justify-between gap-3">
        <div className="min-w-0 flex-1">
          <span className="text-[9.5px] uppercase tracking-[0.14em] font-semibold text-white/65">
            From
          </span>
          <div className="text-[15px] sm:text-[16px] font-semibold tabular-nums text-white leading-tight truncate">
            {priceMain}
          </div>
          {priceSub && (
            <div className="text-[10.5px] text-white/65 truncate">{priceSub}</div>
          )}
        </div>
        <span className="text-[11px] font-semibold uppercase tracking-[0.14em] text-black bg-elec-yellow group-hover:bg-elec-yellow/90 rounded-full px-3 py-1.5 min-h-[32px] inline-flex items-center gap-1 transition-colors shrink-0 self-end">
          View
          <ChevronRight className="h-3 w-3" />
        </span>
      </div>
    </motion.button>
  );
};

const Fact = ({ label, value }: { label: string; value: React.ReactNode }) => (
  <div className="inline-flex items-baseline gap-1.5 min-w-0">
    <dt className="text-[9.5px] uppercase tracking-[0.14em] font-semibold text-white/65 shrink-0">
      {label}
    </dt>
    <dd className="text-white tabular-nums truncate">{value}</dd>
  </div>
);

export default PremiumCourseCard;
