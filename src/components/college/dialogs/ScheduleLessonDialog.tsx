import { useEffect, useMemo, useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { cn } from '@/lib/utils';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import {
  PrimaryButton,
  SecondaryButton,
  fieldLabelClass,
  inputClass,
} from '@/components/college/primitives';

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
      const { data: profile } = await supabase
        .from('profiles')
        .select('college_id')
        .eq('id', (await supabase.auth.getUser()).data.user?.id ?? '')
        .maybeSingle();
      if (!profile?.college_id) {
        if (!cancelled) setLoadingCohorts(false);
        return;
      }
      const { data } = await supabase
        .from('college_cohorts')
        .select('id, name, course_id, status')
        .eq('college_id', profile.college_id)
        .order('name');
      if (cancelled) return;
      setCohorts(
        (data ?? [])
          .filter((c) => c.status !== 'archived')
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

  return (
    <Dialog open={open} onOpenChange={(v) => !v && onOpenChange(false)}>
      <DialogContent
        className={cn(
          'w-[min(100vw-1rem,640px)] max-h-[92vh]',
          'bg-[hsl(0_0%_10%)] border-white/[0.08]',
          'p-0 gap-0 flex flex-col overflow-hidden',
          'sm:w-[min(100vw-2rem,640px)]'
        )}
      >
        <DialogHeader className="shrink-0 border-b border-white/[0.06] px-6 py-5 sm:px-7 sm:py-6 space-y-2 text-left">
          <div className="text-[10px] font-medium uppercase tracking-[0.22em] text-elec-yellow/85">
            Schedule to timetable
          </div>
          <DialogTitle className="text-xl sm:text-[22px] font-semibold text-white tracking-tight leading-tight">
            {planTitle}
          </DialogTitle>
          <DialogDescription className="text-[12.5px] text-white leading-relaxed">
            Pick when and where this lesson will run. You can always move it later.
          </DialogDescription>
        </DialogHeader>

        <div className="flex-1 overflow-y-auto px-6 sm:px-7 py-6 space-y-6">
          {/* Cohort */}
          <Field label="Cohort">
            <div className="flex flex-wrap gap-1.5">
              <Chip
                active={cohortId === null}
                onClick={() => setCohortId(null)}
                label="No cohort"
                subtle
              />
              {loadingCohorts ? (
                <span className="text-[12px] text-white py-1.5">Loading cohorts…</span>
              ) : cohorts.length === 0 ? (
                <span className="text-[12px] text-white py-1.5">
                  No cohorts yet — the lesson will be scheduled without a class.
                </span>
              ) : (
                cohorts.map((c) => (
                  <Chip
                    key={c.id}
                    active={cohortId === c.id}
                    onClick={() => setCohortId(c.id)}
                    label={c.name}
                  />
                ))
              )}
            </div>
          </Field>

          {/* Date */}
          <Field label="Date">
            <div className="flex flex-wrap items-center gap-1.5 mb-2.5">
              {dateChips.map((c) => (
                <Chip
                  key={c.value}
                  active={date === c.value}
                  onClick={() => setDate(c.value)}
                  label={c.label}
                  subtle
                />
              ))}
            </div>
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className={inputClass}
            />
          </Field>

          {/* Start time */}
          <Field label="Start time">
            <div className="flex flex-wrap items-center gap-1.5 mb-2.5">
              {COMMON_TIMES.map((t) => (
                <Chip
                  key={t}
                  active={startTime === t}
                  onClick={() => setStartTime(t)}
                  label={t}
                  subtle
                  mono
                />
              ))}
            </div>
            <input
              type="time"
              value={startTime}
              onChange={(e) => setStartTime(e.target.value)}
              className={inputClass}
            />
          </Field>

          {/* Duration */}
          <Field label={`Duration · ${duration} min`}>
            <div className="flex flex-wrap items-center gap-1.5">
              {DURATION_PRESETS.map((d) => (
                <Chip
                  key={d}
                  active={duration === d}
                  onClick={() => setDuration(d)}
                  label={`${d}m`}
                  subtle
                  mono
                />
              ))}
            </div>
          </Field>

          {/* Room */}
          <Field label="Room (optional)">
            <input
              type="text"
              value={room}
              onChange={(e) => setRoom(e.target.value)}
              placeholder="e.g. Workshop 3, Room W12"
              className={inputClass}
            />
          </Field>

          {/* Summary */}
          <div className="bg-[hsl(0_0%_13%)] border border-white/[0.06] rounded-xl px-4 py-4">
            <div className="text-[10px] font-medium uppercase tracking-[0.22em] text-white mb-2">
              Scheduling summary
            </div>
            <div className="text-[13.5px] text-white leading-relaxed">
              {new Date(date).toLocaleDateString('en-GB', {
                weekday: 'long',
                day: 'numeric',
                month: 'long',
                year: 'numeric',
              })}
              <span className="mx-2 text-white/30">·</span>
              <span className="font-mono tabular-nums">
                {startTime} → {endTime}
              </span>
              {room && (
                <>
                  <span className="mx-2 text-white/30">·</span>
                  <span>{room}</span>
                </>
              )}
              {cohortId && (
                <>
                  <span className="mx-2 text-white/30">·</span>
                  <span className="text-elec-yellow">
                    {cohorts.find((c) => c.id === cohortId)?.name}
                  </span>
                </>
              )}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="shrink-0 border-t border-white/[0.06] bg-[hsl(0_0%_10%)] px-6 py-4 sm:px-7 sm:py-5 flex items-center justify-end gap-2 flex-col-reverse sm:flex-row">
          <SecondaryButton
            onClick={() => onOpenChange(false)}
            disabled={saving}
            fullWidth
            className="sm:w-auto"
          >
            Cancel
          </SecondaryButton>
          <PrimaryButton
            onClick={handleSchedule}
            disabled={!canSave || saving}
            fullWidth
            className="sm:w-auto"
          >
            {saving ? 'Scheduling…' : 'Schedule lesson'}
          </PrimaryButton>
        </div>
      </DialogContent>
    </Dialog>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="space-y-2.5">
      <label className={fieldLabelClass}>{label}</label>
      {children}
    </div>
  );
}

function Chip({
  label,
  active,
  onClick,
  subtle,
  mono,
}: {
  label: string;
  active: boolean;
  onClick: () => void;
  subtle?: boolean;
  mono?: boolean;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        'h-8 px-3 rounded-full text-[12px] transition-colors touch-manipulation border',
        mono && 'font-mono tabular-nums',
        active
          ? 'bg-elec-yellow/[0.1] border-elec-yellow/40 text-elec-yellow font-medium'
          : subtle
            ? 'bg-[hsl(0_0%_13%)] border-white/[0.08] text-white hover:border-white/[0.18]'
            : 'bg-[hsl(0_0%_13%)] border-white/[0.08] text-white hover:border-white/[0.18] font-medium'
      )}
    >
      {label}
    </button>
  );
}
