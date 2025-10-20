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

  // Performance tracking
  const timings = {
    start: Date.now(),
    cacheCheck: 0,
    ragRetrieval: 0,
    aiGeneration: 0,
    total: 0
  };
  
  // Declare timing variables in function scope
  let embeddingStart: number | null = null;

  try {
    const body = await req.json();
    const { query, cableType, installationMethod, location, messages, previousAgentOutputs, sharedRegulations } = body;

    // Enhanced input validation BEFORE any processing
    if (!query || typeof query !== 'string' || query.trim().length === 0) {
      throw new ValidationError('query is required and must be a non-empty string');
    }
    if (query.length > 1000) {
      throw new ValidationError('query must be less than 1000 characters');
    }

    // PHASE 1: Query Enhancement (safe now that query is validated)
    const { enhanceQuery, logEnhancement } = await import('../_shared/query-enhancer.ts');
    const enhancement = enhanceQuery(query, messages || []);
    logEnhancement(enhancement, logger);
    const effectiveQuery = enhancement.enhanced;

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

    timings.cacheCheck = Date.now() - timings.start;

    if (cachedResult) {
      timings.total = Date.now() - timings.start;
      logger.info('RAG cache HIT - returning cached results', { 
        queryHash,
        performanceMs: timings.total
      });
      
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

    // PHASE 2: Check for shared knowledge from Designer
    let installKnowledge: any[] = [];
    
    if (body.agentContext?.sharedKnowledge?.installationDocs?.length >= 5) {
      installKnowledge = body.agentContext.sharedKnowledge.installationDocs;
      logger.info('📦 Reusing shared installation knowledge from Designer', {
        count: installKnowledge.length
      });
    } else {
      // Only call RAG if insufficient shared knowledge
      logger.info('RAG call needed - insufficient shared knowledge');
      
      // Phase 3: Expand query with technical synonyms
      const queryVariations = expandInstallQuery(query, installationMethod);
      const expandedQuery = queryVariations.join(' ');
      
      logger.debug('Query expanded', { 
        original: query,
        variations: queryVariations.length,
        expanded: expandedQuery.substring(0, 100)
      });

      // Phase 4: Generate embedding with optimized text-embedding-3-small (already in v3-core.ts)
      embeddingStart = Date.now();
      const queryEmbedding = await generateEmbeddingWithRetry(expandedQuery, OPENAI_API_KEY);
      logger.debug('Embedding generated', { duration: Date.now() - embeddingStart });

      // Use intelligent RAG with cross-encoder reranking
    const { intelligentRAGSearch } = await import('../_shared/intelligent-rag.ts');
      const ragResults = await intelligentRAGSearch({
        circuitType: installationMethod,
        searchTerms: expandedQuery.split(' ').filter(w => w.length > 3),
        expandedQuery,
        context: {
          ragPriority: {
            bs7671: 70,           // Medium - regulatory compliance
            design: 70,           // Medium - design context
            health_safety: 0,     // Skip - not relevant for installation
            installation: 95,     // HIGHEST - installation procedures and methods
            inspection: 0,        // Skip - not relevant for installation
            project_mgmt: 0       // Skip - not relevant for installation
          }
        }
      });
      
      installKnowledge = ragResults?.installationDocs || [];

      timings.ragRetrieval = Date.now() - timings.start - timings.cacheCheck;
    }

    // Close the else block from PHASE 2

    logger.info('Installation knowledge retrieved', {
      count: installKnowledge.length,
      avgScore: installKnowledge.length > 0
        ? (installKnowledge.reduce((s: number, k: any) => s + (k.finalScore || 0), 0) / installKnowledge.length).toFixed(3)
        : 'N/A',
      ragDuration: timings.ragRetrieval
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
      
      contextSection += '\n\n⚠️ CRITICAL INSTRUCTION - CONVERSATIONAL MODE:\n';
      contextSection += 'This is an ongoing conversation, NOT a standalone query. You MUST:\n';
      contextSection += '1. Reference previous messages naturally (e.g., "Right, for that 10kW shower we just designed...")\n';
      contextSection += '2. Build on earlier decisions (e.g., "Since we already sized 10mm² cable...")\n';
      contextSection += '3. Notice context changes (e.g., "Wait, you said 12m earlier but now 25m - let me recalculate...")\n';
      contextSection += '4. Respond like an experienced electrician having a conversation, not filling out a form\n';
      contextSection += '5. If unsure what the user means, reference what was discussed to clarify\n';
    }

    // Phase 1: Enhanced conversational system prompt with expert guidance
    const systemPrompt = `You are a master electrician with 20+ years of installation experience across residential, commercial, and industrial projects. You're chatting with a colleague who needs practical, on-site advice.

**CRITICAL: ALL OUTPUT MUST BE IN UK ENGLISH**
- Use UK spellings: realise (not realize), analyse (not analyze), minimise (not minimize), categorise (not categorize), organise (not organize), authorised (not authorized), recognised (not recognized), whilst (not while)
- Use UK terminology: earthing (not grounding), consumer unit (not breaker panel), metre (not meter for distance), spanner (not wrench), tap (not faucet)
- Use UK measurements: metres, millimetres, litres (not meters, millimeters, liters)
- Use UK phrases: "whilst" (not "while"), "amongst" (not "among"), "towards" (not "toward")
- Reference UK standards: BS 7671, BS EN ISO, HSE guidance, CDM Regulations
- Use UK trade terminology: first fix (not rough-in), second fix (not trim-out)

⚠️ CRITICAL: MATCH EQUIPMENT TO WORK PHASE
Each step has a distinct phase - match equipment accordingly:

PLANNING/SURVEY PHASES:
- Drawings, plans, site survey forms
- Camera for photos
- Notepad and pen
- CAT & Genny scanner (if applicable)
- Measuring tape
- NO installation tools needed yet!

PROCUREMENT/ORDERING PHASES:
- Supplier contact details
- Purchase orders/requisition forms
- Equipment specifications
- Budget approval documentation
- Or simply: "No special tools required - administrative task"

INSTALLATION PHASES (actual physical work):
- Drills, fixings, rawlplugs
- Cable installation tools
- Mounting equipment
- Power tools as needed

TESTING/COMMISSIONING PHASES:
- Voltage testers (GS38)
- Multi-function testers
- Insulation testers
- Test certificates

SHUTDOWN/ISOLATION PHASES:
- Lock-off kits
- Warning signs and tags
- Voltage indicators
- Proving unit

❌ WRONG: "Pre-start survey" with "Drill, dust extraction, PPE"
✅ RIGHT: "Pre-start survey" with "Site survey form, Camera, Measuring tape, CAT scanner"

❌ WRONG: "Order materials" with "Lock-off kit, Cable clips"
✅ RIGHT: "Order materials" with "Supplier pricing lists" OR "No special tools required"

⚠️ CRITICAL: STEP-SPECIFIC SAFETY REQUIREMENTS
For each step's safetyNotes array:
- Only include safety requirements SPECIFIC to that individual step
- If a step has no unique safety requirements, leave the array EMPTY (do not add generic requirements)
- Example: Planning/survey phase should have NO safety notes or minimal ones like "Review site hazards"
- Example: Isolation phase MUST have "Isolation and lock-off required", "Prove dead before work"
- Example: Installation phase should have specific requirements like "Dust extraction required", "Manual handling assessment"
- DO NOT repeat the same safety requirements across multiple steps

Current date: September 2025.

🎯 TONE & COMMUNICATION:
✅ Conversational: "Right, full rewire on a 3-bed - that's a solid week's work for two sparks..."
✅ Practical: Explain the WHY before the HOW (e.g., "We clip every 400mm on horizontal runs because anything wider risks cable sag and potential damage")
✅ Safety-First: Always highlight critical safety points (e.g., "Isolate and test dead before ANY cable work - this is non-negotiable")
❌ Avoid: Robotic lists without context, vague terms like "regular intervals" or "appropriate spacing"

📋 STRUCTURE YOUR RESPONSE:
1. **Acknowledge** (1-2 sentences) - Confirm what they're asking and show you understand the job
   Example: "Right, so you're looking at installing a shower circuit - 13kW load over 23m. That's a meaty cable run, let's break it down."

2. **Key Considerations** (2-4 bullets) - Critical things they must know BEFORE starting
   Example:
   - Circuit breaker: 40A Type B (13kW ÷ 230V = 56.5A, so 40A B-type won't nuisance trip on shower surge)
   - Cable size: 10mm² T&E (voltage drop: 3.2% at 23m - well within BS 7671's 5% limit)
   - Protection: 30mA RCD mandatory (bathroom circuit, Reg 701.411.3.3)

3. **Step-by-Step Guidance** - Practical installation sequence with EXACT values from knowledge base
   Use specific measurements: "Clip spacing for 10mm² horizontal run: 250mm (BS 7671 Table 4A2)"
   Include practical tips: "When notching joists, max depth is 1/8th joist depth (e.g., 25mm notch on 200mm joist) - Section 522.6.204"
   
4. **Safety Warnings** (always include) - Highlight risks
   Example:
   ⚠️ CRITICAL SAFETY:
   - Isolate supply at consumer unit and TEST DEAD before starting
   - Bathroom zones: NO socket outlets within 3m of bath/shower (Section 701.512.3)
   - Double-pole isolation switch required (pull-cord type, outside zones)

5. **Pro Tips** - Time-savers and common mistakes to avoid
   Example:
   💡 PRO TIPS:
   - Route cable INSIDE safe zones (150mm from corners, 150mm above/below accessories)
   - Label cables at both ends BEFORE termination (saves hours of tracing later)
   - Test continuity BEFORE plastering over cables

INSTALLATION KNOWLEDGE DATABASE (${installKnowledge?.length || 0} verified guides):
${installContext}

⚠️ CRITICAL: Extract specific values from knowledge base above:
✓ If database states "Clip spacing 2.5mm² horizontal: 400mm" → use 400mm in your steps
✓ If database mentions "Notching joists: max 0.125× joist depth" → include exact fraction
✓ If database references "BS 7671 Table 4A2" → cite the table number
✗ Never use vague terms like "regular intervals" or "appropriate spacing"

${contextSection}

Respond using the tool schema provided with conversational, practical guidance.`;

    const userPrompt = `Provide detailed installation guidance for:
${query}

${cableType ? `Cable Type: ${cableType}` : ''}
${installationMethod ? `Installation Method: ${installationMethod}` : ''}
${location ? `Location: ${location}` : ''}

Include step-by-step instructions, practical tips, and things to avoid.`;

    // Phase 1: Call AI with GPT-5 mini for superior reasoning
    const model = 'gpt-5-mini-2025-08-07';
    
    logger.debug(`Calling ${model}`);
    const { callAI } = await import('../_shared/ai-wrapper.ts');
    
    const aiResult = await callAI(OPENAI_API_KEY!, {
      model,
      systemPrompt,
      userPrompt,
      maxTokens: 10000,   // Increased tokens for detailed responses
      timeoutMs: 280000,  // 280 seconds = 4 min 40 sec (max safe timeout)
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
                description: 'Natural, conversational response IN UK ENGLISH ONLY (authorised not authorized, realise not realize, organise not organize, metres not meters, whilst not while). Reference previous messages naturally (e.g., "Right, for that 10mm² cable we discussed..."). As long as needed to answer thoroughly.'
              },
              installationSteps: {
                type: 'array',
                items: {
                  type: 'object',
                  properties: {
                    step: { type: 'number' },
                    title: { type: 'string' },
                    description: { type: 'string', description: 'Step description in UK English (authorised, realise, organise, metres, whilst)' },
                    tools: { type: 'array', items: { type: 'string' }, description: 'CONTEXT-SPECIFIC tools for THIS EXACT PHASE only. Examples: Planning phase = drawings, camera, notepad. Procurement phase = supplier details, order forms (or "No special tools required"). Installation phase = drills, cables, fixings. Testing phase = test equipment. DO NOT list installation tools for planning/procurement phases.' },
                    materials: { type: 'array', items: { type: 'string' } },
                    safetyNotes: { type: 'array', items: { type: 'string', description: 'STEP-SPECIFIC safety requirements for THIS STEP ONLY (not general project safety). In UK English (authorised, organise, metres). If no specific safety requirements for this step, return empty array. Example: Planning phase should have NO or minimal safety notes. Installation/isolation phases MUST have specific requirements like "Isolation and lock-off required".' } },
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
            required: ['response'],
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

    timings.aiGeneration = Date.now() - timings.start - timings.ragRetrieval - timings.cacheCheck;
    timings.total = Date.now() - timings.start;

    // IMPROVEMENT: Response Quality Validation
    const { validateResponse } = await import('../_shared/response-validation.ts');
    const validation = validateResponse(
      installResult.response,
      effectiveQuery,
      { installKnowledge, method: installationMethod }
    );

    if (!validation.isValid) {
      logger.warn('⚠️ Installation response validation issues', {
        issues: validation.issues.length
      });
    }

    logger.info('Installation guidance completed', {
      stepsCount: installResult.installationSteps?.length,
      tipsCount: installResult.practicalTips?.length,
      performanceMs: timings.total,
      validationConfidence: validation.confidence,
      breakdown: {
        cache: timings.cacheCheck,
        rag: timings.ragRetrieval,
        ai: timings.aiGeneration
      }
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

    // Build final response with performance metrics
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
      suggestedNextAgents: installResult.suggestedNextAgents || [],
      metadata: {
        performanceMs: timings.total,
        breakdown: timings,
        knowledgeCount: installKnowledge.length
      }
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
    const { error: metricsError } = await supabase.from('agent_metrics').insert({
      function_name: 'installer-v3',
      request_id: requestId,
      rag_time: embeddingStart ? Date.now() - embeddingStart : null,
      total_time: totalTime,
      regulation_count: installKnowledge?.length || 0,
      success: true,
      query_type: installationMethod || 'general'
    });

    if (metricsError) {
      logger.warn('Failed to log metrics', { error: metricsError.message });
    }

    return new Response(
      JSON.stringify(finalResponse),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200 
      }
    );

  } catch (error) {
    timings.total = Date.now() - timings.start;
    
    logger.error('Installer V3 error', { 
      error: error instanceof Error ? error.message : String(error),
      stack: error instanceof Error ? error.stack : undefined,
      performanceMs: timings.total
    });
    
    // User-friendly error messages based on error type
    const userMessage = error instanceof Error && error.message.includes('embedding')
      ? "I'm having trouble processing your query right now. Could you try rephrasing it?"
      : error instanceof Error && error.message.includes('cache')
      ? "Temporary storage issue - your request will still be processed, just might take a bit longer."
      : error instanceof Error && error.message.includes('API')
      ? "AI service temporarily unavailable. Please try again in a moment."
      : "Something went wrong on my end. The technical team has been notified. Please try again.";
    
    return new Response(
      JSON.stringify({
        success: false,
        error: userMessage,
        technicalError: error instanceof Error ? error.message : String(error),
        requestId
      }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 500 }
    );
  }
});
