// Draft a tutor-led 1-2-1 agenda for a specific learner.
// Pulls comprehensive context (profile, risk, attendance, grades, coverage
// gaps, open flags) and streams a tutor-ready markdown agenda via SSE.
//
// Input: { student_id: string, focus?: string[] }
// Output: SSE events — status, chunk (delta), done
//
// Auth: caller must be staff at the student's college.

import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.57.4';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
  'Access-Control-Allow-Headers': 'authorization, content-type, apikey',
};

const CHAT_MODEL = 'gpt-5-mini-2025-08-07';
const MAX_TOKENS = 4_000;
const STREAM_TIMEOUT_MS = 120_000;

function sseEvent(event: string, data: unknown): Uint8Array {
  return new TextEncoder().encode(`event: ${event}\ndata: ${JSON.stringify(data)}\n\n`);
}

function sseComment(msg: string): Uint8Array {
  return new TextEncoder().encode(`: ${msg}\n\n`);
}

const SYSTEM_PROMPT = `You are SARAH WHITAKER — an experienced UK Further Education electrical lecturer who runs warm, honest, action-driven 1-2-1s with apprentices.

You are preparing a tutor-led 1-2-1 meeting agenda for a specific learner, based on their real data. British English throughout ("colour", "behaviour", "centre", "analyse", "organise", "programme").

Your agenda is:
- Warm, never clinical. Treats the learner as a person first.
- Evidence-first. Every observation references something from the data.
- Honest about concerns without being confrontational.
- Ends with clear, concrete agreed actions and a review date.
- Practical — a tutor can open the meeting with this in hand and run it well.

FORMAT — single markdown document, ~250-400 words. Use these H2 headings in this order, and leave a blank line before AND after every heading, plus between paragraphs:

## Opening
One short paragraph (2-3 sentences): a warm opener that acknowledges effort, names one specific positive from the data.

## What's going well
2-4 concrete positives from the data (attendance days present, recent grade, coverage progress, praise notes). Reference specifics.

## What I'm noticing
2-4 honest, evidence-backed observations about concerns. Not accusatory — descriptive. Reference the data (attendance drop, stalled evidence, missed deadline, grade dip).

## What I want to understand
3-5 open questions the tutor should ask, sequenced from easiest to most challenging. Inviting, not interrogative.

## Where we need to go
2-3 paragraphs on priorities for the next block of work — specific ACs or units to focus on, what support looks like, what the apprentice needs to commit to.

## Agreed actions
A bulleted list of 3-5 concrete actions. Each starts with a verb, names who owns it ("Apprentice:" / "Tutor:"), and has a realistic by-when date or condition.

## Review
One line: when we'll check in next, and what we'll look at.

Do not invent facts. If a signal is absent or unclear, say so ("We haven't seen…").
Do not moralise. Focus on next moves.
Do not use the learner's first name until the Opening (then use it sparingly).`;

