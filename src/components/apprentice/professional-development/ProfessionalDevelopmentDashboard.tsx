
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  Target, 
  Trophy, 
  Clock, 
  Calendar,
  TrendingUp,
  CheckCircle,
  AlertCircle,
  BookOpen,
  Award
} from "lucide-react";

const ProfessionalDevelopmentDashboard = () => {
  const developmentGoals = [
    {
      title: "Complete Level 3 Apprenticeship",
      progress: 75,
      target: "June 2024",
      status: "on-track",
      description: "Electrical Installation qualification"
    },
    {
      title: "18th Edition Certification",
      progress: 100,
      target: "Completed",
      status: "completed",
      description: "BS 7671 Wiring Regulations"
    },
    {
      title: "EV Charging Specialist",
      progress: 25,
      target: "September 2024",
      status: "planning",
      description: "Electric Vehicle charging installation"
    }
  ];

  const recentAchievements = [
    {
      title: "Safety Assessment Passed",
      date: "2 weeks ago",
      type: "assessment",
      points: 150
    },
    {
      title: "First Aid Certification",
      date: "1 month ago",
      type: "certification",
      points: 200
    },
    {
      title: "Portfolio Review Complete",
      date: "1 month ago",
      type: "review",
      points: 100
    }
  ];

  const upcomingMilestones = [
    {
      title: "End Point Assessment",
      date: "15 April 2024",
      type: "assessment",
      importance: "high"
    },
    {
      title: "Solar PV Course",
      date: "22 April 2024",
      type: "training",
      importance: "medium"
    },
    {
      title: "Industry Networking Event",
      date: "5 May 2024",
      type: "networking",
      importance: "low"
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'text-green-400 bg-green-500/10 border-green-500/30';
      case 'on-track': return 'text-blue-400 bg-blue-500/10 border-blue-500/30';
      case 'planning': return 'text-orange-400 bg-orange-500/10 border-orange-500/30';
      default: return 'text-gray-400 bg-gray-500/10 border-gray-500/30';
    }
  };

  const getImportanceColor = (importance: string) => {
    switch (importance) {
      case 'high': return 'text-red-400 bg-red-500/10 border-red-500/30';
      case 'medium': return 'text-orange-400 bg-orange-500/10 border-orange-500/30';
      case 'low': return 'text-green-400 bg-green-500/10 border-green-500/30';
      default: return 'text-gray-400 bg-gray-500/10 border-gray-500/30';
    }
  };

  return (
    <div className="space-y-6">
      {/* Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="border-elec-yellow/20 bg-elec-gray">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-2xl font-bold text-elec-yellow">75%</p>
                <p className="text-sm text-muted-foreground">Overall Progress</p>
              </div>
              <Target className="h-8 w-8 text-elec-yellow" />
            </div>
          </CardContent>
        </Card>

        <Card className="border-elec-yellow/20 bg-elec-gray">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-2xl font-bold text-elec-yellow">3</p>
                <p className="text-sm text-muted-foreground">Active Goals</p>
              </div>
              <Trophy className="h-8 w-8 text-elec-yellow" />
            </div>
          </CardContent>
        </Card>

        <Card className="border-elec-yellow/20 bg-elec-gray">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-2xl font-bold text-elec-yellow">12</p>
                <p className="text-sm text-muted-foreground">CPD Hours</p>
              </div>
              <Clock className="h-8 w-8 text-elec-yellow" />
            </div>
          </CardContent>
        </Card>

        <Card className="border-elec-yellow/20 bg-elec-gray">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-2xl font-bold text-elec-yellow">450</p>
                <p className="text-sm text-muted-foreground">Total Points</p>
              </div>
              <Award className="h-8 w-8 text-elec-yellow" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Development Goals */}
      <Card className="border-elec-yellow/20 bg-elec-gray">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Target className="h-5 w-5 text-elec-yellow" />
            Development Goals
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {developmentGoals.map((goal, index) => (
              <div key={index} className="p-4 bg-elec-dark/30 rounded-lg">
                <div className="flex items-center justify-between mb-3">
                  <div>
                    <h3 className="font-semibold text-white">{goal.title}</h3>
                    <p className="text-sm text-muted-foreground">{goal.description}</p>
                  </div>
                  <Badge className={getStatusColor(goal.status)}>
                    {goal.status === 'completed' && <CheckCircle className="h-3 w-3 mr-1" />}
                    {goal.status === 'on-track' && <TrendingUp className="h-3 w-3 mr-1" />}
                    {goal.status === 'planning' && <AlertCircle className="h-3 w-3 mr-1" />}
                    {goal.status.replace('-', ' ')}
                  </Badge>
                </div>
                <div className="flex items-center gap-4">
                  <div className="flex-1">
                    <Progress value={goal.progress} className="h-2" />
                  </div>
                  <span className="text-sm font-medium">{goal.progress}%</span>
                  <span className="text-sm text-muted-foreground">{goal.target}</span>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Achievements */}
        <Card className="border-elec-yellow/20 bg-elec-gray">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Trophy className="h-5 w-5 text-elec-yellow" />
              Recent Achievements
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {recentAchievements.map((achievement, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-elec-dark/30 rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded bg-elec-yellow/10">
                      {achievement.type === 'assessment' && <BookOpen className="h-4 w-4 text-elec-yellow" />}
                      {achievement.type === 'certification' && <Award className="h-4 w-4 text-elec-yellow" />}
                      {achievement.type === 'review' && <CheckCircle className="h-4 w-4 text-elec-yellow" />}
                    </div>
                    <div>
                      <p className="font-medium text-white">{achievement.title}</p>
                      <p className="text-sm text-muted-foreground">{achievement.date}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-semibold text-elec-yellow">+{achievement.points} pts</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Upcoming Milestones */}
        <Card className="border-elec-yellow/20 bg-elec-gray">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="h-5 w-5 text-elec-yellow" />
              Upcoming Milestones
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {upcomingMilestones.map((milestone, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-elec-dark/30 rounded-lg">
                  <div>
                    <p className="font-medium text-white">{milestone.title}</p>
                    <p className="text-sm text-muted-foreground">{milestone.date}</p>
                  </div>
                  <Badge className={getImportanceColor(milestone.importance)}>
                    {milestone.importance} priority
                  </Badge>
                </div>
              ))}
            </div>
            <Button className="w-full mt-4" variant="outline">
              View Full Calendar
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ProfessionalDevelopmentDashboard;
