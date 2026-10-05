/**
 * epa-knowledge-quiz-stream — Streaming variant of epa-knowledge-quiz.
 *
 * Generates questions in PARALLEL (one OpenAI call per question), streams
 * each completed question back over Server-Sent Events. First question
 * lands in ~1-2 s instead of 10 s+ for the whole batch. Apprentice can
 * start answering before all questions are ready.
 *
 * Pre-flight (in parallel):
 *   • get_qualification_acs — LO/AC structure for the qualification (or just the targeted AC)
 *   • bs7671_facets RAG — regulation context for the AC topic
 *
 * Then N parallel calls to gpt-5.4-mini. Each call gets its OWN slot — a
 * different assessment criterion (spread round-robin across units, shuffled
 * every quiz), a different question angle, and RAG context retrieved for that
 * AC — plus the learner's recent question stems to avoid.
 *
 * Why (ELE-1803, 4 Oct 2026): every call used to get the same prompt, the same
 * first 30 ACs and one fixed RAG query ("<qual> BS 7671 inspection testing").
 * Real sessions showed the same question a dozen times — "Safety Signs
 * Regulations: employer's responsibility" ×12 in four learners' quizzes.
 * Answers are also re-shuffled server-side (the model favours early slots),
 * and a near-duplicate of anything already emitted or recently seen is
 * regenerated once, then dropped.
 *
 * Wire format (SSE):
 *   event: meta\n data: {"total":5,"contextSnippets":3}\n\n
 *   event: question\n data: {"index":0,"question":{...}}\n\n
 *   event: error\n data: {"index":2,"error":"..."}\n\n
 *   event: done\n data: {"completed":5}\n\n
 */

import { serve, createClient, corsHeaders } from '../_shared/deps.ts';
import { searchFacets, type BS7671Facet } from '../_shared/bs7671-facets-rag.ts';
import { searchSafetyFacets, type SafetyFacet } from '../_shared/safety-facets-rag.ts';
import { citableReg, relevantTo } from '../_shared/rag-quality.ts';

import { withSentry } from '../_shared/sentry.ts';
const MODEL = 'gpt-5.4-mini-2026-03-17';

const singleQuestionTool = {
  type: 'function' as const,
  function: {
    name: 'epa_knowledge_question',
    description: 'Generate one EPA-style multiple-choice knowledge question',
    parameters: {
      type: 'object',
      properties: {
        question: { type: 'string' },
        options: {
          type: 'array',
          items: { type: 'string' },
          description:
            'Exactly 4 plausible options. Never include "All of the above" or "None of the above".',
          minItems: 4,
          maxItems: 4,
        },
        correctAnswer: { type: 'number', description: '0-based index of the correct option' },
        explanation: {
          type: 'string',
          description:
            'Concise explanation citing the regulation, table, or clause where applicable',
        },
        category: {
          type: 'string',
          description: 'Topic category, ideally matching a unit/AC area',
        },
        difficulty: { type: 'string', enum: ['easy', 'medium', 'hard'] },
        acRef: { type: 'string', description: 'AC reference this question maps to' },
        regulationRef: {
          type: 'string',
          description:
            'BS 7671 regulation number cited (e.g. "411.4.5") if applicable, otherwise empty',
        },
      },
      required: ['question', 'options', 'correctAnswer', 'explanation', 'category', 'difficulty'],
    },
  },
};

type AcRow = Record<string, unknown>;

function acLine(row: AcRow): string {
  const unitCode = (row.unit_code as string) || '';
  const unitTitle = (row.unit_title as string) || '';
  const loNumber = (row.lo_number as string) || '';
  const loText = (row.lo_text as string) || '';
  const acCode = (row.ac_code as string) || '';
  const acText = (row.ac_text as string) || '';
  return `Unit ${unitCode} (${unitTitle}) · LO${loNumber}: ${loText} · AC ${acCode}: ${acText}`;
}

