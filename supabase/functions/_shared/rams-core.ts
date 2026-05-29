/**
 * AI RAMS Generator core — parallel grounded pipeline.
 *
 * Drives the new `rams-generator` edge function. The pipeline:
 *
 *   1. Load job from rams_generation_jobs.
 *   2. Ingest attachments (PDFs + images) if any.
 *   3. Parallel RAG across three corpora:
 *        - bs7671_facets        (search_bs7671_v3)         — electrical regs
 *        - safety_facets        (search_safety_facets_v2)  — HSE / CDM / HSG
 *        - practical_work_v2    (search_practical_work_v2) — procedural patterns
 *   4. Parallel single-pass AI calls:
 *        - analyseHazards()       — 16-24 hazards, controls inline, BS 7671 + HSE cites
 *        - buildMethodSteps()     — 14-20 detailed installation steps
 *      Both call gpt-5.4-mini-2026-03-17 with max_completion_tokens=24000.
 *      Both stream partials to rams_partials as each finishes.
 *   5. Merge results into rams_data + method_data on the job row.
 *   6. Mark complete.
 *
 * The H&S Specialist (AgentSelector flow) uses a 2-pass pipeline for
 * deeper editorial detail. RAMS uses 1-pass per agent to hit the 60s
 * target while still running the Method statement agent in parallel.
 * Users edit hazards / steps in the review screen anyway.
 */

/* eslint-disable @typescript-eslint/no-explicit-any */

import { searchFacets, formatFacetsForPrompt, type BS7671Facet } from './bs7671-facets-rag.ts';
import {
  searchSafetyFacets,
  formatSafetyFacetsForPrompt,
  type SafetyFacet,
} from './safety-facets-rag.ts';
import {
  searchPracticalWorkV2,
  formatPracticalWorkForPrompt,
  type PracticalWorkFacet,
} from './rag-practical-work.ts';

const MODEL = 'gpt-5.4-mini-2026-03-17';
const MAX_COMPLETION_TOKENS = 32000;

/**
 * Best-effort JSON repair for OpenAI responses that hit the token cap
 * mid-output. Closes any open arrays and objects, strips a trailing comma,
 * and returns a parseable string. If the original is already valid, it's
 * returned untouched. Callers fall through to `JSON.parse(text)` first;
 * only on failure do they try this.
 */
function repairTruncatedJson(text: string): string {
  let s = String(text ?? '').trim();
  if (!s) return s;

  // Strip a code-fence wrapper if present.
  if (s.startsWith('```')) {
    s = s.replace(/^```(?:json)?\s*/i, '').replace(/```\s*$/i, '');
  }

  // Walk the string, tracking open braces/brackets that aren't inside strings.
  const stack: string[] = [];
  let inStr = false;
  let escape = false;
  let lastSafe = -1;
  for (let i = 0; i < s.length; i++) {
    const c = s[i];
    if (escape) {
      escape = false;
      continue;
    }
    if (c === '\\') {
      escape = true;
      continue;
    }
    if (c === '"') {
      inStr = !inStr;
      continue;
    }
    if (inStr) continue;
    if (c === '{' || c === '[') stack.push(c);
    else if (c === '}' || c === ']') stack.pop();
    if (!inStr && stack.length > 0) lastSafe = i;
  }

  // If we ended inside a string, drop everything from the unclosed quote.
  if (inStr) {
    const lastQuote = s.lastIndexOf('"', lastSafe);
    if (lastQuote > 0) s = s.slice(0, lastQuote);
  }

  // Strip a trailing comma or partial key/value.
  s = s.replace(/,\s*$/, '');
  s = s.replace(/:\s*$/, ': null');

  // Close any open brackets in LIFO order.
  while (stack.length) {
    const open = stack.pop();
    s += open === '{' ? '}' : ']';
  }

  return s;
}

function parseLenient(text: string): any {
  try {
    return JSON.parse(text);
  } catch {
    const repaired = repairTruncatedJson(text);
    return JSON.parse(repaired);
  }
}

/**
 * Incremental top-level-element extractor for a named JSON array.
 *
 * Given a running concatenated text buffer that's being built up chunk-by-
 * chunk from a streamed JSON response, this extractor finds completed
 * `{...}` elements at the top level of the named array (e.g. `risks` or
 * `method_steps`) and yields each one as it closes.
 *
 * Used to write per-element partials (so the UI sees hazard count tick
 * up live during generation) without having to fully parse the document
 * until the stream completes.
 */
function makeIncrementalArrayExtractor(arrayKey: string) {
  let buffer = '';
  let arrayStart = -1;
  let depth = 0;
  let inStr = false;
  let escape = false;
  let elementStart = -1;
  let nextScan = 0;

  return {
    /** Append a streamed chunk and return any newly-completed elements. */
    push(chunk: string): any[] {
      buffer += chunk;

      if (arrayStart === -1) {
        // Find the array opening — handles both " and unquoted keys defensively.
        const m = buffer.match(new RegExp(`"${arrayKey}"\\s*:\\s*\\[`, 'm'));
        if (!m) return [];
        arrayStart = (m.index ?? 0) + m[0].length;
        nextScan = arrayStart;
      }

      const found: any[] = [];
      let i = nextScan;
      while (i < buffer.length) {
        const c = buffer[i];
        if (escape) {
          escape = false;
          i++;
          continue;
        }
        if (c === '\\') {
          escape = true;
          i++;
          continue;
        }
        if (c === '"') {
          inStr = !inStr;
          i++;
          continue;
        }
        if (inStr) {
          i++;
          continue;
        }
        if (c === '{') {
          if (depth === 0) elementStart = i;
          depth++;
        } else if (c === '}') {
          depth--;
          if (depth === 0 && elementStart >= 0) {
            const slice = buffer.slice(elementStart, i + 1);
            try {
              found.push(JSON.parse(slice));
            } catch {
              // Partial / malformed element — skip silently; full lenient
              // parse runs on the final buffer too so nothing is lost.
            }
            elementStart = -1;
          }
        } else if (c === ']' && depth === 0) {
          // End of the target array; stop scanning.
          break;
        }
        i++;
      }
      nextScan = i;
      return found;
    },
    fullText(): string {
      return buffer;
    },
  };
}

/**
 * Stream an OpenAI chat completion and surface each text delta to a
 * callback. Returns the full concatenated text + finish_reason once the
 * stream closes. The body MUST set stream: true.
 */
