import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  TrendingUp, 
  TrendingDown, 
  MapPin, 
  Users, 
  AlertTriangle,
  Zap,
  Clock,
  BarChart3,
  RefreshCw,
  Activity,
  Target,
  Gauge
} from 'lucide-react';
import { useLiveMetalPrices } from '@/hooks/useLiveMetalPrices';
import { useLiveMarketInsights } from '@/hooks/useLiveMarketInsights';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

interface CommunityStats {
  totalReports: number;
  activeRegions: string[];
  popularJobTypes: Array<{ type: string; count: number }>;
  avgSubmissionTrend: number;
  lastSubmissionTime: string;
}

const RealMarketInsights = () => {
  const { toast } = useToast();
  const { data: metalPrices, isLoading: metalLoading, refreshPrices } = useLiveMetalPrices();
  const { data: marketData, isLoading: marketLoading, refreshLive } = useLiveMarketInsights();
  const [communityStats, setCommunityStats] = useState<CommunityStats | null>(null);
  const [isRefreshing, setIsRefreshing] = useState(false);

  // Fetch community pricing statistics
  useEffect(() => {
    const fetchCommunityStats = async () => {
      try {
        const { data: reports, error } = await supabase
          .from('price_reports')
          .select('region, job_type, created_at')
          .eq('status', 'approved')
          .order('created_at', { ascending: false });

        if (error) throw error;

        const activeRegions = [...new Set((reports || []).map(r => r.region).filter(Boolean))];
        const jobTypeCounts = (reports || []).reduce((acc: any, report) => {
          acc[report.job_type] = (acc[report.job_type] || 0) + 1;
          return acc;
        }, {});

        const popularJobTypes = Object.entries(jobTypeCounts)
          .map(([type, count]) => ({ type, count: count as number }))
          .sort((a, b) => b.count - a.count)
          .slice(0, 5);

        setCommunityStats({
          totalReports: reports?.length || 0,
          activeRegions,
          popularJobTypes,
          avgSubmissionTrend: reports?.length > 0 ? Math.round(reports.length / 7) : 0,
          lastSubmissionTime: reports?.[0]?.created_at || new Date().toISOString()
        });
      } catch (error) {
        console.error('Error fetching community stats:', error);
      }
    };

    fetchCommunityStats();
  }, []);

  const handleRefreshAll = async () => {
    setIsRefreshing(true);
    try {
      await Promise.all([
        refreshPrices(true),
        refreshLive()
      ]);
      toast({
        title: 'Data Refreshed',
        description: 'All market insights have been updated with the latest data',
        variant: 'success'
      });
    } catch (error) {
      toast({
        title: 'Refresh Failed',
        description: 'Some data sources may be temporarily unavailable',
        variant: 'destructive'
      });
    } finally {
      setIsRefreshing(false);
    }
  };

  const formatChange = (value: number) => {
    const isPositive = value >= 0;
    return {
      text: `${isPositive ? '+' : ''}${value.toFixed(1)}%`,
      color: isPositive ? 'text-emerald-400' : 'text-red-400',
      icon: isPositive ? TrendingUp : TrendingDown
    };
  };

  const getTimeAgo = (dateString: string) => {
    const now = new Date();
    const date = new Date(dateString);
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60));
    
    if (diffInHours < 1) return 'Just now';
    if (diffInHours < 24) return `${diffInHours}h ago`;
    const diffInDays = Math.floor(diffInHours / 24);
    return `${diffInDays}d ago`;
  };

  return (
    <div className="space-y-6">
      {/* Header with Refresh */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold gradient-text">Live Market Intelligence</h2>
          <p className="text-muted-foreground mt-1">Real-time insights powered by community data and market trends</p>
        </div>
        <Button 
          onClick={handleRefreshAll}
          disabled={isRefreshing || metalLoading || marketLoading}
          className="gap-2"
        >
          <RefreshCw className={`h-4 w-4 ${isRefreshing ? 'animate-spin' : ''}`} />
          Refresh All
        </Button>
      </div>

      {/* Data Status Bar */}
      <Card className="border-primary/20">
        <CardContent className="p-4">
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div className="flex items-center gap-6">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></div>
                <span className="text-sm font-medium">Live Data Connected</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Clock className="h-4 w-4" />
                Last updated: {metalPrices?.lastUpdated ? getTimeAgo(metalPrices.lastUpdated) : 'Never'}
              </div>
            </div>
            <Badge variant="secondary" className="text-xs">
              <Activity className="h-3 w-3 mr-1" />
              {communityStats?.totalReports || 0} Community Reports
            </Badge>
          </div>
        </CardContent>
      </Card>

      {/* Metal Price Trends */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {metalPrices?.metalPrices && metalPrices.metalPrices.map((metalData) => {
          const changeValue = parseFloat(metalData.change?.replace('%', '') || '0');
          const change = formatChange(changeValue);
          const Icon = change.icon;
          const priceValue = parseFloat(metalData.value?.replace(/[£,]/g, '') || '0');
          
          return (
            <Card key={metalData.id} className="border-primary/20 hover:border-primary/40 transition-all duration-300">
              <CardContent className="p-4">
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">{metalData.name}</span>
                    <Badge variant="outline" className="text-xs">
                      /kg
                    </Badge>
                  </div>
                  <div className="space-y-1">
                    <div className="text-2xl font-bold">
                      £{priceValue.toFixed(2)}
                    </div>
                    <div className={`flex items-center gap-1 text-sm ${change.color}`}>
                      <Icon className="h-3 w-3" />
                      {change.text}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Market Insights Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Regional Activity */}
        <Card className="border-primary/20">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MapPin className="h-5 w-5 text-primary" />
              Regional Activity
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {communityStats?.activeRegions.length ? (
              <>
                <div className="text-2xl font-bold text-primary">
                  {communityStats.activeRegions.length} Active Regions
                </div>
                <div className="space-y-2">
                  {communityStats.activeRegions.slice(0, 5).map((region, index) => (
                    <div key={region} className="flex items-center justify-between p-2 rounded-lg bg-accent/20">
                      <span className="font-medium">{region}</span>
                      <Badge variant="secondary" className="text-xs">
                        #{index + 1}
                      </Badge>
                    </div>
                  ))}
                </div>
              </>
            ) : (
              <div className="text-center py-6 text-muted-foreground">
                <Target className="h-8 w-8 mx-auto mb-2 opacity-50" />
                <p>Building regional insights...</p>
                <p className="text-xs mt-1">Submit pricing data to see regional activity</p>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Popular Job Types */}
        <Card className="border-primary/20">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BarChart3 className="h-5 w-5 text-primary" />
              Popular Job Types
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {communityStats?.popularJobTypes.length ? (
              <>
                <div className="text-2xl font-bold text-primary">
                  {communityStats.popularJobTypes.reduce((sum, item) => sum + item.count, 0)} Total Jobs
                </div>
                <div className="space-y-2">
                  {communityStats.popularJobTypes.map((job, index) => (
                    <div key={job.type} className="space-y-1">
                      <div className="flex items-center justify-between">
                        <span className="font-medium text-sm">{job.type}</span>
                        <span className="text-xs text-muted-foreground">{job.count} reports</span>
                      </div>
                      <div className="w-full bg-muted/30 rounded-full h-1.5">
                        <div 
                          className="bg-primary rounded-full h-1.5 transition-all duration-700"
                          style={{ 
                            width: `${Math.max((job.count / Math.max(...communityStats.popularJobTypes.map(j => j.count))) * 100, 10)}%` 
                          }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </>
            ) : (
              <div className="text-center py-6 text-muted-foreground">
                <Zap className="h-8 w-8 mx-auto mb-2 opacity-50" />
                <p>Analysing job patterns...</p>
                <p className="text-xs mt-1">More data needed for job type insights</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Market Alerts */}
      {metalPrices?.marketAlerts && metalPrices.marketAlerts.length > 0 && (
        <Card className="border-amber-500/20 bg-gradient-to-r from-amber-500/5 to-orange-500/5">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-amber-400">
              <AlertTriangle className="h-5 w-5" />
              Market Alerts
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {metalPrices.marketAlerts.slice(0, 3).map((alert: any, index: number) => (
              <div key={index} className="flex items-start gap-3 p-3 rounded-lg bg-amber-500/10 border border-amber-500/20">
                <AlertTriangle className="h-4 w-4 text-amber-400 mt-0.5 flex-shrink-0" />
                <div className="space-y-1">
                  <div className="font-medium text-amber-200">{alert.type}</div>
                  <div className="text-sm text-amber-300/80">{alert.message}</div>
                  {alert.date && (
                    <div className="text-xs text-amber-400/60">{getTimeAgo(alert.date)}</div>
                  )}
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      )}

      {/* Community Insights */}
      <Card className="border-primary/20">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Users className="h-5 w-5 text-primary" />
            Community Insights
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center space-y-2">
              <div className="text-3xl font-bold text-primary">
                {communityStats?.totalReports || 0}
              </div>
              <div className="text-sm text-muted-foreground">Total Price Reports</div>
              <Badge variant="secondary" className="text-xs">
                {communityStats?.avgSubmissionTrend || 0}/week avg
              </Badge>
            </div>
            <div className="text-center space-y-2">
              <div className="text-3xl font-bold text-primary">
                {communityStats?.activeRegions.length || 0}
              </div>
              <div className="text-sm text-muted-foreground">UK Regions Covered</div>
              <Badge variant="secondary" className="text-xs">
                Growing network
              </Badge>
            </div>
            <div className="text-center space-y-2">
              <div className="text-3xl font-bold text-primary">
                {communityStats?.popularJobTypes.length || 0}
              </div>
              <div className="text-sm text-muted-foreground">Job Types Tracked</div>
              <Badge variant="secondary" className="text-xs">
                {communityStats?.lastSubmissionTime ? getTimeAgo(communityStats.lastSubmissionTime) : 'No data'}
              </Badge>
            </div>
          </div>
          
          {(!communityStats || communityStats.totalReports < 10) && (
            <div className="mt-6 p-4 rounded-lg bg-primary/5 border border-primary/20">
              <div className="flex items-start gap-3">
                <Gauge className="h-5 w-5 text-primary mt-0.5" />
                <div>
                  <div className="font-medium text-primary">Building Market Intelligence</div>
                  <div className="text-sm text-muted-foreground mt-1">
                    We're collecting data to provide more accurate insights. Submit your pricing data to help improve market intelligence for everyone.
                  </div>
                </div>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default RealMarketInsights;