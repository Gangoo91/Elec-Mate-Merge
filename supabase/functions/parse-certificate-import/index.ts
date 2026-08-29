import 'jsr:@supabase/functions-js/edge-runtime.d.ts';
import { captureException } from '../_shared/sentry.ts';
import {
  CERT_IMPORT_TYPES,
  CERT_IMPORT_LABEL,
  CERT_IMPORT_SHORT,
  fieldsFor,
  promptFor,
  responseSchemaFor,
  validateExtraction,
  verifyPromptFor,
  verifySchemaFor,
  scheduleSchemaFor,
  schedulePrompt,
  schedulePagePrompt,
  schedulePageSchema,
  type VerifyStatus,
  type CertImportType,
} from '../_shared/cert-import-schemas.ts';

/**
 * Parse a photographed or scanned paper certificate into draft form data.
 * ELE-1368 — "Is there a way you can scan paper certs into the digital?"
 *
 * Follows the pattern proven by `verify-document` (ELE-112): fetch the file,
 * base64 it in chunks, hand it to Gemini as `inlineData`. Gemini reads PDFs
 * natively, so there is no rasterising step and a multi-page scanned EICR goes
 * in whole.
 *
 * 🔴 THIS FUNCTION NEVER WRITES A REPORT. It returns a proposal. Creating the
 * draft, and every field that lands on it, is the reviewer's decision on the
 * client. A parser that wrote straight into `reports` would be one bad OCR away
 * from a fabricated certificate carrying somebody's name.
 *
 * 🔴 It also never signs anything, and deliberately does not extract signatures.
 */

const GEMINI_API_KEY = Deno.env.get('GEMINI_API_KEY');
const MODEL = 'gemini-3.5-flash';

/* Gemini's inline path tops out around 20MB of request body; base64 inflates
 * by ~33%, so the raw file ceiling is about 14MB. A phone photo is 2-5MB and a
 * scanned EICR 1-8MB, so this is generous — but a 300dpi colour scan of a
 * ten-page report can exceed it, and a clear error beats a truncated read. */
const MAX_FILE_BYTES = 14 * 1024 * 1024;

/* One certificate, not a filing cabinet. A paper EICR runs to about ten sheets. */
const MAX_PAGES = 12;

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

/** Chunked, to avoid a stack overflow on large files (as in verify-document). */
function toBase64(buffer: ArrayBuffer): string {
  const bytes = new Uint8Array(buffer);
  const CHUNK = 0x8000;
  let binary = '';
  for (let i = 0; i < bytes.length; i += CHUNK) {
    binary += String.fromCharCode(...bytes.subarray(i, i + CHUNK));
  }
  return btoa(binary);
}

/**
 * 🔴 Sniff the CONTENT, do not trust the file name.
 *
 * `verify-document` derives the mime type from the URL extension and falls back
 * to image/jpeg. That silently mislabels the single most likely input here: an
 * iPhone photo is HEIC, and a signed storage URL may carry no extension at all.
 * Sent as image/jpeg, Gemini either rejects it or reads noise — and the user
 * sees "couldn't read your certificate" for a perfectly good photograph.
 *
 * Magic numbers are checked first; the URL is only a fallback.
 */
function detectMime(buffer: ArrayBuffer, url: string): string {
  const b = new Uint8Array(buffer.slice(0, 16));
  const at = (i: number, ...sig: number[]) => sig.every((v, n) => b[i + n] === v);

  if (at(0, 0x25, 0x50, 0x44, 0x46)) return 'application/pdf'; // %PDF
  if (at(0, 0x89, 0x50, 0x4e, 0x47)) return 'image/png';
  if (at(0, 0xff, 0xd8, 0xff)) return 'image/jpeg';
  // ISO-BMFF: "ftyp" at offset 4, then a HEIC/HEIF brand.
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
  if (lower.includes('.webp')) return 'image/webp';
  return 'image/jpeg';
}

