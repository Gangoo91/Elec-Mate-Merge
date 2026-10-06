/**
 * Visit planner (ELE-2022): suggests up to 3 site-visit times for an enquiry.
 *
 * Free time comes from public-booking (the same working hours, buffers, notice
 * period, blackout dates and daily caps the customer booking page uses). The
 * ranking prefers days the electrician is already near the customer, ideally
 * straight after or before a nearby job, so the diary fills sensibly.
 *
 * It only PROPOSES. Nothing is booked or sent until the electrician approves.
 */

import type { SupabaseClient } from 'https://esm.sh/@supabase/supabase-js@2.49.4';

export interface ProposedSlot {
  start: string; // ISO instant
  end: string;
  label: string; // "Thu 9 Oct, 3pm"
  reason: string; // "After your 2pm job in LS4 (1.2 mi)"
  near_miles: number | null;
}

interface FreeSlot {
  date: string; // YYYY-MM-DD (UK)
  start: string; // HH:MM (UK wall time)
  end: string;
}

const DAYS_AHEAD = 10;
const NEAR_MILES = 5;
const POSTCODE_RE = /\b([A-Z]{1,2}\d[A-Z\d]?)\s*(\d[A-Z]{2})\b/i;

/** UK wall time on a date → ISO instant (handles GMT/BST). */
function ukToInstant(date: string, hhmm: string): Date {
  const [y, m, d] = date.split('-').map(Number);
  const [hh, mm] = hhmm.split(':').map(Number);
  const guess = new Date(Date.UTC(y, m - 1, d, hh, mm));
  const tz = new Intl.DateTimeFormat('en-GB', { timeZone: 'Europe/London', timeZoneName: 'shortOffset' })
    .formatToParts(guess)
    .find((p) => p.type === 'timeZoneName')?.value ?? 'GMT';
  const offsetHours = Number(tz.replace('GMT', '') || 0);
  return new Date(guess.getTime() - offsetHours * 3600_000);
}

const part = (d: Date, opts: Intl.DateTimeFormatOptions, type: Intl.DateTimeFormatPartTypes) =>
  new Intl.DateTimeFormat('en-GB', { timeZone: 'Europe/London', ...opts })
    .formatToParts(d)
    .find((p) => p.type === type)?.value ?? '';

/** "3pm", "10:30am" in UK time. */
function hourLabel(d: Date): string {
  const h = Number(part(d, { hour: 'numeric', hour12: true }, 'hour'));
  const m = part(d, { minute: '2-digit' }, 'minute').padStart(2, '0');
  const ampm = Number(part(d, { hour: 'numeric', hour12: false }, 'hour')) >= 12 ? 'pm' : 'am';
  return `${h}${m === '00' ? '' : `:${m}`}${ampm}`;
}

/** "Thu 8 Oct, 3pm" in UK time. */
function label(d: Date): string {
  const wd = part(d, { weekday: 'short' }, 'weekday');
  const day = part(d, { day: 'numeric' }, 'day');
  const mon = part(d, { month: 'short' }, 'month');
  return `${wd} ${day} ${mon}, ${hourLabel(d)}`;
}

function miles(aLat: number, aLng: number, bLat: number, bLng: number) {
  const R = 3958.8;
  const toRad = (x: number) => (x * Math.PI) / 180;
  const dLat = toRad(bLat - aLat);
  const dLng = toRad(bLng - aLng);
  const h = Math.sin(dLat / 2) ** 2 + Math.cos(toRad(aLat)) * Math.cos(toRad(bLat)) * Math.sin(dLng / 2) ** 2;
  return 2 * R * Math.asin(Math.sqrt(h));
}

