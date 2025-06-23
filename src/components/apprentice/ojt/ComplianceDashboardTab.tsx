
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { BarChart3, Target, TrendingUp, Calendar, CheckCircle, AlertTriangle, Clock } from "lucide-react";

const ComplianceDashboardTab = () => {
  const overallProgress = 68;
  
  const goals = [
    {
      title: "20% Off-the-Job Training Hours",
      current: 156,
      target: 200,
      unit: "hours",
      deadline: "2024-06-30",
      status: "on-track"
    },
    {
      title: "Portfolio Evidence Collection",
      current: 49,
      target: 63,
      unit: "items",
      deadline: "2024-05-15",
      status: "on-track"
    },
    {
      title: "Technical Skills Assessments",
      current: 2,
      target: 5,
      unit: "assessments",
      deadline: "2024-07-30",
      status: "attention-needed"
    },
    {
      title: "Professional Development",
      current: 8,
      target: 12,
      unit: "activities",
      deadline: "2024-08-15",
      status: "on-track"
    }
  ];

  const milestones = [
    {
      title: "First Year Review",
      date: "2024-03-01",
      status: "completed",
      description: "Annual progress review with assessor"
    },
    {
      title: "Mid-Point Assessment",
      date: "2024-06-15",
      status: "upcoming",
      description: "Comprehensive skills and knowledge assessment"
    },
    {
      title: "Final EPA Preparation",
      date: "2024-10-01",
      status: "future",
      description: "End-point assessment preparation phase"
    },
    {
      title: "End-Point Assessment",
      date: "2024-12-15",
      status: "future",
      description: "Final apprenticeship assessment"
    }
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "on-track":
        return <Badge className="bg-green-500/20 text-green-400">On Track</Badge>;
      case "attention-needed":
        return <Badge className="bg-yellow-500/20 text-yellow-400">Attention Needed</Badge>;
      case "behind":
        return <Badge className="bg-red-500/20 text-red-400">Behind Schedule</Badge>;
      default:
        return <Badge className="bg-gray-500/20 text-gray-400">Unknown</Badge>;
    }
  };

  const getMilestoneIcon = (status: string) => {
    switch (status) {
      case "completed":
        return <CheckCircle className="h-4 w-4 text-green-400" />;
      case "upcoming":
        return <Clock className="h-4 w-4 text-yellow-400" />;
      default:
        return <Calendar className="h-4 w-4 text-gray-400" />;
    }
  };

  return (
    <div className="space-y-6">
      {/* Overall Progress */}
      <Card className="bg-elec-gray">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BarChart3 className="h-5 w-5 text-elec-yellow" />
            Overall Apprenticeship Progress
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="text-center">
              <div className="text-4xl font-bold">{overallProgress}%</div>
              <div className="text-sm text-muted-foreground">Apprenticeship Completion</div>
              <Progress value={overallProgress} className="mt-3 h-3" />
            </div>
            
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div className="text-center">
                <div className="text-lg font-semibold">18</div>
                <div className="text-muted-foreground">Months Remaining</div>
              </div>
              <div className="text-center">
                <div className="text-lg font-semibold">4.2</div>
                <div className="text-muted-foreground">Current Grade</div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Goals & Targets */}
      <Card className="bg-elec-gray">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Target className="h-5 w-5 text-elec-yellow" />
            Goals & Targets
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {goals.map((goal, index) => (
              <div key={index} className="p-4 rounded-lg border border-elec-yellow/20">
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <h4 className="font-medium">{goal.title}</h4>
                    <div className="text-sm text-muted-foreground">
                      Due: {goal.deadline}
                    </div>
                  </div>
                  {getStatusBadge(goal.status)}
                </div>
                
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Progress</span>
                    <span>{goal.current} / {goal.target} {goal.unit}</span>
                  </div>
                  <Progress value={(goal.current / goal.target) * 100} className="h-2" />
                </div>
                
                <div className="mt-2 text-xs text-muted-foreground">
                  {goal.target - goal.current} {goal.unit} remaining
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Key Milestones */}
      <Card className="bg-elec-gray">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calendar className="h-5 w-5 text-elec-yellow" />
            Key Milestones
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {milestones.map((milestone, index) => (
              <div key={index} className="flex items-start gap-4 p-4 rounded-lg border border-elec-yellow/20">
                {getMilestoneIcon(milestone.status)}
                <div className="flex-1">
                  <div className="flex justify-between items-start">
                    <div>
                      <h4 className="font-medium">{milestone.title}</h4>
                      <div className="text-sm text-muted-foreground">{milestone.date}</div>
                    </div>
                    <Badge 
                      variant="outline" 
                      className={
                        milestone.status === "completed" 
                          ? "border-green-400 text-green-400"
                          : milestone.status === "upcoming"
                          ? "border-yellow-400 text-yellow-400"
                          : "border-gray-400 text-gray-400"
                      }
                    >
                      {milestone.status === "completed" ? "Completed" : 
                       milestone.status === "upcoming" ? "Upcoming" : "Future"}
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground mt-1">
                    {milestone.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Progress Analytics */}
      <Card className="bg-elec-gray">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5 text-elec-yellow" />
            Progress Analytics
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <h4 className="font-medium">Monthly Training Hours</h4>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>January 2024</span>
                  <span>32 hours</span>
                </div>
                <Progress value={80} className="h-2" />
                <div className="flex justify-between text-sm">
                  <span>December 2023</span>
                  <span>28 hours</span>
                </div>
                <Progress value={70} className="h-2" />
                <div className="flex justify-between text-sm">
                  <span>November 2023</span>
                  <span>36 hours</span>
                </div>
                <Progress value={90} className="h-2" />
              </div>
            </div>
            
            <div className="space-y-4">
              <h4 className="font-medium">Skills Development</h4>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Technical Skills</span>
                  <span>85%</span>
                </div>
                <Progress value={85} className="h-2" />
                <div className="flex justify-between text-sm">
                  <span>Health & Safety</span>
                  <span>92%</span>
                </div>
                <Progress value={92} className="h-2" />
                <div className="flex justify-between text-sm">
                  <span>Professional Skills</span>
                  <span>78%</span>
                </div>
                <Progress value={78} className="h-2" />
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <Card className="bg-elec-gray">
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <Button variant="outline" className="w-full">
              <TrendingUp className="h-4 w-4 mr-2" />
              View Analytics
            </Button>
            <Button variant="outline" className="w-full">
              <Target className="h-4 w-4 mr-2" />
              Set New Goal
            </Button>
            <Button variant="outline" className="w-full">
              <Calendar className="h-4 w-4 mr-2" />
              Schedule Review
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ComplianceDashboardTab;
