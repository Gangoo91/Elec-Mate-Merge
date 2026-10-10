// ELE-2051 — progress review: an AI draft of the summary and SMART targets for
// the next 3 months, from the tutor's notes or a dictated voice memo plus what
// the review record already holds.
//
// Everything runs as the calling tutor (their JWT; RLS decides what they can
// read and whether they can write the draft). The output is held in
// college_review_ai_drafts as a DRAFT: nothing is written into the review until
// the tutor reads it, ticks that they checked it and chooses to use it
// (ReviewWorkspaceSheet). Same provenance rule as ELE-1926.
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
const MAX_TOKENS = 3_000;

const json = (body: unknown, status = 200) =>
  new Response(JSON.stringify(body), {
    status,
    headers: { ...corsHeaders, 'content-type': 'application/json' },
  });

type Owner = 'apprentice' | 'employer' | 'college';
interface Target {
  action: string;
  owner: Owner;
  due_date: string;
  measure: string;
  unit_code: string | null;
}

const SYSTEM_PROMPT = `You help a UK further education tutor write up a tripartite apprenticeship progress review (apprentice, employer, training provider) for an electrical apprenticeship.

You are given the tutor's own notes (typed or dictated) and facts from the review record. Write two things:

1. "summary": the summary of the discussion that the apprentice and employer both receive. 80 to 180 words, plain British English, third person about the apprentice by first name, past tense for what was discussed. Say where they are against their off-the-job training and their qualification, what went well, what needs work, and what was agreed. No headings, no bullet points, no em dashes.

2. "targets": 3 to 5 SMART targets for the next 3 months. Each target is one action a named party will do (apprentice, employer or college), specific to what the notes and record say, measurable (say how everyone will know it is done in "measure"), achievable in the time, relevant to the apprenticeship, and with a due date between the earliest and latest dates given. Prefer targets that close open criteria or recover off-the-job hours when the record shows a gap. Only use a unit_code from the OPEN UNITS list, or null.

Hard rules:
- Use only facts in the NOTES and RECORD. Never invent a job, a date, a mark, a regulation number or anything the apprentice said.
- If the notes are thin, keep the summary short and say less, rather than filling it in.
- Leave out wellbeing, safeguarding and health details entirely: they are college-only. Leave out learning support unless the record says the apprentice agreed the employer can know.
- Do not quote regulations or funding rules.
- This is a draft the tutor will check and edit. Do not write as if it has been signed.`;

const SCHEMA = {
  type: 'object',
  additionalProperties: false,
  required: ['summary', 'targets'],
  properties: {
    summary: { type: 'string' },
    targets: {
      type: 'array',
      items: {
        type: 'object',
        additionalProperties: false,
        required: ['action', 'owner', 'due_date', 'measure', 'unit_code'],
        properties: {
          action: { type: 'string' },
          owner: { type: 'string', enum: ['apprentice', 'employer', 'college'] },
          due_date: { type: 'string' },
          measure: { type: 'string' },
          unit_code: { type: ['string', 'null'] },
        },
      },
    },
  },
};

const iso = (d: Date) => d.toISOString().slice(0, 10);
const addDays = (s: string, n: number) => {
  const d = new Date(`${s}T12:00:00Z`);
  d.setUTCDate(d.getUTCDate() + n);
  return iso(d);
};
const noDash = (s: string) => s.replace(/\s*[—–]\s*/g, ', ').replace(/ ,/g, ',');

