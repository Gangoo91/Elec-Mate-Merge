/**
 * The calendar file a customer taps to put the job in their own diary.
 *
 * Extracted from `send-booking-confirmation` so it can be exercised directly —
 * the all-day date maths below is exactly the kind that looks right, ships, and
 * is only noticed when a customer turns up on the wrong day.
 *
 * The trap: an all-day booking is stored as LOCAL midnight, so during British
 * Summer Time its ISO form is 23:00Z on the PREVIOUS day. Slicing the date off
 * `toISOString()` therefore yields the day before the job. `public-booking`
 * carries a long comment about the same thing biting its slot walker.
 */

const UK = 'Europe/London';

/** RFC 5545 text escaping: backslash, semicolon, comma, newline. */
export const escapeIcs = (text: string): string =>
  text
    .replace(/\\/g, '\\\\')
    .replace(/;/g, '\\;')
    .replace(/,/g, '\\,')
    .replace(/\r?\n/g, '\\n');

/** UTC basic format — 20260817T080000Z. Correct for a timed event. */
export const icsStamp = (iso: string): string =>
  new Date(iso).toISOString().replace(/[-:]/g, '').replace(/\.\d{3}/, '');

/**
 * `yyyymmdd` for the UK calendar day an instant falls on.
 *
 * NOT `toISOString().slice(0, 10)`. An all-day job starting at local midnight
 * on 7 September is `2026-09-06T23:00:00Z` in summer, and the UTC slice calls
 * that the 6th — the customer's calendar would show the job starting a day
 * early, every summer, on every all-day booking.
 */
export const icsDate = (iso: string): string => {
  const parts = new Intl.DateTimeFormat('en-CA', {
    timeZone: UK,
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  }).format(new Date(iso));
  return parts.replace(/-/g, '');
};

/** The UK calendar day `iso` falls on, as a Date at UTC midnight for maths. */
const ukDay = (iso: string): Date => {
  const ymd = icsDate(iso);
  return new Date(
    `${ymd.slice(0, 4)}-${ymd.slice(4, 6)}-${ymd.slice(6, 8)}T00:00:00Z`
  );
};

/**
 * The last day an all-day booking actually covers.
 *
 * An all-day event is stored ending at 23:59:59 local. If a booking is ever
 * stored ending at exactly local midnight instead, that midnight belongs to the
 * evening before — the same rule `effectiveEnd` applies on the client — or the
 * email and the file both claim an extra day.
 */
export function allDayEndDay(endIso: string): Date {
  const end = new Date(endIso);
  const local = new Intl.DateTimeFormat('en-GB', {
    timeZone: UK,
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: false,
  }).format(end);
  if (local === '00:00:00') return ukDay(new Date(end.getTime() - 1000).toISOString());
  return ukDay(endIso);
}

/** Fold at 75 octets per RFC 5545 — Outlook truncates rather than wrapping. */
export function fold(line: string): string {
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

/**
 * A filename a customer can recognise in an attachment bar.
 *
 * It was `booking.ics` for everyone — opaque enough that the person who
 * commissioned it had to ask what it was, which means a customer certainly
 * would. `EICR-3-September.ics` explains itself before it is opened.
 *
 * Sanitised hard: an attachment name goes into a MIME header, so anything that
 * is not a letter, a digit or a dash comes out.
 */
export function bookingIcsFilename(title: string, startIso: string): string {
  const day = new Intl.DateTimeFormat('en-GB', {
    timeZone: UK,
    day: 'numeric',
    month: 'long',
  }).format(new Date(startIso));

  /*
   * Whole words only, up to a sensible length.
   *
   * A hard character cut produced "Full-rewire-4-bed-first-fix-second-fix-a",
   * which reads as a corrupted file rather than a job name. Words are added
   * while they fit and the rest is simply dropped — the date on the end is what
   * makes it identifiable anyway.
   */
  const words = (title || '')
    .normalize('NFKD')
    .replace(/[^a-zA-Z0-9 ]/g, ' ')
    .trim()
    .split(/\s+/)
    .filter(Boolean);

  let slug = '';
  for (const word of words) {
    const next = slug ? `${slug}-${word}` : word;
    if (next.length > 38) break;
    slug = next;
  }

  return `${slug || 'Booking'}-${day.replace(/ /g, '-')}.ics`;
}

export interface BookingIcsOptions {
  uid: string;
  title: string;
  startIso: string;
  endIso: string;
  allDay: boolean;
  location?: string | null;
  description?: string | null;
  organiserName: string;
  /**
   * Bumped on a reschedule. With the UID held constant, this is what makes a
   * calendar client UPDATE the entry rather than adding a second one — without
   * it a moved job leaves the customer holding both times.
   */
  sequence: number;
}

export function buildBookingIcs(opts: BookingIcsOptions): string {
  const lines = [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//Elec-Mate//Booking//EN',
    'CALSCALE:GREGORIAN',
    'METHOD:PUBLISH',
    'BEGIN:VEVENT',
    `UID:${opts.uid}`,
    `DTSTAMP:${icsStamp(new Date().toISOString())}`,
    `SEQUENCE:${opts.sequence}`,
  ];

  if (opts.allDay) {
    // DTEND is EXCLUSIVE for a VALUE=DATE event: a job finishing on the 11th
    // ends on the 12th as far as the file is concerned.
    const endExclusive = allDayEndDay(opts.endIso);
    endExclusive.setUTCDate(endExclusive.getUTCDate() + 1);
    lines.push(`DTSTART;VALUE=DATE:${icsDate(opts.startIso)}`);
    lines.push(
      `DTEND;VALUE=DATE:${endExclusive.toISOString().slice(0, 10).replace(/-/g, '')}`
    );
  } else {
    lines.push(`DTSTART:${icsStamp(opts.startIso)}`);
    lines.push(`DTEND:${icsStamp(opts.endIso)}`);
  }

  lines.push(`SUMMARY:${escapeIcs(opts.title)}`);
  if (opts.location?.trim()) lines.push(`LOCATION:${escapeIcs(opts.location.trim())}`);
  if (opts.description?.trim()) lines.push(`DESCRIPTION:${escapeIcs(opts.description.trim())}`);
  lines.push(`ORGANIZER;CN=${escapeIcs(opts.organiserName)}:MAILTO:noreply@elec-mate.com`);
  lines.push('STATUS:CONFIRMED');
  lines.push('END:VEVENT', 'END:VCALENDAR');

  return lines.map(fold).join('\r\n');
}
