import 'jsr:@supabase/functions-js/edge-runtime.d.ts';
import { captureException } from '../_shared/sentry.ts';

/**
 * Per-photo analysis for the AI pre-purchase survey (ELE-1634).
 *
 * Alex, who asked for it: *"photo of a rewireable fuseboard then AI can see the
 * photo, offer advice on it and what it actually is etc. Picture of some old
 * bakelite screw JBs everywhere. Wiring colours and age etc."*
 *
 * Follows the pattern proven by `verify-document` and `parse-certificate-import`:
 * fetch → chunked base64 → Gemini `inlineData` → strict `responseSchema`.
 *
 * ── 🔴 EVERY WORD OF THIS IS A DRAFT ──────────────────────────────────────
 * The output is a suggestion the electrician reads, edits and accepts. It is
 * never published unreviewed, and the client-facing report says so. That is not
 * a disclaimer bolted on afterwards — it is why the design puts an edit box
 * against every single photo.
 *
 * ── 🔴 NO REGULATION NUMBERS ──────────────────────────────────────────────
 * The prompt forbids citing BS 7671 regulation numbers, and the schema has
 * nowhere to put one. A model asked for a reg number will produce a
 * plausible-looking one, and a fabricated reference on a document handed to a
 * house-buyer is far worse than no reference at all. Anything needing a
 * citation gets checked against `bs7671_facets` by a human, not guessed here.
 *
 * ── 🔴 THIS IS NOT AN EICR ────────────────────────────────────────────────
 * Nothing here may imply a BS 7671 inspection has been carried out. No test
 * results, no C1/C2/C3 codes, no satisfactory/unsatisfactory verdict — those
 * belong to an EICR and importing their vocabulary is how an advisory survey
 * gets mistaken for one.
 */

const GEMINI_API_KEY = Deno.env.get('GEMINI_API_KEY');
const MODEL = 'gemini-3.5-flash';
/* A phone photo is 2-5MB; base64 inflates ~33%. Well inside Gemini's inline cap. */
const MAX_FILE_BYTES = 12 * 1024 * 1024;

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

/**
 * Sniff the CONTENT, never the file name — an iPhone photo is HEIC and a signed
 * storage URL often carries no extension at all. Same trap as ELE-1368.
 */
function detectMime(buffer: ArrayBuffer, url: string): string {
  const b = new Uint8Array(buffer.slice(0, 16));
  const at = (i: number, ...sig: number[]) => sig.every((v, n) => b[i + n] === v);
  if (at(0, 0x89, 0x50, 0x4e, 0x47)) return 'image/png';
  if (at(0, 0xff, 0xd8, 0xff)) return 'image/jpeg';
  if (at(4, 0x66, 0x74, 0x79, 0x70)) {
    const brand = String.fromCharCode(b[8], b[9], b[10], b[11]);
    if (['heic', 'heix', 'hevc', 'heim', 'heis', 'mif1', 'msf1'].includes(brand)) return 'image/heic';
    if (brand === 'avif') return 'image/avif';
  }
  if (at(0, 0x52, 0x49, 0x46, 0x46) && at(8, 0x57, 0x45, 0x42, 0x50)) return 'image/webp';
  const lower = url.toLowerCase();
  if (lower.includes('.png')) return 'image/png';
  if (lower.includes('.heic') || lower.includes('.heif')) return 'image/heic';
  if (lower.includes('.webp')) return 'image/webp';
  return 'image/jpeg';
}

/**
 * `severity` is deliberately NOT the EICR C1/C2/C3 vocabulary.
 *
 * Those codes carry a specific meaning that only a BS 7671 inspection can
 * assign, and borrowing them on an advisory survey is exactly how a house-buyer
 * ends up believing they hold a condition report. These words describe what a
 * BUYER needs to know: is this dangerous, does it need money, is it just old.
 */
const SEVERITIES = ['urgent', 'attention', 'ageing', 'acceptable', 'unclear'] as const;

function responseSchema() {
  return {
    type: 'object',
    properties: {
      is_electrical: {
        type: 'boolean',
        description: 'False if the photo does not show electrical installation work at all.',
      },
      identified_as: {
        type: 'string',
        description:
          'What the item is, in the words an electrician would use. e.g. "Rewireable fuse board (BS 3036)", "Surface-mounted bakelite junction box", "Rubber-sheathed cable".',
      },
      era: {
        type: 'string',
        description:
          'Approximate age or period, ONLY where the photo genuinely shows it. Empty string if not evident.',
      },
      condition: {
        type: 'string',
        description: 'What can be seen of its condition. One or two sentences, factual.',
      },
      advice: {
        type: 'string',
        description:
          'Plain-English advice for a house-buyer: what it means for them and what it is likely to lead to. Two or three sentences, no jargon, no regulation numbers.',
      },
      severity: { type: 'string', enum: [...SEVERITIES] },
      confidence: { type: 'number', description: '0-1, how certain the identification is.' },
      needs_closer_look: {
        type: 'string',
        description:
          'What the electrician should check on site that a photo cannot settle. Empty string if nothing.',
      },
    },
    required: ['is_electrical', 'identified_as', 'condition', 'advice', 'severity', 'confidence'],
  };
}

