// Cloud autosave for in-progress site visits (Site Visits v2, Slice 1).
//
// Modelled on useReportSync (the certs gold standard): localStorage stays the
// instant layer (useSiteVisit's 10s draft), this hook adds the cloud layer —
// debounced upsert via the atomic save_site_visit_atomic RPC, a periodic
// backup sync, and emergency flushes when the app backgrounds. Before this,
// nothing reached the cloud until the Generate step, and an Android WebView
// kill lost the entire visit (ELE-1069).

import { useCallback, useEffect, useRef, useState } from 'react';
import { Capacitor } from '@capacitor/core';
import { App as CapacitorApp } from '@capacitor/app';
import { supabase } from '@/integrations/supabase/client';
import type { SiteVisit } from '@/types/siteVisit';

export type SiteVisitCloudStatus = 'idle' | 'syncing' | 'synced' | 'offline' | 'error';

interface UseSiteVisitSyncOptions {
  visit: SiteVisit;
  /** Gate off autosave while a cloud copy is being loaded into state */
  isHydrating?: boolean;
  /** Disable entirely (e.g. completed visits in the edit page) */
  enabled?: boolean;
}

interface UseSiteVisitSyncReturn {
  cloudStatus: SiteVisitCloudStatus;
  lastCloudSync: Date | null;
  /** Force an immediate sync (e.g. before navigating to the quote wizard) */
  syncNow: () => Promise<boolean>;
}

const BACKUP_INTERVAL_MS = 30_000;

/** Network-aware change debounce — same tiers as useReportSync */
function getChangeDebounce(): number {
  try {
    const conn = (navigator as Navigator & { connection?: { effectiveType?: string } }).connection;
    switch (conn?.effectiveType) {
      case 'slow-2g':
      case '2g':
        return 12_000;
      case '3g':
        return 8_000;
      default:
        return 3_000;
    }
  } catch {
    return 3_000;
  }
}

const hasMinimumData = (v: SiteVisit): boolean =>
  Boolean(v.customerName || v.propertyAddress || v.rooms.length > 0);

export function useSiteVisitSync({
  visit,
  isHydrating = false,
  enabled = true,
}: UseSiteVisitSyncOptions): UseSiteVisitSyncReturn {
  const [cloudStatus, setCloudStatus] = useState<SiteVisitCloudStatus>('idle');
  const [lastCloudSync, setLastCloudSync] = useState<Date | null>(null);

  const visitRef = useRef(visit);
  const lastSyncedHashRef = useRef<string>('');
  const lastSyncedRoomCountRef = useRef(0);
  const debounceRef = useRef<ReturnType<typeof setTimeout>>();
  const inFlightRef = useRef(false);
  const isHydratingRef = useRef(isHydrating);

  // Only autosave visits that are still being captured — never let a stale
  // local 'in_progress' overwrite a status set by the Generate pipeline
  const isActive = enabled && visit.status === 'in_progress';

  useEffect(() => {
    visitRef.current = visit;
  }, [visit]);
  useEffect(() => {
    isHydratingRef.current = isHydrating;
  }, [isHydrating]);

  const syncToCloud = useCallback(async (): Promise<boolean> => {
    const v = visitRef.current;
    if (!v.id || isHydratingRef.current) return false;
    if (v.status !== 'in_progress') return false;
    if (!hasMinimumData(v)) return false;
    if (inFlightRef.current) return false;

    // Blank-overwrite guard: never replace a synced visit that had rooms
    // with one that suddenly has none and no client/address (state reset race)
    if (
      lastSyncedRoomCountRef.current > 0 &&
      v.rooms.length === 0 &&
      !v.customerName &&
      !v.propertyAddress
    ) {
      return false;
    }

    if (typeof navigator !== 'undefined' && !navigator.onLine) {
      setCloudStatus('offline');
      return false;
    }

    // Skip no-op syncs — cheap content hash
    const hash = JSON.stringify([
      v.customerId,
      v.customerName,
      v.propertyAddress,
      v.propertyPostcode,
      v.propertyType,
      v.accessNotes,
      v.assumptions,
      v.rooms,
      v.prompts,
      v.photos.map((p) => [p.id, p.photoUrl, p.storagePath, p.roomId, p.photoPhase]),
    ]);
    if (hash === lastSyncedHashRef.current) return true;

    inFlightRef.current = true;
    setCloudStatus('syncing');
    try {
      const { error } = await supabase.rpc('save_site_visit_atomic', {
        p_visit: JSON.parse(JSON.stringify(v)),
      });
      if (error) {
        console.error('[SiteVisitSync] Cloud sync failed:', error.message);
        setCloudStatus('error');
        return false;
      }
      lastSyncedHashRef.current = hash;
      lastSyncedRoomCountRef.current = v.rooms.length;
      setLastCloudSync(new Date());
      setCloudStatus('synced');
      return true;
    } catch (err) {
      console.error('[SiteVisitSync] Cloud sync error:', err);
      setCloudStatus(navigator.onLine ? 'error' : 'offline');
      return false;
    } finally {
      inFlightRef.current = false;
    }
  }, []);

  // Change-triggered sync (network-aware debounce)
  useEffect(() => {
    if (!isActive || isHydrating) return;
    if (!hasMinimumData(visit)) return;
    clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => void syncToCloud(), getChangeDebounce());
    return () => clearTimeout(debounceRef.current);
  }, [visit, isActive, isHydrating, syncToCloud]);

  // 30s backup sync + flush when connectivity returns
  useEffect(() => {
    if (!isActive) return;
    const interval = setInterval(() => void syncToCloud(), BACKUP_INTERVAL_MS);
    const onOnline = () => void syncToCloud();
    window.addEventListener('online', onOnline);
    return () => {
      clearInterval(interval);
      window.removeEventListener('online', onOnline);
    };
  }, [isActive, syncToCloud]);

  // Emergency flushes — backgrounding kills Android WebViews (the ELE-1069 path)
  useEffect(() => {
    if (!isActive) return;

    const onVisibility = () => {
      if (document.visibilityState === 'hidden') void syncToCloud();
    };
    const onPageHide = () => void syncToCloud();
    document.addEventListener('visibilitychange', onVisibility);
    window.addEventListener('pagehide', onPageHide);

    let removeAppListener: (() => void) | undefined;
    if (Capacitor.isNativePlatform()) {
      CapacitorApp.addListener('appStateChange', ({ isActive: appActive }) => {
        if (!appActive) void syncToCloud();
      }).then((handle) => {
        removeAppListener = () => void handle.remove();
      });
    }

    return () => {
      document.removeEventListener('visibilitychange', onVisibility);
      window.removeEventListener('pagehide', onPageHide);
      removeAppListener?.();
    };
  }, [isActive, syncToCloud]);

  return { cloudStatus, lastCloudSync, syncNow: syncToCloud };
}
