import 'jsr:@supabase/functions-js/edge-runtime.d.ts';
import { captureException } from '../_shared/sentry.ts';
import {
  MEASURED_COLUMNS,
  readingsPrompt,
  readingsSchema,
  type CircuitContext,
  type MeasuredColumn,
} from '../_shared/test-results-schema.ts';

/**
 * Read handwritten test results off a photographed site sheet (ELE-1607).
 *
 * Same proven path as `parse-certificate-import` and `analyse-survey-photo`:
 * fetch → chunked base64 → Gemini `inlineData` → strict `responseSchema`.
 *
 * ── 🔴 THIS NEVER WRITES ANYTHING ─────────────────────────────────────────
 * It returns a proposal. The client shows every value next to the crop it came
 * from, and nothing reaches the schedule until the electrician applies it. An
 * EICR is signed evidence — a transcription error here is not a UX annoyance,
 * it is a wrong certificate with a real name on it.
 *
 * ── 🔴 CONFIDENCE GATE IS ENFORCED SERVER-SIDE ────────────────────────────
 * Below the floor the value is dropped, not passed through greyed out. A blank
 * the electrician must fill is safe; a confident wrong number is not.
 */

const GEMINI_API_KEY = Deno.env.get('GEMINI_API_KEY');
const MODEL = 'gemini-3.5-flash';
const MAX_FILE_BYTES = 14 * 1024 * 1024;
/** A sheet is one or two sides; more than this is a different problem. */
const MAX_IMAGES = 4;

/**
 * Below this the reading is discarded.
 *
 * 0.75 rather than something laxer because the failure is silent: a wrong Zs
 * still looks like a plausible Zs, and the circuit's pass/fail flips on it.
 */
const CONFIDENCE_FLOOR = 0.75;

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers':
    'authorization, x-client-info, apikey, content-type, x-supabase-timeout, x-request-id',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
};

const json = (body: unknown, status = 200) =>
  new Response(JSON.stringify(body), {
    status,
    headers: { ...corsHeaders, 'Content-Type': 'application/json' },
  });

/** Chunked — `String.fromCharCode(...bytes)` blows the stack on a real photo. */
function toBase64(buffer: ArrayBuffer): string {
  const bytes = new Uint8Array(buffer);
  const CHUNK = 0x8000;
  let binary = '';
  for (let i = 0; i < bytes.length; i += CHUNK) {
    binary += String.fromCharCode(...bytes.subarray(i, i + CHUNK));
  }
  return btoa(binary);
}

/** Sniff the CONTENT, never the name — an iPhone photo is HEIC (ELE-1368). */
function detectMime(buffer: ArrayBuffer, url: string): string {
  const b = new Uint8Array(buffer.slice(0, 16));
  const at = (i: number, ...sig: number[]) => sig.every((v, n) => b[i + n] === v);
  if (at(0, 0x25, 0x50, 0x44, 0x46)) return 'application/pdf';
  if (at(0, 0x89, 0x50, 0x4e, 0x47)) return 'image/png';
  if (at(0, 0xff, 0xd8, 0xff)) return 'image/jpeg';
  if (at(4, 0x66, 0x74, 0x79, 0x70)) {
    const brand = String.fromCharCode(b[8], b[9], b[10], b[11]);
    if (['heic', 'heix', 'hevc', 'heim', 'heis', 'mif1', 'msf1'].includes(brand)) return 'image/heic';
    if (brand === 'avif') return 'image/avif';
  }
  if (at(0, 0x52, 0x49, 0x46, 0x46) && at(8, 0x57, 0x45, 0x42, 0x50)) return 'image/webp';
  const lower = url.toLowerCase();
  if (lower.includes('.pdf')) return 'application/pdf';
  if (lower.includes('.png')) return 'image/png';
  if (lower.includes('.heic') || lower.includes('.heif')) return 'image/heic';
  return 'image/jpeg';
}

const s = (v: unknown) => (typeof v === 'string' ? v.trim() : '');

/**
 * Strip scope words that leak into the value.
 *
 * The model returned `"all >200"` for a column marked "all >200" — the scope is
 * already carried by the `scope` field, and `"all >200"` written into a schedule
 * cell is not a measurement. Prompted against as well, but enforced here: a
 * prompt is guidance, this is a guarantee.
 */
function stripScopeWords(value: string): string {
  return value
    .replace(/^\s*(all|both|ditto|same|as\s+above|throughout)\b[\s:—-]*/i, '')
    .trim();
}

/** Gemini boxes are [ymin, xmin, ymax, xmax] normalised 0-1000. */
function normaliseBox(raw: unknown): [number, number, number, number] | null {
  if (!Array.isArray(raw) || raw.length !== 4) return null;
  const n = raw.map(Number);
  if (n.some((v) => !Number.isFinite(v) || v < 0 || v > 1000)) return null;
  const [ymin, xmin, ymax, xmax] = n;
  if (ymax <= ymin || xmax <= xmin) return null;
  return [ymin, xmin, ymax, xmax];
}

