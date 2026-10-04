// ELE-400, ELE-401, ELE-405, ELE-408, ELE-1812
// User Data Export — GDPR Art. 15 (Right of Access) & Art. 20 (Data Portability)
//
// Builds a ZIP of everything the user holds (see _shared/data-export-zip.ts),
// keeps it privately in `data-exports/<uid>/` for 7 days, emails a download
// link and returns the same link to the app.
//
// Records are fetched one table at a time (export_user_data_counts →
// export_user_table) and compressed as they arrive: the heaviest real account
// holds 45 MB across 130 tables, which the old all-in-one jsonb + JSZip path
// could not build inside the edge runtime's CPU and memory limits.

import { serve } from 'https://deno.land/std@0.190.0/http/server.ts';
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.39.3';
import { Resend } from '../_shared/mailer.ts';
import { captureException } from '../_shared/sentry.ts';
import { accountEmailHtml, escapeHtml } from '../_shared/account-email.ts';
import {
  ZipWriter,
  sectionName,
  sortTables,
  summaryHtml,
  toCsv,
  type ExportFile,
  type SummarySection,
} from '../_shared/data-export-zip.ts';

const resend = new Resend(Deno.env.get('RESEND_API_KEY'));

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

const LINK_SECONDS = 60 * 60 * 24 * 7;
const ROW_CAP = 20000; // must match export_user_table()
const FILE_CAP = 1000;
// Same rule as export_user_table(): credentials never leave in an export.
const SECRET_COL = /(encrypted|secret|password|api_key|(^|_)token$)/i;
const stripSecrets = (row: Record<string, unknown>) =>
  Object.fromEntries(Object.entries(row).filter(([k]) => !SECRET_COL.test(k)));

