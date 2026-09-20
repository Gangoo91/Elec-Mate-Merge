/**
 * What the colours mean, once, under the grid.
 *
 * Colour by state (in progress, complete, on hold) is only useful if it can
 * be learnt without a manual. One quiet line; hidden on a phone, where the
 * day rail spells the state out in words on each block's sheet.
 */
import { EVENT_COLOURS } from '@/types/calendar';
import { STATE_COLOURS } from './eventUtils';

const ITEMS: Array<{ label: string; colour: string }> = [
  { label: 'Booked', colour: EVENT_COLOURS.job },
  { label: 'In progress', colour: STATE_COLOURS.active },
  { label: 'Complete', colour: STATE_COLOURS.completed },
  { label: 'On hold', colour: STATE_COLOURS.on_hold },
  { label: 'Site visit', colour: EVENT_COLOURS.site_visit },
  { label: 'Inspection', colour: EVENT_COLOURS.inspection },
  { label: 'Synced from Google', colour: '#3B82F6' },
];

const CalendarLegend = () => (
  <div className="hidden flex-wrap items-center gap-x-4 gap-y-1 px-1 sm:flex" aria-label="Colour key">
    {ITEMS.map((i) => (
      <span key={i.label} className="flex items-center gap-1.5 text-[11px] font-medium text-white">
        <span className="h-2.5 w-2.5 rounded-sm" style={{ backgroundColor: i.colour }} aria-hidden />
        {i.label}
      </span>
    ))}
    <span className="text-[11px] text-white">Drag a booking to move it</span>
  </div>
);

export default CalendarLegend;