function block(title: string, lines: string[]): string {
  if (lines.length === 0) return '';
  return `${title}:\n${lines.map((l) => `  - ${l}`).join('\n')}`;
}

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS')
    return new Response(null, { status: 204, headers: corsHeaders });
  if (req.method !== 'POST') {
    return new Response(JSON.stringify({ error: 'method_not_allowed' }), {
      status: 405,
      headers: { ...corsHeaders, 'content-type': 'application/json' },
    });
  }

  const SUPABASE_URL = Deno.env.get('SUPABASE_URL');
  const SERVICE_KEY = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY');
  const OPENAI_KEY = Deno.env.get('OPENAI_API_KEY');
  if (!SUPABASE_URL || !SERVICE_KEY || !OPENAI_KEY) {
    return new Response(JSON.stringify({ error: 'server_misconfigured' }), {
      status: 500,
      headers: { ...corsHeaders, 'content-type': 'application/json' },
    });
  }

  const sb = createClient(SUPABASE_URL, SERVICE_KEY, {
    auth: { persistSession: false, autoRefreshToken: false },
  });

  // Auth check — staff at the student's college
  const authHeader = req.headers.get('authorization');
  if (!authHeader) {
    return new Response(JSON.stringify({ error: 'unauthorized' }), {
      status: 401,
      headers: { ...corsHeaders, 'content-type': 'application/json' },
    });
  }
  const userClient = createClient(
    SUPABASE_URL,
    Deno.env.get('SUPABASE_ANON_KEY')!,
    { global: { headers: { Authorization: authHeader } }, auth: { persistSession: false } }
  );
  const { data: userRes } = await userClient.auth.getUser();
  if (!userRes?.user) {
    return new Response(JSON.stringify({ error: 'unauthorized' }), {
      status: 401,
      headers: { ...corsHeaders, 'content-type': 'application/json' },
    });
  }

  let body: { student_id?: string; focus?: string[] };
  try {
    body = await req.json();
  } catch {
    return new Response(JSON.stringify({ error: 'invalid_json' }), {
      status: 400,
      headers: { ...corsHeaders, 'content-type': 'application/json' },
    });
  }
  if (!body.student_id) {
    return new Response(JSON.stringify({ error: 'missing_student_id' }), {
      status: 400,
      headers: { ...corsHeaders, 'content-type': 'application/json' },
    });
  }
  const studentId = body.student_id;

  // Verify caller has access
  const { data: student, error: studentErr } = await sb
    .from('college_students')
    .select('id, name, college_id, cohort_id, course_id, progress_percent, risk_level, expected_end_date, college_cohorts(name), college_courses(name, level)')
    .eq('id', studentId)
    .maybeSingle();
  if (studentErr || !student) {
    return new Response(JSON.stringify({ error: 'student_not_found' }), {
      status: 404,
      headers: { ...corsHeaders, 'content-type': 'application/json' },
    });
  }

  const { data: callerStaff } = await sb
    .from('college_staff')
    .select('id')
    .eq('user_id', userRes.user.id)
    .eq('college_id', student.college_id)
    .maybeSingle();
  if (!callerStaff) {
    return new Response(JSON.stringify({ error: 'not_at_student_college' }), {
      status: 403,
      headers: { ...corsHeaders, 'content-type': 'application/json' },
    });
  }

  const stream = new ReadableStream<Uint8Array>({
    async start(controller) {
      const emit = (event: string, data: unknown) => controller.enqueue(sseEvent(event, data));
      const keepalive = setInterval(() => controller.enqueue(sseComment('keepalive')), 10_000);

      try {
        emit('status', { phase: 'gathering_context' });

        // Context assembly in parallel
        const [
          { data: riskRow },
          { data: attRows },
          { data: grades },
          { data: coverage },
          { data: recentNotes },
        ] = await Promise.all([
          sb
            .from('student_risk_scores')
            .select('score, level, factors, signals, computed_at')
            .eq('student_id', studentId)
            .eq('is_current', true)
            .order('computed_at', { ascending: false })
            .limit(1)
            .maybeSingle(),
          sb
            .from('college_attendance')
            .select('date, status')
            .eq('student_id', studentId)
            .gte(
              'date',
              new Date(Date.now() - 56 * 86400_000).toISOString().slice(0, 10)
            )
            .order('date', { ascending: false }),
          sb
            .from('college_grades')
            .select('unit_name, assessment_type, grade, score, assessed_at, feedback')
            .eq('student_id', studentId)
            .order('assessed_at', { ascending: false, nullsFirst: false })
            .limit(5),
          sb
            .from('student_ac_coverage')
            .select('qualification_code, unit_code, ac_code, status, last_evidence_at')
            .eq('student_id', studentId),
          sb
            .from('pastoral_notes')
            .select('kind, title, body, action_required, action_completed_at, created_at')
            .eq('student_id', studentId)
            .order('created_at', { ascending: false })
            .limit(8),
        ]);

        // Build compact context block
        const now = new Date();
        const iso28 = new Date(now.getTime() - 28 * 86400_000).toISOString().slice(0, 10);
        const iso56 = new Date(now.getTime() - 56 * 86400_000).toISOString().slice(0, 10);
        const recentAtt = (attRows ?? []).filter((r) => r.date >= iso28);
        const priorAtt = (attRows ?? []).filter(
          (r) => r.date >= iso56 && r.date < iso28
        );
        const attRate = (rows: { status: string }[]) =>
          rows.length
            ? rows.filter((r) => r.status === 'present' || r.status === 'late').length /
              rows.length
            : null;
        const recentRate = attRate(recentAtt);
        const priorRate = attRate(priorAtt);
        const absencesRecent = recentAtt.filter((r) => r.status === 'absent').length;
        const latesRecent = recentAtt.filter((r) => r.status === 'late').length;

        const totalAc = (coverage ?? []).length;
        const doneAc = (coverage ?? []).filter((c) =>
          ['evidenced', 'assessed', 'confirmed'].includes(c.status as string)
        ).length;
        const stalledAc = (coverage ?? []).filter((c) => c.status === 'in_progress');
        const neverStarted = (coverage ?? []).filter(
          (c) => c.status === 'not_started'
        );

        const openFlags = (recentNotes ?? []).filter(
          (n) =>
            n.action_required &&
            !n.action_completed_at &&
            ['flag', 'concern', 'safeguarding'].includes(n.kind as string)
        );

        const grades5 = (grades ?? []).map((g) => {
          const bits = [
            g.unit_name ?? 'Assessment',
            g.grade ? `grade ${g.grade}` : null,
            g.score != null ? `score ${g.score}` : null,
            g.assessed_at
              ? `on ${new Date(g.assessed_at).toLocaleDateString('en-GB')}`
              : null,
          ].filter(Boolean);
          return bits.join(' · ');
        });

        const factorLines = (
          (riskRow?.factors as { label: string; detail?: string }[] | null) ?? []
        )
          .slice(0, 6)
          .map((f) => `${f.label}${f.detail ? ` — ${f.detail}` : ''}`);

        const coherentContext = [
          `LEARNER: ${student.name}`,
          student.college_cohorts
            ? `COHORT: ${(student.college_cohorts as { name?: string }).name}`
            : null,
          student.college_courses
            ? `COURSE: ${(student.college_courses as { name?: string; level?: string }).name} (${(student.college_courses as { level?: string }).level ?? 'level unknown'})`
            : null,
          student.progress_percent != null
            ? `PROGRESS: ${student.progress_percent}% overall`
            : null,
          student.risk_level ? `RISK LEVEL: ${student.risk_level}` : null,
          student.expected_end_date
            ? `EXPECTED END DATE: ${student.expected_end_date}`
            : null,
          '',
          riskRow ? `RISK SCORE: ${Number(riskRow.score).toFixed(1)} (${riskRow.level})` : 'RISK SCORE: not yet computed',
          factorLines.length ? block('TOP CONTRIBUTING FACTORS', factorLines) : '',
          '',
          recentRate !== null
            ? `ATTENDANCE last 28 days: ${Math.round(recentRate * 100)}% (${recentAtt.length} sessions, ${absencesRecent} absent, ${latesRecent} late)`
            : 'ATTENDANCE last 28 days: no sessions recorded',
          priorRate !== null && recentRate !== null
            ? `  prior 28 days: ${Math.round(priorRate * 100)}% (delta ${
                recentRate >= priorRate ? '+' : ''
              }${Math.round((recentRate - priorRate) * 100)}pp)`
            : null,
          '',
          totalAc > 0
            ? `AC COVERAGE: ${doneAc}/${totalAc} evidenced or above (${Math.round((doneAc / totalAc) * 100)}%)`
            : 'AC COVERAGE: not yet seeded',
          stalledAc.length
            ? `  in_progress ACs (${stalledAc.length}): ${stalledAc
                .slice(0, 8)
                .map((a) => `${a.unit_code}:${a.ac_code}`)
                .join(', ')}${stalledAc.length > 8 ? ` +${stalledAc.length - 8} more` : ''}`
            : null,
          neverStarted.length
            ? `  not_started ACs (${neverStarted.length}): showing the first 8 — ${neverStarted
                .slice(0, 8)
                .map((a) => `${a.unit_code}:${a.ac_code}`)
                .join(', ')}`
            : null,
          '',
          grades5.length
            ? block('RECENT ASSESSMENTS (newest first)', grades5)
            : 'RECENT ASSESSMENTS: none recorded',
          '',
          openFlags.length
            ? block(
                'OPEN PASTORAL FLAGS',
                openFlags.map((n) =>
                  `[${n.kind}] ${n.title ?? '(no title)'} — action: ${n.action_required}`
                )
              )
            : 'OPEN PASTORAL FLAGS: none',
          '',
          (recentNotes ?? []).length
            ? block(
                'RECENT NOTE HEADLINES',
                (recentNotes ?? []).slice(0, 5).map((n) => {
                  const when = new Date(n.created_at).toLocaleDateString('en-GB', {
                    day: 'numeric',
                    month: 'short',
                  });
                  return `[${when} · ${n.kind}] ${n.title ?? n.body.slice(0, 80)}`;
                })
              )
            : null,
          body.focus?.length
            ? `\nTUTOR HAS ASKED TO FOCUS ON: ${body.focus.join(', ')}`
            : '',
        ]
          .filter((l) => l !== null && l !== undefined && l !== '')
          .join('\n');

        emit('status', { phase: 'drafting' });

        const ctrl = new AbortController();
        const timer = setTimeout(() => ctrl.abort(), STREAM_TIMEOUT_MS);

        const resp = await fetch('https://api.openai.com/v1/chat/completions', {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${OPENAI_KEY}`,
            'content-type': 'application/json',
          },
          body: JSON.stringify({
            model: CHAT_MODEL,
            messages: [
              { role: 'system', content: SYSTEM_PROMPT },
              {
                role: 'user',
                content: `Draft a 1-2-1 agenda using the following learner data. Do not invent anything not present in the data.\n\n${coherentContext}`,
              },
            ],
            max_completion_tokens: MAX_TOKENS,
            stream: true,
          }),
          signal: ctrl.signal,
        });

        if (!resp.ok || !resp.body) {
          const t = await resp.text();
          throw new Error(`OpenAI ${resp.status}: ${t.slice(0, 400)}`);
        }

        const reader = resp.body.getReader();
        const dec = new TextDecoder();
        let acc = '';
        let buf = '';
        while (true) {
          const { value, done } = await reader.read();
          if (done) break;
          buf += dec.decode(value, { stream: true });
          const frames = buf.split('\n\n');
          buf = frames.pop() ?? '';
          for (const frame of frames) {
            const line = frame.trim();
            if (!line.startsWith('data:')) continue;
            const data = line.slice(5).trim();
            if (data === '[DONE]') continue;
            try {
              const chunk = JSON.parse(data);
              const delta = chunk.choices?.[0]?.delta?.content;
              if (delta) {
                acc += delta;
                emit('chunk', { delta });
              }
            } catch {
              // ignore
            }
          }
        }
        clearTimeout(timer);

        emit('done', { length: acc.length });
      } catch (e) {
        console.error('[draft-1-2-1] error', e);
        emit('error', { message: (e as Error).message ?? 'Unknown error' });
      } finally {
        clearInterval(keepalive);
        controller.close();
      }
    },
  });

  return new Response(stream, {
    headers: {
      ...corsHeaders,
      'content-type': 'text/event-stream; charset=utf-8',
      'cache-control': 'no-store, no-transform',
      'x-accel-buffering': 'no',
    },
  });
});
