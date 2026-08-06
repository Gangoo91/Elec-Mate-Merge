import { workerTypes } from '@/data/electrician/presetData';

/**
 * ELE-1445 / ELE-1470 — which grade a price-book item's labour allowance is
 * costed at.
 *
 * Requested by Sean Mulcahy, 6 Aug 2026:
 *
 *   "It would be good to assign it to items in the price book so that the
 *    labour and materials populate on the quote, then sum up the total. Also to
 *    be able to assign the item to any of the labour on the quote eg
 *    Electrician, Apprentice etc and it would then work out that cost."
 *
 * The rates themselves already existed — `company_profiles.worker_rates` is
 * populated for all 250 profiles and editable from Profile → Worker rates. What
 * was missing is the item knowing WHICH grade its hours belong to, so a 0.5h
 * apprentice task was being costed at the electrician rate.
 *
 * Kept in one place because three surfaces have to agree on the answer: the
 * Price Book preview, the quote builder and the invoice builder. When they
 * disagree the electrician quotes one number and invoices another.
 */

export type LabourGradeId = string;

/** The grades on offer, id → display name. */
export const LABOUR_GRADES = workerTypes.map((w) => ({ id: w.id, name: w.name }));

/** Short labels — "Qualified Electrician" does not fit on a chip. */
export const LABOUR_GRADE_SHORT: Record<string, string> = {
  electrician: 'Electrician',
  apprentice: 'Apprentice',
  labourer: 'Labourer',
  designer: 'Designer',
  owner: 'Owner',
};

export const shortGradeLabel = (id?: string | null) =>
  (id && LABOUR_GRADE_SHORT[id]) || LABOUR_GRADE_SHORT.electrician;

/** The grade used when an item does not name one. */
export const DEFAULT_LABOUR_GRADE = 'electrician';

interface RateSources {
  /**
   * company_profiles.worker_rates — per-grade hourly rates. Typed loosely on
   * purpose: the stored shape is `WorkerRates` (five required keys), but a
   * lookup by arbitrary grade id has to be allowed to miss, and casting at
   * every call site would be three casts that each have to stay correct.
   */
  workerRates?: object | null;
  /** company_profiles.hourly_rate — the single headline rate. */
  hourlyRate?: number | null;
}

/**
 * Hourly rate for a grade.
 *
 * Order: the user's saved rate for that grade → their headline hourly rate (for
 * `electrician` only, since that is what the headline rate means) → the preset
 * default. Returns 0 when nothing is set, and callers treat 0 as "skip the
 * labour line" rather than invoicing at a rate the electrician never agreed to.
 */
export const rateForGrade = (grade: string | null | undefined, sources: RateSources): number => {
  const id = grade || DEFAULT_LABOUR_GRADE;
  // One cast, here, rather than at each of the three call sites. `WorkerRates`
  // is an interface, and TypeScript gives interfaces no implicit index
  // signature — so it is not assignable to Record<string, number> however the
  // parameter is written. Looking it up by an arbitrary grade id has to be
  // allowed to miss, hence the `| undefined`.
  const saved = (sources.workerRates as Record<string, number> | undefined)?.[id];
  if (typeof saved === 'number' && saved > 0) return saved;

  if (id === DEFAULT_LABOUR_GRADE && (sources.hourlyRate ?? 0) > 0) {
    return sources.hourlyRate as number;
  }

  // No saved rate and no headline rate. Deriving one from a preset would put a
  // number on a customer's quote that the electrician never chose, so don't.
  return 0;
};

/** One grade's share of an item's labour. */
export interface LabourAllocation {
  grade: string;
  hours: number;
}

/**
 * An item's labour, normalised.
 *
 * The first cut allowed ONE grade per item. Real jobs are not like that — a
 * pull-in or a board change is an electrician AND an apprentice on site
 * together, and pricing it at one rate is wrong whichever rate you pick.
 *
 * `labour` (an array) is the current shape. `labour_hours` + `labour_grade`
 * remain the legacy single-grade pair and are read when `labour` is absent, so
 * the 1,256 rows already imported keep working untouched.
 */
export const labourAllocations = (item: {
  labour?: LabourAllocation[] | null;
  labour_hours?: number | null;
  labour_grade?: string | null;
}): LabourAllocation[] => {
  if (item.labour && item.labour.length > 0) {
    return item.labour.filter((a) => a && a.hours > 0);
  }
  const hours = item.labour_hours ?? 0;
  if (hours > 0) return [{ grade: item.labour_grade || DEFAULT_LABOUR_GRADE, hours }];
  return [];
};

export interface LabourLine {
  grade: string;
  hours: number;
  rate: number;
  total: number;
}

/**
 * Cost every grade on an item. Returns one line per grade so a quote shows
 * "2h electrician" and "2h apprentice" separately — which is what the customer
 * and the estimator both need to see.
 *
 * A grade with no rate set contributes NO line rather than a £0 one: putting
 * free labour on a customer quote is worse than omitting it.
 */
export const labourLinesFor = (
  item: {
    labour?: LabourAllocation[] | null;
    labour_hours?: number | null;
    labour_grade?: string | null;
  },
  quantity: number,
  sources: RateSources
): { lines: LabourLine[]; totalHours: number; total: number } => {
  const lines: LabourLine[] = [];
  let totalHours = 0;
  let total = 0;
  for (const alloc of labourAllocations(item)) {
    const hours = Math.round(alloc.hours * quantity * 100) / 100;
    if (hours <= 0) continue;
    totalHours = Math.round((totalHours + hours) * 100) / 100;
    const rate = rateForGrade(alloc.grade, sources);
    if (rate <= 0) continue;
    const lineTotal = Math.round(hours * rate * 100) / 100;
    total = Math.round((total + lineTotal) * 100) / 100;
    lines.push({ grade: alloc.grade, hours, rate, total: lineTotal });
  }
  return { lines, totalHours, total };
};

/**
 * What was actually added, quantity included. The chip on an item shows the
 * PER-UNIT allowance; the confirmation after adding must show the real total,
 * or adding 5 of a 0.5h item says "+0.5h" and quietly bills 2.5h.
 */
export const describeLines = (lines: LabourLine[]): string =>
  lines.map((l) => `${l.hours}h ${shortGradeLabel(l.grade).toLowerCase()}`).join(' + ');

/** "0.5h electrician + 0.5h apprentice" — one string for cards and chips. */
export const describeLabour = (allocs: LabourAllocation[]): string =>
  allocs.map((a) => `${a.hours}h ${shortGradeLabel(a.grade).toLowerCase()}`).join(' + ');
