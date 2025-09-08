import { Button } from "@/components/ui/button";
import { RefreshCw, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

interface ToolRefreshButtonProps {
  isFetching: boolean;
  lastFetchTime: number;
  onRefresh: () => void;
  categoryName: string;
  className?: string;
}

const ToolRefreshButton: React.FC<ToolRefreshButtonProps> = ({
  isFetching,
  lastFetchTime,
  onRefresh,
  categoryName,
  className
}) => {
  const getLastUpdateText = () => {
    if (lastFetchTime === 0) return "Never updated";
    
    const now = Date.now();
    const diffMinutes = Math.floor((now - lastFetchTime) / (1000 * 60));
    
    if (diffMinutes < 1) return "Just updated";
    if (diffMinutes < 60) return `${diffMinutes}m ago`;
    
    const diffHours = Math.floor(diffMinutes / 60);
    if (diffHours < 24) return `${diffHours}h ago`;
    
    const diffDays = Math.floor(diffHours / 24);
    return `${diffDays}d ago`;
  };

  return (
    <div className={cn("flex flex-col items-end gap-1", className)}>
      <Button
        variant="outline"
        size="sm"
        onClick={onRefresh}
        disabled={isFetching}
        className="bg-elec-yellow/10 border-elec-yellow/30 text-elec-yellow hover:bg-elec-yellow/20"
      >
        {isFetching ? (
          <Loader2 className="h-4 w-4 mr-2 animate-spin" />
        ) : (
          <RefreshCw className="h-4 w-4 mr-2" />
        )}
        {isFetching ? "Updating..." : "Refresh Tools"}
      </Button>
      <div className="text-xs text-muted-foreground">
        {getLastUpdateText()}
      </div>
    </div>
  );
};

export default ToolRefreshButton;