interface ParseRequest {
  /** Single document — a PDF, or one photo. */
  fileUrl?: string;
  /**
   * 🔴 SEVERAL PHOTOS OF ONE CERTIFICATE.
   *
   * A paper EICR is four to ten pages, and a phone photographs ONE of them. The
   * first cut took a single file, so photographing paper returned only the
   * fields that happened to be on that page — the supply particulars, which sit
   * on a later sheet, were simply absent and looked like a failure to read.
   *
   * All pages go into ONE request so the model sees the whole document at once.
   * That also lets it resolve a field printed on one page and continued on the
   * next, which separate calls could never do.
   */
  fileUrls?: string[];
  certType?: CertImportType;
  /** Set false to skip the verification pass (roughly halves the wait). */
  verify?: boolean;
  /** Set true to read the schedule of test results in this request. */
  schedule?: boolean;
  /** Read ONLY the schedule — skips the header extraction's verify pass. */
  scheduleOnly?: boolean;
}

/** One Gemini call against the already-fetched pages. Returns parsed JSON or null. */
async function askGemini(
  prompt: string,
  parts: { inlineData: { mimeType: string; data: string } }[],
  schema: unknown,
  maxTokens: number,
  timeoutMs: number,
  label: string
): Promise<Record<string, unknown> | null> {
  const abort = new AbortController();
  const timer = setTimeout(() => abort.abort(), timeoutMs);
  try {
    const res = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/${MODEL}:generateContent?key=${GEMINI_API_KEY}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        signal: abort.signal,
        body: JSON.stringify({
          contents: [{ role: 'user', parts: [{ text: prompt }, ...parts] }],
          generationConfig: {
            temperature: 0,
            maxOutputTokens: maxTokens,
            responseMimeType: 'application/json',
            responseSchema: schema,
          },
        }),
      }
    );
    if (!res.ok) {
      console.warn(`[parse-certificate-import] ${label} failed: ${res.status}`);
      return null;
    }
    const raw = (await res.json())?.candidates?.[0]?.content?.parts?.[0]?.text;
    return raw ? JSON.parse(raw) : null;
  } catch (e) {
    console.warn(`[parse-certificate-import] ${label} error:`, (e as Error).message);
    return null;
  } finally {
    clearTimeout(timer);
  }
}

/**
 * 🔴 THE SCHEDULE IS READ ONE PAGE AT A TIME. This is not an optimisation.
 *
 * Measured on a real 10-page EICR whose schedule holds 5 circuits:
 *   • whole document in one call → **1 row of 5**, and 65s
 *   • the single schedule page   → **5 of 5, nothing truncated, 19s**
 *
 * Handed a long document the model reports what it saw (`rows_seen: 5`) and
 * then emits one row anyway. Narrowing each call to a single page makes the
 * task small enough to finish, and the pages run concurrently so it is also
 * faster than the thing that did not work.
 *
 * Rows are concatenated in page order, and `rows_seen` is summed, so the
 * truncation guard still applies across the whole document.
 */
