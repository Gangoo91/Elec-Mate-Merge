import React from 'react';
import { ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';

interface SettingsRowProps {
  /** Top label — rendered as a small uppercase eyebrow */
  label: string;
  /** Bottom value — the actual field value */
  value: React.ReactNode;
  /** Optional trailing slot (pill, text action, etc.) */
  trailing?: React.ReactNode;
  /** If set, the row becomes a drill-in button and ends with a chevron */
  onClick?: () => void;
  className?: string;
  disabled?: boolean;
}

/**
 * Canonical key/value row for Settings. Label is a 10px uppercase eyebrow,
 * value is 15px. Both white — nothing on this ground is allowed to be grey.
 */
const SettingsRow: React.FC<SettingsRowProps> = ({
  label,
  value,
  trailing,
  onClick,
  className,
  disabled = false,
}) => {
  const Inner = (
    <>
      <div className="min-w-0 flex-1">
        <div className="text-[10px] font-semibold uppercase tracking-[0.16em] text-white">{label}</div>
        <div className="mt-1 truncate text-[15px] text-white">{value}</div>
      </div>
      {trailing ? (
        <div className="shrink-0">{trailing}</div>
      ) : onClick ? (
        <ChevronRight className="h-4 w-4 shrink-0 text-white transition-transform group-hover:translate-x-0.5 group-hover:text-elec-yellow" />
      ) : null}
    </>
  );

  const base = 'flex w-full items-center gap-4 px-4 py-3.5 text-left touch-manipulation sm:px-5';

  if (onClick) {
    return (
      <button
        type="button"
        onClick={onClick}
        disabled={disabled}
        className={cn(
          base,
          'group transition-colors hover:bg-white/[0.04]',
          disabled && 'cursor-not-allowed opacity-50',
          className
        )}
      >
        {Inner}
      </button>
    );
  }

  return <div className={cn(base, className)}>{Inner}</div>;
};

export default SettingsRow;
