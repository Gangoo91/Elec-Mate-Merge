/**
 * The firm's one front door (ELE-2094): the Employer Hub's Enquiries page.
 *
 * It reads the SAME `enquiries` table as the Electrical Hub (same AI reader,
 * same sources: the in.elec-mate.com address, website form, quote page,
 * missed calls, texts, lead-site forwards), plus the firm's older
 * `employer_leads` rows and its online bookings, through one RPC.
 *
 * Nothing here changes `useEnquiries` or its callers. Acting on an older lead
 * or a booking first copies it into `enquiries` (adopt_front_door_item); the
 * original row is never changed.
 *
 * A quote or a job is made in one tap with everything carried: name, contact,
 * address, job type, details and photos. Won only when the quote is accepted
 * (derived on the server from the quote itself).
 */
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useOfficeFirmId } from '@/hooks/useFirmPaySettings';
import { createQuote, type Quote } from '@/services/financeService';
import { createJob } from '@/services/jobService';
import { createJobFromQuote, linkQuoteToJob } from '@/services/quoteChainService';
import { getActingEmployerId } from '@/lib/actingEmployer';
import { SOURCE_LABEL, type Enquiry, type EnquirySource } from '@/hooks/useEnquiries';

// The functions are newer than the generated types.
const rpc = supabase.rpc.bind(supabase) as unknown as (
  fn: string,
  args?: Record<string, unknown>
) => Promise<{ data: unknown; error: { message: string } | null }>;

async function call<T>(fn: string, args?: Record<string, unknown>): Promise<T> {
  const { data, error } = await rpc(fn, args);
  if (error) throw new Error(error.message);
  return data as T;
}

export type DoorKind = 'enquiry' | 'lead' | 'booking';
export type DoorStage = 'new' | 'open' | 'quoted' | 'job' | 'won' | 'lost' | 'closed' | 'spam';
export type DoorSource = EnquirySource | 'booking';

export interface DoorItem {
  kind: DoorKind;
  id: string;
  enquiry_id: string | null;
  source: DoorSource;
  /** Free-text source on an older lead / a booking's channel. */
  source_text?: string | null;
  name: string | null;
  contact_name?: string | null;
  email: string | null;
  phone: string | null;
  address: string | null;
  postcode: string | null;
  job_type: string | null;
  job_key: string | null;
  summary: string | null;
  details: string | null;
  urgency: 'emergency' | 'soon' | 'flexible' | null;
  received_at: string;
  first_actioned_at: string | null;
  photo_count: number;
  photo_danger: boolean;
  fit_note: string | null;
  not_our_work: boolean;
  distance_miles: number | null;
  is_test: boolean;
  stage: DoorStage;
  customer_id: string | null;
  customer_name: string | null;
  quote: {
    id: string;
    number: string | null;
    status: string | null;
    accepted: boolean;
    accepted_at: string | null;
    total?: number | null;
  } | null;
  job_id: string | null;
  booking_id: string | null;
  lead_id: string | null;
  booking?: { reference: string; status: string; label: string; day: string } | null;
  value?: number | null;
}

export interface FrontDoor {
  money: boolean;
  spam: number;
  items: DoorItem[];
}

export interface DoorPhoto {
  bucket: 'enquiry-photos' | 'quote-page-photos';
  path: string;
}

export interface DoorReply {
  at: string;
  via: 'email' | 'whatsapp' | 'text' | 'copy';
  by: string;
  to: string;
  text: string;
}

export interface DoorDetail {
  raw_from?: string | null;
  raw_subject?: string | null;
  raw_text?: string | null;
  draft_reply?: string | null;
  sent_message?: string | null;
  replies: DoorReply[];
  photo_findings: string[];
  voicemail_seconds?: number | null;
  contact_hidden?: boolean;
  preferred_timing?: string | null;
  photos: DoorPhoto[];
}

export interface DoorThread {
  customer: {
    id: string;
    name: string;
    email: string | null;
    phone: string | null;
    address: string | null;
    postcode: string | null;
  } | null;
  enquiries: {
    id: string;
    source: EnquirySource;
    received_at: string;
    title: string;
    stage: DoorStage;
    replies: number;
  }[];
  bookings: {
    id: string;
    reference: string;
    status: string;
    type: string;
    label: string;
    day: string;
    job_id: string | null;
  }[];
  quotes: {
    id: string;
    number: string | null;
    status: string | null;
    accepted: boolean;
    title: string | null;
    created_at: string;
    total?: number | null;
  }[];
  jobs: { id: string; title: string; status: string | null; start_date: string | null }[];
}

