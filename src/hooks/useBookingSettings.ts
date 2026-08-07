import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';

export type DayKey = 'mon' | 'tue' | 'wed' | 'thu' | 'fri' | 'sat' | 'sun';
export type DayWindow = { start: string; end: string } | null;
export type WorkingHours = Record<DayKey, DayWindow>;

/**
 * A period the booking page must not offer.
 *
 * `end` is optional and inclusive — omitting it means a single day. This is
 * the exact shape `supabase/functions/public-booking/index.ts` reads back:
 * it compares `dateStr >= start && dateStr <= (end || start)` on the
 * `YYYY-MM-DD` prefix, so anything longer than ten characters is ignored.
 */
export interface Blackout {
  start: string;
  end?: string;
}

export interface BookingSettings {
  hours: WorkingHours;
  bufferMinutes: number;
  maxPerDay: number;
  minNoticeHours: number;
  slotMinutes: number;
  blackouts: Blackout[];
}

/**
 * Allowed slot lengths.
 *
 * Constrained in the database too — the slot walker steps in whole multiples
 * of this across a working day, so an arbitrary value produces start times
 * nobody would choose to offer.
 */
export const SLOT_LENGTHS = [30, 60, 90, 120] as const;

export const DAY_ORDER: { key: DayKey; label: string; short: string }[] = [
  { key: 'mon', label: 'Monday', short: 'Mon' },
  { key: 'tue', label: 'Tuesday', short: 'Tue' },
  { key: 'wed', label: 'Wednesday', short: 'Wed' },
  { key: 'thu', label: 'Thursday', short: 'Thu' },
  { key: 'fri', label: 'Friday', short: 'Fri' },
  { key: 'sat', label: 'Saturday', short: 'Sat' },
  { key: 'sun', label: 'Sunday', short: 'Sun' },
];

/** Matches the column DEFAULT on `profiles.scheduling_working_hours`. */
export const DEFAULT_HOURS: WorkingHours = {
  mon: { start: '08:00', end: '18:00' },
  tue: { start: '08:00', end: '18:00' },
  wed: { start: '08:00', end: '18:00' },
  thu: { start: '08:00', end: '18:00' },
  fri: { start: '08:00', end: '18:00' },
  sat: null,
  sun: null,
};

export const DEFAULT_SETTINGS: BookingSettings = {
  hours: DEFAULT_HOURS,
  bufferMinutes: 30,
  maxPerDay: 4,
  minNoticeHours: 24,
  slotMinutes: 60,
  blackouts: [],
};

/**
 * The five preferences the public booking page runs on.
 *
 * All five live on `profiles` and all five are read by the `public-booking`
 * edge function. Only four of them had a UI — `scheduling_blackout_dates` was
 * read on every slot lookup and written by nothing, which is why not one of
 * 1,468 profiles had a blackout set and there was no way to close the page
 * for a holiday.
 */
export function useBookingSettings() {
  return useQuery({
    queryKey: ['booking-settings'],
    staleTime: 60_000,
    queryFn: async (): Promise<BookingSettings> => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (!user) return DEFAULT_SETTINGS;

      const { data, error } = await supabase
        .from('profiles')
        .select(
          'scheduling_working_hours, scheduling_buffer_minutes, scheduling_max_bookings_per_day, scheduling_min_notice_hours, scheduling_blackout_dates, scheduling_slot_minutes'
        )
        .eq('id', user.id)
        .maybeSingle();

      if (error) throw error;

      const raw = data?.scheduling_blackout_dates;
      const blackouts: Blackout[] = Array.isArray(raw)
        ? (raw as Blackout[])
            .filter((b) => b && typeof b.start === 'string' && b.start.length >= 10)
            .map((b) => ({
              start: b.start.slice(0, 10),
              ...(b.end ? { end: b.end.slice(0, 10) } : {}),
            }))
        : [];

      return {
        hours: data?.scheduling_working_hours
          ? { ...DEFAULT_HOURS, ...(data.scheduling_working_hours as WorkingHours) }
          : DEFAULT_HOURS,
        bufferMinutes:
          typeof data?.scheduling_buffer_minutes === 'number'
            ? data.scheduling_buffer_minutes
            : DEFAULT_SETTINGS.bufferMinutes,
        maxPerDay:
          typeof data?.scheduling_max_bookings_per_day === 'number'
            ? data.scheduling_max_bookings_per_day
            : DEFAULT_SETTINGS.maxPerDay,
        minNoticeHours:
          typeof data?.scheduling_min_notice_hours === 'number'
            ? data.scheduling_min_notice_hours
            : DEFAULT_SETTINGS.minNoticeHours,
        slotMinutes:
          typeof data?.scheduling_slot_minutes === 'number'
            ? data.scheduling_slot_minutes
            : DEFAULT_SETTINGS.slotMinutes,
        blackouts,
      };
    },
  });
}

export function useSaveBookingSettings() {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: async (settings: BookingSettings) => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (!user) throw new Error('Not signed in');

      const { error } = await supabase
        .from('profiles')
        .update({
          scheduling_working_hours: settings.hours,
          scheduling_buffer_minutes: settings.bufferMinutes,
          scheduling_max_bookings_per_day: settings.maxPerDay,
          scheduling_min_notice_hours: settings.minNoticeHours,
          scheduling_slot_minutes: settings.slotMinutes,
          // Sorted so the list reads chronologically wherever it is rendered
          // — including in the edge function's logs.
          scheduling_blackout_dates: [...settings.blackouts].sort((a, b) =>
            a.start.localeCompare(b.start)
          ),
        })
        .eq('id', user.id);

      if (error) throw error;
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['booking-settings'] });
    },
  });
}

/**
 * Whether the page can actually take a booking.
 *
 * Every day closed means the link still loads and still looks fine to a
 * client — it just never offers a slot. Worth saying out loud on the page
 * rather than letting someone share a link that silently accepts nothing.
 */
export function openDayCount(hours: WorkingHours): number {
  return DAY_ORDER.filter(({ key }) => !!hours[key]).length;
}
