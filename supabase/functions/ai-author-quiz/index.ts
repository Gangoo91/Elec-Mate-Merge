// AI Author Quiz — generates a quiz/assessment grounded in BS 7671 facets
// and the qualification's ACs. Every question carries a regulation citation
// the tutor can verify; every question is mapped to an AC for traceability.
//
// POST {
//   college_student_id?: uuid,    // when targeting one learner — pulls weak ACs
//   cohort_id?: uuid,             // when targeting a cohort
//   ac_codes?: string[],          // optional explicit AC list to focus on
//   topic?: string,               // free-form topic if no AC list
//   difficulty?: 'easy'|'medium'|'hard',
//   count?: number,               // 5 default, 1-15 allowed
//   title?: string,
//   time_limit_minutes?: number,
//   pass_mark?: number,
//   is_homework?: boolean,
//   due_date?: string,
//   lesson_plan_id?: uuid,
//   publish?: boolean             // default true — is_published immediately
// }
// →  { quiz_id, questions_count, citations_count, quiz, questions }

import { captureException } from '../_shared/sentry.ts';
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.57.4';
import {
  loadLearnerContext,
  loadQualificationKit,
  lookupBs7671Facets,
  lookupQualificationAcs,
  bs7671SeedQueries,
  raggedAcLines,
  qualificationAcLines,
  GROUNDING_RULES,
  type LearnerContext,
} from '../_shared/learner-context.ts';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type, x-supabase-timeout, x-request-id',
};

const CHAT_MODEL = 'gpt-5.4-mini-2026-03-17';
// Each authored question runs ~600-900 tokens once you account for citations
// + explanation + marking_guidance. 14k headroom covers ~15 questions before
// the model truncates mid-tool-call (the cause of the "timeout on >5
// questions" symptom — it wasn't a network timeout, it was the model running
// out of completion budget mid-JSON, breaking the tool_call args parse).
const MAX_COMPLETION_TOKENS = 14_000;
const FACET_TOP_K = 5;

