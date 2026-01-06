
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Award, Target, TrendingUp, CheckCircle, Sparkles } from "lucide-react";

interface AssessmentTool {
  id: string;
  title: string;
  difficulty: string;
}

interface AssessmentProgressProps {
  tools: AssessmentTool[];
  completedAssessments: string[];
}

const AssessmentProgress = ({ tools, completedAssessments }: AssessmentProgressProps) => {
  const completionRate = (completedAssessments.length / tools.length) * 100;
  const essentialCompleted = completedAssessments.filter(id =>
    tools.find(t => t.id === id)?.difficulty === "Essential"
  ).length;
  const essentialTotal = tools.filter(t => t.difficulty === "Essential").length;

  const getProgressMessage = () => {
    if (completionRate === 100) return "All assessments completed!";
    if (completionRate >= 75) return "Almost there! Great progress!";
    if (completionRate >= 50) return "Halfway through! Keep going!";
    if (completionRate >= 25) return "Good start! Continue learning!";
    return "Begin your assessment journey!";
  };

  const getNextRecommendation = () => {
    const incomplete = tools.filter(t => !completedAssessments.includes(t.id));
    const essential = incomplete.find(t => t.difficulty === "Essential");
    if (essential) return essential;
    return incomplete[0];
  };

  const nextTool = getNextRecommendation();

  return (
    <Card className="bg-gradient-to-br from-elec-gray to-elec-card border-white/10 overflow-hidden relative">
      <div className="absolute top-0 right-0 w-64 h-64 bg-elec-yellow/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
      <CardHeader className="relative">
        <CardTitle className="text-white flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-gradient-to-br from-elec-yellow/20 to-elec-yellow/5 border border-elec-yellow/30">
            <Target className="h-5 w-5 text-elec-yellow" />
          </div>
          Your Assessment Progress
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6 relative">
        {/* Stats Grid */}
        <div className="grid grid-cols-3 gap-3 sm:gap-4">
          <div className="p-4 rounded-xl bg-white/10 border border-white/10 text-center">
            <div className="text-2xl sm:text-3xl font-bold text-elec-yellow mb-1">
              {completedAssessments.length}
            </div>
            <div className="text-xs sm:text-sm text-white/60">Completed</div>
            {/* Progress Bar */}
            <div className="mt-3 h-1.5 bg-white/10 rounded-full overflow-hidden">
              <div
                className="h-full rounded-full bg-gradient-to-r from-elec-yellow to-elec-yellow/70 transition-all duration-500"
                style={{ width: `${completionRate}%` }}
              />
            </div>
          </div>

          <div className="p-4 rounded-xl bg-white/10 border border-white/10 text-center">
            <div className="text-2xl sm:text-3xl font-bold text-green-400 mb-1">
              {essentialCompleted}/{essentialTotal}
            </div>
            <div className="text-xs sm:text-sm text-white/60">Essential</div>
            {/* Progress Bar */}
            <div className="mt-3 h-1.5 bg-white/10 rounded-full overflow-hidden">
              <div
                className="h-full rounded-full bg-gradient-to-r from-green-500 to-green-400 transition-all duration-500"
                style={{ width: `${(essentialCompleted / essentialTotal) * 100}%` }}
              />
            </div>
          </div>

          <div className="p-4 rounded-xl bg-white/10 border border-white/10 text-center">
            <div className="text-2xl sm:text-3xl font-bold text-blue-400 mb-1">
              {Math.round(completionRate)}%
            </div>
            <div className="text-xs sm:text-sm text-white/60">Overall</div>
            <div className="mt-2 flex items-center justify-center gap-1">
              <TrendingUp className="h-3 w-3 text-green-400" />
              <span className="text-xs text-green-400">Trending up</span>
            </div>
          </div>
        </div>

        {/* Progress Message */}
        <div className="p-4 rounded-xl bg-white/10 border border-white/10">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              {completionRate === 100 ? (
                <div className="p-2.5 rounded-xl bg-gradient-to-br from-green-500/20 to-green-500/5 border border-green-500/30">
                  <Sparkles className="h-5 w-5 text-green-400" />
                </div>
              ) : (
                <div className="p-2.5 rounded-xl bg-gradient-to-br from-blue-500/20 to-blue-500/5 border border-blue-500/30">
                  <Target className="h-5 w-5 text-blue-400" />
                </div>
              )}
              <div>
                <h4 className="font-medium text-white">{getProgressMessage()}</h4>
                {nextTool && completionRate < 100 && (
                  <p className="text-sm text-white/60 mt-1">
                    Next recommended: <span className="text-elec-yellow">{nextTool.title}</span>
                  </p>
                )}
              </div>
            </div>
            {completionRate === 100 && (
              <div className="p-2 rounded-lg bg-elec-yellow/20">
                <Award className="h-6 w-6 text-elec-yellow" />
              </div>
            )}
          </div>
        </div>

        {/* Recent Achievements */}
        {completedAssessments.length > 0 && (
          <div className="p-4 rounded-xl bg-green-500/5 border border-green-500/20">
            <h4 className="font-medium text-white mb-3 flex items-center gap-2">
              <CheckCircle className="h-4 w-4 text-green-400" />
              Recent Achievements
            </h4>
            <div className="flex flex-wrap gap-2">
              {completedAssessments.slice(-3).map(id => {
                const tool = tools.find(t => t.id === id);
                return tool ? (
                  <Badge
                    key={id}
                    className="bg-green-500/10 text-green-400 border-green-500/30"
                  >
                    {tool.title}
                  </Badge>
                ) : null;
              })}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default AssessmentProgress;
