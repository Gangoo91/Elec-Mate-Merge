import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  Activity, 
  Clock, 
  CheckCircle, 
  XCircle, 
  RefreshCw,
  TrendingUp,
  Database,
  Globe
} from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { firecrawlIntegration } from "@/utils/FirecrawlIntegration";

interface StatusData {
  isConnected: boolean;
  lastRefresh: string | null;
  nextRefresh: string | null;
  totalProjects: number;
  activeSchedule: boolean;
  refreshFrequency: string;
  sourcesActive: number;
  sourcesTotal: number;
  lastError: string | null;
}

const FirecrawlStatusWidget = () => {
  const { toast } = useToast();
  const [status, setStatus] = useState<StatusData>({
    isConnected: false,
    lastRefresh: null,
    nextRefresh: null,
    totalProjects: 0,
    activeSchedule: false,
    refreshFrequency: '24 hours',
    sourcesActive: 0,
    sourcesTotal: 0,
    lastError: null
  });
  const [isRefreshing, setIsRefreshing] = useState(false);

  useEffect(() => {
    loadStatus();
    
    // Set up interval to update status every 30 seconds
    const interval = setInterval(loadStatus, 30000);
    
    // Listen for refresh events
    const handleRefreshComplete = (event: CustomEvent) => {
      setIsRefreshing(false);
      loadStatus();
    };
    
    window.addEventListener('firecrawl-refresh-complete', handleRefreshComplete as EventListener);
    
    return () => {
      clearInterval(interval);
      window.removeEventListener('firecrawl-refresh-complete', handleRefreshComplete as EventListener);
    };
  }, []);

  const loadStatus = () => {
    try {
      // Load from localStorage
      const apiKey = localStorage.getItem('firecrawl_api_key');
      const sources = JSON.parse(localStorage.getItem('firecrawl_sources') || '[]');
      const schedule = JSON.parse(localStorage.getItem('firecrawl_schedule') || '{}');
      
      const activeSources = sources.filter((s: any) => s.active);
      
      setStatus({
        isConnected: !!apiKey,
        lastRefresh: schedule.lastRun ? new Date(schedule.lastRun).toLocaleString() : null,
        nextRefresh: schedule.nextRun ? new Date(schedule.nextRun).toLocaleString() : null,
        totalProjects: 0, // Would need to fetch from database
        activeSchedule: schedule.active || false,
        refreshFrequency: schedule.interval ? `${schedule.interval} hours` : '24 hours',
        sourcesActive: activeSources.length,
        sourcesTotal: sources.length,
        lastError: localStorage.getItem('firecrawl_last_error')
      });
    } catch (error) {
      console.error('Error loading status:', error);
    }
  };

  const handleQuickRefresh = async () => {
    if (!status.isConnected) {
      toast({
        title: "Not Connected",
        description: "Please configure Firecrawl API key first",
        variant: "destructive",
        duration: 3000,
      });
      return;
    }

    setIsRefreshing(true);
    
    try {
      const result = await firecrawlIntegration.replaceData([]);
      
      if (result.success) {
        toast({
          title: "Refresh Successful",
          description: `Updated ${result.replacedCount} projects`,
          duration: 3000,
        });
        loadStatus();
      } else {
        throw new Error(result.error);
      }
    } catch (error) {
      toast({
        title: "Refresh Failed",
        description: error instanceof Error ? error.message : "Data refresh failed",
        variant: "destructive",
        duration: 3000,
      });
    } finally {
      setIsRefreshing(false);
    }
  };

  const getConnectionStatus = () => {
    if (!status.isConnected) {
      return { color: 'text-red-500', bg: 'bg-red-500/10', icon: XCircle, text: 'Disconnected' };
    }
    if (status.lastError) {
      return { color: 'text-yellow-500', bg: 'bg-yellow-500/10', icon: XCircle, text: 'Issues Detected' };
    }
    return { color: 'text-green-500', bg: 'bg-green-500/10', icon: CheckCircle, text: 'Connected' };
  };

  const connectionStatus = getConnectionStatus();
  const StatusIcon = connectionStatus.icon;

  return (
    <Card className="w-full">
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center justify-between text-lg">
          <div className="flex items-center gap-2">
            <Activity className="h-5 w-5" />
            Firecrawl Status
          </div>
          <Button
            onClick={handleQuickRefresh}
            disabled={isRefreshing || !status.isConnected}
            size="sm"
            variant="outline"
          >
            <RefreshCw className={`h-4 w-4 ${isRefreshing ? 'animate-spin' : ''}`} />
          </Button>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Connection Status */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <StatusIcon className={`h-4 w-4 ${connectionStatus.color}`} />
            <span className="font-medium">Connection</span>
          </div>
          <Badge className={connectionStatus.bg}>
            {connectionStatus.text}
          </Badge>
        </div>

        {/* Data Sources Status */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Globe className="h-4 w-4" />
            <span className="font-medium">Data Sources</span>
          </div>
          <div className="text-right">
            <div className="text-sm font-medium">
              {status.sourcesActive}/{status.sourcesTotal} Active
            </div>
            <Progress 
              value={(status.sourcesActive / Math.max(status.sourcesTotal, 1)) * 100} 
              className="w-16 h-2"
            />
          </div>
        </div>

        {/* Schedule Status */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Clock className="h-4 w-4" />
            <span className="font-medium">Auto Refresh</span>
          </div>
          <Badge variant={status.activeSchedule ? "default" : "secondary"}>
            {status.activeSchedule ? `Every ${status.refreshFrequency}` : 'Disabled'}
          </Badge>
        </div>

        {/* Last Refresh */}
        {status.lastRefresh && (
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Database className="h-4 w-4" />
              <span className="font-medium">Last Refresh</span>
            </div>
            <div className="text-right text-sm">
              {new Date(status.lastRefresh).toLocaleDateString('en-GB')}
              <div className="text-xs text-muted-foreground">
                {new Date(status.lastRefresh).toLocaleTimeString('en-GB')}
              </div>
            </div>
          </div>
        )}

        {/* Next Refresh */}
        {status.nextRefresh && status.activeSchedule && (
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <TrendingUp className="h-4 w-4" />
              <span className="font-medium">Next Refresh</span>
            </div>
            <div className="text-right text-sm">
              {new Date(status.nextRefresh).toLocaleDateString('en-GB')}
              <div className="text-xs text-muted-foreground">
                {new Date(status.nextRefresh).toLocaleTimeString('en-GB')}
              </div>
            </div>
          </div>
        )}

        {/* Error Status */}
        {status.lastError && (
          <div className="p-3 bg-red-500/10 border border-red-500/20 rounded-lg">
            <div className="flex items-start gap-2">
              <XCircle className="h-4 w-4 text-red-500 mt-0.5" />
              <div>
                <p className="text-sm font-medium text-red-600">Last Error</p>
                <p className="text-xs text-red-500">{status.lastError}</p>
              </div>
            </div>
          </div>
        )}

        {/* Quick Actions */}
        <div className="pt-2 border-t">
          <div className="flex justify-between text-xs text-muted-foreground">
            <span>Real-time project tracking</span>
            <span>UK electrical tenders</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default FirecrawlStatusWidget;