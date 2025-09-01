
import { Button } from "@/components/ui/button";
import { RefreshCw, Clock } from "lucide-react";

interface RefreshButtonProps {
  isFetching: boolean;
  lastFetchTime: number;
  onRefresh: () => void;
  categoryId: string;
  className?: string;
}

const RefreshButton = ({ isFetching, lastFetchTime, onRefresh, categoryId, className }: RefreshButtonProps) => {
  const formatLastUpdate = (timestamp: number) => {
    if (!timestamp) return '';
    const now = Date.now();
    const diff = now - timestamp;
    
    if (diff < 60000) return 'Just now';
    if (diff < 3600000) return `${Math.floor(diff / 60000)}m ago`;
    if (diff < 86400000) return `${Math.floor(diff / 3600000)}h ago`;
    return new Date(timestamp).toLocaleDateString();
  };

  return (
    <div className={`flex flex-col sm:flex-row gap-2 items-start ${className}`}>
      <Button 
        variant="outline" 
        size="sm" 
        onClick={onRefresh} 
        disabled={isFetching} 
        className="flex items-center gap-1.5 text-xs sm:text-sm bg-elec-yellow/10 border-elec-yellow/30 hover:bg-elec-yellow/20"
      >
        <RefreshCw className={`h-3.5 w-3.5 sm:h-4 sm:w-4 ${isFetching ? 'animate-spin' : ''}`} />
        <span className="hidden xs:inline">
          {isFetching ? 'Refreshing…' : 'Refresh Data'}
        </span>
        <span className="xs:hidden">
          {isFetching ? 'Loading…' : 'Refresh'}
        </span>
      </Button>
      
      {lastFetchTime > 0 && !isFetching && (
        <div className="flex items-center gap-1 text-xs text-muted-foreground">
          <Clock className="h-3 w-3" />
          <span>Updated {formatLastUpdate(lastFetchTime)}</span>
        </div>
      )}
    </div>
  );
};

export default RefreshButton;
