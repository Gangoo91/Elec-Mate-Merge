/**
 * Smarter scheduling (ELE-2072) and online booking for the office (ELE-2079).
 *
 * The suggestions come from one database engine (_sched_options) shared with
 * Mate and the public booking widget: leave (approved or asked for), diary
 * bookings, tentative online bookings, the job's credentials on the day,
 * crew size and a straight-line travel estimate. The browser then asks
 * google-travel-time for real drive minutes on what is shown, cached a day
 * under the same key as the calendar's travel chips.
 */
import { useMemo } from 'react';
import { useMutation, useQueries, useQuery, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { DISPATCH_KEY } from '@/hooks/useDispatchBoard';
import { QUERY_KEYS } from '@/lib/queryConfig';

// Casts: these RPCs postdate the last types.ts regeneration.
type Rpc = (fn: string, args?: Record<string, unknown>) => ReturnType<typeof supabase.rpc>;
const rpc = supabase.rpc.bind(supabase) as unknown as Rpc;

export interface SlotPerson {
  employee_id: string;
  name: string;
  role: string | null;
  km: number | null;
  est_minutes: number | null;
  base: string | null;
  booked_hours: number;
  /** Where that day starts from (their other job, check-in or the office). */
  from_lat: number | null;
  from_lng: number | null;
}

export interface SlotOption {
  day: string;
  end_day?: string;
  half: 'am' | 'pm' | 'day';
  start_time: string;
  hours: number;
  days: number;
  score: number;
  reason: string;
  people: SlotPerson[];
}

export interface SlotSuggestions {
  from: string;
  to: string;
  required: string[];
  required_labels: string[];
  hours: number;
  days: number;
  needed: number;
  options: SlotOption[];
  excluded: { employee_id: string; name: string; why: string }[];
  job?: {
    id: string;
    title: string;
    location: string | null;
    lat: number | null;
    lng: number | null;
    crew_count: number;
    workers_count: number | null;
    has_location: boolean;
  };
}

export function useSuggestSlots(jobId: string | null, from: string | null, days: number) {
  return useQuery({
    queryKey: ['suggest-slots', jobId, from, days],
    enabled: !!jobId,
    staleTime: 30_000,
    queryFn: async (): Promise<SlotSuggestions> => {
      const { data, error } = await rpc('suggest_job_slots', {
        p_job: jobId,
        p_from: from,
        p_days: days,
        // A few spare, so the client re-check can drop one and still show three.
        p_limit: 6,
      });
      if (error) throw error;
      return data as unknown as SlotSuggestions;
    },
  });
}

/* ── Routes ─────────────────────────────────────────────────────────── */

export interface RouteStop {
  assignment_id: string;
  job_id: string;
  title: string;
  location: string | null;
  lat: number;
  lng: number;
  start_time: string | null;
  km_from_prev: number | null;
}

export interface DayRoute {
  employee_id: string;
  day: string;
  from_office: boolean;
  stops: RouteStop[];
  km_total: number;
  est_minutes: number | null;
  /** The suggested order differs from the booked times. */
  reordered: boolean;
}

export function useDiaryRoutes(firm: string | undefined, from: string, to: string) {
  return useQuery({
    queryKey: ['diary-routes', firm, from, to],
    enabled: !!firm,
    staleTime: 60_000,
    queryFn: async (): Promise<DayRoute[]> => {
      const { data, error } = await rpc('get_diary_routes', {
        p_firm: firm,
        p_from: from,
        p_to: to,
      });
      if (error) throw error;
      return (data as unknown as DayRoute[]) ?? [];
    },
  });
}

/** A place google-travel-time can drive to: the address, else the pin. */
export const placeFor = (s: {
  location?: string | null;
  lat?: number | null;
  lng?: number | null;
}): string | null => {
  const loc = (s.location ?? '').trim();
  if (loc.length > 3) return loc;
  return s.lat != null && s.lng != null ? `${s.lat},${s.lng}` : null;
};

async function driveMinutes(origin: string, destination: string): Promise<number> {
  const { data, error } = await supabase.functions.invoke('google-travel-time', {
    body: { origin, destination },
  });
  const payload = data as { minutes?: number; error?: string } | null;
  if (error || !payload || typeof payload.minutes !== 'number') {
    throw new Error(payload?.error || error?.message || 'No estimate');
  }
  return payload.minutes;
}

/**
 * Real drive minutes for each origin→destination pair, keyed `o|d`. Same
 * query key as the calendar's useTravelTimes, so a leg is paid for once a day.
 */
export function useDriveMinutes(pairs: Array<[string, string]>, enabled = true) {
  const unique = useMemo(() => {
    const seen = new Set<string>();
    return pairs.filter(([o, d]) => {
      const k = `${o.toLowerCase()}|${d.toLowerCase()}`;
      if (!o || !d || o.toLowerCase() === d.toLowerCase() || seen.has(k)) return false;
      seen.add(k);
      return true;
    });
  }, [pairs]);
  const results = useQueries({
    queries: unique.map(([o, d]) => ({
      queryKey: ['travel-time', o.toLowerCase(), d.toLowerCase()],
      enabled,
      staleTime: 24 * 60 * 60 * 1000,
      gcTime: 24 * 60 * 60 * 1000,
      retry: false,
      queryFn: async () => {
        const minutes = await driveMinutes(o, d);
        return { minutes, text: `${minutes} min` };
      },
    })),
  });
  return useMemo(() => {
    const out = new Map<string, number>();
    unique.forEach(([o, d], i) => {
      const r = results[i]?.data as { minutes: number } | undefined;
      if (r) out.set(`${o.toLowerCase()}|${d.toLowerCase()}`, r.minutes);
    });
    return out;
  }, [unique, results]);
}

export const legKey = (o: string, d: string) => `${o.toLowerCase()}|${d.toLowerCase()}`;

/* ── Online bookings (office) ───────────────────────────────────────── */

export interface BookingType {
  key: string;
  label: string;
  minutes: number;
  required: string[];
  enabled: boolean;
  /** Owner and admins only; absent for everyone else. */
  deposit_pounds?: number | null;
}

export interface BookingSettings {
  saved: boolean;
  enabled: boolean;
  public_key: string | null;
  auto_confirm: boolean;
  lead_days: number;
  horizon_days: number;
  area_mode: 'radius' | 'postcodes';
  base_postcode: string | null;
  base_found: boolean;
  radius_miles: number;
  area_postcodes: string[];
  intro: string | null;
  can_see_money: boolean;
  deposit_enabled: boolean | null;
  types: BookingType[];
  quote_page_slug: string | null;
  tentative: number;
}

export const BOOKING_SETTINGS_KEY = ['booking-settings'] as const;
export const ONLINE_BOOKINGS_KEY = ['online-bookings'] as const;

export function useBookingSettings(firm: string | undefined) {
  return useQuery({
    queryKey: [...BOOKING_SETTINGS_KEY, firm],
    enabled: !!firm,
    staleTime: 60_000,
    queryFn: async (): Promise<BookingSettings> => {
      const { data, error } = await rpc('get_booking_settings', { p_firm: firm });
      if (error) throw error;
      return data as unknown as BookingSettings;
    },
  });
}

export function useSaveBookingSettings(firm: string | undefined) {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (patch: Partial<BookingSettings>) => {
      const { data, error } = await rpc('save_booking_settings', { p_firm: firm, p_patch: patch });
      if (error) throw error;
      return data as unknown as BookingSettings;
    },
    onSuccess: (data) => qc.setQueryData([...BOOKING_SETTINGS_KEY, firm], data),
  });
}

