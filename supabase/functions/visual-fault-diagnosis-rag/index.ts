/**
 * visual-fault-diagnosis-rag — classify a described electrical fault to an
 * EICR code, grounded in BS 7671:2018+A4:2026, GN3 and the On-Site Guide.
 *
 * ── What this rewrite fixes ────────────────────────────────────────────────
 *
 * 1. IT WAS READING THE WRONG BOOK.
 *    Retrieval went through `search_bs7671()`, which selects from
 *    `bs7671_embeddings`: 2,557 rows, every one stamped `A3:2024`, with zero
 *    mention of Chapter 57 (new in A4). Meanwhile `bs7671_facets` holds 46,745
 *    A4:2026 rows — bs7671 33,559, gn3 8,111, osg 5,075 — and roughly
 *    seventeen other functions already retrieve from it through
 *    `_shared/bs7671-facets-rag.ts`. The system prompt also told the model it
 *    was "expert in BS 7671:2018+A3:2024", pinning its own priors to the
 *    superseded amendment.
 *
 * 2. IT CLAIMED GN3 GROUNDING IT NEVER HAD.
 *    It called `search_inspection_testing()` — an RPC that does not exist in
 *    the database (`pg_proc` returns nothing for that name). The call sat
 *    inside `safeAll`, so it failed silently on every request and the prompt
 *    always received "INSPECTION & TESTING GUIDANCE (GN3): None found". The
 *    response nonetheless returned `verification_status: 'Verified against
 *    BS 7671 + GN3'`, which the page printed to the electrician. GN3 is now
 *    retrieved for real, and the status line reports only what came back.
 *
 * 3. IT ASKED THE MODEL TO WRITE THE REGULATIONS.
 *    The old output schema contained `"content": "Full regulation text..."`,
 *    inviting the model to compose regulation prose — reliably, when
 *    retrieval was thin or empty. Citations are now made by INDEX into the
 *    numbered source list: the model can only point at a retrieved facet, and
 *    this function fills in the number and the text from the row itself. An
 *    index outside the retrieved set is dropped. Inventing a regulation is no
 *    longer expressible, rather than merely discouraged.
 *
 * 4. CONFIDENCE WAS SELF-REPORTED.
 *    The model emitted `"confidence": 0.95` and the UI showed it as fact. It
 *    is now bounded by whether the answer is actually grounded.
 *
 * Also gone: a 36-line `EICR_DECISION_TREE` constant that nothing referenced,
 * and `response_format: json_object` in favour of tool calling per
 * `.claude/rules/edge-functions.md`.
 */

import 'https://deno.land/x/xhr@0.1.0/mod.ts';
import { serve, createClient, corsHeaders } from '../_shared/deps.ts';
import { ValidationError, handleError } from '../_shared/errors.ts';
import { createLogger, generateRequestId } from '../_shared/logger.ts';
import { safeAll } from '../_shared/safe-parallel.ts';
import { captureException } from '../_shared/sentry.ts';
import { callOpenAI } from '../_shared/ai-providers.ts';
import { searchFacets, type BS7671Facet } from '../_shared/bs7671-facets-rag.ts';

/** How many facets to pull from each corpus. */
const REG_MATCHES = 6;
const GUIDANCE_MATCHES = 4;

/**
 * A retrieved source, numbered for citation.
 *
 * The number is the ONLY thing the model is allowed to cite by. Everything
 * downstream — reg number, section, text — is read back off this record, not
 * from anything the model wrote.
 */
interface Source {
  id: number;
  documentType: string;
  /** Only ever a number the source's own text backs up. See resolveRegNumber. */
  regNumber: string | null;
  corroborated: boolean;
  section: string | null;
  content: string;
  score: number;
}

/** `526.1`, `712.512.2.1` — a BS 7671 clause as written in prose. */
const REG_PATTERN = /\b\d{3}(?:\.\d+){1,3}\b/g;

/**
 * The regulation number we are willing to PRINT next to this text.
 *
 * Not simply `facet.regNumber`. A live example: the facet whose topic is
 * "No signs of overheating to conductors/terminations (526.1)" — whose body
 * says "this is referenced to Regulation 526.1" — came back from the RPC
 * carrying `559.41`, a section about luminaires. Its `regulation_id` does not
 * resolve in `regulation_index` at all, so the number attached to the row is
 * not describing the row.
 *
 * An electrician who writes 559.41 on an EICR because this tool said so has
 * been actively misled, which is worse than being told nothing. So the number
 * has to be corroborated by the source's own words:
 *
 *   • row number appears in its own text  → trust it
 *   • it doesn't, but the text names exactly one clause → use that
 *   • otherwise → cite the source with no number at all
 *
 * The corpus linkage is shared with ~17 other functions and is not this
 * function's to repair; refusing to print an uncorroborated number is.
 */
