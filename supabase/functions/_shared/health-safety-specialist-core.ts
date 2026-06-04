/**
 * Health & Safety Specialist core — two-pass parallel pipeline.
 *
 * Mirrors `installation-specialist-core.ts` and `maintenance-specialist-core.ts`
 * but the unit of work is a HAZARD instead of a method-step. Each
 * hazard gets the full editorial detail: likelihood × severity score,
 * control hierarchy (eliminate / substitute / engineer / admin / PPE),
 * BS 7671 + HSE / HSG cites, evidence required, sign-off criteria.
 *
 *   1. Read job + parse attachments (PDF text + image signed URLs).
 *   2. Optional vision pass on photos for hazard ID.
 *   3. Parallel RAG (3 sources):
 *        - safety_facets        (search_safety_facets_v2)  — HSE / CDM / regs
 *        - bs7671_facets        (search_bs7671_v3)         — electrical regs
 *        - practical_work_v2    (search_practical_work_v2) — procedural safety
 *      Plus special-keyword section seeds.
 *   4a. Pass 1 — outline only: 12-22 hazard skeletons + executiveSummary,
 *       preparation, emergencyProcedures, summary.
 *   4b. Pass 2 — per-hazard deep fill, parallel concurrency 6.
 *   4c. Validation — every BS 7671 cite checked against bs7671_facets;
 *       safety document codes checked against safety_facets.
 *   5. Finalise.
 *
 * Streaming: every stage writes to `health_safety_partials`.
 */

/* eslint-disable @typescript-eslint/no-explicit-any */

import { searchFacets, formatFacetsForPrompt, type BS7671Facet } from './bs7671-facets-rag.ts';
import {
  searchPracticalWorkV2,
  formatPracticalWorkForPrompt,
  type PracticalWorkFacet,
} from './rag-practical-work.ts';
import {
  searchSafetyFacets,
  formatSafetyFacetsForPrompt,
  type SafetyFacet,
} from './safety-facets-rag.ts';
import { ingestAttachments, type AttachmentInput } from './attachment-ingest.ts';
import { readFloorplans, formatReadingForExtraction } from './vision-floorplan.ts';

const MODEL = 'gpt-5.4-mini-2026-03-17';

interface JobRow {
  id: string;
  user_id: string;
  query: string;
  work_type: string | null;
  project_info: any;
  attachments: AttachmentInput[] | null;
  refine_of: string | null;
}

