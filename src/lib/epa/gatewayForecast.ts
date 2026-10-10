/**
 * Gateway forecast in words (8 Oct 2026).
 *
 * get_gateway_forecast works out, from the record, when a learner will be
 * ready for gateway if nothing changes. The date is the latest of three:
 *
 *   criteria  every criterion passed, at the pace criteria have been passed
 *             over the last 12 weeks (since the start date when they have
 *             been on programme less, or passed fewer than three in them)
 *   hours     off-the-job hours reach the target, at their weekly pace
 *   duration  the minimum time on programme is met
 *
 * This file turns that answer into sentences, the same ones on Student 360,
 * Gateway readiness, EPA admin and the learner's own EPA page. Never a score.
 * It is a forecast, not a decision: the employer and college decide gateway.
 */

export type ForecastStatus =
  | 'on_pace'
  | 'at_risk'
  | 'off_pace'
  | 'not_enough_history'
  | 'no_end_date'
  | 'gateway_passed'
  | 'stopped';

export type ForecastLever = 'criteria' | 'hours' | 'duration' | 'none' | null;

export interface GatewayForecast {
  learner_id: string;
  college_student_id: string | null;
  status: ForecastStatus;
  reason: string | null;
  forecast_date: string | null;
  ready_now: boolean;
  planned_end_date: string | null;
  start_date: string | null;
  weeks_on_programme: number | null;
  first_forecast_on: string | null;
  days_after_end: number | null;
  lever: ForecastLever;
  criteria: {
    state: string;
    total: number;
    passed: number;
    remaining: number;
    passed_in_window: number;
    window_weeks: number | null;
    window_from: string | null;
    pace_basis: 'last_12_weeks' | 'since_start' | null;
    weekly_pace: number | null;
    weekly_needed: number | null;
    date: string | null;
  };
  hours: {
    state: string;
    required: number | null;
    counted: number;
    weekly_pace: number | null;
    weekly_needed: number | null;
    forecast_at_end: number | null;
    date: string | null;
  };
  duration: { state: string; min_months: number | null; met_on: string | null };
  open_lines: Array<{ key: string; label: string }> | null;
}

/** Date-only strings are London calendar dates, never UTC midnight. */
const toDate = (iso: string) =>
  /^\d{4}-\d{2}-\d{2}$/.test(iso) ? new Date(`${iso}T12:00:00`) : new Date(iso);

/** "March 2027". */
export const monthYear = (iso: string | null | undefined) =>
  iso ? toDate(iso).toLocaleDateString('en-GB', { month: 'long', year: 'numeric' }) : '';

/** "3 November 2026". */
export const longDate = (iso: string | null | undefined) =>
  iso
    ? toDate(iso).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })
    : '';

/** "5 months", "3 weeks", "1 month". */
export function lateBy(days: number): string {
  if (days < 28) {
    const w = Math.max(1, Math.round(days / 7));
    return `${w} ${w === 1 ? 'week' : 'weeks'}`;
  }
  const m = Math.max(1, Math.round(days / 30.44));
  // Past two years the exact figure only reflects a thin pace; say so plainly.
  if (m >= 24) return 'more than 2 years';
  return `${m} ${m === 1 ? 'month' : 'months'}`;
}

const nice = (n: number) => (Number.isInteger(n) ? String(n) : n.toFixed(1).replace(/\.0$/, ''));

/** A pace of criteria in words: "2 a week", "about one every 3 weeks", "none". */
export function criteriaPaceWords(pace: number | null | undefined): string {
  if (pace == null || pace <= 0) return 'none';
  if (pace >= 1) return `${nice(Math.round(pace * 10) / 10)} a week`;
  const every = Math.round(1 / pace);
  return every <= 1 ? 'about one a week' : `about one every ${every} weeks`;
}

/** "2 more criteria a week" style: the weekly figure needed, in words. */
function criteriaNeededWords(n: number): string {
  if (n < 1) {
    const every = Math.max(2, Math.round(1 / n));
    return `one criterion every ${every} weeks`;
  }
  const r = n >= 3 ? Math.ceil(n) : Math.round(n * 2) / 2;
  return `${nice(r)} ${r === 1 ? 'criterion' : 'criteria'} a week`;
}

const fmtH = (n: number) => Math.round(n).toLocaleString('en-GB');

const hoursWords = (h: number) => `${nice(Math.round(h * 2) / 2)} ${h === 1 ? 'hour' : 'hours'}`;

