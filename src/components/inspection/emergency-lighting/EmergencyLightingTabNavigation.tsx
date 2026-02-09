import React from 'react';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight, CheckCircle2 } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useIsMobile } from '@/hooks/use-mobile';
import { WhatsAppShareButton } from '@/components/ui/WhatsAppShareButton';

interface EmergencyLightingTabNavigationProps {
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
  whatsApp?: {
    type: string;
    id: string;
    recipientPhone: string;
    recipientName: string;
    documentLabel: string;
  };
}

const EmergencyLightingTabNavigation: React.FC<EmergencyLightingTabNavigationProps> = ({
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
  whatsApp,
}) => {
  const isMobile = useIsMobile();
  const progress = getProgressPercentage();
  const isLastTab = currentTabIndex === totalTabs - 1;

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleNavigateNext = () => {
    navigateNext();
    scrollToTop();
  };

  const handleNavigatePrevious = () => {
    navigatePrevious();
    scrollToTop();
  };

  return (
    <div className={cn(
      "sticky bottom-0 left-0 right-0 bg-[#242428] border-t border-border",
      isMobile ? "p-3 mt-2" : "p-4 mt-6"
    )}>
      <div className={cn(isMobile ? "" : "max-w-5xl mx-auto")}>
        {/* Progress bar */}
        <div className="mb-3">
          <div className="flex items-center justify-between mb-1">
            <span className="text-sm text-muted-foreground">
              Section {currentTabIndex + 1} of {totalTabs}
            </span>
            <span className="text-sm font-medium text-foreground">{progress}% complete</span>
          </div>
          <div className="h-2 bg-muted rounded-full overflow-hidden">
            <div
              className="h-full bg-amber-500 transition-all duration-300"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        {/* Navigation buttons */}
        <div className="flex items-center justify-between gap-3">
          <Button
            variant="outline"
            onClick={handleNavigatePrevious}
            disabled={!canNavigatePrevious}
            className={cn(
              "touch-manipulation border-white/30",
              isMobile ? "h-11 px-4" : "h-12 px-6"
            )}
          >
            <ChevronLeft className="h-5 w-5 mr-2" />
            Previous
          </Button>

          <div className="flex items-center gap-2">
            {isCurrentTabComplete && (
              <div className="flex items-center gap-1 text-green-500 text-sm">
                <CheckCircle2 className="h-4 w-4" />
                <span className="hidden sm:inline">Section complete</span>
              </div>
            )}
          </div>

          {isLastTab ? (
            <div className="flex items-center gap-2">
              <Button
                onClick={onGenerateCertificate}
                disabled={!canGenerateCertificate}
                className={cn(
                  "touch-manipulation bg-green-600 hover:bg-green-700 active:scale-[0.98] transition-transform flex-1",
                  isMobile ? "h-11" : "h-12 px-6"
                )}
              >
                Generate Certificate
              </Button>
              {whatsApp && (
                <WhatsAppShareButton
                  type={whatsApp.type}
                  id={whatsApp.id}
                  recipientPhone={whatsApp.recipientPhone}
                  recipientName={whatsApp.recipientName}
                  documentLabel={whatsApp.documentLabel}
                  variant="ghost"
                  className="h-11 w-11 touch-manipulation active:scale-[0.98] transition-transform flex-shrink-0"
                />
              )}
            </div>
          ) : (
            <Button
              onClick={handleNavigateNext}
              disabled={!canNavigateNext}
              className={cn(
                "touch-manipulation active:scale-[0.98] transition-transform",
                isMobile ? "h-11 px-4" : "h-12 px-6"
              )}
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

export default EmergencyLightingTabNavigation;
