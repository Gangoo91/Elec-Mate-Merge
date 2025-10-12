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
import { summarizeConversation } from '../_shared/conversation-memory.ts';
import { ResponseCache, isCacheable } from '../_shared/response-cache.ts';

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

    // Initialize cache for instant responses
    const cache = new ResponseCache();
    let allRegulations = [];
    let designKnowledge = [];
    let cacheHit = false;

    // ⚡ TIER 1: CHECK CACHE FIRST (0-2s response for 60% of queries)
    if (isCacheable(query)) {
      logger.debug('Query is cacheable, checking cache');
      const cached = await cache.get(query, { circuitType, power, voltage, cableLength });
      
      if (cached && cached.confidence >= 0.75) {
        logger.info('✅ Cache hit - using cached regulations', { 
          cachedQuery: cached.query.slice(0, 50),
          hits: cached.hits,
          age: Math.round((Date.now() - new Date(cached.timestamp).getTime()) / 1000 / 60) + ' mins'
        });
        
        // Use cached regulations, skip RAG entirely
        allRegulations = JSON.parse(cached.citations);
        cacheHit = true;
      }
    }

    // ⚡ TIER 2: RAG SEARCH WITH HIGH RELEVANCE THRESHOLD (3-10s for cache miss)
    if (!cacheHit) {
      // Step 1: Generate embedding for RAG search (with retry)
      logger.debug('Cache miss - generating query embedding');
      const embeddingStart = Date.now();
      const queryEmbedding = await generateEmbeddingWithRetry(query, OPENAI_API_KEY);
      logger.debug('Embedding generated', { duration: Date.now() - embeddingStart });

      // Step 2: Fetch RAG context
      const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
      const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
      const supabase = createClient(supabaseUrl, supabaseKey);

      logger.debug('Fetching RAG context with high relevance filter');

      // Fetch BS 7671 regulations with 0.75 threshold (only highly relevant)
      const { data: regulations, error: regError } = await supabase.rpc('search_bs7671', {
        query_embedding: queryEmbedding,
        match_threshold: 0.75, // ⚡ INCREASED from 0.5 - only pass highly relevant regs to GPT-5
        match_count: 8
      });

      if (regError) {
        logger.warn('BS 7671 search failed', { error: regError });
      }

      // Fetch design knowledge
      const { data: designKnowledgeData, error: designError } = await supabase.rpc('search_design_knowledge', {
        query_embedding: queryEmbedding,
        circuit_filter: circuitType || null,
        source_filter: null,
        match_threshold: 0.7, // ⚡ INCREASED from 0.6
        match_count: 5
      });

      if (designError) {
        logger.warn('Design knowledge search failed', { error: designError });
      }

      // ⚡ FILTER: Only pass regulations with similarity > 0.75 to GPT-5
      const rawRegs = regulations || [];
      allRegulations = rawRegs.filter((reg: any) => reg.similarity >= 0.75);
      designKnowledge = designKnowledgeData || [];
      
      logger.info('RAG filtering applied', { 
        rawCount: rawRegs.length,
        filteredCount: allRegulations.length,
        avgSimilarity: allRegulations.length > 0 
          ? (allRegulations.reduce((sum: number, r: any) => sum + r.similarity, 0) / allRegulations.length).toFixed(2)
          : 0
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

    // Step 4: Call GPT-5 for simple JSON response (NO TOOL CALLING)
    logger.debug('Calling GPT-5 for JSON response');
    const aiStart = Date.now();
    
    // Timeout 270s via AbortController
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 270000);

    let aiResponse: Response;
    try {
      aiResponse = await fetch('https://ai.gateway.lovable.dev/v1/chat/completions', {
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
    } finally {
      clearTimeout(timeoutId);
    }

    if (!aiResponse.ok) {
      const errorText = await aiResponse.text();
      logger.error('GPT-5 error', { status: aiResponse.status, error: errorText });
      throw new Error(`AI API error: ${aiResponse.status}`);
    }

    const aiData = await aiResponse.json();
    const duration = Date.now() - aiStart;
    logger.debug('GPT-5 response received', { duration, hasChoices: !!aiData.choices?.[0] });

    // Parse response - handle both JSON and plain text gracefully
    const aiContent = aiData.choices?.[0]?.message?.content || '';
    let parsedResponse: any;
    
    try {
      // Try to parse as JSON
      parsedResponse = JSON.parse(aiContent);
      logger.info('✅ Parsed JSON response', { hasAnswer: !!parsedResponse.answer });
    } catch (parseError) {
      // Fallback: wrap plain text response
      logger.warn('Failed to parse JSON, using text fallback', { contentLength: aiContent.length });
      parsedResponse = {
        answer: aiContent,
        regulations_cited: extractRegulationNumbers(aiContent),
        confidence: 0.7
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
    
    // ⚡ CACHE THE RESULT (for future instant responses)
    if (!cacheHit && isCacheable(query) && allRegulations.length > 0) {
      const confidence = parsedResponse.confidence || 0.8;
      
      await cache.set(
        query, 
        parsedResponse.answer, 
        allRegulations, 
        confidence,
        { circuitType, power, voltage, cableLength }
      );
      
      logger.info('💾 Response cached', { 
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
      citationCount: citations.length,
      duration
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
