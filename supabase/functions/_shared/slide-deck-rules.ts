// Shared rules for the college slide-deck functions (ai-generate-slide-deck,
// ai-regenerate-slide). One place for: the regulation sources a lesson may
// cite, the brevity and accuracy rules in the prompt, the slide schema, and
// the clean-up every generated slide goes through before it is saved.
//
// Accuracy rules this enforces:
// - A regulation slide may only cite a source linked to the lesson
//   (lesson_regulation_refs -> bs7671_facets), and must name the document
//   (BS 7671, On-Site Guide, Guidance Note 3) and its section. OSG and GN3
//   section numbers are NOT BS 7671 regulation numbers; the source list
//   says which is which. A slide citing anything else is turned into a
//   plain concept slide.
// - No amendment claims. bs7671_regulations.updated_in records the source
//   edition, not what an amendment changed, so "new in A4" style tags are
//   unreliable; the prompt forbids them and the clean-up strips them.
// - No internal retrieval ids ("facet 3", "S2") on a slide.

// deno-lint-ignore-file no-explicit-any

export interface SlideSource {
  key: string; // S1, S2 ...
  document: 'BS 7671' | 'On-Site Guide' | 'Guidance Note 3';
  ref: string | null; // "411.3.2" for BS 7671, "12.5" for an OSG/GN3 section
  title: string | null;
  text: string;
}

const DOC_NAME: Record<string, SlideSource['document']> = {
  bs7671: 'BS 7671',
  osg: 'On-Site Guide',
  gn3: 'Guidance Note 3',
};

const SOURCE_TEXT_CLIP = 520;

/** Load the regulation extracts linked to a lesson plan, labelled by document. */
export async function loadSlideSources(
  supabase: any,
  lessonPlanId: string
): Promise<SlideSource[]> {
  const { data: refRows } = await supabase
    .from('lesson_regulation_refs')
    .select('facet_id, document_type, relevance_score')
    .eq('lesson_plan_id', lessonPlanId)
    .order('relevance_score', { ascending: false })
    .limit(30);
  const refs = (refRows ?? []) as Array<{ facet_id: string | null; document_type: string | null }>;
  const facetIds = refs.map((r) => r.facet_id).filter((id): id is string => !!id);
  if (!facetIds.length) return [];

  const { data: facetRows } = await supabase
    .from('bs7671_facets')
    .select('id, content, regulation_id, primary_topic, document_type')
    .in('id', facetIds)
    .limit(30);
  const facets = (facetRows ?? []) as Array<{
    id: string;
    content: string | null;
    regulation_id: string | null;
    primary_topic: string | null;
    document_type: string | null;
  }>;
  const regIds = facets.map((f) => f.regulation_id).filter((id): id is string => !!id);
  const regMap = new Map<string, { reg_number: string | null; title: string | null }>();
  if (regIds.length) {
    const { data: regs } = await supabase
      .from('bs7671_regulations')
      .select('id, reg_number, title')
      .in('id', regIds);
    for (const r of (regs ?? []) as Array<{
      id: string;
      reg_number: string | null;
      title: string | null;
    }>) {
      regMap.set(r.id, { reg_number: r.reg_number, title: r.title });
    }
  }
  const docByFacet = new Map(refs.map((r) => [r.facet_id, r.document_type]));

  const out: SlideSource[] = [];
  const seen = new Set<string>();
  for (const id of facetIds) {
    const f = facets.find((x) => x.id === id);
    if (!f) continue;
    const docKey = (docByFacet.get(id) ?? f.document_type ?? 'bs7671').toLowerCase();
    const document = DOC_NAME[docKey] ?? 'BS 7671';
    const reg = f.regulation_id ? regMap.get(f.regulation_id) : undefined;
    const text = cleanSlideText(f.content ?? '')
      .replace(/\s+/g, ' ')
      .slice(0, SOURCE_TEXT_CLIP);
    if (!text) continue;
    const dedupe = `${document}|${reg?.reg_number ?? ''}|${text.slice(0, 80)}`;
    if (seen.has(dedupe)) continue;
    seen.add(dedupe);
    out.push({
      key: `S${out.length + 1}`,
      document,
      ref: reg?.reg_number?.trim() || null,
      title: reg?.title?.trim() || f.primary_topic?.trim() || null,
      text,
    });
  }
  return out;
}

/**
 * The slides must read from the RAG (Andrew, 7 Oct: "the AI must read from
 * the RAG"). A plan saved before its references were stored, or one made by
 * hand, links few or no extracts, and the model would then write from memory.
 * When fewer than MIN_SOURCES are linked, search the regulation store
 * directly (match_bs7671_hybrid, the same hybrid search the lesson generator
 * uses) with the lesson's own words, across BS 7671, the On-Site Guide and
 * Guidance Note 3, and add what it finds as further labelled sources.
 */
