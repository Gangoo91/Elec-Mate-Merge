// AI Grade Free-Response — marks short_answer / long_answer / scenario answers
// for a tutor_quiz_attempt using gpt-5-mini, then recomputes the attempt's
// total score (auto-graded portion + AI/tutor-override portion).
//
// Idempotent — call again after a tutor override to re-tally.
//
// Auth: learner of the attempt OR tutor of the quiz OR assessor/tutor in
// the same college as the learner.
// POST { attempt_id }

import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.57.4';
import { captureException } from '../_shared/sentry.ts';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type, x-supabase-timeout, x-request-id',
};

const CHAT_MODEL = 'gpt-5.4-mini-2026-03-17';
const MAX_COMPLETION_TOKENS = 4_000;

interface ReqBody {
  attempt_id: string;
}

type SbClient = ReturnType<typeof createClient>;

interface AttemptRow {
  id: string;
  quiz_id: string;
  student_id: string;
  answers: Record<string, LearnerAnswer> | null;
  score: number | null;
  total_points: number | null;
}

interface QuizRow {
  id: string;
  title: string;
  pass_mark: number | null;
  creator_id: string | null;
  qualification_code: string | null;
}

interface QuestionRow {
  id: string;
  question_kind: string;
  question_text: string;
  options: string[] | null;
  correct_answer_index: number | null;
  expected_answer: Record<string, unknown> | null;
  marking_guidance: string | null;
  points: number | null;
  ac_ref: string | null;
  bs7671_citations: Array<{ ref: string; snippet?: string }> | null;
}

type LearnerAnswer =
  | { kind: 'multi_choice'; index: number }
  | { kind: 'true_false'; value: boolean }
  | { kind: 'short_answer' | 'long_answer' | 'scenario'; text: string }
  | { kind: 'calculation'; numeric: number | null; working: string }
  | {
      kind: 'image_annotation' | 'practical_evidence';
      caption: string;
      files: Array<{ url: string; name: string; mime?: string }>;
    };

function isFreeResponse(kind: string): boolean {
  return (
    kind === 'short_answer' ||
    kind === 'long_answer' ||
    kind === 'scenario' ||
    kind === 'image_annotation' ||
    kind === 'practical_evidence'
  );
}

/* ───────────────────────── auth ───────────────────────── */

async function authorise(
  req: Request,
  sb: SbClient,
  attempt: AttemptRow,
  quiz: QuizRow
): Promise<{ ok: true; uid: string; role: 'learner' | 'tutor' | 'staff' } | { ok: false; error: 'unauthorized' | 'forbidden' }> {
  const auth = req.headers.get('authorization');
  if (!auth) return { ok: false, error: 'unauthorized' };
  const userClient = createClient(
    Deno.env.get('SUPABASE_URL')!,
    Deno.env.get('SUPABASE_ANON_KEY')!,
    { global: { headers: { Authorization: auth } }, auth: { persistSession: false } }
  );
  const { data: userData } = await userClient.auth.getUser();
  const uid = userData?.user?.id;
  if (!uid) return { ok: false, error: 'unauthorized' };

  if (uid === attempt.student_id) return { ok: true, uid, role: 'learner' };
  if (quiz.creator_id && uid === quiz.creator_id) return { ok: true, uid, role: 'tutor' };

  // Same-college staff
  const { data: cs } = await sb
    .from('college_students')
    .select('college_id')
    .eq('user_id', attempt.student_id)
    .maybeSingle();
  const cid = (cs as { college_id?: string } | null)?.college_id;
  if (cid) {
    const { data: staff } = await sb
      .from('college_staff')
      .select('id')
      .eq('user_id', uid)
      .eq('college_id', cid)
      .maybeSingle();
    if (staff) return { ok: true, uid, role: 'staff' };
  }
  return { ok: false, error: 'forbidden' };
}

/* ───────────────────── grading prompt ───────────────────── */

const GRADE_TOOL = {
  type: 'function',
  function: {
    name: 'submit_grades',
    description: 'Submit a grade for every free-response answer.',
    parameters: {
      type: 'object',
      additionalProperties: false,
      properties: {
        grades: {
          type: 'array',
          description: 'One entry per question_id provided in the input.',
          items: {
            type: 'object',
            additionalProperties: false,
            properties: {
              question_id: { type: 'string' },
              score: {
                type: 'number',
                description: 'Score between 0 and the question\'s points (inclusive). Half-marks allowed.',
              },
              rationale: {
                type: 'string',
                description: '1–3 sentences explaining the score, grounded in the marking guidance and BS 7671 citations where relevant.',
              },
              strengths: {
                type: 'array',
                description: 'Up to 3 short specific strengths from THIS learner\'s answer. Quote phrases where useful.',
                items: { type: 'string' },
              },
              areas: {
                type: 'array',
                description: 'Up to 3 short specific things the learner missed or should improve.',
                items: { type: 'string' },
              },
            },
            required: ['question_id', 'score', 'rationale', 'strengths', 'areas'],
          },
        },
      },
      required: ['grades'],
    },
  },
} as const;

