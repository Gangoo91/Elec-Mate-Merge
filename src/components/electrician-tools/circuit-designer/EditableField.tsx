/* eslint-disable @typescript-eslint/no-explicit-any */
/**
 * EditableField — inline tap-to-edit wrapper with strict-compliance validation.
 *
 * Renders the value as plain text by default. Tap reveals an inline input
 * (text / number / select). On commit, calls a validator. If valid → saves +
 * shows a small "edited" dot. If invalid → toasts the error with the system's
 * suggested compliant value (one-tap "Apply suggestion").
 *
 * Tier 4 fields render as locked (with reason on hover/long-press).
 */

import { useState, useRef, useEffect, KeyboardEvent } from 'react';
import { toast } from 'sonner';
import { cn } from '@/lib/utils';
import { type ValidationResult } from './circuit-edit-validator';

interface BaseProps {
  label?: string;
  value: string | number;
  /** Display formatter — e.g. value=6 → "6 mm²" */
  format?: (value: string | number) => string;
  /** Edited indicator dot */
  edited?: boolean;
  /** Lock — renders as read-only with a tooltip */
  lock?: { reason: string; reg: string } | null;
  /** Optional className for the value text */
  valueClassName?: string;
}

interface TextProps extends BaseProps {
  kind: 'text';
  validate: (next: string) => ValidationResult;
  onCommit: (next: string) => void;
}

interface NumberProps extends BaseProps {
  kind: 'number';
  step?: number;
  validate: (next: number) => ValidationResult;
  onCommit: (next: number) => void;
}

interface SelectProps extends BaseProps {
  kind: 'select';
  options: { value: string | number; label: string }[];
  validate: (next: string | number) => ValidationResult;
  onCommit: (next: string | number) => void;
}

export type EditableFieldProps = TextProps | NumberProps | SelectProps;

