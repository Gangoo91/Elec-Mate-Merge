import { corsHeaders } from '../_shared/deps.ts';
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.39.3';
import { intelligentRAGSearch } from './intelligentRAG.ts';

const INSTALLATION_CONTEXT = {
  domestic: `Design compliant with Part P Building Regulations and BS 7671:2018+A3:2024.
- RCD protection required for all circuits (Reg 411.3.3)
- Bathroom circuits must have 30mA RCD (Section 701)
- Consider future EV charging capability
- AFDDs required for new installations per Amendment 3
- Focus on safety in wet locations (bathrooms, outdoors)`,
  commercial: `Design per BS 7671:2018+A3:2024 for commercial installations.
- AFDDs mandatory for new commercial circuits (Amendment 3)
- Emergency lighting compliance per BS 5839
- Fire alarm integration considerations
- RCBOs recommended for all final circuits
- Higher fault levels expected in commercial supplies
- Consider surge protection (Reg 534.4)`,
  industrial: `Industrial installation per BS 7671:2018+A3:2024.
- Three-phase motor protection with Type D MCBs
- Consider motor starting currents (6-8x full load)
- SWA cabling for mechanical protection
- Higher fault currents - 10kA+ MCBs (Reg 536.1)
- Diversity calculations essential for multiple motors
- Regular inspection intervals per Reg 622
- G59/G99 agreements may be required for generation`
};

