/**
 * Editorial primitives shared across the portfolio dashboard.
 * Eyebrow, KPI cell, section header — kept in one place so the dashboard
 * stays declarative and components compose cleanly.
 */

import { cn } from '@/lib/utils';

export const Eyebrow = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => (
  <span
    className={cn(
      'text-[10px] font-medium uppercase tracking-[0.18em] text-elec-yellow',
      className
    )}
  >
    {children}
  </span>
);

export const SectionHeader = ({
  eyebrow,
  title,
  meta,
  action,
}: {
  eyebrow?: string;
  title: string;
  meta?: string;
  action?: React.ReactNode;
}) => (
  <div className="flex items-end justify-between gap-3 pb-1">
    <div className="space-y-1 min-w-0">
      {eyebrow && <Eyebrow>{eyebrow}</Eyebrow>}
      <h3 className="text-[18px] sm:text-[20px] font-semibold text-white tracking-tight leading-tight">
        {title}
      </h3>
      {meta && <p className="text-[12px] leading-snug text-white">{meta}</p>}
    </div>
    {action && <div className="flex-shrink-0">{action}</div>}
  </div>
);

export const KpiCell = ({
  label,
  value,
  sub,
  highlight,
  onClick,
}: {
  label: string;
  value: string | number;
  sub?: string;
  highlight?: boolean;
  onClick?: () => void;
}) => {
  const Tag = onClick ? 'button' : 'div';
  return (
    <Tag
      onClick={onClick}
      className={cn(
        'rounded-xl border border-elec-yellow/35 bg-gradient-to-br from-white/[0.19] via-white/[0.105] to-white/[0.065] shadow-[inset_0_1px_0_0_rgba(255,255,255,0.16),0_2px_10px_-4px_rgba(0,0,0,0.65)] p-3 sm:p-4 text-left space-y-1.5',
        onClick && 'touch-manipulation hover:bg-white/[0.03] transition-colors active:scale-[0.99]'
      )}
    >
      <Eyebrow>{label}</Eyebrow>
      <div
        className={cn(
          'text-[22px] sm:text-[26px] font-mono font-semibold tabular-nums leading-none',
          highlight ? 'text-elec-yellow' : 'text-white'
        )}
      >
        {value}
      </div>
      {sub && <span className="block text-[11px] text-white">{sub}</span>}
    </Tag>
  );
};

export const PrimaryAction = ({
  label,
  onClick,
  className,
}: {
  label: React.ReactNode;
  onClick: () => void;
  className?: string;
}) => (
  <button
    onClick={onClick}
    className={cn(
      'h-12 rounded-xl bg-elec-yellow text-black font-semibold text-[14px] hover:bg-elec-yellow/90 transition-colors touch-manipulation inline-flex items-center justify-center gap-2',
      className
    )}
  >
    {label}
  </button>
);

export const SecondaryAction = ({
  label,
  onClick,
  className,
}: {
  label: React.ReactNode;
  onClick: () => void;
  className?: string;
}) => (
  <button
    onClick={onClick}
    className={cn(
      'h-12 rounded-xl border border-elec-yellow/35 bg-gradient-to-br from-white/[0.19] via-white/[0.105] to-white/[0.065] shadow-[inset_0_1px_0_0_rgba(255,255,255,0.16),0_2px_10px_-4px_rgba(0,0,0,0.65)] text-white text-[13px] font-semibold hover:bg-white/[0.04] transition-colors touch-manipulation inline-flex items-center justify-center gap-2',
      className
    )}
  >
    {label}
  </button>
);
