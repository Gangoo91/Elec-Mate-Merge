import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

interface ListSkeletonProps {
  /** Number of list items to show */
  itemCount?: number;
  /** Whether to show a search bar */
  showSearch?: boolean;
  /** Whether to show filter chips */
  showFilters?: boolean;
  /** Number of filter chips */
  filterCount?: number;
}

/**
 * Consistent loading skeleton for list pages.
 * Shows search bar + filter chips + list items.
 */
export function ListSkeleton({
  itemCount = 5,
  showSearch = true,
  showFilters = true,
  filterCount = 4
}: ListSkeletonProps) {
  return (
    <div className="space-y-4 pb-6 animate-pulse">
      {/* Search Bar */}
      {showSearch && (
        <Skeleton className="h-11 w-full rounded-lg" />
      )}

      {/* Filter Chips */}
      {showFilters && (
        <div className="flex gap-2 overflow-x-auto hide-scrollbar pb-1">
          {Array.from({ length: filterCount }).map((_, i) => (
            <Skeleton key={i} className="h-8 w-20 rounded-full shrink-0" />
          ))}
        </div>
      )}

      {/* List Items */}
      <div className="space-y-3">
        {Array.from({ length: itemCount }).map((_, i) => (
          <Card key={i} className="border-border/30 bg-muted/10">
            <CardContent className="p-4">
              <div className="flex items-start gap-3">
                {/* Avatar/Icon */}
                <Skeleton className="h-12 w-12 rounded-full shrink-0" />

                {/* Content */}
                <div className="flex-1 min-w-0 space-y-2">
                  <div className="flex items-center justify-between gap-2">
                    <Skeleton className="h-5 w-32" />
                    <Skeleton className="h-5 w-16 rounded-full" />
                  </div>
                  <Skeleton className="h-4 w-48" />
                  <div className="flex items-center gap-2">
                    <Skeleton className="h-3 w-20" />
                    <Skeleton className="h-3 w-24" />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}

/**
 * Compact list skeleton for simple lists without cards
 */
export function CompactListSkeleton({ itemCount = 6 }: { itemCount?: number }) {
  return (
    <div className="space-y-2 animate-pulse">
      {Array.from({ length: itemCount }).map((_, i) => (
        <div key={i} className="flex items-center gap-3 p-3 rounded-lg bg-muted/10">
          <Skeleton className="h-10 w-10 rounded-lg shrink-0" />
          <div className="flex-1 space-y-1.5">
            <Skeleton className="h-4 w-3/4" />
            <Skeleton className="h-3 w-1/2" />
          </div>
          <Skeleton className="h-4 w-4" />
        </div>
      ))}
    </div>
  );
}
