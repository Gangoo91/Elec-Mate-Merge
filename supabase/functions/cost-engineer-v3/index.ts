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
  '8_way_consumer_unit': { price: 136.36, supplier: 'Standard 8-way RCD', inStock: true },
  '40a_rcbo': { price: 28.50, supplier: 'Hager/MK', inStock: true }
};

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

  try {
    const body = await req.json();
    const { query, materials, labourHours, region, messages, previousAgentOutputs } = body;

    // Enhanced input validation
    if (!query || typeof query !== 'string' || query.trim().length === 0) {
      throw new ValidationError('query is required and must be a non-empty string');
    }
    if (query.length > 1000) {
      throw new ValidationError('query must be less than 1000 characters');
    }
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

    // Get API keys
    const OPENAI_API_KEY = Deno.env.get('OPENAI_API_KEY');
    if (!OPENAI_API_KEY) {
      throw new Error('OPENAI_API_KEY not configured');
    }

    const LOVABLE_API_KEY = Deno.env.get('LOVABLE_API_KEY');
    if (!LOVABLE_API_KEY) {
      throw new Error('LOVABLE_API_KEY not configured');
    }

    // Step 1: Generate embedding for pricing search (with retry)
    logger.debug('Generating query embedding');
    const embeddingStart = Date.now();
    const queryEmbedding = await generateEmbeddingWithRetry(query, OPENAI_API_KEY);
    logger.debug('Embedding generated', { duration: Date.now() - embeddingStart });

    // Step 2: Parallel RAG search (OPTIMIZED FOR SPEED)
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    const supabase = createClient(supabaseUrl, supabaseKey);

    logger.debug('Starting parallel RAG searches');
    const ragStart = Date.now();

    // Parallelize all RAG calls + keyword search
    const [
      { data: pricingResults, error: pricingError },
      { data: installationResults },
      { data: pmResults },
      { data: commonMaterials }
    ] = await Promise.all([
      supabase.rpc('search_pricing', {
        query_embedding: queryEmbedding,
        match_threshold: 0.65,
        match_count: 8
      }),
      supabase.rpc('search_installation_knowledge', {
        query_embedding: queryEmbedding,
        match_threshold: 0.70,
        match_count: 3
      }),
      supabase.rpc('search_project_mgmt', {
        query_embedding: queryEmbedding,
        match_threshold: 0.65,
        match_count: 2
      }),
      // Explicit keyword search for common electrical materials
      supabase
        .from('pricing_embeddings')
        .select('*')
        .or('item_name.ilike.%2.5mm%,item_name.ilike.%1.5mm%,item_name.ilike.%6mm%,item_name.ilike.%10mm%,item_name.ilike.%consumer unit%,item_name.ilike.%RCBO%,item_name.ilike.%MCB%,item_name.ilike.%socket outlet%,item_name.ilike.%switch%,item_name.ilike.%downlight%')
        .order('base_cost', { ascending: true })
        .limit(12)
    ]);

    // Merge vector + keyword results (dedupe by id)
    let finalPricingResults = [
      ...(pricingResults || []),
      ...(commonMaterials || [])
    ]
      .filter((v, i, a) => a.findIndex(t => t.id === v.id) === i)
      .slice(0, 15);

    // Fallback: if still no results, use search-pricing-rag
    if (finalPricingResults.length === 0) {
      logger.warn('No pricing results from vector+keyword, using search-pricing-rag fallback');
      const { data: ragData, error: ragError } = await supabase.functions.invoke('search-pricing-rag', {
        body: { query, matchThreshold: 0.6, matchCount: 12, supplierFilter: 'all' }
      });
      if (!ragError && ragData?.materials) {
        finalPricingResults = ragData.materials.slice(0, 12).map((m: any) => ({
          item_name: m.item_name,
          base_cost: m.unit_price,
          price_per_unit: m.unit,
          wholesaler: m.supplier,
          in_stock: m.in_stock
        }));
        logger.info('Fallback pricing RAG used', { itemsFound: finalPricingResults.length });
      }
    }

    logger.debug('RAG searches completed', { duration: Date.now() - ragStart });

    logger.info('RAG search complete', {
      pricingItems: finalPricingResults?.length || 0,
      installationGuides: installationResults?.length || 0,
      pmGuides: pmResults?.length || 0
    });

    // Step 3: Build pricing context with database + fallbacks
    let pricingContext = '';
    if (finalPricingResults && finalPricingResults.length > 0) {
      pricingContext = `DATABASE PRICES (${finalPricingResults.length} items):\n` +
        finalPricingResults.map((p: any) => 
          `- ${p.item_name}: £${p.base_cost} (${p.wholesaler}${p.in_stock ? '' : ' - awaiting stock'})`
        ).join('\n');
    }
    
    pricingContext += `\n\nFALLBACK MARKET RATES (use if not in database):\n- 2.5mm² T&E cable: £0.98/metre (£95-£100 per 100m roll)\n- 1.5mm² T&E cable: £0.80/metre (£80 per 100m roll)\n- 6mm² T&E cable: £2.20/metre (£110 per 50m roll)\n- 10mm² T&E cable: £3.90/metre (£195 per 50m roll)\n- 8-way consumer unit (RCD): £136.36\n- 40A RCBO: £28.50`;

    // Build compact installation context (100 chars max per snippet)
    const installationContext = installationResults && installationResults.length > 0
      ? installationResults.map((r: any) => 
          `- ${r.topic}: ${r.content.substring(0, 100)}...`
        ).join('\n')
      : '';

    // Build compact PM context (80 chars max per snippet)
    const pmContext = pmResults && pmResults.length > 0
      ? pmResults.map((r: any) => 
          `- ${r.topic}: ${r.content.substring(0, 80)}...`
        ).join('\n')
      : '';

    // Build conversation context with DESIGNER OUTPUT FIRST
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
        contextSection += `- Full Design: ${JSON.stringify(design)}\n`;
      }
      contextSection += '\n\nALL PREVIOUS WORK:\n' + JSON.stringify(previousAgentOutputs, null, 2);
    }
    if (messages && messages.length > 0) {
      contextSection += '\n\nCONVERSATION HISTORY:\n' + messages.map((m: any) => 
        `${m.role === 'user' ? 'User' : 'Assistant'}: ${m.content}`
      ).slice(-5).join('\n');
    }

    const systemPrompt = `UK Electrical VALUE ENGINEER. September 2025. UK English.

${pricingContext}

${installationContext ? `\nINSTALLATION METHODS:\n${installationContext}\n` : ''}${pmContext ? `PM INSIGHTS:\n${pmContext}\n` : ''}

LABOUR CALCULATION RULES (NO CONTINGENCY LINE ITEMS):
- Rewire (3-bed, 8 circuits): 
  * First fix: 24 hours (2-3 days chasing, cabling runs)
  * Second fix: 16 hours (2 days accessories, consumer unit)
  * Testing: 5 hours (EICR testing, certification)
  * TOTAL: 45 hours
- Extensions: 0.5hr per socket, 0.35hr per light, +1hr setup/testing
- Showers: 4hrs install + testing
- Cooker circuits: 3hrs install + testing
- Scale by property: 1-bed (0.6x), 2-bed (0.7x), 4-bed (1.3x), 5-bed (1.6x)
- DO NOT add "Contingency" as a labour line item

MATERIAL QUANTITY RULES (3-bed house rewire):
- 2.5mm² T&E: 150-200m (50-65m per bedroom + common areas)
- 1.5mm² T&E: 100-150m (35-50m per bedroom + common areas)
- 6mm² T&E: 25-35m (shower circuits only)
- 10mm² T&E: 15-25m (cooker circuit only)
- Consumer unit: 8-10 way with RCD protection
- Sockets: 24-30 (8-10 per bedroom + common)
- Light switches: 10-12
- Downlights: 12-16 (if LED refit)
Scale by bedrooms: 1-bed (0.5x), 2-bed (0.7x), 4-bed (1.3x), 5-bed (1.6x)

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

    // Step 4: Call AI with universal wrapper
    logger.debug('Calling AI with wrapper');
    const { callAI } = await import('../_shared/ai-wrapper.ts');
    
    const aiResult = await callAI(LOVABLE_API_KEY!, {
      model: 'google/gemini-2.5-flash',
      systemPrompt,
      userPrompt,
      maxTokens: 1500,
      timeoutMs: 30000,
      temperature: 0.2,
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

    // Step 5: Return response - flat format for router/UI
    const { response, suggestedNextAgents, materials: costMaterials, labour, summary, notes } = costResult;
    
    return new Response(
      JSON.stringify({
        response,
        structuredData: { materials: costMaterials, labour, summary, notes },
        suggestedNextAgents: suggestedNextAgents || []
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
