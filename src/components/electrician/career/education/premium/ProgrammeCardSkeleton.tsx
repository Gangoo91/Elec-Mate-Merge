/**
 * ProgrammeCardSkeleton - Skeleton loading state for ProgrammeCard
 * Matches exact layout for seamless loading experience
 */

import { motion } from "framer-motion";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";

interface ProgrammeCardSkeletonProps {
  count?: number;
  className?: string;
}

const ProgrammeCardSkeleton = ({
  count = 1,
  className,
}: ProgrammeCardSkeletonProps) => {
  return (
    <div className={cn("space-y-4", className)}>
      {Array.from({ length: count }).map((_, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: index * 0.1 }}
          className="rounded-xl border border-white/10 overflow-hidden bg-gradient-to-br from-white/5 via-white/[0.02] to-transparent"
        >
          {/* Image skeleton */}
          <Skeleton className="h-36 w-full rounded-none" />

          {/* Content skeleton */}
          <div className="p-4 space-y-3">
            {/* Stats row */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Skeleton className="h-4 w-12" />
                <Skeleton className="h-4 w-10" />
              </div>
              <Skeleton className="h-4 w-14" />
            </div>

            {/* Title */}
            <div className="space-y-2">
              <Skeleton className="h-5 w-full" />
              <Skeleton className="h-5 w-4/5" />
            </div>

            {/* Institution */}
            <Skeleton className="h-4 w-2/3" />

            {/* Study details */}
            <div className="flex items-center justify-between">
              <Skeleton className="h-3 w-20" />
              <Skeleton className="h-3 w-24" />
            </div>

            {/* Footer */}
            <div className="flex items-center justify-between pt-3 border-t border-white/10">
              <Skeleton className="h-4 w-20" />
              <Skeleton className="h-8 w-20 rounded-md" />
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
};

export default ProgrammeCardSkeleton;
