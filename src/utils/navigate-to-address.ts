/**
 * navigate-to-address.ts
 *
 * One way to send an electrician to a site. ELE-1520.
 *
 * Seven screens each hand-rolled their own Maps URL and three of them used a
 * raw `<a href>`, which bypasses `openExternalUrl` and so never reaches the
 * native Maps app. Building the URL in one place means a screen that shows an
 * address gets the same behaviour as every other screen that shows one.
 *
 * Coordinates are preferred over the address text wherever we hold them. A
 * text query asks Maps to geocode a string an electrician typed into a form —
 * "Flat 2, 14 High St" can resolve to the wrong end of a long road, or to a
 * different town entirely. A lat/lng captured from Places is the pin the
 * customer's property actually sits on.
 */

import { openExternalUrl } from './open-external-url';

export interface NavigateTarget {
  address?: string | null;
  latitude?: number | null;
  longitude?: number | null;
}

/** A coordinate pair is only usable if both halves are real numbers. */
function hasCoords(target: NavigateTarget): boolean {
  const { latitude: lat, longitude: lng } = target;
  return (
    typeof lat === 'number' &&
    typeof lng === 'number' &&
    Number.isFinite(lat) &&
    Number.isFinite(lng) &&
    // 0,0 is in the Atlantic. It is what an unset column looks like after a
    // failed geocode, not a place anyone is driving to.
    !(lat === 0 && lng === 0)
  );
}

/**
 * True when there is enough to navigate with. Use this to decide whether to
 * render the button at all — a Navigate button that opens an empty map is
 * worse than no button.
 */
export function canNavigateTo(target: NavigateTarget): boolean {
  return hasCoords(target) || Boolean(target.address && target.address.trim());
}

/**
 * Build a Google Maps URL for a destination, or null if there's nothing to go on.
 *
 * Uses the documented Maps URL API (`?api=1`), which is the form Google
 * guarantees across web, Android and iOS.
 */
export function buildMapsUrl(target: NavigateTarget): string | null {
  if (hasCoords(target)) {
    return `https://www.google.com/maps/dir/?api=1&destination=${target.latitude},${target.longitude}`;
  }

  const address = target.address?.trim();
  if (!address) return null;

  return `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(address)}`;
}

/**
 * Open turn-by-turn directions to a site.
 *
 * Routed through `openExternalUrl` so it deep-links into the native Maps app
 * rather than opening a map inside the in-app browser — see the
 * EXTERNAL_APP_PATTERNS note in open-external-url.ts.
 *
 * Safe to call with nothing: a missing address is a no-op, not a crash.
 */
export function navigateToAddress(target: NavigateTarget): void {
  const url = buildMapsUrl(target);
  if (!url) return;
  void openExternalUrl(url);
}
