
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AlertTriangle } from "lucide-react";

interface ProgressCardProps {
  completedCount: number;
  totalScenarios: number;
}

const ProgressCard: React.FC<ProgressCardProps> = ({ completedCount, totalScenarios }) => {
  const progressPercentage = Math.round((completedCount / totalScenarios) * 100);

  return (
    <Card className="border-elec-yellow/20 bg-elec-gray">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <AlertTriangle className="h-5 w-5 text-elec-yellow" />
          Progress Tracking
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="mb-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium">Scenarios Completed</span>
            <span className="text-sm text-elec-yellow">{completedCount}/{totalScenarios}</span>
          </div>
          <div className="h-2 bg-elec-dark/60 rounded-full overflow-hidden">
            <div className="h-full bg-elec-yellow" style={{ width: `${progressPercentage}%` }}></div>
          </div>
        </div>
        <p className="text-sm text-elec-light/70">
          Complete all scenarios to improve your understanding of electrical safety regulations and decision-making in the workplace.
          Your progress is tracked as you work through the scenarios.
        </p>
      </CardContent>
    </Card>
  );
};

export default ProgressCard;
