import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useActingFirmId } from '@/hooks/useFirmPriceBook';

/* ==========================================================================
   Wholesaler accounts, trade price files and price moves (ELE-2066).

   There is no live price link to any UK electrical wholesaler: none of CEF,
   Edmundson, Rexel, YESSS, TLC, Screwfix or Toolstation publishes a price
   API (Rexel offers EDI/punchout by arrangement only; research: "06
   Wholesaler routes", 10 Oct 2026). So a
   firm's prices arrive as the account price file its branch or portal gives
   it, imported here:
     get_supplier_connections      the firm's accounts (owner/admin only)
     save_supplier_connection      add or edit; keeps the supplier row in step
     remove_supplier_connection
     preview_supplier_price_file   match rows to the price book (code, name, similar)
     apply_supplier_price_file     keep the prices, log moves, update buy prices
     get_firm_price_moves          recent price moves with open-quote counts
     get_quote_price_moves         read-only note on one open quote
     get_firm_supplier_codes       product codes for purchase orders
     compare_bill_to_order / record_bill_line_variances   bill vs PO, line by line
   Every one is owner/admin only (can_see_firm_money), except the quote note,
   which office managers see as percentages only.
   ========================================================================== */

// Cast: these RPCs postdate the last types.ts regeneration.
const rpc = (name: string, args: Record<string, unknown>) =>
  supabase.rpc(name as never, args as never) as unknown as Promise<{
    data: unknown;
    error: { message: string } | null;
  }>;

export type WholesalerKey =
  | 'cef'
  | 'edmundson'
  | 'rexel'
  | 'denmans'
  | 'yesss'
  | 'tlc'
  | 'screwfix'
  | 'toolstation'
  | 'other';

export interface WholesalerInfo {
  key: WholesalerKey;
  label: string;
  /** The name a new account gets. */
  defaultName: string;
  /** How the firm gets its prices out of this wholesaler, plainly. */
  prices: string;
  /** How orders reach them. */
  orders: string;
}

/** What each wholesaler actually offers (desk research, 10 Oct 2026). */
export const WHOLESALERS: WholesalerInfo[] = [
  {
    key: 'cef',
    label: 'CEF',
    defaultName: 'CEF (City Electrical Factors)',
    prices:
      'Pricing is set per account by your branch. Ask the branch manager to email your account price list as a CSV or Excel file.',
    orders:
      'Purchase orders go to your branch by email. Ask the branch which address takes orders.',
  },
  {
    key: 'edmundson',
    label: 'Edmundson',
    defaultName: 'Edmundson Electrical',
    prices:
      'Branches run their own pricing. Ask your branch for an export of your account prices as a CSV or Excel file.',
    orders:
      'Purchase orders go to your branch by email. Ask the branch which address takes orders.',
  },
  {
    key: 'rexel',
    label: 'Rexel',
    defaultName: 'Rexel UK',
    prices:
      'Rexel makes account e-catalogues. Ask your account manager, or customersupport@rexel.co.uk, for yours as a CSV.',
    orders: 'Purchase orders go by email. Rexel also takes orders through its webshop.',
  },
  {
    key: 'denmans',
    label: 'Denmans',
    defaultName: 'Denmans Electrical',
    prices:
      'Denmans is now part of Rexel. Ask your branch or Rexel customer support for your account e-catalogue as a CSV.',
    orders: 'Purchase orders go to your branch by email.',
  },
  {
    key: 'yesss',
    label: 'YESSS',
    defaultName: 'YESSS Electrical',
    prices:
      'Ask your account manager whether your online account can export your prices as a CSV or Excel file.',
    orders: 'Purchase orders go to your branch by email.',
  },
  {
    key: 'tlc',
    label: 'TLC Direct',
    defaultName: 'TLC Direct',
    prices:
      'TLC sells to everyone at its published prices. Import a list of what you buy from them, with their product codes.',
    orders: 'Purchase orders go by email. TLC also takes orders on its website.',
  },
  {
    key: 'screwfix',
    label: 'Screwfix',
    defaultName: 'Screwfix',
    prices:
      'Screwfix prices are the same for every customer. Import a list of what you buy from them, with their product codes.',
    orders: 'Screwfix takes orders on its website, app or by phone, not by email.',
  },
  {
    key: 'toolstation',
    label: 'Toolstation',
    defaultName: 'Toolstation',
    prices:
      'Toolstation prices are the same for every customer. Import a list of what you buy from them, with their product codes.',
    orders: 'Toolstation takes orders on its website, app or by phone, not by email.',
  },
  {
    key: 'other',
    label: 'Other',
    defaultName: '',
    prices: 'Ask the wholesaler for your account prices as a CSV or Excel file.',
    orders: 'Purchase orders go to the order email you add here.',
  },
];

export const wholesalerInfo = (key: string | null | undefined): WholesalerInfo =>
  WHOLESALERS.find((w) => w.key === key) ?? WHOLESALERS[WHOLESALERS.length - 1];

