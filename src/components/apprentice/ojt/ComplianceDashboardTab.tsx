
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { BarChart3, Target, Calendar, CheckCircle, AlertCircle, BookOpen, TrendingUp, Clock } from "lucide-react";

const ComplianceDashboardTab = () => {
  const complianceGoals = [
    {
      title: "20% Off-the-Job Training",
      current: 16.2,
      target: 20,
      unit: "%",
      status: "warning"
    },
    {
      title: "Monthly Training Hours",
      current: 32,
      target: 40,
      unit: "hours",
      status: "good"
    },
    {
      title: "Portfolio Completion",
      current: 73,
      target: 100,
      unit: "%",
      status: "good"
    },
    {
      title: "Assessment Readiness",
      current: 8,
      target: 10,
      unit: "areas",
      status: "warning"
    }
  ];

  const milestones = [
    {
      title: "Year 1 Portfolio Review",
      date: "2024-03-15",
      status: "upcoming",
      progress: 85
    },
    {
      title: "Mid-Point Assessment",
      date: "2024-06-20",
      status: "upcoming",
      progress: 45
    },
    {
      title: "EPA Gateway Meeting",
      date: "2024-12-10",
      status: "future",
      progress: 20
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "good":
        return "text-green-600 bg-green-100 border-green-200";
      case "warning":
        return "text-amber-600 bg-amber-100 border-amber-200";
      case "critical":
        return "text-red-600 bg-red-100 border-red-200";
      default:
        return "text-slate-600 bg-slate-100 border-slate-200";
    }
  };

  const getMilestoneIcon = (status: string) => {
    switch (status) {
      case "completed":
        return <CheckCircle className="h-4 w-4 text-green-600" />;
      case "upcoming":
        return <Clock className="h-4 w-4 text-amber-600" />;
      default:
        return <AlertCircle className="h-4 w-4 text-slate-600" />;
    }
  };

  return (
    <div className="space-y-6">
      {/* Compliance Overview */}
      <Card className="bg-slate-50 border-slate-200">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-slate-800">
            <BarChart3 className="h-5 w-5 text-blue-600" />
            Compliance Overview
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {complianceGoals.map((goal, index) => (
              <div key={index} className="p-4 rounded-lg border border-slate-300 bg-white">
                <div className="flex justify-between items-start mb-2">
                  <h4 className="font-medium text-sm text-slate-800">{goal.title}</h4>
                  <Badge className={getStatusColor(goal.status)}>
                    {goal.status === "good" ? "On Track" : "Needs Attention"}
                  </Badge>
                </div>
                <div className="text-2xl font-bold text-slate-800 mb-1">
                  {goal.current}{goal.unit}
                </div>
                <div className="text-xs text-slate-600 mb-2">
                  Target: {goal.target}{goal.unit}
                </div>
                <Progress value={(goal.current / goal.target) * 100} className="h-2" />
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Key Milestones */}
      <Card className="bg-slate-50 border-slate-200">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-slate-800">
            <Target className="h-5 w-5 text-blue-600" />
            Key Milestones
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {milestones.map((milestone, index) => (
              <div key={index} className="p-4 rounded-lg border border-slate-300 bg-white">
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <h4 className="font-medium text-slate-800">{milestone.title}</h4>
                    <div className="flex items-center gap-2 mt-1 text-sm text-slate-600">
                      <Calendar className="h-3 w-3" />
                      {milestone.date}
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    {getMilestoneIcon(milestone.status)}
                    <span className="text-sm font-medium text-slate-700">{milestone.progress}%</span>
                  </div>
                </div>
                <Progress value={milestone.progress} className="h-2" />
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Progress Analytics */}
      <Card className="bg-slate-50 border-slate-200">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-slate-800">
            <TrendingUp className="h-5 w-5 text-blue-600" />
            Progress Analytics
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="text-2xl font-bold text-slate-800">127</div>
              <div className="text-sm text-slate-600">Training Hours Logged</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-slate-800">18.3%</div>
              <div className="text-sm text-slate-600">Current OJT Ratio</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-slate-800">92%</div>
              <div className="text-sm text-slate-600">Weekly Target Achievement</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Action Items */}
      <Card className="bg-slate-50 border-slate-200">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-slate-800">
            <CheckCircle className="h-5 w-5 text-blue-600" />
            Action Items
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="flex items-center justify-between p-3 rounded-lg border border-amber-300 bg-amber-50">
              <div className="flex items-center gap-3">
                <AlertCircle className="h-4 w-4 text-amber-600" />
                <div>
                  <div className="font-medium text-sm text-slate-800">Increase off-the-job training hours</div>
                  <div className="text-xs text-slate-600">You need 3.8% more to meet the 20% requirement</div>
                </div>
              </div>
              <Button size="sm" variant="outline">
                Plan Sessions
              </Button>
            </div>
            
            <div className="flex items-center justify-between p-3 rounded-lg border border-blue-300 bg-blue-50">
              <div className="flex items-center gap-3">
                <BookOpen className="h-4 w-4 text-blue-600" />
                <div>
                  <div className="font-medium text-sm text-slate-800">Complete portfolio sections</div>
                  <div className="text-xs text-slate-600">14 evidence items remaining for completion</div>
                </div>
              </div>
              <Button size="sm" variant="outline">
                Upload Evidence
              </Button>
            </div>
            
            <div className="flex items-center justify-between p-3 rounded-lg border border-green-300 bg-green-50">
              <div className="flex items-center gap-3">
                <TrendingUp className="h-4 w-4 text-green-600" />
                <div>
                  <div className="font-medium text-sm text-slate-800">Prepare for upcoming assessment</div>
                  <div className="text-xs text-slate-600">Technical Skills Assessment in 3 weeks</div>
                </div>
              </div>
              <Button size="sm" variant="outline">
                Study Plan
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ComplianceDashboardTab;
