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
 * Then N parallel calls to gpt-5.4-mini with the shared context.
 *
 * Wire format (SSE):
 *   event: meta\n data: {"total":5,"contextSnippets":3}\n\n
 *   event: question\n data: {"index":0,"question":{...}}\n\n
 *   event: error\n data: {"index":2,"error":"..."}\n\n
 *   event: done\n data: {"completed":5}\n\n
 */

import { serve, createClient, corsHeaders } from '../_shared/deps.ts';
import { searchFacets, type BS7671Facet } from '../_shared/bs7671-facets-rag.ts';

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
          description: 'Exactly 4 plausible options. Never include "All of the above" or "None of the above".',
          minItems: 4,
          maxItems: 4,
        },
        correctAnswer: { type: 'number', description: '0-based index of the correct option' },
        explanation: {
          type: 'string',
          description: 'Concise explanation citing the regulation, table, or clause where applicable',
        },
        category: { type: 'string', description: 'Topic category, ideally matching a unit/AC area' },
        difficulty: { type: 'string', enum: ['easy', 'medium', 'hard'] },
        acRef: { type: 'string', description: 'AC reference this question maps to' },
        regulationRef: {
          type: 'string',
          description: 'BS 7671 regulation number cited (e.g. "411.4.5") if applicable, otherwise empty',
        },
      },
      required: [
        'question',
        'options',
        'correctAnswer',
        'explanation',
        'category',
        'difficulty',
      ],
    },
  },
};

function buildAcContext(acData: Array<Record<string, unknown>>): string {
  if (!acData?.length) return '';
  const lines: string[] = [];
  for (const row of acData) {
    const unitCode = (row.unit_code as string) || '';
    const unitTitle = (row.unit_title as string) || '';
    const loNumber = (row.lo_number as string) || '';
    const loText = (row.lo_text as string) || '';
    const acCode = (row.ac_code as string) || '';
    const acText = (row.ac_text as string) || '';
    lines.push(
      `Unit ${unitCode} (${unitTitle}) · LO${loNumber}: ${loText} · AC ${acCode}: ${acText}`
    );
  }
  return lines.slice(0, 30).join('\n');
}

