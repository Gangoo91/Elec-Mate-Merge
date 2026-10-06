/**
 * sign-shared-portfolio-evidence
 *
 * Public, no-login signer for the shared portfolio page (/view/:token), so the
 * page keeps showing photos and files once the portfolio-evidence bucket is
 * private (ELE-1861). Validates the share token, collects the file references
 * on the evidence THAT share covers (entry_ids / portfolio_item_id, or all of
 * the owner's evidence for a whole-portfolio share), and returns a fresh
 * signed URL (1h) for each. A caller can never ask for an arbitrary path.
 *
 * Deploy with --no-verify-jwt.
 *
 *   POST { token } -> { signed: { [originalUrl]: signedUrl } }
 *
 * Graceful: an invalid or expired token returns an empty map with 200, so the
 * page still renders its text.
 */
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.45.0';
import { withSentry } from '../_shared/sentry.ts';

const SUPABASE_URL = Deno.env.get('SUPABASE_URL') ?? 'https://jtwygbeceundfgnkirof.supabase.co';
const SERVICE_ROLE = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? '';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers':
    'authorization, x-client-info, apikey, content-type, x-supabase-timeout, x-request-id',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
};
const json = (body: unknown, status = 200) =>
  new Response(JSON.stringify(body), { status, headers: { ...corsHeaders, 'Content-Type': 'application/json' } });

const EVIDENCE_BUCKETS = ['portfolio-evidence', 'evidence-files', 'visual-uploads'] as const;
const SIGN_TTL_SECONDS = 3600;
const MAX_ITEMS = 500;

function parseRef(stored: string): { bucket: string; path: string } | null {
  const marker = '/storage/v1/object/';
  const idx = stored.indexOf(marker);
  if (idx === -1) return null;
  const rest = stored.slice(idx + marker.length).replace(/^(public|sign|authenticated)\//, '');
  for (const bucket of EVIDENCE_BUCKETS) {
    const prefix = `${bucket}/`;
    if (rest.startsWith(prefix)) {
      const path = decodeURIComponent(rest.slice(prefix.length).split('?')[0]);
      return path ? { bucket, path } : null;
    }
  }
  return null;
}

Deno.serve(
  withSentry('sign-shared-portfolio-evidence', async (req: Request) => {
    if (req.method === 'OPTIONS') return new Response('ok', { headers: corsHeaders });
    if (req.method !== 'POST') return json({ signed: {} }, 405);

    let token = '';
    try {
      token = String((await req.json())?.token ?? '').trim();
    } catch {
      return json({ signed: {} });
    }
    if (!token || token.length > 200) return json({ signed: {} });

    const admin = createClient(SUPABASE_URL, SERVICE_ROLE, { auth: { persistSession: false } });

    const { data: share } = await admin
      .from('portfolio_shares')
      .select('user_id, entry_ids, portfolio_item_id, is_active, expires_at')
      .eq('token', token)
      .maybeSingle();
    if (!share || !share.is_active || (share.expires_at && new Date(share.expires_at) < new Date())) {
      return json({ signed: {} });
    }

    const scope: string[] | null =
      Array.isArray(share.entry_ids) && share.entry_ids.length > 0
        ? share.entry_ids
        : share.portfolio_item_id
          ? [share.portfolio_item_id]
          : null;

    let q = admin
      .from('portfolio_items')
      .select('file_url, storage_urls')
      .eq('user_id', share.user_id)
      .order('created_at', { ascending: false })
      .limit(MAX_ITEMS);
    if (scope) q = q.in('id', scope);
    const { data: items } = await q;

    // Collect references; only files in the owner's own folder are ever signed.
    const byBucket = new Map<string, Map<string, string>>(); // bucket -> path -> original url
    const add = (url?: string | null) => {
      if (!url || typeof url !== 'string') return;
      const ref = parseRef(url);
      if (!ref) return;
      if (!ref.path.startsWith(`${share.user_id}/`)) return;
      if (ref.path.includes('..') || ref.path.includes('//') || /%2f/i.test(ref.path)) return;
      let m = byBucket.get(ref.bucket);
      if (!m) byBucket.set(ref.bucket, (m = new Map()));
      m.set(ref.path, url);
    };
    for (const it of items ?? []) {
      add(it.file_url as string | null);
      if (Array.isArray(it.storage_urls)) {
        for (const f of it.storage_urls as { url?: string }[]) add(f?.url);
      }
    }

    const signed: Record<string, string> = {};
    for (const [bucket, paths] of byBucket) {
      const { data } = await admin.storage.from(bucket).createSignedUrls([...paths.keys()], SIGN_TTL_SECONDS);
      for (const row of data ?? []) {
        const original = row.path ? paths.get(row.path) : undefined;
        if (original && row.signedUrl) signed[original] = row.signedUrl;
      }
    }
    return json({ signed });
  })
);
