
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Brain, TrendingUp, Target, Clock, AlertTriangle, CheckCircle, BarChart3, Zap } from "lucide-react";

const SmartAnalyticsTab = () => {
  const learningMetrics = [
    {
      category: "Electrical Theory",
      progress: 85,
      trend: "up",
      aiInsight: "Strong progress - focus on advanced circuits",
      timeSpent: "24h",
      performance: "excellent"
    },
    {
      category: "Practical Skills",
      progress: 72,
      trend: "up",
      aiInsight: "Good hands-on development - more cable management practice needed",
      timeSpent: "18h",
      performance: "good"
    },
    {
      category: "Health & Safety",
      progress: 92,
      trend: "stable",
      aiInsight: "Exemplary safety awareness - maintain current standards",
      timeSpent: "12h",
      performance: "excellent"
    },
    {
      category: "Regulations",
      progress: 68,
      trend: "slow",
      aiInsight: "Needs attention - recommend focused BS 7671 study sessions",
      timeSpent: "8h",
      performance: "needs-improvement"
    }
  ];

  const aiRecommendations = [
    {
      type: "urgent",
      title: "Regulations Gap Identified",
      description: "BS 7671 knowledge below target. Recommend 3 focused sessions this week.",
      action: "Start Study Plan"
    },
    {
      type: "opportunity",
      title: "Advanced Circuit Analysis",
      description: "Ready for complex circuit calculations based on theory progress.",
      action: "Unlock Module"
    },
    {
      type: "strength",
      title: "Safety Leadership Potential",
      description: "Exceptional safety scores suggest potential for safety officer role.",
      action: "Explore Path"
    }
  ];

  const getPerformanceBadge = (performance: string) => {
    switch (performance) {
      case "excellent":
        return <Badge className="bg-green-600 text-white">Excellent</Badge>;
      case "good":
        return <Badge className="bg-blue-600 text-white">Good</Badge>;
      case "needs-improvement":
        return <Badge className="bg-orange-600 text-white">Needs Focus</Badge>;
      default:
        return <Badge>Average</Badge>;
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

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">AI Learning Score</CardTitle>
            <Brain className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-500">87%</div>
            <p className="text-xs text-muted-foreground">
              +12% this month
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Progress Velocity</CardTitle>
            <Zap className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-500">+23%</div>
            <p className="text-xs text-muted-foreground">
              Above target pace
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Efficiency Rating</CardTitle>
            <BarChart3 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-purple-500">94%</div>
            <p className="text-xs text-muted-foreground">
              Time optimisation
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Predicted Completion</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-elec-yellow">2.3 months</div>
            <p className="text-xs text-muted-foreground">
              Ahead of schedule
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Brain className="h-5 w-5" />
              Learning Analytics
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {learningMetrics.map((metric, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="font-medium">{metric.category}</span>
                      {getTrendIcon(metric.trend)}
                    </div>
                    <div className="flex items-center gap-2">
                      {getPerformanceBadge(metric.performance)}
                      <span className="text-sm text-muted-foreground">{metric.timeSpent}</span>
                    </div>
                  </div>
                  <Progress value={metric.progress} className="h-2" />
                  <p className="text-sm text-muted-foreground italic">
                    AI Insight: {metric.aiInsight}
                  </p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Target className="h-5 w-5" />
              AI Recommendations
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {aiRecommendations.map((rec, index) => (
                <div key={index} className="border rounded-lg p-4">
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex items-center gap-2">
                      {rec.type === "urgent" && <AlertTriangle className="h-4 w-4 text-red-500" />}
                      {rec.type === "opportunity" && <TrendingUp className="h-4 w-4 text-blue-500" />}
                      {rec.type === "strength" && <CheckCircle className="h-4 w-4 text-green-500" />}
                      <h4 className="font-medium">{rec.title}</h4>
                    </div>
                    <Badge variant={rec.type === "urgent" ? "destructive" : "default"}>
                      {rec.type}
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground mb-3">{rec.description}</p>
                  <Button size="sm" variant="outline" className="w-full">
                    {rec.action}
                  </Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default SmartAnalyticsTab;
