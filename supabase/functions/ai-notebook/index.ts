// AI Notebook — conversational AI grounded in real learner data.
//
// Two personas, one engine:
//   apprentice → "What ACs am I behind on? / explain my last quiz mistake"
//   tutor      → "How is Jay tracking? / who's at risk?"
//
// Streams the response as SSE. Two parallel OpenAI calls:
//   A) prose answer streamed token-by-token  -> `delta` events
//   B) tool-call for citations + actions + title (small, fast)
// On both done, persists + emits `done` with the full payload.
//
// Conversations + messages persisted to notebook_conversations /
// notebook_messages so threads survive refresh and the AI can read prior
// context on follow-ups.

import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.57.4';
import {
  loadLearnerContext,
  loadQualificationKit,
  lookupBs7671Facets,
  lookupQualificationAcs,
  bs7671SeedQueries,
  contextSummaryLines,
  qualificationAcLines,
  raggedAcLines,
  bs7671FacetLines,
  GROUNDING_RULES,
} from '../_shared/learner-context.ts';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

const CHAT_MODEL = 'gpt-5.4-mini-2026-03-17';
const PROSE_MAX_TOKENS = 9_000;
const PROSE_RETRY_MAX_TOKENS = 2_500;
const STRUCTURE_MAX_TOKENS = 600;
const STREAM_TIMEOUT_MS = 120_000;
const HISTORY_TURNS = 10;

type Persona = 'apprentice' | 'tutor';
type SbClient = ReturnType<typeof createClient>;

interface ReqBody {
  conversation_id?: string | null;
  message: string;
  persona: Persona;
  subject_student_id?: string | null;
}

interface ConversationRow {
  id: string;
  owner_uid: string;
  persona: Persona;
  subject_student_id: string | null;
  title: string | null;
}

interface MessageRow {
  role: 'user' | 'assistant' | 'system';
  content: string;
}

interface Citation {
  type: 'ac' | 'bs7671' | 'quiz' | 'portfolio' | 'otj' | 'observation';
  ref: string;
  label: string;
}

type ActionKind =
  | 'open_quiz'
  | 'open_portfolio'
  | 'add_reflection'
  | 'submit_otj'
  | 'open_brief'
  | 'open_simulator'
  | 'open_student_360'
  | 'log_observation'
  | 'draft_one_to_one'
  | 'edit_ilp'
  | 'message_tutor';

interface SuggestedAction {
  label: string;
  kind: ActionKind;
  href: string;
}

/** Raw action shape coming back from the structure tool — server resolves to href. */
interface RawAction {
  label: string;
  kind: ActionKind;
  target_id?: string;
}

/* ───────────────────────── proposals (write-back) ─────────────────────── */

type ProposalKind = 'propose_otj_reflection';

interface RawProposal {
  kind: ProposalKind;
  title: string;
  description: string;
  estimated_minutes?: number;
  activity_type?: string;
  suggested_unit_codes?: string[];
}

interface Proposal {
  kind: ProposalKind;
  title: string;
  description: string;
  estimated_minutes: number;
  activity_type: string;
  suggested_unit_codes: string[];
}

const ALLOWED_ACTIVITY_TYPES = new Set([
  'practical',
  'shadowing',
  'manufacturer_training',
  'industry_visit',
  'employer_meeting',
  'simulation',
  'mentoring',
  'theory',
  'assessment',
  'other',
]);

/** Validate + normalise a proposal coming back from the structure tool.
    Drops anything malformed so we never persist an invalid draft. */
function resolveProposal(raw: RawProposal): Proposal | null {
  if (raw?.kind !== 'propose_otj_reflection') return null;
  const title = raw.title?.trim().slice(0, 120);
  const description = raw.description?.trim().slice(0, 4_000);
  if (!title || !description || description.length < 30) return null;

  const minutes =
    typeof raw.estimated_minutes === 'number' && raw.estimated_minutes > 0
      ? Math.min(Math.round(raw.estimated_minutes), 600)
      : 60;
  const activityType =
    raw.activity_type && ALLOWED_ACTIVITY_TYPES.has(raw.activity_type)
      ? raw.activity_type
      : 'practical';
  const unitCodes = Array.isArray(raw.suggested_unit_codes)
    ? raw.suggested_unit_codes
        .map((c) => (typeof c === 'string' ? c.trim() : ''))
        .filter((c): c is string => c.length > 0 && c.length < 40)
        .slice(0, 6)
    : [];

  return {
    kind: 'propose_otj_reflection',
    title,
    description,
    estimated_minutes: minutes,
    activity_type: activityType,
    suggested_unit_codes: unitCodes,
  };
}

const UUID_RE = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

/**
 * Construct a real, app-internal href for an action. Returns null if the
 * action is malformed (missing required target_id, bad UUID, unknown kind).
 * The model never writes URLs — this is the only place hrefs are made.
 */
