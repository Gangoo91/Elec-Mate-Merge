import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { RefreshCw, Clock, Database, AlertCircle } from 'lucide-react';
import { refreshMaterialsCache, getCacheStatus } from '@/utils/materialsCache';
import { useToast } from '@/components/ui/use-toast';

export const MaterialsCacheStatus = () => {
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [cacheStatus, setCacheStatus] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleRefreshCache = async () => {
    setIsRefreshing(true);
    try {
      const result = await refreshMaterialsCache();
      
      if (result.success) {
        toast({
          title: "Cache Refresh Started",
          description: `Successfully triggered cache update for ${result.data?.results?.length || 0} categories`,
          duration: 5000,
        });
        
        // Refresh cache status after update
        await loadCacheStatus();
      } else {
        toast({
          title: "Cache Refresh Failed",
          description: result.error,
          variant: "destructive",
          duration: 5000,
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to refresh materials cache",
        variant: "destructive",
        duration: 5000,
      });
    } finally {
      setIsRefreshing(false);
    }
  };

  const loadCacheStatus = async () => {
    setIsLoading(true);
    try {
      const result = await getCacheStatus();
      if (result.success) {
        setCacheStatus(result.cacheEntries);
      }
    } catch (error) {
      console.error('Failed to load cache status:', error);
    } finally {
      setIsLoading(false);
    }
  };

  React.useEffect(() => {
    loadCacheStatus();
  }, []);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString();
  };

  const isExpired = (expiresAt: string) => {
    return new Date(expiresAt) < new Date();
  };

  return (
    <Card className="p-6 max-w-4xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <Database className="h-5 w-5" />
          <h3 className="text-lg font-semibold">Materials Cache Status</h3>
        </div>
        <div className="flex gap-2">
          <Button
            onClick={loadCacheStatus}
            variant="outline"
            size="sm"
            disabled={isLoading}
          >
            <RefreshCw className={`h-4 w-4 mr-2 ${isLoading ? 'animate-spin' : ''}`} />
            Refresh Status
          </Button>
          <Button
            onClick={handleRefreshCache}
            disabled={isRefreshing}
            size="sm"
          >
            <RefreshCw className={`h-4 w-4 mr-2 ${isRefreshing ? 'animate-spin' : ''}`} />
            {isRefreshing ? 'Updating...' : 'Update Cache'}
          </Button>
        </div>
      </div>

      {cacheStatus && cacheStatus.length > 0 ? (
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {cacheStatus.map((entry: any, index: number) => (
              <Card key={index} className="p-4">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-medium capitalize">{entry.category}</h4>
                  <Badge 
                    variant={
                      entry.update_status === 'completed' && !isExpired(entry.expires_at)
                        ? 'default'
                        : entry.update_status === 'error'
                        ? 'destructive'
                        : 'secondary'
                    }
                  >
                    {entry.update_status}
                  </Badge>
                </div>
                
                <div className="space-y-2 text-sm text-muted-foreground">
                  <div className="flex items-center gap-2">
                    <Database className="h-3 w-3" />
                    <span>{entry.total_products} materials</span>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <Clock className="h-3 w-3" />
                    <span>Updated: {formatDate(entry.created_at)}</span>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <AlertCircle className="h-3 w-3" />
                    <span className={isExpired(entry.expires_at) ? 'text-red-500' : ''}>
                      Expires: {formatDate(entry.expires_at)}
                    </span>
                  </div>
                </div>
              </Card>
            ))}
          </div>
          
          <div className="text-sm text-muted-foreground">
            <p>📅 Automatic updates scheduled every Sunday at 2 AM UTC</p>
            <p>🧹 Expired cache entries are cleaned up daily at 3 AM UTC</p>
          </div>
        </div>
      ) : (
        <div className="text-center py-8">
          <Database className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
          <h4 className="text-lg font-medium mb-2">No Cache Data Found</h4>
          <p className="text-muted-foreground mb-4">
            Click "Update Cache" to populate the materials cache for the first time.
          </p>
          <Button onClick={handleRefreshCache} disabled={isRefreshing}>
            <RefreshCw className={`h-4 w-4 mr-2 ${isRefreshing ? 'animate-spin' : ''}`} />
            {isRefreshing ? 'Populating Cache...' : 'Populate Cache'}
          </Button>
        </div>
      )}
    </Card>
  );
};