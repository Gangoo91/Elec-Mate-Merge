/**
 * ProgrammeCard — editorial education programme card v2.
 *
 * Same layout fixes as the course card:
 *  • Brand mark moved out of the title row — now sits as a small leading
 *    pip on the provider line. Stops the awkward "I/V" / "E/C" multi-word
 *    initials when the institution string contains slashes ("IET / Various
 *    Providers"). Initials extraction now strips non-alphanumeric tokens
 *    (`/`, `&`, `-`) so we get clean letters.
 *  • Eyebrow row reflows: full-width category eyebrow with single-line
 *    truncation, level chip pinned to the top-right corner.
 *  • Title gets a min-height so cards align across a row.
 *  • Fees footer splits on `(`, so e.g. "£1,200 - £2,500 (per year)" shows
 *    the headline price big and the qualifier as a small subtitle line.
 */

import { motion } from 'framer-motion';
import { SwipeableCard } from '@/components/ui/SwipeableCard';
import { cn } from '@/lib/utils';
import {
  Star,
  TrendingUp,
  ChevronRight,
  Bookmark,
  GitCompare,
  MapPin,
} from 'lucide-react';
import { listItemVariants, cardPressSubtleVariants } from './animations/variants';
import type { LiveEducationData } from '@/hooks/useLiveEducationData';

interface ProgrammeCardProps {
  programme: LiveEducationData;
  onSelect: (programme: LiveEducationData) => void;
  onBookmark?: (programmeId: string) => void;
  onAddToCompare?: (programme: LiveEducationData) => void;
  isBookmarked?: boolean;
  isInCompare?: boolean;
  compareDisabled?: boolean;
  className?: string;
}

// Strip non-alpha tokens (`/`, `&`, `-`, `+`) before taking initials so
// "IET / Various Providers" → "IVP" not "I/V" / "I/V/P".
const STOPWORDS = new Set([
  'and',
  'the',
  'of',
  'for',
  'in',
  'on',
  'at',
  'to',
  'a',
  'an',
]);

const initialsOf = (institution: string): string => {
  const tokens = institution
    .split(/[\s/&\-+]+/)
    .map((t) => t.trim())
    .filter((t) => t.length > 0 && /^[a-z0-9]/i.test(t))
    .filter((t) => !STOPWORDS.has(t.toLowerCase()));
  // Prefer first 2-3 capitalised initials, but if the first token is itself
  // an acronym (all caps), use it whole as the brand mark.
  if (tokens.length > 0 && /^[A-Z]{2,4}$/.test(tokens[0])) {
    return tokens[0];
  }
  return tokens
    .slice(0, 3)
    .map((t) => t[0])
    .join('')
    .toUpperCase();
};

const formatDuration = (duration: string) => {
  const yr = duration.match(/(\d+)\s*years?/i);
  if (yr) return `${yr[1]}yr${parseInt(yr[1]) > 1 ? 's' : ''}`;
  const mo = duration.match(/(\d+)\s*months?/i);
  if (mo) return `${mo[1]}mo`;
  const wk = duration.match(/(\d+)\s*weeks?/i);
  if (wk) return `${wk[1]}wk${parseInt(wk[1]) > 1 ? 's' : ''}`;
  return duration;
};

// Split fee string on the first `(` so qualifiers ("per year", "Inc. VAT")
// become a small subtitle below the headline price — never truncated.
const splitFee = (raw: string): { main: string; sub: string | null } => {
  if (!raw) return { main: '—', sub: null };
  const idx = raw.indexOf('(');
  if (idx === -1) return { main: raw.trim(), sub: null };
  return { main: raw.slice(0, idx).trim(), sub: raw.slice(idx).trim() };
};

