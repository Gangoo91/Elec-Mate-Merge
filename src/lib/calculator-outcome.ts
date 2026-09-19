/**
 * What a calculator publishes when it produces a result.
 *
 * Lives here, not beside the SEO components, so a calculator can report its
 * answer without importing anything from `components/seo` — the calculators are
 * used inside the app as well as on public pages, and one should not drag the
 * other in.
 *
 * `CalculatorWithEmailCapture` adds the calculator's name and path and turns
 * this into the payload the capture form sends.
 */
export interface CalculatorOutcomeRow {
  label: string;
  value: string;
}

export interface CalculatorOutcome {
  /** The answer on its own, e.g. "4 mm²" or "1.37 Ω". */
  headline: string;
  /** Short qualifier under it, e.g. "Minimum CPC". */
  headlineLabel?: string;
  inputs: CalculatorOutcomeRow[];
  outputs: CalculatorOutcomeRow[];
  /** Standards note, e.g. "BS 7671:2018+A4:2026 Table 41.3". */
  basis?: string;
}

/** The prop every wireable calculator exposes. Null clears a stale result. */
export interface CalculatorResultReporter {
  onResult?: (result: CalculatorOutcome | null) => void;
}
