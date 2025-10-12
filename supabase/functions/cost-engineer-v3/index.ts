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
  LABOUR_RATE_PER_HOUR: 50.00,  // Standard UK electrician rate
  MATERIAL_MARKUP_PERCENT: 10,   // Contractor margin on wholesale
  VAT_RATE: 20                   // UK VAT
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

    // Parallelize all RAG calls
    const [
      { data: pricingResults, error: pricingError },
      { data: installationResults },
      { data: pmResults }
    ] = await Promise.all([
      supabase.rpc('search_pricing', {
        query_embedding: queryEmbedding,
        match_threshold: 0.7,
        match_count: 8  // Reduced from 15 to 8
      }),
      supabase.rpc('search_installation_knowledge', {
        query_embedding: queryEmbedding,
        match_threshold: 0.70,
        match_count: 3  // Reduced from 5 to 3
      }),
      supabase.rpc('search_project_mgmt', {
        query_embedding: queryEmbedding,
        match_threshold: 0.65,
        match_count: 2  // Reduced from 3 to 2
      })
    ]);

    // Fallback: if vector search fails or returns nothing, use search-pricing-rag
    let finalPricingResults = pricingResults;
    if (pricingError || !pricingResults || pricingResults.length === 0) {
      logger.warn('Vector search failed or empty, using search-pricing-rag fallback', { pricingError });
      const { data: ragData, error: ragError } = await supabase.functions.invoke('search-pricing-rag', {
        body: { query, matchThreshold: 0.6, matchCount: 8, supplierFilter: 'all' }
      });
      if (!ragError && ragData?.materials) {
        finalPricingResults = ragData.materials.slice(0, 8).map((m: any) => ({
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

    // Step 3: Build compact pricing context (OPTIMIZED)
    const pricingContext = finalPricingResults && finalPricingResults.length > 0
      ? finalPricingResults.map((p: any) => 
          `- ${p.item_name}: £${p.base_cost} (${p.wholesaler}${p.in_stock ? '' : ' - awaiting stock'})`
        ).join('\n')
      : 'No pricing data. Estimate from market rates.';

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

PRICING DATABASE (${finalPricingResults?.length || 0} items - USE THESE EXACT PRICES):
${pricingContext}

${installationContext ? `INSTALLATION METHODS:\n${installationContext}\n` : ''}${pmContext ? `PM INSIGHTS:\n${pmContext}\n` : ''}

PRICING RULES:
- Labour: £${COST_ENGINEER_PRICING.LABOUR_RATE_PER_HOUR}/hr (all tasks)
- Material markup: +${COST_ENGINEER_PRICING.MATERIAL_MARKUP_PERCENT}% on wholesale
- VAT: ${COST_ENGINEER_PRICING.VAT_RATE}%

INSTRUCTIONS:
1. Match materials to database items (exact prices + supplier)
2. If not in database: mark "Estimated (not in database)"
3. Calculate labour by task (installation, termination, testing)
4. Identify value engineering opportunities (cost savings without compromising BS 7671)

${region ? `Region: ${region}\n` : ''}${contextSection}

Output compact JSON (max 1500 tokens):
{
  "response": "Cost analysis (150 words): materials breakdown, labour tasks, VAT, value engineering suggestions",
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
                        supplier: { type: 'string' }
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

    // Enforce labour pricing
    if (costResult.labour?.tasks) {
      costResult.labour.tasks = costResult.labour.tasks.map((task: any) => ({
        ...task,
        rate: COST_ENGINEER_PRICING.LABOUR_RATE_PER_HOUR,
        total: Number((task.hours * COST_ENGINEER_PRICING.LABOUR_RATE_PER_HOUR).toFixed(2))
      }));

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
