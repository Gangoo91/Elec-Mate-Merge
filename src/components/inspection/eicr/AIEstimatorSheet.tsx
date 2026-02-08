/**
 * AIEstimatorSheet
 * Mobile: 85vh bottom sheet. Desktop: centred modal panel.
 * Follows CLAUDE.md: h-11 touch targets, touch-manipulation, UK English, native app feel.
 */

import React, { useState } from 'react';
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Loader2, Sparkles, Check, Trash2, ChevronDown, ChevronUp, Package, Clock, FileText, X } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useIsMobile } from '@/hooks/use-mobile';
import type { EstimateResult } from '@/hooks/useEstimateRemedialCosts';
import type { RemedialQuoteItem } from '@/utils/defectToQuoteItems';

interface AIEstimatorSheetProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  isEstimating: boolean;
  progressStep: 'idle' | 'authenticating' | 'searching' | 'generating' | 'done';
  elapsedSeconds: number;
  estimateResult: EstimateResult | null;
  onUpdateItem: (index: number, updates: Partial<RemedialQuoteItem>) => void;
  onDeleteItem: (index: number) => void;
  onUpdateScopeOfWorks: (text: string) => void;
  onCreateQuote: () => void;
  onCancel: () => void;
}

const PROGRESS_STEPS = [
  { key: 'authenticating', label: 'Authenticating...' },
  { key: 'searching', label: 'Searching pricing data...' },
  { key: 'generating', label: 'Generating estimate...' },
  { key: 'done', label: 'Complete' },
] as const;

