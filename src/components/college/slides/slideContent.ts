import { cleanLessonText } from '@/lib/lessons/cleanLessonText';
import type { Slide, SlideKind } from '@/hooks/useSlideDeck';

/* ==========================================================================
   Slide content rules, shared by the on-screen slide (SlideCanvas) and the
   PowerPoint export, so the projector and the download say the same thing.

   - Text is cleaned before it is shown: no internal "facet" ids, no
     "A4" / "new in Amendment 4" tags (the amendment flag in the regulation
     data records the source edition, not what changed, so any such claim
     is unreliable), and no doubled numbering ("1. Recall: ...").
   - A regulation slide is a paraphrase of the source, never a verbatim
     quote, and it names the document and the section.
   ========================================================================== */

/** Slide fields the newer generator writes that the hook's type predates. */
export type DeckSlide = Slide & {
  /** 'BS 7671' | 'On-Site Guide' | 'Guidance Note 3' for a regulation slide. */
  source_document?: string;
};

export const KIND_LABEL: Record<SlideKind, string> = {
  title: 'Lesson',
  starter: 'Starter',
  objectives: 'Objectives',
  concept: 'Concept',
  reg_cite: 'Regulation',
  pull_quote: 'Regulation',
  big_stat: 'Key figure',
  two_column: 'Compare',
  image_concept: 'Concept',
  diagram_caption: 'Diagram',
  activity: 'Activity',
  worked_example: 'Worked example',
  check_understanding: 'Check for understanding',
  misconception: 'Misconception',
  summary: 'Summary',
  plenary: 'Plenary',
};

const A4_PATTERNS: RegExp[] = [
  // "BS 7671:2018+A4:2026" and friends: name the standard, not an amendment.
  /\bBS\s*7671\s*:\s*2018\s*(?:\+\s*A\d(?::\d{4})?)+/gi,
  /\s*[([]\s*(?:new|changed|updated|added|revised)?\s*(?:in|by)?\s*(?:A4(?::\s*2026)?|Amendment\s*4)\s*(?:change)?\s*[)\]]/gi,
  /\b(?:this\s+(?:is|was)\s+)?(?:new|changed|updated|added|introduced|revised)\s+(?:in|by|under)\s+(?:BS\s*7671\s*)?(?:A4(?::\s*2026)?|Amendment\s*4)\b[.,;:]?/gi,
  /\b(?:an?\s+)?(?:A4(?::\s*2026)?|Amendment\s*4)\s+(?:change|update|addition|requirement)s?\b[.,;:]?/gi,
  /\bA4:\s*2026\b/gi,
  // Prompt jargon that leaked into older decks ("paraphrased from the supplied context").
  /,?\s*\b(?:paraphrased\s+)?(?:in|from)\s+the\s+(?:supplied|provided|given)\s+(?:context|sources?|extracts?|material)\b/gi,
  /\b(?:the\s+)?(?:supplied|provided)\s+context\b/gi,
];

/** Clean one string for display. */
export function cleanSlideText(s: string | null | undefined): string {
  let out = cleanLessonText(s);
  for (const re of A4_PATTERNS) {
    out = out.replace(re, (m) => (/^BS/i.test(m.trim()) ? 'BS 7671' : ''));
  }
  out = out
    .replace(/\(\s*\)/g, '')
    .replace(/\s+([.,;:])/g, '$1')
    .replace(/([.,;:])[,;:]+/g, '$1')
    .replace(/^[\s,;:.]+/, '')
    .replace(/\s{2,}/g, ' ')
    .trim();
  // A stripped lead-in can leave "so check it." — keep the sentence capitalised.
  const first = String(s ?? '').trim()[0];
  if (out && first && first === first.toUpperCase() && /[a-z]/.test(out[0])) {
    out = out[0].toUpperCase() + out.slice(1);
  }
  return out;
}

/** "1. Recall: State..." -> "Recall: State..." (the list numbers itself). */
export function stripListNumber(s: string): string {
  return s.replace(/^\s*(?:\(?\d{1,2}[.)]|[-•*])\s+/, '').trim();
}

/** A Bloom tag on a question ("Recall:", "Apply:") shown as its own label. */
export function splitQuestionTag(q: string): { tag: string | null; text: string } {
  const m = q.match(
    /^(Recall|Remember|Understand|Explain|Apply|Analyse|Analyze|Evaluate|Create|Stretch|Regulation reference|Regulation)\s*[:-]\s*(.+)$/i
  );
  if (!m) return { tag: null, text: q };
  const tag = m[1].toLowerCase() === 'analyze' ? 'Analyse' : m[1][0].toUpperCase() + m[1].slice(1);
  return { tag, text: m[2] };
}

/** Pull "A) .. B) .. C) .. D) .." options out of a plenary body. */
export function parseOptions(body: string): { stem: string; options: string[] } | null {
  const re = /(?:^|\s)\(?([A-D])[).:]\s+/g;
  const hits: Array<{ letter: string; at: number; end: number }> = [];
  let m: RegExpExecArray | null;
  while ((m = re.exec(body))) hits.push({ letter: m[1], at: m.index, end: re.lastIndex });
  const letters = hits.map((h) => h.letter).join('');
  if (!letters.startsWith('ABC')) return null;
  const options = hits.map((h, i) =>
    body
      .slice(h.end, hits[i + 1]?.at ?? body.length)
      .trim()
      .replace(/[.;]$/, '')
  );
  return { stem: body.slice(0, hits[0].at).trim(), options };
}

