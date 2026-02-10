/**
 * validate-evidence-quality — Per-AC Sufficiency Scoring
 *
 * Analyses portfolio evidence against specific claimed assessment criteria.
 * Returns per-AC sufficiency scores with actionable feedback.
 *
 * Model: gpt-5-mini-2025-08-07 via tool calling for structured JSON output.
 */

import { serve, createClient, corsHeaders } from '../_shared/deps.ts';

// ---------- Tool schema for structured output ----------
const validationTool = {
  type: 'function' as const,
  function: {
    name: 'evidence_quality_validation',
    description:
      'Structured per-AC evidence quality validation from an assessor perspective',
    parameters: {
      type: 'object',
      properties: {
        overallGrade: {
          type: 'string',
          enum: ['A', 'B', 'C', 'D'],
          description:
            'A=ready for submission, B=minor gaps, C=significant gaps, D=insufficient',
        },
        overallScore: {
          type: 'number',
          description: 'Overall quality score 0-100',
        },
        assessorSummary: {
          type: 'string',
          description:
            '2-3 sentences from an assessor perspective on whether this evidence would be accepted',
        },
        acValidations: {
          type: 'array',
          items: {
            type: 'object',
            properties: {
              acCode: { type: 'string' },
              acText: { type: 'string' },
              unitCode: { type: 'string' },
              sufficiencyScore: {
                type: 'number',
                description: '0-100 how well this evidence meets this AC',
              },
              status: {
                type: 'string',
                enum: [
                  'sufficient',
                  'minor_gaps',
                  'significant_gaps',
                  'insufficient',
                ],
              },
              feedback: {
                type: 'string',
                description: 'Specific feedback for this AC',
              },
              suggestedAdditions: {
                type: 'array',
                items: { type: 'string' },
                description: 'What to add to strengthen this AC claim',
              },
            },
            required: [
              'acCode',
              'acText',
              'sufficiencyScore',
              'status',
              'feedback',
              'suggestedAdditions',
            ],
          },
          description: 'Per-AC validation results',
        },
        improvementActions: {
          type: 'array',
          items: {
            type: 'object',
            properties: {
              priority: {
                type: 'string',
                enum: ['high', 'medium', 'low'],
              },
              action: { type: 'string' },
              acCode: { type: 'string' },
            },
            required: ['priority', 'action'],
          },
          description: 'Prioritised improvement actions',
        },
      },
      required: [
        'overallGrade',
        'overallScore',
        'assessorSummary',
        'acValidations',
        'improvementActions',
      ],
    },
  },
};

// ---------- Stop words ----------
const STOP_WORDS = new Set([
  'the', 'a', 'an', 'and', 'or', 'but', 'in', 'on', 'at', 'to', 'for',
  'of', 'with', 'by', 'from', 'is', 'are', 'was', 'were', 'be', 'been',
  'being', 'have', 'has', 'had', 'do', 'does', 'did', 'will', 'would',
  'could', 'should', 'may', 'might', 'shall', 'can', 'need', 'must',
  'it', 'its', 'this', 'that', 'these', 'those', 'they', 'them', 'their',
  'he', 'she', 'his', 'her', 'we', 'our', 'you', 'your', 'my', 'me',
  'who', 'which', 'what', 'when', 'where', 'how', 'why', 'all', 'each',
  'every', 'both', 'few', 'more', 'most', 'other', 'some', 'such', 'no',
  'not', 'only', 'same', 'so', 'than', 'too', 'very', 'just', 'because',
  'as', 'into', 'through', 'during', 'before', 'after', 'above', 'below',
  'between', 'out', 'off', 'over', 'under', 'again', 'then', 'once',
]);

// ---------- Image URL to base64 ----------
async function imageUrlToBase64(
  url: string
): Promise<{ base64: string; mimeType: string } | null> {
  try {
    if (url.startsWith('data:image')) {
      const match = url.match(/data:(.*?);base64,(.+)/);
      if (!match) return null;
      return { mimeType: match[1], base64: match[2] };
    }
    const response = await fetch(url);
    if (!response.ok) return null;
    const contentType = response.headers.get('content-type') || 'image/jpeg';
    const arrayBuffer = await response.arrayBuffer();
    const bytes = new Uint8Array(arrayBuffer);
    let binary = '';
    for (let i = 0; i < bytes.length; i++) {
      binary += String.fromCharCode(bytes[i]);
    }
    return { mimeType: contentType, base64: btoa(binary) };
  } catch (err) {
    console.error('[validate-evidence-quality] Image fetch failed:', err);
    return null;
  }
}

