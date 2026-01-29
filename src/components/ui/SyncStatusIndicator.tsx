/**
 * Prominent Sync Status Indicator
 * Shows users exactly what's happening with their data - no mystery, no panic
 *
 * PHILOSOPHY: Users should ALWAYS know if their data is safe
 */

import { useState, useEffect } from 'react';
import { Cloud, CloudOff, Check, Loader2, AlertTriangle, RefreshCw } from 'lucide-react';
import { cn } from '@/lib/utils';
import { motion, AnimatePresence } from 'framer-motion';

export type SyncState = 'synced' | 'syncing' | 'saving' | 'offline' | 'error' | 'unsaved';

interface SyncStatusIndicatorProps {
  state: SyncState;
  lastSaved?: Date | null;
  lastSynced?: Date | null;
  errorMessage?: string;
  onRetry?: () => void;
  className?: string;
  variant?: 'compact' | 'full' | 'minimal';
  showLastSaved?: boolean;
}

const stateConfig: Record<SyncState, {
  icon: typeof Cloud;
  label: string;
  color: string;
  bgColor: string;
  pulse: boolean;
}> = {
  synced: {
    icon: Check,
    label: 'Saved',
    color: 'text-green-400',
    bgColor: 'bg-green-500/10 border-green-500/20',
    pulse: false,
  },
  syncing: {
    icon: Loader2,
    label: 'Saving...',
    color: 'text-blue-400',
    bgColor: 'bg-blue-500/10 border-blue-500/20',
    pulse: true,
  },
  saving: {
    icon: Loader2,
    label: 'Saving...',
    color: 'text-blue-400',
    bgColor: 'bg-blue-500/10 border-blue-500/20',
    pulse: true,
  },
  offline: {
    icon: CloudOff,
    label: 'Offline',
    color: 'text-amber-400',
    bgColor: 'bg-amber-500/10 border-amber-500/20',
    pulse: false,
  },
  error: {
    icon: AlertTriangle,
    label: 'Sync Error',
    color: 'text-red-400',
    bgColor: 'bg-red-500/10 border-red-500/20',
    pulse: false,
  },
  unsaved: {
    icon: Cloud,
    label: 'Unsaved',
    color: 'text-amber-400',
    bgColor: 'bg-amber-500/10 border-amber-500/20',
    pulse: false,
  },
};

function formatTimeSince(date: Date | null | undefined): string {
  if (!date) return '';

  const now = new Date();
  const seconds = Math.floor((now.getTime() - date.getTime()) / 1000);

  if (seconds < 5) return 'just now';
  if (seconds < 60) return `${seconds}s ago`;
  if (seconds < 3600) return `${Math.floor(seconds / 60)}m ago`;
  if (seconds < 86400) return `${Math.floor(seconds / 3600)}h ago`;
  return date.toLocaleDateString();
}

export function SyncStatusIndicator({
  state,
  lastSaved,
  lastSynced,
  errorMessage,
  onRetry,
  className,
  variant = 'full',
  showLastSaved = true,
}: SyncStatusIndicatorProps) {
  const config = stateConfig[state];
  const Icon = config.icon;
  const [timeSince, setTimeSince] = useState(formatTimeSince(lastSaved || lastSynced));

  // Update time display every 10 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setTimeSince(formatTimeSince(lastSaved || lastSynced));
    }, 10000);
    return () => clearInterval(interval);
  }, [lastSaved, lastSynced]);

  if (variant === 'minimal') {
    return (
      <div className={cn('flex items-center gap-1', className)}>
        <Icon
          className={cn(
            'h-3.5 w-3.5',
            config.color,
            config.pulse && 'animate-spin'
          )}
        />
      </div>
    );
  }

  if (variant === 'compact') {
    return (
      <div
        className={cn(
          'flex items-center gap-1.5 px-2 py-1 rounded-full border text-xs font-medium',
          config.bgColor,
          config.color,
          className
        )}
      >
        <Icon
          className={cn(
            'h-3 w-3',
            config.pulse && 'animate-spin'
          )}
        />
        <span>{config.label}</span>
      </div>
    );
  }

  // Full variant
  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={state}
        initial={{ opacity: 0, y: -5 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 5 }}
        className={cn(
          'flex items-center gap-2 px-3 py-2 rounded-xl border',
          config.bgColor,
          className
        )}
      >
        <Icon
          className={cn(
            'h-4 w-4 flex-shrink-0',
            config.color,
            config.pulse && 'animate-spin'
          )}
        />
        <div className="flex flex-col min-w-0">
          <span className={cn('text-sm font-medium', config.color)}>
            {config.label}
          </span>
          {showLastSaved && timeSince && state === 'synced' && (
            <span className="text-[10px] text-white/40 truncate">
              {timeSince}
            </span>
          )}
          {errorMessage && state === 'error' && (
            <span className="text-[10px] text-red-300/70 truncate">
              {errorMessage}
            </span>
          )}
        </div>
        {state === 'error' && onRetry && (
          <button
            onClick={onRetry}
            className="ml-auto p-1 rounded-lg hover:bg-white/10 active:scale-95 transition-transform"
          >
            <RefreshCw className="h-3.5 w-3.5 text-red-400" />
          </button>
        )}
        {state === 'offline' && (
          <span className="ml-auto text-[10px] text-amber-400/70">
            Saved locally
          </span>
        )}
      </motion.div>
    </AnimatePresence>
  );
}

