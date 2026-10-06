/**
 * analyze-diary-entry — Per-entry AI Evidence Analysis
 *
 * Deep analysis of a single diary entry for portfolio evidence potential.
 * Uses RAG to match against qualification requirements and practical work
 * intelligence, then generates structured analysis via OpenAI tool calling.
 *
 * Model: gpt-5.4-mini-2026-03-17 via tool calling for structured JSON output.
 */

import { serve } from '../_shared/deps.ts';
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';
import { captureException } from '../_shared/sentry.ts';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers':
    'authorization, x-client-info, apikey, content-type, x-supabase-timeout, x-request-id',
};

// ---------- Stop words for keyword filtering ----------
const STOP_WORDS = new Set([
  'the',
  'a',
  'an',
  'and',
  'or',
  'but',
  'in',
  'on',
  'at',
  'to',
  'for',
  'of',
  'with',
  'by',
  'from',
  'is',
  'are',
  'was',
  'were',
  'be',
  'been',
  'being',
  'have',
  'has',
  'had',
  'do',
  'does',
  'did',
  'will',
  'would',
  'could',
  'should',
  'may',
  'might',
  'shall',
  'can',
  'need',
  'must',
  'it',
  'its',
  'this',
  'that',
  'these',
  'those',
  'they',
  'them',
  'their',
  'he',
  'she',
  'his',
  'her',
  'we',
  'our',
  'you',
  'your',
  'my',
  'me',
  'who',
  'which',
  'what',
  'when',
  'where',
  'how',
  'why',
  'all',
  'each',
  'every',
  'both',
  'few',
  'more',
  'most',
  'other',
  'some',
  'such',
  'no',
  'not',
  'only',
  'same',
  'so',
  'than',
  'too',
  'very',
  'just',
  'because',
  'as',
  'into',
  'through',
  'during',
  'before',
  'after',
  'above',
  'below',
  'between',
  'out',
  'off',
  'over',
  'under',
  'again',
  'then',
  'once',
  'here',
  'there',
  'about',
  'up',
  'if',
  'also',
  'any',
  'etc',
  'got',
  'ran',
  'did',
  'put',
  'set',
  'get',
  'let',
  'say',
  'use',
  'used',
]);

// ---------- Tool schema for structured output ----------
const analysisTool = {
  type: 'function' as const,
  function: {
    name: 'diary_entry_analysis',
    description: 'Structured evidence analysis of a single diary entry for portfolio use',
    parameters: {
      type: 'object',
      properties: {
        evidenceStrength: {
          type: 'string',
          enum: ['strong', 'moderate', 'weak'],
          description: 'Overall strength of this entry as portfolio evidence',
        },
        whyGoodEvidence: {
          type: 'string',
          description:
            '2-3 sentences explaining why this entry is good (or could be better) portfolio evidence',
        },
        matchedCriteria: {
          type: 'array',
          items: {
            type: 'object',
            properties: {
              unitCode: { type: 'string' },
              unitTitle: { type: 'string' },
              acCode: { type: 'string' },
              acText: { type: 'string' },
              confidence: { type: 'number' },
              reason: { type: 'string' },
            },
            required: ['unitCode', 'acCode', 'acText', 'confidence', 'reason'],
          },
          description: 'Assessment criteria this entry could evidence, with confidence 0-100',
        },
        qualityTips: {
          type: 'array',
          items: { type: 'string' },
          description:
            'Up to 3 tips to strengthen this as evidence (e.g. add measurements, reference regulations)',
        },
        suggestedTitle: {
          type: 'string',
          description: 'Suggested portfolio item title for this entry',
        },
      },
      required: [
        'evidenceStrength',
        'whyGoodEvidence',
        'matchedCriteria',
        'qualityTips',
        'suggestedTitle',
      ],
    },
  },
};

