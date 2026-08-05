/**
 * breakdown-job-tasks (ELE-1073)
 *
 * The employer describes a job in plain English; this returns a proposed
 * ticket list (title, description, priority, suggested role, sequence).
 * NO database writes — the employer reviews and creates the tasks client
 * side. AI proposes, boss disposes.
 */

import { serve } from 'https://deno.land/std@0.168.0/http/server.ts';
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.49.4';
import { generateLargeEmbedding } from '../_shared/ai-providers.ts';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type, x-supabase-timeout, x-request-id',
};

const CHAT_MODEL = 'gpt-5.4-mini-2026-03-17';

const SYSTEM_PROMPT = `You are a UK electrical contracting planner. Break a job description into a practical, ordered ticket list a small firm would actually run on site.

Rules:
- UK electrical terminology (first fix, second fix, consumer unit, EICR, RCBO, containment, making good).
- 4-12 tasks. Each independently completable and verifiable.
- Sequence respects real dependencies (isolation/safe-working first, first fix before second fix, testing & certification last).
- Plan THIS job, not a generic one of its type. When job context is supplied (customer, site, dates, existing tasks), let it shape the plan: reference the actual site conditions, respect the dates, and NEVER propose a task that duplicates one already listed as planned.
- Include testing/certification and snagging/handover tasks where the work implies them.
- priority: Urgent only for safety-critical items; High for path-critical; Medium default; Low for cosmetic.
- suggested_role: one of "Supervisor", "Operative", "Apprentice" — match task complexity.
- Keep titles under 60 characters. Descriptions are ONE sentence — the specific thing that matters on this job, not a restatement of the title. No preamble.
- Ground the technical content in the extracts supplied below. Three sources are given: BS 7671 / OSG / GN3 for what is required (testing sequence, inspection, certification); Practical Work Intelligence for how the work is carried out on site (method, commissioning steps, common pitfalls); and Employer Knowledge for the duties around the work (CDM 2015, HSE guidance, notification). Use all three — the standards decide what must happen, the practical extracts shape the steps, and the employer extracts catch the obligations a task list forgets.
- You may cite a regulation number ONLY when it appears verbatim in the supplied extracts. Never produce one from memory: an invented reference sitting in someone's task list reads as authoritative, and this has caused real problems. With no relevant extract, name the standard in general terms instead — "test and certify to BS 7671", "notify under Part P".`;

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    // Authenticated callers only
    const authHeader = req.headers.get('Authorization');
    if (!authHeader) {
      return new Response(JSON.stringify({ error: 'Not authenticated' }), {
        status: 401,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }
    const supabase = createClient(
      Deno.env.get('SUPABASE_URL')!,
      Deno.env.get('SUPABASE_ANON_KEY')!,
      { global: { headers: { Authorization: authHeader } } }
    );
    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser();
    if (authError || !user) {
      return new Response(JSON.stringify({ error: 'Not authenticated' }), {
        status: 401,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    // Throttle: 20 breakdowns per user per hour (cost guard)
    const admin = createClient(
      Deno.env.get('SUPABASE_URL')!,
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!
    );
    const hourAgo = new Date(Date.now() - 60 * 60 * 1000).toISOString();
    const { count: recentCalls } = await admin
      .from('ai_usage_log')
      .select('id', { count: 'exact', head: true })
      .eq('user_id', user.id)
      .eq('fn_name', 'breakdown-job-tasks')
      .gte('called_at', hourAgo);
    if ((recentCalls ?? 0) >= 20) {
      return new Response(JSON.stringify({ error: 'Slow down — try again in a little while' }), {
        status: 429,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }
    await admin.from('ai_usage_log').insert({ user_id: user.id, fn_name: 'breakdown-job-tasks' });

    const { description, jobTitle, jobContext } = await req.json();
    if (!description || String(description).trim().length < 10) {
      return new Response(JSON.stringify({ error: 'Describe the job in a sentence or two' }), {
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    const apiKey = Deno.env.get('OPENAI_API_KEY');
    if (!apiKey) throw new Error('OPENAI_API_KEY missing');

    // Ground the plan in the standards corpus (BS 7671 + OSG + GN3, A4:2026).
    // Retrieval is best-effort by design — every branch catches its own
    // failure and returns a placeholder, so a RAG outage degrades the plan to
    // ungrounded rather than failing the request. The citation rule above
    // means no extracts simply means no regulation numbers get cited.
    const jobQuery = `${jobTitle ? jobTitle + ' — ' : ''}${String(description).slice(0, 500)}`;

    // ── Grounding ────────────────────────────────────────────────────────
    // ONE embedding, three retrievals.
    //
    // Each helper generates its own embedding internally, so going through
    // them meant three identical round-trips to the embedding endpoint for
    // the same sentence — the single largest avoidable cost in this request.
    // The RPCs are called directly instead with a shared vector.
    let sharedEmbedding: number[] | null = null;
    try {
      sharedEmbedding = await generateLargeEmbedding(jobQuery, apiKey);
    } catch (err) {
      console.warn('[breakdown-job-tasks] embedding failed, keyword-only grounding:', err);
    }

    const fmt = (rows: Record<string, unknown>[], label: (r: Record<string, unknown>) => string) =>
      rows
        .map((r, i) => `${i + 1}. [${label(r)}] ${String(r.content ?? '').replace(/\s+/g, ' ').slice(0, 400)}`)
        .join('\n');

    const [facetBlock, practicalBlock, employerBlock] = await Promise.all([
      // What is required — BS 7671 / OSG / GN3.
      admin
        .rpc('search_bs7671_v3', {
          query_embedding: sharedEmbedding,
          query_text: `${jobQuery} inspection testing certification requirements`,
          match_count: 8,
        })
        .then(({ data, error }: { data: Record<string, unknown>[] | null; error: unknown }) => {
          if (error || !data?.length) return '[no BS 7671 extracts matched]';
          return fmt(data, (r) => (r.reg_number ? `Reg ${r.reg_number}` : String(r.document_type ?? 'BS 7671')));
        })
        .catch(() => '[no BS 7671 extracts matched]'),

      // How the work is done — Practical Work Intelligence. Its keyword side
      // AND-matches, so recall here depends on the vector; unpadded query.
      admin
        .rpc('search_practical_work_v2', {
          p_query_text: jobQuery,
          p_query_embedding: sharedEmbedding,
          p_match_count: 6,
        })
        .then(({ data, error }: { data: Record<string, unknown>[] | null; error: unknown }) => {
          if (error || !data?.length) return '[no practical work extracts matched]';
          return data
            .map((r, i) => {
              const bits = [
                r.primary_topic ? String(r.primary_topic) : 'Practical guidance',
                r.typical_duration_minutes ? `~${r.typical_duration_minutes} min` : null,
                Array.isArray(r.tools_required) && r.tools_required.length
                  ? `tools: ${(r.tools_required as string[]).slice(0, 4).join(', ')}`
                  : null,
              ].filter(Boolean);
              return `${i + 1}. [${bits.join(' · ')}]`;
            })
            .join('\n');
        })
        .catch(() => '[no practical work extracts matched]'),

      // Duties around the work — Employer Knowledge, health-safety only. The
      // corpus also holds HR, tendering and costing; pulling ACAS grievance
      // procedure into an EV charger plan would be worse than no grounding.
      sharedEmbedding
        ? admin
            .rpc('search_employer_knowledge', {
              query_embedding: sharedEmbedding,
              query_text: jobQuery,
              match_count: 4,
              filter_domain: 'health-safety',
            })
            .then(({ data, error }: { data: Record<string, unknown>[] | null; error: unknown }) => {
              if (error || !data?.length) return '[no employer extracts matched]';
              return fmt(data, (r) => String(r.topic ?? 'health & safety'));
            })
            .catch(() => '[no employer extracts matched]')
        : Promise.resolve('[no employer extracts matched]'),
    ]);

    const userPrompt = `Job${jobTitle ? ` "${jobTitle}"` : ''}:\n${String(description).slice(0, 2000)}\n\nBS 7671 / OSG / GN3 — what is required (cite regulation numbers only from these):\n${facetBlock}\n\nPractical Work Intelligence — how the work is done on site:\n${practicalBlock}\n\nEmployer Knowledge (CDM 2015, HSE) — duties and notifications around the work:\n${employerBlock}`;

    const oaResp = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: { Authorization: `Bearer ${apiKey}`, 'content-type': 'application/json' },
      body: JSON.stringify({
        model: CHAT_MODEL,
        messages: [
          { role: 'system', content: SYSTEM_PROMPT },
          { role: 'user', content: userPrompt },
        ],
        max_completion_tokens: 2000,
        tools: [
          {
            type: 'function',
            function: {
              name: 'propose_tasks',
              description: 'Return the proposed ticket list for the job',
              parameters: {
                type: 'object',
                properties: {
                  tasks: {
                    type: 'array',
                    items: {
                      type: 'object',
                      properties: {
                        title: { type: 'string' },
                        description: { type: 'string' },
                        priority: { type: 'string', enum: ['Low', 'Medium', 'High', 'Urgent'] },
                        suggested_role: {
                          type: 'string',
                          enum: ['Supervisor', 'Operative', 'Apprentice'],
                        },
                      },
                      required: ['title', 'description', 'priority', 'suggested_role'],
                    },
                  },
                },
                required: ['tasks'],
              },
            },
          },
        ],
        tool_choice: { type: 'function', function: { name: 'propose_tasks' } },
      }),
    });

    if (!oaResp.ok) {
      const detail = await oaResp.text();
      console.error('OpenAI error:', detail.slice(0, 400));
      throw new Error('Task breakdown failed — try again');
    }

    const completion = await oaResp.json();
    const call = completion.choices?.[0]?.message?.tool_calls?.[0];
    if (!call) throw new Error('No proposal returned — try a fuller description');

    const parsed = JSON.parse(call.function.arguments);
    const tasks = (parsed.tasks || []).slice(0, 15);

    return new Response(JSON.stringify({ tasks }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('breakdown-job-tasks error:', error);
    return new Response(
      JSON.stringify({ error: error instanceof Error ? error.message : 'Unknown error' }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});
