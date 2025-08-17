
import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    // Create Supabase client
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!
    const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!
    const supabase = createClient(supabaseUrl, supabaseKey)

    console.log('Starting fetch-metal-prices function');

    // Fetch live commodity prices from database
    const { data: commodityData, error: commodityError } = await supabase
      .from('commodity_prices')
      .select('*')
      .order('last_updated', { ascending: false });

    if (commodityError) {
      console.error('Error fetching commodity prices:', commodityError);
    }

    // Fetch supplier prices from database
    const { data: supplierData, error: supplierError } = await supabase
      .from('supplier_price_snapshots')
      .select('*')
      .order('last_updated', { ascending: false });

    if (supplierError) {
      console.error('Error fetching supplier prices:', supplierError);
    }

    // Fetch regional job pricing data from database
    const { data: regionalPricing, error: pricingError } = await supabase
      .from('regional_job_pricing')
      .select('*')
      .eq('is_active', true)
      .order('region', { ascending: true })

    if (pricingError) {
      console.error('Error fetching regional pricing:', pricingError)
    }

    console.log(`Fetched ${regionalPricing?.length || 0} regional job pricing records`);

    // Debug: Log commodity data to see what metals we have
    console.log('Commodity data:', commodityData?.map(item => ({ 
      metal_type: item.metal_type, 
      price: item.price_per_kg 
    })));

    // Transform commodity data to UI format with copper grades
    const metalPrices = (commodityData || []).map((item, index) => {
      const basePrice = {
        id: index + 1,
        name: `${item.metal_type} (per kg)`,
        value: `£${item.price_per_kg}`,
        change: item.daily_change_percent ? `${item.daily_change_percent > 0 ? '+' : ''}${item.daily_change_percent}%` : '0%',
        trend: item.daily_change_percent > 0 ? 'up' as const : item.daily_change_percent < 0 ? 'down' as const : 'neutral' as const
      };

      // Add metal grades based on type
      const metalType = item.metal_type.toLowerCase();
      const baseValue = parseFloat(item.price_per_kg);
      
      if (metalType.includes('copper')) {
        console.log(`Adding copper grades for ${item.metal_type} at £${baseValue}`);
        basePrice.subItems = [
          {
            id: `${index + 1}-bright`,
            name: 'Bright Copper Wire',
            value: `£${(baseValue * 1.15).toFixed(2)}`,
            change: basePrice.change,
            trend: basePrice.trend
          },
          {
            id: `${index + 1}-mixed`,
            name: 'Mixed Copper Cable',
            value: `£${(baseValue * 0.85).toFixed(2)}`,
            change: basePrice.change,
            trend: basePrice.trend
          },
          {
            id: `${index + 1}-dirty`,
            name: 'Dirty/Greasy Copper',
            value: `£${(baseValue * 0.65).toFixed(2)}`,
            change: basePrice.change,
            trend: basePrice.trend
          }
        ];
      } else if (metalType.includes('aluminium') || metalType.includes('aluminum')) {
        console.log(`Adding aluminum grades for ${item.metal_type} at £${baseValue}`);
        basePrice.subItems = [
          {
            id: `${index + 1}-clean`,
            name: 'Clean Aluminum Wire',
            value: `£${(baseValue * 1.12).toFixed(2)}`,
            change: basePrice.change,
            trend: basePrice.trend
          },
          {
            id: `${index + 1}-cable`,
            name: 'Aluminum Cable (ACSR)',
            value: `£${(baseValue * 0.75).toFixed(2)}`,
            change: basePrice.change,
            trend: basePrice.trend
          },
          {
            id: `${index + 1}-mixed`,
            name: 'Mixed Aluminum Scrap',
            value: `£${(baseValue * 0.60).toFixed(2)}`,
            change: basePrice.change,
            trend: basePrice.trend
          }
        ];
      } else if (metalType.includes('steel')) {
        console.log(`Adding steel grades for ${item.metal_type} at £${baseValue}`);
        basePrice.subItems = [
          {
            id: `${index + 1}-clean`,
            name: 'Clean Steel',
            value: `£${(baseValue * 1.10).toFixed(2)}`,
            change: basePrice.change,
            trend: basePrice.trend
          },
          {
            id: `${index + 1}-galvanized`,
            name: 'Galvanized Steel',
            value: `£${(baseValue * 0.85).toFixed(2)}`,
            change: basePrice.change,
            trend: basePrice.trend
          },
          {
            id: `${index + 1}-mixed`,
            name: 'Mixed Steel Scrap',
            value: `£${(baseValue * 0.70).toFixed(2)}`,
            change: basePrice.change,
            trend: basePrice.trend
          }
        ];
      } else if (metalType.includes('brass')) {
        console.log(`Adding brass grades for ${item.metal_type} at £${baseValue}`);
        basePrice.subItems = [
          {
            id: `${index + 1}-clean`,
            name: 'Clean Brass Fittings',
            value: `£${(baseValue * 1.08).toFixed(2)}`,
            change: basePrice.change,
            trend: basePrice.trend
          },
          {
            id: `${index + 1}-mixed`,
            name: 'Mixed Brass',
            value: `£${(baseValue * 0.90).toFixed(2)}`,
            change: basePrice.change,
            trend: basePrice.trend
          },
          {
            id: `${index + 1}-turnings`,
            name: 'Brass Turnings',
            value: `£${(baseValue * 0.75).toFixed(2)}`,
            change: basePrice.change,
            trend: basePrice.trend
          }
        ];
      } else if (metalType.includes('lead')) {
        console.log(`Adding lead grades for ${item.metal_type} at £${baseValue}`);
        basePrice.subItems = [
          {
            id: `${index + 1}-clean`,
            name: 'Clean Lead',
            value: `£${(baseValue * 1.05).toFixed(2)}`,
            change: basePrice.change,
            trend: basePrice.trend
          },
          {
            id: `${index + 1}-cable`,
            name: 'Lead Cable Sheathing',
            value: `£${(baseValue * 0.80).toFixed(2)}`,
            change: basePrice.change,
            trend: basePrice.trend
          },
          {
            id: `${index + 1}-mixed`,
            name: 'Mixed Lead Scrap',
            value: `£${(baseValue * 0.70).toFixed(2)}`,
            change: basePrice.change,
            trend: basePrice.trend
          }
        ];
      }

      return basePrice;
    });

    // Add fallback metal data if not found in database
    const hasCopper = metalPrices.some(price => price.name.toLowerCase().includes('copper'));
    const hasAluminum = metalPrices.some(price => price.name.toLowerCase().includes('alumin'));
    const hasSteel = metalPrices.some(price => price.name.toLowerCase().includes('steel'));
    const hasBrass = metalPrices.some(price => price.name.toLowerCase().includes('brass'));
    
    if (!hasCopper) {
      console.log('No copper found in database, adding fallback copper data');
      metalPrices.unshift({
        id: 999,
        name: 'Copper (per kg)',
        value: '£8.45',
        change: '+2.3%',
        trend: 'up' as const,
        subItems: [
          {
            id: '999-bright',
            name: 'Bright Copper Wire',
            value: '£9.72',
            change: '+2.3%',
            trend: 'up' as const
          },
          {
            id: '999-mixed',
            name: 'Mixed Copper Cable',
            value: '£7.18',
            change: '+2.3%',
            trend: 'up' as const
          },
          {
            id: '999-dirty',
            name: 'Dirty/Greasy Copper',
            value: '£5.49',
            change: '+2.3%',
            trend: 'up' as const
          }
        ]
      });
    }
    
    if (!hasAluminum) {
      console.log('No aluminum found in database, adding fallback aluminum data');
      metalPrices.push({
        id: 998,
        name: 'Aluminium (per kg)',
        value: '£1.85',
        change: '+1.8%',
        trend: 'up' as const,
        subItems: [
          {
            id: '998-clean',
            name: 'Clean Aluminum Wire',
            value: '£2.07',
            change: '+1.8%',
            trend: 'up' as const
          },
          {
            id: '998-cable',
            name: 'Aluminum Cable (ACSR)',
            value: '£1.39',
            change: '+1.8%',
            trend: 'up' as const
          },
          {
            id: '998-mixed',
            name: 'Mixed Aluminum Scrap',
            value: '£1.11',
            change: '+1.8%',
            trend: 'up' as const
          }
        ]
      });
    }
    
    if (!hasSteel) {
      console.log('No steel found in database, adding fallback steel data');
      metalPrices.push({
        id: 997,
        name: 'Steel (per kg)',
        value: '£0.15',
        change: '-0.5%',
        trend: 'down' as const,
        subItems: [
          {
            id: '997-clean',
            name: 'Clean Steel',
            value: '£0.17',
            change: '-0.5%',
            trend: 'down' as const
          },
          {
            id: '997-galvanized',
            name: 'Galvanized Steel',
            value: '£0.13',
            change: '-0.5%',
            trend: 'down' as const
          },
          {
            id: '997-mixed',
            name: 'Mixed Steel Scrap',
            value: '£0.11',
            change: '-0.5%',
            trend: 'down' as const
          }
        ]
      });
    }
    
    if (!hasBrass) {
      console.log('No brass found in database, adding fallback brass data');
      metalPrices.push({
        id: 996,
        name: 'Brass (per kg)',
        value: '£5.20',
        change: '+0.8%',
        trend: 'up' as const,
        subItems: [
          {
            id: '996-clean',
            name: 'Clean Brass Fittings',
            value: '£5.62',
            change: '+0.8%',
            trend: 'up' as const
          },
          {
            id: '996-mixed',
            name: 'Mixed Brass',
            value: '£4.68',
            change: '+0.8%',
            trend: 'up' as const
          },
          {
            id: '996-turnings',
            name: 'Brass Turnings',
            value: '£3.90',
            change: '+0.8%',
            trend: 'up' as const
          }
        ]
      });
    }

    // Transform supplier cable data to UI format
    const cableData = (supplierData || []).filter(item => item.category === 'Cable');
    const cablePrices = cableData.map((item, index) => ({
      id: index + 6,
      name: item.product_name.includes('(') ? item.product_name : `${item.product_name} (per ${item.unit})`,
      value: `£${item.price}${item.unit !== 'each' ? '/' + item.unit : ''}`,
      change: '+2.1%', // Mock change for now - will be calculated from historical data
      trend: 'up' as const
    }));

    // Transform supplier equipment data to UI format  
    const equipmentData = (supplierData || []).filter(item => item.category === 'Equipment');
    const equipmentPrices = equipmentData.map((item, index) => ({
      id: index + 11,
      name: item.product_name,
      value: `£${item.price}`,
      change: '+1.5%', // Mock change for now - will be calculated from historical data
      trend: 'up' as const
    }));

    // UK Market Alerts
    const marketAlerts = [
      {
        id: 1,
        message: "Copper prices rising due to global supply constraints - consider bulk purchasing",
        date: new Date().toLocaleDateString('en-GB'),
        type: "warning" as const
      },
      {
        id: 2,
        message: "New BS 7671:2018+A2:2022 compliance requirements affecting equipment pricing",
        date: new Date().toLocaleDateString('en-GB'),
        type: "info" as const
      }
    ];

    // Determine data freshness
    const dataSource = commodityData?.[0]?.data_source || 'database';
    const lastUpdated = commodityData?.[0]?.last_updated || new Date().toISOString();
    const formattedLastUpdated = new Date(lastUpdated).toLocaleString('en-GB', {
      timeZone: 'Europe/London',
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });

    const metalPricesData = {
      metalPrices,
      cablePrices,
      equipmentPrices,
      marketAlerts,
      regionalJobPricing: regionalPricing || [],
      lastUpdated: formattedLastUpdated,
      dataSource,
      isLive: dataSource !== 'mock_realistic'
    }

    console.log('Successfully aggregated pricing data:', {
      metalPricesCount: metalPrices.length,
      cablePricesCount: cablePrices.length,
      equipmentPricesCount: equipmentPrices.length,
      marketAlertsCount: marketAlerts.length,
      regionalJobPricingCount: regionalPricing?.length || 0,
      dataSource,
      lastUpdated: formattedLastUpdated,
      // Debug: Show which metal prices have subItems
      metalPricesWithSubItems: metalPrices.filter(p => p.subItems).map(p => ({ name: p.name, subItemsCount: p.subItems?.length }))
    });

    return new Response(
      JSON.stringify(metalPricesData),
      {
        headers: { 
          ...corsHeaders, 
          'Content-Type': 'application/json' 
        },
      },
    )
  } catch (error) {
    console.error('Error in fetch-metal-prices function:', error)
    
    return new Response(
      JSON.stringify({ 
        error: 'Failed to fetch UK pricing data',
        details: error.message 
      }),
      {
        status: 500,
        headers: { 
          ...corsHeaders, 
          'Content-Type': 'application/json' 
        },
      },
    )
  }
})
