// ai-generate-sar — Ofsted Self-Assessment Report draft generator.
// ELE-922 (G2). Pulls a cross-college signal snapshot, asks the model to
// draft a SEF narrative against the four Ofsted EIF judgements plus the
// apprenticeships lens, returns structured JSON and stores it as a draft
// row in college_sar_drafts.
//
// POST body: { academic_year?: string, refresh?: boolean }

import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.57.4';
import { captureException } from '../_shared/sentry.ts';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

const CHAT_MODEL = 'gpt-5.4-mini-2026-03-17';
const MAX_TOKENS = 4_000;

type Rag = 'red' | 'amber' | 'green' | 'grey';

interface Evidence {
  label: string;
  value: string;
}

interface JudgementBody {
  rag: Rag;
  summary: string;
  narrative: string;
  evidence: Evidence[];
  gaps: string[];
}

interface SarDraftArgs {
  overall_summary: string;
  strengths: string[];
  areas_for_improvement: string[];
  judgement_quality_of_education: JudgementBody;
  judgement_behaviour_attitudes: JudgementBody;
  judgement_personal_development: JudgementBody;
  judgement_leadership_management: JudgementBody;
  judgement_apprenticeships: JudgementBody;
}

const SYSTEM_PROMPT = `You write the first draft of a UK FE college's Ofsted Self-Assessment Report (SAR / SEF).

Voice: senior college leader writing for the inspector. Crisp, evidence-led, honest. UK English. No filler, no marketing tone.

You will be given a JSON snapshot of the college's current data (cohort sizes, attendance, achievement, EPA outcomes, OTJ compliance, IQA findings, staff qualifications). Use ONLY that data — never invent numbers or learners.

For each of the four Ofsted judgements (Quality of Education, Behaviour & Attitudes, Personal Development, Leadership & Management) plus the Apprenticeships lens, produce:
- rag: 'red' | 'amber' | 'green' | 'grey' — your honest assessment based on the data ('grey' if a signal isn't tracked yet)
- summary: one sentence inspector-ready judgement
- narrative: 2-4 short paragraphs of Intent / Implementation / Impact in continuous prose, grounded in the snapshot
- evidence: 3-5 concrete data points the inspector could verify
- gaps: anything missing from the snapshot you'd want before publishing

Overall:
- overall_summary: 3-4 sentence headline that a HoD could read in a board meeting
- strengths: 3-5 bullet points
- areas_for_improvement: 3-5 bullet points

Hard rules:
- Never invent metrics. If something isn't in the snapshot, mark rag='grey' and list it under gaps.
- Use first-person plural ("we", "our learners") — this is a self-assessment.
- No emojis. No bold. No headings inside paragraphs.

Submit exactly once via the submit_sar tool.`;

const SAR_TOOL = {
  type: 'function',
  function: {
    name: 'submit_sar',
    description: 'Submit the structured SAR draft.',
    parameters: {
      type: 'object',
      additionalProperties: false,
      properties: {
        overall_summary: { type: 'string' },
        strengths: { type: 'array', items: { type: 'string' }, minItems: 3, maxItems: 5 },
        areas_for_improvement: {
          type: 'array',
          items: { type: 'string' },
          minItems: 3,
          maxItems: 5,
        },
        judgement_quality_of_education: judgementSchema(),
        judgement_behaviour_attitudes: judgementSchema(),
        judgement_personal_development: judgementSchema(),
        judgement_leadership_management: judgementSchema(),
        judgement_apprenticeships: judgementSchema(),
      },
      required: [
        'overall_summary',
        'strengths',
        'areas_for_improvement',
        'judgement_quality_of_education',
        'judgement_behaviour_attitudes',
        'judgement_personal_development',
        'judgement_leadership_management',
        'judgement_apprenticeships',
      ],
    },
  },
} as const;

function judgementSchema() {
  return {
    type: 'object',
    additionalProperties: false,
    properties: {
      rag: { type: 'string', enum: ['red', 'amber', 'green', 'grey'] },
      summary: { type: 'string' },
      narrative: { type: 'string' },
      evidence: {
        type: 'array',
        items: {
          type: 'object',
          additionalProperties: false,
          properties: {
            label: { type: 'string' },
            value: { type: 'string' },
          },
          required: ['label', 'value'],
        },
      },
      gaps: { type: 'array', items: { type: 'string' } },
    },
    required: ['rag', 'summary', 'narrative', 'evidence', 'gaps'],
  };
}

function currentAcademicYear(): string {
  const now = new Date();
  const y = now.getUTCFullYear();
  const startsThisYear = now.getUTCMonth() >= 7;
  const start = startsThisYear ? y : y - 1;
  return `${start}-${String((start + 1) % 100).padStart(2, '0')}`;
}

