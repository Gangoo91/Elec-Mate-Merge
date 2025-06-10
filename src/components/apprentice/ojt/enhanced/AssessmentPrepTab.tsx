
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { BookOpen, Clock, Target, TrendingUp, CheckCircle, AlertTriangle, Star, BarChart3 } from "lucide-react";

const AssessmentPrepTab = () => {
  const assessmentMetrics = [
    {
      subject: "Electrical Installation",
      progress: 78,
      status: "on-track",
      nextAssessment: "2 weeks",
      weakAreas: ["Earthing systems", "Circuit protection"]
    },
    {
      subject: "Health & Safety",
      progress: 92,
      status: "excellent",
      nextAssessment: "1 month",
      weakAreas: []
    },
    {
      subject: "Regulations & Standards",
      progress: 65,
      status: "needs-attention",
      nextAssessment: "3 weeks",
      weakAreas: ["BS 7671 Amendment 2", "Special locations"]
    },
    {
      subject: "Practical Skills",
      progress: 83,
      status: "good",
      nextAssessment: "2 weeks",
      weakAreas: ["Cable termination", "Testing procedures"]
    }
  ];

  const studyPlans = [
    {
      title: "BS 7671 Intensive Review",
      duration: "5 days",
      priority: "high",
      topics: ["Special locations", "Earthing arrangements", "Protection devices"],
      aiRecommended: true
    },
    {
      title: "Practical Skills Workshop",
      duration: "3 days",
      priority: "medium",
      topics: ["Cable installation", "Testing procedures", "Fault finding"],
      aiRecommended: false
    },
    {
      title: "Health & Safety Refresher",
      duration: "1 day",
      priority: "low",
      topics: ["Risk assessment", "PPE requirements", "Emergency procedures"],
      aiRecommended: false
    }
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "excellent":
        return <Badge className="bg-green-600 text-white">Excellent</Badge>;
      case "good":
        return <Badge className="bg-blue-600 text-white">Good</Badge>;
      case "on-track":
        return <Badge className="bg-yellow-600 text-white">On Track</Badge>;
      case "needs-attention":
        return <Badge className="bg-red-600 text-white">Needs Attention</Badge>;
      default:
        return <Badge>Unknown</Badge>;
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "text-red-500";
      case "medium":
        return "text-yellow-500";
      case "low":
        return "text-green-500";
      default:
        return "text-gray-500";
    }
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Overall Readiness</CardTitle>
            <Target className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-500">79%</div>
            <p className="text-xs text-muted-foreground">
              Above average
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Time to Assessment</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-elec-yellow">12 days</div>
            <p className="text-xs text-muted-foreground">
              Next assessment
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Study Streak</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-500">7 days</div>
            <p className="text-xs text-muted-foreground">
              Keep it up!
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Weak Areas</CardTitle>
            <AlertTriangle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-orange-500">3</div>
            <p className="text-xs text-muted-foreground">
              Areas to focus
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BarChart3 className="h-5 w-5" />
              Assessment Progress
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {assessmentMetrics.map((metric, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Label className="font-medium">{metric.subject}</Label>
                      {getStatusBadge(metric.status)}
                    </div>
                    <span className="text-sm text-muted-foreground">
                      Next: {metric.nextAssessment}
                    </span>
                  </div>
                  <Progress value={metric.progress} className="h-2" />
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">{metric.progress}% complete</span>
                    {metric.weakAreas.length > 0 && (
                      <span className="text-orange-500">
                        {metric.weakAreas.length} weak area{metric.weakAreas.length > 1 ? 's' : ''}
                      </span>
                    )}
                  </div>
                  {metric.weakAreas.length > 0 && (
                    <div className="text-xs text-muted-foreground">
                      Focus areas: {metric.weakAreas.join(", ")}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BookOpen className="h-5 w-5" />
              AI Study Plans
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {studyPlans.map((plan, index) => (
                <div key={index} className="border rounded-lg p-4">
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <h4 className="font-medium">{plan.title}</h4>
                      {plan.aiRecommended && (
                        <Badge variant="outline" className="text-xs">
                          <Star className="h-3 w-3 mr-1" />
                          AI Recommended
                        </Badge>
                      )}
                    </div>
                    <span className={`text-sm font-medium ${getPriorityColor(plan.priority)}`}>
                      {plan.priority.toUpperCase()}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 mb-2">
                    <Clock className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm text-muted-foreground">{plan.duration}</span>
                  </div>
                  <div className="text-sm text-muted-foreground mb-3">
                    Topics: {plan.topics.join(", ")}
                  </div>
                  <Button size="sm" variant="outline" className="w-full">
                    Start Study Plan
                  </Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="border-blue-500/50 bg-blue-500/10">
        <CardHeader>
          <CardTitle className="text-blue-300 flex items-center gap-2">
            <CheckCircle className="h-5 w-5" />
            Assessment Tips
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-muted-foreground">
            <div>
              <h4 className="font-medium text-foreground mb-2">Before Assessment:</h4>
              <ul className="space-y-1">
                <li>• Review weak areas identified by AI</li>
                <li>• Complete practice questions</li>
                <li>• Get adequate rest</li>
                <li>• Prepare required materials</li>
              </ul>
            </div>
            <div>
              <h4 className="font-medium text-foreground mb-2">During Assessment:</h4>
              <ul className="space-y-1">
                <li>• Read questions carefully</li>
                <li>• Manage your time effectively</li>
                <li>• Show all working for calculations</li>
                <li>• Double-check your answers</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AssessmentPrepTab;
