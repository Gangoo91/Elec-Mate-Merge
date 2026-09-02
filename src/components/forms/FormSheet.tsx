import type { ReactNode } from 'react';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet';
import { cn } from '@/lib/utils';

/* ==========================================================================
   FormSheet — the one bottom-sheet shell for forms.

   Lifted from the OJT programme sheet after its Save button turned out to be
   unreachable: the grab handle sat OUTSIDE the `flex flex-col h-full` column,
   so the column was 100% of the sheet PLUS the handle and the footer fell off
   the bottom. That same shape was live in seven more apprentice sheets, along
   with four different grab handles, heights from 60vh to 92vh and a
   `rounded-t-3xl` the cert side never uses. Everything is one column here:

     handle → header (shrink-0) → body (flex-1, scrolls) → footer (shrink-0)

   `h-[85vh] rounded-t-2xl p-0` is the house standard (CLAUDE.md). The body
   and footer cap their content at `max-w-2xl` (or `3xl` with width="lg") so
   a lone field does not stretch across a 1,900px monitor.

   Import this by path — `@/components/forms/index.tsx` deliberately exports
   components only, and this file exports nothing else.
   ========================================================================== */

export interface FormSheetProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  /** Small volt caps above the title — the sheet's section, e.g. "Your programme". */
  eyebrow?: string;
  title: ReactNode;
  description?: ReactNode;
  /** Right of the title: a save word ("Draft saved"), a step count, a close. */
  headerTrailing?: ReactNode;
  /** A shrink-0 strip between header and body — step tabs, a filter row. */
  subheader?: ReactNode;
  /** Rendered as a shrink-0 strip under the body, padded for the home indicator. */
  footer?: ReactNode;
  width?: 'md' | 'lg';
  /** Extra classes on the scrolling body's inner column (defaults to `space-y-5`). */
  bodyClassName?: string;
  children: ReactNode;
}

export function FormSheet({
  open,
  onOpenChange,
  eyebrow,
  title,
  description,
  headerTrailing,
  subheader,
  footer,
  width = 'md',
  bodyClassName,
  children,
}: FormSheetProps) {
  const inner = cn('mx-auto w-full', width === 'lg' ? 'max-w-3xl' : 'max-w-2xl');
  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent
        side="bottom"
        className="h-[85vh] overflow-hidden rounded-t-2xl border-white/[0.06] bg-[hsl(0_0%_8%)] p-0"
      >
        <div className="flex h-full flex-col">
          <div className="mx-auto mt-3 h-1 w-12 shrink-0 rounded-full bg-white/15" aria-hidden />

          <div className="shrink-0 px-4 sm:px-6">
            <div className={inner}>
              <SheetHeader className="pb-4 pt-2">
                <div className="flex items-start justify-between gap-3">
                  <SheetTitle className="min-w-0 text-left">
                    {eyebrow ? (
                      <span className="block text-[10px] font-medium uppercase tracking-[0.18em] text-elec-yellow">
                        {eyebrow}
                      </span>
                    ) : null}
                    <span className="mt-1 block text-[20px] font-semibold leading-tight tracking-tight text-white sm:text-[24px]">
                      {title}
                    </span>
                  </SheetTitle>
                  {headerTrailing ? (
                    <div className="flex shrink-0 items-center gap-2 pt-1">{headerTrailing}</div>
                  ) : null}
                </div>
                {description ? (
                  <SheetDescription className="text-left text-[13px] leading-snug text-white">
                    {description}
                  </SheetDescription>
                ) : (
                  <SheetDescription className="sr-only">
                    {typeof title === 'string' ? title : 'Form'}
                  </SheetDescription>
                )}
              </SheetHeader>
            </div>
          </div>

          {subheader ? (
            <div className="shrink-0 border-b border-white/[0.08] px-4 sm:px-6">
              <div className={inner}>{subheader}</div>
            </div>
          ) : null}

          <div className="flex-1 overflow-y-auto overscroll-contain px-4 pb-6 sm:px-6">
            <div className={cn(inner, bodyClassName ?? 'space-y-5')}>{children}</div>
          </div>

          {footer ? (
            <div
              className="shrink-0 border-t border-white/[0.08] bg-[hsl(0_0%_8%)] px-4 py-3 sm:px-6"
              style={{ paddingBottom: 'max(0.75rem, env(safe-area-inset-bottom))' }}
            >
              <div className={inner}>{footer}</div>
            </div>
          ) : null}
        </div>
      </SheetContent>
    </Sheet>
  );
}

export default FormSheet;
