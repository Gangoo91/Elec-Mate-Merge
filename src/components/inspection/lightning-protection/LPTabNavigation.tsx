import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight, CheckCircle2, Download } from 'lucide-react';

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

export default function LPTabNavigation({
  currentTabIndex, totalTabs, canNavigateNext, canNavigatePrevious,
  onNext, onPrevious, isCurrentTabComplete, progress, isLastTab,
  onGenerate, isGenerating,
}: Props) {
  return (
    <div className="sticky bottom-0 left-0 right-0 bg-[#242428] border-t border-border p-3 sm:p-4">
      {/* Progress bar */}
      <div className="mb-3">
        <div className="flex items-center justify-between mb-1">
          <span className="text-sm text-white">Section {currentTabIndex + 1} of {totalTabs}</span>
          <div className="flex items-center gap-2">
            {isCurrentTabComplete && (
              <div className="flex items-center gap-1 text-green-500 text-xs">
                <CheckCircle2 className="h-3.5 w-3.5" />
                <span>Complete</span>
              </div>
            )}
            <span className="text-sm font-medium text-white">{progress}% complete</span>
          </div>
        </div>
        <div className="h-2 bg-muted rounded-full overflow-hidden">
          <div className="h-full bg-green-500 transition-all duration-300 rounded-full" style={{ width: `${progress}%` }} />
        </div>
      </div>

      {/* Navigation — flex-1 on both buttons so they share space equally */}
      <div className="flex items-center gap-2">
        <Button
          variant="outline"
          onClick={onPrevious}
          disabled={!canNavigatePrevious}
          className="flex-1 h-12 touch-manipulation active:scale-[0.98]"
        >
          <ChevronLeft className="h-5 w-5 mr-1 shrink-0" />
          Previous
        </Button>

        {isLastTab ? (
          <Button
            onClick={onGenerate}
            disabled={isGenerating}
            className="flex-1 h-12 bg-green-600 hover:bg-green-700 touch-manipulation active:scale-[0.98]"
          >
            <Download className="h-4 w-4 mr-2 shrink-0" />
            <span className="truncate">{isGenerating ? 'Generating…' : 'Generate Certificate'}</span>
          </Button>
        ) : (
          <Button
            onClick={onNext}
            disabled={!canNavigateNext}
            className="flex-1 h-12 touch-manipulation active:scale-[0.98]"
          >
            Next
            <ChevronRight className="h-5 w-5 ml-1 shrink-0" />
          </Button>
        )}
      </div>
    </div>
  );
}
