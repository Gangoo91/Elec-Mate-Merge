// DESIGNER AGENT - RAG-enabled with Lovable AI Gateway
import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.39.3';
import { calculateVoltageDrop, getCableCapacity, TABLE_4D5_TWO_CORE_TE } from "../shared/bs7671CableTables.ts";
import { calculateOverallCorrectionFactor } from "../shared/bs7671CorrectionFactors.ts";
import { getMaxZs, checkRCDRequirement } from "../shared/bs7671ProtectionData.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { messages, currentDesign, context } = await req.json();
    const lovableApiKey = Deno.env.get('LOVABLE_API_KEY');
    if (!lovableApiKey) throw new Error('LOVABLE_API_KEY not configured');

    console.log('🎨 Designer Agent: Processing with RAG + Lovable AI');

    const userMessage = messages[messages.length - 1]?.content || '';
    const circuitParams = extractCircuitParams(userMessage, currentDesign);

    // Run enhanced BS 7671 calculations
    let calculationResults: any = null;
    if (circuitParams.hasEnoughData) {
      console.log('🔧 Running enhanced BS 7671 calculations:', circuitParams);
      
      const cableData = getCableCapacity(circuitParams.cableSize, 'C', 2);
      const correctionFactors = calculateOverallCorrectionFactor({
        ambientTemp: circuitParams.ambientTemp,
        numberOfCircuits: circuitParams.groupingCircuits,
        insulationType: '70°C PVC',
        location: 'air',
        arrangementCategory: 'clipped-direct-touching',
        thermalInsulation: 'none'
      });
      
      const IzTabulated = cableData?.currentRating || 0;
      const Iz = IzTabulated * correctionFactors.overallFactor;
      const Ib = circuitParams.designCurrent;
      const In = circuitParams.deviceRating;
      
      const cableCalc = {
        Ib, In, Iz: Math.round(Iz * 10) / 10, IzTabulated,
        factors: correctionFactors,
        compliance: {
          IbLeIn: Ib <= In,
          InLeIz: In <= Iz,
          overallCompliant: Ib <= In && In <= Iz,
          safetyMargin: Math.round(((Iz - In) / In) * 1000) / 10
        },
        equation: `Iz = It × Ca × Cg = ${IzTabulated}A × ${correctionFactors.temperatureFactor} × ${correctionFactors.groupingFactor} = ${Math.round(Iz * 10) / 10}A`,
        tableReference: 'Table 4D5'
      };

      const voltDropCalc = calculateVoltageDrop(
        circuitParams.cableSize,
        circuitParams.designCurrent,
        circuitParams.cableLength,
        circuitParams.voltage
      );

      const zsCalc = getMaxZs(circuitParams.deviceType, circuitParams.deviceRating, 0.4);
      const rcdRequirements = checkRCDRequirement(circuitParams.circuitType, circuitParams.location);

      // Calculate prospective short-circuit current (PSCC)
      const r1r2PerMeter = circuitParams.cableSize === 2.5 ? 7.41 : circuitParams.cableSize === 4 ? 4.61 : 3.08;
      const zs = 0.35 + (r1r2PerMeter * circuitParams.cableLength / 1000);
      const pscc = Math.round((0.95 * circuitParams.voltage) / zs);

      // Motor circuit detection
      const isMotorCircuit = circuitParams.circuitType?.toLowerCase().includes('motor');
      let motorData = null;
      if (isMotorCircuit) {
        const motorPower = circuitParams.power / 1000; // Convert to kW
        const startingCurrent = circuitParams.designCurrent * 6; // DOL starter ~6x FLC
        motorData = {
          power: motorPower,
          fullLoadCurrent: circuitParams.designCurrent,
          startingCurrent,
          startingMethod: 'DOL',
          requiredDevice: `${Math.ceil(circuitParams.designCurrent * 1.25)}A Motor Protection CB`
        };
      }

      calculationResults = { 
        cableCapacity: cableCalc, 
        voltageDrop: voltDropCalc, 
        maxZs: zsCalc, 
        rcdRequirements,
        zs,
        pscc,
        motorData
      };
    }

    // RAG: Query BS 7671 regulations AND design knowledge via Supabase RPC
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    const supabase = createClient(supabaseUrl, supabaseKey);
    
    const ragQuery = circuitParams.circuitType 
      ? `${circuitParams.circuitType} circuit design overload protection voltage drop cable sizing installation methods`
      : 'socket circuit design overload protection voltage drop cable sizing installation methods';
    
    console.log(`🔍 RAG: Searching BS 7671 + Design Knowledge for: ${ragQuery}`);
    
    // Generate embedding for RAG query using Lovable AI
    const embeddingResponse = await fetch('https://ai.gateway.lovable.dev/v1/embeddings', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${lovableApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'text-embedding-3-small',
        input: ragQuery,
      }),
    });

    let relevantRegsText = '';
    let designKnowledge = '';
    
    if (embeddingResponse.ok) {
      const embeddingData = await embeddingResponse.json();
      const embedding = embeddingData.data[0].embedding;
      
      // Search BS 7671 regulations using vector similarity
      const { data: regulations, error: ragError } = await supabase.rpc('search_bs7671', {
        query_embedding: embedding,
        match_threshold: 0.7,
        match_count: 10
      });

      if (!ragError && regulations && regulations.length > 0) {
        relevantRegsText = regulations.map((r: any) => 
          `Reg ${r.regulation_number} (${r.section}): ${r.content}`
        ).join('\n\n');
        console.log(`✅ Found ${regulations.length} relevant regulations`);
      }
      
      // Search design knowledge database
      const { data: designDocs, error: designError } = await supabase.rpc('search_design_knowledge', {
        query_embedding: embedding,
        match_threshold: 0.7,
        match_count: 5
      });

      if (!designError && designDocs && designDocs.length > 0) {
        designKnowledge = designDocs.map((d: any) => 
          `${d.topic} (${d.source}): ${d.content}`
        ).join('\n\n');
        console.log(`✅ Found ${designDocs.length} design knowledge documents`);
      }
    }

    // Build system prompt with better formatting
    const systemPrompt = `You are an electrical circuit designer with full BS 7671:2018+A3:2024 compliance knowledge.

FORMAT YOUR RESPONSE EXACTLY AS SHOWN BELOW:

CIRCUIT SPECIFICATION

Load: ${circuitParams.power}W (${circuitParams.power/1000}kW)
Distance from board: ${circuitParams.cableLength}m
Installation method: ${circuitParams.installationMethod}
Supply: ${circuitParams.voltage}V ${circuitParams.phases}-phase
Circuit type: ${circuitParams.circuitType}

CALCULATIONS

Design current (Ib): ${calculationResults?.cableCapacity?.Ib || 'TBC'}A
Protection device: ${calculationResults?.cableCapacity?.In || circuitParams.deviceRating}A MCB Type ${circuitParams.deviceType}
Cable specification: ${circuitParams.cableSize}mm² twin & earth (6242Y)
Tabulated capacity (It): ${calculationResults?.cableCapacity?.IzTabulated || 'TBC'}A (${calculationResults?.cableCapacity?.tableReference || 'Table 4D5'})
Correction factors: Ca=${calculationResults?.cableCapacity?.factors?.temperatureFactor || '1.0'}, Cg=${calculationResults?.cableCapacity?.factors?.groupingFactor || '1.0'}
Derated capacity (Iz): ${calculationResults?.cableCapacity?.Iz || 'TBC'}A
${calculationResults?.cableCapacity?.equation || ''}
Safety margin: ${calculationResults?.cableCapacity?.compliance?.safetyMargin || 'TBC'}% ${calculationResults?.cableCapacity?.compliance?.overallCompliant ? 'COMPLIANT ✓' : 'REVIEW REQUIRED'}

Voltage drop: ${calculationResults?.voltageDrop?.voltageDropVolts || 'TBC'}V (${calculationResults?.voltageDrop?.voltageDropPercent || 'TBC'}%) ${calculationResults?.voltageDrop?.compliant ? 'COMPLIANT ✓' : 'EXCEEDS LIMIT'}
Maximum Zs: ${calculationResults?.maxZs?.maxZs || 'TBC'}Ω (Table 41.3)
Calculated Zs: ${calculationResults?.zs ? calculationResults.zs.toFixed(2) : 'TBC'}Ω
Prospective fault current: ${calculationResults?.pscc || 'TBC'}A

COMPLIANCE

Regulation 433.1 - Overload protection: ${calculationResults?.cableCapacity?.compliance?.overallCompliant ? 'Ib ≤ In ≤ Iz satisfied. Cable rated correctly for protective device.' : 'Review required - verify cable capacity against protective device'}
Regulation 525 - Voltage drop: ${calculationResults?.voltageDrop?.compliant ? 'Within permitted limits (3% lighting, 5% other uses)' : 'Exceeds BS 7671 voltage drop limits - consider larger cable'}
${calculationResults?.rcdRequirements?.required ? `Regulation 411.3.3 - RCD protection required: ${calculationResults.rcdRequirements.reason}` : 'Regulation 411.3.3 - Standard protection adequate'}
Table 41.3 - Earth fault protection: Zs (${calculationResults?.zs ? calculationResults.zs.toFixed(2) : 'TBC'}Ω) must not exceed ${calculationResults?.maxZs?.maxZs || 'TBC'}Ω for ${calculationResults?.cableCapacity?.In || circuitParams.deviceRating}A Type ${circuitParams.deviceType} MCB

    ${relevantRegsText ? `
