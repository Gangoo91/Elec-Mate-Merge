// AI OTJ Verdict — pre-grades a single apprentice-submitted off-the-job
// training entry and returns a structured verdict the tutor sees inline on
// Student 360 before deciding whether to verify or return for more info.
//
// Grounded in:
//   - ESFA off-the-job training rules (20% of paid hours, working
//     definition of "off the normal working duties")
//   - the description quality (specificity, learning evidence)
//   - duration plausibility for the activity type
//   - AC relevance via shared learner-context helpers
//
// Auth: tutor / assessor / IQA in the same college, OR the apprentice
// themselves so they can see "AI says your description needs more detail".
//
// POST { otj_entry_id }
//
// Returns: { verdict, confidence, signals, feedback_for_tutor,
//           feedback_for_apprentice }
// — does NOT persist. Tutor sees it inline; if they verify or return, that
// action is the canonical record.

import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.57.4';
import {
  loadLearnerContext,
  loadQualificationKit,
  lookupQualificationAcs,
  qualificationAcLines,
  raggedAcLines,
  GROUNDING_RULES,
} from '../_shared/learner-context.ts';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

const CHAT_MODEL = 'gpt-5.4-mini-2026-03-17';
const MAX_COMPLETION_TOKENS = 2_000;

type SbClient = ReturnType<typeof createClient>;

interface ReqBody {
  otj_entry_id: string;
}

interface OtjEntryRow {
  id: string;
  college_id: string | null;
  student_id: string;
  activity_date: string;
  activity_type: string;
  title: string;
  description: string | null;
  duration_minutes: number;
  unit_codes: string[] | null;
  evidence_url: string | null;
  evidence_urls: string[] | null;
  source_kind: string;
  verification_status: string;
}

/* ───────────────────────── auth ───────────────────────── */

async function authorise(
  req: Request,
  sb: SbClient,
  entry: OtjEntryRow
): Promise<
  | { ok: true; uid: string; role: 'learner' | 'staff' }
  | { ok: false; error: 'unauthorized' | 'forbidden' }
> {
  const auth = req.headers.get('authorization');
  if (!auth) return { ok: false, error: 'unauthorized' };
  const userClient = createClient(
    Deno.env.get('SUPABASE_URL')!,
    Deno.env.get('SUPABASE_ANON_KEY')!,
    { global: { headers: { Authorization: auth } }, auth: { persistSession: false } }
  );
  const { data: userData } = await userClient.auth.getUser();
  const uid = userData?.user?.id;
  if (!uid) return { ok: false, error: 'unauthorized' };

  // The apprentice themselves
  if (uid === entry.student_id) return { ok: true, uid, role: 'learner' };

  // Same-college staff (tutor / assessor / IQA)
  if (entry.college_id) {
    const { data: staff } = await sb
      .from('college_staff')
      .select('id')
      .eq('user_id', uid)
      .eq('college_id', entry.college_id)
      .maybeSingle();
    if (staff) return { ok: true, uid, role: 'staff' };
  }
  return { ok: false, error: 'forbidden' };
}

/* ───────────────── verdict tool schema ────────────────── */

const VERDICT_TOOL = {
  type: 'function',
  function: {
    name: 'submit_otj_verdict',
    description:
      'Submit a structured AI verdict on this off-the-job training entry. Used as a recommendation to the tutor, not the final decision.',
    parameters: {
      type: 'object',
      additionalProperties: false,
      properties: {
        verdict: {
          type: 'string',
          enum: ['recommend_verify', 'recommend_question', 'recommend_reject'],
          description:
            "recommend_verify: clearly meets ESFA OTJ standards. recommend_question: borderline — tutor should ask a clarifying question first. recommend_reject: doesn't meet OTJ definition (e.g. clearly normal working duties, or description too vague to judge).",
        },
        confidence: {
          type: 'number',
          description: 'Confidence from 0 to 1. Use lower values when description is short or evidence is missing.',
        },
        signals: {
          type: 'object',
          additionalProperties: false,
          description: 'Quality signals — each from 0 (poor) to 1 (excellent). Be honest, not generous.',
          properties: {
            description_specificity: {
              type: 'number',
              description:
                'How specific is the description? Quotes a kit / supervisor / specific task = high. Generic phrases like "did some work" = low.',
            },
            learning_evidence: {
              type: 'number',
              description:
                'Does the apprentice show what they learned, what surprised them, where they got stuck? Not just what they did.',
            },
            otj_eligibility: {
              type: 'number',
              description:
                'Does this meet the ESFA off-the-job definition? Normal contracted duties = 0. Genuine new learning, training, shadowing, mentoring, theory study = 1.',
            },
            duration_plausibility: {
              type: 'number',
              description:
                'Is the duration plausible for the activity described? 5h shadowing = plausible. 30s "toolbox talk" lasting 4h = implausible.',
            },
            ac_relevance: {
              type: 'number',
              description:
                'If unit codes are claimed, do they actually fit what the apprentice described? If no codes claimed but AC catalogue suggests obvious fits, that\'s OK.',
            },
          },
          required: [
            'description_specificity',
            'learning_evidence',
            'otj_eligibility',
            'duration_plausibility',
            'ac_relevance',
          ],
        },
        feedback_for_tutor: {
          type: 'string',
          description:
            '1–2 sentences for the tutor — concrete things to spot-check. Quote phrases from the description where helpful.',
        },
        feedback_for_apprentice: {
          type: 'string',
          description:
            "1–2 sentences the apprentice will see if the tutor returns this. Direct, specific, polite — what they should add or change. Empty string if recommend_verify.",
        },
        suggested_ac_refs: {
          type: 'array',
          description:
            'Up to 4 AC codes (from the supplied catalogue) that this activity could evidence. Empty array if none clearly fit.',
          items: { type: 'string' },
        },
      },
      required: [
        'verdict',
        'confidence',
        'signals',
        'feedback_for_tutor',
        'feedback_for_apprentice',
        'suggested_ac_refs',
      ],
    },
  },
} as const;