serve(async (req: Request) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    console.log('[analyze-diary-entry] Starting entry analysis...');

    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    const openAIApiKey = Deno.env.get('OPENAI_API_KEY');

    if (!openAIApiKey) {
      console.error('[analyze-diary-entry] OPENAI_API_KEY not set');
      return new Response(
        JSON.stringify({ success: false, error: 'OpenAI API key not configured' }),
        {
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        }
      );
    }

    // Authenticate user
    const authHeader = req.headers.get('Authorization');
    if (!authHeader) {
      return new Response(JSON.stringify({ error: 'Missing auth header' }), {
        status: 401,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    const supabase = createClient(supabaseUrl, supabaseKey, {
      global: { headers: { Authorization: authHeader } },
    });

    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser();
    if (authError || !user) {
      return new Response(JSON.stringify({ error: 'Unauthorised' }), {
        status: 401,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    console.log('[analyze-diary-entry] Auth passed for user:', user.id);

    // A bounded, logged call (same pattern as breakdown-job-tasks): it's an
    // on-demand check, but nothing stopped it being run in a loop.
    const admin = createClient(supabaseUrl, supabaseKey, {
      auth: { persistSession: false, autoRefreshToken: false },
    });
    const hourAgo = new Date(Date.now() - 60 * 60 * 1000).toISOString();
    const { count: recentCalls } = await admin
      .from('ai_usage_log')
      .select('id', { count: 'exact', head: true })
      .eq('user_id', user.id)
      .eq('fn_name', 'analyze-diary-entry')
      .gte('called_at', hourAgo);
    if ((recentCalls ?? 0) >= 30) {
      return new Response(
        JSON.stringify({
          success: false,
          error: 'That’s a lot of checks — try again in a little while.',
        }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }
    const body = await req.json();
    const raw = body.entry;
    const qualificationCode: string | null = body.qualificationCode || null;

    if (!raw || typeof raw !== 'object') {
      return new Response(JSON.stringify({ error: 'Missing entry' }), {
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    // Cap what one call can send: it all goes into the prompt.
    const cut = (v: unknown, n: number) => (typeof v === 'string' ? v.slice(0, n) : '');
    const list = (v: unknown, n: number, len: number) =>
      Array.isArray(v)
        ? v
            .filter((x) => typeof x === 'string')
            .slice(0, n)
            .map((x) => x.slice(0, len))
        : [];
    const entry = {
      ...raw,
      site_name: cut(raw.site_name, 200),
      what_i_learned: cut(raw.what_i_learned, 4000),
      issues_or_questions: cut(raw.issues_or_questions, 2000),
      tasks_completed: list(raw.tasks_completed, 20, 200),
      skills_practised: list(raw.skills_practised, 20, 100),
      unit_codes: list(raw.unit_codes, 12, 20),
    };

    // Counted only once the request is valid.
    await admin.from('ai_usage_log').insert({ user_id: user.id, fn_name: 'analyze-diary-entry' });

    // ---------- RAG: parallel queries ----------
    const tasks = entry.tasks_completed || [];
    const skills = entry.skills_practised || [];
    const taskText = tasks.join(' ');

    // Build keywords for qualification search
    const keywords = [...tasks, ...skills, entry.what_i_learned || '']
      .join(' ')
      .toLowerCase()
      .split(/\s+/)
      .filter((w: string) => w.length >= 3 && !STOP_WORDS.has(w));
    const uniqueKeywords = Array.from(new Set(keywords)).slice(0, 15);

    let ragContext = '';
    console.log(
      '[analyze-diary-entry] Starting RAG queries, qualCode:',
      qualificationCode,
      'keywords:',
      uniqueKeywords.length,
      'taskText length:',
      taskText.length
    );

    const [qualResult, practicalResult] = await Promise.allSettled([
      // Qualification requirements
      qualificationCode && uniqueKeywords.length > 0
        ? supabase.rpc('search_qualification_requirements', {
            p_keywords: uniqueKeywords,
            p_qualification_code: qualificationCode,
            p_limit: 10,
          })
        : Promise.resolve({ data: null }),

      // Practical work intelligence
      taskText.length > 0
        ? supabase.rpc('search_practical_work_fast', {
            query_text: taskText,
            match_count: 3,
          })
        : Promise.resolve({ data: null }),
    ]);

    // Process qualification results
    if (qualResult.status === 'fulfilled') {
      const qualData = qualResult.value.data;
      if (qualData && qualData.length > 0) {
        ragContext += `\n\n--- Qualification Requirements (${qualificationCode}) ---\n`;
        for (const req of qualData) {
          ragContext += `- Unit ${req.unit_code} (${req.unit_title}): ${req.learning_outcome}\n`;
          if (req.assessment_criteria?.length) {
            ragContext += `  ACs: ${req.assessment_criteria.join('; ')}\n`;
          }
        }
      }
    } else {
      console.warn('[analyze-diary-entry] Qualification search failed:', qualResult.reason);
    }

    // Process practical work results
    if (practicalResult.status === 'fulfilled') {
      const practicalData = practicalResult.value.data;
      if (practicalData && practicalData.length > 0) {
        ragContext += '\n\n--- Relevant Practical Knowledge ---\n';
        for (const item of practicalData) {
          ragContext += `- ${item.primary_topic || item.description || ''}\n`;
          if (item.bs7671_regulations?.length) {
            ragContext += `  Regulations: ${item.bs7671_regulations.join(', ')}\n`;
          }
        }
      }
    } else {
      console.warn('[analyze-diary-entry] Practical work search failed:', practicalResult.reason);
    }

    // ---------- Build entry summary ----------
    const entryParts = [`Date: ${entry.date}`, `Site: ${entry.site_name}`];
    if (entry.supervisor) entryParts.push(`Supervisor: ${cut(entry.supervisor, 120)}`);
    if (tasks.length) entryParts.push(`Tasks: ${tasks.join(', ')}`);
    if (skills.length) entryParts.push(`Skills: ${skills.join(', ')}`);
    if (entry.unit_codes.length)
      entryParts.push(`Units the apprentice tagged: ${entry.unit_codes.join(', ')}`);
    if (entry.what_i_learned) entryParts.push(`What I Learned: ${entry.what_i_learned}`);
    if (entry.issues_or_questions)
      entryParts.push(`Issues/Questions: ${entry.issues_or_questions}`);
    const entrySummary = entryParts.join('\n');

    // ---------- Call OpenAI ----------
    const systemPrompt = `You are an experienced UK electrical training assessor analysing a single apprentice diary entry for portfolio evidence potential.

You have access to qualification assessment criteria from the RAG context below. Your job is to:
1. Assess the overall evidence strength (strong/moderate/weak) based on specificity, technical detail, and relevance
2. Explain why this entry is (or isn't) good evidence in 2-3 sentences
3. Match specific assessment criteria from the qualification requirements — include unitCode, acCode, acText, confidence (0-100), and a brief reason for each match. Only include matches with confidence > 40.
4. Suggest up to 3 practical tips to strengthen the evidence (e.g. "Add specific cable sizes used", "Reference BS 7671 regulation numbers")
5. Suggest a concise portfolio item title

Use UK English. Be encouraging but honest about evidence quality.
${ragContext}`;

    console.log(
      '[analyze-diary-entry] RAG done, ragContext length:',
      ragContext.length,
      '. Calling OpenAI...'
    );

    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${openAIApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-5.4-mini-2026-03-17',
        max_completion_tokens: 5000,
        messages: [
          { role: 'system', content: systemPrompt },
          {
            role: 'user',
            content: `Please analyse this diary entry as potential portfolio evidence:\n\n${entrySummary}`,
          },
        ],
        tools: [analysisTool],
        tool_choice: { type: 'function', function: { name: 'diary_entry_analysis' } },
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('[analyze-diary-entry] OpenAI error:', response.status, errorText);
      throw new Error(`OpenAI API error: ${response.status}`);
    }

    const data = await response.json();

    const message = data.choices?.[0]?.message;
    const finishReason = data.choices?.[0]?.finish_reason;
    console.log(
      '[analyze-diary-entry] OpenAI finish_reason:',
      finishReason,
      'has tool_calls:',
      !!message?.tool_calls?.length
    );

    // Extract tool call result
    let analysis: Record<string, unknown>;
    const toolCall = message?.tool_calls?.[0];

    if (toolCall?.function?.arguments) {
      analysis = JSON.parse(toolCall.function.arguments);
    } else if (finishReason === 'length') {
      // Cut off before it finished. Say so — this used to return a made-up
      // "moderate" strength and stock tips, shown as if they were an assessment.
      console.warn('[analyze-diary-entry] Response truncated (finish_reason=length).');
      throw new Error('The check ran out of room before it finished — try again.');
    } else {
      console.error(
        '[analyze-diary-entry] No tool call. Full response:',
        JSON.stringify(data.choices?.[0])
      );
      // A text reply isn't the structured check — don't present it as one.
      throw new Error('The check didn’t come back in the expected form — try again.');
    }

    // ---------- Validate before returning ----------
    if (!['strong', 'moderate', 'weak'].includes(String(analysis.evidenceStrength))) {
      throw new Error('The check didn’t come back in the expected form — try again.');
    }
    // Only criteria that really exist on the learner's own qualification. The
    // model can invent or misnumber an AC; an apprentice could then claim it.
    const rawMatches = Array.isArray(analysis.matchedCriteria)
      ? (analysis.matchedCriteria as Array<Record<string, unknown>>)
      : [];
    let validMatches: Array<Record<string, unknown>> = [];
    if (qualificationCode && rawMatches.length) {
      const unitCodes = Array.from(
        new Set(rawMatches.map((m) => String(m.unitCode ?? '').trim()).filter(Boolean))
      );
      const { data: reqs } = await supabase
        .from('qualification_requirements')
        .select('unit_code, ac_code')
        .eq('qualification_code', qualificationCode)
        .in('unit_code', unitCodes);
      const real = new Set(
        ((reqs ?? []) as Array<{ unit_code: string; ac_code: string }>).map(
          (r) => `${r.unit_code}|${String(r.ac_code).trim()}`
        )
      );
      validMatches = rawMatches
        .map((m) => ({
          ...m,
          unitCode: String(m.unitCode ?? '').trim(),
          acCode: String(m.acCode ?? '')
            .trim()
            .replace(/^AC\s*/i, '')
            .replace(/:$/, ''),
          confidence: Math.max(0, Math.min(100, Math.round(Number(m.confidence) || 0))),
        }))
        .filter((m) => real.has(`${m.unitCode}|${m.acCode}`));
    }
    analysis.matchedCriteria = validMatches;
    analysis.qualityTips = Array.isArray(analysis.qualityTips)
      ? (analysis.qualityTips as unknown[]).slice(0, 3)
      : [];

    console.log('[analyze-diary-entry] Successfully generated analysis');

    return new Response(
      JSON.stringify({
        success: true,
        analysis,
        generatedAt: new Date().toISOString(),
      }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );
  } catch (error) {
    await captureException(error, {
      functionName: 'analyze-diary-entry',
      requestUrl: req.url,
      requestMethod: req.method,
    });
    console.error('[analyze-diary-entry] Error:', error);
    // Return 200 with success: false so supabase-js doesn't swallow the error message
    return new Response(
      JSON.stringify({
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error',
      }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );
  }
});
