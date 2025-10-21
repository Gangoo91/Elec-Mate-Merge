import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

// System prompt templates for each briefing type
function getSystemPromptForType(briefingType: string): string {
  const prompts: Record<string, string> = {
    'site-work': `You are a UK electrical safety briefing expert with deep knowledge of BS 7671:2018+A3:2024 regulations. Generate professional, concise, and actionable team briefings for electrical installation work.

Focus on: Electrical hazards, BS 7671 compliance, isolation procedures, PPE requirements, and safe working practices.`,

    'business-update': `You are a professional business communications expert. Generate clear, concise, and action-oriented briefings for business updates and organizational changes.

Focus on: Key changes, impact on team, action items, timelines, stakeholder responsibilities, and transition planning. Avoid safety jargon unless specifically relevant.`,

    'hse-update': `You are an HSE (Health, Safety & Environment) compliance specialist with broad knowledge of UK workplace regulations. Generate comprehensive briefings on HSE updates and regulatory changes.

Focus on: Regulatory changes, compliance requirements, impact assessment, implementation steps, and deadlines. Cover all workplace safety, not just electrical.`,

    'lfe': `You are an incident analysis expert specializing in lessons from experience. Generate insightful briefings that help teams learn from past incidents.

Focus on: Incident summary, root cause analysis, contributing factors, preventive measures, and actionable learnings. Use clear, blame-free language.`,

    'safety-alert': `You are an urgent safety communications specialist. Generate immediate, clear, and actionable safety alerts that demand attention.

Focus on: Immediate hazard description, specific dangers, required actions, who's affected, and compliance deadlines. Use direct, urgent language.`,

    'regulatory': `You are a regulatory change management expert. Generate detailed briefings on regulatory changes and their business impact.

Focus on: Change summary, compliance requirements, implementation roadmap, resource needs, training requirements, and deadlines.`,

    'general': `You are a professional team briefing coordinator. Generate clear, well-structured briefings for general team communications.

Focus on: Clear objectives, key information, action items, and next steps. Adapt tone to the content provided.`
  };

  return prompts[briefingType] || prompts['general'];
}

// Get briefing type-specific contextual information
function getBriefingTypeContext(briefingType: string): string {
  const contexts: Record<string, string> = {
    'site-work': 'electrical installation work with BS 7671 compliance requirements',
    'business-update': 'organizational change or business process update',
    'hse-update': 'health, safety, and environmental regulatory update',
    'lfe': 'incident review and lessons learned session',
    'safety-alert': 'urgent safety warning requiring immediate attention',
    'regulatory': 'regulatory or compliance change requiring action',
    'general': 'team communication or information sharing'
  };

  return contexts[briefingType] || 'general team briefing';
}

