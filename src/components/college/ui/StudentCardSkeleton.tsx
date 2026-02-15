/**
 * Skeleton loading card that matches the student card layout exactly.
 * Shows animated pulse placeholders while data loads from Supabase.
 */
export function StudentCardSkeleton() {
  return (
    <div className="relative overflow-hidden rounded-lg border border-elec-yellow/10 bg-elec-gray animate-pulse">
      {/* Gradient accent line */}
      <div className="absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-elec-yellow/30 via-amber-400/20 to-elec-yellow/10" />

      <div className="p-4">
        <div className="flex items-start gap-4">
          {/* Avatar skeleton */}
          <div className="h-12 w-12 rounded-full bg-white/10 shrink-0" />

          <div className="flex-1 min-w-0 space-y-3">
            {/* Name + badges row */}
            <div className="flex items-start justify-between gap-2">
              <div className="space-y-1.5">
                <div className="h-4 w-32 bg-white/10 rounded" />
                <div className="h-3 w-24 bg-white/5 rounded" />
              </div>
              <div className="flex gap-2">
                <div className="h-5 w-14 bg-white/10 rounded-full" />
              </div>
            </div>

            {/* Contact row */}
            <div className="flex gap-4">
              <div className="h-3 w-36 bg-white/5 rounded" />
              <div className="h-3 w-24 bg-white/5 rounded" />
            </div>

            {/* Cohort badge */}
            <div className="h-5 w-28 bg-white/10 rounded-full" />

            {/* Progress bar */}
            <div className="space-y-1">
              <div className="flex justify-between">
                <div className="h-3 w-14 bg-white/5 rounded" />
                <div className="h-3 w-8 bg-white/5 rounded" />
              </div>
              <div className="h-1.5 w-full bg-white/10 rounded-full" />
            </div>

            {/* Stats row */}
            <div className="flex gap-4">
              <div className="h-3 w-24 bg-white/5 rounded" />
              <div className="h-3 w-20 bg-white/5 rounded" />
              <div className="h-3 w-28 bg-white/5 rounded" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export function StudentCardSkeletonList({ count = 4 }: { count?: number }) {
  return (
    <div className="grid gap-3">
      {Array.from({ length: count }).map((_, i) => (
        <StudentCardSkeleton key={i} />
      ))}
    </div>
  );
}
