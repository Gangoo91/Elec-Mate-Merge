/**
 * Parse Snag Photo — vision + RAG-grounded snag detection.
 *
 * Two-call pipeline:
 *   1. Vision pass (Gemini 3) extracts a rough title, priority, location hint
 *      and 2–5 observation keywords from the photo.
 *   2. Server fans out RAG against `bs7671_facets` (regulations) and
 *      `practical_work_intelligence_v2` (practical patterns) using those
 *      keywords.
 *   3. Synthesis pass (Gemini text-only) re-writes the snag entry with a
 *      grounded reg citation + a short remediation hint pulled from the
 *      RAG snippets. If RAG returns nothing useful the function gracefully
 *      falls back to the vision-only result (no fabricated regs — same
 *      rule Mate's chat follows).
 *
 * Output JSON shape stays stable: { title, priority, details, location_hint }.
 */

import { serve, corsHeaders } from '../_shared/deps.ts';
import { ValidationError, ExternalAPIError, handleError } from '../_shared/errors.ts';
import { createLogger, generateRequestId } from '../_shared/logger.ts';
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.39.3';
import { searchFacets, formatFacetsForPrompt } from '../_shared/bs7671-facets-rag.ts';
import { searchPracticalWorkIntelligence } from '../_shared/rag-practical-work.ts';
import { captureException } from '../_shared/sentry.ts';

interface ParseSnagRequest {
  image_base64: string;
  image_type: string;
}

interface ParseSnagResponse {
  success: boolean;
  title: string;
  priority: 'low' | 'normal' | 'high' | 'urgent';
  details: string | null;
  location_hint: string | null;
  /** Optional RAG-grounded reg citations the synthesis used. */
  citations: Array<{ ref: string; topic?: string }>;
  /** Whether the synthesis pass actually grounded on RAG or fell back to vision-only. */
  grounded: boolean;
  requestId: string;
}

const VALID_PRIORITIES = ['low', 'normal', 'high', 'urgent'] as const;
type Priority = (typeof VALID_PRIORITIES)[number];

function normalisePriority(input: unknown): Priority {
  const p = String(input ?? 'normal').toLowerCase();
  return (VALID_PRIORITIES as readonly string[]).includes(p) ? (p as Priority) : 'normal';
}

const visionSystemPrompt = `You are an experienced UK electrician looking at a photo from a job site. Extract a snag entry: title, priority, location hint, and 2–5 observation keywords that capture WHAT the defect IS so we can look it up.

## OUTPUT FIELDS (JSON ONLY)

- title: 3–10 words, plain English. Title-case-ish. e.g. "Cracked socket faceplate", "Loose neutral in CU", "Missing MCB labels".
- priority: low | normal | high | urgent
  - urgent: immediate danger (exposed live, burnt evidence, water near 230V)
  - high: clear safety risk needing same-day attention (loose connection, missing earth)
  - normal: needs fixing but not immediate
  - low: cosmetic only
- location_hint: one of: Kitchen, Bathroom, Lounge, Bedroom, Hall, Consumer unit, Outside, Loft, Garage, Office, or null.
- keywords: 2–5 short search terms describing the defect TYPE — e.g. ["cracked socket", "faceplate", "kitchen"] or ["loose neutral", "consumer unit", "main earthing terminal"]. Lower-case, no punctuation.

## RULES

- Be specific. Don't invent context not visible in the photo.
- UK English (colour, organise).
- Never claim a BS 7671 code (C1/C2/C3) — that's the electrician's call.
- Always return valid JSON. No prose outside.

## OUTPUT FORMAT
{ "title": "...", "priority": "normal", "details": null, "location_hint": null, "keywords": ["...", "..."] }`;

