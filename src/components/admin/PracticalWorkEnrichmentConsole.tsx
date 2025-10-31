import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { MobileButton } from '@/components/ui/mobile-button';
import { toast } from 'sonner';
import { 
  Play, Database, GitMerge, CheckCircle2, AlertCircle, 
  Loader2, Activity, TrendingUp 
} from 'lucide-react';

interface EnrichmentStats {
  total_records: number;
  canonical_records: number;
  cluster_count: number;
  enriched_count: number;
  primary_complete: number;
  installation_complete: number;
  maintenance_complete: number;
  testing_complete: number;
  costing_complete: number;
}

export default function PracticalWorkEnrichmentConsole() {
  const [stats, setStats] = useState<EnrichmentStats>({
    total_records: 0,
    canonical_records: 0,
    cluster_count: 0,
    enriched_count: 0,
    primary_complete: 0,
    installation_complete: 0,
    maintenance_complete: 0,
    testing_complete: 0,
    costing_complete: 0
  });
  const [isLoading, setIsLoading] = useState(false);
  const [unificationRunning, setUnificationRunning] = useState(false);

  useEffect(() => {
    loadStats();
    const interval = setInterval(loadStats, 5000);
    return () => clearInterval(interval);
  }, []);

  const loadStats = async () => {
    try {
      // Get total and canonical counts
      const { count: totalCount } = await supabase
        .from('practical_work')
        .select('*', { count: 'exact', head: true });

      const { count: canonicalCount } = await supabase
        .from('practical_work')
        .select('*', { count: 'exact', head: true })
        .eq('is_canonical', true);

      const { count: clusterCount } = await supabase
        .from('practical_work_clusters')
        .select('*', { count: 'exact', head: true });

      const { count: enrichedCount } = await supabase
        .from('practical_work_intelligence')
        .select('*', { count: 'exact', head: true });

      // Count enrichment stage completeness by checking populated fields
      const { data: enrichmentData } = await supabase
        .from('practical_work_intelligence')
        .select('activity_types, installation_method, maintenance_intervals, test_procedures, typical_duration_minutes');

      const stageCounts = {
        primary: 0,
        installation: 0,
        maintenance: 0,
        testing: 0,
        costing: 0
      };

      enrichmentData?.forEach(record => {
        if (record.activity_types && record.activity_types.length > 0) stageCounts.primary++;
        if (record.installation_method) stageCounts.installation++;
        if (record.maintenance_intervals) stageCounts.maintenance++;
        if (record.test_procedures && record.test_procedures.length > 0) stageCounts.testing++;
        if (record.typical_duration_minutes) stageCounts.costing++;
      });

      setStats({
        total_records: totalCount || 0,
        canonical_records: canonicalCount || 0,
        cluster_count: clusterCount || 0,
        enriched_count: enrichedCount || 0,
        primary_complete: stageCounts.primary,
        installation_complete: stageCounts.installation,
        maintenance_complete: stageCounts.maintenance,
        testing_complete: stageCounts.testing,
        costing_complete: stageCounts.costing
      });
    } catch (error) {
      console.error('Failed to load stats:', error);
    }
  };

  const runUnification = async () => {
    setUnificationRunning(true);
    try {
      const { data, error } = await supabase.functions.invoke('practical-work-unify', {
        body: { action: 'unify' }
      });

      if (error) throw error;

      toast.success(`Unification complete: ${data.canonical_count} canonical records created`);
      loadStats();
    } catch (error: any) {
      toast.error(`Unification failed: ${error.message}`);
    } finally {
      setUnificationRunning(false);
    }
  };

  const startEnrichmentJob = async (jobType: string, label: string) => {
    setIsLoading(true);
    try {
      const { data, error } = await supabase.functions.invoke('master-enrichment-scheduler', {
        body: { 
          action: 'start',
          scope: 'single',
          jobType,
          workers: jobType === 'enrich-practical-work-primary' ? 6 : 3,
          chunkSize: 15
        }
      });

      if (error) throw error;

      toast.success(`${label} job started`);
      loadStats();
    } catch (error: any) {
      toast.error(`Failed to start ${label}: ${error.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  const progress = stats.canonical_records > 0 
    ? Math.round((stats.enriched_count / stats.canonical_records) * 100) 
    : 0;

  return (
    <div className="space-y-6">
      <Card className="border-elec-yellow/20 bg-elec-gray">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <GitMerge className="h-5 w-5 text-elec-yellow" />
            Practical Work Enrichment Pipeline
          </CardTitle>
          <CardDescription>
            Multi-pass enrichment: Unification → Primary → Specialist Passes
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <StatCard 
              label="Total Records" 
              value={stats.total_records.toLocaleString()} 
              icon={Database}
            />
            <StatCard 
              label="Canonical (Unique)" 
              value={stats.canonical_records.toLocaleString()} 
              icon={CheckCircle2}
              highlight
            />
            <StatCard 
              label="Clusters" 
              value={stats.cluster_count.toLocaleString()} 
              icon={GitMerge}
            />
            <StatCard 
              label="Enriched" 
              value={`${progress}%`} 
              icon={TrendingUp}
              highlight
            />
          </div>
        </CardContent>
      </Card>

      <Tabs defaultValue="unify" className="w-full">
        <TabsList className="grid grid-cols-3">
          <TabsTrigger value="unify">1️⃣ Unification</TabsTrigger>
          <TabsTrigger value="primary">2️⃣ Primary</TabsTrigger>
          <TabsTrigger value="specialist">3️⃣ Specialist</TabsTrigger>
        </TabsList>

        <TabsContent value="unify" className="space-y-4">
          <Card className="border-elec-yellow/20 bg-elec-gray">
            <CardHeader>
              <CardTitle>Step 1: Unification & Deduplication</CardTitle>
              <CardDescription>
                Cluster duplicates and identify {stats.total_records.toLocaleString()} → ~10,250 canonical records
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <div className="text-sm text-muted-foreground">Canonical Records</div>
                  <div className="text-2xl font-bold">{stats.canonical_records.toLocaleString()}</div>
                </div>
                <div>
                  <div className="text-sm text-muted-foreground">Duplicates Removed</div>
                  <div className="text-2xl font-bold">
                    {(stats.total_records - stats.canonical_records).toLocaleString()}
                  </div>
                </div>
              </div>

              <MobileButton
                onClick={runUnification}
                disabled={unificationRunning || stats.canonical_records > 0}
                variant="default"
                className="w-full"
              >
                {unificationRunning ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Running Unification...
                  </>
                ) : stats.canonical_records > 0 ? (
                  <>
                    <CheckCircle2 className="mr-2 h-4 w-4" />
                    Unification Complete
                  </>
                ) : (
                  <>
                    <Play className="mr-2 h-4 w-4" />
                    Run Unification
                  </>
                )}
              </MobileButton>

              {stats.canonical_records === 0 && (
                <div className="text-sm text-muted-foreground">
                  ⚠️ Run unification first before primary enrichment
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="primary" className="space-y-4">
          <Card className="border-elec-yellow/20 bg-elec-gray">
            <CardHeader>
              <CardTitle>Step 2: Primary Enrichment</CardTitle>
              <CardDescription>
                Core intelligence: activity types, equipment, BS 7671 zones, complexity
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <EnrichmentProgress 
                completed={stats.primary_complete}
                total={stats.canonical_records}
                label="Primary Enrichment"
              />

              <MobileButton
                onClick={() => startEnrichmentJob('enrich-practical-work-primary', 'Primary Enrichment')}
                disabled={isLoading || stats.canonical_records === 0}
                variant="default"
                className="w-full"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Starting...
                  </>
                ) : (
                  <>
                    <Play className="mr-2 h-4 w-4" />
                    Start Primary Enrichment (6 workers)
                  </>
                )}
              </MobileButton>

              {stats.canonical_records === 0 && (
                <div className="text-sm text-yellow-600">
                  ⚠️ Complete unification first
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="specialist" className="space-y-4">
          <Card className="border-elec-yellow/20 bg-elec-gray">
            <CardHeader>
              <CardTitle>Step 3: Specialist Enrichment (Parallel)</CardTitle>
              <CardDescription>
                Activity-specific enrichment: Installation, Maintenance, Testing, Costing
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <SpecialistJobCard
                label="Installation Specialist"
                description="Fixing intervals, cable routes, termination methods"
                completed={stats.installation_complete}
                total={stats.canonical_records}
                onStart={() => startEnrichmentJob('enrich-practical-installation', 'Installation Specialist')}
                isLoading={isLoading}
                disabled={stats.primary_complete === 0}
              />

              <SpecialistJobCard
                label="Maintenance Specialist"
                description="Maintenance intervals, common defects, degradation signs"
                completed={stats.maintenance_complete}
                total={stats.canonical_records}
                onStart={() => startEnrichmentJob('enrich-practical-maintenance', 'Maintenance Specialist')}
                isLoading={isLoading}
                disabled={stats.primary_complete === 0}
              />

              <SpecialistJobCard
                label="Testing Specialist"
                description="Test procedures, equipment, acceptance criteria, EICR codes"
                completed={stats.testing_complete}
                total={stats.canonical_records}
                onStart={() => startEnrichmentJob('enrich-practical-testing', 'Testing Specialist')}
                isLoading={isLoading}
                disabled={stats.primary_complete === 0}
              />

              <SpecialistJobCard
                label="Cost Engineer"
                description="Duration estimates, material requirements, labour categories"
                completed={stats.costing_complete}
                total={stats.canonical_records}
                onStart={() => startEnrichmentJob('enrich-practical-costing', 'Cost Engineer')}
                isLoading={isLoading}
                disabled={stats.primary_complete === 0}
              />

              {stats.primary_complete === 0 && (
                <div className="text-sm text-yellow-600">
                  ⚠️ Complete primary enrichment before running specialist passes
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}

function StatCard({ label, value, icon: Icon, highlight }: any) {
  return (
    <div className={`p-4 rounded-lg border ${highlight ? 'border-elec-yellow/30 bg-elec-yellow/5' : 'border-white/10'}`}>
      <div className="flex items-center gap-2 mb-1">
        <Icon className="h-4 w-4 text-muted-foreground" />
        <div className="text-xs text-muted-foreground">{label}</div>
      </div>
      <div className={`text-2xl font-bold ${highlight ? 'text-elec-yellow' : ''}`}>{value}</div>
    </div>
  );
}

function EnrichmentProgress({ completed, total, label }: any) {
  const percentage = total > 0 ? Math.round((completed / total) * 100) : 0;
  
  return (
    <div>
      <div className="flex justify-between text-sm mb-2">
        <span>{label}</span>
        <span className="text-muted-foreground">{completed.toLocaleString()} / {total.toLocaleString()}</span>
      </div>
      <div className="h-2 bg-white/10 rounded-full overflow-hidden">
        <div 
          className="h-full bg-elec-yellow transition-all duration-500"
          style={{ width: `${percentage}%` }}
        />
      </div>
      <div className="text-xs text-muted-foreground mt-1">{percentage}% complete</div>
    </div>
  );
}

function SpecialistJobCard({ label, description, completed, total, onStart, isLoading, disabled }: any) {
  const percentage = total > 0 ? Math.round((completed / total) * 100) : 0;

  return (
    <div className="border border-white/10 rounded-lg p-4 space-y-3">
      <div className="flex items-start justify-between">
        <div>
          <div className="font-medium">{label}</div>
          <div className="text-sm text-muted-foreground">{description}</div>
        </div>
        <Badge variant={percentage === 100 ? 'default' : 'outline'}>
          {percentage}%
        </Badge>
      </div>

      <div className="h-1.5 bg-white/10 rounded-full overflow-hidden">
        <div 
          className="h-full bg-elec-yellow transition-all duration-500"
          style={{ width: `${percentage}%` }}
        />
      </div>

      <MobileButton
        onClick={onStart}
        disabled={isLoading || disabled || percentage === 100}
        variant="outline"
        size="sm"
        className="w-full"
      >
        {percentage === 100 ? (
          <>
            <CheckCircle2 className="mr-2 h-4 w-4" />
            Complete
          </>
        ) : (
          <>
            <Play className="mr-2 h-4 w-4" />
            Start (3 workers)
          </>
        )}
      </MobileButton>
    </div>
  );
}