export interface DoorCounts {
  to_reply: number;
  urgent: number;
  oldest_at: string | null;
  week: number;
  first: { kind: DoorKind; id: string; name: string | null; at: string } | null;
}

export const DOOR_KEY = ['front-door'] as const;

export const STAGE_LABEL: Record<DoorStage, string> = {
  new: 'To reply',
  open: 'In touch',
  quoted: 'Quoted',
  job: 'Job made',
  won: 'Won',
  lost: 'Lost',
  closed: 'Closed',
  spam: 'Junk',
};

export function sourceLabel(i: Pick<DoorItem, 'source' | 'source_text' | 'kind'>): string {
  if (i.source === 'booking') return 'Online booking';
  if (i.kind === 'lead' && i.source === 'manual') return i.source_text || 'From Leads';
  return SOURCE_LABEL[i.source as EnquirySource] ?? 'Enquiry';
}

/** "Consumer unit" / the AI summary / the first line of what they wrote. */
export function itemTitle(i: DoorItem): string {
  const job = i.job_type && i.job_type !== 'Other' ? i.job_type : null;
  return job ?? i.summary ?? (i.details ? i.details.split('\n')[0].slice(0, 80) : 'Enquiry');
}

export function fullAddress(address: string | null, postcode: string | null): string {
  const a = (address ?? '').trim();
  const p = (postcode ?? '').trim();
  if (!a) return p;
  if (!p || a.toLowerCase().includes(p.toLowerCase())) return a;
  return `${a}, ${p}`;
}

/* ── Reads ──────────────────────────────────────────────────────────── */

export function useFrontDoor() {
  const { data: firm } = useOfficeFirmId();
  return useQuery({
    queryKey: [...DOOR_KEY, firm],
    enabled: !!firm,
    staleTime: 15_000,
    refetchInterval: 60_000,
    refetchOnWindowFocus: true,
    queryFn: () => call<FrontDoor>('get_firm_front_door', { p_firm: firm }),
  });
}

export function useFrontDoorCounts(enabled = true) {
  const { data: firm } = useOfficeFirmId();
  return useQuery({
    queryKey: [...DOOR_KEY, 'counts', firm],
    enabled: enabled && !!firm,
    staleTime: 30_000,
    refetchInterval: 120_000,
    retry: false,
    queryFn: () => call<DoorCounts>('get_firm_front_door_counts', { p_firm: firm }),
  });
}

export function useFrontDoorDetail(item: DoorItem | null) {
  return useQuery({
    queryKey: [...DOOR_KEY, 'item', item?.kind, item?.id],
    enabled: !!item,
    staleTime: 30_000,
    queryFn: () => call<DoorDetail>('get_front_door_item', { p_kind: item!.kind, p_id: item!.id }),
  });
}

export function useFrontDoorThread(item: DoorItem | null) {
  const { data: firm } = useOfficeFirmId();
  return useQuery({
    queryKey: [...DOOR_KEY, 'thread', firm, item?.customer_id, item?.email, item?.phone],
    enabled: !!firm && !!item && !!(item.customer_id || item.email || item.phone),
    staleTime: 30_000,
    queryFn: () =>
      call<DoorThread>('get_front_door_thread', {
        p_firm: firm,
        p_customer: item!.customer_id,
        p_email: item!.email,
        p_phone: item!.phone,
      }),
  });
}

/** Signed URLs for an item's photos (two private buckets, one hour). */
export function useDoorPhotoUrls(photos: DoorPhoto[] | undefined) {
  return useQuery({
    queryKey: [...DOOR_KEY, 'photos', photos],
    enabled: !!photos?.length,
    staleTime: 50 * 60_000,
    queryFn: async () => {
      const out: { url: string; photo: DoorPhoto }[] = [];
      for (const bucket of ['enquiry-photos', 'quote-page-photos'] as const) {
        const mine = photos!.filter((p) => p.bucket === bucket);
        if (!mine.length) continue;
        const { data } = await supabase.storage.from(bucket).createSignedUrls(
          mine.map((p) => p.path),
          3600
        );
        (data ?? []).forEach((d, i) => {
          if (d.signedUrl) out.push({ url: d.signedUrl, photo: mine[i] });
        });
      }
      return out;
    },
  });
}

