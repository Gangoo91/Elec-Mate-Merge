import { useEffect, useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { Loader2, CheckCircle2, XCircle, PlayCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface RegulationsIntelligenceProgressProps {
  jobType?: string;
}

export default function RegulationsIntelligenceProgress({ 
  jobType = 'enrich_bs7671_embeddings'
}: RegulationsIntelligenceProgressProps) {
  const [status, setStatus] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isRecovering, setIsRecovering] = useState(false);
  const [rowCount, setRowCount] = useState<number>(0);
  const { toast } = useToast();

  const fetchStatus = async () => {
    try {
      // Get job progress
      const { data: jobData } = await supabase
        .from('batch_jobs')
        .select('*, batch_progress(*)')
        .eq('job_type', jobType)
        .order('created_at', { ascending: false })
        .limit(1)
        .maybeSingle();

      // Get row count from regulations_intelligence
      const { count } = await supabase
        .from('regulations_intelligence')
        .select('*', { count: 'exact', head: true });

      setRowCount(count || 0);

      if (jobData) {
        const completedBatches = jobData.batch_progress?.filter((b: any) => b.status === 'completed').length || 0;
        const processingBatches = jobData.batch_progress?.filter((b: any) => b.status === 'processing').length || 0;
        const failedBatches = jobData.batch_progress?.filter((b: any) => b.status === 'failed').length || 0;
        
        const latestProgress = jobData.batch_progress?.[0];
        const processed = latestProgress?.items_processed || 0;
        const progressData = latestProgress?.data as any;
        const failed = progressData?.failed || 0;
        const skipped = progressData?.skipped || 0;
        const avgTime = progressData?.avg_processing_time_ms || 0;

        setStatus({
          status: jobData.status,
          total: jobData.total_batches * 50, // Estimate based on batch size
          processed,
          failed,
          skipped,
          totalBatches: jobData.total_batches,
          completedBatches,
          processingBatches,
          failedBatches,
          avgProcessingTime: avgTime,
          lastUpdate: latestProgress?.created_at,
          jobId: jobData.id
        });
      } else {
        setStatus(null);
      }
    } catch (error) {
      console.error('Error fetching status:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleUnstickAndResume = async () => {
    setIsRecovering(true);
    try {
      // Step 1: Recover stuck batches
      const { error: recoverError } = await supabase.functions.invoke('master-enrichment-scheduler', {
        body: { action: 'recover' }
      });

      if (recoverError) throw recoverError;

      // Step 2: Start continuous processing for the specific job
      const { error: startError } = await supabase.functions.invoke('master-enrichment-scheduler', {
        body: { 
          action: 'start',
          scope: 'single',
          jobType: jobType
        }
      });

      if (startError) throw startError;

      toast({
        title: "Continuous processing started",
        description: "BS 7671 enrichment worker is now running continuously",
      });

      // Refresh status
      setTimeout(() => fetchStatus(), 2000);
    } catch (error: any) {
      console.error('Recovery error:', error);
      toast({
        title: "Failed to start processing",
        description: error.message,
        variant: "destructive"
      });
    } finally {
      setIsRecovering(false);
    }
  };

  useEffect(() => {
    fetchStatus();
    
    // Poll every 5 seconds if processing
    const interval = setInterval(() => {
      if (status?.status === 'processing') {
        fetchStatus();
      }
    }, 5000);

    return () => clearInterval(interval);
  }, [status?.status]);

  if (isLoading) {
    return (
      <Card>
        <CardContent className="pt-6">
          <div className="flex items-center justify-center gap-2">
            <Loader2 className="h-4 w-4 animate-spin" />
            <span className="text-sm text-muted-foreground">Loading status...</span>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (!status) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>BS 7671 Intelligence</CardTitle>
          <CardDescription>No active enrichment job found</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">
            {rowCount > 0 ? `${rowCount.toLocaleString()} regulations enriched` : 'No regulations enriched yet'}
          </p>
        </CardContent>
      </Card>
    );
  }

  const percentage = status.total > 0 ? (status.processed / status.total) * 100 : 0;
  const eta = status.avgProcessingTime > 0 && status.total > status.processed
    ? ((status.total - status.processed) * status.avgProcessingTime / 1000 / 60).toFixed(1)
    : null;

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          {status.status === "completed" && <CheckCircle2 className="h-5 w-5 text-green-500" />}
          {status.status === "failed" && <XCircle className="h-5 w-5 text-destructive" />}
          {status.status === "processing" && <Loader2 className="h-5 w-5 animate-spin" />}
          BS 7671 Intelligence Enrichment
        </CardTitle>
        <CardDescription>
          {rowCount.toLocaleString()} regulations in database
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Progress</span>
            <span className="font-medium">{percentage.toFixed(1)}%</span>
          </div>
          <Progress value={percentage} className="h-2" />
          <div className="flex justify-between text-xs text-muted-foreground">
            <span>{status.processed.toLocaleString()} / {status.total.toLocaleString()} processed</span>
            {eta && <span>ETA: {eta} min</span>}
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
          <div>
            <p className="text-muted-foreground">Batches</p>
            <p className="font-medium">{status.completedBatches} / {status.totalBatches}</p>
          </div>
          <div>
            <p className="text-muted-foreground">Processing</p>
            <p className="font-medium">{status.processingBatches}</p>
          </div>
          <div>
            <p className="text-muted-foreground">Failed</p>
            <p className="font-medium">{status.failed}</p>
          </div>
          <div>
            <p className="text-muted-foreground">Skipped</p>
            <p className="font-medium">{status.skipped}</p>
          </div>
        </div>

        {status.lastUpdate && (
          <p className="text-xs text-muted-foreground">
            Last update: {new Date(status.lastUpdate).toLocaleTimeString()}
          </p>
        )}

        {status.status === "completed" && (
          <div className="text-sm text-green-600 dark:text-green-400">
            ✓ Enrichment completed successfully
          </div>
        )}

        {status.status === "failed" && (
          <div className="text-sm text-destructive">
            ✗ Enrichment failed - check logs for details
          </div>
        )}

        {(status.status === "processing" || status.processingBatches > 0) && (
          <Button
            variant="outline"
            size="sm"
            onClick={handleUnstickAndResume}
            disabled={isRecovering}
            className="w-full"
          >
            {isRecovering ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Recovering...
              </>
            ) : (
              <>
                <PlayCircle className="mr-2 h-4 w-4" />
                Keep Processing
              </>
            )}
          </Button>
        )}
      </CardContent>
    </Card>
  );
}
