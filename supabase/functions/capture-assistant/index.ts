// capture-assistant — the on-site capture assistant (ELE-1927).
//
// Called by the capture sheet once the photos have been read. Returns four
// things, every one a SUGGESTION the learner accepts or ignores:
//
//   1. criteria     criteria this capture could show, only from the learner's
//                   real qualification (open gaps + what the photo reader
//                   matched). Saved as source 'ai_suggested', never a claim.
//   2. reflection   a reflective account drafted in the learner's own words
//                   (their transcript, their register), first person. A draft
//                   with one tap to use; the learner owns what is saved.
//   3. testSheet    when a photo shows a consumer unit or distribution board
//                   and no test sheet is attached, ask for it.
//   4. nextJob      the one real job that would close the most open criteria,
//                   e.g. "a ring final test on your next rewire covers 6".
//
// Regulation facts come from the BS 7671 RAG (match_bs7671_hybrid). Its
// is_a4_change flag is unreliable, so it is never read or returned.
//
// No writes. verify_jwt on; the caller's own JWT decides whose gaps are read.

import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.57.4';
import { captureException } from '../_shared/sentry.ts';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
  'Access-Control-Allow-Headers':
    'authorization, x-client-info, x-request-id, x-supabase-timeout, x-supabase-api-version, apikey, content-type',
};

const CHAT_MODEL = 'gpt-5.4-mini-2026-03-17';
const MAX_COMPLETION_TOKENS = 4_000;
const EMBED_MODEL = 'text-embedding-3-large';
const EMBED_DIMS = 3072;
const MAX_GAPS = 60;

/** States that already count as evidence; everything else is an open gap. */
const COVERED = new Set(['claimed', 'submitted', 'passed', 'iqa_confirmed']);

const BOARD_RE =
  /\b(consumer unit|distribution board|fuse ?board|fuse box|db\b|cu\b|rcbo|mcb|rcd|main switch|busbar)/i;

interface FileIn {
  type?: string;
  evidenceType?: string;
  description?: string;
  elements?: string[];
  workType?: string;
}

interface Body {
  transcript?: string;
  title?: string;
  description?: string;
  files?: FileIn[];
  /** Criteria the photo reader already matched, "unit|ac". */
  matched?: Array<{ unit_code: string; ac_code: string }>;
  hasTestSheet?: boolean;
}

interface Gap {
  unit_code: string;
  ac_code: string;
  ac_text: string;
  unit_title: string | null;
  state: string;
}

interface ToolArgs {
  criteria: Array<{ unit_code: string; ac_code: string; reason: string }>;
  reflection: string;
  board_in_photo: boolean;
  test_sheet_ask: string;
  next_job: {
    title: string;
    why: string;
    covers: Array<{ unit_code: string; ac_code: string }>;
  } | null;
}

const json = (b: unknown, status = 200) =>
  new Response(JSON.stringify(b), {
    status,
    headers: { ...corsHeaders, 'content-type': 'application/json' },
  });

