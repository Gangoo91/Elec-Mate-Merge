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

  const pollForCacheUpdate = async (expectedCount: number, maxAttempts = 5): Promise<boolean> => {
    console.log(`🔍 [UPDATE-FLOW] Polling for cache update (expecting ${expectedCount} products)...`);
    
    for (let attempt = 1; attempt <= maxAttempts; attempt++) {
      await new Promise(resolve => setTimeout(resolve, 1000)); // Wait 1 second between polls
      
      const { data, error } = await supabase
        .from('tools_weekly_cache')
        .select('total_products, created_at')
        .order('created_at', { ascending: false })
        .limit(1)
        .single();
      
      if (!error && data) {
        const totalInCache = (data as any).total_products || 0;
        console.log(`📊 [UPDATE-FLOW] Poll ${attempt}/${maxAttempts}: ${totalInCache} products in cache`);
        
        if (totalInCache >= expectedCount) {
          console.log(`✅ [UPDATE-FLOW] Cache verified with ${totalInCache} products!`);
          return true;
        }
      }
    }
    
    console.warn(`⚠️ [UPDATE-FLOW] Cache verification timeout after ${maxAttempts} attempts`);
    return false;
  };

  const handleRefresh = async () => {
    setIsRefreshing(true);
    setRefreshStatus('idle');
    setProgress('Starting update...');
    setToolsFound(0);
    setCurrentBatch(0);
    
    try {
      console.log('🔧 [UPDATE-FLOW] Button clicked - starting tools refresh');
      
      toast({
        title: "Tools Update Started",
        description: "Scraping and merging all tool categories. This may take 1-2 minutes...",
        duration: 3000,
      });

      setProgress('Scraping batches...');
      
      // Call the weekly refresh function which handles batches + merge
      const { data, error } = await supabase.functions.invoke('tools-weekly-refresh', {
        body: { forceRefresh: true }
      });

      if (error) {
        console.error('❌ [UPDATE-FLOW] Refresh error:', error);
        setRefreshStatus('error');
        setProgress('Failed');
        
        toast({
          title: "Update Failed",
          description: error.message || "Failed to update tools data. Please try again.",
          variant: "destructive",
          duration: 5000,
        });
        setIsRefreshing(false);
        return;
      }

      console.log('📊 [UPDATE-FLOW] Refresh response:', data);

      // Check if the response indicates failure
      if (data && data.success === false) {
        console.warn('⚠️ [UPDATE-FLOW] Refresh returned success=false:', data.message);
        setRefreshStatus('error');
        setProgress('No products found');
        
        toast({
          title: "Update Issue",
          description: data.message || "No products found. Data may still be collecting.",
          variant: "destructive",
          duration: 5000,
        });
        setIsRefreshing(false);
        return;
      }

      // Extract product count
      const toolsCount = data?.totalFound || data?.tools?.length || 0;
      setToolsFound(toolsCount);
      
      if (toolsCount === 0) {
        console.warn('⚠️ [UPDATE-FLOW] No products in response');
        setRefreshStatus('error');
        setProgress('No products found');
        
        toast({
          title: "Warning",
          description: "No products found. The data is being collected. Please try again in a few minutes.",
          variant: "destructive",
          duration: 5000,
        });
      } else {
        console.log(`✅ [UPDATE-FLOW] Success: ${toolsCount} products found`);
        setRefreshStatus('success');
        
        // Show detailed breakdown if available
        const categoriesInfo = data?.categoriesFound 
          ? ` (${data.categoriesFound}/${data.totalCategories} categories)`
          : '';
        
        toast({
          title: "Tools Updated Successfully!",
          description: `Found ${toolsCount} products${categoriesInfo}`,
          variant: "success",
          duration: 5000,
        });
        
        // Poll for cache update before invalidating queries
        setProgress('Verifying cache...');
        const cacheVerified = await pollForCacheUpdate(toolsCount);
        
        if (cacheVerified) {
          setProgress(`${toolsCount} products verified`);
          console.log('🔄 [UPDATE-FLOW] Cache verified - invalidating queries...');
          onSuccess();
          console.log('✅ [UPDATE-FLOW] Complete!');
        } else {
          setProgress(`${toolsCount} products (verifying...)`);
          console.log('⚠️ [UPDATE-FLOW] Cache verification incomplete - invalidating anyway...');
          onSuccess();
        }
      }
      
      setIsRefreshing(false);
      
      // Reset status after 5 seconds
      setTimeout(() => {
        setRefreshStatus('idle');
        setProgress('');
      }, 5000);
      
    } catch (error) {
      console.error('❌ [UPDATE-FLOW] Unexpected error:', error);
      setRefreshStatus('error');
      setProgress('Error occurred');
      setIsRefreshing(false);
      
      toast({
        title: "Update Failed", 
        description: error instanceof Error ? error.message : "An unexpected error occurred.",
        variant: "destructive",
        duration: 5000,
      });
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
    if (isRefreshing) return "Updating...";
    if (refreshStatus === 'success' && toolsFound > 0) return `✓ ${toolsFound} tools`;
    if (refreshStatus === 'error') return "⚠ Failed";
    return "Update Tools Data";
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
      {(isRefreshing || progress) && (
        <div className="text-xs text-muted-foreground">
          {progress}
        </div>
      )}
    </div>
  );
};

export default BatchToolsRefreshButton;
