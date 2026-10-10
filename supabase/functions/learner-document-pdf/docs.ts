// deno-lint-ignore-file no-explicit-any
/**
 * learner-document-pdf — the document builders (ELE-2017).
 *
 * Each builder reads the record AFTER index.ts has decided who the caller is
 * and maps it into the Learner Record payload (pdf-templates/learner-record.src.html).
 * Photos are written as `sign:<bucket>/<path>` placeholders; index.ts signs
 * them server-side (format=origin, never WebP) once the content fingerprint
 * has been taken, so a re-download of the same record is served from the
 * stored PDF instead of rendering again.
 */
import type { SupabaseClient } from 'https://esm.sh/@supabase/supabase-js@2.49.4';
import {
  DECISION_LABEL,
  FS_LEVEL,
  FS_STATUS,
  METHOD_LABEL,
  OTJ_STATUS,
  OTJ_TYPE,
  ROLE_LABEL,
  auditText,
  fileSafe,
  fmtDate,
  fmtDateTime,
  gatewayChecklist,
  headlineCounts,
  hrs,
  isPng,
  itemRefs,
  loadRecord,
  orgFor,
  pairFacts,
  plural,
  statementKv,
  storageRef,
  unitSummary,
  type BuildCtx,
} from '../portfolio-export-pack/build.ts';
import { TOOLKIT_AREAS, TOOLKIT_GRADES, TOOLKIT_GUIDE_URL, TOOLKIT_SOURCE_URL } from '../_shared/ofsted-fe-skills-framework.ts';
import type { OfstedSnapshot } from '../_shared/ofsted-signals.ts';

type Row = Record<string, any>;

export interface Doc {
  payload: Row;
  /** Download name, without the extension. */
  filename: string;
  /** Storage folder under documents/, one per record. */
  folder: string;
  /** The apprentice this document is about (for the portfolio audit trail). */
  learnerId: string | null;
}

export interface Who {
  /** The signed-in caller, or null for a token link. */
  userId: string | null;
  name: string;
  role: 'learner' | 'staff' | 'employer' | 'external';
}

const PHOTOS_PER_ITEM = 6;
const PHOTOS_TOTAL = 60;
const AC_TEXT_MAX = 320;

const clip = (s: unknown, n: number) => {
  const t = String(s ?? '').replace(/\s+/g, ' ').trim();
  return t.length > n ? `${t.slice(0, n - 1).trimEnd()}…` : t;
};
const isImageFile = (f: { type?: string | null; name?: string | null; url?: string | null }) =>
  f.type ? String(f.type).startsWith('image/') : /\.(jpe?g|png|heic|webp|gif)(\?|$)/i.test(String(f.name ?? f.url ?? ''));
const signRef = (url: string | null | undefined, ownerPrefix?: string): string => {
  const r = storageRef(url);
  if (!r) return '';
  if (ownerPrefix && !r.path.startsWith(ownerPrefix)) return '';
  if (r.path.includes('..')) return '';
  return `sign:${r.bucket}/${r.path}`;
};
const nowIso = () => new Date().toISOString();
const roleLabel = (r: unknown) => String(r ?? '').replace(/_/g, ' ').replace(/^\w/, (c) => c.toUpperCase());
const generatedBy = (who: Who) =>
  who.role === 'employer' ? `${who.name} (employer link)` : who.role === 'external' ? 'a share link' : who.name;

async function collegeOrg(admin: SupabaseClient, collegeId: string | null | undefined, sub = 'Training provider') {
  if (!collegeId) return { name: '', sub: 'Apprentice record', logo: '' };
  const { data } = await admin.from('colleges').select('name, logo_url').eq('id', collegeId).maybeSingle();
  return { name: (data as Row | null)?.name ?? '', sub, logo: (data as Row | null)?.logo_url ?? '' };
}

async function learnerBasics(admin: SupabaseClient, userId: string | null, studentId?: string | null) {
  let q = admin
    .from('college_students')
    .select('id, user_id, name, uln, start_date, expected_end_date, status, college_id, employer_id, course_id, cohort_id, created_at')
    .order('created_at', { ascending: false });
  q = studentId ? q.eq('id', studentId) : q.eq('user_id', userId);
  const { data: rows } = await q;
  const list = (rows ?? []) as Row[];
  const s =
    list.find((r) => !['withdrawn', 'completed', 'archived'].includes(String(r.status ?? '').toLowerCase())) ?? list[0] ?? null;
  const [prof, employer, course] = await Promise.all([
    userId || s?.user_id
      ? admin.from('profiles').select('full_name').eq('id', userId ?? s?.user_id).maybeSingle().then((r) => r.data as Row | null)
      : Promise.resolve(null),
    s?.employer_id
      ? admin.from('college_employers').select('company_name').eq('id', s.employer_id).maybeSingle().then((r) => r.data as Row | null)
      : Promise.resolve(null),
    s?.course_id
      ? admin.from('college_courses').select('name').eq('id', s.course_id).maybeSingle().then((r) => r.data as Row | null)
      : Promise.resolve(null),
  ]);
  return {
    student: s,
    name: (s?.name as string) || (prof?.full_name as string) || 'Apprentice',
    employer: (employer?.company_name as string) || '',
    course: (course?.name as string) || '',
  };
}

// ── 2 · Shared portfolio (the /view/:token page) ────────────────────────────

export async function buildSharedPortfolio(admin: SupabaseClient, share: Row): Promise<Doc> {
  const scope: string[] | null =
    Array.isArray(share.entry_ids) && share.entry_ids.length
      ? share.entry_ids
      : share.portfolio_item_id
        ? [share.portfolio_item_id]
        : null;
  const { data: v, error } = await admin.rpc('_portfolio_structured', {
    p_user_id: share.user_id,
    p_entry_ids: scope,
    p_for_share: true,
  });
  if (error || !v) throw new Error('The shared portfolio could not be read.');
  const a = (v.apprentice ?? {}) as Row;
  const units = (v.units ?? []) as Row[];
  const entries = (v.entries ?? []) as Row[];
  const otj = (v.otj_hours ?? {}) as Row;
  const ksb = (v.ksb_summary ?? {}) as Row;

  let met = 0;
  let total = 0;
  const unitRows: string[][] = [];
  const stateRows: Row[] = [];
  for (const u of units) {
    let um = 0;
    let ut = 0;
    const acs: Row[] = [];
    for (const lo of u.learning_outcomes ?? []) {
      for (const ac of lo.assessment_criteria ?? []) {
        ut++;
        if (ac.is_met) um++;
        acs.push(ac);
      }
    }
    met += um;
    total += ut;
    unitRows.push([u.unit_code ?? '', u.unit_title ?? '', String(um), String(ut)]);
    // Only the criteria the portfolio holds evidence for; the unit summary counts the rest.
    if (scope === null && um > 0) {
      stateRows.push({ unit: u.unit_code ?? '', unit_title: u.unit_title ?? '' });
      for (const ac of acs.filter((x) => x.is_met)) {
        const text = String(ac.ac_text ?? '');
        const m = text.match(/^(\d+(?:\.\d+)*)\s+(.*)$/s);
        stateRows.push({
          ac: m ? m[1] : '',
          text: clip(m ? m[2] : text, AC_TEXT_MAX),
          state: ac.is_met ? 'Met' : 'Not yet',
          tone: ac.is_met ? 'passed' : 'neutral',
          detail: ac.is_met ? 'Evidence in the portfolio' : 'No evidence yet',
        });
      }
    }
  }

  // Photos: only files in the owner's own folder, as the share page does.
  const owner = `${share.user_id}/`;
  let budget = PHOTOS_TOTAL;
  const sections: Row[] = [];
  if (unitRows.length) {
    sections.push({
      heading: 'Summary by unit',
      kind: 'table',
      compact: true,
      columns: ['Unit', 'Title', 'Met', 'Criteria'],
      widths: ['16mm', '', '16mm', '18mm'],
      rows: unitRows,
    });
  }
  if (stateRows.length) {
    sections.push({
      heading: 'Criteria with evidence',
      intro: 'Each assessment criterion the portfolio holds evidence for, by unit. Criteria not yet evidenced are counted in the unit summary above.',
      kind: 'states',
      rows: stateRows,
    });
  }
  entries.forEach((e, idx) => {
    const files = (Array.isArray(e.files) ? e.files : []).filter((f: Row) => f?.url);
    if (!files.length && e.file_url) files.push({ name: 'Attachment', type: e.file_type, url: e.file_url });
    const photos: Row[] = [];
    for (const f of files) {
      if (photos.length >= PHOTOS_PER_ITEM || budget <= 0) break;
      if (!isImageFile(f)) continue;
      const ref = signRef(f.url, owner);
      if (!ref) continue;
      photos.push({ url: ref, caption: f.name || 'Photo' });
      budget--;
    }
    sections.push({
      heading: idx === 0 ? `Evidence · ${plural(entries.length, 'item')}` : '',
      kind: 'evidence',
      ref: `E${String(idx + 1).padStart(2, '0')}`,
      title: e.title || 'Untitled evidence',
      state: e.grade ? String(e.grade) : '',
      tone: 'neutral',
      facts: [
        { label: 'Added', value: fmtDate(e.created_at) || 'Not recorded' },
        { label: 'Files', value: files.length ? plural(files.length, 'file') : 'None attached' },
      ],
      texts: [
        ...(e.description ? [{ label: 'Description', body: e.description }] : []),
        ...(e.reflection_notes ? [{ label: 'Reflection', body: e.reflection_notes }] : []),
        ...(e.supervisor_feedback ? [{ label: 'Supervisor feedback', body: e.supervisor_feedback }] : []),
      ],
      criteria: (e.assessment_criteria_met ?? []).map((c: string) => ({ code: String(c), text: '', state: 'Claimed', tone: 'claimed' })),
      decisions: [],
      witnesses: [],
      photos,
      files: [],
    });
  });
  if (!entries.length) sections.push({ heading: 'Evidence', kind: 'text', paragraphs: ['This share holds no evidence yet.'] });

  const ksbRows = [...(ksb.knowledge ?? []), ...(ksb.skills ?? []), ...(ksb.behaviours ?? [])].map((k: Row) => [
    k.code ?? '',
    k.title ?? '',
    String(k.status ?? 'not_started').replace(/_/g, ' ').replace(/^\w/, (c) => c.toUpperCase()),
  ]);
  if (scope === null && ksbRows.length) {
    sections.push({
      heading: 'Knowledge, skills and behaviours',
      kind: 'table',
      compact: true,
      columns: ['Code', 'Title', 'Status'],
      widths: ['16mm', '', '36mm'],
      rows: ksbRows,
    });
  }
  if (scope === null) {
    sections.push({
      heading: 'Off-the-job training hours',
      kind: 'kv',
      rows: [
        { label: 'Hours counted', value: `${hrs(otj.current)} hours` },
        { label: 'Hours required', value: otj.target ? `${hrs(otj.target)} hours` : 'Not set' },
      ],
    });
  }

  const generated = nowIso();
  return {
    learnerId: share.user_id,
    folder: `shared_portfolio/${share.id}`,
    filename: `${fileSafe(a.name || 'Apprentice', 50)} - shared portfolio`,
    payload: {
      meta: {
        kind: 'Shared portfolio',
        series: 'Learner record',
        title: a.name || 'Apprentice portfolio',
        subtitle: share.title && share.title !== 'Portfolio' ? share.title : [a.qualification, a.level].filter(Boolean).join(' · ') || 'Apprentice portfolio',
        reference: `SP-${String(share.id).slice(0, 8).toUpperCase()}`,
        generated: fmtDateTime(generated),
        generated_by: 'the share link',
        integrity: scope ? 'Only the evidence this share covers is included.' : 'The whole portfolio, as shared.',
      },
      status: { label: total ? `${met} of ${total} criteria with evidence` : `${plural(entries.length, 'evidence item')}`, tone: 'neutral' },
      org: { name: a.training_provider || '', sub: a.training_provider ? 'Training provider' : 'Apprentice record', logo: '' },
      cover_facts: pairFacts<Row>([
        { label: 'Apprentice', value: a.name || 'Apprentice', big: true, wide: true },
        { label: 'Qualification', value: [a.code, a.qualification].filter(Boolean).join(' · ') || 'Not set' },
        { label: 'Awarding body', value: a.awarding_body || 'Not recorded' },
        { label: 'Training provider', value: a.training_provider || 'Not recorded' },
        { label: 'Employer', value: a.employer || 'Not recorded' },
        { label: 'Start and planned end', value: a.start_date ? `${fmtDate(a.start_date)} to ${fmtDate(a.expected_end) || 'not set'}` : 'Not recorded' },
        { label: 'Shared as', value: share.title || 'Portfolio' },
        ...(share.description ? [{ label: 'Note from the apprentice', value: share.description, wide: true }] : []),
        { label: 'Link valid until', value: share.expires_at ? fmtDate(share.expires_at) : 'No expiry set' },
      ]),
      headline: [
        ...(total ? [{ label: 'Criteria with evidence', value: String(met), unit: `of ${total}`, note: '' }] : []),
        { label: 'Evidence', value: String(entries.length), unit: entries.length === 1 ? 'item' : 'items', note: '' },
        ...(scope === null
          ? [{ label: 'Off-the-job', value: hrs(otj.current), unit: 'hours', note: otj.target ? `of ${hrs(otj.target)} required` : '' }]
          : []),
      ],
      contents: [
        ...(unitRows.length ? ['Summary by unit'] : []),
        ...(stateRows.length ? ['Criteria with evidence'] : []),
        'Evidence, with photos',
        ...(scope === null ? ['Knowledge, skills and behaviours', 'Off-the-job hours'] : []),
      ],
      alerts: [],
      sections,
      notes: [],
      disclaimer:
        'Made from a portfolio share link. Comments and feedback left on the share page are advisory; assessment decisions are recorded by an assessor in Elec-Mate.',
    },
  };
}

// ── 4 · Planned-versus-actual hours statement ───────────────────────────────

export async function buildOtjStatement(admin: SupabaseClient, st: Row, who: Who): Promise<Doc> {
  const base = await learnerBasics(admin, st.user_id, st.college_student_id);
  const org = await collegeOrg(admin, st.college_id ?? base.student?.college_id);
  const shortfall = Number(st.planned_hours ?? 0) - Number(st.actual_hours ?? 0);
  const generated = nowIso();
  const status = st.superseded_at
    ? { label: 'Replaced by a newer statement', tone: 'neutral' }
    : st.learner_signed_at && st.employer_signed_at
      ? { label: 'Signed by the apprentice and the employer', tone: 'ok' }
      : { label: 'Waiting for signatures', tone: 'warn' };
  return {
    learnerId: st.user_id,
    folder: `otj_statement/${st.id}`,
    filename: `${fileSafe(base.name, 50)} - off-the-job hours statement`,
    payload: {
      meta: {
        kind: 'Off-the-job hours statement',
        series: 'Learner record',
        title: base.name,
        subtitle: 'Planned versus actual off-the-job training hours',
        reference: `OTJ-${String(st.id).slice(0, 8).toUpperCase()}`,
        generated: fmtDateTime(generated),
        generated_by: generatedBy(who),
        integrity: '',
      },
      status,
      org,
      cover_facts: pairFacts<Row>([
        { label: 'Apprentice', value: base.name, big: true, wide: true },
        { label: 'ULN', value: base.student?.uln || 'Not recorded', mono: !!base.student?.uln },
        { label: 'Training provider', value: org.name || 'Not recorded' },
        { label: 'Employer', value: st.employer_company || base.employer || 'Not recorded' },
        { label: 'Course', value: base.course || 'Not recorded' },
        { label: 'Start and planned end', value: base.student?.start_date ? `${fmtDate(base.student.start_date)} to ${fmtDate(base.student.expected_end_date) || 'not set'}` : 'Not recorded' },
        { label: 'Prepared', value: `${fmtDate(st.prepared_at)} by ${st.prepared_by_name || 'the college'}` },
      ]),
      headline: [
        { label: 'Planned', value: hrs(st.planned_hours), unit: 'hours', note: '' },
        { label: 'Actual', value: hrs(st.actual_hours), unit: 'hours', note: shortfall > 0 ? `${hrs(shortfall)} fewer than planned` : 'Planned hours met' },
        { label: 'Verified', value: hrs(st.verified_hours), unit: 'hours', note: 'by the college' },
        { label: 'In the app', value: hrs(st.app_learning_hours), unit: 'hours', note: 'measured learning' },
      ],
      contents: [],
      alerts: st.superseded_at
        ? [{ tone: 'neutral', title: 'Replaced.', text: `A newer statement was prepared on ${fmtDate(st.superseded_at)}. This copy is kept for the record.` }]
        : [],
      sections: [
        { heading: 'The statement', kind: 'kv', rows: statementKv(st) ?? [] },
        {
          heading: 'Why this statement exists',
          kind: 'text',
          paragraphs: [
            'When an apprentice completes fewer off-the-job training hours than were planned, the apprenticeship funding rules (2025 to 2026, paragraphs 92 to 94) ask the training provider to record the planned and actual hours and the reason, and for the employer and the apprentice to sign it.',
            'Actual hours are those counted on the apprentice’s record: hours verified by the college or confirmed by the employer, and learning measured in Elec-Mate.',
          ],
        },
        {
          heading: 'Signatures',
          kind: 'sigs',
          signers: [
            {
              role: 'Apprentice',
              name: st.learner_signed_name || '',
              when: st.learner_signed_at ? fmtDateTime(st.learner_signed_at) : '',
              method: st.learner_signed_at ? 'Typed name, signed in the app' : '',
              image: '',
            },
            {
              role: `Employer${st.employer_signed_role ? ` · ${st.employer_signed_role}` : ''}`,
              name: st.employer_signed_name ? `${st.employer_signed_name}${st.employer_company ? `, ${st.employer_company}` : ''}` : '',
              when: st.employer_signed_at ? fmtDateTime(st.employer_signed_at) : '',
              method: st.employer_signed_at ? 'Typed name, signed through the college’s link (no account)' : '',
              image: '',
            },
            {
              role: 'Prepared by the training provider',
              name: st.prepared_by_name || 'College',
              when: fmtDateTime(st.prepared_at),
              method: 'Prepared in Elec-Mate',
              image: '',
            },
          ],
        },
      ],
      notes: [],
      disclaimer: '',
    },
  };
}

