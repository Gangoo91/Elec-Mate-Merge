/**
 * Telling a customer the slot is theirs.
 *
 * The sibling of `bookingMessage.ts`, which carries the "book a time with me"
 * INVITE. This carries the confirmation of a time already agreed, and the two
 * are deliberately separate: an invite is marketing and can be a bit warm; a
 * confirmation is a fact someone will screenshot and hold you to, so it leads
 * with the day, the time and the address and gets out of the way.
 *
 * Nothing here sends anything. Every one of these opens the electrician's own
 * WhatsApp, Messages or mail client with the text already in it — they read it
 * and press send. No message leaves on its own.
 */
import { format } from 'date-fns';
import { normaliseUkPhone } from '@/components/electrician/booking/bookingMessage';

export interface ConfirmationParts {
  /** Who it is for. First name only in the greeting. */
  clientName?: string | null;
  /** The electrician's trading name, when it is known. */
  businessName?: string | null;
  title: string;
  start: Date;
  end: Date;
  allDay: boolean;
  location?: string | null;
  /**
   * The time this was moved FROM, when it has been rescheduled.
   *
   * Changes the whole message. "You're booked in" sent about a job that moved
   * reads as a new booking, and the customer turns up on the original day —
   * which is the single most expensive thing a diary can cause.
   */
  movedFrom?: { start: Date; end: Date; allDay: boolean } | null;
  /**
   * ELE-1648 — every day of a job booked across non-contiguous days.
   *
   * Set only for a split job. `start`/`end` still describe the FIRST day, so
   * anything that ignores this reads as a normal single booking rather than
   * breaking; `whenLine` is the one place that spends it.
   *
   * The point of this field is that the customer gets ONE message. Alex
   * Gibbons, 30 Aug 2026: "Wouldnt i then need to make like 2 entries and then
   * send 2 texts/enails ext?" — five day-entries must not mean five texts.
   */
  jobDates?: Date[] | null;
  /**
   * ELE-1685 — the electrician's own wording for a confirmation, from
   * Settings → Booking availability. Tokens: {name} {business} {what} {when}
   * {where}. Null or blank means the default below. A reschedule (`movedFrom`)
   * always uses the built-in wording, because it must quote the old time back.
   */
  template?: string | null;
}

/** The tokens a custom confirmation may use, with what each one becomes. */
export const CONFIRMATION_TOKENS = [
  { token: '{name}', means: 'their first name' },
  { token: '{business}', means: 'your trading name' },
  { token: '{what}', means: 'the booking title' },
  { token: '{when}', means: 'the day and time' },
  { token: '{where}', means: 'the address' },
] as const;

/** The stock message, expressed as a template so the two can never drift. */
export const DEFAULT_CONFIRMATION_TEMPLATE = [
  'Hi {name},',
  '',
  'You’re booked in — {business}.',
  '',
  'What: {what}',
  'When: {when}',
  'Where: {where}',
  '',
  'If that no longer suits, just reply and we’ll sort another time.',
].join('\n');

/**
 * Fill a template in.
 *
 * Empty values must not leave debris behind: a customer with no address on
 * file should not get a bare "Where:" line, and no trading name should not
 * leave "booked in — ." So a line that ends up as only a label is dropped, a
 * dangling " — " separator is trimmed, and "Hi ," collapses to "Hi,".
 */
export function renderConfirmationTemplate(
  template: string,
  values: Record<'name' | 'business' | 'what' | 'when' | 'where', string>
): string {
  const TOKEN = /\{(name|business|what|when|where)\}/g;
  const lines = template.split('\n').flatMap((line) => {
    // Clean-up applies ONLY to a line in which a token rendered empty. A line
    // the electrician wrote himself with no token in it — "Parking:", "Gate
    // code:", a line ending in a dash — is his and is left exactly as typed
    // (code review caught the first version deleting those).
    let emptied = false;
    const filled = line.replace(TOKEN, (_, key) => {
      const v = values[key as keyof typeof values] ?? '';
      if (!v.trim()) emptied = true;
      return v;
    });
    if (!emptied) return [filled];
    const cleaned = filled
      .replace(/\s*[—–-]\s*\.$/, '.') // "booked in — ." → "booked in."
      .replace(/\s*[—–-]\s*$/, '') // "booked in —" → "booked in"
      .replace(/\s+([,.!?;:])/g, '$1') // "Hi ," / "Hi !" → "Hi," / "Hi!"
      .replace(/[ \t]+$/, '');
    // Nothing but a label left ("Where:") or nothing at all — drop the line.
    if (/^[^{}]{0,40}:$/.test(cleaned.trim()) || cleaned.trim() === '') return [];
    return [cleaned];
  });
  return lines.join('\n').replace(/\n{3,}/g, '\n\n').trim();
}

/**
 * "Monday 1, Wednesday 3 and Friday 5 September".
 *
 * The month is stated once at the end when every day shares it, and on each
 * date when they don't — a job running into the next month has to say so, and
 * "Monday 29, Wednesday 1 September" would be read as all-September.
 */
function listDays(dates: readonly Date[]): string {
  const sorted = [...dates].sort((a, b) => a.getTime() - b.getTime());
  const oneMonth = sorted.every((d) => d.getMonth() === sorted[0].getMonth() && d.getFullYear() === sorted[0].getFullYear());
  const parts = sorted.map((d, i) =>
    oneMonth && i < sorted.length - 1 ? format(d, 'EEEE d') : format(d, 'EEEE d MMMM')
  );
  if (parts.length === 1) return parts[0];
  return `${parts.slice(0, -1).join(', ')} and ${parts[parts.length - 1]}`;
}

