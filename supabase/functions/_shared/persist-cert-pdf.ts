import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.49.4';
import { captureException, captureMessage } from './sentry.ts';

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
 *
 * Observability (ELE-1190): every failure path now reports to Sentry with the
 * exact stage (env / download / upload), the download HTTP status, the PDF byte
 * size and the elapsed time — so a "heavy EICR didn't persist" event surfaces
 * the real cause (size limit, expired/blocked download, transient upload error,
 * near-wall-clock duration) instead of vanishing into a silent null.
 */
export async function persistCertPdf(opts: {
  downloadUrl: string;
  authHeader: string | null;
  certType: string;
  certNumber?: string | null;
}): Promise<string | null> {
  const { downloadUrl, authHeader, certType, certNumber } = opts;
  const startedAt = Date.now();
  const base = { certType, certNumber: certNumber ?? null };

  const SUPABASE_URL = Deno.env.get('SUPABASE_URL');
  const SERVICE_KEY = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY');
  const ANON_KEY = Deno.env.get('SUPABASE_ANON_KEY');
  if (!SUPABASE_URL || !SERVICE_KEY) {
    console.error('[persistCertPdf] missing Supabase env');
    await captureMessage('persistCertPdf: missing Supabase env', 'error', {
      functionName: 'persistCertPdf',
      extra: { ...base, stage: 'env' },
      tags: { cert_persist: 'fail', persist_stage: 'env', cert_type: String(certType) },
    });
    return null;
  }

  // Tracked so a thrown error can report WHERE and with what shape it failed.
  let stage = 'init';
  let downloadStatus: number | null = null;
  let byteLength = 0;

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
    stage = 'download';
    const res = await fetch(downloadUrl);
    downloadStatus = res.status;
    if (!res.ok) throw new Error(`PDF download failed: HTTP ${res.status}`);
    const bytes = new Uint8Array(await res.arrayBuffer());
    byteLength = bytes.length;
    if (byteLength === 0) throw new Error('PDF download returned 0 bytes');

    const safe = (certNumber || `${certType}-${Date.now()}`).replace(/[^a-zA-Z0-9-_]/g, '_');
    const path = `${userId}/${safe}.pdf`;

    stage = 'upload';
    const admin = createClient(SUPABASE_URL, SERVICE_KEY);
    const { error: upErr } = await admin.storage
      .from('certificates')
      .upload(path, bytes, { contentType: 'application/pdf', upsert: true });
    if (upErr) throw upErr;

    const { data } = admin.storage.from('certificates').getPublicUrl(path);
    const durationMs = Date.now() - startedAt;
    console.log(
      `[persistCertPdf] ok ${certType} ${certNumber ?? ''} ${byteLength}B in ${durationMs}ms`
    );
    // cache-bust so re-generations don't serve a stale CDN copy
    return `${data.publicUrl}?v=${Date.now()}`;
  } catch (e) {
    const durationMs = Date.now() - startedAt;
    const message = (e as Error).message;
    console.error(`[persistCertPdf] FAILED at stage=${stage} (${durationMs}ms):`, message);
    // This is exactly the silent failure that left a 1-hour temp URL on heavy
    // certs (ELE-1190). Report it so we can see the real cause.
    await captureException(e instanceof Error ? e : new Error(String(e)), {
      functionName: 'persistCertPdf',
      extra: { ...base, stage, downloadStatus, byteLength, durationMs },
      tags: {
        cert_persist: 'fail',
        persist_stage: stage,
        cert_type: String(certType),
      },
    });
    return null;
  }
}
