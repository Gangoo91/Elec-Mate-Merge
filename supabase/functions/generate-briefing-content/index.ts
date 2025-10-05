import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

const LOVABLE_API_KEY = Deno.env.get('LOVABLE_API_KEY');

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    console.log('[BRIEFING-AI] Request started');

    if (!LOVABLE_API_KEY) {
      console.error('[BRIEFING-AI] API key not configured');
      return new Response(
        JSON.stringify({ error: 'Lovable AI key not configured' }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const requestBody = await req.json();
    console.log('[BRIEFING-AI] Request body:', JSON.stringify(requestBody, null, 2));
    
    const { briefingType, briefingContext, hazards } = requestBody;
    
    if (!briefingContext || !briefingContext.briefingTitle) {
      console.error('[BRIEFING-AI] Missing required fields:', { briefingType, briefingContext, hazards });
      return new Response(
        JSON.stringify({ 
          error: 'Missing required briefing context. Please provide briefing title and details.',
          received: requestBody 
        }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }
    
    console.log('[BRIEFING-AI] Generating content for:', briefingContext.briefingTitle, 'Type:', briefingType);

    // Build system prompt for BS 7671 compliance with plain text output
    const systemPrompt = `You are a UK electrical safety briefing expert with deep knowledge of BS 7671:2018+A3:2024 regulations. Generate professional, concise, and actionable team briefings.

CRITICAL OUTPUT FORMAT RULES:
- Use PLAIN PROFESSIONAL ENGLISH only - NO markdown formatting
- Do NOT use #, ##, ###, **, *, -, or any markdown symbols
- Use proper paragraphs with line breaks between sections
- Use proper punctuation and capitalization
- Write in complete sentences with professional tone

Your briefings must:
- Be clear and practical for all experience levels
- Reference specific BS 7671 regulations where applicable (e.g., Regulation 132.16)
- Include HSE guidance and best practices
- Be suitable for reading in 10-15 minutes
- Focus on critical safety measures
- Use UK English terminology

You must respond with valid JSON matching this exact structure:
{
  "briefingDescription": "Plain text overview in 2-3 paragraphs with context, scope, and key objectives. Use complete sentences and proper punctuation. No markdown.",
  "keyPoints": ["Plain text point 1", "Plain text point 2", ...],
  "safetyPoints": ["Plain text safety point 1 (BS 7671 Reg X)", ...],
  "equipmentRequired": ["PPE item 1", "Tool 2", ...],
  "hazardsAndControls": "Plain text explanation of each hazard and control measures. Use paragraphs separated by line breaks. Include BS 7671 references. NO markdown formatting.",
  "safetyWarning": "A critical safety message in plain text (1-2 sentences)",
  "estimatedDuration": "realistic time e.g. 30 minutes"
}`;

    // Build user prompt based on briefing type
    const identifiedHazardsList = (hazards?.identified || []).join('\n- ');
    
    let briefingTypeContext = '';
    switch (briefingType) {
      case 'site-work':
        briefingTypeContext = 'electrical site work/installation';
        break;
      case 'lfe':
        briefingTypeContext = 'Lessons From Experience (LFE) incident review';
        break;
      case 'hse-update':
        briefingTypeContext = 'Health & Safety Executive (HSE) update';
        break;
      case 'business-update':
        briefingTypeContext = 'business announcement or update';
        break;
      case 'safety-alert':
        briefingTypeContext = 'safety alert notification';
        break;
      case 'regulatory':
        briefingTypeContext = 'regulatory change notification';
        break;
      default:
        briefingTypeContext = 'general briefing';
    }

    const userPrompt = `Generate a professional team briefing for the following ${briefingTypeContext}:

**BRIEFING DETAILS:**
- Title: ${briefingContext.briefingTitle}
- Content: ${briefingContext.briefingContent}
${briefingContext.workScope ? `- Work Scope: ${briefingContext.workScope}` : ''}
${briefingContext.environment ? `- Environment: ${briefingContext.environment}` : ''}
- Location: ${briefingContext.location}
- Team Size: ${briefingContext.teamSize} people
- Experience Level: ${briefingContext.experienceLevel}

**IDENTIFIED HAZARDS:**
- ${identifiedHazardsList}
${hazards?.custom ? `\n**ADDITIONAL HAZARDS:**\n${hazards.custom}` : ''}

**RISK ASSESSMENT:**
- Overall Risk Level: ${hazards.riskLevel}
${hazards?.specialConsiderations ? `- Special Considerations: ${hazards.specialConsiderations}` : ''}

Generate a comprehensive BS 7671:2018+A3:2024 compliant safety briefing. Remember: Use PLAIN TEXT only, NO markdown symbols.`;

    console.log('[BRIEFING-AI] Calling Lovable AI...');

    // Call Lovable AI with structured output
    const response = await fetch('https://ai.gateway.lovable.dev/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${LOVABLE_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'google/gemini-2.5-flash',
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: userPrompt }
        ],
        tools: [{
          type: 'function',
          function: {
            name: 'create_briefing',
            description: 'Generate structured briefing content',
            parameters: {
              type: 'object',
              properties: {
                briefingDescription: { type: 'string' },
                keyPoints: { 
                  type: 'array',
                  items: { type: 'string' },
                  minItems: 5,
                  maxItems: 7
                },
                safetyPoints: { 
                  type: 'array',
                  items: { type: 'string' },
                  minItems: 6,
                  maxItems: 10
                },
                equipmentRequired: { 
                  type: 'array',
                  items: { type: 'string' },
                  minItems: 8,
                  maxItems: 12
                },
                hazardsAndControls: { type: 'string' },
                safetyWarning: { type: 'string' },
                estimatedDuration: { type: 'string' }
              },
              required: ['briefingDescription', 'keyPoints', 'safetyPoints', 'equipmentRequired', 'hazardsAndControls', 'safetyWarning', 'estimatedDuration'],
              additionalProperties: false
            }
          }
        }],
        tool_choice: { type: 'function', function: { name: 'create_briefing' } }
      })
    });

    if (!response.ok) {
      if (response.status === 429) {
        return new Response(
          JSON.stringify({ error: 'Rate limit exceeded. Please try again in a moment.' }),
          { status: 429, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }
      if (response.status === 402) {
        return new Response(
          JSON.stringify({ error: 'AI credits exhausted. Please add credits to continue.' }),
          { status: 402, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }
      const errorText = await response.text();
      console.error('[BRIEFING-AI] API error:', response.status, errorText);
      return new Response(
        JSON.stringify({ error: 'Failed to generate briefing content' }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const data = await response.json();
    console.log('[BRIEFING-AI] AI response received');
    
    // Extract tool call result
    const toolCall = data.choices?.[0]?.message?.tool_calls?.[0];
    if (!toolCall) {
      console.error('[BRIEFING-AI] No tool call in response');
      return new Response(
        JSON.stringify({ error: 'Invalid AI response format' }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const briefingContent = JSON.parse(toolCall.function.arguments);
    console.log('[BRIEFING-AI] Content generated successfully');

    return new Response(
      JSON.stringify({ success: true, content: briefingContent }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );

  } catch (error) {
    console.error('[BRIEFING-AI] Error:', error.message);
    return new Response(
      JSON.stringify({ error: error.message }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});