interface AuthorRequest {
  college_student_id?: string;
  cohort_id?: string;
  ac_codes?: string[];
  topic?: string;
  difficulty?: 'easy' | 'medium' | 'hard';
  count?: number;
  title?: string;
  time_limit_minutes?: number;
  pass_mark?: number;
  is_homework?: boolean;
  due_date?: string;
  lesson_plan_id?: string;
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

interface AuthorContext {
  qualification_code: string | null;
  qualification_title: string | null;
  ac_targets: AcEntry[];          // the ACs this quiz targets
  weak_ac_hint: AcEntry[];         // when single learner: ACs they're not_started/in_progress
  topic_label: string;
  // Learner-specific signals (populated when college_student_id provided)
  learner_name: string | null;
  ksbs_in_progress: Array<{ ksb_code: string; ksb_type: string; description: string | null }>;
  portfolio_titles: string[];                                // recent submission titles to AVOID retesting
  partial_observation_topics: string[];                      // partial/referred observation activity titles
  weak_quiz_categories: Array<{ category: string; avg_score: number; attempts: number }>;
  inclusion: { send_flags: string[]; eal: boolean; ehcp: boolean; first_language: string | null };
  recent_grade_band: 'distinction' | 'merit' | 'pass' | 'fail' | null;
}

async function loadContext(
  sb: ReturnType<typeof createClient>,
  body: AuthorRequest,
  collegeId: string
): Promise<AuthorContext | null> {
  let qualificationCode: string | null = null;
  let qualificationTitle: string | null = null;

  // Resolve qualification: prefer learner.course → cohort.course → null
  let courseId: string | null = null;
  if (body.college_student_id) {
    const { data: cs } = await sb
      .from('college_students')
      .select('course_id, cohort_id')
      .eq('id', body.college_student_id)
      .eq('college_id', collegeId)
      .maybeSingle();
    courseId = ((cs as { course_id?: string } | null)?.course_id) ?? null;
  } else if (body.cohort_id) {
    const { data: ch } = await sb
      .from('college_cohorts')
      .select('course_id')
      .eq('id', body.cohort_id)
      .maybeSingle();
    courseId = ((ch as { course_id?: string } | null)?.course_id) ?? null;
  }
  if (courseId) {
    const { data: c } = await sb
      .from('college_courses')
      .select('code, name')
      .eq('id', courseId)
      .maybeSingle();
    if (c) {
      qualificationCode = (c.code as string | null) ?? null;
      qualificationTitle = (c.name as string | null) ?? null;
    }
  }

  // Look up explicit ACs (with descriptions) when ac_codes provided
  let acTargets: AcEntry[] = [];
  if (body.ac_codes && body.ac_codes.length > 0 && qualificationCode) {
    const { data: rows } = await sb
      .from('qualification_requirements')
      .select('qualification_code, unit_code, ac_code, description')
      .eq('qualification_code', qualificationCode)
      .in('ac_code', body.ac_codes);
    acTargets = ((rows ?? []) as AcEntry[]);
  }

  // For single learner — surface their weakest ACs as a hint
  let weakAcHint: AcEntry[] = [];
  if (body.college_student_id && qualificationCode) {
    const { data: weak } = await sb
      .from('student_ac_coverage')
      .select('qualification_code, unit_code, ac_code, status')
      .eq('student_id', body.college_student_id)
      .in('status', ['not_started', 'in_progress']);
    const top = ((weak ?? []) as Array<{ qualification_code: string; unit_code: string; ac_code: string }>)
      .slice(0, 12);
    if (top.length > 0) {
      const acCodes = top.map((t) => t.ac_code);
      const { data: rows } = await sb
        .from('qualification_requirements')
        .select('qualification_code, unit_code, ac_code, description')
        .eq('qualification_code', qualificationCode)
        .in('ac_code', acCodes);
      weakAcHint = ((rows ?? []) as AcEntry[]);
    }
  }

  const topic_label = body.topic
    ? body.topic
    : acTargets.length > 0
      ? acTargets.map((a) => a.ac_code).join(', ')
      : weakAcHint.length > 0
        ? `weak areas (${weakAcHint.length} ACs)`
        : 'general electrical knowledge';

  // Per-learner signals — only populated when targeting a single learner.
  // These let the AI avoid retesting evidenced things, build on partial
  // observations, and adjust language to inclusion needs.
  let learner_name: string | null = null;
  let ksbs_in_progress: AuthorContext['ksbs_in_progress'] = [];
  let portfolio_titles: string[] = [];
  let partial_observation_topics: string[] = [];
  let weak_quiz_categories: AuthorContext['weak_quiz_categories'] = [];
  let inclusion: AuthorContext['inclusion'] = {
    send_flags: [],
    eal: false,
    ehcp: false,
    first_language: null,
  };
  let recent_grade_band: AuthorContext['recent_grade_band'] = null;

  if (body.college_student_id) {
    const { data: studentRow } = await sb
      .from('college_students')
      .select('id, user_id, name, send_flags, eal, ehcp_ref, first_language')
      .eq('id', body.college_student_id)
      .eq('college_id', collegeId)
      .maybeSingle();
    const sRow = studentRow as
      | {
          user_id: string | null;
          name: string;
          send_flags: string[] | null;
          eal: boolean | null;
          ehcp_ref: string | null;
          first_language: string | null;
        }
      | null;
    if (sRow) {
      learner_name = sRow.name;
      inclusion = {
        send_flags: sRow.send_flags ?? [],
        eal: Boolean(sRow.eal),
        ehcp: Boolean(sRow.ehcp_ref),
        first_language: sRow.first_language,
      };
      const userId = sRow.user_id;

      if (userId) {
        // KSBs in flight (not yet verified) — let AI build on them
        const { data: ksbProgress } = await sb
          .from('user_ksb_progress')
          .select('status, ksb_id, apprenticeship_ksbs(ksb_code, ksb_type, description)')
          .eq('user_id', userId)
          .in('status', ['in_progress', 'evidence_submitted']);
        ksbs_in_progress = ((ksbProgress ?? []) as Array<{
          status: string;
          apprenticeship_ksbs: { ksb_code: string; ksb_type: string; description: string | null } | null;
        }>)
          .filter((r) => r.apprenticeship_ksbs)
          .slice(0, 8)
          .map((r) => ({
            ksb_code: r.apprenticeship_ksbs!.ksb_code,
            ksb_type: r.apprenticeship_ksbs!.ksb_type,
            description: r.apprenticeship_ksbs!.description,
          }));

        // Portfolio titles — avoid re-quizzing things already evidenced
        const { data: portRows } = await sb
          .from('portfolio_items')
          .select('title')
          .eq('user_id', userId)
          .order('created_at', { ascending: false })
          .limit(20);
        portfolio_titles = ((portRows ?? []) as Array<{ title: string | null }>)
          .map((r) => (r.title ?? '').trim())
          .filter((t) => t.length > 0);

        // Mock simulator weak categories (component_scores jsonb)
        const { data: mockRows } = await sb
          .from('epa_mock_sessions')
          .select('overall_score, component_scores, predicted_grade')
          .eq('user_id', userId)
          .eq('status', 'completed')
          .order('completed_at', { ascending: false })
          .limit(8);
        const mocks = ((mockRows ?? []) as Array<{
          overall_score: number | null;
          component_scores: Record<string, number> | null;
          predicted_grade: string | null;
        }>);
        // Latest predicted grade band
        if (mocks.length > 0) {
          const g = (mocks[0].predicted_grade ?? '').toLowerCase();
          if (g === 'distinction' || g === 'merit' || g === 'pass' || g === 'fail') {
            recent_grade_band = g as AuthorContext['recent_grade_band'];
          }
        }
        // Aggregate weak categories
        const catTotals = new Map<string, { total: number; count: number }>();
        for (const m of mocks) {
          const cs = m.component_scores ?? {};
          for (const [cat, val] of Object.entries(cs)) {
            if (typeof val !== 'number') continue;
            const t = catTotals.get(cat) ?? { total: 0, count: 0 };
            t.total += val;
            t.count += 1;
            catTotals.set(cat, t);
          }
        }
        weak_quiz_categories = Array.from(catTotals.entries())
          .map(([category, t]) => ({ category, avg_score: Math.round(t.total / t.count), attempts: t.count }))
          .filter((x) => x.avg_score < 70)
          .sort((a, b) => a.avg_score - b.avg_score)
          .slice(0, 4);
      }

      // Partial / referred observations — build on what they got partially right
      const { data: obsRows } = await sb
        .from('college_observations')
        .select('activity_title')
        .eq('college_student_id', body.college_student_id)
        .in('outcome', ['partial', 'referred'])
        .order('observed_at', { ascending: false })
        .limit(4);
      partial_observation_topics = ((obsRows ?? []) as Array<{ activity_title: string | null }>)
        .map((r) => (r.activity_title ?? '').trim())
        .filter((t) => t.length > 0);
    }
  }

  return {
    qualification_code: qualificationCode,
    qualification_title: qualificationTitle,
    ac_targets: acTargets,
    weak_ac_hint: weakAcHint,
    topic_label,
    learner_name,
    ksbs_in_progress,
    portfolio_titles,
    partial_observation_topics,
    weak_quiz_categories,
    inclusion,
    recent_grade_band,
  };
}

async function lookupFacets(
  sb: ReturnType<typeof createClient>,
  ctx: AuthorContext,
  body: AuthorRequest
): Promise<Array<{ ref: string; reg_part: string | null; topic: string; content: string; regulation_id: string | null }>> {
  const queries: string[] = [];
  // From explicit ACs first
  for (const a of ctx.ac_targets.slice(0, 3)) {
    queries.push(a.description ?? `AC ${a.ac_code} unit ${a.unit_code}`);
  }
  if (queries.length === 0 && ctx.weak_ac_hint.length > 0) {
    for (const a of ctx.weak_ac_hint.slice(0, 4)) {
      queries.push(a.description ?? `AC ${a.ac_code} unit ${a.unit_code}`);
    }
  }
  if (queries.length === 0 && body.topic) queries.push(body.topic);
  if (queries.length === 0) queries.push('initial verification inspection and testing');

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
          topic: q,
          content: (r.content ?? '').slice(0, 360),
          regulation_id: r.regulation_id ?? null,
        });
      }
    } catch {
      /* skip query */
    }
  }
  // Dedupe by reg ref + content prefix
  const seen = new Set<string>();
  return out.filter((f) => {
    const key = `${f.ref}|${f.content.slice(0, 60)}`;
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });
}

