import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.49.4';

/**
 * Persist a freshly-generated PDF to the permanent `certificates` bucket and
 * return its permanent public URL.
 *
 * Why this exists (ELE-1082): PDFMonkey returns a presigned S3 URL that expires
 * in ONE HOUR (X-Amz-Expires=3600). Generators were returning that ephemeral
 * URL as the permanent `pdf_url`; the client-side `saveCertificatePdf` fallback
 * was best-effort and threw intermittently (silent catch), leaving the 1-hour
 * URL stored — so clients clicking the email link an hour later got
 * "AccessDenied / Request has expired".
 *
 * Doing the download+upload SERVER-SIDE (Deno fetch + service-role upload) is
 * reliable: no browser session, no client RLS, no CORS, no silent fallback.
 * Returns null on failure so the caller can fall back to the temp URL rather
 * than fail generation outright.
 */
export async function persistCertPdf(opts: {
  downloadUrl: string;
  authHeader: string | null;
  certType: string;
  certNumber?: string | null;
}): Promise<string | null> {
  const { downloadUrl, authHeader, certType, certNumber } = opts;
  const SUPABASE_URL = Deno.env.get('SUPABASE_URL');
  const SERVICE_KEY = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY');
  const ANON_KEY = Deno.env.get('SUPABASE_ANON_KEY');
  if (!SUPABASE_URL || !SERVICE_KEY) {
    console.error('[persistCertPdf] missing Supabase env');
    return null;
  }

  try {
    // Folder-scope to the owning user (matches the bucket's path convention).
    let userId = 'shared';
    if (authHeader && ANON_KEY) {
      try {
        const userClient = createClient(SUPABASE_URL, ANON_KEY, {
          global: { headers: { Authorization: authHeader } },
        });
        const { data } = await userClient.auth.getUser();
        if (data?.user?.id) userId = data.user.id;
      } catch (_) {
        /* fall through to 'shared' */
      }
    }

    // Download the PDF while the presigned URL is still fresh (instant post-gen).
    const res = await fetch(downloadUrl);
    if (!res.ok) throw new Error(`download ${res.status}`);
    const bytes = new Uint8Array(await res.arrayBuffer());
    if (bytes.length === 0) throw new Error('empty PDF');

    const safe = (certNumber || `${certType}-${Date.now()}`).replace(/[^a-zA-Z0-9-_]/g, '_');
    const path = `${userId}/${safe}.pdf`;

    const admin = createClient(SUPABASE_URL, SERVICE_KEY);
    const { error: upErr } = await admin.storage
      .from('certificates')
      .upload(path, bytes, { contentType: 'application/pdf', upsert: true });
    if (upErr) throw upErr;

    const { data } = admin.storage.from('certificates').getPublicUrl(path);
    // cache-bust so re-generations don't serve a stale CDN copy
    return `${data.publicUrl}?v=${Date.now()}`;
  } catch (e) {
    console.error('[persistCertPdf] failed:', (e as Error).message);
    return null;
  }
}
