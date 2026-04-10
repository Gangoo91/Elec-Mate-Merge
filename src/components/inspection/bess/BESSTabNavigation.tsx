import { Button } from '@/components/ui/button';

interface Props {
  currentTabIndex: number;
  totalTabs: number;
  canNavigateNext: boolean;
  canNavigatePrevious: boolean;
  onNext: () => void;
  onPrevious: () => void;
  isCurrentTabComplete: boolean;
  progress: number;
  isLastTab: boolean;
  onGenerate?: () => void;
  isGenerating?: boolean;
}

const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

export default function BESSTabNavigation({
  currentTabIndex, totalTabs, canNavigateNext, canNavigatePrevious,
  onNext, onPrevious, progress, isLastTab,
  onGenerate, isGenerating,
}: Props) {
  const handleNext = () => { onNext(); scrollToTop(); };
  const handlePrevious = () => { onPrevious(); scrollToTop(); };
  return (
    <div className="sticky bottom-0 left-0 right-0 bg-background/95 backdrop-blur-md border-t border-white/[0.08] p-4">
      {/* Progress bar */}
      <div className="mb-3">
        <div className="flex items-center justify-between mb-1.5">
          <span className="text-[10px] text-white">Section {currentTabIndex + 1} of {totalTabs}</span>
          <span className="text-[10px] font-medium text-white">{progress}%</span>
        </div>
        <div className="h-1 bg-white/[0.12] rounded-full overflow-hidden">
          <div className="h-full bg-elec-yellow rounded-full transition-all duration-300" style={{ width: `${progress}%` }} />
        </div>
      </div>

      {/* Navigation */}
      {isLastTab ? (
        <div className="space-y-2">
          <Button
            onClick={onGenerate}
            disabled={isGenerating}
            className="w-full h-11 bg-elec-yellow/20 border border-elec-yellow/40 text-elec-yellow hover:bg-elec-yellow/30 text-xs font-semibold touch-manipulation active:scale-[0.98] rounded-lg"
          >
            {isGenerating ? 'Generating...' : 'Generate Certificate'}
          </Button>
          <div className="flex gap-2">
            <Button
              variant="outline"
              onClick={handlePrevious}
              disabled={!canNavigatePrevious}
              className="flex-1 h-11 border-white/[0.12] text-white hover:bg-white/[0.06] text-xs font-semibold touch-manipulation active:scale-[0.98] rounded-lg"
            >
              Previous
            </Button>
          </div>
        </div>
      ) : (
        <div className="flex gap-2">
          <Button
            variant="outline"
            onClick={handlePrevious}
            disabled={!canNavigatePrevious}
            className="flex-1 h-11 border-white/[0.12] text-white hover:bg-white/[0.06] text-xs font-semibold touch-manipulation active:scale-[0.98] rounded-lg"
          >
            Previous
          </Button>
          <Button
            onClick={handleNext}
            disabled={!canNavigateNext}
            className="flex-1 h-11 bg-elec-yellow/20 border border-elec-yellow/40 text-elec-yellow hover:bg-elec-yellow/30 text-xs font-semibold touch-manipulation active:scale-[0.98] rounded-lg"
          >
            Next
          </Button>
        </div>
      )}
    </div>
  );
}