/** A short tag for lists and chips. */
export function forecastTag(f: GatewayForecast | null | undefined): string {
  if (!f) return 'No forecast';
  switch (f.status) {
    case 'gateway_passed':
      return 'Gateway passed';
    case 'stopped':
      return 'Not on programme';
    case 'not_enough_history':
      return f.reason === 'too_early' ? 'Too early to forecast' : 'No forecast';
    case 'on_pace':
      return f.ready_now ? 'Ready now' : 'On pace';
    case 'at_risk':
      return 'Close';
    case 'off_pace':
      return 'Behind';
    case 'no_end_date':
      return 'No planned end';
  }
}

/** Chip tone: done, needs action, or neutral. */
export function forecastTone(f: GatewayForecast | null | undefined): 'done' | 'action' | 'neutral' {
  if (!f) return 'neutral';
  if (f.status === 'on_pace' || f.status === 'gateway_passed') return 'done';
  if (f.status === 'at_risk' || f.status === 'off_pace') return 'action';
  return 'neutral';
}

/** Where a learner sorts by date: earliest first, never last. */
export function forecastSortKey(f: GatewayForecast | null | undefined): number {
  if (!f) return Number.MAX_SAFE_INTEGER;
  if (f.status === 'gateway_passed') return 0;
  if (f.forecast_date) return toDate(f.forecast_date).getTime();
  if (f.status === 'off_pace') return Number.MAX_SAFE_INTEGER - 2;
  return Number.MAX_SAFE_INTEGER - 1;
}

/** Behind or close: what the "Off pace" filter keeps. */
export const isOffPace = (f: GatewayForecast | null | undefined) =>
  !!f && (f.status === 'off_pace' || f.status === 'at_risk');

/** The date the screens agree on: the month of the forecast, else the first forecast day. */
export function forecastDateWords(f: GatewayForecast | null | undefined): string {
  if (!f) return '';
  if (f.forecast_date) return monthYear(f.forecast_date);
  if (f.first_forecast_on) return longDate(f.first_forecast_on);
  return '';
}

/**
 * Why there is no date at this pace, as a clause after "Behind: ".
 *
 * 10 Oct: a pace above zero but too slow to finish within the 15-year horizon
 * used to read "at this pace, more than 15 years away", even for a learner
 * near the end of their programme. The maths was right (a handful of criteria
 * passed lately, hundreds to go) but a multi-decade figure is no use to anyone.
 * It now says what is actually true: too little has been assessed to put a
 * date on it, with the count, so "behind" still reads as behind.
 */
function stalledWhy(f: GatewayForecast, who: 'staff' | 'learner'): string {
  const you = who === 'learner';
  const slow = (pace: number | null | undefined) => !!pace && pace > 0;
  if (f.criteria.state === 'stalled') {
    if (slow(f.criteria.weekly_pace)) {
      const c = f.criteria;
      return you
        ? `too few of your criteria have been passed to put a date on gateway yet (${c.passed} of ${c.total} passed)`
        : `too few criteria passed to put a date on gateway (${c.passed} of ${c.total} passed)`;
    }
    const since =
      f.criteria.pace_basis === 'last_12_weeks' || (f.weeks_on_programme ?? 0) > 12
        ? 'in the last 12 weeks'
        : 'since the start';
    return `at this pace, never: no criteria passed ${since}`;
  }
  if (f.hours.state === 'stalled') {
    if (slow(f.hours.weekly_pace)) {
      const h = f.hours;
      return you
        ? `your off-the-job hours are coming in too slowly to put a date on gateway yet (${fmtH(h.counted)} of ${fmtH(h.required ?? 0)} hours)`
        : `off-the-job hours are coming in too slowly to put a date on gateway (${fmtH(h.counted)} of ${fmtH(h.required ?? 0)} hours)`;
    }
    return 'at this pace, never: no off-the-job hours counted yet';
  }
  return 'at this pace, never';
}

/**
 * The headline. `who` is 'staff' (third person) or 'learner' (you).
 * Staff: "On pace for gateway by March 2027." / "Behind: at this pace,
 * November 2028, 5 months after the planned end."
 * Learner: "At your current pace you'll be ready for gateway by March 2027."
 */
