import * as React from 'react';
import { cn } from '@/lib/utils';
import { Label } from '@/components/ui/label';
import { inputCn, labelCn, textareaCn } from '@/components/forms/fieldStyles';

export interface MobileInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  hint?: string;
  unit?: string;
  clearError?: () => void;
  /**
   * Render a textarea instead of a single-line input.
   *
   * Seven call sites — the notes fields on the site-assessment forms among
   * them — already passed `multiline` and `rows`. Neither prop existed, so
   * they were spread onto the `<input>`, where React drops them: someone
   * writing up site conditions or a risk description got one cramped line.
   */
  multiline?: boolean;
  /** Visible rows when `multiline`. Ignored otherwise. */
  rows?: number;
}

const MobileInput = React.forwardRef<HTMLInputElement, MobileInputProps>(
  (
    {
      className,
      type,
      label,
      error,
      hint,
      unit,
      clearError,
      id,
      multiline,
      rows = 4,
      onChange,
      ...props
    },
    ref
  ) => {
    const inputId = id || label?.toLowerCase().replace(/\s+/g, '-');

    /*
     * `clearError` used to never fire.
     *
     * The wrapper below was written first and `{...props}` spread after it, so
     * the caller's own `onChange` — which is in `props` — replaced it. Later
     * JSX props win. Spreading first and declaring `onChange` last keeps the
     * wrapper, and it still calls the caller's handler.
     */
    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      if (clearError) clearError();
      (onChange as ((ev: typeof e) => void) | undefined)?.(e);
    };

    /*
     * The remaining props are typed against HTMLInputElement, so every event
     * handler on them (onInput, onSelect, onKeyDown…) carries the wrong element
     * type for a textarea. They are structurally the same handlers; only the
     * `currentTarget` type differs, which is why this needs the double cast
     * rather than a direct one. `onChange` is already destructured out above.
     */
    const textareaProps = props as unknown as React.TextareaHTMLAttributes<HTMLTextAreaElement>;

    /*
     * The house field language (`components/forms/fieldStyles`) — the same
     * underline the certificates use — rather than the boxed shadcn input
     * with a ring-offset this used to carry. One edit here restyles every
     * calculator and assessment form that renders through this component.
     */
    const fieldCn = cn(
      multiline ? cn(textareaCn, 'w-full resize-y') : inputCn,
      'disabled:cursor-not-allowed disabled:text-white/70',
      unit && !multiline && 'pr-12',
      error && '!border-red-400',
      className
    );

    return (
      <div>
        {label && (
          <Label htmlFor={inputId} className={labelCn}>
            {label}
          </Label>
        )}
        <div className="relative">
          {multiline ? (
            <textarea
              id={inputId}
              rows={rows}
              className={fieldCn}
              {...textareaProps}
              onChange={handleChange}
            />
          ) : (
            <input
              type={type}
              id={inputId}
              className={fieldCn}
              ref={ref}
              {...props}
              onChange={handleChange}
            />
          )}
          {unit && !multiline && (
            <div className="absolute right-1 top-1/2 -translate-y-1/2 text-sm text-white">
              {unit}
            </div>
          )}
        </div>
        {hint && !error && <p className="text-[11.5px] leading-snug text-white">{hint}</p>}
        {error && (
          <p className="text-[11.5px] leading-snug text-red-300 animate-fade-in">{error}</p>
        )}
      </div>
    );
  }
);
MobileInput.displayName = 'MobileInput';

export { MobileInput };
