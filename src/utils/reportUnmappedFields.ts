/**
 * Dropped-field detector for certificate PDF formatters.
 *
 * A certificate formatter turns the front-end form-data into the flat payload
 * the PDF template renders. The silent failure mode is: someone adds a field to
 * the form (and the user fills it in) but nobody wires it into the formatter —
 * so the value is collected, looks saved, and then silently never appears on the
 * PDF.
 *
 * To catch that, each formatter records which form-data keys it actually reads
 * (via an instrumented accessor). After building the payload we compare the keys
 * that hold a real value against the keys that were read. Anything filled-in but
 * never read is a dropped field, and we report it to Sentry as a warning so it
 * shows up in the dashboard instead of as a confused-customer support ticket.
 *
 * This is a runtime guarantee on the form → payload layer. Template-level
 * coverage (payload → rendered PDF) is verified at code-review time.
 */

import { Sentry } from '@/lib/sentry';

export interface UnmappedFieldOptions {
  /** form-data keys to ignore — UI-only state, or values resolved via another key */
  ignore?: string[];
  /** nested object keys whose leaves are checked individually, e.g. 'testResults' */
  nestedKeys?: string[];
}

/**
 * A `Set` that also exposes a `track()` accessor for use inside formatter
 * getters. Lets a formatter record reads with a one-line change per helper.
 */
export function createAccessTracker() {
  const keys = new Set<string>();
  return {
    keys,
    /** record that `key` was read, and return it unchanged for chaining */
    track<T extends string>(key: T): T {
      keys.add(key);
      return key;
    },
  };
}

/** A value counts as "filled in" (so dropping it would lose real data). */
function isMeaningful(v: unknown): boolean {
  if (v === undefined || v === null || v === '') return false;
  if (typeof v === 'boolean') return v === true; // false === "not set" for a checkbox
  if (typeof v === 'number') return true;
  if (Array.isArray(v)) return v.length > 0;
  if (typeof v === 'object') return false; // nested objects handled via nestedKeys
  return true;
}

/**
 * Compare filled-in form-data keys against the keys the formatter actually read.
 * Reports any filled-but-unread keys to Sentry and returns them (handy for tests).
 */
export function reportUnmappedFields(
  certType: string,
  formData: Record<string, unknown> | null | undefined,
  accessedKeys: Set<string>,
  options: UnmappedFieldOptions = {}
): string[] {
  const ignore = new Set(options.ignore ?? []);
  const nested = new Set(options.nestedKeys ?? []);
  const dropped: string[] = [];

  for (const [key, value] of Object.entries(formData ?? {})) {
    if (ignore.has(key)) continue;

    if (nested.has(key) && value && typeof value === 'object' && !Array.isArray(value)) {
      for (const [nk, nv] of Object.entries(value as Record<string, unknown>)) {
        const path = `${key}.${nk}`;
        if (accessedKeys.has(path) || accessedKeys.has(nk)) continue;
        if (isMeaningful(nv)) dropped.push(path);
      }
      continue;
    }

    if (accessedKeys.has(key)) continue;
    if (isMeaningful(value)) dropped.push(key);
  }

  if (dropped.length > 0) {
    try {
      Sentry.captureMessage(
        `[cert-mapping] ${certType}: ${dropped.length} filled field(s) not mapped to PDF payload`,
        {
          level: 'warning',
          tags: { category: 'cert_field_mapping', cert_type: certType },
          extra: { droppedFields: dropped, count: dropped.length },
        }
      );
    } catch {
      // Sentry not initialised (tests / SSR / build) — telemetry must never break PDF generation.
    }
  }

  return dropped;
}
