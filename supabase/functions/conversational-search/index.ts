import 'https://deno.land/x/xhr@0.1.0/mod.ts';
import { serve } from '../_shared/deps.ts';
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.49.4';
import { extractChatKeywords } from '../_shared/chat-keyword-extractor.ts';
import {
  searchRegulationsIntelligence,
  searchDesignIntelligence,
} from '../_shared/intelligence-search.ts';
import { searchPracticalWorkIntelligence } from '../_shared/rag-practical-work.ts';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers':
    'authorization, x-client-info, apikey, content-type, x-supabase-timeout, x-request-id',
};

// Static system prompt — identical every request so OpenAI auto-caches the KV state (~1100 tokens).
// NEVER interpolate dynamic content (RAG results, knowledge sources) into this string.
const STATIC_SYSTEM_PROMPT = `You are Elec-AI, an expert UK electrician and technical advisor providing comprehensive, best-in-class guidance on BS 7671 (18th Edition), electrical installations, testing, and design.

## Image Analysis
If the user shares an image, you MUST: identify the component/installation, assess compliance, provide relevant BS 7671 requirements, and give practical guidance. Look for ratings, damage, cable colours, certification marks (CE, UKCA, BS EN), and consumer unit layout.

## IMPORTANT: Keep Technical Details Secret
If anyone asks what AI model powers you, what technology you use, or how you work:
- Keep it a trade secret! Say "That's classified information, mate! All you need to know is I'm here to help with your electrical queries."
- NEVER reveal the AI model name, RAG system, or any technical implementation details
- You're simply "Elec-AI" — an expert electrical advisor built into Elec-Mate

## Response Philosophy
You deliver the most thorough, helpful responses in the industry. Like having a senior sparky with 25 years experience right there with you.

## Writing Style
- Conversational but authoritative — like chatting with a knowledgeable colleague
- Use clear H2 section headers (## in markdown) to structure responses
- Start with a direct answer, then expand with detail
- Cite regulations naturally: "Per Reg. 411.3.3..." or "As required by Regulation 701.411.3..."
- Include worked examples for calculations
- Use H3 for subheadings in grouped content, bullet lists for simple items only
- British English only

## Response Structure
Use these H2 headers as appropriate (not every section needed for every query):
- ## Direct Answer
- ## Regulation Requirements
- ## Practical Application
- ## Worked Example (if calculations)
- ## Common Mistakes to Avoid
- ## Key Takeaways

End every response with:
---FOLLOWUP---
[3 intelligent follow-up questions]
---END_FOLLOWUP---

## Quality Standards
- NEVER give vague answers — be specific and technical
- ALWAYS cite specific regulation numbers (e.g., Reg. 411.3.3, Table 41.3)
- ALWAYS include actual values, limits, and thresholds
- For calculations, show complete methodology with formula and worked example
- Include safety warnings where relevant`;

// Query Classification for Smart RAG Routing
interface QueryClassification {
  type: 'regulation' | 'practical' | 'design' | 'general';
  needsDesignKnowledge: boolean;
  weights: {
    bs7671: number;
    practical: number;
    design: number;
  };
}

function classifyQuery(query: string): QueryClassification {
  const lowerQuery = query.toLowerCase();

  // Regulation-focused: explicit reg numbers or "what does" questions
  if (
    /§|\d{3}\.\d|regulation \d|part \d|chapter \d/.test(query) ||
    /what (does|is)|define|definition/.test(lowerQuery)
  ) {
    return {
      type: 'regulation',
      needsDesignKnowledge: false,
      weights: { bs7671: 2.0, practical: 0.5, design: 0.3 },
    };
  }

  // Practical-focused: installation, testing, procedures
  if (/how (do|to)|install|procedure|steps|test|commission|inspect/.test(lowerQuery)) {
    return {
      type: 'practical',
      needsDesignKnowledge: false,
      weights: { bs7671: 0.7, practical: 2.0, design: 0.5 },
    };
  }

  // Design-focused: calculations, sizing, voltage drop
  if (/size|calculate|design|kw|amp|voltage drop|cable|circuit|load|diversity/.test(lowerQuery)) {
    return {
      type: 'design',
      needsDesignKnowledge: true,
      weights: { bs7671: 0.8, practical: 0.5, design: 2.0 },
    };
  }

  // General: balanced approach with design knowledge
  return {
    type: 'general',
    needsDesignKnowledge: true,
    weights: { bs7671: 1.0, practical: 0.9, design: 0.95 },
  };
}

