// ai-inspection-rehearsal — Mate-as-Ofsted-inspector rehearsal sessions.
// ELE-921 (G1). Conversational rehearsal:
//   POST { action: 'start', scenario? }              → creates session + first question
//   POST { action: 'respond', rehearsal_id, message } → grades response + next question
//   POST { action: 'finish', rehearsal_id }           → grades each area probed
//
// ELE-2021: scenarios are the seven evaluation areas of Ofsted's renewed
// framework for further education and skills (from November 2025), and the
// verdict is a grade per area on the five-point scale (safeguarding met /
// not met). No overall grade: Ofsted no longer gives one. Areas and grades
// come from _shared/ofsted-fe-skills-framework.ts (the same list the app uses).

import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.57.4';

import { withSentry } from '../_shared/sentry.ts';
import {
  LEGACY_JUDGEMENTS,
  NOT_ENOUGH_EVIDENCE,
  SAFEGUARDING_OUTCOMES,
  TOOLKIT_AREA_KEYS,
  TOOLKIT_AREAS,
  TOOLKIT_GRADE_SCALE,
  gradeKeysFor,
  type AreaGradeKey,
  type ToolkitAreaKey,
} from '../_shared/ofsted-fe-skills-framework.ts';
const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type, x-supabase-timeout, x-request-id',
};

const CHAT_MODEL = 'gpt-5.4-mini-2026-03-17';
const MAX_TURNS = 8;

/** 'general' or one evaluation area. Old rows may hold a legacy judgement key. */
type Scenario = 'general' | ToolkitAreaKey;

interface Turn {
  role: 'inspector' | 'tutor';
  content: string;
  grade?: 'strong' | 'adequate' | 'insufficient';
  feedback?: string;
}

function scenarioFocus(scenario: string): string {
  if (scenario === 'general') {
    return `a broad inspection across the evaluation areas of Ofsted's renewed framework for further education and skills: ${TOOLKIT_AREAS.map((a) => a.title).join('; ')}`;
  }
  const area = TOOLKIT_AREAS.find((a) => a.key === scenario);
  if (area) {
    return `the evaluation area "${area.title}" (${area.level === 'whole' ? 'whole provider' : 'provision type: apprenticeships'}; graded ${area.scale.toLowerCase()}). Inspectors look at: ${area.what}`;
  }
  // Rows started before ELE-2021 carry an old judgement key.
  const legacy = LEGACY_JUDGEMENTS[scenario];
  return legacy ? `the evaluation area(s) ${legacy.nowUnder}` : 'a broad inspection across all evaluation areas';
}

const FRAMEWORK_NOTE = `Framework: Ofsted's renewed education inspection framework for further education and skills (from November 2025). It grades evaluation areas: ${TOOLKIT_AREAS.map((a) => a.title).join('; ')}. Never use the old judgement headings (quality of education, behaviour and attitudes, personal development, leadership and management) or "intent, implementation, impact", and never give an overall effectiveness grade: there is none.`;

const SYSTEM_PROMPT_QUESTION = `You are a UK Ofsted lead inspector running a rehearsal interview with a college leader about their apprenticeship provision. Be polite but probing.

${FRAMEWORK_NOTE}

Ask ONE specific, evidence-driven question at a time. Reference the supplied college snapshot where you can ("I see attendance at 84% — walk me through what's behind that").

Keep questions under 2 sentences. UK English. No emojis. No filler. Push for evidence, not vibes.`;

const SYSTEM_PROMPT_GRADE = `You are an Ofsted lead inspector grading a college leader's response to your last question.

${FRAMEWORK_NOTE}

Grade the response:
- "strong": evidence-led, specific, names data/learners/processes, owns weaknesses
- "adequate": broadly correct but vague, missing data, generic language
- "insufficient": missed the point, defensive, no evidence, deflects

Feedback is 1-2 sentences directed AT the leader. Be direct, like an inspector debriefing. UK English. No emojis.

Submit via the submit_grade tool.`;