/** True when these days run one after another, so a range reads better. */
function areConsecutive(dates: readonly Date[]): boolean {
  const sorted = [...dates].sort((a, b) => a.getTime() - b.getTime());
  for (let i = 1; i < sorted.length; i++) {
    const prev = new Date(sorted[i - 1].getFullYear(), sorted[i - 1].getMonth(), sorted[i - 1].getDate());
    const cur = new Date(sorted[i].getFullYear(), sorted[i].getMonth(), sorted[i].getDate());
    if (Math.round((cur.getTime() - prev.getTime()) / 86_400_000) !== 1) return false;
  }
  return true;
}

/** First name only — "Hi Mrs Patricia Hargreaves," reads like a letter from a bank. */
function firstName(name: string | null | undefined): string | null {
  if (!name) return null;
  const first = name.trim().split(/\s+/)[0];
  return first && first.length > 1 ? first : null;
}

/**
 * The "when" line.
 *
 * A single day reads "Thursday 27 August"; a run of days reads "Thursday 27
 * August to Wednesday 2 September", because an all-day booking is usually a job
 * that lasts a fortnight and "Thursday 27 August" would be a lie about the
 * other nine days.
 */
export function whenLine(parts: ConfirmationParts): string {
  const { start, end, allDay } = parts;

  /*
   * A split job names its days (ELE-1648).
   *
   * Consecutive days read as a range, because "Monday 1 to Wednesday 3
   * September" is how someone would actually say a three-day job; the list is
   * for days that genuinely skip. Both branches must be handled here — a split
   * job's day-rows each cover ONE day, so `start`/`end` describe day one only,
   * and falling through would promise the customer a single day of a job that
   * runs three.
   */
  const days = parts.jobDates ?? [];
  if (days.length > 1) {
    const sorted = [...days].sort((a, b) => a.getTime() - b.getTime());
    return areConsecutive(sorted)
      ? `${format(sorted[0], 'EEEE d MMMM')} to ${format(sorted[sorted.length - 1], 'EEEE d MMMM')}`
      : listDays(sorted);
  }

  const sameDay = start.toDateString() === end.toDateString();

  if (allDay) {
    return sameDay
      ? format(start, 'EEEE d MMMM')
      : `${format(start, 'EEEE d MMMM')} to ${format(end, 'EEEE d MMMM')}`;
  }
  if (sameDay) {
    return `${format(start, 'EEEE d MMMM')}, ${format(start, 'HH:mm')}–${format(end, 'HH:mm')}`;
  }
  return `${format(start, 'EEEE d MMMM HH:mm')} to ${format(end, 'EEEE d MMMM HH:mm')}`;
}

/**
 * The message body.
 *
 * Written the way an electrician texts a customer — no marketing voice, no
 * "We look forward to serving you!". It has to survive being read on a
 * doorstep, and it has to end with a way to change it, because the single most
 * common reply to a confirmation is "can we make it Friday instead".
 */
export function confirmationMessage(parts: ConfirmationParts): string {
  const who = firstName(parts.clientName);
  const greeting = who ? `Hi ${who},` : 'Hi,';
  const from = parts.businessName ? ` — ${parts.businessName}` : '';
  const where = parts.location?.trim() ? `\nWhere: ${parts.location.trim()}` : '';

  if (parts.movedFrom) {
    // The old time is quoted back deliberately. Without it the customer has to
    // work out for themselves which booking this refers to, and someone with
    // two jobs on the go will pick the wrong one.
    const was = whenLine({ ...parts, ...parts.movedFrom });
    return [
      greeting,
      '',
      `I've had to move your appointment${from}.`,
      '',
      `What: ${parts.title}`,
      `Was: ${was}`,
      `Now: ${whenLine(parts)}${where}`,
      '',
      'Sorry for mucking you about — reply if the new time does not work and we’ll find another.',
    ].join('\n');
  }

  // ELE-1685 — his own wording when he has set one; the stock text otherwise.
  // Both go through the same renderer so the default is exercised on every
  // send and cannot quietly diverge from what the Settings preview shows.
  const template = parts.template?.trim() ? parts.template : DEFAULT_CONFIRMATION_TEMPLATE;
  return renderConfirmationTemplate(template, {
    name: who ?? '',
    business: parts.businessName?.trim() ?? '',
    what: parts.title,
    when: whenLine(parts),
    where: parts.location?.trim() ?? '',
  });
}

export function confirmationSubject(parts: ConfirmationParts): string {
  return parts.movedFrom
    ? `Appointment moved — now ${whenLine(parts)}`
    : `Booking confirmed — ${whenLine(parts)}`;
}

export function confirmationWhatsapp(parts: ConfirmationParts, phone?: string | null): string {
  const text = encodeURIComponent(confirmationMessage(parts));
  const to = normaliseUkPhone(phone);
  return to ? `https://wa.me/${to}?text=${text}` : `https://wa.me/?text=${text}`;
}

export function confirmationMailto(parts: ConfirmationParts, email?: string | null): string {
  const subject = encodeURIComponent(confirmationSubject(parts));
  const body = encodeURIComponent(confirmationMessage(parts));
  return `mailto:${email ?? ''}?subject=${subject}&body=${body}`;
}

/**
 * SMS.
 *
 * `sms:<number>?&body=` is the form that works on both iOS and Android — iOS
 * wants the separator before `body`, Android tolerates it. Dropping the `?&`
 * breaks one platform or the other depending on which you pick.
 */
export function confirmationSms(parts: ConfirmationParts, phone?: string | null): string {
  const body = encodeURIComponent(confirmationMessage(parts));
  const to = phone ? phone.replace(/[^\d+]/g, '') : '';
  return `sms:${to}?&body=${body}`;
}