export const EditableField = (props: EditableFieldProps) => {
  const { label, value, format, edited, lock, valueClassName } = props;
  const [editing, setEditing] = useState(false);
  const [draft, setDraft] = useState<string>(String(value));
  const inputRef = useRef<HTMLInputElement | HTMLSelectElement>(null);

  useEffect(() => {
    setDraft(String(value));
  }, [value]);

  useEffect(() => {
    if (editing && inputRef.current) {
      inputRef.current.focus();
      if (inputRef.current instanceof HTMLInputElement) inputRef.current.select();
    }
  }, [editing]);

  const display = format ? format(value) : String(value);

  const commit = (raw: string | number) => {
    const v = props.kind === 'number' ? Number(raw) : raw;
    // Single-assignment to give TS a clean union to narrow against.
    const result: ValidationResult =
      props.kind === 'text'
        ? props.validate(String(v))
        : props.kind === 'number'
          ? props.validate(Number(v))
          : props.validate(v as string | number);

    if (!result.ok) {
      // Type guard: TypeScript's narrowing on discriminated unions sometimes
      // fails when the variable is assigned via a multi-branch conditional —
      // pin it manually.
      const failed = result as Extract<ValidationResult, { ok: false }>;
      toast.error(failed.error, {
        description: failed.suggestion ? `Suggestion: ${failed.suggestion.label}` : undefined,
        action: failed.suggestion
          ? {
              label: 'Apply',
              onClick: () => {
                if (props.kind === 'number') {
                  props.onCommit(Number(failed.suggestion!.value));
                } else {
                  props.onCommit(failed.suggestion!.value as any);
                }
                setEditing(false);
              },
            }
          : undefined,
        duration: 8000,
      });
      // Revert draft to current value, stay in edit mode for retry
      setDraft(String(value));
      return;
    }

    if (props.kind === 'number') props.onCommit(Number(v));
    else if (props.kind === 'text') props.onCommit(String(v));
    else props.onCommit(v as string | number);

    setEditing(false);
  };

  const cancel = () => {
    setDraft(String(value));
    setEditing(false);
  };

  const handleKey = (e: KeyboardEvent) => {
    if (e.key === 'Enter') commit(draft);
    if (e.key === 'Escape') cancel();
  };

  // ─── Locked render ─────────────────────────────────────────────────
  if (lock) {
    return (
      <span
        title={`${lock.reason} · BS 7671 ${lock.reg}`}
        className={cn(
          'inline-flex items-center gap-1.5 text-white/85 cursor-not-allowed',
          valueClassName
        )}
      >
        {display}
        <svg
          className="w-3 h-3 text-white/30"
          viewBox="0 0 16 16"
          fill="currentColor"
          aria-label={`Locked — ${lock.reason}`}
        >
          <path d="M8 1a3 3 0 0 0-3 3v3H4a1 1 0 0 0-1 1v6a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1V8a1 1 0 0 0-1-1h-1V4a3 3 0 0 0-3-3Zm-2 6V4a2 2 0 1 1 4 0v3H6Z" />
        </svg>
      </span>
    );
  }

  // ─── Edit mode ─────────────────────────────────────────────────────
  if (editing) {
    if (props.kind === 'select') {
      return (
        <span className="relative inline-flex w-full max-w-full sm:max-w-none sm:min-w-[10rem]">
          <select
            ref={inputRef as React.RefObject<HTMLSelectElement>}
            value={draft}
            onChange={(e) => {
              setDraft(e.target.value);
              commit(e.target.value);
            }}
            onBlur={() => commit(draft)}
            className={cn(
              'w-full bg-[hsl(0_0%_8%)] border border-elec-yellow/50 rounded-md px-3 py-2 pr-9 text-[14px] sm:text-[13px] text-white tabular-nums focus:outline-none focus:border-elec-yellow appearance-none cursor-pointer min-h-[36px] sm:min-h-[32px]',
              valueClassName
            )}
          >
            {!props.options.find((o) => String(o.value) === draft) && draft && (
              <option value={draft}>— {draft} —</option>
            )}
            {props.options.map((opt) => (
              <option key={String(opt.value)} value={String(opt.value)}>
                {opt.label}
              </option>
            ))}
          </select>
          <svg
            className="absolute right-2.5 top-1/2 -translate-y-1/2 w-3 h-3 text-elec-yellow pointer-events-none"
            viewBox="0 0 16 16"
            fill="currentColor"
            aria-hidden="true"
          >
            <path d="M4 6l4 4 4-4z" />
          </svg>
        </span>
      );
    }
    return (
      <input
        ref={inputRef as React.RefObject<HTMLInputElement>}
        type={props.kind === 'number' ? 'number' : 'text'}
        step={props.kind === 'number' ? props.step ?? 1 : undefined}
        inputMode={props.kind === 'number' ? 'decimal' : undefined}
        value={draft}
        onChange={(e) => setDraft(e.target.value)}
        onBlur={() => commit(draft)}
        onKeyDown={handleKey}
        className={cn(
          'bg-[hsl(0_0%_8%)] border border-elec-yellow/50 rounded-md px-3 py-2 sm:py-1.5 text-[14px] sm:text-[13px] text-white tabular-nums focus:outline-none focus:border-elec-yellow min-h-[36px] sm:min-h-[32px]',
          'min-w-0',
          valueClassName
        )}
        style={{
          width: `max(7ch, ${Math.max(String(draft).length + 2, 7)}ch)`,
        }}
        aria-label={label}
      />
    );
  }

  // ─── Read mode ─────────────────────────────────────────────────────
  return (
    <button
      type="button"
      onClick={() => setEditing(true)}
      className={cn(
        // Bigger touch target on mobile (min 32px tap area), tighter on desktop.
        'inline-flex items-center gap-1.5 text-left rounded -mx-1.5 px-1.5 py-1 sm:py-0.5 min-h-[28px] hover:bg-white/[0.04] active:bg-white/[0.06] transition-colors group cursor-pointer touch-manipulation',
        valueClassName
      )}
      aria-label={label ? `Edit ${label}` : 'Edit value'}
    >
      <span className="border-b border-dotted border-white/30 group-hover:border-elec-yellow/70">
        {display}
      </span>
      {props.kind === 'select' && (
        <svg
          className="w-2.5 h-2.5 text-white/45 group-hover:text-elec-yellow shrink-0"
          viewBox="0 0 16 16"
          fill="currentColor"
          aria-hidden="true"
        >
          <path d="M4 6l4 4 4-4z" />
        </svg>
      )}
      {edited && (
        <span
          className="inline-block w-1.5 h-1.5 rounded-full bg-elec-yellow shrink-0"
          aria-label="Edited"
        />
      )}
    </button>
  );
};
