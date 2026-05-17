import React, { useEffect, useRef, useState } from 'react';
import { Sheet, SheetContent } from '@/components/ui/sheet';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Switch } from '@/components/ui/switch';
import { toast } from 'sonner';
import { supabase } from '@/integrations/supabase/client';
import { Eyebrow } from '@/components/college/primitives';

interface BookingAvailabilitySheetProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

type DayKey = 'mon' | 'tue' | 'wed' | 'thu' | 'fri' | 'sat' | 'sun';
type DayWindow = { start: string; end: string } | null;
type WorkingHours = Record<DayKey, DayWindow>;

const DAY_ORDER: { key: DayKey; label: string }[] = [
  { key: 'mon', label: 'Monday' },
  { key: 'tue', label: 'Tuesday' },
  { key: 'wed', label: 'Wednesday' },
  { key: 'thu', label: 'Thursday' },
  { key: 'fri', label: 'Friday' },
  { key: 'sat', label: 'Saturday' },
  { key: 'sun', label: 'Sunday' },
];

const DEFAULT_HOURS: WorkingHours = {
  mon: { start: '08:00', end: '18:00' },
  tue: { start: '08:00', end: '18:00' },
  wed: { start: '08:00', end: '18:00' },
  thu: { start: '08:00', end: '18:00' },
  fri: { start: '08:00', end: '18:00' },
  sat: null,
  sun: null,
};