async function streamOpenAIChat(opts: {
  apiKey: string;
  body: Record<string, unknown>;
  onContent: (delta: string) => void | Promise<void>;
}): Promise<{ text: string; finishReason: string | null }> {
  const response = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${opts.apiKey}`,
      'Content-Type': 'application/json',
      Accept: 'text/event-stream',
    },
    body: JSON.stringify({ ...opts.body, stream: true }),
  });

  if (!response.ok) {
    const errText = await response.text();
    throw new Error(`OpenAI ${response.status}: ${errText.slice(0, 500)}`);
  }
  if (!response.body) {
    throw new Error('OpenAI returned an empty stream');
  }

  const reader = response.body.getReader();
  const decoder = new TextDecoder();
  let leftover = '';
  let fullText = '';
  let finishReason: string | null = null;

  while (true) {
    const { done, value } = await reader.read();
    if (done) break;
    const chunk = leftover + decoder.decode(value, { stream: true });
    const events = chunk.split('\n\n');
    leftover = events.pop() ?? '';

    for (const evt of events) {
      // Each event may be multi-line; only `data: ...` lines matter.
      for (const line of evt.split('\n')) {
        if (!line.startsWith('data: ')) continue;
        const payload = line.slice(6).trim();
        if (payload === '[DONE]') continue;
        try {
          const j = JSON.parse(payload);
          const choice = j?.choices?.[0];
          const delta: string | undefined = choice?.delta?.content;
          if (typeof delta === 'string' && delta.length > 0) {
            fullText += delta;
            await opts.onContent(delta);
          }
          if (choice?.finish_reason) finishReason = choice.finish_reason;
        } catch {
          // ignore individual malformed events; stream typically recovers
        }
      }
    }
  }
  return { text: fullText, finishReason };
}

/**
 * Run a vision pass over the uploaded attachments and return a
 * compact hazards-context block to inject into the H&S agent prompt.
 *
 * Each image is sent to gpt-5.4-mini with a vision-capable system prompt
 * instructing it to extract visible electrical / site hazards, with
 * conservative honesty (no speculation when the image is ambiguous).
 * Returns null if no images / all failed — callers should skip injection.
 */
async function runVisionPrepass(supabase: any, job: RAMSJobRow): Promise<string | null> {
  const attachments = Array.isArray(job.attachments) ? job.attachments : [];
  const images = attachments.filter((a) => (a.type ?? '').startsWith('image/'));
  if (images.length === 0) return null;

  // Use Gemini for vision (project standard — same as parse-snag-photo).
  // OpenAI gpt-5.4-mini is text-only in this codebase.
  const geminiKey = Deno.env.get('GEMINI_API_KEY');
  if (!geminiKey) {
    console.warn('[rams-core] GEMINI_API_KEY not set, skipping vision prepass');
    return null;
  }

  const PER_IMAGE_PROMPT = `You are looking at a site photo submitted with a RAMS brief. Extract visible hazards as plain-text bullets. Rules:
- Only describe what is clearly visible. Do NOT speculate. If ambiguous, say so.
- UK English. Imperative voice for recommended actions.
- Look for: exposed live parts, lost / suspect earthing, working at height (≥1 m), asbestos suspicion (AIB / textured coatings / old lagging), dust, hot works, manual handling, lone working, public access, vehicle movement, fire load, confined space, dampness, poor housekeeping.
- 3-6 bullets, lead each with the hazard noun phrase.
- Open with a one-line scene description.`;

  // Process each image in its own Gemini call (parallel). Single-image
  // requests stay under any inline-data ceiling and match the established
  // parse-snag-photo pattern in this codebase.
  const results = await Promise.all(
    images.map(async (a, idx): Promise<string | null> => {
      try {
        const { data: signed } = await supabase.storage
          .from('safety-photos')
          .createSignedUrl(a.path, 60 * 10);
        if (!signed?.signedUrl) return null;
        const imgResp = await fetch(signed.signedUrl);
        if (!imgResp.ok) return null;
        const bytes = new Uint8Array(await imgResp.arrayBuffer());

        let binary = '';
        const chunkSize = 0x8000;
        for (let i = 0; i < bytes.length; i += chunkSize) {
          binary += String.fromCharCode(...bytes.subarray(i, i + chunkSize));
        }
        const base64 = btoa(binary);

        const response = await fetch(
          `https://generativelanguage.googleapis.com/v1beta/models/gemini-3-flash-preview:generateContent?key=${geminiKey}`,
          {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              contents: [
                {
                  parts: [
                    { text: PER_IMAGE_PROMPT },
                    {
                      inline_data: {
                        mime_type: a.type ?? 'image/jpeg',
                        data: base64,
                      },
                    },
                  ],
                },
              ],
              generationConfig: {
                maxOutputTokens: 600,
                temperature: 0.15,
              },
            }),
          }
        );
        if (!response.ok) {
          console.warn(
            `[rams-core] vision pass for photo ${idx + 1} failed:`,
            response.status,
            (await response.text()).slice(0, 200)
          );
          return null;
        }
        const j = await response.json();
        const text = String(j?.candidates?.[0]?.content?.parts?.[0]?.text ?? '').trim();
        return text.length > 0 ? `Photo ${idx + 1}\n${text}` : null;
      } catch (err) {
        console.warn(`[rams-core] vision pass for photo ${idx + 1} threw:`, err);
        return null;
      }
    })
  );

  const blocks = results.filter((s): s is string => !!s);
  if (blocks.length === 0) return null;
  return blocks.join('\n\n');
}

type WorkType = 'domestic' | 'commercial' | 'industrial';

interface RAMSJobRow {
  id: string;
  user_id: string;
  job_description: string;
  project_info: any;
  job_scale: WorkType | null;
  status: string;
  attachments?: Array<{ path: string; name?: string; type?: string }> | null;
  vision_context?: string | null;
}

/* ────────────────────────────────────────────────────────
   Public entry — called by rams-generator edge function
   ──────────────────────────────────────────────────────── */

/**
 * Re-run a single agent for an existing job and merge into the row.
 * Used when one half of a partial RAMS failed and the user wants to
 * patch it without regenerating the whole document.
 */
