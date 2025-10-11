import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { 
  corsHeaders, 
  createLogger, 
  generateRequestId, 
  handleError, 
  ValidationError,
  createClient,
  generateEmbedding,
  callLovableAI
} from '../_shared/v3-core.ts';

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  const requestId = generateRequestId();
  const logger = createLogger(requestId, { function: 'cost-engineer-v3' });

  try {
    const { query, materials, labourHours, region } = await req.json();

    if (!query || typeof query !== 'string') {
      throw new ValidationError('query is required and must be a string');
    }

    logger.info('Cost Engineer V3 request received', { query, materialsCount: materials?.length });

    // Get API keys
    const OPENAI_API_KEY = Deno.env.get('OPENAI_API_KEY');
    if (!OPENAI_API_KEY) {
      throw new Error('OPENAI_API_KEY not configured');
    }

    const LOVABLE_API_KEY = Deno.env.get('LOVABLE_API_KEY');
    if (!LOVABLE_API_KEY) {
      throw new Error('LOVABLE_API_KEY not configured');
    }

    // Step 1: Generate embedding for pricing search
    logger.debug('Generating query embedding');
    const queryEmbedding = await generateEmbedding(query, OPENAI_API_KEY);

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

    const systemPrompt = `You are an expert cost engineer specialising in UK electrical installations.

Your task is to provide accurate material and labour cost estimates.

CURRENT DATE: September 2025

AVAILABLE PRICING DATA:
${pricingContext}

${region ? `REGION: ${region}\n` : ''}

Respond ONLY with valid JSON in this exact format:
{
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
  "notes": ["Additional cost information"]
}`;

    const userPrompt = `Provide a detailed cost estimate for:
${query}

${materials ? `Materials required: ${JSON.stringify(materials)}` : ''}
${labourHours ? `Estimated labour: ${labourHours} hours` : ''}

Include accurate UK pricing, VAT at 20%, and any relevant notes.`;

    // Step 4: Call Lovable AI
    logger.debug('Calling Lovable AI');
    const aiResponse = await callLovableAI(systemPrompt, userPrompt, LOVABLE_API_KEY, {
      responseFormat: 'json_object'
    });

    const costResult = JSON.parse(aiResponse);

    logger.info('Cost estimate completed', { 
      grandTotal: costResult.summary?.grandTotal,
      itemsCount: costResult.materials?.items?.length
    });

    // Step 5: Return response
    return new Response(
      JSON.stringify({
        success: true,
        result: costResult,
        metadata: {
          requestId,
          pricingItemsFound: pricingResults?.length || 0,
          timestamp: new Date().toISOString()
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
