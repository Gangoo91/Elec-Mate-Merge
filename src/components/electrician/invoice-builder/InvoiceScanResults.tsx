/**
 * Invoice Scan Results Component
 * Displays extracted invoice items with material matches for review
 */

import React, { useState } from 'react';
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Check,
  X,
  ChevronDown,
  ChevronUp,
  Package,
  Search,
  CheckCircle2,
  Circle,
  AlertTriangle,
  FileText,
  Calendar,
  Hash,
  Sparkles
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
  onSelectMatch,
  onUpdateItem,
  onSelectAll,
  onDeselectAll,
  onConfirm
}: InvoiceScanResultsProps) {
  const [expandedItem, setExpandedItem] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  if (!result || !result.success) return null;

  const selectedCount = result.items.filter(i => i.selected).length;
  const totalItems = result.items.length;

  const formatCurrency = (amount: number) =>
    new Intl.NumberFormat('en-GB', { style: 'currency', currency: 'GBP' }).format(amount);

  const getConfidenceColor = (score: number) => {
    if (score >= 0.8) return 'text-green-400';
    if (score >= 0.6) return 'text-yellow-400';
    return 'text-orange-400';
  };

  const getConfidenceLabel = (score: number) => {
    if (score >= 0.8) return 'High';
    if (score >= 0.6) return 'Medium';
    return 'Low';
  };

  // Calculate totals
  const selectedTotal = result.items
    .filter(i => i.selected)
    .reduce((sum, item) => sum + (item.quantity * item.unitPrice), 0);

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent side="bottom" className="h-[90vh] p-0 rounded-t-2xl overflow-hidden">
        <div className="flex flex-col h-full bg-background">
          {/* Header */}
          <SheetHeader className="p-4 border-b border-white/[0.06]">
            <div className="flex items-center justify-between">
              <SheetTitle className="text-white text-lg flex items-center gap-2">
                <Sparkles className="h-5 w-5 text-elec-yellow" />
                Review Items
              </SheetTitle>
              <Button
                variant="ghost"
                size="icon"
                className="text-white/60 hover:text-white hover:bg-white/10"
                onClick={() => onOpenChange(false)}
              >
                <X className="h-5 w-5" />
              </Button>
            </div>

            {/* Invoice Info */}
            {(result.supplierName || result.invoiceNumber || result.invoiceDate) && (
              <div className="flex flex-wrap gap-3 mt-3">
                {result.supplierName && (
                  <div className="flex items-center gap-1.5 text-[12px] text-white/60">
                    <FileText className="h-3.5 w-3.5" />
                    <span>{result.supplierName}</span>
                  </div>
                )}
                {result.invoiceNumber && (
                  <div className="flex items-center gap-1.5 text-[12px] text-white/60">
                    <Hash className="h-3.5 w-3.5" />
                    <span>{result.invoiceNumber}</span>
                  </div>
                )}
                {result.invoiceDate && (
                  <div className="flex items-center gap-1.5 text-[12px] text-white/60">
                    <Calendar className="h-3.5 w-3.5" />
                    <span>{result.invoiceDate}</span>
                  </div>
                )}
              </div>
            )}
          </SheetHeader>

          {/* Selection Controls */}
          <div className="px-4 py-3 border-b border-white/[0.06] flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="text-[13px] text-white/60">
                {selectedCount} of {totalItems} selected
              </span>
            </div>
            <div className="flex gap-2">
              <Button
                variant="ghost"
                size="sm"
                className="text-[12px] text-white/60 hover:text-white h-8 px-2"
                onClick={onSelectAll}
              >
                Select All
              </Button>
              <Button
                variant="ghost"
                size="sm"
                className="text-[12px] text-white/60 hover:text-white h-8 px-2"
                onClick={onDeselectAll}
              >
                Clear
              </Button>
            </div>
          </div>

          {/* Items List */}
          <div className="flex-1 overflow-y-auto">
            {result.items.map((item) => {
              const isExpanded = expandedItem === item.id;

              return (
                <div
                  key={item.id}
                  className={cn(
                    'border-b border-white/[0.06]',
                    item.selected && 'bg-elec-yellow/5'
                  )}
                >
                  {/* Item Row */}
                  <div className="p-4">
                    <div className="flex items-start gap-3">
                      {/* Selection Toggle */}
                      <button
                        onClick={() => onToggleItem(item.id)}
                        className="mt-1 touch-manipulation"
                      >
                        {item.selected ? (
                          <CheckCircle2 className="h-6 w-6 text-elec-yellow" />
                        ) : (
                          <Circle className="h-6 w-6 text-white/30" />
                        )}
                      </button>

                      {/* Item Details */}
                      <div className="flex-1 min-w-0">
                        {/* Extracted Description */}
                        <p className="text-[12px] text-white/50 truncate mb-1">
                          {item.extracted.description}
                        </p>

                        {/* Matched Material or No Match */}
                        {item.match ? (
                          <div className="flex items-center gap-2">
                            <Package className="h-4 w-4 text-elec-yellow flex-shrink-0" />
                            <p className="text-[14px] font-medium text-white truncate">
                              {item.match.name}
                            </p>
                          </div>
                        ) : (
                          <div className="flex items-center gap-2">
                            <AlertTriangle className="h-4 w-4 text-orange-400 flex-shrink-0" />
                            <p className="text-[14px] text-orange-300">No match found</p>
                          </div>
                        )}

                        {/* Confidence Score */}
                        {item.match && (
                          <p className={cn('text-[11px] mt-1', getConfidenceColor(item.match.score))}>
                            {getConfidenceLabel(item.match.score)} confidence ({Math.round(item.match.score * 100)}%)
                          </p>
                        )}

                        {/* Quantity and Price */}
                        <div className="flex items-center gap-4 mt-2">
                          <div className="flex items-center gap-2">
                            <span className="text-[12px] text-white/50">Qty:</span>
                            <Input
                              type="number"
                              value={item.quantity === 0 ? '' : item.quantity}
                              onChange={(e) => {
                                const qty = parseFloat(e.target.value) || 0;
                                onUpdateItem(item.id, { quantity: qty });
                              }}
                              className="h-8 w-16 text-[13px] bg-white/[0.05] border-white/[0.06]"
                            />
                          </div>
                          <div className="flex items-center gap-2">
                            <span className="text-[12px] text-white/50">Price:</span>
                            <Input
                              type="number"
                              value={item.unitPrice === 0 ? '' : item.unitPrice}
                              onChange={(e) => {
                                const price = parseFloat(e.target.value) || 0;
                                onUpdateItem(item.id, { unitPrice: price });
                              }}
                              className="h-8 w-20 text-[13px] bg-white/[0.05] border-white/[0.06]"
                            />
                          </div>
                          <span className="text-[14px] font-semibold text-elec-yellow ml-auto">
                            {formatCurrency(item.quantity * item.unitPrice)}
                          </span>
                        </div>
                      </div>

                      {/* Expand/Collapse */}
                      {item.alternativeMatches.length > 0 && (
                        <button
                          onClick={() => setExpandedItem(isExpanded ? null : item.id)}
                          className="p-2 touch-manipulation"
                        >
                          {isExpanded ? (
                            <ChevronUp className="h-5 w-5 text-white/40" />
                          ) : (
                            <ChevronDown className="h-5 w-5 text-white/40" />
                          )}
                        </button>
                      )}
                    </div>
                  </div>

                  {/* Alternative Matches */}
                  {isExpanded && item.alternativeMatches.length > 0 && (
                    <div className="px-4 pb-4 pl-14">
                      <p className="text-[11px] text-white/40 uppercase tracking-wide mb-2">
                        Alternative matches
                      </p>
                      <div className="space-y-2">
                        {item.alternativeMatches.map((match) => (
                          <button
                            key={match.id}
                            onClick={() => onSelectMatch(item.id, match)}
                            className="w-full flex items-center justify-between p-3 rounded-lg bg-white/[0.03] border border-white/[0.06] touch-manipulation active:scale-[0.99]"
                          >
                            <div className="flex items-center gap-2">
                              <Package className="h-4 w-4 text-white/50" />
                              <span className="text-[13px] text-white truncate max-w-[200px]">
                                {match.name}
                              </span>
                            </div>
                            <div className="flex items-center gap-3">
                              <span className={cn('text-[11px]', getConfidenceColor(match.score))}>
                                {Math.round(match.score * 100)}%
                              </span>
                              {match.defaultPrice > 0 && (
                                <span className="text-[12px] text-white/60">
                                  {formatCurrency(match.defaultPrice)}
                                </span>
                              )}
                            </div>
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Footer */}
          <div className="p-4 border-t border-white/[0.06] bg-background">
            {/* Totals */}
            <div className="flex items-center justify-between mb-4">
              <span className="text-[14px] text-white/70">Selected Items Total</span>
              <span className="text-[20px] font-bold text-elec-yellow">
                {formatCurrency(selectedTotal)}
              </span>
            </div>

            {/* Actions */}
            <div className="flex gap-3">
              <Button
                variant="outline"
                className="flex-1 h-12 border-white/10 text-white bg-transparent hover:bg-white/5"
                onClick={() => onOpenChange(false)}
              >
                Cancel
              </Button>
              <Button
                className="flex-1 h-12 bg-elec-yellow text-black font-semibold hover:bg-elec-yellow/90"
                onClick={onConfirm}
                disabled={selectedCount === 0}
              >
                <Check className="h-5 w-5 mr-2" />
                Add {selectedCount} {selectedCount === 1 ? 'Item' : 'Items'}
              </Button>
            </div>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
