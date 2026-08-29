import { serve } from '../_shared/deps.ts';
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';
import { Resend } from '../_shared/mailer.ts';

/** Who receives the weekly AI-feedback digest. */
const DIGEST_RECIPIENT = 'andrewgangoo91@gmail.com';
import { captureException } from '../_shared/sentry.ts';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers':
    'authorization, x-client-info, apikey, content-type, x-supabase-timeout, x-request-id',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    console.log('[analyze-feedback] Starting weekly feedback analysis...');

    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    const openAIApiKey = Deno.env.get('OPENAI_API_KEY')!;

    const supabase = createClient(supabaseUrl, supabaseKey);

    // Get negative feedback from past 7 days
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

    const { data: negativeFeedback, error: fetchError } = await supabase
      .from('ai_interaction_feedback')
      .select('*')
      .eq('user_rating', -1)
      .gte('created_at', sevenDaysAgo.toISOString())
      .order('created_at', { ascending: false });

    if (fetchError) throw fetchError;

    // Elec-AI chat feedback lives in its own table (elec_ai_feedback — the
    // chat's votes never fit this table's v3-agent CHECK constraints). Map its
    // negatives into the same shape; the one-tap reasons stand in for
    // user_correction, which is exactly the diagnosable detail the analysis
    // prompt wants.
    const { data: elecAiNegative, error: elecErr } = await supabase
      .from('elec_ai_feedback')
      .select('*')
      .eq('rating', 'negative')
      .gte('created_at', sevenDaysAgo.toISOString())
      .order('created_at', { ascending: false });
    if (elecErr) throw elecErr;

    const allNegative = [
      ...(negativeFeedback || []),
      ...(elecAiNegative || []).map((r) => ({
        // Not an ai_interaction_feedback id — learning_review_queue.feedback_id
        // has an FK to that table, so these rows must carry null.
        id: null,
        agent_name: r.agent,
        question: r.question,
        ai_response: r.answer,
        user_correction:
          [
            (r.reasons || []).join(', '),
            (r.cited_regulations || []).length
              ? `cited: ${r.cited_regulations.join(', ')}`
              : '',
          ]
            .filter(Boolean)
            .join(' — ') || null,
      })),
    ];

    console.log(
      `[analyze-feedback] Found ${allNegative.length} negative feedback items (${elecAiNegative?.length || 0} from elec-ai)`
    );

    if (allNegative.length === 0) {
      return new Response(
        JSON.stringify({
          success: true,
          message: 'No negative feedback to analyze',
        }),
        {
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        }
      );
    }

    // Group by agent
    const feedbackByAgent = allNegative.reduce(
      (acc, item) => {
        if (!acc[item.agent_name]) acc[item.agent_name] = [];
        acc[item.agent_name].push(item);
        return acc;
      },
      {} as Record<string, any[]>
    );

    console.log(`[analyze-feedback] Grouped into ${Object.keys(feedbackByAgent).length} agents`);

    // Analyze patterns for each agent using OpenAI
    const suggestions: any[] = [];

    for (const [agentName, feedbacks] of Object.entries(feedbackByAgent)) {
      if (feedbacks.length < 2) continue; // Skip if less than 2 issues

      const feedbackSummary = feedbacks.map((f) => ({
        question: f.question,
        response: f.ai_response.substring(0, 500), // First 500 chars
        correction: f.user_correction,
      }));

      const response = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${openAIApiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model: 'gpt-5.4-mini-2026-03-17',
          max_completion_tokens: 1000,
          messages: [
            {
              role: 'system',
              content: `You are a quality assurance analyst reviewing user feedback for an AI electrical installation planner. Identify patterns in negative feedback and suggest knowledge base improvements.

Your task:
1. Identify common failure patterns
2. Suggest specific knowledge entries to add to prevent these errors
3. Format as JSON: { "patterns": ["pattern1", "pattern2"], "suggestedKnowledge": { "topic": "...", "content": "...", "source": "..." } }`,
            },
            {
              role: 'user',
              content: `Agent: ${agentName}\n\nNegative Feedback (${feedbacks.length} items):\n${JSON.stringify(feedbackSummary, null, 2)}\n\nAnalyze patterns and suggest improvements.`,
            },
          ],
        }),
      });

      if (!response.ok) {
        console.error(`[analyze-feedback] OpenAI error for ${agentName}:`, await response.text());
        continue;
      }

      const data = await response.json();
      const analysis = JSON.parse(data.choices[0].message.content);

      // Insert into review queue
      const { error: insertError } = await supabase.from('learning_review_queue').insert({
        feedback_id: feedbacks[0].id, // Link to first feedback
        issue_type: 'pattern',
        agent_name: agentName,
        ai_answer: feedbacks[0].ai_response.substring(0, 1000),
        user_correction: feedbacks.map((f) => f.user_correction).join(' | '),
        pattern_frequency: feedbacks.length,
        suggested_knowledge_update: analysis.suggestedKnowledge,
        suggested_prompt_change: analysis.patterns.join('; '),
        status: 'pending',
      });

      if (insertError) {
        console.error(
          `[analyze-feedback] Error inserting suggestion for ${agentName}:`,
          insertError
        );
      } else {
        suggestions.push({ agent: agentName, patterns: analysis.patterns });
      }
    }

    console.log(`[analyze-feedback] Created ${suggestions.length} learning suggestions`);

    // Weekly digest to a human — the review queue had no reader, so patterns
    // were landing in a table nobody opened. Sent whenever the week had ANY
    // negative feedback (including single complaints below the ≥2 pattern
    // threshold); quiet weeks send nothing.
    try {
      const apiKey = Deno.env.get('RESEND_API_KEY'); // holds the Brevo key
      if (apiKey) {
        const byAgent = new Map<string, typeof allNegative>();
        for (const f of allNegative) {
          const list = byAgent.get(f.agent_name) ?? [];
          list.push(f);
          byAgent.set(f.agent_name, list);
        }
        const esc = (s: string) =>
          s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
        const agentBlocks = [...byAgent.entries()]
          .map(([agent, items]) => {
            const patterns = suggestions.find((s) => s.agent === agent)?.patterns as
              | string[]
              | undefined;
            const rows = items
              .slice(0, 5)
              .map(
                (f) =>
                  `<li style="margin-bottom:6px"><strong>Q:</strong> ${esc(
                    (f.question || '').slice(0, 160)
                  )}${f.user_correction ? `<br/><em>${esc(f.user_correction.slice(0, 160))}</em>` : ''}</li>`
              )
              .join('');
            return `<h3 style="margin:16px 0 4px">${esc(agent)} — ${items.length} negative</h3>${
              patterns
                ? `<p style="margin:4px 0"><strong>Patterns:</strong> ${esc(patterns.join('; '))}</p>`
                : `<p style="margin:4px 0">Below the 2-per-week pattern threshold — raw items below.</p>`
            }<ul style="margin:4px 0 0;padding-left:18px">${rows}</ul>`;
          })
          .join('');

        const resend = new Resend(apiKey);
        const { error: mailError } = await resend.emails.send({
          from: 'Elec-Mate <founder@elec-mate.com>',
          to: DIGEST_RECIPIENT,
          subject: `Elec-AI feedback: ${allNegative.length} negative this week, ${suggestions.length} pattern${suggestions.length === 1 ? '' : 's'}`,
          html: `<div style="font-family:sans-serif;max-width:600px">
            <h2 style="margin:0 0 8px">Weekly AI feedback digest</h2>
            <p style="margin:0 0 12px">${allNegative.length} negative rating${allNegative.length === 1 ? '' : 's'} in the last 7 days across ${byAgent.size} agent${byAgent.size === 1 ? '' : 's'}. Full detail in <code>learning_review_queue</code> / <code>elec_ai_feedback</code>.</p>
            ${agentBlocks}
          </div>`,
        });
        if (mailError) {
          console.error('[analyze-feedback] digest email failed:', mailError);
        } else {
          console.log('[analyze-feedback] digest email sent');
        }
      } else {
        console.warn('[analyze-feedback] RESEND_API_KEY not set — digest skipped');
      }
    } catch (mailErr) {
      // The analysis result must never fail because the digest did.
      console.error('[analyze-feedback] digest email threw:', mailErr);
    }

    return new Response(
      JSON.stringify({
        success: true,
        analyzedFeedback: allNegative.length,
        suggestionsCreated: suggestions.length,
        suggestions,
      }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );
  } catch (error) {
    await captureException(error, { functionName: 'analyze-feedback', requestUrl: req.url, requestMethod: req.method });
    console.error('[analyze-feedback] Error:', error);
    return new Response(
      JSON.stringify({
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error',
      }),
      {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );
  }
});
