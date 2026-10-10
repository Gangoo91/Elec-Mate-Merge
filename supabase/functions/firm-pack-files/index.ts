// firm-pack-files (ELE-2076 / ELE-2069)
//
// Short-lived links to files in the private compliance-documents bucket, so a
// firm's pack works whoever uploaded the files. The bucket is own-folder read
// only ({uploader uid}/...), so an admin cannot sign a file the owner uploaded
// from the browser. This signs with the service role after checking access.
//
//   { mode: 'probe' }
//     -> { ok: true }. The app checks this before relying on the function.
//
//   { mode: 'share', token }
//     Signed out (the main contractor). Only while the share is live (not
//     stopped, not expired). Signs only the documents the share lists, and
//     only while they still belong to the firm that made it. Links last
//     10 minutes, so stopping a share recalls the files within minutes.
//     -> { status, links: { [document_id]: url } }
//
//   { mode: 'firm', document_ids }
//     Signed in, for the zips. Signs the firm's documents the caller manages
//     (my_employer_scope()). Links last 10 minutes.
//     -> { links: { [document_id]: url } }
//
// The bucket stays private. A file_url that is already a full https URL
// (older rows) is passed through; anything else that is not a storage path
// is ignored.
//
// A storage path is signed only when its first folder belongs to the firm
// that owns the document: the firm's own id (the owner's uid) or someone on
// that firm's team (employer_admins). Anyone can insert their own
// compliance_documents row, so without this a row holding another firm's
// path ({victimUid}/{ms}-{name}.pdf) would get a link to that firm's file.
// 20261010294100 stops such a path being saved; this stops one being signed.

import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.49.4';
import { corsHeaders } from '../_shared/cors.ts';
import { withSentry } from '../_shared/sentry.ts';

const BUCKET = 'compliance-documents';
const SECONDS = 600;
const UUID = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

const json = (body: unknown, status = 200) =>
  new Response(JSON.stringify(body), {
    status,
    headers: { ...corsHeaders, 'Content-Type': 'application/json' },
  });

type Doc = { id: string; user_id: string; file_url: string | null };

/** First folder of a storage path, or null when it is not `{uuid}/{file}`. */
function firstFolder(path: string): string | null {
  const parts = path.split('/');
  if (parts.length < 2 || !parts[parts.length - 1]) return null;
  return UUID.test(parts[0]) ? parts[0].toLowerCase() : null;
}

/**
 * For each firm (document user_id), the folders its files may be in: the
 * firm's own id and the user ids of everyone on its team (any status, so a
 * file uploaded by someone who has since left still works).
 */
// deno-lint-ignore no-explicit-any
async function firmFolders(admin: any, firms: string[]): Promise<Map<string, Set<string>>> {
  const out = new Map<string, Set<string>>();
  for (const f of firms) out.set(f.toLowerCase(), new Set([f.toLowerCase()]));
  if (!firms.length) return out;
  const { data, error } = await admin
    .from('employer_admins')
    .select('employer_id, user_id')
    .in('employer_id', firms);
  if (error) throw error;
  for (const r of (data ?? []) as Array<{ employer_id: string; user_id: string | null }>) {
    if (r.user_id)
      out.get(String(r.employer_id).toLowerCase())?.add(String(r.user_id).toLowerCase());
  }
  return out;
}

// deno-lint-ignore no-explicit-any
async function signAll(admin: any, docs: Doc[]): Promise<Record<string, string>> {
  const links: Record<string, string> = {};
  const paths: { id: string; path: string }[] = [];
  const folders = await firmFolders(admin, [...new Set(docs.map((d) => String(d.user_id)))]);
  for (const d of docs) {
    const f = (d.file_url ?? '').trim();
    if (!f) continue;
    if (/^https:\/\//i.test(f)) {
      links[d.id] = f;
      continue;
    }
    if (/^[a-z]+:/i.test(f) || f.includes('..') || f.startsWith('/')) continue;
    const folder = firstFolder(f);
    // Only a file in the document's own firm's folders.
    if (!folder || !folders.get(String(d.user_id).toLowerCase())?.has(folder)) continue;
    paths.push({ id: d.id, path: f });
  }
  if (paths.length) {
    const { data, error } = await admin.storage.from(BUCKET).createSignedUrls(
      paths.map((p) => p.path),
      SECONDS
    );
    if (error) throw error;
    (data ?? []).forEach((r: { signedUrl?: string | null; error?: string | null }, i: number) => {
      if (r?.signedUrl && !r.error) links[paths[i].id] = r.signedUrl;
    });
  }
  return links;
}

