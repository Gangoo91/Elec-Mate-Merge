import React from 'react';
import { Button } from '@/components/ui/button';
import { Download, Save } from 'lucide-react';
import { useMobileEnhanced } from '@/hooks/use-mobile-enhanced';
import { cn } from '@/lib/utils';

interface MobileBottomActionBarProps {
  onSave: () => void;
  onDownload: () => void;
  isSaving?: boolean;
  className?: string;
}

export const MobileBottomActionBar: React.FC<MobileBottomActionBarProps> = ({
  onSave,
  onDownload,
  isSaving = false,
  className
}) => {
  const { isMobile } = useMobileEnhanced();

  if (!isMobile) return null;

  return (
    <div className={cn(
      "fixed bottom-0 left-0 right-0 z-50 p-4 bg-gradient-to-t from-elec-grey via-elec-grey to-elec-grey/95 border-t border-elec-yellow/30 backdrop-blur-lg shadow-[0_-4px_20px_rgba(0,0,0,0.4)]",
      className
    )}>
      <div className="flex gap-3 max-w-md mx-auto">
        <Button
          onClick={onSave}
          disabled={isSaving}
          className="flex-1 h-14 text-base font-semibold bg-elec-yellow/10 hover:bg-elec-yellow/20 border border-elec-yellow/40 text-elec-yellow shadow-[0_0_15px_rgba(255,193,7,0.2)]"
        >
          <Save className="h-5 w-5 mr-2" />
          {isSaving ? 'Saving...' : 'Save'}
        </Button>
        <Button
          onClick={onDownload}
          className="flex-1 h-14 text-base font-semibold bg-gradient-to-r from-elec-yellow to-elec-yellow/90 hover:from-elec-yellow/90 hover:to-elec-yellow/80 text-elec-dark border-0 shadow-[0_0_20px_rgba(255,193,7,0.4)]"
        >
          <Download className="h-5 w-5 mr-2" />
          Download
        </Button>
      </div>
    </div>
  );
};
