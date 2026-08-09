/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect, useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { trackUserEvent } from '@/hooks/useActivityTracking';

/**
 * Canonical form for matching item names on import — trimmed, lower-cased,
 * whitespace collapsed. Exported so the import preview and the write path
 * cannot drift into disagreeing about what counts as the same product.
 */
export const normaliseItemName = (n: string) => n.trim().toLowerCase().replace(/\s+/g, ' ');

export interface MaterialsListItem {
  id: string;
  product_id?: string;
  name: string;
  quantity: number;
  unit: string;
  /** Sell price — what goes on the quote */
  estimated_price?: number;
  /** Trade/cost price — what they actually pay */
  cost_price?: number;
  /** Per-item markup override (%). Falls back to global setting if absent. */
  markup_percent?: number;
  /**
   * Labour allowance in hours to install one unit — the Spons-style time guide
   * (ELE-1470/ELE-1445). Multiplied by the company hourly rate when the item is
   * added to a quote, so a 0.5h isolator at £60/hr adds £30 of labour on its own
   * line. Absent means the item carries no labour and quotes materials only.
   */
  labour_hours?: number;
  /**
   * Which labour grade those hours are costed at — an id from `workerTypes`
   * (electrician, apprentice, labourer, designer, owner). Sean Mulcahy's ask,
   * 6 Aug 2026: a 0.5h apprentice task should cost at the apprentice rate, not
   * the electrician one. Absent means electrician, which is what every existing
   * item was already implicitly costed at.
   */
  labour_grade?: string;
  /**
   * Labour split across grades — "0.5h electrician + 0.5h apprentice" for a
   * two-man task. When present this supersedes the labour_hours/labour_grade
   * pair above, which stays for the 1,256 single-grade rows already imported.
   */
  labour?: { grade: string; hours: number }[];
  /** ISO timestamp of when the price was last set/updated */
  price_updated_at?: string;
  supplier?: string;
  product_url?: string;
  /** Optional link to a `personal_inventory` stock item, so the price-book item
   *  can show live stock and decrement on invoice. Set when the user links them. */
  personal_inventory_id?: string;
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
      const {
        data: { user },
      } = await supabase.auth.getUser();
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
  const createList = useCallback(
    async (name: string, description?: string): Promise<MaterialsList | null> => {
      try {
        const {
          data: { user },
        } = await supabase.auth.getUser();
        if (!user) {
          toast({
            title: 'Sign in required',
            description: 'Please sign in to create lists.',
            variant: 'destructive',
          });
          return null;
        }

        const { data, error } = await (supabase as any)
          .from('materials_lists')
          .insert({ user_id: user.id, name, description: description || null, items: [] })
          .select()
          .single();

        if (error) throw error;
        void trackUserEvent(user.id, 'feature_use', { eventName: 'materials_list_created' });

        const newList = data as MaterialsList;
        setLists((prev) => [newList, ...prev]);
        toast({ title: 'List created', description: `"${name}" is ready to use.` });
        return newList;
      } catch (err) {
        console.error('Failed to create list:', err);
        toast({
          title: 'Error',
          description: 'Could not create list. Please try again.',
          variant: 'destructive',
        });
        return null;
      }
    },
    [toast]
  );

  // Delete a list
  const deleteList = useCallback(
    async (listId: string) => {
      try {
        const { error } = await (supabase as any).from('materials_lists').delete().eq('id', listId);

        if (error) throw error;

        setLists((prev) => prev.filter((l) => l.id !== listId));
        toast({ title: 'List deleted' });
      } catch (err) {
        console.error('Failed to delete list:', err);
        toast({ title: 'Error', description: 'Could not delete list.', variant: 'destructive' });
      }
    },
    [toast]
  );