export function forecastHeadline(
  f: GatewayForecast | null | undefined,
  who: 'staff' | 'learner'
): string {
  if (!f) return who === 'learner' ? 'Your gateway forecast is not available.' : 'No forecast.';
  const you = who === 'learner';
  const end = f.planned_end_date;
  switch (f.status) {
    case 'gateway_passed':
      return you ? 'You have passed gateway.' : 'Gateway passed.';
    case 'stopped':
      return you
        ? 'Your programme has stopped, so there is no gateway forecast.'
        : `No forecast: ${f.reason ?? 'not on programme'}, hours frozen.`;
    case 'not_enough_history':
      if (f.reason === 'too_early')
        return you
          ? `Your gateway forecast starts on ${longDate(f.first_forecast_on)}, once you have four weeks on programme.`
          : `Too early to forecast. The first forecast is on ${longDate(f.first_forecast_on)}, after four weeks on programme.`;
      if (f.reason === 'no_start_date')
        return you
          ? 'There is no start date on your record yet, so there is no gateway forecast.'
          : 'No start date on the record, so there is no forecast.';
      return you
        ? 'There is no qualification on your record yet, so there is no gateway forecast.'
        : 'No qualification on the record, so there is no forecast.';
    case 'no_end_date':
      return you
        ? `At your current pace you'll be ready for gateway by ${monthYear(f.forecast_date)}.`
        : `At this pace, ready for gateway by ${monthYear(f.forecast_date)}. No planned end date to compare with.`;
    case 'on_pace':
      if (f.ready_now)
        return you
          ? 'The record says you are ready for gateway now.'
          : 'Ready for gateway on the record now.';
      return you
        ? `At your current pace you'll be ready for gateway by ${monthYear(f.forecast_date)}.`
        : `On pace for gateway by ${monthYear(f.forecast_date)}.`;
    case 'at_risk':
    case 'off_pace': {
      if (!f.forecast_date) {
        const why = stalledWhy(f, who);
        if (!you) return `Behind: ${why}.`;
        return why.startsWith('at this pace, never')
          ? `At your current pace you won't reach gateway${why.slice('at this pace, never'.length)}.`
          : `${why[0]!.toUpperCase()}${why.slice(1)}.`;
      }
      const late = f.days_after_end != null && f.days_after_end > 0 ? lateBy(f.days_after_end) : '';
      const lead = f.status === 'at_risk' ? 'Close' : 'Behind';
      return you
        ? `At your current pace you'll be ready for gateway by ${monthYear(f.forecast_date)}${late ? `, ${late} after your planned end${end ? ` in ${monthYear(end)}` : ''}` : ''}.`
        : `${lead}: at this pace, ${monthYear(f.forecast_date)}${late ? `, ${late} after the planned end` : ''}.`;
    }
  }
}

/** The one thing that most moves the date, as a sentence. Empty when nothing to say. */
export function forecastLever(
  f: GatewayForecast | null | undefined,
  who: 'staff' | 'learner'
): string {
  if (!f || !f.lever || f.lever === 'none') return '';
  if (f.status === 'gateway_passed' || f.status === 'stopped') return '';
  const you = who === 'learner';
  const behind = f.status === 'off_pace' || f.status === 'at_risk';
  const endPassed =
    !!f.planned_end_date && toDate(f.planned_end_date).getTime() < Date.now() - 86_400_000;

  if (f.lever === 'duration') {
    return you
      ? `Your date is set by the minimum time on programme, met on ${longDate(f.duration.met_on)}, so nothing you do can bring it sooner.`
      : `The minimum time on programme sets the date (${longDate(f.duration.met_on)}). Nothing to speed up.`;
  }

  if (behind && endPassed) {
    return you
      ? 'Your planned end date has passed. Ask your tutor to agree a new one.'
      : 'The planned end date has passed. Agree a new one with the learner and employer.';
  }

  if (f.lever === 'criteria') {
    const now = criteriaPaceWords(f.criteria.weekly_pace);
    const nowStaff = now === 'none' ? 'none passed lately' : `${now} now`;
    const nowYou = now === 'none' ? 'none passed lately' : `you are at ${now} now`;
    if (behind && f.criteria.weekly_needed) {
      const need = criteriaNeededWords(f.criteria.weekly_needed);
      return you
        ? `The one thing that most moves your date: ${need} passed by your assessor (${nowYou}).`
        : `${need[0]!.toUpperCase()}${need.slice(1)} brings it back (${nowStaff}).`;
    }
    if (f.status === 'not_enough_history')
      return you
        ? 'Until then, the thing that most moves your date is getting criteria passed by your assessor.'
        : '';
    return you
      ? `The one thing that most moves your date: criteria passed by your assessor (${nowYou}).`
      : `Criteria set the date, passed at ${now}.`;
  }

  // hours
  const now = f.hours.weekly_pace != null ? hoursWords(f.hours.weekly_pace) : 'no hours';
  if (behind && f.hours.weekly_needed) {
    const need = hoursWords(f.hours.weekly_needed);
    return you
      ? `The one thing that most moves your date: logging ${need} of off-the-job training a week (you are at ${now} now).`
      : `${need} of off-the-job training a week brings it back (${now} a week now).`;
  }
  return you
    ? `The one thing that most moves your date: your off-the-job hours (${now} a week now).`
    : `Off-the-job hours set the date, at ${now} a week.`;
}

