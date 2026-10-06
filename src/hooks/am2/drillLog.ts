/**
 * drillLog — the last drill of each kind, per learner on this device.
 *
 * AM2, 6 Oct 2026. A weak spot comes from the learner's runs, so drilling it
 * didn't change the card — it looked as if nothing had happened. This keeps
 * the last result per drill kind so the card can say "Drilled today, 5 of 6".
 * The weak spot itself only clears with a clean run, which is the honest test.
 * Per-device convenience only; nothing depends on it. Keyed by user, so on a
 * shared college PC one learner doesn't see another's drills.
 */
import type { DrillKind } from '@/data/am2/sectionBDrills';

const keyFor = (uid: string) => `am2-drill-log-${uid}`;

export interface DrillResult {
  at: number;
  right: number;
  of: number;
}

function readAll(uid: string): Partial<Record<DrillKind, DrillResult>> {
  try {
    return JSON.parse(localStorage.getItem(keyFor(uid)) || '{}');
  } catch {
    return {};
  }
}

export function recordDrill(uid: string, kinds: DrillKind[], right: number, of: number) {
  try {
    const all = readAll(uid);
    for (const k of kinds) all[k] = { at: Date.now(), right, of };
    localStorage.setItem(keyFor(uid), JSON.stringify(all));
  } catch {
    /* storage blocked — the drill still happened */
  }
}

export function lastDrill(uid: string, kind: DrillKind): DrillResult | null {
  return readAll(uid)[kind] ?? null;
}

/** "today", "yesterday" or "3 days ago". */
export function drilledWhen(at: number): string {
  const days = Math.floor((Date.now() - at) / 86_400_000);
  return days <= 0 ? 'today' : days === 1 ? 'yesterday' : `${days} days ago`;
}
