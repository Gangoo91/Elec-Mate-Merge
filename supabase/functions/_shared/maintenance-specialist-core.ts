/**
 * Maintenance Specialist core — two-pass parallel pipeline.
 *
 * Mirrors `installation-specialist-core.ts` exactly:
 *   1. Read the job + parse attachments (PDF text + image signed URLs).
 *   2. Optional vision pass on photos / nameplate / schematic images.
 *   3. Parallel RAG: BS 7671 facets + practical_work_intelligence v2
 *      (facet_types: ['maintenance', 'testing']) + special-location seeds.
 *   4a. Pass 1 — outline only (16-22 step skeletons + executiveSummary,
 *       preparation, handover, atypical scenarios, summary).
 *   4b. Pass 2 — per-step deep fill, parallel concurrency 6. Each step
 *       gets its own focused RAG slice and own AI call.
 *   4c. Validation — every BS 7671 cite is checked against bs7671_facets.
 *       Hallucinated regs are stripped silently; strip rate logged.
 *   5. Finalise: write method_data + status='completed'.
 *
 * Streaming: every stage writes to `maintenance_method_partials` so the
 * frontend renders live progress + a step preview.
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
  equipment_details: any;
  detail_level: string | null;
  attachments: AttachmentInput[] | null;
  refine_of: string | null;
}

export async function runMaintenanceMethod(supabase: any, jobId: string): Promise<void> {
  const start = Date.now();
  try {
    const { data: job, error } = await supabase
      .from('maintenance_method_jobs')
      .select('id, user_id, query, equipment_details, detail_level, attachments, refine_of')
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

    // 1) Attachments — PDFs + photos + asset sheets.
    const attachments = job.attachments ?? [];
    const ingest = attachments.length
      ? await ingestAttachments(supabase, attachments)
      : { pdfText: '', images: [], errors: [] };

    if (ingest.errors.length) {
      console.warn('[maintenance-specialist] ingest errors:', ingest.errors);
    }

    await writePartial(supabase, jobId, 'briefing', {
      pdfChars: ingest.pdfText.length,
      imageCount: ingest.images.length,
      installationType: job.equipment_details?.installationType ?? 'commercial',
    });

    if (await isCancelled(supabase, jobId)) return;
    await updateJob(supabase, jobId, {
      progress: 18,
      current_step: 'Reading drawings & nameplates',
    });

    // 2) Optional vision on schematics / nameplate photos.
    let imageReading = '';
    if (ingest.images.length) {
      try {
        const reading = await readFloorplans(ingest.images);
        imageReading = formatReadingForExtraction(reading);
      } catch (err) {
        console.warn('[maintenance-specialist] image vision failed:', err);
      }
    }

    if (await isCancelled(supabase, jobId)) return;
    await updateJob(supabase, jobId, { progress: 32, current_step: 'Grounding against BS 7671' });

    // 3) Parallel RAG.
    const ragQuery = buildRagQuery(job, ingest.pdfText, imageReading);
    const installationType = (job.equipment_details?.installationType ?? 'commercial') as
      | 'domestic'
      | 'commercial'
      | 'industrial';

    const sectionSeedQueries = detectSpecialMaintenanceQueries(ragQuery);

    const [facets, practical, ...sectionFacetsArr] = await Promise.all([
      searchFacets(supabase, { query: ragQuery, matchCount: 14 }),
      searchPracticalWorkV2(supabase, {
        query: ragQuery,
        matchCount: 22,
        facetTypes: ['maintenance', 'testing'],
        appliesTo: [installationType],
      }),
      ...sectionSeedQueries.map((q) => searchFacets(supabase, { query: q, matchCount: 4 })),
    ]);

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

    // 4a) Pass 1 — outline.
    let methodData = await generateOutline({
      job,
      pdfText: ingest.pdfText,
      imageReading,
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

    // 4b) Pass 2 — per-step deep fill with focused RAG.
    if (Array.isArray(methodData?.steps) && methodData.steps.length > 0) {
      methodData.steps = await fillStepsInParallel(supabase, methodData.steps, {
        job,
        installationType,
      });
      await writePartial(supabase, jobId, 'enrichment', {
        stepCount: methodData.steps.length,
        avgRegsPerStep: avg(methodData.steps.map((s: any) => (s.bsReferences ?? []).length)),
        avgSubStepsPerStep: avg(methodData.steps.map((s: any) => (s.subSteps ?? []).length)),
        avgChecksPerStep: avg(
          methodData.steps.map((s: any) => (s.inspectionCheckpoints ?? []).length)
        ),
      });
    }

    if (await isCancelled(supabase, jobId)) return;
    await updateJob(supabase, jobId, { progress: 82, current_step: 'Verifying BS 7671 cites' });

    // 4c) Validation — strip hallucinated reg cites.
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
        `[maintenance-specialist] stripped ${validation.stripped}/${validation.checked} hallucinated reg cites`
      );
    }

    if (await isCancelled(supabase, jobId)) return;
    await updateJob(supabase, jobId, { progress: 88, current_step: 'Finalising method statement' });

    // 5) Finalise.
    await updateJob(supabase, jobId, {
      status: 'completed',
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
    console.error('[maintenance-specialist] worker error:', err);
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
  const ed = job.equipment_details ?? {};
  if (ed.equipmentType) parts.push(ed.equipmentType);
  if (ed.equipmentMakeModel) parts.push(ed.equipmentMakeModel);
  if (ed.installationType) parts.push(ed.installationType);
  if (job.query) parts.push(job.query);
  if (pdfText) parts.push(pdfText.slice(0, 1500));
  if (imageReading) parts.push(imageReading.slice(0, 800));
  parts.push('maintenance inspection testing periodic verification BS 7671 Part 6');
  return parts.join(' ').slice(0, 4000);
}

/* ─── Pass 1 — outline ──────────────────────────────────────────── */

