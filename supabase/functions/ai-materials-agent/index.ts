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
  usedFallback?: boolean;
}

// Category mapping for better RAG filtering
const CATEGORY_MAP: Record<string, string> = {
  'twin & earth cable': 'Cables',
  'twin and earth': 'Cables',
  'twin & earth': 'Cables',
  'swa cable': 'Cables',
  'swa': 'Cables',
  'flex': 'Cables',
  'flex cable': 'Cables',
  'cable clip': 'Fixings & Consumables',
  'cable clips': 'Fixings & Consumables',
  'screw': 'Fixings & Consumables',
  'screws': 'Fixings & Consumables',
  'rawlplug': 'Fixings & Consumables',
  'rawlplugs': 'Fixings & Consumables',
  'double socket': 'Accessories',
  'socket': 'Accessories',
  'switch': 'Accessories',
  'switches': 'Accessories',
  'faceplate': 'Accessories',
  'led downlight': 'Lighting',
  'downlight': 'Lighting',
  'pendant light': 'Lighting',
  'ev charging': 'EV Charging',
  'ev charger': 'EV Charging',
  'consumer unit': 'Distribution',
  'rcd': 'Distribution',
  'rcbo': 'Distribution',
  'mcb': 'Distribution',
};

// Get category filter from product name
const getCategoryFilter = (product: string): string | undefined => {
  const lowerProduct = product.toLowerCase();
  for (const [key, category] of Object.entries(CATEGORY_MAP)) {
    if (lowerProduct.includes(key)) {
      return category;
    }
  }
  return undefined;
};

// Check if product passes required keyword filter
const passesKeywordFilter = (productName: string, requestedProduct: string): boolean => {
  const lowerName = productName.toLowerCase();
  const lowerRequest = requestedProduct.toLowerCase();
  
  // Cable requests should not return clips/fixings
  if (lowerRequest.includes('cable') && !lowerRequest.includes('clip')) {
    const excludeTerms = ['clip', 'clips', 'cleat', 'gland', 'glands', 'tray', 'trunk', 'conduit'];
    if (excludeTerms.some(term => lowerName.includes(term))) {
      return false;
    }
    // Cable requests should have 'cable' in the name
    return lowerName.includes('cable') || lowerName.includes('flex');
  }
  
  // Socket requests need "socket" in name
  if (lowerRequest.includes('socket')) {
    return lowerName.includes('socket');
  }
  
  // Downlight requests need "downlight" in name
  if (lowerRequest.includes('downlight')) {
    return lowerName.includes('downlight') || lowerName.includes('down light');
  }
  
  return true;
};

