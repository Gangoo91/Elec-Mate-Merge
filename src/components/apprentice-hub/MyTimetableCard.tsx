import { useCallback, useEffect, useMemo, useState } from 'react';
import { cn } from '@/lib/utils';
import { supabase } from '@/integrations/supabase/client';

/* ==========================================================================
   MyTimetableCard — apprentice-side "this week" view. Shows scheduled
   college lessons (from college_lesson_plans, cohort-scoped) plus the
   apprentice's own ILP target dates that fall in the next 7 days.

   Lesson rows are tutor-led. ILP targets are self-managed deadlines.
   Days are grouped by date with a sticky-feeling small caps header.
   ========================================================================== */

interface LessonRow {
  id: string;
  title: string;
  scheduled_date: string | null;
  scheduled_start_time: string | null;
  duration_minutes: number | null;
  objectives: string | null;
}

interface IlpTargetRow {
  id: string;
  title: string;
  target_date: string | null;
  status: string;
  priority: string | null;
}

type AgendaItem = {
  key: string;
  date: string;
  start_time: string | null;
  kind: 'lesson' | 'ilp_target';
  title: string;
  detail: string | null;
  duration_minutes: number | null;
};

const DAY_FMT = new Intl.DateTimeFormat('en-GB', {
  weekday: 'short',
  day: 'numeric',
  month: 'short',
});

function todayDateOnly(): string {
  return new Date().toISOString().slice(0, 10);
}

function endOfWindowDateOnly(days = 14): string {
  const d = new Date();
  d.setDate(d.getDate() + days);
  return d.toISOString().slice(0, 10);
}

function dayLabel(iso: string): string {
  const d = new Date(iso);
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const tomorrow = new Date(today);
  tomorrow.setDate(today.getDate() + 1);
  const cmp = new Date(d);
  cmp.setHours(0, 0, 0, 0);
  if (cmp.getTime() === today.getTime()) return 'Today';
  if (cmp.getTime() === tomorrow.getTime()) return 'Tomorrow';
  return DAY_FMT.format(cmp);
}

