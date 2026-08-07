/**
 * AppReviewPromptSheet.tsx
 *
 * Bottom sheet shown after positive moments on native (cert generated, quote
 * sent, invoice paid). Asks before triggering the native App Store / Google
 * Play review flow.
 *
 * Gating lives in useAppReview.ts; the sheet is mounted once by
 * <AppReviewPromptHost> at the app root.
 */

import { Sheet, SheetContent, SheetDescription, SheetTitle } from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { Star } from 'lucide-react';

interface AppReviewPromptSheetProps {
  open: boolean;
  onRate: () => void;
  onDismiss: () => void;
}

const AppReviewPromptSheet = ({ open, onRate, onDismiss }: AppReviewPromptSheetProps) => {
  return (
    <Sheet open={open} onOpenChange={(v) => !v && onDismiss()}>
      <SheetContent side="bottom" className="rounded-t-2xl border-t border-white/10 p-0">
        {/* Extra bottom padding clears the iPhone home indicator. */}
        <div className="flex flex-col items-center gap-5 px-6 pt-8 pb-[calc(2.5rem+env(safe-area-inset-bottom))]">
          {/* Five stars read as "leave a rating" faster than a single icon. */}
          <div className="flex items-center gap-1.5" aria-hidden="true">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star key={i} className="h-7 w-7 fill-elec-yellow text-elec-yellow" />
            ))}
          </div>

          <div className="space-y-2 text-center">
            {/* SheetTitle, not a bare h2 — Radix needs it for the dialog label. */}
            <SheetTitle className="text-xl font-bold text-white">Enjoying Elec-Mate?</SheetTitle>
            <SheetDescription className="max-w-[300px] text-[15px] leading-relaxed text-white">
              A rating helps other electricians and apprentices find us. It takes about 30 seconds.
            </SheetDescription>
          </div>

          <div className="mt-1 w-full space-y-3">
            <Button
              onClick={onRate}
              className="h-12 w-full touch-manipulation rounded-2xl bg-elec-yellow text-[16px] font-semibold text-black hover:bg-elec-yellow/90"
            >
              Sure, happy to
            </Button>
            <Button
              variant="outline"
              onClick={onDismiss}
              className="h-12 w-full touch-manipulation rounded-2xl border-2 border-white/10 bg-transparent text-[15px] font-medium text-white hover:bg-white/5"
            >
              Not now
            </Button>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default AppReviewPromptSheet;
