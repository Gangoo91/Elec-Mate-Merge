// AI Parse Assessment Document — reads a tutor-uploaded source doc
// (lesson plan / past paper / tutor notes / brief / scheme of work / reading)
// and generates a full quiz OR assessment grounded in:
//   • the doc's actual content (so questions test what was taught)
//   • the qualification ACs (every item maps to one)
//   • BS 7671 facets (every claim cites a regulation)
//
// Mixed question kinds: multi_choice, true_false, short_answer, calculation,
// scenario, long_answer.
//
// POST {
//   document_id: uuid,                  // already inserted into tutor_assessment_documents
//   target_kind: 'quiz' | 'assessment' | 'mock_exam',
//   college_student_id?: uuid,          // optional learner targeting
//   cohort_id?: uuid,
//   count?: number,                     // 1-20, default depends on kind
//   difficulty?: 'easy'|'medium'|'hard',
//   title?: string,
//   time_limit_minutes?: number,
//   pass_mark?: number,
//   is_homework?: boolean,
//   due_date?: string,
//   publish?: boolean
// }
// → { quiz_id, questions_count, citations_count, kind, quiz, questions }

import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.57.4';
import { captureException } from '../_shared/sentry.ts';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type, x-supabase-timeout, x-request-id',
};

const CHAT_MODEL = 'gpt-5.4-mini-2026-03-17';
// Same headroom logic as ai-author-quiz — assessments + mock exams typically
// want 10-20 questions, each ~700 tokens. 14k covers the typical case.
const MAX_COMPLETION_TOKENS = 14_000;
const FACET_TOP_K = 5;
const MAX_DOC_CHARS = 18_000; // Cap doc text fed to model

interface ParseRequest {
  document_id: string;
  target_kind?: 'quiz' | 'assessment' | 'mock_exam';
  college_student_id?: string;
  cohort_id?: string;
  lesson_plan_id?: string;
  count?: number;
  difficulty?: 'easy' | 'medium' | 'hard';
  title?: string;
  time_limit_minutes?: number;
  pass_mark?: number;
  is_homework?: boolean;
  due_date?: string;
  publish?: boolean;
}

async function authoriseStaff(req: Request, sb: ReturnType<typeof createClient>) {
  const auth = req.headers.get('authorization');
  if (!auth) return { user: null, profile: null, error: 'unauthorized' as const };
  const userClient = createClient(
    Deno.env.get('SUPABASE_URL')!,
    Deno.env.get('SUPABASE_ANON_KEY')!,
    { global: { headers: { Authorization: auth } }, auth: { persistSession: false } }
  );
  const { data: userData } = await userClient.auth.getUser();
  if (!userData?.user) return { user: null, profile: null, error: 'unauthorized' as const };
  const { data: profile } = await sb
    .from('profiles')
    .select('id, college_id, full_name')
    .eq('id', userData.user.id)
    .maybeSingle();
  if (!profile?.college_id)
    return { user: userData.user, profile: null, error: 'no_college' as const };
  return { user: userData.user, profile, error: null };
}

interface AcEntry {
  qualification_code: string;
  unit_code: string;
  ac_code: string;
  description: string | null;
}

async function loadAcsForQualification(
  sb: ReturnType<typeof createClient>,
  qualificationCode: string,
  limit = 80
): Promise<AcEntry[]> {
  const { data } = await sb
    .from('qualification_requirements')
    .select('qualification_code, unit_code, ac_code, description')
    .eq('qualification_code', qualificationCode)
    .limit(limit);
  return ((data ?? []) as AcEntry[]);
}

async function lookupFacetsFromText(
  sb: ReturnType<typeof createClient>,
  parsedText: string
): Promise<Array<{ ref: string; reg_part: string | null; topic: string; content: string; regulation_id: string | null }>> {
  // Heuristic: pull a handful of focused queries from the doc text by
  // splitting on common headings + first-line blocks. Cheap but effective.
  const sentences = parsedText
    .split(/[.\n]/)
    .map((s) => s.trim())
    .filter((s) => s.length >= 30 && s.length <= 200);
  const queries = sentences.slice(0, 6);
  if (queries.length === 0) queries.push('inspection and testing');

  const out: Array<{ ref: string; reg_part: string | null; topic: string; content: string; regulation_id: string | null }> = [];
  for (const q of queries) {
    try {
      const { data } = await sb.rpc('match_bs7671_for_text', {
        q_text: q,
        doc_type: null,
        max_results: FACET_TOP_K,
      });
      const rows = (data ?? []) as Array<{
        regulation_id: string | null;
        reg_number: string | null;
        reg_part: string | null;
        primary_topic: string | null;
        content: string | null;
      }>;
      for (const r of rows) {
        out.push({
          ref: r.reg_number ?? r.primary_topic ?? 'BS 7671',
          reg_part: r.reg_part ?? null,
          topic: q.slice(0, 60),
          content: (r.content ?? '').slice(0, 320),
          regulation_id: r.regulation_id ?? null,
        });
      }
    } catch {
      /* skip */
    }
  }
  // Dedupe
  const seen = new Set<string>();
  return out.filter((f) => {
    const key = `${f.ref}|${f.content.slice(0, 60)}`;
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });
}

