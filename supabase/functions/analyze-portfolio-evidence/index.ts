/**
 * analyze-portfolio-evidence — Course-Aware AC Matching
 *
 * Analyses uploaded portfolio evidence (photos, documents) and matches
 * against real assessment criteria from the user's qualification via RAG.
 *
 * Model: gpt-5-mini-2025-08-07 via tool calling for structured JSON output.
 */

import { serve, createClient, corsHeaders } from '../_shared/deps.ts';

// ---------- Stop words for keyword filtering ----------
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
  'here', 'there', 'about', 'up', 'if', 'also', 'any', 'etc', 'got',
  'ran', 'did', 'put', 'set', 'get', 'let', 'say', 'use', 'used',
]);

// ---------- Tool schema for structured output ----------
const analysisTool = {
  type: 'function' as const,
  function: {
    name: 'portfolio_evidence_analysis',
    description:
      'Structured analysis of portfolio evidence with assessment criteria matching',
    parameters: {
      type: 'object',
      properties: {
        evidenceStrength: {
          type: 'string',
          enum: ['strong', 'moderate', 'weak'],
          description: 'Overall strength of this evidence for portfolio purposes',
        },
        whyGoodEvidence: {
          type: 'string',
          description:
            '2-3 sentences explaining why this evidence is good (or could be better) for the portfolio',
        },
        matchedCriteria: {
          type: 'array',
          items: {
            type: 'object',
            properties: {
              unitCode: { type: 'string' },
              unitTitle: { type: 'string' },
              acCode: { type: 'string' },
              acText: { type: 'string' },
              confidence: { type: 'number' },
              reason: { type: 'string' },
            },
            required: ['unitCode', 'acCode', 'acText', 'confidence', 'reason'],
          },
          description:
            'Assessment criteria this evidence could satisfy, with confidence 0-100',
        },
        qualityTips: {
          type: 'array',
          items: { type: 'string' },
          description:
            'Up to 3 tips to strengthen this as evidence (e.g. "Add close-up of terminal connections")',
        },
        suggestedTitle: {
          type: 'string',
          description: 'Suggested portfolio item title for this evidence',
        },
        detectedContent: {
          type: 'object',
          properties: {
            description: { type: 'string' },
            electricalElements: {
              type: 'array',
              items: { type: 'string' },
            },
            workType: { type: 'string' },
          },
          required: ['description', 'electricalElements', 'workType'],
          description: 'What the AI detected in the evidence',
        },
      },
      required: [
        'evidenceStrength',
        'whyGoodEvidence',
        'matchedCriteria',
        'qualityTips',
        'suggestedTitle',
        'detectedContent',
      ],
    },
  },
};

// ---------- Convert image URL to base64 for OpenAI vision ----------
async function imageUrlToBase64(url: string): Promise<{
  base64: string;
  mimeType: string;
} | null> {
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

    // Manual base64 encoding for Deno compatibility
    let binary = '';
    for (let i = 0; i < bytes.length; i++) {
      binary += String.fromCharCode(bytes[i]);
    }
    const base64 = btoa(binary);

    return { mimeType: contentType, base64 };
  } catch (err) {
    console.error('[analyze-portfolio-evidence] Image fetch failed:', err);
    return null;
  }
}

