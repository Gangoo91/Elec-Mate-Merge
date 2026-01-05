
import React from 'react';
import { Badge } from '@/components/ui/badge';
import { CheckCircle, Circle, Save } from 'lucide-react';
import DataSyncIndicator, { SyncStatus } from './DataSyncIndicator';

interface SaveStatusIndicatorProps {
  hasUnsavedChanges: boolean;
  isSaving?: boolean;
  lastSaveTime?: number;
  syncStatus?: SyncStatus;
  showSyncIndicator?: boolean;
}

const SaveStatusIndicator: React.FC<SaveStatusIndicatorProps> = ({
  hasUnsavedChanges,
  isSaving = false,
  lastSaveTime,
  syncStatus = 'synced',
  showSyncIndicator = false
}) => {
  const formatLastSave = (timestamp: number) => {
    const now = Date.now();
    const diff = now - timestamp;
    const minutes = Math.floor(diff / 60000);
    
    if (minutes < 1) return 'just now';
    if (minutes === 1) return '1 minute ago';
    if (minutes < 60) return `${minutes} minutes ago`;
    
    return new Date(timestamp).toLocaleTimeString('en-GB', {
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  if (isSaving) {
    return (
      <Badge variant="secondary" className="flex items-center gap-1">
        <Save className="h-3 w-3 animate-pulse" />
        Saving...
      </Badge>
    );
  }

  if (hasUnsavedChanges) {
    return (
      <div className="flex items-centre gap-2">
        <Badge variant="outline" className="flex items-center gap-1 text-orange-600 border-orange-300">
          <Circle className="h-3 w-3 fill-current" />
          Unsaved changes
        </Badge>
        {showSyncIndicator && <DataSyncIndicator status={syncStatus} lastSyncTime={lastSaveTime} />}
      </div>
    );
  }

  return (
    <div className="flex items-centre gap-2">
      <Badge variant="outline" className="flex items-center gap-1 text-green-600 border-green-300">
        <CheckCircle className="h-3 w-3" />
        {lastSaveTime ? `Saved ${formatLastSave(lastSaveTime)}` : 'All saved'}
      </Badge>
      {showSyncIndicator && <DataSyncIndicator status={syncStatus} lastSyncTime={lastSaveTime} />}
    </div>
  );
};

export default SaveStatusIndicator;
