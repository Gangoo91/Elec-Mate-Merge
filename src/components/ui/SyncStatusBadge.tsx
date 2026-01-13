// SyncStatusBadge - Best-in-Class Visual Status Indicator
// Clear, informative status that electricians can understand at a glance

import React from 'react';
import { Badge } from '@/components/ui/badge';
import { AlertCircle, Check, Cloud, CloudOff, Loader2, WifiOff } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';
import { SyncStatus } from '@/hooks/useReportSync';

interface SyncStatusBadgeProps {
  status: SyncStatus;
  isOnline: boolean;
  compact?: boolean;
}

export const SyncStatusBadge: React.FC<SyncStatusBadgeProps> = ({
  status,
  isOnline,
  compact = false,
}) => {
  // Offline - show prominently
  if (!isOnline) {
    return (
      <Badge variant="outline" className="text-orange-500 border-orange-500/30 bg-orange-500/10">
        <WifiOff className="w-3 h-3 mr-1.5" />
        {!compact && 'Offline'}
        {status.queuedChanges > 0 && (
          <span className="ml-1 text-xs">({status.queuedChanges} queued)</span>
        )}
      </Badge>
    );
  }

  // Currently saving/syncing
  if (status.cloud === 'syncing' || status.local === 'saving') {
    return (
      <Badge variant="outline" className="text-yellow-500 border-yellow-500/30 bg-yellow-500/10">
        <Loader2 className="w-3 h-3 mr-1.5 animate-spin" />
        {!compact && 'Saving...'}
      </Badge>
    );
  }

  // Error state
  if (status.cloud === 'error') {
    return (
      <Badge variant="destructive" className="bg-red-500/10 text-red-500 border-red-500/30">
        <AlertCircle className="w-3 h-3 mr-1.5" />
        {!compact && 'Sync error'}
      </Badge>
    );
  }

  // Queued (offline changes waiting)
  if (status.cloud === 'queued' && status.queuedChanges > 0) {
    return (
      <Badge variant="outline" className="text-amber-500 border-amber-500/30 bg-amber-500/10">
        <Cloud className="w-3 h-3 mr-1.5" />
        {!compact && `${status.queuedChanges} queued`}
      </Badge>
    );
  }

  // All synced - green check
  if (status.cloud === 'synced' && status.local === 'saved') {
    return (
      <Badge variant="outline" className="text-green-500 border-green-500/30 bg-green-500/10">
        <Check className="w-3 h-3 mr-1.5" />
        {!compact && (
          <>
            Saved
            {status.lastCloudSync && (
              <span className="ml-1 text-xs opacity-70">
                {formatDistanceToNow(status.lastCloudSync, { addSuffix: true })}
              </span>
            )}
          </>
        )}
      </Badge>
    );
  }

  // Saved locally but not yet synced
  if (status.local === 'saved' && status.cloud !== 'synced') {
    return (
      <Badge variant="outline" className="text-blue-500 border-blue-500/30 bg-blue-500/10">
        <Cloud className="w-3 h-3 mr-1.5" />
        {!compact && 'Saved locally'}
      </Badge>
    );
  }

  // Default - unsaved changes
  return (
    <Badge variant="outline" className="text-muted-foreground border-muted-foreground/30">
      {!compact && 'Unsaved'}
    </Badge>
  );
};

// Simpler status dot for very compact displays
export const SyncStatusDot: React.FC<{ status: SyncStatus; isOnline: boolean }> = ({
  status,
  isOnline,
}) => {
  let colorClass = 'bg-gray-400';
  let animate = false;

  if (!isOnline) {
    colorClass = 'bg-orange-500';
  } else if (status.cloud === 'syncing' || status.local === 'saving') {
    colorClass = 'bg-yellow-500';
    animate = true;
  } else if (status.cloud === 'error') {
    colorClass = 'bg-red-500';
  } else if (status.cloud === 'queued' && status.queuedChanges > 0) {
    colorClass = 'bg-amber-500';
  } else if (status.cloud === 'synced' && status.local === 'saved') {
    colorClass = 'bg-green-500';
  } else if (status.local === 'saved') {
    colorClass = 'bg-blue-500';
  }

  return (
    <div
      className={`w-2 h-2 rounded-full ${colorClass} ${animate ? 'animate-pulse' : ''}`}
      title={
        !isOnline ? 'Offline' :
        status.cloud === 'synced' ? 'Saved' :
        status.cloud === 'syncing' ? 'Saving...' :
        status.cloud === 'queued' ? `${status.queuedChanges} changes queued` :
        status.cloud === 'error' ? 'Sync error' :
        'Unsaved'
      }
    />
  );
};

export default SyncStatusBadge;
