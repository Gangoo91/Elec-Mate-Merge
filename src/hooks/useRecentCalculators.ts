import { useCallback, useEffect, useState } from 'react';
import { CALCULATOR_BY_SLUG, type CalculatorEntry } from '@/data/calculators';

const KEY = 'elecmate.calculators.recent';
const MAX = 5;

/**
 * The handful of calculators this user actually opens.
 *
 * There are 63. Most electricians live in five or six of them — voltage drop,
 * Zs, adiabatic, cable sizing — and every visit made them scroll the same
 * categories or retype the same search to reach the same tool.
 *
 * Stored locally on purpose: it is a convenience, not a record. It should not
 * cost a network round trip, and it must not block the picker from opening if
 * storage is unavailable (private browsing, quota, a locked-down WebView).
 * Unknown slugs are dropped on read, so a removed or renamed calculator cannot
 * leave a dead row behind.
 */
const read = (): string[] => {
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return [];
    const parsed: unknown = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    return parsed.filter((s): s is string => typeof s === 'string').slice(0, MAX);
  } catch {
    return [];
  }
};

export function useRecentCalculators() {
  const [slugs, setSlugs] = useState<string[]>([]);

  // Read after mount, never during render — the picker must still open if
  // localStorage throws.
  useEffect(() => setSlugs(read()), []);

  const record = useCallback((slug: string) => {
    setSlugs((prev) => {
      const next = [slug, ...prev.filter((s) => s !== slug)].slice(0, MAX);
      try {
        localStorage.setItem(KEY, JSON.stringify(next));
      } catch {
        // A full or disabled store is not worth failing a calculator over.
      }
      return next;
    });
  }, []);

  // Resolve late so a slug that no longer exists simply disappears.
  const recent: CalculatorEntry[] = slugs
    .map((s) => CALCULATOR_BY_SLUG.get(s))
    .filter((c): c is CalculatorEntry => Boolean(c));

  return { recent, record };
}