// ── 4b · Off-the-job hours log (apprentice's hours, any time) ───────────────

export async function buildOtjLog(admin: SupabaseClient, learnerId: string, who: Who): Promise<Doc> {
  const base = await learnerBasics(admin, learnerId);
  const org = await collegeOrg(admin, base.student?.college_id);
  const [{ data: sum }, { data: entries }, { data: stmts }] = await Promise.all([
    admin.rpc('_otj_summary_core', { p_user: learnerId }),
    admin
      .from('college_otj_entries')
      .select(
        'id, activity_date, duration_minutes, activity_type, title, source_kind, verification_status, verified_at, verified_by, attested_by_name, recorded_by_name_snapshot, attestation_comment, verification_rationale'
      )
      .eq('student_id', learnerId)
      .order('activity_date', { ascending: false })
      .limit(3000),
    admin
      .from('otj_hours_statements')
      .select('*')
      .eq('user_id', learnerId)
      .is('superseded_at', null)
      .order('prepared_at', { ascending: false })
      .limit(1),
  ]);
  const s = (sum ?? {}) as Row;
  const list = (entries ?? []) as Row[];
  const signed = list.filter((e) => e.verification_status === 'verified' || e.verification_status === 'verified_by_employer');
  const verifierIds = [...new Set(signed.map((e) => e.verified_by).filter(Boolean))];
  const { data: verifiers } = verifierIds.length
    ? await admin.from('profiles').select('id, full_name').in('id', verifierIds)
    : { data: [] };
  const verifierName = new Map(((verifiers ?? []) as Row[]).map((p) => [p.id, (p.full_name as string) || '']));
  const generated = nowIso();
  const st = ((stmts ?? []) as Row[])[0] ?? null;
  const sections: Row[] = [
    {
      heading: 'Where the hours stand',
      kind: 'kv',
      rows: [
        { label: 'Hours required', value: s.required_hours ? `${hrs(s.required_hours)} hours` : 'Not set' },
        { label: 'Hours counted', value: `${hrs(s.counted_hours)} hours` },
        { label: 'Planned by today', value: s.planned_to_date_hours != null ? `${hrs(s.planned_to_date_hours)} hours` : 'Not set' },
        { label: 'Needed each week to finish', value: s.weekly_needed_hours != null ? `${hrs(s.weekly_needed_hours)} hours` : 'Not set' },
        { label: 'Verified by the college', value: `${hrs(s.college_verified_hours ?? s.verified_hours)} hours` },
        { label: 'Confirmed by the employer', value: `${hrs(s.employer_attested_hours)} hours` },
        { label: 'Learning measured in the app', value: `${hrs(s.app_learning_hours)} hours` },
        { label: 'Waiting to be checked', value: `${hrs(s.pending_hours)} hours` },
      ],
    },
  ];
  if (st) sections.push({ heading: 'Planned-versus-actual statement', kind: 'kv', rows: statementKv(st) ?? [] });
  sections.push({
    heading: `Hours log · ${plural(list.length, 'entry', 'entries')}`,
    intro: 'Every off-the-job entry on the record, newest first. Learning measured in the app counts in the totals above and appears here once a tutor has decided on it.',
    kind: 'table',
    compact: true,
    columns: ['Date', 'Activity', 'Type', 'Hours', 'Status'],
    widths: ['24mm', '', '28mm', '14mm', '36mm'],
    rows: list.map((e) => [
      fmtDate(e.activity_date),
      e.title || '',
      OTJ_TYPE[e.activity_type] ?? String(e.activity_type ?? '').replace(/_/g, ' '),
      hrs((e.duration_minutes ?? 0) / 60),
      e.source_kind === 'in_app' && e.verification_status === 'rejected'
        ? 'Left out by tutor'
        : OTJ_STATUS[e.verification_status] ?? e.verification_status ?? '',
    ]),
    empty: 'No off-the-job entries recorded yet.',
  });
  sections.push({
    heading: `Sign-offs · ${signed.length}`,
    intro: 'Who verified or confirmed each entry.',
    kind: 'table',
    compact: true,
    columns: ['Date', 'Activity', 'Hours', 'Signed off by', 'When'],
    widths: ['24mm', '', '14mm', '48mm', '30mm'],
    rows: signed.map((e) => {
      const employer = e.verification_status === 'verified_by_employer' || e.source_kind === 'employer_attested';
      const by =
        e.source_kind === 'in_app'
          ? `${String(e.verification_rationale ?? '').replace(/^App learning approved by /, '') || 'Tutor'} (tutor)`
          : employer
            ? `${e.attested_by_name || 'Employer'} (employer)`
            : `${verifierName.get(e.verified_by) || 'Tutor'} (college)`;
      return [fmtDate(e.activity_date), e.title || '', hrs((e.duration_minutes ?? 0) / 60), by, fmtDate(e.verified_at)];
    }),
    empty: 'Nothing signed off yet.',
  });

  return {
    learnerId,
    folder: `otj_log/${learnerId}`,
    filename: `${fileSafe(base.name, 50)} - off-the-job hours`,
    payload: {
      meta: {
        kind: 'Off-the-job training hours',
        series: 'Learner record',
        title: base.name,
        subtitle: 'Hours log, sign-offs and where the hours stand',
        reference: `OTJ-${learnerId.slice(0, 8).toUpperCase()}`,
        generated: fmtDateTime(generated),
        generated_by: generatedBy(who),
        integrity: '',
      },
      status: {
        label: s.risk === 'on_track' ? 'On track' : s.risk === 'at_risk' ? 'At risk' : s.risk === 'behind' ? 'Behind' : 'Hours log',
        tone: s.risk === 'on_track' ? 'ok' : s.risk ? 'warn' : 'neutral',
      },
      org,
      cover_facts: pairFacts<Row>([
        { label: 'Apprentice', value: base.name, big: true, wide: true },
        { label: 'ULN', value: base.student?.uln || 'Not recorded', mono: !!base.student?.uln },
        { label: 'Training provider', value: org.name || 'Not recorded' },
        { label: 'Employer', value: base.employer || 'Not recorded' },
        { label: 'Course', value: base.course || 'Not recorded' },
        { label: 'Start and planned end', value: s.start_date ? `${fmtDate(s.start_date)} to ${fmtDate(s.end_date) || 'not set'}` : 'Not recorded' },
      ]),
      headline: [
        { label: 'Counted', value: hrs(s.counted_hours), unit: 'hours', note: s.required_hours ? `of ${hrs(s.required_hours)} required` : '' },
        { label: 'Signed off', value: hrs((s.college_verified_hours ?? 0) + (s.employer_attested_hours ?? 0)), unit: 'hours', note: 'college and employer' },
        { label: 'In the app', value: hrs(s.app_learning_hours), unit: 'hours', note: 'measured learning' },
        { label: 'Waiting', value: hrs(s.pending_hours), unit: 'hours', note: 'to be checked' },
      ],
      contents: ['Where the hours stand', ...(st ? ['Planned-versus-actual statement'] : []), 'Hours log', 'Sign-offs'],
      alerts: [],
      sections,
      notes: [],
      disclaimer: 'Figures come from the one off-the-job calculation the apprentice, tutor and employer all see in Elec-Mate.',
    },
  };
}

// ── 5 · Tripartite progress review record ───────────────────────────────────

const MODE_LABEL: Record<string, string> = { in_person: 'In person', video: 'Video call', phone: 'Phone', email: 'By email' };
const ATTENDANCE_LABEL: Record<string, string> = {
  attended: 'Attended',
  contributed: 'Contributed, did not attend',
  invited_no_response: 'Invited, no reply',
};
const PLAN_CHANGE_LABEL: Record<string, string> = {
  none: 'No change',
  minor: 'Small change',
  content: 'Content added or removed',
  end_date: 'End date changed',
  otj_release: 'Off-the-job release changed',
};
const OWNER_LABEL: Record<string, string> = { apprentice: 'Apprentice', employer: 'Employer', college: 'College' };
const PROGRESS_LABEL: Record<string, string> = { ahead: 'Ahead', on_track: 'On track', behind: 'Behind' };
const ACTION_STATUS: Record<string, string> = { open: 'Open', done: 'Done', not_done: 'Not done', dropped: 'Dropped' };

function inputText(i: Row | null | undefined): string {
  if (!i) return '';
  return [
    i.progress ? `Progress: ${PROGRESS_LABEL[i.progress] ?? i.progress}` : '',
    i.going_well ? `Going well: ${i.going_well}` : '',
    i.focus_next ? `Focus next: ${i.focus_next}` : '',
    i.concerns ? `Concerns: ${i.concerns}` : '',
  ]
    .filter(Boolean)
    .join('\n');
}

export async function buildReviewRecord(admin: SupabaseClient, r: Row, who: Who): Promise<Doc> {
  const snap = (r.snapshot ?? {}) as Row;
  const pre = (snap.prefill ?? {}) as Row;
  const out = (snap.outcomes ?? r.outcomes ?? {}) as Row;
  const sig = (r.signatures ?? {}) as Row;
  const learner = (pre.learner ?? {}) as Row;
  const { data: s } = await admin.from('college_students').select('id, user_id, name, uln').eq('id', r.student_id).maybeSingle();
  const org = await collegeOrg(admin, r.college_id);
  const name = learner.name || (s as Row | null)?.name || 'Apprentice';
  const otj = (pre.otj ?? {}) as Row;
  const att = (pre.attendance_since ?? {}) as Row;
  const ev = (pre.evidence_since ?? {}) as Row;
  const held = snap.held_on || r.held_on;
  const ls = (out.learning_support ?? {}) as Row;
  const lsShown = ls.applies && ls.employer_consent && ls.note;
  const allSigned = sig.tutor_signed_at && sig.student_signed_at && (sig.employer_signed_at || !snap.employer_must_sign);
  const generated = nowIso();

  const sections: Row[] = [
    {
      heading: 'The review',
      kind: 'kv',
      rows: [
        { label: 'Held on', value: fmtDate(held) || 'Not recorded' },
        { label: 'How it was held', value: MODE_LABEL[snap.mode ?? r.mode] ?? 'Not recorded' },
        { label: 'Employer', value: ATTENDANCE_LABEL[snap.employer_attendance ?? r.employer_attendance] ?? 'Not recorded' },
        { label: 'Period covered', value: pre.since ? `${fmtDate(pre.since)} to ${fmtDate(held)}` : 'Not recorded' },
        { label: 'Tutor', value: snap.tutor_name || sig.tutor_name || 'Not recorded' },
        { label: 'Next review due by', value: fmtDate(pre.due_by) || 'Not set' },
      ],
    },
    {
      heading: 'Progress since the last review',
      kind: 'kv',
      rows: [
        { label: 'Off-the-job hours counted', value: otj.counted_hours != null ? `${hrs(otj.counted_hours)} of ${hrs(otj.required_hours)} hours` : 'Not recorded' },
        { label: 'Planned by this date', value: otj.planned_to_date_hours != null ? `${hrs(otj.planned_to_date_hours)} hours` : 'Not set' },
        { label: 'Hours verified in this period', value: `${hrs(pre.hours_since)} hours` },
        { label: 'Attendance in this period', value: att.sessions ? `${att.percent ?? 0}% of ${plural(att.sessions, 'session')}` : 'No sessions recorded' },
        { label: 'Evidence signed off', value: String(ev.signed_off ?? 0) },
        { label: 'Waiting for assessment', value: String(ev.awaiting_assessment ?? 0) },
        { label: 'Witness statements', value: String(ev.witness_statements ?? 0) },
        { label: 'Course', value: learner.course || 'Not recorded' },
      ],
    },
    {
      heading: 'What was discussed',
      kind: 'kv',
      rows: [
        { label: 'Summary', value: out.summary || 'Not recorded', wide: true },
        ...(out.progress_notes ? [{ label: 'Progress', value: out.progress_notes, wide: true }] : []),
        ...(out.training_notes ? [{ label: 'Training', value: out.training_notes, wide: true }] : []),
        ...(out.otj_review ? [{ label: 'Off-the-job training', value: out.otj_review, wide: true }] : []),
        ...(out.evidence_notes ? [{ label: 'Evidence', value: out.evidence_notes, wide: true }] : []),
        { label: 'Training plan', value: PLAN_CHANGE_LABEL[out.plan_change] ?? 'Not recorded' },
        ...(out.ilp_updates ? [{ label: 'Plan change detail', value: out.ilp_updates, wide: true }] : []),
        ...(out.concerns ? [{ label: 'Concerns raised', value: out.concerns, wide: true }] : []),
        ...(lsShown ? [{ label: 'Learning support', value: ls.note, wide: true }] : []),
      ],
    },
  ];
  const li = inputText(snap.learner_input ?? r.learner_input);
  const ei = inputText(snap.employer_input ?? r.employer_input);
  if (li || ei) {
    sections.push({
      heading: 'Before the review',
      kind: 'kv',
      rows: [
        { label: 'From the apprentice', value: li || 'Nothing sent', wide: true },
        { label: 'From the employer', value: ei || 'Nothing sent', wide: true },
      ],
    });
  }
  const checked = (snap.checked_actions ?? []) as Row[];
  sections.push({
    heading: 'Actions from the last review',
    kind: 'table',
    compact: true,
    columns: ['Action', 'Who', 'Outcome', 'Note'],
    widths: ['', '24mm', '22mm', '58mm'],
    rows: checked.map((a) => [a.action ?? '', OWNER_LABEL[a.owner_party] ?? a.owner_party ?? '', ACTION_STATUS[a.status] ?? a.status ?? '', a.outcome_note ?? '']),
    empty: 'This was the first review, or no actions were carried over.',
  });
  const agreed = (snap.agreed_actions ?? []) as Row[];
  sections.push({
    heading: 'Actions agreed for the next review',
    kind: 'table',
    compact: true,
    columns: ['Action', 'Who', 'By'],
    widths: ['', '28mm', '30mm'],
    rows: agreed.map((a) => [a.action ?? '', OWNER_LABEL[a.owner_party] ?? a.owner_party ?? '', fmtDate(a.due_date) || 'Next review']),
    empty: 'No actions agreed.',
  });
  sections.push({
    heading: 'Signatures',
    kind: 'sigs',
    statement: snap.employer_must_sign
      ? 'The training plan changed at this review, so the employer signs as well as the apprentice and the college.'
      : '',
    signers: [
      { role: 'Tutor, for the college', name: sig.tutor_name || '', when: sig.tutor_signed_at ? fmtDateTime(sig.tutor_signed_at) : '', method: sig.tutor_signed_at ? 'Signed off in Elec-Mate' : '', image: '' },
      {
        role: 'Apprentice',
        name: sig.student_signed_at ? sig.student_name || name : '',
        when: sig.student_signed_at ? fmtDateTime(sig.student_signed_at) : '',
        method: sig.student_signed_at ? (sig.student_signed_via === 'paper' ? 'Signed on paper, recorded by the college' : 'Signed in the app') : '',
        image: '',
      },
      {
        role: `Employer${sig.employer_role ? ` · ${sig.employer_role}` : ''}`,
        name: sig.employer_name || '',
        when: sig.employer_signed_at ? fmtDateTime(sig.employer_signed_at) : snap.employer_must_sign ? '' : 'Not required for this review',
        method: sig.employer_signed_at ? 'Signed through the college’s link (no account)' : '',
        image: '',
      },
    ],
  });

  return {
    learnerId: (s as Row | null)?.user_id ?? null,
    folder: `review_record/${r.id}`,
    filename: `${fileSafe(name, 50)} - progress review ${held ?? ''}`.trim(),
    payload: {
      meta: {
        kind: 'Progress review record',
        series: 'Learner record',
        title: name,
        subtitle: `Tripartite progress review${held ? `, ${fmtDate(held)}` : ''}`,
        reference: `PR-${String(r.id).slice(0, 8).toUpperCase()}`,
        generated: fmtDateTime(generated),
        generated_by: generatedBy(who),
        integrity: r.content_hash ? `Record fingerprint ${r.content_hash}` : '',
      },
      status: allSigned ? { label: 'Signed by everyone', tone: 'ok' } : { label: 'Waiting for signatures', tone: 'warn' },
      org,
      cover_facts: pairFacts<Row>([
        { label: 'Apprentice', value: name, big: true, wide: true },
        { label: 'ULN', value: (s as Row | null)?.uln || 'Not recorded', mono: !!(s as Row | null)?.uln },
        { label: 'Employer', value: learner.employer || 'Not recorded' },
        { label: 'Course', value: learner.course || 'Not recorded' },
        { label: 'Cohort', value: learner.cohort || 'Not recorded' },
        { label: 'Held on', value: fmtDate(held) || 'Not recorded' },
        { label: 'How it was held', value: MODE_LABEL[snap.mode ?? r.mode] ?? 'Not recorded' },
      ]),
      headline: [
        { label: 'Off-the-job', value: hrs(otj.counted_hours), unit: 'hours', note: otj.required_hours ? `of ${hrs(otj.required_hours)} required` : '' },
        { label: 'Attendance', value: att.sessions ? String(att.percent ?? 0) : '–', unit: att.sessions ? '%' : '', note: 'since the last review' },
        { label: 'Actions', value: String(agreed.length), unit: 'agreed', note: `${checked.length} carried over` },
      ],
      contents: ['The review', 'Progress since the last review', 'What was discussed', 'Actions', 'Signatures'],
      alerts: [],
      sections,
      notes: [],
      disclaimer:
        'The record as signed off by the college (apprenticeship funding rules 2025 to 2026, paragraphs 97 and 98). Wellbeing and safeguarding notes are held by the college and are not part of the shared record. It cannot be changed after sign-off.',
    },
  };
}

