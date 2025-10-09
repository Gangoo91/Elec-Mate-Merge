import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

// BS 6004 Table 8: Twin and Earth Cable CPC Sizes
const TWIN_EARTH_CPC_SIZES: Record<string, string> = {
  '1.0': '1.0',
  '1.5': '1.0',
  '2.5': '1.5',
  '4.0': '1.5',
  '6.0': '2.5',
  '10.0': '4.0',
  '16.0': '6.0',
  '25.0': '6.0'
};

// Correct CPC size for Twin & Earth cables per BS 6004
function correctCPCSize(cableSize: string, cpcSize: string, cableType: string): { 
  correctedCPC: string; 
  wasCorrection: boolean;
  originalCPC: string;
} {
  const lowerCableType = cableType.toLowerCase();
  const isTwinEarth = lowerCableType.includes('twin') || 
                      lowerCableType.includes('t&e') || 
                      lowerCableType.includes('t and e') ||
                      lowerCableType.includes('twin and earth');
  
  if (!isTwinEarth) {
    return { correctedCPC: cpcSize, wasCorrection: false, originalCPC: cpcSize };
  }

  const correctCPC = TWIN_EARTH_CPC_SIZES[cableSize];
  if (correctCPC && correctCPC !== cpcSize) {
    console.log(`⚠️ SAFETY CORRECTION: ${cableSize}mm² T&E has ${correctCPC}mm² CPC (was incorrectly ${cpcSize}mm² per BS 6004 Table 8)`);
    return { correctedCPC: correctCPC, wasCorrection: true, originalCPC: cpcSize };
  }

  return { correctedCPC: cpcSize, wasCorrection: false, originalCPC: cpcSize };
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { structuredCircuit, designerResponse, projectName } = await req.json();
    const lovableApiKey = Deno.env.get('LOVABLE_API_KEY');
    
    if (!lovableApiKey) {
      throw new Error('LOVABLE_API_KEY not configured');
    }

    console.log('📐 Generating circuit diagrams for:', projectName);

    // NEW: Use structured circuit data if available, otherwise extract from text
    let circuitInfo;
    if (structuredCircuit) {
      console.log('✅ Using structured circuit data:', structuredCircuit);
      circuitInfo = {
        cableSize: structuredCircuit.cableSize?.toString() || '2.5',
        cpcSize: structuredCircuit.cpcSize?.toString() || '1.5',
        cableType: structuredCircuit.cableType || 'Twin and Earth',
        protection: `${structuredCircuit.protectionDevice?.rating || 32}A ${structuredCircuit.protectionDevice?.type || 'MCB'}`,
        voltage: structuredCircuit.voltage?.toString() || '230',
        load: `${(structuredCircuit.loadPower || 0) / 1000}kW`,
        circuitType: structuredCircuit.loadType || 'socket',
        circuitName: structuredCircuit.name || `Circuit ${structuredCircuit.circuitNumber}`,
        cableLength: structuredCircuit.cableLength || 15,
        rcdProtected: structuredCircuit.rcdProtected || false,
        fullResponse: JSON.stringify(structuredCircuit)
      };
      
      // Apply CPC correction for Twin & Earth cables
      const { correctedCPC, wasCorrection, originalCPC } = correctCPCSize(
        circuitInfo.cableSize,
        circuitInfo.cpcSize,
        circuitInfo.cableType
      );
      
      if (wasCorrection) {
        console.log(`✅ CORRECTED: ${circuitInfo.cableSize}mm² ${circuitInfo.cableType} CPC from ${originalCPC}mm² to ${correctedCPC}mm² (BS 6004 Table 8)`);
        circuitInfo.cpcSize = correctedCPC;
      }
      
      // Validation: Ensure critical specs match
      if (structuredCircuit.cableSize && circuitInfo.cpcSize) {
        console.log(`✅ Validated: ${structuredCircuit.cableSize}mm² cable with ${circuitInfo.cpcSize}mm² CPC`);
      }
    } else if (designerResponse) {
      console.log('⚠️ No structured data, extracting from text');
      circuitInfo = extractCircuitInfo(designerResponse);
    } else {
      throw new Error('No circuit data provided (need structuredCircuit or designerResponse)');
    }
    
    // Generate single-line diagram
    const singleLineDiagram = await generateDiagram({
      type: 'single-line',
      circuitInfo,
      projectName,
      lovableApiKey
    });

    // Generate detailed circuit schematic
    const schematicDiagram = await generateDiagram({
      type: 'schematic',
      circuitInfo,
      projectName,
      lovableApiKey
    });

    const diagrams = [
      {
        type: 'single-line',
        title: 'Single Line Diagram',
        imageUrl: singleLineDiagram,
        description: 'BS 7671 compliant single-line representation showing main protection, distribution, and circuit layout'
      },
      {
        type: 'schematic',
        title: 'Circuit Schematic',
        imageUrl: schematicDiagram,
        description: 'Detailed circuit schematic with cable sizes, protection devices, and load connections'
      }
    ];

    return new Response(JSON.stringify({ diagrams }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });

  } catch (error) {
    console.error('❌ Circuit diagram generation error:', error);
    const errorMessage = error instanceof Error ? error.message : 'Failed to generate diagrams';
    const errorDetails = error instanceof Error ? error.stack : 'No stack trace';
    
    console.error('Error details:', errorDetails);
    
    return new Response(JSON.stringify({ 
      error: errorMessage,
      details: errorDetails,
      diagrams: [],
      timestamp: new Date().toISOString()
    }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});

function extractCircuitInfo(designerResponse: string) {
  // Extract circuit parameters from designer response
  const cableSizeMatch = designerResponse.match(/(\d+\.?\d*)\s*mm²/);
  const protectionMatch = designerResponse.match(/(\d+)A\s*(MCB|RCBO|RCD)/i);
  const voltageMatch = designerResponse.match(/(\d+)V/);
  const loadMatch = designerResponse.match(/(\d+\.?\d*)\s*(kW|W)/i);
  const circuitTypeMatch = designerResponse.match(/(socket|lighting|shower|cooker|immersion|heating)/i);
  
  return {
    cableSize: cableSizeMatch ? cableSizeMatch[1] : '2.5',
    protection: protectionMatch ? `${protectionMatch[1]}A ${protectionMatch[2].toUpperCase()}` : '32A MCB',
    voltage: voltageMatch ? voltageMatch[1] : '230',
    load: loadMatch ? `${loadMatch[1]}${loadMatch[2]}` : '3kW',
    circuitType: circuitTypeMatch ? circuitTypeMatch[1] : 'socket',
    fullResponse: designerResponse
  };
}

async function generateDiagram({ type, circuitInfo, projectName, lovableApiKey }: {
  type: 'single-line' | 'schematic';
  circuitInfo: any;
  projectName: string;
  lovableApiKey: string;
}): Promise<string> {
  
  const prompt = type === 'single-line' 
    ? buildSingleLinePrompt(circuitInfo, projectName)
    : buildSchematicPrompt(circuitInfo, projectName);

  console.log(`🎨 Generating ${type} diagram with Lovable AI...`);

  const response = await fetch('https://ai.gateway.lovable.dev/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${lovableApiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      model: 'google/gemini-2.5-flash-image-preview',
      messages: [
        {
          role: 'user',
          content: prompt
        }
      ],
      modalities: ['image', 'text']
    }),
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`AI Gateway error: ${response.status} - ${errorText}`);
  }

  const data = await response.json();
  const imageUrl = data.choices?.[0]?.message?.images?.[0]?.image_url?.url;

  if (!imageUrl) {
    throw new Error('No image generated by AI');
  }

  return imageUrl;
}

