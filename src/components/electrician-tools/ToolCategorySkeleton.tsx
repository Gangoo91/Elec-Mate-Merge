import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

const ToolCategorySkeleton = () => {
  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header Skeleton */}
      <div className="space-y-4">
        <Skeleton className="h-8 w-32" />
        <div className="flex items-center gap-4">
          <Skeleton className="h-10 w-40" />
          <Skeleton className="h-10 w-10" />
        </div>
        <Skeleton className="h-10 w-full max-w-md" />
      </div>

      {/* Banner Skeleton */}
      <Skeleton className="h-32 w-full rounded-lg" />

      {/* Grid Skeleton */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {Array.from({ length: 6 }).map((_, i) => (
          <Card key={i} className="border-elec-yellow/20 bg-elec-gray">
            <CardHeader>
              <Skeleton className="h-48 w-full rounded-md" />
              <Skeleton className="h-6 w-3/4 mt-4" />
              <Skeleton className="h-4 w-1/2 mt-2" />
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-8 w-full" />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default ToolCategorySkeleton;
