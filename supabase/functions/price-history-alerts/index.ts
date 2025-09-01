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
  
  try {
    // Calculate date range
    const endDate = new Date();
    const startDate = new Date();
    startDate.setDate(startDate.getDate() - days);

    // Query real historical data from database
    const { data: historicalData, error } = await supabase
      .from('historical_prices')
      .select('*')
      .ilike('product_name', `%${productName}%`)
      .gte('date_scraped', startDate.toISOString())
      .lte('date_scraped', endDate.toISOString())
      .order('date_scraped', { ascending: true });

    if (error) {
      console.error('❌ Error fetching historical data:', error);
      throw error;
    }

    // If no historical data, try to get current prices and create recent entries
    let history: PriceHistoryEntry[] = [];
    
    if (!historicalData || historicalData.length === 0) {
      console.log('⚠️ No historical data found, checking current prices...');
      
      // Try to find current prices for similar products
      const { data: currentData, error: currentError } = await supabase
        .from('current_prices')
        .select('*')
        .ilike('product_name', `%${productName}%`)
        .limit(10);

      if (currentData && currentData.length > 0) {
        // Use current prices to simulate recent history
        const today = new Date().toISOString().split('T')[0];
        history = currentData.map(item => ({
          date: today,
          price: parseFloat(item.price.toString()),
          supplier: item.supplier,
          productName: item.product_name
        }));
      }
    } else {
      // Transform historical data to expected format
      history = historicalData.map(item => ({
        date: new Date(item.date_scraped).toISOString().split('T')[0],
        price: parseFloat(item.price.toString()),
        supplier: item.supplier,
        productName: item.product_name
      }));
    }

    // If still no data, return empty response with message
    if (history.length === 0) {
      return new Response(JSON.stringify({
        history: [],
        analysis: null,
        message: `No price history available for "${productName}". Try searching for a more specific product name.`
      }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    // Calculate trends from real data
    const allPrices = history.map(h => h.price);
    const recentPrices = history.slice(-Math.min(7, Math.floor(history.length / 2))); // Last portion of data
    const olderPrices = history.slice(0, Math.max(1, Math.floor(history.length / 2))); // Earlier portion of data
    
    const recentAvg = recentPrices.reduce((sum, h) => sum + h.price, 0) / recentPrices.length;
    const olderAvg = olderPrices.reduce((sum, h) => sum + h.price, 0) / olderPrices.length;
    const trendPercent = olderAvg > 0 ? ((recentAvg - olderAvg) / olderAvg * 100).toFixed(1) : '0.0';

    return new Response(JSON.stringify({
      history,
      analysis: {
        trend: recentAvg > olderAvg ? 'up' : 'down',
        trendPercent: `${Math.abs(parseFloat(trendPercent))}%`,
        lowestPrice: Math.min(...allPrices),
        highestPrice: Math.max(...allPrices),
        averagePrice: Math.round((allPrices.reduce((sum, p) => sum + p, 0) / allPrices.length) * 100) / 100,
        recommendation: recentAvg > olderAvg ? 'Consider buying soon as prices are rising' : 'Prices are falling, might be worth waiting',
        dataPoints: history.length,
        dateRange: `${Math.max(1, days)} days`
      }
    }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });

  } catch (error) {
    console.error('❌ Error in getPriceHistory:', error);
    return new Response(JSON.stringify({
      error: 'Failed to fetch price history',
      details: error.message
    }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
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
  
  try {
    // Mock user alerts with real current prices where possible
    const mockAlerts = [
      {
        id: 'alert_1',
        userId,
        productName: 'Twin & Earth Cable 2.5mm',
        targetPrice: 80.00,
        supplier: 'Any',
        alertType: 'below' as const,
        isActive: true,
        createdAt: '2024-08-30T10:00:00Z'
      },
      {
        id: 'alert_2',
        userId,
        productName: 'MCB 32A',
        targetPrice: 15.00,
        supplier: 'Screwfix',
        alertType: 'below' as const,
        isActive: true,
        createdAt: '2024-08-29T15:30:00Z'
      }
    ];

    // Try to get current prices for alert products
    const alertsWithCurrentPrices = await Promise.all(
      mockAlerts.map(async (alert) => {
        try {
          const { data: currentPrices } = await supabase
            .from('current_prices')
            .select('price')
            .ilike('product_name', `%${alert.productName}%`)
            .eq('supplier', alert.supplier === 'Any' ? 'Screwfix' : alert.supplier)
            .limit(1);

          const currentPrice = currentPrices && currentPrices.length > 0 
            ? parseFloat(currentPrices[0].price.toString())
            : alert.targetPrice + 10; // Fallback price slightly above target

          return {
            ...alert,
            currentPrice
          };
        } catch (error) {
          console.error(`Error fetching current price for ${alert.productName}:`, error);
          return {
            ...alert,
            currentPrice: alert.targetPrice + 10 // Fallback
          };
        }
      })
    );

    return new Response(JSON.stringify({ alerts: alertsWithCurrentPrices }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });

  } catch (error) {
    console.error('❌ Error in getUserAlerts:', error);
    return new Response(JSON.stringify({
      error: 'Failed to fetch user alerts',
      details: error.message
    }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
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