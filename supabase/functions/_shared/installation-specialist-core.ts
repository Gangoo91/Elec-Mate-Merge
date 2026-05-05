/**
 * Installation Specialist core — single-stage pipeline.
 *
 *   1. Read the job + parse attachments (PDF text + image signed URLs).
 *   2. Optional vision pass on floor-plan / drawing images.
 *   3. Parallel RAG:
 *        - BS 7671 facets (search_bs7671_v3)               — regulations
 *        - Practical Work Intelligence (search_practical_work_v2) — hands-on
 *   4. One structured AI pass (gpt-5.4-mini-2026-03-17) emits the full
 *      method statement: steps, safety, tools, materials, inspection
 *      points, BS 7671 cites, summary.
 *   5. Finalise: write method_data + status='complete'.
 *
 * Streaming: every stage writes to `installation_method_partials` so the
 * frontend can render live progress + a step preview.
 *
 * RAMS coupling: this function only writes to `installation_method_jobs`.
 * The `rams_generation_jobs.installation_job_id` FK remains valid.
 */

/* eslint-disable @typescript-eslint/no-explicit-any */

import { searchFacets, formatFacetsForPrompt, type BS7671Facet } from './bs7671-facets-rag.ts';
import {
  searchPracticalWorkV2,
  formatPracticalWorkForPrompt,
  type PracticalWorkFacet,
} from './rag-practical-work.ts';
import { ingestAttachments, type AttachmentInput } from './attachment-ingest.ts';
import { readFloorplans, formatReadingForExtraction } from './vision-floorplan.ts';

const MODEL = 'gpt-5.4-mini-2026-03-17';

interface JobRow {
  id: string;
  user_id: string;
  query: string;
  project_details: any;
  designer_context: any;
  attachments: AttachmentInput[] | null;
  refine_of: string | null;
}