// ── 8 · Witness statement ───────────────────────────────────────────────────

export async function buildWitnessStatement(admin: SupabaseClient, w: Row, who: Who): Promise<Doc> {
  const base = await learnerBasics(admin, w.learner_id);
  const org = await collegeOrg(admin, base.student?.college_id);
  const snap = (w.evidence_snapshot ?? {}) as Row;
  const { data: item } = w.portfolio_item_id
    ? await admin.from('portfolio_items').select('title, content_hash, storage_urls, file_url, file_type').eq('id', w.portfolio_item_id).maybeSingle()
    : { data: null };
  const photos: Row[] = [];
  for (const f of (Array.isArray((item as Row | null)?.storage_urls) ? (item as Row).storage_urls : []) as Row[]) {
    if (photos.length >= PHOTOS_PER_ITEM) break;
    if (!f?.url || !isImageFile(f)) continue;
    const ref = signRef(f.url, `${w.learner_id}/`);
    if (ref) photos.push({ url: ref, caption: f.name || 'Photo' });
  }
  const title = snap.title || (item as Row | null)?.title || 'Evidence';
  const generated = nowIso();
  const sections: Row[] = [
    {
      heading: 'The evidence the witness saw',
      kind: 'evidence',
      ref: '',
      title,
      state: '',
      tone: '',
      facts: [
        { label: 'Captured for the witness', value: fmtDateTime(snap.captured_at) || 'Not recorded' },
        { label: 'Criteria claimed', value: (snap.criteria ?? []).join(', ') || 'None listed' },
        { label: 'Evidence fingerprint at signing (SHA-256)', value: w.evidence_hash || 'Not recorded', mono: true, wide: true },
      ],
      texts: snap.description ? [{ label: 'Description', body: snap.description }] : [],
      criteria: [],
      decisions: [],
      witnesses: [],
      photos,
      files: [],
    },
    {
      heading: 'Statement',
      kind: 'declaration',
      statement: w.statement || 'No statement written.',
      signer: {
        role: `Witness${w.witness_role ? ` · ${w.witness_role}` : ''}`,
        name: w.witness_name || '',
        when: fmtDateTime(w.signed_at),
        method: isPng(w.signature_data) ? 'Drawn signature, signed through a witness link (no account)' : 'Typed name, signed through a witness link (no account)',
        image: isPng(w.signature_data) ? w.signature_data : '',
        ink: 'light',
      },
      facts: [
        ...(w.witness_company ? [{ label: 'Company', value: w.witness_company }] : []),
        { label: 'Criteria witnessed', value: (w.criteria ?? []).join(', ') || 'Not listed' },
        { label: 'Statement fingerprint (SHA-256)', value: w.statement_hash || 'Not recorded', mono: true },
      ],
      items: [],
    },
  ];
  return {
    learnerId: w.learner_id,
    folder: `witness_statement/${w.id}`,
    filename: `${fileSafe(base.name, 40)} - witness statement - ${fileSafe(w.witness_name || 'witness', 30)}`,
    payload: {
      meta: {
        kind: 'Witness statement',
        series: 'Learner record',
        title: base.name,
        subtitle: title,
        reference: `WS-${String(w.id).slice(0, 8).toUpperCase()}`,
        generated: fmtDateTime(generated),
        generated_by: generatedBy(who),
        integrity: 'The fingerprints show the evidence and statement are as signed.',
      },
      status: { label: `Signed ${fmtDate(w.signed_at)}`, tone: 'ok' },
      org,
      cover_facts: pairFacts<Row>([
        { label: 'Apprentice', value: base.name, big: true, wide: true },
        { label: 'Evidence', value: title, wide: true },
        { label: 'Witness', value: [w.witness_name, w.witness_role].filter(Boolean).join(', ') || 'Not recorded' },
        { label: 'Company', value: w.witness_company || 'Not recorded' },
        { label: 'Signed', value: fmtDateTime(w.signed_at) },
        { label: 'Criteria witnessed', value: (w.criteria ?? []).join(', ') || 'Not listed' },
      ]),
      headline: [],
      contents: [],
      alerts: [],
      sections,
      notes: [],
      disclaimer:
        'The witness read a frozen copy of the evidence, then wrote and signed this statement through a one-time link without an account. The evidence fingerprint was taken from that copy at the moment of signing.',
    },
  };
}

// ── 6a · Funding evidence pack (one learner, ELE-1908) ──────────────────────

const PACK_STATUS: Record<string, string> = {
  ok: 'In place',
  missing: 'Missing',
  attention: 'Needs action',
  due: 'Due',
  not_yet_due: 'Not yet due',
  not_applicable: 'Not needed',
};
const PACK_TONE: Record<string, string> = {
  ok: 'done',
  missing: 'rejected',
  attention: 'todo',
  due: 'todo',
  not_yet_due: 'neutral',
  not_applicable: 'neutral',
};
const KIND_LABEL: Record<string, string> = {
  id_residency: 'Identity and residency',
  eligibility_declaration: 'Eligibility declaration',
  employment_contract: 'Contract of employment',
  employer_declaration: 'Employer declaration of employment',
  apprenticeship_agreement: 'Apprenticeship agreement',
  training_plan: 'Training plan',
  initial_assessment: 'Initial assessment',
  rpl_summary: 'Prior learning summary',
  fs_decision: 'English and maths decision',
  fs_exemption: 'English and maths exemption',
  learning_support_plan: 'Learning support plan',
  care_leaver_info: 'Care leavers’ bursary information',
  care_leaver_la_letter: 'Local authority care leaver letter',
  contract_for_services: 'Contract for services',
  wage_confirmation: 'Wage statement',
  epao_agreement: 'Assessment organisation agreement',
  net_readiness_checklist: 'Signed readiness checklist (NET)',
  epa_employment_statement: 'Employed until assessment statement',
  epa_result: 'Assessment result',
  epa_certificate: 'Assessment certificate',
  break_return_revision: 'Revised plan after a break',
  custom: 'College requirement',
  other: 'Other document',
};
const EPISODE_LABEL: Record<string, string> = {
  start: 'Started',
  break: 'On Break',
  return: 'Returned from a break',
  employer_change: 'Changed employer',
  withdrawal: 'Withdrew',
  completion: 'Completed',
};

export function buildFundingPack(pack: Row, org: Row, who: Who): Doc {
  const l = (pack.learner ?? {}) as Row;
  const items = (pack.items ?? []) as Row[];
  const applicable = items.filter((i) => i.status !== 'not_applicable');
  const inPlace = applicable.filter((i) => i.status === 'ok').length;
  const missing = items.filter((i) => i.status === 'missing' || i.status === 'attention' || i.status === 'due');
  const groups: Array<[string, Row[]]> = [
    ['At the start', items.filter((i) => !i.custom && i.group === 'start')],
    ['During the apprenticeship', items.filter((i) => !i.custom && i.group === 'during')],
    ['At gateway and the end', items.filter((i) => !i.custom && i.group === 'end')],
    ['Your college’s requirements', items.filter((i) => i.custom)],
  ];
  const sections: Row[] = [];
  if (missing.length) {
    sections.push({
      heading: `What is missing · ${missing.length}`,
      intro: 'Items to file or put right before an audit.',
      kind: 'table',
      compact: true,
      columns: ['Item', 'Status', 'What to do', 'Para'],
      widths: ['56mm', '24mm', '', '18mm'],
      rows: missing.map((i) => [i.title ?? '', PACK_STATUS[i.status] ?? i.status, i.detail ?? '', i.custom ? 'College' : i.para ?? '']),
    });
  }
  for (const [title, list] of groups) {
    if (!list.length) continue;
    sections.push({
      heading: title,
      kind: 'checklist',
      items: list.map((i) => ({
        label: `${i.title}${i.custom ? '' : i.para ? ` (para ${i.para})` : ''}`,
        result: PACK_TONE[i.status] ?? 'neutral',
        result_label: PACK_STATUS[i.status] ?? i.status,
        note: [
          i.detail ?? '',
          ...((i.evidence ?? []) as Row[]).map(
            (e) =>
              `${e.title || KIND_LABEL[e.kind] || 'Document'} v${e.version}${e.document_date ? `, dated ${fmtDate(e.document_date)}` : ''}${
                (e.signatures ?? []).length ? `, signed by ${(e.signatures as Row[]).map((s) => `${s.name} (${s.role})`).join(', ')}` : ''
              }${e.file_hash ? `, SHA-256 ${String(e.file_hash).slice(0, 16)}…` : ''}`
          ),
        ]
          .filter(Boolean)
          .join('\n'),
      })),
    });
  }
  const episodes = (pack.episodes ?? []) as Row[];
  sections.push({
    heading: 'Programme history',
    kind: 'table',
    compact: true,
    columns: ['Date', 'What happened', 'Last evidenced learning', 'Reason'],
    widths: ['26mm', '42mm', '36mm', ''],
    rows: episodes.map((e) => [fmtDate(e.effective_date), EPISODE_LABEL[e.kind] ?? e.kind, fmtDate(e.last_evidenced_learning_date) || '', e.reason ?? '']),
    empty: 'No breaks, changes of employer, withdrawal or completion recorded.',
  });
  const history = (pack.history ?? []) as Row[];
  sections.push({
    heading: `Document history · ${history.length}`,
    intro: 'Every version filed. Nothing is overwritten: a new version replaces the old one and both are kept.',
    kind: 'table',
    compact: true,
    columns: ['Document', 'Version', 'Filed', 'By', 'State', 'Fingerprint (SHA-256)'],
    widths: ['', '14mm', '24mm', '30mm', '22mm', '44mm'],
    rows: history.map((e) => [
      e.title || KIND_LABEL[e.kind] || 'Document',
      `v${e.version}`,
      fmtDate(e.created_at),
      e.uploaded_by_name || '',
      e.superseded_at ? `Replaced ${fmtDate(e.superseded_at)}` : 'Current',
      e.file_hash ? String(e.file_hash).slice(0, 32) : 'Not recorded',
    ]),
    empty: 'No documents filed yet.',
  });

  return {
    learnerId: null,
    folder: `funding_pack/${l.id}`,
    filename: `${fileSafe(l.name || 'Apprentice', 50)} - funding evidence pack`,
    payload: {
      meta: {
        kind: 'Apprenticeship evidence pack',
        series: 'Learner record',
        title: l.name || 'Apprentice',
        subtitle: 'Funding evidence held for this apprentice, checked against the live record',
        reference: `FP-${String(l.id ?? '').slice(0, 8).toUpperCase()}`,
        generated: fmtDateTime(pack.generated_at || nowIso()),
        generated_by: generatedBy(who),
        integrity: 'Each document’s SHA-256 fingerprint is shown so a copy can be checked against the original.',
      },
      status: {
        label: missing.length ? `${plural(missing.length, 'item')} to put right` : 'Everything due is in place',
        tone: missing.length ? 'warn' : 'ok',
      },
      org,
      cover_facts: pairFacts<Row>([
        { label: 'Apprentice', value: l.name || 'Apprentice', big: true, wide: true },
        { label: 'ULN', value: l.uln || 'Not recorded', mono: !!l.uln },
        { label: 'Employer', value: l.employer || 'Not recorded' },
        { label: 'Course', value: l.course || 'Not recorded' },
        { label: 'Cohort', value: l.cohort || 'Not recorded' },
        { label: 'Start and planned end', value: l.start_date ? `${fmtDate(l.start_date)} to ${fmtDate(l.expected_end_date) || 'not set'}` : 'Not recorded' },
        { label: 'Status', value: l.status || 'Not recorded' },
      ]),
      headline: [
        { label: 'In place', value: String(inPlace), unit: `of ${applicable.length}`, note: 'items that apply' },
        { label: 'To put right', value: String(missing.length), unit: missing.length === 1 ? 'item' : 'items', note: '' },
        { label: 'Documents', value: String(history.filter((h) => !h.superseded_at).length), unit: 'current', note: `${history.length} versions in all` },
      ],
      contents: [...(missing.length ? ['What is missing'] : []), ...groups.filter(([, l2]) => l2.length).map(([t]) => t), 'Programme history', 'Document history'],
      alerts: [],
      sections,
      notes: [],
      disclaimer:
        'Generated by Elec-Mate from the live record against the Apprenticeship funding rules August 2025 to July 2026 (paragraphs 309 to 318 and the evidence requirements throughout), plus the college’s own requirements. Documents are held unaltered in Elec-Mate.',
    },
  };
}

// ── 6b · College audit pack (staff compliance) ──────────────────────────────

const SCR_LABEL: Record<string, string> = {
  valid: 'In date',
  expiring: 'Expiring',
  expired: 'Expired',
  missing: 'Missing',
  pending_verification: 'To verify',
};
const SCR_TONE: Record<string, string> = {
  valid: 'done',
  expiring: 'todo',
  expired: 'rejected',
  missing: 'rejected',
  pending_verification: 'neutral',
};
const VERDICT_LABEL: Record<string, string> = {
  agree: 'Agreed',
  disagree: 'Disagreed',
  refer: 'Returned',
  pending: 'Pending',
  partial: 'Partly agreed',
  escalate: 'Escalated',
};

