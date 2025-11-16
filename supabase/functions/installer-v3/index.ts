// Simplified v5.0.0 - Reduced from 2,106 to ~850 lines
// Optimizations: Removed complex RAG logic, streamlined prompts, direct queries only

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
  debug: (msg: string, meta?: any) => console.debug(`[${requestId}] ${msg}`, meta ? JSON.stringify(meta) : '')
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
import { installerV3ToolSchema } from '../_shared/installer-v3-schema.ts';

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

// Response Interface
interface InstallerV3Response {
  success: boolean;
  data: {
    steps: Array<{
      id: string;
      stepNumber: number;
      title: string;
      description: string;
      safetyRequirements: string[];
      equipmentNeeded: string[];
      qualifications: string[];
      estimatedDuration: string;
      riskLevel: 'low' | 'medium' | 'high';
      dependencies?: string[];
      isCompleted?: boolean;
      linkedHazards?: string[];
      materialsNeeded?: string[];
    }>;
    toolsRequired: string[];
    materialsRequired: string[];
    practicalTips: string[];
    commonMistakes: string[];
    testingProcedures: Array<{
      testName: string;
      standard: string;
      procedure: string;
      acceptanceCriteria: string;
      certificateRequired?: string;
      regulationRef?: string;
    }>;
    competencyRequirements: {
      minimumQualifications: string[];
      supervision?: string;
      additionalTraining?: string[];
    };
    siteLogistics?: {
      isolationPoints: string[];
      accessRequirements: string;
      permitsRequired: string[];
      workingHours?: string;
    };
    regulatoryCitations: Array<{
      regulation: string;
      applicableToStep: number;
      requirement: string;
    }>;
  };
  metadata: {
    generationTimeMs: number;
    stepCount: number;
    totalEstimatedTime: string;
    difficultyLevel: string;
  };
  qualityMetrics?: {
    overallScore: number;
    ragDataUsed: {
      regulations: number;
      practicalProcedures: number;
      totalDocs: number;
    };
    extractionBreakdown: {
      toolsExtracted: number;
      materialsExtracted: number;
      regulationsReferenced: number;
    };
  };
  error?: string;
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  if (req.method === 'GET') {
    return new Response(
      JSON.stringify({ 
        status: 'healthy', 
        function: 'installer-v3-simplified',
        version: 'v5.0.0',
        timestamp: new Date().toISOString()
      }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 200 }
    );
  }

  const requestId = generateRequestId();
  const logger = createLogger(requestId);
  const startTime = Date.now();

  // Timeout protection (350s)
  const timeoutPromise = new Promise<Response>((_, reject) => {
    setTimeout(() => reject(new Error('Timeout after 350s')), 350000);
  });

