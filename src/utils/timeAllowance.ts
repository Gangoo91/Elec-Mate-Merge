import type { QuoteItem } from '@/types/quote';
import { labourLinesFor, shortGradeLabel } from '@/utils/labourGrades';

/**
 * Time allowance on any quote line — ELE-1780.
 *
 * Andrew: *"Is there a way, when you're doing a quote, to allocate time per
 * item instead of trying to guess a time in labour?"*
 *
 * A material line can carry a time allowance ("fit socket — 0.5h") and that
 * time becomes a real labour line on the quote.
 *
 * ## Why a derived LINE and not a change to the totals
 *
 * The obvious implementation — sum `hours × rate` across every item inside
 * `computeQuoteTotals` — double-counts every labour line already on the
 * system. `handleHoursChange` mirrors `hours` into `quantity` and sets
 * `unitPrice = hourlyRate`, so a labour line's money ALREADY is hours × rate,
 * arriving through `quantity × unitPrice`. `computeQuoteTotals` never reads
 * `hours` at all. 464 live labour lines carry `hours > 0`; all 464 would
 * double.
 *
 * Emitting a labour line instead means there is still exactly one way labour
 * reaches the total, so nothing downstream has to learn a second one — not
 * `computeQuoteTotals`, not the PDF, not the invoice conversion, not the
 * Xero push, and not the CIS calculation, which takes its base from the
 * labour subtotal (`quote-calculations.ts:227`) and would otherwise shift
 * under a formula it does not own.
 *
 * ## Rates
 *
 * Costing goes through `labourLinesFor`, unchanged, so a grade with no rate
 * set contributes NO line rather than a £0 one — putting free labour on a
 * customer's quote is worse than omitting it.
 */

/** A line carrying a usable allowance — any grade with real hours on it. */
export const hasTimeAllowance = (item: Pick<QuoteItem, 'timeAllowance'>): boolean =>
  (item.timeAllowance ?? []).some((a) => a && a.hours > 0);

/** Total hours per unit across every grade — for display, not for pricing. */
export const totalAllowanceHours = (item: Pick<QuoteItem, 'timeAllowance'>): number =>
  Math.round(
    (item.timeAllowance ?? []).reduce((sum, a) => sum + (a?.hours || 0), 0) * 100
  ) / 100;

interface RateSources {
  workerRates?: object | null;
  hourlyRate?: number | null;
}

/** A labour line to add to the quote, ready for `addItem`. */
export type DerivedLabourItem = Omit<QuoteItem, 'id' | 'totalPrice'>;

/**
 * The labour a line's time allowance produces.
 *
 * Returns an empty array when there is no allowance, or when no rate is set
 * for the grade — never a zero-priced line.
 */
export const labourForTimeAllowance = (
  item: QuoteItem,
  sources: RateSources
): DerivedLabourItem[] => {
  if (!hasTimeAllowance(item)) return [];
  // A labour line does not get a time allowance of its own: its hours already
  // ARE the labour, and honouring one would bill the same time twice.
  if (item.category === 'labour') return [];

  const quantity = Number(item.quantity) || 0;
  if (quantity <= 0) return [];

  /*
   * Straight through to the existing engine. `labourLinesFor` reads the
   * `labour` array, multiplies each grade by quantity and emits ONE LINE PER
   * GRADE — so a two-man task produces an electrician line and an apprentice
   * line, which is what both the estimator and the customer need to see. No
   * second implementation of the same arithmetic.
   */
  const { lines } = labourLinesFor(
    { labour: (item.timeAllowance ?? []).filter((a) => a && a.hours > 0) },
    quantity,
    sources
  );

  return lines.map((line) => ({
    description: `Labour — ${item.description} (${shortGradeLabel(line.grade)})`,
    quantity: line.hours,
    unit: 'hour',
    unitPrice: line.rate,
    category: 'labour' as const,
    hours: line.hours,
    hourlyRate: line.rate,
    derivedFromItemId: item.id,
  }));
};

/** True when this line was generated from another line's time allowance. */
export const isDerivedLabour = (item: Pick<QuoteItem, 'derivedFromItemId'>): boolean =>
  typeof item.derivedFromItemId === 'string' && item.derivedFromItemId.length > 0;

/**
 * Fields whose edit means the estimator has taken the derived line over.
 *
 * Changing the description is just relabelling; changing the money or the
 * time is a judgement about the job, and regenerating over it would silently
 * discard a deliberate decision.
 */
const OWNERSHIP_FIELDS: (keyof QuoteItem)[] = ['quantity', 'unitPrice', 'hours', 'hourlyRate'];

export const takesOwnershipOfDerived = (updates: Partial<QuoteItem>): boolean =>
  OWNERSHIP_FIELDS.some((f) => f in updates);

/**
 * Editing a derived labour line detaches it, and clears the parent's
 * allowance with it.
 *
 * "Visible and editable" is only honest if an edit survives. A derived line
 * regenerates whenever its parent changes, so an estimator who corrects the
 * hours and then nudges the material quantity would watch their correction
 * vanish — the same class of defect as the loader reconciliation that nearly
 * wiped a signed routine inspection.
 *
 * So the edit wins: the line stops being derived and becomes theirs. The
 * parent's allowance is cleared at the same moment, because leaving it set
 * would emit a SECOND labour line for work already covered — and a duplicate
 * charge on a customer's quote is worse than a lost field.
 */
export const detachDerivedLabour = (
  items: QuoteItem[],
  derivedId: string
): QuoteItem[] => {
  const line = items.find((i) => i.id === derivedId);
  const parentId = line?.derivedFromItemId;
  if (!parentId) return items;

  return items.map((i) => {
    if (i.id === derivedId) {
      const { derivedFromItemId: _dropped, ...owned } = i;
      return owned as QuoteItem;
    }
    if (i.id === parentId) {
      const { timeAllowance: _allowance, ...cleared } = i;
      return cleared as QuoteItem;
    }
    return i;
  });
};

/**
 * Replace the derived labour for one parent, leaving everything else alone.
 *
 * Used on add, on edit and on delete, so there is one definition of "this
 * parent's labour is now X" rather than three that can disagree. Derived lines
 * are appended after the parent so the quote reads material-then-its-labour
 * rather than collecting labour at the bottom.
 */
export const reconcileDerivedLabour = (
  items: QuoteItem[],
  parentId: string,
  replacement: QuoteItem[]
): QuoteItem[] => {
  const withoutOld = items.filter((i) => i.derivedFromItemId !== parentId);
  const at = withoutOld.findIndex((i) => i.id === parentId);
  // Parent is gone (a delete) — its labour goes with it.
  if (at < 0) return withoutOld;
  return [...withoutOld.slice(0, at + 1), ...replacement, ...withoutOld.slice(at + 1)];
};
