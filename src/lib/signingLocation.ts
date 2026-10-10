/**
 * Where a signature was made (ELE-2010).
 *
 * Asked of the phone at the moment of signing, never blocking it: if the phone
 * will not say within five seconds, or the person has said no, the signature
 * goes through without a location.
 */
export interface SigningLocation {
  lat: number;
  lng: number;
  accuracy: number;
}

export function currentSigningLocation(timeoutMs = 5000): Promise<SigningLocation | null> {
  if (typeof navigator === 'undefined' || !navigator.geolocation) return Promise.resolve(null);
  return new Promise((resolve) => {
    let settled = false;
    const done = (v: SigningLocation | null) => {
      if (settled) return;
      settled = true;
      resolve(v);
    };
    const timer = window.setTimeout(() => done(null), timeoutMs);
    try {
      navigator.geolocation.getCurrentPosition(
        (p) => {
          window.clearTimeout(timer);
          done({ lat: p.coords.latitude, lng: p.coords.longitude, accuracy: p.coords.accuracy });
        },
        () => {
          window.clearTimeout(timer);
          done(null);
        },
        { enableHighAccuracy: false, timeout: timeoutMs, maximumAge: 120000 }
      );
    } catch {
      window.clearTimeout(timer);
      done(null);
    }
  });
}

/** Stored as text on job-pack acknowledgements: "51.50740,-0.12780 ±25m". */
export function locationToText(loc: SigningLocation | null): string | null {
  if (!loc) return null;
  return `${loc.lat.toFixed(5)},${loc.lng.toFixed(5)} ±${Math.round(loc.accuracy)}m`;
}

/** Reads either shape (jsonb object or the text form) back into a line for people. */
export function describeLocation(raw: unknown): string | null {
  if (!raw) return null;
  if (typeof raw === 'string') {
    const t = raw.trim();
    if (!t) return null;
    if (t.startsWith('{')) {
      try {
        return describeLocation(JSON.parse(t));
      } catch {
        return t;
      }
    }
    return t;
  }
  if (typeof raw === 'object') {
    const o = raw as { lat?: unknown; lng?: unknown; accuracy?: unknown };
    const lat = Number(o.lat);
    const lng = Number(o.lng);
    if (!Number.isFinite(lat) || !Number.isFinite(lng)) return null;
    const acc = Number(o.accuracy);
    return `${lat.toFixed(5)}, ${lng.toFixed(5)}${Number.isFinite(acc) ? ` (within ${Math.round(acc)} m)` : ''}`;
  }
  return null;
}

/** A map link for a recorded location, or null. */
export function locationMapUrl(raw: unknown): string | null {
  let lat: number | null = null;
  let lng: number | null = null;
  if (raw && typeof raw === 'object') {
    lat = Number((raw as { lat?: unknown }).lat);
    lng = Number((raw as { lng?: unknown }).lng);
  } else if (typeof raw === 'string') {
    const m = /(-?\d+(?:\.\d+)?)\s*,\s*(-?\d+(?:\.\d+)?)/.exec(raw);
    if (m) {
      lat = Number(m[1]);
      lng = Number(m[2]);
    }
  }
  if (lat == null || lng == null || !Number.isFinite(lat) || !Number.isFinite(lng)) return null;
  return `https://www.google.com/maps?q=${lat},${lng}`;
}
