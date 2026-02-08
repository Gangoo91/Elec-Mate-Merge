/**
 * QuoteOptionsSheet
 * Mobile: bottom sheet. Desktop: centred floating card.
 * Follows CLAUDE.md: h-11 touch targets, touch-manipulation, UK English.
 */

import React from 'react';
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import { Sparkles, FileText, X, ArrowRight } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';
import { cn } from '@/lib/utils';

interface QuoteOptionsSheetProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onAIEstimate: () => void;
  onSendToQuote: () => void;
}

const OptionCard: React.FC<{
  icon: React.ReactNode;
  title: string;
  description: string;
  accentClass: string;
  borderClass: string;
  onClick: () => void;
}> = ({ icon, title, description, accentClass, borderClass, onClick }) => (
  <button
    type="button"
    onClick={onClick}
    className={cn(
      'w-full text-left flex items-center gap-4 rounded-xl p-4 border transition-all duration-200',
      'active:scale-[0.98] touch-manipulation',
      'hover:border-white/30 hover:bg-white/[0.06]',
      borderClass, accentClass
    )}
  >
    {icon}
    <div className="flex-1 min-w-0">
      <div className="text-sm font-semibold text-white">{title}</div>
      <div className="text-xs text-white/50 mt-0.5">{description}</div>
    </div>
    <ArrowRight className="h-4 w-4 text-white/30 flex-shrink-0" />
  </button>
);

const QuoteOptionsContent: React.FC<{
  onAIEstimate: () => void;
  onSendToQuote: () => void;
  onClose: () => void;
  isDesktop?: boolean;
}> = ({ onAIEstimate, onSendToQuote, onClose, isDesktop }) => (
  <div className="space-y-3">
    <OptionCard
      icon={
        <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-amber-500/20 to-orange-500/20 border border-amber-500/20 flex items-center justify-center flex-shrink-0">
          <Sparkles className="h-5 w-5 text-amber-400" />
        </div>
      }
      title="AI Estimator"
      description="Auto-generate materials, labour & pricing"
      accentClass="bg-amber-500/[0.06]"
      borderClass="border-amber-500/20"
      onClick={onAIEstimate}
    />
    <OptionCard
      icon={
        <div className="w-11 h-11 rounded-xl bg-emerald-500/15 border border-emerald-500/20 flex items-center justify-center flex-shrink-0">
          <FileText className="h-5 w-5 text-emerald-400" />
        </div>
      }
      title="Send to Quote"
      description="Create quote with client details pre-filled"
      accentClass="bg-emerald-500/[0.06]"
      borderClass="border-emerald-500/20"
      onClick={onSendToQuote}
    />
    {isDesktop && (
      <button
        type="button"
        onClick={onClose}
        className="w-full text-center text-xs text-white/40 hover:text-white/60 py-2 touch-manipulation transition-colors"
      >
        Cancel
      </button>
    )}
  </div>
);

const QuoteOptionsSheet: React.FC<QuoteOptionsSheetProps> = ({
  open,
  onOpenChange,
  onAIEstimate,
  onSendToQuote,
}) => {
  const isMobile = useIsMobile();

  // Desktop: centred floating card with backdrop
  if (!isMobile) {
    if (!open) return null;

    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center">
        {/* Backdrop */}
        <div
          className="absolute inset-0 bg-black/60 backdrop-blur-sm animate-in fade-in-0 duration-200"
          onClick={() => onOpenChange(false)}
        />

        {/* Card */}
        <div className="relative z-10 w-full max-w-md mx-4 bg-background border border-white/10 rounded-2xl shadow-2xl shadow-black/50 animate-in fade-in-0 zoom-in-95 duration-200">
          {/* Header */}
          <div className="flex items-center justify-between px-5 pt-5 pb-4">
            <h2 className="text-lg font-semibold text-white">Quote Options</h2>
            <button
              type="button"
              onClick={() => onOpenChange(false)}
              className="w-8 h-8 rounded-lg flex items-center justify-center text-white/40 hover:text-white/70 hover:bg-white/10 transition-colors touch-manipulation"
            >
              <X className="h-4 w-4" />
            </button>
          </div>

          {/* Content */}
          <div className="px-5 pb-5">
            <QuoteOptionsContent
              onAIEstimate={onAIEstimate}
              onSendToQuote={onSendToQuote}
              onClose={() => onOpenChange(false)}
              isDesktop
            />
          </div>
        </div>
      </div>
    );
  }

  // Mobile: bottom sheet
  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent side="bottom" className="p-0 rounded-t-2xl overflow-hidden">
        <div className="flex flex-col bg-background">
          <SheetHeader className="px-4 pt-4 pb-3 border-b border-white/10">
            <SheetTitle className="text-base font-semibold text-white">
              Quote Options
            </SheetTitle>
          </SheetHeader>

          <div className="p-4">
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
