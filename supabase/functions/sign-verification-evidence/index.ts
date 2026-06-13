/**
 * sign-verification-evidence
 *
 * Public, no-login signer for the supervisor verification page. Once the
 * portfolio-evidence / evidence-files buckets are private, an anonymous visitor
 * can't mint signed storage URLs itself. This validates the verification token,
 * pulls the photos from THAT verification's snapshot, and returns a fresh signed
 * URL (1h) for each. Only paths that belong to the token's own snapshot are ever
 * signed — a caller can't ask to sign an arbitrary path.
 *
 * Deploy with --no-verify-jwt (runs without the app's auth context).
 *
 *   POST { token } -> { signed: { [originalUrl]: signedUrl } }
 *
 * Graceful by design: an invalid/expired token, or any signing failure, returns
 * an empty/partial map so the page still renders its metadata, and the original
 * (public) URLs keep working until the bucket is actually flipped.
 */

import { serve } from 'https://deno.land/std@0.190.0/http/server.ts';
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.45.0';

const SUPABASE_URL = Deno.env.get('SUPABASE_URL') ?? 'https://jtwygbeceundfgnkirof.supabase.co';
const SERVICE_ROLE = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? '';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers':
    'authorization, x-client-info, apikey, content-type, x-supabase-timeout, x-request-id',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
};

const json = (body: unknown, status = 200) =>
  new Response(JSON.stringify(body), {
    status,
    headers: { ...corsHeaders, 'Content-Type': 'application/json' },
  });

const EVIDENCE_BUCKETS = ['portfolio-evidence', 'evidence-files'] as const;
const SIGN_TTL_SECONDS = 3600;

/** Pull { bucket, path } out of a stored evidence reference (public/sign/authenticated URL). */
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

serve(async (req) => {
  if (req.method === 'OPTIONS') return new Response('ok', { headers: corsHeaders });

  try {
    const { token } = await req.json().catch(() => ({}));
    if (!token || typeof token !== 'string') return json({ error: 'missing_token' }, 400);

    const supabase = createClient(SUPABASE_URL, SERVICE_ROLE, {
      auth: { persistSession: false },
    });

    const { data: v, error } = await supabase
      .from('supervisor_verifications')
      .select('evidence_snapshot, is_active, expires_at')
      .eq('verification_token', token)
      .maybeSingle();

    // Invalid / inactive / expired: hand back nothing to sign. The page still
    // shows metadata; never leak signed URLs for a revoked link.
    if (
      error ||
      !v ||
      v.is_active !== true ||
      (v.expires_at && new Date(v.expires_at as string) < new Date())
    ) {
      return json({ signed: {} });
    }

    const snapshot = (v.evidence_snapshot ?? {}) as { photos?: unknown };
    const photos = Array.isArray(snapshot.photos)
      ? (snapshot.photos.filter((p) => typeof p === 'string') as string[])
      : [];

    const signed: Record<string, string> = {};
    for (const url of photos) {
      const ref = parseRef(url);
      if (!ref) {
        signed[url] = url; // not one of our buckets — pass through untouched
        continue;
      }
      const { data } = await supabase.storage
        .from(ref.bucket)
        .createSignedUrl(ref.path, SIGN_TTL_SECONDS);
      if (data?.signedUrl) signed[url] = data.signedUrl;
    }

    return json({ signed });
  } catch (e) {
    // Never hard-fail: fall back to the stored (public) URLs.
    return json({ signed: {}, error: String(e) });
  }
});
