// ai-tutor-voice-feedback — generate feedback in a specific tutor's writing voice.
// ELE-926 (H2). Samples that tutor's past comments to derive a style profile,
// optionally pulls AC context + BS 7671 facets via RAG when ac_code provided,
// optionally honours the learner's SEND / EAL inclusion flags + accessibility
// notes (ELE-904 / B9) when student_id provided, then writes a fresh
// feedback line for the supplied work.
//
// NB: "voice" here means written prose style, not audio.
//
// POST {
//   learner_work: string,
//   ac_code?: string,                // e.g. "1.2.3" — triggers AC + BS 7671 RAG enrichment
//   qualification_code?: string,
//   kind?: 'portfolio' | 'quiz' | 'observation' | 'otj',
//   learner_name?: string,
//   student_id?: string              // college_students.id — triggers inclusion-flag adjustment
// }
// Returns { feedback, style_summary, regulations_cited, ac_summary, inclusion_summary, samples_used }

import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.57.4';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type, x-supabase-timeout, x-request-id',
};

const CHAT_MODEL = 'gpt-5.4-mini-2026-03-17';
const MAX_SAMPLE_COMMENTS = 25;
const MAX_FACETS = 6;

interface Sample {
  text: string;
  source: 'portfolio_comments' | 'quiz_feedback';
}

interface FacetRow {
  content: string | null;
  regulation_id: string | null;
  document_type: string | null;
  primary_topic: string | null;
  reg_number: string | null;
  reg_title: string | null;
}

const SYSTEM_PROMPT = `You are an experienced UK FE college tutor. You will be given a sample of YOUR own past written feedback (so you can match your style), optional AC + BS 7671 context, and a new piece of learner work to give feedback on.

Match the supplied samples as closely as possible — sentence length, voice, level of warmth, technical specificity, use (or non-use) of emojis, addressing the learner by name vs not.

When BS 7671 / AC context is supplied:
- You MAY cite regulations by number ("BS 7671 411.3.3", "Regulation 643.7.1") but ONLY the ones present in the supplied facets. Never invent regulation numbers.
- You MAY reference the AC code (e.g. "this evidences AC 1.2.3") when relevant.
- Keep the technical content grounded in the supplied facets. If you're uncertain, defer to "check the regs" rather than guessing.

Write ONE feedback message: 2-4 sentences. UK English. Specific to the work shown — never generic. End with one actionable next step.

Submit via the submit_feedback tool.`;

const FEEDBACK_TOOL = {
  type: 'function',
  function: {
    name: 'submit_feedback',
    description: "Submit the tutor-voice feedback.",
    parameters: {
      type: 'object',
      additionalProperties: false,
      properties: {
        feedback: { type: 'string' },
        style_summary: {
          type: 'string',
          description: 'One short sentence describing the style you matched.',
        },
        regulations_cited: {
          type: 'array',
          items: { type: 'string' },
          description: 'List of regulation numbers actually cited in the feedback. May be empty.',
        },
      },
      required: ['feedback', 'style_summary', 'regulations_cited'],
    },
  },
} as const;

async function authorise(req: Request) {
  const auth = req.headers.get('authorization');
  if (!auth) return { ok: false as const };
  const userClient = createClient(
    Deno.env.get('SUPABASE_URL')!,
    Deno.env.get('SUPABASE_ANON_KEY')!,
    { global: { headers: { Authorization: auth } }, auth: { persistSession: false } }
  );
  const { data } = await userClient.auth.getUser();
  if (!data?.user) return { ok: false as const };
  return { ok: true as const, uid: data.user.id };
}

async function sampleTutorVoice(
  sb: ReturnType<typeof createClient>,
  userId: string
): Promise<Sample[]> {
  const samples: Sample[] = [];
  try {
    const { data } = await sb
      .from('portfolio_comments')
      .select('content, created_at')
      .eq('user_id', userId)
      .order('created_at', { ascending: false })
      .limit(MAX_SAMPLE_COMMENTS);
    for (const row of (data ?? []) as Array<{ content?: string }>) {
      if (row.content?.trim()) {
        samples.push({ text: row.content.trim(), source: 'portfolio_comments' });
      }
    }
  } catch (_e) {
    /* skip */
  }
  try {
    const { data } = await sb
      .from('college_grades')
      .select('feedback')
      .eq('assessed_by', userId)
      .not('feedback', 'is', null)
      .order('assessed_at', { ascending: false })
      .limit(MAX_SAMPLE_COMMENTS);
    for (const row of (data ?? []) as Array<{ feedback?: string }>) {
      if (row.feedback?.trim()) {
        samples.push({ text: row.feedback.trim(), source: 'quiz_feedback' });
      }
    }
  } catch (_e) {
    /* skip */
  }
  return samples.slice(0, MAX_SAMPLE_COMMENTS);
}

