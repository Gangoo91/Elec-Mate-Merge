import { supabase } from '@/integrations/supabase/client';
import { printHtmlDocument } from '@/utils/printHtmlDocument';
import { buildPortfolioHtml } from './portfolioEvidenceHtml';

/* ==========================================================================
   Portfolio evidence pack export — an audit-ready record of an apprentice's
   portfolio: cover, summary, each evidence item (write-up + photos + the
   assessment criteria it meets, WITH their full text + supervisor sign-off),
   and an assessor justification summary. Assessment-criteria codes are
   resolved to their criterion text from qualification_requirements.
   Rendered through the shared browser print engine.
   ========================================================================== */

const LOGO_URL = '/images/elec-mate-logo-512.png';

// Matches a stored AC string like "399 AC 3.1" or "ELTP06 (Unit 317) AC 2.2".
const AC_RE = /(\d{3})\D*?AC\s*([0-9]+(?:\.[0-9]+)*)/i;

export interface PortfolioPackPhoto {
  url: string;
  name: string;
}

export interface PortfolioCriterion {
  /** Friendly label, e.g. "Unit 399 · AC 3.1" (empty for free-text criteria). */
  code: string;
  /** The criterion wording, resolved from the framework or stored inline. */
  text: string | null;
}

export interface PortfolioPackItem {
  title: string;
  date: string | null;
  category: string;
  /** VACSR evidence type label (Observation / Witness / Reflective / Work product…). */
  evidenceType: string;
  status: string;
  grade: string | null;
  /** The apprentice's write-up of what they did (portfolio_items.description). */
  writeUp: string | null;
  reflection: string | null;
  skills: string[];
  criteria: PortfolioCriterion[];
  outcomes: PortfolioCriterion[];
  photos: PortfolioPackPhoto[];
  verified: boolean;
  supervisorFeedback: string | null;
  timeSpentMins: number;
  /** What the apprentice personally did (individual contribution). */
  role: string | null;
  /** Workplace witness / supervisor who saw the work carried out. */
  witness: { name?: string; role?: string; date?: string } | null;
}

export type AcState =
  | 'iqa_confirmed'
  | 'signed_off'
  | 'evidenced'
  | 'referred'
  | 'not_yet'
  | 'in_progress'
  | 'not_started';

export interface CoverageUnit {
  unitCode: string;
  unitTitle: string;
  total: number;
  done: number; // evidenced or better
  acs: Array<{ code: string; state: AcState }>;
}

export interface PortfolioCoverage {
  qualificationName: string | null;
  qualificationCode: string | null;
  totalACs: number;
  evidencedACs: number; // evidenced + signed_off + iqa_confirmed
  counts: { iqaConfirmed: number; signedOff: number; evidenced: number; referred: number; open: number };
  units: CoverageUnit[];
  assessors: string[];
  iqas: string[];
}

export interface PortfolioPackData {
  learner: {
    name: string;
    standard: string | null;
    level: string | null;
    uln: string | null;
    provider: string | null;
    employer: string | null;
    startDate: string | null;
    endDate: string | null;
    /** Apprentice's holistic "breadth of my work" statement (cover narrative). */
    statement: string | null;
  };
  summary: {
    totalItems: number;
    verifiedItems: number;
    criteriaEvidenced: number;
    hoursEvidenced: number;
  };
  coverage: PortfolioCoverage | null;
  items: PortfolioPackItem[];
}

async function loadImageDataUrl(url: string): Promise<string | null> {
  try {
    const res = await fetch(url);
    if (!res.ok) return null;
    const blob = await res.blob();
    return await new Promise((resolve) => {
      const r = new FileReader();
      r.onloadend = () => resolve(typeof r.result === 'string' ? r.result : null);
      r.onerror = () => resolve(null);
      r.readAsDataURL(blob);
    });
  } catch {
    return null;
  }
}

const isImage = (type?: string, url?: string) =>
  /^image\//i.test(type ?? '') || /\.(png|jpe?g|webp|gif|heic)(\?|$)/i.test(url ?? '');

function parseAc(s: string): { unit: string | null; ac: string | null; inline: string | null } {
  const colon = s.indexOf(':');
  const inline = colon >= 0 ? s.slice(colon + 1).trim() : null;
  const head = colon >= 0 ? s.slice(0, colon) : s;
  const m = head.match(AC_RE);
  return { unit: m?.[1] ?? null, ac: m?.[2] ?? null, inline };
}

const looksLikeAc = (s: string) => AC_RE.test(s) || /\bAC\s*[0-9]/i.test(s);

