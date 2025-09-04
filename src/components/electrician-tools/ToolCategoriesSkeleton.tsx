import React from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

interface ToolCategoriesSkeletonProps {
  count?: number;
}

const ToolCategoriesSkeleton = ({ count = 6 }: ToolCategoriesSkeletonProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {Array.from({ length: count }).map((_, i) => (
        <Card key={i} className="border-elec-yellow/20 bg-elec-gray/50 relative">
          {/* Trending badge skeleton */}
          {i % 3 === 0 && (
            <div className="absolute top-2 right-2">
              <Skeleton className="h-4 w-4 rounded" />
            </div>
          )}
          
          <CardHeader className="pb-3">
            <div className="flex items-center gap-2">
              {/* Icon skeleton */}
              <Skeleton className="h-5 w-5 rounded" />
              {/* Title skeleton */}
              <Skeleton className="h-5 w-24 flex-1" />
              {/* Count badge skeleton */}
              <div className="ml-auto flex items-center gap-1">
                <Skeleton className="w-1.5 h-1.5 rounded-full" />
                <Skeleton className="h-6 w-8 rounded" />
              </div>
            </div>
          </CardHeader>
          
          <CardContent>
            {/* Description skeleton */}
            <div className="space-y-2 mb-2">
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-3/4" />
            </div>
            
            {/* Price range skeleton */}
            <Skeleton className="h-3 w-20 mb-3" />
            
            {/* Browse button skeleton */}
            <Skeleton className="h-8 w-full rounded" />
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default ToolCategoriesSkeleton;