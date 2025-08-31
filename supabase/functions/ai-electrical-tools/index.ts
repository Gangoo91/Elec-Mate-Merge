import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const openAIApiKey = Deno.env.get('OpenAI API') || Deno.env.get('OPENAI_API_KEY');

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    console.log('Starting AI electrical tools generation...');

    if (!openAIApiKey) {
      throw new Error('OpenAI API key not found');
    }

    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${openAIApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-4.1-2025-04-14',
        max_tokens: 3000,
        temperature: 0.7,
        messages: [
          {
            role: 'system',
            content: `You are an expert UK electrical tools specialist. Generate a comprehensive list of electrical tools used by UK electricians, organized into three main categories: Testers, Hand Tools, and Power Tools.

For each tool, provide:
- Realistic product name with model/brand
- Accurate UK price range
- Professional description with key features
- Appropriate supplier (Screwfix, Toolstation, CPC, RS Components)
- Stock status
- Product highlights (2-3 key features)

Categories to include:
1. TESTERS: Multimeters, Socket testers, Voltage detectors, Continuity testers, PAT testers, Installation testers, Earth loop impedance testers, Insulation resistance testers
2. HAND TOOLS: Wire strippers, Cable cutters, Pliers (needle nose, side cutters), Screwdriver sets, Crimping tools, Cable pulling grips, Knockout punches, Conduit benders
3. POWER TOOLS: SDS drills, Impact drivers, Angle grinders, Cable pulling systems, Core drill bits, Diamond hole saws, Reciprocating saws

Return a JSON array with exactly this structure for each tool:
{
  "id": number,
  "name": "Product Name with Model",
  "category": "Testers|Hand Tools|Power Tools", 
  "price": "£XX.XX",
  "supplier": "Screwfix|Toolstation|CPC|RS Components",
  "image": "/placeholder.svg",
  "description": "Professional description with technical specs",
  "productUrl": "https://example.com/product",
  "stockStatus": "In Stock|Low Stock|Out of Stock",
  "highlights": ["Feature 1", "Feature 2", "Feature 3"]
}

Generate 30-40 tools total (10-15 per category). Use realistic UK electrical trade pricing. MUST return valid JSON only.`
          },
          {
            role: 'user',
            content: 'Generate a comprehensive list of electrical tools for UK electricians with realistic pricing and specifications.'
          }
        ],
      }),
    });

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
    return new Response(JSON.stringify({ 
      error: error.message,
      products: [],
      supplier: "Error"
    }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});