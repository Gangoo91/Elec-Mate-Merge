/**
 * am2-simulator — AM2 Practical Assessment Practice Question Generator
 *
 * Generates AM2-style practice questions covering safe isolation, continuity,
 * insulation resistance, Zs, RCD testing, polarity, and fault diagnosis.
 * Model: gpt-5-mini-2025-08-07 via tool calling for structured JSON output.
 */

import { serve, createClient, corsHeaders } from '../_shared/deps.ts';

const am2Tool = {
  type: 'function' as const,
  function: {
    name: 'am2_simulator',
    description: 'Generate AM2 practical assessment practice questions',
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
                description: 'Related regulation or guidance note reference',
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
        metadata: {
          type: 'object',
          properties: {
            section: { type: 'string' },
            total_marks: { type: 'number' },
            pass_mark: { type: 'number' },
            disclaimer: { type: 'string' },
          },
          required: ['section', 'total_marks', 'pass_mark', 'disclaimer'],
        },
      },
      required: ['questions', 'metadata'],
    },
  },
};

const SECTION_QUERIES: Record<string, string> = {
  'wiring-regulations': 'BS 7671 wiring regulations compliance installation requirements',
  'inspection-testing': 'initial verification inspection testing continuity insulation resistance',
  'fault-diagnosis': 'fault finding diagnosis electrical circuits ring final',
  'safe-isolation': 'safe isolation procedure GS38 proving unit lock off',
  all: 'AM2 assessment safe isolation continuity insulation resistance Zs RCD testing polarity fault diagnosis',
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
    const { section = 'all', question_count = 15 } = body;

    const validSections = [
      'wiring-regulations',
      'inspection-testing',
      'fault-diagnosis',
      'safe-isolation',
      'all',
    ];
    const resolvedSection = validSections.includes(section) ? section : 'all';
    const questionCount = Math.max(1, Math.min(question_count, 50));
    const passMark = Math.ceil(questionCount * 0.7);

    // RAG: practical work context for AM2-specific content
    let practicalContext = '';
    try {
      const ragQuery = SECTION_QUERIES[resolvedSection] || SECTION_QUERIES['all'];
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

    const sectionFocus =
      resolvedSection === 'all'
        ? 'Cover ALL AM2 sections: safe isolation, wiring/installation, inspection & testing, and fault diagnosis.'
        : `Focus specifically on: ${resolvedSection.replace(/-/g, ' ')}.`;

    const systemPrompt = `You are creating AM2 practical assessment practice questions for UK electrical apprentices preparing for the AM2 exam. Generate exactly ${questionCount} questions.

## IMPORTANT DISCLAIMER
This is a PRACTICE session only — NOT a real AM2 assessment. Results do not count towards any qualification.

## AM2 Assessment Context
The AM2 (Achievement Measurement 2) is the practical assessment required for the JIB ECS Gold Card. It tests practical competence in electrical installation work.

## Section Focus
${sectionFocus}

## AM2 Assessment Areas

### Safe Isolation (GS38)
- Correct procedure: identify circuit → switch off → lock off → test voltage → prove dead → re-test
- GS38 compliant test equipment (fused test leads, finger guards, max 20mm probe tips)
- Proving unit usage — test BEFORE and AFTER isolation
- Lock-off devices and caution notices

### Continuity Testing
- R1+R2 method for radial circuits
- Ring final circuit continuity (3-step method: end-to-end, cross-connect, measure at each socket)
- Main protective bonding conductor continuity
- Expected values and pass/fail criteria

### Insulation Resistance
- Test voltage: 500V DC for circuits up to 500V
- Minimum acceptable value: 1MΩ (BS 7671 Table 61)
- Testing between L-E, N-E, L-N
- Disconnecting sensitive equipment before testing

### Earth Fault Loop Impedance (Zs)
- Zs values from BS 7671 tables (Table 41.2, 41.3, 41.4)
- Relationship: Zs = Ze + (R1+R2)
- Temperature correction for measured values
- Maximum Zs for common circuits and protective devices

### RCD Testing
- Trip times: 300ms at 1×IΔn, 40ms at 5×IΔn
- Test button function vs instrument test
- Type AC, A, B RCDs
- 30mA for additional protection

### Polarity
- Correct polarity at all points including switches, socket outlets, lampholders
- Single-pole switches in line conductor only
- Centre-pin contact of E27/B22 lampholders connected to line

### Fault Diagnosis
- Systematic fault-finding approach
- Common faults: open circuit, short circuit, earth fault, high resistance joint
- Using test results to identify fault type and location

## Question Quality Rules
1. Each question has exactly 4 plausible options. NEVER use "All of the above" or "None of the above".
2. Distractors must be plausible — real values, real procedures, real methods that are close but wrong.
3. Explanations MUST cite specific regulations, GN3 test sequences, or GS38 requirements.
4. Use UK English throughout.
5. Include realistic test values — actual Zs values from tables, actual IR readings, actual RCD trip times.
6. Categories should be: Safe Isolation, Continuity, Insulation Resistance, Earth Loop Impedance, RCD Testing, Polarity, Fault Diagnosis, Wiring Regulations.
7. Mix difficulty: 30% easy (recall), 40% medium (application), 30% hard (analysis/fault-finding).
${practicalContext}`;

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
            content: `Generate ${questionCount} AM2 practice questions${resolvedSection !== 'all' ? ` focused on ${resolvedSection.replace(/-/g, ' ')}` : ''}.`,
          },
        ],
        tools: [am2Tool],
        tool_choice: { type: 'function', function: { name: 'am2_simulator' } },
      }),
    });

    if (!response.ok) throw new Error(`OpenAI error: ${response.status}`);

    const data = await response.json();
    const toolCall = data.choices?.[0]?.message?.tool_calls?.[0];

    if (!toolCall?.function?.arguments) {
      throw new Error('No structured response from AI');
    }

    const result = JSON.parse(toolCall.function.arguments);

    // Ensure metadata has pass_mark
    if (result.metadata) {
      result.metadata.pass_mark = passMark;
      result.metadata.total_marks = questionCount;
      result.metadata.disclaimer =
        'This is a PRACTICE session only — NOT a real AM2 assessment. Results do not count towards any qualification.';
    } else {
      result.metadata = {
        section: resolvedSection,
        total_marks: questionCount,
        pass_mark: passMark,
        disclaimer:
          'This is a PRACTICE session only — NOT a real AM2 assessment. Results do not count towards any qualification.',
      };
    }

    return new Response(JSON.stringify({ success: true, ...result }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  } catch (err) {
    console.error('[am2-simulator] Error:', err);
    return new Response(
      JSON.stringify({
        success: false,
        error: err instanceof Error ? err.message : 'Internal error',
      }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});
