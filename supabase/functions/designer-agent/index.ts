// DESIGNER AGENT - Chain-of-Thought Reasoning with o4-mini
// Phase 5: Deep reasoning and "show your working"
// Phase 1: Uses o4-mini reasoning model

import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
// BS 7671:2018+A2:2022 Complete Knowledge Base - Full Regulation Coverage
import { calculateVoltageDrop, getCableCapacity, VOLTAGE_DROP_70C_PVC_COPPER, TABLE_4D5_TWO_CORE_TE } from "../shared/bs7671CableTables.ts";
import { calculateOverallCorrectionFactor, getTemperatureFactor, getGroupingFactor, GROUPING_FACTORS_ENCLOSED } from "../shared/bs7671CorrectionFactors.ts";
import { getMaxZs, checkRCDRequirement, MAX_ZS_MCB_TYPE_B_04S, MAX_ZS_MCB_TYPE_C_04S, RCD_REQUIREMENTS } from "../shared/bs7671ProtectionData.ts";
import { getSpecialLocationRequirements, checkSafeZoneCompliance, SECTION_701_BATHROOMS, SECTION_722_EV_CHARGING, SAFE_ZONES_522_6 } from "../shared/bs7671SpecialLocations.ts";
import { searchBS7671, getRegulationsForCircuitType } from './bs7671Knowledge.ts';

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
    const openAIApiKey = Deno.env.get('OPENAI_API_KEY');

    if (!openAIApiKey) {
      throw new Error('OpenAI API key not configured');
    }

    console.log('🎨 Designer Agent v2.0: Processing with chain-of-thought reasoning');

    // Phase 1: Extract circuit parameters for calculations
    const userMessage = messages[messages.length - 1]?.content || '';
    const circuitParams = extractCircuitParams(userMessage, currentDesign);

    // Phase 1: Run REAL BS 7671 calculations using comprehensive tables
    let calculationResults: any = null;
    if (circuitParams.hasEnoughData) {
      console.log('🔧 Running BS 7671 calculations with FULL TABLES:', circuitParams);
      
      // Get cable data from Table 4D5 (T&E cables)
      const cableData = getCableCapacity(circuitParams.cableSize, 'C', 2);
      
      // Calculate correction factors (Ca × Cg)
      const correctionFactors = calculateOverallCorrectionFactor({
        ambientTemp: circuitParams.ambientTemp,
        numberOfCircuits: circuitParams.groupingCircuits,
        insulationType: '70°C PVC',
        location: 'air',
        arrangementCategory: 'clipped-direct-touching',
        thermalInsulation: 'none'
      });
      
      // Calculate derated capacity: Iz = It × Ca × Cg
      const IzTabulated = cableData?.currentRating || 0;
      const Iz = IzTabulated * correctionFactors.overallFactor;
      const Ib = circuitParams.designCurrent;
      const In = circuitParams.deviceRating;
      
      // Check compliance: Ib ≤ In ≤ Iz (Reg 433.1)
      const IbLeIn = Ib <= In;
      const InLeIz = In <= Iz;
      const safetyMargin = ((Iz - In) / In) * 100;
      
      const cableCalc = {
        Ib, In, Iz: Math.round(Iz * 10) / 10, IzTabulated,
        factors: correctionFactors,
        compliance: {
          IbLeIn, InLeIz,
          overallCompliant: IbLeIn && InLeIz,
          safetyMargin: Math.round(safetyMargin * 10) / 10
        },
        equation: `Iz = It × Ca × Cg = ${IzTabulated}A × ${correctionFactors.temperatureFactor} × ${correctionFactors.groupingFactor} = ${Math.round(Iz * 10) / 10}A`,
        tableReference: 'Table 4D5'
      };

      // Voltage drop using REAL mV/A/m values from Table 4D1B/4D5
      const voltDropCalc = calculateVoltageDrop(
        circuitParams.cableSize,
        circuitParams.designCurrent,
        circuitParams.cableLength,
        circuitParams.voltage
      );

      // Max Zs from Table 41.3
      const zsCalc = getMaxZs(circuitParams.deviceType, circuitParams.deviceRating, 0.4);

      // RCD requirements check
      const rcdRequirements = checkRCDRequirement(circuitParams.circuitType, circuitParams.location);

      calculationResults = { 
        cableCapacity: cableCalc, 
        voltageDrop: voltDropCalc, 
        maxZs: zsCalc,
        rcdRequirements
      };
    }

    // Phase 2: Load relevant BS 7671 regulations
    const relevantRegs = circuitParams.circuitType 
      ? getRegulationsForCircuitType(circuitParams.circuitType)
      : searchBS7671('overload protection voltage drop');

    // Enhanced system prompt with FULL BS 7671:2018+A2:2022 knowledge
    const systemPrompt = `You're a senior spark with full access to BS 7671:2018+A2:2022. CRITICAL: Always SHOW YOUR WORKING like you're explaining to an apprentice.

${calculationResults ? `
I'VE RUN THE REAL BS 7671 CALCULATIONS USING THE ACTUAL TABLES:

