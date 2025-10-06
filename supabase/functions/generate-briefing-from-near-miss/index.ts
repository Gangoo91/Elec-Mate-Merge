import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { corsHeaders } from '../_shared/cors.ts';

const OPENAI_API_KEY = Deno.env.get('OPENAI_API_KEY');

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { nearMissData } = await req.json();
    
    if (!OPENAI_API_KEY) {
      throw new Error('OpenAI API key not configured');
    }

    const systemPrompt = `You are a UK electrical safety expert specializing in BS 7671 regulations. Generate comprehensive team briefing content from near miss reports.`;

    const userPrompt = `
Create a professional safety briefing based on this near miss incident:

**Category:** ${nearMissData.category}
**Severity:** ${nearMissData.severity}
**Location:** ${nearMissData.location}
**Date:** ${nearMissData.incident_date} at ${nearMissData.incident_time}

**What Happened:**
${nearMissData.description}

**Potential Consequences:**
${nearMissData.potential_consequences || 'Not specified'}

**Immediate Actions Taken:**
${nearMissData.immediate_actions || 'Not specified'}

**Preventive Measures:**
${nearMissData.preventive_measures || 'Not specified'}

Generate a structured team briefing that includes:
1. A clear, engaging briefing title (max 100 chars)
2. Briefing description summarizing the incident and learnings (200-300 words)
3. Key safety points to discuss (5-7 bullets)
4. Discussion questions for the team (3-5 questions)
5. Action items to prevent recurrence (3-5 items with responsible parties)
6. Related BS 7671 regulations or HSE guidance
7. Required PPE or equipment
8. Hazards to highlight
9. Safety warning message (concise, impactful)

Format as JSON with these exact keys: briefingTitle, briefingDescription, safetyPoints, discussionQuestions, actionItems, regulations, requiredPPE, hazards, safetyWarning
`;

    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${OPENAI_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini',
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: userPrompt }
        ],
        response_format: { type: "json_object" },
        temperature: 0.7,
        max_tokens: 1500,
      }),
    });

    if (!response.ok) {
      const errorData = await response.text();
      console.error('OpenAI API error:', response.status, errorData);
      throw new Error(`OpenAI API error: ${response.status}`);
    }

    const data = await response.json();
    const content = JSON.parse(data.choices[0].message.content);

    return new Response(
      JSON.stringify({ 
        success: true,
        content 
      }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );
  } catch (error) {
    console.error('Error generating briefing:', error);
    return new Response(
      JSON.stringify({ 
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error' 
      }),
      {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );
  }
});
