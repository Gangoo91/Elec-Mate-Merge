import React, { useState, useEffect } from 'react';
import { Cloud, CloudOff, CheckCircle2, AlertCircle, Loader2, WifiOff, HardDrive } from 'lucide-react';
import { SyncStatus } from '@/hooks/useCloudSync';
import { cn } from '@/lib/utils';

interface SyncStatusIndicatorProps {
  status: SyncStatus;
  lastSyncTime?: number;
  lastLocalSave?: number;
  isOnline: boolean;
  isAuthenticated: boolean;
  className?: string;
  showLocalStatus?: boolean;
}

export const SyncStatusIndicator: React.FC<SyncStatusIndicatorProps> = ({
  status,
  lastSyncTime,
  lastLocalSave,
  isOnline,
  isAuthenticated,
  className,
  showLocalStatus = true,
}) => {
  // Force re-render every 10 seconds to update "saved X ago" text
  const [, forceUpdate] = useState(0);
  useEffect(() => {
    const interval = setInterval(() => forceUpdate(n => n + 1), 10000);
    return () => clearInterval(interval);
  }, []);

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

  // Get the most recent save time (local or cloud)
  const getLastSaveTime = () => {
    const localTime = lastLocalSave || 0;
    const cloudTime = lastSyncTime || 0;
    return Math.max(localTime, cloudTime);
  };

  const getStatusText = () => {
    // If offline, show local save status
    if (!isOnline) {
      const lastSave = getLastSaveTime();
      if (lastSave) {
        const seconds = Math.floor((Date.now() - lastSave) / 1000);
        if (seconds < 5) return 'Saved just now';
        if (seconds < 60) return `Saved ${seconds}s ago`;
        const minutes = Math.floor(seconds / 60);
        if (minutes < 60) return `Saved ${minutes}m ago`;
      }
      return 'Offline';
    }

    if (!isAuthenticated) {
      return 'Sign in to save';
    }

    // Show more granular timing with seconds for recent saves
    const lastSave = getLastSaveTime();

    switch (status) {
      case 'synced':
        if (lastSave) {
          const seconds = Math.floor((Date.now() - lastSave) / 1000);
          if (seconds < 5) return 'Saved just now';
          if (seconds < 60) return `Saved ${seconds}s ago`;
          const minutes = Math.floor(seconds / 60);
          if (minutes === 1) return 'Saved 1 min ago';
          if (minutes < 60) return `Saved ${minutes} mins ago`;
          return 'Synced';
        }
        return 'Synced';
      case 'syncing':
        return 'Saving...';
      case 'queued':
        // Even when queued, show local save status
        if (lastLocalSave) {
          const seconds = Math.floor((Date.now() - lastLocalSave) / 1000);
          if (seconds < 5) return 'Saved locally';
          if (seconds < 60) return `Saved ${seconds}s ago`;
          const minutes = Math.floor(seconds / 60);
          return `Saved ${minutes}m ago (syncing)`;
        }
        return 'Changes queued';
      case 'error':
        // Still show local save status on error
        if (lastLocalSave) {
          const seconds = Math.floor((Date.now() - lastLocalSave) / 1000);
          if (seconds < 60) return `Saved locally ${seconds}s ago`;
          const minutes = Math.floor(seconds / 60);
          return `Saved locally ${minutes}m ago`;
        }
        return 'Sync error';
      default:
        return 'Synced';
    }
  };

  const getStatusColor = () => {
    if (!isOnline) {
      // Still show green if recently saved locally
      const lastSave = getLastSaveTime();
      if (lastSave && Date.now() - lastSave < 60000) {
        return 'text-green-600';
      }
      return 'text-muted-foreground';
    }

    if (!isAuthenticated) {
      return 'text-muted-foreground';
    }

    switch (status) {
      case 'synced':
        return 'text-green-600';
      case 'syncing':
        return 'text-blue-600';
      case 'queued':
        // Show green if saved locally
        return lastLocalSave ? 'text-green-600' : 'text-amber-600';
      case 'error':
        // Show amber if saved locally (not fully red)
        return lastLocalSave ? 'text-amber-600' : 'text-red-600';
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
