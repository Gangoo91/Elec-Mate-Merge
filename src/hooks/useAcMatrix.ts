import { useCallback, useEffect, useId, useMemo, useRef, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';

/* ==========================================================================
   useAcMatrix — assembles the per-AC × evidence-type matrix for one
   apprentice, plus the per-AC requirements + sign-off status. Joins:

     qualification_requirements   → the canonical AC list for the qual
     student_ac_coverage          → status + count for that student
     unit_evidence_requirements   → required evidence types per AC
     portfolio_items              → uploaded evidence (criteria_met[] + type)
     college_observations         → assessor first-hand evidence (acs_evidenced[])
     college_otj_entries          → OTJ logs that mention ACs (best-effort)
     tutor_quiz_attempts          → quiz attempts on the qualification

   Output is grouped by unit so the UI can render collapsible sections.

   ELE-942 / [Assessor pack 1] — AC coverage matrix.
   ========================================================================== */

export type AcStatus = 'not_started' | 'in_progress' | 'evidenced' | 'assessed' | 'confirmed';

export type EvidenceTypeCode =
  | 'photo'
  | 'document'
  | 'certificate'
  | 'test_result'
  | 'witness'
  | 'reflection'
  | 'work_log'
  | 'video'
  | 'drawing'
  | 'calculation'
  /* synthesised — not in evidence_types but counted from other sources */
  | 'observation'
  | 'otj'
  | 'quiz';

export interface EvidenceRequirement {
  /** Codes from evidence_types — ordered. */
  required_codes: EvidenceTypeCode[];
  /** Min total quantity across types. Defaults to 1. */
  quantity_required: number;
  /** Tutor-facing guidance (human prose). */
  guidance: string | null;
  /** Sample description for the apprentice. */
  example: string | null;
  /** Mandatory or stretch? Stretch ACs render lighter. */
  is_mandatory: boolean;
}

export interface AcCellRow {
  qualification_code: string;
  unit_code: string;
  unit_title: string;
  lo_number: number;
  lo_text: string;
  ac_code: string;
  ac_text: string;
  status: AcStatus;
  evidence_count: number;
  last_evidence_at: string | null;
  /** Per-evidence-type count map. Sparse — only types with > 0. */
  by_type: Partial<Record<EvidenceTypeCode, number>>;
  /** Pulled from unit_evidence_requirements when available. */
  requirement: EvidenceRequirement | null;
  /** Computed: are required types satisfied? */
  meets_requirement: boolean;
  /** Computed: count of required types that have zero evidence. */
  missing_types: EvidenceTypeCode[];
}

export interface AcMatrixUnit {
  qualification_code: string;
  unit_code: string;
  unit_title: string;
  los: Array<{
    lo_number: number;
    lo_text: string;
    acs: AcCellRow[];
  }>;
  /** Roll-up stats for the unit header. */
  stats: {
    total: number;
    not_started: number;
    in_progress: number;
    evidenced: number;
    assessed: number;
    confirmed: number;
    /** ACs that are mandatory but don't yet meet the evidence requirement. */
    gaps: number;
  };
}

export interface AcMatrix {
  qualification_code: string | null;
  units: AcMatrixUnit[];
  totals: {
    total: number;
    not_started: number;
    in_progress: number;
    evidenced: number;
    assessed: number;
    confirmed: number;
    gaps: number;
    /** Percentage of mandatory ACs that meet their evidence requirement. */
    requirement_pct: number;
  };
}

export function useAcMatrix(studentId: string | null, studentUserId: string | null) {
  const channelId = useId();
  const [data, setData] = useState<AcMatrix | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const load = useCallback(async () => {
    if (!studentId) {
      setData(null);
      setLoading(false);
      return;
    }
    setLoading(true);
    setError(null);
    try {
      // 1) Coverage rows (already seeded by the trigger when course_id was set)
      const { data: coverage, error: cErr } = await supabase
        .from('student_ac_coverage')
        .select('qualification_code, unit_code, ac_code, status, evidence_count, last_evidence_at')
        .eq('student_id', studentId);
      if (cErr) throw cErr;
      const cov = (coverage ?? []) as Array<{
        qualification_code: string;
        unit_code: string;
        ac_code: string;
        status: AcStatus;
        evidence_count: number;
        last_evidence_at: string | null;
      }>;

      const qualCode = cov[0]?.qualification_code ?? null;
      if (!qualCode) {
        setData({
          qualification_code: null,
          units: [],
          totals: {
            total: 0,
            not_started: 0,
            in_progress: 0,
            evidenced: 0,
            assessed: 0,
            confirmed: 0,
            gaps: 0,
            requirement_pct: 0,
          },
        });
        setLoading(false);
        return;
      }

      // 2) Canonical AC list for the qualification — gives us LO/AC text
      // and unit titles. We join against this to render even ACs that have
      // zero coverage rows (fresh enrolments without a trigger fire).
      const { data: reqRows } = await supabase
        .from('qualification_requirements')
        .select('qualification_code, unit_code, unit_title, lo_number, lo_text, ac_code, ac_text')
        .eq('qualification_code', qualCode);
      const reqs = (reqRows ?? []) as Array<{
        qualification_code: string;
        unit_code: string;
        unit_title: string;
        lo_number: number;
        lo_text: string;
        ac_code: string;
        ac_text: string;
      }>;

      // 3) Per-AC evidence rules — keyed properly via `ac_evidence_rules`.
      // Tutors / awarding-body seeds populate this table; absent rows mean
      // "no rule" (graceful — no false gap flags).
      const { data: ruleRows } = await supabase
        .from('ac_evidence_rules')
        .select(
          'qualification_code, unit_code, ac_code, required_codes, quantity_required, is_mandatory, guidance, example_description'
        )
        .eq('qualification_code', qualCode);
      const reqByAc = new Map<string, EvidenceRequirement>();
      for (const r of (ruleRows ?? []) as Array<{
        qualification_code: string;
        unit_code: string;
        ac_code: string;
        required_codes: string[] | null;
        quantity_required: number | null;
        is_mandatory: boolean | null;
        guidance: string | null;
        example_description: string | null;
      }>) {
        reqByAc.set(`${r.unit_code}:${r.ac_code}`, {
          required_codes: (r.required_codes ?? []) as EvidenceTypeCode[],
          quantity_required: r.quantity_required ?? 1,
          guidance: r.guidance,
          example: r.example_description,
          is_mandatory: r.is_mandatory ?? true,
        });
      }

      // 4) Apprentice's portfolio items — tagged with criteria + type
      let portfolio: Array<{
        category: string;
        file_type: string | null;
        assessment_criteria_met: string[] | null;
      }> = [];
      if (studentUserId) {
        const { data: pRows } = await supabase
          .from('portfolio_items')
          .select('category, file_type, assessment_criteria_met')
          .eq('user_id', studentUserId);
        portfolio = (pRows ?? []) as typeof portfolio;
      }

      // 5) Assessor observations — acs_evidenced[] is keyed by college_student_id
      const { data: obsRows } = await supabase
        .from('college_observations')
        .select('acs_evidenced')
        .eq('college_student_id', studentId);
      const observations = (obsRows ?? []) as Array<{ acs_evidenced: string[] | null }>;

      // NB: college_otj_entries only carries `unit_codes`, not specific ACs,
      // so OTJ logs cannot contribute evidence at AC granularity. The OTJ
      // section is surfaced separately on Student 360 and counts toward
      // hours rather than competence per AC.

      // 7) Quiz attempts joined to questions with ac_ref. Best-effort —
      //    if either join 404s we treat the count as zero.
      let quizAcCounts = new Map<string, number>();
      if (studentUserId) {
        try {
          const { data: attempts } = await supabase
            .from('tutor_quiz_attempts')
            .select('quiz_id')
            .eq('student_id', studentUserId)
            .not('completed_at', 'is', null);
          const quizIds = Array.from(
            new Set(((attempts ?? []) as Array<{ quiz_id: string }>).map((a) => a.quiz_id))
          );
          if (quizIds.length > 0) {
            const { data: questions } = await supabase
              .from('tutor_quiz_questions')
              .select('quiz_id, ac_ref')
              .in('quiz_id', quizIds)
              .not('ac_ref', 'is', null);
            for (const q of (questions ?? []) as Array<{ ac_ref: string | null }>) {
              if (!q.ac_ref) continue;
              quizAcCounts.set(q.ac_ref, (quizAcCounts.get(q.ac_ref) ?? 0) + 1);
            }
          }
        } catch {
          quizAcCounts = new Map();
        }
      }

      // ─── Compute per-AC by_type counts ───
      const portfolioTypeCount = new Map<string, Map<EvidenceTypeCode, number>>();
      const fileTypeToEvidenceType = (item: {
        category: string;
        file_type: string | null;
      }): EvidenceTypeCode => {
        // Prefer category if it matches a known evidence_type code
        const cat = (item.category ?? '').toLowerCase();
        const known: EvidenceTypeCode[] = [
          'photo',
          'document',
          'certificate',
          'test_result',
          'witness',
          'reflection',
          'work_log',
          'video',
          'drawing',
          'calculation',
        ];
        if ((known as string[]).includes(cat)) return cat as EvidenceTypeCode;
        // Fallback: infer from MIME
        const ft = (item.file_type ?? '').toLowerCase();
        if (ft.startsWith('image/')) return 'photo';
        if (ft.startsWith('video/')) return 'video';
        if (ft.includes('pdf')) return 'document';
        return 'document';
      };
      for (const p of portfolio) {
        const type = fileTypeToEvidenceType(p);
        for (const ac of p.assessment_criteria_met ?? []) {
          if (!portfolioTypeCount.has(ac)) {
            portfolioTypeCount.set(ac, new Map());
          }
          const m = portfolioTypeCount.get(ac)!;
          m.set(type, (m.get(type) ?? 0) + 1);
        }
      }

      const observationCount = new Map<string, number>();
      for (const o of observations) {
        for (const ac of o.acs_evidenced ?? []) {
          observationCount.set(ac, (observationCount.get(ac) ?? 0) + 1);
        }
      }

      // Build coverage lookup keyed by `${unit_code}:${ac_code}`. ACs that
      // don't have a coverage row default to not_started + 0 evidence.
      const covByKey = new Map<string, (typeof cov)[number]>();
      for (const c of cov) covByKey.set(`${c.unit_code}:${c.ac_code}`, c);

      // ─── Build the cells ───
      const cells: AcCellRow[] = reqs.map((r) => {
        const key = `${r.unit_code}:${r.ac_code}`;
        const c = covByKey.get(key);
        const by_type: Partial<Record<EvidenceTypeCode, number>> = {};
        const portfolioForAc = portfolioTypeCount.get(r.ac_code);
        if (portfolioForAc) {
          portfolioForAc.forEach((v, k) => {
            by_type[k] = (by_type[k] ?? 0) + v;
          });
        }
        const obsCount = observationCount.get(r.ac_code) ?? 0;
        if (obsCount > 0) by_type.observation = obsCount;
        const quiz = quizAcCounts.get(r.ac_code) ?? 0;
        if (quiz > 0) by_type.quiz = quiz;

        const requirement = reqByAc.get(key) ?? null;
        const missing_types: EvidenceTypeCode[] = requirement
          ? requirement.required_codes.filter((code) => !by_type[code])
          : [];
        const meets_requirement = requirement
          ? missing_types.length === 0 &&
            Object.values(by_type).reduce((a, b) => a + b, 0) >= requirement.quantity_required
          : Object.values(by_type).reduce((a, b) => a + b, 0) > 0;

        return {
          qualification_code: r.qualification_code,
          unit_code: r.unit_code,
          unit_title: r.unit_title,
          lo_number: r.lo_number,
          lo_text: r.lo_text,
          ac_code: r.ac_code,
          ac_text: r.ac_text,
          status: c?.status ?? 'not_started',
          evidence_count: c?.evidence_count ?? 0,
          last_evidence_at: c?.last_evidence_at ?? null,
          by_type,
          requirement,
          meets_requirement,
          missing_types,
        };
      });

      // ─── Group by unit + LO ───
      const unitMap = new Map<string, AcMatrixUnit>();
      for (const cell of cells) {
        let unit = unitMap.get(cell.unit_code);
        if (!unit) {
          unit = {
            qualification_code: cell.qualification_code,
            unit_code: cell.unit_code,
            unit_title: cell.unit_title,
            los: [],
            stats: {
              total: 0,
              not_started: 0,
              in_progress: 0,
              evidenced: 0,
              assessed: 0,
              confirmed: 0,
              gaps: 0,
            },
          };
          unitMap.set(cell.unit_code, unit);
        }
        let lo = unit.los.find((l) => l.lo_number === cell.lo_number);
        if (!lo) {
          lo = { lo_number: cell.lo_number, lo_text: cell.lo_text, acs: [] };
          unit.los.push(lo);
        }
        lo.acs.push(cell);
        unit.stats.total += 1;
        unit.stats[cell.status] += 1;
        if (cell.requirement?.is_mandatory && !cell.meets_requirement) {
          unit.stats.gaps += 1;
        }
      }

      // Sort: LOs by lo_number, ACs by ac_code (lexicographic), units by code
      const units = Array.from(unitMap.values())
        .sort((a, b) => a.unit_code.localeCompare(b.unit_code))
        .map((u) => ({
          ...u,
          los: u.los
            .sort((a, b) => a.lo_number - b.lo_number)
            .map((lo) => ({
              ...lo,
              acs: lo.acs.sort((a, b) =>
                a.ac_code.localeCompare(b.ac_code, 'en-GB', { numeric: true })
              ),
            })),
        }));

      const totals = units.reduce(
        (acc, u) => ({
          total: acc.total + u.stats.total,
          not_started: acc.not_started + u.stats.not_started,
          in_progress: acc.in_progress + u.stats.in_progress,
          evidenced: acc.evidenced + u.stats.evidenced,
          assessed: acc.assessed + u.stats.assessed,
          confirmed: acc.confirmed + u.stats.confirmed,
          gaps: acc.gaps + u.stats.gaps,
          requirement_pct: 0,
        }),
        {
          total: 0,
          not_started: 0,
          in_progress: 0,
          evidenced: 0,
          assessed: 0,
          confirmed: 0,
          gaps: 0,
          requirement_pct: 0,
        }
      );
      const mandatoryCells = cells.filter((c) => c.requirement?.is_mandatory ?? false);
      const mandatoryMet = mandatoryCells.filter((c) => c.meets_requirement).length;
      totals.requirement_pct = mandatoryCells.length
        ? Math.round((mandatoryMet / mandatoryCells.length) * 100)
        : 0;

      setData({ qualification_code: qualCode, units, totals });
    } catch (e) {
      setError((e as Error).message ?? 'Could not load coverage matrix');
      setData(null);
    } finally {
      setLoading(false);
    }
  }, [studentId, studentUserId]);

  useEffect(() => {
    void load();
  }, [load]);

  // Realtime — bump when any source changes. Trailing-debounced so
  // a bulk sign-off of 30 ACs doesn't fire 30 full-matrix reloads in
  // quick succession (each touches student_ac_coverage + ac_signoffs,
  // so 30 ACs = up to 60 events). Channel name is namespaced with
  // useId() so multiple consumers don't collide on the same topic.
  const reloadTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  useEffect(() => {
    if (!studentId) return;
    const scheduleReload = () => {
      if (reloadTimerRef.current) clearTimeout(reloadTimerRef.current);
      reloadTimerRef.current = setTimeout(() => {
        reloadTimerRef.current = null;
        void load();
      }, 350);
    };
    const ch = supabase
      .channel(`ac_matrix:${studentId}:${channelId}`)
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'student_ac_coverage' },
        scheduleReload
      )
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'college_observations' },
        scheduleReload
      )
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'portfolio_items' },
        scheduleReload
      )
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'ac_signoffs' },
        scheduleReload
      )
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'ac_evidence_rules' },
        scheduleReload
      )
      .subscribe();
    return () => {
      if (reloadTimerRef.current) {
        clearTimeout(reloadTimerRef.current);
        reloadTimerRef.current = null;
      }
      supabase.removeChannel(ch);
    };
  }, [studentId, load, channelId]);

  const evidenceTypes: EvidenceTypeCode[] = useMemo(
    () => [
      'observation',
      'photo',
      'video',
      'witness',
      'document',
      'test_result',
      'work_log',
      'reflection',
      'quiz',
    ],
    []
  );

  return { data, loading, error, refresh: load, evidenceTypes };
}