// Generate query variants for retry
const getQueryVariants = (query: string): string[] => {
  const variants = [query];
  const lower = query.toLowerCase();
  
  if (lower.includes('rcd') && lower.includes('ma')) {
    variants.push(query.replace(/(\d+)ma/i, '$1 ma'));
    variants.push(query.replace(/(\d+)\s*ma/i, '$1mA'));
  }
  
  if (lower.includes('ev charging')) {
    variants.push(query.replace(/ev charging point/i, 'ev charger'));
  }
  
  if (lower.includes('consumer unit')) {
    variants.push(query.replace(/consumer unit/i, 'fuse board'));
    variants.push(query.replace(/consumer unit/i, 'consumer board'));
  }
  
  return [...new Set(variants)];
};

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

    // Step 2: Search for each item using RAG (PARALLELIZED)
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    const supabase = createClient(supabaseUrl, supabaseKey);

    console.log('[AI-MATERIALS-AGENT] Starting parallel search for', parsedList.items.length, 'items...');
    
    // Search all items in parallel
    const searchPromises = parsedList.items.map(async (item) => {
      const searchQuery = `${item.product} ${item.specs || ''}`.trim();
      const categoryFilter = getCategoryFilter(item.product);
      
      console.log(`[AI-MATERIALS-AGENT] Searching for: ${searchQuery}`, categoryFilter ? `[${categoryFilter}]` : '');
      
      // Try primary search with category filter
      let searchResult = await supabase.functions.invoke('search-pricing-rag', {
        body: { 
          query: searchQuery,
          categoryFilter,
          matchCount: 15
        }
      });

      let usedFallback = false;
      
      // If no results, try query variants
      if (!searchResult.error && (!searchResult.data?.materials || searchResult.data.materials.length === 0)) {
        const variants = getQueryVariants(searchQuery);
        
        for (let i = 1; i < variants.length && (!searchResult.data?.materials || searchResult.data.materials.length === 0); i++) {
          console.log(`[AI-MATERIALS-AGENT] Trying variant: ${variants[i]}`);
          searchResult = await supabase.functions.invoke('search-pricing-rag', {
            body: { 
              query: variants[i],
              categoryFilter,
              matchCount: 15
            }
          });
          usedFallback = true;
        }
      }

      return {
        item,
        result: searchResult,
        usedFallback
      };
    });

    const searchSettled = await Promise.allSettled(searchPromises);
    
    const searchResults: any[] = [];
    for (const settled of searchSettled) {
      if (settled.status === 'fulfilled') {
        const { item, result, usedFallback } = settled.value;
        
        if (result.error) {
          console.error(`[AI-MATERIALS-AGENT] Search error for ${item.product}:`, result.error);
          continue;
        }

        if (result.data?.materials && result.data.materials.length > 0) {
          // Post-filter results to exclude irrelevant products
          let filteredProducts = result.data.materials.filter((product: any) => 
            passesKeywordFilter(product.name, item.product)
          );
          
          // If filter removed everything, fall back to unfiltered
          if (filteredProducts.length === 0) {
            console.log(`[AI-MATERIALS-AGENT] ⚠️ Keyword filter removed all results for ${item.product}, using unfiltered`);
            filteredProducts = result.data.materials;
          }
          
          // Limit to top 8 for performance
          filteredProducts = filteredProducts.slice(0, 8);
          
          searchResults.push({
            requestedItem: item,
            foundProducts: filteredProducts,
            usedFallback
          });
        }
      } else {
        console.error('[AI-MATERIALS-AGENT] Search promise rejected:', settled.reason);
      }
    }

    console.log('[AI-MATERIALS-AGENT] Found products for', searchResults.length, 'items');

    // Step 3: Score and select products based on preference
    const scoreProduct = (product: any, pref: string, requestedProduct: string): number => {
      const price = parseFloat(product.price.replace(/[£,]/g, '')) || 0;
      
      // Apply penalty if product fails keyword check
      const keywordPenalty = passesKeywordFilter(product.name, requestedProduct) ? 1.0 : 0.3;
      
      let baseScore = 0;
      
      if (pref === 'cheapest') {
        baseScore = 1 / (price || 1);
      } else if (pref === 'best-quality') {
        const brandScore = ['Hager', 'MK', 'Schneider', 'Crabtree', 'BG'].some(b => 
          product.name.includes(b) || product.supplier.includes(b)
        ) ? 1.0 : 0.7;
        const stockScore = product.stockStatus === 'In Stock' ? 1.0 : 0.5;
        baseScore = (brandScore * 0.6) + (stockScore * 0.4);
      } else {
        // Balanced
        const priceScore = 1 / (price || 1);
        const stockScore = product.stockStatus === 'In Stock' ? 1.0 : 0.5;
        const brandScore = ['Hager', 'MK', 'Schneider', 'Crabtree', 'BG'].some(b => 
          product.name.includes(b) || product.supplier.includes(b)
        ) ? 1.0 : 0.7;
        
        baseScore = (priceScore * 0.35) + (stockScore * 0.30) + (brandScore * 0.35);
      }
      
      return baseScore * keywordPenalty;
    };

    // Generate 3 options: cheapest, best-quality, balanced
    const generateOption = (optionType: string) => {
      const selectedItems = searchResults.map(result => {
        const scoredProducts = result.foundProducts
          .map((p: any) => ({ 
            product: p, 
            score: scoreProduct(p, optionType, result.requestedItem.product),
            usedFallback: result.usedFallback 
          }))
          .sort((a: ProductScore, b: ProductScore) => b.score - a.score);
        
        return {
          requestedItem: result.requestedItem,
          selectedProduct: scoredProducts[0]?.product,
          usedFallback: scoredProducts[0]?.usedFallback || false,
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