/**
 * Sticky sync status bar for forms - always visible at top
 */
interface StickyFormSyncBarProps {
  state: SyncState;
  lastSaved?: Date | null;
  isOnline: boolean;
  onRetry?: () => void;
  certificateNumber?: string;
}

export function StickyFormSyncBar({
  state,
  lastSaved,
  isOnline,
  onRetry,
  certificateNumber,
}: StickyFormSyncBarProps) {
  const effectiveState = !isOnline ? 'offline' : state;
  const config = stateConfig[effectiveState];
  const Icon = config.icon;
  const timeSince = formatTimeSince(lastSaved);

  return (
    <div
      className={cn(
        'sticky top-0 z-40 flex items-center justify-between px-4 py-2 border-b backdrop-blur-md',
        effectiveState === 'synced' && 'bg-green-500/5 border-green-500/20',
        effectiveState === 'syncing' && 'bg-blue-500/5 border-blue-500/20',
        effectiveState === 'saving' && 'bg-blue-500/5 border-blue-500/20',
        effectiveState === 'offline' && 'bg-amber-500/5 border-amber-500/20',
        effectiveState === 'error' && 'bg-red-500/5 border-red-500/20',
        effectiveState === 'unsaved' && 'bg-amber-500/5 border-amber-500/20'
      )}
    >
      <div className="flex items-center gap-2">
        <Icon
          className={cn(
            'h-4 w-4',
            config.color,
            config.pulse && 'animate-spin'
          )}
        />
        <div className="flex flex-col">
          <span className={cn('text-xs font-medium', config.color)}>
            {config.label}
          </span>
          {timeSince && effectiveState === 'synced' && (
            <span className="text-[10px] text-white/40">
              Last saved {timeSince}
            </span>
          )}
        </div>
      </div>

      {certificateNumber && (
        <span className="text-xs text-white/50 font-mono">
          {certificateNumber}
        </span>
      )}

      {effectiveState === 'error' && onRetry && (
        <button
          onClick={onRetry}
          className="flex items-center gap-1 px-2 py-1 rounded-lg bg-red-500/20 hover:bg-red-500/30 text-red-400 text-xs font-medium active:scale-95 transition-all"
        >
          <RefreshCw className="h-3 w-3" />
          Retry
        </button>
      )}

      {effectiveState === 'offline' && (
        <span className="text-[10px] text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded-full">
          Changes saved locally
        </span>
      )}
    </div>
  );
}

/**
 * Offline banner - shows when user has been offline for a while
 */
interface OfflineBannerProps {
  isOnline: boolean;
  offlineSince?: Date;
}

export function OfflineBanner({ isOnline, offlineSince }: OfflineBannerProps) {
  const [showBanner, setShowBanner] = useState(false);

  useEffect(() => {
    if (!isOnline) {
      // Show banner after 10 seconds offline
      const timer = setTimeout(() => setShowBanner(true), 10000);
      return () => clearTimeout(timer);
    } else {
      setShowBanner(false);
    }
  }, [isOnline]);

  if (!showBanner) return null;

  return (
    <motion.div
      initial={{ height: 0, opacity: 0 }}
      animate={{ height: 'auto', opacity: 1 }}
      exit={{ height: 0, opacity: 0 }}
      className="bg-amber-500/10 border-b border-amber-500/20 px-4 py-3"
    >
      <div className="flex items-center gap-3">
        <CloudOff className="h-5 w-5 text-amber-400 flex-shrink-0" />
        <div>
          <p className="text-sm font-medium text-amber-400">
            You're offline
          </p>
          <p className="text-xs text-amber-400/70">
            Don't worry - your changes are being saved locally and will sync when you're back online.
          </p>
        </div>
      </div>
    </motion.div>
  );
}

export default SyncStatusIndicator;
