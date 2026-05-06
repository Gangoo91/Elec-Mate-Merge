/**
 * ProgrammeCardSkeleton — editorial loading skeleton.
 *
 * Matches the rewritten ProgrammeCard layout: gradient surface, brand mark
 * placeholder, eyebrow + chip row, fact strip, footer with fees + CTA.
 */

import { motion } from 'framer-motion';
import { Skeleton } from '@/components/ui/skeleton';
import { cn } from '@/lib/utils';

interface ProgrammeCardSkeletonProps {
  count?: number;
  className?: string;
}

const ProgrammeCardSkeleton = ({ count = 1, className }: ProgrammeCardSkeletonProps) => {
  return (
    <div className={cn('space-y-4', className)}>
      {Array.from({ length: count }).map((_, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: index * 0.08 }}
          className="rounded-2xl border border-white/[0.10] bg-[linear-gradient(180deg,hsl(0_0%_13%)_0%,hsl(0_0%_10%)_100%)] shadow-[inset_0_1px_0_rgba(255,255,255,0.04)] p-5 flex flex-col"
        >
          {/* Eyebrow + level chip */}
          <div className="flex items-start gap-2">
            <Skeleton className="h-3 w-28 flex-1 max-w-[160px]" />
            <Skeleton className="h-4 w-12 rounded-md shrink-0" />
          </div>

          {/* Title */}
          <div className="mt-2 space-y-1.5">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-4/5" />
          </div>

          {/* Provider with leading pip */}
          <div className="mt-1.5 flex items-center gap-1.5">
            <Skeleton className="h-4 w-6 rounded-[5px]" />
            <Skeleton className="h-3 w-1/2" />
          </div>

          {/* Fact strip */}
          <div className="mt-3 pt-3 border-t border-white/[0.06] grid grid-cols-2 gap-x-4 gap-y-2">
            <Skeleton className="h-3 w-20" />
            <Skeleton className="h-3 w-24" />
            <Skeleton className="h-3 w-16" />
            <Skeleton className="h-3 w-20" />
          </div>

          {/* Footer */}
          <div className="mt-3 pt-3 border-t border-white/[0.06] flex items-baseline justify-between gap-2">
            <div className="space-y-1.5">
              <Skeleton className="h-2.5 w-10" />
              <Skeleton className="h-4 w-20" />
            </div>
            <Skeleton className="h-8 w-20 rounded-full" />
          </div>
        </motion.div>
      ))}
    </div>
  );
};

export default ProgrammeCardSkeleton;