const QUIZ_TOOL = {
  type: 'function',
  function: {
    name: 'submit_quiz',
    description: 'Submit a structured quiz with N questions, each cited against BS 7671 and mapped to an AC.',
    parameters: {
      type: 'object',
      additionalProperties: false,
      required: ['title', 'description', 'questions'],
      properties: {
        title: { type: 'string', description: 'Tight, descriptive title (max 80 chars).' },
        description: { type: 'string', description: '1-2 sentences describing what the quiz covers and the level expected.' },
        topic: { type: 'string', description: 'Short topic label.' },
        questions: {
          type: 'array',
          minItems: 1,
          maxItems: 15,
          items: {
            type: 'object',
            additionalProperties: false,
            required: ['question_text', 'options', 'correct_answer_index', 'explanation', 'difficulty'],
            properties: {
              question_text: { type: 'string' },
              options: {
                type: 'array',
                minItems: 3,
                maxItems: 5,
                items: { type: 'string' },
                description: 'Multiple-choice options. Only ONE is correct.',
              },
              correct_answer_index: { type: 'integer', minimum: 0, maximum: 4 },
              explanation: { type: 'string', description: 'Why this is the correct answer. Cite the BS 7671 reg if relevant.' },
              difficulty: { type: 'string', enum: ['easy', 'medium', 'hard'] },
              category: { type: 'string', description: 'e.g. "Inspection & testing" / "Earthing & bonding".' },
              ac_ref: { type: 'string', description: 'Unit:AC reference like "ELC2-005:3.4". Use the unit codes from the AC targets list.' },
              points: { type: 'integer', minimum: 1, maximum: 5 },
              bs7671_citations: {
                type: 'array',
                items: {
                  type: 'object',
                  additionalProperties: false,
                  required: ['ref'],
                  properties: {
                    ref: { type: 'string', description: 'BS 7671 regulation number, e.g. "411.3.2".' },
                    regulation_id: { type: 'string', description: 'UUID from the facet list when present.' },
                    snippet: { type: 'string', description: 'Short quoted/paraphrased extract.' },
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

interface QuizArgs {
  title: string;
  description: string;
  topic?: string;
  questions: Array<{
    question_text: string;
    options: string[];
    correct_answer_index: number;
    explanation: string;
    difficulty: 'easy' | 'medium' | 'hard';
    category?: string;
    ac_ref?: string;
    points?: number;
    bs7671_citations?: Array<{ ref: string; regulation_id?: string; snippet?: string }>;
  }>;
}

function systemPrompt(): string {
  return `You author UK electrical apprenticeship quizzes that are SAFE, ACCURATE, and CITATION-GRADE.

Hard rules:
- UK English (analyse, behaviour, programme, organisation).
- Each question must have ONE unambiguously correct answer. Distractors must be plausible but clearly wrong to a tutor.
- Every question maps to ONE ac_ref using "<unit_code>:<ac_code>" format from the AC catalogue you've been given. If targets are empty, use general topic categorisation.
- BS 7671 citations: only use refs from the facet list provided. Quote a short snippet (≤180 chars) per citation. Don't fabricate regulation numbers.
- Explanation must be educational — say WHY, link to the reg, and ideally a quick rule-of-thumb.
- Difficulty: spread across the requested difficulty level — at "medium" mix easy/medium/hard 30/50/20.
- Avoid dangerous misinformation: if you're unsure of an exact value (e.g. Zs limits), reference "the relevant table" rather than invent a number.
- No multi-correct, no "all of the above", no trick wording.

Quiz-history awareness (CRITICAL — added 2026-04-27):
- The learner context lists every recent quiz attempt with its score and the ACs touched. If the learner ALREADY PASSED an AC at ≥80% in the last 60 days, do NOT issue another question against that exact AC unless the tutor's request specifically targets it. Pick a different weak AC instead.
- If the learner FAILED an AC last week (<60%), favour that AC — but rephrase the question; don't reuse the wording the learner already saw.
- If the learner has a "Sent — not yet started" quiz on the same AC, mention it in the rationale: "you already have an unstarted quiz on this — consider waiting for them to take it before adding another."

Tone: neutral, precise, exam-style. Calibrate to the learner's qualification (Level 2 vs Level 3, T Level vs Apprenticeship Standard).

${GROUNDING_RULES}

Call submit_quiz EXACTLY ONCE.`;
}

function userPrompt(ctx: AuthorContext, facets: Array<{ ref: string; reg_part: string | null; topic: string; content: string; regulation_id: string | null }>, body: AuthorRequest): string {
  const lines: string[] = [];
  lines.push(`# Quiz request`);
  if (ctx.learner_name) lines.push(`Learner: ${ctx.learner_name}`);
  lines.push(`Topic: ${ctx.topic_label}`);
  if (ctx.qualification_title) lines.push(`Qualification: ${ctx.qualification_title} (${ctx.qualification_code ?? '?'})`);
  lines.push(`Difficulty mix: ${body.difficulty ?? 'medium'}`);
  lines.push(`Count: ${body.count ?? 5}`);

  // Inclusion adjustments — must shape language and scaffolding
  const inclusionFlags: string[] = [];
  if (ctx.inclusion.send_flags.length > 0) inclusionFlags.push(`SEND: ${ctx.inclusion.send_flags.join(', ')}`);
  if (ctx.inclusion.ehcp) inclusionFlags.push('EHCP');
  if (ctx.inclusion.eal) inclusionFlags.push(`EAL${ctx.inclusion.first_language ? ` (first language ${ctx.inclusion.first_language})` : ''}`);
  if (inclusionFlags.length > 0) {
    lines.push('');
    lines.push('## Inclusion adjustments — IMPORTANT');
    lines.push(`This learner has: ${inclusionFlags.join('; ')}.`);
    lines.push('Use shorter sentences (≤18 words). Avoid idioms. One concept per question. Define jargon on first use.');
  }

  if (ctx.ac_targets.length > 0) {
    lines.push('');
    lines.push('## AC targets — every question MUST map to one of these');
    for (const a of ctx.ac_targets) {
      lines.push(`- [${a.unit_code}:${a.ac_code}] ${a.description ?? '(no description)'}`);
    }
  } else if (ctx.weak_ac_hint.length > 0) {
    lines.push('');
    lines.push('## Learner is weakest on these ACs — favour them');
    for (const a of ctx.weak_ac_hint.slice(0, 8)) {
      lines.push(`- [${a.unit_code}:${a.ac_code}] ${a.description ?? '(no description)'}`);
    }
  }

  if (ctx.ksbs_in_progress.length > 0) {
    lines.push('');
    lines.push('## KSBs in progress — questions can probe these too');
    for (const k of ctx.ksbs_in_progress) {
      lines.push(`- [${k.ksb_code} · ${k.ksb_type}] ${k.description ?? ''}`);
    }
  }

  if (ctx.partial_observation_topics.length > 0) {
    lines.push('');
    lines.push('## Recent observations marked PARTIAL or REFERRED — build on these (the learner has practical exposure but missed something)');
    for (const t of ctx.partial_observation_topics) lines.push(`- ${t}`);
  }

  if (ctx.weak_quiz_categories.length > 0) {
    lines.push('');
    lines.push('## Categories the learner has been weakest on in mocks (avg < 70%) — bias toward these');
    for (const c of ctx.weak_quiz_categories) {
      lines.push(`- ${c.category}: ${c.avg_score}% across ${c.attempts} mock attempts`);
    }
  }

  if (ctx.recent_grade_band) {
    lines.push('');
    lines.push(`## Latest mock predicted grade: ${ctx.recent_grade_band}`);
    lines.push(
      ctx.recent_grade_band === 'distinction'
        ? 'Calibrate UPWARDS — push them with deeper reasoning questions.'
        : ctx.recent_grade_band === 'fail'
          ? 'Calibrate DOWNWARDS — focus on fundamentals; build confidence with achievable questions.'
          : 'Calibrate to the difficulty requested; mix some stretch questions.'
    );
  }

  if (ctx.portfolio_titles.length > 0) {
    lines.push('');
    lines.push('## Recent portfolio submission titles — DO NOT retest exactly these (assume the learner already knows this)');
    for (const t of ctx.portfolio_titles.slice(0, 12)) lines.push(`- ${t}`);
  }

  lines.push('');
  lines.push('## BS 7671 facets you may cite');
  if (facets.length === 0) lines.push('No facets retrieved — write general questions without citations.');
  for (const f of facets.slice(0, 14)) {
    const part = f.reg_part ? ` · Part ${f.reg_part}` : '';
    lines.push(`- [ref ${f.ref}${part}${f.regulation_id ? `, regulation_id ${f.regulation_id}` : ''}] (${f.topic}) ${f.content}`);
  }

  lines.push('');
  lines.push('Now author the quiz via submit_quiz.');
  return lines.join('\n');
}

/* ────────────────────────────────────────────────────────
   Quiz-history-aware rich context block. Surfaces the
   learner's recent quiz performance + ILP + EPA verdict +
   the RAG'd AC catalogue so the author doesn't reissue
   ACs the learner has already mastered.
   ──────────────────────────────────────────────────────── */
function buildRichBlock(ctx: LearnerContext, acsBlock: string[]): string {
  const lines: string[] = [];
  lines.push('');
  lines.push('## Recent quiz attempts (DO NOT reissue ACs the learner has aced)');

  const completedAttempts = ctx.quizzes.attempts.filter((a) => a.completed_at);
  if (completedAttempts.length === 0) {
    lines.push('No completed tutor-quiz attempts yet — fresh slate.');
  } else {
    // Aggregate per-AC: best percentage seen, count of attempts.
    const acPerf = new Map<string, { best: number; attempts: number; lastAt: string | null }>();
    for (const a of completedAttempts) {
      if (a.percentage == null || a.ac_refs.length === 0) continue;
      for (const ac of a.ac_refs) {
        const cur = acPerf.get(ac) ?? { best: 0, attempts: 0, lastAt: null };
        cur.best = Math.max(cur.best, a.percentage);
        cur.attempts += 1;
        if (!cur.lastAt || (a.completed_at && a.completed_at > cur.lastAt)) {
          cur.lastAt = a.completed_at;
        }
        acPerf.set(ac, cur);
      }
    }
    const aced: string[] = [];
    const failed: string[] = [];
    const struggled: string[] = [];
    for (const [ac, p] of acPerf.entries()) {
      if (p.best >= 80) aced.push(`${ac} (${p.best}% best)`);
      else if (p.best < 60) failed.push(`${ac} (${p.best}% best)`);
      else struggled.push(`${ac} (${p.best}% best)`);
    }
    if (aced.length > 0) {
      lines.push(`AVOID — already aced (≥80%): ${aced.slice(0, 12).join(', ')}`);
    }
    if (failed.length > 0) {
      lines.push(`FAVOUR — failed (<60%): ${failed.slice(0, 12).join(', ')}`);
    }
    if (struggled.length > 0) {
      lines.push(`PARTIAL — 60-79%, worth reinforcing: ${struggled.slice(0, 8).join(', ')}`);
    }
    // Most recent 4 attempts as a rolling window
    lines.push('Most recent 4:');
    for (const a of completedAttempts.slice(0, 4)) {
      const verdict = a.passed === true ? 'pass' : a.passed === false ? 'fail' : 'submitted';
      lines.push(
        `  - ${a.title} [${a.kind}]: ${a.percentage ?? '?'}% (${verdict})${a.ac_refs.length ? ` · ACs ${a.ac_refs.slice(0, 4).join(',')}` : ''}`
      );
    }
  }
  if (ctx.quizzes.sent_not_started > 0) {
    lines.push(
      `${ctx.quizzes.sent_not_started} quiz(es) already SENT but NOT STARTED — avoid duplicating those topics.`
    );
  }
  if (ctx.quizzes.weak_categories.length > 0) {
    lines.push(`Weak categories from quiz history: ${ctx.quizzes.weak_categories.join(', ')}`);
  }

  // Active ILP focus — questions should ideally support these goals
  if (ctx.ilp.headline_focus || ctx.ilp.goals.length > 0) {
    lines.push('');
    lines.push('## Active ILP focus (questions should support these where they fit)');
    if (ctx.ilp.headline_focus) lines.push(`Focus: ${ctx.ilp.headline_focus}`);
    const openGoals = ctx.ilp.goals.filter((g) => g.status !== 'completed' && g.status !== 'cancelled');
    for (const g of openGoals.slice(0, 4)) {
      lines.push(`  - [${g.status}] ${g.title}`);
    }
  }

  // EPA verdicts so the AI can calibrate to risk
  if (ctx.judgements.tutor || ctx.judgements.ai) {
    const v = ctx.judgements.tutor ?? ctx.judgements.ai!;
    lines.push('');
    lines.push(
      `## Latest EPA verdict: ${v.verdict}${v.predicted_grade ? ` (predicted ${v.predicted_grade})` : ''}`
    );
    if (v.verdict === 'not_yet' || v.verdict === 'refer') {
      lines.push('Calibrate harder than usual — this learner is behind and questions should stretch.');
    }
  }

  // KSBs in progress
  if (ctx.ksbs.length > 0) {
    const inProg = ctx.ksbs.filter((k) => k.status === 'in_progress' || k.status === 'evidence_submitted');
    if (inProg.length > 0) {
      lines.push('');
      lines.push(`## KSBs in progress (${inProg.length}) — questions can probe these`);
      for (const k of inProg.slice(0, 8)) lines.push(`  - ${k.ksb_code}`);
    }
  }

  // RAG'd AC catalogue — the AI MUST cite from this list
  if (acsBlock.length > 0) {
    for (const l of acsBlock) lines.push(l);
  }

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

  let body: AuthorRequest;
  try {
    body = (await req.json()) as AuthorRequest;
  } catch {
    return new Response(JSON.stringify({ error: 'invalid_json' }), {
      status: 400,
      headers: { ...corsHeaders, 'content-type': 'application/json' },
    });
  }

  try {
    const ctx = await loadContext(sb, body, auth.profile.college_id as string);
    if (!ctx) {
      return new Response(JSON.stringify({ error: 'context_load_failed' }), {
        status: 500,
        headers: { ...corsHeaders, 'content-type': 'application/json' },
      });
    }
    const facets = await lookupFacets(sb, ctx, body);

    // NEW (2026-04-27): pull the shared rich context so the AI sees recent
    // quiz attempts (which ACs the learner has just passed/failed), full
    // judgements, ILP focus, KSBs, attendance pattern, etc. Plus RAG'd ACs
    // from the qualification catalogue so questions cite real codes.
    let richCtx: LearnerContext | null = null;
    let raggedAcsBlock: string[] = [];
    if (body.college_student_id) {
      richCtx = await loadLearnerContext(sb, body.college_student_id);
      if (richCtx) {
        const seeds: string[] = [];
        if (body.topic) seeds.push(body.topic);
        if (body.ac_codes && body.ac_codes.length > 0) seeds.push(...body.ac_codes);
        seeds.push(...bs7671SeedQueries(richCtx));
        const [qualKit, raggedAcs] = await Promise.all([
          loadQualificationKit(sb, richCtx.course?.code ?? null),
          lookupQualificationAcs(sb, seeds, richCtx.course?.code ?? null, 8, 4),
        ]);
        raggedAcsBlock = raggedAcs.length > 0
          ? raggedAcLines(raggedAcs, 14)
          : qualificationAcLines(qualKit, 60);
      }
    }
    const richBlock = richCtx ? buildRichBlock(richCtx, raggedAcsBlock) : '';

    const messages = [
      { role: 'system', content: systemPrompt() },
      { role: 'user', content: userPrompt(ctx, facets, body) + richBlock },
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
        tools: [QUIZ_TOOL],
        tool_choice: { type: 'function', function: { name: 'submit_quiz' } },
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
    const parsed = JSON.parse(args) as QuizArgs;

    // Persist quiz + questions atomically
    const isPublished = body.publish !== false;
    const { data: quizRow, error: quizErr } = await sb
      .from('tutor_quizzes')
      .insert({
        creator_id: auth.user.id,
        title: body.title?.trim() || parsed.title,
        description: parsed.description,
        topic: parsed.topic ?? ctx.topic_label,
        difficulty: body.difficulty ?? 'medium',
        time_limit_minutes: body.time_limit_minutes ?? 15,
        pass_mark: body.pass_mark ?? 60,
        is_published: isPublished,
        cohort_id: body.cohort_id ?? null,
        qualification_code: ctx.qualification_code,
        lesson_plan_id: body.lesson_plan_id ?? null,
        due_date: body.due_date ?? null,
        is_homework: body.is_homework ?? false,
        assigned_student_ids:
          body.college_student_id
            ? // Translate college_student_id → user_id for the assigned_student_ids column
              await (async () => {
                const { data: cs } = await sb
                  .from('college_students')
                  .select('user_id')
                  .eq('id', body.college_student_id!)
                  .maybeSingle();
                const uid = ((cs as { user_id?: string } | null)?.user_id) ?? null;
                return uid ? [uid] : [];
              })()
            : [],
        source: 'ai_authored',
        ai_signals_used: {
          ac_targets: ctx.ac_targets.map((a) => `${a.unit_code}:${a.ac_code}`),
          weak_ac_hint: ctx.weak_ac_hint.map((a) => `${a.unit_code}:${a.ac_code}`),
          ksbs_in_progress: ctx.ksbs_in_progress.map((k) => k.ksb_code),
          partial_observation_topics: ctx.partial_observation_topics,
          weak_quiz_categories: ctx.weak_quiz_categories,
          recent_grade_band: ctx.recent_grade_band,
          inclusion: ctx.inclusion,
          portfolio_titles_seen: ctx.portfolio_titles.length,
          facets_pulled: facets.length,
          topic_label: ctx.topic_label,
          requested_count: body.count ?? 5,
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
      question_text: q.question_text,
      options: q.options,
      correct_answer_index: q.correct_answer_index,
      explanation: q.explanation,
      category: q.category ?? null,
      difficulty: q.difficulty,
      ac_ref: q.ac_ref ?? null,
      points: q.points ?? 1,
      sort_order: i + 1,
      bs7671_citations: q.bs7671_citations ?? [],
    }));
    const { error: qErr } = await sb.from('tutor_quiz_questions').insert(questionRows);
    if (qErr) {
      // Roll back the quiz row to avoid an empty quiz
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

    // Push notification to every assigned learner (or every cohort member)
    // — fire-and-forget so quiz creation doesn't fail if notifications are flaky.
    if (isPublished) {
      try {
        // Resolve recipient user_ids
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

        const quizTitle = body.title?.trim() || parsed.title;
        const dueLabel = body.due_date ? ` · due ${body.due_date}` : '';
        const homeworkLabel = body.is_homework ? 'Homework' : 'Quiz';

        for (const uid of recipients) {
          // Don't notify the tutor themselves if they're also assigned (edge case)
          if (uid === auth.user.id) continue;
          // Use service-role to invoke send-push-notification with this user
          await fetch(`${SUPABASE_URL}/functions/v1/send-push-notification`, {
            method: 'POST',
            headers: {
              'content-type': 'application/json',
              authorization: `Bearer ${SERVICE_KEY}`,
            },
            body: JSON.stringify({
              userId: uid,
              title: `${homeworkLabel}: ${quizTitle}`,
              body: `${parsed.questions.length} questions${dueLabel}. Tap to start.`,
              type: 'college',
              data: {
                kind: 'tutor_quiz_assigned',
                quiz_id: quizId,
                deeplink: `/apprentice/college/quiz/${quizId}`,
              },
            }),
          }).catch(() => {
            /* swallow — notification failures shouldn't break quiz creation */
          });
        }
      } catch {
        /* notifications are best-effort */
      }
    }

    return new Response(
      JSON.stringify({
        quiz_id: quizId,
        questions_count: parsed.questions.length,
        citations_count: totalCitations,
        quiz: {
          id: quizId,
          title: body.title?.trim() || parsed.title,
          description: parsed.description,
          difficulty: body.difficulty ?? 'medium',
          time_limit_minutes: body.time_limit_minutes ?? 15,
          pass_mark: body.pass_mark ?? 60,
          is_published: isPublished,
        },
        questions: parsed.questions,
        meta: {
          facets_pulled: facets.length,
          ac_targets_count: ctx.ac_targets.length,
          weak_ac_hint_count: ctx.weak_ac_hint.length,
        },
      }),
      { headers: { ...corsHeaders, 'content-type': 'application/json' } }
    );
  } catch (e) {
    await captureException(e, { functionName: 'ai-author-quiz', requestUrl: req.url, requestMethod: req.method });
    return new Response(
      JSON.stringify({ error: (e as Error).message ?? 'unknown' }),
      { status: 500, headers: { ...corsHeaders, 'content-type': 'application/json' } }
    );
  }
});
