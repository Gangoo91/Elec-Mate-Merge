/**
 * ELE-2067 — Full export, built on the server (for firms too big to zip in
 * the browser). NOT DEPLOYED: Andrew deploys it.
 *
 * POST { include_files?: boolean }  with the owner's JWT.
 * Builds the same zip as src/lib/firmExport/buildExport.ts: one CSV per
 * record type (owner-only RPCs get_firm_export_manifest / export_firm_table,
 * called AS THE CALLER so the database's own owner check applies) plus every
 * file under the firm's folder in storage, uploads it to the private
 * data-exports bucket under <firm>/ and returns a signed link (24 hours).
 *
 * The caller can only export their own firm: the RPCs refuse anyone whose
 * auth.uid() is not the firm id, and the storage reads are limited to the
 * paths that manifest returned.
 */
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.49.4';
import * as JSZipNS from 'https://esm.sh/jszip@3.10.1';

interface ZipLike {
  file(name: string, data: string | Uint8Array): unknown;
  generateAsync(o: { type: 'uint8array'; compression: 'DEFLATE' }): Promise<Uint8Array>;
}
// esm.sh ships the CommonJS class as the module itself (or as .default).
const JSZip = ((JSZipNS as unknown as { default?: unknown }).default ??
  JSZipNS) as unknown as new () => ZipLike;
import { corsHeaders } from '../_shared/cors.ts';
import { identifyCaller, deny } from '../_shared/caller.ts';

const json = (body: unknown, status = 200) =>
  new Response(JSON.stringify(body), {
    status,
    headers: { ...corsHeaders, 'Content-Type': 'application/json' },
  });

interface ExportFile {
  bucket: string;
  path: string;
  size: number;
  public: boolean;
}

/**
 * A text cell a spreadsheet would run as a formula (=, +, -, @, tab, CR at
 * the start) gets a leading apostrophe so it opens as text. Plain numbers
 * stay as they are.
 */
function csvCell(v: unknown): string {
  if (v === null || v === undefined) return '';
  let s = typeof v === 'object' ? JSON.stringify(v) : String(v);
  if (typeof v !== 'number' && !/^-?\d+(\.\d+)?$/.test(s) && /^[=+\-@\t\r]/.test(s)) s = `'${s}`;
  return /[",\r\n]/.test(s) ? `"${s.replace(/"/g, '""')}"` : s;
}

function toCsv(rows: Record<string, unknown>[]): string {
  const cols = Array.from(
    rows.reduce((s, r) => (Object.keys(r).forEach((k) => s.add(k)), s), new Set<string>())
  );
  const out = [cols.map(csvCell).join(',')];
  for (const r of rows) out.push(cols.map((c) => csvCell(r[c])).join(','));
  return '\ufeff' + out.join('\r\n');
}

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') return new Response(null, { headers: corsHeaders });
  if (req.method !== 'POST') return json({ error: 'POST only' }, 405);

  const caller = await identifyCaller(req);
  if (!caller || caller.kind !== 'user') return deny(corsHeaders);
  const firm = caller.userId; // owner only: the firm id IS the owner's id

  let includeFiles = true;
  try {
    const body = await req.json();
    includeFiles = body?.include_files !== false;
  } catch {
    /* no body: defaults */
  }

  const url = Deno.env.get('SUPABASE_URL')!;
  const asCaller = createClient(url, Deno.env.get('SUPABASE_ANON_KEY')!, {
    global: { headers: { Authorization: req.headers.get('Authorization') ?? '' } },
    auth: { persistSession: false },
  });
  const admin = createClient(url, Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!, {
    auth: { persistSession: false },
  });

  const { data: manifest, error: mErr } = await asCaller.rpc('get_firm_export_manifest', {
    p_firm: firm,
  });
  if (mErr) return json({ error: mErr.message }, 403);
  const counts = (manifest as { counts: Record<string, number> }).counts;
  const files = ((manifest as { files: ExportFile[] }).files ?? []).filter((f) =>
    f.path.startsWith(`${firm}/`)
  );

  const zip = new JSZip();
  const got: Record<string, number> = {};

  for (const key of Object.keys(counts)) {
    const rows: Record<string, unknown>[] = [];
    for (let offset = 0; offset < Math.max(counts[key] ?? 0, 1); offset += 1000) {
      const { data, error } = await asCaller.rpc('export_firm_table', {
        p_firm: firm,
        p_key: key,
        p_offset: offset,
        p_limit: 1000,
      });
      if (error) return json({ error: `${key}: ${error.message}` }, 500);
      const page = (data ?? []) as Record<string, unknown>[];
      rows.push(...page);
      if (page.length < 1000) break;
    }
    got[key] = rows.length;
    if (rows.length) zip.file(`records/${key}.csv`, toCsv(rows));
  }

  let included = 0;
  const failed: string[] = [];
  if (includeFiles) {
    for (const f of files) {
      const { data, error } = await admin.storage.from(f.bucket).download(f.path);
      if (error || !data) {
        failed.push(`${f.bucket}/${f.path}: ${error?.message ?? 'not found'}`);
        continue;
      }
      zip.file(
        `files/${f.bucket}/${f.path.slice(firm.length + 1)}`,
        new Uint8Array(await data.arrayBuffer())
      );
      included++;
    }
  }

  zip.file(
    'README.txt',
    [
      'Full export from Elec-Mate',
      `Made ${new Date().toISOString()}`,
      '',
      ...Object.keys(got).map((k) => `${k.padEnd(20)} ${got[k]}`),
      '',
      includeFiles ? `Files: ${included} of ${files.length} included.` : 'Records only.',
      ...(failed.length ? ['', 'Not included:', ...failed] : []),
    ].join('\r\n')
  );

  const bytes = await zip.generateAsync({ type: 'uint8array', compression: 'DEFLATE' });
  const path = `${firm}/full-export-${Date.now()}.zip`;
  const { error: upErr } = await admin.storage.from('data-exports').upload(path, bytes, {
    contentType: 'application/zip',
    upsert: false,
  });
  if (upErr) return json({ error: upErr.message }, 500);
  const { data: signed, error: sErr } = await admin.storage
    .from('data-exports')
    .createSignedUrl(path, 60 * 60 * 24, {
      download: true,
    });
  if (sErr || !signed) return json({ error: sErr?.message ?? 'Could not sign the link' }, 500);

  return json({
    url: signed.signedUrl,
    size: bytes.byteLength,
    counts: got,
    files_included: included,
    files_failed: failed.length,
  });
});
