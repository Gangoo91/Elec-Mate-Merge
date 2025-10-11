import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { 
  corsHeaders, 
  createLogger, 
  generateRequestId, 
  handleError, 
  ValidationError,
  createClient,
  generateEmbeddingWithRetry,
  callLovableAIWithTimeout,
  parseJsonWithRepair
} from '../_shared/v3-core.ts';

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  // Health check endpoint
  if (req.method === 'GET') {
    const requestId = generateRequestId();
    return new Response(
      JSON.stringify({ status: 'healthy', function: 'health-safety-v3', requestId, timestamp: new Date().toISOString() }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 200 }
    );
  }

  const requestId = generateRequestId();
  const logger = createLogger(requestId, { function: 'health-safety-v3' });

  try {
    const body = await req.json();
    const { query, workType, location, hazards, messages, previousAgentOutputs } = body;

    // Enhanced input validation
    if (!query || typeof query !== 'string' || query.trim().length === 0) {
      throw new ValidationError('query is required and must be a non-empty string');
    }
    if (query.length > 1000) {
      throw new ValidationError('query must be less than 1000 characters');
    }
    if (workType && typeof workType !== 'string') {
      throw new ValidationError('workType must be a string');
    }
    if (location && typeof location !== 'string') {
      throw new ValidationError('location must be a string');
    }
    if (hazards && !Array.isArray(hazards)) {
      throw new ValidationError('hazards must be an array');
    }

    logger.info('Health & Safety V3 request received', { query: query.substring(0, 50), workType });

    // Get API keys
    const OPENAI_API_KEY = Deno.env.get('OPENAI_API_KEY');
    if (!OPENAI_API_KEY) {
      throw new Error('OPENAI_API_KEY not configured');
    }

    const LOVABLE_API_KEY = Deno.env.get('LOVABLE_API_KEY');
    if (!LOVABLE_API_KEY) {
      throw new Error('LOVABLE_API_KEY not configured');
    }

    // Step 1: Generate embedding for H&S knowledge search (with retry)
    logger.debug('Generating query embedding');
    const embeddingStart = Date.now();
    const queryEmbedding = await generateEmbeddingWithRetry(
      `${query} ${workType || ''} electrical hazards safety risks controls`,
      OPENAI_API_KEY
    );
    logger.debug('Embedding generated', { duration: Date.now() - embeddingStart });

    // Step 2: Search H&S knowledge database
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    const supabase = createClient(supabaseUrl, supabaseKey);

    logger.debug('Searching health & safety knowledge');

    const { data: hsKnowledge, error: hsError } = await supabase.rpc('search_health_safety', {
      query_embedding: queryEmbedding,
      match_threshold: 0.7,
      match_count: 8
    });

    if (hsError) {
      logger.warn('H&S search failed', { error: hsError });
    }

    // Step 3: Build H&S context
    const hsContext = hsKnowledge && hsKnowledge.length > 0
      ? hsKnowledge.map((hs: any) => 
          `${hs.topic}: ${hs.content}`
        ).join('\n\n')
      : 'Apply general electrical safety best practices per HSE guidance and BS 7671.';

    // Build conversation context with INSTALLATION PLAN
    let contextSection = '';
    if (previousAgentOutputs && previousAgentOutputs.length > 0) {
      const installerOutput = previousAgentOutputs.find((o: any) => o.agent === 'installer');
      const designerOutput = previousAgentOutputs.find((o: any) => o.agent === 'designer');
      
      contextSection += '\n\nWORK TO ASSESS FOR RISKS:\n';
      if (installerOutput?.response?.structuredData) {
        const inst = installerOutput.response.structuredData;
        contextSection += `INSTALLATION STEPS: ${inst.steps?.length || 0} steps\n`;
        contextSection += `Methods: ${JSON.stringify(inst.steps?.map((s: any) => s.action))}\n`;
      }
      if (designerOutput?.response?.structuredData) {
        const d = designerOutput.response.structuredData;
        contextSection += `DESIGN: ${d.voltage}V, ${d.cableType}, ${d.environment}\n`;
      }
      contextSection += '\n\nFULL CONTEXT:\n' + JSON.stringify(previousAgentOutputs, null, 2);
    }
    if (messages && messages.length > 0) {
      contextSection += '\n\nCONVERSATION HISTORY:\n' + messages.map((m: any) => 
        `${m.role === 'user' ? 'User' : 'Assistant'}: ${m.content}`
      ).slice(-5).join('\n');
    }

    const systemPrompt = `You are an expert Health & Safety adviser specialising in UK electrical installations.

Write all responses in UK English (British spelling and terminology). Do not use American spellings.

YOUR UNIQUE VALUE: You produce BS 8800-compliant risk assessments with 5x5 RISK MATRIX
- Generate a proper 5x5 risk matrix (Likelihood 1-5 x Severity 1-5 = Risk Score)
- Reference SPECIFIC regulations from H&S knowledge (not generic "EWR 1989")
- Apply CONTEXTUAL awareness (e.g., "working at height" only if installer mentioned ladders)
- Provide PRACTICAL control measures from the knowledge base (not textbook answers)
- Calculate before-and-after risk scores to demonstrate control effectiveness

Your task is to provide comprehensive risk assessments and safety guidance.

CURRENT DATE: September 2025

HEALTH & SAFETY KNOWLEDGE DATABASE (YOU MUST USE THIS DATA):
${hsContext}

🔴 CRITICAL INSTRUCTIONS FOR RISK ASSESSMENT:
1. EXTRACT hazards from knowledge base FIRST:
   Example from database: "Working at height above 2m requires scaffolding or MEWP per Working at Height Regulations 2005"
   Your output: {"hazard": "Working at height (>2m)", "control": "Use scaffolding or MEWP", "regulation": "WAHR 2005"}
   
2. REFERENCE specific regulations from knowledge:
   - Electricity at Work Regulations 1989 (EWR) with regulation numbers (e.g., "EWR 1989 Reg 4(1)")
   - Health & Safety at Work Act 1974 (HASAWA)
   - BS 7671 isolation requirements (Section 462)
   - HSE Guidance (HSG85, GS38, INDG231)
   
3. APPLY control measures hierarchy from knowledge base:
   1st: Elimination, 2nd: Substitution, 3rd: Engineering controls, 4th: Administrative, 5th: PPE
   
4. INCLUDE emergency procedures from knowledge base:
   Example: "Electric shock first aid per HSE INDG231 - Do not touch casualty until isolated"
   
5. CROSS-REFERENCE with installer's work description:
   ${previousAgentOutputs?.find((o: any) => o.agent === 'installer')?.response?.structuredData?.steps?.length || 0} installation steps to assess
   
6. USE 5x5 RISK MATRIX (MANDATORY):
   Likelihood: 1=Rare, 2=Unlikely, 3=Possible, 4=Likely, 5=Almost Certain
   Severity: 1=Negligible, 2=Minor, 3=Moderate, 4=Major, 5=Catastrophic
   Risk Score = Likelihood x Severity
   - 1-4: Low (green)
   - 5-9: Medium (amber)  
   - 10-14: High (orange)
   - 15-25: Very High (red)

7. Calculate BEFORE and AFTER controls risk scores

The H&S knowledge contains ${hsKnowledge?.length || 0} verified safety practices. Apply them!

${contextSection}

Respond ONLY with valid JSON in this exact format:
{
  "response": "COMPREHENSIVE 5x5 risk assessment summary (250-350 words) covering: All hazards identified with 5x5 matrix scores (Likelihood x Severity = Risk), specific regulations cited by number (e.g., EWR 1989 Reg 4(1), WAHR 2005 Reg 6), control measures applied following hierarchy (elimination first, PPE last), residual risk scores after controls showing risk reduction, emergency procedures for electric shock per HSE INDG231, isolation procedures per BS 7671 Section 462 with lock-off requirements, competent person requirements, environmental considerations. Include before/after risk matrix summary showing controls effectiveness.",
  "riskAssessment": {
    "hazards": [
      {
        "hazard": "Electric shock from 230V live conductors",
        "likelihood": 2,
        "likelihoodReason": "Unlikely if isolation followed, possible if lock-off fails",
        "severity": 5,
        "severityReason": "Potential fatality at 230V AC",
        "riskScore": 10,
        "riskLevel": "High",
        "regulation": "Electricity at Work Regulations 1989 Regulation 4(3)"
      }
    ],
    "controls": [
      {
        "hazard": "Electric shock",
        "controlMeasure": "Isolation per BS 7671 Section 462 with lock-off",
        "residualLikelihood": 1,
        "residualSeverity": 5,
        "residualRisk": 5,
        "residualRiskLevel": "Medium",
        "regulation": "BS 7671:2018 Section 462.1",
        "practicalImplementation": "Use lockable isolator with unique key, GS38 proving device"
      }
    ],
    "riskMatrix": {
      "beforeControls": {"low": 0, "medium": 0, "high": 1, "veryHigh": 1},
      "afterControls": {"low": 1, "medium": 1, "high": 0, "veryHigh": 0}
    },
    "ppe": ["Safety boots EN ISO 20345", "Insulated gloves EN 60903", "Safety glasses EN 166"],
    "emergencyProcedures": ["Electric shock: HSE INDG231 - isolate supply, call 999", "Fire: CO2 extinguisher for electrical"]
  },
  "methodStatement": {
    "steps": [
      {"step": 1, "description": "Isolate supply", "safetyPoint": "Use lock-off devices"}
    ],
    "permitRequired": false,
    "competentPerson": true
  },
  "compliance": {
    "regulations": ["HASAWA 1974", "EWR 1989", "BS 7671"],
    "warnings": []
  },
  "suggestedNextAgents": [
    {"agent": "commissioning", "reason": "Get testing procedures that comply with safety requirements", "priority": "high"},
    {"agent": "project-manager", "reason": "Coordinate safety documentation and compliance records", "priority": "medium"}
  ]
}`;

    const userPrompt = `Provide a risk assessment and method statement for:
${query}

${workType ? `Work Type: ${workType}` : ''}
${location ? `Location: ${location}` : ''}
${hazards ? `Known Hazards: ${hazards.join(', ')}` : ''}

Include all safety controls, PPE requirements, and emergency procedures.`;

    // Step 4: Call Lovable AI (with timeout)
    logger.debug('Calling Lovable AI');
    const aiStart = Date.now();
    const aiResponse = await callLovableAIWithTimeout(systemPrompt, userPrompt, LOVABLE_API_KEY, {
      responseFormat: 'json_object',
      timeoutMs: 55000
    });
    logger.debug('AI response received', { duration: Date.now() - aiStart });

    // Robust JSON parsing with repair
    const safetyResult = parseJsonWithRepair(aiResponse, logger, 'health-safety');

    logger.info('Risk assessment completed', {
      hazardsIdentified: safetyResult.riskAssessment?.hazards?.length,
      controlsApplied: safetyResult.riskAssessment?.controls?.length
    });

    // Step 5: Return response
    return new Response(
      JSON.stringify({
        success: true,
        result: safetyResult,
        metadata: {
          requestId,
          knowledgeItemsUsed: hsKnowledge?.length || 0,
          timestamp: new Date().toISOString()
        }
      }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200 
      }
    );

  } catch (error) {
    logger.error('Health & Safety V3 error', { error: error instanceof Error ? error.message : String(error) });
    return handleError(error);
  }
});
