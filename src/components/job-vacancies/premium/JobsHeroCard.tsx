/**
 * JobsHeroCard - Compact inline strip with job count and search
 */

import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { Briefcase, Search, Zap } from 'lucide-react';
import { heroCardVariants } from './animations/variants';

interface JobsHeroCardProps {
  totalJobs: number;
  newJobsToday: number;
  isSearching?: boolean;
  onSmartSearch?: () => void;
  className?: string;
}

const JobsHeroCard = ({
  totalJobs,
  newJobsToday,
  isSearching = false,
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
      <div className="flex items-center gap-3 rounded-xl bg-white/[0.03] border border-white/10 px-3 py-2.5">
        {/* Icon */}
        <div className="p-2 rounded-lg bg-blue-500/15 flex-shrink-0">
          <Briefcase className="h-5 w-5 text-blue-400" />
        </div>

        {/* Stats */}
        <div className="flex items-center gap-2 flex-1 min-w-0">
          <span className="text-sm font-semibold text-white whitespace-nowrap">
            {isSearching ? (
              <span className="text-blue-300">Searching...</span>
            ) : (
              <>
                {totalJobs.toLocaleString()} jobs
              </>
            )}
          </span>
          {!isSearching && newJobsToday > 0 && (
            <span className="flex items-center gap-1 text-xs text-emerald-400 whitespace-nowrap">
              <Zap className="h-3 w-3" />
              {newJobsToday} new today
            </span>
          )}
        </div>

        {/* Search button */}
        {onSmartSearch && (
          <Button
            onClick={onSmartSearch}
            size="sm"
            className={cn(
              'h-9 px-3 bg-blue-500 hover:bg-blue-400 text-white rounded-lg',
              'font-medium gap-1.5 flex-shrink-0 touch-manipulation'
            )}
          >
            <Search className="h-4 w-4" />
            <span className="hidden sm:inline">Search</span>
          </Button>
        )}
      </div>
    </motion.div>
  );
};

export default JobsHeroCard;
