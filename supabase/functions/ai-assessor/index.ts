// AI Assessor — drafts a verdict + per-AC analysis + assessor feedback for
// a portfolio submission. Streams back to the College Hub so a real
// assessor reviews + edits before signing off.
//
// Pipeline:
//   1. Auth: must be a college user assigned to the learner via
//      college_student_assignments OR same-college staff
//   2. Load: portfolio_submissions row + linked portfolio_items + recent
//      observations + qualification + master ACs for the unit
//   3. Stream OpenAI (gpt-5-mini) with a system prompt that produces:
//        - verdict: pass | partial | refer | not_yet
//        - draft assessor_feedback (markdown)
//        - draft strengths_noted
//        - draft areas_for_improvement
//        - per-AC analysis: which ACs are evidenced / missing / partial
//   4. Output stream events:  open · token · done

import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.57.4';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

const CHAT_MODEL = 'gpt-5-mini-2025-08-07';
const MAX_COMPLETION_TOKENS = 6_000;
const STREAM_TIMEOUT_MS = 120_000;

interface AssessRequest {
  submission_id: string;
  /** Optional caller-provided context, e.g. tutor preset / specific concern */
  instruction?: string;
}

function sseEvent(event: string, data: unknown): Uint8Array {
  return new TextEncoder().encode(`event: ${event}\ndata: ${JSON.stringify(data)}\n\n`);
}

function sseComment(msg: string): Uint8Array {
  return new TextEncoder().encode(`: ${msg}\n\n`);
}

async function authoriseAssessor(req: Request, serviceClient: ReturnType<typeof createClient>) {
  const authHeader = req.headers.get('authorization');
  if (!authHeader) return { user: null, error: 'unauthorized' as const };
  const userClient = createClient(
    Deno.env.get('SUPABASE_URL')!,
    Deno.env.get('SUPABASE_ANON_KEY')!,
    { global: { headers: { Authorization: authHeader } }, auth: { persistSession: false } }
  );
  const { data: userData } = await userClient.auth.getUser();
  if (!userData?.user) return { user: null, error: 'unauthorized' as const };
  const { data: profile } = await serviceClient
    .from('profiles')
    .select('id, college_id, college_role, full_name, role')
    .eq('id', userData.user.id)
    .maybeSingle();
  if (!profile?.college_id) return { user: userData.user, profile: null, error: 'no_college' as const };
  return { user: userData.user, profile, error: null };
}

function buildSystemPrompt(): string {
  return `You are an experienced UK FE college lead assessor for an electrical apprenticeship. \
You are reviewing a portfolio submission to draft an assessor verdict and feedback.

Your job is to:
1. Read the submission, the linked evidence items, recent assessor observations, AND the full curriculum AC list (the master Assessment Criteria for the qualification — you'll see the full LOs and ACs at the bottom of the user message).
2. For each Assessment Criterion (AC) the learner claims to have evidenced, judge whether the evidence in front of you genuinely meets the AC text, partially meets it, or does not yet meet it. Quote relevant AC text in your reasoning. Be specific about what's missing.
3. Look at the full curriculum and identify ACs the learner has NOT claimed yet but must evidence eventually. Surface 2-3 of these as gaps to flag in the areas_for_improvement.
4. Suggest a verdict: "pass" (all claimed ACs evidenced), "partial" (some met, some not), "refer" (not enough — needs resubmission), or "not_yet" (insufficient evidence to judge).
5. Draft three pieces of feedback in clear, supportive UK-English assessor voice:
   - assessor_feedback: 2-4 short paragraphs, plain markdown, addressing the learner directly. State the verdict, summarise what's strong, what needs improving, and the next step.
   - strengths_noted: 2-3 bullet points (markdown list).
   - areas_for_improvement: 2-3 bullet points (markdown list) — include any unclaimed ACs from the curriculum that the learner should look at next.

Tone: professional, encouraging, specific. Reference the actual evidence (e.g. "your earthing photos clearly show…") not generic phrases. Do NOT invent evidence the learner hasn't submitted. If evidence is missing for a claimed AC, say so and suggest exactly what to add.

You MUST return a single JSON object via the provided tool with the schema:
{
  "verdict": "pass" | "partial" | "refer" | "not_yet",
  "verdict_rationale": string,
  "ac_analysis": Array<{
    "ac_code": string,
    "status": "evidenced" | "partial" | "missing",
    "comment": string
  }>,
  "assessor_feedback": string,   // markdown
  "strengths_noted": string,     // markdown bullet list
  "areas_for_improvement": string // markdown bullet list
}

Be concise and useful. The human assessor will edit this draft before signing off.`;
}

