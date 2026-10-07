import { useEffect, useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Sheet, SheetContent, SheetTitle } from '@/components/ui/sheet';
import { Input } from '@/components/ui/input';
import { Loader2 } from 'lucide-react';
import { toast } from 'sonner';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { useIsMobile } from '@/hooks/use-mobile';
import { getActingEmployerId } from '@/lib/actingEmployer';
import { cn } from '@/lib/utils';
import {
  SheetShell,
  FormCard,
  Field,
  PrimaryButton,
  SecondaryButton,
  inputClass,
} from '@/components/employer/editorial';

/* ==========================================================================
   Timesheet rules — the firm's default break (company_profiles
   .default_break_minutes) and working day (company_profiles.working_day_hours,
   read by the Jobs › Diary capacity bars, 8h by default; set_firm_working_day). Pre-filled on worker clock-out and manual entries
   (get_my_time_settings, ELE-2000). Owner/admin only: the caller hides the entry point from office
   managers, and the setter (set_firm_default_break) refuses them too, because
   company_profiles UPDATE RLS is owner-only and an admin could not save it.
   ========================================================================== */

const PRESETS = [0, 20, 30, 45, 60] as const;
const DAY_PRESETS = [7, 7.5, 8, 8.5, 9, 10] as const;
const dayLabel = (h: number) => `${h % 1 ? h.toFixed(1) : h} h`;

const chipOn = 'bg-elec-yellow border-elec-yellow text-black font-semibold';
const chipOff = 'bg-white/[0.06] border-white/[0.12] text-white font-medium';

export function useFirmDefaultBreak() {
  const { user } = useAuth();
  return useQuery({
    queryKey: ['firm-default-break', user?.id],
    enabled: !!user,
    staleTime: 5 * 60 * 1000,
    queryFn: async (): Promise<{
      firmId: string;
      minutes: number | null;
      dayHours: number;
      hasProfile: boolean;
    }> => {
      const firmId = (await getActingEmployerId(user!.id)) ?? user!.id;
      const { data, error } = await supabase
        .from('company_profiles')
        .select('default_break_minutes, working_day_hours' as never)
        .eq('user_id', firmId)
        .limit(1)
        .maybeSingle();
      if (error) throw error;
      const row = data as unknown as {
        default_break_minutes: number | null;
        working_day_hours: number | string | null;
      } | null;
      return {
        firmId,
        minutes: row?.default_break_minutes ?? null,
        dayHours: Number(row?.working_day_hours ?? 8) || 8,
        hasProfile: !!row,
      };
    },
  });
}