// Best-effort VACSR evidence-type label from the item's category + signals.
function deriveEvidenceType(category: string, hasPhotos: boolean, hasWriteUp: boolean): string {
  const c = (category || '').toLowerCase();
  if (/observ/.test(c)) return 'Observation';
  if (/witness|testimon/.test(c)) return 'Witness testimony';
  if (/discussion|interview|q&a|prof/.test(c)) return 'Professional discussion';
  if (/diary|log|timesheet/.test(c)) return 'Work log';
  if (/reflect/.test(c)) return 'Reflective account';
  if (hasPhotos) return 'Work product';
  if (hasWriteUp) return 'Reflective account';
  return 'Evidence';
}

// Map a captured evidence-type code to its display label.
const EVIDENCE_TYPE_LABEL_PDF: Record<string, string> = {
  observation: 'Observation',
  'work-product': 'Work product',
  'witness-testimony': 'Witness testimony',
  'professional-discussion': 'Professional discussion',
  photo: 'Photo',
  'reflective-account': 'Reflective account',
}

type CovRow = { status: string; evidence_count: number };
type SigRow = {
  assessor_verdict: string | null;
  assessor_name_snapshot: string | null;
  iqa_verdict: string | null;
  iqa_name_snapshot: string | null;
};

// Mirrors useACSignoffs.deriveState, with the portfolio items' own coverage as
// an "evidenced" fallback when the auto-seeded coverage row is absent.
function deriveAcState(cov: CovRow | undefined, sig: SigRow | undefined, evidenced: boolean): AcState {
  if (sig?.iqa_verdict === 'confirmed') return 'iqa_confirmed';
  if (sig?.assessor_verdict === 'referred') return 'referred';
  if (sig?.assessor_verdict === 'not_yet') return 'not_yet';
  if (sig?.assessor_verdict === 'passed') return 'signed_off';
  if (cov?.status === 'confirmed') return 'iqa_confirmed';
  if (cov?.status === 'evidenced' || cov?.status === 'assessed') return 'evidenced';
  if ((cov?.evidence_count ?? 0) > 0 || evidenced) return 'evidenced';
  if (cov?.status === 'in_progress') return 'in_progress';
  return 'not_started';
}

/** Full coverage map across the learner's qualification framework. */

/**
 * 🔴 Which qualification is this pack scored against?
 *
 * The export used to read `user_qualification_selections` — the learner's OWN
 * choice. Everywhere else in the app, `useStudentQualification` treats the
 * COLLEGE's enrolment as authoritative and falls back to the selection only
 * when there is no college. The two disagree for real learners: one is being
 * marked against 5357 in the app while their own selection still says 2357,
 * so the pack an assessor received was scored against a different course from
 * the one the app showed them — and reported coverage the college would not
 * recognise.
 *
 * Same precedence as the app, including the requirement-code mapping for
 * qualifications that carry no direct rows.
 */
async function resolveQualification(
  userId: string
): Promise<{ code: string; title: string | null } | null> {
  const [{ data: sel }, { data: cs }] = await Promise.all([
    supabase
      .from('user_qualification_selections')
      .select('qualification:qualifications(code, title)')
      .eq('user_id', userId)
      .eq('is_active', true)
      .maybeSingle(),
    supabase.from('college_students').select('course_id').eq('user_id', userId).maybeSingle(),
  ]);

  const selQual = (sel?.qualification ?? null) as { code: string; title: string } | null;

  let code: string | null = null;
  let title: string | null = selQual?.title ?? null;

  const courseId = (cs as { course_id?: string | null } | null)?.course_id ?? null;
  if (courseId) {
    const { data: course } = await supabase
      .from('college_courses')
      .select('code, name')
      .eq('id', courseId)
      .maybeSingle();
    const c = course as { code?: string | null; name?: string | null } | null;
    if (c?.code) {
      code = c.code;
      title = c.name ?? title;
    }
  }
  if (!code) code = selQual?.code ?? null;
  if (!code) return null;

  // Some codes carry no requirement rows and map to a shared canonical code.
  const { data: mapping } = await supabase
    .from('qualification_requirement_mappings')
    .select('requirement_code')
    .eq('qualification_code', code)
    .eq('is_primary', true)
    .maybeSingle();

  return { code: (mapping?.requirement_code as string | null) ?? code, title };
}

