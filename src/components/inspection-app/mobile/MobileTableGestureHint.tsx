import React, { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { ChevronRight, X } from 'lucide-react';
import { hasSeenGestureHint, markGestureHintSeen } from '@/utils/mobileTableUtils';

interface MobileTableGestureHintProps {
  onDismiss: () => void;
}

export const MobileTableGestureHint: React.FC<MobileTableGestureHintProps> = ({ onDismiss }) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Check if user has already seen the hint
    if (!hasSeenGestureHint()) {
      // Show after a brief delay
      const timer = setTimeout(() => {
        setIsVisible(true);
      }, 500);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleDismiss = () => {
    markGestureHintSeen();
    setIsVisible(false);
    onDismiss();
  };

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4 backdrop-blur-sm animate-in fade-in duration-300">
      <div className="bg-background rounded-lg shadow-2xl p-6 max-w-sm w-full border border-border animate-in slide-in-from-bottom duration-300">
        <div className="flex justify-between items-start mb-4">
          <h3 className="text-lg font-semibold text-foreground">Swipe to Navigate</h3>
          <Button
            variant="ghost"
            size="icon"
            className="h-6 w-6 -mt-1 -mr-1"
            onClick={handleDismiss}
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
        
        <div className="space-y-4">
          <p className="text-sm text-muted-foreground">
            This table is designed for mobile use. Swipe left and right to see all test columns.
          </p>
          
          <div className="flex items-center justify-center py-6 bg-accent/10 rounded-lg">
            <div className="animate-pulse flex items-center gap-2">
              <ChevronRight className="h-8 w-8 text-primary animate-bounce" style={{ animationDirection: 'alternate' }} />
              <span className="text-sm font-medium text-foreground">Swipe horizontally</span>
              <ChevronRight className="h-8 w-8 text-primary animate-bounce" style={{ animationDirection: 'alternate', animationDelay: '0.2s' }} />
            </div>
          </div>

          <div className="space-y-2">
            <p className="text-xs text-muted-foreground">
              💡 <strong>Tip:</strong> Use the navigation buttons at the bottom to quickly jump between sections.
            </p>
          </div>
        </div>

        <Button 
          onClick={handleDismiss}
          className="w-full mt-6"
          size="lg"
        >
          Got it!
        </Button>
      </div>
    </div>
  );
};
