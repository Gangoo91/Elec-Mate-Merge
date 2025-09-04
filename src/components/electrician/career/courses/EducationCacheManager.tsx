import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { RefreshCw, Database, Clock, AlertCircle, CheckCircle, Loader2 } from 'lucide-react';

interface EducationCacheManagerProps {
  cacheInfo: {
    nextRefresh: string;
    cacheVersion: number;
    refreshStatus: string;
    daysUntilRefresh: number;
  } | null;
  onRefreshComplete?: () => void;
}

const EducationCacheManager: React.FC<EducationCacheManagerProps> = ({ 
  cacheInfo, 
  onRefreshComplete 
}) => {
  const [isRefreshing, setIsRefreshing] = useState(false);
  const { toast } = useToast();

  const handleManualRefresh = async () => {
    setIsRefreshing(true);
    
    try {
      console.log('🔄 Starting manual education cache refresh...');
      
      const { data, error } = await supabase.functions.invoke('weekly-education-cache-refresh', {
        body: { manual: true, category: 'electrical' }
      });

      if (error) {
        throw error;
      }

      if (data.success) {
        toast({
          title: "Cache Refreshed Successfully",
          description: `Updated ${data.summary?.total_courses || 0} courses from ${data.summary?.categories_processed || 0} categories.`,
        });
        
        onRefreshComplete?.();
      } else {
        throw new Error(data.error || 'Unknown error during refresh');
      }
    } catch (error) {
      console.error('❌ Error refreshing cache:', error);
      toast({
        title: "Cache Refresh Failed",
        description: error instanceof Error ? error.message : "Unknown error occurred",
        variant: "destructive",
      });
    } finally {
      setIsRefreshing(false);
    }
  };

  const getStatusIcon = () => {
    if (!cacheInfo) return <Database className="h-4 w-4" />;
    
    switch (cacheInfo.refreshStatus) {
      case 'completed':
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      case 'in_progress':
        return <Loader2 className="h-4 w-4 text-blue-500 animate-spin" />;
      case 'failed':
        return <AlertCircle className="h-4 w-4 text-red-500" />;
      case 'scheduled':
        return <Clock className="h-4 w-4 text-amber-500" />;
      default:
        return <Database className="h-4 w-4" />;
    }
  };

  const getStatusColor = () => {
    if (!cacheInfo) return 'secondary';
    
    switch (cacheInfo.refreshStatus) {
      case 'completed':
        return 'default';
      case 'in_progress':
        return 'secondary';
      case 'failed':
        return 'destructive';
      case 'scheduled':
        return 'secondary';
      default:
        return 'secondary';
    }
  };

  const formatNextRefresh = () => {
    if (!cacheInfo?.nextRefresh) return 'Not scheduled';
    
    const nextRefresh = new Date(cacheInfo.nextRefresh);
    const now = new Date();
    
    if (nextRefresh <= now) {
      return 'Overdue';
    }
    
    if (cacheInfo.daysUntilRefresh === 0) {
      return 'Today';
    } else if (cacheInfo.daysUntilRefresh === 1) {
      return 'Tomorrow';
    } else {
      return `In ${cacheInfo.daysUntilRefresh} days`;
    }
  };

  return (
    <Card className="border-elec-yellow/20">
      <CardHeader className="pb-4">
        <CardTitle className="text-lg flex items-center gap-2">
          <Database className="h-5 w-5 text-elec-yellow" />
          Education Cache Management
        </CardTitle>
      </CardHeader>
      
      <CardContent className="space-y-4">
        {/* Cache Status */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="space-y-2">
            <p className="text-sm text-muted-foreground">Status</p>
            <Badge 
              variant={getStatusColor()} 
              className="flex items-center gap-1 w-fit"
            >
              {getStatusIcon()}
              {cacheInfo?.refreshStatus || 'Unknown'}
            </Badge>
          </div>
          
          <div className="space-y-2">
            <p className="text-sm text-muted-foreground">Version</p>
            <p className="font-medium">v{cacheInfo?.cacheVersion || 1}</p>
          </div>
          
          <div className="space-y-2">
            <p className="text-sm text-muted-foreground">Next Refresh</p>
            <p className="font-medium">{formatNextRefresh()}</p>
          </div>
          
          <div className="space-y-2">
            <p className="text-sm text-muted-foreground">Schedule</p>
            <p className="font-medium">Sunday 2 AM</p>
          </div>
        </div>

        {/* Cache Details */}
        {cacheInfo && (
          <div className="space-y-2 p-3 bg-elec-gray/20 rounded-lg">
            <h4 className="font-medium text-sm">Cache Details</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-xs text-muted-foreground">
              <div>Next refresh: {new Date(cacheInfo.nextRefresh).toLocaleString()}</div>
              <div>Days until refresh: {cacheInfo.daysUntilRefresh}</div>
            </div>
          </div>
        )}

        {/* Manual Refresh */}
        <div className="space-y-2">
          <h4 className="font-medium text-sm">Manual Actions</h4>
          <Button
            onClick={handleManualRefresh}
            disabled={isRefreshing || cacheInfo?.refreshStatus === 'in_progress'}
            variant="outline"
            size="sm"
            className="flex items-center gap-2"
          >
            <RefreshCw className={`h-4 w-4 ${isRefreshing ? 'animate-spin' : ''}`} />
            {isRefreshing ? 'Refreshing...' : 'Refresh Cache Now'}
          </Button>
          
          <p className="text-xs text-muted-foreground">
            Manually refresh the cache to fetch the latest course data. This process may take a few minutes.
          </p>
        </div>

        {/* Cache Information */}
        <div className="p-3 bg-blue-50 dark:bg-blue-950/20 rounded-lg">
          <h4 className="font-medium text-sm mb-2 text-blue-900 dark:text-blue-100">
            About Weekly Caching
          </h4>
          <p className="text-xs text-blue-800 dark:text-blue-200">
            The course cache is automatically refreshed every Sunday at 2 AM UTC. 
            This ensures fresh data while minimizing API usage and improving performance. 
            Cache data is typically valid for up to 7 days.
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default EducationCacheManager;