import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const openAIApiKey = Deno.env.get('OPENAI_API_KEY');

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

interface MaterialItem {
  id: number;
  name: string;
  category: string;
  price: string;
  supplier: string;
  stockStatus: string;
  productUrl?: string;
  highlights?: string[];
  numericPrice: number;
  rating?: number;
  deliveryInfo?: string;
}

interface AIRecommendation {
  type: 'alternative' | 'bundle' | 'upgrade' | 'warning';
  title: string;
  description: string;
  savings?: number;
  confidence: number;
  products?: MaterialItem[];
}

interface SmartMatching {
  matchedGroups: MaterialItem[][];
  alternatives: MaterialItem[];
  recommendations: AIRecommendation[];
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { products, searchTerm, userLocation } = await req.json();
    
    console.log(`🤖 AI Material Recommendations - Processing ${products.length} products for "${searchTerm}"`);

    if (!openAIApiKey) {
      throw new Error('OpenAI API key not configured');
    }

    // Smart Product Matching using AI
    const matchingResult = await smartProductMatching(products, searchTerm);
    
    // Value Analysis using AI
    const valueAnalysis = await performValueAnalysis(products, userLocation);
    
    // Purchase Recommendations
    const purchaseRecommendations = await generatePurchaseRecommendations(products, searchTerm, userLocation);

    // Combine all AI insights
    const aiInsights = {
      smartMatching: matchingResult,
      valueAnalysis,
      purchaseRecommendations,
      summary: {
        totalProducts: products.length,
        matchedGroups: matchingResult.matchedGroups.length,
        alternatives: matchingResult.alternatives.length,
        recommendations: [...matchingResult.recommendations, ...valueAnalysis.recommendations, ...purchaseRecommendations].length
      }
    };

    console.log(`✅ AI analysis complete - Generated ${aiInsights.summary.recommendations} recommendations`);

    return new Response(JSON.stringify(aiInsights), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('❌ Error in AI material recommendations:', error);
    return new Response(JSON.stringify({ 
      error: 'AI analysis failed', 
      details: error.message,
      fallback: {
        smartMatching: { matchedGroups: [], alternatives: [], recommendations: [] },
        valueAnalysis: { recommendations: [], insights: [] },
        purchaseRecommendations: []
      }
    }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});

async function smartProductMatching(products: MaterialItem[], searchTerm: string): Promise<SmartMatching> {
  const prompt = `
As an electrical materials expert, analyze these products and identify equivalent items across different suppliers.

Search Term: "${searchTerm}"
Products: ${JSON.stringify(products.map(p => ({
  name: p.name,
  supplier: p.supplier,
  price: p.price,
  category: p.category,
  highlights: p.highlights?.slice(0, 2)
})))}

Tasks:
1. Group equivalent products that are essentially the same item from different suppliers
2. Identify alternative products that could serve the same purpose but with different specifications
3. Generate specific recommendations for better value or upgraded options

Focus on electrical specifications like:
- Cable: core count, conductor size (mm²), voltage rating, insulation type
- Components: current rating (A), voltage rating (V), breaking capacity
- Lighting: wattage, colour temperature, IP rating, beam angle

Respond in JSON format:
{
  "matchedGroups": [
    [/* equivalent products array */]
  ],
  "alternatives": [/* alternative products that could work */],
  "recommendations": [
    {
      "type": "alternative|upgrade|bundle|warning",
      "title": "Brief recommendation title",
      "description": "Detailed explanation",
      "savings": 15,
      "confidence": 0.9
    }
  ]
}`;

  try {
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${openAIApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-4.1-2025-04-14',
        messages: [
          { role: 'system', content: 'You are an expert electrical materials specialist with deep knowledge of UK suppliers, product specifications, and BS7671 compliance.' },
          { role: 'user', content: prompt }
        ],
        max_tokens: 2000,
        temperature: 0.3,
      }),
    });

    const data = await response.json();
    const aiResponse = JSON.parse(data.choices[0].message.content);
    
    return {
      matchedGroups: aiResponse.matchedGroups || [],
      alternatives: aiResponse.alternatives || [],
      recommendations: aiResponse.recommendations || []
    };
  } catch (error) {
    console.error('Smart matching error:', error);
    return { matchedGroups: [], alternatives: [], recommendations: [] };
  }
}

async function performValueAnalysis(products: MaterialItem[], userLocation?: string): Promise<{ recommendations: AIRecommendation[], insights: string[] }> {
  const prompt = `
Perform a comprehensive value analysis of these electrical materials:

Products: ${JSON.stringify(products.map(p => ({
  name: p.name,
  supplier: p.supplier,
  price: p.price,
  stockStatus: p.stockStatus,
  deliveryInfo: p.deliveryInfo,
  rating: p.rating
})))}

User Location: ${userLocation || 'UK'}

Consider:
1. Total cost of ownership (price + delivery + potential downtime)
2. Supplier reliability and trade account benefits
3. Stock availability and lead times
4. Quality indicators and warranty terms
5. Bulk pricing opportunities

Provide practical recommendations focusing on:
- Cost savings opportunities
- Quality vs price trade-offs
- Delivery optimization
- Risk mitigation (stock availability)

Respond in JSON format:
{
  "recommendations": [
    {
      "type": "alternative|bundle|upgrade|warning",
      "title": "Recommendation title",
      "description": "Detailed value analysis",
      "savings": 25,
      "confidence": 0.8
    }
  ],
  "insights": ["Key insight 1", "Key insight 2"]
}`;

  try {
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${openAIApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-4.1-2025-04-14',
        messages: [
          { role: 'system', content: 'You are a procurement specialist for electrical contractors, expert in UK supplier relationships and total cost optimization.' },
          { role: 'user', content: prompt }
        ],
        max_tokens: 1500,
        temperature: 0.2,
      }),
    });

    const data = await response.json();
    return JSON.parse(data.choices[0].message.content);
  } catch (error) {
    console.error('Value analysis error:', error);
    return { recommendations: [], insights: [] };
  }
}

async function generatePurchaseRecommendations(products: MaterialItem[], searchTerm: string, userLocation?: string): Promise<AIRecommendation[]> {
  const prompt = `
Generate smart purchase recommendations for electrical materials:

Search: "${searchTerm}"
Products: ${JSON.stringify(products.slice(0, 5).map(p => ({
  name: p.name,
  supplier: p.supplier,
  price: p.price,
  stockStatus: p.stockStatus
})))}

Location: ${userLocation || 'UK'}

Focus on:
1. Bundling opportunities (cables + accessories)
2. Quantity break points and bulk discounts
3. Delivery optimization (combine orders)
4. Stock level warnings
5. Seasonal pricing patterns
6. Alternative specifications that meet requirements

Generate 2-3 actionable recommendations that save money or reduce risk.

Respond in JSON format as array of recommendations:
[
  {
    "type": "bundle|alternative|warning",
    "title": "Actionable recommendation title",
    "description": "Specific advice with numbers",
    "savings": 30,
    "confidence": 0.9
  }
]`;

  try {
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${openAIApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-4.1-2025-04-14',
        messages: [
          { role: 'system', content: 'You are an experienced electrical contractor who knows how to save money on materials while maintaining quality and compliance.' },
          { role: 'user', content: prompt }
        ],
        max_tokens: 1000,
        temperature: 0.4,
      }),
    });

    const data = await response.json();
    return JSON.parse(data.choices[0].message.content);
  } catch (error) {
    console.error('Purchase recommendations error:', error);
    return [];
  }
}