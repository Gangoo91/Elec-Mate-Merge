// ELE-2052 — words for the off-the-job quality check.
//
// The rules run in code on the phone (src/lib/otj/otjQualityCheck.ts). This
// function ONLY rewords each flag's fixed explanation so it speaks to the
// apprentice's own entry. It never decides whether something counts: it gets
// the flags already raised, the paragraph of the funding rules behind each one
// (verbatim below, from "Apprenticeship funding rules, August 2026 to July
// 2027", version 3, July 2026) and the entry, and returns one or two sentences
// per flag. If it fails, the app keeps the fixed wording.
//
// Model: gpt-5.4-mini-2026-03-17, max_completion_tokens, no temperature.

import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.57.4';
import { captureException } from '../_shared/sentry.ts';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
  'Access-Control-Allow-Headers':
    'authorization, x-client-info, x-request-id, x-supabase-timeout, x-supabase-api-version, apikey, content-type',
};
const CHAT_MODEL = 'gpt-5.4-mini-2026-03-17';
const json = (b: unknown, status = 200) =>
  new Response(JSON.stringify(b), {
    status,
    headers: { ...corsHeaders, 'content-type': 'application/json' },
  });

// Verbatim from the funding rules 2026/27 v3.
const P82_1 =
  '82.1. It is training which is received by the apprentice within their practical period, during the apprentice’s normal working hours, for the purpose of achieving the knowledge, skills and behaviours (KSBs) of the apprenticeship they are undertaking. By normal working hours we mean the hours for which the apprentice would normally be paid, excluding overtime.';
const P82_4 = '82.4. Funds are at risk of recovery if the off-the-job training policy is not met.';
const P84 =
  '84. The provider must ensure that the following activities are not included as off-the-job training:';
const RULES: Record<string, string> = {
  exam_testing: `${P84} 84.5. Examinations and other on-programme testing (e.g. linked to a qualification or the EPA). 83.5. [can include] Revision.`,
  english_maths: `${P84} 84.2. English and maths standalone qualifications (if required, these must be delivered in addition to the minimum off-the-job training requirement).`,
  onboarding: `${P84} 84.1. Initial assessment and onboarding activities.`,
  progress_review: `${P84} 84.4. Progress reviews.`,
  outside_hours: `${P84} 84.6. Training which takes place outside the apprentice’s normal working hours; 84.6.1. If off-the-job training must, by exception, take place outside these hours, the apprentice must agree and be compensated (e.g. time off in lieu or an additional payment). The majority of the training must not be delivered in this way.`,
  weekend: `${P82_1} 84.6. Training which takes place outside the apprentice’s normal working hours [must not be included]; 84.6.1. If off-the-job training must, by exception, take place outside these hours, the apprentice must agree and be compensated (e.g. time off in lieu or an additional payment).`,
  long_day: P82_1,
  day_total: P82_1,
  not_linked: `${P84} 84.3. Training to acquire knowledge, skills and behaviours that are not required by the apprenticeship standard. 88. All required and eligible off-the-job training activity (see paragraph 83) must be agreed in advance of delivery and the provider must document the activity as part of the agreed training plan.`,
  unknown_units: `${P84} 84.3. Training to acquire knowledge, skills and behaviours that are not required by the apprenticeship standard.`,
  duplicate: P82_4,
  not_in_plan:
    '88. All required and eligible off-the-job training activity (see paragraph 83) must be agreed in advance of delivery and the provider must document the activity as part of the agreed training plan.',
};

const SYSTEM = `You explain to a UK electrical apprentice, in plain British English, why their off-the-job training entry was flagged before it goes to their tutor.

For each flag you get: the fixed explanation (already correct), the paragraph of the funding rules behind it, and the apprentice's entry. Rewrite the fixed explanation in one or two short sentences that refer to what they actually wrote, and say what to change. Keep the meaning exactly. Do not add rules, numbers or conditions that are not in the paragraph or the fixed explanation. Do not say the entry definitely does or does not count: their tutor decides. Second person ("you"). No em dashes. At most 45 words per flag.`;

