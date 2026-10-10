/**
 * Generic evidence import (ELE-1974): read a CSV exported from another
 * e-portfolio, map its columns, and turn each row into an evidence item for a
 * learner. Nothing here knows a vendor's format: the person importing maps the
 * columns, helped by a guess from common header words.
 *
 * Public facts about the vendors (checked 10 Oct 2026, cited in the ELE-1709
 * spike note): OneFile's support site describes a portfolio download as a ZIP
 * of plans, assessments, reviews and progress with attachments; its REST API
 * needs a customer token raised through support. Aptem publishes an API
 * reference (X-API-Token, per tenant) but no evidence export endpoint. Bud and
 * Smart Assessor list CSV export in their G-Cloud service descriptions. None
 * publishes a self-serve evidence export schema. So the import takes a CSV the
 * college produces, plus the files, and never claims to read a vendor format.
 */

export type ImportSource = 'onefile' | 'bud' | 'smart_assessor' | 'aptem' | 'other';

export const IMPORT_SOURCES: Array<{ key: ImportSource; label: string }> = [
  { key: 'onefile', label: 'OneFile' },
  { key: 'bud', label: 'Bud' },
  { key: 'smart_assessor', label: 'Smart Assessor' },
  { key: 'aptem', label: 'Aptem' },
  { key: 'other', label: 'Another system' },
];

export type ImportField =
  | 'learner'
  | 'title'
  | 'description'
  | 'criteria'
  | 'assessor'
  | 'assessed_on'
  | 'outcome'
  | 'reference'
  | 'files';

export const IMPORT_FIELDS: Array<{
  key: ImportField;
  label: string;
  required?: boolean;
  hint: string;
  words: string[];
}> = [
  {
    key: 'learner',
    label: 'Learner',
    required: true,
    hint: 'ULN, email or your learner reference',
    words: ['uln', 'email', 'learner', 'student', 'reference', 'learnref'],
  },
  {
    key: 'title',
    label: 'Evidence title',
    required: true,
    hint: 'What the evidence is',
    words: ['title', 'evidence', 'name', 'activity', 'task'],
  },
  {
    key: 'description',
    label: 'Description',
    hint: 'Optional',
    words: ['description', 'detail', 'notes', 'summary', 'narrative'],
  },
  {
    key: 'criteria',
    label: 'Criteria',
    hint: 'Codes such as "301 1.2" or "Unit 301 AC 1.2", separated by ; or ,',
    words: ['criteria', 'criterion', 'ac', 'mapped', 'ksb', 'outcome code'],
  },
  {
    key: 'assessor',
    label: 'Assessed by',
    hint: 'Original assessor',
    words: ['assessor', 'assessed by', 'marker', 'signed by'],
  },
  {
    key: 'assessed_on',
    label: 'Assessed on',
    hint: 'Date, for example 14/03/2026',
    words: ['assessed on', 'assessment date', 'date assessed', 'signed off', 'date'],
  },
  {
    key: 'outcome',
    label: 'Outcome',
    hint: 'For example Met, Achieved, Not yet',
    words: ['outcome', 'result', 'status', 'decision', 'grade'],
  },
  {
    key: 'reference',
    label: 'Original reference',
    hint: 'The id in the old system',
    words: ['id', 'ref', 'reference', 'evidence id'],
  },
  {
    key: 'files',
    label: 'File names',
    hint: 'File names in your ZIP or upload, separated by ;',
    words: ['file', 'attachment', 'document', 'filename'],
  },
];

export type ColumnMap = Partial<Record<ImportField, string>>;

/** First header that contains one of the field's words, without reusing a header. */
export function guessColumns(headers: string[]): ColumnMap {
  const used = new Set<string>();
  const map: ColumnMap = {};
  for (const f of IMPORT_FIELDS) {
    const hit = headers.find(
      (h) => !used.has(h) && f.words.some((w) => h.toLowerCase().includes(w))
    );
    if (hit) {
      map[f.key] = hit;
      used.add(hit);
    }
  }
  return map;
}

export interface ParsedCriterion {
  unit_code: string;
  ac_code: string;
}

