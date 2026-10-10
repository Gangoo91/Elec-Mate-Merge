/**
 * Presentation pieces for the circuit design wizard.
 *
 * The wizard runs in the Electrical Hub (circuit designer) and the Employer Hub
 * (AI design). Both use these so the two read the same: underline fields,
 * sentence-case full-white labels, solid-yellow chips, plain typographic
 * headings, and edge-to-edge cards on a phone. Class strings come from
 * `@/components/forms/fieldStyles` (the app's form language).
 *
 * Selects stay on the Radix dropdown the wizard used before, restyled as an
 * underline. The app's MobileSelectPicker adds a free-text "custom value" box
 * on a phone, which would let a load type or install method be set to a value
 * the designer does not know, so it is not used here.
 */
import * as React from 'react';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  inputCn,
  labelCn,
  selectTriggerCn,
  chipBase,
  chipOn,
  chipOff,
} from '@/components/forms/fieldStyles';
import { cn } from '@/lib/utils';

/** Step title and one line of context. No eyebrow, no numbering. */
export const StepHeader = ({ title, description }: { title: string; description: string }) => (
  <div className="space-y-1.5">
    <h2 className="text-[22px] sm:text-[24px] font-semibold tracking-tight leading-tight text-white">
      {title}
    </h2>
    <p className="text-[14px] leading-relaxed text-white max-w-2xl">{description}</p>
  </div>
);

/** A titled block inside a step. Plain type, optional trailing note. */
export const Section = ({
  title,
  aside,
  children,
  className,
}: {
  title: string;
  aside?: React.ReactNode;
  children: React.ReactNode;
  className?: string;
}) => (
  <section className={cn('space-y-3', className)}>
    <div className="flex items-baseline justify-between gap-3">
      <h3 className="text-[15px] font-semibold tracking-tight text-white">{title}</h3>
      {aside && <span className="text-[13px] text-white tabular-nums">{aside}</span>}
    </div>
    {children}
  </section>
);

/** Helper line under a field or a group. Full white, small. */
export const Hint = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => <p className={cn('text-[12px] leading-relaxed text-white', className)}>{children}</p>;

/** Labelled underline text/number input. */
export const TextField = ({
  label,
  value,
  onChange,
  placeholder,
  hint,
  type = 'text',
  className,
}: {
  label: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  hint?: string;
  type?: string;
  className?: string;
}) => {
  const id = React.useId();
  return (
    <div className={className}>
      <label htmlFor={id} className={labelCn}>
        {label}
      </label>
      <Input
        id={id}
        type={type}
        inputMode={type === 'number' ? 'decimal' : undefined}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className={inputCn}
      />
      {hint && <Hint className="mt-1.5">{hint}</Hint>}
    </div>
  );
};

export interface WizardOption {
  value: string;
  label: string;
  description?: string;
}

/** Labelled underline select. Same options and values as before; restyled only. */
export const SelectRow = ({
  label,
  value,
  onValueChange,
  options,
  placeholder,
  hint,
  className,
}: {
  label?: string;
  value: string;
  onValueChange: (value: string) => void;
  options: readonly WizardOption[];
  placeholder?: string;
  hint?: string;
  className?: string;
}) => (
  <div className={className}>
    {label && <span className={labelCn}>{label}</span>}
    <Select value={value} onValueChange={onValueChange}>
      <SelectTrigger
        aria-label={label}
        className={cn(
          selectTriggerCn,
          'w-full [&>span[data-placeholder]]:text-white [&>span>div>span+span]:hidden'
        )}
      >
        <SelectValue placeholder={placeholder || 'Select'} />
      </SelectTrigger>
      <SelectContent>
        {options.map((option) => (
          <SelectItem key={option.value} value={option.value}>
            <div className="flex flex-col">
              <span>{option.label}</span>
              {option.description && (
                <span className="text-[13px] font-normal">{option.description}</span>
              )}
            </div>
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
    {hint && <Hint className="mt-1.5">{hint}</Hint>}
  </div>
);

/**
 * Single-choice chips. Selected is solid yellow with black text. When an
 * option has a description, the selected one's description shows underneath
 * so no copy is lost by moving from cards to chips.
 */
export const ChipChoice = ({
  options,
  value,
  onSelect,
  columns = 'grid-cols-3',
  ariaLabel,
}: {
  options: readonly WizardOption[];
  value: string | undefined;
  onSelect: (value: string) => void;
  columns?: string;
  ariaLabel: string;
}) => {
  const selected = options.find((o) => o.value === value);
  return (
    <div className="space-y-2">
      <div role="radiogroup" aria-label={ariaLabel} className={cn('grid gap-2', columns)}>
        {options.map((opt) => {
          const on = opt.value === value;
          return (
            <button
              key={opt.value}
              type="button"
              role="radio"
              aria-checked={on}
              onClick={() => onSelect(opt.value)}
              className={cn(chipBase, 'px-2 leading-tight', on ? chipOn : chipOff)}
            >
              {opt.label}
            </button>
          );
        })}
      </div>
      {selected?.description && <Hint>{selected.description}</Hint>}
    </div>
  );
};

/** Neutral secondary button, 44px. */
export const QuietButton = ({
  children,
  onClick,
  className,
  disabled,
}: {
  children: React.ReactNode;
  onClick: () => void;
  className?: string;
  disabled?: boolean;
}) => (
  <button
    type="button"
    onClick={onClick}
    disabled={disabled}
    className={cn(
      'inline-flex h-11 items-center justify-center gap-2 rounded-xl border border-white/[0.12] bg-white/[0.04] px-4',
      'text-[14px] font-medium text-white transition-colors hover:bg-white/[0.08]',
      'disabled:cursor-not-allowed disabled:bg-white/[0.02]',
      'touch-manipulation active:scale-[0.98]',
      className
    )}
  >
    {children}
  </button>
);

/** Card for a repeating item. Edge-to-edge on a phone, inset from sm: up. */
export const ItemCard = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => (
  <div
    className={cn(
      '-mx-4 rounded-none border-y border-white/[0.12] bg-[hsl(0_0%_10%)] p-4',
      'sm:mx-0 sm:rounded-2xl sm:border-x sm:p-5',
      className
    )}
  >
    {children}
  </div>
);

/** Label/value pair for read-only summaries. */
export const Fact = ({
  label,
  value,
  tone,
}: {
  label: string;
  value: React.ReactNode;
  tone?: 'bad' | 'warn' | 'good';
}) => (
  <div className="min-w-0">
    <div className="text-[12px] text-white">{label}</div>
    <div
      className={cn(
        'mt-0.5 text-[15px] font-semibold tabular-nums truncate',
        tone === 'bad'
          ? 'text-red-400'
          : tone === 'warn'
            ? 'text-amber-400'
            : tone === 'good'
              ? 'text-emerald-400'
              : 'text-white'
      )}
    >
      {value}
    </div>
  </div>
);