export interface OnlineBooking {
  id: string;
  reference: string;
  status: 'tentative' | 'confirmed' | 'declined' | 'cancelled';
  type: string;
  minutes: number;
  day: string;
  half: 'am' | 'pm' | 'day';
  start_time: string | null;
  label: string;
  customer: string;
  email: string | null;
  phone: string | null;
  address: string | null;
  postcode: string | null;
  notes: string | null;
  source: string;
  job_id: string | null;
  created_at: string;
  decided_at?: string | null;
  suggested: { employee_id: string; name: string } | null;
  deposit: { paid: boolean; pounds?: number | null } | null;
}

/**
 * Tentative bookings by default. `includeDone` adds the decided ones (last
 * week onwards), so a bell for a confirmed, declined or released booking
 * can still open it.
 */
export function useOnlineBookings(
  firm: string | undefined,
  opts: { includeDone?: boolean; enabled?: boolean } = {}
) {
  const includeDone = !!opts.includeDone;
  return useQuery({
    queryKey: [...ONLINE_BOOKINGS_KEY, firm, includeDone ? 'all' : 'open'],
    enabled: !!firm && opts.enabled !== false,
    staleTime: 30_000,
    queryFn: async (): Promise<OnlineBooking[]> => {
      const { data, error } = await rpc('get_online_bookings', {
        p_firm: firm,
        p_include_done: includeDone,
      });
      if (error) throw error;
      return (data as unknown as OnlineBooking[]) ?? [];
    },
  });
}