const MIN_SOURCES = 8;
const RAG_PER_DOC = 4;

export async function topUpSlideSourcesFromRag(
  supabase: any,
  sources: SlideSource[],
  queryText: string,
  openaiKey: string
): Promise<SlideSource[]> {
  if (sources.length >= MIN_SOURCES || !queryText.trim()) return sources;
  try {
    const resp = await fetch('https://api.openai.com/v1/embeddings', {
      method: 'POST',
      headers: { Authorization: `Bearer ${openaiKey}`, 'content-type': 'application/json' },
      body: JSON.stringify({
        model: 'text-embedding-3-large',
        input: queryText.slice(0, 6000),
        dimensions: 3072,
      }),
    });
    if (!resp.ok) return sources;
    const vec = ((await resp.json()).data?.[0]?.embedding ?? []) as number[];
    if (!vec.length) return sources;
    const literal = '[' + vec.map((v) => v.toFixed(7)).join(',') + ']';
    const out = [...sources];
    const seen = new Set(out.map((x) => `${x.document}|${x.ref ?? ''}|${x.text.slice(0, 80)}`));
    for (const doc of ['bs7671', 'osg', 'gn3']) {
      const { data, error } = await supabase.rpc('match_bs7671_hybrid', {
        q_text: queryText.slice(0, 1000),
        q_embedding: literal,
        doc_type: doc,
        max_results: RAG_PER_DOC,
      });
      if (error) {
        console.warn('[slides-rag]', doc, error.message);
        continue;
      }
      for (const m of (data ?? []) as Array<{
        reg_number: string | null;
        reg_title: string | null;
        primary_topic: string | null;
        document_type: string | null;
        content: string | null;
      }>) {
        const document = DOC_NAME[(m.document_type ?? doc).toLowerCase()] ?? 'BS 7671';
        const text = cleanSlideText(m.content ?? '').replace(/\s+/g, ' ').slice(0, SOURCE_TEXT_CLIP);
        if (!text) continue;
        const key = `${document}|${m.reg_number ?? ''}|${text.slice(0, 80)}`;
        if (seen.has(key)) continue;
        seen.add(key);
        out.push({
          key: `S${out.length + 1}`,
          document,
          ref: m.reg_number?.trim() || null,
          title: m.reg_title?.trim() || m.primary_topic?.trim() || null,
          text,
        });
      }
    }
    return out;
  } catch (e) {
    console.warn('[slides-rag] top-up failed', (e as Error).message);
    return sources;
  }
}

/** The source list as the model sees it. */
export function formatSources(sources: SlideSource[]): string {
  if (!sources.length) {
    return '(none linked to this lesson: do not write any reg_cite or pull_quote slide, and do not quote any regulation number)';
  }
  return sources
    .map((s) => {
      const where = s.ref
        ? s.document === 'BS 7671'
          ? `BS 7671, Regulation ${s.ref}`
          : `${s.document}, section ${s.ref} (an ${s.document} section number, NOT a BS 7671 regulation number)`
        : `${s.document} (no section number: do not use for a reg_cite slide)`;
      return `${s.key}. ${where}${s.title ? ` (${s.title})` : ''}: ${s.text}`;
    })
    .join('\n');
}

export const BREVITY_RULES = `ON-SLIDE TEXT IS SHORT. The slide is projected for learners at the back of a workshop; the depth goes in speaker_notes.
- Bullets: at most 6 per slide, at most 12 words each. No full stops needed.
- "body": at most 35 words (title and concept slides), at most 45 words (starter scenario).
- "key_terms": at most 3, each definition at most 12 words.
- "reg_cite": 'clause' is a plain-English paraphrase of the source, at most 35 words. 'why_it_matters' at most 30 words.
- "activity": 'instruction' is 3 to 5 short steps, one per line, each starting with a verb, at most 50 words in total. 'success_criteria' at most 20 words. Always set 'time_minutes' and 'group_size'.
- "worked_example": 'problem' at most 40 words; at most 6 'solution_steps', each at most 14 words.
- "check_understanding": 4 or 5 questions, each at most 18 words, each starting with its level: "Recall:", "Apply:", "Analyse:" or "Evaluate:". No numbering.
- "misconception": 'belief' at most 20 words in the learner's voice; 'correction' at most 30 words.
- "summary": 4 to 6 bullets, at most 12 words each.
- "plenary": 'body' is a question of at most 25 words followed by four options on new lines, "A) ...", "B) ...", "C) ...", "D) ...", each at most 8 words. 'exit_ticket' at most 20 words.
- "two_column": 'left_bullets' and 'right_bullets', at most 4 each, at most 10 words each.
- "big_stat": 'stat_value' is a short figure; 'stat_caption' at most 18 words.
- Headings at most 8 words. No numbering inside list items.
- "speaker_notes": REQUIRED on every slide, 50 to 110 words: what the tutor says, the question to ask, and how to check understanding.`;

