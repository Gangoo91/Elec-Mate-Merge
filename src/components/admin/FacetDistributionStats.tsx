import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { BarChart3, RefreshCw, Download } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

interface FacetRange {
  range: string;
  count: number;
  color: string;
  label: string;
}

interface DistributionStats {
  totalFacets: number;
  totalSources: number;
  avgPerSource: number;
  minFacets: number;
  maxFacets: number;
  qualityScore: number;
  ranges: FacetRange[];
}

export const FacetDistributionStats = () => {
  const [stats, setStats] = useState<DistributionStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [lastUpdate, setLastUpdate] = useState<Date>(new Date());
  const { toast } = useToast();

  const fetchDistribution = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase.rpc('get_facet_distribution_stats');
      
      if (error) throw error;

      if (data && data.length > 0) {
        const result = data[0];
        
        // Parse the ranges from the result
        const ranges: FacetRange[] = [
          { range: 'under_8', count: result.under_8 || 0, color: 'bg-red-500', label: 'Under 8' },
          { range: 'exactly_8', count: result.exactly_8 || 0, color: 'bg-yellow-500', label: 'Exactly 8' },
          { range: 'range_9_20', count: result.range_9_20 || 0, color: 'bg-green-500', label: '9-20' },
          { range: 'range_21_50', count: result.range_21_50 || 0, color: 'bg-blue-500', label: '21-50' },
          { range: 'range_51_100', count: result.range_51_100 || 0, color: 'bg-purple-500', label: '51-100' },
          { range: 'range_101_200', count: result.range_101_200 || 0, color: 'bg-orange-500', label: '101-200' },
          { range: 'over_200', count: result.over_200 || 0, color: 'bg-gray-500', label: '200+' },
        ];

        setStats({
          totalFacets: result.total_facets || 0,
          totalSources: result.total_sources || 0,
          avgPerSource: result.avg_per_source || 0,
          minFacets: result.min_facets || 0,
          maxFacets: result.max_facets || 0,
          qualityScore: result.quality_score || 0,
          ranges
        });
        setLastUpdate(new Date());
      }
    } catch (error) {
      console.error('Error fetching distribution:', error);
      toast({
        title: 'Error',
        description: 'Failed to fetch facet distribution',
        variant: 'destructive'
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDistribution();
  }, []);

  const handleExport = () => {
    if (!stats) return;

    const csv = [
      'Range,Count,Percentage',
      ...stats.ranges.map(r => 
        `"${r.label}",${r.count},${((r.count / stats.totalSources) * 100).toFixed(2)}%`
      )
    ].join('\n');

    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `facet-distribution-${new Date().toISOString()}.csv`;
    a.click();
    URL.revokeObjectURL(url);

    toast({
      title: 'Exported',
      description: 'Facet distribution exported as CSV'
    });
  };

  if (loading && !stats) {
    return (
      <Card className="border-elec-yellow/20 bg-elec-gray">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-lg">
            <BarChart3 className="w-5 h-5" />
            Facet Distribution
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="animate-pulse space-y-3">
            <div className="h-8 bg-elec-dark/50 rounded" />
            <div className="h-8 bg-elec-dark/50 rounded" />
            <div className="h-8 bg-elec-dark/50 rounded" />
          </div>
        </CardContent>
      </Card>
    );
  }

  if (!stats) return null;

  const maxCount = Math.max(...stats.ranges.map(r => r.count));

  return (
    <Card className="border-elec-yellow/20 bg-elec-gray">
      <CardHeader>
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <CardTitle className="flex items-center gap-2 text-lg">
            <BarChart3 className="w-5 h-5 text-elec-yellow" />
            Facet Distribution
          </CardTitle>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={fetchDistribution}
              disabled={loading}
              className="border-elec-yellow/30 hover:bg-elec-yellow/10"
            >
              <RefreshCw className={`w-4 h-4 mr-2 ${loading ? 'animate-spin' : ''}`} />
              Refresh
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={handleExport}
              className="border-elec-yellow/30 hover:bg-elec-yellow/10"
            >
              <Download className="w-4 h-4 mr-2" />
              Export
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Key Metrics */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
          <div className="bg-elec-dark/50 rounded-lg p-3">
            <div className="text-xs text-muted-foreground mb-1">Total Facets</div>
            <div className="text-lg font-bold text-elec-yellow">
              {stats.totalFacets.toLocaleString()}
            </div>
          </div>
          <div className="bg-elec-dark/50 rounded-lg p-3">
            <div className="text-xs text-muted-foreground mb-1">Sources</div>
            <div className="text-lg font-bold">
              {stats.totalSources.toLocaleString()}
            </div>
          </div>
          <div className="bg-elec-dark/50 rounded-lg p-3">
            <div className="text-xs text-muted-foreground mb-1">Avg/Source</div>
            <div className="text-lg font-bold">
              {stats.avgPerSource.toFixed(1)}
            </div>
          </div>
          <div className="bg-elec-dark/50 rounded-lg p-3">
            <div className="text-xs text-muted-foreground mb-1">Min → Max</div>
            <div className="text-sm font-bold">
              {stats.minFacets} → {stats.maxFacets}
            </div>
          </div>
          <div className="bg-elec-dark/50 rounded-lg p-3">
            <div className="text-xs text-muted-foreground mb-1">Quality</div>
            <div className="text-lg font-bold text-green-400">
              {stats.qualityScore.toFixed(1)}%
            </div>
          </div>
          <div className="bg-elec-dark/50 rounded-lg p-3">
            <div className="text-xs text-muted-foreground mb-1">Incomplete</div>
            <div className="text-lg font-bold text-red-400">
              {stats.ranges[0].count}
            </div>
          </div>
        </div>

        {/* Distribution Chart */}
        <div className="space-y-3">
          <div className="text-sm font-medium text-muted-foreground">
            Distribution by Facet Count Ranges
          </div>
          {stats.ranges.map((range) => {
            const percentage = stats.totalSources > 0 
              ? (range.count / stats.totalSources) * 100 
              : 0;
            const barWidth = maxCount > 0 
              ? (range.count / maxCount) * 100 
              : 0;

            return (
              <div key={range.range} className="space-y-1">
                <div className="flex items-center justify-between text-sm">
                  <span className="font-medium min-w-[80px]">{range.label}</span>
                  <span className="text-muted-foreground">
                    {range.count.toLocaleString()} ({percentage.toFixed(1)}%)
                  </span>
                </div>
                <div className="h-6 bg-elec-dark/50 rounded-full overflow-hidden">
                  <div
                    className={`h-full ${range.color} transition-all duration-500 ease-out flex items-center justify-end px-2`}
                    style={{ width: `${barWidth}%` }}
                  >
                    {barWidth > 15 && (
                      <span className="text-xs font-bold text-white">
                        {range.count}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Last Updated */}
        <div className="text-xs text-muted-foreground text-center pt-2 border-t border-elec-yellow/10">
          Last updated: {lastUpdate.toLocaleTimeString()}
        </div>
      </CardContent>
    </Card>
  );
};