export interface DecideInput {
  bookingId: string;
  action: 'accept' | 'decline';
  employeeId?: string | null;
  day?: string | null;
  half?: 'am' | 'pm' | 'day' | null;
  reason?: string | null;
}

export function useDecideOnlineBooking() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (i: DecideInput) => {
      const { data, error } = await rpc('decide_online_booking', {
        p_booking: i.bookingId,
        p_action: i.action,
        p_employee: i.employeeId ?? null,
        p_day: i.day ?? null,
        p_half: i.half ?? null,
        p_reason: i.reason ?? null,
      });
      if (error) throw error;
      const r = data as unknown as { status: string; job_id?: string; has_email?: boolean };
      // Accepted with an email: the customer's confirmation and the evening
      // before reminder go through the existing ELE-1822 send.
      let emailed = false;
      if (i.action === 'accept' && r.job_id && r.has_email) {
        try {
          const { data: sent, error: sendError } = await supabase.functions.invoke(
            'send-booking-confirmation',
            {
              body: { jobId: r.job_id, remindDayBefore: true },
            }
          );
          emailed = !sendError && !!(sent as { sent?: boolean } | null)?.sent;
        } catch {
          emailed = false;
        }
      }
      return { ...r, emailed };
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ONLINE_BOOKINGS_KEY });
      qc.invalidateQueries({ queryKey: BOOKING_SETTINGS_KEY });
      qc.invalidateQueries({ queryKey: DISPATCH_KEY });
    },
  });
}

/** "Monday 12 October, morning" style, from a day + half. */
export function halfWord(half: 'am' | 'pm' | 'day'): string {
  return half === 'am' ? 'morning' : half === 'pm' ? 'afternoon' : 'all day';
}

export interface AssignCrewInput {
  jobId: string;
  employeeIds: string[];
  start: string;
  end?: string | null;
  startTime?: string | null;
  hours?: number | null;
  jobTitle?: string;
  jobLocation?: string | null;
}

/**
 * Book everyone on a suggested slot in one go (dispatch_assign_crew): all of
 * them or none, so a failure part way never leaves one person booked on
 * their own. Each person gets the same push (trigger) and email as a diary
 * booking; emails go only once the whole booking has gone through.
 */
export function useDispatchAssignCrew() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (input: AssignCrewInput) => {
      const { data, error } = await rpc('dispatch_assign_crew', {
        p_job: input.jobId,
        p_employees: input.employeeIds,
        p_start: input.start,
        p_end: input.end ?? input.start,
        p_start_time: input.startTime || null,
        p_hours: input.hours ?? null,
        p_notes: null,
      });
      if (error) throw error;
      for (const employeeId of input.employeeIds) {
        supabase.functions
          .invoke('send-job-notification', {
            body: {
              employee_id: employeeId,
              job_id: input.jobId,
              job_title: input.jobTitle,
              job_location: input.jobLocation,
              start_date: input.start,
              end_date: input.end ?? input.start,
            },
          })
          .catch(() => undefined);
      }
      return (data as unknown as string[]) ?? [];
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: DISPATCH_KEY });
      qc.invalidateQueries({ queryKey: QUERY_KEYS.JOBS });
      qc.invalidateQueries({ queryKey: ['all-job-assignments'] });
      qc.invalidateQueries({ queryKey: ['job-assignments'] });
      qc.invalidateQueries({ queryKey: ['employee-assignments'] });
    },
  });
}
