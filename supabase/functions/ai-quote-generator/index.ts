
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

    // Enhanced UK-specific system prompt
    const systemMessage = `You are a professional UK electrical contractor's AI assistant specialising in accurate electrical quotes.

CRITICAL REQUIREMENTS:
- Generate quotes strictly compliant with UK electrical standards (BS 7671, Part P Building Regulations)
- Use current UK pricing for materials and labour (2024 rates)
- Include all necessary electrical components for safe, compliant installations
- Consider regional UK pricing variations and current material costs
- Account for inspection and testing requirements
- Include appropriate certification costs where applicable

PROPERTY DETAILS:
- Job Type: ${jobType}
- Property: ${JSON.stringify(propertyDetails)}
- Additional Requirements: ${clientRequirements || "Standard installation to BS 7671"}
- Region: ${region}
- Currency: ${currency}

RESPONSE FORMAT (JSON):
{
  "scopeOfWork": "Detailed scope including all work phases, safety requirements, and compliance steps",
  "materials": [
    {
      "description": "Accurate UK electrical component name with specifications",
      "quantity": number,
      "unitPrice": realistic_uk_price_in_pounds
    }
  ],
  "labour": {
    "days": estimated_working_days_decimal,
    "dailyRate": uk_electrician_daily_rate,
    "description": "Labour breakdown explanation"
  },
  "compliance": {
    "standards": ["BS 7671", "Part P"],
    "certificates": ["Installation Certificate", "Test Certificate"],
    "inspectionRequired": true/false
  }
}

Ensure all pricing reflects current UK market rates. Include realistic material costs, proper cable specifications, appropriate protective devices, and account for testing/inspection time.`;

    console.log('Generating UK electrical quote via OpenAI API');
    
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
            content: `Generate a comprehensive UK electrical quote for a ${jobType} in a ${propertyDetails.bedrooms}-bedroom ${propertyDetails.type} with ${propertyDetails.floors} floors. Include realistic current UK pricing and ensure full BS 7671 compliance.` 
          }
        ],
        temperature: 0.1, // Very low for consistent pricing
        max_tokens: 2000,
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
    console.log('OpenAI response received for UK quote');

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

      // Ensure UK pricing standards
      parsedQuote.materials = parsedQuote.materials.map(item => ({
        ...item,
        unitPrice: Math.max(0.50, parseFloat(item.unitPrice) || 0), // Minimum 50p
        quantity: Math.max(1, parseInt(item.quantity) || 1)
      }));

      parsedQuote.labour.days = Math.max(0.25, parseFloat(parsedQuote.labour.days) || 1);
      parsedQuote.labour.dailyRate = Math.max(200, parseFloat(parsedQuote.labour.dailyRate) || 280);

      console.log('Successfully parsed and validated UK quote');

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
        currency: currency
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