/**
 * True when reg_number looks like a real reference ("411.3.2", "Table 41.3",
 * "Appendix 4", "Section 12.5") rather than a sentence the model put there.
 */
export function isReference(s: string | null | undefined): boolean {
  if (!s) return false;
  const t = s.trim();
  if (t.length > 24) return false;
  return /^(?:Regulation\s+|Reg\.?\s+|Section\s+|Table\s+|Appendix\s+|Chapter\s+|Part\s+)?[A-Z]?\d{1,3}(?:\.\d{1,3}){0,4}[a-z]?$/i.test(
    t
  );
}

/** "BS 7671 · Regulation 411.3.2" / "On-Site Guide · Section 12.5". */
export function sourceLine(slide: DeckSlide): string | null {
  const doc = slide.source_document ? cleanSlideText(slide.source_document) : '';
  const ref = isReference(slide.reg_number) ? slide.reg_number!.trim() : '';
  const refLabel = ref
    ? /^[A-Za-z]/.test(ref)
      ? ref
      : doc && doc !== 'BS 7671'
        ? `Section ${ref}`
        : `Regulation ${ref}`
    : '';
  // Older decks put free text in `attribution` ("BS 7671 principle,
  // paraphrased from the supplied context"). Keep only the document name.
  const attrDoc = docName(slide.attribution) ?? docName(slide.stat_source);
  const parts = [doc || attrDoc || '', refLabel].filter(Boolean);
  return parts.length ? parts.join(' · ') : null;
}

function docName(s: string | null | undefined): string | null {
  const m = String(s ?? '').match(/BS\s*7671|On-Site Guide|\bOSG\b|Guidance Note\s*3|\bGN3\b/i);
  if (!m) return null;
  const t = m[0].toUpperCase().replace(/\s+/g, '');
  if (t.startsWith('BS')) return 'BS 7671';
  if (t === 'OSG' || t.startsWith('ON-SITE')) return 'On-Site Guide';
  return 'Guidance Note 3';
}

/** A regulation slide with no section reference: the editor flags it. */
export function missingReference(slide: Slide): boolean {
  return (
    (slide.kind === 'reg_cite' || slide.kind === 'pull_quote') && !isReference(slide.reg_number)
  );
}

const STRING_KEYS = [
  'heading',
  'eyebrow',
  'body',
  'subtitle',
  'duration_label',
  'reg_number',
  'clause',
  'why_it_matters',
  'instruction',
  'success_criteria',
  'problem',
  'belief',
  'correction',
  'exit_ticket',
  'speaker_notes',
  'stat_value',
  'stat_caption',
  'stat_source',
  'left_heading',
  'left_body',
  'right_heading',
  'right_body',
  'quote',
  'attribution',
  'image_caption',
  'diagram_caption',
  'source_document',
] as const;

const LIST_KEYS = [
  'bullets',
  'solution_steps',
  'questions',
  'left_bullets',
  'right_bullets',
] as const;

/** A display copy of a slide with every text field cleaned. */
export function normaliseSlide(slide: Slide): DeckSlide {
  const out: DeckSlide = { ...(slide as DeckSlide) };
  const rec = out as unknown as Record<string, unknown>;
  for (const k of STRING_KEYS) {
    const v = rec[k];
    if (typeof v === 'string') {
      const c = cleanSlideText(v);
      if (c) rec[k] = c;
      else delete rec[k];
    }
  }
  for (const k of LIST_KEYS) {
    const v = rec[k];
    if (Array.isArray(v)) {
      rec[k] = v
        .filter((x): x is string => typeof x === 'string')
        .map((x) => stripListNumber(cleanSlideText(x)))
        .filter(Boolean);
    }
  }
  if (Array.isArray(out.key_terms)) {
    out.key_terms = out.key_terms
      .map((t) => ({ term: cleanSlideText(t.term), definition: cleanSlideText(t.definition) }))
      .filter((t) => t.term);
  }
  if (Array.isArray(out.slide_acs)) {
    out.slide_acs = out.slide_acs.map((a) => cleanSlideText(a)).filter(Boolean);
  }
  return out;
}

/** Words of on-slide text (speaker notes excluded). */
export function slideWordCount(s: DeckSlide): number {
  const parts: string[] = [];
  const rec = s as unknown as Record<string, unknown>;
  for (const k of STRING_KEYS) {
    if (k === 'speaker_notes' || k === 'image_caption' || k === 'eyebrow') continue;
    const v = rec[k];
    if (typeof v === 'string') parts.push(v);
  }
  for (const k of LIST_KEYS) {
    const v = rec[k];
    if (Array.isArray(v)) parts.push(...(v as string[]));
  }
  for (const t of s.key_terms ?? []) parts.push(t.term, t.definition);
  return parts.join(' ').split(/\s+/).filter(Boolean).length;
}

/** Above this a slide is hard to read from the back of a workshop. */
export const WORDS_COMFORTABLE = 70;

/** Image-led layouts. */
export function wantsPhoto(s: Slide): boolean {
  return (
    !!s.image_prompt &&
    (s.kind === 'image_concept' ||
      s.kind === 'starter' ||
      s.kind === 'concept' ||
      s.kind === 'title' ||
      s.kind === 'plenary')
  );
}

/** Alt text for a slide photo. */
export function photoAlt(s: DeckSlide): string {
  return s.image_caption || (s.heading ? `Photo for the slide: ${s.heading}` : 'Slide photo');
}
