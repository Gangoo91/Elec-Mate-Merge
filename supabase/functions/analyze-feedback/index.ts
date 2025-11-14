import { serve } from '../_shared/deps.ts';
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
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

    console.log(`[analyze-feedback] Found ${negativeFeedback?.length || 0} negative feedback items`);

    if (!negativeFeedback || negativeFeedback.length === 0) {
      return new Response(JSON.stringify({
        success: true,
        message: 'No negative feedback to analyze'
      }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      });
    }

    // Group by agent
    const feedbackByAgent = negativeFeedback.reduce((acc, item) => {
      if (!acc[item.agent_name]) acc[item.agent_name] = [];
      acc[item.agent_name].push(item);
      return acc;
    }, {} as Record<string, any[]>);

    console.log(`[analyze-feedback] Grouped into ${Object.keys(feedbackByAgent).length} agents`);

    // Analyze patterns for each agent using OpenAI
    const suggestions: any[] = [];

    for (const [agentName, feedbacks] of Object.entries(feedbackByAgent)) {
      if (feedbacks.length < 2) continue; // Skip if less than 2 issues

      const feedbackSummary = feedbacks.map(f => ({
        question: f.question,
        response: f.ai_response.substring(0, 500), // First 500 chars
        correction: f.user_correction
      }));

      const response = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${openAIApiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model: 'gpt-5-mini-2025-08-07',
          max_completion_tokens: 1000,
          messages: [
            {
              role: 'system',
              content: `You are a quality assurance analyst reviewing user feedback for an AI electrical installation planner. Identify patterns in negative feedback and suggest knowledge base improvements.

Your task:
1. Identify common failure patterns
2. Suggest specific knowledge entries to add to prevent these errors
3. Format as JSON: { "patterns": ["pattern1", "pattern2"], "suggestedKnowledge": { "topic": "...", "content": "...", "source": "..." } }`
            },
            {
              role: 'user',
              content: `Agent: ${agentName}\n\nNegative Feedback (${feedbacks.length} items):\n${JSON.stringify(feedbackSummary, null, 2)}\n\nAnalyze patterns and suggest improvements.`
            }
          ]
        }),
      });

      if (!response.ok) {
        console.error(`[analyze-feedback] OpenAI error for ${agentName}:`, await response.text());
        continue;
      }

      const data = await response.json();
      const analysis = JSON.parse(data.choices[0].message.content);

      // Insert into review queue
      const { error: insertError } = await supabase
        .from('learning_review_queue')
        .insert({
          feedback_id: feedbacks[0].id, // Link to first feedback
          issue_type: 'pattern',
          agent_name: agentName,
          ai_answer: feedbacks[0].ai_response.substring(0, 1000),
          user_correction: feedbacks.map(f => f.user_correction).join(' | '),
          pattern_frequency: feedbacks.length,
          suggested_knowledge_update: analysis.suggestedKnowledge,
          suggested_prompt_change: analysis.patterns.join('; '),
          status: 'pending'
        });

      if (insertError) {
        console.error(`[analyze-feedback] Error inserting suggestion for ${agentName}:`, insertError);
      } else {
        suggestions.push({ agent: agentName, patterns: analysis.patterns });
      }
    }

    console.log(`[analyze-feedback] Created ${suggestions.length} learning suggestions`);

    return new Response(JSON.stringify({
      success: true,
      analyzedFeedback: negativeFeedback.length,
      suggestionsCreated: suggestions.length,
      suggestions
    }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' }
    });

  } catch (error) {
    console.error('[analyze-feedback] Error:', error);
    return new Response(JSON.stringify({
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error'
    }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' }
    });
  }
});