Deno.serve(async (req: Request) => {
  if (req.method === 'OPTIONS') return new Response('ok', { headers: corsHeaders });
  if (req.method !== 'POST') return json({ error: 'method_not_allowed' }, 405);

  try {
    const apiKey = Deno.env.get('OPENAI_API_KEY');
    if (!apiKey) throw new Error('OPENAI_API_KEY missing');
    const authHeader = req.headers.get('authorization');
    if (!authHeader) return json({ error: 'unauthorized' }, 401);

    const body = (await req.json().catch(() => ({}))) as {
      review_id?: string;
      notes?: string;
      input_source?: 'notes' | 'voice' | 'notes_and_voice';
    };
    if (!body.review_id) return json({ error: 'review_id required' }, 400);
    const notes = (body.notes ?? '').trim().slice(0, 6000);
    const inputSource = notes
      ? body.input_source === 'voice' || body.input_source === 'notes_and_voice'
        ? body.input_source
        : 'notes'
      : 'record_only';

    const db = createClient(Deno.env.get('SUPABASE_URL')!, Deno.env.get('SUPABASE_ANON_KEY')!, {
      global: { headers: { Authorization: authHeader } },
      auth: { persistSession: false },
    });
    const { data: userRes } = await db.auth.getUser();
    if (!userRes?.user) return json({ error: 'unauthorized' }, 401);

    // RLS: only staff at the review's college can read it.
    const { data: review, error: rErr } = await db
      .from('college_tripartite_reviews')
      .select(
        'id, college_id, student_id, scheduled_at, held_on, mode, locked_at, outcomes, employer_input, learner_input, employer_attendance'
      )
      .eq('id', body.review_id)
      .maybeSingle();
    if (rErr) throw rErr;
    if (!review) return json({ error: 'Review not found' }, 404);
    const r = review as {
      id: string;
      college_id: string;
      student_id: string;
      scheduled_at: string | null;
      held_on: string | null;
      locked_at: string | null;
      outcomes: Record<string, unknown> | null;
      employer_input: Record<string, unknown> | null;
      learner_input: Record<string, unknown> | null;
      employer_attendance: string | null;
    };
    if (r.locked_at) return json({ error: 'This review is signed off' }, 409);

    const [{ data: prefill }, { data: actions }, { data: student }] = await Promise.all([
      db.rpc('get_tripartite_prefill' as never, { p_review: r.id } as never),
      db
        .from('college_review_actions')
        .select('action, owner_party, due_date')
        .eq('review_id', r.id)
        .order('position'),
      db.from('college_students').select('name, user_id').eq('id', r.student_id).maybeSingle(),
    ]);
    const p = (prefill ?? {}) as Record<string, any>;
    const st = (student ?? {}) as { name?: string; user_id?: string | null };
    const first = (st.name ?? p.learner?.name ?? 'The apprentice').split(' ')[0];

    // Open units: where the criteria are not yet passed (the learner's real units only).
    let openUnits: Array<{ unit_code: string; unit_title: string; open: number }> = [];
    if (st.user_id) {
      const { data: acs } = await db.rpc(
        'get_portfolio_ac_state' as never,
        { p_user_id: st.user_id } as never
      );
      const m = new Map<string, { unit_code: string; unit_title: string; open: number }>();
      for (const a of (acs ?? []) as Array<{
        unit_code: string;
        unit_title: string;
        state: string;
      }>) {
        if (a.state === 'passed' || a.state === 'iqa_confirmed') continue;
        const e = m.get(a.unit_code) ?? {
          unit_code: a.unit_code,
          unit_title: a.unit_title,
          open: 0,
        };
        e.open += 1;
        m.set(a.unit_code, e);
      }
      openUnits = [...m.values()].sort((a, b) => b.open - a.open).slice(0, 12);
    }

    const o = (r.outcomes ?? {}) as Record<string, any>;
    const reviewDate = (r.held_on ??
      (r.scheduled_at ?? new Date().toISOString()).slice(0, 10)) as string;
    const earliest = addDays(reviewDate, 7);
    const latest = addDays(reviewDate, 92);

    // What the model sees: facts only, college-only notes left out.
    const record = {
      apprentice_first_name: first,
      course: p.learner?.course ?? null,
      employer: p.learner?.employer ?? null,
      review_date: reviewDate,
      off_the_job: p.otj
        ? {
            counted_hours: p.otj.counted_hours,
            required_hours: p.otj.required_hours,
            planned_to_date_hours: p.otj.planned_to_date_hours,
            behind_plan_hours: p.otj.slippage_hours,
            weekly_needed_hours: p.otj.weekly_needed_hours,
          }
        : null,
      criteria: p.learner?.criteria ?? null,
      attendance_since_last: p.attendance_since ?? null,
      evidence_since_last: p.evidence_since ?? null,
      earlier_actions: (p.open_actions ?? []).map((a: any) => ({
        action: a.action,
        owner: a.owner_party,
        status: a.status,
        note: a.outcome_note,
      })),
      tutor_notes_in_record: {
        progress: o.progress_notes ?? null,
        training: o.training_notes ?? null,
        evidence: o.evidence_notes ?? null,
        off_the_job: o.otj_review ?? null,
        plan_change: o.plan_change ?? null,
        plan_updates: o.ilp_updates ?? null,
        concerns: o.concerns ?? null,
        learning_support:
          o.learning_support?.employer_consent && o.learning_support?.note
            ? o.learning_support.note
            : null,
      },
      employer_view: r.employer_input ?? null,
      apprentice_view: r.learner_input ?? null,
      actions_already_agreed: ((actions ?? []) as any[]).map((a) => ({
        action: a.action,
        owner: a.owner_party,
        due: a.due_date,
      })),
    };
    const user = `NOTES (the tutor's own words${inputSource === 'voice' ? ', dictated' : ''}):
${notes || '(none: use the record only)'}

RECORD:
${JSON.stringify(record, null, 1)}

OPEN UNITS (unit_code: title, criteria not yet passed):
${openUnits.map((u) => `${u.unit_code}: ${u.unit_title} (${u.open})`).join('\n') || '(none recorded)'}

Earliest due date: ${earliest}. Latest due date: ${latest}.`;

    const oa = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: { Authorization: `Bearer ${apiKey}`, 'content-type': 'application/json' },
      body: JSON.stringify({
        model: CHAT_MODEL,
        messages: [
          { role: 'system', content: SYSTEM_PROMPT },
          { role: 'user', content: user },
        ],
        max_completion_tokens: MAX_TOKENS,
        tools: [
          {
            type: 'function',
            function: {
              name: 'submit_review_draft',
              description: 'Return the draft summary and SMART targets for the tutor to check.',
              strict: true,
              parameters: SCHEMA,
            },
          },
        ],
        tool_choice: { type: 'function', function: { name: 'submit_review_draft' } },
      }),
    });
    if (!oa.ok) throw new Error(`OpenAI ${oa.status}: ${(await oa.text()).slice(0, 300)}`);
    const out = await oa.json();
    const args = out?.choices?.[0]?.message?.tool_calls?.[0]?.function?.arguments;
    const parsed = JSON.parse(args ?? '{}') as { summary?: string; targets?: Target[] };

    // Check what came back: owners, dates in the window, real unit codes.
    const unitSet = new Set(openUnits.map((u) => u.unit_code));
    const targets: Target[] = (parsed.targets ?? [])
      .filter((t) => t && typeof t.action === 'string' && t.action.trim().length >= 8)
      .slice(0, 5)
      .map((t) => {
        const d = /^\d{4}-\d{2}-\d{2}$/.test(t.due_date ?? '') ? t.due_date : latest;
        return {
          action: noDash(t.action.trim()).slice(0, 300),
          owner: (['apprentice', 'employer', 'college'] as Owner[]).includes(t.owner)
            ? t.owner
            : 'apprentice',
          due_date: d < earliest ? earliest : d > latest ? latest : d,
          measure: noDash((t.measure ?? '').trim()).slice(0, 300),
          unit_code: t.unit_code && unitSet.has(t.unit_code) ? t.unit_code : null,
        };
      });
    const summary = noDash((parsed.summary ?? '').trim()).slice(0, 2000);
    if (summary.length < 20 || targets.length === 0) {
      return json({ error: 'The draft came back empty. Add a few notes and try again.' }, 422);
    }

    const { data: saved, error: sErr } = await db
      .from('college_review_ai_drafts')
      .insert({
        review_id: r.id,
        college_id: r.college_id,
        student_id: r.student_id,
        created_by: userRes.user.id,
        input_source: inputSource,
        input_notes: notes || null,
        model: CHAT_MODEL,
        summary,
        targets,
        grounding: { review_date: reviewDate, window: [earliest, latest], open_units: openUnits },
      } as never)
      .select('id, created_at, model, summary, targets, input_source')
      .single();
    if (sErr) throw sErr;

    return json({ source: 'ai_draft', draft: saved });
  } catch (e) {
    await captureException(e, {
      functionName: 'review-ai-draft',
      requestUrl: req.url,
      requestMethod: req.method,
    });
    return json({ error: (e as Error).message ?? 'Could not draft' }, 500);
  }
});
