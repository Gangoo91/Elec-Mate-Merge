import React from 'react';
import { Cloud, CloudOff, Loader2, AlertTriangle, Wifi } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

export type SyncStatus = 'synced' | 'syncing' | 'queued' | 'error';

interface DataSyncIndicatorProps {
  status: SyncStatus;
  lastSyncTime?: number;
  errorMessage?: string;
  queuedChanges?: number;
}

const DataSyncIndicator: React.FC<DataSyncIndicatorProps> = ({
  status,
  lastSyncTime,
  errorMessage,
  queuedChanges = 0,
}) => {
  const getStatusConfig = () => {
    switch (status) {
      case 'synced':
        return {
          icon: <Cloud className="h-3 w-3" />,
          label: 'Synced to cloud',
          variant: 'default' as const,
          color: 'text-green-600 border-green-300'
        };
      case 'syncing':
        return {
          icon: <Loader2 className="h-3 w-3 animate-spin" />,
          label: 'Syncing...',
          variant: 'secondary' as const,
          color: 'text-blue-600 border-blue-300'
        };
      case 'queued':
        return {
          icon: <Wifi className="h-3 w-3" />,
          label: `${queuedChanges} change${queuedChanges !== 1 ? 's' : ''} queued`,
          variant: 'outline' as const,
          color: 'text-amber-600 border-amber-300'
        };
      case 'error':
        return {
          icon: <CloudOff className="h-3 w-3" />,
          label: 'Sync error',
          variant: 'destructive' as const,
          color: 'text-red-600 border-red-300'
        };
    }
  };

  const config = getStatusConfig();
  
  const formatLastSync = (timestamp: number) => {
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

  const tooltipContent = () => {
    if (status === 'error' && errorMessage) {
      return errorMessage;
    }
    if (status === 'queued') {
      return 'Changes will sync when you reconnect to the internet.';
    }
    if (lastSyncTime && status === 'synced') {
      return `Last synced ${formatLastSync(lastSyncTime)}`;
    }
    return config.label;
  };

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <div>
            <Badge variant={config.variant} className={`flex items-centre gap-1.5 ${config.color}`}>
              {config.icon}
              <span className="text-xs">{config.label}</span>
            </Badge>
          </div>
        </TooltipTrigger>
        <TooltipContent>
          <p className="text-xs">{tooltipContent()}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

export default DataSyncIndicator;