function resolveActionHref(
  raw: RawAction,
  persona: Persona,
  selfStudentId: string | null
): string | null {
  const tid = raw.target_id?.trim();
  const validId = tid && UUID_RE.test(tid) ? tid : null;
  // Tutor actions targeting "the learner" can fall back to the conversation's
  // subject student if the model omits target_id.
  const tutorTarget = validId ?? (persona === 'tutor' ? selfStudentId : null);
  const tutorTargetValid = tutorTarget && UUID_RE.test(tutorTarget) ? tutorTarget : null;
  switch (raw.kind) {
    case 'open_quiz':
      // Apprentice take-quiz route is /apprentice/college/quiz/:id (the
      // college-side TakeQuizPage). The bare /apprentice/quiz/:id is the
      // older course quiz surface and is NOT what notebook quizzes link to.
      return validId ? `/apprentice/college/quiz/${validId}` : null;
    case 'open_portfolio':
      return '/apprentice/college-plan#portfolio';
    case 'add_reflection':
      return '/apprentice/college-plan#otj';
    case 'submit_otj':
      return '/apprentice/college-plan#otj';
    case 'open_brief':
      return '/apprentice/college-plan#epa';
    case 'open_simulator':
      // Dedicated route — cleaner than anchoring into the hub.
      return '/apprentice/epa-simulator';
    case 'message_tutor':
      return '/apprentice/college-plan#plan';
    case 'edit_ilp':
      if (persona === 'tutor') {
        return tutorTargetValid ? `/college/students/${tutorTargetValid}#ilp` : null;
      }
      return '/apprentice/college-plan#plan';
    case 'open_student_360':
      return persona === 'tutor' && tutorTargetValid
        ? `/college/students/${tutorTargetValid}`
        : null;
    case 'log_observation':
      return persona === 'tutor' && tutorTargetValid
        ? `/college/students/${tutorTargetValid}#observations`
        : null;
    case 'draft_one_to_one':
      return persona === 'tutor' && tutorTargetValid
        ? `/college/students/${tutorTargetValid}`
        : null;
    default:
      return null;
  }
}

function sseEvent(event: string, data: unknown): Uint8Array {
  return new TextEncoder().encode(`event: ${event}\ndata: ${JSON.stringify(data)}\n\n`);
}
function sseComment(msg: string): Uint8Array {
  return new TextEncoder().encode(`: ${msg}\n\n`);
}

/* ───────────────────────── auth + persona scoping ─────────────────────── */

async function authorise(req: Request) {
  const auth = req.headers.get('authorization');
  if (!auth) return { ok: false as const, error: 'unauthorized' as const };
  const userClient = createClient(
    Deno.env.get('SUPABASE_URL')!,
    Deno.env.get('SUPABASE_ANON_KEY')!,
    { global: { headers: { Authorization: auth } }, auth: { persistSession: false } }
  );
  const { data } = await userClient.auth.getUser();
  if (!data?.user) return { ok: false as const, error: 'unauthorized' as const };
  return { ok: true as const, uid: data.user.id };
}

async function checkTutorScope(
  sb: SbClient,
  tutorUid: string,
  collegeStudentId: string
): Promise<boolean> {
  const { data: cs } = await sb
    .from('college_students')
    .select('college_id')
    .eq('id', collegeStudentId)
    .maybeSingle();
  const collegeId = (cs as { college_id?: string } | null)?.college_id;
  if (!collegeId) return false;
  const { data: staff } = await sb
    .from('college_staff')
    .select('id')
    .eq('user_id', tutorUid)
    .eq('college_id', collegeId)
    .maybeSingle();
  return Boolean(staff);
}

/* ───────────────────────── prompts ────────────────────────────────────── */

const APP_CAPABILITIES = `# Elec-Mate app capabilities (use this to recommend concrete next steps)

The apprentice can:
- Take or revise quizzes (auto-graded MCQ + AI-graded free response). Quizzes are linked to assessment criteria (AC codes) and may target weak units.
- Upload + manage portfolio items (jobs, projects, evidence). Tutors can comment, request action, and sign off.
- Submit OTJ (off-the-job) hours from work-based reflections — including quick reflections from the apprentice hub.
- View the personalised pre-EPA brief once it's generated, and run timed EPA simulator mocks.
- See their ILP goals (set by tutor), tick them off, leave replies, and acknowledge feedback.
- Read messages from their tutor; reply in-app.
- See cohort lessons + their own ILP target dates on a 2-week timetable.
- Browse tutor-shared resources tagged to ACs and lessons.
- View live AC coverage progress, observation outcomes, attendance, mock scores.

Tutors / assessors / IQAs can:
- Open Student 360 — full learner picture with action rail.
- Draft AI-prepared 1-2-1 agendas grounded in the learner's signals.
- Log observations against AC codes (auto-progresses AC sign-off chain).
- Edit ILP goals + add reflections.
- Mark attendance, log grades, send messages.
- Verify or return apprentice-submitted OTJ hours.
- Run cohort comparison + percentile sparklines.
- Export Learner 360 PDF + audit pack.
- Generate AI-tailored quizzes, lessons, and policies.

When suggesting next-step actions, ALWAYS pick a kind from the allowed list (open_quiz, open_portfolio, add_reflection, submit_otj, open_brief, open_simulator, open_student_360, log_observation, draft_one_to_one, edit_ilp, message_tutor). Never invent custom URL schemes — the server constructs the link.`;

