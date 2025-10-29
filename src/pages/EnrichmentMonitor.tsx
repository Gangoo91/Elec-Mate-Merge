import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { useToast } from "@/hooks/use-toast";
import { RefreshCw, Play, CheckCircle2, AlertCircle, Clock, TestTube2 } from "lucide-react";

interface BatchJob {
  id: string;
  job_type: string;
  status: string;
  total_batches: number;
  completed_batches: number;
  failed_batches: number;
  progress_percentage: number;
  created_at: string;
  started_at: string | null;
  completed_at: string | null;
  metadata: any;
}

export default function EnrichmentMonitor() {
  const [jobs, setJobs] = useState<BatchJob[]>([]);
  const [loading, setLoading] = useState(false);
  const [starting, setStarting] = useState(false);
  const { toast } = useToast();

  const fetchJobs = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase.functions.invoke('master-enrichment-scheduler', {
        body: { action: 'status' }
      });

      if (error) throw error;
      setJobs(data.jobs || []);
    } catch (error: any) {
      toast({
        title: "Error fetching jobs",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const startEnrichment = async (phase?: number) => {
    setStarting(true);
    try {
      const { data, error } = await supabase.functions.invoke('master-enrichment-scheduler', {
        body: { action: 'start', phase }
      });

      if (error) throw error;

      toast({
        title: "Enrichment Started",
        description: `Started ${data.tasks.length} enrichment tasks`,
      });

      fetchJobs();
    } catch (error: any) {
      toast({
        title: "Error starting enrichment",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setStarting(false);
    }
  };

  const continueEnrichment = async () => {
    try {
      const { error } = await supabase.functions.invoke('master-enrichment-scheduler', {
        body: { action: 'continue' }
      });

      if (error) throw error;

      toast({
        title: "Enrichment Continued",
        description: "Processing remaining batches",
      });

      fetchJobs();
    } catch (error: any) {
      toast({
        title: "Error continuing enrichment",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  const startTest = async () => {
    setStarting(true);
    try {
      const { error } = await supabase.functions.invoke('master-enrichment-scheduler', {
        body: { action: 'test' }
      });

      if (error) throw error;

      toast({
        title: "🧪 Test Mode Started",
        description: "Processing 100 documents across all enrichment tasks",
      });

      fetchJobs();
    } catch (error: any) {
      toast({
        title: "Error starting test",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setStarting(false);
    }
  };

  useEffect(() => {
    fetchJobs();
    const interval = setInterval(fetchJobs, 10000); // Refresh every 10s
    return () => clearInterval(interval);
  }, []);

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <CheckCircle2 className="h-5 w-5 text-green-500" />;
      case 'processing':
        return <RefreshCw className="h-5 w-5 text-blue-500 animate-spin" />;
      case 'failed':
        return <AlertCircle className="h-5 w-5 text-red-500" />;
      default:
        return <Clock className="h-5 w-5 text-gray-500" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'text-green-600';
      case 'processing':
        return 'text-blue-600';
      case 'failed':
        return 'text-red-600';
      default:
        return 'text-gray-600';
    }
  };

  return (
    <div className="container mx-auto p-6 max-w-6xl">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Universal Enrichment System</h1>
        <p className="text-muted-foreground">
          Enrich all knowledge bases with structured intelligence for AI agents
        </p>
      </div>

      <div className="grid gap-4 mb-8">
        <Card className="p-6">
          <h2 className="text-xl font-semibold mb-4">Quick Actions</h2>
          <div className="flex flex-wrap gap-3">
            <Button
              onClick={() => startEnrichment()}
              disabled={starting}
              size="lg"
            >
              <Play className="mr-2 h-4 w-4" />
              Start All Enrichment
            </Button>
            <Button
              onClick={startTest}
              disabled={starting}
              variant="secondary"
              size="lg"
            >
              <TestTube2 className="mr-2 h-4 w-4" />
              🧪 Run 100-Doc Test
            </Button>
            <Button
              onClick={() => startEnrichment(1)}
              disabled={starting}
              variant="outline"
            >
              Phase 1: Core (BS 7671, H&S, Install, Design)
            </Button>
            <Button
              onClick={() => startEnrichment(2)}
              disabled={starting}
              variant="outline"
            >
              Phase 2: Specialized (Test, Maint, PM)
            </Button>
            <Button
              onClick={continueEnrichment}
              variant="secondary"
            >
              <RefreshCw className="mr-2 h-4 w-4" />
              Continue Pending
            </Button>
            <Button
              onClick={fetchJobs}
              variant="ghost"
              disabled={loading}
            >
              <RefreshCw className={`mr-2 h-4 w-4 ${loading ? 'animate-spin' : ''}`} />
              Refresh
            </Button>
          </div>
        </Card>
      </div>

      <div className="space-y-4">
        {jobs.length === 0 ? (
          <Card className="p-8 text-center">
            <p className="text-muted-foreground">No enrichment jobs found. Start one above!</p>
          </Card>
        ) : (
          jobs.map((job) => (
            <Card key={job.id} className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  {getStatusIcon(job.status)}
                  <div>
                    <h3 className="font-semibold text-lg">
                      {job.metadata?.task_name || job.job_type}
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      {job.metadata?.source_table} → {job.metadata?.target_table}
                    </p>
                  </div>
                </div>
                <div className={`text-sm font-medium ${getStatusColor(job.status)}`}>
                  {job.status.toUpperCase()}
                </div>
              </div>

              <div className="space-y-3">
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span>Progress</span>
                    <span className="font-medium">{job.progress_percentage}%</span>
                  </div>
                  <Progress value={job.progress_percentage} />
                </div>

                <div className="grid grid-cols-3 gap-4 text-sm">
                  <div>
                    <span className="text-muted-foreground">Batches:</span>
                    <span className="ml-2 font-medium">
                      {job.completed_batches} / {job.total_batches}
                    </span>
                  </div>
                  {job.failed_batches > 0 && (
                    <div>
                      <span className="text-muted-foreground">Failed:</span>
                      <span className="ml-2 font-medium text-red-600">
                        {job.failed_batches}
                      </span>
                    </div>
                  )}
                  <div>
                    <span className="text-muted-foreground">Started:</span>
                    <span className="ml-2 font-medium">
                      {job.started_at ? new Date(job.started_at).toLocaleTimeString() : 'N/A'}
                    </span>
                  </div>
                </div>

                {job.completed_at && (
                  <p className="text-sm text-muted-foreground">
                    Completed: {new Date(job.completed_at).toLocaleString()}
                  </p>
                )}
              </div>
            </Card>
          ))
        )}
      </div>

      <Card className="mt-8 p-6 bg-muted/50">
        <h3 className="font-semibold mb-3">System Overview</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
          <div>
            <div className="text-muted-foreground">Total Jobs</div>
            <div className="text-2xl font-bold">{jobs.length}</div>
          </div>
          <div>
            <div className="text-muted-foreground">Completed</div>
            <div className="text-2xl font-bold text-green-600">
              {jobs.filter(j => j.status === 'completed').length}
            </div>
          </div>
          <div>
            <div className="text-muted-foreground">Processing</div>
            <div className="text-2xl font-bold text-blue-600">
              {jobs.filter(j => j.status === 'processing').length}
            </div>
          </div>
          <div>
            <div className="text-muted-foreground">Failed</div>
            <div className="text-2xl font-bold text-red-600">
              {jobs.filter(j => j.status === 'failed').length}
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}
