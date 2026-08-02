import React from 'react';
import { Label } from '@/components/ui/label';
import { cn } from '@/lib/utils';
import { chipBase, chipOn, chipOff, labelCn, cardCn } from './fieldStyles';

/**
 * Shared form components for the whole app.
 *
 * Lifted verbatim from the specialist certificate forms — see fieldStyles.ts
 * for why this module exists. Import these rather than re-declaring the
 * patterns locally.
 *
 * Class strings live in './fieldStyles' and are imported from there directly:
 *
 *   import { FieldLabel, ToggleRow } from '@/components/forms';
 *   import { inputCn, cardCn } from '@/components/forms/fieldStyles';
 *
 * They are deliberately NOT re-exported here — mixing component and
 * non-component exports in one module breaks React Fast Refresh.
 */

/** Field label. Sentence case, full white. */
export const FieldLabel = ({
  htmlFor,
  className,
  children,
}: {
  htmlFor?: string;
  className?: string;
  children: React.ReactNode;
}) => (
  <Label htmlFor={htmlFor} className={cn(labelCn, className)}>
    {children}
  </Label>
);

/**
 * Section heading. Plain typographic — no icons, no coloured dots, no gradient
 * bars. Hierarchy comes from type and spacing.
 */
export const SectionHeading = ({
  title,
  className,
}: {
  title: string;
  className?: string;
}) => (
  <h2 className={cn('mb-3 text-[15px] font-semibold tracking-tight text-white', className)}>
    {title}
  </h2>
);

/** Sub-heading inside a card — separated by a rule, not decoration. */
export const SubHeading = ({ children }: { children: React.ReactNode }) => (
  <div className="border-t border-white/[0.1] pt-4">
    <h3 className="text-sm font-semibold text-white">{children}</h3>
  </div>
);

/** Section card. Edge-to-edge on mobile, inset from sm: up. */
export const FormCard = ({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) => <div className={cn(cardCn, className)}>{children}</div>;

/** Single-choice chip row — preferred over a select for 2–3 options. */
export const ToggleRow = ({
  options,
  value,
  onChange,
  className,
}: {
  options: { label: string; value: string }[];
  value: string;
  onChange: (v: string) => void;
  className?: string;
}) => (
  <div className={cn('flex gap-2', className)}>
    {options.map((opt) => (
      <button
        key={opt.value}
        type="button"
        onClick={() => onChange(opt.value)}
        className={cn(chipBase, 'flex-1 px-2', value === opt.value ? chipOn : chipOff)}
      >
        {opt.label}
      </button>
    ))}
  </div>
);

export { SelectField, type SelectFieldProps } from './SelectField';
