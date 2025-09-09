import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { RefreshCw, Loader2, Calendar, TrendingUp, AlertCircle } from "lucide-react";
import { useState } from "react";

const MaterialsAdminPanel = () => {
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [isChecking, setIsChecking] = useState(false);
  const { toast } = useToast();

  const handleManualRefresh = async () => {
    setIsRefreshing(true);
    try {
      const { data, error } = await supabase.functions.invoke('materials-weekly-scheduler', {
        body: { manual_trigger: true }
      });

      if (error) {
        throw error;
      }

      toast({
        title: "Materials Refresh Started",
        description: "Weekly materials refresh has been triggered manually. This may take several minutes.",
      });

      console.log('Manual refresh response:', data);
    } catch (error) {
      console.error('Error triggering manual refresh:', error);
      toast({
        title: "Refresh Failed",
        description: "Failed to trigger materials refresh. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsRefreshing(false);
    }
  };

  const checkCacheStatus = async () => {
    setIsChecking(true);
    try {
      const { data, error } = await supabase
        .from('materials_weekly_cache')
        .select('*')
        .order('last_updated', { ascending: false });

      if (error) {
        throw error;
      }

      const now = new Date();
      const totalProducts = data?.reduce((sum, cache) => sum + (cache.total_products || 0), 0) || 0;
      const lastUpdate = data?.[0]?.last_updated ? new Date(data[0].last_updated) : null;
      const categories = data?.length || 0;
      
      let status = 'fresh';
      if (!lastUpdate) {
        status = 'no-data';
      } else {
        const hoursSinceUpdate = (now.getTime() - lastUpdate.getTime()) / (1000 * 60 * 60);
        if (hoursSinceUpdate > 168) { // 7 days
          status = 'stale';
        } else if (hoursSinceUpdate > 144) { // 6 days
          status = 'aging';
        }
      }

      toast({
        title: "Cache Status",
        description: `${totalProducts} products across ${categories} categories. Last updated: ${lastUpdate ? lastUpdate.toLocaleDateString() : 'Never'}`,
      });

      console.log('Cache status:', { totalProducts, categories, lastUpdate, status, data });
    } catch (error) {
      console.error('Error checking cache status:', error);
      toast({
        title: "Status Check Failed",
        description: "Failed to check cache status.",
        variant: "destructive",
      });
    } finally {
      setIsChecking(false);
    }
  };

  return (
    <Card className="border-elec-yellow/20 bg-elec-gray">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-lg">
          <TrendingUp className="h-5 w-5 text-elec-yellow" />
          Materials Admin Panel
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-3">
            <h3 className="text-sm font-medium text-white">Cache Management</h3>
            <div className="flex gap-2">
              <Button
                onClick={checkCacheStatus}
                disabled={isChecking}
                variant="outline"
                size="sm"
                className="flex-1"
              >
                {isChecking ? (
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                ) : (
                  <AlertCircle className="h-4 w-4 mr-2" />
                )}
                Check Status
              </Button>
              <Button
                onClick={handleManualRefresh}
                disabled={isRefreshing}
                variant="outline"
                size="sm"
                className="flex-1"
              >
                {isRefreshing ? (
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                ) : (
                  <RefreshCw className="h-4 w-4 mr-2" />
                )}
                Manual Refresh
              </Button>
            </div>
          </div>

          <div className="space-y-3">
            <h3 className="text-sm font-medium text-white">Schedule Info</h3>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Calendar className="h-4 w-4" />
              <span>Auto-refresh: Every Sunday 2 AM UTC</span>
            </div>
            <Badge variant="outline" className="text-xs border-elec-yellow/30 text-white">
              Firecrawl 2.0 Enabled
            </Badge>
          </div>
        </div>

        <div className="text-xs text-muted-foreground space-y-1">
          <p>• Manual refresh triggers the weekly materials scraper immediately</p>
          <p>• Check status shows current cache data and freshness</p>
          <p>• Automatic refresh runs weekly to keep data current</p>
        </div>
      </CardContent>
    </Card>
  );
};

export default MaterialsAdminPanel;