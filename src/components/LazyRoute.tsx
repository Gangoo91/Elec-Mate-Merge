import { Suspense, ReactNode } from 'react';
import { Skeleton } from '@/components/ui/skeleton';

const PageLoadingFallback = () => (
  <div className="min-h-screen bg-background p-4 space-y-6">
    {/* Header skeleton */}
    <div className="flex items-center justify-between">
      <Skeleton className="h-8 w-48" />
      <Skeleton className="h-10 w-10 rounded-full" />
    </div>

    {/* Hero section skeleton */}
    <div className="space-y-4">
      <Skeleton className="h-12 w-3/4" />
      <Skeleton className="h-6 w-1/2" />
    </div>

    {/* Content cards skeleton */}
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {Array.from({ length: 6 }).map((_, i) => (
        <div key={i} className="p-4 border border-border rounded-lg space-y-3">
          <Skeleton className="h-6 w-3/4" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-5/6" />
        </div>
      ))}
    </div>
  </div>
);

export const LazyRoute = ({ children }: { children: ReactNode }) => (
  <Suspense fallback={<PageLoadingFallback />}>
    {children}
  </Suspense>
);

export default LazyRoute;