async function readSchedulePerPage(
  parts: { inlineData: { mimeType: string; data: string } }[]
): Promise<Record<string, unknown> | null> {
  /* ── 1. Which pages actually carry circuit rows? ─────────────────────── */
  let targets: number[] = [];
  if (parts.length > 1) {
    const found = await askGemini(
      schedulePagePrompt(parts.length),
      parts,
      schedulePageSchema(),
      500,
      40_000,
      'schedule page-finder'
    );
    const raw = Array.isArray(found?.pages) ? (found!.pages as unknown[]) : [];
    targets = raw
      .map((n) => Number(n))
      .filter((n) => Number.isInteger(n) && n >= 1 && n <= parts.length)
      /* A schedule spanning more than three pages is a very large install; cap
       * it so one odd answer cannot turn into ten expensive calls. */
      .slice(0, 3);
  }
  /* No page-finder (single page) or it found nothing → read what we have. */
  if (!targets.length) targets = parts.map((_, i) => i + 1);

  /* ── 2. Read only those pages, properly ─────────────────────────────── */
  const results = await Promise.all(
    targets.map((pageNo) =>
      askGemini(
        schedulePrompt(),
        [parts[pageNo - 1]],
        scheduleSchemaFor(),
        /*
         * 🔴 30_000 IS A MEASURED VALUE. Do not tune it casually.
         *   • 12k  → JSON truncated mid-string ("Unterminated string at 10326")
         *            and the whole page was silently lost on parse.
         *   • 48k  → the model ran on and hit the timeout instead; 10KB of JSON
         *            came back for a five-row table, which is looping, not
         *            transcribing.
         *   • 30k  → read a real 5-circuit schedule 5 of 5 in 19s.
         * Enough headroom for a large board, tight enough to stop a runaway.
         */
        30_000,
        100_000,
        `schedule p${pageNo}`
      )
    )
  );
  const ok = results.filter(Boolean) as Record<string, unknown>[];
  if (!ok.length) return null;

  const circuits: unknown[] = [];
  let rowsSeen = 0;
  let found = false;
  for (const r of ok) {
    if (r.schedule_found) found = true;
    rowsSeen += Number(r.rows_seen) || 0;
    if (Array.isArray(r.circuits)) circuits.push(...r.circuits);
  }
  return { schedule_found: found, rows_seen: rowsSeen, circuits };
}

