import { serve } from 'https://deno.land/std@0.168.0/http/server.ts';
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.49.4';
import { captureException } from '../_shared/sentry.ts';

/**
 * Removes Site Safety PDFs that no record points to any more.
 *
 * safety-documents (private) holds the PDFs generate-safety-record-pdf makes;
 * the record keeps the object PATH in <table>.pdf_url. A file is orphaned when
 * its record is deleted (an accident record's PDF holds injury details), when
 * the record is exported again (a new file, the link moves), or when the type
 * never stores a link (RIDDOR report, photo report: download-only). This sweep
 * deletes any such file older than 24 hours. Runs daily from pg_cron;
 * service role only.
 *
 * ⚠️ REWRITTEN 7 Oct 2026. The previous version (callable by any signed-in user)
 * would have DELETED LIVE DATA: it removed every safety-photos object missing
 * from safety_photos.storage_path (72 of 179 photos have none, and site-visit,
 * equipment and near-miss photos are not in that table at all), and compared
 * getPublicUrl() against pdf_url values that are PATHS, so every RAMS PDF and
 * safety PDF counted as orphaned. Photos and RAMS PDFs are deliberately NOT
 * swept here: their references live in too many places to prove an orphan.
 */

const SERVICE_KEY = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
const BUCKET = 'safety-documents';
// The tables that actually have a pdf_url column (checked 7 Oct 2026). The
// other safety types never stored a link, so their PDFs are download-only.
const TABLES = ['accident_records', 'coshh_assessments', 'inspection_records', 'permits_to_work', 'team_briefings'];
const GRACE_MS = 24 * 60 * 60 * 1000;

serve(async (req) => {
  if (req.headers.get('Authorization') !== `Bearer ${SERVICE_KEY}`) {
    return new Response(JSON.stringify({ error: 'Unauthorised' }), { status: 401 });
  }
  try {
    const supabase = createClient(Deno.env.get('SUPABASE_URL')!, SERVICE_KEY);
    const dryRun = new URL(req.url).searchParams.get('dry') === '1';

    // Every path a record still points to. A read failure aborts the run:
    // an incomplete set would make live PDFs look orphaned.
    const referenced = new Set<string>();
    for (const table of TABLES) {
      for (let from = 0; ; from += 1000) {
        const { data, error } = await supabase
          .from(table)
          .select('pdf_url')
          .not('pdf_url', 'is', null)
          .range(from, from + 999);
        if (error) throw new Error(`${table}: ${error.message}`);
        for (const r of data ?? []) {
          const v = String((r as { pdf_url: string }).pdf_url);
          // Path as stored, or the path inside an older full URL.
          referenced.add(v.includes(`/${BUCKET}/`) ? v.split(`/${BUCKET}/`)[1].split('?')[0] : v);
        }
        if (!data || data.length < 1000) break;
      }
    }

    const { data: folders, error: rootErr } = await supabase.storage.from(BUCKET).list('', { limit: 10000 });
    if (rootErr) throw rootErr;
    const cutoff = Date.now() - GRACE_MS;
    const orphans: string[] = [];
    let checked = 0;
    for (const folder of folders ?? []) {
      if (folder.id) continue; // a file at the root, not a user folder
      for (let offset = 0; ; offset += 1000) {
        const { data: files, error } = await supabase.storage
          .from(BUCKET)
          .list(folder.name, { limit: 1000, offset });
        if (error) throw error;
        for (const f of files ?? []) {
          if (!f.id) continue;
          checked++;
          const path = `${folder.name}/${f.name}`;
          const made = Date.parse(f.created_at ?? '');
          if (!referenced.has(path) && Number.isFinite(made) && made < cutoff) orphans.push(path);
        }
        if (!files || files.length < 1000) break;
      }
    }

    let removed = 0;
    if (!dryRun) {
      for (let i = 0; i < orphans.length; i += 100) {
        const { data, error } = await supabase.storage.from(BUCKET).remove(orphans.slice(i, i + 100));
        if (error) throw error;
        removed += data?.length ?? 0;
      }
    }

    // temp-pdfs: generate-temporary-pdf-link files back a 7-DAY signed link,
    // but the bucket is public (the investor deck link lives there), so an
    // old file stayed openable at its public URL for ever. Anything older than
    // 8 days is past its link and is removed. investor/ is left alone.
    const tempCutoff = Date.now() - 8 * 24 * 60 * 60 * 1000;
    const tempOld: string[] = [];
    const { data: tempFolders, error: tempErr } = await supabase.storage.from('temp-pdfs').list('', { limit: 10000 });
    if (tempErr) throw tempErr;
    for (const folder of tempFolders ?? []) {
      if (folder.id || folder.name === 'investor') continue;
      for (let offset = 0; ; offset += 1000) {
        const { data: files, error } = await supabase.storage.from('temp-pdfs').list(folder.name, { limit: 1000, offset });
        if (error) throw error;
        for (const f of files ?? []) {
          const made = Date.parse(f.created_at ?? '');
          if (f.id && Number.isFinite(made) && made < tempCutoff) tempOld.push(`${folder.name}/${f.name}`);
        }
        if (!files || files.length < 1000) break;
      }
    }
    let tempRemoved = 0;
    if (!dryRun) {
      for (let i = 0; i < tempOld.length; i += 100) {
        const { data, error } = await supabase.storage.from('temp-pdfs').remove(tempOld.slice(i, i + 100));
        if (error) throw error;
        tempRemoved += data?.length ?? 0;
      }
    }

    return new Response(
      JSON.stringify({ success: true, dryRun, checked, referenced: referenced.size, orphans: orphans.length, removed, tempOld: tempOld.length, tempRemoved }),
      { headers: { 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    await captureException(error, { functionName: 'cleanup-orphaned-storage' });
    console.error('[cleanup-orphaned-storage]', error);
    return new Response(JSON.stringify({ success: false, error: (error as Error).message }), { status: 500 });
  }
});