async function buildCoverage(userId: string, rawCriteria: string[]): Promise<PortfolioCoverage | null> {
  try {
    const qual = await resolveQualification(userId);
    if (!qual?.code) return null;

    const { data: reqs } = await supabase
      .from('qualification_requirements')
      .select('unit_code, unit_title, ac_code')
      .eq('qualification_code', qual.code)
      .order('unit_code', { ascending: true })
      .order('ac_code', { ascending: true });
    const reqRows = (reqs ?? []) as Array<{ unit_code: string; unit_title: string; ac_code: string }>;
    if (!reqRows.length) return null;

    /*
     * 🔴 Covered criteria used to be keyed off a regex that required a
     * THREE-DIGIT unit code: /(\d{3})\D*?AC\s*([0-9.]+)/.
     *
     * Six of 5357's fifteen units are "101/001", "103/003", "105/505" and
     * friends, and every unit in 601/7345/2 looks like "NETK3-01" — so the
     * regex either grabbed the wrong fragment ("001" out of "101/001") or
     * matched nothing. The key never equalled the real unit_code, so the
     * pack an assessor reads reported those criteria as UNCOVERED however
     * much evidence the learner had attached. Four active learners sit on
     * affected qualifications.
     *
     * Match against the unit codes the qualification actually has, longest
     * first so "101/001" wins over a bare "101".
     */
    const unitCodes = [...new Set(reqRows.map((r) => r.unit_code))].sort(
      (a, b) => b.length - a.length
    );
    const coveredKeys = new Set<string>();
    for (const s of rawCriteria) {
      const head = s.indexOf(':') >= 0 ? s.slice(0, s.indexOf(':')) : s;
      const acMatch = head.match(/\bAC\s*([0-9]+(?:\.[0-9]+)*)/i);
      const ac = acMatch?.[1] ?? parseAc(s).ac;
      if (!ac) continue;
      const unit = unitCodes.find((u) => head.includes(u));
      if (unit) coveredKeys.add(`${unit}:${ac}`);
    }

    const { data: cs } = await supabase.from('college_students').select('id').eq('user_id', userId).maybeSingle();
    const studentId = (cs as { id: string } | null)?.id ?? null;

    const covMap = new Map<string, CovRow>();
    const sigMap = new Map<string, SigRow>();
    const assessors = new Set<string>();
    const iqas = new Set<string>();
    if (studentId) {
      const [{ data: cov }, { data: so }] = await Promise.all([
        supabase
          .from('student_ac_coverage')
          .select('unit_code, ac_code, status, evidence_count')
          .eq('student_id', studentId)
          .eq('qualification_code', qual.code),
        supabase
          .from('ac_signoffs')
          .select('unit_code, ac_code, assessor_verdict, assessor_name_snapshot, iqa_verdict, iqa_name_snapshot')
          .eq('student_id', studentId)
          .eq('qualification_code', qual.code),
      ]);
      for (const r of (cov ?? []) as Array<CovRow & { unit_code: string; ac_code: string }>) {
        covMap.set(`${r.unit_code}:${r.ac_code}`, { status: r.status, evidence_count: r.evidence_count });
      }
      for (const r of (so ?? []) as Array<SigRow & { unit_code: string; ac_code: string }>) {
        sigMap.set(`${r.unit_code}:${r.ac_code}`, r);
        if (r.assessor_name_snapshot) assessors.add(r.assessor_name_snapshot);
        if (r.iqa_name_snapshot) iqas.add(r.iqa_name_snapshot);
      }
    }

    const unitMap = new Map<string, CoverageUnit>();
    const counts = { iqaConfirmed: 0, signedOff: 0, evidenced: 0, referred: 0, open: 0 };
    for (const r of reqRows) {
      if (!unitMap.has(r.unit_code))
        unitMap.set(r.unit_code, { unitCode: r.unit_code, unitTitle: r.unit_title, total: 0, done: 0, acs: [] });
      const unit = unitMap.get(r.unit_code)!;
      const key = `${r.unit_code}:${r.ac_code}`;
      const state = deriveAcState(covMap.get(key), sigMap.get(key), coveredKeys.has(key));
      unit.acs.push({ code: r.ac_code, state });
      unit.total++;
      if (state === 'iqa_confirmed') {
        counts.iqaConfirmed++;
        unit.done++;
      } else if (state === 'signed_off') {
        counts.signedOff++;
        unit.done++;
      } else if (state === 'evidenced') {
        counts.evidenced++;
        unit.done++;
      } else if (state === 'referred') {
        counts.referred++;
      } else {
        counts.open++;
      }
    }
    const units = [...unitMap.values()];
    return {
      qualificationName: qual.title ?? null,
      qualificationCode: qual.code,
      totalACs: reqRows.length,
      evidencedACs: counts.iqaConfirmed + counts.signedOff + counts.evidenced,
      counts,
      units,
      assessors: [...assessors],
      iqas: [...iqas],
    };
  } catch {
    return null;
  }
}

