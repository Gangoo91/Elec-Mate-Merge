import React from 'react';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight, CheckCircle2, PoundSterling } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useIsMobile } from '@/hooks/use-mobile';
import { WhatsAppShareButton } from '@/components/ui/WhatsAppShareButton';

interface PATTestingTabNavigationProps {
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
  whatsApp?: {
    type: string;
    id: string;
    recipientPhone: string;
    recipientName: string;
    documentLabel: string;
  };
}

const PATTestingTabNavigation: React.FC<PATTestingTabNavigationProps> = ({
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
  whatsApp,
}) => {
  const isMobile = useIsMobile();
  const progress = getProgressPercentage();
  const isLastTab = currentTabIndex === totalTabs - 1;

  return (
    <div
      className={cn(
        'sticky bottom-0 left-0 right-0 bg-[#242428] border-t border-border',
        isMobile ? 'p-3 mt-2' : 'p-4 mt-6'
      )}
    >
      <div className={cn(isMobile ? '' : 'max-w-6xl mx-auto')}>
        {/* Progress bar */}
        <div className="mb-3">
          <div className="flex items-center justify-between mb-1">
            <span className="text-sm text-white">
              Section {currentTabIndex + 1} of {totalTabs}
            </span>
            <span className="text-sm font-medium text-white">{progress}% complete</span>
          </div>
          <div className="h-2 bg-white/[0.06] rounded-full overflow-hidden">
            <div
              className="h-full bg-blue-500 transition-all duration-300"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        {/* Navigation buttons */}
        <div className="flex items-center justify-between gap-3">
          <Button
            variant="outline"
            onClick={navigatePrevious}
            disabled={!canNavigatePrevious}
            className="h-12 px-6 touch-manipulation"
          >
            <ChevronLeft className="h-5 w-5 mr-2" />
            Previous
          </Button>

          <div className="flex items-center gap-2">
            {isCurrentTabComplete && (
              <div className="flex items-center gap-1 text-green-400 text-sm">
                <CheckCircle2 className="h-4 w-4" />
                <span className="hidden sm:inline">Complete</span>
              </div>
            )}
          </div>

          {isLastTab ? (
            <div className="flex items-center gap-2">
              {whatsApp && (
                <WhatsAppShareButton
                  type={whatsApp.type as any}
                  id={whatsApp.id}
                  recipientPhone={whatsApp.recipientPhone}
                  recipientName={whatsApp.recipientName}
                  documentLabel={whatsApp.documentLabel}
                  variant="ghost"
                  className="h-11 w-11 touch-manipulation active:scale-[0.98] transition-transform"
                />
              )}
              {onCreateInvoice && (
                <Button
                  variant="outline"
                  size="icon"
                  onClick={onCreateInvoice}
                  className="h-11 w-11 touch-manipulation bg-emerald-500/10 border-emerald-500/30 hover:bg-emerald-500/20 text-emerald-400 active:scale-[0.98] transition-transform"
                  aria-label="Create invoice"
                >
                  <PoundSterling className="h-5 w-5" />
                </Button>
              )}
              <Button
                onClick={onGenerateCertificate}
                disabled={!canGenerateCertificate}
                className="h-12 px-6 touch-manipulation bg-blue-600 hover:bg-blue-700"
              >
                Generate Certificate
              </Button>
            </div>
          ) : (
            <Button
              onClick={navigateNext}
              disabled={!canNavigateNext}
              className="h-12 px-6 touch-manipulation"
            >
              Next
              <ChevronRight className="h-5 w-5 ml-2" />
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default PATTestingTabNavigation;