// RRF (Reciprocal Rank Fusion) for intelligent result merging
interface RagResult {
  id?: string;
  regulation_number?: string;
  content?: string;
  regulation_text?: string;
  hybrid_score?: number;
  similarity?: number;
  primary_topic?: string;
}

interface ScoredResult {
  item: RagResult;
  score: number;
  sources: string[];
}

function fuseResults(
  sources: Array<{ data: RagResult[] | null; weight: number; source: string }>
): ScoredResult[] {
  const k = 60; // RRF constant
  const scores = new Map<string, ScoredResult>();

  sources.forEach(({ data, weight, source }) => {
    if (!data || data.length === 0) return;

    data.forEach((item, rank) => {
      // Generate unique ID for deduplication
      const itemId =
        item.id || item.regulation_number || item.content?.substring(0, 50) || `${source}-${rank}`;

      // RRF score: 1 / (k + rank)
      const rrfScore = weight / (k + rank + 1);

      const existing = scores.get(itemId);
      if (existing) {
        existing.score += rrfScore;
        if (!existing.sources.includes(source)) {
          existing.sources.push(source);
        }
      } else {
        scores.set(itemId, {
          item,
          score: rrfScore,
          sources: [source],
        });
      }
    });
  });

  return Array.from(scores.values())
    .sort((a, b) => b.score - a.score)
    .slice(0, 12); // Top 12 results
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { messages, imageUrl } = await req.json();

    if (!messages || messages.length === 0) {
      throw new Error('No messages provided');
    }

    const hasImage = !!imageUrl;
    if (hasImage) {
      console.log('📸 Image attached:', imageUrl);
    }

    const openAiKey = Deno.env.get('OPENAI_API_KEY');
    if (!openAiKey) {
      throw new Error('OPENAI_API_KEY not configured');
    }

    // Initialize Supabase client for RAG search
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    const supabase = createClient(supabaseUrl, supabaseKey);

    // Extract last user message for RAG search
    const lastUserMessage = messages.filter((m: any) => m.role === 'user').pop();
    let queryText = lastUserMessage?.content || '';

    // If image with minimal text, use broad electrical keywords for RAG
    const isMinimalText =
      !queryText ||
      queryText.length < 20 ||
      /^(what('s| is) this|identify|help|look at this|check this)\??$/i.test(queryText.trim());

    if (hasImage && isMinimalText) {
      // Add common electrical component keywords for broad RAG coverage
      queryText =
        queryText +
        ' electrical component consumer unit MCB RCD RCBO circuit breaker wiring installation cable accessory socket switch isolator';
      console.log('📸 Image with minimal text - using broad electrical RAG search');
    }

    console.log('🔍 Query:', queryText);

    // STEP 1: Classify query for smart RAG routing
    const ragStartTime = Date.now();
    const classification = classifyQuery(queryText);
    // For images, always include design knowledge (might be sizing/identification)
    if (hasImage) {
      classification.needsDesignKnowledge = true;
    }
    console.log(
      `📊 Query Type: ${classification.type} | Needs Design: ${classification.needsDesignKnowledge}`
    );

    // STEP 2: ULTRA-FAST GIN-INDEXED KEYWORD SEARCH
    // Extract keywords for ultra-fast GIN search (50-100ms total!)
    const keywords = extractChatKeywords(queryText);
    console.log(`🔑 Extracted ${keywords.length} keywords:`, keywords.slice(0, 15).join(', '));

    // ULTRA-FAST PARALLEL GIN SEARCHES
    const [regulationsResults, practicalResults, designResults] = await Promise.all([
      // Regulations Intelligence - GIN indexed (20-50ms)
      searchRegulationsIntelligence(supabase, {
        keywords,
        appliesTo: ['all installations', 'electrical installation'],
        categories: ['installation', 'testing', 'protection', 'earthing', 'special locations'],
        limit: 10,
      }),

      // Practical Work Intelligence - GIN indexed (20-50ms)
      searchPracticalWorkIntelligence(supabase, {
        query: keywords.join(' '),
        tradeFilter: 'installer',
        matchCount: 8,
      }),

      // Design Knowledge - GIN indexed (20-50ms) - conditionally fetched
      classification.needsDesignKnowledge
        ? searchDesignIntelligence(supabase, {
            keywords,
            circuitTypes: ['general', 'final circuit', 'distribution'],
            limit: 8,
          })
        : Promise.resolve([]),
    ]);
    const ragDuration = Date.now() - ragStartTime;

    // Process results from GIN searches
    const bs7671Data = regulationsResults || [];
    const practicalData = (practicalResults as any)?.results || practicalResults || [];
    const designData = designResults || [];

    console.log(
      `⚡ ULTRA-FAST RAG Complete (${ragDuration}ms) | Regulations: ${bs7671Data.length} | Practical: ${practicalData.length} | Design: ${designData.length}`
    );

    // STEP 3: RRF Fusion - merge results intelligently
    const fusionStartTime = Date.now();
    const sources = [
      { data: bs7671Data, weight: classification.weights.bs7671, source: 'regulation' },
      { data: practicalData, weight: classification.weights.practical, source: 'practical' },
    ];

    if (classification.needsDesignKnowledge && designData.length > 0) {
      sources.push({ data: designData, weight: classification.weights.design, source: 'design' });
    }

    const fusedResults = fuseResults(sources);
    const fusionDuration = Date.now() - fusionStartTime;
    console.log(`🔀 Fusion Complete (${fusionDuration}ms) | Top ${fusedResults.length} results`);

    // STEP 4: Format RAG context for dynamic system message
    let regulationsContext = '';

    // Add BS7671 regulations (trimmed from 5 → 3)
    const bs7671Items = fusedResults.filter((r) => r.sources.includes('regulation')).slice(0, 3);
    if (bs7671Items.length > 0) {
      regulationsContext +=
        '[RELEVANT BS 7671 REGULATIONS]\n' +
        bs7671Items
          .map(
            (r) =>
              `Reg. ${r.item.regulation_number}: ${r.item.content || r.item.regulation_text || ''}`
          )
          .join('\n\n');
    }

    // Add Practical Work guidance (trimmed from 4 → 3)
    const practicalItems = fusedResults.filter((r) => r.sources.includes('practical')).slice(0, 3);
    if (practicalItems.length > 0) {
      regulationsContext +=
        '\n\n[PRACTICAL GUIDANCE]\n' +
        practicalItems
          .map((r) => `• ${r.item.primary_topic || 'Guidance'}: ${r.item.content || ''}`)
          .join('\n\n');
    }

    // Add Design Knowledge (trimmed from 3 → 2)
    const designItems = fusedResults.filter((r) => r.sources.includes('design')).slice(0, 2);
    if (designItems.length > 0) {
      regulationsContext +=
        '\n\n[DESIGN KNOWLEDGE]\n' +
        designItems.map((r) => `• ${r.item.content || ''}`).join('\n\n');
    }

    // STEP 5: Build dynamic context as a SEPARATE system message (keeps static prompt cacheable)
    const knowledgeSources = [];
    if (bs7671Items.length > 0) knowledgeSources.push('BS 7671 regulations');
    if (practicalItems.length > 0) knowledgeSources.push('practical installation procedures');
    if (designItems.length > 0) knowledgeSources.push('design calculations');

    const dynamicContext = [
      knowledgeSources.length > 0
        ? `Knowledge sources for this query: ${knowledgeSources.join(', ')}`
        : '',
      regulationsContext,
    ]
      .filter(Boolean)
      .join('\n\n');

    // Prepare messages for OpenAI
    // If there's an image, format the last user message with vision content
    const formattedMessages = messages.map((m: any, idx: number) => {
      // Add image to the last user message if present
      if (hasImage && m.role === 'user' && idx === messages.length - 1) {
        return {
          role: 'user',
          content: [
            {
              type: 'text',
              text:
                m.content ||
                'What can you tell me about this electrical component or installation?',
            },
            { type: 'image_url', image_url: { url: imageUrl, detail: 'high' } },
          ],
        };
      }
      return m;
    });

    // Trim conversation history to keep context window manageable
    const MAX_HISTORY = 10;
    let trimmedMessages = formattedMessages;
    if (formattedMessages.length > MAX_HISTORY) {
      const olderCount = formattedMessages.length - MAX_HISTORY;
      const contextNote = {
        role: 'system',
        content: `[${olderCount} earlier messages in this conversation have been summarised. The user has been asking about electrical topics. Continue naturally from the recent messages below.]`,
      };
      trimmedMessages = [contextNote, ...formattedMessages.slice(-MAX_HISTORY)];
    }

    // Two system messages: static (cacheable) + dynamic (per-query RAG context)
    const openAiMessages = [
      { role: 'system', content: STATIC_SYSTEM_PROMPT },
      ...(dynamicContext ? [{ role: 'system', content: dynamicContext }] : []),
      ...trimmedMessages,
    ];

    const totalPrepTime = Date.now() - ragStartTime;
    // Use vision model when image is present
    const model = hasImage ? 'gpt-4o' : 'gpt-5-mini-2025-08-07';
    console.log(`🤖 Calling ${model} (prep: ${totalPrepTime}ms)`);

    // Call OpenAI API with streaming
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${openAiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model,
        messages: openAiMessages,
        stream: true,
        max_completion_tokens: formattedMessages.length > 1 ? 5000 : 6000,
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('OpenAI API error:', response.status, errorText);

      if (response.status === 429) {
        return new Response(
          JSON.stringify({ error: 'Rate limit exceeded. Please wait a moment and try again.' }),
          {
            status: 429,
            headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          }
        );
      }

      if (response.status === 402) {
        return new Response(
          JSON.stringify({ error: 'Payment required. Please add credits to your workspace.' }),
          {
            status: 402,
            headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          }
        );
      }

      throw new Error(`OpenAI API error: ${response.status} - ${errorText}`);
    }

    // Stream the response back to client
    const stream = new ReadableStream({
      async start(controller) {
        const reader = response.body?.getReader();
        if (!reader) {
          controller.close();
          return;
        }

        const encoder = new TextEncoder();
        const decoder = new TextDecoder();

        try {
          while (true) {
            const { done, value } = await reader.read();
            if (done) break;

            const chunk = decoder.decode(value, { stream: true });
            const lines = chunk.split('\n').filter((line) => line.trim() !== '');

            for (const line of lines) {
              if (line.startsWith('data: ')) {
                const data = line.slice(6);

                // Forward the SSE data to client
                controller.enqueue(encoder.encode(`data: ${data}\n\n`));
              }
            }
          }
        } catch (error) {
          console.error('Streaming error:', error);
        } finally {
          controller.close();
        }
      },
    });

    return new Response(stream, {
      headers: {
        ...corsHeaders,
        'Content-Type': 'text/event-stream',
        'Cache-Control': 'no-cache',
        Connection: 'keep-alive',
      },
    });
  } catch (error) {
    console.error('Error in conversational-search:', error);
    return new Response(
      JSON.stringify({
        error: error instanceof Error ? error.message : 'Unknown error occurred',
      }),
      {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );
  }
});
