import { cn } from '@/lib/utils';
import type { Tone } from '@/components/college/primitives';

/**
 * Risk helpers for the Hazard Database.
 *
 * The `RiskBar` and `RiskBadge` components that used to live here were only
 * ever rendered by `HazardCardV2`, which was itself only rendered by
 * `HazardSearchOverlay` — and nothing rendered that. All three are gone; what
 * survives is the part the live page actually imports.
 */

/** Risk rating (1–25) → band. */
const getRiskLevel = (rating: number): { label: string } => {
  if (rating >= 15) return { label: 'Extreme' };
  if (rating >= 9) return { label: 'High' };
  if (rating >= 4) return { label: 'Medium' };
  return { label: 'Low' };
};

/** The single colour dimension for this module: risk severity → tone. */
export function riskTone(riskRating: number): Tone {
  if (riskRating >= 15) return 'red';
  if (riskRating >= 9) return 'orange';
  if (riskRating >= 4) return 'amber';
  return 'green';
}

/*
 * Only four tones are reachable from riskTone, but Tone is a closed union and
 * this map has to be total over it. The unreachable members point at the
 * nearest reachable band rather than introducing hues this module never uses —
 * a Record with ten colours in it invites someone to reach for one.
 */
const RISK_PILL: Record<Tone, string> = {
  red: 'bg-red-500/10 text-red-400 border-red-500/25',
  orange: 'bg-orange-500/10 text-orange-400 border-orange-500/25',
  amber: 'bg-amber-500/10 text-amber-400 border-amber-500/25',
  green: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/25',
  emerald: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/25',
  blue: 'bg-amber-500/10 text-amber-400 border-amber-500/25',
  purple: 'bg-amber-500/10 text-amber-400 border-amber-500/25',
  cyan: 'bg-amber-500/10 text-amber-400 border-amber-500/25',
  indigo: 'bg-amber-500/10 text-amber-400 border-amber-500/25',
  yellow: 'border border-elec-yellow/35 text-elec-yellow',
  grey: 'bg-white/[0.06] text-white border-white/[0.12]',
};

/** Small uppercase risk pill — matches the Site Safety status-pill pattern. */
export function RiskPill({ riskRating }: { riskRating: number }) {
  const { label } = getRiskLevel(riskRating);
  return (
    <span
      className={cn(
        'inline-flex items-center whitespace-nowrap rounded-full border px-2 py-0.5 text-[10px] font-medium uppercase tracking-[0.12em]',
        RISK_PILL[riskTone(riskRating)]
      )}
    >
      {label}
    </span>
  );
}
