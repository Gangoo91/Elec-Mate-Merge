-- Phase 0 foundation: connect Price Book + Stock Inventory, with an auditable
-- stock ledger so invoice-time decrements can be tracked and reversed.
-- Tickets: ELE-1012 (connect), ELE-1014 (stock-aware quoting), ELE-1016.
--
-- Design notes:
--   * Stock lives in `personal_inventory` (one row per item, has `quantity`).
--   * Price-book items live as JSONB inside `materials_lists.items` — the link to
--     a stock item is a new optional `personal_inventory_id` on the JSONB item
--     (no DDL needed for that; it's just JSON).
--   * Quotes AND invoices are both rows in `quotes` (invoices = invoice_raised=true),
--     so a single `quote_id` FK covers both. Decrement fires when the invoice is
--     raised (chosen lifecycle), recorded here as reason='invoice_raised'.
--   * This ledger is the source of truth for *why* stock moved, enabling restore
--     on void/cancel (reason='reversal').

CREATE TABLE IF NOT EXISTS public.inventory_movements (
  id                uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id           uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  inventory_item_id uuid NOT NULL REFERENCES public.personal_inventory(id) ON DELETE CASCADE,
  quantity          numeric NOT NULL CHECK (quantity > 0),   -- always positive; `direction` carries the sign
  direction         text NOT NULL CHECK (direction IN ('out','in')),
  reason            text NOT NULL CHECK (reason IN ('invoice_raised','manual_adjustment','restock','reversal')),
  quote_id          uuid REFERENCES public.quotes(id) ON DELETE SET NULL, -- the quote/invoice that caused it
  note              text,
  created_at        timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_inventory_movements_user  ON public.inventory_movements(user_id);
CREATE INDEX IF NOT EXISTS idx_inventory_movements_item  ON public.inventory_movements(inventory_item_id);
CREATE INDEX IF NOT EXISTS idx_inventory_movements_quote ON public.inventory_movements(quote_id);

ALTER TABLE public.inventory_movements ENABLE ROW LEVEL SECURITY;

-- Owner-only access (matches personal_inventory's RLS model).
DROP POLICY IF EXISTS "Users manage own inventory movements" ON public.inventory_movements;
CREATE POLICY "Users manage own inventory movements"
  ON public.inventory_movements
  FOR ALL
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);
