import { ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface PageTransitionProps {
  children: ReactNode;
  className?: string;
}

/**
 * Wrapper component that adds a fade-in animation to page content.
 * Use this to wrap the main content of each page for consistent transitions.
 */
export function PageTransition({ children, className }: PageTransitionProps) {
  return (
    <div className={cn('animate-fade-in', className)}>
      {children}
    </div>
  );
}

export default PageTransition;
