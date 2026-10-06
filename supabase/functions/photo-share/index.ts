import { serve } from 'https://deno.land/std@0.168.0/http/server.ts';
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.49.4';
import { corsHeaders } from '../_shared/cors.ts';
import { captureException } from '../_shared/sentry.ts';

/**
 * Public customer share pages — the ONLY way an anonymous visitor reaches the
 * share tables:
 *   kind 'photos'     → photo_share_links   (/photos/:token)
 *   kind 'completion' → completion_signoffs (/completion/:token)
 *
 * Both pages used to read and write their table directly under anon policies
 * with NO token condition: any visitor could list every share (customer
 * names, emails, signatures, photo links) and rewrite any active one. Those
 * policies are dropped with the release that ships the page changes (see
 * supabase/migrations/pending/RELEASE_photo_share_and_safety_photos_private.sql).
 *
 * action 'get'  { kind, token } → that one share, photo links SIGNED for 2 h,
 *               without the owner id, client email or signer IP.
 * action 'sign' { kind, token, client_name, signature } → only an active,
 *               unexpired share; single use.
 */

const json = (b: unknown, status = 200) =>
  new Response(JSON.stringify(b), { status, headers: { ...corsHeaders, 'Content-Type': 'application/json' } });

const PATH = /\/storage\/v1\/object\/(?:public|sign)\/safety-photos\/([^?]+)/;

interface Kind {
  table: string;
  columns: string;
  /** May the customer sign this row? */
  signable: (row: Record<string, unknown>) => boolean;
  /** The signature image is the customer's own; show it back only once signed. */
  returnsSignature: boolean;
}
const KINDS: Record<string, Kind> = {
  photos: {
    table: 'photo_share_links',
    columns:
      'id, share_token, project_reference, title, message, company_name, photos_data, requires_signature, status, created_at, signed_at, client_name, expires_at, view_count',
    signable: (r) => !!r.requires_signature,
    returnsSignature: false,
  },
  completion: {
    table: 'completion_signoffs',
    columns:
      'id, share_token, title, scope_summary, before_photo_urls, after_photo_urls, company_name, company_logo_url, certificate_url, requires_signature, status, created_at, signed_at, client_name, signature_data, expires_at, view_count',
    signable: () => true,
    returnsSignature: true,
  },
};

serve(async (req) => {
  if (req.method === 'OPTIONS') return new Response('ok', { headers: corsHeaders });
  try {
    const supabase = createClient(Deno.env.get('SUPABASE_URL')!, Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!);
    const body = (await req.json()) as Record<string, unknown>;
    const kind = KINDS[typeof body.kind === 'string' ? body.kind : 'photos'];
    const token = typeof body.token === 'string' ? body.token.trim() : '';
    if (!kind || !token || token.length < 16) return json({ error: 'not_found' }, 404);

    const { data: share } = await supabase.from(kind.table).select(kind.columns).eq('share_token', token).maybeSingle();
    if (!share) return json({ error: 'not_found' }, 404);
    const row = share as unknown as Record<string, unknown>;
    const expired = !!row.expires_at && new Date(row.expires_at as string) < new Date();

    if (body.action === 'sign') {
      const name = typeof body.client_name === 'string' ? body.client_name.trim().slice(0, 120) : '';
      const sig = typeof body.signature === 'string' ? body.signature : '';
      if (row.status !== 'active' || expired) return json({ error: 'This link can no longer be signed.' }, 409);
      if (!kind.signable(row)) return json({ error: 'This share does not ask for a signature.' }, 400);
      if (!name || !sig.startsWith('data:image/png;base64,') || sig.length > 600_000)
        return json({ error: 'Add your name and signature.' }, 400);
      const signedAt = new Date().toISOString();
      const { data: updated, error } = await supabase
        .from(kind.table)
        .update({ signature_data: sig, client_name: name, signed_at: signedAt, status: 'signed' })
        .eq('id', row.id)
        .eq('status', 'active') // single use, even if two people sign at once
        .select('id');
      if (error) throw error;
      if (!updated?.length) return json({ error: 'This link has already been signed.' }, 409);
      return json({ success: true, signed_at: signedAt });
    }

    // 'get'
    if (row.status !== 'active' && row.status !== 'signed') return json({ state: 'expired' });
    if (row.status === 'active' && expired) return json({ state: 'expired' });

    const sign = async (url: unknown): Promise<string> => {
      const m = String(url ?? '').match(PATH);
      if (!m) return String(url ?? '');
      const { data } = await supabase.storage.from('safety-photos').createSignedUrl(decodeURIComponent(m[1]), 7200);
      return data?.signedUrl ?? '';
    };
    const out: Record<string, unknown> = { ...row };
    if (Array.isArray(row.photos_data)) {
      out.photos_data = (
        await Promise.all(
          (row.photos_data as Record<string, unknown>[]).map(async (p) => ({ ...p, file_url: await sign(p.file_url) }))
        )
      ).filter((p) => p.file_url);
    }
    for (const key of ['before_photo_urls', 'after_photo_urls']) {
      if (Array.isArray(row[key])) out[key] = (await Promise.all((row[key] as unknown[]).map(sign))).filter(Boolean);
    }
    if (!kind.returnsSignature || row.status !== 'signed') delete out.signature_data;

    if (row.status === 'active') {
      await supabase
        .from(kind.table)
        .update({ view_count: ((row.view_count as number) || 0) + 1, last_viewed_at: new Date().toISOString() })
        .eq('id', row.id);
    }
    delete out.expires_at;
    delete out.view_count;
    return json({ state: row.status === 'signed' ? 'signed' : 'viewing', share: out });
  } catch (error) {
    await captureException(error, { functionName: 'photo-share' });
    return json({ error: 'Something went wrong. Try again.' }, 500);
  }
});
