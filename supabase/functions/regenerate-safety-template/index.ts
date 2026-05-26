/**
 * Regenerate Safety Template — admin one-off content upgrade.
 *
 * Takes a template id (or batch of ids), reads name + category + work_type
 * from `safety_document_templates`, runs the same RAG-grounded H&S
 * prompt the AI RAMS Generator uses, and saves the full-depth output
 * to `structured_content_v2`.
 *
 * v1 (`structured_content`) stays untouched for back-compat. The
 * template viewer / editor / PDF will prefer v2 when present.
 *
 * Admin-only (verified via auth.uid() ∈ allowed set).
 */

/* eslint-disable @typescript-eslint/no-explicit-any */

import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.49.4';
import { searchFacets, formatFacetsForPrompt } from '../_shared/bs7671-facets-rag.ts';
import {
  searchSafetyFacets,
  formatSafetyFacetsForPrompt,
} from '../_shared/safety-facets-rag.ts';
import {
  searchPracticalWorkV2,
  formatPracticalWorkForPrompt,
} from '../_shared/rag-practical-work.ts';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers':
    'authorization, x-client-info, apikey, content-type, x-supabase-timeout, x-request-id',
};

const MODEL = 'gpt-5.4-mini-2026-03-17';
const MAX_TOKENS = 24000;

// Andrew's user id (from CLAUDE.md memory) — only admin allowed to run this.
const ADMIN_USER_IDS = new Set<string>([
  'b0113c59-8611-4c5e-8503-1797a75bb64f',
]);

declare const EdgeRuntime:
  | { waitUntil: (p: Promise<unknown>) => void }
  | undefined;

type WorkType = 'domestic' | 'commercial' | 'industrial';

interface TemplateRow {
  id: string;
  name: string;
  category: string;
  work_type: string | null;
  structured_content: any;
}

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabase = createClient(
      Deno.env.get('SUPABASE_URL')!,
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!
    );

    // Three auth paths, in order of preference:
    //  (1) X-Admin-Token header matching TEMPLATE_REGEN_TOKEN env secret — for
    //      out-of-band admin batch jobs.
    //  (2) Authorization service-role bearer — for server-to-server triggers.
    //  (3) Authorization user JWT where user.id is in ADMIN_USER_IDS — for the app UI.
    const adminTokenHeader = req.headers.get('X-Admin-Token') ?? '';
    const adminTokenEnv = Deno.env.get('TEMPLATE_REGEN_TOKEN') ?? '';
    const isAdminToken = !!adminTokenEnv && adminTokenHeader === adminTokenEnv;

    if (!isAdminToken) {
      const authHeader = req.headers.get('Authorization');
      if (!authHeader) return json({ error: 'No authorization header' }, 401);

      const headerToken = authHeader.replace('Bearer ', '').trim();
      const serviceRoleKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? '';
      const isServiceRole = !!serviceRoleKey && headerToken === serviceRoleKey;

      if (!isServiceRole) {
        const {
          data: { user },
          error: authError,
        } = await supabase.auth.getUser(headerToken);
        if (authError || !user) return json({ error: 'Unauthorized' }, 401);
        if (!ADMIN_USER_IDS.has(user.id)) return json({ error: 'Admin only' }, 403);
      }
    }

    const body = await req.json().catch(() => ({}));
    const templateIds: string[] = body?.templateIds ?? (body?.templateId ? [body.templateId] : []);
    if (!templateIds.length) return json({ error: 'templateIds required' }, 400);

    // Background — 15 × ~60s won't fit in a synchronous request.
    // Caller gets 202 immediately; processing continues. Progress is
    // tracked by reading safety_document_templates.regenerated_at /
    // version per row.
    const work = (async () => {
      for (const id of templateIds) {
        try {
          const { data: template, error: fetchErr } = await supabase
            .from('safety_document_templates')
            .select('id, name, category, work_type, structured_content')
            .eq('id', id)
            .maybeSingle();
          if (fetchErr || !template) {
            console.error(`[regenerate-safety-template] not found: ${id}`);
            continue;
          }

          const workType = (template.work_type ?? 'commercial') as WorkType;
          console.log(
            `[regenerate-safety-template] starting ${id} (${template.name} / ${workType})`
          );
          const upgraded = await regenerateTemplate(
            supabase,
            template as TemplateRow,
            workType
          );

          const { error: updateErr } = await supabase
            .from('safety_document_templates')
            .update({
              structured_content_v2: upgraded,
              version: 2,
              regenerated_at: new Date().toISOString(),
            })
            .eq('id', id);
          if (updateErr) {
            console.error(`[regenerate-safety-template] update failed for ${id}:`, updateErr);
          } else {
            console.log(`[regenerate-safety-template] ✓ ${id} (${template.name})`);
          }
        } catch (err: any) {
          console.error(`[regenerate-safety-template] ${id} failed:`, err);
        }
      }
      console.log(
        `[regenerate-safety-template] batch complete (${templateIds.length} templates)`
      );
    })();

    if (typeof EdgeRuntime !== 'undefined') {
      EdgeRuntime.waitUntil(work);
    } else {
      void work;
    }

    return json(
      {
        status: 'started',
        templateCount: templateIds.length,
        message: 'Regeneration running in background. Poll safety_document_templates.regenerated_at to track progress.',
      },
      202
    );
  } catch (err: any) {
    console.error('[regenerate-safety-template] fatal:', err);
    return json({ error: err?.message ?? 'Unknown error' }, 500);
  }
});

