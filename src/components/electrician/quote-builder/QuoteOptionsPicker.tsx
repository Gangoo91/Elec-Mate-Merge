import { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { cn } from '@/lib/utils';

/* ELE-2073: on the public quote page, the customer picks one of up to three
   options. Picking copies that option onto the quote (choose_quote_option_by_token),
   so the breakdown, the total and the deposit on Accept are all for that one.
   A quote without settings.options never renders this. */

export interface PublicQuoteOption {
  id: string;
  label: string;
  description?: string | null;
  total: number;
}

export function readQuoteOptions(settings: unknown): PublicQuoteOption[] {
  const raw = (settings as { options?: unknown } | null | undefined)?.options;
  if (!Array.isArray(raw) || raw.length < 2) return [];
  return raw
    .filter((o) => o && typeof o === 'object' && typeof (o as { id?: unknown }).id === 'string')
    .map((o) => {
      const r = o as Record<string, unknown>;
      return {
        id: String(r.id),
        label: String(r.label ?? 'Option'),
        description: typeof r.description === 'string' ? r.description : null,
        total: Number.isFinite(Number(r.total)) ? Number(r.total) : 0,
      };
    });
}

export function QuoteOptionsPicker({
  token,
  options,
  chosenId,
  locked,
  brandHex,
  depositPercent,
  depositAmount,
  formatCurrency,
  onChosen,
}: {
  token: string;
  options: PublicQuoteOption[];
  chosenId: string | null;
  /** Accepted or declined: show the choice, no picking. */
  locked: boolean;
  brandHex: string;
  depositPercent: number | null;
  depositAmount: number | null;
  formatCurrency: (n: number) => string;
  onChosen: () => void;
}) {
  const [busy, setBusy] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const current = chosenId ?? options[0]?.id ?? null;

  const depositFor = (total: number) =>
    depositAmount && depositAmount > 0
      ? Math.min(depositAmount, total)
      : depositPercent && depositPercent > 0
        ? Math.round(total * depositPercent) / 100
        : 0;

  const choose = async (id: string) => {
    if (locked || id === current || busy) return;
    setBusy(id);
    setError(null);
    try {
      const { error: err } = await (
        supabase.rpc.bind(supabase) as unknown as (
          fn: string,
          args: Record<string, unknown>
        ) => PromiseLike<{ error: { message: string } | null }>
      )('choose_quote_option_by_token', { token_param: token, option_id: id });
      if (err) throw new Error(err.message);
      onChosen();
    } catch (e) {
      setError(e instanceof Error ? e.message : 'That did not work. Please try again.');
    } finally {
      setBusy(null);
    }
  };

  if (locked) {
    const picked = options.find((o) => o.id === current);
    return picked ? (
      <section className="px-6 sm:px-9 pt-8">
        <div className="border-t border-slate-200 pt-6">
          <p className="text-[14px] text-slate-700">
            You chose <span className="font-semibold text-slate-900">{picked.label}</span>,{' '}
            {formatCurrency(picked.total)}.
          </p>
        </div>
      </section>
    ) : null;
  }

  return (
    <section className="px-6 sm:px-9 pt-8" data-testid="quote-options">
      <div className="border-t border-slate-200 pt-6">
        <h2 className="text-[15px] font-semibold text-slate-900">Choose an option</h2>
        <p className="mt-1 text-[13.5px] text-slate-600">
          Pick the one you want. The breakdown and total below update to match.
        </p>
        <div
          className={cn(
            'mt-4 grid gap-3',
            options.length === 3 ? 'sm:grid-cols-3' : 'sm:grid-cols-2'
          )}
        >
          {options.map((o) => {
            const on = o.id === current;
            const dep = depositFor(o.total);
            return (
              <button
                key={o.id}
                type="button"
                onClick={() => choose(o.id)}
                disabled={!!busy}
                aria-pressed={on}
                className={cn(
                  'flex min-h-[44px] flex-col rounded-xl border bg-white p-4 text-left transition-colors touch-manipulation',
                  on ? 'border-2' : 'border-slate-200 hover:border-slate-300'
                )}
                style={on ? { borderColor: brandHex } : undefined}
              >
                <span className="text-[14px] font-semibold text-slate-900">{o.label}</span>
                {o.description && (
                  <span className="mt-1 text-[13px] leading-snug text-slate-600">
                    {o.description}
                  </span>
                )}
                <span className="mt-3 text-[20px] font-semibold tabular-nums text-slate-900">
                  {formatCurrency(o.total)}
                </span>
                {dep > 0 && (
                  <span className="text-[12.5px] text-slate-500">
                    {formatCurrency(dep)} deposit to book
                  </span>
                )}
                {/* Explicit colours: the page's brand colour can be pale (a
                    yellow brand on white is unreadable), so text stays slate. */}
                <span
                  className={cn(
                    'mt-3 inline-flex h-8 items-center self-start rounded-full px-3 text-[12.5px] font-semibold',
                    on ? 'bg-slate-900 text-white' : 'border border-slate-300 text-slate-800'
                  )}
                >
                  {busy === o.id ? 'Updating' : on ? 'Selected' : 'Choose this'}
                </span>
              </button>
            );
          })}
        </div>
        {error && <p className="mt-3 text-[13px] text-red-600">{error}</p>}
      </div>
    </section>
  );
}