export async function buildAuditPack(asCaller: SupabaseClient, college: Row, who: Who): Promise<Doc> {
  const must = async <T>(p: PromiseLike<{ data: T | null; error: any }>, what: string) => {
    const { data, error } = await p;
    if (error) throw new Error(`${what}: ${error.message}`);
    return (data ?? []) as T;
  };
  const [scr, policies, acks, staff, plans] = await Promise.all([
    must<Row[]>(
      asCaller
        .from('v_single_central_record')
        .select('college_staff_id, name, role, department, requirement, category, computed_status, expires_at, reference_no, verified_at'),
      'single central record'
    ),
    must<Row[]>(
      asCaller
        .from('college_policies')
        .select('id, code, title, category, status, version, effective_from, review_due_at, owner_role, requires_acknowledgement, approved_at')
        .eq('college_id', college.id)
        .order('title'),
      'policies'
    ),
    must<Row[]>(asCaller.from('policy_acknowledgements').select('policy_id, user_id, policy_version, acknowledged_at'), 'sign-offs'),
    must<Row[]>(
      asCaller
        .from('college_staff')
        .select('id, name, role, department, user_id, is_dsl, is_deputy_dsl, is_prevent_lead, is_h_and_s_lead, is_quality_nominee, is_mental_health_lead')
        .eq('college_id', college.id)
        .is('archived_at', null)
        .order('name'),
      'staff'
    ),
    must<Row[]>(asCaller.from('college_iqa_sampling').select('id, period_start, period_end').eq('college_id', college.id), 'IQA plans'),
  ]);
  // ELE-1871 / ELE-1909: sampling rate, standardisation record and the
  // intervention history. The two RPCs refuse staff without quality access;
  // the pack then simply leaves those sections out.
  const [rateRes, intRes, meetings] = await Promise.all([
    asCaller.rpc('get_iqa_sampling_rate', { p_college: college.id, p_months: 12 }),
    asCaller.rpc('get_intervention_history', { p_college: college.id, p_months: 12 }),
    must<Row[]>(
      asCaller
        .from('college_standardisation_meetings')
        .select('id, date, scheduled_at, topic, status, attendee_ids, attendees_count, chair_id, decisions, outcome, action_items')
        .eq('college_id', college.id)
        .order('date', { ascending: false }),
      'standardisation meetings'
    ),
  ]);
  const rate = (rateRes.error ? null : rateRes.data) as Row | null;
  const interventions = (intRes.error ? null : intRes.data) as Row | null;
  const staffIds = new Set(staff.map((s) => s.id));
  const scrRows = scr.filter((r) => staffIds.has(r.college_staff_id));
  const planIds = plans.map((p) => p.id);
  const samples = planIds.length
    ? await must<Row[]>(
        asCaller
          .from('college_iqa_samples')
          .select('id, sampling_plan_id, observation_title_snapshot, observation_date_snapshot, otj_id, otj_title_snapshot, otj_date_snapshot, decision_id, portfolio_item_id, target_title_snapshot, iqa_name_snapshot, sampled_at, verdict, comments')
          .in('sampling_plan_id', planIds)
          .order('sampled_at', { ascending: false }),
        'IQA samples'
      )
    : [];

  const c: Record<string, number> = {};
  for (const r of scrRows) c[r.computed_status] = (c[r.computed_status] ?? 0) + 1;
  const pct = scrRows.length ? Math.round((100 * (c.valid ?? 0)) / scrRows.length) : 0;
  const live = policies.filter((p) => p.status === 'live');
  const userToStaff = new Map(staff.filter((s) => s.user_id).map((s) => [s.user_id, s]));
  const ackPolicies = policies.filter((p) => p.requires_acknowledgement && p.status !== 'archived');
  const leads: Array<[string, string]> = [
    ['is_dsl', 'Designated safeguarding lead'],
    ['is_deputy_dsl', 'Deputy safeguarding lead'],
    ['is_prevent_lead', 'Prevent lead'],
    ['is_h_and_s_lead', 'Health and safety lead'],
    ['is_quality_nominee', 'Quality nominee'],
    ['is_mental_health_lead', 'Mental health lead'],
  ];
  const generated = nowIso();

  const sections: Row[] = [
    {
      heading: 'Named leads',
      kind: 'kv',
      rows: leads.map(([k, label]) => {
        const names = staff.filter((s) => s[k]).map((s) => s.name);
        return { label, value: names.join(', ') || 'Not named', tone: names.length ? '' : 'warn' };
      }),
    },
    {
      heading: `Single central record · ${scrRows.length} checks`,
      intro: 'Every pre-employment and ongoing check for each member of staff, with its status today.',
      kind: 'table',
      compact: true,
      columns: ['Staff', 'Check', 'Status', 'Expires', 'Reference', 'Verified'],
      widths: ['36mm', '', '22mm', '24mm', '26mm', '24mm'],
      rows: scrRows.map((r) => [
        `${r.name}${r.role ? `\n${roleLabel(r.role)}` : ''}`,
        r.requirement ?? '',
        SCR_LABEL[r.computed_status] ?? r.computed_status,
        fmtDate(r.expires_at) || '',
        r.reference_no ?? '',
        fmtDate(r.verified_at) || '',
      ]),
      empty: 'No checks recorded yet.',
    },
    {
      heading: `Policies · ${policies.length}`,
      kind: 'table',
      compact: true,
      columns: ['Policy', 'Status', 'Version', 'In force from', 'Review due', 'Signed by staff'],
      widths: ['', '18mm', '16mm', '26mm', '26mm', '26mm'],
      rows: policies.map((p) => {
        const n = acks.filter((a) => a.policy_id === p.id && a.policy_version === p.version && userToStaff.has(a.user_id)).length;
        return [
          `${p.code ? `${p.code} ` : ''}${p.title}`,
          p.status === 'live' ? 'Live' : p.status === 'draft' ? 'Draft' : 'Archived',
          `v${p.version}`,
          fmtDate(p.effective_from) || '',
          fmtDate(p.review_due_at) || '',
          p.requires_acknowledgement ? `${n} of ${staff.length}` : 'Not required',
        ];
      }),
      empty: 'No policies recorded yet.',
    },
  ];
  ackPolicies.forEach((p, i) => {
    sections.push({
      heading: i === 0 ? `Sign-off logs · ${ackPolicies.length}` : '',
      new_page: i === 0,
      intro: `${p.title} (v${p.version})`,
      kind: 'table',
      compact: true,
      columns: ['Staff', 'Role', 'State', 'Signed'],
      widths: ['', '40mm', '30mm', '34mm'],
      rows: staff.map((s) => {
        const mine = acks.filter((a) => a.policy_id === p.id && a.user_id === s.user_id).sort((a, b) => String(b.acknowledged_at).localeCompare(String(a.acknowledged_at)))[0];
        const state = !mine ? 'Outstanding' : mine.policy_version === p.version ? 'Signed' : `Signed v${mine.policy_version}`;
        return [s.name, roleLabel(s.role), state, mine ? fmtDate(mine.acknowledged_at) : ''];
      }),
    });
  });
  const vc: Record<string, number> = {};
  for (const s of samples) vc[s.verdict] = (vc[s.verdict] ?? 0) + 1;
  sections.push({
    heading: `IQA verification chain · ${samples.length} samples`,
    new_page: true,
    intro: `Agreed ${vc.agree ?? 0}, disagreed ${vc.disagree ?? 0}, returned ${vc.refer ?? 0}, pending ${vc.pending ?? 0}.`,
    kind: 'table',
    compact: true,
    columns: ['Sampled', 'What', 'Type', 'IQA', 'Verdict', 'Comments'],
    widths: ['22mm', '', '18mm', '28mm', '20mm', '50mm'],
    rows: samples.map((s) => [
      fmtDate(s.sampled_at),
      (s.otj_id ? s.otj_title_snapshot : s.decision_id || s.portfolio_item_id ? s.target_title_snapshot : s.observation_title_snapshot) ?? '',
      s.otj_id ? 'Hours' : s.decision_id ? 'Decision' : s.portfolio_item_id ? 'Evidence' : 'Observation',
      s.iqa_name_snapshot ?? '',
      VERDICT_LABEL[s.verdict] ?? s.verdict ?? '',
      s.comments ?? '',
    ]),
    empty: 'No IQA samples recorded yet.',
  });
  if (rate) {
    const assessors = (rate.assessors ?? []) as Row[];
    sections.push({
      heading: `IQA sampling rate · last ${rate.months} months`,
      intro:
        rate.rate_pct == null
          ? 'No assessment decisions recorded in this period.'
          : `${rate.rate_pct}% of assessment decisions sampled by an IQA (${rate.decisions_sampled} of ${rate.decisions_total}). ${rate.confirmed} confirmed, ${rate.returned} returned. ${rate.assessors_at_target} of ${rate.assessors_total} assessors at their plan target.`,
      kind: 'table',
      compact: true,
      columns: ['Assessor', 'Decisions', 'Sampled', 'Rate', 'Target', 'Returned'],
      widths: ['', '22mm', '22mm', '20mm', '22mm', '22mm'],
      rows: assessors.map((a) => [
        `${a.name}${a.is_new ? '\nNew assessor' : ''}`,
        String(a.total ?? 0),
        String(a.sampled ?? 0),
        a.rate_pct == null ? 'None' : `${a.rate_pct}%`,
        a.target_pct == null ? 'No plan' : `${Number(a.target_pct)}%`,
        String(a.returned ?? 0),
      ]),
      empty: 'No assessors with decisions in this period.',
    });
  }
  const staffNameById = new Map(staff.map((s) => [s.id, s.name as string]));
  sections.push({
    heading: `Standardisation record · ${plural(meetings.length, 'meeting')}`,
    new_page: true,
    intro: 'Meetings where assessors and the IQA compared decisions and agreed how criteria are judged. Full minutes are in the IQA sampling report.',
    kind: 'table',
    compact: true,
    columns: ['Date', 'Topic', 'Status', 'Chair and attendees', 'Agreed', 'Actions'],
    widths: ['22mm', '34mm', '16mm', '', '40mm', '40mm'],
    rows: meetings.map((m) => {
      const names = ((m.attendee_ids ?? []) as string[]).map((id) => staffNameById.get(id)).filter(Boolean) as string[];
      const chair = m.chair_id ? staffNameById.get(m.chair_id) : null;
      return [
        fmtDate(m.date || m.scheduled_at) || '',
        m.topic || 'Standardisation',
        m.status === 'completed' ? 'Held' : m.status === 'scheduled' ? 'Planned' : m.status || '',
        `${chair ? `Chair: ${chair}\n` : ''}${names.length ? names.join(', ') : m.attendees_count ? `${m.attendees_count} people` : 'Not recorded'}`,
        m.decisions || m.outcome || 'Not recorded',
        ((m.action_items ?? []) as string[]).join('; ') || 'None',
      ];
    }),
    empty: 'No standardisation meetings recorded yet.',
  });
  if (interventions) {
    const bm = (interventions.by_method ?? {}) as Row;
    const methodLabel: Record<string, string> = { call: 'Phone call', one_to_one: '1-2-1', email: 'Email', referral: 'Referral' };
    sections.push({
      heading: `Intervention history · last ${interventions.months} months`,
      new_page: true,
      intro: `${interventions.total} contacts with ${interventions.learners} learners flagged at risk: ${bm.call ?? 0} calls, ${bm.one_to_one ?? 0} 1-2-1s, ${bm.email ?? 0} emails, ${bm.referral ?? 0} referrals. ${interventions.open_next_steps} next steps still open. What was said stays in the learner's record.`,
      kind: 'table',
      compact: true,
      columns: ['Date', 'Learner', 'How', 'About', 'By', 'Next step'],
      widths: ['22mm', '34mm', '20mm', '', '28mm', '44mm'],
      rows: ((interventions.rows ?? []) as Row[]).map((r) => [
        fmtDate(r.at) || '',
        r.learner ?? '',
        methodLabel[r.method] ?? 'Contact',
        r.title || 'Not recorded',
        r.by ?? '',
        r.next_step ? `${r.next_step}${r.next_step_by ? ` by ${fmtDate(r.next_step_by)}` : ''}${r.next_step_done ? ' (done)' : ''}` : 'None',
      ]),
      empty: 'No contact logged yet.',
    });
  }

  // ELE-1977: each active learner's starting point. The funding rules and
  // Ofsted both ask for the initial assessment, English and maths, and the
  // prior-learning decision that set the off-the-job hours. Read as the
  // caller, so staff see the learners they are allowed to see.
  const learners = await must<Row[]>(
    asCaller
      .from('college_students')
      .select('id, name, start_date, otj_required_hours')
      .eq('college_id', college.id)
      .eq('status', 'Active')
      .order('name'),
    'learners'
  );
  const learnerIds = learners.map((l) => l.id);
  const [starts, fs] = learnerIds.length
    ? await Promise.all([
        must<Row[]>(
          asCaller
            .from('college_learner_starting_points')
            .select('student_id, assessed_on, english_level, maths_level, digital_level, rpl_decision, rpl_hours_reduced, rpl_base_hours')
            .in('student_id', learnerIds),
          'starting points'
        ),
        must<Row[]>(
          asCaller.from('college_functional_skills').select('student_id, subject, level, status').in('student_id', learnerIds),
          'English and maths'
        ),
      ])
    : [[], []];
  const startBy = new Map(starts.map((r) => [r.student_id, r]));
  const fsBy = new Map(fs.map((r) => [`${r.student_id}|${r.subject}`, r]));
  const FS_STATUS: Record<string, string> = {
    exempt: 'Exempt',
    not_started: 'Not started',
    in_progress: 'Working towards',
    pending_results: 'Awaiting result',
    passed: 'Achieved',
    failed: 'Not achieved',
    resit: 'Resit booked',
  };
  const fsLevel = (l: unknown) => String(l ?? '').replace(/^entry_(\d)$/, 'Entry $1').replace(/^level_(\d)$/, 'Level $1');
  const fsCell = (id: string, subject: string) => {
    const r = fsBy.get(`${id}|${subject}`);
    if (!r) return 'Not recorded';
    return `${FS_STATUS[r.status] ?? roleLabel(r.status)}${r.level && r.status !== 'exempt' ? `\n${fsLevel(r.level)}` : ''}`;
  };
  const fsMet = (id: string, subject: string) => {
    const r = fsBy.get(`${id}|${subject}`);
    return !!r && (r.status === 'exempt' || r.status === 'passed');
  };
  const nAssessed = learners.filter((l) => startBy.get(l.id)?.assessed_on).length;
  const nRpl = learners.filter((l) => (startBy.get(l.id)?.rpl_decision ?? 'not_decided') !== 'not_decided').length;
  const nReduced = learners.filter((l) => startBy.get(l.id)?.rpl_decision === 'reduced').length;
  const nFsMet = learners.filter((l) => fsMet(l.id, 'english') && fsMet(l.id, 'maths')).length;
  const nFsUnknown = learners.filter((l) => !fsBy.has(`${l.id}|english`) || !fsBy.has(`${l.id}|maths`)).length;
  sections.push({
    heading: `Learner starting points · ${plural(learners.length, 'learner')}`,
    new_page: true,
    intro: learners.length
      ? `${nAssessed} of ${learners.length} have an initial assessment on record. ${nRpl} have a prior-learning decision (${nReduced} with reduced off-the-job hours). ${nFsMet} have English and maths achieved or exempt${nFsUnknown ? `; ${nFsUnknown} have English or maths not yet recorded` : ''}.`
      : 'No active learners.',
    kind: 'table',
    compact: true,
    columns: ['Learner', 'Initial assessment', 'English', 'Maths', 'Prior learning', 'Off-the-job hours'],
    widths: ['', '36mm', '26mm', '26mm', '30mm', '26mm'],
    rows: learners.map((l) => {
      const sp = startBy.get(l.id);
      const levels = sp
        ? [
            sp.english_level && `English ${sp.english_level}`,
            sp.maths_level && `Maths ${sp.maths_level}`,
            sp.digital_level && `Digital ${sp.digital_level}`,
          ].filter(Boolean)
        : [];
      const ia = sp?.assessed_on ? `${fmtDate(sp.assessed_on)}${levels.length ? `\n${levels.join(', ')}` : ''}` : 'Not recorded';
      const rpl =
        !sp || sp.rpl_decision === 'not_decided'
          ? 'Not decided'
          : sp.rpl_decision === 'reduced'
            ? `Reduced by ${Math.round(Number(sp.rpl_hours_reduced))}h`
            : 'No reduction';
      const hours = l.otj_required_hours != null ? `${Math.round(Number(l.otj_required_hours))}h` : sp?.rpl_base_hours ? `${Math.round(Number(sp.rpl_base_hours))}h` : 'Course target';
      return [`${l.name}${l.start_date ? `\nStarted ${fmtDate(l.start_date)}` : ''}`, ia, fsCell(l.id, 'english'), fsCell(l.id, 'maths'), rpl, hours];
    }),
    empty: 'No active learners.',
  });

  return {
    learnerId: null,
    folder: `audit_pack/${college.id}`,
    filename: `${fileSafe(college.name || 'College', 50)} - audit pack`,
    payload: {
      meta: {
        kind: 'Compliance audit pack',
        series: 'College record',
        title: college.name || 'College',
        subtitle: 'Single central record, policies, sign-offs, named leads, the IQA chain, standardisation, interventions and learner starting points',
        reference: `AP-${String(college.id).slice(0, 8).toUpperCase()}`,
        generated: fmtDateTime(generated),
        generated_by: generatedBy(who),
        integrity: 'Built from the live record on the date shown.',
      },
      status: { label: `${pct}% of staff checks in date`, tone: pct >= 95 ? 'ok' : pct >= 80 ? 'warn' : 'bad' },
      org: { name: college.name || '', sub: 'Training provider', logo: college.logo_url || '' },
      cover_facts: pairFacts<Row>([
        { label: 'College', value: college.name || 'College', big: true, wide: true },
        { label: 'Staff', value: String(staff.length) },
        { label: 'Live policies', value: `${live.length} of ${policies.length}` },
        { label: 'Prepared by', value: who.name },
        { label: 'Prepared on', value: fmtDateTime(generated) },
      ]),
      headline: [
        { label: 'Checks in date', value: String(pct), unit: '%', note: `${c.valid ?? 0} of ${scrRows.length}` },
        { label: 'Expired', value: String(c.expired ?? 0), unit: '', note: '' },
        { label: 'Missing', value: String(c.missing ?? 0), unit: '', note: 'never put on file' },
        rate && rate.rate_pct != null
          ? { label: 'IQA sampling rate', value: String(rate.rate_pct), unit: '%', note: `${rate.decisions_sampled} of ${rate.decisions_total} decisions` }
          : { label: 'IQA samples', value: String(samples.length), unit: '', note: `${vc.agree ?? 0} agreed` },
      ],
      contents: [
        'Named leads',
        'Single central record',
        'Policies',
        ...(ackPolicies.length ? ['Sign-off logs'] : []),
        'IQA verification chain',
        ...(rate ? ['IQA sampling rate'] : []),
        'Standardisation record',
        ...(interventions ? ['Intervention history'] : []),
        'Learner starting points',
      ],
      alerts:
        (c.expired ?? 0) + (c.missing ?? 0) > 0
          ? [{ tone: 'bad', title: 'Action needed.', text: `${(c.expired ?? 0) + (c.missing ?? 0)} staff checks are expired or missing.` }]
          : [],
      sections,
      notes: [],
      disclaimer: '',
    },
  };
}

// ── 7 · IQA sampling report and standardisation record ──────────────────────

