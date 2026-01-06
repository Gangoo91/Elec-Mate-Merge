import { cn } from "@/lib/utils";

interface SkeletonProps {
  className?: string;
}

const Skeleton = ({ className }: SkeletonProps) => (
  <div className={cn("animate-pulse rounded-lg bg-white/10", className)} />
);

// Skeleton for PriceCard component
export const PriceCardSkeleton = () => (
  <div className="rounded-2xl overflow-hidden bg-gradient-to-br from-neutral-900 to-neutral-950 border-2 border-white/10 p-5">
    {/* Header Row */}
    <div className="flex items-start justify-between gap-4 mb-4">
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 mb-2">
          <Skeleton className="h-6 w-40" />
          <Skeleton className="h-6 w-20 rounded-lg" />
        </div>
        <div className="flex items-center gap-2">
          <Skeleton className="h-4 w-4 rounded-full" />
          <Skeleton className="h-4 w-24" />
        </div>
      </div>
      <div className="text-right flex-shrink-0">
        <Skeleton className="h-9 w-24" />
        <Skeleton className="h-3 w-16 mt-2 ml-auto" />
      </div>
    </div>

    {/* Price Range Bar */}
    <div className="mb-4">
      <Skeleton className="h-14 w-full rounded-xl" />
    </div>

    {/* Stats Row */}
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-4">
        <Skeleton className="h-4 w-20" />
        <Skeleton className="h-4 w-16" />
      </div>
      <Skeleton className="h-8 w-8 rounded-lg" />
    </div>
  </div>
);

// Skeleton for MetalPriceCard component
export const MetalCardSkeleton = () => (
  <div className="relative overflow-hidden rounded-2xl p-4 bg-gradient-to-br from-neutral-800 to-neutral-900 border border-white/10">
    <div className="absolute top-0 right-0 w-24 h-24 bg-white/5 rounded-full -translate-y-8 translate-x-8" />
    <div className="relative flex items-center justify-between">
      <div className="flex items-center gap-3">
        <Skeleton className="w-12 h-12 rounded-xl" />
        <div>
          <Skeleton className="h-5 w-24 mb-2" />
          <div className="flex items-center gap-2">
            <Skeleton className="h-4 w-12" />
            <Skeleton className="h-3 w-8" />
          </div>
        </div>
      </div>
      <div className="text-right flex items-center gap-3">
        <div>
          <Skeleton className="h-8 w-20" />
          <Skeleton className="h-3 w-12 mt-1 ml-auto" />
        </div>
        <Skeleton className="h-5 w-5 rounded" />
      </div>
    </div>
  </div>
);

// Skeleton for the full MetalPricesGrid
export const MetalPricesGridSkeleton = () => (
  <div className="space-y-5">
    {/* Header */}
    <div className="flex items-center justify-between">
      <div>
        <div className="flex items-center gap-2">
          <Skeleton className="h-7 w-48" />
          <Skeleton className="h-5 w-14 rounded-full" />
        </div>
        <div className="flex items-center gap-1.5 mt-2">
          <Skeleton className="h-4 w-4 rounded" />
          <Skeleton className="h-4 w-24" />
        </div>
      </div>
      <Skeleton className="h-10 w-10 rounded-xl" />
    </div>

    {/* Calculator Button */}
    <Skeleton className="h-24 w-full rounded-2xl" />

    {/* Metal Cards */}
    <div className="space-y-3">
      {[1, 2, 3, 4, 5, 6].map((i) => (
        <MetalCardSkeleton key={i} />
      ))}
    </div>

    {/* Tip */}
    <Skeleton className="h-20 w-full rounded-2xl" />
  </div>
);

// Skeleton for search results section
export const SearchResultsSkeleton = () => (
  <div className="space-y-4">
    <div className="flex items-center justify-between">
      <Skeleton className="h-5 w-48" />
    </div>
    {[1, 2, 3].map((i) => (
      <PriceCardSkeleton key={i} />
    ))}
  </div>
);

// Skeleton for insights dashboard
export const InsightsSkeleton = () => (
  <div className="space-y-6">
    {/* Stats Grid */}
    <div className="grid grid-cols-2 gap-4">
      {[1, 2, 3, 4].map((i) => (
        <div key={i} className="p-4 rounded-2xl bg-white/5 border border-white/10">
          <Skeleton className="h-4 w-20 mb-2" />
          <Skeleton className="h-8 w-16" />
        </div>
      ))}
    </div>

    {/* Chart Area */}
    <div className="p-4 rounded-2xl bg-white/5 border border-white/10">
      <Skeleton className="h-5 w-32 mb-4" />
      <Skeleton className="h-48 w-full rounded-xl" />
    </div>

    {/* Contribution History */}
    <div className="p-4 rounded-2xl bg-white/5 border border-white/10">
      <Skeleton className="h-5 w-40 mb-4" />
      <div className="space-y-3">
        {[1, 2, 3].map((i) => (
          <div key={i} className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Skeleton className="h-10 w-10 rounded-xl" />
              <div>
                <Skeleton className="h-4 w-32 mb-1" />
                <Skeleton className="h-3 w-20" />
              </div>
            </div>
            <Skeleton className="h-5 w-16" />
          </div>
        ))}
      </div>
    </div>
  </div>
);

export default {
  PriceCardSkeleton,
  MetalCardSkeleton,
  MetalPricesGridSkeleton,
  SearchResultsSkeleton,
  InsightsSkeleton,
};