const SYSTEM_PROMPT_VERDICT = `You are wrapping up an Ofsted rehearsal. UK English.

${FRAMEWORK_NOTE}

For each evaluation area the conversation actually probed, give the grade the leader's answers and evidence would most likely support:
- five-point scale: ${TOOLKIT_GRADE_SCALE.map((g) => `${g.key} (${g.label})`).join(', ')}
- safeguarding only: ${SAFEGUARDING_OUTCOMES.map((o) => `${o.key} (${o.label})`).join(', ')}
- ${NOT_ENOUGH_EVIDENCE.key} if the answers were too thin to call.
Give a one-sentence reason for each. Do not grade areas the conversation did not touch. Do not give an overall grade.
Summary: 2-3 sentences. Strengths: 2-4 short bullets. Weaknesses: 2-4 short bullets.

This is a rehearsal, not a prediction of an inspection outcome.

Submit via the submit_verdict tool.`;

const GRADE_TOOL = {
  type: 'function',
  function: {
    name: 'submit_grade',
    description: "Grade the leader's response and produce the next probing question.",
    parameters: {
      type: 'object',
      additionalProperties: false,
      properties: {
        grade: { type: 'string', enum: ['strong', 'adequate', 'insufficient'] },
        feedback: { type: 'string' },
        next_question: { type: 'string' },
      },
      required: ['grade', 'feedback', 'next_question'],
    },
  },
} as const;

const ALL_GRADE_KEYS: string[] = [
  ...TOOLKIT_GRADE_SCALE.map((g) => g.key),
  ...SAFEGUARDING_OUTCOMES.map((o) => o.key),
  NOT_ENOUGH_EVIDENCE.key,
];

const VERDICT_TOOL = {
  type: 'function',
  function: {
    name: 'submit_verdict',
    description: 'Wrap up the rehearsal with a grade for each evaluation area probed.',
    parameters: {
      type: 'object',
      additionalProperties: false,
      properties: {
        area_grades: {
          type: 'array',
          minItems: 1,
          maxItems: TOOLKIT_AREAS.length,
          items: {
            type: 'object',
            additionalProperties: false,
            properties: {
              area: { type: 'string', enum: TOOLKIT_AREA_KEYS },
              grade: { type: 'string', enum: ALL_GRADE_KEYS },
              reason: { type: 'string' },
            },
            required: ['area', 'grade', 'reason'],
          },
        },
        summary: { type: 'string' },
        strengths: { type: 'array', items: { type: 'string' }, minItems: 2, maxItems: 4 },
        weaknesses: { type: 'array', items: { type: 'string' }, minItems: 2, maxItems: 4 },
      },
      required: ['area_grades', 'summary', 'strengths', 'weaknesses'],
    },
  },
} as const;

interface AreaGrade {
  area: ToolkitAreaKey;
  grade: AreaGradeKey;
  reason: string;
}

/** One row per area, and only a grade that area can take (met / not met for safeguarding). */
function cleanAreaGrades(raw: unknown): AreaGrade[] {
  const rows = Array.isArray(raw) ? (raw as Array<Partial<AreaGrade>>) : [];
  const seen = new Set<string>();
  const out: AreaGrade[] = [];
  for (const r of rows) {
    const area = r.area as ToolkitAreaKey;
    if (!TOOLKIT_AREA_KEYS.includes(area) || seen.has(area)) continue;
    seen.add(area);
    const allowed: string[] = [...gradeKeysFor(area), NOT_ENOUGH_EVIDENCE.key];
    const grade = (allowed.includes(String(r.grade)) ? r.grade : NOT_ENOUGH_EVIDENCE.key) as AreaGradeKey;
    out.push({ area, grade, reason: String(r.reason ?? '') });
  }
  return out;
}

async function authorise(req: Request) {
  const auth = req.headers.get('authorization');
  if (!auth) return { ok: false as const };
  const userClient = createClient(
    Deno.env.get('SUPABASE_URL')!,
    Deno.env.get('SUPABASE_ANON_KEY')!,
    { global: { headers: { Authorization: auth } }, auth: { persistSession: false } }
  );
  const { data } = await userClient.auth.getUser();
  if (!data?.user) return { ok: false as const };
  return { ok: true as const, uid: data.user.id };
}

