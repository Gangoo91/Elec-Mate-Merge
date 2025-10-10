// COST ENGINEER AGENT - Pricing estimates with RAG
// Note: UK English only in user-facing strings. Do not use UK-only words like 'whilst' in code keywords.
import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve, createClient, corsHeaders } from '../_shared/deps.ts';
import { handleError, ValidationError, getErrorMessage } from '../_shared/errors.ts';
import { validateAgentRequest, getRequestBody } from '../_shared/validation.ts';

// corsHeaders imported from shared deps

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { messages, context } = await req.json();
    const lovableApiKey = Deno.env.get('LOVABLE_API_KEY');
    if (!lovableApiKey) throw new Error('LOVABLE_API_KEY not configured');

    // RAG - Get pricing data from database
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    const supabase = createClient(supabaseUrl, supabaseKey);
    
    const userMessage = messages[messages.length - 1]?.content || '';
    const ragQuery = `${userMessage} electrical materials cable MCB accessories`;
    
    console.log(`🔍 RAG: Searching pricing data for: ${ragQuery} `);
    
    // Generate embedding for pricing search
    const embeddingResponse = await fetch('https://ai.gateway.lovable.dev/v1/embeddings', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${lovableApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'text-embedding-3-small',
        input: ragQuery,
      }),
    });

    let pricingData = '';
    if (embeddingResponse.ok) {
      const embeddingDataRes = await embeddingResponse.json();
      const embedding = embeddingDataRes.data[0].embedding;
      
      const { data: pricingResults, error: ragError } = await supabase.rpc('search_pricing', {
        query_embedding: embedding,
        match_threshold: 0.7,
        match_count: 15
      });

    if (!ragError && pricingResults && pricingResults.length > 0) {
        console.log(`✅ Found ${pricingResults.length} pricing items`);
        console.log('Top 3 items:', pricingResults.slice(0, 3).map((p: any) => 
          `${p.item_name} - £${p.base_cost} @ ${p.wholesaler}`
        ));
        pricingData = pricingResults.map((p: any) => 
          `${p.item_name} - £${p.base_cost} (${p.price_per_unit}) at ${p.wholesaler} ${p.in_stock ? '✓ In Stock' : '⚠ Out of Stock'}`
        ).join('\n');
      } else {
        console.log('⚠️ No relevant pricing data found for query:', ragQuery);
      }
    }

    const previousAgents = context?.previousAgentOutputs?.map((a: any) => a.agent) || [];
    const hasDesigner = previousAgents.includes('designer');
    const hasInstaller = previousAgents.includes('installer');

    let systemPrompt = `You are a cost estimator providing itemised UK electrical installation pricing (2025 rates).

CRITICAL RULES:
1. DO NOT discuss circuit design, cable calculations, or technical specifications
2. DO NOT repeat any design information from previous agents
3. START IMMEDIATELY with "MATERIALS BREAKDOWN" - no preamble about circuits or design
4. Use design specs ONLY to identify which materials to price - never repeat the specifications
5. Use bullet points (•) for each material line item

CRITICAL: Use the pricing data from our database below. Reference actual suppliers and stock status.

⚠️ 2025 MARKET RATE VALIDATION:
Consumer Units (Metal, dual RCD):
- 6-way: £55-85
- 10-way: £95-130
- 18-way: £280-420

MCBs (Type B):
- 6A-10A: £8-10 each
- 16A-20A: £11-13 each
- 25A-32A: £12-15 each
- 40A-50A: £15-19 each
- 63A+: £19-25 each

MCBs (Type C): Add 25% to Type B prices
RCBOs: £28-45 each (varies by amperage)

Twin & Earth Cable (6242Y per metre):
- 1.0mm²: £0.65-0.95
- 1.5mm²: £0.85-1.20
- 2.5mm²: £1.30-1.80
- 4mm²: £2.10-2.90
- 6mm²: £3.20-4.50
- 10mm²: £5.50-7.80
- 16mm²: £9.50-13.50

⚠️ PRICE SANITY CHECK: If database pricing is >30% below market rates above, flag for review and use market rate instead.

FORMAT YOUR RESPONSE AS:

MATERIALS BREAKDOWN
• [Item name] ([quantity/length]) - £[price] from [Supplier] [In Stock / Lead time X days]
• [repeat for each component needed]

Subtotal Materials: £[total]

LABOUR ESTIMATE
Use realistic circuit-based time estimates. DO NOT inflate hours.

Typical UK electrician rates (2025):
- Qualified electrician: £250-350/day (regional variation)
- Mate (improver): £150-200/day

Time per circuit type (includes first fix + second fix):
- Ring main: 5hrs
- Lighting circuit: 3.5hrs
- Cooker circuit: 2.5hrs
- Shower circuit: 3hrs
- Consumer unit change: 3hrs
- Testing & commissioning: scales with circuit count

Format:
Installation time: [X] hours / [Y] days
Breakdown: [circuit-by-circuit time breakdown]
Rate: £[rate]/day (qualified electrician)
Labour cost: £[total]

Subtotal Labour: £[total]

PROJECT TOTAL
Materials: £[materials total]
Labour: £[labour total]

SUBTOTAL: £[combined total]
VAT (20%): £[vat amount]

FINAL QUOTE: £[total inc VAT]

PRICING NOTES
[Any assumptions, alternative suppliers, or value engineering suggestions]

`;

    if (hasDesigner) {
      systemPrompt += `\nThe designer's already spec'd the circuit, so price up those exact materials. Include cable, MCBs, accessories, clips, grommets - everything needed.`;
    }

    if (hasInstaller) {
      systemPrompt += `\nInstallation method's been covered, so factor in the labour time they mentioned when pricing.`;
    }

    systemPrompt += `\n\nCURRENT PRICING DATABASE (use these actual prices):\n${pricingData || 'No specific pricing found in database - estimate typical 2025 UK wholesale prices from CEF/Screwfix/TLC'}\n\nYou MUST end your response with the structured breakdown format above. Include all components needed for the installation.`;

    const response = await fetch('https://ai.gateway.lovable.dev/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${lovableApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'google/gemini-2.5-flash',
        messages: [
          { role: 'system', content: systemPrompt }, 
          ...messages,
          ...(context?.structuredKnowledge ? [{
            role: 'system',
            content: context.structuredKnowledge
          }] : [])
        ],
        max_completion_tokens: calculateTokenLimit(extractCircuitCount(userMessage)) // Phase 4: Adaptive tokens
      }),
    });

    const data = await response.json();
    let responseContent = data.choices[0]?.message?.content || 'Cost estimate complete.';
    
    // Strip any design-related crossover content
    const designKeywords = [
      'circuit specification', 'voltage drop calculation', 'bs 7671 compliance', 
      'cable specification:', 'design current', 'protection device:', 'correction factors',
      'derated capacity', 'safety margin', 'tabulated capacity', 'load:', 'distance from board:',
      'installation:', 'supply:', 'calculations'
    ];
    
    // Find where MATERIALS BREAKDOWN starts and only keep from there onwards
    const materialsIndex = responseContent.indexOf('MATERIALS BREAKDOWN');
    if (materialsIndex > 0) {
      responseContent = responseContent.substring(materialsIndex);
    }
    
    return new Response(JSON.stringify({
      response: responseContent,
      confidence: 0.85
    }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });

  } catch (error) {
    return new Response(JSON.stringify({ 
      error: error instanceof Error ? error.message : 'Cost agent failed',
      response: 'Unable to provide cost estimate.',
      confidence: 0.3
    }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});

// Phase 4: Adaptive Token Limits
function calculateTokenLimit(circuitCount: number): number {
  const baseTokens = 2000;
  const perCircuitTokens = 300;
  return Math.min(baseTokens + (circuitCount * perCircuitTokens), 8000);
}

function extractCircuitCount(message: string): number {
  const wayMatch = message.match(/(\d+)[\s-]?way/i);
  if (wayMatch) return parseInt(wayMatch[1]);
  
  const circuitMatch = message.match(/(\d+)\s+circuits?/i);
  if (circuitMatch) return parseInt(circuitMatch[1]);
  
  return 6;
}