  // Add an item to a list (from a marketplace product or price book)
  const addItem = useCallback(
    async (
      listId: string,
      product: {
        id?: string;
        name: string;
        current_price?: number;
        supplier_name?: string;
        product_url?: string;
        image_url?: string | null;
        /** Trade/cost price — if provided, also stamps price_updated_at */
        cost_price?: number;
        /** Per-item markup % override */
        markup_percent?: number;
        /** Labour allowance in hours per unit (ELE-1470) */
        labour_hours?: number;
        /** Grade those hours are costed at (ELE-1445) */
        labour_grade?: string;
      }
    ) => {
      try {
        // Fetch current list from DB to avoid stale closure issues
        const { data: currentList, error: fetchError } = await (supabase as any)
          .from('materials_lists')
          .select('*')
          .eq('id', listId)
          .single();

        if (fetchError || !currentList) return;

        const existingItems = (currentList.items || []) as MaterialsListItem[];

        const hasPriceInfo = !!product.current_price || !!product.cost_price;
        const newItem: MaterialsListItem = {
          id: crypto.randomUUID(),
          product_id: product.id,
          name: product.name,
          quantity: 1,
          unit: 'each',
          estimated_price: product.current_price,
          cost_price: product.cost_price,
          markup_percent: product.markup_percent,
          labour_hours: product.labour_hours,
          labour_grade: product.labour_grade,
          supplier: product.supplier_name,
          product_url: product.product_url,
          image_url: product.image_url || undefined,
          matched: !!product.id,
          added_at: new Date().toISOString(),
          price_updated_at: hasPriceInfo ? new Date().toISOString() : undefined,
        };

        const updatedItems = [...existingItems, newItem];

        const { error } = await (supabase as any)
          .from('materials_lists')
          .update({ items: updatedItems })
          .eq('id', listId);

        if (error) throw error;

        setLists((prev) =>
          prev.map((l) =>
            l.id === listId
              ? { ...l, items: updatedItems, updated_at: new Date().toISOString() }
              : l
          )
        );
      } catch (err) {
        console.error('Failed to add item:', err);
        toast({ title: 'Error', description: 'Could not add item.', variant: 'destructive' });
      }
    },
    [toast]
  );

  /**
   * Import many rows in one write, matching existing items by name (ELE-1470).
   *
   * Two problems with looping `addItem`, both of which bite on a real import:
   *
   * 1. It always appends. Import a price list, add labour times to the
   *    spreadsheet, import again — and the electrician now owns two of
   *    everything. Re-importing a price list should refresh it, not double it.
   * 2. Every call re-fetched and rewrote the whole jsonb array, so a 500-row
   *    CSV meant 500 sequential round trips over a growing array. This reads
   *    once and writes once.
   *
   * Matching is on a normalised name — trimmed, lower-cased, whitespace
   * collapsed — because "2.5mm T&E  100m" and "2.5mm t&e 100m" are the same
   * product to everyone except a string comparison.
   */
  const bulkUpsertItems = useCallback(
    async (
      listId: string,
      rows: {
        name: string;
        cost_price?: number;
        current_price?: number;
        markup_percent?: number;
        supplier_name?: string;
        labour_hours?: number;
        /** Grade the hours are costed at (ELE-1445) */
        labour_grade?: string;
        /** Unit of sale. A price is meaningless without it — £45.99 per roll
         *  is not £45.99 each, and defaulting to 'each' mis-prices the item
         *  every time it is quoted afterwards. */
        unit?: string;
      }[]
    ): Promise<{ added: number; updated: number }> => {
      try {
        const { data: currentList, error: fetchError } = await (supabase as any)
          .from('materials_lists')
          .select('*')
          .eq('id', listId)
          .single();
        if (fetchError || !currentList) return { added: 0, updated: 0 };

        const items = [...((currentList.items || []) as MaterialsListItem[])];
        const indexByName = new Map(items.map((it, i) => [normaliseItemName(it.name), i]));
        const now = new Date().toISOString();
        let added = 0;
        let updated = 0;

        for (const row of rows) {
          const key = normaliseItemName(row.name);
          const existingIdx = indexByName.get(key);
          if (existingIdx !== undefined) {
            const prev = items[existingIdx];
            items[existingIdx] = {
              ...prev,
              estimated_price: row.current_price ?? prev.estimated_price,
              cost_price: row.cost_price ?? prev.cost_price,
              markup_percent: row.markup_percent ?? prev.markup_percent,
              supplier: row.supplier_name || prev.supplier,
              unit: row.unit || prev.unit,
              // Only overwrite a labour time when the import carries one, so a
              // price-only refresh cannot silently wipe times already set.
              labour_hours: row.labour_hours ?? prev.labour_hours,
              labour_grade: row.labour_grade ?? prev.labour_grade,
              // Only stamp the price date when a price actually arrived. A
              // labour-times import (Sean's book carries times and no prices)
              // must not make every item look freshly re-priced.
              price_updated_at:
                row.current_price != null || row.cost_price != null
                  ? now
                  : prev.price_updated_at,
            };
            updated++;
          } else {
            const item: MaterialsListItem = {
              id: crypto.randomUUID(),
              name: row.name,
              quantity: 1,
              unit: row.unit || 'each',
              estimated_price: row.current_price,
              cost_price: row.cost_price,
              markup_percent: row.markup_percent,
              labour_hours: row.labour_hours,
              labour_grade: row.labour_grade,
              supplier: row.supplier_name,
              price_updated_at: now,
              matched: false,
              added_at: now,
            };
            indexByName.set(key, items.length);
            items.push(item);
            added++;
          }
        }

        const { error } = await (supabase as any)
          .from('materials_lists')
          .update({ items })
          .eq('id', listId);
        if (error) throw error;

        setLists((prev) =>
          prev.map((l) => (l.id === listId ? { ...l, items, updated_at: now } : l))
        );
        return { added, updated };
      } catch (err) {
        console.error('Bulk import failed:', err);
        toast({ title: 'Error', description: 'Could not import items.', variant: 'destructive' });
        return { added: 0, updated: 0 };
      }
    },
    [toast]
  );

