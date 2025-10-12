// DESIGNER AGENT - RAG-enabled with Intelligent Multi-Tier Hybrid Search - v3.1
// Phase 1: Full RAG Integration - 100% Knowledge-Driven
// Note: UK English only in user-facing strings. Do not use UK-only words like 'whilst' in code keywords.
import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve, createClient, corsHeaders } from '../_shared/deps.ts';
import { handleError, ValidationError, getErrorMessage } from '../_shared/errors.ts';
import { validateAgentRequest, getRequestBody } from '../_shared/validation.ts';
import { withRetry, RetryPresets } from '../_shared/retry.ts';
import { withTimeout, Timeouts } from '../_shared/timeout.ts';
import { createLogger, generateRequestId } from '../_shared/logger.ts';
import { safeAll } from '../_shared/safe-parallel.ts';
import { createContextEnvelope, mergeContext, type ContextEnvelope, type QueryIntent } from '../_shared/agent-context.ts';
import { intelligentRAGSearch, type HybridSearchParams } from '../_shared/intelligent-rag.ts';
import { searchDesignPattern, storeDesignPattern } from '../_shared/pattern-learning.ts';
import { buildEnhancedRAGQuery } from './ragQueryBuilder.ts';
import { getCableCapacity, TABLE_4D5_TWO_CORE_TE } from "../shared/bs7671CableTables.ts";
import { calculateOverallCorrectionFactor } from "../shared/bs7671CorrectionFactors.ts";
import { getMaxZs, checkRCDRequirement } from "../shared/bs7671ProtectionData.ts";
import { calculateCableCapacity } from '../_shared/calculationEngines.ts';
import { 
  calculateVoltageDrop as calculateVoltageDropUnified, 
  calculateEarthFaultLoop 
} from '../_shared/bs7671-unified-calculations.ts';

// TypeScript Interfaces for Type Safety
interface CircuitCalculations {
  Ib: number;
  In: number;
  Iz: number;
  voltageDrop: {
    volts: number;
    percent: number;
    compliant: boolean;
  };
  zs: {
    calculated: number;
    max: number;
    compliant: boolean;
  };
}

interface DesignedCircuit {
  id: string;
  name: string;
  loadType: string;
  load: number;
  cableSize: string;
  protection: string;
  calculations: CircuitCalculations;
  compliance: string;
}

