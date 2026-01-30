import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { captureException } from '../_shared/sentry.ts';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type, x-supabase-timeout, x-request-id',
};

// System prompt templates for each briefing type
function getSystemPromptForType(briefingType: string): string {
  const prompts: Record<string, string> = {
    'site-work': `You are a UK electrical safety briefing expert with deep knowledge of BS 7671:2018+A3:2024 regulations.

Generate structured, actionable briefing content with:
- 3-4 distinct paragraphs for overview (introduction, scope, objectives)
- Detailed hazard analysis with specific controls for EACH identified hazard
- Clear risk levels (HIGH/MEDIUM/LOW) based on likelihood and severity
- Specific PPE requirements with BS/EN standards where applicable
- Referenced regulations with section numbers

Focus on: Electrical hazards, BS 7671 compliance, isolation procedures, safe working practices.

**CRITICAL: Always include additionalInfo array with 2-4 relevant paragraphs covering:**
- Permits required (PTW, hot work, confined space)
- Post-work testing and verification procedures
- Waste disposal requirements (WEEE, cable offcuts)
- Emergency contact numbers and escalation procedures
- References to method statements, RAMS, or other safety documents`,

    'business-update': `You are a professional business communications expert.

Generate structured briefing content with:
- 3-4 overview paragraphs (introduction, background, summary)
- Detailed list of changes with effective dates and priority levels
- Impact assessment by area/department with severity
- Clear action items with owners and deadlines
- Implementation timeline with milestones

Focus on: Key changes, team impact, action items, timelines, transition planning.`,

    'hse-update': `You are an HSE compliance specialist with broad knowledge of UK workplace regulations.

Generate structured briefing content with:
- 3-4 overview paragraphs covering regulatory changes
- Detailed compliance requirements with deadlines
- Impact assessment by operational area
- Action items with responsible parties
- Timeline for implementation

Focus on: Regulatory changes, compliance requirements, implementation steps, deadlines.`,

    'lfe': `You are an incident analysis expert specializing in lessons from experience.

Generate structured briefing content with:
- 3-4 overview paragraphs (incident summary, context, learnings)
- Detailed hazard analysis showing what went wrong
- Clear control measures to prevent recurrence
- Action items for teams with timelines
- References to relevant safety regulations

Focus on: Root cause analysis, preventive measures, actionable learnings. Use blame-free language.`,

    'safety-alert': `You are an urgent safety communications specialist.

Generate structured briefing content with:
- 3-4 concise, urgent overview paragraphs
- Detailed hazard descriptions with HIGH risk levels
- Immediate control measures required
- Mandatory PPE and equipment
- Relevant safety regulations and deadlines

Focus on: Immediate hazard, specific dangers, required actions. Use direct, urgent language.`,

    'regulatory': `You are a regulatory change management expert.

Generate structured briefing content with:
- 3-4 overview paragraphs explaining the regulatory change
- Key changes with effective dates and priorities
- Impact assessment by business area
- Action items with resource requirements
- Implementation timeline with milestones

Focus on: Change summary, compliance requirements, implementation roadmap, resource needs.`,

    'general': `You are a professional team briefing coordinator.

Generate structured briefing content with:
- 3-4 clear overview paragraphs
- Key points as structured list
- Action items with clear ownership
- Additional information as focused paragraphs (detail=specific facts, note=reminders, context=background, reference=policy links)
- Timeline or next steps

Focus on: Clear objectives, key information, action items, structured additional details.

**CRITICAL: Always include additionalInfo array with 2-4 relevant paragraphs covering:**
- Permits or documentation required
- Post-work procedures or follow-up actions
- Disposal requirements or material handling
- Contact details for support/escalation
- References to policies, procedures, or other documents
- Next steps or ongoing considerations`
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
  // Safety-related briefings (site-work, safety-alert, lfe)
  if (['site-work', 'safety-alert', 'lfe'].includes(briefingType)) {
    return {
      type: "function",
      function: {
        name: "generate_briefing_content",
        description: "Generate comprehensive safety briefing content with structured data",
        parameters: {
          type: "object",
          properties: {
            briefingOverview: {
              type: "array",
              description: "Array of overview paragraphs with context",
              items: {
                type: "object",
                properties: {
                  paragraph: { type: "number" },
                  content: { type: "string", description: "Paragraph text (2-4 sentences)" },
                  type: { 
                    type: "string", 
                    enum: ["introduction", "scope", "objectives", "context"],
                    description: "Paragraph purpose"
                  }
                },
                required: ["paragraph", "content", "type"]
              }
            },
            hazardsAndControls: {
              type: "array",
              description: "Structured hazard analysis with controls",
              items: {
                type: "object",
                properties: {
                  hazardId: { type: "number" },
                  hazardName: { type: "string", description: "Clear hazard name" },
                  description: { type: "string", description: "Detailed hazard description" },
                  riskLevel: { 
                    type: "string", 
                    enum: ["HIGH", "MEDIUM", "LOW"],
                    description: "Risk severity"
                  },
                  controls: { 
                    type: "array", 
                    items: { type: "string" },
                    description: "Control measures (3-5 items)"
                  },
                  requiredPPE: { 
                    type: "array", 
                    items: { type: "string" },
                    description: "Specific PPE needed"
                  },
                  regulations: {
                    type: "array",
                    items: { type: "string" },
                    description: "Relevant regulations"
                  }
                },
                required: ["hazardId", "hazardName", "description", "riskLevel", "controls"]
              }
            },
            safetyWarning: {
              type: "object",
              description: "Critical safety warning structure",
              properties: {
                level: { 
                  type: "string", 
                  enum: ["DANGER", "WARNING", "CAUTION"],
                  description: "Warning severity"
                },
                headline: { type: "string", description: "Short, impactful warning title" },
                details: { 
                  type: "array", 
                  items: { type: "string" },
                  description: "Key warning points (3-5 items)"
                }
              },
              required: ["level", "headline", "details"]
            },
            equipmentRequired: {
              type: "array",
              description: "Required equipment with standards",
              items: {
                type: "object",
                properties: {
                  item: { type: "string" },
                  standard: { type: "string", description: "BS/EN standard if applicable" },
                  mandatory: { type: "boolean" }
                },
                required: ["item", "mandatory"]
              }
            },
            keyRegulations: {
              type: "array",
              description: "Applicable regulations and standards",
              items: {
                type: "object",
                properties: {
                  regulation: { type: "string", description: "Regulation name" },
                  section: { type: "string", description: "Specific section/part" },
                  topic: { type: "string", description: "What it covers" }
                },
                required: ["regulation", "topic"]
              }
            },
            additionalInfo: {
              type: "array",
              description: "MANDATORY: Additional critical information (permits, post-work procedures, disposal requirements, documentation, contact details) as structured paragraphs. MUST include at least 2-4 relevant items.",
              items: {
                type: "object",
                properties: {
                  paragraph: { type: "number" },
                  content: { type: "string", description: "Paragraph text (1-3 sentences)" },
                  type: { 
                    type: "string", 
                    enum: ["detail", "note", "context", "reference"],
                    description: "detail=specific facts/procedures, note=reminders/observations, context=background info, reference=permits/documents/contacts"
                  }
                },
                required: ["paragraph", "content", "type"]
              }
            }
          },
          required: ["briefingOverview", "hazardsAndControls", "safetyWarning", "equipmentRequired", "keyRegulations", "additionalInfo"]
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
            briefingOverview: {
              type: "array",
              description: "Overview paragraphs",
              items: {
                type: "object",
                properties: {
                  paragraph: { type: "number" },
                  content: { type: "string" },
                  type: { 
                    type: "string", 
                    enum: ["introduction", "background", "summary"]
                  }
                },
                required: ["paragraph", "content", "type"]
              }
            },
            keyChanges: {
              type: "array",
              description: "Structured list of changes",
              items: {
                type: "object",
                properties: {
                  changeId: { type: "number" },
                  title: { type: "string" },
                  description: { type: "string" },
                  effectiveDate: { type: "string" },
                  priority: { type: "string", enum: ["high", "medium", "low"] }
                },
                required: ["changeId", "title", "description", "priority"]
              }
            },
            impactAssessment: {
              type: "array",
              description: "Impact areas",
              items: {
                type: "object",
                properties: {
                  area: { type: "string", description: "Team/department/process affected" },
                  impact: { type: "string", description: "How they're affected" },
                  severity: { type: "string", enum: ["high", "medium", "low"] }
                },
                required: ["area", "impact", "severity"]
              }
            },
            actionItems: {
              type: "array",
              description: "Required actions",
              items: {
                type: "object",
                properties: {
                  action: { type: "string" },
                  owner: { type: "string" },
                  deadline: { type: "string" },
                  priority: { type: "string", enum: ["high", "medium", "low"] }
                },
                required: ["action", "priority"]
              }
            },
            timeline: {
              type: "array",
              description: "Implementation timeline",
              items: {
                type: "object",
                properties: {
                  milestone: { type: "string" },
                  date: { type: "string" },
                  deliverable: { type: "string" }
                },
                required: ["milestone", "date"]
              }
            },
            resourcesNeeded: {
              type: "array",
              description: "Resources required",
              items: {
                type: "object",
                properties: {
                  resource: { type: "string" },
                  type: { type: "string", enum: ["training", "equipment", "personnel", "budget"] },
                  urgency: { type: "string", enum: ["immediate", "short-term", "long-term"] }
                },
                required: ["resource", "type", "urgency"]
              }
            },
            additionalInfo: {
              type: "array",
              description: "MANDATORY: Additional relevant information (documentation requirements, contacts, references, next steps) as structured paragraphs. MUST include at least 2-4 relevant items.",
              items: {
                type: "object",
                properties: {
                  paragraph: { type: "number" },
                  content: { type: "string", description: "Paragraph text (1-3 sentences)" },
                  type: { 
                    type: "string", 
                    enum: ["detail", "note", "context", "reference"],
                    description: "detail=factual info, note=observations, context=background, reference=links to docs/contacts"
                  }
                },
                required: ["paragraph", "content", "type"]
              }
            }
          },
          required: ["briefingOverview", "keyChanges", "impactAssessment", "actionItems", "timeline", "additionalInfo"]
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
          briefingOverview: {
            type: "array",
            items: {
              type: "object",
              properties: {
                paragraph: { type: "number" },
                content: { type: "string" },
                type: { type: "string" }
              },
              required: ["paragraph", "content"]
            }
          },
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
            type: "array",
            description: "MANDATORY: Additional relevant information as structured paragraphs (contacts, references, next steps, documentation). MUST include at least 2-4 relevant items.",
            items: {
              type: "object",
              properties: {
                paragraph: { type: "number" },
                content: { type: "string", description: "Paragraph text (1-3 sentences)" },
                type: { 
                  type: "string", 
                  enum: ["detail", "note", "context", "reference"],
                  description: "Information category: detail=factual info, note=observations, context=background, reference=links to docs/contacts"
                }
              },
              required: ["paragraph", "content", "type"]
            }
          }
        },
        required: ["briefingOverview", "keyPoints", "actionItems", "additionalInfo"]
      }
    }
  };
}

