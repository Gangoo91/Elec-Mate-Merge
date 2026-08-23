import { Quote } from '@/types/quote';
import { computeQuoteTotals } from '@/utils/quote-calculations';
import { cn } from '@/lib/utils';
import { cardCn } from '@/components/forms/fieldStyles';

interface QuoteReviewStepProps {
  quote: Partial<Quote>;
}

const categoryDotColor: Record<string, string> = {
  labour: 'bg-blue-500',
  materials: 'bg-green-500',
  equipment: 'bg-purple-500',
  manual: 'bg-white',
};

const categoryLabels: Record<string, string> = {
  labour: 'Labour',
  materials: 'Materials',
  equipment: 'Equipment',
  manual: 'Additional Items',
};

export const QuoteReviewStep = ({ quote }: QuoteReviewStepProps) => {
  const categories = ['labour', 'materials', 'equipment', 'manual'];
  const totals = computeQuoteTotals(quote.items || [], quote.settings);

  return (
    <section className={cardCn}>
      {/* Client */}
      {quote.client?.name && (
        <div>
          <p className="text-[10px] font-medium text-white uppercase tracking-[0.18em] mb-1.5">Client</p>
          <p className="text-[14px] font-semibold text-white">{quote.client.name}</p>
          {quote.client.email && <p className="text-[12px] text-white">{quote.client.email}</p>}
          {quote.client.phone && <p className="text-[12px] text-white">{quote.client.phone}</p>}
        </div>
      )}

      {/* Job */}
      {quote.jobDetails?.title && (
        <div>
          <p className="text-[10px] font-medium text-white uppercase tracking-[0.18em] mb-1.5">Job</p>
          <p className="text-[14px] font-semibold text-white">{quote.jobDetails.title}</p>
          {quote.jobDetails.description && (
            <p className="text-[12px] text-white line-clamp-2 mt-0.5">{quote.jobDetails.description}</p>
          )}
          {quote.jobDetails.estimatedDuration && (
            <p className="text-[12px] text-white mt-0.5">Duration: {quote.jobDetails.estimatedDuration}</p>
          )}
        </div>
      )}

      {/* Items by category */}
      {categories.map((category) => {
        const categoryItems = quote.items?.filter((i) => i.category === category) || [];
        if (categoryItems.length === 0) return null;
        const categoryTotal = categoryItems.reduce((sum, i) => sum + i.totalPrice, 0);

        return (
          <div key={category}>
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <div className={cn('w-1.5 h-1.5 rounded-full', categoryDotColor[category] || 'bg-white')} />
                <p className="text-[10px] font-medium text-white uppercase tracking-[0.18em]">{categoryLabels[category]}</p>
              </div>
              <p className="text-[13px] font-bold text-elec-yellow tabular-nums">£{categoryTotal.toFixed(2)}</p>
            </div>
            <div className="space-y-1.5">
              {categoryItems.map((item) => (
                <div key={item.id} className="flex justify-between text-[12px]">
                  <span className="text-white truncate flex-1 mr-3">{item.description}</span>
                  <span className="text-white flex-shrink-0 tabular-nums">
                    {item.quantity} × £{(item.unitPrice ?? 0).toFixed(2)} = £{(item.totalPrice ?? 0).toFixed(2)}
                  </span>
                </div>
              ))}
            </div>
          </div>
        );
      })}

      {/* Notes */}
      {quote.notes && (
        <div>
          <p className="text-[10px] font-medium text-white uppercase tracking-[0.18em] mb-1.5">Notes</p>
          <p className="text-[12px] text-white whitespace-pre-line">{quote.notes}</p>
        </div>
      )}

      {/* Linked certificate — mirrors InvoiceReviewStep so the electrician can
          see (and verify) the attachment before sending */}
      {quote.linked_certificate_id && (
        <div className="border-t border-white/[0.12] pt-4">
          <p className="text-[10px] font-medium text-white uppercase tracking-[0.18em] mb-2">
            Linked Document
          </p>
          <div className="flex items-center gap-3 p-3 rounded-xl bg-blue-500/[0.08] border border-blue-500/20">
            <div className="flex-1 min-w-0">
              <p className="text-[14px] font-medium text-white">{quote.linked_certificate_type}</p>
              <p className="text-[12px] text-white">{quote.linked_certificate_reference}</p>
            </div>
            {quote.linked_certificate_pdf_url && (
              <a
                href={quote.linked_certificate_pdf_url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[12px] font-medium text-blue-400 touch-manipulation flex-shrink-0"
              >
                View PDF
              </a>
            )}
          </div>
        </div>
      )}
      {/* Totals last — the figure is the conclusion of the summary, not
          its opening line. */}
      {/* Pricing */}
      <div className="space-y-2">
        <div className="flex justify-between text-[13px]">
          <span className="text-white">Subtotal</span>
          <span className="text-white tabular-nums">£{(quote.subtotal || 0).toFixed(2)}</span>
        </div>
        {quote.settings?.discountEnabled && (quote.discountAmount || 0) > 0 && (
          <div className="flex justify-between text-[13px]">
            <span className="text-red-400">{quote.settings.discountLabel || 'Discount'}</span>
            <span className="text-red-400 tabular-nums">-£{(quote.discountAmount || 0).toFixed(2)}</span>
          </div>
        )}
        {quote.settings?.vatRegistered && !totals.reverseCharge && (
          <div className="flex justify-between text-[13px]">
            <span className="text-white">VAT ({quote.settings.vatRate}%)</span>
            <span className="text-white tabular-nums">£{(quote.vatAmount || 0).toFixed(2)}</span>
          </div>
        )}
        {totals.reverseCharge && (
          <div className="flex justify-between text-[13px]">
            <span className="text-white">VAT — reverse charge</span>
            <span className="text-white tabular-nums">£0.00</span>
          </div>
        )}
        <div className="flex justify-between items-baseline pt-3 border-t border-white/[0.10]">
          <span className="text-[15px] font-bold text-white">Total</span>
          <span className="text-[22px] font-bold text-elec-yellow tabular-nums">£{(quote.total || 0).toFixed(2)}</span>
        </div>
        {/* ELE-1571 — this block was gated on `cisAmount > 0` alone, so a quote
            with a grant and no CIS showed the full total and nothing else. The
            grant was calculated correctly and then never displayed, which reads
            as "the grant isn't deducted" (Sean, 21 Aug). */}
        {(totals.cisAmount > 0 || totals.grantAmount > 0) && (
          <>
            {totals.cisAmount > 0 && (
              <div className="flex justify-between text-[13px] pt-1">
                <span className="text-white">CIS deduction ({totals.cisRate}% of labour)</span>
                <span className="text-red-400 tabular-nums">−£{totals.cisAmount.toFixed(2)}</span>
              </div>
            )}
            {totals.grantAmount > 0 && (
              <div className="flex justify-between text-[13px] pt-1">
                <span className="text-white">Less: {totals.grantLabel}</span>
                <span className="text-red-400 tabular-nums">−£{totals.grantAmount.toFixed(2)}</span>
              </div>
            )}
            <div className="flex justify-between text-[13px]">
              <span className="text-white font-semibold">
                {totals.grantAmount > 0 ? 'Amount to pay' : 'Net payable after CIS'}
              </span>
              <span className="text-white font-semibold tabular-nums">£{totals.netPayable.toFixed(2)}</span>
            </div>
          </>
        )}
        {totals.reverseCharge && (
          <p className="text-[11px] text-white pt-1 leading-relaxed">
            Reverse charge: customer to account to HMRC for the VAT — £{totals.notionalVat.toFixed(2)} @ {quote.settings?.vatRate ?? 20}%.
          </p>
        )}
      </div>

    </section>
  );
};
