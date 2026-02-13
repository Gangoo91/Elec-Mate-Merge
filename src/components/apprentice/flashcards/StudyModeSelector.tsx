import { Target, Zap, Brain, RotateCcw, ChevronRight, Sparkles } from 'lucide-react';
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet';

interface StudyModeSelectorProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSelectMode: (mode: string) => void;
}

const studyModes = [
  {
    id: 'sequential',
    title: 'Sequential Study',
    description: 'Cards in order — best for first-time learning',
    icon: Target,
    recommended: true,
    colour: 'text-green-400',
    iconBg: 'bg-green-500/10 border-green-500/20',
  },
  {
    id: 'random',
    title: 'Random Practice',
    description: 'Shuffled order — tests true understanding',
    icon: Zap,
    colour: 'text-elec-yellow',
    iconBg: 'bg-elec-yellow/10 border-elec-yellow/20',
  },
  {
    id: 'spaced',
    title: 'Spaced Repetition',
    description: 'Difficult cards first — proven retention boost',
    icon: Brain,
    colour: 'text-purple-400',
    iconBg: 'bg-purple-500/10 border-purple-500/20',
  },
  {
    id: 'quick',
    title: 'Quick Review',
    description: 'Rapid-fire revision — perfect for breaks',
    icon: RotateCcw,
    colour: 'text-blue-400',
    iconBg: 'bg-blue-500/10 border-blue-500/20',
  },
];

const StudyModeSelector = ({ open, onOpenChange, onSelectMode }: StudyModeSelectorProps) => {
  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent
        side="bottom"
        className="h-auto max-h-[85vh] rounded-t-2xl p-0 border-t border-white/10"
      >
        <div className="flex flex-col bg-background">
          {/* Drag handle */}
          <div className="flex justify-center pt-3 pb-1">
            <div className="w-10 h-1 rounded-full bg-white/20" />
          </div>

          <SheetHeader className="px-5 pb-4">
            <SheetTitle className="text-white text-lg flex items-center gap-2">
              <Sparkles className="h-5 w-5 text-elec-yellow" />
              Choose Study Mode
            </SheetTitle>
          </SheetHeader>

          {/* Mode list */}
          <div className="px-4 pb-6 space-y-2">
            {studyModes.map((mode) => {
              const ModeIcon = mode.icon;
              return (
                <button
                  key={mode.id}
                  type="button"
                  onClick={() => onSelectMode(mode.id)}
                  className="
                    w-full flex items-center gap-3 p-4
                    bg-white/5 border border-white/10 rounded-xl
                    min-h-[64px] touch-manipulation
                    active:scale-[0.98] transition-transform
                    text-left
                  "
                >
                  <div className={`p-2.5 rounded-xl border flex-shrink-0 ${mode.iconBg}`}>
                    <ModeIcon className={`h-5 w-5 ${mode.colour}`} />
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="font-semibold text-white text-sm">{mode.title}</span>
                      {mode.recommended && (
                        <span className="text-[10px] px-1.5 py-0.5 rounded bg-green-500/20 text-green-400 border border-green-500/30 font-medium">
                          Recommended
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-white mt-0.5">{mode.description}</p>
                  </div>

                  <ChevronRight className="h-4 w-4 text-white flex-shrink-0" />
                </button>
              );
            })}
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default StudyModeSelector;