serve(async (req: Request) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  const startTime = Date.now();

  try {
    console.log('[validate-evidence-quality] Starting validation...');

    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    const openAIApiKey = Deno.env.get('OPENAI_API_KEY');

    if (!openAIApiKey) {
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

    const body = await req.json();
    const {
      portfolio_item_id,
      evidence_text,
      evidence_urls,
      claimed_acs,
      qualification_code,
    } = body;

    if (!evidence_text || !claimed_acs?.length || !qualification_code) {
      return new Response(
        JSON.stringify({
          success: false,
          error: 'evidence_text, claimed_acs, and qualification_code are required',
        }),
        {
          status: 400,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        }
      );
    }

    // ---------- RAG: fetch exact AC text for claimed ACs ----------
    let acContext = '';
    try {
      const { data: acData } = await supabase.rpc('get_qualification_acs', {
        p_qualification_code: qualification_code,
      });

      if (acData?.length) {
        acContext += '\n\n--- Exact Assessment Criteria Being Claimed ---\n';
        for (const ac of acData) {
          // Include all ACs but highlight claimed ones
          const isClaimed = claimed_acs.some(
            (c: string) =>
              c === ac.ac_ref ||
              c === `${ac.unit_code}.${ac.ac_ref}` ||
              ac.ac_text?.includes(c) ||
              c.includes(ac.ac_ref)
          );
          if (isClaimed) {
            acContext += `[CLAIMED] Unit ${ac.unit_code}: ${ac.ac_ref} — ${ac.ac_text}\n`;
          }
        }
      }
    } catch (err) {
      console.warn('[validate-evidence-quality] AC fetch failed:', err);
    }

    // RAG: practical work context
    const keywords = evidence_text
      .toLowerCase()
      .split(/\s+/)
      .filter((w: string) => w.length >= 3 && !STOP_WORDS.has(w));
    const uniqueKeywords = Array.from(new Set(keywords)).slice(0, 15) as string[];

    let practicalContext = '';
    if (uniqueKeywords.length > 0) {
      try {
        const { data: practData } = await supabase.rpc(
          'search_practical_work_fast',
          {
            p_keywords: uniqueKeywords,
            p_limit: 5,
          }
        );
        if (practData?.length) {
          practicalContext += '\n\n--- Practical Work Context ---\n';
          for (const item of practData) {
            practicalContext += `- ${item.title}: ${item.content?.substring(0, 300)}\n`;
          }
        }
      } catch {
        /* non-critical */
      }
    }

    // ---------- Build OpenAI messages ----------
    const systemPrompt = `You are a senior UK IQA-qualified assessor reviewing apprentice portfolio evidence. You are checking whether the evidence **actually meets** specific assessment criteria, not just whether it's loosely related.

For each claimed AC, evaluate:
1. Does the evidence show the apprentice **performed** the work (not just observed)?
2. Are specific technical details present (cable sizes, regulation numbers, test results, equipment used)?
3. Would an IQA sampler accept this evidence as sufficient for this AC?
4. What specific additions would strengthen the evidence?

Grade the overall evidence:
- A (80-100): Ready for submission — sufficient for all or nearly all claimed ACs
- B (60-79): Minor gaps — good foundation but needs small additions
- C (40-59): Significant gaps — shows some understanding but lacks detail
- D (0-39): Insufficient — does not adequately demonstrate the claimed competencies

Be encouraging but rigorous. Use UK English.
${acContext}${practicalContext}`;

    // Build content with optional images
    const userContentParts: Array<
      | { type: 'text'; text: string }
      | { type: 'image_url'; image_url: { url: string; detail: string } }
    > = [];

    let textPrompt = `Please validate this portfolio evidence against the claimed assessment criteria:\n\nEvidence:\n${evidence_text}\n\nClaimed ACs: ${claimed_acs.join(', ')}`;
    userContentParts.push({ type: 'text', text: textPrompt });

    // Attach images if provided
    if (evidence_urls?.length) {
      for (const url of evidence_urls.slice(0, 3)) {
        const imageData = await imageUrlToBase64(url);
        if (imageData) {
          userContentParts.push({
            type: 'image_url',
            image_url: {
              url: `data:${imageData.mimeType};base64,${imageData.base64}`,
              detail: 'high',
            },
          });
        }
      }
    }

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
          { role: 'user', content: userContentParts },
        ],
        tools: [validationTool],
        tool_choice: {
          type: 'function',
          function: { name: 'evidence_quality_validation' },
        },
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error(
        '[validate-evidence-quality] OpenAI error:',
        response.status,
        errorText
      );
      throw new Error(`OpenAI API error: ${response.status}`);
    }

    const data = await response.json();
    const message = data.choices?.[0]?.message;
    const toolCall = message?.tool_calls?.[0];
    const duration = Date.now() - startTime;

    let validation: Record<string, unknown>;

    if (toolCall?.function?.arguments) {
      validation = JSON.parse(toolCall.function.arguments);
    } else if (message?.content) {
      // Fallback: try to extract JSON from text
      const jsonMatch = message.content.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        validation = JSON.parse(jsonMatch[0]);
      } else {
        throw new Error('No structured validation result returned');
      }
    } else {
      throw new Error('Empty response from AI');
    }

    console.log(
      `[validate-evidence-quality] Done in ${duration}ms. Grade: ${validation.overallGrade}, Score: ${validation.overallScore}`
    );

    // Save to database
    const serviceClient = createClient(supabaseUrl, supabaseKey);
    await serviceClient.from('evidence_quality_validations').insert({
      user_id: user.id,
      portfolio_item_id: portfolio_item_id || null,
      qualification_code,
      overall_grade: validation.overallGrade,
      overall_score: validation.overallScore,
      assessor_summary: validation.assessorSummary,
      ac_validations: validation.acValidations,
      improvement_actions: validation.improvementActions,
      processing_time_ms: duration,
    });

    return new Response(
      JSON.stringify({
        success: true,
        ...validation,
        processingTimeMs: duration,
      }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  } catch (err) {
    console.error('[validate-evidence-quality] Error:', err);
    return new Response(
      JSON.stringify({
        success: false,
        error: err instanceof Error ? err.message : 'Internal error',
      }),
      {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );
  }
});
