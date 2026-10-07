/* ==========================================================================
   Clock-in / clock-out location, as the phone recorded it (ELE-2000 columns
   on employer_timesheets), turned into plain words for the office.

   Nothing is invented: no status → no line; denied/unavailable → say so;
   distance only when BOTH the fix and the job have coordinates. The "Far
   from site" flag needs a fix good to < 200 m, so a rough indoor fix never
   accuses anyone. Partly closes ELE-1952's location flag (and ELE-1828).
   ========================================================================== */

export type LocationStatus = 'captured' | 'denied' | 'unavailable';

export interface ClockFix {
  lat: number | null;
  lng: number | null;
  accuracyM: number | null;
  status: LocationStatus | null;
}

export interface ClockLocationLine {
  /** "Clocked in 120 m from site" / "Location off on the phone" … */
  text: string;
  /** Extra detail, e.g. "± 15 m". */
  detail?: string;
  /** Google Maps link to the recorded fix, when there is one. */
  mapUrl?: string;
  tone: 'ok' | 'warn' | 'muted';
}

/** Distance > this AND accuracy < FLAG_MAX_ACCURACY_M → "Far from site". */
export const FAR_FROM_SITE_M = 500;
export const FLAG_MAX_ACCURACY_M = 200;

const toNum = (v: unknown): number | null => {
  if (v === null || v === undefined || v === '') return null;
  const n = typeof v === 'number' ? v : Number(v);
  return Number.isFinite(n) ? n : null;
};

export function readFix(
  row: Record<string, unknown>,
  which: 'clock_in' | 'clock_out'
): ClockFix {
  const status = row[`${which}_location_status`];
  return {
    lat: toNum(row[`${which}_lat`]),
    lng: toNum(row[`${which}_lng`]),
    accuracyM: toNum(row[`${which}_accuracy_m`]),
    status:
      status === 'captured' || status === 'denied' || status === 'unavailable' ? status : null,
  };
}

/** Great-circle distance in metres. */
export function haversineM(lat1: number, lng1: number, lat2: number, lng2: number): number {
  const R = 6_371_000;
  const rad = (d: number) => (d * Math.PI) / 180;
  const dLat = rad(lat2 - lat1);
  const dLng = rad(lng2 - lng1);
  const a =
    Math.sin(dLat / 2) ** 2 + Math.cos(rad(lat1)) * Math.cos(rad(lat2)) * Math.sin(dLng / 2) ** 2;
  return 2 * R * Math.asin(Math.min(1, Math.sqrt(a)));
}

export function formatDistance(m: number): string {
  if (m < 1000) return `${Math.max(10, Math.round(m / 10) * 10)} m`;
  if (m < 10_000) return `${(m / 1000).toFixed(1)} km`;
  return `${Math.round(m / 1000)} km`;
}

const formatAccuracy = (m: number) =>
  m < 1000 ? `${Math.max(1, Math.round(m))} m` : `${(m / 1000).toFixed(1)} km`;

/** Metres from site, or null when either side has no coordinates. */
export function distanceFromSite(
  fix: ClockFix,
  site: { lat: number | null; lng: number | null } | null
): number | null {
  if (fix.status !== 'captured' || fix.lat === null || fix.lng === null) return null;
  if (!site || site.lat === null || site.lng === null) return null;
  return haversineM(fix.lat, fix.lng, site.lat, site.lng);
}

export function describeFix(
  fix: ClockFix,
  which: 'in' | 'out',
  site: { lat: number | null; lng: number | null } | null
): ClockLocationLine | null {
  const verb = which === 'in' ? 'Clocked in' : 'Clocked out';
  if (fix.status === 'denied') return { text: `${verb}. Location off on the phone`, tone: 'muted' };
  if (fix.status === 'unavailable')
    return { text: `${verb}. The phone couldn't get a location`, tone: 'muted' };
  if (fix.status !== 'captured' || fix.lat === null || fix.lng === null) return null;

  const mapUrl = `https://www.google.com/maps/search/?api=1&query=${fix.lat},${fix.lng}`;
  const rough = fix.accuracyM !== null && fix.accuracyM >= FLAG_MAX_ACCURACY_M;
  const detail =
    fix.accuracyM !== null
      ? rough
        ? `Rough fix, ± ${formatAccuracy(fix.accuracyM)}`
        : `± ${formatAccuracy(fix.accuracyM)}`
      : undefined;
  const d = distanceFromSite(fix, site);
  if (d === null) return { text: `${verb}. Location recorded`, detail, mapUrl, tone: 'muted' };
  const far = d > FAR_FROM_SITE_M && !rough && fix.accuracyM !== null;
  const text = d <= 100 ? `${verb} on site` : `${verb} ${formatDistance(d)} from site`;
  return { text, detail, mapUrl, tone: far ? 'warn' : 'ok' };
}

/** True when either fix is a good one and more than 500 m from the job. */
export function isFarFromSite(
  fixes: ClockFix[],
  site: { lat: number | null; lng: number | null } | null
): boolean {
  return fixes.some((fix) => {
    if (fix.accuracyM === null || fix.accuracyM >= FLAG_MAX_ACCURACY_M) return false;
    const d = distanceFromSite(fix, site);
    return d !== null && d > FAR_FROM_SITE_M;
  });
}
