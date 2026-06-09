// AI Author Policy — drafts a UK FE college policy document in markdown
// from a topic + the requesting college's context. Returns a structured
// proposal the tutor reviews before filing as a v1 draft via the
// existing FilePolicyDraftSheet flow. The DSL/Verifier still has to
// publish.
//
// Auth: any college_staff in the target college.
//
// POST { topic: string, category?: string }
//
// Returns: { title, content_md, category, owner_role,
//           requires_acknowledgement, code, summary }
// — does NOT persist. The client opens FilePolicyDraftSheet with this
// as prefill, the tutor edits, then files.

import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.57.4';
import { loadCollegeContext, collegeContextLines } from '../_shared/college-context.ts';
import { captureException } from '../_shared/sentry.ts';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

const CHAT_MODEL = 'gpt-5.4-mini-2026-03-17';
const MAX_COMPLETION_TOKENS = 6_000;
const MIN_TOPIC_CHARS = 4;
const MAX_TOPIC_CHARS = 200;

type SbClient = ReturnType<typeof createClient>;

interface ReqBody {
  topic: string;
  /** Optional category hint — UI may already know e.g. "Safeguarding". */
  category?: string;
}

const CATEGORIES = [
  'safeguarding',
  'prevent',
  'edi',
  'whistleblowing',
  'complaints',
  'code_of_conduct',
  'acceptable_use',
  'disciplinary',
  'health_safety',
  'gdpr',
  'send',
  'assessment',
  'iqa',
  'appeals',
  'rarpa',
  'apprenticeship',
  'quality',
  'other',
] as const;

const OWNER_ROLES = [
  'DSL',
  'Prevent Lead',
  'H&S Lead',
  'Quality Nominee',
  'Mental Health Lead',
  'Principal',
  'HR',
  '',
] as const;

/* ───────────────── tool schema ────────────────── */

const POLICY_TOOL = {
  type: 'function',
  function: {
    name: 'submit_policy_draft',
    description:
      'Submit a structured UK FE college policy draft. The college DSL or Verifier will review and publish — this is a starter, not the final word.',
    parameters: {
      type: 'object',
      additionalProperties: false,
      properties: {
        title: {
          type: 'string',
          description:
            'Policy title (5-12 words). Use "[College Name] Safeguarding Policy" form. Specific, not generic.',
        },
        code: {
          type: 'string',
          description:
            'Optional short code like "SAF-01" / "GDPR-02". Empty string if none obviously fits.',
        },
        category: {
          type: 'string',
          enum: CATEGORIES,
          description: 'Pick the closest match from the enum.',
        },
        owner_role: {
          type: 'string',
          enum: OWNER_ROLES,
          description:
            'The role that owns this policy. Empty string if no specific owner. DSL for safeguarding/prevent. H&S Lead for health/safety. Quality Nominee for assessment/IQA/RARPA.',
        },
        requires_acknowledgement: {
          type: 'boolean',
          description:
            'true for policies every staff member must read and sign (safeguarding, prevent, code of conduct, acceptable use). false for operational policies (RARPA, appeals).',
        },
        summary: {
          type: 'string',
          description:
            'One-sentence summary of what the policy covers, suitable for a list view. Under 25 words.',
        },
        content_md: {
          type: 'string',
          description:
            "Full policy in GitHub-flavoured markdown. Required sections in this order: '## Purpose & Scope', '## Definitions' (only if there are domain-specific terms), '## Roles & Responsibilities', '## Policy Statement' (the substantive content), '## Procedure' (numbered steps), '## Records & Reporting', '## Review & Version Control', '## Related Documents'. Use UK English. Reference the relevant UK FE statutory framework where appropriate (Keeping Children Safe in Education for safeguarding; Counter-Terrorism and Security Act 2015 for Prevent; UK GDPR + Data Protection Act 2018 for data protection; Health and Safety at Work etc Act 1974 for H&S; Equality Act 2010 for EDI). Do NOT invent specific case law, government press releases, or statutes you're not certain exist. Prefer placeholders like '[College may add: ...]' over fabricated specifics. Aim for 800-2000 words depending on topic complexity.",
        },
      },
      required: [
        'title',
        'code',
        'category',
        'owner_role',
        'requires_acknowledgement',
        'summary',
        'content_md',
      ],
    },
  },
} as const;

interface PolicyArgs {
  title: string;
  code: string;
  category: (typeof CATEGORIES)[number];
  owner_role: (typeof OWNER_ROLES)[number];
  requires_acknowledgement: boolean;
  summary: string;
  content_md: string;
}

