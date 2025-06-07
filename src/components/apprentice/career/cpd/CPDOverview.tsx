
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
    <div className="space-y-6">
      {/* Progress Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="border-elec-yellow/20 bg-elec-gray">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <Clock className="h-4 w-4 text-elec-yellow" />
              Hours This Year
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-elec-yellow">{hoursCompleted}</div>
            <p className="text-xs text-muted-foreground">of {hoursTarget} target</p>
          </CardContent>
        </Card>

        <Card className="border-elec-yellow/20 bg-elec-gray">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <Target className="h-4 w-4 text-elec-yellow" />
              Progress
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-400">{progressPercentage}%</div>
            <p className="text-xs text-muted-foreground">Target completion</p>
          </CardContent>
        </Card>

        <Card className="border-elec-yellow/20 bg-elec-gray">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <Calendar className="h-4 w-4 text-elec-yellow" />
              Days Remaining
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-amber-400">187</div>
            <p className="text-xs text-muted-foreground">Until year end</p>
          </CardContent>
        </Card>

        <Card className="border-elec-yellow/20 bg-elec-gray">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <Award className="h-4 w-4 text-elec-yellow" />
              Compliance
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-400">On Track</div>
            <p className="text-xs text-muted-foreground">Professional bodies</p>
          </CardContent>
        </Card>
      </div>

      {/* Progress Bar */}
      <Card className="border-elec-yellow/20 bg-elec-gray">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5 text-elec-yellow" />
            {currentYear} CPD Progress
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>Annual Progress</span>
              <span>{hoursCompleted} / {hoursTarget} hours</span>
            </div>
            <Progress value={progressPercentage} className="h-3" />
          </div>
          <div className="text-sm text-muted-foreground">
            You need {hoursTarget - hoursCompleted} more hours to meet your annual target.
          </div>
        </CardContent>
      </Card>

      {/* Category Breakdown */}
      <Card className="border-elec-yellow/20 bg-elec-gray">
        <CardHeader>
          <CardTitle>Hours by Category</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {categoryBreakdown.map((category, index) => (
              <div key={index} className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium">{category.category}</span>
                  <span className="text-sm text-muted-foreground">{category.hours} hours</span>
                </div>
                <div className="w-full bg-elec-dark rounded-full h-2">
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
      <Card className="border-elec-yellow/20 bg-elec-gray">
        <CardHeader>
          <CardTitle>Recent Activities</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {recentActivities.map((activity, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-elec-dark rounded-lg">
                <div className="space-y-1">
                  <div className="font-medium text-white">{activity.activity}</div>
                  <div className="text-sm text-muted-foreground">{activity.date}</div>
                </div>
                <div className="text-right space-y-1">
                  <div className="font-medium text-elec-yellow">{activity.hours}h</div>
                  <Badge variant="outline" className="text-xs">
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
