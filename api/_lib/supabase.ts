/**
 * Shared Supabase config for public API endpoints.
 *
 * Uses the published anon key (safe to expose — same one in client.ts,
 * RLS enforced). All queries are read-only against public-data tables.
 *
 * For RAG / vector search, prefer calling the existing edge functions
 * (e.g. `bs7671-rag-search`) via `callEdgeFunction()` rather than
 * re-implementing embedding generation here.
 *
 * For straight PostgREST lookups (bs7671_regulations, practical_work_intelligence,
 * regional_job_pricing, etc.) use `queryTable()`.
 */

export const SUPABASE_URL = 'https://jtwygbeceundfgnkirof.supabase.co';
export const SUPABASE_ANON =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imp0d3lnYmVjZXVuZGZnbmtpcm9mIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDYyMTc2OTUsImV4cCI6MjA2MTc5MzY5NX0.NgMOzzNkreOiJ2_t_f90NJxIJTcpUninWPYnM7RkrY8';

const DEFAULT_HEADERS: Record<string, string> = {
  apikey: SUPABASE_ANON,
  Authorization: `Bearer ${SUPABASE_ANON}`,
  Accept: 'application/json',
};

/**
 * Query a Supabase table via PostgREST.
 * Pass the table name + a query string (already URL-encoded select/filter/limit).
 *
 * Example:
 *   queryTable<{ reg_number: string; full_text: string }>(
 *     'bs7671_regulations',
 *     'select=reg_number,full_text&reg_number=eq.411.4.4'
 *   )
 */
export async function queryTable<T = unknown>(
  table: string,
  queryString: string
): Promise<{ ok: true; data: T[] } | { ok: false; status: number; error: string }> {
  const url = `${SUPABASE_URL}/rest/v1/${table}?${queryString}`;
  try {
    const res = await fetch(url, { headers: DEFAULT_HEADERS });
    if (!res.ok) {
      const text = await res.text().catch(() => '');
      return { ok: false, status: res.status, error: text.slice(0, 200) };
    }
    const data = (await res.json()) as T[];
    return { ok: true, data };
  } catch (err) {
    return {
      ok: false,
      status: 500,
      error: err instanceof Error ? err.message : 'Unknown fetch error',
    };
  }
}

/**
 * Call a Supabase Edge Function (e.g. for RAG / vector search).
 * Body is sent as JSON; response is parsed as JSON.
 */
export async function callEdgeFunction<TResp = unknown, TReq = unknown>(
  functionName: string,
  body: TReq
): Promise<{ ok: true; data: TResp } | { ok: false; status: number; error: string }> {
  const url = `${SUPABASE_URL}/functions/v1/${functionName}`;
  try {
    const res = await fetch(url, {
      method: 'POST',
      headers: { ...DEFAULT_HEADERS, 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    });
    if (!res.ok) {
      const text = await res.text().catch(() => '');
      return { ok: false, status: res.status, error: text.slice(0, 200) };
    }
    const data = (await res.json()) as TResp;
    return { ok: true, data };
  } catch (err) {
    return {
      ok: false,
      status: 500,
      error: err instanceof Error ? err.message : 'Unknown fetch error',
    };
  }
}

/**
 * Escape user input for an ILIKE wildcard query — strips % and _ that would
 * otherwise act as wildcards, and collapses whitespace to a wildcard joiner.
 */
export function escapeIlike(s: string): string {
  return s.replace(/[%_]/g, '\\$&').replace(/,/g, ' ').replace(/\s+/g, '%');
}

/**
 * Build a short snippet around the first match of a query term in a body of text.
 */
export function snippet(text: string, query: string, maxLen = 240): string {
  if (!text) return '';
  const firstWord = query.toLowerCase().split(/\s+/)[0] || '';
  const idx = text.toLowerCase().indexOf(firstWord);
  const start = Math.max(0, idx - 60);
  const end = Math.min(text.length, start + maxLen);
  const out = text.slice(start, end).replace(/\s+/g, ' ').trim();
  return (start > 0 ? '…' : '') + out + (end < text.length ? '…' : '');
}
