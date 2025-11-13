/**
 * Health & Safety Agent V3 - Risk Assessment Specialist
 * 
 * SCOPE: Risk Assessment ONLY
 * This agent identifies hazards, assesses risks, and specifies control measures.
 * It does NOT generate method statements or installation procedures.
 * Use the Installer agent for step-by-step installation guidance.
 */

// DEPLOYMENT v4.5.0 - RELIABILITY FIX - 2025-11-13
const VERSION = 'v4.5.0-reliability';
const BOOT_TIME = new Date().toISOString();
const EDGE_FUNCTION_TIMEOUT_MS = 420000; // INCREASED: 420s (7 minutes, matching installer-v3)
console.log(`🚀 health-safety-v3 ${VERSION} booting at ${BOOT_TIME}`);

import { serve } from '../_shared/minimal-deps.ts';
import { createClient as createSupabaseClient } from 'https://esm.sh/@supabase/supabase-js@2.49.4';

// Lightweight inline utilities (no v3-core dependency)
const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

const generateRequestId = () => `req_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;

const createClient = () => createSupabaseClient(
  Deno.env.get('SUPABASE_URL')!,
  Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!
);

const createLogger = (requestId: string) => ({
  info: (msg: string, meta?: any) => console.info(`[${requestId}] ${msg}`, meta ? JSON.stringify(meta) : ''),
  error: (msg: string, meta?: any) => console.error(`[${requestId}] ${msg}`, meta ? JSON.stringify(meta) : ''),
  debug: (msg: string, meta?: any) => console.debug(`[${requestId}] ${msg}`, meta ? JSON.stringify(meta) : ''),
  warn: (msg: string, meta?: any) => console.warn(`[${requestId}] ${msg}`, meta ? JSON.stringify(meta) : '')
});

class ValidationError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'ValidationError';
  }
}

const handleError = (error: any, logger: any) => {
  logger.error('Request failed', { error: error.message });
  return new Response(
    JSON.stringify({ success: false, error: error.message }),
    { status: error instanceof ValidationError ? 400 : 500, headers: corsHeaders }
  );
};

const parseJsonWithRepair = (text: string) => {
  try {
    return JSON.parse(text);
  } catch {
    const cleaned = text.replace(/```json\n?/g, '').replace(/```\n?/g, '').trim();
    return JSON.parse(cleaned);
  }
};

async function generateEmbeddingWithRetry(text: string): Promise<number[]> {
  const response = await fetch('https://api.openai.com/v1/embeddings', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${Deno.env.get('OPENAI_API_KEY')}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      input: text.slice(0, 8000),
      model: 'text-embedding-3-small'
    })
  });
  const data = await response.json();
  return data.data[0].embedding;
}

async function callOpenAI(
  messages: any[],
  model: string,
  tools?: any[],
  tool_choice?: any
): Promise<any> {
  const isNewModel = model.includes('gpt-5') || model.includes('gpt-4.1');
  const body: any = {
    model,
    messages,
    max_completion_tokens: isNewModel ? 30000 : undefined,
    max_tokens: isNewModel ? undefined : 30000,
    temperature: isNewModel ? undefined : 0.7
  };
  
  if (tools) {
    body.tools = tools;
    if (tool_choice) body.tool_choice = tool_choice;
  }

  const response = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${Deno.env.get('OPENAI_API_KEY')}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body)
  });

  if (!response.ok) {
    const error = await response.text();
    throw new Error(`OpenAI error: ${error}`);
  }

  const data = await response.json();
  return {
    content: data.choices[0].message.content,
    toolCalls: data.choices[0].message.tool_calls
  };
}

// Phase 1A: Standardized Response Interface (STRICT SCHEMA)
// This is the SINGLE SOURCE OF TRUTH for health-safety output structure
interface HealthSafetyV3Response {
  success: boolean;
  data: {
    // HAZARDS: Top-level array, never nested in riskAssessment
    hazards: Array<{
      id: string;
      hazard: string;
      likelihood: number; // 1-5
      severity: number; // 1-5
      riskScore: number; // likelihood × severity
      riskLevel: string; // low/medium/high/very-high
      controlMeasure: string;
      residualRisk: number;
      residualRiskLevel: string;
      linkedToStep: number; // 0 = general, 1-N = specific step
      regulation?: string;
    }>;
    ppe: Array<{
      itemNumber: number;
      ppeType: string;
      standard: string;
      mandatory: boolean;
      purpose: string;
    }>;
    emergencyProcedures: string[];
    complianceRegulations: string[];
  };
  metadata: {
    generationTimeMs: number;
    hazardCount: number;
    ppeCount: number;
    ragSourceCount: number;
    aiModel: string;
    tokensUsed?: number;
  };
  error?: string;
}

function calculateRiskLevel(riskScore: number): string {
  if (riskScore >= 15) return 'very-high';
  if (riskScore >= 10) return 'high';
  if (riskScore >= 6) return 'medium';
  return 'low';
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  // Health check endpoint - MUST come before body parsing
  if (req.method === 'GET') {
    const requestId = generateRequestId();
    console.log(`✅ Health check passed (GET) - ${VERSION} at ${BOOT_TIME}`);
    return new Response(
      JSON.stringify({ 
        status: 'healthy', 
        function: 'health-safety-v3', 
        version: VERSION,
        bootTime: BOOT_TIME,
        requestId, 
        timestamp: new Date().toISOString() 
      }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 200 }
    );
  }

  // For POST requests, check body for health check mode
  if (req.method === 'POST') {
    try {
      const clonedReq = req.clone();
      const body = await clonedReq.json();
      
      if (body.mode === 'health-check') {
        const requestId = generateRequestId();
        console.log(`✅ Health check passed (POST) - ${VERSION} at ${BOOT_TIME}`);
        return new Response(
          JSON.stringify({ 
            status: 'healthy', 
            function: 'health-safety-v3', 
            version: VERSION,
            bootTime: BOOT_TIME,
            requestId, 
            timestamp: new Date().toISOString() 
          }),
          { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 200 }
        );
      }
    } catch (e) {
      // Not a health check or invalid JSON - continue to normal processing
      console.log('Not a health check request, continuing to normal processing');
    }
  }

  const requestId = generateRequestId();
  const logger = createLogger(requestId, { function: 'health-safety-v3' });
  const requestStart = Date.now();

  // Performance tracking
  const performanceMetrics = {
    startTime: Date.now(),
    queryEnhancement: 0,
    ragRetrieval: 0,
    aiGeneration: 0,
    totalTime: 0
  };

  // Timeout promise
  const timeoutPromise = new Promise<Response>((_, reject) => {
    setTimeout(() => {
      reject(new Error('Edge function timeout after 240s'));
    }, EDGE_FUNCTION_TIMEOUT_MS);
  });

  // Main execution promise
  const executionPromise = (async (): Promise<Response> => {
  try {
    console.log('📥 [DIAGNOSTIC] Parsing request body...');
    const body = await req.json();
    console.log('✅ [DIAGNOSTIC] Request body parsed successfully');
    const { query, workType, location, hazards, messages, previousAgentOutputs, sharedRegulations, currentDesign, projectDetails } = body;
    
    // Track context sources
    const contextSources = {
      sharedRegulations: !!(sharedRegulations && sharedRegulations.length > 0),
      previousAgentOutputs: previousAgentOutputs?.map((o: any) => o.agent) || [],
      projectDetails: !!projectDetails,
      circuitDesign: !!(currentDesign?.circuits || previousAgentOutputs?.find((o: any) => o.agent === 'designer'))
    };

    logger.info('📦 Context received:', contextSources);
    console.log('📋 [DIAGNOSTIC] Request params:', {
      queryLength: query?.length,
      workType,
      location,
      hasMessages: !!messages,
      hasPreviousOutputs: !!previousAgentOutputs,
      hasSharedRegs: !!sharedRegulations
    });

    // PHASE 1: Query Enhancement
    console.log('🔧 [DIAGNOSTIC] Starting query enhancement...');
    const { enhanceQuery, logEnhancement } = await import('../_shared/query-enhancer.ts');
    const enhancement = enhanceQuery(query, messages || []);
    logEnhancement(enhancement, logger);
    
    const effectiveQuery = enhancement.enhanced;
    performanceMetrics.queryEnhancement = Date.now() - performanceMetrics.startTime;
    console.log('✅ [DIAGNOSTIC] Query enhanced:', { duration: performanceMetrics.queryEnhancement, effectiveLength: effectiveQuery.length });

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

    logger.info('🦺 Health & Safety V3 request received', { 
      query: effectiveQuery.substring(0, 50),
      enhanced: enhancement.addedContext.length > 0,
      workType,
      hasSharedRegs: !!sharedRegulations?.length
    });

    // PHASE 3: Safety Guardian - Detect critical hazards
    const { detectSafetyRequirements } = await import('../_shared/safety-guardian.ts');
    const safetyWarnings = detectSafetyRequirements(
      effectiveQuery,
      undefined, // circuitType from previousAgentOutputs
      undefined,
      location,
      undefined,
      undefined
    );
    
    if (safetyWarnings.criticalCount > 0) {
      logger.info(`🚨 ${safetyWarnings.criticalCount} critical hazards detected`);
    }

    // Get API keys
    const OPENAI_API_KEY = Deno.env.get('OPENAI_API_KEY');
    if (!OPENAI_API_KEY) {
      throw new Error('OPENAI_API_KEY not configured');
    }

    // OPTIMIZED: Direct parallel RAG searches (H&S specific)
    console.log('🔍 [DIAGNOSTIC] Starting optimized parallel RAG for H&S...');
    logger.debug('Starting H&S RAG: vector for health-safety, keyword for BS 7671');
    const ragStartTime = Date.now();
    
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    const supabase = createClient(supabaseUrl, supabaseKey);
    
    // CORRECTED LEGACY: Vector H&S (95%) + Keyword Regs (85%)
    logger.info('🔍 Starting LEGACY RAG (95% health-safety VECTOR + 85% regs KEYWORDS)');
    
    // Generate embedding for vector search
    console.log('🔍 Generating embedding for H&S vector search...');
    const queryEmbedding = await generateEmbeddingWithRetry(effectiveQuery, OPENAI_API_KEY);
    console.log('✅ Embedding generated, starting parallel RAG...');
    
    const [healthSafetyVectorResult, bs7671KeywordResult] = await Promise.all([
      // TIER 1: Health & Safety Knowledge - HYBRID VECTOR+KEYWORD SEARCH (95% weight)
      (async () => {
        try {
          const { data, error } = await supabase.rpc('search_health_safety_hybrid', {
            query_embedding: queryEmbedding,  // REQUIRED for vector search
            query_text: effectiveQuery,        // For keyword search
            match_count: 12,
            scale_filter: null                 // Optional: filter by scale
          });
          
          if (error) {
            console.error('Health-safety hybrid search error:', error);
            return [];
          }
          
          // Fallback to keyword-only search if no results
          if (!data || data.length === 0) {
            console.warn('⚠️ Hybrid search returned 0 results, falling back to keyword search');
            
            const { data: fallbackData } = await supabase
              .from('health_safety_knowledge')
              .select('id, topic, content, source')
              .textSearch('content', effectiveQuery, { 
                type: 'websearch',
                config: 'english'
              })
              .limit(12);
              
            return (fallbackData || []).map((row: any) => ({
              ...row,
              hybrid_score: 0.6,
              search_method: 'fallback_keyword'
            }));
          }
          
          // Apply 95% weight to hybrid results
          return (data || []).map((row: any) => ({
            ...row,
            hybrid_score: (row.hybrid_score || row.similarity || 0.7) * 0.95, // 95% weight
            search_method: 'hybrid'
          }));
        } catch (error) {
          console.error('Health-safety search failed:', error);
          return [];
        }
      })(),
      
      // TIER 2: Regulations Intelligence - HYBRID SEARCH (90% weight)
      (async () => {
        try {
          const { data, error } = await supabase.rpc('search_regulations_intelligence_hybrid', {
            query_text: query,
            match_count: 10
          });
          
          if (error) {
            console.error('Regulations Intelligence search error:', error);
            return [];
          }
          
          // Apply 90% weight to regulations intelligence results
          return (data || []).map((row: any) => ({
            ...row,
            hybrid_score: (row.hybrid_score || 0.80) * 0.90, // 90% weight
            search_method: 'regulations_intelligence'
          }));
        } catch (error) {
          console.error('Regulations Intelligence search failed:', error);
          return [];
        }
      })()
    ]);

    // Process results
    const healthSafetyDocs = healthSafetyVectorResult || [];
    const regulationsData = bs7671KeywordResult || [];

    // Build knowledge object
    const hsKnowledge = {
      healthSafetyDocs: healthSafetyDocs.map((doc: any) => ({
        topic: doc.topic,
        content: doc.content,
        source: doc.source,
        scale: doc.scale,
        hybrid_score: doc.hybrid_score || doc.similarity
      })),
      regulations: regulationsData.map((reg: any) => ({
        regulation_number: reg.regulation_number,
        content: reg.content || reg.regulation_text,
        primary_topic: reg.primary_topic,
        keywords: reg.keywords,
        category: reg.category,
        hybrid_score: reg.hybrid_score || 0,
        source: 'regulations_intelligence'
      })),
      installationDocs: []
    };

    performanceMetrics.ragRetrieval = Date.now() - ragStartTime;

    logger.info('✅ H&S RAG complete (parallel vector+keyword)', {
      healthSafetyDocs: healthSafetyDocs.length,
      regulations: regulationsData.length,
      duration: performanceMetrics.ragRetrieval
    });
    
    // RAG Success Validation
    const totalRagResults = healthSafetyDocs.length + regulationsData.length;
    
    if (totalRagResults === 0) {
      logger.error('🚨 CRITICAL: ZERO RAG RESULTS - Cannot proceed safely');
      console.error('🚨 CRITICAL: ZERO RAG RESULTS - AI will hallucinate without knowledge base!');
      console.error('⚠️ Consider: 1) Check query keywords, 2) Verify database connectivity, 3) Inspect RPC functions');
      throw new Error('RAG retrieval failed - no knowledge base data available');
    }
    
    if (totalRagResults < 5) {
      logger.warn('⚠️ LOW RAG RESULTS - AI may generate generic hazards');
      console.warn(`⚠️ WARNING: Only ${totalRagResults} RAG results - AI may lack detailed context`);
    } else {
      logger.info(`✅ RAG Success: ${totalRagResults} documents retrieved`);
      console.log(`✅ RAG Success: ${totalRagResults} documents retrieved (${healthSafetyDocs.length} H&S + ${regulationsData.length} regulations)`);
    }
    
    // PHASE 2A: DIRECT search of regulations_intelligence for pre-structured hazards
    logger.info('🔍 Searching regulations_intelligence for hazards...');
    const { data: regulationHazards, error: regError } = await supabase
      .from('regulations_intelligence')
      .select('regulation_number, primary_topic, keywords, category, subcategory, applies_to')
      .contains('keywords', [
        'hazard', 'risk', 'protection', 'safety', 'shock', 'burn', 'fire', 
        'explosion', 'RCD', 'bonding', 'earthing', 'isolation'
      ])
      .or(`category.eq.Protection,category.eq.Safety,category.eq.Earthing`)
      .limit(20);

    if (!regError && regulationHazards) {
      logger.info(`✅ Found ${regulationHazards.length} pre-structured hazard regulations`);
      
      // Merge with existing RAG results (prioritize regulations_intelligence)
      hsKnowledge.regulations = [
        ...(regulationHazards || []).map(r => ({
          regulation_number: r.regulation_number,
          content: r.primary_topic,
          keywords: r.keywords,
          category: r.category,
          subcategory: r.subcategory,
          source: 'regulations_intelligence'
        })),
        ...(hsKnowledge.regulations || [])
      ].slice(0, 30); // Top 30 total
    }
    
    // PHASE 2B: Reuse BS 7671 regulations from Designer (filter for H&S relevant ones)
    const sharedRegs = sharedRegulations || [];
    if (sharedRegs.length >= 8) {
      logger.info('📦 Filtering shared regulations from Designer for H&S relevance');
      
      // Filter for H&S chapters: 41 (Protection), 70 (Special locations), 54 (Earthing), 531 (Devices)
      const hsRelevantRegs = sharedRegs.filter((r: any) => 
        /^(41|70|54|531)/.test(r.regulation_number)
      );
      
      if (hsRelevantRegs.length >= 3) {
        logger.info(`Reused ${hsRelevantRegs.length} regulations from Designer`);
        // Merge with RAG results
        hsKnowledge.regulations = [
          ...hsRelevantRegs,
          ...(hsKnowledge.regulations || [])
        ].slice(0, 15); // Top 15 unique
      }
    }
    
    performanceMetrics.ragRetrieval = Date.now() - ragStartTime;
    
    console.log('✅ [DIAGNOSTIC] RAG retrieval complete:', {
      duration: performanceMetrics.ragRetrieval,
      regulationsCount: hsKnowledge.regulations?.length || 0,
      healthSafetyDocsCount: hsKnowledge.healthSafetyDocs?.length || 0,
      installationDocsCount: hsKnowledge.installationDocs?.length || 0
    });
    
    logger.info('H&S knowledge retrieved', { 
      duration: performanceMetrics.ragRetrieval,
      resultsCount: hsKnowledge.regulations?.length || 0,
      avgScore: hsKnowledge.healthSafetyDocs?.length > 0 ? (hsKnowledge.healthSafetyDocs.reduce((s: number, k: any) => s + (k.hybrid_score || 0), 0) / hsKnowledge.healthSafetyDocs.length).toFixed(3) : 'N/A'
    });

    // Check if RAG is slow
    if (performanceMetrics.ragRetrieval > 5000) {
      logger.warn(`⚠️ SLOW RAG: ${performanceMetrics.ragRetrieval}ms (expected <3000ms)`);
    }

    // 🚀 WORLD-CLASS RAG V3: Retrieve PRE-STRUCTURED hazards
    console.log('🎯 [V3] Retrieving pre-structured hazards from knowledge base...');
    
    const { retrieveStructuredHazards } = await import('../_shared/hazard-retriever.ts');
    
    const structuredHazards = await retrieveStructuredHazards({
      jobDescription: effectiveQuery,
      workType: workType as 'domestic' | 'commercial' | 'industrial' || 'domestic',
      location: location,
      equipment: undefined, // Auto-detected from query
      installationPhases: ['isolation', 'installation', 'testing']
    }, supabase);
    
    console.log(`✅ [V3] Retrieved ${structuredHazards.length} pre-structured hazards`);
    
    logger.info('📊 RAG Effectiveness Check - Health & Safety', {
      totalStructuredHazards: structuredHazards.length,
      highConfidence: structuredHazards.filter(h => h.confidence_score > 0.7).length,
      avgConfidence: structuredHazards.length > 0 
        ? (structuredHazards.reduce((s, h) => s + h.confidence_score, 0) / structuredHazards.length).toFixed(3)
        : 'N/A',
      avgRiskScore: structuredHazards.length > 0
        ? (structuredHazards.reduce((s, h) => s + h.risk_score, 0) / structuredHazards.length).toFixed(1)
        : 'N/A',
      hazardCategories: [...new Set(structuredHazards.map(h => h.hazard_category))].join(', '),
      hasRichContext: structuredHazards.length >= 8,
      retrievalTime: Date.now() - ragStartTime,
      warningIfPoor: structuredHazards.length < 3 ? '⚠️ INSUFFICIENT RAG DATA - AI will generate generic hazards!' : null
    });
    
    // Build context from pre-structured hazards
    let hsContext: string;
    let structuredHazardsText = '';
    let optimizedRegContext = '';
    
    try {
      if (structuredHazards.length > 0) {
        // Build AI prompt with pre-structured hazards (90% of work already done!)
        structuredHazardsText = '\n\n📋 PRE-IDENTIFIED HAZARDS FROM BS 7671 ANALYSIS:\n\n';
        structuredHazardsText += `You have ${structuredHazards.length} pre-identified hazards with controls already determined.\n`;
        structuredHazardsText += 'Your task is to FORMAT these into the JSON structure. DO NOT invent new hazards.\n\n';
        
        structuredHazards.forEach((h, i) => {
          structuredHazardsText += `${i + 1}. HAZARD: ${h.hazard_description}\n`;
          structuredHazardsText += `   Category: ${h.hazard_category}\n`;
          structuredHazardsText += `   Risk: Likelihood ${h.likelihood} × Severity ${h.severity} = ${h.risk_score}\n`;
          structuredHazardsText += `   Controls: ${h.control_measures.join('; ')}\n`;
          if (h.required_ppe && Array.isArray(h.required_ppe) && h.required_ppe.length > 0) {
            structuredHazardsText += `   PPE Required: ${h.required_ppe.map((p: any) => p.type).join(', ')}\n`;
          }
          structuredHazardsText += `   Regulation: ${h.regulation_number} - ${h.regulation_section}\n`;
          structuredHazardsText += `   Linked to step: ${h.linkedToStep || 0}\n`;
          structuredHazardsText += `   Relevance: ${(h.relevance || 0).toFixed(1)}/100\n\n`;
        });
        
        // Condensed context for backward compatibility
        hsContext = structuredHazards
          .slice(0, 10) // Top 10 for context
          .map(h => `${h.hazard_category}: ${h.hazard_description} | Controls: ${h.control_measures.join(', ')}`)
          .join('\n\n');
          
        // Also build optimized regulation context (fallback)
        const { buildOptimizedRegulationContext } = await import('../_shared/regulation-helper.ts');
        optimizedRegContext = buildOptimizedRegulationContext(
          hsKnowledge.regulations || [],
          query
        );
      } else {
        // Fallback to old method if no structured hazards found
        console.log('⚠️ [V3] No structured hazards found, falling back to old method');
        const { buildOptimizedRegulationContext } = await import('../_shared/regulation-helper.ts');
        
        optimizedRegContext = buildOptimizedRegulationContext(
          hsKnowledge.regulations || [],
          query
        );
        
        hsContext = 'Apply general electrical safety best practices per HSE guidance and BS 7671.';
        structuredHazardsText = '';
      }
      
      console.log('✅ [V3] Context built successfully:', {
        structuredHazardsCount: structuredHazards.length,
        structuredHazardsTextLength: structuredHazardsText.length,
        hsContextLength: hsContext.length
      });
      
    } catch (contextError) {
      logger.error('Failed to build context - aborting', {
        error: contextError instanceof Error ? contextError.message : String(contextError),
        stack: contextError instanceof Error ? contextError.stack : undefined
      });
      throw new Error(`Context building failed: ${contextError instanceof Error ? contextError.message : String(contextError)}`);
    }

    // ✅ QUICK WIN #1: Build optimized context section with pre-analyzed regulations
    let installKnowledge = '';
    let contextSection = '';
    
    // Add optimized regulation context (hazards + controls pre-extracted)
    if (optimizedRegContext.length > 0) {
      contextSection += '\n\n# RELEVANT REGULATIONS (Pre-analyzed for hazards)\n\n';
      contextSection += optimizedRegContext;
      contextSection += '\n\n⚠️ YOUR TASK: Select which hazards apply to this job and format into JSON.\n';
      contextSection += 'DO NOT create new hazards - use the pre-analyzed list above.\n\n';
    }
    
    // NEW: Parse installationSteps directly from body (preferred) or previousAgentOutputs
    const installationSteps = body.installationSteps || 
      previousAgentOutputs?.find((o: any) => o.agent === 'installer')?.response?.structuredData?.steps;
    
    if (installationSteps && Array.isArray(installationSteps)) {
      installKnowledge = '\n\n📋 INSTALLATION STEPS TO ASSESS FOR RISKS:\n';
      installKnowledge += '⚠️ CRITICAL: Link each hazard to its step number using linkedToStep field\n\n';
      
      installationSteps.forEach((step: any, idx: number) => {
        const stepNum = idx + 1;
        installKnowledge += `Step ${stepNum}: ${step.title || step.stepTitle || 'Untitled'}\n`;
        installKnowledge += `  Description: ${step.description || step.content || 'No description'}\n`;
        if (step.safetyRequirements && step.safetyRequirements.length > 0) {
          installKnowledge += `  Existing safety: ${step.safetyRequirements.join(', ')}\n`;
        }
        if (step.equipmentNeeded && step.equipmentNeeded.length > 0) {
          installKnowledge += `  Tools: ${step.equipmentNeeded.join(', ')}\n`;
        }
        installKnowledge += '\n';
      });
      
      installKnowledge += '⚠️ For each hazard you identify, set linkedToStep to the step number it applies to.\n';
      installKnowledge += '   Example: If "work at height" applies to step 2, set linkedToStep: 2\n';
      installKnowledge += '   General hazards (site access, welfare) should use linkedToStep: 0\n\n';
    } else if (previousAgentOutputs && previousAgentOutputs.length > 0) {
      const installerOutput = previousAgentOutputs.find((o: any) => o.agent === 'installer');
      const designerOutput = previousAgentOutputs.find((o: any) => o.agent === 'designer');
      
      if (installerOutput?.response?.structuredData?.steps) {
        const steps = installerOutput.response.structuredData.steps;
        installKnowledge = '\n\n📋 HIGH-LEVEL INSTALLATION STEPS (assess risks for each):\n\n';
        steps.forEach((step: any, idx: number) => {
          installKnowledge += `${idx + 1}. ${step.action || step.description}\n`;
          if (step.considerations) installKnowledge += `   → ${step.considerations}\n`;
        });
        installKnowledge += '\n';
      }
      
      contextSection += '\n\nWORK TO ASSESS FOR RISKS:\n';
      if (installerOutput?.response?.structuredData) {
        const inst = installerOutput.response.structuredData;
        contextSection += `INSTALLATION STEPS: ${inst.steps?.length || 0} steps\n`;
      }
      if (designerOutput?.response?.structuredData) {
        const d = designerOutput.response.structuredData;
        contextSection += `DESIGN: ${d.voltage}V, ${d.cableType}, ${d.environment}\n`;
      }
    }
    if (messages && messages.length > 0) {
      contextSection += '\n\nCONVERSATION HISTORY:\n' + messages.map((m: any) => 
        `${m.role === 'user' ? 'User' : 'Assistant'}: ${m.content}`
      ).slice(-5).join('\n');
      
      contextSection += '\n\n⚠️ CRITICAL INSTRUCTION - CONVERSATIONAL MODE:\n';
      contextSection += 'This is an ongoing conversation, NOT a standalone query. You MUST:\n';
      contextSection += '1. Reference previous messages naturally (e.g., "Right, for that shower circuit we discussed...")\n';
      contextSection += '2. Build on earlier risk assessments (e.g., "Since we already identified live working risks...")\n';
      contextSection += '3. Notice context changes (e.g., "Wait, the location changed from bathroom to kitchen...")\n';
      contextSection += '4. Respond like an experienced H&S adviser having a conversation, not filling out a form\n';
      contextSection += '5. If unsure what the user means, reference what was discussed to clarify\n';
    }


    logger.info('💭 THINKING: Identifying electrical hazards and risks');
    
    // Issue 7: Optimized system prompt from separate module
    const { buildOptimizedSystemPrompt } = await import('./system-prompt-optimized.ts');
    const systemPrompt = buildOptimizedSystemPrompt(hsContext, structuredHazardsText, installKnowledge);
    
    // DEPRECATED: Old verbose prompt (5000+ chars) replaced with optimized version
    const _oldSystemPrompt = `You are a UK electrical safety expert specialising in BS 7671:2018+A3:2024.

**REGULATION-GROUNDED RISK ASSESSMENT:**
Always ground your risk assessment in BS 7671:2018+A2:2022 requirements:
- Reference specific regulations (e.g., "Regulation 411.3.3 requires...")
- Cite applicable chapters (e.g., "Section 701 special locations...")
- Base hazard identification on electrical work requirements
- Connect control measures to regulatory compliance

**CRITICAL: ALL OUTPUT MUST BE IN UK ENGLISH**
- Use UK spellings: analysing (not analyzing), realise (not realize), categorise (not categorize), minimise (not minimize), organise (not organize), authorised (not authorized), recognised (not recognized)
- Use UK terminology: spillage (not spill), tap (not faucet), pavement (not sidewalk), metre (not meter for distance), labour (not labor), earthing (not grounding), consumer unit (not breaker panel)
- Use UK measurements: metres (not meters), litres (not liters), millimetres (not millimeters)
- Use UK phrases: "whilst" (not "while"), "amongst" (not "among"), "towards" (not "toward")
- Reference UK standards: BS 7671, BS EN ISO, HSE guidance, CDM Regulations
- Use UK trade terminology: spanner (not wrench), first fix (not rough-in), second fix (not trim-out)

YOUR ROLE: Produce BS 8800-compliant risk assessments with 5x5 matrix scoring.

KNOWLEDGE BASE (${hsKnowledge?.healthSafetyDocs?.length || 0} safety practices):
${hsContext}

${structuredHazards}

${installKnowledge}

**AI REASONING APPROACH:**
1. **Extract from RAG**: Start by converting each hazard category in "HAZARDS IDENTIFIED IN KNOWLEDGE BASE" into a detailed hazard entry
2. **Assess job specifics**: Consider the installation type, location, and conditions provided
3. **Add supplementary hazards**: If you identify additional risks not covered by RAG (e.g., asbestos in pre-2000 building, overhead power lines, public access areas), add those
4. **Expand controls**: Enhance RAG control measures with job-specific details (e.g., "30mA RCD" becomes "30mA Type A RCD to BS EN 61008-1 feeding bathroom circuit per Reg 701.411.3.3")

Your goal: Comprehensive risk assessment covering all hazards (RAG + supplementary), each with specific controls and regulation references.

**CRITICAL: STEP-BY-STEP REASONING PROTOCOL**

Before generating your risk assessment, you MUST work through this mental checklist:

PHASE 1: HAZARD INVENTORY (2-3 minutes of thinking)
□ List all installation steps provided (typically 5-12 steps)
□ For EACH step, identify 2-3 potential hazards
□ Consider building-specific factors:
  - Age: Pre-1950 = asbestos risk, Pre-2000 = hidden live cables
  - Location: Public space = crowd control, Heritage = structural sensitivity
  - Environment: Contamination, weather exposure, underground services
□ Add work-specific hazards:
  - Height: >2m = working at height regs, >5m = MEWP rescue planning
  - Electrical: Live work, three-phase, HV proximity
  - Confined space: Basements, roof voids, meter cupboards
□ Consider "what if" scenarios:
  - Equipment failure (MEWP breakdown at height)
  - Emergency response (first aid access, evacuation routes)
  - Environmental changes (weather deterioration during outdoor work)

PHASE 2: HAZARD COUNT VERIFICATION
Check your preliminary hazard count against job complexity:
□ Simple domestic (new build, ground level, single-phase): 10-12 hazards MINIMUM
□ Standard commercial (multi-circuit, some height, modern building): 12-15 hazards
□ Complex (3-phase, >2m height, occupied, older building): 15-18 hazards
□ Very complex (heritage, public space, contamination, >5m, multiple high risks): 18-25 hazards

**IF YOUR COUNT IS LOW:**
- Go back to Phase 1 and identify missing hazard categories
- Check: Have you considered manual handling? Vehicle movements? Lone working? Weather? Public interface? Emergency procedures?

PHASE 3: REGULATION LINKING
□ Every hazard MUST reference a specific regulation
□ Use precise citations:
  - "EWR 1989 Reg 4(3)" (not just "EWR 1989")
  - "WAHR 2005 Reg 6(3)" (not just "working at height")
  - "BS 7671 Section 411.3.3" (not just "BS 7671")
□ If unsure of regulation, use broader reference: "CDM 2015 Principal Designer Duty"

PHASE 4: PPE TAILORING
□ Identify ALL hazard types present: electrical, height, noise, dust, chemicals, confined space, manual handling
□ For EACH hazard type, specify required PPE with standards:
  - Electrical: Insulated gloves (BS EN 60903), Arc flash PPE (BS EN 61482)
  - Height: Full body harness (BS EN 361), Energy absorber (BS EN 355)
  - Respiratory: FFP3 mask (BS EN 149) for asbestos, Dust mask (FFP2) for general
  - Chemical: Nitrile gloves (BS EN 374) for oils/contaminants
□ PPE count MUST scale to job complexity: Simple=5-6, Standard=7-9, Complex=10-12

PHASE 5: LINKEDTOSTEP ACCURACY
□ Link each hazard to its installation step number
□ General site hazards use linkedToStep: 0 (vehicle movements, site access, welfare)
□ Step-specific hazards use linkedToStep: 1, 2, 3, etc.
□ Verify every hazard has a linkedToStep value (no null/undefined)

PHASE 6: RISK SCORE VALIDATION
□ Apply 5x5 matrix correctly: Likelihood (1-5) × Severity (1-5) = Risk Score (1-25)
□ Verify risk levels: 1-4=Low, 5-9=Medium, 10-14=High, 15-25=Very High
□ Check: Are high-severity hazards (electric shock, falls from height) scored 15-25?
□ Check: Are minor hazards (hand tools, minor cuts) scored 1-6?

**NOW GENERATE YOUR ASSESSMENT WITH THIS DEPTH APPLIED**

Remember: You are an experienced H&S adviser who thinks about what the client DIDN'T consider. Your job is to identify the hazards they would miss.

**CRITICAL: COMPREHENSIVE HAZARD IDENTIFICATION**
The structured hazards section above contains 8-18 verified hazard categories for this work.
You MUST create detailed hazard entries for ALL relevant categories.

**TARGET RISK COUNT - SCALE TO JOB COMPLEXITY:**

Simple Jobs (10-12 hazards):
- Single-phase domestic installation
- Standard socket circuits
- New build (no asbestos, clean site)
- Ground level work only
Example: "Replace consumer unit in new build flat, ground floor access"

Standard Jobs (12-15 hazards):
- Commercial single-phase work
- Multiple circuits or rooms
- Standard building (post-2000)
- Some height work (ladders, short scaffold)
Example: "Commercial kitchen rewire, 3 circuits, 2m height"

Complex Jobs (15-18 hazards):
- 3-phase installations
- Multiple work types (installation + testing + commissioning)
- Height work >2m (MEWP, scaffold)
- Occupied buildings with public access
- Older buildings (potential asbestos)
Example: "3-phase distribution board in 1980s office building, 4m height, occupied premises"

Very Complex Jobs (18-25 hazards):
- Industrial/heritage buildings (pre-1950)
- Live work + height work + confined space
- Public spaces (crowd control, restricted hours)
- Environmental factors (oil, chemicals, contaminated ground)
- Multiple high-severity hazards (asbestos, HV, structural)
Example: "Bus station external lighting at 5m height, 1943 building, oil/grit contamination, closed to public during works"

**CRITICAL THINKING REQUIRED:**
For each job, think like an experienced H&S adviser:
1. What could the client NOT have thought of? (e.g., asbestos in 1940s building, underground services, bat roosts)
2. What secondary hazards exist? (e.g., ladder work = manual handling of ladder, not just falls)
3. What environmental factors? (weather, contamination, wildlife, adjacent hazards)
4. What human factors? (lone working, fatigue, competence, communication)
5. What "what if" scenarios? (power loss, equipment failure, emergency access)

**EXAMPLE - THINK DEEPER:**
❌ BAD: "Electric shock - use PPE"
✅ GOOD: "Electric shock from inadvertent contact with concealed live conductors during chasing - Old buildings may have unsleeved cables buried in walls (pre-1960s practice). Control: Cable detection with CAT scanner before any penetration, assume all walls are live until proven dead, use GS38 voltage detector, insulated tools to IEC 60900"

Identify ALL significant hazards present - no minimum or maximum quota. Simple jobs may have 6-8 hazards, complex jobs may have 20-30. Quality over quantity - every hazard must be real, specific, and relevant to THIS job.

**HAZARD IDENTIFICATION PHILOSOPHY:**
Think like a senior H&S adviser who has seen the job before:
- Socket outlet in bedroom → 6-8 hazards (shock, drilling, dust, access, cables)
- Consumer unit replacement → 12-16 hazards (isolation, arc flash, weight, LOTO, testing)
- 3-phase motor in factory → 20-25 hazards (voltage, rotation, noise, machinery, permit-to-work)
- External supply upgrade → 25-30 hazards (DNO, underground, weather, traffic, depth)

Don't pad the list - if a hazard isn't genuinely present, don't include it.
Don't miss hazards - think 3 steps ahead of what the client would consider.

Example GOOD entry:
{
  "hazardNumber": 4,
  "hazard": "Electric shock from live conductors during isolation failure",
  "whoAffected": "Electricians, Labourers",
  "likelihood": 3,
  "severity": 5,
  "riskScore": 15,
  "riskLevel": "Very High",
  "controls": ["Follow BS 7671 Section 462 isolation", "LOTO on all sources", "Prove dead with GS38 voltage indicator"],
  "regulation": "EWR 1989 Reg 4(3)",
  "linkedToStep": 2
}

Example BAD (too vague):
{
  "hazardNumber": 1,
  "hazard": "Electrical hazards",
  "controls": ["Use PPE"]
}

RISK MATRIX (5x5):
- Likelihood: 1=Rare, 2=Unlikely, 3=Possible, 4=Likely, 5=Almost Certain
- Severity: 1=Negligible, 2=Minor, 3=Moderate, 4=Major, 5=Catastrophic
- Risk Score = L × S (1-4: Low, 5-9: Medium, 10-14: High, 15-25: Very High)

INSTRUCTIONS:
1. CRITICAL: You will receive installation steps below - identify hazards for EACH SPECIFIC STEP
2. Use linkedToStep field to link hazards (e.g., step 1 uses linkedToStep: 1, step 2 uses linkedToStep: 2)
3. General site hazards (vehicle movements, site access, welfare facilities) should use linkedToStep: 0
4. General hazards (linkedToStep: 0) will be automatically added to the site setup step
5. Extract hazards from knowledge base with specific regulations (e.g., "EWR 1989 Reg 4(3)", "WAHR 2005 Reg 6")
6. Apply control hierarchy: Elimination → Substitution → Engineering → Admin → PPE
7. Calculate BEFORE and AFTER risk scores to show control effectiveness
8. Reference emergency procedures (HSE INDG231 for shock, CO2 for electrical fires)
9. Include isolation per BS 7671 Section 462 with lock-off devices

**PPE REQUIREMENTS - CONTEXT IS CRITICAL:**
⚠️ CRITICAL: You MUST tailor PPE to the specific job. DO NOT use generic 5-item lists!

**MANDATORY PPE ANALYSIS PROCESS:**
1. Identify ALL hazards present (electrical, height, noise, dust, chemicals, confined space, etc.)
2. For EACH hazard, determine required PPE with specific standards
3. PPE list should match actual hazards - no artificial minimums:
   - Simple domestic socket: 5-7 items (if that's all that's needed)
   - Commercial distribution board: 7-10 items (based on actual risks)
   - Complex work (height + live + confined space): 10-15 items (comprehensive coverage)

**EXAMPLES BY JOB TYPE:**

Simple Domestic (5-6 PPE items):
- Safety helmet (BS EN 397) - MANDATORY
- Safety boots (BS EN ISO 20345 S3) - MANDATORY
- Safety glasses (BS EN 166) - MANDATORY
- Insulated gloves (BS EN 60903 Class 0) - MANDATORY
- High-visibility vest (EN ISO 20471 Class 2) - MANDATORY
- Knee pads (BS EN 14404) - RECOMMENDED if floor work

Complex Commercial 3-Phase (8-10 PPE items):
- Safety helmet (BS EN 397) - MANDATORY
- Safety boots (BS EN ISO 20345 S3) - MANDATORY
- Insulated gloves (BS EN 60903 Class 0) - MANDATORY for isolation
- Arc-rated gloves (BS EN 60903 Class 00) - MANDATORY for live work
- Arc flash suit (IEC 61482-2 Class 2) - MANDATORY if live 3-phase
- Face shield (BS EN 166) - MANDATORY for arc flash risk
- Safety glasses (BS EN 166) - MANDATORY
- High-visibility vest (EN ISO 20471 Class 2) - MANDATORY
- Voltage detector (GS38) - MANDATORY
- Insulated tools (IEC 60900) - MANDATORY

Work at Height (10-12 PPE items):
- Safety helmet with chin strap (BS EN 397) - MANDATORY
- Fall arrest harness (BS EN 361) - MANDATORY above 2m
- Energy absorbing lanyard (BS EN 355) - MANDATORY
- Tool lanyard - MANDATORY
- Safety boots with ankle support (BS EN ISO 20345 S3) - MANDATORY
- High-visibility vest (EN ISO 20471 Class 3) - MANDATORY
- Safety glasses (BS EN 166) - MANDATORY
- Insulated gloves (BS EN 60903 Class 0) - MANDATORY
- Work positioning belt (BS EN 358) - if required
- Rescue equipment - MANDATORY (rescue plan required)
- Mobile phone/radio - MANDATORY for lone working at height

Confined Space (12+ PPE items):
- Breathing apparatus (BS EN 137) - MANDATORY if O2 < 19.5%
- Multi-gas detector (calibrated) - MANDATORY
- Harness with retrieval line (BS EN 361) - MANDATORY
- Emergency rescue tripod - MANDATORY
- Safety helmet (BS EN 397) - MANDATORY
- Safety boots (BS EN ISO 20345 S3) - MANDATORY
- High-visibility coveralls (EN ISO 20471) - MANDATORY
- Safety glasses (BS EN 166) - MANDATORY
- Insulated gloves (BS EN 60903 Class 0) - MANDATORY
- Emergency lighting (ATEX rated if explosive atmosphere) - MANDATORY
- Communication system (radio/hands-free) - MANDATORY
- First aid kit (specific to confined space) - MANDATORY

**CRITICAL RULES:**
- Height work (>2m) → ADD fall arrest harness, tool lanyard, chin strap helmet
- 3-phase live work → ADD arc flash suit, face shield, arc-rated gloves
- Noise >85dB or power tools >2hrs → ADD ear defenders (mandatory: true)
- Dust/drilling → ADD FFP3 mask (mandatory: true if silica dust)
- Confined space → ADD BA, gas monitor, rescue equipment
- Outdoor site → ADD hi-vis Class 2 minimum
- Asbestos risk → ADD Category A PPE (full RPE, coveralls, decontamination)
- Live testing → ADD insulated tools, voltage detector, arc flash PPE

**NEVER:**
- Use the same 5-item list for all jobs
- Mark PPE as "RECOMMENDED" if regulations require it (use mandatory: true)
- Forget to add equipment-specific PPE (MEWP = harness, confined space = BA)

Set mandatory: true ONLY if the hazard is definitely present in this work.
Set mandatory: false for "nice to have" or situational PPE.

You MUST:
1. **ANALYZE the specific job description and hazards to determine appropriate PPE**
2. Extract exact PPE types, standards, and purposes from the knowledge base
3. Apply context-specific mandatory flags based on the actual work being done
4. Structure each PPE item with:
   - itemNumber: Sequential number (1, 2, 3...)
   - ppeType: Equipment name specific to this job (e.g., "Fall arrest harness with shock absorbing lanyard" not just "Harness")
   - standard: BS/EN standard (e.g., "BS EN 397", "BS EN 60903 Class 0", "BS EN 352-2", "IEC 61482-2")
   - mandatory: true ONLY if hazard definitely present; false for situational
   - purpose: Specific protection purpose including when it applies and why it's needed for THIS job
{
  "itemNumber": 7,
  "ppeType": "Respiratory protective equipment (FFP3 mask)",
  "standard": "BS EN 149 FFP3",
  "mandatory": true,
  "purpose": "Essential protection against asbestos fibres if ACMs are present or suspected on site."
}
{
  "itemNumber": 8,
  "ppeType": "Fall arrest harness",
  "standard": "BS EN 361",
  "mandatory": true,
  "purpose": "Mandatory fall protection when working at height >2m using MEWP or scaffold tower."
}

${contextSection}

Return comprehensive risk assessment with practical controls from the knowledge base.`;

    const userPrompt = `Provide a comprehensive risk assessment for:
${query}

${workType ? `Work Type: ${workType}` : ''}
${location ? `Location: ${location}` : ''}
${hazards ? `Known Hazards: ${hazards.join(', ')}` : ''}

Include all hazards, risk scores, safety controls, PPE requirements, and emergency procedures.`;

    // Step 4: Call AI with optimized timeout and error handling
    console.log('🤖 [DIAGNOSTIC] Preparing OpenAI call...');
    logger.info('💭 THINKING: Assessing likelihood and severity of identified hazards');
    logger.info('Starting AI call with timeout protection');
    
    // Add progress monitoring
    const aiGenerationStartTime = Date.now();
    let progressInterval: number | undefined;
    let heartbeatInterval: number | undefined; // ✅ Hoist to outer scope to fix cleanup bug
    
    let aiResult;
    try {
      // Start heartbeat to prevent "stuck job" false positives
      heartbeatInterval = setInterval(async () => {
        try {
          const jobId = body.jobId;
          if (jobId) {
            await supabase
              .from('rams_generation_jobs')
              .update({ 
                current_step: `AI processing H&S assessment... (${Math.floor((Date.now() - aiGenerationStartTime) / 1000)}s)`,
                progress: Math.min((body.currentProgress || 0) + 1, 95) // Increment slowly
              })
              .eq('id', jobId);
          }
        } catch (err) {
          console.warn('Heartbeat update failed (non-critical):', err);
        }
      }, 30000); // Every 30 seconds
      
      // Log progress every 30 seconds
      progressInterval = setInterval(() => {
        const elapsed = Math.round((Date.now() - aiGenerationStartTime) / 1000);
        console.log(`⏱️ [DIAGNOSTIC] AI call in progress: ${elapsed}s elapsed`);
        logger.info(`⏱️ AI call in progress: ${elapsed}s elapsed (timeout: 240s)`);
      }, 30000);
      
      const OPENAI_API_KEY = Deno.env.get('OPENAI_API_KEY');
      if (!OPENAI_API_KEY) {
        console.error('❌ [DIAGNOSTIC] OPENAI_API_KEY not configured');
        throw new Error('OPENAI_API_KEY not configured');
      }
      
      console.log('✅ [DIAGNOSTIC] OPENAI_API_KEY found');
      console.log('📤 [DIAGNOSTIC] Calling OpenAI GPT-5-mini with:', {
        model: 'gpt-5-mini-2025-08-07',
        max_tokens: 6000,
        systemPromptLength: systemPrompt.length,
        userPromptLength: userPrompt.length,
        timeout: '150s'
      });
      
      // ✅ FIX #3: Pre-call diagnostics to measure API performance
      const apiCallStart = Date.now();
      logger.info('📞 [DIAGNOSTIC] Initiating OpenAI API call...', {
        timestamp: new Date().toISOString(),
        schemaComplexity: {
          toolsCount: 1,
          hazardProperties: 11,
          ppeProperties: 5,
          maxTokens: 12000,
          timeout: 150000
        }
      });
      
      // ✅ DIRECT OPENAI CALL: 30k tokens, no wrapper, no fallback
      logger.info(`🚀 Calling OpenAI GPT-5-mini directly - 12k tokens, 150s timeout`);
      
      aiResult = await callOpenAI({
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: userPrompt }
        ],
        model: 'gpt-5-mini-2025-08-07',
        max_tokens: 12000, // ✅ CRITICAL FIX: Increased to prevent truncated JSON responses
        tools: [{
          type: 'function',
          function: {
            name: 'provide_safety_assessment',
            description: 'Provide comprehensive health & safety assessment for electrical installation work',
            // strict: true, // Removed - causes timeout with complex schemas
            parameters: {
              type: 'object',
              properties: {
                response: { type: 'string', description: 'Summary of the risk assessment in UK English' },
                // ✅ PHASE 2: FIXED TOOL SCHEMA - matches expected response structure
                hazards: {
                  type: 'array',
                  description: 'Array of identified hazards with risk scoring. MUST include 8-25 hazards based on job complexity.',
                  items: {
                    type: 'object',
                    properties: {
                      id: { type: 'string', description: 'Unique hazard ID (e.g. "hazard-1")' },
                      hazard: { type: 'string', description: 'Specific hazard description' },
                      linkedToStep: { type: 'number', description: '0=general, 1-N=specific step number' },
                      likelihood: { type: 'number', description: 'Likelihood score 1-5', minimum: 1, maximum: 5 },
                      severity: { type: 'number', description: 'Severity score 1-5', minimum: 1, maximum: 5 },
                      riskScore: { type: 'number', description: 'likelihood × severity' },
                      riskLevel: { type: 'string', enum: ['low', 'medium', 'high', 'very-high'] },
                      controlMeasure: { type: 'string', description: 'Control measures with regulations' },
                      residualLikelihood: { type: 'number', description: 'Post-control likelihood 1-5', minimum: 1, maximum: 5 },
                      residualSeverity: { type: 'number', description: 'Post-control severity 1-5', minimum: 1, maximum: 5 },
                      residualRisk: { type: 'number', description: 'residual likelihood × severity' },
                      residualRiskLevel: { type: 'string', enum: ['low', 'medium', 'high', 'very-high'] },
                      regulation: { type: 'string', description: 'Applicable UK regulation (e.g. EWR 1989 Reg 4(3))' }
                    },
                    required: ['id', 'hazard', 'linkedToStep', 'likelihood', 'severity', 'riskScore', 'riskLevel', 'controlMeasure', 'residualRisk', 'residualRiskLevel']
                  }
                },
                ppe: {
                  type: 'array',
                  description: 'Required PPE items with UK standards. MUST include 5-15 items based on actual hazards.',
                  items: {
                    type: 'object',
                    properties: {
                      itemNumber: { type: 'number', description: 'Sequential PPE item number' },
                      ppeType: { type: 'string', description: 'Specific PPE equipment name' },
                      standard: { type: 'string', description: 'BS/EN standard (e.g. BS EN 397)' },
                      mandatory: { type: 'boolean', description: 'True if required by regulation for this job' },
                      purpose: { type: 'string', description: 'Protection purpose and when it applies' }
                    },
                    required: ['itemNumber', 'ppeType', 'standard', 'mandatory', 'purpose']
                  }
                },
                emergencyProcedures: {
                  type: 'array',
                  description: 'Emergency procedures in UK English',
                  items: { type: 'string' }
                },
                complianceRegulations: {
                  type: 'array',
                  description: 'Applicable UK regulations',
                  items: { type: 'string' }
                }
              },
              required: ['response', 'hazards', 'ppe', 'emergencyProcedures', 'complianceRegulations'],
              additionalProperties: false
            }
          }
        }],
        tool_choice: { type: 'function', function: { name: 'provide_safety_assessment' } }
      }, OPENAI_API_KEY, 210000); // ✅ 210s timeout (3.5min) - 70s buffer over 140s average for reliability
      
      if (heartbeatInterval) clearInterval(heartbeatInterval); // ✅ Add null check
      if (progressInterval) clearInterval(progressInterval);
      performanceMetrics.aiGeneration = Date.now() - aiGenerationStartTime;
      
      // ✅ FIX #4: Post-call diagnostics with detailed timing
      const apiCallDuration = Date.now() - apiCallStart;
      logger.info('✅ [DIAGNOSTIC] OpenAI API call completed:', {
        apiCallMs: apiCallDuration,
        apiCallSeconds: Math.round(apiCallDuration / 1000),
        withinTimeout: apiCallDuration < 150000,
        tokensUsed: aiResult.usage?.total_tokens || 'unknown',
        totalDuration: performanceMetrics.aiGeneration,
        totalDurationSeconds: Math.round(performanceMetrics.aiGeneration / 1000)
      });
      
      logger.info(`✅ AI call completed in ${Math.round(performanceMetrics.aiGeneration / 1000)}s`);
      
      // Check if AI is slow
      if (performanceMetrics.aiGeneration > 45000) {
        console.warn(`⚠️ [DIAGNOSTIC] SLOW AI: ${performanceMetrics.aiGeneration}ms (expected <40000ms)`);
        logger.warn(`⚠️ SLOW AI: ${performanceMetrics.aiGeneration}ms (expected <40000ms)`);
      }
      
    } catch (aiError) {
      if (heartbeatInterval) clearInterval(heartbeatInterval); // ✅ Add null check
      if (progressInterval) clearInterval(progressInterval);
      performanceMetrics.aiGeneration = Date.now() - aiGenerationStartTime;
      
      console.error('❌ [DIAGNOSTIC] OpenAI call FAILED:', {
        duration: Math.round(performanceMetrics.aiGeneration / 1000),
        errorMessage: aiError instanceof Error ? aiError.message : String(aiError),
        errorType: aiError instanceof Error ? aiError.constructor.name : typeof aiError
      });
      
      logger.error(`❌ OpenAI call failed after ${Math.round(performanceMetrics.aiGeneration / 1000)}s`);
      logger.error('OpenAI call failed - NO FALLBACK', {
        error: aiError instanceof Error ? aiError.message : String(aiError),
        stack: aiError instanceof Error ? aiError.stack : undefined,
        promptLength: systemPrompt.length + userPrompt.length
      });
      
      // No fallback - surface error immediately
      throw aiError;
    }

    // ✅ PHASE 1 & 2: Parse standardized response structure
    console.log('📋 [DIAGNOSTIC] Parsing AI response...');
    console.log('🔍 [DIAGNOSTIC] AI result structure:', {
      hasToolCalls: !!aiResult.toolCalls,
      toolCallsLength: aiResult.toolCalls?.length,
      hasContent: !!aiResult.content,
      contentLength: aiResult.content?.length
    });
    
    const safetyResult = aiResult.toolCalls && aiResult.toolCalls.length > 0
      ? JSON.parse(aiResult.toolCalls[0].function.arguments)
      : JSON.parse(aiResult.content);

    // 🔍 DIAGNOSTIC: Log H&S standardized response structure
    console.log('🔎 HS standardizedResponse sample:', {
      hasData: !!safetyResult,
      hazards: safetyResult?.hazards?.length || 0,
      ppe: safetyResult?.ppe?.length || 0,
      emergencyProcedures: safetyResult?.emergencyProcedures?.length || 0,
      complianceRegulations: safetyResult?.complianceRegulations?.length || 0
    });

    console.log('✅ [DIAGNOSTIC] Safety result parsed:', {
      hasHazards: !!safetyResult.hazards,
      hazardsLength: safetyResult.hazards?.length,
      hasPPE: !!safetyResult.ppe,
      ppeLength: safetyResult.ppe?.length,
      hasPPEDetails: !!safetyResult.ppeDetails,
      ppeDetailsLength: safetyResult.ppeDetails?.length,
      hasEmergency: !!safetyResult.emergencyProcedures,
      emergencyLength: safetyResult.emergencyProcedures?.length,
      topLevelKeys: Object.keys(safetyResult)
    });

    logger.info('🔍 PHASE 1 & 2: Validating AI response structure', {
      hasHazards: !!safetyResult.hazards,
      hasPPE: !!safetyResult.ppe,
      hasPPEDetails: !!safetyResult.ppeDetails,
      hasEmergency: !!safetyResult.emergencyProcedures,
      topLevelKeys: Object.keys(safetyResult)
    });

    // ✅ PHASE 1: Hazards are now at TOP LEVEL (not nested in riskAssessment)
    const extractedHazards = safetyResult.hazards || [];
    
    console.log('🔢 [DIAGNOSTIC] Hazard extraction:', {
      extractedCount: extractedHazards.length,
      firstHazard: extractedHazards[0] ? {
        hazard: extractedHazards[0].hazard?.substring(0, 50),
        linkedToStep: extractedHazards[0].linkedToStep,
        likelihood: extractedHazards[0].likelihood,
        severity: extractedHazards[0].severity
      } : null
    });
    
    // 🚨 PHASE 1 FIX: Zero Hazards Bug - Immediate detection with retry capability
    if (extractedHazards.length === 0) {
      console.error('🚨 [DIAGNOSTIC] CRITICAL: AI generated ZERO hazards');
      
      logger.error('🚨 PHASE 1 CRITICAL: AI generated ZERO hazards', {
        hadToolCall: !!aiResult.toolCalls,
        hadHazardsArray: !!safetyResult.hazards,
        rawKeys: Object.keys(safetyResult),
        rawSample: JSON.stringify(safetyResult).substring(0, 500)
      });
      
      // Check if this is a structure issue or genuine empty response
      if (safetyResult.response && safetyResult.response.length > 100) {
        console.error('❌ [DIAGNOSTIC] AI generated text response but no structured hazards - schema validation failed');
        logger.error('AI generated text response but no structured hazards - schema validation failed');
      }
      
      throw new Error(`PHASE 1 ERROR: AI generated zero hazards. Schema validation: ${safetyResult.hazards ? 'array exists but empty' : 'hazards array missing'}`);
    }

    console.log(`✅ [DIAGNOSTIC] Extracted ${extractedHazards.length} hazards successfully`);
    logger.info(`✅ PHASE 1: Extracted ${extractedHazards.length} hazards from standardized response`);

    // ✅ PHASE 1: Validate and fix linkedToStep for all hazards (data integrity)
    let fixedCount = 0;
    extractedHazards.forEach((h: any) => {
      if (typeof h.linkedToStep !== 'number') {
        h.linkedToStep = 0; // Default to general hazard
        fixedCount++;
      }
    });
    
    if (fixedCount > 0) {
      logger.warn(`⚠️ PHASE 1: Fixed ${fixedCount}/${extractedHazards.length} hazards missing linkedToStep (set to 0)`);
    }

    logger.info('Risk assessment completed', {
      hazardsIdentified: safetyResult.riskAssessment?.hazards?.length,
      controlsApplied: safetyResult.riskAssessment?.controls?.length
    });

    // Simple quality logging - no quotas or validation
    const hazardCount = safetyResult.riskAssessment?.hazards?.length || 0;
    const ppeCount = safetyResult.riskAssessment?.ppeDetails?.length || 0;
    const jobComplexity = query?.length > 200 ? 'Complex' : 'Standard';

    logger.info('📊 Response Generated', {
      hazardsGenerated: hazardCount,
      ppeItems: ppeCount,
      jobComplexity
    });

    // Step 5: Build RAG preview from H&S knowledge
    const ragPreview = hsKnowledge?.healthSafetyDocs && hsKnowledge.healthSafetyDocs.length > 0
      ? hsKnowledge.healthSafetyDocs.slice(0, 5).map((item: any) => ({
          id: item.id,
          topic: item.topic || 'Safety Guidance',
          scale: item.scale,
          excerpt: (item.content || '').slice(0, 200) + '…'
        }))
      : [];

    const citations = ragPreview.map((r: any, i: number) => ({
      number: `H&S-${i + 1}`,
      title: r.topic || 'Safety Guidance'
    }));

    // ✅ PHASE 1: Build standardized response structure
    console.log('🏗️ [DIAGNOSTIC] Building standardized response structure...');
    
    // PHASE 2: Handle both 'ppe' and 'ppeDetails' field names for backward compatibility
    const ppeArray = safetyResult.ppe || safetyResult.ppeDetails || [];
    
    const standardizedResponse: HealthSafetyV3Response = {
      success: true,
      data: {
        hazards: extractedHazards.map((h: any, idx: number) => ({
          id: h.id || `hazard-${idx + 1}`,
          hazard: h.hazard,
          likelihood: h.likelihood,
          severity: h.severity,
          riskScore: h.riskScore,
          riskLevel: h.riskLevel,
          controlMeasure: h.controlMeasure,
          residualRisk: h.residualRisk || h.riskScore, // Fallback if missing
          residualRiskLevel: h.residualRiskLevel || h.riskLevel,
          linkedToStep: h.linkedToStep,
          regulation: h.regulation || ''
        })),
        ppe: ppeArray,
        emergencyProcedures: safetyResult.emergencyProcedures || [],
        complianceRegulations: safetyResult.complianceRegulations || []
      },
      metadata: {
        generationTimeMs: performanceMetrics.aiGeneration,
        hazardCount: extractedHazards.length,
        ppeCount: ppeArray.length,
        ragSourceCount: hsKnowledge?.healthSafetyDocs?.length || 0,
        aiModel: 'gpt-5-mini-2025-08-07',
        tokensUsed: aiResult.usage?.total_tokens
      }
    };

    console.log('✅ [DIAGNOSTIC] Response structure built:', {
      success: standardizedResponse.success,
      hazardCount: standardizedResponse.data.hazards.length,
      ppeCount: standardizedResponse.data.ppe.length,
      emergencyCount: standardizedResponse.data.emergencyProcedures.length,
      totalTimeMs: Date.now() - performanceMetrics.startTime
    });

    logger.info('✅ PHASE 1: Standardized response built', {
      hazardCount: standardizedResponse.data.hazards.length,
      ppeCount: standardizedResponse.data.ppe.length,
      emergencyCount: standardizedResponse.data.emergencyProcedures.length
    });

    // ✅ PHASE 1: Add backward-compatible structure for existing frontend
    const enrichedResponse = {
      ...standardizedResponse,
      structuredData: {
        riskAssessment: {
          hazards: standardizedResponse.data.hazards
        },
        ppeDetails: standardizedResponse.data.ppe,
        emergencyProcedures: standardizedResponse.data.emergencyProcedures,
        compliance: {
          regulations: standardizedResponse.data.complianceRegulations
        }
      }
    };

    logger.info('✅ PHASE 1: Response validated and ready for frontend');

    // Log RAG metrics for observability
    const totalTime = Date.now() - requestStart;
    const { error: metricsError } = await supabase.from('agent_metrics').insert({
      function_name: 'health-safety-v3',
      request_id: requestId,
      rag_time: ragStartTime ? Date.now() - ragStartTime : null,
      total_time: totalTime,
      regulation_count: hsKnowledge?.healthSafetyDocs?.length || 0,
      success: true,
      query_type: workType || 'general'
    });

    if (metricsError) {
      logger.warn('Failed to log metrics', { error: metricsError.message });
    }

    // Validate response structure before returning
    // ✅ Use standardized response data (already built and validated above)
    const validatedRiskAssessment = {
      hazards: standardizedResponse.data.hazards.sort((a, b) => (b.riskScore || 0) - (a.riskScore || 0)),
      controls: [], // Not used in Phase 1
      ppeDetails: standardizedResponse.data.ppe,
      emergencyProcedures: standardizedResponse.data.emergencyProcedures
    };

    // 📊 QUALITY METRICS: Log comprehensive generation stats
    const qualityMetrics = {
      hazardCount: validatedRiskAssessment.hazards.length,
      ppeCount: validatedRiskAssessment.ppeDetails.length,
      emergencyProcCount: validatedRiskAssessment.emergencyProcedures.length,
      controlsCount: validatedRiskAssessment.controls.length,
      avgRiskScore: validatedRiskAssessment.hazards.length > 0 
        ? (validatedRiskAssessment.hazards.reduce((sum, h) => sum + (h.riskScore || 0), 0) / validatedRiskAssessment.hazards.length).toFixed(1)
        : 0,
      highRiskCount: validatedRiskAssessment.hazards.filter(h => (h.riskScore || 0) >= 15).length,
      mandatoryPPECount: validatedRiskAssessment.ppeDetails.filter((p: any) => p.mandatory === true).length,
      totalResponseChars: JSON.stringify(safetyResult).length
    };

    logger.info('📊 Response Quality Metrics', {
      function: 'health-safety-v3',
      ...qualityMetrics,
      meetsMinimumStandards: qualityMetrics.hazardCount >= 8 && qualityMetrics.ppeCount >= 6
    });
    
    // ⚠️ QUALITY WARNING: Flag suspiciously low counts
    if (qualityMetrics.hazardCount < 8) {
      logger.warn(`⚠️ LOW HAZARD COUNT: ${qualityMetrics.hazardCount} hazards (expected 15-25 for industrial jobs)`);
    }
    if (qualityMetrics.ppeCount < 6) {
      logger.warn(`⚠️ LOW PPE COUNT: ${qualityMetrics.ppeCount} items (expected 8-12 for electrical work)`);
    }

    // ✅ PHASE 5: Validate response structure before returning
    try {
      if (!validatedRiskAssessment.hazards || !Array.isArray(validatedRiskAssessment.hazards)) {
        throw new Error('Invalid hazards structure');
      }
      
      if (validatedRiskAssessment.hazards.length === 0) {
        logger.error('🚨 AI generated zero hazards - aborting');
        throw new Error('AI generated no hazards - empty response');
      }

    if (!validatedRiskAssessment.ppeDetails || validatedRiskAssessment.ppeDetails.length === 0) {
      logger.error('🚨 AI generated zero PPE items - aborting');
      throw new Error('AI generated no PPE items - incomplete response');
    }

    if (!validatedRiskAssessment.emergencyProcedures || validatedRiskAssessment.emergencyProcedures.length === 0) {
      logger.warn('No emergency procedures specified, adding standard procedures');
      validatedRiskAssessment.emergencyProcedures = [
        "Isolate power supply in emergency",
        "Call 999 for electric shock incidents",
        "Ensure first aider location is known"
      ];
    }

    logger.info('Final validation complete', {
      hazardCount: validatedRiskAssessment.hazards.length,
      controlsCount: validatedRiskAssessment.controls.length,
      ppeCount: validatedRiskAssessment.ppeDetails.length,
      emergencyProcCount: validatedRiskAssessment.emergencyProcedures.length,
      hasAllRequiredData: true
    });

    // ✅ PHASE 1A: Build final response structure
    performanceMetrics.totalTime = Date.now() - performanceMetrics.startTime;
    const generationTimeMs = Date.now() - requestStart;
    const hazardCount = validatedRiskAssessment.hazards?.length || 0;
    const ppeCount = validatedRiskAssessment.ppeDetails?.length || 0;

    // Build final response (reusing standardizedResponse variable from line 1228)
    const finalResponse: HealthSafetyV3Response = {
      success: true,
      data: {
        hazards: validatedRiskAssessment.hazards.map((h: any, index: number) => ({
          id: h.id || `hazard-${index + 1}`,
          hazard: h.hazard,
          likelihood: h.likelihood,
          severity: h.severity,
          riskScore: h.riskScore || (h.likelihood * h.severity),
          riskLevel: h.riskLevel || calculateRiskLevel(h.likelihood * h.severity),
          controlMeasure: h.controlMeasure || h.controls?.[0]?.controlMeasure || '',
          residualRisk: h.residualRisk || Math.max(1, Math.floor((h.likelihood * h.severity) * 0.3)),
          residualRiskLevel: h.residualRiskLevel || 'low',
          linkedToStep: typeof h.linkedToStep === 'number' ? h.linkedToStep : 0,
          regulation: h.regulation
        })),
        ppe: validatedRiskAssessment.ppeDetails?.map((p: any, index: number) => ({
          itemNumber: p.itemNumber || index + 1,
          ppeType: p.ppeType,
          standard: p.standard,
          mandatory: p.mandatory !== false,
          purpose: p.purpose
        })) || [],
        emergencyProcedures: validatedRiskAssessment.emergencyProcedures || [],
        complianceRegulations: (validatedRiskAssessment.complianceRegulations || [])
      },
      metadata: {
        generationTimeMs,
        hazardCount,
        ppeCount,
        ragSourceCount: hsKnowledge?.healthSafetyDocs?.length || 0,
        aiModel: 'gpt-5-mini-2025-08-07',
        tokensUsed: safetyResult.tokensUsed,
        timingBreakdown: {
          queryEnhancement: performanceMetrics.queryEnhancement,
          ragRetrieval: performanceMetrics.ragRetrieval,
          aiGeneration: performanceMetrics.aiGeneration,
          totalTime: performanceMetrics.totalTime
        },
        contextSources,
        receivedFrom: previousAgentOutputs?.map((o: any) => o.agent).join(', ') || 'none'
      }
    };

    logger.info('✅ Standardized response built', {
      hazards: hazardCount,
      ppe: ppeCount,
      timeMs: generationTimeMs
    });

    console.log('🎉 [DIAGNOSTIC] SUCCESS - Returning response to client');
    console.log('📊 [DIAGNOSTIC] Final metrics:', {
      totalTimeMs: Date.now() - performanceMetrics.startTime,
      ragTimeMs: performanceMetrics.ragRetrieval,
      aiTimeMs: performanceMetrics.aiGeneration,
      hazardsFinal: hazardCount,
      ppeFinal: ppeCount
    });
    
    return new Response(
      JSON.stringify(finalResponse),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200 
      }
    );
    
    } catch (validationError) {
      logger.error('Response building failed', { 
        error: validationError instanceof Error ? validationError.message : String(validationError),
        hazardsAvailable: validatedRiskAssessment?.hazards?.length || 0
      });
      
      // Return structured error instead of crashing
      return new Response(
        JSON.stringify({
          success: false,
          error: 'Response validation failed',
          details: validationError instanceof Error ? validationError.message : String(validationError),
          partialData: validatedRiskAssessment?.hazards?.length > 0 ? {
            hazardCount: validatedRiskAssessment.hazards.length
          } : undefined
        }),
        {
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          status: 500
        }
      );
    }

  } catch (error) {
    console.error('💥 [DIAGNOSTIC] EDGE FUNCTION ERROR:', {
      errorMessage: error instanceof Error ? error.message : String(error),
      errorType: error instanceof Error ? error.constructor.name : typeof error,
      errorStack: error instanceof Error ? error.stack?.split('\n').slice(0, 3) : undefined,
      timeElapsed: Date.now() - requestStart
    });
    
    logger.error('Health & Safety V3 error', { error: error instanceof Error ? error.message : String(error) });
    
    const isTimeout = error instanceof Error && error.message.includes('timeout');
    
    return new Response(
      JSON.stringify({
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error',
        metadata: {
          generationTimeMs: Date.now() - requestStart,
          hazardCount: 0,
          ppeCount: 0,
          ragSourceCount: 0,
          aiModel: 'gpt-5-mini-2025-08-07',
          timedOut: isTimeout
        }
      }),
      {
        status: isTimeout ? 408 : 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      }
    );
  }
  })();

  // Race between execution and timeout
  try {
    console.log('⏳ [DIAGNOSTIC] Racing execution vs timeout (240s limit)...');
    return await Promise.race([executionPromise, timeoutPromise]);
  } catch (error) {
    console.error('⏱️ [DIAGNOSTIC] TIMEOUT REACHED:', {
      timeoutMs: EDGE_FUNCTION_TIMEOUT_MS,
      error: error instanceof Error ? error.message : String(error)
    });
    
    logger.error('Edge function timeout', { error });
    return new Response(
      JSON.stringify({
        success: false,
        error: 'Edge function timeout after 240s',
        metadata: {
          generationTimeMs: EDGE_FUNCTION_TIMEOUT_MS,
          hazardCount: 0,
          ppeCount: 0,
          ragSourceCount: 0,
          aiModel: 'gpt-5-mini-2025-08-07',
          timedOut: true
        }
      }),
      {
        status: 408,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      }
    );
  }
});
