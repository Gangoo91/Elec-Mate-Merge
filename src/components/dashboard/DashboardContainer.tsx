/**
 * DashboardContainer
 *
 * Simple container wrapper for the dashboard with proper background.
 * Keeps scrolling simple - no custom touch handling.
 */

import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface DashboardContainerProps {
  children: React.ReactNode;
  className?: string;
}

export const DashboardContainer: React.FC<DashboardContainerProps> = ({
  children,
  className,
}) => {
  return (
    <div
      className={cn(
        // Background matches sidebar exactly: hsl(240, 5.9%, 10%)
        'bg-[hsl(240,5.9%,10%)]',
        className
      )}
    >
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
        className={cn(
          // Max-width constraint with centering
          'mx-auto max-w-6xl',
          // Horizontal padding for mobile
          'px-4 sm:px-0',
          // Vertical spacing - minimal on mobile
          'py-1 sm:py-4 md:py-6 lg:py-8'
        )}
      >
        {children}
      </motion.div>
    </div>
  );
};

export default DashboardContainer;