const VOICE_RULES = `Voice and register:
- Imperative for actions ("Isolate the supply at the origin").
- Passive for verifications and acceptance ("shall be verified by", "is to be recorded on").
- Third person. Never "you", "I", or "we". The subject is "the operative" / "the competent person" / "the supervisor".
- No conversational asides. No apprentice-style explanation. No rhetorical questions.
- Specifics over generalities: name values (torque, csa, 500 V dc, ≥1.0 MΩ, 0.4 s), tests (IR, R1+R2, Zs, RCD x1/x5/ramp, polarity), documents (Schedule of Inspections, Schedule of Test Results, EICR, condition report, asset register).
- Regulation cites belong inline as bracketed reg numbers, e.g. [411.3.1.1].
- "Shall" = mandatory. "Should" = strongly advised. "May" = permissible alternative.
- Acceptance criteria must be quantified (e.g. "≥1.0 MΩ at 500 V dc"), not "satisfactory".
- UK terminology: "consumer unit" not "panelboard", "RCBO" not "GFCI breaker", "MET" not "earth bus", "EICR" not "PIR".
- Cite reg numbers exactly as they appear in the facets block.`;

async function generateOutline(args: {
  job: JobRow;
  pdfText: string;
  imageReading: string;
  facets: BS7671Facet[];
  practical: PracticalWorkFacet[];
}): Promise<any> {
  const { job, pdfText, imageReading, facets, practical } = args;
  const apiKey = Deno.env.get('OPENAI_API_KEY');
  if (!apiKey) throw new Error('OPENAI_API_KEY not configured');

  const systemPrompt = `You are a Senior NICEIC Approved Electrician and Authorising Engineer drafting the OUTLINE of a FORMAL MAINTENANCE METHOD STATEMENT. The document is issued to the operative carrying out the maintenance, counter-signed before work commences, retained in the project file, and may be audited by NICEIC, the duty-holder, or HSE.

This first pass produces the structural skeleton ONLY. Each step has a title, purpose, risk level and high-level duration. Sub-steps / safety / tools / acceptance criteria / common defects / evidence are filled in by a separate per-step pass — do NOT fill those fields here.

You also draft the top-level sections fully: executiveSummary, preparation, handover, atypicalScenarios, summary.

Output strict JSON matching the schema below. UK English. Document-grade. No markdown.

${VOICE_RULES}

Schema:
{
  "jobTitle": string,                              // 8-14 words — what's being maintained
  "executiveSummary": string,                      // 3-5 sentences for the printed cover page — scope, headline regs, target outcome, criticality
  "installationGuide": string,                     // 2-4 sentences — purpose of this document
  "installationType": "domestic" | "commercial" | "industrial",
  "preparation": {
    "competencyVerification": string[],            // 2-4 items
    "siteAccess": string[],                        // 2-4 items
    "documentationRequired": string[],             // 2-4 items — asset register, last EICR, last PPM record, manufacturer manual
    "permitsRequired": string[]                    // 0-4 items — Permit-to-Work, Authorised Person nomination, hot work, confined space
  },
  "steps": Array<{
    "stepNumber": number,
    "title": string,                               // imperative, 6-10 words
    "purpose": string,                             // 1-2 sentences — WHY this step exists
    "estimatedDuration": string,                   // e.g. "30 mins"
    "riskLevel": "low" | "medium" | "high"
  }>,
  "handover": {
    "documentationToProvide": string[],            // 3-6 items — EICR / condition report / inspection certificate / updated asset register
    "clientWalkthrough": string[],                 // 2-5 items — what to demonstrate, defects to highlight
    "ongoingMaintenance": string[]                 // 2-5 items — recommended next-due intervals, replacement criteria
  },
  "atypicalScenarios": Array<{                     // 1-3 items — variants the engineer might find on site
    "scenario": string,                            // e.g. "Existing TT system found instead of TN-C-S"
    "additionalSteps": string,
    "additionalRegs": string[]                     // exact reg numbers from facets block
  }>,
  "summary": {
    "totalSteps": number,
    "estimatedDuration": string,
    "requiredQualifications": string[],
    "overallRiskLevel": "low" | "medium" | "high",
    "criticalRegs": string[]                       // 3-5 most load-bearing regs
  }
}

Hard rules for the step list:
- 14-22 steps. Match the maintenance type — pad never, crop never.
- Step 1 covers safe-system-of-work: isolation at the origin, secure isolation (lockout/tagout) and proof-dead per GS38.
- Step 2 covers verification of earthing arrangement and main protective bonding sufficiency before any inspection.
- Penultimate step covers the formal inspection + testing / EICR observation coding per BS 7671 Part 6.
- Final step covers client hand-over, observation walkthrough and the documentation pack (condition report, updated asset register, recommended retest date).
- Risk levels: low = visual inspection / paperwork; medium = live-adjacent measurement / working at height; high = LV switchgear maintenance / confined space / energised work / TT system retest.`;

  const userBlock = [
    `# Brief\n${job.query?.trim() ?? ''}`,
    job.equipment_details
      ? `# Equipment & project\n${JSON.stringify(job.equipment_details, null, 0)}`
      : '',
    pdfText ? `# Attached spec / asset register / PDF text\n${pdfText.slice(0, 6000)}` : '',
    imageReading ? `# Image reading\n${imageReading.slice(0, 1500)}` : '',
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
    console.error('[maintenance-specialist] outline parse failed', err, text.slice(0, 400));
    throw new Error('Outline JSON was malformed.');
  }
}