interface SubmissionContext {
  submission: Record<string, unknown>;
  items: Array<Record<string, unknown>>;
  observations: Array<Record<string, unknown>>;
  learnerName: string | null;
  qualificationTitle: string | null;
  qualificationCode: string | null;
  /** Full curriculum AC list for the qualification, grouped by unit */
  acRequirements: Array<{
    unit_code: string;
    unit_title: string | null;
    lo_number: string | null;
    lo_text: string | null;
    ac_code: string;
    ac_text: string;
  }>;
}

async function loadContext(
  serviceClient: ReturnType<typeof createClient>,
  submissionId: string
): Promise<SubmissionContext | null> {
  const { data: submission, error: subErr } = await serviceClient
    .from('portfolio_submissions')
    .select(
      'id, user_id, qualification_id, category_id, status, submitted_at, submission_notes, grade, action_required, strengths_noted, areas_for_improvement, submission_count, iqa_sampled, iqa_outcome'
    )
    .eq('id', submissionId)
    .maybeSingle();
  if (subErr || !submission) return null;

  const { data: items } = await serviceClient
    .from('portfolio_items')
    .select(
      'id, title, description, category, file_type, learning_outcomes_met, assessment_criteria_met, reflection_notes, supervisor_feedback, date_completed, evidence_count, is_supervisor_verified'
    )
    .eq('user_id', submission.user_id)
    .order('created_at', { ascending: false })
    .limit(20);

  // Resolve auth.uid → college_students.id so we can read observations
  // (college_observations.college_student_id, NOT auth.uid)
  let collegeStudentRowId: string | null = null;
  {
    const { data: csRow } = await serviceClient
      .from('college_students')
      .select('id')
      .eq('user_id', submission.user_id)
      .maybeSingle();
    collegeStudentRowId = (csRow?.id as string | null) ?? null;
  }

  const { data: observations } = collegeStudentRowId
    ? await serviceClient
        .from('college_observations')
        .select(
          'id, activity_title, activity_summary, outcome, grade, acs_evidenced, ksbs_observed, feedback_strengths, feedback_areas, observed_at'
        )
        .eq('college_student_id', collegeStudentRowId)
        .order('observed_at', { ascending: false })
        .limit(10)
    : { data: [] };

  // Resolve learner name + qualification title for prompt context
  let learnerName: string | null = null;
  const { data: learnerProfile } = await serviceClient
    .from('profiles')
    .select('full_name')
    .eq('id', submission.user_id)
    .maybeSingle();
  if (learnerProfile?.full_name) learnerName = learnerProfile.full_name as string;

  let qualificationTitle: string | null = null;
  let qualificationCode: string | null = null;
  if (submission.qualification_id) {
    const { data: qual } = await serviceClient
      .from('qualifications')
      .select('title, code')
      .eq('id', submission.qualification_id)
      .maybeSingle();
    if (qual) {
      qualificationCode = (qual.code as string | null) ?? null;
      qualificationTitle = `${qual.title}${qual.code ? ` (${qual.code})` : ''}`;
    }
  }

  // Master AC list for the qualification — so the AI knows the FULL curriculum,
  // not just what the learner has claimed in their items.
  let acRequirements: SubmissionContext['acRequirements'] = [];
  if (qualificationCode) {
    const { data: reqs } = await serviceClient
      .from('qualification_requirements')
      .select('unit_code, unit_title, lo_number, lo_text, ac_code, ac_text')
      .eq('qualification_code', qualificationCode)
      .order('unit_code', { ascending: true })
      .order('ac_code', { ascending: true })
      .limit(500);
    acRequirements = (reqs ?? []) as SubmissionContext['acRequirements'];
  }

  return {
    submission: submission as Record<string, unknown>,
    items: (items ?? []) as Array<Record<string, unknown>>,
    observations: (observations ?? []) as Array<Record<string, unknown>>,
    learnerName,
    qualificationTitle,
    qualificationCode,
    acRequirements,
  };
}