const resolveRegNumber = (
  rowNumber: string | null,
  text: string
): { number: string | null; corroborated: boolean } => {
  const inText = Array.from(new Set(text.match(REG_PATTERN) ?? []));
  if (rowNumber && inText.includes(rowNumber)) return { number: rowNumber, corroborated: true };
  if (inText.length === 1) return { number: inText[0], corroborated: true };
  return { number: null, corroborated: false };
};

const toSources = (facets: BS7671Facet[], startAt: number): Source[] =>
  facets.map((f, i) => {
    const section = f.regTitle ?? f.primaryTopic ?? f.section;
    const content = (f.contextPrefix ? `${f.contextPrefix} ` : '') + f.content;

    /*
     * Corroborate against the source's PROSE only — `primaryTopic` and the
     * body — never `contextPrefix` or `regTitle`.
     *
     * The prefix is assembled from the row's own metadata and reads
     * "[BS 7671] · … · Reg 559.41 · …". Checking the number against a string
     * that has that number stamped into it corroborates every number,
     * including the wrong ones: the first cut of this check passed 559.41 for
     * a note whose actual subject is 526.1, which is precisely the case it
     * was written to catch.
     */
    const prose = `${f.primaryTopic ?? ''} ${f.content}`;
    const { number, corroborated } = resolveRegNumber(f.regNumber, prose);

    return {
      id: startAt + i,
      documentType: f.documentType,
      regNumber: number,
      corroborated,
      section,
      content,
      score: f.score,
    };
  });

const renderSources = (sources: Source[]): string => {
  if (sources.length === 0) return '(nothing retrieved)';
  return sources
    .map((s) => {
      const label = s.regNumber
        ? `${s.documentType.toUpperCase()} ${s.regNumber}`
        : s.documentType.toUpperCase();
      const title = s.section ? ` — ${s.section}` : '';
      // Trimmed: the whole set has to sit in one prompt alongside the fault.
      return `[${s.id}] ${label}${title}\n${s.content.slice(0, 900)}`;
    })
    .join('\n\n');
};

