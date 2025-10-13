// Deployed: 2025-10-11 21:30 UTC
import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import {
  corsHeaders, 
  createLogger, 
  generateRequestId, 
  handleError, 
  ValidationError,
  createClient,
  generateEmbeddingWithRetry,
  callLovableAIWithTimeout,
  parseJsonWithRepair
} from '../_shared/v3-core.ts';
import { parseQueryEntities, type ParsedEntities } from '../_shared/query-parser.ts';
import { searchPricingKnowledge, formatPricingContext, searchLabourTimeKnowledge, formatLabourTimeContext } from '../_shared/rag-cost-engineer.ts';
import { enrichResponse } from '../_shared/response-enricher.ts';

// ===== COST ENGINEER PRICING CONSTANTS =====
const COST_ENGINEER_PRICING = {
  ELECTRICIAN_RATE_PER_HOUR: 50.00,
  APPRENTICE_RATE_PER_HOUR: 25.00,
  MATERIAL_MARKUP_PERCENT: 10,
  VAT_RATE: 20
};

// ===== LABOUR CALCULATION HEURISTICS =====
const LABOUR_HEURISTICS = {
  rewire: {
    // 3-bed house = 45 hours total (NO contingency)
    firstFixTotal: 24,      // 2-3 days (chasing, cabling runs)
    secondFixTotal: 16,     // 2 days (accessories, consumer unit)
    testingTotal: 5         // 5 hours (EICR testing, certification)
  },
  extension: {
    socketsPerHour: 2,
    lightsPerHour: 3,
    showerInstall: 4.0,
    cookerInstall: 3.0
  }
};

// ===== MATERIAL TAKEOFF HEURISTICS =====
const MATERIAL_TAKEOFF = {
  rewire_cable_per_bed: {
    '2.5mm_t&e': 50,        // 150m for 3-bed
    '1.5mm_t&e': 35,        // 105m for 3-bed
    '6mm_t&e': 10,          // 30m for 3-bed (shower circuits)
    '10mm_t&e': 7           // 20m for 3-bed (cooker only)
  },
  rewire_accessories_per_bed: {
    sockets: 8,
    switches: 3,
    downlights: 4
  }
};

// ===== FALLBACK PRICES (when database search fails) =====
const FALLBACK_PRICES = {
  '2.5mm_t&e_per_m': { price: 0.98, supplier: 'CEF/TLC average', inStock: true },  // £95-£100 per 100m
  '1.5mm_t&e_per_m': { price: 0.80, supplier: 'CEF/TLC average', inStock: true },  // £80 per 100m
  '6mm_t&e_per_m': { price: 2.20, supplier: 'CEF/TLC average', inStock: true },    // £110 per 50m
  '10mm_t&e_per_m': { price: 3.90, supplier: 'CEF/TLC average', inStock: true },   // £195 per 50m
  '2.5mm_swa_per_m': { price: 3.50, supplier: 'CEF/TLC average', inStock: true },  // 3-core SWA
  '4mm_swa_per_m': { price: 4.80, supplier: 'CEF/TLC average', inStock: true },    // 3-core SWA
  '6mm_swa_per_m': { price: 6.20, supplier: 'CEF/TLC average', inStock: true },    // 3-core SWA
  '10mm_swa_per_m': { price: 9.50, supplier: 'CEF/TLC average', inStock: true },   // 3-core SWA
  'swa_gland_20mm': { price: 10.00, supplier: 'CW/MK gland', inStock: true },
  '8_way_consumer_unit': { price: 136.36, supplier: 'Standard 8-way RCD', inStock: true },
  '10_way_consumer_unit': { price: 156.00, supplier: 'Standard 10-way RCD', inStock: true },
  '12_way_consumer_unit': { price: 185.00, supplier: 'Standard 12-way RCD', inStock: true },
  '16_way_consumer_unit': { price: 245.00, supplier: 'Standard 16-way RCD', inStock: true },
  '18_way_consumer_unit': { price: 285.00, supplier: 'Standard 18-way RCD', inStock: true },
  '40a_rcbo': { price: 28.50, supplier: 'Hager/MK', inStock: true }
};

