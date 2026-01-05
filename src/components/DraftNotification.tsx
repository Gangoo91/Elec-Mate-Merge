import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { FileText, Clock, X, CheckCircle } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';

interface DraftNotificationProps {
  isVisible: boolean;
  onClose: () => void;
  onLoadDraft: () => void;
  onStartNew: () => void;
  draftTimestamp: number;
}

const DraftNotification: React.FC<DraftNotificationProps> = ({
  isVisible,
  onClose,
  onLoadDraft,
  onStartNew,
  draftTimestamp
}) => {
  const isMobile = useIsMobile();
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    if (isVisible) {
      setIsAnimating(true);
    }
  }, [isVisible]);

  const formatDate = (timestamp: number) => {
    return new Date(timestamp).toLocaleString('en-GB', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const handleClose = () => {
    setIsAnimating(false);
    setTimeout(onClose, 200);
  };

  const handleLoadDraft = () => {
    onLoadDraft();
    handleClose();
  };

  const handleStartNew = () => {
    onStartNew();
    handleClose();
  };

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 z-50 pointer-events-none">
      {/* Backdrop */}
      <div 
        className={`absolute inset-0 bg-black/20 transition-opacity duration-300 pointer-events-auto ${
          isAnimating ? 'opacity-100' : 'opacity-0'
        }`}
        onClick={handleClose}
      />
      
      {/* Notification */}
      <div className={`absolute ${isMobile ? 'top-4 left-4 right-4' : 'top-6 right-6 w-96'} pointer-events-auto`}>
        <Card className={`
          p-4 border-2 border-elec-yellow/30 bg-card/95 backdrop-blur-sm shadow-xl
          transform transition-all duration-300 ease-out
          ${isAnimating ? 'translate-y-0 opacity-100 scale-100' : '-translate-y-4 opacity-0 scale-95'}
        `}>
          {/* Header */}
          <div className="flex items-start justify-between mb-3">
            <div className="flex items-center gap-2">
              <div className="p-1.5 rounded-lg bg-elec-yellow/20">
                <FileText className="h-4 w-4 text-elec-yellow" />
              </div>
              <div>
                <h3 className="font-semibold text-foreground">Draft Found</h3>
                <div className="flex items-center gap-1 text-xs text-muted-foreground">
                  <Clock className="h-3 w-3" />
                  <span>{formatDate(draftTimestamp)}</span>
                </div>
              </div>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={handleClose}
              className="h-8 w-8 p-0 text-muted-foreground hover:text-foreground"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>

          {/* Content */}
          <p className="text-sm text-muted-foreground mb-4">
            Continue with your saved EICR work or start fresh. Your draft will remain available in save points.
          </p>

          {/* Actions */}
          <div className={`flex gap-2 ${isMobile ? 'flex-col' : 'flex-row'}`}>
            <Button
              variant="outline"
              size="sm"
              onClick={handleStartNew}
              className="flex-1 border-elec-yellow/30 hover:bg-elec-yellow/10"
            >
              Start New
            </Button>
            <Button
              size="sm"
              onClick={handleLoadDraft}
              className="flex-1 bg-elec-yellow text-black hover:bg-elec-yellow/90 font-medium"
            >
              <CheckCircle className="h-3 w-3 mr-1" />
              Continue Draft
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default DraftNotification;