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
  const [currentBatch, setCurrentBatch] = useState<number>(0);
  const [totalBatches] = useState<number>(3);
  const { toast } = useToast();

  const handleRefresh = async () => {
    setIsRefreshing(true);
    setRefreshStatus('idle');
    setProgress('Starting batch system...');
    setToolsFound(0);
    setCurrentBatch(1);
    
    try {
      
      toast({
        title: "Multi-Batch Scraping Started",
        description: "Fetching all 18 URLs across 3 batches...",
        duration: 3000,
      });

      // Start batch 1
      const { data, error } = await supabase.functions.invoke('firecrawl-v2-tools-batch', {
        body: {}
      });

      if (error) {
        console.error('❌ Batch refresh error:', error);
        setRefreshStatus('error');
        setProgress('Failed');
        
        toast({
          title: "Refresh Failed",
          description: error.message || "Failed to start batch scraping.",
          variant: "destructive",
          duration: 5000,
        });
        return;
      }

      if (data?.success) {
        console.log('✅ Batch system started:', data);
        setCurrentBatch(data.batchNumber || 1);
        setProgress(`Batch ${data.batchNumber}/3 in progress...`);
        
        toast({
          title: "Batch Scraping In Progress",
          description: `Batch ${data.batchNumber}/3 started. Auto-refreshing results...`,
          duration: 4000,
        });

        // Start polling for queue status
        startQueuePolling();
      } else {
        console.error('❌ Batch scraping returned no data:', data);
        setRefreshStatus('error');
        setProgress('No data returned');
        
        toast({
          title: "Update Failed",
          description: "Unable to start batch scraping.",
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
    }
  };

  const startQueuePolling = () => {
    let pollCount = 0;
    const maxPolls = 60; // 5 minutes max

    const pollInterval = setInterval(async () => {
      pollCount++;
      
      try {
        const { data: queueData, error } = await supabase
          .from('tools_scrape_queue')
          .select('*')
          .order('created_at', { ascending: false })
          .limit(3);

        if (error) {
          console.error('Error polling queue:', error);
          return;
        }

        if (!queueData || queueData.length === 0) {
          return;
        }

        // Calculate total tools found across all batches
        const totalTools = queueData.reduce((sum, batch) => sum + (batch.tools_found || 0), 0);
        setToolsFound(totalTools);

        // Find current processing batch
        const processingBatch = queueData.find(q => q.status === 'processing');
        if (processingBatch) {
          setCurrentBatch(processingBatch.batch_number);
          setProgress(`Batch ${processingBatch.batch_number}/3 in progress...`);
        }

        // Check if all batches are complete
        const completedBatches = queueData.filter(q => q.status === 'completed').length;
        if (completedBatches >= 3) {
          clearInterval(pollInterval);
          setIsRefreshing(false);
          setRefreshStatus('success');
          setProgress(`All batches complete!`);
          
          onSuccess(); // Refresh the tools data
          
          toast({
            title: "All Batches Complete!",
            description: `Successfully scraped ${totalTools} tools across all 18 URLs.`,
            duration: 5000,
          });

          setTimeout(() => {
            setRefreshStatus('idle');
            setProgress('');
            setCurrentBatch(0);
          }, 5000);
        }

        // Check for failures
        const failedBatch = queueData.find(q => q.status === 'failed');
        if (failedBatch) {
          clearInterval(pollInterval);
          setIsRefreshing(false);
          setRefreshStatus('error');
          setProgress(`Batch ${failedBatch.batch_number} failed`);
          
          toast({
            title: "Batch Failed",
            description: failedBatch.error_message || "A batch failed to complete.",
            variant: "destructive",
            duration: 5000,
          });
        }

        if (pollCount >= maxPolls) {
          clearInterval(pollInterval);
          setIsRefreshing(false);
          setRefreshStatus('error');
          setProgress('Polling timeout');
        }

      } catch (error) {
        console.error('Polling error:', error);
      }
    }, 5000); // Poll every 5 seconds
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
    if (isRefreshing && currentBatch > 0) return `Batch ${currentBatch}/${totalBatches}`;
    if (isRefreshing) return progress || "Starting...";
    if (refreshStatus === 'success') return `✓ ${toolsFound} tools`;
    if (refreshStatus === 'error') return "⚠ Failed";
    return "Fetch All Tools (18 URLs)";
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
          {currentBatch > 0 ? `Processing batch ${currentBatch}/3` : 'Initializing...'} {toolsFound > 0 && `• ${toolsFound} tools found`}
        </div>
      )}
    </div>
  );
};

export default BatchToolsRefreshButton;
