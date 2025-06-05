
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

    // Fetch regional job pricing data from database
    const { data: regionalPricing, error: pricingError } = await supabase
      .from('regional_job_pricing')
      .select('*')
      .eq('is_active', true)
      .order('region', { ascending: true })

    if (pricingError) {
      console.error('Error fetching regional pricing:', pricingError)
    }

    // Generate comprehensive UK metal and pricing data
    const metalPricesData = {
      metalPrices: [
        {
          id: 1,
          name: "Copper - Bright (per kg)",
          value: "£7.75",
          change: "+2.3%",
          trend: "up" as const
        },
        {
          id: 2,
          name: "Copper - Clean (per kg)",
          value: "£7.25",
          change: "+1.8%",
          trend: "up" as const
        },
        {
          id: 3,
          name: "Copper - Mixed (per kg)",
          value: "£6.85",
          change: "+1.2%",
          trend: "up" as const
        },
        {
          id: 4,
          name: "Copper - Bare Bright (per kg)",
          value: "£8.10",
          change: "+2.8%",
          trend: "up" as const
        },
        {
          id: 5,
          name: "Aluminium (per kg)",
          value: "£2.19",
          change: "+1.5%",
          trend: "up" as const
        },
        {
          id: 6,
          name: "Brass (per kg)",
          value: "£5.12",
          change: "+0.8%",
          trend: "up" as const
        },
        {
          id: 7,
          name: "Lead (per kg)",
          value: "£1.95",
          change: "-0.5%",
          trend: "down" as const
        },
        {
          id: 8,
          name: "Steel (per kg)",
          value: "£0.68",
          change: "-0.3%",
          trend: "down" as const
        }
      ],
      cablePrices: [
        {
          id: 1,
          name: "Armoured Cable (per m)",
          value: "£3.45",
          change: "+1.2%",
          trend: "up" as const
        },
        {
          id: 2,
          name: "Twin & Earth 2.5mm (per m)",
          value: "£1.85",
          change: "+0.8%",
          trend: "up" as const
        },
        {
          id: 3,
          name: "Flex Cable 3-core (per m)",
          value: "£2.20",
          change: "+1.0%",
          trend: "up" as const
        },
        {
          id: 4,
          name: "Cat6 Data Cable (per m)",
          value: "£0.75",
          change: "+0.3%",
          trend: "up" as const
        },
        {
          id: 5,
          name: "Fire Resistant Cable (per m)",
          value: "£4.20",
          change: "+1.5%",
          trend: "up" as const
        }
      ],
      equipmentPrices: [
        {
          id: 1,
          name: "Consumer Unit (Avg)",
          value: "£285",
          change: "+2.1%",
          trend: "up" as const
        },
        {
          id: 2,
          name: "RCD Protection (Avg)",
          value: "£65",
          change: "+1.3%",
          trend: "up" as const
        },
        {
          id: 3,
          name: "MCB Breakers (Avg)",
          value: "£15",
          change: "+0.5%",
          trend: "up" as const
        },
        {
          id: 4,
          name: "Socket Outlets (Avg)",
          value: "£8.50",
          change: "+0.8%",
          trend: "up" as const
        },
        {
          id: 5,
          name: "Light Switches (Avg)",
          value: "£12",
          change: "+0.6%",
          trend: "up" as const
        }
      ],
      marketAlerts: [
        {
          id: 1,
          message: "Copper prices showing strong upward trend due to increased demand in renewable energy sector",
          date: new Date().toISOString().split('T')[0],
          type: "info" as const
        },
        {
          id: 2,
          message: "Supply chain delays affecting cable availability - consider alternative suppliers",
          date: new Date().toISOString().split('T')[0],
          type: "warning" as const
        },
        {
          id: 3,
          message: "New BS 7671:2022 requirements affecting consumer unit specifications",
          date: new Date().toISOString().split('T')[0],
          type: "info" as const
        }
      ],
      regionalJobPricing: regionalPricing || [],
      lastUpdated: new Date().toLocaleString('en-GB', {
        day: '2-digit',
        month: '2-digit', 
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        timeZone: 'Europe/London'
      })
    }

    console.log('UK metal prices and regional job pricing data generated successfully')

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
