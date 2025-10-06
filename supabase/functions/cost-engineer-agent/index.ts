import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.39.3';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { messages, currentDesign } = await req.json();
    const openAIApiKey = Deno.env.get('OPENAI_API_KEY');

    if (!openAIApiKey) {
      throw new Error('OpenAI API key not configured');
    }

    console.log('💰 Cost Engineer Agent: Processing pricing query');

    // Define specialized tools for cost estimation
    const tools = [
      {
        type: "function",
        function: {
          name: "estimate_material_costs",
          description: "Calculate total material costs for electrical installation components",
          parameters: {
            type: "object",
            properties: {
              cable_size: { type: "number", description: "Cable size in mm²" },
              cable_length: { type: "number", description: "Cable length in meters" },
              cable_type: { type: "string", description: "Cable type (e.g., 'twin and earth', 'SWA', '3-core flex')" },
              protection_device: { type: "string", description: "MCB/RCBO type and rating" },
              accessories: { type: "array", items: { type: "string" }, description: "List of accessories needed" }
            },
            required: ["cable_size", "cable_length", "cable_type"]
          }
        }
      },
      {
        type: "function",
        function: {
          name: "compare_wholesaler_prices",
          description: "Compare prices across Screwfix, CEF, and Toolstation for specific items",
          parameters: {
            type: "object",
            properties: {
              item_description: { type: "string", description: "Item to price check" },
              quantity: { type: "number", description: "Quantity needed" }
            },
            required: ["item_description"]
          }
        }
      },
      {
        type: "function",
        function: {
          name: "calculate_labour_hours",
          description: "Estimate labour hours for electrical installation work",
          parameters: {
            type: "object",
            properties: {
              circuit_type: { type: "string", description: "Type of circuit (e.g., 'socket', 'lighting', 'shower')" },
              cable_length: { type: "number", description: "Cable run length" },
              complexity: { type: "string", enum: ["simple", "moderate", "complex"], description: "Installation complexity" }
            },
            required: ["circuit_type"]
          }
        }
      }
    ];

    const systemPrompt = `You are an expert electrical pricing specialist with access to live wholesaler pricing data.

CRITICAL RULES:
- Always show detailed cost breakdowns
- Compare prices across Screwfix, CEF, and Toolstation
- Highlight cheapest options
- Include VAT calculations (20%)
- Suggest cost-effective alternatives when appropriate
- Use 2025 UK market rates

Provide clear pricing tables showing:
1. Materials breakdown (item, quantity, unit price, total)
2. Wholesaler comparison
3. Labour estimate (based on regional rates)
4. VAT
5. Total project cost

Always mention if prices are live data or estimates.`;

    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${openAIApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-4o',
        messages: [
          { role: 'system', content: systemPrompt },
          ...messages
        ],
        tools,
        tool_choice: "auto",
        max_tokens: 1500,
        temperature: 0.3
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('OpenAI API error:', errorText);
      throw new Error(`OpenAI API error: ${response.status}`);
    }

    const data = await response.json();
    const assistantMessage = data.choices[0]?.message;

    // Handle tool calls
    const toolCalls = assistantMessage.tool_calls || [];
    let costUpdates: any = null;

    for (const toolCall of toolCalls) {
      const functionName = toolCall.function.name;
      const args = JSON.parse(toolCall.function.arguments);
      
      console.log(`🔧 Executing tool: ${functionName}`, args);
      
      const toolResult = await executeCostTool(functionName, args);
      
      if (toolResult.costUpdates) {
        costUpdates = toolResult.costUpdates;
      }
    }

    const responseContent = assistantMessage.content || 'Cost analysis complete.';

    return new Response(JSON.stringify({
      response: responseContent,
      toolCalls,
      costUpdates,
      timestamp: new Date().toISOString()
    }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });

  } catch (error) {
    console.error('❌ Error in cost-engineer-agent:', error);
    return new Response(JSON.stringify({ 
      error: error instanceof Error ? error.message : 'Cost engineer agent failed',
      response: 'Unable to process cost request.'
    }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});

async function executeCostTool(functionName: string, args: any): Promise<any> {
  switch (functionName) {
    case 'estimate_material_costs':
      return estimateMaterialCosts(args);
    case 'compare_wholesaler_prices':
      return compareWholesalerPrices(args);
    case 'calculate_labour_hours':
      return calculateLabourHours(args);
    default:
      return { result: 'Unknown tool' };
  }
}

function estimateMaterialCosts(args: any) {
  const { cable_size, cable_length, cable_type, protection_device, accessories } = args;
  
  // Simplified pricing (in reality, this would query the pricing_embeddings table)
  const cablePricePerMeter: Record<number, number> = {
    1.5: 0.85, 2.5: 1.20, 4: 1.75, 6: 2.30, 10: 3.50, 16: 5.20, 25: 8.50
  };
  
  const cableCost = (cablePricePerMeter[cable_size] || 1.20) * cable_length;
  const mcbCost = protection_device ? 12.99 : 0;
  const accessoriesCost = (accessories?.length || 0) * 5.50;
  
  const subtotal = cableCost + mcbCost + accessoriesCost;
  const vat = subtotal * 0.20;
  const total = subtotal + vat;
  
  return {
    result: {
      cable_cost: Math.round(cableCost * 100) / 100,
      protection_cost: mcbCost,
      accessories_cost: accessoriesCost,
      subtotal: Math.round(subtotal * 100) / 100,
      vat: Math.round(vat * 100) / 100,
      total: Math.round(total * 100) / 100
    },
    costUpdates: {
      materials: Math.round(subtotal * 100) / 100,
      vat: Math.round(vat * 100) / 100,
      total: Math.round(total * 100) / 100
    }
  };
}

function compareWholesalerPrices(args: any) {
  const { item_description } = args;
  
  // Simplified comparison (would query live pricing database)
  const comparison = {
    screwfix: { price: 12.99, in_stock: true },
    cef: { price: 11.50, in_stock: true },
    toolstation: { price: 13.20, in_stock: true }
  };
  
  const cheapest = 'cef';
  
  return {
    result: {
      item: item_description,
      prices: comparison,
      cheapest_supplier: cheapest,
      cheapest_price: comparison[cheapest as keyof typeof comparison].price
    }
  };
}

function calculateLabourHours(args: any) {
  const { circuit_type, cable_length, complexity } = args;
  
  // Base hours by circuit type
  const baseHours: Record<string, number> = {
    'socket': 2.5,
    'lighting': 2.0,
    'shower': 4.0,
    'cooker': 3.5,
    'ev-charger': 5.0
  };
  
  let hours = baseHours[circuit_type?.toLowerCase()] || 3.0;
  
  // Adjust for cable length
  if (cable_length > 20) hours += (cable_length - 20) * 0.05;
  
  // Complexity multiplier
  const complexityMultiplier: Record<string, number> = {
    'simple': 1.0,
    'moderate': 1.3,
    'complex': 1.6
  };
  
  hours *= complexityMultiplier[complexity || 'moderate'];
  
  // 2025 regional rates (East Midlands average)
  const hourlyRate = 45;
  const labourCost = hours * hourlyRate;
  
  return {
    result: {
      estimated_hours: Math.round(hours * 10) / 10,
      hourly_rate: hourlyRate,
      labour_cost: Math.round(labourCost * 100) / 100,
      region: 'East Midlands (2025 rate)'
    }
  };
}
