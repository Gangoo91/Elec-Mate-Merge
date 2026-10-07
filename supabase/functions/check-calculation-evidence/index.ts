/**
 * check-calculation-evidence — when a learner turns a saved calculation into
 * portfolio evidence, check it against OUR regulations data (the bs7671_facets
 * RAG: BS 7671, OSG, GN3) and return a short "Checked against BS 7671: …"
 * note for the assessor.
 *
 * 🔴 Grounded only in retrieved rows. The model is given the calculation and
 * the retrieved excerpts and told to judge ONLY from those; any regulation
 * number it writes that was not retrieved is scrubbed (citation-guard). If
 * nothing relevant was retrieved, the note says so plainly. The note informs
 * the assessor; it passes, fails and claims nothing.
 *
 * POST { calculation_id }  — the caller's own calculation_reports row only.
 * Rate limit: claim_ai_evidence_quota('calc_check').
 */
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.49.4';
import { corsHeaders } from '../_shared/cors.ts';
import { identifyCaller, deny } from '../_shared/caller.ts';
import { searchFacets, type BS7671Facet } from '../_shared/bs7671-facets-rag.ts';
import { keepOnlyListedRegulations } from '../_shared/citation-guard.ts';

const MODEL = 'gemini-3.5-flash';
const UUID_RE = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/;
const FOOT = 'An automatic check to help your assessor. It does not pass or fail anything.';

const json = (body: unknown, status = 200) =>
  new Response(JSON.stringify(body), { status, headers: { ...corsHeaders, 'Content-Type': 'application/json' } });

/** Extra search words per calculator, so retrieval finds the rule the calc relies on. */
const SLUG_QUERY: Record<string, string> = {
  'cable-size': 'current-carrying capacity tabulated cable rating correction factors grouping ambient Appendix 4 voltage drop limit',
  'voltage-drop': 'voltage drop limits lighting other uses Appendix 4 Table 4Ab 3% 5%',
  'max-zs': 'maximum earth fault loop impedance Zs disconnection times Table 41.3 0.4 s',
  'zs': 'maximum earth fault loop impedance Zs disconnection times Table 41.3',
  'adiabatic': 'adiabatic equation protective conductor cross-sectional area k values 543.1.3',
  'pfc': 'prospective fault current rated short-circuit breaking capacity protective device 434.5.1',
  'maximum-demand': 'maximum demand and diversity 311.1',
  'diversity-factor': 'maximum demand diversity allowance',
  'selectivity': 'selectivity discrimination between protective devices 536.4',
  'ohms-law': 'resistance of conductors',
  'power-quality': 'harmonics power factor',
};

interface CalcPayload {
  meta?: { standard?: string; title?: string; subtitle?: string };
  headline?: { label?: string; value?: string; unit?: string; verdict?: string }[];
  sections?: { heading?: string; rows?: { label?: string; value?: string; note?: string }[] }[];
  notes?: string[];
}

function calcText(title: string, subtitle: string | null, p: CalcPayload | null): string {
  const lines: string[] = [`Calculation: ${title}${subtitle ? ` (${subtitle})` : ''}`];
  if (p?.meta?.standard) lines.push(`Reference shown on the calculation: ${p.meta.standard}`);
  for (const h of p?.headline ?? []) lines.push(`Result: ${h.label}: ${[h.value, h.unit].filter(Boolean).join(' ')}`);
  for (const s of p?.sections ?? []) {
    lines.push(`${s.heading ?? 'Section'}:`);
    for (const r of s.rows ?? []) lines.push(`- ${r.label}: ${r.value}${r.note ? ` (${r.note})` : ''}`);
  }
  for (const n of p?.notes ?? []) lines.push(`Note: ${n}`);
  return lines.join('\n').slice(0, 4000);
}

