// Deployed: 2025-10-28 - v4.3.0 AI Call Timeout & Zero Steps Detection
const EDGE_FUNCTION_TIMEOUT_MS = 240000; // 240s - increased for complex schema generation

import { serve } from '../_shared/deps.ts';
import {
  corsHeaders,
  createLogger,
  generateRequestId,
  handleError,
  ValidationError,
  createClient,
  generateEmbeddingWithRetry
} from '../_shared/v3-core.ts';

// Phase 1A: Standardized Response Interface (matches MethodStep from frontend)
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
    }>;
    toolsRequired: string[];
    materialsRequired: string[];
    practicalTips: string[];
    commonMistakes: string[];
  };
  metadata: {
    generationTimeMs: number;
    stepCount: number;
    totalEstimatedTime: string;
    difficultyLevel: string;
  };
  error?: string;
}
import { callOpenAI } from '../_shared/ai-providers.ts';
import { retrieveInstallationKnowledge } from '../_shared/rag-installation.ts';
import { enrichResponse } from '../_shared/response-enricher.ts';
import { suggestNextAgents, generateContextHint } from '../_shared/agent-suggestions.ts';

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

  // Timeout promise
  const timeoutPromise = new Promise<Response>((_, reject) => {
    setTimeout(() => {
      reject(new Error('Edge function timeout after 120s'));
    }, EDGE_FUNCTION_TIMEOUT_MS);
  });

  // Main execution promise
  const executionPromise = (async (): Promise<Response> => {
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
      logger.info('Calling RAG for installation knowledge');
      
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

      // Use intelligent RAG with Practical Work Intelligence as primary source
      const { intelligentRAGSearch } = await import('../_shared/intelligent-rag.ts');
      const ragResults = await intelligentRAGSearch({
        circuitType: installationMethod,
        searchTerms: expandedQuery.split(' ').filter(w => w.length > 3),
        expandedQuery,
        context: {
          agentType: 'installer',
          ragPriority: {
            practical_work: 95,   // PRIMARY - keyword hybrid, vector fallback if <5 results
            bs7671: 85,           // SECONDARY - keyword-only hybrid search
            health_safety: 0,
            design: 0,
            installation: 0,
            inspection: 0,
            project_mgmt: 0
          },
          minKeywordResults: 5,   // Trigger vector fallback if keyword < 5 results
          useVectorFallback: true // Enable vector search fallback for practical_work
        }
      });
      
      // TIER 1: Practical Work Intelligence (if available)
      const practicalWorkDocs = ragResults?.practicalWorkDocs || [];
      
      if (practicalWorkDocs.length >= 5) {
        installKnowledge = practicalWorkDocs;
        logger.info('✅ Using Practical Work Intelligence', { 
          count: practicalWorkDocs.length,
          avgScore: (practicalWorkDocs.reduce((s, d) => s + (d.similarity || 0), 0) / practicalWorkDocs.length).toFixed(2)
        });
      } else {
        // TIER 2: Fallback to Installation Knowledge RAG
        const installDocs = ragResults?.installationDocs || [];
        installKnowledge = installDocs;
        
        logger.info('⚠️ Using Installation Knowledge RAG (fallback)', { 
          count: installDocs.length,
          reason: `Insufficient Practical Work Intelligence (${practicalWorkDocs.length} < 5)`
        });
      }

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

    // PHASE 3: Build installation context - format based on source
    let installContext = '';
    
    if (installKnowledge && installKnowledge.length > 0) {
      // Check if it's Practical Work Intelligence (has primary_topic field)
      if (installKnowledge[0]?.primary_topic) {
        installContext = installKnowledge.map((pw: any) => 
          `**${pw.primary_topic}** (${pw.equipment_category || 'General'})\n` +
          `${pw.content}\n` +
          `${pw.tools_required?.length > 0 ? `Tools: ${pw.tools_required.join(', ')}\n` : ''}` +
          `${pw.bs7671_regulations?.length > 0 ? `Regulations: ${pw.bs7671_regulations.join(', ')}` : ''}`
        ).join('\n\n---\n\n');
      } else {
        // Installation Knowledge RAG format
        installContext = installKnowledge.map((inst: any) => 
          `${inst.topic}:\n${inst.content}`
        ).join('\n\n---\n\n');
      }
    } else {
      installContext = 'Apply general BS 7671 installation methods and best practices.';
    }

    logger.info('Installation context prepared', {
      contextLength: installContext.length,
      docsIncluded: installKnowledge.length,
      avgDocLength: installKnowledge.length > 0 
        ? Math.round(installContext.length / installKnowledge.length)
        : 0
    });

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

**PRIMARY KNOWLEDGE SOURCES:**
1. **Practical Work Intelligence** - Verified, enriched installation procedures from real-world scenarios
2. **BS 7671:2018+A3:2024 Regulations Intelligence** - Compliance requirements and testing standards
3. **Installation Knowledge Base (fallback)** - General installation guidance

PRACTICAL WORK INTELLIGENCE (YOU MUST USE THIS DATA FIRST):
${installContext}

${installContext.includes('Practical Work') || installContext.includes('Tools:') ? '' : 'NOTE: Limited Practical Work Intelligence available - using general installation knowledge'}

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

⚠️ CRITICAL: COMPREHENSIVE STEP DESCRIPTIONS REQUIRED
Each installation step MUST contain:
✓ Clear overview of what's being done (1 sentence)
✓ Bulleted or numbered sub-tasks showing the exact sequence (minimum 3-5 sub-tasks per step)
✓ Specific measurements extracted from knowledge base (e.g., "400mm clip spacing", "1.8m height", "16mm² cable")
✓ Quality/safety checkpoint at end of step
✗ Do NOT write single-sentence steps

BAD Example: "Install the consumer unit"
GOOD Example: "Install the consumer unit enclosure at 1.8m height from finished floor level:
• Mark fixing positions using a spirit level to ensure level installation
• Drill fixing holes using 5.5mm masonry bit for 50mm screws
• Insert wall plugs and secure unit with corrosion-resistant fixings
• Verify unit is plumb and secure before proceeding with cable entry
• Check clearances comply with BS 7671 Section 132.8 (minimum 300mm from water sources)"

📋 STRUCTURE YOUR RESPONSE:
1. **Acknowledge** (1-2 sentences) - Confirm what they're asking and show you understand the job
   Example: "Right, so you're looking at installing a shower circuit - 13kW load over 23m. That's a meaty cable run, let's break it down."

2. **Key Considerations** (2-4 bullets) - Critical things they must know BEFORE starting
   Example:
   - Circuit breaker: 40A Type B (13kW ÷ 230V = 56.5A, so 40A B-type won't nuisance trip on shower surge)
   - Cable size: 10mm² T&E (voltage drop: 3.2% at 23m - well within BS 7671's 5% limit)
   - Protection: 30mA RCD mandatory (bathroom circuit, Reg 701.411.3.3)

3. **Step-by-Step Guidance** - Practical installation sequence with EXACT values from knowledge base
   CRITICAL: Each step must have 3-5 sentences minimum with detailed sub-tasks
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

**CRITICAL: EXTRACT PROCEDURES FROM RAG KNOWLEDGE**
The installation knowledge database above contains verified step-by-step procedures.
You MUST:
1. Search the knowledge base for procedures matching this work type
2. Extract specific steps from RAG docs (e.g., "Clip spacing 400mm for horizontal runs")
3. Include exact measurements from knowledge base (don't guess or generalise)
4. Reference table numbers if cited in knowledge (e.g., "Table 4A2", "Table 4D5")
5. Each step should contain 5-10 sub-tasks extracted from RAG procedures

Example of extracting from RAG:
If knowledge base says: "Cable clips for 2.5mm² T&E: horizontal runs 400mm spacing (Table 4A2), vertical runs 550mm"
Your step should say: "Install cable clips at 400mm intervals for horizontal runs per Table 4A2 (for 2.5mm² T&E). For vertical runs, increase spacing to 550mm."

DO NOT write generic steps like "Install cable clips at appropriate spacing"
DO extract specific values: "400mm spacing", "1.8m height", "16mm² cable", "50mm screws"

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
    // Progress monitoring for long-running AI calls
    const aiCallStart = Date.now();
    const progressInterval = setInterval(() => {
      const elapsed = Math.floor((Date.now() - aiCallStart) / 1000);
      logger.info(`⏱️ AI call in progress: ${elapsed}s elapsed (timeout: 240s)`);
    }, 30000); // Log every 30 seconds

    let aiResult;
    try {
      const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
      const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
      const supabase = createClient(supabaseUrl, supabaseKey);
      
      // Start heartbeat to prevent "stuck job" false positives
      const heartbeatInterval = setInterval(async () => {
        try {
          const jobId = body.jobId;
          if (jobId) {
            await supabase
              .from('rams_generation_jobs')
              .update({ 
                current_step: `AI processing installation steps... (${Math.floor((Date.now() - aiCallStart) / 1000)}s)`,
                progress: Math.min((body.currentProgress || 0) + 1, 95)
              })
              .eq('id', jobId);
          }
        } catch (err) {
          console.warn('Heartbeat update failed (non-critical):', err);
        }
      }, 30000);
      
      logger.info('🚀 Calling OpenAI GPT-5-mini directly - 30k tokens, 240s timeout');
      
      aiResult = await callOpenAI({
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: userPrompt }
        ],
        model: 'gpt-5-mini-2025-08-07',
        max_tokens: 30000,
        tools: [{
        type: 'function',
        function: {
          name: 'provide_installation_guidance',
          description: 'Return comprehensive installation guidance. MUST extract specific measurements from the installation knowledge database.',
          // strict: true, // Removed - causes schema validation conflicts with nested optional fields
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
                    description: { 
                      type: 'string', 
                      description: 'COMPREHENSIVE step description in UK English (authorised, realise, organise, metres, whilst). MUST include: 1) Overview sentence, 2) Detailed sub-tasks as bullet points or numbered list, 3) Specific measurements/values from knowledge base where applicable (e.g., "400mm clip spacing", "1.8m height", "16mm² cable"), 4) Quality checks. Minimum 3-5 sentences or 80-150 words per step. Example format: "Install the consumer unit enclosure at 1.8m height from finished floor level:\n• Mark fixing positions using a spirit level to ensure level installation\n• Drill fixing holes using 5.5mm masonry bit for 50mm screws\n• Insert wall plugs and secure unit with corrosion-resistant fixings\n• Verify unit is plumb and secure before proceeding with cable entry"'
                    },
                     tools: { type: 'array', items: { type: 'string' }, description: 'Equipment needed for this step. CONTEXT-SPECIFIC tools for THIS EXACT PHASE only. Examples: Planning phase = drawings, camera, notepad. Procurement phase = supplier details, order forms (or "No special tools required"). Installation phase = drills, cables, fixings. Testing phase = test equipment. DO NOT list installation tools for planning/procurement phases. This maps to equipmentNeeded in the frontend.' },
                    materials: { type: 'array', items: { type: 'string' } },
                    safetyNotes: { type: 'array', items: { type: 'string', description: 'Safety requirements for this step. STEP-SPECIFIC safety requirements for THIS STEP ONLY (not general project safety). In UK English (authorised, organise, metres). If no specific safety requirements for this step, return empty array. Example: Planning phase should have NO or minimal safety notes. Installation/isolation phases MUST have specific requirements like "Isolation and lock-off required". This maps to safetyRequirements in the frontend.' } },
                    estimatedTime: { type: 'number', description: 'Estimated time in minutes for this step. This maps to estimatedDuration in the frontend.' }
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
              }
            },
            required: ['response'],
            additionalProperties: false
          }
        }
      }],
        tool_choice: { type: 'function', function: { name: 'provide_installation_guidance' } }
      }, OPENAI_API_KEY, 230000); // 230s timeout - increased for complex installations
      
      clearInterval(heartbeatInterval);
      clearInterval(progressInterval);
      logger.info(`✅ OpenAI call completed in ${Math.round((Date.now() - aiCallStart) / 1000)}s`);
      
    } catch (error) {
      clearInterval(heartbeatInterval);
      clearInterval(progressInterval);
      const elapsed = Math.round((Date.now() - aiCallStart) / 1000);
      logger.error(`❌ OpenAI call failed after ${elapsed}s`);
      
      // Check if timeout error - provide graceful fallback
      if (error instanceof Error && (error.message.includes('timeout') || error.message.includes('aborted'))) {
        logger.warn('⚠️ Timeout detected - returning minimal fallback response');
        
        // Return minimal viable response instead of throwing
        aiResult = {
          content: '',
          toolCalls: [{
            function: {
              name: 'provide_installation_guidance',
              arguments: JSON.stringify({
                response: `Installation guidance generation timed out after ${elapsed}s. This is a complex installation requiring detailed planning. Please try generating RAMS in phases:\n\n1. Generate RAMS for planning/procurement phase\n2. Generate RAMS for installation phase separately\n3. Generate RAMS for testing/commissioning separately`,
                installationSteps: [
                  {
                    step: 1,
                    title: 'Phase 1: Planning & Risk Assessment',
                    description: 'Due to complexity, break this installation into manageable phases:\n• Review site conditions and access requirements\n• Identify all hazards and create detailed risk assessments\n• Procure materials and equipment\n• Arrange for any specialist subcontractors\n• Verify isolation procedures with client',
                    tools: ['Site survey tools', 'Risk assessment templates'],
                    materials: ['As per detailed design'],
                    safetyNotes: ['Full site survey required before work commences'],
                    estimatedTime: 120
                  },
                  {
                    step: 2,
                    title: 'Phase 2: Installation Execution',
                    description: 'Execute installation in controlled phases:\n• Isolate supply and verify dead\n• Install equipment per manufacturer instructions\n• Maintain safe zones around work area\n• Document all work stages with photos\n• Test continuity at each stage',
                    tools: ['Standard electrician tools', 'Test equipment'],
                    materials: ['As specified'],
                    safetyNotes: ['Isolation and lock-off mandatory', 'Permit to work may be required'],
                    estimatedTime: 240
                  }
                ],
                practicalTips: [
                  'Complex installations benefit from phased RAMS generation',
                  'Consider creating separate RAMS for each work phase',
                  'Always verify isolation before starting work'
                ],
                commonMistakes: [
                  'Attempting to document entire complex job in single RAMS',
                  'Not breaking work into manageable phases'
                ],
                toolsRequired: ['Standard electrician toolset', 'Test equipment', 'PPE']
              })
            }
          }]
        };
        
        // Continue with parsing (don't throw)
      } else {
        // Non-timeout error - surface immediately
        logger.error('OpenAI call failed - non-timeout error', {
          error: error instanceof Error ? error.message : String(error),
          stack: error instanceof Error ? error.stack : undefined
        });
        throw error;
      }
    }

    // Parse OpenAI tool call response
    let installResult: any;
    
    if (aiResult.toolCalls && aiResult.toolCalls.length > 0) {
      // OpenAI tool calls - parse arguments
      installResult = JSON.parse(aiResult.toolCalls[0].function.arguments);
    } else if (aiResult.content) {
      // Direct content - parse as JSON
      try {
        const jsonStr = aiResult.content;
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

    // 🚨 CRITICAL: Validate non-zero steps immediately
    const steps = installResult.installationSteps || [];
    if (steps.length === 0) {
      logger.error('🚨 CRITICAL: AI generated ZERO steps', {
        hadToolCall: !!aiResult.toolCalls,
        hadInstallationSteps: !!installResult.installationSteps,
        rawSample: JSON.stringify(installResult).substring(0, 300)
      });
      throw new Error('AI generated zero installation steps - invalid response');
    }

    logger.info(`✅ Extracted ${steps.length} installation steps from AI response`);

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

    // Build standardized response
    const standardizedResponse: InstallerV3Response = {
      success: true,
      data: {
        steps: (installResult.installationSteps || []).map((step: any, index: number) => ({
          id: step.id || `step-${index + 1}`,
          stepNumber: step.step || step.stepNumber || index + 1,
          title: step.title || `Step ${index + 1}`,
          description: step.description || '',
          safetyRequirements: step.safetyNotes || step.safetyRequirements || [],
          equipmentNeeded: step.tools || step.equipmentNeeded || step.equipmentRequired || [],
          qualifications: [],
          estimatedDuration: step.estimatedTime ? `${step.estimatedTime} minutes` : '15-30 minutes',
          riskLevel: 'medium' as const,
          dependencies: [],
          isCompleted: false,
          linkedHazards: step.linkedHazards || []
        })),
        toolsRequired: installResult.toolsRequired || [],
        materialsRequired: installResult.materialsRequired || [],
        practicalTips: installResult.practicalTips || [],
        commonMistakes: installResult.commonMistakes || []
      },
      metadata: {
        generationTimeMs: timings.total,
        stepCount: installResult.installationSteps?.length || 0,
        totalEstimatedTime: installResult.totalEstimatedTime || 'Unknown',
        difficultyLevel: installResult.difficultyLevel || 'Medium',
        timingBreakdown: {
          cacheCheck: timings.cacheCheck,
          ragRetrieval: timings.ragRetrieval,
          aiGeneration: timings.aiGeneration,
          totalTime: timings.total
        }
      }
    };

    // Phase 5: Store in cache for 1 hour
    await supabase
      .from('rag_cache')
      .upsert({
        query_hash: queryHash,
        query_text: query.substring(0, 500),
        agent_name: 'installer-v3',
        results: standardizedResponse,
        created_at: new Date().toISOString(),
        expires_at: new Date(Date.now() + 60 * 60 * 1000).toISOString(),
        hit_count: 0
      });

    logger.info('Results cached', { queryHash, expiresIn: '1 hour' });

    return new Response(
      JSON.stringify(standardizedResponse),
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
    
    const isTimeout = error instanceof Error && error.message.includes('timeout');
    
    // User-friendly error messages based on error type
    const userMessage = isTimeout
      ? "Request took too long - please try again with a simpler query."
      : error instanceof Error && error.message.includes('embedding')
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
        requestId,
        metadata: {
          generationTimeMs: timings.total,
          stepCount: 0,
          totalEstimatedTime: 'Unknown',
          difficultyLevel: 'Unknown',
          timedOut: isTimeout
        }
      }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }, 
        status: isTimeout ? 408 : 500 
      }
    );
  }
  })();

  // Race between execution and timeout
  try {
    return await Promise.race([executionPromise, timeoutPromise]);
  } catch (error) {
    logger.error('Edge function timeout', { error });
    return new Response(
      JSON.stringify({
        success: false,
        error: 'Edge function timeout after 40s',
        metadata: {
          generationTimeMs: EDGE_FUNCTION_TIMEOUT_MS,
          stepCount: 0,
          totalEstimatedTime: 'Unknown',
          difficultyLevel: 'Unknown',
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
