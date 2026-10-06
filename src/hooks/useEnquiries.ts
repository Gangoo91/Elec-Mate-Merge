/**
 * Enquiries inbox (ELE-2022).
 *
 * Enquiries arrive server-side (inbound-enquiry-email) from website forms,
 * forwarded Gmail and lead sites. Nothing here writes to `customers` until the
 * user taps Add — `convert` is the only path in.
 */

import { useEffect } from 'react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';

export type EnquirySource =
  | 'website'
  | 'email'
  | 'checkatrade'
  | 'mybuilder'
  | 'bark'
  | 'ratedpeople'
  | 'trustatrader'
  | 'yell'
  | 'form_post'
  | 'manual';

export type EnquiryStatus = 'new' | 'converted' | 'dismissed' | 'spam';
export type EnquiryUrgency = 'emergency' | 'soon' | 'flexible';

export interface Enquiry {
  id: string;
  user_id: string;
  source: EnquirySource;
  status: EnquiryStatus;
  name: string | null;
  email: string | null;
  phone: string | null;
  address: string | null;
  postcode: string | null;
  job_description: string | null;
  job_type: string | null;
  urgency: EnquiryUrgency | null;
  summary: string | null;
  confidence: number | null;
  raw_from: string | null;
  raw_subject: string | null;
  raw_text: string | null;
  received_at: string;
  matched_customer_id: string | null;
  customer_id: string | null;
  quote_id: string | null;
  calendar_event_id: string | null;
  first_actioned_at: string | null;
  distance_miles: number | null;
  photos: string[];
  is_test: boolean;
  job_key: JobKey | null;
  work_category: 'domestic' | 'landlord' | 'commercial' | null;
  not_our_work: boolean;
  fit_note: string | null;
  contact_hidden: boolean;
  photo_findings: string[];
  photo_danger: boolean;
  draft_reply: string | null;
  sent_message: string | null;
  proposed_slots: ProposedSlot[];
  visit_status: 'proposed' | 'booked' | 'declined' | null;
  visit_start: string | null;
  matched?: { id: string; name: string } | null;
}

export interface ProposedSlot {
  start: string;
  end: string;
  label: string;
  reason: string;
  near_miles: number | null;
}

export interface EnquiryInbox {
  user_id: string;
  token: string;
  form_token: string;
  address_prefix: string;
  enabled: boolean;
  forwarding_confirmation_code: string | null;
  forwarding_confirmation_link: string | null;
  forwarding_confirmation_at: string | null;
  last_received_at: string | null;
  junk_warning_at: string | null;
  junk_warning_dismissed_at: string | null;
  blocked_senders: string[];
  services: JobKey[] | null;
  travel_radius_miles: number;
}

// Same keys as supabase/functions/_shared/enquiry-reader.ts
export const JOB_TYPES = {
  eicr: 'EICR / inspection',
  consumer_unit: 'Consumer unit',
  ev_charger: 'EV charger',
  rewire: 'Rewire',
  fault: 'Fault finding',
  sockets_lighting: 'Sockets & lighting',
  fire_alarm: 'Smoke & fire alarms',
  heating: 'Electric heating',
  solar_battery: 'Solar & battery',
  outdoor: 'Outdoor & garden',
  pat: 'PAT testing',
  commercial: 'Commercial work',
  other: 'Other electrical',
  not_electrical: 'Not electrical',
} as const;
export type JobKey = keyof typeof JOB_TYPES;
export const OFFERABLE_JOBS = (Object.keys(JOB_TYPES) as JobKey[]).filter(
  (k) => k !== 'not_electrical'
);

/** Keyword match of a quote title / description to a job key (mirrors the server). */
export function jobKeyFromText(text: string): JobKey {
  const t = text.toLowerCase();
  if (/\beicr\b|periodic|inspection|condition report|landlord cert/.test(t)) return 'eicr';
  if (/consumer unit|fuse ?board|\bcu\b|distribution board/.test(t)) return 'consumer_unit';
  if (/\bev\b|charger|zappi|ohme|wallbox|pod ?point/.test(t)) return 'ev_charger';
  if (/rewire/.test(t)) return 'rewire';
  if (/fault|tripping|no power|trip/.test(t)) return 'fault';
  if (/smoke|heat alarm|fire alarm|detector/.test(t)) return 'fire_alarm';
  if (/heater|heating|storage heater|underfloor/.test(t)) return 'heating';
  if (/solar|battery|pv\b/.test(t)) return 'solar_battery';
  if (/garden|outdoor|outside|garage|shed/.test(t)) return 'outdoor';
  if (/\bpat\b/.test(t)) return 'pat';
  if (/socket|light|switch|spur|downlight|pendant|extractor|fan/.test(t)) return 'sockets_lighting';
  return 'other';
}