interface VerdictArgs {
  verdict: 'recommend_verify' | 'recommend_question' | 'recommend_reject';
  confidence: number;
  signals: {
    description_specificity: number;
    learning_evidence: number;
    otj_eligibility: number;
    duration_plausibility: number;
    ac_relevance: number;
  };
  feedback_for_tutor: string;
  feedback_for_apprentice: string;
  suggested_ac_refs: string[];
}

/* ───────────────────────── prompts ───────────────────────── */

function buildSystemPrompt(): string {
  return `You are an off-the-job (OTJ) training verifier for UK electrical apprentices. Your job is to advise the tutor whether to verify, question, or return a learner-submitted OTJ entry.

ESFA OTJ rules (UK apprenticeships):
- Counts: training, theory study, shadowing, mentoring, manufacturer training, simulation, industry visits, toolbox talks that introduce NEW knowledge, observed assessments, on-job tasks specifically designed to teach a new skill.
- Does NOT count: normal contracted productive work, repeat tasks the apprentice already does daily, breaks, induction-to-the-employer (i.e. HR onboarding), generic team meetings.
- The activity must be away from the apprentice's normal working duties OR clearly framed as "learning the skill" not "doing the job".

Tone of feedback:
- For tutor: terse and concrete. Quote phrases from the description ("the apprentice mentioned X — worth confirming Y"). UK English (analyse, behaviour, programme).
- For apprentice (only when not verifying): direct and constructive. Say what to add. Do not lecture.

Calibration:
- recommend_verify only when description is specific AND eligibility is clearly met AND duration is plausible.
- recommend_question when description is too short / vague but the activity sounds plausible.
- recommend_reject when the activity is clearly normal working duties OR description is too thin to judge AND the duration is high enough to matter.
- Confidence below 0.7 if description is under 30 chars or you have to guess at eligibility.

${GROUNDING_RULES}

Output via the submit_otj_verdict tool exactly once.`;
}

function buildUserPrompt(
  entry: OtjEntryRow,
  acsBlock: string[]
): string {
  const lines: string[] = [];
  lines.push('# OTJ submission to verify');
  lines.push(`Activity type: ${entry.activity_type}`);
  lines.push(`Title: ${entry.title}`);
  lines.push(`Duration: ${entry.duration_minutes} minutes`);
  lines.push(`Date: ${entry.activity_date}`);
  if (entry.unit_codes && entry.unit_codes.length > 0) {
    lines.push(`Unit codes claimed: ${entry.unit_codes.join(', ')}`);
  }
  const photoCount =
    (entry.evidence_urls?.length ?? 0) || (entry.evidence_url ? 1 : 0);
  lines.push(`Photo evidence attached: ${photoCount}`);
  lines.push('');
  lines.push('## Description from apprentice');
  const descTrimmed = entry.description?.trim() ?? '';
  if (descTrimmed.length > 0) {
    // Cap to keep token usage predictable. 1200 chars is plenty to judge
    // specificity; more than that is usually padding the apprentice
    // wrote to game the AI.
    const MAX = 1200;
    lines.push(
      descTrimmed.length > MAX ? `${descTrimmed.slice(0, MAX)}… [truncated]` : descTrimmed
    );
  } else {
    lines.push('(no description provided)');
  }

  if (acsBlock.length > 0) {
    lines.push('');
    for (const l of acsBlock) lines.push(l);
  }

  lines.push('');
  lines.push('Now submit your verdict via submit_otj_verdict.');
  return lines.join('\n');
}

