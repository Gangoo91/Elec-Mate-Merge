/* eslint-disable @typescript-eslint/no-explicit-any */
import { useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';
import type { QuoteItem } from '@/types/quote';

type StockLine = QuoteItem & { actualQuantity?: number };

/**
 * Stock decrement engine (ELE-1014).
 *
 * When an invoice is raised, any line item that was added from a stock-linked
 * price-book item carries `inventoryItemId`. The actual stock maths runs in two
 * Postgres RPCs so it's transaction-safe (no read-then-write races) and the
 * ledger write + quantity update happen atomically:
 *
 *   apply_invoice_stock_decrement  — decrement, idempotent PER (quote, item),
 *     so re-saves never double-count and items added in a later edit still move.
 *   reverse_invoice_stock_decrement — restore stock when an invoice is voided,
 *     idempotent per quote.
 *
 * Both are owner-scoped via RLS + auth.uid(). Best-effort and non-fatal here:
 * failures are logged and must never block the invoice save/delete.
 */
export function useStockMovements() {
  /** Decrement stock for an invoice's stock-linked line items. Safe to call on every save. */
  const applyInvoiceDecrement = useCallback(
    async (quoteId: string | undefined | null, items: StockLine[] | undefined | null): Promise<void> => {
      try {
        if (!quoteId || !items?.length) return;

        // Use the actual quantity used when present (partial completion),
        // otherwise the quoted quantity. Only stock-linked, positive lines.
        const lines = items
          .filter((i) => i?.inventoryItemId)
          .map((i) => ({
            inventory_item_id: i.inventoryItemId,
            quantity: Number(i.actualQuantity ?? i.quantity) || 0,
            note: i.description ?? null,
          }))
          .filter((l) => l.quantity > 0);
        if (!lines.length) return;

        const { error } = await (supabase as any).rpc('apply_invoice_stock_decrement', {
          p_quote_id: quoteId,
          p_lines: lines,
        });
        if (error) console.error('[useStockMovements] decrement RPC error:', error);
      } catch (err) {
        console.error('[useStockMovements] applyInvoiceDecrement failed:', err);
      }
    },
    [],
  );

  /** Restore stock previously decremented for an invoice (on void/delete). Idempotent. */
  const reverseInvoiceDecrement = useCallback(
    async (quoteId: string | undefined | null): Promise<void> => {
      try {
        if (!quoteId) return;
        const { error } = await (supabase as any).rpc('reverse_invoice_stock_decrement', {
          p_quote_id: quoteId,
        });
        if (error) console.error('[useStockMovements] reversal RPC error:', error);
      } catch (err) {
        console.error('[useStockMovements] reverseInvoiceDecrement failed:', err);
      }
    },
    [],
  );

  return { applyInvoiceDecrement, reverseInvoiceDecrement };
}
