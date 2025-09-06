
import { Button } from "@/components/ui/button";
import { RefreshCw, Clock, AlertCircle } from "lucide-react";
import { useState, useEffect } from "react";
import { updateMaterialsCache, getCacheStatus } from "@/utils/materialsCache";
import { useToast } from "@/components/ui/use-toast";

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
  const [cacheAge, setCacheAge] = useState<number | null>(null);
  const [nextRefreshDate, setNextRefreshDate] = useState<Date | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    checkCacheStatus();
  }, []);

  const checkCacheStatus = async () => {
    const status = await getCacheStatus();
    if (status.success) {
      setCanRefresh(status.canRefresh);
      setCacheAge(status.cacheAge);
      setNextRefreshDate(status.nextRefreshAvailable);
    }
  };

  const handleRefresh = async () => {
    if (!canRefresh && !isUpdating) {
      const daysUntilRefresh = nextRefreshDate 
        ? Math.ceil((nextRefreshDate.getTime() - Date.now()) / (24 * 60 * 60 * 1000))
        : 0;
      
      toast({
        title: "Refresh Not Available",
        description: `Data was recently updated. Next refresh available in ${daysUntilRefresh} day${daysUntilRefresh !== 1 ? 's' : ''}.`,
        variant: "destructive",
      });
      return;
    }

    setIsUpdating(true);
    try {
      const result = await updateMaterialsCache();
      
      if (result.success) {
        toast({
          title: "Cache Updated",
          description: "Materials data has been refreshed successfully.",
        });
        
        // Refresh the data on the page
        onRefresh();
        
        // Update cache status
        await checkCacheStatus();
      } else {
        throw new Error(result.error);
      }
    } catch (error) {
      console.error('Error updating cache:', error);
      toast({
        title: "Update Failed",
        description: "Failed to update materials cache. Please try again later.",
        variant: "destructive",
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

  const formatNextRefresh = () => {
    if (!nextRefreshDate) return '';
    const now = Date.now();
    const diff = nextRefreshDate.getTime() - now;
    
    if (diff <= 0) return 'Available now';
    
    const days = Math.ceil(diff / (24 * 60 * 60 * 1000));
    return `${days} day${days !== 1 ? 's' : ''}`;
  };

  const isDisabled = isFetching || isUpdating || (!canRefresh && cacheAge !== null);

  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <Button 
        variant="outline" 
        size="sm" 
        onClick={handleRefresh} 
        disabled={isDisabled}
        className="flex items-center gap-1.5 text-xs sm:text-sm bg-elec-yellow/10 border-elec-yellow/30 hover:bg-elec-yellow/20 shrink-0"
      >
        {!canRefresh && cacheAge !== null ? (
          <AlertCircle className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
        ) : (
          <RefreshCw className={`h-3.5 w-3.5 sm:h-4 sm:w-4 ${(isFetching || isUpdating) ? 'animate-spin' : ''}`} />
        )}
        <span className="hidden xs:inline">
          {isUpdating ? 'Updating Cache…' : 
           isFetching ? 'Refreshing…' : 
           !canRefresh ? `Available in ${formatNextRefresh()}` : 
           'Update Cache'}
        </span>
        <span className="xs:hidden">
          {isUpdating ? 'Updating…' : 
           isFetching ? 'Loading…' : 
           !canRefresh ? formatNextRefresh() : 
           'Update'}
        </span>
      </Button>
      
      {(lastFetchTime > 0 || cacheAge !== null) && !isFetching && !isUpdating && (
        <div className="flex items-center gap-1 text-xs text-muted-foreground whitespace-nowrap">
          <Clock className="h-3 w-3" />
          <span>
            {cacheAge !== null 
              ? `Cache: ${cacheAge} day${cacheAge !== 1 ? 's' : ''} old` 
              : `Updated ${formatLastUpdate(lastFetchTime)}`}
          </span>
        </div>
      )}
    </div>
  );
};

export default RefreshButton;
