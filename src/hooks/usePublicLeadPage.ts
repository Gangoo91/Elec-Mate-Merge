import { useQuery, useMutation } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';

/**
 * Public quote page (/get-quote/:slug, ELE-1989). Everything here runs signed
 * out with the anon key. The database functions return public fields only and
 * do their own validation + rate limiting; nothing private about the firm is
 * ever sent to the browser.
 */

export interface LeadPageReview {
  rating: number;
  text: string | null;
  month: string;
}

export interface LeadPageData {
  found: boolean;
  slug?: string;
  company_name?: string;
  logo?: string | null;
  phone?: string | null;
  website?: string | null;
  headline?: string | null;
  about?: string | null;
  colour?: string | null;
  services?: string[];
  areas?: string[];
  trust?: {
    registration: { scheme: string; number: string | null } | null;
    insurance: { coverage: string | null } | null;
    trading_since: number | null;
    certificates: number | null;
    reviews: { count: number; average: number; items: LeadPageReview[] } | null;
  };
}

// Cast: these RPCs postdate the last types.ts regeneration.
const rpc = supabase.rpc.bind(supabase) as unknown as (
  fn: string,
  args?: Record<string, unknown>
) => Promise<{ data: unknown; error: { message: string } | null }>;

export const useLeadPage = (slug: string | undefined) =>
  useQuery({
    queryKey: ['lead-page', slug],
    enabled: !!slug,
    retry: 1,
    staleTime: 1000 * 60 * 5,
    queryFn: async (): Promise<LeadPageData> => {
      if (!slug) return { found: false };
      const { data, error } = await rpc('get_lead_page', { p_slug: slug });
      if (error) throw new Error(error.message);
      return (data as LeadPageData) ?? { found: false };
    },
  });

/** Count a view once per browser session (owner previews pass skip). */
export async function recordLeadPageView(slug: string) {
  const key = `qp-view:${slug}`;
  try {
    if (window.sessionStorage.getItem(key)) return;
    window.sessionStorage.setItem(key, '1');
  } catch {
    /* private mode: count it anyway */
  }
  try {
    await rpc('record_lead_page_view', { p_slug: slug });
  } catch {
    /* a missed view never matters to the visitor */
  }
}

/** Open a photo upload session; returns the storage folder to upload into. */
export async function beginLeadPageUpload(
  slug: string
): Promise<{ requestId: string; folder: string }> {
  const { data, error } = await rpc('begin_lead_page_upload', { p_slug: slug });
  if (error) throw new Error(error.message);
  const r = data as { ok: boolean; error?: string; request_id?: string; folder?: string };
  if (!r?.ok || !r.request_id || !r.folder) {
    throw new Error(
      r?.error === 'rate_limited'
        ? 'Too many photos sent from here just now. Send your request without them, or try again later.'
        : 'Photos are not available right now. You can still send your request.'
    );
  }
  return { requestId: r.request_id, folder: r.folder };
}

export async function uploadLeadPagePhoto(folder: string, blob: Blob, index: number) {
  const rand = Math.random().toString(36).slice(2, 10);
  const path = `${folder}/${index + 1}-${rand}.jpg`;
  const { error } = await supabase.storage
    .from('quote-page-photos')
    .upload(path, blob, { contentType: 'image/jpeg', upsert: false });
  if (error) throw new Error('A photo did not upload. Remove it and try again.');
  return path;
}

export interface QuoteRequestInput {
  slug: string;
  name: string;
  email: string;
  phone: string;
  jobType: string;
  details: string;
  postcode: string;
  timing: string;
  requestId: string | null;
  website: string; // honeypot
  elapsedMs: number;
}

const ERRORS: Record<string, string> = {
  name: 'Please add your name.',
  email: 'That email address does not look right.',
  phone: 'That phone number does not look right.',
  contact: 'Add a phone number or an email so they can reply.',
  links: 'Please remove the web links from your message.',
  rate_limited:
    'We have had a few requests from here already today. Please call them instead, or try again later.',
  not_found: 'This quote page has been switched off.',
};

export const useSubmitQuoteRequest = () =>
  useMutation({
    mutationFn: async (i: QuoteRequestInput) => {
      const { data, error } = await rpc('submit_quote_request', {
        p_slug: i.slug,
        p_name: i.name,
        p_email: i.email || null,
        p_phone: i.phone || null,
        p_job_type: i.jobType || null,
        p_details: i.details || null,
        p_postcode: i.postcode || null,
        p_timing: i.timing || null,
        p_request_id: i.requestId,
        p_website: i.website || null,
        p_elapsed_ms: Math.round(i.elapsedMs),
      });
      if (error) throw new Error('Could not send your request. Please try again.');
      const r = data as { ok: boolean; error?: string; reference?: string };
      if (!r?.ok) throw new Error(ERRORS[r?.error ?? ''] ?? 'Could not send your request.');
      return { reference: r.reference ?? null };
    },
  });
