/**
 * portal-photos-signed — anon photo delivery for the client portal.
 *
 * The client portal is a tokened, unauthenticated page; once the job-photos
 * bucket goes private, anon clients cannot mint signed URLs themselves.
 * This function validates the portal token via the existing SECURITY DEFINER
 * RPC (get_portal_photos — enforces is_active + per-category permission
 * toggles + shared_with_client), then signs the storage paths server-side.
 *
 * Works identically while the bucket is still public, so it ships ahead of
 * the flip. verify_jwt is off — access control is the portal token itself.
 */
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers':
    'authorization, x-client-info, apikey, content-type, x-supabase-timeout, x-request-id',
};

Deno.serve(async (req: Request) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  try {
    const { token } = await req.json().catch(() => ({}));
    if (!token || typeof token !== 'string') {
      return new Response(JSON.stringify({ error: 'token required' }), {
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    const admin = createClient(
      Deno.env.get('SUPABASE_URL')!,
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!
    );

    // Token validation + permission filtering live in the RPC — empty result
    // for an invalid/inactive token, so nothing leaks here.
    const { data: rows, error } = await admin.rpc('get_portal_photos', { p_token: token });
    if (error) {
      console.error('get_portal_photos failed:', error.message);
      return new Response(JSON.stringify({ error: 'lookup failed' }), {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    const photos = (rows ?? []) as Array<{
      id: string;
      storage_path: string | null;
      filename: string | null;
      category: string | null;
      notes: string | null;
      created_at: string;
    }>;

    const paths = photos
      .map((p) => p.storage_path)
      .filter((p): p is string => !!p && !/^https?:\/\//.test(p));

    const signedByPath = new Map<string, string>();
    if (paths.length) {
      const { data: signed, error: signErr } = await admin.storage
        .from('job-photos')
        .createSignedUrls(paths, 3600);
      if (signErr) {
        console.error('createSignedUrls failed:', signErr.message);
      } else {
        for (const s of signed ?? []) {
          if (s.path && s.signedUrl) signedByPath.set(s.path, s.signedUrl);
        }
      }
    }

    const result = photos.map((p) => {
      let url = '';
      if (p.storage_path) {
        url = /^https?:\/\//.test(p.storage_path)
          ? p.storage_path
          : (signedByPath.get(p.storage_path) ?? '');
      }
      return { ...p, url };
    });

    return new Response(JSON.stringify({ photos: result }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  } catch (err) {
    console.error('portal-photos-signed error:', err);
    return new Response(JSON.stringify({ error: 'unexpected error' }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
