/**
 * SafetyDocField — a labelled field for Site Safety documents.
 *
 * The briefing wizard used `IOSInput`: a filled, rounded box with an icon
 * sitting inside it. The specialist certificates use a bare underline — no
 * fill, no border box, no icon — with the label above in full white and the
 * caret and bottom border carrying focus. Put the two side by side and the
 * boxed version looks like a different product.
 *
 * The underline class is copied verbatim from the EV charging certificate
 * (`ChargerAutocomplete` / `EVChargingDeclarations`) so the two areas cannot
 * drift apart on a rounding or a shade.
 *
 * `IOSInput` is not modified: 22 files use it, most of them in areas the design
 * system marks as pending migration, so changing it globally would be a much
 * larger and riskier move than this ticket.
 *
 * No `icon` prop, deliberately. A map pin inside a "Site name" field restates
 * the label in a picture; the design system carries meaning in type.
 */

import React from 'react';
import { cn } from '@/lib/utils';

/** Verbatim from the EV charging certificate — keep in step. */
export const safetyInputCn =
  'input-underline h-11 w-full rounded-none border-0 border-b border-white/[0.15] bg-transparent ' +
  'px-1 text-base font-medium text-white placeholder:font-normal placeholder:text-white ' +
  'caret-elec-yellow transition-colors duration-150 hover:border-white/[0.3] ' +
  'focus:border-elec-yellow focus-visible:ring-0 focus:ring-0 focus:outline-none focus:shadow-none ' +
  '[color-scheme:dark] touch-manipulation';

/**
 * Select trigger and textarea twins of the above.
 *
 * These exist so a safety document can be moved onto the certificate language
 * **one page at a time** without touching `@/components/college/primitives`.
 * That module's `inputClass` is the boxed style and is imported by roughly a
 * thousand files — the whole Study Centre, College Hub, apprentice courses and
 * settings — so changing it there would restyle the entire app in one go. These
 * are site-safety-local on purpose.
 */
export const safetySelectTriggerCn =
  'h-11 w-full rounded-none border-0 border-b border-white/[0.15] bg-transparent px-1 ' +
  'text-base font-medium text-white transition-colors duration-150 hover:border-white/[0.3] ' +
  'focus:border-elec-yellow focus:outline-none focus:ring-0 ' +
  'data-[state=open]:border-elec-yellow touch-manipulation';

export const safetyTextareaCn =
  'input-underline w-full resize-none rounded-none border-0 border-b border-white/[0.15] ' +
  'bg-transparent px-1 py-2 text-base font-medium leading-relaxed text-white ' +
  'placeholder:font-normal placeholder:text-white caret-elec-yellow ' +
  'transition-colors duration-150 hover:border-white/[0.3] focus:border-elec-yellow ' +
  'focus-visible:ring-0 focus:ring-0 focus:outline-none touch-manipulation';

interface SafetyDocFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  /** Shown under the field. Full white — helper text in grey is not allowed. */
  hint?: string;
  error?: string;
  required?: boolean;
}

export const SafetyDocField = React.forwardRef<HTMLInputElement, SafetyDocFieldProps>(
  ({ label, hint, error, required, className, id, ...rest }, ref) => {
    const fieldId = id ?? `sdf-${label.replace(/\s+/g, '-').toLowerCase()}`;
    return (
      <div className="space-y-1">
        <label htmlFor={fieldId} className="block text-[12px] font-medium text-white">
          {label}
          {required && <span className="text-elec-yellow"> *</span>}
        </label>
        <input
          id={fieldId}
          ref={ref}
          aria-invalid={error ? true : undefined}
          className={cn(safetyInputCn, error && 'border-red-400', className)}
          {...rest}
        />
        {error ? (
          <p className="text-[11px] font-medium text-red-400">{error}</p>
        ) : hint ? (
          <p className="text-[11px] text-white">{hint}</p>
        ) : null}
      </div>
    );
  }
);
SafetyDocField.displayName = 'SafetyDocField';

/** Textarea twin — same underline language, taller. */
interface SafetyDocTextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label: string;
  hint?: string;
  error?: string;
  required?: boolean;
}

export const SafetyDocTextarea = React.forwardRef<HTMLTextAreaElement, SafetyDocTextareaProps>(
  ({ label, hint, error, required, className, id, ...rest }, ref) => {
    const fieldId = id ?? `sdt-${label.replace(/\s+/g, '-').toLowerCase()}`;
    return (
      <div className="space-y-1">
        <label htmlFor={fieldId} className="block text-[12px] font-medium text-white">
          {label}
          {required && <span className="text-elec-yellow"> *</span>}
        </label>
        <textarea
          id={fieldId}
          ref={ref}
          aria-invalid={error ? true : undefined}
          className={cn(
            safetyInputCn,
            'h-auto min-h-[88px] resize-none py-2 leading-relaxed',
            error && 'border-red-400',
            className
          )}
          {...rest}
        />
        {error ? (
          <p className="text-[11px] font-medium text-red-400">{error}</p>
        ) : hint ? (
          <p className="text-[11px] text-white">{hint}</p>
        ) : null}
      </div>
    );
  }
);
SafetyDocTextarea.displayName = 'SafetyDocTextarea';
