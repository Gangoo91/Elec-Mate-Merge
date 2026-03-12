import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { RefreshCw, Loader2, CheckCircle2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';

interface ToolRefreshButtonProps {
  isFetching: boolean;
  lastFetchTime: number;
  onRefresh: () => void;
  categoryName?: string;
  className?: string;
}

const ToolRefreshButton: React.FC<ToolRefreshButtonProps> = ({
  isFetching,
  lastFetchTime,
  onRefresh,
  categoryName,
  className,
}) => {
  const [refreshStatus, setRefreshStatus] = useState<'idle' | 'success'>('idle');
  const { toast } = useToast();

  const handleRefresh = () => {
    onRefresh();
    setRefreshStatus('success');

    toast({
      title: 'Refreshing Tools Data',
      description: categoryName
        ? `Updating ${categoryName} tools...`
        : 'Fetching latest tools data...',
      duration: 3000,
    });

    setTimeout(() => setRefreshStatus('idle'), 3000);
  };

  const getLastUpdateText = () => {
    if (lastFetchTime === 0) return 'Never updated';

    const now = Date.now();
    const diffMinutes = Math.floor((now - lastFetchTime) / (1000 * 60));

    if (diffMinutes < 1) return 'Just updated';
    if (diffMinutes < 60) return `${diffMinutes}m ago`;

    const diffHours = Math.floor(diffMinutes / 60);
    if (diffHours < 24) return `${diffHours}h ago`;

    const diffDays = Math.floor(diffHours / 24);
    return `${diffDays}d ago`;
  };

  return (
    <div className={cn('flex flex-col items-end gap-1', className)}>
      <Button
        variant="outline"
        size="sm"
        onClick={handleRefresh}
        disabled={isFetching}
        className={cn(
          'mobile-interactive touch-target transition-all duration-200 bg-elec-yellow/10 border-elec-yellow/30 text-elec-yellow hover:bg-elec-yellow/20',
          refreshStatus === 'success' && 'border-green-400/30 bg-green-400/10'
        )}
        title={
          categoryName
            ? `Refresh ${categoryName} tools from database`
            : 'Refresh all tools from database'
        }
      >
        {isFetching ? (
          <Loader2 className="h-4 w-4 animate-spin" />
        ) : refreshStatus === 'success' ? (
          <CheckCircle2 className="h-4 w-4 text-green-400" />
        ) : (
          <RefreshCw className="h-4 w-4" />
        )}
        <span className="ml-2">
          {isFetching ? 'Loading...' : refreshStatus === 'success' ? 'Updated' : 'Refresh'}
        </span>
      </Button>
      <div className="text-xs text-muted-foreground">{getLastUpdateText()}</div>
    </div>
  );
};

export default ToolRefreshButton;
