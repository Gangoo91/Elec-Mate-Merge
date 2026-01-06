
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Clock, Target, Award, TrendingUp, Calendar } from "lucide-react";

const CPDOverview = () => {
  // Mock data - in real implementation this would come from a state management solution
  const currentYear = new Date().getFullYear();
  const hoursCompleted = 28;
  const hoursTarget = 35;
  const progressPercentage = Math.round((hoursCompleted / hoursTarget) * 100);

  const recentActivities = [
    { date: "2024-01-15", activity: "BS 7671 Update Seminar", hours: 4, type: "Formal Learning" },
    { date: "2024-01-10", activity: "Cable Sizing Workshop", hours: 3, type: "Technical Training" },
    { date: "2024-01-05", activity: "Health & Safety Refresher", hours: 2, type: "Safety Training" }
  ];

  const categoryBreakdown = [
    { category: "Technical Skills", hours: 12, color: "bg-blue-500" },
    { category: "Regulations", hours: 8, color: "bg-green-500" },
    { category: "Safety", hours: 5, color: "bg-amber-500" },
    { category: "Management", hours: 3, color: "bg-purple-500" }
  ];

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Progress Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="bg-gradient-to-br from-elec-gray to-elec-card border-elec-yellow/20 overflow-hidden relative">
          <div className="absolute top-0 right-0 w-24 h-24 bg-elec-yellow/5 rounded-full blur-2xl -translate-y-1/2 translate-x-1/2" />
          <CardHeader className="pb-3 relative">
            <CardTitle className="text-sm font-medium flex items-center gap-2 text-white">
              <div className="p-1.5 rounded-lg bg-gradient-to-br from-elec-yellow/20 to-elec-yellow/5 border border-elec-yellow/30">
                <Clock className="h-4 w-4 text-elec-yellow" />
              </div>
              Hours This Year
            </CardTitle>
          </CardHeader>
          <CardContent className="relative">
            <div className="text-2xl font-bold text-elec-yellow">{hoursCompleted}</div>
            <p className="text-xs text-white/70">of {hoursTarget} target</p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-elec-gray to-green-950/20 border-green-500/20 overflow-hidden relative">
          <div className="absolute top-0 right-0 w-24 h-24 bg-green-500/5 rounded-full blur-2xl -translate-y-1/2 translate-x-1/2" />
          <CardHeader className="pb-3 relative">
            <CardTitle className="text-sm font-medium flex items-center gap-2 text-white">
              <div className="p-1.5 rounded-lg bg-gradient-to-br from-green-500/20 to-green-500/5 border border-green-500/30">
                <Target className="h-4 w-4 text-green-400" />
              </div>
              Progress
            </CardTitle>
          </CardHeader>
          <CardContent className="relative">
            <div className="text-2xl font-bold text-green-400">{progressPercentage}%</div>
            <p className="text-xs text-white/70">Target completion</p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-elec-gray to-amber-950/20 border-amber-500/20 overflow-hidden relative">
          <div className="absolute top-0 right-0 w-24 h-24 bg-amber-500/5 rounded-full blur-2xl -translate-y-1/2 translate-x-1/2" />
          <CardHeader className="pb-3 relative">
            <CardTitle className="text-sm font-medium flex items-center gap-2 text-white">
              <div className="p-1.5 rounded-lg bg-gradient-to-br from-amber-500/20 to-amber-500/5 border border-amber-500/30">
                <Calendar className="h-4 w-4 text-amber-400" />
              </div>
              Days Remaining
            </CardTitle>
          </CardHeader>
          <CardContent className="relative">
            <div className="text-2xl font-bold text-amber-400">187</div>
            <p className="text-xs text-white/70">Until year end</p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-elec-gray to-blue-950/20 border-blue-500/20 overflow-hidden relative">
          <div className="absolute top-0 right-0 w-24 h-24 bg-blue-500/5 rounded-full blur-2xl -translate-y-1/2 translate-x-1/2" />
          <CardHeader className="pb-3 relative">
            <CardTitle className="text-sm font-medium flex items-center gap-2 text-white">
              <div className="p-1.5 rounded-lg bg-gradient-to-br from-blue-500/20 to-blue-500/5 border border-blue-500/30">
                <Award className="h-4 w-4 text-blue-400" />
              </div>
              Compliance
            </CardTitle>
          </CardHeader>
          <CardContent className="relative">
            <div className="text-2xl font-bold text-green-400">On Track</div>
            <p className="text-xs text-white/70">Professional bodies</p>
          </CardContent>
        </Card>
      </div>

      {/* Progress Bar */}
      <Card className="bg-gradient-to-br from-elec-gray to-elec-card border-elec-yellow/20 overflow-hidden relative">
        <div className="absolute top-0 right-0 w-48 h-48 bg-elec-yellow/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
        <CardHeader className="relative">
          <CardTitle className="flex items-center gap-3 text-white">
            <div className="p-2 rounded-lg bg-gradient-to-br from-elec-yellow/20 to-elec-yellow/5 border border-elec-yellow/30">
              <TrendingUp className="h-5 w-5 text-elec-yellow" />
            </div>
            {currentYear} CPD Progress
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4 relative">
          <div className="space-y-2">
            <div className="flex justify-between text-sm text-white">
              <span>Annual Progress</span>
              <span>{hoursCompleted} / {hoursTarget} hours</span>
            </div>
            <Progress value={progressPercentage} className="h-3" />
          </div>
          <div className="text-sm text-white/70">
            You need {hoursTarget - hoursCompleted} more hours to meet your annual target.
          </div>
        </CardContent>
      </Card>

      {/* Category Breakdown */}
      <Card className="bg-gradient-to-br from-elec-gray to-elec-card border-elec-yellow/20 overflow-hidden relative">
        <div className="absolute top-0 right-0 w-48 h-48 bg-elec-yellow/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
        <CardHeader className="relative">
          <CardTitle className="text-white">Hours by Category</CardTitle>
        </CardHeader>
        <CardContent className="relative">
          <div className="space-y-4">
            {categoryBreakdown.map((category, index) => (
              <div key={index} className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium text-white">{category.category}</span>
                  <span className="text-sm text-white/70">{category.hours} hours</span>
                </div>
                <div className="w-full bg-white/10 rounded-full h-2">
                  <div
                    className={`h-2 rounded-full ${category.color}`}
                    style={{ width: `${(category.hours / hoursCompleted) * 100}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Recent Activities */}
      <Card className="bg-gradient-to-br from-elec-gray to-elec-card border-elec-yellow/20 overflow-hidden relative">
        <div className="absolute top-0 right-0 w-48 h-48 bg-elec-yellow/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
        <CardHeader className="relative">
          <CardTitle className="text-white">Recent Activities</CardTitle>
        </CardHeader>
        <CardContent className="relative">
          <div className="space-y-3">
            {recentActivities.map((activity, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-white/5 border border-white/10 rounded-xl">
                <div className="space-y-1">
                  <div className="font-medium text-white">{activity.activity}</div>
                  <div className="text-sm text-white/60">{activity.date}</div>
                </div>
                <div className="text-right space-y-1">
                  <div className="font-medium text-elec-yellow">{activity.hours}h</div>
                  <Badge variant="outline" className="text-xs bg-white/5 border-white/20 text-white/70">
                    {activity.type}
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default CPDOverview;