export async function proposeVisits(
  supabase: SupabaseClient,
  userId: string,
  customer: { latitude: number; longitude: number } | null
): Promise<ProposedSlot[]> {
  try {
    // 1. Free time, from the same rules as the customer booking page
    const res = await fetch(
      `${Deno.env.get('SUPABASE_URL')}/functions/v1/public-booking?electrician_id=${userId}&days=${DAYS_AHEAD}`,
      { headers: { Authorization: `Bearer ${Deno.env.get('SUPABASE_ANON_KEY') ?? ''}` }, signal: AbortSignal.timeout(6000) }
    );
    if (!res.ok) return [];
    const free = ((await res.json())?.slots ?? []) as FreeSlot[];
    if (!free.length) return [];

    // 2. Where the electrician already is: diary jobs with a postcode in the location
    const until = new Date(Date.now() + (DAYS_AHEAD + 1) * 24 * 3600_000).toISOString();
    const { data: events } = await supabase
      .from('calendar_events')
      .select('start_at, end_at, location')
      .eq('user_id', userId)
      .gte('start_at', new Date().toISOString())
      .lte('start_at', until)
      .not('location', 'is', null)
      .limit(200);
    const jobs = ((events ?? []) as { start_at: string; end_at: string; location: string }[])
      .map((e) => ({ ...e, pc: e.location.match(POSTCODE_RE) }))
      .filter((e) => e.pc)
      .map((e) => ({ start: new Date(e.start_at), end: new Date(e.end_at), postcode: `${e.pc![1]} ${e.pc![2]}`.toUpperCase(), outward: e.pc![1].toUpperCase() }));

    const coords = new Map<string, { lat: number; lng: number }>();
    if (customer && jobs.length) {
      const unique = [...new Set(jobs.map((j) => j.postcode))].slice(0, 100);
      const pr = await fetch('https://api.postcodes.io/postcodes', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ postcodes: unique }),
        signal: AbortSignal.timeout(4000),
      });
      if (pr.ok) {
        for (const r of (await pr.json())?.result ?? []) {
          if (r?.result?.latitude != null) coords.set(r.query.toUpperCase(), { lat: r.result.latitude, lng: r.result.longitude });
        }
      }
    }
    const nearbyJobs = jobs
      .map((j) => {
        const c = coords.get(j.postcode);
        return c && customer ? { ...j, miles: miles(customer.latitude, customer.longitude, c.lat, c.lng) } : null;
      })
      .filter((j): j is NonNullable<typeof j> => !!j && j.miles <= NEAR_MILES);

    // 3. Score every free slot: sooner is better; next to a nearby job is much better
    const today = new Date();
    const scored = free.map((s) => {
      const start = ukToInstant(s.date, s.start);
      const end = ukToInstant(s.date, s.end);
      const dayIndex = Math.floor((start.getTime() - today.getTime()) / (24 * 3600_000));
      const sameDay = nearbyJobs.filter((j) => j.start.toISOString().slice(0, 10) === start.toISOString().slice(0, 10));
      let best: { miles: number; adjacent: boolean; gap: number; job: (typeof sameDay)[number] } | null =
        null;
      for (const j of sameDay) {
        const gapAfter = (start.getTime() - j.end.getTime()) / 60000;
        const gapBefore = (j.start.getTime() - end.getTime()) / 60000;
        const adjacent = (gapAfter >= 0 && gapAfter <= 120) || (gapBefore >= 0 && gapBefore <= 120);
        const gap = adjacent ? Math.min(...[gapAfter, gapBefore].filter((g) => g >= 0)) : 999;
        if (
          !best ||
          (adjacent && !best.adjacent) ||
          (adjacent === best.adjacent && (gap < best.gap || (gap === best.gap && j.miles < best.miles)))
        ) {
          best = { miles: j.miles, adjacent, gap, job: j };
        }
      }
      // Tighter to the nearby job is better: every 15 minutes of dead time costs a point
      const score =
        dayIndex * 10 -
        (best ? (best.adjacent ? 45 - best.gap / 15 : 25) - best.miles * 2 : 0);
      const mi = best ? Math.round(best.miles * 10) / 10 : null;
      const reason = best
        ? best.adjacent
          ? start > best.job.end
            ? `After your ${hourLabel(best.job.start)} job in ${best.job.outward} (${mi} mi away)`
            : `Before your ${hourLabel(best.job.start)} job in ${best.job.outward} (${mi} mi away)`
          : `You're in ${best.job.outward} that day (${mi} mi away)`
        : '';
      return { start, end, score, reason, near: mi };
    });

    // 4. Best overall, then the best on two other days
    scored.sort((a, b) => a.score - b.score || a.start.getTime() - b.start.getTime());
    const picked: typeof scored = [];
    const days = new Set<string>();
    for (const s of scored) {
      const day = s.start.toISOString().slice(0, 10);
      if (days.has(day)) continue;
      days.add(day);
      picked.push(s);
      if (picked.length === 3) break;
    }
    return picked.map((s, i) => ({
      start: s.start.toISOString(),
      end: s.end.toISOString(),
      label: label(s.start),
      reason: s.reason || (i === 0 ? 'Your first free slot' : 'Also free'),
      near_miles: s.near,
    }));
  } catch (err) {
    console.error('[visit-planner] failed', err instanceof Error ? err.message : err);
    return [];
  }
}
