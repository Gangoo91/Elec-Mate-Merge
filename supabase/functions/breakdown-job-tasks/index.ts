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

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

const CHAT_MODEL = 'gpt-5.4-mini-2026-03-17';

const SYSTEM_PROMPT = `You are a UK electrical contracting planner. Break a job description into a practical, ordered ticket list a small firm would actually run on site.

Rules:
- UK electrical terminology (first fix, second fix, consumer unit, EICR, RCBO, containment, making good).
- 4-12 tasks. Each independently completable and verifiable.
- Sequence respects real dependencies (isolation/safe-working first, first fix before second fix, testing & certification last).
- Include testing/certification and snagging/handover tasks where the work implies them.
- priority: Urgent only for safety-critical items; High for path-critical; Medium default; Low for cosmetic.
- suggested_role: one of "Supervisor", "Operative", "Apprentice" — match task complexity.
- Keep titles under 60 characters, descriptions 1-2 sentences of practical detail.`;

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

    const { description, jobTitle } = await req.json();
    if (!description || String(description).trim().length < 10) {
      return new Response(JSON.stringify({ error: 'Describe the job in a sentence or two' }), {
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    const apiKey = Deno.env.get('OPENAI_API_KEY');
    if (!apiKey) throw new Error('OPENAI_API_KEY missing');

    const userPrompt = `Job${jobTitle ? ` "${jobTitle}"` : ''}:\n${String(description).slice(0, 2000)}`;

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
