/**
 * JobCardSkeleton — editorial loading skeleton.
 *
 * Matches the rewritten UnifiedJobCard layout: gradient surface, optional
 * brand mark, eyebrow + title block, meta row, footer with salary + CTA.
 */

import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { shimmerVariants } from './animations/variants';

interface JobCardSkeletonProps {
  count?: number;
  className?: string;
}

const SkeletonPulse = ({ className }: { className?: string }) => (
  <div className={cn('relative overflow-hidden bg-white/[0.06] rounded', className)}>
    <motion.div
      variants={shimmerVariants}
      initial="initial"
      animate="animate"
      className="absolute inset-0 bg-gradient-to-r from-transparent via-white/[0.08] to-transparent"
    />
  </div>
);

const SingleSkeleton = () => (
  <div className="rounded-2xl bg-[linear-gradient(180deg,hsl(0_0%_13%)_0%,hsl(0_0%_10%)_100%)] border border-white/[0.10] shadow-[inset_0_1px_0_rgba(255,255,255,0.04)] p-4 sm:p-5">
    {/* Top row: brand mark + title + corner chip */}
    <div className="flex items-start gap-3">
      <SkeletonPulse className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl shrink-0" />
      <div className="flex-1 min-w-0 space-y-2">
        <SkeletonPulse className="h-4 w-full rounded" />
        <SkeletonPulse className="h-4 w-3/4 rounded" />
        <SkeletonPulse className="h-3 w-1/3 rounded" />
      </div>
      <SkeletonPulse className="h-4 w-10 rounded-md shrink-0" />
    </div>

    {/* Meta row */}
    <div className="mt-3 flex items-center gap-2">
      <SkeletonPulse className="h-3 w-24 rounded" />
      <SkeletonPulse className="h-4 w-16 rounded-md" />
      <SkeletonPulse className="h-3 w-20 rounded ml-auto" />
    </div>

    {/* Footer */}
    <div className="mt-3 pt-3 border-t border-white/[0.06] flex items-baseline justify-between gap-3">
      <div className="space-y-1.5">
        <SkeletonPulse className="h-2.5 w-10 rounded" />
        <SkeletonPulse className="h-4 w-24 rounded" />
      </div>
      <SkeletonPulse className="h-8 w-20 rounded-full shrink-0" />
    </div>
  </div>
);

const JobCardSkeleton = ({ count = 3, className }: JobCardSkeletonProps) => {
  return (
    <div className={cn('space-y-3', className)}>
      {Array.from({ length: count }).map((_, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.06 }}
        >
          <SingleSkeleton />
        </motion.div>
      ))}
    </div>
  );
};

export default JobCardSkeleton;