export async function handleBatchDesign(body: any, logger: any) {
  const { projectInfo, incomingSupply, circuits: inputCircuits, aiConfig } = body;
  const installationType = projectInfo.installationType || 'domestic';
  
  logger.info('💭 AI-Powered Batch Design Starting (RAG-First Mode)', {
    circuitCount: inputCircuits.length,
    installationType: projectInfo.installationType,
    hasAdditionalPrompt: !!projectInfo.additionalPrompt,
    model: aiConfig?.model || 'openai/gpt-5'
  });

  // Build query from structured inputs
  const query = buildDesignQuery(projectInfo, incomingSupply, inputCircuits);
  
  // Call main designer with RAG + AI (like RAMS does)
  const lovableApiKey = Deno.env.get('LOVABLE_API_KEY');
  if (!lovableApiKey) throw new Error('LOVABLE_API_KEY not configured');
  
  const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
  const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
  
  // STEP 1: RAG Search (like RAMS)
  logger.info('🔍 STEP 1: RAG Knowledge Retrieval');
  const ragResults = await intelligentRAGSearch({
    circuitType: 'general',
    searchTerms: extractSearchTerms(query, inputCircuits),
    expandedQuery: query,
    context: {
      ragPriority: aiConfig?.ragPriority || {
        design: 95,
        bs7671: 85,
        installation: 75
      }
    }
  });
  
  logger.info('✅ RAG Complete', {
    regulations: ragResults.regulations?.length || 0,
    designDocs: ragResults.designDocs?.length || 0
  });
  
  // STEP 2: Build System Prompt with RAG Knowledge
  logger.info('📝 STEP 2: Building AI Prompt with RAG Context');
  const systemPrompt = buildStructuredDesignPrompt(
    projectInfo,
    incomingSupply,
    inputCircuits,
    ragResults,
    installationType
  );
  
  // STEP 3: Call AI with Tool Calling (structured output)
  logger.info('🤖 STEP 3: Generating Design with AI + Structured Output');
  const response = await fetch('https://ai.gateway.lovable.dev/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${lovableApiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      model: aiConfig?.model || 'openai/gpt-5',
      messages: [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: query }
      ],
      max_completion_tokens: aiConfig?.maxTokens || 15000,
      tools: [{
        type: "function",
        function: {
          name: "design_circuits",
          description: "Return complete multi-circuit electrical design with BS 7671 compliance",
          parameters: {
            type: "object",
            properties: {
              circuits: {
                type: "array",
                items: {
                  type: "object",
                  properties: {
                    circuitNumber: { type: "number" },
                    name: { type: "string" },
                    loadType: { type: "string" },
                    loadPower: { type: "number" },
                    voltage: { type: "number" },
                    phases: { type: "string" },
                    cableSize: { type: "number" },
                    cpcSize: { type: "number" },
                    cableLength: { type: "number" },
                    installationMethod: { type: "string" },
                    protectionDevice: {
                      type: "object",
                      properties: {
                        type: { type: "string" },
                        rating: { type: "number" },
                        curve: { type: "string" },
                        kaRating: { type: "number" }
                      }
                    },
                    rcdProtected: { type: "boolean" },
                    rcdRating: { type: "number" },
                    afddRequired: { type: "boolean" },
                    calculations: {
                      type: "object",
                      properties: {
                        Ib: { type: "number" },
                        In: { type: "number" },
                        Iz: { type: "number" },
                        voltageDrop: {
                          type: "object",
                          properties: {
                            volts: { type: "number" },
                            percent: { type: "number" },
                            compliant: { type: "boolean" }
                          }
                        },
                        zs: { type: "number" },
                        maxZs: { type: "number" }
                      }
                    },
                    justifications: {
                      type: "object",
                      properties: {
                        cableSize: { type: "string" },
                        protection: { type: "string" },
                        rcd: { type: "string" }
                      }
                    },
                    warnings: {
                      type: "array",
                      items: { type: "string" }
                    }
                  }
                }
              },
              diversityBreakdown: {
                type: "object",
                properties: {
                  totalConnectedLoad: { type: "number" },
                  diversifiedLoad: { type: "number" },
                  overallDiversityFactor: { type: "number" },
                  reasoning: { type: "string" },
                  bs7671Reference: { type: "string" },
                  circuitDiversity: {
                    type: "array",
                    items: {
                      type: "object",
                      properties: {
                        circuitName: { type: "string" },
                        connectedLoad: { type: "number" },
                        diversityFactorApplied: { type: "number" },
                        diversifiedLoad: { type: "number" },
                        justification: { type: "string" }
                      }
                    }
                  }
                }
              },
              materials: {
                type: "array",
                items: {
                  type: "object",
                  properties: {
                    name: { type: "string" },
                    specification: { type: "string" },
                    quantity: { type: "string" },
                    unit: { type: "string" }
                  }
                }
              },
              consumerUnit: {
                type: "object",
                properties: {
                  type: { type: "string" },
                  mainSwitchRating: { type: "number" },
                  incomingSupply: { type: "object" }
                }
              }
            },
            required: ["circuits", "diversityBreakdown", "materials", "consumerUnit"]
          }
        }
      }],
      tool_choice: { type: "function", function: { name: "design_circuits" } }
    })
  });
  
  if (!response.ok) {
    const errorText = await response.text();
    logger.error('AI API error:', response.status, errorText);
    throw new Error(`AI API error: ${response.status}`);
  }
  
  const aiData = await response.json();
  const toolCall = aiData.choices?.[0]?.message?.tool_calls?.[0];
  if (!toolCall) {
    throw new Error('No tool call in AI response');
  }
  
  const designData = JSON.parse(toolCall.function.arguments);
  
  logger.info('✅ Design Complete', {
    circuits: designData.circuits?.length || 0,
    tokensUsed: aiData.usage?.total_tokens || 0
  });
  
  // STEP 4: Return structured design (NO costEstimate)
  return new Response(JSON.stringify({
    success: true,
    design: {
      projectName: projectInfo.name,
      location: projectInfo.location,
      clientName: projectInfo.clientName,
      electricianName: projectInfo.electricianName,
      installationType: projectInfo.installationType,
      totalLoad: designData.circuits.reduce((sum: number, c: any) => sum + c.loadPower, 0),
      diversityApplied: true,
      diversityFactor: designData.diversityBreakdown?.overallDiversityFactor || 0.75,
      diversityBreakdown: designData.diversityBreakdown,
      circuits: designData.circuits,
      consumerUnit: designData.consumerUnit,
      materials: designData.materials,
      practicalGuidance: extractPracticalGuidance(designData.circuits)
    },
    metadata: {
      ragCalls: ragResults.regulations?.length || 0,
      model: aiConfig?.model || 'openai/gpt-5',
      tokensUsed: aiData.usage?.total_tokens
    }
  }), { 
    headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
  });
}

// Helper functions
function buildDesignQuery(projectInfo: any, supply: any, circuits: any[]): string {
  return `Design ${circuits.length} circuits for ${projectInfo.name}.
  
Incoming supply: ${supply.voltage}V ${supply.phases}, Ze=${supply.Ze}Ω, ${supply.earthingSystem}.
Prospective fault current: ${supply.pscc || 3500}A.

Circuits required:
${circuits.map((c: any, i: number) => `${i+1}. ${c.name} - ${c.loadPower}W, ${c.cableLength}m, ${c.phases} phase${c.specialLocation !== 'none' ? ` (${c.specialLocation})` : ''}`).join('\n')}

${projectInfo.additionalPrompt || ''}`;
}

function extractSearchTerms(query: string, circuits: any[]): string[] {
  const terms = ['circuit design', 'cable sizing', 'voltage drop', 'protection devices', 'BS 7671'];
  
  // Add circuit-specific terms
  circuits.forEach((c: any) => {
    if (c.loadType) terms.push(c.loadType);
    if (c.specialLocation && c.specialLocation !== 'none') terms.push(c.specialLocation);
  });
  
  return terms;
}

