import { CheckCircle2, Loader2, Cloud, CloudOff, WifiOff, AlertCircle } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import type { SyncStatus } from '@/hooks/useReportSync';

interface SyncStatusBadgeProps {
  status: SyncStatus;
}

export const SyncStatusBadge = ({ status }: SyncStatusBadgeProps) => {
  switch (status.cloud) {
    case 'synced':
      return (
        <Badge className="bg-green-500/20 text-green-400 border-0 text-[10px] px-2 py-0.5 font-semibold gap-1">
          <CheckCircle2 className="h-3 w-3" />
          Saved
        </Badge>
      );
    case 'syncing':
      return (
        <Badge className="bg-blue-500/20 text-blue-400 border-0 text-[10px] px-2 py-0.5 font-semibold gap-1">
          <Loader2 className="h-3 w-3 animate-spin" />
          Syncing...
        </Badge>
      );
    case 'unsaved':
      return (
        <Badge className="bg-amber-500/20 text-amber-400 border-0 text-[10px] px-2 py-0.5 font-semibold gap-1">
          <Cloud className="h-3 w-3" />
          Unsaved
        </Badge>
      );
    case 'queued':
      return (
        <Badge className="bg-amber-500/20 text-amber-400 border-0 text-[10px] px-2 py-0.5 font-semibold gap-1">
          <CloudOff className="h-3 w-3" />
          Queued{status.queuedChanges > 0 ? ` (${status.queuedChanges})` : ''}
        </Badge>
      );
    case 'offline':
      return (
        <Badge className="bg-red-500/20 text-red-400 border-0 text-[10px] px-2 py-0.5 font-semibold gap-1">
          <WifiOff className="h-3 w-3" />
          Offline
        </Badge>
      );
    case 'error':
      return (
        <Badge className="bg-red-500/20 text-red-400 border-0 text-[10px] px-2 py-0.5 font-semibold gap-1">
          <AlertCircle className="h-3 w-3" />
          Sync Error
        </Badge>
      );
    case 'conflict':
      return (
        <Badge className="bg-red-500/20 text-red-400 border-0 text-[10px] px-2 py-0.5 font-semibold gap-1">
          <AlertCircle className="h-3 w-3" />
          Conflict
        </Badge>
      );
    default:
      return null;
  }
};
