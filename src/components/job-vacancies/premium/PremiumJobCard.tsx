/**
 * PremiumJobCard — editorial job card.
 *
 * Type-led, no stock-photo header. Company mark beside title (initials),
 * source + freshness chips, key facts strip (location, type, posted),
 * salary + CTA. Swipe-to-save / swipe-to-apply on mobile via SwipeableCard.
 */

import { motion } from 'framer-motion';
import { SwipeableCard } from '@/components/ui/SwipeableCard';
import { cn } from '@/lib/utils';
import { ChevronRight, Bookmark, ExternalLink, MapPin } from 'lucide-react';
import { cardPressSubtleVariants, listItemVariants } from './animations/variants';
import type { UnifiedJob } from '@/hooks/job-vacancies/useUnifiedJobSearch';

interface PremiumJobCardProps {
  job: UnifiedJob;
  onSelect: (job: UnifiedJob) => void;
  onSave?: (jobId: string) => void;
  onApply?: (job: UnifiedJob) => void;
  isSaved?: boolean;
  matchScore?: number;
  className?: string;
}

const initialsOf = (company: string): string =>
  company
    .split(/\s+/)
    .map((w) => w[0])
    .filter(Boolean)
    .slice(0, 3)
    .join('')
    .toUpperCase();

const isJobFresh = (postedDate: string) => {
  const posted = new Date(postedDate);
  const oneDayAgo = new Date(Date.now() - 24 * 60 * 60 * 1000);
  return posted > oneDayAgo;
};

const formatPostedDate = (date: string) => {
  const posted = new Date(date);
  const diffMs = Date.now() - posted.getTime();
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
  if (diffDays === 0) return 'Today';
  if (diffDays === 1) return '1d ago';
  if (diffDays < 7) return `${diffDays}d ago`;
  if (diffDays < 30) return `${Math.floor(diffDays / 7)}w ago`;
  return posted.toLocaleDateString('en-GB', { day: 'numeric', month: 'short' });
};

const formatSalary = (salary: string | null) => {
  if (!salary || salary === 'Not specified') return null;
  return salary;
};

