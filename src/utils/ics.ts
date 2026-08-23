/**
 * ELE-1572 — build a downloadable .ics for a single booking.
 *
 * Elec-Mate already publishes a subscribable feed (`calendar-ical-feed` edge
 * function), which is the right mechanism for keeping a whole diary in sync.
 * This is the other half: a one-off file for someone who just wants THIS job
 * in the calendar app on their phone without setting a subscription up.
 *
 * Line format follows RFC 5545 and deliberately matches the edge function's
 * output — same escaping, same UTC stamps — so a job added by file and the
 * same job arriving via the feed look identical to the calendar client.
 */

/** RFC 5545 text escaping: backslash, semicolon, comma, newline. */
function escapeIcsText(text: string): string {
  return text
    .replace(/\\/g, '\\\\')
    .replace(/;/g, '\\;')
    .replace(/,/g, '\\,')
    .replace(/\r?\n/g, '\\n');
}

/** UTC basic format — 20260817T080000Z. */
function formatIcsDate(iso: string): string {
  return new Date(iso)
    .toISOString()
    .replace(/[-:]/g, '')
    .replace(/\.\d{3}/, '');
}

/**
 * Fold at 75 octets per RFC 5545. Outlook in particular truncates long
 * unfolded SUMMARY/DESCRIPTION lines rather than wrapping them itself.
 */
function foldLine(line: string): string {
  if (line.length <= 75) return line;
  const parts: string[] = [line.slice(0, 75)];
  let rest = line.slice(75);
  while (rest.length > 74) {
    parts.push(` ${rest.slice(0, 74)}`);
    rest = rest.slice(74);
  }
  if (rest.length) parts.push(` ${rest}`);
  return parts.join('\r\n');
}

import { saveOrShareFile } from '@/utils/save-or-share-file';

export interface IcsEvent {
  uid: string;
  title: string;
  startIso: string;
  endIso: string;
  location?: string | null;
  description?: string | null;
}

export function buildIcs(events: IcsEvent[]): string {
  const stamp = formatIcsDate(new Date().toISOString());
  const lines: string[] = [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//Elec-Mate//Booking//EN',
    'CALSCALE:GREGORIAN',
    'METHOD:PUBLISH',
  ];

  for (const ev of events) {
    lines.push('BEGIN:VEVENT');
    lines.push(`UID:${ev.uid}`);
    lines.push(`DTSTAMP:${stamp}`);
    lines.push(`DTSTART:${formatIcsDate(ev.startIso)}`);
    lines.push(`DTEND:${formatIcsDate(ev.endIso)}`);
    lines.push(foldLine(`SUMMARY:${escapeIcsText(ev.title)}`));
    if (ev.location) lines.push(foldLine(`LOCATION:${escapeIcsText(ev.location)}`));
    if (ev.description) {
      lines.push(foldLine(`DESCRIPTION:${escapeIcsText(ev.description)}`));
    }
    lines.push('END:VEVENT');
  }

  lines.push('END:VCALENDAR');
  // CRLF is required by the spec — some Android calendar apps reject LF-only.
  return lines.join('\r\n');
}

/**
 * Hand the calendar file to the user. Safe to call from a click handler.
 *
 * Was an `<a download>`, which WKWebView ignores — so on native nothing
 * happened, which for a calendar invite means the event simply never got added.
 * `saveOrShareFile` opens the share sheet there, where iOS offers Calendar
 * directly, and still downloads on web.
 */
export async function downloadIcs(filename: string, events: IcsEvent[]): Promise<void> {
  const blob = new Blob([buildIcs(events)], {
    type: 'text/calendar;charset=utf-8',
  });
  await saveOrShareFile(blob, filename.endsWith('.ics') ? filename : `${filename}.ics`);
}