function refOf(f: BS7671Facet): string {
  const book = f.documentType === 'osg' ? 'On-Site Guide' : f.documentType === 'gn3' ? 'Guidance Note 3' : 'BS 7671';
  return f.regNumber ? `${book} ${f.documentType === 'bs7671' ? 'Regulation ' : ''}${f.regNumber}` : book;
}

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') return new Response('ok', { headers: corsHeaders });
  if (req.method !== 'POST') return json({ error: 'POST only' }, 405);
  const caller = await identifyCaller(req);
  if (!caller || caller.kind !== 'user') return deny(corsHeaders, 401, 'Sign in first');

  let body: { calculation_id?: string };
  try {
    body = await req.json();
  } catch {
    return json({ error: 'Bad request' }, 400);
  }
  const id = String(body.calculation_id ?? '');
  if (!UUID_RE.test(id)) return json({ error: 'Bad calculation' }, 400);

  const url = Deno.env.get('SUPABASE_URL')!;
  const admin = createClient(url, Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!, { auth: { persistSession: false } });
  const asUser = createClient(url, Deno.env.get('SUPABASE_ANON_KEY')!, {
    global: { headers: { Authorization: req.headers.get('Authorization') ?? '' } },
    auth: { persistSession: false },
  });

  const { data: row } = await admin
    .from('calculation_reports')
    .select('id, user_id, title, subtitle, calculator_slug, payload')
    .eq('id', id)
    .maybeSingle();
  if (!row || row.user_id !== caller.userId) return deny(corsHeaders, 403, 'Not your calculation');

  const { error: quotaErr } = await asUser.rpc('claim_ai_evidence_quota', { p_kind: 'calc_check' });
  if (quotaErr) {
    if (quotaErr.hint === 'rate_limited' || /limit reached/i.test(quotaErr.message)) {
      return json({ error: 'Too many checks this hour. Try again later.' }, 429);
    }
    return deny(corsHeaders, 403, 'Not allowed');
  }

  const payload = { ...(row.payload as CalcPayload & { company?: unknown; client?: unknown }) };
  delete (payload as { company?: unknown }).company;
  delete (payload as { client?: unknown }).client;
  const text = calcText(row.title, row.subtitle, payload);
  // Several targeted searches beat one long one: the rule the calc relies on,
  // its own result lines (table refs, sizes), and voltage drop if it has one.
  const resultLines = [
    ...(payload.headline ?? []).map((h) => `${h.label} ${h.value ?? ''}${h.unit ?? ''}`),
    ...(payload.sections ?? [])
      .filter((sec) => /result|output|answer/i.test(sec.heading ?? ''))
      .flatMap((sec) => (sec.rows ?? []).map((r) => `${r.label} ${r.value ?? ''} ${r.note ?? ''}`)),
  ].join(' ');
  const queries = [
    [row.title, payload.meta?.standard, row.subtitle, resultLines].filter(Boolean).join(' '),
    [row.title, SLUG_QUERY[row.calculator_slug ?? ''] ?? ''].join(' '),
  ];
  if (/volt(age)?\s*drop/i.test(text)) {
    queries.push('voltage drop limits between origin and load Appendix 4 section 6.4 Table 4Ab 525.202');
  }
  const found = await Promise.all(
    queries.map((q) =>
      searchFacets(admin, { query: q.slice(0, 500), matchCount: 4, documentTypes: ['bs7671', 'osg', 'gn3'] }).catch(
        () => [] as BS7671Facet[]
      )
    )
  );
  const seen = new Set<string>();
  const facets: BS7671Facet[] = [];
  for (let i = 0; i < 4; i += 1) {
    for (const list of found) {
      const f = list[i];
      if (f && !seen.has(f.facetId)) {
        seen.add(f.facetId);
        facets.push(f);
      }
    }
  }
  facets.splice(10);

  const noData = () =>
    json({
      success: true,
      verdict: 'no_data',
      note: `Not checked against BS 7671: our regulations library had nothing that matches this calculation closely enough to check it. ${FOOT}`,
      refs: [],
    });
  if (!facets.length) return noData();

  const key = Deno.env.get('GEMINI_API_KEY');
  if (!key) return noData();

  const excerpts = facets
    .map((f, i) => `[${i + 1}] ${refOf(f)}${f.regTitle ? `, ${f.regTitle}` : ''}${f.pageNumber ? ` (p.${f.pageNumber})` : ''}:\n${(f.content ?? '').slice(0, 1200)}`)
    .join('\n\n');

  const prompt = `You check an electrical apprentice's calculation for their assessor, using ONLY the excerpts below from our copy of BS 7671, the On-Site Guide and Guidance Note 3.

THE CALCULATION
${text}

EXCERPTS
${excerpts}

Rules:
- Use ONLY the excerpts. Do not use anything you remember about BS 7671, its tables or values. If a figure you would need (a table value, a limit, a factor) is not in the excerpts, you cannot check it.
- verdict: "consistent" if the excerpts contain the rule or limit the calculation relies on and the calculation agrees with it; "query" if the excerpts show something the calculation appears to contradict; "no_data" if the excerpts do not contain what is needed to check it.
- If the excerpts let you check only PART of it (for example the voltage drop limit but not the cable rating), check that part, judge the verdict on that part alone, and say in the note which part could not be checked.
- used: the excerpt numbers you actually relied on (empty for no_data).
- note: at most two short sentences in UK English, plain words, no dashes as punctuation. Say what was checked and against what (for example the voltage drop limit). For "query", say exactly what looks wrong. Never say the calculation is approved, passed or compliant overall.`;

  let verdict = 'no_data';
  let note = '';
  let used: number[] = [];
  try {
    const r = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/${MODEL}:generateContent?key=${key}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: [{ role: 'user', parts: [{ text: prompt }] }],
        generationConfig: {
          temperature: 0,
          maxOutputTokens: 2_000,
          responseMimeType: 'application/json',
          responseSchema: {
            type: 'object',
            properties: {
              verdict: { type: 'string', enum: ['consistent', 'query', 'no_data'] },
              used: { type: 'array', items: { type: 'number' } },
              note: { type: 'string' },
            },
            required: ['verdict', 'used', 'note'],
          },
        },
      }),
    });
    if (!r.ok) throw new Error(`model ${r.status}`);
    const raw = (await r.json())?.candidates?.[0]?.content?.parts?.[0]?.text;
    const out = JSON.parse(raw ?? '{}') as { verdict?: string; used?: number[]; note?: string };
    verdict = ['consistent', 'query', 'no_data'].includes(out.verdict ?? '') ? out.verdict! : 'no_data';
    used = (out.used ?? []).map(Number).filter((n) => Number.isInteger(n) && n >= 1 && n <= facets.length);
    note = String(out.note ?? '').trim().replace(/\s+[–—]\s+/g, ', ');
  } catch (e) {
    console.warn('[check-calculation-evidence]', (e as Error).message);
    return json({ error: 'Could not run the check just now.' }, 502);
  }

  if (verdict === 'no_data' || !used.length) return noData();

  const usedFacets = used.map((n) => facets[n - 1]);
  const allowed = usedFacets.map((f) => f.regNumber).filter((x): x is string => !!x);
  note = keepOnlyListedRegulations(note, allowed).text;
  const refs = [...new Set(usedFacets.map(refOf))];
  const lead = verdict === 'query' ? 'Checked against BS 7671, one thing to look at' : 'Checked against BS 7671';
  return json({
    success: true,
    verdict,
    note: `${lead} (${refs.join('; ')}): ${note} ${FOOT}`,
    refs: usedFacets.map((f) => ({ ref: refOf(f), title: f.regTitle, page: f.pageNumber, document: f.documentType })),
  });
});
