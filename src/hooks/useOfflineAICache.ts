import { useCallback, useEffect, useState } from 'react';
import {
  clearAll,
  getRecentAnswers,
  OFFLINE_AI_CACHE_LIMIT,
  saveAnswer,
  type OfflineAIAnswer,
} from '@/utils/offlineAICache';

/**
 * useOfflineAICache — React binding over the IndexedDB Q&A cache.
 *
 * Refreshes its local state after every save/clear so the history drawer can
 * display an "available offline" chip without stale counts. Online status is
 * also exposed so the chat can render a muted offline banner.
 */
export function useOfflineAICache() {
  const [entries, setEntries] = useState<OfflineAIAnswer[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isOnline, setIsOnline] = useState<boolean>(() => {
    if (typeof navigator === 'undefined') return true;
    return navigator.onLine;
  });

  const refresh = useCallback(async () => {
    const list = await getRecentAnswers();
    setEntries(list);
    setIsLoading(false);
  }, []);

  useEffect(() => {
    void refresh();
  }, [refresh]);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const goOnline = () => setIsOnline(true);
    const goOffline = () => setIsOnline(false);
    window.addEventListener('online', goOnline);
    window.addEventListener('offline', goOffline);
    return () => {
      window.removeEventListener('online', goOnline);
      window.removeEventListener('offline', goOffline);
    };
  }, []);

  const save = useCallback(
    async (entry: Parameters<typeof saveAnswer>[0]) => {
      const record = await saveAnswer(entry);
      await refresh();
      return record;
    },
    [refresh]
  );

  const clear = useCallback(async () => {
    await clearAll();
    await refresh();
  }, [refresh]);

  return {
    entries,
    isLoading,
    isOnline,
    limit: OFFLINE_AI_CACHE_LIMIT,
    save,
    clear,
    refresh,
  };
}

export type UseOfflineAICacheReturn = ReturnType<typeof useOfflineAICache>;