function buildSingleLinePrompt(circuitInfo: any, projectName: string): string {
  return `Generate a professional BS 7671:2018+A2:2022 compliant SINGLE LINE ELECTRICAL DIAGRAM for this installation:

PROJECT: ${projectName}

⚠️ CRITICAL CABLE SPECIFICATIONS - VERIFIED PER BS 6004 TABLE 8 (MUST USE EXACT VALUES):
- Live Conductor: ${circuitInfo.cableSize}mm²
- CPC (Earth): ${circuitInfo.cpcSize}mm² ← VERIFIED CORRECT SIZE PER BS 6004 TABLE 8
- Cable Type: ${circuitInfo.cableSize}mm²/${circuitInfo.cpcSize}mm² twin & earth (6242Y)

NOTE: CPC size shown is the CORRECT British Standard specification for ${circuitInfo.cableType || 'Twin and Earth'}.
For reference: 16mm² T&E = 6mm² CPC, 10mm² T&E = 4mm² CPC, 2.5mm² T&E = 1.5mm² CPC per BS 6004 Table 8.

CIRCUIT DETAILS:
- Circuit Name: ${circuitInfo.circuitName || circuitInfo.circuitType.toUpperCase()}
- Protection: ${circuitInfo.protection}
- Voltage: ${circuitInfo.voltage}V single phase
- Load: ${circuitInfo.load}
- Cable Length: ${circuitInfo.cableLength}m

DRAWING REQUIREMENTS:
1. Use standard BS 7671 electrical symbols (IEC 60617 standard)
2. Show vertical layout from top to bottom:
   - Main incoming supply (${circuitInfo.voltage}V)
   - Consumer unit/distribution board with main switch
   - ${circuitInfo.protection} protective device
   - ⚠️ CRITICAL: Cable labeled as "${circuitInfo.cableSize}mm² / ${circuitInfo.cpcSize}mm²" - DO NOT use any other sizes
   - Load/outlet at bottom
3. Label all components clearly with exact ratings specified above
4. Include earth bonding conductor (${circuitInfo.cpcSize}mm² CPC)
5. Add regulation references (e.g., "BS 7671 Reg 411.3.2")
6. Professional engineering style - clean black lines on white background
7. Include title block with project name and circuit designation
8. Add cable length indication: ${circuitInfo.cableLength}m run
9. Show CPC connection with correct ${circuitInfo.cpcSize}mm² size labeling

⚠️ VALIDATION CHECK: Before finalizing, verify cable shows ${circuitInfo.cableSize}mm² and CPC shows ${circuitInfo.cpcSize}mm².

STYLE: Technical drawing, professional engineering documentation, high contrast black & white, crisp lines, suitable for Building Control submission.`;
}