/* ───────────────── prompts ───────────────── */

function buildSystemPrompt(): string {
  return `You are a senior UK Further Education compliance officer drafting a policy document for a specific college. Your output is a STARTING POINT for the college's DSL or Verifier to review and publish — they will edit before signing off.

You operate under these UK statutory frameworks (cite the right one for the topic):
- Safeguarding: Keeping Children Safe in Education (KCSIE), Working Together to Safeguard Children, Children Act 1989/2004
- Prevent duty: Counter-Terrorism and Security Act 2015, Prevent duty guidance for FE
- Data protection: UK GDPR, Data Protection Act 2018, ICO guidance
- Health & Safety: Health and Safety at Work etc Act 1974, RIDDOR, COSHH
- EDI: Equality Act 2010, public sector equality duty (where applicable)
- SEND: Children and Families Act 2014, Equality Act 2010 reasonable adjustments
- Apprenticeships: ESFA funding rules, Institute for Apprenticeships standards
- Assessment / IQA: awarding-body QAA frameworks, RARPA principles
- Whistleblowing: Public Interest Disclosure Act 1998

Hard rules:
- UK English (analyse, behaviour, programme, colour, organisation, licence, centre).
- Specific, not generic. Reference the actual college (use the supplied name).
- Do NOT fabricate case law, court decisions, MP statements, dated press releases, or made-up statutes. Reference real frameworks above only.
- Where the policy needs college-specific detail you can't know (incident reporting contact name, CPD frequency, complaint escalation chain), use clear placeholders like "[College DSL / DDSL contact details — to be added]" or "[Specify timeframe in line with college procedures]". The reviewer will fill these.
- Roles & Responsibilities should align with the supplied college's actual structure if known. Default to standard FE roles: Principal, DSL, Deputy DSL, Quality Nominee, H&S Lead, Heads of Department, Tutors, Apprentices/Learners.
- Procedure section uses numbered steps. Records & Reporting names the actual records (incident log, training register, etc).
- Review & Version Control: state typical review cycle (annually for KCSIE-driven policies; biannually for slower-moving ones).
- Length: 800-2000 words depending on topic complexity. Don't pad.

Output via the submit_policy_draft tool exactly once.`;
}

function buildUserPrompt(
  topic: string,
  category: string | undefined,
  contextLines: string[]
): string {
  const lines: string[] = [];
  lines.push('# Topic the college wants a policy for');
  lines.push(topic);
  if (category) {
    lines.push('');
    lines.push(`# Category hint from the UI`);
    lines.push(category);
  }
  lines.push('');
  lines.push('# College context');
  for (const l of contextLines) lines.push(l);
  lines.push('');
  lines.push('Now draft the policy via submit_policy_draft.');
  return lines.join('\n');
}

