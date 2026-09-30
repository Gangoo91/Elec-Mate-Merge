import { useCallback, useEffect, useRef, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import type { LinkedCertificate } from '@/components/electrician-tools/diagram-builder/planResults';
import { certificateHref } from '@/utils/certificate-href';

// Typed as a plain string: the client's select-string parser recurses too
// deep on the JSON paths and fails the type check.
const COLUMNS: string =
  'id, report_id, report_type, certificate_number, updated_at, rows:data->scheduleOfTests, boards:data->distributionBoards, earthing:data->>earthingArrangement';

interface ReportRow {
  id: string;
  report_id: string;
  report_type: string;
  certificate_number: string | null;
  updated_at: string;
  rows: unknown;
  boards: unknown;
  earthing: string | null;
}

export interface PlanCertificateLink extends LinkedCertificate {
  href: string;
}

/**
 * The EIC started from this plan, with its readings (30 Sep 2026).
 *
 * The plan lives on the device and has no id, so the certificate records the
 * plan's sheet ids (formData.sourcePlan) and is found by any of them. Where
 * several were started from the plan, the most recently touched wins — that is
 * the one being filled in.
 *
 * Refetched when the sheets change, when the page comes back into view (the
 * electrician has been entering readings on the certificate), and on demand.
 */
export function usePlanCertificate(sheetIds: string[]) {
  const [cert, setCert] = useState<PlanCertificateLink | null>(null);
  const [loading, setLoading] = useState(false);
  const key = [...sheetIds].sort().join(',');
  const seq = useRef(0);

  const shownFor = useRef(key);
  const refresh = useCallback(async () => {
    const ids = key ? key.split(',') : [];
    const mine = ++seq.current;
    // Another plan (none of the same sheets): never show the last plan's
    // results on it while looking. A sheet added to this plan keeps them.
    if (shownFor.current !== key) {
      const before = new Set(shownFor.current ? shownFor.current.split(',') : []);
      if (!ids.some((id) => before.has(id))) setCert(null);
      shownFor.current = key;
    }
    if (!ids.length) {
      setCert(null);
      return;
    }
    setLoading(true);
    try {
      const found = await Promise.all(
        ids.map((id) =>
          supabase
            .from('reports')
            .select(COLUMNS)
            .eq('report_type', 'eic')
            .is('deleted_at', null)
            .contains('data', { sourcePlan: { sheetIds: [id] } })
            .order('updated_at', { ascending: false })
            .limit(1)
        )
      );
      if (mine !== seq.current) return;
      // No signal (normal on site): keep the last results rather than
      // clearing the drawing. Supabase reports a failure, it doesn't throw.
      if (found.every((r) => r.error)) return;
      const rows = found
        .flatMap((r) => (r.error ? [] : ((r.data ?? []) as unknown as ReportRow[])))
        .sort((a, b) => String(b.updated_at).localeCompare(String(a.updated_at)));
      const top = rows[0];
      setCert(
        top
          ? {
              id: top.id,
              certificateNumber: top.certificate_number ?? 'EIC',
              updatedAt: top.updated_at,
              rows: Array.isArray(top.rows) ? (top.rows as LinkedCertificate['rows']) : [],
              boards: Array.isArray(top.boards) ? (top.boards as LinkedCertificate['boards']) : [],
              earthing: top.earthing ?? '',
              href: certificateHref(top.report_type, top.report_id),
            }
          : null
      );
    } catch {
      // A failed lookup keeps what is already shown.
    } finally {
      if (mine === seq.current) setLoading(false);
    }
  }, [key]);

  useEffect(() => {
    void refresh();
  }, [refresh]);

  // Back from entering readings on the certificate: pick them up. Focus and
  // visibility both fire on the way back — once is enough.
  useEffect(() => {
    let last = 0;
    const onVisible = () => {
      if (document.visibilityState !== 'visible' || Date.now() - last < 3000) return;
      last = Date.now();
      void refresh();
    };
    document.addEventListener('visibilitychange', onVisible);
    window.addEventListener('focus', onVisible);
    return () => {
      document.removeEventListener('visibilitychange', onVisible);
      window.removeEventListener('focus', onVisible);
    };
  }, [refresh]);

  return { cert, loading, refresh };
}
