/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';

interface SectionTitleProps {
  icon?: React.ElementType;
  title: string;
  color?: string;
  isOpen?: boolean;
  badge?: string;
  isMobile?: boolean;
}

const SectionTitle = ({ title }: SectionTitleProps) => (
  <div className="border-b border-white/[0.06] pb-1 mb-3">
    <div className="h-[2px] w-full rounded-full bg-gradient-to-r from-elec-yellow/40 to-elec-yellow/10 mb-2" />
    <h2 className="text-xs font-medium text-white uppercase tracking-wider">{title}</h2>
  </div>
);

export default SectionTitle;
