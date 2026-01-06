
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Target, TrendingUp, Award, Sparkles } from "lucide-react";

interface ProgressCardProps {
  completedCount: number;
  totalScenarios: number;
}

const ProgressCard: React.FC<ProgressCardProps> = ({ completedCount, totalScenarios }) => {
  const progressPercentage = totalScenarios > 0
    ? Math.round((completedCount / totalScenarios) * 100)
    : 0;

  const getProgressMessage = () => {
    if (progressPercentage === 100) return "Excellent! All scenarios completed!";
    if (progressPercentage >= 75) return "Almost there! Great progress!";
    if (progressPercentage >= 50) return "Halfway through! Keep going!";
    if (progressPercentage >= 25) return "Good start! Continue learning!";
    return "Begin your safety journey!";
  };

  return (
    <Card className="bg-gradient-to-br from-white/5 to-elec-card border-white/10 overflow-hidden relative animate-fade-in">
      <div className="absolute top-0 right-0 w-64 h-64 bg-green-500/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />

      <CardHeader className="relative">
        <CardTitle className="text-white flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-gradient-to-br from-green-500/20 to-green-500/5 border border-green-500/30">
            <Target className="h-5 w-5 text-green-400" />
          </div>
          Progress Tracking
        </CardTitle>
      </CardHeader>

      <CardContent className="space-y-4 relative">
        {/* Progress Bar */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-white">Scenarios Completed</span>
            <span className="text-sm font-bold text-elec-yellow">{completedCount}/{totalScenarios}</span>
          </div>
          <div className="h-3 bg-white/10 rounded-full overflow-hidden">
            <div
              className="h-full rounded-full bg-gradient-to-r from-green-500 to-green-400 transition-all duration-500"
              style={{ width: `${progressPercentage}%` }}
            />
          </div>
        </div>

        {/* Progress Message */}
        <div className={`p-4 rounded-xl ${progressPercentage === 100 ? 'bg-green-500/10 border border-green-500/30' : 'bg-white/10 border border-white/10'}`}>
          <div className="flex items-center gap-3">
            {progressPercentage === 100 ? (
              <div className="p-2 rounded-lg bg-green-500/20">
                <Award className="h-5 w-5 text-green-400" />
              </div>
            ) : (
              <div className="p-2 rounded-lg bg-blue-500/20">
                <TrendingUp className="h-5 w-5 text-blue-400" />
              </div>
            )}
            <div>
              <h4 className={`font-medium ${progressPercentage === 100 ? 'text-green-400' : 'text-white'}`}>
                {getProgressMessage()}
              </h4>
              {progressPercentage < 100 && (
                <p className="text-sm text-white/80 mt-1">
                  {totalScenarios - completedCount} scenarios remaining
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Info Text */}
        <div className="p-4 rounded-xl bg-blue-500/10 border border-blue-500/30">
          <div className="flex items-start gap-3">
            <div className="p-2 rounded-lg bg-blue-500/20 flex-shrink-0">
              <Sparkles className="h-4 w-4 text-blue-400" />
            </div>
            <p className="text-sm text-white/70">
              Complete all scenarios to improve your understanding of electrical safety regulations and decision-making in the workplace. Your progress is tracked as you work through each scenario.
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProgressCard;
