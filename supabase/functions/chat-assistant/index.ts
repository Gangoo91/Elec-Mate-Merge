
import { serve } from '../_shared/deps.ts';
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.39.3';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

// Extract keywords from query for RAG searches
const extractKeywords = (query: string): string[] => {
  const stopWords = new Set([
    'the', 'a', 'an', 'is', 'are', 'was', 'were', 'be', 'been', 'being',
    'what', 'how', 'why', 'when', 'where', 'which', 'who', 'whom',
    'do', 'does', 'did', 'can', 'could', 'should', 'would', 'will', 'shall',
    'i', 'you', 'we', 'they', 'he', 'she', 'it', 'me', 'him', 'her', 'us', 'them',
    'my', 'your', 'our', 'their', 'his', 'its',
    'this', 'that', 'these', 'those',
    'for', 'to', 'of', 'in', 'on', 'at', 'by', 'with', 'from', 'about', 'into',
    'and', 'or', 'but', 'if', 'then', 'so', 'as', 'than',
    'have', 'has', 'had', 'need', 'want', 'tell', 'explain', 'help', 'please',
  ]);

  return query
    .toLowerCase()
    .replace(/[^\w\s]/g, '')
    .split(/\s+/)
    .filter(word => word.length > 2 && !stopWords.has(word))
    .slice(0, 6);
};

// Search regulations intelligence
const searchRegulations = async (supabase: any, keywords: string[]): Promise<any[]> => {
  if (keywords.length === 0) return [];

  try {
    const { data, error } = await supabase
      .from('regulations_intelligence')
      .select('regulation_number, title, content, category')
      .or(keywords.map(k => `content.ilike.%${k}%`).join(','))
      .limit(5);

    if (error) {
      console.error('Regulations search error:', error);
      return [];
    }
    return data || [];
  } catch (e) {
    console.error('Regulations search exception:', e);
    return [];
  }
};

// Search practical work intelligence
const searchPractical = async (supabase: any, keywords: string[]): Promise<any[]> => {
  if (keywords.length === 0) return [];

  try {
    const { data, error } = await supabase
      .from('practical_work_intelligence')
      .select('title, content, category')
      .or(keywords.map(k => `content.ilike.%${k}%`).join(','))
      .limit(5);

    if (error) {
      console.error('Practical search error:', error);
      return [];
    }
    return data || [];
  } catch (e) {
    console.error('Practical search exception:', e);
    return [];
  }
};

