/**
 * diary-coach — AI Diary Coach Edge Function
 *
 * Analyses an apprentice's recent diary entries and returns personalised
 * coaching insight using RAG-backed knowledge (practical work intelligence,
 * regulations, KSB progress).
 *
 * Model: gpt-5-mini-2025-08-07 via tool calling for structured JSON output.
 */

import { serve } from '../_shared/deps.ts';
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers':
    'authorization, x-client-info, apikey, content-type, x-supabase-timeout, x-request-id',
};

// ---------- Tool schema for structured output ----------
const coachTool = {
  type: 'function' as const,
  function: {
    name: 'diary_coach_insight',
    description:
      'Structured coaching insight for an apprentice electrician based on their recent diary entries',
    parameters: {
      type: 'object',
      properties: {
        weekSummary: {
          type: 'string',
          description: "2-3 sentence summary of the apprentice's week",
        },
        skillGaps: {
          type: 'array',
          items: { type: 'string' },
          description: 'Skills from the 8 categories not practised recently',
        },
        moodInsight: {
          type: 'string',
          description: 'Observation about mood patterns and wellbeing',
        },
        recommendation: {
          type: 'string',
          description: 'One actionable suggestion for the coming days',
        },
        encouragement: {
          type: 'string',
          description: 'Personalised positive reinforcement based on their progress',
        },
        regulationTip: {
          type: 'string',
          description: 'One relevant BS 7671 regulation or safety tip related to their recent work',
        },
        ksbSuggestion: {
          type: 'string',
          description:
            'Suggestion for which KSB (Knowledge, Skill or Behaviour) they could evidence from their recent work',
        },
        qualificationProgress: {
          type: 'string',
          description:
            'Progress update referencing specific qualification assessment criteria covered this week, e.g. "You\'ve covered 3/8 Unit 301 assessment criteria this week"',
        },
        suggestedEvidence: {
          type: 'string',
          description:
            'Specific suggestion for which assessment criterion the apprentice could evidence from their recent work and add to their portfolio, e.g. "Your containment work could evidence AC 301.2.3 — add it to your portfolio"',
        },
        portfolioNudges: {
          type: 'array',
          items: {
            type: 'object',
            properties: {
              entryId: { type: 'string' },
              entryDate: { type: 'string' },
              nudge: { type: 'string' },
              suggestedUnit: { type: 'string' },
              confidence: { type: 'number' },
            },
            required: ['entryId', 'entryDate', 'nudge', 'suggestedUnit', 'confidence'],
          },
          description: 'Up to 3 diary entries that would make the strongest portfolio evidence',
        },
      },
      required: ['weekSummary', 'skillGaps', 'moodInsight', 'recommendation', 'encouragement'],
    },
  },
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

serve(async (req: Request) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    console.log('[diary-coach] Starting diary coach analysis...');

    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    const openAIApiKey = Deno.env.get('OPENAI_API_KEY')!;

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

    const body = await req.json();
    const entries: any[] = body.entries || [];
    const qualificationCode: string | null = body.qualificationCode || null;

    if (entries.length < 3) {
      return new Response(
        JSON.stringify({
          error: 'Need at least 3 diary entries for coaching insight',
        }),
        {
          status: 400,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        }
      );
    }

    // ---------- Gather RAG context (parallelised) ----------
    let ragContext = '';

    const recentTasks = entries.flatMap((e: any) => e.tasks_completed || []).slice(0, 10);
    const recentSkills = Array.from(new Set(entries.flatMap((e: any) => e.skills_practised || [])));

    // Build keyword arrays upfront (Fix 1: join with space, not comma)
    const taskQueryText = recentTasks.join(' ');
    const taskQueryTextShort = recentTasks.slice(0, 3).join(' ');

    // Fix 9: Filter stop words from qualification keywords
    const qualKeywords = [...recentTasks, ...recentSkills]
      .join(' ')
      .toLowerCase()
      .split(/\s+/)
      .filter((w) => w.length >= 3 && !STOP_WORDS.has(w));
    const uniqueQualKeywords = Array.from(new Set(qualKeywords)).slice(0, 15);

    // Fix 6: Fire all 4 RAG queries in parallel
    const [practicalResult, ksbResult, regsResult, qualResult] = await Promise.allSettled([
      // 1. Practical work intelligence
      recentTasks.length > 0
        ? supabase.rpc('search_practical_work_fast', {
            query_text: taskQueryText,
            match_count: 5,
          })
        : Promise.resolve({ data: null }),

      // 2. KSB progress
      supabase.from('user_ksb_progress').select('ksb_code, status').eq('user_id', user.id),

      // 3. Regulations search
      recentTasks.length > 0
        ? supabase.rpc('search_regulations_intelligence_hybrid', {
            query_text: taskQueryTextShort,
            match_count: 3,
          })
        : Promise.resolve({ data: null }),

      // 4. Qualification requirements
      qualificationCode && recentTasks.length > 0
        ? supabase.rpc('search_qualification_requirements', {
            p_keywords: uniqueQualKeywords,
            p_qualification_code: qualificationCode,
            p_limit: 5,
          })
        : Promise.resolve({ data: null }),
    ]);

    // Process practical work results
    if (practicalResult.status === 'fulfilled') {
      const practicalData = practicalResult.value.data;
      if (practicalData && practicalData.length > 0) {
        ragContext += '\n\n--- Relevant Practical Knowledge ---\n';
        for (const item of practicalData.slice(0, 3)) {
          ragContext += `- ${item.primary_topic || item.description || ''}\n`;
          if (item.bs7671_regulations?.length) {
            ragContext += `  Regulations: ${item.bs7671_regulations.join(', ')}\n`;
          }
        }
      }
    } else {
      console.warn('[diary-coach] Practical work RAG search failed:', practicalResult.reason);
    }

    // Process KSB results
    if (ksbResult.status === 'fulfilled') {
      const ksbData = ksbResult.value.data;
      if (ksbData && ksbData.length > 0) {
        const completed = ksbData.filter((k: any) => k.status === 'completed').length;
        const total = ksbData.length;
        const notStarted = ksbData
          .filter((k: any) => k.status === 'not_started')
          .map((k: any) => k.ksb_code)
          .slice(0, 5);

        ragContext += `\n\n--- KSB Progress ---\n`;
        ragContext += `Completed: ${completed}/${total}\n`;
        if (notStarted.length > 0) {
          ragContext += `Not started: ${notStarted.join(', ')}\n`;
        }
      }
    } else {
      console.warn('[diary-coach] KSB lookup failed:', ksbResult.reason);
    }

    // Process regulations results
    if (regsResult.status === 'fulfilled') {
      const regsData = regsResult.value.data;
      if (regsData && regsData.length > 0) {
        ragContext += '\n\n--- Relevant BS 7671 Regulations ---\n';
        for (const reg of regsData.slice(0, 2)) {
          ragContext += `- Reg ${reg.regulation_number || ''}: ${(reg.content || reg.primary_topic || '').substring(0, 200)}\n`;
        }
      }
    } else {
      console.warn('[diary-coach] Regulations search failed:', regsResult.reason);
    }

    // Process qualification results
    if (qualResult.status === 'fulfilled') {
      const qualData = qualResult.value.data;
      if (qualData && qualData.length > 0) {
        ragContext += `\n\n--- Qualification Requirements (${qualificationCode}) ---\n`;
        for (const req of qualData.slice(0, 4)) {
          ragContext += `- Unit ${req.unit_code}: ${req.learning_outcome}\n`;
          if (req.assessment_criteria?.length) {
            ragContext += `  ACs: ${req.assessment_criteria.slice(0, 3).join('; ')}\n`;
          }
        }
      }
    } else {
      console.warn('[diary-coach] Qualification requirements search failed:', qualResult.reason);
    }

    // ---------- Build diary summary for AI ----------
    const allSkillCategories = [
      'Practical Skills',
      'Health & Safety',
      'Testing & Inspection',
      'Wiring & Containment',
      'Regulations',
      'Tools & Equipment',
      'Communication',
      'Problem Solving',
    ];
    const missingSkills = allSkillCategories.filter((s) => !recentSkills.includes(s));

    const entrySummary = entries
      .slice(0, 7)
      .map((e: any) => {
        const parts = [`ID: ${e.id}`, `Date: ${e.date}`, `Site: ${e.site_name}`];
        if (e.tasks_completed?.length) parts.push(`Tasks: ${e.tasks_completed.join(', ')}`);
        if (e.skills_practised?.length) parts.push(`Skills: ${e.skills_practised.join(', ')}`);
        if (e.what_i_learned) parts.push(`Learned: ${e.what_i_learned}`);
        if (e.issues_or_questions) parts.push(`Issues: ${e.issues_or_questions}`);
        if (e.mood_rating) parts.push(`Mood: ${e.mood_rating}/5`);
        return parts.join(' | ');
      })
      .join('\n');

    // ---------- Call OpenAI ----------
    // Detect mood and repetition patterns for prompt guidance
    const moodRatings = entries.map((e: any) => e.mood_rating).filter(Boolean);
    const lowMoodCount = moodRatings.filter((m: number) => m <= 2).length;
    const taskCounts = new Map<string, number>();
    for (const task of recentTasks) {
      const key = task.toLowerCase();
      taskCounts.set(key, (taskCounts.get(key) || 0) + 1);
    }
    const repeatedTasks = Array.from(taskCounts.entries())
      .filter(([, c]) => c >= 3)
      .map(([t]) => t);
    const hasLearningNotes = entries.some((e: any) => e.what_i_learned?.trim());

    let moodGuidance = '';
    if (lowMoodCount >= 2) {
      moodGuidance = `\n\nIMPORTANT — WELLBEING: This apprentice has recorded low mood (≤ 2/5) in ${lowMoodCount} recent entries. Acknowledge this sensitively in your moodInsight. Encourage them to speak with their supervisor, training provider, or a trusted colleague. Never diagnose or minimise — just show you care and signpost support.`;
    }

    let repetitionGuidance = '';
    if (repeatedTasks.length > 0) {
      repetitionGuidance = `\n\nNote: The following tasks appear 3+ times across recent entries: ${repeatedTasks.join(', ')}. In your recommendation, suggest ways to extract deeper learning from repetitive work (e.g. noting specific measurements, referencing regulations, or asking for varied tasks).`;
    }

    let detailGuidance = '';
    if (!hasLearningNotes) {
      detailGuidance = `\n\nNote: None of the recent entries include a "what I learned" reflection. In your recommendation, gently coach on what makes a strong diary entry — specific tasks with measurements, regulation references, and reflections on what went well or could improve.`;
    }

    const systemPrompt = `You are an encouraging, experienced electrical training coach reviewing an apprentice electrician's diary entries. You have 30 years of experience in the UK electrical industry and know BS 7671:2018+A3:2024 inside-out.

Your job is to:
1. Summarise their recent work activity
2. Identify skills they haven't practised recently from these 8 categories: ${allSkillCategories.join(', ')}
3. Comment on their mood/wellbeing trends
4. Give one specific, actionable recommendation
5. Provide genuine, personalised encouragement
6. Share a relevant BS 7671 regulation or safety tip based on their work
7. Suggest which KSB they could evidence from their recent activities
8. If qualification requirements context is provided, note which assessment criteria their recent work covers and suggest specific evidence they could add to their portfolio
9. From the diary entries provided (each has an ID), identify up to 3 that would make the strongest portfolio evidence. Return them in portfolioNudges with the entry ID, date, a short nudge message (e.g. "Strong evidence for Unit 304"), the most relevant unit code, and confidence (0-100). Only include entries where confidence > 60.

Safety: If the apprentice mentions working on live circuits, asbestos, working at height without supervision, or any other significant safety concern in their issues/questions, flag this clearly in your recommendation and encourage them to raise it with their supervisor immediately.

Be warm, supportive, and specific. Reference their actual tasks and sites. Use UK English. Keep each field concise (1-3 sentences max).${moodGuidance}${repetitionGuidance}${detailGuidance}
${ragContext}`;

    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${openAIApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-5-mini-2025-08-07',
        max_completion_tokens: 1000,
        messages: [
          { role: 'system', content: systemPrompt },
          {
            role: 'user',
            content: `Here are my last ${entries.length} diary entries:\n\n${entrySummary}\n\nSkills I haven't practised recently: ${missingSkills.join(', ') || 'None — great coverage!'}\n\nPlease give me your coaching insight.`,
          },
        ],
        tools: [coachTool],
        tool_choice: { type: 'function', function: { name: 'diary_coach_insight' } },
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('[diary-coach] OpenAI error:', response.status, errorText);
      throw new Error(`OpenAI API error: ${response.status}`);
    }

    const data = await response.json();

    // Extract tool call result
    const toolCall = data.choices?.[0]?.message?.tool_calls?.[0];
    if (!toolCall?.function?.arguments) {
      throw new Error('No tool call in OpenAI response');
    }

    const insight = JSON.parse(toolCall.function.arguments);

    console.log('[diary-coach] Successfully generated coaching insight');

    return new Response(
      JSON.stringify({
        success: true,
        insight,
        generatedAt: new Date().toISOString(),
      }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );
  } catch (error) {
    console.error('[diary-coach] Error:', error);
    return new Response(
      JSON.stringify({
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error',
      }),
      {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );
  }
});