const ProgrammeCard = ({
  programme,
  onSelect,
  onBookmark,
  onAddToCompare,
  isBookmarked = false,
  isInCompare = false,
  compareDisabled = false,
  className,
}: ProgrammeCardProps) => {
  const isHighDemand = (programme.employmentRate || 0) >= 90;
  const isTopRated = (programme.rating || 0) >= 4.5;
  const isFunded = programme.fundingOptions?.some(
    (f) => f.toLowerCase().includes('funded') || f.toLowerCase().includes('levy')
  );

  // Single status pill — pick the most signal-rich one
  const statusPill: { label: string; tone: string } | null = isHighDemand
    ? { label: 'High demand', tone: 'text-amber-300 border-amber-500/40 bg-amber-500/[0.08]' }
    : isTopRated
      ? { label: 'Top rated', tone: 'text-emerald-300 border-emerald-500/40 bg-emerald-500/[0.08]' }
      : isFunded
        ? { label: 'Funded route', tone: 'text-blue-300 border-blue-500/40 bg-blue-500/[0.08]' }
        : null;

  const initials = initialsOf(programme.institution);
  const { main: feeMain, sub: feeSub } = splitFee(programme.tuitionFees);

  const cardContent = (
    <motion.div
      variants={listItemVariants}
      whileTap={cardPressSubtleVariants.tap}
      onClick={() => onSelect(programme)}
      className={cn(
        'group relative cursor-pointer rounded-2xl bg-[linear-gradient(180deg,hsl(0_0%_13%)_0%,hsl(0_0%_10%)_100%)] border border-white/[0.10] hover:border-elec-yellow/40 active:bg-white/[0.04] transition-colors p-5 shadow-[inset_0_1px_0_rgba(255,255,255,0.04)] touch-manipulation flex flex-col',
        className
      )}
    >
      {/* Top row — eyebrow (full-width, truncated) + level chip far-right */}
      <div className="flex items-start gap-2">
        <span className="text-[10px] font-semibold uppercase tracking-[0.18em] text-elec-yellow/85 truncate flex-1">
          {programme.category}
        </span>
        <div className="flex items-center gap-1.5 shrink-0">
          {isBookmarked && (
            <Bookmark className="h-3.5 w-3.5 text-elec-yellow fill-current" aria-hidden />
          )}
          <span className="text-[10px] font-semibold uppercase tracking-[0.14em] text-white/85 border border-white/15 rounded-md px-1.5 py-0.5">
            {programme.level}
          </span>
        </div>
      </div>

      {/* Title — min-height keeps footer aligned across the row */}
      <h3 className="mt-2 text-[15px] sm:text-[16px] font-semibold tracking-tight text-white leading-snug line-clamp-2 min-h-[40px] sm:min-h-[42px]">
        {programme.title}
      </h3>

      {/* Provider — small leading pip + name */}
      <div className="mt-1.5 flex items-center gap-1.5 min-w-0">
        <span
          className="inline-flex items-center justify-center min-w-[20px] h-4 px-1 rounded-[5px] bg-elec-yellow/[0.10] border border-elec-yellow/30 text-[8px] font-semibold tabular-nums text-elec-yellow shrink-0"
          aria-hidden
        >
          {initials.slice(0, 4) || '·'}
        </span>
        <p className="text-[11.5px] text-elec-yellow truncate">{programme.institution}</p>
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

      {/* Key facts grid */}
      <dl className="mt-3 pt-3 border-t border-white/[0.06] grid grid-cols-2 gap-x-4 gap-y-1.5 text-[11px]">
        <Fact
          label="Rating"
          value={
            <span className="inline-flex items-center gap-1">
              <Star className="h-3 w-3 fill-amber-400 text-amber-400" aria-hidden />
              {(programme.rating || 0).toFixed(1)}
            </span>
          }
        />
        <Fact
          label="Employed"
          value={
            <span className="inline-flex items-center gap-1">
              <TrendingUp className="h-3 w-3 text-emerald-400" aria-hidden />
              {programme.employmentRate || 0}%
            </span>
          }
        />
        <Fact label="Duration" value={formatDuration(programme.duration)} />
        <Fact label="Mode" value={programme.studyMode} />
      </dl>

      {/* Locations */}
      {programme.locations.length > 0 && (
        <p className="mt-3 inline-flex items-center gap-1.5 text-[11px] text-white/85">
          <MapPin className="h-3 w-3 text-white/65" aria-hidden />
          <span className="line-clamp-1">
            {programme.locations[0]}
            {programme.locations.length > 1 && (
              <span className="text-elec-yellow font-semibold">
                {' '}
                +{programme.locations.length - 1}
              </span>
            )}
          </span>
        </p>
      )}

      {/* Footer — stacked fees + CTA */}
      <div className="mt-auto pt-3 border-t border-white/[0.06] flex items-end justify-between gap-3">
        <div className="min-w-0 flex-1">
          <span className="text-[9.5px] uppercase tracking-[0.14em] font-semibold text-white/65">
            From
          </span>
          <div className="text-[15px] sm:text-[16px] font-semibold tabular-nums text-white leading-tight truncate">
            {feeMain}
          </div>
          {feeSub && (
            <div className="text-[10.5px] text-white/65 truncate">{feeSub}</div>
          )}
        </div>
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            onSelect(programme);
          }}
          className="shrink-0 self-end text-[11px] font-semibold uppercase tracking-[0.14em] text-black bg-elec-yellow hover:bg-elec-yellow/90 active:bg-elec-yellow/85 rounded-full px-3 py-1.5 min-h-[32px] inline-flex items-center gap-1 touch-manipulation transition-colors"
        >
          Details
          <ChevronRight className="h-3 w-3" />
        </button>
      </div>
    </motion.div>
  );

  if (!onBookmark && !onAddToCompare) return cardContent;

  return (
    <SwipeableCard
      leftAction={
        onAddToCompare && !compareDisabled
          ? {
              icon: <GitCompare className="h-5 w-5" />,
              bgColor: isInCompare ? 'bg-purple-600' : 'bg-purple-500',
              label: isInCompare ? 'Added' : 'Compare',
              onAction: () => onAddToCompare(programme),
            }
          : undefined
      }
      rightAction={
        onBookmark
          ? {
              icon: <Bookmark className={cn('h-5 w-5', isBookmarked && 'fill-current')} />,
              bgColor: 'bg-elec-yellow',
              label: isBookmarked ? 'Saved' : 'Save',
              onAction: () => onBookmark(programme.id),
            }
          : undefined
      }
      disabled={!onBookmark && (!onAddToCompare || compareDisabled)}
      className={className}
    >
      {cardContent}
    </SwipeableCard>
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

export default ProgrammeCard;
