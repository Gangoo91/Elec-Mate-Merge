import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.39.3';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

interface ToolItem {
  id: number;
  name: string;
  category: string;
  price: string;
  supplier: string;
  image: string;
  stockStatus: string;
  isOnSale?: boolean;
  salePrice?: string;
  highlights?: string[];
  productUrl?: string;
}

interface AIRecommendation {
  type: 'alternative' | 'bundle' | 'upgrade' | 'accessory';
  title: string;
  description: string;
  tools: ToolItem[];
  reasoning: string;
  potentialSavings?: string;
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    console.log('🤖 [AI-TOOL-RECOMMENDATIONS] Starting request...');
    
    const { searchQuery, tools = [] } = await req.json();
    
    console.log(`🔍 Analyzing ${tools.length} tools for search: "${searchQuery}"`);

    if (!tools || tools.length === 0) {
      return new Response(JSON.stringify({
        success: true,
        recommendations: [],
        insights: {
          totalAnalyzed: 0,
          categories: [],
          averagePrice: 0,
          topBrands: []
        }
      }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    const openAIApiKey = Deno.env.get('OPENAI_API_KEY');
    if (!openAIApiKey) {
      throw new Error('OpenAI API key not configured');
    }

    // Analyze tools and generate AI recommendations
    const toolAnalysis = analyzeTools(tools);
    const recommendations = await generateAIRecommendations(tools, searchQuery, openAIApiKey);

    console.log(`✅ Generated AI insights with ${recommendations.length} recommendations`);

    return new Response(JSON.stringify({
      success: true,
      recommendations,
      insights: toolAnalysis
    }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });

  } catch (error) {
    console.error('❌ Error in ai-tool-recommendations:', error);
    return new Response(JSON.stringify({
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error occurred'
    }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});

function analyzeTools(tools: ToolItem[]) {
  const categories = [...new Set(tools.map(tool => tool.category))];
  const brands = [...new Set(tools.map(tool => extractBrand(tool.name)))];
  const prices = tools.map(tool => parseFloat(tool.price.replace(/[£,]/g, '')));
  const averagePrice = prices.length > 0 ? prices.reduce((a, b) => a + b, 0) / prices.length : 0;

  return {
    totalAnalyzed: tools.length,
    categories,
    averagePrice: Math.round(averagePrice),
    topBrands: brands.slice(0, 5),
    priceRange: prices.length > 0 ? {
      min: Math.min(...prices),
      max: Math.max(...prices)
    } : { min: 0, max: 0 }
  };
}

function extractBrand(toolName: string): string {
  const commonBrands = ['Bosch', 'DeWalt', 'Makita', 'Milwaukee', 'Festool', 'Hilti', 'Stanley', 'Klein', 'Fluke', 'Wera'];
  for (const brand of commonBrands) {
    if (toolName.toLowerCase().includes(brand.toLowerCase())) {
      return brand;
    }
  }
  return 'Other';
}

async function generateAIRecommendations(tools: ToolItem[], searchQuery: string, apiKey: string): Promise<AIRecommendation[]> {
  const prompt = `You are a professional electrician's assistant analyzing tools for: "${searchQuery}".

Tools available:
${tools.map(tool => `- ${tool.name} (${tool.price}) - ${tool.supplier} ${tool.isOnSale ? '(ON SALE)' : ''}`).join('\n')}

Generate 3-4 actionable recommendations for an electrician. Focus on:
1. BRAND COMPATIBILITY: Tools that work together (same battery platform, etc.)
2. VALUE BUNDLES: Combinations that save money
3. PROFESSIONAL UPGRADES: Higher quality alternatives for daily use
4. ESSENTIAL ACCESSORIES: Must-have add-ons for complete jobs

Return as JSON array with this structure:
[{
  "type": "bundle|alternative|upgrade|accessory",
  "title": "Short recommendation title",
  "description": "2-3 sentence explanation",
  "reasoning": "Why this recommendation makes sense for electricians",
  "potentialSavings": "£XX or XX% savings" (if applicable)
}]

Keep descriptions practical and specific to electrical work.`;

  const response = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      model: 'gpt-4.1-2025-04-14',
      messages: [{ role: 'user', content: prompt }],
      max_tokens: 1500,
      temperature: 0.7,
    }),
  });

  if (!response.ok) {
    throw new Error(`OpenAI API error: ${response.statusText}`);
  }

  const data = await response.json();
  const content = data.choices[0].message.content;
  
  try {
    const recommendations = JSON.parse(content);
    return Array.isArray(recommendations) ? recommendations : [];
  } catch (parseError) {
    console.error('Failed to parse AI recommendations:', parseError);
    return [];
  }
}