/** Build the pack from the apprentice's live data. Self-contained — no RPC. */
export async function buildPortfolioPackData(userId: string): Promise<PortfolioPackData> {
  type Row = {
    title: string | null;
    description: string | null;
    category: string | null;
    skills_demonstrated: string[] | null;
    learning_outcomes_met: string[] | null;
    assessment_criteria_met: string[] | null;
    reflection_notes: string | null;
    supervisor_feedback: string | null;
    is_supervisor_verified: boolean | null;
    grade: string | null;
    status: string | null;
    time_spent: number | null;
    storage_urls: Array<{ url?: string; name?: string; type?: string }> | null;
    file_url: string | null;
    file_type: string | null;
    date_completed: string | null;
    created_at: string;
    metadata: {
      workDate?: string;
      siteRef?: string;
      role?: string;
      evidenceType?: string;
      witness?: { name?: string; role?: string; date?: string };
      authenticityConfirmed?: boolean;
    } | null;
  };

  const { data: rows } = await supabase
    .from('portfolio_items')
    .select(
      'title, description, category, skills_demonstrated, learning_outcomes_met, assessment_criteria_met, reflection_notes, supervisor_feedback, is_supervisor_verified, grade, status, time_spent, storage_urls, file_url, file_type, date_completed, created_at, metadata'
    )
    .eq('user_id', userId)
    .order('created_at', { ascending: false });
  const raw = (rows ?? []) as Row[];

  // ── Resolve assessment-criteria text from the framework ──────────────────
  const units = new Set<string>();
  for (const r of raw) {
    for (const s of r.assessment_criteria_met ?? []) {
      const p = parseAc(s);
      if (p.unit) units.add(p.unit);
    }
  }
  /*
   * ⚠️ This lookup had NO qualification filter — it matched on unit_code
   * alone. Unit "301" exists in 2365-03, 2366-03 and 8202; "201" in 2365-02
   * and 2365-03. So the criterion TEXT printed next to a learner's evidence,
   * in the pack an assessor reads, could be lifted from a qualification they
   * are not on — whichever row PostgREST returned first.
   *
   * Scope it to the learner's actual qualification. If we can't resolve one,
   * fall back to the old behaviour rather than dropping the text entirely:
   * an unscoped guess is still better than a blank criterion.
   */
  const packQual = await resolveQualification(userId);
  const acMap = new Map<string, string>();
  if (units.size) {
    try {
      let q = supabase
        .from('qualification_requirements')
        .select('unit_code, ac_code, ac_text')
        .in('unit_code', [...units]);
      if (packQual?.code) q = q.eq('qualification_code', packQual.code);
      const { data: reqs } = await q;
      for (const r of (reqs ?? []) as Array<{ unit_code: string; ac_code: string; ac_text: string }>) {
        const key = `${r.unit_code}|${r.ac_code}`;
        if (!acMap.has(key)) acMap.set(key, r.ac_text);
      }
    } catch {
      /* framework lookup is best-effort */
    }
  }
  const toCriterion = (s: string): PortfolioCriterion => {
    const p = parseAc(s);
    if (p.unit && p.ac) {
      return { code: `Unit ${p.unit} · AC ${p.ac}`, text: p.inline ?? acMap.get(`${p.unit}|${p.ac}`) ?? null };
    }
    return { code: '', text: p.inline ?? s };
  };
  const toOutcome = (s: string): PortfolioCriterion => {
    const colon = s.indexOf(':');
    return colon >= 0
      ? { code: s.slice(0, colon).trim(), text: s.slice(colon + 1).trim() }
      : { code: '', text: s };
  };

  const items: PortfolioPackItem[] = raw.map((row) => {
    const photos: PortfolioPackPhoto[] = [];
    if (row.file_url && isImage(row.file_type ?? undefined, row.file_url)) {
      photos.push({ url: row.file_url, name: row.title ?? 'Evidence' });
    }
    for (const f of row.storage_urls ?? []) {
      if (f?.url && isImage(f.type, f.url)) photos.push({ url: f.url, name: f.name ?? '' });
    }
    const criteria = (row.assessment_criteria_met ?? []).map(toCriterion);
    const outcomes = (row.learning_outcomes_met ?? []).map(toOutcome);
    // skills_demonstrated is sometimes (mis)used to store AC codes — keep only
    // real skill words so we don't duplicate the criteria list.
    const skills = (row.skills_demonstrated ?? []).filter((s) => s && !looksLikeAc(s) && s.length <= 48);
    const meta = row.metadata ?? {};
    const evidenceType = meta.evidenceType
      ? EVIDENCE_TYPE_LABEL_PDF[meta.evidenceType] ??
        deriveEvidenceType(row.category ?? '', photos.length > 0, !!row.description?.trim())
      : deriveEvidenceType(row.category ?? '', photos.length > 0, !!row.description?.trim());
    const w = meta.witness;
    const witness = w && (w.name || w.role || w.date) ? w : null;
    return {
      title: row.title ?? 'Untitled evidence',
      // Prefer the captured date of work (currency) over the record's timestamps.
      date: meta.workDate ?? row.date_completed ?? row.created_at,
      category: row.category ?? '',
      evidenceType,
      status: row.status ?? 'draft',
      grade: row.grade,
      writeUp: row.description?.trim() || null,
      reflection: row.reflection_notes?.trim() || null,
      skills,
      criteria,
      outcomes,
      photos,
      verified: !!row.is_supervisor_verified,
      supervisorFeedback: row.supervisor_feedback?.trim() || null,
      timeSpentMins: row.time_spent ?? 0,
      role: meta.role?.trim() || null,
      witness,
    };
  });

  // ── Learner identity — best-effort, resilient to RLS / missing rows ──────
  let name = 'Apprentice';
  let standard: string | null = null;
  let level: string | null = null;
  let provider: string | null = null;
  let uln: string | null = null;
  let employer: string | null = null;
  let startDate: string | null = null;
  let endDate: string | null = null;
  let statement: string | null = null;
  try {
    const [{ data: prof }, { data: cs }] = await Promise.all([
      supabase
        .from('profiles')
        .select(
          'full_name, apprentice_course, apprentice_level, apprentice_college, portfolio_statement'
        )
        .eq('id', userId)
        .maybeSingle(),
      supabase
        .from('college_students')
        .select('uln, employer_id, start_date, expected_end_date')
        .eq('user_id', userId)
        .maybeSingle(),
    ]);
    if (prof?.full_name) name = prof.full_name as string;
    standard = (prof?.apprentice_course as string | null) ?? null;
    level = prof?.apprentice_level ? `Level ${prof.apprentice_level}` : null;
    provider = (prof?.apprentice_college as string | null) ?? null;
    statement = (prof?.portfolio_statement as string | null) ?? null;
    uln = (cs?.uln as string | null) ?? null;
    startDate = (cs?.start_date as string | null) ?? null;
    endDate = (cs?.expected_end_date as string | null) ?? null;
    if (cs?.employer_id) {
      /*
       * ⚠️ This queried `employers`, which is not a table in this database —
       * so the employer line on the evidence pack an assessor reads was
       * always blank, and silently: PostgREST returns an error object rather
       * than throwing, so `emp` was simply null and the catch never fired.
       * `college_students.employer_id` points at `college_employers`, whose
       * name column is `company_name`.
       */
      const { data: emp } = await supabase
        .from('college_employers')
        .select('company_name')
        .eq('id', cs.employer_id)
        .maybeSingle();
      employer = (emp?.company_name as string | null) ?? null;
    }
  } catch {
    /* fall back to defaults */
  }

  const critSet = new Set<string>();
  /*
   * Raw criterion strings, matched against the qualification's real unit
   * codes inside buildCoverage. See the note there — a regex cannot know
   * that "101/001" and "NETK3-01" are unit codes.
   */
  const rawCriteria: string[] = [];
  for (const r of raw) {
    for (const s of r.assessment_criteria_met ?? []) rawCriteria.push(s);
  }
  for (const it of items) for (const c of it.criteria) if (c.code) critSet.add(c.code);
  const hoursEvidenced =
    Math.round((items.reduce((a, it) => a + it.timeSpentMins, 0) / 60) * 10) / 10;

  const coverage = await buildCoverage(userId, rawCriteria);

  return {
    learner: { name, standard, level, uln, provider, employer, startDate, endDate, statement },
    summary: {
      totalItems: items.length,
      verifiedItems: items.filter((i) => i.verified).length,
      criteriaEvidenced: critSet.size,
      hoursEvidenced,
    },
    coverage,
    items,
  };
}

export async function exportPortfolioEvidencePack(data: PortfolioPackData): Promise<void> {
  const logo = (await loadImageDataUrl(LOGO_URL)) ?? '';
  const generated = new Date().toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });
  const html = buildPortfolioHtml(data, logo, generated);
  await printHtmlDocument(html);
}
