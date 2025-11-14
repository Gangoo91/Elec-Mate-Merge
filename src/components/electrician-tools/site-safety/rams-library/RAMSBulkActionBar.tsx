import { Trash2, Download, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { MobileButton } from '@/components/ui/mobile-button';

interface RAMSBulkActionBarProps {
  selectedCount: number;
  onBulkDelete: () => void;
  onClearSelection: () => void;
  isDeleting: boolean;
}

export const RAMSBulkActionBar = ({
  selectedCount,
  onBulkDelete,
  onClearSelection,
  isDeleting,
}: RAMSBulkActionBarProps) => {
  if (selectedCount === 0) return null;

  return (
    <>
      {/* Desktop Version */}
      <div className="hidden sm:flex items-center justify-between gap-4 p-4 bg-accent/50 border border-border rounded-lg">
        <div className="flex items-center gap-2">
          <span className="text-sm font-medium">
            {selectedCount} document{selectedCount !== 1 ? 's' : ''} selected
          </span>
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={onClearSelection}
          >
            <X className="h-4 w-4 mr-2" />
            Clear Selection
          </Button>
          <Button
            variant="destructive"
            size="sm"
            onClick={onBulkDelete}
            disabled={isDeleting}
          >
            <Trash2 className="h-4 w-4 mr-2" />
            Delete Selected
          </Button>
        </div>
      </div>

      {/* Mobile Version - Sticky Bottom */}
      <div className="sm:hidden fixed bottom-0 left-0 right-0 z-50 bg-background border-t border-border p-4 shadow-lg">
        <div className="flex flex-col gap-3">
          <div className="text-center text-sm font-medium">
            {selectedCount} selected
          </div>
          <div className="flex gap-2">
            <MobileButton
              variant="outline"
              size="wide"
              onClick={onClearSelection}
              className="flex-1"
            >
              <X className="h-5 w-5 mr-2" />
              Clear
            </MobileButton>
            <MobileButton
              variant="destructive"
              size="wide"
              onClick={onBulkDelete}
              loading={isDeleting}
              className="flex-1"
            >
              <Trash2 className="h-5 w-5 mr-2" />
              Delete All
            </MobileButton>
          </div>
        </div>
      </div>
    </>
  );
};
