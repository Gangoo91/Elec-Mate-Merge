import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.7.1';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

interface PriceHistoryEntry {
  date: string;
  price: number;
  supplier: string;
  productName: string;
}

interface PriceAlert {
  id?: string;
  userId: string;
  productName: string;
  targetPrice: number;
  currentPrice: number;
  supplier?: string;
  alertType: 'below' | 'above' | 'change';
  isActive: boolean;
  createdAt?: string;
}

interface BulkPricingData {
  productName: string;
  supplier: string;
  unitPrice: number;
  quantities: {
    quantity: number;
    unitPrice: number;
    totalPrice: number;
    savings: number;
  }[];
  bulkDiscounts: {
    minQuantity: number;
    discountPercent: number;
  }[];
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    const { action, ...requestData } = await req.json();
    console.log(`📊 [PRICE-HISTORY-ALERTS] Action: ${action}`);

    switch (action) {
      case 'get_price_history':
        return await getPriceHistory(supabase, requestData);
      case 'add_price_alert':
        return await addPriceAlert(supabase, requestData);
      case 'get_user_alerts':
        return await getUserAlerts(supabase, requestData);
      case 'calculate_bulk_pricing':
        return await calculateBulkPricing(requestData);
      case 'get_seasonal_patterns':
        return await getSeasonalPatterns(supabase, requestData);
      default:
        throw new Error(`Unknown action: ${action}`);
    }
  } catch (error) {
    console.error('❌ Error in price-history-alerts:', error);
    return new Response(JSON.stringify({ 
      error: 'Failed to process request', 
      details: error.message 
    }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});

async function getPriceHistory(supabase: any, { productName, days = 30 }: any) {
  console.log(`📈 Getting price history for "${productName}" (${days} days)`);
  
  // Generate mock price history data with realistic trends
  const history: PriceHistoryEntry[] = [];
  const basePrice = Math.random() * 100 + 50; // £50-150 base price
  const suppliers = ['Screwfix', 'CEF', 'RS Components', 'Toolstation'];
  
  for (let i = days; i >= 0; i--) {
    const date = new Date();
    date.setDate(date.getDate() - i);
    
    suppliers.forEach(supplier => {
      // Add some realistic price variation
      const variation = (Math.random() - 0.5) * 0.1; // ±5% variation
      const trendFactor = Math.sin(i / 10) * 0.05; // Seasonal trend
      const supplierOffset = suppliers.indexOf(supplier) * 0.02; // Supplier-specific pricing
      
      const price = basePrice * (1 + variation + trendFactor + supplierOffset);
      
      history.push({
        date: date.toISOString().split('T')[0],
        price: Math.round(price * 100) / 100,
        supplier,
        productName
      });
    });
  }

  // Calculate trends
  const recentPrices = history.slice(-7); // Last 7 days
  const olderPrices = history.slice(-14, -7); // Previous 7 days
  
  const recentAvg = recentPrices.reduce((sum, h) => sum + h.price, 0) / recentPrices.length;
  const olderAvg = olderPrices.reduce((sum, h) => sum + h.price, 0) / olderPrices.length;
  const trendPercent = ((recentAvg - olderAvg) / olderAvg * 100).toFixed(1);

  return new Response(JSON.stringify({
    history,
    analysis: {
      trend: recentAvg > olderAvg ? 'up' : 'down',
      trendPercent: `${Math.abs(parseFloat(trendPercent))}%`,
      lowestPrice: Math.min(...history.map(h => h.price)),
      highestPrice: Math.max(...history.map(h => h.price)),
      averagePrice: history.reduce((sum, h) => sum + h.price, 0) / history.length,
      recommendation: recentAvg > olderAvg ? 'Consider buying soon as prices are rising' : 'Prices are falling, might be worth waiting'
    }
  }), {
    headers: { ...corsHeaders, 'Content-Type': 'application/json' },
  });
}

async function addPriceAlert(supabase: any, alertData: PriceAlert) {
  console.log(`🔔 Adding price alert for ${alertData.productName}`);
  
  // In a real implementation, this would be stored in the database
  // For now, we'll return a success response with the alert data
  const alert = {
    ...alertData,
    id: `alert_${Date.now()}`,
    createdAt: new Date().toISOString(),
    isActive: true
  };

  return new Response(JSON.stringify({
    success: true,
    alert,
    message: `Price alert set for ${alertData.productName} when price goes ${alertData.alertType} £${alertData.targetPrice}`
  }), {
    headers: { ...corsHeaders, 'Content-Type': 'application/json' },
  });
}

async function getUserAlerts(supabase: any, { userId }: any) {
  console.log(`📱 Getting alerts for user ${userId}`);
  
  // Mock user alerts
  const alerts: PriceAlert[] = [
    {
      id: 'alert_1',
      userId,
      productName: 'Twin & Earth Cable 2.5mm',
      targetPrice: 80.00,
      currentPrice: 89.50,
      supplier: 'Any',
      alertType: 'below',
      isActive: true,
      createdAt: '2024-08-30T10:00:00Z'
    },
    {
      id: 'alert_2',
      userId,
      productName: 'MCB 32A',
      targetPrice: 15.00,
      currentPrice: 18.50,
      supplier: 'Screwfix',
      alertType: 'below',
      isActive: true,
      createdAt: '2024-08-29T15:30:00Z'
    }
  ];

  return new Response(JSON.stringify({ alerts }), {
    headers: { ...corsHeaders, 'Content-Type': 'application/json' },
  });
}

async function calculateBulkPricing(data: any) {
  const { products, quantities = [1, 5, 10, 25, 50, 100] } = data;
  console.log(`💰 Calculating bulk pricing for ${products.length} products`);

  const bulkPricingData: BulkPricingData[] = products.map((product: any) => {
    const basePrice = parseFloat(product.price.replace('£', ''));
    
    // Define bulk discount tiers
    const bulkDiscounts = [
      { minQuantity: 1, discountPercent: 0 },
      { minQuantity: 5, discountPercent: 2 },
      { minQuantity: 10, discountPercent: 5 },
      { minQuantity: 25, discountPercent: 8 },
      { minQuantity: 50, discountPercent: 12 },
      { minQuantity: 100, discountPercent: 15 }
    ];

    const quantityPricing = quantities.map((qty: number) => {
      const applicableDiscount = bulkDiscounts
        .filter(d => qty >= d.minQuantity)
        .sort((a, b) => b.discountPercent - a.discountPercent)[0] || bulkDiscounts[0];
      
      const unitPrice = basePrice * (1 - applicableDiscount.discountPercent / 100);
      const totalPrice = unitPrice * qty;
      const savings = (basePrice - unitPrice) * qty;

      return {
        quantity: qty,
        unitPrice: Math.round(unitPrice * 100) / 100,
        totalPrice: Math.round(totalPrice * 100) / 100,
        savings: Math.round(savings * 100) / 100
      };
    });

    return {
      productName: product.name,
      supplier: product.supplier,
      unitPrice: basePrice,
      quantities: quantityPricing,
      bulkDiscounts
    };
  });

  return new Response(JSON.stringify({ bulkPricingData }), {
    headers: { ...corsHeaders, 'Content-Type': 'application/json' },
  });
}

async function getSeasonalPatterns(supabase: any, { productCategory }: any) {
  console.log(`📅 Getting seasonal patterns for ${productCategory}`);
  
  // Mock seasonal data
  const patterns = {
    cables: {
      spring: { trend: 'stable', change: '+1.2%', reason: 'Spring construction projects start' },
      summer: { trend: 'up', change: '+3.5%', reason: 'Peak construction season' },
      autumn: { trend: 'down', change: '-2.1%', reason: 'End of construction season' },
      winter: { trend: 'stable', change: '+0.8%', reason: 'Indoor electrical work increases' }
    },
    components: {
      spring: { trend: 'up', change: '+2.1%', reason: 'New project planning' },
      summer: { trend: 'up', change: '+4.2%', reason: 'High demand season' },
      autumn: { trend: 'down', change: '-1.8%', reason: 'Inventory clearance' },
      winter: { trend: 'stable', change: '+0.5%', reason: 'Maintenance work' }
    }
  };

  const categoryPatterns = patterns[productCategory as keyof typeof patterns] || patterns.cables;

  return new Response(JSON.stringify({
    category: productCategory,
    patterns: categoryPatterns,
    currentSeason: getCurrentSeason(),
    recommendation: getSeasonalRecommendation(categoryPatterns)
  }), {
    headers: { ...corsHeaders, 'Content-Type': 'application/json' },
  });
}

function getCurrentSeason(): string {
  const month = new Date().getMonth();
  if (month >= 2 && month <= 4) return 'spring';
  if (month >= 5 && month <= 7) return 'summer';
  if (month >= 8 && month <= 10) return 'autumn';
  return 'winter';
}

function getSeasonalRecommendation(patterns: any): string {
  const currentSeason = getCurrentSeason();
  const current = patterns[currentSeason];
  
  if (current.trend === 'up') {
    return 'Prices are typically higher this season. Consider buying in bulk or waiting for autumn.';
  } else if (current.trend === 'down') {
    return 'Good time to buy! Prices are typically lower this season.';
  }
  return 'Prices are stable this season. Normal purchasing strategy recommended.';
}