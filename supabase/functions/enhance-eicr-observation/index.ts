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
      // Retrieve wider than we need, because the Part 7 scope filter below
      // discards out-of-location matches — on a bathroom observation four of
      // six came back from the wrong special location. One extra vector query
      // costs nothing; being left with two in-scope regulations does.
      searchFacets(supabase, { query: ragQuery, matchCount: 12 }),
      searchPracticalWorkIntelligence(supabase, {
        query: `remedial action repair ${description}`,
        matchCount: 8,
      }),
    ]);

    /**
     * Part 7 special-location gate.
     *
     * Retrieval is semantic, and phrases like "supplementary protective
     * equipotential bonding" appear in *every* Part 7 section. So a plain
     * domestic bathroom observation came back citing 710 (medical locations),
     * 702 (swimming pools), 740 (fairgrounds) and 714 (outdoor lighting)
     * alongside the one that actually applied, 701 — four wrong out of six,
     * behind a button labelled "Use these".
     *
     * A `7xx` regulation is therefore only offered when the observation itself
     * indicates that location. Anything outside Part 7 (Parts 1–6, the general
     * requirements) is always kept — those apply everywhere.
     *
     * Section scopes below were verified against `bs7671_facets` (A4:2026), not
     * recalled. When nothing matches we drop every `7xx` rather than guess: a
     * general Part 4 citation is right but unspecific, whereas a swimming-pool
     * regulation on a bathroom is simply wrong and an assessor will see it.
     */
    const PART7_SCOPES: Array<{ section: string; test: RegExp }> = [
      { section: '701', test: /\b(bath|shower|wet ?room|en.?suite|wc\b|washroom)/i },
      { section: '702', test: /\b(swimming|pool|paddling|basin|hot ?tub|spa\b)/i },
      { section: '703', test: /\b(sauna)/i },
      { section: '704', test: /\b(construction|demolition|building site)/i },
      { section: '705', test: /\b(agricultur|horticultur|livestock|barn|farm)/i },
      { section: '706', test: /\b(restricted movement|conducting location)/i },
      { section: '708', test: /\b(caravan park|camping|touring pitch)/i },
      { section: '709', test: /\b(marina|pontoon|berth|inland navigation)/i },
      { section: '710', test: /\b(medical|hospital|clinic|dental|patient|operating theatre)/i },
      { section: '711', test: /\b(exhibition|show ?stand|booth)/i },
      { section: '712', test: /\b(solar|photovoltaic|\bpv\b)/i },
      { section: '714', test: /\b(street ?light|outdoor lighting|highway|bollard|traffic sign)/i },
      { section: '715', test: /\b(extra.?low voltage lighting|elv lighting)/i },
      { section: '717', test: /\b(mobile unit|transportable unit|portable building)/i },
      { section: '721', test: /\b(caravan|motor ?caravan|motorhome)/i },
      { section: '722', test: /\b(electric vehicle|ev charg|charge ?point|evse)/i },
      { section: '729', test: /\b(gangway|switchroom|maintenance access)/i },
      { section: '730', test: /\b(shore connection|vessel)/i },
      { section: '740', test: /\b(fairground|amusement|circus|funfair)/i },
      { section: '753', test: /\b(underfloor heating|heating cable|embedded heating)/i },
    ];

    const locationHay = `${description} ${location || ''}`;
    const allowedPart7 = new Set(
      PART7_SCOPES.filter((s) => s.test.test(locationHay)).map((s) => s.section)
    );

    const isOutOfScopePart7 = (regNumber: string): boolean => {
      const section = regNumber.match(/^(7\d{2})\./)?.[1];
      if (!section) return false; // not Part 7 — always allowed
      return !allowedPart7.has(section);
    };

    // Regulation references sourced ONLY from authoritative facets, deduped by
    // reg number. Facets carrying no reg number (general guidance) are skipped.
    //
    // The scope filter is applied to the FACETS, before anything downstream, so
    // an out-of-scope special location is not merely hidden from the reference
    // list — it never reaches the model at all. Filtering only the returned
    // refs would leave the prose grounded in swimming-pool and fairground
    // regulations while appearing clean. Dropping them early also shortens the
    // prompt, which is the cheapest latency saving available here.
    const droppedPart7: string[] = [];
    const scopedFacets = facets.filter((f) => {
      const num = (f.regNumber || '').trim();
      if (num && isOutOfScopePart7(num)) {
        droppedPart7.push(num);
        return false;
      }
      return true;
    });

    /**
     * Only BS 7671 itself is cited as a BS 7671 reference.
     *
     * The corpus holds three documents — bs7671, gn3 and osg — and their
     * section numbering overlaps in shape. A bathroom query returned "8.1" and
     * "7.2.5" alongside the real regulations; those are GN3/OSG section numbers
     * being listed under a heading that reads "BS 7671 references". An
     * electrician quoting one back to a scheme assessor would be quoting a
     * guidance note as though it were the standard.
     *
     * GN3 and OSG still reach the model through `regulationContext` below —
     * they ground the wording, which is their purpose. They are simply not
     * offered as citations.
     */
    const regulationRefs: Array<{ number: string; title: string; relevance: string }> = [];
    const seenRegs = new Set<string>();
    for (const f of scopedFacets) {
      if ((f.documentType || '').toLowerCase() !== 'bs7671') continue;
      const num = (f.regNumber || '').trim();
      if (!num || seenRegs.has(num)) continue;
      seenRegs.add(num);
      regulationRefs.push({
        number: num,
        title: (f.regTitle || f.primaryTopic || '').trim(),
        relevance: (f.content || '').replace(/\s+/g, ' ').trim().slice(0, 160),
      });
    }
    if (droppedPart7.length) {
      console.log(
        `[enhance-eicr-observation] dropped out-of-scope Part 7: ${droppedPart7.join(', ')}` +
          ` (in scope: ${[...allowedPart7].join(', ') || 'none'})`
      );
    }

    // Grounding blocks for the prompt — scoped facets only.
    const regulationContext = formatFacetsForPrompt(scopedFacets);
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
