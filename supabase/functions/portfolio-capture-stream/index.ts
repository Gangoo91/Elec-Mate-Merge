/**
 * portfolio-capture-stream — Streaming evidence analysis at capture time.
 *
 * Apprentice on a job site fires this with: photo URLs (or document URLs),
 * a voice transcript ("just rewired the kitchen consumer unit, fitted a
 * new RCBO board, did the dead tests…"), and the qualification code.
 *
 * The edge function:
 *   1. Pre-flights in parallel:
 *        • get_qualification_acs   — full LO/AC structure
 *        • bs7671_facets RAG       — top 5 reg facets keyed off transcript
 *   2. Fires N parallel calls to gpt-5.4-mini:
 *        • One per file       — vision + AC matching + quality grade
 *        • One on the transcript — STAR-method reflection draft
 *   3. Streams each result back via Server-Sent Events the moment it lands.
 *
 * First match arrives in ~1.5 s; the apprentice can confirm/edit while the
 * remaining files are still being analysed.
 *
 * Response stream format:
 *   event: meta
 *   data: {"totalFiles":3,"hasTranscript":true,"ragSnippets":4,"regNumbers":["411.4.5",…]}
 *
 *   event: file-result
 *   data: {"fileId":"abc","analysis":{evidenceStrength,matchedCriteria,…}}
 *
 *   event: reflection-result
 *   data: {"reflection":{situation,task,action,result,learning}}
 *
 *   event: error
 *   data: {"fileId":"abc","error":"…"}
 *
 *   event: done
 *   data: {"completed":4}
 */

import { serve, createClient, corsHeaders } from '../_shared/deps.ts';
import { searchFacets, type BS7671Facet } from '../_shared/bs7671-facets-rag.ts';

const MODEL = 'gpt-5.4-mini-2026-03-17';

interface CaptureFile {
  id: string;
  url: string;
  type?: string;
}

interface CaptureRequest {
  qualification_code?: string;
  files?: CaptureFile[];
  transcript?: string;
  context?: string;
}

const fileAnalysisTool = {
  type: 'function' as const,
  function: {
    name: 'analyse_capture',
    description: 'Per-file portfolio evidence analysis with AC matching and quality grade',
    parameters: {
      type: 'object',
      properties: {
        evidenceStrength: { type: 'string', enum: ['strong', 'moderate', 'weak'] },
        whyGoodEvidence: {
          type: 'string',
          description:
            '2-3 sentences explaining why this evidence is good (or could be stronger) for the portfolio.',
        },
        matchedCriteria: {
          type: 'array',
          items: {
            type: 'object',
            properties: {
              unitCode: { type: 'string' },
              acCode: { type: 'string' },
              acText: { type: 'string' },
              confidence: { type: 'number', description: '0-100' },
              reason: { type: 'string' },
            },
            required: ['unitCode', 'acCode', 'acText', 'confidence', 'reason'],
          },
        },
        qualityGrade: {
          type: 'string',
          enum: ['A', 'B', 'C', 'D'],
          description:
            'A = ready · B = minor gaps · C = significant gaps · D = insufficient',
        },
        qualityScore: {
          type: 'number',
          description: 'Quality score 0-100, calibrated to A=85+, B=70-84, C=55-69, D<55',
        },
        qualityTips: {
          type: 'array',
          items: { type: 'string' },
          description: 'Up to 3 specific tips to strengthen this evidence.',
        },
        suggestedTitle: { type: 'string' },
        regulationRefs: {
          type: 'array',
          items: { type: 'string' },
          description:
            'BS 7671 regulation numbers cited from the RAG context (e.g. "411.4.5"). Empty if none directly applicable.',
        },
        detectedContent: {
          type: 'object',
          properties: {
            description: { type: 'string' },
            electricalElements: { type: 'array', items: { type: 'string' } },
            workType: { type: 'string' },
          },
          required: ['description', 'electricalElements', 'workType'],
        },
      },
      required: [
        'evidenceStrength',
        'whyGoodEvidence',
        'matchedCriteria',
        'qualityGrade',
        'qualityScore',
        'qualityTips',
        'suggestedTitle',
        'detectedContent',
      ],
    },
  },
};