RELEVANT REGULATIONS (from BS 7671 database):
${relevantRegsText}
` : ''}

${designKnowledge ? `
DESIGN GUIDANCE (from technical library):
${designKnowledge}
` : ''}

Use professional language with UK English spelling. Present calculations clearly. Cite regulation numbers and technical guidance. No conversational filler or markdown formatting.`;

    // Call Lovable AI Gateway with tool-calling for RAG
    const response = await fetch('https://ai.gateway.lovable.dev/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${lovableApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'google/gemini-2.5-flash',
        messages: [
          { role: 'system', content: systemPrompt },
          ...messages,
          ...(context?.structuredKnowledge ? [{
            role: 'system',
            content: context.structuredKnowledge
          }] : [])
        ],
        max_completion_tokens: 4000, // INCREASED for multi-circuit designs
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('Lovable AI error:', response.status, errorText);
      throw new Error(`AI gateway error: ${response.status}`);
    }

    const data = await response.json();
    const responseContent = data.choices[0]?.message?.content || 'Design analysis complete.';

    const citations = extractCitations(responseContent);

    console.log('✅ Designer response generated');

    // UPGRADE: Extract ALL structured data for next agents
    const structuredData: any = {};
    const reasoning: string[] = [];
    
    if (calculationResults?.cableCapacity) {
      // Add circuit metadata for PDF generation
      structuredData.circuit = {
        name: formatCircuitName(circuitParams.circuitType),
        circuitType: circuitParams.circuitType,
        loadType: formatLoadType(circuitParams.circuitType),
        power: circuitParams.power,
        totalLoadKW: (circuitParams.power / 1000).toFixed(2),
        cableLength: circuitParams.cableLength,
        voltage: circuitParams.voltage,
        phases: circuitParams.phases,
      };
      
      structuredData.cableSize = circuitParams.cableSize;
      structuredData.cableType = circuitParams.cableType;
      structuredData.protectionDevice = `${circuitParams.deviceRating}A ${circuitParams.deviceType}`;
      structuredData.designCurrent = circuitParams.designCurrent;
      structuredData.deviceRating = circuitParams.deviceRating;
      structuredData.deviceType = circuitParams.deviceType;
      structuredData.correctedCapacity = calculationResults.cableCapacity.Iz;
      structuredData.correctionFactors = {
        temperature: calculationResults.cableCapacity.factors.temperatureFactor,
        grouping: calculationResults.cableCapacity.factors.groupingFactor,
        overall: calculationResults.cableCapacity.factors.overallFactor
      };
      structuredData.voltageDrop = calculationResults.voltageDrop;
      structuredData.earthFault = calculationResults.maxZs;
      structuredData.installationMethod = circuitParams.installationMethod;
      structuredData.zs = calculationResults.zs;
      structuredData.pscc = calculationResults.pscc;
      
      if (calculationResults.motorData) {
        structuredData.motorData = calculationResults.motorData;
      }
      
      // EIC-ready test values
      structuredData.eicTestData = {
        r1r2Expected: `${(calculationResults.zs - 0.35).toFixed(3)}Ω`,
        zsExpected: `${calculationResults.zs.toFixed(2)}Ω`,
        maxZs: `${calculationResults.maxZs.maxZs}Ω`,
        insulationTest: '≥1.0 MΩ at 500V DC',
        polarity: 'Correct (verify on-site)',
        rcdTest: calculationResults.rcdRequirements?.required ? '30mA RCD required' : 'N/A'
      };
      
      // NEW: Add structured circuits array for drawing components
      structuredData.circuits = [{
        circuitNumber: 1,
        name: formatCircuitName(circuitParams.circuitType),
        voltage: circuitParams.voltage,
        cableSize: circuitParams.cableSize,
        cpcSize: circuitParams.cableSize >= 2.5 ? 1.5 : 1.0,
        cableLength: circuitParams.cableLength,
        loadType: detectLoadTypeFromCircuitType(circuitParams.circuitType),
        loadPower: circuitParams.power,
        protectionDevice: {
          type: 'MCB',
          rating: circuitParams.deviceRating,
          curve: circuitParams.deviceType,
          kaRating: 6
        },
        rcdProtected: calculationResults.rcdRequirements?.required || false,
        rcdRating: 30,
        ze: 0.35,
        calculationResults: {
          zs: calculationResults.zs,
          maxZs: calculationResults.maxZs.maxZs,
          installationMethod: circuitParams.installationMethod,
          deratedCapacity: calculationResults.cableCapacity.Iz,
          safetyMargin: calculationResults.cableCapacity.compliance.safetyMargin
        }
      }];
      
      reasoning.push(`Selected ${circuitParams.cableSize}mm² cable: Iz (${Math.round(calculationResults.cableCapacity.Iz * 10) / 10}A) > In (${circuitParams.deviceRating}A)`);
      reasoning.push(`Correction factors: Ca=${calculationResults.cableCapacity.factors.temperatureFactor}, Cg=${calculationResults.cableCapacity.factors.groupingFactor}`);
      reasoning.push(`Zs = ${calculationResults.zs.toFixed(2)}Ω (max ${calculationResults.maxZs.maxZs}Ω) - PSCC = ${calculationResults.pscc}A`);
      
      if (calculationResults.voltageDrop?.compliant) {
        reasoning.push(`Voltage drop ${calculationResults.voltageDrop.percentage}% complies with 3% BS 7671 limit`);
      }
      
      if (calculationResults.motorData) {
        reasoning.push(`Motor circuit: FLC=${calculationResults.motorData.fullLoadCurrent}A, Starting=${calculationResults.motorData.startingCurrent}A (${calculationResults.motorData.startingMethod})`);
      }
    }

    return new Response(JSON.stringify({
      response: responseContent,
      structuredData,
      reasoning,
      calculationResults,
      citations,
      confidence: 0.95,
      model: 'google/gemini-2.5-flash',
      timestamp: new Date().toISOString()
    }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });

  } catch (error) {
    console.error('❌ Designer agent error:', error);
    return new Response(JSON.stringify({ 
      error: error instanceof Error ? error.message : 'Designer agent failed',
      response: 'Unable to process design request.',
      confidence: 0.3
    }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});

function extractCircuitParams(userMessage: string, currentDesign: any): any {
  const loadMatch = userMessage.match(/(\d+\.?\d*)\s*(kW|W)/i);
  const voltageMatch = userMessage.match(/(\d+)\s*V/i);
  const lengthMatch = userMessage.match(/(\d+)\s*m(?:etre)?s?/i);
  const phaseMatch = userMessage.match(/(single|three|1|3)[\s-]?phase/i);

  const power = loadMatch ? (loadMatch[2].toLowerCase() === 'kw' ? parseFloat(loadMatch[1]) * 1000 : parseFloat(loadMatch[1])) : 0;
  const voltage = voltageMatch ? parseInt(voltageMatch[1]) : (currentDesign?.voltage || 230);
  const phases = phaseMatch ? (phaseMatch[1] === '3' || phaseMatch[1].toLowerCase() === 'three' ? 'three' : 'single') : 'single';
  
  const designCurrent = power > 0 ? power / voltage / (phases === 'three' ? Math.sqrt(3) : 1) / 0.95 : 0;
  
  const standardRatings = [6, 10, 16, 20, 25, 32, 40, 45, 50, 63, 80, 100, 125];
  const deviceRating = standardRatings.find(r => r >= designCurrent) || 32;
  
  const cableSize = deviceRating <= 16 ? 2.5 :
                   deviceRating <= 25 ? 4 :
                   deviceRating <= 32 ? 6 :
                   deviceRating <= 45 ? 10 :
                   deviceRating <= 63 ? 16 : 25;

  let circuitType = 'socket';
  let location = '';
  const msgLower = userMessage.toLowerCase();
  
  if (msgLower.includes('shower')) circuitType = 'shower';
  else if (msgLower.includes('cooker')) circuitType = 'cooker';
  else if (msgLower.includes('light')) circuitType = 'lighting';
  
  if (msgLower.includes('ev') || msgLower.includes('charger') || msgLower.includes('charging point')) {
    circuitType = 'ev-charger';
    location = 'ev-charging';
  }
  
  if (msgLower.includes('bath')) {
    circuitType = 'bathroom';
    location = 'bathroom';
  }
  if (msgLower.includes('outdoor') || msgLower.includes('outside') || msgLower.includes('garage')) {
    location = location || 'outdoor';
  }

  return {
    hasEnoughData: power > 0 && designCurrent > 0,
    power,
    voltage,
    phases,
    designCurrent: Math.round(designCurrent * 10) / 10,
    deviceRating,
    deviceType: 'B',
    cableSize,
    cableLength: lengthMatch ? parseInt(lengthMatch[1]) : (currentDesign?.cableLength || 15),
    ambientTemp: currentDesign?.environmentalProfile?.finalApplied?.ambientTemp || 25,
    groupingCircuits: currentDesign?.environmentalProfile?.finalApplied?.grouping || 1,
    installationMethod: currentDesign?.installationMethod || 'clipped-direct',
    cableType: '6242Y',
    circuitType,
    location
  };
}

function extractCitations(response: string): any[] {
  const citations: any[] = [];
  
  const regMatches = response.matchAll(/Reg(?:ulation)?\s*(\d{3}(?:\.\d+)?(?:\.\d+)?)/gi);
  for (const match of regMatches) {
    citations.push({
      number: `Reg ${match[1]}`,
      title: `BS 7671 Regulation ${match[1]}`
    });
  }

  const tableMatches = response.matchAll(/Table\s*(\w+)/gi);
  for (const match of tableMatches) {
    citations.push({
      number: `Table ${match[1]}`,
      title: `BS 7671 Table ${match[1]}`
    });
  }

  return Array.from(new Map(citations.map(c => [c.number, c])).values());
}

// Helper functions for circuit formatting
function formatCircuitName(circuitType: string): string {
  const names: Record<string, string> = {
    'shower': 'Electric Shower Circuit',
    'cooker': 'Cooker Circuit',
    'socket': 'Socket Outlet Circuit',
    'lighting': 'Lighting Circuit',
    'ev-charger': 'EV Charging Point',
    'bathroom': 'Bathroom Circuit',
  };
  return names[circuitType] || `${circuitType.charAt(0).toUpperCase()}${circuitType.slice(1)} Circuit`;
}

function formatLoadType(circuitType: string): string {
  const types: Record<string, string> = {
    'shower': 'Fixed Appliance',
    'cooker': 'Fixed Appliance',
    'socket': 'Socket Outlets',
    'lighting': 'Lighting',
    'ev-charger': 'EV Charging',
    'bathroom': 'Bathroom Installation',
  };
  return types[circuitType] || 'General Load';
}

function detectLoadTypeFromCircuitType(circuitType: string): string {
  if (!circuitType) return 'socket';
  if (/socket/i.test(circuitType)) return 'socket';
  if (/lighting|light/i.test(circuitType)) return 'lighting';
  if (/cooker|oven/i.test(circuitType)) return 'cooker';
  if (/shower/i.test(circuitType)) return 'shower';
  if (/ev|charger/i.test(circuitType)) return 'ev-charger';
  if (/heat pump/i.test(circuitType)) return 'heat-pump';
  if (/motor/i.test(circuitType)) return 'motor';
  if (/outdoor|outside|external/i.test(circuitType)) return 'outdoor-lighting';
  return 'socket';
}
