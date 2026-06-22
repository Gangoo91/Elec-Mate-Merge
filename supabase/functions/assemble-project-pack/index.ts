/**
 * assemble-project-pack — server-side merge of a project handover pack.
 *
 * The client builds the branded cover + expenses summary (jsPDF) and sends the
 * bytes here. This function gathers the project's linked document PDFs
 * (quotes, certificates, invoices), fetches each server-side (no browser CORS),
 * merges them after the cover with pdf-lib, uploads the result to the private
 * `pack-documents` bucket, and returns a short-lived signed URL plus a list of
 * what was included vs skipped (missing / expired / unreachable URLs).
 *
 * v2.0 scope: quotes + certificates + invoices. RAMS / site visits and
 * on-demand regeneration of expired PDFMonkey URLs are a v2.1 follow-up.
 */
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.49.4';
import { PDFDocument } from 'https://esm.sh/pdf-lib@1.17.1';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers':
    'authorization, x-client-info, apikey, content-type, x-supabase-timeout, x-request-id',
};

const json = (body: unknown, status = 200) =>
  new Response(JSON.stringify(body), {
    status,
    headers: { ...corsHeaders, 'Content-Type': 'application/json' },
  });

const base64ToBytes = (b64: string): Uint8Array => {
  const clean = b64.includes(',') ? b64.slice(b64.indexOf(',') + 1) : b64;
  const bin = atob(clean);
  const out = new Uint8Array(bin.length);
  for (let i = 0; i < bin.length; i++) out[i] = bin.charCodeAt(i);
  return out;
};

interface DocRef {
  label: string;
  url: string | null;
}

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') return new Response('ok', { headers: corsHeaders });

  try {
    const url = Deno.env.get('SUPABASE_URL')!;
    const anonKey = Deno.env.get('SUPABASE_ANON_KEY')!;
    const serviceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;

    // Caller identity (RLS-scoped client just for auth)
    const authHeader = req.headers.get('Authorization') ?? '';
    const caller = createClient(url, anonKey, { global: { headers: { Authorization: authHeader } } });
    const {
      data: { user },
    } = await caller.auth.getUser();
    if (!user) return json({ error: 'Not authenticated' }, 401);

    const { projectId, coverBase64, fileName } = await req.json();
    if (!projectId || !coverBase64) return json({ error: 'projectId and coverBase64 required' }, 400);

    const svc = createClient(url, serviceKey);

    // Ownership check — the project must belong to the caller.
    const { data: project, error: projErr } = await svc
      .from('spark_projects')
      .select('id, user_id, title')
      .eq('id', projectId)
      .single();
    if (projErr || !project || project.user_id !== user.id) {
      return json({ error: 'Project not found' }, 404);
    }

    // ── Gather linked document PDFs (handover order: certs → quotes → invoices) ──
    const docs: DocRef[] = [];

    const { data: certs } = await svc
      .from('reports')
      .select('id, report_type, pdf_url, created_at')
      .eq('project_id', projectId)
      .not('pdf_url', 'is', null)
      .order('created_at', { ascending: true });
    for (const c of certs ?? []) {
      docs.push({ label: (c.report_type || 'Certificate').toUpperCase().replace(/-/g, ' '), url: c.pdf_url });
    }

    const { data: quotes } = await svc
      .from('quotes')
      .select('id, quote_number, pdf_url, created_at')
      .eq('project_id', projectId)
      .not('pdf_url', 'is', null)
      .order('created_at', { ascending: true });
    for (const q of quotes ?? []) {
      docs.push({ label: `Quote ${q.quote_number ? '#' + q.quote_number : ''}`.trim(), url: q.pdf_url });
    }

    const { data: invoices } = await svc
      .from('invoices')
      .select('id, invoice_number, pdf_url, created_at')
      .eq('project_id', projectId)
      .not('pdf_url', 'is', null)
      .order('created_at', { ascending: true });
    for (const inv of invoices ?? []) {
      docs.push({ label: `Invoice ${inv.invoice_number ? '#' + inv.invoice_number : ''}`.trim(), url: inv.pdf_url });
    }

    // ── Merge: cover first, then each fetchable doc ──
    const merged = await PDFDocument.create();

    const appendPdf = async (bytes: Uint8Array): Promise<boolean> => {
      try {
        const src = await PDFDocument.load(bytes, { ignoreEncryption: true });
        const pages = await merged.copyPages(src, src.getPageIndices());
        pages.forEach((p) => merged.addPage(p));
        return true;
      } catch {
        return false;
      }
    };

    // Cover + expenses (from the client)
    const coverOk = await appendPdf(base64ToBytes(coverBase64));
    if (!coverOk) return json({ error: 'Invalid cover PDF' }, 400);

    const included: string[] = [];
    const skipped: string[] = [];
    for (const doc of docs) {
      if (!doc.url) {
        skipped.push(doc.label);
        continue;
      }
      try {
        const res = await fetch(doc.url);
        if (!res.ok) {
          skipped.push(doc.label);
          continue;
        }
        const bytes = new Uint8Array(await res.arrayBuffer());
        const ok = await appendPdf(bytes);
        (ok ? included : skipped).push(doc.label);
      } catch {
        skipped.push(doc.label);
      }
    }

    const mergedBytes = await merged.save();

    // ── Upload to the private pack-documents bucket → signed URL ──
    const safeName = String(fileName || `Project Pack - ${project.title}.pdf`).replace(
      /[/\\:*?"<>|]/g,
      '-'
    );
    const path = `${user.id}/${projectId}/${Date.now()}-${safeName}`;
    const { error: upErr } = await svc.storage
      .from('pack-documents')
      .upload(path, mergedBytes, { contentType: 'application/pdf', upsert: true });
    if (upErr) {
      return json({ error: `Upload failed: ${upErr.message}` }, 500);
    }

    const { data: signed, error: signErr } = await svc.storage
      .from('pack-documents')
      .createSignedUrl(path, 60 * 60 * 24); // 24h
    if (signErr || !signed?.signedUrl) {
      return json({ error: 'Could not sign pack URL' }, 500);
    }

    return json({ url: signed.signedUrl, included, skipped, pageCount: merged.getPageCount() });
  } catch (err) {
    return json({ error: (err as Error)?.message || 'Unexpected error' }, 500);
  }
});