export async function buildIqaReport(asCaller: SupabaseClient, admin: SupabaseClient, college: Row, who: Who): Promise<Doc> {
  const must = async <T>(p: PromiseLike<{ data: T | null; error: any }>, what: string) => {
    const { data, error } = await p;
    if (error) throw new Error(`${what}: ${error.message}`);
    return (data ?? []) as T;
  };
  const [plans, findings, meetings, staff] = await Promise.all([
    must<Row[]>(
      asCaller
        .from('college_iqa_sampling')
        .select('id, assessor_id, iqa_name_snapshot, qualification_code, unit_code, period_start, period_end, target_sample_percent, sampled_count, total_assessments, notes')
        .eq('college_id', college.id)
        .order('period_start', { ascending: false }),
      'sampling plans'
    ),
    must<Row[]>(
      asCaller
        .from('college_iqa_findings')
        .select('id, assessor_name, finding_type, severity, area, description, action_plan, status, due_date, closed_at, resolution_notes, iqa_name_snapshot, created_at')
        .eq('college_id', college.id)
        .order('created_at', { ascending: false }),
      'findings'
    ),
    must<Row[]>(
      asCaller
        .from('college_standardisation_meetings')
        .select('id, date, scheduled_at, topic, status, attendee_ids, attendees_count, agenda, minutes, decisions, outcome, action_items, chair_id, duration_min')
        .eq('college_id', college.id)
        .order('date', { ascending: false }),
      'standardisation meetings'
    ),
    must<Row[]>(admin.from('college_staff').select('id, name, role').eq('college_id', college.id), 'staff'),
  ]);
  const planIds = plans.map((p) => p.id);
  const samples = planIds.length
    ? await must<Row[]>(
        asCaller
          .from('college_iqa_samples')
          .select('id, sampling_plan_id, observation_title_snapshot, observation_date_snapshot, otj_id, otj_title_snapshot, otj_date_snapshot, iqa_name_snapshot, sampled_at, verdict, comments')
          .in('sampling_plan_id', planIds)
          .order('sampled_at', { ascending: false }),
        'samples'
      )
    : [];
  const staffName = new Map(staff.map((s) => [s.id, s.name as string]));
  const vc: Record<string, number> = {};
  for (const s of samples) vc[s.verdict] = (vc[s.verdict] ?? 0) + 1;
  const decided = (vc.agree ?? 0) + (vc.disagree ?? 0) + (vc.refer ?? 0);
  const agreePct = decided ? Math.round((100 * (vc.agree ?? 0)) / decided) : null;
  const onTarget = plans.filter((p) => p.total_assessments && (100 * (p.sampled_count ?? 0)) / p.total_assessments >= Number(p.target_sample_percent ?? 0)).length;
  const openFindings = findings.filter((f) => String(f.status ?? '').toLowerCase() !== 'closed');
  const generated = nowIso();

  const sections: Row[] = [
    {
      heading: `Sampling plans · ${plans.length}`,
      intro: 'For each assessor and unit: the share of their assessments the IQA set out to sample, and how much has been sampled.',
      kind: 'table',
      compact: true,
      columns: ['Assessor', 'Qualification · unit', 'Period', 'Target', 'Sampled', 'IQA'],
      widths: ['', '34mm', '42mm', '16mm', '24mm', '30mm'],
      rows: plans.map((p) => {
        const pct = p.total_assessments ? Math.round((100 * (p.sampled_count ?? 0)) / p.total_assessments) : 0;
        return [
          staffName.get(p.assessor_id) ?? 'Assessor',
          [p.qualification_code, p.unit_code && `Unit ${p.unit_code}`].filter(Boolean).join(' · ') || 'All',
          `${fmtDate(p.period_start)} to ${fmtDate(p.period_end)}`,
          `${hrs(p.target_sample_percent)}%`,
          `${p.sampled_count ?? 0} of ${p.total_assessments ?? 0} (${pct}%)`,
          p.iqa_name_snapshot ?? '',
        ];
      }),
      empty: 'No sampling plans recorded yet.',
    },
    {
      heading: `Samples and verdicts · ${samples.length}`,
      kind: 'table',
      compact: true,
      columns: ['Sampled', 'What was sampled', 'Type', 'IQA', 'Verdict', 'Comments'],
      widths: ['22mm', '', '18mm', '28mm', '20mm', '52mm'],
      rows: samples.map((s) => [
        fmtDate(s.sampled_at),
        `${(s.otj_id ? s.otj_title_snapshot : s.observation_title_snapshot) ?? ''}${(s.otj_id ? s.otj_date_snapshot : s.observation_date_snapshot) ? `\n${fmtDate(s.otj_id ? s.otj_date_snapshot : s.observation_date_snapshot)}` : ''}`,
        s.otj_id ? 'Hours' : 'Observation',
        s.iqa_name_snapshot ?? '',
        VERDICT_LABEL[s.verdict] ?? s.verdict ?? '',
        s.comments ?? '',
      ]),
      empty: 'No samples recorded yet.',
    },
    {
      heading: `Findings and actions · ${findings.length}`,
      kind: 'table',
      compact: true,
      columns: ['Raised', 'Finding', 'Assessor', 'Action and owner', 'Due', 'Status'],
      widths: ['22mm', '', '28mm', '50mm', '22mm', '20mm'],
      rows: findings.map((f) => [
        fmtDate(f.created_at),
        `${f.finding_type ?? ''}${f.severity ? ` (${f.severity})` : ''}${f.area ? `\n${f.area}` : ''}\n${f.description ?? ''}`.trim(),
        f.assessor_name ?? '',
        `${f.action_plan ?? ''}${f.resolution_notes ? `\nResolved: ${f.resolution_notes}` : ''}`.trim(),
        fmtDate(f.due_date) || '',
        String(f.status ?? '').toLowerCase() === 'closed' ? `Closed ${fmtDate(f.closed_at)}` : f.status ?? 'Open',
      ]),
      empty: 'No findings recorded yet.',
    },
  ];
  meetings.forEach((m, i) => {
    const attendees = ((m.attendee_ids ?? []) as string[]).map((id) => staffName.get(id)).filter(Boolean) as string[];
    sections.push({
      heading: i === 0 ? `Standardisation record · ${plural(meetings.length, 'meeting')}` : '',
      new_page: i === 0,
      kind: 'kv',
      rows: [
        { label: 'Meeting', value: `${m.topic || 'Standardisation'} · ${fmtDate(m.date || m.scheduled_at)}`, wide: true },
        { label: 'Status', value: m.status === 'completed' ? 'Held' : m.status === 'scheduled' ? 'Planned' : m.status || 'Not recorded' },
        { label: 'Chair', value: (m.chair_id && staffName.get(m.chair_id)) || 'Not recorded' },
        { label: 'Attendees', value: attendees.length ? attendees.join(', ') : m.attendees_count ? `${m.attendees_count} people` : 'Not recorded', wide: true },
        ...(m.agenda ? [{ label: 'Agenda', value: m.agenda, wide: true }] : []),
        ...(m.minutes ? [{ label: 'Minutes', value: m.minutes, wide: true }] : []),
        ...(m.decisions || m.outcome ? [{ label: 'Decisions', value: m.decisions || m.outcome, wide: true }] : []),
        { label: 'Actions', value: ((m.action_items ?? []) as string[]).map((a) => `• ${a}`).join('\n') || 'None recorded', wide: true },
      ],
    });
  });
  if (!meetings.length) {
    sections.push({ heading: 'Standardisation record', kind: 'text', paragraphs: ['No standardisation meetings recorded yet.'] });
  }

  return {
    learnerId: null,
    folder: `iqa_report/${college.id}`,
    filename: `${fileSafe(college.name || 'College', 50)} - IQA sampling report`,
    payload: {
      meta: {
        kind: 'IQA sampling report',
        series: 'College record',
        title: college.name || 'College',
        subtitle: 'Sampling plans, verdicts, findings and actions, and the standardisation record',
        reference: `IQA-${String(college.id).slice(0, 8).toUpperCase()}`,
        generated: fmtDateTime(generated),
        generated_by: generatedBy(who),
        integrity: 'Built from the live record on the date shown.',
      },
      status: {
        label: plans.length ? `${onTarget} of ${plans.length} plans at target` : 'No sampling plans yet',
        tone: plans.length && onTarget === plans.length ? 'ok' : 'warn',
      },
      org: { name: college.name || '', sub: 'Training provider', logo: college.logo_url || '' },
      cover_facts: pairFacts<Row>([
        { label: 'College', value: college.name || 'College', big: true, wide: true },
        { label: 'Sampling plans', value: String(plans.length) },
        { label: 'Samples', value: String(samples.length) },
        { label: 'Open findings', value: String(openFindings.length) },
        { label: 'Standardisation meetings', value: String(meetings.length) },
        { label: 'Prepared by', value: who.name },
        { label: 'Prepared on', value: fmtDateTime(generated) },
      ]),
      headline: [
        { label: 'Plans at target', value: String(onTarget), unit: `of ${plans.length}`, note: '' },
        { label: 'Samples', value: String(samples.length), unit: '', note: `${vc.pending ?? 0} pending` },
        { label: 'Agreement', value: agreePct == null ? '–' : String(agreePct), unit: agreePct == null ? '' : '%', note: 'IQA agreed with the assessor' },
        { label: 'Open findings', value: String(openFindings.length), unit: '', note: '' },
      ],
      contents: ['Sampling plans', 'Samples and verdicts', 'Findings and actions', 'Standardisation record'],
      alerts: [],
      sections,
      notes: [],
      disclaimer: '',
    },
  };
}

// ── 9 · Learner record transfer pack ────────────────────────────────────────

export async function buildTransferPack(ctx: BuildCtx, who: Who): Promise<Doc> {
  const rec = await loadRecord(ctx);
  const { admin, learnerId } = ctx;
  const refs = itemRefs(rec);
  const counts = headlineCounts(rec);
  const units = unitSummary(rec);
  const st = rec.snapshot?.standard ?? {};
  const q = rec.snapshot?.qualification ?? {};
  const s = rec.otjSummary ?? {};

  const [{ data: providers }, { data: staffRows }] = await Promise.all([
    admin
      .from('college_students')
      .select('id, college_id, status, start_date, expected_end_date, created_at, colleges(name)')
      .eq('user_id', learnerId)
      .order('created_at', { ascending: true }),
    admin.from('college_staff').select('user_id, college_id, colleges(name)').in(
      'user_id',
      [...new Set(rec.decisions.map((d) => d.assessor_id).filter(Boolean))].length
        ? [...new Set(rec.decisions.map((d) => d.assessor_id).filter(Boolean))]
        : ['00000000-0000-0000-0000-000000000000']
    ),
  ]);
  const providerOf = new Map<string, string>();
  for (const r of (staffRows ?? []) as Row[]) if (r.user_id) providerOf.set(r.user_id, r.colleges?.name ?? '');
  const studentIds = ((providers ?? []) as Row[]).map((p) => p.id);
  const { data: reviews } = studentIds.length
    ? await admin
        .from('college_tripartite_reviews')
        .select('id, college_id, held_on, mode, locked_at, outcomes, signatures, snapshot, colleges(name)')
        .in('student_id', studentIds)
        .not('locked_at', 'is', null)
        .order('held_on', { ascending: true })
    : { data: [] };

  const sections: Row[] = [
    {
      heading: 'Providers',
      intro: 'Every training provider this apprentice has been enrolled with. The record belongs to the apprentice and moves with them; nothing is deleted when they change provider.',
      kind: 'table',
      compact: true,
      columns: ['Provider', 'Joined', 'Start', 'Planned end', 'Status'],
      widths: ['', '26mm', '26mm', '26mm', '24mm'],
      rows: ((providers ?? []) as Row[]).map((p) => [
        p.colleges?.name ?? 'Provider',
        fmtDate(p.created_at),
        fmtDate(p.start_date) || '',
        fmtDate(p.expected_end_date) || '',
        p.status ?? '',
      ]),
      empty: 'Not enrolled with a provider in Elec-Mate.',
    },
    {
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
      empty: 'No qualification is set for this apprentice.',
    },
    {
      heading: `Assessment decisions · ${rec.decisions.length}`,
      intro: 'Every decision ever made, with who made it and at which provider. A replaced decision stays on the record.',
      kind: 'table',
      compact: true,
      columns: ['Criterion', 'Decision', 'Assessor', 'Provider', 'Date', 'Evidence', 'IQA'],
      widths: ['22mm', '22mm', '30mm', '', '22mm', '18mm', '22mm'],
      rows: rec.decisions.map((d) => [
        `${d.unit_code} AC ${d.ac_code}`,
        `${DECISION_LABEL[d.decision] ?? d.decision}${d.superseded_at ? ' (replaced)' : ''}`,
        `${d.assessor_name ?? 'Assessor'}${d.method ? `\n${METHOD_LABEL[d.method] ?? d.method}` : ''}`,
        providerOf.get(d.assessor_id) || 'Not recorded',
        fmtDate(d.decided_at),
        (d.evidence_item_ids ?? []).map((id: string) => refs.get(id)).filter(Boolean).join(', '),
        d.iqa_verdict ? `${d.iqa_verdict === 'confirmed' ? 'Confirmed' : 'Not confirmed'} ${fmtDate(d.iqa_at)}` : '',
      ]),
      empty: 'No assessment decisions yet.',
    },
    {
      heading: `Evidence index · ${rec.items.length}`,
      intro: 'Each item with the criteria it is claimed for and its fingerprint. The files themselves are in the portfolio evidence pack (Export my record).',
      kind: 'table',
      compact: true,
      new_page: true,
      columns: ['Ref', 'Evidence', 'Added', 'Criteria', 'Fingerprint (SHA-256)'],
      widths: ['12mm', '', '22mm', '40mm', '42mm'],
      rows: rec.items.map((it) => [
        refs.get(it.id) ?? '',
        it.title || 'Untitled evidence',
        fmtDate(it.created_at),
        rec.criteriaLinks
          .filter((c) => c.portfolio_item_id === it.id && c.source !== 'ai_suggested')
          .map((c) => `${c.unit_code} AC ${c.ac_code}`)
          .join(', '),
        it.content_hash ? String(it.content_hash).slice(0, 32) : 'Not recorded',
      ]),
      empty: 'No evidence added yet.',
    },
    {
      heading: `Witness statements · ${rec.witnesses.filter((w) => w.status === 'signed').length}`,
      kind: 'table',
      compact: true,
      columns: ['Evidence', 'Witness', 'Signed', 'Criteria', 'Statement fingerprint'],
      widths: ['', '40mm', '24mm', '30mm', '36mm'],
      rows: rec.witnesses
        .filter((w) => w.status === 'signed')
        .map((w) => [
          `${refs.get(w.portfolio_item_id) ?? ''} ${w.evidence_snapshot?.title ?? ''}`.trim(),
          [w.witness_name, w.witness_role, w.witness_company].filter(Boolean).join(', '),
          fmtDate(w.signed_at),
          (w.criteria ?? []).join(', '),
          w.statement_hash ? String(w.statement_hash).slice(0, 24) : '',
        ]),
      empty: 'No signed witness statements.',
    },
    {
      heading: 'Off-the-job training hours',
      kind: 'kv',
      new_page: true,
      rows: [
        { label: 'Hours required', value: s.required_hours ? `${hrs(s.required_hours)} hours` : 'Not set' },
        { label: 'Hours counted', value: `${hrs(s.counted_hours)} hours` },
        { label: 'Verified by the college', value: `${hrs(s.college_verified_hours ?? s.verified_hours)} hours` },
        { label: 'Confirmed by the employer', value: `${hrs(s.employer_attested_hours)} hours` },
        { label: 'Learning in the app', value: `${hrs(s.app_learning_hours)} hours` },
        { label: 'Entries on the log', value: String(rec.otjEntries.length) },
      ],
    },
    {
      heading: `Progress reviews · ${(reviews ?? []).length}`,
      kind: 'table',
      compact: true,
      columns: ['Held', 'Provider', 'How', 'Summary', 'Signed by'],
      widths: ['22mm', '30mm', '20mm', '', '36mm'],
      rows: ((reviews ?? []) as Row[]).map((r) => {
        const sg = (r.signatures ?? {}) as Row;
        return [
          fmtDate(r.held_on),
          r.colleges?.name ?? '',
          MODE_LABEL[r.mode] ?? '',
          clip(r.snapshot?.outcomes?.summary ?? r.outcomes?.summary ?? '', 260),
          [sg.tutor_signed_at && 'Tutor', sg.student_signed_at && 'Apprentice', sg.employer_signed_at && 'Employer'].filter(Boolean).join(', ') || 'Not signed',
        ];
      }),
      empty: 'No signed-off progress reviews.',
    },
    {
      heading: 'English and maths',
      kind: 'table',
      compact: true,
      columns: ['Subject', 'Level', 'Status', 'Detail'],
      widths: ['26mm', '24mm', '30mm', ''],
      rows: rec.functionalSkills.map((f) => [
        String(f.subject ?? '').replace(/^\w/, (c: string) => c.toUpperCase()),
        FS_LEVEL[f.level] ?? f.level ?? '',
        FS_STATUS[f.status] ?? f.status ?? '',
        [f.exemption_reason, f.awarding_body, f.result_date && `Result ${fmtDate(f.result_date)}`, f.result_score].filter(Boolean).join(' · '),
      ]),
      empty: 'Nothing recorded.',
    },
    {
      heading: 'End-point assessment gateway',
      kind: 'checklist',
      items: gatewayChecklist(rec).map((i) => ({ label: i.label, result: i.done ? 'done' : 'todo', result_label: i.done ? 'Done' : 'To do', note: i.note })),
    },
    {
      heading: `Declarations · ${rec.signatures.length + rec.declarations.filter((d) => d.signed_at && !d.superseded_at).length}`,
      kind: 'table',
      compact: true,
      columns: ['Signed', 'Who', 'What', 'Fingerprint'],
      widths: ['30mm', '40mm', '', '40mm'],
      rows: [
        ...rec.signatures.map((sg) => [
          fmtDateTime(sg.signed_at),
          sg.signature_text || (sg.signer_role === 'student' ? 'Apprentice' : sg.signer_role || ''),
          clip(sg.declaration_text || 'Declaration', 160),
          sg.bundle_hash ? String(sg.bundle_hash).slice(0, 24) : '',
        ]),
        ...rec.declarations
          .filter((d) => d.signed_at && !d.superseded_at)
          .map((d) => [fmtDateTime(d.signed_at), [d.signer_name, d.signer_role].filter(Boolean).join(', '), `Gateway declaration (${d.kind})`, d.snapshot_hash ? String(d.snapshot_hash).slice(0, 24) : '']),
      ],
      empty: 'No declarations signed.',
    },
    {
      heading: `Audit trail · ${plural(rec.audit.length, 'event')}`,
      intro: 'Every claim, signature, decision and witness statement, in order. The trail cannot be edited.',
      kind: 'table',
      compact: true,
      new_page: true,
      columns: ['When', 'Who', 'What'],
      widths: ['40mm', '24mm', ''],
      rows: rec.audit.map((a) => [fmtDateTime(a.created_at), ROLE_LABEL[a.actor_role] ?? a.actor_role, auditText(a, refs)]),
      empty: 'No events recorded.',
    },
  ];

  const generated = nowIso();
  return {
    learnerId,
    folder: `transfer_pack/${learnerId}`,
    filename: `${fileSafe(rec.name, 50)} - learner record transfer pack`,
    payload: {
      meta: {
        kind: 'Learner record transfer pack',
        series: 'Learner record',
        title: rec.name,
        subtitle: 'The apprentice’s full record, for a new training provider',
        reference: `TP-${learnerId.slice(0, 8).toUpperCase()}`,
        generated: fmtDateTime(generated),
        generated_by: generatedBy(who),
        integrity: 'Decisions, witness statements, hours and the audit trail travel with the apprentice.',
      },
      status: {
        label: counts.total ? `${counts.passed} of ${counts.total} criteria passed` : 'No qualification set',
        tone: counts.total && counts.passed === counts.total ? 'ok' : 'neutral',
      },
      org: orgFor(rec),
      cover_facts: pairFacts<Row>([
        { label: 'Apprentice', value: rec.name, big: true, wide: true },
        { label: 'ULN', value: rec.uln || 'Not recorded', mono: !!rec.uln },
        { label: 'Qualification', value: [q.code, q.title].filter(Boolean).join(' · ') || 'Not set' },
        { label: 'Standard', value: st.code ? `${st.title} (${st.code})` : 'Not set' },
        { label: 'Current provider', value: rec.college?.name || 'Not with a college' },
        { label: 'Employer', value: rec.snapshot?.employer_name || 'Not recorded' },
        { label: 'Start and planned end', value: rec.startDate ? `${fmtDate(rec.startDate)} to ${fmtDate(rec.endDate) || 'not set'}` : 'Not recorded' },
      ]),
      headline: [
        { label: 'Criteria passed', value: String(counts.passed), unit: `of ${counts.total}`, note: counts.iqa ? `${counts.iqa} confirmed by IQA` : '' },
        { label: 'Decisions', value: String(rec.decisions.length), unit: '', note: 'on the record' },
        { label: 'Evidence', value: String(rec.items.length), unit: rec.items.length === 1 ? 'item' : 'items', note: '' },
        { label: 'Off-the-job', value: hrs(s.counted_hours ?? 0), unit: 'hours', note: s.required_hours ? `of ${hrs(s.required_hours)} required` : '' },
      ],
      contents: [
        'Providers',
        'Summary by unit',
        'Assessment decisions',
        'Evidence index',
        'Witness statements',
        'Off-the-job hours',
        'Progress reviews',
        'English and maths',
        'Gateway',
        'Declarations',
        'Audit trail',
      ],
      alerts: [],
      sections,
      notes: [],
      disclaimer:
        'Made in Elec-Mate from the apprentice’s own record. A new provider can rely on each decision as made by the named assessor at the named provider on the date shown; the evidence files and their fingerprints are in the portfolio evidence pack.',
    },
  };
}


