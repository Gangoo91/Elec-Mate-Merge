
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CheckCircle, Circle, Target, Calendar } from "lucide-react";
import { useCareerProgress } from "@/hooks/career/useCareerProgress";

interface ProgressTrackerProps {
  careerPathId: string;
  careerPathTitle: string;
  milestones: string[];
  onUpdateProgress?: () => void;
}

const ProgressTracker: React.FC<ProgressTrackerProps> = ({
  careerPathId,
  careerPathTitle,
  milestones,
  onUpdateProgress
}) => {
  const { getProgressForPath, updateProgress } = useCareerProgress();
  const progressData = getProgressForPath(careerPathId);

  const handleMilestoneToggle = async (milestone: string) => {
    const currentMilestones = progressData?.milestones_completed || [];
    const isCompleted = currentMilestones.includes(milestone);
    
    let newMilestones: string[];
    if (isCompleted) {
      newMilestones = currentMilestones.filter(m => m !== milestone);
    } else {
      newMilestones = [...currentMilestones, milestone];
    }

    const newPercentage = Math.round((newMilestones.length / milestones.length) * 100);

    await updateProgress(careerPathId, {
      progress_percentage: newPercentage,
      milestones_completed: newMilestones,
    });

    if (onUpdateProgress) {
      onUpdateProgress();
    }
  };

  const setTargetDate = async () => {
    const targetDate = new Date();
    targetDate.setFullYear(targetDate.getFullYear() + 2); // Default 2 years from now

    await updateProgress(careerPathId, {
      target_completion_date: targetDate.toISOString().split('T')[0],
    });
  };

  return (
    <Card className="border-elec-yellow/20 bg-elec-gray">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-elec-yellow">
          <Target className="h-5 w-5" />
          Progress Tracker - {careerPathTitle}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Overall Progress */}
        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <span className="text-sm font-medium">Overall Progress</span>
            <Badge variant="outline" className="border-elec-yellow/40 text-elec-yellow">
              {progressData?.progress_percentage || 0}%
            </Badge>
          </div>
          <Progress 
            value={progressData?.progress_percentage || 0} 
            className="h-2" 
          />
        </div>

        {/* Target Date */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Calendar className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm">Target Completion:</span>
          </div>
          {progressData?.target_completion_date ? (
            <span className="text-sm text-elec-yellow">
              {new Date(progressData.target_completion_date).toLocaleDateString()}
            </span>
          ) : (
            <Button variant="outline" size="sm" onClick={setTargetDate}>
              Set Target
            </Button>
          )}
        </div>

        {/* Milestones */}
        <div className="space-y-3">
          <h4 className="font-medium text-white">Milestones</h4>
          <div className="space-y-2">
            {milestones.map((milestone, index) => {
              const isCompleted = progressData?.milestones_completed?.includes(milestone) || false;
              return (
                <div
                  key={index}
                  className="flex items-center gap-3 p-2 rounded-lg hover:bg-elec-yellow/5 cursor-pointer transition-colors"
                  onClick={() => handleMilestoneToggle(milestone)}
                >
                  {isCompleted ? (
                    <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0" />
                  ) : (
                    <Circle className="h-5 w-5 text-muted-foreground flex-shrink-0" />
                  )}
                  <span className={`text-sm ${isCompleted ? 'text-green-300 line-through' : 'text-white'}`}>
                    {milestone}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProgressTracker;
