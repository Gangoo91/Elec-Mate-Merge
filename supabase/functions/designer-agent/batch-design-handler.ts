import { corsHeaders } from '../_shared/deps.ts';
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.39.3';
import { intelligentRAGSearch } from '../_shared/intelligent-rag.ts';
import { parseQueryEntities } from '../_shared/query-parser.ts';

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

  // STEP 0: Parse additional prompt for circuits and constraints
  logger.info('🔍 STEP 0: Parse User Prompt');
  const { inferredCircuits, specialRequirements, installationConstraints } = 
    extractCircuitsFromPrompt(projectInfo.additionalPrompt || '', inputCircuits);

  const allCircuits = [...inputCircuits, ...inferredCircuits];

  logger.info('Parsed prompt', {
    inferredCircuits: inferredCircuits.length,
    specialRequirements,
    installationConstraints,
    totalCircuits: allCircuits.length
  });

  // Build query from structured inputs + parsed context
  const query = buildDesignQuery(projectInfo, incomingSupply, allCircuits, specialRequirements, installationConstraints);
  
  // Call main designer with RAG + AI (like RAMS does)
  const lovableApiKey = Deno.env.get('LOVABLE_API_KEY');
  if (!lovableApiKey) throw new Error('LOVABLE_API_KEY not configured');
  
  const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
  const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
  
  // STEP 1: Multi-Query RAG Search (circuit-type-specific)
  logger.info('🔍 STEP 1: Multi-Query RAG Retrieval');

  const uniqueLoadTypes = [...new Set(allCircuits.map((c: any) => c.loadType))];
  logger.info('Unique load types detected', { loadTypes: uniqueLoadTypes });

  const ragSearches = uniqueLoadTypes.slice(0, 8).map((loadType: string) => 
    intelligentRAGSearch({
      circuitType: loadType,
      searchTerms: [loadType, 'circuit design', ...extractSearchTerms(query, allCircuits)],
      expandedQuery: `${loadType} circuit design requirements ${installationType}`,
      context: {
        ragPriority: aiConfig?.ragPriority || {
          design: 95,
          bs7671: 85,
          installation: 75
        }
      }
    })
  );

  // Also do a general search for diversity and consumer unit
  ragSearches.push(
    intelligentRAGSearch({
      circuitType: 'general',
      searchTerms: ['diversity', 'consumer unit', 'main switch', 'Appendix 15'],
      expandedQuery: `electrical installation diversity calculations`,
      context: { 
        ragPriority: aiConfig?.ragPriority || {
          design: 95,
          bs7671: 85,
          installation: 75
        }
      }
    })
  );

  const allRAGResults = await Promise.all(ragSearches);

  // Merge and deduplicate regulations
  const mergedRegulations = allRAGResults
    .flatMap(r => r.regulations || [])
    .reduce((acc: any[], reg: any) => {
      if (!acc.find((r: any) => r.regulation_number === reg.regulation_number)) {
        acc.push(reg);
      }
      return acc;
    }, [])
    .sort((a: any, b: any) => (b.hybrid_score || 0) - (a.hybrid_score || 0))
    .slice(0, 25);

  logger.info('✅ Multi-Query RAG Complete', {
    searches: ragSearches.length,
    uniqueLoadTypes,
    totalRegulations: mergedRegulations.length,
    regulationNumbers: mergedRegulations.slice(0, 5).map((r: any) => r.regulation_number)
  });

  const ragResults = {
    regulations: mergedRegulations,
    designDocs: allRAGResults[0]?.designDocs || []
  };
  
  // STEP 2: Build System Prompt with RAG Knowledge + Parsed Context
  logger.info('📝 STEP 2: Building AI Prompt with RAG Context');
  const systemPrompt = buildStructuredDesignPrompt(
    projectInfo,
    incomingSupply,
    allCircuits,
    ragResults,
    installationType,
    specialRequirements,
    installationConstraints
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
      max_completion_tokens: aiConfig?.maxTokens || (allCircuits.length > 12 ? 20000 : 15000),
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
  
  let aiData;
  try {
    aiData = await response.json();
  } catch (parseError) {
    logger.error('Failed to parse AI response JSON', parseError);
    throw new Error('Invalid response from AI service');
  }
  
  let toolCall = aiData.choices?.[0]?.message?.tool_calls?.[0];
  
  // Retry once if no tool call (AI might have returned text instead)
  if (!toolCall) {
    logger.warn('No tool call in first response, retrying with stricter instruction');
    
    const retryResponse = await fetch('https://ai.gateway.lovable.dev/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${lovableApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: aiConfig?.model || 'openai/gpt-5',
        messages: [
          { role: 'system', content: systemPrompt + '\n\nCRITICAL: You MUST call the design_circuits function. Do not output any text or markdown. Only use the tool.' },
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
                circuits: { type: "array", items: { type: "object" } },
                diversityBreakdown: { type: "object" },
                materials: { type: "array", items: { type: "object" } },
                consumerUnit: { type: "object" }
              },
              required: ["circuits", "diversityBreakdown", "materials", "consumerUnit"]
            }
          }
        }],
        tool_choice: { type: "function", function: { name: "design_circuits" } }
      })
    });
    
    if (retryResponse.ok) {
      const retryData = await retryResponse.json();
      toolCall = retryData.choices?.[0]?.message?.tool_calls?.[0];
    }
  }
  
  // Final check - if still no tool call, try parsing content as JSON
  if (!toolCall) {
    const content = aiData.choices?.[0]?.message?.content;
    if (content) {
      try {
        const parsed = JSON.parse(content);
        if (parsed.circuits) {
          logger.info('Recovered design from content JSON');
          toolCall = { function: { arguments: content } };
        }
      } catch (e) {
        logger.error('Failed to parse content as JSON', e);
      }
    }
    
    if (!toolCall) {
      logger.error('AI did not return structured design after retry', {
        hasContent: !!aiData.choices?.[0]?.message?.content,
        contentPreview: aiData.choices?.[0]?.message?.content?.substring(0, 200)
      });
      throw new Error('AI did not return structured design (no tool call). Please try again.');
    }
  }
  
  const designData = JSON.parse(toolCall.function.arguments);
  
  // Validate AI output
  logger.info('🔍 Validating AI design output');
  const validationWarnings: string[] = [];
  
  designData.circuits?.forEach((circuit: any, i: number) => {
    if (!circuit.calculations?.Ib) {
      const warning = `Circuit ${i+1} (${circuit.name}): Missing Ib calculation`;
      logger.warn(warning);
      validationWarnings.push(warning);
    }
    if (!circuit.calculations?.voltageDrop?.volts) {
      const warning = `Circuit ${i+1} (${circuit.name}): Missing voltage drop`;
      logger.warn(warning);
      validationWarnings.push(warning);
    }
    if (circuit.calculations?.voltageDrop?.percent > 5.5) {
      const warning = `Circuit ${i+1} (${circuit.name}): Voltage drop ${circuit.calculations.voltageDrop.percent}% exceeds 5%`;
      logger.warn(warning);
      validationWarnings.push(warning);
    }
    if (!circuit.justifications?.cableSize) {
      const warning = `Circuit ${i+1} (${circuit.name}): Missing cable size justification`;
      logger.warn(warning);
      validationWarnings.push(warning);
    }
  });
  
  logger.info('✅ Design Complete', {
    circuits: designData.circuits?.length || 0,
    tokensUsed: aiData.usage?.total_tokens || 0,
    validationWarnings: validationWarnings.length
  });
  
  // STEP 4: Return structured design (NO costEstimate)
  logger.info('✅ Returning design to client');
  
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
function extractCircuitsFromPrompt(additionalPrompt: string, existingCircuits: any[]): {
  inferredCircuits: any[];
  specialRequirements: string[];
  installationConstraints: string[];
} {
  if (!additionalPrompt?.trim()) {
    return { inferredCircuits: [], specialRequirements: [], installationConstraints: [] };
  }

  const entities = parseQueryEntities(additionalPrompt);
  const inferredCircuits: any[] = [];
  const specialRequirements: string[] = [];
  const installationConstraints: string[] = [];
  
  // Extract special requirements from entities
  if (entities.specialRequirements) {
    specialRequirements.push(...entities.specialRequirements);
  }
  
  // Extract installation constraints
  if (entities.installationConstraints) {
    installationConstraints.push(...entities.installationConstraints);
  }
  
  // Add location-based requirements
  if (entities.location === 'bathroom') {
    specialRequirements.push('⚠️ Section 701: Bathroom installation - 30mA RCD mandatory, IP rating zones, bonding required');
  }
  if (entities.location === 'outdoor') {
    specialRequirements.push('⚠️ Reg 411.3.3: Outdoor installation - 30mA RCD mandatory, IP65+ rating, SWA cable');
  }
  
  // Add earthing system requirements
  if (entities.earthingSystem === 'TT') {
    specialRequirements.push('⚠️ TT System: 30mA RCD on all circuits, earth electrode resistance critical');
  }
  
  // Add high temperature derating
  if (entities.ambientTemperature && entities.ambientTemperature > 30) {
    installationConstraints.push(`🔧 High ambient temperature (${entities.ambientTemperature}°C): Apply temperature derating factor`);
  }
  
  // Infer circuits if power + load type mentioned
  if (entities.power && entities.loadType) {
    inferredCircuits.push({
      name: `${entities.loadType} (from prompt)`,
      loadType: entities.loadType,
      loadPower: entities.power,
      cableLength: entities.distance || 20,
      phases: entities.phases || 'single',
      specialLocation: entities.location || 'none'
    });
  }
  
  return { inferredCircuits, specialRequirements, installationConstraints };
}

