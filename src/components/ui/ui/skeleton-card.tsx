import React from 'react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { cn } from '@/lib/utils';

interface SkeletonCardProps {
  className?: string;
  lines?: number;
}

export const SkeletonCard: React.FC<SkeletonCardProps> = ({ 
  className, 
  lines = 3 
}) => {
  return (
    <Card className={cn('animate-pulse', className)}>
      <CardHeader className="space-y-2">
        <div className="h-5 sm:h-6 bg-muted rounded w-3/4" />
        <div className="h-3 sm:h-4 bg-muted rounded w-1/2" />
      </CardHeader>
      <CardContent className="space-y-3">
        {Array.from({ length: lines }).map((_, i) => (
          <div 
            key={i} 
            className="h-3 sm:h-4 bg-muted rounded" 
            style={{ width: i === lines - 1 ? '60%' : '100%' }}
          />
        ))}
      </CardContent>
    </Card>
  );
};

export const SkeletonGrid: React.FC<{ count?: number; columns?: number }> = ({ 
  count = 6,
  columns = 3
}) => {
  return (
    <div className={cn(
      'grid gap-4 sm:gap-6',
      columns === 2 && 'grid-cols-1 md:grid-cols-2',
      columns === 3 && 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3',
      columns === 4 && 'grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4'
    )}>
      {Array.from({ length: count }).map((_, i) => (
        <SkeletonCard key={i} />
      ))}
    </div>
  );
};

export const SkeletonText: React.FC<{ className?: string }> = ({ className }) => {
  return <div className={cn('h-4 bg-muted rounded animate-pulse', className)} />;
};
