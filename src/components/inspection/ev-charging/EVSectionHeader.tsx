import React from 'react';

/**
 * Shared section header for the EV charging form. Plain typographic heading —
 * no icons, no accent rules (design system: typography carries hierarchy).
 * Used as SectionHeader/SectionHeading/SectionTitle across the four tabs.
 */
export const EVSectionHeader: React.FC<{ title: string }> = ({ title }) => (
  <h2 className="mb-3 text-[15px] font-semibold tracking-tight text-white">{title}</h2>
);

export default EVSectionHeader;
