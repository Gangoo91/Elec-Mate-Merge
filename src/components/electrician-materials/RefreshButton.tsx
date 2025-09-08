
import { Button } from "@/components/ui/button";
import { RefreshCw, Clock, AlertCircle } from "lucide-react";
import { useState, useEffect } from "react";
import { updateMaterialsCache, getCacheStatus } from "@/utils/materialsCache";
import { useBatchProgress } from "@/hooks/useBatchProgress";
import { toast } from 'sonner';

interface RefreshButtonProps {
  isFetching: boolean;
  lastFetchTime: number;
  onRefresh: () => void;
  categoryId: string;
  className?: string;
}

const RefreshButton = ({ isFetching, lastFetchTime, onRefresh, categoryId, className }: RefreshButtonProps) => {
  const [isUpdating, setIsUpdating] = useState(false);
  const [canRefresh, setCanRefresh] = useState(true);
  const [cacheAge, setCacheAge] = useState<string>('');
  const [nextRefreshDate, setNextRefreshDate] = useState<Date | null>(null);
  const [jobId, setJobId] = useState<string | null>(null);
  
  const { job, isLoading: batchLoading, isProcessing, isCompleted, isFailed } = useBatchProgress(jobId || undefined);

  useEffect(() => {
    checkCacheStatus();
  }, []);

  const checkCacheStatus = async () => {
    try {
      const status = await getCacheStatus();
      setCanRefresh(status.canRefresh);
      setCacheAge(status.age);
      setNextRefreshDate(status.nextRefreshAllowed);
    } catch (error) {
      console.error('Failed to check cache status:', error);
    }
  };

  useEffect(() => {
    if (isCompleted) {
      toast.success('Data collection completed!', {
        description: `Collected ${job?.metadata?.total_products || 'many'} products`,
        duration: 5000,
      });
      setJobId(null);
      checkCacheStatus();
      if (onRefresh) {
        onRefresh();
      }
    } else if (isFailed) {
      toast.error('Data collection failed', {
        description: job?.error_message || 'Please try again later',
        duration: 5000,
      });
      setJobId(null);
    }
  }, [isCompleted, isFailed, job, onRefresh]);

  const handleRefresh = async () => {
    if (isUpdating || isFetching || isProcessing) return;

    // Check if refresh is allowed
    const status = await getCacheStatus();
    if (!status.canRefresh && !status.isEmpty) {
      const daysUntilRefresh = nextRefreshDate 
        ? Math.ceil((nextRefreshDate.getTime() - Date.now()) / (24 * 60 * 60 * 1000))
        : 0;
      
      toast.error(`Please wait until ${formatNextRefresh(nextRefreshDate)} before refreshing again`, {
        duration: 4000,
      });
      return;
    }

    setIsUpdating(true);
    
    try {
      console.log('🚀 Starting materials cache refresh...');
      
      toast.info('Starting batch data collection...', {
        description: 'This will take 5-10 minutes to complete',
        duration: 5000,
      });

      const result = await updateMaterialsCache();
      console.log('✅ Cache update completed:', result);
      
      if (result?.action === 'skipped') {
        toast.info('Cache is already fresh', {
          description: `Last updated: ${formatLastUpdate(result.last_updated)}`,
          duration: 3000,
        });
      } else if (result?.job_id) {
        setJobId(result.job_id);
        toast.success('Batch processing started!', {
          description: `Estimated completion: ${result.estimated_time || '5-10 minutes'}`,
          duration: 5000,
        });
      }

      // Refresh cache status
      await checkCacheStatus();
    } catch (error) {
      console.error('❌ Failed to refresh cache:', error);
      toast.error('Failed to start data collection', {
        description: error instanceof Error ? error.message : 'Please try again later',
        duration: 5000,
      });
    } finally {
      setIsUpdating(false);
    }
  };

  const formatLastUpdate = (timestamp: number) => {
    if (!timestamp) return '';
    const now = Date.now();
    const diff = now - timestamp;
    
    if (diff < 60000) return 'Just now';
    if (diff < 3600000) return `${Math.floor(diff / 60000)}m ago`;
    if (diff < 86400000) return `${Math.floor(diff / 3600000)}h ago`;
    return new Date(timestamp).toLocaleDateString();
  };

  const formatNextRefresh = (date: Date | null) => {
    if (!date) return '';
    const now = Date.now();
    const diff = date.getTime() - now;
    
    if (diff <= 0) return 'Available now';
    
    const days = Math.ceil(diff / (24 * 60 * 60 * 1000));
    return `${days} day${days !== 1 ? 's' : ''}`;
  };

  const isDisabled = isFetching || isUpdating || isProcessing || (!canRefresh && cacheAge !== 'No data available');

  const getButtonText = () => {
    if (isFetching) return { long: 'Fetching...', short: '...' };
    if (isUpdating) return { long: 'Starting...', short: '...' };
    if (isProcessing) return { long: `Processing... ${job?.progress_percentage || 0}%`, short: `${job?.progress_percentage || 0}%` };
    if (!canRefresh && cacheAge !== 'No data available') return { long: `Available in ${formatNextRefresh(nextRefreshDate)}`, short: formatNextRefresh(nextRefreshDate) };
    if (cacheAge === 'No data available') return { long: 'Fetch Data', short: 'Fetch' };
    return { long: 'Update Cache', short: 'Update' };
  };

  const getIcon = () => {
    if (isFetching || isUpdating) return <RefreshCw className="h-3.5 w-3.5 sm:h-4 sm:w-4 animate-spin" />;
    if (isProcessing) return <Clock className="h-3.5 w-3.5 sm:h-4 sm:w-4" />;
    if (!canRefresh && cacheAge !== 'No data available') return <AlertCircle className="h-3.5 w-3.5 sm:h-4 sm:w-4" />;
    return <RefreshCw className="h-3.5 w-3.5 sm:h-4 sm:w-4" />;
  };

  const buttonText = getButtonText();

  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <Button 
        variant="outline" 
        size="sm" 
        onClick={handleRefresh} 
        disabled={isDisabled}
        className="flex items-center gap-1.5 text-xs sm:text-sm bg-elec-yellow/10 border-elec-yellow/30 hover:bg-elec-yellow/20 shrink-0"
      >
        {getIcon()}
        <span className="hidden xs:inline">
          {buttonText.long}
        </span>
        <span className="xs:hidden">
          {buttonText.short}
        </span>
      </Button>
    </div>
  );
};

export default RefreshButton;
