// ENHANCE EICR OBSERVATION - AI-powered observation enhancement
// Uses RAG (BS 7671 + practical work intelligence) to suggest code, description, regulation refs
import { serve, createClient, corsHeaders } from '../_shared/deps.ts';
import { searchPracticalWorkIntelligence, formatForAIContext } from '../_shared/rag-practical-work.ts';

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const authHeader = req.headers.get('Authorization');
    if (!authHeader) {
      return new Response(JSON.stringify({ success: false, error: 'Missing authorisation header' }), {
        status: 401, headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    const supabase = createClient(supabaseUrl, supabaseKey);

    // Verify user
    const userSupabase = createClient(
      supabaseUrl,
      Deno.env.get('SUPABASE_ANON_KEY')!,
      { global: { headers: { Authorization: authHeader } } }
    );
    const { data: { user }, error: userError } = await userSupabase.auth.getUser();
    if (userError || !user) {
      return new Response(JSON.stringify({ success: false, error: 'Unauthorised' }), {
        status: 401, headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    const { description, location, currentCode } = await req.json();

    if (!description || description.trim().length < 5) {
      return new Response(JSON.stringify({ success: false, error: 'Description must be at least 5 characters' }), {
        status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    // Build RAG query from the observation description
    const ragQuery = `${description} ${location || ''} EICR defect observation BS 7671 regulation code`;

    // Parallel RAG searches: BS 7671 regulations + practical work intelligence
    const [bs7671Results, practicalResults] = await Promise.all([
      searchPracticalWorkIntelligence(supabase, {
        query: ragQuery,
        matchCount: 10,
      }),
      searchPracticalWorkIntelligence(supabase, {
        query: `remedial action repair ${description}`,
        matchCount: 8,
      }),
    ]);

    // Extract BS 7671 regulation references from results
    const regulationRefs: Array<{ number: string; title: string; relevance: string }> = [];
    const seenRegs = new Set<string>();

    for (const result of [...bs7671Results.results, ...practicalResults.results]) {
      if (result.bs7671_regulations && result.bs7671_regulations.length > 0) {
        for (const reg of result.bs7671_regulations) {
          if (!seenRegs.has(reg)) {
            seenRegs.add(reg);
            regulationRefs.push({
              number: reg,
              title: result.primary_topic || '',
              relevance: result.content?.substring(0, 100) || '',
            });
          }
        }
      }
    }

    // Format RAG context for AI
    const practicalContext = formatForAIContext(bs7671Results.results.slice(0, 5));
    const remedialContext = formatForAIContext(practicalResults.results.slice(0, 5));

    // Call LLM to enhance the observation
    const openaiApiKey = Deno.env.get('OPENAI_API_KEY');
    if (!openaiApiKey) {
      throw new Error('OPENAI_API_KEY not configured');
    }

    const systemPrompt = `You are a UK-qualified electrical inspector enhancing EICR observations per BS 7671:2018+A2:2022.

Given an observation description, suggest:
1. The correct classification code (C1, C2, C3, or FI) with confidence
2. A professional BS 7671-compliant enhanced description
3. A plain English client explanation
4. A recommended remedial action

CLASSIFICATION GUIDE:
- C1 (Danger present): Risk of injury. Immediate protective action required.
- C2 (Potentially dangerous): Urgent remedial action required.
- C3 (Improvement recommended): Does not comply but no immediate danger.
- FI (Further investigation): Cannot fully assess without further investigation.

CONTEXT FROM KNOWLEDGE BASE:
${practicalContext}

REMEDIAL GUIDANCE:
${remedialContext}

REGULATION REFERENCES FOUND:
${regulationRefs.map(r => `${r.number}: ${r.title}`).join('\n')}

Respond ONLY with valid JSON matching this schema:
{
  "suggestedCode": "C1" | "C2" | "C3" | "FI",
  "confidence": 0.0-1.0,
  "enhancedDescription": "Professional BS 7671-compliant wording",
  "clientExplanation": "Plain English explanation for the client",
  "recommendation": "Recommended remedial action"
}

Use UK English only. Be concise but technically accurate.`;

    const userPrompt = `Observation: "${description}"${location ? `\nLocation: ${location}` : ''}${currentCode ? `\nCurrent code: ${currentCode}` : ''}`;

    const aiResponse = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${openaiApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-5-mini-2025-08-07',
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: userPrompt },
        ],
        max_completion_tokens: 3000,
      }),
    });

    if (!aiResponse.ok) {
      const errorText = await aiResponse.text();
      console.error('OpenAI error:', aiResponse.status, errorText);
      throw new Error('AI enhancement failed');
    }

    const aiData = await aiResponse.json();
    const content = aiData.choices?.[0]?.message?.content || '';

    // Parse JSON from response (handle markdown code blocks)
    let parsed: any;
    try {
      const jsonStr = content.replace(/```json\n?/g, '').replace(/```\n?/g, '').trim();
      parsed = JSON.parse(jsonStr);
    } catch {
      console.error('Failed to parse AI response:', content);
      throw new Error('Failed to parse AI suggestions');
    }

    // Validate and sanitise response
    const validCodes = ['C1', 'C2', 'C3', 'FI'];
    const suggestedCode = validCodes.includes(parsed.suggestedCode) ? parsed.suggestedCode : currentCode || 'C3';

    const suggestions = {
      suggestedCode,
      confidence: Math.min(Math.max(Number(parsed.confidence) || 0.5, 0), 1),
      enhancedDescription: String(parsed.enhancedDescription || description).substring(0, 500),
      clientExplanation: String(parsed.clientExplanation || '').substring(0, 500),
      recommendation: String(parsed.recommendation || '').substring(0, 500),
      regulationRefs: regulationRefs.slice(0, 8),
    };

    return new Response(JSON.stringify({
      success: true,
      suggestions,
    }), {
      status: 200,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });

  } catch (error: any) {
    console.error('❌ Error in enhance-eicr-observation:', error);
    return new Response(JSON.stringify({
      success: false,
      error: error.message || 'Failed to enhance observation',
    }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
