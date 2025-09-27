import React from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  CheckCircle2, 
  Clock, 
  AlertTriangle,
  FileText,
  TrendingUp
} from "lucide-react";

interface ProgressSummaryProps {
  currentStep: number;
  totalSteps: number;
  completedFields: string[];
  totalFields: string[];
  templateName?: string;
  estimatedTimeRemaining?: string;
}

const ProgressSummary: React.FC<ProgressSummaryProps> = ({
  currentStep,
  totalSteps,
  completedFields,
  totalFields,
  templateName = "Report",
  estimatedTimeRemaining = "5-10 min"
}) => {
  const overallProgress = ((currentStep - 1) / totalSteps + (completedFields.length / totalFields.length) / totalSteps) * 100;
  const currentStepProgress = (completedFields.length / totalFields.length) * 100;
  
  const missingFields = totalFields.filter(field => !completedFields.includes(field));
  
  return (
    <Card className="bg-elec-card border-elec-yellow/30 p-6">
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-elec-yellow/10 rounded-lg">
              <FileText className="h-5 w-5 text-elec-yellow" />
            </div>
            <div>
              <h3 className="text-lg font-medium text-white">{templateName}</h3>
              <p className="text-sm text-muted-foreground">Progress Summary</p>
            </div>
          </div>
          
          <div className="text-right">
            <Badge variant="outline" className="text-elec-yellow border-elec-yellow/50">
              Step {currentStep} of {totalSteps}
            </Badge>
          </div>
        </div>

        {/* Overall Progress */}
        <div className="space-y-2">
          <div className="flex items-center justify-between text-sm">
            <span className="text-white font-medium">Overall Progress</span>
            <span className="text-elec-yellow">{Math.round(overallProgress)}%</span>
          </div>
          <Progress value={overallProgress} className="h-2" />
        </div>

        {/* Current Step Progress */}
        <div className="space-y-2">
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">Current Step</span>
            <span className="text-white">{Math.round(currentStepProgress)}%</span>
          </div>
          <Progress value={currentStepProgress} className="h-1.5" />
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-3 gap-4">
          <div className="text-center p-3 bg-elec-dark rounded-lg">
            <div className="flex items-center justify-center gap-1 mb-1">
              <CheckCircle2 className="h-4 w-4 text-green-400" />
              <span className="text-sm text-green-400 font-medium">
                {completedFields.length}
              </span>
            </div>
            <span className="text-xs text-muted-foreground">Completed</span>
          </div>
          
          <div className="text-center p-3 bg-elec-dark rounded-lg">
            <div className="flex items-center justify-center gap-1 mb-1">
              <AlertTriangle className="h-4 w-4 text-yellow-400" />
              <span className="text-sm text-yellow-400 font-medium">
                {missingFields.length}
              </span>
            </div>
            <span className="text-xs text-muted-foreground">Remaining</span>
          </div>
          
          <div className="text-center p-3 bg-elec-dark rounded-lg">
            <div className="flex items-center justify-center gap-1 mb-1">
              <Clock className="h-4 w-4 text-blue-400" />
              <span className="text-sm text-blue-400 font-medium">
                {estimatedTimeRemaining}
              </span>
            </div>
            <span className="text-xs text-muted-foreground">Time Left</span>
          </div>
        </div>

        {/* Missing Fields Alert */}
        {missingFields.length > 0 && (
          <div className="p-3 bg-yellow-500/10 border border-yellow-500/30 rounded-lg">
            <div className="flex items-start gap-2">
              <AlertTriangle className="h-4 w-4 text-yellow-400 mt-0.5 flex-shrink-0" />
              <div className="flex-1 min-w-0">
                <div className="text-sm font-medium text-yellow-400 mb-1">
                  Required fields missing
                </div>
                <div className="text-xs text-yellow-400/80">
                  Complete these to continue: {missingFields.slice(0, 3).join(', ')}
                  {missingFields.length > 3 && ` +${missingFields.length - 3} more`}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Success State */}
        {missingFields.length === 0 && currentStepProgress === 100 && (
          <div className="p-3 bg-green-500/10 border border-green-500/30 rounded-lg">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="h-4 w-4 text-green-400" />
              <div className="text-sm font-medium text-green-400">
                Step completed! Ready to continue.
              </div>
            </div>
          </div>
        )}
      </div>
    </Card>
  );
};

export default ProgressSummary;