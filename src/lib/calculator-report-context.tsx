/**
 * Calculator → client PDF: how a calculator offers its report to the page.
 * ────────────────────────────────────────────────────────────────────────
 * The 65 calculators in `CALCULATOR_COMPONENTS` are all rendered by ONE page
 * (`/electrician/calculations?calc=<slug>`), so the "PDF for client" button
 * belongs to that page, not to each calculator. The calculator's only job is
 * to say what its current result is; the page owns the button, the loading
 * state and the download.
 *
 * WHY A CONTEXT RATHER THAN A PROP
 * These same calculator components are rendered by 45 public SEO pages, where
 * the visitor has no account and the generator would only ever fail. Those
 * pages render the component WITHOUT this provider, so `useProvideCalcReport`
 * finds no context and does nothing — the button cannot appear publicly by
 * construction. There is no flag to remember to set, and no way to leak it.
 */

import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from 'react';

import type { CalcReport } from '@/lib/calculator-report';

type ReportFn = () => CalcReport | null;

interface CalcReportContextValue {
  /** Called by the active calculator whenever its result changes. */
  publish: (fn: ReportFn | null) => void;
  /** Read by the page's button. Null when the calculator has no result yet. */
  current: ReportFn | null;
}

const CalcReportContext = createContext<CalcReportContextValue | null>(null);

export function CalcReportProvider({ children }: { children: ReactNode }) {
  const [current, setCurrent] = useState<ReportFn | null>(null);
  const value = useMemo<CalcReportContextValue>(
    // Stored via the updater form: a function in state would otherwise be
    // treated as a state updater and invoked instead of kept.
    () => ({ publish: (fn) => setCurrent(() => fn), current }),
    [current]
  );
  return <CalcReportContext.Provider value={value}>{children}</CalcReportContext.Provider>;
}

/**
 * Called by a calculator to offer its current result to the page.
 *
 * Pass a function that returns the report, or null when there is nothing to
 * report yet. Outside the provider (i.e. on an SEO page) this is a no-op.
 *
 *   useProvideCalcReport(result ? () => buildReport() : null);
 */
export function useProvideCalcReport(fn: ReportFn | null) {
  const ctx = useContext(CalcReportContext);
  const publish = ctx?.publish;

  // The identity of an inline arrow changes on every render, which would loop
  // publish → re-render → publish. The ref keeps the latest closure while the
  // effect depends only on whether a report exists at all.
  const latest = useRef(fn);
  latest.current = fn;
  const available = Boolean(fn);

  useEffect(() => {
    if (!publish) return;
    publish(available ? () => latest.current?.() ?? null : null);
    return () => publish(null);
  }, [publish, available]);
}

/** Used by the page to render its button. */
export function useCalcReport(): ReportFn | null {
  return useContext(CalcReportContext)?.current ?? null;
}
