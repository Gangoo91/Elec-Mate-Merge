import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.39.3';
import { 
  CABLE_SUPPORT_INTERVALS, 
  SAFE_ZONES, 
  FIRE_RATED_SUPPORT,
  TERMINATION_GUIDANCE
} from '../shared/bs7671InstallationMethods.ts';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { messages, context } = await req.json();
    const lovableApiKey = Deno.env.get('LOVABLE_API_KEY');
    if (!lovableApiKey) throw new Error('LOVABLE_API_KEY not configured');

    // RAG - Get installation knowledge from database
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    const supabase = createClient(supabaseUrl, supabaseKey);
    
    const userMessage = messages[messages.length - 1]?.content || '';
    const ragQuery = `${userMessage} cable installation methods safe zones support intervals termination practical guidance`;
    
    console.log(`🔍 RAG: Searching installation + design knowledge for: ${ragQuery}`);
    
    // Generate embedding for installation knowledge search
    const embeddingResponse = await fetch('https://ai.gateway.lovable.dev/v1/embeddings', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${lovableApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'text-embedding-3-small',
        input: ragQuery,
      }),
    });

    let installationKnowledge = '';
    let designKnowledge = '';
    
    if (embeddingResponse.ok) {
      const embeddingDataRes = await embeddingResponse.json();
      const embedding = embeddingDataRes.data[0].embedding;
      
      // Search installation knowledge
      const { data: knowledge, error: ragError } = await supabase.rpc('search_installation_knowledge', {
        query_embedding: embedding,
        match_threshold: 0.7,
        match_count: 8
      });

      if (!ragError && knowledge && knowledge.length > 0) {
        installationKnowledge = knowledge.map((k: any) => 
          `${k.topic} (${k.source}): ${k.content}`
        ).join('\n\n');
        console.log(`✅ Found ${knowledge.length} installation guides`);
      }
      
      // Search design knowledge for installation-relevant content
      const { data: designDocs, error: designError } = await supabase.rpc('search_design_knowledge', {
        query_embedding: embedding,
        match_threshold: 0.7,
        match_count: 5
      });

      if (!designError && designDocs && designDocs.length > 0) {
        designKnowledge = designDocs.map((d: any) => 
          `${d.topic} (${d.source}): ${d.content}`
        ).join('\n\n');
        console.log(`✅ Found ${designDocs.length} design documents`);
      }
    }

    const previousAgents = context?.previousAgentOutputs?.map((a: any) => a.agent) || [];
    const hasDesigner = previousAgents.includes('designer');
    
    let systemPrompt = `You are an installation supervisor providing step-by-step installation guidance per BS 7671:2018+A2:2022.

FORMAT YOUR RESPONSE AS:

INSTALLATION METHOD
Method: [clipped direct/buried/conduit/trunking]
Reference: BS 7671 Chapter 52, Table [specific table]

STEP-BY-STEP PROCEDURE
1. [First step - include any safety requirements]
2. [Second step - include fixing/support requirements]
3. [Continue numbered steps]

SAFETY REQUIREMENTS
[Critical safety point 1 - with regulation reference]
[Critical safety point 2]
[Any RCD requirements per Reg 522.6.202]

MATERIALS LIST FOR INSTALLATION
[Item 1] - [quantity needed]
[Item 2] - [quantity needed]
[Continue list]

TIME ESTIMATE: [X] hours for competent electrician

${CABLE_SUPPORT_INTERVALS.map(s => `${s.cableType} ${s.orientation}: clips every ${s.maxSpacing}mm (Reg 522.8.5)`).join('\n')}

SAFE ZONES (Reg 522.6.202):
${SAFE_ZONES.map(z => `${z.zoneType}: ${z.description}`).join('\n')}

TERMINATIONS (Section 526):
${TERMINATION_GUIDANCE.slice(0, 2).map(t => `${t.conductorType}: Torque ${t.torqueSettings}, strip ${t.stripLength}`).join('\n')}

    ${installationKnowledge ? `
