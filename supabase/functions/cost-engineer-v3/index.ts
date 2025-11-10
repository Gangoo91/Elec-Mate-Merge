// Deployed: 2025-11-08 - Fixed aiResult undefined error
import { serve } from '../_shared/deps.ts';
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
import { suggestNextAgents, generateContextHint } from '../_shared/agent-suggestions.ts';
import { sanitizeAIJson, safeJsonParse } from '../_shared/json-sanitizer.ts';

// ===== COST ENGINEER PRICING CONSTANTS =====
const COST_ENGINEER_PRICING = {
  ELECTRICIAN_RATE_PER_HOUR: 50.00,
  APPRENTICE_RATE_PER_HOUR: 25.00,
  MATERIAL_MARKUP_PERCENT: 15,
  VAT_RATE: 20
};

// ===== AUTOMATIC OVERHEADS 2025 (UK Industry Averages) =====
const AUTO_OVERHEADS_2025 = {
  monthly: {
    van: 450,          // Insurance + fuel + maintenance
    tools: 150,        // Depreciation + insurance
    insurance: 120,    // Public liability + professional indemnity
    admin: 100,        // Software, phone, accounting
    marketing: 80,     // Website, ads, directories
    total: 900         // £900/month = £40.90/day (22 working days)
  },
  perJobDay: 40.90,
  certification: {
    niceicPerCircuit: 2.50,    // Per circuit notification
    buildingControl: 250,       // For notifiable work (rewires, new CUs)
    eicr: 0                     // Included in testing time
  }
};

// ===== REGIONAL MULTIPLIERS 2025 =====
const REGIONAL_MULTIPLIERS: Record<string, number> = {
  london: 1.35,
  southeast: 1.20,
  scotland: 1.08,
  northwest: 1.02,
  yorkshire: 1.02,
  wales: 0.98,
  southwest: 1.05,
  eastMidlands: 1.00,
  westMidlands: 1.00,
  northeast: 0.95,
  other: 1.00
};