export async function runSingleAgent(
  supabase: any,
  jobId: string,
  which: 'hs' | 'method'
): Promise<void> {
  const start = Date.now();
  try {
    const { data: job, error } = await supabase
      .from('rams_generation_jobs')
      .select(
        'id, user_id, job_description, project_info, job_scale, status, rams_data, method_data, attachments, vision_context'
      )
      .eq('id', jobId)
      .maybeSingle();
    if (error || !job) throw new Error(`Job not found: ${jobId}`);

    await updateJob(supabase, jobId, {
      status: 'processing',
      progress: 20,
      current_step:
        which === 'hs' ? 'Drafting the hazard register' : 'Drafting the method statement',
      error_message: null,
      ...(which === 'hs'
        ? { hs_agent_status: 'processing', hs_agent_progress: 0 }
        : { installer_agent_status: 'processing', installer_agent_progress: 0 }),
    });

    const workType: WorkType = (job.job_scale ?? 'commercial') as WorkType;
    const ragQuery = buildRagQuery(job);

    // RAG only for the corpora this agent actually uses.
    let bs7671Facets: BS7671Facet[] = [];
    let safetyFacets: SafetyFacet[] = [];
    let practical: PracticalWorkFacet[] = [];
    if (which === 'hs') {
      [bs7671Facets, safetyFacets] = await Promise.all([
        searchFacets(supabase, { query: ragQuery, matchCount: 10 }),
        searchSafetyFacets(supabase, { query: ragQuery, matchCount: 18 }),
      ]);
    } else {
      [bs7671Facets, practical] = await Promise.all([
        searchFacets(supabase, { query: ragQuery, matchCount: 10 }),
        searchPracticalWorkV2(supabase, {
          query: ragQuery,
          matchCount: 16,
          facetTypes: ['installation', 'testing', 'commissioning'],
          appliesTo: [workType],
        }),
      ]);
    }

    if (await isCancelled(supabase, jobId)) return;

    const visionContext: string | null = job.vision_context ?? null;

    let result: any;
    if (which === 'hs') {
      result = await runHealthSafetyAgent(supabase, jobId, {
        job,
        workType,
        bs7671Facets,
        safetyFacets,
        visionContext,
      });
    } else {
      result = await runMethodStatementAgent(supabase, jobId, {
        job,
        workType,
        bs7671Facets,
        practical,
        visionContext,
      });
    }

    // Stitch the new agent output into the existing row. Determine the new
    // overall status: if both halves now exist → complete; if only one →
    // partial; otherwise failed.
    const existingHs = which === 'hs' ? result : job.rams_data;
    const existingMethod = which === 'method' ? result : job.method_data;
    if (existingHs && existingMethod) {
      mapMethodStepsToHazards(existingMethod, existingHs);
    }

    const both = !!existingHs && !!existingMethod;
    const partial = !both && (!!existingHs || !!existingMethod);
    const finalStatus = both ? 'complete' : partial ? 'partial' : 'failed';
    const elapsedSeconds = Math.round((Date.now() - start) / 1000);

    await updateJob(supabase, jobId, {
      status: finalStatus,
      progress: 100,
      current_step:
        finalStatus === 'complete'
          ? `Patched in ${elapsedSeconds}s`
          : finalStatus === 'partial'
            ? 'Generated with gaps'
            : 'Failed',
      ...(which === 'hs'
        ? {
            rams_data: result,
            hs_agent_status: 'complete',
            hs_agent_progress: 100,
          }
        : {
            method_data: result,
            installer_agent_status: 'complete',
            installer_agent_progress: 100,
          }),
      completed_at: new Date().toISOString(),
    });

    await writePartial(supabase, jobId, 'finalise', {
      hsOk: !!existingHs,
      methodOk: !!existingMethod,
      elapsedSeconds,
      hazardCount: existingHs?.risks?.length ?? 0,
      stepCount: existingMethod?.method_steps?.length ?? existingMethod?.steps?.length ?? 0,
      retried: which,
    });
  } catch (err: any) {
    console.error(`[rams-core] runSingleAgent(${which}) fatal:`, err);
    // Re-read so we know whether the OTHER half is still good. If so, keep
    // status as 'partial' instead of overwriting the previously-good run.
    const { data: cur } = await supabase
      .from('rams_generation_jobs')
      .select('rams_data, method_data')
      .eq('id', jobId)
      .maybeSingle();
    const otherStillGood = which === 'hs' ? !!cur?.method_data : !!cur?.rams_data;
    const fallbackStatus = otherStillGood ? 'partial' : 'failed';
    await updateJob(supabase, jobId, {
      status: fallbackStatus,
      progress: 100,
      current_step:
        fallbackStatus === 'partial' ? 'Retry failed — original RAMS preserved' : 'Failed',
      error_message: String(err?.message ?? err),
      ...(which === 'hs' ? { hs_agent_status: 'failed' } : { installer_agent_status: 'failed' }),
      completed_at: new Date().toISOString(),
    }).catch(() => {});
  }
}

export async function runRAMSGeneration(supabase: any, jobId: string): Promise<void> {
  const start = Date.now();
  try {
    const { data: job, error } = await supabase
      .from('rams_generation_jobs')
      .select('id, user_id, job_description, project_info, job_scale, status, attachments')
      .eq('id', jobId)
      .maybeSingle();
    if (error || !job) throw new Error(`Job not found: ${jobId}`);

    await updateJob(supabase, jobId, {
      status: 'processing',
      progress: 8,
      current_step: 'Reading the brief',
      started_at: new Date().toISOString(),
      hs_agent_status: 'pending',
      installer_agent_status: 'pending',
    });

    if (await isCancelled(supabase, jobId)) return;

    // 1. Parallel RAG across all three corpora AND a vision pre-pass over
    //    any uploaded photos / drawings. Vision is best-effort: if it fails
    //    or there are no images, the H&S agent runs with text brief only.
    const workType: WorkType = (job.job_scale ?? 'commercial') as WorkType;
    const ragQuery = buildRagQuery(job);

    const [bs7671Facets, safetyFacets, practical, visionContext] = await Promise.all([
      searchFacets(supabase, { query: ragQuery, matchCount: 10 }),
      searchSafetyFacets(supabase, { query: ragQuery, matchCount: 18 }),
      searchPracticalWorkV2(supabase, {
        query: ragQuery,
        matchCount: 16,
        facetTypes: ['installation', 'testing', 'commissioning'],
        appliesTo: [workType],
      }),
      runVisionPrepass(supabase, job),
    ]);

    if (visionContext) {
      await updateJob(supabase, jobId, { vision_context: visionContext });
    }

    await writePartial(supabase, jobId, 'rag', {
      bs7671FacetCount: bs7671Facets.length,
      safetyFacetCount: safetyFacets.length,
      practicalCount: practical.length,
      workType,
      visionFindings: visionContext ? true : false,
    });

    if (await isCancelled(supabase, jobId)) return;

    await updateJob(supabase, jobId, {
      progress: 20,
      current_step: 'Drafting hazards and method statement',
      hs_agent_status: 'processing',
      installer_agent_status: 'processing',
    });

    // 2. Parallel single-pass AI calls — H&S and Method statement.
    //    Each writes its own partials as it returns so the frontend
    //    sees hazards land before steps (or vice versa) depending on
    //    which call finishes first. As each one settles we bump
    //    progress so the UI doesn't sit at 20% for the whole window.
    let completedAgents = 0;
    const onAgentDone = async (which: 'hs' | 'method') => {
      completedAgents += 1;
      const progress = completedAgents === 1 ? 60 : 95;
      await updateJob(supabase, jobId, {
        progress,
        current_step: completedAgents === 1 ? 'Stitching findings' : 'Finalising document',
        ...(which === 'hs'
          ? { hs_agent_status: 'complete', hs_agent_progress: 100 }
          : { installer_agent_status: 'complete', installer_agent_progress: 100 }),
      });
    };

    const hsPromise = runHealthSafetyAgent(supabase, jobId, {
      job,
      workType,
      bs7671Facets,
      safetyFacets,
      visionContext,
    }).then(async (r) => {
      await onAgentDone('hs');
      return r;
    });
    const methodPromise = runMethodStatementAgent(supabase, jobId, {
      job,
      workType,
      bs7671Facets,
      practical,
      visionContext,
    }).then(async (r) => {
      await onAgentDone('method');
      return r;
    });
    const [hsResult, methodResult] = await Promise.allSettled([hsPromise, methodPromise]);

    if (await isCancelled(supabase, jobId)) return;

    const ramsData = hsResult.status === 'fulfilled' ? hsResult.value : null;
    const methodData = methodResult.status === 'fulfilled' ? methodResult.value : null;

    if (hsResult.status === 'rejected') {
      console.error('[rams-core] H&S agent failed:', hsResult.reason);
    }
    if (methodResult.status === 'rejected') {
      console.error('[rams-core] Method statement agent failed:', methodResult.reason);
    }

    // 3b. Map method_steps[].linked_hazard_titles → risk IDs from the parallel H&S agent.
    if (ramsData && methodData) {
      mapMethodStepsToHazards(methodData, ramsData);
    }

    // 4. Merge + finalise.
    const both = !!ramsData && !!methodData;
    const partial = !both && (!!ramsData || !!methodData);
    const finalStatus = both ? 'complete' : partial ? 'partial' : 'failed';
    const elapsedSeconds = Math.round((Date.now() - start) / 1000);

    await updateJob(supabase, jobId, {
      status: finalStatus,
      progress: 100,
      current_step:
        finalStatus === 'complete'
          ? `Done in ${elapsedSeconds}s`
          : finalStatus === 'partial'
            ? 'Generated with gaps'
            : 'Failed',
      rams_data: ramsData,
      method_data: methodData,
      hs_agent_progress: ramsData ? 100 : 0,
      installer_agent_progress: methodData ? 100 : 0,
      hs_agent_status: ramsData ? 'complete' : 'failed',
      installer_agent_status: methodData ? 'complete' : 'failed',
      error_message:
        finalStatus === 'failed'
          ? 'Both H&S and Method statement generation failed. Try again.'
          : null,
      completed_at: new Date().toISOString(),
    });

    await writePartial(supabase, jobId, 'finalise', {
      hsOk: !!ramsData,
      methodOk: !!methodData,
      elapsedSeconds,
      hazardCount: ramsData?.risks?.length ?? 0,
      stepCount: methodData?.steps?.length ?? 0,
    });
  } catch (err: any) {
    console.error('[rams-core] worker fatal:', err);
    await updateJob(supabase, jobId, {
      status: 'failed',
      progress: 100,
      current_step: 'Failed',
      error_message: String(err?.message ?? err),
      completed_at: new Date().toISOString(),
    }).catch(() => {});
  }
}

