/**
 * ojt-parse-voice — Extract structured OJT fields from a voice transcript.
 *
 * Apprentice speaks: "Did about an hour and a half of safe-isolation
 * training on site this morning with Dave, covered unit 311."
 *
 * Returns: { title, description, activity_type, duration_minutes, unit_codes }
 *
 * Single OpenAI call via gpt-5.4-mini-2026-03-17. Fast, structured tool
 * call output — no streaming needed for one-shot extraction (~1.5s).
 */

import { serve, corsHeaders } from '../_shared/deps.ts';

const MODEL = 'gpt-5.4-mini-2026-03-17';

const ACTIVITY_TYPES = [
  'workshop',
  'college',
  'online',
  'practical',
  'study',
  'site-visit',
  'mentoring',
  'safety',
];

const tool = {
  type: 'function' as const,
  function: {
    name: 'extract_ojt',
    description: 'Structure a voice transcript into an OJT entry',
    parameters: {
      type: 'object',
      properties: {
        title: {
          type: 'string',
          description: 'A concise title (≤ 60 chars) summarising the activity.',
        },
        description: {
          type: 'string',
          description: 'A 1-3 sentence first-person description of what was done. UK English.',
        },
        activity_type: {
          type: 'string',
          enum: ACTIVITY_TYPES,
          description: 'Closest matching activity type from the list.',
        },
        duration_minutes: {
          type: 'number',
          description: 'Best-guess duration in minutes. Round to the nearest 15.',
        },
        unit_codes: {
          type: 'array',
          items: { type: 'string' },
          description:
            'Any unit codes mentioned (e.g. "311", "ELTP02"). Empty array if none.',
        },
      },
      required: ['title', 'description', 'activity_type', 'duration_minutes', 'unit_codes'],
    },
  },
};

serve(async (req: Request) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const openAiKey = Deno.env.get('OPENAI_API_KEY');
    if (!openAiKey) {
      return new Response(
        JSON.stringify({ success: false, error: 'OpenAI API key not configured' }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 500 }
      );
    }

    const { transcript, default_date } = (await req.json()) as {
      transcript?: string;
      default_date?: string;
    };

    if (!transcript || transcript.trim().length < 5) {
      return new Response(
        JSON.stringify({ success: false, error: 'Transcript too short' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const systemPrompt = `You are structuring an apprentice electrician's voice note into a UK off-the-job training (OJT) entry for ESFA-defensible records.

## Output rules
- Title: concise, action-led, UK English (e.g. "Safe isolation refresher with supervisor", not "Today I did some training").
- Description: 1-3 sentences in first person. Mention the topic, where, with whom if stated, and any specific outcomes or measurements.
- Activity type: pick the closest from: workshop · college · online · practical · study · site-visit · mentoring · safety.
- Duration: convert any spoken time ("about an hour and a half") to minutes, rounded to the nearest 15.
- Unit codes: extract anything that looks like a UK NVQ unit code (e.g. 311, 312, ELTP01).

Date context (today): ${default_date || new Date().toISOString().slice(0, 10)}.`;

    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${openAiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: MODEL,
        max_completion_tokens: 600,
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: `Transcript:\n\n"${transcript}"\n\nStructure it.` },
        ],
        tools: [tool],
        tool_choice: { type: 'function', function: { name: 'extract_ojt' } },
      }),
    });

    if (!response.ok) {
      const body = await response.text().catch(() => '');
      throw new Error(`OpenAI ${response.status}: ${body.slice(0, 200)}`);
    }

    const data = await response.json();
    const toolCall = data.choices?.[0]?.message?.tool_calls?.[0];
    if (!toolCall?.function?.arguments) throw new Error('No structured response');

    const parsed = JSON.parse(toolCall.function.arguments);

    return new Response(JSON.stringify({ success: true, ...parsed }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  } catch (err) {
    console.error('[ojt-parse-voice] error:', err);
    return new Response(
      JSON.stringify({
        success: false,
        error: err instanceof Error ? err.message : 'Internal error',
      }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});
