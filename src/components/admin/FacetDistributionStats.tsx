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
      // Query practical_work_intelligence and calculate distribution
      const { data: facetData, error } = await supabase
        .from('practical_work_intelligence')
        .select('practical_work_id')
        .eq('facet_type', 'primary');
      
      if (error) throw error;

      if (!facetData || facetData.length === 0) {
        setStats(null);
        setLoading(false);
        return;
      }

      // Count facets per source (practical_work_id)
      const facetCounts = facetData.reduce((acc, row) => {
        acc[row.practical_work_id] = (acc[row.practical_work_id] || 0) + 1;
        return acc;
      }, {} as Record<string, number>);

      const counts = Object.values(facetCounts);
      const totalFacets = facetData.length;
      const totalSources = counts.length;
      const avgPerSource = counts.reduce((a, b) => a + b, 0) / totalSources;
      const minFacets = Math.min(...counts);
      const maxFacets = Math.max(...counts);
      const qualityScore = (counts.filter(c => c >= 8).length / totalSources) * 100;

      // Calculate ranges
      const under8 = counts.filter(c => c < 8).length;
      const exactly8 = counts.filter(c => c === 8).length;
      const range9_20 = counts.filter(c => c >= 9 && c <= 20).length;
      const range21_50 = counts.filter(c => c >= 21 && c <= 50).length;
      const range51_100 = counts.filter(c => c >= 51 && c <= 100).length;
      const range101_200 = counts.filter(c => c >= 101 && c <= 200).length;
      const over200 = counts.filter(c => c > 200).length;

      const ranges: FacetRange[] = [
        { range: 'under_8', count: under8, color: 'bg-red-500', label: 'Under 8' },
        { range: 'exactly_8', count: exactly8, color: 'bg-yellow-500', label: 'Exactly 8' },
        { range: 'range_9_20', count: range9_20, color: 'bg-green-500', label: '9-20' },
        { range: 'range_21_50', count: range21_50, color: 'bg-blue-500', label: '21-50' },
        { range: 'range_51_100', count: range51_100, color: 'bg-purple-500', label: '51-100' },
        { range: 'range_101_200', count: range101_200, color: 'bg-orange-500', label: '101-200' },
        { range: 'over_200', count: over200, color: 'bg-gray-500', label: '200+' },
      ];

      setStats({
        totalFacets,
        totalSources,
        avgPerSource,
        minFacets,
        maxFacets,
        qualityScore,
        ranges
      });
      setLastUpdate(new Date());
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
