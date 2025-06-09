
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { TrendingUp, TrendingDown, Minus, Brain, Target, Zap, BarChart3 } from "lucide-react";

const ProgressInsightsTab = () => {
  const progressMetrics = [
    {
      metric: "Learning Velocity",
      current: 87,
      previous: 75,
      trend: "up",
      insight: "Significant improvement in knowledge absorption rate",
      recommendation: "Maintain current study intensity"
    },
    {
      metric: "Skill Application",
      current: 72,
      previous: 78,
      trend: "down",
      insight: "Slight decrease in practical application confidence",
      recommendation: "Increase hands-on practice sessions"
    },
    {
      metric: "Retention Rate",
      current: 91,
      previous: 89,
      trend: "up",
      insight: "Excellent knowledge retention and recall",
      recommendation: "Continue current revision methods"
    },
    {
      metric: "Problem Solving",
      current: 83,
      previous: 83,
      trend: "stable",
      insight: "Consistent analytical thinking development",
      recommendation: "Introduce more complex scenarios"
    }
  ];

  const weeklyInsights = [
    {
      week: "This Week",
      totalHours: 18.5,
      efficiency: 94,
      topicsFocused: ["BS 7671", "Cable Calculations", "RCD Testing"],
      achievement: "Completed advanced circuit analysis module"
    },
    {
      week: "Last Week",
      totalHours: 16.2,
      efficiency: 87,
      topicsFocused: ["Installation Methods", "Safety Procedures"],
      achievement: "Passed practical assessment simulation"
    },
    {
      week: "Two Weeks Ago",
      totalHours: 14.8,
      efficiency: 82,
      topicsFocused: ["Electrical Theory", "Ohm's Law Applications"],
      achievement: "Mastered basic electrical calculations"
    }
  ];

  const predictiveInsights = [
    {
      title: "Completion Forecast",
      prediction: "On track to complete 2.3 weeks early",
      confidence: 89,
      factors: ["Consistent study patterns", "High retention rates", "Accelerated learning velocity"]
    },
    {
      title: "Risk Assessment",
      prediction: "Potential knowledge gap in commercial installations",
      confidence: 76,
      factors: ["Limited commercial exposure", "Domestic focus in portfolio", "Assessment requirements"]
    },
    {
      title: "Opportunity Analysis",
      prediction: "Strong potential for safety officer specialisation",
      confidence: 92,
      factors: ["Exceptional safety scores", "Leadership indicators", "Industry demand"]
    }
  ];

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case "up":
        return <TrendingUp className="h-4 w-4 text-green-500" />;
      case "down":
        return <TrendingDown className="h-4 w-4 text-red-500" />;
      default:
        return <Minus className="h-4 w-4 text-blue-500" />;
    }
  };

  const getTrendColor = (trend: string) => {
    switch (trend) {
      case "up":
        return "text-green-500";
      case "down":
        return "text-red-500";
      default:
        return "text-blue-500";
    }
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">AI Insight Score</CardTitle>
            <Brain className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-purple-500">94</div>
            <p className="text-xs text-muted-foreground">
              Pattern recognition
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Efficiency Trend</CardTitle>
            <Zap className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-500">+12%</div>
            <p className="text-xs text-muted-foreground">
              Last 4 weeks
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Goal Alignment</CardTitle>
            <Target className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-500">89%</div>
            <p className="text-xs text-muted-foreground">
              On target
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Learning Curve</CardTitle>
            <BarChart3 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-elec-yellow">Steep</div>
            <p className="text-xs text-muted-foreground">
              Accelerating
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5" />
              Progress Metrics Analysis
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {progressMetrics.map((metric, index) => (
                <div key={index} className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="font-medium">{metric.metric}</span>
                    <div className="flex items-center gap-2">
                      {getTrendIcon(metric.trend)}
                      <span className={`text-sm font-medium ${getTrendColor(metric.trend)}`}>
                        {metric.current}%
                      </span>
                    </div>
                  </div>
                  
                  <Progress value={metric.current} className="h-2" />
                  
                  <div className="space-y-1">
                    <p className="text-sm text-muted-foreground italic">
                      {metric.insight}
                    </p>
                    <div className="flex items-center gap-2">
                      <span className="text-xs text-muted-foreground">AI Recommendation:</span>
                      <Badge variant="outline" className="text-xs">
                        {metric.recommendation}
                      </Badge>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BarChart3 className="h-5 w-5" />
              Weekly Performance Insights
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {weeklyInsights.map((week, index) => (
                <div key={index} className="border rounded-lg p-4">
                  <div className="flex items-center justify-between mb-3">
                    <h4 className="font-medium">{week.week}</h4>
                    <div className="flex items-center gap-2">
                      <Badge className="bg-blue-600 text-white">
                        {week.totalHours}h
                      </Badge>
                      <Badge className="bg-green-600 text-white">
                        {week.efficiency}% efficiency
                      </Badge>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <div>
                      <span className="text-sm text-muted-foreground">Topics: </span>
                      {week.topicsFocused.map((topic, topicIndex) => (
                        <Badge key={topicIndex} variant="secondary" className="ml-1 text-xs">
                          {topic}
                        </Badge>
                      ))}
                    </div>
                    <div className="text-sm">
                      <span className="text-muted-foreground">Achievement: </span>
                      <span className="text-green-500 font-medium">{week.achievement}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Brain className="h-5 w-5" />
            AI Predictive Insights
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {predictiveInsights.map((insight, index) => (
              <div key={index} className="border rounded-lg p-4">
                <div className="flex items-center justify-between mb-3">
                  <h4 className="font-medium">{insight.title}</h4>
                  <Badge variant="outline">
                    {insight.confidence}% confidence
                  </Badge>
                </div>
                
                <p className="text-sm mb-3 font-medium text-blue-600">
                  {insight.prediction}
                </p>
                
                <div>
                  <span className="text-xs text-muted-foreground">Key Factors:</span>
                  <ul className="text-xs text-muted-foreground mt-1 space-y-1">
                    {insight.factors.map((factor, factorIndex) => (
                      <li key={factorIndex} className="flex items-start gap-1">
                        <span className="text-elec-yellow">•</span>
                        {factor}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ProgressInsightsTab;
