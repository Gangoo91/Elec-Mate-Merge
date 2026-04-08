/**
 * QuoteOptionsSheet
 * Mobile: bottom sheet. Desktop: centred floating card.
 */

import React from 'react';
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import { X } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';

interface QuoteOptionsSheetProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onAIEstimate: () => void;
  onSendToQuote: () => void;
}

const QuoteOptionsContent: React.FC<{
  onAIEstimate: () => void;
  onSendToQuote: () => void;
  onClose: () => void;
}> = ({ onAIEstimate, onSendToQuote, onClose }) => (
  <div className="space-y-2">
    <button
      type="button"
      onClick={onAIEstimate}
      className="w-full h-11 rounded-lg bg-elec-yellow/20 border border-elec-yellow/40 text-sm font-semibold text-elec-yellow touch-manipulation active:scale-[0.98] transition-all"
    >
      AI Estimator
    </button>
    <button
      type="button"
      onClick={onSendToQuote}
      className="w-full h-11 rounded-lg bg-white/[0.08] border border-white/[0.12] text-sm font-semibold text-white touch-manipulation active:scale-[0.98] transition-all"
    >
      Send to Quote
    </button>
    <button
      type="button"
      onClick={onClose}
      className="w-full h-9 text-xs text-white/40 touch-manipulation"
    >
      Cancel
    </button>
  </div>
);

const QuoteOptionsSheet: React.FC<QuoteOptionsSheetProps> = ({
  open,
  onOpenChange,
  onAIEstimate,
  onSendToQuote,
}) => {
  const isMobile = useIsMobile();

  if (!isMobile) {
    if (!open) return null;
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center">
        <div
          className="absolute inset-0 bg-black/60 backdrop-blur-sm"
          onClick={() => onOpenChange(false)}
        />
        <div className="relative z-10 w-full max-w-xs mx-4 bg-background border border-white/[0.08] rounded-2xl p-5 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-bold text-white">Quote Options</h2>
            <button
              onClick={() => onOpenChange(false)}
              className="h-8 w-8 rounded-lg flex items-center justify-center text-white/40 hover:text-white touch-manipulation"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
          <QuoteOptionsContent
            onAIEstimate={onAIEstimate}
            onSendToQuote={onSendToQuote}
            onClose={() => onOpenChange(false)}
          />
        </div>
      </div>
    );
  }

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent side="bottom" className="p-0 rounded-t-2xl overflow-hidden">
        <div className="flex flex-col bg-background">
          <SheetHeader className="px-4 pt-4 pb-3">
            <SheetTitle className="text-sm font-bold text-white">Quote Options</SheetTitle>
          </SheetHeader>
          <div className="px-4 pb-6">
            <QuoteOptionsContent
              onAIEstimate={onAIEstimate}
              onSendToQuote={onSendToQuote}
              onClose={() => onOpenChange(false)}
            />
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default QuoteOptionsSheet;
