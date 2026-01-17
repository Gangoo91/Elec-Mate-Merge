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
      "fixed bottom-0 left-0 right-0 z-50 bg-[#1a1a1a]/95 backdrop-blur-sm border-t border-white/10",
      className
    )}>
      <div className="flex gap-3 px-4 py-4">
        <Button
          onClick={onSave}
          disabled={isSaving}
          className="flex-1 h-14 text-base font-semibold bg-white/5 hover:bg-white/10 border border-white/10 text-elec-yellow touch-manipulation active:scale-[0.98]"
        >
          <Save className="h-5 w-5 mr-2" />
          {isSaving ? 'Saving...' : 'Save'}
        </Button>
        <Button
          onClick={onDownload}
          className="flex-1 h-14 text-base font-semibold bg-elec-yellow hover:bg-elec-yellow/90 text-black border-0 touch-manipulation active:scale-[0.98]"
        >
          <Download className="h-5 w-5 mr-2" />
          Download
        </Button>
      </div>
    </div>
  );
};
