import React from 'react';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight, CheckCircle2 } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useIsMobile } from '@/hooks/use-mobile';
import { WhatsAppShareButton } from '@/components/ui/WhatsAppShareButton';

interface MWTabNavigationProps {
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

const MWTabNavigation: React.FC<MWTabNavigationProps> = ({
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

  return (
    <div className={cn(
      "fixed bottom-0 left-0 right-0 bg-[#1a1a1c]/95 backdrop-blur-sm border-t border-white/10 z-50",
      isMobile ? "px-3 py-2 pb-[calc(0.5rem+env(safe-area-inset-bottom))]" : "px-4 py-3"
    )}>
      <div className={cn(isMobile ? "" : "max-w-5xl mx-auto")}>
        {/* Compact progress + navigation row */}
        <div className="flex items-center gap-3">
          {/* Back button */}
          <Button
            variant="ghost"
            size="sm"
            onClick={navigatePrevious}
            disabled={!canNavigatePrevious}
            className="h-10 px-3 touch-manipulation text-muted-foreground hover:text-foreground"
          >
            <ChevronLeft className="h-5 w-5" />
            <span className="sr-only sm:not-sr-only sm:ml-1">Back</span>
          </Button>

          {/* Center: Progress indicator */}
          <div className="flex-1 flex flex-col items-center gap-1">
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <span>{currentTabIndex + 1}/{totalTabs}</span>
              {isCurrentTabComplete && (
                <CheckCircle2 className="h-3.5 w-3.5 text-green-500" />
              )}
              <span className="text-foreground font-medium">{progress}%</span>
            </div>
            <div className="w-full max-w-[200px] h-1 bg-white/10 rounded-full overflow-hidden">
              <div
                className="h-full bg-elec-yellow transition-all duration-300"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>

          {/* Next/Generate button */}
          {isLastTab ? (
            <div className="flex items-center gap-2">
              <Button
                onClick={onGenerateCertificate}
                disabled={!canGenerateCertificate}
                size="sm"
                className="h-10 px-4 touch-manipulation bg-green-600 hover:bg-green-700 text-white font-medium"
              >
                Generate
              </Button>
              {whatsApp && (
                <WhatsAppShareButton
                  type={whatsApp.type}
                  id={whatsApp.id}
                  recipientPhone={whatsApp.recipientPhone}
                  recipientName={whatsApp.recipientName}
                  documentLabel={whatsApp.documentLabel}
                  variant="ghost"
                  className="h-10 w-10 touch-manipulation active:scale-[0.98] transition-transform flex-shrink-0"
                />
              )}
            </div>
          ) : (
            <Button
              onClick={navigateNext}
              disabled={!canNavigateNext}
              size="sm"
              className="h-10 px-4 touch-manipulation bg-elec-yellow hover:bg-elec-yellow/90 text-black font-medium"
            >
              <span>Next</span>
              <ChevronRight className="h-5 w-5 ml-1" />
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default MWTabNavigation;
