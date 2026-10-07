// deno-lint-ignore-file no-explicit-any
/**
 * portfolio-export-pack — the builders (ELE-1881 / ELE-1883 / ELE-2017).
 *
 *   evidence_pack  indexed ZIP: Read me first.html + manifest.json, the
 *                  PDFMonkey summary, every evidence file named and hashed,
 *                  witness statements, declarations, hours, gateway, audit
 *   gateway_pack   the EPAO gateway pack PDF (readiness checklist, the three
 *                  declarations, qualification and English/maths evidence,
 *                  hours statement) plus the supporting files, as a ZIP
 *
 * Everything is read with the service role AFTER index.ts has decided the
 * caller may see this learner. What the app does not hold is shown as
 * "To attach", never invented.
 */
import type { SupabaseClient } from 'https://esm.sh/@supabase/supabase-js@2.49.4';
import { ZipWriter } from '../_shared/data-export-zip.ts';
import { pdfPageCount, renderLearnerRecord } from '../_shared/learner-record-pdf.ts';

type Row = Record<string, any>;
export type PackKind = 'evidence_pack' | 'gateway_pack';

export interface BuildCtx {
  admin: SupabaseClient;
  /** Client carrying the caller's JWT: the RPCs that check auth.uid() run as them. */
  asCaller: SupabaseClient;
  learnerId: string;
  exportId: string;
  kind: PackKind;
  access: 'learner' | 'staff';
  requestedBy: string;
  requestedByName: string;
  progress: (msg: string) => Promise<void>;
}

export interface BuildResult {
  zipPath: string;
  pdfPath: string;
  zipBytes: number;
  pdfPages: number | null;
  fileCount: number;
  zipSha256: string;
  counts: Record<string, number>;
}

export const EXPORT_BUCKET = 'portfolio-exports';
/** Evidence bytes held in memory for one ZIP. The edge runtime has 256 MB. */
const FILE_BYTES_CAP = 140 * 1024 * 1024;
const PDF_PHOTOS_PER_ITEM = 6;
const PDF_PHOTOS_TOTAL = 90;
/** Funding-pack documents that belong with the gateway (college_learner_evidence.kind). */
const GATEWAY_DOC_KINDS = [
  'fs_decision',
  'fs_exemption',
  'epao_agreement',
  'epa_employment_statement',
  'rpl_summary',
  'net_readiness_checklist',
];

/**
 * NET's Readiness for Assessment checklists (read 7 Oct 2026). Controlled
 * forms: the pack names them "to attach" and quotes only these sentences.
 */
const NET_CHECKLIST = {
  am2s: {
    name: 'Readiness for Assessment checklist for the AM2S v1',
    version: 'version 25.12',
    url: 'https://www.netservices.org.uk/wp-content/uploads/2025/11/NET-AM2S-v1-Candidate-Checklist-25-12-WE2.pdf',
    quote:
      'The completed, signed document is a compulsory gateway to completion check to confirm readiness before the Apprenticeship Assessment can be booked. It must be submitted to NET as part of the Request for Assessment.',
  },
  am2d: {
    name: 'Readiness for Assessment checklist for the AM2D',
    version: 'version 03.26',
    url: 'https://www.netservices.org.uk/wp-content/uploads/2025/01/NET-AM2D-Candidate-Checklist-2603-WE2.pdf',
    quote:
      'The completed, signed document is a compulsory gateway check to confirm readiness for assessment before the Apprenticeship Assessment can be booked. It must be submitted to NET as part of the Request for Assessment.',
  },
} as const;
const NET_READINESS_PAGE = 'https://www.netservices.org.uk/readiness-for-assessment/';

/** The numbered sources printed at the foot of the gateway pack. */
function gatewaySources(
  wording: { title?: string; url?: string } | null,
  net: (typeof NET_CHECKLIST)[keyof typeof NET_CHECKLIST] | null
): Array<{ ref: string; text: string; url: string }> {
  const out: Array<{ ref: string; text: string; url: string }> = [];
  if (wording?.url) {
    out.push({
      ref: '[1]',
      // Quoted exactly: the ST0152 page reads “ate gateway”.
      text: `${wording.title}: “the employer must provide a signed declaration to the EPAO ${wording.url.includes('st0152') ? 'ate [sic] gateway' : 'at gateway'}, confirming that the apprentice has demonstrated all the behaviours during the on-programme period to the level and consistency required for occupational competence” and “The apprentice’s employer must be content that the apprentice is occupationally competent. That is, they are deemed to be working at or above the level set out in the apprenticeship standard and ready to undertake the EPA.”`,
      url: wording.url,
    });
  }
  if (net) {
    out.push({
      ref: '[2]',
      text: `NET, ${net.name}, ${net.version}. Index of NET’s checklists: ${NET_READINESS_PAGE}`,
      url: net.url,
    });
  }
  return out;
}

// ── Small helpers ───────────────────────────────────────────────────────────

const TZ = 'Europe/London';
export const fmtDate = (iso?: string | null) =>
  iso
    ? new Date(iso.length === 10 ? `${iso}T12:00:00Z` : iso).toLocaleDateString('en-GB', {
        timeZone: TZ,
        day: 'numeric',
        month: 'long',
        year: 'numeric',
      })
    : '';
export const fmtDateTime = (iso?: string | null) =>
  iso
    ? new Date(iso)
        .toLocaleString('en-GB', {
          timeZone: TZ,
          day: 'numeric',
          month: 'long',
          year: 'numeric',
          hour: '2-digit',
          minute: '2-digit',
        })
        .replace(' at ', ', ')
    : '';