/* ────────────────────────────────────────────────────────
   Job + partial table helpers
   ──────────────────────────────────────────────────────── */

async function updateJob(supabase: any, jobId: string, fields: Record<string, any>) {
  const { error } = await supabase.from('rams_generation_jobs').update(fields).eq('id', jobId);
  if (error) console.error('[rams-core] updateJob failed:', error);
}

async function isCancelled(supabase: any, jobId: string): Promise<boolean> {
  const { data } = await supabase
    .from('rams_generation_jobs')
    .select('status')
    .eq('id', jobId)
    .maybeSingle();
  return data?.status === 'cancelled';
}

async function writePartial(supabase: any, jobId: string, stage: string, payload: any) {
  const { error } = await supabase.from('rams_partials').upsert({
    job_id: jobId,
    stage,
    payload,
  });
  if (error) console.error(`[rams-core] writePartial(${stage}) failed:`, error);
}

/* ────────────────────────────────────────────────────────
   RAG query composition
   ──────────────────────────────────────────────────────── */

function buildRagQuery(job: RAMSJobRow): string {
  const parts: string[] = [];
  const pi = job.project_info ?? {};
  if (pi.projectName) parts.push(pi.projectName);
  if (pi.location) parts.push(pi.location);
  if (job.job_scale) parts.push(job.job_scale);
  if (job.job_description) parts.push(job.job_description);
  parts.push(
    'electrical installation hazard risk assessment control measures method statement BS 7671 HSE'
  );
  return parts.join(' ').slice(0, 4000);
}

/* ────────────────────────────────────────────────────────
   Shared editorial voice rules for both agents
   ──────────────────────────────────────────────────────── */

const VOICE_RULES = `Voice and register:
- Imperative for action / control measures ("Isolate the supply at the origin", "Provide barriers and warning signs").
- Passive for verifications and acceptance ("shall be verified by", "is to be recorded on").
- Third person. Never "you", "I", or "we". Subject is "the operative" / "the competent person" / "the site supervisor" / "the principal contractor".
- No conversational asides, no apprentice-style explanation, no rhetorical questions.
- Specifics over generalities: name values (limit values, exposure thresholds, IP ratings, RCD trip times), tests (insulation resistance ≥1 MΩ at 500 V dc, GS38 prove-dead), documents (permit-to-work, induction record, risk assessment sign-off, EICR).
- Citation style: BS 7671 cites inline as [411.3.1.1]; HSE / HSG cites as [HSG253] or [CDM 2015 reg 13]; HSWA as [HSWA s.2].
- "Shall" = mandatory. "Should" = strongly advised. "May" = permissible alternative.
- Acceptance criteria must be quantified (e.g. "exposure ≤80 dB(A) over 8 hours", "fall arrest ≤2 m"), not "satisfactory".
- UK English only.
- Cite document codes exactly as they appear in the source library blocks.`;

/* ────────────────────────────────────────────────────────
   H&S agent — single pass, 16-24 hazards fully formed
   ──────────────────────────────────────────────────────── */

interface HSAgentArgs {
  job: RAMSJobRow;
  workType: WorkType;
  bs7671Facets: BS7671Facet[];
  safetyFacets: SafetyFacet[];
  visionContext?: string | null;
}

