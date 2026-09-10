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

/**
 * Renders a report as the plain text the "Copy" buttons already produce.
 *
 * 41 of the 77 calculators build a label/value summary by hand for the
 * clipboard. Deriving that text from the report instead means the copied text
 * and the PDF can never disagree, and converting a calculator is a matter of
 * turning its string concatenation into a `CalcReport` — the data was always
 * there, it just had nowhere structured to live.
 */
export function reportToText(report: CalcReport): string {
  const lines: string[] = [report.meta.title];
  if (report.meta.subtitle) lines.push(report.meta.subtitle);

  for (const h of report.headline ?? []) {
    lines.push(`${h.label}: ${h.value}${h.unit ? ` ${h.unit}` : ''}${h.verdict ? ` (${h.verdict.toUpperCase()})` : ''}`);
  }

  for (const section of report.sections ?? []) {
    lines.push('');
    if (section.heading) lines.push(section.heading);
    for (const row of section.rows ?? []) {
      lines.push(`${row.label}: ${row.value}${row.note ? ` — ${row.note}` : ''}`);
    }
    for (const item of section.items ?? []) lines.push(`- ${item}`);
  }

  if (report.notes?.length) {
    lines.push('');
    lines.push('Notes & assumptions');
    for (const n of report.notes) lines.push(`- ${n}`);
  }

  return lines.join('\n');
}

/** True when there is actually something worth putting on a page. */
export function reportHasContent(report: CalcReport | null | undefined): boolean {
  if (!report) return false;
  if (report.headline?.length) return true;
  return (report.sections ?? []).some((s) => s.rows?.length || s.items?.length);
}