export async function runHealthSafetyMethod(supabase: any, jobId: string): Promise<void> {
  const start = Date.now();
  try {
    const { data: job, error } = await supabase
      .from('health_safety_jobs')
      .select('id, user_id, query, work_type, project_info, attachments, refine_of')
      .eq('id', jobId)
      .maybeSingle();
    if (error || !job) throw new Error(`Job not found: ${jobId}`);

    await updateJob(supabase, jobId, {
      status: 'processing',
      progress: 5,
      current_step: 'Reading the brief',
      started_at: new Date().toISOString(),
    });

    if (await isCancelled(supabase, jobId)) return;

    // 1) Attachments.
    const attachments = job.attachments ?? [];
    const ingest = attachments.length
      ? await ingestAttachments(supabase, attachments)
      : { pdfText: '', images: [], errors: [] };

    if (ingest.errors.length) {
      console.warn('[health-safety-specialist] ingest errors:', ingest.errors);
    }

    await writePartial(supabase, jobId, 'briefing', {
      pdfChars: ingest.pdfText.length,
      imageCount: ingest.images.length,
      workType: job.work_type ?? 'commercial',
    });

    if (await isCancelled(supabase, jobId)) return;
    await updateJob(supabase, jobId, { progress: 18, current_step: 'Reading site photos' });

    // 2) Vision on hazard photos.
    let imageReading = '';
    if (ingest.images.length) {
      try {
        const reading = await readFloorplans(ingest.images);
        imageReading = formatReadingForExtraction(reading);
      } catch (err) {
        console.warn('[health-safety-specialist] image vision failed:', err);
      }
    }

    if (await isCancelled(supabase, jobId)) return;
    await updateJob(supabase, jobId, { progress: 32, current_step: 'Grounding against HSE + BS 7671' });

    // 3) Parallel RAG across all three corpora.
    const ragQuery = buildRagQuery(job, ingest.pdfText, imageReading);
    const workType = (job.work_type ?? 'commercial') as 'domestic' | 'commercial' | 'industrial';
    const sectionSeedQueries = detectSpecialSafetyQueries(ragQuery);

    const [safetyFacets, bs7671Facets, practical, ...sectionSafetyArr] = await Promise.all([
      searchSafetyFacets(supabase, { query: ragQuery, matchCount: 18 }),
      searchFacets(supabase, { query: ragQuery, matchCount: 10 }),
      searchPracticalWorkV2(supabase, {
        query: ragQuery,
        matchCount: 16,
        facetTypes: ['maintenance', 'testing', 'installation'],
        appliesTo: [workType],
      }),
      ...sectionSeedQueries.map((q) => searchSafetyFacets(supabase, { query: q, matchCount: 4 })),
    ]);

    // Merge section-seeded safety facets, dedup by id.
    const seenSafetyIds = new Set(safetyFacets.map((s) => s.id));
    for (const arr of sectionSafetyArr) {
      for (const f of arr) {
        if (!seenSafetyIds.has(f.id)) {
          safetyFacets.push(f);
          seenSafetyIds.add(f.id);
        }
      }
    }

    await writePartial(supabase, jobId, 'rag', {
      safetyFacetCount: safetyFacets.length,
      bs7671FacetCount: bs7671Facets.length,
      practicalCount: practical.length,
      hazardCategories: Array.from(
        new Set(safetyFacets.map((s) => s.hazardCategory).filter(Boolean))
      ),
      regs: bs7671Facets.map((f) => f.regNumber).filter(Boolean),
    });

    if (await isCancelled(supabase, jobId)) return;
    await updateJob(supabase, jobId, { progress: 50, current_step: 'Drafting hazard outline' });

    // 4a) Pass 1 — outline.
    let outputData = await generateOutline({
      job,
      pdfText: ingest.pdfText,
      imageReading,
      safetyFacets,
      bs7671Facets,
      practical,
    });

    await writePartial(supabase, jobId, 'method', {
      hazardCount: outputData.hazards?.length ?? 0,
      hasSummary: !!outputData.summary,
      pass: 'outline',
    });

    if (await isCancelled(supabase, jobId)) return;
    await updateJob(supabase, jobId, { progress: 65, current_step: 'Deepening every hazard' });

    // 4b) Pass 2 — per-hazard deep fill.
    if (Array.isArray(outputData?.hazards) && outputData.hazards.length > 0) {
      outputData.hazards = await fillHazardsInParallel(supabase, outputData.hazards, {
        job,
        workType,
      });
      await writePartial(supabase, jobId, 'enrichment', {
        hazardCount: outputData.hazards.length,
        avgControlsPerHazard: avg(
          outputData.hazards.map((h: any) => (h.controls?.length ?? 0))
        ),
        avgCitesPerHazard: avg(
          outputData.hazards.map(
            (h: any) => (h.bsReferences?.length ?? 0) + (h.safetyReferences?.length ?? 0)
          )
        ),
      });
    }

    if (await isCancelled(supabase, jobId)) return;
    await updateJob(supabase, jobId, { progress: 82, current_step: 'Verifying cites' });

    // 4c) Validation.
    const validation = await validateAllCites(supabase, outputData);
    outputData = validation.payload;
    await writePartial(supabase, jobId, 'validation', {
      regsChecked: validation.regsChecked,
      regsStripped: validation.regsStripped,
      safetyChecked: validation.safetyChecked,
      safetyStripped: validation.safetyStripped,
    });

    if (await isCancelled(supabase, jobId)) return;
    await updateJob(supabase, jobId, { progress: 88, current_step: 'Finalising RAMS' });

    // 5) Finalise.
    await updateJob(supabase, jobId, {
      status: 'complete',
      progress: 100,
      current_step: 'Done',
      output_data: outputData,
      completed_at: new Date().toISOString(),
    });
    await writePartial(supabase, jobId, 'finalise', { ok: true });
  } catch (err: any) {
    console.error('[health-safety-specialist] worker error:', err);
    await updateJob(supabase, jobId, {
      status: 'failed',
      progress: 100,
      current_step: 'Failed',
      error_message: String(err?.message ?? err),
      completed_at: new Date().toISOString(),
    }).catch(() => {});
  }
}

