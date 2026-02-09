import { Skeleton } from '@/components/ui/skeleton';

/**
 * Dashboard skeleton — matches PremiumHero + LiveStatsBar + HubGrid + SmartActions + QuickAccess
 */
export const DashboardSkeleton = () => (
  <div className="min-h-screen bg-background">
    <div className="max-w-6xl mx-auto px-4 py-6 space-y-6 sm:space-y-8">
      {/* PremiumHero skeleton */}
      <div className="rounded-2xl bg-white/[0.03] border border-white/[0.08] p-6 sm:p-8 flex flex-col items-center space-y-4">
        <Skeleton className="h-20 w-20 rounded-full bg-white/5" />
        <Skeleton className="h-6 w-48 bg-white/5" />
        <Skeleton className="h-4 w-32 bg-white/5" />
        <div className="flex gap-2">
          <Skeleton className="h-6 w-20 rounded-full bg-white/5" />
          <Skeleton className="h-6 w-24 rounded-full bg-white/5" />
        </div>
      </div>

      {/* LiveStatsBar skeleton */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
        {Array.from({ length: 5 }).map((_, i) => (
          <div
            key={i}
            className="rounded-xl bg-white/[0.03] border border-white/[0.08] p-4 min-h-[80px] sm:min-h-[100px] space-y-3"
          >
            <Skeleton className="h-3 w-16 bg-white/5" />
            <Skeleton className="h-7 w-12 bg-white/5" />
          </div>
        ))}
      </div>

      {/* Hub Grid skeleton */}
      <div className="space-y-3">
        <Skeleton className="h-4 w-24 bg-white/5" />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {Array.from({ length: 3 }).map((_, i) => (
            <div
              key={i}
              className="rounded-xl bg-white/[0.03] border border-white/[0.08] p-5 min-h-[160px] sm:min-h-[180px] space-y-4"
            >
              <div className="flex items-center justify-between">
                <Skeleton className="h-10 w-10 rounded-lg bg-white/5" />
                <Skeleton className="h-5 w-16 rounded-full bg-white/5" />
              </div>
              <Skeleton className="h-5 w-3/4 bg-white/5" />
              <Skeleton className="h-4 w-full bg-white/5" />
              <Skeleton className="h-4 w-5/6 bg-white/5" />
            </div>
          ))}
        </div>
      </div>

      {/* SmartActions skeleton */}
      <div className="space-y-3">
        <Skeleton className="h-4 w-32 bg-white/5" />
        <div className="space-y-2">
          {Array.from({ length: 3 }).map((_, i) => (
            <div
              key={i}
              className="rounded-lg bg-white/[0.03] border border-white/[0.08] p-4 flex items-center gap-3"
            >
              <Skeleton className="h-8 w-8 rounded-lg bg-white/5 shrink-0" />
              <div className="flex-1 space-y-2">
                <Skeleton className="h-4 w-3/4 bg-white/5" />
                <Skeleton className="h-3 w-1/2 bg-white/5" />
              </div>
              <Skeleton className="h-5 w-5 rounded bg-white/5 shrink-0" />
            </div>
          ))}
        </div>
      </div>

      {/* QuickAccess skeleton */}
      <div className="space-y-3">
        <Skeleton className="h-4 w-28 bg-white/5" />
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
          {Array.from({ length: 6 }).map((_, i) => (
            <div
              key={i}
              className="rounded-lg bg-white/[0.03] border border-white/[0.08] p-3 flex flex-col items-center gap-2 min-h-[72px]"
            >
              <Skeleton className="h-8 w-8 rounded-lg bg-white/5" />
              <Skeleton className="h-3 w-16 bg-white/5" />
            </div>
          ))}
        </div>
      </div>
    </div>
  </div>
);

/**
 * Course/learning page skeleton — matches module list layout
 */
export const CourseSkeleton = () => (
  <div className="min-h-screen bg-background">
    <div className="max-w-4xl mx-auto px-4 py-6 space-y-6">
      {/* Course header */}
      <div className="space-y-3">
        <Skeleton className="h-8 w-3/4 bg-white/5" />
        <Skeleton className="h-4 w-1/2 bg-white/5" />
        <Skeleton className="h-2 w-full rounded-full bg-white/5" />
      </div>

      {/* Module list */}
      <div className="space-y-3">
        {Array.from({ length: 6 }).map((_, i) => (
          <div
            key={i}
            className="rounded-xl bg-white/[0.03] border border-white/[0.08] p-4 flex items-center gap-4"
          >
            <Skeleton className="h-10 w-10 rounded-lg bg-white/5 shrink-0" />
            <div className="flex-1 space-y-2">
              <Skeleton className="h-5 w-3/4 bg-white/5" />
              <Skeleton className="h-3 w-1/2 bg-white/5" />
            </div>
            <Skeleton className="h-6 w-6 rounded bg-white/5 shrink-0" />
          </div>
        ))}
      </div>
    </div>
  </div>
);

/**
 * Certificate/form page skeleton — matches inspection form layout
 */
export const CertificateSkeleton = () => (
  <div className="min-h-screen bg-background">
    <div className="max-w-4xl mx-auto px-4 py-6 space-y-6">
      {/* Certificate header with status */}
      <div className="rounded-xl bg-white/[0.03] border border-white/[0.08] p-5 space-y-3">
        <div className="flex items-center justify-between">
          <Skeleton className="h-7 w-48 bg-white/5" />
          <Skeleton className="h-6 w-20 rounded-full bg-white/5" />
        </div>
        <Skeleton className="h-4 w-64 bg-white/5" />
      </div>

      {/* Form sections */}
      {Array.from({ length: 4 }).map((_, i) => (
        <div
          key={i}
          className="rounded-xl bg-white/[0.03] border border-white/[0.08] p-5 space-y-4"
        >
          <div className="flex items-center gap-2">
            <Skeleton className="h-2 w-2 rounded-full bg-white/5" />
            <Skeleton className="h-5 w-40 bg-white/5" />
          </div>
          <div className="space-y-3">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <Skeleton className="h-11 w-full rounded-md bg-white/5" />
              <Skeleton className="h-11 w-full rounded-md bg-white/5" />
            </div>
            <Skeleton className="h-11 w-full rounded-md bg-white/5" />
          </div>
        </div>
      ))}
    </div>
  </div>
);

/**
 * Tools page skeleton — matches grid of tool cards
 */
export const ToolsSkeleton = () => (
  <div className="min-h-screen bg-background">
    <div className="max-w-6xl mx-auto px-4 py-6 space-y-6">
      {/* Page header */}
      <div className="space-y-2">
        <Skeleton className="h-8 w-56 bg-white/5" />
        <Skeleton className="h-4 w-80 bg-white/5" />
      </div>

      {/* Tool cards grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {Array.from({ length: 9 }).map((_, i) => (
          <div
            key={i}
            className="rounded-xl bg-white/[0.03] border border-white/[0.08] p-5 space-y-3 min-h-[140px]"
          >
            <div className="flex items-center gap-3">
              <Skeleton className="h-10 w-10 rounded-lg bg-white/5 shrink-0" />
              <Skeleton className="h-5 w-3/4 bg-white/5" />
            </div>
            <Skeleton className="h-4 w-full bg-white/5" />
            <Skeleton className="h-4 w-5/6 bg-white/5" />
          </div>
        ))}
      </div>
    </div>
  </div>
);

/**
 * Section-level skeleton — for inline Suspense within pages
 */
export const SectionSkeleton = () => (
  <div className="space-y-4 p-4">
    <div className="rounded-xl bg-white/[0.03] border border-white/[0.08] p-5 space-y-3">
      <Skeleton className="h-5 w-48 bg-white/5" />
      <Skeleton className="h-4 w-full bg-white/5" />
      <Skeleton className="h-4 w-3/4 bg-white/5" />
    </div>
    <div className="rounded-xl bg-white/[0.03] border border-white/[0.08] p-5 space-y-3">
      <Skeleton className="h-5 w-40 bg-white/5" />
      <Skeleton className="h-4 w-full bg-white/5" />
      <Skeleton className="h-4 w-5/6 bg-white/5" />
    </div>
  </div>
);

/**
 * Generic page skeleton — default fallback for any lazy route
 */
export const PageSkeleton = () => (
  <div className="min-h-screen bg-background">
    <div className="max-w-6xl mx-auto px-4 py-6 space-y-6">
      {/* Header area */}
      <div className="flex items-center justify-between">
        <div className="space-y-2">
          <Skeleton className="h-8 w-48 bg-white/5" />
          <Skeleton className="h-4 w-72 bg-white/5" />
        </div>
        <Skeleton className="h-10 w-10 rounded-full bg-white/5" />
      </div>

      {/* Content cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {Array.from({ length: 6 }).map((_, i) => (
          <div
            key={i}
            className="rounded-xl bg-white/[0.03] border border-white/[0.08] p-5 space-y-3"
          >
            <Skeleton className="h-5 w-3/4 bg-white/5" />
            <Skeleton className="h-4 w-full bg-white/5" />
            <Skeleton className="h-4 w-5/6 bg-white/5" />
          </div>
        ))}
      </div>
    </div>
  </div>
);