const reflectionTool = {
  type: 'function' as const,
  function: {
    name: 'draft_reflection',
    description: 'Draft a STAR-method reflection from an apprentice voice transcript',
    parameters: {
      type: 'object',
      properties: {
        situation: { type: 'string', description: 'What was the job and where' },
        task: { type: 'string', description: 'What were you specifically asked to do' },
        action: {
          type: 'string',
          description:
            'Step-by-step what you did — include test instruments, regulation references, safety steps',
        },
        result: { type: 'string', description: 'Outcome — measurements, sign-offs, hand-overs' },
        learning: {
          type: 'string',
          description:
            'What you learnt or would do differently. Distinction-grade reflection — be honest and specific.',
        },
        suggestedTitle: { type: 'string' },
        suggestedACs: {
          type: 'array',
          items: { type: 'string' },
          description: 'AC refs the reflection demonstrates (e.g. "311 1.4")',
        },
      },
      required: ['situation', 'task', 'action', 'result', 'learning', 'suggestedTitle'],
    },
  },
};

function buildAcContext(acData: Array<Record<string, unknown>>): string {
  if (!acData?.length) return '';
  return acData
    .slice(0, 80)
    .map((row) => {
      const u = row.unit_code || '';
      const ut = row.unit_title || '';
      const lo = row.lo_number || '';
      const ac = row.ac_code || '';
      const acText = row.ac_text || '';
      return `[Unit ${u}: ${ut} · LO${lo} · AC ${ac}] ${acText}`;
    })
    .join('\n');
}

function buildRagContext(facets: BS7671Facet[]): string {
  if (!facets?.length) return '';
  return facets
    .slice(0, 4)
    .map((f, i) => {
      const ref = f.regNumber ? `Reg ${f.regNumber}` : `Source ${i + 1}`;
      const topic = f.primaryTopic ? ` — ${f.primaryTopic}` : '';
      const page = f.pageNumber ? ` · p.${f.pageNumber}` : '';
      const body = (f.content || '').replace(/\s+/g, ' ').slice(0, 320);
      return `[${ref}${topic}${page}] ${body}`;
    })
    .join('\n\n');
}

