/**
 * JobCardSkeleton - Loading skeleton for job cards
 * Matches PremiumJobCard layout with shimmer animation
 */

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { shimmerVariants } from "./animations/variants";

interface JobCardSkeletonProps {
  count?: number;
  className?: string;
}

const SkeletonPulse = ({ className }: { className?: string }) => (
  <div className={cn("relative overflow-hidden bg-white/5 rounded", className)}>
    <motion.div
      variants={shimmerVariants}
      initial="initial"
      animate="animate"
      className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent"
    />
  </div>
);

const SingleSkeleton = () => (
  <div className="bg-card/80 backdrop-blur-sm rounded-2xl border border-white/10 overflow-hidden p-4 space-y-3">
    {/* Header: Logo + Badges */}
    <div className="flex items-start justify-between gap-3">
      <SkeletonPulse className="w-12 h-12 rounded-xl" />
      <div className="flex gap-1.5">
        <SkeletonPulse className="w-14 h-5 rounded-full" />
        <SkeletonPulse className="w-16 h-5 rounded-full" />
      </div>
    </div>

    {/* Title */}
    <div className="space-y-2">
      <SkeletonPulse className="h-5 w-full rounded" />
      <SkeletonPulse className="h-5 w-3/4 rounded" />
    </div>

    {/* Company */}
    <div className="flex items-center gap-2">
      <SkeletonPulse className="w-6 h-6 rounded-full" />
      <SkeletonPulse className="h-4 w-32 rounded" />
    </div>

    {/* Stats Row */}
    <div className="flex items-center gap-3">
      <SkeletonPulse className="h-5 w-24 rounded" />
      <SkeletonPulse className="h-5 w-20 rounded" />
      <SkeletonPulse className="h-5 w-16 rounded ml-auto" />
    </div>

    {/* Footer */}
    <div className="flex items-center justify-between pt-3 border-t border-white/5">
      <div className="space-y-1">
        <SkeletonPulse className="h-3 w-10 rounded" />
        <SkeletonPulse className="h-5 w-24 rounded" />
      </div>
      <SkeletonPulse className="h-9 w-28 rounded-lg" />
    </div>
  </div>
);

const JobCardSkeleton = ({ count = 3, className }: JobCardSkeletonProps) => {
  return (
    <div className={cn("space-y-4", className)}>
      {Array.from({ length: count }).map((_, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
        >
          <SingleSkeleton />
        </motion.div>
      ))}
    </div>
  );
};

export default JobCardSkeleton;
