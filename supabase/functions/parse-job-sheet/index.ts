/**
 * parse-job-sheet — extract a job pack from an uploaded job sheet / spec.
 *
 * Takes a photographed or PDF job description sheet and returns the structured
 * fields the New Job Pack wizard needs: title, client, location, scope, hazards,
 * required certifications, estimated value, start date. Hazards and certs are
 * grounded to the wizard's own vocabularies so they map straight onto the chips.
 *
 * Single vision/document pass via OpenAI (ChatGPT, gpt-5.4-mini) — images go
 * as vision, PDFs as a file input. No file is persisted — the base64 is sent to
 * the model and dropped. The user reviews and edits everything in the wizard
 * before the pack is saved.
 *
 * Output: { success, extracted: {...}, requestId }.
 */
import { serve, corsHeaders } from '../_shared/deps.ts';
import { ValidationError, ExternalAPIError, handleError } from '../_shared/errors.ts';
import { createLogger, generateRequestId } from '../_shared/logger.ts';
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.39.3';
import { callOpenAI } from '../_shared/ai-providers.ts';
import { captureException } from '../_shared/sentry.ts';

interface ParseJobSheetRequest {
  file_base64: string;
  file_type: string;
}

// Mirror of the wizard's own vocabularies so extracted values map to the chips.
const HAZARD_VOCAB = [
  'Working at height',
  'Live testing',
  'Asbestos risk',
  'Confined spaces',
  'Heavy lifting',
  'Traffic management',
  'Underground services',
  'Occupied building',
];
const CERT_VOCAB = [
  '18th Edition',
  'ECS Card',
  'IPAF',
  'PASMA',
  'First Aid at Work',
  'Asbestos Awareness',
  'Confined Spaces',
  'Manual Handling',
  'Traffic Management',
  'NRSWA',
  'CSCS Card',
  'JIB Gold Card',
];

const systemPrompt = `You are an experienced UK electrical contractor's estimator reading a job description sheet, scope of works, or specification a client has sent in. Extract the details needed to open a job pack.

## OUTPUT FIELDS (JSON ONLY)

- title: a short job title, 3–8 words, plain English (e.g. "Consumer unit upgrade — 3-bed semi", "Office lighting refurbishment"). Derive it if not stated.
- client: the client / customer / main contractor name if present, else null.
- location: the site address or area if present (town/postcode is fine), else null.
- scope: a clean 1–3 sentence summary of the work to be done, in UK English. Neutral, factual. Do NOT invent work that isn't described.
- hazards: an array picked ONLY from this list where the sheet implies them — ${HAZARD_VOCAB.join(', ')}. Empty array if none are clearly implied. Do not invent.
- requiredCertifications: an array picked ONLY from this list where clearly relevant to the work/hazards — ${CERT_VOCAB.join(', ')}. Empty array if unclear.
- estimatedValue: a number in GBP if a price/budget/value is stated (digits only, no symbols), else null.
- startDate: an ISO date (YYYY-MM-DD) if a start date is stated, else null.

## RULES

- UK English (colour, organise, metre).
- Extract only what the document actually says. Never fabricate a client, value, or date.
- hazards and requiredCertifications MUST be exact strings from the lists above (or empty).
- Always return valid JSON, no prose outside it.

## OUTPUT FORMAT
{ "title": "...", "client": null, "location": null, "scope": "...", "hazards": [], "requiredCertifications": [], "estimatedValue": null, "startDate": null }`;

serve(async (req: Request) => {
  if (req.method === 'OPTIONS') return new Response(null, { headers: corsHeaders });

  const requestId = generateRequestId();
  const logger = createLogger(requestId, { function: 'parse-job-sheet' });

  try {
    // Auth — employer feature, require a valid session
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const anonKey = Deno.env.get('SUPABASE_ANON_KEY')!;
    const authHeader = req.headers.get('Authorization') ?? '';
    const caller = createClient(supabaseUrl, anonKey, {
      global: { headers: { Authorization: authHeader } },
    });
    const {
      data: { user },
      error: authError,
    } = await caller.auth.getUser();
    if (authError || !user) {
      return new Response(JSON.stringify({ error: 'Not authenticated' }), {
        status: 401,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    const { file_base64, file_type }: ParseJobSheetRequest = await req.json();
    if (!file_base64 || typeof file_base64 !== 'string') {
      throw new ValidationError('file_base64 is required');
    }
    const estimatedSizeMB = (file_base64.length * 0.75) / (1024 * 1024);
    if (estimatedSizeMB > 20) {
      throw new ValidationError('File size exceeds 20MB limit');
    }
    const mimeType = file_type || 'application/pdf';

    const openAiKey = Deno.env.get('OPENAI_API_KEY');
    if (!openAiKey) {
      throw new Error('OPENAI_API_KEY environment variable not configured');
    }

    // OpenAI (ChatGPT) vision for images; the file input type for PDFs.
    const dataUrl = `data:${mimeType};base64,${file_base64}`;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const filePart: any = mimeType.startsWith('image/')
      ? { type: 'image_url', image_url: { url: dataUrl, detail: 'high' } }
      : { type: 'file', file: { filename: 'job-sheet.pdf', file_data: dataUrl } };

    // Vision/file content is a multimodal array; the helper's message type is text-only.
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const messages: any = [
      { role: 'system', content: systemPrompt },
      {
        role: 'user',
        content: [
          { type: 'text', text: 'Read this job sheet and extract the job pack fields as JSON.' },
          filePart,
        ],
      },
    ];
    const { content: text } = await logger.time('OpenAI job-sheet extraction', () =>
      callOpenAI(
        { messages, model: 'gpt-5.4-mini-2026-03-17', max_tokens: 900, response_format: { type: 'json_object' } },
        openAiKey
      )
    );

    if (!text) throw new ExternalAPIError('OpenAI', { message: 'Empty extraction response' });

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let raw: any;
    try {
      raw = JSON.parse(text);
    } catch {
      throw new ExternalAPIError('OpenAI', { message: 'Extraction JSON parse failed', text });
    }

    // Normalise + constrain to the known vocabularies so the chips map cleanly
    const arr = (v: unknown, vocab: string[]) =>
      Array.isArray(v) ? v.map(String).filter((x) => vocab.includes(x)) : [];
    const str = (v: unknown, max: number) => {
      const s = String(v ?? '').trim();
      return s ? s.slice(0, max) : null;
    };
    const num = (v: unknown) => {
      const n = Number(String(v ?? '').replace(/[^0-9.]/g, ''));
      return Number.isFinite(n) && n > 0 ? n : null;
    };

    const extracted = {
      title: str(raw.title, 120) || '',
      client: str(raw.client, 120),
      location: str(raw.location, 160),
      scope: str(raw.scope, 1200) || '',
      hazards: arr(raw.hazards, HAZARD_VOCAB),
      requiredCertifications: arr(raw.requiredCertifications, CERT_VOCAB),
      estimatedValue: num(raw.estimatedValue),
      startDate: /^\d{4}-\d{2}-\d{2}$/.test(String(raw.startDate ?? ''))
        ? String(raw.startDate)
        : null,
    };

    logger.info('Job sheet extracted', {
      hasTitle: !!extracted.title,
      hazardCount: extracted.hazards.length,
    });

    return new Response(JSON.stringify({ success: true, extracted, requestId }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  } catch (error) {
    captureException(error, { functionName: 'parse-job-sheet', requestUrl: req.url });
    return handleError(error);
  }
});