Deno.serve(
  withSentry('firm-pack-files', async (req) => {
    if (req.method === 'OPTIONS') return new Response('ok', { headers: corsHeaders });
    if (req.method !== 'POST') return json({ error: 'method' }, 405);

    let body: Record<string, unknown> = {};
    try {
      body = (await req.json()) ?? {};
    } catch {
      return json({ error: 'bad request' }, 400);
    }

    const mode = String(body.mode ?? '');
    if (mode === 'probe') return json({ ok: true });

    const url = Deno.env.get('SUPABASE_URL') ?? '';
    const serviceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? '';
    const admin = createClient(url, serviceKey, { auth: { persistSession: false } });

    if (mode === 'share') {
      const token = String(body.token ?? '');
      if (token.length < 24 || token.length > 200) return json({ status: 'not_found', links: {} });
      const { data: share } = await admin
        .from('employer_pack_shares')
        .select('id, employer_id, items, expires_at, revoked_at')
        .eq('token', token)
        .maybeSingle();
      if (!share) return json({ status: 'not_found', links: {} });
      if (share.revoked_at) return json({ status: 'revoked', links: {} });
      if (new Date(share.expires_at).getTime() <= Date.now())
        return json({ status: 'expired', links: {} });
      const ids = (Array.isArray(share.items) ? share.items : [])
        .map((i: { type?: string; document_id?: string }) =>
          i?.type === 'document' ? String(i.document_id ?? '') : ''
        )
        .filter((id: string) => UUID.test(id))
        .slice(0, 80);
      if (!ids.length) return json({ status: 'active', links: {} });
      const { data: docs, error } = await admin
        .from('compliance_documents')
        .select('id, user_id, file_url')
        .in('id', ids)
        .eq('user_id', share.employer_id);
      if (error) throw error;
      return json({ status: 'active', links: await signAll(admin, (docs ?? []) as Doc[]) });
    }

    if (mode === 'firm') {
      const auth = req.headers.get('Authorization') ?? '';
      const userClient = createClient(url, Deno.env.get('SUPABASE_ANON_KEY') ?? '', {
        global: { headers: { Authorization: auth } },
        auth: { persistSession: false },
      });
      const {
        data: { user },
      } = await userClient.auth.getUser();
      if (!user) return json({ error: 'not signed in' }, 401);
      const ids = (Array.isArray(body.document_ids) ? body.document_ids : [])
        .map((x) => String(x))
        .filter((id) => UUID.test(id))
        .slice(0, 200);
      if (!ids.length) return json({ links: {} });
      const { data: scope, error: scopeErr } = await userClient.rpc('my_employer_scope');
      if (scopeErr) throw scopeErr;
      const firms = (Array.isArray(scope) ? scope : [scope])
        .map((s: unknown) =>
          typeof s === 'string'
            ? s
            : String((s as Record<string, unknown>)?.my_employer_scope ?? '')
        )
        .filter((s: string) => UUID.test(s));
      if (!firms.length) return json({ links: {} });
      const { data: docs, error } = await admin
        .from('compliance_documents')
        .select('id, user_id, file_url')
        .in('id', ids)
        .in('user_id', firms);
      if (error) throw error;
      return json({ links: await signAll(admin, (docs ?? []) as Doc[]) });
    }

    return json({ error: 'unknown mode' }, 400);
  })
);