export const ACCURACY_RULES = `ACCURACY. These are hard rules.
1. Regulation material comes ONLY from SOURCES. A "reg_cite" or "pull_quote" slide must set 'source_document' to that source's document ("BS 7671", "On-Site Guide" or "Guidance Note 3") and 'reg_number' to its number exactly as listed. On-Site Guide and Guidance Note 3 numbers are section numbers of those books, never BS 7671 regulation numbers. Never cite a number that is not listed. If no source fits, use a "concept" slide instead.
2. Paraphrase, never quote. Do not put quotation marks round regulation text and do not present a paraphrase as the exact wording.
3. No invented values. Any limit, table value, disconnection time, mV/A/m figure, maximum Zs, percentage or test voltage must appear in SOURCES or the lesson plan. If a calculation needs a table value that is not given, name the table and tell learners to look it up instead of stating a number. Inputs you choose for a worked example (a load, a length) must be stated as given values in the problem.
4. Do not say a requirement is new, changed or added by any amendment (no "A4", "Amendment 4", "new in 2026"). Refer to the standard as "BS 7671" with no edition.
5. Never mention sources, extracts, context, facets or ids (S1, S2) on a slide or in notes. Name the document and section instead.
6. UK English. No emojis. No em dashes. Plain text only.
7. Technical statements (what a regulation requires, how a test is done, why a rule exists) must agree with SOURCES. Where SOURCES do not cover a point, keep the slide general and say which book to check (BS 7671, the On-Site Guide or Guidance Note 3) rather than writing it from memory.`;

export const DIAGRAM_KINDS = [
  'ring_final',
  'radial',
  'lighting_final',
  'distribution_board',
  'voltage_drop_curve',
  'equipotential_bonding',
  'three_phase',
  'RCD_discrimination',
] as const;

export const SLIDE_KINDS = [
  'title',
  'starter',
  'objectives',
  'concept',
  'reg_cite',
  'pull_quote',
  'big_stat',
  'two_column',
  'image_concept',
  'diagram_caption',
  'activity',
  'worked_example',
  'check_understanding',
  'misconception',
  'summary',
  'plenary',
] as const;

const str = { type: 'string' };
const strList = { type: 'array', items: { type: 'string' } };

export const SLIDE_ITEM_SCHEMA = {
  type: 'object',
  additionalProperties: false,
  required: ['kind', 'heading', 'speaker_notes'],
  properties: {
    kind: { type: 'string', enum: [...SLIDE_KINDS] },
    heading: str,
    body: str,
    subtitle: str,
    duration_label: str,
    bullets: strList,
    key_terms: {
      type: 'array',
      items: {
        type: 'object',
        additionalProperties: false,
        required: ['term', 'definition'],
        properties: { term: str, definition: str },
      },
    },
    source_document: { type: 'string', enum: ['BS 7671', 'On-Site Guide', 'Guidance Note 3'] },
    reg_number: str,
    clause: str,
    why_it_matters: str,
    instruction: str,
    time_minutes: { type: 'integer', minimum: 1, maximum: 90 },
    group_size: { type: 'string', enum: ['individual', 'pairs', 'small_group', 'whole_class'] },
    success_criteria: str,
    problem: str,
    solution_steps: strList,
    questions: strList,
    belief: str,
    correction: str,
    exit_ticket: str,
    speaker_notes: str,
    stat_value: str,
    stat_caption: str,
    stat_source: str,
    left_heading: str,
    left_body: str,
    left_bullets: strList,
    right_heading: str,
    right_body: str,
    right_bullets: strList,
    quote: str,
    attribution: str,
    image_prompt: str,
    image_caption: str,
    diagram_kind: { type: 'string', enum: [...DIAGRAM_KINDS] },
    diagram_caption: str,
    slide_acs: strList,
  },
};

/* ───────────────── clean-up ───────────────── */

