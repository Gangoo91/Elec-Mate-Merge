/**
 * Solar PV Certificate — Shared Design Primitives
 * Paper-form card recipe shared across all Solar PV tabs.
 */

import { Label } from '@/components/ui/label';
import { cn } from '@/lib/utils';

// ============================================================================
// CSS Constants
// ============================================================================

export const cardCn =
  '-mx-4 rounded-none border-y border-white/[0.14] sm:mx-0 sm:rounded-2xl sm:border-x bg-gradient-to-b from-white/[0.08] to-white/[0.04] p-4 sm:p-5 space-y-4';

export const inputCn =
  'input-underline h-11 w-full rounded-none border-0 border-b border-white/[0.15] bg-transparent px-1 text-base md:text-base font-medium text-white placeholder:font-normal placeholder:text-white/25 caret-elec-yellow transition-colors duration-150 hover:border-white/[0.3] focus:border-elec-yellow focus-visible:ring-0 focus:ring-0 focus:outline-none focus:shadow-none !leading-[2.75rem] [color-scheme:dark] touch-manipulation';

export const inputSmCn = inputCn;

export const textareaCn =
  'textarea-soft rounded-xl border-0 bg-white/[0.05] px-3.5 py-3 text-base md:text-base text-white placeholder:text-white/25 caret-elec-yellow transition-colors focus:bg-white/[0.07] focus:ring-1 focus:ring-elec-yellow/50 focus-visible:ring-1 focus-visible:ring-elec-yellow/50 focus:outline-none focus:shadow-none min-h-[90px] touch-manipulation';

export const labelCn = 'text-[12px] font-medium text-white mb-1 block';

export const pickerTriggerCn =
  'h-11 rounded-none border-0 border-b border-white/[0.15] bg-transparent px-1 text-base font-medium text-white hover:bg-transparent hover:border-white/[0.3] focus:border-elec-yellow focus:ring-0 focus-visible:ring-0 focus:outline-none active:scale-100 touch-manipulation';

// ============================================================================
// Section Component — full-bleed card on phones, rounded from sm
// ============================================================================

export const Section = ({
  title,
  count,
  className,
  children,
}: {
  title: string;
  accentColor?: string;
  count?: number;
  className?: string;
  children: React.ReactNode;
}) => (
  <div className={cn(cardCn, className)}>
    <h2 className="mb-3 flex items-baseline gap-2 text-[15px] font-semibold tracking-tight text-white">
      {title}
      {count !== undefined && (
        <span className="rounded bg-white/[0.1] px-2 py-0.5 text-[11px] font-semibold text-white">
          {count}
        </span>
      )}
    </h2>
    {children}
  </div>
);

// ============================================================================
// Field Component — label + children
// ============================================================================

export const Field = ({ label, children }: { label: string; children: React.ReactNode }) => (
  <div>
    <Label className={labelCn}>{label}</Label>
    {children}
  </div>
);

// ============================================================================
// TestResultRow — pass/fail/na tappable buttons
// ============================================================================

export const TestResultRow = ({
  label,
  value,
  onChange,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
}) => (
  <div className="flex items-center justify-between gap-3 rounded-xl bg-white/[0.05] p-3">
    <span className="flex-1 text-sm font-medium text-white">{label}</span>
    <div className="flex gap-1.5">
      {[
        { val: 'pass', label: 'Pass', active: 'bg-green-500 border-green-500 text-black' },
        { val: 'fail', label: 'Fail', active: 'bg-red-500 border-red-500 text-white' },
        { val: 'na', label: 'N/A', active: 'bg-white/[0.25] border-white/[0.25] text-white' },
      ].map((btn) => (
        <button
          key={btn.val}
          type="button"
          onClick={() => onChange(btn.val)}
          className={cn(
            'h-11 rounded-xl border px-3 text-xs font-semibold touch-manipulation active:scale-[0.98] transition-all',
            value === btn.val ? btn.active : 'bg-white/[0.06] border-white/[0.12] text-white'
          )}
        >
          {btn.label}
        </button>
      ))}
    </div>
  </div>
);

