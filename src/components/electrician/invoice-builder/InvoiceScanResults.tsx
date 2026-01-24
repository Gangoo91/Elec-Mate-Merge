/**
 * Invoice Scan Results Component
 * Clean mobile-first design for reviewing extracted invoice items
 */

import React from 'react';
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Check,
  X,
  CheckCircle2,
  Circle,
  Sparkles,
  Store
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { ScanResult, ScannedInvoiceItem, MaterialMatch } from '@/types/invoice-scanner';

interface InvoiceScanResultsProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  result: ScanResult | null;
  onToggleItem: (itemId: string) => void;
  onSelectMatch: (itemId: string, match: MaterialMatch) => void;
  onUpdateItem: (itemId: string, updates: Partial<ScannedInvoiceItem>) => void;
  onSelectAll: () => void;
  onDeselectAll: () => void;
  onConfirm: () => void;
}

export function InvoiceScanResults({
  open,
  onOpenChange,
  result,
  onToggleItem,
  onUpdateItem,
  onSelectAll,
  onDeselectAll,
  onConfirm
}: InvoiceScanResultsProps) {
  if (!result || !result.success) return null;

  const selectedCount = result.items.filter(i => i.selected).length;
  const totalItems = result.items.length;

  const formatCurrency = (amount: number) =>
    new Intl.NumberFormat('en-GB', { style: 'currency', currency: 'GBP' }).format(amount);

  // Calculate totals
  const selectedTotal = result.items
    .filter(i => i.selected)
    .reduce((sum, item) => sum + (item.quantity * item.unitPrice), 0);

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent side="bottom" className="h-[85vh] p-0 rounded-t-2xl overflow-hidden">
        <div className="flex flex-col h-full bg-background">
          {/* Header */}
          <SheetHeader className="px-4 pt-4 pb-3 border-b border-white/[0.06]">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-elec-yellow/20 flex items-center justify-center">
                  <Sparkles className="h-5 w-5 text-elec-yellow" />
                </div>
                <div>
                  <SheetTitle className="text-white text-[16px] text-left">
                    {totalItems} Items Found
                  </SheetTitle>
                  {result.supplierName && (
                    <div className="flex items-center gap-1.5 text-[12px] text-white/50 mt-0.5">
                      <Store className="h-3 w-3" />
                      <span>{result.supplierName}</span>
                    </div>
                  )}
                </div>
              </div>
              <Button
                variant="ghost"
                size="icon"
                className="text-white/60 hover:text-white hover:bg-white/10 -mr-2"
                onClick={() => onOpenChange(false)}
              >
                <X className="h-5 w-5" />
              </Button>
            </div>
          </SheetHeader>

          {/* Selection Controls */}
          <div className="px-4 py-2.5 border-b border-white/[0.06] flex items-center justify-between bg-white/[0.02]">
            <span className="text-[13px] text-white/60">
              {selectedCount} selected
            </span>
            <div className="flex gap-1">
              <button
                className="text-[12px] text-elec-yellow font-medium px-3 py-1.5 rounded-lg hover:bg-elec-yellow/10 touch-manipulation"
                onClick={onSelectAll}
              >
                All
              </button>
              <button
                className="text-[12px] text-white/50 font-medium px-3 py-1.5 rounded-lg hover:bg-white/5 touch-manipulation"
                onClick={onDeselectAll}
              >
                None
              </button>
            </div>
          </div>

          {/* Items List */}
          <div className="flex-1 overflow-y-auto px-3 py-2">
            <div className="space-y-2">
              {result.items.map((item) => (
                <div
                  key={item.id}
                  onClick={() => onToggleItem(item.id)}
                  className={cn(
                    'rounded-xl border p-3 transition-all touch-manipulation active:scale-[0.99]',
                    item.selected
                      ? 'bg-elec-yellow/10 border-elec-yellow/30'
                      : 'bg-white/[0.02] border-white/[0.06]'
                  )}
                >
                  {/* Top Row: Checkbox + Description */}
                  <div className="flex items-start gap-3">
                    <div className="pt-0.5">
                      {item.selected ? (
                        <CheckCircle2 className="h-5 w-5 text-elec-yellow" />
                      ) : (
                        <Circle className="h-5 w-5 text-white/30" />
                      )}
                    </div>
                    <p className="flex-1 text-[13px] text-white leading-tight">
                      {item.extracted.description}
                    </p>
                  </div>

                  {/* Bottom Row: Qty × Price = Total */}
                  <div className="flex items-center justify-between mt-3 pl-8">
                    <div className="flex items-center gap-2">
                      <Input
                        type="number"
                        value={item.quantity === 0 ? '' : item.quantity}
                        onClick={(e) => e.stopPropagation()}
                        onChange={(e) => {
                          e.stopPropagation();
                          const qty = parseFloat(e.target.value) || 0;
                          onUpdateItem(item.id, { quantity: qty });
                        }}
                        className="h-9 w-14 text-[14px] text-center bg-white/[0.05] border-white/[0.08] rounded-lg"
                      />
                      <span className="text-white/40">×</span>
                      <div className="relative">
                        <span className="absolute left-2.5 top-1/2 -translate-y-1/2 text-[14px] text-white/40">£</span>
                        <Input
                          type="number"
                          value={item.unitPrice === 0 ? '' : item.unitPrice.toFixed(2)}
                          onClick={(e) => e.stopPropagation()}
                          onChange={(e) => {
                            e.stopPropagation();
                            const price = parseFloat(e.target.value) || 0;
                            onUpdateItem(item.id, { unitPrice: price });
                          }}
                          className="h-9 w-20 text-[14px] pl-6 bg-white/[0.05] border-white/[0.08] rounded-lg"
                        />
                      </div>
                    </div>
                    <span className="text-[15px] font-semibold text-elec-yellow">
                      {formatCurrency(item.quantity * item.unitPrice)}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Footer */}
          <div className="p-4 border-t border-white/[0.06] bg-background safe-area-bottom">
            {/* Total */}
            <div className="flex items-center justify-between mb-3">
              <span className="text-[14px] text-white/60">Total</span>
              <span className="text-[22px] font-bold text-elec-yellow">
                {formatCurrency(selectedTotal)}
              </span>
            </div>

            {/* Actions */}
            <div className="flex gap-3">
              <Button
                variant="outline"
                className="flex-1 h-12 border-white/10 text-white bg-transparent hover:bg-white/5 rounded-xl"
                onClick={() => onOpenChange(false)}
              >
                Cancel
              </Button>
              <Button
                className="flex-1 h-12 bg-elec-yellow text-black font-semibold hover:bg-elec-yellow/90 rounded-xl"
                onClick={onConfirm}
                disabled={selectedCount === 0}
              >
                <Check className="h-5 w-5 mr-2" />
                Add {selectedCount} Items
              </Button>
            </div>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
