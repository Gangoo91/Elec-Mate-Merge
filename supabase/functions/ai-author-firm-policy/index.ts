// AI Author Firm Policy (ELE-1946) — drafts a UK electrical contractor's
// company policy from a topic, for the Employer Hub's Policies.
//
// The same approach as the College Hub's ai-author-policy (one structured tool
// call, the house model, a reviewable starting point that is never filed
// automatically), with the frameworks a contracting firm works under instead
// of FE ones. ai-author-policy itself cannot be reused by a firm: it requires
// college staff and writes in college terms.
//
// Auth: any signed-in user (the Employer Hub decides who sees the button).
// POST { topic: string, company_name?: string, team_size?: number }
// Returns { title, summary, category, content_html } — does NOT persist.

import { identifyCaller, deny } from '../_shared/caller.ts';
import { captureException } from '../_shared/sentry.ts';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
  'Access-Control-Allow-Headers':
    'authorization, x-client-info, apikey, content-type, x-supabase-timeout, x-request-id',
};

const CHAT_MODEL = 'gpt-5.4-mini-2026-03-17';
const MAX_COMPLETION_TOKENS = 6_000;
const CATEGORIES = ['Safety', 'HR', 'Legal', 'Operations'] as const;

const POLICY_TOOL = {
  type: 'function',
  function: {
    name: 'submit_policy_draft',
    description:
      'Submit a company policy draft for a UK electrical contracting firm. The firm reviews and edits it before publishing it to the team.',
    parameters: {
      type: 'object',
      additionalProperties: false,
      properties: {
        title: {
          type: 'string',
          description: 'Policy title, 3 to 10 words, e.g. "Working at Height Policy".',
        },
        summary: {
          type: 'string',
          description: 'One sentence on what the policy covers, under 25 words.',
        },
        category: { type: 'string', enum: CATEGORIES },
        content_html: {
          type: 'string',
          description:
            'The full policy as simple HTML using only <h2>, <h3>, <p>, <ul>, <ol>, <li> and <strong>. Sections in order: Purpose and scope, Responsibilities, Policy, Procedure (numbered), Training and competence, Monitoring and review, Related documents. UK English. 600 to 1,500 words.',
        },
      },
      required: ['title', 'summary', 'category', 'content_html'],
    },
  },
} as const;

function systemPrompt(): string {
  return `You are a health, safety and HR adviser to small UK electrical contracting firms. You draft company policies the firm's owner will review, edit and then ask the team to read and sign.

Use the UK frameworks that actually apply and cite them by name only where they fit:
- Health and Safety at Work etc. Act 1974; Management of Health and Safety at Work Regulations 1999
- Electricity at Work Regulations 1989; BS 7671 (IET Wiring Regulations); HSE GS38; HSG85 (electricity at work, safe working practices)
- Work at Height Regulations 2005; CDM Regulations 2015; COSHH 2002; RIDDOR 2013; PUWER 1998; LOLER 1998; Control of Asbestos Regulations 2012
- Employment Rights Act 1996; Equality Act 2010; Working Time Regulations 1998; UK GDPR and the Data Protection Act 2018

Rules:
- UK English. Plain words a site electrician understands. Short sentences.
- Write for this firm: an electrical contractor whose people work on customers' premises and construction sites.
- Never invent statutes, case law, dates or figures. Where the firm must add its own detail (named responsible person, phone numbers, frequencies), write a clear placeholder in square brackets, e.g. [Name of the person responsible for safety].
- Do not claim the policy makes the firm compliant or accredited.
- Use only <h2>, <h3>, <p>, <ul>, <ol>, <li> and <strong>. No inline styles, no links, no em dashes.

Output via submit_policy_draft exactly once.`;
}

const json = (body: unknown, status = 200) =>
  new Response(JSON.stringify(body), {
    status,
    headers: { ...corsHeaders, 'content-type': 'application/json' },
  });

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') return new Response('ok', { headers: corsHeaders });
  if (req.method !== 'POST') return json({ error: 'method_not_allowed' }, 405);

  const caller = await identifyCaller(req);
  if (!caller || caller.kind !== 'user') return deny(corsHeaders);

  const OPENAI_KEY = Deno.env.get('OPENAI_API_KEY');
  if (!OPENAI_KEY) return json({ error: 'server_misconfigured' }, 500);

  let body: { topic?: string; company_name?: string; team_size?: number };
  try {
    body = await req.json();
  } catch {
    return json({ error: 'invalid_json' }, 400);
  }
  const topic = (body.topic ?? '').trim().slice(0, 200);
  if (topic.length < 4) return json({ error: 'topic_too_short' }, 400);
  const company = (body.company_name ?? '').trim().slice(0, 120);
  const teamSize = Number.isFinite(body.team_size) ? Number(body.team_size) : null;

  const user = [
    '# The policy the firm wants',
    topic,
    '',
    '# The firm',
    company ? `Name: ${company}` : 'Name: [Company name]',
    teamSize ? `People on the team: about ${teamSize}` : '',
    'Trade: electrical contracting (installation, testing and maintenance)',
    '',
    'Draft the policy via submit_policy_draft.',
  ]
    .filter((l) => l !== '')
    .join('\n');

  try {
    const res = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: { authorization: `Bearer ${OPENAI_KEY}`, 'content-type': 'application/json' },
      body: JSON.stringify({
        model: CHAT_MODEL,
        messages: [
          { role: 'system', content: systemPrompt() },
          { role: 'user', content: user },
        ],
        tools: [POLICY_TOOL],
        tool_choice: { type: 'function', function: { name: 'submit_policy_draft' } },
        max_completion_tokens: MAX_COMPLETION_TOKENS,
      }),
    });
    if (!res.ok) {
      const text = await res.text();
      return json({ error: `openai_${res.status}`, detail: text.slice(0, 240) }, 502);
    }
    const data = (await res.json()) as {
      choices?: Array<{ message?: { tool_calls?: Array<{ function?: { arguments?: string } }> } }>;
    };
    const args = data.choices?.[0]?.message?.tool_calls?.[0]?.function?.arguments;
    if (!args) return json({ error: 'no_tool_call' }, 502);
    const p = JSON.parse(args) as {
      title?: string;
      summary?: string;
      category?: string;
      content_html?: string;
    };
    // Keep only the tags the prompt allows; anything else is stripped to text.
    const html = (p.content_html ?? '')
      .slice(0, 80_000)
      .replace(/<(?!\/?(h2|h3|p|ul|ol|li|strong)\b)[^>]*>/gi, '')
      .replace(/\s(style|class|on\w+)="[^"]*"/gi, '');
    return json({
      title: (p.title ?? topic).slice(0, 200).trim(),
      summary: (p.summary ?? '').slice(0, 400).trim(),
      category: (CATEGORIES as readonly string[]).includes(p.category ?? '')
        ? p.category
        : 'Safety',
      content_html: html,
    });
  } catch (e) {
    await captureException(e, {
      functionName: 'ai-author-firm-policy',
      requestUrl: req.url,
      requestMethod: req.method,
    });
    return json({ error: 'Something went wrong drafting that. Try again.' }, 500);
  }
});
