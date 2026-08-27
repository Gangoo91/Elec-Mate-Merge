// The customer's copy of a booking — and of a booking that has moved.
//
// Hand-built to the same standard as the welcome email (`send-welcome-email`)
// rather than through `renderEmailShell`: table layout, VML fallbacks so the
// button survives Outlook, a locked light colour-scheme, and a real type scale.
// This is the most-forwarded, most-screenshotted email the product sends — it
// is what a customer holds you to on the doorstep — so it has to look like it
// came from a business, not from a form.
//
// Branded to the ELECTRICIAN, not to Elec-Mate. Their customer, their name on
// it; client-facing mail carries no Elec-Mate attribution, same as quotes and
// invoices.
//
// Two modes, one template. A reschedule is not a fresh confirmation with
// different words — it has to quote the old time back, or a customer with two
// jobs on the go cannot tell which one moved and waits in on the wrong day.

export interface BookingConfirmationCompany {
  name: string;
  logoUrl?: string | null;
  /** Hex #RRGGBB. Drives the eyebrow, the hero rule and the detail card. */
  primaryColor?: string | null;
  email?: string | null;
  phone?: string | null;
  website?: string | null;
}

export interface BookingConfirmationData {
  company: BookingConfirmationCompany;
  clientName: string;
  title: string;
  startIso: string;
  endIso: string;
  allDay: boolean;
  location?: string | null;
  /** The electrician's own description of the work. */
  note?: string | null;
  /** Set when the booking MOVED. Renders the "was / now" pair. */
  movedFrom?: { startIso: string; endIso: string; allDay: boolean } | null;
  /**
   * The attachment's actual filename.
   *
   * Passed in rather than hard-coded so the sentence telling the customer what
   * to open cannot drift from what is on the message — "open booking.ics" next
   * to an attachment called something else is worse than saying nothing.
   */
  icsFilename?: string;
}

export interface BookingConfirmationEmail {
  subject: string;
  preheader: string;
  html: string;
}

const FONT =
  "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif";

/** Elec-Mate yellow, used when the electrician has not set an accent. */
const DEFAULT_ACCENT = '#F3B70A';
const INK = '#0C1B2A';
const MUTED = '#51606F';
const HAIRLINE = '#E6E9EE';

const escape = (s: string): string =>
  s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

/** Six-digit hex or nothing — an unvalidated value goes straight into a style. */
function safeHex(value: string | null | undefined): string | null {
  const v = (value || '').trim();
  return /^#[0-9a-f]{6}$/i.test(v) ? v : null;
}

/**
 * Rendered in Europe/London, always.
 *
 * The server runs in UTC and the reader is in the UK. Without the explicit
 * zone, a 09:00 booking in British Summer Time renders as 08:00 in the email
 * and the customer arrives an hour early — the exact class of mistake a written
 * confirmation exists to prevent.
 */
const UK = 'Europe/London';

const dayLong = (iso: string): string =>
  new Date(iso).toLocaleDateString('en-GB', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    timeZone: UK,
  });

const timeShort = (iso: string): string =>
  new Date(iso).toLocaleTimeString('en-GB', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
    timeZone: UK,
  });

const sameDay = (a: string, b: string): boolean =>
  new Date(a).toLocaleDateString('en-GB', { timeZone: UK }) ===
  new Date(b).toLocaleDateString('en-GB', { timeZone: UK });

/**
 * The last day an all-day booking actually covers.
 *
 * All-day work is stored ending 23:59:59 LOCAL. Should one ever be stored
 * ending on the stroke of midnight, that midnight belongs to the evening
 * before — the rule `effectiveEnd` applies on the client — and rendering it
 * literally would promise the customer an extra day on site.
 */
const lastCoveredDay = (endIso: string): string => {
  const end = new Date(endIso);
  const clock = new Intl.DateTimeFormat('en-GB', {
    timeZone: UK,
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: false,
  }).format(end);
  return clock === '00:00:00' ? new Date(end.getTime() - 1000).toISOString() : endIso;
};

/** "Thursday 3 September, 09:00–11:00", or a run of days when it is longer. */
export function whenLine(startIso: string, endIso: string, allDay: boolean): string {
  if (allDay) {
    const end = lastCoveredDay(endIso);
    return sameDay(startIso, end) ? dayLong(startIso) : `${dayLong(startIso)} to ${dayLong(end)}`;
  }
  const oneDay = sameDay(startIso, endIso);
  if (oneDay) return `${dayLong(startIso)}, ${timeShort(startIso)}–${timeShort(endIso)}`;
  return `${dayLong(startIso)} ${timeShort(startIso)} to ${dayLong(endIso)} ${timeShort(endIso)}`;
}