export interface SupplierConnection {
  id: string;
  wholesaler: WholesalerKey;
  display_name: string;
  supplier_id: string | null;
  supplier_name: string | null;
  account_number: string | null;
  branch: string | null;
  order_email: string | null;
  price_alert_pct: number;
  price_count: number;
  linked_count: number;
  last_synced_at: string | null;
  last_import: {
    at: string;
    file_name: string | null;
    rows: number;
    price_changes: number;
    big_moves: number;
    book_updated: number;
    added: number;
  } | null;
  created_at: string;
}

export function useSupplierConnections(enabled = true) {
  const { data: firmId } = useActingFirmId();
  return useQuery({
    queryKey: ['supplier-connections', firmId],
    enabled: !!firmId && enabled,
    staleTime: 30 * 1000,
    queryFn: async (): Promise<SupplierConnection[]> => {
      const { data, error } = await rpc('get_supplier_connections', { p_firm: firmId });
      if (error) throw error;
      return ((data as SupplierConnection[] | null) ?? []).map((c) => ({
        ...c,
        price_alert_pct: Number(c.price_alert_pct),
        price_count: Number(c.price_count),
        linked_count: Number(c.linked_count),
      }));
    },
  });
}

export interface SaveConnectionInput {
  id?: string | null;
  wholesaler: WholesalerKey;
  display_name: string;
  account_number?: string | null;
  branch?: string | null;
  order_email?: string | null;
  price_alert_pct?: number;
}

const invalidateAll = (qc: ReturnType<typeof useQueryClient>) => {
  qc.invalidateQueries({ queryKey: ['supplier-connections'] });
  qc.invalidateQueries({ queryKey: ['firm-price-moves'] });
  qc.invalidateQueries({ queryKey: ['firm-price-book'] });
  qc.invalidateQueries({ queryKey: ['firm-supplier-codes'] });
  qc.invalidateQueries({ queryKey: ['suppliers'] });
  qc.invalidateQueries({ queryKey: ['quote-price-moves'] });
};

export function useSaveSupplierConnection() {
  const qc = useQueryClient();
  const { data: firmId } = useActingFirmId();
  return useMutation({
    mutationFn: async (i: SaveConnectionInput) => {
      const { data, error } = await rpc('save_supplier_connection', {
        p_firm: firmId,
        p_id: i.id ?? null,
        p_wholesaler: i.wholesaler,
        p_display_name: i.display_name,
        p_account_number: i.account_number ?? null,
        p_branch: i.branch ?? null,
        p_order_email: i.order_email ?? null,
        p_route: 'price_file',
        p_feed_url: null,
        p_auto_sync: false,
        p_price_alert_pct: i.price_alert_pct ?? 5,
        p_supplier_id: null,
      });
      if (error) throw error;
      return data as string;
    },
    onSuccess: () => invalidateAll(qc),
  });
}

export function useRemoveSupplierConnection() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (id: string) => {
      const { error } = await rpc('remove_supplier_connection', { p_id: id });
      if (error) throw error;
    },
    onSuccess: () => invalidateAll(qc),
  });
}

/* ── Price files ─────────────────────────────────────────────────────── */

export interface PriceFileRow {
  code: string;
  description: string;
  unit?: string | null;
  price: number;
  list_price?: number | null;
}

export type MatchKind = 'linked' | 'code' | 'name' | 'similar';

export interface PreviewRow {
  n: number;
  code: string | null;
  price: number | null;
  current_price: number | null;
  change_pct: number | null;
  item_id: string | null;
  item_name: string | null;
  match: MatchKind | null;
  item_cost: number | null;
}

const PREVIEW_CHUNK = 2000;

/** Matches every row (in 2,000-row calls) against the price book. */
export async function previewPriceFile(
  connectionId: string,
  rows: PriceFileRow[]
): Promise<PreviewRow[]> {
  const out: PreviewRow[] = [];
  for (let at = 0; at < rows.length; at += PREVIEW_CHUNK) {
    const chunk = rows.slice(at, at + PREVIEW_CHUNK).map((r) => ({
      code: r.code,
      description: r.description,
      price: String(r.price),
    }));
    const { data, error } = await rpc('preview_supplier_price_file', {
      p_connection: connectionId,
      p_rows: chunk,
    });
    if (error) throw error;
    for (const r of (data as PreviewRow[] | null) ?? []) {
      out.push({
        ...r,
        n: Number(r.n) - 1 + at,
        price: r.price != null ? Number(r.price) : null,
        current_price: r.current_price != null ? Number(r.current_price) : null,
        change_pct: r.change_pct != null ? Number(r.change_pct) : null,
        item_cost: r.item_cost != null ? Number(r.item_cost) : null,
      });
    }
  }
  return out;
}

export interface ApplyRow extends PriceFileRow {
  item_id?: string | null;
  match?: 'code' | 'name' | 'similar' | 'manual' | null;
  add?: boolean;
}

export interface ApplyResult {
  rows: number;
  linked: number;
  added: number;
  price_changes: number;
  big_moves: number;
  book_updated: number;
}