Deno.serve(async (req: Request) => {
  if (req.method === 'OPTIONS') return new Response(null, { headers: corsHeaders });

  try {
    if (!GEMINI_API_KEY) throw new Error('GEMINI_API_KEY is not set');

    const body = await req.json().catch(() => ({}));
    const fileUrls: string[] = Array.isArray(body?.fileUrls)
      ? body.fileUrls.slice(0, MAX_IMAGES)
      : [];
    const circuits: CircuitContext[] = Array.isArray(body?.circuits) ? body.circuits : [];

    if (!fileUrls.length) return json({ success: false, error: 'fileUrls is required' }, 400);
    /*
     * 🔴 Refuse without circuits rather than reading the sheet cold.
     *
     * The whole safety case rests on matching marks to circuits we already
     * hold. With no circuits the model would have to infer identity from the
     * paper, which is the version of this feature that produces wrong
     * certificates.
     */
    if (!circuits.length) {
      return json(
        { success: false, error: 'Add the circuits to the schedule first, then scan the results' },
        400
      );
    }

    const parts: { inlineData: { mimeType: string; data: string } }[] = [];
    for (const url of fileUrls) {
      const res = await fetch(url);
      if (!res.ok) continue;
      const buffer = await res.arrayBuffer();
      if (!buffer.byteLength || buffer.byteLength > MAX_FILE_BYTES) continue;
      parts.push({
        inlineData: { mimeType: detectMime(buffer, url), data: toBase64(buffer) },
      });
    }
    if (!parts.length) return json({ success: false, error: 'Could not read those photos' }, 400);

    const abort = new AbortController();
    const timer = setTimeout(() => abort.abort(), 90_000);
    let gem: Response;
    try {
      gem = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/${MODEL}:generateContent?key=${GEMINI_API_KEY}`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          signal: abort.signal,
          body: JSON.stringify({
            contents: [{ role: 'user', parts: [{ text: readingsPrompt(circuits) }, ...parts] }],
            generationConfig: {
              /* Transcription, not interpretation — and it must not drift between runs. */
              temperature: 0,
              /* Measured on the cert importer: 12k truncates mid-JSON, 48k runs away. */
              maxOutputTokens: 30_000,
              responseMimeType: 'application/json',
              responseSchema: readingsSchema(),
            },
          }),
        }
      );
    } catch (e) {
      if ((e as Error).name === 'AbortError') {
        return json({ success: false, error: 'Reading that sheet timed out' }, 504);
      }
      throw e;
    } finally {
      clearTimeout(timer);
    }

    if (!gem.ok) {
      const detail = (await gem.text()).slice(0, 300);
      console.error('[read-test-results] Gemini error:', gem.status, detail);
      return json({ success: false, error: `Sheet reader failed (${gem.status})` }, 502);
    }

    const raw = (await gem.json())?.candidates?.[0]?.content?.parts?.[0]?.text;
    if (!raw) return json({ success: false, error: 'The reader returned nothing' }, 502);

    let parsed: Record<string, unknown>;
    try {
      parsed = JSON.parse(raw);
    } catch {
      return json({ success: false, error: 'The reader returned a malformed result' }, 502);
    }

    if (parsed.sheet_found === false) {
      return json({ success: true, sheetFound: false, readings: [], dropped: 0, unreadable: [] });
    }

    const known = new Set(circuits.map((c) => String(c.number)));
    const valid = new Set<string>(MEASURED_COLUMNS);
    let dropped = 0;

    const readings = (Array.isArray(parsed.readings) ? parsed.readings : [])
      .map((r: Record<string, unknown>) => {
        const column = s(r.column) as MeasuredColumn;
        const value = stripScopeWords(s(r.value));
        const confidence = Number(r.confidence);
        const scope = s(r.scope) === 'all' ? 'all' : 'circuit';
        const circuitNumber = s(r.circuit_number);

        if (!valid.has(column) || !value) return null;
        /* 🔴 The gate. Discarded, not surfaced greyed out — see the header. */
        if (!Number.isFinite(confidence) || confidence < CONFIDENCE_FLOOR) {
          dropped++;
          return null;
        }
        /*
         * A per-circuit reading against a circuit we do not hold is a
         * hallucinated row. Drop it rather than inventing somewhere to put it.
         */
        if (scope === 'circuit' && !known.has(circuitNumber)) {
          dropped++;
          return null;
        }

        /* 1-based from the model; clamped so a bad index can't mis-crop. */
        const rawImage = Number(r.image);
        const imageIndex =
          Number.isFinite(rawImage) && rawImage >= 1 && rawImage <= parts.length
            ? Math.floor(rawImage) - 1
            : 0;

        return {
          column,
          scope,
          circuitNumber: scope === 'circuit' ? circuitNumber : '',
          value,
          confidence: Math.max(0, Math.min(1, confidence)),
          box: normaliseBox(r.box),
          imageIndex,
        };
      })
      .filter(Boolean);

    return json({
      success: true,
      sheetFound: true,
      readings,
      /* Surfaced so the client can say "4 were too unclear to read" rather than silently short. */
      dropped,
      unreadable: Array.isArray(parsed.unreadable) ? parsed.unreadable.map(s).filter(Boolean) : [],
    });
  } catch (error) {
    console.error('[read-test-results] Error:', error);
    await captureException(error, {
      functionName: 'read-test-results',
      requestUrl: req.url,
      requestMethod: req.method,
    });
    return json(
      { success: false, error: error instanceof Error ? error.message : 'Unknown error' },
      500
    );
  }
});
