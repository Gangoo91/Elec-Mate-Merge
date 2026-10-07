/** Shared labels and formatting for the worker's Expenses + My pay pages. */
import { format, parseISO } from 'date-fns';
import type { WorkerExpenseClaim } from '@/hooks/useExpenses';

/** Worker claim categories (stored lowercase; the office normalises them). */
export const WORKER_EXPENSE_CATEGORIES = [
  { value: 'materials', label: 'Materials' },
  { value: 'tools', label: 'Tools' },
  { value: 'parking', label: 'Parking and tolls' },
  { value: 'travel', label: 'Travel (fuel, train, bus)' },
  { value: 'subsistence', label: 'Food and drink' },
  { value: 'ppe', label: 'PPE' },
  { value: 'other', label: 'Other' },
] as const;

export function categoryLabel(raw: string | null | undefined): string {
  const v = (raw || '').toLowerCase();
  if (v === 'mileage') return 'Mileage';
  const hit = WORKER_EXPENSE_CATEGORIES.find((c) => c.value === v);
  if (hit) return hit.label;
  return raw ? raw.charAt(0).toUpperCase() + raw.slice(1) : 'Expense';
}

/** £1,234.56 */
export const gbp = (n: number) =>
  `£${(Number(n) || 0).toLocaleString('en-GB', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;

export const isMileage = (c: WorkerExpenseClaim) =>
  c.mileage_miles != null || (c.category || '').toLowerCase() === 'mileage';

export const statusKey = (s: string | null | undefined) => (s || '').toLowerCase();

export const STATUS_LABEL: Record<string, string> = {
  pending: 'Waiting',
  approved: 'Approved',
  paid: 'Paid',
  rejected: 'Rejected',
};

export function shortDate(iso: string | null | undefined): string {
  if (!iso) return '';
  try {
    return format(parseISO(iso), 'EEE d MMM');
  } catch {
    return '';
  }
}

export function longDate(iso: string | null | undefined): string {
  if (!iso) return '';
  try {
    return format(parseISO(iso), 'd MMM yyyy');
  } catch {
    return '';
  }
}

/** "45p" / "45.5p" */
export const pence = (p: number) => `${Number.isInteger(p) ? p : p.toFixed(1)}p`;

/** "12.3 mi" from google-travel-time's distanceText ("12.3 mi", "1,204 mi", "500 ft"). */
export function parseDistanceText(text: string | null | undefined): number | null {
  if (!text) return null;
  const m = text.replace(/,/g, '').match(/([\d.]+)\s*(mi|ft|km|m)\b/i);
  if (!m) return null;
  const n = parseFloat(m[1]);
  if (!Number.isFinite(n)) return null;
  const unit = m[2].toLowerCase();
  if (unit === 'mi') return n;
  if (unit === 'ft') return n / 5280;
  if (unit === 'km') return n / 1.609344;
  return n / 1609.344;
}
