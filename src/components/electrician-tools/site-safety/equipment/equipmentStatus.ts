/**
 * How a derived equipment status is spelled and coloured.
 *
 * One table, shared by the register list and the detail view. Both used to keep
 * their own `statusTone` + `STATUS_LABEL` + tone→class map, three near-identical
 * copies apiece, and they had already drifted: the list rendered status pills on
 * a neutral surface with coloured text while the detail view rendered the same
 * statuses as tinted washes.
 */

import type { EquipmentDerivedStatus } from '@/hooks/useSafetyEquipment';
import type { Tone } from '@/components/college/primitives';

export const EQUIPMENT_STATUS_LABEL: Record<EquipmentDerivedStatus, string> = {
  overdue: 'Overdue',
  due_soon: 'Due soon',
  unscheduled: 'No test date',
  good: 'In date',
  out_of_service: 'Out of service',
};

export const EQUIPMENT_STATUS_TONE: Record<EquipmentDerivedStatus, Tone> = {
  overdue: 'red',
  due_soon: 'amber',
  unscheduled: 'amber',
  good: 'emerald',
  out_of_service: 'grey',
};

/**
 * Status pills are a NEUTRAL surface with the colour carried by the text.
 *
 * A tinted fill per state turns a list of eight items into eight coloured
 * rectangles, and on the volt card surface the washes muddy. The hairline stays
 * neutral too, so the pill reads as one component regardless of state.
 */
export const STATUS_PILL_CLASS: Record<Tone, string> = {
  red: 'bg-white/[0.05] text-red-400 border-white/10',
  amber: 'bg-white/[0.05] text-amber-400 border-white/10',
  emerald: 'bg-white/[0.05] text-emerald-400 border-white/10',
  green: 'bg-white/[0.05] text-emerald-400 border-white/10',
  orange: 'bg-white/[0.05] text-orange-400 border-white/10',
  blue: 'bg-white/[0.05] text-white border-white/10',
  yellow: 'bg-white/[0.05] text-elec-yellow border-white/10',
  purple: 'bg-white/[0.05] text-white border-white/10',
  cyan: 'bg-white/[0.05] text-white border-white/10',
  indigo: 'bg-white/[0.05] text-white border-white/10',
  grey: 'bg-white/[0.05] text-white border-white/10',
};

export const PILL_BASE =
  'inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-medium uppercase ' +
  'tracking-[0.12em] border whitespace-nowrap';

/** Sort key — the register leads with what needs doing first. */
export const EQUIPMENT_STATUS_RANK: Record<EquipmentDerivedStatus, number> = {
  overdue: 0,
  due_soon: 1,
  unscheduled: 2,
  out_of_service: 3,
  good: 4,
};

/**
 * Test interval in words.
 *
 * Exact match rather than the `days <= 90 → "3 months"` ladder this replaced,
 * which reported a 30-day interval as three months.
 */
export function formatTestFrequency(days: number | null | undefined): string {
  if (!days) return 'Not set';
  const preset: Record<number, string> = {
    90: '3 months',
    180: '6 months',
    365: '12 months',
    730: '24 months',
  };
  return preset[days] ?? `${days} days`;
}
