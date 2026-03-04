/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect, useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

export interface PriceListItem {
  id: string;
  user_id: string;
  name: string;
  description: string | null;
  unit_price: number;
  unit: string;
  category: string;
  sort_order: number;
  created_at: string;
  updated_at: string;
}

export type PriceListCategory =
  | 'labour'
  | 'call-out'
  | 'materials'
  | 'inspection'
  | 'other';

export const RATE_CARD_CATEGORIES: PriceListCategory[] = [
  'labour',
  'call-out',
  'materials',
  'inspection',
  'other',
];

export const CATEGORY_LABELS: Record<PriceListCategory, string> = {
  'labour':     'Labour',
  'call-out':   'Call-out',
  'materials':  'Materials',
  'inspection': 'Inspection',
  'other':      'Other',
};

/**
 * Hook for CRUD on price_list_items (user job/labour rate card).
 * DB-backed, RLS scoped to auth.uid().
 */
export function usePriceList() {
  const [items, setItems] = useState<PriceListItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  const fetchItems = useCallback(async () => {
    try {
      setIsLoading(true);
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) { setItems([]); return; }

      const { data, error } = await (supabase as any)
        .from('price_list_items')
        .select('*')
        .eq('user_id', user.id)
        .order('sort_order', { ascending: true })
        .order('created_at', { ascending: true });

      if (error) throw error;
      setItems((data || []) as PriceListItem[]);
    } catch (err) {
      console.error('Failed to fetch price list:', err);
      setItems([]);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => { fetchItems(); }, [fetchItems]);

  const createItem = useCallback(async (
    input: Pick<PriceListItem, 'name' | 'unit_price' | 'unit' | 'category'> &
           Partial<Pick<PriceListItem, 'description'>>
  ): Promise<PriceListItem | null> => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return null;

      const { data, error } = await (supabase as any)
        .from('price_list_items')
        .insert({ ...input, user_id: user.id })
        .select()
        .single();

      if (error) throw error;

      const created = data as PriceListItem;
      setItems(prev => [...prev, created]);
      return created;
    } catch (err) {
      console.error('Failed to create price list item:', err);
      toast({ title: 'Error', description: 'Could not save item.', variant: 'destructive' });
      return null;
    }
  }, [toast]);

  const updateItem = useCallback(async (
    id: string,
    updates: Partial<Pick<PriceListItem, 'name' | 'description' | 'unit_price' | 'unit' | 'category'>>
  ): Promise<boolean> => {
    try {
      const { error } = await (supabase as any)
        .from('price_list_items')
        .update(updates)
        .eq('id', id);

      if (error) throw error;

      setItems(prev => prev.map(i => i.id === id ? { ...i, ...updates } : i));
      return true;
    } catch (err) {
      console.error('Failed to update price list item:', err);
      toast({ title: 'Error', description: 'Could not update item.', variant: 'destructive' });
      return false;
    }
  }, [toast]);

  const deleteItem = useCallback(async (id: string): Promise<boolean> => {
    try {
      const { error } = await (supabase as any)
        .from('price_list_items')
        .delete()
        .eq('id', id);

      if (error) throw error;

      setItems(prev => prev.filter(i => i.id !== id));
      return true;
    } catch (err) {
      console.error('Failed to delete price list item:', err);
      toast({ title: 'Error', description: 'Could not delete item.', variant: 'destructive' });
      return false;
    }
  }, [toast]);

  return {
    items,
    isLoading,
    createItem,
    updateItem,
    deleteItem,
    refetch: fetchItems,
  };
}
