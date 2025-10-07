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

    // Run BS 7671 calculations
    let calculationResults: any = null;
    if (circuitParams.hasEnoughData) {
      console.log('🔧 Running BS 7671 calculations:', circuitParams);
      
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

      calculationResults = { cableCapacity: cableCalc, voltageDrop: voltDropCalc, maxZs: zsCalc, rcdRequirements };
    }

    // RAG: Query BS 7671 regulations via Supabase RPC
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    const supabase = createClient(supabaseUrl, supabaseKey);
    
    const ragQuery = circuitParams.circuitType 
      ? `${circuitParams.circuitType} circuit design overload protection voltage drop cable sizing`
      : 'socket circuit design overload protection voltage drop cable sizing';
    
    console.log(`🔍 RAG: Searching BS 7671 regulations for: ${ragQuery}`);
    
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
      } else {
        console.log('⚠️ No relevant regulations found');
      }
    }

    // Build system prompt
    const systemPrompt = `You're a senior spark with full access to BS 7671:2018+A2:2022. CRITICAL: Always SHOW YOUR WORKING like you're explaining to an apprentice.

${calculationResults ? `
I'VE RUN THE REAL BS 7671 CALCULATIONS:

**Cable Capacity (${calculationResults.cableCapacity.tableReference}, Reg 433.1):**
${calculationResults.cableCapacity.equation}
- Ib (design current) = ${calculationResults.cableCapacity.Ib}A
- In (device rating) = ${calculationResults.cableCapacity.In}A
- It (tabulated) = ${calculationResults.cableCapacity.IzTabulated}A
- Iz (derated) = ${calculationResults.cableCapacity.Iz}A
- Ca = ${calculationResults.cableCapacity.factors.temperatureFactor}, Cg = ${calculationResults.cableCapacity.factors.groupingFactor}
- Safety margin: ${calculationResults.cableCapacity.compliance.safetyMargin}%
${calculationResults.cableCapacity.compliance.overallCompliant ? '✅ COMPLIANT' : '⚠️ NON-COMPLIANT'}

**Voltage Drop (Reg 525):**
- VD = ${calculationResults.voltageDrop.voltageDropVolts}V (${calculationResults.voltageDrop.voltageDropPercent}%)
${calculationResults.voltageDrop.compliant ? '✅ COMPLIANT' : '⚠️ EXCEEDS LIMIT'}

**Max Zs (Table 41.3):**
- Max Zs for ${circuitParams.deviceRating}A Type ${circuitParams.deviceType} = ${calculationResults.maxZs?.maxZs}Ω

USE THESE EXACT VALUES. Explain what they mean and cite table references.
` : ''}

**Relevant BS 7671 Regulations (RAG):**
${relevantRegsText || 'No specific regulations retrieved - use general BS 7671 principles'}

STYLE:
- Talk conversationally like you're chatting on site
- NO markdown (**, ##, bullets) - natural paragraphs only
- Show all calculations step-by-step
- Cite regulation numbers naturally
- Use emojis sparingly (✓ for checks)`;

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
        max_tokens: 2000,
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

    return new Response(JSON.stringify({
      response: responseContent,
      citations,
      confidence: 0.85,
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