function shuffle<T>(arr: T[]): T[] {
  const a = arr.slice();
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

/**
 * One AC per question, spread across units: units are shuffled, ACs within
 * each unit are shuffled, then dealt round-robin so a 20-question quiz on a
 * 7-unit qualification touches every unit before any unit gets a second go.
 */
function planSlots(acData: AcRow[], total: number): AcRow[] {
  if (!acData.length) return [];
  const byUnit = new Map<string, AcRow[]>();
  for (const row of acData) {
    const k = String(row.unit_code ?? '');
    if (!byUnit.has(k)) byUnit.set(k, []);
    byUnit.get(k)!.push(row);
  }
  const queues = shuffle([...byUnit.values()]).map((q) => shuffle(q));
  const out: AcRow[] = [];
  let guard = 0;
  while (out.length < total && guard < 10_000) {
    for (const q of queues) {
      if (out.length >= total) break;
      if (q.length) out.push(q.shift()!);
    }
    guard++;
    if (queues.every((q) => q.length === 0)) {
      // Fewer ACs than questions — start again with a fresh shuffle.
      queues.splice(0, queues.length, ...shuffle([...byUnit.values()]).map((q) => shuffle(q)));
    }
  }
  return out;
}

/** Ways of asking — rotated so a quiz isn't twenty "which of these is…" stems. */
const ANGLES = [
  'a short, realistic site scenario the apprentice has to make a decision in',
  'recall of one specific fact, value, definition or duty',
  'spotting the mistake or non-compliance in a described situation',
  'choosing the correct order, method or next step',
  'interpreting a reading, value or simple calculation',
  'identifying the right document, regulation or person responsible',
];

/** Drop duplicate rows and column-layout fragments (NEBOSH tables come
 *  through as runs of spaces) — they ground nothing. */
function usableSafety(rows: SafetyFacet[]): SafetyFacet[] {
  const seen = new Set<string>();
  return rows.filter((f) => {
    const c = f.content || '';
    if (c.length < 120 || /\s{6,}/.test(c)) return false;
    const key = c.slice(0, 80);
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });
}

const SOURCE_NAMES: Record<string, string> = {
  bs7671: 'BS 7671',
  bs5839: 'BS 5839-1',
  gn3: 'GN3',
  osg: 'On-Site Guide',
};

/** BS 7671 / BS 5839 / GN3 / OSG rows plus HSE guidance (safety_facets),
 *  each labelled with where it came from so the model can cite it. Units
 *  like environmental legislation or H&S have little or nothing in BS 7671;
 *  without the HSE rows the model had no source and invented figures. */
function buildRagContext(facets: BS7671Facet[], safety: SafetyFacet[]): string {
  const clip = (t: string) => (t || '').replace(/\s+/g, ' ').slice(0, 360);
  const lines: string[] = [];
  for (const f of facets.slice(0, 4)) {
    const doc = SOURCE_NAMES[f.documentType] ?? f.documentType;
    const ref =
      f.regNumber && (f.documentType !== 'bs7671' || citableReg(f.regNumber))
        ? `${doc} ${f.regNumber}`
        : doc;
    const topic = f.primaryTopic ? ` — ${f.primaryTopic}` : '';
    lines.push(`[${ref}${topic}] ${clip(f.content)}`);
  }
  for (const f of safety.slice(0, 3)) {
    const doc = f.documentCode || f.documentType.toUpperCase();
    const where = f.regNumber ? ` reg ${f.regNumber}` : f.paragraph ? ` para ${f.paragraph}` : '';
    const topic = f.primaryTopic ? ` — ${f.primaryTopic}` : '';
    lines.push(`[HSE ${doc}${where}${topic}] ${clip(f.content)}`);
  }
  return lines.join('\n\n');
}

const STOP = new Set(
  'the a an of to in on for and or is are be it its this that with by as at from what which why how when who does do should must can you your under according following best most'.split(
    ' '
  )
);
function stemWords(s: string): Set<string> {
  return new Set(
    s
      .toLowerCase()
      .replace(/[^a-z0-9 ]+/g, ' ')
      .split(/\s+/)
      .filter((w) => w.length > 2 && !STOP.has(w))
  );
}

/** Jaccard overlap of content words — ≥ 0.55 reads as "the same question reworded". */
function isNearDuplicate(stem: string, others: string[]): boolean {
  const a = stemWords(stem);
  if (a.size === 0) return false;
  for (const o of others) {
    const b = stemWords(o);
    if (!b.size) continue;
    let inter = 0;
    for (const w of a) if (b.has(w)) inter++;
    if (inter / (a.size + b.size - inter) >= 0.55) return true;
  }
  return false;
}

/** Four distinct options, a valid key, then a fresh option order. */
function normaliseQuestion(
  q: Record<string, unknown>
): Record<string, unknown> | { error: string } {
  const options = Array.isArray(q.options)
    ? (q.options as unknown[]).map((o) => String(o).trim())
    : [];
  const key = Number(q.correctAnswer);
  if (typeof q.question !== 'string' || !q.question.trim()) return { error: 'Empty question' };
  if (options.length !== 4 || options.some((o) => !o)) return { error: 'Needs exactly 4 options' };
  if (new Set(options.map((o) => o.toLowerCase())).size !== 4)
    return { error: 'Duplicate options' };
  if (!Number.isInteger(key) || key < 0 || key > 3) return { error: 'Invalid answer index' };
  const text = [q.question, ...options, q.explanation].map((x) => String(x ?? '')).join(' ');
  const cited = [...text.matchAll(/\bReg(?:ulation)?s?\.?\s+([1-8]\d{2}(?:\.\d+)+)/gi)].map(
    (m) => m[1]
  );
  const ref = String(q.regulationRef ?? '').trim();
  if (/^[1-8]\d{2}\./.test(ref)) cited.push(ref);
  if (cited.some((r) => r && !citableReg(r))) {
    return { error: 'Cited a regulation number that does not exist' };
  }
  // Length tell: models make the right answer the longest (13 of 20 in a
  // 5 Oct test, against ~5 by chance). Flag it so the caller can retry.
  const others = options.filter((_, i) => i !== key).map((o) => o.length);
  const lengthTell = options[key].length > 1.3 * (others.reduce((a, b) => a + b, 0) / 3);
  const order = shuffle([0, 1, 2, 3]);
  return {
    ...q,
    options: order.map((i) => options[i]),
    correctAnswer: order.indexOf(key),
    ...(lengthTell ? { _lengthTell: true } : {}),
  };
}

function pickDifficulty(difficulty: string, index: number): 'easy' | 'medium' | 'hard' {
  if (difficulty === 'easy' || difficulty === 'medium' || difficulty === 'hard') return difficulty;
  // mixed: 30% easy, 40% medium, 30% hard — distribute deterministically by index
  const cycle = index % 10;
  if (cycle < 3) return 'easy';
  if (cycle < 7) return 'medium';
  return 'hard';
}

async function generateOneQuestion(
  index: number,
  args: {
    openAiKey: string;
    qualificationCode: string;
    slotAc?: AcRow;
    angle: string;
    ragContext: string;
    targetAcRef?: string;
    targetAcText?: string;
    difficulty: string;
    avoidStems: string[];
  },
  signal: AbortSignal
): Promise<Record<string, unknown> | { error: string }> {
  const qDifficulty = pickDifficulty(args.difficulty, index);

  const focus = args.targetAcRef
    ? `AC ${args.targetAcRef}: ${args.targetAcText || '(see qualification structure)'}`
    : args.slotAc
      ? acLine(args.slotAc)
      : 'General electrical installation knowledge for this qualification.';

  const ragBlock = args.ragContext
    ? `## Reference material retrieved for this criterion (use it where it is relevant; cite reg, clause and paragraph numbers exactly as written; never invent one)\n${args.ragContext}`
    : '## Reference material\nNothing was retrieved for this criterion — so do not build the question on a specific figure, time limit or clause number.';

  const avoidBlock = args.avoidStems.length
    ? `## Do NOT repeat or reword any of these recent questions — pick a different fact or situation\n${args.avoidStems
        .slice(0, 40)
        .map((q) => `- ${q.slice(0, 140)}`)
        .join('\n')}`
    : '';

  const systemPrompt = `You are writing ONE EPA-style multiple-choice knowledge test question for a UK electrical apprentice on qualification ${args.qualificationCode}.

## Assessment criterion this question must test
${focus}

Stay inside that criterion. Do not drift to a different unit's topic.

## Style for this question
Ask it as ${args.angle}.

${ragBlock}

${avoidBlock}

## Rules
1. Exactly 4 options, all different. Never use "All of the above" or "None of the above".
2. Each wrong option must be a real misconception about THIS topic — close but wrong values, regulations, methods or duty-holders. No throwaway or off-topic options.
3. All four options similar in length and style. The correct option must NOT be the longest — make at least one wrong option a little longer than it, with the same level of detail, so the answer can't be spotted by its length.
4. Difficulty for this question: ${qDifficulty} (easy = recall · medium = application · hard = analysis/scenario).
5. Explanation says why the answer is right and why the most tempting wrong option is wrong, citing the regulation, table or clause where one applies.
6. Set acRef to the AC this question maps to.
7. Set regulationRef to the BS 7671 reg number you cite (e.g. "411.4.5"), empty string if none.
8. UK English, current UK standards (BS 7671:2018+A4:2026). For calculations, use realistic standard table values.
9. Use the reference material only where it is about this criterion. Ignore any of it that is about a different topic, and never build a wrong option from off-topic material — every option must be a plausible answer to THIS question.
10. Never invent a fact. Any specific figure — time limit, distance, size, value, percentage, frequency — and any named regulation, clause or paragraph in the question, the correct answer or the explanation must either appear in the reference material above or be a BS 7671 / On-Site Guide value you are certain of. If the material gives no figure for this topic, test understanding instead (who holds the duty, why it exists, what to do first, which document applies) — do not ask "what is the maximum/minimum…".
11. Do not state who holds a legal duty (client, employer, principal contractor, waste producer…) unless the reference material says so.
12. UK law only, and only as it actually applies in Great Britain. Never carry over rules from other countries (for example US storage limits or OSHA requirements).

Generate exactly ONE question via the tool call.`;

  const response = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    signal,
    headers: {
      Authorization: `Bearer ${args.openAiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      model: MODEL,
      max_completion_tokens: 1200,
      messages: [
        { role: 'system', content: systemPrompt },
        {
          role: 'user',
          content: `Write question ${index + 1} on the criterion above.`,
        },
      ],
      tools: [singleQuestionTool],
      tool_choice: { type: 'function', function: { name: 'epa_knowledge_question' } },
    }),
  });

  if (!response.ok) {
    const body = await response.text().catch(() => '');
    return { error: `OpenAI ${response.status}: ${body.slice(0, 200)}` };
  }

  const data = await response.json();
  const toolCall = data.choices?.[0]?.message?.tool_calls?.[0];
  if (!toolCall?.function?.arguments) return { error: 'No structured response from AI' };

  try {
    return normaliseQuestion(JSON.parse(toolCall.function.arguments));
  } catch (err) {
    return { error: `Failed to parse AI response: ${(err as Error).message}` };
  }
}

function sseEvent(event: string, data: unknown): Uint8Array {
  return new TextEncoder().encode(`event: ${event}\ndata: ${JSON.stringify(data)}\n\n`);
}

serve(
  withSentry('epa-knowledge-quiz-stream', async (req: Request) => {
    if (req.method === 'OPTIONS') {
      return new Response(null, { headers: corsHeaders });
    }

    try {
      const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
      const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
      const openAiKey = Deno.env.get('OPENAI_API_KEY');

      if (!openAiKey) {
        return new Response(
          JSON.stringify({ success: false, error: 'OpenAI API key not configured' }),
          { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 500 }
        );
      }

      const authHeader = req.headers.get('Authorization');
      if (!authHeader) {
        return new Response(JSON.stringify({ error: 'Missing auth header' }), {
          status: 401,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        });
      }

      const supabase = createClient(supabaseUrl, supabaseKey, {
        global: { headers: { Authorization: authHeader } },
      });

      const {
        data: { user },
        error: authError,
      } = await supabase.auth.getUser();
      if (authError || !user) {
        return new Response(JSON.stringify({ error: 'Unauthorised' }), {
          status: 401,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        });
      }

      const body = await req.json();
      const {
        qualification_code,
        target_unit_codes,
        target_ac_ref,
        target_ac_text,
        difficulty = 'mixed',
        question_count = 5,
        avoid_stems = [],
      } = body as {
        qualification_code?: string;
        target_unit_codes?: string[];
        target_ac_ref?: string;
        target_ac_text?: string;
        difficulty?: string;
        question_count?: number;
        avoid_stems?: string[];
      };

      if (!qualification_code) {
        return new Response(
          JSON.stringify({ success: false, error: 'qualification_code required' }),
          { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }

      const total = Math.max(1, Math.min(20, question_count));

      // ── Pre-flight (parallel): AC structure + this learner's recent stems ──
      const [acResult, recentResult] = await Promise.all([
        supabase.rpc('get_qualification_acs', { p_qualification_code: qualification_code }),
        supabase
          .from('epa_mock_sessions')
          .select('quiz_questions')
          .eq('user_id', user.id)
          .eq('qualification_code', qualification_code)
          .eq('session_type', 'knowledge_test')
          .order('created_at', { ascending: false })
          .limit(6),
      ]);

      let acData = (acResult.data || []) as AcRow[];
      if (target_ac_ref) {
        acData = acData.filter((row) => {
          const refs = [row.ac_ref, row.ac_code, row.criterion_ref].filter(Boolean);
          return refs.some((r) => String(r) === target_ac_ref);
        });
      } else if (target_unit_codes?.length) {
        const filtered = acData.filter((row) =>
          target_unit_codes.includes(row.unit_code as string)
        );
        if (filtered.length) acData = filtered;
      }

      // Recent stems: completed sessions on the server + anything the browser
      // sends (covers quizzes the learner generated but never finished).
      const recentStems: string[] = [];
      for (const row of (recentResult.data || []) as Array<{ quiz_questions: unknown }>) {
        if (Array.isArray(row.quiz_questions)) {
          for (const q of row.quiz_questions as Array<{ question?: string }>) {
            if (q?.question) recentStems.push(String(q.question));
          }
        }
      }
      for (const q of Array.isArray(avoid_stems) ? avoid_stems : []) {
        if (typeof q === 'string' && q.trim()) recentStems.push(q.trim());
      }
      const avoidStems = [...new Set(recentStems)].slice(0, 60);

      // One slot per question. Targeted drills keep the one AC and vary the angle.
      const slots: Array<AcRow | undefined> = target_ac_ref
        ? Array.from({ length: total }, () => acData[0])
        : planSlots(acData, total);
      const angleOffset = Math.floor(Math.random() * ANGLES.length);

      // RAG per distinct AC, BM25-only (skipEmbedding keeps each lookup ~100 ms;
      // AC text usually carries the regulation keywords BM25 needs).
      const ragQueryFor = (slot: AcRow | undefined): string =>
        target_ac_text ||
        (slot ? `${slot.ac_text ?? ''} ${slot.lo_text ?? ''}`.trim() : '') ||
        `${qualification_code} electrical installation`;
      const distinctQueries = [...new Set(slots.map(ragQueryFor))];
      const facetsByQuery = new Map<string, BS7671Facet[]>();
      const safetyByQuery = new Map<string, SafetyFacet[]>();
      await Promise.all(
        distinctQueries.flatMap((query) => [
          searchFacets(supabase, {
            query,
            matchCount: 4,
            skipEmbedding: true,
            // Not 'legislation' — in this table that is the Building Regulations 2010.
            documentTypes: ['bs7671', 'bs5839', 'gn3', 'osg'],
          })
            .catch(() => [] as BS7671Facet[])
            .then((f) =>
              facetsByQuery.set(
                query,
                f.filter((x) => relevantTo(query, x.content))
              )
            ),
          // Embedding on: safety search's keyword half ANDs every word, so
          // AC-length text matches nothing on keywords alone.
          searchSafetyFacets(supabase, { query, matchCount: 6 })
            .catch(() => [] as SafetyFacet[])
            .then((f) =>
              safetyByQuery.set(
                query,
                usableSafety(f).filter((x) => relevantTo(query, x.content))
              )
            ),
        ])
      );
      const allRegNumbers = [
        ...new Set(
          [...facetsByQuery.values()]
            .flat()
            .map((f) => f.regNumber)
            .filter(Boolean)
        ),
      ];

      // ── SSE stream of N parallel question generations ─────────────────
      const abortController = new AbortController();
      req.signal.addEventListener('abort', () => abortController.abort());

      const stream = new ReadableStream({
        async start(controller) {
          try {
            controller.enqueue(
              sseEvent('meta', {
                total,
                ragSnippets:
                  [...facetsByQuery.values()].reduce((n, f) => n + f.length, 0) +
                  [...safetyByQuery.values()].reduce((n, f) => n + f.length, 0),
                regNumbers: allRegNumbers.slice(0, 12),
                targeted: !!target_ac_ref,
              })
            );

            const emitted: string[] = [];
            const generate = (index: number, extraAvoid: string[]) =>
              generateOneQuestion(
                index,
                {
                  openAiKey,
                  qualificationCode: qualification_code,
                  slotAc: slots[index],
                  angle: ANGLES[(index + angleOffset) % ANGLES.length],
                  ragContext: buildRagContext(
                    facetsByQuery.get(ragQueryFor(slots[index])) ?? [],
                    safetyByQuery.get(ragQueryFor(slots[index])) ?? []
                  ),
                  targetAcRef: target_ac_ref,
                  targetAcText: target_ac_text,
                  difficulty,
                  avoidStems: [...extraAvoid, ...avoidStems],
                },
                abortController.signal
              );

            // Fire all N in parallel; a near-duplicate of anything already
            // emitted (or recently seen) gets up to two regenerations.
            let completed = 0;
            await Promise.all(
              Array.from({ length: total }).map(async (_, index) => {
                let q: Record<string, unknown> | { error: string } = { error: 'Not generated' };
                let fallback: Record<string, unknown> | null = null;
                for (let attempt = 0; attempt < 3; attempt++) {
                  q = await generate(index, attempt ? emitted.slice(-20) : []).catch((err) => ({
                    error: err instanceof Error ? err.message : String(err),
                  }));
                  if ('error' in q) continue;
                  const stem = String(q.question);
                  if (isNearDuplicate(stem, [...emitted, ...avoidStems])) {
                    q = { error: 'Skipped a repeated question' };
                    continue;
                  }
                  // A length giveaway is worth one or two retries, but never
                  // worth losing the question — the last attempt stands.
                  if (q._lengthTell && attempt < 2) {
                    fallback = q;
                    continue;
                  }
                  break;
                }
                if ('error' in q && fallback) q = fallback;
                if (!('error' in q)) delete q._lengthTell;
                if ('error' in q) {
                  controller.enqueue(sseEvent('error', { index, error: q.error }));
                } else {
                  emitted.push(String(q.question));
                  controller.enqueue(sseEvent('question', { index, question: q }));
                }
                completed++;
              })
            );

            controller.enqueue(sseEvent('done', { completed }));
            controller.close();
          } catch (err) {
            controller.enqueue(
              sseEvent('error', { error: err instanceof Error ? err.message : String(err) })
            );
            controller.close();
          }
        },
        cancel() {
          abortController.abort();
        },
      });

      return new Response(stream, {
        headers: {
          ...corsHeaders,
          'Content-Type': 'text/event-stream',
          'Cache-Control': 'no-cache, no-transform',
          Connection: 'keep-alive',
          'X-Accel-Buffering': 'no',
        },
      });
    } catch (err) {
      console.error('[epa-knowledge-quiz-stream] Error:', err);
      return new Response(
        JSON.stringify({
          success: false,
          error: err instanceof Error ? err.message : 'Internal error',
        }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }
  })
);