serve(async (req: Request) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  const startTime = Date.now();

  try {
    console.log('[analyze-portfolio-evidence] Starting analysis...');

    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    const openAIApiKey = Deno.env.get('OPENAI_API_KEY');

    if (!openAIApiKey) {
      console.error('[analyze-portfolio-evidence] OPENAI_API_KEY not set');
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

    console.log('[analyze-portfolio-evidence] Auth passed for user:', user.id);

    const body = await req.json();
    const evidenceUrl: string = body.evidence_url;
    const evidenceType: string = body.evidence_type || 'image';
    const title: string = body.title || '';
    const description: string = body.description || '';
    const qualificationCode: string | null = body.qualification_code || null;

    if (!evidenceUrl) {
      return new Response(
        JSON.stringify({ success: false, error: 'Evidence URL is required' }),
        {
          status: 400,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        }
      );
    }

    // ---------- RAG: search qualification requirements ----------
    const keywords = [title, description]
      .join(' ')
      .toLowerCase()
      .split(/\s+/)
      .filter((w) => w.length >= 3 && !STOP_WORDS.has(w));
    const uniqueKeywords = Array.from(new Set(keywords)).slice(0, 15);

    let ragContext = '';
    console.log(
      '[analyze-portfolio-evidence] RAG query, qualCode:',
      qualificationCode,
      'keywords:',
      uniqueKeywords.length
    );

    if (qualificationCode && uniqueKeywords.length > 0) {
      try {
        const { data: qualData } = await supabase.rpc(
          'search_qualification_requirements',
          {
            p_keywords: uniqueKeywords,
            p_qualification_code: qualificationCode,
            p_limit: 10,
          }
        );

        if (qualData && qualData.length > 0) {
          ragContext += `\n\n--- Qualification Requirements (${qualificationCode}) ---\n`;
          for (const req of qualData) {
            ragContext += `- Unit ${req.unit_code} (${req.unit_title}): ${req.learning_outcome}\n`;
            if (req.assessment_criteria?.length) {
              ragContext += `  ACs: ${req.assessment_criteria.join('; ')}\n`;
            }
          }
        }
      } catch (err) {
        console.warn(
          '[analyze-portfolio-evidence] Qualification search failed:',
          err
        );
      }
    }

    // ---------- Build OpenAI messages ----------
    const systemPrompt = `You are an experienced UK electrical training assessor analysing portfolio evidence (photos, documents) submitted by an apprentice.

You have access to qualification assessment criteria from the RAG context below. Your job is to:
1. Describe what you see in the evidence (photo/document) — identify electrical elements, work type, and context
2. Assess the overall evidence strength (strong/moderate/weak) based on clarity, technical detail, and relevance
3. Explain why this evidence is (or isn't) good for the portfolio in 2-3 sentences
4. Match specific assessment criteria from the qualification requirements — include unitCode, unitTitle, acCode, acText, confidence (0-100), and a brief reason for each match. Only include matches with confidence > 40.
5. Suggest up to 3 practical tips to strengthen the evidence (e.g. "Add close-up of terminal connections", "Include the test certificate alongside")
6. Suggest a concise portfolio item title

Use UK English. Be encouraging but honest about evidence quality. If no RAG context is available, provide general electrical apprenticeship assessment guidance.
${ragContext}`;

    // Build user content parts (text + optional image)
    const userContentParts: Array<
      | { type: 'text'; text: string }
      | { type: 'image_url'; image_url: { url: string; detail: string } }
    > = [];

    let textPrompt = 'Please analyse this portfolio evidence:';
    if (title) textPrompt += `\nTitle: ${title}`;
    if (description) textPrompt += `\nDescription: ${description}`;
    textPrompt += `\nEvidence type: ${evidenceType}`;

    userContentParts.push({ type: 'text', text: textPrompt });

    // Add image for vision analysis
    if (evidenceType === 'image') {
      const imageData = await imageUrlToBase64(evidenceUrl);
      if (imageData) {
        userContentParts.push({
          type: 'image_url',
          image_url: {
            url: `data:${imageData.mimeType};base64,${imageData.base64}`,
            detail: 'high',
          },
        });
        console.log('[analyze-portfolio-evidence] Image attached for vision analysis');
      } else {
        console.warn(
          '[analyze-portfolio-evidence] Could not load image, proceeding with text-only'
        );
      }
    }

    console.log(
      '[analyze-portfolio-evidence] RAG context length:',
      ragContext.length,
      '. Calling OpenAI...'
    );

    // ---------- Call OpenAI ----------
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${openAIApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-5-mini-2025-08-07',
        max_completion_tokens: 5000,
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: userContentParts },
        ],
        tools: [analysisTool],
        tool_choice: {
          type: 'function',
          function: { name: 'portfolio_evidence_analysis' },
        },
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error(
        '[analyze-portfolio-evidence] OpenAI error:',
        response.status,
        errorText
      );
      throw new Error(`OpenAI API error: ${response.status}`);
    }

    const data = await response.json();
    const message = data.choices?.[0]?.message;
    const finishReason = data.choices?.[0]?.finish_reason;
    const duration = Date.now() - startTime;

    console.log(
      '[analyze-portfolio-evidence] OpenAI finish_reason:',
      finishReason,
      'has tool_calls:',
      !!message?.tool_calls?.length,
      `duration: ${duration}ms`
    );

    // Extract tool call result
    let analysis: Record<string, unknown>;
    const toolCall = message?.tool_calls?.[0];

    if (toolCall?.function?.arguments) {
      analysis = JSON.parse(toolCall.function.arguments);
    } else if (finishReason === 'length') {
      console.warn(
        '[analyze-portfolio-evidence] Response truncated (finish_reason=length). Returning fallback.'
      );
      analysis = {
        evidenceStrength: 'moderate',
        whyGoodEvidence:
          'The AI analysis was too long to complete. Try again or add a more specific title and description.',
        matchedCriteria: [],
        qualityTips: [
          'Add a clear title describing what the evidence shows',
          'Include context such as the site or project name',
          'Take close-up photos of key details',
        ],
        suggestedTitle: title || 'Portfolio Evidence',
        detectedContent: {
          description: 'Analysis could not be completed',
          electricalElements: [],
          workType: 'unknown',
        },
      };
    } else if (message?.content) {
      console.warn(
        '[analyze-portfolio-evidence] No tool call but got text content, attempting JSON parse...'
      );
      try {
        const jsonMatch = message.content.match(/\{[\s\S]*\}/);
        if (jsonMatch) {
          analysis = JSON.parse(jsonMatch[0]);
        } else {
          throw new Error('No JSON found in text response');
        }
      } catch {
        analysis = {
          evidenceStrength: 'moderate',
          whyGoodEvidence: message.content.slice(0, 300),
          matchedCriteria: [],
          qualityTips: [
            'Add a clear title describing what the evidence shows',
            'Include context such as the site or project name',
          ],
          suggestedTitle: title || 'Portfolio Evidence',
          detectedContent: {
            description: 'Analysis could not be completed',
            electricalElements: [],
            workType: 'unknown',
          },
        };
      }
    } else {
      console.error(
        '[analyze-portfolio-evidence] No tool call and no text content. Full response:',
        JSON.stringify(data.choices?.[0])
      );
      throw new Error('No usable response from AI');
    }

    console.log(
      '[analyze-portfolio-evidence] Analysis complete in',
      duration,
      'ms'
    );

    return new Response(
      JSON.stringify({
        success: true,
        analysis,
        processing_time_ms: duration,
      }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );
  } catch (error) {
    const duration = Date.now() - startTime;
    console.error(`[analyze-portfolio-evidence] Error after ${duration}ms:`, error);

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
