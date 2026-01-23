/**
 * CareerSectionList - iOS-style grouped list container
 *
 * Wraps CareerListItem components with proper styling:
 * - Rounded container with subtle border
 * - Dividers between items
 */

import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface CareerSectionListProps {
  children: React.ReactNode;
  className?: string;
}

export const CareerSectionList: React.FC<CareerSectionListProps> = ({
  children,
  className,
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.25 }}
      className={cn(
        "bg-white/[0.03] rounded-2xl border border-white/10 overflow-hidden",
        "divide-y divide-white/[0.06]",
        className
      )}
    >
      {children}
    </motion.div>
  );
};

export default CareerSectionList;
