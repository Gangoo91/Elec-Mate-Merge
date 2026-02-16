/**
 * review-portfolio-submission — AI Portfolio Review
 *
 * Analyses an entire portfolio submission against qualification criteria
 * using RAG context from qualification_requirements.
 *
 * Model: gpt-5-mini-2025-08-07 via tool calling for structured JSON output.
 */

import { serve, createClient, corsHeaders } from '../_shared/deps.ts';

// ---------- Tool schema for structured review output ----------
const reviewTool = {
  type: 'function' as const,
  function: {
    name: 'portfolio_review_result',
    description:
      'Structured review of a portfolio submission against qualification assessment criteria',
    parameters: {
      type: 'object',
      properties: {
        grade_suggestion: {
          type: 'string',
          enum: ['distinction', 'merit', 'pass', 'refer', 'not_yet_competent'],
          description: 'Suggested grade for this submission',
        },
        grade_justification: {
          type: 'string',
          description: '2-3 sentences explaining the grade suggestion',
        },
        criteria_analysis: {
          type: 'array',
          items: {
            type: 'object',
            properties: {
              ac_ref: { type: 'string', description: 'Assessment criterion reference code' },
              status: {
                type: 'string',
                enum: ['met', 'partially_met', 'not_met'],
              },
              evidence_item_ids: {
                type: 'array',
                items: { type: 'string' },
                description: 'IDs of portfolio items that address this criterion',
              },
              reasoning: { type: 'string' },
            },
            required: ['ac_ref', 'status', 'evidence_item_ids', 'reasoning'],
          },
          description: 'Analysis of each assessment criterion',
        },
        gaps: {
          type: 'array',
          items: {
            type: 'object',
            properties: {
              ac_ref: { type: 'string' },
              what_is_missing: { type: 'string' },
              suggestion: { type: 'string' },
            },
            required: ['ac_ref', 'what_is_missing', 'suggestion'],
          },
          description: 'Criteria that are not fully met, with guidance',
        },
        strengths: {
          type: 'array',
          items: { type: 'string' },
          description: '3-5 key strengths of the submission',
        },
        improvements: {
          type: 'array',
          items: { type: 'string' },
          description: '3-5 areas for improvement',
        },
        draft_feedback: {
          type: 'string',
          description:
            'Complete draft assessor feedback (2-4 paragraphs) ready for the tutor to review and send',
        },
        quality: {
          type: 'object',
          properties: {
            evidence_range: {
              type: 'string',
              enum: ['excellent', 'good', 'adequate', 'insufficient'],
            },
            reflection_quality: {
              type: 'string',
              enum: ['excellent', 'good', 'adequate', 'insufficient'],
            },
            technical_depth: {
              type: 'string',
              enum: ['excellent', 'good', 'adequate', 'insufficient'],
            },
          },
          required: ['evidence_range', 'reflection_quality', 'technical_depth'],
          description: 'Quality assessment across three dimensions',
        },
      },
      required: [
        'grade_suggestion',
        'grade_justification',
        'criteria_analysis',
        'gaps',
        'strengths',
        'improvements',
        'draft_feedback',
        'quality',
      ],
    },
  },
};

