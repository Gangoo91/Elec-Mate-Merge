import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.49.4";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

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

    console.log('🔍 RAG Search for:', queryText);

    // Parallel RAG search using hybrid intelligence search
    const { data: ragResults, error: ragError } = await supabase.rpc(
      'search_bs7671_intelligence_hybrid',
      {
        query_text: queryText,
        match_count: 8
      }
    );

    if (ragError) {
      console.error('RAG search error:', ragError);
    }

    // Format regulations as context
    let regulationsContext = '';
    if (ragResults && ragResults.length > 0) {
      console.log(`✅ Found ${ragResults.length} relevant regulations`);
      regulationsContext = '\n\n[RELEVANT BS 7671 REGULATIONS]\n' + 
        ragResults.map((r: any) => 
          `§ ${r.regulation_number}: ${r.content || r.regulation_text || ''}`
        ).join('\n\n');
    }

    // System prompt optimized for BS 7671 expertise
    const systemPrompt = `You are an expert on BS 7671 (UK IET Wiring Regulations, 18th Edition). You provide accurate, practical guidance for electricians.

When answering:
- Cite specific regulation numbers using this format: § 411.3.3
- Explain technical concepts in clear, professional British English
- Provide practical application advice where relevant
- Keep responses conversational and under 300 words unless detail is requested
- Be precise and safety-focused

${regulationsContext}`;

    // Prepare messages for OpenAI
    const openAiMessages = [
      { role: 'system', content: systemPrompt },
      ...messages
    ];

    console.log('🤖 Calling OpenAI GPT-5 Mini with streaming...');

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
        // NO temperature parameter for GPT-5
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
