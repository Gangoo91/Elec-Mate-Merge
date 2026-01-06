import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export function TalentProfileCardSkeleton() {
  return (
    <Card className="bg-gradient-to-br from-elec-gray/50 via-background to-elec-yellow/5 border-2 border-border/50">
      <CardContent className="p-4">
        <div className="flex items-start gap-3">
          {/* Avatar skeleton */}
          <Skeleton className="w-12 h-12 rounded-full shrink-0" />

          {/* Content skeleton */}
          <div className="flex-1 min-w-0 space-y-2">
            <Skeleton className="h-5 w-32" />
            <Skeleton className="h-4 w-24" />
            <div className="flex gap-2">
              <Skeleton className="h-5 w-16 rounded-full" />
              <Skeleton className="h-5 w-20 rounded-full" />
            </div>
          </div>

          {/* Rate skeleton */}
          <div className="text-right shrink-0 space-y-1">
            <Skeleton className="h-6 w-14 ml-auto" />
            <Skeleton className="h-3 w-8 ml-auto" />
          </div>
        </div>

        {/* Actions skeleton */}
        <div className="flex gap-2 mt-3 pt-3 border-t border-border">
          <Skeleton className="h-9 flex-1" />
          <Skeleton className="h-9 flex-1" />
          <Skeleton className="h-9 flex-1" />
        </div>
      </CardContent>
    </Card>
  );
}

export function TalentProfileCardSkeletonGrid({ count = 5 }: { count?: number }) {
  return (
    <div className="space-y-3">
      {Array.from({ length: count }).map((_, i) => (
        <TalentProfileCardSkeleton key={i} />
      ))}
    </div>
  );
}
