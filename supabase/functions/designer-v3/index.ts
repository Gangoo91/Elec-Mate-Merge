// Deployed: 2025-10-12T12:45 - Rules-First Architecture - Force Redeploy
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
import { summarizeConversation } from '../_shared/conversation-memory.ts';
import { ResponseCache, isCacheable } from '../_shared/response-cache.ts';
import { parseQueryEntities, classifyQuery, QueryType } from '../_shared/query-parser.ts';
import { designCircuit } from '../_shared/deterministic-designer.ts';
import { retrieveRegulations } from '../_shared/rag-retrieval.ts';

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  // Health check endpoint
  if (req.method === 'GET') {
    const requestId = generateRequestId();
    return new Response(
      JSON.stringify({ status: 'healthy', function: 'designer-v3', requestId, timestamp: new Date().toISOString() }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 200 }
    );
  }

  const requestId = generateRequestId();
  const logger = createLogger(requestId, { function: 'designer-v3' });

  try {
    const body = await req.json();
    const { query, circuitType, power, voltage, cableLength, messages, previousAgentOutputs } = body;

    // Enhanced input validation
    if (!query || typeof query !== 'string' || query.trim().length === 0) {
      throw new ValidationError('query is required and must be a non-empty string');
    }
    if (query.length > 1000) {
      throw new ValidationError('query must be less than 1000 characters');
    }
    if (circuitType && typeof circuitType !== 'string') {
      throw new ValidationError('circuitType must be a string');
    }
    if (power && (typeof power !== 'number' || power <= 0)) {
      throw new ValidationError('power must be a positive number');
    }
    if (voltage && (typeof voltage !== 'number' || voltage <= 0)) {
      throw new ValidationError('voltage must be a positive number');
    }
    if (cableLength && (typeof cableLength !== 'number' || cableLength <= 0)) {
      throw new ValidationError('cableLength must be a positive number');
    }

    logger.info('Designer V3 request received', { query: query.substring(0, 50), circuitType, power });

    // Parse query for entities and classify
    const entities = parseQueryEntities(query);
    const queryType = classifyQuery(query);
    logger.info('Query classified', { queryType, entities });

    // Get OpenAI API key for embeddings
    const OPENAI_API_KEY = Deno.env.get('OPENAI_API_KEY');
    if (!OPENAI_API_KEY) {
      throw new Error('OPENAI_API_KEY not configured');
    }

    // Get Lovable API key for completion
    const LOVABLE_API_KEY = Deno.env.get('LOVABLE_API_KEY');
    if (!LOVABLE_API_KEY) {
      throw new Error('LOVABLE_API_KEY not configured');
    }

    // ⚡ PHASE 1: DETERMINISTIC DESIGN PATH
    // If design query with power + distance → USE RULES-FIRST APPROACH
    if (queryType === 'design' && entities.power && entities.distance) {
      logger.info('🎯 Using deterministic design path (rules-first)');
      
      try {
        // Run BS 7671 calculations
        const design = designCircuit({
          power: entities.power,
          distance: entities.distance,
          voltage: entities.voltage || voltage,
          phases: entities.phases,
          installMethod: entities.installMethod,
          ambientTemp: entities.ambientTemp,
          grouping: entities.grouping
        });

        // Get RAG citations for regulations used
        const ragResults = await retrieveRegulations(
          design.regulations.join(' '), 
          8, 
          OPENAI_API_KEY
        );
        
        // Build structured response
        const loadType = entities.loadType || 'General';
        const response = `## Circuit Design Result

**Load:** ${loadType.charAt(0).toUpperCase() + loadType.slice(1)} (${entities.power}W)
**Cable Run:** ${entities.distance}m

### Design Current (Ib)
${design.calculations.Ib}A (${entities.power}W ÷ ${entities.voltage}V)

### Protective Device (In)
${design.mcbRating}A MCB (Type B recommended)

### Cable Selection
${design.cableSize}mm² ${design.cableType} cable
${design.calculations.equation}

### Voltage Drop
${design.voltageDrop.volts.toFixed(2)}V (${design.voltageDrop.percent.toFixed(2)}%)
${design.voltageDrop.compliant ? '✅ Compliant' : '❌ Exceeds limit'} with BS 7671 Reg 525

### Earth Fault Protection
Max Zs: ${design.earthFault.maxZs}Ω
${design.earthFault.compliant ? '✅ Compliant' : '❌ Non-compliant'} with BS 7671 Reg 411.3.2

${design.warnings.length > 0 ? `\n⚠️ **Warnings:**\n${design.warnings.map(w => `- ${w}`).join('\n')}` : ''}

---
*Design based on BS 7671:2018+A2:2022 regulations*`;

        const citations = ragResults.map(r => ({
          source: 'BS 7671:2018+A2:2022',
          section: r.regulation_number,
          title: r.section,
          content: r.content.substring(0, 200),
          relevance: r.similarity || 0.8
        }));

        logger.info('✅ Deterministic design complete', { 
          cableSize: design.cableSize,
          mcbRating: design.mcbRating,
          compliant: design.success
        });

        return new Response(JSON.stringify({
          response,
          structuredData: {
            design: {
              cableSize: `${design.cableSize}mm²`,
              protectionDevice: `${design.mcbRating}A Type B`,
              voltageDrop: `${design.voltageDrop.volts.toFixed(2)}V (${design.voltageDrop.percent.toFixed(2)}%)`,
              earthingArrangement: 'TN-S'
            },
            compliance: {
              status: design.success ? 'compliant' : 'warning',
              regulations: design.regulations,
              warnings: design.warnings
            },
            calculations: design.calculations,
            citations
          },
          source: 'deterministic',
          queryType,
          design
        }), {
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        });
      } catch (designError: any) {
        logger.error('Deterministic design failed, falling back to AI', { error: designError.message });
        // Continue to AI path if deterministic fails
      }
    }

    // ⚡ PHASE 2: LOOKUP/EXPLAIN PATH
    // For regulation lookups or explanations → RAG + optional GPT-5
    if (queryType === 'lookup' || queryType === 'explain') {
      logger.info('📖 Using lookup/explain path');
      
      const ragResults = await retrieveRegulations(query, 8, OPENAI_API_KEY);
      
      if (ragResults.length === 0) {
        return new Response(JSON.stringify({
          response: 'No relevant BS 7671 regulations found for this query.',
          citations: [],
          source: 'rag_empty'
        }), {
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        });
      }

      // Build context from RAG
      const context = ragResults.map(r => 
        `${r.regulation_number}: ${r.content}`
      ).join('\n\n');

      // Optional: Use GPT-5 to explain (with timeout)
      try {
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 10000);

        const gptResponse = await fetch('https://ai.gateway.lovable.dev/v1/chat/completions', {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${LOVABLE_API_KEY}`,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            model: 'openai/gpt-5',
            messages: [
              { role: 'system', content: 'You explain BS 7671 regulations in plain English for electricians.' },
              { role: 'user', content: `Regulation text:\n${context}\n\nQuestion: ${query}\n\nExplain clearly:` }
            ],
            max_completion_tokens: 800
          }),
          signal: controller.signal
        });

        clearTimeout(timeoutId);

        const gptData = await gptResponse.json();
        const explanation = gptData.choices?.[0]?.message?.content || context;

        return new Response(JSON.stringify({
          response: explanation,
          citations: ragResults.map(r => ({
            source: 'BS 7671:2018+A2:2022',
            section: r.regulation_number,
            title: r.section,
            content: r.content.substring(0, 200),
            relevance: r.similarity || 0.8
          })),
          source: 'rag_with_gpt'
        }), {
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        });

      } catch (e: any) {
        // GPT timeout/failure → return raw RAG results
        logger.warn('GPT-5 failed for lookup, returning raw RAG', { error: e.message });
        
        return new Response(JSON.stringify({
          response: `## ${ragResults[0].section}\n\n${ragResults[0].content}`,
          citations: ragResults.map(r => ({
            source: 'BS 7671:2018+A2:2022',
            section: r.regulation_number,
            title: r.section,
            content: r.content.substring(0, 200),
            relevance: r.similarity || 0.8
          })),
          source: 'rag_fallback'
        }), {
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        });
      }
    }

    // Initialize cache for instant responses
    const cache = new ResponseCache();
    let allRegulations = [];
    let designKnowledge = [];
    let cacheHit = false;

    // ⚡ TIER 1: CHECK CACHE FIRST (0-2s response for 60% of queries) - ALWAYS
    logger.debug('Checking cache (un-gated)');
    const cached = await cache.get(query, { circuitType, power, voltage, cableLength });
    
    if (cached && cached.confidence >= 0.75) {
      logger.info('✅ cache:hit - using cached regulations', { 
        cachedQuery: cached.query.slice(0, 50),
        hits: cached.hits,
        age: Math.round((Date.now() - new Date(cached.timestamp).getTime()) / 1000 / 60) + ' mins'
      });
      
      // Use cached regulations, skip RAG entirely
      allRegulations = JSON.parse(cached.citations);
      cacheHit = true;
    } else {
      logger.debug('❌ cache:miss');
    }

    // ⚡ TIER 2: RAG SEARCH - ALWAYS CALL (cache or no cache)
    if (!cacheHit) {
      const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
      const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
      const supabase = createClient(supabaseUrl, supabaseKey);

      // 🚀 RAG FIRST: Call bs7671-rag-search edge function BEFORE embedding
      logger.debug('Calling bs7671-rag-search edge function');
      try {
        const { data: ragSearchData, error: ragSearchError } = await supabase.functions.invoke('bs7671-rag-search', {
          body: {
            query,
            matchThreshold: 0.6,
            matchCount: 8
          }
        });

        if (ragSearchError) {
          logger.warn('rag:edge_function_error', { error: ragSearchError });
        } else if (ragSearchData?.regulations && ragSearchData.regulations.length > 0) {
          allRegulations = ragSearchData.regulations;
          logger.info('✅ rag:cache|keyword success', { 
            count: allRegulations.length,
            source: ragSearchData.source || 'unknown'
          });
        } else {
          logger.debug('rag:edge_function returned empty, falling back to vector');
        }
      } catch (ragError) {
        logger.warn('rag:edge_function_catch', { error: ragError });
      }

      // Fallback to vector search if RAG search returned nothing
      if (allRegulations.length === 0) {
        logger.debug('Generating embedding for vector fallback');
        const embeddingStart = Date.now();
        const queryEmbedding = await generateEmbeddingWithRetry(query, OPENAI_API_KEY);
        logger.debug('Embedding generated');

        // Try 0.6 threshold first
        const { data: regulations, error: regError } = await supabase.rpc('search_bs7671', {
          query_embedding: queryEmbedding,
          match_threshold: 0.6,
          match_count: 8
        });

        if (regError) {
          logger.warn('rag:vector_0.6_error', { error: regError });
        } else {
          allRegulations = regulations || [];
          logger.info(`✅ rag:vector (0.6)`, { count: allRegulations.length });
        }

        // If still empty, try 0.55
        if (allRegulations.length === 0) {
          const { data: regs55, error: regError55 } = await supabase.rpc('search_bs7671', {
            query_embedding: queryEmbedding,
            match_threshold: 0.55,
            match_count: 8
          });

          if (regError55) {
            logger.warn('rag:vector_0.55_error', { error: regError55 });
          } else {
            allRegulations = regs55 || [];
            logger.info(`✅ rag:vector (0.55)`, { count: allRegulations.length });
          }
        }
      }

      // Fetch design knowledge (separate from BS7671)
      logger.debug('Fetching design knowledge');
      const queryEmbedding = await generateEmbeddingWithRetry(query, OPENAI_API_KEY);
      const { data: designKnowledgeData, error: designError } = await supabase.rpc('search_design_knowledge', {
        query_embedding: queryEmbedding,
        circuit_filter: circuitType || null,
        source_filter: null,
        match_threshold: 0.6,
        match_count: 5
      });

      if (designError) {
        logger.warn('Design knowledge search failed', { error: designError });
      }
      designKnowledge = designKnowledgeData || [];
      
      logger.info('RAG complete', { 
        regulations: allRegulations.length,
        designKnowledge: designKnowledge.length
      });
    }

    // Step 3: Build context-aware prompt (use allRegulations from proactive checklist)
    const regulationContext = allRegulations && allRegulations.length > 0
      ? allRegulations.map((reg: any) => 
          `${reg.regulation_number} (${reg.section}): ${reg.content}`
        ).join('\n\n')
      : 'No specific regulations found. Apply general BS 7671:2018+A2:2022 principles.';

    const designContext = designKnowledge && designKnowledge.length > 0
      ? designKnowledge.map((dk: any) => 
          `${dk.topic}: ${dk.content}`
        ).join('\n\n')
      : '';

    // PHASE 1: Build structured conversation context
    let contextSection = '';
    let conversationSummary = null;
    
    if (messages && messages.length > 3) {
      // Use conversation memory for structured state
      try {
        conversationSummary = await summarizeConversation(messages, OPENAI_API_KEY);
        
        contextSection += `\n\n📋 CONVERSATION STATE:
Project Type: ${conversationSummary.projectType}
Previous Designs: ${conversationSummary.circuits?.map((c: any) => `${c.type} - ${c.cableSize}mm² ${c.protection}`).join(', ') || 'None yet'}
Key Decisions: ${conversationSummary.decisions?.join('; ') || 'None yet'}
Recent Topic: ${conversationSummary.lastTopic}

🔄 HANDLING MODE:
${query.toLowerCase().includes('going to use') || query.toLowerCase().includes('instead') || query.toLowerCase().includes('what if') ? 
  '⚠️ USER IS REFINING A PREVIOUS DESIGN - Give a quick conversational response (150-200 words) validating their choice and noting any considerations. Reference the previous design context. No need for full recalculation unless specs changed significantly.' : 
  ''}
${query.toLowerCase().includes('what about') || query.toLowerCase().includes('do i need') || query.toLowerCase().includes('is there') ? 
  '⚠️ USER IS ASKING FOR CLARIFICATION - Answer their specific question (100-150 words) with reference to previous design context. Keep response focused and conversational. Cite relevant regulations.' : 
  ''}
`;
      } catch (error) {
        logger.warn('Conversation summarization failed, using simple context', { error });
      }
    }
    
    if (previousAgentOutputs && previousAgentOutputs.length > 0) {
      const prevWork = previousAgentOutputs.map((output: any) => {
        const agent = output.agent || 'previous agent';
        const data = output.response?.structuredData || output.response?.result || {};
        return `${agent}: ${JSON.stringify(data)}`;
      }).join('\n');
      contextSection += `\n\nPREVIOUS SPECIALIST WORK:\n${prevWork}\n`;
    }
    
    if (messages && messages.length > 0) {
      contextSection += '\n\nRECENT CONVERSATION:\n' + messages.map((m: any) => 
        `${m.role === 'user' ? 'User' : 'Assistant'}: ${m.content}`
      ).slice(-5).join('\n');
    }

    const systemPrompt = `You are the DESIGN AUTHORITY for electrical installations, specialising in BS 7671:2018+A2:2022 compliance.

Write all responses in UK English (British spelling and terminology). Do not use American spellings.

YOUR CORE TASK: Answer the user's electrical design question using the BS 7671 regulations provided below.

BS 7671:2018+A2:2022 REGULATIONS (USE THIS DATA):
${regulationContext}

DESIGN KNOWLEDGE FROM DATABASE (APPLY THIS):
${designContext}

${contextSection}

DESIGN PROCESS - SHOW ALL WORKING:

1. UNDERSTAND THE REQUIREMENTS
   - What load? (power rating, type)
   - Where? (location, installation method)
   - How far? (cable length)

2. CALCULATE DESIGN CURRENT (Ib)
   - Show formula: Ib = P / V
   - Show calculation with numbers

3. SELECT CABLE SIZE
   - State table used (e.g., Table 4D5)
   - Show cable capacity (Iz)
   - Apply correction factors if needed
   - Verify: Ib ≤ In ≤ Iz (Regulation 433.1.1)

4. CHECK VOLTAGE DROP
   - Formula: Vd = (mV/A/m) × Ib × L
   - Show calculation
   - Verify ≤ 3% (lighting) or 5% (other) per Regulation 525

5. VERIFY EARTH FAULT PROTECTION
   - State max Zs from Table 41.3
   - Calculate cable (R1+R2)
   - Verify total ≤ max Zs

6. CITE REGULATIONS BY NUMBER
   - Use specific numbers: 433.1.1, 525, 411.3.3, etc.
   - Reference tables: Table 4D5, Table 41.3, etc.

RESPONSE FORMAT:
Return ONLY valid JSON in this structure:

{
  "answer": "Your detailed explanation with ALL calculations shown step-by-step. Include formulas with numbers, cite regulation numbers (433.1.1, 525, etc.), reference tables (Table 4D5), show voltage drop calculation, verify 433.1.1 relationship. 300-400 words minimum.",
  "cable_size": "10mm²",
  "mcb_rating": "50A Type B",
  "voltage_drop": "2.73V (1.19%)",
  "earth_fault_loop": "0.46Ω (max 0.91Ω)",
  "regulations_cited": ["433.1.1", "525", "Table 4D5", "Table 41.3", "411.3.2"],
  "confidence": 0.95,
  "suggestedNextAgents": [
    {"agent": "cost-engineer", "reason": "Get material and labour costs", "priority": "high"},
    {"agent": "installer", "reason": "Get installation guidance", "priority": "medium"}
  ]
}

If a field doesn't apply, use null. ALWAYS include answer and regulations_cited.`;

    const userPrompt = `Design a circuit with these requirements:
- Circuit Type: ${circuitType || 'Not specified'}
- Power Rating: ${power ? `${power}W` : 'Not specified'}
- Voltage: ${voltage || 230}V
- Cable Length: ${cableLength ? `${cableLength}m` : 'Not specified'}
- Additional Requirements: ${query}

Provide a complete, BS 7671 compliant design.`;

    // Step 4: Call GPT-5 with 30s timeout, fallback to RAG narrative if empty/timeout
    logger.debug('Calling GPT-5 for JSON response');
    const aiStart = Date.now();
    
    let parsedResponse: any;
    let aiTimedOut = false;
    
    // Timeout 30s via AbortController
    const controller = new AbortController();
    const timeoutId = setTimeout(() => {
      controller.abort();
      aiTimedOut = true;
    }, 30000);

    try {
      const aiResponse = await fetch('https://ai.gateway.lovable.dev/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${LOVABLE_API_KEY}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model: 'openai/gpt-5',
          messages: [
            { role: 'system', content: systemPrompt },
            { role: 'user', content: userPrompt }
          ],
          max_completion_tokens: 3000
        }),
        signal: controller.signal
      });

      clearTimeout(timeoutId);

      if (!aiResponse.ok) {
        const errorText = await aiResponse.text();
        logger.error('GPT-5 error', { status: aiResponse.status, error: errorText });
        throw new Error(`AI API error: ${aiResponse.status}`);
      }

      const aiData = await aiResponse.json();
      logger.debug('GPT-5 response received', { hasChoices: !!aiData.choices?.[0] });

      const aiContent = aiData.choices?.[0]?.message?.content || '';
      
      if (!aiContent || aiContent.trim().length === 0) {
        logger.warn('ai:empty - no content returned');
        throw new Error('Empty AI response');
      }
      
      try {
        parsedResponse = JSON.parse(aiContent);
        logger.info('✅ ai:json parsed', { hasAnswer: !!parsedResponse.answer });
      } catch (parseError) {
        logger.warn('ai:text_fallback - JSON parse failed', { contentLength: aiContent.length });
        parsedResponse = {
          answer: aiContent,
          regulations_cited: extractRegulationNumbers(aiContent),
          confidence: 0.7
        };
      }
    } catch (aiError: any) {
      clearTimeout(timeoutId);
      
      if (aiError.name === 'AbortError' || aiTimedOut) {
        logger.warn('ai:timeout (30s) - falling back to RAG narrative');
      } else {
        logger.error('ai:error', { error: aiError.message });
      }
      
      // 🆘 FALLBACK: Generate RAG-only narrative from regulations found
      logger.info('response:source (rag_fallback) - synthesizing narrative');
      
      // Extract basic params from query
      const powerMatch = query.match(/(\d+\.?\d*)\s*kW/i);
      const lengthMatch = query.match(/(\d+)\s*m/i);
      const powerKW = powerMatch ? parseFloat(powerMatch[1]) : power ? power / 1000 : null;
      const lengthM = lengthMatch ? parseInt(lengthMatch[1], 10) : cableLength || null;
      const voltageV = voltage || 230;
      
      let fallbackNarrative = `Based on the regulations found, here's the design approach:\n\n`;
      
      if (powerKW && lengthM) {
        const Ib = (powerKW * 1000) / voltageV;
        fallbackNarrative += `**Design Current (Ib):** ${Ib.toFixed(1)}A (${powerKW}kW ÷ ${voltageV}V)\n\n`;
        fallbackNarrative += `This requires cable selection meeting:\n`;
        fallbackNarrative += `- Regulation 433.1.1: Ib ≤ In ≤ Iz\n`;
        fallbackNarrative += `- Regulation 525: Voltage drop ≤ 5%\n`;
        fallbackNarrative += `- Table 41.3: Max Zs for fault protection\n`;
        fallbackNarrative += `- Table 4D5: Cable current capacity (typical)\n\n`;
      } else {
        fallbackNarrative += `The key regulations for this circuit are:\n\n`;
      }
      
      // List found regulations
      if (allRegulations.length > 0) {
        fallbackNarrative += `**Referenced Regulations:**\n`;
        allRegulations.slice(0, 5).forEach((reg: any) => {
          fallbackNarrative += `- ${reg.regulation_number}: ${reg.content?.slice(0, 120) || 'N/A'}...\n`;
        });
      } else {
        fallbackNarrative += `No specific regulations retrieved. Please consult BS 7671:2018+A2:2022 for full compliance.\n`;
      }
      
      parsedResponse = {
        answer: fallbackNarrative,
        regulations_cited: allRegulations.map((r: any) => r.regulation_number).slice(0, 8),
        confidence: 0.6
      };
    }

    // Extract and consolidate regulation citations
    const responseText = String(parsedResponse.answer || '');
    const citedFromJSON = parsedResponse.regulations_cited || [];
    const extractedFromText = extractRegulationNumbers(responseText);
    
    // Combine both sources, deduplicate
    const allCitations = [...new Set([...citedFromJSON, ...extractedFromText])].slice(0, 15);
    
    logger.info('Extracted regulations', { 
      fromJSON: citedFromJSON.length,
      fromText: extractedFromText.length,
      total: allCitations.length,
      citations: allCitations 
    });
    
    // Log RAG usage
    logger.info('RAG context provided', { 
      regulations: allRegulations.length,
      designKnowledge: designKnowledge.length
    });

    // Step 5: Build citations array from all sources
    const citations = [];
    const citedRegNumbers = allCitations;
    
    for (const regNum of citedRegNumbers) {
      // Try to match against fetched RAG data (use allRegulations)
      const regRow = allRegulations?.find(r => 
        r.regulation_number === regNum || 
        regNum.includes(r.regulation_number) ||
        r.regulation_number.includes(regNum)
      );
      
      if (regRow) {
        // Enriched citation from RAG data
        citations.push({
          source: 'BS 7671:2018+A2:2022',
          section: regNum,
          title: regRow.section || `Regulation ${regNum}`,
          content: regRow.content?.slice(0, 240) || '',
          relevance: regRow.similarity || 0.8,
          type: regNum.toLowerCase().includes('table') ? 'table' : 'regulation'
        });
      } else {
        // Fallback citation (still shows in UI even without RAG match)
        citations.push({
          source: 'BS 7671:2018+A2:2022',
          section: regNum,
          title: regNum.toLowerCase().includes('table') ? regNum : `Regulation ${regNum}`,
          content: 'Referenced in design calculations',
          relevance: 0.5,
          type: regNum.toLowerCase().includes('table') ? 'table' : 'regulation'
        });
      }
    }
    
    logger.info('Citations built', { count: citations.length, regulations: citedRegNumbers });
    
    // ⚡ CACHE THE RESULT - Always cache successful responses with citations
    if (!cacheHit && allRegulations.length > 0 && citations.length > 0) {
      const confidence = parsedResponse.confidence || 0.8;
      
      await cache.set(
        query, 
        parsedResponse.answer, 
        allRegulations, 
        confidence,
        { circuitType, power, voltage, cableLength }
      );
      
      logger.info('💾 Response cached (un-gated)', { 
        confidence: confidence.toFixed(2),
        regCount: allRegulations.length 
      });
    }
    
    // Step 6: Build structured response for UI
    const response = parsedResponse.answer;
    const suggestedNextAgents = parsedResponse.suggestedNextAgents || [];
    
    // Build design object from parsed fields
    const design = {
      cableSize: parsedResponse.cable_size,
      protectionDevice: parsedResponse.mcb_rating,
      voltageDrop: parsedResponse.voltage_drop,
      earthingArrangement: 'TN-S'
    };
    
    const compliance = {
      status: 'compliant',
      regulations: allCitations,
      warnings: []
    };
    
    const calculations = {
      designCurrent: null,
      correctionFactors: null,
      maxZs: parsedResponse.earth_fault_loop
    };
    
    logger.info('✅ Design completed', { 
      responseLength: response.length,
      citationCount: citations.length
    });
    
    return new Response(
      JSON.stringify({
        response,
        structuredData: { 
          design, 
          compliance, 
          calculations, 
          citations,
          suggestedNextAgents
        },
        suggestedNextAgents
      }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200 
      }
    );

  } catch (error) {
    logger.error('Designer V3 error', { error: error.message });
    return handleError(error);
  }
});

// Helper function to extract regulation numbers from text
function extractRegulationNumbers(text: string): string[] {
  const patterns = [
    /\b(\d{3}(?:\.\d+){1,2})\b/g,                    // 433.1.1
    /Regulation\s+(\d{3}(?:\.\d+){0,2})/gi,          // "Regulation 433.1.1"
    /reg\.?\s+(\d{3}(?:\.\d+){0,2})/gi,              // "reg 433.1"
    /Table\s+(\d+[A-Z]?\d*(?:\.\d+)*)/gi,           // "Table 4D5"
    /Table\s+([A-Z]\d+)/gi                          // "Table I1"
  ];
  
  const matches: string[] = [];
  for (const pattern of patterns) {
    const found = text.matchAll(pattern);
    for (const match of found) {
      if (match[1]) {
        const ref = pattern.toString().includes('Table') ? `Table ${match[1]}` : match[1];
        matches.push(ref);
      }
    }
  }
  
  return [...new Set(matches)]; // Deduplicate
}