/* ─── Pass 2 — per-step deep fill ───────────────────────────────── */

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
        console.warn('[maintenance-specialist] step fill failed', i, err);
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

  const stepQuery = [outlineStep.title, outlineStep.purpose, ctx.job.query?.slice(0, 200)]
    .filter(Boolean)
    .join(' ');

  const [facets, practical] = await Promise.all([
    searchFacets(supabase, { query: stepQuery, matchCount: 5 }),
    searchPracticalWorkV2(supabase, {
      query: stepQuery,
      matchCount: 6,
      facetTypes: ['maintenance', 'testing'],
      appliesTo: [ctx.installationType],
    }),
  ]);

  const systemPrompt = `You are filling in ONE step of a FORMAL MAINTENANCE METHOD STATEMENT. The skeleton (title, purpose, risk, duration) is fixed — do not change it. Your job is to author the operational detail at industry-grade depth.

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
    "detail": string                               // 30-50 words — values, intervals, instrument settings, named tools/methods
  }>,
  "durationBreakdown": {
    "preparation": string,
    "execution": string,
    "verification": string
  },
  "safety": Array<{                                // 3-6 items
    "note": string,                                // hazard + control, 12-25 words
    "regulation"?: string,                         // exact reg from facets
    "severity"?: "info" | "warning" | "critical"
  }>,
  "toolsRequired": string[],                       // 4-9 short item names with calibration / model where relevant
  "materialsNeeded": string[],                     // 0-10 with mm/A specs
  "qualifications": string[],                      // 1-3 e.g. "Approved Electrician (City & Guilds 2391)"
  "bsReferences": string[],                        // 2-5 reg numbers, exact strings from the facets block
  "criticalDecisions": string[],                   // 2-4 site-time choices
  "commonMistakes": string[],                      // 2-4 failure modes from practical-work facets, framed as "Avoid … because …"
  "evidenceRequired": string[],                    // 2-4 photos / sign-offs / test-result captures
  "inspectionCheckpoints": Array<{                 // 2-5 items
    "check": string,
    "acceptanceCriteria": string,                  // quantified
    "documentRequired": string                     // EICR / condition report / asset register / hand-over pack
  }>
}

Hard rules:
- Reg numbers in bsReferences MUST appear in the facets block. Do not invent.
- ≥2 BS 7671 cites.
- ≥5 sub-steps.
- ≥2 commonMistakes derived from the practical-work facets.
- ≥2 evidenceRequired entries.
- For testing/measurement steps, name the instrument (MFT, clamp meter, IR tester) and the test value (500 V dc, 250 V dc, 1 mA, etc.).
- For inspection steps, name the BS 7671 Part 6 schedule line item being recorded.
- Sub-step "detail" must be specific to this step's task — not generic boilerplate.`;

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
    ctx.job.equipment_details
      ? `# Equipment\n${JSON.stringify(ctx.job.equipment_details, null, 0)}`
      : '',
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
  return {
    ...parsed,
    stepNumber,
    title: outlineStep.title,
    purpose: outlineStep.purpose,
    estimatedDuration: outlineStep.estimatedDuration,
    riskLevel: outlineStep.riskLevel ?? parsed.riskLevel ?? 'medium',
  };
}