/* ───────────────────────── handler ───────────────────────── */

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') return new Response('ok', { headers: corsHeaders });
  if (req.method !== 'POST')
    return new Response(JSON.stringify({ error: 'method_not_allowed' }), {
      status: 405,
      headers: { ...corsHeaders, 'content-type': 'application/json' },
    });

  const SUPABASE_URL = Deno.env.get('SUPABASE_URL');
  const SERVICE_KEY = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY');
  const OPENAI_KEY = Deno.env.get('OPENAI_API_KEY');
  if (!SUPABASE_URL || !SERVICE_KEY || !OPENAI_KEY) {
    return new Response(JSON.stringify({ error: 'server_misconfigured' }), {
      status: 500,
      headers: { ...corsHeaders, 'content-type': 'application/json' },
    });
  }

  const sb = createClient(SUPABASE_URL, SERVICE_KEY, {
    auth: { persistSession: false, autoRefreshToken: false },
  });

  let body: ReqBody;
  try {
    body = (await req.json()) as ReqBody;
  } catch {
    return new Response(JSON.stringify({ error: 'invalid_json' }), {
      status: 400,
      headers: { ...corsHeaders, 'content-type': 'application/json' },
    });
  }
  if (!body.otj_entry_id) {
    return new Response(JSON.stringify({ error: 'missing_otj_entry_id' }), {
      status: 400,
      headers: { ...corsHeaders, 'content-type': 'application/json' },
    });
  }

  // Load the entry
  const { data: entryRow } = await sb
    .from('college_otj_entries')
    .select(
      'id, college_id, student_id, activity_date, activity_type, title, description, duration_minutes, unit_codes, evidence_url, evidence_urls, source_kind, verification_status'
    )
    .eq('id', body.otj_entry_id)
    .maybeSingle();
  if (!entryRow) {
    return new Response(JSON.stringify({ error: 'entry_not_found' }), {
      status: 404,
      headers: { ...corsHeaders, 'content-type': 'application/json' },
    });
  }
  const entry = entryRow as OtjEntryRow;

  const auth = await authorise(req, sb, entry);
  if (!auth.ok) {
    return new Response(JSON.stringify({ error: auth.error }), {
      status: auth.error === 'forbidden' ? 403 : 401,
      headers: { ...corsHeaders, 'content-type': 'application/json' },
    });
  }

  // Resolve apprentice's college_students.id so loadLearnerContext works.
  const { data: cs } = await sb
    .from('college_students')
    .select('id')
    .eq('user_id', entry.student_id)
    .maybeSingle();
  const collegeStudentId = (cs as { id?: string } | null)?.id ?? null;

  // Pull RAG'd ACs to ground the verdict in the qualification's actual
  // criteria. Falls back to the inline catalogue when RAG is empty.
  let acsBlock: string[] = [];
  if (collegeStudentId) {
    try {
      const ctx = await loadLearnerContext(sb, collegeStudentId);
      const qualCode = ctx?.course?.code ?? null;
      if (qualCode) {
        const seeds: string[] = [];
        if (entry.title) seeds.push(entry.title);
        if (entry.description) seeds.push(entry.description.slice(0, 200));
        if (entry.unit_codes && entry.unit_codes.length > 0) {
          for (const u of entry.unit_codes.slice(0, 3)) seeds.push(`unit ${u}`);
        }
        if (seeds.length === 0) seeds.push(entry.activity_type);
        const [qualKit, raggedAcs] = await Promise.all([
          loadQualificationKit(sb, qualCode),
          lookupQualificationAcs(sb, seeds, qualCode, 6, 3),
        ]);
        acsBlock =
          raggedAcs.length > 0
            ? raggedAcLines(raggedAcs, 10)
            : qualificationAcLines(qualKit, 30);
      }
    } catch {
      // RAG not available — verdict still works, just less AC-grounded
      acsBlock = [];
    }
  }

  try {
    const messages = [
      { role: 'system', content: buildSystemPrompt() },
      { role: 'user', content: buildUserPrompt(entry, acsBlock) },
    ];

    const completion = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        authorization: `Bearer ${OPENAI_KEY}`,
        'content-type': 'application/json',
      },
      body: JSON.stringify({
        model: CHAT_MODEL,
        messages,
        tools: [VERDICT_TOOL],
        tool_choice: { type: 'function', function: { name: 'submit_otj_verdict' } },
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

    const verdict = JSON.parse(args) as VerdictArgs;

    // Tutor-only fields are stripped when the apprentice calls this.
    // feedback_for_tutor would let them see the staff's planned scrutiny,
    // and we keep verdict-string + confidence + their own feedback line.
    const isLearner = auth.role === 'learner';
    return new Response(
      JSON.stringify({
        otj_entry_id: entry.id,
        verdict: verdict.verdict,
        confidence: verdict.confidence,
        signals: isLearner ? null : verdict.signals,
        feedback_for_tutor: isLearner ? null : verdict.feedback_for_tutor,
        feedback_for_apprentice: verdict.feedback_for_apprentice,
        suggested_ac_refs: verdict.suggested_ac_refs,
        audience: isLearner ? 'learner' : 'staff',
      }),
      {
        headers: { ...corsHeaders, 'content-type': 'application/json' },
      }
    );
  } catch (e) {
    return new Response(JSON.stringify({ error: (e as Error).message ?? 'unknown' }), {
      status: 500,
      headers: { ...corsHeaders, 'content-type': 'application/json' },
    });
  }
});