// Get tool definition based on briefing type
function getToolDefinitionForType(briefingType: string) {
  const baseProps = {
    briefingDescription: {
      type: "string",
      description: "2-4 paragraph comprehensive overview"
    }
  };

  // Safety-related briefings (site-work, safety-alert, lfe)
  if (['site-work', 'safety-alert', 'lfe'].includes(briefingType)) {
    return {
      type: "function",
      function: {
        name: "generate_briefing_content",
        description: "Generate comprehensive safety briefing content",
        parameters: {
          type: "object",
          properties: {
            ...baseProps,
            hazardsAndControls: {
              type: "string",
              description: "Detailed hazard analysis with controls for each hazard"
            },
            safetyWarning: {
              type: "string",
              description: "Critical safety warning - clear and direct"
            },
            equipmentRequired: {
              type: "array",
              items: { type: "string" },
              description: "Required PPE and safety equipment"
            },
            keyRegulations: {
              type: "array",
              items: { type: "string" },
              description: "Relevant regulations (BS 7671, HSE guidelines)"
            }
          },
          required: ["briefingDescription", "hazardsAndControls", "safetyWarning", "equipmentRequired", "keyRegulations"]
        }
      }
    };
  }

  // Business/operational briefings
  if (['business-update', 'hse-update', 'regulatory'].includes(briefingType)) {
    return {
      type: "function",
      function: {
        name: "generate_briefing_content",
        description: "Generate business/operational briefing content",
        parameters: {
          type: "object",
          properties: {
            ...baseProps,
            keyChanges: {
              type: "string",
              description: "Summary of key changes or updates"
            },
            impactAssessment: {
              type: "string",
              description: "Impact on team, operations, or compliance"
            },
            actionItems: {
              type: "array",
              items: { type: "string" },
              description: "Specific actions required from team"
            },
            timeline: {
              type: "array",
              items: { type: "string" },
              description: "Implementation timeline and key dates"
            },
            resourcesNeeded: {
              type: "array",
              items: { type: "string" },
              description: "Resources, training, or support needed"
            }
          },
          required: ["briefingDescription", "keyChanges", "impactAssessment", "actionItems", "timeline"]
        }
      }
    };
  }

  // General briefing
  return {
    type: "function",
    function: {
      name: "generate_briefing_content",
      description: "Generate general briefing content",
      parameters: {
        type: "object",
        properties: {
          ...baseProps,
          keyPoints: {
            type: "array",
            items: { type: "string" },
            description: "Main points to communicate"
          },
          actionItems: {
            type: "array",
            items: { type: "string" },
            description: "Actions required from team"
          },
          additionalInfo: {
            type: "string",
            description: "Any additional relevant information"
          }
        },
        required: ["briefingDescription", "keyPoints", "actionItems"]
      }
    }
  };
}

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

    // Get briefing type-specific context for better prompting
    const briefingTypeContext = getBriefingTypeContext(briefingType);
    
    // Build dynamic system prompt based on briefing type
    const systemPrompt = getSystemPromptForType(briefingType);

    // Build dynamic user prompt based on briefing type
    let userPrompt = `Generate a comprehensive team briefing for:

**Briefing Title:** ${briefingContext.briefingTitle}
**Type:** ${briefingTypeContext}
**${briefingType === 'site-work' ? 'Work' : 'Content'} Description:** ${briefingContext.briefingContent || 'Not specified'}`;

    // Add type-specific fields
    if (briefingType === 'site-work') {
      userPrompt += `
${briefingContext.workScope ? `**Work Scope:** ${briefingContext.workScope}` : ''}
${briefingContext.environment ? `**Environment:** ${briefingContext.environment}` : ''}`;
    }

    userPrompt += `
**Location:** ${briefingContext.location || 'Not specified'}
**Team Size:** ${briefingContext.teamSize || 'Not specified'}
${briefingContext.experienceLevel ? `**Team Experience:** ${briefingContext.experienceLevel}` : ''}`;

    // Add hazards only if it's a safety-related briefing
    if (['site-work', 'safety-alert', 'lfe'].includes(briefingType)) {
      userPrompt += `

**Identified Hazards:**
${hazards.identified && hazards.identified.length > 0 ? hazards.identified.join(', ') : 'None specified'}
${hazards.custom ? `\n**Additional Hazards:** ${hazards.custom}` : ''}
${hazards.riskLevel ? `**Overall Risk Level:** ${hazards.riskLevel}` : ''}
${hazards.specialConsiderations ? `**Special Considerations:** ${hazards.specialConsiderations}` : ''}`;
    }
    
    userPrompt += `

Generate comprehensive, detailed, and highly relevant content for this specific briefing type. 
Be specific, actionable, and adapt your response to match the briefing type's focus areas.
${briefingType !== 'site-work' ? 'This is NOT an electrical safety briefing - adjust content accordingly.' : ''}`;

    console.log('[BRIEFING-AI] Calling Lovable AI for type:', briefingType);
    console.log('[BRIEFING-AI] User prompt preview:', userPrompt.substring(0, 200) + '...');

    // Call Lovable AI with type-specific tool definition
    const response = await fetch('https://ai.gateway.lovable.dev/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${LOVABLE_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: "google/gemini-2.5-flash",
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content: userPrompt }
        ],
        tools: [getToolDefinitionForType(briefingType)],
        tool_choice: {
          type: "function",
          function: { name: "generate_briefing_content" }
        }
      }),
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
