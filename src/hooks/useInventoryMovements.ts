import { useCallback, useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';

/**
 * The stock ledger, read side.
 *
 * `inventory_movements` has existed with a full schema — direction, reason,
 * quote_id, project_id — and two transaction-safe RPCs writing to it whenever
 * an invoice carrying stock-linked items is raised or voided (ELE-1014). It has
 * never been displayed anywhere, so "why has my socket count dropped?" had no
 * answer in the app.
 *
 * Read-only and best-effort: a failure here shows no history, never blocks the
 * item you were trying to edit.
 */

export type MovementDirection = 'in' | 'out';

export interface InventoryMovement {
  id: string;
  quantity: number;
  direction: MovementDirection;
  reason: string | null;
  note: string | null;
  quoteId: string | null;
  projectId: string | null;
  createdAt: string;
}

interface MovementRow {
  id: string;
  quantity: number;
  direction: string;
  reason: string | null;
  note: string | null;
  quote_id: string | null;
  project_id: string | null;
  created_at: string;
}

export function useInventoryMovements(itemId: string | null | undefined, limit = 20) {
  const [movements, setMovements] = useState<InventoryMovement[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchMovements = useCallback(async () => {
    if (!itemId) {
      setMovements([]);
      return;
    }
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('inventory_movements' as never)
        .select('id, quantity, direction, reason, note, quote_id, project_id, created_at')
        .eq('inventory_item_id', itemId)
        .order('created_at', { ascending: false })
        .limit(limit);

      if (error) {
        console.warn('[useInventoryMovements] fetch failed', error);
        setMovements([]);
        return;
      }

      setMovements(
        ((data || []) as unknown as MovementRow[]).map((r) => ({
          id: r.id,
          quantity: r.quantity,
          direction: r.direction === 'in' ? 'in' : 'out',
          reason: r.reason,
          note: r.note,
          quoteId: r.quote_id,
          projectId: r.project_id,
          createdAt: r.created_at,
        }))
      );
    } finally {
      setLoading(false);
    }
  }, [itemId, limit]);

  useEffect(() => {
    fetchMovements();
  }, [fetchMovements]);

  return { movements, loading, refresh: fetchMovements };
}

/** "Used on an invoice", "Added by hand" — the raw reason codes are not English. */
export const describeMovementReason = (
  reason: string | null,
  direction: MovementDirection
): string => {
  switch (reason) {
    case 'invoice':
      return 'Used on an invoice';
    case 'invoice_reversal':
      return 'Invoice voided — put back';
    case 'manual':
      return direction === 'in' ? 'Added by hand' : 'Taken by hand';
    case 'import':
      return 'Imported';
    default:
      return direction === 'in' ? 'Stock in' : 'Stock out';
  }
};
