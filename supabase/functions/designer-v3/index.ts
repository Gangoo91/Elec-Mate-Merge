// 🚀 DEPLOYMENT VERSION: 2024-10-12-HOTFIX-V1
const DEPLOYMENT_VERSION = '2024-10-12-hotfix-v1';

import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import {
  corsHeaders, 
  createLogger, 
  generateRequestId, 
  handleError, 
  ValidationError,
  createClient,
  generateEmbeddingWithRetry
} from '../_shared/v3-core.ts';
import { parseQueryEntities, classifyQuery, QueryType, extractRegulationNumbers } from '../_shared/query-parser.ts';
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
      JSON.stringify({ 
        status: 'healthy', 
        function: 'designer-v3', 
        version: DEPLOYMENT_VERSION,
        requestId, 
        timestamp: new Date().toISOString() 
      }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 200 }
    );
  }

  const requestId = generateRequestId();
  const logger = createLogger(requestId, { function: 'designer-v3' });

  try {
    const body = await req.json();
    const { query, circuitType, power, voltage, cableLength, messages, previousAgentOutputs } = body;

    logger.info('🎨 Designer V3 invoked', { 
      query: query?.slice(0, 50),
      circuitType,
      power,
      messageCount: messages?.length || 0 
    });

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
    const queryType = classifyQuery(query, entities);
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

    // ⚡ PHASE 1: DETERMINISTIC DESIGN with GPT-5 synthesis
    if (queryType === 'design' && entities.power && entities.distance) {
      logger.info('🎯 DETERMINISTIC PATH [HOTFIX-2024-10-12]', { 
        entities, 
        version: DEPLOYMENT_VERSION 
      });
      
      // STEP 1: Calculate (deterministic, instant, always correct)
      const design = designCircuit({
        power: entities.power,
        distance: entities.distance,
        voltage: entities.voltage || 230,
        installMethod: 'A',
        ambientTemp: entities.ambientTemp || 30,
        location: entities.location,
        loadType: entities.loadType,
        earthingSystem: entities.earthingSystem
      });
      
      if (!design.success) {
        const advisory = `This load looks impractical on single-phase at ${entities.voltage || 230}V. Consider a three-phase supply or splitting the load. Details: ${design.warnings.join(', ')}`;
        return new Response(JSON.stringify({
          success: false,
          response: advisory,
          error: null,
          structuredData: { entities },
          suggestedNextAgents: ['installer', 'project-manager']
        }), { 
          status: 200,
          headers: corsHeaders 
        });
      }
      
      // STEP 2: Get detailed RAG regulations (INCREASED DEPTH)
      const regulations = await retrieveRegulations(
        `${design.regulations.join(' ')} ${query}`,
        15, // INCREASED: 15 regulations for deeper context
        OPENAI_API_KEY,
        entities
      );
      
      logger.info('Calculations and RAG complete', {
        Ib: design.designCurrent,
        mcb: design.mcbRating,
        cable: design.cableSize,
        regulationCount: regulations.length
      });
      
      // STEP 3: Build structured facts for GPT-5
      const loadDescription = entities.loadType 
        ? `${entities.loadType.charAt(0).toUpperCase() + entities.loadType.slice(1).replace('_', ' ')}`
        : 'Load';
      
      const structuredFacts = {
        query: query,
        load: {
          type: loadDescription,
          power: entities.power,
          distance: entities.distance,
          voltage: entities.voltage || 230
        },
        calculations: {
          designCurrent: design.designCurrent,
          formula: `Ib = ${entities.power}W ÷ ${entities.voltage || 230}V = ${design.designCurrent.toFixed(1)}A`,
          mcbRating: design.mcbRating,
          cableSize: design.cableSize,
          cableType: design.cableType,
          cableCapacity: design.calculations.Iz,
          voltageDrop: {
            volts: design.voltageDrop.volts,
            percent: design.voltageDrop.percent,
            compliant: design.voltageDrop.compliant,
            limit: '3% for fixed equipment'
          },
          earthFault: {
            maxZs: design.earthFault.maxZs,
            compliant: design.earthFault.compliant
          }
        },
        regulations: regulations.slice(0, 10).map(r => ({
          number: r.regulation_number,
          title: r.section,
          relevance: getRegulationRelevance(r.regulation_number),
          content: r.content  // FULL CONTENT - not truncated!
        })),
        warnings: design.warnings
      };
      
      // STEP 4: AI synthesis with universal wrapper
      const { callAIWithFallback } = await import('../_shared/ai-wrapper.ts');
      
      const aiResult = await callAIWithFallback(
        LOVABLE_API_KEY!,
        {
          model: 'google/gemini-2.5-flash',
          systemPrompt: `You are a MASTER ELECTRICIAN with 20+ years BS 7671:2018+A2:2022 experience.

Your job: Explain this electrical design like you're mentoring an apprentice on-site.

MANDATORY REQUIREMENTS:
1. NEVER recalculate - the numbers provided are from BS 7671 tables (GROUND TRUTH)
2. For EACH regulation cited, explain:
   - What it says (in plain English)
   - Why it matters for THIS specific installation
   - Real consequences if ignored (safety, compliance, warranty)
3. Give PRACTICAL on-site guidance:
   - Installation tips (cable routing, fixing methods, spacing)
   - Testing checkpoints (what values to verify, when to test)
   - Common mistakes apprentices make (and how to avoid them)
4. Warn about EDGE CASES and special requirements
5. Structure your response clearly with headers and bullet points

Write like a mentor, not a textbook. Use "we" and "you". Be conversational but authoritative.

Remember: The user asked "${query}" - address that directly and completely.`,
          userPrompt: `Here are the FACTS (do not recalculate, just explain):

${JSON.stringify(structuredFacts, null, 2)}

Write a comprehensive electrical design response that addresses "${query}" completely.`,
          maxTokens: 2000,
          timeoutMs: 55000
        },
        () => buildFallbackNarrative(structuredFacts)
      );

      const narrative = aiResult.content;
      const responseSource = aiResult.source === 'ai' ? 'deterministic+rag+ai' : 'deterministic+rag_only';

      logger.info('AI synthesis complete', { 
        source: aiResult.source, 
        duration: aiResult.duration,
        model: aiResult.model 
      });
      
      // STEP 5: Return complete response
      return new Response(JSON.stringify({
        success: true,
        response: narrative,
        structuredData: {
          design: design,
          calculations: design.calculations,
          compliance: {
            voltageDrop: design.voltageDrop.compliant,
            earthFault: design.earthFault.compliant,
            overall: design.success
          },
          entities: entities
        },
        citations: regulations.slice(0, 8).map(r => ({
          regulation_number: r.regulation_number,
          section: r.section,
          excerpt: r.content.slice(0, 200) + '...'
        })),
        metadata: {
          responseSource: responseSource,
          calculationTime: '<500ms',
          regulationCount: regulations.length
        },
        suggestedNextAgents: design.success ? ['installer', 'cost-engineer'] : ['health-safety']
      }), {
        status: 200,
        headers: corsHeaders
      });
    }

    // ⚡ PHASE 2: LOOKUP/EXPLAIN PATH
    // For regulation lookups or explanations → RAG + optional GPT-5
    if (queryType === 'lookup' || queryType === 'explain') {
      logger.info('📖 Using lookup/explain path');
      
      const ragResults = await retrieveRegulations(query, 8, OPENAI_API_KEY);
      
      if (ragResults.length === 0) {
        return new Response(JSON.stringify({
          success: true,
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
          success: true,
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
          success: true,
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

    // ⚡ PHASE 3: GENERAL FALLBACK (~80 lines)
    logger.info('💬 Using general query path');

    // Simple RAG lookup
    const regulations = await retrieveRegulations(query, 8, OPENAI_API_KEY);

    if (regulations.length === 0) {
      return new Response(JSON.stringify({
        success: true,
        response: 'I can help with BS 7671 electrical design questions. Try:\n- "9.5kW shower, 15m from board"\n- "What is regulation 433.1.1?"\n- "Cable sizing for 10kW cooker"',
        structuredData: null,
        citations: [],
        source: 'empty_query'
      }), { status: 200, headers: corsHeaders });
    }

    // Simple Gemini synthesis using Lovable AI
    const simplePrompt = `You're a BS 7671:2018+A2:2022 expert. Answer this question concisely using these regulations:

REGULATIONS:
${regulations.slice(0, 5).map(r => `${r.regulation_number} (${r.section}): ${r.content.substring(0, 300)}`).join('\n\n')}

QUESTION: ${query}

Provide a clear answer citing regulation numbers. Keep it under 300 words.`;

    try {
      const aiResponse = await fetch('https://ai.gateway.lovable.dev/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${LOVABLE_API_KEY}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model: 'google/gemini-2.5-flash',
          messages: [
            { role: 'system', content: 'You are a BS 7671 electrical regulations expert. Answer clearly and cite regulation numbers.' },
            { role: 'user', content: simplePrompt }
          ],
          max_completion_tokens: 800
        })
      });

      if (!aiResponse.ok) {
        throw new Error(`Lovable AI error: ${aiResponse.status}`);
      }

      const aiData = await aiResponse.json();
      
      if (!aiData.choices || aiData.choices.length === 0 || !aiData.choices[0]?.message?.content) {
        throw new Error('Lovable AI returned empty response');
      }

      const narrative = aiData.choices[0].message.content;

      return new Response(JSON.stringify({
        success: true,
        response: narrative,
        citations: regulations.slice(0, 5).map(r => ({
          source: 'BS 7671:2018+A2:2022',
          section: r.regulation_number,
          title: r.section,
          content: r.content.substring(0, 200),
          relevance: r.similarity || 0.7
        })),
        source: 'rag_with_lovable_ai'
      }), { status: 200, headers: corsHeaders });

    } catch (error) {
      // Fallback to raw RAG if AI fails
      logger.warn('Lovable AI failed, using RAG fallback', { error: error.message });
      
      return new Response(JSON.stringify({
        success: true,
        response: `## ${regulations[0].section}\n\n${regulations[0].content.substring(0, 500)}...\n\n*[See additional regulations in citations]*`,
        citations: regulations.slice(0, 5).map(r => ({
          source: 'BS 7671:2018+A2:2022',
          section: r.regulation_number,
          title: r.section,
          content: r.content.substring(0, 200),
          relevance: r.similarity || 0.7
        })),
        source: 'rag_fallback'
      }), { status: 200, headers: corsHeaders });
    }

  } catch (error) {
    logger.error('Designer V3 error', { error: error.message });
    return handleError(error);
  }
});

