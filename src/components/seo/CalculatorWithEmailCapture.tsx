import { useCallback, useMemo, useState } from 'react';
import {
  CalculatorResultEmail,
  type CalculatorResultSummary,
} from '@/components/seo/CalculatorResultEmail';
import type { CalculatorOutcome } from '@/lib/calculator-outcome';

/**
 * A calculator on a public page, plus the offer to email the answer.
 *
 * Why a wrapper rather than wiring each page directly: on almost every SEO page
 * the calculator is rendered from a module-scope `sections` array, which cannot
 * reach the page component's state. Lifting a `useState` into each page means
 * restructuring the page; this holds the state next to the calculator instead,
 * so a page changes by one line.
 *
 * The capture is deliberately AFTER the result, never in front of it. The
 * calculator stays free, unauthenticated and complete — the email offer is for
 * people who want to keep the answer, which is why the mock exam's version of
 * this converts (219 leads in 30 days) while the gated pattern does not.
 */

// Re-exported so existing importers of this module keep working; the single
// definition lives in lib/calculator-outcome.ts, which the calculators use.
export type { CalculatorOutcome };

interface Props {
  /** Human name of the tool, e.g. "Max Zs Lookup". */
  calculatorName: string;
  /** Full path of THIS page — the origin is forced server-side. */
  calculatorPath: string;
  /**
   * Render the calculator, passing the callback it should fire on every result.
   * A render prop rather than `children` because the callback has to reach the
   * calculator's own `onResult`, and cloneElement guessing at prop names is how
   * that silently stops working the next time someone renames a prop.
   */
  children: (onResult: (outcome: CalculatorOutcome | null) => void) => React.ReactNode;
}

export function CalculatorWithEmailCapture({ calculatorName, calculatorPath, children }: Props) {
  const [outcome, setOutcome] = useState<CalculatorOutcome | null>(null);

  /*
   * 🔴 Must be referentially stable.
   *
   * Calculators publish their result from a `useEffect` that lists this
   * callback in its dependencies. A function rebuilt on every render would set
   * state, re-render, rebuild the callback, and re-run the effect — an infinite
   * loop, and one that only shows up once a calculator is actually wired.
   */
  const handleResult = useCallback((next: CalculatorOutcome | null) => {
    setOutcome((prev) => {
      // Skip no-op updates so a calculator that recomputes on every keystroke
      // does not re-render the capture form underneath the reader's cursor.
      if (prev === next) return prev;
      if (!prev || !next) return next;
      return JSON.stringify(prev) === JSON.stringify(next) ? prev : next;
    });
  }, []);

  const summary = useMemo<CalculatorResultSummary | null>(
    () => (outcome ? { calculatorName, calculatorPath, ...outcome } : null),
    [outcome, calculatorName, calculatorPath]
  );

  return (
    <>
      {children(handleResult)}
      <CalculatorResultEmail result={summary} />
    </>
  );
}

export default CalculatorWithEmailCapture;
