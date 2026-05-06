/**
 * JobsHeroCard — hero-style header matching the Industry News live feed card.
 * Big count, live-feed pulse, last-updated timestamp, refresh button and a
 * source strip showing which boards we're pulling from.
 */

import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { Clock, RefreshCw, Search, Loader2 } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';
import { heroCardVariants } from './animations/variants';

interface JobsHeroCardProps {
  totalJobs: number;
  newJobsToday: number;
  lastUpdatedAt?: Date | null;
  isSearching?: boolean;
  isRefreshing?: boolean;
  onRefresh?: () => void;
  onSmartSearch?: () => void;
  className?: string;
}

const JobsHeroCard = ({
  totalJobs,
  newJobsToday,
  lastUpdatedAt,
  isSearching = false,
  isRefreshing = false,
  onRefresh,
  onSmartSearch,
  className,
}: JobsHeroCardProps) => {
  return (
    <motion.section
      variants={heroCardVariants}
      initial="initial"
      animate="animate"
      className={cn('space-y-4', className)}
    >
      {/* Editorial header row */}
      <div className="flex items-baseline justify-between gap-3 flex-wrap">
        <div className="flex items-baseline gap-2 flex-wrap">
          <span className="text-[10.5px] font-semibold uppercase tracking-[0.18em] text-elec-yellow">
            05 · LIVE JOBS
          </span>
          <span
            className={cn(
              'inline-flex items-center gap-1.5 text-[10px] font-semibold uppercase tracking-[0.16em] tabular-nums',
              isSearching ? 'text-blue-300' : 'text-emerald-300'
            )}
          >
            <span
              className={cn(
                'w-1.5 h-1.5 rounded-full',
                isSearching ? 'bg-blue-400 animate-pulse' : 'bg-emerald-400 animate-pulse'
              )}
            />
            {isSearching ? 'Searching' : 'Live'}
          </span>
        </div>
        {onRefresh && (
          <button
            type="button"
            onClick={onRefresh}
            disabled={isRefreshing}
            className="text-[10.5px] uppercase tracking-[0.14em] text-white/85 hover:text-elec-yellow border border-white/15 hover:border-elec-yellow/40 rounded-full px-3 py-1 min-h-[28px] touch-manipulation transition-colors inline-flex items-center gap-1.5 disabled:opacity-50"
          >
            {isRefreshing ? (
              <Loader2 className="h-3 w-3 animate-spin" />
            ) : (
              <RefreshCw className="h-3 w-3" />
            )}
            {isRefreshing ? 'Refreshing' : 'Refresh'}
          </button>
        )}
      </div>

      <h2 className="text-[34px] sm:text-[44px] lg:text-[54px] font-semibold tracking-tight leading-[1.05]">
        <span className="text-elec-yellow tabular-nums">{totalJobs.toLocaleString()}</span>{' '}
        <span className="text-white">live UK roles.</span>
      </h2>

      <p className="text-[14px] sm:text-[15px] leading-relaxed text-white max-w-3xl">
        Aggregated daily from Reed, Adzuna, Indeed and Gumtree. Search by title, postcode or radius;
        save shortlists; quick-apply with a stored CV.
        {newJobsToday > 0 && (
          <>
            {' '}
            <span className="font-semibold text-emerald-300 tabular-nums">
              {newJobsToday} new today.
            </span>
          </>
        )}
        {lastUpdatedAt && (
          <span className="text-white/65 inline-flex items-center gap-1.5 ml-2">
            <Clock className="h-3 w-3 inline" />
            updated {formatDistanceToNow(lastUpdatedAt, { addSuffix: true })}
          </span>
        )}
      </p>

      {/* Smart search CTA */}
      {onSmartSearch && (
        <div className="pt-1">
          <button
            type="button"
            onClick={onSmartSearch}
            className="text-[12px] font-semibold uppercase tracking-[0.14em] text-black bg-elec-yellow hover:bg-elec-yellow/90 active:bg-elec-yellow/85 rounded-full px-4 py-2 min-h-[36px] inline-flex items-center gap-2 touch-manipulation transition-colors"
          >
            <Search className="h-3.5 w-3.5" />
            Smart search
          </button>
        </div>
      )}
    </motion.section>
  );
};

export default JobsHeroCard;
