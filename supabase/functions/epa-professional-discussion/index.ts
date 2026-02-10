/**
 * epa-professional-discussion — Mock EPA Professional Discussion
 *
 * Two-phase design:
 * - action: 'generate' → Generate 6-8 EPA-style questions from portfolio
 * - action: 'score' → Score apprentice response to a question
 *
 * Dynamically driven by the qualification's Learning Outcomes and Assessment
 * Criteria from the RAG database — works for all 9 courses.
 *
 * Model: gpt-5-mini-2025-08-07 via tool calling for structured JSON output.
 */

import { serve, createClient, corsHeaders } from '../_shared/deps.ts';

// ---------- Tool schemas ----------
const generateTool = {
  type: 'function' as const,
  function: {
    name: 'epa_discussion_questions',
    description: 'Generate EPA professional discussion questions based on portfolio evidence',
    parameters: {
      type: 'object',
      properties: {
        questions: {
          type: 'array',
          items: {
            type: 'object',
            properties: {
              id: { type: 'string' },
              question: { type: 'string' },
              targetLO: { type: 'string', description: 'Unit + LO reference, e.g. Unit 201 LO1' },
              targetAC: { type: 'string' },
              portfolioContext: { type: 'string', description: 'Which portfolio evidence this relates to' },
              questionType: { type: 'string', enum: ['technical', 'reflective', 'behavioural', 'synoptic'] },
              gradeDescriptors: {
                type: 'object',
                properties: {
                  pass: { type: 'string' },
                  distinction: { type: 'string' },
                },
                required: ['pass', 'distinction'],
              },
            },
            required: ['id', 'question', 'targetLO', 'portfolioContext', 'questionType', 'gradeDescriptors'],
          },
        },
      },
      required: ['questions'],
    },
  },
};