function buildRagContext(facets: BS7671Facet[]): string {
  if (!facets?.length) return '';
  return facets
    .slice(0, 4)
    .map((f, i) => {
      const ref = f.regNumber ? `Reg ${f.regNumber}` : `Source ${i + 1}`;
      const topic = f.primaryTopic ? ` — ${f.primaryTopic}` : '';
      const page = f.pageNumber ? ` · p.${f.pageNumber}` : '';
      const body = (f.content || '').replace(/\s+/g, ' ').slice(0, 360);
      return `[${ref}${topic}${page}] ${body}`;
    })
    .join('\n\n');
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
    acContext: string;
    ragContext: string;
    targetAcRef?: string;
    targetAcText?: string;
    difficulty: string;
  },
  signal: AbortSignal
): Promise<Record<string, unknown> | { error: string }> {
  const qDifficulty = pickDifficulty(args.difficulty, index);

  const targetBlock = args.targetAcRef
    ? `## Target this question at this assessment criterion\nAC ${args.targetAcRef}: ${args.targetAcText || '(see qualification structure)'}\n\nFocus the question tightly on what an apprentice must demonstrate to meet this AC. Do not drift into other ACs.`
    : '';

  const ragBlock = args.ragContext
    ? `## BS 7671 regulation context (use this to ground the question and explanation; cite reg numbers verbatim)\n${args.ragContext}`
    : '';

  const systemPrompt = `You are writing ONE EPA-style multiple-choice knowledge test question for a UK electrical apprentice on qualification ${args.qualificationCode}.

## Qualification structure (Units · LOs · ACs)
${args.acContext || 'General electrical knowledge — UK BS 7671:2018+A4:2026 standard.'}

${targetBlock}

${ragBlock}

## Rules
1. Exactly 4 plausible options. Never use "All of the above" or "None of the above".
2. Distractors must be plausible — real values, real regulations, real methods that are close but wrong.
3. Difficulty for this question: ${qDifficulty} (easy = recall · medium = application · hard = analysis/scenario).
4. Explanation MUST cite the specific BS 7671 regulation number, table, or clause where applicable.
5. Set acRef to the AC this question maps to.
6. Set regulationRef to the BS 7671 reg number you cite (e.g. "411.4.5"), empty string if none.
7. UK English, UK electrical standards (BS 7671:2018+A4:2026).
8. For calculations, use realistic standard table values.

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
          content: args.targetAcRef
            ? `Generate question ${index + 1} drilling AC ${args.targetAcRef}.`
            : `Generate question ${index + 1} for qualification ${args.qualificationCode}.`,
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
    const parsed = JSON.parse(toolCall.function.arguments);
    return parsed;
  } catch (err) {
    return { error: `Failed to parse AI response: ${(err as Error).message}` };
  }
}

function sseEvent(event: string, data: unknown): Uint8Array {
  return new TextEncoder().encode(
    `event: ${event}\ndata: ${JSON.stringify(data)}\n\n`
  );
}

serve(async (req: Request) => {
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
    } = body as {
      qualification_code?: string;
      target_unit_codes?: string[];
      target_ac_ref?: string;
      target_ac_text?: string;
      difficulty?: string;
      question_count?: number;
    };

    if (!qualification_code) {
      return new Response(
        JSON.stringify({ success: false, error: 'qualification_code required' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const total = Math.max(1, Math.min(20, question_count));

    // ── Pre-flight (parallel): AC structure + BS 7671 RAG context ────
    // BM25-only retrieval (skipEmbedding) keeps the pre-flight under
    // ~100ms — vector retrieval would add another ~400ms for the embedding
    // call. BM25 is good enough when the query is the AC text itself,
    // since AC text usually contains regulation keywords directly.
    const ragQuery =
      target_ac_text || target_ac_ref || `${qualification_code} BS 7671 inspection testing`;

    const [acResult, facets] = await Promise.all([
      supabase.rpc('get_qualification_acs', { p_qualification_code: qualification_code }),
      searchFacets(supabase, {
        query: ragQuery,
        matchCount: 5,
        skipEmbedding: true,
        documentTypes: ['bs7671'],
      }).catch(() => [] as BS7671Facet[]),
    ]);

    let acData = (acResult.data || []) as Array<Record<string, unknown>>;
    if (target_ac_ref) {
      acData = acData.filter((row) => {
        const refs = [row.ac_ref, row.ac_code, row.criterion_ref].filter(Boolean);
        return refs.some((r) => String(r) === target_ac_ref);
      });
    } else if (target_unit_codes?.length) {
      acData = acData.filter((row) => target_unit_codes.includes(row.unit_code as string));
    }
    const acContext = buildAcContext(acData);
    const ragContext = buildRagContext(facets);

    // ── SSE stream of N parallel question generations ─────────────────
    const abortController = new AbortController();
    req.signal.addEventListener('abort', () => abortController.abort());

    const stream = new ReadableStream({
      async start(controller) {
        try {
          controller.enqueue(
            sseEvent('meta', {
              total,
              ragSnippets: facets.length,
              regNumbers: facets.map((f) => f.regNumber).filter(Boolean),
              targeted: !!target_ac_ref,
            })
          );

          // Fire all N in parallel; emit each as it resolves
          const tasks = Array.from({ length: total }).map((_, index) =>
            generateOneQuestion(
              index,
              {
                openAiKey,
                qualificationCode: qualification_code,
                acContext,
                ragContext,
                targetAcRef: target_ac_ref,
                targetAcText: target_ac_text,
                difficulty,
              },
              abortController.signal
            )
              .then((q) => ({ index, q }))
              .catch((err) => ({
                index,
                q: { error: err instanceof Error ? err.message : String(err) },
              }))
          );

          let completed = 0;
          // Use Promise.allSettled-style streaming: emit as each resolves
          await Promise.all(
            tasks.map((p) =>
              p.then(({ index, q }) => {
                if ('error' in q) {
                  controller.enqueue(sseEvent('error', { index, error: q.error }));
                } else {
                  controller.enqueue(sseEvent('question', { index, question: q }));
                }
                completed++;
              })
            )
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
});