export function TimesheetRulesSheet({
  open,
  onOpenChange,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) {
  const isMobile = useIsMobile();
  const queryClient = useQueryClient();
  const { data, isLoading } = useFirmDefaultBreak();
  const current = data?.minutes ?? 30;
  const currentDay = data?.dayHours ?? 8;
  const [day, setDay] = useState<number>(currentDay);

  const [picked, setPicked] = useState<number>(current);
  const [custom, setCustom] = useState(false);
  const [customText, setCustomText] = useState('');

  useEffect(() => {
    if (!open) return;
    const isPreset = (PRESETS as readonly number[]).includes(current);
    setPicked(current);
    setCustom(!isPreset);
    setCustomText(isPreset ? '' : String(current));
    setDay(currentDay);
  }, [open, current, currentDay]);

  const customValue = parseInt(customText, 10);
  const value = custom ? customValue : picked;
  const valid = Number.isInteger(value) && value >= 0 && value <= 240;
  const breakChanged = valid && value !== current;
  const dayChanged = day !== currentDay;
  const changed = valid && (breakChanged || dayChanged);

  const save = useMutation({
    mutationFn: async ({ minutes, hours }: { minutes: number; hours: number }) => {
      if (!data?.firmId) throw new Error('No firm');
      if (breakChanged) {
        const { error } = await supabase.rpc(
          'set_firm_default_break' as never,
          {
            p_firm: data.firmId,
            p_minutes: minutes,
          } as never
        );
        if (error) throw error;
      }
      if (dayChanged) {
        const { error } = await supabase.rpc(
          'set_firm_working_day' as never,
          {
            p_firm: data.firmId,
            p_hours: hours,
          } as never
        );
        if (error) throw error;
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['firm-default-break'] });
      queryClient.invalidateQueries({ queryKey: ['dispatch-board'] });
      toast.success('Timesheet rules saved');
      onOpenChange(false);
    },
    onError: (e: { message?: string }) => {
      const msg = e?.message ?? '';
      toast.error(
        msg.includes('no_company_profile')
          ? 'Set up your company profile first.'
          : msg.includes('not_allowed')
            ? 'Only the owner or an admin can change this.'
            : 'Could not save. Check your connection and try again.'
      );
    },
  });

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent
        side={isMobile ? 'bottom' : 'right'}
        className={
          isMobile
            ? 'h-[85vh] p-0 rounded-t-2xl overflow-hidden border-t border-white/[0.06]'
            : 'w-full sm:max-w-xl lg:max-w-2xl p-0 border-l border-white/[0.06]'
        }
      >
        <SheetTitle className="sr-only">Timesheet rules</SheetTitle>
        <SheetShell
          eyebrow="Timesheet rules"
          title="Breaks and working day"
          description="How a day is counted for your team: the break taken off a clocked day, and how long a full day is in the diary."
          footer={
            <>
              <SecondaryButton fullWidth onClick={() => onOpenChange(false)}>
                Cancel
              </SecondaryButton>
              <PrimaryButton
                fullWidth
                disabled={!changed || save.isPending || !data?.hasProfile}
                onClick={() => save.mutate({ minutes: value, hours: day })}
              >
                {save.isPending ? <Loader2 className="h-4 w-4 mr-2 animate-spin" /> : null}
                Save
              </PrimaryButton>
            </>
          }
        >
          {isLoading ? (
            <div className="flex justify-center py-8">
              <Loader2 className="h-5 w-5 animate-spin text-white" />
            </div>
          ) : (
            <div className="space-y-4">
              <FormCard bleed className="-mx-5 sm:mx-0">
                <p className="text-[12.5px] text-white leading-snug">
                  Taken off a clocked day when the worker doesn't enter a break. UK law: at least 20
                  minutes for a shift over 6 hours.
                </p>
                <Field label="Minutes off a clocked day">
                  <div className="grid grid-cols-3 gap-2">
                    {PRESETS.map((m) => (
                      <button
                        key={m}
                        type="button"
                        onClick={() => {
                          setCustom(false);
                          setPicked(m);
                        }}
                        aria-pressed={!custom && picked === m}
                        className={cn(
                          'h-11 rounded-full border text-[13px] tabular-nums touch-manipulation transition-colors',
                          !custom && picked === m ? chipOn : chipOff
                        )}
                      >
                        {m === 0 ? 'None' : `${m} min`}
                      </button>
                    ))}
                    <button
                      type="button"
                      onClick={() => {
                        setCustom(true);
                        if (!customText) setCustomText(String(picked));
                      }}
                      aria-pressed={custom}
                      className={cn(
                        'h-11 rounded-full border text-[13px] touch-manipulation transition-colors',
                        custom ? chipOn : chipOff
                      )}
                    >
                      Custom
                    </button>
                  </div>
                </Field>
                {custom && (
                  <Field
                    label="Custom break (minutes)"
                    hint={!valid && customText ? 'Between 0 and 240 minutes.' : undefined}
                  >
                    <Input
                      type="number"
                      inputMode="numeric"
                      min={0}
                      max={240}
                      value={customText}
                      onChange={(e) =>
                        setCustomText(e.target.value.replace(/[^0-9]/g, '').slice(0, 3))
                      }
                      placeholder="e.g. 40"
                      className={cn(inputClass, !valid && customText && 'border-red-400')}
                      autoFocus
                    />
                  </Field>
                )}
                <p className="border-t border-white/[0.1] pt-3 text-[12.5px] text-white leading-snug">
                  Filled in as the break when a worker clocks out or adds a day by hand. They can
                  change it before sending. Days already sent are not changed.
                </p>
                {!data?.hasProfile && (
                  <p className="text-[12.5px] text-orange-300 leading-snug">
                    Set up your company profile first, then this can be saved.
                  </p>
                )}
              </FormCard>
              <FormCard bleed className="-mx-5 sm:mx-0">
                <Field label="A full working day">
                  <div className="grid grid-cols-3 gap-2">
                    {DAY_PRESETS.map((h) => (
                      <button
                        key={h}
                        type="button"
                        onClick={() => setDay(h)}
                        aria-pressed={day === h}
                        className={cn(
                          'h-11 rounded-full border text-[13px] tabular-nums touch-manipulation transition-colors',
                          day === h ? chipOn : chipOff
                        )}
                      >
                        {dayLabel(h)}
                      </button>
                    ))}
                  </div>
                </Field>
                <p className="border-t border-white/[0.1] pt-3 text-[12.5px] text-white leading-snug">
                  The diary fills each person's day up to this and turns red when someone is booked
                  past it. A booking with no hours set counts as a full day.
                  {!(DAY_PRESETS as readonly number[]).includes(currentDay) &&
                    ` Currently ${dayLabel(currentDay)}.`}
                </p>
              </FormCard>
            </div>
          )}
        </SheetShell>
      </SheetContent>
    </Sheet>
  );
}
