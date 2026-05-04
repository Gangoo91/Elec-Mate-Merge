import { ChevronRight } from 'lucide-react';
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet';

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
        className="h-auto max-h-[85vh] rounded-t-2xl p-0 border-t border-white/[0.06]"
      >
        <div className="flex flex-col bg-background">
          <div className="flex justify-center pt-3 pb-1">
            <div className="w-10 h-1 rounded-full bg-white/15" />
          </div>

          <SheetHeader className="px-5 pb-4">
            <SheetTitle className="text-white text-[18px] font-semibold">
              Choose study mode
            </SheetTitle>
          </SheetHeader>

          <div className="px-4 pb-6 space-y-2">
            {studyModes.map((mode) => (
              <button
                key={mode.id}
                type="button"
                onClick={() => onSelectMode(mode.id)}
                className="
                  w-full flex items-center gap-3 p-4
                  bg-white/[0.02] border border-white/[0.06] rounded-xl
                  min-h-[64px] touch-manipulation
                  active:scale-[0.98] transition-transform
                  text-left
                "
              >
                <div className="flex-1 min-w-0 space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="font-medium text-white text-[14px]">{mode.title}</span>
                    {mode.recommended && (
                      <span className="text-[10px] px-1.5 py-0.5 rounded bg-elec-yellow/[0.04] text-elec-yellow/85 border border-elec-yellow/20 font-medium uppercase tracking-[0.18em]">
                        Recommended
                      </span>
                    )}
                  </div>
                  <p className="text-[12px] text-white/55">{mode.description}</p>
                </div>

                <ChevronRight className="h-4 w-4 text-white/55 flex-shrink-0" />
              </button>
            ))}
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default StudyModeSelector;
