/**
 * SavedJobsTab — editorial saved-jobs view.
 *
 * Type-led list. Header eyebrow + count + clear-all. Sort pills (recent /
 * salary / match). Cards reuse the editorial pattern (gradient surface,
 * brand-mark initials, fact strip, salary + view CTA in footer).
 * Swipe-left to remove on mobile via SwipeableCard.
 */

import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { SwipeableCard } from '@/components/ui/SwipeableCard';
import { cn } from '@/lib/utils';
import {
  Bookmark,
  Trash2,
  Clock,
  Banknote,
  Star,
  Search,
  ChevronRight,
  MapPin,
} from 'lucide-react';
import { listContainerVariants, listItemVariants, fadeUpVariants } from './animations/variants';
import { Eyebrow } from '@/components/college/primitives';
import type { UnifiedJob } from '@/hooks/job-vacancies/useUnifiedJobSearch';

interface SavedJobEntry {
  job: UnifiedJob;
  savedAt: string;
}

interface SavedJobsTabProps {
  savedJobs: SavedJobEntry[];
  onRemove: (jobId: string) => void;
  onSelect: (job: UnifiedJob) => void;
  onClearAll?: () => void;
  onBrowseJobs?: () => void;
  className?: string;
}

type SortOption = 'recent' | 'salary' | 'match';

const SORT_OPTIONS: { id: SortOption; label: string; icon: typeof Clock }[] = [
  { id: 'recent', label: 'Recently saved', icon: Clock },
  { id: 'salary', label: 'Highest salary', icon: Banknote },
  { id: 'match', label: 'Best match', icon: Star },
];

const initialsOf = (company: string): string =>
  company
    .split(/\s+/)
    .map((w) => w[0])
    .filter(Boolean)
    .slice(0, 3)
    .join('')
    .toUpperCase();

const parseSalaryValue = (salary: string | null): number => {
  if (!salary) return 0;
  const match = salary.match(/(\d+)/);
  return match ? parseInt(match[1]) : 0;
};

const formatSavedTime = (savedAt: string) => {
  const saved = new Date(savedAt);
  const diffMs = Date.now() - saved.getTime();
  const diffMins = Math.floor(diffMs / (1000 * 60));
  const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
  if (diffMins < 1) return 'Just now';
  if (diffMins < 60) return `${diffMins}m ago`;
  if (diffHours < 24) return `${diffHours}h ago`;
  if (diffDays < 7) return `${diffDays}d ago`;
  return saved.toLocaleDateString('en-GB', { day: 'numeric', month: 'short' });
};

const EmptyState = ({ onBrowseJobs }: { onBrowseJobs?: () => void }) => (
  <motion.div
    variants={fadeUpVariants}
    initial="initial"
    animate="animate"
    className="rounded-2xl bg-[linear-gradient(180deg,hsl(0_0%_13%)_0%,hsl(0_0%_10%)_100%)] border border-white/[0.10] shadow-[inset_0_1px_0_rgba(255,255,255,0.04)] p-8 sm:p-10 text-center"
  >
    <div className="w-12 h-12 mx-auto rounded-xl bg-elec-yellow/[0.08] border border-elec-yellow/30 inline-flex items-center justify-center">
      <Bookmark className="h-5 w-5 text-elec-yellow" />
    </div>
    <h3 className="mt-4 text-[20px] sm:text-[24px] font-semibold tracking-tight text-white">
      No saved jobs yet.
    </h3>
    <p className="mt-2 text-[13px] leading-relaxed text-white/85 max-w-md mx-auto">
      Swipe right on a card or tap the bookmark to save roles you want to come back to. Your
      shortlist lives here, ready when you are.
    </p>
    {onBrowseJobs && (
      <button
        type="button"
        onClick={onBrowseJobs}
        className="mt-5 inline-flex items-center gap-2 text-[12px] font-semibold uppercase tracking-[0.14em] text-black bg-elec-yellow hover:bg-elec-yellow/90 active:bg-elec-yellow/85 rounded-full px-4 py-2.5 min-h-[40px] touch-manipulation transition-colors"
      >
        <Search className="h-4 w-4" />
        Browse jobs
      </button>
    )}
  </motion.div>
);

