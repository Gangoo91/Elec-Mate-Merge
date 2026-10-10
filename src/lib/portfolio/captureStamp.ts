/**
 * Capture stamp: when, and only with the learner's permission roughly where,
 * a piece of evidence was made.
 *
 *  - Time: the photo's EXIF DateTimeOriginal when a JPEG carries one, else the
 *    moment the learner saved it on the phone. Read here with a few lines of
 *    DataView code: exifr breaks the vite-plugin-pwa Rollup build (see
 *    useSafetyPhotoUpload), so no library.
 *  - Place: only after the learner switches it on, which raises the platform's
 *    own location prompt. The position is rounded to 0.1 degree (about 11 km)
 *    before it is stored, and named to a town at city zoom. Exact coordinates
 *    are never stored or shown. Nothing is stamped on existing evidence.
 */
import { getCurrentPosition } from '@/utils/geolocation';

export interface CaptureStamp {
  capturedAt: string;
  source: 'photo' | 'device';
  place: string | null;
  lat: number | null;
  lng: number | null;
}

export interface CoarsePlace {
  place: string | null;
  lat: number;
  lng: number;
}

const round1 = (n: number) => Math.round(n * 10) / 10;

/** EXIF DateTimeOriginal (0x9003) from a JPEG, as an ISO string, or null. */
export async function readExifDateTimeOriginal(file: Blob): Promise<string | null> {
  try {
    if (!/jpe?g/i.test(file.type) && file.type !== '') return null;
    const buf = await file.slice(0, 256 * 1024).arrayBuffer();
    const v = new DataView(buf);
    if (v.byteLength < 4 || v.getUint16(0) !== 0xffd8) return null;
    let off = 2;
    while (off + 4 <= v.byteLength) {
      const marker = v.getUint16(off);
      if ((marker & 0xff00) !== 0xff00) return null;
      const size = v.getUint16(off + 2);
      if (marker === 0xffe1 && off + 10 <= v.byteLength) {
        // "Exif\0\0"
        if (v.getUint32(off + 4) === 0x45786966 && v.getUint16(off + 8) === 0) {
          return parseTiff(v, off + 10);
        }
      }
      if (marker === 0xffda) return null; // start of scan: no more metadata
      off += 2 + size;
    }
    return null;
  } catch {
    return null;
  }
}

function parseTiff(v: DataView, tiff: number): string | null {
  const little = v.getUint16(tiff) === 0x4949;
  const u16 = (o: number) => v.getUint16(o, little);
  const u32 = (o: number) => v.getUint32(o, little);
  const ifd0 = tiff + u32(tiff + 4);
  const findTag = (ifd: number, tag: number): number | null => {
    if (ifd + 2 > v.byteLength) return null;
    const n = u16(ifd);
    for (let i = 0; i < n; i++) {
      const e = ifd + 2 + i * 12;
      if (e + 12 > v.byteLength) return null;
      if (u16(e) === tag) return e;
    }
    return null;
  };
  const ptr = findTag(ifd0, 0x8769);
  if (ptr === null) return null;
  const exif = tiff + u32(ptr + 8);
  const ascii = (tag: number): string | null => {
    const e = findTag(exif, tag);
    if (e === null) return null;
    const count = u32(e + 4);
    const at = count > 4 ? tiff + u32(e + 8) : e + 8;
    if (at + count > v.byteLength) return null;
    let s = '';
    for (let i = 0; i < count; i++) {
      const c = v.getUint8(at + i);
      if (c === 0) break;
      s += String.fromCharCode(c);
    }
    return s;
  };
  const raw = ascii(0x9003);
  const m = raw?.match(/^(\d{4}):(\d{2}):(\d{2}) (\d{2}):(\d{2}):(\d{2})/);
  if (!m) return null;
  const offset = ascii(0x9011); // OffsetTimeOriginal, e.g. "+01:00"
  const local = `${m[1]}-${m[2]}-${m[3]}T${m[4]}:${m[5]}:${m[6]}`;
  const d =
    offset && /^[+-]\d{2}:\d{2}$/.test(offset)
      ? new Date(`${local}${offset}`)
      : new Date(
          Number(m[1]),
          Number(m[2]) - 1,
          Number(m[3]),
          Number(m[4]),
          Number(m[5]),
          Number(m[6])
        );
  const t = d.getTime();
  // Cameras with no clock set write 0000:00:00 or 1970; a future time is wrong too.
  if (!Number.isFinite(t) || d.getFullYear() < 2000 || t > Date.now() + 24 * 3600 * 1000)
    return null;
  return d.toISOString();
}

/**
 * Asks the platform for the position (this is what raises the permission
 * prompt), then keeps only a coarse version of it. Null when refused or
 * unavailable.
 */
export async function getCoarsePlace(): Promise<CoarsePlace | null> {
  let lat: number;
  let lng: number;
  try {
    const p = await getCurrentPosition({
      enableHighAccuracy: false,
      timeout: 10000,
      maximumAge: 10 * 60 * 1000,
    });
    lat = p.latitude;
    lng = p.longitude;
  } catch {
    return null;
  }
  const place = await townName(Math.round(lat * 100) / 100, Math.round(lng * 100) / 100);
  return { place, lat: round1(lat), lng: round1(lng) };
}

/** Town or area name at city zoom, from an already-rounded position. */
async function townName(lat: number, lng: number): Promise<string | null> {
  try {
    const res = await fetch(
      `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}&zoom=10&addressdetails=1`,
      { headers: { 'Accept-Language': 'en-GB' } }
    );
    if (!res.ok) return null;
    const j = (await res.json()) as { address?: Record<string, string> };
    const a = j.address ?? {};
    const name = a.city || a.town || a.village || a.municipality || a.county || null;
    return name ? name.slice(0, 80) : null;
  } catch {
    return null;
  }
}

/** The stamp for a new item: the first photo's EXIF time, else now. */
export async function buildCaptureStamp(
  files: Blob[],
  coarse: CoarsePlace | null
): Promise<CaptureStamp> {
  let at: string | null = null;
  for (const f of files) {
    if (!f.type.startsWith('image/')) continue;
    at = await readExifDateTimeOriginal(f);
    if (at) break;
  }
  return {
    capturedAt: at ?? new Date().toISOString(),
    source: at ? 'photo' : 'device',
    place: coarse?.place ?? null,
    lat: coarse ? coarse.lat : null,
    lng: coarse ? coarse.lng : null,
  };
}

/**
 * "Taken 7 Oct 2026, 09:12 · near Coventry". "Taken" for a photo's own time,
 * "Captured" for the time it was saved on the phone.
 */
export function captureLine(c: {
  at: string;
  source: 'photo' | 'device' | null;
  place: string | null;
  lat: number | null;
  lng: number | null;
}): string {
  const d = new Date(c.at);
  const when = `${d.toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
    timeZone: 'Europe/London',
  })}, ${d.toLocaleTimeString('en-GB', {
    hour: '2-digit',
    minute: '2-digit',
    timeZone: 'Europe/London',
  })}`;
  const where = c.place
    ? ` · near ${c.place}`
    : c.lat !== null && c.lng !== null
      ? ` · near ${Math.abs(c.lat).toFixed(1)}°${c.lat >= 0 ? 'N' : 'S'} ${Math.abs(c.lng).toFixed(1)}°${c.lng >= 0 ? 'E' : 'W'}`
      : '';
  return `${c.source === 'photo' ? 'Taken' : 'Captured'} ${when}${where}`;
}