// ===== RAG QUERY ENHANCEMENT =====
function buildEnhancedRAGQuery(userQuery: string, entities: ParsedEntities): string {
  const contextTerms: string[] = [userQuery];
  
  // Add location-specific terms
  if (entities.location === 'outdoor' || entities.location === 'garden') {
    contextTerms.push('SWA steel wire armoured outdoor cable installation');
    contextTerms.push('Section 522 external influences weatherproof');
    contextTerms.push('IP rating outdoor equipment');
  }
  
  if (entities.installMethod === 'buried' || /buried|underground/.test(userQuery)) {
    contextTerms.push('underground buried cable 600mm depth');
    contextTerms.push('direct burial cable protection');
    contextTerms.push('warning tape cable route marking');
  }
  
  // Add load-specific terms
  if (entities.loadType === 'ev_charger') {
    contextTerms.push('Section 722 EV charging installation');
    contextTerms.push('electric vehicle supply equipment');
  }
  
  if (entities.location === 'bathroom') {
    contextTerms.push('Section 701 bathroom zones IP rating');
  }
  
  // Add factory/industrial terms
  if (/factory|industrial|warehouse/.test(userQuery)) {
    contextTerms.push('SWA cable mechanical protection industrial');
    contextTerms.push('exposed cable runs armoured protection');
  }
  
  return contextTerms.join(' ');
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  // Health check endpoint
  if (req.method === 'GET') {
    const requestId = generateRequestId();
    return new Response(
      JSON.stringify({ status: 'healthy', function: 'cost-engineer-v3', requestId, timestamp: new Date().toISOString() }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 200 }
    );
  }

  const requestId = generateRequestId();
  const logger = createLogger(requestId, { function: 'cost-engineer-v3' });
  const functionStart = Date.now(); // Timer for total execution

  try {
    const body = await req.json();
    const { query, materials, labourHours, region, messages, previousAgentOutputs, sharedRegulations } = body;

    // PHASE 1: Query Enhancement
    const { enhanceQuery, logEnhancement } = await import('../_shared/query-enhancer.ts');
    const enhancement = enhanceQuery(query, messages || []);
    logEnhancement(enhancement, logger);
    const effectiveQuery = enhancement.enhanced;

    // Enhanced input validation
    if (!query || typeof query !== 'string' || query.trim().length === 0) {
      throw new ValidationError('query is required and must be a non-empty string');
    }
    if (query.length > 1000) {
      throw new ValidationError('query must be less than 1000 characters');
    }

    logger.info('💰 Cost Engineer V3 invoked', { 
      query: effectiveQuery.substring(0, 50),
      enhanced: enhancement.addedContext.length > 0,
      hasSharedRegs: !!sharedRegulations?.length
    });
    if (materials && !Array.isArray(materials)) {
      throw new ValidationError('materials must be an array');
    }
    if (labourHours && (typeof labourHours !== 'number' || labourHours < 0)) {
      throw new ValidationError('labourHours must be a non-negative number');
    }
    if (region && typeof region !== 'string') {
      throw new ValidationError('region must be a string');
    }

    logger.info('Cost Engineer V3 request received', { query: query.substring(0, 50), materialsCount: materials?.length });

    // Get API keys - OpenAI primary, Lovable AI fallback
    const OPENAI_API_KEY = Deno.env.get('OPENAI_API_KEY');
    if (!OPENAI_API_KEY) {
      throw new Error('OPENAI_API_KEY not configured');
    }

    const LOVABLE_API_KEY = Deno.env.get('LOVABLE_API_KEY');

    // Step 1: Parse entities and build enhanced RAG query
    logger.debug('Parsing query entities');
    const parsedEntities = parseQueryEntities(query);
    const enhancedQuery = buildEnhancedRAGQuery(query, parsedEntities);
    logger.debug('Enhanced query built', { 
      original: query.substring(0, 50),
      enhanced: enhancedQuery.substring(0, 100),
      location: parsedEntities.location,
      loadType: parsedEntities.loadType
    });

    // Step 2: Initialize Supabase client
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    const supabase = createClient(supabaseUrl, supabaseKey);

    // Step 3: Use intelligent RAG for installation + PM knowledge with cross-encoder
    logger.debug('Starting intelligent RAG pipeline');
    const ragStart = Date.now();
    
    const { intelligentRAGSearch } = await import('../_shared/intelligent-rag.ts');
    
    // Build labour-specific query
    const labourQuery = `labour time standards installation time ${parsedEntities.jobType || 'circuit'} ${parsedEntities.circuitCount ? parsedEntities.circuitCount + ' circuits' : ''}`;
    
    const [queryEmbedding, finalPricingResults, ragResults, labourTimeResults] = await Promise.all([
      // Generate embedding
      generateEmbeddingWithRetry(enhancedQuery, OPENAI_API_KEY),
      
      // Use optimized pricing RAG module
      searchPricingKnowledge(enhancedQuery, await generateEmbeddingWithRetry(enhancedQuery, OPENAI_API_KEY), supabase, logger, parsedEntities.jobType),
      
      // Combined installation + design knowledge with intelligent RAG
      intelligentRAGSearch({
        circuitType: parsedEntities.jobType,
        searchTerms: enhancedQuery.split(' ').filter(w => w.length > 3),
        expandedQuery: enhancedQuery
      }),
      
      // NEW: Search project_mgmt_knowledge for labour time standards
      searchLabourTimeKnowledge(labourQuery, await generateEmbeddingWithRetry(labourQuery, OPENAI_API_KEY), supabase, logger, parsedEntities.jobType)
    ]);
    
    logger.debug('Intelligent RAG complete', { duration: Date.now() - ragStart });
    
    const installationResults = ragResults?.installationDocs || [];
    const pmResults = ragResults?.designDocs || [];
    
    logger.info('RAG search complete', {
      pricingItems: finalPricingResults?.length || 0,
      installationGuides: installationResults.length,
      pmGuides: pmResults.length,
      labourTimeEntries: labourTimeResults.length,
      avgInstallScore: installationResults.length > 0 ? (installationResults.reduce((s: number, r: any) => s + (r.finalScore || 0), 0) / installationResults.length).toFixed(3) : 'N/A'
    });

    // Step 5: Build pricing context using RAG module formatter
    const pricingContext = formatPricingContext(finalPricingResults) +
      `\n\nFALLBACK MARKET RATES (use if not in database):\n- 2.5mm² T&E cable: £0.98/metre\n- 1.5mm² T&E cable: £0.80/metre\n- 6mm² T&E cable: £2.20/metre\n- 10mm² T&E cable: £3.90/metre\n- 2.5mm² SWA: £3.50/m, 4mm² SWA: £4.80/m, 6mm² SWA: £6.20/m, 10mm² SWA: £9.50/m\n- SWA gland 20mm: £10 (x2)\n- Consumer units: 8-way £136, 10-way £156, 12-way £185, 16-way £245\n- 40A RCBO: £28.50`;

    // Build installation context (trimmed: 120 chars max)
    const installationContext = installationResults && installationResults.length > 0
      ? installationResults.map((r: any) => 
          `- ${r.topic}: ${r.content.substring(0, 120)}...`
        ).join('\n')
      : '';

    // Build compact PM context (60 chars max)
    const pmContext = pmResults && pmResults.length > 0
      ? pmResults.map((r: any) => 
          `- ${r.topic}: ${r.content.substring(0, 60)}...`
        ).join('\n')
      : '';

    // Build conversation context with DESIGNER OUTPUT FIRST (trimmed)
    let contextSection = '';
    if (previousAgentOutputs && previousAgentOutputs.length > 0) {
      const designerOutput = previousAgentOutputs.find((o: any) => o.agent === 'designer');
      if (designerOutput?.response?.structuredData) {
        const design = designerOutput.response.structuredData;
        contextSection += `\n\nDESIGNER OUTPUT (USE THIS DATA):\n`;
        contextSection += `- Cable Size: ${design.cableSize || 'N/A'}\n`;
        contextSection += `- Circuit Type: ${design.circuitType || 'N/A'}\n`;
        contextSection += `- Circuit Breaker: ${design.circuitBreaker || 'N/A'}\n`;
        contextSection += `- Cable Length: ${design.cableLength || 'N/A'}m\n`;
      }
    }
    // Keep only last 3 conversation messages
    if (messages && messages.length > 0) {
      contextSection += '\n\nRECENT CONTEXT:\n' + messages.map((m: any) => 
        `${m.role === 'user' ? 'User' : 'AI'}: ${m.content.substring(0, 150)}`
      ).slice(-3).join('\n');
    }

    const labourTimeContext = formatLabourTimeContext(labourTimeResults);
    
    const systemPrompt = `UK Electrical Cost Engineer. September 2025.

${pricingContext}

CABLE RULES:
- Indoor: T&E cable
- Outdoor/garden: SWA cable (armoured)
- Underground: SWA at 600mm depth
- Factory: SWA for exposed runs
${installationContext ? `\nINSTALLATION NOTES:\n${installationContext.substring(0, 400)}...\n` : ''}
${labourTimeContext ? `\n${labourTimeContext}\n` : ''}

LABOUR CALCULATION RULES:
${labourTimeResults.length > 0 ? `
**PRIORITY: Use labour time standards from PROJECT-AND-COST-ENGINEERS-HANDBOOK above**

If specific task found in handbook:
- Use exact time from handbook
- Adjust for complexity, access, team size
- Show breakdown: setup + installation + testing

If NOT found in handbook, use these fallback estimates:
` : ''}
${parsedEntities.jobType === 'board_change' ?
  `- Consumer unit replacement: 7hrs install + 3hrs testing = 10hrs @ £50/hr = £500` :
  `- Rewire (3-bed): 24hrs first fix + 16hrs second fix + 5hrs testing = 45hrs
- Extensions: 0.5hr per socket, 0.35hr per light, +1hr setup/testing
- Showers: 4hrs install + testing
- Cooker circuits: 3hrs install + testing
- Scale by property: 1-bed (0.6x), 2-bed (0.7x), 4-bed (1.3x), 5-bed (1.6x)`
}
- DO NOT add "Contingency" as a labour line item

${labourTimeResults.length > 0 ? `**REMINDER**: Prioritise handbook data above before using fallback estimates!\n` : ''}

MATERIAL QUANTITY RULES:
${parsedEntities.consumerUnitWays ? 
  `- Consumer unit: ${parsedEntities.consumerUnitWays}-way with RCD/RCBO protection` :
  '- Consumer unit: 8-10 way with RCD protection (default for 3-bed)'
}
${parsedEntities.circuitCount ? 
  `- Number of circuits: ${parsedEntities.circuitCount}` : 
  ''
}
${parsedEntities.jobType === 'board_change' ?
  `- JOB TYPE: Consumer unit replacement only - NO cable runs unless explicitly mentioned
  - Include new tails if specified (16mm² tails, meter to CU)
  - RCBO per circuit or dual RCD configuration based on budget` :
  `- 2.5mm² T&E: 150-200m (50-65m per bedroom + common areas)
- 1.5mm² T&E: 100-150m (35-50m per bedroom + common areas)
- 6mm² T&E: 25-35m (shower circuits only)
- 10mm² T&E: 15-25m (cooker circuit only)
- Sockets: 24-30 (8-10 per bedroom + common)
- Light switches: 10-12
- Downlights: 12-16 (if LED refit)
Scale by bedrooms: 1-bed (0.5x), 2-bed (0.7x), 4-bed (1.3x), 5-bed (1.6x)`
}

LABOUR RATES:
- Qualified Electrician: £50.00/hour
- Apprentice/Improver: £25.00/hour
For jobs >40 hours, consider 2-person team (electrician + apprentice = £75/hr combined, reduces time by 30%)

PRICING RULES:
- Material markup: +${COST_ENGINEER_PRICING.MATERIAL_MARKUP_PERCENT}% on wholesale
- VAT: ${COST_ENGINEER_PRICING.VAT_RATE}%

INSTRUCTIONS:
1. Match materials to database (prefer database over fallback)
2. Use realistic quantities (see rules above)
3. Calculate labour realistically (45hrs for 3-bed rewire: 24h first fix + 16h second fix + 5h testing)
4. For large jobs (>40hrs), suggest 2-person team
5. Mark items as "inDatabase: true/false"
6. Identify value engineering opportunities
7. DO NOT include "Contingency" as a labour task - buffer is already built into time estimates

${region ? `Region: ${region}\n` : ''}${contextSection}

Output compact JSON (max 1500 tokens):
{
  "response": "Cost analysis with materials, labour, VAT, value engineering",
  "materials": { "items": [...], "subtotal": 0, "vat": 0, "total": 0 },
  "labour": { "tasks": [...], "subtotal": 0, "vat": 0, "total": 0 },
  "summary": { "materialsTotal": 0, "labourTotal": 0, "subtotal": 0, "vat": 0, "grandTotal": 0 },
  "valueEngineering": [{"suggestion": "...", "potentialSaving": 0}],
  "suggestedNextAgents": [{"agent": "...", "reason": "...", "priority": "high"}]
}`;

    const userPrompt = `Cost estimate for: ${query}
${materials ? `\nMaterials: ${JSON.stringify(materials)}` : ''}${labourHours ? `\nLabour: ${labourHours}hrs` : ''}

1. Match materials to database (${finalPricingResults?.length || 0} items above)
2. Extract exact prices + suppliers
3. Calculate labour tasks
4. Add value engineering suggestions
5. Include VAT (20%)`;

    // Step 4a: Check system health to determine provider
    let useOpenAI = true; // Default to OpenAI
    let lovableAIHealthy = false;
    
    if (LOVABLE_API_KEY) {
      try {
        const healthResponse = await fetch(`${supabaseUrl}/functions/v1/system-health`, {
          headers: { 'Authorization': `Bearer ${supabaseKey}` }
        });
        if (healthResponse.ok) {
          const health = await healthResponse.json();
          const lovableCheck = health.checks?.find((c: any) => c.service === 'lovable_ai');
          lovableAIHealthy = lovableCheck?.status === 'healthy';
          logger.info('System health check', { lovableAI: lovableCheck?.status });
        }
      } catch (err) {
        logger.warn('Health check failed', { error: err instanceof Error ? err.message : String(err) });
      }
    }

    // Step 4b: Call AI with provider failover - FAST FAIL for mobile
    logger.debug('Calling AI', { provider: useOpenAI ? 'OpenAI' : 'Lovable AI' });
    const { callAI } = await import('../_shared/ai-wrapper.ts');
    const aiStart = Date.now();
    
    let aiResult;
    try {
      aiResult = await callAI(OPENAI_API_KEY, {
        model: 'gpt-5-2025-08-07',
        systemPrompt,
        userPrompt,
        maxTokens: 1500,
        timeoutMs: 20000,
        tools: [{
        type: 'function',
        function: {
          name: 'provide_cost_estimate',
          description: 'Return detailed cost estimate with materials and labour breakdown',
          parameters: {
            type: 'object',
            properties: {
              response: {
                type: 'string',
                description: 'Detailed cost analysis (150-250 words) with value engineering recommendations'
              },
              materials: {
                type: 'object',
                properties: {
                  items: {
                    type: 'array',
                    items: {
                      type: 'object',
                      properties: {
                        description: { type: 'string' },
                        quantity: { type: 'number' },
                        unit: { type: 'string' },
                        unitPrice: { type: 'number' },
                        total: { type: 'number' },
                        supplier: { type: 'string' },
                        inDatabase: { type: 'boolean' }
                      },
                      required: ['description', 'quantity', 'unitPrice', 'total', 'supplier']
                    }
                  },
                  subtotal: { type: 'number' },
                  vat: { type: 'number' },
                  total: { type: 'number' }
                },
                required: ['items', 'subtotal', 'vat', 'total']
              },
              labour: {
                type: 'object',
                properties: {
                  tasks: {
                    type: 'array',
                    items: {
                      type: 'object',
                      properties: {
                        description: { type: 'string' },
                        hours: { type: 'number' },
                        workers: { type: 'number' },
                        electricianHours: { type: 'number' },
                        apprenticeHours: { type: 'number' },
                        rate: { type: 'number' },
                        total: { type: 'number' }
                      },
                      required: ['description', 'hours', 'rate', 'total']
                    }
                  },
                  subtotal: { type: 'number' },
                  vat: { type: 'number' },
                  total: { type: 'number' }
                }
              },
              summary: {
                type: 'object',
                properties: {
                  materialsTotal: { type: 'number' },
                  labourTotal: { type: 'number' },
                  subtotal: { type: 'number' },
                  vat: { type: 'number' },
                  grandTotal: { type: 'number' }
                },
                required: ['grandTotal']
              },
              valueEngineering: {
                type: 'array',
                items: {
                  type: 'object',
                  properties: {
                    suggestion: { type: 'string' },
                    potentialSaving: { type: 'number' }
                  },
                  required: ['suggestion', 'potentialSaving']
                }
              },
              notes: {
                type: 'array',
                items: { type: 'string' }
              },
              suggestedNextAgents: {
                type: 'array',
                items: {
                  type: 'object',
                  properties: {
                    agent: { type: 'string' },
                    reason: { type: 'string' },
                    priority: { type: 'string', enum: ['high', 'medium', 'low'] }
                  },
                  required: ['agent', 'reason', 'priority']
                }
              }
            },
            required: ['response', 'materials', 'summary'],
            additionalProperties: false
          }
        }
      }],
      toolChoice: { type: 'function', function: { name: 'provide_cost_estimate' } }
      });
      const aiMs = Date.now() - aiStart;
      logger.info('AI call succeeded', { provider: 'openai', duration: aiMs });
    } catch (aiError) {
      const aiMs = Date.now() - aiStart;
      logger.warn('OpenAI failed, attempting fallback', { duration: aiMs, error: aiError instanceof Error ? aiError.message : String(aiError) });
      
      // Try Lovable AI if available and healthy
      if (LOVABLE_API_KEY && lovableAIHealthy) {
        try {
          const geminiStart = Date.now();
          aiResult = await callAI(LOVABLE_API_KEY, {
            model: 'google/gemini-2.5-flash',
            systemPrompt,
            userPrompt,
            maxTokens: 1500,
            timeoutMs: 25000,
            temperature: 0.2,
            tools: [{
              type: 'function',
              function: {
                name: 'provide_cost_estimate',
                description: 'Return detailed cost estimate with materials and labour breakdown',
                parameters: {
                  type: 'object',
                  properties: {
                    response: { type: 'string', description: 'Detailed cost analysis (150-250 words)' },
                    materials: {
                      type: 'object',
                      properties: {
                        items: {
                          type: 'array',
                          items: {
                            type: 'object',
                            properties: {
                              description: { type: 'string' },
                              quantity: { type: 'number' },
                              unit: { type: 'string' },
                              unitPrice: { type: 'number' },
                              total: { type: 'number' },
                              supplier: { type: 'string' },
                              inDatabase: { type: 'boolean' }
                            },
                            required: ['description', 'quantity', 'unit', 'unitPrice', 'total', 'supplier', 'inDatabase']
                          }
                        },
                        subtotal: { type: 'number' },
                        vat: { type: 'number' },
                        total: { type: 'number' }
                      },
                      required: ['items', 'subtotal', 'vat', 'total']
                    },
                    labour: {
                      type: 'object',
                      properties: {
                        tasks: {
                          type: 'array',
                          items: {
                            type: 'object',
                            properties: {
                              task: { type: 'string' },
                              hours: { type: 'number' },
                              rate: { type: 'number' },
                              total: { type: 'number' }
                            },
                            required: ['task', 'hours', 'rate', 'total']
                          }
                        },
                        subtotal: { type: 'number' },
                        vat: { type: 'number' },
                        total: { type: 'number' }
                      },
                      required: ['tasks', 'subtotal', 'vat', 'total']
                    },
                    summary: {
                      type: 'object',
                      properties: {
                        materialsTotal: { type: 'number' },
                        labourTotal: { type: 'number' },
                        subtotal: { type: 'number' },
                        vat: { type: 'number' },
                        grandTotal: { type: 'number' }
                      },
                      required: ['grandTotal']
                    },
                    valueEngineering: {
                      type: 'array',
                      items: {
                        type: 'object',
                        properties: {
                          suggestion: { type: 'string' },
                          potentialSaving: { type: 'number' }
                        },
                        required: ['suggestion', 'potentialSaving']
                      }
                    },
                    suggestedNextAgents: {
                      type: 'array',
                      items: {
                        type: 'object',
                        properties: {
                          agent: { type: 'string' },
                          reason: { type: 'string' },
                          priority: { type: 'string', enum: ['high', 'medium', 'low'] }
                        },
                        required: ['agent', 'reason', 'priority']
                      }
                    }
                  },
                  required: ['response', 'materials', 'summary'],
                  additionalProperties: false
                }
              }
            }],
            toolChoice: { type: 'function', function: { name: 'provide_cost_estimate' } }
          });
          logger.info('Lovable AI fallback succeeded', { duration: Date.now() - geminiStart });
        } catch (fallbackError) {
          logger.error('All AI providers failed, using deterministic fallback', { 
            error: fallbackError instanceof Error ? fallbackError.message : String(fallbackError) 
          });
          aiResult = null; // Trigger fallback below
        }
      } else {
        logger.warn('No AI fallback available, using deterministic estimate');
        aiResult = null;
      }
    }

    // Step 4c: Deterministic fallback if all AI fails
    if (!aiResult) {
      logger.info('Building deterministic quick estimate from RAG + heuristics');
      
      const materialItems: any[] = [];
      let materialSubtotal = 0;
      
      if (parsedEntities.jobType === 'rewire') {
        const beds = parsedEntities.propertySize?.bedrooms || 3;
        const scale = beds === 1 ? 0.5 : beds === 2 ? 0.7 : beds === 4 ? 1.3 : beds === 5 ? 1.6 : 1.0;
        
        const cable25mm = Math.ceil(150 * scale);
        const cable15mm = Math.ceil(105 * scale);
        const cable6mm = Math.ceil(30 * scale);
        
        materialItems.push(
          { description: '2.5mm² T&E cable', quantity: cable25mm, unit: 'm', unitPrice: 0.98, total: cable25mm * 0.98, supplier: 'CEF/TLC average', inDatabase: false },
          { description: '1.5mm² T&E cable', quantity: cable15mm, unit: 'm', unitPrice: 0.80, total: cable15mm * 0.80, supplier: 'CEF/TLC average', inDatabase: false },
          { description: '6mm² T&E cable (shower)', quantity: cable6mm, unit: 'm', unitPrice: 2.20, total: cable6mm * 2.20, supplier: 'CEF/TLC average', inDatabase: false },
          { description: 'Consumer unit (18-way RCD)', quantity: 1, unit: 'unit', unitPrice: 285, total: 285, supplier: 'Standard', inDatabase: false }
        );
      } else if (parsedEntities.jobType === 'board_change') {
        const ways = parsedEntities.consumerUnitWays || 10;
        const cuPrice = ways === 8 ? 136.36 : ways === 10 ? 156 : ways === 12 ? 185 : ways === 16 ? 245 : 285;
        materialItems.push(
          { description: `Consumer unit (${ways}-way)`, quantity: 1, unit: 'unit', unitPrice: cuPrice, total: cuPrice, supplier: 'Standard', inDatabase: false }
        );
      }
      
      materialSubtotal = materialItems.reduce((sum, item) => sum + item.total, 0);
      const materialMarkup = materialSubtotal * 0.3; // 30% markup
      const materialVAT = materialSubtotal * 0.2;
      const materialTotal = materialSubtotal + materialVAT;
      
      const labourTasks: any[] = [];
      let labourSubtotal = 0;
      
      if (parsedEntities.jobType === 'rewire') {
        labourTasks.push(
          { task: 'First fix (chasing, cabling)', hours: 24, rate: 50, total: 1200 },
          { task: 'Second fix (accessories, CU)', hours: 16, rate: 50, total: 800 },
          { task: 'Testing & certification', hours: 5, rate: 50, total: 250 }
        );
      } else if (parsedEntities.jobType === 'board_change') {
        labourTasks.push(
          { task: 'Consumer unit replacement', hours: 7, rate: 50, total: 350 },
          { task: 'Testing & certification (EIC)', hours: 3, rate: 50, total: 150 }
        );
      } else {
        labourTasks.push(
          { task: 'Installation & testing', hours: 8, rate: 50, total: 400 }
        );
      }
      
      labourSubtotal = labourTasks.reduce((sum, task) => sum + task.total, 0);
      const labourVAT = labourSubtotal * 0.2;
      const labourTotal = labourSubtotal + labourVAT;
      
      const grandTotal = materialTotal + labourTotal;
      
      const fallbackEstimate = {
        response: `Quick Estimate (fallback mode): Based on parsed job type (${parsedEntities.jobType}) and standard UK rates. This is a deterministic estimate generated from heuristics when AI providers were unavailable. Materials based on typical ${parsedEntities.jobType} requirements, labour calculated using standard industry times. For a detailed breakdown, please try again when AI services are available.`,
        materials: {
          items: materialItems,
          subtotal: materialSubtotal,
          vat: materialVAT,
          total: materialTotal
        },
        labour: {
          tasks: labourTasks,
          subtotal: labourSubtotal,
          vat: labourVAT,
          total: labourTotal
        },
        summary: {
          materialsSubtotal: Number(materialSubtotal.toFixed(2)),
          materialsMarkup: Number(materialMarkup.toFixed(2)),
          materialsTotal: Number(materialTotal.toFixed(2)),
          labourTotal: Number(labourTotal.toFixed(2)),
          subtotal: Number((materialSubtotal + labourSubtotal).toFixed(2)),
          vat: Number((materialVAT + labourVAT).toFixed(2)),
          grandTotal: Number(grandTotal.toFixed(2))
        },
        valueEngineering: [
          { suggestion: 'Quick estimate mode - detailed value engineering unavailable', potentialSaving: 0 }
        ],
        suggestedNextAgents: []
      };
      
      logger.info('Deterministic fallback complete', { 
        provider: 'fallback',
        materialsTotal: materialTotal,
        labourTotal: labourTotal,
        grandTotal
      });
      
      return new Response(
        JSON.stringify({
          success: true,
          response: fallbackEstimate.response,
          structuredData: fallbackEstimate,
          citations: [],
          enrichment: { displayHints: { primaryView: 'cost-breakdown' }},
          rendering: { 
            layout: 'cost-estimate',
            callouts: [{
              type: 'warning',
              placement: 'top',
              content: 'Quick estimate using deterministic pricing - AI services unavailable'
            }]
          },
          metadata: {
            requestId,
            timestamp: new Date().toISOString(),
            provider: 'fallback',
            ragMs: Date.now() - ragStart,
            totalMs: Date.now() - functionStart
          }
        }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Robust tool-call parsing (matches universal wrapper contract)
    let costResult: any;
    if (aiResult.toolCalls && aiResult.toolCalls.length > 0) {
      // AI wrapper already extracted tool call args into content
      costResult = parseJsonWithRepair(aiResult.content, logger, 'cost-engineer-v3');
    } else {
      // Fallback: repair-parse the entire body
      costResult = parseJsonWithRepair(aiResult.content, logger, 'cost-engineer-v3');
    }

    // ===== POST-PROCESSING: ENFORCE PRICING RULES =====
    logger.debug('Enforcing pricing rules');

    // Enforce material pricing
    if (costResult.materials?.items) {
      costResult.materials.items = costResult.materials.items.map((item: any) => {
        // Calculate wholesale price (if AI didn't provide it, back-calculate from unitPrice)
        const wholesalePrice = item.wholesalePrice || (item.unitPrice / 1.1);
        const markup = wholesalePrice * (COST_ENGINEER_PRICING.MATERIAL_MARKUP_PERCENT / 100);
        const unitPrice = wholesalePrice + markup;
        const total = unitPrice * item.quantity;

        return {
          ...item,
          wholesalePrice: Number(wholesalePrice.toFixed(2)),
          markup: Number(markup.toFixed(2)),
          unitPrice: Number(unitPrice.toFixed(2)),
          total: Number(total.toFixed(2)),
          inStock: item.inStock ?? true
        };
      });

      // Recalculate materials totals
      const materialsSubtotal = costResult.materials.items.reduce((sum: number, item: any) => 
        sum + (item.wholesalePrice * item.quantity), 0);
      const totalMarkup = materialsSubtotal * (COST_ENGINEER_PRICING.MATERIAL_MARKUP_PERCENT / 100);
      const subtotalWithMarkup = materialsSubtotal + totalMarkup;
      const materialsVat = subtotalWithMarkup * (COST_ENGINEER_PRICING.VAT_RATE / 100);
      
      costResult.materials.subtotal = Number(materialsSubtotal.toFixed(2));
      costResult.materials.totalMarkup = Number(totalMarkup.toFixed(2));
      costResult.materials.subtotalWithMarkup = Number(subtotalWithMarkup.toFixed(2));
      costResult.materials.vat = Number(materialsVat.toFixed(2));
      costResult.materials.total = Number((subtotalWithMarkup + materialsVat).toFixed(2));
    }

    // Enforce labour pricing with team logic
    if (costResult.labour?.tasks) {
      const totalLabourHours = costResult.labour.tasks.reduce((sum: number, task: any) => sum + (task.hours || 0), 0);
      const useTeam = totalLabourHours > 40;

      costResult.labour.tasks = costResult.labour.tasks.map((task: any) => {
        const totalHours = task.hours;
        
        // If AI already specified team breakdown, use it
        if (task.workers === 2 || (task.electricianHours && task.apprenticeHours)) {
          const elecHours = task.electricianHours || (totalHours * 0.7);
          const appHours = task.apprenticeHours || (totalHours * 0.3);
          return {
            ...task,
            workers: 2,
            electricianHours: elecHours,
            apprenticeHours: appHours,
            rate: (elecHours * COST_ENGINEER_PRICING.ELECTRICIAN_RATE_PER_HOUR) + (appHours * COST_ENGINEER_PRICING.APPRENTICE_RATE_PER_HOUR),
            total: Number(((elecHours * COST_ENGINEER_PRICING.ELECTRICIAN_RATE_PER_HOUR) + (appHours * COST_ENGINEER_PRICING.APPRENTICE_RATE_PER_HOUR)).toFixed(2))
          };
        }
        
        // If job >40hrs and AI didn't specify team, suggest it
        if (useTeam && !task.workers) {
          const elecHours = totalHours * 0.7;
          const appHours = totalHours * 0.3;
          return {
            ...task,
            workers: 2,
            electricianHours: elecHours,
            apprenticeHours: appHours,
            rate: (elecHours * COST_ENGINEER_PRICING.ELECTRICIAN_RATE_PER_HOUR) + (appHours * COST_ENGINEER_PRICING.APPRENTICE_RATE_PER_HOUR),
            total: Number(((elecHours * COST_ENGINEER_PRICING.ELECTRICIAN_RATE_PER_HOUR) + (appHours * COST_ENGINEER_PRICING.APPRENTICE_RATE_PER_HOUR)).toFixed(2))
          };
        }
        
        // Solo electrician (default)
        return {
          ...task,
          workers: 1,
          rate: COST_ENGINEER_PRICING.ELECTRICIAN_RATE_PER_HOUR,
          total: Number((totalHours * COST_ENGINEER_PRICING.ELECTRICIAN_RATE_PER_HOUR).toFixed(2))
        };
      });

      // Recalculate labour totals
      const labourSubtotal = costResult.labour.tasks.reduce((sum: number, task: any) => sum + task.total, 0);
      const labourVat = labourSubtotal * (COST_ENGINEER_PRICING.VAT_RATE / 100);
      
      costResult.labour.subtotal = Number(labourSubtotal.toFixed(2));
      costResult.labour.vat = Number(labourVat.toFixed(2));
      costResult.labour.total = Number((labourSubtotal + labourVat).toFixed(2));
    }

    // Recalculate summary
    const materialsSubtotal = costResult.materials?.subtotal || 0;
    const materialsMarkup = costResult.materials?.totalMarkup || 0;
    const labourSubtotal = costResult.labour?.subtotal || 0;
    const subtotal = materialsSubtotal + materialsMarkup + labourSubtotal;
    const vat = subtotal * (COST_ENGINEER_PRICING.VAT_RATE / 100);
    const grandTotal = subtotal + vat;

    costResult.summary = {
      materialsSubtotal: Number(materialsSubtotal.toFixed(2)),
      materialsMarkup: Number(materialsMarkup.toFixed(2)),
      materialsTotal: costResult.materials?.total || 0,
      labourTotal: costResult.labour?.total || 0,
      subtotal: Number(subtotal.toFixed(2)),
      vat: Number(vat.toFixed(2)),
      grandTotal: Number(grandTotal.toFixed(2))
    };

    // Validate RAG usage
    if (finalPricingResults && finalPricingResults.length > 0) {
      const usedPricingData = costResult.materials?.items?.some((item: any) => 
        finalPricingResults.some((p: any) => 
          item.description?.toLowerCase().includes(p.item_name?.toLowerCase().split(' ')[0])
        )
      );
      
      if (!usedPricingData) {
        logger.warn('AI did not use any pricing database results', { 
          availableItems: finalPricingResults.length,
          generatedItems: costResult.materials?.items?.length 
        });
      }
    }

    logger.info('Cost estimate completed', { 
      grandTotal: costResult.summary?.grandTotal,
      itemsCount: costResult.materials?.items?.length
    });

    // Step 5: Build response metadata (cost-specific, no regulations needed)
    const rendering = {
      layout: 'cost-estimate' as const,
      priority: 'design-first' as const,
      callouts: [{
        type: 'info' as const,
        placement: 'top' as const,
        content: 'Pricing from 2025 UK electrical suppliers database. Labour times from PROJECT-AND-COST-ENGINEERS-HANDBOOK.'
      }]
    };

    const enrichment = {
      displayHints: {
        primaryView: 'structured' as const,
        expandableSections: ['valueEngineering', 'materials', 'labour'],
        highlightTerms: []
      },
      interactiveElements: []
    };

    // Log RAG metrics for observability
    const totalTime = Date.now() - functionStart;
    await supabase.from('agent_metrics').insert({
      function_name: 'cost-engineer-v3',
      request_id: requestId,
      rag_time: ragStart ? Date.now() - ragStart : null,
      total_time: totalTime,
      regulation_count: (installationResults?.length || 0) + (pmResults?.length || 0),
      success: true,
      query_type: parsedEntities.jobType || 'general'
    }).catch(err => logger.warn('Failed to log metrics', { error: err.message }));

    // Return response (Designer-v3 compatible structure, no regulations)
    return new Response(
      JSON.stringify({
        success: true,
        response: costResult.response,                 // Narrative text from AI
        structuredData: costResult,                    // Full structured breakdown
        citations: [],                                 // Cost Engineer doesn't cite regulations
        enrichment,                                    // UI metadata
        rendering,                                     // Display hints + sources callout
        metadata: {
          requestId,
          provider: useOpenAI ? 'openai' : 'lovable-ai',
          model: useOpenAI ? 'gpt-5-2025-08-07' : 'gemini-2.5-flash',
          totalMs: Date.now() - functionStart,
          ragMs: Date.now() - ragStart,
          aiMs: aiResult?.duration || (Date.now() - aiStart),
          pricingItems: finalPricingResults?.length || 0,
          labourTimeItems: labourTimeResults?.length || 0
        }
      }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200 
      }
    );

  } catch (error) {
    logger.error('Cost Engineer V3 error', { error: error instanceof Error ? error.message : String(error) });
    return handleError(error);
  }
});
