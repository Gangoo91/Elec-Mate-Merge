/**
 * Payload contract for the PDFMonkey "Safety Record" template
 * (pdf-templates/safety-record.src.html, template id in SAFETY_RECORD_TEMPLATE_ID).
 *
 * One template renders every Site Safety record. Each record type has a mapper
 * in ./mappers that turns its database row into this shape; the template knows
 * nothing about permits or isolations. A new record type is a data change.
 *
 * Rules for mappers (they print on a document handed to clients and inspectors):
 *  - Only state what the record holds. Never invent a value, a contact, a
 *    regulation or a verdict. A missing value is '' (the template hides it) or,
 *    where its absence matters, said plainly ("Not recorded").
 *  - The app records what a person entered. Never word a record as the app
 *    proving, approving or certifying anything.
 *  - A signature says how it was made (see sigMethod in ./common.ts).
 *  - UK English, sentence case for values; no SHOUTING except the template's own
 *    small-caps labels.
 */

export type Tone = 'ok' | 'live' | 'warn' | 'bad' | 'neutral';
export type Result = 'pass' | 'fail' | 'na' | 'yes' | 'no' | 'done' | 'open';

export interface KvRow {
  label: string;
  value: string;
  note?: string;
  /** Spans both columns — for a sentence rather than a short value. */
  wide?: boolean;
}

export type Section =
  | { heading: string; intro?: string; kind: 'kv'; rows: KvRow[] }
  | {
      heading: string;
      intro?: string;
      kind: 'checklist';
      items: { label: string; result: Result; result_label?: string; note?: string }[];
    }
  | {
      heading: string;
      intro?: string;
      kind: 'steps';
      steps: { n: string; title: string; detail?: string; extra?: string; done: boolean; when?: string; plan?: boolean }[];
    }
  | {
      heading: string;
      intro?: string;
      kind: 'table';
      columns: string[];
      rows: string[][];
      /** Optional CSS widths per column, e.g. ['9mm', '', '', '24mm']. */
      widths?: string[];
    }
  | { heading: string; intro?: string; kind: 'text'; paragraphs: string[] }
  | { heading: string; intro?: string; kind: 'items'; items: string[] }
  | {
      heading: string;
      intro?: string;
      /** Photo report: whole photos (never cropped), annotation pins on top. */
      kind: 'gallery';
      photos: {
        url: string;
        title: string;
        lines?: string[];
        /** x/y as 0–100 % of the image. */
        pins?: { n: number; x: number; y: number }[];
        legend?: string[];
      }[];
    };

export interface Signature {
  role: string;
  name: string;
  when?: string;
  method?: string;
  /** data: URL or https URL of the drawn signature, or '' */
  image?: string;
}

export interface SafetyPayload {
  meta: { kind: string; title: string; subtitle?: string; reference?: string; issued?: string; version?: string };
  status?: { label: string; tone: Tone };
  company: Record<string, string>;
  job: { number?: string; title?: string; client?: string; site?: string };
  prepared_by?: string;
  /** Cover label for prepared_by — "Recorded by" unless a type needs another word. */
  prepared_by_label?: string;
  cover_facts?: { label: string; value: string }[];
  headline?: { label: string; value: string; unit?: string; verdict?: string; verdict_label?: string }[];
  alert?: { tone: Tone; title?: string; text: string };
  /** Further alerts after `alert` (e.g. COSHH: review overdue AND preset figures). */
  alerts?: { tone: Tone; title?: string; text: string }[];
  sections: Section[];
  signatures?: Signature[];
  photos?: { url: string; caption?: string }[];
  audit?: { event: string; at: string }[];
  notes?: string[];
  disclaimer?: string;
}

/** What every mapper receives besides the row. */
export interface MapContext {
  job: SafetyPayload['job'];
  preparedBy: string;
  /** Turns a stored photo reference (URL or storage path) into a fetchable URL. */
  photoUrl: (ref: string) => string;
  /**
   * Sign-offs made through a remote link for this record, keyed by role
   * (safety_signing_tokens). Lets a mapper say a signature came by link.
   */
  remote: Record<string, { name: string; signedAt: string; image: string }>;
}

export type Mapper = (record: Record<string, unknown>, ctx: MapContext) => Omit<SafetyPayload, 'company' | 'job'> & {
  job?: Partial<SafetyPayload['job']>;
};