**Cable Capacity (${calculationResults.cableCapacity.tableReference}, Reg 433.1):**
${calculationResults.cableCapacity.equation}
- Ib (design current) = ${calculationResults.cableCapacity.Ib}A
- In (device rating) = ${calculationResults.cableCapacity.In}A
- It (tabulated capacity) = ${calculationResults.cableCapacity.IzTabulated}A (from ${calculationResults.cableCapacity.tableReference})
- Iz (derated capacity) = ${calculationResults.cableCapacity.Iz}A
- Ca (temperature factor) = ${calculationResults.cableCapacity.factors.temperatureFactor} (${calculationResults.cableCapacity.factors.regulations[0]})
- Cg (grouping factor) = ${calculationResults.cableCapacity.factors.groupingFactor} (${calculationResults.cableCapacity.factors.regulations[1]})
- Safety margin: ${calculationResults.cableCapacity.compliance.safetyMargin}%
- Compliance: Ib≤In? ${calculationResults.cableCapacity.compliance.IbLeIn ? '✓' : '✗'}, In≤Iz? ${calculationResults.cableCapacity.compliance.InLeIz ? '✓' : '✗'}
${calculationResults.cableCapacity.compliance.overallCompliant ? '✅ COMPLIANT' : '⚠️ NON-COMPLIANT'}

**Voltage Drop (Table 4D1B/4D5, Reg 525):**
- mV/A/m for ${circuitParams.cableSize}mm² = ${calculationResults.voltageDrop.mvPerAPerM} (from Table 4D5)
- VD = ${calculationResults.voltageDrop.mvPerAPerM} × ${circuitParams.designCurrent}A × ${circuitParams.cableLength}m ÷ 1000
- Result: ${calculationResults.voltageDrop.voltageDropVolts}V (${calculationResults.voltageDrop.voltageDropPercent}%)
- Limit: ${calculationResults.voltageDrop.limit}% (Reg 525: 3% lighting, 5% other)
${calculationResults.voltageDrop.compliant ? '✅ COMPLIANT' : '⚠️ EXCEEDS LIMIT'}

**Max Zs (Table 41.3, Reg 411.3.2):**
- Max Zs for ${circuitParams.deviceRating}A Type ${circuitParams.deviceType} MCB = ${calculationResults.maxZs?.maxZs}Ω
- Disconnection time: 0.4s (final circuits ≤32A)
- Must verify on-site with loop impedance tester

${calculationResults.rcdRequirements?.length > 0 ? `
**RCD Requirements:**
${calculationResults.rcdRequirements.map((rcd: any) => `- ${rcd.regulation}: ${rcd.reason} (${rcd.rcdRating}mA Type ${rcd.rcdType} ${rcd.mandatory ? 'MANDATORY' : 'recommended'})`).join('\n')}
` : ''}

