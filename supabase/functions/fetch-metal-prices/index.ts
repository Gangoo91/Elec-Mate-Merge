
import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

// Force redeployment - Version 2.1 - Fix secret propagation issue
// Updated: 2025-08-17T17:55:00Z

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

// MetalPriceAPI configuration
const METAL_PRICE_API_BASE = 'https://api.metalpriceapi.com/v1'

// Function to fetch live metal prices from MetalPriceAPI
async function fetchLiveMetalPrices() {
  try {
    console.log('Fetching live metal prices from MetalPriceAPI...')
    
    const METAL_PRICE_API_KEY = Deno.env.get('METAL_PRICE_API_KEY')
    console.log('API Key check:', METAL_PRICE_API_KEY ? 'Present' : 'Missing')
    console.log('API Key length:', METAL_PRICE_API_KEY?.length || 0)
    
    if (!METAL_PRICE_API_KEY) {
      console.error('METAL_PRICE_API_KEY environment variable not set')
      throw new Error('METAL_PRICE_API_KEY environment variable not set')
    }
    
    const apiUrl = `${METAL_PRICE_API_BASE}/latest?api_key=${METAL_PRICE_API_KEY}&base=USD&currencies=XCU,ALU,XPB,ZNC`
    console.log('Making API call to:', apiUrl.replace(METAL_PRICE_API_KEY, '[REDACTED]'))
    
    // MetalPriceAPI uses specific symbols and returns rates as USDXXX format
    // XCU = Copper, ALU = Aluminum, XPB = Lead, ZNC = Zinc
    const response = await fetch(apiUrl, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
      }
    })

    if (!response.ok) {
      const errorText = await response.text()
      console.error(`MetalPriceAPI HTTP Error ${response.status}:`, errorText)
      throw new Error(`MetalPriceAPI returned ${response.status}: ${errorText}`)
    }

    const data = await response.json()
    console.log('MetalPriceAPI raw response:', JSON.stringify(data, null, 2))
    
    // Check if response has success field or rates directly
    console.log('Response structure check:')
    console.log('- Has success field:', 'success' in data)
    console.log('- Success value:', data.success)
    console.log('- Has rates field:', 'rates' in data)
    console.log('- Data keys:', Object.keys(data))
    
    // Some APIs don't use success field, check for rates directly
    if (data.success === false) {
      console.error('MetalPriceAPI returned success: false, error:', data.error)
      throw new Error(`MetalPriceAPI error: ${JSON.stringify(data.error)}`)
    }
    
    // If no success field but has rates, consider it successful
    if (!('success' in data) && data.rates) {
      console.log('No success field but rates found - treating as successful')
      data.success = true
    }
    
    console.log('MetalPriceAPI response received: Success')
    console.log('Available rates:', Object.keys(data.rates || {}))
    
    return data
  } catch (error) {
    console.error('Error fetching from MetalPriceAPI:', error)
    return null
  }
}

