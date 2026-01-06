
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Brain, TrendingUp, Target, Clock, AlertTriangle, CheckCircle, BarChart3, Zap, Loader2, RefreshCw } from "lucide-react";
import { useOJTAnalytics } from "@/hooks/useOJTAnalytics";

const SmartAnalyticsTab = () => {
  const {
    totalHours,
    totalEntries,
    thisWeekHours,
    lastWeekHours,
    weeklyTarget,
    completionPercentage,
    learningMetrics,
    isLoading,
    error,
    refresh
  } = useOJTAnalytics();

  const getPerformanceBadge = (performance: string) => {
    switch (performance) {
      case "excellent":
        return <Badge className="bg-green-600 text-white">Excellent</Badge>;
      case "good":
        return <Badge className="bg-blue-600 text-white">Good</Badge>;
      case "needs-improvement":
        return <Badge className="bg-orange-600 text-white">Needs Focus</Badge>;
      default:
        return <Badge className="bg-white/15 text-white">Average</Badge>;
    }
  };

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case "up":
        return <TrendingUp className="h-4 w-4 text-green-500" />;
      case "slow":
        return <AlertTriangle className="h-4 w-4 text-orange-500" />;
      default:
        return <Target className="h-4 w-4 text-blue-500" />;
    }
  };

  // Calculate derived metrics
  const weeklyProgress = Math.min(Math.round((thisWeekHours / weeklyTarget) * 100), 100);
  const velocityChange = lastWeekHours > 0
    ? Math.round(((thisWeekHours - lastWeekHours) / lastWeekHours) * 100)
    : thisWeekHours > 0 ? 100 : 0;

  // Estimate completion time (assuming 7.5h/week target)
  const remainingHours = 1000 - totalHours;
  const weeksToCompletion = remainingHours / weeklyTarget;
  const monthsToCompletion = (weeksToCompletion / 4.33).toFixed(1);

  // Generate recommendations based on real data
  const generateRecommendations = () => {
    const recommendations = [];

    // Check for low-progress categories
    const needsAttention = learningMetrics.filter(m => m.progress < 50);
    if (needsAttention.length > 0) {
      recommendations.push({
        type: "urgent",
        title: `${needsAttention[0].category} Gap Identified`,
        description: `Progress below target. Recommend focused sessions this week.`,
        action: "View Study Plan"
      });
    }

    // Check for excellent performance
    const excellent = learningMetrics.filter(m => m.performance === 'excellent');
    if (excellent.length > 0) {
      recommendations.push({
        type: "strength",
        title: `Strong ${excellent[0].category}`,
        description: `Exceptional progress suggests readiness for advanced topics.`,
        action: "Explore Advanced"
      });
    }

    // Check weekly target
    if (thisWeekHours < weeklyTarget * 0.5) {
      recommendations.push({
        type: "urgent",
        title: "Weekly Hours Behind",
        description: `Only ${thisWeekHours.toFixed(1)}h logged this week. Target: ${weeklyTarget}h.`,
        action: "Log Hours"
      });
    } else if (thisWeekHours >= weeklyTarget) {
      recommendations.push({
        type: "opportunity",
        title: "Weekly Target Met!",
        description: `Great work! You've logged ${thisWeekHours.toFixed(1)}h this week.`,
        action: "View Progress"
      });
    }

    // Default recommendations if none generated
    if (recommendations.length === 0) {
      recommendations.push({
        type: "opportunity",
        title: "Continue Your Progress",
        description: "Keep logging your OJT hours regularly to track your development.",
        action: "Log Hours"
      });
    }

    return recommendations.slice(0, 3);
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center p-12">
        <div className="text-center">
          <Loader2 className="h-8 w-8 animate-spin text-elec-yellow mx-auto mb-4" />
          <p className="text-white">Loading analytics...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center p-12">
        <AlertTriangle className="h-8 w-8 text-orange-500 mb-4" />
        <p className="text-white mb-4">{error}</p>
        <Button onClick={refresh} variant="outline" size="sm">
          <RefreshCw className="h-4 w-4 mr-2" />
          Retry
        </Button>
      </div>
    );
  }

  const recommendations = generateRecommendations();

  return (
    <div className="space-y-6">
      {/* Stats Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4">
        <Card className="bg-white/5 border-elec-yellow/20">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 px-3 sm:px-6">
            <CardTitle className="text-xs sm:text-sm font-medium">Total Hours</CardTitle>
            <Clock className="h-4 w-4 text-white" />
          </CardHeader>
          <CardContent className="px-3 sm:px-6">
            <div className="text-xl sm:text-2xl font-bold text-elec-yellow">{totalHours.toFixed(1)}h</div>
            <p className="text-xs text-white">
              {totalEntries} entries logged
            </p>
          </CardContent>
        </Card>

        <Card className="bg-white/5 border-elec-yellow/20">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 px-3 sm:px-6">
            <CardTitle className="text-xs sm:text-sm font-medium">This Week</CardTitle>
            <Zap className="h-4 w-4 text-white" />
          </CardHeader>
          <CardContent className="px-3 sm:px-6">
            <div className={`text-xl sm:text-2xl font-bold ${thisWeekHours >= weeklyTarget ? 'text-green-500' : 'text-blue-500'}`}>
              {thisWeekHours.toFixed(1)}h
            </div>
            <p className="text-xs text-white">
              Target: {weeklyTarget}h
            </p>
          </CardContent>
        </Card>

        <Card className="bg-white/5 border-elec-yellow/20">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 px-3 sm:px-6">
            <CardTitle className="text-xs sm:text-sm font-medium">Progress</CardTitle>
            <BarChart3 className="h-4 w-4 text-white" />
          </CardHeader>
          <CardContent className="px-3 sm:px-6">
            <div className="text-xl sm:text-2xl font-bold text-purple-500">{completionPercentage}%</div>
            <p className="text-xs text-white">
              Of OJT complete
            </p>
          </CardContent>
        </Card>

        <Card className="bg-white/5 border-elec-yellow/20">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 px-3 sm:px-6">
            <CardTitle className="text-xs sm:text-sm font-medium">Est. Completion</CardTitle>
            <Target className="h-4 w-4 text-white" />
          </CardHeader>
          <CardContent className="px-3 sm:px-6">
            <div className="text-xl sm:text-2xl font-bold text-amber-500">
              {remainingHours > 0 ? `${monthsToCompletion}mo` : 'Done!'}
            </div>
            <p className="text-xs text-white">
              {remainingHours > 0 ? `${Math.round(remainingHours)}h remaining` : 'Congratulations!'}
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Learning Analytics */}
        <Card className="bg-white/5 border-elec-yellow/20">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-base sm:text-lg">
              <Brain className="h-5 w-5 text-elec-yellow" />
              Learning Analytics
            </CardTitle>
          </CardHeader>
          <CardContent>
            {learningMetrics.length > 0 ? (
              <div className="space-y-5">
                {learningMetrics.map((metric, index) => (
                  <div key={index} className="space-y-2">
                    <div className="flex items-center justify-between flex-wrap gap-2">
                      <div className="flex items-center gap-2">
                        <span className="font-medium text-sm sm:text-base">{metric.category}</span>
                        {getTrendIcon(metric.trend)}
                      </div>
                      <div className="flex items-center gap-2">
                        {getPerformanceBadge(metric.performance)}
                        <span className="text-xs sm:text-sm text-white">{metric.timeSpent}</span>
                      </div>
                    </div>
                    <Progress value={metric.progress} className="h-2" />
                    <p className="text-xs sm:text-sm text-white italic">
                      {metric.aiInsight}
                    </p>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8 text-white">
                <Clock className="h-8 w-8 mx-auto mb-3 opacity-50" />
                <p>No activity logged yet</p>
                <p className="text-sm mt-1">Start logging your OJT hours to see analytics</p>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Recommendations */}
        <Card className="bg-white/5 border-elec-yellow/20">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-base sm:text-lg">
              <Target className="h-5 w-5 text-elec-yellow" />
              Recommendations
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recommendations.map((rec, index) => (
                <div key={index} className="border border-elec-yellow/20 rounded-lg p-3 sm:p-4 bg-white/10">
                  <div className="flex items-start justify-between mb-2 gap-2">
                    <div className="flex items-center gap-2">
                      {rec.type === "urgent" && <AlertTriangle className="h-4 w-4 text-red-500 shrink-0" />}
                      {rec.type === "opportunity" && <TrendingUp className="h-4 w-4 text-blue-500 shrink-0" />}
                      {rec.type === "strength" && <CheckCircle className="h-4 w-4 text-green-500 shrink-0" />}
                      <h4 className="font-medium text-sm sm:text-base">{rec.title}</h4>
                    </div>
                    <Badge
                      variant={rec.type === "urgent" ? "destructive" : "default"}
                      className="shrink-0 text-xs"
                    >
                      {rec.type}
                    </Badge>
                  </div>
                  <p className="text-xs sm:text-sm text-white mb-3">{rec.description}</p>
                  <Button size="sm" variant="outline" className="w-full border-elec-yellow/30 hover:bg-elec-yellow/10">
                    {rec.action}
                  </Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Refresh Button */}
      <div className="flex justify-center">
        <Button onClick={refresh} variant="ghost" size="sm" className="text-white">
          <RefreshCw className="h-4 w-4 mr-2" />
          Refresh Analytics
        </Button>
      </div>
    </div>
  );
};

export default SmartAnalyticsTab;
