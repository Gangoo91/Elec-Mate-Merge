/**
 * DashboardContainer
 *
 * Max-width container wrapper for the dashboard with proper background
 * that matches the sidebar color exactly.
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
        // Full height with sidebar-matching background
        'min-h-screen',
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
          // Max-width constraint with centering - NO horizontal padding
          'mx-auto max-w-6xl',
          // Only vertical spacing
          'py-4 md:py-6 lg:py-8',
          // Safe area padding for mobile (notch devices)
          'pb-safe'
        )}
      >
        {children}
      </motion.div>
    </div>
  );
};

export default DashboardContainer;