// deno-lint-ignore no-explicit-any
async function gatherSnapshot(sb: any, collegeId: string) {
  const [collegeRes, studentsRes] = await Promise.all([
    sb.from('colleges').select('name, code').eq('id', collegeId).maybeSingle(),
    sb
      .from('college_students')
      .select('id, status, progress_percent, risk_level')
      .eq('college_id', collegeId),
  ]);
  const students = studentsRes.data ?? [];
  // The service role bypasses RLS: scope learner tables to this college's
  // learners (this used to read every college's registers and grades).
  const ids = students.length ? students.map((s: any) => s.id) : ['00000000-0000-0000-0000-000000000000'];
  const [attendanceRes, gradesRes, epaRes] = await Promise.all([
    sb.from('college_attendance').select('status').in('student_id', ids),
    sb.from('college_grades').select('grade, status').in('student_id', ids),
    sb.from('college_epa').select('status, result').in('student_id', ids),
  ]);
  const attendance = attendanceRes.data ?? [];
  const grades = gradesRes.data ?? [];
  const epa = epaRes.data ?? [];
  const lc = (v: unknown) => String(v ?? '').trim().toLowerCase();
  const active = students.filter((s: any) => lc(s.status) === 'active').length;
  // 'Present' / 'Late' / 'Absent' / 'Authorised': late still attended; an
  // authorised absence is still an absence.
  const present = attendance.filter((a: any) => ['present', 'late'].includes(lc(a.status))).length;
  return {
    college: collegeRes.data,
    learners_total: students.length,
    learners_active: active,
    provision_type: 'Apprenticeships',
    learners_high_risk: students.filter((s: any) => ['high', 'critical'].includes(lc(s.risk_level))).length,
    attendance_attended_pct: attendance.length ? Math.round((present / attendance.length) * 100) : null,
    grades_total: grades.length,
    epa_outcomes: epa.reduce((acc: any, e: any) => {
      const k = e.result || e.status || 'in_progress';
      acc[k] = (acc[k] ?? 0) + 1;
      return acc;
    }, {}),
  };
}