// ===== WASTE & CONTINGENCY FACTORS =====
const WASTE_FACTORS = {
  cable: 0.10,           // 10% cable waste (offcuts, damage)
  materials: 0.05,       // 5% general materials contingency
  complexJob: 0.10       // Additional 10% for heritage/complex sites
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
    const { query, materials, labourHours, region, messages, previousAgentOutputs, sharedRegulations, businessSettings, skipProfitability, currentDesign, projectDetails } = body;

    // Track context sources
    const contextSources = {
      sharedRegulations: !!(sharedRegulations && sharedRegulations.length > 0),
      sharedRegulationsCount: sharedRegulations?.length || 0,
      previousAgentOutputs: previousAgentOutputs?.map((o: any) => o.agent) || [],
      projectDetails: !!projectDetails,
      circuitDesign: !!(currentDesign?.circuits || previousAgentOutputs?.find((o: any) => o.agent === 'designer'))
    };

    logger.info('📦 Context received from agent-router:', contextSources);
    
    // Log what's being USED from context
    if (previousAgentOutputs && previousAgentOutputs.length > 0) {
      previousAgentOutputs.forEach((output: any) => {
        logger.info(`📥 Using context from ${output.agent}:`, {
          hasStructuredData: !!output.response?.structuredData,
          hasCitations: !!output.citations,
          structuredDataKeys: Object.keys(output.response?.structuredData || {})
        });
      });
    }

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
      hasSharedRegs: !!sharedRegulations?.length,
      hasBusinessSettings: !!businessSettings,
      skipProfitability: !!skipProfitability,
      mode: skipProfitability ? 'core-only' : 'full'
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
  
  logger.info('🔍 API Key Check', {
    hasOpenAIKey: !!OPENAI_API_KEY,
    keyPrefix: OPENAI_API_KEY?.substring(0, 7),
    keyLength: OPENAI_API_KEY?.length
  });

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
      
      // Use optimized pricing RAG module with 15% markup applied (LIMIT TO TOP 20 for gpt-5-mini)
      searchPricingKnowledge(enhancedQuery, await generateEmbeddingWithRetry(enhancedQuery, OPENAI_API_KEY), supabase, logger, parsedEntities.jobType).then(results =>
        results.slice(0, 20).map(item => ({
          ...item,
          base_cost: Number((item.base_cost * (1 + COST_ENGINEER_PRICING.MATERIAL_MARKUP_PERCENT / 100)).toFixed(2))
        }))
      ),
      
      // Combined installation + design knowledge with intelligent RAG
      // COST ENGINEER OPTIMIZED PRIORITIES: Pricing (95), Practical Work (85), BS 7671 (80)
      intelligentRAGSearch(
        {
          circuitType: parsedEntities.jobType,
          searchTerms: enhancedQuery.split(' ').filter(w => w.length > 3),
          expandedQuery: enhancedQuery,
          context: {
            ragPriority: {
              bs7671: 80,           // BS 7671 regulations - compliance checking
              practical_work: 85,   // Practical work - HIGHEST priority for labour estimation
              design: 0,            // Skip design calculations (Designer Agent's domain)
              health_safety: 0,     // Skip H&S (H&S Agent's domain)
              installation: 0,      // Skip installation (covered by practical_work)
              inspection: 0,        // Skip inspection (not needed for costing)
              project_mgmt: 0       // Skip PM (using separate labour search)
            },
            agentType: 'cost-engineer',
            skipEmbedding: false
          },
          installationType: parsedEntities.installationType || 'domestic'
        },
        OPENAI_API_KEY,
        supabase,
        logger
      ),
      
      // NEW: Search project_mgmt_knowledge for labour time standards
      searchLabourTimeKnowledge(labourQuery, await generateEmbeddingWithRetry(labourQuery, OPENAI_API_KEY), supabase, logger, parsedEntities.jobType)
    ]);
    
    logger.debug('Intelligent RAG complete', { duration: Date.now() - ragStart });
    
    const installationResults = ragResults?.installationDocs || [];
    const pmResults = ragResults?.designDocs || [];
    
    logger.info('RAG search complete with Cost Engineer priorities (CONTEXT REDUCED)', {
      pricingItems: finalPricingResults?.length || 0,
      practicalWorkGuides: ragResults?.practicalWorkDocs?.length || 0,
      regulations: ragResults?.regulations?.length || 0,
      labourTimeEntries: labourTimeResults.length,
      skippedSources: ['design', 'health_safety', 'installation'],
      priorities: { practicalWork: 85, regulations: 80, pricing: 95 },
      limits: { pricing: 30, practicalWork: 5, regulations: 3 }
    });

    // Step 5: Build pricing context using RAG module formatter
    const pricingContext = formatPricingContext(finalPricingResults) +
      `\n\nFALLBACK MARKET RATES (use if not in database, 15% markup applied):\n- 2.5mm² T&E cable: £1.13/metre\n- 1.5mm² T&E cable: £0.92/metre\n- 6mm² T&E cable: £2.53/metre\n- 10mm² T&E cable: £4.49/metre\n- 2.5mm² SWA: £4.03/m, 4mm² SWA: £5.52/m, 6mm² SWA: £8.21/m, 10mm² SWA: £10.93/m\n- SWA gland 20mm: £11.50 (x2)\n- Consumer units: 8-way £156.40, 10-way £179.40, 12-way £212.75, 16-way £281.75\n- 40A RCBO: £32.78`;

    // Build PRACTICAL WORK context (from Practical Work Intelligence - PRIORITY) - LIMIT TO TOP 5
    const practicalWorkContext = ragResults?.practicalWorkDocs && ragResults.practicalWorkDocs.length > 0
      ? ragResults.practicalWorkDocs.slice(0, 5).map((pw: any) => 
          `- ${pw.activity}: ${pw.step_description?.substring(0, 120)}... (${pw.time_estimate || 'time varies'})`
        ).join('\n')
      : '';

    // Build regulations context (trimmed for compliance checks) - LIMIT TO TOP 3
    const regulationsContext = ragResults?.regulations && ragResults.regulations.length > 0
      ? ragResults.regulations.slice(0, 3).map((reg: any) =>
          `- ${reg.regulation_number}: ${reg.content?.substring(0, 100)}...`
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
    
    // Detect region from location string for automatic labour rate adjustment
    const detectRegion = (locationStr: string = ''): string => {
      const loc = locationStr.toLowerCase();
      if (/london|sw\d|se\d|ec\d|wc\d|n\d|e\d|nw\d|w\d/.test(loc)) return 'london';
      if (/brighton|kent|surrey|sussex|berkshire|hampshire|ox\d|rg\d|gu\d|bn\d/.test(loc)) return 'southeast';
      if (/glasgow|edinburgh|aberdeen|dundee|eh\d|g\d/.test(loc)) return 'scotland';
      if (/manchester|liverpool|preston|bolton|m\d\d|l\d|pr\d/.test(loc)) return 'northwest';
      if (/leeds|sheffield|bradford|york|ls\d|s\d\d|bd\d/.test(loc)) return 'yorkshire';
      if (/cardiff|swansea|newport|cf\d|sa\d|np\d/.test(loc)) return 'wales';
      if (/bristol|bath|exeter|plymouth|bs\d|ex\d|pl\d/.test(loc)) return 'southwest';
      if (/birmingham|coventry|wolverhampton|b\d\d|cv\d|wv\d/.test(loc)) return 'westMidlands';
      if (/nottingham|leicester|derby|ng\d|le\d|de\d/.test(loc)) return 'eastMidlands';
      if (/newcastle|sunderland|durham|ne\d|sr\d|dh\d/.test(loc)) return 'northeast';
      return 'other';
    };
    
    const detectedRegion = detectRegion(region);
    const regionalMultiplier = REGIONAL_MULTIPLIERS[detectedRegion] || 1.0;
    const adjustedLabourRate = COST_ENGINEER_PRICING.ELECTRICIAN_RATE_PER_HOUR * regionalMultiplier;
    
    // Detect job complexity from query for automatic risk assessment
    const detectComplexity = (queryStr: string): number => {
      const q = queryStr.toLowerCase();
      let complexity = 0;
      if (/heritage|listed|conservation|victorian|edwardian|1930s|1920s/.test(q)) complexity += 2;
      if (/asbestos|artex|hazard/.test(q)) complexity += 2;
      if (/occupied|working around|live/.test(q)) complexity += 1;
      if (/restricted access|narrow|difficult access/.test(q)) complexity += 1;
      if (/rewire|full rewire|complete rewire/.test(q)) complexity += 1;
      if (/commercial|industrial|factory/.test(q)) complexity += 1;
      return Math.min(complexity, 5); // Cap at 5
    };
    
    const complexityRating = detectComplexity(query);
    const complexityLabel = complexityRating >= 4 ? 'Very High' : complexityRating >= 3 ? 'High' : complexityRating >= 2 ? 'Medium' : 'Standard';
    
    // SPLIT AI CALLS: Core estimate first, then profitability (prevents timeout)
    const systemPrompt = `UK Electrical Cost Engineer. September 2025.

${pricingContext ? `DATABASE PRICING (PRIORITY):\n${pricingContext.substring(0, 1000)}\n` : ''}
${practicalWorkContext ? `INSTALL METHODS:\n${practicalWorkContext.substring(0, 800)}\n` : ''}
${regulationsContext ? `REGULATIONS:\n${regulationsContext.substring(0, 600)}\n` : ''}
${labourTimeContext ? `${labourTimeContext.substring(0, 500)}\n` : ''}

CORE RULES:
• Indoor: T&E cable | Outdoor: SWA cable | Underground: SWA @ 600mm
• Regional rate: ${detectedRegion} £${adjustedLabourRate.toFixed(2)}/hr
• Overheads: £${AUTO_OVERHEADS_2025.perJobDay}/day
• Complexity: ${complexityLabel} (${complexityRating}/5) - ${complexityRating >= 3 ? `+${complexityRating >= 4 ? '25%' : '20%'} margin` : '15% margin'}
• Waste: Cable ${WASTE_FACTORS.cable * 100}%, Materials ${WASTE_FACTORS.materials * 100}%
• VAT: 20% on all items

LABOUR ESTIMATES (use handbook data if available, else):
${parsedEntities.jobType === 'board_change' ? 
  `• CU replacement: 10hrs (7h install + 3h test) @ £${adjustedLabourRate.toFixed(2)}/hr` :
  `• 3-bed rewire: 45hrs (24h first + 16h second + 5h test)
• Extensions: 0.5hr/socket, 0.35hr/light
• Showers: 4hrs | Cooker: 3hrs
• Scale: 1-bed (0.6x), 2-bed (0.7x), 4-bed (1.3x), 5-bed (1.6x)`}

CRITICAL MATH:
• materials.subtotal = Σ(item totals with markup)
• labour.subtotal = Σ(task totals)
• summary.subtotal = materials.subtotal + labour.subtotal (NET before VAT)
• summary.vat = subtotal × 0.20
• summary.grandTotal = subtotal + vat
• NO hidden margins in subtotal!

Return JSON with: response, materials, labour, summary, timescales, alternatives, orderList, compliance, complexity, siteChecklist, valueEngineering, upsells, conversations, pipeline`;

    const userPrompt = `Cost estimate for: ${query}
${materials ? `\nMaterials: ${JSON.stringify(materials)}` : ''}${labourHours ? `\nLabour: ${labourHours}hrs` : ''}

1. Match materials to database (${finalPricingResults?.length || 0} items above)
2. Extract exact prices + suppliers
3. Calculate labour tasks realistically
4. Add value engineering suggestions
5. Include VAT (20%)
6. Provide timescale breakdown and alternative quotes`;

    // ==== CALL 1: CORE COST ESTIMATE (Faster, no profitability) ====
    logger.debug('Calling AI for core cost estimate', { provider: 'OpenAI' });
    logger.info('🤖 Calling OpenAI GPT-4o-mini for core estimate', {
      model: 'gpt-4o-mini',
      maxTokens: 8000,
      timeoutMs: 120000, // 2 minutes for gpt-4o-mini
      hasTools: true,
      splitMode: 'core-estimate'
    });
    
    const { callAI } = await import('../_shared/ai-wrapper.ts');
    const aiStart = Date.now();
    
    let coreResult;
    try {
      coreResult = await callAI(OPENAI_API_KEY, {
        model: 'gpt-4o-mini', // Stable, proven reliable
        systemPrompt,
        userPrompt,
        maxTokens: 8000,
        timeoutMs: 120000, // 2 minutes sufficient
        jsonMode: true,
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
                description: 'Detailed cost analysis (150-200 words) with value engineering recommendations'
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
                  materialsTotal: { 
                    type: 'number',
                    description: 'Total materials with VAT (materials.total)'
                  },
                  labourTotal: { 
                    type: 'number',
                    description: 'Total labour with VAT (labour.total)'
                  },
                  subtotal: { 
                    type: 'number',
                    description: 'Net total before VAT - MUST equal materials.subtotal + labour.subtotal'
                  },
                  vat: { 
                    type: 'number',
                    description: 'Total VAT (materials.vat + labour.vat)'
                  },
                  grandTotal: { 
                    type: 'number',
                    description: 'Grand total (materialsTotal + labourTotal)'
                  }
                },
                required: ['materialsTotal', 'labourTotal', 'subtotal', 'vat', 'grandTotal']
              },
              timescales: {
                type: 'object',
                properties: {
                  phases: {
                    type: 'array',
                    items: {
                      type: 'object',
                      properties: {
                        phase: { type: 'string' },
                        days: { type: 'number' },
                        description: { type: 'string' }
                      },
                      required: ['phase', 'days', 'description']
                    }
                  },
                  totalDays: { type: 'number' },
                  totalWeeks: { type: 'number' },
                  workingDaysPerWeek: { type: 'number' },
                  startToFinish: { type: 'string' },
                  criticalPath: { type: 'string' },
                  assumptions: {
                    type: 'array',
                    items: { type: 'string' }
                  }
                },
                required: ['phases', 'totalDays', 'startToFinish']
              },
              alternatives: {
                type: 'object',
                properties: {
                  budget: {
                    type: 'object',
                    properties: {
                      description: { type: 'string' },
                      materialsTotal: { type: 'number' },
                      labourTotal: { type: 'number' },
                      grandTotal: { type: 'number' },
                      tradeoffs: { type: 'array', items: { type: 'string' } }
                    },
                    required: ['description', 'grandTotal', 'tradeoffs']
                  },
                  standard: {
                    type: 'object',
                    properties: {
                      description: { type: 'string' },
                      materialsTotal: { type: 'number' },
                      labourTotal: { type: 'number' },
                      grandTotal: { type: 'number' },
                      tradeoffs: { type: 'array', items: { type: 'string' } }
                    },
                    required: ['description', 'grandTotal', 'tradeoffs']
                  },
                  premium: {
                    type: 'object',
                    properties: {
                      description: { type: 'string' },
                      materialsTotal: { type: 'number' },
                      labourTotal: { type: 'number' },
                      grandTotal: { type: 'number' },
                      tradeoffs: { type: 'array', items: { type: 'string' } }
                    },
                    required: ['description', 'grandTotal', 'tradeoffs']
                  },
                  recommended: { type: 'string', enum: ['budget', 'standard', 'premium'] }
                },
                required: ['budget', 'standard', 'premium', 'recommended']
              },
              orderList: {
                type: 'object',
                properties: {
                  bySupplier: {
                    type: 'object',
                    additionalProperties: {
                      type: 'object',
                      properties: {
                        items: {
                          type: 'array',
                          items: {
                            type: 'object',
                            properties: {
                              code: { type: 'string' },
                              description: { type: 'string' },
                              quantity: { type: 'number' },
                              unit: { type: 'string' },
                              unitPrice: { type: 'number' },
                              total: { type: 'number' }
                            },
                            required: ['description', 'quantity', 'unit', 'unitPrice', 'total']
                          }
                        },
                        subtotal: { type: 'number' },
                        accountNumber: { type: 'string' }
                      },
                      required: ['items', 'subtotal']
                    }
                  },
                  totalItems: { type: 'number' },
                  estimatedDelivery: { type: 'string' },
                  notes: {
                    type: 'array',
                    items: { type: 'string' }
                  }
                },
                required: ['totalItems'] // bySupplier is optional for graceful degradation
              },
              compliance: {
                type: 'object',
                description: 'Regulatory compliance costs',
                properties: {
                  items: {
                    type: 'array',
                    items: {
                      type: 'object',
                      properties: {
                        description: { type: 'string' },
                        total: { type: 'number' },
                        required: { type: 'boolean' },
                        note: { type: 'string' }
                      },
                      required: ['description', 'total', 'required']
                    }
                  },
                  subtotal: { type: 'number' }
                },
                required: ['items', 'subtotal']
              },
              complexity: {
                type: 'object',
                description: 'Mandatory risk and complexity assessment',
                properties: {
                  rating: { type: 'number', description: '1-5 complexity score' },
                  label: { type: 'string', enum: ['Standard', 'Medium', 'High', 'Very High'] },
                  factors: { type: 'array', items: { type: 'string' } },
                  recommendedMargin: { type: 'number', description: 'Percentage margin for this complexity level' },
                  explanation: { type: 'string' }
                },
                required: ['rating', 'label', 'factors', 'recommendedMargin', 'explanation']
              },
              siteChecklist: {
                type: 'object',
                description: 'Pre-start site requirements',
                properties: {
                  critical: { type: 'array', items: { type: 'string' }, description: 'Must-do items before starting' },
                  important: { type: 'array', items: { type: 'string' }, description: 'Important considerations' }
                },
                required: ['critical', 'important']
              },
              valueEngineering: {
                type: 'array',
                description: 'Cost-saving alternatives with exact calculations',
                items: {
                  type: 'object',
                  properties: {
                    suggestion: { type: 'string' },
                    currentCost: { type: 'number' },
                    alternativeCost: { type: 'number' },
                    saving: { type: 'number' },
                    tradeoff: { type: 'string' },
                    recommendation: { type: 'string' }
                  },
                  required: ['suggestion', 'currentCost', 'alternativeCost', 'saving', 'tradeoff', 'recommendation']
                }
              },
              upsells: {
                type: 'array',
                description: 'Automatic upsell opportunities based on job type',
                items: {
                  type: 'object',
                  properties: {
                    opportunity: { type: 'string' },
                    price: { type: 'number' },
                    winRate: { type: 'number', description: 'Percentage likelihood of acceptance' },
                    timing: { type: 'string' },
                    script: { type: 'string', description: 'Word-for-word conversation script' },
                    isHot: { type: 'boolean', description: 'High-priority upsell' }
                  },
                  required: ['opportunity', 'price', 'winRate', 'timing', 'script', 'isHot']
                }
              },
              conversations: {
                type: 'object',
                description: 'Client conversation scripts for common scenarios',
                properties: {
                  opening: { type: 'string' },
                  tooExpensive: { type: 'string' },
                  discountRequest: { type: 'string' }
                },
                required: ['opening', 'tooExpensive', 'discountRequest']
              },
              pipeline: {
                type: 'array',
                description: 'Future revenue opportunities',
                items: {
                  type: 'object',
                  properties: {
                    opportunity: { type: 'string' },
                    timing: { type: 'string' },
                    estimatedValue: { type: 'number' },
                    priority: { type: 'string', enum: ['high', 'medium', 'low'] },
                    trigger: { type: 'string' },
                    description: { type: 'string' }
                  },
                  required: ['opportunity', 'timing', 'estimatedValue', 'priority', 'description']
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
            required: ['response', 'materials', 'summary', 'timescales', 'alternatives', 'orderList'],
            additionalProperties: false
          }
        }
      }],
      toolChoice: { type: 'function', function: { name: 'provide_cost_estimate' } }
      });
      const aiMs = Date.now() - aiStart;
      logger.info('✅ Core estimate AI call succeeded', { provider: 'openai', duration: aiMs, splitMode: 'core-estimate' });
    } catch (aiError) {
      const aiMs = Date.now() - aiStart;
      logger.error('❌ Core estimate AI call failed', { 
        duration: aiMs,
        error: aiError instanceof Error ? aiError.message : String(aiError),
        errorName: aiError instanceof Error ? aiError.name : 'Unknown',
        stack: aiError instanceof Error ? aiError.stack?.split('\n')[0] : undefined,
        model: 'gpt-5-mini-2025-08-07',
        maxTokens: 8000,
        hadApiKey: !!OPENAI_API_KEY,
        apiKeyPrefix: OPENAI_API_KEY?.substring(0, 7)
      });
      
      logger.warn('Falling back to deterministic estimate due to AI failure');
      throw new Error(`AI generation failed: ${aiError instanceof Error ? aiError.message : 'Unknown error'}`);
    }

    // Add graceful degradation for missing intelligence fields
    if (coreResult && (!coreResult.compliance || !coreResult.complexity)) {
      logger.info('Intelligence features missing, adding defaults');
      
      if (!coreResult.compliance) {
        coreResult.compliance = {
          items: [],
          subtotal: 0
        };
        
        if (parsedEntities.jobType === 'rewire' || parsedEntities.jobType === 'board_change' || /rewire|consumer unit/.test(query)) {
          coreResult.compliance.items.push({
            description: 'Building Control notification (rewire/new CU)',
            total: AUTO_OVERHEADS_2025.certification.buildingControl,
            required: true,
            note: 'Required for notifiable work'
          });
          coreResult.compliance.subtotal = AUTO_OVERHEADS_2025.certification.buildingControl;
        }
      }
      
      if (!coreResult.complexity) {
        coreResult.complexity = {
          rating: complexityRating,
          label: complexityLabel,
          factors: [],
          recommendedMargin: complexityRating >= 4 ? 25 : complexityRating >= 3 ? 20 : 15,
          explanation: `${complexityLabel} complexity job requires ${complexityRating >= 3 ? 'higher' : 'standard'} margin.`
        };
        
        if (/heritage|listed|victorian|edwardian/.test(query)) {
          coreResult.complexity.factors.push('Heritage property - asbestos risk, careful chasing required');
        }
        if (/asbestos/.test(query)) {
          coreResult.complexity.factors.push('Asbestos present - survey and safe removal essential');
        }
        if (/occupied|live/.test(query)) {
          coreResult.complexity.factors.push('Occupied property - dustsheets, daily cleanup required');
        }
        if (/restricted access|narrow/.test(query)) {
          coreResult.complexity.factors.push('Restricted access - slower progress, equipment limitations');
        }
      }
      
      if (!coreResult.siteChecklist) {
        coreResult.siteChecklist = {
          critical: ['Confirm main fuse can be isolated', 'Check access to cable routes'],
          important: ['Parking arrangements', 'Client availability for access']
        };
      }
      
      if (!coreResult.valueEngineering || coreResult.valueEngineering.length === 0) {
        coreResult.valueEngineering = [];
      }
      
      if (!coreResult.upsells) {
        coreResult.upsells = [];
      }
      
      if (!coreResult.conversations) {
        coreResult.conversations = {
          opening: "I've prepared a detailed quote based on current market rates and BS 7671 compliance.",
          tooExpensive: "The quote reflects current material costs and proper installation time to BS 7671 standards.",
          discountRequest: "The quote is competitive using trade pricing and realistic labour times."
        };
      }
      
      if (!coreResult.pipeline) {
        coreResult.pipeline = [];
      }
      
      // Add graceful degradation for missing orderList
      if (!coreResult.orderList || !coreResult.orderList.bySupplier) {
        logger.info('OrderList missing, generating default from materials');
        
        // Group materials by supplier
        const bySupplier: Record<string, { items: any[], subtotal: number, accountNumber?: string }> = {};
        let totalItems = 0;
        
        if (coreResult.materials && coreResult.materials.items) {
          coreResult.materials.items.forEach((material: any) => {
            const supplier = material.supplier || 'CEF/Rexel';
            
            if (!bySupplier[supplier]) {
              bySupplier[supplier] = {
                items: [],
                subtotal: 0,
                accountNumber: supplier === 'CEF/Rexel' ? 'Use your trade account' : undefined
              };
            }
            
            bySupplier[supplier].items.push({
              code: material.code || undefined,
              description: material.name,
              quantity: material.quantity,
              unit: material.unit || 'ea',
              unitPrice: material.unitCost || 0,
              total: material.total
            });
            
            bySupplier[supplier].subtotal += material.total;
            totalItems += material.quantity;
          });
        }
        
        coreResult.orderList = {
          bySupplier,
          totalItems,
          estimatedDelivery: '1-2 working days (trade counter collection)',
          notes: ['Order list generated from materials breakdown', 'Verify stock availability before ordering']
        };
      }
    }

    // Deterministic fallback if core AI fails completely
    if (!coreResult) {
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

    // Parse core result with GPT-5 fallback if needed
    let costResult: any;
    let parseRetries = 0;
    const maxParseRetries = 1;
    
    while (!costResult && parseRetries <= maxParseRetries) {
      try {
        if (coreResult.toolCalls && coreResult.toolCalls.length > 0) {
          // AI wrapper already extracted tool call args into content
          costResult = parseJsonWithRepair(coreResult.content, logger, 'cost-engineer-tool-call');
        } else {
          // Direct JSON mode response
          costResult = parseJsonWithRepair(coreResult.content, logger, 'cost-engineer-json-mode');
        }
        
        // Validate critical structure
        if (!costResult.materials || !costResult.labour || !costResult.response) {
          throw new Error('AI returned incomplete cost estimate structure');
        }
        
      } catch (parseError: any) {
        logger.error('JSON parsing failed', { 
          attempt: parseRetries + 1,
          error: parseError.message,
          rawLength: coreResult.content?.length,
          preview: coreResult.content?.substring(0, 500)
        });
        
        // If first attempt failed and we're using gpt-5-mini, retry with gpt-5
        if (parseRetries === 0) {
          logger.warn('Retrying with GPT-5 for more reliable JSON generation');
          
          try {
            coreResult = await callAI(OPENAI_API_KEY, {
              model: 'gpt-5-mini-2025-08-07', // Fallback to mini if nano fails
              systemPrompt,
              userPrompt,
              maxTokens: 8000,
              timeoutMs: 180000,
              jsonMode: true,
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
                        description: 'Professional response explaining the estimate, regulations, and recommendations'
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
                                wholesalePrice: { type: 'number' },
                                markup: { type: 'number' },
                                unitPrice: { type: 'number' },
                                total: { type: 'number' },
                                inStock: { type: 'boolean' }
                              },
                              required: ['description', 'quantity', 'unitPrice', 'total']
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
                        },
                        required: ['tasks', 'subtotal', 'vat', 'total']
                      },
                      summary: {
                        type: 'object',
                        properties: {
                          materialsSubtotal: { type: 'number' },
                          labourSubtotal: { type: 'number' },
                          totalBeforeVAT: { type: 'number' },
                          vat: { type: 'number' },
                          totalWithVAT: { type: 'number' }
                        },
                        required: ['materialsSubtotal', 'labourSubtotal', 'totalBeforeVAT', 'vat', 'totalWithVAT']
                      }
                    },
                    required: ['response', 'materials', 'labour', 'summary']
                  }
                }
              }]
            });
            parseRetries++;
          } catch (retryError: any) {
            logger.error('GPT-5 fallback also failed', { error: retryError.message });
            throw new Error('AI response formatting issue. Please try again.');
          }
        } else {
          // Both attempts failed
          throw new Error('AI response formatting issue. Please try again.');
        }
      }
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
    const materialsWholesale = costResult.materials?.subtotal || 0;  // Wholesale price
    const materialsMarkup = costResult.materials?.totalMarkup || 0;  // 15% markup amount
    const materialsSubtotalWithMarkup = costResult.materials?.subtotalWithMarkup || 0;  // Wholesale + Markup
    const materialsVat = costResult.materials?.vat || 0;
    const materialsTotal = costResult.materials?.total || 0;  // With VAT
    
    const labourSubtotal = costResult.labour?.subtotal || 0;  // No VAT
    const labourVat = costResult.labour?.vat || 0;
    const labourTotal = costResult.labour?.total || 0;  // With VAT
    
    // CORRECTED CALCULATION: Materials (with markup) + Labour
    const netBeforeVAT = materialsSubtotalWithMarkup + labourSubtotal;
    const totalVAT = materialsVat + labourVat;
    const grandTotal = materialsTotal + labourTotal;

    costResult.summary = {
      materialsWholesale: Number(materialsWholesale.toFixed(2)),  // Wholesale cost
      materialsMarkup: Number(materialsMarkup.toFixed(2)),        // 15% markup
      materialsSubtotal: Number(materialsSubtotalWithMarkup.toFixed(2)),  // Materials with markup
      materialsVAT: Number(materialsVat.toFixed(2)),
      materialsTotal: Number(materialsTotal.toFixed(2)),
      
      labourSubtotal: Number(labourSubtotal.toFixed(2)),
      labourVAT: Number(labourVat.toFixed(2)),
      labourTotal: Number(labourTotal.toFixed(2)),
      
      subtotal: Number(netBeforeVAT.toFixed(2)),  // Net before VAT
      vat: Number(totalVAT.toFixed(2)),
      grandTotal: Number(grandTotal.toFixed(2))
    };


    // VALIDATION: Verify calculations match the rules
    const materialsCheck = costResult.materials?.subtotalWithMarkup || 0;
    const labourCheck = costResult.labour?.subtotal || 0;
    const calculatedSubtotal = materialsCheck + labourCheck;
    const reportedSubtotal = costResult.summary.subtotal || 0;
    
    if (Math.abs(reportedSubtotal - calculatedSubtotal) > 0.01) {
      logger.error('❌ CALCULATION MISMATCH', {
        materialsWithMarkup: materialsCheck,
        labourSubtotal: labourCheck,
        calculatedSubtotal,
        reportedSubtotal,
        difference: (reportedSubtotal - calculatedSubtotal).toFixed(2),
        differencePercent: ((reportedSubtotal - calculatedSubtotal) / calculatedSubtotal * 100).toFixed(2) + '%'
      });
      
      // AUTO-CORRECT: Force correct calculation
      costResult.summary.subtotal = Number(calculatedSubtotal.toFixed(2));
      const correctedVAT = calculatedSubtotal * (COST_ENGINEER_PRICING.VAT_RATE / 100);
      costResult.summary.vat = Number(correctedVAT.toFixed(2));
      costResult.summary.grandTotal = Number((calculatedSubtotal + correctedVAT).toFixed(2));
      
      logger.info('✅ Auto-corrected calculations', costResult.summary);
    }

    // ==== CALL 2: PROFITABILITY ANALYSIS (only if businessSettings exist AND not skipped) ====
    if (businessSettings && !skipProfitability) {
      logger.info('🧮 Starting profitability analysis', { hasBusinessSettings: true, splitMode: true });
      const profitabilityStart = Date.now();
      
      const profitabilitySystemPrompt = `Profitability Analysis for UK Electrician

BUSINESS SETTINGS:
Monthly Overheads:
- Van costs: £${businessSettings.monthlyOverheads.vanCosts}
- Tool depreciation: £${businessSettings.monthlyOverheads.toolDepreciation}
- Business insurance: £${businessSettings.monthlyOverheads.insurance}
- Office/admin: £${businessSettings.monthlyOverheads.adminCosts}
- Marketing: £${businessSettings.monthlyOverheads.marketing}
- Total monthly overheads: £${Object.values(businessSettings.monthlyOverheads).reduce((a: number, b: number) => a + b, 0)}/month
- Per working day (22 days): £${(Object.values(businessSettings.monthlyOverheads).reduce((a: number, b: number) => a + b, 0) / 22).toFixed(2)}/day

Labour Rates:
- Qualified electrician: £${businessSettings.labourRates.electrician}/hr
- Apprentice: £${businessSettings.labourRates.apprentice}/hr
- Target personal income: £${businessSettings.labourRates.targetIncome}/month

Profit Margin Targets:
- Minimum margin: ${businessSettings.profitTargets.minimum}%
- Target margin: ${businessSettings.profitTargets.target}%
- Premium margin: ${businessSettings.profitTargets.premium}%

Job-Specific Costs:
- Average travel per job: £${businessSettings.jobCosts.travel}
- Permits/parking: £${businessSettings.jobCosts.permits}
- Waste disposal: £${businessSettings.jobCosts.waste}

CURRENT JOB COSTS:
- Materials subtotal (with markup): £${costResult.summary.materialsSubtotal}
- Labour subtotal: £${costResult.summary.labourSubtotal}
- Total labour hours: ${costResult.labour.tasks.reduce((sum: number, task: any) => sum + (task.hours || 0), 0)} hours
- Estimated job duration: ${costResult.timescales?.totalDays || 0} days

PROFITABILITY CALCULATION REQUIREMENTS:
1. Estimate total job duration in working days (use timescales.totalDays from job)
2. Calculate job overhead allocation:
   - Daily overhead rate = monthly overheads / 22 working days
   - Job overhead = daily rate × estimated job days
   - Add job-specific costs (travel + permits + waste)
3. Calculate break-even point:
   - Direct costs = materials subtotal + labour subtotal (from above)
   - Job overheads = allocated overheads + travel + permits + waste
   - Break-even subtotal = direct costs + job overheads
   - Break-even VAT = break-even subtotal × 0.20
   - Break-even total = break-even subtotal + VAT
4. Calculate profitability tiers:
   - Minimum: break-even subtotal × (1 + ${businessSettings.profitTargets.minimum / 100})
   - Target: break-even subtotal × (1 + ${businessSettings.profitTargets.target / 100}) ← RECOMMENDED
   - Premium: break-even subtotal × (1 + ${businessSettings.profitTargets.premium / 100})
5. For each tier, calculate:
   - Margin amount = (tier subtotal - break-even subtotal)
   - VAT = tier subtotal × 0.20
   - Total with VAT = tier subtotal + VAT
6. Provide clear recommendations

Return ONLY profitability analysis object.`;

      const profitabilityUserPrompt = `Calculate profitability analysis for this job using the business settings and job costs above.`;

      try {
        const profitabilityResult = await callAI(OPENAI_API_KEY, {
          model: 'gpt-5-mini-2025-08-07',
          systemPrompt: profitabilitySystemPrompt,
          userPrompt: profitabilityUserPrompt,
          maxTokens: 4000,
          timeoutMs: 280000,
          jsonMode: true,
          tools: [{
            type: 'function',
            function: {
              name: 'calculate_profitability',
              description: 'Calculate break-even and profitability guidance',
              parameters: {
                type: 'object',
                properties: {
                  directCosts: {
                    type: 'object',
                    properties: {
                      materials: { type: 'number' },
                      labour: { type: 'number' },
                      total: { type: 'number' }
                    },
                    required: ['materials', 'labour', 'total']
                  },
                  jobOverheads: {
                    type: 'object',
                    properties: {
                      allocatedBusinessOverheads: { type: 'number' },
                      travel: { type: 'number' },
                      permitsAndFees: { type: 'number' },
                      wasteDisposal: { type: 'number' },
                      total: { type: 'number' }
                    },
                    required: ['allocatedBusinessOverheads', 'total']
                  },
                  breakEvenPoint: { type: 'number' },
                  quoteTiers: {
                    type: 'object',
                    properties: {
                      minimum: {
                        type: 'object',
                        properties: {
                          price: { type: 'number' },
                          margin: { type: 'number' },
                          marginPercent: { type: 'number' }
                        },
                        required: ['price', 'margin', 'marginPercent']
                      },
                      target: {
                        type: 'object',
                        properties: {
                          price: { type: 'number' },
                          margin: { type: 'number' },
                          marginPercent: { type: 'number' }
                        },
                        required: ['price', 'margin', 'marginPercent']
                      },
                      premium: {
                        type: 'object',
                        properties: {
                          price: { type: 'number' },
                          margin: { type: 'number' },
                          marginPercent: { type: 'number' }
                        },
                        required: ['price', 'margin', 'marginPercent']
                      }
                    },
                    required: ['minimum', 'target', 'premium']
                  },
                  recommendations: {
                    type: 'array',
                    items: { type: 'string' }
                  }
                },
                required: ['directCosts', 'jobOverheads', 'breakEvenPoint', 'quoteTiers', 'recommendations']
              }
            }
          }],
          toolChoice: { type: 'function', function: { name: 'calculate_profitability' } }
        });

        const profitabilityMs = Date.now() - profitabilityStart;
        logger.info('✅ Profitability analysis completed', { duration: profitabilityMs });

        // Parse and attach profitability analysis
        try {
          let profitabilityAnalysis;
          if (profitabilityResult.toolCalls && profitabilityResult.toolCalls.length > 0) {
            profitabilityAnalysis = parseJsonWithRepair(profitabilityResult.content, logger, 'profitability-tool-call');
          } else {
            profitabilityAnalysis = parseJsonWithRepair(profitabilityResult.content, logger, 'profitability-json');
          }
          
          // Transform profitability analysis to match frontend interface
          const jobDuration = costResult.timescales?.totalDays || 1;
          const breakEvenSubtotal = profitabilityAnalysis.breakEvenPoint || 0;
          const minimumPrice = profitabilityAnalysis.quoteTiers?.minimum?.price || 0;
          const targetPrice = profitabilityAnalysis.quoteTiers?.target?.price || 0;
          const premiumPrice = profitabilityAnalysis.quoteTiers?.premium?.price || 0;
          
          costResult.profitabilityAnalysis = {
            directCosts: profitabilityAnalysis.directCosts || { materials: 0, labour: 0, total: 0 },
            jobOverheads: {
              estimatedDuration: `${jobDuration} day${jobDuration > 1 ? 's' : ''}`,
              overheadAllocation: profitabilityAnalysis.jobOverheads?.allocatedBusinessOverheads || 0,
              travelCosts: profitabilityAnalysis.jobOverheads?.travel || 0,
              permitsCosts: profitabilityAnalysis.jobOverheads?.permitsAndFees || 0,
              wasteCosts: profitabilityAnalysis.jobOverheads?.wasteDisposal || 0,
              total: profitabilityAnalysis.jobOverheads?.total || 0
            },
            breakEven: {
              subtotal: breakEvenSubtotal,
              vat: breakEvenSubtotal * 0.20,
              total: breakEvenSubtotal * 1.20,
              explanation: `You must charge at least this amount to cover all direct costs (£${(profitabilityAnalysis.directCosts?.total || 0).toFixed(2)}) plus allocated job overheads (£${(profitabilityAnalysis.jobOverheads?.total || 0).toFixed(2)}).`
            },
            quotingGuidance: {
              minimum: {
                margin: profitabilityAnalysis.quoteTiers?.minimum?.marginPercent || 0,
                subtotal: minimumPrice,
                vat: minimumPrice * 0.20,
                total: minimumPrice * 1.20,
                profit: profitabilityAnalysis.quoteTiers?.minimum?.margin || 0,
                explanation: `Minimum viable quote - covers costs with small ${(profitabilityAnalysis.quoteTiers?.minimum?.marginPercent || 0).toFixed(1)}% margin`
              },
              target: {
                margin: profitabilityAnalysis.quoteTiers?.target?.marginPercent || 0,
                subtotal: targetPrice,
                vat: targetPrice * 0.20,
                total: targetPrice * 1.20,
                profit: profitabilityAnalysis.quoteTiers?.target?.margin || 0,
                explanation: `Recommended quote - healthy ${(profitabilityAnalysis.quoteTiers?.target?.marginPercent || 0).toFixed(1)}% profit margin for business growth`
              },
              premium: {
                margin: profitabilityAnalysis.quoteTiers?.premium?.marginPercent || 0,
                subtotal: premiumPrice,
                vat: premiumPrice * 0.20,
                total: premiumPrice * 1.20,
                profit: profitabilityAnalysis.quoteTiers?.premium?.margin || 0,
                explanation: `Premium quote - strong ${(profitabilityAnalysis.quoteTiers?.premium?.marginPercent || 0).toFixed(1)}% margin for high-value clients`
              }
            },
            recommendations: profitabilityAnalysis.recommendations || []
          };
          
          logger.info('Profitability analysis transformed and attached', { 
            breakEvenTotal: costResult.profitabilityAnalysis.breakEven.total,
            targetQuote: costResult.profitabilityAnalysis.quotingGuidance.target.total
          });

          // ==== TIER 1: PDF ENRICHMENT CALCULATIONS ====
          const totalHours = costResult.labour.tasks.reduce((sum: number, task: any) => sum + (task.hours || 0), 0);
          const materialsNet = costResult.materials.items.reduce((sum: number, item: any) => {
            const netCost = (item.total || 0) / 1.15; // Reverse 15% markup
            return sum + netCost;
          }, 0);
          const materialsMarkup = costResult.summary.materialsSubtotal - materialsNet;
          const markupPercent = materialsNet > 0 ? ((materialsMarkup / materialsNet) * 100) : 15;

          costResult.pdfEnrichment = {
            materialsNet: Number(materialsNet.toFixed(2)),
            materialsMarkup: Number(materialsMarkup.toFixed(2)),
            markupPercent: Number(markupPercent.toFixed(1)),
            labourHours: totalHours,
            labourRate: businessSettings?.labourRates?.electrician || 45,
            profitPerHour: {
              minimum: totalHours > 0 ? Number((costResult.profitabilityAnalysis.quotingGuidance.minimum.profit / totalHours).toFixed(2)) : 0,
              target: totalHours > 0 ? Number((costResult.profitabilityAnalysis.quotingGuidance.target.profit / totalHours).toFixed(2)) : 0,
              premium: totalHours > 0 ? Number((costResult.profitabilityAnalysis.quotingGuidance.premium.profit / totalHours).toFixed(2)) : 0
            },
            dates: {
              generated: new Date().toISOString(),
              displayDate: new Date().toLocaleDateString('en-GB', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })
            },
            contingency: {
              percent: 10,
              amount: Number((costResult.summary.subtotal * 0.10).toFixed(2))
            }
          };

          logger.info('PDF enrichment calculations added', { 
            materialsNet: costResult.pdfEnrichment.materialsNet,
            profitPerHour: costResult.pdfEnrichment.profitPerHour.target
          });

          // ==== TIER 2: AI CONTEXTUAL INTELLIGENCE (PARALLEL CALLS) ====
          logger.info('🤖 Starting AI contextual intelligence enhancement (split into 2 parallel calls)');
          const enhancementStart = Date.now();

          // CALL 3A: Core Intelligence (quick, always completes)
          const coreIntelligencePrompt = `Based on this electrical job estimate, provide core business intelligence:

JOB DESCRIPTION: ${query}
MATERIALS: ${costResult.materials.items.length} items, £${costResult.summary.materialsSubtotal}
LABOUR: ${totalHours} hours, £${costResult.summary.labourSubtotal}
BREAK-EVEN: £${breakEvenSubtotal}
TARGET QUOTE: £${targetPrice}

Provide:
1. Complexity Analysis (rating 1-5, clear label, explanation, 3-5 key factors)
2. Risk Assessment (3-5 specific risks with severity and brief mitigation)
3. Confidence Scores (materials %, labour %, contingency % with recommendation)
4. AI Reasoning (2-3 sentences explaining why this price is appropriate)
5. Top 3 Actions (specific, prioritized next steps)`;

          const coreIntelligenceCall = callAI(OPENAI_API_KEY, {
            model: 'gpt-5-mini-2025-08-07',
            systemPrompt: 'You are an expert electrical business consultant analyzing jobs for UK electricians.',
            userPrompt: coreIntelligencePrompt,
            maxTokens: 3000,
            timeoutMs: 280000,
            jsonMode: true,
            tools: [{
              type: 'function',
              function: {
                name: 'provide_core_intelligence',
                description: 'Provide core business intelligence analysis',
                parameters: {
                  type: 'object',
                  properties: {
                    complexity: {
                      type: 'object',
                      properties: {
                        rating: { type: 'number', minimum: 1, maximum: 5 },
                        label: { type: 'string' },
                        explanation: { type: 'string' },
                        factors: { type: 'array', items: { type: 'string' } }
                      },
                      required: ['rating', 'label', 'explanation', 'factors']
                    },
                    risk: {
                      type: 'object',
                      properties: {
                        overallLevel: { type: 'string', enum: ['Low', 'Medium', 'High'] },
                        factors: {
                          type: 'array',
                          items: {
                            type: 'object',
                            properties: {
                              factor_name: { type: 'string' },
                              risk_level: { type: 'string', enum: ['low', 'medium', 'high'] },
                              description: { type: 'string' }
                            }
                          }
                        }
                      },
                      required: ['overallLevel', 'factors']
                    },
                    confidence: {
                      type: 'object',
                      properties: {
                        overall: { type: 'number', minimum: 0, maximum: 100 },
                        materials: { type: 'number', minimum: 0, maximum: 100 },
                        labour: { type: 'number', minimum: 0, maximum: 100 },
                        contingency: { type: 'number', minimum: 0, maximum: 100 },
                        recommendation: { type: 'string' }
                      },
                      required: ['overall', 'materials', 'labour', 'contingency', 'recommendation']
                    },
                    reasoning: { type: 'string' },
                    actions: {
                      type: 'array',
                      items: { type: 'string' },
                      minItems: 3,
                      maxItems: 3
                    }
                  },
                  required: ['complexity', 'risk', 'confidence', 'reasoning', 'actions']
                }
              }
            }],
            toolChoice: { type: 'function', function: { name: 'provide_core_intelligence' } }
          });

          // CALL 3B: Business Opportunities (slower, rich data)
          const businessOpportunitiesPrompt = `Based on this electrical job, identify revenue opportunities and provide client conversation tools:

JOB DESCRIPTION: ${query}
MATERIALS: ${costResult.materials.items.length} items, £${costResult.summary.materialsSubtotal}
LABOUR: ${totalHours} hours
TARGET QUOTE: £${targetPrice}

CRITICAL JSON FORMATTING RULES:
- Use apostrophes (') for ALL contractions in text fields: "we're" NOT "we"re"
- Use apostrophes (') for possessives: "it's" NOT "it"s", "that's" NOT "that"s"
- Keep scripts professional and simple
- Avoid quotes within quoted strings - use apostrophes instead
- Example GOOD script: "While we're upgrading your electrics, it makes sense to add an EV charger now - we'll connect it to the new consumer unit."
- Example BAD script: "While we"re upgrading..." (will break JSON parsing)

Provide:
1. Upsell Opportunities (3-5 relevant add-ons with: name, price, win_rate %, why relevant, time required, client script, is_hot boolean)
2. Future Pipeline (2-4 likely future jobs: title, priority high/medium/low, timing, estimated_value, description, follow-up trigger)
3. Conversation Scripts (opening pitch, response to "too expensive", response to discount request)
4. Site Checklist (3-5 critical safety/access checks, 3-5 important preparation checks)
5. Property Context (estimate property age and electrical installation age from job type)`;

          const businessOpportunitiesCall = callAI(OPENAI_API_KEY, {
            model: 'gpt-5-mini-2025-08-07',
            systemPrompt: 'You are an expert electrical business consultant helping UK electricians maximize revenue and manage client conversations.',
            userPrompt: businessOpportunitiesPrompt,
            maxTokens: 4000,
            timeoutMs: 280000,
            jsonMode: true,
            tools: [{
              type: 'function',
              function: {
                name: 'provide_business_opportunities',
                description: 'Provide upsells, pipeline, and client conversation tools',
                parameters: {
                  type: 'object',
                  properties: {
                    upsells: {
                      type: 'array',
                      items: {
                        type: 'object',
                        properties: {
                          opportunity_name: { type: 'string' },
                          price: { type: 'number' },
                          win_rate: { type: 'number', minimum: 0, maximum: 100 },
                          why: { type: 'string' },
                          time: { type: 'string' },
                          script: { type: 'string' },
                          is_hot: { type: 'boolean' }
                        }
                      }
                    },
                    pipeline: {
                      type: 'array',
                      items: {
                        type: 'object',
                        properties: {
                          opportunity_title: { type: 'string' },
                          priority: { type: 'string', enum: ['high', 'medium', 'low'] },
                          timing: { type: 'string' },
                          estimated_value: { type: 'number' },
                          description: { type: 'string' },
                          trigger: { type: 'string' }
                        }
                      }
                    },
                    conversations: {
                      type: 'object',
                      properties: {
                        opening: { type: 'string' },
                        tooExpensive: { type: 'string' },
                        discountRequest: { type: 'string' }
                      },
                      required: ['opening', 'tooExpensive', 'discountRequest']
                    },
                    siteChecklist: {
                      type: 'object',
                      properties: {
                        critical: { type: 'array', items: { type: 'string' } },
                        important: { type: 'array', items: { type: 'string' } }
                      },
                      required: ['critical', 'important']
                    },
                    propertyContext: {
                      type: 'object',
                      properties: {
                        age: { type: 'string' },
                        installationAge: { type: 'string' }
                      },
                      required: ['age', 'installationAge']
                    }
                  },
                  required: ['upsells', 'pipeline', 'conversations', 'siteChecklist', 'propertyContext']
                }
              }
            }],
            toolChoice: { type: 'function', function: { name: 'provide_business_opportunities' } }
          });

          // Define fallback objects FIRST (before they're used)
          const defaultCore = {
            complexity: { rating: 3, label: 'Medium', explanation: 'Standard electrical job', factors: ['Standard complexity'] },
            risk: { overallLevel: 'Medium', factors: [{ factor_name: 'General site risks', risk_level: 'medium', description: 'Standard safety precautions required' }] },
            confidence: { overall: 75, materials: 80, labour: 75, contingency: 70, recommendation: 'Estimate based on standard rates and typical job complexity' },
            reasoning: 'Price calculated from standard labour times and current material costs with appropriate contingency.',
            actions: ['Confirm site access and supply isolation', 'Order materials 3-5 days before start', 'Schedule installation with client']
          };

          const defaultBusiness = {
            upsells: [],
            pipeline: [],
            conversations: {
              opening: 'Based on the work required, I\'ve prepared a detailed quote that covers all materials, labour, and compliance with BS 7671 regulations.',
              tooExpensive: 'This price reflects current material costs and the proper installation time needed to meet BS 7671 standards. Cutting corners isn\'t an option when it comes to electrical safety.',
              discountRequest: 'The quote is already competitive for the quality and compliance level provided. However, I can explore alternative solutions if budget is a concern.'
            },
            siteChecklist: {
              critical: ['Verify main supply can be safely isolated', 'Check for asbestos risk in older properties', 'Confirm access to all work areas'],
              important: ['Measure accurate cable runs', 'Check for hidden obstacles (plasterboard, insulation)', 'Identify earthing system type', 'Note any existing installation defects']
            },
            propertyContext: { age: 'Unknown', installationAge: 'Unknown' }
          };

          // Run both calls in parallel with coordinated timeout
          const enhancementWithRetry = async (callFn: Promise<any>, fallback: any, name: string) => {
            try {
              const result = await callFn;
              return { status: 'fulfilled', value: result };
            } catch (error) {
              logger.warn(`${name} failed, using fallback`, { error });
              return { status: 'rejected', reason: error, fallback };
            }
          };

          // Wrap parallel calls with coordinated 300s timeout
          const parallelEnhancement = Promise.all([
            enhancementWithRetry(coreIntelligenceCall, defaultCore, 'Core Intelligence'),
            enhancementWithRetry(businessOpportunitiesCall, defaultBusiness, 'Business Opportunities')
          ]);

          const [coreResult, opportunitiesResult] = await Promise.race([
            parallelEnhancement,
            new Promise<never>((_, reject) => 
              setTimeout(() => reject(new Error('Enhancement calls exceeded 300s timeout')), 300000)
            )
          ]);


          const enhancementMs = Date.now() - enhancementStart;
          logger.info('✅ AI enhancement calls completed', { 
            duration: enhancementMs,
            coreStatus: coreResult.status,
            opportunitiesStatus: opportunitiesResult.status
          });

          // Merge results with intelligent fallbacks
          try {
            let coreIntelligence;
            let businessOpportunities;

            // Parse core intelligence (critical data)
            if (coreResult.status === 'fulfilled') {
              const rawCore = coreResult.value.content;
              logger.debug('Parsing JSON for core-intelligence', { rawLength: rawCore.length });
              coreIntelligence = safeJsonParse(rawCore, 'core-intelligence');
              logger.info('Core intelligence parsed successfully', {
                complexityRating: coreIntelligence.complexity?.rating
              });
            } else {
              logger.warn('Core intelligence call failed, using fallback', { error: coreResult.reason });
              coreIntelligence = (coreResult as any).fallback || defaultCore;
            }

            // Parse business opportunities (valuable but non-critical)
            if (opportunitiesResult.status === 'fulfilled') {
              const rawOpportunities = opportunitiesResult.value.content;
              logger.debug('Parsing JSON for business-opportunities', { rawLength: rawOpportunities.length });
              
              try {
                businessOpportunities = safeJsonParse(rawOpportunities, 'business-opportunities');
                logger.info('Business opportunities parsed successfully', {
                  upsellCount: businessOpportunities.upsells?.length,
                  pipelineCount: businessOpportunities.pipeline?.length
                });
              } catch (parseError: any) {
                logger.warn('JSON parse failed for business-opportunities', { 
                  error: parseError.message,
                  sample: rawOpportunities.substring(0, 500)
                });
                logger.error('Failed to parse AI enhancement results', { error: `Invalid JSON from AI: ${parseError.message}. Repair failed: ${rawOpportunities.substring(0, 100)}...` });
                businessOpportunities = defaultBusiness;
              }
            } else {
              logger.warn('Business opportunities call failed, using fallback', { error: opportunitiesResult.reason });
              businessOpportunities = (opportunitiesResult as any).fallback || defaultBusiness;
            }

            // Merge both results
            costResult.aiEnhancement = {
              ...coreIntelligence,
              ...businessOpportunities
            };

            logger.info('AI enhancement merged successfully', {
              hasComplexity: !!costResult.aiEnhancement.complexity,
              hasUpsells: !!costResult.aiEnhancement.upsells?.length,
              hasPipeline: !!costResult.aiEnhancement.pipeline?.length
            });

          } catch (parseError: any) {
            logger.error('Failed to parse AI enhancement results', { error: parseError.message });
            // Ultimate fallback
            costResult.aiEnhancement = {
              complexity: { rating: 3, label: 'Medium', explanation: 'Standard electrical job', factors: [] },
              risk: { overallLevel: 'Medium', factors: [] },
              confidence: { overall: 75, materials: 80, labour: 75, contingency: 70, recommendation: 'Estimate based on standard rates' },
              reasoning: 'Price calculated from standard labour times and current material costs.',
              actions: ['Confirm site access', 'Order materials', 'Schedule installation'],
              upsells: [],
              pipeline: [],
              conversations: {
                opening: 'Based on the work required, here\'s a detailed quote.',
                tooExpensive: 'This price reflects current material costs and proper installation time to BS 7671 standards.',
                discountRequest: 'The quote is already competitive for the quality of work provided.'
              },
              siteChecklist: {
                critical: ['Verify supply isolation', 'Check asbestos risk'],
                important: ['Measure cable runs', 'Check access']
              },
              propertyContext: { age: 'Unknown', installationAge: 'Unknown' }
            };
          }

        } catch (parseError: any) {
          logger.warn('Failed to parse profitability analysis, continuing without it', { error: parseError.message });
        }

      } catch (profitError: any) {
        logger.warn('Profitability analysis failed, continuing without it', { 
          error: profitError.message,
          duration: Date.now() - profitabilityStart
        });
        // Don't fail the entire request if profitability fails
      }
    } else {
      logger.info('Skipping profitability analysis (no business settings provided)');
    }

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
      itemsCount: costResult.materials?.items?.length,
      hasProfitability: !!costResult.profitabilityAnalysis
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
    const { error: metricsError } = await supabase.from('agent_metrics').insert({
      function_name: 'cost-engineer-v3',
      request_id: requestId,
      rag_time: ragStart ? Date.now() - ragStart : null,
      total_time: totalTime,
      regulation_count: (installationResults?.length || 0) + (pmResults?.length || 0),
      success: true,
      query_type: parsedEntities.jobType || 'general'
    });
    if (metricsError) logger.warn('Failed to log metrics', { error: metricsError.message });

    // Return response (Designer-v3 compatible structure, no regulations)
    return new Response(
      JSON.stringify({
        success: true,
        response: costResult.response,                 // Narrative text from AI
        structuredData: costResult,                    // Full structured breakdown
        citations: [],                                 // Cost Engineer doesn't cite regulations
        enrichment,                                    // UI metadata
        rendering,                                     // Display hints + sources callout
        suggestedNextAgents: suggestNextAgents(
          'cost-engineer',
          query,
          costResult.response,
          previousAgentOutputs?.map((o: any) => o.agent) || []
        ).map((s: any) => ({
          ...s,
          contextHint: generateContextHint(s.agent, 'cost-engineer', costResult)
        })),
        metadata: {
          requestId,
          provider: 'OpenAI',
          model: 'gpt-5-mini-2025-08-07',
          totalMs: Date.now() - functionStart,
          ragMs: Date.now() - ragStart,
          aiMs: Date.now() - aiStart,
          pricingItems: finalPricingResults?.length || 0,
          labourTimeItems: labourTimeResults?.length || 0,
          contextSources,
          receivedFrom: previousAgentOutputs?.map((o: any) => o.agent).join(', ') || 'none'
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