const synthesisSystemPrompt = `You are an experienced UK electrician refining a snag entry. You already have a draft from a quick photo look. Now you have BS 7671 regulation snippets and practical-work intelligence snippets the system found that may relate.

Your job: write a tighter snag entry that anchors on the regs/practical knowledge when relevant, and otherwise leaves the draft alone.

## RULES

- Keep title 3–10 words.
- DETAILS must be 1–2 sentences MAX. Pack the value: what's wrong + (if RAG is genuinely relevant) a reg citation OR a typical fix.
- Cite a regulation by reg_number ONLY if the BS 7671 snippet directly addresses the defect. Format inline: "Reg 553.1.7 covers protection against mechanical damage." Never invent reg numbers. If no snippet is relevant, omit the citation.
- Practical-work hint should be a short remediation note IF the snippet actually applies. Don't pad.
- Keep priority unchanged from the draft unless the regs clearly warrant a bump (e.g. an exposed live defect that vision rated normal).
- UK English. No prose outside JSON.
- If neither RAG source is useful, return the draft fields verbatim and set "grounded": false.

## OUTPUT
{
  "title": "...",
  "priority": "normal",
  "details": "1–2 sentences, may include 'Reg X.Y.Z covers ...'",
  "location_hint": "Kitchen" or null,
  "citations": [{ "ref": "Reg 553.1.7", "topic": "Mechanical damage protection" }],
  "grounded": true
}`;

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  const requestId = generateRequestId();
  const logger = createLogger(requestId, { function: 'parse-snag-photo' });

  try {
    const { image_base64, image_type }: ParseSnagRequest = await req.json();

    if (!image_base64 || typeof image_base64 !== 'string') {
      throw new ValidationError('image_base64 is required');
    }
    const allowed = ['image/jpeg', 'image/png', 'image/heic', 'image/webp'];
    if (!image_type || !allowed.includes(image_type)) {
      throw new ValidationError(`image_type must be one of: ${allowed.join(', ')}`);
    }
    const estimatedSizeMB = (image_base64.length * 0.75) / (1024 * 1024);
    if (estimatedSizeMB > 20) {
      throw new ValidationError('Image size exceeds 20MB limit');
    }

    const geminiKey = Deno.env.get('GEMINI_API_KEY');
    if (!geminiKey) {
      throw new Error('GEMINI_API_KEY environment variable not configured');
    }

    // ─── PASS 1: VISION — extract draft + keywords ───────────────────
    const visionResp = await logger.time('Gemini vision pass', async () => {
      const response = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-3.5-flash:generateContent?key=${geminiKey}`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            contents: [
              {
                parts: [
                  { text: 'Look at this site photo and extract a snag entry. Return JSON only.' },
                  { inline_data: { mime_type: image_type, data: image_base64 } },
                ],
              },
            ],
            systemInstruction: { parts: [{ text: visionSystemPrompt }] },
            generationConfig: {
              responseMimeType: 'application/json',
              maxOutputTokens: 600,
              temperature: 0.15,
            },
          }),
        }
      );
      if (!response.ok) {
        const errorText = await response.text();
        throw new ExternalAPIError('Gemini', { status: response.status, error: errorText });
      }
      return response.json();
    });

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const visionText: string = (visionResp as any)?.candidates?.[0]?.content?.parts?.[0]?.text ?? '';
    if (!visionText) {
      throw new ExternalAPIError('Gemini', { message: 'Empty vision response' });
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let draft: any;
    try {
      draft = JSON.parse(visionText);
    } catch {
      throw new ExternalAPIError('Gemini', { message: 'Vision JSON parse failed', visionText });
    }

    const draftTitle: string = String(draft.title || '').trim().slice(0, 120) || 'Site snag';
    const draftPriority: Priority = normalisePriority(draft.priority);
    const draftLocationHint: string | null =
      typeof draft.location_hint === 'string' && draft.location_hint.trim()
        ? draft.location_hint.trim().slice(0, 60)
        : null;
    const keywords: string[] = Array.isArray(draft.keywords)
      ? draft.keywords.map((k: unknown) => String(k).trim().toLowerCase()).filter(Boolean).slice(0, 6)
      : [];

    logger.info('Vision pass complete', { draftTitle, draftPriority, keywords });

    // ─── PASS 2: RAG fan-out ──────────────────────────────────────────
    const ragQuery = [draftTitle, ...keywords].filter(Boolean).join(' ').slice(0, 200);

    const supabase = createClient(
      Deno.env.get('SUPABASE_URL')!,
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!
    );

    let facetsBlock = '';
    let practicalBlock = '';
    const citations: Array<{ ref: string; topic?: string }> = [];

    try {
      const [facets, practical] = await Promise.all([
        searchFacets(supabase, { query: ragQuery, matchCount: 4 }).catch(() => []),
        searchPracticalWorkIntelligence(supabase, {
          query: ragQuery,
          matchCount: 4,
        }).catch(() => null),
      ]);

      if (facets && facets.length > 0) {
        facetsBlock = formatFacetsForPrompt(facets);
        for (const f of facets) {
          if (f.regNumber) {
            citations.push({
              ref: `Reg ${f.regNumber}`,
              topic: f.primaryTopic || undefined,
            });
          }
        }
      }
      if (practical?.results?.length) {
        practicalBlock = practical.results
          .slice(0, 4)
          .map((r, i) => {
            const parts: string[] = [];
            parts.push(`[${i + 1}] ${r.primary_topic || 'Practical guidance'}`);
            if (r.expected_results) parts.push(`Expected: ${r.expected_results}`);
            if (r.bs7671_regulations?.length) {
              parts.push(`BS 7671 refs: ${r.bs7671_regulations.join(', ')}`);
            }
            parts.push(r.content);
            return parts.join('\n');
          })
          .join('\n\n');
      }
    } catch (err) {
      logger.warn?.('RAG fan-out failed, falling back to vision-only', { err: String(err) });
    }

    const hasRag = !!facetsBlock || !!practicalBlock;

    // ─── PASS 3: SYNTHESIS (only if we have RAG snippets) ────────────
    let final: ParseSnagResponse;
    if (!hasRag) {
      logger.info('No RAG signal — returning vision draft');
      final = {
        success: true,
        title: draftTitle,
        priority: draftPriority,
        details:
          typeof draft.details === 'string' && draft.details.trim()
            ? draft.details.trim().slice(0, 600)
            : null,
        location_hint: draftLocationHint,
        citations: [],
        grounded: false,
        requestId,
      };
    } else {
      const synthesisUserPrompt = `Draft snag from photo:
title: ${draftTitle}
priority: ${draftPriority}
location_hint: ${draftLocationHint ?? 'null'}
keywords: ${keywords.join(', ')}

${facetsBlock ? `BS 7671 snippets:\n${facetsBlock}\n` : ''}${
        practicalBlock ? `Practical-work snippets:\n${practicalBlock}\n` : ''
      }
Refine and return JSON only.`;

      const synthesisResp = await logger.time('Gemini synthesis pass', async () => {
        const response = await fetch(
          `https://generativelanguage.googleapis.com/v1beta/models/gemini-3.5-flash:generateContent?key=${geminiKey}`,
          {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              contents: [{ parts: [{ text: synthesisUserPrompt }] }],
              systemInstruction: { parts: [{ text: synthesisSystemPrompt }] },
              generationConfig: {
                responseMimeType: 'application/json',
                maxOutputTokens: 800,
                temperature: 0.1,
              },
            }),
          }
        );
        if (!response.ok) {
          const errorText = await response.text();
          throw new ExternalAPIError('Gemini', { status: response.status, error: errorText });
        }
        return response.json();
      });

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const synthText: string =
        (synthesisResp as any)?.candidates?.[0]?.content?.parts?.[0]?.text ?? '';
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      let refined: any = null;
      try {
        refined = JSON.parse(synthText || '{}');
      } catch {
        refined = null;
      }

      if (!refined) {
        logger.warn?.('Synthesis JSON parse failed — falling back to vision draft');
        final = {
          success: true,
          title: draftTitle,
          priority: draftPriority,
          details:
            typeof draft.details === 'string' && draft.details.trim()
              ? draft.details.trim().slice(0, 600)
              : null,
          location_hint: draftLocationHint,
          citations,
          grounded: false,
          requestId,
        };
      } else {
        const synthCitations: Array<{ ref: string; topic?: string }> = Array.isArray(
          refined.citations
        )
          ? refined.citations
              // eslint-disable-next-line @typescript-eslint/no-explicit-any
              .map((c: any) => ({
                ref: String(c?.ref || '').trim(),
                topic:
                  typeof c?.topic === 'string' && c.topic.trim() ? c.topic.trim() : undefined,
              }))
              .filter((c: { ref: string }) => c.ref.length > 0)
              .slice(0, 5)
          : [];

        final = {
          success: true,
          title: String(refined.title || draftTitle).trim().slice(0, 120) || draftTitle,
          priority: normalisePriority(refined.priority ?? draftPriority),
          details:
            typeof refined.details === 'string' && refined.details.trim()
              ? refined.details.trim().slice(0, 600)
              : null,
          location_hint:
            typeof refined.location_hint === 'string' && refined.location_hint.trim()
              ? refined.location_hint.trim().slice(0, 60)
              : draftLocationHint,
          citations: synthCitations.length > 0 ? synthCitations : citations,
          grounded: refined.grounded !== false,
          requestId,
        };
      }
    }

    logger.info('Snag parsed', {
      title: final.title,
      priority: final.priority,
      grounded: final.grounded,
      citationCount: final.citations.length,
    });

    return new Response(JSON.stringify(final), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  } catch (error) {
    await captureException(error, { functionName: 'parse-snag-photo', requestUrl: req.url, requestMethod: req.method });
    return handleError(error, requestId, logger);
  }
});
