import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.39.3';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

interface MaterialItem {
  product: string;
  specs?: string;
  quantity?: string;
  rawLine: string;
}

interface ParsedList {
  items: MaterialItem[];
  confidence: number;
}

interface ProductScore {
  product: any;
  score: number;
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { materialsListText, preference = 'balanced', maxBudget, includeAlternatives = true } = await req.json();

    if (!materialsListText || materialsListText.trim().length === 0) {
      throw new Error('Materials list text is required');
    }

    console.log('[AI-MATERIALS-AGENT] Processing list:', { preference, maxBudget });

    const LOVABLE_API_KEY = Deno.env.get('LOVABLE_API_KEY');
    if (!LOVABLE_API_KEY) {
      throw new Error('LOVABLE_API_KEY not configured');
    }

    // Step 1: Parse materials list using Lovable AI
    console.log('[AI-MATERIALS-AGENT] Step 1: Parsing materials list with AI...');
    const parsePrompt = `You are an electrical materials expert. Parse this materials list into structured JSON.

Materials List:
${materialsListText}

Extract each item with:
- product: the product type/name (e.g., "Twin & Earth Cable", "RCD", "LED Downlight")
- specs: specifications like size, rating, color (e.g., "2.5mm²", "30mA", "6000K")
- quantity: amount needed (e.g., "100m", "20", "10 units")
- rawLine: the original line text

Return ONLY valid JSON in this format:
{
  "items": [
    {"product": "Twin & Earth Cable", "specs": "2.5mm²", "quantity": "100m", "rawLine": "..."},
    {"product": "RCD", "specs": "30mA", "quantity": "20", "rawLine": "..."}
  ],
  "confidence": 0.95
}`;

    const parseResponse = await fetch('https://ai.gateway.lovable.dev/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${LOVABLE_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'google/gemini-2.5-flash',
        messages: [
          { role: 'system', content: 'You are a JSON parser for electrical materials. Always return valid JSON only.' },
          { role: 'user', content: parsePrompt }
        ],
        temperature: 0.3,
      }),
    });

    if (!parseResponse.ok) {
      const errorText = await parseResponse.text();
      console.error('[AI-MATERIALS-AGENT] Parse API error:', errorText);
      throw new Error(`AI parsing failed: ${parseResponse.status}`);
    }

    const parseData = await parseResponse.json();
    const parsedContent = parseData.choices?.[0]?.message?.content || '{}';
    
    // Clean JSON response (remove markdown code blocks if present)
    const cleanJson = parsedContent.replace(/```json\n?/g, '').replace(/```\n?/g, '').trim();
    const parsedList: ParsedList = JSON.parse(cleanJson);

    console.log('[AI-MATERIALS-AGENT] Parsed items:', parsedList.items.length);

    // Step 2: Search for each item using RAG
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    const supabase = createClient(supabaseUrl, supabaseKey);

    const searchResults: any[] = [];
    
    for (const item of parsedList.items) {
      console.log(`[AI-MATERIALS-AGENT] Searching for: ${item.product} ${item.specs || ''}`);
      
      const searchQuery = `${item.product} ${item.specs || ''}`.trim();
      
      const { data, error } = await supabase.functions.invoke('search-pricing-rag', {
        body: { 
          query: searchQuery,
          matchCount: 15
        }
      });

      if (error) {
        console.error(`[AI-MATERIALS-AGENT] Search error for ${item.product}:`, error);
        continue;
      }

      if (data?.materials && data.materials.length > 0) {
        searchResults.push({
          requestedItem: item,
          foundProducts: data.materials
        });
      }
    }

    console.log('[AI-MATERIALS-AGENT] Found products for', searchResults.length, 'items');

    // Step 3: Score and select products based on preference
    const scoreProduct = (product: any, pref: string): number => {
      const price = parseFloat(product.price.replace(/[£,]/g, '')) || 0;
      
      if (pref === 'cheapest') {
        return 1 / (price || 1);
      }
      
      if (pref === 'best-quality') {
        const brandScore = ['Hager', 'MK', 'Schneider', 'Crabtree', 'BG'].some(b => 
          product.name.includes(b) || product.supplier.includes(b)
        ) ? 1.0 : 0.7;
        const stockScore = product.stockStatus === 'In Stock' ? 1.0 : 0.5;
        return (brandScore * 0.6) + (stockScore * 0.4);
      }
      
      // Balanced
      const priceScore = 1 / (price || 1);
      const stockScore = product.stockStatus === 'In Stock' ? 1.0 : 0.5;
      const brandScore = ['Hager', 'MK', 'Schneider', 'Crabtree', 'BG'].some(b => 
        product.name.includes(b) || product.supplier.includes(b)
      ) ? 1.0 : 0.7;
      
      return (priceScore * 0.35) + (stockScore * 0.30) + (brandScore * 0.35);
    };

    // Generate 3 options: cheapest, best-quality, balanced
    const generateOption = (optionType: string) => {
      const selectedItems = searchResults.map(result => {
        const scoredProducts = result.foundProducts
          .map((p: any) => ({ product: p, score: scoreProduct(p, optionType) }))
          .sort((a: ProductScore, b: ProductScore) => b.score - a.score);
        
        return {
          requestedItem: result.requestedItem,
          selectedProduct: scoredProducts[0]?.product,
          alternatives: includeAlternatives ? scoredProducts.slice(1, 4).map((s: ProductScore) => s.product) : []
        };
      }).filter(item => item.selectedProduct);

      const totalCost = selectedItems.reduce((sum, item) => {
        const price = parseFloat(item.selectedProduct.price.replace(/[£,]/g, '')) || 0;
        const qty = parseFloat(item.requestedItem.quantity?.replace(/[^\d.]/g, '') || '1');
        return sum + (price * qty);
      }, 0);

      const suppliers = [...new Set(selectedItems.map(item => item.selectedProduct.supplier))];
      
      return {
        name: optionType === 'cheapest' ? 'Cheapest Option' : 
              optionType === 'best-quality' ? 'Best Quality' : 'Balanced Option',
        totalCost: parseFloat(totalCost.toFixed(2)),
        items: selectedItems,
        suppliers,
        estimatedDelivery: '2-3 working days',
        withinBudget: maxBudget ? totalCost <= maxBudget : true
      };
    };

    const options = {
      cheapest: generateOption('cheapest'),
      bestQuality: generateOption('best-quality'),
      balanced: generateOption('balanced')
    };

    // Identify items not found
    const warnings = parsedList.items
      .filter(item => !searchResults.some(r => r.requestedItem.rawLine === item.rawLine))
      .map(item => `Could not find: ${item.product} ${item.specs || ''}`);

    const response = {
      success: true,
      parsedItems: parsedList.items,
      options,
      warnings,
      summary: {
        totalItemsRequested: parsedList.items.length,
        totalItemsFound: searchResults.length,
        parseConfidence: parsedList.confidence
      }
    };

    console.log('[AI-MATERIALS-AGENT] Success:', {
      itemsRequested: response.summary.totalItemsRequested,
      itemsFound: response.summary.totalItemsFound,
      cheapestTotal: options.cheapest.totalCost,
      bestQualityTotal: options.bestQuality.totalCost,
      balancedTotal: options.balanced.totalCost
    });

    return new Response(JSON.stringify(response), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });

  } catch (error: any) {
    console.error('[AI-MATERIALS-AGENT] Error:', error);
    return new Response(
      JSON.stringify({ 
        success: false, 
        error: error.message || 'Unknown error occurred' 
      }),
      { 
        status: 500, 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
      }
    );
  }
});
