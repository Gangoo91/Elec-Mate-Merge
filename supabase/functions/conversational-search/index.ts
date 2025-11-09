import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.49.4";

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
    const { messages } = await req.json();
    
    if (!messages || messages.length === 0) {
      throw new Error('No messages provided');
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

    // STEP 2: Conditional Parallel RAG Search
    const ragPromises: Array<Promise<any>> = [
      // Always search BS7671 Intelligence (keyword hybrid - fast!)
      supabase.rpc('search_bs7671_intelligence_hybrid', {
        query_text: queryText,
        match_count: 8
      }),
      
      // Always search Practical Work Intelligence (keyword hybrid - fast!)
      supabase.rpc('search_practical_work_intelligence_hybrid', {
        query_text: queryText,
        match_count: 6,
        filter_trade: null
      })
    ];

    // Conditionally add Design Knowledge (vector search - slower, only when needed)
    if (classification.needsDesignKnowledge) {
      ragPromises.push(
        supabase.rpc('search_design_hybrid', {
          query_text: queryText,
          match_count: 5
        })
      );
      console.log('🎯 Including Design Knowledge (vector search)');
    }

    // Execute all searches in parallel
    const ragResults = await Promise.all(ragPromises);
    const ragDuration = Date.now() - ragStartTime;

    // Extract results with error handling
    const bs7671Results = ragResults[0]?.data || [];
    const practicalResults = ragResults[1]?.data || [];
    const designResults = classification.needsDesignKnowledge ? (ragResults[2]?.data || []) : [];

    // Log any RAG errors
    if (ragResults[0]?.error) console.error('BS7671 RAG error:', ragResults[0].error);
    if (ragResults[1]?.error) console.error('Practical RAG error:', ragResults[1].error);
    if (ragResults[2]?.error) console.error('Design RAG error:', ragResults[2].error);

    console.log(`✅ RAG Complete (${ragDuration}ms) | BS7671: ${bs7671Results.length} | Practical: ${practicalResults.length} | Design: ${designResults.length}`);

    // STEP 3: RRF Fusion - merge results intelligently
    const fusionStartTime = Date.now();
    const sources = [
      { data: bs7671Results, weight: classification.weights.bs7671, source: 'regulation' },
      { data: practicalResults, weight: classification.weights.practical, source: 'practical' }
    ];

    if (classification.needsDesignKnowledge && designResults.length > 0) {
      sources.push({ data: designResults, weight: classification.weights.design, source: 'design' });
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
          `§ ${r.item.regulation_number}: ${r.item.content || r.item.regulation_text || ''}`
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

    const systemPrompt = `You are a knowledgeable electrician explaining BS 7671 (UK IET Wiring Regulations, 18th Edition) in a conversational, easy-to-understand way. You have access to:
${knowledgeSources.map(s => `- ${s}`).join('\n')}

Writing style:
- Write as if you're talking to a colleague - conversational and natural
- **Structure your response with clear H2 section headers** (use ## in markdown)
- Use paragraphs for explanations, bullets only for distinct steps or lists
- Start with the main point, then explain details
- Cite regulation numbers naturally: "According to § 411.3.3, all circuits..."
- Keep responses between 150-300 words unless more detail is needed
- Use British English
- Be precise and safety-focused, but friendly and approachable

Response structure (use H2 headers for each main section):
## 1. Main Requirement
[Conversational paragraph explanation]

## 2. Related Requirements  
[Conversational paragraph explanation]

## 3. Practical Steps (if applicable)
[Conversational paragraph, then bullet points for steps if needed]

## 4. Summary Checklist (for complex topics)
[Brief bullet list of key takeaways]

Example good response:
"Right, for bathroom socket circuits, you need to follow a few key requirements.

## Mandatory RCD Protection
BS 7671 requires 30 mA RCD protection as additional protection (§ 701.411.3). This is on top of the standard automatic disconnection requirements. The key thing is that this applies to all socket-outlets in rooms containing a bath or shower.

## Equipotential Bonding
You'll also need supplementary equipotential bonding for any exposed metalwork like pipes or radiators (§ 701.413.1.2). The bonding reduces touch voltages to safe levels during fault conditions.

## Practical Implementation
For the RCD itself, I'd recommend individual RCBOs rather than a single RCD covering multiple circuits. Makes fault-finding much easier and you won't lose the whole installation if one device trips."

${regulationsContext}`;

    // Prepare messages for OpenAI
    const openAiMessages = [
      { role: 'system', content: systemPrompt },
      ...messages
    ];

    const totalPrepTime = Date.now() - ragStartTime;
    console.log(`🤖 Calling GPT-5 Mini (prep: ${totalPrepTime}ms)`);

    // Call OpenAI API with streaming
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${openAiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-5-mini-2025-08-07',
        messages: openAiMessages,
        stream: true,
        max_completion_tokens: 2000
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