async function analyseFile(
  file: CaptureFile,
  ctx: {
    openAiKey: string;
    qualificationCode: string;
    acContext: string;
    ragContext: string;
    transcript?: string;
    extraContext?: string;
  },
  signal: AbortSignal
): Promise<Record<string, unknown> | { error: string }> {
  const isImage = (file.type && file.type.startsWith('image/')) ||
    /\.(jpg|jpeg|png|webp|gif|heic)$/i.test(file.url);

  const systemPrompt = `You are an experienced UK NVQ assessor analysing a single piece of apprentice portfolio evidence for qualification ${ctx.qualificationCode}.

## Qualification structure (Units · LOs · ACs)
${ctx.acContext || 'General electrical knowledge — UK BS 7671:2018+A4:2026.'}

${ctx.ragContext ? `## BS 7671 regulation context (cite reg numbers verbatim where relevant)\n${ctx.ragContext}\n` : ''}

${ctx.transcript ? `## Apprentice voice description of the job\n"${ctx.transcript}"\n` : ''}

${ctx.extraContext ? `## Extra context the apprentice typed\n${ctx.extraContext}\n` : ''}

## Your job
1. Identify which ACs this evidence credibly demonstrates. Be honest about confidence — overclaiming hurts the apprentice at gateway.
2. Grade the evidence quality A-D (A = ready, B = minor gaps, C = significant gaps, D = insufficient).
3. Give 2-3 specific, actionable tips to strengthen it (not vague advice — concrete things to add, e.g. "include the Zs reading you measured" not "add more detail").
4. Cite the BS 7671 regulation numbers from the context above where they directly apply.
5. Suggest a concise portfolio title.

Be sharp and honest — this is for a real EPA gateway portfolio.`;

  const userContent: Array<Record<string, unknown>> = [];
  if (isImage) {
    userContent.push({ type: 'text', text: `Analyse this evidence image (file ${file.id}).` });
    userContent.push({ type: 'image_url', image_url: { url: file.url } });
  } else {
    userContent.push({
      type: 'text',
      text: `Analyse this evidence file (${file.type || 'document'}, file ${file.id}, URL: ${file.url}).`,
    });
  }

  const response = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    signal,
    headers: {
      Authorization: `Bearer ${ctx.openAiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      model: MODEL,
      max_completion_tokens: 1500,
      messages: [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: userContent },
      ],
      tools: [fileAnalysisTool],
      tool_choice: { type: 'function', function: { name: 'analyse_capture' } },
    }),
  });

  if (!response.ok) {
    const body = await response.text().catch(() => '');
    return { error: `OpenAI ${response.status}: ${body.slice(0, 200)}` };
  }

  const data = await response.json();
  const toolCall = data.choices?.[0]?.message?.tool_calls?.[0];
  if (!toolCall?.function?.arguments) return { error: 'No structured analysis from AI' };
  try {
    return JSON.parse(toolCall.function.arguments);
  } catch (err) {
    return { error: `Parse failed: ${(err as Error).message}` };
  }
}

async function draftReflection(
  ctx: {
    openAiKey: string;
    qualificationCode: string;
    acContext: string;
    ragContext: string;
    transcript: string;
  },
  signal: AbortSignal
): Promise<Record<string, unknown> | { error: string }> {
  const systemPrompt = `You are a UK NVQ tutor helping an apprentice turn a voice description of a job into a STAR-method portfolio reflection that meets distinction-grade descriptors for qualification ${ctx.qualificationCode}.

## Qualification structure
${ctx.acContext || 'UK BS 7671:2018+A4:2026 standard.'}

${ctx.ragContext ? `## BS 7671 regulation context\n${ctx.ragContext}\n` : ''}

## STAR rules
- Situation: where, what type of installation, who else was on site
- Task: what specifically the apprentice was asked to do
- Action: step-by-step — include test instruments, readings, regulation references, safe-isolation steps
- Result: measurements taken, sign-offs, what the customer/supervisor said
- Learning: honest reflection — what they'd do differently, what they understand better

Use first person ("I"). UK English. Specific, not generic. Cite BS 7671 reg numbers verbatim where the context above applies. Keep each section to 2-4 sentences.`;

  const response = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    signal,
    headers: {
      Authorization: `Bearer ${ctx.openAiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      model: MODEL,
      max_completion_tokens: 1200,
      messages: [
        { role: 'system', content: systemPrompt },
        {
          role: 'user',
          content: `Apprentice voice transcript:\n\n"${ctx.transcript}"\n\nDraft the STAR reflection.`,
        },
      ],
      tools: [reflectionTool],
      tool_choice: { type: 'function', function: { name: 'draft_reflection' } },
    }),
  });

  if (!response.ok) {
    const body = await response.text().catch(() => '');
    return { error: `OpenAI ${response.status}: ${body.slice(0, 200)}` };
  }

  const data = await response.json();
  const toolCall = data.choices?.[0]?.message?.tool_calls?.[0];
  if (!toolCall?.function?.arguments) return { error: 'No reflection from AI' };
  try {
    return JSON.parse(toolCall.function.arguments);
  } catch (err) {
    return { error: `Parse failed: ${(err as Error).message}` };
  }
}