  const executionPromise = (async (): Promise<Response> => {
    try {
      const body = await req.json();
      const { query, installationMethod, currentDesign, sharedRegulations } = body;

      // Validation
      if (!query || typeof query !== 'string' || query.trim().length === 0) {
        throw new ValidationError('query is required');
      }

      logger.info('🔧 Installer V3 Simplified', { 
        query: query.substring(0, 50),
        hasCircuitDesign: !!currentDesign?.circuits
      });

      // Get API keys
      const OPENAI_API_KEY = Deno.env.get('OPENAI_API_KEY');
      if (!OPENAI_API_KEY) throw new Error('OPENAI_API_KEY not configured');

      const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
      const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
      const supabase = createClient(supabaseUrl, supabaseKey);

      // === PHASE 1: SOPHISTICATED RPC-BASED RAG (Vector + Keyword Hybrid) ===
      const ragStart = Date.now();
      logger.info('🔍 RAG: Using sophisticated hybrid RPC functions (Practical Work + BS 7671)');

      // Query 1: Practical Work Intelligence via RPC (uses full query text)
      const { data: practicalData, error: practicalError } = await supabase.rpc(
        'search_practical_work_intelligence_hybrid',
        {
          query_text: query,  // Use FULL query, not extracted keywords
          match_count: 25,
          filter_trade: null
        }
      );

      if (practicalError) {
        logger.error('Practical work RPC error', { error: practicalError });
      }

      const practicalDocs = (practicalData || []).map(row => ({
        ...row,
        content: row.primary_topic || row.content,
        source: 'practical_work_intelligence'
      }));

      logger.info('🔍 Practical Work RAG Results', { 
        query: query.substring(0, 100),
        resultsCount: practicalDocs.length,
        avgScore: practicalDocs.length > 0 
          ? (practicalDocs.reduce((sum, d) => sum + (d.hybrid_score || 0), 0) / practicalDocs.length).toFixed(2)
          : 0,
        sampleTopics: practicalDocs.slice(0, 3).map(d => d.primary_topic)
      });

      // Query 2: BS 7671 Regulations Intelligence via RPC (uses full query text)
      const { data: regulationsData, error: regsError } = await supabase.rpc(
        'search_regulations_intelligence_hybrid',
        {
          query_text: query,  // Use FULL query
          match_count: 15
        }
      );

      if (regsError) {
        logger.error('Regulations RPC error', { error: regsError });
      }

      const regulationsDocs = (regulationsData || []).map(row => ({
        ...row,
        content: row.primary_topic || row.content,
        hybrid_score: row.hybrid_score || row.relevance_score || 0,
        source: 'regulations_intelligence'
      }));

      logger.info('🔍 Regulations RAG Results', { 
        query: query.substring(0, 100),
        resultsCount: regulationsDocs.length,
        avgScore: regulationsDocs.length > 0
          ? (regulationsDocs.reduce((sum, d) => sum + (d.hybrid_score || 0), 0) / regulationsDocs.length).toFixed(2)
          : 0,
        sampleRegulations: regulationsDocs.slice(0, 3).map(d => d.regulation_number)
      });

      const installKnowledge = [...practicalDocs, ...regulationsDocs];

      logger.info('✅ RAG Complete', {
        practical: practicalDocs.length,
        regulations: regulationsDocs.length,
        total: installKnowledge.length,
        duration: `${Date.now() - ragStart}ms`
      });

      // === PHASE 2: SIMPLIFIED CONTEXT FORMATTING (Plain text) ===
      const formatDoc = (doc: any): string => {
        let text = `${doc.primary_topic || doc.regulation_number}\n${doc.content}\n`;
        if (doc.tools_required?.length) text += `Tools: ${doc.tools_required.join(', ')}\n`;
        if (doc.materials_needed?.length) text += `Materials: ${doc.materials_needed.join(', ')}\n`;
        if (doc.bs7671_regulations?.length) text += `Regulations: ${doc.bs7671_regulations.join(', ')}\n`;
        return text + '\n';
      };

      const installContext = installKnowledge.map(formatDoc).join('');

      // === PHASE 3: SIMPLIFIED CIRCUIT CONTEXT (10 lines instead of 158) ===
      let circuitContext = '';
      if (currentDesign?.circuits?.length > 0) {
        circuitContext = `\nCIRCUIT DESIGN:\n${currentDesign.circuits.map((c: any) => 
          `${c.name}: ${c.cableSize}mm² cable, ${c.protectionDevice.rating}A ${c.protectionDevice.type}, ${c.installationMethod}`
        ).join('\n')}\n\nUSE THESE EXACT SPECS - focus on installation procedures only.\n`;
      }

      // === PHASE 4: STREAMLINED SYSTEM PROMPT (150 lines from 400) ===
      const systemPrompt = `You are a UK electrical installation specialist creating BS 7671:2018+A3:2024 compliant method statements.

**CORE RULES**:
1. UK English (metres, earthing, consumer unit, colours)
2. Extract from knowledge base - don't guess
3. Each step: 100-200 words, numbered sub-tasks, measurements, regulatory refs
4. Extract tools from knowledge base tool lists
5. Safety-critical steps must have specific tools
6. Testing: provide 3 essential tests (continuity, insulation, Zs)
7. Competency: specify qualifications (18th Edition, 2391)
8. Site logistics: isolation points, access, permits (if relevant)

**STEP COUNT REQUIREMENTS** (CRITICAL):
- **Minimum 8 steps** for any standard installation
- **Simple jobs** (single socket, light fitting): 8-10 steps
- **Standard jobs** (circuit installation, consumer unit change): 10-12 steps
- **Complex jobs** (rewires, multiple circuits, commercial): 12-15+ steps
- Break down work into logical phases: Planning/Preparation → Isolation → Installation → Testing → Certification
- Each phase should have multiple detailed steps (not just 1 step per phase)
- Include specific sub-tasks within each step to ensure thoroughness

**KNOWLEDGE BASE (${installKnowledge.length} procedures)**:
${installContext}

${circuitContext}

**EXTRACTION RULES**:
- ALWAYS extract tools from knowledge base tool lists
- Safety steps MUST include: Voltage indicator (GS38), Proving unit, Lock-off kit
- Testing steps MUST include: Insulation resistance tester, Multimeter
- Never invent generic tools when specific ones are in the knowledge base

**OUTPUT FORMAT**: Use the installMethod tool to structure your response with steps, testing procedures, competency requirements, and regulatory citations.`;

      // === PHASE 5: AI CALL WITH PROGRESS LOGGING (Simplified) ===
      const aiStart = Date.now();
      let progressInterval: number | undefined;

      try {
        // Simple progress logging every 30s
        progressInterval = setInterval(() => {
          const elapsed = Math.floor((Date.now() - aiStart) / 1000);
          logger.info(`AI generating (${elapsed}s elapsed)`);
        }, 30000);

        const aiResponse = await callOpenAI(
          {
            messages: [
              { role: 'system', content: systemPrompt },
              { role: 'user', content: query }
            ],
            model: 'gpt-5-mini',
            max_tokens: 24000,
            tools: [installerV3ToolSchema],
            tool_choice: { type: 'function', function: { name: 'provide_installation_guidance' } }
          },
          OPENAI_API_KEY,
          300000 // 5 min timeout
        );

        clearInterval(progressInterval);

        if (!aiResponse.toolCalls?.[0]?.function?.arguments) {
          throw new Error('No tool call in AI response');
        }

        const installResult = JSON.parse(aiResponse.toolCalls[0].function.arguments);
        const aiDuration = Date.now() - aiStart;

        logger.info('✅ AI Complete', {
          duration: `${aiDuration}ms`,
          steps: installResult.installationSteps?.length || 0,
          tests: installResult.testingProcedures?.length || 0
        });

        // === PHASE 6: CALCULATE QUALITY METRICS ===
        const toolsExtracted = installResult.installationSteps?.reduce((sum: number, step: any) => 
          sum + (step.tools?.length || 0), 0) || 0;
        const materialsExtracted = installResult.installationSteps?.reduce((sum: number, step: any) => 
          sum + (step.materials?.length || 0), 0) || 0;
        const regulationsReferenced = installResult.regulatoryCitations?.length || 0;

        const overallScore = Math.min(100, Math.round(
          (installKnowledge.length / 40 * 40) + // RAG coverage (40%)
          (toolsExtracted / (installResult.installationSteps?.length * 3) * 30) + // Tool extraction (30%)
          (regulationsReferenced / 5 * 30) // Regulation citation (30%)
        ));

        // === PHASE 7: BUILD RESPONSE ===
        const response: InstallerV3Response = {
          success: true,
          data: {
            steps: installResult.installationSteps || [],
            toolsRequired: [...new Set(installResult.installationSteps?.flatMap((s: any) => s.tools || []) || [])],
            materialsRequired: [...new Set(installResult.installationSteps?.flatMap((s: any) => s.materials || []) || [])],
            practicalTips: installResult.practicalTips || [],
            commonMistakes: installResult.commonMistakes || [],
            testingProcedures: installResult.testingProcedures || [],
            competencyRequirements: installResult.competencyRequirements || { minimumQualifications: ['18th Edition'] },
            siteLogistics: installResult.siteLogistics,
            regulatoryCitations: installResult.regulatoryCitations || []
          },
          metadata: {
            generationTimeMs: Date.now() - startTime,
            stepCount: installResult.steps?.length || 0,
            totalEstimatedTime: installResult.metadata?.totalEstimatedTime || 'Not specified',
            difficultyLevel: installResult.metadata?.difficultyLevel || 'Medium'
          },
          qualityMetrics: {
            overallScore,
            ragDataUsed: {
              regulations: regulationsDocs.length,
              practicalProcedures: practicalDocs.length,
              totalDocs: installKnowledge.length
            },
            extractionBreakdown: {
              toolsExtracted,
              materialsExtracted,
              regulationsReferenced
            }
          }
        };

        logger.info('✅ Installation method generated', {
          totalTime: `${response.metadata.generationTimeMs}ms`,
          qualityScore: overallScore
        });

        return new Response(
          JSON.stringify(response),
          { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 200 }
        );

      } finally {
        if (progressInterval) clearInterval(progressInterval);
      }

    } catch (error) {
      logger.error('Installer V3 error', { error });
      return handleError(error, logger);
    }
  })();

  return Promise.race([executionPromise, timeoutPromise]);
});
