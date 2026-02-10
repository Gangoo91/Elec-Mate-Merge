/**
 * epa-knowledge-quiz — EPA Mock Knowledge Test Generator
 *
 * Generates MCQ questions conforming to the existing QuizQuestion type,
 * directly compatible with useQuizSession.
 *
 * Dynamically driven by the qualification's Learning Outcomes and Assessment
 * Criteria from the RAG database — works for all 9 courses.
 *
 * Model: gpt-5-mini-2025-08-07 via tool calling for structured JSON output.
 */

import { serve, createClient, corsHeaders } from '../_shared/deps.ts';

const quizTool = {
  type: 'function' as const,
  function: {
    name: 'epa_knowledge_quiz',
    description: 'Generate EPA-style knowledge test MCQ questions',
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
              acRef: { type: 'string', description: 'Related AC reference' },
            },
            required: ['question', 'options', 'correctAnswer', 'explanation', 'category', 'difficulty'],
          },
        },
      },
      required: ['questions'],
    },
  },
};

/**
 * Build a rich qualification structure string from get_qualification_acs data,
 * grouped by unit → LO → ACs.
 */
function buildQualificationStructure(acData: any[], qualificationCode: string): string {
  if (!acData?.length) return '';

  const units = new Map<string, { title: string; los: Map<string, { text: string; acs: { code: string; text: string }[] }> }>();

  for (const row of acData) {
    const unitCode = row.unit_code || '';
    const unitTitle = row.unit_title || '';
    const loNumber = row.lo_number || '';
    const loText = row.lo_text || '';
    const acCode = row.ac_code || '';
    const acText = row.ac_text || '';

    if (!units.has(unitCode)) {
      units.set(unitCode, { title: unitTitle, los: new Map() });
    }
    const unit = units.get(unitCode)!;

    const loKey = String(loNumber);
    if (!unit.los.has(loKey)) {
      unit.los.set(loKey, { text: loText, acs: [] });
    }
    unit.los.get(loKey)!.acs.push({ code: acCode, text: acText });
  }

  let structure = `--- Qualification: ${qualificationCode} ---\n`;
  for (const [unitCode, unit] of units) {
    structure += `\nUnit ${unitCode}: ${unit.title}\n`;
    for (const [loNum, lo] of unit.los) {
      structure += `  LO${loNum}: ${lo.text}\n`;
      for (const ac of lo.acs) {
        structure += `    AC ${ac.code}: ${ac.text}\n`;
      }
    }
  }

  return structure;
}

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

    const { data: { user }, error: authError } = await supabase.auth.getUser();
    if (authError || !user) {
      return new Response(JSON.stringify({ error: 'Unauthorised' }), {
        status: 401,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    const body = await req.json();
    const {
      qualification_code,
      target_unit_codes,
      difficulty = 'mixed',
      question_count = 20,
    } = body;

    if (!qualification_code) {
      return new Response(
        JSON.stringify({ success: false, error: 'qualification_code required' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // RAG: fetch full LO/AC structure
    let qualificationStructure = '';
    try {
      const { data: acData } = await supabase.rpc('get_qualification_acs', {
        p_qualification_code: qualification_code,
      });
      if (acData?.length) {
        const filtered = target_unit_codes?.length
          ? acData.filter((ac: any) => target_unit_codes.includes(ac.unit_code))
          : acData;
        qualificationStructure = buildQualificationStructure(filtered, qualification_code);
      }
    } catch { /* non-critical */ }

    // RAG: regulation context
    let regContext = '';
    try {
      const { data: regData } = await supabase.rpc('search_practical_work_fast', {
        query_text: 'regulation testing inspection wiring safety standards', match_count: 5,
      });
      if (regData?.length) {
        regContext = '\n\n--- Regulation Context ---\n' +
          regData.map((r: any) => `- ${r.title}: ${r.description?.substring(0, 200)}`).join('\n');
      }
    } catch { /* non-critical */ }

    const systemPrompt = `You are creating a knowledge test for a UK electrical apprentice studying the qualification shown below. Generate exactly ${question_count} multiple-choice questions that test the Learning Outcomes and Assessment Criteria from this qualification.

## Qualification Structure
${qualificationStructure || 'No qualification data available — generate general electrical knowledge questions.'}

## Question Distribution
- Spread questions proportionally across the units listed above
- Each question should map to a specific AC reference
- ${difficulty === 'mixed' ? 'Mix difficulties: 30% easy (recall), 40% medium (application), 30% hard (analysis/evaluation)' : `All ${difficulty} difficulty`}

## Knowledge Test Format
- Pass mark: 70%
- Duration: 80 minutes (real exam)
- Tests underpinning knowledge across the qualification

## Bloom's Taxonomy Levels
- 40% Lower-order (recall/comprehension): direct knowledge recall questions
- 60% Higher-order (application/analysis): scenario-based questions requiring application of knowledge

## Question Quality Rules
1. Each question has exactly 4 plausible options. NEVER use "All of the above" or "None of the above".
2. Distractors must be plausible — real values, real regulations, real methods that are close but wrong.
3. At least 30% of questions must be scenario-based: present a real-world situation and ask the apprentice to apply knowledge.
4. Explanations MUST cite specific regulations, table numbers, or clause references where applicable.
5. Include at least 2-3 synoptic questions that combine knowledge from multiple topic areas.
6. Use higher-order question stems for hard questions:
   - "A fault is discovered during inspection where..."
   - "Which of the following would be non-compliant in this scenario?"
   - "An apprentice measures a value of X between..."
   - "During initial verification, the measured value of..."
7. Include the related AC reference where applicable.
8. Use UK English and UK electrical standards throughout.
9. For calculation questions, include realistic values — use actual standard table values where possible.
10. Categories should reflect the unit structure of the qualification.
${regContext}`;

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
          { role: 'user', content: `Generate ${question_count} knowledge test questions for qualification ${qualification_code}.` },
        ],
        tools: [quizTool],
        tool_choice: { type: 'function', function: { name: 'epa_knowledge_quiz' } },
      }),
    });

    if (!response.ok) throw new Error(`OpenAI error: ${response.status}`);

    const data = await response.json();
    const toolCall = data.choices?.[0]?.message?.tool_calls?.[0];

    if (!toolCall?.function?.arguments) {
      throw new Error('No structured response from AI');
    }

    const result = JSON.parse(toolCall.function.arguments);

    return new Response(
      JSON.stringify({ success: true, ...result }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  } catch (err) {
    console.error('[epa-knowledge-quiz] Error:', err);
    return new Response(
      JSON.stringify({ success: false, error: err instanceof Error ? err.message : 'Internal error' }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});
