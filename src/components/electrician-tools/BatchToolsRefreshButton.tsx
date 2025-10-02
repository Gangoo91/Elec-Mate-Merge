import { useState } from "react";
import { Button } from "@/components/ui/button";
import { RefreshCw, Loader2, AlertCircle, CheckCircle2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";

interface BatchToolsRefreshButtonProps {
  onSuccess: () => void;
  className?: string;
}

const BatchToolsRefreshButton: React.FC<BatchToolsRefreshButtonProps> = ({
  onSuccess,
  className
}) => {
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [progress, setProgress] = useState<string>('');
  const [refreshStatus, setRefreshStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [toolsFound, setToolsFound] = useState<number>(0);
  const { toast } = useToast();

  const handleRefresh = async () => {
    setIsRefreshing(true);
    setRefreshStatus('idle');
    setProgress('Starting...');
    setToolsFound(0);
    
    try {
      toast({
        title: "Fetching All Tools",
        description: "Scraping 8 categories from Screwfix...",
        duration: 3000,
      });

      // Call the new Firecrawl V2 batch scraper
      const { data, error } = await supabase.functions.invoke('firecrawl-v2-tools-batch', {
        body: {}
      });

      if (error) {
        console.error('❌ Batch refresh error:', error);
        setRefreshStatus('error');
        setProgress('Failed');
        
        toast({
          title: "Refresh Failed",
          description: error.message || "Failed to fetch tools data. Please try again.",
          variant: "destructive",
          duration: 5000,
        });
        return;
      }

      if (data?.success) {
        console.log('✅ Batch refresh success:', data);
        setRefreshStatus('success');
        setToolsFound(data.totalToolsFound || 0);
        setProgress(`Found ${data.totalToolsFound} tools`);
        
        // Call success callback to invalidate queries
        onSuccess();
        
        toast({
          title: "Tools Updated Successfully",
          description: `Found ${data.totalToolsFound} tools across ${data.categoriesSuccessful}/${data.categoriesProcessed} categories.`,
          duration: 4000,
        });

        // Reset status after delay
        setTimeout(() => {
          setRefreshStatus('idle');
          setProgress('');
        }, 5000);
      } else {
        console.error('❌ Batch scraping returned no data:', data);
        setRefreshStatus('error');
        setProgress('No tools found');
        
        toast({
          title: "Update Failed",
          description: "Unable to fetch tools data. Please try again later.",
          variant: "destructive",
          duration: 5000,
        });
      }
    } catch (error) {
      console.error('❌ Batch refresh error:', error);
      setRefreshStatus('error');
      setProgress('Error occurred');
      
      toast({
        title: "Refresh Failed", 
        description: error instanceof Error ? error.message : "An unexpected error occurred.",
        variant: "destructive",
        duration: 5000,
      });
    } finally {
      setIsRefreshing(false);
    }
  };

  const getIcon = () => {
    if (isRefreshing) {
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
    if (isRefreshing) return progress || "Fetching...";
    if (refreshStatus === 'success') return `✓ ${toolsFound} tools`;
    if (refreshStatus === 'error') return "⚠ Failed";
    return "Fetch All Tools";
  };

  return (
    <div className={cn("flex flex-col items-end gap-1", className)}>
      <Button
        variant="outline"
        size="default"
        onClick={handleRefresh}
        disabled={isRefreshing}
        className={cn(
          "mobile-interactive touch-target transition-all duration-200 bg-elec-yellow/10 border-elec-yellow/30 text-elec-yellow hover:bg-elec-yellow/20",
          refreshStatus === 'success' && "border-green-400/30 bg-green-400/10",
          refreshStatus === 'error' && "border-red-400/30 bg-red-400/10"
        )}
        title="Fetch all tools from Screwfix categories"
      >
        {getIcon()}
        <span className="ml-2">{getButtonText()}</span>
      </Button>
      {isRefreshing && (
        <div className="text-xs text-muted-foreground">
          Scraping 8 categories...
        </div>
      )}
    </div>
  );
};

export default BatchToolsRefreshButton;