async function runHealthSafetyAgent(supabase: any, jobId: string, args: HSAgentArgs): Promise<any> {
  const apiKey = Deno.env.get('OPENAI_API_KEY');
  if (!apiKey) throw new Error('OPENAI_API_KEY not configured');

  const { job, workType, bs7671Facets, safetyFacets, visionContext } = args;
  const pi = job.project_info ?? {};

  const systemPrompt = `You are a Senior Chartered Health & Safety Practitioner (CMIOSH) and NICEIC Approved Electrician. You are authoring a FORMAL RISK ASSESSMENT for an electrical installation job — a hazard register with scored risks, hierarchical control measures, residual risk and BS 7671 + HSE citations. This document is issued to the principal contractor, counter-signed before work commences, and retained in the project H&S file.

${VOICE_RULES}

Output strict JSON. UK English. Document-grade. No markdown.

Schema (rich v2 — every hazard fully detailed):
{
  "projectName": string,                              // copied from input
  "location": string,                                 // copied from input
  "date": string,                                     // today's date ISO
  "assessor": string,                                 // copied from input
  "activities": string[],                             // 4-6 top-level activities for the work
  "executive_summary": string,                        // 5-7 sentences — scope, headline hazards, key statutory references, residual risk position
  "rationale": string,                                // 2-3 sentences — why this RAMS exists / what work it covers
  "scope": string,                                    // 3-5 sentences — boundaries of the work
  "preparation": {
    "competency_required": string[],                  // 3-5 — qualifications, cards, training tickets
    "permits_required": string[],                     // 0-5
    "documentation_required": string[],               // 3-5
    "site_access": string[],                          // 2-4
    "ppe_baseline": string[]                          // 5-8
  },
  "risks": Array<{
    "id": string,                                     // "risk-1", "risk-2", ...
    "hazard_number": number,
    "hazard": string,                                 // noun phrase, 8-14 words
    "rationale": string,                              // 2-3 sentences — mechanism of harm, who exposed, when
    "risk": string,                                   // 1 sentence — the harm if uncontrolled, who is exposed
    "who_at_risk": string[],                          // 2-5 — operative / principal contractor / public / designer
    "likelihood": 1 | 2 | 3 | 4 | 5,
    "severity": 1 | 2 | 3 | 4 | 5,
    "riskRating": number,                             // likelihood × severity
    "controlsStructured": Array<{                     // 4-7 controls, ordered by control hierarchy
      "tier": "eliminate" | "substitute" | "engineer" | "admin" | "ppe",
      "control": string,                              // imperative, 8-16 words
      "detail": string,                               // 25-40 words — HOW the control is implemented + success criterion
      "responsible_role": string
    }>,
    "residual_likelihood": 1 | 2 | 3 | 4 | 5,
    "residual_severity": 1 | 2 | 3 | 4 | 5,
    "residual_risk_rating": number,
    "ppe_required": string[],                         // 3-5 hazard-specific PPE (e.g. "Class 0 insulating gloves to BS EN 60903")
    "competence_required": string[],                  // 1-3 e.g. "Approved Electrician, City & Guilds 2391"
    "bs7671_cites": string[],                         // 1-3 from BS 7671 facets block — DO NOT INVENT
    "safety_cites": string[],                         // 1-3 from safety facets block — DO NOT INVENT
    "monitoring_checks": string[],                    // 2-3 in-progress monitoring activities
    "evidence_required": string[],                    // 2-3 photos / sign-offs / test results
    "stop_work_triggers": string[]                    // 1-3 conditions mandating stopping work
  }>,
  "ppeDetails": Array<{
    "id": string,
    "itemNumber": number,
    "ppeType": string,
    "standard": string,
    "mandatory": boolean,
    "purpose": string
  }>,
  "emergencyProcedures": string[],                    // 6-10 items
  "site_logistics": {
    "vehicle_access": string,
    "parking": string,
    "material_storage": string,
    "waste_management": string,
    "welfare_facilities": string,
    "site_restrictions": string
  },
  "complianceRegulations": string[],                  // 6-10 cite strings (mix of BS 7671 + HSE from facets)
  "complianceWarnings": string[],                     // 3-5 plain-English warnings
  "competence_requirements": Array<{ key: string; value: string }>  // 4-6 — overall qualifications, scheme membership, training
}

Hard rules:
- MINIMUM 14 hazards, MAXIMUM 18 hazards. Each with distinct mechanism of harm. Do NOT pad.
- ALWAYS include separate hazards for: (a) electric shock from live parts, (b) arc flash, (c) failure to safely isolate and prove dead, (d) slips/trips/falls, (e) manual handling, (f) tools failure / dropped objects.
- ALWAYS include hazards triggered by the brief: confined space, hot works, working at height (≥1 m), lone working, asbestos disturbance, dust, noise ≥80 dB(A), HAVS, working near live services, fire load, public access.
- Risk score: 1-4 low, 5-9 medium, 10-15 high, 16-25 unacceptable. HSE 5×5 matrix. Sort risks by riskRating DESC.
- Every hazard MUST have controlsStructured with 4-7 entries.
- Each control's detail MUST be 25-40 words and specific to THIS hazard (not generic).
- For electrical hazards: name the test (e.g. "GS38 prove-dead with approved 2-pole indicator", "MFT IR ≥1 MΩ at 500 V dc").
- bs7671_cites MUST appear in the BS 7671 facets block. safety_cites MUST appear in the safety facets block. Do not invent.
- residual_risk_rating ≤ riskRating for every hazard.
- For severity ≥3: at least one of (eliminate / substitute / engineer) must appear before PPE.`;

  const userBlock = [
    `# Project info`,
    `Project: ${pi.projectName ?? '(not provided)'}`,
    `Location: ${pi.location ?? '(not provided)'}`,
    `Assessor: ${pi.assessor ?? '(not provided)'}`,
    `Contractor: ${pi.contractor ?? '(not provided)'}`,
    `Work type: ${workType}`,
    ``,
    `# Brief from the customer`,
    job.job_description ?? '',
    `\n# BS 7671 facets — use ONLY these for electrical reg cites`,
    formatFacetsForPrompt(bs7671Facets),
    `\n# Safety facets (HSG / CDM / EAW / PUWER etc) — use ONLY these for HSE cites`,
    formatSafetyFacetsForPrompt(safetyFacets),
    visionContext
      ? `\n# Visible hazards from site photos — incorporate these into the register where relevant\n${visionContext}`
      : '',
    `\n# Today's date`,
    new Date().toISOString().split('T')[0],
  ]
    .filter(Boolean)
    .join('\n');

  // Stream the H&S response and tick the `hazards` partial up as each
  // hazard completes in the running buffer. The UI subscribes to that
  // partial via realtime and shows a live count.
  const extractor = makeIncrementalArrayExtractor('risks');
  let liveCount = 0;
  let lastWritten = 0;
  let text = '';
  let finishReason: string | null = null;
  try {
    const result = await streamOpenAIChat({
      apiKey,
      body: {
        model: MODEL,
        max_completion_tokens: MAX_COMPLETION_TOKENS,
        response_format: { type: 'json_object' },
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: userBlock },
        ],
      },
      onContent: async (delta) => {
        const found = extractor.push(delta);
        if (found.length) {
          liveCount += found.length;
          // Throttle writes so we don't hammer the realtime channel —
          // emit every new element since the last write.
          if (liveCount - lastWritten >= 1) {
            await writePartial(supabase, jobId, 'hazards', {
              count: liveCount,
              streaming: true,
            });
            lastWritten = liveCount;
          }
        }
      },
    });
    text = result.text;
    finishReason = result.finishReason;
  } catch (err) {
    throw new Error(`OpenAI (H&S) stream failed: ${(err as Error).message}`);
  }

  let parsed: any;
  try {
    parsed = parseLenient(text);
    if (finishReason === 'length') {
      console.warn('[rams-core] H&S response truncated — used JSON repair to recover.');
    }
  } catch (err) {
    console.error(
      '[rams-core] H&S parse failed:',
      err,
      'finish_reason:',
      finishReason,
      'text:',
      text.slice(0, 400)
    );
    throw new Error('H&S agent returned malformed JSON');
  }

  // Stamp project info back from input (don't trust AI to copy correctly).
  parsed.projectName = pi.projectName ?? parsed.projectName ?? '';
  parsed.location = pi.location ?? parsed.location ?? '';
  parsed.assessor = pi.assessor ?? parsed.assessor ?? '';
  parsed.contractor = pi.contractor ?? '';
  parsed.supervisor = pi.supervisor ?? '';
  parsed.siteManagerName = pi.siteManagerName ?? '';
  parsed.siteManagerPhone = pi.siteManagerPhone ?? '';
  parsed.firstAiderName = pi.firstAiderName ?? '';
  parsed.firstAiderPhone = pi.firstAiderPhone ?? '';
  parsed.safetyOfficerName = pi.safetyOfficerName ?? '';
  parsed.safetyOfficerPhone = pi.safetyOfficerPhone ?? '';
  parsed.assemblyPoint = pi.assemblyPoint ?? '';
  parsed.date = parsed.date ?? new Date().toISOString().split('T')[0];

  // Ensure risk IDs are present and stable; derive v1 mirror fields
  // (controls prose + residualRisk) from the structured v2 shape.
  if (Array.isArray(parsed.risks)) {
    const TIER_LABEL: Record<string, string> = {
      eliminate: 'ELIMINATE',
      substitute: 'SUBSTITUTE',
      engineer: 'ENGINEERING CONTROLS',
      admin: 'ADMINISTRATIVE CONTROLS',
      ppe: 'PPE',
    };
    parsed.risks = parsed.risks.map((r: any, i: number) => {
      const riskRating = r.riskRating ?? (r.likelihood ?? 3) * (r.severity ?? 3);
      const residual =
        r.residual_risk_rating ??
        (r.residual_likelihood ?? r.likelihood ?? 2) * (r.residual_severity ?? r.severity ?? 2);
      let controlsProse = '';
      if (Array.isArray(r.controlsStructured) && r.controlsStructured.length) {
        const byTier: Record<string, any[]> = {};
        for (const c of r.controlsStructured) {
          const t = String(c.tier ?? 'admin').toLowerCase();
          (byTier[t] = byTier[t] ?? []).push(c);
        }
        const parts: string[] = [];
        for (const t of ['eliminate', 'substitute', 'engineer', 'admin', 'ppe']) {
          if (!byTier[t]?.length) continue;
          const label = TIER_LABEL[t] ?? t.toUpperCase();
          const sentences = byTier[t]
            .map((c: any) => {
              const head = String(c.control ?? '')
                .trim()
                .replace(/[.;]+$/, '');
              const detail = String(c.detail ?? '').trim();
              return detail ? `${head}. ${detail}` : head;
            })
            .filter(Boolean)
            .join(' ');
          parts.push(`${label}: ${sentences}`);
        }
        controlsProse = parts.join(' ');
      }
      return {
        ...r,
        id: r.id ?? `risk-${i + 1}`,
        riskRating,
        controls: controlsProse,
        residualRisk: residual,
      };
    });
  }

  if (Array.isArray(parsed.ppeDetails)) {
    parsed.ppeDetails = parsed.ppeDetails.map((p: any, i: number) => ({
      ...p,
      id: p.id ?? `ppe-${i + 1}`,
      itemNumber: p.itemNumber ?? i + 1,
    }));
  }

  parsed.version = 2;

  await writePartial(supabase, jobId, 'hazards', {
    count: parsed.risks?.length ?? 0,
    highestRating: Math.max(...(parsed.risks ?? []).map((r: any) => r.riskRating ?? 0), 0),
    activities: parsed.activities ?? [],
  });
  await writePartial(supabase, jobId, 'ppe', {
    count: parsed.ppeDetails?.length ?? 0,
  });
  await writePartial(supabase, jobId, 'emergency', {
    count: parsed.emergencyProcedures?.length ?? 0,
  });

  return parsed;
}