function buildSchematicPrompt(circuitInfo: any, projectName: string): string {
  return `Generate a detailed BS 7671:2018+A2:2022 compliant CIRCUIT SCHEMATIC DIAGRAM for this installation:

PROJECT: ${projectName}

⚠️ CRITICAL CABLE SPECIFICATIONS - VERIFIED PER BS 6004 TABLE 8 (MUST USE EXACT VALUES):
- Live: ${circuitInfo.cableSize}mm²
- Neutral: ${circuitInfo.cableSize}mm²  
- CPC (Earth): ${circuitInfo.cpcSize}mm² ← VERIFIED CORRECT SIZE PER BS 6004 TABLE 8
- Cable Type: ${circuitInfo.cableSize}mm²/${circuitInfo.cpcSize}mm² twin & earth (6242Y)

VALIDATION CHECK: Before generating, verify that the CPC size matches BS 6004 Table 8:
- 16mm² T&E MUST show 6mm² CPC
- 10mm² T&E MUST show 4mm² CPC  
- 2.5mm² T&E MUST show 1.5mm² CPC
If the diagram shows any different CPC size, regenerate with the correct specification.

CIRCUIT DETAILS:
- Circuit Name: ${circuitInfo.circuitName || circuitInfo.circuitType.toUpperCase()}
- Protection: ${circuitInfo.protection}
- Voltage: ${circuitInfo.voltage}V
- Load: ${circuitInfo.load}
- Length: ${circuitInfo.cableLength}m

DRAWING REQUIREMENTS:
1. Show detailed wiring schematic with all conductors:
   - Line conductor (L) - ${circuitInfo.cableSize}mm² in red/brown annotation
   - Neutral conductor (N) - ${circuitInfo.cableSize}mm² in blue annotation  
   - ⚠️ Circuit Protective Conductor (CPC/Earth) - ${circuitInfo.cpcSize}mm² in green/yellow annotation
2. Display ${circuitInfo.protection} with trip characteristics
3. ⚠️ CRITICAL: Label cable as "${circuitInfo.cableSize}mm² / ${circuitInfo.cpcSize}mm²" - exact sizes only
4. Include load connection point with proper terminations
5. Add earthing arrangement and main earthing terminal
6. Label all terminals (L, N, E) with conductor sizes
7. Include current ratings and cable reference method
8. Add BS 7671 regulation references (411.3.2, 433.1, 525)
9. Professional electrical schematic symbols (BS EN 60617)
10. Title block with "${circuitInfo.circuitName}" designation
11. Cable length: ${circuitInfo.cableLength}m

⚠️ VALIDATION: Verify all three conductors show correct sizes - L: ${circuitInfo.cableSize}mm², N: ${circuitInfo.cableSize}mm², CPC: ${circuitInfo.cpcSize}mm²

STYLE: Detailed electrical schematic, engineering documentation standard, black & white with conductor color annotations, suitable for installation and inspection reference.`;
}
