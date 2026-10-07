// deno-lint-ignore-file no-explicit-any
/**
 * portfolio-export-pack (ELE-1881 / ELE-1883 / ELE-2017)
 *
 * POST { action: 'create', kind: 'evidence_pack' | 'gateway_pack', learnerId? }
 *   Starts a pack and returns { id } at once; the build runs in the
 *   background and writes its progress to portfolio_exports, which the app
 *   reads (RLS) until status is 'ready' or 'failed'.
 * POST { action: 'link', exportId, file: 'zip' | 'pdf' }
 *   A download link for a finished pack, valid for 24 hours. Packs never
 *   expire; links do.
 *
 * Who may ask: the apprentice for their own record, or staff who can assess
 * them (portfolio_export_access, run WITH THE CALLER'S JWT). Learner ids from
 * the client are only ever a request; the database decides.
 *
 * Gateway packs come in two copies (Andrew, 7 Oct): the apprentice may make
 * and download their own, which leaves out the college's filed funding and
 * contract documents (college_learner_evidence, staff-only under RLS); the
 * college's copy carries them. An apprentice can never download a copy staff
 * made, because that one holds the college's documents.
 */
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.49.4';
import { corsHeaders } from '../_shared/cors.ts';
import { identifyCaller } from '../_shared/caller.ts';
import { EXPORT_BUCKET, buildEvidencePack, buildGatewayPack, loadRecord, type PackKind } from './build.ts';

declare const EdgeRuntime: { waitUntil(p: Promise<unknown>): void };

const json = (body: unknown, status = 200) =>
  new Response(JSON.stringify(body), { status, headers: { ...corsHeaders, 'Content-Type': 'application/json' } });

