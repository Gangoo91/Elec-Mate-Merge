import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.39.3';
import { corsHeaders } from '../_shared/cors.ts';
import { emergencyProcedures } from '../_shared/emergencyProcedures.ts';

interface HealthSafetyAgentRequest {
  messages: Array<{ role: string; content: string }>;
  currentDesign?: any;
  context?: any;
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 90000); // INCREASED to 90s for deep RAG queries

  try {
    const { messages, currentDesign, context } = await req.json() as HealthSafetyAgentRequest;
    const openAIApiKey = Deno.env.get('OPENAI_API_KEY');
    const lovableApiKey = Deno.env.get('LOVABLE_API_KEY');

    if (!openAIApiKey) {
      throw new Error('OpenAI API key not configured');
    }
    if (!lovableApiKey) {
      throw new Error('LOVABLE_API_KEY not configured');
    }

    console.log('🦺 Health & Safety Agent: Analyzing work with RAG knowledge base');

    const latestMessage = messages[messages.length - 1]?.content || '';
    const circuitDetails = extractCircuitDetails(latestMessage, currentDesign, context);
    const workType = extractWorkType(latestMessage, currentDesign);

    // RAG: Query health_safety_knowledge via Supabase RPC
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    const supabase = createClient(supabaseUrl, supabaseKey);
    
    const ragQuery = `${workType} electrical work hazards safety risks controls PPE ACOP CDM EWR HASAWA`;
    console.log(`🔍 RAG: Searching H&S knowledge for: ${ragQuery}`);
    
    // Generate embedding for RAG query using Lovable AI
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

    if (!embeddingResponse.ok) {
      console.error('Embedding API error:', await embeddingResponse.text());
      throw new Error('Failed to generate embedding');
    }

    const embeddingData = await embeddingResponse.json();
    const queryEmbedding = embeddingData.data[0].embedding;
    console.log('✅ Embedding generated successfully');

    // Query RAG database using search_health_safety RPC
    const ragStartTime = Date.now();
    const { data: ragResults, error: ragError } = await supabase.rpc('search_health_safety', {
      query_embedding: queryEmbedding,
      match_threshold: 0.7,
      match_count: 8 // Reduced from 15 for faster processing
    });

    if (ragError) {
      console.error('RAG query error:', ragError);
      throw new Error('Failed to query H&S knowledge base');
    }

    const relevantGuidelines = ragResults || [];
    console.log(`✅ RAG query complete: ${relevantGuidelines.length} results in ${Date.now() - ragStartTime}ms`);

    // Build RAG-enhanced system prompt
    const ragContext = relevantGuidelines.length > 0
      ? relevantGuidelines.map((item: any, idx: number) => 
          `${idx + 1}. ${item.topic} (Source: ${item.source}, Similarity: ${(item.similarity * 100).toFixed(0)}%)\n${item.content}`
        ).join('\n\n')
      : 'No specific guidelines found - using general electrical safety knowledge.';

    // Extract context from previous agents
    const previousAgentOutputs = context?.previousAgentOutputs || [];
    const previousContext = previousAgentOutputs.length > 0
      ? `\n\n**PREVIOUS AGENT RESPONSES:**\n${previousAgentOutputs.map((a: any) => 
          `[${a.agent}]: ${a.response.substring(0, 300)}...`
        ).join('\n\n')}`
      : '';

    const systemPrompt = `You are a senior Health & Safety advisor specializing in electrical work, with 20 years experience in BS 7671, CDM 2015, HASAWA 1974, and HSE ACOPs.

CRITICAL RULES:
1. Always cite specific regulations AND ACOPs (e.g., "EWR 1989 Reg 4(3)", "CDM 2015 Reg 13 (ACOP L153)", "BS 7671 Reg 537.2")
2. Assess risks using 5x5 matrix: Likelihood (1-5) × Severity (1-5)
3. Provide SPECIFIC hazards for the work being done, not generic lists
4. Focus on ELECTRICAL-SPECIFIC hazards (arc flash, electric shock, underground cables)
5. Reference ACOP requirements where applicable (quasi-legal status)
6. Include emergency procedures for electrical incidents
7. Speak like a UK site safety officer - direct but friendly
8. IF other agents have provided design/installation info, reference their findings in your safety assessment${previousContext}`

**RELEVANT H&S KNOWLEDGE FROM DATABASE (${workType}):**
${ragContext}

**EMERGENCY PROCEDURES:**
Electric Shock: ${emergencyProcedures.electricShock.slice(0, 3).join(' → ')}
Arc Flash: ${emergencyProcedures.arcFlash.slice(0, 3).join(' → ')}

CURRENT WORK:
${circuitDetails}

OUTPUT FORMAT:
{
  "agent": "health-safety",
  "response": "Natural language safety guidance (conversational, UK electrician tone)",
  "riskAssessment": {
    "hazards": [
      {
        "hazard": "Electric shock during installation",
        "likelihood": 3,
        "severity": 5,
        "riskRating": 15,
        "controls": ["Safe isolation to EWR 1989", "Voltage indicator testing", "Lock-off devices"],
        "residualRisk": 6
      }
    ]
  },
  "requiredPPE": ["Insulated gloves (BS EN 60903)", "Safety boots (BS EN ISO 20345)"],
  "methodStatement": [
    "Isolate supply at consumer unit",
    "Lock-off and tag circuit",
    "Test for dead with voltage indicator",
    "Apply earthing clip before work",
    "Re-test after work completion"
  ],
  "citations": ["EWR 1989 Reg 4(3)", "CDM 2015 Reg 13", "BS 7671:2018 Reg 537.2"],
  "acopCitations": ["L153: CDM 2015 ACOP", "L138: Work at Height ACOP"],
  "emergencyProcedures": ["In case of electric shock: isolate supply, call 999, start CPR if required"],
  "confidence": 0.95
}

IMPORTANT: Provide 3-5 SPECIFIC hazards relevant to this exact work. Not generic checklists.`;

    // RETRY LOGIC: OpenAI can return empty content, retry up to 2 times
    let response;
    let data;
    let content;
    let retries = 0;
    const maxRetries = 2;

    while (retries <= maxRetries) {
      try {
        console.log(`🤖 Calling OpenAI (attempt ${retries + 1}/${maxRetries + 1})`);
        const openaiStartTime = Date.now();
        response = await fetch('https://api.openai.com/v1/chat/completions', {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${openAIApiKey}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            model: 'gpt-5-2025-08-07',
            messages: [
              { role: 'system', content: systemPrompt },
              { role: 'user', content: `${latestMessage}\n\nIMPORTANT: Respond with valid JSON matching the specified format.` }
            ],
            max_completion_tokens: 1500, // Reduced from 3000 for faster response
            response_format: { type: "json_object" }
          }),
          signal: controller.signal
        });

        if (!response.ok) {
          const errorText = await response.text();
          console.error('OpenAI API error:', errorText);
          throw new Error(`OpenAI API error: ${response.status}`);
        }

        data = await response.json();
        content = data.choices[0]?.message?.content;

        if (content) {
          console.log(`✅ OpenAI responded in ${Date.now() - openaiStartTime}ms`);
          console.log(`✅ H&S Agent: Got response on attempt ${retries + 1}`);
          break; // Success!
        }

        console.warn(`⚠️ Empty response from OpenAI (attempt ${retries + 1}/${maxRetries + 1})`);
        retries++;
        if (retries <= maxRetries) {
          await new Promise(resolve => setTimeout(resolve, 1000)); // Wait 1s before retry
        }
      } catch (error) {
        if (retries === maxRetries) throw error;
        console.warn(`⚠️ Error on attempt ${retries + 1}, retrying...`);
        retries++;
        await new Promise(resolve => setTimeout(resolve, 1000));
      }
    }

    if (!content) {
      throw new Error('No response from AI after 3 attempts');
    }

    const parsedResponse = JSON.parse(content);

    // Ensure structured output with ACOP citations
    const structuredResponse = {
      agent: 'health-safety',
      response: parsedResponse.response || "Safety assessment complete. Refer to risk assessment below.",
      structuredData: {
        riskAssessment: parsedResponse.riskAssessment || { hazards: [] },
        requiredPPE: parsedResponse.requiredPPE || [],
        methodStatement: parsedResponse.methodStatement || [],
        emergencyProcedures: parsedResponse.emergencyProcedures || []
      },
      reasoning: parsedResponse.reasoning || [],
      citations: parsedResponse.citations || [],
      acopCitations: parsedResponse.acopCitations || [],
      confidence: parsedResponse.confidence || 0.85,
      timestamp: new Date().toISOString()
    };

    console.log('✅ H&S Agent: Generated risk assessment with', structuredResponse.structuredData.riskAssessment.hazards.length, 'hazards');
    
    clearTimeout(timeoutId);

    return new Response(JSON.stringify(structuredResponse), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });

  } catch (error) {
    console.error('❌ Error in health-safety-agent:', error);
    return new Response(JSON.stringify({ 
      error: error instanceof Error ? error.message : 'Health & Safety agent failed',
      agent: 'health-safety',
      response: "I couldn't complete the safety assessment mate. Standard electrical safety precautions apply - isolate, test, lock-off.",
      confidence: 0.3
    }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});

function extractWorkType(message: string, currentDesign: any): string {
  const lowerMessage = message.toLowerCase();
  
  if (lowerMessage.includes('shower') || lowerMessage.includes('bathroom')) return 'shower';
  if (lowerMessage.includes('outdoor') || lowerMessage.includes('garden')) return 'outdoor';
  if (lowerMessage.includes('commercial') || lowerMessage.includes('factory') || lowerMessage.includes('industrial')) return 'commercial';
  if (lowerMessage.includes('excavat') || lowerMessage.includes('dig') || lowerMessage.includes('underground')) return 'excavation';
  if (lowerMessage.includes('consumer unit') || lowerMessage.includes('distribution board')) return 'consumer-unit';
  if (lowerMessage.includes('height') || lowerMessage.includes('ladder') || lowerMessage.includes('scaffold')) return 'height';
  if (lowerMessage.includes('confined') || lowerMessage.includes('duct') || lowerMessage.includes('void') || lowerMessage.includes('loft')) return 'confined';
  if (lowerMessage.includes('refurb') || lowerMessage.includes('demolit') || lowerMessage.includes('strip out')) return 'refurbishment';
  
  return 'general';
}

function extractCircuitDetails(message: string, currentDesign: any, context: any): string {
  let details = `User Query: ${message}\n\n`;

  if (currentDesign) {
    details += `Circuit Type: ${currentDesign.loadType || 'Not specified'}\n`;
    details += `Voltage: ${currentDesign.voltage || 230}V ${currentDesign.phases === 'three' ? '3-phase' : 'single-phase'}\n`;
    details += `Load: ${currentDesign.totalLoad || 'Unknown'}W\n`;
    details += `Cable Length: ${currentDesign.cableLength || 'Unknown'}m\n`;
    details += `Installation Method: ${currentDesign.installationMethod || 'Not specified'}\n`;
    details += `Location: ${currentDesign.location || 'Not specified'}\n`;
  }

  if (context?.conversationSummary) {
    details += `\nProject Context: ${context.conversationSummary.lastTopic}\n`;
    details += `Project Type: ${context.conversationState?.projectType || 'domestic'}\n`;
  }

  return details;
}