export const INBOUND_DOMAIN = 'in.elec-mate.com';
export const FORM_POST_URL =
  'https://jtwygbeceundfgnkirof.supabase.co/functions/v1/inbound-enquiry-email';

export const inboxAddress = (inbox: Pick<EnquiryInbox, 'address_prefix' | 'token'>) =>
  `${inbox.address_prefix}-${inbox.token}@${INBOUND_DOMAIN}`;

// The website-form token is separate from the email token: it ends up in public HTML
export const formPostUrl = (inbox: Pick<EnquiryInbox, 'form_token'>) =>
  `${FORM_POST_URL}?token=${inbox.form_token}`;

/** Hosted enquiry page — for no website, Google Sites, Facebook, link in bio, QR codes. */
export const enquiryPageUrl = (inbox: Pick<EnquiryInbox, 'form_token'>) =>
  `https://www.elec-mate.com/enquire/${inbox.form_token}`;

export const SOURCE_LABEL: Record<EnquirySource, string> = {
  website: 'Website',
  email: 'Email',
  checkatrade: 'Checkatrade',
  mybuilder: 'MyBuilder',
  bark: 'Bark',
  ratedpeople: 'Rated People',
  trustatrader: 'TrustATrader',
  yell: 'Yell',
  form_post: 'Website',
  manual: 'Added by you',
};

const KEY = ['enquiries'] as const;
const COUNT_KEY = ['enquiries', 'new-count'] as const;

// Everything except raw_text (up to 20k chars) — that is fetched when a card opens
const LIST_COLUMNS =
  'id, user_id, source, status, name, email, phone, address, postcode, job_description, job_type, ' +
  'urgency, summary, confidence, raw_from, raw_subject, received_at, matched_customer_id, customer_id, ' +
  'quote_id, calendar_event_id, first_actioned_at, distance_miles, photos, is_test, ' +
  'job_key, work_category, not_our_work, fit_note, contact_hidden, photo_findings, photo_danger, ' +
  'draft_reply, sent_message, proposed_slots, visit_status, visit_start, ' +
  'matched:customers!enquiries_matched_customer_id_fkey(id, name)';

/** Realtime: a new or changed enquiry refreshes the list and the count at once. */
function useEnquiriesRealtime() {
  const qc = useQueryClient();
  useEffect(() => {
    const channel = supabase
      .channel(`enquiries-${Math.random().toString(36).slice(2)}`)
      .on('postgres_changes', { event: '*', schema: 'public', table: 'enquiries' }, () => {
        qc.invalidateQueries({ queryKey: KEY });
      })
      .subscribe();
    return () => {
      supabase.removeChannel(channel);
    };
  }, [qc]);
}

export function useEnquiries() {
  useEnquiriesRealtime();
  return useQuery({
    queryKey: KEY,
    queryFn: async (): Promise<Enquiry[]> => {
      // Spam is fetched on its own: a junk flood must never push real enquiries
      // out of the newest-300 window
      const [real, spam] = await Promise.all([
        supabase
          .from('enquiries' as never)
          .select(LIST_COLUMNS)
          .neq('status', 'spam')
          .order('received_at', { ascending: false })
          .limit(300),
        supabase
          .from('enquiries' as never)
          .select(LIST_COLUMNS)
          .eq('status', 'spam')
          .order('received_at', { ascending: false })
          .limit(100),
      ]);
      if (real.error) throw real.error;
      if (spam.error) throw spam.error;
      return [
        ...((real.data ?? []) as unknown as Enquiry[]),
        ...((spam.data ?? []) as unknown as Enquiry[]),
      ].map((e) => ({ ...e, raw_text: null }));
    },
    staleTime: 15_000,
    // Realtime does the work; this is the safety net if the socket drops
    refetchInterval: 120_000,
    refetchOnWindowFocus: true,
  });
}

/** One enquiry with its original message — for the sheet, and deep links older than the list. */
export function useEnquiry(id: string | null) {
  return useQuery({
    queryKey: ['enquiry', id],
    enabled: !!id,
    queryFn: async (): Promise<Enquiry | null> => {
      const { data, error } = await supabase
        .from('enquiries' as never)
        .select('*, matched:customers!enquiries_matched_customer_id_fkey(id, name)')
        .eq('id', id!)
        .maybeSingle();
      if (error) throw error;
      return (data as unknown as Enquiry) ?? null;
    },
    staleTime: 60_000,
  });
}

