import React from 'react';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight, CheckCircle2, PoundSterling, Mail, Download } from 'lucide-react';
import { cn } from '@/lib/utils';

interface FireAlarmTabNavigationProps {
  currentTab: string;
  currentTabIndex: number;
  totalTabs: number;
  canNavigateNext: boolean;
  canNavigatePrevious: boolean;
  navigateNext: () => void;
  navigatePrevious: () => void;
  getProgressPercentage: () => number;
  isCurrentTabComplete: boolean;
  onGenerateCertificate?: () => void;
  canGenerateCertificate?: boolean;
  onCreateInvoice?: () => void;
  onOpenEmailDialog?: () => void;
  canEmail?: boolean;
}

const FireAlarmTabNavigation: React.FC<FireAlarmTabNavigationProps> = ({
  currentTab,
  currentTabIndex,
  totalTabs,
  canNavigateNext,
  canNavigatePrevious,
  navigateNext,
  navigatePrevious,
  getProgressPercentage,
  isCurrentTabComplete,
  onGenerateCertificate,
  canGenerateCertificate = true,
  onCreateInvoice,
  onOpenEmailDialog,
  canEmail = false,
}) => {
  const progress = getProgressPercentage();
  const isLastTab = currentTabIndex === totalTabs - 1;

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });
  const handleNavigateNext = () => { navigateNext(); scrollToTop(); };
  const handleNavigatePrevious = () => { navigatePrevious(); scrollToTop(); };

  return (
    <div className="sticky bottom-0 left-0 right-0 bg-[#242428] border-t border-border p-3 sm:p-4">
      {/* Progress bar — Complete badge lives here, not between the buttons */}
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
          <div className="h-full bg-red-500 transition-all duration-300" style={{ width: `${progress}%` }} />
        </div>
      </div>

      {/* Navigation — Previous is fixed-width, Generate fills remaining space */}
      <div className="flex items-center gap-2">
        <Button
          variant="outline"
          onClick={handleNavigatePrevious}
          disabled={!canNavigatePrevious}
          className="shrink-0 h-12 px-4 touch-manipulation active:scale-[0.98] transition-transform"
        >
          <ChevronLeft className="h-5 w-5 mr-1 shrink-0" />
          Previous
        </Button>

        {isLastTab ? (
          <>
            {/* Icon-only action buttons — fixed size, don't shrink */}
            {onOpenEmailDialog && (
              <Button
                variant="outline"
                size="icon"
                onClick={onOpenEmailDialog}
                disabled={!canEmail}
                className="shrink-0 h-12 w-12 touch-manipulation bg-blue-500/10 border-blue-500/30 hover:bg-blue-500/20 text-blue-400 active:scale-[0.98] transition-transform"
                aria-label="Email certificate"
              >
                <Mail className="h-5 w-5" />
              </Button>
            )}
            {onCreateInvoice && (
              <Button
                variant="outline"
                size="icon"
                onClick={onCreateInvoice}
                className="shrink-0 h-12 w-12 touch-manipulation bg-emerald-500/10 border-emerald-500/30 hover:bg-emerald-500/20 text-emerald-400 active:scale-[0.98] transition-transform"
                aria-label="Create invoice"
              >
                <PoundSterling className="h-5 w-5" />
              </Button>
            )}
            {/* Generate fills all remaining space */}
            <Button
              onClick={onGenerateCertificate}
              disabled={!canGenerateCertificate}
              className="flex-1 h-12 min-w-0 bg-green-600 hover:bg-green-700 touch-manipulation active:scale-[0.98] transition-transform"
            >
              <Download className="h-4 w-4 mr-2 shrink-0" />
              <span className="truncate">Generate Certificate</span>
            </Button>
          </>
        ) : (
          <Button
            onClick={handleNavigateNext}
            disabled={!canNavigateNext}
            className="flex-1 h-12 touch-manipulation active:scale-[0.98] transition-transform"
          >
            Next
            <ChevronRight className="h-5 w-5 ml-1 shrink-0" />
          </Button>
        )}
      </div>
    </div>
  );
};

export default FireAlarmTabNavigation;
