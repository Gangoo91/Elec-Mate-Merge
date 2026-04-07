import { useState, useEffect, useCallback, useMemo } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from '@/hooks/use-toast';
import {
  InventoryItem,
  CreateInventoryInput,
  UpdateInventoryInput,
  InventoryStats,
  InventoryFilters,
  InventoryCategory,
  InventoryLocation,
} from '@/types/inventory';

const TABLE = 'personal_inventory';

export function useInventoryStorage() {
  const [items, setItems] = useState<InventoryItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState<InventoryFilters>({
    category: 'all',
    location: 'all',
    lowStockOnly: false,
    searchQuery: '',
  });

  // Fetch all items on mount
  const fetchItems = useCallback(async () => {
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (!user) return;

    const { data, error } = await supabase
      .from(TABLE)
      .select('*')
      .eq('user_id', user.id)
      .order('name', { ascending: true });

    if (error) {
      console.error('[useInventoryStorage] Fetch error:', error);
      return;
    }

    setItems((data as InventoryItem[]) || []);
    setLoading(false);
  }, []);

  useEffect(() => {
    fetchItems();
  }, [fetchItems]);

  // Realtime subscription
  useEffect(() => {
    const channel = supabase
      .channel('personal-inventory-changes')
      .on('postgres_changes', { event: '*', schema: 'public', table: TABLE }, () => {
        fetchItems();
      })
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [fetchItems]);

  // Filtered items
  const filteredItems = useMemo(() => {
    let result = items;

    if (filters.category !== 'all') {
      result = result.filter((i) => i.category === filters.category);
    }

    if (filters.location !== 'all') {
      result = result.filter((i) => i.location === filters.location);
    }

    if (filters.lowStockOnly) {
      result = result.filter(
        (i) => i.low_stock_threshold != null && i.quantity <= i.low_stock_threshold
      );
    }

    if (filters.searchQuery.trim()) {
      const q = filters.searchQuery.toLowerCase();
      result = result.filter(
        (i) =>
          i.name.toLowerCase().includes(q) ||
          i.description?.toLowerCase().includes(q) ||
          i.supplier?.toLowerCase().includes(q)
      );
    }

    return result;
  }, [items, filters]);

  // Low stock items
  const lowStockItems = useMemo(
    () => items.filter((i) => i.low_stock_threshold != null && i.quantity <= i.low_stock_threshold),
    [items]
  );

  // Stats
  const stats: InventoryStats = useMemo(() => {
    const byCategory: Partial<Record<InventoryCategory, number>> = {};
    const byLocation: Partial<Record<InventoryLocation, number>> = {};
    let totalValue = 0;

    for (const item of items) {
      byCategory[item.category] = (byCategory[item.category] || 0) + 1;
      byLocation[item.location] = (byLocation[item.location] || 0) + 1;
      if (item.unit_cost != null) {
        totalValue += item.quantity * item.unit_cost;
      }
    }

    return {
      totalItems: items.length,
      totalValue: Math.round(totalValue * 100) / 100,
      lowStockCount: lowStockItems.length,
      byCategory,
      byLocation,
    };
  }, [items, lowStockItems]);

  // Create
  const createItem = useCallback(
    async (input: CreateInventoryInput): Promise<InventoryItem | null> => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (!user) return null;

      const { data, error } = await supabase
        .from(TABLE)
        .insert({ ...input, user_id: user.id })
        .select()
        .single();

      if (error) {
        console.error('[useInventoryStorage] Create error:', error);
        toast({ title: 'Failed to add item', description: error.message, variant: 'destructive' });
        return null;
      }

      const item = data as InventoryItem;
      setItems((prev) => [...prev, item].sort((a, b) => a.name.localeCompare(b.name)));
      return item;
    },
    []
  );

  // Update
  const updateItem = useCallback(async (input: UpdateInventoryInput): Promise<boolean> => {
    const { id, ...updates } = input;

    const { error } = await supabase.from(TABLE).update(updates).eq('id', id);

    if (error) {
      console.error('[useInventoryStorage] Update error:', error);
      toast({ title: 'Failed to update item', description: error.message, variant: 'destructive' });
      return false;
    }

    setItems((prev) =>
      prev.map((i) =>
        i.id === id ? { ...i, ...updates, updated_at: new Date().toISOString() } : i
      )
    );
    return true;
  }, []);

  // Delete
  const deleteItem = useCallback(async (id: string): Promise<boolean> => {
    const { error } = await supabase.from(TABLE).delete().eq('id', id);

    if (error) {
      console.error('[useInventoryStorage] Delete error:', error);
      toast({ title: 'Failed to delete item', description: error.message, variant: 'destructive' });
      return false;
    }

    setItems((prev) => prev.filter((i) => i.id !== id));
    return true;
  }, []);

  // Quick quantity adjustment (+/- buttons)
  const adjustQuantity = useCallback(
    async (id: string, delta: number): Promise<boolean> => {
      const item = items.find((i) => i.id === id);
      if (!item) return false;

      const newQty = Math.max(0, Math.round((item.quantity + delta) * 100) / 100);

      // Optimistic update
      setItems((prev) =>
        prev.map((i) =>
          i.id === id
            ? {
                ...i,
                quantity: newQty,
                last_used_date:
                  delta < 0 ? new Date().toISOString().split('T')[0] : i.last_used_date,
              }
            : i
        )
      );

      const updateData: Record<string, unknown> = { quantity: newQty };
      if (delta < 0) {
        updateData.last_used_date = new Date().toISOString().split('T')[0];
      }

      const { error } = await supabase.from(TABLE).update(updateData).eq('id', id);

      if (error) {
        console.error('[useInventoryStorage] Adjust error:', error);
        // Revert optimistic update
        setItems((prev) => prev.map((i) => (i.id === id ? item : i)));
        toast({ title: 'Failed to update quantity', variant: 'destructive' });
        return false;
      }

      return true;
    },
    [items]
  );

  const refreshItems = useCallback(async () => {
    setLoading(true);
    await fetchItems();
    setLoading(false);
  }, [fetchItems]);

  return {
    items,
    filteredItems,
    lowStockItems,
    stats,
    loading,
    filters,
    setFilters,
    createItem,
    updateItem,
    deleteItem,
    adjustQuantity,
    refreshItems,
  };
}
