import React, { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';
import { CheckCircle, RefreshCw, WifiOff, AlertTriangle, X } from 'lucide-react';
import { Button } from '@/components/ui/button';

export type SyncStatus = 'synced' | 'syncing' | 'offline' | 'error';

interface SyncStatusBarProps {
  /** Current sync status */
  status: SyncStatus;
  /** Number of pending changes (for syncing/error states) */
  pendingChanges?: number;
  /** Last successful sync time */
  lastSynced?: Date;
  /** Error message if status is 'error' */
  errorMessage?: string;
  /** Retry handler for error state */
  onRetry?: () => void;
  /** Dismiss handler */
  onDismiss?: () => void;
  /** Additional class names */
  className?: string;
  /** Auto-dismiss synced status after milliseconds (0 = never) */
  autoDismissMs?: number;
  /** Position: top or bottom of screen */
  position?: 'top' | 'bottom';
}

/**
 * Sync status indicator bar
 * Shows save/sync status with visual feedback
 * Best-in-class UX pattern for offline-first apps
 */
export const SyncStatusBar: React.FC<SyncStatusBarProps> = ({
  status,
  pendingChanges = 0,
  lastSynced,
  errorMessage,
  onRetry,
  onDismiss,
  className = '',
  autoDismissMs = 3000,
  position = 'bottom',
}) => {
  const [visible, setVisible] = useState(true);
  const [isDismissed, setIsDismissed] = useState(false);

  // Auto-dismiss synced status
  useEffect(() => {
    if (status === 'synced' && autoDismissMs > 0) {
      const timer = setTimeout(() => {
        setVisible(false);
      }, autoDismissMs);
      return () => clearTimeout(timer);
    }
    setVisible(true);
  }, [status, autoDismissMs]);

  // Reset dismissed state when status changes
  useEffect(() => {
    setIsDismissed(false);
    setVisible(true);
  }, [status]);

  if (!visible || isDismissed) return null;

  const handleDismiss = () => {
    setIsDismissed(true);
    onDismiss?.();
  };

  const config = {
    synced: {
      icon: CheckCircle,
      bgColor: 'bg-green-500/10 border-green-500/20',
      textColor: 'text-green-600 dark:text-green-400',
      iconColor: 'text-green-500',
      message: 'All changes saved',
      showDismiss: true,
    },
    syncing: {
      icon: RefreshCw,
      bgColor: 'bg-blue-500/10 border-blue-500/20',
      textColor: 'text-blue-600 dark:text-blue-400',
      iconColor: 'text-blue-500 animate-spin',
      message: pendingChanges > 0 ? `Syncing ${pendingChanges} changes...` : 'Syncing...',
      showDismiss: false,
    },
    offline: {
      icon: WifiOff,
      bgColor: 'bg-amber-500/10 border-amber-500/20',
      textColor: 'text-amber-600 dark:text-amber-400',
      iconColor: 'text-amber-500',
      message: 'Offline • Draft saved locally',
      showDismiss: false,
    },
    error: {
      icon: AlertTriangle,
      bgColor: 'bg-red-500/10 border-red-500/20',
      textColor: 'text-red-600 dark:text-red-400',
      iconColor: 'text-red-500',
      message: errorMessage || `${pendingChanges} changes failed to sync`,
      showDismiss: true,
    },
  }[status];

  const Icon = config.icon;

  return (
    <div
      className={cn(
        'fixed left-0 right-0 z-40 px-4 transition-all duration-300',
        position === 'top' ? 'top-0 pt-safe' : 'bottom-0 pb-safe',
        className
      )}
    >
      <div
        className={cn(
          'mx-auto max-w-lg flex items-center gap-3 px-4 py-3 rounded-lg border backdrop-blur-sm shadow-lg',
          config.bgColor
        )}
      >
        <Icon className={cn('h-4 w-4 flex-shrink-0', config.iconColor)} />

        <span className={cn('flex-1 text-sm font-medium', config.textColor)}>
          {config.message}
        </span>

        {status === 'offline' && lastSynced && (
          <span className="text-xs text-muted-foreground">
            Will sync when online
          </span>
        )}

        {status === 'error' && onRetry && (
          <Button
            variant="ghost"
            size="sm"
            onClick={onRetry}
            className="h-7 px-2 text-xs"
          >
            Retry
          </Button>
        )}

        {config.showDismiss && (
          <Button
            variant="ghost"
            size="icon"
            onClick={handleDismiss}
            className="h-6 w-6 -mr-1"
          >
            <X className="h-3 w-3" />
            <span className="sr-only">Dismiss</span>
          </Button>
        )}
      </div>
    </div>
  );
};

/**
 * Hook for managing sync status
 */
interface UseSyncStatusOptions {
  onSave: (data: any) => Promise<void>;
  debounceMs?: number;
}

export function useSyncStatus({ onSave, debounceMs = 2000 }: UseSyncStatusOptions) {
  const [status, setStatus] = useState<SyncStatus>('synced');
  const [pendingChanges, setPendingChanges] = useState(0);
  const [lastSynced, setLastSynced] = useState<Date | undefined>();
  const [errorMessage, setErrorMessage] = useState<string | undefined>();

  const [isOnline, setIsOnline] = useState(
    typeof navigator !== 'undefined' ? navigator.onLine : true
  );

  // Monitor online status
  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  // Update status based on online state
  useEffect(() => {
    if (!isOnline && status !== 'error') {
      setStatus('offline');
    } else if (isOnline && status === 'offline') {
      setStatus('synced');
    }
  }, [isOnline, status]);

  // Save function with status management
  const save = async (data: any) => {
    if (!isOnline) {
      setPendingChanges((c) => c + 1);
      setStatus('offline');
      return;
    }

    setStatus('syncing');
    setPendingChanges((c) => c + 1);

    try {
      await onSave(data);
      setStatus('synced');
      setLastSynced(new Date());
      setPendingChanges(0);
      setErrorMessage(undefined);
    } catch (error) {
      setStatus('error');
      setErrorMessage(error instanceof Error ? error.message : 'Save failed');
    }
  };

  const retry = async () => {
    // Re-trigger save for pending changes
    setStatus('syncing');
  };

  return {
    status,
    pendingChanges,
    lastSynced,
    errorMessage,
    save,
    retry,
    isOnline,
  };
}

/**
 * Compact inline sync indicator
 */
export const SyncIndicator: React.FC<{
  status: SyncStatus;
  className?: string;
}> = ({ status, className = '' }) => {
  const config = {
    synced: { color: 'bg-green-500', label: 'Saved' },
    syncing: { color: 'bg-blue-500 animate-pulse', label: 'Saving' },
    offline: { color: 'bg-amber-500', label: 'Offline' },
    error: { color: 'bg-red-500', label: 'Error' },
  }[status];

  return (
    <div className={cn('flex items-center gap-1.5 text-xs text-muted-foreground', className)}>
      <div className={cn('h-2 w-2 rounded-full', config.color)} />
      <span>{config.label}</span>
    </div>
  );
};

export default SyncStatusBar;