// ── 10 · College documents that used to print from the browser ─────────────
//
// quality_report, epa_brief, college_value, ofsted_lens and lesson_plan.
// Each reads the record with the caller's own client (row-level security
// decides what they can see, exactly as the screen does) and reproduces what
// the printed page showed.

/** Every row of a query, a page at a time (the API caps a single read). */
async function everyRow(make: () => any, what: string, page = 1000): Promise<Row[]> {
  const out: Row[] = [];
  for (let from = 0; from < 200_000; from += page) {
    const { data, error } = await make().range(from, from + page - 1);
    if (error) throw new Error(`${what}: ${error.message}`);
    out.push(...((data ?? []) as Row[]));
    if (!data || data.length < page) break;
  }
  return out;
}
const chunks = <T>(list: T[], n = 100): T[][] => {
  const out: T[][] = [];
  for (let i = 0; i < list.length; i += n) out.push(list.slice(i, i + n));
  return out;
};
const lc = (s: unknown) => String(s ?? '').trim().toLowerCase();
const londonToday = () => new Date().toLocaleDateString('en-CA', { timeZone: 'Europe/London' });
const shortDay = (iso: string) => new Date(iso).toLocaleDateString('en-GB', { timeZone: 'Europe/London', day: 'numeric', month: 'short' });
const collegeRef = (prefix: string, id: string) => `${prefix}-${String(id).slice(0, 8).toUpperCase()}`;

// ── 10a · Quality dashboard report ──────────────────────────────────────────

/* Sector norms the dashboard holds its figures against (attendance comes
   from the college's own settings). Same numbers as QualityDashboardSection. */
const ILP_COMPLIANCE_TARGET = 95;
const EPA_ON_TRACK_TARGET = 90;
const ACHIEVEMENT_TARGET = 90;
const RETENTION_TARGET = 90;
const TURNAROUND_TARGET_DAYS = 7;

/** Plain-words headline and next step for each risk factor (RiskFlagsPanel). */
const RISK_PLAIN: Record<string, { title: string; todo: string }> = {
  behind_pace: { title: 'Behind where they should be by now', todo: 'Agree a catch-up plan and check the end date is realistic.' },
  otj_gap: { title: 'No off-the-job hours logged recently', todo: 'Ask the learner and employer what training has happened and get it logged.' },
  portfolio_empty: { title: 'Nothing in the portfolio yet', todo: 'Show them how to upload evidence and set a first piece to add.' },
  ac_velocity_zero: { title: 'No new evidence in the last two weeks', todo: 'Book a portfolio review or catch-up session.' },
  open_flags: { title: 'An open pastoral flag', todo: 'Read the pastoral notes and close or follow up the flag.' },
  observation_stale: { title: 'Not observed for a long time', todo: 'Book an observed practical or professional discussion.' },
  no_observations: { title: 'Never observed at work or in a lesson', todo: 'Book an observation to evidence competence.' },
  low_attendance: { title: 'Attendance is low', todo: 'Talk to them about what is getting in the way, and tell the employer.' },
  attendance_low: { title: 'Attendance is low', todo: 'Talk to them about what is getting in the way, and tell the employer.' },
  portfolio_stale: { title: 'Portfolio not updated for a long time', todo: 'Set a piece of evidence to add this week and check they can upload.' },
  review_overdue: { title: 'Progress review is overdue', todo: 'Book the three-way review with the employer.' },
};
const RISK_LEVEL_LABEL: Record<string, string> = { critical: 'Critical', high: 'High', medium: 'Medium', low: 'Low' };
const RISK_RANK: Record<string, number> = { critical: 0, high: 1, medium: 2, low: 3 };
const CONTACT_LABEL: Record<string, string> = { call: 'Phone call', one_to_one: '1-2-1', email: 'Email', referral: 'Referral' };

export async function buildQualityReport(asCaller: SupabaseClient, college: Row, who: Who): Promise<Doc> {
  const [settingsRes, students, ilps, attendanceAll, epaAll, gradesAll, riskAll] = await Promise.all([
    asCaller
      .from('college_settings')
      .select('low_attendance_threshold_percent, high_attendance_threshold_percent')
      .eq('college_id', college.id)
      .maybeSingle(),
    everyRow(() => asCaller.from('college_students').select('id, name, status').eq('college_id', college.id).order('id'), 'learners'),
    everyRow(
      () =>
        asCaller
          .from('college_ilps')
          .select('id, student_id, last_reviewed, review_date, status')
          .eq('college_id', college.id)
          .eq('is_current', true)
          .order('id'),
      'learning plans'
    ),
    everyRow(() => asCaller.from('college_attendance').select('id, student_id, status, date').order('id'), 'registers'),
    everyRow(() => asCaller.from('college_epa').select('id, student_id, status, gateway_date').order('id'), 'EPA records'),
    everyRow(() => asCaller.from('college_grades').select('id, student_id, status, created_at, assessed_at').order('id'), 'grades'),
    everyRow(
      () => asCaller.from('student_risk_scores').select('id, student_id, score, level, factors, computed_at').eq('is_current', true).order('id'),
      'risk scores'
    ),
  ]);
  const settings = (settingsRes.data ?? {}) as Row;
  const lowAttendance = Number(settings.low_attendance_threshold_percent ?? 80);
  const attendanceTarget = Number(settings.high_attendance_threshold_percent ?? 90);

  // Only this college's learners, whatever else the caller can see.
  const mine = new Set(students.map((s) => s.id as string));
  const attendance = attendanceAll.filter((a) => mine.has(a.student_id));
  const epaRecords = epaAll.filter((e) => mine.has(e.student_id));
  const grades = gradesAll.filter((g) => mine.has(g.student_id));
  const isPresent = (s: unknown) => lc(s) === 'present' || lc(s) === 'late';

  const active = students.filter((s) => lc(s.status) === 'active');
  const presentRecords = attendance.filter((a) => isPresent(a.status)).length;
  const attendancePercent = attendance.length ? Math.round((presentRecords / attendance.length) * 100) : null;

  const sixWeeksAgo = new Date(Date.now() - 42 * 86_400_000);
  const recentIlp = new Set(ilps.filter((i) => i.last_reviewed && new Date(i.last_reviewed) >= sixWeeksAgo).map((i) => i.student_id));
  const ilpCompliancePercent = active.length ? Math.round((recentIlp.size / active.length) * 100) : null;

  const epaOnTrack = epaRecords.filter((e) => ['In Progress', 'Pre-Gateway', 'Gateway Ready', 'Complete'].includes(e.status)).length;
  const epaOnTrackPercent = epaRecords.length ? Math.round((epaOnTrack / epaRecords.length) * 100) : null;

  const completed = students.filter((s) => lc(s.status) === 'completed').length;
  const withdrawn = students.filter((s) => lc(s.status) === 'withdrawn').length;
  const achievementPercent = completed + withdrawn ? Math.round((completed / (completed + withdrawn)) * 100) : null;
  const retentionDen = active.length + completed + withdrawn;
  const retentionPercent = retentionDen ? Math.round(((active.length + completed) / retentionDen) * 100) : null;

  // Twelve weeks of attendance, each a 7-day window ending today, newest first.
  const now = new Date();
  const weeks: number[] = [];
  const weekly: Array<{ ending: string; pct: number | null; sessions: number }> = [];
  for (let w = 0; w < 12; w++) {
    const start = new Date(now.getTime() - (w + 1) * 7 * 86_400_000);
    const end = new Date(now.getTime() - w * 7 * 86_400_000);
    const recs = attendance.filter((a) => {
      const d = new Date(a.date);
      return d >= start && d < end;
    });
    const pctW = recs.length ? (recs.filter((a) => isPresent(a.status)).length / recs.length) * 100 : 0;
    weeks.push(pctW);
    weekly.push({ ending: shortDay(end.toISOString()), pct: recs.length ? Math.round(pctW) : null, sessions: recs.length });
  }
  weekly.reverse();
  let trend: 'Improving' | 'Stable' | 'Declining' = 'Stable';
  const recentAvg = (weeks[0] + weeks[1]) / 2;
  const olderAvg = (weeks[2] + weeks[3]) / 2;
  if (recentAvg - olderAvg > 2) trend = 'Improving';
  else if (olderAvg - recentAvg > 2) trend = 'Declining';
  const sessionsCharted = weekly.reduce((n, p) => n + p.sessions, 0);

  const graded = grades.filter((g) => g.assessed_at && g.created_at);
  const avgTurnaround = graded.length
    ? Math.round(
        graded.reduce((n, g) => n + Math.max(0, (new Date(g.assessed_at).getTime() - new Date(g.created_at).getTime()) / 86_400_000), 0) / graded.length
      )
    : null;

  const today = londonToday();
  const overdueIlps = ilps.filter((i) => i.status === 'active' && i.review_date && String(i.review_date) < today);
  const lowAttendanceLearners = active.filter((s) => {
    const recs = attendance.filter((a) => a.student_id === s.id);
    if (!recs.length) return false;
    return (recs.filter((a) => isPresent(a.status)).length / recs.length) * 100 < lowAttendance;
  });
  const pending = grades.filter((g) => g.status === 'Pending' || g.status === 'Submitted');
  const twoWeeks = new Date(now.getTime() + 14 * 86_400_000);
  const gatewaySoon = epaRecords.filter((e) => {
    if (!e.gateway_date) return false;
    const gw = new Date(e.gateway_date);
    return gw <= twoWeeks && gw >= now && e.status !== 'Complete';
  });

  // Learners at risk: the current score per active learner, contact since first flagged.
  const activeIds = new Set(active.map((s) => s.id as string));
  const nameOf = new Map(active.map((s) => [s.id as string, (s.name as string) || 'Learner']));
  const byStudent = new Map<string, Row>();
  for (const r of riskAll) if (activeIds.has(r.student_id)) byStudent.set(r.student_id, r);
  const flagged = [...byStudent.values()]
    .filter((r) => r.level === 'critical' || r.level === 'high')
    .sort((a, b) => RISK_RANK[a.level] - RISK_RANK[b.level] || Number(b.score ?? 0) - Number(a.score ?? 0));
  const flaggedIds = flagged.map((r) => r.student_id as string);
  const firstFlagged = new Map<string, string>();
  const contacts = new Map<string, Row>();
  if (flaggedIds.length) {
    const history: Row[] = [];
    for (const ids of chunks(flaggedIds)) {
      const { data } = await asCaller
        .from('student_risk_scores')
        .select('student_id, computed_at, level')
        .in('student_id', ids)
        .order('computed_at', { ascending: false })
        .limit(5000);
      history.push(...((data ?? []) as Row[]));
    }
    history.sort((a, b) => String(b.computed_at).localeCompare(String(a.computed_at)));
    const broken = new Set<string>();
    for (const r of history) {
      if (broken.has(r.student_id)) continue;
      if (r.level === 'high' || r.level === 'critical') firstFlagged.set(r.student_id, r.computed_at);
      else broken.add(r.student_id);
    }
    const since = [...firstFlagged.values()].sort()[0] ?? new Date(Date.now() - 60 * 86_400_000).toISOString();
    const notes: Row[] = [];
    for (const ids of chunks(flaggedIds)) {
      const { data } = await asCaller
        .from('pastoral_notes')
        .select('student_id, kind, contact_method, created_at')
        .in('student_id', ids)
        .in('kind', ['one_to_one', 'intervention'])
        .gte('created_at', since)
        .order('created_at', { ascending: false });
      notes.push(...((data ?? []) as Row[]));
    }
    notes.sort((a, b) => String(b.created_at).localeCompare(String(a.created_at)));
    for (const n of notes) if (!contacts.has(n.student_id)) contacts.set(n.student_id, n);
  }
  const contactedSince = (r: Row) => {
    const c = contacts.get(r.student_id);
    const since = firstFlagged.get(r.student_id) ?? r.computed_at;
    return c && new Date(c.created_at).getTime() >= new Date(since).getTime() ? c : null;
  };
  const contactedCount = flagged.filter((r) => contactedSince(r)).length;
  const levels: Record<string, number> = { critical: 0, high: 0, medium: 0, low: 0 };
  for (const r of byStudent.values()) levels[r.level] = (levels[r.level] ?? 0) + 1;
  const reasons = new Map<string, { title: string; n: number }>();
  for (const r of flagged) {
    for (const f of (r.factors ?? []) as Row[]) {
      const k = f.key ?? f.label;
      const cur = reasons.get(k) ?? { title: (f.key && RISK_PLAIN[f.key]?.title) || f.label, n: 0 };
      cur.n += 1;
      reasons.set(k, cur);
    }
  }
  const sev = (f: Row) => Number(f.severity ?? f.weight ?? 0);

  const measures = [
    { label: 'Attendance', value: attendancePercent, target: attendanceTarget, sub: attendance.length ? `${attendance.length} register entries` : 'No registers taken yet' },
    { label: 'Learning plans reviewed', value: ilpCompliancePercent, target: ILP_COMPLIANCE_TARGET, sub: 'Reviewed in the last six weeks' },
    {
      label: 'EPA on track',
      value: epaOnTrackPercent,
      target: EPA_ON_TRACK_TARGET,
      sub: epaRecords.length ? `${plural(epaRecords.length, 'learner')} on an EPA record` : 'No EPA records yet',
    },
    {
      label: 'Achievement',
      value: achievementPercent,
      target: ACHIEVEMENT_TARGET,
      sub: completed + withdrawn === 0 ? 'No leavers yet' : `${completed} of ${completed + withdrawn} leavers achieved`,
    },
    { label: 'Retention', value: retentionPercent, target: RETENTION_TARGET, sub: 'Active and completed out of everyone who started' },
  ];
  const gapText = (m: (typeof measures)[number]) => {
    const gap = m.value == null ? null : m.value - m.target;
    return gap == null ? `Target ${m.target}%, no data yet` : gap >= 0 ? `On target (${m.target}%)` : `${Math.abs(gap)} points below ${m.target}%`;
  };
  const atTarget = measures.filter((m) => m.value != null && m.value >= m.target).length;
  const below = measures.filter((m) => m.value != null && m.value < m.target).length;

  const work: string[][] = [
    ...(lowAttendanceLearners.length
      ? [['Low attendance', `${plural(lowAttendanceLearners.length, 'learner')} below ${lowAttendance}%`, String(lowAttendanceLearners.length)]]
      : []),
    ...(overdueIlps.length ? [['Overdue learning plan reviews', `${plural(overdueIlps.length, 'review')} past due`, String(overdueIlps.length)]] : []),
    ...(gatewaySoon.length ? [['EPA gateway due soon', `${gatewaySoon.length} within the next two weeks`, String(gatewaySoon.length)]] : []),
    ...(pending.length ? [['Assessments to mark', `${pending.length} awaiting a grade`, String(pending.length)]] : []),
  ];

  const generated = nowIso();
  const sections: Row[] = [
    {
      heading: 'Against target',
      intro: 'Each headline figure against its target.',
      kind: 'table',
      compact: true,
      columns: ['Measure', 'Figure', 'Target', 'Against target', 'Basis'],
      widths: ['44mm', '18mm', '18mm', '40mm', ''],
      rows: measures.map((m) => [m.label, m.value == null ? 'None' : `${m.value}%`, `${m.target}%`, gapText(m), m.sub]),
    },
    {
      heading: 'Needs you',
      intro: work.length ? `${plural(work.length, 'thing')} to sort.` : '',
      kind: 'table',
      compact: true,
      columns: ['What', 'Detail', 'Count'],
      widths: ['60mm', '', '20mm'],
      rows: work,
      empty: `Nothing outstanding. No overdue learning plan reviews, no learner below ${lowAttendance}% attendance, nothing waiting to be marked.`,
    },
    {
      heading: 'Learners at risk',
      intro: flagged.length
        ? `${flagged.length} at high or critical risk. ${contactedCount} contacted since they were flagged. ${byStudent.size} of ${active.length} active learners have a current risk score.`
        : `No learner is at high or critical risk. ${byStudent.size} of ${active.length} active learners have a current risk score.`,
      kind: 'kv',
      rows: (['critical', 'high', 'medium', 'low'] as const).map((l) => ({
        label: `${RISK_LEVEL_LABEL[l]} risk`,
        value: plural(levels[l] ?? 0, 'learner'),
        tone: l === 'critical' && levels[l] ? 'bad' : l === 'high' && levels[l] ? 'warn' : '',
      })),
    },
  ];
  if (reasons.size) {
    sections.push({
      heading: 'Why they are flagged',
      intro: 'The reasons behind high and critical risk, most common first.',
      kind: 'table',
      compact: true,
      columns: ['Reason', 'Learners'],
      widths: ['', '24mm'],
      rows: [...reasons.values()].sort((a, b) => b.n - a.n).map((r) => [r.title, String(r.n)]),
    });
  }
  if (flagged.length) {
    sections.push({
      heading: `Flagged learners · ${flagged.length}`,
      intro: 'What to do comes from the college’s risk rules, not AI. Contacted means a 1-2-1 or intervention note since the learner was first flagged.',
      kind: 'table',
      compact: true,
      columns: ['Learner', 'Risk', 'Why, and what to do', 'Contact'],
      widths: ['36mm', '18mm', '', '36mm'],
      rows: flagged.map((r) => {
        const factors = [...((r.factors ?? []) as Row[])].sort((a, b) => sev(b) - sev(a));
        const why = factors
          .map((f) => {
            const p = f.key ? RISK_PLAIN[f.key] : null;
            return `${p?.title ?? f.label}${p ? ` (${f.label})` : ''}\nWhat to do: ${p?.todo ?? f.detail ?? 'Check the learner record and agree a next step.'}`;
          })
          .join('\n\n');
        const c = contactedSince(r);
        const since = firstFlagged.get(r.student_id);
        return [
          nameOf.get(r.student_id) ?? 'Learner',
          RISK_LEVEL_LABEL[r.level] ?? r.level,
          why || 'Flagged',
          `${c ? `${c.contact_method ? CONTACT_LABEL[c.contact_method] ?? 'Contacted' : c.kind === 'one_to_one' ? '1-2-1' : 'Contacted'} ${shortDay(c.created_at)}` : 'Not contacted'}${
            since ? `\nFlagged since ${shortDay(since)}` : ''
          }\nWorked out ${shortDay(r.computed_at)}`,
        ];
      }),
    });
  }
  sections.push(
    {
      heading: 'Attendance, last 12 weeks',
      new_page: true,
      intro: sessionsCharted
        ? `Weekly attendance across every register. Direction: ${trend.toLowerCase()} (the last two weeks against the two before). Low is ${lowAttendance}%, the target is ${attendanceTarget}%.`
        : 'No register entries in the last 12 weeks, so there is no trend to show yet.',
      kind: 'table',
      compact: true,
      columns: ['Week ending', 'Attendance', 'Sessions'],
      widths: ['', '30mm', '30mm'],
      rows: sessionsCharted ? weekly.map((p) => [p.ending, p.pct == null ? 'No sessions' : `${p.pct}%`, String(p.sessions)]) : [],
      empty: 'No register entries in the last 12 weeks.',
    },
    {
      heading: 'Beyond the headline',
      kind: 'kv',
      rows: [
        {
          label: 'Retention',
          value: retentionPercent == null ? 'None' : `${retentionPercent}%`,
          note: 'Active and completed out of everyone who started',
          tone: retentionPercent != null && retentionPercent < RETENTION_TARGET ? 'warn' : '',
        },
        { label: 'Attendance direction', value: trend, note: 'Last two weeks against the two before', tone: trend === 'Declining' ? 'warn' : '' },
        {
          label: 'Marking turnaround',
          value: avgTurnaround == null ? 'None' : `${avgTurnaround} days`,
          note: graded.length ? `Average days to grade. Target ${TURNAROUND_TARGET_DAYS} or fewer` : 'Nothing graded yet',
          tone: avgTurnaround != null && avgTurnaround > TURNAROUND_TARGET_DAYS ? 'warn' : '',
        },
      ],
    }
  );

  const pctOrNone = (v: number | null) => (v == null ? 'None' : String(v));
  return {
    learnerId: null,
    folder: `quality_report/${college.id}`,
    filename: `${fileSafe(college.name || 'College', 50)} - quality report`,
    payload: {
      meta: {
        kind: 'Quality report',
        series: 'College record',
        title: college.name || 'College',
        subtitle: 'Every headline figure against its target, the learners who need you, and the evidence behind each number',
        reference: collegeRef('QR', college.id),
        generated: fmtDateTime(generated),
        generated_by: generatedBy(who),
        integrity: 'Built from the live record on the date shown.',
      },
      status: { label: `${atTarget} of ${measures.length} measures at target`, tone: below ? 'warn' : atTarget ? 'ok' : 'neutral' },
      org: { name: college.name || '', sub: 'Training provider', logo: college.logo_url || '' },
      cover_facts: pairFacts<Row>([
        { label: 'College', value: college.name || 'College', big: true, wide: true },
        { label: 'Active learners', value: String(active.length) },
        { label: 'At high or critical risk', value: String(flagged.length) },
        { label: 'Prepared by', value: who.name },
        { label: 'Prepared on', value: fmtDateTime(generated) },
      ]),
      headline: measures.slice(0, 4).map((m) => ({ label: m.label, value: pctOrNone(m.value), unit: m.value == null ? '' : '%', note: gapText(m) })),
      contents: [
        'Against target',
        'Needs you',
        'Learners at risk',
        ...(reasons.size ? ['Why they are flagged'] : []),
        ...(flagged.length ? ['Flagged learners'] : []),
        'Attendance, last 12 weeks',
        'Beyond the headline',
      ],
      alerts: below ? [{ tone: 'warn', title: 'Below target.', text: `${plural(below, 'measure')} below target.` }] : [],
      sections,
      notes: [
        'Attendance: present or late out of every register mark. Learning plans: active learners reviewed in the last six weeks. Achievement: completed out of everyone who has left. Retention: active and completed out of everyone who started.',
        'Risk levels are worked out overnight from coverage against time on programme, off-the-job hours, portfolio, observations, attendance and open pastoral flags.',
      ],
      disclaimer: '',
    },
  };
}

