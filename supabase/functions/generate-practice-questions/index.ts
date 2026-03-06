/**
 * generate-practice-questions — UK Electrical Trade Practice Question Generator
 *
 * Generates MCQ questions on UK electrical topics using RAG context.
 * Model: gpt-5-mini-2025-08-07 via tool calling for structured JSON output.
 */

import { serve, createClient, corsHeaders } from '../_shared/deps.ts';

const practiceQuestionsTool = {
  type: 'function' as const,
  function: {
    name: 'practice_questions',
    description: 'Generate UK electrical trade practice questions',
    parameters: {
      type: 'object',
      properties: {
        questions: {
          type: 'array',
          items: {
            type: 'object',
            properties: {
              question: { type: 'string' },
              options: {
                type: 'array',
                items: { type: 'string' },
                description: 'Exactly 4 options',
              },
              correctAnswer: {
                type: 'number',
                description: '0-based index of the correct option',
              },
              explanation: { type: 'string' },
              category: { type: 'string' },
              difficulty: {
                type: 'string',
                enum: ['easy', 'medium', 'hard'],
              },
              regulation: {
                type: 'string',
                description: 'Related BS 7671 regulation number if applicable',
              },
            },
            required: [
              'question',
              'options',
              'correctAnswer',
              'explanation',
              'category',
              'difficulty',
            ],
          },
        },
      },
      required: ['questions'],
    },
  },
};

serve(async (req: Request) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    const openAIApiKey = Deno.env.get('OPENAI_API_KEY');

    if (!openAIApiKey) {
      return new Response(
        JSON.stringify({ success: false, error: 'OpenAI API key not configured' }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Auth
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
    const { topic, count = 10, difficulty = 'mixed' } = body;

    const questionCount = Math.max(1, Math.min(count, 50));

    // RAG: practical work context
    let practicalContext = '';
    try {
      const ragQuery = topic
        ? `${topic} electrical installation testing`
        : 'electrical installation testing inspection wiring safety';
      const { data: practicalData } = await supabase.rpc('search_practical_work_fast', {
        query_text: ragQuery,
        match_count: 5,
      });
      if (practicalData?.length) {
        practicalContext =
          '\n\n--- Practical Work Context ---\n' +
          practicalData
            .map((r: Record<string, string>) => `- ${r.title}: ${r.description?.substring(0, 200)}`)
            .join('\n');
      }
    } catch {
      /* non-critical */
    }

    // RAG: regulation context
    let regContext = '';
    try {
      const regQuery = topic
        ? `${topic} BS 7671 regulation`
        : 'BS 7671 regulation testing inspection wiring safety';
      const { data: regData } = await supabase.rpc('search_regulations_fast', {
        query_text: regQuery,
        match_count: 5,
      });
      if (regData?.length) {
        regContext =
          '\n\n--- Regulation Context ---\n' +
          regData
            .map(
              (r: Record<string, string>) =>
                `- ${r.regulation_number || r.title}: ${r.content?.substring(0, 200)}`
            )
            .join('\n');
      }
    } catch {
      /* non-critical */
    }

    const difficultyInstruction =
      difficulty === 'mixed'
        ? 'Mix difficulties: 30% easy (recall), 40% medium (application), 30% hard (analysis/evaluation)'
        : `All ${difficulty} difficulty`;

    const topicInstruction = topic
      ? `Focus on the topic: "${topic}". Generate questions specifically about this area of electrical work.`
      : 'Cover a broad range of UK electrical trade topics including wiring regulations, testing and inspection, installation practice, and safety.';

    const systemPrompt = `You are creating practice questions for UK electrical trade professionals and apprentices. Generate exactly ${questionCount} multiple-choice questions.

## Topic
${topicInstruction}

## Standards
- BS 7671:2018+A2:2022 (18th Edition Wiring Regulations)
- GN3 Guidance Note 3: Inspection & Testing
- GS38 Electrical Test Equipment
- All UK electrical standards and practices

## Question Distribution
- ${difficultyInstruction}
- Scenario-based questions preferred over pure recall
- At least 30% of questions should present a real-world situation

## Question Quality Rules
1. Each question has exactly 4 plausible options. NEVER use "All of the above" or "None of the above".
2. Distractors must be plausible — real values, real regulations, real methods that are close but wrong.
3. Explanations MUST cite specific regulations, table numbers, or clause references where applicable.
4. Use UK English and UK electrical standards throughout.
5. Include realistic values — actual cable sizes, actual Zs values, actual RCD trip times.
6. Categories should reflect electrical trade areas: Wiring Regulations, Testing & Inspection, Installation Practice, Safety, Earthing & Bonding, Circuit Design, etc.
${practicalContext}${regContext}`;

    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${openAIApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-5-mini-2025-08-07',
        max_completion_tokens: 8000,
        messages: [
          { role: 'system', content: systemPrompt },
          {
            role: 'user',
            content: `Generate ${questionCount} practice questions${topic ? ` about "${topic}"` : ''}.`,
          },
        ],
        tools: [practiceQuestionsTool],
        tool_choice: { type: 'function', function: { name: 'practice_questions' } },
      }),
    });

    if (!response.ok) throw new Error(`OpenAI error: ${response.status}`);

    const data = await response.json();
    const toolCall = data.choices?.[0]?.message?.tool_calls?.[0];

    if (!toolCall?.function?.arguments) {
      throw new Error('No structured response from AI');
    }

    const result = JSON.parse(toolCall.function.arguments);

    return new Response(JSON.stringify({ success: true, ...result }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  } catch (err) {
    console.error('[generate-practice-questions] Error:', err);
    return new Response(
      JSON.stringify({
        success: false,
        error: err instanceof Error ? err.message : 'Internal error',
      }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});
