import { useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { ChevronRight } from 'lucide-react';
import { FormSheet } from '@/components/forms/FormSheet';
import { supabase } from '@/integrations/supabase/client';
import type { SchemeOfWorkRow } from '@/hooks/college/useSchemesOfWork';
import {
  StatusChip,
  TEACH_BTN,
  TEACH_BTN_PRIMARY,
  TEACH_LIST,
  TEACH_ROW,
  TeachingEmpty,
  plural,
  type Tone,
} from '@/components/college/teaching/TeachingKit';

/* ==========================================================================
   Schemes of work, linked to the lessons that deliver them (8 Oct 2026).

   A scheme row is a cohort + a qualification + a date range; there is no
   table of planned weeks. Rather than claim a weekly plan that does not
   exist, the link to lessons is worked out from what is real:

     lessons   the cohort's lesson plans dated inside the scheme's dates
               (and its undated plans, listed separately)
     coverage  the qualification's criteria (qualification_requirements)
               against the criteria those lessons map to
               (lesson_plan_ac_mapping), unit by unit

   useSchemeCoverage feeds both the cards on the list and SchemeOfWorkSheet.
   ========================================================================== */

export interface SchemeLesson {
  id: string;
  title: string;
  cohort_id: string | null;
  scheduled_date: string | null;
  status: string | null;
}

export interface UnitCoverage {
  unit_code: string;
  unit_title: string | null;
  total: number;
  covered: number;
}

export interface SchemeCoverage {
  lessons: SchemeLesson[];
  undated: SchemeLesson[];
  units: UnitCoverage[];
  totalCriteria: number;
  coveredCriteria: number;
}

const inRange = (d: string | null, start: string | null, end: string | null) => {
  if (!d) return false;
  if (start && d < start) return false;
  if (end && d > end) return false;
  return true;
};

/** Lessons and criteria coverage for every scheme on the page, in three reads. */
export function useSchemeCoverage(schemes: SchemeOfWorkRow[]) {
  const cohortIds = useMemo(
    () => Array.from(new Set(schemes.map((s) => s.cohort_id).filter(Boolean))).sort(),
    [schemes]
  );
  const codes = useMemo(
    () => Array.from(new Set(schemes.map((s) => s.qualification_code).filter(Boolean))).sort(),
    [schemes]
  );

  const q = useQuery({
    queryKey: ['scheme-coverage', cohortIds, codes],
    enabled: cohortIds.length > 0,
    queryFn: async () => {
      const [plansRes, reqRes] = await Promise.all([
        supabase
          .from('college_lesson_plans')
          .select('id, title, cohort_id, scheduled_date, status')
          .in('cohort_id', cohortIds)
          .order('scheduled_date', { ascending: true }),
        codes.length
          ? supabase
              .from('qualification_requirements')
              .select('qualification_code, unit_code, unit_title, ac_code')
              .in('qualification_code', codes)
              .not('ac_code', 'is', null)
          : Promise.resolve({ data: [], error: null }),
      ]);
      if (plansRes.error) throw plansRes.error;
      const plans = (plansRes.data ?? []) as SchemeLesson[];
      const ids = plans.map((p) => p.id);
      const { data: maps } = ids.length
        ? await supabase
            .from('lesson_plan_ac_mapping')
            .select('lesson_plan_id, qualification_code, unit_code, ac_code')
            .in('lesson_plan_id', ids)
        : { data: [] };
      return {
        plans,
        reqs: (reqRes.data ?? []) as Array<{
          qualification_code: string;
          unit_code: string;
          unit_title: string | null;
          ac_code: string;
        }>,
        maps: (maps ?? []) as Array<{
          lesson_plan_id: string;
          qualification_code: string;
          unit_code: string;
          ac_code: string;
        }>,
      };
    },
  });

  const byScheme = useMemo(() => {
    const out = new Map<string, SchemeCoverage>();
    if (!q.data) return out;
    for (const s of schemes) {
      const cohortPlans = q.data.plans.filter((p) => p.cohort_id === s.cohort_id);
      const lessons = cohortPlans.filter((p) =>
        inRange(p.scheduled_date, s.start_date, s.end_date)
      );
      const undated = cohortPlans.filter((p) => !p.scheduled_date);
      const lessonIds = new Set([...lessons, ...undated].map((l) => l.id));
      const covered = new Set(
        q.data.maps
          .filter(
            (m) => lessonIds.has(m.lesson_plan_id) && m.qualification_code === s.qualification_code
          )
          .map((m) => `${m.unit_code}|${m.ac_code}`)
      );
      const unitMap = new Map<string, UnitCoverage>();
      const seen = new Set<string>();
      for (const r of q.data.reqs) {
        if (r.qualification_code !== s.qualification_code) continue;
        const key = `${r.unit_code}|${r.ac_code}`;
        if (seen.has(key)) continue;
        seen.add(key);
        const u = unitMap.get(r.unit_code) ?? {
          unit_code: r.unit_code,
          unit_title: r.unit_title,
          total: 0,
          covered: 0,
        };
        u.total++;
        if (covered.has(key)) u.covered++;
        unitMap.set(r.unit_code, u);
      }
      const units = Array.from(unitMap.values()).sort((a, b) =>
        a.unit_code.localeCompare(b.unit_code, undefined, { numeric: true })
      );
      out.set(s.id, {
        lessons,
        undated,
        units,
        totalCriteria: units.reduce((n, u) => n + u.total, 0),
        coveredCriteria: units.reduce((n, u) => n + u.covered, 0),
      });
    }
    return out;
  }, [q.data, schemes]);

  return { byScheme, loading: q.isLoading && cohortIds.length > 0 };
}

const LESSON_STATUS: Record<string, { label: string; tone: Tone }> = {
  draft: { label: 'Draft', tone: 'action' },
  ready: { label: 'Ready', tone: 'done' },
  delivered: { label: 'Delivered', tone: 'done' },
};

function fmtDay(iso: string) {
  return new Date(iso).toLocaleDateString('en-GB', {
    weekday: 'short',
    day: 'numeric',
    month: 'short',
  });
}

/** Week number of `iso` within a scheme starting on `start` (1-based). */
function weekOf(iso: string, start: string | null) {
  if (!start) return null;
  const days = Math.floor((new Date(iso).getTime() - new Date(start).getTime()) / 86_400_000);
  return days < 0 ? null : Math.floor(days / 7) + 1;
}

export function SchemeOfWorkSheet({
  scheme,
  coverage,
  onOpenChange,
  onEdit,
  onPlanLesson,
}: {
  scheme: SchemeOfWorkRow | null;
  coverage: SchemeCoverage | undefined;
  onOpenChange: (open: boolean) => void;
  onEdit: (s: SchemeOfWorkRow) => void;
  onPlanLesson: (cohortId: string) => void;
}) {
  const navigate = useNavigate();
  if (!scheme) return null;
  const c = coverage;
  const gaps = c ? c.units.filter((u) => u.covered < u.total) : [];

  const lessonRow = (l: SchemeLesson) => {
    const st = l.status ? LESSON_STATUS[l.status] : undefined;
    const wk = l.scheduled_date ? weekOf(l.scheduled_date, scheme.start_date) : null;
    return (
      <li key={l.id}>
        <button
          type="button"
          onClick={() => navigate(`/college/lessons/${l.id}`)}
          className={TEACH_ROW}
        >
          <span className="w-16 shrink-0 text-[12px] font-semibold text-white">
            {wk ? `Week ${wk}` : 'No date'}
          </span>
          <span className="min-w-0 flex-1">
            <span className="block truncate text-[14px] font-semibold text-white">{l.title}</span>
            <span className="mt-0.5 block text-[12px] text-white">
              {l.scheduled_date ? fmtDay(l.scheduled_date) : 'Not in the timetable'}
            </span>
          </span>
          {st && <StatusChip tone={st.tone}>{st.label}</StatusChip>}
          <ChevronRight className="h-4 w-4 shrink-0 text-white" aria-hidden />
        </button>
      </li>
    );
  };

  return (
    <FormSheet
      open={!!scheme}
      onOpenChange={onOpenChange}
      width="wide"
      eyebrow="Scheme of work"
      title={scheme.title}
      description={
        [scheme.qualification_title || scheme.qualification_code, scheme.cohort_name]
          .filter(Boolean)
          .join(' · ') || undefined
      }
      bodyClassName="grid grid-cols-1 items-start gap-x-10 gap-y-6 lg:grid-cols-[minmax(0,7fr)_minmax(0,5fr)]"
      footer={
        <div className="flex w-full flex-col-reverse gap-2 sm:flex-row sm:justify-end">
          <button type="button" className={TEACH_BTN} onClick={() => onEdit(scheme)}>
            Edit details
          </button>
          <button
            type="button"
            className={TEACH_BTN_PRIMARY}
            onClick={() => onPlanLesson(scheme.cohort_id)}
          >
            Plan a lesson for this cohort
          </button>
        </div>
      }
    >
      <section className="min-w-0 space-y-3">
        <h3 className="text-[15px] font-semibold text-white">Lessons in its dates</h3>
        <p className="text-[13px] leading-relaxed text-white">
          {!c
            ? 'Loading the lessons…'
            : !scheme.start_date || !scheme.end_date
              ? 'This scheme has no start and end dates, so no lessons can be placed in it. Add the dates in Edit details.'
              : c.lessons.length === 0
                ? `No lesson plan for ${scheme.cohort_name ?? 'this cohort'} is dated between ${fmtDay(scheme.start_date)} and ${fmtDay(scheme.end_date)} yet.`
                : `${plural(c.lessons.length, 'lesson plan')} for ${scheme.cohort_name ?? 'this cohort'} dated inside the scheme, by week.`}
        </p>
        {c && c.lessons.length > 0 && <ul className={TEACH_LIST}>{c.lessons.map(lessonRow)}</ul>}
        {c && c.undated.length > 0 && (
          <>
            <h4 className="pt-2 text-[13.5px] font-semibold text-white">
              Not dated yet · {c.undated.length}
            </h4>
            <ul className={TEACH_LIST}>{c.undated.map(lessonRow)}</ul>
          </>
        )}
      </section>

      <section className="min-w-0 space-y-3">
        <h3 className="text-[15px] font-semibold text-white">Criteria covered</h3>
        {!c ? null : c.totalCriteria === 0 ? (
          <TeachingEmpty
            title="No criteria in the catalogue"
            body={`The catalogue has no assessment criteria loaded for ${scheme.qualification_code}, so coverage cannot be worked out.`}
          />
        ) : (
          <>
            <p className="text-[13px] leading-relaxed text-white">
              The cohort&apos;s lessons map to{' '}
              <span className="font-semibold">
                {c.coveredCriteria} of {c.totalCriteria}
              </span>{' '}
              criteria.{' '}
              {gaps.length > 0
                ? `${plural(gaps.length, 'unit')} still ${gaps.length === 1 ? 'has' : 'have'} criteria no lesson covers.`
                : 'Every criterion is covered by a lesson.'}
            </p>
            <ul className={TEACH_LIST}>
              {c.units.map((u) => (
                <li
                  key={u.unit_code}
                  className="flex min-h-[52px] items-center gap-3 px-4 py-2.5 sm:px-5"
                >
                  <span className="min-w-0 flex-1">
                    <span className="block truncate text-[13.5px] font-semibold text-white">
                      Unit {u.unit_code}
                    </span>
                    {u.unit_title && (
                      <span className="block truncate text-[12px] text-white">{u.unit_title}</span>
                    )}
                  </span>
                  <StatusChip
                    tone={u.covered === u.total ? 'done' : u.covered === 0 ? 'neutral' : 'action'}
                  >
                    {u.covered === u.total ? 'All covered' : `${u.covered} of ${u.total}`}
                  </StatusChip>
                </li>
              ))}
            </ul>
          </>
        )}
      </section>
    </FormSheet>
  );
}