interface GradeArg {
  question_id: string;
  score: number;
  rationale: string;
  strengths: string[];
  areas: string[];
}

function buildSystemPrompt(): string {
  return `You are a fair, rigorous UK Further-Education assessor marking electrical-installation apprentice quiz answers.

UK English (analyse, behaviour, programme).

Rules:
- Award score against the marking_guidance and expected_answer. Half-marks allowed.
- If the learner cites BS 7671 from the citation list, credit it. If they invent a regulation reference, do not.
- Be specific in rationale. Reference the learner's actual words, not generic praise.
- "strengths" must be things in THIS answer (not generic). "areas" must be concrete improvements ("you didn't mention RCD selection for the socket circuit") not platitudes.
- If the answer is empty/blank, score 0 with rationale "No answer submitted."
- If the answer is off-topic, score 0 with a rationale explaining why.
- Never exceed the question's max points.

Submit via the submit_grades tool exactly once with one entry per question_id.`;
}

function buildUserPrompt(items: Array<{ q: QuestionRow; a: LearnerAnswer | undefined }>, quiz: QuizRow): string {
  const lines: string[] = [];
  lines.push(`# Quiz: ${quiz.title}`);
  if (quiz.qualification_code) lines.push(`Qualification: ${quiz.qualification_code}`);
  lines.push('');

  for (const { q, a } of items) {
    let learnerText = '';
    let mediaSummary = '';
    if (a) {
      if (a.kind === 'short_answer' || a.kind === 'long_answer' || a.kind === 'scenario') {
        learnerText = a.text ?? '';
      } else if (a.kind === 'image_annotation' || a.kind === 'practical_evidence') {
        learnerText = a.caption ?? '';
        if (a.files && a.files.length > 0) {
          mediaSummary = a.files.map((f) => `${f.name}${f.mime ? ` (${f.mime})` : ''}`).join(', ');
        }
      }
    }
    const expected = q.expected_answer ?? {};
    lines.push(`## Question id=${q.id} — max ${q.points ?? 1} pts (kind=${q.question_kind})`);
    if (q.ac_ref) lines.push(`AC: ${q.ac_ref}`);
    lines.push(`Question: ${q.question_text}`);
    if (q.marking_guidance) lines.push(`Marking guidance: ${q.marking_guidance}`);
    if (Object.keys(expected).length > 0) {
      lines.push(`Expected answer outline: ${JSON.stringify(expected)}`);
    }
    if (q.bs7671_citations && q.bs7671_citations.length > 0) {
      lines.push(`BS 7671 citations attached to this question:`);
      for (const c of q.bs7671_citations) {
        lines.push(`  - ${c.ref}${c.snippet ? `: ${c.snippet}` : ''}`);
      }
    }
    if (mediaSummary) {
      lines.push(`Media uploaded: ${mediaSummary}`);
      lines.push(
        '(You cannot view the file directly — grade based on the learner caption + your knowledge of what the AC requires. Be conservative if the caption is empty.)'
      );
    }
    lines.push(`Learner answer (${q.question_kind === 'image_annotation' || q.question_kind === 'practical_evidence' ? 'caption' : 'text'}):`);
    lines.push(learnerText.trim() ? learnerText.trim() : '[no answer submitted]');
    lines.push('');
  }
  lines.push('Grade every question above via submit_grades. One entry per question_id.');
  return lines.join('\n');
}

/* ─────────────────── attempt score recompute ─────────────────── */

interface ScoreBreakdown {
  total: number;
  total_points: number;
  auto_graded: number;
  free_response: number;
  passed: boolean | null;
}

