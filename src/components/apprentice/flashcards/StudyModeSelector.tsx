/**
 * Pick how to work through a set (ELE-1655).
 *
 * Rebuilt as a proper bottom sheet on the shared row language: full-white type
 * throughout, h-11-plus targets, and the recommended mode marked with a solid
 * volt pill rather than a `/[0.04]` wash that disappeared against the ground.
 */
import { ChevronRight } from 'lucide-react';
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import { cn } from '@/lib/utils';

interface StudyModeSelectorProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSelectMode: (mode: string) => void;
}

const studyModes = [
  {
    id: 'sequential',
    title: 'Sequential study',
    description: 'Cards in order — best for first-time learning',
    recommended: true,
  },
  {
    id: 'random',
    title: 'Random practice',
    description: 'Shuffled order — tests true understanding',
  },
  {
    id: 'spaced',
    title: 'Spaced repetition',
    description: 'Difficult cards first — proven retention boost',
  },
  {
    id: 'quick',
    title: 'Quick review',
    description: 'Rapid-fire revision — perfect for breaks',
  },
];

const StudyModeSelector = ({ open, onOpenChange, onSelectMode }: StudyModeSelectorProps) => {
  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent
        side="bottom"
        className="h-auto max-h-[85vh] overflow-hidden rounded-t-2xl border-t border-white/[0.14] p-0"
      >
        <div className="flex flex-col bg-background">
          <div className="flex justify-center pb-1 pt-3">
            <div className="h-1 w-10 rounded-full bg-white/20" />
          </div>

          <SheetHeader className="px-5 pb-4">
            <SheetTitle className="text-left text-[17px] font-semibold tracking-tight text-white">
              Choose study mode
            </SheetTitle>
          </SheetHeader>

          <div className="space-y-2 px-4 pb-8">
            {studyModes.map((mode) => (
              <button
                key={mode.id}
                type="button"
                onClick={() => onSelectMode(mode.id)}
                className={cn(
                  'flex min-h-[68px] w-full touch-manipulation items-center gap-3 rounded-2xl',
                  'border border-white/[0.14] bg-gradient-to-b from-white/[0.08] to-white/[0.04]',
                  'p-4 text-left transition-colors',
                  'hover:from-white/[0.10] hover:to-white/[0.06] active:scale-[0.98]'
                )}
              >
                <div className="min-w-0 flex-1 space-y-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="text-[14.5px] font-semibold tracking-tight text-white">
                      {mode.title}
                    </span>
                    {mode.recommended && (
                      <span className="rounded-full bg-elec-yellow px-2 py-0.5 text-[10px] font-bold uppercase tracking-[0.16em] text-black">
                        Recommended
                      </span>
                    )}
                  </div>
                  <p className="text-[12.5px] leading-relaxed text-white opacity-80">
                    {mode.description}
                  </p>
                </div>

                <ChevronRight className="h-5 w-5 shrink-0 text-white" />
              </button>
            ))}
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default StudyModeSelector;
