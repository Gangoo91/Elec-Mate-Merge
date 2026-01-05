import React from 'react';
import { Cloud, CloudOff, CheckCircle2, AlertCircle, Loader2, WifiOff } from 'lucide-react';
import { SyncStatus } from '@/hooks/useCloudSync';
import { cn } from '@/lib/utils';

interface SyncStatusIndicatorProps {
  status: SyncStatus;
  lastSyncTime?: number;
  isOnline: boolean;
  isAuthenticated: boolean;
  className?: string;
}

export const SyncStatusIndicator: React.FC<SyncStatusIndicatorProps> = ({
  status,
  lastSyncTime,
  isOnline,
  isAuthenticated,
  className,
}) => {
  const getStatusIcon = () => {
    if (!isOnline) {
      return <WifiOff className="h-4 w-4" />;
    }
    
    if (!isAuthenticated) {
      return <CloudOff className="h-4 w-4" />;
    }

    switch (status) {
      case 'synced':
        return <CheckCircle2 className="h-4 w-4 text-green-600" />;
      case 'syncing':
        return <Loader2 className="h-4 w-4 animate-spin text-blue-600" />;
      case 'queued':
        return <Cloud className="h-4 w-4 text-amber-600" />;
      case 'error':
        return <AlertCircle className="h-4 w-4 text-red-600" />;
      default:
        return <Cloud className="h-4 w-4 text-muted-foreground" />;
    }
  };

  const getStatusText = () => {
    if (!isOnline) {
      return 'Offline';
    }

    if (!isAuthenticated) {
      return 'Sign in to save';
    }

    switch (status) {
      case 'synced':
        if (lastSyncTime) {
          const minutes = Math.floor((Date.now() - lastSyncTime) / 60000);
          if (minutes < 1) return 'Synced just now';
          if (minutes === 1) return 'Synced 1 min ago';
          if (minutes < 60) return `Synced ${minutes} mins ago`;
          return 'Synced';
        }
        return 'Synced';
      case 'syncing':
        return 'Syncing...';
      case 'queued':
        return 'Changes queued';
      case 'error':
        return 'Sync error';
      default:
        return 'Synced';
    }
  };

  const getStatusColor = () => {
    if (!isOnline || !isAuthenticated) {
      return 'text-muted-foreground';
    }

    switch (status) {
      case 'synced':
        return 'text-green-600';
      case 'syncing':
        return 'text-blue-600';
      case 'queued':
        return 'text-amber-600';
      case 'error':
        return 'text-red-600';
      default:
        return 'text-muted-foreground';
    }
  };

  return (
    <div className={cn('flex items-center gap-2', className)}>
      {getStatusIcon()}
      <span className={cn('text-sm font-medium', getStatusColor())}>
        {getStatusText()}
      </span>
    </div>
  );
};
