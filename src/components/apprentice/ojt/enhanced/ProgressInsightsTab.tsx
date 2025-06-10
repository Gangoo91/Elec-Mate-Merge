
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { TrendingUp, TrendingDown, Target, Calendar, Brain, Zap, BarChart3, Users } from "lucide-react";

const ProgressInsightsTab = () => {
  const progressMetrics = [
    {
      category: "Technical Skills",
      current: 78,
      target: 85,
      trend: "up",
      weeklyChange: +5,
      prediction: "On track to meet target by next month"
    },
    {
      category: "Practical Experience", 
      current: 82,
      target: 80,
      trend: "up",
      weeklyChange: +3,
      prediction: "Exceeding expectations, maintain current pace"
    },
    {
      category: "Theory Knowledge",
      current: 65,
      target: 75,
      trend: "down",
      weeklyChange: -2,
      prediction: "Needs focused study, recommend 5 hours/week"
    },
    {
      category: "Professional Skills",
      current: 70,
      target: 75,
      trend: "up",
      weeklyChange: +2,
      prediction: "Steady improvement, on track for target"
    }
  ];

  const weeklyInsights = [
    {
      type: "achievement",
      title: "Milestone Reached",
      description: "Completed 75% of Year 2 requirements",
      impact: "positive"
    },
    {
      type: "concern",
      title: "Study Pattern Alert",
      description: "Theory study time decreased by 30% this week",
      impact: "negative"
    },
    {
      type: "recommendation",
      title: "Learning Opportunity",
      description: "New commercial project available for portfolio",
      impact: "neutral"
    },
    {
      type: "prediction",
      title: "Assessment Readiness",
      description: "EPA readiness increased to 73% based on current progress",
      impact: "positive"
    }
  ];

  const benchmarkData = [
    {
      metric: "OJT Hours Completed",
      yourValue: 156,
      cohortAverage: 142,
      topPerformers: 180,
      status: "above-average"
    },
    {
      metric: "Portfolio Completeness",
      yourValue: 75,
      cohortAverage: 68,
      topPerformers: 85,
      status: "above-average"
    },
    {
      metric: "Assessment Scores",
      yourValue: 78,
      cohortAverage: 75,
      topPerformers: 88,
      status: "above-average"
    },
    {
      metric: "Study Hours/Week",
      yourValue: 8,
      cohortAverage: 12,
      topPerformers: 16,
      status: "below-average"
    }
  ];

  const getTrendIcon = (trend: string) => {
    return trend === "up" ? (
      <TrendingUp className="h-4 w-4 text-green-500" />
    ) : (
      <TrendingDown className="h-4 w-4 text-red-500" />
    );
  };

  const getImpactColor = (impact: string) => {
    switch (impact) {
      case "positive":
        return "text-green-500";
      case "negative":
        return "text-red-500";
      default:
        return "text-blue-500";
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "above-average":
        return <Badge className="bg-green-600 text-white">Above Average</Badge>;
      case "below-average":
        return <Badge className="bg-orange-600 text-white">Below Average</Badge>;
      default:
        return <Badge className="bg-blue-600 text-white">Average</Badge>;
    }
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Learning Velocity</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-500">+15%</div>
            <p className="text-xs text-muted-foreground">
              This month vs last
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Goal Achievement</CardTitle>
            <Target className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-500">8/12</div>
            <p className="text-xs text-muted-foreground">
              Monthly targets hit
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Cohort Ranking</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-purple-500">12th</div>
            <p className="text-xs text-muted-foreground">
              Out of 45 apprentices
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Completion ETA</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-elec-yellow">18m</div>
            <p className="text-xs text-muted-foreground">
              Predicted finish
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BarChart3 className="h-5 w-5" />
              Progress Analytics
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {progressMetrics.map((metric, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="font-medium">{metric.category}</span>
                      {getTrendIcon(metric.trend)}
                      <span className={`text-sm ${metric.trend === "up" ? "text-green-500" : "text-red-500"}`}>
                        {metric.weeklyChange > 0 ? "+" : ""}{metric.weeklyChange}%
                      </span>
                    </div>
                    <span className="text-sm text-muted-foreground">
                      {metric.current}% / {metric.target}%
                    </span>
                  </div>
                  <Progress value={metric.current} className="h-2" />
                  <p className="text-xs text-muted-foreground italic">
                    AI Prediction: {metric.prediction}
                  </p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Brain className="h-5 w-5" />
              Weekly AI Insights
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {weeklyInsights.map((insight, index) => (
                <div key={index} className="border rounded-lg p-4">
                  <div className="flex items-start justify-between mb-2">
                    <h4 className="font-medium">{insight.title}</h4>
                    <Badge variant="outline" className={getImpactColor(insight.impact)}>
                      {insight.type}
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground">{insight.description}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Users className="h-5 w-5" />
            Cohort Benchmarking
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {benchmarkData.map((item, index) => (
              <div key={index} className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="font-medium">{item.metric}</span>
                  {getStatusBadge(item.status)}
                </div>
                
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>You: {item.yourValue}</span>
                    <span>Cohort Avg: {item.cohortAverage}</span>
                    <span>Top 10%: {item.topPerformers}</span>
                  </div>
                  
                  <div className="relative">
                    <div className="w-full bg-muted rounded-full h-2">
                      <div 
                        className="bg-blue-500 h-2 rounded-full relative"
                        style={{ width: `${(item.yourValue / item.topPerformers) * 100}%` }}
                      >
                        <div className="absolute right-0 top-0 h-2 w-1 bg-blue-700 rounded-full"></div>
                      </div>
                    </div>
                    <div 
                      className="absolute top-0 h-2 w-1 bg-orange-500"
                      style={{ left: `${(item.cohortAverage / item.topPerformers) * 100}%` }}
                    ></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Button className="h-12" variant="outline">
          <Zap className="mr-2 h-4 w-4" />
          Generate Progress Report
        </Button>
        <Button className="h-12" variant="outline">
          <Calendar className="mr-2 h-4 w-4" />
          Schedule Mentor Review
        </Button>
      </div>

      <Card className="border-green-500/50 bg-green-500/10">
        <CardHeader>
          <CardTitle className="text-green-300 flex items-center gap-2">
            <TrendingUp className="h-5 w-5" />
            Intelligent Progress Monitoring
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">
            Your AI-powered progress insights provide real-time analysis of your learning journey, 
            benchmark your performance against peers, and predict future outcomes. Stay motivated 
            with personalised recommendations and data-driven guidance for apprenticeship success.
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default ProgressInsightsTab;
