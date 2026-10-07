import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { getActingEmployerId } from '@/lib/actingEmployer';

/* ==========================================================================
   The firm's ONE price book (ELE-1991).

   It is the owner's Electrical Hub price book — `materials_lists`, scoped to
   the owner, who IS the firm — not a second table. Managers reach it through
   SECURITY DEFINER RPCs:
     get_firm_price_book        every item, buy/markup/last-paid null for office
     save_firm_price_book_item  add (to the owner's "Price Book" list) or edit
     delete_firm_price_book_item
     import_firm_price_book     CSV rows; existing names update, new ones add
     get_firm_material_names    names + units only, for roster workers
   An edit here shows in the owner's Electrical Hub price book and the other
   way round. Quotes, purchase orders and (later) van stock all read it.
   ========================================================================== */

export interface FirmPriceBookItem {
  item_id: string;
  list_id: string;
  list_name: string;
  name: string;
  unit: string;
  /** Stored category if set, else derived from the name (see deriveCategory). */
  category: string;
  sell_price: number | null;
  /** null for office managers — they never see buy prices. */
  buy_price: number | null;
  markup_percent: number | null;
  supplier: string | null;
  supplier_id: string | null;
  last_paid_price: number | null;
  last_paid_at: string | null;
  last_paid_supplier: string | null;
  price_updated_at: string | null;
  labour_hours: number | null;
  money_visible: boolean;
}

export interface SaveFirmPriceBookInput {
  item_id?: string | null;
  name: string;
  unit?: string;
  category?: string | null;
  sell?: number | null;
  buy?: number | null;
  markup?: number | null;
  supplier?: string | null;
  supplier_id?: string | null;
}

export const PRICE_BOOK_STALE_DAYS = 60;

/**
 * Same rule as the Electrical Hub price book page: an imported labour-book row
 * is named "SECTION — item — variant", so the section is the category; else a
 * keyword guess. A stored category wins.
 */
export function deriveCategory(name: string, stored?: string | null): string {
  if (stored && stored.trim()) return stored.trim();
  const emDash = name.indexOf(' — ');
  if (emDash > 0) {
    const section = name.slice(0, emDash).trim();
    if (section.length > 2) return section;
  }
  const n = name.toLowerCase();
  if (/(cable|wire|flex|t&e|swa|twin and earth)/.test(n)) return 'Cable';
  if (/(consumer unit|\bcu\b|rcbo|mcb|rcd|spd|isolator|fuse)/.test(n)) return 'Protection & boards';
  if (/(socket|switch|plate|dimmer|fcu|spur|usb)/.test(n)) return 'Wiring accessories';
  if (/(light|lamp|downlight|led|batten|emergency)/.test(n)) return 'Lighting';
  if (/(ev |charger|solar|inverter|battery)/.test(n)) return 'EV & renewables';
  if (/(box|clip|fixing|screw|plug|gland|trunking|conduit|tray|tie)/.test(n)) return 'Fixings & containment';
  return 'General';
}

/** The price a line uses: sell on quotes; buy (else last paid) on orders. */
export function priceFor(item: FirmPriceBookItem, mode: 'sell' | 'buy'): number | null {
  if (mode === 'sell') return item.sell_price;
  return item.buy_price ?? item.last_paid_price ?? null;
}

export const normaliseName = (n: string) => n.trim().toLowerCase().replace(/\s+/g, ' ');

export function daysSince(iso: string | null | undefined): number | null {
  if (!iso) return null;
  const t = new Date(iso).getTime();
  if (Number.isNaN(t)) return null;
  return Math.floor((Date.now() - t) / 86_400_000);
}