const PARSE_TOOL = {
  type: 'function',
  function: {
    name: 'submit_assessment',
    description: 'Submit a complete quiz or assessment derived from the source document. Use a mix of question kinds appropriate to what the document covers.',
    parameters: {
      type: 'object',
      additionalProperties: false,
      required: ['title', 'description', 'kind', 'questions'],
      properties: {
        title: { type: 'string' },
        description: { type: 'string', description: 'What the assessment covers; reference the source document type.' },
        instructions: { type: 'string', description: 'Brief instructions to the learner before they start.' },
        kind: { type: 'string', enum: ['quiz', 'assessment', 'mock_exam'] },
        topic: { type: 'string' },
        rubric: {
          type: 'object',
          additionalProperties: false,
          properties: {
            grading_principles: { type: 'array', items: { type: 'string' } },
            distinction_threshold: { type: 'integer' },
            merit_threshold: { type: 'integer' },
            pass_threshold: { type: 'integer' },
          },
        },
        questions: {
          type: 'array',
          minItems: 1,
          maxItems: 20,
          items: {
            type: 'object',
            additionalProperties: false,
            required: ['question_kind', 'question_text', 'difficulty'],
            properties: {
              question_kind: {
                type: 'string',
                enum: ['multi_choice', 'true_false', 'short_answer', 'long_answer', 'calculation', 'scenario'],
              },
              question_text: { type: 'string' },
              difficulty: { type: 'string', enum: ['easy', 'medium', 'hard'] },
              category: { type: 'string' },
              ac_ref: { type: 'string', description: 'Unit:AC reference where applicable.' },
              points: { type: 'integer', minimum: 1, maximum: 10 },
              explanation: { type: 'string' },
              marking_guidance: { type: 'string', description: 'How a tutor (or AI) should mark this question.' },
              // Multi-choice specific
              options: {
                type: 'array',
                items: { type: 'string' },
                description: 'For multi_choice and true_false. true_false uses ["True","False"].',
              },
              correct_answer_index: { type: 'integer', minimum: 0, maximum: 5 },
              // Free response specific (one of these per kind)
              expected_answer: {
                type: 'object',
                additionalProperties: true,
                description: 'Schema varies by kind. short_answer: { keywords:string[], min_length:int, sample_answer:text }. long_answer: { rubric_points:[{point,weight}], sample_answer }. calculation: { numeric_value:number, tolerance:number, units:string, working_required:bool }. scenario: { rubric_points:[], expected_steps:[], danger_flags:[] }.',
              },
              bs7671_citations: {
                type: 'array',
                items: {
                  type: 'object',
                  additionalProperties: false,
                  required: ['ref'],
                  properties: {
                    ref: { type: 'string' },
                    regulation_id: { type: 'string' },
                    snippet: { type: 'string' },
                  },
                },
              },
            },
          },
        },
      },
    },
  },
} as const;

interface ParsedQuestion {
  question_kind: 'multi_choice' | 'true_false' | 'short_answer' | 'long_answer' | 'calculation' | 'scenario';
  question_text: string;
  difficulty: 'easy' | 'medium' | 'hard';
  category?: string;
  ac_ref?: string;
  points?: number;
  explanation?: string;
  marking_guidance?: string;
  options?: string[];
  correct_answer_index?: number;
  expected_answer?: Record<string, unknown>;
  bs7671_citations?: Array<{ ref: string; regulation_id?: string; snippet?: string }>;
}

interface ParsedAssessment {
  title: string;
  description: string;
  instructions?: string;
  kind: 'quiz' | 'assessment' | 'mock_exam';
  topic?: string;
  rubric?: Record<string, unknown>;
  questions: ParsedQuestion[];
}

