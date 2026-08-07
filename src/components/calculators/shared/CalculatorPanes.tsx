import { ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface CalculatorPanesProps {
  /** Inputs and the Calculate/Reset row. */
  form: ReactNode;
  /** The answer. `null` until the user has calculated. */
  result?: ReactNode;
  /** Guidance / standards — full width beneath both panes. */
  footer?: ReactNode;
  /** Shown in the result pane before there is a result. One short line. */
  placeholder?: string;
  className?: string;
}

/**
 * Two panes: inputs on the left, the answer on the right.
 *
 * Every calculator was a single column, so on a desktop the inputs, the
 * Calculate button and the answer were stacked down the middle of a 2300px
 * window — you press Calculate, the answer appears below the fold, you scroll
 * down to read it, then scroll back up to change an input and do it again. The
 * core loop of a calculator is change-a-number-watch-the-answer-move, and that
 * loop was broken by the layout.
 *
 * From `lg:` up the answer sits beside the form and sticks while the form
 * scrolls, so it stays on screen for a long input list. Below `lg:` it is one
 * column in the old order — on a phone, stacked is correct, and the answer
 * lands directly under the button you just pressed.
 *
 * The result pane holds its place before you calculate rather than leaving half
 * the row empty, so pressing Calculate doesn't shift the page.
 */
export const CalculatorPanes = ({
  form,
  result,
  footer,
  placeholder = 'Your result will appear here.',
  className,
}: CalculatorPanesProps) => (
  <div className={cn('space-y-5', className)}>
    {/* Not a grid below `lg:`. `CalculatorInput` renders `h-full`, and a
        percentage height inside a stretched grid item resolves against the grid
        area rather than the content — the form pane came out 632px tall around
        1166px of inputs, and the overflow drew straight over the result beneath
        it. Stacked phone layout needs no grid, so there is nothing to resolve
        against; from `lg:` the two panes are explicit columns. */}
    <div className="space-y-5 lg:grid lg:grid-cols-2 lg:items-start lg:gap-6 lg:space-y-0">
      <div className="min-w-0 space-y-4">{form}</div>

      {/* `self-start` + `sticky` keeps the answer in view; without `min-w-0` a
          long unbroken figure would push the grid track wider than its half.

          The placeholder is driven by `:empty` rather than by a `hasResult`
          prop. Each calculator gates its own result on its own condition
          (`{result && ...}`, `{results && ...}`, a ternary), so a prop would
          mean hand-extracting 60 different expressions; when the condition is
          false React renders no child at all and `:empty` matches. Desktop
          only — on a phone an empty box below the button is just noise. */}
      <div
        className={cn(
          'min-w-0 lg:sticky lg:top-4 lg:self-start',
          'lg:empty:rounded-xl lg:empty:border lg:empty:border-dashed lg:empty:border-white/[0.14] lg:empty:p-6',
          'lg:empty:before:content-[attr(data-result-placeholder)]',
          'lg:empty:before:text-[13px] lg:empty:before:leading-relaxed lg:empty:before:text-white'
        )}
        // Not `data-placeholder`: Radix already sets that on Select triggers, so the
        // name collides with library markup and made the panes uncountable.
        data-result-placeholder={placeholder}
      >
        {result}
      </div>
    </div>

    {footer}
  </div>
);

export default CalculatorPanes;
