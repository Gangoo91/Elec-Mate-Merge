import type { QuoteItem } from '@/types/quote';
import type { BundleLineItem } from '@/hooks/usePriceBookBundles';
import { hasTimeAllowance, isDerivedLabour } from '@/utils/timeAllowance';

/**
 * ELE-2026 — turn a quote's lines into Price Book bundle lines, so a job
 * priced once can be dropped into the next quote in one tap (Sean Mulcahy:
 * "Could the labour and materials be saved here from a quote?").
 *
 * Labour from a time allowance is a DERIVED line on the quote. It is left out
 * here and its parent keeps the allowance instead; replaying the parent
 * through `addItem` derives the labour again. Saving both would put the same
 * time on the next quote twice.
 *
 * Labour the estimator typed (or took over by editing a derived line) is a
 * line of its own and is saved as one.
 */
export function quoteItemsToBundleLines(items: QuoteItem[]): BundleLineItem[] {
  return items
    .filter((i) => !isDerivedLabour(i))
    .filter((i) => (i.description ?? '').trim() && Number(i.quantity) > 0)
    .map((i) => {
      const category: BundleLineItem['category'] =
        i.category === 'labour' ? 'labour' : i.category === 'equipment' ? 'equipment' : 'materials';
      const line: BundleLineItem = {
        id: crypto.randomUUID(),
        name: i.description.trim(),
        quantity: Number(i.quantity),
        unit: i.unit || (category === 'labour' ? 'hour' : 'each'),
        unitPrice: Number(i.unitPrice) || 0,
        category,
      };
      if (category !== 'labour' && hasTimeAllowance(i)) {
        line.timeAllowance = (i.timeAllowance ?? [])
          .filter((a) => a && a.hours > 0)
          .map((a) => ({ grade: a.grade, hours: a.hours }));
      }
      return line;
    });
}

/** Hours of labour a bundle's time allowances will add when replayed. */
export function bundleAllowanceHours(lines: BundleLineItem[]): number {
  const total = lines.reduce(
    (sum, l) =>
      sum + (l.timeAllowance ?? []).reduce((s, a) => s + (a.hours || 0), 0) * (l.quantity || 0),
    0
  );
  return Math.round(total * 100) / 100;
}

/** The QuoteItem a bundle line becomes on replay, ready for `addItem`. */
export function bundleLineToQuoteItem(line: BundleLineItem): Omit<QuoteItem, 'id' | 'totalPrice'> {
  const base = {
    description: line.name,
    quantity: line.quantity,
    unit: line.unit,
    // Already the sell price — the bundle total shows it (ELE-1010).
    unitPrice: line.unitPrice,
    category: line.category,
  } as Omit<QuoteItem, 'id' | 'totalPrice'>;
  if (line.category === 'labour') {
    // Same shape handleHoursChange writes: hours mirrors quantity.
    return { ...base, hours: line.quantity, hourlyRate: line.unitPrice };
  }
  return line.timeAllowance?.length ? { ...base, timeAllowance: line.timeAllowance } : base;
}
