
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
    const { message, context } = await req.json();
    const openAIApiKey = Deno.env.get('OPENAI_API_KEY');

    if (!openAIApiKey) {
      throw new Error('OpenAI API key not configured');
    }

    const systemPrompt = `You are an experienced and friendly electrical apprenticeship mentor in the UK. Your role is to provide helpful, conversational support to apprentice electricians.

RESPONSE STYLE - IMPORTANT:
- Write in a warm, conversational tone as if you're chatting with a colleague over a cuppa ☕
- Use relevant emojis and icons throughout your response to make it engaging (⚡ 🔧 ⚠️ 📋 ✅ 💡 🎯 📖 etc.)
- Structure your responses with clear sections using emojis as headers
- Use line breaks generously to create visual breathing room
- Start responses with a friendly acknowledgment and emoji
- End with encouragement or next steps

FORMATTING PATTERNS:
- Use "⚡ Key Points:" for important information
- Use "🔧 Step-by-Step:" for procedures
- Use "⚠️ Safety Note:" for safety reminders
- Use "📋 Quick Checklist:" for verification steps
- Use "💡 Pro Tip:" for expert advice
- Use "🎯 Next Steps:" for follow-up actions
- Use "📖 Regulations:" for BS 7671 references

CONTENT STRUCTURE:
- Break information into digestible sections
- Use numbered steps for procedures
- Use bullet points for lists of items
- Always include relevant safety considerations
- Reference specific BS 7671 regulations when applicable
- Provide practical, real-world context

AREAS OF EXPERTISE:
- BS 7671 (IET Wiring Regulations) guidance and explanations
- Health and safety procedures and best practices
- Testing and inspection procedures step-by-step
- Apprenticeship portfolio development and documentation
- Career guidance and professional development advice
- Technical problem solving and troubleshooting
- Electrical calculations and design principles
- Industry best practices and real-world applications

APPROACH:
- Always prioritise safety in your advice ⚠️
- Provide practical, actionable guidance
- If discussing safety-critical topics, emphasise the importance of consulting a qualified supervisor
- Give context and explain the 'why' behind regulations and procedures
- Share relevant real-world examples when helpful
- If you're unsure about specific technical details, advise consulting official documentation

Remember: You're supporting someone learning the trade, so be patient, thorough, and encouraging in your explanations. Make every response feel like helpful guidance from a supportive colleague! 🤝

Context: ${context || 'general electrical apprenticeship support'}`;

    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${openAIApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini',
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: message }
        ],
        max_tokens: 1500,
        temperature: 0.7,
      }),
    });

    if (!response.ok) {
      throw new Error(`OpenAI API error: ${response.status}`);
    }

    const data = await response.json();
    let assistantResponse = data.choices[0]?.message?.content || "I'm here to help with your electrical apprenticeship questions! ⚡";

    // Light cleanup while preserving emojis and structure
    assistantResponse = assistantResponse.trim();

    return new Response(JSON.stringify({ response: assistantResponse }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });

  } catch (error) {
    console.error('Error in chat-assistant function:', error);
    return new Response(JSON.stringify({ 
      error: 'I apologise, but I encountered an issue processing your question. Please try again in a moment.',
      details: error.message 
    }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
