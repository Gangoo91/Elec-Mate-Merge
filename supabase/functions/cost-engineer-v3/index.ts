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

    // Step 2: Generate embedding for pricing search (with retry)
    logger.debug('Generating query embedding');
    const embeddingStart = Date.now();
    const queryEmbedding = await generateEmbeddingWithRetry(enhancedQuery, OPENAI_API_KEY);
    logger.debug('Embedding generated', { duration: Date.now() - embeddingStart });

    // Step 3: Parallel RAG search (OPTIMIZED FOR SPEED + CONTEXT)
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
        match_threshold: 0.55,  // Lowered from 0.70 for better RAG retrieval
        match_count: 8          // Increased from 3 for more context
      }),
      supabase.rpc('search_project_mgmt', {
        query_embedding: queryEmbedding,
        match_threshold: 0.65,
        match_count: 2
      }),
      // Explicit keyword search for common electrical materials + SWA
      supabase
        .from('pricing_embeddings')
        .select('*')
        .or('item_name.ilike.%2.5mm%,item_name.ilike.%1.5mm%,item_name.ilike.%6mm%,item_name.ilike.%10mm%,item_name.ilike.%SWA%,item_name.ilike.%armoured%,item_name.ilike.%gland%,item_name.ilike.%consumer unit%,item_name.ilike.%RCBO%,item_name.ilike.%MCB%,item_name.ilike.%socket outlet%,item_name.ilike.%switch%,item_name.ilike.%downlight%')
        .order('base_cost', { ascending: true })
        .limit(12)
    ]);

    // Keyword fallback for installation knowledge if vector search insufficient
    if (!installationResults || installationResults.length < 3) {
      const installKeywords = ['SWA', 'armoured', 'outdoor', 'buried', 'underground', 'Section 522', 'Section 701', 'Section 722'];
      const keywordTerms = installKeywords.filter(k => 
        query.toLowerCase().includes(k.toLowerCase()) || 
        enhancedQuery.toLowerCase().includes(k.toLowerCase())
      );
      
      if (keywordTerms.length > 0) {
        const { data: keywordInstallResults } = await supabase
          .from('installation_knowledge')
          .select('*')
          .or(keywordTerms.map(k => `content.ilike.%${k}%`).join(','))
          .limit(5);
        
        if (keywordInstallResults && keywordInstallResults.length > 0) {
          installationResults = [
            ...(installationResults || []),
            ...keywordInstallResults
          ].filter((v, i, a) => a.findIndex(t => t.id === v.id) === i); // dedupe
          logger.info('Installation keyword fallback used', { 
            terms: keywordTerms,
            found: keywordInstallResults.length,
            totalResults: installationResults.length
          });
        }
      }
    }

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
    
    pricingContext += `\n\nFALLBACK MARKET RATES (use if not in database):\n- 2.5mm² T&E cable: £0.98/metre (£95-£100 per 100m roll)\n- 1.5mm² T&E cable: £0.80/metre (£80 per 100m roll)\n- 6mm² T&E cable: £2.20/metre (£110 per 50m roll)\n- 10mm² T&E cable: £3.90/metre (£195 per 50m roll)\n- 2.5mm² SWA cable: £3.50/metre (3-core armoured)\n- 4mm² SWA cable: £4.80/metre (3-core armoured)\n- 6mm² SWA cable: £6.20/metre (3-core armoured)\n- 10mm² SWA cable: £9.50/metre (3-core armoured)\n- SWA gland 20mm: £10.00 (x2 per cable run)\n- 8-way consumer unit (RCD): £136.36\n- 10-way consumer unit (RCD): £156.00\n- 12-way consumer unit (RCD): £185.00\n- 16-way consumer unit (RCD): £245.00\n- 18-way consumer unit (RCD): £285.00\n- 40A RCBO: £28.50`;

    // Build installation context with LONGER snippets (250 chars for critical context)
    const installationContext = installationResults && installationResults.length > 0
      ? installationResults.map((r: any) => 
          `- ${r.topic}: ${r.content.substring(0, 250)}...`
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

CABLE SELECTION RULES (BS 7671 Section 522):
- INDOOR installations (house, flat): T&E cable (2.5mm², 1.5mm², 6mm², 10mm²)
- OUTDOOR/GARDEN/EXTERNAL: MUST use SWA (Steel Wire Armoured) cable - T&E NOT permitted
  * EV chargers to garden: SWA cable
  * Garden sockets/lighting: SWA cable
  * Runs between buildings: SWA cable
- UNDERGROUND/BURIED: MUST use SWA cable at 600mm depth + warning tape
- FACTORY/INDUSTRIAL: SWA cable for exposed runs (mechanical protection)
- LOFT with thermal insulation: Use 90°C rated cable (or derate by 0.5x)
- FIRE CIRCUITS (alarm/emergency): Use FP200 Gold or equivalent

When specifying SWA cable:
- Use equivalent CSA to T&E (e.g., 2.5mm² T&E → 2.5mm² 3-core SWA)
- Add termination glands to material list (£8-£12 per gland x 2)
- SWA pricing: 2.5mm² ~£3.50/m, 4mm² ~£4.80/m, 6mm² ~£6.20/m, 10mm² ~£9.50/m

⚠️ CRITICAL: Check installation context from RAG knowledge below.
If RAG mentions "SWA", "armoured", "outdoor", "Section 522", "buried", or "external influences":
→ YOU MUST use SWA cable, NOT T&E cable

${installationContext ? `\nINSTALLATION CONTEXT FROM RAG:\n${installationContext}\n` : ''}${pmContext ? `PM INSIGHTS:\n${pmContext}\n` : ''}

LABOUR CALCULATION RULES (NO CONTINGENCY LINE ITEMS):
${parsedEntities.jobType === 'board_change' ?
  `- BOARD CHANGE JOB (Consumer Unit Replacement): 
  * Consumer unit replacement and wiring: 7 hours
  * Testing and certification (EIC): 3 hours
  * TOTAL: 10 hours @ £50/hour = £500
  * DO NOT include first-fix or second-fix labour unless new circuits are being added
  * This is ONLY replacing the consumer unit - existing circuits remain` :
  `- Rewire (3-bed, 8 circuits): 
  * First fix: 24 hours (2-3 days chasing, cabling runs)
  * Second fix: 16 hours (2 days accessories, consumer unit)
  * Testing: 5 hours (EICR testing, certification)
  * TOTAL: 45 hours
- Extensions: 0.5hr per socket, 0.35hr per light, +1hr setup/testing
- Showers: 4hrs install + testing
- Cooker circuits: 3hrs install + testing
- Scale by property: 1-bed (0.6x), 2-bed (0.7x), 4-bed (1.3x), 5-bed (1.6x)`
}
- DO NOT add "Contingency" as a labour line item

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
