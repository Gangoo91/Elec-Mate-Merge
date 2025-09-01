import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

interface Product {
  id: number;
  name: string;
  category: string;
  price: string;
  supplier: string;
  numericPrice: number;
  stockStatus: string;
  productUrl?: string;
  highlights?: string[];
}

interface AIRecommendation {
  type: 'alternative' | 'bundle' | 'upgrade' | 'warning';
  title: string;
  description: string;
  savings?: number;
  confidence: number;
  products?: Product[];
}

interface AIInsights {
  smartMatching: {
    matchedGroups: Product[][];
    alternatives: Product[];
    recommendations: AIRecommendation[];
  };
  valueAnalysis: {
    recommendations: AIRecommendation[];
    insights: string[];
  };
  purchaseRecommendations: AIRecommendation[];
  summary: {
    totalProducts: number;
    matchedGroups: number;
    alternatives: number;
    recommendations: number;
  };
}

serve(async (req) => {
  console.log('🤖 [AI-MATERIAL-RECOMMENDATIONS] Starting request...');

  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { products, searchTerm, userLocation } = await req.json();
    
    console.log(`🔍 Analyzing ${products?.length || 0} products for search: "${searchTerm}"`);

    if (!products || products.length === 0) {
      throw new Error('No products provided for analysis');
    }

    // Group products by similar items (same type/category)
    const productGroups = groupSimilarProducts(products);
    
    // Find alternatives (similar products from different suppliers)
    const alternatives = findAlternatives(products);
    
    // Generate smart recommendations
    const smartRecommendations = generateSmartRecommendations(products, searchTerm);
    
    // Perform value analysis
    const valueAnalysis = performValueAnalysis(products);
    
    // Generate purchase recommendations
    const purchaseRecommendations = generatePurchaseRecommendations(products, userLocation);

    const insights: AIInsights = {
      smartMatching: {
        matchedGroups: productGroups,
        alternatives: alternatives,
        recommendations: smartRecommendations
      },
      valueAnalysis: {
        recommendations: valueAnalysis.recommendations,
        insights: valueAnalysis.insights
      },
      purchaseRecommendations,
      summary: {
        totalProducts: products.length,
        matchedGroups: productGroups.length,
        alternatives: alternatives.length,
        recommendations: smartRecommendations.length + valueAnalysis.recommendations.length + purchaseRecommendations.length
      }
    };

    console.log(`✅ Generated AI insights with ${insights.summary.recommendations} recommendations`);

    return new Response(JSON.stringify(insights), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });

  } catch (error) {
    console.error('❌ Error in AI material recommendations:', error);
    return new Response(JSON.stringify({ 
      error: error.message || 'Failed to generate AI recommendations' 
    }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});

function groupSimilarProducts(products: Product[]): Product[][] {
  const groups: { [key: string]: Product[] } = {};
  
  products.forEach(product => {
    // Create a simplified key for grouping (remove sizes, lengths, etc.)
    const key = product.name
      .toLowerCase()
      .replace(/\d+(?:mm|m|a|w|amp|watt)\b/g, '') // Remove measurements
      .replace(/\s+/g, ' ')
      .trim();
    
    if (!groups[key]) {
      groups[key] = [];
    }
    groups[key].push(product);
  });
  
  // Only return groups with more than one product
  return Object.values(groups).filter(group => group.length > 1);
}

function findAlternatives(products: Product[]): Product[] {
  // Find products that are similar but from different suppliers
  const alternatives: Product[] = [];
  const seen = new Set();
  
  products.forEach(product => {
    const productKey = product.name.toLowerCase().replace(/[^a-z0-9]/g, '');
    if (!seen.has(productKey)) {
      seen.add(productKey);
      const similarProducts = products.filter(p => 
        p.id !== product.id && 
        p.name.toLowerCase().replace(/[^a-z0-9]/g, '').includes(productKey.slice(0, 10))
      );
      
      if (similarProducts.length > 0) {
        alternatives.push(...similarProducts.slice(0, 2)); // Limit alternatives
      }
    }
  });
  
  return alternatives.slice(0, 10); // Limit total alternatives
}

function generateSmartRecommendations(products: Product[], searchTerm: string): AIRecommendation[] {
  const recommendations: AIRecommendation[] = [];
  
  // Price-based recommendations
  const sortedByPrice = [...products].sort((a, b) => a.numericPrice - b.numericPrice);
  const cheapest = sortedByPrice[0];
  const mostExpensive = sortedByPrice[sortedByPrice.length - 1];
  
  if (sortedByPrice.length > 1) {
    const savings = mostExpensive.numericPrice - cheapest.numericPrice;
    const savingsPercent = ((savings / mostExpensive.numericPrice) * 100).toFixed(0);
    
    recommendations.push({
      type: 'alternative',
      title: 'Best Value Option',
      description: `Save ${savingsPercent}% by choosing ${cheapest.supplier} instead of ${mostExpensive.supplier}`,
      savings: parseFloat(savings.toFixed(2)),
      confidence: 0.9,
      products: [cheapest]
    });
  }
  
  // Stock-based recommendations
  const outOfStock = products.filter(p => p.stockStatus === 'Out of Stock');
  const inStock = products.filter(p => p.stockStatus === 'In Stock');
  
  if (outOfStock.length > 0 && inStock.length > 0) {
    recommendations.push({
      type: 'warning',
      title: 'Stock Availability Alert',
      description: `${outOfStock.length} items are out of stock. Consider these available alternatives.`,
      confidence: 0.8,
      products: inStock.slice(0, 3)
    });
  }
  
  // Bundle recommendations for common electrical items
  if (searchTerm.toLowerCase().includes('cable') && products.length > 2) {
    recommendations.push({
      type: 'bundle',
      title: 'Complete Installation Bundle',
      description: 'Consider bundling with cable clips, conduit, and accessories for a complete installation.',
      confidence: 0.7
    });
  }
  
  return recommendations;
}

function performValueAnalysis(products: Product[]): { recommendations: AIRecommendation[], insights: string[] } {
  const recommendations: AIRecommendation[] = [];
  const insights: string[] = [];
  
  // Price distribution analysis
  const prices = products.map(p => p.numericPrice);
  const avgPrice = prices.reduce((a, b) => a + b, 0) / prices.length;
  const minPrice = Math.min(...prices);
  const maxPrice = Math.max(...prices);
  
  insights.push(`Price range varies from £${minPrice.toFixed(2)} to £${maxPrice.toFixed(2)}`);
  insights.push(`Average price is £${avgPrice.toFixed(2)}`);
  
  // Supplier diversity analysis
  const suppliers = [...new Set(products.map(p => p.supplier))];
  insights.push(`${suppliers.length} different suppliers found: ${suppliers.join(', ')}`);
  
  // Value recommendations
  const underAverage = products.filter(p => p.numericPrice < avgPrice * 0.9);
  if (underAverage.length > 0) {
    recommendations.push({
      type: 'upgrade',
      title: 'Excellent Value Products',
      description: `${underAverage.length} items are significantly below average price`,
      confidence: 0.8,
      products: underAverage.slice(0, 3)
    });
  }
  
  return { recommendations, insights };
}

function generatePurchaseRecommendations(products: Product[], userLocation: string): AIRecommendation[] {
  const recommendations: AIRecommendation[] = [];
  
  // UK-specific recommendations
  if (userLocation === 'UK') {
    const tradeFocused = products.filter(p => 
      p.supplier === 'CEF' || 
      p.supplier.toLowerCase().includes('trade')
    );
    
    if (tradeFocused.length > 0) {
      recommendations.push({
        type: 'alternative',
        title: 'Trade Account Benefits',
        description: 'Consider opening trade accounts for better pricing and credit terms',
        confidence: 0.6,
        products: tradeFocused.slice(0, 2)
      });
    }
  }
  
  // Bulk purchase recommendations
  if (products.length > 5) {
    recommendations.push({
      type: 'bundle',
      title: 'Bulk Purchase Opportunity',
      description: 'Consider bulk purchasing for additional discounts on large quantities',
      confidence: 0.7
    });
  }
  
  // Low stock warnings
  const lowStock = products.filter(p => p.stockStatus === 'Low Stock');
  if (lowStock.length > 0) {
    recommendations.push({
      type: 'warning',
      title: 'Stock Level Alert',
      description: `${lowStock.length} items have low stock levels. Consider ordering soon.`,
      confidence: 0.9,
      products: lowStock
    });
  }
  
  return recommendations;
}