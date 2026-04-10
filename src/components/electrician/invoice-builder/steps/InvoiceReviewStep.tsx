import { Invoice } from '@/types/invoice';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { useState } from 'react';
import { cn } from '@/lib/utils';

interface InvoiceReviewStepProps {
  invoice: Partial<Invoice>;
  showSummaryOnly?: boolean;
}

export const InvoiceReviewStep = ({ invoice, showSummaryOnly = false }: InvoiceReviewStepProps) => {
  const [showItems, setShowItems] = useState(true);

  const formatCurrency = (amount: number) =>
    new Intl.NumberFormat('en-GB', { style: 'currency', currency: 'GBP' }).format(amount);

  const formatDate = (date: Date | string | undefined) => {
    if (!date) return '—';
    return new Date(date).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' });
  };

  const totalAmount = invoice.total || 0;
  const allItems = [...(invoice.items || []), ...(invoice.additional_invoice_items || [])];

  // Summary only mode
  if (showSummaryOnly) {
    return (
      <div className="space-y-5 text-left">
        <div className="grid grid-cols-2 gap-x-6 gap-y-3">
          <div>
            <p className="text-[11px] text-white uppercase tracking-wider">Quote</p>
            <p className="text-[15px] font-medium text-white">{invoice.quoteNumber || '—'}</p>
          </div>
          <div>
            <p className="text-[11px] text-white uppercase tracking-wider">Client</p>
            <p className="text-[15px] font-medium text-white truncate">{invoice.client?.name || '—'}</p>
          </div>
          <div>
            <p className="text-[11px] text-white uppercase tracking-wider">Date</p>
            <p className="text-[15px] font-medium text-white">{formatDate(invoice.createdAt)}</p>
          </div>
          <div>
            <p className="text-[11px] text-white uppercase tracking-wider">Total</p>
            <p className="text-[18px] font-bold text-white">{formatCurrency(totalAmount)}</p>
          </div>
        </div>

        <div className="divide-y divide-white/[0.06]">
          {allItems.slice(0, 5).map((item, index) => (
            <div key={item.id || index} className="flex justify-between items-center py-3">
              <div className="flex-1 min-w-0">
                <p className="text-[14px] text-white truncate">{item.description}</p>
                <p className="text-[12px] text-white">{item.quantity} × {formatCurrency(item.unitPrice)}</p>
              </div>
              <p className="text-[14px] font-medium text-white ml-4 tabular-nums">
                {formatCurrency((item.quantity || 0) * (item.unitPrice || 0))}
              </p>
            </div>
          ))}
          {allItems.length > 5 && (
            <p className="text-[12px] text-white py-3">+{allItems.length - 5} more items</p>
          )}
        </div>

        <div className="pt-3 border-t border-white/[0.12] space-y-2">
          <div className="flex justify-between text-[13px]">
            <span className="text-white">Subtotal</span>
            <span className="text-white tabular-nums">{formatCurrency(invoice.subtotal || 0)}</span>
          </div>
          {invoice.settings?.discountEnabled && (invoice.discountAmount || 0) > 0 && (
            <div className="flex justify-between text-[13px]">
              <span className="text-red-400">{invoice.settings.discountLabel || 'Discount'}</span>
              <span className="text-red-400 tabular-nums">-{formatCurrency(invoice.discountAmount || 0)}</span>
            </div>
          )}
          {invoice.settings?.vatRegistered && (
            <div className="flex justify-between text-[13px]">
              <span className="text-white">VAT ({invoice.settings?.vatRate || 20}%)</span>
              <span className="text-white tabular-nums">{formatCurrency(invoice.vatAmount || 0)}</span>
            </div>
          )}
          <div className="mt-3 p-4 rounded-xl bg-elec-yellow/[0.06] border border-elec-yellow/20 flex justify-between items-baseline">
            <span className="text-[15px] font-bold text-white">Total Due</span>
            <span className="text-[26px] font-bold text-elec-yellow tabular-nums">{formatCurrency(totalAmount)}</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-5 text-left">
      {/* Key info — flat grid, no container */}
      <div className="grid grid-cols-2 gap-x-6 gap-y-3">
        <div>
          <p className="text-[11px] text-white uppercase tracking-wider">Invoice No.</p>
          <p className="text-[15px] font-medium text-white">
            {invoice.invoice_number || invoice.quoteNumber || 'Draft'}
          </p>
        </div>
        <div>
          <p className="text-[11px] text-white uppercase tracking-wider">Client</p>
          <p className="text-[15px] font-medium text-white truncate">{invoice.client?.name || '—'}</p>
        </div>
        <div>
          <p className="text-[11px] text-white uppercase tracking-wider">Due Date</p>
          <p className="text-[15px] font-medium text-white">
            {formatDate(invoice.invoice_due_date || invoice.createdAt)}
          </p>
        </div>
        <div>
          <p className="text-[11px] text-white uppercase tracking-wider">Total</p>
          <p className="text-[18px] font-bold text-white">{formatCurrency(totalAmount)}</p>
        </div>
      </div>

      {/* Client */}
      <div className="py-3 border-t border-white/[0.12]">
        <div className="grid grid-cols-2 gap-x-6 gap-y-2">
          <div>
            <p className="text-[11px] text-white uppercase tracking-wider">Name</p>
            <p className="text-[14px] text-white">{invoice.client?.name || '—'}</p>
          </div>
          <div>
            <p className="text-[11px] text-white uppercase tracking-wider">Phone</p>
            <p className="text-[14px] text-white">{invoice.client?.phone || '—'}</p>
          </div>
          <div>
            <p className="text-[11px] text-white uppercase tracking-wider">Email</p>
            <p className="text-[14px] text-white break-all">{invoice.client?.email || '—'}</p>
          </div>
          <div>
            <p className="text-[11px] text-white uppercase tracking-wider">Address</p>
            <p className="text-[14px] text-white">{invoice.client?.address || '—'}</p>
          </div>
        </div>
      </div>

      {/* Items — collapsible */}
      <div className="border-t border-white/[0.12]">
        <button
          onClick={() => setShowItems(!showItems)}
          className="w-full flex items-center justify-between py-3 touch-manipulation"
        >
          <span className="text-[14px] font-medium text-white">
            {invoice.settings?.showSummaryView ? 'Items (Summary)' : `Items (${allItems.length})`}
          </span>
          {showItems
            ? <ChevronUp className="h-4 w-4 text-white" />
            : <ChevronDown className="h-4 w-4 text-white" />
          }
        </button>

        {showItems && (
          <div>
            <div className="divide-y divide-white/[0.06]">
              {invoice.settings?.showSummaryView
                ? (() => {
                    const categoryTotals = allItems.reduce((acc, item) => {
                      const total = (item.quantity || 0) * (item.unitPrice || 0);
                      const category = item.category || 'manual';
                      if (!acc[category]) acc[category] = 0;
                      acc[category] += total;
                      return acc;
                    }, {} as Record<string, number>);

                    const labels: Record<string, string> = { labour: 'Labour', materials: 'Materials', equipment: 'Equipment Hire', manual: 'Other' };

                    return ['labour', 'materials', 'equipment', 'manual']
                      .filter((cat) => categoryTotals[cat] > 0)
                      .map((category) => (
                        <div key={category} className="flex justify-between items-center py-3">
                          <p className="text-[14px] text-white">{labels[category]}</p>
                          <p className="text-[14px] font-medium text-white tabular-nums">{formatCurrency(categoryTotals[category])}</p>
                        </div>
                      ));
                  })()
                : allItems.map((item, index) => (
                    <div key={item.id || index} className="py-3">
                      <div className="flex justify-between items-start gap-3">
                        <div className="flex-1 min-w-0">
                          <p className="text-[14px] text-white">{item.description}</p>
                          {item.notes && <p className="text-[12px] text-white mt-0.5">{item.notes}</p>}
                          <p className="text-[12px] text-white mt-0.5">
                            {item.quantity} {item.unit} × {formatCurrency(item.unitPrice)}
                          </p>
                        </div>
                        <p className="text-[14px] font-medium text-white shrink-0 tabular-nums">
                          {formatCurrency((item.quantity || 0) * (item.unitPrice || 0))}
                        </p>
                      </div>
                    </div>
                  ))
              }
            </div>

            {/* Totals */}
            <div className="pt-3 mt-1 border-t border-white/[0.12] space-y-2">
              <div className="flex justify-between text-[13px]">
                <span className="text-white">Subtotal</span>
                <span className="text-white tabular-nums">{formatCurrency(invoice.subtotal || 0)}</span>
              </div>
              {invoice.settings?.discountEnabled && (invoice.discountAmount || 0) > 0 && (
                <div className="flex justify-between text-[13px]">
                  <span className="text-red-400">{invoice.settings.discountLabel || 'Discount'}</span>
                  <span className="text-red-400 tabular-nums">-{formatCurrency(invoice.discountAmount || 0)}</span>
                </div>
              )}
              {invoice.settings?.vatRegistered && (
                <div className="flex justify-between text-[13px]">
                  <span className="text-white">VAT ({invoice.settings?.vatRate || 20}%)</span>
                  <span className="text-white tabular-nums">{formatCurrency(invoice.vatAmount || 0)}</span>
                </div>
              )}
              <div className="mt-3 p-4 rounded-xl bg-elec-yellow/[0.06] border border-elec-yellow/20 flex justify-between items-baseline">
                <span className="text-[15px] font-bold text-white">Total Due</span>
                <span className="text-[26px] font-bold text-elec-yellow tabular-nums">{formatCurrency(totalAmount)}</span>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Linked Certificate */}
      {(invoice as any).linked_certificate_id && (
        <div className="border-t border-white/[0.12] pt-4">
          <p className="text-[11px] text-white uppercase tracking-wider mb-2">Linked Document</p>
          <div className="flex items-center gap-3 p-3 rounded-xl bg-blue-500/[0.08] border border-blue-500/20">
            <div className="flex-1 min-w-0">
              <p className="text-[14px] font-medium text-white">{(invoice as any).linked_certificate_type}</p>
              <p className="text-[12px] text-white">{(invoice as any).linked_certificate_reference}</p>
            </div>
            {(invoice as any).linked_certificate_pdf_url && (
              <a
                href={(invoice as any).linked_certificate_pdf_url}
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
    </div>
  );
};
