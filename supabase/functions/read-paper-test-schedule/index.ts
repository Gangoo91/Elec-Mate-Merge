/**
 * read-paper-test-schedule — a learner photographs a PAPER schedule of test
 * results they filled in; a vision model reads the readings so the learner can
 * check them and turn them into portfolio evidence (the same summary format as
 * a schedule done in Elec-Mate).
 *
 * 🔴 THIS NEVER DECIDES ANYTHING. It returns a proposal. Every value is shown
 * to the learner to confirm or correct before a PDF is made; criteria are only
 * SUGGESTED (suggest_work_evidence_criteria) and only an assessor passes one.
 * It never writes to a certificate and never writes evidence itself.
 *
 * Unlike parse-certificate-import (which deliberately reads circuit identity
 * only, because its output pre-fills a NEW certificate), this reads the
 * measurements: here they are the learner's own past readings, used as
 * evidence of what they did, never carried onto a certificate.
 *
 * POST { paths: ['<own uid>/…jpg', …] }  (1–3 photos already in portfolio-evidence)
 * Caller: signed-in, own folder only. Rate limit: claim_ai_evidence_quota('schedule_photo').
 */
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.49.4';
import { corsHeaders } from '../_shared/cors.ts';
import { identifyCaller, deny } from '../_shared/caller.ts';

const MODEL = 'gemini-3.5-flash';
const MAX_PAGES = 3;
const MAX_BYTES_EACH = 10 * 1024 * 1024;
const IMG_EXT: Record<string, string> = {
  jpg: 'image/jpeg', jpeg: 'image/jpeg', png: 'image/png', webp: 'image/webp',
  heic: 'image/heic', heif: 'image/heif', pdf: 'application/pdf',
};

const COLUMNS: [string, string][] = [
  ['circuitNumber', 'Circuit number or way'],
  ['circuitDescription', 'Circuit description'],
  ['bsStandard', 'Protective device BS (EN) number or type, e.g. 60898 or RCBO'],
  ['protectiveDeviceCurve', 'Device curve letter, e.g. B, C, D'],
  ['protectiveDeviceRating', 'Device rating in amperes'],
  ['liveSize', 'Live conductor csa in mm²'],
  ['cpcSize', 'cpc csa in mm²'],
  ['ringR1', 'Ring final r1 (ohms)'],
  ['ringRn', 'Ring final rn (ohms)'],
  ['ringR2', 'Ring final r2 (ohms)'],
  ['r1r2', 'R1 + R2 (ohms)'],
  ['r2', 'R2 (ohms)'],
  ['insulationLiveNeutral', 'Insulation resistance live-live / live-neutral (megohms)'],
  ['insulationLiveEarth', 'Insulation resistance live-earth (megohms)'],
  ['polarity', 'Polarity (tick, Yes, OK)'],
  ['zs', 'Measured Zs (ohms)'],
  ['maxZs', 'Maximum permitted Zs (ohms)'],
  ['rcdOneX', 'RCD disconnection time at 1x IΔn (ms)'],
];

const schema = {
  type: 'object',
  properties: {
    schedule_found: { type: 'boolean' },
    rows_seen: { type: 'number', description: 'Circuit rows printed on this page, including unreadable ones.' },
    circuits: {
      type: 'array',
      items: {
        type: 'object',
        properties: {
          ...Object.fromEntries(COLUMNS.map(([k, label]) => [k, { type: 'string', description: label }])),
          unclear: {
            type: 'array',
            items: { type: 'string' },
            description: 'Keys of any cells in this row you could not read with confidence.',
          },
        },
        // Every column required (empty string when blank): with optional
        // properties the model silently dropped most of the readings.
        required: [...COLUMNS.map(([k]) => k), 'unclear'],
        propertyOrdering: [...COLUMNS.map(([k]) => k), 'unclear'],
      },
    },
  },
  required: ['schedule_found', 'circuits'],
};

const PROMPT = `The photo shows a UK schedule of test results (BS 7671), filled in by hand or printed. Transcribe it, one entry per circuit row, with these columns:

${COLUMNS.map(([k, l]) => `- ${k}: ${l}`).join('\n')}

Rules, all of which matter more than completeness:
- Transcribe exactly what is written. Do not convert units, tidy, round or calculate anything. "0.35" stays "0.35", ">200" stays ">200".
- A blank cell, a dash, a slash or "N/A" is EMPTY: return an empty string.
- NEVER guess a value. If a cell is hard to read, give your best reading AND put its key in "unclear" for that row. If you cannot read it at all, leave it empty and list it in "unclear".
- One entry per printed row, in printed order. Do not invent, merge or reorder rows.
- Leave out names, addresses and signatures. Only the table.
- Set rows_seen to the number of circuit rows on the page. If there is no schedule of test results, set schedule_found false and return an empty array.`;

const json = (body: unknown, status = 200) =>
  new Response(JSON.stringify(body), { status, headers: { ...corsHeaders, 'Content-Type': 'application/json' } });

function toBase64(buffer: ArrayBuffer): string {
  const bytes = new Uint8Array(buffer);
  let binary = '';
  for (let i = 0; i < bytes.length; i += 0x8000) binary += String.fromCharCode(...bytes.subarray(i, i + 0x8000));
  return btoa(binary);
}

