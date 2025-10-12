// Deployed: 2025-10-11 21:30 UTC
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
      JSON.stringify({ status: 'healthy', function: 'installer-v3', requestId, timestamp: new Date().toISOString() }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 200 }
    );
  }

  const requestId = generateRequestId();
  const logger = createLogger(requestId, { function: 'installer-v3' });

  try {
    const body = await req.json();
    const { query, cableType, installationMethod, location, messages, previousAgentOutputs } = body;

    // Enhanced input validation
    if (!query || typeof query !== 'string' || query.trim().length === 0) {
      throw new ValidationError('query is required and must be a non-empty string');
    }
    if (query.length > 1000) {
      throw new ValidationError('query must be less than 1000 characters');
    }
    if (cableType && typeof cableType !== 'string') {
      throw new ValidationError('cableType must be a string');
    }
    if (installationMethod && typeof installationMethod !== 'string') {
      throw new ValidationError('installationMethod must be a string');
    }
    if (location && typeof location !== 'string') {
      throw new ValidationError('location must be a string');
    }

    logger.info('Installer V3 request received', { query: query.substring(0, 50), installationMethod });

    // Get API keys
    const OPENAI_API_KEY = Deno.env.get('OPENAI_API_KEY');
    if (!OPENAI_API_KEY) {
      throw new Error('OPENAI_API_KEY not configured');
    }

    const LOVABLE_API_KEY = Deno.env.get('LOVABLE_API_KEY');
    if (!LOVABLE_API_KEY) {
      throw new Error('LOVABLE_API_KEY not configured');
    }

    // Helper: Build context-enriched RAG query (Phase 2)
    const buildEnhancedInstallQuery = (query: string, method?: string): string => {
      const terms = [query];
      
      // Add installation method specifics
      if (method === 'clipped_direct') {
        terms.push('clip spacing cable support horizontal vertical BS 7671 Table 4A2');
      } else if (method === 'conduit') {
        terms.push('conduit installation bending radius cable pulling capacities');
      } else if (method === 'trunking') {
        terms.push('trunking cable capacity segregation fixing methods');
      } else if (method === 'buried') {
        terms.push('direct burial depth 600mm SWA cable protection warning tape');
      }
      
      // Add job type specifics
      if (/rewire|house wiring/.test(query)) {
        terms.push('first fix second fix cable routing notching joists');
        terms.push('consumer unit installation testing sequence');
      }
      if (/shower|bathroom/.test(query)) {
        terms.push('Section 701 bathroom zones IP rating supplementary bonding');
      }
      if (/EV|charger/.test(query)) {
        terms.push('Section 722 EV charging outdoor installation');
      }
      
      return terms.join(' ');
    };

    // Step 1: Generate embedding for installation knowledge search (with retry)
    logger.debug('Generating query embedding');
    const embeddingStart = Date.now();
    const enhancedQuery = buildEnhancedInstallQuery(query, installationMethod);
    const queryEmbedding = await generateEmbeddingWithRetry(enhancedQuery, OPENAI_API_KEY);
    logger.debug('Embedding generated', { duration: Date.now() - embeddingStart });

    // Step 2: Search installation knowledge database
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    const supabase = createClient(supabaseUrl, supabaseKey);

    logger.debug('Searching installation knowledge');

    let { data: installKnowledge, error: installError } = await supabase.rpc('search_installation_knowledge', {
      query_embedding: queryEmbedding,
      method_filter: installationMethod || null,
      source_filter: null,
      match_threshold: 0.55,  // Phase 2: Lower threshold for more results
      match_count: 12          // Phase 2: Increase match count
    });

    if (installError) {
      logger.warn('Installation search failed', { error: installError });
    }

    // Phase 2: Keyword fallback if vector search returns < 5 results
    if (!installKnowledge || installKnowledge.length < 5) {
      const keywords = ['clip spacing', 'cable support', 'installation method', 
                       'fixing', 'trunking', 'conduit', 'first fix', 'second fix',
                       'notching', 'drilling', 'cable routing', 'termination'];
      
      const relevantKeywords = keywords.filter(k => 
        query.toLowerCase().includes(k.split(' ')[0])
      );
      
      if (relevantKeywords.length > 0) {
        const { data: keywordResults } = await supabase
          .from('installation_knowledge')
          .select('*')
          .or(relevantKeywords.map(k => `content.ilike.%${k}%`).join(','))
          .limit(8);
        
        if (keywordResults) {
          installKnowledge = [
            ...(installKnowledge || []),
            ...keywordResults
          ].filter((v, i, a) => a.findIndex(t => t.id === v.id) === i);
          
          logger.info('Installation keyword fallback used', { 
            terms: relevantKeywords,
            found: keywordResults.length 
          });
        }
      }
    }

    // Step 3: Build installation context (Phase 2: Focused snippets)
    const installContext = installKnowledge && installKnowledge.length > 0
      ? installKnowledge.map((inst: any) => 
          `${inst.topic}: ${inst.content.substring(0, 400)}...`
        ).join('\n\n')
      : 'Apply general BS 7671 installation methods and best practices.';

    // Build conversation context with PREVIOUS WORK SUMMARY
    let contextSection = '';
    if (previousAgentOutputs && previousAgentOutputs.length > 0) {
      const designerOutput = previousAgentOutputs.find((o: any) => o.agent === 'designer');
      const costOutput = previousAgentOutputs.find((o: any) => o.agent === 'cost-engineer');
      
      contextSection += '\n\nPREVIOUS SPECIALIST OUTPUTS:\n';
      if (designerOutput?.response?.structuredData) {
        const d = designerOutput.response.structuredData;
        contextSection += `DESIGNER: ${d.cableSize} cable, ${d.circuitBreaker} breaker, ${d.installationMethod}\n`;
      }
      if (costOutput?.response?.structuredData) {
        const c = costOutput.response.structuredData;
        contextSection += `COST ENGINEER: Total £${c.totalCost}, ${c.materials?.length || 0} materials\n`;
      }
      contextSection += '\n\nFULL DATA:\n' + JSON.stringify(previousAgentOutputs, null, 2);
    }
    if (messages && messages.length > 0) {
      contextSection += '\n\nCONVERSATION HISTORY:\n' + messages.map((m: any) => 
        `${m.role === 'user' ? 'User' : 'Assistant'}: ${m.content}`
      ).slice(-5).join('\n');
    }

    const systemPrompt = `You are an expert UK Installation Specialist with 15+ years onsite experience.

Write in UK English (British spelling). Current date: September 2025.

🎯 YOUR ROLE: Translate electrical designs into PRACTICAL step-by-step installation guidance

INSTALLATION KNOWLEDGE DATABASE (${installKnowledge?.length || 0} verified guides):
${installContext}

⚠️ CRITICAL: Extract specific values from knowledge base above:
✓ If database states "Clip spacing 2.5mm² horizontal: 400mm" → use 400mm in your steps
✓ If database mentions "Notching joists: max 0.125× joist depth" → include exact fraction
✓ If database references "BS 7671 Table 4A2" → cite the table number
✗ Never use vague terms like "regular intervals" or "appropriate spacing"

📋 RESPONSE REQUIREMENTS:
1. **Be specific**: Use actual measurements from RAG (e.g., "400mm clip spacing", not "regular spacing")
2. **Reference regulations**: Cite BS 7671 section numbers from RAG
3. **Include practical tips**: Use field wisdom from knowledge base (e.g., "Label cables before termination")
4. **Anticipate problems**: Mention common mistakes from RAG (e.g., "Don't over-tighten terminals - max 1.2Nm")
5. **Quality checkpoints**: Add verification steps at each stage

${contextSection}

Respond using the tool schema provided. Each installation step must include all 7 required fields.`;

    const userPrompt = `Provide detailed installation guidance for:
${query}

${cableType ? `Cable Type: ${cableType}` : ''}
${installationMethod ? `Installation Method: ${installationMethod}` : ''}
${location ? `Location: ${location}` : ''}

Include step-by-step instructions, practical tips, and things to avoid.`;

    // Step 4: Call AI with universal wrapper
    logger.debug('Calling AI with wrapper');
    const { callAI } = await import('../_shared/ai-wrapper.ts');
    
    const aiResult = await callAI(LOVABLE_API_KEY!, {
      model: 'google/gemini-2.5-flash',
      systemPrompt,
      userPrompt,
      maxTokens: 1500,   // Phase 1: Reduce from 2000
      timeoutMs: 70000,  // Phase 1: Increase from 55000
      tools: [{
        type: 'function',
        function: {
          name: 'provide_installation_guidance',
          description: 'Return comprehensive installation guidance with safety and compliance focus. MUST extract specific measurements and values from the installation knowledge database provided in system prompt.',
          parameters: {
            type: 'object',
            properties: {
              response: {
                type: 'string',
                description: 'Comprehensive UK English explanation (200-300 words)'
              },
              installationSteps: {
                type: 'array',
                items: {
                  type: 'object',
                  properties: {
                    step: { type: 'number' },
                    title: { type: 'string' },
                    description: { type: 'string' },
                    tools: { type: 'array', items: { type: 'string' } },
                    materials: { type: 'array', items: { type: 'string' } },
                    safetyNotes: { type: 'array', items: { type: 'string' } },
                    estimatedTime: { type: 'number' }
                  },
                  required: ['step', 'title', 'description', 'tools', 'materials', 'safetyNotes', 'estimatedTime']
                },
                description: 'Step-by-step installation procedures'
              },
              practicalTips: {
                type: 'array',
                items: { type: 'string' },
                description: 'Practical field tips'
              },
              commonMistakes: {
                type: 'array',
                items: { type: 'string' },
                description: 'Common mistakes to avoid'
              },
              toolsRequired: {
                type: 'array',
                items: { type: 'string' },
                description: 'Required tools and equipment'
              },
              materialsRequired: {
                type: 'array',
                items: { type: 'string' },
                description: 'Required materials'
              },
              totalEstimatedTime: { type: 'number' },
              difficultyLevel: { type: 'string' },
              compliance: {
                type: 'object',
                properties: {
                  regulations: { type: 'array', items: { type: 'string' } },
                  inspectionPoints: { type: 'array', items: { type: 'string' } }
                }
              },
              suggestedNextAgents: {
                type: 'array',
                items: {
                  type: 'object',
                  properties: {
                    agent: { type: 'string' },
                    reason: { type: 'string' },
                    priority: { type: 'string', enum: ['high', 'medium', 'low'] }
                  },
                  required: ['agent', 'reason', 'priority']
                }
              }
            },
            required: ['response', 'installationSteps'],
            additionalProperties: false
          }
        }
      }],
      toolChoice: { type: 'function', function: { name: 'provide_installation_guidance' } }
    });

    const aiData = JSON.parse(aiResult.content);
    const toolCall = aiData.choices[0].message.tool_calls[0];
    const installResult = JSON.parse(toolCall.function.arguments);

    // Validate installationSteps structure - convert any strings to objects
    if (installResult.installationSteps && Array.isArray(installResult.installationSteps)) {
      const hasStringSteps = installResult.installationSteps.some((step: any) => typeof step === 'string');
      
      if (hasStringSteps) {
        logger.warn('Detected string steps in response - converting to structured objects');
        
        const structuredSteps: any[] = [];
        let currentStep: any = null;
        let stepNumber = 1;
        
        for (const item of installResult.installationSteps) {
          if (typeof item === 'string') {
            // If string ends with ":", it's a new step title
            if (item.trim().endsWith(':')) {
              if (currentStep) {
                structuredSteps.push(currentStep);
                stepNumber++;
              }
              currentStep = {
                step: stepNumber,
                title: item.replace(':', '').trim(),
                description: '',
                tools: [],
                materials: [],
                safetyNotes: [],
                estimatedTime: 15
              };
            } else if (currentStep) {
              // Append to description
              currentStep.description += (currentStep.description ? ' ' : '') + item.trim();
            }
          } else {
            // Already an object, use it directly
            if (currentStep) {
              structuredSteps.push(currentStep);
              stepNumber++;
            }
            structuredSteps.push({ ...item, step: stepNumber });
            currentStep = null;
            stepNumber++;
          }
        }
        
        if (currentStep) {
          structuredSteps.push(currentStep);
        }
        
        installResult.installationSteps = structuredSteps;
        logger.info('Converted string steps to structured format', { stepsCount: structuredSteps.length });
      }
    }

    logger.info('Installation guidance completed', {
      stepsCount: installResult.installationSteps?.length,
      estimatedTime: installResult.totalEstimatedTime
    });

    // Step 5: Return response - flat format for router/UI
    const { response, suggestedNextAgents, installationSteps, practicalTips, commonMistakes, toolsRequired, materialsRequired, totalEstimatedTime, difficultyLevel, compliance } = installResult;
    
    return new Response(
      JSON.stringify({
        response,
        structuredData: { installationSteps, practicalTips, commonMistakes, toolsRequired, materialsRequired, totalEstimatedTime, difficultyLevel, compliance },
        suggestedNextAgents: suggestedNextAgents || []
      }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200 
      }
    );

  } catch (error) {
    logger.error('Installer V3 error', { error: error instanceof Error ? error.message : String(error) });
    return handleError(error);
  }
});
