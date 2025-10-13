// Deployed: 2025-10-12 - Phase 1-5: World-Class RAG Enhancement
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
} from '../_shared/v3-core.ts';
import { retrieveInstallationKnowledge } from '../_shared/rag-installation.ts';
import { enrichResponse } from '../_shared/response-enricher.ts';

/**
 * Phase 3: Query Expansion - Add technical synonyms and variations
 */
function expandInstallQuery(query: string, method?: string): string[] {
  const variations = [query];
  
  // Technical synonyms for common terms
  if (/clip|support|fixing/i.test(query)) {
    variations.push(
      query.replace(/clip/gi, 'fixing'),
      query.replace(/support/gi, 'saddle'),
      query.replace(/fixing/gi, 'bracket')
    );
  }
  
  // Installation method variations
  if (method === 'clipped_direct') {
    variations.push('surface mounted cable', 'visible cable run', 'clip spacing Table 4A2');
  }
  if (method === 'conduit') {
    variations.push('enclosed wiring', 'protected cable run', 'bending radius');
  }
  if (method === 'trunking') {
    variations.push('cable trunking capacity', 'segregation requirements');
  }
  if (method === 'buried') {
    variations.push('direct burial 600mm', 'SWA cable protection', 'warning tape');
  }
  
  // Job type specifics
  if (/rewire|house wiring/i.test(query)) {
    variations.push('first fix cable routing', 'second fix termination', 'notching joists');
  }
  if (/shower|bathroom/i.test(query)) {
    variations.push('Section 701', 'bathroom zones', 'IP rating', 'supplementary bonding');
  }
  if (/EV|charger/i.test(query)) {
    variations.push('Section 722', 'EV charging installation', 'outdoor socket');
  }
  
  // BS 7671 table references
  if (/spacing|distance|interval/i.test(query)) {
    variations.push('Table 4A2 spacing requirements', 'cable support distances');
  }
  
  return [...new Set(variations)]; // Deduplicate
}

/**
 * Phase 5: Generate cache hash from query
 */
