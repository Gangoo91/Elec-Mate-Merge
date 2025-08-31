import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const openAIApiKey = Deno.env.get('OpenAI API') || Deno.env.get('OPENAI_API_KEY');

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

// Static fallback data for emergency cases
const fallbackTools = [
  {
    id: 1,
    name: "Fluke 1653B Installation Tester",
    category: "Testers",
    price: "£489.00",
    supplier: "RS Components",
    image: "/placeholder.svg",
    description: "Professional multifunction installation tester for electrical safety testing",
    productUrl: "https://uk.rs-online.com/web/p/installation-testers/0123456",
    stockStatus: "In Stock",
    highlights: ["17th Edition compliant", "Loop impedance testing", "RCD testing"]
  },
  {
    id: 2,
    name: "Wiha VDE Screwdriver Set",
    category: "Hand Tools", 
    price: "£34.99",
    supplier: "Screwfix",
    image: "/placeholder.svg",
    description: "VDE insulated screwdriver set for safe electrical work",
    productUrl: "https://www.screwfix.com/p/wiha-vde-screwdriver-set",
    stockStatus: "In Stock",
    highlights: ["VDE certified", "1000V rated", "Comfortable grip"]
  },
  {
    id: 3,
    name: "Makita DHR202 SDS Drill",
    category: "Power Tools",
    price: "£179.00", 
    supplier: "Toolstation",
    image: "/placeholder.svg",
    description: "Cordless SDS plus rotary hammer drill for electrical installations",
    productUrl: "https://www.toolstation.com/makita-dhr202-sds-drill",
    stockStatus: "In Stock",
    highlights: ["18V LXT battery", "20mm drilling capacity", "Anti-vibration"]
  }
];

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    console.log('Starting AI electrical tools generation...');

    if (!openAIApiKey) {
      console.log('No OpenAI API key found, returning fallback data');
      return new Response(JSON.stringify({
        products: fallbackTools,
        supplier: "Static Fallback",
        generated_at: new Date().toISOString(),
        categories: {
          testers: 1,
          handTools: 1,
          powerTools: 1
        }
      }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    // Set timeout for OpenAI request
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 15000); // 15 second timeout

    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      signal: controller.signal,
      headers: {
        'Authorization': `Bearer ${openAIApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-5-nano-2025-08-07',
        max_completion_tokens: 2500,
        messages: [
          {
            role: 'system',
            content: `Generate 24 UK electrical tools as a JSON array. Categories: 8 Testers, 8 Hand Tools, 8 Power Tools.

JSON format (no other text):
[
  {
    "id": 1,
    "name": "Brand Model Name",
    "category": "Testers",
    "price": "£XX.XX",
    "supplier": "Screwfix",
    "image": "/placeholder.svg",
    "description": "Brief professional description",
    "productUrl": "https://example.com/product",
    "stockStatus": "In Stock",
    "highlights": ["Feature 1", "Feature 2"]
  }
]

Categories:
- Testers: Multimeters, Socket testers, Voltage detectors, PAT testers, Installation testers, Earth loop testers, Insulation testers, Continuity testers
- Hand Tools: Wire strippers, Cable cutters, Pliers, Screwdrivers, Crimping tools, Cable grips, Knockout punches, Conduit benders  
- Power Tools: SDS drills, Impact drivers, Angle grinders, Cable pulling systems, Core bits, Diamond saws, Reciprocating saws, Cable strippers

Suppliers: Screwfix, Toolstation, CPC, RS Components
UK prices: £15-£500 range
Stock: "In Stock", "Low Stock", "Out of Stock"

Return ONLY the JSON array.`
          },
          {
            role: 'user',
            content: 'Generate the 24 electrical tools JSON array now.'
          }
        ],
      }),
    });

    clearTimeout(timeoutId);

    if (!response.ok) {
      const errorText = await response.text();
      console.error('OpenAI API error:', errorText);
      throw new Error(`OpenAI API error: ${response.status} ${errorText}`);
    }

    const data = await response.json();
    console.log('OpenAI response received successfully');

    let toolsData;
    try {
      const content = data.choices[0].message.content;
      console.log('Raw OpenAI content:', content.substring(0, 500) + '...');
      
      // Extract JSON from the response with multiple fallback strategies
      let cleanContent = content.trim();
      
      // Remove markdown code blocks
      cleanContent = cleanContent.replace(/```json\s*/g, '').replace(/```\s*/g, '');
      
      // Try to find JSON array
      const jsonMatch = cleanContent.match(/\[[\s\S]*\]/);
      if (jsonMatch) {
        toolsData = JSON.parse(jsonMatch[0]);
      } else {
        // Try parsing the entire content
        toolsData = JSON.parse(cleanContent);
      }
      
      console.log(`Successfully parsed ${toolsData.length} tools`);
    } catch (parseError) {
      console.error('Failed to parse OpenAI response:', parseError);
      throw new Error('Failed to parse AI response');
    }

    // Validate and clean the data
    const validTools = toolsData.filter((tool: any) => 
      tool.name && tool.category && tool.price && tool.supplier
    ).map((tool: any, index: number) => ({
      ...tool,
      id: index + 1,
      image: "/placeholder.svg", // Use consistent placeholder
      productUrl: tool.productUrl || `https://www.${tool.supplier.toLowerCase().replace(/\s+/g, '')}.com/search?q=${encodeURIComponent(tool.name)}`,
      stockStatus: tool.stockStatus || "In Stock",
      highlights: Array.isArray(tool.highlights) ? tool.highlights.slice(0, 3) : ["Professional grade", "BS 7671 compliant", "UK specification"]
    }));

    console.log(`Returning ${validTools.length} valid electrical tools`);

    return new Response(JSON.stringify({
      products: validTools,
      supplier: "AI Generated",
      generated_at: new Date().toISOString(),
      categories: {
        testers: validTools.filter((t: any) => t.category === "Testers").length,
        handTools: validTools.filter((t: any) => t.category === "Hand Tools").length,
        powerTools: validTools.filter((t: any) => t.category === "Power Tools").length
      }
    }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });

  } catch (error) {
    console.error('Error in ai-electrical-tools function:', error);
    
    // Return fallback data instead of error for better UX
    console.log('Returning fallback data due to error');
    return new Response(JSON.stringify({
      products: fallbackTools,
      supplier: "Fallback Data",
      generated_at: new Date().toISOString(),
      categories: {
        testers: 1,
        handTools: 1,
        powerTools: 1
      },
      note: "AI generation failed, showing sample tools"
    }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});