async function recomputeAttemptScore(
  sb: SbClient,
  attempt: AttemptRow,
  quiz: QuizRow,
  questions: QuestionRow[]
): Promise<ScoreBreakdown> {
  const answers = attempt.answers ?? {};
  let auto = 0;
  let totalPoints = 0;
  for (const q of questions) {
    const points = q.points ?? 1;
    totalPoints += points;
    const a = answers[q.id];
    if (a == null) continue;
    if (q.question_kind === 'multi_choice' && a.kind === 'multi_choice') {
      if (a.index === q.correct_answer_index) auto += points;
    } else if (q.question_kind === 'true_false' && a.kind === 'true_false') {
      const expectedTrue = q.correct_answer_index === 0;
      if (a.value === expectedTrue) auto += points;
    } else if (q.question_kind === 'calculation' && a.kind === 'calculation') {
      const expected = (q.expected_answer ?? {}) as { numeric_value?: number; tolerance?: number };
      if (
        expected.numeric_value != null &&
        a.numeric != null &&
        Math.abs(a.numeric - expected.numeric_value) <= (expected.tolerance ?? 0)
      ) {
        auto += points;
      }
    }
  }

  // Free-response from grades table — use tutor_override_score if present, else ai_score, else 0.
  const { data: grades } = await sb
    .from('tutor_quiz_answer_grades')
    .select('question_id, ai_score, tutor_override_score')
    .eq('attempt_id', attempt.id);
  let freeResponse = 0;
  for (const g of (grades ?? []) as Array<{ question_id: string; ai_score: number | null; tutor_override_score: number | null }>) {
    const effective = g.tutor_override_score ?? g.ai_score ?? 0;
    freeResponse += effective;
  }

  const total = auto + freeResponse;
  const pct = totalPoints > 0 ? (total / totalPoints) * 100 : 0;
  const passed = quiz.pass_mark != null ? pct >= quiz.pass_mark : null;
  return { total, total_points: totalPoints, auto_graded: auto, free_response: freeResponse, passed };
}

