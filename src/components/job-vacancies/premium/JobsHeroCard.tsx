/**
 * JobsHeroCard — hero-style header matching the Industry News live feed card.
 * Big count, live-feed pulse, last-updated timestamp, refresh button and a
 * source strip showing which boards we're pulling from.
 */

import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { Briefcase, Clock, RefreshCw, Search, Loader2, Zap } from 'lucide-react';
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
    <motion.div
      variants={heroCardVariants}
      initial="initial"
      animate="animate"
      className={className}
    >
      <div className="relative rounded-2xl bg-white/[0.03] border border-white/[0.08] overflow-hidden">
        {/* Top gradient accent */}
        <div className="absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-blue-500 via-cyan-400 to-elec-yellow opacity-60" />

        <div className="relative p-4 sm:p-5">
          {/* Row 1 — icon + stats + refresh */}
          <div className="flex items-start justify-between gap-3">
            <div className="flex items-start gap-3 min-w-0 flex-1">
              <div className="w-10 h-10 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center shrink-0">
                <Briefcase className="h-5 w-5 text-blue-400" />
              </div>
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-2">
                  <div
                    className={cn(
                      'w-1.5 h-1.5 rounded-full',
                      isSearching ? 'bg-blue-400 animate-pulse' : 'bg-green-500 animate-pulse'
                    )}
                  />
                  <span className="text-[10px] font-bold text-green-400 uppercase tracking-[0.15em]">
                    {isSearching ? 'Searching' : 'Live Feed'}
                  </span>
                  {!isSearching && newJobsToday > 0 && (
                    <span className="flex items-center gap-1 text-[10px] text-emerald-400 whitespace-nowrap font-semibold">
                      <Zap className="h-2.5 w-2.5" />
                      {newJobsToday} new today
                    </span>
                  )}
                </div>
                <div className="mt-1 flex items-baseline gap-2 flex-wrap">
                  <span className="text-2xl sm:text-3xl font-bold text-white tabular-nums leading-none">
                    {totalJobs.toLocaleString()}
                  </span>
                  <span className="text-xs text-white font-medium">
                    {totalJobs === 1 ? 'job' : 'jobs'}
                  </span>
                </div>
                {lastUpdatedAt && (
                  <p className="mt-1.5 flex items-center gap-1 text-[11px] text-white">
                    <Clock className="h-3 w-3" />
                    Updated {formatDistanceToNow(lastUpdatedAt, { addSuffix: true })}
                  </p>
                )}
              </div>
            </div>

            {/* Refresh button */}
            {onRefresh && (
              <Button
                onClick={onRefresh}
                disabled={isRefreshing}
                className="h-10 px-3 touch-manipulation bg-elec-yellow/10 hover:bg-elec-yellow/20 text-elec-yellow border border-elec-yellow/30 rounded-xl shrink-0 active:scale-[0.97] transition-transform disabled:opacity-50"
              >
                {isRefreshing ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <RefreshCw className="h-4 w-4" />
                )}
                <span className="ml-1.5 text-xs font-semibold hidden sm:inline">
                  {isRefreshing ? 'Refreshing' : 'Refresh'}
                </span>
              </Button>
            )}
          </div>

          {/* Sources strip */}
          <div className="mt-4 pt-4 border-t border-white/[0.06] flex items-center gap-3 text-[11px] text-white flex-wrap">
            <span className="font-semibold text-white uppercase tracking-wider">
              Sources
            </span>
            <span>•</span>
            <span>Reed</span>
            <span>•</span>
            <span>Adzuna</span>
            <span>•</span>
            <span>Gumtree</span>
            <span>•</span>
            <span>Indeed</span>
            {onSmartSearch && (
              <>
                <span className="ml-auto" />
                <Button
                  onClick={onSmartSearch}
                  size="sm"
                  className="h-8 px-3 bg-blue-500 hover:bg-blue-400 text-white rounded-lg font-medium text-xs gap-1.5 touch-manipulation"
                >
                  <Search className="h-3.5 w-3.5" />
                  Smart Search
                </Button>
              </>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default JobsHeroCard;