const APPRENTICE_PROSE = `You are the apprentice's personal AI study mentor on Elec-Mate. You know the WHOLE app and the apprentice's ENTIRE record (ACs, quizzes, OTJ, portfolio, EPA verdicts, ILP, attendance, observations, timetable, tutor messages) plus BS 7671 A4:2026 and the qualification's full AC catalogue.

Audience: a UK electrical apprentice (typically 17-25, on a Level 3 apprenticeship). Tone: warm, encouraging, second-person ("you should…", "your portfolio shows…"). UK English (analyse, behaviour, programme). Talk like a great tutor in plain English, not like a regulation parser.

CRITICAL — ALWAYS produce a substantive answer, never a blank, even if the question is brief, unclear, or not phrased as a question. Interpret the message charitably as a study/career request and respond. If the input is a single phrase ("portfolio", "quiz", "EPA"), assume they want a status + next-step on that topic.

Write the prose answer only — no JSON, no preamble, no "Sure!" preface. Just the answer.

# Plain English — the most important rule
Apprentices DO NOT know what unit codes, AC codes or regulation numbers mean on their own. NEVER drop a raw code without translating it.

- WRONG: "You're behind on **INIT.1** and need to revise **412.6.2**."
- RIGHT: "You're behind on **Initial Verification** (the unit covers safe isolation, IR testing, RCD checks before energising). Specifically: testing supplies before reconnection — **BS 7671 Reg 412.6.2** covers when an SPD is required."

Rules of engagement:
- The FIRST time you mention any AC code, expand it with its plain-English meaning from the supplied context (the AC text after the dash). Format: "**Initial Verification (INIT.1)**".
- The FIRST time you mention any BS 7671 regulation, give a one-line gloss of what it actually says. Format: "**Reg 411.4.1** — automatic disconnection of supply on a TN system".
- Subsequent mentions can be the bare code.
- If a unit code looks cryptic ("INIT", "ESP", "EFE"), ALWAYS spell out the unit title — never use the code alone.
- Translate jargon: "EFLI" → "earth fault loop impedance (Zs)", "RCD" → "residual current device (RCD)", "ADS" → "automatic disconnection of supply (ADS)", etc.
- Don't show off — the student isn't a senior electrician yet.

# Style
- Lead with a one- or two-sentence direct answer.
- Use 3-7 short paragraphs. The point is to TEACH, not just point. Walk them through the why.
- Bullets only for lists with 3+ items, and keep each bullet a sentence or two.
- One H3 heading max if the answer has very distinct sections — usually plain paragraphs are better.
- Bold sparingly: AC code expansions, regulation refs (with their gloss), key numbers (e.g. **30 mA**, **0.4 s**).
- Use concrete examples. If the apprentice asks about earth fault loop impedance, use a real circuit (e.g. 32 A B-type MCB on a TN-S supply, give the Zs limit and explain why).
- When you recommend a next step, name the surface ("open the EPA simulator", "submit OTJ from your hub") — do NOT include URLs in the prose; the action chips handle that.
- Do NOT pad. But DO go deep when the question warrants it. A good answer is as long as the topic deserves.
- Never invent figures, scores, or events. Only use the supplied learner context + AC catalogue + BS 7671 facets.

${APP_CAPABILITIES}

${GROUNDING_RULES}`;

const TUTOR_PROSE = `You are an analytical AI co-tutor for UK electrical apprenticeship staff on Elec-Mate. You know the WHOLE app and the LEARNER'S entire record (ACs, quizzes, OTJ, portfolio, EPA verdicts, ILP, attendance, observations, gateway, timetable) plus BS 7671 A4:2026.

Audience: a tutor / assessor / IQA. Tone: colleague, not assistant — analytical, evidence-led, never emotional. UK English.

CRITICAL — ALWAYS produce a substantive answer, never a blank. Interpret the message charitably. If the input is a phrase ("portfolio", "EPA"), give a one-paragraph diagnostic + concrete next-step recommendation.

Write the prose answer only — no JSON, no preamble, no "Sure!" preface.

Style:
- Lead with a one-sentence diagnostic answer.
- 2-5 short paragraphs. Bullets for lists with 3+ items only.
- ONE small heading max — only when the answer has distinct sections.
- Bold AC codes (**C2.1**), regulation refs (**Reg 411.4.1**), key dates / numbers.
- Be concrete: cite quiz titles, observation dates, portfolio items.
- Never invent figures or events. If a signal is missing say "no evidence in the data yet" — never pad.
- Recommend next steps by surface name ("open Student 360", "draft a 1-2-1 agenda") — the action chips carry the link.

${APP_CAPABILITIES}

${GROUNDING_RULES}`;

