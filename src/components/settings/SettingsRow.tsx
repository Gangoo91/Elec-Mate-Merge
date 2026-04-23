import React from 'react';
import { cn } from '@/lib/utils';
import { Arrow, Eyebrow } from '@/components/college/primitives';

interface SettingsRowProps {
  /** Top label — rendered as uppercase eyebrow */
  label: string;
  /** Bottom value — the actual field value */
  value: React.ReactNode;
  /** Optional trailing slot (pill, text action, arrow, etc.) */
  trailing?: React.ReactNode;
  /** If set, the row becomes a drill-in button and ends with an Arrow */
  onClick?: () => void;
  className?: string;
  disabled?: boolean;
}

/**
 * Canonical key/value row for Settings. Label is 10px uppercase white/40,
 * value is 15px white. If onClick is set, a trailing Arrow is rendered
 * unless a custom trailing slot is supplied.
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
      <div className="flex-1 min-w-0">
        <Eyebrow>{label}</Eyebrow>
        <div className="mt-1 text-[15px] text-white truncate">{value}</div>
      </div>
      {trailing ? (
        <div className="shrink-0">{trailing}</div>
      ) : onClick ? (
        <Arrow />
      ) : null}
    </>
  );

  const base =
    'w-full flex items-center gap-4 px-5 sm:px-6 py-4 sm:py-5 text-left touch-manipulation';

  if (onClick) {
    return (
      <button
        type="button"
        onClick={onClick}
        disabled={disabled}
        className={cn(
          base,
          'group hover:bg-[hsl(0_0%_15%)] transition-colors',
          disabled && 'opacity-50 cursor-not-allowed',
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