// ── 10b · Pre-EPA brief ──────────────────────────────────────────────────────

export async function buildEpaBrief(admin: SupabaseClient, row: Row, who: Who): Promise<Doc> {
  const base = await learnerBasics(admin, null, row.college_student_id);
  const org = await collegeOrg(admin, row.college_id ?? base.student?.college_id);
  const b = (row.brief ?? {}) as Row;
  const signals = (row.signals_used ?? {}) as Row;
  const booked = (signals.epa_booking_date as string | null) ?? null;
  const topics = (b.likely_viva_topics ?? []) as Row[];
  const weak = (b.weak_ac_revision ?? []) as Row[];
  const zones = (b.bs7671_hot_zones ?? []) as Row[];
  const pitfalls = ((b.common_pitfalls ?? []) as unknown[]).map((x) => String(x));
  const dayOf = ((b.day_of_advice ?? []) as unknown[]).map((x) => String(x));
  const generated = nowIso();

  const sections: Row[] = [];
  if (b.intro) sections.push({ heading: '', kind: 'text', paragraphs: [String(b.intro)] });
  sections.push(
    {
      heading: 'Five topics to revise for the AM2S',
      kind: 'table',
      compact: true,
      columns: ['', 'Topic', 'Why this for you', 'Prep'],
      widths: ['8mm', '44mm', '', ''],
      rows: topics.map((t, i) => [String(i + 1).padStart(2, '0'), t.topic ?? '', t.why ?? '', t.prep ?? '']),
      empty: 'No topics in this brief.',
    },
    {
      heading: 'ACs to revise hardest',
      kind: 'table',
      compact: true,
      columns: ['Unit', 'Focus', 'Picture this'],
      widths: ['22mm', '', ''],
      rows: weak.map((a) => [a.unit_code ?? '', a.focus ?? '', a.exemplar ?? '']),
      empty: 'No assessment criteria singled out.',
    },
    {
      heading: 'BS 7671 hot zones',
      kind: 'table',
      compact: true,
      columns: ['Regulation', 'What to remember'],
      widths: ['40mm', ''],
      rows: zones.map((z) => [z.ref ?? '', z.what_to_remember ?? '']),
      empty: 'No regulations singled out.',
    },
    { heading: 'Watch out for', kind: 'items', items: pitfalls, empty: 'Nothing listed.' },
    { heading: 'On the day', kind: 'items', items: dayOf, empty: 'Nothing listed.' }
  );
  if (b.confidence_message) sections.push({ heading: '', kind: 'text', paragraphs: [String(b.confidence_message)] });

  return {
    learnerId: (base.student?.user_id as string) ?? null,
    folder: `epa_brief/${row.id}`,
    filename: `${fileSafe(base.name, 50)} - pre-EPA brief`,
    payload: {
      meta: {
        kind: 'Pre-EPA brief',
        series: 'Learner record',
        title: base.name,
        subtitle: booked
          ? `EPA booked for ${fmtDate(booked)}. Personalised to the evidence base and weak areas.`
          : 'Personalised to the evidence base, weak areas and BS 7671 hot zones.',
        reference: `EB-${String(row.id).slice(0, 8).toUpperCase()}`,
        generated: fmtDateTime(generated),
        generated_by: generatedBy(who),
        integrity: `The brief as written on ${fmtDateTime(row.created_at)}.`,
      },
      status: { label: booked ? `EPA booked for ${fmtDate(booked)}` : 'EPA not booked yet', tone: 'neutral' },
      org,
      cover_facts: pairFacts<Row>([
        { label: 'Apprentice', value: base.name, big: true, wide: true },
        { label: 'Course', value: base.course || 'Not recorded' },
        { label: 'Employer', value: base.employer || 'Not recorded' },
        { label: 'EPA booked for', value: booked ? fmtDate(booked) : 'Not booked yet' },
        { label: 'Brief written', value: fmtDateTime(row.created_at) },
        { label: 'Written for', value: row.generated_for === 'tutor' ? 'The tutor' : 'The apprentice' },
        { label: 'BS 7671 references used', value: String(row.facets_used ?? 0) },
      ]),
      headline: [],
      contents: ['Five topics to revise for the AM2S', 'ACs to revise hardest', 'BS 7671 hot zones', 'Watch out for', 'On the day'],
      alerts: [],
      sections,
      notes: [],
      disclaimer:
        'Drafted by AI from the apprentice’s record (weak units, observations, mock results) and checked BS 7671 references. It is revision guidance, not an assessment decision.',
    },
  };
}

// ── 10c · Value in numbers ──────────────────────────────────────────────────

const monthName = (iso: string) => new Date(`${String(iso).slice(0, 10)}T12:00:00Z`).toLocaleDateString('en-GB', { month: 'long', year: 'numeric', timeZone: 'UTC' });
const dayName = (iso: string) => new Date(`${String(iso).slice(0, 10)}T12:00:00Z`).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', timeZone: 'UTC' });

const VALUE_GROUPS: Array<{
  title: string;
  sub: string;
  metrics: Array<{ key: string; label: string; unit?: string; lowerBetter?: boolean; noCompare?: boolean; sub: (m: Row) => string }>;
}> = [
  {
    title: 'Hours and learning',
    sub: 'Off-the-job time evidenced, and learning measured in the app',
    metrics: [
      { key: 'hours_verified', label: 'Hours verified', unit: 'h', sub: () => 'Verified by a tutor or attested by an employer' },
      { key: 'app_learning_hours', label: 'Learning in the app', unit: 'h', sub: () => 'Measured as it happened' },
      { key: 'learners_studied', label: 'Learners who studied', sub: (m) => `${m.learners_studied ?? 0} used the app to learn` },
    ],
  },
  {
    title: 'Assessment',
    sub: 'Evidence decided, observations and progress reviews',
    metrics: [
      { key: 'evidence_assessed', label: 'Evidence assessed', sub: () => 'Submissions given a decision' },
      { key: 'decision_days', label: 'Days to a decision', lowerBetter: true, sub: () => 'Average, submission to decision' },
      { key: 'observations', label: 'Observations', sub: () => 'Recorded by assessors' },
      { key: 'reviews_held', label: 'Progress reviews held', sub: () => 'Three-way, with the employer' },
    ],
  },
  {
    title: 'Teaching and support',
    sub: 'Registers, quizzes, messages and contact with learners at risk',
    metrics: [
      { key: 'registers_taken', label: 'Registers taken', sub: (m) => (m.attendance_rate == null ? 'No sessions' : `${m.attendance_rate}% attendance`) },
      { key: 'quizzes_completed', label: 'Quizzes completed', sub: (m) => (m.quiz_average == null ? 'No quizzes' : `Average score ${m.quiz_average}%`) },
      { key: 'messages_answered', label: 'Messages sent', sub: () => 'From tutors to learners' },
      { key: 'at_risk_contacted', label: 'At-risk learners contacted', noCompare: true, sub: (m) => `of ${m.at_risk ?? 0} flagged high or critical now` },
    ],
  },
];

export function buildCollegeValue(v: Row, college: Row, who: Who): Doc {
  const now = (v.this ?? {}) as Row;
  const last = (v.last ?? {}) as Row;
  const partial = !!v.partial;
  const fmtV = (x: unknown, unit = '') => {
    if (x == null) return 'None';
    const n = Number(x);
    return `${Number.isInteger(n) ? n : n.toFixed(1)}${unit}`;
  };
  const vs = partial ? 'the same days last month' : 'last month';
  const change = (a: unknown, b: unknown, lowerBetter?: boolean) => {
    if (a == null || b == null) return 'No comparison';
    const diff = Math.round((Number(a) - Number(b)) * 10) / 10;
    if (diff === 0) return `Same as ${vs}`;
    const better = lowerBetter ? diff < 0 : diff > 0;
    return `${diff > 0 ? 'Up' : 'Down'} ${Math.abs(diff)} on ${vs}${better ? '' : ' (worse)'}`;
  };
  const thisLabel = `${monthName(v.month)}${partial ? ' so far' : ''}`;
  const lastLabel = `${monthName(v.previous_month)}${partial ? ' (same days)' : ''}`;
  const intro = partial
    ? `${v.learners} learners on programme. ${monthName(v.month)} so far, to ${dayName(v.to_date)}, compared with the same days of ${monthName(v.previous_month)} (to ${dayName(v.previous_to_date)}). Counted from the college’s own records.`
    : `${v.learners} learners on programme. Every figure is counted from the college’s own records and compared with ${monthName(v.previous_month)}.`;
  const generated = nowIso();

  const sections: Row[] = [{ heading: '', kind: 'text', paragraphs: [intro] }];
  for (const g of VALUE_GROUPS) {
    sections.push({
      heading: g.title,
      intro: g.sub,
      kind: 'table',
      compact: true,
      columns: ['Measure', thisLabel, lastLabel, 'Change', 'What it counts'],
      widths: ['40mm', '26mm', '26mm', '42mm', ''],
      rows: g.metrics.map((m) => [
        m.label,
        fmtV(now[m.key], m.unit),
        m.noCompare ? '' : fmtV(last[m.key], m.unit),
        m.noCompare ? 'Contact recorded this month' : change(now[m.key], last[m.key], m.lowerBetter),
        m.sub(now),
      ]),
    });
  }

  return {
    learnerId: null,
    folder: `college_value/${college.id}`,
    filename: `${fileSafe(college.name || 'College', 40)} - ${monthName(v.month)} in numbers`,
    payload: {
      meta: {
        kind: 'Your month in numbers',
        series: 'College record',
        title: `What Elec-Mate did for you in ${monthName(v.month)}`,
        subtitle: college.name || '',
        reference: `VR-${String(v.month).slice(0, 7)}`,
        generated: fmtDateTime(generated),
        generated_by: generatedBy(who),
        integrity: 'Nothing is estimated: every figure is a count of real records.',
      },
      status: { label: partial ? `${monthName(v.month)} so far` : monthName(v.month), tone: 'neutral' },
      org: { name: college.name || '', sub: 'Training provider', logo: college.logo_url || '' },
      cover_facts: pairFacts<Row>([
        { label: 'College', value: college.name || 'College', big: true, wide: true },
        { label: 'Month', value: partial ? `${monthName(v.month)}, to ${dayName(v.to_date)}` : monthName(v.month) },
        { label: 'Compared with', value: partial ? `${monthName(v.previous_month)}, to ${dayName(v.previous_to_date)}` : monthName(v.previous_month) },
        { label: 'Learners on programme', value: String(v.learners ?? 0) },
        { label: 'Prepared by', value: who.name },
        { label: 'Prepared on', value: fmtDateTime(generated) },
      ]),
      headline: [
        { label: 'Hours verified', value: fmtV(now.hours_verified), unit: 'h', note: change(now.hours_verified, last.hours_verified) },
        { label: 'Evidence assessed', value: fmtV(now.evidence_assessed), unit: '', note: change(now.evidence_assessed, last.evidence_assessed) },
        { label: 'Registers taken', value: fmtV(now.registers_taken), unit: '', note: change(now.registers_taken, last.registers_taken) },
        { label: 'At-risk contacted', value: fmtV(now.at_risk_contacted), unit: `of ${now.at_risk ?? 0}`, note: 'flagged high or critical now' },
      ],
      contents: VALUE_GROUPS.map((g) => g.title),
      alerts: [],
      sections,
      notes: [
        'Every number is a count of real records: hours verified, submissions given a decision, registers taken, messages sent and so on.',
        'At-risk learners are those flagged high or critical now, and how many had contact recorded this month (a note, 1-2-1, concern, flag or intervention).',
      ],
      disclaimer: '',
    },
  };
}

// ── 10d · Ofsted lens ───────────────────────────────────────────────────────

const RAG_READINESS: Record<string, string> = { green: 'Evidence in place', amber: 'Some gaps', red: 'Gaps to close', grey: 'Not tracked' };
const RAG_RESULT: Record<string, string> = { green: 'passed', amber: 'referred', red: 'rejected', grey: 'neutral' };

