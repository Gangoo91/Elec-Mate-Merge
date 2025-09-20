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

  return null;
};

export default JobSourceProgress;