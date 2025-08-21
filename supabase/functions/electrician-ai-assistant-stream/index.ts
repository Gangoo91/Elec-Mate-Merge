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
    const { prompt, mode = "quick" } = await req.json();
    
    if (!prompt) {
      return new Response(JSON.stringify({ error: 'No prompt provided' }), {
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    const openAIApiKey = Deno.env.get('OPENAI_API_KEY');
    if (!openAIApiKey) {
      console.error('OpenAI API key not found');
      return new Response(JSON.stringify({ error: 'OpenAI API key not configured' }), {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    console.log(`Processing ${mode} mode request:`, prompt);

    // Optimized system prompts for different modes
    const systemPrompts = {
      quick: `You are a BS 7671 18th Edition electrical regulations expert. Provide CONCISE, direct answers in proper JSON format.

CRITICAL: You MUST respond with valid JSON in this exact format:
{
  "answer": "Your concise answer here",
  "regulation_refs": ["411.3.2.2", "533.1.1"],
  "key_points": ["Point 1", "Point 2"],
  "follow_up_suggestions": ["Question 1?", "Question 2?"]
}

Requirements:
- Keep answers under 150 words
- Focus on practical application
- Include specific regulation numbers
- Use bullet points for clarity
- Provide 2-3 follow-up suggestions`,

      detailed: `You are a comprehensive BS 7671 18th Edition electrical regulations expert. Provide detailed technical analysis in proper JSON format.

CRITICAL: You MUST respond with valid JSON in this exact format:
{
  "answer": "Your detailed technical answer with calculations, formulas, and comprehensive guidance",
  "regulation_refs": ["411.3.2.2", "533.1.1", "543.1.1"],
  "key_points": ["Technical point 1", "Safety consideration 2", "Practical application 3"],
  "calculations": "Step-by-step calculations if applicable",
  "safety_notes": "Important safety considerations",
  "follow_up_suggestions": ["Advanced question 1?", "Related topic 2?"]
}

Requirements:
- Provide comprehensive technical analysis
- Include calculations and formulas where relevant
- Reference multiple regulations
- Explain safety implications
- Cover installation methods and testing`
    };

    const selectedPrompt = systemPrompts[mode as keyof typeof systemPrompts] || systemPrompts.quick;

    console.log(`Sending request to OpenAI API with prompt type: ${mode}`);

    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${openAIApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini',
        messages: [
          { role: 'system', content: selectedPrompt },
          { role: 'user', content: prompt }
        ],
        temperature: 0.3,
        max_tokens: mode === 'detailed' ? 1500 : 800,
        stream: true,
      }),
    });

    if (!response.ok) {
      console.error('OpenAI API error:', response.status, response.statusText);
      throw new Error(`OpenAI API error: ${response.status}`);
    }

    console.log('OpenAI response received successfully');

    // Create a readable stream for Server-Sent Events
    const stream = new ReadableStream({
      async start(controller) {
        const reader = response.body?.getReader();
        if (!reader) {
          controller.close();
          return;
        }

        try {
          while (true) {
            const { done, value } = await reader.read();
            if (done) break;

            const chunk = new TextDecoder().decode(value);
            const lines = chunk.split('\n');

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
                    // Send as Server-Sent Event
                    controller.enqueue(new TextEncoder().encode(`data: ${JSON.stringify({ content })}\n\n`));
                  }
                } catch (e) {
                  // Skip invalid JSON chunks
                  continue;
                }
              }
            }
          }
        } catch (error) {
          console.error('Stream processing error:', error);
          controller.error(error);
        } finally {
          reader.releaseLock();
        }
      },
    });

    return new Response(stream, {
      headers: {
        ...corsHeaders,
        'Content-Type': 'text/event-stream',
        'Cache-Control': 'no-cache',
        'Connection': 'keep-alive',
      },
    });

  } catch (error) {
    console.error('Error in electrician-ai-assistant-stream function:', error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});