USE THESE EXACT VALUES. Don't recalculate - explain what they mean and cite the table references.
` : ''}

**Relevant BS 7671 Regulations:**
${relevantRegs.map(reg => `Reg ${reg.number} (${reg.section}): ${reg.content}`).join('\n')}

When calculating anything:
"Right, let me work through this 9.5kW shower circuit properly mate...

**Load Current Calculation:**
Power = 9500W, voltage = 230V single phase
Load current = 9500W ÷ 230V ÷ 0.95 (power factor) = 43.5A

So we need a protective device ≥ 43.5A
Nearest standard rating: 45A Type B MCB (BS EN 60898) ✓

**Cable Sizing:**
45A MCB protection, assuming clipped direct installation (Method C)
From BS 7671 Table 4D5:
- 6mm² twin & earth = 46A capacity (too close to 45A limit)
- 10mm² twin & earth = 57A capacity ✓

Going with 10mm² for safety margin. Reg 433.1.204 says cable current-carrying capacity must be ≥ protective device rating.

**Voltage Drop Check:**
Cable run length: 12m (let's assume worst case)
From Table 4D5, mV/A/m for 10mm² = 4.4
Voltage drop = 4.4 × 43.5A × 12m ÷ 1000 = 2.3V
As percentage: 2.3V ÷ 230V × 100 = 1.0%
Well within 3% limit per Reg 525 ✓

**Earth Fault Loop:**
Max Zs for 45A Type B = 1.02Ω (Table 41.3)
Need to verify on site with loop tester during commissioning.

**Final Spec:**
- Cable: 10mm² twin & earth (6242Y)
- Protection: 45A Type B MCB
- Expected cable run: <12m to stay within volt drop
- RCD protection: Yes (30mA if socket could be used for portable equipment)

Regulations covered: Reg 433.1 (overload), Reg 525 (volt drop), Reg 411.3.2 (fault protection)"

Rules:
- NO markdown (**, ##, bullets)
- Write in paragraphs with natural flow
- Use emojis sparingly (✓ for checks, 🎨 for design points)
- Cite regulation numbers naturally in sentences
- Explain the WHY, not just the WHAT
- Sound like you're chatting over a brew on site
- Always show your calculations step-by-step`;

    // Use o4-mini for complex reasoning
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${openAIApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-5-mini-2025-08-07', // Faster GPT-5-mini for responsive design calcs
        messages: [
          { role: 'system', content: systemPrompt },
          ...messages,
          ...(context?.structuredKnowledge ? [{
            role: 'system',
            content: context.structuredKnowledge
          }] : [])
        ],
        max_completion_tokens: 2000,
        // Note: GPT-5 models don't support temperature parameter
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('OpenAI API error:', errorText);
      throw new Error(`OpenAI API error: ${response.status}`);
    }

    const data = await response.json();
    const assistantMessage = data.choices[0]?.message;
    const responseContent = assistantMessage.content || 'Design analysis complete.';

    // Extract any regulation citations from the response
    const citations = extractCitations(responseContent);

    console.log('✅ Designer response generated with chain-of-thought reasoning');

    return new Response(JSON.stringify({
      response: responseContent,
      citations,
      confidence: 0.85,
      model: 'gpt-5-mini-2025-08-07',
      timestamp: new Date().toISOString()
    }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });

  } catch (error) {
    console.error('❌ Error in designer-agent:', error);
    return new Response(JSON.stringify({ 
      error: error instanceof Error ? error.message : 'Designer agent failed',
      response: 'Unable to process design request. Please provide circuit details (load, cable length, installation method).',
      confidence: 0.3
    }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});

function extractCircuitParams(userMessage: string, currentDesign: any): any {
  // Extract parameters from user message and design context
  const loadMatch = userMessage.match(/(\d+\.?\d*)\s*(kW|W)/i);
  const voltageMatch = userMessage.match(/(\d+)\s*V/i);
  const lengthMatch = userMessage.match(/(\d+)\s*m(?:etre)?s?/i);
  const phaseMatch = userMessage.match(/(single|three|1|3)[\s-]?phase/i);

  const power = loadMatch ? (loadMatch[2].toLowerCase() === 'kw' ? parseFloat(loadMatch[1]) * 1000 : parseFloat(loadMatch[1])) : 0;
  const voltage = voltageMatch ? parseInt(voltageMatch[1]) : (currentDesign?.voltage || 230);
  const phases = phaseMatch ? (phaseMatch[1] === '3' || phaseMatch[1].toLowerCase() === 'three' ? 'three' : 'single') : 'single';
  
  const designCurrent = power > 0 ? power / voltage / (phases === 'three' ? Math.sqrt(3) : 1) / 0.95 : 0;
  
  // Determine device rating (next standard size up)
  const standardRatings = [6, 10, 16, 20, 25, 32, 40, 45, 50, 63, 80, 100, 125];
  const deviceRating = standardRatings.find(r => r >= designCurrent) || 32;
  
  // Determine cable size (starting guess)
  const cableSize = deviceRating <= 16 ? 2.5 :
                   deviceRating <= 25 ? 4 :
                   deviceRating <= 32 ? 6 :
                   deviceRating <= 45 ? 10 :
                   deviceRating <= 63 ? 16 : 25;

  // Determine circuit type and location
  let circuitType = 'socket';
  let location = '';
  const msgLower = userMessage.toLowerCase();
  
  if (msgLower.includes('shower')) circuitType = 'shower';
  else if (msgLower.includes('cooker')) circuitType = 'cooker';
  else if (msgLower.includes('light')) circuitType = 'lighting';
  
  // CRITICAL: EV charger detection
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
    deviceType: 'B', // Assume Type B unless specified
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
  
  // Extract regulation references
  const regMatches = response.matchAll(/Reg(?:ulation)?\s*(\d{3}(?:\.\d+)?(?:\.\d+)?)/gi);
  for (const match of regMatches) {
    citations.push({
      number: `Reg ${match[1]}`,
      title: `BS 7671 Regulation ${match[1]}`
    });
  }

  // Extract table references
  const tableMatches = response.matchAll(/Table\s*(\w+)/gi);
  for (const match of tableMatches) {
    citations.push({
      number: `Table ${match[1]}`,
      title: `BS 7671 Table ${match[1]}`
    });
  }

  // Deduplicate
  return Array.from(new Map(citations.map(c => [c.number, c])).values());
}
