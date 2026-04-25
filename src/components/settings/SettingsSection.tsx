import React from 'react';
import { cn } from '@/lib/utils';
import { Eyebrow } from '@/components/college/primitives';

interface SettingsSectionProps {
  title: string;
  description?: string;
  eyebrow?: string;
  children: React.ReactNode;
  className?: string;
  action?: React.ReactNode;
}

/**
 * Editorial section wrapper — replaces the old iconed card header.
 * Title + optional description sit above the children, which should
 * be a college-primitive ListCard or grid.
 */
const SettingsSection: React.FC<SettingsSectionProps> = ({
  title,
  description,
  eyebrow,
  children,
  className,
  action,
}) => {
  return (
    <section className={cn('space-y-3', className)}>
      <div className="flex items-end justify-between gap-4">
        <div className="min-w-0">
          {eyebrow && <Eyebrow>{eyebrow}</Eyebrow>}
          <h3 className="mt-1 text-base sm:text-lg font-semibold text-white tracking-tight">
            {title}
          </h3>
          {description && (
            <p className="mt-1 text-[12.5px] text-white leading-relaxed max-w-2xl">
              {description}
            </p>
          )}
        </div>
        {action && <div className="shrink-0">{action}</div>}
      </div>
      {children}
    </section>
  );
};

export default SettingsSection;
