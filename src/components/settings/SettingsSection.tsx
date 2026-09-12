import React from 'react';
import { cn } from '@/lib/utils';

interface SettingsSectionProps {
  title: string;
  description?: string;
  eyebrow?: string;
  children: React.ReactNode;
  className?: string;
  action?: React.ReactNode;
}

/**
 * Section wrapper: a hub-style volt heading over the children. Title carries
 * the hierarchy; the optional eyebrow is a small category word above it.
 */
const SettingsSection: React.FC<SettingsSectionProps> = ({
  title,
  description,
  eyebrow,
  children,
  className,
  action,
}) => (
  <section className={cn('space-y-3', className)}>
    <div className="flex items-end justify-between gap-4">
      <div className="min-w-0">
        {eyebrow && (
          <div className="text-[10px] font-semibold uppercase tracking-[0.16em] text-white">{eyebrow}</div>
        )}
        <h3 className="mt-1 text-[15px] font-semibold tracking-tight text-elec-yellow">{title}</h3>
        {description && (
          <p className="mt-1 max-w-2xl text-[12.5px] leading-relaxed text-white">{description}</p>
        )}
      </div>
      {action && <div className="shrink-0">{action}</div>}
    </div>
    {children}
  </section>
);

export default SettingsSection;
