import { useState, useEffect, useCallback } from 'react';
import { useToast } from '@/hooks/use-toast';
import { reportCloud } from '@/utils/reportCloud';
import { createNewVersion, getVersionNumber } from '@/utils/reportVersioning';
import { supabase } from '@/integrations/supabase/client';

interface UseCertLockOptions {
  /** The report_id string (what reportCloud / routing use). */
  reportId: string | null;
  /** The DB uuid, if the form already has it. Backfilled from getLockMeta otherwise. */
  databaseId?: string | null;
  /** Flush pending edits to the cloud before locking (e.g. syncNowImmediate). */
  flush?: () => Promise<unknown>;
  /**
   * Called after a new version is created. Each cert type implements its own
   * navigation here (routes differ per type).
   */
  onAmended?: (newReportId: string, version?: number) => void;
  /** Lets the form backfill its own DB uuid (e.g. for photo queries) when discovered. */
  onDatabaseId?: (id: string) => void;
}

/**
 * Certificate lock + versioning (ELE-1037), reusable across all cert types.
 *
 * - Loads lock/version metadata for the active report.
 * - `isLocked` should gate autosave: pass `enabled: !isLocked` to your sync hook.
 * - `lockReport()` flushes then marks the cert read-only ("Issue & lock").
 * - `amendReport()` creates a superseding version and calls `onAmended`.
 */
export function useCertLock({
  reportId,
  databaseId,
  flush,
  onAmended,
  onDatabaseId,
}: UseCertLockOptions) {
  const { toast } = useToast();
  const [lockedAt, setLockedAt] = useState<string | null>(null);
  const [editVersion, setEditVersion] = useState<number>(1);
  const [dbId, setDbId] = useState<string | null>(databaseId ?? null);
  const [userId, setUserId] = useState<string | null>(null);
  const [hasVersions, setHasVersions] = useState(false);
  const isLocked = !!lockedAt;

  // Resolve the current user once — every cert form gets lock for free without
  // threading userId through its own state.
  useEffect(() => {
    let cancelled = false;
    supabase.auth.getUser().then(({ data }) => {
      if (!cancelled) setUserId(data.user?.id ?? null);
    });
    return () => {
      cancelled = true;
    };
  }, []);

  // Keep the local uuid in sync when the form supplies one.
  useEffect(() => {
    if (databaseId) setDbId(databaseId);
  }, [databaseId]);

  // Load lock + version metadata whenever the active report changes.
  useEffect(() => {
    if (!reportId || !userId) {
      setLockedAt(null);
      setEditVersion(1);
      return;
    }
    let cancelled = false;
    reportCloud.getLockMeta(reportId, userId).then(async (meta) => {
      if (cancelled || !meta) return;
      setLockedAt(meta.lockedAt);
      // Part of a version chain if it has a parent (it's v2+) or has been
      // superseded (it has children).
      const inChain = !!(meta.parentReportId || meta.supersededBy);
      setHasVersions(inChain);
      if (meta.id) {
        setDbId((prev) => prev || meta.id);
        onDatabaseId?.(meta.id);
      }
      // Show the true version-chain position (V1, V2…), NOT reports.edit_version —
      // that's a per-save optimistic-lock counter, so a cert saved 5× before issue
      // would wrongly read "Version 5". Non-chain certs are V1 (no label shown).
      if (inChain && meta.id) {
        const chainVersion = await getVersionNumber(meta.id);
        if (!cancelled) setEditVersion(chainVersion);
      } else {
        setEditVersion(1);
      }
    });
    return () => {
      cancelled = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reportId, userId]);

  const lockReport = useCallback(async () => {
    if (!reportId || !userId) {
      toast({
        title: 'Save the certificate first',
        description: 'The certificate needs to be saved before it can be issued.',
        variant: 'destructive',
      });
      return;
    }
    // Per-company "QS approval required before issue" gate
    const { checkQsIssueGate, qsGateMessage } = await import('@/utils/qsGate');
    const gate = await checkQsIssueGate(reportId);
    if (gate.blocked) {
      toast({
        title: 'QS approval required',
        description: qsGateMessage(gate.companyName),
        variant: 'destructive',
      });
      return;
    }
    // Flush pending edits BEFORE locking so nothing is lost.
    try {
      await flush?.();
    } catch {
      /* best-effort flush; lock still proceeds */
    }
    const result = await reportCloud.lockReport(reportId, userId);
    if (result.success) {
      setLockedAt(result.lockedAt || new Date().toISOString());
      toast({
        title: 'Certificate issued & locked',
        description: 'This certificate is now read-only. To make changes, create a new version.',
      });
    } else {
      toast({
        title: 'Could not lock certificate',
        description: 'Please try again.',
        variant: 'destructive',
      });
    }
  }, [reportId, userId, flush, toast]);

  const amendReport = useCallback(async () => {
    if (!dbId || !userId) {
      toast({
        title: 'Cannot amend',
        description: 'The original certificate could not be found.',
        variant: 'destructive',
      });
      return;
    }
    const result = await createNewVersion(dbId, userId);
    if (result.success && result.newReportIdString) {
      toast({
        title: `Version ${result.version} created`,
        description: 'Now editing a new version. The issued certificate is preserved.',
      });
      onAmended?.(result.newReportIdString, result.version);
    } else {
      toast({
        title: 'Could not create new version',
        description: 'Please try again.',
        variant: 'destructive',
      });
    }
  }, [dbId, userId, onAmended, toast]);

  // Navigate to a specific version's report (reuses the cert's own routing).
  const openReport = useCallback(
    (targetReportId: string) => onAmended?.(targetReportId),
    [onAmended]
  );

  return {
    isLocked,
    lockedAt,
    editVersion,
    lockReport,
    amendReport,
    databaseId: dbId,
    openReport,
    hasVersions,
  };
}
