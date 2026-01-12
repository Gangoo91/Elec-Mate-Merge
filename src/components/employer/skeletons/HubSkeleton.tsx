import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

interface HubSkeletonProps {
  /** Number of stat cards in the top row */
  statCount?: number;
  /** Number of feature cards in the grid */
  cardCount?: number;
  /** Number of columns for the card grid on desktop */
  columns?: 2 | 3;
}

/**
 * Consistent loading skeleton for hub dashboards.
 * Shows stat cards at top + feature card grid below.
 */
export function HubSkeleton({
  statCount = 4,
  cardCount = 4,
  columns = 2
}: HubSkeletonProps) {
  return (
    <div className="space-y-6 pb-6 animate-pulse">
      {/* Quick Stats Grid */}
      <div className="grid grid-cols-4 gap-2 md:gap-3">
        {Array.from({ length: statCount }).map((_, i) => (
          <Card key={i} className="border-2 border-border/30 bg-muted/20">
            <CardContent className="p-3 md:p-4 flex flex-col items-center text-center">
              <Skeleton className="h-10 w-10 rounded-xl mb-2" />
              <Skeleton className="h-7 w-10 mb-1" />
              <Skeleton className="h-3 w-12" />
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Section Header Skeleton */}
      <div className="flex items-center gap-2 mb-3">
        <Skeleton className="w-1 h-5 rounded-full" />
        <Skeleton className="h-5 w-24" />
      </div>

      {/* Feature Cards Grid */}
      <div className={`grid grid-cols-2 ${columns === 3 ? 'md:grid-cols-3' : ''} gap-3`}>
        {Array.from({ length: cardCount }).map((_, i) => (
          <Card key={i} className="border-2 border-border/30 bg-muted/10">
            <CardContent className="p-4">
              <div className="flex items-center justify-between mb-3">
                <Skeleton className="h-10 w-10 rounded-xl" />
                <Skeleton className="h-4 w-4" />
              </div>
              <Skeleton className="h-5 w-24 mb-1" />
              <Skeleton className="h-3 w-32" />
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Second Section */}
      <div className="flex items-center gap-2 mb-3">
        <Skeleton className="w-1 h-5 rounded-full" />
        <Skeleton className="h-5 w-20" />
      </div>

      <div className="grid grid-cols-2 gap-3">
        {Array.from({ length: 4 }).map((_, i) => (
          <Card key={i} className="border-2 border-border/30 bg-muted/10">
            <CardContent className="p-4">
              <div className="flex items-center justify-between mb-3">
                <Skeleton className="h-10 w-10 rounded-xl" />
                <Skeleton className="h-4 w-4" />
              </div>
              <Skeleton className="h-5 w-20 mb-1" />
              <Skeleton className="h-3 w-28" />
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
