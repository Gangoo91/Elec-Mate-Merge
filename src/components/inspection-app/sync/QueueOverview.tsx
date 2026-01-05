import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ProgressRing } from '@/components/ui/progress-ring';
import { QueueOperation } from '@/utils/offlineQueue';
import { AlertCircle, CheckCircle, Clock, RefreshCw } from 'lucide-react';
import { responsiveBody, responsiveHeading } from '@/styles/typography-utilities';
import { cn } from '@/lib/utils';

interface QueueOverviewProps {
  operations: QueueOperation[];
  className?: string;
}

export const QueueOverview = ({ operations, className }: QueueOverviewProps) => {
  const totalOps = operations.length;
  const failedOps = operations.filter(op => op.retryCount >= 3).length;
  const retryingOps = operations.filter(op => op.retryCount > 0 && op.retryCount < 3).length;
  const pendingOps = operations.filter(op => op.retryCount === 0).length;
  
  const oldestOp = operations.length > 0 
    ? Math.max(...operations.map(op => Date.now() - op.timestamp))
    : 0;
  
  const oldestAge = oldestOp > 0 
    ? oldestOp < 60000 ? 'Just now'
    : oldestOp < 3600000 ? `${Math.floor(oldestOp / 60000)}m`
    : oldestOp < 86400000 ? `${Math.floor(oldestOp / 3600000)}h`
    : `${Math.floor(oldestOp / 86400000)}d`
    : 'N/A';

  const getStatus = () => {
    if (totalOps === 0) return 'success';
    if (failedOps > 0) return 'error';
    if (retryingOps > 0) return 'warning';
    return 'syncing';
  };

  const progress = totalOps === 0 ? 100 : 0;

  return (
    <Card className={cn('border-border/50', className)}>
      <CardHeader className="pb-3">
        <CardTitle className={cn(responsiveHeading.h3)}>Queue Overview</CardTitle>
        <CardDescription className={cn(responsiveBody.normal)}>
          {totalOps === 0 
            ? 'All operations are synced' 
            : `${totalOps} operation${totalOps !== 1 ? 's' : ''} waiting to sync`}
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4 sm:space-y-6">
        {/* Progress Ring */}
        <div className="flex justify-center py-2">
          <ProgressRing progress={progress} size={140} status={getStatus()}>
            {totalOps === 0 ? (
              <CheckCircle className="h-8 w-8 text-green-500" />
            ) : (
              <div className="text-center">
                <div className={cn(responsiveHeading.h2, 'font-bold')}>{totalOps}</div>
                <div className={cn(responsiveBody.small, 'text-muted-foreground')}>queued</div>
              </div>
            )}
          </ProgressRing>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4">
          <StatsCard
            icon={Clock}
            label="Pending"
            value={pendingOps}
            color="text-blue-500"
          />
          <StatsCard
            icon={RefreshCw}
            label="Retrying"
            value={retryingOps}
            color="text-amber-500"
          />
          <StatsCard
            icon={AlertCircle}
            label="Failed"
            value={failedOps}
            color="text-red-500"
          />
          <StatsCard
            icon={Clock}
            label="Oldest"
            value={oldestAge}
            color="text-muted-foreground"
            isTime
          />
        </div>
      </CardContent>
    </Card>
  );
};

interface StatsCardProps {
  icon: React.ElementType;
  label: string;
  value: number | string;
  color: string;
  isTime?: boolean;
}

const StatsCard = ({ icon: Icon, label, value, color, isTime }: StatsCardProps) => {
  return (
    <div className="flex flex-col items-center p-3 sm:p-4 rounded-lg bg-muted/50 border border-border/30">
      <Icon className={cn('h-5 w-5 sm:h-6 sm:w-6 mb-2', color)} />
      <div className={cn(responsiveHeading.h3, 'font-bold')}>
        {value}
      </div>
      <div className={cn(responsiveBody.small, 'text-muted-foreground text-center')}>
        {label}
      </div>
    </div>
  );
};
