import * as React from 'react';

import { cn } from '@/lib/utils';

export type TextareaProps = React.TextareaHTMLAttributes<HTMLTextAreaElement>;

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, ...props }, ref) => {
    /*
     * ELE-1527 / ELE-1480 — spell check was off on every textarea in the app,
     * because it was hardcoded off here in the base component rather than at
     * any call site. Observations and recommendations are prose that ends up on
     * a certificate a client reads, so a typo matters.
     *
     * These defaults are declared before {...props}, so the call sites that
     * deliberately pass spellCheck={false} — signature capture, chat, search —
     * still win.
     *
     * autoCorrect stays off on purpose: it mangles the vocabulary this app is
     * full of (RCBO, Zs, SWA, CPC), and a silent "correction" on a compliance
     * document is worse than a red squiggle. autoCapitalize moves to
     * "sentences" because these are sentences.
     */
    return (
      <textarea
        spellCheck="true"
        autoComplete="off"
        autoCorrect="off"
        autoCapitalize="sentences"
        className={cn(
          // Base layout
          'flex w-full min-h-[100px] md:min-h-[80px]',
          'px-4 py-3 md:px-3 md:py-2',
          'text-base md:text-sm text-white',
          // Background & border - match Input
          'bg-input border border-border/50 rounded-lg',
          // Typography
          'font-sans font-[450] tracking-[0.005em] leading-[1.6]',
          // Placeholder
          'placeholder:text-white',
          // Focus states - elec-yellow glow
          'focus:outline-none focus:border-elec-yellow focus:ring-0',
          'focus:shadow-none',
          // Caret
          'caret-elec-yellow',
          // Transitions
          'transition-all duration-200 ease-out',
          // Resize
          'resize-y',
          // Disabled
          'disabled:cursor-not-allowed disabled:bg-muted disabled:text-muted-foreground disabled:opacity-70',
          // Touch
          'touch-manipulation',
          // Selection
          'selection:bg-elec-yellow/20 selection:text-white',
          '[color-scheme:dark]',
          className
        )}
        ref={ref}
        {...props}
      />
    );
  }
);
Textarea.displayName = 'Textarea';

export { Textarea };
