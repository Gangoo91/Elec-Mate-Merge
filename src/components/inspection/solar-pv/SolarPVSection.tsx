/* eslint-disable @typescript-eslint/no-explicit-any */
/**
 * Solar PV Certificate — Shared Design Primitives
 * Matches fire alarm cert best-in-class mobile patterns
 */

import { Label } from '@/components/ui/label';
import { cn } from '@/lib/utils';

// ============================================================================
// CSS Constants
// ============================================================================

export const inputCn =
  'h-12 text-base touch-manipulation bg-white/[0.06] border-white/[0.08] text-white focus:border-yellow-500 focus:ring-yellow-500 [color-scheme:dark]';

export const inputSmCn =
  'h-10 text-sm touch-manipulation bg-white/[0.06] border-white/[0.08] text-white focus:border-yellow-500 focus:ring-yellow-500';

export const textareaCn =
  'touch-manipulation text-base min-h-[80px] bg-white/[0.06] border-white/[0.08] text-white focus:border-yellow-500 focus:ring-yellow-500';

// ============================================================================
// Section Component — gradient accent line + title + optional count
// ============================================================================

export const Section = ({
  title,
  accentColor,
  count,
  children,
}: {
  title: string;
  accentColor?: string;
  count?: number;
  children: React.ReactNode;
}) => (
  <div className="space-y-4">
    <div className="border-b border-white/[0.06] pb-1 mb-3">
      <div
        className={cn(
          'h-[2px] w-full rounded-full bg-gradient-to-r mb-2',
          accentColor || 'from-amber-500/40 to-yellow-400/20'
        )}
      />
      <h2 className="text-xs font-medium text-white uppercase tracking-wider flex items-center gap-2">
        {title}
        {count !== undefined && (
          <span className="text-[10px] font-bold text-white bg-white/[0.1] px-2 py-0.5 rounded">
            {count}
          </span>
        )}
      </h2>
    </div>
    {children}
  </div>
);

// ============================================================================
// Field Component — label + children
// ============================================================================

export const Field = ({ label, children }: { label: string; children: React.ReactNode }) => (
  <div>
    <Label className="text-white text-xs mb-1.5 block">{label}</Label>
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
  <div className="flex items-center justify-between p-3 rounded-xl bg-white/[0.03] border border-white/[0.06]">
    <span className="text-sm text-white font-medium flex-1">{label}</span>
    <div className="flex gap-1.5">
      {[
        { val: 'pass', label: 'Pass', active: 'bg-green-500 border-green-500 text-white' },
        { val: 'fail', label: 'Fail', active: 'bg-red-500 border-red-500 text-white' },
        { val: 'na', label: 'N/A', active: 'bg-gray-500 border-gray-500 text-white' },
      ].map((btn) => (
        <button
          key={btn.val}
          type="button"
          onClick={() => onChange(btn.val)}
          className={cn(
            'px-3 py-2 rounded-lg border text-xs font-semibold touch-manipulation active:scale-[0.98] transition-all',
            value === btn.val
              ? btn.active
              : 'bg-white/[0.03] border-white/[0.1] text-white/50'
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
    className="px-3 py-1.5 rounded-lg bg-green-500/10 border border-green-500/20 text-xs font-semibold text-green-400 touch-manipulation active:scale-[0.98]"
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
    amber: { bg: 'bg-amber-500/10 border-amber-500/30', text: 'text-amber-400', check: 'bg-amber-500 border-amber-500' },
    green: { bg: 'bg-green-500/10 border-green-500/30', text: 'text-green-400', check: 'bg-green-500 border-green-500' },
    blue: { bg: 'bg-blue-500/10 border-blue-500/30', text: 'text-blue-400', check: 'bg-blue-500 border-blue-500' },
    red: { bg: 'bg-red-500/10 border-red-500/30', text: 'text-red-400', check: 'bg-red-500 border-red-500' },
    purple: { bg: 'bg-purple-500/10 border-purple-500/30', text: 'text-purple-400', check: 'bg-purple-500 border-purple-500' },
  };
  const colors = colorMap[accentColor];

  return (
    <button
      type="button"
      onClick={() => onChange(!checked)}
      className={cn(
        'w-full text-left p-4 rounded-xl border touch-manipulation active:scale-[0.98] transition-all',
        checked ? colors.bg : 'bg-white/[0.03] border-white/[0.06]'
      )}
    >
      <div className="flex items-center gap-3">
        <div
          className={cn(
            'w-5 h-5 rounded border-2 flex items-center justify-center transition-all flex-shrink-0',
            checked ? colors.check : 'border-white/30'
          )}
        >
          {checked && (
            <svg
              className="w-3 h-3 text-white"
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
          <p className={cn('text-sm font-semibold', checked ? colors.text : 'text-white')}>
            {label}
          </p>
          {description && (
            <p className="text-xs text-white mt-0.5">{description}</p>
          )}
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
    pass: 'bg-green-500/20 text-green-400 border-green-500/30',
    fail: 'bg-red-500/20 text-red-400 border-red-500/30',
    na: 'bg-gray-500/20 text-gray-400 border-gray-500/30',
  };
  const labels = { pass: 'Pass', fail: 'Fail', na: 'N/A' };
  return (
    <span className={cn('px-2 py-1 rounded-lg border text-xs font-semibold', styles[result])}>
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
        <div
          key={`err-${i}`}
          className="p-3 rounded-xl bg-red-500/10 border border-red-500/20 flex items-start gap-2"
        >
          <span className="text-red-400 text-xs mt-0.5 flex-shrink-0">⚠</span>
          <p className="text-xs text-red-300">{w.message}</p>
        </div>
      ))}
      {warns.map((w, i) => (
        <div
          key={`warn-${i}`}
          className="p-3 rounded-xl bg-yellow-500/5 border border-yellow-500/15 flex items-start gap-2"
        >
          <span className="text-yellow-400 text-xs mt-0.5 flex-shrink-0">⚡</span>
          <p className="text-xs text-yellow-200/80">{w.message}</p>
        </div>
      ))}
    </div>
  );
};
