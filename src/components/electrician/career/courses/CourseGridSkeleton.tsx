import React from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

interface CourseGridSkeletonProps {
  count?: number;
}

const CourseGridSkeleton = ({ count = 9 }: CourseGridSkeletonProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
      {Array.from({ length: count }).map((_, i) => (
        <Card key={i} className="border-elec-yellow/20 bg-elec-gray overflow-hidden">
          <CardHeader className="p-4">
            <div className="space-y-3">
              <div className="flex items-start justify-between">
                <Skeleton className="h-5 w-3/4" />
                <Skeleton className="h-4 w-16" />
              </div>
              <Skeleton className="h-4 w-1/2" />
            </div>
          </CardHeader>
          <CardContent className="p-4 pt-0">
            <div className="space-y-3">
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-5/6" />
              <div className="flex items-center gap-2">
                <Skeleton className="h-4 w-16" />
                <Skeleton className="h-4 w-20" />
              </div>
              <div className="flex items-center justify-between pt-2">
                <Skeleton className="h-4 w-24" />
                <Skeleton className="h-8 w-20" />
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default CourseGridSkeleton;