/** Head-only count for the Business Hub tile: new, not yet replied to, not a test. */
export function useNewEnquiryCount() {
  const { data } = useQuery({
    queryKey: COUNT_KEY,
    queryFn: async () => {
      const { count, error } = await supabase
        .from('enquiries' as never)
        .select('id', { count: 'exact', head: true })
        .eq('status', 'new')
        .is('first_actioned_at', null)
        .eq('is_test', false);
      if (error) throw error;
      return count ?? 0;
    },
    staleTime: 60_000,
    refetchOnWindowFocus: true,
  });
  return data ?? 0;
}

/** Signed URLs for an enquiry's photos (private bucket, 1 hour). */
export function useEnquiryPhotoUrls(paths: string[] | undefined) {
  return useQuery({
    queryKey: ['enquiry-photos', paths],
    enabled: !!paths?.length,
    queryFn: async () => {
      const { data, error } = await supabase.storage
        .from('enquiry-photos')
        .createSignedUrls(paths!, 3600);
      if (error) throw error;
      return (data ?? []).map((d) => d.signedUrl).filter(Boolean) as string[];
    },
    staleTime: 50 * 60_000,
  });
}

export function useUpdateEnquiry() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async ({ id, patch }: { id: string; patch: Partial<Enquiry> }) => {
      const { matched: _m, raw_text: _r, photos: _p, ...rest } = patch;
      const { error } = await supabase
        .from('enquiries' as never)
        .update(rest as never)
        .eq('id', id);
      if (error) throw error;
    },
    onMutate: async ({ id, patch }) => {
      await qc.cancelQueries({ queryKey: KEY });
      const prev = qc.getQueryData<Enquiry[]>(KEY);
      qc.setQueryData<Enquiry[]>(KEY, (old) =>
        old?.map((e) => (e.id === id ? { ...e, ...patch } : e))
      );
      return { prev };
    },
    onError: (_err, _vars, ctx) => {
      if (ctx?.prev) qc.setQueryData(KEY, ctx.prev);
    },
    onSettled: (_d, _e, { id }) => {
      qc.invalidateQueries({ queryKey: KEY });
      qc.invalidateQueries({ queryKey: ['enquiry', id] });
    },
  });
}

/**
 * Enquiry → customer. Uses the matched customer when there is one, otherwise
 * creates a customer from the (user-confirmed) fields. Returns the customer id.
 */
export function useConvertEnquiry() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (e: Enquiry): Promise<string> => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (!user) throw new Error('You are signed out — sign in and try again.');

      let customerId = e.customer_id ?? e.matched_customer_id;

      // Re-match now: the customer may have been added (or another enquiry from
      // the same person converted) since this one arrived
      if (!customerId) customerId = await findExistingCustomer(e);

      if (!customerId) {
        const name = e.name?.trim() || e.email?.trim() || e.phone?.trim();
        if (!name) throw new Error('Add a name, email or phone first.');
        // The enquiry is owned by the account (a firm's owner for co-admins)
        const { data, error } = await supabase
          .from('customers')
          .insert({
            user_id: e.user_id,
            name,
            email: e.email?.trim().toLowerCase() || null,
            phone: e.phone?.trim() || null,
            address: e.address?.trim() || null,
            postcode: e.postcode?.trim() || null,
            notes: e.job_description
              ? `Enquiry (${SOURCE_LABEL[e.source]}): ${e.job_description}`
              : null,
            tags: ['enquiry', e.source],
          } as never)
          .select('id')
          .single();
        if (error) throw error;
        customerId = (data as { id: string }).id;
      }

      const { error: upErr } = await supabase
        .from('enquiries' as never)
        .update({ status: 'converted', customer_id: customerId } as never)
        .eq('id', e.id);
      if (upErr) throw upErr;

      return customerId;
    },
    onSettled: (_d, _e, e) => {
      qc.invalidateQueries({ queryKey: KEY });
      qc.invalidateQueries({ queryKey: ['enquiry', e.id] });
      qc.invalidateQueries({ queryKey: ['customers'] });
    },
  });
}

const digits = (v: string | null | undefined) => (v ?? '').replace(/\D/g, '').replace(/^44/, '0');

