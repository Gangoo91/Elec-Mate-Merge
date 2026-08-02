/**
 * QuoteOptionsSheet
 * Mobile: bottom sheet. Desktop: centred floating card.
 * Two descriptive option cards — the user is choosing a workflow, not
 * pressing a button, so each option says what it does.
 */

import React from 'react';
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import { useHaptic } from '@/hooks/useHaptic';
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
}> = ({ onAIEstimate, onSendToQuote, onClose }) => {
  const haptic = useHaptic();
  return (
    <div className="space-y-2.5">
      <button
        type="button"
        onClick={() => {
          haptic.medium();
          onAIEstimate();
        }}
        className="w-full rounded-xl bg-elec-yellow p-4 text-left touch-manipulation transition-transform active:scale-[0.99]"
      >
        <span className="block text-sm font-semibold text-black">AI estimator</span>
        <span className="mt-0.5 block text-[12.5px] leading-relaxed text-black/70">
          Prices every C1/C2/C3 remedial from live trade data — labour, materials and
          regional rates — ready to send as a quote.
        </span>
      </button>

      <button
        type="button"
        onClick={() => {
          haptic.light();
          onSendToQuote();
        }}
        className="w-full rounded-xl border border-white/[0.12] bg-white/[0.06] p-4 text-left touch-manipulation transition-transform active:scale-[0.99]"
      >
        <span className="block text-sm font-semibold text-white">Send to quote</span>
        <span className="mt-0.5 block text-[12.5px] leading-relaxed text-white/85">
          Open the quote builder with the observations pre-loaded as line items — you
          set the prices.
        </span>
      </button>

      <button
        type="button"
        onClick={onClose}
        className="h-12 w-full rounded-xl border border-white/[0.12] bg-white/[0.04] text-[14px] font-medium text-white touch-manipulation transition-transform active:scale-[0.98] outline-none focus:outline-none focus-visible:outline-none"
      >
        Cancel
      </button>
    </div>
  );
};

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
        <div className="relative z-10 mx-4 w-full max-w-sm rounded-2xl border border-white/[0.14] bg-background p-5">
          <h2 className="mb-1 text-[15px] font-semibold tracking-tight text-white">
            Price the remedial work
          </h2>
          <p className="mb-4 text-[12.5px] leading-relaxed text-white/85">
            Turn this report's observations into a costed quote.
          </p>
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
      <SheetContent
        side="bottom"
        className="rounded-t-2xl border-white/[0.14] p-0 outline-none focus:outline-none focus-visible:outline-none"
      >
        <div className="flex flex-col bg-background">
          <SheetHeader className="px-4 pb-1 pt-4 text-left">
            <SheetTitle className="text-[15px] font-semibold tracking-tight text-white">
              Price the remedial work
            </SheetTitle>
            <p className="text-[12.5px] leading-relaxed text-white/85">
              Turn this report's observations into a costed quote.
            </p>
          </SheetHeader>
          <div className="px-4 pb-[max(1.5rem,env(safe-area-inset-bottom))] pt-3">
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
