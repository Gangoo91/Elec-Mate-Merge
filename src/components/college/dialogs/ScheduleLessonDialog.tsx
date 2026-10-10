import { useEffect, useMemo, useState } from 'react';
import { FormSheet } from '@/components/forms/FormSheet';
import {
  buttonPrimaryCn,
  buttonSecondaryCn,
  inputCn,
  labelCn,
} from '@/components/forms/fieldStyles';
import { TeachToggle, choiceCn } from '@/components/college/teaching/TeachingKit';
import { cn } from '@/lib/utils';
import { supabase } from '@/integrations/supabase/client';
import { getMyCollegeId } from '@/lib/myCollege';
import { useToast } from '@/hooks/use-toast';

interface Cohort {
  id: string;
  name: string;
  course_id: string | null;
}

interface Props {
  open: boolean;
  onOpenChange: (v: boolean) => void;
  lessonId: string;
  planTitle: string;
  defaultDurationMins: number;
  initialCohortId?: string | null;
  onScheduled?: () => void;
}

function isoDate(d: Date) {
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${y}-${m}-${day}`;
}

const DURATION_PRESETS = [30, 45, 60, 90, 120, 180];
const COMMON_TIMES = ['09:00', '09:30', '10:00', '11:00', '13:00', '14:00', '15:00'];

export function ScheduleLessonDialog({
  open,
  onOpenChange,
  lessonId,
  planTitle,
  defaultDurationMins,
  initialCohortId,
  onScheduled,
}: Props) {
  const { toast } = useToast();

  const [cohorts, setCohorts] = useState<Cohort[]>([]);
  const [loadingCohorts, setLoadingCohorts] = useState(false);
  const [cohortId, setCohortId] = useState<string | null>(initialCohortId ?? null);
  const [date, setDate] = useState<string>(() => isoDate(new Date()));
  const [startTime, setStartTime] = useState<string>('09:00');
  const [duration, setDuration] = useState<number>(defaultDurationMins || 90);
  const [room, setRoom] = useState<string>('');
  const [saving, setSaving] = useState(false);

  // Load cohorts for the current college
  useEffect(() => {
    if (!open) return;
    let cancelled = false;
    setLoadingCohorts(true);
    (async () => {
      const collegeId = await getMyCollegeId().catch(() => null);
      if (!collegeId) {
        if (!cancelled) setLoadingCohorts(false);
        return;
      }
      const { data } = await supabase
        .from('college_cohorts')
        .select('id, name, course_id, status')
        .eq('college_id', collegeId)
        .order('name');
      if (cancelled) return;
      setCohorts(
        (data ?? [])
          .filter((c) => (c.status ?? '').toLowerCase() !== 'archived')
          .map((c) => ({ id: c.id, name: c.name, course_id: c.course_id }))
      );
      setLoadingCohorts(false);
    })();
    return () => {
      cancelled = true;
    };
  }, [open]);

  // Reset when opened for a different plan
  useEffect(() => {
    if (!open) return;
    setDuration(defaultDurationMins || 90);
    setCohortId(initialCohortId ?? null);
  }, [open, lessonId, defaultDurationMins, initialCohortId]);

  const endTime = useMemo(() => {
    if (!startTime || !duration) return '';
    const [h, m] = startTime.split(':').map(Number);
    const total = h * 60 + m + duration;
    const eh = Math.floor(total / 60) % 24;
    const em = total % 60;
    return `${String(eh).padStart(2, '0')}:${String(em).padStart(2, '0')}`;
  }, [startTime, duration]);

  const canSave = Boolean(date && startTime && duration && duration >= 15);

  const handleSchedule = async () => {
    setSaving(true);
    try {
      const { error } = await supabase
        .from('college_lesson_plans')
        .update({
          scheduled_date: date,
          scheduled_start_time: startTime,
          scheduled_room: room.trim() || null,
          duration_minutes: duration,
          cohort_id: cohortId,
        })
        .eq('id', lessonId);
      if (error) throw error;

      toast({
        title: 'Lesson scheduled',
        description: `${new Date(date).toLocaleDateString('en-GB', {
          weekday: 'long',
          day: 'numeric',
          month: 'long',
        })} · ${startTime}${room ? ` · ${room}` : ''}`,
      });
      onScheduled?.();
      onOpenChange(false);
    } catch (e) {
      toast({
        title: 'Could not schedule',
        description: (e as Error).message,
        variant: 'destructive',
      });
    } finally {
      setSaving(false);
    }
  };

  // Friendly relative date chips
  const dateChips = useMemo(() => {
    const today = new Date();
    const mkChip = (offset: number, label: string) => {
      const d = new Date(today);
      d.setDate(d.getDate() + offset);
      return { value: isoDate(d), label };
    };
    return [
      mkChip(0, 'Today'),
      mkChip(1, 'Tomorrow'),
      mkChip(2, 'In 2 days'),
      mkChip(7, 'In a week'),
    ];
  }, []);

  const cohortName = cohortId ? cohorts.find((c) => c.id === cohortId)?.name : null;
  const longDate = date
    ? new Date(date).toLocaleDateString('en-GB', {
        weekday: 'long',
        day: 'numeric',
        month: 'long',
        year: 'numeric',
      })
    : 'No date';

  return (
    <FormSheet
      width="wide"
      bodyClassName="grid items-start gap-x-10 gap-y-6 lg:grid-cols-[minmax(0,1fr)_22rem]"
      open={open}
      onOpenChange={onOpenChange}
      eyebrow="Schedule to timetable"
      title={planTitle}
      description="Pick when and where this lesson runs. You can always move it later."
      footer={
        <div className="grid grid-cols-2 gap-2.5">
          <button
            type="button"
            onClick={() => onOpenChange(false)}
            disabled={saving}
            className={buttonSecondaryCn}
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={handleSchedule}
            disabled={!canSave || saving}
            className={buttonPrimaryCn}
          >
            {saving ? 'Scheduling…' : 'Schedule lesson'}
          </button>
        </div>
      }
    >
      <div className="space-y-6">
        <Field label="Cohort">
          <div className="flex flex-wrap gap-2">
            <button
              type="button"
              aria-pressed={cohortId === null}
              onClick={() => setCohortId(null)}
              className={choiceCn(cohortId === null)}
            >
              No cohort
            </button>
            {loadingCohorts ? (
              <span className="py-2 text-[13px] text-white">Loading cohorts…</span>
            ) : cohorts.length === 0 ? (
              <span className="py-2 text-[13px] text-white">
                No cohorts yet, so it is scheduled without one.
              </span>
            ) : (
              cohorts.map((c) => (
                <button
                  key={c.id}
                  type="button"
                  aria-pressed={cohortId === c.id}
                  onClick={() => setCohortId(c.id)}
                  className={choiceCn(cohortId === c.id)}
                >
                  {c.name}
                </button>
              ))
            )}
          </div>
        </Field>

        <div className="grid grid-cols-1 gap-x-6 gap-y-6 lg:grid-cols-2">
          <Field label="Date" htmlFor="sl-date">
            {/* Today / Tomorrow / In 2 days / In a week: one joined control. */}
            <TeachToggle
              label="Date"
              value={dateChips.some((c) => c.value === date) ? date : ''}
              onChange={setDate}
              options={dateChips.map((c) => ({ value: c.value, label: c.label }))}
              className="mb-2 flex w-full [&>button]:flex-1 [&>button]:px-2"
            />
            <input
              id="sl-date"
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className={inputCn}
            />
          </Field>

          <Field label="Start time" htmlFor="sl-time">
            <div className="mb-2 flex flex-wrap gap-2">
              {COMMON_TIMES.map((t) => (
                <button
                  key={t}
                  type="button"
                  aria-pressed={startTime === t}
                  onClick={() => setStartTime(t)}
                  className={cn(choiceCn(startTime === t), 'tabular-nums')}
                >
                  {t}
                </button>
              ))}
            </div>
            <input
              id="sl-time"
              type="time"
              value={startTime}
              onChange={(e) => setStartTime(e.target.value)}
              className={inputCn}
            />
          </Field>

          <Field label={`Length · ${duration} minutes`}>
            <div className="flex flex-wrap gap-2">
              {DURATION_PRESETS.map((d) => (
                <button
                  key={d}
                  type="button"
                  aria-pressed={duration === d}
                  onClick={() => setDuration(d)}
                  className={cn(choiceCn(duration === d), 'tabular-nums')}
                >
                  {d < 60 ? `${d} min` : `${Math.floor(d / 60)}${d % 60 ? '½' : ''} hr`}
                </button>
              ))}
            </div>
          </Field>

          <Field label="Room (optional)" htmlFor="sl-room">
            <input
              id="sl-room"
              type="text"
              value={room}
              onChange={(e) => setRoom(e.target.value)}
              placeholder="e.g. Workshop 3, Room W12"
              className={inputCn}
            />
          </Field>
        </div>
      </div>

      <aside className="border-t border-white/[0.1] pt-5 lg:sticky lg:top-0 lg:border-l lg:border-t-0 lg:pl-8 lg:pt-0">
        <h3 className="text-sm font-semibold text-white">Summary</h3>
        <dl className="mt-3 space-y-3 text-[13.5px]">
          <div>
            <dt className="text-[12px] text-white">When</dt>
            <dd className="mt-0.5 font-semibold text-white">{longDate}</dd>
            <dd className="tabular-nums text-white">
              {startTime} to {endTime}
            </dd>
          </div>
          <div className="border-t border-white/[0.08] pt-3">
            <dt className="text-[12px] text-white">Where</dt>
            <dd className="mt-0.5 font-semibold text-white">{room.trim() || 'No room set'}</dd>
          </div>
          <div className="border-t border-white/[0.08] pt-3">
            <dt className="text-[12px] text-white">Cohort</dt>
            <dd className="mt-0.5 font-semibold text-white">{cohortName ?? 'No cohort'}</dd>
          </div>
        </dl>
        {!canSave && (
          <p className="mt-4 text-[13px] text-orange-300">
            Pick a date, a start time and a length of at least 15 minutes.
          </p>
        )}
      </aside>
    </FormSheet>
  );
}

function Field({
  label,
  htmlFor,
  children,
}: {
  label: string;
  htmlFor?: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      {htmlFor ? (
        <label className={labelCn} htmlFor={htmlFor}>
          {label}
        </label>
      ) : (
        <p className={labelCn}>{label}</p>
      )}
      <div className="mt-1.5">{children}</div>
    </div>
  );
}