const A4_PATTERNS: RegExp[] = [
  /\bBS\s*7671\s*:\s*2018\s*(?:\+\s*A\d(?::\d{4})?)+/gi,
  /\s*[([]\s*(?:new|changed|updated|added|revised)?\s*(?:in|by)?\s*(?:A4(?::\s*2026)?|Amendment\s*4)\s*(?:change)?\s*[)\]]/gi,
  /\b(?:this\s+(?:is|was)\s+)?(?:new|changed|updated|added|introduced|revised)\s+(?:in|by|under)\s+(?:BS\s*7671\s*)?(?:A4(?::\s*2026)?|Amendment\s*4)\b[.,;:]?/gi,
  /\b(?:an?\s+)?(?:A4(?::\s*2026)?|Amendment\s*4)\s+(?:change|update|addition|requirement)s?\b[.,;:]?/gi,
  /\bA4:\s*2026\b/gi,
  // Prompt jargon that leaked into older decks ("paraphrased from the supplied context").
  /,?\s*\b(?:paraphrased\s+)?(?:in|from)\s+the\s+(?:supplied|provided|given)\s+(?:context|sources?|extracts?|material)\b/gi,
  /\b(?:the\s+)?(?:supplied|provided)\s+context\b/gi,
];

/** Strip facet ids, source ids, amendment tags and em dashes from one string. */
export function cleanSlideText(input: string): string {
  let s = String(input ?? '');
  s = s
    .replace(/\s*\((?:see\s+)?(?:facets?\b[^)]*|sources?\s+S?\d[^)]*|S\d+(?:\s*,\s*S\d+)*)\)/gi, '')
    .replace(/\bfacets?\s*#?[\d,\s]+/gi, '')
    .replace(/\[(?:S\d+(?:\s*,\s*S\d+)*)\]/g, '');
  for (const re of A4_PATTERNS) s = s.replace(re, (m) => (/^BS/i.test(m.trim()) ? 'BS 7671' : ''));
  return s
    .replace(/\s*—\s*/g, ', ')
    .replace(/\(\s*\)/g, '')
    .replace(/\s+([.,;:])/g, '$1')
    .replace(/([.,;:])[,;:]+/g, '$1')
    .replace(/[ \t]{2,}/g, ' ')
    .trim();
}

function cleanDeep(v: unknown): unknown {
  if (typeof v === 'string') return cleanSlideText(v);
  if (Array.isArray(v)) return v.map(cleanDeep).filter((x) => x !== '');
  if (v && typeof v === 'object') {
    const out: Record<string, unknown> = {};
    for (const [k, x] of Object.entries(v as Record<string, unknown>)) {
      // URLs and prompts are not slide text.
      out[k] = k === 'image_url' || k === 'image_prompt' ? x : cleanDeep(x);
    }
    return out;
  }
  return v;
}

const norm = (s: string) =>
  s
    .toLowerCase()
    .replace(/^(?:regulation|reg\.?|section)\s+/, '')
    .replace(/\s+/g, '');

/**
 * Clean one generated slide and enforce the citation rule. Returns the
 * slide to save (a regulation slide with an unlisted citation becomes a
 * concept slide).
 */
export function finaliseSlide(
  raw: Record<string, unknown>,
  sources: SlideSource[]
): Record<string, unknown> {
  const s = cleanDeep(raw) as Record<string, unknown>;
  const cap = (k: string, n: number) => {
    if (Array.isArray(s[k])) s[k] = (s[k] as unknown[]).slice(0, n);
  };
  cap('bullets', 6);
  cap('questions', 6);
  cap('solution_steps', 7);
  cap('left_bullets', 5);
  cap('right_bullets', 5);
  cap('key_terms', 4);
  if (Array.isArray(s.questions)) {
    s.questions = (s.questions as string[]).map((q) => q.replace(/^\s*\(?\d{1,2}[.)]\s+/, ''));
  }

  if (s.kind === 'reg_cite' || s.kind === 'pull_quote') {
    const ref = typeof s.reg_number === 'string' ? norm(s.reg_number) : '';
    const doc = typeof s.source_document === 'string' ? s.source_document : '';
    const hit =
      sources.find((x) => x.ref && norm(x.ref) === ref && (!doc || x.document === doc)) ??
      sources.find((x) => x.ref && norm(x.ref) === ref);
    if (ref && hit) {
      s.reg_number = hit.ref;
      s.source_document = hit.document;
      delete s.attribution;
    } else {
      const text = (s.clause ?? s.quote ?? s.body) as string | undefined;
      const why = s.why_it_matters as string | undefined;
      const notes = (s.speaker_notes as string | undefined) ?? '';
      for (const k of [
        'reg_number',
        'source_document',
        'clause',
        'quote',
        'attribution',
        'why_it_matters',
      ])
        delete s[k];
      s.kind = 'concept';
      if (text) s.body = text;
      if (why) s.speaker_notes = `${notes}${notes ? ' ' : ''}Why it matters: ${why}`.trim();
    }
  }
  return s;
}