/* ─── RAG query composition ─────────────────────────────────────── */

function buildRagQuery(job: JobRow, pdfText: string, imageReading: string): string {
  const parts: string[] = [];
  const pi = job.project_info ?? {};
  if (pi.scope) parts.push(pi.scope);
  if (pi.location) parts.push(pi.location);
  if (job.work_type) parts.push(job.work_type);
  if (job.query) parts.push(job.query);
  if (pdfText) parts.push(pdfText.slice(0, 1500));
  if (imageReading) parts.push(imageReading.slice(0, 800));
  parts.push('hazard identification risk assessment control measures BS 7671 HSE');
  return parts.join(' ').slice(0, 4000);
}

/* ─── Pass 1 — outline ──────────────────────────────────────────── */

const VOICE_RULES = `Voice and register:
- Imperative for action / control measures ("Isolate the supply at the origin", "Provide barriers and warning signs").
- Passive for verifications and acceptance ("shall be verified by", "is to be recorded on").
- Third person. Never "you", "I", or "we". Subject is "the operative" / "the competent person" / "the site supervisor" / "the principal contractor".
- No conversational asides, no apprentice-style explanation, no rhetorical questions.
- Specifics over generalities: name values (limit values, exposure thresholds, IP ratings, harness arrest distances), tests (insulation resistance, RCD trip time, GS38 voltage indication), documents (permit-to-work, induction record, risk assessment sign-off, EICR).
- Citation style: BS 7671 cites inline as [411.3.1.1]; HSE / HSG cites as [HSG253] or [CDM 2015 reg 13]; HSWA as [HSWA s.2].
- "Shall" = mandatory. "Should" = strongly advised. "May" = permissible alternative.
- Acceptance criteria must be quantified (e.g. "exposure ≤80 dB(A) over 8 hours", "fall arrest ≤2 m"), not "satisfactory".
- UK terminology only.
- Cite document codes exactly as they appear in the source library blocks.`;

