import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export const ProjectSkeletonCard = () => {
  return (
    <Card className="min-h-[400px] flex flex-col border-elec-yellow/20 bg-elec-gray">
      <CardHeader className="pb-3 flex-shrink-0">
        <Skeleton className="h-6 w-3/4 bg-elec-dark" />
        <div className="space-y-2 mt-2">
          <Skeleton className="h-4 w-full bg-elec-dark" />
          <Skeleton className="h-4 w-2/3 bg-elec-dark" />
        </div>
      </CardHeader>
      
      <CardContent className="space-y-3 flex-1 flex flex-col">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          <Skeleton className="h-4 w-full bg-elec-dark" />
          <Skeleton className="h-4 w-full bg-elec-dark" />
        </div>
        
        <div className="bg-elec-dark rounded-md p-3 flex-1">
          <Skeleton className="h-5 w-1/2 bg-gray-600 mb-2" />
          <div className="space-y-2">
            <Skeleton className="h-3 w-full bg-gray-600" />
            <Skeleton className="h-3 w-5/6 bg-gray-600" />
            <Skeleton className="h-3 w-4/5 bg-gray-600" />
          </div>
        </div>
      </CardContent>
      
      <CardFooter className="flex flex-col sm:flex-row gap-2 pt-0 flex-shrink-0">
        <Skeleton className="h-10 w-full bg-elec-dark" />
        <Skeleton className="h-10 w-full sm:w-12 bg-elec-dark" />
      </CardFooter>
    </Card>
  );
};

export const ProjectManagementSkeletonCard = () => {
  return (
    <Card className="min-h-[400px] flex flex-col border-elec-yellow/20 bg-elec-gray">
      {/* Progress bar placeholder */}
      <div className="h-1 bg-elec-dark w-1/3"></div>
      
      <CardHeader className="pb-2 space-y-3 flex-shrink-0">
        <div className="flex items-start justify-between gap-2">
          <Skeleton className="h-6 w-20 bg-elec-dark" />
          <div className="flex gap-1">
            <Skeleton className="h-8 w-8 bg-elec-dark rounded" />
            <Skeleton className="h-8 w-8 bg-elec-dark rounded" />
          </div>
        </div>
        <Skeleton className="h-6 w-3/4 bg-elec-dark" />
        <Skeleton className="h-4 w-1/2 bg-elec-dark" />
      </CardHeader>
      
      <CardContent className="space-y-4 pb-2 flex-1 flex flex-col">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          <Skeleton className="h-4 w-full bg-elec-dark" />
          <Skeleton className="h-4 w-full bg-elec-dark" />
        </div>
        
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 sm:gap-3 pt-1">
          <div className="bg-elec-dark rounded-md p-2 text-center">
            <Skeleton className="h-4 w-4 mx-auto mb-1 bg-gray-600" />
            <Skeleton className="h-3 w-12 mx-auto mb-1 bg-gray-600" />
            <Skeleton className="h-4 w-16 mx-auto bg-gray-600" />
          </div>
          <div className="bg-elec-dark rounded-md p-2 text-center">
            <Skeleton className="h-4 w-4 mx-auto mb-1 bg-gray-600" />
            <Skeleton className="h-3 w-12 mx-auto mb-1 bg-gray-600" />
            <Skeleton className="h-4 w-16 mx-auto bg-gray-600" />
          </div>
          <div className="bg-elec-dark rounded-md p-2 text-center col-span-2 sm:col-span-1">
            <Skeleton className="h-4 w-4 mx-auto mb-1 bg-gray-600" />
            <Skeleton className="h-3 w-12 mx-auto mb-1 bg-gray-600" />
            <Skeleton className="h-4 w-16 mx-auto bg-gray-600" />
          </div>
        </div>
        
        <div className="flex gap-1 mt-auto">
          <Skeleton className="h-5 w-20 bg-elec-dark" />
          <Skeleton className="h-5 w-16 bg-elec-dark" />
        </div>
      </CardContent>
      
      <CardFooter className="pt-2 flex-shrink-0">
        <Skeleton className="h-11 w-full bg-elec-dark" />
      </CardFooter>
    </Card>
  );
};