export function buildOfstedLens(snapshot: OfstedSnapshot, college: Row, who: Who): Doc {
  const byKey = new Map(snapshot.judgements.map((j) => [j.key, j]));
  const areas = TOOLKIT_AREAS.map((def) => {
    const j = byKey.get(def.key);
    return { ...def, rag: j?.rag ?? 'grey', evidence: j?.evidence ?? [], gaps: j?.gaps ?? [] };
  });
  const count = (r: string) => areas.filter((a) => a.rag === r).length;
  const signals = areas.reduce((n, a) => n + a.evidence.length, 0);
  const gaps = areas.reduce((n, a) => n + a.gaps.length, 0);
  const safeguarding = areas.find((a) => a.key === 'safeguarding');
  const generated = nowIso();

  const areaSections = (level: 'whole' | 'provision', heading: string, sub: string): Row[] => {
    const list = areas.filter((a) => a.level === level);
    const out: Row[] = [{ heading, new_page: true, kind: 'text', paragraphs: [sub] }];
    for (const a of list) {
      out.push({
        heading: `${a.title} · ${RAG_READINESS[a.rag]}`,
        intro: `${a.what} Graded: ${a.scale}.`,
        kind: 'checklist',
        items: a.evidence.map((e) => ({
          label: e.label,
          result: RAG_RESULT[e.status ?? 'grey'],
          result_label: RAG_READINESS[e.status ?? 'grey'],
          note: e.value,
        })),
      });
      if (!a.evidence.length) out.push({ heading: '', kind: 'text', paragraphs: ['No live signal in the app evidences this area yet.'] });
      if (a.gaps.length) out.push({ heading: '', intro: 'Known gaps', kind: 'items', items: a.gaps });
    }
    return out;
  };

  return {
    learnerId: null,
    folder: `ofsted_lens/${college.id}`,
    filename: `${fileSafe(college.name || 'College', 50)} - Ofsted lens`,
    payload: {
      meta: {
        kind: 'Ofsted lens',
        series: 'College record',
        title: college.name || 'College',
        subtitle: 'Live evidence against the areas Ofsted inspects further education and skills on, from November 2025',
        reference: collegeRef('OL', college.id),
        generated: fmtDateTime(generated),
        generated_by: generatedBy(who),
        integrity: 'Built from the live record on the date shown. It shows how ready the evidence is, not a predicted grade.',
      },
      status: {
        label: `${count('green')} of ${areas.length} areas with evidence in place`,
        tone: count('red') ? 'bad' : count('amber') ? 'warn' : count('green') === areas.length ? 'ok' : 'neutral',
      },
      org: { name: college.name || '', sub: 'Training provider', logo: college.logo_url || '' },
      cover_facts: pairFacts<Row>([
        { label: 'College', value: college.name || 'College', big: true, wide: true },
        { label: 'Look-back window', value: `${snapshot.audit_window_days} days for registers, lessons, observations and hours` },
        { label: 'Prepared by', value: who.name },
        { label: 'Prepared on', value: fmtDateTime(generated) },
      ]),
      headline: [
        { label: 'Areas with evidence in place', value: String(count('green')), unit: `of ${areas.length}`, note: '' },
        { label: 'Areas with gaps to close', value: String(count('red')), unit: '', note: `${count('amber')} more with some gaps` },
        {
          label: 'Safeguarding evidence',
          value: safeguarding ? { green: 'Ready', amber: 'Partly', red: 'Gaps', grey: 'None' }[safeguarding.rag] ?? 'None' : 'None',
          unit: '',
          note: 'Ofsted grades it met or not met',
        },
        { label: 'Live signals read', value: String(signals), unit: '', note: `${gaps} known gaps not tracked in the app` },
      ],
      contents: ['The seven evaluation areas', 'How Ofsted grades each area', 'The college as a whole', 'Each type of provision'],
      alerts: [],
      sections: [
        {
          heading: 'The seven evaluation areas by evidence readiness',
          kind: 'table',
          compact: true,
          columns: ['Area', 'Judged for', 'Evidence readiness'],
          widths: ['', '50mm', '40mm'],
          rows: areas.map((a) => [a.title, a.level === 'whole' ? 'The college as a whole' : 'Each type of provision', RAG_READINESS[a.rag]]),
        },
        {
          heading: 'How Ofsted grades each area',
          intro: 'Safeguarding is met or not met. There is no overall effectiveness grade. The readiness shown here is how ready your evidence is, not a predicted grade.',
          kind: 'items',
          items: TOOLKIT_GRADES.map((g, i) => `${i + 1}. ${g}`),
        },
        ...areaSections('whole', 'The college as a whole', 'Judged once for the whole provider.'),
        ...areaSections('provision', 'Each type of provision', 'Judged separately for each type you offer, such as apprenticeships.'),
      ],
      notes: [
        'Each area is graded on five points: exceptional, strong standard, expected standard, needs attention, urgent improvement. Safeguarding is met or not met. There is no overall effectiveness grade from November 2025.',
        'Safeguarding, inclusion, leadership and governance, and contribution to meeting skills needs are judged for the college as a whole. Curriculum, teaching and training, achievement, and participation and development are judged for each type of provision.',
        'Known gaps are things the app does not track yet. Keep that evidence somewhere you can show an inspector.',
      ],
      sources: [
        { ref: '1', text: 'Ofsted, Education inspection framework for use from November 2025', url: TOOLKIT_SOURCE_URL },
        { ref: '2', text: 'Ofsted, Further education and skills inspection toolkit (v2.0, for inspections from 1 September 2026)', url: TOOLKIT_GUIDE_URL },
      ],
      disclaimer: '',
    },
  };
}

// ── 10e · Lesson plan ───────────────────────────────────────────────────────

/** Markdown to plain paragraphs: headings, emphasis and code marks removed, bullets kept. */
function markdownParagraphs(md: string): string[] {
  return String(md)
    .replace(/\r/g, '')
    .split(/\n{2,}/)
    .map((block) =>
      block
        .split('\n')
        .map((line) =>
          line
            .replace(/^\s{0,3}#{1,6}\s+/, '')
            .replace(/^\s*[-*+]\s+/, '• ')
            .replace(/\*\*(.+?)\*\*/g, '$1')
            .replace(/__(.+?)__/g, '$1')
            .replace(/(^|[\s(])[*_](\S[^*_]*?)[*_](?=[\s).,;:!?]|$)/g, '$1$2')
            .replace(/`([^`]+)`/g, '$1')
            .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1')
            .trimEnd()
        )
        .join('\n')
        .trim()
    )
    .filter(Boolean);
}
const clock = (mins: number) => {
  const m = Math.max(0, Math.floor(mins));
  return `${String(Math.floor(m / 60)).padStart(2, '0')}:${String(m % 60).padStart(2, '0')}`;
};
const docName = (t: unknown) => (t === 'bs7671' ? 'BS 7671' : t === 'gn3' ? 'Guidance Note 3' : 'On-Site Guide');
const docShort = (t: unknown) => (t === 'bs7671' ? 'BS 7671' : t === 'gn3' ? 'GN3' : 'OSG');
const words = (s: unknown) => String(s ?? '').replace(/_/g, ' ').replace(/^\w/, (c) => c.toUpperCase());

/** Strips internal retrieval jargon ("(facet 2,14)", "facets") from saved lesson text. */
function cleanLessonText(s: string): string {
  return String(s ?? '')
    .replace(/\s*\((?:see\s+)?facets?\b[^)]*\)/gi, '')
    .replace(/\bfacets?\s*#?[\d,\s]+/gi, '')
    .replace(/\s{2,}/g, ' ')
    .trim();
}

export function buildLessonPlan(row: Row, plan: Row, college: Row | null, who: Who): Doc {
  const facets = (plan.cited_facets ?? []) as Row[];
  const facetById = new Map(facets.map((c) => [c.facet_id, c]));
  // No A4 tags: bs7671_regulations.updated_in is the source's edition, not
  // "changed by A4", so the data cannot support them (7 Oct 2026).
  const objectives = (plan.learning_objectives ?? []) as Row[];
  const activities = (plan.activities ?? []) as Row[];
  const duration = Number(plan.duration_mins ?? row.duration_minutes ?? 0);
  const generated = nowIso();
  const has = (x: unknown) => Array.isArray(x) && x.length > 0;

  const sections: Row[] = [];
  if (has(plan.prior_knowledge)) sections.push({ heading: 'Prior knowledge', kind: 'items', items: plan.prior_knowledge });
  sections.push({
    heading: 'What apprentices will master',
    kind: 'table',
    compact: true,
    columns: ['', 'Outcome', 'Criteria'],
    widths: ['10mm', '', '40mm'],
    rows: objectives.map((o, i) => [String(i + 1).padStart(2, '0'), o.text ?? '', has(o.ac_codes) ? `AC ${(o.ac_codes as string[]).join(' · ')}` : '']),
    empty: 'No outcomes set.',
  });
  let cursor = 0;
  sections.push({
    heading: 'Session plan',
    intro: `${duration} minutes.`,
    kind: 'table',
    compact: true,
    columns: ['', 'Time', 'Activity', 'Teacher moves, checks and resources'],
    widths: ['8mm', '24mm', '', ''],
    rows: activities.map((a, i) => {
      const start = cursor;
      cursor += Number(a.time_mins ?? 0);
      const regs = ((a.cited_facet_ids ?? []) as string[])
        .map((id) => facetById.get(id))
        .filter(Boolean)
        .map((f: any) => (f.reg_number ? `${docShort(f.document_type)} ${f.reg_number}` : docShort(f.document_type)))
        .filter((v: string, i: number, all: string[]) => all.indexOf(v) === i);
      const extra = [
        ...(has(a.teacher_moves) ? [`Teacher moves:\n${(a.teacher_moves as string[]).map((m) => `• ${m}`).join('\n')}`] : []),
        ...(a.check_for_understanding ? [`Check for understanding: ${a.check_for_understanding}`] : []),
        ...(has(a.resources_needed) ? [`Resources: ${(a.resources_needed as string[]).map(cleanLessonText).join(' · ')}`] : []),
        ...(regs.length ? [`Regs: ${regs.join(' · ')}`] : []),
      ];
      return [
        String(i + 1).padStart(2, '0'),
        `${clock(start)} to ${clock(cursor)}\n${a.time_mins ?? 0} min`,
        `${a.phase ? `${a.phase}\n` : ''}${a.title ?? ''}\n${a.description ?? ''}`.trim(),
        extra.join('\n\n'),
      ];
    }),
    empty: 'No activities planned.',
  });
  if (plan.tutor_brief_markdown) {
    sections.push({ heading: 'Tutor’s briefing', new_page: true, kind: 'text', paragraphs: markdownParagraphs(plan.tutor_brief_markdown) });
  }
  if (has(plan.analogies)) {
    sections.push({
      heading: 'Analogies',
      kind: 'table',
      compact: true,
      columns: ['Analogy', 'How it goes', 'When to use it'],
      widths: ['36mm', '', '50mm'],
      rows: (plan.analogies as Row[]).map((a) => [a.name ?? '', a.description ?? '', a.when_to_use ?? '']),
    });
  }
  if (has(plan.misconceptions)) {
    sections.push({
      heading: 'Common misconceptions',
      kind: 'table',
      compact: true,
      columns: ['Apprentice believes', 'Correction'],
      rows: (plan.misconceptions as Row[]).map((m) => [m.belief ?? '', m.correction ?? '']),
    });
  }
  if (has(plan.worked_examples)) {
    sections.push({
      heading: 'Worked examples',
      kind: 'table',
      compact: true,
      columns: ['Scenario', 'Working', 'Answer'],
      widths: ['', '', '40mm'],
      rows: (plan.worked_examples as Row[]).map((w) => [
        w.scenario ?? '',
        ((w.working ?? []) as string[]).map((s, i) => `${i + 1}. ${s}`).join('\n'),
        w.answer ?? '',
      ]),
    });
  }
  if (has(plan.cold_call_questions)) {
    sections.push({
      heading: 'Cold-call question bank',
      kind: 'table',
      compact: true,
      columns: ['', 'Question', 'Level', 'Expected answer'],
      widths: ['8mm', '', '24mm', ''],
      rows: (plan.cold_call_questions as Row[]).map((q, i) => [String(i + 1).padStart(2, '0'), q.question ?? '', words(q.bloom_level), q.expected_answer ?? '']),
    });
  }
  if (has(plan.exit_ticket)) {
    sections.push({
      heading: 'Exit ticket',
      kind: 'table',
      compact: true,
      columns: ['', 'Question', 'Answer'],
      widths: ['10mm', '', ''],
      rows: (plan.exit_ticket as Row[]).map((e, i) => [`Q${i + 1}`, e.question ?? '', e.answer ?? '']),
    });
  }
  if (has(plan.vocabulary)) {
    sections.push({
      heading: 'Key vocabulary',
      kind: 'table',
      compact: true,
      columns: ['Term', 'Meaning'],
      widths: ['50mm', ''],
      rows: (plan.vocabulary as Row[]).map((v) => [v.term ?? '', v.definition ?? '']),
    });
  }
  if (has(plan.british_values)) {
    sections.push({
      heading: 'British values',
      kind: 'table',
      compact: true,
      columns: ['Value', 'How it is embedded', 'Tied to'],
      widths: ['40mm', '', '40mm'],
      rows: (plan.british_values as Row[]).map((bv) => [words(bv.value), bv.how_embedded ?? '', bv.activity_ref ?? '']),
    });
  }
  if (has(plan.stretch_challenge)) {
    sections.push({
      heading: 'Stretch and challenge',
      kind: 'table',
      compact: true,
      columns: ['Challenge', 'Task', 'Level', 'For'],
      widths: ['36mm', '', '22mm', '40mm'],
      rows: (plan.stretch_challenge as Row[]).map((s) => [s.title ?? '', s.task ?? '', words(s.bloom_level), s.target_learner ?? '']),
    });
  }
  if (has(plan.inclusive_practice)) {
    sections.push({
      heading: 'Inclusive practice',
      kind: 'table',
      compact: true,
      columns: ['Need', 'Strategy', 'Tied to'],
      widths: ['40mm', '', '40mm'],
      rows: (plan.inclusive_practice as Row[]).map((ip) => [words(ip.need), ip.strategy ?? '', ip.activity_ref ?? '']),
    });
  }
  if (plan.differentiation) {
    const d = plan.differentiation as Row;
    sections.push({
      heading: 'Differentiation',
      kind: 'kv',
      rows: [
        { label: 'Stretch', value: ((d.stretch ?? []) as string[]).map((x) => `• ${x}`).join('\n') || 'None' },
        { label: 'Support', value: ((d.support ?? []) as string[]).map((x) => `• ${x}`).join('\n') || 'None' },
        ...(has(d.send) ? [{ label: 'SEND strategies', value: (d.send as string[]).map((x) => `• ${x}`).join('\n') }] : []),
        ...(has(d.eal) ? [{ label: 'EAL strategies', value: (d.eal as string[]).map((x) => `• ${x}`).join('\n') }] : []),
      ],
    });
  }
  if (has(plan.health_safety)) {
    sections.push({
      heading: 'Health and safety',
      kind: 'table',
      compact: true,
      columns: ['Risk', 'Control', 'Reg'],
      widths: ['', '', '30mm'],
      rows: (plan.health_safety as Row[]).map((h) => [h.risk ?? '', h.control ?? '', h.reg_ref ?? '']),
    });
  }
  if (plan.homework) {
    sections.push({
      heading: 'Homework',
      intro: `Independent study, ${plan.homework.estimated_mins ?? 0} minutes.`,
      kind: 'text',
      paragraphs: [String(plan.homework.description ?? '')],
    });
  }
  if (facets.length) {
    sections.push({
      heading: `Regulation citations · ${facets.length}`,
      kind: 'table',
      compact: true,
      columns: ['Source', 'Regulation', 'Note'],
      widths: ['34mm', '30mm', ''],
      rows: facets.map((c) => [docName(c.document_type), c.reg_number ?? '', cleanLessonText(c.citation_note ?? '')]),
    });
  }
  if (plan.next_lesson_hint) sections.push({ heading: 'Suggested next lesson', kind: 'text', paragraphs: [String(plan.next_lesson_hint)] });

  const title = (plan.title as string) || (row.title as string) || 'Lesson plan';
  return {
    learnerId: null,
    folder: `lesson_plan/${row.id}`,
    filename: `${fileSafe(title, 60)} - lesson plan`,
    payload: {
      meta: {
        kind: 'Lesson plan',
        series: 'College record',
        title,
        subtitle: plan.audience_note ? `Audience: ${plan.audience_note}` : '',
        reference: `LP-${String(row.id).slice(0, 8).toUpperCase()}`,
        generated: fmtDateTime(generated),
        generated_by: generatedBy(who),
        integrity: 'The plan as saved on the date shown.',
      },
      status: { label: row.status ? words(row.status) : '', tone: 'neutral' },
      org: { name: college?.name ?? '', sub: college?.name ? 'Training provider' : 'Lesson plan', logo: college?.logo_url ?? '' },
      cover_facts: pairFacts<Row>([
        { label: 'Lesson', value: title, big: true, wide: true },
        ...(row.scheduled_date
          ? [{ label: 'Scheduled', value: [fmtDate(row.scheduled_date), row.scheduled_start_time ? String(row.scheduled_start_time).slice(0, 5) : '', row.scheduled_room ?? ''].filter(Boolean).join(' · ') }]
          : []),
        { label: 'Prepared by', value: who.name },
      ]),
      headline: [
        { label: 'Duration', value: String(duration), unit: 'min', note: '' },
        { label: 'Objectives', value: String(objectives.length), unit: '', note: '' },
        { label: 'Activities', value: String(activities.length), unit: '', note: '' },
        { label: 'References', value: String(facets.length), unit: '', note: '' },
      ],
      contents: [],
      alerts: [],
      sections,
      notes: [],
      disclaimer: '',
    },
  };
}