Deno.serve(withSentry('ai-inspection-rehearsal', async (req) => {
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
    return new Response(JSON.stringify({ error: 'unauthorized' }), {
      status: 401,
      headers: { ...corsHeaders, 'content-type': 'application/json' },
    });
  }

  let body: {
    action: 'start' | 'respond' | 'finish';
    rehearsal_id?: string;
    message?: string;
    scenario?: Scenario;
  };
  try {
    body = (await req.json()) as any;
  } catch {
    return new Response(JSON.stringify({ error: 'bad_body' }), {
      status: 400,
      headers: { ...corsHeaders, 'content-type': 'application/json' },
    });
  }

  const sb = createClient(SUPABASE_URL, SERVICE_KEY, {
    auth: { persistSession: false, autoRefreshToken: false },
  });

  const { data: profile } = await sb
    .from('profiles')
    .select('college_id')
    .eq('id', auth.uid)
    .maybeSingle();
  const collegeId = (profile as any)?.college_id;
  if (!collegeId) {
    return new Response(JSON.stringify({ error: 'not_college_staff' }), {
      status: 403,
      headers: { ...corsHeaders, 'content-type': 'application/json' },
    });
  }

  // profiles.college_id alone is not enough: the caller must hold an active,
  // non-archived staff row at that college, and EQAs (read-only visitors) may
  // not rehearse. Everything below runs as the service role.
  const { data: staffRows } = await sb
    .from('college_staff')
    .select('id, role, status')
    .eq('college_id', collegeId)
    .eq('user_id', auth.uid)
    .is('archived_at', null);
  const isStaff = (staffRows ?? []).some(
    (r: { role?: string | null; status?: string | null }) =>
      String(r.status ?? 'active').trim().toLowerCase() === 'active' &&
      String(r.role ?? '').trim().toLowerCase() !== 'eqa'
  );
  if (!isStaff) {
    return new Response(JSON.stringify({ error: 'not_college_staff' }), {
      status: 403,
      headers: { ...corsHeaders, 'content-type': 'application/json' },
    });
  }


  // Writes the verdict (area grades, summary, strengths, weaknesses) and marks
  // the rehearsal complete. Used by 'finish' and by the auto-finish at the
  // answer limit, so a rehearsal never ends without a verdict.
  // deno-lint-ignore no-explicit-any
  async function finishRehearsal(existing: any): Promise<Response | unknown> {
    const turns = (existing.turns as Turn[]) || [];

    const aiRes = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${OPENAI_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: CHAT_MODEL,
        max_completion_tokens: 800,
        messages: [
          { role: 'system', content: SYSTEM_PROMPT_VERDICT },
          {
            role: 'user',
            content: `Scenario: ${scenarioFocus(String(existing.scenario))}\n\nSnapshot:\n${JSON.stringify(existing.source_signals, null, 2)}\n\nTranscript:\n${turns
              .map(
                (t) =>
                  `${t.role.toUpperCase()}${t.grade ? ` [${t.grade}]` : ''}: ${t.content}${
                    t.feedback ? `\n  feedback: ${t.feedback}` : ''
                  }`
              )
              .join('\n')}`,
          },
        ],
        tools: [VERDICT_TOOL],
        tool_choice: { type: 'function', function: { name: 'submit_verdict' } },
      }),
    });
    if (!aiRes.ok) {
      const text = await aiRes.text();
      return new Response(JSON.stringify({ error: 'ai_failed', detail: text }), {
        status: 502,
        headers: { ...corsHeaders, 'content-type': 'application/json' },
      });
    }
    const aiJson = await aiRes.json();
    const toolCall = aiJson?.choices?.[0]?.message?.tool_calls?.[0];
    let parsed: { area_grades: unknown; summary: string; strengths: string[]; weaknesses: string[] };
    try {
      parsed = JSON.parse(toolCall.function.arguments);
    } catch {
      return new Response(JSON.stringify({ error: 'ai_bad_json' }), {
        status: 502,
        headers: { ...corsHeaders, 'content-type': 'application/json' },
      });
    }

    const areaGrades = cleanAreaGrades(parsed.area_grades);
    // No overall grade exists any more: overall_verdict holds the focus
    // area's grade, and stays null for a general rehearsal.
    const focus = areaGrades.find((g) => g.area === existing.scenario);
    const { data: finished } = await sb
      .from('college_inspection_rehearsals')
      .update({
        status: 'complete',
        overall_verdict: focus?.grade ?? null,
        area_grades: areaGrades,
        verdict_summary: parsed.summary,
        strengths: parsed.strengths,
        weaknesses: parsed.weaknesses,
      })
      .eq('id', existing.id)
      .select('*')
      .single();
    return finished;
  }

  if (body.action === 'start') {
    const scenario: Scenario =
      body.scenario && (body.scenario === 'general' || TOOLKIT_AREA_KEYS.includes(body.scenario as ToolkitAreaKey))
        ? body.scenario
        : 'general';
    const snapshot = await gatherSnapshot(sb, collegeId);

    const aiRes = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${OPENAI_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: CHAT_MODEL,
        max_completion_tokens: 400,
        messages: [
          { role: 'system', content: SYSTEM_PROMPT_QUESTION },
          {
            role: 'user',
            content: `Scenario focus: ${scenarioFocus(scenario)}\n\nCollege snapshot:\n${JSON.stringify(snapshot, null, 2)}\n\nOpen the rehearsal with ONE probing question.`,
          },
        ],
      }),
    });
    if (!aiRes.ok) {
      const text = await aiRes.text();
      return new Response(JSON.stringify({ error: 'ai_failed', detail: text }), {
        status: 502,
        headers: { ...corsHeaders, 'content-type': 'application/json' },
      });
    }
    const aiJson = await aiRes.json();
    const question: string =
      aiJson?.choices?.[0]?.message?.content?.trim() ||
      'Walk me through how you assure quality of teaching across your apprenticeship cohorts.';

    const initialTurns: Turn[] = [{ role: 'inspector', content: question }];
    const { data: rehearsal, error: insErr } = await sb
      .from('college_inspection_rehearsals')
      .insert({
        college_id: collegeId,
        user_id: auth.uid,
        scenario,
        turns: initialTurns,
        source_signals: snapshot,
      })
      .select('*')
      .single();
    if (insErr) {
      return new Response(JSON.stringify({ error: 'persist_failed', detail: insErr.message }), {
        status: 500,
        headers: { ...corsHeaders, 'content-type': 'application/json' },
      });
    }
    return new Response(JSON.stringify({ rehearsal }), {
      headers: { ...corsHeaders, 'content-type': 'application/json' },
    });
  }

  if (body.action === 'respond') {
    if (!body.rehearsal_id || !body.message?.trim()) {
      return new Response(JSON.stringify({ error: 'bad_args' }), {
        status: 400,
        headers: { ...corsHeaders, 'content-type': 'application/json' },
      });
    }
    const { data: existing, error: rErr } = await sb
      .from('college_inspection_rehearsals')
      .select('*')
      .eq('id', body.rehearsal_id)
      .eq('user_id', auth.uid)
      .maybeSingle();
    if (rErr || !existing) {
      return new Response(JSON.stringify({ error: 'not_found' }), {
        status: 404,
        headers: { ...corsHeaders, 'content-type': 'application/json' },
      });
    }
    const turns = (existing.turns as Turn[]) || [];
    const lastInspector = [...turns].reverse().find((t) => t.role === 'inspector');
    if (!lastInspector) {
      return new Response(JSON.stringify({ error: 'no_question_to_answer' }), {
        status: 400,
        headers: { ...corsHeaders, 'content-type': 'application/json' },
      });
    }

    const tutorTurn: Turn = { role: 'tutor', content: body.message.trim() };

    const aiRes = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${OPENAI_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: CHAT_MODEL,
        max_completion_tokens: 600,
        messages: [
          { role: 'system', content: SYSTEM_PROMPT_GRADE },
          {
            role: 'user',
            content: `Scenario: ${scenarioFocus(String(existing.scenario))}\n\nSnapshot:\n${JSON.stringify(existing.source_signals, null, 2)}\n\nTranscript so far:\n${turns
              .map((t) => `${t.role.toUpperCase()}: ${t.content}`)
              .join('\n')}\nTUTOR: ${tutorTurn.content}\n\nGrade the tutor's last answer and ask the next probing question.`,
          },
        ],
        tools: [GRADE_TOOL],
        tool_choice: { type: 'function', function: { name: 'submit_grade' } },
      }),
    });
    if (!aiRes.ok) {
      const text = await aiRes.text();
      return new Response(JSON.stringify({ error: 'ai_failed', detail: text }), {
        status: 502,
        headers: { ...corsHeaders, 'content-type': 'application/json' },
      });
    }
    const aiJson = await aiRes.json();
    const toolCall = aiJson?.choices?.[0]?.message?.tool_calls?.[0];
    let parsed: { grade: Turn['grade']; feedback: string; next_question: string };
    try {
      parsed = JSON.parse(toolCall.function.arguments);
    } catch (e) {
      return new Response(JSON.stringify({ error: 'ai_bad_json' }), {
        status: 502,
        headers: { ...corsHeaders, 'content-type': 'application/json' },
      });
    }

    const gradedTutor: Turn = { ...tutorTurn, grade: parsed.grade, feedback: parsed.feedback };
    const nextInspector: Turn = { role: 'inspector', content: parsed.next_question };
    const newTurns = [...turns, gradedTutor, nextInspector];

    // Auto-finish if we hit the max
    const shouldAutoFinish = newTurns.filter((t) => t.role === 'tutor').length >= MAX_TURNS;

    const { data: saved } = await sb
      .from('college_inspection_rehearsals')
      .update({ turns: newTurns, status: 'active' })
      .eq('id', existing.id)
      .select('*')
      .single();

    let updated: unknown = saved;
    let autoFinished = false;
    if (shouldAutoFinish && saved) {
      // Run the verdict in this same request, so the rehearsal is never left
      // 'complete' with no grades or summary. If the verdict call fails the
      // rehearsal stays active and the tutor can press Finish.
      const done = await finishRehearsal(saved);
      if (!(done instanceof Response)) {
        updated = done;
        autoFinished = true;
      }
    }

    return new Response(JSON.stringify({ rehearsal: updated, auto_finished: autoFinished }), {
      headers: { ...corsHeaders, 'content-type': 'application/json' },
    });
  }

  if (body.action === 'finish') {
    if (!body.rehearsal_id) {
      return new Response(JSON.stringify({ error: 'bad_args' }), {
        status: 400,
        headers: { ...corsHeaders, 'content-type': 'application/json' },
      });
    }
    const { data: existing } = await sb
      .from('college_inspection_rehearsals')
      .select('*')
      .eq('id', body.rehearsal_id)
      .eq('user_id', auth.uid)
      .maybeSingle();
    if (!existing) {
      return new Response(JSON.stringify({ error: 'not_found' }), {
        status: 404,
        headers: { ...corsHeaders, 'content-type': 'application/json' },
      });
    }
    const done = await finishRehearsal(existing);
    if (done instanceof Response) return done;
    return new Response(JSON.stringify({ rehearsal: done }), {
      headers: { ...corsHeaders, 'content-type': 'application/json' },
    });
  }

  return new Response(JSON.stringify({ error: 'unknown_action' }), {
    status: 400,
    headers: { ...corsHeaders, 'content-type': 'application/json' },
  });
}));
