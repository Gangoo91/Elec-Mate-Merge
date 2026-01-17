import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from '../_shared/deps.ts';
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.49.4";
import { extractChatKeywords } from '../_shared/chat-keyword-extractor.ts';
import { 
  searchRegulationsIntelligence,
  searchDesignIntelligence 
} from '../_shared/intelligence-search.ts';
import { searchPracticalWorkIntelligence } from '../_shared/rag-practical-work.ts';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

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
  if (/§|\d{3}\.\d|regulation \d|part \d|chapter \d/.test(query) || 
      /what (does|is)|define|definition/.test(lowerQuery)) {
    return {
      type: 'regulation',
      needsDesignKnowledge: false,
      weights: { bs7671: 2.0, practical: 0.5, design: 0.3 }
    };
  }
  
  // Practical-focused: installation, testing, procedures
  if (/how (do|to)|install|procedure|steps|test|commission|inspect/.test(lowerQuery)) {
    return {
      type: 'practical',
      needsDesignKnowledge: false,
      weights: { bs7671: 0.7, practical: 2.0, design: 0.5 }
    };
  }
  
  // Design-focused: calculations, sizing, voltage drop
  if (/size|calculate|design|kw|amp|voltage drop|cable|circuit|load|diversity/.test(lowerQuery)) {
    return {
      type: 'design',
      needsDesignKnowledge: true,
      weights: { bs7671: 0.8, practical: 0.5, design: 2.0 }
    };
  }
  
  // General: balanced approach with design knowledge
  return {
    type: 'general',
    needsDesignKnowledge: true,
    weights: { bs7671: 1.0, practical: 0.9, design: 0.95 }
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
      const itemId = item.id || 
                     item.regulation_number || 
                     item.content?.substring(0, 50) || 
                     `${source}-${rank}`;
      
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
          sources: [source]
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
    const queryText = lastUserMessage?.content || '';

    console.log('🔍 Query:', queryText);

    // STEP 1: Classify query for smart RAG routing
    const ragStartTime = Date.now();
    const classification = classifyQuery(queryText);
    console.log(`📊 Query Type: ${classification.type} | Needs Design: ${classification.needsDesignKnowledge}`);

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
        limit: 20
      }),
      
      // Practical Work Intelligence - GIN indexed (20-50ms)
      searchPracticalWorkIntelligence(supabase, {
        query: keywords.join(' '),
        tradeFilter: 'installer',
        matchCount: 15
      }),
      
      // Design Knowledge - GIN indexed (20-50ms) - conditionally fetched
      classification.needsDesignKnowledge 
        ? searchDesignIntelligence(supabase, {
            keywords,
            circuitTypes: ['general', 'final circuit', 'distribution'],
            limit: 15
          })
        : Promise.resolve([])
    ]);
    const ragDuration = Date.now() - ragStartTime;

    // Process results from GIN searches
    const bs7671Data = regulationsResults || [];
    const practicalData = (practicalResults as any)?.results || practicalResults || [];
    const designData = designResults || [];

    console.log(`⚡ ULTRA-FAST RAG Complete (${ragDuration}ms) | Regulations: ${bs7671Data.length} | Practical: ${practicalData.length} | Design: ${designData.length}`);

    // STEP 3: RRF Fusion - merge results intelligently
    const fusionStartTime = Date.now();
    const sources = [
      { data: bs7671Data, weight: classification.weights.bs7671, source: 'regulation' },
      { data: practicalData, weight: classification.weights.practical, source: 'practical' }
    ];

    if (classification.needsDesignKnowledge && designData.length > 0) {
      sources.push({ data: designData, weight: classification.weights.design, source: 'design' });
    }

    const fusedResults = fuseResults(sources);
    const fusionDuration = Date.now() - fusionStartTime;
    console.log(`🔀 Fusion Complete (${fusionDuration}ms) | Top ${fusedResults.length} results`);

    // STEP 4: Format context dynamically based on available sources
    let regulationsContext = '';
    
    // Add BS7671 regulations
    const bs7671Items = fusedResults.filter(r => r.sources.includes('regulation')).slice(0, 5);
    if (bs7671Items.length > 0) {
      regulationsContext += '\n\n[RELEVANT BS 7671 REGULATIONS]\n' + 
        bs7671Items.map(r => 
          `Reg. ${r.item.regulation_number}: ${r.item.content || r.item.regulation_text || ''}`
        ).join('\n\n');
    }

    // Add Practical Work guidance
    const practicalItems = fusedResults.filter(r => r.sources.includes('practical')).slice(0, 4);
    if (practicalItems.length > 0) {
      regulationsContext += '\n\n[PRACTICAL GUIDANCE]\n' + 
        practicalItems.map(r => 
          `• ${r.item.primary_topic || 'Guidance'}: ${r.item.content || ''}`
        ).join('\n\n');
    }

    // Add Design Knowledge (if available)
    const designItems = fusedResults.filter(r => r.sources.includes('design')).slice(0, 3);
    if (designItems.length > 0) {
      regulationsContext += '\n\n[DESIGN KNOWLEDGE]\n' + 
        designItems.map(r => 
          `• ${r.item.content || ''}`
        ).join('\n\n');
    }

    // STEP 5: Build dynamic system prompt
    const knowledgeSources = [];
    if (bs7671Items.length > 0) knowledgeSources.push('BS 7671 regulations');
    if (practicalItems.length > 0) knowledgeSources.push('practical installation procedures');
    if (designItems.length > 0) knowledgeSources.push('design calculations');

    const systemPrompt = `You are Elec-AI, an expert UK electrician and technical advisor providing comprehensive, best-in-class guidance on BS 7671 (18th Edition), electrical installations, testing, and design.

## Your Knowledge Base
${knowledgeSources.map(s => `• ${s}`).join('\n')}

## Response Philosophy
You deliver the most thorough, helpful responses in the industry. When an electrician asks you something, you give them EVERYTHING they need to know - not just the bare minimum. You're like having a senior sparky with 25 years experience right there with you.

## Writing Style
- Conversational but authoritative - like chatting with a knowledgeable colleague
- **Always use clear H2 section headers** (## in markdown) to structure responses
- Start with a direct answer, then expand with comprehensive detail
- Cite regulations naturally: "Per Reg. 411.3.3..." or "As required by Regulation 701.411.3..."
- Include worked examples for any calculations
- Add practical tips from real-world experience
- British English only

## Response Length Guidelines
- **Quick factual questions**: 300-500 words with complete context
- **Regulation explanations**: 600-1000 words covering requirements, exceptions, and practical application
- **How-to procedures**: 800-1200 words with step-by-step methodology
- **Complex topics** (cable sizing, fault loop, design): 1000-1500 words with full calculations and examples
- **NEVER give sparse or incomplete answers** - electricians deserve comprehensive guidance

## Response Structure
Use these H2 headers as appropriate:

## Direct Answer
[Clear, concise answer to the main question]

## Regulation Requirements
[Specific regulation numbers with full context]

## Practical Application
[How to implement this in real installations with tips]

## Worked Example (if calculations involved)
[Step-by-step calculation with actual numbers]

## Common Mistakes to Avoid
[What goes wrong and how to prevent it]

## Related Considerations
[Other regulations or factors the electrician should know]

## Key Takeaways
- Bullet summary of critical points

---FOLLOWUP---
[3 intelligent follow-up questions that probe deeper or explore related areas]
---END_FOLLOWUP---

## Quality Standards
- NEVER give vague or generic answers - be specific and technical
- ALWAYS cite specific regulation numbers (e.g., Reg. 411.3.3, Table 41.3)
- ALWAYS include actual values, limits, and thresholds
- For calculations, show complete methodology with formula and worked example
- Reference related regulations the electrician should be aware of
- Include safety warnings where relevant
- Mention common inspection/testing requirements

## Example Response Quality

Question: "What are the RCD requirements for bathrooms?"

## Direct Answer
All circuits supplying equipment in bathrooms require 30mA RCD protection with a maximum disconnection time of 40ms at 5× rated residual current, as mandated by Regulations 701.411.3.3 and 411.3.3.

## Regulation Requirements
BS 7671 Section 701 covers rooms containing a bath or shower. The key requirements are:

**Additional Protection (Reg. 701.411.3.3)**: All circuits serving locations containing a bath or shower shall be protected by an RCD with a rated residual operating current (IΔn) not exceeding 30 mA. This applies regardless of the zone.

**Disconnection Times (Reg. 411.3.3)**: For TN systems, the maximum disconnection time is 0.4 seconds for final circuits ≤63A. The RCD must achieve this at 5× IΔn (150mA for a 30mA device).

**SELV/PELV Circuits (Reg. 701.414.4.5)**: Even SELV circuits in bathrooms must have basic insulation from live parts or barriers/enclosures providing at least IP2X or IPXXB.

## Practical Application
When installing bathroom circuits:

- **Lighting circuits**: Must have 30mA RCD protection. Consider using an RCBO for the bathroom lighting to prevent nuisance tripping affecting other rooms.
- **Heated towel rails**: Require RCD protection and should be connected via a fused connection unit outside Zones 0-2.
- **Shaver sockets**: BS 1363 socket-outlets are prohibited in bathrooms. Only shaver supply units conforming to BS EN 61558-2-5 (with isolation transformer) are permitted.
- **Extractor fans**: Must be suitable for the zone of installation (IPX4 minimum in Zone 2, IPX7 in Zone 1).

## Common Mistakes to Avoid
- Installing standard socket-outlets anywhere in the bathroom (only shaver units allowed)
- Forgetting to provide supplementary equipotential bonding when required
- Using incorrectly rated IP-rated equipment for the zone
- Not testing RCD at 1× and 5× IΔn during commissioning

## Key Takeaways
- 30mA RCD protection mandatory for ALL bathroom circuits
- Maximum 40ms disconnection at 5× rated current
- No BS 1363 sockets permitted in bathrooms
- Equipment must be IP rated for the zone of installation
- Consider RCBOs to isolate bathroom circuits from rest of installation

---FOLLOWUP---
What are the specific IP ratings required for each bathroom zone?
How do I correctly test RCD disconnection times?
What supplementary bonding is required in bathrooms under current regulations?
---END_FOLLOWUP---

${regulationsContext}`;

    // Prepare messages for OpenAI
    // If there's an image, format the last user message with vision content
    const formattedMessages = messages.map((m: any, idx: number) => {
      // Add image to the last user message if present
      if (hasImage && m.role === 'user' && idx === messages.length - 1) {
        return {
          role: 'user',
          content: [
            { type: 'text', text: m.content || 'What can you tell me about this electrical component or installation?' },
            { type: 'image_url', image_url: { url: imageUrl, detail: 'high' } }
          ]
        };
      }
      return m;
    });

    const openAiMessages = [
      { role: 'system', content: systemPrompt },
      ...formattedMessages
    ];

    const totalPrepTime = Date.now() - ragStartTime;
    // Use vision model when image is present
    const model = hasImage ? 'gpt-4o' : 'gpt-5-mini-2025-08-07';
    console.log(`🤖 Calling ${model} (prep: ${totalPrepTime}ms)`);

    // Call OpenAI API with streaming
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${openAiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model,
        messages: openAiMessages,
        stream: true,
        max_completion_tokens: 8000
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
            headers: { ...corsHeaders, 'Content-Type': 'application/json' }
          }
        );
      }
      
      if (response.status === 402) {
        return new Response(
          JSON.stringify({ error: 'Payment required. Please add credits to your workspace.' }),
          { 
            status: 402, 
            headers: { ...corsHeaders, 'Content-Type': 'application/json' }
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
            const lines = chunk.split('\n').filter(line => line.trim() !== '');

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
      }
    });

    return new Response(stream, {
      headers: {
        ...corsHeaders,
        'Content-Type': 'text/event-stream',
        'Cache-Control': 'no-cache',
        'Connection': 'keep-alive'
      }
    });

  } catch (error) {
    console.error('Error in conversational-search:', error);
    return new Response(
      JSON.stringify({ 
        error: error instanceof Error ? error.message : 'Unknown error occurred' 
      }),
      { 
        status: 500, 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      }
    );
  }
});
