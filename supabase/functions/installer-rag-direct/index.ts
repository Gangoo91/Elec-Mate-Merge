import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.49.4';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

const OPENAI_API_KEY = Deno.env.get('OPENAI_API_KEY');

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  const startTime = Date.now();
  let ragStartTime = startTime;
  let aiStartTime = 0;

  try {
    const { 
      query, 
      projectDetails, 
      previousAgentOutputs, 
      currentDesign,
      selectedCircuits, // NEW: array of circuit objects (Phase 4)
      sharedRegulations 
    } = await req.json();
    
    if (!query) {
      return new Response(
        JSON.stringify({ success: false, error: 'Query is required' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    console.log('🚀 installer-rag-direct started', { query: query.substring(0, 100) });

    // Log designer context if available
    if (previousAgentOutputs && previousAgentOutputs.length > 0) {
      console.log('📦 Received designer context:', {
        agents: previousAgentOutputs.map((a: any) => a.agent),
        hasDesign: !!currentDesign,
        sharedRegCount: sharedRegulations?.length || 0
      });
    }

    // Connect to Supabase
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    const supabase = createClient(supabaseUrl, supabaseKey);

    // DIRECT TABLE QUERIES - With proper keyword extraction
    console.log('📚 Starting direct table RAG retrieval...');
    ragStartTime = Date.now();

    // Extract meaningful keywords from query
    const extractKeywords = (query: string): string[] => {
      const stopWords = ['a', 'an', 'the', 'for', 'to', 'in', 'on', 'at', 'from', 'with', 'create', 'comprehensive', 'method', 'statement'];
      return query
        .toLowerCase()
        .split(/\s+/)
        .filter(word => word.length > 3 && !stopWords.includes(word))
        .slice(0, 10); // Limit to top 10 keywords
    };

    // Extract keywords and build RAG query
    const keywords = extractKeywords(query);
    console.log('🔍 Extracted keywords:', keywords);
    
    // Use single primary keyword for simple OR query to avoid PostgreSQL syntax errors
    const primaryKeyword = keywords[0] || 'installation';
    
    // RAG 1: Practical Work Intelligence (real installation data)
    const { data: pwData, error: pwError } = await supabase
      .from('practical_work_intelligence')
      .select('*')
      .or(`primary_topic.ilike.%${primaryKeyword}%,installation_method.ilike.%${primaryKeyword}%,equipment_category.ilike.%${primaryKeyword}%`)
      .limit(95);

    if (pwError) console.error('PW query error:', pwError);

    // Handle regulations - reuse shared or query
    let regulations = [];

    if (sharedRegulations && sharedRegulations.length > 0) {
      console.log('📚 Reusing shared regulations from designer:', sharedRegulations.length);
      regulations = sharedRegulations.map((reg: any) => ({
        content: reg.content || reg.regulation_text || '',
        regulation_number: reg.regulation_number || reg.number,
        source_table: 'bs7671_intelligence',
        similarity: 0.95 // High confidence - came from designer
      }));
    } else {
      // Query bs7671_intelligence table directly with single keyword search
      const { data: regData, error: regError } = await supabase
        .from('bs7671_intelligence')
        .select('*')
        .or(`regulation_text.ilike.%${primaryKeyword}%,regulation_number.ilike.%${primaryKeyword}%`)
        .limit(85);

      if (regError) console.error('Regs query error:', regError);

      regulations = (regData || []).map((row: any) => ({
        content: row.regulation_text || '',
        regulation_number: row.regulation_number,
        source_table: 'bs7671_intelligence',
        similarity: 0.85
      }));
    }

    // Transform to RAGResult format (same as shared module)
    const practicalWork = (pwData || []).map((row: any) => ({
      content: row.primary_topic || row.installation_method || '',
      primary_topic: row.primary_topic,
      keywords: row.keywords,
      equipment_category: row.equipment_category,
      tools_required: row.tools_required,
      bs7671_regulations: row.bs7671_regulations,
      source_table: 'practical_work_intelligence',
      similarity: 0.85 // Default similarity for direct query
    }));

    const ragTime = Date.now() - ragStartTime;

    console.log('✅ RAG retrieved', {
      practicalCount: practicalWork.length,
      regsCount: regulations.length,
      ragMs: ragTime
    });

    // Phase 4: Inject designer context for multi-circuit designs
    let designerContextPrompt = '';
    if (selectedCircuits && selectedCircuits.length > 0) {
      const circuitSpecs = selectedCircuits.map((circuit: any, idx: number) => {
        return `
Circuit ${idx + 1}: ${circuit.name}
- Cable: ${circuit.cableSize}mm² / ${circuit.cpcSize}mm² CPC (${circuit.cableType})
- Length: ${circuit.cableLength}m
- Installation Method: ${circuit.installationMethod}
- Protection: ${circuit.protectionSummary}
- RCD: ${circuit.rcdProtected ? 'Yes (30mA)' : 'No'}
- Load: ${circuit.loadPower}W (${circuit.phases}-phase, ${circuit.voltage}V)
- Design Current: ${circuit.calculations.designCurrent}A
`;
      }).join('\n');

      designerContextPrompt = `\n\n**CRITICAL: DESIGN ALREADY COMPLETED BY AI DESIGNER**
The following circuit design(s) have been calculated and MUST be used:

${circuitSpecs}

DO NOT recalculate cable sizes, protection devices, or installation methods. 
Use these exact specifications in your installation steps.
If installing multiple circuits, provide sequential installation steps for each circuit.`;

      console.log('✅ Using designer specifications for circuits:', selectedCircuits.map((c: any) => c.name));
    } else if (currentDesign && currentDesign.circuits && currentDesign.circuits.length > 0) {
      // Fallback: Single circuit from old format
      const circuit = currentDesign.circuits[0]; // Use first circuit as reference
      designerContextPrompt = `\n\n**CRITICAL: DESIGN ALREADY COMPLETED BY AI DESIGNER**
The following circuit design has been calculated and MUST be used:
- Cable Size: ${circuit.cableSize || 'Not specified'}
- Protection Device: ${circuit.protection || 'Not specified'}
- Installation Method: ${currentDesign.installationMethod || circuit.installationMethod || 'Not specified'}
- RCD Protection: ${circuit.rcdProtection ? 'Required' : 'Not required'}
- Load: ${circuit.loadPower || circuit.load || 'Not specified'}W

DO NOT recalculate cable sizes or protection devices. Use these exact specifications in your installation steps.`;

      console.log('✅ Using legacy single-circuit designer context:', {
        cable: circuit.cableSize,
        protection: circuit.protection,
        method: currentDesign.installationMethod || circuit.installationMethod
      });
    }

    // Smart fallback if RAG fails - with job-specific guidance
    let ragContext = '';
    if (practicalWork.length === 0 && regulations.length === 0) {
      console.warn('⚠️ RAG returned no results - generating job-specific fallback');
      
      // Extract job type from query
      const isShower = /shower/i.test(query);
      const isSockets = /socket|ring/i.test(query);
      const isLighting = /light|lamp/i.test(query);
      const isSWA = /swa|armoured/i.test(query);
      const isCooker = /cooker|oven/i.test(query);
      const isEV = /ev|electric vehicle|charger/i.test(query);
      
      let specificGuidance = '';
      if (isShower) {
        specificGuidance = `
SHOWER CIRCUIT INSTALLATION:
- Run cable from consumer unit to bathroom location via safe zones
- Use 10mm² T&E or 6mm² if short run with RCD
- Install 45A DP isolator pull-cord outside bathroom zones
- Bond supplementary earthing in bathroom (Section 701)
- Test Ze, R1+R2, and RCD trip time`;
      } else if (isSWA) {
        specificGuidance = `
SWA CABLE INSTALLATION:
- Trench depth minimum 600mm under paths, 450mm under gardens
- Install warning tape 150mm above cable
- Use 50mm sand bedding below and above cable
- SWA glands both ends with banjo earth connections
- Test armour continuity and insulation resistance`;
      } else if (isSockets) {
        specificGuidance = `
SOCKET CIRCUIT INSTALLATION:
- 2.5mm² T&E for ring finals, max 100m²
- Install 32A Type B MCB with 30mA RCD
- Connect in ring at consumer unit (both ends to same MCB)
- Test ring continuity (R1, R2, Rn) before energizing
- IR test at 500V DC, minimum 1MΩ`;
      } else if (isLighting) {
        specificGuidance = `
LIGHTING CIRCUIT INSTALLATION:
- 1.5mm² T&E for lighting circuits, max 8 points per circuit
- Install 6A Type B MCB
- Use correct loop-in or junction box wiring
- Earth all metal fittings and switches
- Test polarity and IR at each light point`;
      } else if (isCooker) {
        specificGuidance = `
COOKER CIRCUIT INSTALLATION:
- Cable size based on load (typically 6mm² for <10kW)
- Install 32A-45A DP control unit within 2m of cooker
- Run cable in safe zones or use mechanical protection
- Connect earth to cooker chassis
- Test Zs and polarity`;
      } else if (isEV) {
        specificGuidance = `
EV CHARGER INSTALLATION:
- Dedicated 32A radial from consumer unit
- 6mm² SWA if outdoor run, 6mm² T&E if indoor
- Install Type A RCD or integral RCD in charger
- Earth electrode may be required for TT systems
- OpenTherm/Wi-Fi setup and commissioning`;
      }
      
      ragContext = `[FALLBACK MODE - ${specificGuidance ? 'Job-Specific' : 'General'} UK Electrical Guidance]
${specificGuidance || `- Follow BS 7671:2018+A2:2022 (18th Edition) requirements throughout
- Select cable sizes using Appendix 4 current-carrying capacity tables
- Install appropriate protective devices (MCBs Type B/C, RCDs 30mA for sockets)
- Ensure proper earthing and bonding per Sections 411 and 544
- Test and certify per GN3 (Inspection & Testing)
- Use safe isolation procedures (lock-off/tag-out)`}`;
    }

    // Build compact RAG context - take top results, no filtering
    const pwContext = practicalWork
      .slice(0, 12)
      .map((pw: any, idx: number) => {
        const tools = pw.tools_required ? `\nTools: ${pw.tools_required.join(', ')}` : '';
        const regs = pw.bs7671_regulations ? `\nBS 7671: ${pw.bs7671_regulations.join(', ')}` : '';
        return `[PW${idx + 1}] ${pw.keywords?.join(', ') || 'Installation Guidance'}\n${pw.content}${tools}${regs}`;
      })
      .join('\n\n');

    const regsContext = regulations
      .slice(0, 12)
      .map((reg: any, idx: number) => {
        return `[REG${idx + 1}] ${reg.regulation_number || 'BS7671'}: ${reg.content}`;
      })
      .join('\n\n');

    // Construct strict JSON schema for OpenAI - matching MethodStep interface
    const jsonSchema = {
      type: "object",
      properties: {
        success: { type: "boolean" },
        steps: {
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
                    riskLevel: { type: "string", enum: ["low", "medium", "high"] },
                    linkedHazards: { type: "array", items: { type: "string" } }
                  },
                  required: ["stepNumber", "title", "description", "safetyRequirements", "equipmentNeeded", "estimatedDuration", "riskLevel"],
                  additionalProperties: false
          }
        },
        tips: { type: "array", items: { type: "string" } },
        materials: { type: "array", items: { type: "string" } },
        testingProcedures: { type: "array", items: { type: "string" } },
        equipmentSchedule: {
          type: "array",
          items: {
            type: "object",
            properties: {
              item: { type: "string" },
              spec: { type: "string" },
              qty: { type: "string" }
            },
            required: ["item", "spec", "qty"],
            additionalProperties: false
          }
        },
        siteLogistics: {
          type: "object",
          properties: {
            access: { type: "string" },
            isolation: { type: "string" },
            permits: { type: "string" }
          },
          required: ["access", "isolation", "permits"],
          additionalProperties: false
        },
        competencyRequirements: {
          type: "object",
          properties: {
            roles: { type: "array", items: { type: "string" } },
            trainingRequired: { type: "array", items: { type: "string" } }
          },
          required: ["roles", "trainingRequired"],
          additionalProperties: false
        },
        citations: {
          type: "array",
          items: {
            type: "object",
            properties: {
              source: { type: "string", enum: ["practical", "bs7671"] },
              id: { type: "string" },
              label: { type: "string" }
            },
            required: ["source", "id", "label"],
            additionalProperties: false
          }
        }
      },
      required: ["success", "steps", "tips", "materials", "testingProcedures", "equipmentSchedule", "siteLogistics", "competencyRequirements", "citations"],
      additionalProperties: false
    };

    const systemPrompt = `You are an expert UK electrician creating Method Statements for installation work.
${designerContextPrompt}

**CRITICAL RULES:**
- You MUST generate at least 8-12 detailed installation steps - this is MANDATORY
- Each step must include: stepNumber, title, description, safetyRequirements, equipmentNeeded, estimatedDuration, riskLevel, qualifications, linkedHazards
- Steps should follow logical installation sequence: planning → isolation → installation → testing → commissioning
- Include specific tools (e.g., "SDS drill", "Cable avoidance tool", "Insulation resistance tester")
- Include specific materials (e.g., "10mm² T&E cable", "32A Type B MCB", "20mm oval conduit")
- Use ONLY UK English spelling and terminology
- ONLY cite regulations provided in the context - NEVER hallucinate regulation numbers
- Return ONLY valid JSON matching the exact schema provided

**STEP GENERATION REQUIREMENTS:**
1. Pre-work steps: Survey, permits, isolation, testing dead
2. Installation steps: Route selection, fixing, termination
3. Post-work steps: Testing (continuity, IR, Ze, RCD), certification
4. Each step must have realistic duration (e.g., "45 minutes", "2 hours")
5. Each step must have appropriate risk level (low/medium/high)
6. Include qualifications needed (e.g., "18th Edition qualified", "Approved Electrician")
7. Link hazards to specific steps where they occur

**AVAILABLE CONTEXT:**

PRACTICAL WORK INTELLIGENCE:
${pwContext || ragContext || 'No practical work data available'}

BS 7671 REGULATIONS:
${regsContext || 'No regulations data available'}

**PROJECT DETAILS:**
${projectDetails ? JSON.stringify(projectDetails, null, 2) : 'No project details provided'}

Generate a comprehensive Method Statement in the exact JSON format specified. MINIMUM 8 STEPS REQUIRED.`;

    const userPrompt = `Create a detailed Method Statement for: ${query}

Include:
- 8-12 step-by-step installation procedures (MANDATORY MINIMUM 8 STEPS)
- Each step MUST have: stepNumber, title, description, safetyRequirements, equipmentNeeded, qualifications, estimatedDuration, riskLevel, linkedHazards
- Required tools and materials for each step (be specific: "10mm² T&E", "32A MCB", "Fluke 1653B tester")
- Testing procedures (IR, continuity, polarity, RCD, earth loop impedance)
- Equipment schedule with specifications
- Site logistics (access, isolation, permits)
- Competency requirements (roles and training needed)
- Citations to the practical work and BS 7671 regulations provided above

Use the RAG context above to ensure accuracy. Return ONLY the JSON object.

CRITICAL: Generate AT LEAST 8 detailed steps. More is better (target 10-12 steps).`;

    console.log('🤖 Calling OpenAI ChatGPT Mini 5.0 with strict JSON schema...');
    aiStartTime = Date.now();
    let lastHeartbeat = aiStartTime;

    let response;
    try {
      response = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${OPENAI_API_KEY}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model: 'gpt-5-mini-2025-08-07',
          messages: [
            { role: 'system', content: systemPrompt },
            { role: 'user', content: userPrompt }
          ],
          response_format: {
            type: "json_schema",
            json_schema: {
              name: "method_statement",
              strict: true,
              schema: jsonSchema
            }
          },
          max_completion_tokens: 16000
        }),
      });
    } catch (fetchError) {
      console.error('❌ OpenAI fetch failed:', fetchError);
      return new Response(JSON.stringify({
        success: false,
        error: 'Failed to connect to OpenAI API',
        diagnostics: {
          pwCount: practicalWork.length,
          regsCount: regulations.length,
          ragMs: ragTime,
          fetchError: fetchError instanceof Error ? fetchError.message : String(fetchError)
        }
      }), {
        status: 503,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      });
    }

    const aiTime = Date.now() - aiStartTime;
    console.log('✅ OpenAI response received', { aiMs: aiTime });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('❌ OpenAI error:', response.status, errorText);
      
      return new Response(
        JSON.stringify({
          success: false,
          error: `OpenAI API error: ${response.status}`,
          diagnostics: {
            pwCount: practicalWork.length,
            regsCount: regulations.length,
            ragMs: ragTime,
            errorPreview: errorText.substring(0, 500)
          }
        }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const aiData = await response.json();
    const content = aiData.choices[0].message.content;

    let parsedResult;
    try {
      parsedResult = JSON.parse(content);
      
      // VALIDATION: Check step count
      if (!parsedResult.steps || parsedResult.steps.length < 6) {
        console.error('❌ INSUFFICIENT STEPS GENERATED:', parsedResult.steps?.length || 0);
        console.error('Query was:', query.substring(0, 200));
        console.error('RAG context length:', (pwContext + regsContext).length);
        
        return new Response(JSON.stringify({
          success: false,
          error: `Insufficient steps generated (${parsedResult.steps?.length || 0}). Minimum 6 required.`,
          diagnostics: {
            query: query.substring(0, 200),
            ragContextLength: (pwContext + regsContext).length,
            pwCount: practicalWork.length,
            regsCount: regulations.length,
            keywords: keywords
          }
        }), {
          status: 500,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        });
      }
      
      console.log('✅ Step count validation passed:', parsedResult.steps.length);
      
      // Validate designer specs were referenced
      if (designerContextPrompt && parsedResult.steps) {
        const cableSize = currentDesign?.circuits?.[0]?.cableSize;
        const stepsText = JSON.stringify(parsedResult.steps).toLowerCase();
        
        if (cableSize && !stepsText.includes(cableSize.toLowerCase())) {
          console.warn('⚠️ AI may not have used designer cable size:', cableSize);
        } else if (cableSize) {
          console.log('✅ Designer cable size confirmed in steps:', cableSize);
        }
      }
    } catch (parseError) {
      console.error('❌ JSON parse failed, attempting repair pass...', parseError);

      // REPAIR PASS - try to fix malformed JSON
      const repairResponse = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${OPENAI_API_KEY}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model: 'gpt-5-mini-2025-08-07',
          messages: [
            {
              role: 'system',
              content: 'Convert the following text to valid JSON matching the exact schema. Fix any malformed JSON.'
            },
            {
              role: 'user',
              content: content
            }
          ],
          response_format: {
            type: "json_schema",
            json_schema: {
              name: "method_statement",
              strict: true,
              schema: jsonSchema
            }
          },
          max_completion_tokens: 16000
        }),
      });

      if (repairResponse.ok) {
        const repairData = await repairResponse.json();
        parsedResult = JSON.parse(repairData.choices[0].message.content);
        console.log('✅ Repair pass succeeded');
        
        // RE-RUN VALIDATION after repair
        if (!parsedResult.steps || parsedResult.steps.length < 6) {
          console.error('❌ Repair pass produced insufficient steps:', parsedResult.steps?.length || 0);
          return new Response(JSON.stringify({
            success: false,
            error: `Repair failed: only ${parsedResult.steps?.length || 0} steps generated`,
            diagnostics: {
              query: query.substring(0, 200),
              pwCount: practicalWork.length,
              regsCount: regulations.length,
              repairAttempted: true,
              stepsCount: parsedResult.steps?.length || 0
            }
          }), {
            status: 500,
            headers: { ...corsHeaders, 'Content-Type': 'application/json' }
          });
        }
      } else {
        throw new Error('Repair pass also failed');
      }
        return new Response(
          JSON.stringify({
            success: false,
            error: 'Failed to generate valid structured data',
            diagnostics: {
              pwCount: practicalWork.length,
              regsCount: regulations.length,
              ragMs: ragTime,
              aiMs: aiTime,
              rawPreview: content.substring(0, 1000)
            }
          }),
          { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }
    }

    // Normalize output
    const normalizedResult = {
      ...parsedResult,
      success: true,
      steps: parsedResult.steps || [],
      tips: parsedResult.tips || [],
      materials: parsedResult.materials || [],
      testingProcedures: parsedResult.testingProcedures || [],
      equipmentSchedule: parsedResult.equipmentSchedule || [],
      siteLogistics: parsedResult.siteLogistics || { access: '', isolation: '', permits: '' },
      competencyRequirements: {
        roles: parsedResult.competencyRequirements?.roles || [],
        trainingRequired: parsedResult.competencyRequirements?.trainingRequired || []
      },
      citations: parsedResult.citations || []
    };

    const totalTime = Date.now() - startTime;

    console.log('✅ Method Statement generated', {
      totalMs: totalTime,
      ragMs: ragTime,
      aiMs: aiTime,
      stepsCount: normalizedResult.steps.length,
      citationsCount: normalizedResult.citations.length
    });

    // Calculate average scores (similarity is 0-1 range from shared module)
    const avgPwScore = practicalWork.length > 0
      ? practicalWork.reduce((sum: number, pw: any) => sum + (pw.similarity || 0), 0) / practicalWork.length
      : 0;
    const avgRegScore = regulations.length > 0
      ? regulations.reduce((sum: number, reg: any) => sum + (reg.similarity || 0), 0) / regulations.length
      : 0;

    return new Response(
      JSON.stringify({
        ...normalizedResult,
        diagnostics: {
          pwCount: practicalWork.length,
          regsCount: regulations.length,
          avgPwScore: avgPwScore.toFixed(2),
          avgRegScore: avgRegScore.toFixed(2),
          ragMs: ragTime,
          aiMs: aiTime,
          totalMs: totalTime
        }
      }),
      { 
        status: 200, 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
      }
    );

  } catch (error) {
    console.error('❌ installer-rag-direct error:', error);
    
    return new Response(
      JSON.stringify({
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error',
        diagnostics: {
          totalMs: Date.now() - startTime
        }
      }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});