function buildStructuredDesignPrompt(
  projectInfo: any, 
  supply: any, 
  circuits: any[], 
  ragResults: any, 
  type: string
): string {
  const regulations = ragResults.regulations?.slice(0, 15).map((r: any) => 
    `${r.regulation_number}: ${r.content}`
  ).join('\n\n') || 'No specific regulations retrieved';
  
  return `You are a senior electrical design engineer specializing in BS 7671:2018+A3:2024 compliant installations.

INSTALLATION TYPE: ${type}
${INSTALLATION_CONTEXT[type] || ''}

INCOMING SUPPLY DETAILS:
- Voltage: ${supply.voltage}V ${supply.phases}
- External Earth Fault Loop Impedance (Ze): ${supply.Ze}Ω
- Earthing System: ${supply.earthingSystem}
- Prospective Fault Current (PFC): ${supply.pscc || 3500}A
- Main Switch Rating: ${supply.mainSwitchRating || 100}A

CIRCUITS TO DESIGN (${circuits.length} total):
${circuits.map((c: any, i: number) => `${i+1}. ${c.name}
   - Load Type: ${c.loadType}
   - Power: ${c.loadPower}W (${(c.loadPower/1000).toFixed(1)}kW)
   - Cable Run: ${c.cableLength}m
   - Phases: ${c.phases}
   - Location: ${c.specialLocation || 'general'}`).join('\n\n')}

BS 7671 KNOWLEDGE BASE (Top 15 regulations retrieved via RAG):
${regulations}

CRITICAL DESIGN REQUIREMENTS:

1. **Cable Sizing (Reg 433.1)**:
   - Calculate design current (Ib) for each circuit
   - Select protective device rating (In) where In ≥ Ib
   - Determine cable current-carrying capacity (Iz) where Iz ≥ In
   - Apply derating factors for ambient temperature and grouping
   - Select appropriate cable CSA (mm²) and CPC size

2. **Voltage Drop Compliance (Reg 525)**:
   - Calculate actual voltage drop in volts and percentage
   - Lighting circuits: Max 3% (6.9V at 230V)
   - Power circuits: Max 5% (11.5V at 230V)
   - Use cable resistance values from BS 7671 Appendix 4

3. **Earth Fault Protection (Reg 411.3.2)**:
   - Calculate circuit Zs (Ze + R1+R2)
   - Verify Zs < maximum permitted Zs for chosen protective device
   - Ensure disconnection time ≤ 0.4s (final circuits) or ≤ 5s (distribution)

4. **RCD Protection (Reg 411.3.3)**:
   - ALL socket outlets ≤32A require 30mA RCD
   - Bathrooms (Section 701): 30mA RCD mandatory
   - Outdoor circuits: 30mA RCD mandatory
   - Specify RCBO or separate RCD

5. **Diversity Calculation (Appendix 15)**:
   - Apply diversity factors per BS 7671 Appendix 15
   - Provide clear reasoning for each circuit's diversity
   - Calculate total diversified load for main switch sizing
   - Include diversity breakdown with BS 7671 references

6. **Materials List**:
   - Specify cable types (T&E, SWA, FP200) based on location
   - Include quantities with units (metres, number of)
   - List all protective devices
   - Include consumer unit specification

7. **Justifications**:
   - Cite specific BS 7671 regulation numbers
   - Explain cable size selection with calculations
   - Justify protective device type, rating, and curve
   - Explain RCD requirements based on location/circuit type

IMPORTANT NOTES:
- ALL calculations must be numerically accurate
- ALL regulation citations must be specific (e.g., "Reg 411.3.3")
- Provide practical justifications, not just regulation text
- Consider installation method impact on current capacity
- Account for voltage drop over cable length
- Ensure all circuits meet disconnection time requirements

Use the design_circuits function to return your complete design with all required data.`;
}

function extractPracticalGuidance(circuits: any[]): string[] {
  const guidance = [
    'Complete all required tests per BS 7671 Part 6 before energising circuits',
    'Fill in Electrical Installation Certificate (EIC) with Schedule of Test Results',
    `Total of ${circuits.length} circuits designed - verify consumer unit has sufficient ways`,
    'Ensure all RCD/RCBO devices are tested monthly by end user',
    'Verify actual Ze at origin matches design assumption before installation'
  ];
  
  // Add circuit-specific guidance
  if (circuits.some((c: any) => c.rcdProtected)) {
    guidance.push('RCD protection required for multiple circuits - consider use of RCBOs for selectivity');
  }
  
  if (circuits.some((c: any) => c.loadType?.includes('shower'))) {
    guidance.push('Electric showers require bonding to supplementary equipotential bonding per Section 701');
  }
  
  return guidance;
}