/* ───────────────────────── handler ───────────────────────── */

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') return new Response('ok', { headers: corsHeaders });
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
  const sb = createClient(SUPABASE_URL, SERVICE_KEY, {
    auth: { persistSession: false, autoRefreshToken: false },
  });

  let body: ReqBody;
  try {
    body = (await req.json()) as ReqBody;
  } catch {
    return new Response(JSON.stringify({ error: 'invalid_json' }), {
      status: 400,
      headers: { ...corsHeaders, 'content-type': 'application/json' },
    });
  }
  if (!body.attempt_id) {
    return new Response(JSON.stringify({ error: 'missing_attempt_id' }), {
      status: 400,
      headers: { ...corsHeaders, 'content-type': 'application/json' },
    });
  }

  try {
    const { data: attempt } = await sb
      .from('tutor_quiz_attempts')
      .select('id, quiz_id, student_id, answers, score, total_points')
      .eq('id', body.attempt_id)
      .maybeSingle();
    if (!attempt) {
      return new Response(JSON.stringify({ error: 'attempt_not_found' }), {
        status: 404,
        headers: { ...corsHeaders, 'content-type': 'application/json' },
      });
    }
    const a = attempt as AttemptRow;

    const { data: quiz } = await sb
      .from('tutor_quizzes')
      .select('id, title, pass_mark, creator_id, qualification_code')
      .eq('id', a.quiz_id)
      .maybeSingle();
    if (!quiz) {
      return new Response(JSON.stringify({ error: 'quiz_not_found' }), {
        status: 404,
        headers: { ...corsHeaders, 'content-type': 'application/json' },
      });
    }
    const q = quiz as QuizRow;

    const authResult = await authorise(req, sb, a, q);
    if (!authResult.ok) {
      return new Response(JSON.stringify({ error: authResult.error }), {
        status: authResult.error === 'forbidden' ? 403 : 401,
        headers: { ...corsHeaders, 'content-type': 'application/json' },
      });
    }

    // Load all questions (we need them for the score recompute regardless)
    const { data: questions } = await sb
      .from('tutor_quiz_questions')
      .select(
        'id, question_kind, question_text, options, correct_answer_index, expected_answer, marking_guidance, points, ac_ref, bs7671_citations'
      )
      .eq('quiz_id', a.quiz_id);
    const qs = (questions ?? []) as QuestionRow[];

    // Find ungraded free-response rows (no ai_score yet) that have a learner answer
    const { data: existingGrades } = await sb
      .from('tutor_quiz_answer_grades')
      .select('question_id, ai_score')
      .eq('attempt_id', a.id);
    const gradedSet = new Set(
      ((existingGrades ?? []) as Array<{ question_id: string; ai_score: number | null }>)
        .filter((g) => g.ai_score != null)
        .map((g) => g.question_id)
    );

    const answers = a.answers ?? {};
    const toGrade: Array<{ q: QuestionRow; a: LearnerAnswer | undefined }> = [];
    for (const question of qs) {
      if (!isFreeResponse(question.question_kind)) continue;
      if (gradedSet.has(question.id)) continue;
      const learnerAnswer = answers[question.id];
      // Even if no answer, we still want to record a 0 with rationale — push it to AI
      toGrade.push({ q: question, a: learnerAnswer });
    }

    let gradedCount = 0;
    if (toGrade.length > 0) {
      const messages = [
        { role: 'system', content: buildSystemPrompt() },
        { role: 'user', content: buildUserPrompt(toGrade, q) },
      ];
      const completion = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          authorization: `Bearer ${OPENAI_KEY}`,
          'content-type': 'application/json',
        },
        body: JSON.stringify({
          model: CHAT_MODEL,
          messages,
          tools: [GRADE_TOOL],
          tool_choice: { type: 'function', function: { name: 'submit_grades' } },
          max_completion_tokens: MAX_COMPLETION_TOKENS,
        }),
      });
      if (!completion.ok) {
        const text = await completion.text();
        return new Response(
          JSON.stringify({ error: `openai_${completion.status}`, detail: text.slice(0, 240) }),
          { status: 500, headers: { ...corsHeaders, 'content-type': 'application/json' } }
        );
      }
      const json = (await completion.json()) as {
        choices: Array<{ message: { tool_calls?: Array<{ function: { arguments: string } }> } }>;
      };
      const args = json.choices?.[0]?.message?.tool_calls?.[0]?.function?.arguments;
      if (!args) {
        return new Response(JSON.stringify({ error: 'no_tool_call' }), {
          status: 500,
          headers: { ...corsHeaders, 'content-type': 'application/json' },
        });
      }
      const parsed = JSON.parse(args) as { grades: GradeArg[] };
      const gradeMap = new Map<string, GradeArg>(parsed.grades.map((g) => [g.question_id, g]));

      // Upsert each grade row. We may already have a "queued" row (ai_score NULL)
      // from the apprentice submit step; or it may not exist if the queue insert
      // failed. Use upsert on (attempt_id, question_id) — but Postgres needs a
      // unique constraint for that. Fall back to delete+insert per row.
      for (const item of toGrade) {
        const g = gradeMap.get(item.q.id);
        if (!g) continue;
        const points = item.q.points ?? 1;
        const score = Math.max(0, Math.min(points, Number(g.score) || 0));
        // Try update first (where ai_score is null), then insert if no row.
        const { data: existing } = await sb
          .from('tutor_quiz_answer_grades')
          .select('id')
          .eq('attempt_id', a.id)
          .eq('question_id', item.q.id)
          .maybeSingle();
        if (existing) {
          await sb
            .from('tutor_quiz_answer_grades')
            .update({
              learner_answer: item.a ?? null,
              ai_score: score,
              ai_rationale: g.rationale,
              ai_strengths: g.strengths,
              ai_areas: g.areas,
            })
            .eq('id', (existing as { id: string }).id);
        } else {
          await sb.from('tutor_quiz_answer_grades').insert({
            attempt_id: a.id,
            question_id: item.q.id,
            learner_answer: item.a ?? null,
            ai_score: score,
            ai_rationale: g.rationale,
            ai_strengths: g.strengths,
            ai_areas: g.areas,
          });
        }
        gradedCount += 1;
      }
    }

    // Recompute attempt total score (auto-graded + free-response with override fallback)
    const breakdown = await recomputeAttemptScore(sb, a, q, qs);
    await sb
      .from('tutor_quiz_attempts')
      .update({
        score: Math.round(breakdown.total),
        total_points: breakdown.total_points,
      })
      .eq('id', a.id);

    // Notify the learner that their AI grades have landed (only when this call
    // actually graded something — not on idempotent re-tally calls).
    if (gradedCount > 0 && authResult.role !== 'tutor' && authResult.role !== 'staff') {
      try {
        const pct = breakdown.total_points > 0
          ? Math.round((breakdown.total / breakdown.total_points) * 100)
          : 0;
        await fetch(`${SUPABASE_URL}/functions/v1/send-push-notification`, {
          method: 'POST',
          headers: {
            'content-type': 'application/json',
            authorization: `Bearer ${SERVICE_KEY}`,
          },
          body: JSON.stringify({
            userId: a.student_id,
            title: `AI marked your written answers`,
            body: `${q.title} — final score ${pct}%${breakdown.passed ? ' · passed' : ''}.`,
            type: 'college',
            data: {
              kind: 'tutor_quiz_ai_graded',
              quiz_id: q.id,
              attempt_id: a.id,
              deeplink: `/apprentice/college/quiz/${q.id}`,
            },
          }),
        }).catch(() => undefined);
      } catch {
        /* best-effort */
      }
    }

    return new Response(
      JSON.stringify({
        graded: gradedCount,
        score: breakdown.total,
        total_points: breakdown.total_points,
        auto_graded: breakdown.auto_graded,
        free_response: breakdown.free_response,
        percentage:
          breakdown.total_points > 0
            ? Math.round((breakdown.total / breakdown.total_points) * 100)
            : 0,
        passed: breakdown.passed,
      }),
      { headers: { ...corsHeaders, 'content-type': 'application/json' } }
    );
  } catch (e) {
    await captureException(e, { functionName: 'ai-grade-free-response', requestUrl: req.url, requestMethod: req.method });
    return new Response(
      JSON.stringify({ error: (e as Error).message ?? 'unknown' }),
      { status: 500, headers: { ...corsHeaders, 'content-type': 'application/json' } }
    );
  }
});