/* ── Writes ─────────────────────────────────────────────────────────── */

function useInvalidate() {
  const qc = useQueryClient();
  return () => {
    qc.invalidateQueries({ queryKey: DOOR_KEY });
    // The Electrical Hub's own caches read the same rows.
    qc.invalidateQueries({ queryKey: ['enquiries'] });
    qc.invalidateQueries({ queryKey: ['customers'] });
    qc.invalidateQueries({ queryKey: ['employer-home'] });
  };
}

/** The enquiries row behind an item (made from an older lead or a booking if needed). */
async function adopt(item: DoorItem): Promise<string> {
  if (item.enquiry_id) return item.enquiry_id;
  return call<string>('adopt_front_door_item', { p_kind: item.kind, p_id: item.id });
}

/** The enquiries row, with the columns newer than the Electrical Hub's type. */
type EnquiryRow = Enquiry & {
  latitude?: number | null;
  longitude?: number | null;
  employer_job_id?: string | null;
};

async function loadEnquiry(id: string): Promise<EnquiryRow> {
  const { data, error } = await supabase
    .from('enquiries' as never)
    .select('*')
    .eq('id', id)
    .single();
  if (error) throw error;
  return data as unknown as EnquiryRow;
}

const norm = (v: string | null | undefined) => (v ?? '').trim();
const digits = (v: string | null | undefined) => (v ?? '').replace(/\D/g, '').replace(/^44/, '0');

/**
 * The customer for this enquiry: the linked or matched one, else one found by
 * email or phone, else a new one. Same rules as the Electrical Hub's "Add"
 * (useConvertEnquiry), without marking anything won.
 */
async function ensureCustomer(e: Enquiry): Promise<string> {
  let id = e.customer_id ?? e.matched_customer_id;
  if (!id) {
    const email = norm(e.email).toLowerCase();
    if (email) {
      const { data } = await supabase
        .from('customers')
        .select('id')
        .eq('user_id', e.user_id)
        .ilike(
          'email',
          email.replace(/[\\%_]/g, (m) => '\\' + m)
        )
        .order('created_at', { ascending: true })
        .limit(1);
      id = (data?.[0] as { id: string } | undefined)?.id ?? null;
    }
    const tail = digits(e.phone).slice(-10);
    if (!id && tail.length === 10) {
      const { data } = await supabase
        .from('customers')
        .select('id, phone')
        .eq('user_id', e.user_id)
        .ilike('phone', '%' + tail.slice(-6).split('').join('%'))
        .limit(100);
      id =
        (data as { id: string; phone: string | null }[] | null)?.find(
          (c) => digits(c.phone).slice(-10) === tail
        )?.id ?? null;
    }
  }
  if (!id) {
    const name = norm(e.name) || norm(e.email) || norm(e.phone);
    if (!name) throw new Error('Add a name, email or phone first.');
    const { data, error } = await supabase
      .from('customers')
      .insert({
        user_id: e.user_id,
        name,
        email: norm(e.email).toLowerCase() || null,
        phone: norm(e.phone) || null,
        address: norm(e.address) || null,
        postcode: norm(e.postcode) || null,
        notes: e.job_description
          ? `Enquiry (${SOURCE_LABEL[e.source] ?? 'Enquiry'}): ${e.job_description}`.slice(0, 2000)
          : null,
        tags: ['enquiry', e.source],
      } as never)
      .select('id')
      .single();
    if (error) throw error;
    id = (data as { id: string }).id;
  }
  if (e.customer_id !== id || e.status === 'new') {
    const { error } = await supabase
      .from('enquiries' as never)
      .update({
        customer_id: id,
        ...(e.status === 'new' ? { status: 'converted' } : {}),
      } as never)
      .eq('id', e.id);
    if (error) throw error;
  }
  return id;
}

async function markActioned(e: Enquiry, patch: Record<string, unknown>) {
  const { error } = await supabase
    .from('enquiries' as never)
    .update({
      ...patch,
      ...(e.first_actioned_at ? {} : { first_actioned_at: new Date().toISOString() }),
    } as never)
    .eq('id', e.id);
  if (error) throw error;
}