async function findExistingCustomer(e: Enquiry): Promise<string | null> {
  const email = e.email?.trim().toLowerCase();
  if (email) {
    const { data } = await supabase
      .from('customers')
      .select('id, email')
      .eq('user_id', e.user_id)
      .ilike(
        'email',
        email.replace(/[\\%_]/g, (m) => '\\' + m)
      )
      .order('created_at', { ascending: true })
      .limit(1);
    if (data?.[0]) return (data[0] as { id: string }).id;
  }
  const tail = digits(e.phone).slice(-10);
  if (tail.length === 10) {
    const { data } = await supabase
      .from('customers')
      .select('id, phone')
      .eq('user_id', e.user_id)
      .ilike('phone', '%' + tail.slice(-6).split('').join('%'))
      .order('created_at', { ascending: true })
      .limit(100);
    const hit = (data as { id: string; phone: string | null }[] | null)?.find(
      (c) => digits(c.phone).slice(-10) === tail
    );
    if (hit) return hit.id;
  }
  return null;
}

// ── Receiving address ────────────────────────────────────────────────────────

const INBOX_KEY = ['enquiry-inbox'] as const;

export function useEnquiryInbox({ watchForGmailCode = false } = {}) {
  return useQuery({
    queryKey: INBOX_KEY,
    queryFn: async (): Promise<EnquiryInbox> => {
      const { data, error } = await supabase.rpc('get_my_enquiry_inbox' as never);
      if (error) throw error;
      return data as unknown as EnquiryInbox;
    },
    staleTime: 30_000,
    // While waiting for Gmail's confirmation email, check back often
    refetchInterval: (q) =>
      watchForGmailCode && !(q.state.data as EnquiryInbox | undefined)?.forwarding_confirmation_code
        ? 20_000
        : false,
  });
}

export function useResetInboxToken() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (which: 'email' | 'form' | 'both' = 'both') => {
      const { data, error } = await supabase.rpc(
        'reset_my_enquiry_inbox_token' as never,
        { p_which: which } as never
      );
      if (error) throw error;
      return data as unknown as EnquiryInbox;
    },
    onSuccess: (data) => qc.setQueryData(INBOX_KEY, data),
  });
}

export function useSetInboxEnabled() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (enabled: boolean) => {
      const { data, error } = await supabase.rpc(
        'set_my_enquiry_inbox_enabled' as never,
        { p_enabled: enabled } as never
      );
      if (error) throw error;
      return data as unknown as EnquiryInbox;
    },
    onSuccess: (data) => qc.setQueryData(INBOX_KEY, data),
  });
}

// ── Reply helpers ────────────────────────────────────────────────────────────

export function firstName(name: string | null | undefined): string {
  return name?.trim().split(/\s+/)[0] ?? '';
}

/** The reader's own reply when it wrote one, plus the booking link; else the template. */
/** "Thursday 9 October at 3pm" in UK time. */
export function visitPhrase(iso: string): string {
  const d = new Date(iso);
  const get = (opts: Intl.DateTimeFormatOptions, type: Intl.DateTimeFormatPartTypes) =>
    new Intl.DateTimeFormat('en-GB', { timeZone: 'Europe/London', ...opts })
      .formatToParts(d)
      .find((p) => p.type === type)?.value ?? '';
  const h24 = Number(get({ hour: 'numeric', hour12: false }, 'hour'));
  const h = Number(get({ hour: 'numeric', hour12: true }, 'hour'));
  const m = get({ minute: '2-digit' }, 'minute').padStart(2, '0');
  const time = `${h}${m === '00' ? '' : `:${m}`}${h24 >= 12 ? 'pm' : 'am'}`;
  return `${get({ weekday: 'long' }, 'weekday')} ${get({ day: 'numeric' }, 'day')} ${get({ month: 'long' }, 'month')} at ${time}`;
}

export function smartReply(e: Enquiry, businessName?: string | null, bookingLink?: string) {
  // A visit has been approved: offer that time instead of a booking link
  if (e.visit_status === 'booked' && e.visit_start) {
    const base = (e.draft_reply ?? replyMessage(e, businessName)).trim();
    return `${base} I can come and have a look on ${visitPhrase(e.visit_start)}. Does that suit you?`;
  }
  if (e.draft_reply) {
    return bookingLink
      ? `${e.draft_reply.trim()} If it's easier, you can pick a time for me to come and have a look here: ${bookingLink}`
      : e.draft_reply.trim();
  }
  return replyMessage(e, businessName, bookingLink);
}