/* ──────────────────────────────────────────────────────────────────
   Regeneration engine — RAG → AI → structured v2 content
   ────────────────────────────────────────────────────────────────── */

async function regenerateTemplate(
  supabase: any,
  template: TemplateRow,
  workType: WorkType
): Promise<any> {
  const apiKey = Deno.env.get('OPENAI_API_KEY');
  if (!apiKey) throw new Error('OPENAI_API_KEY not configured');

  // Brief composed from template metadata. Templates are by-category
  // generic, not job-specific, so the brief stays at the work-type level.
  const brief = `${template.name} — UK electrical safety document template for the ${workType} work environment. Category: ${template.category}.`;

  const ragQuery =
    `${brief} electrical installation hazard risk assessment control ` +
    `measures method statement BS 7671 HSE`;

  const [bs7671Facets, safetyFacets, practical] = await Promise.all([
    searchFacets(supabase, { query: ragQuery, matchCount: 10 }),
    searchSafetyFacets(supabase, { query: ragQuery, matchCount: 18 }),
    searchPracticalWorkV2(supabase, {
      query: ragQuery,
      matchCount: 14,
      facetTypes: ['installation', 'testing', 'commissioning', 'maintenance'],
      appliesTo: [workType],
    }),
  ]);

  const isMethodStatement =
    template.category === 'Method Statement' || /method statement/i.test(template.name);

  const systemPrompt = buildSystemPrompt({ workType, isMethodStatement });
  const userBlock = [
    `# Template`,
    `Name: ${template.name}`,
    `Category: ${template.category}`,
    `Work type: ${workType}`,
    ``,
    `# Brief`,
    brief,
    `\n# BS 7671 facets — use ONLY these for electrical reg cites (do not invent)`,
    formatFacetsForPrompt(bs7671Facets),
    `\n# Safety facets (HSG / CDM / EAW / PUWER / NEBOSH) — use ONLY these for HSE cites`,
    formatSafetyFacetsForPrompt(safetyFacets),
    `\n# Practical work facets`,
    formatPracticalWorkForPrompt(practical),
    `\n# Today's date`,
    new Date().toISOString().split('T')[0],
  ].join('\n');

  const response = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: { Authorization: `Bearer ${apiKey}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({
      model: MODEL,
      max_completion_tokens: MAX_TOKENS,
      response_format: { type: 'json_object' },
      messages: [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: userBlock },
      ],
    }),
  });
  if (!response.ok) {
    const errText = await response.text();
    throw new Error(`OpenAI ${response.status}: ${errText.slice(0, 400)}`);
  }
  const j = await response.json();
  const text = j?.choices?.[0]?.message?.content ?? '';
  let parsed: any;
  try {
    parsed = JSON.parse(text);
  } catch (e) {
    throw new Error('Malformed JSON from OpenAI');
  }

  // Stamp version + ensure ids are stable + preserve fields[] from v1
  parsed.version = 2;
  parsed.work_type = workType;
  parsed.document_type = isMethodStatement ? 'method_statement' : 'risk_assessment';
  parsed.regenerated_at = new Date().toISOString();
  // Carry the same input fields from v1 so the adopt-form still works.
  parsed.fields = template.structured_content?.fields ?? defaultFields();

  // Ensure hazard ids are stable
  if (Array.isArray(parsed.hazards)) {
    parsed.hazards = parsed.hazards.map((h: any, i: number) => ({
      ...h,
      id: h.id ?? `hazard-${i + 1}`,
      hazard_number: h.hazard_number ?? i + 1,
    }));
  }
  if (Array.isArray(parsed.method_steps)) {
    parsed.method_steps = parsed.method_steps.map((s: any, i: number) => ({
      ...s,
      id: s.id ?? `step-${i + 1}`,
      step_number: s.step_number ?? i + 1,
    }));
  }

  return parsed;
}

function defaultFields() {
  return [
    { id: 'company_name', type: 'text', label: 'Company Name', required: true },
    { id: 'site_address', type: 'text', label: 'Site Address', required: true },
    {
      id: 'date',
      type: 'date',
      label: 'Assessment Date',
      required: true,
      default_value: 'today',
    },
    {
      id: 'assessor_name',
      type: 'text',
      label: 'Assessor Name',
      required: true,
      placeholder: 'Full name of assessor',
    },
    { id: 'review_date', type: 'date', label: 'Review Date', required: false },
  ];
}

function buildSystemPrompt(args: { workType: WorkType; isMethodStatement: boolean }) {
  const VOICE_RULES = `Voice and register:
- Imperative for action / control measures ("Isolate the supply at the origin").
- Passive for verifications and acceptance ("shall be verified by").
- Third person — "the operative" / "the competent person" / "the site supervisor".
- Specifics over generalities — name values (IR ≥1 MΩ at 500 V dc, IP ratings, named instruments).
- BS 7671 cites inline as [411.3.1.1]; HSE / HSG cites as [HSG253] or [CDM 2015 reg 13].
- "Shall" = mandatory. "Should" = strongly advised. "May" = permissible.
- UK English only. Cite document codes exactly as they appear in the source library blocks.`;

  return `You are a Senior Chartered Health & Safety Practitioner (CMIOSH) and NICEIC Approved Electrician. You are upgrading a generic UK electrical safety document TEMPLATE to publication-grade. The output will be adopted by hundreds of UK electrical contractors as a starting point for their own RAMS — it must be exemplary.

${VOICE_RULES}

Output strict JSON. UK English. Document-grade. No markdown.

Schema:
{
  "executive_summary": string,                            // 5-7 sentences — scope, headline hazards, key statutory references, residual risk position
  "rationale": string,                                    // 2-3 sentences — why this template exists, what work it covers
  "scope": string,                                        // 3-5 sentences — boundaries of the work covered
  "preparation": {
    "competency_required": string[],                      // 3-5 — qualifications, cards, training tickets
    "permits_required": string[],                         // 0-5 — Permit-to-Work, hot works, confined space, electrical isolation
    "documentation_required": string[],                   // 3-5 — drawings, asbestos register, induction record, prior EICR
    "site_access": string[],                              // 2-4 — induction, parking, exclusion zones
    "ppe_baseline": string[]                              // 5-8 — minimum PPE for any worker on this job
  },
  "hazards": Array<{
    "id": string,                                         // "hazard-1", "hazard-2", …
    "hazard_number": number,
    "hazard": string,                                     // noun phrase, 8-14 words
    "rationale": string,                                  // 3-5 sentences — mechanism of harm, who exposed, when
    "who_at_risk": string[],                              // 2-5 — operative, principal contractor, public, designer
    "likelihood": 1 | 2 | 3 | 4 | 5,                      // pre-control
    "severity": 1 | 2 | 3 | 4 | 5,                        // pre-control
    "risk_rating": number,                                // pre-control product
    "controls": Array<{                                   // 5-9 controls, ordered by control hierarchy
      "order": number,
      "tier": "eliminate" | "substitute" | "engineer" | "admin" | "ppe",
      "control": string,                                  // imperative, 8-16 words
      "detail": string,                                   // 30-50 words — HOW the control is implemented + success criterion
      "responsible_role": string                          // "Site supervisor" / "Operative" / "Principal contractor"
    }>,
    "residual_likelihood": 1 | 2 | 3 | 4 | 5,
    "residual_severity": 1 | 2 | 3 | 4 | 5,
    "residual_risk_rating": number,                       // post-control product (must be ≤ risk_rating)
    "ppe_required": string[],                             // 3-6 specific PPE items (e.g. "Class 0 insulating gloves to BS EN 60903")
    "competence_required": string[],                      // 1-3 e.g. "Approved Electrician, City & Guilds 2391"
    "bs7671_cites": string[],                             // 1-4 BS 7671 reg numbers from the facets block — DO NOT INVENT
    "safety_cites": string[],                             // 2-5 HSG / CDM / regulation cites from the safety facets block — DO NOT INVENT
    "training_required": string[],                        // 1-3 training tickets / inductions
    "monitoring_checks": string[],                        // 2-4 in-progress monitoring activities
    "evidence_required": string[],                        // 2-4 photos / sign-offs / test results
    "stop_work_triggers": string[]                        // 2-4 conditions mandating stopping work and re-assessing
  }>,
  ${
    args.isMethodStatement
      ? `"method_steps": Array<{
    "id": string,
    "step_number": number,
    "title": string,                                      // imperative, 6-10 words
    "description": string,                                // 200-400 words — HOW the step is performed, named instruments, named values (currents, voltages, IR thresholds, torque settings), inspection points, expected outcomes. Reference BS 7671 reg numbers inline as [411.3.1.1] etc.
    "safety_requirements": string[],                      // 3-6
    "equipment_needed": string[],                         // 4-8 specific tools / meters / fixings
    "qualifications": string[],                           // 1-3
    "estimated_duration": string,                         // e.g. "45 minutes"
    "risk_level": "low" | "medium" | "high",
    "linked_hazard_ids": string[]                         // ids from hazards[] that this step touches
  }>,
  "tools_required": string[],                             // 10-18 aggregated across steps
  "materials_required": string[],                        // 8-16
  "practical_tips": string[],                             // 5-8 field-tested wisdom
  "common_mistakes": string[],                            // 5-8 known failure modes
  "total_estimated_time": string,
  "difficulty_level": "basic" | "intermediate" | "advanced",`
      : ''
  }
  "site_logistics": {
    "vehicle_access": string,
    "parking": string,
    "material_storage": string,
    "waste_management": string,
    "welfare_facilities": string,
    "site_restrictions": string
  },
  "emergency_procedures": string[],                       // 6-10 covering first aid, electrical incident, fire, spill, near miss, contacts
  "ppe_grid": Array<{                                     // baseline PPE summary across all hazards
    "name": string,
    "specification": string,                              // standard e.g. "EN ISO 20345 S3" — must be specific
    "required": boolean,
    "purpose": string                                     // 1 sentence
  }>,
  "compliance_regulations": string[],                     // 6-10 cite strings — mix of BS 7671 + HSE — from facets blocks
  "compliance_warnings": string[],                        // 3-5 plain-English warnings about non-compliance consequences
  "competence_requirements": Array<{ key: string; value: string }>,  // 4-6 entries — qualifications, scheme membership, training, experience
  "regulatory_references": string[],                      // 5-8 — full document titles
  "signature_block": {
    "entries": Array<{ role: string }>                    // 3-4 roles requiring signature — Assessor, Reviewed by, Site supervisor, Client
  }
}

Hard rules:
- MINIMUM 16 hazards, MAXIMUM 22. Distinct mechanism of harm each. NO duplicates.
- ALWAYS include where applicable: (a) electric shock from contact with live parts, (b) arc flash, (c) failure to safely isolate and prove dead, (d) re-energisation under fault, (e) slips/trips/falls, (f) manual handling, (g) cuts/abrasions, (h) tools/equipment failure / dropped objects.
- ALWAYS include if triggered by work type: confined space, hot works, work at height ≥1 m, lone working, asbestos disturbance, dust, noise ≥80 dB(A), public access.
- Risk score thresholds: 1-4 low, 5-9 medium, 10-15 high, 16-25 unacceptable.
- HSE 5×5 matrix.
- Sort hazards by risk_rating DESC.
- bs7671_cites MUST appear in the BS 7671 facets block. Do not invent.
- safety_cites MUST appear in the safety facets block. Do not invent. Omit rather than guess.
- residual_risk_rating ≤ risk_rating for every hazard.
- Every control must have a 30-50 word detail. NO single-line controls.
- For electrical hazards: name the test (e.g. "GS38 prove-dead with approved 2-pole indicator", "MFT insulation resistance ≥1.0 MΩ at 500 V dc").
- detail field must be specific to THIS hazard, not generic.
${args.isMethodStatement ? `- 14-20 method steps. Each step description MUST be 200-400 words with named instruments + named values + inline BS 7671 cites.` : ''}
- Acceptance criteria must be quantified — never "satisfactory".`;
}

function json(body: unknown, status = 200): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: { ...corsHeaders, 'Content-Type': 'application/json' },
  });
}