/* ─── Post-processing + summary aggregation ─────────────────────── */

function enrichMethodStatement(raw: any, ctx: { facets: BS7671Facet[] }): any {
  const steps: any[] = Array.isArray(raw?.steps) ? raw.steps : [];

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
      kind: 'maintenance',
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
    .from('maintenance_method_jobs')
    .update({ ...patch, updated_at: new Date().toISOString() })
    .eq('id', jobId);
  if (error) console.error('[maintenance-specialist] updateJob:', error);
}

async function writePartial(
  supabase: any,
  jobId: string,
  stage: string,
  payload: Record<string, unknown>
): Promise<void> {
  const { error } = await supabase
    .from('maintenance_method_partials')
    .upsert(
      { job_id: jobId, stage, payload, created_at: new Date().toISOString() },
      { onConflict: 'job_id,stage' }
    );
  if (error) console.error('[maintenance-specialist] writePartial:', error);
}

async function isCancelled(supabase: any, jobId: string): Promise<boolean> {
  const { data } = await supabase
    .from('maintenance_method_jobs')
    .select('status')
    .eq('id', jobId)
    .maybeSingle();
  return data?.status === 'cancelled';
}

function avg(nums: number[]): number {
  if (!nums.length) return 0;
  return Math.round((nums.reduce((a, b) => a + b, 0) / nums.length) * 100) / 100;
}