function compactContextForPrompt(ctx: SubmissionContext): string {
  const sub = ctx.submission;
  const lines: string[] = [];
  lines.push(`# Submission`);
  lines.push(`Learner: ${ctx.learnerName ?? 'Unknown'}`);
  if (ctx.qualificationTitle) lines.push(`Qualification: ${ctx.qualificationTitle}`);
  lines.push(`Status: ${sub.status as string}`);
  if (sub.submitted_at) lines.push(`Submitted: ${sub.submitted_at as string}`);
  if (sub.submission_count) lines.push(`Attempt: ${sub.submission_count}`);
  if (sub.submission_notes) lines.push(`Learner notes: ${sub.submission_notes as string}`);

  lines.push(`\n# Evidence items (most recent ${ctx.items.length})`);
  for (const it of ctx.items) {
    const acs = (it.assessment_criteria_met as string[] | null) ?? [];
    const los = (it.learning_outcomes_met as string[] | null) ?? [];
    lines.push(`- ${(it.title as string) || 'Untitled'} [${it.category as string}]`);
    if (acs.length) lines.push(`  ACs claimed: ${acs.join(', ')}`);
    if (los.length) lines.push(`  LOs claimed: ${los.join(', ')}`);
    if (it.description) lines.push(`  Description: ${(it.description as string).slice(0, 240)}`);
    if (it.reflection_notes)
      lines.push(`  Reflection: ${(it.reflection_notes as string).slice(0, 240)}`);
    if (it.supervisor_feedback)
      lines.push(`  Supervisor: ${(it.supervisor_feedback as string).slice(0, 200)}`);
    if (it.is_supervisor_verified) lines.push(`  ✓ Supervisor verified`);
  }

  if (ctx.observations.length) {
    lines.push(`\n# Recent assessor observations`);
    for (const o of ctx.observations) {
      const acs = (o.acs_evidenced as string[] | null) ?? [];
      lines.push(
        `- ${o.activity_title as string} → ${o.outcome as string}${o.grade ? ` · ${o.grade}` : ''}`
      );
      if (acs.length) lines.push(`  ACs evidenced: ${acs.join(', ')}`);
      if (o.feedback_strengths)
        lines.push(`  Strengths: ${(o.feedback_strengths as string).slice(0, 200)}`);
      if (o.feedback_areas)
        lines.push(`  Areas: ${(o.feedback_areas as string).slice(0, 200)}`);
    }
  }

  if (ctx.acRequirements.length) {
    lines.push(`\n# Full curriculum — Assessment Criteria for ${ctx.qualificationCode ?? 'this qualification'}`);
    lines.push(`(Use this to spot ACs the learner has NOT yet claimed but must evidence to complete the qualification.)`);
    let lastUnit: string | null = null;
    for (const r of ctx.acRequirements) {
      if (r.unit_code !== lastUnit) {
        lines.push(`\n## Unit ${r.unit_code}${r.unit_title ? ` — ${r.unit_title}` : ''}`);
        lastUnit = r.unit_code;
      }
      const lo = r.lo_number ? `[LO ${r.lo_number}] ` : '';
      lines.push(`- ${r.ac_code}: ${lo}${r.ac_text}`);
    }
  }

  return lines.join('\n');
}