// ============================================================================
// AllPassButton — mark all tests as pass
// ============================================================================

export const AllPassButton = ({ onClick }: { onClick: () => void }) => (
  <button
    type="button"
    onClick={onClick}
    className="h-11 rounded-xl bg-green-500 px-4 text-sm font-semibold text-black touch-manipulation active:scale-[0.98]"
  >
    Mark All Pass
  </button>
);

// ============================================================================
// CheckboxCard — full-width tappable card with SVG checkmark
// ============================================================================

export const CheckboxCard = ({
  label,
  description,
  checked,
  onChange,
  accentColor = 'amber',
}: {
  label: string;
  description?: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
  accentColor?: 'amber' | 'green' | 'blue' | 'red' | 'purple';
}) => {
  const colorMap = {
    amber: { border: 'border-elec-yellow/60', check: 'bg-elec-yellow border-elec-yellow', tick: 'text-black' },
    green: { border: 'border-green-500/60', check: 'bg-green-500 border-green-500', tick: 'text-black' },
    blue: { border: 'border-blue-500/60', check: 'bg-blue-500 border-blue-500', tick: 'text-white' },
    red: { border: 'border-red-500/60', check: 'bg-red-500 border-red-500', tick: 'text-white' },
    purple: { border: 'border-purple-500/60', check: 'bg-purple-500 border-purple-500', tick: 'text-white' },
  };
  const colors = colorMap[accentColor];

  return (
    <button
      type="button"
      onClick={() => onChange(!checked)}
      className={cn(
        'w-full rounded-xl border bg-white/[0.06] p-4 text-left touch-manipulation active:scale-[0.98] transition-all',
        checked ? colors.border : 'border-white/[0.12]'
      )}
    >
      <div className="flex items-center gap-3">
        <div
          className={cn(
            'flex h-5 w-5 flex-shrink-0 items-center justify-center rounded border-2 transition-all',
            checked ? colors.check : 'border-white/40'
          )}
        >
          {checked && (
            <svg
              className={cn('h-3 w-3', colors.tick)}
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={3}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
            </svg>
          )}
        </div>
        <div>
          <p className="text-sm font-semibold text-white">{label}</p>
          {description && <p className="mt-0.5 text-xs text-white/80">{description}</p>}
        </div>
      </div>
    </button>
  );
};

// ============================================================================
// ResultPill — read-only pass/fail/na indicator (for auto-calculated results)
// ============================================================================

export const ResultPill = ({ result }: { result: 'pass' | 'fail' | 'na' | '' }) => {
  if (!result) return null;
  const styles = {
    pass: 'border-green-500/40 text-green-400',
    fail: 'border-red-500/40 text-red-400',
    na: 'border-white/[0.15] text-white/80',
  };
  const labels = { pass: 'Pass', fail: 'Fail', na: 'N/A' };
  return (
    <span
      className={cn(
        'rounded-lg border bg-white/[0.06] px-2 py-1 text-xs font-semibold',
        styles[result]
      )}
    >
      {labels[result]}
    </span>
  );
};

// ============================================================================
// DesignWarningBanner — displays smart form warnings
// ============================================================================

export const DesignWarningBanner = ({
  warnings,
}: {
  warnings: { field: string; message: string; severity: 'warning' | 'error' }[];
}) => {
  if (warnings.length === 0) return null;

  const errors = warnings.filter((w) => w.severity === 'error');
  const warns = warnings.filter((w) => w.severity === 'warning');

  return (
    <div className="space-y-2">
      {errors.map((w, i) => (
        <div key={`err-${i}`} className="rounded-xl border border-red-500/40 bg-white/[0.05] p-3">
          <p className="text-sm text-white">
            <span className="font-semibold text-red-400">Error: </span>
            {w.message}
          </p>
        </div>
      ))}
      {warns.map((w, i) => (
        <div
          key={`warn-${i}`}
          className="rounded-xl border border-elec-yellow/40 bg-white/[0.05] p-3"
        >
          <p className="text-sm text-white">
            <span className="font-semibold text-elec-yellow">Check: </span>
            {w.message}
          </p>
        </div>
      ))}
    </div>
  );
};