export function replyMessage(e: Enquiry, businessName?: string | null, bookingLink?: string) {
  const hi = firstName(e.name) ? `Hi ${firstName(e.name)}` : 'Hi';
  const from = businessName ? ` It's ${businessName}.` : '';
  // Lower-case the job for mid-sentence use, but keep EV / EICR / PAT / CCTV as written
  const job = e.job_type
    ?.split(/\s+/)
    .map((w) => (/^[A-Z0-9]{2,}s?$/.test(w) ? w : w.toLowerCase()))
    .join(' ');
  const what = job && e.job_type !== 'Other' ? ` about the ${job}` : '';
  const book = bookingLink
    ? ` You can pick a time for me to come and have a look here: ${bookingLink}`
    : ' When would suit for me to come and have a look?';
  return `${hi}, thanks for getting in touch${what}.${from}${book}`;
}

// ── Junk guard ───────────────────────────────────────────────────────────────

/** Show the "forwarding everything" banner: warned, and not dismissed since. */
export const showJunkWarning = (inbox: EnquiryInbox | undefined) =>
  !!inbox?.junk_warning_at &&
  (!inbox.junk_warning_dismissed_at || inbox.junk_warning_dismissed_at < inbox.junk_warning_at);

export function useDismissJunkWarning() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async () => {
      const { data, error } = await supabase.rpc('dismiss_enquiry_junk_warning' as never);
      if (error) throw error;
      return data as unknown as EnquiryInbox;
    },
    onSuccess: (data) => qc.setQueryData(INBOX_KEY, data),
  });
}

export function useSetSenderBlocked() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async ({ sender, blocked }: { sender: string; blocked: boolean }) => {
      const { data, error } = await supabase.rpc(
        'set_enquiry_sender_blocked' as never,
        { p_sender: sender, p_blocked: blocked } as never
      );
      if (error) throw error;
      return data as unknown as EnquiryInbox;
    },
    onSuccess: (data) => qc.setQueryData(INBOX_KEY, data),
  });
}

const PERSONAL_DOMAINS = new Set([
  'gmail.com',
  'googlemail.com',
  'hotmail.com',
  'hotmail.co.uk',
  'outlook.com',
  'outlook.co.uk',
  'live.com',
  'live.co.uk',
  'msn.com',
  'yahoo.com',
  'yahoo.co.uk',
  'icloud.com',
  'me.com',
  'aol.com',
  'btinternet.com',
  'sky.com',
  'virginmedia.com',
  'ntlworld.com',
  'talktalk.net',
]);

/** The sender's address and domain from "Name <a@b.com>". */
export function senderOf(rawFrom: string | null | undefined) {
  const address = rawFrom?.toLowerCase().match(/[^\s<>"]+@[^\s<>"]+/)?.[0] ?? '';
  const domain = address.split('@')[1] ?? '';
  return { address, domain, personal: PERSONAL_DOMAINS.has(domain) };
}

/**
 * A Gmail search to paste into a filter ("Has the words"), so only enquiries are
 * forwarded. Built from the senders real enquiries have come from, plus the lead
 * sites and the subjects form builders use.
 */
export function gmailFilterQuery(enquiries: Enquiry[], ownEmail?: string | null): string {
  const ownDomain = ownEmail?.split('@')[1]?.toLowerCase();
  const domains = new Set([
    'checkatrade.com',
    'mybuilder.com',
    'bark.com',
    'ratedpeople.com',
    'trustatrader.com',
    'yell.com',
  ]);
  for (const e of enquiries) {
    if (e.status === 'spam' || e.source === 'form_post' || e.source === 'manual') continue;
    const { domain, personal } = senderOf(e.raw_from);
    // Not the electrician's own domain (hand-forwarded mail) and not personal mailboxes
    if (domain && !personal && domain !== ownDomain && !domain.endsWith('elec-mate.com')) {
      domains.add(domain);
    }
  }
  const from = [...domains].slice(0, 12).join(' OR ');
  // Not bare "quote": suppliers send quotes too. These phrases are what customers
  // and form builders use.
  return `from:(${from}) OR subject:(enquiry OR enquiries OR "quote request" OR "request a quote" OR "new submission" OR "contact form" OR "new lead" OR "new job")`;
}

// ── Business preferences (shape "fit") ──────────────────────────────────────

