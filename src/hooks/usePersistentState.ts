import { useEffect, useState } from 'react';
import { storageGetJSONSync, storageSetJSONSync } from '@/utils/storage';

// A tiny persistent state hook backed by Capacitor Preferences (native) or localStorage (web)
export function usePersistentState<T>(key: string, initial: T) {
  const [state, setState] = useState<T>(() => {
    try {
      return storageGetJSONSync(key, initial);
    } catch {
      return initial;
    }
  });

  useEffect(() => {
    try {
      storageSetJSONSync(key, state);
    } catch {
      // ignore write errors
    }
  }, [key, state]);

  return [state, setState] as const;
}
