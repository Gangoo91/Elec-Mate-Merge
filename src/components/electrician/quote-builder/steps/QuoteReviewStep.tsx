import { Quote } from '@/types/quote';

interface QuoteReviewStepProps {
  quote: Partial<Quote>;
}

export const QuoteReviewStep = ({ quote }: QuoteReviewStepProps) => {
  const categories = ['labour', 'materials', 'equipment', 'manual'];
  const categoryLabels: Record<string, string> = {
    labour: 'Labour',
    materials: 'Materials',
    equipment: 'Equipment',
    manual: 'Additional Items',
  };

  return (
    <div className="space-y-5">
      {/* Pricing */}
      <div className="space-y-2">
        <div className="flex justify-between text-[13px]">
          <span className="text-white">Subtotal</span>
          <span className="text-white">£{(quote.subtotal || 0).toFixed(2)}</span>
        </div>
        {quote.settings?.discountEnabled && (quote.discountAmount || 0) > 0 && (
          <div className="flex justify-between text-[13px]">
            <span className="text-red-400">{quote.settings.discountLabel || 'Discount'}</span>
            <span className="text-red-400">-£{(quote.discountAmount || 0).toFixed(2)}</span>
          </div>
        )}
        {quote.settings?.vatRegistered && (
          <div className="flex justify-between text-[13px]">
            <span className="text-white">VAT ({quote.settings.vatRate}%)</span>
            <span className="text-white">£{(quote.vatAmount || 0).toFixed(2)}</span>
          </div>
        )}
        <div className="flex justify-between pt-2 border-t border-white/[0.06]">
          <span className="text-[15px] font-semibold text-white">Total</span>
          <span className="text-[22px] font-bold text-elec-yellow">£{(quote.total || 0).toFixed(2)}</span>
        </div>
      </div>

      {/* Client */}
      {quote.client?.name && (
        <div>
          <p className="text-xs font-medium text-white mb-1">Client</p>
          <p className="text-[14px] font-semibold text-white">{quote.client.name}</p>
          {quote.client.email && <p className="text-[12px] text-white">{quote.client.email}</p>}
          {quote.client.phone && <p className="text-[12px] text-white">{quote.client.phone}</p>}
        </div>
      )}

      {/* Job */}
      {quote.jobDetails?.title && (
        <div>
          <p className="text-xs font-medium text-white mb-1">Job</p>
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
              <p className="text-xs font-medium text-white">{categoryLabels[category]}</p>
              <p className="text-[13px] font-bold text-elec-yellow">£{categoryTotal.toFixed(2)}</p>
            </div>
            <div className="space-y-1">
              {categoryItems.map((item) => (
                <div key={item.id} className="flex justify-between text-[12px]">
                  <span className="text-white truncate flex-1 mr-3">{item.description}</span>
                  <span className="text-white flex-shrink-0">
                    {item.quantity} × £{item.unitPrice.toFixed(2)} = £{item.totalPrice.toFixed(2)}
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
          <p className="text-xs font-medium text-white mb-1">Notes</p>
          <p className="text-[12px] text-white whitespace-pre-line">{quote.notes}</p>
        </div>
      )}
    </div>
  );
};
