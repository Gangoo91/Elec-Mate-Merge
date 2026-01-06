import { Link } from 'react-router-dom';
import { Home } from 'lucide-react';
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
import { useBreadcrumbs } from '@/hooks/useBreadcrumbs';
import { cn } from '@/lib/utils';

interface AutoBreadcrumbProps {
  className?: string;
  showHome?: boolean;
}

/**
 * Automatically generates breadcrumbs based on the current route.
 * Uses the route path to create a hierarchical navigation trail.
 */
export function AutoBreadcrumb({ className, showHome = true }: AutoBreadcrumbProps) {
  const breadcrumbs = useBreadcrumbs();

  // Don't render if no breadcrumbs (root level pages)
  if (breadcrumbs.length === 0) {
    return null;
  }

  return (
    <Breadcrumb className={cn('mb-4', className)}>
      <BreadcrumbList>
        {showHome && (
          <>
            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <Link to="/dashboard" className="flex items-center gap-1 hover:text-elec-yellow transition-colors">
                  <Home className="h-3.5 w-3.5" />
                  <span className="sr-only sm:not-sr-only">Home</span>
                </Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
          </>
        )}

        {breadcrumbs.map((crumb, index) => (
          <BreadcrumbItem key={crumb.href}>
            {index > 0 && <BreadcrumbSeparator />}

            {crumb.isCurrentPage ? (
              <BreadcrumbPage className="text-elec-yellow font-medium">
                {crumb.label}
              </BreadcrumbPage>
            ) : (
              <BreadcrumbLink asChild>
                <Link
                  to={crumb.href}
                  className="hover:text-elec-yellow transition-colors"
                >
                  {crumb.label}
                </Link>
              </BreadcrumbLink>
            )}
          </BreadcrumbItem>
        ))}
      </BreadcrumbList>
    </Breadcrumb>
  );
}

export default AutoBreadcrumb;