function sse(event: string, data: unknown): Uint8Array {
  return new TextEncoder().encode(`event: ${event}\ndata: ${JSON.stringify(data)}\n\n`);
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

    const body = (await req.json()) as CaptureRequest;
    const {
      qualification_code,
      files = [],
      transcript,
      context: extraContext,
    } = body;

    if (!qualification_code) {
      return new Response(
        JSON.stringify({ success: false, error: 'qualification_code required' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }
    if (!files.length && !transcript) {
      return new Response(
        JSON.stringify({ success: false, error: 'At least one file or a transcript required' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // ── Pre-flight (parallel): AC structure + BS 7671 RAG ─────────────
    const ragQuery =
      transcript || extraContext || `${qualification_code} BS 7671 inspection testing`;

    const [acResult, facets] = await Promise.all([
      supabase.rpc('get_qualification_acs', { p_qualification_code: qualification_code }),
      searchFacets(supabase, {
        query: ragQuery,
        matchCount: 5,
        skipEmbedding: true,
        documentTypes: ['bs7671'],
      }).catch(() => [] as BS7671Facet[]),
    ]);

    const acData = (acResult.data || []) as Array<Record<string, unknown>>;
    const acContext = buildAcContext(acData);
    const ragContext = buildRagContext(facets);

    // ── Stream parallel analyses ──────────────────────────────────────
    const abortController = new AbortController();
    req.signal.addEventListener('abort', () => abortController.abort());

    const totalFiles = files.length;
    const totalTasks = totalFiles + (transcript ? 1 : 0);

    const stream = new ReadableStream({
      async start(controller) {
        try {
          controller.enqueue(
            sse('meta', {
              totalFiles,
              totalTasks,
              hasTranscript: !!transcript,
              ragSnippets: facets.length,
              regNumbers: facets.map((f) => f.regNumber).filter(Boolean),
            })
          );

          // Per-file tasks
          const fileTasks = files.map((file) =>
            analyseFile(
              file,
              {
                openAiKey,
                qualificationCode: qualification_code,
                acContext,
                ragContext,
                transcript,
                extraContext,
              },
              abortController.signal
            )
              .then((result) => ({ kind: 'file' as const, file, result }))
              .catch((err) => ({
                kind: 'file' as const,
                file,
                result: { error: err instanceof Error ? err.message : String(err) },
              }))
          );

          // Reflection task (only if transcript present)
          const reflectionTask = transcript
            ? draftReflection(
                {
                  openAiKey,
                  qualificationCode: qualification_code,
                  acContext,
                  ragContext,
                  transcript,
                },
                abortController.signal
              )
                .then((result) => ({ kind: 'reflection' as const, result }))
                .catch((err) => ({
                  kind: 'reflection' as const,
                  result: { error: err instanceof Error ? err.message : String(err) },
                }))
            : null;

          const allTasks: Array<Promise<{ kind: 'file' | 'reflection'; file?: CaptureFile; result: Record<string, unknown> | { error: string } }>> =
            reflectionTask ? [...fileTasks, reflectionTask] : [...fileTasks];

          let completed = 0;
          await Promise.all(
            allTasks.map((p) =>
              p.then((res) => {
                if (res.kind === 'file') {
                  if ('error' in res.result) {
                    controller.enqueue(
                      sse('error', { fileId: res.file?.id, error: res.result.error })
                    );
                  } else {
                    controller.enqueue(
                      sse('file-result', { fileId: res.file?.id, analysis: res.result })
                    );
                  }
                } else {
                  if ('error' in res.result) {
                    controller.enqueue(sse('error', { error: res.result.error }));
                  } else {
                    controller.enqueue(sse('reflection-result', { reflection: res.result }));
                  }
                }
                completed++;
              })
            )
          );

          controller.enqueue(sse('done', { completed }));
          controller.close();
        } catch (err) {
          controller.enqueue(
            sse('error', { error: err instanceof Error ? err.message : String(err) })
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
    console.error('[portfolio-capture-stream] Error:', err);
    return new Response(
      JSON.stringify({
        success: false,
        error: err instanceof Error ? err.message : 'Internal error',
      }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});
