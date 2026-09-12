/**
 * Saved calculator reports.
 * ────────────────────────────────────────────────────────────────────────
 * Every PDF an electrician generates is kept (see the `calculation_reports`
 * table and the `calculation-reports` bucket), because PDFMonkey's own
 * download link is an S3 presigned URL that expires — a report they saved, or
 * sent to a client, would otherwise stop opening.
 *
 * Reopening mints a fresh signed URL from Supabase rather than storing one:
 * a stored URL would expire in exactly the same way as the problem this
 * feature exists to solve.
 */

import { useCallback, useEffect, useState } from 'react';

import { supabase } from '@/integrations/supabase/client';

export interface SavedCalculationReport {
  id: string;
  title: string;
  subtitle: string | null;
  calculator_slug: string | null;
  storage_path: string;
  created_at: string;
}

const BUCKET = 'calculation-reports';
/** Fired by the PDF button after a report is stored, so any open list refreshes. */
export const CALCULATION_REPORT_SAVED = 'elecmate:calculation-report-saved';
/** An hour is plenty to open or forward one, and nothing is stored. */
const SIGNED_URL_TTL_SECONDS = 60 * 60;

export function useCalculationReports(limit = 25) {
  const [reports, setReports] = useState<SavedCalculationReport[]>([]);
  /** Total held, which may exceed what `limit` fetched — the drawer says so. */
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);

  const load = useCallback(async () => {
    setLoading(true);
    // RLS restricts this to the caller's own rows, so no user filter is needed
    // here — and adding one would silently mask a policy mistake.
    // `count: 'exact'` so the drawer can show how many exist rather than how many
    // were fetched — otherwise the header silently under-reports once someone has
    // produced more than `limit` reports.
    const { data, error, count } = await supabase
      .from('calculation_reports')
      .select('id, title, subtitle, calculator_slug, storage_path, created_at', {
        count: 'exact',
      })
      .order('created_at', { ascending: false })
      .limit(limit);
    if (error) console.error('[useCalculationReports] load failed', error);
    setReports(data ?? []);
    setTotal(count ?? data?.length ?? 0);
    setLoading(false);
  }, [limit]);

  useEffect(() => {
    void load();
  }, [load]);

  // A report generated while the drawer is already on screen would otherwise not
  // appear until the page was reloaded — the electrician makes a PDF, opens
  // "Saved reports", and it isn't there. The button announces a save rather than
  // the drawer polling, so the two stay decoupled.
  useEffect(() => {
    const onSaved = () => void load();
    window.addEventListener(CALCULATION_REPORT_SAVED, onSaved);
    return () => window.removeEventListener(CALCULATION_REPORT_SAVED, onSaved);
  }, [load]);

  const open = useCallback(async (report: SavedCalculationReport) => {
    const { data, error } = await supabase.storage
      .from(BUCKET)
      .createSignedUrl(report.storage_path, SIGNED_URL_TTL_SECONDS);
    if (error || !data?.signedUrl) {
      console.error('[useCalculationReports] could not sign', error);
      return null;
    }
    return data.signedUrl;
  }, []);

  const remove = useCallback(async (report: SavedCalculationReport) => {
    // The row goes first: it is what the list reads, so if the storage delete
    // fails the user still sees the report gone rather than a broken entry.
    const { error } = await supabase.from('calculation_reports').delete().eq('id', report.id);
    if (error) {
      console.error('[useCalculationReports] delete failed', error);
      return false;
    }
    setReports((prev) => prev.filter((r) => r.id !== report.id));
    setTotal((prev) => Math.max(0, prev - 1));
    // The PDF carries a client's name and site, so a failure to remove it matters
    // even though the row has gone; it needs a storage DELETE policy on the
    // bucket, and was failing silently before one existed.
    const { error: storageError } = await supabase.storage
      .from(BUCKET)
      .remove([report.storage_path]);
    if (storageError) {
      console.error('[useCalculationReports] row deleted but file remains', storageError);
    }
    return true;
  }, []);

  return { reports, total, loading, reload: load, open, remove };
}
