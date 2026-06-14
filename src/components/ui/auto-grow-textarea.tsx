import * as React from 'react';
import { cn } from '@/lib/utils';

export interface AutoGrowTextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  /** Starting height in rows before content grows it. */
  minRows?: number;
  /** Max pixel height before the textarea starts to scroll internally. */
  maxHeight?: number;
}

/**
 * A textarea that grows with its content (up to maxHeight, then scrolls).
 * Used for in-line item-description editing on quotes & invoices so long
 * descriptions are comfortable to read and edit on phone and web.
 */
export const AutoGrowTextarea = React.forwardRef<
  HTMLTextAreaElement,
  AutoGrowTextareaProps
>(({ className, minRows = 2, maxHeight = 220, value, onChange, ...props }, ref) => {
  const innerRef = React.useRef<HTMLTextAreaElement | null>(null);

  const setRefs = (el: HTMLTextAreaElement | null) => {
    innerRef.current = el;
    if (typeof ref === 'function') ref(el);
    else if (ref) (ref as React.MutableRefObject<HTMLTextAreaElement | null>).current = el;
  };

  const resize = React.useCallback(() => {
    const el = innerRef.current;
    if (!el) return;
    el.style.height = 'auto';
    el.style.height = `${Math.min(el.scrollHeight, maxHeight)}px`;
  }, [maxHeight]);

  // Re-fit whenever the value changes (typing, programmatic set, mount).
  React.useLayoutEffect(() => {
    resize();
  }, [resize, value]);

  return (
    <textarea
      ref={setRefs}
      rows={minRows}
      value={value}
      onChange={(e) => {
        onChange?.(e);
        resize();
      }}
      className={cn('w-full resize-none touch-manipulation', className)}
      {...props}
    />
  );
});

AutoGrowTextarea.displayName = 'AutoGrowTextarea';