const PremiumJobCard = ({
  job,
  onSelect,
  onSave,
  onApply,
  isSaved = false,
  matchScore,
  className,
}: PremiumJobCardProps) => {
  const isFresh = isJobFresh(job.posted_date);
  const salary = formatSalary(job.salary);
  const hasStrongMatch = typeof matchScore === 'number' && matchScore >= 85;

  // Single status pill — pick the most signal-rich one
  const statusPill: { label: string; tone: string } | null = hasStrongMatch
    ? {
        label: `${matchScore}% match`,
        tone: 'text-emerald-300 border-emerald-500/40 bg-emerald-500/[0.08]',
      }
    : isFresh
      ? { label: 'New', tone: 'text-amber-300 border-amber-500/40 bg-amber-500/[0.08]' }
      : typeof matchScore === 'number'
        ? {
            label: `${matchScore}% match`,
            tone: 'text-blue-300 border-blue-500/40 bg-blue-500/[0.08]',
          }
        : null;

  const cardContent = (
    <motion.div
      variants={listItemVariants}
      whileTap={cardPressSubtleVariants.tap}
      onClick={() => onSelect(job)}
      className={cn(
        'group relative cursor-pointer rounded-2xl bg-[linear-gradient(180deg,hsl(0_0%_13%)_0%,hsl(0_0%_10%)_100%)] border border-white/[0.10] hover:border-elec-yellow/40 active:bg-white/[0.04] transition-colors p-5 shadow-[inset_0_1px_0_rgba(255,255,255,0.04)] touch-manipulation flex flex-col',
        className
      )}
    >
      {/* Top row — company mark + meta */}
      <div className="flex items-start gap-3">
        <div className="w-12 h-12 rounded-xl flex items-center justify-center bg-elec-yellow/[0.08] border border-elec-yellow/30 shrink-0 overflow-hidden">
          {job.image_url ? (
            <img
              src={job.image_url}
              alt={`${job.company} logo`}
              className="w-full h-full object-contain"
              loading="lazy"
              decoding="async"
              referrerPolicy="no-referrer"
              onError={(e) => {
                const target = e.currentTarget as HTMLImageElement;
                target.style.display = 'none';
                const parent = target.parentElement;
                if (parent) {
                  parent.innerHTML = `<span class="text-[10.5px] font-semibold tabular-nums text-elec-yellow">${initialsOf(job.company)}</span>`;
                }
              }}
            />
          ) : (
            <span className="text-[10.5px] font-semibold tabular-nums text-elec-yellow">
              {initialsOf(job.company)}
            </span>
          )}
        </div>
        <div className="min-w-0 flex-1">
          <div className="flex items-baseline justify-between gap-2 flex-wrap">
            <span className="text-[10px] font-semibold uppercase tracking-[0.16em] text-elec-yellow/85">
              {job.type}
            </span>
            {job.source && (
              <span className="text-[10px] font-semibold uppercase tracking-[0.14em] text-white/85 border border-white/15 rounded-md px-1.5 py-0.5">
                {job.source}
              </span>
            )}
          </div>
          <h3 className="mt-1.5 text-[15px] sm:text-[16px] font-semibold tracking-tight text-white leading-tight line-clamp-2">
            {job.title}
          </h3>
          <p className="mt-0.5 text-[11.5px] text-elec-yellow truncate">{job.company}</p>
        </div>
        {isSaved && (
          <Bookmark className="h-4 w-4 text-elec-yellow fill-current shrink-0" aria-hidden />
        )}
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

      {/* Key facts row */}
      <dl className="mt-3 pt-3 border-t border-white/[0.06] grid grid-cols-2 gap-x-4 gap-y-1.5 text-[11px]">
        <Fact
          label="Location"
          value={
            <span className="inline-flex items-center gap-1 truncate">
              <MapPin className="h-3 w-3 text-white/65 shrink-0" aria-hidden />
              <span className="truncate">{job.location}</span>
            </span>
          }
        />
        <Fact label="Posted" value={formatPostedDate(job.posted_date)} />
      </dl>

      {/* Footer — salary + CTA */}
      <div className="mt-auto pt-3 border-t border-white/[0.06] flex items-baseline justify-between gap-2">
        <div className="min-w-0">
          <span className="text-[9.5px] uppercase tracking-[0.14em] font-semibold text-white/65">
            {salary ? 'Salary' : ''}
          </span>
          <div className="text-[15px] font-semibold tabular-nums text-white truncate">
            {salary ?? <span className="text-white/65 text-[12px] font-normal">Not specified</span>}
          </div>
        </div>
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            onSelect(job);
          }}
          className="text-[11px] font-semibold uppercase tracking-[0.14em] text-black bg-elec-yellow hover:bg-elec-yellow/90 active:bg-elec-yellow/85 rounded-full px-3 py-1.5 min-h-[32px] inline-flex items-center gap-1 touch-manipulation transition-colors"
        >
          Details
          <ChevronRight className="h-3 w-3" />
        </button>
      </div>
    </motion.div>
  );

  if (!onSave && !onApply) return cardContent;

  return (
    <SwipeableCard
      leftAction={
        onApply
          ? {
              icon: <ExternalLink className="h-5 w-5" />,
              bgColor: 'bg-emerald-500',
              label: 'Apply',
              onAction: () => onApply(job),
            }
          : undefined
      }
      rightAction={
        onSave
          ? {
              icon: <Bookmark className={cn('h-5 w-5', isSaved && 'fill-current')} />,
              bgColor: 'bg-elec-yellow',
              label: isSaved ? 'Saved' : 'Save',
              onAction: () => onSave(job.id),
            }
          : undefined
      }
      disabled={!onSave && !onApply}
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

export default PremiumJobCard;
