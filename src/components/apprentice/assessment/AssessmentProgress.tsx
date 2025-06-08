
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Award, Target, TrendingUp } from "lucide-react";

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
    if (completionRate === 100) return "🎉 All assessments completed!";
    if (completionRate >= 75) return "🚀 Almost there! Great progress!";
    if (completionRate >= 50) return "👍 Halfway through! Keep going!";
    if (completionRate >= 25) return "📚 Good start! Continue learning!";
    return "🎯 Begin your assessment journey!";
  };

  const getNextRecommendation = () => {
    const incomplete = tools.filter(t => !completedAssessments.includes(t.id));
    const essential = incomplete.find(t => t.difficulty === "Essential");
    if (essential) return essential;
    return incomplete[0];
  };

  const nextTool = getNextRecommendation();

  return (
    <Card className="border-elec-yellow/20 bg-elec-gray">
      <CardHeader>
        <CardTitle className="text-elec-yellow flex items-center gap-2">
          <Target className="h-5 w-5" />
          Your Assessment Progress
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="text-center space-y-2">
            <div className="text-2xl font-bold text-elec-yellow">{completedAssessments.length}</div>
            <div className="text-sm text-muted-foreground">Completed</div>
            <Progress value={completionRate} className="h-2" />
          </div>
          
          <div className="text-center space-y-2">
            <div className="text-2xl font-bold text-green-400">{essentialCompleted}/{essentialTotal}</div>
            <div className="text-sm text-muted-foreground">Essential Tools</div>
            <Progress value={(essentialCompleted / essentialTotal) * 100} className="h-2" />
          </div>
          
          <div className="text-center space-y-2">
            <div className="text-2xl font-bold text-blue-400">{Math.round(completionRate)}%</div>
            <div className="text-sm text-muted-foreground">Overall Progress</div>
            <div className="flex items-center justify-center gap-1">
              <TrendingUp className="h-4 w-4 text-green-400" />
              <span className="text-xs text-green-400">Trending up</span>
            </div>
          </div>
        </div>

        <div className="border-t border-elec-yellow/20 pt-4">
          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-medium text-white">{getProgressMessage()}</h4>
              {nextTool && (
                <p className="text-sm text-muted-foreground mt-1">
                  Next recommended: <span className="text-elec-yellow">{nextTool.title}</span>
                </p>
              )}
            </div>
            {completionRate === 100 && (
              <Award className="h-8 w-8 text-elec-yellow" />
            )}
          </div>
        </div>

        {completedAssessments.length > 0 && (
          <div className="bg-elec-dark/30 border border-elec-yellow/20 rounded-lg p-4">
            <h4 className="font-medium text-white mb-2">Recent Achievements</h4>
            <div className="flex flex-wrap gap-2">
              {completedAssessments.slice(-3).map(id => {
                const tool = tools.find(t => t.id === id);
                return tool ? (
                  <span key={id} className="text-xs px-2 py-1 bg-green-400/10 text-green-400 rounded">
                    ✓ {tool.title}
                  </span>
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
