/**
 * Public online booking (ELE-2079): the booking widget on the quote page,
 * /book-visit/:key, website embeds and the Google Business Profile link.
 *
 * Runs signed out with the anon key. Every call is a token/slug-keyed
 * SECURITY DEFINER function that validates and rate limits on its own;
 * nothing about the firm's team is ever sent to the browser (free slots
 * come back as days and half-days, never names).
 */
import { useMutation, useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';

const rpc = supabase.rpc.bind(supabase) as unknown as (
  fn: string,
  args?: Record<string, unknown>
) => Promise<{ data: unknown; error: { message: string } | null }>;

export interface PublicBookingType {
  key: string;
  label: string;
  minutes: number;
  deposit_pounds: number | null;
}

export interface PublicBookingPage {
  found: boolean;
  key?: string;
  company_name?: string;
  phone?: string | null;
  logo?: string | null;
  colour?: string | null;
  intro?: string | null;
  types?: PublicBookingType[];
  lead_days?: number;
  auto_confirm?: boolean;
  area?:
    | { mode: 'radius'; miles: number; from: string | null }
    | { mode: 'postcodes'; postcodes: string[] };
}

export interface PublicSlotDay {
  day: string;
  label: string;
  halves: Array<'am' | 'pm' | 'day'>;
}

export const usePublicBookingPage = (key: string | undefined) =>
  useQuery({
    queryKey: ['public-booking-page', key],
    enabled: !!key,
    retry: 1,
    staleTime: 5 * 60 * 1000,
    queryFn: async (): Promise<PublicBookingPage> => {
      const { data, error } = await rpc('get_booking_page', { p_key: key });
      if (error) throw new Error(error.message);
      return (data as PublicBookingPage) ?? { found: false };
    },
  });

/** Plain words for every refusal the server can give. */
export function bookingErrorText(
  code: string | undefined,
  phone?: string | null,
  outcode?: string | null
): string {
  const call = phone ? ` Call ${phone} and we will see what we can do.` : '';
  switch (code) {
    case 'out_of_area':
      return `Sorry, we don't cover ${outcode ?? 'that postcode'} for online bookings.${call}`;
    case 'postcode':
      return 'That postcode does not look right. Check it and try again.';
    case 'postcode_unknown':
      return `We could not find ${outcode ?? 'that postcode'}.${call}`;
    case 'no_area':
      return `Online booking is not set up for any area yet.${call}`;
    case 'rate_limited':
      return `We have had a few requests from here already.${call || ' Please try again later.'}`;
    case 'taken':
      return 'That time has just been taken. Please pick another.';
    case 'slot':
      return 'That time is not available. Please pick another.';
    case 'type':
      return 'That visit is not offered online any more.';
    case 'name':
      return 'Please add your name.';
    case 'email':
      return 'That email address does not look right.';
    case 'phone':
      return 'That phone number does not look right.';
    case 'contact':
      return 'Add a phone number or an email so we can confirm.';
    case 'address':
      return 'Please add the address for the visit.';
    case 'links':
      return 'Please remove the web links from your note.';
    case 'not_found':
      return 'Online booking is switched off.';
    default:
      return `Something went wrong.${call || ' Please try again.'}`;
  }
}

export class BookingRefusal extends Error {
  constructor(
    public code: string,
    public outcode?: string | null
  ) {
    super(code);
  }
}

export async function fetchSlots(key: string, type: string, postcode: string) {
  const { data, error } = await rpc('get_booking_slots', {
    p_key: key,
    p_type: type,
    p_postcode: postcode,
  });
  if (error) throw new BookingRefusal('error');
  const r = data as {
    ok: boolean;
    error?: string;
    outcode?: string;
    days?: PublicSlotDay[];
    minutes?: number;
  };
  if (!r?.ok) throw new BookingRefusal(r?.error ?? 'error', r?.outcode ?? null);
  return { outcode: r.outcode ?? null, days: r.days ?? [] };
}

export interface CreateBookingInput {
  key: string;
  type: string;
  day: string;
  half: 'am' | 'pm' | 'day';
  name: string;
  email: string;
  phone: string;
  address: string;
  postcode: string;
  notes: string;
  source: 'quote_page' | 'website' | 'google' | 'link';
  website: string; // honeypot
  elapsedMs: number;
}

export interface BookingDone {
  reference: string;
  status: 'tentative' | 'confirmed';
  label: string;
  type: string;
  deposit: { pounds: number; pay_path: string } | null;
}

export const useCreateBooking = () =>
  useMutation({
    mutationFn: async (i: CreateBookingInput): Promise<BookingDone> => {
      const { data, error } = await rpc('create_online_booking', {
        p_key: i.key,
        p_type: i.type,
        p_day: i.day,
        p_half: i.half,
        p_name: i.name,
        p_email: i.email || null,
        p_phone: i.phone || null,
        p_address: i.address || null,
        p_postcode: i.postcode || null,
        p_notes: i.notes || null,
        p_source: i.source,
        p_website: i.website || null,
        p_elapsed_ms: Math.round(i.elapsedMs),
      });
      if (error) throw new BookingRefusal('error');
      const r = data as { ok: boolean; error?: string; outcode?: string } & Partial<BookingDone>;
      if (!r?.ok) throw new BookingRefusal(r?.error ?? 'error', r?.outcode ?? null);
      return {
        reference: r.reference ?? '',
        status: (r.status as BookingDone['status']) ?? 'tentative',
        label: r.label ?? '',
        type: r.type ?? '',
        deposit: r.deposit ?? null,
      };
    },
  });
