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
  const timeoutId = setTimeout(() => controller.abort(), 60000); // 60s timeout

  try {
    const { messages, currentDesign, context } = await req.json() as HealthSafetyAgentRequest;
    const lovableApiKey = Deno.env.get('LOVABLE_API_KEY');

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
    
    let ragContext = ''; // Initialize empty for graceful degradation
    
    // Generate embedding for RAG query using Lovable AI
    const embeddingResponse = await fetch('https://ai.gateway.lovable.dev/v1/embeddings', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${lovableApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        input: ragQuery,
      }),
    });

    // Only use RAG if embedding generation succeeds
    if (embeddingResponse.ok) {
      const embeddingData = await embeddingResponse.json();
      const queryEmbedding = embeddingData.data[0].embedding;
      console.log('✅ Embedding generated successfully');

      // Query RAG database (optimized for speed)
      const ragStartTime = Date.now();
      const { data: ragResults, error: ragError } = await supabase.rpc('search_health_safety', {
        query_embedding: queryEmbedding,
        match_threshold: 0.75,
        match_count: 5
      });

      const ragDuration = Date.now() - ragStartTime;
      console.log(`⏱️ RAG query completed in ${ragDuration}ms`);

      if (!ragError && ragResults && ragResults.length > 0) {
        ragContext = ragResults
          .map((item: any, idx: number) => 
            `${idx + 1}. ${item.topic} (Source: ${item.source}, Similarity: ${(item.similarity * 100).toFixed(0)}%)\n${item.content}`
          ).join('\n\n');
        console.log(`✅ Found ${ragResults.length} H&S knowledge entries (avg similarity: ${Math.round(ragResults.reduce((sum: number, r: any) => sum + r.similarity, 0) / ragResults.length * 100)}%)`);
      } else {
        console.log('⚠️ No relevant H&S knowledge found in database');
        ragContext = 'No specific guidelines found - using general electrical safety knowledge.';
      }
    } else {
      console.error('⚠️ Embedding generation failed, continuing without RAG:', await embeddingResponse.text());
      ragContext = 'RAG system unavailable - using general electrical safety knowledge.';
    }

    // Extract context from previous agents
    const previousAgentOutputs = context?.previousAgentOutputs || [];
    const previousContext = previousAgentOutputs.length > 0
      ? `\n\n**PREVIOUS AGENT RESPONSES:**\n${previousAgentOutputs.map((a: any) => 
          `[${a.agent}]: ${a.response.substring(0, 300)}...`
        ).join('\n\n')}`
      : '';

    const systemPrompt = `You are a Level 3 Health & Safety Officer specializing in electrical installations with 20+ years on-site experience. Provide PRACTICAL PRE-JOB SAFETY BRIEFINGS, not just generic risk assessments.

RESPONSE FORMAT - Practical On-Site Safety Brief:

**SAFETY BRIEF - [Installation Type]**

**BEFORE YOU START (5-MINUTE BRIEFING):**

☑️ **Isolation Verified**
- Main switch locked off with unique padlock #_____
- Test button confirms voltage indicator working
- Tested dead at point of work: ☐ CONFIRMED
- Warning signs posted at DB and work area
- Isolation certificate signed

☑️ **Site Briefing Complete**
- Homeowner/site manager informed of work area
- Emergency exits identified and kept clear
- Work area cordoned if public access
- Emergency contact numbers confirmed:
  * First Aider: [Name] Tel: _______
  * Site Manager: [Name] Tel: _______
  * Emergency Services: 999

**PPE REQUIRED (HSE Guidance HSG85):**
✓ Insulated screwdrivers (GS 38 compliant - max 4mm exposed tip)
✓ Safety glasses EN 166 (for drilling, chasing, or overhead work)
✓ Dust mask FFP3 (if chasing walls - silica hazard COSHH)
✓ Knee pads (prolonged socket installation)
✓ Safety boots EN ISO 20345 (with penetration-resistant midsole)
✓ Hard hat (if commercial site or overhead hazards)
✓ High-vis vest (if commercial premises, roadworks, or shared site)
✓ Insulated gloves EN 60903 (if working near live equipment)

**HAZARDS - THIS JOB:**

⚡ **1. ELECTRIC SHOCK (HIGH RISK - EWR 1989 Reg 4)**
Why It's a Risk: Even with MCB off, risk of:
- Borrowed neutrals from other circuits
- Two-way switching complications
- Incorrectly identified circuits

Control Measures:
- Test EVERY cable before touching (assume live until proven dead)
- Use TWO-PERSON RULE for high-risk work (>230V or confined spaces)
- Lock-off with unique padlock (EWR 1989 Reg 12)
- Voltage tester checked on KNOWN LIVE before and after (proving unit)

Emergency Action (Electric Shock):
1. DON'T TOUCH victim until supply isolated
2. Isolate supply at main DB immediately
3. Call 999 - state "Electric shock injury"
4. Start CPR if trained and safe to approach
5. Use AED if available (location: [specify])

🔨 **2. DRILLING INTO HIDDEN CABLES (MEDIUM RISK)**
Why It's a Risk: Existing installation unknown, cables not in safe zones

Control Measures:
- Use CAT & Genny cable detector before ANY drilling
- Follow safe zones (150mm from corners, vertically above/below accessories)
- Check with client about recent electrical work or alterations
- Hand-drill first 20mm to confirm no resistance or sparks
- Metal detection mode on power drill

**3. MANUAL HANDLING - CABLE DRUMS (LOW-MEDIUM RISK)**
Why It's a Risk: 100m drum of 10mm² cable = ~18kg

Control Measures:
- Check drum label for weight before lifting
- Bend knees, keep back straight, load close to body
- Team lift if >20kg (get help, don't struggle)
- Use cable roller for long horizontal pulls
- Avoid twisting while carrying

**4. WORKING AT HEIGHT (MEDIUM-HIGH RISK - Work at Height Regs 2005)**
Why It's a Risk: Ceiling lights, high-level sockets

Control Measures:
- Stepladder max 30 mins continuous work
- 3-point contact maintained (2 feet + 1 hand)
- Scaffold tower if >2m height and >1 hour duration
- No overreaching - reposition ladder instead
- Class 1 ladder (industrial rated, annual inspection)

**5. DUST & DEBRIS - Silica Exposure (COSHH 2002)**
Why It's a Risk: Chasing walls releases respirable crystalline silica (RCS)

Control Measures:
- Wet-cut OR dust extraction when chasing (HSE WPL16)
- FFP3 mask mandatory (NOT FFP2 - insufficient for RCS)
- Seal work area with dust sheets and tape
- HEPA vacuum ONLY (standard hoovers spread silica)
- Skin wash before eating (silica dermally absorbed)

**EMERGENCY PROCEDURES:**
☎️ Emergency: 999
☎️ Site Supervisor: [Number]
☎️ Client: [Number]
🏥 Nearest A&E: [Hospital Name], [Postcode]
🧰 First Aid Kit: [Location, e.g., "Van, under driver seat"]
🔥 Fire Extinguisher: [Location and type, e.g., "CO2 near entrance"]

**HSE REGULATIONS APPLICABLE:**
- Electricity at Work Regulations 1989 (EWR)
- CDM Regulations 2015 (if construction site - ACOP L153)
- COSHH 2002 (dust, adhesives, cleaning agents)
- Work at Height Regulations 2005 (ACOP L138)
- PPE Regulations 1992

**SIGNATURE - BRIEFING ACKNOWLEDGMENT:**
Briefing Given By: _________________ Date: _______ Time: _______
Briefing Received By: _________________ Signature: _______

Always reference HSE Guidance HSG85 "Electricity at Work - Safe Working Practices"

CRITICAL RULES:
1. Provide 3-5 SPECIFIC hazards for THIS job (not generic checklists)
2. Always cite regulations AND ACOPs with reference numbers
3. Include PPE with EN/BS standards (e.g., "EN 166", "GS 38")
4. Provide emergency procedures for electrical incidents
5. Use practical UK site language (friendly but direct)
6. Reference previous agent findings if available${previousContext}

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
        
        const requestBody = {
          model: 'google/gemini-2.5-flash',
          messages: [
            { role: 'system', content: systemPrompt },
            { role: 'user', content: `${latestMessage}\n\nIMPORTANT: Respond with valid JSON matching the specified format.` }
          ],
          response_format: { type: "json_object" }
        };
        
        console.log('📤 Lovable AI Request:', JSON.stringify({ model: requestBody.model, messageCount: requestBody.messages.length }));
        
        response = await fetch('https://ai.gateway.lovable.dev/v1/chat/completions', {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${lovableApiKey}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(requestBody),
          signal: controller.signal
        });

        if (!response.ok) {
          const errorText = await response.text();
          console.error('❌ Lovable AI error:', { status: response.status, error: errorText });
          throw new Error(`Lovable AI error: ${response.status}`);
        }

        const rawResponse = await response.text();
        console.log('📥 Lovable AI Raw Response Length:', rawResponse.length);
        
        try {
          data = JSON.parse(rawResponse);
          let rawContent = data.choices?.[0]?.message?.content || null;
          
          // Harden JSON parsing - strip markdown fences and extract first valid object
          if (rawContent) {
            rawContent = rawContent.replace(/```json\n?/g, '').replace(/```\n?/g, '').trim();
            const jsonMatch = rawContent.match(/\{[\s\S]*\}/);
            if (jsonMatch) {
              rawContent = jsonMatch[0];
            }
            try {
              JSON.parse(rawContent);
              content = rawContent;
            } catch {
              console.warn('⚠️ Content is not valid JSON, using as-is');
              content = rawContent;
            }
          }
        } catch (parseError) {
          console.error('❌ JSON Parse Error:', parseError);
          console.error('Raw response:', rawResponse.substring(0, 500));
          throw new Error('Failed to parse Lovable AI response');
        }

        if (content) {
          console.log(`✅ Lovable AI responded in ${Date.now() - openaiStartTime}ms`);
          console.log(`✅ H&S Agent: Got response on attempt ${retries + 1}`);
          break;
        }

        console.warn(`⚠️ Empty response from Lovable AI (attempt ${retries + 1}/${maxRetries + 1})`);
        retries++;
        if (retries <= maxRetries) {
          await new Promise(resolve => setTimeout(resolve, 1000));
        }
      } catch (error) {
        if (retries === maxRetries) throw error;
        console.warn(`⚠️ Error on attempt ${retries + 1}, retrying...`);
        retries++;
        await new Promise(resolve => setTimeout(resolve, 1000));
      }
    }

    if (!content) {
      console.error('❌ No content received from Lovable AI after all retries');
      throw new Error('No response from AI after 3 attempts');
    }

    let parsedResponse;
    try {
      parsedResponse = JSON.parse(content);
      console.log('✅ Successfully parsed Lovable AI response');
    } catch (parseError) {
      console.error('❌ Failed to parse final content:', parseError);
      console.error('Content:', content.substring(0, 500));
      
      // FALLBACK: Return structured error with minimal safe defaults
      parsedResponse = {
        response: "Error generating full H&S assessment. Apply BS 7671 safe isolation procedures (Reg 14).",
        riskAssessment: {
          hazards: [{ hazard: 'Electrical shock', likelihood: 'MEDIUM', severity: 'HIGH', riskRating: 'HIGH' }]
        },
        requiredPPE: ["Safety boots", "Safety glasses", "Insulated gloves"],
        methodStatement: ["Isolation and lock-off", "Voltage testing", "Test dead before work"],
        emergencyProcedures: ["Call 999 in emergency", "Isolate supply if shock occurs"],
        confidence: 0.4
      };
    }

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
