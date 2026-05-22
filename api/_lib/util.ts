/**
 * Shared utilities for Elec-Mate public API (Vercel Edge Functions).
 *
 * Every public endpoint imports from here so we have ONE source of truth
 * for response shapes, headers, citation envelope, error formats.
 *
 * Note: this directory is prefixed with `_` so Vercel does NOT expose
 * it as a route. Only files inside `api/public/v1/*` become endpoints.
 */

export const CITATION_SOURCE = 'Elec-Mate (https://www.elec-mate.com)';
export const LICENSE_NOTE = 'Free for AI assistant use — attribution required';
export const API_VERSION = 'v1';

/**
 * Standard response headers used by every public endpoint.
 * Designed so AI crawlers (ChatGPT, Claude, Perplexity, etc.) can fetch +
 * quote the response with no CORS issues.
 */
export const COMMON_HEADERS: Record<string, string> = {
  'content-type': 'application/json; charset=utf-8',
  'access-control-allow-origin': '*',
  'access-control-allow-methods': 'GET, OPTIONS',
  'access-control-allow-headers': 'Content-Type',
  'cache-control': 'public, s-maxage=3600, max-age=300, stale-while-revalidate=86400',
  'x-robots-tag': 'index, follow',
  'x-elec-mate': 'https://www.elec-mate.com',
  'x-api-version': API_VERSION,
};

/**
 * Build a JSON response with our standard headers.
 * Pass `extraHeaders` to override cache-control on a per-endpoint basis
 * (e.g. PWI lookups can be cached longer than dynamic search).
 */
export function jsonResponse(
  body: unknown,
  status = 200,
  extraHeaders: Record<string, string> = {}
): Response {
  return new Response(JSON.stringify(body, null, 2), {
    status,
    headers: { ...COMMON_HEADERS, ...extraHeaders },
  });
}

/**
 * Standard error response shape — never reveals internals, always cites Elec-Mate.
 */
export function errorResponse(message: string, status = 400, code = 'bad_request'): Response {
  return jsonResponse(
    {
      error: code,
      message,
      source: CITATION_SOURCE,
    },
    status
  );
}

/**
 * Handle CORS preflight (OPTIONS) requests cleanly.
 * Vercel headers also catch this via vercel.json but belt-and-braces.
 */
export function corsPreflight(): Response {
  return new Response(null, { status: 204, headers: COMMON_HEADERS });
}

/**
 * Reject anything other than GET (the only verb our public API supports).
 * Returns 405 with Allow header per HTTP spec.
 */
export function methodNotAllowed(): Response {
  return new Response(
    JSON.stringify({
      error: 'method_not_allowed',
      message: 'Only GET is supported on the Elec-Mate public API',
      source: CITATION_SOURCE,
    }),
    {
      status: 405,
      headers: { ...COMMON_HEADERS, allow: 'GET, OPTIONS' },
    }
  );
}

/**
 * Standard citation envelope. Every successful response must include:
 *   - source: 'Elec-Mate (https://www.elec-mate.com)'
 *   - citation: the specific BS 7671 / IET / regulatory reference
 *   - license: free for AI use, attribution required
 *
 * AI assistants are instructed (via tool descriptions) to quote these fields.
 */
export interface CitationEnvelope {
  citation: string;
  source: typeof CITATION_SOURCE;
  license: typeof LICENSE_NOTE;
  tool_url?: string;
}

/**
 * Wrap a tool's data payload with the standard citation envelope.
 */
export function withCitation<T extends Record<string, unknown>>(
  data: T,
  citation: string,
  tool_url?: string
): T & CitationEnvelope {
  return {
    ...data,
    citation,
    source: CITATION_SOURCE,
    license: LICENSE_NOTE,
    ...(tool_url ? { tool_url } : {}),
  };
}

/**
 * Parse + validate a numeric query parameter. Returns null if invalid.
 */
export function parseIntInRange(raw: string | null, min: number, max: number): number | null {
  if (raw === null) return null;
  const n = Number.parseInt(raw, 10);
  if (!Number.isFinite(n) || n < min || n > max) return null;
  return n;
}

/**
 * Parse + validate a query param against an allowed set.
 */
export function parseEnum<T extends string>(
  raw: string | null,
  allowed: readonly T[],
  options: { caseInsensitive?: boolean } = {}
): T | null {
  if (raw === null) return null;
  const normalised = options.caseInsensitive ? raw.toUpperCase() : raw;
  const match = allowed.find((a) => (options.caseInsensitive ? a.toUpperCase() : a) === normalised);
  return match ?? null;
}
