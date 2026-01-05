import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { QueueOperation, offlineQueue } from '@/utils/offlineQueue';
import { 
  FileText, 
  Clock, 
  RefreshCw, 
  AlertCircle, 
  Trash2, 
  ChevronDown,
  Copy,
  Plus,
  XCircle
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { responsiveBody } from '@/styles/typography-utilities';
import { useToast } from '@/hooks/use-toast';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';

interface OperationCardProps {
  operation: QueueOperation;
  onUpdate: () => void;
}

export const OperationCard = ({ operation, onUpdate }: OperationCardProps) => {
  const { toast } = useToast();
  const [isExpanded, setIsExpanded] = useState(false);
  const [isRetrying, setIsRetrying] = useState(false);

  const getStatusConfig = () => {
    if (operation.retryCount >= 3) {
      return {
        border: 'border-l-4 border-l-red-500',
        icon: XCircle,
        iconColor: 'text-red-500',
        status: 'Failed',
        statusColor: 'bg-red-500/10 text-red-500 border-red-500/20',
      };
    }
    if (operation.retryCount > 0) {
      return {
        border: 'border-l-4 border-l-amber-500',
        icon: RefreshCw,
        iconColor: 'text-amber-500',
        status: 'Retrying',
        statusColor: 'bg-amber-500/10 text-amber-500 border-amber-500/20',
      };
    }
    return {
      border: 'border-l-4 border-l-blue-500',
      icon: Clock,
      iconColor: 'text-blue-500',
      status: 'Pending',
      statusColor: 'bg-blue-500/10 text-blue-500 border-blue-500/20',
    };
  };

  const getOperationIcon = () => {
    switch (operation.type) {
      case 'create': return Plus;
      case 'update': return RefreshCw;
      case 'delete': return Trash2;
      default: return FileText;
    }
  };

  const formatTimestamp = (timestamp: number) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    
    if (diffMins < 1) return { relative: 'Just now', color: 'text-muted-foreground' };
    if (diffMins < 60) return { 
      relative: `${diffMins} min${diffMins > 1 ? 's' : ''} ago`,
      color: diffMins > 30 ? 'text-amber-500' : 'text-muted-foreground'
    };
    
    const diffHours = Math.floor(diffMins / 60);
    if (diffHours < 24) return { 
      relative: `${diffHours} hour${diffHours > 1 ? 's' : ''} ago`,
      color: diffHours > 1 ? 'text-red-500' : 'text-amber-500'
    };
    
    return {
      relative: date.toLocaleDateString('en-GB', { 
        day: 'numeric', 
        month: 'short', 
        hour: '2-digit', 
        minute: '2-digit' 
      }),
      color: 'text-red-500'
    };
  };

  const handleRetry = async () => {
    setIsRetrying(true);
    try {
      await offlineQueue.updateRetryCount(operation.id);
      toast({
        title: 'Retry Triggered',
        description: 'Attempting to sync this operation...',
      });
      setTimeout(() => {
        onUpdate();
        setIsRetrying(false);
      }, 1000);
    } catch (error) {
      toast({
        title: 'Retry Failed',
        description: 'Could not trigger retry. Please try again.',
        variant: 'destructive',
      });
      setIsRetrying(false);
    }
  };

  const handleRemove = async () => {
    try {
      await offlineQueue.removeFromQueue(operation.id);
      toast({
        title: 'Operation Removed',
        description: 'The operation has been removed from the queue.',
      });
      onUpdate();
    } catch (error) {
      toast({
        title: 'Remove Failed',
        description: 'Could not remove operation. Please try again.',
        variant: 'destructive',
      });
    }
  };

  const handleCopyId = () => {
    navigator.clipboard.writeText(operation.reportId);
    toast({
      title: 'Copied',
      description: 'Report ID copied to clipboard',
    });
  };

  const statusConfig = getStatusConfig();
  const OperationIcon = getOperationIcon();
  const StatusIcon = statusConfig.icon;
  const timestamp = formatTimestamp(operation.timestamp);

  return (
    <Collapsible open={isExpanded} onOpenChange={setIsExpanded}>
      <Card className={cn(
        'transition-all duration-200 hover:shadow-md',
        statusConfig.border,
        isExpanded && 'ring-2 ring-primary/20'
      )}>
        <CardContent className="p-3 sm:p-4">
          <div className="flex items-start gap-3">
            {/* Status Icon */}
            <div className={cn(
              'flex-shrink-0 p-2 rounded-lg bg-muted/50',
              'hidden sm:flex items-center justify-center'
            )}>
              <StatusIcon className={cn('h-5 w-5', statusConfig.iconColor)} />
            </div>

            {/* Main Content */}
            <div className="flex-1 min-w-0 space-y-2 sm:space-y-3">
              {/* Header */}
              <div className="flex flex-wrap items-start gap-2">
                <Badge 
                  variant="outline" 
                  className="bg-elec-yellow/10 text-elec-yellow border-elec-yellow/20"
                >
                  <OperationIcon className="h-3 w-3 mr-1" />
                  {operation.type}
                </Badge>
                <Badge variant="outline" className={statusConfig.statusColor}>
                  {statusConfig.status}
                </Badge>
                {operation.retryCount > 0 && (
                  <Badge variant="outline" className="border-amber-500/20 text-amber-500">
                    Attempt {operation.retryCount + 1}/4
                  </Badge>
                )}
                <span className={cn(responsiveBody.normal, 'font-medium flex-1 min-w-0 truncate')}>
                  {operation.reportType}
                </span>
              </div>

              {/* Details */}
              <div className={cn(responsiveBody.small, 'space-y-1 text-muted-foreground')}>
                <div className="flex items-center gap-2">
                  <FileText className="h-3 w-3 flex-shrink-0" />
                  <button
                    onClick={handleCopyId}
                    className="hover:text-foreground transition-colors truncate flex-1 text-left"
                    title="Click to copy"
                  >
                    Report: {operation.reportId}
                  </button>
                  <Copy className="h-3 w-3 flex-shrink-0 opacity-50" />
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="h-3 w-3 flex-shrink-0" />
                  <span className={timestamp.color} title={new Date(operation.timestamp).toLocaleString()}>
                    Queued {timestamp.relative}
                  </span>
                </div>
              </div>

              {/* Actions */}
              <div className="flex flex-wrap gap-2 pt-1">
                <CollapsibleTrigger asChild>
                  <Button 
                    variant="ghost" 
                    size="sm"
                    className="h-8 text-xs"
                  >
                    <ChevronDown className={cn(
                      'h-3 w-3 mr-1 transition-transform',
                      isExpanded && 'rotate-180'
                    )} />
                    Details
                  </Button>
                </CollapsibleTrigger>

                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleRetry}
                  disabled={isRetrying || operation.retryCount >= 3}
                  className="h-8 text-xs"
                >
                  <RefreshCw className={cn('h-3 w-3 mr-1', isRetrying && 'animate-spin')} />
                  Retry
                </Button>

                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-8 text-xs text-red-500 hover:text-red-600 hover:bg-red-500/10"
                    >
                      <Trash2 className="h-3 w-3 mr-1" />
                      Remove
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>Remove Operation?</AlertDialogTitle>
                      <AlertDialogDescription>
                        This will permanently remove this operation from the queue. Any unsaved changes will be lost.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Cancel</AlertDialogCancel>
                      <AlertDialogAction onClick={handleRemove} className="bg-red-500 hover:bg-red-600">
                        Remove
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </div>
            </div>
          </div>

          {/* Expanded Details */}
          <CollapsibleContent className="pt-3 sm:pt-4 mt-3 sm:mt-4 border-t">
            <div className="space-y-3">
              <div>
                <h4 className={cn(responsiveBody.normal, 'font-medium mb-2')}>Operation Data</h4>
                <div className="bg-muted/50 rounded-lg p-3 overflow-x-auto">
                  <pre className={cn(responsiveBody.small, 'text-muted-foreground')}>
                    {JSON.stringify(operation.data, null, 2)}
                  </pre>
                </div>
              </div>
              
              {operation.retryCount > 0 && (
                <div className="flex items-start gap-2 p-3 rounded-lg bg-amber-500/10 border border-amber-500/20">
                  <AlertCircle className="h-4 w-4 text-amber-500 flex-shrink-0 mt-0.5" />
                  <div className={cn(responsiveBody.small)}>
                    <p className="font-medium text-amber-500 mb-1">Retry Information</p>
                    <p className="text-muted-foreground">
                      This operation has been attempted {operation.retryCount} time{operation.retryCount > 1 ? 's' : ''}.
                      {operation.retryCount >= 3 
                        ? ' Maximum retry limit reached. Manual intervention required.'
                        : ' It will be retried automatically when online.'}
                    </p>
                  </div>
                </div>
              )}
            </div>
          </CollapsibleContent>
        </CardContent>
      </Card>
    </Collapsible>
  );
};
