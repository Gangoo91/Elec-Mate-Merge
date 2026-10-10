import { StatusPill } from '@/components/employer/pageParts/PageParts';
import { gbp } from '@/hooks/useFirmPriceBook';
import { useCompareBillToOrder, type BillLineStatus } from '@/hooks/useWholesalers';

/* ==========================================================================
   A supplier bill against its purchase order, line by line (ELE-2066).

   Shown while posting a bill to a PO (receipts, ELE-2071). Lines are matched
   by product code, then name, then a similar name. Dearer lines and lines
   that were never ordered are written onto the bill as variances when it is
   posted (record_bill_line_variances). Owner/admin only: the RPC refuses
   anyone else, and then this shows nothing.
   ========================================================================== */

const LABEL: Record<BillLineStatus, string> = {
  same: 'As ordered',
  dearer: 'Dearer',
  cheaper: 'Cheaper',
  not_ordered: 'Not ordered',
  no_price: 'No price',
};

export function BillVsOrder({ captureId, orderId }: { captureId: string; orderId: string }) {
  const { data, isLoading, isError } = useCompareBillToOrder(captureId, orderId);
  if (isError) return null;
  if (isLoading || !data) {
    return <div className="h-24 animate-pulse rounded-xl bg-white/[0.05]" aria-hidden />;
  }
  const flagged = data.lines.filter(
    (l) => l.status === 'dearer' || l.status === 'not_ordered'
  ).length;
  if (data.lines.length === 0) {
    return (
      <p className="text-[13px] text-white">
        The bill was read without its lines, so it can only be checked on the total.
      </p>
    );
  }
  return (
    <div className="space-y-2">
      <p className="text-[13px] font-semibold text-white">
        Against {data.order_number ?? 'the order'}
        {flagged > 0
          ? `: ${flagged} line${flagged === 1 ? '' : 's'} to look at${data.dearer_total > 0 ? `, ${gbp(data.dearer_total)} more than ordered` : ''}`
          : ': every line matches the order'}
      </p>
      <ul className="divide-y divide-white/[0.08] rounded-xl border border-white/[0.12]">
        {data.lines.map((l, i) => (
          <li key={i} className="flex min-h-[52px] items-center gap-3 px-3.5 py-2.5">
            <div className="min-w-0 flex-1">
              <p className="text-[14px] font-medium leading-snug text-white">{l.description}</p>
              <p className="mt-0.5 text-[12.5px] text-white">
                {l.unit_price != null ? `Billed ${gbp(l.unit_price)} each` : 'No unit price'}
                {l.po_unit_cost != null && l.status !== 'not_ordered'
                  ? ` · ordered at ${gbp(l.po_unit_cost)}`
                  : ''}
              </p>
            </div>
            <StatusPill
              tone={
                l.status === 'dearer' || l.status === 'not_ordered'
                  ? 'red'
                  : l.status === 'same' || l.status === 'cheaper'
                    ? 'green'
                    : 'neutral'
              }
            >
              {l.status === 'dearer' && l.diff_total != null
                ? `+${gbp(l.diff_total)}`
                : LABEL[l.status]}
            </StatusPill>
          </li>
        ))}
      </ul>
      {data.not_billed.length > 0 && (
        <p className="text-[12.5px] text-white">
          Ordered but not on this bill: {data.not_billed.map((n) => n.name).join(', ')}.
        </p>
      )}
      {flagged > 0 && (
        <p className="text-[12.5px] text-white">
          Posting still adds the bill. The differences are noted on it for you to take up with the
          wholesaler.
        </p>
      )}
    </div>
  );
}

export default BillVsOrder;