async function readPage(mime: string, data: string, key: string): Promise<Record<string, unknown> | null> {
  const abort = new AbortController();
  const timer = setTimeout(() => abort.abort(), 55_000);
  try {
    const r = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/${MODEL}:generateContent?key=${key}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      signal: abort.signal,
      body: JSON.stringify({
        contents: [{ role: 'user', parts: [{ text: PROMPT }, { inlineData: { mimeType: mime, data } }] }],
        generationConfig: { temperature: 0, maxOutputTokens: 24_000, responseMimeType: 'application/json', responseSchema: schema },
      }),
    });
    if (!r.ok) {
      console.warn('[read-paper-test-schedule] gemini', r.status, (await r.text()).slice(0, 200));
      return null;
    }
    const raw = (await r.json())?.candidates?.[0]?.content?.parts?.[0]?.text;
    return raw ? JSON.parse(raw) : null;
  } catch (e) {
    console.warn('[read-paper-test-schedule] read failed', (e as Error).message);
    return null;
  } finally {
    clearTimeout(timer);
  }
}

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') return new Response('ok', { headers: corsHeaders });
  if (req.method !== 'POST') return json({ error: 'POST only' }, 405);
  const caller = await identifyCaller(req);
  if (!caller || caller.kind !== 'user') return deny(corsHeaders, 401, 'Sign in first');

  const key = Deno.env.get('GEMINI_API_KEY');
  if (!key) return json({ error: 'The reader is not available right now.' }, 503);

  let body: { paths?: unknown };
  try {
    body = await req.json();
  } catch {
    return json({ error: 'Bad request' }, 400);
  }
  const paths = (Array.isArray(body.paths) ? body.paths : []).map(String).filter(Boolean);
  if (!paths.length || paths.length > MAX_PAGES) return json({ error: `Send 1 to ${MAX_PAGES} photos.` }, 400);
  for (const p of paths) {
    // Own evidence folder only.
    if (!p.startsWith(`${caller.userId}/`) || p.includes('..') || !/^[A-Za-z0-9._\-/]{1,400}$/.test(p)) {
      return deny(corsHeaders, 403, 'You can only read your own photos');
    }
  }

  const asUser = createClient(Deno.env.get('SUPABASE_URL')!, Deno.env.get('SUPABASE_ANON_KEY')!, {
    global: { headers: { Authorization: req.headers.get('Authorization') ?? '' } },
    auth: { persistSession: false },
  });
  const { error: quotaErr } = await asUser.rpc('claim_ai_evidence_quota', { p_kind: 'schedule_photo' });
  if (quotaErr) {
    if (quotaErr.hint === 'rate_limited' || /limit reached/i.test(quotaErr.message)) {
      return json({ error: 'You have read a lot of schedules this hour. Try again later.' }, 429);
    }
    return deny(corsHeaders, 403, 'Not allowed');
  }

  const admin = createClient(Deno.env.get('SUPABASE_URL')!, Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!, {
    auth: { persistSession: false },
  });
  const pages: { mime: string; data: string }[] = [];
  for (const p of paths) {
    const ext = (p.match(/\.([a-z0-9]+)$/i)?.[1] ?? '').toLowerCase();
    const { data: blob, error } = await admin.storage.from('portfolio-evidence').download(p);
    if (error || !blob) return json({ error: 'Could not open that photo. Try again.' }, 404);
    if (blob.size > MAX_BYTES_EACH) return json({ error: 'That photo is over 10 MB.' }, 413);
    const mime = (blob.type && blob.type !== 'application/octet-stream' ? blob.type : IMG_EXT[ext]) || 'image/jpeg';
    if (!/^image\/|^application\/pdf$/.test(mime)) return json({ error: 'Send a photo or a PDF.' }, 400);
    pages.push({ mime, data: toBase64(await blob.arrayBuffer()) });
  }

  const reads = await Promise.all(pages.map((pg) => readPage(pg.mime, pg.data, key)));
  if (reads.every((r) => r === null)) {
    return json({ error: 'Could not read that photo. Try a clearer, flatter photo in good light.' }, 502);
  }
  const keys = COLUMNS.map(([k]) => k);
  let rowsSeen = 0;
  let found = false;
  const circuits: Record<string, unknown>[] = [];
  for (const r of reads) {
    if (!r) continue;
    found = found || r.schedule_found === true;
    rowsSeen += Number(r.rows_seen) || 0;
    for (const row of (Array.isArray(r.circuits) ? r.circuits : []) as Record<string, unknown>[]) {
      const out: Record<string, unknown> = {};
      for (const k of keys) {
        let v = typeof row?.[k] === 'string' ? (row[k] as string).trim() : '';
        if (v && !/[\p{L}\p{N}✓]/u.test(v)) v = '';
        out[k] = v.slice(0, 60);
      }
      out.unclear = (Array.isArray(row?.unclear) ? row.unclear : []).map(String).filter((k) => keys.includes(k));
      if (keys.slice(1).some((k) => out[k])) circuits.push(out);
    }
  }
  return json({
    success: true,
    found,
    circuits,
    rowsSeen,
    truncated: rowsSeen > 0 && circuits.length < rowsSeen,
    unclearCount: circuits.reduce((n, c) => n + (c.unclear as string[]).length, 0),
  });
});
