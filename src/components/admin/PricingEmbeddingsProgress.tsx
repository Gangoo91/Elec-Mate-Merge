import { useEffect, useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { Loader2, CheckCircle2, XCircle, RefreshCw } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface PricingEmbeddingsProgressProps {
  jobId?: string;
  cacheId?: string;
  onRetry?: () => void;
}

export default function PricingEmbeddingsProgress({ 
  jobId, 
  cacheId,
  onRetry 
}: PricingEmbeddingsProgressProps) {
  const [status, setStatus] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  const fetchStatus = async () => {
    try {
      const { data, error } = await supabase.functions.invoke('pricing-embeddings-status', {
        body: { job_id: jobId, cache_id: cacheId }
      });

      if (error) throw error;
      setStatus(data);
    } catch (error) {
      console.error('Failed to fetch status:', error);
      toast({
        title: "Status check failed",
        description: "Could not retrieve embedding progress",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (!jobId && !cacheId) {
      setIsLoading(false);
      return;
    }

    fetchStatus();

    // Poll every 3 seconds while processing
    const interval = setInterval(() => {
      if (status?.status === 'processing') {
        fetchStatus();
      }
    }, 3000);

    return () => clearInterval(interval);
  }, [jobId, cacheId, status?.status]);

  if (isLoading) {
    return (
      <Card>
        <CardContent className="pt-6 flex items-center justify-center">
          <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
        </CardContent>
      </Card>
    );
  }

  if (!status) {
    return null;
  }

  const percentage = status.progress_percentage || 0;
  const isProcessing = status.status === 'processing';
  const isCompleted = status.status === 'completed';
  const isFailed = status.status === 'failed';

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <CardTitle className="text-lg">Pricing Embeddings</CardTitle>
            {isProcessing && <Loader2 className="h-4 w-4 animate-spin text-primary" />}
            {isCompleted && <CheckCircle2 className="h-4 w-4 text-green-600" />}
            {isFailed && <XCircle className="h-4 w-4 text-destructive" />}
          </div>
          {onRetry && (
            <Button variant="outline" size="sm" onClick={onRetry}>
              <RefreshCw className="h-3 w-3 mr-1" />
              Retry
            </Button>
          )}
        </div>
        <CardDescription>
          {isProcessing && `Processing ${status.processed.toLocaleString()} of ${status.total.toLocaleString()} products`}
          {isCompleted && `Successfully processed ${status.processed.toLocaleString()} products`}
          {isFailed && `Failed: ${status.error_message || 'Unknown error'}`}
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <Progress value={percentage} className="h-2" />
        
        <div className="grid grid-cols-4 gap-4 text-sm">
          <div>
            <p className="text-muted-foreground">Total</p>
            <p className="font-semibold">{status.total.toLocaleString()}</p>
          </div>
          <div>
            <p className="text-muted-foreground">Processed</p>
            <p className="font-semibold text-primary">{status.processed.toLocaleString()}</p>
          </div>
          <div>
            <p className="text-muted-foreground">Errors</p>
            <p className="font-semibold text-destructive">{status.errors.toLocaleString()}</p>
          </div>
          <div>
            <p className="text-muted-foreground">Skipped</p>
            <p className="font-semibold text-muted-foreground">{status.skipped.toLocaleString()}</p>
          </div>
        </div>

        {isCompleted && status.completed_at && (
          <p className="text-xs text-muted-foreground">
            Completed: {new Date(status.completed_at).toLocaleString()}
          </p>
        )}
      </CardContent>
    </Card>
  );
}