/**
 * Pull AC summary + BS 7671 facets relevant to this AC. AC text comes
 * from qualification_requirements; relevant BS 7671 facets come from any
 * lesson_regulation_refs whose lesson covers this AC.
 */
async function loadAcContext(
  sb: ReturnType<typeof createClient>,
  acCode: string,
  qualificationCode: string | undefined,
  learnerWork: string
): Promise<{ acSummary: string | null; facets: FacetRow[] }> {
  let acSummary: string | null = null;

  // 1. Pull AC text from qualification_requirements (2046 rows in prod)
  try {
    let q = sb
      .from('qualification_requirements')
      .select('ac_code, ac_text, unit_code, unit_title, lo_text, qualification_code')
      .eq('ac_code', acCode)
      .limit(1);
    if (qualificationCode) q = q.eq('qualification_code', qualificationCode);
    const { data: acRow } = await q.maybeSingle();
    if (acRow) {
      acSummary = `AC ${acRow.ac_code} (${acRow.unit_code || ''} ${acRow.unit_title || ''}) — LO: ${acRow.lo_text || ''} — AC: ${acRow.ac_text ?? ''}`.trim();
    }
  } catch (_e) {
    /* shape may differ — skip */
  }

  // 2. Pull BS 7671 facets cited by any lesson plan that maps to this AC,
  // then enrich each with its regulation number + title from bs7671_regulations.
  let facets: FacetRow[] = [];
  try {
    const { data: lessonAcMap } = await sb
      .from('lesson_plan_ac_mapping')
      .select('lesson_plan_id')
      .eq('ac_code', acCode)
      .limit(20);
    const lessonIds = (lessonAcMap ?? []).map((r: any) => r.lesson_plan_id).filter(Boolean);
    if (lessonIds.length > 0) {
      const { data: refs } = await sb
        .from('lesson_regulation_refs')
        .select('facet_id, document_type')
        .in('lesson_plan_id', lessonIds)
        .limit(MAX_FACETS * 2);
      const facetIds = (refs ?? []).map((r: any) => r.facet_id).filter(Boolean);
      if (facetIds.length > 0) {
        const { data: facetRows } = await sb
          .from('bs7671_facets')
          .select('content, regulation_id, document_type, primary_topic')
          .in('id', facetIds)
          .limit(MAX_FACETS);
        const regIds = (facetRows ?? []).map((r: any) => r.regulation_id).filter(Boolean);
        const regMap = new Map<string, { reg_number?: string; title?: string }>();
        if (regIds.length > 0) {
          const { data: regs } = await sb
            .from('bs7671_regulations')
            .select('id, reg_number, title')
            .in('id', regIds);
          for (const r of (regs ?? []) as Array<any>) {
            regMap.set(r.id, { reg_number: r.reg_number, title: r.title });
          }
        }
        facets = (facetRows ?? []).map((f: any) => ({
          content: f.content,
          regulation_id: f.regulation_id,
          document_type: f.document_type,
          primary_topic: f.primary_topic,
          reg_number: regMap.get(f.regulation_id)?.reg_number ?? null,
          reg_title: regMap.get(f.regulation_id)?.title ?? null,
        }));
      }
    }
  } catch (_e) {
    /* skip */
  }

  // 3. Keyword fallback over learner work + AC text if still no facets
  if (facets.length === 0) {
    try {
      const seedText = (acSummary || '') + ' ' + learnerWork;
      const keywords = seedText
        .toLowerCase()
        .split(/[^a-z0-9]+/)
        .filter((w) => w.length >= 5 && !['which','their','where','should','these','those','about'].includes(w))
        .slice(0, 4);
      if (keywords.length > 0) {
        const { data: facetRows } = await sb
          .from('bs7671_facets')
          .select('content, regulation_id, document_type, primary_topic')
          .ilike('content', `%${keywords[0]}%`)
          .limit(MAX_FACETS);
        const regIds = (facetRows ?? []).map((r: any) => r.regulation_id).filter(Boolean);
        const regMap = new Map<string, { reg_number?: string; title?: string }>();
        if (regIds.length > 0) {
          const { data: regs } = await sb
            .from('bs7671_regulations')
            .select('id, reg_number, title')
            .in('id', regIds);
          for (const r of (regs ?? []) as Array<any>) {
            regMap.set(r.id, { reg_number: r.reg_number, title: r.title });
          }
        }
        facets = (facetRows ?? []).map((f: any) => ({
          content: f.content,
          regulation_id: f.regulation_id,
          document_type: f.document_type,
          primary_topic: f.primary_topic,
          reg_number: regMap.get(f.regulation_id)?.reg_number ?? null,
          reg_title: regMap.get(f.regulation_id)?.title ?? null,
        }));
      }
    } catch (_e) {
      /* skip */
    }
  }

  return { acSummary, facets };
}

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
    return new Response(JSON.stringify({ error: 'unauthorized' }), {
      status: 401,
      headers: { ...corsHeaders, 'content-type': 'application/json' },
    });
  }

  let body: {
    learner_work: string;
    ac_code?: string;
    qualification_code?: string;
    kind?: 'portfolio' | 'quiz' | 'observation' | 'otj';
    learner_name?: string;
    student_id?: string;
  };
  try {
    body = (await req.json()) as typeof body;
  } catch {
    return new Response(JSON.stringify({ error: 'bad_body' }), {
      status: 400,
      headers: { ...corsHeaders, 'content-type': 'application/json' },
    });
  }
  if (!body.learner_work?.trim()) {
    return new Response(JSON.stringify({ error: 'learner_work_required' }), {
      status: 400,
      headers: { ...corsHeaders, 'content-type': 'application/json' },
    });
  }

  const sb = createClient(SUPABASE_URL, SERVICE_KEY, {
    auth: { persistSession: false, autoRefreshToken: false },
  });

  // Pull tutor voice samples + optional curriculum context + optional
  // inclusion flags in parallel.
  const [samples, ctx, inclusion] = await Promise.all([
    sampleTutorVoice(sb, auth.uid),
    body.ac_code
      ? loadAcContext(sb, body.ac_code, body.qualification_code, body.learner_work)
      : Promise.resolve({ acSummary: null, facets: [] as FacetRow[] }),
    body.student_id
      ? loadInclusionContext(sb, body.student_id)
      : Promise.resolve(null as InclusionContext | null),
  ]);

  const samplesPrompt =
    samples.length === 0
      ? '[No past feedback samples found — write a warm, specific, evidence-led feedback line in standard UK FE tutor voice.]'
      : samples.map((s, i) => `Sample ${i + 1} (${s.source}):\n${s.text}`).join('\n\n');

  const contextLines: string[] = [];
  if (ctx.acSummary) contextLines.push(`AC context: ${ctx.acSummary}`);
  if (ctx.facets.length > 0) {
    contextLines.push('BS 7671 / GN3 / OSG facets available to cite (use the reg number exactly, do not invent):');
    for (const f of ctx.facets) {
      const cite = f.reg_number ? `Reg ${f.reg_number}` : f.document_type || 'facet';
      contextLines.push(`- ${cite}${f.reg_title ? ` (${f.reg_title})` : ''}: ${(f.content || '').slice(0, 250)}`);
    }
  }
  if (inclusion) {
    const inclusionLines: string[] = [];
    if (inclusion.send_flags?.length) {
      inclusionLines.push(`SEND / inclusion flags: ${inclusion.send_flags.join(', ')}`);
    }
    if (inclusion.eal) inclusionLines.push('EAL (English as additional language) learner');
    if (inclusion.first_language) inclusionLines.push(`First language: ${inclusion.first_language}`);
    if (inclusion.accessibility_notes)
      inclusionLines.push(`Accessibility notes: ${inclusion.accessibility_notes}`);
    if (inclusion.pronouns) inclusionLines.push(`Pronouns: ${inclusion.pronouns}`);
    if (inclusionLines.length > 0) {
      contextLines.push(
        'Learner inclusion context — adapt your feedback to be accessible and respectful:'
      );
      for (const l of inclusionLines) contextLines.push(`- ${l}`);
      contextLines.push(
        'Differentiation guidance: use plain UK English, shorter sentences if EAL or dyslexia is flagged, avoid idioms, lead with one concrete next step.'
      );
    }
  }

  const userPrompt = `Past feedback samples (your own voice):
${samplesPrompt}

${contextLines.length > 0 ? contextLines.join('\n') + '\n' : ''}New ${body.kind || 'work'} to feed back on${body.learner_name ? ` — learner: ${body.learner_name}` : ''}:
"""
${body.learner_work.trim()}
"""

Write the feedback in your matched voice. Submit via the submit_feedback tool.`;

  const aiRes = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: { Authorization: `Bearer ${OPENAI_KEY}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({
      model: CHAT_MODEL,
      max_completion_tokens: 700,
      messages: [
        { role: 'system', content: SYSTEM_PROMPT },
        { role: 'user', content: userPrompt },
      ],
      tools: [FEEDBACK_TOOL],
      tool_choice: { type: 'function', function: { name: 'submit_feedback' } },
    }),
  });

  if (!aiRes.ok) {
    const text = await aiRes.text();
    return new Response(JSON.stringify({ error: 'ai_failed', detail: text }), {
      status: 502,
      headers: { ...corsHeaders, 'content-type': 'application/json' },
    });
  }

  const aiJson = await aiRes.json();
  const toolCall = aiJson?.choices?.[0]?.message?.tool_calls?.[0];
  if (!toolCall?.function?.arguments) {
    return new Response(JSON.stringify({ error: 'ai_no_tool_call' }), {
      status: 502,
      headers: { ...corsHeaders, 'content-type': 'application/json' },
    });
  }
  let parsed: { feedback: string; style_summary: string; regulations_cited: string[] };
  try {
    parsed = JSON.parse(toolCall.function.arguments);
  } catch (e) {
    return new Response(JSON.stringify({ error: 'ai_bad_json' }), {
      status: 502,
      headers: { ...corsHeaders, 'content-type': 'application/json' },
    });
  }

  return new Response(
    JSON.stringify({
      feedback: parsed.feedback,
      style_summary: parsed.style_summary,
      regulations_cited: parsed.regulations_cited,
      ac_summary: ctx.acSummary,
      facets_used: ctx.facets.length,
      samples_used: samples.length,
      inclusion_summary: inclusion
        ? {
            send_flags: inclusion.send_flags,
            eal: inclusion.eal,
            differentiated: (inclusion.send_flags?.length ?? 0) > 0 || inclusion.eal,
          }
        : null,
    }),
    { headers: { ...corsHeaders, 'content-type': 'application/json' } }
  );
});

// ============================================================
// Helpers
// ============================================================

interface InclusionContext {
  send_flags: string[];
  eal: boolean;
  ehcp_ref: string | null;
  accessibility_notes: string | null;
  first_language: string | null;
  pronouns: string | null;
}

async function loadInclusionContext(
  sb: ReturnType<typeof createClient>,
  studentId: string
): Promise<InclusionContext | null> {
  try {
    const { data } = await sb
      .from('college_students')
      .select('send_flags, eal, ehcp_ref, accessibility_notes, first_language, pronouns')
      .eq('id', studentId)
      .maybeSingle();
    if (!data) return null;
    const row = data as {
      send_flags?: string[] | null;
      eal?: boolean | null;
      ehcp_ref?: string | null;
      accessibility_notes?: string | null;
      first_language?: string | null;
      pronouns?: string | null;
    };
    return {
      send_flags: row.send_flags ?? [],
      eal: !!row.eal,
      ehcp_ref: row.ehcp_ref ?? null,
      accessibility_notes: row.accessibility_notes ?? null,
      first_language: row.first_language ?? null,
      pronouns: row.pronouns ?? null,
    };
  } catch (_e) {
    return null;
  }
}