const TOOL = {
  type: 'function',
  function: {
    name: 'submit_capture_assist',
    description: 'Return the suggestions for this capture. Call exactly once.',
    parameters: {
      type: 'object',
      additionalProperties: false,
      required: ['criteria', 'reflection', 'board_in_photo', 'test_sheet_ask', 'next_job'],
      properties: {
        criteria: {
          type: 'array',
          maxItems: 8,
          description:
            'Criteria this capture could genuinely show. Copy unit_code and ac_code EXACTLY from the CRITERIA block. Empty if nothing fits.',
          items: {
            type: 'object',
            additionalProperties: false,
            required: ['unit_code', 'ac_code', 'reason'],
            properties: {
              unit_code: { type: 'string' },
              ac_code: { type: 'string' },
              reason: {
                type: 'string',
                description: 'One short sentence: what in the capture shows it.',
              },
            },
          },
        },
        reflection: {
          type: 'string',
          description:
            "A reflective account in the learner's own words: first person, their vocabulary and sentence length, 80 to 160 words. Situation, what they did, what they checked or measured, what they learned. Only facts from their notes or the photos. Empty string when there is nothing to go on.",
        },
        board_in_photo: {
          type: 'boolean',
          description: 'True when a photo shows a consumer unit or distribution board.',
        },
        test_sheet_ask: {
          type: 'string',
          description:
            'When a board is shown and no test sheet is attached: one short sentence asking for the schedule of test results and saying why an assessor wants it. Otherwise empty.',
        },
        next_job: {
          type: ['object', 'null'],
          description:
            'The ONE real job at work that would close the most OPEN gaps. Null when there are fewer than two open gaps.',
          additionalProperties: false,
          required: ['title', 'why', 'covers'],
          properties: {
            title: {
              type: 'string',
              description:
                'A real job, phrased as advice, e.g. "A ring final test on your next rewire".',
            },
            why: {
              type: 'string',
              description: 'One sentence: what to do and capture so it counts.',
            },
            covers: {
              type: 'array',
              minItems: 2,
              maxItems: 10,
              items: {
                type: 'object',
                additionalProperties: false,
                required: ['unit_code', 'ac_code'],
                properties: { unit_code: { type: 'string' }, ac_code: { type: 'string' } },
              },
            },
          },
        },
      },
    },
  },
};

const SYSTEM = `You help a UK electrical apprentice capture portfolio evidence on site. British English. No emojis. No em dashes.

You never claim anything for the learner. Everything you return is a suggestion the learner accepts or ignores, and their assessor decides.

Rules:
1. Criteria: cite ONLY codes that appear in the CRITERIA block, copied exactly. Suggest a criterion only when the capture actually shows it. Fewer, accurate suggestions beat many weak ones.
2. Reflection: write it as the learner would, from their own notes. Keep their words and plain register; do not upgrade their vocabulary or add jargon they did not use. First person, past tense. Never invent readings, values, sites or people that are not in the notes or photos. If the notes are empty, return an empty string.
3. Test sheet: if a photo shows a consumer unit or distribution board and HAS_TEST_SHEET is false, ask for the schedule of test results in one plain sentence.
4. Next job: choose from OPEN GAPS only. Name one real, ordinary job an apprentice is likely to be on (a rewire, a CU change, a ring final test, a cooker circuit, an EICR) that covers the most open gaps at once. Covers lists only codes from OPEN GAPS.
5. Regulation facts: use only the REGULATIONS block. Do not mention amendment numbers or say a regulation is new or changed.
6. Call submit_capture_assist exactly once.`;