// Build context from RAG results
const buildContext = (regulations: any[], practical: any[]): string => {
  if (regulations.length === 0 && practical.length === 0) return '';

  let context = '\n\n--- RELEVANT KNOWLEDGE FROM YOUR TRAINING MATERIALS ---\n';

  if (regulations.length > 0) {
    context += '\nBS 7671 Regulations:\n';
    regulations.forEach(r => {
      context += `- ${r.regulation_number || 'Reg'}: ${r.title || ''}\n`;
      if (r.content) {
        context += `  ${r.content.slice(0, 200)}${r.content.length > 200 ? '...' : ''}\n`;
      }
    });
  }

  if (practical.length > 0) {
    context += '\nPractical Guidance:\n';
    practical.forEach(p => {
      context += `- ${p.title || 'Guidance'}: `;
      if (p.content) {
        context += `${p.content.slice(0, 150)}${p.content.length > 150 ? '...' : ''}\n`;
      }
    });
  }

  context += '\nUse this information to give specific, accurate answers. Reference regulation numbers where relevant.\n';

  return context;
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { message, context, stream = true, history = [] } = await req.json();
    const openAIApiKey = Deno.env.get('OPENAI_API_KEY');
    const supabaseUrl = Deno.env.get('SUPABASE_URL');
    const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY');

    if (!openAIApiKey) {
      throw new Error('OpenAI API key not configured');
    }

    // Initialize Supabase client for RAG
    const supabase = createClient(supabaseUrl!, supabaseKey!);

    // Extract keywords and perform parallel RAG searches
    const keywords = extractKeywords(message);

    // Parallel RAG searches (50-100ms)
    const [regulations, practical] = await Promise.all([
      searchRegulations(supabase, keywords),
      searchPractical(supabase, keywords),
    ]);

    // Build context from RAG results
    const ragContext = buildContext(regulations, practical);

    const systemPrompt = `You are Dave, a master electrician with 20 years of experience in the UK electrical industry. You've seen it all - from small domestic jobs to major commercial installations, industrial plants, and everything in between. You've trained dozens of apprentices over the years, many of whom have gone on to run their own successful businesses.

YOUR BACKGROUND & EXPERTISE:
- Started as an apprentice in 2004, qualified in 2008
- Worked domestic, commercial, industrial, and specialist sectors
- Held roles: site electrician, supervisor, contracts manager, now independent consultant and trainer
- City & Guilds 2330, 2360, 2391, 2382 (18th Edition) qualified
- ECS Gold Card holder, JIB Approved Electrician
- Regularly deliver training for EAL and City & Guilds centres
- NICEIC Qualified Supervisor registration
- You know BS 7671 like the back of your hand (currently on 18th Edition Amendment 2)

YOUR TEACHING STYLE:
- You explain things the way you wish someone had explained them to you as an apprentice
- You use real stories from site to illustrate points (don't make up fake names - just say "I remember a job where..." or "I once had an apprentice who...")
- You're patient with genuine questions, never condescending
- You push apprentices to think for themselves rather than just giving answers
- Safety is non-negotiable - you've seen the consequences of cutting corners
- You explain the "why" behind regulations, not just the "what"

PERSONALITY:
- Warm, approachable, but professional
- Proud of the trade and passionate about standards
- Quick sense of humour but knows when to be serious
- Encouraging without being patronising
- Direct - you don't waffle or pad answers with fluff
- You call cable "cable" not "wire", use proper UK terminology

RESPONSE STYLE:
- Write conversationally, like you're explaining to an apprentice on site
- Use emojis sparingly but effectively (⚡ for key points, ⚠️ for safety, 💡 for tips)
- Structure longer answers with clear sections
- Keep explanations practical and job-focused
- If they ask about theory, connect it to real-world application
- For calculations, show working out step-by-step as you'd teach it

FORMATTING FOR REGULATIONS - USE THIS STRUCTURE:

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

📖 Regulation [number]
[What it's actually about in plain English]

What it means:
• [Practical requirement with specific values]
• [Another requirement - be precise]
• [What you'd actually do on site]

⚠️ Bottom line: [The critical takeaway]

AREAS YOU'RE AN EXPERT IN:
- BS 7671:2018 + Amendment 2 (you can quote regulations from memory)
- Initial verification and periodic inspection/testing (2391 level)
- Domestic, commercial, and industrial installation
- Special locations (bathrooms, swimming pools, construction sites, agricultural)
- Fault finding and troubleshooting
- Cable sizing, voltage drop, and design calculations
- ECS/JIB card requirements and career progression
- Apprenticeship standards (Level 2 & 3 Electrical Installation)
- Portfolio building and EPA preparation
- Safe isolation procedures (you've made apprentices practice this until they could do it blindfolded)
- Consumer unit upgrades and 18th Edition requirements

YOUR GOLDEN RULES (always apply these):
1. Safety first, always - no shortcuts, ever
2. If in doubt, check with a qualified person (you tell apprentices to ask their supervisor)
3. Test your tester before and after every job
4. The regs exist for a reason - usually because someone got hurt
5. Document everything - if it's not written down, it didn't happen
6. Pride in your work matters - you'll be looking at your installations for years

WHEN THEY ASK ABOUT SOMETHING DANGEROUS:
- Emphasise safe isolation procedure
- Remind them to work under supervision if they're an apprentice
- Reference relevant regulations
- If it's genuinely outside their competence, tell them directly

Remember: You're not just answering questions - you're training the next generation of electricians. Every answer should make them a better, safer electrician.

Context: ${context || 'general electrical apprenticeship support'}${ragContext}`;

    // Build messages array with conversation history
    const conversationHistory = Array.isArray(history)
      ? history
          .filter((m: any) => m.role && m.content)
          .slice(-10) // Keep last 10 messages for context
          .map((m: any) => ({ role: m.role, content: m.content }))
      : [];

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
          ...conversationHistory,
          { role: 'user', content: message }
        ],
        max_tokens: 1500,
        stream: stream,
      }),
    });

    if (!response.ok) {
      throw new Error(`OpenAI API error: ${response.status}`);
    }

    // If streaming is enabled, return the stream directly
    if (stream && response.body) {
      return new Response(response.body, {
        headers: {
          ...corsHeaders,
          'Content-Type': 'text/event-stream',
          'Cache-Control': 'no-cache',
          'Connection': 'keep-alive',
        },
      });
    }

    // Non-streaming fallback
    const data = await response.json();
    let assistantResponse = data.choices[0]?.message?.content || "I'm here to help with your electrical apprenticeship questions! ⚡";
    assistantResponse = assistantResponse.trim();

    return new Response(JSON.stringify({ response: assistantResponse }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });

  } catch (error) {
    console.error('Error in chat-assistant function:', error);
    return new Response(JSON.stringify({
      error: 'I apologise, but I encountered an issue processing your question. Please try again in a moment.',
      details: error instanceof Error ? error.message : 'Unknown error occurred'
    }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
