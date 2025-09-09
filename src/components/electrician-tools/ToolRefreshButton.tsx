import { useState } from "react";
import { Button } from "@/components/ui/button";
import { RefreshCw, Loader2, AlertCircle, CheckCircle2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/components/ui/use-toast";
import { cn } from "@/lib/utils";

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
  className
}) => {
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [refreshStatus, setRefreshStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const { toast } = useToast();
  const handleRefresh = async () => {
    setIsRefreshing(true);
    setRefreshStatus('idle');
    
    try {
      toast({
        title: "Refreshing Tools Data",
        description: categoryName ? 
          `Updating ${categoryName} tools from suppliers...` : 
          "Fetching latest tools from all suppliers...",
        duration: 3000,
      });

      // Call the comprehensive firecrawl scraper to trigger fresh data fetch
      const { data, error } = await supabase.functions.invoke('comprehensive-firecrawl-scraper', {
        body: { forceRefresh: true, categories: categoryName ? [categoryName] : null }
      });

      if (error) {
        console.error('❌ Refresh error:', error);
        setRefreshStatus('error');
        toast({
          title: "Refresh Failed",
          description: "Failed to refresh tools data. Please try again.",
          variant: "destructive",
          duration: 5000,
        });
      } else {
        console.log('✅ Refresh success:', data);
        setRefreshStatus('success');
        
        // Call the parent refresh function to update local state
        onRefresh();
        
        toast({
          title: "Tools Updated",
          description: data?.message || "Successfully refreshed tools data from suppliers.",
          duration: 4000,
        });
      }
    } catch (error) {
      console.error('❌ Refresh error:', error);
      setRefreshStatus('error');
      toast({
        title: "Refresh Failed", 
        description: "An error occurred while refreshing tools data.",
        variant: "destructive",
        duration: 5000,
      });
    } finally {
      setIsRefreshing(false);
      
      // Reset status after a delay
      setTimeout(() => {
        setRefreshStatus('idle');
      }, 3000);
    }
  };

  const getIcon = () => {
    if (isRefreshing || isFetching) {
      return <Loader2 className="h-4 w-4 animate-spin" />;
    }
    if (refreshStatus === 'success') {
      return <CheckCircle2 className="h-4 w-4 text-green-400" />;
    }
    if (refreshStatus === 'error') {
      return <AlertCircle className="h-4 w-4 text-red-400" />;
    }
    return <RefreshCw className="h-4 w-4" />;
  };

  const getButtonText = () => {
    if (isRefreshing) return "Refreshing...";
    if (isFetching) return "Loading...";
    if (refreshStatus === 'success') return "Updated";
    if (refreshStatus === 'error') return "Failed";
    return "Refresh";
  };

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
        onClick={handleRefresh}
        disabled={isRefreshing || isFetching}
        className={cn(
          "mobile-interactive touch-target transition-all duration-200 bg-elec-yellow/10 border-elec-yellow/30 text-elec-yellow hover:bg-elec-yellow/20",
          refreshStatus === 'success' && "border-green-400/30 bg-green-400/10",
          refreshStatus === 'error' && "border-red-400/30 bg-red-400/10"
        )}
        title={categoryName ? 
          `Refresh ${categoryName} tools from suppliers` : 
          "Refresh all tools from suppliers"
        }
      >
        {getIcon()}
        <span className="ml-2">{getButtonText()}</span>
      </Button>
      <div className="text-xs text-muted-foreground">
        {getLastUpdateText()}
      </div>
    </div>
  );
};

export default ToolRefreshButton;