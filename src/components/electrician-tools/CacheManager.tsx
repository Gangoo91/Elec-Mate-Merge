import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { toast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { RefreshCw, Database, Calendar, Clock, CheckCircle, AlertCircle } from "lucide-react";

interface CacheEntry {
  guide_type: string;
  created_at: string;
  expires_at: string;
  refresh_scheduled_for?: string;
  last_refreshed?: string;
  cache_version?: number;
  refresh_status?: string;
}

const CacheManager = () => {
  const [cacheEntries, setCacheEntries] = useState<CacheEntry[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);

  const loadCacheStatus = async () => {
    setIsLoading(true);
    try {
      const { data, error } = await supabase
        .from('tool_guide_cache')
        .select('guide_type, created_at, expires_at, refresh_scheduled_for, last_refreshed, cache_version, refresh_status')
        .order('last_refreshed', { ascending: false });

      if (error) {
        console.error('Error fetching cache status:', error);
        toast({
          title: "Error",
          description: "Failed to load cache status",
          variant: "destructive",
        });
      } else {
        setCacheEntries(data || []);
      }
    } catch (error) {
      console.error('Failed to fetch cache status:', error);
      toast({
        title: "Error",
        description: "Failed to load cache status",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const triggerWeeklyRefresh = async () => {
    setIsRefreshing(true);
    try {
      const { data, error } = await supabase.functions.invoke('weekly-cache-refresh', {
        body: { manual: true }
      });

      if (error) {
        console.error('Cache refresh error:', error);
        toast({
          title: "Refresh Failed",
          description: error.message || "Failed to refresh cache",
          variant: "destructive",
        });
      } else {
        console.log('Cache refresh completed:', data);
        toast({
          title: "Cache Refreshed",
          description: `Successfully refreshed ${data.refreshedCount} guides`,
        });
        // Reload cache status
        await loadCacheStatus();
      }
    } catch (error) {
      console.error('Cache refresh failed:', error);
      toast({
        title: "Refresh Failed",
        description: "Failed to refresh cache",
        variant: "destructive",
      });
    } finally {
      setIsRefreshing(false);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString('en-GB', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const isExpired = (expiresAt: string) => {
    return new Date(expiresAt) < new Date();
  };

  const getStatusColor = (status?: string) => {
    switch (status) {
      case 'completed': return 'bg-green-500/20 text-green-400';
      case 'in_progress': return 'bg-blue-500/20 text-blue-400';
      case 'failed': return 'bg-red-500/20 text-red-400';
      default: return 'bg-gray-500/20 text-gray-400';
    }
  };

  const getStatusIcon = (status?: string) => {
    switch (status) {
      case 'completed': return <CheckCircle className="h-3 w-3" />;
      case 'in_progress': return <RefreshCw className="h-3 w-3 animate-spin" />;
      case 'failed': return <AlertCircle className="h-3 w-3" />;
      default: return <Database className="h-3 w-3" />;
    }
  };

  return (
    <Card className="border-elec-yellow/20 bg-elec-gray/50">
      <CardHeader>
        <CardTitle className="text-white flex items-center gap-2">
          <Database className="h-5 w-5 text-elec-yellow" />
          Tool Guide Cache Manager
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex gap-2">
          <Button
            onClick={loadCacheStatus}
            disabled={isLoading}
            variant="outline"
            className="border-elec-yellow/30 hover:bg-elec-yellow/10"
          >
            <RefreshCw className={`h-4 w-4 mr-2 ${isLoading ? 'animate-spin' : ''}`} />
            Refresh Status
          </Button>
          <Button
            onClick={triggerWeeklyRefresh}
            disabled={isRefreshing}
            className="bg-elec-yellow text-black hover:bg-elec-yellow/90"
          >
            <Calendar className={`h-4 w-4 mr-2 ${isRefreshing ? 'animate-spin' : ''}`} />
            Trigger Weekly Refresh
          </Button>
        </div>

        {cacheEntries.length > 0 ? (
          <div className="space-y-3">
            <h4 className="text-white font-medium">Cache Status</h4>
            {cacheEntries.map((entry) => (
              <div
                key={entry.guide_type}
                className="p-3 bg-elec-gray border border-elec-yellow/20 rounded-lg"
              >
                <div className="flex items-center justify-between mb-2">
                  <h5 className="text-white font-medium capitalize">
                    {entry.guide_type.replace('-', ' ')}
                  </h5>
                  <div className="flex items-center gap-2">
                    <Badge className={getStatusColor(entry.refresh_status)}>
                      {getStatusIcon(entry.refresh_status)}
                      {entry.refresh_status || 'unknown'}
                    </Badge>
                    {isExpired(entry.expires_at) && (
                      <Badge className="bg-red-500/20 text-red-400">
                        <AlertCircle className="h-3 w-3 mr-1" />
                        Expired
                      </Badge>
                    )}
                  </div>
                </div>
                
                <div className="grid grid-cols-2 md:grid-cols-4 gap-2 text-xs text-muted-foreground">
                  <div>
                    <span className="block">Last Updated:</span>
                    <span className="text-white">
                      {entry.last_refreshed ? formatDate(entry.last_refreshed) : 'Never'}
                    </span>
                  </div>
                  <div>
                    <span className="block">Expires:</span>
                    <span className={isExpired(entry.expires_at) ? 'text-red-400' : 'text-white'}>
                      {formatDate(entry.expires_at)}
                    </span>
                  </div>
                  <div>
                    <span className="block">Next Refresh:</span>
                    <span className="text-white">
                      {entry.refresh_scheduled_for ? formatDate(entry.refresh_scheduled_for) : 'Not scheduled'}
                    </span>
                  </div>
                  <div>
                    <span className="block">Version:</span>
                    <span className="text-white">v{entry.cache_version || 1}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-8">
            <Database className="h-12 w-12 text-elec-yellow mx-auto mb-4" />
            <h3 className="text-white text-lg mb-2">No Cache Data</h3>
            <p className="text-muted-foreground mb-4">
              Click "Refresh Status" to load current cache information.
            </p>
          </div>
        )}

        <div className="mt-4 p-3 bg-blue-500/10 border border-blue-500/20 rounded-lg">
          <div className="flex items-center gap-2 text-blue-300 mb-2">
            <Clock className="h-4 w-4" />
            <span className="font-medium">Automatic Refresh Schedule</span>
          </div>
          <p className="text-sm text-muted-foreground">
            Tool guides are automatically refreshed every Sunday at 2:00 AM UTC. 
            You can manually trigger a refresh using the button above.
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default CacheManager;