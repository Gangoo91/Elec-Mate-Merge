/**
 * The AI-use record on a piece of evidence (ELE-2048).
 *
 * JCQ "AI Use in Assessments" (Apr 2025): name the AI tool and the date, keep
 * what was asked and what it produced, and say briefly how it was used. Ofqual
 * (advice note, 27 Apr 2026): authenticity declarations; detection is evidence,
 * never the sole determinant.
 *
 * The capture sheet builds this record when it saves (buildAiUseRecord) and
 * sends it as metadata.ai_use; the database moves it to portfolio_items.ai_use
 * and sets ai_assisted (sticky for the learner). Every surface that shows it
 * (assessor, IQA, the learner's submit sheet, the export pack) reads it through
 * describeAiUse so the wording is the same everywhere.
 */

export type AiToolId = 'voice_to_star' | 'capture_assistant' | 'photo_reader';
export type AiField = 'title' | 'description' | 'reflection';

export const AI_TOOL_NAME: Record<AiToolId, string> = {
  voice_to_star: 'Elec-Mate reflective account drafter',
  capture_assistant: 'Elec-Mate on-site capture assistant',
  photo_reader: 'Elec-Mate photo reader',
};

export const AI_FIELD_LABEL: Record<AiField, string> = {
  title: 'Title',
  description: 'Description',
  reflection: 'Reflective account',
};

/** One run of an AI tool during the capture: what was sent and what came back. */
export interface AiRun {
  tool: AiToolId;
  /** The edge function that ran it. */
  fn: string;
  model?: string;
  at: string;
  /** What the learner gave it (their words, the photo descriptions, counts). */
  prompt: Record<string, unknown>;
  /** What it produced, as it produced it. */
  output?: Record<string, unknown>;
}

export interface AiFieldUse {
  field: AiField;
  from: AiToolId;
  /** The AI's text for this field, as generated. */
  ai_text: string;
  /** Share of the saved text's words that came from the AI text, 0 to 1. */
  ai_share: number;
  /** The learner changed the AI text before saving. */
  edited: boolean;
}

export interface AiUseRecord {
  v: 1;
  assisted: boolean;
  recorded_at: string;
  tools: AiRun[];
  fields: AiFieldUse[];
  /** Criteria the learner claimed that an AI tool had suggested. */
  criteria_from_ai: string[];
  /** The AI ran but none of its words were kept. */
  ran_not_used: boolean;
}

const MAX = 4000;
const clip = (s: unknown) => (typeof s === 'string' ? s.slice(0, MAX) : s);

/** Deep-clip long strings so a record stays small. */
function clipDeep<T>(v: T, depth = 0): T {
  if (depth > 4) return v;
  if (typeof v === 'string') return clip(v) as T;
  if (Array.isArray(v)) return v.slice(0, 20).map((x) => clipDeep(x, depth + 1)) as T;
  if (v && typeof v === 'object') {
    const out: Record<string, unknown> = {};
    for (const [k, x] of Object.entries(v as Record<string, unknown>))
      out[k] = clipDeep(x, depth + 1);
    return out as T;
  }
  return v;
}

