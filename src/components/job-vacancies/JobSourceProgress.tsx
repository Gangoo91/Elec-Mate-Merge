import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  CheckCircle, 
  Clock, 
  Loader2, 
  XCircle, 
  Timer 
} from "lucide-react";
import { JobSourceStatus, SearchProgress } from "@/hooks/job-vacancies/useUnifiedJobSearch";

interface JobSourceProgressProps {
  searchProgress: SearchProgress;
}

const JobSourceProgress: React.FC<JobSourceProgressProps> = ({ searchProgress }) => {
  const getStatusIcon = (status: JobSourceStatus['status']) => {
    switch (status) {
      case 'pending':
        return <Clock className="h-4 w-4 text-muted-foreground" />;
      case 'loading':
        return <Loader2 className="h-4 w-4 animate-spin text-elec-yellow" />;
      case 'completed':
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      case 'failed':
        return <XCircle className="h-4 w-4 text-red-500" />;
      case 'timeout':
        return <Timer className="h-4 w-4 text-orange-500" />;
      default:
        return <Clock className="h-4 w-4 text-muted-foreground" />;
    }
  };

  const getStatusColor = (status: JobSourceStatus['status']) => {
    switch (status) {
      case 'pending':
        return "bg-muted text-muted-foreground";
      case 'loading':
        return "bg-elec-yellow/20 text-elec-yellow";
      case 'completed':
        return "bg-green-500/20 text-green-500";
      case 'failed':
        return "bg-red-500/20 text-red-500";
      case 'timeout':
        return "bg-orange-500/20 text-orange-500";
      default:
        return "bg-muted text-muted-foreground";
    }
  };

  const progressPercentage = searchProgress.totalSources > 0 
    ? (searchProgress.completedSources / searchProgress.totalSources) * 100 
    : 0;

  if (!searchProgress.isSearching && searchProgress.completedSources === 0) {
    return null;
  }

  return (
    <Card className="border-elec-yellow/20 bg-elec-card/50">
      <CardContent className="p-4">
        <div className="space-y-4">
          {/* Overall Progress */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-elec-light">
                {searchProgress.isSearching ? 'Searching job sources...' : 'Search completed'}
              </span>
              <span className="text-sm text-muted-foreground">
                {searchProgress.completedSources}/{searchProgress.totalSources} sources
              </span>
            </div>
            <Progress value={progressPercentage} className="h-2" />
            {searchProgress.totalJobsFound > 0 && (
              <div className="text-center">
                <Badge variant="secondary" className="bg-elec-yellow/20 text-elec-yellow">
                  {searchProgress.totalJobsFound} jobs found so far
                </Badge>
              </div>
            )}
          </div>

          {/* Individual Source Status */}
          {searchProgress.isSearching && (
            <div className="grid grid-cols-2 md:grid-cols-5 gap-2">
              {searchProgress.sources.map((source) => (
                <div 
                  key={source.source}
                  className="flex items-center gap-2 p-2 rounded-lg bg-elec-gray/30"
                >
                  {getStatusIcon(source.status)}
                  <div className="flex-1 min-w-0">
                    <div className="text-xs font-medium text-elec-light truncate">
                      {source.source}
                    </div>
                    {source.jobCount > 0 && (
                      <div className="text-xs text-muted-foreground">
                        {source.jobCount} jobs
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Still Searching Message */}
          {searchProgress.isSearching && (
            <div className="text-center py-2">
              <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
                <Loader2 className="h-4 w-4 animate-spin" />
                Still searching remaining sources...
              </div>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default JobSourceProgress;