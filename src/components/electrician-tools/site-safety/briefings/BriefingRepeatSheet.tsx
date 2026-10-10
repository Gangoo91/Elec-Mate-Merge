/**
 * Repeat a toolbox talk on a schedule (ELE-1944).
 *
 * The schedule lives on the server (team_briefing_schedules); a daily job makes
 * the next talk on its date with the register cleared and, for a firm, sends it
 * to the crew. Nobody has to open the screen for a weekly talk to keep going.
 */
import { useEffect, useMemo, useState } from 'react';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { addDays, format, parseISO } from 'date-fns';
import { toast } from 'sonner';
import { cn } from '@/lib/utils';
import { supabase } from '@/integrations/supabase/client';
import { FormSheet } from '@/components/forms/FormSheet';

type Frequency = 'weekly' | 'fortnightly' | 'monthly';

export interface BriefingSchedule {
  id: string;
  source_briefing_id: string;
  frequency: Frequency;
  next_date: string;
  notify_crew: boolean;
  active: boolean;
  last_run_at: string | null;
}

const FREQ_LABEL: Record<Frequency, string> = {
  weekly: 'Every week',
  fortnightly: 'Every two weeks',
  monthly: 'Every month',
};

export const scheduleKey = (briefingId: string) => ['team-briefing-schedule', briefingId];

/** The schedule this briefing starts, or the one that made it. */
export function useBriefingSchedule(briefingId: string, scheduleId?: string | null) {
  return useQuery({
    queryKey: scheduleKey(briefingId),
    queryFn: async (): Promise<BriefingSchedule | null> => {
      const filter = scheduleId
        ? `source_briefing_id.eq.${briefingId},id.eq.${scheduleId}`
        : `source_briefing_id.eq.${briefingId}`;
      const { data, error } = await supabase
        .from('team_briefing_schedules' as never)
        .select('id, source_briefing_id, frequency, next_date, notify_crew, active, last_run_at')
        .or(filter)
        .limit(1)
        .maybeSingle();
      if (error) throw error;
      return (data as unknown as BriefingSchedule | null) ?? null;
    },
  });
}

export function describeSchedule(s: BriefingSchedule | null | undefined): string | null {
  if (!s || !s.active) return null;
  let next = s.next_date;
  try {
    next = format(parseISO(s.next_date), 'EEE d MMM');
  } catch {
    /* raw */
  }
  return `${FREQ_LABEL[s.frequency]}. Next on ${next}`;
}

interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  briefingId: string;
  briefingDate?: string | null;
  scheduleId?: string | null;
  /** Firm briefing: offer to send each repeat to the crew. */
  firm: boolean;
}

const chip = (on: boolean) =>
  cn(
    'h-11 rounded-full border px-4 text-[14px] touch-manipulation',
    on
      ? 'border-elec-yellow bg-elec-yellow font-semibold text-black'
      : 'border-white/[0.12] bg-white/[0.06] font-medium text-white'
  );

export function BriefingRepeatSheet({
  open,
  onOpenChange,
  briefingId,
  briefingDate,
  scheduleId,
  firm,
}: Props) {
  const queryClient = useQueryClient();
  const { data: schedule } = useBriefingSchedule(briefingId, scheduleId);
  const defaultNext = useMemo(() => {
    const today = new Date();
    const base = briefingDate ? parseISO(briefingDate) : today;
    let d = addDays(base, 7);
    while (d < today) d = addDays(d, 7);
    return format(d, 'yyyy-MM-dd');
  }, [briefingDate]);

  const [frequency, setFrequency] = useState<Frequency>('weekly');
  const [nextDate, setNextDate] = useState(defaultNext);
  const [notify, setNotify] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (!open) return;
    if (schedule?.active) {
      setFrequency(schedule.frequency);
      setNextDate(schedule.next_date);
      setNotify(schedule.notify_crew);
    } else {
      setFrequency('weekly');
      setNextDate(defaultNext);
      setNotify(true);
    }
  }, [open, schedule, defaultNext]);

  // A repeat is changed through the talk that started it.
  const sourceId = schedule?.source_briefing_id ?? briefingId;

  const save = async (stop = false) => {
    setSaving(true);
    try {
      const { error } = await supabase.rpc(
        'set_team_briefing_schedule' as never,
        {
          p_briefing_id: sourceId,
          p_frequency: stop ? null : frequency,
          p_next_date: stop ? null : nextDate,
          p_notify_crew: firm ? notify : false,
        } as never
      );
      if (error) throw error;
      toast.success(
        stop ? 'This talk will not repeat.' : 'Saved. The next talk will be made on its date.'
      );
      await queryClient.invalidateQueries({ queryKey: ['team-briefing-schedule'] });
      onOpenChange(false);
    } catch (e) {
      toast.error(e instanceof Error ? e.message : 'Could not save. Try again.');
    } finally {
      setSaving(false);
    }
  };

  const today = format(new Date(), 'yyyy-MM-dd');

  return (
    <FormSheet
      open={open}
      onOpenChange={onOpenChange}
      eyebrow="Toolbox talk"
      title="Repeat this talk"
      description="A copy is made on each date with an empty register, ready to sign."
      width="wide"
      footer={
        <div className="flex flex-col gap-2 sm:flex-row">
          {schedule?.active && (
            <button
              type="button"
              disabled={saving}
              onClick={() => save(true)}
              className="h-11 rounded-full border border-white/[0.14] bg-white/[0.06] px-5 text-[14px] font-semibold text-white touch-manipulation disabled:opacity-50"
            >
              Stop repeating
            </button>
          )}
          <button
            type="button"
            disabled={saving || !nextDate || nextDate < today}
            onClick={() => save(false)}
            className="h-11 rounded-full sm:flex-1 bg-elec-yellow px-5 text-[14px] font-semibold text-black touch-manipulation disabled:opacity-50"
          >
            {saving ? 'Saving…' : schedule?.active ? 'Save changes' : 'Repeat it'}
          </button>
        </div>
      }
    >
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <div className="space-y-2">
          <p className="text-[12px] font-medium text-white">How often</p>
          <div className="flex flex-wrap gap-2">
            {(Object.keys(FREQ_LABEL) as Frequency[]).map((f) => (
              <button
                key={f}
                type="button"
                className={chip(frequency === f)}
                onClick={() => setFrequency(f)}
              >
                {FREQ_LABEL[f]}
              </button>
            ))}
          </div>
        </div>
        <div className="space-y-1">
          <label htmlFor="repeat-next" className="block text-[12px] font-medium text-white">
            Next talk on
          </label>
          <input
            id="repeat-next"
            type="date"
            min={today}
            value={nextDate}
            onChange={(e) => setNextDate(e.target.value)}
            className="input-underline h-11 w-full rounded-none border-0 border-b border-white/[0.15] bg-transparent px-1 text-base font-medium text-white caret-elec-yellow focus:border-elec-yellow focus:outline-none focus:ring-0 [color-scheme:dark] touch-manipulation"
          />
        </div>
        {firm && (
          <label className="flex min-h-11 items-center gap-3 lg:col-span-2">
            <input
              type="checkbox"
              checked={notify}
              onChange={(e) => setNotify(e.target.checked)}
              className="h-5 w-5 accent-elec-yellow"
            />
            <span className="text-[14px] text-white">
              Send each one to the crew on the day, so they can sign it in the app
            </span>
          </label>
        )}
      </div>
    </FormSheet>
  );
}

export default BriefingRepeatSheet;