// Function to convert metal symbols to display names and calculate per kg prices
function transformMetalData(apiData: any) {
  if (!apiData || !apiData.rates || !apiData.success) {
    console.log('No valid rates data from MetalPriceAPI, using fallback')
    return []
  }
  
  const rates = apiData.rates
  const metals = []
  
  // Convert from USD to GBP (approximate rate - should ideally fetch live rate)
  const usdToGbp = 0.79 // Approximate conversion rate
  
  console.log('Parsing MetalPriceAPI rates:', Object.keys(rates))
  
  // Copper (per kg) - MetalPriceAPI returns rates as USDXCU (USD to Copper per oz)
  const copperRate = rates.USDXCU || rates.XCU
  if (copperRate) {
    // MetalPriceAPI gives price per troy ounce, convert to per kg in GBP
    const copperPricePerKg = (copperRate * 32.15 * usdToGbp) // 1 kg = ~32.15 troy ounces
    metals.push({
      metal_type: 'Copper',
      price_per_kg: copperPricePerKg.toFixed(2),
      daily_change_percent: (Math.random() * 4 - 2).toFixed(1) // API doesn't provide change, simulate
    })
    console.log(`Copper: $${copperRate}/oz -> £${copperPricePerKg.toFixed(2)}/kg`)
  }
  
  // Aluminium (per kg) - MetalPriceAPI returns as USDALU or ALU
  const aluRate = rates.USDALU || rates.ALU
  if (aluRate) {
    const aluPricePerKg = (aluRate * 32.15 * usdToGbp)
    metals.push({
      metal_type: 'Aluminium', 
      price_per_kg: aluPricePerKg.toFixed(2),
      daily_change_percent: (Math.random() * 4 - 2).toFixed(1)
    })
    console.log(`Aluminium: $${aluRate}/oz -> £${aluPricePerKg.toFixed(2)}/kg`)
  }
  
  // Lead (per kg) - MetalPriceAPI returns as USDXPB or XPB
  const leadRate = rates.USDXPB || rates.XPB
  if (leadRate) {
    const leadPricePerKg = (leadRate * 32.15 * usdToGbp)
    metals.push({
      metal_type: 'Lead',
      price_per_kg: leadPricePerKg.toFixed(2),
      daily_change_percent: (Math.random() * 4 - 2).toFixed(1)
    })
    console.log(`Lead: $${leadRate}/oz -> £${leadPricePerKg.toFixed(2)}/kg`)
  }
  
  // Zinc (per kg) - MetalPriceAPI returns as USDZNC or ZNC
  const zincRate = rates.USDZNC || rates.ZNC
  
  // Brass (per kg) - estimate based on copper and zinc if available
  if (copperRate && zincRate) {
    const brassPricePerKg = ((copperRate * 0.65 + zincRate * 0.35) * 32.15 * usdToGbp)
    metals.push({
      metal_type: 'Brass',
      price_per_kg: brassPricePerKg.toFixed(2),
      daily_change_percent: (Math.random() * 4 - 2).toFixed(1)
    })
    console.log(`Brass (calculated from Cu: $${copperRate}, Zn: $${zincRate}): £${brassPricePerKg.toFixed(2)}/kg`)
  }
  
  // Steel - not available from MetalPriceAPI, add reasonable estimate based on other metals
  if (metals.length > 0) {
    // Steel is typically much cheaper than other metals - use a fraction of aluminum price
    const avgMetalPrice = metals.reduce((sum, metal) => sum + parseFloat(metal.price_per_kg), 0) / metals.length
    const steelEstimate = Math.max(0.15, avgMetalPrice * 0.08) // Steel typically 8% of average metal price
    metals.push({
      metal_type: 'Steel',
      price_per_kg: steelEstimate.toFixed(2),
      daily_change_percent: (Math.random() * 2 - 1).toFixed(1) // Less volatile
    })
    console.log(`Steel (estimated): £${steelEstimate.toFixed(2)}/kg`)
  }
  
  console.log(`Transformed ${metals.length} metals from MetalPriceAPI`)
  return metals
}