const BookingAvailabilitySheet = ({ open, onOpenChange }: BookingAvailabilitySheetProps) => {
  const [isSaving, setIsSaving] = useState(false);
  const [hours, setHours] = useState<WorkingHours>(DEFAULT_HOURS);
  const [bufferMinutes, setBufferMinutes] = useState<number>(30);
  const [maxPerDay, setMaxPerDay] = useState<number>(4);
  const [minNoticeHours, setMinNoticeHours] = useState<number>(24);
  const [loadError, setLoadError] = useState<string | null>(null);

  // Hydrate once per open transition — read from profiles.scheduling_*.
  const hydratedForOpenRef = useRef(false);
  useEffect(() => {
    if (!open) {
      hydratedForOpenRef.current = false;
      return;
    }
    if (hydratedForOpenRef.current) return;
    hydratedForOpenRef.current = true;

    (async () => {
      try {
        const {
          data: { user },
        } = await supabase.auth.getUser();
        if (!user) {
          setLoadError('Not signed in');
          return;
        }
        const { data, error } = await supabase
          .from('profiles')
          .select(
            'scheduling_working_hours, scheduling_buffer_minutes, scheduling_max_bookings_per_day, scheduling_min_notice_hours'
          )
          .eq('id', user.id)
          .maybeSingle();
        if (error) {
          setLoadError(error.message);
          return;
        }
        if (data?.scheduling_working_hours) {
          setHours({ ...DEFAULT_HOURS, ...(data.scheduling_working_hours as WorkingHours) });
        }
        if (typeof data?.scheduling_buffer_minutes === 'number') {
          setBufferMinutes(data.scheduling_buffer_minutes);
        }
        if (typeof data?.scheduling_max_bookings_per_day === 'number') {
          setMaxPerDay(data.scheduling_max_bookings_per_day);
        }
        if (typeof data?.scheduling_min_notice_hours === 'number') {
          setMinNoticeHours(data.scheduling_min_notice_hours);
        }
      } catch (e) {
        setLoadError(e instanceof Error ? e.message : 'Could not load');
      }
    })();
  }, [open]);

  const toggleDay = (day: DayKey, isOpen: boolean) => {
    setHours((prev) => ({
      ...prev,
      [day]: isOpen ? { start: '08:00', end: '18:00' } : null,
    }));
  };

  const updateDayTime = (day: DayKey, field: 'start' | 'end', value: string) => {
    setHours((prev) => {
      const current = prev[day];
      if (!current) return prev;
      return { ...prev, [day]: { ...current, [field]: value } };
    });
  };

  const handleSave = async () => {
    setIsSaving(true);
    try {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (!user) {
        toast.error('Not signed in');
        return;
      }
      const { error } = await supabase
        .from('profiles')
        .update({
          scheduling_working_hours: hours,
          scheduling_buffer_minutes: bufferMinutes,
          scheduling_max_bookings_per_day: maxPerDay,
          scheduling_min_notice_hours: minNoticeHours,
        })
        .eq('id', user.id);
      if (error) throw error;
      toast.success('Booking availability saved');
      onOpenChange(false);
    } catch (e) {
      toast.error(e instanceof Error ? e.message : 'Failed to save');
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent
        side="bottom"
        className="h-[85vh] p-0 rounded-t-2xl overflow-hidden border-white/[0.06] bg-[#0a0a0a]"
      >
        <div className="flex flex-col h-full bg-[#0a0a0a]">
          <div className="flex justify-center pt-3 pb-1">
            <div className="w-10 h-1 rounded-full bg-white/20" />
          </div>

          <header className="px-5 sm:px-6 pb-4">
            <Eyebrow>Scheduling</Eyebrow>
            <h2 className="mt-1.5 text-xl font-semibold text-white tracking-tight">
              Booking availability
            </h2>
            <p className="mt-1 text-[13px] text-white">
              Working hours, buffer between jobs and daily booking cap. Used by your public
              booking link and post-acceptance slot picker.
            </p>
          </header>

          <div className="flex-1 overflow-y-auto px-5 sm:px-6 pb-6 space-y-6">
            {loadError && (
              <p className="text-[13px] text-rose-300 bg-rose-500/10 border border-rose-500/30 rounded-lg px-3 py-2">
                {loadError}
              </p>
            )}

            <section className="space-y-3">
              <Eyebrow>Working hours</Eyebrow>
              <div className="rounded-xl border border-white/[0.08] divide-y divide-white/[0.06]">
                {DAY_ORDER.map(({ key, label }) => {
                  const window = hours[key];
                  const isOpen = !!window;
                  return (
                    <div key={key} className="px-3 py-3 flex items-center gap-3">
                      <Switch
                        checked={isOpen}
                        onCheckedChange={(v) => toggleDay(key, v)}
                        className="data-[state=checked]:bg-elec-yellow"
                      />
                      <Label className="w-24 text-[14px] text-white font-medium">{label}</Label>
                      {isOpen && window ? (
                        <div className="flex-1 flex items-center gap-2">
                          <Input
                            type="time"
                            value={window.start}
                            onChange={(e) => updateDayTime(key, 'start', e.target.value)}
                            className="h-10 bg-[#0a0a0a] border-white/[0.08] text-white text-[13px] touch-manipulation"
                          />
                          <span className="text-white/40 text-[13px]">to</span>
                          <Input
                            type="time"
                            value={window.end}
                            onChange={(e) => updateDayTime(key, 'end', e.target.value)}
                            className="h-10 bg-[#0a0a0a] border-white/[0.08] text-white text-[13px] touch-manipulation"
                          />
                        </div>
                      ) : (
                        <p className="flex-1 text-[13px] text-white/40">Closed</p>
                      )}
                    </div>
                  );
                })}
              </div>
            </section>

            <section className="space-y-3">
              <Eyebrow>Booking rules</Eyebrow>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="space-y-1.5">
                  <Label className="text-white font-medium text-[13px]">Buffer between jobs</Label>
                  <div className="relative">
                    <Input
                      type="number"
                      min={0}
                      max={120}
                      step={15}
                      value={bufferMinutes}
                      onChange={(e) => setBufferMinutes(Number(e.target.value) || 0)}
                      className="h-11 bg-[#0a0a0a] border-white/[0.08] text-white pr-12 touch-manipulation"
                    />
                    <span className="absolute right-3 top-1/2 -translate-y-1/2 text-[12px] text-white/40">
                      min
                    </span>
                  </div>
                </div>
                <div className="space-y-1.5">
                  <Label className="text-white font-medium text-[13px]">Max bookings/day</Label>
                  <Input
                    type="number"
                    min={1}
                    max={20}
                    value={maxPerDay}
                    onChange={(e) => setMaxPerDay(Number(e.target.value) || 1)}
                    className="h-11 bg-[#0a0a0a] border-white/[0.08] text-white touch-manipulation"
                  />
                </div>
                <div className="space-y-1.5">
                  <Label className="text-white font-medium text-[13px]">
                    Minimum notice
                  </Label>
                  <div className="relative">
                    <Input
                      type="number"
                      min={0}
                      max={168}
                      value={minNoticeHours}
                      onChange={(e) => setMinNoticeHours(Number(e.target.value) || 0)}
                      className="h-11 bg-[#0a0a0a] border-white/[0.08] text-white pr-12 touch-manipulation"
                    />
                    <span className="absolute right-3 top-1/2 -translate-y-1/2 text-[12px] text-white/40">
                      hrs
                    </span>
                  </div>
                </div>
              </div>
              <p className="text-[12px] text-white/50 leading-relaxed">
                Buffer adds padding before and after each existing calendar event so you have
                travel time. Min notice prevents clients booking a slot too close to now.
              </p>
            </section>
          </div>

          <div className="px-5 sm:px-6 py-4 border-t border-white/[0.06]">
            <button
              type="button"
              onClick={handleSave}
              disabled={isSaving}
              className="w-full h-12 rounded-xl bg-elec-yellow text-black font-semibold text-[14px] hover:bg-elec-yellow/90 transition-colors touch-manipulation disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSaving ? 'Saving…' : 'Save'}
            </button>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default BookingAvailabilitySheet;