  // Remove an item from a list
  const removeItem = useCallback(
    async (listId: string, itemId: string) => {
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
          prev.map((l) =>
            l.id === listId
              ? { ...l, items: updatedItems, updated_at: new Date().toISOString() }
              : l
          )
        );
      } catch (err) {
        console.error('Failed to remove item:', err);
        toast({ title: 'Error', description: 'Could not remove item.', variant: 'destructive' });
      }
    },
    [lists, toast]
  );

  // Update item quantity
  const updateItemQuantity = useCallback(
    async (listId: string, itemId: string, qty: number) => {
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
          prev.map((l) =>
            l.id === listId
              ? { ...l, items: updatedItems, updated_at: new Date().toISOString() }
              : l
          )
        );
      } catch (err) {
        console.error('Failed to update quantity:', err);
        toast({
          title: 'Error',
          description: 'Could not update quantity.',
          variant: 'destructive',
        });
      }
    },
    [lists, toast]
  );

  // Parse text to items via edge function
  const parseTextToItems = useCallback(
    async (text: string): Promise<MaterialsListItem[]> => {
      try {
        const { data, error } = await supabase.functions.invoke('parse-materials-list', {
          body: { text },
        });

        if (error) throw error;

        return (data?.items || []) as MaterialsListItem[];
      } catch (err) {
        console.error('Failed to parse materials text:', err);
        toast({
          title: 'Error',
          description: 'Could not parse materials list.',
          variant: 'destructive',
        });
        return [];
      }
    },
    [toast]
  );

  // Update item price — also stamps price_updated_at
  const updateItemPrice = useCallback(
    async (listId: string, itemId: string, price: number | undefined) => {
      try {
        // Fetch fresh list from DB to avoid stale closure issues
        const { data: currentList, error: fetchError } = await (supabase as any)
          .from('materials_lists')
          .select('*')
          .eq('id', listId)
          .single();

        if (fetchError || !currentList) return;

        const existingItems = (currentList.items || []) as MaterialsListItem[];
        const updatedItems = existingItems.map((i) =>
          i.id === itemId
            ? { ...i, estimated_price: price, price_updated_at: new Date().toISOString() }
            : i
        );

        const { error } = await (supabase as any)
          .from('materials_lists')
          .update({ items: updatedItems })
          .eq('id', listId);

        if (error) throw error;

        setLists((prev) =>
          prev.map((l) =>
            l.id === listId
              ? { ...l, items: updatedItems, updated_at: new Date().toISOString() }
              : l
          )
        );
      } catch (err) {
        console.error('Failed to update price:', err);
        toast({
          title: 'Error',
          description: 'Could not update price.',
          variant: 'destructive',
        });
      }
    },
    [toast]
  );

  /**
   * Set the labour grade on many items at once (ELE-1445).
   *
   * Sean's imported book came in as 1,256 electrician-graded rows, because the
   * source book does not say who does the work. Re-grading a section one item
   * at a time is 33 sheets and 33 writes; this is one read and one write.
   *
   * Only touches items that actually carry hours — a grade on an item with no
   * time is a stale value waiting to be picked up if time is added later.
   */
  const bulkSetLabourGrade = useCallback(
    async (
      listId: string,
      itemIds: string[],
      grade: string,
      mode: 'only' | 'add' = 'only'
    ): Promise<number> => {
      if (itemIds.length === 0) return 0;
      try {
        const { data: currentList, error: fetchError } = await (supabase as any)
          .from('materials_lists')
          .select('*')
          .eq('id', listId)
          .single();
        if (fetchError || !currentList) return 0;

        const target = new Set(itemIds);
        let changed = 0;
        const items = ((currentList.items || []) as MaterialsListItem[]).map((item) => {
          if (!target.has(item.id)) return item;

          // Existing allocations, tolerating the legacy single-grade pair.
          const current =
            item.labour && item.labour.length > 0
              ? item.labour
              : (item.labour_hours ?? 0) > 0
                ? [{ grade: item.labour_grade || 'electrician', hours: item.labour_hours! }]
                : [];
          if (current.length === 0) return item;

          let next: { grade: string; hours: number }[];
          if (mode === 'only') {
            // Everything moves to one grade; hours are preserved, not summed
            // per grade, because it is the same work done by someone else.
            const hours = Math.round(current.reduce((n, a) => n + a.hours, 0) * 100) / 100;
            next = [{ grade, hours }];
          } else {
            // Second person alongside: match the largest existing allocation,
            // which is the primary trade on the task.
            if (current.some((a) => a.grade === grade)) return item;
            const lead = current.reduce((a, b) => (b.hours > a.hours ? b : a));
            next = [...current, { grade, hours: lead.hours }];
          }

          const same =
            next.length === current.length &&
            next.every((a, i) => current[i].grade === a.grade && current[i].hours === a.hours);
          if (same) return item;

          changed++;
          return {
            ...item,
            labour: next,
            // Keep the legacy pair mirroring the first allocation.
            labour_hours: next[0].hours,
            labour_grade: next[0].grade,
          };
        });
        if (changed === 0) return 0;

        const { error } = await (supabase as any)
          .from('materials_lists')
          .update({ items, updated_at: new Date().toISOString() })
          .eq('id', listId);
        if (error) throw error;

        setLists((prev) =>
          prev.map((l) => (l.id === listId ? { ...l, items } : l))
        );
        return changed;
      } catch (error) {
        console.error('[useMaterialsLists] bulkSetLabourGrade failed', error);
        return 0;
      }
    },
    []
  );

  // Update multiple fields on a single item (name, cost_price, markup_percent, supplier, unit, etc.)
  const updateItemDetails = useCallback(
    async (listId: string, itemId: string, updates: Partial<MaterialsListItem>) => {
      try {
        const { data: currentList, error: fetchError } = await (supabase as any)
          .from('materials_lists')
          .select('*')
          .eq('id', listId)
          .single();

        if (fetchError || !currentList) return;

        const existingItems = (currentList.items || []) as MaterialsListItem[];
        const updatedItems = existingItems.map((i) => {
          if (i.id !== itemId) return i;
          const merged = { ...i, ...updates };
          // Always stamp price_updated_at when price-related fields change
          if ('estimated_price' in updates || 'cost_price' in updates || 'markup_percent' in updates) {
            merged.price_updated_at = new Date().toISOString();
          }
          return merged;
        });

        const { error } = await (supabase as any)
          .from('materials_lists')
          .update({ items: updatedItems })
          .eq('id', listId);

        if (error) throw error;

        setLists((prev) =>
          prev.map((l) =>
            l.id === listId
              ? { ...l, items: updatedItems, updated_at: new Date().toISOString() }
              : l
          )
        );
      } catch (err) {
        console.error('Failed to update item details:', err);
        toast({
          title: 'Error',
          description: 'Could not update item.',
          variant: 'destructive',
        });
      }
    },
    [toast]
  );

  // Check if a product is saved in any list
  const isProductSaved = useCallback(
    (productId: string): boolean => {
      return lists.some((l) => l.items.some((i) => i.product_id === productId));
    },
    [lists]
  );

  return {
    bulkSetLabourGrade,
    lists,
    isLoading,
    createList,
    deleteList,
    addItem,
    bulkUpsertItems,
    removeItem,
    updateItemQuantity,
    updateItemPrice,
    updateItemDetails,
    parseTextToItems,
    isProductSaved,
    refetch: fetchLists,
  };
}