const LINK_SECONDS = 60 * 60 * 24;
const STALE_MINUTES = 10;
const DAILY_LIMIT = 30;
const UUID = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') return new Response('ok', { headers: corsHeaders });
  if (req.method !== 'POST') return json({ error: 'Method not allowed' }, 405);

  try {
    const caller = await identifyCaller(req);
    if (!caller || caller.kind !== 'user') return json({ error: 'Sign in to export a portfolio.' }, 401);

    const url = Deno.env.get('SUPABASE_URL')!;
    const admin = createClient(url, Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!, {
      auth: { persistSession: false, autoRefreshToken: false },
    });
    const asCaller = createClient(url, Deno.env.get('SUPABASE_ANON_KEY')!, {
      global: { headers: { Authorization: req.headers.get('Authorization') ?? '' } },
      auth: { persistSession: false, autoRefreshToken: false },
    });

    const body = (await req.json().catch(() => ({}))) as Record<string, any>;
    const action = String(body.action ?? 'create');

    // ── A download link ────────────────────────────────────────────────────
    if (action === 'link') {
      const exportId = String(body.exportId ?? '');
      if (!UUID.test(exportId)) return json({ error: 'Unknown export.' }, 400);
      // RLS decides: learner_id = auth.uid() or _can_assess(learner_id).
      const { data: row } = await asCaller
        .from('portfolio_exports')
        .select('id, learner_id, kind, status, zip_path, pdf_path, requested_role')
        .eq('id', exportId)
        .maybeSingle();
      if (!row) return json({ error: 'Export not found.' }, 404);
      if (row.status !== 'ready') return json({ error: 'This pack is not ready yet.' }, 409);
      const access = await accessFor(asCaller, row.learner_id);
      if (!access) return json({ error: 'Export not found.' }, 404);
      // The college's copy of a gateway pack carries its own funding and contract
      // documents: only staff hand that one out. The apprentice downloads their own copy.
      if (row.kind === 'gateway_pack' && access === 'learner' && row.requested_role !== 'learner') {
        return json({ error: 'This copy was made by your college and holds its own documents. Make your own copy instead.' }, 403);
      }
      const file = body.file === 'pdf' ? 'pdf' : 'zip';
      const path = file === 'pdf' ? row.pdf_path : row.zip_path;
      if (!path) return json({ error: 'File missing.' }, 404);
      const { data: signed, error } = await admin.storage
        .from(EXPORT_BUCKET)
        .createSignedUrl(path, LINK_SECONDS, { download: path.split('/').pop() });
      if (error || !signed?.signedUrl) return json({ error: 'Could not make a download link.' }, 500);

      await admin.from('portfolio_exports').update({ downloaded_at: new Date().toISOString() }).eq('id', row.id);
      await admin.from('portfolio_audit_events').insert({
        learner_id: row.learner_id,
        actor_id: caller.userId,
        actor_role: access === 'learner' ? 'learner' : 'staff',
        action: 'export_downloaded',
        object_type: 'portfolio_export',
        object_id: row.id,
        summary: { kind: row.kind, file },
      });
      return json({ url: signed.signedUrl, expiresInSeconds: LINK_SECONDS });
    }

    if (action !== 'create') return json({ error: 'Unknown action.' }, 400);

    // ── Start a pack ───────────────────────────────────────────────────────
    const kind = (body.kind === 'gateway_pack' ? 'gateway_pack' : 'evidence_pack') as PackKind;
    const learnerId = body.learnerId ? String(body.learnerId) : caller.userId;
    if (!UUID.test(learnerId)) return json({ error: 'Unknown learner.' }, 400);

    const access = await accessFor(asCaller, learnerId);
    if (!access) return json({ error: 'You cannot export this record.' }, 403);

    // Tidy any build that died (function timeout) so it does not spin for ever.
    const staleBefore = new Date(Date.now() - STALE_MINUTES * 60_000).toISOString();
    await admin
      .from('portfolio_exports')
      .update({ status: 'failed', error: 'The build stopped before it finished. Try again.', completed_at: new Date().toISOString() })
      .eq('learner_id', learnerId)
      .eq('status', 'building')
      .lt('created_at', staleBefore);

    // One build at a time per learner, kind and copy: a second tap returns the first.
    const { data: running } = await admin
      .from('portfolio_exports')
      .select('id')
      .eq('learner_id', learnerId)
      .eq('kind', kind)
      .eq('requested_role', access)
      .eq('status', 'building')
      .limit(1)
      .maybeSingle();
    if (running) return json({ id: running.id, already: true });

    const { count } = await admin
      .from('portfolio_exports')
      .select('id', { count: 'exact', head: true })
      .eq('requested_by', caller.userId)
      .gte('created_at', new Date(Date.now() - 24 * 3600_000).toISOString());
    if ((count ?? 0) >= DAILY_LIMIT) {
      return json({ error: `You have made ${DAILY_LIMIT} packs today. Try again tomorrow.` }, 429);
    }

    const [{ data: prof }, { data: cs, error: csErr }] = await Promise.all([
      admin.from('profiles').select('full_name').eq('id', caller.userId).maybeSingle(),
      admin
        .from('college_students')
        .select('id, college_id, status, created_at')
        .eq('user_id', learnerId)
        .order('created_at', { ascending: false }),
    ]);
    if (csErr) console.error('college_students lookup', csErr);
    const student =
      (cs ?? []).find((s: any) => !['withdrawn', 'completed', 'archived'].includes(String(s.status ?? '').toLowerCase())) ??
      (cs ?? [])[0] ??
      null;
    const requestedByName = (prof?.full_name as string)?.trim() || caller.email || (access === 'learner' ? 'The apprentice' : 'College staff');
    const label = typeof body.label === 'string' ? body.label.slice(0, 80) : null;

    const { data: row, error: insErr } = await admin
      .from('portfolio_exports')
      .insert({
        learner_id: learnerId,
        college_student_id: student?.id ?? null,
        college_id: student?.college_id ?? null,
        kind,
        status: 'building',
        progress: 'Reading the record',
        requested_by: caller.userId,
        requested_by_name: requestedByName,
        requested_role: access,
        label,
      })
      .select('id')
      .single();
    if (insErr || !row) throw new Error(insErr?.message ?? 'Could not start the export');
    const exportId = row.id as string;

    const progress = async (msg: string) => {
      await admin.from('portfolio_exports').update({ progress: msg }).eq('id', exportId);
    };

    const work = (async () => {
      const startedAt = new Date().toISOString();
      try {
        const ctx = { admin, asCaller, learnerId, exportId, kind, access, requestedBy: caller.userId, requestedByName, progress };
        const rec = await loadRecord(ctx);
        const result = kind === 'gateway_pack' ? await buildGatewayPack(ctx, rec, startedAt) : await buildEvidencePack(ctx, rec, startedAt);
        await admin
          .from('portfolio_exports')
          .update({
            status: 'ready',
            progress: null,
            zip_path: result.zipPath,
            pdf_path: result.pdfPath,
            zip_bytes: result.zipBytes,
            pdf_pages: result.pdfPages,
            file_count: result.fileCount,
            zip_sha256: result.zipSha256,
            counts: result.counts,
            completed_at: new Date().toISOString(),
          })
          .eq('id', exportId);
        await admin.from('portfolio_audit_events').insert({
          learner_id: learnerId,
          actor_id: caller.userId,
          actor_role: access === 'learner' ? 'learner' : 'staff',
          action: kind === 'gateway_pack' ? 'gateway_pack_generated' : 'export_pack_generated',
          object_type: 'portfolio_export',
          object_id: exportId,
          summary: { kind, requested_by_name: requestedByName, files: result.fileCount, pdf_pages: result.pdfPages, ...result.counts },
          content_hash: result.zipSha256,
        });
      } catch (e) {
        console.error('portfolio-export-pack build failed', exportId, e);
        await admin
          .from('portfolio_exports')
          .update({
            status: 'failed',
            progress: null,
            error: e instanceof Error ? e.message.slice(0, 300) : 'The pack could not be built.',
            completed_at: new Date().toISOString(),
          })
          .eq('id', exportId);
      }
    })();
    EdgeRuntime.waitUntil(work);

    return json({ id: exportId });
  } catch (e) {
    console.error('portfolio-export-pack', e);
    return json({ error: e instanceof Error ? e.message : 'Something went wrong' }, 500);
  }
});

async function accessFor(asCaller: any, learnerId: string): Promise<'learner' | 'staff' | null> {
  const { data, error } = await asCaller.rpc('portfolio_export_access', { p_learner: learnerId });
  if (error) return null;
  return data === 'learner' || data === 'staff' ? data : null;
}