const SavedJobCard = ({
  entry,
  onSelect,
  onRemove,
}: {
  entry: SavedJobEntry;
  onSelect: (job: UnifiedJob) => void;
  onRemove: () => void;
}) => {
  const { job, savedAt } = entry;
  const hasSalary = job.salary && job.salary !== 'Not specified';

  return (
    <SwipeableCard
      rightAction={{
        icon: <Trash2 className="h-5 w-5" />,
        bgColor: 'bg-red-500',
        label: 'Remove',
        onAction: onRemove,
      }}
    >
      <motion.div
        variants={listItemVariants}
        onClick={() => onSelect(job)}
        className="group relative cursor-pointer rounded-2xl bg-[linear-gradient(180deg,hsl(0_0%_13%)_0%,hsl(0_0%_10%)_100%)] border border-white/[0.10] hover:border-elec-yellow/40 active:bg-white/[0.04] transition-colors p-5 shadow-[inset_0_1px_0_rgba(255,255,255,0.04)] touch-manipulation flex flex-col"
      >
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
              <span className="inline-flex items-center gap-1 text-[10px] font-semibold uppercase tracking-[0.14em] text-white/85 border border-white/15 rounded-md px-1.5 py-0.5">
                <Clock className="h-3 w-3" aria-hidden />
                {formatSavedTime(savedAt)}
              </span>
            </div>
            <h3 className="mt-1.5 text-[15px] sm:text-[16px] font-semibold tracking-tight text-white leading-tight line-clamp-2">
              {job.title}
            </h3>
            <p className="mt-0.5 text-[11.5px] text-elec-yellow truncate">{job.company}</p>
          </div>
          <Bookmark className="h-4 w-4 text-elec-yellow fill-current shrink-0" aria-hidden />
        </div>

        {/* Fact strip */}
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
          <Fact label="Source" value={job.source ?? '—'} />
        </dl>

        {/* Footer */}
        <div className="mt-auto pt-3 border-t border-white/[0.06] flex items-baseline justify-between gap-2">
          <div className="min-w-0">
            {hasSalary ? (
              <>
                <span className="text-[9.5px] uppercase tracking-[0.14em] font-semibold text-white/65">
                  Salary
                </span>
                <div className="text-[15px] font-semibold tabular-nums text-white truncate">
                  {job.salary}
                </div>
              </>
            ) : (
              <span className="text-[12px] text-white/65">Salary not specified</span>
            )}
          </div>
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onSelect(job);
            }}
            className="text-[11px] font-semibold uppercase tracking-[0.14em] text-black bg-elec-yellow hover:bg-elec-yellow/90 active:bg-elec-yellow/85 rounded-full px-3 py-1.5 min-h-[32px] inline-flex items-center gap-1 touch-manipulation transition-colors"
          >
            View
            <ChevronRight className="h-3 w-3" />
          </button>
        </div>
      </motion.div>
    </SwipeableCard>
  );
};

const SavedJobsTab = ({
  savedJobs,
  onRemove,
  onSelect,
  onClearAll,
  onBrowseJobs,
  className,
}: SavedJobsTabProps) => {
  const [sortBy, setSortBy] = useState<SortOption>('recent');

  const sortedJobs = useMemo(() => {
    const jobs = [...savedJobs];
    switch (sortBy) {
      case 'recent':
        return jobs.sort((a, b) => new Date(b.savedAt).getTime() - new Date(a.savedAt).getTime());
      case 'salary':
        return jobs.sort(
          (a, b) => parseSalaryValue(b.job.salary) - parseSalaryValue(a.job.salary)
        );
      case 'match':
        return jobs;
      default:
        return jobs;
    }
  }, [savedJobs, sortBy]);

  if (savedJobs.length === 0) {
    return <EmptyState onBrowseJobs={onBrowseJobs} />;
  }

  return (
    <div className={cn('space-y-5', className)}>
      {/* Header */}
      <div className="flex items-baseline justify-between gap-3 flex-wrap">
        <div className="space-y-1">
          <Eyebrow>SAVED</Eyebrow>
          <div className="flex items-baseline gap-2">
            <h2 className="text-[20px] sm:text-[22px] font-semibold tracking-tight text-white">
              Your shortlist.
            </h2>
            <span className="text-[11px] tabular-nums text-white/65">
              {savedJobs.length} role{savedJobs.length === 1 ? '' : 's'}
            </span>
          </div>
        </div>
        {onClearAll && savedJobs.length > 0 && (
          <button
            type="button"
            onClick={onClearAll}
            className="inline-flex items-center gap-1.5 text-[10.5px] font-semibold uppercase tracking-[0.14em] text-white/65 hover:text-red-300 border border-white/15 hover:border-red-500/40 rounded-full px-3 py-1 min-h-[32px] touch-manipulation transition-colors"
          >
            <Trash2 className="h-3 w-3" />
            Clear all
          </button>
        )}
      </div>

      {/* Sort row */}
      <div className="flex gap-2 overflow-x-auto scrollbar-hide pb-1">
        {SORT_OPTIONS.map((option) => {
          const Icon = option.icon;
          const isActive = sortBy === option.id;
          return (
            <button
              key={option.id}
              type="button"
              onClick={() => setSortBy(option.id)}
              className={cn(
                'shrink-0 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[11px] font-semibold uppercase tracking-[0.12em] border transition-colors touch-manipulation',
                isActive
                  ? 'text-elec-yellow border-elec-yellow/40 bg-elec-yellow/[0.08]'
                  : 'text-white/85 border-white/15 hover:border-white/30'
              )}
            >
              <Icon className="h-3.5 w-3.5" />
              {option.label}
            </button>
          );
        })}
      </div>

      {/* Jobs list */}
      <motion.div
        variants={listContainerVariants}
        initial="initial"
        animate="animate"
        className="space-y-3"
      >
        <AnimatePresence mode="popLayout">
          {sortedJobs.map((entry) => (
            <motion.div
              key={entry.job.id}
              layout
              exit={{ opacity: 0, x: -100, transition: { duration: 0.2 } }}
            >
              <SavedJobCard
                entry={entry}
                onSelect={onSelect}
                onRemove={() => onRemove(entry.job.id)}
              />
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>

      {/* Swipe hint */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="text-center text-[10.5px] uppercase tracking-[0.18em] font-semibold text-white/65 pt-2"
      >
        Swipe left to remove
      </motion.p>
    </div>
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

export default SavedJobsTab;
