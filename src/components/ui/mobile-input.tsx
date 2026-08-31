import * as React from 'react';
import { cn } from '@/lib/utils';
import { Label } from '@/components/ui/label';

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

    const fieldCn = cn(
      'flex w-full rounded-md border border-primary/30 bg-card px-3 py-2 text-sm',
      'ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium',
      'placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2',
      'focus-visible:ring-elec-yellow focus-visible:ring-offset-2 disabled:cursor-not-allowed',
      'disabled:opacity-50 transition-colors',
      // Mobile-specific improvements
      'touch-manipulation text-base', // Prevent zoom on iOS
      multiline ? 'min-h-[96px] resize-y' : 'h-12',
      unit && !multiline && 'pr-12', // Add right padding if unit exists
      error && 'border-destructive focus-visible:ring-destructive',
      className
    );

    return (
      <div className="space-y-2">
        {label && (
          <Label
            htmlFor={inputId}
            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          >
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
            <div className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-muted-foreground">
              {unit}
            </div>
          )}
        </div>
        {hint && !error && <p className="text-xs text-muted-foreground">{hint}</p>}
        {error && <p className="text-xs text-destructive animate-fade-in">{error}</p>}
      </div>
    );
  }
);
MobileInput.displayName = 'MobileInput';

export { MobileInput };
