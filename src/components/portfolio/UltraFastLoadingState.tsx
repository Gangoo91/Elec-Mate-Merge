import { memo } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';

interface UltraFastLoadingStateProps {
  showSkeleton?: boolean;
  message?: string;
}

export const UltraFastLoadingState = memo(({ 
  showSkeleton = true, 
  message = "Loading your portfolio..." 
}: UltraFastLoadingStateProps) => {
  if (!showSkeleton) {
    return (
      <div className="flex justify-center items-center p-12">
        <div className="flex flex-col items-center gap-4">
          <div className="h-8 w-8 rounded-full border-4 border-elec-yellow/20 border-t-elec-yellow animate-spin"></div>
          <p className="text-muted-foreground text-sm">{message}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6 bg-elec-gray min-h-screen p-4 sm:p-6">
      {/* Header Skeleton */}
      <Card className="border-elec-yellow/20 bg-elec-dark">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <div className="animate-spin h-4 w-4 border-2 border-elec-yellow border-t-transparent rounded-full" />
            <Skeleton className="h-6 w-48 bg-elec-yellow/20" />
          </CardTitle>
          <Skeleton className="h-4 w-96 bg-elec-yellow/10" />
        </CardHeader>
      </Card>

      {/* Action Buttons Skeleton */}
      <div className="flex flex-col sm:flex-row gap-4">
        <Skeleton className="h-12 w-48 bg-elec-yellow/20" />
        <Skeleton className="h-12 w-36 bg-elec-yellow/10" />
      </div>

      {/* Stats Cards Skeleton */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {[1, 2, 3].map((i) => (
          <Card key={i} className="border-elec-yellow/20 bg-elec-dark">
            <CardContent className="p-4">
              <div className="flex items-center gap-2">
                <Skeleton className="h-5 w-5 bg-elec-yellow/20" />
                <div className="space-y-2">
                  <Skeleton className="h-3 w-20 bg-elec-yellow/10" />
                  <Skeleton className="h-8 w-12 bg-elec-yellow/20" />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Content Area Skeleton */}
      <Card className="border-elec-yellow/20 bg-elec-dark">
        <CardContent className="p-6">
          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="space-y-3">
                <div className="flex items-center justify-between">
                  <Skeleton className="h-5 w-32 bg-elec-yellow/20" />
                  <Skeleton className="h-6 w-16 bg-elec-yellow/10" />
                </div>
                <Skeleton className="h-3 w-full bg-elec-yellow/5" />
                <Skeleton className="h-2 w-full bg-elec-yellow/10" />
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Loading Message */}
      <div className="text-center py-8">
        <p className="text-muted-foreground text-sm animate-pulse">
          {message}
        </p>
        <p className="text-xs text-muted-foreground/60 mt-2">
          Using cached data for instant loading...
        </p>
      </div>
    </div>
  );
});