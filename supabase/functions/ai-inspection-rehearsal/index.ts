// ai-inspection-rehearsal — Mate-as-Ofsted-inspector rehearsal sessions.
// ELE-921 (G1). Conversational rehearsal:
//   POST { action: 'start', scenario? }              → creates session + first question
//   POST { action: 'respond', rehearsal_id, message } → grades response + next question
//   POST { action: 'finish', rehearsal_id }           → produces overall verdict

import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.57.4';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

const CHAT_MODEL = 'gpt-5.4-mini-2026-03-17';
const MAX_TURNS = 8;

type Scenario =
  | 'general'
  | 'quality_of_education'
  | 'behaviour_and_attitudes'
  | 'personal_development'
  | 'leadership_and_management'
  | 'apprenticeships'
  | 'safeguarding';

interface Turn {
  role: 'inspector' | 'tutor';
  content: string;
  grade?: 'strong' | 'adequate' | 'insufficient';
  feedback?: string;
}

const SCENARIO_FOCUS: Record<Scenario, string> = {
  general:
    'a broad inspection touching all four EIF judgements plus the apprenticeships lens',
  quality_of_education:
    'Quality of Education — Intent, Implementation, Impact, including curriculum sequencing, assessment, retention of knowledge',
  behaviour_and_attitudes:
    "Behaviour and Attitudes — attendance, punctuality, learners' attitudes to learning and conduct, professional behaviours",
  personal_development:
    "Personal Development — British Values, FBV, careers/CIAG, equality of opportunity, learners' wider development",
  leadership_and_management:
    "Leadership and Management — quality assurance, staff development, safeguarding leadership, governance",
  apprenticeships:
    'Apprenticeships lens — OTJ compliance, employer engagement, gateway readiness, EPA outcomes, retention by cohort',
  safeguarding:
    'Safeguarding — DSL arrangements, single central record, Prevent duty, online safety, learner concerns response',
};

const SYSTEM_PROMPT_QUESTION = `You are a UK Ofsted lead inspector running a rehearsal interview with a college leader. Be polite but probing.

Ask ONE specific, evidence-driven question at a time. Reference the supplied college snapshot where you can ("I see attendance at 84% — walk me through what's behind that").

Keep questions under 2 sentences. UK English. No emojis. No filler. Push for evidence, not vibes.`;

const SYSTEM_PROMPT_GRADE = `You are an Ofsted lead inspector grading a college leader's response to your last question.

Grade the response:
- "strong": evidence-led, specific, names data/learners/processes, owns weaknesses
- "adequate": broadly correct but vague, missing data, generic language
- "insufficient": missed the point, defensive, no evidence, deflects

Feedback is 1-2 sentences directed AT the leader. Be direct, like an inspector debriefing. UK English. No emojis.

Submit via the submit_grade tool.`;

const SYSTEM_PROMPT_VERDICT = `You are wrapping up an Ofsted rehearsal. Summarise overall. UK English.

Verdict is one of: "outstanding" | "good" | "requires_improvement" | "inadequate".
Strengths: 2-4 short bullets. Weaknesses: 2-4 short bullets.

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

const VERDICT_TOOL = {
  type: 'function',
  function: {
    name: 'submit_verdict',
    description: 'Wrap up the rehearsal with an overall verdict.',
    parameters: {
      type: 'object',
      additionalProperties: false,
      properties: {
        verdict: {
          type: 'string',
          enum: ['outstanding', 'good', 'requires_improvement', 'inadequate'],
        },
        summary: { type: 'string' },
        strengths: { type: 'array', items: { type: 'string' }, minItems: 2, maxItems: 4 },
        weaknesses: { type: 'array', items: { type: 'string' }, minItems: 2, maxItems: 4 },
      },
      required: ['verdict', 'summary', 'strengths', 'weaknesses'],
    },
  },
} as const;

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

async function gatherSnapshot(sb: ReturnType<typeof createClient>, collegeId: string) {
  const [collegeRes, studentsRes, attendanceRes, gradesRes, epaRes] = await Promise.all([
    sb.from('colleges').select('name, code').eq('id', collegeId).maybeSingle(),
    sb
      .from('college_students')
      .select('id, status, progress_percent, risk_level')
      .eq('college_id', collegeId),
    sb.from('college_attendance').select('status'),
    sb.from('college_grades').select('grade, status'),
    sb.from('college_epa').select('status, result'),
  ]);
  const students = studentsRes.data ?? [];
  const attendance = attendanceRes.data ?? [];
  const grades = gradesRes.data ?? [];
  const epa = epaRes.data ?? [];
  const active = students.filter((s: any) => s.status === 'Active').length;
  const present = attendance.filter(
    (a: any) => a.status === 'Present' || a.status === 'Authorised'
  ).length;
  return {
    college: collegeRes.data,
    learners_total: students.length,
    learners_active: active,
    learners_high_risk: students.filter((s: any) => s.risk_level === 'High').length,
    attendance_present_pct: attendance.length ? Math.round((present / attendance.length) * 100) : null,
    grades_total: grades.length,
    epa_outcomes: epa.reduce((acc: any, e: any) => {
      const k = e.result || e.status || 'in_progress';
      acc[k] = (acc[k] ?? 0) + 1;
      return acc;
    }, {}),
  };
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

  if (body.action === 'start') {
    const scenario: Scenario = body.scenario || 'general';
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
            content: `Scenario focus: ${SCENARIO_FOCUS[scenario]}\n\nCollege snapshot:\n${JSON.stringify(snapshot, null, 2)}\n\nOpen the rehearsal with ONE probing question.`,
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
            content: `Scenario: ${SCENARIO_FOCUS[existing.scenario as Scenario]}\n\nSnapshot:\n${JSON.stringify(existing.source_signals, null, 2)}\n\nTranscript so far:\n${turns
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

    const { data: updated } = await sb
      .from('college_inspection_rehearsals')
      .update({
        turns: newTurns,
        status: shouldAutoFinish ? 'complete' : 'active',
      })
      .eq('id', existing.id)
      .select('*')
      .single();

    return new Response(JSON.stringify({ rehearsal: updated, auto_finished: shouldAutoFinish }), {
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
            content: `Snapshot:\n${JSON.stringify(existing.source_signals, null, 2)}\n\nTranscript:\n${turns
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
    let parsed: { verdict: string; summary: string; strengths: string[]; weaknesses: string[] };
    try {
      parsed = JSON.parse(toolCall.function.arguments);
    } catch {
      return new Response(JSON.stringify({ error: 'ai_bad_json' }), {
        status: 502,
        headers: { ...corsHeaders, 'content-type': 'application/json' },
      });
    }

    const { data: finished } = await sb
      .from('college_inspection_rehearsals')
      .update({
        status: 'complete',
        overall_verdict: parsed.verdict,
        verdict_summary: parsed.summary,
        strengths: parsed.strengths,
        weaknesses: parsed.weaknesses,
      })
      .eq('id', existing.id)
      .select('*')
      .single();

    return new Response(JSON.stringify({ rehearsal: finished }), {
      headers: { ...corsHeaders, 'content-type': 'application/json' },
    });
  }

  return new Response(JSON.stringify({ error: 'unknown_action' }), {
    status: 400,
    headers: { ...corsHeaders, 'content-type': 'application/json' },
  });
});
