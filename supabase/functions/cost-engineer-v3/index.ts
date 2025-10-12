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

    // Step 2: Search pricing database
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    const supabase = createClient(supabaseUrl, supabaseKey);

    logger.debug('Searching pricing data');

    const { data: pricingResults, error: pricingError } = await supabase.rpc('search_pricing', {
      query_embedding: queryEmbedding,
      match_threshold: 0.7,
      match_count: 15
    });

    if (pricingError) {
      logger.warn('Pricing search failed', { error: pricingError });
    }

    // Step 3: Build pricing context
    const pricingContext = pricingResults && pricingResults.length > 0
      ? pricingResults.map((p: any) => 
          `${p.item_name} - £${p.base_cost} (${p.price_per_unit}) at ${p.wholesaler} ${p.in_stock ? '✓ In Stock' : '⚠ Out of Stock'}`
        ).join('\n')
      : 'No specific pricing data found. Use typical UK electrical wholesale prices.';

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

    const systemPrompt = `You are an expert VALUE ENGINEER specialising in UK electrical installations.

Write all responses in UK English (British spelling and terminology). Do not use American spellings.

YOUR UNIQUE VALUE: You are a VALUE ENGINEER, not just a price calculator
- Compare prices across MULTIPLE wholesalers (CEF, TLC Direct, Edmundson, RS Components, Screwfix Trade)
- Suggest cost-saving alternatives WITHOUT compromising compliance
- Identify economies of scale (bulk buy discounts, bundle deals)
- Flag overspecification opportunities (e.g., "10mm² would comply and save £150")
- Consider total cost of ownership (initial + maintenance)
- Provide supplier recommendations with availability status

CURRENT DATE: September 2025

PRICING DATABASE RESULTS (YOU MUST USE THIS DATA - DO NOT ESTIMATE):
${pricingContext}

🔴 CRITICAL INSTRUCTIONS FOR PRICING:
1. MATCH materials to pricing database entries FIRST
   Example: User asks for "16mm² cable" → Search above for "16mm² 6242Y Twin & Earth Cable - £5.50/m at City Electrical Factors"
   
2. EXTRACT the EXACT price, NOT an estimate:
   ✓ CORRECT: {"description": "16mm² 6242Y T&E Cable", "unitPrice": 5.50, "supplier": "City Electrical Factors"}
   ✗ WRONG: {"description": "16mm² cable", "unitPrice": 6.00, "supplier": "Generic"}
   
3. If material NOT in database, mark it clearly:
   {"description": "Unusual item XYZ", "unitPrice": 25.00, "supplier": "Estimated (not in database)", "notes": "Market average - confirm with supplier"}
   
4. COMPARE SUPPLIERS when multiple options exist:
   Include alternatives array showing price range across wholesalers
   
5. Labour rates for September 2025 UK:
   - Qualified Electrician: £45-65/hr (standard)
   - Supervisor/Senior: £65-85/hr
   - Apprentice: £20-30/hr
   - Include regional variations if applicable

6. VAT is ALWAYS 20% in UK (standard rate)

7. Match cable sizes, MCBs, RCDs, and accessories to database entries using the item_name field

VALUE ENGINEERING OPPORTUNITIES TO IDENTIFY:
- Alternative products with better value (e.g., "SWA instead of T&E for outdoor - no conduit needed")
- Timing optimization (supplier promotions, lead times)
- Bundle deals (CU + MCBs from same supplier = trade discount)
- Overspecification checks (is the specified cable size larger than necessary?)

The pricing database contains ${pricingResults?.length || 0} relevant items for this query.

${region ? `REGION: ${region}\n` : ''}${contextSection}

Respond ONLY with valid JSON in this exact format:
{
  "response": "DETAILED cost analysis (150-250 words) including: Material costs breakdown with quantities and unit prices (e.g., 16mm² cable at £X.XX/m × 45m = £XXX), protection device costs with specific model numbers, labour breakdown by task with time estimates (e.g., cable installation 2 hours at £XX/hr), regional pricing variations if applicable, VAT explanation, potential cost savings opportunities, supplier recommendations. Include markup percentages and any market factors affecting pricing.",
  "materials": {
    "items": [
      {"description": "Item name", "quantity": 1, "unit": "each", "unitPrice": 10.50, "total": 10.50, "supplier": "Wholesaler"}
    ],
    "subtotal": 100.00,
    "vat": 20.00,
    "total": 120.00
  },
  "labour": {
    "tasks": [
      {"description": "Task name", "hours": 2, "rate": 45.00, "total": 90.00}
    ],
    "subtotal": 200.00,
    "vat": 40.00,
    "total": 240.00
  },
  "summary": {
    "materialsTotal": 120.00,
    "labourTotal": 240.00,
    "subtotal": 360.00,
    "vat": 72.00,
    "grandTotal": 432.00
  },
  "notes": ["Additional cost information"],
  "suggestedNextAgents": [
    {"agent": "installer", "reason": "Verify labour time estimates with practical installation method", "priority": "high"},
    {"agent": "health-safety", "reason": "Review safety requirements and risk assessment", "priority": "medium"}
  ]
}`;

    const userPrompt = `Provide a detailed cost estimate for:
${query}

${materials ? `Materials required: ${JSON.stringify(materials)}` : ''}
${labourHours ? `Estimated labour: ${labourHours} hours` : ''}

STEP-BY-STEP PROCESS (FOLLOW THIS EXACTLY):
1. Review the PRICING DATABASE RESULTS above line-by-line
2. For each material needed:
   a) Find the matching item_name in the database (e.g., "16mm² cable" matches "16mm² 6242Y Twin & Earth Cable")
   b) Extract the base_cost as unitPrice
   c) Extract the wholesaler as supplier
   d) If multiple suppliers available, list alternatives with price comparison
   e) If in_stock is false, add note about availability and lead times
3. Build materials.items array with database prices (NOT estimates)
4. Calculate labour by task (cable installation, termination, testing, certification)
5. Add 20% VAT to both materials and labour
6. Identify VALUE ENGINEERING opportunities (cost savings without compromising compliance)
7. Provide itemized breakdown with supplier recommendations and notes

IMPORTANT: The pricing database above contains ${pricingResults?.length || 0} relevant items. Use them!
Include accurate UK pricing, VAT at 20%, alternatives analysis, and value engineering recommendations.`;

    // Step 4: Call AI with universal wrapper
    logger.debug('Calling AI with wrapper');
    const { callAI } = await import('../_shared/ai-wrapper.ts');
    
    const aiResult = await callAI(LOVABLE_API_KEY!, {
      model: 'google/gemini-2.5-flash',
      systemPrompt,
      userPrompt,
      maxTokens: 2000,
      timeoutMs: 55000,
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

    const aiData = JSON.parse(aiResult.content);
    const toolCall = aiData.choices[0].message.tool_calls[0];
    const costResult = JSON.parse(toolCall.function.arguments);

    // Validate RAG usage
    if (pricingResults && pricingResults.length > 0) {
      const usedPricingData = costResult.materials?.items?.some((item: any) => 
        pricingResults.some((p: any) => 
          item.description?.toLowerCase().includes(p.item_name?.toLowerCase().split(' ')[0])
        )
      );
      
      if (!usedPricingData) {
        logger.warn('AI did not use any pricing database results', { 
          availableItems: pricingResults.length,
          generatedItems: costResult.materials?.items?.length 
        });
      }
    }

    logger.info('Cost estimate completed', { 
      grandTotal: costResult.summary?.grandTotal,
      itemsCount: costResult.materials?.items?.length
    });

    // Step 5: Return response - flat format for router/UI
    const { response, suggestedNextAgents, materials, labour, summary, notes } = costResult;
    
    return new Response(
      JSON.stringify({
        response,
        structuredData: { materials, labour, summary, notes },
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