serve(async (req: Request) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  const startTime = Date.now();

  try {
    console.log('[review-portfolio-submission] Starting review...');

    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    const openAIApiKey = Deno.env.get('OPENAI_API_KEY');

    if (!openAIApiKey) {
      console.error('[review-portfolio-submission] OPENAI_API_KEY not set');
      return new Response(
        JSON.stringify({ success: false, error: 'OpenAI API key not configured' }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Authenticate user
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

    console.log('[review-portfolio-submission] Auth passed for user:', user.id);

    const body = await req.json();
    const {
      submission_id,
      category_id,
      qualification_id,
      portfolio_items,
    }: {
      submission_id: string;
      category_id: string;
      qualification_id: string;
      portfolio_items: Array<{
        id: string;
        title: string;
        description: string;
        skills_demonstrated: string[];
        reflection_notes: string;
        assessment_criteria_met: string[];
        evidence_files: Array<{ url: string; type: string; name: string }>;
      }>;
    } = body;

    if (!submission_id || !category_id || !qualification_id) {
      return new Response(
        JSON.stringify({
          success: false,
          error: 'submission_id, category_id and qualification_id are required',
        }),
        {
          status: 400,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        }
      );
    }

    // ---------- RAG: Get qualification requirements ----------
    let ragContext = '';

    try {
      // Get all requirements for this qualification + category
      const { data: requirements } = await supabase
        .from('qualification_requirements')
        .select('*')
        .eq('qualification_id', qualification_id)
        .eq('category_id', category_id)
        .order('sort_order', { ascending: true });

      if (requirements && requirements.length > 0) {
        ragContext += '\n\n--- Qualification Assessment Criteria ---\n';
        for (const req of requirements) {
          ragContext += `\nLearning Outcome: ${req.learning_outcome || req.lo_ref || 'N/A'}\n`;
          if (req.assessment_criteria) {
            const criteria = Array.isArray(req.assessment_criteria)
              ? req.assessment_criteria
              : [req.assessment_criteria];
            for (const ac of criteria) {
              ragContext += `  - ${typeof ac === 'string' ? ac : `${ac.ref}: ${ac.text}`}\n`;
            }
          }
        }
      } else {
        // Fallback: try the RPC search
        const keywords = ['assessment', 'criteria', 'evidence', 'competence'];
        const { data: qualData } = await supabase.rpc('search_qualification_requirements', {
          p_keywords: keywords,
          p_qualification_code: qualification_id,
          p_limit: 20,
        });

        if (qualData && qualData.length > 0) {
          ragContext += '\n\n--- Qualification Requirements ---\n';
          for (const req of qualData) {
            ragContext += `- Unit ${req.unit_code} (${req.unit_title}): ${req.learning_outcome}\n`;
            if (req.assessment_criteria?.length) {
              ragContext += `  ACs: ${req.assessment_criteria.join('; ')}\n`;
            }
          }
        }
      }
    } catch (err) {
      console.warn('[review-portfolio-submission] RAG query failed:', err);
    }

    console.log(
      '[review-portfolio-submission] RAG context length:',
      ragContext.length,
      'Portfolio items:',
      portfolio_items?.length || 0
    );

    // ---------- Build portfolio summary for the prompt ----------
    let portfolioSummary = '\n\n--- Portfolio Submission ---\n';
    portfolioSummary += `Submission ID: ${submission_id}\n`;
    portfolioSummary += `Total items: ${portfolio_items?.length || 0}\n\n`;

    if (portfolio_items && portfolio_items.length > 0) {
      for (const item of portfolio_items) {
        portfolioSummary += `### Item: ${item.title} (ID: ${item.id})\n`;
        if (item.description) portfolioSummary += `Description: ${item.description}\n`;
        if (item.skills_demonstrated?.length > 0) {
          portfolioSummary += `Skills demonstrated: ${item.skills_demonstrated.join(', ')}\n`;
        }
        if (item.reflection_notes) {
          portfolioSummary += `Reflection: ${item.reflection_notes}\n`;
        }
        if (item.assessment_criteria_met?.length > 0) {
          portfolioSummary += `Student-linked criteria: ${item.assessment_criteria_met.join(', ')}\n`;
        }
        if (item.evidence_files?.length > 0) {
          portfolioSummary += `Evidence files: ${item.evidence_files.map((f) => `${f.name} (${f.type})`).join(', ')}\n`;
        }
        portfolioSummary += '\n';
      }
    }

    // ---------- Build system prompt ----------
    const systemPrompt = `You are an experienced UK electrical training assessor reviewing a portfolio submission from an apprentice.

You have access to the qualification assessment criteria (from RAG context) and the complete portfolio submission. Your job is to:

1. Analyse each portfolio item against the assessment criteria
2. Determine which criteria are met, partially met, or not met — with specific reasoning
3. Identify gaps where evidence is missing or insufficient
4. Assess overall quality (evidence range, reflection quality, technical depth)
5. Suggest a grade (distinction/merit/pass/refer/not_yet_competent)
6. Write comprehensive draft feedback the assessor can review and send

IMPORTANT RULES:
- Use UK English (analyse, colour, centre, programme)
- Be thorough but fair — give credit where evidence exists
- For each criterion, cite specific portfolio item IDs as evidence
- Provide actionable suggestions for gaps, not vague advice
- The draft feedback should be professional, encouraging, and constructive
- Grade according to typical BTEC/NVQ grading boundaries

${ragContext}
${portfolioSummary}`;

    // ---------- Call OpenAI ----------
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${openAIApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-5-mini-2025-08-07',
        max_completion_tokens: 8000,
        messages: [
          { role: 'system', content: systemPrompt },
          {
            role: 'user',
            content:
              'Please review this portfolio submission thoroughly. Analyse every piece of evidence against the assessment criteria and provide a complete structured review.',
          },
        ],
        tools: [reviewTool],
        tool_choice: {
          type: 'function',
          function: { name: 'portfolio_review_result' },
        },
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('[review-portfolio-submission] OpenAI error:', response.status, errorText);
      throw new Error(`OpenAI API error: ${response.status}`);
    }

    const data = await response.json();
    const message = data.choices?.[0]?.message;
    const finishReason = data.choices?.[0]?.finish_reason;
    const duration = Date.now() - startTime;

    console.log(
      '[review-portfolio-submission] OpenAI finish_reason:',
      finishReason,
      'has tool_calls:',
      !!message?.tool_calls?.length,
      `duration: ${duration}ms`
    );

    // Extract tool call result
    let review: Record<string, unknown>;
    const toolCall = message?.tool_calls?.[0];

    if (toolCall?.function?.arguments) {
      review = JSON.parse(toolCall.function.arguments);
    } else if (finishReason === 'length') {
      console.warn(
        '[review-portfolio-submission] Response truncated. Returning fallback.'
      );
      review = {
        grade_suggestion: 'refer',
        grade_justification:
          'The AI review was too long to complete fully. Please review the submission manually or try again.',
        criteria_analysis: [],
        gaps: [],
        strengths: ['Submission received for review'],
        improvements: ['AI analysis could not be completed — manual review recommended'],
        draft_feedback:
          'Thank you for your submission. Due to the volume of evidence, the automated review could not complete fully. Your assessor will review your work manually.',
        quality: {
          evidence_range: 'adequate',
          reflection_quality: 'adequate',
          technical_depth: 'adequate',
        },
      };
    } else if (message?.content) {
      console.warn(
        '[review-portfolio-submission] No tool call, attempting JSON parse from text...'
      );
      try {
        const jsonMatch = message.content.match(/\{[\s\S]*\}/);
        if (jsonMatch) {
          review = JSON.parse(jsonMatch[0]);
        } else {
          throw new Error('No JSON found in text response');
        }
      } catch {
        review = {
          grade_suggestion: 'refer',
          grade_justification: message.content.slice(0, 300),
          criteria_analysis: [],
          gaps: [],
          strengths: [],
          improvements: [],
          draft_feedback: message.content.slice(0, 1000),
          quality: {
            evidence_range: 'adequate',
            reflection_quality: 'adequate',
            technical_depth: 'adequate',
          },
        };
      }
    } else {
      console.error(
        '[review-portfolio-submission] No usable response. Full:',
        JSON.stringify(data.choices?.[0])
      );
      throw new Error('No usable response from AI');
    }

    console.log('[review-portfolio-submission] Review complete in', duration, 'ms');

    return new Response(
      JSON.stringify({
        success: true,
        review,
        processing_time_ms: duration,
      }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );
  } catch (error) {
    const duration = Date.now() - startTime;
    console.error(`[review-portfolio-submission] Error after ${duration}ms:`, error);

    return new Response(
      JSON.stringify({
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error',
        processing_time_ms: duration,
      }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );
  }
});