/* ───────────────── handler ───────────────── */

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') return new Response('ok', { headers: corsHeaders });
  if (req.method !== 'POST')
    return new Response(JSON.stringify({ error: 'method_not_allowed' }), {
      status: 405,
      headers: { ...corsHeaders, 'content-type': 'application/json' },
    });

  const SUPABASE_URL = Deno.env.get('SUPABASE_URL');
  const SERVICE_KEY = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY');
  const ANON_KEY = Deno.env.get('SUPABASE_ANON_KEY');
  const OPENAI_KEY = Deno.env.get('OPENAI_API_KEY');
  if (!SUPABASE_URL || !SERVICE_KEY || !ANON_KEY || !OPENAI_KEY) {
    return new Response(JSON.stringify({ error: 'server_misconfigured' }), {
      status: 500,
      headers: { ...corsHeaders, 'content-type': 'application/json' },
    });
  }

  const sb: SbClient = createClient(SUPABASE_URL, SERVICE_KEY, {
    auth: { persistSession: false, autoRefreshToken: false },
  });

  // Auth: must be staff in some college. We resolve their college via
  // college_staff so RLS isn't bypassed.
  const auth = req.headers.get('authorization');
  if (!auth) {
    return new Response(JSON.stringify({ error: 'unauthorized' }), {
      status: 401,
      headers: { ...corsHeaders, 'content-type': 'application/json' },
    });
  }
  const userClient = createClient(SUPABASE_URL, ANON_KEY, {
    global: { headers: { Authorization: auth } },
    auth: { persistSession: false },
  });
  const { data: userData } = await userClient.auth.getUser();
  const uid = userData?.user?.id;
  if (!uid) {
    return new Response(JSON.stringify({ error: 'unauthorized' }), {
      status: 401,
      headers: { ...corsHeaders, 'content-type': 'application/json' },
    });
  }
  const { data: staffRow } = await sb
    .from('college_staff')
    .select('college_id, role, name')
    .eq('user_id', uid)
    .is('archived_at', null)
    .maybeSingle();
  const staff = staffRow as { college_id: string; role: string | null; name: string | null } | null;
  if (!staff?.college_id) {
    return new Response(JSON.stringify({ error: 'forbidden' }), {
      status: 403,
      headers: { ...corsHeaders, 'content-type': 'application/json' },
    });
  }

  let body: ReqBody;
  try {
    body = (await req.json()) as ReqBody;
  } catch {
    return new Response(JSON.stringify({ error: 'invalid_json' }), {
      status: 400,
      headers: { ...corsHeaders, 'content-type': 'application/json' },
    });
  }
  const trimmedTopic = (body.topic ?? '').trim();
  if (trimmedTopic.length < MIN_TOPIC_CHARS) {
    return new Response(JSON.stringify({ error: 'topic_too_short' }), {
      status: 400,
      headers: { ...corsHeaders, 'content-type': 'application/json' },
    });
  }
  const topicText =
    trimmedTopic.length > MAX_TOPIC_CHARS
      ? `${trimmedTopic.slice(0, MAX_TOPIC_CHARS)}…`
      : trimmedTopic;
  const categoryHint =
    body.category && CATEGORIES.includes(body.category as (typeof CATEGORIES)[number])
      ? body.category
      : undefined;

  // Load college context — best-effort; the LLM still produces something
  // usable if the loader fails (e.g. missing optional course rows).
  let contextLines: string[] = [];
  try {
    const ctx = await loadCollegeContext(sb, staff.college_id);
    if (ctx) contextLines = collegeContextLines(ctx);
  } catch {
    contextLines = [];
  }

  try {
    const completion = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        authorization: `Bearer ${OPENAI_KEY}`,
        'content-type': 'application/json',
      },
      body: JSON.stringify({
        model: CHAT_MODEL,
        messages: [
          { role: 'system', content: buildSystemPrompt() },
          { role: 'user', content: buildUserPrompt(topicText, categoryHint, contextLines) },
        ],
        tools: [POLICY_TOOL],
        tool_choice: { type: 'function', function: { name: 'submit_policy_draft' } },
        max_completion_tokens: MAX_COMPLETION_TOKENS,
      }),
    });
    if (!completion.ok) {
      const text = await completion.text();
      return new Response(
        JSON.stringify({ error: `openai_${completion.status}`, detail: text.slice(0, 240) }),
        {
          status: 500,
          headers: { ...corsHeaders, 'content-type': 'application/json' },
        }
      );
    }
    const json = (await completion.json()) as {
      choices: Array<{ message: { tool_calls?: Array<{ function: { arguments: string } }> } }>;
    };
    const args = json.choices?.[0]?.message?.tool_calls?.[0]?.function?.arguments;
    if (!args) {
      return new Response(JSON.stringify({ error: 'no_tool_call' }), {
        status: 500,
        headers: { ...corsHeaders, 'content-type': 'application/json' },
      });
    }

    const proposal = JSON.parse(args) as PolicyArgs;
    // Defensive normalisation. Validate the enum values came back as
    // expected — fall back to safe defaults if the model went off-piste.
    const safe = {
      title: (proposal.title ?? '').slice(0, 200).trim(),
      code: (proposal.code ?? '').slice(0, 32).trim() || null,
      category: CATEGORIES.includes(proposal.category) ? proposal.category : 'other',
      owner_role: OWNER_ROLES.includes(proposal.owner_role) ? proposal.owner_role : '',
      requires_acknowledgement: Boolean(proposal.requires_acknowledgement),
      summary: (proposal.summary ?? '').slice(0, 400).trim(),
      // Cap content at 80KB — comfortably more than any reasonable policy
      // and prevents a runaway response from blowing up the form prefill.
      content_md: (proposal.content_md ?? '').slice(0, 80_000),
    };

    return new Response(JSON.stringify(safe), {
      headers: { ...corsHeaders, 'content-type': 'application/json' },
    });
  } catch (e) {
    await captureException(e, { functionName: 'ai-author-policy', requestUrl: req.url, requestMethod: req.method });
    return new Response(JSON.stringify({ error: (e as Error).message ?? 'unknown' }), {
      status: 500,
      headers: { ...corsHeaders, 'content-type': 'application/json' },
    });
  }
});