function getCircuitTypeHints(loadType: string, location?: string): string {
  const hints: Record<string, string> = {
    'shower': 'Section 701 (bathrooms), 30mA RCD mandatory, bonding required, min 10mm² cable typical',
    'ev_charger': 'Section 722, dedicated circuit, Type A RCD required, 6mm² minimum, Mode 3 compliance',
    'ev-charger': 'Section 722, dedicated circuit, Type A RCD required, 6mm² minimum, Mode 3 compliance',
    'cooker': 'Reg 433.1.204 diversity (10A + 30% remainder + 5A socket), 10mm² typical, 40-50A MCB',
    'socket': 'Ring final: 2.5mm² + 32A MCB | Radial: 4mm² + 32A or 2.5mm² + 20A MCB',
    'sockets': 'Ring final: 2.5mm² + 32A MCB | Radial: 4mm² + 32A or 2.5mm² + 20A MCB',
    'lighting': '1.5mm² cable, 6A MCB Type B, 3% voltage drop limit (6.9V at 230V)',
    'outdoor': '30mA RCD mandatory (411.3.3), SWA cable, IP65+ rating, burial depth 600mm',
    'heat_pump': 'Dedicated circuit, 16mm² typical, 63A MCB, surge protection (534.4)',
    'immersion': '16A MCB, 2.5mm² cable typical, timer control, off-peak tariff consideration',
    'motor': 'Type D MCB for starting current (6-8x FLC), DOL or star-delta starting',
    'garage': 'RCD protection recommended, mechanical protection for exposed cables'
  };
  
  const locationHints: Record<string, string> = {
    'bathroom': 'Section 701: IP rating zones (IPX4 min), 30mA RCD, supplementary bonding',
    'outdoor': 'Reg 411.3.3: RCD mandatory, IP65+, burial depth 600mm, SWA cable',
    'garage': 'RCD recommended, mechanical protection, consider EV charger future-proofing'
  };
  
  let hint = hints[loadType] || 'Standard circuit design per BS 7671';
  if (location && locationHints[location]) {
    hint += ` | ${locationHints[location]}`;
  }
  
  return hint;
}

