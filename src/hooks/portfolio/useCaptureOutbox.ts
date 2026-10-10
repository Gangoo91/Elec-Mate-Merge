/**
 * useCaptureOutbox — the visible state of the capture outbox (ELE-1894).
 *
 * Returns what is waiting on this phone and a way to send it now. While any
 * component uses it, the outbox is sent automatically:
 *   - when the browser or the native network plugin says signal is back,
 *   - when the app comes back to the foreground (Capacitor appStateChange),
 *   - every 45 seconds while something is waiting and the app is open.
 * One runner per tab however many components mount the hook.
 *
 * Native background sending (app closed) needs a background-task plugin that
 * the app does not ship yet; until then items send the next time the app is
 * opened or brought forward.
 */
import { useCallback, useEffect, useState } from 'react';
import { Capacitor } from '@capacitor/core';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from '@/hooks/use-toast';
import {
  OUTBOX_CHANGED,
  OUTBOX_SYNCED,
  type SyncedItem,
  listCaptureOutbox,
  recoverInterrupted,
  retryOutboxItem,
  discardOutboxItem,
  syncCaptureOutbox,
  type OutboxItem,
} from '@/lib/portfolio/captureOutbox';

let runnerUid: string | null = null;
let runnerUsers = 0;
let teardown: (() => void) | null = null;

function startRunner(uid: string) {
  runnerUsers += 1;
  if (runnerUid === uid && teardown) return;
  teardown?.();
  runnerUid = uid;
  const kick = () => void syncCaptureOutbox(uid);
  const onVisible = () => {
    if (document.visibilityState === 'visible') kick();
  };
  // The sync result, wherever the learner is in the app.
  const onSynced = (e: Event) => {
    const done = ((e as CustomEvent<SyncedItem[]>).detail ?? []) as SyncedItem[];
    if (!done.length) return;
    toast({
      title:
        done.length === 1
          ? 'Synced to your portfolio'
          : `${done.length} items synced to your portfolio`,
      description:
        done.length === 1
          ? `${done[0].title}${done[0].hadOtj ? '. Hours sent to your tutor.' : ''}`
          : done
              .map((d) => d.title)
              .slice(0, 3)
              .join(', '),
    });
    for (const d of done.filter((x) => x.criteriaWarning)) {
      toast({
        title: `Some criteria not claimed: ${d.title}`,
        description: d.criteriaWarning,
        variant: 'destructive',
      });
    }
  };
  window.addEventListener(OUTBOX_SYNCED, onSynced);
  window.addEventListener('online', kick);
  document.addEventListener('visibilitychange', onVisible);
  const timer = window.setInterval(() => {
    void listCaptureOutbox(uid).then((items) => {
      if (items.some((i) => i.state === 'waiting')) kick();
    });
  }, 45_000);
  const nativeHandles: Array<{ remove: () => Promise<void> | void }> = [];
  if (Capacitor.isNativePlatform()) {
    void import('@capacitor/network')
      .then(({ Network }) =>
        Network.addListener('networkStatusChange', (s) => {
          if (s.connected) kick();
        })
      )
      .then((h) => nativeHandles.push(h))
      .catch(() => undefined);
    void import('@capacitor/app')
      .then(({ App }) =>
        App.addListener('appStateChange', (s) => {
          if (s.isActive) kick();
        })
      )
      .then((h) => nativeHandles.push(h))
      .catch(() => undefined);
  }
  void recoverInterrupted(uid).then(kick);
  teardown = () => {
    window.removeEventListener(OUTBOX_SYNCED, onSynced);
    window.removeEventListener('online', kick);
    document.removeEventListener('visibilitychange', onVisible);
    window.clearInterval(timer);
    for (const h of nativeHandles) void h.remove();
    teardown = null;
    runnerUid = null;
  };
}

function stopRunner() {
  runnerUsers = Math.max(0, runnerUsers - 1);
  if (runnerUsers === 0) teardown?.();
}

export interface CaptureOutboxState {
  items: OutboxItem[];
  waiting: number;
  sending: boolean;
  failed: number;
  online: boolean;
  syncNow: () => Promise<void>;
  retry: (id: string) => Promise<void>;
  discard: (id: string) => Promise<void>;
}

export function useCaptureOutbox(): CaptureOutboxState {
  const { user } = useAuth();
  const uid = user?.id ?? null;
  const [items, setItems] = useState<OutboxItem[]>([]);
  const [online, setOnline] = useState(() =>
    typeof navigator === 'undefined' ? true : navigator.onLine
  );

  const reload = useCallback(() => {
    if (!uid) return setItems([]);
    void listCaptureOutbox(uid).then(setItems);
  }, [uid]);

  useEffect(() => {
    reload();
    window.addEventListener(OUTBOX_CHANGED, reload);
    const on = () => setOnline(true);
    const off = () => setOnline(false);
    window.addEventListener('online', on);
    window.addEventListener('offline', off);
    return () => {
      window.removeEventListener(OUTBOX_CHANGED, reload);
      window.removeEventListener('online', on);
      window.removeEventListener('offline', off);
    };
  }, [reload]);

  useEffect(() => {
    if (!uid) return;
    startRunner(uid);
    return stopRunner;
  }, [uid]);

  const syncNow = useCallback(async () => {
    if (uid) await syncCaptureOutbox(uid, { includeFailed: true });
  }, [uid]);
  const retry = useCallback(
    async (id: string) => {
      if (uid) await retryOutboxItem(uid, id);
    },
    [uid]
  );
  const discard = useCallback(async (id: string) => {
    await discardOutboxItem(id);
  }, []);

  return {
    items,
    waiting: items.filter((i) => i.state !== 'failed').length,
    sending: items.some((i) => i.state === 'syncing'),
    failed: items.filter((i) => i.state === 'failed').length,
    online,
    syncNow,
    retry,
    discard,
  };
}
