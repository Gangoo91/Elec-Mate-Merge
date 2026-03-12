import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { RefreshCw, Loader2, CheckCircle2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';

interface BatchToolsRefreshButtonProps {
  onSuccess: () => void;
  className?: string;
}

const BatchToolsRefreshButton: React.FC<BatchToolsRefreshButtonProps> = ({
  onSuccess,
  className,
}) => {
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [refreshStatus, setRefreshStatus] = useState<'idle' | 'success'>('idle');
  const { toast } = useToast();

  const handleRefresh = async () => {
    setIsRefreshing(true);

    toast({
      title: 'Refreshing Tools Data',
      description: 'Fetching latest cached tools data...',
      duration: 3000,
    });

    // Pipeline handles weekly scraping — just invalidate the cache
    onSuccess();
    setRefreshStatus('success');
    setIsRefreshing(false);

    toast({
      title: 'Tools Data Refreshed',
      description: 'Showing latest tools from cache.',
      duration: 3000,
    });

    setTimeout(() => setRefreshStatus('idle'), 3000);
  };

  return (
    <div className={cn('flex flex-col items-end gap-1', className)}>
      <Button
        variant="outline"
        size="default"
        onClick={handleRefresh}
        disabled={isRefreshing}
        className={cn(
          'mobile-interactive touch-target transition-all duration-200 bg-elec-yellow/10 border-elec-yellow/30 text-elec-yellow hover:bg-elec-yellow/20',
          refreshStatus === 'success' && 'border-green-400/30 bg-green-400/10'
        )}
        title="Refresh tools data from cache"
      >
        {isRefreshing ? (
          <Loader2 className="h-4 w-4 animate-spin" />
        ) : refreshStatus === 'success' ? (
          <CheckCircle2 className="h-4 w-4 text-green-400" />
        ) : (
          <RefreshCw className="h-4 w-4" />
        )}
        <span className="ml-2">
          {isRefreshing ? 'Updating...' : refreshStatus === 'success' ? 'Updated' : 'Refresh'}
        </span>
      </Button>
    </div>
  );
};

export default BatchToolsRefreshButton;