const scoreTool = {
  type: 'function' as const,
  function: {
    name: 'epa_response_score',
    description: 'Score an apprentice response to an EPA professional discussion question',
    parameters: {
      type: 'object',
      properties: {
        score: { type: 'number', description: '0-100 overall score' },
        grade: { type: 'string', enum: ['fail', 'pass', 'distinction'] },
        feedback: { type: 'string', description: '2-3 sentence constructive feedback' },
        strengthsShown: { type: 'array', items: { type: 'string' } },
        areasToImprove: { type: 'array', items: { type: 'string' } },
        acsCovered: { type: 'array', items: { type: 'string' }, description: 'AC codes evidenced in the response' },
        subscores: {
          type: 'object',
          properties: {
            technicalKnowledge: { type: 'number', description: '0-100' },
            practicalApplication: { type: 'number', description: '0-100' },
            communication: { type: 'number', description: '0-100' },
            reflection: { type: 'number', description: '0-100' },
            problemSolving: { type: 'number', description: '0-100' },
          },
          required: ['technicalKnowledge', 'practicalApplication', 'communication', 'reflection', 'problemSolving'],
        },
      },
      required: ['score', 'grade', 'feedback', 'strengthsShown', 'areasToImprove', 'acsCovered', 'subscores'],
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

    const { data: { user }, error: authError } = await supabase.auth.getUser();
    if (authError || !user) {
      return new Response(JSON.stringify({ error: 'Unauthorised' }), {
        status: 401,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    const body = await req.json();
    const { action } = body;

    if (action === 'generate') {
      return await handleGenerate(body, supabase, openAIApiKey);
    } else if (action === 'score') {
      return await handleScore(body, supabase, openAIApiKey);
    } else {
      return new Response(
        JSON.stringify({ success: false, error: 'Invalid action. Use "generate" or "score".' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }
  } catch (err) {
    console.error('[epa-professional-discussion] Error:', err);
    return new Response(
      JSON.stringify({ success: false, error: err instanceof Error ? err.message : 'Internal error' }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});

/**
 * Build a rich qualification structure string from get_qualification_acs data,
 * grouped by unit → LO → ACs.
 */
function buildQualificationStructure(acData: any[], qualificationCode: string): string {
  if (!acData?.length) return '';

  // Group by unit_code
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

async function handleGenerate(body: any, supabase: any, openAIApiKey: string) {
  const { portfolio_entries, qualification_code } = body;

  if (!portfolio_entries?.length || !qualification_code) {
    return new Response(
      JSON.stringify({ success: false, error: 'portfolio_entries and qualification_code required' }),
      { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }

  // RAG context — fetch full LO/AC structure
  let qualificationStructure = '';
  try {
    const { data: acData } = await supabase.rpc('get_qualification_acs', {
      p_qualification_code: qualification_code,
    });
    if (acData?.length) {
      qualificationStructure = buildQualificationStructure(acData, qualification_code);
    }
  } catch { /* non-critical */ }

  const portfolioSummary = portfolio_entries
    .slice(0, 15)
    .map((e: any) => `- "${e.title}": ${e.description?.substring(0, 150) || ''} [Skills: ${e.skills?.join(', ') || 'N/A'}] [ACs: ${e.assessment_criteria?.join(', ') || 'N/A'}]`)
    .join('\n');

  const systemPrompt = `You are a senior assessor conducting a professional discussion for the qualification shown below.
The discussion is underpinned by the apprentice's portfolio evidence and assessed against the qualification's Learning Outcomes (LOs) and Assessment Criteria (ACs).

## Qualification Structure
${qualificationStructure || 'No qualification data available — generate general professional discussion questions based on the portfolio evidence.'}

## Grade Bands (3-band model)
- Fail (0-39): Does not demonstrate competence. Responses are vague, inaccurate or missing.
- Pass (40-69): Demonstrates competence. Can describe what they did and why, shows understanding of relevant standards.
- Distinction (70-100): Exceptional depth. Evaluates, analyses and reflects on practice. References specific regulations confidently.

## Question Generation Rules
Generate 6-8 questions following these rules:
1. Each question MUST map to at least one specific Unit and LO from the qualification structure above.
2. Each question MUST reference a specific piece of the apprentice's portfolio evidence by title.
3. Questions should ascend in difficulty — start with descriptive, progress to evaluative.
4. At least 2 questions must be reflective: "What would you do differently?", "How has this changed your practice?"
5. Spread questions across different units — don't cluster on one unit.
6. The final question should be synoptic — combining LOs from multiple units.
7. Use professional discussion stems:
   - "Can you walk me through how you approached..."
   - "Reflecting on your [evidence title], explain the reasoning behind..."
   - "Looking at your evidence for [title], how did you ensure compliance with..."
   - "If you encountered [scenario] during that work, how would you have dealt with it?"
   - "What standards or regulations informed your approach to..."
   - "How has your understanding of [topic] developed through this work?"
   - "What would you do differently if you were to repeat this task?"
8. Grade descriptors for each question should describe what a Pass vs Distinction response looks like for that specific question.

Use UK English throughout. Be professional but approachable.

--- Apprentice Portfolio Evidence ---
${portfolioSummary}`;

  const response = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${openAIApiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      model: 'gpt-5-mini-2025-08-07',
      max_completion_tokens: 6000,
      messages: [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: 'Generate professional discussion questions for this apprentice based on their portfolio evidence.' },
      ],
      tools: [generateTool],
      tool_choice: { type: 'function', function: { name: 'epa_discussion_questions' } },
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
}

async function handleScore(body: any, supabase: any, openAIApiKey: string) {
  const { question, response: apprenticeResponse, qualification_code } = body;

  if (!question || !apprenticeResponse) {
    return new Response(
      JSON.stringify({ success: false, error: 'question and response required' }),
      { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }

  // RAG for technical validation
  let ragContext = '';
  try {
    const keywords = apprenticeResponse.toLowerCase().split(/\s+/)
      .filter((w: string) => w.length >= 4).slice(0, 10);
    if (keywords.length > 0) {
      const { data } = await supabase.rpc('search_practical_work_fast', {
        query_text: keywords.join(' '), match_count: 3,
      });
      if (data?.length) {
        ragContext = '\n\n--- Technical Reference ---\n' +
          data.map((d: any) => `- ${d.title}: ${d.description?.substring(0, 200)}`).join('\n');
      }
    }
  } catch { /* non-critical */ }

  const systemPrompt = `You are a senior assessor scoring an apprentice's response to a professional discussion question. Evaluate against the marking criteria and grade descriptors provided.

## Marking Criteria (3-band model)
- Fail (0-39): Response is vague, inaccurate, or shows limited understanding. Cannot describe what they did or why. No reference to standards or regulations. Lacks specific examples.
- Pass (40-69): Demonstrates competence. Can describe what they did and why. Shows understanding of relevant standards. Provides specific examples from their work. Identifies relevant health & safety considerations.
- Distinction (70-100): Exceptional depth and critical evaluation. Analyses and reflects on practice, not just describes. References specific regulations, table numbers, or clause numbers confidently. Considers improvements and wider implications. Demonstrates understanding of WHY regulations exist, not just WHAT they are. Shows initiative and independent thinking.

## 5 Subscores (each 0-100)
1. technicalKnowledge — accuracy of technical content, correct use of terminology, reference to regulations/standards
2. practicalApplication — ability to relate theory to real work situations, specific examples from their practice
3. communication — clarity, structure, professional language, logical flow of the response
4. reflection — depth of reflective practice, lessons learned, what they would change, impact on future work
5. problemSolving — evidence of analytical thinking, fault-finding methodology, dealing with unexpected situations

## Scoring Rules
- Short responses (<50 words): cap the overall score at 45 maximum. A professional discussion requires substantive answers.
- Vague responses with no specific examples: cap at 50 maximum regardless of other qualities.
- Penalise responses that only describe WHAT was done without explaining WHY.
- Reward specific references to regulations, table numbers, or clause references.
- Reward mention of real examples, specific sites, actual equipment used, or genuine scenarios.
- Safety awareness bonus: if the response proactively addresses safety considerations relevant to the question, add up to 5 points.
- The overall score should be a weighted average: technicalKnowledge (25%), practicalApplication (25%), communication (15%), reflection (20%), problemSolving (15%).

Use UK English. Be constructive, specific, and encouraging. Identify what was good and what could be improved.
${ragContext}`;

  const questionContext = typeof question === 'object'
    ? `Question: ${question.question}\nTarget LO: ${question.targetLO}\nQuestion type: ${question.questionType || 'technical'}\nPortfolio context: ${question.portfolioContext || ''}\nGrade descriptors:\n- Pass: ${question.gradeDescriptors?.pass}\n- Distinction: ${question.gradeDescriptors?.distinction}`
    : `Question: ${question}`;

  const response = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${openAIApiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      model: 'gpt-5-mini-2025-08-07',
      max_completion_tokens: 3000,
      messages: [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: `${questionContext}\n\nApprentice's response:\n${apprenticeResponse}` },
      ],
      tools: [scoreTool],
      tool_choice: { type: 'function', function: { name: 'epa_response_score' } },
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
}
