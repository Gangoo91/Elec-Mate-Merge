/**
 * The 8-week cash forecast (ELE-2074). Owner and admins only: get_cash_forecast
 * raises for anyone else and both tables are can_see_firm_money under RLS.
 * Every figure is worked out in the database; the screen only lays it out.
 */
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';

const rpc = supabase.rpc.bind(supabase) as unknown as (
  fn: string,
  args?: Record<string, unknown>
) => Promise<{ data: unknown; error: { message: string } | null }>;

export type CashKind =
  | 'invoice'
  | 'deposit'
  | 'booked'
  | 'retention'
  | 'stage'
  | 'other'
  | 'recurring'
  | 'labour'
  | 'cis'
  | 'vat'
  | 'supplier';

export interface CashItem {
  direction: 'in' | 'out';
  kind: CashKind;
  label: string;
  date: string;
  amount: number;
  note: string | null;
  week: number;
  late: boolean;
  ref: string | null;
}

export interface CashWeek {
  week: number;
  start: string;
  end: string;
  money_in: number;
  money_out: number;
  net: number;
  balance: number;
}

export interface CashForecast {
  today: string;
  end: string;
  opening_balance: number | null;
  balance_on: string | null;
  has_balance: boolean;
  weeks: CashWeek[];
  items: CashItem[];
  low: { week: number; start: string; end: string; balance: number; drivers: CashItem[] } | null;
  totals: { money_in: number; money_out: number };
  assumptions: {
    /** Net of the CIS withheld from subcontractors (that goes out as "CIS to HMRC"). */
    labour_weekly: number;
    cis_withheld_weekly?: number;
    pay_frequency: string;
    payment_terms_days: number;
    supplier_terms_days: number;
    vat_stagger: number | null;
  };
  settings: {
    opening_balance: number | null;
    balance_on: string | null;
    vat_stagger: number | null;
    supplier_terms_days: number;
  } | null;
}

export const CASH_KEY = 'cash-forecast';

export function useCashForecast(firm: string | null | undefined, enabled = true) {
  return useQuery({
    queryKey: [CASH_KEY, firm],
    enabled: !!firm && enabled,
    queryFn: async (): Promise<CashForecast> => {
      const { data, error } = await rpc('get_cash_forecast', { p_firm: firm });
      if (error) throw new Error(error.message);
      const f = data as CashForecast;
      return {
        ...f,
        items: (f.items ?? []).map((i) => ({ ...i, amount: Number(i.amount) || 0 })),
        weeks: (f.weeks ?? []).map((w) => ({
          ...w,
          money_in: Number(w.money_in) || 0,
          money_out: Number(w.money_out) || 0,
          net: Number(w.net) || 0,
          balance: Number(w.balance) || 0,
        })),
      };
    },
    staleTime: 30_000,
  });
}

export interface CashOwnerItem {
  id: string;
  direction: 'in' | 'out';
  kind: 'recurring' | 'retention' | 'stage' | 'other';
  label: string;
  amount: number;
  first_date: string;
  repeat: 'none' | 'weekly' | 'monthly' | 'quarterly';
  end_date: string | null;
}

export function useCashOwnerItems(firm: string | null | undefined, enabled = true) {
  return useQuery({
    queryKey: [CASH_KEY, 'items', firm],
    enabled: !!firm && enabled,
    queryFn: async (): Promise<CashOwnerItem[]> => {
      const { data, error } = await supabase
        .from('employer_cash_items' as never)
        .select('id, direction, kind, label, amount, first_date, repeat, end_date')
        .eq('employer_id' as never, firm as never)
        .order('first_date' as never, { ascending: true });
      if (error) throw new Error(error.message);
      return ((data as unknown as CashOwnerItem[]) ?? []).map((i) => ({
        ...i,
        amount: Number(i.amount),
      }));
    },
  });
}

function useInvalidate() {
  const qc = useQueryClient();
  return () => qc.invalidateQueries({ queryKey: [CASH_KEY] });
}

export function useSaveCashSettings() {
  const invalidate = useInvalidate();
  return useMutation({
    mutationFn: async (args: {
      firm: string;
      opening_balance: number | null;
      balance_on: string | null;
      vat_stagger: number | null;
      supplier_terms_days: number;
    }) => {
      const { firm, ...rest } = args;
      const { error } = await supabase
        .from('employer_cash_settings' as never)
        .upsert({ employer_id: firm, ...rest, updated_at: new Date().toISOString() } as never, {
          onConflict: 'employer_id',
        });
      if (error) throw new Error(error.message);
    },
    onSuccess: invalidate,
  });
}

export function useSaveCashItem() {
  const invalidate = useInvalidate();
  return useMutation({
    mutationFn: async (args: {
      firm: string;
      item: Omit<CashOwnerItem, 'id'> & { id?: string };
    }) => {
      const { id, ...fields } = args.item;
      const q = supabase.from('employer_cash_items' as never);
      const { error } = id
        ? await q.update(fields as never).eq('id' as never, id as never)
        : await q.insert({ ...fields, employer_id: args.firm } as never);
      if (error) throw new Error(error.message);
    },
    onSuccess: invalidate,
  });
}

export function useDeleteCashItem() {
  const invalidate = useInvalidate();
  return useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase
        .from('employer_cash_items' as never)
        .delete()
        .eq('id' as never, id as never);
      if (error) throw new Error(error.message);
    },
    onSuccess: invalidate,
  });
}

export const CASH_KIND_LABEL: Record<CashKind, string> = {
  invoice: 'Invoice',
  deposit: 'Deposit',
  booked: 'Booked work',
  retention: 'Retention',
  stage: 'Stage payment',
  other: 'Other',
  recurring: 'Regular cost',
  labour: 'Wages',
  cis: 'CIS',
  vat: 'VAT',
  supplier: 'Supplier',
};

export const gbp0 = (n: number | null | undefined) => {
  const v = Number(n ?? 0);
  const s = `£${Math.abs(v).toLocaleString('en-GB', { minimumFractionDigits: 0, maximumFractionDigits: 0 })}`;
  return v < 0 ? `−${s}` : s;
};

const shortDay = (d: string) =>
  new Date(`${d.slice(0, 10)}T12:00:00`).toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'short',
  });

/** "Lowest point £2,481 in week 3", for the Finance row and the sheet. */
export function lowPointLine(f: CashForecast | undefined): string | null {
  if (!f?.low) return null;
  const where = `week ${f.low.week} (${shortDay(f.low.start)} to ${shortDay(f.low.end)})`;
  if (!f.has_balance) {
    const net = f.weeks.reduce((s, w) => s + w.net, 0);
    return `${net >= 0 ? `${gbp0(net)} more in than out` : `${gbp0(-net)} more out than in`} over 8 weeks`;
  }
  return f.low.balance < 0
    ? `Overdrawn by ${gbp0(-f.low.balance)} in ${where}`
    : `Lowest point ${gbp0(f.low.balance)} in ${where}`;
}
