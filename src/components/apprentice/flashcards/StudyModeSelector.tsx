/**
 * Ways to study a deck (10 Oct 2026 redesign). Opened from a deck's
 * "Options"; tapping the deck itself already starts the right mode.
 *
 * Every mode now does what it says: "Quick ten" really is ten cards (it was a
 * plain run through the whole deck labelled "rapid-fire"), and the
 * recommendation follows the deck — in order for a new deck, hardest first for
 * one you've started.
 */
import { ChevronRight } from 'lucide-react';
import { Sheet, SheetContent, SheetDescription, SheetTitle } from '@/components/ui/sheet';
import { cn } from '@/lib/utils';

interface StudyModeSelectorProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSelectMode: (mode: string) => void;
  deckTitle?: string;
  cardCount?: number;
  /** The mode tapping the deck would use. */
  recommended?: string;
}

const studyModes = [
  {
    id: 'sequential',
    title: 'In order',
    description: 'Every card, front to back. Best the first time through.',
  },
  { id: 'spaced', title: 'Hardest first', description: 'The tricky cards before the easy ones.' },
  {
    id: 'random',
    title: 'Shuffled',
    description: 'Every card in a random order, so you can’t lean on the sequence.',
  },
  { id: 'quick', title: 'Quick ten', description: 'Ten random cards. Two or three minutes.' },
];

const StudyModeSelector = ({
  open,
  onOpenChange,
  onSelectMode,
  deckTitle,
  cardCount,
  recommended = 'sequential',
}: StudyModeSelectorProps) => (
  <Sheet open={open} onOpenChange={onOpenChange}>
    <SheetContent
      side="bottom"
      className="h-auto max-h-[85vh] overflow-y-auto overscroll-contain rounded-t-2xl border-t border-white/[0.14] bg-background p-0"
    >
      <div aria-hidden className="mx-auto mt-2.5 h-1 w-10 rounded-full bg-white/[0.25]" />
      <div className="mx-auto max-w-xl px-5 pb-[max(1.5rem,env(safe-area-inset-bottom))] pt-4">
        <SheetTitle className="text-left text-[20px] font-bold tracking-tight text-white">
          {deckTitle ?? 'Ways to study'}
        </SheetTitle>
        <SheetDescription className="mt-1 text-left text-[13.5px] text-white">
          {cardCount ? `${cardCount} cards. ` : ''}Pick how you want to go through them.
        </SheetDescription>
        <div className="mt-4 divide-y divide-white/[0.08] rounded-2xl border border-white/[0.12]">
          {studyModes.map((mode) => (
            <button
              key={mode.id}
              type="button"
              onClick={() => onSelectMode(mode.id)}
              className={cn(
                'flex min-h-[64px] w-full items-center gap-3 px-4 py-3.5 text-left transition-colors touch-manipulation',
                'first:rounded-t-2xl last:rounded-b-2xl hover:bg-white/[0.04] active:bg-white/[0.08]'
              )}
            >
              <span className="min-w-0 flex-1">
                <span className="flex flex-wrap items-center gap-2">
                  <span className="text-[15.5px] font-semibold text-white">{mode.title}</span>
                  {mode.id === recommended && (
                    <span className="rounded-full bg-elec-yellow px-2 py-0.5 text-[11.5px] font-bold text-black">
                      Suggested
                    </span>
                  )}
                </span>
                <span className="mt-0.5 block text-[13px] leading-snug text-white">
                  {mode.description}
                </span>
              </span>
              <ChevronRight className="h-5 w-5 shrink-0 text-white" aria-hidden />
            </button>
          ))}
        </div>
      </div>
    </SheetContent>
  </Sheet>
);

export default StudyModeSelector;