// Helper function for regulation relevance
function getRegulationRelevance(regNumber: string): string {
  const relevanceMap: Record<string, string> = {
    '433.1.1': 'Defines design current calculation and protective device selection',
    '525': 'Specifies voltage drop limits for electrical installations',
    '533.1': 'Requirements for overcurrent protective devices',
    '411.3.2': 'Earth fault loop impedance requirements for safety',
    'Table 4D5': 'Current-carrying capacity values for cables',
    'Table 41.3': 'Maximum earth fault loop impedance values'
  };
  
  return relevanceMap[regNumber] || 'Supporting regulation';
}

// Helper function for fallback narrative
function buildFallbackNarrative(facts: any): string {
  return `## Circuit Design Result

**${facts.load.type}:** ${facts.load.power}W
**Cable Run:** ${facts.load.distance}m
**Supply Voltage:** ${facts.load.voltage}V

### Design Current (Ib)
**${facts.calculations.designCurrent.toFixed(1)}A**

${facts.calculations.formula}

*Per BS 7671 Regulation 433.1.1 - The design current is the current intended to be carried by the circuit in normal service.*

### Protective Device (In)
**${facts.calculations.mcbRating}A MCB** (Type B recommended)

Selected as the next standard rating above the design current. This ensures proper overload protection while allowing the circuit to operate normally.

*Per BS 7671 Regulation 533.1 - Every circuit shall be protected by an overcurrent protective device.*

### Cable Selection
**${facts.calculations.cableSize}mm² ${facts.calculations.cableType}**

Current-carrying capacity: ${facts.calculations.cableCapacity}A (after applying correction factors for installation method, grouping, and ambient temperature).

*Per BS 7671 Table 4D5 - Current-carrying capacity and voltage drop for cables.*

### Voltage Drop
**${facts.calculations.voltageDrop.volts.toFixed(2)}V (${facts.calculations.voltageDrop.percent.toFixed(2)}%)**

${facts.calculations.voltageDrop.compliant 
  ? '✅ **Compliant** - Within the 3% limit for fixed equipment' 
  : '⚠️ **Exceeds limit** - Consider larger cable size or shorter route'}

*Per BS 7671 Regulation 525 - Voltage drop between the origin of the installation and any load point shall not exceed 3% for lighting or 5% for other uses.*

### Earth Fault Protection
Maximum Zs: ${facts.calculations.earthFault.maxZs}Ω
${facts.calculations.earthFault.compliant ? '✅ Compliant' : '⚠️ Verification required'}

*Per BS 7671 Regulation 411.3.2 - Earth fault loop impedance must not exceed values that ensure automatic disconnection in the required time.*

${facts.warnings.length > 0 ? `\n### ⚠️ Additional Considerations\n${facts.warnings.map((w: string) => `- ${w}`).join('\n')}\n` : ''}

### Regulations Referenced

${facts.regulations.slice(0, 5).map((r: any) => 
  `**${r.number}** - ${r.title}\n${r.relevance}\n`
).join('\n')}

---
*Design calculated using BS 7671:2018+A2:2022*
*Calculations: Deterministic (instant, accurate)*
*Citations: RAG search (${facts.regulations.length} regulations)*
*Note: AI narrative synthesis unavailable - showing structured results*`;
}