function systemPrompt(): string {
  return `You are an expert UK electrical apprenticeship assessor and quiz author.

You are given a source document (lesson plan, past paper, tutor notes, brief, etc.) PLUS:
- The qualification's Assessment Criteria (ACs)
- A list of BS 7671 facets you may cite

Your job: read the doc carefully, understand what it teaches or assesses, then produce a quiz OR assessment that genuinely tests what's in the document.

HARD RULES:
- UK English (analyse, behaviour, programme).
- Mix question kinds appropriately to the document type:
  · Lesson plan / tutor notes → mostly multi_choice + short_answer + scenario, some calculation if numeric content
  · Past paper / mock exam → mirror the original structure (multi_choice, calculation, long_answer)
  · Assessment brief / scheme of work → assessment kind with long_answer + scenario + practical-style prompts
  · Reading → mostly short_answer comprehension + multi_choice + one scenario
- Every question MUST be answerable from the document content (do not invent material).
- Every question MUST map to an AC from the provided list using "<unit_code>:<ac_code>".
- Every safety-related claim MUST cite a BS 7671 ref from the provided facet list — do NOT invent regulation numbers.
- multi_choice: ONE correct answer, 3-4 plausible distractors. correct_answer_index is 0-based.
- true_false: options must be exactly ["True","False"].
- short_answer: expected_answer = { keywords:string[], min_length:int (chars), sample_answer:string }
- long_answer: expected_answer = { rubric_points: [{point:string, weight:number}], sample_answer:string }
- calculation: expected_answer = { numeric_value:number, tolerance:number, units:string, working_required:boolean }. Include "show your working" in the question text when working_required.
- scenario: expected_answer = { rubric_points:[{point,weight}], expected_steps:string[], danger_flags:string[] }. Frame as a realistic site situation.
- Difficulty: spread per requested mix. "medium" → 30/50/20 easy/medium/hard.
- marking_guidance: 1-2 sentences telling a tutor (or AI grader) how to mark this question.
- Avoid trick wording, "all of the above", multi-correct, or dangerous misinformation.

Call submit_assessment EXACTLY ONCE.`;
}