const STRUCTURE_PROMPT = `You support a parallel prose answer being generated for the same question.
Your job: produce structured metadata only — citations and suggested actions — based on the same learner context.

Citations (up to 6): pick the AC codes, BS 7671 reg numbers, quiz titles, portfolio item titles, or observation dates that genuinely back the prose answer. Use real refs from the supplied context — never invent.

Citation labels: write the chip label in plain English so an apprentice can read it at a glance.
- ac type:    "Initial Verification — INIT.1"   (NOT just "INIT.1")
- bs7671:     "Reg 411.4.1 — TN auto-disconnect"  (NOT just "411.4.1")
- quiz:       quiz title (already readable)
- portfolio:  portfolio item title (already readable)
- otj:        "OTJ — 5 Mar" or short activity description
- observation:"Observation — 5 Mar" or short activity title

The ref field stays as the raw stable identifier (AC code, reg number, etc.). Only the label is humanised.

Suggested actions (0-3): pick concrete next steps. Each action requires a kind and (where listed below) a target_id from the supplied context. The server will construct the URL — you DO NOT generate URLs.

Action kinds and what target_id (if any) to pass:
- open_quiz — target_id = quiz_id from quizzes.attempts[].quiz_id, or any quiz_id you've been given. Use ONLY when there is a real quiz_id to point at.
- open_portfolio — no target_id needed.
- add_reflection — no target_id needed.
- submit_otj — no target_id needed.
- open_brief — no target_id needed.
- open_simulator — no target_id needed.
- open_student_360 — target_id = college_students.id (from learner context).
- log_observation — target_id = college_students.id.
- draft_one_to_one — target_id = college_students.id.
- edit_ilp — target_id optional; for tutor persona use college_students.id.
- message_tutor — no target_id needed.

If you don't have a real target_id for an action that needs one, omit the action entirely — never make one up.

Proposals (apprentice persona only — leave empty for tutor):
Emit a propose_otj_reflection proposal ONLY when the apprentice has either:
  (a) explicitly asked you to draft an OTJ reflection / write up a job, OR
  (b) described a real piece of work they did with enough detail to draft from.
If they're asking for an explanation, theory, or general advice — DO NOT emit a proposal. Empty array is the correct default.

When you do emit one:
- title: 4-10 words summarising what they did. Verb-led.
- description: 80-400 words, first person ("I tested...", "I noticed..."), capturing what they did, why it mattered, what they learnt, any BS 7671 reg they applied (in plain English with the reg number). This will be filed as a real OTJ entry — write it the way the apprentice would write it themselves, not the way an AI writes.
- estimated_minutes: realistic duration. 60 if unsure.
- activity_type: pick the closest match (practical / shadowing / manufacturer_training / industry_visit / employer_meeting / simulation / mentoring / theory / assessment / other).
- suggested_unit_codes: up to 6 unit codes from the supplied AC catalogue that this activity genuinely covers. Empty if none clearly fit.

If this is the FIRST turn, set title_suggestion to a 3-6 word title. Otherwise leave empty.

Output via the submit_structure tool exactly once.`;

/* ───────────────────────── tool schema ────────────────────────────────── */

const STRUCTURE_TOOL = {
  type: 'function',
  function: {
    name: 'submit_structure',
    description: 'Submit citations + suggested actions for the prose response.',
    parameters: {
      type: 'object',
      additionalProperties: false,
      properties: {
        citations: {
          type: 'array',
          description: 'Up to 6 citations from the supplied context.',
          items: {
            type: 'object',
            additionalProperties: false,
            properties: {
              type: {
                type: 'string',
                enum: ['ac', 'bs7671', 'quiz', 'portfolio', 'otj', 'observation'],
              },
              ref: { type: 'string', description: 'Stable ref (AC code, reg number, id).' },
              label: { type: 'string', description: 'Human label shown on the chip.' },
            },
            required: ['type', 'ref', 'label'],
          },
        },
        suggested_actions: {
          type: 'array',
          description:
            '0-3 deep-link action chips. Empty if none make sense. Server constructs the URL — DO NOT include hrefs.',
          items: {
            type: 'object',
            additionalProperties: false,
            properties: {
              label: {
                type: 'string',
                description: 'Short button text e.g. "Take this quiz" or "Open EPA brief".',
              },
              kind: {
                type: 'string',
                enum: [
                  'open_quiz',
                  'open_portfolio',
                  'add_reflection',
                  'submit_otj',
                  'open_brief',
                  'open_simulator',
                  'open_student_360',
                  'log_observation',
                  'draft_one_to_one',
                  'edit_ilp',
                  'message_tutor',
                ],
              },
              target_id: {
                type: 'string',
                description:
                  'UUID from supplied context for actions that need one (open_quiz=quiz_id, open_student_360/log_observation/draft_one_to_one=college_students.id). Omit otherwise.',
              },
            },
            required: ['label', 'kind'],
          },
        },
        proposals: {
          type: 'array',
          maxItems: 1,
          description:
            'Zero or one structured DRAFT the apprentice can confirm to file into a real record. Currently only propose_otj_reflection is supported. Emit ONLY when the apprentice has clearly described or asked you to draft a reflection on a real piece of work — never speculatively. Apprentice persona only — leave empty for tutor persona.',
          items: {
            type: 'object',
            additionalProperties: false,
            properties: {
              kind: {
                type: 'string',
                enum: ['propose_otj_reflection'],
              },
              title: {
                type: 'string',
                description:
                  'Short title for the OTJ entry — 4-10 words summarising the activity. e.g. "Tested ring final on flat refurb".',
              },
              description: {
                type: 'string',
                description:
                  'The reflection itself — 80-400 words, first person, what the apprentice did, why it mattered, what they learnt. Plain English. Use real BS 7671 refs in plain English when relevant.',
              },
              estimated_minutes: {
                type: 'integer',
                minimum: 15,
                maximum: 600,
                description: 'Estimated duration in minutes for this activity.',
              },
              activity_type: {
                type: 'string',
                enum: [
                  'practical',
                  'shadowing',
                  'manufacturer_training',
                  'industry_visit',
                  'employer_meeting',
                  'simulation',
                  'mentoring',
                  'theory',
                  'assessment',
                  'other',
                ],
              },
              suggested_unit_codes: {
                type: 'array',
                description:
                  'Up to 6 unit codes from the supplied AC catalogue that this activity covers. Use real codes only.',
                items: { type: 'string' },
              },
            },
            required: ['kind', 'title', 'description'],
          },
        },
        title_suggestion: {
          type: 'string',
          description: 'Conversation title — 3-6 words. Empty after first turn.',
        },
      },
      required: ['citations', 'suggested_actions'],
    },
  },
} as const;