const AIEstimatorSheet: React.FC<AIEstimatorSheetProps> = ({
  open,
  onOpenChange,
  isEstimating,
  progressStep,
  elapsedSeconds,
  estimateResult,
  onUpdateItem,
  onDeleteItem,
  onUpdateScopeOfWorks,
  onCreateQuote,
  onCancel,
}) => {
  const isMobile = useIsMobile();
  const [expandedItems, setExpandedItems] = useState<Set<number>>(new Set());
  const [editingItem, setEditingItem] = useState<{ index: number; field: 'quantity' | 'unitPrice' } | null>(null);
  const [materialsOpen, setMaterialsOpen] = useState(true);
  const [labourOpen, setLabourOpen] = useState(true);
  const [scopeOpen, setScopeOpen] = useState(true);

  const toggleExpand = (index: number) => {
    setExpandedItems(prev => {
      const next = new Set(prev);
      if (next.has(index)) next.delete(index);
      else next.add(index);
      return next;
    });
  };

  const handleEditField = (index: number, field: 'quantity' | 'unitPrice', value: string) => {
    const numVal = parseFloat(value);
    if (isNaN(numVal) || numVal < 0) return;
    const item = estimateResult?.items[index];
    if (!item) return;

    const updates: Partial<RemedialQuoteItem> = { [field]: numVal };
    if (field === 'quantity') {
      updates.totalPrice = numVal * item.unitPrice;
    } else {
      updates.totalPrice = item.quantity * numVal;
    }
    onUpdateItem(index, updates);
  };

  const materialItems = estimateResult?.items.filter(i => i.category === 'materials') || [];
  const labourItems = estimateResult?.items.filter(i => i.category === 'labour') || [];

  const formatCurrency = (amount: number) => `£${amount.toFixed(2)}`;

  const renderItemCard = (item: RemedialQuoteItem, globalIndex: number) => {
    const isExpanded = expandedItems.has(globalIndex);
    const isEditingQty = editingItem?.index === globalIndex && editingItem.field === 'quantity';
    const isEditingPrice = editingItem?.index === globalIndex && editingItem.field === 'unitPrice';

    return (
      <div key={item.id} className="bg-white/[0.03] border border-white/10 rounded-lg p-3 space-y-2">
        <div className="flex items-start gap-2">
          <div
            className="flex-1 min-w-0 touch-manipulation cursor-pointer"
            onClick={() => toggleExpand(globalIndex)}
          >
            <p className={cn(
              'text-sm text-white text-left',
              !isExpanded && 'line-clamp-2'
            )}>
              {item.description}
            </p>
            {item.notes && isExpanded && (
              <p className="text-xs text-white/50 mt-1">{item.notes}</p>
            )}
          </div>
          <Button
            variant="ghost"
            size="sm"
            className="h-8 w-8 p-0 text-red-400 hover:bg-red-500/10 touch-manipulation flex-shrink-0"
            onClick={() => onDeleteItem(globalIndex)}
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>

        <div className="flex items-center gap-3 text-xs">
          <div className="flex items-center gap-1">
            <span className="text-white/50">Qty:</span>
            {isEditingQty ? (
              <Input
                type="number"
                defaultValue={item.quantity}
                className="h-7 w-16 text-xs px-2 border-white/30 focus:border-yellow-500"
                autoFocus
                onBlur={(e) => {
                  handleEditField(globalIndex, 'quantity', e.target.value);
                  setEditingItem(null);
                }}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    handleEditField(globalIndex, 'quantity', (e.target as HTMLInputElement).value);
                    setEditingItem(null);
                  }
                }}
              />
            ) : (
              <span
                className="text-white font-medium px-1.5 py-0.5 rounded bg-white/5 touch-manipulation cursor-pointer"
                onClick={() => setEditingItem({ index: globalIndex, field: 'quantity' })}
              >
                {item.quantity} {item.unit}
              </span>
            )}
          </div>
          <span className="text-white/30">×</span>
          <div className="flex items-center gap-1">
            {isEditingPrice ? (
              <Input
                type="number"
                step="0.01"
                defaultValue={item.unitPrice}
                className="h-7 w-20 text-xs px-2 border-white/30 focus:border-yellow-500"
                autoFocus
                onBlur={(e) => {
                  handleEditField(globalIndex, 'unitPrice', e.target.value);
                  setEditingItem(null);
                }}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    handleEditField(globalIndex, 'unitPrice', (e.target as HTMLInputElement).value);
                    setEditingItem(null);
                  }
                }}
              />
            ) : (
              <span
                className="text-white font-medium px-1.5 py-0.5 rounded bg-white/5 touch-manipulation cursor-pointer"
                onClick={() => setEditingItem({ index: globalIndex, field: 'unitPrice' })}
              >
                {formatCurrency(item.unitPrice)}
              </span>
            )}
          </div>
          <span className="text-white/30">=</span>
          <span className="text-white font-semibold ml-auto">
            {formatCurrency(item.totalPrice)}
          </span>
        </div>
      </div>
    );
  };

  /* ── Shared header ── */
  const headerContent = (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-2 text-base font-semibold text-white">
        <Sparkles className="h-5 w-5 text-elec-yellow" />
        AI Estimator
      </div>
      <div className="flex items-center gap-3">
        {isEstimating && (
          <span className="text-xs text-white/50">{elapsedSeconds}s</span>
        )}
        {!isMobile && (
          <button
            type="button"
            onClick={() => isEstimating ? onCancel() : onOpenChange(false)}
            className="w-8 h-8 rounded-lg flex items-center justify-center text-white/40 hover:text-white/70 hover:bg-white/10 transition-colors touch-manipulation"
          >
            <X className="h-4 w-4" />
          </button>
        )}
      </div>
    </div>
  );

  /* ── Shared body content ── */
  const bodyContent = (
    <div className="space-y-4">
      {/* Progress Steps */}
      {isEstimating && (
        <div className="flex flex-col items-center justify-center py-10 gap-8">
          {/* Pulsing ring spinner */}
          <div className="relative">
            <div className="w-16 h-16 rounded-full border-2 border-elec-yellow/20 flex items-center justify-center animate-ai-ring-pulse">
              <Loader2 className="h-7 w-7 animate-spin text-elec-yellow" />
            </div>
          </div>

          {/* Progress bar */}
          <div className="w-full max-w-xs">
            <div className="h-1 rounded-full bg-white/10 overflow-hidden">
              <div
                className="h-full rounded-full bg-gradient-to-r from-elec-yellow to-amber-400 animate-progress-fill transition-all"
                style={{
                  '--progress-width': `${(() => {
                    const stepIndex = PROGRESS_STEPS.findIndex(s => s.key === progressStep);
                    return stepIndex >= 0 ? ((stepIndex + 1) / PROGRESS_STEPS.length) * 100 : 0;
                  })()}%`
                } as React.CSSProperties}
              />
            </div>
          </div>

          {/* Steps */}
          <div className="w-full max-w-xs space-y-3">
            {PROGRESS_STEPS.map((step, i) => {
              const stepIndex = PROGRESS_STEPS.findIndex(s => s.key === progressStep);
              const isActive = step.key === progressStep;
              const isComplete = i < stepIndex;
              const isVisible = i <= stepIndex;
              return (
                <div
                  key={step.key}
                  className={cn(
                    'flex items-center gap-3 transition-all duration-300',
                    isVisible ? 'animate-step-appear' : 'opacity-0'
                  )}
                  style={isVisible ? { animationDelay: `${i * 100}ms` } : undefined}
                >
                  <div className={cn(
                    'w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0 transition-all duration-500',
                    isComplete ? 'bg-green-500 scale-100' :
                    isActive ? 'bg-elec-yellow scale-110' :
                    'bg-white/10 scale-90'
                  )}>
                    {isComplete ? (
                      <Check className="h-4 w-4 text-white" />
                    ) : isActive ? (
                      <Loader2 className="h-4 w-4 animate-spin text-black" />
                    ) : (
                      <span className="text-[10px] text-white/50">{i + 1}</span>
                    )}
                  </div>
                  <span className={cn(
                    'text-sm font-medium transition-colors duration-300',
                    isActive ? 'text-white' :
                    isComplete ? 'text-white/70' :
                    'text-white/30'
                  )}>
                    {step.label}
                  </span>
                </div>
              );
            })}
          </div>

          {/* Timer */}
          <div className="flex items-center gap-2 text-xs text-white/40">
            <div className="w-1 h-1 rounded-full bg-elec-yellow animate-pulse" />
            <span>{elapsedSeconds}s / ~2 mins</span>
          </div>

          <Button
            variant="ghost"
            className="h-11 px-6 text-white/70 hover:bg-white/10 touch-manipulation"
            onClick={onCancel}
          >
            Cancel
          </Button>
        </div>
      )}

      {/* Results */}
      {estimateResult && !isEstimating && (
        <>
          {/* Summary Card */}
          <div className="bg-emerald-500/10 border border-emerald-500/30 rounded-xl p-4 space-y-3">
            <h3 className="text-sm font-semibold text-white flex items-center gap-1.5">
              <div className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
              Estimate Summary
            </h3>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <span className="text-xs text-white/50 block">Materials</span>
                <span className="text-sm font-semibold text-white">
                  {formatCurrency(estimateResult.summary.totalMaterials)}
                </span>
              </div>
              <div>
                <span className="text-xs text-white/50 block">Labour</span>
                <span className="text-sm font-semibold text-white">
                  {formatCurrency(estimateResult.summary.totalLabour)}
                </span>
              </div>
              <div>
                <span className="text-xs text-white/50 block">Total (ex VAT)</span>
                <span className="text-base font-bold text-emerald-400">
                  {formatCurrency(estimateResult.summary.totalExVat)}
                </span>
              </div>
              <div>
                <span className="text-xs text-white/50 block">Defects processed</span>
                <span className="text-sm font-semibold text-white">
                  {estimateResult.summary.defectsProcessed}
                </span>
              </div>
            </div>
          </div>

          {/* Scope of Works - prominent at top */}
          <div className="space-y-2">
            <button
              className="flex items-center gap-2 w-full text-left touch-manipulation"
              onClick={() => setScopeOpen(!scopeOpen)}
            >
              <FileText className="h-4 w-4 text-purple-400" />
              <span className="text-sm font-semibold text-white flex-1">
                Scope of Works
              </span>
              {scopeOpen ? (
                <ChevronUp className="h-4 w-4 text-white/50" />
              ) : (
                <ChevronDown className="h-4 w-4 text-white/50" />
              )}
            </button>
            {scopeOpen && (
              <Textarea
                value={estimateResult.scopeOfWorks || ''}
                onChange={(e) => onUpdateScopeOfWorks(e.target.value)}
                placeholder="Describe the scope of remedial works..."
                className="min-h-[100px] text-sm text-white touch-manipulation border-white/30 focus:border-yellow-500 focus:ring-yellow-500"
              />
            )}
          </div>

          {/* Materials Section */}
          {materialItems.length > 0 && (
            <div className="space-y-2">
              <button
                className="flex items-center gap-2 w-full text-left touch-manipulation"
                onClick={() => setMaterialsOpen(!materialsOpen)}
              >
                <Package className="h-4 w-4 text-amber-400" />
                <span className="text-sm font-semibold text-white flex-1">
                  Materials ({materialItems.length})
                </span>
                {materialsOpen ? (
                  <ChevronUp className="h-4 w-4 text-white/50" />
                ) : (
                  <ChevronDown className="h-4 w-4 text-white/50" />
                )}
              </button>
              {materialsOpen && (
                <div className="space-y-2">
                  {estimateResult.items.map((item, index) => {
                    if (item.category !== 'materials') return null;
                    return renderItemCard(item, index);
                  })}
                </div>
              )}
            </div>
          )}

          {/* Labour Section */}
          {labourItems.length > 0 && (
            <div className="space-y-2">
              <button
                className="flex items-center gap-2 w-full text-left touch-manipulation"
                onClick={() => setLabourOpen(!labourOpen)}
              >
                <Clock className="h-4 w-4 text-blue-400" />
                <span className="text-sm font-semibold text-white flex-1">
                  Labour ({labourItems.length})
                </span>
                {labourOpen ? (
                  <ChevronUp className="h-4 w-4 text-white/50" />
                ) : (
                  <ChevronDown className="h-4 w-4 text-white/50" />
                )}
              </button>
              {labourOpen && (
                <div className="space-y-2">
                  {estimateResult.items.map((item, index) => {
                    if (item.category !== 'labour') return null;
                    return renderItemCard(item, index);
                  })}
                </div>
              )}
            </div>
          )}
        </>
      )}
    </div>
  );

  /* ── Shared footer ── */
  const footerContent = estimateResult && !isEstimating && (
    <div className="px-4 md:px-5 py-4 border-t border-white/10 space-y-2">
      <Button
        className="w-full h-12 bg-elec-yellow hover:bg-elec-yellow/90 text-black font-semibold touch-manipulation active:scale-[0.98] transition-all"
        onClick={onCreateQuote}
      >
        Create Quote
      </Button>
      <Button
        variant="ghost"
        className="w-full h-11 text-white/70 hover:bg-white/10 touch-manipulation"
        onClick={() => onOpenChange(false)}
      >
        Close
      </Button>
    </div>
  );

  /* ── Desktop: centred modal panel ── */
  if (!isMobile) {
    if (!open) return null;

    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center">
        {/* Backdrop */}
        <div
          className="absolute inset-0 bg-black/60 backdrop-blur-sm animate-in fade-in-0 duration-200"
          onClick={() => isEstimating ? onCancel() : onOpenChange(false)}
        />

        {/* Panel */}
        <div className="relative z-10 w-full max-w-lg mx-4 max-h-[80vh] bg-background border border-white/10 rounded-2xl shadow-2xl shadow-black/50 flex flex-col animate-in fade-in-0 zoom-in-95 duration-200">
          {/* Header */}
          <div className="px-5 pt-5 pb-4 border-b border-white/10 flex-shrink-0">
            {headerContent}
          </div>

          {/* Scrollable content */}
          <div className="flex-1 overflow-y-auto px-5 py-4">
            {bodyContent}
          </div>

          {/* Footer */}
          {footerContent}
        </div>
      </div>
    );
  }

  /* ── Mobile: bottom sheet ── */
  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent side="bottom" className="h-[85vh] p-0 rounded-t-2xl overflow-hidden">
        <div className="flex flex-col h-full bg-background">
          {/* Header */}
          <SheetHeader className="px-4 pt-4 pb-3 border-b border-white/10">
            {headerContent}
          </SheetHeader>

          {/* Content */}
          <div className="flex-1 overflow-y-auto px-4 py-4">
            {bodyContent}
          </div>

          {/* Footer */}
          {footerContent}
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default AIEstimatorSheet;
