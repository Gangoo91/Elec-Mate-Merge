// Simplified v5.0.0 - Reduced from 2,106 to ~850 lines
// Optimizations: Removed complex RAG logic, streamlined prompts, direct queries only

import { serve } from '../_shared/deps.ts';
import {
  corsHeaders,
  createLogger,
  generateRequestId,
  handleError,
  ValidationError,
  createClient
} from '../_shared/v3-core.ts';
import { callOpenAI } from '../_shared/ai-providers.ts';
import { installerV3ToolSchema } from '../_shared/installer-v3-schema.ts';

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
  const logger = createLogger(requestId, { function: 'installer-v3' });
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

      // === PHASE 1: SIMPLIFIED RAG (Direct SQL only, 3-5 queries) ===
      const ragStart = Date.now();
      logger.info('🔍 RAG: Direct SQL queries (Practical Work 95% + Regulations 90%)');

      // Build focused search queries (3-5 max)
      const searchQueries = [query];
      if (installationMethod) searchQueries.push(`${installationMethod} installation`);
      searchQueries.push('safe isolation procedures BS 7671');
      if (/shower|ev|cooker/i.test(query)) searchQueries.push('high power installation');
      if (/outdoor|swa/i.test(query)) searchQueries.push('SWA cable glands');

      // Query 1: Practical Work Intelligence (limit 25)
      const { data: practicalData } = await supabase
        .from('practical_work_intelligence')
        .select('primary_topic, content, tools_required, materials_needed, bs7671_regulations, equipment_category')
        .ilike('primary_topic', `%${query}%`)
        .limit(25);

      const practicalDocs = (practicalData || []).map(row => ({
        ...row,
        hybrid_score: 0.95,
        source: 'practical_work_intelligence'
      }));

      // Query 2: Regulations Intelligence (limit 15)
      const { data: regulationsData } = await supabase
        .from('regulations_intelligence')
        .select('regulation_number, primary_topic, content, keywords, category')
        .contains('keywords', ['installation', 'cable', 'protection', 'wiring'])
        .limit(15);

      const regulationsDocs = (regulationsData || []).map(row => ({
        ...row,
        hybrid_score: 0.90,
        source: 'regulations_intelligence'
      }));

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
            tool_choice: { type: 'function', function: { name: 'installMethod' } }
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
          steps: installResult.steps?.length || 0,
          tests: installResult.testingProcedures?.length || 0
        });

        // === PHASE 6: CALCULATE QUALITY METRICS ===
        const toolsExtracted = installResult.steps?.reduce((sum: number, step: any) => 
          sum + (step.equipmentNeeded?.length || 0), 0) || 0;
        const materialsExtracted = installResult.steps?.reduce((sum: number, step: any) => 
          sum + (step.materialsNeeded?.length || 0), 0) || 0;
        const regulationsReferenced = installResult.regulatoryCitations?.length || 0;

        const overallScore = Math.min(100, Math.round(
          (installKnowledge.length / 40 * 40) + // RAG coverage (40%)
          (toolsExtracted / (installResult.steps?.length * 3) * 30) + // Tool extraction (30%)
          (regulationsReferenced / 5 * 30) // Regulation citation (30%)
        ));

        // === PHASE 7: BUILD RESPONSE ===
        const response: InstallerV3Response = {
          success: true,
          data: {
            steps: installResult.steps || [],
            toolsRequired: [...new Set(installResult.steps?.flatMap((s: any) => s.equipmentNeeded || []) || [])],
            materialsRequired: [...new Set(installResult.steps?.flatMap((s: any) => s.materialsNeeded || []) || [])],
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
      return handleError(error);
    }
  })();

  return Promise.race([executionPromise, timeoutPromise]);
});
