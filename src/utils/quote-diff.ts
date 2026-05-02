/**
 * Quote diff utility (ELE-956).
 *
 * Compares two QuoteItem arrays (typically v1 and v2 of a versioned quote)
 * and produces a structured diff used by:
 *   - VariationDialog preview
 *   - PublicQuoteView "What's changed" panel for clients
 *   - Final invoice "Variations on this job" section
 *
 * Matching strategy: items with the same `id` are tracked as the SAME line
 * across versions (price/quantity changes flagged). Items present only in
 * `next` are additions. Items present only in `prev` are removals.
 */

import type { QuoteItem } from '@/types/quote';

export interface QuoteItemChange {
  itemId: string;
  description: string;
  changedFields: Array<'description' | 'quantity' | 'unitPrice' | 'unit' | 'totalPrice' | 'notes'>;
  before: Partial<QuoteItem>;
  after: Partial<QuoteItem>;
  totalDelta: number; // £ change on this line (after - before)
}

export interface QuoteDiff {
  added: QuoteItem[];
  removed: QuoteItem[];
  changed: QuoteItemChange[];
  totalDelta: number; // sum of all line-level deltas (positive = price went up)
  hasChanges: boolean;
}

const FIELDS_TO_COMPARE: Array<keyof QuoteItem> = [
  'description',
  'quantity',
  'unitPrice',
  'unit',
  'totalPrice',
  'notes',
];

function isMeaningfulChange(prev: unknown, next: unknown): boolean {
  if (typeof prev === 'number' && typeof next === 'number') {
    // Treat sub-penny floating-point noise as no change.
    return Math.abs(prev - next) > 0.005;
  }
  return prev !== next;
}

export function diffQuoteItems(prev: QuoteItem[], next: QuoteItem[]): QuoteDiff {
  const prevById = new Map(prev.map((i) => [i.id, i]));
  const nextById = new Map(next.map((i) => [i.id, i]));

  const added: QuoteItem[] = [];
  const removed: QuoteItem[] = [];
  const changed: QuoteItemChange[] = [];
  let totalDelta = 0;

  for (const [id, nextItem] of nextById) {
    const prevItem = prevById.get(id);
    if (!prevItem) {
      added.push(nextItem);
      totalDelta += nextItem.totalPrice || 0;
      continue;
    }

    const fieldsChanged: QuoteItemChange['changedFields'] = [];
    const before: Partial<QuoteItem> = {};
    const after: Partial<QuoteItem> = {};
    for (const field of FIELDS_TO_COMPARE) {
      if (isMeaningfulChange(prevItem[field], nextItem[field])) {
        fieldsChanged.push(field as QuoteItemChange['changedFields'][number]);
        before[field] = prevItem[field] as never;
        after[field] = nextItem[field] as never;
      }
    }
    if (fieldsChanged.length > 0) {
      const lineDelta = (nextItem.totalPrice || 0) - (prevItem.totalPrice || 0);
      totalDelta += lineDelta;
      changed.push({
        itemId: id,
        description: nextItem.description || prevItem.description,
        changedFields: fieldsChanged,
        before,
        after,
        totalDelta: lineDelta,
      });
    }
  }

  for (const [id, prevItem] of prevById) {
    if (!nextById.has(id)) {
      removed.push(prevItem);
      totalDelta -= prevItem.totalPrice || 0;
    }
  }

  return {
    added,
    removed,
    changed,
    totalDelta,
    hasChanges: added.length > 0 || removed.length > 0 || changed.length > 0,
  };
}

export function formatDeltaCurrency(delta: number): string {
  const sign = delta > 0 ? '+' : delta < 0 ? '−' : '';
  const abs = Math.abs(delta);
  return `${sign}£${abs.toLocaleString('en-GB', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
}