async function authorise(req: Request) {
  const auth = req.headers.get('authorization');
  if (!auth) return { ok: false as const, error: 'unauthorized' };
  const userClient = createClient(
    Deno.env.get('SUPABASE_URL')!,
    Deno.env.get('SUPABASE_ANON_KEY')!,
    { global: { headers: { Authorization: auth } }, auth: { persistSession: false } }
  );
  const { data } = await userClient.auth.getUser();
  if (!data?.user) return { ok: false as const, error: 'unauthorized' };
  return { ok: true as const, uid: data.user.id };
}

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') return new Response(null, { status: 204, headers: corsHeaders });
  if (req.method !== 'POST')
    return new Response(JSON.stringify({ error: 'method_not_allowed' }), {
      status: 405,
      headers: { ...corsHeaders, 'content-type': 'application/json' },
    });

  const SUPABASE_URL = Deno.env.get('SUPABASE_URL');
  const SERVICE_KEY = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY');
  const OPENAI_KEY = Deno.env.get('OPENAI_API_KEY');
  if (!SUPABASE_URL || !SERVICE_KEY || !OPENAI_KEY) {
    return new Response(JSON.stringify({ error: 'server_misconfigured' }), {
      status: 500,
      headers: { ...corsHeaders, 'content-type': 'application/json' },
    });
  }

  const auth = await authorise(req);
  if (!auth.ok) {
    return new Response(JSON.stringify({ error: auth.error }), {
      status: 401,
      headers: { ...corsHeaders, 'content-type': 'application/json' },
    });
  }

  let body: { academic_year?: string; refresh?: boolean } = {};
  try {
    body = (await req.json()) as typeof body;
  } catch {
    /* empty fine */
  }

  const academicYear = body.academic_year || currentAcademicYear();

  const sb = createClient(SUPABASE_URL, SERVICE_KEY, {
    auth: { persistSession: false, autoRefreshToken: false },
  });

  // Resolve the caller's college (must be staff)
  const { data: profile } = await sb
    .from('profiles')
    .select('college_id, college_role')
    .eq('id', auth.uid)
    .maybeSingle();
  const collegeId = (profile as { college_id?: string; college_role?: string } | null)
    ?.college_id;
  if (!collegeId) {
    return new Response(JSON.stringify({ error: 'not_college_staff' }), {
      status: 403,
      headers: { ...corsHeaders, 'content-type': 'application/json' },
    });
  }

  // Cache: return latest non-archived draft for this year unless refresh=true
  if (!body.refresh) {
    const { data: existing } = await sb
      .from('college_sar_drafts')
      .select('*')
      .eq('college_id', collegeId)
      .eq('academic_year', academicYear)
      .neq('status', 'archived')
      .order('created_at', { ascending: false })
      .limit(1)
      .maybeSingle();
    if (existing) {
      return new Response(JSON.stringify({ draft: existing, cached: true }), {
        headers: { ...corsHeaders, 'content-type': 'application/json' },
      });
    }
  }

  // Gather signals. Each query is best-effort — missing tables degrade to 0/null.
  const since = new Date(Date.now() - 365 * 86_400_000).toISOString();

  const [
    collegeRes,
    staffRes,
    studentsRes,
    attendanceRes,
    gradesRes,
    epaRes,
    iqaRes,
  ] = await Promise.all([
    sb.from('colleges').select('name, code, settings').eq('id', collegeId).maybeSingle(),
    sb.from('college_staff').select('id, role, teaching_qual, assessor_qual, iqa_qual, status').eq('college_id', collegeId),
    sb.from('college_students').select('id, status, progress_percent, risk_level').eq('college_id', collegeId),
    sb.from('college_attendance').select('status, date').gte('date', since.slice(0, 10)),
    sb.from('college_grades').select('grade, score, status, assessed_at'),
    sb.from('college_epa').select('status, result'),
    sb.from('college_iqa_findings').select('id, severity, status, created_at').gte('created_at', since).maybeSingle ? null : null,
  ]);

  const college = (collegeRes.data ?? null) as { name?: string; code?: string } | null;
  const staff = staffRes.data ?? [];
  const students = studentsRes.data ?? [];
  const attendance = attendanceRes.data ?? [];
  const grades = gradesRes.data ?? [];
  const epa = epaRes.data ?? [];

  // Roll-up signals
  const activeStudents = students.filter((s) => s.status === 'Active').length;
  const withdrawnStudents = students.filter((s) => s.status === 'withdrawn').length;
  const retentionPct =
    students.length === 0
      ? null
      : Math.round((activeStudents / Math.max(students.length, 1)) * 100);

  const avgProgress =
    students.length === 0
      ? null
      : Math.round(
          students.reduce((a, s) => a + (s.progress_percent ?? 0), 0) /
            Math.max(students.length, 1)
        );

  const highRiskCount = students.filter((s) => s.risk_level === 'High').length;

  const attendancePresent = attendance.filter(
    (a) => a.status === 'Present' || a.status === 'Authorised'
  ).length;
  const attendancePct =
    attendance.length === 0 ? null : Math.round((attendancePresent / attendance.length) * 100);

  const gradeDistribution = grades.reduce<Record<string, number>>((acc, g) => {
    const k = g.grade ?? 'unmarked';
    acc[k] = (acc[k] ?? 0) + 1;
    return acc;
  }, {});

  const epaOutcomes = epa.reduce<Record<string, number>>((acc, e) => {
    const k = e.result ?? e.status ?? 'in_progress';
    acc[k] = (acc[k] ?? 0) + 1;
    return acc;
  }, {});

  const staffByRole = staff.reduce<Record<string, number>>((acc, s) => {
    acc[s.role] = (acc[s.role] ?? 0) + 1;
    return acc;
  }, {});

  const qualifiedAssessors = staff.filter((s) => !!s.assessor_qual).length;
  const qualifiedIqas = staff.filter((s) => !!s.iqa_qual).length;

  const sourceSignals = {
    generated_at: new Date().toISOString(),
    academic_year: academicYear,
    college: { id: collegeId, name: college?.name ?? null, code: college?.code ?? null },
    learners: {
      total: students.length,
      active: activeStudents,
      withdrawn: withdrawnStudents,
      retention_pct: retentionPct,
      avg_progress_pct: avgProgress,
      high_risk: highRiskCount,
    },
    attendance: {
      sessions_logged: attendance.length,
      present_pct: attendancePct,
    },
    achievement: {
      grade_distribution: gradeDistribution,
      total_grades: grades.length,
    },
    epa: epaOutcomes,
    workforce: {
      headcount: staff.length,
      by_role: staffByRole,
      qualified_assessors: qualifiedAssessors,
      qualified_iqas: qualifiedIqas,
    },
  };

  const userPrompt = `College: ${college?.name ?? 'Unknown'} (${academicYear})

Snapshot:
${JSON.stringify(sourceSignals, null, 2)}

Draft the SAR. Be honest about gaps where the snapshot is thin.`;

  const aiRes = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${OPENAI_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      model: CHAT_MODEL,
      max_completion_tokens: MAX_TOKENS,
      messages: [
        { role: 'system', content: SYSTEM_PROMPT },
        { role: 'user', content: userPrompt },
      ],
      tools: [SAR_TOOL],
      tool_choice: { type: 'function', function: { name: 'submit_sar' } },
    }),
  });

  if (!aiRes.ok) {
    const text = await aiRes.text();
    console.error('SAR AI call failed', aiRes.status, text);
    return new Response(JSON.stringify({ error: 'ai_failed', detail: text }), {
      status: 502,
      headers: { ...corsHeaders, 'content-type': 'application/json' },
    });
  }

  const aiJson = await aiRes.json();
  const toolCall = aiJson?.choices?.[0]?.message?.tool_calls?.[0];
  if (!toolCall?.function?.arguments) {
    return new Response(JSON.stringify({ error: 'ai_no_tool_call' }), {
      status: 502,
      headers: { ...corsHeaders, 'content-type': 'application/json' },
    });
  }

  let args: SarDraftArgs;
  try {
    args = JSON.parse(toolCall.function.arguments);
  } catch (e) {
    await captureException(e, { functionName: 'ai-generate-sar', requestUrl: req.url, requestMethod: req.method });
    return new Response(JSON.stringify({ error: 'ai_bad_json', detail: String(e) }), {
      status: 502,
      headers: { ...corsHeaders, 'content-type': 'application/json' },
    });
  }

  const { data: draft, error: insertErr } = await sb
    .from('college_sar_drafts')
    .insert({
      college_id: collegeId,
      academic_year: academicYear,
      title: `SAR ${academicYear} — ${college?.name ?? 'College'}`,
      status: 'draft',
      generated_by: auth.uid,
      overall_summary: args.overall_summary,
      strengths: args.strengths,
      areas_for_improvement: args.areas_for_improvement,
      judgement_quality_of_education: args.judgement_quality_of_education,
      judgement_behaviour_attitudes: args.judgement_behaviour_attitudes,
      judgement_personal_development: args.judgement_personal_development,
      judgement_leadership_management: args.judgement_leadership_management,
      judgement_apprenticeships: args.judgement_apprenticeships,
      source_signals: sourceSignals,
    })
    .select('*')
    .single();

  if (insertErr) {
    console.error('SAR insert failed', insertErr);
    return new Response(JSON.stringify({ error: 'persist_failed', detail: insertErr.message }), {
      status: 500,
      headers: { ...corsHeaders, 'content-type': 'application/json' },
    });
  }

  return new Response(JSON.stringify({ draft, cached: false }), {
    headers: { ...corsHeaders, 'content-type': 'application/json' },
  });
});
