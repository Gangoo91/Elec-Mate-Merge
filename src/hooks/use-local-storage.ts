import { useState } from 'react';
import { storageGetJSONSync, storageSetJSONSync } from '@/utils/storage';

export function useLocalStorage<T>(key: string, initialValue: T) {
  // Get from storage (sync read from in-memory cache on native, localStorage on web)
  const [storedValue, setStoredValue] = useState<T>(() => {
    try {
      return storageGetJSONSync(key, initialValue);
    } catch (error) {
      console.warn(`Error reading storage key "${key}":`, error);
      return initialValue;
    }
  });

  // Wrapped setter that persists to Capacitor Preferences (native) or localStorage (web)
  const setValue = (value: T | ((val: T) => T)) => {
    try {
      const valueToStore = value instanceof Function ? value(storedValue) : value;
      setStoredValue(valueToStore);
      storageSetJSONSync(key, valueToStore);
    } catch (error) {
      console.warn(`Error setting storage key "${key}":`, error);
    }
  };

  return [storedValue, setValue] as const;
}