async function generateOutline(args: {
  job: JobRow;
  pdfText: string;
  imageReading: string;
  safetyFacets: SafetyFacet[];
  bs7671Facets: BS7671Facet[];
  practical: PracticalWorkFacet[];
}): Promise<any> {
  const { job, pdfText, imageReading, safetyFacets, bs7671Facets, practical } = args;
  const apiKey = Deno.env.get('OPENAI_API_KEY');
  if (!apiKey) throw new Error('OPENAI_API_KEY not configured');

  const systemPrompt = `You are a Senior Chartered Health & Safety Practitioner (CMIOSH) and NICEIC Approved Electrician acting as Authorising Engineer. You are drafting the OUTLINE of a FORMAL RISK ASSESSMENT — a hazard register with scored risks and hierarchical controls. This is NOT a method statement; do not draft work sequencing or step-by-step procedures. The output is issued to the principal contractor / site team, counter-signed before work commences, retained in the project H&S file, and may be audited by HSE, the client, or NICEIC.

This first pass produces the structural skeleton ONLY. Each hazard has a title, location-of-hazard, primary risk, severity rating and likelihood. Full controls / cites / evidence / sign-off come from a separate per-hazard pass — do NOT fill those fields here.

You also draft the top-level sections fully: executiveSummary, preparation, emergencyProcedures, summary.

Output strict JSON matching the schema below. UK English. Document-grade. No markdown.

${VOICE_RULES}

Schema:
{
  "jobTitle": string,                              // 8-14 words — what work / asset / location
  "executiveSummary": string,                      // 4-6 sentences — scope, headline hazards, key statutory references, residual risk position, control summary
  "rationale": string,                             // 2-3 sentences — why this risk assessment exists / what work it covers
  "workType": "domestic" | "commercial" | "industrial",
  "preparation": {
    "competencyRequired": string[],                // 3-5 items — qualifications, cards, training tickets
    "permitsRequired": string[],                   // 0-5 items — Permit-to-Work, hot works, confined space, electrical isolation
    "documentationRequired": string[],             // 3-5 items — drawings, asbestos register, induction record, risk assessment sign-off, last EICR
    "siteAccess": string[],                        // 2-4 items — induction, parking, exclusion zones
    "ppeBaseline": string[]                        // 5-8 items — minimum PPE for site entry
  },
  "hazards": Array<{
    "hazardNumber": number,
    "title": string,                               // noun phrase or imperative, 6-10 words
    "locationOfHazard": string,                    // 1 sentence — exactly where on site / in the work
    "primaryRisk": string,                         // 1 sentence — the harm if uncontrolled
    "likelihood": 1 | 2 | 3 | 4 | 5,               // pre-control likelihood (1=rare, 5=almost certain)
    "severity": 1 | 2 | 3 | 4 | 5                  // pre-control severity (1=trivial, 5=fatal/major)
  }>,
  "emergencyProcedures": {
    "firstAid": string[],                          // 2-4 items
    "fireEvacuation": string[],                    // 2-4 items
    "spillResponse": string[],                     // 0-3 items, only if relevant
    "electricalIncident": string[],                // 2-4 items
    "nearestA_E": string                           // 1 line — nearest A&E or "user to confirm on site"
  },
  "summary": {
    "totalHazards": number,
    "highestRiskRating": number,                   // pre-control likelihood × severity, max across hazards
    "criticalRegs": string[],                      // 3-6 most load-bearing references (mix of HSG, CDM, BS 7671, EAW)
    "overallResidualRisk": "low" | "medium" | "high"
  }
}

Hard rules:
- 22-30 hazards. A thorough risk assessment is exhaustive — break related risks into separate hazards (e.g. "electric shock from accidental contact", "arc flash during energised work" and "burns from touching hot conductors" are three different hazards, not one). Every hazard has a clear cause-effect chain and a measurable risk score.
- ALWAYS include separate hazards for: (a) electric shock from contact with live parts, (b) arc flash / arc blast, (c) failure to safely isolate and prove dead, (d) re-energisation under fault, (e) general slips, trips and falls, (f) manual handling injury, (g) cuts and abrasions from sharp edges / metal containment, (h) working at height fall (if any element ≥1 m), (i) tools and equipment failure / dropped objects, (j) lighting / ergonomics during night or low-light work.
- ALWAYS include separate hazards for any of these triggered by the brief: confined space, hot works (welding/cutting/grinding), lone working, asbestos disturbance, dust inhalation, noise ≥80 dB(A), hand-arm vibration, driving for work, plant or vehicle interaction, working near live services, fire load / ignition sources, weather exposure, public access.
- ALWAYS include separate hazards for management failures relevant to the brief: poor communication / handover, fatigue from extended shifts, inadequate supervision, scope creep beyond competence.
- Risk score thresholds: 1-4 low, 5-9 medium, 10-15 high, 16-25 unacceptable (must be designed out).
- Use HSE 5×5 matrix.
- Highest risk first; sort by likelihood × severity descending.
- Do NOT pad with duplicates. Each hazard must have a distinct mechanism of harm.`;

  const userBlock = [
    `# Brief\n${job.query?.trim() ?? ''}`,
    job.project_info ? `# Project info\n${JSON.stringify(job.project_info, null, 0)}` : '',
    pdfText ? `# Attached PDFs / RAMS / asset register\n${pdfText.slice(0, 6000)}` : '',
    imageReading ? `# Site photo readings\n${imageReading.slice(0, 1500)}` : '',
    `# Safety facets (HSG / CDM / regs — use only these for HSE cites)\n${formatSafetyFacetsForPrompt(safetyFacets)}`,
    `# BS 7671 facets (use only these for electrical reg cites)\n${formatFacetsForPrompt(bs7671Facets)}`,
    `# Practical-work facets (procedural context)\n${formatPracticalWorkForPrompt(practical)}`,
  ]
    .filter(Boolean)
    .join('\n\n');

  const response = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: { Authorization: `Bearer ${apiKey}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({
      model: MODEL,
      max_completion_tokens: 9000, // Reduced from 12k: 22-24 hazards is sufficient depth; saves ~20s per run
      response_format: { type: 'json_object' },
      messages: [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: userBlock },
      ],
    }),
  });

  if (!response.ok) {
    const errText = await response.text();
    throw new Error(`OpenAI ${response.status}: ${errText.slice(0, 500)}`);
  }

  const j = await response.json();
  const text = j?.choices?.[0]?.message?.content ?? '';
  try {
    return JSON.parse(text);
  } catch (err) {
    console.error('[health-safety-specialist] outline parse failed', err, text.slice(0, 400));
    throw new Error('Outline JSON was malformed.');
  }
}

/* ─── Pass 2 — per-hazard deep fill ─────────────────────────────── */

interface FillContext {
  job: JobRow;
  workType: 'domestic' | 'commercial' | 'industrial';
}

// Increased from 6: more parallel workers = fewer rounds = less total wall time.
// 30 hazards ÷ 10 workers = 3 rounds instead of 5 — saves ~25s on the pass 2 phase.
const FILL_CONCURRENCY = 10;

async function fillHazardsInParallel(
  supabase: any,
  outlineHazards: any[],
  ctx: FillContext
): Promise<any[]> {
  const result: any[] = new Array(outlineHazards.length);
  let cursor = 0;

  const work = async () => {
    while (cursor < outlineHazards.length) {
      const i = cursor++;
      try {
        result[i] = await fillHazardDetail(supabase, outlineHazards[i], i + 1, ctx);
      } catch (err) {
        console.warn('[health-safety-specialist] hazard fill failed', i, err);
        result[i] = {
          ...outlineHazards[i],
          hazardNumber: outlineHazards[i].hazardNumber ?? i + 1,
        };
      }
    }
  };

  const workers = Array.from(
    { length: Math.min(FILL_CONCURRENCY, outlineHazards.length) },
    work
  );
  await Promise.all(workers);
  return result;
}

async function fillHazardDetail(
  supabase: any,
  outlineHazard: any,
  hazardNumber: number,
  ctx: FillContext
): Promise<any> {
  const apiKey = Deno.env.get('OPENAI_API_KEY');
  if (!apiKey) throw new Error('OPENAI_API_KEY not configured');

  // Focused RAG scoped to this hazard's topic.
  const hazardQuery = [
    outlineHazard.title,
    outlineHazard.locationOfHazard,
    outlineHazard.primaryRisk,
    ctx.job.query?.slice(0, 200),
  ]
    .filter(Boolean)
    .join(' ');

  const [safetyFacets, bs7671Facets, practical] = await Promise.all([
    searchSafetyFacets(supabase, { query: hazardQuery, matchCount: 6 }),
    searchFacets(supabase, { query: hazardQuery, matchCount: 4 }),
    searchPracticalWorkV2(supabase, {
      query: hazardQuery,
      matchCount: 4,
      appliesTo: [ctx.workType],
    }),
  ]);

  const systemPrompt = `You are filling in ONE hazard of a FORMAL RISK ASSESSMENT & METHOD STATEMENT. The skeleton (title, location-of-hazard, primary risk, likelihood, severity) is fixed — do not change it. Your job is to author the operational detail at industry-grade depth.

Output strict JSON for a single hazard matching the schema below. UK English. Document-grade. No markdown.

${VOICE_RULES}

Schema (fill ALL fields):
{
  "hazardNumber": number,
  "title": string,                                 // copied from outline
  "locationOfHazard": string,                      // copied from outline
  "primaryRisk": string,                           // copied from outline
  "likelihood": 1|2|3|4|5,                         // copied from outline (pre-control)
  "severity": 1|2|3|4|5,                           // copied from outline
  "riskRating": number,                            // likelihood × severity (pre-control)
  "rationale": string,                             // 3-5 sentences — why this is a hazard, mechanism, who is exposed, when
  "personsAtRisk": string[],                       // 2-5 — operative, principal contractor, occupant, public, designer
  "controls": Array<{                              // 5-9 control measures, ordered by control hierarchy
    "order": number,
    "tier": "eliminate" | "substitute" | "engineer" | "admin" | "ppe",
    "control": string,                             // imperative, 8-16 words
    "detail": string,                              // 30-50 words — HOW the control is implemented, what the success criterion is
    "responsibleRole": string                      // e.g. "Site supervisor", "Operative", "Principal contractor"
  }>,
  "residualLikelihood": 1|2|3|4|5,                 // post-control
  "residualSeverity": 1|2|3|4|5,                   // post-control
  "residualRiskRating": number,                    // post-control product
  "ppeRequired": string[],                         // 3-6 specific PPE items (e.g. "Class 0 insulating gloves to BS EN 60903")
  "competencyRequired": string[],                  // 1-3 e.g. "Approved Electrician, City & Guilds 2391"
  "bsReferences": string[],                        // 1-4 BS 7671 reg numbers, exact strings from BS 7671 facets block
  "safetyReferences": string[],                    // 2-5 HSE / CDM / HSG / regulation cites, exact strings from safety facets block (e.g. "HSG253", "CDM 2015 reg 13")
  "trainingRequired": string[],                    // 1-3 training tickets / inductions
  "monitoringChecks": string[],                    // 2-4 in-progress monitoring activities
  "evidenceRequired": string[],                    // 2-4 photos / sign-offs / test-result captures / permit issuance
  "stopWorkTriggers": string[]                     // 2-4 conditions that mandate stopping work and re-assessing
}

Hard rules:
- bsReferences MUST appear in the BS 7671 facets block. Do not invent.
- safetyReferences MUST appear in the safety facets block. Do not invent — if you can't find a HSG cite, leave the array shorter rather than guess.
- ≥5 controls.
- Hierarchy: at least one of (eliminate / substitute / engineer) for every hazard with severity ≥3 — PPE alone is not sufficient.
- ≥2 evidenceRequired entries.
- ≥1 stopWorkTrigger.
- residualLikelihood ≤ likelihood AND residualSeverity ≤ severity (controls reduce risk, not increase it).
- For electrical hazards: name the test (e.g. "GS38 prove-dead with approved 2-pole indicator", "MFT insulation resistance ≥1.0 MΩ at 500 V dc").
- Detail must be specific to THIS hazard, not generic.`;

  const userBlock = [
    `# Hazard skeleton\n${JSON.stringify(
      {
        hazardNumber,
        title: outlineHazard.title,
        locationOfHazard: outlineHazard.locationOfHazard,
        primaryRisk: outlineHazard.primaryRisk,
        likelihood: outlineHazard.likelihood,
        severity: outlineHazard.severity,
      },
      null,
      0
    )}`,
    `# Brief context (the whole job)\n${ctx.job.query?.slice(0, 1500) ?? ''}`,
    ctx.job.project_info
      ? `# Project info\n${JSON.stringify(ctx.job.project_info, null, 0)}`
      : '',
    `# Safety facets relevant to THIS hazard (use only these for HSE cites)\n${formatSafetyFacetsForPrompt(safetyFacets)}`,
    `# BS 7671 facets relevant to THIS hazard (use only these for electrical reg cites)\n${formatFacetsForPrompt(bs7671Facets)}`,
    `# Practical-work facets relevant to THIS hazard\n${formatPracticalWorkForPrompt(practical)}`,
  ]
    .filter(Boolean)
    .join('\n\n');

  // 30s per-hazard timeout — prevents one slow/hung OpenAI call from blocking a worker
  // indefinitely and causing the whole fillHazardsInParallel phase to exceed the waitUntil ceiling.
  const controller = new AbortController();
  const hazardTimeout = setTimeout(() => controller.abort(), 30_000);

  let response: Response;
  try {
    response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: { Authorization: `Bearer ${apiKey}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({
        model: MODEL,
        max_completion_tokens: 2000, // Reduced from 3000: sufficient per-hazard detail, faster response
        response_format: { type: 'json_object' },
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: userBlock },
        ],
      }),
      signal: controller.signal,
    });
  } catch (fetchErr: any) {
    if (fetchErr?.name === 'AbortError') {
      throw new Error(`Hazard ${hazardNumber} timed out after 30s — skipping`);
    }
    throw fetchErr;
  } finally {
    clearTimeout(hazardTimeout);
  }

  if (!response.ok) {
    const errText = await response.text();
    throw new Error(`OpenAI hazard ${hazardNumber} ${response.status}: ${errText.slice(0, 300)}`);
  }

  const j = await response.json();
  const text = j?.choices?.[0]?.message?.content ?? '';
  const parsed = JSON.parse(text);
  return {
    ...parsed,
    hazardNumber,
    title: outlineHazard.title,
    locationOfHazard: outlineHazard.locationOfHazard,
    primaryRisk: outlineHazard.primaryRisk,
    likelihood: outlineHazard.likelihood ?? parsed.likelihood ?? 3,
    severity: outlineHazard.severity ?? parsed.severity ?? 3,
  };
}

/* ─── Validation ─────────────────────────────────────────────────── */

async function validateAllCites(
  supabase: any,
  payload: any
): Promise<{
  payload: any;
  regsChecked: number;
  regsStripped: number;
  safetyChecked: number;
  safetyStripped: number;
}> {
  // Collect candidate cites.
  const regs = new Set<string>();
  const safetyRefs = new Set<string>();
  if (Array.isArray(payload?.hazards)) {
    for (const h of payload.hazards) {
      (h?.bsReferences ?? []).forEach((r: unknown) => {
        if (typeof r === 'string' && r.trim()) regs.add(r.trim());
      });
      (h?.safetyReferences ?? []).forEach((r: unknown) => {
        if (typeof r === 'string' && r.trim()) safetyRefs.add(r.trim());
      });
    }
  }
  (payload?.summary?.criticalRegs ?? []).forEach((r: unknown) => {
    if (typeof r === 'string' && r.trim()) {
      // criticalRegs mixes BS 7671 + HSE — try both.
      regs.add(r.trim());
      safetyRefs.add(r.trim());
    }
  });

  // Validate BS 7671 cites.
  let validRegs = new Set<string>();
  if (regs.size > 0) {
    const { data } = await supabase
      .from('bs7671_facets')
      .select('reg_number')
      .in('reg_number', Array.from(regs));
    validRegs = new Set(
      (data ?? [])
        .map((r: any) => String(r.reg_number ?? '').trim())
        .filter(Boolean)
    );
  }

  // Validate HSE / safety document cites. We accept either an exact
  // document_code match or the bracketed token appearing in any safety
  // facet's document_code field.
  let validSafety = new Set<string>();
  if (safetyRefs.size > 0) {
    const { data } = await supabase
      .from('safety_facets')
      .select('document_code, document_type')
      .or(
        Array.from(safetyRefs)
          .map((r) => `document_code.eq.${r.replace(/,/g, '')}`)
          .join(',')
      );
    validSafety = new Set(
      (data ?? [])
        .map((r: any) => String(r.document_code ?? '').trim())
        .filter(Boolean)
    );
  }

  let regsStripped = 0;
  let safetyStripped = 0;
  if (Array.isArray(payload?.hazards)) {
    for (const h of payload.hazards) {
      if (Array.isArray(h.bsReferences)) {
        const before = h.bsReferences.length;
        h.bsReferences = h.bsReferences.filter(
          (r: unknown) => typeof r === 'string' && validRegs.has(r.trim())
        );
        regsStripped += before - h.bsReferences.length;
      }
      if (Array.isArray(h.safetyReferences)) {
        const before = h.safetyReferences.length;
        h.safetyReferences = h.safetyReferences.filter(
          (r: unknown) => typeof r === 'string' && validSafety.has(r.trim())
        );
        safetyStripped += before - h.safetyReferences.length;
      }
    }
  }

  return {
    payload,
    regsChecked: regs.size,
    regsStripped,
    safetyChecked: safetyRefs.size,
    safetyStripped,
  };
}

/* ─── Job + partials helpers ────────────────────────────────────── */

async function updateJob(supabase: any, jobId: string, patch: Record<string, unknown>): Promise<void> {
  const { error } = await supabase
    .from('health_safety_jobs')
    .update({ ...patch, updated_at: new Date().toISOString() })
    .eq('id', jobId);
  if (error) console.error('[health-safety-specialist] updateJob:', error);
}

async function writePartial(
  supabase: any,
  jobId: string,
  stage: string,
  payload: Record<string, unknown>
): Promise<void> {
  const { error } = await supabase
    .from('health_safety_partials')
    .upsert(
      { job_id: jobId, stage, payload, created_at: new Date().toISOString() },
      { onConflict: 'job_id,stage' }
    );
  if (error) console.error('[health-safety-specialist] writePartial:', error);
}

async function isCancelled(supabase: any, jobId: string): Promise<boolean> {
  const { data } = await supabase
    .from('health_safety_jobs')
    .select('status')
    .eq('id', jobId)
    .maybeSingle();
  return data?.status === 'cancelled';
}

function avg(nums: number[]): number {
  if (!nums.length) return 0;
  return Math.round((nums.reduce((a, b) => a + b, 0) / nums.length) * 100) / 100;
}

/* ─── Special-keyword section seeding ────────────────────────────── */

interface SeedRule {
  match: RegExp;
  query: string;
}

const SEED_RULES: SeedRule[] = [
  { match: /\b(work[\s-]?at[\s-]?height|wahr|scaffold|ladder|MEWP|cherry picker)\b/i,
    query: 'Working at Height Regulations 2005 fall arrest harness scaffold inspection' },
  { match: /\b(confined space|tank|manhole|chamber)\b/i,
    query: 'Confined Spaces Regulations 1997 entry permit gas testing rescue' },
  { match: /\b(asbestos|acm|amosite|crocidolite)\b/i,
    query: 'Control of Asbestos Regulations 2012 management plan licensed work CAR' },
  { match: /\b(coshh|hazardous substance|chemical|solvent)\b/i,
    query: 'COSHH 2002 control of substances hazardous to health assessment' },
  { match: /\b(manual handling|lifting|carry|lift)\b/i,
    query: 'Manual Handling Operations Regulations 1992 risk assessment TILE' },
  { match: /\b(noise|hearing|sound level|db\(a\))\b/i,
    query: 'Control of Noise at Work Regulations 2005 daily exposure 80 85 dB' },
  { match: /\b(vibration|hav|hand[\s-]?arm|whole[\s-]?body)\b/i,
    query: 'Control of Vibration at Work Regulations 2005 HAV exposure action value' },
  { match: /\b(fire|hot work|welding|grinding|spark)\b/i,
    query: 'Regulatory Reform Fire Safety Order 2005 hot work permit' },
  { match: /\b(lone worker|alone|isolated)\b/i,
    query: 'lone working risk assessment communication check-in procedures' },
  { match: /\b(electrical|electric shock|isolation|loto|prove dead)\b/i,
    query: 'Electricity at Work Regulations 1989 safe isolation HSG253 GS38' },
  { match: /\b(eaw|electricity at work)\b/i,
    query: 'Electricity at Work Regulations 1989 reg 12 13 14 dead working' },
  { match: /\b(cdm|construction|principal contractor|principal designer)\b/i,
    query: 'Construction Design and Management Regulations 2015 duty holders' },
  { match: /\b(driving|vehicle|fleet|on the road)\b/i,
    query: 'driving for work HSG270 fleet management road risk assessment' },
  { match: /\b(eicr|periodic inspection|condition report)\b/i,
    query: 'BS 7671 Part 6 inspection testing periodic verification observation coding' },
  { match: /\b(arc flash|short circuit|fault current)\b/i,
    query: 'arc flash incident energy boundary PPE category electrical safety' },
];

function detectSpecialSafetyQueries(brief: string): string[] {
  const out: string[] = [];
  const seen = new Set<string>();
  for (const rule of SEED_RULES) {
    if (rule.match.test(brief) && !seen.has(rule.query)) {
      out.push(rule.query);
      seen.add(rule.query);
    }
  }
  return out;
}