export function MyTimetableCard() {
  const [lessons, setLessons] = useState<LessonRow[]>([]);
  const [targets, setTargets] = useState<IlpTargetRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [hasCohort, setHasCohort] = useState(false);

  const fetchAll = useCallback(async () => {
    const { data: u } = await supabase.auth.getUser();
    const uid = u.user?.id;
    if (!uid) {
      setLoading(false);
      return;
    }
    const { data: cs } = await supabase
      .from('college_students')
      .select('id, cohort_id')
      .eq('user_id', uid)
      .maybeSingle();
    const csId = (cs?.id as string | undefined) ?? null;
    const cohortId = (cs?.cohort_id as string | undefined) ?? null;
    setHasCohort(Boolean(cohortId));

    const startDateOnly = todayDateOnly();
    const endDateOnly = endOfWindowDateOnly();

    const [lessonsRes, targetsRes] = await Promise.all([
      cohortId
        ? supabase
            .from('college_lesson_plans')
            .select('id, title, scheduled_date, scheduled_start_time, duration_minutes, objectives')
            .eq('cohort_id', cohortId)
            .gte('scheduled_date', startDateOnly)
            .lte('scheduled_date', endDateOnly)
            .order('scheduled_date', { ascending: true })
            .then(
              (r) => r,
              () => ({ data: null, error: null })
            )
        : Promise.resolve({ data: null, error: null }),
      csId
        ? supabase
            .from('college_ilp_goals')
            .select('id, title, target_date, status, priority')
            .eq('student_id', csId)
            .gte('target_date', startDateOnly)
            .lte('target_date', endDateOnly)
            .not('status', 'in', '(completed,cancelled)')
            .order('target_date', { ascending: true })
            .limit(20)
            .then(
              (r) => r,
              () => ({ data: null, error: null })
            )
        : Promise.resolve({ data: null, error: null }),
    ]);

    if (lessonsRes && !('error' in lessonsRes && lessonsRes.error))
      setLessons(((lessonsRes as { data: unknown }).data ?? []) as LessonRow[]);
    if (targetsRes && !('error' in targetsRes && targetsRes.error))
      setTargets(((targetsRes as { data: unknown }).data ?? []) as IlpTargetRow[]);
    setLoading(false);
  }, []);

  useEffect(() => {
    fetchAll();
  }, [fetchAll]);

  const grouped = useMemo(() => {
    const items: AgendaItem[] = [];
    for (const l of lessons) {
      if (!l.scheduled_date) continue;
      items.push({
        key: `lesson_${l.id}`,
        date: l.scheduled_date,
        start_time: l.scheduled_start_time ?? null,
        kind: 'lesson',
        title: l.title,
        detail: l.objectives?.slice(0, 110) ?? null,
        duration_minutes: l.duration_minutes,
      });
    }
    for (const g of targets) {
      if (!g.target_date) continue;
      items.push({
        key: `ilp_${g.id}`,
        date: g.target_date,
        start_time: null,
        kind: 'ilp_target',
        title: g.title,
        detail:
          g.status === 'blocked'
            ? 'Blocked — reply to your tutor'
            : g.priority === 'high'
              ? 'High priority'
              : null,
        duration_minutes: null,
      });
    }
    // Sort by date asc, then by start_time within day (lessons with times first).
    items.sort((a, b) => {
      if (a.date !== b.date) return a.date < b.date ? -1 : 1;
      const at = a.start_time ?? 'zz';
      const bt = b.start_time ?? 'zz';
      return at < bt ? -1 : at > bt ? 1 : 0;
    });

    const map = new Map<string, AgendaItem[]>();
    for (const it of items) {
      const key = it.date.slice(0, 10);
      const arr = map.get(key) ?? [];
      arr.push(it);
      map.set(key, arr);
    }
    return Array.from(map.entries()).map(([dateKey, list]) => ({
      dateKey,
      label: dayLabel(`${dateKey}T00:00:00`),
      items: list,
    }));
  }, [lessons, targets]);

  if (loading) return <Skeleton />;

  if (grouped.length === 0) {
    return (
      <section className="rounded-2xl border border-white/[0.06] bg-[hsl(0_0%_10%)] overflow-hidden">
        <div className="px-4 sm:px-5 py-4 sm:py-5">
          <div className="text-[11px] sm:text-[11.5px] font-medium uppercase tracking-[0.18em] text-emerald-300/85">
            This fortnight
          </div>
          <p className="mt-3 text-[12.5px] text-white/85 leading-snug">
            {hasCohort
              ? 'No lessons or ILP deadlines scheduled in the next 14 days.'
              : "You're not in a cohort yet — your tutor needs to add you to one before lessons appear here."}
          </p>
        </div>
      </section>
    );
  }

  return (
    <section className="rounded-2xl border border-white/[0.06] bg-[hsl(0_0%_10%)] overflow-hidden">
      <div className="px-4 sm:px-5 py-4 sm:py-5">
        <div className="flex items-baseline justify-between gap-3 flex-wrap">
          <div className="text-[11px] sm:text-[11.5px] font-medium uppercase tracking-[0.18em] text-emerald-300/85">
            This fortnight
          </div>
          <span className="text-[10.5px] tabular-nums text-white/85">
            {lessons.length} {lessons.length === 1 ? 'lesson' : 'lessons'}
            {targets.length > 0 &&
              ` · ${targets.length} ILP ${targets.length === 1 ? 'target' : 'targets'}`}
          </span>
        </div>

        <div className="mt-3 space-y-4">
          {grouped.map((day) => (
            <div key={day.dateKey}>
              <div className="text-[10.5px] font-medium uppercase tracking-[0.16em] text-white/95">
                {day.label}
              </div>
              <ul className="mt-1.5 -mx-1 divide-y divide-white/[0.05]">
                {day.items.map((item) => (
                  <AgendaRow key={item.key} item={item} />
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function AgendaRow({ item }: { item: AgendaItem }) {
  // start_time is a `time` column (HH:MM:SS). Trim to HH:MM for display.
  const time = item.start_time ? item.start_time.slice(0, 5) : null;
  const tone = item.kind === 'lesson' ? 'text-emerald-300' : 'text-purple-300';
  const kindLabel = item.kind === 'lesson' ? 'Lesson' : 'ILP target';
  return (
    <li className="px-1 py-2.5 flex items-baseline justify-between gap-3">
      <div className="min-w-0 flex-1">
        <div className={cn('text-[10.5px] font-medium uppercase tracking-[0.14em]', tone)}>
          {kindLabel}
          {item.duration_minutes ? ` · ${item.duration_minutes}m` : ''}
        </div>
        <div className="mt-0.5 text-[13px] font-medium text-white leading-snug truncate">
          {item.title}
        </div>
        {item.detail && (
          <div className="mt-1 text-[11.5px] text-white/85 leading-snug line-clamp-2">
            {item.detail}
          </div>
        )}
      </div>
      {time && <span className="shrink-0 text-[11.5px] tabular-nums text-white/90">{time}</span>}
    </li>
  );
}

function Skeleton() {
  return (
    <section className="rounded-2xl border border-white/[0.06] bg-[hsl(0_0%_10%)] overflow-hidden">
      <div className="px-4 sm:px-5 py-4 sm:py-5 space-y-3">
        <div className="h-3 w-28 rounded-full bg-white/[0.05]" />
        {[0, 1, 2].map((i) => (
          <div key={i} className="space-y-1.5">
            <div className="h-2.5 w-16 rounded-full bg-white/[0.05]" />
            <div className="h-3.5 w-3/4 rounded-md bg-white/[0.05]" />
          </div>
        ))}
      </div>
    </section>
  );
}
