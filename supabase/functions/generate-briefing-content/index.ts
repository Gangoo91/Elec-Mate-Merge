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

    const { jobContext, hazards } = await req.json();
    console.log('[BRIEFING-AI] Generating content for:', jobContext?.jobName);

    // Build system prompt for BS 7671 compliance
    const systemPrompt = `You are a UK electrical safety briefing expert with deep knowledge of BS 7671:2018+A3:2024 regulations. Generate professional, concise, and actionable team briefings for electrical contractors.

Your briefings must:
- Be clear and practical for electricians of varying experience levels
- Reference specific BS 7671 regulations where applicable (e.g., Regulation 132.16, 411.3.2.1)
- Include HSE guidance and best practices
- Be suitable for reading in 10-15 minutes
- Focus on critical safety measures for the specific job context
- Use UK English terminology and electrical standards

You must respond with valid JSON matching this exact structure:
{
  "briefingDescription": "2-3 paragraphs overview with context, scope, and key objectives",
  "keyPoints": ["point 1", "point 2", ...],
  "safetyPoints": ["safety point 1 (BS 7671 Reg X)", ...],
  "equipmentRequired": ["PPE item 1", "Tool 2", ...],
  "hazardsAndControls": "Detailed markdown text explaining each hazard and specific control measures with BS 7671 references",
  "safetyWarning": "A critical safety message to emphasize (1-2 sentences)",
  "estimatedDuration": "realistic time e.g. 30 minutes"
}`;

    // Build user prompt with all context
    const identifiedHazardsList = (hazards?.identified || []).join('\n- ');
    const userPrompt = `Generate a professional team briefing for the following electrical work:

**JOB DETAILS:**
- Job Name: ${jobContext.jobName}
- Work Description: ${jobContext.jobDescription}
- Work Scope: ${jobContext.workScope}
- Environment: ${jobContext.environment}
- Location: ${jobContext.location}
- Team Size: ${jobContext.teamSize} electricians
- Experience Level: ${jobContext.experienceLevel}

**IDENTIFIED HAZARDS:**
- ${identifiedHazardsList}
${hazards?.custom ? `\n**ADDITIONAL HAZARDS:**\n${hazards.custom}` : ''}

**RISK ASSESSMENT:**
- Overall Risk Level: ${hazards.riskLevel}
${hazards?.specialConsiderations ? `- Special Considerations: ${hazards.specialConsiderations}` : ''}

Generate a comprehensive BS 7671:2018+A3:2024 compliant safety briefing with all required sections.`;

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
