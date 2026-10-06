import type { EpaReadinessModel } from '@/lib/epa/readiness';

const AM2_TAB = {
  A1: 'safe-working',
  B: 'testing',
  C: 'safe-isolation',
  D: 'faults',
  E: 'knowledge',
} as const;

/** Where a "do next" item goes in the app. Sign-off items have nowhere to go —
 *  the tutor or assessor ticks them — so they return null. */
export function nextTarget(n: EpaReadinessModel['next'][number]): string | null {
  if (n.kind === 'am2' && n.section) return `/apprentice/am2-simulator?tab=${AM2_TAB[n.section]}`;
  if (n.kind === 'portfolio') return '/apprentice/hub?tab=work';
  return null;
}