async function generateQueryHash(query: string, method?: string): Promise<string> {
  const cacheInput = `${query.toLowerCase().trim()}_${method || 'default'}`;
  const encoder = new TextEncoder();
  const data = encoder.encode(cacheInput);
  const hashBuffer = await crypto.subtle.digest('SHA-256', data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  // Health check endpoint
  if (req.method === 'GET') {
    const requestId = generateRequestId();
    return new Response(
      JSON.stringify({ 
        status: 'healthy', 
        function: 'installer-v3', 
        requestId, 
        timestamp: new Date().toISOString(),
        features: ['Phase 1: Claude Sonnet 4.5', 'Phase 2: Hybrid Search', 'Phase 3: Query Expansion', 'Phase 4: HNSW Index', 'Phase 5: Semantic Cache']
      }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 200 }
    );
  }

  const requestId = generateRequestId();
  const logger = createLogger(requestId, { function: 'installer-v3' });

  try {
    const body = await req.json();
    const { query, cableType, installationMethod, location, messages, previousAgentOutputs, sharedRegulations } = body;

    // PHASE 1: Query Enhancement
    const { enhanceQuery, logEnhancement } = await import('../_shared/query-enhancer.ts');
    const enhancement = enhanceQuery(query, messages || []);
    logEnhancement(enhancement, logger);
    const effectiveQuery = enhancement.enhanced;

    // Enhanced input validation
    if (!query || typeof query !== 'string' || query.trim().length === 0) {
      throw new ValidationError('query is required and must be a non-empty string');
    }
    if (query.length > 1000) {
      throw new ValidationError('query must be less than 1000 characters');
    }

    logger.info('🔧 Installer V3 invoked', { 
      query: effectiveQuery.substring(0, 50),
      enhanced: enhancement.addedContext.length > 0,
      installationMethod,
      hasSharedRegs: !!sharedRegulations?.length
    });

    // PHASE 3: Safety Guardian
    const { detectSafetyRequirements } = await import('../_shared/safety-guardian.ts');
    const safetyWarnings = detectSafetyRequirements(effectiveQuery, undefined, undefined, location);
    if (safetyWarnings.warningCount > 0) {
      logger.info(`⚠️ ${safetyWarnings.warningCount} installation warnings detected`);
    }

    // Get API keys
    const OPENAI_API_KEY = Deno.env.get('OPENAI_API_KEY');
    if (!OPENAI_API_KEY) {
      throw new Error('OPENAI_API_KEY not configured');
    }

    const LOVABLE_API_KEY = Deno.env.get('LOVABLE_API_KEY');
    if (!LOVABLE_API_KEY) {
      throw new Error('LOVABLE_API_KEY not configured');
    }

    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    const supabase = createClient(supabaseUrl, supabaseKey);

    // Phase 5: Check semantic cache first
    const queryHash = await generateQueryHash(query, installationMethod);
    const { data: cachedResult } = await supabase
      .from('rag_cache')
      .select('results, hit_count')
      .eq('query_hash', queryHash)
      .eq('agent_name', 'installer-v3')
      .gt('expires_at', new Date().toISOString())
      .single();

    if (cachedResult) {
      logger.info('RAG cache HIT - returning cached results', { queryHash });
      
      // Increment hit counter
      await supabase
        .from('rag_cache')
        .update({ hit_count: (cachedResult.hit_count || 0) + 1 })
        .eq('query_hash', queryHash);

      return new Response(
        JSON.stringify(cachedResult.results),
        { 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          status: 200 
        }
      );
    }

    logger.debug('RAG cache MISS - executing full pipeline', { queryHash });

    // Phase 3: Expand query with technical synonyms
    const queryVariations = expandInstallQuery(query, installationMethod);
    const expandedQuery = queryVariations.join(' ');
    
    logger.debug('Query expanded', { 
      original: query,
      variations: queryVariations.length,
      expanded: expandedQuery.substring(0, 100)
    });

    // Phase 4: Generate embedding with optimized text-embedding-3-small (already in v3-core.ts)
    const embeddingStart = Date.now();
    const queryEmbedding = await generateEmbeddingWithRetry(expandedQuery, OPENAI_API_KEY);
    logger.debug('Embedding generated', { duration: Date.now() - embeddingStart });

    // Use intelligent RAG with cross-encoder reranking
    const { intelligentRAGSearch } = await import('../_shared/intelligent-rag.ts');
    const ragResults = await intelligentRAGSearch({
      circuitType: installationMethod,
      searchTerms: expandedQuery.split(' ').filter(w => w.length > 3),
      expandedQuery
    });
    
    const installKnowledge = ragResults?.installationDocs || [];

    logger.info('Installation knowledge retrieved', {
      count: installKnowledge.length,
      avgScore: installKnowledge.length > 0
        ? (installKnowledge.reduce((s: number, k: any) => s + (k.finalScore || 0), 0) / installKnowledge.length).toFixed(3)
        : 'N/A'
    });

    // Build installation context with focused snippets (400 chars)
    const installContext = installKnowledge && installKnowledge.length > 0
      ? installKnowledge.map((inst: any) => 
          `${inst.topic}: ${inst.content.substring(0, 400)}...`
        ).join('\n\n')
      : 'Apply general BS 7671 installation methods and best practices.';

    // Build conversation context
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
    }
    if (messages && messages.length > 0) {
      contextSection += '\n\nCONVERSATION HISTORY:\n' + messages.map((m: any) => 
        `${m.role === 'user' ? 'User' : 'Assistant'}: ${m.content}`
      ).slice(-5).join('\n');
    }

    // Phase 1: Simplified system prompt (600 words vs 1500)
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
3. **Include practical tips**: Use field wisdom from knowledge base
4. **Anticipate problems**: Mention common mistakes from RAG
5. **Quality checkpoints**: Add verification steps at each stage

${contextSection}

Respond using the tool schema provided.`;

    const userPrompt = `Provide detailed installation guidance for:
${query}

${cableType ? `Cable Type: ${cableType}` : ''}
${installationMethod ? `Installation Method: ${installationMethod}` : ''}
${location ? `Location: ${location}` : ''}

Include step-by-step instructions, practical tips, and things to avoid.`;

    // Phase 1: Call AI with dual-provider support (Gemini default, Claude if ANTHROPIC_API_KEY set)
    const useAnthropicDirect = Deno.env.get('ANTHROPIC_API_KEY');
    const model = useAnthropicDirect ? 'claude-sonnet-4-20250514' : 'google/gemini-2.5-flash';
    
    logger.debug(`Calling ${model}`, { hasAnthropicKey: !!useAnthropicDirect });
    const { callAI } = await import('../_shared/ai-wrapper.ts');
    
    const aiResult = await callAI(LOVABLE_API_KEY!, {
      model,
      systemPrompt,
      userPrompt,
      maxTokens: 2600,   // Increased tokens for detailed responses
      timeoutMs: 70000,  // 70s timeout
      tools: [{
        type: 'function',
        function: {
          name: 'provide_installation_guidance',
          description: 'Return comprehensive installation guidance. MUST extract specific measurements from the installation knowledge database.',
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
                  required: ['step', 'title', 'description']
                }
              },
              practicalTips: {
                type: 'array',
                items: { type: 'string' }
              },
              commonMistakes: {
                type: 'array',
                items: { type: 'string' }
              },
              toolsRequired: {
                type: 'array',
                items: { type: 'string' }
              },
              compliance: {
                type: 'object',
                properties: {
                  regulations: { type: 'array', items: { type: 'string' } }
                }
              }
            },
            required: ['response', 'installationSteps', 'practicalTips'], // Phase 1: Simplified required fields
            additionalProperties: false
          }
        }
      }],
      toolChoice: { type: 'function', function: { name: 'provide_installation_guidance' } }
    });

    // Parse tool call response (handle both tool calls and JSON-in-content)
    let installResult: any;
    
    if (aiResult.toolCalls && aiResult.toolCalls.length > 0) {
      // OpenAI-style tool calls (from Gemini via gateway)
      installResult = JSON.parse(aiResult.toolCalls[0].function.arguments);
    } else if (aiResult.content) {
      // Anthropic direct or JSON-in-content response
      try {
        // Try to extract JSON from markdown code blocks
        const jsonMatch = aiResult.content.match(/```json\s*([\s\S]*?)\s*```/) || 
                         aiResult.content.match(/```\s*([\s\S]*?)\s*```/) ||
                         [null, aiResult.content];
        
        const jsonStr = jsonMatch[1] || aiResult.content;
        installResult = JSON.parse(jsonStr.trim());
      } catch (parseError) {
        logger.warn('Failed to parse AI content as JSON, using graceful fallback', { 
          error: parseError.message,
          contentPreview: aiResult.content.substring(0, 200)
        });
        
        // Graceful fallback with helpful guidance
        installResult = {
          response: 'Unable to process installation guidance at this time. Please provide more specific details about the installation method (e.g., "clipped direct", "conduit", "buried") and circuit requirements.',
          installationSteps: [
            {
              step: 1,
              title: 'Refine Query',
              description: 'Add installation method details (clipped direct, conduit, trunking, or buried) for accurate guidance.'
            },
            {
              step: 2,
              title: 'Include Circuit Details',
              description: 'Specify cable size, load type, and cable length for comprehensive installation steps.'
            }
          ],
          practicalTips: [
            'Always specify the installation method for precise clip spacing and derating factors',
            'Include cable length to get accurate voltage drop considerations'
          ]
        };
      }
    } else {
      throw new Error('No content or tool calls returned from AI');
    }

    logger.info('Installation guidance completed', {
      stepsCount: installResult.installationSteps?.length,
      tipsCount: installResult.practicalTips?.length
    });

    // Build RAG preview for UI display
    const ragPreview = installKnowledge.slice(0, 6).map(item => ({
      id: item.id,
      number: item.regulation_number || item.number,
      section: item.section,
      excerpt: (item.content || '').slice(0, 220) + '…'
    }));

    // Enrich response with UI metadata
    const enrichedResponse = enrichResponse(
      installResult,
      installKnowledge,
      'installation',
      { installationMethod, cableType, location }
    );

    // Build final response
    const finalResponse = {
      success: true,
      response: enrichedResponse.response,
      enrichment: enrichedResponse.enrichment,
      citations: enrichedResponse.citations,
      rendering: enrichedResponse.rendering,
      structuredData: {
        installationSteps: installResult.installationSteps || [],
        practicalTips: installResult.practicalTips || [],
        commonMistakes: installResult.commonMistakes || [],
        toolsRequired: installResult.toolsRequired || [],
        materialsRequired: installResult.materialsRequired || [],
        totalEstimatedTime: installResult.totalEstimatedTime,
        difficultyLevel: installResult.difficultyLevel,
        compliance: installResult.compliance
      },
      suggestedNextAgents: installResult.suggestedNextAgents || []
    };

    // Phase 5: Store in cache for 1 hour
    await supabase
      .from('rag_cache')
      .upsert({
        query_hash: queryHash,
        query_text: query.substring(0, 500),
        agent_name: 'installer-v3',
        results: finalResponse,
        created_at: new Date().toISOString(),
        expires_at: new Date(Date.now() + 60 * 60 * 1000).toISOString(), // 1 hour
        hit_count: 0
      });

    logger.info('Results cached', { queryHash, expiresIn: '1 hour' });

    // Log RAG metrics for observability
    const totalTime = Date.now() - requestId;
    await supabase.from('agent_metrics').insert({
      function_name: 'installer-v3',
      request_id: requestId,
      rag_time: embeddingStart ? Date.now() - embeddingStart : null,
      total_time: totalTime,
      regulation_count: installKnowledge?.length || 0,
      success: true,
      query_type: installationMethod || 'general'
    }).catch(err => logger.warn('Failed to log metrics', { error: err.message }));

    return new Response(
      JSON.stringify(finalResponse),
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
