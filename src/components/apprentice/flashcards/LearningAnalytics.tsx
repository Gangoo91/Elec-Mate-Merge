
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { TrendingUp, Clock, Target, Trophy, Calendar } from "lucide-react";

const LearningAnalytics = () => {
  const stats = [
    { label: "Cards Studied Today", value: 24, icon: Target, color: "text-blue-400" },
    { label: "Study Streak", value: 7, unit: "days", icon: Calendar, color: "text-green-400" },
    { label: "Total Study Time", value: 2.5, unit: "hours", icon: Clock, color: "text-yellow-400" },
    { label: "Sets Completed", value: 3, icon: Trophy, color: "text-purple-400" }
  ];

  const recentActivity = [
    { set: "Cable Colour Codes", cards: 12, accuracy: 95, time: "5 min" },
    { set: "EICR Codes", cards: 8, accuracy: 87, time: "4 min" },
    { set: "Safety Signs", cards: 15, accuracy: 92, time: "7 min" }
  ];

  const categoryProgress = [
    { name: "Electrical Theory", progress: 85, total: 45 },
    { name: "Safety Procedures", progress: 72, total: 30 },
    { name: "Regulations", progress: 60, total: 25 },
    { name: "Tools & Equipment", progress: 45, total: 20 }
  ];

  return (
    <div className="space-y-6">
      <Card className="border-elec-yellow/20 bg-gradient-to-r from-elec-gray to-elec-dark/50">
        <CardHeader>
          <div className="flex items-center gap-2">
            <TrendingUp className="h-6 w-6 text-elec-yellow" />
            <CardTitle className="text-elec-yellow">Learning Analytics</CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">
            Track your progress and identify areas for improvement in your flashcard studies.
          </p>
        </CardContent>
      </Card>

      {/* Stats Overview */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {stats.map((stat, index) => (
          <Card key={index} className="border-elec-yellow/20 bg-elec-gray">
            <CardContent className="p-4 text-center">
              <stat.icon className={`h-6 w-6 mx-auto mb-2 ${stat.color}`} />
              <div className="text-2xl font-bold text-white">{stat.value}</div>
              {stat.unit && <div className="text-xs text-muted-foreground">{stat.unit}</div>}
              <div className="text-xs text-muted-foreground mt-1">{stat.label}</div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Activity */}
        <Card className="border-elec-yellow/20 bg-elec-gray">
          <CardHeader>
            <CardTitle className="text-white">Recent Study Sessions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentActivity.map((activity, index) => (
                <div key={index} className="border border-elec-yellow/20 rounded-lg p-3">
                  <div className="flex justify-between items-start mb-2">
                    <h4 className="font-medium text-white text-sm">{activity.set}</h4>
                    <span className="text-xs text-muted-foreground">{activity.time}</span>
                  </div>
                  <div className="flex justify-between items-center text-xs">
                    <span className="text-muted-foreground">{activity.cards} cards</span>
                    <span className={`${activity.accuracy >= 90 ? 'text-green-400' : activity.accuracy >= 75 ? 'text-yellow-400' : 'text-red-400'}`}>
                      {activity.accuracy}% accuracy
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Category Progress */}
        <Card className="border-elec-yellow/20 bg-elec-gray">
          <CardHeader>
            <CardTitle className="text-white">Progress by Category</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {categoryProgress.map((category, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-white">{category.name}</span>
                    <span className="text-muted-foreground">{category.progress}%</span>
                  </div>
                  <Progress value={category.progress} className="h-2" />
                  <div className="text-xs text-muted-foreground">
                    {Math.round((category.progress / 100) * category.total)} of {category.total} cards mastered
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default LearningAnalytics;
