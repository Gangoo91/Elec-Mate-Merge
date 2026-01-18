
import { serve } from '../_shared/deps.ts';
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.39.3';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

// Electrical domain query expansions for better RAG retrieval
const queryExpansions: Record<string, string[]> = {
  'test': ['testing', 'initial verification', 'periodic inspection', 'inspection', 'verify'],
  'testing': ['test', 'initial verification', 'periodic inspection', 'inspection', 'verify'],
  'sequence': ['procedure', 'order', 'steps', 'method', 'process'],
  'order': ['sequence', 'procedure', 'steps'],
  'rcd': ['residual current device', 'rcbo', 'trip', '30ma', 'protective device'],
  'circuit': ['wiring', 'installation', 'ring', 'radial', 'final circuit'],
  'continuity': ['r1r2', 'ring', 'cpc', 'protective conductor'],
  'insulation': ['ir', 'resistance', 'megger', 'insulation resistance'],
  'earth': ['earthing', 'cpc', 'ze', 'zs', 'electrode', 'tncs', 'tns', 'tt'],
  'fault': ['loop', 'impedance', 'zs', 'prospective', 'pfc', 'pscc'],
  'polarity': ['phase', 'neutral', 'live', 'correct'],
  'isolation': ['safe isolation', 'lock off', 'prove dead', 'isolate'],
  'safe': ['safety', 'isolation', 'procedure', 'secure'],
  'cable': ['wiring', 'conductor', 'size', 'csa', 'current carrying'],
  'voltage': ['drop', 'supply', '230v', '400v', 'nominal'],
  'consumer': ['unit', 'board', 'distribution', 'fuseboard', 'db'],
  'protection': ['mcb', 'rcbo', 'rcd', 'fuse', 'overcurrent', 'protective device'],
  'regulation': ['bs7671', 'regs', 'amendment', 'requirement', 'compliance'],
  'certificate': ['eicr', 'eic', 'minor works', 'condition report'],
  'domestic': ['house', 'dwelling', 'home', 'residential'],
  'commercial': ['shop', 'office', 'retail', 'business'],
  'industrial': ['factory', 'plant', 'manufacturing', 'heavy'],
  'special': ['location', 'bathroom', 'zone', 'swimming', 'agricultural'],
};

// Extract keywords with domain expansion for better RAG
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
    'correct', 'right', 'proper', 'best', 'good',
  ]);

  // Extract base keywords
  const baseKeywords = query
    .toLowerCase()
    .replace(/[^\w\s]/g, ' ')
    .split(/\s+/)
    .filter(word => word.length > 2 && !stopWords.has(word));

  // Expand with domain-specific terms
  const expanded = new Set<string>();
  baseKeywords.forEach(keyword => {
    expanded.add(keyword);
    const expansions = queryExpansions[keyword];
    if (expansions) {
      expansions.forEach(exp => expanded.add(exp));
    }
  });

  // Return up to 15 keywords (base + expanded)
  return Array.from(expanded).slice(0, 15);
};