/** One tap: a draft quote with the customer, site, job and photos filled in. */
export function useQuoteFromDoor() {
  const done = useInvalidate();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async ({
      item,
      photos,
      vatRegistered,
      validityDays,
    }: {
      item: DoorItem;
      photos: DoorPhoto[];
      vatRegistered: boolean;
      validityDays: number;
    }): Promise<{ quote: Quote | null; existingId: string | null }> => {
      const e = await loadEnquiry(await adopt(item));
      // Already quoted: open that quote rather than starting a second one.
      if (e.quote_id) {
        const { data: q } = await supabase
          .from('quotes')
          .select('id, deleted_at')
          .eq('id', e.quote_id)
          .maybeSingle();
        if (q && !(q as { deleted_at: string | null }).deleted_at) {
          return { quote: null, existingId: e.quote_id };
        }
      }
      const customerId = await ensureCustomer(e);
      const title =
        e.job_type && e.job_type !== 'Other' ? e.job_type : e.summary?.slice(0, 120) || 'Enquiry';
      const vatRate = vatRegistered ? 20 : 0;
      const valid = new Date(Date.now() + validityDays * 86_400_000).toISOString().split('T')[0];
      const employerJobId = e.employer_job_id;
      const created = await createQuote({
        quote_number: '',
        client: norm(e.name) || norm(e.email) || 'Customer',
        client_address: fullAddress(e.address, e.postcode) || null,
        client_email: norm(e.email) || null,
        client_phone: norm(e.phone) || null,
        job_title: title,
        description: e.job_description ?? e.summary ?? null,
        value: 0,
        status: 'Draft',
        sent_date: null,
        valid_until: valid,
        job_id: employerJobId ?? null,
        created_by: null,
        line_items: [],
        notes: null,
        vat_rate: vatRate,
        subtotal: 0,
        vat_amount: 0,
        cis_amount: 0,
        settings: {
          vatRegistered,
          fromEnquiryId: e.id,
          ...(photos.length ? { enquiryPhotos: photos } : {}),
        },
      } as unknown as Omit<Quote, 'id' | 'created_at' | 'updated_at'>);
      // The quote's customer record (the auto-link trigger matches by name; be exact).
      await supabase
        .from('quotes')
        .update({ customer_id: customerId } as never)
        .eq('id', created.id);
      await markActioned(e, { quote_id: created.id, customer_id: customerId });
      return { quote: { ...created, settings: { vatRegistered, vatRate } }, existingId: null };
    },
    onSettled: () => {
      done();
      qc.invalidateQueries({ queryKey: ['quotes'] });
    },
  });
}

/** One tap: a firm job with the customer, site, job and photos carried. */
export function useJobFromDoor() {
  const done = useInvalidate();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async ({
      item,
      photos,
    }: {
      item: DoorItem;
      photos: DoorPhoto[];
    }): Promise<{ jobId: string; photosCopied: number; existed: boolean }> => {
      const e = await loadEnquiry(await adopt(item));
      if (e.employer_job_id) return { jobId: e.employer_job_id, photosCopied: 0, existed: true };
      if (item.kind === 'booking' && item.job_id) {
        await markActioned(e, { employer_job_id: item.job_id });
        return { jobId: item.job_id, photosCopied: 0, existed: true };
      }
      const customerId = await ensureCustomer(e);

      let jobId: string | null = null;
      // An accepted quote makes the job the usual way (links quote and job).
      if (e.quote_id && item.quote?.accepted) {
        jobId = (await createJobFromQuote(e.quote_id)).job_id;
      }
      if (!jobId) {
        const title =
          e.job_type && e.job_type !== 'Other' ? e.job_type : e.summary?.slice(0, 120) || 'Enquiry';
        const job = await createJob({
          title,
          client: norm(e.name) || norm(e.email) || 'Customer',
          client_phone: norm(e.phone) || null,
          client_email: norm(e.email) || null,
          location: fullAddress(e.address, e.postcode) || 'Address to confirm',
          lat: e.latitude ?? null,
          lng: e.longitude ?? null,
          status: 'Pending',
          progress: 0,
          start_date: null,
          end_date: null,
          value: 0,
          workers_count: 0,
          description: e.job_description ?? e.summary ?? null,
          customer_id: customerId,
        } as never);
        jobId = job.id;
        if (e.quote_id) await linkQuoteToJob(e.quote_id, jobId).catch(() => undefined);
      }
      await markActioned(e, { employer_job_id: jobId, customer_id: customerId });
      const photosCopied = await copyPhotosToJob(photos, jobId);
      return { jobId, photosCopied, existed: false };
    },
    onSettled: () => {
      done();
      qc.invalidateQueries({ queryKey: ['jobs'] });
      qc.invalidateQueries({ queryKey: ['jobPhotos'] });
    },
  });
}

