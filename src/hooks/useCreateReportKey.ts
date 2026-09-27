import { useRef } from 'react';

/**
 * A stable `report_id` for a screen's first save, so a retry cannot create a
 * second certificate (ELE-1603).
 *
 * `reportCloud.createReport` accepts an idempotency key: supply the SAME
 * `report_id` on every attempt and a create that already landed is recognised
 * by the unique index on `report_id` and adopted instead of inserted again.
 * `useReportSync` derives its key from `_clientCertId`, which covers the
 * autosaving forms (EICR, EIC, Minor Works). The one-shot screens — the seven
 * notices, isolation, permit, heat pump, board schedule, the export dialogs,
 * the renewal seeds — called `createReport` with no key at all, so "Save"
 * pressed again through a failure was a second row every time.
 *
 * The key is minted lazily on the first `take()` and kept until `release()`.
 * A screen that keeps its created id in state (and so updates from then on)
 * never needs to release. A screen that can start ANOTHER certificate without
 * remounting MUST `release()` when it resets, or the next certificate would be
 * adopted onto the first one's row and its work silently never saved — the
 * exact hazard ELE-1592 removed from the autosave path.
 *
 * `scope` keeps independent keys on one screen (one per reminder on the
 * renewals book, say), so retrying one does not adopt another's row.
 */
export function useCreateReportKey(reportType: string) {
  const keys = useRef<Map<string, string>>(new Map());
  const prefix = reportType.toUpperCase();
  return {
    /** The same report_id for every attempt until `release()`. */
    take: (scope = ''): string => {
      const existing = keys.current.get(scope);
      if (existing) return existing;
      const minted = `${prefix}-${crypto.randomUUID()}`;
      keys.current.set(scope, minted);
      return minted;
    },
    /** Forget the key — after a successful create that will not be retried, or on a form reset. */
    release: (scope = '') => {
      keys.current.delete(scope);
    },
  };
}
