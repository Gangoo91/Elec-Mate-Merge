
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import "https://deno.land/x/xhr@0.1.0/mod.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

// Function to fetch real UK metal prices from an external API
async function fetchRealUKMetalPrices() {
  try {
    // This is where you would make an API call to a real metal pricing service
    // Since we don't have an API key for a real service, we're simulating UK-specific pricing
    
    // Example API call (commented out since we don't have a real API key):
    // const response = await fetch(
    //   `https://metals-api.com/api/latest?access_key=${Deno.env.get("METALS_API_KEY")}&base=GBP&symbols=XCU,XAL,XAU,XPB,XNI,XZN`,
    //   { headers: { 'Accept': 'application/json' } }
    // );
    // const data = await response.json();
    
    // For now, we'll use enhanced mock data with UK-specific pricing
    return generateUKMetalPrices();
  } catch (error) {
    console.error("Error fetching real metal prices:", error);
    throw error;
  }
}

// Enhanced mock data generation with UK-specific pricing
const generateUKMetalPrices = () => {
  const getRandomPrice = (base: number, variance: number) => {
    const change = (Math.random() * variance * 2) - variance;
    return (base + change).toFixed(2);
  };

  const getRandomTrend = () => {
    const rand = Math.random();
    return rand > 0.6 ? "up" : rand < 0.4 ? "down" : "neutral";
  };

  const getRandomChange = (trend: string) => {
    const changeVal = (Math.random() * 4).toFixed(1);
    return trend === "up" ? `+${changeVal}%` : trend === "down" ? `-${changeVal}%` : "0.0%";
  };

  const currentDate = new Date();
  // Format date in UK style (DD/MM/YYYY)
  const formattedDate = `${currentDate.getDate()} ${currentDate.toLocaleString('en-UK', { month: 'short' })} ${currentDate.getFullYear()}, ${currentDate.getHours()}:${currentDate.getMinutes().toString().padStart(2, '0')} ${currentDate.getHours() >= 12 ? 'PM' : 'AM'}`;

  // Generate expanded metal prices with UK values and detailed copper categories
  const metals = [
    // Copper Categories (UK prices)
    { id: 1, name: "Copper - Bright (per kg)", base: 7.75, variance: 0.3 },
    { id: 2, name: "Copper - Clean (per kg)", base: 7.25, variance: 0.3 },
    { id: 3, name: "Copper - Mixed (per kg)", base: 6.85, variance: 0.3 },
    { id: 4, name: "Copper - Insulated (per kg)", base: 2.80, variance: 0.2 },
    // Other Metals
    { id: 5, name: "Aluminium (per kg)", base: 2.19, variance: 0.15 },
    { id: 6, name: "Brass (per kg)", base: 5.12, variance: 0.25 },
    { id: 7, name: "Lead (per kg)", base: 1.25, variance: 0.08 },
    { id: 8, name: "Steel (per kg)", base: 0.68, variance: 0.05 },
    { id: 9, name: "Zinc (per kg)", base: 2.45, variance: 0.18 },
    { id: 10, name: "Bronze (per kg)", base: 4.35, variance: 0.22 }
  ];

  const metalPrices = metals.map(metal => {
    const trend = getRandomTrend();
    return {
      id: metal.id,
      name: metal.name,
      value: `£${getRandomPrice(metal.base, metal.variance)}`,
      change: getRandomChange(trend),
      trend
    };
  });

  // Generate UK-specific cable prices
  const cables = [
    { id: 1, name: "Twin & Earth 2.5mm²", base: 0.92, variance: 0.08 },
    { id: 2, name: "Armoured Cable 10mm² (SWA)", base: 4.75, variance: 0.3 },
    { id: 3, name: "PVC Conduit (20mm)", base: 1.85, variance: 0.1 },
    { id: 4, name: "Fire Resistant Cable 1.5mm²", base: 1.25, variance: 0.15 }
  ];

  const cablePrices = cables.map(cable => {
    const trend = getRandomTrend();
    return {
      id: cable.id,
      name: cable.name,
      value: `£${getRandomPrice(cable.base, cable.variance)}/m`,
      change: getRandomChange(trend),
      trend
    };
  });

  // Generate UK equipment prices
  const equipment = [
    { id: 1, name: "Consumer Units (Average)", base: 85.30, variance: 5 },
    { id: 2, name: "LED Panel Lights (600x600mm)", base: 28.99, variance: 3 },
    { id: 3, name: "Steel Trunking (100x100mm)", base: 24.80, variance: 2 },
    { id: 4, name: "Circuit Breakers (MCB)", base: 8.45, variance: 0.7 }
  ];

  const equipmentPrices = equipment.map(item => {
    const trend = getRandomTrend();
    return {
      id: item.id,
      name: item.name,
      value: `£${getRandomPrice(item.base, item.variance)}`,
      change: getRandomChange(trend),
      trend
    };
  });

  // UK market alerts
  const marketAlerts = [
    {
      id: 1,
      message: "UK copper prices expected to rise further due to global mining disruptions.",
      date: `${currentDate.getDate()} ${currentDate.toLocaleString('en-UK', { month: 'short' })} ${currentDate.getFullYear()}`,
      type: "info"
    },
    {
      id: 2,
      message: "Post-Brexit regulations affecting import costs for electrical materials across Britain.",
      date: `${(currentDate.getDate() - 2 > 0 ? currentDate.getDate() - 2 : 30)} ${currentDate.toLocaleString('en-UK', { month: 'short' })} ${currentDate.getFullYear()}`,
      type: "warning"
    },
    {
      id: 3,
      message: "New UK wire regulations coming into effect next month for commercial installations.",
      date: `${(currentDate.getDate() - 4 > 0 ? currentDate.getDate() - 4 : 28)} ${currentDate.toLocaleString('en-UK', { month: 'short' })} ${currentDate.getFullYear()}`,
      type: "warning"
    }
  ];

  return {
    metalPrices,
    cablePrices,
    equipmentPrices,
    marketAlerts,
    lastUpdated: formattedDate + " (UK Time)"
  };
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    // In a production environment, you would call fetchRealUKMetalPrices() which connects to a real API
    // For now, we're using enhanced UK-specific mock data
    const data = await fetchRealUKMetalPrices();
    
    console.log("UK metal prices data generated successfully");
    
    return new Response(JSON.stringify(data), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 200,
    });
  } catch (error) {
    console.error("Error fetching UK metal prices:", error);
    
    return new Response(JSON.stringify({ error: error.message }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 500,
    });
  }
});