/* ─── Reg-cite validation ───────────────────────────────────────── */

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
    console.warn('[maintenance-specialist] reg validation query failed:', error);
    return { method, checked: candidates.length, stripped: 0 };
  }

  const valid = new Set<string>(
    (data ?? []).map((r: any) => String(r.reg_number ?? '').trim()).filter(Boolean)
  );

  const stripped = applyRegFilter(method, valid);
  return { method, checked: candidates.length, stripped };
}

function collectRegs(method: any, out: Set<string>): void {
  const push = (val: unknown) => {
    if (typeof val !== 'string') return;
    const t = val.trim();
    if (t) out.add(t);
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

/* ─── Special-location / asset-class seeding ────────────────────── */

interface SeedRule {
  match: RegExp;
  query: string;
}

/**
 * Maintenance equivalent of the installation seed rules. We add asset
 * classes that recur in maintenance work — many domestic seeds aren't
 * relevant, but EICR cadence, EV charge points, fire alarm panels and
 * emergency lighting are.
 */
const SEED_RULES: SeedRule[] = [
  {
    match: /\b(eicr|periodic inspection|condition report)\b/i,
    query: 'BS 7671 Part 6 inspection and testing periodic verification observation coding',
  },
  {
    match: /\b(consumer unit|distribution board|panelboard)\b/i,
    query:
      'BS 7671 Chapter 53 protection and isolation devices Section 421 protection against fire',
  },
  {
    match: /\b(rcd|rcbo|residual current)\b/i,
    query: 'BS 7671 Section 415 residual current device functional testing 30 mA',
  },
  {
    match: /\b(ev|electric vehicle|charge\s?point|chargepoint|type\s?2 socket)\b/i,
    query: 'BS 7671 Section 722 Electric Vehicle Charging Installations periodic inspection',
  },
  {
    match: /\b(pv|solar|photovoltaic)\b/i,
    query: 'BS 7671 Section 712 Solar Photovoltaic periodic inspection isolation',
  },
  {
    match: /\b(fire alarm|sounder|smoke detector|heat detector)\b/i,
    query: 'BS 5839-1 fire detection servicing weekly testing user inspection',
  },
  {
    match: /\b(emergency\s?lighting|escape lighting)\b/i,
    query: 'BS 5266 emergency lighting monthly functional annual full duration test',
  },
  {
    match: /\b(lightning protection|surge protection|spd)\b/i,
    query: 'BS 7671 Section 443 surge protection devices verification',
  },
  {
    match: /\b(motor|vfd|inverter|drive)\b/i,
    query: 'motor circuit insulation resistance bearing temperature periodic inspection',
  },
  {
    match: /\b(generator|standby|ups|uninterruptible)\b/i,
    query: 'standby generator UPS periodic load test transfer switch maintenance',
  },
  { match: /\b(sauna)\b/i, query: 'BS 7671 Section 703 Rooms Containing Sauna Heaters' },
  {
    match: /\b(swimming pool|pool|spa)\b/i,
    query: 'BS 7671 Section 702 Swimming Pools and Other Basins',
  },
  {
    match: /\b(bathroom|shower|wet room)\b/i,
    query: 'BS 7671 Section 701 Locations Containing a Bath or Shower zones',
  },
  {
    match: /\b(medical|patient|operating theatre)\b/i,
    query: 'BS 7671 Section 710 Medical Locations IT system isolation monitoring',
  },
  { match: /\b(marina|berth)\b/i, query: 'BS 7671 Section 709 Marinas pedestal inspection' },
  {
    match: /\b(caravan|camping|motor\s?home)\b/i,
    query: 'BS 7671 Section 708 Caravan and Camping Park Installations',
  },
  {
    match: /\b(agricultural|horticultural|livestock|farm|stable)\b/i,
    query: 'BS 7671 Section 705 Agricultural and Horticultural Premises',
  },
];

function detectSpecialMaintenanceQueries(brief: string): string[] {
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
