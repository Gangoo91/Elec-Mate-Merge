import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight, CheckCircle2, Mail, PoundSterling, Download } from 'lucide-react';

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

export default function BESSTabNavigation({
  currentTabIndex, totalTabs, canNavigateNext, canNavigatePrevious,
  onNext, onPrevious, isCurrentTabComplete, progress, isLastTab,
  onGenerate, isGenerating,
}: Props) {
  return (
    <div className="sticky bottom-0 left-0 right-0 bg-[#242428] border-t border-border p-3 sm:p-6">
      {/* Progress bar */}
      <div className="mb-3">
        <div className="flex items-center justify-between mb-1">
          <span className="text-sm text-white">Section {currentTabIndex + 1} of {totalTabs}</span>
          <span className="text-sm font-medium text-white">{progress}% complete</span>
        </div>
        <div className="h-2 bg-muted rounded-full overflow-hidden">
          <div className="h-full bg-green-500 transition-all duration-300 rounded-full" style={{ width: `${progress}%` }} />
        </div>
      </div>

      {/* Navigation */}
      <div className="flex items-center justify-between gap-3">
        <Button variant="outline" onClick={onPrevious} disabled={!canNavigatePrevious} className="h-12 px-6 touch-manipulation active:scale-[0.98]">
          <ChevronLeft className="h-5 w-5 mr-2" />
          Previous
        </Button>

        {isCurrentTabComplete && (
          <div className="flex items-center gap-1 text-green-500 text-sm">
            <CheckCircle2 className="h-4 w-4" />
            <span className="hidden sm:inline">Complete</span>
          </div>
        )}

        {isLastTab ? (
          <div className="flex items-center gap-2">
            <Button onClick={onGenerate} disabled={isGenerating} className="bg-green-600 hover:bg-green-700 h-12 px-6 touch-manipulation active:scale-[0.98]">
              <Download className="h-4 w-4 mr-2" />
              {isGenerating ? 'Generating...' : 'Generate Certificate'}
            </Button>
          </div>
        ) : (
          <Button onClick={onNext} disabled={!canNavigateNext} className="h-12 px-6 touch-manipulation active:scale-[0.98]">
            Next
            <ChevronRight className="h-5 w-5 ml-2" />
          </Button>
        )}
      </div>
    </div>
  );
}