export function useSetEnquiryPreferences() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async ({ services, radius }: { services: JobKey[] | null; radius: number }) => {
      const { data, error } = await supabase.rpc(
        'set_my_enquiry_preferences' as never,
        { p_services: services, p_radius: radius } as never
      );
      if (error) throw error;
      return data as unknown as EnquiryInbox;
    },
    onSuccess: (data) => qc.setQueryData(INBOX_KEY, data),
  });
}

// ── "Typical for you" price, from the electrician's own quotes ─────────────

export interface TypicalPrice {
  source: 'rate_card' | 'quotes';
  low: number;
  high: number;
  count: number;
  item?: string; // rate card item name
}

const roundTo = (n: number, step: number) => Math.round(n / step) * step;

/**
 * The middle half (25th–75th percentile) of this account's last 12 sent quotes
 * for the same job type. Plain arithmetic on their own figures; null under 3.
 */
export function useTypicalPrice(
  jobKey: JobKey | null | undefined,
  ownerId: string | null | undefined
) {
  return useQuery({
    // The ACCOUNT's prices (a co-admin sees the firm's, not their own)
    queryKey: ['enquiry-typical-price', ownerId, jobKey],
    enabled: !!ownerId && !!jobKey && jobKey !== 'other' && jobKey !== 'not_electrical',
    staleTime: 10 * 60_000,
    queryFn: async (): Promise<TypicalPrice | null> => {
      // 1. Their own Rate Card price for this kind of job beats any average
      const { data: card } = await supabase
        .from('price_list_items')
        .select('name, description, unit_price, unit')
        .eq('user_id', ownerId!)
        .gt('unit_price', 0)
        .limit(300);
      const cardHits = (
        (card ?? []) as {
          name: string;
          description: string | null;
          unit_price: number;
          unit: string | null;
        }[]
      )
        .filter(
          (i) =>
            // Job prices only: hourly / day / per-metre rates aren't a price for the job
            !/hour|hr|day|pph|metre|meter|\bm\b|point/i.test(i.unit ?? '') &&
            jobKeyFromText(`${i.name} ${i.description ?? ''}`) === jobKey
        )
        .map((i) => ({ name: i.name, price: Number(i.unit_price) }))
        .sort((a, b) => a.price - b.price);
      if (cardHits.length) {
        return {
          source: 'rate_card',
          low: cardHits[0].price,
          high: cardHits[cardHits.length - 1].price,
          count: cardHits.length,
          item: cardHits.length === 1 ? cardHits[0].name : undefined,
        };
      }

      const { data, error } = await supabase
        .from('quotes')
        .select('job_details, total, status, created_at')
        .eq('user_id', ownerId!)
        // Quotes only: invoices include stage payments and deposits that skew the range
        .in('status', ['sent', 'approved'])
        .gt('total', 0)
        .order('created_at', { ascending: false })
        .limit(250);
      if (error) throw error;
      const totals = (
        (data ?? []) as {
          job_details: { title?: string; description?: string } | null;
          total: number;
        }[]
      )
        .filter((q) => {
          const text = `${q.job_details?.title ?? ''} ${q.job_details?.description ?? ''}`;
          return text.trim() && jobKeyFromText(text) === jobKey;
        })
        .slice(0, 12)
        .map((q) => Number(q.total))
        .filter((n) => Number.isFinite(n) && n > 0)
        .sort((a, b) => a - b);
      // 2. Otherwise the middle of their recent quotes
      if (totals.length < 3) return null;
      // Linear-interpolated percentile
      const at = (p: number) => {
        const i = p * (totals.length - 1);
        const lo = Math.floor(i);
        const hi = Math.ceil(i);
        return totals[lo] + (totals[hi] - totals[lo]) * (i - lo);
      };
      const step = at(0.75) >= 1000 ? 50 : 10;
      return {
        source: 'quotes',
        low: roundTo(at(0.25), step),
        high: roundTo(at(0.75), step),
        count: totals.length,
      };
    },
  });
}

/** The electrician's hourly / day rate from company settings (shown beside the price hint). */
export function useOwnRates(ownerId: string | null | undefined) {
  return useQuery({
    queryKey: ['own-rates', ownerId],
    enabled: !!ownerId,
    staleTime: 10 * 60_000,
    queryFn: async () => {
      const { data } = await supabase
        .from('company_profiles')
        .select('hourly_rate, day_rate')
        .eq('user_id', ownerId!)
        .maybeSingle();
      const hourly = Number((data as { hourly_rate?: number } | null)?.hourly_rate) || null;
      const day = Number((data as { day_rate?: number } | null)?.day_rate) || null;
      return hourly || day ? { hourly, day } : null;
    },
  });
}