/** Parse one criterion reference. Returns null when it cannot be read with confidence. */
export function parseCriterion(raw: string): ParsedCriterion | null {
  const s = raw.trim();
  if (!s) return null;
  let m = s.match(
    /unit\s*([A-Za-z0-9/._-]+?)[\s,:-]*(?:ac|assessment criteri\w*|criteri\w*)\s*([0-9]+(?:\.[0-9]+)*)/i
  );
  if (m) return { unit_code: m[1].replace(/[.,:-]+$/, ''), ac_code: m[2] };
  m = s.match(
    /^([A-Za-z]{0,4}[0-9]{2,4}[A-Za-z]?)\s*(?:[/:\s]|ac)\s*([0-9]+\.[0-9]+(?:\.[0-9]+)?)$/i
  );
  if (m) return { unit_code: m[1], ac_code: m[2] };
  m = s.match(/^([0-9]{3,4})\.([0-9]+\.[0-9]+)$/);
  if (m) return { unit_code: m[1], ac_code: m[2] };
  return null;
}

export function splitList(raw: string | undefined | null): string[] {
  return (raw ?? '')
    .split(/[;\n|]+|,(?=\s*(?:unit\s|[A-Za-z]{0,4}[0-9]))/i)
    .map((x) => x.trim())
    .filter(Boolean);
}

/** dd/mm/yyyy, dd-mm-yyyy, yyyy-mm-dd or a date-time. UK order for slashes. */
export function parseUkDate(raw: string | undefined | null): string | null {
  const s = (raw ?? '').trim();
  if (!s) return null;
  let m = s.match(/^(\d{4})-(\d{2})-(\d{2})/);
  if (m) return `${m[1]}-${m[2]}-${m[3]}`;
  m = s.match(/^(\d{1,2})[/.-](\d{1,2})[/.-](\d{2,4})/);
  if (m) {
    const y = m[3].length === 2 ? `20${m[3]}` : m[3];
    const d = Number(m[1]);
    const mo = Number(m[2]);
    if (d >= 1 && d <= 31 && mo >= 1 && mo <= 12)
      return `${y}-${String(mo).padStart(2, '0')}-${String(d).padStart(2, '0')}`;
  }
  return null;
}

export interface RosterLearner {
  id: string;
  user_id: string | null;
  name: string | null;
  email: string | null;
  uln: string | null;
  learn_ref_number: string | null;
}

export function matchLearner(key: string, roster: RosterLearner[]): RosterLearner | null {
  const k = key.trim().toLowerCase();
  if (!k) return null;
  return (
    roster.find((r) => (r.uln ?? '').trim() === k) ??
    roster.find((r) => (r.email ?? '').trim().toLowerCase() === k) ??
    roster.find((r) => (r.learn_ref_number ?? '').trim().toLowerCase() === k) ??
    null
  );
}

/* ── File types a learner's portfolio accepts ───────────────────────────
   Mirrors the portfolio-evidence bucket's allowed types, so a file that the
   portfolio would refuse is flagged at import, not when the learner adds it. */

const EXT_MIME: Record<string, string> = {
  pdf: 'application/pdf',
  doc: 'application/msword',
  docx: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
  jpg: 'image/jpeg',
  jpeg: 'image/jpeg',
  png: 'image/png',
  gif: 'image/gif',
  webp: 'image/webp',
  mp4: 'video/mp4',
  mov: 'video/quicktime',
  webm: 'video/webm',
  mp3: 'audio/mpeg',
  m4a: 'audio/x-m4a',
  aac: 'audio/aac',
  wav: 'audio/wav',
  ogg: 'audio/ogg',
};

/** The portfolio's MIME type for a file name, or null if the portfolio cannot hold it. */
export function evidenceMime(name: string): string | null {
  const ext = name.toLowerCase().split('.').pop() ?? '';
  return EXT_MIME[ext] ?? null;
}

export const EVIDENCE_TYPES_LINE =
  'PDF, Word, images (JPG, PNG, GIF, WebP), video (MP4, MOV, WebM) and audio';