export const gbp = (v: number | null | undefined) =>
  v == null
    ? '—'
    : `£${Number(v).toLocaleString('en-GB', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;

/** The firm this person is working for (owner id; their own for an owner). */
export function useActingFirmId() {
  const { user } = useAuth();
  return useQuery({
    queryKey: ['acting-firm', user?.id],
    enabled: !!user,
    staleTime: 5 * 60 * 1000,
    queryFn: async () => (await getActingEmployerId(user!.id)) ?? user!.id,
  });
}

export function useFirmPriceBook() {
  const { data: firmId } = useActingFirmId();
  return useQuery({
    queryKey: ['firm-price-book', firmId],
    enabled: !!firmId,
    staleTime: 30 * 1000,
    queryFn: async (): Promise<FirmPriceBookItem[]> => {
      // Cast: RPC postdates the last types.ts regeneration.
      const { data, error } = await supabase.rpc('get_firm_price_book' as never, {
        p_firm: firmId,
      } as never);
      if (error) throw error;
      const rows = (data ?? []) as unknown as Array<Omit<FirmPriceBookItem, 'category'> & { category: string | null }>;
      const num = (v: unknown) => (v == null ? null : Number(v));
      return rows.map((r) => ({
        ...r,
        category: deriveCategory(r.name, r.category),
        sell_price: num(r.sell_price),
        buy_price: num(r.buy_price),
        markup_percent: num(r.markup_percent),
        last_paid_price: num(r.last_paid_price),
        labour_hours: num(r.labour_hours),
      }));
    },
  });
}

/** Names and units only — safe for a worker logging materials used. */
export function useFirmMaterialNames(firmId: string | null | undefined) {
  return useQuery({
    queryKey: ['firm-material-names', firmId],
    enabled: !!firmId,
    staleTime: 5 * 60 * 1000,
    queryFn: async (): Promise<Array<{ item_id: string; name: string; unit: string }>> => {
      const { data, error } = await supabase.rpc('get_firm_material_names' as never, {
        p_firm: firmId,
      } as never);
      if (error) throw error;
      return (data ?? []) as unknown as Array<{ item_id: string; name: string; unit: string }>;
    },
  });
}

const friendly = (e: unknown, fallback: string) => {
  const msg = (e as { message?: string })?.message ?? '';
  if (/already in the price book|no longer in the price book|between £0|Give the item a name|Unknown supplier|Import up to/.test(msg)) {
    return msg;
  }
  return fallback;
};

export function useSaveFirmPriceBookItem() {
  const qc = useQueryClient();
  const { data: firmId } = useActingFirmId();
  return useMutation({
    mutationFn: async (input: SaveFirmPriceBookInput): Promise<string> => {
      if (!firmId) throw new Error('No firm');
      const { data, error } = await supabase.rpc('save_firm_price_book_item' as never, {
        p_firm: firmId,
        p_item_id: input.item_id ?? null,
        p_name: input.name,
        p_unit: input.unit ?? 'each',
        p_category: input.category ?? null,
        p_sell: input.sell ?? null,
        p_buy: input.buy ?? null,
        p_markup: input.markup ?? null,
        p_supplier: input.supplier ?? null,
        p_supplier_id: input.supplier_id ?? null,
      } as never);
      if (error) throw error;
      return data as unknown as string;
    },
    onSuccess: (_id, input) => {
      qc.invalidateQueries({ queryKey: ['firm-price-book'] });
      qc.invalidateQueries({ queryKey: ['firm-material-names'] });
      toast.success(input.item_id ? 'Price book updated' : 'Added to the price book');
    },
    onError: (e) => toast.error(friendly(e, 'Could not save that item. Try again.')),
  });
}

export function useDeleteFirmPriceBookItem() {
  const qc = useQueryClient();
  const { data: firmId } = useActingFirmId();
  return useMutation({
    mutationFn: async (itemId: string): Promise<boolean> => {
      if (!firmId) throw new Error('No firm');
      const { data, error } = await supabase.rpc('delete_firm_price_book_item' as never, {
        p_firm: firmId,
        p_item_id: itemId,
      } as never);
      if (error) throw error;
      return !!data;
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['firm-price-book'] });
      qc.invalidateQueries({ queryKey: ['firm-material-names'] });
      toast.success('Removed from the price book');
    },
    onError: () => toast.error('Could not remove that item. Try again.'),
  });
}

export interface PriceBookImportRow {
  name: string;
  unit?: string;
  buy?: number | null;
  sell?: number | null;
  markup?: number | null;
  category?: string | null;
  supplier?: string | null;
}

export function useImportFirmPriceBook() {
  const qc = useQueryClient();
  const { data: firmId } = useActingFirmId();
  return useMutation({
    mutationFn: async (
      rows: PriceBookImportRow[]
    ): Promise<{ added: number; updated: number; skipped: number }> => {
      if (!firmId) throw new Error('No firm');
      const out = { added: 0, updated: 0, skipped: 0 };
      // The RPC takes up to 2,000 rows a call.
      for (let i = 0; i < rows.length; i += 2000) {
        const { data, error } = await supabase.rpc('import_firm_price_book' as never, {
          p_firm: firmId,
          p_rows: rows.slice(i, i + 2000),
        } as never);
        if (error) throw error;
        const r = data as unknown as { added: number; updated: number; skipped: number };
        out.added += r.added;
        out.updated += r.updated;
        out.skipped += r.skipped;
      }
      return out;
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['firm-price-book'] });
      qc.invalidateQueries({ queryKey: ['firm-material-names'] });
    },
    onError: (e) => toast.error(friendly(e, 'Import failed. Check the file and try again.')),
  });
}
