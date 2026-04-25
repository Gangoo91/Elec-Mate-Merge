import React, { memo, useEffect } from 'react';
import { ArrowLeft, ChevronRight } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { useLastStudyLocation } from '@/hooks/useLastStudyLocation';

interface Breadcrumb {
  label: string;
  href?: string;
}

interface AM2SectionLayoutProps {
  backHref: string;
  breadcrumbs: (string | Breadcrumb)[];
  children: React.ReactNode;
  className?: string;
  trackingTitle?: string;
}

export const AM2SectionLayout = memo(function AM2SectionLayout({
  backHref,
  breadcrumbs,
  children,
  className,
  trackingTitle,
}: AM2SectionLayoutProps) {
  const location = useLocation();
  const { updateLastLocation } = useLastStudyLocation();

  useEffect(() => {
    const lastBreadcrumb = breadcrumbs[breadcrumbs.length - 1];
    const title =
      trackingTitle ||
      (typeof lastBreadcrumb === 'string' ? lastBreadcrumb : lastBreadcrumb?.label) ||
      'Learning';
    updateLastLocation(location.pathname, title);
  }, [location.pathname, breadcrumbs, trackingTitle, updateLastLocation]);

  return (
    <div className={cn('min-h-screen overflow-x-hidden bg-[hsl(0_0%_8%)] text-white', className)}>
      {/* Sticky header — solid surface, hairline border */}
      <header className="sticky top-0 z-30 bg-[hsl(0_0%_8%)]/95 backdrop-blur-xl border-b border-white/[0.06]">
        <div className="px-4 sm:px-6 lg:px-8 py-3">
          <div className="max-w-5xl mx-auto flex items-center gap-3">
            <Link
              to={backHref}
              className="inline-flex items-center justify-center h-10 w-10 rounded-full bg-white/[0.06] border border-white/[0.1] text-white hover:bg-white/[0.1] transition-colors touch-manipulation active:scale-[0.98] shrink-0"
              aria-label="Back"
            >
              <ArrowLeft className="h-4 w-4" />
            </Link>
            <nav className="flex items-center gap-1.5 overflow-x-auto scrollbar-none flex-1 min-w-0">
              {breadcrumbs.map((crumb, index) => {
                const label = typeof crumb === 'string' ? crumb : crumb.label;
                const href = typeof crumb === 'string' ? undefined : crumb.href;
                const isLast = index === breadcrumbs.length - 1;
                return (
                  <React.Fragment key={index}>
                    {index > 0 && (
                      <ChevronRight className="w-3 h-3 text-white shrink-0" />
                    )}
                    {href && !isLast ? (
                      <Link
                        to={href}
                        className="text-[11.5px] whitespace-nowrap text-white hover:text-elec-yellow transition-colors"
                      >
                        {label}
                      </Link>
                    ) : (
                      <span
                        className={cn(
                          'text-[11.5px] whitespace-nowrap',
                          isLast ? 'text-white font-semibold' : 'text-white'
                        )}
                      >
                        {label}
                      </span>
                    )}
                  </React.Fragment>
                );
              })}
            </nav>
          </div>
        </div>
      </header>

      <main className="px-4 sm:px-6 lg:px-8 py-6 sm:py-8 pb-24">
        <div className="max-w-5xl mx-auto space-y-5">{children}</div>
      </main>
    </div>
  );
});

export default AM2SectionLayout;
