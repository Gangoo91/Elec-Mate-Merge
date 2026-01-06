import { useMemo } from 'react';
import { useLocation } from 'react-router-dom';

export interface BreadcrumbItem {
  label: string;
  href: string;
  isCurrentPage: boolean;
}

// Route label mapping - customize these for your app
const routeLabels: Record<string, string> = {
  '': 'Home',
  'dashboard': 'Dashboard',
  'profile': 'Profile',
  'settings': 'Settings',
  'notifications': 'Notifications',
  'subscriptions': 'Subscriptions',
  'apprentice': 'Apprentice',
  'electrician': 'Electrician Hub',
  'employer': 'Employer',
  'college': 'College',
  'study-centre': 'Study Centre',
  'admin': 'Admin',
  'inspection-testing': 'Inspection & Testing',
  'upskilling': 'Upskilling',
  'calculators': 'Calculators',
  'materials': 'Materials',
  'quotes': 'Quotes',
  'invoices': 'Invoices',
  'customers': 'Customers',
  'mental-health': 'Mental Health',
  'rights-and-pay': 'Rights & Pay',
  'level2': 'Level 2',
  'level3': 'Level 3',
  'am2': 'AM2',
  'cable-sizing': 'Cable Sizing',
  'voltage-drop': 'Voltage Drop',
  'adiabatic': 'Adiabatic',
  'circuit-designer': 'Circuit Designer',
  'eicr': 'EICR',
  'eic': 'EIC',
  'minor-works': 'Minor Works',
};

// Routes to hide from breadcrumbs (too deep or redundant)
const hiddenSegments = ['view', 'edit', 'new', 'create'];

/**
 * Hook to generate breadcrumb items based on current route
 */
export function useBreadcrumbs(): BreadcrumbItem[] {
  const location = useLocation();

  return useMemo(() => {
    const pathSegments = location.pathname.split('/').filter(Boolean);

    // Don't show breadcrumbs on root pages
    if (pathSegments.length <= 1) {
      return [];
    }

    const breadcrumbs: BreadcrumbItem[] = [];
    let currentPath = '';

    pathSegments.forEach((segment, index) => {
      // Skip hidden segments and UUIDs
      if (hiddenSegments.includes(segment) || isUUID(segment)) {
        return;
      }

      currentPath += `/${segment}`;
      const isLast = index === pathSegments.length - 1;

      // Get human-readable label
      const label = routeLabels[segment] || formatSegmentLabel(segment);

      breadcrumbs.push({
        label,
        href: currentPath,
        isCurrentPage: isLast,
      });
    });

    return breadcrumbs;
  }, [location.pathname]);
}

// Helper to check if string is a UUID
function isUUID(str: string): boolean {
  const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
  return uuidRegex.test(str);
}

// Helper to format segment to title case
function formatSegmentLabel(segment: string): string {
  return segment
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}

export default useBreadcrumbs;
