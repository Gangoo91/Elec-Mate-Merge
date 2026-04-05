import { useState, useEffect, useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { storageGetJSONSync, storageSetJSONSync } from '@/utils/storage';

export interface PriceBookSettings {
  /** Default markup % applied when calculating sell price from cost price */
  globalMarkupPercent: number;
}

const DEFAULT_SETTINGS: PriceBookSettings = {
  globalMarkupPercent: 20,
};

function getStorageKey(userId: string) {
  return `price_book_settings_${userId}`;
}

/**
 * Hook to read/write Price Book settings (global markup % only).
 * Labour rates live in Business Settings (Cost Engineer) — not here.
 * Stored in localStorage, scoped by user ID.
 */
export function usePriceBookSettings() {
  const [userId, setUserId] = useState<string | null>(null);
  const [settings, setSettings] = useState<PriceBookSettings>(DEFAULT_SETTINGS);

  useEffect(() => {
    supabase.auth.getUser().then(({ data: { user } }) => {
      if (!user) return;
      setUserId(user.id);
      const parsed = storageGetJSONSync<Partial<PriceBookSettings> | null>(getStorageKey(user.id), null);
      if (parsed) {
        setSettings((prev) => ({ ...prev, ...parsed }));
      }
    });
  }, []);

  const updateMarkup = useCallback(
    (percent: number) => {
      const next = { globalMarkupPercent: Math.max(0, Math.min(500, percent)) };
      setSettings(next);
      if (userId) storageSetJSONSync(getStorageKey(userId), next);
    },
    [userId]
  );

  /**
   * Calculate sell price from cost price using global (or per-item) markup.
   */
  const calcSellPrice = useCallback(
    (costPrice: number, markupOverride?: number): number => {
      const markup = markupOverride ?? settings.globalMarkupPercent;
      return costPrice * (1 + markup / 100);
    },
    [settings.globalMarkupPercent]
  );

  return {
    settings,
    updateMarkup,
    calcSellPrice,
  };
}
