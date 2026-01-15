import React, { memo } from 'react';
import { ArrowLeft, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface Breadcrumb {
  label: string;
  href?: string;
}

interface AM2SectionLayoutProps {
  backHref: string;
  breadcrumbs: (string | Breadcrumb)[];
  children: React.ReactNode;
  className?: string;
}

/**
 * AM2SectionLayout - Master wrapper component for AM2 content pages
 * Features sticky header with back navigation, breadcrumbs, safe area padding,
 * and stagger animation container for children.
 */
export const AM2SectionLayout = memo(function AM2SectionLayout({
  backHref,
  breadcrumbs,
  children,
  className,
}: AM2SectionLayoutProps) {
  return (
    <div className={cn('min-h-screen overflow-x-hidden bg-[#1a1a1a]', className)}>
      {/* Sticky Header */}
      <header className="sticky top-0 z-50 bg-[#1a1a1a]/95 backdrop-blur-xl border-b border-white/10 safe-top">
        <div className="px-4 sm:px-6 py-3">
          <div className="flex items-center gap-3">
            {/* Back Button */}
            <Button
              variant="ghost"
              size="sm"
              className={cn(
                'min-h-[44px] min-w-[44px] p-2 -ml-2',
                'text-white/70 hover:text-white hover:bg-white/5',
                'touch-manipulation active:scale-[0.98] transition-all duration-ios-normal ease-ios-ease'
              )}
              asChild
            >
              <Link to={backHref}>
                <ArrowLeft className="w-5 h-5" />
              </Link>
            </Button>

            {/* Breadcrumbs */}
            <nav className="flex items-center gap-1.5 overflow-x-auto scrollbar-none">
              {breadcrumbs.map((crumb, index) => {
                const label = typeof crumb === 'string' ? crumb : crumb.label;
                const href = typeof crumb === 'string' ? undefined : crumb.href;
                const isLast = index === breadcrumbs.length - 1;

                return (
                  <React.Fragment key={index}>
                    {index > 0 && (
                      <ChevronRight className="w-3.5 h-3.5 text-white/30 flex-shrink-0" />
                    )}
                    {href && !isLast ? (
                      <Link
                        to={href}
                        className={cn(
                          'text-ios-footnote whitespace-nowrap text-white/50',
                          'hover:text-white/70 transition-colors'
                        )}
                      >
                        {label}
                      </Link>
                    ) : (
                      <span
                        className={cn(
                          'text-ios-footnote whitespace-nowrap',
                          isLast ? 'text-white font-medium' : 'text-white/50'
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

      {/* Main Content with Safe Area Padding and Stagger Animation */}
      <main className="px-4 sm:px-6 py-6 safe-bottom">
        <div className="max-w-3xl mx-auto ios-stagger-children">
          {children}
        </div>
      </main>
    </div>
  );
});

export default AM2SectionLayout;