export const hrs = (n: unknown) => {
  const v = Number(n);
  return Number.isFinite(v) ? `${v.toLocaleString('en-GB', { maximumFractionDigits: 1 })}` : '0';
};
export const plural = (n: number, one: string, many = `${one}s`) => `${n} ${n === 1 ? one : many}`;
export const fileSafe = (s: string, max = 60) =>
  (s || 'untitled')
    .replace(/[\\/:*?"<>|\u0000-\u001f]+/g, '-')
    .replace(/\s+/g, ' ')
    .trim()
    .slice(0, max)
    .trim() || 'untitled';
const esc = (s: unknown) =>
  String(s ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
const hrefPath = (p: string) => p.split('/').map(encodeURIComponent).join('/');

export async function sha256Hex(bytes: Uint8Array): Promise<string> {
  const d = await crypto.subtle.digest('SHA-256', bytes as BufferSource);
  return [...new Uint8Array(d)].map((b) => b.toString(16).padStart(2, '0')).join('');
}

function csvCell(v: unknown): string {
  if (v === null || v === undefined) return '';
  const s = typeof v === 'object' ? JSON.stringify(v) : String(v);
  const safe = /^[=+\-@]/.test(s) ? `'${s}` : s;
  return /[",\n\r]/.test(safe) ? `"${safe.replace(/"/g, '""')}"` : safe;
}
const toCsv = (cols: string[], rows: unknown[][]) =>
  '﻿' + [cols.map(csvCell).join(','), ...rows.map((r) => r.map(csvCell).join(','))].join('\r\n');

/** A storage URL (public, signed or authenticated) → bucket + object path. */
export function storageRef(
  url: string | null | undefined
): { bucket: string; path: string } | null {
  if (!url) return null;
  const m = url.match(
    /\/storage\/v1\/(?:object|render\/image)\/(?:public|sign|authenticated)\/([^/]+)\/([^?#]+)/
  );
  if (!m) return null;
  return { bucket: m[1], path: decodeURIComponent(m[2]) };
}

/** White-ink signature (the app's dark pad) wrapped so it reads on paper. */
function signatureSvg(dataUrl: string): string {
  return `<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="600" height="200" viewBox="0 0 600 200">
<defs><filter id="ink"><feColorMatrix type="matrix" values="-1 0 0 0 1  0 -1 0 0 1  0 0 -1 0 1  0 0 0 1 0"/></filter></defs>
<rect width="600" height="200" fill="#ffffff"/>
<image width="600" height="200" preserveAspectRatio="xMidYMid meet" filter="url(#ink)" xlink:href="${esc(dataUrl)}"/>
</svg>`;
}
/** A real drawn signature; a 1×1 placeholder (tests, old rows) is not shown as one. */
export const isPng = (s: unknown): s is string =>
  typeof s === 'string' && s.startsWith('data:image/png;base64,') && s.length > 400;

/** Two half-width cells per row: a lone half before a wide cell, or at the end, goes wide. */
export function pairFacts<T extends { wide?: boolean }>(facts: T[]): T[] {
  const out = facts.map((f) => ({ ...f }));
  let run: T[] = [];
  const close = () => {
    if (run.length % 2 === 1) run[run.length - 1].wide = true;
    run = [];
  };
  for (const f of out) {
    if (f.wide) close();
    else run.push(f);
  }
  close();
  return out;
}

// ── Labels ──────────────────────────────────────────────────────────────────

export const STATE_LABEL: Record<string, string> = {
  not_started: 'Not started',
  suggested: 'Suggested',
  claimed: 'Claimed',
  submitted: 'With assessor',
  referred: 'Needs more',
  not_yet: 'Not yet',
  passed: 'Passed',
  iqa_confirmed: 'IQA confirmed',
  iqa_rejected: 'IQA not confirmed',
};
export const STATE_TONE: Record<string, string> = {
  not_started: 'neutral',
  suggested: 'suggested',
  claimed: 'claimed',
  submitted: 'submitted',
  referred: 'referred',
  not_yet: 'referred',
  passed: 'passed',
  iqa_confirmed: 'iqa',
  iqa_rejected: 'rejected',
};
export const DECISION_LABEL: Record<string, string> = {
  passed: 'Passed',
  referred: 'Referred',
  not_yet: 'Not yet',
};
export const DECISION_TONE: Record<string, string> = {
  passed: 'passed',
  referred: 'referred',
  not_yet: 'referred',
};
export const METHOD_LABEL: Record<string, string> = {
  evidence_review: 'Evidence review',
  observation: 'Observation',
  professional_discussion: 'Professional discussion',
  questioning: 'Questioning',
  witness: 'Witness testimony',
  product: 'Product evidence',
  imported: 'Imported',
};
export const AUDIT_LABEL: Record<string, string> = {
  evidence_added: 'Evidence added',
  criterion_claimed: 'Criterion claimed',
  criterion_suggested: 'Criterion suggested by AI',
  item_submitted: 'Evidence sent for assessment',
  submission_submitted: 'Submission sent',
  signed_declaration: 'Declaration signed',
  witness_requested: 'Witness statement requested',
  witness_signed: 'Witness statement signed',
  decision_passed: 'Criterion passed',
  decision_referred: 'Criterion referred',
  decision_not_yet: 'Criterion not yet met',
  iqa_confirmed: 'IQA confirmed a decision',
  iqa_not_confirmed: 'IQA did not confirm a decision',
  gateway_declaration_signed: 'Gateway declaration signed',
  gateway_employer_link_sent: 'Gateway declaration link sent to employer',
  export_pack_generated: 'Export pack generated',
  gateway_pack_generated: 'Gateway pack generated',
  export_downloaded: 'Export pack downloaded',
  document_generated: 'PDF document made',
};
export const ROLE_LABEL: Record<string, string> = {
  learner: 'Apprentice',
  assessor: 'Assessor',
  iqa: 'IQA',
  staff: 'College',
  witness: 'Witness',
  employer: 'Employer',
  system: 'System',
};
export const OTJ_TYPE: Record<string, string> = {
  workshop: 'Workshop',
  one_to_one: 'One-to-one',
  mentoring: 'Mentoring',
  simulation: 'Simulation',
  theory: 'Theory',
  practical: 'Practical',
  industry_visit: 'Industry visit',
  manufacturer_training: 'Manufacturer training',
  shadowing: 'Shadowing',
  conference: 'Conference',
  tutorial: 'Tutorial',
  assessment: 'Assessment',
  employer_meeting: 'Employer meeting',
  other: 'Other',
  competition: 'Competition',
  learning_support: 'Learning support',
  assignment: 'Assignment',
  revision: 'Revision',
};
export const OTJ_STATUS: Record<string, string> = {
  pending: 'Waiting to be checked',
  verified: 'Verified by college',
  rejected: 'Not accepted',
  verified_by_employer: 'Confirmed by employer',
};
export const FS_STATUS: Record<string, string> = {
  exempt: 'Exempt',
  not_started: 'Not started',
  in_progress: 'In progress',
  pending_results: 'Waiting for results',
  passed: 'Passed',
  failed: 'Not passed',
  resit: 'Resit',
};
export const FS_LEVEL: Record<string, string> = {
  entry_1: 'Entry 1',
  entry_2: 'Entry 2',
  entry_3: 'Entry 3',
  level_1: 'Level 1',
  level_2: 'Level 2',
};

// ── The record ──────────────────────────────────────────────────────────────

export interface LearnerRecord {
  learnerId: string;
  name: string;
  uln: string | null;
  startDate: string | null;
  endDate: string | null;
  studentId: string | null;
  college: Row | null;
  snapshot: Row;
  ac: Row[];
  items: Row[];
  criteriaLinks: Row[];
  decisions: Row[];
  witnesses: Row[];
  submissions: Row[];
  signatures: Row[];
  audit: Row[];
  otjSummary: Row | null;
  otjEntries: Row[];
  otjStatements: Row[];
  gatewayRows: Row[];
  /** get_gateway_readiness for this learner, run as the caller: the gate the app shows. */
  gate: Row | null;
  declarations: Row[];
  functionalSkills: Row[];
  collegeDocs: Row[];
}

async function must<T>(p: PromiseLike<{ data: T | null; error: any }>, what: string): Promise<T> {
  const { data, error } = await p;
  if (error) throw new Error(`${what}: ${error.message ?? error}`);
  return (data ?? ([] as unknown)) as T;
}

export async function loadRecord(ctx: BuildCtx): Promise<LearnerRecord> {
  const { admin, asCaller, learnerId } = ctx;

  const [
    snapshot,
    ac,
    profile,
    students,
    items,
    criteriaLinks,
    decisions,
    witnesses,
    submissions,
    audit,
  ] = await Promise.all([
    must<Row>(admin.rpc('_gateway_snapshot', { p_learner: learnerId }), 'gateway snapshot'),
    must<Row[]>(asCaller.rpc('get_portfolio_ac_state', { p_user_id: learnerId }), 'criteria'),
    must<Row | null>(
      admin.from('profiles').select('full_name').eq('id', learnerId).maybeSingle(),
      'profile'
    ),
    must<Row[]>(
      admin
        .from('college_students')
        .select('id, name, uln, start_date, expected_end_date, status, college_id, created_at')
        .eq('user_id', learnerId)
        .order('created_at', { ascending: false }),
      'learner record'
    ),
    must<Row[]>(
      admin
        .from('portfolio_items')
        .select(
          'id, title, description, category, file_url, file_type, storage_urls, reflection_notes, status, date_completed, created_at, updated_at, metadata, content_hash, content_hashed_at, skills_demonstrated, time_spent'
        )
        .eq('user_id', learnerId)
        .order('created_at', { ascending: true }),
      'evidence'
    ),
    must<Row[]>(
      admin
        .from('portfolio_item_criteria')
        .select(
          'portfolio_item_id, qualification_code, unit_code, ac_code, source, confirmed_at, created_at'
        )
        .eq('learner_id', learnerId),
      'criteria links'
    ),
    must<Row[]>(
      admin
        .from('portfolio_assessment_decisions')
        .select(
          'id, qualification_code, unit_code, ac_code, decision, feedback, feedback_source, evidence_item_ids, submission_id, method, assessor_id, assessor_name, decided_at, superseded_at, superseded_by, iqa_verdict, iqa_feedback, iqa_at, content_hash'
        )
        .eq('learner_id', learnerId)
        .order('decided_at', { ascending: true }),
      'decisions'
    ),
    must<Row[]>(
      admin
        .from('portfolio_witness_statements')
        .select(
          'id, portfolio_item_id, witness_name, witness_role, witness_company, statement, criteria, signature_data, evidence_snapshot, evidence_hash, statement_hash, status, expires_at, signed_at, created_at'
        )
        .eq('learner_id', learnerId)
        .order('created_at', { ascending: true }),
      'witness statements'
    ),
    must<Row[]>(
      admin
        .from('portfolio_submissions')
        .select(
          'id, status, submitted_at, submission_notes, created_at, iqa_sampled, iqa_outcome, iqa_feedback, iqa_verified_at'
        )
        .eq('user_id', learnerId)
        .order('created_at', { ascending: true }),
      'submissions'
    ),
    must<Row[]>(
      admin
        .from('portfolio_audit_events')
        .select('id, actor_role, action, object_type, object_id, summary, content_hash, created_at')
        .eq('learner_id', learnerId)
        .order('created_at', { ascending: true })
        .limit(5000),
      'audit trail'
    ),
  ]);

  const subIds = submissions.map((s) => s.id);
  const sigCols =
    'id, submission_id, portfolio_item_id, signer_id, signer_role, signature_type, signature_text, signature_image, declaration_text, signed_at, signed_hashes, bundle_hash';
  const [sigBySub, sigBySigner] = await Promise.all([
    subIds.length
      ? must<Row[]>(
          admin.from('portfolio_signatures').select(sigCols).in('submission_id', subIds),
          'declarations'
        )
      : Promise.resolve([] as Row[]),
    must<Row[]>(
      admin.from('portfolio_signatures').select(sigCols).eq('signer_id', learnerId),
      'declarations'
    ),
  ]);
  const sigMap = new Map<string, Row>();
  for (const s of [...sigBySub, ...sigBySigner]) sigMap.set(s.id, s);
  const signatures = [...sigMap.values()].sort((a, b) =>
    String(a.signed_at).localeCompare(String(b.signed_at))
  );

  const student =
    students.find(
      (s) => !['withdrawn', 'completed', 'archived'].includes(String(s.status ?? '').toLowerCase())
    ) ??
    students[0] ??
    null;
  const studentId = student?.id ?? null;

  const [
    college,
    otjSummary,
    otjEntries,
    otjStatements,
    gatewayRows,
    declarations,
    functionalSkills,
    collegeDocs,
    gate,
  ] = await Promise.all([
    student?.college_id
      ? must<Row | null>(
          admin
            .from('colleges')
            .select('id, name, logo_url')
            .eq('id', student.college_id)
            .maybeSingle(),
          'college'
        )
      : Promise.resolve(null),
    asCaller.rpc('get_otj_summary', { p_user: learnerId }).then(
      ({ data }) => (data as Row) ?? null,
      () => null
    ),
    must<Row[]>(
      admin
        .from('college_otj_entries')
        .select(
          'id, activity_date, duration_minutes, activity_type, title, description, source_kind, verification_status, verified_at, attested_by_name, recorded_by_name_snapshot, unit_codes, iqa_verdict, in_working_hours, created_at'
        )
        .eq('student_id', learnerId)
        .order('activity_date', { ascending: true })
        .limit(5000),
      'off-the-job hours'
    ),
    must<Row[]>(
      admin
        .from('otj_hours_statements')
        .select(
          'id, planned_hours, minimum_hours, rpl_hours, actual_hours, verified_hours, app_learning_hours, minimum_met, reason, prepared_by_name, prepared_at, learner_signed_name, learner_signed_at, employer_signed_name, employer_signed_role, employer_company, employer_signed_at, superseded_at'
        )
        .eq('user_id', learnerId)
        .order('prepared_at', { ascending: true }),
      'hours statements'
    ),
    must<Row[]>(
      admin
        .from('epa_gateway_checklist')
        .select('*')
        .eq('user_id', learnerId)
        .order('updated_at', { ascending: false }),
      'gateway checklist'
    ),
    must<Row[]>(
      admin
        .from('epa_gateway_declarations')
        .select(
          'id, kind, route, standard_code, standard_title, statement, statement_version, snapshot, snapshot_hash, signer_name, signer_role, signer_company, signature_image, signed_at, requested_by_name, created_at, superseded_at, token_expires_at'
        )
        .eq('learner_id', learnerId)
        .order('created_at', { ascending: true }),
      'gateway declarations'
    ),
    must<Row[]>(
      admin
        .from('college_functional_skills')
        .select(
          'id, subject, level, status, exemption_reason, awarding_body, exam_date, result_date, result_score, certificate_url, notes'
        )
        .in('student_id', studentId ? [learnerId, studentId] : [learnerId]),
      'English and maths'
    ),
    ctx.access === 'staff' && studentId
      ? must<Row[]>(
          admin
            .from('college_learner_evidence')
            .select(
              'id, kind, title, file_path, file_name, file_hash, document_date, signatures, version, uploaded_by_name, created_at'
            )
            .eq('student_id', studentId)
            .is('superseded_at', null)
            .in('kind', GATEWAY_DOC_KINDS),
          'college documents'
        )
      : Promise.resolve([] as Row[]),
    // The gate itself (ELE-1872). Run with the caller's JWT: it checks
    // auth.uid() is the learner or can assess them, as index.ts already did.
    // Never fatal: a pack without the gate still carries the evidence. The
    // checklist page then says the gate could not be read (gatewayChecklist).
    Promise.resolve(asCaller.rpc('get_gateway_readiness', { p_learner: learnerId })).then(
      ({ data, error }: { data: unknown; error: unknown }) => {
        if (error) console.warn('[portfolio-export-pack] gateway readiness:', error);
        return (error ? null : (data as Row | null)) ?? null;
      },
      (e: unknown) => {
        console.warn('[portfolio-export-pack] gateway readiness:', e);
        return null;
      }
    ),
  ]);

  const name =
    (snapshot?.learner_name as string) ||
    student?.name ||
    (profile as Row | null)?.full_name ||
    'Apprentice';

  return {
    learnerId,
    name,
    uln: student?.uln ?? null,
    startDate: student?.start_date ?? null,
    endDate: student?.expected_end_date ?? null,
    studentId,
    college: college as Row | null,
    snapshot: snapshot ?? {},
    ac: ac ?? [],
    items,
    criteriaLinks,
    decisions,
    witnesses,
    submissions,
    signatures,
    audit,
    otjSummary,
    otjEntries,
    otjStatements,
    gatewayRows,
    gate: (gate as Row | null) ?? null,
    declarations,
    functionalSkills,
    collegeDocs,
  };
}

// ── Evidence files ──────────────────────────────────────────────────────────

interface FileEntry {
  ref: string;
  itemId: string | null;
  itemRef: string | null;
  name: string;
  zipPath: string | null;
  bucket: string | null;
  path: string | null;
  type: string | null;
  size: number | null;
  recordedSha256: string | null;
  actualSha256: string | null;
  matches: boolean | null;
  included: boolean;
  note: string | null;
}

export function itemFiles(item: Row): Array<{
  name: string;
  url: string;
  type: string | null;
  size: number | null;
  sha256: string | null;
}> {
  const out: Array<{
    name: string;
    url: string;
    type: string | null;
    size: number | null;
    sha256: string | null;
  }> = [];
  const list = Array.isArray(item.storage_urls) ? item.storage_urls : [];
  for (const f of list) {
    if (!f || typeof f !== 'object' || !f.url) continue;
    out.push({
      name: String(f.name || String(f.url).split('/').pop() || 'file'),
      url: String(f.url),
      type: f.type ?? null,
      size: Number.isFinite(Number(f.size)) ? Number(f.size) : null,
      sha256: f.sha256 ?? null,
    });
  }
  if (item.file_url && !out.some((f) => f.url === item.file_url)) {
    out.push({
      name: String(item.file_url).split('/').pop()?.split('?')[0] || 'file',
      url: String(item.file_url),
      type: item.file_type ?? null,
      size: null,
      sha256: null,
    });
  }
  return out;
}

async function downloadInto(
  ctx: BuildCtx,
  zip: ZipWriter,
  zipPath: string,
  ref: { bucket: string; path: string },
  budget: { left: number }
): Promise<{ bytes: number; sha: string } | { error: string }> {
  const { data, error } = await ctx.admin.storage.from(ref.bucket).download(ref.path);
  if (error || !data) return { error: 'The file could not be read from storage.' };
  if (data.size > budget.left)
    return { error: 'Left out: the pack reached its size limit. Open it in the app.' };
  const bytes = new Uint8Array(await data.arrayBuffer());
  budget.left -= bytes.length;
  const sha = await sha256Hex(bytes);
  await zip.add(zipPath, bytes);
  return { bytes: bytes.length, sha };
}

// ── PDF payload pieces ──────────────────────────────────────────────────────

export function orgFor(rec: LearnerRecord) {
  return {
    name: rec.college?.name || (rec.snapshot?.college_name as string) || '',
    sub: rec.college?.name ? 'Training provider' : 'Apprentice record',
    logo: rec.college?.logo_url || '',
  };
}

export function itemRefs(rec: LearnerRecord): Map<string, string> {
  const m = new Map<string, string>();
  rec.items.forEach((it, i) => m.set(it.id, `E${String(i + 1).padStart(2, '0')}`));
  return m;
}

export function unitSummary(rec: LearnerRecord) {
  const units = new Map<string, { title: string; total: number; c: Record<string, number> }>();
  for (const r of rec.ac) {
    const u: { title: string; total: number; c: Record<string, number> } = units.get(
      r.unit_code
    ) ?? {
      title: r.unit_title ?? '',
      total: 0,
      c: {},
    };
    u.total++;
    u.c[r.state] = (u.c[r.state] ?? 0) + 1;
    units.set(r.unit_code, u);
  }
  return units;
}

export function headlineCounts(rec: LearnerRecord) {
  const c: Record<string, number> = {};
  for (const r of rec.ac) c[r.state] = (c[r.state] ?? 0) + 1;
  const passed = (c.passed ?? 0) + (c.iqa_confirmed ?? 0);
  return { c, passed, total: rec.ac.length, iqa: c.iqa_confirmed ?? 0 };
}

export function hoursKv(rec: LearnerRecord) {
  const s = rec.otjSummary ?? {};
  const h = rec.snapshot?.hours ?? {};
  return [
    {
      label: 'Hours required',
      value: s.required_hours ? `${hrs(s.required_hours)} hours` : 'Not set',
    },
    { label: 'Hours counted', value: `${hrs(s.counted_hours ?? h.counted)} hours` },
    {
      label: 'Verified by the college',
      value: `${hrs(s.college_verified_hours ?? s.verified_hours ?? h.verified)} hours`,
    },
    { label: 'Confirmed by the employer', value: `${hrs(s.employer_attested_hours ?? 0)} hours` },
    { label: 'Learning in the app', value: `${hrs(s.app_learning_hours ?? h.app_learning)} hours` },
    { label: 'Waiting to be checked', value: `${hrs(s.pending_hours ?? 0)} hours` },
  ];
}

export function statementKv(st: Row | null) {
  if (!st) return null;
  return [
    { label: 'Planned hours', value: `${hrs(st.planned_hours)} hours` },
    { label: 'Actual hours', value: `${hrs(st.actual_hours)} hours` },
    {
      label: 'Minimum hours',
      value: st.minimum_hours != null ? `${hrs(st.minimum_hours)} hours` : 'Not set',
    },
    { label: 'Prior learning (RPL)', value: `${hrs(st.rpl_hours)} hours` },
    {
      label: 'Minimum met',
      value: st.minimum_met ? 'Yes' : 'No',
      tone: st.minimum_met ? 'ok' : 'warn',
    },
    {
      label: 'Prepared by',
      value: `${st.prepared_by_name ?? 'College'}, ${fmtDate(st.prepared_at)}`,
    },
    { label: 'Reason fewer hours were delivered', value: st.reason || 'Not recorded', wide: true },
    {
      label: 'Signed by the apprentice',
      value: st.learner_signed_at
        ? `${st.learner_signed_name}, ${fmtDateTime(st.learner_signed_at)}`
        : 'Not signed yet',
      tone: st.learner_signed_at ? 'ok' : 'warn',
    },
    {
      label: 'Signed by the employer',
      value: st.employer_signed_at
        ? `${st.employer_signed_name}${st.employer_signed_role ? `, ${st.employer_signed_role}` : ''}${st.employer_company ? ` (${st.employer_company})` : ''}, ${fmtDateTime(st.employer_signed_at)}`
        : 'Not signed yet',
      tone: st.employer_signed_at ? 'ok' : 'warn',
    },
  ];
}

interface GatewayItem {
  key: string;
  label: string;
  /** get_gateway_readiness: green met, amber in hand, red missing. */
  state: 'green' | 'amber' | 'red';
  done: boolean;
  note: string;
}

/** The words the app shows for each state (GatewayGateCard). */
export const GATE_WORD: Record<GatewayItem['state'], string> = {
  green: 'Met',
  amber: 'In hand',
  red: 'Missing',
};
/** Template classes: done = green, todo = orange, bad = red. */
const GATE_RESULT: Record<GatewayItem['state'], string> = {
  green: 'done',
  amber: 'todo',
  red: 'bad',
};

/**
 * The readiness checklist (ELE-1872): the lines get_gateway_readiness returns
 * for this learner, the same lines, states and sentences the apprentice and
 * their tutor see in the app. Nothing is worked out here, so the pack cannot
 * disagree with the app. The signatures follow as their own sections.
 */
export function gatewayChecklist(rec: LearnerRecord): GatewayItem[] {
  if (!rec.gate) {
    return [
      {
        key: 'gate_unavailable',
        label: 'Gateway check',
        state: 'red',
        done: false,
        note: 'The gateway check could not be read when this pack was made. Make the pack again, or check the gateway in the app.',
      },
    ];
  }
  return ((rec.gate?.items ?? []) as Row[]).map((i) => {
    const state = (
      ['green', 'amber', 'red'].includes(i.state) ? i.state : 'red'
    ) as GatewayItem['state'];
    return {
      key: String(i.key),
      label: String(i.label ?? i.key),
      state,
      done: state === 'green',
      note: String(i.sentence ?? ''),
    };
  });
}

/** One checklist line for the PDF template. */
const checklistRow = (i: GatewayItem) => ({
  label: i.label,
  result: GATE_RESULT[i.state],
  result_label: GATE_WORD[i.state],
  note: i.note,
});

/**
 * Wording versions (statement_version on epa_gateway_declarations):
 *   1  Elec-Mate's wording, to 7 Oct 2026
 *   2  the employer's confirmations quote the gateway section of the ST0152 /
 *      ST1017 end-point assessment plans word for word
 * A signed declaration always prints the text that was signed, with its version.
 */
export function declarationSection(
  d: Row | null,
  kind: string,
  fallbackStatement: string,
  heading: string,
  opts: { currentVersion?: number; source?: string } = {}
) {
  const role =
    kind === 'learner' ? 'Apprentice' : kind === 'provider' ? 'Training provider' : 'Employer';
  const version = d ? Number(d.statement_version ?? 1) : (opts.currentVersion ?? null);
  // The source line only belongs to the wording that quotes it.
  const source = kind === 'employer' && version !== null && version >= 2 ? (opts.source ?? '') : '';
  return {
    heading,
    kind: 'declaration',
    statement: d?.statement || fallbackStatement || 'Not available.',
    source,
    signer: d
      ? {
          role: d.signer_role ? `${role} · ${d.signer_role}` : role,
          name: d.signer_name || '',
          when: fmtDateTime(d.signed_at),
          method: d.signature_image
            ? kind === 'employer'
              ? 'Drawn signature, signed through the college’s link (no account)'
              : 'Drawn signature, signed in the app'
            : kind === 'employer'
              ? 'Typed name, signed through the college’s link (no account)'
              : 'Typed name, signed in the app',
          image: isPng(d.signature_image) ? d.signature_image : '',
          ink: 'light',
        }
      : { role, name: '', when: '', method: 'Not signed yet', image: '', ink: 'light' },
    facts: [
      ...(d?.signer_company ? [{ label: 'Company', value: d.signer_company }] : []),
      ...(version !== null
        ? [
            {
              label: 'Wording',
              value: `Version ${version}${version === 1 ? ' (Elec-Mate wording)' : ''}${d ? '' : ', to be signed'}`,
            },
          ]
        : []),
      {
        label: 'What they saw (fingerprint)',
        value: d?.snapshot_hash || 'Not signed',
        mono: !!d?.snapshot_hash,
      },
    ],
    items: [],
  };
}

// ── Evidence pack ───────────────────────────────────────────────────────────

/**
 * ELE-1869: signed witness statements by the criteria they back up ("unit|ac").
 * A statement stores the criteria the learner picked as "113 AC 1.1".
 */
function witnessesByCriterion(rec: LearnerRecord): Map<string, Row[]> {
  const m = new Map<string, Row[]>();
  for (const w of rec.witnesses) {
    if (w.status !== 'signed') continue;
    for (const c of (w.criteria ?? []) as string[]) {
      const hit = String(c).match(/^(.+?) AC (.+)$/);
      if (!hit) continue;
      const k = `${hit[1].trim()}|${hit[2].trim()}`;
      m.set(k, [...(m.get(k) ?? []), w]);
    }
  }
  return m;
}

/** "Witnessed by Jane Smith, Site supervisor, 6 Oct 2026" */
function witnessedByText(w: Row): string {
  return `Witnessed by ${[w.witness_name || 'a witness', w.witness_role, w.signed_at ? fmtDate(w.signed_at) : null].filter(Boolean).join(', ')}`;
}

export async function buildEvidencePack(
  ctx: BuildCtx,
  rec: LearnerRecord,
  generatedAt: string
): Promise<BuildResult> {
  const zip = new ZipWriter();
  const refs = itemRefs(rec);
  const acText = new Map<string, string>();
  const acState = new Map<string, string>();
  for (const r of rec.ac) {
    acText.set(`${r.unit_code}|${r.ac_code}`, r.ac_text ?? '');
    acState.set(`${r.unit_code}|${r.ac_code}`, r.state);
  }
  const currentDecision = new Map<string, Row>();
  for (const d of rec.decisions)
    if (!d.superseded_at) currentDecision.set(`${d.unit_code}|${d.ac_code}`, d);
  const witnessedBy = witnessesByCriterion(rec);

  // 1 ─ Evidence files
  const allFiles: FileEntry[] = [];
  const budget = { left: FILE_BYTES_CAP };
  const totalFiles = rec.items.reduce((n, it) => n + itemFiles(it).length, 0);
  await ctx.progress(`Adding ${plural(totalFiles, 'evidence file')}`);
  for (const it of rec.items) {
    const ref = refs.get(it.id)!;
    const folder = `Evidence/${ref} ${fileSafe(it.title, 50)}`;
    const files = itemFiles(it);
    for (let i = 0; i < files.length; i++) {
      const f = files[i];
      const fileRef = `${ref}-${i + 1}`;
      const zipPath = `${folder}/${String(i + 1).padStart(2, '0')} ${fileSafe(f.name, 80)}`;
      const sref = storageRef(f.url);
      const entry: FileEntry = {
        ref: fileRef,
        itemId: it.id,
        itemRef: ref,
        name: f.name,
        zipPath: null,
        bucket: sref?.bucket ?? null,
        path: sref?.path ?? null,
        type: f.type,
        size: f.size,
        recordedSha256: f.sha256,
        actualSha256: null,
        matches: null,
        included: false,
        note: null,
      };
      if (!sref) {
        entry.note = 'Stored outside Elec-Mate; only the link is kept.';
      } else {
        const r = await downloadInto(ctx, zip, zipPath, sref, budget);
        if ('error' in r) entry.note = r.error;
        else {
          entry.zipPath = zipPath;
          entry.included = true;
          entry.size = r.bytes;
          entry.actualSha256 = r.sha;
          entry.matches = f.sha256 ? f.sha256 === r.sha : null;
          if (entry.matches === false)
            entry.note = 'The file no longer matches the fingerprint recorded when it was added.';
        }
      }
      allFiles.push(entry);
    }
  }

  // 2 ─ Signed photo links for the PDF (format=origin: never WebP)
  await ctx.progress('Laying out the PDF summary');
  const photoUrls = new Map<string, string>();
  let photoBudget = PDF_PHOTOS_TOTAL;
  for (const it of rec.items) {
    let n = 0;
    for (const f of allFiles.filter((x) => x.itemId === it.id)) {
      if (n >= PDF_PHOTOS_PER_ITEM || photoBudget <= 0) break;
      const isImage =
        (f.type ?? '').startsWith('image/') || /\.(jpe?g|png|heic|webp)$/i.test(f.name);
      if (!isImage || !f.bucket || !f.path || !f.included) continue;
      const { data } = await ctx.admin.storage.from(f.bucket).createSignedUrl(f.path, 60 * 60, {
        transform: { width: 900, quality: 70, format: 'origin' },
      });
      if (data?.signedUrl) {
        photoUrls.set(f.ref, data.signedUrl);
        n++;
        photoBudget--;
      }
    }
  }

  // 3 ─ PDF payload
  const counts = headlineCounts(rec);
  const units = unitSummary(rec);
  const st = rec.snapshot?.standard ?? {};
  const q = rec.snapshot?.qualification ?? {};
  const s = rec.otjSummary ?? {};
  const signedWitnesses = rec.witnesses.filter((w) => w.status === 'signed');
  const reference = `EP-${ctx.exportId.slice(0, 8).toUpperCase()}`;

  const sections: Row[] = [];
  sections.push({
    heading: 'Summary by unit',
    kind: 'table',
    compact: true,
    columns: ['Unit', 'Title', 'Passed', 'With assessor', 'Claimed', 'Needs more', 'Not started'],
    widths: ['16mm', '', '15mm', '20mm', '16mm', '18mm', '18mm'],
    rows: [...units.entries()].map(([code, u]) => [
      code,
      u.title,
      String((u.c.passed ?? 0) + (u.c.iqa_confirmed ?? 0)),
      String(u.c.submitted ?? 0),
      String(u.c.claimed ?? 0),
      String((u.c.referred ?? 0) + (u.c.not_yet ?? 0) + (u.c.iqa_rejected ?? 0)),
      String((u.c.not_started ?? 0) + (u.c.suggested ?? 0)),
    ]),
    empty: 'No qualification is set for this apprentice, so there are no criteria to show.',
  });

  const stateRows: Row[] = [];
  let lastUnit = '';
  for (const r of rec.ac) {
    if (['not_started', 'suggested'].includes(r.state)) continue;
    if (r.unit_code !== lastUnit) {
      stateRows.push({ unit: r.unit_code, unit_title: r.unit_title ?? '' });
      lastUnit = r.unit_code;
    }
    const ev = (r.evidence_item_ids ?? [])
      .map((id: string) => refs.get(id))
      .filter(Boolean)
      .join(', ');
    const dec = r.decided_at
      ? `${DECISION_LABEL[currentDecision.get(`${r.unit_code}|${r.ac_code}`)?.decision] ?? 'Decided'} by ${r.assessor_name ?? 'assessor'}, ${fmtDate(r.decided_at)}`
      : '';
    stateRows.push({
      ac: r.ac_code,
      text: r.ac_text ?? '',
      state: STATE_LABEL[r.state] ?? r.state,
      tone: STATE_TONE[r.state] ?? 'neutral',
      detail:
        [
          ev && `Evidence ${ev}`,
          dec,
          r.iqa_verdict
            ? `IQA ${r.iqa_verdict === 'confirmed' ? 'confirmed' : 'did not confirm'}`
            : '',
          ...(witnessedBy.get(`${r.unit_code}|${r.ac_code}`) ?? []).map(witnessedByText),
        ]
          .filter(Boolean)
          .join(' · ') || 'Claimed, not yet decided',
    });
  }
  if (stateRows.length) {
    sections.push({
      heading: 'Criteria with evidence or a decision',
      intro:
        'Every criterion the apprentice has claimed evidence for or an assessor has decided, with the evidence references (E01, E02…) used in the rest of this document. Criteria not started, or only suggested by AI, are counted in the unit summary above.',
      kind: 'states',
      rows: stateRows,
    });
  }

  rec.items.forEach((it, idx) => {
    const ref = refs.get(it.id)!;
    const links = rec.criteriaLinks.filter(
      (c) => c.portfolio_item_id === it.id && c.source !== 'ai_suggested'
    );
    const decs = rec.decisions.filter((d) => (d.evidence_item_ids ?? []).includes(it.id));
    const wits = rec.witnesses.filter(
      (w) => w.portfolio_item_id === it.id && w.status === 'signed'
    );
    const meta = (it.metadata ?? {}) as Row;
    const files = allFiles.filter((f) => f.itemId === it.id);
    const states = links.map((c) => acState.get(`${c.unit_code}|${c.ac_code}`) ?? 'claimed');
    const itemState =
      states.length && states.every((x) => x === 'passed' || x === 'iqa_confirmed')
        ? 'passed'
        : states.some((x) => x === 'referred' || x === 'not_yet')
          ? 'referred'
          : states.some((x) => x === 'submitted')
            ? 'submitted'
            : states.length
              ? 'claimed'
              : '';
    sections.push({
      heading: idx === 0 ? `Evidence · ${plural(rec.items.length, 'item')}` : '',
      kind: 'evidence',
      ref,
      title: it.title || 'Untitled evidence',
      state: itemState ? STATE_LABEL[itemState] : '',
      tone: itemState ? STATE_TONE[itemState] : '',
      facts: [
        {
          label: 'Date of the work',
          value: fmtDate(meta.workDate || it.date_completed) || 'Not recorded',
        },
        { label: 'Added', value: fmtDateTime(it.created_at) },
        ...(meta.siteRef ? [{ label: 'Where', value: String(meta.siteRef) }] : []),
        ...(meta.role ? [{ label: 'What the apprentice did', value: String(meta.role) }] : []),
        ...(meta.witness?.name
          ? [
              {
                label: 'Supervisor named',
                value: `${meta.witness.name}${meta.witness.role ? `, ${meta.witness.role}` : ''}`,
              },
            ]
          : []),
        {
          label: 'Evidence fingerprint (SHA-256)',
          value: it.content_hash || 'Not recorded',
          mono: true,
          wide: true,
        },
      ],
      texts: [
        ...(it.description ? [{ label: 'Description', body: it.description }] : []),
        ...(it.reflection_notes ? [{ label: 'Reflection', body: it.reflection_notes }] : []),
      ],
      criteria: links.map((c) => {
        const k = `${c.unit_code}|${c.ac_code}`;
        const stt = acState.get(k) ?? 'claimed';
        return {
          code: `${c.unit_code} AC ${c.ac_code}`,
          text: acText.get(k) ?? '',
          state: STATE_LABEL[stt] ?? stt,
          tone: STATE_TONE[stt] ?? 'neutral',
        };
      }),
      decisions: decs.map((d) => ({
        ac: `${d.unit_code} AC ${d.ac_code}`,
        decision: `${DECISION_LABEL[d.decision] ?? d.decision}${d.superseded_at ? ' (replaced)' : ''}`,
        tone: d.superseded_at ? 'neutral' : (DECISION_TONE[d.decision] ?? 'neutral'),
        by: `${d.assessor_name ?? 'Assessor'}${d.method ? ` · ${METHOD_LABEL[d.method] ?? d.method}` : ''}`,
        when: fmtDateTime(d.decided_at),
        feedback: d.feedback || 'No feedback written.',
        iqa: d.iqa_verdict
          ? `${d.iqa_verdict === 'confirmed' ? 'Confirmed' : 'Not confirmed'} ${fmtDate(d.iqa_at)}${d.iqa_feedback ? `. ${d.iqa_feedback}` : ''}`
          : '',
      })),
      witnesses: wits.map((w) => ({
        name: w.witness_name || 'Witness',
        role: [w.witness_role, w.witness_company].filter(Boolean).join(', '),
        when: fmtDateTime(w.signed_at),
        statement: w.statement || '',
      })),
      photos: files
        .filter((f) => photoUrls.has(f.ref))
        .map((f) => ({ url: photoUrls.get(f.ref)!, caption: `${f.ref} · ${f.name}` })),
      files: files.map((f) => ({
        name: `${f.ref} · ${f.name}`,
        path: f.zipPath ? `In the ZIP: ${f.zipPath}` : f.note || 'Not included',
        sha256: f.actualSha256 || f.recordedSha256 || '',
      })),
    });
  });
  if (!rec.items.length) {
    sections.push({
      heading: 'Evidence',
      kind: 'text',
      paragraphs: ['No evidence has been added to this portfolio yet.'],
    });
  }

  signedWitnesses.forEach((w, i) => {
    sections.push({
      heading: i === 0 ? `Witness statements · ${signedWitnesses.length}` : '',
      kind: 'declaration',
      statement: w.statement || 'No statement written.',
      signer: {
        role: `Witness${w.witness_role ? ` · ${w.witness_role}` : ''}`,
        name: w.witness_name || '',
        when: fmtDateTime(w.signed_at),
        method: 'Signed through a witness link (no account)',
        image: isPng(w.signature_data) ? w.signature_data : '',
        ink: 'light',
      },
      facts: [
        {
          label: 'Evidence',
          value:
            `${refs.get(w.portfolio_item_id) ?? ''} ${w.evidence_snapshot?.title ?? ''}`.trim() ||
            'Not recorded',
        },
        ...(w.witness_company ? [{ label: 'Company', value: w.witness_company }] : []),
        { label: 'Criteria witnessed', value: (w.criteria ?? []).join(', ') || 'Not listed' },
        {
          label: 'Evidence fingerprint at signing',
          value: w.evidence_hash || 'Not recorded',
          mono: true,
        },
        { label: 'Statement fingerprint', value: w.statement_hash || 'Not recorded', mono: true },
      ],
      items: [],
    });
  });

  rec.signatures.forEach((sg, i) => {
    const hashes = Array.isArray(sg.signed_hashes) ? sg.signed_hashes : [];
    sections.push({
      heading: i === 0 ? `Declarations · ${rec.signatures.length}` : '',
      kind: 'declaration',
      statement: sg.declaration_text || 'Declaration text not recorded.',
      signer: {
        role: sg.signer_role === 'student' ? 'Apprentice' : sg.signer_role || 'Signer',
        name: sg.signature_text || '',
        when: fmtDateTime(sg.signed_at),
        method: sg.signature_image
          ? 'Drawn signature and typed name, signed in the app'
          : 'Typed name, signed in the app',
        image: isPng(sg.signature_image) ? sg.signature_image : '',
        ink: 'light',
      },
      facts: [
        {
          label: 'Submission',
          value: sg.submission_id
            ? `Sent ${fmtDateTime(rec.submissions.find((x) => x.id === sg.submission_id)?.submitted_at)}`
            : 'Not linked',
        },
        {
          label: 'Bundle fingerprint (SHA-256)',
          value: sg.bundle_hash || 'Not recorded',
          mono: true,
        },
      ],
      items: hashes.map((h: Row) => ({
        title: `${refs.get(h.item_id) ?? ''} ${h.title ?? ''}`.trim(),
        criteria: (h.criteria ?? []).join(', '),
        hash: h.content_hash ?? '',
      })),
    });
  });

  sections.push({
    heading: 'Off-the-job training hours',
    kind: 'kv',
    rows: hoursKv(rec),
    new_page: true,
  });
  const curStmt = rec.otjStatements.find((x) => !x.superseded_at) ?? null;
  const stmtRows = statementKv(curStmt);
  if (stmtRows)
    sections.push({ heading: 'Planned-versus-actual hours statement', kind: 'kv', rows: stmtRows });
  sections.push({
    heading: `Hours log · ${plural(rec.otjEntries.length, 'entry', 'entries')}`,
    intro:
      'Hours recorded against the apprenticeship. Learning done in the app counts too and is shown in the totals above; it is not listed line by line.',
    kind: 'table',
    compact: true,
    columns: ['Date', 'Activity', 'Type', 'Hours', 'Status'],
    widths: ['24mm', '', '26mm', '14mm', '34mm'],
    rows: rec.otjEntries.map((e) => [
      fmtDate(e.activity_date),
      e.title || '',
      OTJ_TYPE[e.activity_type] ?? e.activity_type ?? '',
      hrs((e.duration_minutes ?? 0) / 60),
      OTJ_STATUS[e.verification_status] ?? e.verification_status ?? '',
    ]),
    empty: 'No off-the-job entries recorded yet.',
  });

  const gw = gatewayChecklist(rec);
  sections.push({
    heading: 'End-point assessment gateway',
    intro: st.code
      ? `${st.title} (${st.code}). The end-point assessment is the ${st.assessment}. This is where the gateway stood on the day this pack was made.`
      : 'This qualification does not end in an apprenticeship end-point assessment; the sign-offs below still apply.',
    kind: 'checklist',
    items: gw.map(checklistRow),
  });

  sections.push({
    heading: `Audit trail · ${plural(rec.audit.length, 'event')}`,
    intro:
      'Every claim, signature, decision and witness statement, in order. The trail cannot be edited.',
    kind: 'table',
    compact: true,
    new_page: true,
    columns: ['When', 'Who', 'What'],
    widths: ['40mm', '24mm', ''],
    rows: rec.audit.map((a) => [
      fmtDateTime(a.created_at),
      ROLE_LABEL[a.actor_role] ?? a.actor_role,
      auditText(a, refs),
    ]),
    empty: 'No events recorded.',
  });

  const payload = {
    meta: {
      kind: 'Portfolio evidence pack',
      title: rec.name,
      subtitle:
        [q.title || q.code, st.code ? `${st.title} (${st.code})` : '']
          .filter(Boolean)
          .join(' · ') || 'Apprentice portfolio',
      reference,
      generated: fmtDateTime(generatedAt),
      generated_by: ctx.requestedByName,
      integrity: 'Every file in the ZIP carries its SHA-256 fingerprint; see manifest.json.',
    },
    status: {
      label: counts.total
        ? `${counts.passed} of ${counts.total} criteria passed`
        : 'No qualification set',
      tone: counts.total && counts.passed === counts.total ? 'ok' : 'neutral',
    },
    org: orgFor(rec),
    cover_facts: pairFacts<Row>([
      { label: 'Apprentice', value: rec.name, big: true, wide: true },
      { label: 'Qualification', value: [q.code, q.title].filter(Boolean).join(' · ') || 'Not set' },
      { label: 'Awarding body', value: q.awarding_body || 'Not recorded' },
      {
        label: 'Training provider',
        value: rec.college?.name || rec.snapshot?.college_name || 'Not with a college',
      },
      { label: 'Employer', value: rec.snapshot?.employer_name || 'Not recorded' },
      { label: 'ULN', value: rec.uln || 'Not recorded', mono: !!rec.uln },
      {
        label: 'Start and planned end',
        value: rec.startDate
          ? `${fmtDate(rec.startDate)} to ${fmtDate(rec.endDate) || 'not set'}`
          : 'Not recorded',
      },
      { label: 'Generated', value: `${fmtDateTime(generatedAt)} by ${ctx.requestedByName}` },
      { label: 'Pack reference', value: reference, mono: true },
    ]),
    headline: [
      {
        label: 'Criteria passed',
        value: String(counts.passed),
        unit: `of ${counts.total}`,
        note: counts.iqa ? `${counts.iqa} confirmed by IQA` : '',
      },
      {
        label: 'Evidence',
        value: String(rec.items.length),
        unit: rec.items.length === 1 ? 'item' : 'items',
        note: `${plural(allFiles.length, 'file')}`,
      },
      {
        label: 'Off-the-job',
        value: hrs(s.counted_hours ?? 0),
        unit: 'hours',
        note: s.required_hours ? `of ${hrs(s.required_hours)} required` : '',
      },
      { label: 'Witnesses', value: String(signedWitnesses.length), unit: 'signed', note: '' },
    ],
    contents: [
      'Summary by unit',
      'Criteria with evidence or a decision',
      'Evidence, with decisions and photos',
      'Witness statements',
      'Declarations',
      'Off-the-job hours and statement',
      'End-point assessment gateway',
      'Audit trail',
    ],
    alerts: allFiles.some((f) => f.matches === false)
      ? [
          {
            tone: 'bad',
            title: 'Fingerprint mismatch.',
            text: 'At least one file no longer matches the fingerprint recorded when it was added. It is marked in the evidence below.',
          },
        ]
      : [],
    sections,
    notes: [
      'Fingerprints (SHA-256) are worked out from the evidence when it is added and again when it is signed. If a file or the wording changes afterwards, the fingerprint changes, so anyone can check that what was signed and assessed is what is here.',
      'Signatures were drawn on a screen in white and are shown here in black.',
      'Contact details and network addresses held in the app are left out of this pack.',
    ],
    disclaimer: `Generated by Elec-Mate from the apprentice’s live record on ${fmtDateTime(generatedAt)}. The full set of files, the manifest and the audit trail are in the ZIP this summary came with.`,
  };

  const pdf = await renderLearnerRecord(payload, `Portfolio evidence pack - ${rec.name}.pdf`);
  const pdfPages = pdfPageCount(pdf);
  const pdfName = `01 Summary - ${fileSafe(rec.name, 40)}.pdf`;
  await zip.add(pdfName, pdf);

  // 4 ─ Data files
  await ctx.progress('Writing the index and manifest');
  const decls = rec.signatures.map((sg) => ({
    id: sg.id,
    submission_id: sg.submission_id,
    signer_role: sg.signer_role,
    typed_name: sg.signature_text,
    declaration_text: sg.declaration_text,
    signed_at: sg.signed_at,
    bundle_sha256: sg.bundle_hash,
    signed_items: sg.signed_hashes,
    signature_file: isPng(sg.signature_image)
      ? `Declarations/signature-${sg.id.slice(0, 8)}.svg`
      : null,
  }));
  for (const sg of rec.signatures) {
    if (isPng(sg.signature_image))
      await zip.add(
        `Declarations/signature-${sg.id.slice(0, 8)}.svg`,
        signatureSvg(sg.signature_image)
      );
  }
  await zip.add('Declarations/declarations.json', JSON.stringify(decls, null, 2));

  const wits = rec.witnesses.map((w) => ({
    id: w.id,
    evidence: refs.get(w.portfolio_item_id) ?? null,
    portfolio_item_id: w.portfolio_item_id,
    witness_name: w.witness_name,
    witness_role: w.witness_role,
    witness_company: w.witness_company,
    status: w.status,
    statement: w.statement,
    criteria: w.criteria,
    signed_at: w.signed_at,
    evidence_sha256: w.evidence_hash,
    statement_sha256: w.statement_hash,
    evidence_snapshot: w.evidence_snapshot,
    signature_file: isPng(w.signature_data)
      ? `Witness statements/signature-${w.id.slice(0, 8)}.svg`
      : null,
  }));
  for (const w of rec.witnesses) {
    if (isPng(w.signature_data))
      await zip.add(
        `Witness statements/signature-${w.id.slice(0, 8)}.svg`,
        signatureSvg(w.signature_data)
      );
  }
  await zip.add('Witness statements/witness-statements.json', JSON.stringify(wits, null, 2));

  await zip.add(
    'Hours/hours-log.csv',
    toCsv(
      [
        'Date',
        'Activity',
        'Type',
        'Hours',
        'Status',
        'Recorded by',
        'Confirmed by employer',
        'Units',
      ],
      rec.otjEntries.map((e) => [
        e.activity_date,
        e.title,
        OTJ_TYPE[e.activity_type] ?? e.activity_type,
        Number(((e.duration_minutes ?? 0) / 60).toFixed(2)),
        OTJ_STATUS[e.verification_status] ?? e.verification_status,
        e.recorded_by_name_snapshot,
        e.attested_by_name,
        (e.unit_codes ?? []).join(' '),
      ])
    )
  );
  await zip.add(
    'Hours/hours-summary.json',
    JSON.stringify({ summary: rec.otjSummary, statements: rec.otjStatements }, null, 2)
  );

  await zip.add(
    'Gateway/gateway.json',
    JSON.stringify(
      {
        standard: rec.snapshot?.standard ?? null,
        checklist: gw,
        checklist_record: rec.gatewayRows[0] ?? null,
        declarations: rec.declarations.map(({ signature_image: _i, ...d }) => d),
        functional_skills: rec.functionalSkills,
      },
      null,
      2
    )
  );

  await zip.add(
    'Audit trail/audit-trail.csv',
    toCsv(
      ['When', 'Who', 'What', 'Object', 'Object id', 'Fingerprint'],
      rec.audit.map((a) => [
        a.created_at,
        ROLE_LABEL[a.actor_role] ?? a.actor_role,
        auditText(a, refs),
        a.object_type,
        a.object_id,
        a.content_hash,
      ])
    )
  );
  await zip.add('Audit trail/audit-trail.json', JSON.stringify(rec.audit, null, 2));

  const criteria = rec.ac
    .filter((r) => !['not_started'].includes(r.state))
    .map((r) => ({
      unit: r.unit_code,
      ac: r.ac_code,
      text: r.ac_text,
      state: r.state,
      evidence: (r.evidence_item_ids ?? []).map((id: string) => ({
        ref: refs.get(id),
        item_id: id,
      })),
      suggested_by_ai: (r.suggested_item_ids ?? []).map((id: string) => refs.get(id)),
      witnessed_by: (witnessedBy.get(`${r.unit_code}|${r.ac_code}`) ?? []).map((w) => ({
        statement_id: w.id,
        name: w.witness_name,
        role: w.witness_role,
        company: w.witness_company,
        signed_at: w.signed_at,
        statement_hash: w.statement_hash,
      })),
      decision: r.decision_id
        ? {
            id: r.decision_id,
            decision: currentDecision.get(`${r.unit_code}|${r.ac_code}`)?.decision ?? null,
            assessor: r.assessor_name,
            method: r.decision_method,
            decided_at: r.decided_at,
            feedback: r.decision_feedback,
            iqa_verdict: r.iqa_verdict,
            iqa_feedback: r.iqa_feedback,
          }
        : null,
    }));

  const manifest = {
    kind: 'portfolio_evidence_pack',
    version: 1,
    reference,
    export_id: ctx.exportId,
    generated_at: generatedAt,
    generated_by: {
      name: ctx.requestedByName,
      role: ctx.access === 'learner' ? 'apprentice' : 'college',
    },
    learner: {
      name: rec.name,
      uln: rec.uln,
      start_date: rec.startDate,
      planned_end_date: rec.endDate,
    },
    training_provider: rec.college?.name ?? rec.snapshot?.college_name ?? null,
    employer: rec.snapshot?.employer_name ?? null,
    qualification: q,
    standard: rec.snapshot?.standard ?? null,
    totals: {
      criteria: counts.total,
      passed: counts.passed,
      iqa_confirmed: counts.iqa,
      by_state: counts.c,
      evidence_items: rec.items.length,
      files: allFiles.length,
      files_included: allFiles.filter((f) => f.included).length,
      witness_statements_signed: signedWitnesses.length,
      declarations: rec.signatures.length,
      decisions: rec.decisions.length,
      audit_events: rec.audit.length,
      otj_counted_hours: s.counted_hours ?? null,
      otj_required_hours: s.required_hours ?? null,
    },
    summary_pdf: pdfName,
    evidence: rec.items.map((it) => ({
      ref: refs.get(it.id),
      id: it.id,
      title: it.title,
      description: it.description,
      reflection: it.reflection_notes,
      work: it.metadata ?? {},
      created_at: it.created_at,
      content_sha256: it.content_hash,
      content_hashed_at: it.content_hashed_at,
      criteria: rec.criteriaLinks
        .filter((c) => c.portfolio_item_id === it.id)
        .map((c) => ({
          unit: c.unit_code,
          ac: c.ac_code,
          source: c.source,
          state: acState.get(`${c.unit_code}|${c.ac_code}`) ?? null,
        })),
      decisions: rec.decisions
        .filter((d) => (d.evidence_item_ids ?? []).includes(it.id))
        .map((d) => ({
          id: d.id,
          unit: d.unit_code,
          ac: d.ac_code,
          decision: d.decision,
          method: d.method,
          assessor: d.assessor_name,
          decided_at: d.decided_at,
          feedback: d.feedback,
          superseded_at: d.superseded_at,
          iqa_verdict: d.iqa_verdict,
          iqa_at: d.iqa_at,
          content_sha256: d.content_hash,
        })),
      witness_statements: rec.witnesses
        .filter((w) => w.portfolio_item_id === it.id)
        .map((w) => w.id),
      files: allFiles.filter((f) => f.itemId === it.id).map((f) => f.ref),
    })),
    files: allFiles.map((f) => ({
      ref: f.ref,
      evidence: f.itemRef,
      name: f.name,
      path_in_zip: f.zipPath,
      included: f.included,
      bytes: f.size,
      type: f.type,
      sha256_recorded: f.recordedSha256,
      sha256_in_pack: f.actualSha256,
      matches_record: f.matches,
      note: f.note,
    })),
    criteria,
    submissions: rec.submissions,
    files_written: [
      pdfName,
      'Declarations/declarations.json',
      'Witness statements/witness-statements.json',
      'Hours/hours-log.csv',
      'Hours/hours-summary.json',
      'Gateway/gateway.json',
      'Audit trail/audit-trail.csv',
      'Audit trail/audit-trail.json',
    ],
    left_out:
      'Email addresses, phone numbers, network addresses and link tokens held in the app are not included.',
  };
  await zip.add('manifest.json', JSON.stringify(manifest, null, 2));
  await zip.add('Read me first.html', indexHtml(rec, manifest, refs, allFiles, gw, pdfName));

  return finish(ctx, zip, pdf, pdfPages, `Portfolio evidence pack - ${fileSafe(rec.name, 40)}`, {
    evidence_items: rec.items.length,
    files: allFiles.length,
    files_included: allFiles.filter((f) => f.included).length,
    criteria_passed: counts.passed,
    criteria_total: counts.total,
    witness_statements: signedWitnesses.length,
    declarations: rec.signatures.length,
    audit_events: rec.audit.length,
  });
}

export function auditText(a: Row, refs: Map<string, string>): string {
  const s = (a.summary ?? {}) as Row;
  const base = AUDIT_LABEL[a.action] ?? String(a.action).replace(/_/g, ' ');
  const bits: string[] = [];
  if (s.unit_code && s.ac_code) bits.push(`${s.unit_code} AC ${s.ac_code}`);
  if (s.title) bits.push(String(s.title));
  if (s.portfolio_item_id && refs.get(s.portfolio_item_id))
    bits.push(refs.get(s.portfolio_item_id)!);
  if (a.object_type === 'portfolio_item' && refs.get(a.object_id))
    bits.push(refs.get(a.object_id)!);
  if (s.assessor_name) bits.push(`by ${s.assessor_name}`);
  if (s.witness_name) bits.push(String(s.witness_name));
  if (s.typed_name) bits.push(String(s.typed_name));
  if (s.signer_name && !s.typed_name) bits.push(String(s.signer_name));
  if (s.kind && a.action === 'gateway_declaration_signed') bits.push(`(${s.kind})`);
  return bits.length ? `${base}: ${[...new Set(bits)].join(', ')}` : base;
}

function indexHtml(
  rec: LearnerRecord,
  manifest: Row,
  refs: Map<string, string>,
  files: FileEntry[],
  gw: GatewayItem[],
  pdfName: string
): string {
  const fileLink = (f: FileEntry) =>
    f.zipPath
      ? `<a href="${esc(hrefPath(f.zipPath))}">${esc(f.name)}</a>`
      : `${esc(f.name)} <em>(${esc(f.note ?? 'not included')})</em>`;
  const critRows = (manifest.criteria as Row[])
    .filter((c) => c.state !== 'suggested')
    .map((c) => {
      const ev = (c.evidence as Row[])
        .map((e) => (e.ref ? `<a href="#${esc(e.ref)}">${esc(e.ref)}</a>` : ''))
        .filter(Boolean)
        .join(', ');
      const d = c.decision as Row | null;
      const wb = ((c.witnessed_by ?? []) as Row[])
        .map(
          (w) =>
            `<br><span class="sm">${esc(witnessedByText({ witness_name: w.name, witness_role: w.role, signed_at: w.signed_at }))}</span>`
        )
        .join('');
      return `<tr><td class="m">${esc(c.unit)} · ${esc(c.ac)}</td><td>${esc(c.text)}${wb}</td><td><span class="st ${esc(STATE_TONE[c.state] ?? '')}">${esc(STATE_LABEL[c.state] ?? c.state)}</span></td><td>${ev || '—'}</td><td>${d ? `${esc(DECISION_LABEL[d.decision] ?? d.decision ?? '')} · ${esc(d.assessor ?? '')}<br><span class="sm">${esc(fmtDate(d.decided_at))}${d.iqa_verdict ? ` · IQA ${esc(d.iqa_verdict === 'confirmed' ? 'confirmed' : 'not confirmed')}` : ''}</span>` : '—'}</td></tr>`;
    })
    .join('');
  const evBlocks = rec.items
    .map((it) => {
      const ref = refs.get(it.id)!;
      const fs = files.filter((f) => f.itemId === it.id);
      const crit = rec.criteriaLinks
        .filter((c) => c.portfolio_item_id === it.id && c.source !== 'ai_suggested')
        .map((c) => `${c.unit_code} AC ${c.ac_code}`)
        .join(', ');
      const decs = rec.decisions
        .filter((d) => (d.evidence_item_ids ?? []).includes(it.id))
        .map(
          (d) =>
            `<li>${esc(d.unit_code)} AC ${esc(d.ac_code)}: <b>${esc(DECISION_LABEL[d.decision] ?? d.decision)}</b>${d.superseded_at ? ' (replaced)' : ''} by ${esc(d.assessor_name ?? 'assessor')}, ${esc(fmtDateTime(d.decided_at))}${d.feedback ? ` — ${esc(d.feedback)}` : ''}</li>`
        )
        .join('');
      const wits = rec.witnesses
        .filter((w) => w.portfolio_item_id === it.id && w.status === 'signed')
        .map(
          (w) =>
            `<li><b>${esc(w.witness_name)}</b>${w.witness_role ? `, ${esc(w.witness_role)}` : ''} signed ${esc(fmtDateTime(w.signed_at))}</li>`
        )
        .join('');
      return `<section class="ev" id="${esc(ref)}"><h3><span class="m">${esc(ref)}</span> ${esc(it.title || 'Untitled evidence')}</h3>
<p class="sm">Added ${esc(fmtDateTime(it.created_at))} · fingerprint <code>${esc(it.content_hash ?? 'not recorded')}</code></p>
${it.description ? `<p>${esc(it.description)}</p>` : ''}
<p><b>Criteria:</b> ${esc(crit || 'none claimed')}</p>
${fs.length ? `<table><thead><tr><th>File</th><th>SHA-256</th><th>Check</th></tr></thead><tbody>${fs.map((f) => `<tr><td>${fileLink(f)}</td><td><code>${esc(f.actualSha256 ?? f.recordedSha256 ?? '')}</code></td><td>${f.matches === true ? 'Matches the record' : f.matches === false ? '<b class="bad">Does not match</b>' : f.included ? 'No fingerprint recorded' : '—'}</td></tr>`).join('')}</tbody></table>` : '<p class="sm">No files.</p>'}
${decs ? `<p><b>Decisions</b></p><ul>${decs}</ul>` : ''}
${wits ? `<p><b>Witness statements</b></p><ul>${wits}</ul>` : ''}
</section>`;
    })
    .join('');
  const t = manifest.totals as Row;
  return `<!doctype html><html lang="en-GB"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>Portfolio evidence pack · ${esc(rec.name)}</title>
<style>
*{box-sizing:border-box}body{margin:0;background:#f4f6f9;color:#0f172a;font:15px/1.55 -apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif}
.wrap{max-width:1100px;margin:32px auto;padding:0 16px}.card{background:#fff;border:1px solid #e5e9f0;border-radius:16px;padding:28px 32px;margin-bottom:18px}
.eyebrow{margin:0 0 4px;font-size:11px;font-weight:700;letter-spacing:1.6px;text-transform:uppercase;color:#92400e}
h1{margin:0 0 8px;font-size:28px;letter-spacing:-.5px}h2{margin:0 0 12px;font-size:19px}h3{margin:0 0 6px;font-size:16px}
table{width:100%;border-collapse:collapse;font-size:13.5px;margin:8px 0}th,td{text-align:left;padding:7px 10px 7px 0;border-bottom:1px solid #e5e9f0;vertical-align:top}
th{font-size:11px;letter-spacing:1px;text-transform:uppercase}code{font-size:11.5px;word-break:break-all}.m{font-family:ui-monospace,Menlo,monospace;font-weight:700}
.sm{font-size:12.5px}.grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(160px,1fr));gap:10px}.fig{border:1px solid #e5e9f0;border-radius:12px;padding:12px}
.fig b{display:block;font-size:24px}.st{font-size:11.5px;font-weight:700;border:1.5px solid currentColor;border-radius:999px;padding:1px 8px;white-space:nowrap}
.passed,.iqa{color:#15803d}.referred{color:#b45309}.rejected,.bad{color:#b91c1c}.ev{border-top:1px solid #e5e9f0;padding-top:14px;margin-top:14px}
a{color:#0a1628;font-weight:600}ul{margin:4px 0 8px;padding-left:20px}li{margin:3px 0}.ok{color:#15803d;font-weight:700}.todo{color:#b45309;font-weight:700}
</style></head><body><div class="wrap">
<div class="card"><p class="eyebrow">Portfolio evidence pack · ${esc(manifest.reference)}</p><h1>${esc(rec.name)}</h1>
<p>${esc([manifest.qualification?.code, manifest.qualification?.title].filter(Boolean).join(' · ') || 'No qualification set')}${manifest.training_provider ? ` · ${esc(manifest.training_provider)}` : ''}</p>
<p class="sm">Generated ${esc(fmtDateTime(manifest.generated_at))} by ${esc(manifest.generated_by?.name)}. Start with <a href="${esc(hrefPath(pdfName))}">the PDF summary</a>. Every file below is in this ZIP; <code>manifest.json</code> holds the same index for software.</p>
<div class="grid"><div class="fig"><b>${t.passed} / ${t.criteria}</b>criteria passed</div><div class="fig"><b>${t.evidence_items}</b>evidence items</div><div class="fig"><b>${t.files_included} / ${t.files}</b>files in this pack</div><div class="fig"><b>${t.witness_statements_signed}</b>witness statements</div><div class="fig"><b>${hrs(t.otj_counted_hours ?? 0)}</b>off-the-job hours</div></div></div>
<div class="card"><h2>Criteria → evidence → decisions</h2>${critRows ? `<table><thead><tr><th>Unit · AC</th><th>Criterion</th><th>State</th><th>Evidence</th><th>Decision</th></tr></thead><tbody>${critRows}</tbody></table>` : '<p>No criteria have evidence or a decision yet.</p>'}</div>
<div class="card"><h2>Evidence</h2>${evBlocks || '<p>No evidence yet.</p>'}</div>
<div class="card"><h2>Gateway</h2><table><tbody>${gw.map((g) => `<tr><td>${esc(g.label)}</td><td class="${g.done ? 'ok' : 'todo'}">${GATE_WORD[g.state]}</td><td>${esc(g.note)}</td></tr>`).join('')}</tbody></table></div>
<div class="card"><h2>Also in this pack</h2><ul>
<li><a href="Declarations/declarations.json">Declarations</a> with the fingerprint of every item signed for, and the signatures as images</li>
<li><a href="${esc(hrefPath('Witness statements/witness-statements.json'))}">Witness statements</a> with the evidence and statement fingerprints</li>
<li><a href="Hours/hours-log.csv">Off-the-job hours log</a> (opens in Excel) and <a href="Hours/hours-summary.json">the totals and statement</a></li>
<li><a href="Gateway/gateway.json">Gateway checklist and declarations</a></li>
<li><a href="${esc(hrefPath('Audit trail/audit-trail.csv'))}">Audit trail</a>: every claim, signature, decision and witness statement, in order</li>
</ul><p class="sm">${esc(manifest.left_out)}</p></div>
</div></body></html>`;
}

// ── Gateway pack ────────────────────────────────────────────────────────────

export async function buildGatewayPack(
  ctx: BuildCtx,
  rec: LearnerRecord,
  generatedAt: string
): Promise<BuildResult> {
  const zip = new ZipWriter();
  const st = rec.snapshot?.standard ?? {};
  const q = rec.snapshot?.qualification ?? {};
  const crit = rec.snapshot?.criteria ?? {};
  const g = rec.gatewayRows[0] ?? null;
  const s = rec.otjSummary ?? {};
  const reference = `GW-${ctx.exportId.slice(0, 8).toUpperCase()}`;
  // The apprentice's own copy leaves out the college's filed funding and
  // contract documents (loadRecord never reads them for a learner).
  const learnerCopy = ctx.access === 'learner';
  const copyLabel = learnerCopy ? 'Apprentice’s copy' : 'College copy';
  const gw = gatewayChecklist(rec);
  const todo = gw.filter((i) => !i.done);
  const decl = (k: string) =>
    rec.declarations.find((d) => d.kind === k && d.signed_at && !d.superseded_at) ?? null;

  // Statements an unsigned declaration would carry, in the current wording.
  const { data: stmts } = await ctx.admin.rpc('get_gateway_statements_for_pack', {
    p_learner: rec.learnerId,
  });
  const statements = (stmts ?? {}) as Row;

  // 1 ─ Supporting files
  await ctx.progress('Collecting the supporting files');
  const budget = { left: FILE_BYTES_CAP };
  const supporting: Array<{
    label: string;
    zipPath: string | null;
    note: string | null;
    sha256: string | null;
  }> = [];
  for (const f of rec.functionalSkills) {
    if (!f.certificate_url) continue;
    const ref = storageRef(f.certificate_url);
    const label = `${f.subject === 'english' ? 'English' : 'Maths'} certificate`;
    if (!ref) {
      supporting.push({
        label,
        zipPath: null,
        note: `Held outside Elec-Mate: ${f.certificate_url}`,
        sha256: null,
      });
      continue;
    }
    const zp = `Supporting files/${fileSafe(label)} - ${fileSafe(ref.path.split('/').pop() ?? 'file', 60)}`;
    const r = await downloadInto(ctx, zip, zp, ref, budget);
    supporting.push(
      'error' in r
        ? { label, zipPath: null, note: r.error, sha256: null }
        : { label, zipPath: zp, note: null, sha256: r.sha }
    );
  }
  for (const d of rec.collegeDocs) {
    if (!d.file_path) continue;
    const label =
      d.title ||
      (d.kind === 'net_readiness_checklist'
        ? 'Signed NET readiness checklist'
        : String(d.kind).replace(/_/g, ' '));
    const zp = `Supporting files/${fileSafe(label, 50)}${d.version > 1 ? ` v${d.version}` : ''} - ${fileSafe(d.file_name ?? d.file_path.split('/').pop() ?? 'file', 60)}`;
    const r = await downloadInto(
      ctx,
      zip,
      zp,
      { bucket: 'college-learner-evidence', path: d.file_path },
      budget
    );
    supporting.push(
      'error' in r
        ? { label, zipPath: null, note: r.error, sha256: null }
        : {
            label,
            zipPath: zp,
            note:
              d.file_hash && d.file_hash !== r.sha
                ? 'Does not match the fingerprint recorded on upload.'
                : null,
            sha256: r.sha,
          }
    );
  }
  for (const d of rec.declarations.filter(
    (x) => x.signed_at && !x.superseded_at && isPng(x.signature_image)
  )) {
    await zip.add(`Declarations/${d.kind}-signature.svg`, signatureSvg(d.signature_image));
  }

  // 2 ─ What the app does not hold
  const toAttach: string[] = [];
  const isEpaRoute = st.route === 'am2s' || st.route === 'am2d';
  const netForm =
    st.route === 'am2d' ? NET_CHECKLIST.am2d : st.route === 'am2s' ? NET_CHECKLIST.am2s : null;
  const netFiled =
    !learnerCopy && rec.collegeDocs.some((d) => d.kind === 'net_readiness_checklist');
  if (netForm && !netFiled) {
    toAttach.push(
      `NET’s ${netForm.name} (${netForm.version}), completed and signed by the apprentice, the employer and the training provider. It is NET’s own controlled form and is not reproduced here; download the current version from NET [2]. NET says: “${netForm.quote}” and “NET will only accept dated signatures within 6 months of the gateway application.”`
    );
  } else if (!netForm) {
    toAttach.push(
      `The assessment organisation’s own gateway form, if it uses one${g?.epa_provider ? ` (${g.epa_provider})` : ''}. The declarations in this pack are Elec-Mate’s wording.`
    );
  }
  toAttach.push(
    `The ${q.awarding_body ? `${q.awarding_body} ` : ''}certificate or results notice for ${q.code ? `${q.code} ` : ''}${q.title || 'the Level 3 qualification'}. The app holds the criteria passed, not the awarding body’s certificate.`
  );
  const isEpa = isEpaRoute;
  if (isEpa && !g?.english_maths_not_required) {
    for (const subj of ['english', 'maths']) {
      const filed = supporting.some((x) => x.zipPath && x.label.toLowerCase().startsWith(subj));
      const certText =
        subj === 'english' ? g?.english_level2_certificate : g?.maths_level2_certificate;
      if (!filed)
        toAttach.push(
          `Level 2 ${subj === 'english' ? 'English' : 'maths'} certificate${certText ? ` (recorded as “${certText}”, file not held)` : ''}.`
        );
    }
  }
  if (learnerCopy) {
    toAttach.push(
      'The college’s own documents for gateway (for example its agreement with the assessment organisation, the employer’s English and maths decision and the statement that you stay employed until the assessment is complete). They are not in your copy: the college adds them when it sends the gateway pack.'
    );
  } else {
    if (
      isEpa &&
      g?.english_maths_not_required &&
      !rec.collegeDocs.some((d) => d.kind === 'fs_decision' || d.kind === 'fs_exemption')
    ) {
      toAttach.push(
        'The employer’s English and maths decision (the app records the decision, not a signed copy).'
      );
    }
    if (!rec.collegeDocs.some((d) => d.kind === 'epa_employment_statement')) {
      toAttach.push(
        'Statement that the apprentice stays employed until the assessment is complete, if your assessment organisation asks for it.'
      );
    }
  }

  // 3 ─ PDF
  await ctx.progress('Laying out the gateway pack');
  const sections: Row[] = [];
  sections.push({
    heading: 'Readiness checklist',
    intro: `Where each gateway requirement stood on ${fmtDate(generatedAt)}, from the apprentice’s record. These are the same lines and words the apprentice and the college see in Elec-Mate. Met: in place. In hand: under way or waiting on someone. Missing: not on the record yet.`,
    kind: 'checklist',
    items: gw.map(checklistRow),
  });
  sections.push({
    heading: 'Qualification evidence',
    kind: 'kv',
    rows: [
      { label: 'Qualification', value: [q.code, q.title].filter(Boolean).join(' · ') || 'Not set' },
      { label: 'Awarding body', value: q.awarding_body || 'Not recorded' },
      {
        label: 'Criteria passed in the portfolio',
        value: `${crit.passed ?? 0} of ${crit.total ?? 0}`,
      },
      { label: 'Confirmed by IQA', value: `${crit.iqa_confirmed ?? 0}` },
      {
        label: 'Portfolio signed off',
        value: g?.portfolio_signed_off ? `Yes, ${fmtDate(g.portfolio_signed_off_at)}` : 'Not yet',
        tone: g?.portfolio_signed_off ? 'ok' : 'warn',
      },
      { label: 'Awarding body certificate', value: 'To attach: not held in the app', tone: 'warn' },
    ],
  });
  if (isEpa) {
    const fsRows: Row[] = [];
    for (const subj of ['english', 'maths'] as const) {
      const f = rec.functionalSkills.filter((x) => x.subject === subj);
      const achieved = subj === 'english' ? g?.english_level2_achieved : g?.maths_level2_achieved;
      const date = subj === 'english' ? g?.english_level2_date : g?.maths_level2_date;
      const cert = supporting.find((x) => x.zipPath && x.label.toLowerCase().startsWith(subj));
      fsRows.push({
        label: subj === 'english' ? 'English' : 'Maths',
        value: achieved
          ? `Level 2 achieved${date ? ` ${fmtDate(date)}` : ''}`
          : g?.english_maths_not_required
            ? 'Not required (employer’s decision, 19 or over at the start)'
            : f.length
              ? f
                  .map((x) =>
                    `${FS_LEVEL[x.level] ?? x.level ?? ''} ${FS_STATUS[x.status] ?? x.status}`.trim()
                  )
                  .join('; ')
              : 'Not recorded',
        note: cert
          ? `Certificate in this pack: ${cert.zipPath}`
          : achieved
            ? 'Certificate: to attach'
            : '',
        tone: achieved || g?.english_maths_not_required ? 'ok' : 'warn',
      });
    }
    sections.push({ heading: 'English and maths', kind: 'kv', rows: fsRows });
  }
  sections.push({ heading: 'Off-the-job training hours', kind: 'kv', rows: hoursKv(rec) });
  const curStmt = rec.otjStatements.find((x) => !x.superseded_at) ?? null;
  const stmtRows = statementKv(curStmt);
  if (stmtRows)
    sections.push({ heading: 'Planned-versus-actual hours statement', kind: 'kv', rows: stmtRows });

  const wordingSrc = (statements.wording_source ?? null) as { title?: string; url?: string } | null;
  const declOpts = {
    currentVersion: Number(statements.version ?? 2),
    source: wordingSrc?.url
      ? `The two employer confirmations use the words of the ${wordingSrc.title} [1].`
      : '',
  };
  sections.push(
    declarationSection(
      decl('learner'),
      'learner',
      statements.learner ?? '',
      'Apprentice declaration',
      declOpts
    )
  );
  sections.push(
    declarationSection(
      decl('employer'),
      'employer',
      statements.employer ?? '',
      'Employer declaration: behaviours and readiness',
      declOpts
    )
  );
  sections.push(
    declarationSection(
      decl('provider'),
      'provider',
      statements.provider ?? '',
      'Training provider readiness declaration',
      declOpts
    )
  );

  sections.push({ heading: 'To attach before sending', kind: 'items', items: toAttach });
  sections.push({
    heading: 'Supporting files in this pack',
    kind: 'table',
    compact: true,
    columns: ['Document', 'In the ZIP', 'SHA-256'],
    widths: ['44mm', '', '52mm'],
    rows: supporting.map((x) => [x.label, x.zipPath ?? x.note ?? '', x.sha256 ?? '']),
    empty: learnerCopy
      ? 'No English or maths certificates are filed in the app yet. The college’s own documents are not in your copy.'
      : 'No supporting documents are filed in the app for this gateway yet.',
  });

  const payload = {
    meta: {
      kind: learnerCopy ? 'EPA gateway pack · apprentice’s copy' : 'EPA gateway pack',
      title: rec.name,
      subtitle: st.code
        ? `${st.title} (${st.code}) · end-point assessment: ${st.assessment}`
        : [q.code, q.title].filter(Boolean).join(' · '),
      reference,
      generated: fmtDateTime(generatedAt),
      generated_by: ctx.requestedByName,
      integrity: 'Each signature is bound to a fingerprint of what the signer saw.',
    },
    status: todo.length
      ? { label: `${todo.length} of ${gw.length} requirements not met yet`, tone: 'warn' }
      : { label: 'Every gateway requirement met', tone: 'ok' },
    org: orgFor(rec),
    cover_facts: pairFacts<Row>([
      { label: 'Apprentice', value: rec.name, big: true, wide: true },
      {
        label: 'Apprenticeship standard',
        value: st.code ? `${st.title} (${st.code})` : 'Not an apprenticeship standard with an EPA',
      },
      { label: 'End-point assessment', value: st.assessment || 'None' },
      { label: 'Qualification', value: [q.code, q.title].filter(Boolean).join(' · ') || 'Not set' },
      { label: 'ULN', value: rec.uln || 'Not recorded', mono: !!rec.uln },
      {
        label: 'Training provider',
        value: rec.college?.name || rec.snapshot?.college_name || 'Not recorded',
      },
      { label: 'Employer', value: rec.snapshot?.employer_name || 'Not recorded' },
      { label: 'Assessment organisation', value: g?.epa_provider || 'Not recorded' },
      {
        label: 'Start and planned end',
        value: rec.startDate
          ? `${fmtDate(rec.startDate)} to ${fmtDate(rec.endDate) || 'not set'}`
          : 'Not recorded',
      },
      { label: 'Prepared', value: `${fmtDateTime(generatedAt)} by ${ctx.requestedByName}` },
      { label: 'Pack reference', value: reference, mono: true },
    ]),
    headline: [
      {
        label: 'Gateway requirements',
        value: String(gw.length - todo.length),
        unit: `of ${gw.length} met`,
        note: todo.length ? 'the rest are below' : 'all met',
      },
      {
        label: 'Criteria passed',
        value: String(crit.passed ?? 0),
        unit: `of ${crit.total ?? 0}`,
        note: '',
      },
      {
        label: 'Off-the-job',
        value: hrs(s.counted_hours ?? 0),
        unit: 'hours',
        note: s.required_hours ? `of ${hrs(s.required_hours)} required` : '',
      },
    ],
    contents: [
      'Readiness checklist',
      'Qualification evidence',
      ...(isEpa ? ['English and maths'] : []),
      'Off-the-job hours',
      'Declarations: apprentice, employer, provider',
      'To attach before sending',
      'Supporting files',
    ],
    alerts: [
      ...(todo.length
        ? [
            {
              tone: 'warn',
              title: 'Not ready to send.',
              text: `${plural(todo.length, 'requirement')} not met yet: ${todo.map((t) => t.label.toLowerCase()).join('; ')}.`,
            },
          ]
        : []),
      ...(!isEpa
        ? [
            {
              tone: 'neutral',
              title: 'No end-point assessment.',
              text: 'This qualification does not lead to the AM2S (ST0152) or AM2D (ST1017), so there is no EPAO gateway. The record below is for the college’s own sign-off.',
            },
          ]
        : []),
    ],
    sections,
    notes: [
      netForm
        ? 'This pack is made from the apprentice’s record in Elec-Mate on the date above. It does not replace NET’s Readiness for Assessment checklist, which the apprentice, employer and training provider sign on NET’s own form. The employer confirmations quote the end-point assessment plan [1]; the rest of the declaration wording is Elec-Mate’s, not NET’s.'
        : 'This pack is made from the apprentice’s record in Elec-Mate on the date above. The wording of the declarations is Elec-Mate’s, not the assessment organisation’s; if the organisation has its own gateway form, complete it and send it with this pack.',
      ...(learnerCopy
        ? [
            'This is the apprentice’s copy. It holds everything in the app about the apprentice; the college’s own funding and contract documents are left out. The college’s copy carries them.',
          ]
        : []),
      'A signature fingerprint (SHA-256) covers the declaration wording and the readiness facts shown to the signer. If those facts change, a new signature is needed.',
      'Signatures were drawn on a screen in white and are shown here in black.',
    ],
    sources: gatewaySources(wordingSrc, netForm),
    disclaimer: `Generated by Elec-Mate on ${fmtDateTime(generatedAt)}. The full portfolio evidence pack is a separate export.`,
  };
  const pdf = await renderLearnerRecord(payload, `EPA gateway pack - ${rec.name}.pdf`);
  const pdfPages = pdfPageCount(pdf);
  const pdfName = `01 Gateway pack - ${fileSafe(rec.name, 40)}.pdf`;
  await zip.add(pdfName, pdf);

  const manifest = {
    kind: 'epa_gateway_pack',
    version: 2,
    copy: learnerCopy ? 'apprentice' : 'college',
    reference,
    export_id: ctx.exportId,
    generated_at: generatedAt,
    generated_by: {
      name: ctx.requestedByName,
      role: ctx.access === 'learner' ? 'apprentice' : 'college',
    },
    learner: {
      name: rec.name,
      uln: rec.uln,
      start_date: rec.startDate,
      planned_end_date: rec.endDate,
    },
    standard: st,
    qualification: q,
    readiness: gw,
    declarations: rec.declarations
      .filter((d) => d.signed_at && !d.superseded_at)
      .map((d) => ({
        kind: d.kind,
        signer_name: d.signer_name,
        signer_role: d.signer_role,
        signer_company: d.signer_company,
        signed_at: d.signed_at,
        statement: d.statement,
        snapshot_sha256: d.snapshot_hash,
        snapshot: d.snapshot,
        signature_file: isPng(d.signature_image) ? `Declarations/${d.kind}-signature.svg` : null,
      })),
    hours: { summary: rec.otjSummary, statement: curStmt },
    supporting_files: supporting,
    to_attach: toAttach,
    declaration_wording: {
      version: Number(statements.version ?? 2),
      source: wordingSrc,
      net_form: netForm,
    },
    pdf: pdfName,
  };
  await zip.add('manifest.json', JSON.stringify(manifest, null, 2));
  await zip.add(
    'Read me first.html',
    `<!doctype html><html lang="en-GB"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>EPA gateway pack · ${esc(rec.name)}</title>
<style>body{margin:0;background:#f4f6f9;color:#0f172a;font:15px/1.55 -apple-system,'Segoe UI',Roboto,Arial,sans-serif}.c{max-width:900px;margin:32px auto;background:#fff;border:1px solid #e5e9f0;border-radius:16px;padding:28px 32px}
h1{margin:0 0 6px}table{width:100%;border-collapse:collapse;font-size:14px}td{padding:7px 10px 7px 0;border-bottom:1px solid #e5e9f0;vertical-align:top}.ok{color:#15803d;font-weight:700}.todo{color:#b45309;font-weight:700}a{color:#0a1628;font-weight:600}code{font-size:11.5px;word-break:break-all}</style></head><body><div class="c">
<p><b>EPA gateway pack · ${esc(copyLabel)} · ${esc(reference)}</b></p><h1>${esc(rec.name)}</h1><p>${esc(st.code ? `${st.title} (${st.code}), ${st.assessment}` : 'No end-point assessment')}</p>
<p>Open <a href="${esc(hrefPath(pdfName))}">the gateway pack PDF</a> first. Generated ${esc(fmtDateTime(generatedAt))} by ${esc(ctx.requestedByName)}.</p>
<h2>Readiness</h2><table>${gw.map((i) => `<tr><td>${esc(i.label)}</td><td class="${i.done ? 'ok' : 'todo'}">${GATE_WORD[i.state]}</td><td>${esc(i.note)}</td></tr>`).join('')}</table>
<h2>Supporting files</h2>${supporting.length ? `<ul>${supporting.map((x) => `<li>${x.zipPath ? `<a href="${esc(hrefPath(x.zipPath))}">${esc(x.label)}</a> <code>${esc(x.sha256 ?? '')}</code>` : `${esc(x.label)}: ${esc(x.note ?? '')}`}</li>`).join('')}</ul>` : '<p>None filed in the app.</p>'}
<h2>To attach before sending</h2><ul>${toAttach.map((t) => `<li>${esc(t)}</li>`).join('')}</ul></div></body></html>`
  );

  return finish(
    ctx,
    zip,
    pdf,
    pdfPages,
    `EPA gateway pack - ${fileSafe(rec.name, 40)}${learnerCopy ? ' - apprentice copy' : ''}`,
    {
      gateway_items: gw.length,
      gateway_done: gw.length - todo.length,
      declarations_signed: rec.declarations.filter((d) => d.signed_at && !d.superseded_at).length,
      supporting_files: supporting.filter((x) => x.zipPath).length,
      to_attach: toAttach.length,
      apprentice_copy: learnerCopy ? 1 : 0,
    }
  );
}

// ── Store ───────────────────────────────────────────────────────────────────

async function finish(
  ctx: BuildCtx,
  zip: ZipWriter,
  pdf: Uint8Array,
  pdfPages: number | null,
  baseName: string,
  counts: Record<string, number>
): Promise<BuildResult> {
  await ctx.progress('Saving the pack');
  const zipBytes = zip.finish();
  const zipSha256 = await sha256Hex(zipBytes);
  const folder = `${ctx.learnerId}/${ctx.exportId}`;
  const zipPath = `${folder}/${baseName}.zip`;
  const pdfPath = `${folder}/${baseName}.pdf`;
  const bucket = ctx.admin.storage.from(EXPORT_BUCKET);
  const up1 = await bucket.upload(zipPath, zipBytes, {
    contentType: 'application/zip',
    upsert: true,
  });
  if (up1.error) throw new Error(`Saving the ZIP failed: ${up1.error.message}`);
  const up2 = await bucket.upload(pdfPath, pdf, { contentType: 'application/pdf', upsert: true });
  if (up2.error) throw new Error(`Saving the PDF failed: ${up2.error.message}`);
  const fileCount = (zipBytes.length && countEntries(zipBytes)) || 0;
  return { zipPath, pdfPath, zipBytes: zipBytes.length, pdfPages, fileCount, zipSha256, counts };
}

/** Entry count from the ZIP's end-of-central-directory record. */
function countEntries(z: Uint8Array): number {
  const i = z.length - 22;
  if (i < 0) return 0;
  return z[i + 10] | (z[i + 11] << 8);
}
