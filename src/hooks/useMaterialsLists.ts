import { useState, useEffect, useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

export interface MaterialsListItem {
  id: string;
  product_id?: string;
  name: string;
  quantity: number;
  unit: string;
  estimated_price?: number;
  supplier?: string;
  product_url?: string;
  matched: boolean;
  added_at: string;
  image_url?: string;
}

export interface MaterialsList {
  id: string;
  user_id: string;
  name: string;
  description: string | null;
  items: MaterialsListItem[];
  created_at: string;
  updated_at: string;
}

/**
 * Hook for CRUD operations on materials lists.
 * Uses the materials_lists table (new migration - not yet in generated types).
 */
export function useMaterialsLists() {
  const [lists, setLists] = useState<MaterialsList[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  // Fetch all user's lists
  const fetchLists = useCallback(async () => {
    try {
      setIsLoading(true);
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        setLists([]);
        return;
      }

      const { data, error } = await (supabase as any)
        .from('materials_lists')
        .select('*')
        .eq('user_id', user.id)
        .order('updated_at', { ascending: false });

      if (error) throw error;

      setLists((data || []) as MaterialsList[]);
    } catch (err) {
      console.error('Failed to fetch materials lists:', err);
      setLists([]);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchLists();
  }, [fetchLists]);

  // Create a new list
  const createList = useCallback(async (name: string, description?: string): Promise<MaterialsList | null> => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        toast({ title: 'Sign in required', description: 'Please sign in to create lists.', variant: 'destructive' });
        return null;
      }

      const { data, error } = await (supabase as any)
        .from('materials_lists')
        .insert({ user_id: user.id, name, description: description || null, items: [] })
        .select()
        .single();

      if (error) throw error;

      const newList = data as MaterialsList;
      setLists((prev) => [newList, ...prev]);
      toast({ title: 'List created', description: `"${name}" is ready to use.` });
      return newList;
    } catch (err) {
      console.error('Failed to create list:', err);
      toast({ title: 'Error', description: 'Could not create list. Please try again.', variant: 'destructive' });
      return null;
    }
  }, [toast]);

  // Delete a list
  const deleteList = useCallback(async (listId: string) => {
    try {
      const { error } = await (supabase as any)
        .from('materials_lists')
        .delete()
        .eq('id', listId);

      if (error) throw error;

      setLists((prev) => prev.filter((l) => l.id !== listId));
      toast({ title: 'List deleted' });
    } catch (err) {
      console.error('Failed to delete list:', err);
      toast({ title: 'Error', description: 'Could not delete list.', variant: 'destructive' });
    }
  }, [toast]);

  // Add an item to a list (from a marketplace product)
  const addItem = useCallback(async (
    listId: string,
    product: {
      id?: string;
      name: string;
      current_price?: number;
      supplier_name?: string;
      product_url?: string;
      image_url?: string | null;
    }
  ) => {
    try {
      const list = lists.find((l) => l.id === listId);
      if (!list) return;

      const newItem: MaterialsListItem = {
        id: crypto.randomUUID(),
        product_id: product.id,
        name: product.name,
        quantity: 1,
        unit: 'each',
        estimated_price: product.current_price,
        supplier: product.supplier_name,
        product_url: product.product_url,
        image_url: product.image_url || undefined,
        matched: !!product.id,
        added_at: new Date().toISOString(),
      };

      const updatedItems = [...list.items, newItem];

      const { error } = await (supabase as any)
        .from('materials_lists')
        .update({ items: updatedItems })
        .eq('id', listId);

      if (error) throw error;

      setLists((prev) =>
        prev.map((l) => (l.id === listId ? { ...l, items: updatedItems, updated_at: new Date().toISOString() } : l))
      );

      toast({ title: 'Item added', description: `Added to "${list.name}"` });
    } catch (err) {
      console.error('Failed to add item:', err);
      toast({ title: 'Error', description: 'Could not add item.', variant: 'destructive' });
    }
  }, [lists, toast]);

  // Remove an item from a list
  const removeItem = useCallback(async (listId: string, itemId: string) => {
    try {
      const list = lists.find((l) => l.id === listId);
      if (!list) return;

      const updatedItems = list.items.filter((i) => i.id !== itemId);

      const { error } = await (supabase as any)
        .from('materials_lists')
        .update({ items: updatedItems })
        .eq('id', listId);

      if (error) throw error;

      setLists((prev) =>
        prev.map((l) => (l.id === listId ? { ...l, items: updatedItems, updated_at: new Date().toISOString() } : l))
      );
    } catch (err) {
      console.error('Failed to remove item:', err);
      toast({ title: 'Error', description: 'Could not remove item.', variant: 'destructive' });
    }
  }, [lists, toast]);

  // Update item quantity
  const updateItemQuantity = useCallback(async (listId: string, itemId: string, qty: number) => {
    try {
      const list = lists.find((l) => l.id === listId);
      if (!list) return;

      const updatedItems = list.items.map((i) =>
        i.id === itemId ? { ...i, quantity: Math.max(1, qty) } : i
      );

      const { error } = await (supabase as any)
        .from('materials_lists')
        .update({ items: updatedItems })
        .eq('id', listId);

      if (error) throw error;

      setLists((prev) =>
        prev.map((l) => (l.id === listId ? { ...l, items: updatedItems, updated_at: new Date().toISOString() } : l))
      );
    } catch (err) {
      console.error('Failed to update quantity:', err);
      toast({ title: 'Error', description: 'Could not update quantity.', variant: 'destructive' });
    }
  }, [lists, toast]);

  // Parse text to items via edge function
  const parseTextToItems = useCallback(async (text: string): Promise<MaterialsListItem[]> => {
    try {
      const { data, error } = await supabase.functions.invoke('parse-materials-list', {
        body: { text },
      });

      if (error) throw error;

      return (data?.items || []) as MaterialsListItem[];
    } catch (err) {
      console.error('Failed to parse materials text:', err);
      toast({ title: 'Error', description: 'Could not parse materials list.', variant: 'destructive' });
      return [];
    }
  }, [toast]);

  // Check if a product is saved in any list
  const isProductSaved = useCallback((productId: string): boolean => {
    return lists.some((l) => l.items.some((i) => i.product_id === productId));
  }, [lists]);

  return {
    lists,
    isLoading,
    createList,
    deleteList,
    addItem,
    removeItem,
    updateItemQuantity,
    parseTextToItems,
    isProductSaved,
    refetch: fetchLists,
  };
}