/* ────────────────────────────────────────────────────────
   Method statement agent — single pass, 14-20 detailed steps
   ──────────────────────────────────────────────────────── */

interface MethodAgentArgs {
  job: RAMSJobRow;
  workType: WorkType;
  bs7671Facets: BS7671Facet[];
  practical: PracticalWorkFacet[];
  visionContext?: string | null;
}

async function runMethodStatementAgent(
  supabase: any,
  jobId: string,
  args: MethodAgentArgs
): Promise<any> {
  const apiKey = Deno.env.get('OPENAI_API_KEY');
  if (!apiKey) throw new Error('OPENAI_API_KEY not configured');

  const { job, workType, bs7671Facets, practical, visionContext } = args;
  const pi = job.project_info ?? {};

  const systemPrompt = `You are a Senior NICEIC Approved Electrician (AE-level) and JIB Gold Card holder. You are authoring the METHOD STATEMENT half of a formal RAMS — the step-by-step installation procedure for an electrical job. Each step is a discrete unit of work with quantified acceptance criteria, named tools, competencies required, BS 7671 cites where applicable, and safety requirements.

${VOICE_RULES}

Output strict JSON. UK English. Document-grade. No markdown.

Schema (rich v2 — every step fully detailed):
{
  "jobTitle": string,                                 // 8-14 words — what work / asset / location
  "location": string,                                 // copied from input
  "contractor": string,                               // copied from input
  "supervisor": string,                               // copied from input
  "workType": "domestic" | "commercial" | "industrial",
  "duration": string,                                 // e.g. "3 working days"
  "teamSize": string,                                 // e.g. "2 operatives + 1 supervisor"
  "description": string,                              // 3-5 sentences — scope summary in the customer's frame
  "executive_summary": string,                        // 5-7 sentences — what is being installed/tested/commissioned, headline approach, key statutory references, completion criteria
  "scope": string,                                    // 3-5 sentences — boundaries of the work, what is in / out
  "exclusions": string[],                             // 2-5 items — explicit out-of-scope
  "overallRiskLevel": "low" | "medium" | "high",
  "reviewDate": string,                               // 6 months from today, ISO
  "sequence_summary": string[],                       // 6-10 short imperative phases, e.g. "Isolation and prove dead", "First fix containment", "Second fix terminations", "Energisation and live testing"
  "method_steps": Array<{                             // 14-18 steps. Server derives the legacy steps[] array from this — DO NOT emit a separate steps[] field.
    "id": string,                                     // "step-1", "step-2", ...
    "stepNumber": number,
    "title": string,                                  // imperative, 6-10 words
    "phase": string,                                  // "Setup" | "Isolation" | "Installation" | "Termination" | "Testing" | "Commissioning" | "Handover"
    "objective": string,                              // 1 sentence — what this step achieves
    "description": string,                            // 150-220 words — HOW the step is performed end to end. Name instruments, named values (currents, voltages, IR thresholds, torque settings, IP ratings), inspection points, expected outcomes. Reference BS 7671 reg numbers inline as [411.3.1.1]. UK English imperative.
    "linked_hazard_titles": string[],                 // 1-3 — short noun phrases referring to the hazards this step exposes
    "named_instruments": string[],                    // 2-5 — by model class
    "named_values": Array<{ "parameter": string; "value": string; "method": string }>,  // 1-4 quantified acceptance values
    "hold_points": string[],                          // 0-2
    "quality_checks": string[],                       // 2-3
    "acceptance_criteria": string[],                  // 2-3 quantified pass criteria
    "safety_requirements": string[],                  // 3-5 specific safety actions for THIS step
    "equipment_needed": string[],                     // 4-7 specific tools / meters
    "competence_required": string[],                  // 1-3
    "ppe_required": string[],                         // 2-4
    "bs7671_cites": string[],                         // 1-3 from BS 7671 facets only
    "safety_cites": string[],                         // 0-2
    "documentation_produced": string[],               // 1-2
    "sign_off_required": boolean,
    "estimated_duration": string,                     // realistic working-time string
    "risk_level": "low" | "medium" | "high",
    "stop_work_triggers": string[]                    // 0-2
  }>,
  "toolsRequired": string[],                          // 10-18 items — aggregated across all steps, deduplicated, with named models where appropriate
  "materialsRequired": string[],                      // 8-16 items — aggregated, with named sizes / ratings (e.g. "6491X 2.5 mm² single core 6491X cable, blue and brown")
  "practicalTips": string[],                          // 5-8 items — field-tested wisdom: shortcuts, sequencing, what-not-to-skip
  "commonMistakes": string[],                         // 5-8 items — known failure modes / things first-pass installers miss
  "totalEstimatedTime": string,
  "difficultyLevel": "basic" | "intermediate" | "advanced",
  "complianceRegulations": string[],                  // 6-10 BS 7671 cite strings from the facets block
  "complianceWarnings": string[],                     // 3-5 plain warnings about non-compliance consequences
  "requiredQualifications": string[],                 // 2-4 items
  "handover_artifacts": string[],                     // 4-8 — final documents produced at handover (EIC, EICR if applicable, building regs notification, O&M manual, as-installed drawings, test certificates, COC)
  "verification_strategy": {
    "dead_tests": string[],                           // 3-6 named dead tests with target values
    "live_tests": string[],                           // 3-6 named live tests with target values
    "functional_tests": string[]                      // 2-5 functional checks (RCD button operation, MCB trip, switching, lighting circuits)
  }
}

Hard rules:
- DO NOT emit a separate "steps" field. Only produce "method_steps". The server derives the legacy steps array from method_steps.
- MINIMUM 14 steps, MAXIMUM 18 steps in method_steps.
- Steps must be SEQUENTIAL and operationally meaningful. Always include in this order where applicable: (1) Site setup / induction / risk-assessment review with operatives, (2) Safe isolation and prove dead per GS38, (3) Existing-installation visual inspection / dead testing, then the installation work itself in physical order, then (n-2) Re-energisation and live testing, (n-1) Functional verification + completion certificate, (n) Handover, documentation, demobilisation.
- Each step's description MUST be 150-220 words. Name instruments, named values, expected results. Include at least one BS 7671 inline cite per step where applicable, sourced ONLY from the BS 7671 facets block below.
- BS 7671 cites in description, method_steps[].bs7671_cites and complianceRegulations MUST appear in the BS 7671 facets block. Do not invent.
- Use practical_work facets for procedural realism (tools, equipment, common mistakes).
- Equipment lists must be specific (e.g. "Megger MFT1741 multifunction tester", not "multimeter").
- estimated_duration must be a realistic working-time string (15-min increments).
- risk_level must reflect the step's intrinsic hazard — energised testing = high, dead testing = low.
- named_values entries MUST be quantified with units and the measurement method.
- linked_hazard_titles should mirror the hazard names a Senior H&S Practitioner would generate for the SAME brief.
- UK terminology only ("consumer unit" not "panel", "RCD" not "GFCI", "earth" not "ground").`;

  const userBlock = [
    `# Project info`,
    `Project: ${pi.projectName ?? '(not provided)'}`,
    `Location: ${pi.location ?? '(not provided)'}`,
    `Contractor: ${pi.contractor ?? '(not provided)'}`,
    `Supervisor: ${pi.supervisor ?? '(not provided)'}`,
    `Work type: ${workType}`,
    ``,
    `# Brief from the customer`,
    job.job_description ?? '',
    `\n# BS 7671 facets — use ONLY these for electrical reg cites`,
    formatFacetsForPrompt(bs7671Facets),
    `\n# Practical work facets (procedural patterns, tool patterns, common failures)`,
    formatPracticalWorkForPrompt(practical),
    visionContext
      ? `\n# Site photos — operatives can SEE these conditions on arrival; reflect them in step inputs / safety requirements\n${visionContext}`
      : '',
    `\n# Today's date`,
    new Date().toISOString().split('T')[0],
  ]
    .filter(Boolean)
    .join('\n');

  // Stream the Method response and tick the `steps` partial up as each
  // step completes in the running buffer.
  const extractor = makeIncrementalArrayExtractor('method_steps');
  let liveCount = 0;
  let lastWritten = 0;
  let text = '';
  let finishReason: string | null = null;
  try {
    const result = await streamOpenAIChat({
      apiKey,
      body: {
        model: MODEL,
        max_completion_tokens: MAX_COMPLETION_TOKENS,
        response_format: { type: 'json_object' },
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: userBlock },
        ],
      },
      onContent: async (delta) => {
        const found = extractor.push(delta);
        if (found.length) {
          liveCount += found.length;
          if (liveCount - lastWritten >= 1) {
            await writePartial(supabase, jobId, 'steps', {
              count: liveCount,
              v2Count: liveCount,
              streaming: true,
            });
            lastWritten = liveCount;
          }
        }
      },
    });
    text = result.text;
    finishReason = result.finishReason;
  } catch (err) {
    throw new Error(`OpenAI (Method) stream failed: ${(err as Error).message}`);
  }

  let parsed: any;
  try {
    parsed = parseLenient(text);
    if (finishReason === 'length') {
      console.warn('[rams-core] Method response truncated — used JSON repair to recover.');
    }
  } catch (err) {
    console.error(
      '[rams-core] Method parse failed:',
      err,
      'finish_reason:',
      finishReason,
      'text:',
      text.slice(0, 400)
    );
    throw new Error('Method agent returned malformed JSON');
  }

  // Stamp project info back from input.
  parsed.location = pi.location ?? parsed.location ?? '';
  parsed.contractor = pi.contractor ?? '';
  parsed.supervisor = pi.supervisor ?? '';
  parsed.siteManagerName = pi.siteManagerName ?? '';
  parsed.siteManagerPhone = pi.siteManagerPhone ?? '';
  parsed.firstAiderName = pi.firstAiderName ?? '';
  parsed.firstAiderPhone = pi.firstAiderPhone ?? '';
  parsed.safetyOfficerName = pi.safetyOfficerName ?? '';
  parsed.safetyOfficerPhone = pi.safetyOfficerPhone ?? '';
  parsed.assemblyPoint = pi.assemblyPoint ?? '';
  parsed.workType = workType;
  parsed.reviewDate = parsed.reviewDate ?? sixMonthsFromToday();
  parsed.createdAt = new Date().toISOString();
  parsed.updatedAt = new Date().toISOString();
  parsed.agentMetadata = {
    healthSafetyVersion: 'rams-core-1.0',
    installerVersion: 'rams-core-1.0',
    generatedAt: new Date().toISOString(),
    aiModel: MODEL,
  };

  // v2 method_steps — normalise + derive legacy steps[] from it (single source of truth).
  if (Array.isArray(parsed.method_steps)) {
    parsed.method_steps = parsed.method_steps.map((ms: any, i: number) => {
      const id = ms.id ?? `step-${i + 1}`;
      const stepNumber = ms.stepNumber ?? i + 1;
      return {
        ...ms,
        id,
        stepNumber,
        title: ms.title ?? `Step ${stepNumber}`,
        description: ms.description ?? '',
        phase: ms.phase ?? 'Installation',
        objective: ms.objective ?? '',
        linked_hazard_titles: Array.isArray(ms.linked_hazard_titles) ? ms.linked_hazard_titles : [],
        named_instruments: Array.isArray(ms.named_instruments) ? ms.named_instruments : [],
        named_values: Array.isArray(ms.named_values) ? ms.named_values : [],
        hold_points: Array.isArray(ms.hold_points) ? ms.hold_points : [],
        quality_checks: Array.isArray(ms.quality_checks) ? ms.quality_checks : [],
        acceptance_criteria: Array.isArray(ms.acceptance_criteria) ? ms.acceptance_criteria : [],
        safety_requirements: Array.isArray(ms.safety_requirements) ? ms.safety_requirements : [],
        equipment_needed: Array.isArray(ms.equipment_needed) ? ms.equipment_needed : [],
        competence_required: Array.isArray(ms.competence_required) ? ms.competence_required : [],
        ppe_required: Array.isArray(ms.ppe_required) ? ms.ppe_required : [],
        bs7671_cites: Array.isArray(ms.bs7671_cites) ? ms.bs7671_cites : [],
        safety_cites: Array.isArray(ms.safety_cites) ? ms.safety_cites : [],
        documentation_produced: Array.isArray(ms.documentation_produced)
          ? ms.documentation_produced
          : [],
        sign_off_required: ms.sign_off_required === true,
        estimated_duration: ms.estimated_duration ?? '30 minutes',
        risk_level: ms.risk_level ?? 'medium',
        stop_work_triggers: Array.isArray(ms.stop_work_triggers) ? ms.stop_work_triggers : [],
      };
    });

    // Derive legacy steps[] from method_steps[] for back-compat (renderer + PDF).
    parsed.steps = parsed.method_steps.map((ms: any) => ({
      id: ms.id,
      stepNumber: ms.stepNumber,
      title: ms.title,
      description: ms.description,
      safetyRequirements: ms.safety_requirements,
      equipmentNeeded: ms.equipment_needed,
      qualifications: ms.competence_required,
      estimatedDuration: ms.estimated_duration,
      riskLevel: ms.risk_level,
    }));
  }

  // Version stamp.
  parsed.version = 2;

  await writePartial(supabase, jobId, 'steps', {
    count: parsed.steps?.length ?? 0,
    v2Count: parsed.method_steps?.length ?? 0,
    totalEstimatedTime: parsed.totalEstimatedTime ?? null,
    difficultyLevel: parsed.difficultyLevel ?? null,
    sequenceSummary: parsed.sequence_summary ?? [],
  });
  await writePartial(supabase, jobId, 'tools', {
    count: parsed.toolsRequired?.length ?? 0,
  });
  await writePartial(supabase, jobId, 'materials', {
    count: parsed.materialsRequired?.length ?? 0,
  });
  await writePartial(supabase, jobId, 'tips', {
    count: parsed.practicalTips?.length ?? 0,
  });
  await writePartial(supabase, jobId, 'mistakes', {
    count: parsed.commonMistakes?.length ?? 0,
  });

  return parsed;
}

