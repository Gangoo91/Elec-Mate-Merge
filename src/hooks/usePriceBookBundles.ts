import { useState, useEffect, useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';

export interface BundleLineItem {
  id: string;
  name: string;
  quantity: number;
  unit: string;
  unitPrice: number;
  category: 'materials' | 'labour' | 'equipment';
}

export interface PriceBookBundle {
  id: string;
  name: string;
  description?: string;
  /** Pre-built line items (materials, equipment, labour) */
  items: BundleLineItem[];
  /** Optional total labour hours for display purposes */
  labourHours?: number;
  createdAt: string;
  updatedAt: string;
}

function getStorageKey(userId: string) {
  return `price_book_bundles_${userId}`;
}

function loadBundles(userId: string): PriceBookBundle[] {
  try {
    const raw = localStorage.getItem(getStorageKey(userId));
    return raw ? (JSON.parse(raw) as PriceBookBundle[]) : [];
  } catch {
    return [];
  }
}

function saveBundles(userId: string, bundles: PriceBookBundle[]) {
  localStorage.setItem(getStorageKey(userId), JSON.stringify(bundles));
}

/**
 * Hook for managing Price Book bundles (saved assemblies / job templates).
 * Stored in localStorage, scoped by user ID.
 */
export function usePriceBookBundles() {
  const [userId, setUserId] = useState<string | null>(null);
  const [bundles, setBundles] = useState<PriceBookBundle[]>([]);

  useEffect(() => {
    supabase.auth.getUser().then(({ data: { user } }) => {
      if (!user) return;
      setUserId(user.id);
      setBundles(loadBundles(user.id));
    });
  }, []);

  const persist = useCallback(
    (next: PriceBookBundle[]) => {
      setBundles(next);
      if (userId) saveBundles(userId, next);
    },
    [userId]
  );

  const createBundle = useCallback(
    (
      name: string,
      items: BundleLineItem[],
      opts?: { description?: string; labourHours?: number }
    ): PriceBookBundle => {
      const bundle: PriceBookBundle = {
        id: crypto.randomUUID(),
        name: name.trim(),
        description: opts?.description?.trim(),
        items,
        labourHours: opts?.labourHours,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
      persist([bundle, ...bundles]);
      return bundle;
    },
    [bundles, persist]
  );

  const updateBundle = useCallback(
    (
      id: string,
      updates: Partial<Pick<PriceBookBundle, 'name' | 'description' | 'items' | 'labourHours'>>
    ) => {
      const next = bundles.map((b) =>
        b.id === id ? { ...b, ...updates, updatedAt: new Date().toISOString() } : b
      );
      persist(next);
    },
    [bundles, persist]
  );

  const deleteBundle = useCallback(
    (id: string) => {
      persist(bundles.filter((b) => b.id !== id));
    },
    [bundles, persist]
  );

  /** Calculate total sell price of a bundle */
  const bundleTotal = useCallback((bundle: PriceBookBundle): number => {
    return bundle.items.reduce((sum, i) => sum + i.quantity * i.unitPrice, 0);
  }, []);

  return {
    bundles,
    createBundle,
    updateBundle,
    deleteBundle,
    bundleTotal,
  };
}
