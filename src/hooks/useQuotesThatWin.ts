import { winRate } from '@/utils/winRate';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

/* ELE-2073 Quotes that win: job templates and win rate. RPCs postdate the
   generated types, so they go through an untyped caller. */

const rpc = supabase.rpc.bind(supabase) as unknown as (
  fn: string,
  args?: Record<string, unknown>
) => Promise<{ data: unknown; error: { message: string } | null }>;

export interface TemplateLabour {
  description: string;
  hours: number;
  hourlyRate: number;
  basis?: string;
}

export interface TemplateLine {
  description: string;
  quantity: number;
  unit: string;
  unitPrice: number;
  priceBookItemId?: string | null;
  /** Starter lines with no price-book match are flagged for checking. */
  unpriced?: boolean;
}

export interface QuoteTemplate {
  id: string;
  name: string;
  job_type: string | null;
  description: string | null;
  labour: TemplateLabour[];
  lines: TemplateLine[];
  created_by_name?: string | null;
  updated_at?: string;
  /** Starters are built on the fly; they have no row. */
  starter?: boolean;
  /** Where the labour hours came from, in words. */
  labourSource?: string;
}

export interface TemplateSources {
  firm_id: string;
  own: QuoteTemplate[];
  task_minutes: Record<string, { label: string; minutes: number; sample: number }>;
  history: Record<string, { avg_hours: number; jobs: number }>;
  hourly_rate: number | null;
}

export function useQuoteTemplateSources(enabled = true) {
  return useQuery({
    queryKey: ['firm-quote-templates'],
    enabled,
    staleTime: 60_000,
    queryFn: async (): Promise<TemplateSources> => {
      const { data, error } = await rpc('get_firm_quote_templates');
      if (error) throw new Error(error.message);
      const d = data as TemplateSources;
      return {
        ...d,
        own: (d.own ?? []).map((t) => ({
          ...t,
          labour: Array.isArray(t.labour) ? t.labour : [],
          lines: Array.isArray(t.lines) ? t.lines : [],
        })),
      };
    },
  });
}

export function useSaveQuoteTemplate() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (t: {
      id?: string | null;
      name: string;
      job_type?: string | null;
      description?: string | null;
      labour: TemplateLabour[];
      lines: TemplateLine[];
    }) => {
      const { data, error } = await rpc('save_firm_quote_template', { p: t });
      if (error) throw new Error(error.message);
      return data as QuoteTemplate;
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ['firm-quote-templates'] }),
    onError: (e: Error) => toast.error(e.message || 'Could not save the template'),
  });
}

export function useDeleteQuoteTemplate() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (id: string) => {
      const { error } = await rpc('delete_firm_quote_template', { p_id: id });
      if (error) throw new Error(error.message);
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ['firm-quote-templates'] }),
    onError: (e: Error) => toast.error(e.message || 'Could not delete the template'),
  });
}

export interface WinRateGroup {
  key: string;
  sent: number;
  won: number;
  lost: number;
  expired: number;
  open: number;
  sent_value: number;
  won_value: number;
  avg_value: number;
  avg_won_value: number;
}

export interface WinRate {
  firm_id: string;
  from: string;
  months: number;
  all: WinRateGroup | null;
  by_month: WinRateGroup[];
  by_type: WinRateGroup[];
  by_person: WinRateGroup[];
}

const n = (v: unknown) => (Number.isFinite(Number(v)) ? Number(v) : 0);
const norm = (g: WinRateGroup): WinRateGroup => ({
  key: g.key,
  sent: n(g.sent),
  won: n(g.won),
  lost: n(g.lost),
  expired: n(g.expired),
  open: n(g.open),
  sent_value: n(g.sent_value),
  won_value: n(g.won_value),
  avg_value: n(g.avg_value),
  avg_won_value: n(g.avg_won_value),
});

export function useQuoteWinRate(months = 12, enabled = true) {
  return useQuery({
    queryKey: ['firm-quote-win-rate', months],
    enabled,
    staleTime: 5 * 60_000,
    retry: false,
    queryFn: async (): Promise<WinRate> => {
      const { data, error } = await rpc('get_firm_quote_win_rate', { p_months: months });
      if (error) throw new Error(error.message);
      const d = data as WinRate;
      return {
        ...d,
        all: d.all ? norm(d.all) : null,
        by_month: (d.by_month ?? []).map(norm),
        by_type: (d.by_type ?? []).map(norm),
        by_person: (d.by_person ?? []).map(norm),
      };
    },
  });
}

/** The one win rate (src/utils/winRate.ts): won of decided, as a whole percentage. */
export const winPct = (g: Pick<WinRateGroup, 'won' | 'lost' | 'expired'> | null | undefined) =>
  winRate(g) ?? 0;
