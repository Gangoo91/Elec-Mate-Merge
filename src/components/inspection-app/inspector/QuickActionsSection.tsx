
import React from 'react';
import { Button } from '@/components/ui/button';
import { Copy, RefreshCw, User } from 'lucide-react';

interface QuickActionsSectionProps {
  formData: any;
  onAutoFillDate: () => void;
  onCopyFromClient: () => void;
  onReloadProfile?: () => void;
}

const QuickActionsSection = ({ 
  formData, 
  onAutoFillDate, 
  onCopyFromClient,
  onReloadProfile
}: QuickActionsSectionProps) => {
  return (
    <>
      {/* Quick Actions */}
      <div className="flex flex-wrap gap-3 pt-4 border-t border-border">
        <Button
          variant="outline"
          size="sm"
          onClick={onAutoFillDate}
          className="border-border text-gray-300 hover:bg-muted"
        >
          <RefreshCw className="h-3 w-3 mr-2" />
          Today's Date
        </Button>
        {formData.clientName && (
          <Button
            variant="outline"
            size="sm"
            onClick={onCopyFromClient}
            className="border-border text-gray-300 hover:bg-muted"
          >
            <Copy className="h-3 w-3 mr-2" />
            Copy Client Name
          </Button>
        )}
        {onReloadProfile && (
          <Button
            variant="outline"
            size="sm"
            onClick={onReloadProfile}
            className="border-border text-gray-300 hover:bg-muted"
          >
            <User className="h-3 w-3 mr-2" />
            Reload Profile
          </Button>
        )}
      </div>

    </>
  );
};

export default QuickActionsSection;
