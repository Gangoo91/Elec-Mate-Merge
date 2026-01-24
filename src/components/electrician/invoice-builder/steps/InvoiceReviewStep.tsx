import { Invoice } from '@/types/invoice';
import { Badge } from '@/components/ui/badge';
import { FileText, User, Banknote, Calendar, MapPin, ChevronDown, ChevronUp } from 'lucide-react';
import { useState } from 'react';
import { cn } from '@/lib/utils';

interface InvoiceReviewStepProps {
  invoice: Partial<Invoice>;
  showSummaryOnly?: boolean;
}

export const InvoiceReviewStep = ({ invoice, showSummaryOnly = false }: InvoiceReviewStepProps) => {
  const [expandedSections, setExpandedSections] = useState<string[]>(['items']);

  const formatCurrency = (amount: number) =>
    new Intl.NumberFormat('en-GB', { style: 'currency', currency: 'GBP' }).format(amount);

  const formatDate = (date: Date | string | undefined) => {
    if (!date) return 'N/A';
    return new Date(date).toLocaleDateString('en-GB');
  };

  const totalAmount = invoice.total || 0;

  // Combine all items for display
  const allItems = [
    ...(invoice.items || []),
    ...(invoice.additional_invoice_items || [])
  ];

  const toggleSection = (section: string) => {
    setExpandedSections(prev =>
      prev.includes(section)
        ? prev.filter(s => s !== section)
        : [...prev, section]
    );
  };

  // Summary only mode - used in step 0 when coming from a quote
  if (showSummaryOnly) {
    return (
      <div className="space-y-5 text-left">
        {/* Summary Banner */}
        <div className="rounded-2xl bg-gradient-to-r from-elec-yellow/20 to-amber-600/20 border border-elec-yellow/30 p-5">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-[12px] text-white">Quote Number</p>
              <p className="text-[15px] font-semibold text-white">{invoice.quoteNumber || 'N/A'}</p>
            </div>
            <div>
              <p className="text-[12px] text-white">Client</p>
              <p className="text-[15px] font-semibold text-white truncate">{invoice.client?.name || 'N/A'}</p>
            </div>
            <div>
              <p className="text-[12px] text-white">Date</p>
              <p className="text-[15px] font-semibold text-white">{formatDate(invoice.createdAt)}</p>
            </div>
            <div>
              <p className="text-[12px] text-white">Total</p>
              <p className="text-xl font-bold text-elec-yellow">{formatCurrency(totalAmount)}</p>
            </div>
          </div>
        </div>

        {/* Client Details */}
        <div>
          <p className="text-[13px] font-medium text-white/60 uppercase tracking-wider mb-3">
            Client Details
          </p>
          <div className="rounded-2xl bg-white/[0.03] border border-white/[0.06] overflow-hidden divide-y divide-white/[0.06]">
            <div className="flex items-center gap-3 p-4">
              <div className="w-9 h-9 rounded-lg bg-elec-yellow/20 flex items-center justify-center flex-shrink-0">
                <User className="h-4 w-4 text-elec-yellow" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-[12px] text-white">Name</p>
                <p className="text-[14px] font-medium text-white">{invoice.client?.name || 'N/A'}</p>
              </div>
            </div>
            <div className="grid grid-cols-2 divide-x divide-white/[0.06]">
              <div className="p-4">
                <p className="text-[12px] text-white">Email</p>
                <p className="text-[14px] font-medium text-white truncate">{invoice.client?.email || 'N/A'}</p>
              </div>
              <div className="p-4">
                <p className="text-[12px] text-white">Phone</p>
                <p className="text-[14px] font-medium text-white">{invoice.client?.phone || 'N/A'}</p>
              </div>
            </div>
            <div className="flex items-center gap-3 p-4">
              <div className="w-9 h-9 rounded-lg bg-white/[0.05] flex items-center justify-center flex-shrink-0">
                <MapPin className="h-4 w-4 text-white/70" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-[12px] text-white">Address</p>
                <p className="text-[14px] font-medium text-white">{invoice.client?.address || 'N/A'}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Items Summary */}
        <div>
          <p className="text-[13px] font-medium text-white/60 uppercase tracking-wider mb-3">
            Items ({allItems.length})
          </p>
          <div className="rounded-2xl bg-white/[0.03] border border-white/[0.06] overflow-hidden">
            <div className="divide-y divide-white/[0.06]">
              {allItems.slice(0, 5).map((item, index) => (
                <div key={item.id || index} className="flex justify-between items-center p-4">
                  <div className="flex-1 min-w-0">
                    <p className="text-[14px] font-medium text-white truncate">{item.description}</p>
                    <p className="text-[12px] text-white/50">{item.quantity} × {formatCurrency(item.unitPrice)}</p>
                  </div>
                  <p className="text-[14px] font-semibold text-elec-yellow ml-4">{formatCurrency((item.quantity || 0) * (item.unitPrice || 0))}</p>
                </div>
              ))}
              {allItems.length > 5 && (
                <div className="p-4 text-center">
                  <p className="text-[12px] text-white/50">+{allItems.length - 5} more items</p>
                </div>
              )}
            </div>
            <div className="p-4 bg-elec-yellow/10 border-t border-elec-yellow/20 space-y-2">
              {/* Subtotal */}
              <div className="flex items-center justify-between">
                <span className="text-[12px] text-white/70">Subtotal</span>
                <span className="text-[13px] font-medium text-white">{formatCurrency(invoice.subtotal || 0)}</span>
              </div>

              {/* VAT - only show if VAT registered */}
              {invoice.settings?.vatRegistered && (
                <div className="flex items-center justify-between">
                  <span className="text-[12px] text-white/70">VAT ({invoice.settings?.vatRate || 20}%)</span>
                  <span className="text-[13px] font-medium text-white">{formatCurrency(invoice.vatAmount || 0)}</span>
                </div>
              )}

              {/* Total */}
              <div className="flex items-center justify-between pt-1 border-t border-elec-yellow/30">
                <span className="text-[14px] font-medium text-white">Total</span>
                <span className="text-lg font-bold text-elec-yellow">{formatCurrency(totalAmount)}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-5 text-left">
      {/* Summary Banner */}
      <div className="rounded-2xl bg-gradient-to-r from-elec-yellow/20 to-amber-600/20 border border-elec-yellow/30 p-5">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="text-[12px] text-white">Invoice No.</p>
            <p className="text-[15px] font-semibold text-white">{invoice.invoice_number || invoice.quoteNumber || 'Draft'}</p>
          </div>
          <div>
            <p className="text-[12px] text-white">Client</p>
            <p className="text-[15px] font-semibold text-white truncate">{invoice.client?.name || 'N/A'}</p>
          </div>
          <div>
            <p className="text-[12px] text-white">Due Date</p>
            <p className="text-[15px] font-semibold text-white">{formatDate(invoice.invoice_due_date || invoice.createdAt)}</p>
          </div>
          <div>
            <p className="text-[12px] text-white">Total</p>
            <p className="text-xl font-bold text-elec-yellow">{formatCurrency(totalAmount)}</p>
          </div>
        </div>
      </div>

      {/* Collapsible Sections */}
      <div className="space-y-3">
        {/* Client Section */}
        <div className="rounded-2xl bg-white/[0.03] border border-white/[0.06] overflow-hidden">
          <button
            onClick={() => toggleSection('client')}
            className="w-full flex items-center justify-between p-4 touch-manipulation"
          >
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-lg bg-elec-yellow/20 flex items-center justify-center">
                <User className="h-4 w-4 text-elec-yellow" />
              </div>
              <span className="text-[14px] font-medium text-white">Client Information</span>
            </div>
            {expandedSections.includes('client') ? (
              <ChevronUp className="h-5 w-5 text-white/50" />
            ) : (
              <ChevronDown className="h-5 w-5 text-white/50" />
            )}
          </button>

          {expandedSections.includes('client') && (
            <div className="border-t border-white/[0.06] divide-y divide-white/[0.06]">
              <div className="grid grid-cols-2 divide-x divide-white/[0.06]">
                <div className="p-4">
                  <p className="text-[12px] text-white">Name</p>
                  <p className="text-[14px] font-medium text-white">{invoice.client?.name || 'N/A'}</p>
                </div>
                <div className="p-4">
                  <p className="text-[12px] text-white">Phone</p>
                  <p className="text-[14px] font-medium text-white">{invoice.client?.phone || 'N/A'}</p>
                </div>
              </div>
              <div className="p-4">
                <p className="text-[12px] text-white">Email</p>
                <p className="text-[14px] font-medium text-white break-all">{invoice.client?.email || 'N/A'}</p>
              </div>
              <div className="p-4">
                <p className="text-[12px] text-white">Address</p>
                <p className="text-[14px] font-medium text-white">{invoice.client?.address || 'N/A'}</p>
              </div>
            </div>
          )}
        </div>

        {/* Invoice Details Section */}
        <div className="rounded-2xl bg-white/[0.03] border border-white/[0.06] overflow-hidden">
          <button
            onClick={() => toggleSection('details')}
            className="w-full flex items-center justify-between p-4 touch-manipulation"
          >
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-lg bg-elec-yellow/20 flex items-center justify-center">
                <FileText className="h-4 w-4 text-elec-yellow" />
              </div>
              <span className="text-[14px] font-medium text-white">Invoice Details</span>
            </div>
            {expandedSections.includes('details') ? (
              <ChevronUp className="h-5 w-5 text-white/50" />
            ) : (
              <ChevronDown className="h-5 w-5 text-white/50" />
            )}
          </button>

          {expandedSections.includes('details') && (
            <div className="border-t border-white/[0.06] divide-y divide-white/[0.06]">
              <div className="grid grid-cols-2 divide-x divide-white/[0.06]">
                <div className="p-4">
                  <p className="text-[12px] text-white">Reference</p>
                  <p className="text-[14px] font-medium text-white">{invoice.quoteNumber || 'N/A'}</p>
                </div>
                <div className="p-4">
                  <p className="text-[12px] text-white">Status</p>
                  <Badge
                    variant="secondary"
                    className={cn(
                      'mt-1',
                      invoice.invoice_status === 'paid' && 'bg-emerald-500/20 text-emerald-400',
                      invoice.invoice_status === 'pending' && 'bg-amber-500/20 text-amber-400',
                      invoice.invoice_status === 'overdue' && 'bg-red-500/20 text-red-400'
                    )}
                  >
                    {invoice.invoice_status || invoice.status || 'Draft'}
                  </Badge>
                </div>
              </div>
              <div className="grid grid-cols-2 divide-x divide-white/[0.06]">
                <div className="p-4">
                  <p className="text-[12px] text-white">Invoice Date</p>
                  <p className="text-[14px] font-medium text-white">{formatDate(invoice.invoice_date || invoice.createdAt)}</p>
                </div>
                <div className="p-4">
                  <p className="text-[12px] text-white">Due Date</p>
                  <p className="text-[14px] font-medium text-white">{formatDate(invoice.invoice_due_date || invoice.expiryDate)}</p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Items Section */}
        <div className="rounded-2xl bg-white/[0.03] border border-white/[0.06] overflow-hidden">
          <button
            onClick={() => toggleSection('items')}
            className="w-full flex items-center justify-between p-4 touch-manipulation"
          >
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-lg bg-elec-yellow/20 flex items-center justify-center">
                <Banknote className="h-4 w-4 text-elec-yellow" />
              </div>
              <span className="text-[14px] font-medium text-white">Invoice Items ({allItems.length})</span>
            </div>
            {expandedSections.includes('items') ? (
              <ChevronUp className="h-5 w-5 text-white/50" />
            ) : (
              <ChevronDown className="h-5 w-5 text-white/50" />
            )}
          </button>

          {expandedSections.includes('items') && (
            <div className="border-t border-white/[0.06]">
              <div className="divide-y divide-white/[0.06]">
                {allItems.map((item, index) => (
                  <div key={item.id || index} className="p-4 space-y-2">
                    <div className="flex justify-between items-start gap-3">
                      <div className="flex-1 min-w-0">
                        <p className="text-[14px] font-medium text-white">{item.description}</p>
                        {item.notes && (
                          <p className="text-[12px] text-white/50 mt-0.5">{item.notes}</p>
                        )}
                      </div>
                      <p className="text-[14px] font-bold text-elec-yellow shrink-0">
                        {formatCurrency((item.quantity || 0) * (item.unitPrice || 0))}
                      </p>
                    </div>
                    <div className="flex items-center gap-4 text-[12px] text-white/50">
                      <span>{item.quantity} {item.unit}</span>
                      <span>×</span>
                      <span>{formatCurrency(item.unitPrice)}</span>
                    </div>
                  </div>
                ))}
              </div>

              {/* Totals Breakdown */}
              <div className="p-4 bg-elec-yellow/10 border-t border-elec-yellow/20 space-y-2">
                {/* Subtotal */}
                <div className="flex items-center justify-between">
                  <span className="text-[13px] text-white/70">Subtotal</span>
                  <span className="text-[14px] font-medium text-white">{formatCurrency(invoice.subtotal || 0)}</span>
                </div>

                {/* VAT - only show if VAT registered */}
                {invoice.settings?.vatRegistered && (
                  <div className="flex items-center justify-between">
                    <span className="text-[13px] text-white/70">VAT ({invoice.settings?.vatRate || 20}%)</span>
                    <span className="text-[14px] font-medium text-white">{formatCurrency(invoice.vatAmount || 0)}</span>
                  </div>
                )}

                {/* Total */}
                <div className="flex items-center justify-between pt-2 border-t border-elec-yellow/30">
                  <span className="text-[15px] font-semibold text-white">Total</span>
                  <span className="text-xl font-bold text-elec-yellow">{formatCurrency(totalAmount)}</span>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
