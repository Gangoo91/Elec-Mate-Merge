import React from 'react';
import { Label } from '@/components/ui/label';
import { MobileSelectPicker, type SelectOption } from '@/components/ui/mobile-select-picker';
import { cn } from '@/lib/utils';

/**
 * Shared form primitives for the plug-in solar certificate.
 *
 * Underline fields, full-white labels, edge-to-edge cards, typographic headings
 * — the ev-charging language (CLAUDE.md → Design System). Collected here because
 * five tabs repeating the same class strings is how a form drifts out of the
 * system one field at a time.
 */

export const inputCn =
  'input-underline h-11 w-full rounded-none border-0 border-b border-white/[0.15] ' +
  'bg-transparent px-1 text-base font-medium text-white placeholder:text-white/25 ' +
  'caret-elec-yellow transition-colors hover:border-white/[0.3] focus:border-elec-yellow ' +
  // `focus:outline-none` alone leaves Chrome's blue :focus-visible ring on
  // button-based controls like the select trigger — the house style is that the
  // yellow underline carries focus, nothing else.
  'focus-visible:ring-0 focus:ring-0 focus:outline-none focus-visible:outline-none ' +
  'focus-visible:border-elec-yellow [color-scheme:dark] touch-manipulation';

export const cardCn =
  '-mx-4 mb-4 rounded-none border-y border-white/[0.14] sm:mx-0 sm:rounded-2xl sm:border-x ' +
  'bg-gradient-to-b from-white/[0.08] to-white/[0.04] p-4 sm:p-5 space-y-4 break-inside-avoid';

/**
 * The two-column canvas for desktop.
 *
 * CSS multi-column, NOT `grid-cols-2`. A grid forces both cells in a row to the
 * height of the taller one, so a short card (Client: four fields) sitting beside
 * a long one (Property: nine) left a dead block the height of the difference —
 * and it compounds on every row. Columns let the cards flow and pack, which is
 * what a form of uneven sections actually needs.
 *
 * Cards carry `break-inside-avoid` so none is ever split across the fold, and
 * `mb-4` rather than a parent `space-y-4`, because `space-y` sets margin-top on
 * siblings and multi-column has no sibling relationship to hang that on.
 */
export const cardFlowCn = 'lg:columns-2 lg:gap-4';

export const SectionHeader: React.FC<{ title: string }> = ({ title }) => (
  <h2 className="mb-3 text-[15px] font-semibold tracking-tight text-white">{title}</h2>
);

export const SubHeading: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <div className="border-t border-white/[0.1] pt-4">
    <h3 className="text-sm font-semibold text-white">{children}</h3>
  </div>
);

export const Field: React.FC<{
  label: string;
  htmlFor?: string;
  hint?: string;
  children: React.ReactNode;
}> = ({ label, htmlFor, hint, children }) => (
  <div>
    <Label htmlFor={htmlFor} className="mb-1 block text-[12px] font-medium text-white">
      {label}
    </Label>
    {children}
    {hint && <p className="mt-1 text-[11px] leading-snug text-white">{hint}</p>}
  </div>
);

const chipOn = 'bg-elec-yellow border-elec-yellow text-black font-semibold';
const chipOff = 'bg-white/[0.06] border-white/[0.12] text-white font-medium';

/** Two or three options read better as chips than as a select. */
export function ChipGroup<T extends string>({
  value,
  onChange,
  options,
}: {
  value: T;
  onChange: (v: T) => void;
  options: { value: T; label: string }[];
}) {
  return (
    <div className="flex flex-wrap gap-2">
      {options.map((o) => (
        <button
          key={o.value}
          type="button"
          onClick={() => onChange(o.value)}
          className={cn(
            'h-11 min-w-[72px] flex-1 rounded-xl border px-3 text-[13px] transition-colors touch-manipulation active:scale-[0.98]',
            value === o.value ? chipOn : chipOff,
          )}
        >
          {o.label}
        </button>
      ))}
    </div>
  );
}

/**
 * Yes / No / Not checked. The third state is load-bearing: "not checked" and
 * "no" produce different findings, and collapsing them to a boolean would let
 * an unchecked box read as a confirmed negative on a signed document.
 */
export const TriStateChips: React.FC<{
  value: string;
  onChange: (v: 'yes' | 'no' | 'unknown') => void;
  yesLabel?: string;
  noLabel?: string;
}> = ({ value, onChange, yesLabel = 'Yes', noLabel = 'No' }) => (
  <ChipGroup
    value={value as 'yes' | 'no' | 'unknown'}
    onChange={onChange}
    options={[
      { value: 'yes', label: yesLabel },
      { value: 'no', label: noLabel },
      { value: 'unknown', label: 'Not checked' },
    ]}
  />
);

export const Picker: React.FC<{
  value: string;
  onChange: (v: string) => void;
  options: SelectOption[];
  placeholder?: string;
  title?: string;
}> = ({ value, onChange, options, placeholder, title }) => (
  <MobileSelectPicker
    value={value}
    onValueChange={onChange}
    options={options}
    placeholder={placeholder}
    title={title}
    triggerClassName={inputCn}
  />
);

/**
 * The verdict on a measured reading, shown directly under the field.
 *
 * Colour lives on the left edge and the label — never as a fill. A tinted wash
 * over these cards composites to brown; see PlugInSolarVerdict.
 */
export const ReadingCheck: React.FC<{
  status: 'pass' | 'fail' | 'warning' | 'unknown';
  message: string;
  limit?: string;
}> = ({ status, message, limit }) => {
  if (status === 'unknown' && !message) return null;
  const edge =
    status === 'pass'
      ? 'border-l-emerald-400'
      : status === 'warning'
        ? 'border-l-elec-yellow'
        : status === 'fail'
          ? 'border-l-red-500'
          : 'border-l-white/25';
  const accent =
    status === 'pass'
      ? 'text-emerald-400'
      : status === 'warning'
        ? 'text-elec-yellow'
        : status === 'fail'
          ? 'text-red-400'
          : 'text-white';
  return (
    <div className={cn('mt-2 rounded-lg border border-l-4 border-white/[0.1] bg-white/[0.04] px-3 py-2', edge)}>
      <p className={cn('text-[12px] font-semibold leading-snug', accent)}>{message}</p>
      {limit && <p className="mt-0.5 text-[11px] leading-snug text-white">{limit}</p>}
    </div>
  );
};

/** A short note explaining where a rule comes from, shown under a field. */
export const SourceNote: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <p className="mt-1 text-[11px] leading-snug text-white">{children}</p>
);