async function embed(text: string, key: string): Promise<number[] | null> {
  try {
    const r = await fetch('https://api.openai.com/v1/embeddings', {
      method: 'POST',
      headers: { Authorization: `Bearer ${key}`, 'content-type': 'application/json' },
      body: JSON.stringify({
        model: EMBED_MODEL,
        input: text.slice(0, 6000),
        dimensions: EMBED_DIMS,
      }),
    });
    if (!r.ok) return null;
    const b = await r.json();
    return b.data?.[0]?.embedding ?? null;
  } catch {
    return null;
  }
}

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') return new Response('ok', { headers: corsHeaders });
  if (req.method !== 'POST') return json({ error: 'method_not_allowed' }, 405);

  const SUPABASE_URL = Deno.env.get('SUPABASE_URL');
  const SERVICE_KEY = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY');
  const ANON_KEY = Deno.env.get('SUPABASE_ANON_KEY');
  const OPENAI_KEY = Deno.env.get('OPENAI_API_KEY');
  if (!SUPABASE_URL || !SERVICE_KEY || !ANON_KEY || !OPENAI_KEY)
    return json({ error: 'server_misconfigured' }, 500);

  const auth = req.headers.get('authorization');
  if (!auth) return json({ error: 'unauthorized' }, 401);
  const userClient = createClient(SUPABASE_URL, ANON_KEY, {
    global: { headers: { Authorization: auth } },
    auth: { persistSession: false },
  });
  const { data: userData } = await userClient.auth.getUser();
  const uid = userData?.user?.id;
  if (!uid) return json({ error: 'unauthorized' }, 401);

  let body: Body;
  try {
    body = (await req.json()) as Body;
  } catch {
    return json({ error: 'invalid_json' }, 400);
  }

  const files = (body.files ?? []).slice(0, 10);
  const transcript = (body.transcript ?? '').slice(0, 4000).trim();
  const notes = [body.title, body.description].filter(Boolean).join('\n').slice(0, 2000);
  const hasTestSheet = body.hasTestSheet === true;

  try {
    // 1. The learner's criteria, as the learner (RLS and the state function decide).
    const { data: stateRows, error: stErr } = await userClient.rpc('get_portfolio_ac_state', {
      p_user_id: uid,
    });
    if (stErr) throw new Error(`state: ${stErr.message}`);
    const all = ((stateRows ?? []) as Gap[]).filter((r) => r.unit_code && r.ac_code);
    const byKey = new Map(all.map((r) => [`${r.unit_code}|${r.ac_code}`, r]));
    const open = all.filter((r) => !COVERED.has(r.state));
    const matchedKeys = new Set((body.matched ?? []).map((m) => `${m.unit_code}|${m.ac_code}`));
    // Candidates the model may cite: matched by the photo reader first, then open gaps.
    const candidates = [
      ...all.filter((r) => matchedKeys.has(`${r.unit_code}|${r.ac_code}`)),
      ...open.filter((r) => !matchedKeys.has(`${r.unit_code}|${r.ac_code}`)),
    ].slice(0, MAX_GAPS);

    // 2. Regulation facts from the RAG. is_a4_change is deliberately ignored.
    const elements = files.flatMap((f) => f.elements ?? []);
    const ragQuery = [
      transcript,
      notes,
      ...files.map((f) => `${f.workType ?? ''} ${f.description ?? ''}`),
      elements.join(', '),
    ]
      .join(' ')
      .trim();
    const sb = createClient(SUPABASE_URL, SERVICE_KEY, { auth: { persistSession: false } });
    let regs: Array<{ reg: string; title: string; text: string }> = [];
    if (ragQuery.length > 12) {
      const vec = await embed(ragQuery, OPENAI_KEY);
      if (vec) {
        const { data: facets } = await sb.rpc('match_bs7671_hybrid', {
          q_text: ragQuery.slice(0, 2000),
          q_embedding: '[' + vec.map((v) => v.toFixed(7)).join(',') + ']',
          doc_type: 'bs7671',
          max_results: 6,
        });
        const seen = new Set<string>();
        regs = (
          (facets ?? []) as Array<{
            reg_number: string | null;
            reg_title: string | null;
            content: string | null;
          }>
        )
          .filter((f) => f.reg_number && !seen.has(f.reg_number) && seen.add(f.reg_number))
          .map((f) => ({
            reg: f.reg_number!,
            title: f.reg_title ?? '',
            text: (f.content ?? '').slice(0, 400),
          }));
      }
    }

    // Deterministic board check: never rely on the model alone to ask for the test sheet.
    const boardSeen = files.some((f) =>
      BOARD_RE.test([f.description, f.workType, ...(f.elements ?? [])].join(' '))
    );

    const user = [
      `HAS_TEST_SHEET: ${hasTestSheet}`,
      `LEARNER NOTES (their words):\n${transcript || '(none)'}`,
      notes ? `TITLE / DESCRIPTION:\n${notes}` : '',
      `PHOTOS READ:\n${
        files.length
          ? files
              .map(
                (f, i) =>
                  `${i + 1}. ${f.evidenceType ?? f.type ?? 'file'}: ${f.description ?? ''} [${(f.elements ?? []).join(', ')}] ${f.workType ?? ''}`
              )
              .join('\n')
          : '(no files)'
      }`,
      `CRITERIA (unit · ac · text):\n${candidates.map((c) => `${c.unit_code} · ${c.ac_code} · ${c.ac_text}`).join('\n') || '(none)'}`,
      `OPEN GAPS (${open.length}):\n${
        open
          .slice(0, MAX_GAPS)
          .map((c) => `${c.unit_code} · ${c.ac_code} · ${c.ac_text}`)
          .join('\n') || '(none)'
      }`,
      `REGULATIONS:\n${regs.map((r) => `${r.reg} ${r.title}: ${r.text}`).join('\n') || '(none)'}`,
    ]
      .filter(Boolean)
      .join('\n\n');

    const completion = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: { authorization: `Bearer ${OPENAI_KEY}`, 'content-type': 'application/json' },
      body: JSON.stringify({
        model: CHAT_MODEL,
        messages: [
          { role: 'system', content: SYSTEM },
          { role: 'user', content: user },
        ],
        tools: [TOOL],
        tool_choice: { type: 'function', function: { name: 'submit_capture_assist' } },
        max_completion_tokens: MAX_COMPLETION_TOKENS,
      }),
    });
    if (!completion.ok) {
      return json(
        { error: `openai_${completion.status}`, detail: (await completion.text()).slice(0, 240) },
        502
      );
    }
    const out = (await completion.json()) as {
      choices: Array<{ message: { tool_calls?: Array<{ function: { arguments: string } }> } }>;
    };
    const raw = out.choices?.[0]?.message?.tool_calls?.[0]?.function?.arguments;
    if (!raw) return json({ error: 'no_tool_call' }, 502);
    const args = JSON.parse(raw) as ToolArgs;

    // Validate every code against the learner's real criteria. Invented codes are dropped.
    const real = (u: string, a: string) => byKey.get(`${u}|${a}`);
    const criteria = (args.criteria ?? [])
      .map((c) => ({ c, row: real(c.unit_code, c.ac_code) }))
      .filter((x): x is { c: ToolArgs['criteria'][number]; row: Gap } => !!x.row)
      .filter((x, i, arr) => arr.findIndex((y) => y.row === x.row) === i)
      .map(({ c, row }) => ({
        unit_code: row.unit_code,
        ac_code: row.ac_code,
        ac_text: row.ac_text,
        reason: (c.reason ?? '').slice(0, 220),
      }));

    let nextJob: null | {
      title: string;
      why: string;
      covers: Array<{ unit_code: string; ac_code: string; ac_text: string }>;
    } = null;
    if (args.next_job) {
      const covers = (args.next_job.covers ?? [])
        .map((c) => real(c.unit_code, c.ac_code))
        .filter((r): r is Gap => !!r && !COVERED.has(r.state))
        .filter((r, i, arr) => arr.indexOf(r) === i)
        .map((r) => ({ unit_code: r.unit_code, ac_code: r.ac_code, ac_text: r.ac_text }));
      if (covers.length >= 2) {
        nextJob = {
          title: (args.next_job.title ?? '').slice(0, 120),
          why: (args.next_job.why ?? '').slice(0, 300),
          covers,
        };
      }
    }

    const needSheet = !hasTestSheet && (boardSeen || args.board_in_photo === true);
    return json({
      source: 'ai_suggested',
      model: CHAT_MODEL,
      criteria,
      reflection: transcript || notes ? (args.reflection ?? '').slice(0, 2000).trim() : '',
      testSheet: needSheet
        ? {
            needed: true,
            ask:
              (args.test_sheet_ask ?? '').trim() ||
              'That looks like a board. Add the schedule of test results so your assessor can see it was tested, not just installed.',
          }
        : { needed: false, ask: '' },
      nextJob,
      openGaps: open.length,
      regs: regs.map((r) => ({ reg: r.reg, title: r.title })),
    });
  } catch (err) {
    await captureException(err, {
      functionName: 'capture-assistant',
      userId: uid,
      requestUrl: req.url,
      requestMethod: req.method,
    });
    return json(
      {
        error: 'assistant_failed',
        detail: err instanceof Error ? err.message.slice(0, 200) : 'unknown',
      },
      500
    );
  }
});
