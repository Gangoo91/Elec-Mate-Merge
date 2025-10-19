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

  // PHASE 1: Enhanced logging for debugging
  logger.info('✅ STEP 0 Complete - Parsed user requirements', {
    manualCircuits: inputCircuits.length,
    inferredCircuits: inferredCircuits.length,
    totalCircuits: allCircuits.length,
    specialRequirements: specialRequirements.length,
    installationConstraints: installationConstraints.length,
    circuitTypes: allCircuits.map((c: any) => c.loadType),
    specialReqsSummary: specialRequirements.slice(0, 3)
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
  logger.info('Unique load types detected', { 
    loadTypes: uniqueLoadTypes,
    circuitCount: allCircuits.length 
  });

  // PHASE 2: Add timeout wrapper for RAG reliability
  const { withTimeout, Timeouts } = await import('../_shared/timeout.ts');
  const { loadCoreRegulationsCache } = await import('./core-regulations-cache.ts');
  
  const ragSearchesWithTimeout = uniqueLoadTypes.slice(0, 8).map((loadType: string) => 
    withTimeout(
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
      }),
      15000, // 15s timeout per search
      `RAG search for ${loadType}`
    ).catch(error => {
      logger.warn(`⚠️ RAG search timeout for ${loadType}`, { error: error.message });
      return { regulations: [], designDocs: [], searchMethod: 'timeout' };
    })
  );

  // Also do a general search for diversity and consumer unit
  ragSearchesWithTimeout.push(
    withTimeout(
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
      }),
      15000, // 15s timeout
      'RAG search for diversity'
    ).catch(error => {
      logger.warn('⚠️ RAG diversity search timeout', { error: error.message });
      return { regulations: [], designDocs: [], searchMethod: 'timeout' };
    })
  );

  logger.info('📡 Starting parallel RAG searches', {
    searchCount: ragSearchesWithTimeout.length,
    timeout: '15s per search',
    maxTotalTime: '~45s'
  });

  const startTime = Date.now();
  const allRAGResults = await Promise.all(ragSearchesWithTimeout);
  const ragElapsedMs = Date.now() - startTime;
  
  logger.info('✅ All RAG searches complete', {
    totalTimeMs: ragElapsedMs,
    successfulSearches: allRAGResults.filter((r: any) => r.regulations?.length > 0).length,
    timeouts: allRAGResults.filter((r: any) => r.searchMethod === 'timeout').length
  });

  // PHASE 2: Merge and deduplicate regulations (by reg number AND content hash)
  let mergedRegulations: any[] = [];
  
  try {
    const allRegs = allRAGResults.flatMap(r => r.regulations || []);
    const seenNumbers = new Set<string>();
    const seenHashes = new Set<string>();
    
    // Safe two-pass deduplication using for-of loop
    for (const reg of allRegs) {
      const regNumber = reg.regulation_number;
      const contentHash = hashContent(reg.content || '');
      
      // Skip if we've seen this regulation number or content hash
      if (seenNumbers.has(regNumber) || seenHashes.has(contentHash)) {
        continue;
      }
      
      // Add to tracking sets and results
      seenNumbers.add(regNumber);
      seenHashes.add(contentHash);
      mergedRegulations.push(reg);
    }
    
    // Sort by score and limit
    mergedRegulations = mergedRegulations
      .sort((a: any, b: any) => (b.hybrid_score || 0) - (a.hybrid_score || 0))
      .slice(0, 25);
      
  } catch (dedupError) {
    logger.error('🚨 Deduplication failed, using empty array (fallback will activate)', { 
      error: dedupError instanceof Error ? dedupError.message : String(dedupError) 
    });
    mergedRegulations = [];
  }

  logger.info('✅ Multi-Query RAG Complete', {
    searches: ragSearchesWithTimeout.length,
    uniqueLoadTypes,
    totalRegulations: mergedRegulations.length,
    topRegulations: mergedRegulations.slice(0, 5).map((r: any) => ({
      number: r.regulation_number,
      score: r.hybrid_score
    }))
  });

  // PHASE 2: Fallback to core regulations if insufficient results
  let ragResults;
  if (mergedRegulations.length < 5) {
    logger.warn('⚠️ Insufficient RAG results, loading core regulations cache', {
      foundRegulations: mergedRegulations.length,
      requiredMinimum: 5
    });
    
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    const supabase = await import('../_shared/deps.ts').then(m => 
      m.createClient(supabaseUrl, supabaseKey)
    );
    
    try {
      const coreRegs = await loadCoreRegulationsCache(supabase);
      logger.info('✅ Loaded core regulations fallback', { count: coreRegs.length });
      
      ragResults = {
        regulations: [...mergedRegulations, ...coreRegs].slice(0, 25),
        designDocs: allRAGResults[0]?.designDocs || []
      };
    } catch (fallbackError) {
      logger.error('🚨 Core regulations cache failed', { error: fallbackError });
      ragResults = {
        regulations: mergedRegulations,
        designDocs: allRAGResults[0]?.designDocs || []
      };
    }
  } else {
    ragResults = {
      regulations: mergedRegulations,
      designDocs: allRAGResults[0]?.designDocs || []
    };
  }
  
  logger.info('📚 Final RAG knowledge base', {
    regulations: ragResults.regulations.length,
    designDocs: ragResults.designDocs.length
  });
  
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
  
  // PHASE 1: Log prompt details for debugging
  logger.info('✅ STEP 2 Complete - System prompt built', {
    promptLength: systemPrompt.length,
    promptLines: systemPrompt.split('\n').length,
    includesRAG: systemPrompt.includes('BS 7671'),
    circuitHints: allCircuits.length,
    specialRequirements: specialRequirements.length
  });
  
  // STEP 3: Call AI with Tool Calling (structured output)
  logger.info('🤖 STEP 3: Generating Design with AI + Structured Output');
  
  // ✨ SIMPLIFIED SCHEMA - Matching AI RAMS Pattern (5 simple fields)
  const requestBody = {
    model: aiConfig?.model || 'openai/gpt-5-mini',
    messages: [
      { 
        role: 'system', 
          content: `You are an expert electrical designer specialising in BS 7671:2018+A3:2024 compliant circuit design.

KNOWLEDGE BASE (${ragResults.regulations.length} verified regulations):
${ragResults.regulations.map((r: any) => `${r.regulation_number}: ${r.content.substring(0, 200)}...`).join('\n\n')}

YOUR ROLE: Design compliant electrical circuits with complete details for each circuit.

INSTRUCTIONS:
1. For each circuit in the "circuits" array, include:
   - name, circuitNumber, loadType, loadPower, phases
   - cableSize (mm²), cpcSize (mm²), cableLength (m)
   - protectionDevice: { type, rating, curve, kaRating }
   - rcdProtected (boolean), afddRequired (boolean)
   - calculations: { Ib, In, Iz, voltageDrop: { volts, percent, compliant, limit }, zs, maxZs }
   - justifications: { cableSize, protection, rcd }
   - warnings: [] (array of strings)
   - installationMethod (e.g., "Clipped Direct", "In Conduit")

2. In the "materials" array, list required materials with:
   - name, specification, quantity, unit

3. In the "warnings" array, include any compliance notes or important advisories

4. In the "response" field, provide a brief conversational summary in UK English

Reference BS 7671 regulations (e.g., "433.1.1", "525.1", "411.3.2") in justifications.

Return your design using the provided tool schema.`
      },
      { role: 'user', content: query }
    ],
    max_completion_tokens: aiConfig?.maxTokens || 8000,
    tools: [{
      type: "function",
      function: {
        name: "design_circuits",
        description: "Return electrical circuit design with BS 7671 compliance. You MUST call this function.",
        parameters: {
          type: "object",
          properties: {
            response: { 
              type: "string",
              description: "Conversational summary of the design in UK English"
            },
            circuits: { 
              type: "array",
              description: "Array of BS 7671 compliant circuit designs",
              items: {
                type: "object",
                properties: {
                  name: { type: "string", description: "Circuit name (e.g., 'Kitchen Ring', 'Shower Circuit')" },
                  circuitNumber: { type: "string", description: "Circuit number (e.g., 'C1', 'C2')" },
                  loadType: { type: "string", description: "Load type (e.g., 'Ring Final', 'Radial', 'Lighting')" },
                  loadPower: { type: "number", description: "Load power in watts" },
                  phases: { type: "number", description: "1 for single phase, 3 for three phase" },
                  cableSize: { type: "string", description: "Cable size (e.g., '2.5mm² twin & earth')" },
                  cpcSize: { type: "string", description: "CPC size (e.g., '1.5mm²')" },
                  cableLength: { type: "number", description: "Cable length in metres" },
                  protectionDevice: {
                    type: "object",
                    properties: {
                      type: { type: "string", description: "Device type (e.g., 'MCB', 'RCBO')" },
                      rating: { type: "string", description: "Rating (e.g., '32A')" },
                      curve: { type: "string", description: "Curve type (e.g., 'Type B', 'Type C')" },
                      kaRating: { type: "string", description: "Breaking capacity (e.g., '6kA')" }
                    },
                    required: ["type", "rating"]
                  },
                  rcdProtected: { type: "boolean", description: "Is RCD protection required" },
                  afddRequired: { type: "boolean", description: "Is AFDD required per 421.1.7" },
                  calculations: {
                    type: "object",
                    properties: {
                      Ib: { type: "number", description: "Design current in amps" },
                      In: { type: "number", description: "Nominal current in amps" },
                      Iz: { type: "number", description: "Cable current carrying capacity in amps" },
                      voltageDrop: { type: "number", description: "Voltage drop in volts" },
                      voltageDropPercent: { type: "number", description: "Voltage drop as percentage" },
                      zs: { type: "number", description: "Fault loop impedance in ohms" },
                      maxZs: { type: "number", description: "Maximum permitted Zs in ohms" },
                      passesVoltageDrop: { type: "boolean" },
                      passesZs: { type: "boolean" }
                    },
                    required: ["Ib", "In", "Iz", "voltageDrop", "zs", "maxZs"]
                  },
                  justifications: {
                    type: "array",
                    items: {
                      type: "object",
                      properties: {
                        regulation: { type: "string", description: "BS 7671 regulation number" },
                        requirement: { type: "string", description: "What the regulation requires" },
                        compliance: { type: "string", description: "How this design complies" }
                      },
                      required: ["regulation", "requirement", "compliance"]
                    }
                  },
                  warnings: { 
                    type: "array", 
                    items: { type: "string" },
                    description: "Circuit-specific warnings"
                  },
                  installationMethod: { type: "string", description: "Installation method (e.g., 'Method C - clipped direct')" }
                },
                required: ["name", "loadType", "cableSize", "protectionDevice", "calculations", "justifications"]
              }
            },
            materials: { 
              type: "array",
              description: "Required materials with specifications",
              items: {
                type: "object",
                properties: {
                  item: { type: "string", description: "Material name" },
                  specification: { type: "string", description: "Full specification" },
                  quantity: { type: "number", description: "Quantity required" },
                  unit: { type: "string", description: "Unit (e.g., 'metres', 'units')" },
                  notes: { type: "string", description: "Additional notes" }
                },
                required: ["item", "specification", "quantity"]
              }
            },
            warnings: { 
              type: "array",
              description: "General compliance warnings or notes",
              items: { type: "string" }
            }
          },
          required: ["response", "circuits", "materials"]
        }
      }
    }],
    tool_choice: "auto"
  };
  
  // PHASE 1: Log AI request details (without exposing keys)
  logger.info('📤 Sending AI request', {
    model: requestBody.model,
    maxTokens: requestBody.max_completion_tokens,
    systemPromptLength: systemPrompt.length,
    userQueryLength: query.length,
    toolsConfigured: requestBody.tools.length
  });
  
  const aiStartTime = Date.now();
  const response = await fetch('https://ai.gateway.lovable.dev/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${lovableApiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(requestBody)
  });
  
  const aiElapsedMs = Date.now() - aiStartTime;
  
  // PHASE 1: Log AI response status
  logger.info('📥 AI response received', {
    status: response.status,
    timeMs: aiElapsedMs,
    ok: response.ok
  });
  
  if (!response.ok) {
    const errorText = await response.text();
    logger.error('🚨 AI API error', { 
      status: response.status, 
      statusText: response.statusText,
      errorPreview: errorText.substring(0, 500)
    });
    
    // Surface rate limit and payment errors clearly
    if (response.status === 429) {
      throw new Error("Rate limit exceeded. Please try again in a moment.");
    }
    if (response.status === 402) {
      throw new Error("AI credits exhausted. Please add credits to your Lovable workspace.");
    }
    
    throw new Error(`AI API error: ${response.status} - ${errorText.substring(0, 200)}`);
  }
  
  let aiData;
  try {
    aiData = await response.json();
    logger.info('✅ AI response parsed successfully', {
      hasChoices: !!aiData.choices,
      choiceCount: aiData.choices?.length || 0,
      hasUsage: !!aiData.usage,
      tokensUsed: aiData.usage?.total_tokens || 0
    });
  } catch (parseError) {
    logger.error('🚨 Failed to parse AI response JSON', { 
      error: parseError instanceof Error ? parseError.message : String(parseError) 
    });
    throw new Error('Invalid response from AI service');
  }
  
  let toolCall = aiData.choices?.[0]?.message?.tool_calls?.[0];
  
  // PHASE 1: Enhanced logging for tool call detection
  logger.info('🔍 Checking for tool call', {
    hasToolCall: !!toolCall,
    hasMessage: !!aiData.choices?.[0]?.message,
    hasContent: !!aiData.choices?.[0]?.message?.content,
    contentPreview: aiData.choices?.[0]?.message?.content?.substring(0, 100)
  });
  
  // Retry once if no tool call (AI might have returned text instead)
  if (!toolCall) {
    logger.warn('⚠️ No tool call in first response, retrying');
    
    const retryResponse = await fetch('https://ai.gateway.lovable.dev/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${lovableApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: aiConfig?.model || 'openai/gpt-5-mini',
        messages: [
          { 
            role: 'system', 
            content: `You are an expert electrical designer specialising in BS 7671:2018+A3:2024 compliant circuit design.

KNOWLEDGE BASE (${ragResults.regulations.length} verified regulations):
${ragResults.regulations.map((r: any) => `${r.regulation_number}: ${r.content.substring(0, 200)}...`).join('\n\n')}

YOUR ROLE: Design compliant electrical circuits with complete details for each circuit.

INSTRUCTIONS:
1. For each circuit in the "circuits" array, include:
   - name, circuitNumber, loadType, loadPower, phases
   - cableSize (mm²), cpcSize (mm²), cableLength (m)
   - protectionDevice: { type, rating, curve, kaRating }
   - rcdProtected (boolean), afddRequired (boolean)
   - calculations: { Ib, In, Iz, voltageDrop: { volts, percent, compliant, limit }, zs, maxZs }
   - justifications: { cableSize, protection, rcd }
   - warnings: [] (array of strings)
   - installationMethod (e.g., "Clipped Direct", "In Conduit")

2. In the "materials" array, list required materials with:
   - name, specification, quantity, unit

3. In the "warnings" array, include any compliance notes or important advisories

4. In the "response" field, provide a brief conversational summary in UK English

Reference BS 7671 regulations (e.g., "433.1.1", "525.1", "411.3.2") in justifications.

Return your design using the provided tool schema.`
          },
          { role: 'user', content: query }
        ],
        max_completion_tokens: aiConfig?.maxTokens || 8000,
        tools: [{
          type: "function",
          function: {
            name: "design_circuits",
            description: "Return electrical circuit design with BS 7671 compliance. You MUST call this function.",
            parameters: {
              type: "object",
              properties: {
                response: { 
                  type: "string",
                  description: "Conversational summary of the design in UK English"
                },
                circuits: { 
                  type: "array",
                  description: "Array of circuit designs with cable, breaker, voltage drop, earth fault, regulations",
                  items: { type: "object" }
                },
                materials: { 
                  type: "array",
                  description: "Required materials list with specifications",
                  items: { type: "object" }
                },
                warnings: { 
                  type: "array",
                  description: "Any compliance warnings or important notes",
                  items: { type: "string" }
                }
              },
              required: ["response", "circuits"]
            }
          }
        }],
        tool_choice: "auto"
      })
    });
    
    if (!retryResponse.ok) {
      const errorText = await retryResponse.text();
      if (retryResponse.status === 429) {
        throw new Error("Rate limit exceeded. Please try again in a moment.");
      }
      if (retryResponse.status === 402) {
        throw new Error("AI credits exhausted. Please add credits to your Lovable workspace.");
      }
      logger.error('🚨 Retry request failed', { status: retryResponse.status, errorPreview: errorText.substring(0, 200) });
    } else {
      const retryData = await retryResponse.json();
      toolCall = retryData.choices?.[0]?.message?.tool_calls?.[0];
      const retryContent = retryData.choices?.[0]?.message?.content;
      
      logger.info('⚠️ Retry result', {
        hasToolCall: !!toolCall,
        hasContent: !!retryContent,
        contentLength: retryContent?.length || 0
      });
    }
  }
  
  // PHASE 1: Enhanced fallback - try JSON-only mode if no tool call
  if (!toolCall) {
    const content = aiData.choices?.[0]?.message?.content;
    logger.warn('⚠️ Still no tool call after retry', {
      hasContent: !!content,
      contentLength: content?.length || 0
    });
    
    // Final fallback: JSON-only mode (no tools)
    if (!content || content.trim() === "") {
      logger.warn('🔄 No tool call and no content, trying JSON-only fallback');
      
      // Limit RAG to top 12 regulations for token hygiene
      const topRegulations = ragResults.regulations.slice(0, 12);
      const compactRagContext = topRegulations.map((r: any) => 
        `${r.regulation_number}: ${r.content.substring(0, 200)}...`
      ).join('\n\n');
      
      const jsonResponse = await fetch('https://ai.gateway.lovable.dev/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${lovableApiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model: aiConfig?.model || 'openai/gpt-5-mini',
          messages: [
            { 
              role: 'system', 
              content: `You are an expert electrical designer specialising in BS 7671:2018+A3:2024 compliant circuit design.

KNOWLEDGE BASE (top ${topRegulations.length} regulations):
${compactRagContext}

Return EXACTLY a single JSON object with keys: response, circuits, materials, warnings. No markdown, no prose outside JSON.

Structure:
- response: brief summary in UK English
- circuits: array of circuit objects with name, circuitNumber, loadType, loadPower, phases, cableSize, cpcSize, cableLength, protectionDevice, rcdProtected, calculations, justifications, warnings, installationMethod
- materials: array of material objects with name, specification, quantity, unit
- warnings: array of strings`
            },
            { role: 'user', content: query }
          ],
          max_completion_tokens: aiConfig?.maxTokens || 8000,
          response_format: { type: "json_object" }
        })
      });
      
      if (!jsonResponse.ok) {
        const errorText = await jsonResponse.text();
        if (jsonResponse.status === 429) {
          throw new Error("Rate limit exceeded. Please try again in a moment.");
        }
        if (jsonResponse.status === 402) {
          throw new Error("AI credits exhausted. Please add credits to your Lovable workspace.");
        }
        throw new Error(`AI JSON fallback error: ${jsonResponse.status} - ${errorText.substring(0, 200)}`);
      }
      
      const jsonData = await jsonResponse.json();
      const jsonContent = jsonData.choices?.[0]?.message?.content;
      
      if (!jsonContent) {
        throw new Error("AI did not return any content in JSON-only fallback.");
      }
      
      logger.info('✅ JSON-only fallback succeeded', { contentLength: jsonContent.length });
      toolCall = { function: { arguments: jsonContent } };
    } else {
      // Try parsing content as JSON or extract from markdown
      try {
        const parsed = JSON.parse(content);
        if (parsed.circuits) {
          logger.info('✅ Recovered design from direct JSON content');
          toolCall = { function: { arguments: content } };
        }
      } catch (e) {
        // Try extracting JSON from markdown code blocks
        const jsonMatch = content.match(/```(?:json)?\n?([\s\S]*?)\n?```/);
        if (jsonMatch) {
          try {
            const parsed = JSON.parse(jsonMatch[1]);
            if (parsed.circuits) {
              logger.info('✅ Recovered design from markdown JSON block');
              toolCall = { function: { arguments: jsonMatch[1] } };
            }
          } catch (e2) {
            logger.error('🚨 Failed to parse extracted JSON', { 
              error: e2 instanceof Error ? e2.message : String(e2) 
            });
          }
        }
      }
      
      if (!toolCall) {
        logger.error('🚨 AI did not return structured design after all attempts', {
          hasContent: !!content,
          contentPreview: content?.substring(0, 200),
          fullContentLength: content?.length || 0
        });
        throw new Error('AI did not return structured design (no tool call). The AI may have returned text instead of calling the design_circuits function. Please try again or simplify your request.');
      }
    }
  }
  
  // PHASE 1: Log tool call extraction success
  logger.info('✅ Tool call extracted', {
    functionName: toolCall.function?.name,
    argumentsLength: toolCall.function?.arguments?.length || 0
  });
  
  let designData;
  try {
    designData = JSON.parse(toolCall.function.arguments);
    
    // CRITICAL VALIDATION: Ensure circuits is an array
    if (!designData.circuits || !Array.isArray(designData.circuits)) {
      logger.error('🚨 AI returned invalid circuits data', {
        circuitsType: typeof designData.circuits,
        circuitsValue: designData.circuits,
        hasCircuits: !!designData.circuits
      });
      throw new Error('AI did not generate circuits array. Received: ' + typeof designData.circuits);
    }
    
    if (designData.circuits.length === 0) {
      logger.error('🚨 AI returned empty circuits array', {
        circuitCount: 0,
        designData: JSON.stringify(designData).substring(0, 500)
      });
      throw new Error('AI generated 0 circuits. Please provide more specific requirements or try again.');
    }
    
    logger.info('✅ Design data parsed successfully', {
      hasCircuits: true,
      circuitCount: designData.circuits.length,
      hasDiversity: !!designData.diversityBreakdown,
      hasMaterials: !!designData.materials
    });
  } catch (parseError) {
    logger.error('🚨 Failed to parse tool call arguments', {
      error: parseError instanceof Error ? parseError.message : String(parseError),
      argumentsPreview: toolCall.function.arguments.substring(0, 500)
    });
    throw new Error('Failed to parse AI design output');
  }
  
  // ✨ SIMPLIFIED VALIDATION - Trust AI more, just ensure basics
  logger.info('🔍 Validating AI design output');
  const validationWarnings: string[] = designData.warnings || [];
  
  // PHASE 1: Enhanced completion logging
  logger.info('✅ STEP 3 Complete - Design validation finished', {
    circuits: designData.circuits?.length || 0,
    requestedCircuits: allCircuits.length,
    tokensUsed: aiData.usage?.total_tokens || 0,
    promptTokens: aiData.usage?.prompt_tokens || 0,
    completionTokens: aiData.usage?.completion_tokens || 0,
    validationWarnings: validationWarnings.length,
    warningsSummary: validationWarnings.slice(0, 3),
    aiTimeMs: aiElapsedMs,
    ragTimeMs: ragElapsedMs
  });
  
  // STEP 4: Return structured design (matching AI RAMS pattern)
  logger.info('✅ Returning design to client', {
    hasResponse: !!designData.response,
    circuitCount: designData.circuits?.length || 0,
    hasMaterials: !!designData.materials,
    warningCount: validationWarnings.length
  });
  
  return new Response(JSON.stringify({
    success: true,
    response: designData.response || 'Design complete',
    design: {
      projectName: projectInfo.name,
      location: projectInfo.location,
      clientName: projectInfo.clientName,
      electricianName: projectInfo.electricianName,
      installationType: projectInfo.installationType,
      totalLoad: Array.isArray(designData.circuits) 
        ? designData.circuits.reduce((sum: number, c: any) => sum + (c.loadPower || 0), 0)
        : 0,
      circuits: designData.circuits, // ✅ Keep all nested circuit data intact
      materials: designData.materials || [],
      warnings: validationWarnings,
      consumerUnit: {
        type: incomingSupply.mainSwitchRating >= 100 ? 'Split Load RCBO' : 'Dual RCD',
        mainSwitchRating: incomingSupply.mainSwitchRating,
        incomingSupply: {
          voltage: incomingSupply.voltage,
          phases: incomingSupply.phases,
          incomingPFC: incomingSupply.pscc,
          Ze: incomingSupply.Ze,
          earthingSystem: incomingSupply.earthingSystem
        }
      },
      diversityApplied: true,
      diversityFactor: 0.7,
      aiResponse: designData.response
    },
    metadata: {
      ragCalls: ragResults.regulations?.length || 0,
      model: aiConfig?.model || 'openai/gpt-5-mini',
      tokensUsed: aiData.usage?.total_tokens,
      aiTimeMs: aiElapsedMs,
      ragTimeMs: ragElapsedMs
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

// PHASE 2: Simple content hash function for deduplication
function hashContent(content: string): string {
  // Simple hash using first 100 chars + length as fingerprint
  const normalized = content.toLowerCase().replace(/\s+/g, ' ').trim();
  return `${normalized.substring(0, 100)}_${normalized.length}`;
}