serve(async (req: Request): Promise<Response> => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const authHeader = req.headers.get('Authorization');
    if (!authHeader) return json({ error: 'Not authenticated' }, 401);

    const supabaseAdmin = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? '',
      { auth: { persistSession: false, autoRefreshToken: false } }
    );

    const token = authHeader.replace('Bearer ', '');
    const { data: userData, error: userError } = await supabaseAdmin.auth.getUser(token);
    if (userError || !userData.user) return json({ error: 'Invalid token' }, 401);

    const userId = userData.user.id;
    const userEmail = userData.user.email ?? '';
    const exportedAt = new Date().toISOString();
    const bucket = supabaseAdmin.storage.from('data-exports');

    // A second tap (or a script) shouldn't rebuild the ZIP and send another
    // email straight away.
    const { data: existing } = await bucket.list(userId);
    const recent = (existing ?? []).find(
      (o: { created_at?: string }) =>
        o.created_at && Date.now() - new Date(o.created_at).getTime() < 2 * 60 * 1000
    );
    if (recent) {
      return json(
        {
          error:
            'You exported your data a moment ago — check your email for the download link, or try again in a couple of minutes.',
          code: 'too_soon',
        },
        429
      );
    }

    console.log(`📦 GDPR data export started for user ${userId}`);

    // --- Profile (keyed by id, not user_id) and peer conversations where they
    // were the supporter (keyed by the supporter record) ---
    const { data: profileRow } = await supabaseAdmin
      .from('profiles')
      .select('*')
      .eq('id', userId)
      .maybeSingle();
    const profile = profileRow ? stripSecrets(profileRow as Record<string, unknown>) : null;

    const { data: supporter } = await supabaseAdmin
      .from('mental_health_peer_supporters')
      .select('id')
      .eq('user_id', userId)
      .maybeSingle();
    const { data: supporterConversations } = supporter?.id
      ? await supabaseAdmin
          .from('mental_health_peer_conversations')
          .select('*')
          .eq('supporter_id', supporter.id)
      : { data: [] };

    // --- Which tables hold their rows ---
    const { data: counts, error: countsError } = await supabaseAdmin.rpc(
      'export_user_data_counts',
      { p_user: userId }
    );
    if (countsError) throw new Error(`export_user_data_counts: ${countsError.message}`);
    const totals = (counts ?? {}) as Record<string, number>;

    // --- Files: newest first, signed in one call per bucket ---
    const { data: fileRows } = await supabaseAdmin.rpc('export_user_files', { p_user: userId });
    const allFiles = (fileRows ?? []) as ExportFile[];
    const files = allFiles.slice(0, FILE_CAP);
    const byBucket = new Map<string, ExportFile[]>();
    for (const f of files) byBucket.set(f.bucket, [...(byBucket.get(f.bucket) ?? []), f]);
    for (const [b, list] of byBucket) {
      const { data: signed } = await supabaseAdmin.storage.from(b).createSignedUrls(
        list.map((f) => f.path),
        LINK_SECONDS
      );
      list.forEach((f, i) => (f.downloadUrl = signed?.[i]?.signedUrl ?? null));
    }

    // --- Build the ZIP, one table at a time ---
    const zip = new ZipWriter();
    const sections: SummarySection[] = [];
    for (const table of sortTables(Object.keys(totals))) {
      const { data: rows, error } = await supabaseAdmin.rpc('export_user_table', {
        p_user: userId,
        p_table: table,
      });
      if (error) throw new Error(`export_user_table(${table}): ${error.message}`);
      const list = (rows ?? []) as Record<string, unknown>[];
      if (!list.length) continue;
      const csv = `spreadsheets/${sectionName(table).replace(/[\\/:*?"<>|]+/g, '-')}.csv`;
      await zip.add(csv, toCsv(list));
      await zip.add(`data/${table}.json`, JSON.stringify(list, null, 1));
      sections.push({ table, rows: list.length, total: Number(totals[table]) || list.length, csv });
    }
    if (profile) await zip.add('spreadsheets/Your profile.csv', toCsv([profile]));

    await zip.add(
      'data/_account.json',
      JSON.stringify(
        {
          exportedAt,
          exportVersion: '4.0',
          userId,
          dataController: {
            name: 'Elec-Mate Ltd',
            icoRegistration: 'ZB935897',
            contact: 'info@elec-mate.com',
          },
          gdprNote:
            'This export fulfils your right of access (UK GDPR Article 15) and right to data portability (Article 20).',
          profile,
          peerConversationsAsSupporter: supporterConversations ?? [],
          tables: sections.map((s) => ({
            table: s.table,
            file: `data/${s.table}.json`,
            rows: s.rows,
            rowsHeld: s.total,
          })),
          files,
          filesHeld: allFiles.length,
          filesNote: 'Download links expire 7 days after the export was made.',
        },
        null,
        2
      )
    );

    const name = String(profile?.full_name ?? '').trim();
    await zip.add(
      'Read me first.html',
      summaryHtml({ name, exportedAt, sections, files, filesTotal: allFiles.length })
    );

    const bytes = zip.finish();
    const zipName = `elec-mate-data-${exportedAt.slice(0, 10)}.zip`;

    // One export at a time — replace any earlier ZIP for this account.
    if (existing?.length) {
      await bucket.remove(existing.map((o: { name: string }) => `${userId}/${o.name}`));
    }
    const path = `${userId}/${zipName}`;
    const up = await bucket.upload(path, bytes, { contentType: 'application/zip', upsert: true });
    if (up.error) throw new Error(`upload: ${up.error.message}`);
    const { data: signedZip, error: signError } = await bucket.createSignedUrl(path, LINK_SECONDS, {
      download: zipName,
    });
    if (signError || !signedZip?.signedUrl) throw new Error('could not sign the download link');
    const zipUrl = signedZip.signedUrl;

    // --- Audit log ---
    const { error: auditError } = await supabaseAdmin.from('security_audit_log').insert({
      user_id: userId,
      action: 'gdpr_data_export',
      table_name: 'all',
      record_id: userId,
      metadata: {
        exportedAt,
        tables: sections.length,
        rows: sections.reduce((s, x) => s + x.rows, 0),
        files: allFiles.length,
        zipBytes: bytes.length,
      },
    });
    if (auditError) console.warn('Audit log write failed (non-critical):', auditError.message);

    // --- Email the link ---
    if (userEmail) {
      const firstName = name.split(/\s+/)[0];
      const when = new Date(exportedAt).toLocaleString('en-GB', {
        timeZone: 'Europe/London',
        dateStyle: 'long',
        timeStyle: 'short',
      });
      const count = (t: string) => (Number(totals[t]) || 0).toLocaleString('en-GB');
      const html = accountEmailHtml({
        title: 'Your Elec-Mate data',
        eyebrow: 'Your data',
        heading: 'Your Elec-Mate data<br>is ready to download',
        firstName: firstName || undefined,
        paragraphs: [
          `You asked for a copy of your data on <strong style="color:#0C1B2A;">${escapeHtml(when)}</strong>. Here it is — everything we hold about you and your work in Elec-Mate.`,
        ],
        panel: {
          label: 'Download',
          title: 'One ZIP file, ready to open',
          body: 'Open <strong>Read me first</strong> inside for a summary. Every kind of record is a spreadsheet that opens in Excel, and there are links to your photos and documents. This link works for 7 days.',
          button: { text: 'Download your data', url: zipUrl },
        },
        facts: [
          { k: 'Certificates and reports', v: count('reports') },
          { k: 'Quotes', v: count('quotes') },
          { k: 'Invoices', v: count('invoices') },
          { k: 'Clients', v: count('customers') },
          { k: 'Photos and documents', v: allFiles.length.toLocaleString('en-GB') },
          {
            k: 'File size',
            v: `${Math.max(0.1, bytes.length / 1048576).toFixed(1)} MB`,
          },
        ],
        note: {
          title: 'Didn’t ask for this?',
          body: 'Reply to this email straight away and change your password — someone may have access to your account.',
        },
      });
      try {
        await resend.emails.send({
          from: 'Elec-Mate <founder@elec-mate.com>',
          to: [userEmail],
          subject: 'Your Elec-Mate data is ready to download',
          html,
        });
      } catch (err) {
        console.warn('Export email failed (non-critical):', err);
      }
    }

    console.log(
      `✅ GDPR data export for ${userId}: ${sections.length} tables, ${allFiles.length} files, ${(bytes.length / 1048576).toFixed(1)} MB`
    );

    // Older app builds save this response as a .json file, so it has to read
    // sensibly on its own — they'll be in use for months.
    return json({
      message:
        'Your Elec-Mate data is in a ZIP file. Download it from zipUrl below — the link works for 7 days, and we have emailed it to you too.',
      zipUrl,
      zipName,
      exportedAt,
      tables: sections.length,
      files: allFiles.length,
    });
  } catch (error) {
    await captureException(error, {
      functionName: 'user-data-export',
      requestUrl: req.url,
      requestMethod: req.method,
    });
    console.error('Data export error:', error);
    return json(
      {
        error:
          'We couldn’t build your export just now. Please try again in a few minutes, or email info@elec-mate.com and we’ll send it to you.',
      },
      500
    );
  }
});