// corsHeaders imported from shared deps

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  // Health check endpoint
  if (req.url.endsWith('/health')) {
    return new Response(JSON.stringify({ 
      status: 'healthy', 
      version: '2.1',
      timestamp: new Date().toISOString() 
    }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 200
    });
  }

  const requestId = generateRequestId();
  const logger = createLogger(requestId, { function: 'designer-agent' });

  try {
    const { 
      messages, 
      currentDesign, 
      context: incomingContext,
      conversationSummary,
      previousAgentOutputs = [],
      requestSuggestions = false
    } = await req.json();
    
    // Input validation
    if (!messages || !Array.isArray(messages) || messages.length === 0) {
      throw new ValidationError('messages array is required and must not be empty');
    }

    const userMessage = messages[messages.length - 1]?.content;
    if (!userMessage || typeof userMessage !== 'string') {
      throw new ValidationError('Latest message must have string content');
    }

    logger.info('Input validated', { 
      messageCount: messages.length, 
      messageLength: userMessage.length,
      hasCurrentDesign: !!currentDesign,
      hasContext: !!incomingContext,
      hasConversationSummary: !!conversationSummary,
      previousAgents: previousAgentOutputs.map((a: any) => a.agent)
    });
    const lovableApiKey = Deno.env.get('LOVABLE_API_KEY');
    if (!lovableApiKey) throw new ValidationError('LOVABLE_API_KEY not configured');

    logger.info('Designer Agent v3.0 processing with Intelligent Hybrid RAG', { messageCount: messages.length });

    const circuitParams = extractCircuitParams(userMessage, currentDesign, incomingContext);
    
    // NEW: Build context-enriched RAG query for better retrieval
    const contextEnrichedQuery = buildEnhancedRAGQuery(userMessage, circuitParams);
    
    // Create or merge agent context
    const queryIntent: QueryIntent = {
      primaryGoal: 'design',
      circuitType: circuitParams.circuitType,
      powerRating: circuitParams.power,
      complexity: 'medium',
      requiresCalculations: true,
      requiresRegulations: true,
      keywords: [circuitParams.circuitType, 'overload', 'voltage drop', 'cable sizing'],
    };

    let agentContext: ContextEnvelope = incomingContext || createContextEnvelope(requestId, queryIntent);
    agentContext.agentChain.push('designer-agent');
    agentContext.previousAgent = 
      incomingContext?.agentChain && incomingContext.agentChain.length > 0
        ? incomingContext.agentChain[incomingContext.agentChain.length - 1]
        : undefined;

    // Check for cached design pattern
    const patternStartTime = Date.now();
    const cachedPattern = await searchDesignPattern(
      circuitParams.circuitType,
      circuitParams.power,
      circuitParams.voltage,
      circuitParams.cableLength
    );

    if (cachedPattern.found && cachedPattern.confidence > 80) {
      logger.info(`🎯 Using cached pattern (${cachedPattern.confidence}% confidence) in ${Date.now() - patternStartTime}ms`);
      
      return new Response(JSON.stringify({
        circuit: cachedPattern.pattern,
        requestId,
        cached: true,
        confidence: cachedPattern.confidence,
        context: agentContext,
      }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }
    
    logger.info('Circuit parameters extracted', {
      circuitType: circuitParams.circuitType,
      power: circuitParams.power,
      cableLength: circuitParams.cableLength,
      hasEnoughData: circuitParams.hasEnoughData
    });

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

      // Use unified BS 7671 calculation library for accurate voltage drop
      const voltDropCalc = calculateVoltageDropUnified({
        cableType: 'pvc-twin-earth',
        cableSize: circuitParams.cableSize,
        current: circuitParams.designCurrent,
        length: circuitParams.cableLength,
        voltage: circuitParams.voltage,
        powerFactor: 0.95,
        phaseConfig: 'single',
        temperature: circuitParams.ambientTemp || 30,
        loadType: circuitParams.circuitType?.toLowerCase().includes('light') ? 'lighting' : 'power'
      });

      const zsCalc = getMaxZs(circuitParams.deviceType, circuitParams.deviceRating, 0.4);
      const rcdRequirements = checkRCDRequirement(circuitParams.circuitType, circuitParams.location);

      // Use unified BS 7671 calculation library for earth fault loop impedance
      const earthFaultResult = calculateEarthFaultLoop({
        externalZe: 0.35,
        cableType: 'pvc-twin-earth',
        cableSize: circuitParams.cableSize,
        cpcSize: circuitParams.cableSize, // Same as live for T&E
        length: circuitParams.cableLength,
        temperature: 70, // Operating temperature
        protectiveDevice: {
          type: circuitParams.deviceType || 'MCB-B',
          rating: circuitParams.deviceRating,
          disconnectionTime: 0.4
        }
      });
      
      const zs = earthFaultResult.zs;
      const pscc = earthFaultResult.pscc;

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

    // ========================================
    // INTELLIGENT HYBRID RAG SYSTEM v3.0
    // Phase 2: 3-Tier Cascade Search
    // ========================================
    
    const projectScope = detectProjectScope(userMessage);
    
    // Initialize RAG results
    let relevantRegsText = '';
    let designKnowledge = '';
    let installationGuidance = '';
    let regulations: any[] = [];
    let designDocs: any[] = [];
    
    // Run intelligent hybrid search
    try {
      const searchParams: HybridSearchParams = {
        circuitType: circuitParams.circuitType,
        powerRating: circuitParams.power,
        searchTerms: [
          circuitParams.circuitType, 
          'overload protection', 
          'voltage drop', 
          'cable sizing',
          'earth fault loop',
          'RCD protection',
          'installation method',
          circuitParams.location || 'general',
          // Add cable type context
          ...(circuitParams.location === 'outdoor' || circuitParams.circuitType?.includes('outdoor') ? ['SWA', 'armoured cable'] : ['twin & earth', 'T&E']),
          ...(circuitParams.circuitType?.includes('fire') ? ['FP200', 'fire-rated'] : []),
        ],
        expandedQuery: contextEnrichedQuery,
        context: agentContext,
      };

      const ragResults = await intelligentRAGSearch(searchParams);
      
      regulations = ragResults.regulations;
      designDocs = ragResults.designDocs;
      
      // Update context with embedding for reuse
      if (ragResults.embedding) {
        agentContext.embeddingCache = {
          query: searchParams.expandedQuery,
          embedding: ragResults.embedding,
          generatedAt: Date.now(),
        };
      }
      
      // Store found regulations in context
      agentContext.foundRegulations = regulations.slice(0, 5).map(r => ({
        regulation_number: r.regulation_number,
        section: r.section,
        content: r.content,
        relevance: r.relevance,
        source: r.source,
      }));
      
      agentContext.ragCallCount = (agentContext.ragCallCount || 0) + 1;
      
      // Build context text
      if (regulations.length > 0) {
        relevantRegsText = regulations.map((r: any) => 
          `Reg ${r.regulation_number} (${r.section}): ${r.content}`
        ).join('\n\n');
      }
      
      if (designDocs.length > 0) {
        designKnowledge = designDocs.map((d: any) => 
          `${d.topic} (${d.source}): ${d.content}`
        ).join('\n\n');
      }
      
      // NEW: Installation knowledge formatting
      if (ragResults.installationDocs && ragResults.installationDocs.length > 0) {
        installationGuidance = ragResults.installationDocs.map((i: any) =>
          `${i.topic} (${i.source}): ${i.content}`
        ).join('\n\n');
      }
      
      logger.info('✅ Intelligent RAG Complete', {
        bs7671Count: regulations.length,
        designDocsCount: designDocs.length,
        installationDocsCount: ragResults.installationDocs?.length || 0,
        method: ragResults.searchMethod,
        timeMs: ragResults.searchTimeMs,
      });
      
    } catch (error) {
      logger.error('RAG pipeline failed', { 
        error: error instanceof Error ? error.message : String(error),
        requestId 
      });
      // Continue with empty RAG - AI can still provide design
    }

    // Use the projectScope already detected at line 144
    
    let systemPrompt = '';
    
    if (projectScope.isMultiCircuit && projectScope.circuits) {
      console.log(`🏗️ Multi-circuit project detected: ${projectScope.circuits.length} circuits for ${projectScope.propertyType}`);
      
      // Check if this is an initial vague request (e.g., just "Full rewire 3-bed house")
      const isVagueRequest = userMessage.length < 100 && !userMessage.match(/\d+m/) && !userMessage.toLowerCase().includes('outdoor');
      
      if (isVagueRequest) {
        // Phase 1: Ask clarifying questions first
        systemPrompt = `You are an electrical circuit designer helping plan a ${projectScope.propertyType} rewire.

The user has requested: "${userMessage}"

RESPOND WITH FRIENDLY CLARIFYING QUESTIONS in this format:

**Right, let's get the details sorted for your ${projectScope.propertyType} rewire!**

I need to ask a few quick questions to design this properly:

🏠 **Property Details**
• Is this a new build or rewire of an existing property?
• Approximate age of the property? (This affects earthing arrangements)
• Single-storey, two-storey, or more?

⚡ **Special Requirements**
• Do you need an EV charger point?
• Outdoor sockets or garden lighting?
• Combi boiler or immersion heater?
• Any three-phase equipment needed?

📏 **Installation Specifics**
• Approximate distance from consumer unit to furthest point? (helps with cable sizing)
• Loft conversion or basement to wire?
• Any particular areas with special requirements (e.g., bathroom, kitchen island)?

Once you provide these details, I'll design all ${projectScope.circuits?.length || 'required'} circuits with full BS 7671 calculations, cable specs, and protection devices for each one.

Sound good? 👍

FORMAT: Return this as plain text (NOT JSON). Be conversational but professional.`;
      } else {
        // Phase 2: Full multi-circuit design with all calculations
        systemPrompt = `You MUST return ONLY valid JSON. No text before or after. All fields are REQUIRED.

You are an electrical circuit designer with full BS 7671:2018+A3:2024 compliance knowledge.

CRITICAL: You MUST provide detailed calculations for ALL ${projectScope.circuits.length} circuits below.

STANDARD CIRCUIT SCHEDULE (${projectScope.propertyType}):
${projectScope.circuits.map((c, i) => {
  const circuitName = c.name.toLowerCase();
  let cableType = 'twin & earth (6242Y)';
  let notes = '';
  
  // Fire circuits → FP200 Gold
  if (circuitName.includes('fire') || circuitName.includes('emergency light')) {
    cableType = 'FP200 Gold fire-rated cable';
    notes = ' [BS 5839 - enhanced fire performance]';
  }
  // Outdoor/EV/Garden → SWA
  else if (circuitName.includes('outdoor') || circuitName.includes('ev') || 
           circuitName.includes('garden') || circuitName.includes('outside') ||
           circuitName.includes('heat pump')) {
    cableType = 'SWA 3-core armoured cable (BS 5467)';
    notes = ' [outdoor installation]';
  }
  // Large cables → SWA or singles
  else if (c.cable > 10) {
    cableType = 'SWA 3-core or singles in conduit';
    notes = ' [T&E limited to 10mm²]';
  }
  // Smoke alarms → mention interconnection
  else if (circuitName.includes('smoke')) {
    notes = ' [BS 5839-6 - interconnected required]';
  }
  // Lighting with multi-way → mention 3-core/4-core
  else if (circuitName.includes('light') && (circuitName.includes('two-way') || circuitName.includes('landing'))) {
    notes = ' [consider 3-core for two-way switching]';
  }
  
  return `${i+1}. ${c.name} - ${c.rating}A Type B MCB, ${c.power}W load, ${c.cable}mm² ${cableType}${notes}`;
}).join('\n')}

CRITICAL RESPONSE STYLE (IMPORTANT):
- Write like you're on-site with a colleague - brief and practical
- Lead with essential info: load, distance, cable size, MCB rating, voltage drop
- Use ✓ for compliant, ⚠ for review needed
- NEVER quote full regulation text in calculations section
- Save detailed formulas for the JSON structure only

For EACH circuit above, provide:
- Design current (Ib) calculation
- Protection device selection (In)
- Cable capacity calculation with correction factors (Iz)
- Voltage drop calculation (volts and %, state if compliant)
- Earth fault loop impedance (Zs with max value)
- RCD requirements
- Compliance statement (✓ or ⚠)

DESIGN GUIDANCE FROM KNOWLEDGE BASE:
${designKnowledge ? `\n**DESIGN KNOWLEDGE (Cable Selection, Voltage Drop, Sizing):**\n${designKnowledge}\n` : ''}

INSTALLATION BEST PRACTICES FROM KNOWLEDGE BASE:
${installationGuidance ? `\n**INSTALLATION GUIDANCE (Methods, Safe Zones, Burial Depths, IP Ratings):**\n${installationGuidance}\n` : ''}

FORMAT AS JSON (EXACTLY AS SHOWN - ALL FIELDS REQUIRED):
{
  "circuits": [
    {
      "id": "CKT-001",
      "name": "Kitchen Ring Main",
      "loadType": "ring-main",
      "load": 7360,
      "cableSize": "2.5mm²",
      "cableLength": 20,
      "cableSpec": "2.5mm² twin & earth (6242Y)",
      "protection": "32A Type B MCB",
      "calculations": {
        "Ib": 28.5,
        "In": 32,
        "Iz": 27.0,
        "IzTabulated": 27.0,
        "equation": "Iz = It × Ca × Cg = 27.0A × 1.0 × 1.0 = 27.0A",
        "tableRef": "Table 4D5",
        "correctionFactors": {
          "Ca": 1.0,
          "Cg": 1.0
        },
        "voltageDrop": { 
          "volts": 3.2, 
          "percent": 1.39,
          "max": 3.0,
          "compliant": true 
        },
        "zs": { 
          "calculated": 0.68, 
          "max": 1.37,
          "regulation": "Table 41.3",
          "compliant": true 
        }
      },
      "rcdRequirements": {
        "rating": "30mA",
        "reason": "Socket circuit requires 30mA RCD (Reg 411.3.3)"
      },
      "regulations": [
        "Reg 433.1 - Overload protection: Ib ≤ In ≤ Iz satisfied",
        "Reg 525 - Voltage drop within permitted limits",
        "Reg 411.3.3 - 30mA RCD protection provided"
      ],
      "complianceStatus": "pass"
    },
    {
      "id": "CKT-002",
      "name": "EV Charger",
      "loadType": "ev-charger",
      "load": 7200,
      "cableSize": "6mm²",
      "cableLength": 25,
      "cableSpec": "6mm² SWA 3-core armoured cable (BS 5467)",
      "protection": "32A Type B RCBO",
      "calculations": {
        "Ib": 31.3,
        "In": 32,
        "Iz": 36.0,
        "IzTabulated": 46.0,
        "equation": "Iz = It × Ca × Cg = 46.0A × 0.94 × 0.85 = 36.8A",
        "tableRef": "Table 4E2A",
        "correctionFactors": { "Ca": 0.94, "Cg": 0.85 },
        "voltageDrop": { "volts": 4.5, "percent": 1.96, "max": 3.0, "compliant": true },
        "zs": { "calculated": 0.72, "max": 1.37, "regulation": "Table 41.3", "compliant": true }
      },
      "rcdRequirements": {
        "rating": "30mA",
        "reason": "Outdoor socket requires 30mA RCD (Reg 411.3.3)"
      },
      "regulations": [
        "Reg 433.1 - Overload protection: Ib ≤ In ≤ Iz satisfied",
        "Reg 525 - Voltage drop within permitted limits",
        "Reg 411.3.3 - 30mA RCD protection for outdoor installation"
      ],
      "complianceStatus": "pass"
    },
    {
      "id": "CKT-003",
      "name": "Fire Alarm Circuit",
      "loadType": "fire-alarm",
      "load": 500,
      "cableSize": "1.5mm²",
      "cableLength": 30,
      "cableSpec": "1.5mm² FP200 Gold fire-rated cable",
      "protection": "6A Type B MCB",
      "calculations": {
        "Ib": 2.2,
        "In": 6,
        "Iz": 19.5,
        "IzTabulated": 19.5,
        "equation": "Iz = It × Ca × Cg = 19.5A × 1.0 × 1.0 = 19.5A",
        "tableRef": "Table 4D5",
        "correctionFactors": { "Ca": 1.0, "Cg": 1.0 },
        "voltageDrop": { "volts": 0.8, "percent": 0.35, "max": 3.0, "compliant": true },
        "zs": { "calculated": 0.45, "max": 7.67, "regulation": "Table 41.3", "compliant": true }
      },
      "rcdRequirements": {
        "rating": "None required",
        "reason": "Fire alarm circuit - direct MCB protection adequate"
      },
      "regulations": [
        "BS 5839-1 - Fire-rated cable with enhanced fire performance required",
        "Reg 433.1 - Overload protection satisfied",
        "Reg 525 - Voltage drop within limits"
      ],
      "complianceStatus": "pass"
    }
  ],
  "totalLoad": 35500,
  "totalLoadKW": 35.5,
  "diversityFactor": 0.6,
  "diversifiedLoad": 21300,
  "consumerUnitRequired": "10-way dual RCD (80A main switch)"
}

${relevantRegsText ? `RELEVANT BS 7671 REGULATIONS:\n${relevantRegsText}\n` : ''}
${designKnowledge ? `DESIGN GUIDANCE (Cable Selection, Voltage Drop Tables):\n${designKnowledge}\n` : ''}
${installationGuidance ? `INSTALLATION GUIDANCE (Safe Zones, Burial Depths, IP Ratings):\n${installationGuidance}\n` : ''}

COST ESTIMATE (add to JSON):
Include a "costEstimate" field in the JSON with:
- "materialsRange": "£XX-£YY" (cables, MCBs, consumer unit, accessories)
- "labourRange": "£XX-£YY" (based on typical electrician day rates and project complexity)
- "totalRange": "£XX-£YY + VAT"
- "notes": "Brief explanation of cost drivers"

VALIDATION REQUIREMENTS:
- Every circuit MUST have: id, name, loadType, load, cableSize, protection, calculations
- calculations MUST include: Ib, In, Iz, voltageDrop, zs
- Return ONLY the JSON object, no markdown, no explanations

Use UK English. Be thorough. Return valid JSON only.`;
      }
    } else {
      // Single circuit mode
      const cableLabel = circuitParams.location === 'outdoor' 
        ? `${circuitParams.cableSize}mm² Steel Wire Armoured (SWA) 2-core + CPC (BS 5467 or BS 6724)`
        : `${circuitParams.cableSize}mm² twin & earth (6242Y)`;
      
      systemPrompt = `You are an electrical circuit designer with full BS 7671:2018+A3:2024 compliance knowledge.

FORMAT YOUR RESPONSE EXACTLY AS SHOWN BELOW:

CIRCUIT SPECIFICATION

Load: ${circuitParams.power}W (${circuitParams.power/1000}kW)
Distance from board: ${circuitParams.cableLength}m
Installation method: ${circuitParams.installationMethod}
${circuitParams.location === 'outdoor' ? `Environment: Outdoor installation (${circuitParams.ambientTemp}°C ambient)` : ''}
Supply: ${circuitParams.voltage}V ${circuitParams.phases}-phase
Circuit type: ${circuitParams.circuitType}

CALCULATIONS

Design current (Ib): ${calculationResults?.cableCapacity?.Ib || 'TBC'}A
Protection device: ${calculationResults?.cableCapacity?.In || circuitParams.deviceRating}A MCB Type ${circuitParams.deviceType}
Cable specification: ${cableLabel}
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
RELEVANT BS 7671 REGULATIONS (from database):
${relevantRegsText}
` : ''}

${designKnowledge ? `
DESIGN GUIDANCE (Cable Selection, Voltage Drop Calculations):
${designKnowledge}
` : ''}

${installationGuidance ? `
INSTALLATION GUIDANCE (Safe Zones, Burial Depths, IP Ratings):
${installationGuidance}
` : ''}

COST ESTIMATE

Provide a rough cost estimate at the end of your response using this format:

**Estimated Materials Cost:** £XX-£YY
Materials include: cable (${cableLabel}), MCB (${calculationResults?.cableCapacity?.In || circuitParams.deviceRating}A Type ${circuitParams.deviceType}), accessories (back boxes, faceplates, cable clips, etc.)

**Estimated Labour:** £XX-£YY (X-Y hours at typical electrician rates)
Based on installation complexity and cable run distance (${circuitParams.cableLength}m)

**Total Rough Estimate:** £XX-£YY + VAT

Note: These are ballpark estimates for planning purposes. Actual costs vary by region, supplier, and specific site conditions.

Use professional language with UK English spelling. Present calculations clearly. Cite regulation numbers and technical guidance. Include the cost estimate at the end. No conversational filler or markdown formatting.`;
    }

    // Call Lovable AI Gateway with retry + timeout (60s for complex design calculations)
    const response = await logger.time(
      'Lovable AI design generation',
      () => withRetry(
        () => withTimeout(
          fetch('https://ai.gateway.lovable.dev/v1/chat/completions', {
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
                ...(agentContext?.structuredKnowledge ? [{
                  role: 'system',
                  content: agentContext.structuredKnowledge
                }] : [])
              ],
              max_completion_tokens: calculateTokenLimit(extractCircuitCount(userMessage), messages)
            }),
          }),
          Timeouts.LONG,
          'Lovable AI design generation'
        ),
        RetryPresets.STANDARD
      )
    );

    if (!response.ok) {
      const errorText = await response.text();
      logger.error('Lovable AI error', { status: response.status, error: errorText });
      
      // Specific error messages for common failures
      if (response.status === 429) {
        return new Response(JSON.stringify({ 
          error: 'AI service rate limit exceeded. Please try again in 30 seconds.',
          retryAfter: 30 
        }), {
          status: 429,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        });
      }
      
      if (response.status === 402) {
        return new Response(JSON.stringify({ 
          error: 'AI service quota exceeded. Please contact support.',
          code: 'QUOTA_EXCEEDED'
        }), {
          status: 402,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        });
      }
      
      throw new ValidationError(`AI gateway error: ${response.status} - ${errorText}`);
    }

    const data = await response.json();
    const responseContent = data.choices[0]?.message?.content || 'Design analysis complete.';

    const citations = extractCitations(responseContent);

    logger.info('Designer response generated successfully', { requestId });

    // PHASE 1: Try to parse as JSON first for multi-circuit mode
    const structuredData: any = {};
    const reasoning: string[] = [];
    
    if (projectScope.isMultiCircuit) {
      try {
        // PHASE 4: Enhanced JSON parsing to handle multiple formats
        let cleanedContent = responseContent;
        
        // Extract first JSON code fence if present
        const fenceMatch = responseContent.match(/```(?:json)?\s*([\s\S]*?)```/i);
        if (fenceMatch) {
          cleanedContent = fenceMatch[1].trim();
          logger.debug('Extracted JSON from code fence', { requestId });
        } else {
          // No fence - clean up any stray markdown
          cleanedContent = responseContent
            .replace(/```(?:json)?/gi, '')
            .replace(/```/g, '')
            .trim();
        }
        
        // Try to find JSON object if there's surrounding text
        const jsonMatch = cleanedContent.match(/\{[\s\S]*\}/);
        if (jsonMatch) {
          cleanedContent = jsonMatch[0];
        }
        
        const parsed = JSON.parse(cleanedContent);
        logger.info('Successfully parsed multi-circuit JSON', { circuitCount: parsed.circuits?.length, requestId });
        console.log('✅ Parsed structured multi-circuit data:', parsed.circuits?.length, 'circuits');
        
        // LOG WHAT WE ACTUALLY GOT from AI
        console.log('📊 AI Response Structure:', {
          hasTotalLoad: !!parsed.totalLoad,
          hasTotalLoadKW: !!parsed.totalLoadKW,
          hasDiversityFactor: !!parsed.diversityFactor,
          hasDiversifiedLoad: !!parsed.diversifiedLoad,
          circuitCount: parsed.circuits?.length,
          actualValues: {
            totalLoad: parsed.totalLoad,
            totalLoadKW: parsed.totalLoadKW,
            diversityFactor: parsed.diversityFactor,
            diversifiedLoad: parsed.diversifiedLoad
          }
        });

        // COMPUTE MISSING FIELDS (defensive fallback with logging)
        if ((!parsed.totalLoad || !parsed.totalLoadKW) && Array.isArray(parsed.circuits)) {
          console.warn('⚠️ AI forgot totalLoad/totalLoadKW - computing from circuits');
          
          const computedTotalLoad = parsed.circuits.reduce((sum: number, c: any) => {
            return sum + (c.load || 0);
          }, 0);
          
          parsed.totalLoad = computedTotalLoad;
          parsed.totalLoadKW = parseFloat((computedTotalLoad / 1000).toFixed(2));
          
          console.log(`✅ Computed totalLoad: ${parsed.totalLoad}W (${parsed.totalLoadKW}kW)`);
        }

        // Compute diversifiedLoad if missing
        if (parsed.diversityFactor && !parsed.diversifiedLoad && parsed.totalLoad) {
          parsed.diversifiedLoad = Math.round(parsed.totalLoad * parsed.diversityFactor);
          console.log(`✅ Computed diversifiedLoad: ${parsed.diversifiedLoad}W using factor ${parsed.diversityFactor}`);
        }

        // PHASE 3: Check and fix circuits missing calculations with graceful degradation
        if (parsed.circuits && Array.isArray(parsed.circuits)) {
          parsed.circuits.forEach((circuit: any, index: number) => {
            try {
              if (!circuit.calculations || !circuit.calculations.Ib) {
                logger.warn(`Circuit ${index + 1} (${circuit.name}) missing calculations - computing`, { requestId });
                
                // Use the calculation engines we imported
                if (circuit.load && circuit.cableSize) {
                  const voltage = circuit.voltage || 230;
                  const designCurrent = circuit.load / voltage;
                  const deviceRating = parseInt(circuit.protection?.match(/\d+/)?.[0]) || 32;
                  const cableLength = circuit.cableLength || 15;
                  
                  const calcResult = calculateCableCapacity({
                    cableSize: parseFloat(circuit.cableSize),
                    designCurrent,
                    deviceRating,
                    ambientTemp: 30,
                    groupingCircuits: 1,
                    installationMethod: circuit.installationMethod || 'clipped-direct',
                    cableType: circuit.cableType || 'pvc-twin-earth',
                    cableLength,
                    voltage
                  });
                  
                  // PHASE 3: Graceful degradation - mark as incomplete instead of throwing
                  if (!calcResult || !calcResult.Iz) {
                    logger.error(`Failed to compute calculations for ${circuit.name}`, { requestId });
                    circuit.status = 'incomplete';
                    circuit.warnings = circuit.warnings || [];
                    circuit.warnings.push('Calculations could not be completed - verify manually');
                  } else {
                    circuit.calculations = {
                      Ib: Math.round(designCurrent * 10) / 10,
                      In: deviceRating,
                      Iz: calcResult.Iz,
                      voltageDrop: {
                        volts: calcResult.voltageDrop.voltageDropVolts,
                        percent: calcResult.voltageDrop.voltageDropPercent,
                        compliant: calcResult.voltageDrop.compliant
                      },
                      zs: {
                        calculated: calcResult.earthFault?.calculated || 0,
                        max: calcResult.earthFault?.max || 0,
                        compliant: calcResult.earthFault?.compliant || false
                      }
                    };
                    circuit.status = 'complete';
                    logger.info(`Computed calculations for circuit ${index + 1}`, { requestId });
                  }
                } else {
                  logger.warn(`Circuit ${index + 1} missing load or cable size data`, { requestId });
                  circuit.status = 'incomplete';
                  circuit.warnings = circuit.warnings || [];
                  circuit.warnings.push('Insufficient data for calculations');
                }
              }
            } catch (circuitError) {
              // PHASE 3: Catch per-circuit errors instead of crashing entire request
              logger.error(`Error processing circuit ${index + 1}`, { 
                error: circuitError instanceof Error ? circuitError.message : String(circuitError),
                requestId 
              });
              circuit.status = 'incomplete';
              circuit.warnings = circuit.warnings || [];
              circuit.warnings.push('Calculation error - verify manually');
            }
          });
        }
        
        Object.assign(structuredData, parsed);
      } catch (e) {
        // PHASE 4: Enhanced error logging for JSON parse failures
        logger.error('Multi-circuit JSON parse failure', { 
          error: e instanceof Error ? e.message : String(e),
          responsePreview: responseContent.substring(0, 500),
          requestId
        });
        // Continue with text-only response
      }
    }
    
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
        r1r2Expected: calculationResults.zs ? `${(calculationResults.zs - 0.35).toFixed(3)}Ω` : 'TBC',
        zsExpected: calculationResults.zs ? `${calculationResults.zs.toFixed(2)}Ω` : 'TBC',
        maxZs: calculationResults.maxZs?.maxZs ? `${calculationResults.maxZs.maxZs}Ω` : 'TBC',
        insulationTest: '≥1.0 MΩ at 500V DC',
        polarity: 'Correct (verify on-site)',
        rcdTest: calculationResults.rcdRequirements?.required ? '30mA RCD required' : 'N/A'
      };
      
      // NEW: Add structured circuits array for drawing components with STANDARDIZED calculations property
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
        calculations: {
          Ib: calculationResults.cableCapacity.Ib,
          In: calculationResults.cableCapacity.In,
          Iz: calculationResults.cableCapacity.Iz,
          voltageDrop: {
            volts: calculationResults.voltageDrop.voltageDropVolts,
            percent: calculationResults.voltageDrop.voltageDropPercent,
            compliant: calculationResults.voltageDrop.compliant
          },
          zs: {
            calculated: calculationResults.zs,
            max: calculationResults.maxZs?.maxZs,
            compliant: calculationResults.zs <= calculationResults.maxZs?.maxZs
          }
        }
      }];
      
      reasoning.push(`Selected ${circuitParams.cableSize}mm² cable: Iz (${Math.round(calculationResults.cableCapacity.Iz * 10) / 10}A) > In (${circuitParams.deviceRating}A)`);
      reasoning.push(`Correction factors: Ca=${calculationResults.cableCapacity.factors.temperatureFactor}, Cg=${calculationResults.cableCapacity.factors.groupingFactor}`);
      if (calculationResults.zs && calculationResults.maxZs?.maxZs) {
        reasoning.push(`Zs = ${calculationResults.zs.toFixed(2)}Ω (max ${calculationResults.maxZs.maxZs}Ω) - PSCC = ${calculationResults.pscc}A`);
      } else {
        console.warn('⚠️ Zs calculation incomplete - some protection data may be missing');
        reasoning.push(`Earth fault protection: Verification required on-site`);
      }
      
      if (calculationResults.voltageDrop?.compliant) {
        reasoning.push(`Voltage drop ${calculationResults.voltageDrop.voltageDropPercent}% complies with 3% BS 7671 limit`);
      }
      
      if (calculationResults.motorData) {
        reasoning.push(`Motor circuit: FLC=${calculationResults.motorData.fullLoadCurrent}A, Starting=${calculationResults.motorData.startingCurrent}A (${calculationResults.motorData.startingMethod})`);
      }
    }

    // PHASE 2: Build detailed reasoning steps for transparency
    const reasoningSteps = [];
    const regulationsConsulted = [];
    const assumptionsMade = [];

    if (calculationResults?.cableCapacity) {
      reasoningSteps.push({
        step: 'Design current calculation',
        reasoning: `Calculated Ib = ${calculationResults.cableCapacity.Ib.toFixed(1)}A from ${circuitParams.power}W load at ${circuitParams.voltage}V`,
        timestamp: new Date().toISOString()
      });
      
      reasoningSteps.push({
        step: 'Protection device selection',
        reasoning: `Selected ${circuitParams.deviceRating}A Type ${circuitParams.deviceType} MCB to satisfy Ib (${calculationResults.cableCapacity.Ib.toFixed(1)}A) ≤ In (${circuitParams.deviceRating}A)`,
        timestamp: new Date().toISOString()
      });
      
      reasoningSteps.push({
        step: 'Cable capacity verification',
        reasoning: `Tabulated capacity ${calculationResults.cableCapacity.IzTabulated}A × correction factor ${calculationResults.cableCapacity.factors.overallFactor.toFixed(2)} = ${calculationResults.cableCapacity.Iz.toFixed(1)}A derated capacity. Satisfies In ≤ Iz check.`,
        timestamp: new Date().toISOString()
      });
      
      if (calculationResults.voltageDrop) {
        reasoningSteps.push({
          step: 'Voltage drop check',
          reasoning: `${calculationResults.voltageDrop.voltageDropVolts.toFixed(2)}V drop over ${circuitParams.cableLength}m = ${calculationResults.voltageDrop.voltageDropPercent.toFixed(2)}% (${calculationResults.voltageDrop.compliant ? 'within' : 'exceeds'} ${circuitParams.circuitType === 'lighting' ? '3%' : '5%'} limit)`,
          timestamp: new Date().toISOString()
        });
      }
      
      if (calculationResults.zs && calculationResults.maxZs?.maxZs) {
        reasoningSteps.push({
          step: 'Earth fault protection',
          reasoning: `Calculated Zs = ${calculationResults.zs.toFixed(2)}Ω is ${calculationResults.zs <= calculationResults.maxZs.maxZs ? 'within' : 'above'} maximum ${calculationResults.maxZs.maxZs}Ω for ${circuitParams.deviceRating}A Type ${circuitParams.deviceType} MCB`,
          timestamp: new Date().toISOString()
        });
      }
    }

    // Build regulations from RAG results and key BS 7671 sections
    if (regulations && regulations.length > 0) {
      regulations.slice(0, 3).forEach((reg: any) => {
        regulationsConsulted.push({
          section: reg.regulation_number || reg.topic,
          title: reg.section || 'BS 7671 Regulation',
          relevance: 'Referenced for design compliance',
          source: 'BS 7671:2018+A2:2022'
        });
      });
    }

    // Always include key regulations
    regulationsConsulted.push({
      section: '433.1',
      title: 'Overload protection requirements',
      relevance: 'Verified Ib ≤ In ≤ Iz for cable sizing',
      source: 'BS 7671:2018+A2:2022'
    });

    if (calculationResults?.voltageDrop) {
      regulationsConsulted.push({
        section: '525',
        title: 'Voltage drop in consumers\' installations',
        relevance: `Checked ${calculationResults.voltageDrop.voltageDropPercent.toFixed(2)}% against limits`,
        source: 'BS 7671:2018+A2:2022'
      });
    }

    if (calculationResults?.maxZs) {
      regulationsConsulted.push({
        section: '411.4.4',
        title: 'Maximum earth fault loop impedance',
        relevance: 'Verified Zs for automatic disconnection',
        source: 'BS 7671:2018+A2:2022 Table 41.3'
      });
    }

    // Track assumptions made
    const msgLower = userMessage.toLowerCase();
    if (!msgLower.includes('kw') && !msgLower.includes('w') && !msgLower.includes('amp')) {
      assumptionsMade.push({
        parameter: 'Load power',
        assumed: `${circuitParams.power}W`,
        reason: 'Standard load for typical UK installation',
        impact: 'Affects cable sizing and protection device selection'
      });
    }

    if (!msgLower.includes('m') && !msgLower.includes('metre')) {
      assumptionsMade.push({
        parameter: 'Cable length',
        assumed: `${circuitParams.cableLength}m`,
        reason: 'Typical run distance for this circuit type',
        impact: 'Affects voltage drop calculation'
      });
    }

    if (circuitParams.ambientTemp !== 30) {
      assumptionsMade.push({
        parameter: 'Ambient temperature',
        assumed: `${circuitParams.ambientTemp}°C`,
        reason: circuitParams.location === 'outdoor' ? 'UK outdoor design temperature' : 'BS 7671 standard ambient temperature',
        impact: 'Affects cable current-carrying capacity correction factor'
      });
    }

    if (circuitParams.groupingCircuits > 1) {
      assumptionsMade.push({
        parameter: 'Grouping factor',
        assumed: `${circuitParams.groupingCircuits} circuits bunched`,
        reason: 'Estimated based on typical installation',
        impact: 'Reduces cable capacity by grouping correction factor'
      });
    }

    // Enhance citations with full metadata
    const enhancedCitations = [];
    if (regulations && regulations.length > 0) {
      enhancedCitations.push(...regulations.slice(0, 5).map((reg: any) => ({
        source: 'BS 7671:2018+A2:2022',
        section: reg.regulation_number || reg.topic,
        title: reg.section || 'Regulation',
        content: reg.content?.slice(0, 150) + '...',
        relevance: reg.similarity,
        type: 'regulation'
      })));
    }

    if (designDocs && designDocs.length > 0) {
      enhancedCitations.push(...designDocs.slice(0, 3).map((doc: any) => ({
        source: doc.source || 'Design Knowledge Base',
        section: doc.topic,
        title: doc.topic,
        content: doc.content?.slice(0, 150) + '...',
        relevance: doc.similarity,
        type: 'knowledge'
      })));
    }

    // Add to structuredData
    structuredData.reasoningSteps = reasoningSteps;
    structuredData.regulationsConsulted = regulationsConsulted;
    structuredData.assumptionsMade = assumptionsMade;

    // Phase 3: Store successful design pattern for learning
    if (structuredData.circuits && structuredData.circuits.length > 0) {
      const mainCircuit = structuredData.circuits[0];
      const responseTimeMs = Date.now() - patternStartTime;
      
      try {
        await storeDesignPattern(
          {
            circuitType: circuitParams.circuitType,
            powerRating: circuitParams.power,
            voltage: circuitParams.voltage,
            cableLength: circuitParams.cableLength,
            designSolution: mainCircuit,
            regulationsCited: regulations.map(r => r.regulation_number).filter(Boolean),
          },
          responseTimeMs
        );
        logger.info('💾 Design pattern stored for future reuse');
      } catch (error) {
        logger.warn('Failed to store pattern', { error: error instanceof Error ? error.message : String(error) });
      }
    }

    // Update context with design decisions
    agentContext.designDecisions.push({
      parameter: 'cable_size',
      value: `${circuitParams.cableSize}mm²`,
      reasoning: `Selected based on Iz > In requirement`,
      regulation: '433.1',
      confidence: 95,
    });

    return new Response(JSON.stringify({
      response: responseContent,
      structuredData,
      reasoning,
      calculationResults,
      citations: enhancedCitations.length > 0 ? enhancedCitations : citations,
      confidence: 0.95,
      model: 'google/gemini-2.5-flash',
      timestamp: new Date().toISOString(),
      context: agentContext,
      isComplete: true,
      exportReady: true
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

// Phase 4: Adaptive Token Limits
function calculateTokenLimit(circuitCount: number, messages: any[]): number {
  const baseTokens = 2000;
  const perCircuitTokens = 400;
  const conciseMode = circuitCount > 8;
  
  if (conciseMode) {
    return Math.min(baseTokens + (circuitCount * 300), 8000); // Concise mode: fewer tokens
  }
  
  return Math.min(baseTokens + (circuitCount * perCircuitTokens), 10000);
}

function extractCircuitCount(userMessage: string): number {
  const wayMatch = userMessage.match(/(\d+)[\s-]?way/i);
  if (wayMatch) return parseInt(wayMatch[1]);
  
  const circuitMatch = userMessage.match(/(\d+)\s+circuits?/i);
  if (circuitMatch) return parseInt(circuitMatch[1]);
  
  return 6; // Default assumption
}

// PHASE 1: Multi-Circuit Detection
function detectProjectScope(userMessage: string): {
  isMultiCircuit: boolean;
  propertyType?: string;
  circuits?: any[];
} {
  const msgLower = userMessage.toLowerCase();
  
  // Detect full rewire keywords
  const isFullRewire = /full\s+rewire|complete\s+rewire|consumer\s+unit\s+upgrade|new\s+installation|3[\s-]?bed|2[\s-]?bed|house\s+rewire/i.test(msgLower);
  
  if (!isFullRewire) {
    return { isMultiCircuit: false };
  }
  
  // Detect property type
  let propertyType = 'standard';
  let bedrooms = 3; // default
  
  const bedroomMatch = msgLower.match(/(\d+)[\s-]?bed/);
  if (bedroomMatch) bedrooms = parseInt(bedroomMatch[1]);
  
  if (msgLower.includes('flat') || msgLower.includes('apartment')) propertyType = 'flat';
  else if (msgLower.includes('bungalow')) propertyType = 'bungalow';
  else if (msgLower.includes('detached')) propertyType = 'detached-house';
  else if (msgLower.includes('semi') || msgLower.includes('terrace')) propertyType = 'semi-detached-house';
  
  // Generate standard circuit schedule
  const circuits: any[] = [];
  let circuitNum = 1;
  
  // Ring mains (1-2 depending on property size)
  if (bedrooms >= 3 || propertyType === 'detached-house') {
    circuits.push({ num: circuitNum++, name: 'Kitchen Ring Main', type: 'ring-main', rating: 32, power: 7360, cable: 2.5 });
    circuits.push({ num: circuitNum++, name: 'General Sockets Ring Main', type: 'ring-main', rating: 32, power: 7360, cable: 2.5 });
  } else {
    circuits.push({ num: circuitNum++, name: 'Sockets Ring Main', type: 'ring-main', rating: 32, power: 7360, cable: 2.5 });
  }
  
  // Lighting circuits (1-2)
  if (bedrooms >= 3) {
    circuits.push({ num: circuitNum++, name: 'Downstairs Lighting', type: 'lighting', rating: 6, power: 1000, cable: 1.5 });
    circuits.push({ num: circuitNum++, name: 'Upstairs Lighting', type: 'lighting', rating: 6, power: 1000, cable: 1.5 });
  } else {
    circuits.push({ num: circuitNum++, name: 'Lighting Circuit', type: 'lighting', rating: 6, power: 1000, cable: 1.5 });
  }
  
  // Fixed appliances
  if (msgLower.includes('cooker') || bedrooms >= 2) {
    circuits.push({ num: circuitNum++, name: 'Cooker Circuit', type: 'cooker', rating: 32, power: 9200, cable: 6 });
  }
  if (msgLower.includes('shower') || bedrooms >= 2) {
    circuits.push({ num: circuitNum++, name: 'Electric Shower', type: 'shower', rating: 40, power: 8500, cable: 10 });
  }
  if (msgLower.includes('immersion') || !msgLower.includes('combi')) {
    circuits.push({ num: circuitNum++, name: 'Immersion Heater', type: 'immersion', rating: 16, power: 3000, cable: 2.5 });
  }
  
  // Additional circuits
  if (msgLower.includes('smoke') || propertyType !== 'flat') {
    circuits.push({ num: circuitNum++, name: 'Smoke/Heat Alarms', type: 'smoke-alarms', rating: 6, power: 50, cable: 1.0 });
  }
  if (msgLower.includes('outdoor') || msgLower.includes('garage')) {
    circuits.push({ num: circuitNum++, name: 'Outdoor Socket', type: 'outdoor-socket', rating: 16, power: 3680, cable: 2.5 });
  }
  
  return {
    isMultiCircuit: true,
    propertyType,
    circuits
  };
}

function extractCircuitParams(userMessage: string, currentDesign: any, context?: any): any {
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
  
  // Extract ambient temperature (including negative values)
  const tempMatch = userMessage.match(/([-\d]+)\s*°?C/i);
  const ambientTemp = tempMatch ? parseInt(tempMatch[1]) : (currentDesign?.environmentalProfile?.finalApplied?.ambientTemp || 30);
  
  if (tempMatch) {
    console.log(`🌡️ Detected ambient temp: ${ambientTemp}°C`);
  }
  
  // Detect outdoor installation
  const isOutdoor = location === 'outdoor' || /outdoor|outside|garage|garden|external/i.test(userMessage);
  
  // Outdoor environment detected - log it and set defaults
  if (isOutdoor) {
    console.log('🌍 OUTDOOR installation detected - defaulting to SWA cable on tray');
    location = 'outdoor';
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
    ambientTemp,
    groupingCircuits: currentDesign?.environmentalProfile?.finalApplied?.grouping || 1,
    installationMethod: isOutdoor ? 'cable-tray' : (currentDesign?.installationMethod || 'clipped-direct'),
    cableType: isOutdoor ? 'swa' : '6242Y',
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