// Search regulations intelligence with improved matching
const searchRegulations = async (supabase: any, keywords: string[]): Promise<any[]> => {
  if (keywords.length === 0) return [];

  try {
    // Search in both content and title for better matching
    const orConditions = keywords.flatMap(k => [
      `content.ilike.%${k}%`,
      `title.ilike.%${k}%`
    ]);

    const { data, error } = await supabase
      .from('regulations_intelligence')
      .select('regulation_number, title, content, category')
      .or(orConditions.join(','))
      .limit(15); // Increased from 5 to 15

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

// Search practical work intelligence with improved matching
const searchPractical = async (supabase: any, keywords: string[]): Promise<any[]> => {
  if (keywords.length === 0) return [];

  try {
    // Search in both content and title for better matching
    const orConditions = keywords.flatMap(k => [
      `content.ilike.%${k}%`,
      `title.ilike.%${k}%`
    ]);

    const { data, error } = await supabase
      .from('practical_work_intelligence')
      .select('title, content, category')
      .or(orConditions.join(','))
      .limit(15); // Increased from 5 to 15

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

// Build context from RAG results - prioritise regulations for compliance
const buildContext = (regulations: any[], practical: any[]): string => {
  if (regulations.length === 0 && practical.length === 0) return '';

  let context = '\n\n';

  // Prioritise regulations - these are authoritative
  if (regulations.length > 0) {
    context += '📖 BS 7671 REGULATIONS (Authoritative):\n\n';
    // Take top 10 most relevant regulations, with more content
    regulations.slice(0, 10).forEach(r => {
      context += `REGULATION ${r.regulation_number || 'N/A'}: ${r.title || ''}\n`;
      if (r.content) {
        // Include up to 400 chars for better context
        context += `${r.content.slice(0, 400)}${r.content.length > 400 ? '...' : ''}\n\n`;
      }
    });
  }

  if (practical.length > 0) {
    context += '\n🔧 PRACTICAL GUIDANCE (Field-tested procedures):\n\n';
    // Take top 8 practical guides with more content
    practical.slice(0, 8).forEach(p => {
      context += `${p.title || 'Procedure'}:\n`;
      if (p.content) {
        // Include up to 350 chars for better context
        context += `${p.content.slice(0, 350)}${p.content.length > 350 ? '...' : ''}\n\n`;
      }
    });
  }

  return context;
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { message, context, stream = true, history = [], imageUrl } = await req.json();
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

    // Build system prompt with RAG context at the TOP for priority
    const ragSection = ragContext ? `
=== CRITICAL: USE THIS TECHNICAL REFERENCE ===
The following information comes from official BS 7671 regulations and verified practical guidance.
You MUST base your answer on this documentation. Quote regulation numbers where relevant.
${ragContext}
=== END TECHNICAL REFERENCE ===

` : '';

    const systemPrompt = `${ragSection}You are Dave, a master electrician with 20 years of experience in the UK electrical industry. You've seen it all - from small domestic jobs to major commercial installations, industrial plants, and everything in between. You've trained dozens of apprentices over the years, many of whom have gone on to run their own successful businesses.

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

CORRECT TEST SEQUENCE (BS 7671:2018+A3 / GN3 - THIS IS AUTHORITATIVE):
When asked about test sequence or initial verification order, ALWAYS give this exact sequence:

1. VISUAL INSPECTION (Supply OFF)
   - Correct selection and erection, connections, IP ratings, labels, accessibility

2. DEAD TESTS (Supply ISOLATED - prove dead with GS38 compliant tester!)
   a) Continuity of protective conductors (R1+R2) including main and supplementary bonding
   b) Continuity of ring final circuit conductors (r1, rn, r2 method)
   c) Insulation resistance (minimum 1MΩ at 500V DC between L-E, N-E, L-N)
   d) Polarity (confirm via continuity testing while isolated)
   e) Earth electrode resistance (TT systems - can use external loop tester)

3. LIVE TESTS (Supply CONNECTED - only after ALL dead tests pass!)
   a) Earth fault loop impedance (Zs) - compare with Regulation 411.4.5 values
   b) Prospective fault current (IPFC at origin, PSCC at each DB)
   c) RCD operation (5x, 1x, and ramp test - must trip within specified times)
   d) Functional testing (switches, isolators, controls, interlocks)

⚠️ NEVER tell anyone to do live tests before dead tests - this is a SAFETY requirement.
Reference: GN3 Table 10.1, Regulation 612.1

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

WHEN THEY SEND YOU A PHOTO:
- First describe what you can see clearly (cable types, colours, equipment, installation)
- Identify any issues or concerns you spot (bad terminations, overcrowding, incorrect glands, etc.)
- Praise good work if you see it - apprentices need encouragement
- Reference relevant regulations if applicable
- Give practical advice on how to fix any issues
- If you can't see something clearly, ask them to take a better photo
- Always consider safety - if you see something dangerous, make that the priority

Remember: You're not just answering questions - you're training the next generation of electricians. Every answer should make them a better, safer electrician.

When answering questions about testing, procedures, or regulations, ALWAYS check the technical reference provided above and cite specific regulation numbers (e.g., "According to Regulation 613.2...").

Current topic context: ${context || 'general electrical apprenticeship support'}`;

    // Build messages array with conversation history
    const conversationHistory = Array.isArray(history)
      ? history
          .filter((m: any) => m.role && m.content)
          .slice(-10) // Keep last 10 messages for context
          .map((m: any) => ({ role: m.role, content: m.content }))
      : [];

    // Build user message - with image if provided
    let userMessage: any;
    if (imageUrl) {
      // Multimodal message with image
      userMessage = {
        role: 'user',
        content: [
          { type: 'text', text: message },
          { type: 'image_url', image_url: { url: imageUrl, detail: 'high' } }
        ]
      };
    } else {
      // Text-only message
      userMessage = { role: 'user', content: message };
    }

    // Use gpt-4o for vision, gpt-4o-mini for text-only
    const modelToUse = imageUrl ? 'gpt-4o' : 'gpt-4o-mini';

    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${openAIApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: modelToUse,
        messages: [
          { role: 'system', content: systemPrompt },
          ...conversationHistory,
          userMessage
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