INSTALLATION KNOWLEDGE (from database):
${installationKnowledge}
` : ''}

${designKnowledge ? `
DESIGN GUIDANCE (relevant to installation):
${designKnowledge}
` : ''}

Use professional language with UK English spelling. Provide clear step-by-step guidance. Cite specific regulations and tables.`;

    if (hasDesigner) {
      systemPrompt += `\n\n📋 The Designer's already done the circuit calculations, so YOU focus on:
- HOW to route the cable (safe zones, support intervals)
- WHAT fixing methods to use (steel clips for fire rating)
- Termination procedure (strip lengths, torque settings)
- Common installation MISTAKES to avoid`;
    }

    systemPrompt += `\n\n💬 Guide them step-by-step like you're walking an apprentice through their first install.`;

    // Use structured tool calling for consistent method statement output
    const response = await fetch('https://ai.gateway.lovable.dev/v1/chat/completions', {
      method: 'POST',
      headers: { 
        'Authorization': `Bearer ${lovableApiKey}`, 
        'Content-Type': 'application/json' 
      },
      body: JSON.stringify({
        model: 'google/gemini-2.5-flash',
        messages: [
          { role: 'system', content: systemPrompt }, 
          ...messages,
          ...(context?.structuredKnowledge ? [{
            role: 'system',
            content: context.structuredKnowledge
          }] : [])
        ],
        tools: [{
          type: "function",
          function: {
            name: "create_method_statement",
            description: "Create detailed installation method statement",
            parameters: {
              type: "object",
              properties: {
                response: { type: "string", description: "Natural language installation guidance" },
                installationSteps: {
                  type: "array",
                  items: {
                    type: "object",
                    properties: {
                      stepNumber: { type: "number" },
                      title: { type: "string" },
                      description: { type: "string" },
                      safetyRequirements: { type: "array", items: { type: "string" } },
                      equipmentNeeded: { type: "array", items: { type: "string" } },
                      qualifications: { type: "array", items: { type: "string" } },
                      estimatedDuration: { type: "string" },
                      riskLevel: { type: "string", enum: ["low", "medium", "high"] }
                    },
                    required: ["stepNumber", "title", "description", "safetyRequirements", "equipmentNeeded", "riskLevel"]
                  }
                },
                supportIntervals: { type: "string" },
                specialRequirements: { type: "array", items: { type: "string" } },
                confidence: { type: "number" }
              },
              required: ["response", "installationSteps", "confidence"],
              additionalProperties: false
            }
          }
        }],
        tool_choice: { type: "function", function: { name: "create_method_statement" } },
        max_completion_tokens: calculateTokenLimit(extractCircuitCount(userMessage))
      }),
    });

    const data = await response.json();
    const toolCall = data.choices?.[0]?.message?.tool_calls?.[0];
    
    if (!toolCall) {
      throw new Error('No tool call from installer agent');
    }

    const structuredData = JSON.parse(toolCall.function.arguments);
    
    return new Response(JSON.stringify({
      response: structuredData.response || 'Installation guidance complete.',
      structuredData: {
        installationSteps: structuredData.installationSteps || [],
        supportIntervals: structuredData.supportIntervals || "",
        specialRequirements: structuredData.specialRequirements || []
      },
      confidence: structuredData.confidence || 0.90
    }), { headers: { ...corsHeaders, 'Content-Type': 'application/json' } });

  } catch (error) {
    console.error('Installer agent error:', error);
    return new Response(JSON.stringify({ 
      response: 'Unable to provide installation guidance.', 
      confidence: 0.3 
    }), {
      status: 500, 
      headers: { ...corsHeaders, 'Content-Type': 'application/json' }
    });
  }
});

// Phase 4: Adaptive Token Limits
function calculateTokenLimit(circuitCount: number): number {
  const baseTokens = 2000;
  const perCircuitTokens = 400;
  return Math.min(baseTokens + (circuitCount * perCircuitTokens), 10000);
}

function extractCircuitCount(message: string): number {
  const wayMatch = message.match(/(\d+)[\s-]?way/i);
  if (wayMatch) return parseInt(wayMatch[1]);
  
  const circuitMatch = message.match(/(\d+)\s+circuits?/i);
  if (circuitMatch) return parseInt(circuitMatch[1]);
  
  return 6;
}
