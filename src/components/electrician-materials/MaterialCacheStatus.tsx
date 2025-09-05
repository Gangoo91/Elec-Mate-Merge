import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { RefreshCw, Clock, Database, AlertTriangle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { refreshMaterialsCache, getCacheStatus } from '@/utils/materialsCache';

interface CacheEntry {
  category: string;
  total_products: number;
  created_at: string;
  expires_at: string;
  update_status: string;
}

const MaterialCacheStatus = () => {
  const { toast } = useToast();
  const [cacheEntries, setCacheEntries] = useState<CacheEntry[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);

  const loadCacheStatus = async () => {
    setIsLoading(true);
    const result = await getCacheStatus();
    if (result.success) {
      setCacheEntries(result.cacheEntries || []);
    } else {
      toast({
        title: "Error",
        description: "Failed to load cache status",
        variant: "destructive",
      });
    }
    setIsLoading(false);
  };

  const handleRefreshCache = async () => {
    setIsRefreshing(true);
    const result = await refreshMaterialsCache();
    
    if (result.success) {
      toast({
        title: "Success",
        description: "Cache refresh started successfully",
        duration: 3000,
      });
      // Reload status after a brief delay
      setTimeout(loadCacheStatus, 2000);
    } else {
      toast({
        title: "Error",
        description: result.error || "Failed to refresh cache",
        variant: "destructive",
        duration: 5000,
      });
    }
    setIsRefreshing(false);
  };

  useEffect(() => {
    loadCacheStatus();
  }, []);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString();
  };

  const isExpired = (expiresAt: string) => {
    return new Date(expiresAt) < new Date();
  };

  const getStatusBadge = (status: string, expiresAt: string) => {
    if (isExpired(expiresAt)) {
      return <Badge variant="destructive">Expired</Badge>;
    }
    
    switch (status) {
      case 'completed':
        return <Badge variant="default">Active</Badge>;
      case 'processing':
        return <Badge variant="secondary">Processing</Badge>;
      case 'error':
        return <Badge variant="destructive">Error</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  const totalProducts = cacheEntries.reduce((sum, entry) => sum + entry.total_products, 0);
  const activeCaches = cacheEntries.filter(entry => !isExpired(entry.expires_at) && entry.update_status === 'completed').length;

  return (
    <Card className="bg-card border-border">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
        <CardTitle className="text-lg font-semibold flex items-center gap-2">
          <Database className="h-5 w-5" />
          Materials Cache Status
        </CardTitle>
        <div className="flex gap-2">
          <Button 
            variant="outline" 
            size="sm" 
            onClick={loadCacheStatus}
            disabled={isLoading}
            className="flex items-center gap-1.5"
          >
            <RefreshCw className={`h-4 w-4 ${isLoading ? 'animate-spin' : ''}`} />
            Refresh Status
          </Button>
          <Button 
            variant="default" 
            size="sm" 
            onClick={handleRefreshCache}
            disabled={isRefreshing}
            className="flex items-center gap-1.5"
          >
            <RefreshCw className={`h-4 w-4 ${isRefreshing ? 'animate-spin' : ''}`} />
            Update Cache
          </Button>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-4">
        {isLoading ? (
          <div className="space-y-3">
            <div className="h-4 bg-muted rounded animate-pulse" />
            <div className="h-4 bg-muted rounded animate-pulse w-3/4" />
            <div className="h-4 bg-muted rounded animate-pulse w-1/2" />
          </div>
        ) : cacheEntries.length > 0 ? (
          <>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
              <div className="text-center p-3 bg-muted/50 rounded-lg">
                <div className="text-2xl font-bold text-primary">{cacheEntries.length}</div>
                <div className="text-sm text-muted-foreground">Categories</div>
              </div>
              <div className="text-center p-3 bg-muted/50 rounded-lg">
                <div className="text-2xl font-bold text-primary">{activeCaches}</div>
                <div className="text-sm text-muted-foreground">Active</div>
              </div>
              <div className="text-center p-3 bg-muted/50 rounded-lg">
                <div className="text-2xl font-bold text-primary">{totalProducts.toLocaleString()}</div>
                <div className="text-sm text-muted-foreground">Total Materials</div>
              </div>
              <div className="text-center p-3 bg-muted/50 rounded-lg">
                <div className="text-2xl font-bold text-primary">
                  {Math.round((activeCaches / cacheEntries.length) * 100)}%
                </div>
                <div className="text-sm text-muted-foreground">Cache Health</div>
              </div>
            </div>

            <div className="space-y-3">
              {cacheEntries.map((entry, index) => (
                <div key={index} className="border rounded-lg p-4 space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <h4 className="font-medium capitalize">{entry.category}</h4>
                      {getStatusBadge(entry.update_status, entry.expires_at)}
                    </div>
                    <div className="text-sm text-muted-foreground">
                      {entry.total_products.toLocaleString()} materials
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                    <div className="flex items-center gap-2">
                      <Clock className="h-4 w-4 text-muted-foreground" />
                      <span className="text-muted-foreground">Updated:</span>
                      <span>{formatDate(entry.created_at)}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <AlertTriangle className={`h-4 w-4 ${isExpired(entry.expires_at) ? 'text-destructive' : 'text-muted-foreground'}`} />
                      <span className="text-muted-foreground">Expires:</span>
                      <span className={isExpired(entry.expires_at) ? 'text-destructive' : ''}>
                        {formatDate(entry.expires_at)}
                      </span>
                    </div>
                  </div>
                  
                  {!isExpired(entry.expires_at) && (
                    <div className="space-y-1">
                      <div className="flex justify-between text-xs text-muted-foreground">
                        <span>Time until expiry</span>
                        <span>
                          {Math.max(0, Math.round((new Date(entry.expires_at).getTime() - Date.now()) / (1000 * 60 * 60)))} hours
                        </span>
                      </div>
                      <Progress 
                        value={Math.max(0, Math.min(100, 
                          (1 - (new Date(entry.expires_at).getTime() - Date.now()) / (7 * 24 * 60 * 60 * 1000)) * 100
                        ))} 
                        className="h-2"
                      />
                    </div>
                  )}
                </div>
              ))}
            </div>
          </>
        ) : (
          <div className="text-center py-8">
            <Database className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-medium mb-2">No Cache Data Available</h3>
            <p className="text-muted-foreground mb-4">
              The materials cache appears to be empty. This might be why the materials page is loading slowly.
            </p>
            <Button onClick={handleRefreshCache} disabled={isRefreshing}>
              <RefreshCw className={`h-4 w-4 mr-2 ${isRefreshing ? 'animate-spin' : ''}`} />
              Initialize Cache
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default MaterialCacheStatus;