const CLASSIFY_TOOL = {
  type: 'function',
  function: {
    name: 'classify_fault',
    description:
      'Record the EICR classification for the described fault, citing only the numbered sources provided.',
    parameters: {
      type: 'object',
      properties: {
        fault_code: {
          type: 'string',
          enum: ['C1', 'C2', 'C3', 'FI', 'PASS'],
          description:
            'C1 danger present; C2 potentially dangerous; C3 improvement recommended; FI further investigation required; PASS nothing found.',
        },
        citation_ids: {
          type: 'array',
          items: { type: 'integer' },
          description:
            'The [n] ids of the sources that justify this code. Use ONLY ids from the SOURCES list. If none of them support a classification, return an empty array and use FI.',
        },
        reasoning: {
          type: 'string',
          description:
            'Why this code, in plain English, referring to the evidence. Two or three sentences.',
        },
        immediate_action: {
          type: 'string',
          description:
            'What to do right now, before anything else — isolation, making safe, warning notice. Empty string if nothing is immediately required.',
        },
        fix_steps: {
          type: 'array',
          items: { type: 'string' },
          description: 'The remedial work, in the order it should be carried out.',
        },
        further_checks: {
          type: 'array',
          items: { type: 'string' },
          description:
            'Tests or measurements that would confirm or change this classification — e.g. a Zs reading, an IR test.',
        },
        gn3_guidance: {
          type: 'string',
          description:
            'What GN3 or the On-Site Guide say about inspecting or testing this, if any GN3/OSG source was provided. Empty string otherwise.',
        },
        user_context_addressed: {
          type: 'string',
          description:
            'For PASS only: answer the specific worry in the description. Empty string otherwise.',
        },
        positive_observations: {
          type: 'array',
          items: { type: 'string' },
          description: 'For PASS only: what is compliant. Empty otherwise.',
        },
        confidence: {
          type: 'number',
          description: '0 to 1. How certain the classification is on the evidence given.',
        },
      },
      required: ['fault_code', 'citation_ids', 'reasoning'],
      additionalProperties: false,
    },
  },
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  const requestId = generateRequestId();
  const logger = createLogger(requestId, { function: 'visual-fault-diagnosis-rag' });

  try {
    const {
      fault_description,
      location_context,
      visible_indicators,
      // How long it has been happening. Collected by the page and, until now,
      // dropped on the floor — "burning smell, just noticed" and "burning
      // smell, ongoing for months" are not the same urgency.
      timeframe,
    } = await req.json();

    if (!fault_description) {
      throw new ValidationError('fault_description is required');
    }

    const openaiApiKey = Deno.env.get('OPENAI_API_KEY');
    if (!openaiApiKey) throw new Error('OPENAI_API_KEY not configured');

    const supabase = createClient(
      Deno.env.get('SUPABASE_URL')!,
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!
    );

    const indicators: string[] = Array.isArray(visible_indicators) ? visible_indicators : [];
    const query = [
      fault_description,
      indicators.join(', '),
      location_context ? `Location: ${location_context}` : '',
      timeframe ? `Started: ${timeframe}` : '',
    ]
      .filter(Boolean)
      .join('. ');

    // Two retrievals, not one. A single blended search lets 33.5k rows of
    // BS 7671 crowd GN3 out of the top-K entirely, which is how a tool that
    // advertised GN3 guidance could go to production never having read any.
    const { successes, failures } = await logger.time(
      'Facet retrieval (A4:2026)',
      async () =>
        await safeAll([
          {
            name: 'regulations',
            execute: () =>
              searchFacets(supabase, {
                query,
                matchCount: REG_MATCHES,
                documentTypes: ['bs7671'],
              }),
          },
          {
            name: 'guidance',
            execute: () =>
              searchFacets(supabase, {
                query: `${query}. Inspection, testing and classification guidance.`,
                matchCount: GUIDANCE_MATCHES,
                documentTypes: ['gn3', 'osg'],
              }),
          },
        ])
    );

    if (failures.length > 0) logger.warn('Some facet searches failed', { failures });

    const regFacets: BS7671Facet[] =
      successes.find((s) => s.name === 'regulations')?.result ?? [];
    const guidanceFacets: BS7671Facet[] =
      successes.find((s) => s.name === 'guidance')?.result ?? [];

    const sources: Source[] = [
      ...toSources(regFacets, 1),
      ...toSources(guidanceFacets, regFacets.length + 1),
    ];

    logger.info('Retrieval complete', {
      regulations: regFacets.length,
      guidance: guidanceFacets.length,
    });

    const systemPrompt = `You are an experienced UK electrical inspector classifying a fault for an EICR. You work to BS 7671:2018+A4:2026, Guidance Note 3 and the On-Site Guide.

CLASSIFY TO ONE CODE:
- C1  Danger present. Risk of injury or fire now. Requires immediate action.
- C2  Potentially dangerous. Urgent remedial action required.
- C3  Improvement recommended. Not dangerous, but below current standard.
- FI  Further investigation required — the description alone cannot settle it.
- PASS No fault. Nothing requiring remedial work.

RULES:
1. Cite ONLY by the [n] ids in SOURCES. Never state a regulation number that
   does not appear in SOURCES, and never write out regulation text yourself.
2. If SOURCES does not support a classification, return FI with an empty
   citation list. An honest "needs investigation" beats a confident guess.
3. Weigh how long it has been happening. Something noticed minutes ago that
   involves heat, burning or arcing is more urgent than a long-standing
   cosmetic defect.
4. A description is not an inspection. Where a reading would change the code,
   say so in further_checks rather than assuming the worst or the best.
5. UK English throughout.`;

    const userPrompt = `FAULT: ${fault_description}
LOCATION: ${location_context || 'not stated'}
VISIBLE INDICATORS: ${indicators.length ? indicators.join(', ') : 'none listed'}
HOW LONG: ${timeframe || 'not stated'}

SOURCES (cite by the bracketed number only):
${renderSources(sources)}`;

    const ai = await logger.time('Fault classification', () =>
      callOpenAI(
        {
          messages: [
            { role: 'system', content: systemPrompt },
            { role: 'user', content: userPrompt },
          ],
          tools: [CLASSIFY_TOOL],
          tool_choice: { type: 'function', function: { name: 'classify_fault' } },
          max_tokens: 2000,
        },
        openaiApiKey
      )
    );

    const call = ai.toolCalls?.[0];
    if (!call) throw new Error('Model did not return a classification');
    const out = JSON.parse(call.function.arguments);

    // ── Ground the citations ─────────────────────────────────────────────
    // Only ids that exist in the retrieved set survive, and the text comes
    // from the row rather than from the model.
    const byId = new Map(sources.map((s) => [s.id, s]));
    const requested: number[] = Array.isArray(out.citation_ids) ? out.citation_ids : [];
    const cited = requested.map((id) => byId.get(id)).filter((s): s is Source => Boolean(s));
    const dropped = requested.length - cited.length;
    if (dropped > 0) {
      logger.warn('Dropped ungrounded citations', { requested, kept: cited.map((c) => c.id) });
    }

    // Deduped: the same OSG clause can surface as two different facets, and
    // the first run of this rewrite printed "osg 7.8" twice in one answer.
    const seen = new Set<string>();
    const regulationReferences = cited
      .filter((s) => {
        const key = `${s.documentType}:${s.regNumber ?? s.section ?? s.id}`;
        if (seen.has(key)) return false;
        seen.add(key);
        return true;
      })
      .map((s) => ({
        // Null where the source's own text didn't back a number up. The page
        // renders these as supporting guidance rather than a clause to quote.
        number: s.regNumber,
        section: s.section ?? '',
        content: s.content,
        source: s.documentType,
        similarity: Number(s.score?.toFixed?.(3) ?? 0),
      }));

    const faultCode: string = out.fault_code ?? 'FI';
    // "Grounded" means a citation carries a regulation number we can stand
    // behind — not merely that the model pointed at something.
    const grounded = regulationReferences.some((r) => r.number);
    const usedGuidance = cited.some((s) => s.documentType !== 'bs7671');

    // ── Confidence ───────────────────────────────────────────────────────
    // Bounded by grounding rather than taken on trust. An ungrounded
    // classification cannot report better than 0.45, which is what the UI
    // needs in order to be worth showing at all.
    const claimed = typeof out.confidence === 'number' ? out.confidence : 0.6;
    const confidence = Math.max(
      0,
      Math.min(grounded ? Math.min(claimed, 0.95) : Math.min(claimed, 0.45), 1)
    );

    // The fix path the page renders. Steps in order, with anything that has
    // to happen first called out ahead of them.
    const fixSteps: string[] = Array.isArray(out.fix_steps) ? out.fix_steps : [];
    const fixGuidance = [
      out.immediate_action ? `Immediately: ${out.immediate_action}` : '',
      ...fixSteps.map((step, i) => `${i + 1}. ${step}`),
      out.gn3_guidance ? `GN3: ${out.gn3_guidance}` : '',
    ]
      .filter(Boolean)
      .join('\n');

    // Says only what actually happened. The old value was a constant.
    const numbered = regulationReferences.filter((r) => r.number).length;
    const verification = grounded
      ? `Grounded in BS 7671:2018+A4:2026${usedGuidance ? ' and GN3/OSG' : ''} — ${numbered} regulation${numbered === 1 ? '' : 's'} cited`
      : 'No regulation could be cited with confidence — treat as a prompt to investigate, not a classification';

    return new Response(
      JSON.stringify({
        fault_code: faultCode,
        regulation_references: regulationReferences,
        gn3_guidance: fixGuidance || out.gn3_guidance || '',
        immediate_action: out.immediate_action || '',
        fix_steps: fixSteps,
        further_checks: Array.isArray(out.further_checks) ? out.further_checks : [],
        confidence,
        reasoning: out.reasoning || '',
        user_context_addressed: out.user_context_addressed || null,
        positive_observations: Array.isArray(out.positive_observations)
          ? out.positive_observations
          : [],
        verification_status: verification,
        grounded,
        rag_sources: {
          regulations_count: regFacets.length,
          guidance_count: guidanceFacets.length,
          cited_count: regulationReferences.length,
          dropped_citations: dropped,
          corpus: 'bs7671_facets (A4:2026)',
        },
        requestId,
      }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    logger.error('Visual fault diagnosis RAG failed', { error });
    await captureException(error, {
      functionName: 'visual-fault-diagnosis-rag',
      requestUrl: req.url,
      requestMethod: req.method,
    });

    if (error instanceof ValidationError) return handleError(error);

    // Still a 200 with FI: the page renders a diagnosis object, and a
    // "further investigation" result is the honest outcome of a failure here.
    return new Response(
      JSON.stringify({
        error: error instanceof Error ? error.message : 'Fault classification failed',
        fault_code: 'FI',
        confidence: 0.3,
        regulation_references: [],
        grounded: false,
        verification_status: 'Classification failed — no grounding available',
        requestId,
      }),
      { status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});
