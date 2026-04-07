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
  INVENTORY_LOCATIONS,
  formatQuantity,
} from '@/types/inventory';

const TABLE = 'personal_inventory';

export type InventorySort = 'name' | 'quantity_asc' | 'last_used' | 'recent';

export function useInventoryStorage() {
  const [items, setItems] = useState<InventoryItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState<InventoryFilters>({
    category: 'all',
    location: 'all',
    lowStockOnly: false,
    searchQuery: '',
  });
  const [sortBy, setSortBy] = useState<InventorySort>('name');

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

  // Sort function
  const sortItems = useCallback(
    (list: InventoryItem[]): InventoryItem[] => {
      const sorted = [...list];
      switch (sortBy) {
        case 'name':
          return sorted.sort((a, b) => a.name.localeCompare(b.name));
        case 'quantity_asc':
          return sorted.sort((a, b) => a.quantity - b.quantity);
        case 'last_used':
          return sorted.sort((a, b) => {
            if (!a.last_used_date && !b.last_used_date) return 0;
            if (!a.last_used_date) return 1;
            if (!b.last_used_date) return -1;
            return new Date(b.last_used_date).getTime() - new Date(a.last_used_date).getTime();
          });
        case 'recent':
          return sorted.sort(
            (a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
          );
        default:
          return sorted;
      }
    },
    [sortBy]
  );

  // Filtered + sorted items
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

    return sortItems(result);
  }, [items, filters, sortItems]);

  // Low stock items
  const lowStockItems = useMemo(
    () => items.filter((i) => i.low_stock_threshold != null && i.quantity <= i.low_stock_threshold),
    [items]
  );

  // Recently used items (last 7 days)
  const recentlyUsedItems = useMemo(() => {
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
    return items
      .filter((i) => i.last_used_date && new Date(i.last_used_date) >= sevenDaysAgo)
      .sort(
        (a, b) => new Date(b.last_used_date!).getTime() - new Date(a.last_used_date!).getTime()
      );
  }, [items]);

  // Group items by location
  const groupedByLocation = useMemo(() => {
    const groups: { location: (typeof INVENTORY_LOCATIONS)[number]; items: InventoryItem[] }[] = [];
    for (const loc of INVENTORY_LOCATIONS) {
      const locItems = filteredItems.filter((i) => i.location === loc.id);
      if (locItems.length > 0) {
        groups.push({ location: loc, items: locItems });
      }
    }
    return groups;
  }, [filteredItems]);

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
        toast({
          title: 'Failed to add item',
          description: error.message,
          variant: 'destructive',
        });
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
      toast({
        title: 'Failed to update item',
        description: error.message,
        variant: 'destructive',
      });
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
      toast({
        title: 'Failed to delete item',
        description: error.message,
        variant: 'destructive',
      });
      return false;
    }

    setItems((prev) => prev.filter((i) => i.id !== id));
    return true;
  }, []);

  // Quick quantity adjustment (+/- buttons) with undo support
  const adjustQuantity = useCallback(
    async (id: string, delta: number): Promise<{ success: boolean; previousQuantity?: number }> => {
      const item = items.find((i) => i.id === id);
      if (!item) return { success: false };

      const previousQuantity = item.quantity;
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
        setItems((prev) => prev.map((i) => (i.id === id ? item : i)));
        toast({ title: 'Failed to update quantity', variant: 'destructive' });
        return { success: false };
      }

      return { success: true, previousQuantity };
    },
    [items]
  );

  // Move item to different location
  const moveItem = useCallback(
    async (id: string, newLocation: InventoryLocation): Promise<boolean> => {
      const { error } = await supabase.from(TABLE).update({ location: newLocation }).eq('id', id);

      if (error) {
        toast({ title: 'Failed to move item', variant: 'destructive' });
        return false;
      }

      setItems((prev) => prev.map((i) => (i.id === id ? { ...i, location: newLocation } : i)));
      return true;
    },
    []
  );

  // Generate reorder list text from low stock items, grouped by supplier
  const generateReorderList = useCallback((): string => {
    if (lowStockItems.length === 0) return '';

    // Group by supplier
    const grouped = new Map<string, InventoryItem[]>();
    for (const item of lowStockItems) {
      const key = item.supplier?.trim() || 'No supplier';
      const group = grouped.get(key) || [];
      group.push(item);
      grouped.set(key, group);
    }

    const sections: string[] = [];
    for (const [supplier, supplierItems] of grouped) {
      const lines = supplierItems.map((item) => {
        const needed = item.low_stock_threshold
          ? Math.ceil(item.low_stock_threshold * 2 - item.quantity)
          : 0;
        return `  • ${item.name} — have ${formatQuantity(item.quantity, item.unit)}, need ~${needed} ${item.unit}`;
      });
      sections.push(`${supplier}:\n${lines.join('\n')}`);
    }

    return `Reorder List — ${new Date().toLocaleDateString('en-GB')}\n\n${sections.join('\n\n')}`;
  }, [lowStockItems]);

  const refreshItems = useCallback(async () => {
    setLoading(true);
    await fetchItems();
    setLoading(false);
  }, [fetchItems]);

  return {
    items,
    filteredItems,
    lowStockItems,
    recentlyUsedItems,
    groupedByLocation,
    stats,
    loading,
    filters,
    setFilters,
    sortBy,
    setSortBy,
    createItem,
    updateItem,
    deleteItem,
    adjustQuantity,
    moveItem,
    generateReorderList,
    refreshItems,
  };
}
