import { format } from 'date-fns';
import { FormCard } from '@/components/employer/editorial';
import { StatusPill } from '@/components/employer/pageParts/PageParts';
import { gbp } from '@/hooks/useFirmPriceBook';
import { useQuotePriceMoves } from '@/hooks/useWholesalers';

/* ==========================================================================
   Read-only note on an open quote (ELE-2066): materials whose wholesaler
   price has moved since the quote was sent (or written, if not sent yet).
   It NEVER changes the quote. Office managers see the percentage only; the
   buy prices are owner/admin (can_see_firm_money, enforced in the RPC).
   ========================================================================== */

export function QuotePriceMoves({ quoteId }: { quoteId: string | null | undefined }) {
  const { data } = useQuotePriceMoves(quoteId);
  if (!data?.open || !data.lines?.length) return null;
  const since = data.sent ? 'since this quote was sent' : 'since this quote was written';
  const on = data.since ? ` on ${format(new Date(data.since), 'd MMM')}` : '';
  const first = data.lines[0];
  const dir = (v: number) => (v > 0 ? 'up' : 'down');
  return (
    <FormCard bleed eyebrow="Price moves">
      <p className="text-[13.5px] leading-snug text-white">
        {data.lines.length === 1
          ? `${first.description} is ${dir(first.change_pct)} ${Math.abs(first.change_pct)}% ${since}${on}.`
          : `${data.lines.length} materials have moved ${since}${on}.`}
      </p>
      <ul className="-mx-1 divide-y divide-white/[0.06]">
        {data.lines.map((l, i) => {
          const rise = l.change_pct > 0;
          return (
            <li
              key={`${l.description}-${i}`}
              className="flex items-center justify-between gap-3 px-1 py-3"
            >
              <div className="min-w-0 flex-1">
                <p className="text-sm font-medium text-white">{l.description}</p>
                <p className="mt-0.5 text-xs text-white">
                  {l.old_price != null && l.new_price != null
                    ? `Buy price ${gbp(l.old_price)} to ${gbp(l.new_price)}`
                    : `${rise ? 'Up' : 'Down'} ${Math.abs(l.change_pct)}% at the wholesaler`}
                </p>
              </div>
              <StatusPill tone={rise ? 'red' : 'green'}>
                {rise ? '+' : '−'}
                {Math.abs(l.change_pct)}%
              </StatusPill>
            </li>
          );
        })}
      </ul>
      <p className="text-xs text-white">
        This quote has not been changed. If the price matters, send a revised quote or agree a
        variation.
      </p>
    </FormCard>
  );
}

export default QuotePriceMoves;
