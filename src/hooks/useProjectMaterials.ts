/**
 * useProjectMaterials — the materials (and other line items) that went into a
 * project, aggregated from its quotes/invoices. Line items already carry an
 * `inventoryItemId` (ELE-1014, the stock link), so this is the project-side
 * view of what stock was used on the job.
 *
 * Source of truth: invoices if the project has any (what was actually billed),
 * otherwise the quotes. Items are grouped by inventory link (or description)
 * and summed.
 */
import { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import type { QuoteItem } from '@/types/quote';

export interface ProjectMaterial {
  key: string;
  name: string;
  unit?: string;
  quantity: number;
  totalCost: number;
  fromInventory: boolean;
}

interface RowWithItems {
  items: QuoteItem[] | null;
}

const lineCost = (i: QuoteItem): number =>
  typeof i.totalPrice === 'number' ? i.totalPrice : (i.quantity || 0) * (i.unitPrice || 0);

export function useProjectMaterials(projectId?: string) {
  const [materials, setMaterials] = useState<ProjectMaterial[]>([]);
  const [totalCost, setTotalCost] = useState(0);
  const [source, setSource] = useState<'invoices' | 'quotes' | 'none'>('none');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!projectId) {
      setLoading(false);
      return;
    }
    let cancelled = false;

    (async () => {
      setLoading(true);
      try {
        const {
          data: { user },
        } = await supabase.auth.getUser();
        if (!user) return;

        const [invRes, quoteRes] = await Promise.all([
          supabase.from('invoices').select('items').eq('project_id', projectId).eq('user_id', user.id),
          supabase.from('quotes').select('items').eq('project_id', projectId).eq('user_id', user.id),
        ]);
        if (cancelled) return;

        const invoiceRows = (invRes.data || []) as RowWithItems[];
        const quoteRows = (quoteRes.data || []) as RowWithItems[];
        const useInvoices = invoiceRows.length > 0;
        const rows = useInvoices ? invoiceRows : quoteRows;

        // Materials = the 'materials' category and/or anything linked to inventory.
        const agg = new Map<string, ProjectMaterial>();
        for (const row of rows) {
          for (const item of row.items || []) {
            const isMaterial = item.category === 'materials' || !!item.inventoryItemId;
            if (!isMaterial) continue;
            const key = item.inventoryItemId || (item.description || 'item').toLowerCase().trim();
            const existing = agg.get(key);
            const cost = lineCost(item);
            if (existing) {
              existing.quantity += item.quantity || 0;
              existing.totalCost += cost;
            } else {
              agg.set(key, {
                key,
                name: item.description || 'Material',
                unit: item.unit,
                quantity: item.quantity || 0,
                totalCost: cost,
                fromInventory: !!item.inventoryItemId,
              });
            }
          }
        }

        const list = Array.from(agg.values()).sort((a, b) => b.totalCost - a.totalCost);
        setMaterials(list);
        setTotalCost(list.reduce((s, m) => s + m.totalCost, 0));
        setSource(list.length > 0 ? (useInvoices ? 'invoices' : 'quotes') : 'none');
      } catch (err) {
        console.error('[useProjectMaterials] load failed', err);
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [projectId]);

  return { materials, totalCost, source, loading };
}
