import * as React from 'react';

import { cn } from '@/lib/utils';

const Input = React.forwardRef<HTMLInputElement, React.ComponentProps<'input'>>(
  ({ className, type, inputMode, ...props }, ref) => {
    // Convert type=number → type=text + inputMode=decimal (no spinner chrome)
    // Convert type=password → type=text + pw-masked class (-webkit-text-security:disc)
    // This bypasses iOS Safari's native password masking pipeline which ignores CSS
    // colour overrides on dark backgrounds, making dots invisible.
    const isPassword = type === 'password';
    const finalType = type === 'number' ? 'text' : isPassword ? 'text' : type;
    const finalInputMode =
      inputMode ||
      (type === 'number'
        ? 'decimal'
        : type === 'email'
          ? 'email'
          : type === 'tel'
            ? 'tel'
            : undefined);

    // Date/time inputs must not carry py-3/py-2 — on iOS WKWebView, combining
    // native date chrome with vertical padding forces the input taller than h-12.
    // Use line-height centering instead (mirrors the global index.css rule).
    const isDateLike =
      type === 'date' || type === 'time' || type === 'datetime-local';

    return (
      <input
        type={finalType}
        inputMode={finalInputMode}
        spellCheck="false"
        autoComplete="off"
        autoCorrect="off"
        autoCapitalize="off"
        style={{ fontSize: '16px', ...props.style }}
        className={cn(
          // Base layout & sizing
          'flex w-full h-12 md:h-11 px-4 py-3 md:px-3 md:py-2',
          'text-base md:text-sm text-white',
          // Background & border — solid dark, no semi-transparent
          'bg-input border border-border/50 rounded-lg',
          // Typography
          'font-sans font-[450] tracking-[0.005em] leading-[1.5] text-left',
          // Placeholder
          'placeholder:text-white',
          // Focus states - elec-yellow glow
          'focus:outline-none focus:border-elec-yellow focus:ring-0',
          'focus:shadow-[0_0_0_3px_hsl(var(--elec-yellow)/0.15)]',
          // Caret
          'caret-elec-yellow',
          // Transitions
          'transition-all duration-200 ease-out',
          // Disabled state
          'disabled:cursor-not-allowed disabled:bg-muted disabled:text-muted-foreground disabled:opacity-70',
          // Touch optimization
          'touch-manipulation',
          // Selection
          'selection:bg-elec-yellow/20 selection:text-white',
          // File inputs
          'file:border-0 file:bg-transparent file:text-base file:font-medium file:text-white',
          // Dark color-scheme tells the browser to render native form controls
          // (date pickers, autofill) with dark mode colours.
          '[color-scheme:dark]',
          // Password masking via CSS rather than type="password" (iOS Safari fix)
          isPassword && 'pw-masked',
          // Date/time inputs: strip top/bottom padding and use line-height centering.
          // iOS WKWebView native date chrome + py-3 = oversized input box.
          isDateLike && '!py-0 leading-[3rem] md:leading-[2.75rem]',
          className
        )}
        ref={ref}
        {...props}
      />
    );
  }
);
Input.displayName = 'Input';

export { Input };
