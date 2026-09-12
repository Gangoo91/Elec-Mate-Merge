/**
 * Calculator → client PDF: the shared contract.
 * ────────────────────────────────────────────────────────────────────────
 * There are 77 calculators in the app. Giving each one its own PDF layout
 * would be 77 things to keep on brand, so instead every calculator describes
 * its result in the neutral shape below and a single PDFMonkey template
 * ("Calculation Report", markup in `pdf-templates/calculation-report.html`)
 * renders it.
 *
 * Adding a calculator to the feature therefore means writing a `CalcReport`,
 * never touching a template or an edge function.
 *
 * Origin: ELE-1699 — a customer asked how to send a Diversity Factor result to
 * his client. He couldn't; nothing in the app could.
 */

export type CalcVerdict = 'pass' | 'fail' | 'warn';

/** One of the big numbers across the top. One to three reads best; four is the cap. */
export interface CalcHeadline {
  label: string;
  /** Already formatted — the calculator knows its own precision, the PDF doesn't. */
  value: string;
  unit?: string;
  verdict?: CalcVerdict;
}

export interface CalcRow {
  label: string;
  value: string;
  /** Small print under the value: the assumption, factor or limit behind it. */
  note?: string;
}

/** A block in the body. Use `rows` for a table, `items` for prose bullets. */
export interface CalcSection {
  heading?: string;
  rows?: CalcRow[];
  items?: string[];
}

export interface CalcReport {
  meta: {
    /** The calculator's name, as the client should see it. */
    title: string;
    /** One line of context — what was calculated, for what. */
    subtitle?: string;
    /** e.g. "BS 7671:2018+A4:2026 · App. 4". Cite it if the calc is standards-based. */
    standard?: string;
    reference?: string;
    /** Omit — the server stamps today's date in en-GB. */
    generated?: string;
  };
  client?: { name?: string; site?: string };
  preparedBy?: string;
  headline?: CalcHeadline[];
  sections?: CalcSection[];
  notes?: string[];
  disclaimer?: string;
}

/**
 * The line every calculation report carries unless it overrides it.
 *
 * A design calculation is not a certificate, and an electrician handing this to
 * a client must not appear to be certifying an installation they have not
 * inspected or tested. Saying so on the document protects them.
 */
export const DEFAULT_CALC_DISCLAIMER =
  'This report records a design calculation based on the values entered above. ' +
  'It is not a certificate of inspection or testing and does not confirm the ' +
  'condition or compliance of any existing installation.';

/*
 * There is deliberately NO `reportToText` here.
 *
 * An earlier version of this contract carried one, on the reasoning that the
 * "Copy result" buttons should be derived from the report so the copied text
 * and the PDF could never disagree. That was superseded: `CopyResultButton`
 * scrapes the rendered result pane via `data-result-copy`, so what it copies is
 * exactly what the electrician is looking at.
 *
 * The two are meant to differ. Copy is "the answer on my screen"; the PDF is the
 * client document, and carries the inputs, the working, the notes and the
 * disclaimer as well. Deriving one from the other would make the PDF poorer or
 * the clipboard noisier, so please don't reinstate it.
 */

/** True when there is actually something worth putting on a page. */
export function reportHasContent(report: CalcReport | null | undefined): boolean {
  if (!report) return false;
  if (report.headline?.length) return true;
  return (report.sections ?? []).some((s) => s.rows?.length || s.items?.length);
}
