/**
 * The week on paper.
 *
 * For the van dashboard and for the office. Not `window.print()` on the
 * calendar page: that page is white type on a dark ground, and browsers do
 * not print backgrounds by default, so it came out as a blank sheet. This
 * writes a plain black-on-white document — one section per day, time, title,
 * customer, address — into a new window and prints that.
 */
import { addDays, format, startOfWeek } from 'date-fns';
import type { CalendarEvent } from '@/types/calendar';
import { clampToDay, eventsOnDay, isSyntheticEvent, occupiesTime } from './eventUtils';

const escapeHtml = (s: string) =>
  s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

export function buildWeekPrintHtml(
  currentDate: Date,
  events: CalendarEvent[],
  businessName?: string | null
): string {
  const weekStart = startOfWeek(currentDate, { weekStartsOn: 1 });
  const days = Array.from({ length: 7 }, (_, i) => addDays(weekStart, i));
  const title = `${format(weekStart, 'd MMM')} – ${format(addDays(weekStart, 6), 'd MMM yyyy')}`;

  const sections = days
    .map((day) => {
      const onDay = eventsOnDay(events, day)
        .filter((e) => !isSyntheticEvent(e) && occupiesTime(e))
        .map((e) => ({ e, ...clampToDay(e, day) }))
        .sort((a, b) => a.start.getTime() - b.start.getTime());
      const rows = onDay.length
        ? onDay
            .map(({ e, start, end }) => {
              const when = e.all_day ? 'All day' : `${format(start, 'HH:mm')}–${format(end, 'HH:mm')}`;
              const meta = [e.customer?.name, e.location].filter(Boolean).map(escapeHtml).join(' · ');
              return `<tr><td class="t">${when}</td><td><strong>${escapeHtml(
                e.title || 'Untitled'
              )}</strong>${meta ? `<br><span class="m">${meta}</span>` : ''}</td></tr>`;
            })
            .join('')
        : '<tr><td class="t"></td><td class="m">Nothing booked</td></tr>';
      return `<h2>${format(day, 'EEEE d MMMM')}</h2><table>${rows}</table>`;
    })
    .join('');

  return `<!doctype html><html><head><meta charset="utf-8"><title>Week ${title}</title>
<style>
  body { font: 12pt/1.4 -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; color: #111; margin: 18mm 16mm; }
  h1 { font-size: 18pt; margin: 0 0 2mm; }
  .sub { color: #444; margin: 0 0 8mm; }
  h2 { font-size: 12pt; margin: 6mm 0 2mm; padding-bottom: 1mm; border-bottom: 1px solid #999; page-break-after: avoid; }
  table { width: 100%; border-collapse: collapse; }
  td { vertical-align: top; padding: 1.5mm 0; border-bottom: 1px solid #e5e5e5; }
  td.t { width: 28mm; white-space: nowrap; font-variant-numeric: tabular-nums; color: #333; }
  .m { color: #555; font-size: 10.5pt; }
  @page { margin: 12mm; }
</style></head><body>
<h1>${businessName ? escapeHtml(businessName) + ' — ' : ''}Week of ${title}</h1>
<p class="sub">Printed ${format(new Date(), 'EEE d MMM yyyy, HH:mm')}</p>
${sections}
<script>window.addEventListener('load', function () { setTimeout(function () { window.print(); }, 150); });</script>
</body></html>`;
}

/** Open the printable week in a new window and print it. */
export function printWeek(currentDate: Date, events: CalendarEvent[], businessName?: string | null) {
  const html = buildWeekPrintHtml(currentDate, events, businessName);
  // No `noopener`: with it, window.open returns null in Chrome and there is
  // no window to write the document into.
  const win = window.open('', '_blank', 'width=900,height=1000');
  if (!win) return false;
  win.document.open();
  win.document.write(html);
  win.document.close();
  return true;
}