/** One label/value line in the details card. */
function detailRow(label: string, value: string, opts?: { muted?: boolean }): string {
  return `
              <tr>
                <td style="padding: 0 0 10px;">
                  <p style="margin: 0 0 2px; font-size: 11px; font-weight: 700; letter-spacing: 1.2px; text-transform: uppercase; color: ${MUTED};">${escape(label)}</p>
                  <p style="margin: 0; font-size: ${opts?.muted ? '14' : '15'}px; font-weight: ${opts?.muted ? '500' : '700'}; color: ${opts?.muted ? MUTED : INK}; line-height: 1.45;${opts?.muted ? ' text-decoration: line-through;' : ''}">${escape(value)}</p>
                </td>
              </tr>`;
}

export function buildBookingConfirmationEmail(
  data: BookingConfirmationData
): BookingConfirmationEmail {
  const firstName = (data.clientName || '').trim().split(/\s+/)[0] || 'there';
  const company = (data.company?.name || 'Your electrician').trim();
  const accent = safeHex(data.company?.primaryColor) ?? DEFAULT_ACCENT;
  const moved = !!data.movedFrom;
  const year = new Date().getFullYear();

  const when = whenLine(data.startIso, data.endIso, data.allDay);
  const oneDay = data.allDay
    ? sameDay(data.startIso, lastCoveredDay(data.endIso))
    : sameDay(data.startIso, data.endIso);
  // The hero splits the date from the time so the two biggest facts each get
  // their own line — a customer glancing at this on a lock screen sees the day.
  const heroDate = data.allDay && !oneDay ? when : dayLong(data.startIso);
  const heroTime = data.allDay
    ? oneDay
      ? 'All day'
      : ''
    : oneDay
      ? `${timeShort(data.startIso)} – ${timeShort(data.endIso)}`
      : `from ${timeShort(data.startIso)}`;

  const subject = moved ? `Your appointment has moved — ${when}` : `You're booked in — ${when}`;
  const preheader = moved
    ? `Now ${when}. The calendar file attached will update your diary.`
    : `${when}. The calendar file attached adds it to your diary.`;

  const details = [
    detailRow('What', data.title || 'Electrical work'),
    data.location?.trim() ? detailRow('Where', data.location.trim()) : '',
    moved && data.movedFrom
      ? detailRow(
          'Previously',
          whenLine(data.movedFrom.startIso, data.movedFrom.endIso, data.movedFrom.allDay),
          { muted: true }
        )
      : '',
  ]
    .filter(Boolean)
    .join('');

  const contactBits = [data.company?.phone, data.company?.email, data.company?.website]
    .map((v) => (v || '').trim())
    .filter(Boolean)
    .map(escape)
    .join(' &middot; ');

  const logoBlock = data.company?.logoUrl
    ? `<img src="${escape(data.company.logoUrl)}" alt="${escape(company)}" height="48" style="display: block; max-height: 48px; border: 0;">`
    : `<p style="margin: 0; font-size: 17px; font-weight: 800; color: ${INK}; letter-spacing: -0.2px;">${escape(company)}</p>`;

  const noteBlock = data.note?.trim()
    ? `
          <tr>
            <td style="padding: 0 36px 26px;" class="pad">
              <p style="margin: 0 0 6px; font-size: 11px; font-weight: 700; letter-spacing: 1.4px; text-transform: uppercase; color: ${INK};">What we'll be doing</p>
              <p style="margin: 0; font-size: 15px; color: ${MUTED}; line-height: 1.62;">${escape(
                data.note.trim()
              )}</p>
            </td>
          </tr>`
    : '';

  const html = `<!DOCTYPE html>
<html lang="en" xmlns:v="urn:schemas-microsoft-com:vml">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="color-scheme" content="light">
  <meta name="supported-color-schemes" content="light">
  <title>${escape(subject)}</title>
  <!--[if mso]>
  <noscript><xml><o:OfficeDocumentSettings><o:PixelsPerInch>96</o:PixelsPerInch></o:OfficeDocumentSettings></xml></noscript>
  <style>table {border-collapse: collapse;} td,th,div,p,a,h1,h2,h3 {font-family: Arial, sans-serif;}</style>
  <![endif]-->
  <style>
    body { margin: 0; padding: 0; width: 100%; background-color: #F4F6F9; }
    a { text-decoration: none; }
    @media screen and (max-width: 480px) {
      .pad { padding-left: 24px !important; padding-right: 24px !important; }
      .hero-date { font-size: 24px !important; }
      .hero-time { font-size: 30px !important; }
    }
  </style>
</head>
<body style="margin: 0; padding: 0; background-color: #F4F6F9; font-family: ${FONT}; -webkit-font-smoothing: antialiased;">
  <div style="display: none; max-height: 0; overflow: hidden; opacity: 0;">${escape(preheader)}</div>
  <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="background-color: #F4F6F9;">
    <tr>
      <td align="center" style="padding: 40px 16px;">

        <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="max-width: 560px; background-color: #FFFFFF; border-radius: 18px; overflow: hidden; border: 1px solid ${HAIRLINE};">

          <!-- Accent ribbon — the electrician's colour, not ours -->
          <tr><td style="height: 4px; background-color: ${accent}; font-size: 0; line-height: 0;">&nbsp;</td></tr>

          <!-- Header: whose email this is -->
          <tr>
            <td align="left" style="padding: 30px 36px 0;" class="pad">
              ${logoBlock}
            </td>
          </tr>

          <!-- Hero: the day and the time, the two facts that matter -->
          <tr>
            <td align="left" style="padding: 22px 36px 0;" class="pad">
              <p style="margin: 0 0 8px; font-size: 11px; font-weight: 700; letter-spacing: 1.6px; text-transform: uppercase; color: ${MUTED};">${
                moved ? 'Appointment moved' : 'Booking confirmed'
              }</p>
              <h1 class="hero-date" style="margin: 0; font-size: 26px; font-weight: 800; color: ${INK}; line-height: 1.15; letter-spacing: -0.5px;">${escape(
                heroDate
              )}</h1>
              ${
                heroTime
                  ? `<p class="hero-time" style="margin: 4px 0 0; font-size: 34px; font-weight: 800; color: ${INK}; line-height: 1.1; letter-spacing: -1px;">${escape(
                      heroTime
                    )}</p>`
                  : ''
              }
              <table role="presentation" cellspacing="0" cellpadding="0" border="0" style="margin: 16px 0 0;">
                <tr><td style="width: 52px; height: 3px; background-color: ${accent}; border-radius: 2px; font-size: 0; line-height: 0;">&nbsp;</td></tr>
              </table>
            </td>
          </tr>

          <!-- Greeting -->
          <tr>
            <td align="left" style="padding: 22px 36px 0;" class="pad">
              <p style="margin: 0 0 12px; font-size: 15px; color: ${INK}; line-height: 1.5;">Hi ${escape(
                firstName
              )},</p>
              <p style="margin: 0 0 24px; font-size: 15px; color: ${MUTED}; line-height: 1.62;">${
                moved
                  ? `We've had to move your appointment. Everything else is unchanged — the new time is above, and the calendar file attached will update your diary.`
                  : `You're booked in with ${escape(
                      company
                    )}. The details are below, and the calendar file attached will put it straight in your diary.`
              }</p>
            </td>
          </tr>

          <!-- Details -->
          <tr>
            <td style="padding: 0 36px 26px;" class="pad">
              <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="background-color: #F8FAFC; border: 1px solid ${HAIRLINE}; border-radius: 14px;">
                <tr>
                  <td style="padding: 20px 22px 10px;">
                    <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%">
                      ${details}
                    </table>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
