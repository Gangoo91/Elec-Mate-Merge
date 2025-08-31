import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const openAIApiKey = Deno.env.get('OpenAI API') || Deno.env.get('OPENAI_API_KEY');

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

// Comprehensive fallback data - 24 realistic electrical tools
const fallbackTools = [
  // Testers (8)
  {
    id: 1,
    name: "Fluke 1653B Installation Tester",
    category: "Testers",
    price: "£489.00",
    supplier: "RS Components",
    image: "https://via.placeholder.com/300x200/f3f4f6/374151?text=Fluke+1653B",
    description: "Professional multifunction installation tester for electrical safety testing",
    productUrl: "https://uk.rs-online.com/web/c/test-measurement/electrical-testers/installation-testers/?searchTerm=fluke+1653b",
    stockStatus: "In Stock",
    highlights: ["BS 7671 18th Edition compliant", "Loop impedance testing", "RCD testing"]
  },
  {
    id: 2,
    name: "Martindale VI13700 Voltage Indicator",
    category: "Testers",
    price: "£28.95",
    supplier: "Screwfix",
    image: "https://via.placeholder.com/300x200/f3f4f6/374151?text=Martindale+VI13700",
    description: "Two pole voltage indicator with LED and audible indication",
    productUrl: "https://www.screwfix.com/c/electrical/electrical-test-equipment/cat830007?searchterm=martindale+voltage+indicator",
    stockStatus: "In Stock",
    highlights: ["12-690V AC/DC", "LED & buzzer indication", "CAT III 690V rated"]
  },
  {
    id: 3,
    name: "Megger MFT1741 Multifunction Tester",
    category: "Testers",
    price: "£875.00",
    supplier: "CPC",
    image: "https://via.placeholder.com/300x200/f3f4f6/374151?text=Megger+MFT1741",
    description: "Advanced multifunction installation tester with Bluetooth",
    productUrl: "https://cpc.farnell.com/c/test-measurement/electrical-testers-meters?searchTerm=megger+mft1741",
    stockStatus: "In Stock",
    highlights: ["Bluetooth connectivity", "Auto test sequences", "Large colour display"]
  },
  {
    id: 4,
    name: "Kewtech KT64DL Digital Insulation Tester",
    category: "Testers",
    price: "£156.00",
    supplier: "Toolstation",
    image: "https://via.placeholder.com/300x200/f3f4f6/374151?text=Kewtech+KT64DL",
    description: "Digital insulation and continuity tester with data logging",
    productUrl: "https://www.toolstation.com/c/electrical/electrical-test-equipment?searchterm=kewtech+insulation",
    stockStatus: "Low Stock",
    highlights: ["500V/1000V test voltages", "Data logging", "Auto discharge"]
  },
  {
    id: 5,
    name: "Socket & See SOK-34 Socket Tester",
    category: "Testers",
    price: "£19.99",
    supplier: "Screwfix",
    image: "https://via.placeholder.com/300x200/f3f4f6/374151?text=Socket+%26+See",
    description: "13A socket tester for quick polarity and earth checks",
    productUrl: "https://www.screwfix.com/c/electrical/electrical-test-equipment/cat830007?searchterm=socket+tester",
    stockStatus: "In Stock",
    highlights: ["Instant results", "LED indicators", "Compact design"]
  },
  {
    id: 6,
    name: "Fluke T6-1000 Electrical Tester",
    category: "Testers",
    price: "£289.00",
    supplier: "RS Components",
    image: "https://via.placeholder.com/300x200/f3f4f6/374151?text=Fluke+T6-1000",
    description: "Non-contact voltage and current electrical tester",
    productUrl: "https://uk.rs-online.com/web/c/test-measurement/electrical-testers?searchTerm=fluke+t6",
    stockStatus: "In Stock",
    highlights: ["FieldSense technology", "True RMS", "CAT IV 600V rated"]
  },
  {
    id: 7,
    name: "Seaward Primetest 100 PAT Tester",
    category: "Testers",
    price: "£325.00",
    supplier: "CPC",
    image: "https://via.placeholder.com/300x200/f3f4f6/374151?text=Seaward+PAT",
    description: "Portable appliance tester for Class I and Class II equipment",
    productUrl: "https://cpc.farnell.com/c/test-measurement/electrical-testers-meters?searchTerm=seaward+pat",
    stockStatus: "In Stock",
    highlights: ["Auto test sequences", "Pass/fail indication", "Battery powered"]
  },
  {
    id: 8,
    name: "Metrel MI3102H EurotestXE Tester",
    category: "Testers",
    price: "£1,245.00",
    supplier: "RS Components",
    image: "https://via.placeholder.com/300x200/f3f4f6/374151?text=Metrel+EurotestXE",
    description: "Professional installation tester with advanced features",
    productUrl: "https://uk.rs-online.com/web/c/test-measurement/electrical-testers/installation-testers?searchTerm=metrel",
    stockStatus: "In Stock",
    highlights: ["Touch screen display", "Wireless communication", "Memory for 1000 tests"]
  },
  // Hand Tools (8)
  {
    id: 9,
    name: "Wiha VDE Screwdriver Set 7pc",
    category: "Hand Tools",
    price: "£34.99",
    supplier: "Screwfix",
    image: "https://via.placeholder.com/300x200/f3f4f6/374151?text=Wiha+VDE+Set",
    description: "VDE insulated screwdriver set for safe electrical work",
    productUrl: "https://www.screwfix.com/c/tools/hand-tools/screwdrivers/cat910043?searchterm=wiha+vde",
    stockStatus: "In Stock",
    highlights: ["VDE certified to 1000V", "Ergonomic handles", "7 piece set"]
  },
  {
    id: 10,
    name: "Knipex 13 96 200 Wire Strippers",
    category: "Hand Tools",
    price: "£45.60",
    supplier: "CPC",
    image: "https://via.placeholder.com/300x200/f3f4f6/374151?text=Knipex+Strippers",
    description: "Professional wire strippers for electrical cables",
    productUrl: "https://cpc.farnell.com/c/tools-production-supplies/hand-tools/electricians-tools?searchTerm=knipex+wire+stripper",
    stockStatus: "In Stock",
    highlights: ["0.2-6.0mm² capacity", "Precision stripping", "German engineering"]
  },
  {
    id: 11,
    name: "CK Tools Side Cutters 160mm",
    category: "Hand Tools",
    price: "£18.95",
    supplier: "Toolstation",
    image: "https://via.placeholder.com/300x200/f3f4f6/374151?text=CK+Side+Cutters",
    description: "Professional side cutting pliers for electrical work",
    productUrl: "https://www.toolstation.com/c/tools/hand-tools/pliers?searchterm=ck+tools+side+cutters",
    stockStatus: "In Stock",
    highlights: ["Hardened cutting edges", "Comfortable grips", "160mm length"]
  },
  {
    id: 12,
    name: "Klein Tools 1004 Cable Cutters",
    category: "Hand Tools",
    price: "£89.00",
    supplier: "RS Components",
    image: "https://via.placeholder.com/300x200/f3f4f6/374151?text=Klein+Cable+Cutters",
    description: "Heavy duty cable cutters for armoured and large cables",
    productUrl: "https://uk.rs-online.com/web/c/tools-production-supplies/hand-tools/electricians-tools?searchTerm=klein+cable+cutters",
    stockStatus: "In Stock",
    highlights: ["Cuts up to 32mm cables", "Ratcheting action", "Professional grade"]
  },
  {
    id: 13,
    name: "Weidmuller PZ 50 Crimping Tool",
    category: "Hand Tools",
    price: "£125.00",
    supplier: "CPC",
    image: "https://via.placeholder.com/300x200/f3f4f6/374151?text=Weidmuller+Crimper",
    description: "Professional crimping tool for electrical terminals",
    productUrl: "https://cpc.farnell.com/c/tools-production-supplies/hand-tools/electricians-tools?searchTerm=weidmuller+crimping",
    stockStatus: "In Stock",
    highlights: ["0.5-6mm² terminals", "Ratcheting mechanism", "Precise crimping"]
  },
  {
    id: 14,
    name: "Stanley FatMax Utility Knife",
    category: "Hand Tools",
    price: "£12.99",
    supplier: "Screwfix",
    image: "https://via.placeholder.com/300x200/f3f4f6/374151?text=Stanley+FatMax",
    description: "Heavy duty utility knife for cable preparation",
    productUrl: "https://www.screwfix.com/c/tools/hand-tools/knives-blades/cat910111?searchterm=stanley+fatmax",
    stockStatus: "In Stock",
    highlights: ["Retractable blade", "Heavy duty construction", "Comfortable grip"]
  },
  {
    id: 15,
    name: "Greenlee 1903 Conduit Bender",
    category: "Hand Tools",
    price: "£78.00",
    supplier: "Toolstation",
    image: "https://via.placeholder.com/300x200/f3f4f6/374151?text=Greenlee+Bender",
    description: "Manual conduit bender for 20mm steel conduit",
    productUrl: "https://www.toolstation.com/c/electrical/cable-conduit-trunking/conduit-benders?searchterm=conduit+bender",
    stockStatus: "Low Stock",
    highlights: ["20mm conduit capacity", "Accurate bending", "Durable construction"]
  },
  {
    id: 16,
    name: "Bahco Adjustable Wrench Set",
    category: "Hand Tools",
    price: "£24.95",
    supplier: "CPC",
    image: "https://via.placeholder.com/300x200/f3f4f6/374151?text=Bahco+Wrenches",
    description: "Set of adjustable wrenches for electrical installations",
    productUrl: "https://cpc.farnell.com/c/tools-production-supplies/hand-tools?searchTerm=bahco+adjustable+wrench",
    stockStatus: "In Stock",
    highlights: ["3 piece set", "Chrome vanadium steel", "Comfortable handles"]
  },
  // Power Tools (8)
  {
    id: 17,
    name: "Makita DHR202Z SDS Drill",
    category: "Power Tools",
    price: "£179.00",
    supplier: "Toolstation",
    image: "https://via.placeholder.com/300x200/f3f4f6/374151?text=Makita+DHR202Z",
    description: "Cordless SDS plus rotary hammer drill for electrical installations",
    productUrl: "https://www.toolstation.com/c/power-tools/cordless-tools/makita?searchterm=makita+dhr202",
    stockStatus: "In Stock",
    highlights: ["18V LXT battery", "20mm drilling capacity", "Anti-vibration technology"]
  },
  {
    id: 18,
    name: "DeWalt DCD796N Impact Driver",
    category: "Power Tools",
    price: "£145.00",
    supplier: "Screwfix",
    image: "https://via.placeholder.com/300x200/f3f4f6/374151?text=DeWalt+DCD796N",
    description: "Brushless impact driver for electrical fixings",
    productUrl: "https://www.screwfix.com/c/tools/power-tools/dewalt/impact-drivers?searchterm=dewalt+dcd796",
    stockStatus: "In Stock",
    highlights: ["Brushless motor", "180Nm torque", "LED work light"]
  },
  {
    id: 19,
    name: "Bosch GWS 7-115 Angle Grinder",
    category: "Power Tools",
    price: "£48.99",
    supplier: "Toolstation",
    image: "https://via.placeholder.com/300x200/f3f4f6/374151?text=Bosch+GWS+7-115",
    description: "Compact angle grinder for cutting and grinding tasks",
    productUrl: "https://www.toolstation.com/c/power-tools/angle-grinders/bosch?searchterm=bosch+gws+7",
    stockStatus: "In Stock",
    highlights: ["115mm disc", "720W motor", "Compact design"]
  },
  {
    id: 20,
    name: "Milwaukee M18 FUEL Reciprocating Saw",
    category: "Power Tools",
    price: "£229.00",
    supplier: "CPC",
    image: "https://via.placeholder.com/300x200/f3f4f6/374151?text=Milwaukee+M18",
    description: "Cordless reciprocating saw for demolition and cutting",
    productUrl: "https://cpc.farnell.com/c/tools-production-supplies/power-tools?searchTerm=milwaukee+m18+reciprocating",
    stockStatus: "In Stock",
    highlights: ["Brushless motor", "Variable speed", "Tool-free blade change"]
  },
  {
    id: 21,
    name: "Hilti TE 7-C Rotary Hammer",
    category: "Power Tools",
    price: "£169.00",
    supplier: "RS Components",
    image: "https://via.placeholder.com/300x200/f3f4f6/374151?text=Hilti+TE+7-C",
    description: "Corded rotary hammer for drilling in concrete and masonry",
    productUrl: "https://uk.rs-online.com/web/c/tools-production-supplies/power-tools/rotary-hammers?searchTerm=hilti+te+7",
    stockStatus: "In Stock",
    highlights: ["SDS-plus chuck", "Active vibration reduction", "720W motor"]
  },
  {
    id: 22,
    name: "Festool OSC 18 Multi-Tool",
    category: "Power Tools",
    price: "£289.00",
    supplier: "Toolstation",
    image: "https://via.placeholder.com/300x200/f3f4f6/374151?text=Festool+OSC+18",
    description: "Cordless oscillating multi-tool for precision cutting",
    productUrl: "https://www.toolstation.com/c/power-tools/multi-tools/festool?searchterm=festool+osc",
    stockStatus: "Low Stock",
    highlights: ["18V battery", "StarlockMax system", "LED work light"]
  },
  {
    id: 23,
    name: "Greenlee 855GX Cable Puller",
    category: "Power Tools",
    price: "£1,850.00",
    supplier: "CPC",
    image: "https://via.placeholder.com/300x200/f3f4f6/374151?text=Greenlee+Cable+Puller",
    description: "Electric cable pulling system for large installations",
    productUrl: "https://cpc.farnell.com/c/tools-production-supplies/specialist-tools?searchTerm=greenlee+cable+puller",
    stockStatus: "Out of Stock",
    highlights: ["8000 lbs pulling force", "Variable speed", "Digital display"]
  },
  {
    id: 24,
    name: "Ridgid 700 Pipe Threader",
    category: "Power Tools",
    price: "£425.00",
    supplier: "RS Components",
    image: "https://via.placeholder.com/300x200/f3f4f6/374151?text=Ridgid+700",
    description: "Portable pipe threading machine for conduit preparation",
    productUrl: "https://uk.rs-online.com/web/c/tools-production-supplies/power-tools?searchTerm=ridgid+pipe+threader",
    stockStatus: "In Stock",
    highlights: ["1/2\" to 2\" capacity", "Portable design", "Quick-acting cam lever"]
  }
];

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    console.log('Starting AI electrical tools generation...');

    if (!openAIApiKey) {
      console.log('No OpenAI API key found, returning fallback data');
      return new Response(JSON.stringify({
        products: fallbackTools,
        supplier: "Static Fallback",
        generated_at: new Date().toISOString(),
        categories: {
          testers: fallbackTools.filter((t: any) => t.category === "Testers").length,
          handTools: fallbackTools.filter((t: any) => t.category === "Hand Tools").length,
          powerTools: fallbackTools.filter((t: any) => t.category === "Power Tools").length
        }
      }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    // Set timeout for OpenAI request
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 12000); // 12 second timeout

    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      signal: controller.signal,
      headers: {
        'Authorization': `Bearer ${openAIApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-4.1-2025-04-14',
        max_completion_tokens: 3000,
        messages: [
          {
            role: 'system',
            content: `You are a professional electrical tool database generator. Generate exactly 24 realistic UK electrical tools as a valid JSON array.

CRITICAL: Return ONLY the JSON array with no additional text, explanations, or markdown formatting.

Required format:
[
  {
    "id": 1,
    "name": "Real Brand Real Model",
    "category": "Testers",
    "price": "£XX.XX",
    "supplier": "Screwfix",
    "image": "/placeholder.svg",
    "description": "Professional description",
    "productUrl": "https://realurl.com/product",
    "stockStatus": "In Stock",
    "highlights": ["Feature 1", "Feature 2", "Feature 3"]
  }
]

Generate 8 tools for each category:
- Testers: Real brands like Fluke, Megger, Kewtech, Martindale
- Hand Tools: Real brands like Wiha, Knipex, CK Tools, Klein
- Power Tools: Real brands like Makita, DeWalt, Bosch, Milwaukee

Use real UK suppliers: Screwfix, Toolstation, CPC, RS Components
Use realistic UK prices: £15-£1500
Stock options: "In Stock", "Low Stock", "Out of Stock"`
          },
          {
            role: 'user',
            content: 'Generate the 24 electrical tools JSON array with real brands and models.'
          }
        ],
      }),
    });

    clearTimeout(timeoutId);

    if (!response.ok) {
      const errorText = await response.text();
      console.error('OpenAI API error:', errorText);
      throw new Error(`OpenAI API error: ${response.status} ${errorText}`);
    }

    const data = await response.json();
    console.log('OpenAI response received successfully');

    let toolsData;
    try {
      const content = data.choices[0].message.content;
      console.log('Raw OpenAI content:', content.substring(0, 500) + '...');
      
      // Extract JSON from the response with multiple fallback strategies
      let cleanContent = content.trim();
      
      // Remove markdown code blocks
      cleanContent = cleanContent.replace(/```json\s*/g, '').replace(/```\s*/g, '');
      
      // Try to find JSON array
      const jsonMatch = cleanContent.match(/\[[\s\S]*\]/);
      if (jsonMatch) {
        toolsData = JSON.parse(jsonMatch[0]);
      } else {
        // Try parsing the entire content
        toolsData = JSON.parse(cleanContent);
      }
      
      console.log(`Successfully parsed ${toolsData.length} tools`);
    } catch (parseError) {
      console.error('Failed to parse OpenAI response:', parseError);
      throw new Error('Failed to parse AI response');
    }

    // Validate and clean the data
    const validTools = toolsData.filter((tool: any) => 
      tool.name && tool.category && tool.price && tool.supplier
    ).map((tool: any, index: number) => ({
      ...tool,
      id: index + 1,
      image: `https://via.placeholder.com/300x200/f3f4f6/374151?text=${encodeURIComponent(tool.name.split(' ').slice(0,2).join('+'))}`, // Dynamic placeholder
      productUrl: tool.productUrl || `https://www.${tool.supplier.toLowerCase().replace(/\s+/g, '')}.com/search?q=${encodeURIComponent(tool.name)}`,
      stockStatus: tool.stockStatus || "In Stock",
      highlights: Array.isArray(tool.highlights) ? tool.highlights.slice(0, 3) : ["Professional grade", "BS 7671 compliant", "UK specification"]
    }));

    console.log(`Returning ${validTools.length} valid electrical tools`);

    return new Response(JSON.stringify({
      products: validTools,
      supplier: "AI Generated",
      generated_at: new Date().toISOString(),
      categories: {
        testers: validTools.filter((t: any) => t.category === "Testers").length,
        handTools: validTools.filter((t: any) => t.category === "Hand Tools").length,
        powerTools: validTools.filter((t: any) => t.category === "Power Tools").length
      }
    }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });

  } catch (error) {
    console.error('Error in ai-electrical-tools function:', error);
    
    // Return fallback data instead of error for better UX
    console.log('Returning fallback data due to error');
    return new Response(JSON.stringify({
      products: fallbackTools,
      supplier: "Fallback Data",
      generated_at: new Date().toISOString(),
      categories: {
        testers: fallbackTools.filter((t: any) => t.category === "Testers").length,
        handTools: fallbackTools.filter((t: any) => t.category === "Hand Tools").length,
        powerTools: fallbackTools.filter((t: any) => t.category === "Power Tools").length
      },
      note: "AI generation failed, showing sample tools"
    }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});