/** The three parts, one line each, for the staff panel. */
export function forecastParts(f: GatewayForecast): Array<{ label: string; text: string }> {
  const out: Array<{ label: string; text: string }> = [];
  const c = f.criteria;
  out.push({
    label: 'Criteria',
    text:
      c.state === 'no_qualification'
        ? 'No qualification on the record.'
        : c.state === 'done'
          ? `All ${c.total} passed.`
          : c.state === 'too_early' || c.state === 'no_start_date'
            ? `${c.passed} of ${c.total} passed. Not enough history for a pace yet.`
            : `${c.passed} of ${c.total} passed, ${criteriaPaceWords(c.weekly_pace)} ${
                c.pace_basis === 'last_12_weeks' ? 'over the last 12 weeks' : 'since the start'
              }. ${c.date ? `All passed by ${monthYear(c.date)} at this pace.` : 'Too few passed lately to put a date on it.'}`,
  });
  const h = f.hours;
  out.push({
    label: 'Off-the-job hours',
    text:
      h.state === 'not_set'
        ? 'No hours target on the record, so hours are left out.'
        : h.state === 'done'
          ? `Target met: ${fmtH(h.counted)} of ${fmtH(h.required ?? 0)} hours.`
          : h.state === 'too_early' || h.state === 'no_start_date'
            ? `${fmtH(h.counted)} of ${fmtH(h.required ?? 0)} hours. Not enough history for a pace yet.`
            : `${fmtH(h.counted)} of ${fmtH(h.required ?? 0)} hours, ${hoursWords(h.weekly_pace ?? 0)} a week. ${
                h.date
                  ? `Target reached by ${monthYear(h.date)} at this pace.`
                  : 'Coming in too slowly to put a date on it.'
              }`,
  });
  const d = f.duration;
  if (d.state !== 'not_applicable')
    out.push({
      label: 'Minimum time on programme',
      text:
        d.state === 'unknown'
          ? 'Cannot be checked without a start date.'
          : d.state === 'done'
            ? `Met on ${longDate(d.met_on)}.`
            : `Met on ${longDate(d.met_on)} (${d.min_months} months from the start).`,
    });
  return out;
}

/** "English, maths and the employer declaration": gateway lines with no date. */
export function openLinesWords(f: GatewayForecast): string {
  const l = (f.open_lines ?? []).map((x) => x.label.toLowerCase());
  if (!l.length) return '';
  if (l.length === 1) return l[0]!;
  return `${l.slice(0, -1).join(', ')} and ${l[l.length - 1]}`;
}

/** The help text every forecast screen shares. */
export const FORECAST_HELP_NOTE = {
  title: 'The gateway forecast',
  body: 'The date is when the record says the learner will be ready for gateway if they carry on at the pace they are going. It is the latest of three dates: when every criterion will be passed, at the pace criteria were passed over the last 12 weeks; when off-the-job hours will reach the target, at their weekly pace; and when the minimum time on programme is met. On pace means on or before the planned end, close means up to 8 weeks after it, behind means later or not at all at this pace. It needs four weeks on programme first. It is a forecast, not a decision: the employer and college decide when someone goes to gateway, and English, maths and the sign-offs still have to be done.',
};

export const FORECAST_HELP_NOTE_LEARNER = {
  title: 'Your gateway forecast',
  body: 'The date is when your record says you will be ready for gateway if you carry on at your current pace. It is the latest of three dates: when all your criteria will be passed, going by how many your assessor passed in the last 12 weeks; when your off-the-job hours will reach the target, going by your weekly hours; and when the minimum time on programme is met. It needs four weeks on programme first. It is a forecast, not a decision: your employer and college decide when you go to gateway.',
};