function sixMonthsFromToday(): string {
  const d = new Date();
  d.setMonth(d.getMonth() + 6);
  return d.toISOString().split('T')[0];
}

/**
 * Fuzzy-map each method step's linked_hazard_titles to risk IDs from the H&S
 * agent output. Both agents ran in parallel against the same brief so titles
 * usually overlap thematically; we score by shared keywords.
 */
function mapMethodStepsToHazards(methodData: any, ramsData: any): void {
  const risks: any[] = Array.isArray(ramsData?.risks) ? ramsData.risks : [];
  if (!risks.length || !Array.isArray(methodData?.method_steps)) return;

  const STOPWORDS = new Set([
    'the',
    'a',
    'an',
    'of',
    'and',
    'or',
    'to',
    'from',
    'in',
    'on',
    'at',
    'with',
    'for',
    'by',
    'as',
    'is',
    'are',
    'be',
    'risk',
    'hazard',
    'work',
    'working',
  ]);

  const tokenise = (s: string): Set<string> => {
    return new Set(
      String(s ?? '')
        .toLowerCase()
        .replace(/[^a-z0-9 ]+/g, ' ')
        .split(/\s+/)
        .filter((t) => t.length > 2 && !STOPWORDS.has(t))
    );
  };

  const riskTokens = risks.map((r) => ({
    id: r.id,
    hazard: r.hazard,
    tokens: tokenise(`${r.hazard ?? ''} ${r.risk ?? ''}`),
  }));

  for (const step of methodData.method_steps) {
    const titles: string[] = Array.isArray(step.linked_hazard_titles)
      ? step.linked_hazard_titles
      : [];
    const mappedIds: string[] = [];
    for (const title of titles) {
      const tt = tokenise(title);
      let best: { id: string; score: number } | null = null;
      for (const r of riskTokens) {
        let score = 0;
        for (const tok of tt) if (r.tokens.has(tok)) score++;
        if (!best || score > best.score) best = { id: r.id, score };
      }
      if (best && best.score > 0 && !mappedIds.includes(best.id)) {
        mappedIds.push(best.id);
      }
    }
    step.linked_hazard_ids = mappedIds;
  }
}