const PROMPT = `You are helping a qualified UK electrician write a pre-purchase electrical survey for someone buying a house. You are looking at one photograph taken during that visit.

Say what the item is, what condition it appears to be in, and what it means for the buyer.

Things that commonly matter in UK housing stock, when you can actually see them:
- Rewireable (BS 3036) fuse boards, cartridge-fuse boards, boards with no RCD protection
- Plastic consumer unit enclosures in domestic properties
- Rubber, lead-sheathed, VIR or cloth-covered cable — the sort that indicates pre-1970s wiring
- Old cable colours (red and black) indicating pre-2004 work
- Surface-mounted bakelite or screw-terminal junction boxes
- Round-pin sockets, and sockets without earth
- Missing or undersized main protective bonding
- Signs of overheating, scorching, corrosion, water ingress or DIY work

🔴 Rules, all of which matter more than being comprehensive:
- Describe ONLY what is visible in this photograph. Do not infer the state of anything outside the frame, and do not assume the rest of the installation matches.
- **Never cite a BS 7671 regulation number.** Explain why something matters in plain English instead. A wrong reference on a document handed to a house-buyer is worse than none.
- This is an ADVISORY VISUAL SURVEY, not an EICR. Do not assign C1/C2/C3 codes, do not declare anything satisfactory or unsatisfactory, and do not state or imply that testing has been done.
- Where the photo genuinely cannot settle something, say so in needs_closer_look rather than guessing. "I cannot tell from this photo" is a useful answer.
- Write the advice for a non-electrician. Short sentences. No jargon that a buyer would have to look up.
- Age: only estimate where the photo actually shows evidence of it. Leave era empty otherwise.
- If the photo is not of electrical work at all, set is_electrical false and leave the rest brief.

severity means, for the buyer:
- "urgent" — appears immediately dangerous, needs attention before or on moving in
- "attention" — should be put right, likely to cost money
- "ageing" — working but dated, plan for replacement
- "acceptable" — nothing of concern visible
- "unclear" — cannot be judged from this photo`;

Deno.serve(async (req: Request) => {
  if (req.method === 'OPTIONS') return new Response(null, { headers: corsHeaders });

  try {
    if (!GEMINI_API_KEY) throw new Error('GEMINI_API_KEY is not set');

    const body = await req.json().catch(() => ({}));
    const fileUrl: string | undefined = body?.fileUrl;
    /** Optional steer from the electrician, e.g. "under the stairs". */
    const hint: string = typeof body?.hint === 'string' ? body.hint.slice(0, 200) : '';
    if (!fileUrl) return json({ success: false, error: 'fileUrl is required' }, 400);

    const res = await fetch(fileUrl);
    if (!res.ok) return json({ success: false, error: `Could not fetch the photo (${res.status})` }, 400);
    const buffer = await res.arrayBuffer();
    if (!buffer.byteLength) return json({ success: false, error: 'The photo is empty' }, 400);
    if (buffer.byteLength > MAX_FILE_BYTES) {
      return json({ success: false, error: 'That photo is too large to read' }, 400);
    }
    const mimeType = detectMime(buffer, fileUrl);

    const abort = new AbortController();
    const timer = setTimeout(() => abort.abort(), 50_000);
    let gem: Response;
    try {
      gem = await fetch(
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
                  { text: hint ? `${PROMPT}\n\nThe electrician noted: "${hint}"` : PROMPT },
                  { inlineData: { mimeType, data: toBase64(buffer) } },
                ],
              },
            ],
            generationConfig: {
              /* Descriptive, not creative — and it must not drift between photos. */
              temperature: 0,
              maxOutputTokens: 2_000,
              responseMimeType: 'application/json',
              responseSchema: responseSchema(),
            },
          }),
        }
      );
    } catch (e) {
      if ((e as Error).name === 'AbortError') {
        return json({ success: false, error: 'Reading that photo timed out' }, 504);
      }
      throw e;
    } finally {
      clearTimeout(timer);
    }

    if (!gem.ok) {
      const detail = (await gem.text()).slice(0, 300);
      console.error('[analyse-survey-photo] Gemini error:', gem.status, detail);
      return json({ success: false, error: `Photo reader failed (${gem.status})` }, 502);
    }

    const raw = (await gem.json())?.candidates?.[0]?.content?.parts?.[0]?.text;
    if (!raw) return json({ success: false, error: 'The reader returned nothing' }, 502);

    let parsed: Record<string, unknown>;
    try {
      parsed = JSON.parse(raw);
    } catch {
      return json({ success: false, error: 'The reader returned a malformed result' }, 502);
    }

    const s = (v: unknown) => (typeof v === 'string' ? v.trim() : '');
    const severity = SEVERITIES.includes(s(parsed.severity) as never)
      ? s(parsed.severity)
      : 'unclear';
    const confidence = Number(parsed.confidence);

    return json({
      success: true,
      analysis: {
        isElectrical: parsed.is_electrical !== false,
        identifiedAs: s(parsed.identified_as),
        era: s(parsed.era),
        condition: s(parsed.condition),
        advice: s(parsed.advice),
        severity,
        confidence: Number.isFinite(confidence) ? Math.max(0, Math.min(1, confidence)) : 0,
        needsCloserLook: s(parsed.needs_closer_look),
      },
    });
  } catch (error) {
    console.error('[analyse-survey-photo] Error:', error);
    await captureException(error, {
      functionName: 'analyse-survey-photo',
      requestUrl: req.url,
      requestMethod: req.method,
    });
    return json(
      { success: false, error: error instanceof Error ? error.message : 'Unknown error' },
      500
    );
  }
});
