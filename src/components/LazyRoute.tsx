import { Suspense, ReactNode } from 'react';
import { PageSkeleton } from '@/components/ui/page-skeleton';

export const LazyRoute = ({ children }: { children: ReactNode }) => (
  <Suspense fallback={<PageSkeleton />}>{children}</Suspense>
);

export default LazyRoute;