function buildDesignQuery(
  projectInfo: any, 
  supply: any, 
  circuits: any[],
  specialRequirements: string[] = [],
  installationConstraints: string[] = []
): string {
  const circuitList = circuits.length > 0 
    ? `Circuits required (${circuits.length} total):\n${circuits.map((c: any, i: number) => 
        `${i+1}. ${c.name} - ${c.loadPower}W (${(c.loadPower/1000).toFixed(1)}kW), ${c.cableLength}m, ${c.phases} phase${c.specialLocation !== 'none' ? ` (${c.specialLocation})` : ''}`
      ).join('\n')}`
    : 'Please infer appropriate circuits from the project description and requirements.';
    
  let query = `Design circuits for ${projectInfo.name}.
  
Incoming supply: ${supply.voltage}V ${supply.phases}, Ze=${supply.Ze}Ω, ${supply.earthingSystem}.
Prospective fault current: ${supply.pscc || 3500}A.

${circuitList}`;

  if (specialRequirements.length > 0) {
    query += `\n\nSpecial Requirements:\n${specialRequirements.map(r => `- ${r}`).join('\n')}`;
  }

  if (installationConstraints.length > 0) {
    query += `\n\nInstallation Constraints:\n${installationConstraints.map(c => `- ${c}`).join('\n')}`;
  }

  if (projectInfo.additionalPrompt) {
    query += `\n\n${projectInfo.additionalPrompt}`;
  }

  return query;
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
  type: string,
  specialRequirements: string[] = [],
  installationConstraints: string[] = []
): string {
  const regulations = ragResults.regulations?.slice(0, 25).map((r: any) => 
    `${r.regulation_number}: ${r.content.substring(0, 300)}`
  ).join('\n\n') || 'No specific regulations retrieved';
  
  // Generate circuit-specific hints
  const circuitHints = circuits.length > 0
    ? circuits.map((c: any, i: number) => {
        const hint = getCircuitTypeHints(c.loadType, c.specialLocation);
        return `${i+1}. ${c.name} (${c.loadType}): ${hint}`;
      }).join('\n')
    : '';
  
  return `You are a senior electrical design engineer specializing in BS 7671:2018+A3:2024 compliant installations.

INSTALLATION TYPE: ${type}
${INSTALLATION_CONTEXT[type] || ''}

INCOMING SUPPLY DETAILS:
- Voltage: ${supply.voltage}V ${supply.phases}
- External Earth Fault Loop Impedance (Ze): ${supply.Ze}Ω
- Earthing System: ${supply.earthingSystem}
- Prospective Fault Current (PFC): ${supply.pscc || 3500}A
- Main Switch Rating: ${supply.mainSwitchRating || 100}A

${specialRequirements.length > 0 ? `SPECIAL REQUIREMENTS:
${specialRequirements.map(r => `${r}`).join('\n')}

` : ''}${installationConstraints.length > 0 ? `INSTALLATION CONSTRAINTS:
${installationConstraints.map(c => `${c}`).join('\n')}

` : ''}CIRCUITS TO DESIGN (${circuits.length} total):
${circuits.length > 0 
  ? circuits.map((c: any, i: number) => `${i+1}. ${c.name}
   - Load Type: ${c.loadType}
   - Power: ${c.loadPower}W (${(c.loadPower/1000).toFixed(1)}kW)
   - Cable Run: ${c.cableLength}m
   - Phases: ${c.phases}
   - Location: ${c.specialLocation || 'general'}`).join('\n\n')
  : 'No specific circuits provided. Infer appropriate circuits from the project requirements and additional prompt.'}

${circuitHints ? `CIRCUIT-SPECIFIC REGULATION HINTS:
${circuitHints}

` : ''}BS 7671 KNOWLEDGE BASE (Top 25 regulations retrieved via multi-query RAG):
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
${circuits.length === 0 ? '- Since no circuits were provided, infer appropriate circuits from the project type and brief' : ''}

You MUST call the design_circuits function to return your complete design. Do not output text or markdown - only call the tool.`;
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
