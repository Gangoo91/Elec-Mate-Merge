import React from 'react';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight, CheckCircle2, Download, PoundSterling } from 'lucide-react';

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
  whatsApp?: any;
}

const FireAlarmTabNavigation: React.FC<FireAlarmTabNavigationProps> = ({
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
}) => {
  const progress = getProgressPercentage();
  const isLastTab = currentTabIndex === totalTabs - 1;

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  return (
    <div className="sticky bottom-0 left-0 right-0 bg-background border-t border-white/[0.06] p-4">
      {/* Progress bar */}
      <div className="mb-4">
        <div className="flex items-center justify-between mb-1.5">
          <span className="text-sm text-white">Section {currentTabIndex + 1} of {totalTabs}</span>
          <div className="flex items-center gap-2">
            {isCurrentTabComplete && (
              <div className="flex items-center gap-1 text-green-500 text-sm">
                <CheckCircle2 className="h-4 w-4" />
                <span>Complete</span>
              </div>
            )}
            <span className="text-sm font-medium text-white">{progress}%</span>
          </div>
        </div>
        <div className="h-2 bg-muted rounded-full overflow-hidden">
          <div className="h-full bg-green-500 transition-all duration-300 rounded-full" style={{ width: `${progress}%` }} />
        </div>
      </div>

      {isLastTab ? (
        /* Last tab — full-width stacked buttons */
        <div className="space-y-3">
          <Button onClick={onGenerateCertificate} disabled={!canGenerateCertificate} className="w-full h-14 text-base font-semibold bg-green-600 hover:bg-green-700 touch-manipulation active:scale-[0.98] rounded-xl">
            <Download className="h-5 w-5 mr-2" />
            Download Certificate
          </Button>
          {onCreateInvoice && (
            <Button variant="outline" onClick={onCreateInvoice} className="w-full h-12 text-sm font-medium border-emerald-500/30 text-emerald-400 hover:bg-emerald-500/10 touch-manipulation active:scale-[0.98] rounded-xl">
              <PoundSterling className="h-4 w-4 mr-2" />
              Create Invoice
            </Button>
          )}
          <Button variant="outline" onClick={() => { navigatePrevious(); scrollToTop(); }} disabled={!canNavigatePrevious} className="w-full h-12 text-sm touch-manipulation active:scale-[0.98] rounded-xl">
            <ChevronLeft className="h-4 w-4 mr-2" />
            Previous Section
          </Button>
        </div>
      ) : (
        /* Normal tabs — Previous / Next side by side */
        <div className="flex gap-3">
          <Button variant="outline" onClick={() => { navigatePrevious(); scrollToTop(); }} disabled={!canNavigatePrevious} className="flex-1 h-12 text-sm font-medium touch-manipulation active:scale-[0.98] rounded-xl">
            <ChevronLeft className="h-5 w-5 mr-1" />
            Previous
          </Button>
          <Button onClick={() => { navigateNext(); scrollToTop(); }} disabled={!canNavigateNext} className="flex-1 h-12 text-sm font-medium touch-manipulation active:scale-[0.98] rounded-xl">
            Next
            <ChevronRight className="h-5 w-5 ml-1" />
          </Button>
        </div>
      )}
    </div>
  );
};

export default FireAlarmTabNavigation;