function userPrompt(
  doc: { title: string; source_kind: string; parsed_text: string; qualification_code: string | null },
  acs: AcEntry[],
  facets: Array<{ ref: string; reg_part: string | null; topic: string; content: string; regulation_id: string | null }>,
  body: ParseRequest
): string {
  const lines: string[] = [];
  lines.push(`# Source document`);
  lines.push(`Title: ${doc.title}`);
  lines.push(`Type: ${doc.source_kind}`);
  if (doc.qualification_code) lines.push(`Qualification: ${doc.qualification_code}`);
  lines.push(`Target output: ${body.target_kind ?? 'quiz'}`);
  lines.push(`Difficulty: ${body.difficulty ?? 'medium'}`);
  lines.push(`Question count: ${body.count ?? (body.target_kind === 'mock_exam' ? 12 : body.target_kind === 'assessment' ? 8 : 6)}`);

  lines.push('');
  lines.push('## Document content');
  lines.push('---');
  lines.push((doc.parsed_text ?? '').slice(0, MAX_DOC_CHARS));
  lines.push('---');

  lines.push('');
  lines.push('## Available ACs (every question must map to one of these)');
  for (const a of acs.slice(0, 60)) {
    lines.push(`- [${a.unit_code}:${a.ac_code}] ${a.description ?? '(no description)'}`);
  }

  lines.push('');
  lines.push('## BS 7671 facets you may cite (only these refs — do not invent)');
  if (facets.length === 0) {
    lines.push('No facets retrieved — keep BS 7671 references minimal.');
  } else {
    for (const f of facets.slice(0, 15)) {
      const part = f.reg_part ? ` · Part ${f.reg_part}` : '';
      lines.push(`- [ref ${f.ref}${part}${f.regulation_id ? `, regulation_id ${f.regulation_id}` : ''}] ${f.content}`);
    }
  }

  lines.push('');
  lines.push('Now author the quiz/assessment via submit_assessment. Use a mix of question kinds appropriate to the document.');
  return lines.join('\n');
}

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

  const auth = await authoriseStaff(req, sb);
  if (auth.error || !auth.user || !auth.profile) {
    return new Response(JSON.stringify({ error: auth.error ?? 'unauthorized' }), {
      status: 401,
      headers: { ...corsHeaders, 'content-type': 'application/json' },
    });
  }

  let body: ParseRequest;
  try {
    body = (await req.json()) as ParseRequest;
  } catch {
    return new Response(JSON.stringify({ error: 'invalid_json' }), {
      status: 400,
      headers: { ...corsHeaders, 'content-type': 'application/json' },
    });
  }
  if (!body.document_id) {
    return new Response(JSON.stringify({ error: 'missing_document_id' }), {
      status: 400,
      headers: { ...corsHeaders, 'content-type': 'application/json' },
    });
  }

  try {
    // Load document — must belong to caller's college
    const { data: docRow } = await sb
      .from('tutor_assessment_documents')
      .select('id, title, description, source_kind, qualification_code, parsed_text, college_id, status')
      .eq('id', body.document_id)
      .eq('college_id', auth.profile.college_id as string)
      .maybeSingle();
    const doc = docRow as
      | {
          id: string;
          title: string;
          description: string | null;
          source_kind: string;
          qualification_code: string | null;
          parsed_text: string | null;
          college_id: string;
          status: string;
        }
      | null;
    if (!doc) {
      return new Response(JSON.stringify({ error: 'document_not_found_or_no_access' }), {
        status: 404,
        headers: { ...corsHeaders, 'content-type': 'application/json' },
      });
    }
    if (!doc.parsed_text || doc.parsed_text.trim().length < 50) {
      return new Response(
        JSON.stringify({
          error: 'no_parsed_text',
          detail: 'Upload the document and ensure parsed_text is populated before authoring.',
        }),
        { status: 400, headers: { ...corsHeaders, 'content-type': 'application/json' } }
      );
    }

    // Resolve qualification — prefer doc, fallback to learner/cohort course
    let qualificationCode: string | null = doc.qualification_code;
    if (!qualificationCode && body.college_student_id) {
      const { data: cs } = await sb
        .from('college_students')
        .select('course_id, college_courses(code)')
        .eq('id', body.college_student_id)
        .maybeSingle();
      const code = ((cs as { college_courses?: { code: string | null } } | null)?.college_courses?.code) ?? null;
      qualificationCode = code;
    }

    // ACs to feed model
    const acs: AcEntry[] = qualificationCode
      ? await loadAcsForQualification(sb, qualificationCode, 80)
      : [];

    // BS 7671 facets via doc text
    const facets = await lookupFacetsFromText(sb, doc.parsed_text);

    const messages = [
      { role: 'system', content: systemPrompt() },
      {
        role: 'user',
        content: userPrompt(
          { title: doc.title, source_kind: doc.source_kind, parsed_text: doc.parsed_text, qualification_code: qualificationCode },
          acs,
          facets,
          body
        ),
      },
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
        tools: [PARSE_TOOL],
        tool_choice: { type: 'function', function: { name: 'submit_assessment' } },
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
    const parsed = JSON.parse(args) as ParsedAssessment;

    // Persist
    const isPublished = body.publish !== false;
    const finalKind = body.target_kind ?? parsed.kind ?? 'quiz';
    const finalCount = parsed.questions.length;
    const finalTimeLimit =
      body.time_limit_minutes ??
      (finalKind === 'mock_exam' ? 90 : finalKind === 'assessment' ? 60 : 20);
    const finalPassMark = body.pass_mark ?? 60;

    // Translate single learner into assigned_student_ids (user_id form)
    let assignedStudentIds: string[] = [];
    if (body.college_student_id) {
      const { data: cs } = await sb
        .from('college_students')
        .select('user_id')
        .eq('id', body.college_student_id)
        .maybeSingle();
      const uid = ((cs as { user_id?: string } | null)?.user_id) ?? null;
      if (uid) assignedStudentIds = [uid];
    }

    const { data: quizRow, error: quizErr } = await sb
      .from('tutor_quizzes')
      .insert({
        creator_id: auth.user.id,
        title: body.title?.trim() || parsed.title,
        description: parsed.description,
        instructions: parsed.instructions ?? null,
        topic: parsed.topic ?? null,
        difficulty: body.difficulty ?? 'medium',
        time_limit_minutes: finalTimeLimit,
        pass_mark: finalPassMark,
        is_published: isPublished,
        cohort_id: body.cohort_id ?? null,
        lesson_plan_id: body.lesson_plan_id ?? null,
        qualification_code: qualificationCode,
        due_date: body.due_date ?? null,
        is_homework: body.is_homework ?? false,
        assigned_student_ids: assignedStudentIds,
        source: 'ai_authored',
        kind: finalKind,
        source_document_id: doc.id,
        rubric: parsed.rubric ?? {},
        ai_signals_used: {
          source_document_id: doc.id,
          source_kind: doc.source_kind,
          qualification_code: qualificationCode,
          ac_targets_pool: acs.length,
          facets_pulled: facets.length,
          requested_count: body.count ?? null,
          requested_difficulty: body.difficulty ?? 'medium',
        },
        published_at: isPublished ? new Date().toISOString() : null,
      })
      .select('id')
      .single();
    if (quizErr || !quizRow) {
      return new Response(
        JSON.stringify({ error: 'quiz_insert_failed', detail: quizErr?.message ?? '' }),
        { status: 500, headers: { ...corsHeaders, 'content-type': 'application/json' } }
      );
    }
    const quizId = (quizRow as { id: string }).id;

    const questionRows = parsed.questions.map((q, i) => ({
      quiz_id: quizId,
      question_kind: q.question_kind,
      question_text: q.question_text,
      options: q.options ?? null,
      correct_answer_index: q.correct_answer_index ?? null,
      expected_answer: q.expected_answer ?? {},
      explanation: q.explanation ?? null,
      marking_guidance: q.marking_guidance ?? null,
      category: q.category ?? null,
      difficulty: q.difficulty,
      ac_ref: q.ac_ref ?? null,
      points: q.points ?? 1,
      sort_order: i + 1,
      bs7671_citations: q.bs7671_citations ?? [],
    }));
    const { error: qErr } = await sb.from('tutor_quiz_questions').insert(questionRows);
    if (qErr) {
      await sb.from('tutor_quizzes').delete().eq('id', quizId);
      return new Response(
        JSON.stringify({ error: 'questions_insert_failed', detail: qErr.message }),
        { status: 500, headers: { ...corsHeaders, 'content-type': 'application/json' } }
      );
    }

    const totalCitations = parsed.questions.reduce(
      (s, q) => s + (q.bs7671_citations?.length ?? 0),
      0
    );

    // Push notify when published in this single step (the K.3 sheet publishes
    // separately, so this only fires for tutors who pass publish=true).
    if (isPublished) {
      try {
        const recipients = new Set<string>();
        if (body.college_student_id) {
          const { data: cs } = await sb
            .from('college_students')
            .select('user_id')
            .eq('id', body.college_student_id)
            .maybeSingle();
          const uid = ((cs as { user_id?: string } | null)?.user_id) ?? null;
          if (uid) recipients.add(uid);
        }
        if (body.cohort_id) {
          const { data: cohortStudents } = await sb
            .from('college_students')
            .select('user_id')
            .eq('cohort_id', body.cohort_id)
            .neq('status', 'withdrawn')
            .neq('status', 'completed');
          for (const r of ((cohortStudents ?? []) as Array<{ user_id: string | null }>)) {
            if (r.user_id) recipients.add(r.user_id);
          }
        }
        const titleLabel = body.title?.trim() || parsed.title;
        const kindLabel =
          finalKind === 'mock_exam' ? 'Mock exam' : finalKind === 'assessment' ? 'Assessment' : 'Quiz';
        const dueLabel = body.due_date ? ` · due ${body.due_date}` : '';
        for (const uid of recipients) {
          if (uid === auth.user.id) continue;
          await fetch(`${SUPABASE_URL}/functions/v1/send-push-notification`, {
            method: 'POST',
            headers: {
              'content-type': 'application/json',
              authorization: `Bearer ${SERVICE_KEY}`,
            },
            body: JSON.stringify({
              userId: uid,
              title: `${kindLabel}: ${titleLabel}`,
              body: `${parsed.questions.length} questions${dueLabel}. Tap to start.`,
              type: 'college',
              data: {
                kind: 'tutor_quiz_assigned',
                quiz_id: quizId,
                deeplink: `/apprentice/college/quiz/${quizId}`,
              },
            }),
          }).catch(() => undefined);
        }
      } catch {
        /* best-effort — push failures shouldn't break the response */
      }
    }

    return new Response(
      JSON.stringify({
        quiz_id: quizId,
        kind: finalKind,
        questions_count: finalCount,
        citations_count: totalCitations,
        quiz: {
          id: quizId,
          title: body.title?.trim() || parsed.title,
          description: parsed.description,
          instructions: parsed.instructions ?? null,
          difficulty: body.difficulty ?? 'medium',
          time_limit_minutes: finalTimeLimit,
          pass_mark: finalPassMark,
          is_published: isPublished,
          kind: finalKind,
        },
        questions: parsed.questions,
        meta: {
          source_document_id: doc.id,
          source_kind: doc.source_kind,
          qualification_code: qualificationCode,
          acs_in_pool: acs.length,
          facets_pulled: facets.length,
        },
      }),
      { headers: { ...corsHeaders, 'content-type': 'application/json' } }
    );
  } catch (e) {
    await captureException(e, { functionName: 'ai-parse-assessment-document', requestUrl: req.url, requestMethod: req.method });
    return new Response(
      JSON.stringify({ error: (e as Error).message ?? 'unknown' }),
      { status: 500, headers: { ...corsHeaders, 'content-type': 'application/json' } }
    );
  }
});
