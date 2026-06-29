// ENHANCE EICR OBSERVATION - AI-powered observation enhancement
// Uses RAG (BS 7671 + practical work intelligence) to suggest code, description, regulation refs
import { captureException } from '../_shared/sentry.ts';
import { serve, createClient, corsHeaders } from '../_shared/deps.ts';
import {
  searchPracticalWorkIntelligence,
  formatForAIContext,
} from '../_shared/rag-practical-work.ts';
import { searchFacets, formatFacetsForPrompt } from '../_shared/bs7671-facets-rag.ts';

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const authHeader = req.headers.get('Authorization');
    if (!authHeader) {
      return new Response(
        JSON.stringify({ success: false, error: 'Missing authorisation header' }),
        {
          status: 401,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        }
      );
    }

    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    const supabase = createClient(supabaseUrl, supabaseKey);

    // Verify user
    const userSupabase = createClient(supabaseUrl, Deno.env.get('SUPABASE_ANON_KEY')!, {
      global: { headers: { Authorization: authHeader } },
    });
    const {
      data: { user },
      error: userError,
    } = await userSupabase.auth.getUser();
    if (userError || !user) {
      return new Response(JSON.stringify({ success: false, error: 'Unauthorised' }), {
        status: 401,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    const { description, location, currentCode } = await req.json();

    if (!description || description.trim().length < 5) {
      return new Response(
        JSON.stringify({ success: false, error: 'Description must be at least 5 characters' }),
        {
          status: 400,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        }
      );
    }

    // Build RAG query from the observation description
    const ragQuery = `${description} ${location || ''} EICR inspection defect BS 7671`;

    // Authoritative BS 7671 regulation grounding comes from bs7671_facets
    // (A4:2026) — NEVER from practical_work_intelligence (labour/job data),
    // which previously produced invented, job-brief "regulations". Remedial /
    // labour guidance still comes from practical_work_intelligence (its purpose).
    const [facets, remedialResults] = await Promise.all([
      searchFacets(supabase, { query: ragQuery, matchCount: 6 }),
      searchPracticalWorkIntelligence(supabase, {
        query: `remedial action repair ${description}`,
        matchCount: 8,
      }),
    ]);

    // Regulation references sourced ONLY from authoritative facets, deduped by
    // reg number. Facets carrying no reg number (general guidance) are skipped.
    const regulationRefs: Array<{ number: string; title: string; relevance: string }> = [];
    const seenRegs = new Set<string>();
    for (const f of facets) {
      const num = (f.regNumber || '').trim();
      if (!num || seenRegs.has(num)) continue;
      seenRegs.add(num);
      regulationRefs.push({
        number: num,
        title: (f.regTitle || f.primaryTopic || '').trim(),
        relevance: (f.content || '').replace(/\s+/g, ' ').trim().slice(0, 160),
      });
    }

    // Grounding blocks for the prompt
    const regulationContext = formatFacetsForPrompt(facets);
    const remedialContext = formatForAIContext(remedialResults.results.slice(0, 5));

    // Call LLM to enhance the observation
    const openaiApiKey = Deno.env.get('OPENAI_API_KEY');
    if (!openaiApiKey) {
      throw new Error('OPENAI_API_KEY not configured');
    }

    const systemPrompt = `You are a UK-qualified electrical inspector enhancing EICR observations per BS 7671:2018+A4:2026.

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

AUTHORITATIVE BS 7671 REGULATIONS (BS 7671:2018+A4:2026) — ground every regulation
reference in these facets. Do NOT cite or invent any regulation number that is not
listed here; if none are relevant, omit reg numbers rather than inventing one:
${regulationContext}

REMEDIAL / PRACTICAL GUIDANCE:
${remedialContext}

Respond ONLY with valid JSON matching this schema:
{
  "suggestedCode": "C1" | "C2" | "C3" | "FI",
  "confidence": 0.0-1.0,
  "enhancedDescription": "Professional BS 7671-compliant wording",
  "clientExplanation": "Plain English explanation for the client",
  "recommendation": "Recommended remedial action"
}

Use UK English only. Be concise but technically accurate. Reference regulation
numbers ONLY from the authoritative list above.`;

    const userPrompt = `Observation: "${description}"${location ? `\nLocation: ${location}` : ''}${currentCode ? `\nCurrent code: ${currentCode}` : ''}`;

    const aiResponse = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${openaiApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-5.4-mini-2026-03-17',
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: userPrompt },
        ],
        // gpt-5.x mini is a reasoning model — max_completion_tokens covers reasoning
        // AND visible output. At 3000 the reasoning ate most of the budget and long
        // observations truncated mid-sentence. Cap rewriting an observation needs
        // little reasoning, so low effort frees the budget for the full JSON output
        // (also faster + cheaper); 8000 is generous headroom on top.
        reasoning_effort: 'low',
        max_completion_tokens: 8000,
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
      const jsonStr = content
        .replace(/```json\n?/g, '')
        .replace(/```\n?/g, '')
        .trim();
      parsed = JSON.parse(jsonStr);
    } catch {
      console.error('Failed to parse AI response:', content);
      throw new Error('Failed to parse AI suggestions');
    }

    // Validate and sanitise response
    const validCodes = ['C1', 'C2', 'C3', 'FI'];
    const suggestedCode = validCodes.includes(parsed.suggestedCode)
      ? parsed.suggestedCode
      : currentCode || 'C3';

    const suggestions = {
      suggestedCode,
      confidence: Math.min(Math.max(Number(parsed.confidence) || 0.5, 0), 1),
      enhancedDescription: String(parsed.enhancedDescription || description).substring(0, 500),
      clientExplanation: String(parsed.clientExplanation || '').substring(0, 500),
      recommendation: String(parsed.recommendation || '').substring(0, 500),
      regulationRefs: regulationRefs.slice(0, 8),
    };

    return new Response(
      JSON.stringify({
        success: true,
        suggestions,
      }),
      {
        status: 200,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );
  } catch (error: any) {
    await captureException(error, { functionName: 'enhance-eicr-observation', requestUrl: req.url, requestMethod: req.method });
    console.error('❌ Error in enhance-eicr-observation:', error);
    return new Response(
      JSON.stringify({
        success: false,
        error: error.message || 'Failed to enhance observation',
      }),
      {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );
  }
});
