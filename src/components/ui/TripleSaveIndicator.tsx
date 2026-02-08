/**
 * TripleSaveIndicator
 * Visual component showing 3 save layers: Local → Device → Cloud.
 * Each shows green tick / amber spinner / red cross.
 */

import React, { useState } from 'react';
import { CheckCircle2, Loader2, XCircle, HardDrive, Smartphone, Cloud, ChevronDown } from 'lucide-react';
import { cn } from '@/lib/utils';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet';

type LayerStatus = 'saved' | 'saving' | 'unsaved' | 'error';

interface TripleSaveIndicatorProps {
  localStatus: LayerStatus;
  indexedDBStatus?: LayerStatus;
  cloudStatus: LayerStatus;
  lastLocalSave?: Date | null;
  lastCloudSync?: Date | null;
  isOnline?: boolean;
  className?: string;
}

const statusIcon = (status: LayerStatus) => {
  switch (status) {
    case 'saved':
      return <CheckCircle2 className="h-3.5 w-3.5 text-green-500" />;
    case 'saving':
      return <Loader2 className="h-3.5 w-3.5 text-amber-400 animate-spin" />;
    case 'unsaved':
      return <div className="h-3.5 w-3.5 rounded-full border-2 border-white/30" />;
    case 'error':
      return <XCircle className="h-3.5 w-3.5 text-red-500" />;
  }
};

const statusColor = (status: LayerStatus): string => {
  switch (status) {
    case 'saved': return 'bg-green-500';
    case 'saving': return 'bg-amber-400';
    case 'unsaved': return 'bg-white/20';
    case 'error': return 'bg-red-500';
  }
};

function formatTimeAgo(date: Date | null | undefined): string {
  if (!date) return 'Never';
  const seconds = Math.floor((Date.now() - date.getTime()) / 1000);
  if (seconds < 5) return 'Just now';
  if (seconds < 60) return `${seconds}s ago`;
  const minutes = Math.floor(seconds / 60);
  if (minutes < 60) return `${minutes}m ago`;
  const hours = Math.floor(minutes / 60);
  return `${hours}h ago`;
}

export const TripleSaveIndicator: React.FC<TripleSaveIndicatorProps> = ({
  localStatus,
  indexedDBStatus = localStatus, // Default to matching local
  cloudStatus,
  lastLocalSave,
  lastCloudSync,
  isOnline = true,
  className,
}) => {
  const [showDetail, setShowDetail] = useState(false);

  const layers = [
    { status: localStatus, label: 'Local' },
    { status: indexedDBStatus, label: 'Device' },
    { status: cloudStatus, label: 'Cloud' },
  ];

  const allSaved = layers.every(l => l.status === 'saved');
  const anyError = layers.some(l => l.status === 'error');
  const anySaving = layers.some(l => l.status === 'saving');

  return (
    <>
      <button
        type="button"
        onClick={() => setShowDetail(true)}
        className={cn(
          'flex items-center gap-1.5 px-2 py-1.5 rounded-lg touch-manipulation transition-colors',
          'active:bg-white/10',
          className,
        )}
        aria-label="Save status"
      >
        {/* Three dots showing each layer */}
        <div className="flex items-center gap-1">
          {layers.map((layer, i) => (
            <div
              key={i}
              className={cn(
                'h-2 w-2 rounded-full transition-colors',
                statusColor(layer.status),
                layer.status === 'saving' && 'animate-pulse',
              )}
            />
          ))}
        </div>

        {/* Compact status text */}
        <span className={cn(
          'text-[11px] font-medium',
          allSaved ? 'text-green-500' : anyError ? 'text-red-400' : anySaving ? 'text-amber-400' : 'text-white/50',
        )}>
          {allSaved ? 'Saved' : anyError ? 'Error' : anySaving ? 'Saving...' : 'Pending'}
        </span>
      </button>

      {/* Detail Sheet */}
      <Sheet open={showDetail} onOpenChange={setShowDetail}>
        <SheetContent side="bottom" className="h-auto max-h-[50vh] p-0 rounded-t-2xl overflow-hidden">
          <div className="px-5 pt-5 pb-8 space-y-5 bg-background">
            <SheetHeader>
              <SheetTitle className="text-base font-semibold text-left">Data Protection</SheetTitle>
            </SheetHeader>

            <div className="space-y-3">
              {/* Local Storage */}
              <div className="flex items-center gap-3 p-3 rounded-xl bg-card/50 border border-border/30">
                <div className="h-9 w-9 rounded-lg bg-blue-500/15 flex items-center justify-center flex-shrink-0">
                  <HardDrive className="h-4 w-4 text-blue-400" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-foreground">Local Storage</p>
                  <p className="text-xs text-muted-foreground">Browser cache — saves every 10s</p>
                </div>
                {statusIcon(localStatus)}
              </div>

              {/* IndexedDB */}
              <div className="flex items-center gap-3 p-3 rounded-xl bg-card/50 border border-border/30">
                <div className="h-9 w-9 rounded-lg bg-purple-500/15 flex items-center justify-center flex-shrink-0">
                  <Smartphone className="h-4 w-4 text-purple-400" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-foreground">Device Storage</p>
                  <p className="text-xs text-muted-foreground">Persistent backup — survives cache clears</p>
                </div>
                {statusIcon(indexedDBStatus)}
              </div>

              {/* Cloud */}
              <div className="flex items-center gap-3 p-3 rounded-xl bg-card/50 border border-border/30">
                <div className="h-9 w-9 rounded-lg bg-green-500/15 flex items-center justify-center flex-shrink-0">
                  <Cloud className="h-4 w-4 text-green-400" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-foreground">Cloud Sync</p>
                  <p className="text-xs text-muted-foreground">
                    {isOnline
                      ? `Synced ${formatTimeAgo(lastCloudSync)}`
                      : 'Offline — will sync when connected'}
                  </p>
                </div>
                {statusIcon(cloudStatus)}
              </div>
            </div>

            <p className="text-[11px] text-center text-muted-foreground">
              Your data is protected across 3 layers. Even if you lose internet, your work is safe.
            </p>
          </div>
        </SheetContent>
      </Sheet>
    </>
  );
};