interface StructureArgs {
  citations: Citation[];
  suggested_actions: RawAction[];
  proposals?: RawProposal[];
  title_suggestion?: string;
}

/* ───────────────────────── handler ────────────────────────────────────── */

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') return new Response(null, { status: 204, headers: corsHeaders });
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

  const auth = await authorise(req);
  if (!auth.ok) {
    return new Response(JSON.stringify({ error: auth.error }), {
      status: 401,
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
  if (!body.message?.trim()) {
    return new Response(JSON.stringify({ error: 'message_required' }), {
      status: 400,
      headers: { ...corsHeaders, 'content-type': 'application/json' },
    });
  }
  if (body.persona !== 'apprentice' && body.persona !== 'tutor') {
    return new Response(JSON.stringify({ error: 'invalid_persona' }), {
      status: 400,
      headers: { ...corsHeaders, 'content-type': 'application/json' },
    });
  }

  const sb = createClient(SUPABASE_URL, SERVICE_KEY, {
    auth: { persistSession: false, autoRefreshToken: false },
  });

  let collegeStudentId: string | null = null;
  if (body.persona === 'apprentice') {
    const { data: cs } = await sb
      .from('college_students')
      .select('id')
      .eq('user_id', auth.uid)
      .maybeSingle();
    collegeStudentId = (cs as { id?: string } | null)?.id ?? null;
  } else {
    if (!body.subject_student_id) {
      return new Response(JSON.stringify({ error: 'subject_student_id_required' }), {
        status: 400,
        headers: { ...corsHeaders, 'content-type': 'application/json' },
      });
    }
    const ok = await checkTutorScope(sb, auth.uid, body.subject_student_id);
    if (!ok) {
      return new Response(JSON.stringify({ error: 'forbidden' }), {
        status: 403,
        headers: { ...corsHeaders, 'content-type': 'application/json' },
      });
    }
    collegeStudentId = body.subject_student_id;
  }

  if (!collegeStudentId) {
    return new Response(JSON.stringify({ error: 'no_learner_context' }), {
      status: 404,
      headers: { ...corsHeaders, 'content-type': 'application/json' },
    });
  }

  let convo: ConversationRow | null = null;
  if (body.conversation_id) {
    const { data } = await sb
      .from('notebook_conversations')
      .select('id, owner_uid, persona, subject_student_id, title')
      .eq('id', body.conversation_id)
      .eq('owner_uid', auth.uid)
      .maybeSingle();
    convo = (data as ConversationRow | null) ?? null;
    if (!convo) {
      return new Response(JSON.stringify({ error: 'conversation_not_found' }), {
        status: 404,
        headers: { ...corsHeaders, 'content-type': 'application/json' },
      });
    }
    if (convo.persona !== body.persona) {
      return new Response(JSON.stringify({ error: 'persona_mismatch' }), {
        status: 400,
        headers: { ...corsHeaders, 'content-type': 'application/json' },
      });
    }
  } else {
    const { data: created, error: cErr } = await sb
      .from('notebook_conversations')
      .insert({
        owner_uid: auth.uid,
        persona: body.persona,
        subject_student_id: body.persona === 'tutor' ? collegeStudentId : null,
      })
      .select('id, owner_uid, persona, subject_student_id, title')
      .single();
    if (cErr || !created) {
      return new Response(
        JSON.stringify({ error: 'create_failed', detail: cErr?.message ?? 'unknown' }),
        {
          status: 500,
          headers: { ...corsHeaders, 'content-type': 'application/json' },
        }
      );
    }
    convo = created as ConversationRow;
  }

  await sb.from('notebook_messages').insert({
    conversation_id: convo.id,
    role: 'user',
    content: body.message.trim(),
  });

  const { data: historyRows } = await sb
    .from('notebook_messages')
    .select('role, content, created_at')
    .eq('conversation_id', convo.id)
    .order('created_at', { ascending: false })
    .limit(HISTORY_TURNS * 2 + 2);
  const history = ((historyRows ?? []) as MessageRow[]).reverse();
  const isFirstTurn = history.filter((m) => m.role === 'user').length <= 1;

  const ctx = await loadLearnerContext(sb, collegeStudentId);
  if (!ctx) {
    return new Response(JSON.stringify({ error: 'student_not_found' }), {
      status: 404,
      headers: { ...corsHeaders, 'content-type': 'application/json' },
    });
  }
  const seeds = bs7671SeedQueries(ctx);
  seeds.push(body.message.trim().slice(0, 300));
  // Add active ILP goal titles + headline focus as RAG seeds — these are
  // exactly what the learner is being asked to focus on right now.
  for (const g of ctx.ilp.goals.slice(0, 5)) {
    if (g.title) seeds.push(g.title.slice(0, 200));
  }
  if (ctx.ilp.headline_focus) seeds.push(ctx.ilp.headline_focus.slice(0, 200));

  // Load extra context not covered by learner-context: timetable (next 14
  // days), recent portfolio comments, recent tutor messages.
  const todayDate = new Date().toISOString().slice(0, 10);
  const fortnightDate = new Date(Date.now() + 14 * 86_400_000).toISOString().slice(0, 10);

  const [qualKit, raggedAcs, facets, lessonsRes, commentsRes, messagesRes] = await Promise.all([
    loadQualificationKit(sb, ctx.course?.code ?? null),
    // Bumped: 12 RAG'd ACs (was 8) + 4 broader matches.
    lookupQualificationAcs(sb, seeds, ctx.course?.code ?? null, 12, 4),
    // Bumped: 8 facets (was 4).
    lookupBs7671Facets(sb, seeds, 8),
    ctx.student.cohort_id
      ? sb
          .from('college_lesson_plans')
          .select('title, scheduled_date, scheduled_start_time, duration_minutes')
          .eq('cohort_id', ctx.student.cohort_id)
          .gte('scheduled_date', todayDate)
          .lte('scheduled_date', fortnightDate)
          .order('scheduled_date', { ascending: true })
          .limit(8)
      : Promise.resolve({ data: null }),
    ctx.student.user_id
      ? sb
          .from('portfolio_comments')
          .select('content, created_at, author_role, requires_action, is_resolved')
          .eq('user_id', ctx.student.user_id)
          .order('created_at', { ascending: false })
          .limit(5)
      : Promise.resolve({ data: null }),
    sb
      .from('student_message_threads')
      .select('id, last_message_at')
      .eq('student_id', collegeStudentId)
      .order('last_message_at', { ascending: false, nullsFirst: false })
      .limit(3)
      .then(async (tr) => {
        const ids = ((tr.data ?? []) as Array<{ id: string }>).map((t) => t.id);
        if (ids.length === 0) return { data: null };
        return sb
          .from('student_messages')
          .select('thread_id, sender_kind, body, created_at')
          .in('thread_id', ids)
          .order('created_at', { ascending: false })
          .limit(8);
      }),
  ]);

  const lessons =
    (
      lessonsRes as {
        data: Array<{
          title: string;
          scheduled_date: string;
          scheduled_start_time: string | null;
          duration_minutes: number | null;
        }> | null;
      }
    ).data ?? [];
  const comments =
    (
      commentsRes as {
        data: Array<{
          content: string;
          created_at: string;
          author_role: string | null;
          requires_action: boolean | null;
          is_resolved: boolean | null;
        }> | null;
      }
    ).data ?? [];
  const messages =
    (
      messagesRes as {
        data: Array<{
          sender_kind: string | null;
          body: string;
          created_at: string;
        }> | null;
      }
    ).data ?? [];

  const contextLines: string[] = [];
  contextLines.push(`# Persona: ${body.persona}`);
  contextLines.push(`# Learner ID (college_students.id): ${ctx.student.id}`);
  if (body.persona === 'tutor') {
    contextLines.push(
      `You are the staff member. The data below describes the LEARNER you are asking about.`
    );
  } else {
    contextLines.push(`You are this apprentice's AI mentor. The data below is THEIR record.`);
  }
  contextLines.push('');
  for (const l of contextSummaryLines(ctx)) contextLines.push(l);
  contextLines.push('');

  // Quiz attempts with quiz_ids — required so the AI can recommend quizzes
  // by target_id without inventing UUIDs.
  if (ctx.quizzes.attempts.length > 0) {
    contextLines.push('## Recent quiz attempts (use these quiz_ids for open_quiz actions)');
    for (const a of ctx.quizzes.attempts.slice(0, 8)) {
      const score =
        a.percentage != null
          ? `${a.percentage.toFixed(0)}%`
          : a.score != null && a.total_points != null
            ? `${a.score}/${a.total_points}`
            : 'no score';
      contextLines.push(
        `- "${a.title}" (quiz_id=${a.quiz_id}) — ${score}${a.passed === false ? ' · failed' : a.passed ? ' · passed' : ''}${a.completed_at ? ` · ${a.completed_at.slice(0, 10)}` : ''}`
      );
    }
    if (ctx.quizzes.weak_categories.length > 0) {
      contextLines.push(`Weak categories: ${ctx.quizzes.weak_categories.join(', ')}`);
    }
    if (ctx.quizzes.sent_not_started > 0) {
      contextLines.push(`Assigned but not started: ${ctx.quizzes.sent_not_started}`);
    }
    contextLines.push('');
  }

  // ILP goals (active) — drives "what should I focus on" answers.
  if (ctx.ilp.goals.length > 0) {
    contextLines.push('## Active ILP goals (set by tutor)');
    for (const g of ctx.ilp.goals.slice(0, 8)) {
      contextLines.push(
        `- ${g.title}${g.priority ? ` · ${g.priority}` : ''}${g.target_date ? ` · due ${g.target_date}` : ''}${g.status ? ` · ${g.status}` : ''}${g.blocked_reason ? ` · BLOCKED: ${g.blocked_reason}` : ''}`
      );
    }
    contextLines.push('');
  }

  // Timetable lookahead — 2 weeks of cohort lessons.
  if (lessons.length > 0) {
    contextLines.push('## Upcoming lessons (next 14 days)');
    for (const l of lessons) {
      contextLines.push(
        `- ${l.scheduled_date}${l.scheduled_start_time ? ` ${l.scheduled_start_time.slice(0, 5)}` : ''}${l.duration_minutes ? ` · ${l.duration_minutes}m` : ''} — ${l.title}`
      );
    }
    contextLines.push('');
  }

  // Recent portfolio comments — what the tutor's been asking for.
  if (comments.length > 0) {
    contextLines.push('## Recent portfolio comments from tutor');
    for (const c of comments) {
      const flag = c.requires_action && !c.is_resolved ? ' [ACTION REQUIRED]' : '';
      contextLines.push(
        `- ${c.created_at.slice(0, 10)} (${c.author_role ?? 'tutor'})${flag}: ${c.content.slice(0, 200)}`
      );
    }
    contextLines.push('');
  }

  // Recent tutor messages — keeps the AI in sync with the conversation.
  if (messages.length > 0) {
    contextLines.push('## Recent tutor messages');
    for (const m of messages.slice(0, 5)) {
      contextLines.push(
        `- ${m.created_at.slice(0, 10)} (${m.sender_kind ?? 'tutor'}): ${m.body.slice(0, 200)}`
      );
    }
    contextLines.push('');
  }

  if (raggedAcs.length > 0) {
    for (const l of raggedAcLines(raggedAcs, 24)) contextLines.push(l);
  } else if (qualKit.acs.length > 0) {
    for (const l of qualificationAcLines(qualKit, 40)) contextLines.push(l);
  }
  contextLines.push('');
  if (facets.length > 0) {
    for (const l of bs7671FacetLines(facets, 12)) contextLines.push(l);
  }
  const contextBlock = contextLines.join('\n');

  /* ──────────────────── streaming response ──────────────────── */

  const stream = new ReadableStream({
    async start(controller) {
      const ping = setInterval(() => {
        try {
          controller.enqueue(sseComment('keepalive'));
        } catch {
          /* closed */
        }
      }, 15_000);

      const ac = new AbortController();
      const timeoutId = setTimeout(() => ac.abort(), STREAM_TIMEOUT_MS);

      try {
        controller.enqueue(
          sseEvent('open', {
            conversation_id: convo!.id,
            persona: convo!.persona,
            subject_student_id: convo!.subject_student_id,
            student_name: ctx.student.name,
            qualification: qualKit.qualification_code,
            ragged_acs_loaded: raggedAcs.length,
            bs7671_facets_loaded: facets.length,
          })
        );

        const proseSystem = body.persona === 'apprentice' ? APPRENTICE_PROSE : TUTOR_PROSE;

        const baseMessages: Array<{ role: string; content: string }> = [
          { role: 'system', content: contextBlock },
          ...history
            .slice(-HISTORY_TURNS)
            .filter((m) => m.role === 'user' || m.role === 'assistant')
            .map((m) => ({ role: m.role, content: m.content })),
        ];

        const proseMessages = [{ role: 'system', content: proseSystem }, ...baseMessages];
        const structureMessages = [
          { role: 'system', content: STRUCTURE_PROMPT },
          ...baseMessages,
          {
            role: 'system',
            content: isFirstTurn
              ? 'This is the FIRST user message in this conversation — set title_suggestion.'
              : 'Not the first turn — leave title_suggestion empty.',
          },
        ];

        // Fire BOTH calls in parallel.
        const [proseRes, structureRes] = await Promise.all([
          fetch('https://api.openai.com/v1/chat/completions', {
            method: 'POST',
            signal: ac.signal,
            headers: {
              authorization: `Bearer ${OPENAI_KEY}`,
              'content-type': 'application/json',
            },
            body: JSON.stringify({
              model: CHAT_MODEL,
              messages: proseMessages,
              max_completion_tokens: PROSE_MAX_TOKENS,
              stream: true,
            }),
          }),
          fetch('https://api.openai.com/v1/chat/completions', {
            method: 'POST',
            signal: ac.signal,
            headers: {
              authorization: `Bearer ${OPENAI_KEY}`,
              'content-type': 'application/json',
            },
            body: JSON.stringify({
              model: CHAT_MODEL,
              messages: structureMessages,
              tools: [STRUCTURE_TOOL],
              tool_choice: { type: 'function', function: { name: 'submit_structure' } },
              max_completion_tokens: STRUCTURE_MAX_TOKENS,
            }),
          }),
        ]);

        if (!proseRes.ok || !proseRes.body) {
          const text = await proseRes.text().catch(() => '');
          controller.enqueue(
            sseEvent('error', {
              error: `openai_prose_${proseRes.status}`,
              detail: text.slice(0, 240),
            })
          );
          return;
        }

        // Stream prose tokens as they arrive.
        const reader = proseRes.body.getReader();
        const decoder = new TextDecoder();
        let proseBuffer = '';
        let proseAnswer = '';

        while (true) {
          const { value, done } = await reader.read();
          if (done) break;
          proseBuffer += decoder.decode(value, { stream: true });
          const lines = proseBuffer.split('\n');
          proseBuffer = lines.pop() ?? '';
          for (const line of lines) {
            if (!line.startsWith('data:')) continue;
            const payload = line.slice(5).trim();
            if (payload === '[DONE]') continue;
            if (!payload) continue;
            try {
              const json = JSON.parse(payload) as {
                choices?: Array<{ delta?: { content?: string } }>;
              };
              const chunk = json.choices?.[0]?.delta?.content;
              if (chunk) {
                proseAnswer += chunk;
                controller.enqueue(sseEvent('delta', { text: chunk }));
              }
            } catch {
              /* ignore parse hiccups */
            }
          }
        }

        // Now collect the structure call (almost certainly already finished).
        let structure: StructureArgs = {
          citations: [],
          suggested_actions: [],
        };
        if (structureRes.ok) {
          try {
            const sJson = (await structureRes.json()) as {
              choices: Array<{
                message: {
                  tool_calls?: Array<{ function: { arguments: string } }>;
                };
              }>;
            };
            const sArgs = sJson.choices?.[0]?.message?.tool_calls?.[0]?.function?.arguments;
            if (sArgs) {
              structure = JSON.parse(sArgs) as StructureArgs;
            }
          } catch {
            /* keep defaults */
          }
        }

        // RETRY ON EMPTY — if the model returned nothing (rare but happens
        // on terse single-word inputs), re-ask with a more directive system
        // prompt and emit those tokens as one batch instead of erroring.
        if (!proseAnswer.trim()) {
          try {
            const retryRes = await fetch('https://api.openai.com/v1/chat/completions', {
              method: 'POST',
              signal: ac.signal,
              headers: {
                authorization: `Bearer ${OPENAI_KEY}`,
                'content-type': 'application/json',
              },
              body: JSON.stringify({
                model: CHAT_MODEL,
                messages: [
                  {
                    role: 'system',
                    content:
                      proseSystem +
                      '\n\nIMPORTANT: the previous attempt returned an empty response. The user IS asking a meaningful question — interpret it charitably and produce a substantive answer of 2-4 short paragraphs grounded in the supplied data. Never reply blank.',
                  },
                  ...baseMessages,
                ],
                max_completion_tokens: PROSE_RETRY_MAX_TOKENS,
              }),
            });
            if (retryRes.ok) {
              const rJson = (await retryRes.json()) as {
                choices?: Array<{ message?: { content?: string } }>;
              };
              const retryText = rJson.choices?.[0]?.message?.content?.trim() ?? '';
              if (retryText) {
                proseAnswer = retryText;
                controller.enqueue(sseEvent('delta', { text: retryText }));
              }
            }
          } catch {
            /* swallow — final fallback below */
          }
        }

        // Final fallback — never silent. Friendly nudge if we truly have
        // nothing. The user's question is preserved; they can retry.
        if (!proseAnswer.trim()) {
          proseAnswer =
            "I didn't quite catch that. Could you give me a bit more detail — for example which AC, quiz, or topic you'd like to dig into?";
          controller.enqueue(sseEvent('delta', { text: proseAnswer }));
        }

        // Resolve action hrefs server-side from kind + target_id. The model
        // never invents URLs — anything malformed gets dropped.
        const resolvedActions: SuggestedAction[] = [];
        for (const raw of structure.suggested_actions ?? []) {
          if (!raw?.kind || !raw?.label) continue;
          const href = resolveActionHref(raw, body.persona, collegeStudentId);
          if (!href) continue;
          resolvedActions.push({
            label: raw.label.slice(0, 80),
            kind: raw.kind,
            href,
          });
          if (resolvedActions.length >= 3) break;
        }

        // Resolve proposals — apprentice persona only. Server validates +
        // normalises shape so the apprentice's confirm sheet is always given
        // a clean draft to render.
        const resolvedProposals: Proposal[] = [];
        if (body.persona === 'apprentice') {
          for (const raw of structure.proposals ?? []) {
            const p = resolveProposal(raw);
            if (!p) continue;
            resolvedProposals.push(p);
            if (resolvedProposals.length >= 1) break;
          }
        }

        // Persist assistant message.
        const { data: asstRow } = await sb
          .from('notebook_messages')
          .insert({
            conversation_id: convo!.id,
            role: 'assistant',
            content: proseAnswer,
            citations: structure.citations ?? null,
            suggested_actions: resolvedActions,
            proposals: resolvedProposals.length > 0 ? resolvedProposals : null,
          })
          .select('id, created_at')
          .single();

        if (isFirstTurn && structure.title_suggestion && !convo!.title) {
          await sb
            .from('notebook_conversations')
            .update({ title: structure.title_suggestion.slice(0, 80) })
            .eq('id', convo!.id);
        }

        controller.enqueue(
          sseEvent('done', {
            conversation_id: convo!.id,
            assistant_message_id: (asstRow as { id?: string } | null)?.id ?? null,
            answer: proseAnswer,
            citations: structure.citations ?? [],
            suggested_actions: resolvedActions,
            proposals: resolvedProposals,
            title: structure.title_suggestion ?? null,
          })
        );
      } catch (e) {
        const msg = (e as Error).message ?? 'unknown';
        try {
          controller.enqueue(sseEvent('error', { error: 'stream_failed', detail: msg }));
        } catch {
          /* closed */
        }
      } finally {
        clearInterval(ping);
        clearTimeout(timeoutId);
        try {
          controller.close();
        } catch {
          /* already closed */
        }
      }
    },
  });

  return new Response(stream, {
    headers: {
      ...corsHeaders,
      'content-type': 'text/event-stream',
      'cache-control': 'no-cache, no-transform',
      connection: 'keep-alive',
      // Tells nginx / Cloudflare not to buffer the response — first
      // tokens reach the client without waiting for a buffer to fill.
      'x-accel-buffering': 'no',
    },
  });
});
