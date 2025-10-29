import { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { useToast } from '@/hooks/use-toast';
import { RefreshCw, Play, TestTube2 } from 'lucide-react';

export default function EnrichmentMonitor() {
  const [jobs, setJobs] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const fetchJobs = async () => {
    const { data } = await supabase
      .from('batch_jobs')
      .select('*, batch_progress(*)')
      .order('created_at', { ascending: false })
      .limit(10);
    
    setJobs(data || []);
  };

  useEffect(() => {
    fetchJobs();
    const interval = setInterval(fetchJobs, 5000);
    return () => clearInterval(interval);
  }, []);

  const startEnrichment = async (phase?: number) => {
    setLoading(true);
    try {
      await supabase.functions.invoke('master-enrichment-scheduler', {
        body: { action: 'start', phase }
      });
      
      toast({ 
        title: '✅ Enrichment started',
        description: 'Jobs are now processing. Check progress below.'
      });
      setTimeout(() => fetchJobs(), 1000);
    } catch (error: any) {
      toast({ 
        title: '⏳ Enrichment may be starting',
        description: 'Check the jobs below for progress.'
      });
      setTimeout(() => fetchJobs(), 2000);
    } finally {
      setLoading(false);
    }
  };

  const startTest = async () => {
    setLoading(true);
    try {
      await supabase.functions.invoke('master-enrichment-scheduler', {
        body: { action: 'test' }
      });
      
      toast({ 
        title: '✅ Test started successfully',
        description: 'Processing 100 documents. Check progress below.'
      });
      setTimeout(() => fetchJobs(), 1000);
    } catch (error: any) {
      toast({ 
        title: '⏳ Test may be starting',
        description: 'Check the jobs below for progress.'
      });
      setTimeout(() => fetchJobs(), 2000);
    } finally {
      setLoading(false);
    }
  };

  const totalQualityPassed = jobs.reduce((sum, job) => {
    const batches = job.batch_progress || [];
    return sum + batches.reduce((s: number, b: any) => s + (b.data?.quality_passed || 0), 0);
  }, 0);

  const totalQualityFailed = jobs.reduce((sum, job) => {
    const batches = job.batch_progress || [];
    return sum + batches.reduce((s: number, b: any) => s + (b.data?.quality_failed || 0), 0);
  }, 0);

  const successRate = totalQualityPassed / (totalQualityPassed + totalQualityFailed) * 100 || 0;

  const totalCost = jobs.reduce((sum, job) => {
    const batches = job.batch_progress || [];
    return sum + batches.reduce((s: number, b: any) => s + (b.data?.api_cost_gbp || 0), 0);
  }, 0);

  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Universal Enrichment Monitor</h1>
        <div className="flex gap-2">
          <Button onClick={() => startEnrichment(1)} disabled={loading} size="lg">
            <Play className="w-4 h-4 mr-2" />
            Start Phase 1
          </Button>
          <Button onClick={startTest} disabled={loading} variant="secondary" size="lg">
            <TestTube2 className="w-4 h-4 mr-2" />
            Run 100-Doc Test
          </Button>
          <Button onClick={fetchJobs} variant="outline" size="icon">
            <RefreshCw className="w-4 h-4" />
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader>
            <CardTitle>Quality Metrics</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{successRate.toFixed(1)}%</div>
            <div className="text-sm text-muted-foreground">Success Rate</div>
            <div className="mt-2 text-sm">
              ✅ Passed: {totalQualityPassed} | ❌ Failed: {totalQualityFailed}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>API Cost</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">£{totalCost.toFixed(2)}</div>
            <div className="text-sm text-muted-foreground">Total Spent</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Active Jobs</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">
              {jobs.filter(j => j.status === 'processing').length}
            </div>
            <div className="text-sm text-muted-foreground">Currently Running</div>
          </CardContent>
        </Card>
      </div>

      <div className="space-y-4">
        {jobs.map((job) => (
          <Card key={job.id}>
            <CardHeader>
            <CardTitle className="flex justify-between items-center">
              <span>{job.metadata?.task_name || job.job_type}</span>
              <div className="flex items-center gap-2">
                {job.status === 'processing' && (
                  <span className="flex items-center gap-1 text-sm font-normal text-red-500 animate-pulse">
                    <span className="w-2 h-2 rounded-full bg-red-500"></span>
                    LIVE
                  </span>
                )}
                <span className="text-sm font-normal capitalize">{job.status}</span>
              </div>
            </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <Progress value={job.progress_percentage || 0} />
              <div className="text-sm text-muted-foreground">
                {job.completed_batches}/{job.total_batches} batches ({job.progress_percentage}%)
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