const OPENAI_API_KEY = Deno.env.get('OPENAI_API_KEY');

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    console.log('[BRIEFING-AI] Request started');

    if (!OPENAI_API_KEY) {
      console.error('[BRIEFING-AI] OpenAI API key not configured');
      return new Response(
        JSON.stringify({ error: 'OpenAI API key not configured' }),
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

    console.log('[BRIEFING-AI] Calling OpenAI GPT-5-Mini for type:', briefingType);
    console.log('[BRIEFING-AI] User prompt preview:', userPrompt.substring(0, 200) + '...');

    // Call OpenAI API directly with type-specific tool definition
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${OPENAI_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: "gpt-5-mini-2025-08-07",
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content: userPrompt }
        ],
        tools: [getToolDefinitionForType(briefingType)],
        tool_choice: {
          type: "function",
          function: { name: "generate_briefing_content" }
        },
        max_completion_tokens: 8000  // Allow for 2000 reasoning + 6000 output tokens
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
      console.error('[BRIEFING-AI] No tool call in response. Full response:', JSON.stringify(data, null, 2));
      
      // Try to parse regular message content if available
      const regularMessage = data.choices?.[0]?.message?.content;
      if (regularMessage) {
        try {
          const parsedContent = JSON.parse(regularMessage);
          if (parsedContent.briefingDescription) {
            console.log('[BRIEFING-AI] Successfully parsed message content as JSON');
            return new Response(
              JSON.stringify({ success: true, content: parsedContent }),
              { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
            );
          }
        } catch (e) {
          console.error('[BRIEFING-AI] Failed to parse message content:', e);
        }
      }
      
      return new Response(
        JSON.stringify({ error: 'Invalid AI response format - no tool call or parseable content' }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const briefingContent = JSON.parse(toolCall.function.arguments);
    console.log('[BRIEFING-AI] Content generated successfully via tool call');

    // VALIDATION: Ensure additionalInfo exists (critical for PDF generation)
    if (!briefingContent.additionalInfo || briefingContent.additionalInfo.length === 0) {
      console.warn('[BRIEFING-AI] ⚠️ WARNING: AI did not generate additionalInfo - adding default fallback');
      briefingContent.additionalInfo = [
        {
          paragraph: 1,
          content: "Please consult with your supervisor or safety officer for additional site-specific requirements.",
          type: "note"
        },
        {
          paragraph: 2,
          content: "Ensure all relevant documentation and permits are in place before commencing work.",
          type: "reference"
        }
      ];
    }

    return new Response(
      JSON.stringify({ 
        success: true, 
        content: briefingContent,
        rawAiFields: briefingContent  // Pass through raw AI response fields
      }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );

  } catch (error) {
    console.error('[BRIEFING-AI] Error:', error.message);
    console.error('[BRIEFING-AI] Error stack:', error.stack);

    // Capture to Sentry
    await captureException(error, {
      functionName: 'generate-briefing-content',
      requestUrl: req.url,
      requestMethod: req.method
    });

    return new Response(
      JSON.stringify({ error: error.message }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});