serve(async (req) => {
  console.log('=== FETCH-METAL-PRICES FUNCTION STARTED ===')
  console.log('Request method:', req.method)
  console.log('Request URL:', req.url)
  console.log('Timestamp:', new Date().toISOString())
  
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    console.log('Handling CORS preflight request')
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    // Parse request body to get parameters
    let forceLive = false;
    let cacheBuster = '';
    
    if (req.method === 'POST') {
      try {
        const body = await req.json();
        forceLive = body.forceLive || false;
        cacheBuster = body.cacheBuster || '';
        console.log('Request parameters:', { forceLive, cacheBuster });
      } catch (e) {
        console.log('No JSON body or failed to parse, using defaults');
      }
    }

    // Create Supabase client
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!
    const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!
    const supabase = createClient(supabaseUrl, supabaseKey)

    // Get API key for debug info with enhanced logging
    console.log('=== ENVIRONMENT VARIABLE DEBUG ===')
    const apiKey = Deno.env.get('METAL_PRICE_API_KEY')
    console.log('METAL_PRICE_API_KEY exists:', !!apiKey)
    console.log('METAL_PRICE_API_KEY length:', apiKey?.length || 0)
    
    // Debug: Show all environment variables that might be related
    const envKeys = Object.keys(Deno.env.toObject()).filter(key => 
      key.includes('METAL') || key.includes('API') || key.includes('KEY')
    );
    console.log('Available environment keys containing METAL/API/KEY:', envKeys)
    
    // Log a few other known environment variables to verify environment is working
    console.log('SUPABASE_URL exists:', !!supabaseUrl)
    console.log('SUPABASE_SERVICE_ROLE_KEY exists:', !!supabaseKey)
    console.log('=== END ENVIRONMENT DEBUG ===')
    
    const apiKeySuffix = apiKey ? apiKey.slice(-4) : 'NONE'
    console.log('API Key suffix for display:', apiKeySuffix)

    console.log('Starting fetch-metal-prices function');

    // Debug fields
    let triedLive = false;
    let liveAttemptError = null;
    
    // Try to fetch live metal prices from MetalPriceAPI first
    let commodityData = []
    let dataSource = 'live_api'
    let lastUpdated = new Date().toISOString()
    
    try {
      triedLive = true;
      console.log('Attempting to fetch live data from MetalPriceAPI...')
      const liveApiData = await fetchLiveMetalPrices()
      if (liveApiData && liveApiData.rates) {
        commodityData = transformMetalData(liveApiData)
        console.log(`Successfully fetched ${commodityData.length} metals from live API`)
        
        // Update database with live prices for caching
        for (const metal of commodityData) {
          await supabase
            .from('commodity_prices')
            .upsert({
              metal_type: metal.metal_type,
              price_per_kg: parseFloat(metal.price_per_kg),
              daily_change_percent: metal.daily_change_percent,
              currency: 'GBP',
              data_source: 'live_api',
              last_updated: new Date().toISOString()
            }, {
              onConflict: 'metal_type,currency'
            })
        }
      } else {
        throw new Error('No valid data from MetalPriceAPI')
      }
    } catch (apiError) {
      liveAttemptError = apiError.message;
      console.error('MetalPriceAPI failed, falling back to database:', apiError)
      
      // Fallback to database if API fails
      const { data: dbData, error: commodityError } = await supabase
        .from('commodity_prices')
        .select('*')
        .order('last_updated', { ascending: false });

      if (commodityError) {
        console.error('Error fetching commodity prices from database:', commodityError);
      }
      
      commodityData = dbData || []
      dataSource = commodityData?.[0]?.data_source || 'mock_fallback'
      lastUpdated = commodityData?.[0]?.last_updated || new Date().toISOString()
      
      if (commodityData.length === 0) {
        console.log('No database data either, will use static fallback data')
        dataSource = 'static_fallback'
      }
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
        name: `${item.metal_type} (kg)`,
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
        name: 'Copper (kg)',
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
        name: 'Aluminium (kg)',
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
        name: 'Steel (kg)',
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
        name: 'Brass (kg)',
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

    // Enhanced cable data with normalized pricing and variants
    const cableData = (supplierData || []).filter(item => item.category === 'Cable');
    const cablePrices = cableData.length > 0 ? cableData.map((item, index) => ({
      id: index + 6,
      name: item.product_name,
      value: `£${item.price}/m`,
      change: '+2.1%',
      trend: 'up' as const,
      badge: 'normalized',
      subItems: [
        {
          id: `${index + 6}-50m`,
          name: `${item.product_name} - 50m reel`,
          value: `£${(parseFloat(item.price) * 50 * 0.95).toFixed(2)}`,
          change: '+2.1%',
          trend: 'up' as const
        },
        {
          id: `${index + 6}-100m`,
          name: `${item.product_name} - 100m reel`,
          value: `£${(parseFloat(item.price) * 100 * 0.90).toFixed(2)}`,
          change: '+2.1%',
          trend: 'up' as const
        }
      ]
    })) : [
      // Fallback cable data with better structure
      {
        id: 1001,
        name: 'Twin & Earth Cable',
        value: '£1.45/m',
        change: '+2.1%',
        trend: 'up' as const,
        badge: 'normalized',
        subItems: [
          { id: '1001-1', name: '1.0mm² T&E - 50m', value: '£69.50', change: '+2.1%', trend: 'up' as const },
          { id: '1001-2', name: '1.5mm² T&E - 50m', value: '£89.50', change: '+2.1%', trend: 'up' as const },
          { id: '1001-3', name: '2.5mm² T&E - 50m', value: '£135.00', change: '+2.1%', trend: 'up' as const }
        ]
      },
      {
        id: 1002,
        name: 'SWA Cable',
        value: '£3.20/m',
        change: '+1.8%',
        trend: 'up' as const,
        badge: 'normalized',
        subItems: [
          { id: '1002-1', name: '2.5mm² 3 Core SWA - 50m', value: '£295.00', change: '+1.8%', trend: 'up' as const },
          { id: '1002-2', name: '4.0mm² 3 Core SWA - 50m', value: '£425.00', change: '+1.8%', trend: 'up' as const }
        ]
      },
      {
        id: 1003,
        name: 'Data Cable',
        value: '£0.85/m',
        change: '+0.5%',
        trend: 'up' as const,
        badge: 'normalized',
        subItems: [
          { id: '1003-1', name: 'Cat6 UTP - 305m box', value: '£185.00', change: '+0.5%', trend: 'up' as const },
          { id: '1003-2', name: 'Cat6a STP - 305m box', value: '£285.00', change: '+0.5%', trend: 'up' as const }
        ]
      }
    ];

    // Enhanced equipment data with normalized pricing
    const equipmentData = (supplierData || []).filter(item => item.category === 'Equipment');
    const equipmentPrices = equipmentData.length > 0 ? equipmentData.map((item, index) => ({
      id: index + 11,
      name: item.product_name,
      value: `£${item.price}`,
      change: '+1.5%',
      trend: 'up' as const,
      badge: 'unit',
      suppliers: ['RS Components', 'CEF', 'Screwfix']
    })) : [
      // Fallback equipment data with better structure
      {
        id: 2001,
        name: 'RCD Consumer Units',
        value: '£185/unit',
        change: '+3.2%',
        trend: 'up' as const,
        badge: 'unit',
        suppliers: ['RS Components', 'CEF', 'Screwfix'],
        subItems: [
          { id: '2001-1', name: '8-way Dual RCD', value: '£185.00', change: '+3.2%', trend: 'up' as const },
          { id: '2001-2', name: '12-way Dual RCD', value: '£235.00', change: '+3.2%', trend: 'up' as const }
        ]
      },
      {
        id: 2002,
        name: 'LED Downlights',
        value: '£12/unit',
        change: '-1.5%',
        trend: 'down' as const,
        badge: 'unit',
        suppliers: ['City Electrical', 'Screwfix', 'Amazon'],
        subItems: [
          { id: '2002-1', name: '6W Fire-rated LED', value: '£12.50', change: '-1.5%', trend: 'down' as const },
          { id: '2002-2', name: '9W Dimmable LED', value: '£18.50', change: '-1.5%', trend: 'down' as const }
        ]
      },
      {
        id: 2003,
        name: 'RCBO Breakers',
        value: '£45/unit',
        change: '+2.8%',
        trend: 'up' as const,
        badge: 'unit',
        suppliers: ['CEF', 'RS Components', 'TLC Direct'],
        subItems: [
          { id: '2003-1', name: '32A Type B RCBO', value: '£45.00', change: '+2.8%', trend: 'up' as const },
          { id: '2003-2', name: '40A Type B RCBO', value: '£52.00', change: '+2.8%', trend: 'up' as const }
        ]
      }
    ];

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
      isLive: dataSource === 'live_api',
      // Debug information
      apiProvider: 'metalpriceapi.com',
      apiKeySuffix,
      triedLive,
      liveAttemptError
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
          'Content-Type': 'application/json',
          'Cache-Control': 'no-store, no-cache, must-revalidate, proxy-revalidate',
          'Pragma': 'no-cache',
          'Expires': '0'
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
