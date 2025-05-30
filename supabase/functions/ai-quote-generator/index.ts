
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { corsHeaders } from "../_shared/cors.ts";

const openAIApiKey = Deno.env.get('OpenAI API') || Deno.env.get('OPENAI_API_KEY');

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    if (!openAIApiKey) {
      console.error('OpenAI API key not configured');
      return new Response(
        JSON.stringify({ error: "OpenAI API key not configured" }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const requestData = await req.json();
    const { 
      jobType, 
      propertyDetails, 
      clientRequirements,
      region = "UK",
      standards = ["BS 7671", "Part P Building Regulations"],
      currency = "GBP"
    } = requestData;

    if (!jobType) {
      return new Response(
        JSON.stringify({ error: "Job type is required" }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Generate a unique quote variation seed
    const quoteSeed = Math.random().toString(36).substring(2, 8);
    const currentDate = new Date().toISOString();

    // Enhanced UK-specific system prompt with variation
    const systemMessage = `You are a professional UK electrical contractor's AI assistant specialising in accurate, varied electrical quotes.

CRITICAL REQUIREMENTS:
- Generate UNIQUE quotes with realistic price variations for each request
- Follow UK electrical standards (BS 7671:2018+A2:2022, Part P Building Regulations)
- Use current UK pricing with realistic market variations (±15-25%)
- Include proper cable specifications: 1.5mm² for lighting, 2.5mm² for socket circuits, 6mm² for showers/cookers
- Vary material brands, quantities, and specifications for realistic diversity
- Account for property-specific factors (age, access, complexity)

PROPERTY DETAILS:
- Job Type: ${jobType}
- Property: ${JSON.stringify(propertyDetails)}
- Client Requirements: ${clientRequirements || "Standard installation to BS 7671"}
- Region: ${region}
- Quote Variation Seed: ${quoteSeed}
- Generated: ${currentDate}

MATERIAL SPECIFICATIONS BY JOB TYPE:

REWIRE:
- Use 1.5mm² T&E for lighting circuits (NOT 2.5mm²)
- Use 2.5mm² T&E for socket circuits
- Consider property size: ${propertyDetails.bedrooms} bedrooms = ${parseInt(propertyDetails.bedrooms) * 150 + 200}m total cable approx
- Vary consumer unit sizes: 8-way (small), 12-way (medium), 16-way (large)
- Include earth bonding, testing equipment hire, waste disposal

SOCKET INSTALLATION:
- 2.5mm² T&E cable only
- Back boxes, mounting accessories
- Consider spur vs ring circuit options

SHOWER INSTALLATION:
- 10mm² or 6mm² cable depending on shower rating
- 45A switch, appropriate MCB (40A/45A)
- Include installation accessories

PRICING VARIATIONS:
- Apply realistic ±20% variations based on:
  * Material brand choices (MK, Crabtree, Hager vs budget alternatives)
  * Property complexity (Victorian/modern, access issues)
  * Regional pricing differences
  * Current market conditions (material shortages, demand)

RESPONSE FORMAT (JSON):
{
  "scopeOfWork": "Detailed scope with unique considerations for this property",
  "materials": [
    {
      "description": "Specific UK product with brand/spec (vary each time)",
      "quantity": realistic_quantity_with_variations,
      "unitPrice": varied_uk_market_price
    }
  ],
  "labour": {
    "days": realistic_days_with_property_considerations,
    "dailyRate": uk_electrician_rate_250_to_320,
    "description": "Labour breakdown with property-specific factors"
  },
  "compliance": {
    "standards": ["BS 7671:2018+A2:2022", "Part P Building Regulations"],
    "certificates": ["Electrical Installation Certificate", "Schedule of Test Results"],
    "inspectionRequired": true
  },
  "priceFactors": {
    "propertyAge": "factor affecting pricing",
    "complexity": "access/routing challenges",
    "marketCondition": "current material/labour market"
  }
}

IMPORTANT: Generate DIFFERENT materials, quantities, and prices each time. Avoid repetitive patterns.`;

    console.log('Generating varied UK electrical quote via OpenAI API');
    
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${openAIApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini',
        messages: [
          { role: 'system', content: systemMessage },
          { 
            role: 'user', 
            content: `Generate a unique UK electrical quote for a ${jobType} in a ${propertyDetails.bedrooms}-bedroom ${propertyDetails.type} with ${propertyDetails.floors} floors. 

SPECIFIC REQUIREMENTS:
- Use proper cable specifications (1.5mm² lighting, 2.5mm² sockets)
- Apply realistic price variations (not the same totals each time)
- Consider property factors: age, access, complexity
- Include varied material brands and specifications
- Provide realistic labour estimates with current UK rates

Make this quote unique and different from previous quotes with varied pricing and materials.` 
          }
        ],
        temperature: 0.3, // Increased for more variation
        max_tokens: 2500,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error('OpenAI API Error:', errorData);
      return new Response(
        JSON.stringify({ 
          error: `OpenAI API Error: ${errorData.error?.message || response.statusText}`,
        }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const data = await response.json();
    const aiResponse = data.choices[0].message.content;
    console.log('OpenAI response received for varied UK quote');

    // Enhanced JSON parsing with validation
    let parsedQuote;
    try {
      // Extract JSON from response
      const jsonMatch = aiResponse.match(/```json\s*([\s\S]*?)\s*```/) || 
                         aiResponse.match(/{[\s\S]*}/);
      
      if (!jsonMatch) {
        throw new Error('No JSON structure found in AI response');
      }

      const jsonString = jsonMatch[1] || jsonMatch[0];
      parsedQuote = JSON.parse(jsonString.trim());
      
      // Validate essential fields
      if (!parsedQuote.materials || !Array.isArray(parsedQuote.materials)) {
        throw new Error('Invalid materials structure in AI response');
      }
      
      if (!parsedQuote.labour || typeof parsedQuote.labour.days !== 'number') {
        throw new Error('Invalid labour structure in AI response');
      }

      // Ensure UK pricing standards with more variation
      const baseVariation = (Math.random() - 0.5) * 0.3; // ±15% base variation
      
      parsedQuote.materials = parsedQuote.materials.map(item => ({
        ...item,
        unitPrice: Math.max(0.50, parseFloat(item.unitPrice) * (1 + baseVariation) || 0),
        quantity: Math.max(1, parseInt(item.quantity) || 1)
      }));

      // Apply labour rate variation
      const labourVariation = 1 + (Math.random() - 0.5) * 0.25; // ±12.5% variation
      parsedQuote.labour.days = Math.max(0.25, parseFloat(parsedQuote.labour.days) || 1);
      parsedQuote.labour.dailyRate = Math.max(250, Math.round((parseFloat(parsedQuote.labour.dailyRate) || 280) * labourVariation));

      console.log('Successfully parsed and validated varied UK quote');

    } catch (error) {
      console.error('Error parsing AI response:', error);
      
      // Return raw response with error context
      return new Response(
        JSON.stringify({ 
          raw: aiResponse,
          error: "Could not parse AI response as valid quote structure",
          details: error.message
        }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    return new Response(
      JSON.stringify({ 
        quote: parsedQuote,
        generatedAt: new Date().toISOString(),
        region: region,
        currency: currency,
        quoteVariation: quoteSeed
      }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );

  } catch (error) {
    console.error('Error in ai-quote-generator function:', error);
    return new Response(
      JSON.stringify({ 
        error: error.message,
        timestamp: new Date().toISOString()
      }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});
