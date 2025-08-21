import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { prompt, mode = 'detailed' } = await req.json();
    const openAIApiKey = Deno.env.get('OPENAI_API_KEY');

    if (!openAIApiKey) {
      throw new Error('OpenAI API key not configured');
    }

    const systemPrompt = mode === 'quick' 
      ? `You are a UK electrical regulations expert. Provide CONCISE, direct answers about BS 7671 18th edition regulations.

RESPONSE STYLE:
- Keep responses under 300 words
- Be direct and practical
- Include specific regulation numbers
- Focus on immediate actionable guidance

Format your response as JSON with these fields:
{
  "answer": "Direct answer with regulation numbers",
  "regulation_refs": ["411.3.3", "514.4.2"],
  "key_points": ["Point 1", "Point 2"],
  "follow_up_suggestions": ["Related question 1", "Related question 2"]
}`
      : `You are an experienced UK electrical regulations expert specializing in BS 7671 18th edition wiring regulations.

RESPONSE STYLE:
- Provide comprehensive, detailed explanations
- Include specific regulation numbers and cross-references
- Explain the reasoning behind requirements
- Include practical application examples
- Add safety considerations and best practices

Format your response as JSON with these fields:
{
  "answer": "Detailed explanation with examples and context",
  "regulation_refs": ["411.3.3", "514.4.2", "543.1.1"],
  "calculations": "Any relevant calculations or formulas",
  "safety_notes": "Important safety considerations",
  "practical_tips": "Real-world application guidance",
  "related_topics": ["Topic 1", "Topic 2"],
  "follow_up_suggestions": ["Related question 1", "Related question 2"]
}`;

    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${openAIApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini', // Fast model for quicker responses
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: prompt }
        ],
        max_tokens: mode === 'quick' ? 500 : 1500,
        temperature: 0.3,
        stream: true,
      }),
    });

    if (!response.ok) {
      throw new Error(`OpenAI API error: ${response.status}`);
    }

    // Create a readable stream to forward the response
    const readable = new ReadableStream({
      async start(controller) {
        const reader = response.body?.getReader();
        if (!reader) {
          controller.close();
          return;
        }

        try {
          let buffer = '';
          
          while (true) {
            const { done, value } = await reader.read();
            
            if (done) {
              controller.close();
              break;
            }

            const chunk = new TextDecoder().decode(value);
            buffer += chunk;
            
            const lines = buffer.split('\n');
            buffer = lines.pop() || '';
            
            for (const line of lines) {
              if (line.startsWith('data: ')) {
                const data = line.slice(6);
                if (data === '[DONE]') {
                  controller.close();
                  return;
                }
                
                try {
                  const parsed = JSON.parse(data);
                  const content = parsed.choices?.[0]?.delta?.content;
                  if (content) {
                    controller.enqueue(new TextEncoder().encode(`data: ${JSON.stringify({ content })}\n\n`));
                  }
                } catch (e) {
                  // Skip invalid JSON
                }
              }
            }
          }
        } catch (error) {
          console.error('Streaming error:', error);
          controller.error(error);
        }
      }
    });

    return new Response(readable, {
      headers: {
        ...corsHeaders,
        'Content-Type': 'text/event-stream',
        'Cache-Control': 'no-cache',
        'Connection': 'keep-alive',
      },
    });

  } catch (error) {
    console.error('Error in electrician-ai-assistant-stream:', error);
    return new Response(JSON.stringify({ 
      error: 'Failed to process request',
      details: error.message 
    }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});