export async function runMethodStatement(supabase: any, jobId: string): Promise<void> {
  const start = Date.now();
  try {
    const { data: job, error } = await supabase
      .from('installation_method_jobs')
      .select('id, user_id, query, project_details, designer_context, attachments, refine_of')
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

    // 1) Attachments — PDFs + photos + drawings.
    const attachments = job.attachments ?? [];
    const ingest = attachments.length
      ? await ingestAttachments(supabase, attachments)
      : { pdfText: '', images: [], errors: [] };

    if (ingest.errors.length) {
      console.warn('[installation-specialist] ingest errors:', ingest.errors);
    }

    await writePartial(supabase, jobId, 'briefing', {
      pdfChars: ingest.pdfText.length,
      imageCount: ingest.images.length,
      installationType: job.project_details?.installationType ?? 'domestic',
    });

    if (await isCancelled(supabase, jobId)) return;
    await updateJob(supabase, jobId, { progress: 18, current_step: 'Reading drawings' });

    // 2) Optional vision on floor-plans / drawings.
    let floorplanReading = '';
    if (ingest.images.length) {
      try {
        const reading = await readFloorplans(ingest.images);
        floorplanReading = formatReadingForExtraction(reading);
      } catch (err) {
        console.warn('[installation-specialist] floorplan vision failed:', err);
      }
    }

    if (await isCancelled(supabase, jobId)) return;
    await updateJob(supabase, jobId, { progress: 32, current_step: 'Grounding against BS 7671' });

    // 3) Parallel RAG. We do three retrievals in parallel:
    //    - Broad facets via hybrid RRF on the full brief
    //    - Practical-work via hybrid RRF
    //    - Special-location facets seeded from keyword detection in the
    //      brief (e.g. EV → §722, bathroom → §701). Cosine similarity
    //      sometimes misses these when the brief uses trade jargon
    //      rather than section numbers, so we force-include them.
    const ragQuery = buildRagQuery(job, ingest.pdfText, floorplanReading);
    const installationType = (job.project_details?.installationType ?? 'domestic') as
      | 'domestic'
      | 'commercial'
      | 'industrial';

    const sectionSeedQueries = detectSpecialLocationQueries(ragQuery);

    const [facets, practical, ...sectionFacetsArr] = await Promise.all([
      searchFacets(supabase, { query: ragQuery, matchCount: 14 }),
      searchPracticalWorkV2(supabase, {
        query: ragQuery,
        matchCount: 22,
        facetTypes: ['installation', 'testing', 'maintenance'],
        appliesTo: [installationType],
      }),
      ...sectionSeedQueries.map((q) => searchFacets(supabase, { query: q, matchCount: 4 })),
    ]);

    // Merge section-seeded facets into the main pool, dedup by facetId.
    const seenFacetIds = new Set(facets.map((f) => f.facetId));
    for (const arr of sectionFacetsArr) {
      for (const f of arr) {
        if (!seenFacetIds.has(f.facetId)) {
          facets.push(f);
          seenFacetIds.add(f.facetId);
        }
      }
    }

    await writePartial(supabase, jobId, 'rag', {
      facetCount: facets.length,
      practicalCount: practical.length,
      facetRegs: facets.map((f) => f.regNumber).filter(Boolean),
      practicalTopics: practical.slice(0, 6).map((p) => p.primaryTopic),
    });

    if (await isCancelled(supabase, jobId)) return;
    await updateJob(supabase, jobId, { progress: 50, current_step: 'Drafting the outline' });

    // 4a) PASS 1 — outline only. Generate the structural skeleton: 16-22
    // step titles + purpose + risk + duration, plus the top-level
    // sections (executiveSummary, preparation, handover, atypical,
    // summary). Small token budget so this returns in ~20-30s.
    let methodData = await generateOutline({
      job,
      pdfText: ingest.pdfText,
      floorplanReading,
      facets,
      practical,
    });

    await writePartial(supabase, jobId, 'method', {
      stepCount: methodData.steps?.length ?? 0,
      hasSummary: !!methodData.summary,
      pass: 'outline',
    });

    if (await isCancelled(supabase, jobId)) return;
    await updateJob(supabase, jobId, { progress: 65, current_step: 'Deepening every step' });

    // 4b) PASS 2 — per-step deep fill. For every step we run an
    // independent AI call with focused RAG (facets + practical-work
    // scoped to that step's title + purpose) and ask it to fill in
    // subSteps, safety, tools, materials, decisions, mistakes,
    // evidence, checkpoints. Concurrency 6 — fans out the wall time
    // from N×t to (N/6)×t.
    if (Array.isArray(methodData?.steps) && methodData.steps.length > 0) {
      methodData.steps = await fillStepsInParallel(supabase, methodData.steps, {
        job,
        installationType,
      });
      await writePartial(supabase, jobId, 'enrichment', {
        stepCount: methodData.steps.length,
        avgRegsPerStep: avg(methodData.steps.map((s: any) => (s.bsReferences ?? []).length)),
        avgSubStepsPerStep: avg(methodData.steps.map((s: any) => (s.subSteps ?? []).length)),
        avgMistakesPerStep: avg(methodData.steps.map((s: any) => (s.commonMistakes ?? []).length)),
      });
    }

    if (await isCancelled(supabase, jobId)) return;
    await updateJob(supabase, jobId, { progress: 82, current_step: 'Verifying BS 7671 cites' });

    // 4c) Validation — verify every reg cite the AI emitted actually
    // exists in `bs7671_facets`. Hallucinated cites are stripped. Strip
    // rate is captured in quality_metrics so we can monitor retrieval
    // quality over time.
    const validation = await validateRegCites(supabase, methodData);
    methodData = validation.method;
    await writePartial(supabase, jobId, 'validation', {
      regsChecked: validation.checked,
      regsStripped: validation.stripped,
      stripRate: validation.checked
        ? Math.round((validation.stripped / validation.checked) * 1000) / 10
        : 0,
    });
    if (validation.stripped > 0) {
      console.warn(
        `[installation-specialist] stripped ${validation.stripped}/${validation.checked} hallucinated reg cites`
      );
    }

    if (await isCancelled(supabase, jobId)) return;
    await updateJob(supabase, jobId, { progress: 88, current_step: 'Finalising method statement' });

    // 5) Finalise.
    await updateJob(supabase, jobId, {
      status: 'complete',
      progress: 100,
      current_step: 'Done',
      method_data: methodData,
      completed_at: new Date().toISOString(),
      quality_metrics: {
        durationMs: Date.now() - start,
        facetCount: facets.length,
        practicalCount: practical.length,
        stepCount: methodData.steps?.length ?? 0,
        attachmentCount: attachments.length,
      },
    });
    await writePartial(supabase, jobId, 'finalise', { ok: true });
  } catch (err: any) {
    console.error('[installation-specialist] worker error:', err);
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

function buildRagQuery(job: JobRow, pdfText: string, floorplan: string): string {
  const parts: string[] = [];
  if (job.project_details?.installationType) parts.push(job.project_details.installationType);
  if (job.query) parts.push(job.query);
  if (pdfText) parts.push(pdfText.slice(0, 1500));
  if (floorplan) parts.push(floorplan.slice(0, 800));
  return parts.join(' ').slice(0, 4000);
}

/* ─── AI generation ─────────────────────────────────────────────── */

/* ─── Pass 1 — outline generation ──────────────────────────────── */

const VOICE_RULES = `Voice and register:
- Imperative for actions ("Isolate the supply at the origin").
- Passive for verifications and acceptance ("shall be verified by", "is to be recorded on").
- Third person. Never "you", "I", or "we". The subject is "the operative" / "the competent person" / "the supervisor".
- No conversational asides, no apprentice-style explanation, no rhetorical questions.
- Specifics over generalities: name values (torque, csa, 500 V dc, 1 mA), tests (IR, R1+R2, Zs), documents (Schedule of Inspections, EIC).
- Regulation cites belong inline as [411.3.1.1].
- "Shall" = mandatory. "Should" = strongly advised. "May" = permissible alternative.
- Acceptance criteria must be quantified (e.g. "≥1.0 MΩ at 500 V dc"), not "satisfactory".
- UK terminology: "consumer unit" not "panelboard", "RCBO" not "GFCI breaker", "MET" not "earth bus".
- Cite reg numbers exactly as they appear in the facets block.`;

async function generateOutline(args: {
  job: JobRow;
  pdfText: string;
  floorplanReading: string;
  facets: BS7671Facet[];
  practical: PracticalWorkFacet[];
}): Promise<any> {
  const { job, pdfText, floorplanReading, facets, practical } = args;
  const apiKey = Deno.env.get('OPENAI_API_KEY');
  if (!apiKey) throw new Error('OPENAI_API_KEY not configured');

  const systemPrompt = `You are a Senior NICEIC Approved Electrician acting as Authorising Engineer. You are drafting the OUTLINE of a FORMAL METHOD STATEMENT — the document is issued to the operative, counter-signed before work commences, retained in the project file, and may be audited by NICEIC, the client, or HSE.

This first pass produces the structural skeleton ONLY. Each step has a title, purpose, risk level, and high-level duration. The full sub-step / safety / tools / materials / decisions / mistakes / evidence / checkpoints content is filled in by a separate per-step pass — do NOT fill those fields here.

You also draft the top-level sections fully: executiveSummary, preparation, handover, atypicalScenarios, summary.

Output strict JSON matching the schema below. UK English. Document-grade. No markdown.

${VOICE_RULES}

Schema:
{
  "jobTitle": string,                              // 8-14 words
  "executiveSummary": string,                      // 3-5 sentences for the printed cover page
  "installationGuide": string,                     // 2-4 sentences — purpose of this document
  "installationType": "domestic" | "commercial" | "industrial",
  "preparation": {
    "competencyVerification": string[],            // 2-4 items
    "siteAccess": string[],                        // 2-4 items
    "documentationRequired": string[],             // 2-4 items
    "permitsRequired": string[]                    // 0-4 items
  },
  "steps": Array<{
    "stepNumber": number,
    "title": string,                               // imperative, 6-10 words
    "purpose": string,                             // 1-2 sentences — WHY this step exists
    "estimatedDuration": string,                   // e.g. "45 mins"
    "riskLevel": "low" | "medium" | "high"
  }>,
  "handover": {
    "documentationToProvide": string[],            // 3-6 items
    "clientWalkthrough": string[],                 // 2-5 items
    "ongoingMaintenance": string[]                 // 2-5 items
  },
  "atypicalScenarios": Array<{                     // 1-3 items
    "scenario": string,
    "additionalSteps": string,
    "additionalRegs": string[]                     // exact reg numbers from facets block
  }>,
  "summary": {
    "totalSteps": number,
    "estimatedDuration": string,
    "requiredQualifications": string[],
    "overallRiskLevel": "low" | "medium" | "high",
    "criticalRegs": string[]                       // 3-5 most load-bearing regs (from facets)
  }
}

Hard rules for the step list:
- 16-22 steps. Pick the count the job truly needs — don't pad, don't crop.
- Step 1 covers isolation, securing isolation (lockout/tagout) and proof-dead per GS38.
- Step 2 covers verification of earthing arrangement and main protective bonding sufficiency.
- Penultimate step covers full inspection and testing per BS 7671 Part 6 with certificate population.
- Final step covers client demonstration, hand-over and the documentation pack.
- Risk levels: low = routine; medium = live-adjacent / working at height / mains accessory work; high = LV switchgear / confined space / energised work / TT installation activity.
- Steps must be sequenced in the order the work is actually carried out on site.`;

  const userBlock = [
    `# Brief\n${job.query?.trim() ?? ''}`,
    job.project_details ? `# Project\n${JSON.stringify(job.project_details, null, 0)}` : '',
    pdfText ? `# Attached spec / PDF text\n${pdfText.slice(0, 6000)}` : '',
    floorplanReading ? `# Floor plan reading\n${floorplanReading.slice(0, 1500)}` : '',
    `# BS 7671 facets (use only these for cites)\n${formatFacetsForPrompt(facets)}`,
    `# Practical-work facets (context for sequencing)\n${formatPracticalWorkForPrompt(practical)}`,
  ]
    .filter(Boolean)
    .join('\n\n');

  const response = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: { Authorization: `Bearer ${apiKey}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({
      model: MODEL,
      max_completion_tokens: 6000,
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
    return enrichMethodStatement(JSON.parse(text), { facets });
  } catch (err) {
    console.error('[installation-specialist] outline parse failed', err, text.slice(0, 400));
    throw new Error('Outline JSON was malformed.');
  }
}

/* ─── Pass 2 — per-step deep fill (parallel) ──────────────────── */

interface FillContext {
  job: JobRow;
  installationType: 'domestic' | 'commercial' | 'industrial';
}

const FILL_CONCURRENCY = 6;

async function fillStepsInParallel(
  supabase: any,
  outlineSteps: any[],
  ctx: FillContext
): Promise<any[]> {
  const result: any[] = new Array(outlineSteps.length);
  let cursor = 0;

  const work = async () => {
    while (cursor < outlineSteps.length) {
      const i = cursor++;
      try {
        result[i] = await fillStepDetail(supabase, outlineSteps[i], i + 1, ctx);
      } catch (err) {
        console.warn('[installation-specialist] step fill failed', i, err);
        // Fall back to the outline skeleton so we never lose the step.
        result[i] = { ...outlineSteps[i], stepNumber: outlineSteps[i].stepNumber ?? i + 1 };
      }
    }
  };

  const workers = Array.from({ length: Math.min(FILL_CONCURRENCY, outlineSteps.length) }, work);
  await Promise.all(workers);
  return result;
}

async function fillStepDetail(
  supabase: any,
  outlineStep: any,
  stepNumber: number,
  ctx: FillContext
): Promise<any> {
  const apiKey = Deno.env.get('OPENAI_API_KEY');
  if (!apiKey) throw new Error('OPENAI_API_KEY not configured');

  // Focused RAG scoped to this step's topic.
  const stepQuery = [outlineStep.title, outlineStep.purpose, ctx.job.query?.slice(0, 200)]
    .filter(Boolean)
    .join(' ');

  const [facets, practical] = await Promise.all([
    searchFacets(supabase, { query: stepQuery, matchCount: 5 }),
    searchPracticalWorkV2(supabase, {
      query: stepQuery,
      matchCount: 6,
      appliesTo: [ctx.installationType],
    }),
  ]);

  const systemPrompt = `You are filling in ONE step of a FORMAL METHOD STATEMENT. The structural skeleton (title, purpose, risk, duration) is fixed — do not change it. Your job is to author the operational detail at industry-grade depth.

Output strict JSON for a single step matching the schema below. UK English. Document-grade. No markdown.

${VOICE_RULES}

Schema (fill ALL fields):
{
  "stepNumber": number,
  "title": string,                                 // copied from outline
  "purpose": string,                               // copied from outline
  "estimatedDuration": string,                     // copied from outline
  "riskLevel": "low" | "medium" | "high",          // copied from outline
  "content": string,                               // 5-9 sentences — detailed how-to specific to THIS step. Name tools, values, tests, documents.
  "subSteps": Array<{                              // 5-8 atomic actions, in execution order
    "order": number,
    "action": string,                              // imperative, 8-14 words
    "detail": string                               // 30-50 words — HOW: include values, torques, intervals, named tools/methods
  }>,
  "durationBreakdown": {
    "preparation": string,                         // e.g. "10 mins"
    "execution": string,
    "verification": string
  },
  "safety": Array<{                                // 3-6 items
    "note": string,                                // hazard + control, 12-25 words
    "regulation"?: string,                         // exact reg number from facets, optional
    "severity"?: "info" | "warning" | "critical"
  }>,
  "toolsRequired": string[],                       // 4-9 short item names
  "materialsNeeded": string[],                     // 0-10 with mm/A specs where relevant
  "qualifications": string[],                      // 1-3 e.g. "Approved Electrician (City & Guilds 2391)"
  "bsReferences": string[],                        // 2-5 reg numbers, exact strings from the facets block below
  "criticalDecisions": string[],                   // 2-4 site-time choices (e.g. "Confirm earthing system: TN-S, TN-C-S, or TT — affects [411.4] selection")
  "commonMistakes": string[],                      // 2-4 failure modes, framed as "Avoid … because …"
  "evidenceRequired": string[],                    // 2-4 photos/sign-offs/test-result captures
  "inspectionCheckpoints": Array<{                 // 2-5 items
    "check": string,
    "acceptanceCriteria": string,                  // quantified
    "documentRequired": string                     // EIC schedule / EICR / hand-over pack / O&M file
  }>
}

Hard rules:
- Reg numbers in bsReferences MUST appear in the facets block below. Do not invent.
- ≥2 BS 7671 cites.
- ≥5 sub-steps.
- ≥2 commonMistakes derived from the practical-work facets.
- ≥2 evidenceRequired entries.
- Sub-step "detail" must be specific to this step's job — not generic.`;

  const userBlock = [
    `# Step skeleton\n${JSON.stringify(
      {
        stepNumber,
        title: outlineStep.title,
        purpose: outlineStep.purpose,
        estimatedDuration: outlineStep.estimatedDuration,
        riskLevel: outlineStep.riskLevel,
      },
      null,
      0
    )}`,
    `# Brief context (the whole job)\n${ctx.job.query?.slice(0, 1500) ?? ''}`,
    ctx.job.project_details ? `# Project\n${JSON.stringify(ctx.job.project_details, null, 0)}` : '',
    `# BS 7671 facets relevant to THIS step (use only these for cites)\n${formatFacetsForPrompt(facets)}`,
    `# Practical-work facets relevant to THIS step\n${formatPracticalWorkForPrompt(practical)}`,
  ]
    .filter(Boolean)
    .join('\n\n');

  const response = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: { Authorization: `Bearer ${apiKey}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({
      model: MODEL,
      max_completion_tokens: 3000,
      response_format: { type: 'json_object' },
      messages: [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: userBlock },
      ],
    }),
  });

  if (!response.ok) {
    const errText = await response.text();
    throw new Error(`OpenAI step ${stepNumber} ${response.status}: ${errText.slice(0, 300)}`);
  }

  const j = await response.json();
  const text = j?.choices?.[0]?.message?.content ?? '';
  const parsed = JSON.parse(text);
  // Re-stamp the skeleton fields so the outline can't be drifted.
  return {
    ...parsed,
    stepNumber,
    title: outlineStep.title,
    purpose: outlineStep.purpose,
    estimatedDuration: outlineStep.estimatedDuration,
    riskLevel: outlineStep.riskLevel ?? parsed.riskLevel ?? 'medium',
  };
}

/**
 * Post-process: normalise the AI's output and patch a few fields the
 * model commonly under-fills (top-level summary aggregates, metadata).
 */
function enrichMethodStatement(raw: any, ctx: { facets: BS7671Facet[] }): any {
  const steps: any[] = Array.isArray(raw?.steps) ? raw.steps : [];

  // Aggregate summary unions if missing.
  const allTools = new Set<string>();
  const allMaterials = new Set<string>();
  const allQuals = new Set<string>();
  let highest = 0;
  const RISK_RANK: Record<string, number> = { low: 1, medium: 2, high: 3 };
  for (const s of steps) {
    (s.toolsRequired ?? []).forEach((t: string) => t && allTools.add(t));
    (s.materialsNeeded ?? []).forEach((m: string) => m && allMaterials.add(m));
    (s.qualifications ?? []).forEach((q: string) => q && allQuals.add(q));
    const r = RISK_RANK[s.riskLevel ?? 'medium'] ?? 2;
    if (r > highest) highest = r;
  }
  const overallRisk = highest === 3 ? 'high' : highest === 1 ? 'low' : 'medium';

  const summary = {
    ...(raw?.summary ?? {}),
    totalSteps: steps.length,
    overallRiskLevel: raw?.summary?.overallRiskLevel ?? overallRisk,
    toolsRequired: raw?.summary?.toolsRequired?.length
      ? raw.summary.toolsRequired
      : Array.from(allTools),
    materialsRequired: raw?.summary?.materialsRequired?.length
      ? raw.summary.materialsRequired
      : Array.from(allMaterials),
    requiredQualifications: raw?.summary?.requiredQualifications?.length
      ? raw.summary.requiredQualifications
      : Array.from(allQuals),
    estimatedDuration: raw?.summary?.estimatedDuration ?? estimateTotal(steps),
  };

  return {
    ...raw,
    steps: steps.map((s, i) => ({
      ...s,
      stepNumber: s.stepNumber ?? i + 1,
      riskLevel: s.riskLevel ?? 'medium',
    })),
    summary,
    metadata: {
      ...(raw?.metadata ?? {}),
      generatedAt: new Date().toISOString(),
      citations: ctx.facets.slice(0, 6).map((f) => ({
        regNumber: f.regNumber,
        topic: f.primaryTopic,
        documentType: f.documentType,
      })),
    },
  };
}

function estimateTotal(steps: any[]): string {
  let mins = 0;
  for (const s of steps) {
    const d = String(s.estimatedDuration ?? '').toLowerCase();
    const m = d.match(/(\d+(?:\.\d+)?)\s*(min|hr|hour)/);
    if (!m) continue;
    const n = Number(m[1]);
    if (m[2].startsWith('hr') || m[2].startsWith('hour')) mins += n * 60;
    else mins += n;
  }
  if (mins <= 0) return '—';
  if (mins < 60) return `${Math.round(mins)} mins`;
  const h = Math.floor(mins / 60);
  const r = Math.round(mins % 60);
  return r === 0 ? `${h}h` : `${h}h ${r}m`;
}

/* ─── Job + partials helpers ────────────────────────────────────── */

async function updateJob(
  supabase: any,
  jobId: string,
  patch: Record<string, unknown>
): Promise<void> {
  const { error } = await supabase
    .from('installation_method_jobs')
    .update({ ...patch, updated_at: new Date().toISOString() })
    .eq('id', jobId);
  if (error) console.error('[installation-specialist] updateJob:', error);
}

async function writePartial(
  supabase: any,
  jobId: string,
  stage: string,
  payload: Record<string, unknown>
): Promise<void> {
  const { error } = await supabase
    .from('installation_method_partials')
    .upsert(
      { job_id: jobId, stage, payload, created_at: new Date().toISOString() },
      { onConflict: 'job_id,stage' }
    );
  if (error) console.error('[installation-specialist] writePartial:', error);
}

async function isCancelled(supabase: any, jobId: string): Promise<boolean> {
  const { data } = await supabase
    .from('installation_method_jobs')
    .select('status')
    .eq('id', jobId)
    .maybeSingle();
  return data?.status === 'cancelled';
}

/* ─── Per-step enrichment ───────────────────────────────────────── */

function dedupTruncate(arr: string[], max: number): string[] {
  const seen = new Set<string>();
  const out: string[] = [];
  for (const x of arr) {
    const k = String(x ?? '').trim();
    if (!k) continue;
    const lower = k.toLowerCase();
    if (seen.has(lower)) continue;
    seen.add(lower);
    out.push(k);
    if (out.length >= max) break;
  }
  return out;
}

function avg(nums: number[]): number {
  if (!nums.length) return 0;
  return Math.round((nums.reduce((a, b) => a + b, 0) / nums.length) * 100) / 100;
}

/* ─── Reg-cite validation ───────────────────────────────────────── */

/**
 * Walk every BS 7671 cite in the method statement and verify it
 * actually exists in `bs7671_facets`. Hallucinated reg numbers are
 * stripped silently. Logs the strip rate so we can monitor retrieval
 * quality over time.
 */
async function validateRegCites(
  supabase: any,
  method: any
): Promise<{ method: any; checked: number; stripped: number }> {
  const collected = new Set<string>();
  collectRegs(method, collected);
  if (collected.size === 0) return { method, checked: 0, stripped: 0 };

  const candidates = Array.from(collected);
  const { data, error } = await supabase
    .from('bs7671_facets')
    .select('reg_number')
    .in('reg_number', candidates);
  if (error) {
    console.warn('[installation-specialist] reg validation query failed:', error);
    return { method, checked: candidates.length, stripped: 0 };
  }

  const valid = new Set<string>(
    (data ?? []).map((r: any) => String(r.reg_number ?? '').trim()).filter(Boolean)
  );

  // Walk and filter every cite array in place.
  const stripped = applyRegFilter(method, valid);
  return { method, checked: candidates.length, stripped };
}

function collectRegs(method: any, out: Set<string>): void {
  const push = (val: unknown) => {
    if (typeof val !== 'string') return;
    const trimmed = val.trim();
    if (trimmed) out.add(trimmed);
  };
  if (Array.isArray(method?.steps)) {
    for (const s of method.steps) {
      (s?.bsReferences ?? []).forEach(push);
      (s?.safety ?? []).forEach((x: any) => push(x?.regulation));
    }
  }
  (method?.summary?.criticalRegs ?? []).forEach(push);
  if (Array.isArray(method?.atypicalScenarios)) {
    for (const a of method.atypicalScenarios) {
      (a?.additionalRegs ?? []).forEach(push);
    }
  }
}

function applyRegFilter(method: any, valid: Set<string>): number {
  let stripped = 0;
  const keep = (val: unknown): boolean => {
    if (typeof val !== 'string') return false;
    const t = val.trim();
    if (!t) return false;
    if (valid.has(t)) return true;
    stripped++;
    return false;
  };
  if (Array.isArray(method?.steps)) {
    for (const s of method.steps) {
      if (Array.isArray(s.bsReferences)) {
        s.bsReferences = s.bsReferences.filter(keep);
      }
      if (Array.isArray(s.safety)) {
        s.safety = s.safety.map((x: any) => {
          if (x?.regulation && !valid.has(String(x.regulation).trim())) {
            stripped++;
            const { regulation: _r, ...rest } = x;
            void _r;
            return rest;
          }
          return x;
        });
      }
    }
  }
  if (Array.isArray(method?.summary?.criticalRegs)) {
    method.summary.criticalRegs = method.summary.criticalRegs.filter(keep);
  }
  if (Array.isArray(method?.atypicalScenarios)) {
    for (const a of method.atypicalScenarios) {
      if (Array.isArray(a.additionalRegs)) {
        a.additionalRegs = a.additionalRegs.filter(keep);
      }
    }
  }
  return stripped;
}

/* ─── Special-location seeding ──────────────────────────────────── */

interface SeedRule {
  match: RegExp;
  query: string;
}

/**
 * Special-location detection. When the brief uses trade jargon, cosine
 * similarity can miss the matching BS 7671 Part 7 section. We seed
 * extra targeted searches so the retrieval pool always contains the
 * relevant section facets.
 */
const SEED_RULES: SeedRule[] = [
  {
    match: /\b(ev|electric vehicle|charge\s?point|chargepoint|type\s?2 socket)\b/i,
    query: 'BS 7671 Section 722 Electric Vehicle Charging Installations',
  },
  {
    match: /\b(bathroom|shower|wet room|wetroom|en[\s-]?suite)\b/i,
    query: 'BS 7671 Section 701 Locations Containing a Bath or Shower zones',
  },
  {
    match: /\b(swimming pool|pool|hydromassage|spa)\b/i,
    query: 'BS 7671 Section 702 Swimming Pools and Other Basins',
  },
  { match: /\b(sauna)\b/i, query: 'BS 7671 Section 703 Rooms Containing Sauna Heaters' },
  {
    match: /\b(construction\s+site|building site|temporary supply)\b/i,
    query: 'BS 7671 Section 704 Construction and Demolition Site Installations',
  },
  {
    match: /\b(agricultural|horticultural|farm|stable|livestock)\b/i,
    query: 'BS 7671 Section 705 Agricultural and Horticultural Premises',
  },
  {
    match: /\b(caravan|camping|caravan\s+park|motor\s?home|tourer)\b/i,
    query: 'BS 7671 Section 708 Caravan and Camping Park Installations',
  },
  { match: /\b(marina|berth|pleasure craft|jetty)\b/i, query: 'BS 7671 Section 709 Marinas' },
  {
    match: /\b(medical|patient|operating theatre|treatment room)\b/i,
    query: 'BS 7671 Section 710 Medical Locations',
  },
  {
    match: /\b(exhibition|show stand|trade fair)\b/i,
    query: 'BS 7671 Section 711 Exhibitions, Shows and Stands',
  },
  {
    match: /\b(pv|solar|photovoltaic|solar\s+pv)\b/i,
    query: 'BS 7671 Section 712 Solar Photovoltaic Power Supply Systems',
  },
  {
    match: /\b(led strip|extra[\s-]?low voltage lighting|elv lighting)\b/i,
    query: 'BS 7671 Section 715 Extra-Low-Voltage Lighting Installations',
  },
  {
    match: /\b(mobile or transportable|caravan vehicle|portable cabin)\b/i,
    query: 'BS 7671 Section 717 Mobile or Transportable Units',
  },
  {
    match: /\b(floor heating|underfloor heating|ufh|ceiling heating)\b/i,
    query: 'BS 7671 Section 753 Floor and Ceiling Heating Systems',
  },
  {
    match: /\b(rewire|full rewire|consumer unit replacement)\b/i,
    query:
      'BS 7671 Chapter 41 Protection Against Electric Shock and Section 421 Protection Against Fire',
  },
  {
    match: /\b(eicr|periodic inspection)\b/i,
    query: 'BS 7671 Part 6 Inspection and Testing periodic verification',
  },
  {
    match: /\b(garage|outbuilding|annex|annexe|workshop)\b/i,
    query: 'BS 7671 outbuilding sub-main TT TN earthing',
  },
];

function detectSpecialLocationQueries(brief: string): string[] {
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