const ASSESSOR_TOOL_SCHEMA = {
  type: 'function',
  function: {
    name: 'submit_assessor_draft',
    description: 'Return the drafted assessor verdict + feedback for the human assessor to review.',
    parameters: {
      type: 'object',
      additionalProperties: false,
      required: [
        'verdict',
        'verdict_rationale',
        'ac_analysis',
        'assessor_feedback',
        'strengths_noted',
        'areas_for_improvement',
      ],
      properties: {
        verdict: { type: 'string', enum: ['pass', 'partial', 'refer', 'not_yet'] },
        verdict_rationale: { type: 'string' },
        ac_analysis: {
          type: 'array',
          items: {
            type: 'object',
            additionalProperties: false,
            required: ['ac_code', 'status', 'comment'],
            properties: {
              ac_code: { type: 'string' },
              status: { type: 'string', enum: ['evidenced', 'partial', 'missing'] },
              comment: { type: 'string' },
            },
          },
        },
        assessor_feedback: { type: 'string' },
        strengths_noted: { type: 'string' },
        areas_for_improvement: { type: 'string' },
      },
    },
  },
};

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') return new Response('ok', { headers: corsHeaders });
  if (req.method !== 'POST') {
    return new Response('Method not allowed', { status: 405, headers: corsHeaders });
  }

  let body: AssessRequest;
  try {
    body = (await req.json()) as AssessRequest;
  } catch {
    return new Response(JSON.stringify({ error: 'invalid_json' }), {
      status: 400,
      headers: { ...corsHeaders, 'content-type': 'application/json' },
    });
  }

  if (!body.submission_id) {
    return new Response(JSON.stringify({ error: 'missing_submission_id' }), {
      status: 400,
      headers: { ...corsHeaders, 'content-type': 'application/json' },
    });
  }

  const serviceClient = createClient(
    Deno.env.get('SUPABASE_URL')!,
    Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!,
    { auth: { persistSession: false } }
  );

  const { user, profile, error: authError } = await authoriseAssessor(req, serviceClient);
  if (authError === 'unauthorized' || !user) {
    return new Response(JSON.stringify({ error: 'unauthorized' }), {
      status: 401,
      headers: { ...corsHeaders, 'content-type': 'application/json' },
    });
  }
  if (authError === 'no_college' || !profile) {
    return new Response(JSON.stringify({ error: 'no_college_profile' }), {
      status: 403,
      headers: { ...corsHeaders, 'content-type': 'application/json' },
    });
  }

  const ctx = await loadContext(serviceClient, body.submission_id);
  if (!ctx) {
    return new Response(JSON.stringify({ error: 'submission_not_found' }), {
      status: 404,
      headers: { ...corsHeaders, 'content-type': 'application/json' },
    });
  }

  // Authorisation: must be assigned to this learner OR same-college staff
  const { data: assignment } = await serviceClient
    .from('college_student_assignments')
    .select('id')
    .eq('student_id', ctx.submission.user_id as string)
    .or(`tutor_id.eq.${user.id},assessor_id.eq.${user.id},iqa_id.eq.${user.id}`)
    .maybeSingle();
  if (!assignment) {
    // Fall back to same-college staff
    const { data: learnerStudent } = await serviceClient
      .from('college_students')
      .select('college_id')
      .eq('user_id', ctx.submission.user_id as string)
      .maybeSingle();
    if (
      !learnerStudent ||
      (learnerStudent.college_id as string) !== (profile.college_id as string)
    ) {
      return new Response(JSON.stringify({ error: 'forbidden' }), {
        status: 403,
        headers: { ...corsHeaders, 'content-type': 'application/json' },
      });
    }
  }

  const openAiKey = Deno.env.get('OPENAI_API_KEY');
  if (!openAiKey) {
    return new Response(JSON.stringify({ error: 'openai_key_missing' }), {
      status: 500,
      headers: { ...corsHeaders, 'content-type': 'application/json' },
    });
  }

  const userPrompt = `Please assess the portfolio submission below. ${
    body.instruction ? `Tutor note: ${body.instruction}\n\n` : ''
  }${compactContextForPrompt(ctx)}`;

  const stream = new ReadableStream({
    async start(controller) {
      const ping = setInterval(() => {
        try {
          controller.enqueue(sseComment('keepalive'));
        } catch {
          /* closed */
        }
      }, 15_000);

      try {
        controller.enqueue(
          sseEvent('open', {
            submission_id: body.submission_id,
            learner_name: ctx.learnerName,
            evidence_count: ctx.items.length,
            observation_count: ctx.observations.length,
          })
        );

        const ac = new AbortController();
        const timeout = setTimeout(() => ac.abort(), STREAM_TIMEOUT_MS);

        const response = await fetch('https://api.openai.com/v1/chat/completions', {
          method: 'POST',
          signal: ac.signal,
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${openAiKey}`,
          },
          body: JSON.stringify({
            model: CHAT_MODEL,
            stream: true,
            max_completion_tokens: MAX_COMPLETION_TOKENS,
            tool_choice: { type: 'function', function: { name: 'submit_assessor_draft' } },
            tools: [ASSESSOR_TOOL_SCHEMA],
            messages: [
              { role: 'system', content: buildSystemPrompt() },
              { role: 'user', content: userPrompt },
            ],
          }),
        });

        clearTimeout(timeout);

        if (!response.ok || !response.body) {
          const text = await response.text().catch(() => '');
          controller.enqueue(sseEvent('error', { error: 'openai_failed', detail: text.slice(0, 400) }));
          controller.close();
          return;
        }

        const reader = response.body.getReader();
        const decoder = new TextDecoder();
        let buffer = '';
        let toolArgsAcc = '';

        while (true) {
          const { value, done } = await reader.read();
          if (done) break;
          buffer += decoder.decode(value, { stream: true });
          const lines = buffer.split('\n');
          buffer = lines.pop() ?? '';
          for (const line of lines) {
            const trimmed = line.trim();
            if (!trimmed.startsWith('data:')) continue;
            const payload = trimmed.slice(5).trim();
            if (payload === '[DONE]') continue;
            try {
              const json = JSON.parse(payload);
              const delta = json.choices?.[0]?.delta;
              const toolCalls = delta?.tool_calls as
                | Array<{ function?: { arguments?: string } }>
                | undefined;
              if (toolCalls && toolCalls.length) {
                for (const tc of toolCalls) {
                  const args = tc.function?.arguments;
                  if (args) {
                    toolArgsAcc += args;
                    controller.enqueue(sseEvent('token', { delta: args }));
                  }
                }
              }
            } catch {
              // ignore malformed lines
            }
          }
        }

        // Try to parse the accumulated tool args as the final draft
        let parsed: unknown = null;
        try {
          parsed = JSON.parse(toolArgsAcc);
        } catch {
          parsed = null;
        }

        controller.enqueue(
          sseEvent('done', {
            draft: parsed,
            raw: parsed ? null : toolArgsAcc,
          })
        );
      } catch (e) {
        controller.enqueue(
          sseEvent('error', { error: 'stream_failed', detail: (e as Error).message })
        );
      } finally {
        clearInterval(ping);
        controller.close();
      }
    },
  });

  return new Response(stream, {
    headers: {
      ...corsHeaders,
      'content-type': 'text/event-stream',
      'cache-control': 'no-cache',
      connection: 'keep-alive',
    },
  });
});
