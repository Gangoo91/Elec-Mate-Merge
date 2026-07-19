import { useState, useEffect, useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

export type JobMaterialStatus = 'needed' | 'ordered' | 'got' | 'fitted';

export interface JobMaterial {
  id: string;
  project_id: string;
  name: string;
  quantity: number;
  unit?: string | null;
  unit_price?: number | null;
  supplier?: string | null;
  status: JobMaterialStatus;
  source: 'manual' | 'quote' | 'survey';
  source_item_id?: string | null;
  inventory_item_id?: string | null;
  created_at: string;
}

export interface StockItem {
  id: string;
  name: string;
  quantity: number;
  unit?: string | null;
  unit_cost?: number | null;
  supplier?: string | null;
}

export interface AddMaterialInput {
  name: string;
  quantity?: number;
  unit?: string;
  unitPrice?: number;
  supplier?: string;
  inventoryItemId?: string;
  source?: 'manual' | 'quote' | 'survey';
  sourceItemId?: string;
}

/** Per-job materials list — seeded from quotes, linked to own stock (ELE Jobs S6). */
export const useJobMaterials = (projectId?: string) => {
  const { toast } = useToast();
  const [materials, setMaterials] = useState<JobMaterial[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const notifyChanged = () => {
    try {
      window.dispatchEvent(new CustomEvent('job-materials-changed'));
    } catch {
      /* SSR/embedded contexts — ignore */
    }
  };

  const load = useCallback(async () => {
    if (!projectId) return;
    try {
      setIsLoading(true);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const { data, error } = await (supabase as any)
        .from('job_materials')
        .select('*')
        .eq('project_id', projectId)
        .order('created_at', { ascending: true });
      if (error) throw error;
      setMaterials((data || []) as JobMaterial[]);
    } catch (err) {
      console.error('Failed to load job materials:', err);
    } finally {
      setIsLoading(false);
    }
  }, [projectId]);

  useEffect(() => {
    load();
  }, [load]);

  const addMaterial = async (input: AddMaterialInput): Promise<boolean> => {
    if (!projectId || !input.name.trim()) return false;
    try {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (!user) throw new Error('Not signed in');
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const { error } = await (supabase as any).from('job_materials').insert({
        user_id: user.id,
        project_id: projectId,
        name: input.name.trim(),
        quantity: input.quantity ?? 1,
        unit: input.unit || null,
        unit_price: input.unitPrice ?? null,
        supplier: input.supplier || null,
        inventory_item_id: input.inventoryItemId || null,
        source: input.source || 'manual',
        source_item_id: input.sourceItemId || null,
      });
      if (error) throw error;
      await load();
      notifyChanged();
      return true;
    } catch (err) {
      console.error('Failed to add material:', err);
      toast({ title: 'Could not add material', variant: 'destructive' });
      return false;
    }
  };

  /** Pull materials line items from every quote linked to this job. Idempotent. */
  const importFromQuotes = async (): Promise<number> => {
    if (!projectId) return 0;
    try {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (!user) throw new Error('Not signed in');
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const { data: quotes, error } = await (supabase as any)
        .from('quotes')
        .select('id, items')
        .eq('project_id', projectId);
      if (error) throw error;

      // Fresh from the DB — state can be stale, and a duplicate would fail the
      // whole insert against the partial unique index.
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const { data: current } = await (supabase as any)
        .from('job_materials')
        .select('source, source_item_id')
        .eq('project_id', projectId)
        .not('source_item_id', 'is', null);
      const existing = new Set(
        ((current || []) as { source: string; source_item_id: string }[]).map(
          (m) => `${m.source}:${m.source_item_id}`
        )
      );
      type QuoteItem = {
        id?: string;
        description?: string;
        quantity?: number;
        unit?: string;
        unitPrice?: number;
        category?: string;
        inventoryItemId?: string;
      };
      const rows: Record<string, unknown>[] = [];
      for (const q of (quotes || []) as { id: string; items?: QuoteItem[] }[]) {
        for (const item of q.items || []) {
          if (item.category !== 'materials' || !item.description?.trim()) continue;
          const sourceId = item.id || `${q.id}:${item.description}`;
          if (existing.has(`quote:${sourceId}`)) continue;
          rows.push({
            user_id: user.id,
            project_id: projectId,
            name: item.description.trim(),
            quantity: item.quantity ?? 1,
            unit: item.unit || null,
            unit_price: item.unitPrice ?? null,
            inventory_item_id: item.inventoryItemId || null,
            source: 'quote',
            source_item_id: sourceId,
          });
        }
      }
      if (rows.length > 0) {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const { error: insErr } = await (supabase as any).from('job_materials').insert(rows);
        if (insErr) throw insErr;
        await load();
        notifyChanged();
        toast({
          title: `${rows.length} material${rows.length === 1 ? '' : 's'} imported`,
          description: 'Pulled from the quote — tick them off as you get them.',
        });
      } else {
        toast({ title: 'Nothing new to import', description: 'The quote items are already on the list.' });
      }
      return rows.length;
    } catch (err) {
      console.error('Failed to import quote materials:', err);
      toast({ title: 'Import failed', variant: 'destructive' });
      return 0;
    }
  };

  /** Tick off a material; when it came from own stock, decrement + ledger the movement. */
  const markGot = async (id: string, fromStock: boolean): Promise<void> => {
    try {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const { data, error } = await (supabase as any).rpc('mark_job_material_got', {
        p_material_id: id,
        p_from_stock: fromStock,
      });
      if (error) throw error;
      if (fromStock && data?.stock_remaining !== null && data?.stock_remaining !== undefined) {
        toast({
          title: 'Taken from stock',
          description: `${data.stock_remaining} left on the van`,
        });
      }
      await load();
      notifyChanged();
    } catch (err) {
      console.error('Failed to mark material got:', err);
      toast({ title: 'Could not update material', variant: 'destructive' });
    }
  };

  /** Un-tick. When the tick took it from stock, put it back and ledger the return. */
  const markNeeded = async (id: string, restock: boolean): Promise<void> => {
    try {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const { error } = await (supabase as any).rpc('mark_job_material_needed', {
        p_material_id: id,
        p_restock: restock,
      });
      if (error) throw error;
      if (restock) toast({ title: 'Returned to stock' });
      await load();
      notifyChanged();
    } catch (err) {
      console.error('Failed to mark material needed:', err);
    }
  };

  const removeMaterial = async (id: string): Promise<void> => {
    try {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const { error } = await (supabase as any).from('job_materials').delete().eq('id', id);
      if (error) throw error;
      setMaterials((prev) => prev.filter((m) => m.id !== id));
      notifyChanged();
    } catch (err) {
      console.error('Failed to remove material:', err);
    }
  };

  /** Search own stock for the "from the van" picker. */
  const searchStock = async (query: string): Promise<StockItem[]> => {
    try {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (!user) return [];
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      let q = (supabase as any)
        .from('personal_inventory')
        .select('id, name, quantity, unit, unit_cost, supplier')
        .eq('user_id', user.id)
        .order('name')
        .limit(12);
      if (query.trim()) q = q.ilike('name', `%${query.trim()}%`);
      const { data, error } = await q;
      if (error) throw error;
      return (data || []) as StockItem[];
    } catch {
      return [];
    }
  };

  const neededCount = materials.filter((m) => m.status === 'needed' || m.status === 'ordered').length;
  const totalCost = materials.reduce(
    (sum, m) => sum + (Number(m.unit_price) || 0) * (Number(m.quantity) || 0),
    0
  );

  return {
    materials,
    isLoading,
    neededCount,
    totalCost,
    addMaterial,
    importFromQuotes,
    markGot,
    markNeeded,
    removeMaterial,
    searchStock,
    refresh: load,
  };
};