const words = (s: string) =>
  s
    .toLowerCase()
    .replace(/[^a-z0-9\s']/g, ' ')
    .split(/\s+/)
    .filter(Boolean);
const norm = (s: string) => words(s).join(' ');

/**
 * Share of the final text's words that also appear in the AI text (multiset
 * overlap), 0 to 1. A learner who rewrote it in their own words scores low.
 */
export function aiShare(aiText: string, finalText: string): number {
  const f = words(finalText);
  if (!f.length) return 0;
  const bag = new Map<string, number>();
  for (const w of words(aiText)) bag.set(w, (bag.get(w) ?? 0) + 1);
  let hit = 0;
  for (const w of f) {
    const n = bag.get(w) ?? 0;
    if (n > 0) {
      hit += 1;
      bag.set(w, n - 1);
    }
  }
  return Math.round((hit / f.length) * 100) / 100;
}

/** At or above this share the saved text is treated as AI-drafted. */
export const AI_DRAFTED_AT = 0.5;

export interface BuildArgs {
  runs: AiRun[];
  /** The candidate AI texts per field, with the tool that wrote each. */
  candidates: Array<{ field: AiField; from: AiToolId; text: string }>;
  final: Record<AiField, string>;
  criteriaFromAi: string[];
}

/** The record to save, or null when no AI tool ran on this capture. */
export function buildAiUseRecord({
  runs,
  candidates,
  final,
  criteriaFromAi,
}: BuildArgs): AiUseRecord | null {
  if (!runs.length && !criteriaFromAi.length) return null;
  const fields: AiFieldUse[] = [];
  for (const field of ['title', 'description', 'reflection'] as AiField[]) {
    const saved = (final[field] ?? '').trim();
    if (!saved) continue;
    // The candidate that best explains the saved text.
    let best: AiFieldUse | null = null;
    for (const c of candidates.filter((x) => x.field === field && x.text.trim())) {
      const share = aiShare(c.text, saved);
      if (!best || share > best.ai_share) {
        best = {
          field,
          from: c.from,
          ai_text: c.text.trim().slice(0, MAX),
          ai_share: share,
          edited: norm(c.text) !== norm(saved),
        };
      }
    }
    // A short title is AI-drafted only when it is (near enough) the suggestion.
    const threshold = field === 'title' ? 0.8 : AI_DRAFTED_AT;
    if (best && best.ai_share >= threshold) fields.push(best);
  }
  return {
    v: 1,
    assisted: fields.length > 0,
    recorded_at: new Date().toISOString(),
    tools: runs.map((r) => clipDeep(r)),
    fields,
    criteria_from_ai: criteriaFromAi.slice(0, 50),
    ran_not_used: runs.length > 0 && fields.length === 0,
  };
}

/* ── Reading it back ───────────────────────────────────────────────────── */

export function asAiUse(v: unknown): AiUseRecord | null {
  if (!v || typeof v !== 'object') return null;
  const o = v as Partial<AiUseRecord>;
  if (!Array.isArray(o.tools) && !Array.isArray(o.fields)) return null;
  return {
    v: 1,
    assisted: !!o.assisted,
    recorded_at: typeof o.recorded_at === 'string' ? o.recorded_at : '',
    tools: Array.isArray(o.tools) ? o.tools : [],
    fields: Array.isArray(o.fields) ? o.fields : [],
    criteria_from_ai: Array.isArray(o.criteria_from_ai) ? o.criteria_from_ai : [],
    ran_not_used: !!o.ran_not_used,
  };
}

const pct = (n: number) => `${Math.round(n * 100)}%`;

/** One plain line per field, for the assessor, IQA, learner and export pack. */
export function describeField(f: AiFieldUse): string {
  const tool = AI_TOOL_NAME[f.from] ?? 'an AI tool';
  const label = AI_FIELD_LABEL[f.field] ?? f.field;
  if (!f.edited) return `${label}: drafted by the ${tool} and kept as drafted.`;
  return `${label}: drafted by the ${tool}, then edited by the learner (${pct(f.ai_share)} of the saved words are from the draft).`;
}

/** The short summary line: "AI drafted the reflective account and title". */
export function summariseAiUse(r: AiUseRecord | null, assisted?: boolean): string | null {
  if (!r) return assisted ? 'AI drafted part of this evidence.' : null;
  if (r.fields.length) {
    const names = r.fields.map((f) => (AI_FIELD_LABEL[f.field] ?? f.field).toLowerCase());
    const list =
      names.length > 1
        ? `${names.slice(0, -1).join(', ')} and ${names[names.length - 1]}`
        : names[0];
    return `AI drafted the ${list}.`;
  }
  if (r.criteria_from_ai.length)
    return `AI suggested ${r.criteria_from_ai.length === 1 ? 'one of the criteria' : `${r.criteria_from_ai.length} of the criteria`} claimed. The words are the learner's own.`;
  if (r.ran_not_used) return 'AI ran during capture. None of its words were kept.';
  return null;
}

/** Tool lines: name, model and when, as JCQ asks. */
export function describeTools(r: AiUseRecord): string[] {
  const seen = new Set<string>();
  const out: string[] = [];
  for (const t of r.tools) {
    const key = `${t.tool}|${t.model ?? ''}`;
    if (seen.has(key)) continue;
    seen.add(key);
    const when = t.at
      ? new Date(t.at).toLocaleString('en-GB', {
          day: 'numeric',
          month: 'short',
          year: 'numeric',
          hour: '2-digit',
          minute: '2-digit',
          timeZone: 'Europe/London',
        })
      : '';
    out.push(
      `${AI_TOOL_NAME[t.tool] ?? t.tool}${t.model ? ` (${t.model})` : ''}${when ? `, ${when}` : ''}`
    );
  }
  return out;
}

/** What the learner gave the tool, in words (their notes, photo count). */
export function describePrompt(run: AiRun): string {
  const p = run.prompt ?? {};
  const parts: string[] = [];
  const said = typeof p.transcript === 'string' ? p.transcript.trim() : '';
  if (said) parts.push(`Said or typed: "${said}"`);
  const typed = typeof p.description === 'string' ? p.description.trim() : '';
  if (typed) parts.push(`Description: "${typed}"`);
  const context = typeof p.context === 'string' ? p.context.trim() : '';
  if (context && context !== typed) parts.push(`Notes: "${context}"`);
  const files = Array.isArray(p.files) ? p.files.length : typeof p.files === 'number' ? p.files : 0;
  if (files) parts.push(`${files} photo${files === 1 ? '' : 's'} or file${files === 1 ? '' : 's'}`);
  return parts.join(' · ') || 'No learner input recorded.';
}

/** The declaration paragraph about AI, shared by the submit sheet and its tests. */
export const AI_DECLARATION_TEXT =
  'Where I used AI tools in the app, for example to draft a reflective account from my voice notes or photos, that is recorded on the evidence. ' +
  'I have checked and edited what the AI wrote so it describes what I really did, and I have not used any other AI tool on this evidence without saying so.';