/** Copy (never move) the enquiry's photos onto the job, as "Before" photos. */
async function copyPhotosToJob(photos: DoorPhoto[], jobId: string): Promise<number> {
  if (!photos.length) return 0;
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return 0;
  const firm = (await getActingEmployerId(user.id)) ?? user.id;
  let n = 0;
  for (const p of photos.slice(0, 10)) {
    try {
      const { data: blob, error } = await supabase.storage.from(p.bucket).download(p.path);
      if (error || !blob) continue;
      const ext = (p.path.split('.').pop() || 'jpg').toLowerCase().slice(0, 5);
      const path = `${user.id}/job-photos/${Date.now()}-${Math.random().toString(36).slice(2, 8)}.${ext}`;
      const up = await supabase.storage.from('job-photos').upload(path, blob, {
        cacheControl: '3600',
        upsert: false,
        contentType: blob.type || 'image/jpeg',
      });
      if (up.error) continue;
      const { error: rowErr } = await supabase.from('job_photos').insert({
        user_id: firm,
        job_id: jobId,
        filename: path,
        storage_path: path,
        category: 'Before',
        notes: 'From the enquiry',
        approved: false,
        shared_with_client: false,
      } as never);
      if (rowErr) {
        await supabase.storage
          .from('job-photos')
          .remove([path])
          .catch(() => undefined);
        continue;
      }
      n++;
    } catch {
      /* one bad photo never stops the job */
    }
  }
  return n;
}

/** Close, reopen or mark junk. Older leads and bookings are adopted first. */
export function useSetDoorStatus() {
  const done = useInvalidate();
  return useMutation({
    mutationFn: async ({
      item,
      status,
    }: {
      item: DoorItem;
      status: 'new' | 'dismissed' | 'spam' | 'converted';
    }) => {
      const id = await adopt(item);
      const { error } = await supabase
        .from('enquiries' as never)
        .update({ status } as never)
        .eq('id', id);
      if (error) throw error;
    },
    onSettled: done,
  });
}

/** Called / texted / emailed from the device: counts as replied. */
export function useMarkDoorReplied() {
  const done = useInvalidate();
  return useMutation({
    mutationFn: async (item: DoorItem) => {
      if (item.first_actioned_at) return;
      const id = await adopt(item);
      const { error } = await supabase
        .from('enquiries' as never)
        .update({ first_actioned_at: new Date().toISOString() } as never)
        .eq('id', id)
        .is('first_actioned_at', null);
      if (error) throw error;
    },
    onSettled: done,
  });
}

/** Email a reply from the app (enquiry-send-reply: firm name, Reply-To the firm). */
export function useEmailDoorReply() {
  const done = useInvalidate();
  return useMutation({
    mutationFn: async ({ item, message }: { item: DoorItem; message: string }) => {
      const id = await adopt(item);
      const { data, error } = await supabase.functions.invoke('enquiry-send-reply', {
        body: { enquiry_id: id, message },
      });
      if (error) {
        const ctx = (error as { context?: Response }).context;
        const detail = ctx ? await ctx.json().catch(() => null) : null;
        throw new Error(detail?.error ?? error.message);
      }
      return data;
    },
    onSettled: done,
  });
}

export interface NewEnquiry {
  name: string;
  phone?: string;
  email?: string;
  address?: string;
  postcode?: string;
  job_type?: string;
  details?: string;
}

/** A phone call or a word-of-mouth job, added by hand. */
export function useAddDoorEnquiry() {
  const done = useInvalidate();
  const { data: firm } = useOfficeFirmId();
  return useMutation({
    mutationFn: async (n: NewEnquiry) => {
      if (!firm) throw new Error('Still loading, try again.');
      const { data, error } = await supabase
        .from('enquiries' as never)
        .insert({
          user_id: firm,
          source: 'manual',
          status: 'new',
          name: n.name.trim(),
          phone: n.phone?.trim() || null,
          email: n.email?.trim().toLowerCase() || null,
          address: n.address?.trim() || null,
          postcode: n.postcode?.trim().toUpperCase() || null,
          job_type: n.job_type?.trim() || null,
          job_description: n.details?.trim() || null,
          raw_text: n.details?.trim() || null,
        } as never)
        .select('id')
        .single();
      if (error) throw error;
      return (data as { id: string }).id;
    },
    onSettled: done,
  });
}