export function useApplyPriceFile() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (i: { connectionId: string; rows: ApplyRow[]; fileName: string | null }) => {
      const { data, error } = await rpc('apply_supplier_price_file', {
        p_connection: i.connectionId,
        p_rows: i.rows.map((r) => ({
          code: r.code,
          description: r.description,
          unit: r.unit ?? null,
          price: String(r.price),
          list_price: r.list_price != null ? String(r.list_price) : null,
          item_id: r.item_id ?? null,
          match: r.match ?? null,
          add: !!r.add,
        })),
        p_file_name: i.fileName,
      });
      if (error) throw error;
      return data as ApplyResult;
    },
    onSuccess: () => invalidateAll(qc),
  });
}

/* ── Price moves ─────────────────────────────────────────────────────── */

export interface PriceMove {
  id: string;
  connection: string;
  product_code: string;
  description: string | null;
  item_id: string | null;
  item_name: string | null;
  old_price: number;
  new_price: number;
  change_pct: number;
  big: boolean;
  book_applied: boolean;
  moved_at: string;
  open_quotes: number;
}

export function useFirmPriceMoves(enabled = true, days = 60) {
  const { data: firmId } = useActingFirmId();
  return useQuery({
    queryKey: ['firm-price-moves', firmId, days],
    enabled: !!firmId && enabled,
    staleTime: 60 * 1000,
    queryFn: async (): Promise<PriceMove[]> => {
      const { data, error } = await rpc('get_firm_price_moves', { p_firm: firmId, p_days: days });
      if (error) throw error;
      return ((data as PriceMove[] | null) ?? []).map((m) => ({
        ...m,
        old_price: Number(m.old_price),
        new_price: Number(m.new_price),
        change_pct: Number(m.change_pct),
        open_quotes: Number(m.open_quotes),
      }));
    },
  });
}

export interface QuotePriceMoveLine {
  description: string;
  item_name: string | null;
  change_pct: number;
  /** Owner/admin only. */
  old_price?: number;
  new_price?: number;
  moved_at: string;
}

export interface QuotePriceMoves {
  open?: boolean;
  sent?: boolean;
  since?: string;
  alert_pct?: number;
  lines: QuotePriceMoveLine[];
}

export function useQuotePriceMoves(quoteId: string | null | undefined) {
  return useQuery({
    queryKey: ['quote-price-moves', quoteId],
    enabled: !!quoteId,
    staleTime: 60 * 1000,
    queryFn: async (): Promise<QuotePriceMoves> => {
      const { data, error } = await rpc('get_quote_price_moves', { p_quote: quoteId });
      if (error) throw error;
      const d = (data as QuotePriceMoves | null) ?? { lines: [] };
      return {
        ...d,
        lines: (d.lines ?? []).map((l) => ({ ...l, change_pct: Number(l.change_pct) })),
      };
    },
  });
}

/* ── Product codes for purchase orders ───────────────────────────────── */

export interface SupplierCode {
  item_id: string;
  supplier_id: string | null;
  product_code: string;
  trade_price: number;
}

export function useFirmSupplierCodes(enabled = true) {
  const { data: firmId } = useActingFirmId();
  return useQuery({
    queryKey: ['firm-supplier-codes', firmId],
    enabled: !!firmId && enabled,
    staleTime: 60 * 1000,
    queryFn: async (): Promise<Map<string, SupplierCode>> => {
      const { data, error } = await rpc('get_firm_supplier_codes', { p_firm: firmId });
      if (error) throw error;
      const m = new Map<string, SupplierCode>();
      for (const r of (data as SupplierCode[] | null) ?? []) {
        m.set(`${r.item_id}|${r.supplier_id ?? ''}`, { ...r, trade_price: Number(r.trade_price) });
      }
      return m;
    },
  });
}

/* ── A supplier bill against its purchase order ──────────────────────── */

export type BillLineStatus = 'same' | 'dearer' | 'cheaper' | 'not_ordered' | 'no_price';

export interface BillVsOrder {
  order_number: string | null;
  job_id: string | null;
  job_title: string | null;
  lines: {
    description: string;
    qty: number | null;
    unit_price: number | null;
    net: number | null;
    po_name: string | null;
    po_qty: number | null;
    po_unit_cost: number | null;
    diff_each: number | null;
    diff_total: number | null;
    status: BillLineStatus;
  }[];
  not_billed: { name: string; qty: number; unit_cost: number }[];
  dearer_total: number;
  cheaper_total: number;
}

export function useCompareBillToOrder(captureId: string | null, orderId: string | null) {
  return useQuery({
    queryKey: ['bill-vs-order', captureId, orderId],
    enabled: !!captureId && !!orderId,
    staleTime: 30 * 1000,
    retry: false,
    queryFn: async (): Promise<BillVsOrder> => {
      const { data, error } = await rpc('compare_bill_to_order', {
        p_capture: captureId,
        p_order: orderId,
      });
      if (error) throw error;
      return data as BillVsOrder;
    },
  });
}

/** After a bill is posted to a PO: write the line differences onto it. */
export async function recordBillLineVariances(captureId: string) {
  const { data, error } = await rpc('record_bill_line_variances', { p_capture: captureId });
  if (error) throw error;
  return data as { recorded: boolean; flags?: number };
}