const SCHEMA = {
  type: 'object',
  additionalProperties: false,
  required: ['explanations'],
  properties: {
    explanations: {
      type: 'array',
      items: {
        type: 'object',
        additionalProperties: false,
        required: ['code', 'text'],
        properties: { code: { type: 'string' }, text: { type: 'string' } },
      },
    },
  },
};

Deno.serve(async (req: Request) => {
  if (req.method === 'OPTIONS') return new Response('ok', { headers: corsHeaders });
  if (req.method !== 'POST') return json({ error: 'method_not_allowed' }, 405);
  try {
    const apiKey = Deno.env.get('OPENAI_API_KEY');
    if (!apiKey) throw new Error('OPENAI_API_KEY missing');
    const authHeader = req.headers.get('authorization');
    if (!authHeader) return json({ error: 'unauthorized' }, 401);
    const db = createClient(Deno.env.get('SUPABASE_URL')!, Deno.env.get('SUPABASE_ANON_KEY')!, {
      global: { headers: { Authorization: authHeader } },
      auth: { persistSession: false },
    });
    const { data: u } = await db.auth.getUser();
    if (!u?.user) return json({ error: 'unauthorized' }, 401);

    const body = (await req.json().catch(() => ({}))) as {
      flags?: Array<{ code?: string; explanation?: string }>;
      entry?: Record<string, unknown>;
    };
    const flags = (body.flags ?? [])
      .filter((f) => typeof f.code === 'string' && RULES[f.code])
      .slice(0, 8)
      .map((f) => ({
        code: f.code as string,
        fixed: String(f.explanation ?? '').slice(0, 600),
        rule: RULES[f.code as string],
      }));
    if (!flags.length) return json({ explanations: [] });
    const e = body.entry ?? {};
    const entry = {
      date: String(e.activity_date ?? '').slice(0, 10),
      kind: String(e.activity_type ?? '').slice(0, 40),
      headline: String(e.title ?? '').slice(0, 200),
      what_you_learned: String(e.description ?? '').slice(0, 1500),
      minutes: Number(e.duration_minutes ?? 0) || 0,
      hours_answer: String(e.hours ?? '').slice(0, 20),
      unit_codes: Array.isArray(e.unit_codes)
        ? (e.unit_codes as unknown[]).slice(0, 12).map(String)
        : [],
    };

    const oa = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: { Authorization: `Bearer ${apiKey}`, 'content-type': 'application/json' },
      body: JSON.stringify({
        model: CHAT_MODEL,
        messages: [
          { role: 'system', content: SYSTEM },
          {
            role: 'user',
            content: `ENTRY:\n${JSON.stringify(entry, null, 1)}\n\nFLAGS:\n${JSON.stringify(flags, null, 1)}`,
          },
        ],
        max_completion_tokens: 1_200,
        tools: [
          {
            type: 'function',
            function: {
              name: 'submit_explanations',
              description: 'One plain explanation per flag code.',
              strict: true,
              parameters: SCHEMA,
            },
          },
        ],
        tool_choice: { type: 'function', function: { name: 'submit_explanations' } },
      }),
    });
    if (!oa.ok) throw new Error(`OpenAI ${oa.status}: ${(await oa.text()).slice(0, 200)}`);
    const out = await oa.json();
    const args = out?.choices?.[0]?.message?.tool_calls?.[0]?.function?.arguments;
    const parsed = JSON.parse(args ?? '{}') as {
      explanations?: Array<{ code: string; text: string }>;
    };
    const allowed = new Set(flags.map((f) => f.code));
    const explanations = (parsed.explanations ?? [])
      .filter((x) => x && allowed.has(x.code) && typeof x.text === 'string' && x.text.trim())
      .map((x) => ({
        code: x.code,
        text: x.text
          .trim()
          .replace(/\s*[—–]\s*/g, ', ')
          .slice(0, 400),
      }));
    return json({ source: 'ai_worded', model: CHAT_MODEL, explanations });
  } catch (err) {
    await captureException(err, {
      functionName: 'otj-quality-explain',
      requestUrl: req.url,
      requestMethod: req.method,
    });
    return json({ error: (err as Error).message ?? 'Could not word the check' }, 500);
  }
});
