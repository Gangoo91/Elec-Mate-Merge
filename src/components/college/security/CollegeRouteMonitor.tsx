/* ==========================================================================
   CollegeRouteMonitor (ELE-1915): Sentry on every College Hub route and every
   apprentice-college route.

   - CollegeRouteBoundary wraps each College Hub page (CollegeGuard), so a
     crash on one college screen is reported to Sentry with the route, and the
     rest of the app keeps working. Apprentice pages already sit inside the
     "Apprentice Hub" boundary in AppRouter.
   - SentryRouteTags (mounted once in App) tags every event with the hub the
     person was in: college, apprentice-college or other, plus the route
     pattern with ids removed. Errors and performance traces from college
     screens can then be filtered in Sentry with hub:college.
   No learner names, emails or record ids are sent.
   ========================================================================== */

import { useEffect, type ReactNode } from 'react';
import { useLocation } from 'react-router-dom';
import * as Sentry from '@sentry/react';
import { SentryErrorBoundary } from '@/components/common/SentryErrorBoundary';

/** /college/students/3f2a.../evidence -> /college/students/:id/evidence */
export function routePattern(pathname: string): string {
  return pathname
    .split('/')
    .map((seg) =>
      /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(seg) ||
      /^\d+$/.test(seg)
        ? ':id'
        : seg
    )
    .join('/');
}

export function hubFor(pathname: string): 'college' | 'apprentice-college' | 'other' {
  if (pathname === '/college' || pathname.startsWith('/college/')) return 'college';
  if (pathname.startsWith('/apprentice/college')) return 'apprentice-college';
  return 'other';
}

export function SentryRouteTags() {
  const { pathname } = useLocation();
  useEffect(() => {
    try {
      Sentry.setTag('hub', hubFor(pathname));
      Sentry.setTag('route', routePattern(pathname));
    } catch {
      /* Sentry not initialised (dev) */
    }
  }, [pathname]);
  return null;
}

export function CollegeRouteBoundary({ children }: { children: ReactNode }) {
  return <SentryErrorBoundary section="College Hub">{children}</SentryErrorBoundary>;
}