Deno.serve(async (req: Request) => {
  if (req.method === 'OPTIONS') return new Response(null, { headers: corsHeaders });

  try {
    if (!GEMINI_API_KEY) throw new Error('GEMINI_API_KEY is not set');

    const body = (await req.json().catch(() => ({}))) as ParseRequest;
    const urls = (body.fileUrls?.length ? body.fileUrls : body.fileUrl ? [body.fileUrl] : [])
      .filter((u) => typeof u === 'string' && u.length > 0);
    const certType = body.certType;

    if (!urls.length) return json({ success: false, error: 'fileUrl or fileUrls is required' }, 400);
    if (urls.length > MAX_PAGES) {
      return json(
        { success: false, error: `That is ${urls.length} pages. The limit is ${MAX_PAGES} in one go.` },
        400
      );
    }
    if (!certType || !CERT_IMPORT_TYPES.includes(certType)) {
      return json(
        { success: false, error: `certType must be one of: ${CERT_IMPORT_TYPES.join(', ')}` },
        400
      );
    }

    /* ── Fetch every page ─────────────────────────────────────────────── */
    const parts: { inlineData: { mimeType: string; data: string } }[] = [];
    let totalBytes = 0;
    const mimeTypes: string[] = [];

    for (const [i, url] of urls.entries()) {
      const fileRes = await fetch(url);
      if (!fileRes.ok) {
        return json(
          { success: false, error: `Could not fetch page ${i + 1} (${fileRes.status})` },
          400
        );
      }
      const buffer = await fileRes.arrayBuffer();
      if (buffer.byteLength === 0) {
        return json({ success: false, error: `Page ${i + 1} is empty` }, 400);
      }
      totalBytes += buffer.byteLength;
      /*
       * The cap is on the TOTAL, not each file — ten 3MB photos blow the inline
       * limit just as surely as one 30MB scan, and failing on the last upload
       * after a long wait is the worst place to find out.
       */
      if (totalBytes > MAX_FILE_BYTES) {
        return json(
          {
            success: false,
            error: `Those pages come to ${(totalBytes / 1024 / 1024).toFixed(1)}MB. The limit is ${MAX_FILE_BYTES / 1024 / 1024}MB in one go — try fewer pages, or lower-resolution photos.`,
          },
          400
        );
      }
      const mt = detectMime(buffer, url);
      mimeTypes.push(mt);
      parts.push({ inlineData: { mimeType: mt, data: toBase64(buffer) } });
    }

    const mimeType = mimeTypes[0];
    console.log(
      `[parse-certificate-import] ${certType}, ${urls.length} page(s), ${mimeTypes.join('/')}, ${(totalBytes / 1024).toFixed(0)}KB`
    );

    /* ── Read ─────────────────────────────────────────────────────────── */
    // 55s ceiling, as in verify-document, to stay inside the edge runtime.
    const abort = new AbortController();
    const timer = setTimeout(() => abort.abort(), 55_000);
    let res: Response;
    try {
      res = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/${MODEL}:generateContent?key=${GEMINI_API_KEY}`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          signal: abort.signal,
          body: JSON.stringify({
            contents: [
              {
                role: 'user',
                parts: [
                  {
                    text:
                      promptFor(certType) +
                      (urls.length > 1
                        ? `\n\nThere are ${urls.length} images. They are consecutive pages of ONE certificate, in order. Read them together as a single document.`
                        : ''),
                  },
                  ...parts,
                ],
              },
            ],
            generationConfig: {
              // Transcription, not composition — near-deterministic.
              temperature: 0,
              maxOutputTokens: 8_000,
              responseMimeType: 'application/json',
              responseSchema: responseSchemaFor(certType),
            },
          }),
        }
      );
    } catch (e) {
      if ((e as Error).name === 'AbortError') {
        return json(
          { success: false, error: 'Reading the document timed out. Try a smaller or clearer file.' },
          504
        );
      }
      throw e;
    } finally {
      clearTimeout(timer);
    }

    if (!res.ok) {
      const detail = (await res.text()).slice(0, 400);
      console.error('[parse-certificate-import] Gemini error:', res.status, detail);
      return json({ success: false, error: `Document reader failed (${res.status})`, detail }, 502);
    }

    const payload = await res.json();
    const raw = payload?.candidates?.[0]?.content?.parts?.[0]?.text;
    if (!raw) {
      return json({ success: false, error: 'The reader returned nothing for this document' }, 502);
    }

    let parsed: Record<string, unknown>;
    try {
      parsed = JSON.parse(raw);
    } catch {
      console.error('[parse-certificate-import] Unparseable JSON:', String(raw).slice(0, 300));
      return json({ success: false, error: 'The reader returned a malformed result' }, 502);
    }

    /* ── The mismatch guard ───────────────────────────────────────────── */
    const detected = String(parsed.detected_document_type ?? '');
    const detectedConfidence = Number(parsed.detected_confidence ?? 0);
    /*
     * Only contradict the user when the model is genuinely sure. A hedged
     * disagreement on a poor scan is not evidence of anything, and blocking on
     * it would make the feature feel broken.
     *
     * ⚠️ A CONFIDENT `other` COUNTS. It was briefly treated as "I don't know"
     * and waved through — but feeding it a document that was not a certificate
     * at all still produced fifteen plausible-looking fields with no warning
     * attached. "I am certain this is not one of your three forms" is the
     * opposite of uncertainty, and it is exactly when the reviewer needs
     * telling. `unreadable` warns at any confidence: if the model cannot tell
     * what the document is, nothing it extracted from it is worth trusting.
     */
    const KNOWN = ['eicr', 'eic', 'minor-works'];
    let mismatch = false;
    let mismatchReason = '';
    if (KNOWN.includes(detected) && detected !== certType && detectedConfidence >= 0.7) {
      mismatch = true;
      mismatchReason = `This looks like ${CERT_IMPORT_SHORT[detected as CertImportType]}, not ${CERT_IMPORT_SHORT[certType]}.`;
    } else if (detected === 'other' && detectedConfidence >= 0.7) {
      mismatch = true;
      mismatchReason = `This does not look like ${CERT_IMPORT_SHORT[certType]}, or any certificate that can be imported.`;
    } else if (detected === 'unreadable') {
      mismatch = true;
      mismatchReason =
        'The document could not be identified. Anything read from it should be treated as unverified.';
    }

    const fields = (parsed.fields ?? {}) as Record<string, unknown>;
    const confidence = (parsed.field_confidence ?? {}) as Record<string, unknown>;

    /*
     * Return only the keys we asked for. A model that volunteers an extra field
     * is a model whose output no longer matches the form it is being mapped
     * onto, and silently carrying that through is how junk reaches a draft.
     */
    const allowed = new Set(fieldsFor(certType).map((f) => f.key));
    const clean: Record<string, string> = {};
    const cleanConfidence: Record<string, number> = {};
    for (const key of allowed) {
      const v = fields[key];
      let s = typeof v === 'string' ? v.trim() : '';
      /*
       * 🔴 A DASH IS NOT A VALUE.
       *
       * Printed forms fill empty cells with a placeholder glyph — "-", "–", "—",
       * "/", "...". Told to transcribe verbatim, the model returns those, and
       * they are perfectly faithful to the page: a real 10-page EICR came back
       * with `ze: "–"` and `mainSwitchRating: "—"` for cells that were simply
       * blank.
       *
       * Left alone, that dash lands in a numeric field on the draft, survives
       * into the payload, and prints on the reissued certificate looking like a
       * measurement. Anything reading it numerically gets NaN.
       *
       * The test is "contains no letter or digit", so a value the electrician
       * actually wrote — "N/A", "None", "TBC" — is kept. Those are answers. A
       * row of punctuation is the absence of one.
       */
      if (s && !/[\p{L}\p{N}]/u.test(s)) s = '';
      if (s) {
        clean[key] = s;
        const c = Number(confidence[key]);
        cleanConfidence[key] = Number.isFinite(c) ? Math.max(0, Math.min(1, c)) : 0;
      }
    }

    /*
     * Deterministic checks on top of the model's own confidence. Confidence
     * says how sure it is; these say whether the value can possibly be right.
     * A UK date read the American way arrives at 0.99 like everything else.
     */
    const { values: validated, warnings, overdue } = validateExtraction(clean);

    /*
     * ── Second pass: check the values against the document ─────────────
     *
     * Opt-out rather than opt-in. It roughly doubles the wall time, but this is
     * a transcription somebody signs, and the whole point of the feature is not
     * having to check every field by hand — a check that is off by default is a
     * check nobody runs.
     *
     * 🔴 Non-fatal by design. If verification fails we return the extraction
     * unverified and SAY SO, rather than losing a good read to a second call
     * that timed out.
     */
    let verification: Record<string, { status: VerifyStatus; suggested?: string }> = {};
    let verified = false;
    let circuits: Record<string, string>[] = [];
    let scheduleFound = false;
    let rowsSeen = 0;
    let scheduleTruncated = false;

    /*
     * 🔴 VERIFY AND SCHEDULE RUN IN PARALLEL, not one after the other.
     *
     * Each is its own ~20s call against the same pages. Sequentially that is
     * extract + verify + schedule ≈ 60s, which is past the 55s edge-function
     * ceiling — the request would die on exactly the long multi-page documents
     * this feature exists for. Run together, the cost is the slower of the two.
     *
     * Both are non-fatal by design: a failed pass returns the extraction
     * unverified or without a schedule and SAYS SO, rather than losing a good
     * read to a second call that timed out.
     */
    /*
     * `scheduleOnly` exists so the CLIENT can fire two requests at once: the
     * header (fast, ~35s) renders the review step, and the schedule (slow, a
     * 20-row × 26-column grid over ten pages) arrives after and merges in.
     *
     * ⚠️ Doing both inside one request took 72s and the schedule call hit its
     * own 45s guard and returned nothing — the feature silently produced no
     * circuits on exactly the long documents it exists for. Splitting it means
     * neither call waits on the other, and the user is not staring at a spinner
     * for over a minute before seeing anything.
     */
    const scheduleOnly = body.scheduleOnly === true;
    const wantVerify = !scheduleOnly && body.verify !== false && Object.keys(validated).length > 0;
    /* Minor works has no schedule of test results to find — its results are on
     * the face of the form, and are already in the header fields above. */
    /* Minor works has no schedule of test results — its results are on the face
     * of the form and are already in the header fields above. */
    const wantSchedule =
      (scheduleOnly || body.schedule === true) && certType !== 'minor-works';

    const [verifyRes, scheduleRes] = await Promise.all([
      wantVerify
        ? askGemini(verifyPromptFor(certType, validated), parts, verifySchemaFor(certType), 4_000, 45_000, 'verify')
        : Promise.resolve(null),
      wantSchedule
        ? readSchedulePerPage(parts)
        : Promise.resolve(null),
    ]);

    if (verifyRes) {
      const checks = verifyRes.checks;
      if (Array.isArray(checks)) {
        const byField = new Map<string, { status?: string; suggested?: string }>();
        for (const row of checks as { field?: string; status?: string; suggested?: string }[]) {
          if (row?.field) byField.set(row.field, row);
        }
        for (const key of Object.keys(validated)) {
          const c = byField.get(key);
          if (!c?.status) {
            verification[key] = { status: 'unclear' };
            warnings[key] = warnings[key] ?? 'The second read did not report on this — check it.';
            continue;
          }
          const status = c.status as VerifyStatus;
          verification[key] = {
            status,
            ...(status === 'wrong' && c.suggested ? { suggested: String(c.suggested).trim() } : {}),
          };
          if (status === 'wrong') {
            warnings[key] = c.suggested
              ? `Second read says this is "${String(c.suggested).trim()}" — check which is right.`
              : 'A second read disagreed with this value — check it.';
          } else if (status === 'not_found') {
            warnings[key] = warnings[key] ?? 'A second read could not find this on the document.';
          } else if (status === 'unclear') {
            warnings[key] = warnings[key] ?? 'Too unclear on the document to confirm.';
          }
        }
        verified = true;
      }
    }

    if (scheduleRes) {
      scheduleFound = !!scheduleRes.schedule_found;
      rowsSeen = Number(scheduleRes.rows_seen) || 0;
      const raw = Array.isArray(scheduleRes.circuits) ? scheduleRes.circuits : [];
      circuits = (raw as Record<string, unknown>[])
        .map((row) => {
          const out: Record<string, string> = {};
          for (const [k, v] of Object.entries(row ?? {})) {
            let val = typeof v === 'string' ? v.trim() : '';
            /* Same rule as the header: a placeholder glyph is not a value. */
            if (val && !/[\p{L}\p{N}]/u.test(val)) val = '';
            if (val) out[k] = val;
          }
          return out;
        })
        /* A row with nothing but a circuit number is not a circuit. */
        .filter((r) => Object.keys(r).length > 1);

      /*
       * 🔴 A short read is worse than no read. Twelve rows returned from a
       * twenty-row schedule looks complete — the array is well formed and
       * nothing in it says eight circuits are missing. Comparing what it
       * returned against what it says it SAW is the only way to catch that,
       * and the reviewer has to be told.
       */
      scheduleTruncated = rowsSeen > 0 && circuits.length < rowsSeen;
    }

    const confirmedCount = Object.values(verification).filter(
      (v) => v.status === 'confirmed'
    ).length;

    return json({
      verified,
      verification,
      confirmedCount,
      schedule: {
        found: scheduleFound,
        circuits,
        count: circuits.length,
        rowsSeen,
        truncated: scheduleTruncated,
      },
      success: true,
      certType,
      pageCount: urls.length,
      fieldWarnings: warnings,
      overdue,
      certTypeLabel: CERT_IMPORT_LABEL[certType],
      mimeType,
      fields: validated,
      fieldConfidence: cleanConfidence,
      fieldCount: Object.keys(clean).length,
      unreadableFields: Array.isArray(parsed.unreadable_fields)
        ? (parsed.unreadable_fields as unknown[]).map(String).filter((k) => allowed.has(k))
        : [],
      notes: typeof parsed.notes === 'string' ? parsed.notes : '',
      detected: {
        type: detected,
        confidence: detectedConfidence,
        mismatch,
        reason: mismatchReason,
      },
    });
  } catch (error) {
    console.error('[parse-certificate-import] Error:', error);
    await captureException(error, {
      functionName: 'parse-certificate-import',
      requestUrl: req.url,
      requestMethod: req.method,
      extra: { hasGeminiKey: !!GEMINI_API_KEY },
    });
    return json(
      { success: false, error: error instanceof Error ? error.message : 'Unknown error' },
      500
    );
  }
});