${noteBlock}
          <!-- Calendar attachment -->
          <tr>
            <td style="padding: 0 36px 30px;" class="pad">
              <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="background-color: ${accent}14; border: 1px solid ${accent}55; border-radius: 14px;">
                <tr>
                  <td style="padding: 16px 20px;">
                    <p style="margin: 0 0 3px; font-size: 14px; font-weight: 700; color: ${INK}; line-height: 1.4;">Add it to your calendar</p>
                    <p style="margin: 0; font-size: 13px; color: ${MUTED}; line-height: 1.55;">Open <strong style="color: ${INK};">${escape(data.icsFilename || 'the calendar file')}</strong>, attached to this email, and your phone will save ${
                      moved ? 'the new time over the old one' : 'the appointment'
                    } automatically.</p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Reply-to safety net -->
          <tr>
            <td style="padding: 22px 36px; background-color: #F8FAFC; border-top: 1px solid ${HAIRLINE};" class="pad">
              <p style="margin: 0; font-size: 13px; color: ${MUTED}; line-height: 1.55;">Need to change it, or not sure about something? Just reply to this email — it comes straight to ${escape(
                company
              )}.</p>
            </td>
          </tr>
          <tr>
            <td align="center" style="padding: 16px 36px 26px; background-color: #F8FAFC;">
              <p style="margin: 0 0 3px; font-size: 12px; font-weight: 600; color: ${INK};">${escape(
                company
              )}</p>
              ${
                contactBits
                  ? `<p style="margin: 0 0 3px; font-size: 11px; color: #8B95A3;">${contactBits}</p>`
                  : ''
              }
              <p style="margin: 0; font-size: 11px; color: #8B95A3;">&copy; ${year} ${escape(
                company
              )}</p>
            </td>
          </tr>

        </table>

      </td>
    </tr>
  </table>
</body>
</html>`;

  return { subject, preheader, html };
}
