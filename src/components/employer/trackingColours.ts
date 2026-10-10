/**
 * Worker status colours, shared by the tracking list and the map markers so
 * the two never tell different colour stories.
 *
 * 10 Oct 2026: colour only where it means something. On site is the work in
 * progress (solid yellow), travelling is white, the office is a white ring,
 * and anyone not working sits back in dark grey. The old rainbow (green, blue,
 * amber, red for leave, purple) said nothing and made leave look like a fault.
 */
export const STATUS_COLOURS: Record<string, string> = {
  'On Site': 'hsl(47 100% 50%)',
  'En Route': '#ffffff',
  Office: '#ffffff',
  'On Leave': '#5a5a5e',
  'Off Duty': '#5a5a5e',
};

/** Office is drawn as a ring (dark fill, white edge) to tell it from travelling. */
export const STATUS_RING: Record<string, boolean> = { Office: true };

/** Text on top of a status colour: black on yellow or white, white on grey or a ring. */
export function statusInk(status: string): string {
  if (STATUS_RING[status]) return '#ffffff';
  return status === 'On Site' || status === 'En Route' ? '#0a0a0a' : '#ffffff';
}
