
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { TrendingUp, Clock, Target, Trophy, Calendar, Brain, Zap, Award, BookOpen } from "lucide-react";

const LearningAnalytics = () => {
  const stats = [
    { label: "Cards Studied Today", value: 42, icon: Target, color: "text-blue-400", change: "+12%" },
    { label: "Study Streak", value: 14, unit: "days", icon: Calendar, color: "text-green-400", change: "+2 days" },
    { label: "Total Study Time", value: 8.5, unit: "hours", icon: Clock, color: "text-yellow-400", change: "+1.2h" },
    { label: "Sets Completed", value: 6, icon: Trophy, color: "text-purple-400", change: "+1 set" }
  ];

  const recentActivity = [
    { set: "Cable Colour Codes", cards: 24, accuracy: 96, time: "8 min", category: "Electrical Theory", difficulty: "beginner" },
    { set: "EICR Observation Codes", cards: 20, accuracy: 89, time: "12 min", category: "Testing & Inspection", difficulty: "intermediate" },
    { set: "Safety Signs", cards: 18, accuracy: 94, time: "7 min", category: "Health & Safety", difficulty: "beginner" },
    { set: "BS 7671 Regulations", cards: 30, accuracy: 82, time: "18 min", category: "Regulations", difficulty: "advanced" },
    { set: "Testing Procedures", cards: 20, accuracy: 88, time: "15 min", category: "Testing & Inspection", difficulty: "intermediate" }
  ];

  const categoryProgress = [
    { name: "Electrical Theory", progress: 92, total: 69, mastered: 63, color: "blue" },
    { name: "Health & Safety", progress: 88, total: 34, mastered: 30, color: "green" },
    { name: "Testing & Inspection", progress: 75, total: 52, mastered: 39, color: "yellow" },
    { name: "Regulations", progress: 68, total: 55, mastered: 37, color: "purple" },
    { name: "Tools & Equipment", progress: 82, total: 25, mastered: 21, color: "orange" },
    { name: "Emergency Response", progress: 91, total: 16, mastered: 15, color: "red" }
  ];

  const weeklyProgress = [
    { day: "Mon", cards: 32, time: 45 },
    { day: "Tue", cards: 28, time: 38 },
    { day: "Wed", cards: 41, time: 52 },
    { day: "Thu", cards: 35, time: 41 },
    { day: "Fri", cards: 29, time: 35 },
    { day: "Sat", cards: 38, time: 48 },
    { day: "Sun", cards: 42, time: 55 }
  ];

  const achievements = [
    { title: "Study Streak", description: "14 days in a row", icon: Calendar, earned: true },
    { title: "Speed Learner", description: "100+ cards in one day", icon: Zap, earned: false },
    { title: "Perfect Score", description: "100% accuracy on a set", icon: Target, earned: true },
    { title: "Knowledge Master", description: "Complete all beginner sets", icon: Brain, earned: true },
    { title: "Regulation Expert", description: "Master all BS 7671 cards", icon: BookOpen, earned: false },
    { title: "Safety Champion", description: "Perfect all safety sets", icon: Award, earned: true }
  ];

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'beginner': return 'bg-green-500/20 text-green-400';
      case 'intermediate': return 'bg-yellow-500/20 text-yellow-400';
      case 'advanced': return 'bg-red-500/20 text-red-400';
      default: return 'bg-gray-500/20 text-gray-400';
    }
  };

  const getCategoryColor = (color: string) => {
    const colors = {
      blue: 'bg-blue-500',
      green: 'bg-green-500',
      yellow: 'bg-yellow-500',
      purple: 'bg-purple-500',
      orange: 'bg-orange-500',
      red: 'bg-red-500'
    };
    return colors[color as keyof typeof colors] || 'bg-gray-500';
  };

  return (
    <div className="space-y-6">
      {/* Header Card */}
      <Card className="border-elec-yellow/20 bg-gradient-to-r from-elec-gray to-elec-dark/50">
        <CardHeader>
          <div className="flex items-center gap-3">
            <div className="p-3 rounded-lg bg-elec-yellow/20 border border-elec-yellow/30">
              <TrendingUp className="h-8 w-8 text-elec-yellow" />
            </div>
            <div>
              <CardTitle className="text-2xl text-elec-yellow">Learning Analytics</CardTitle>
              <p className="text-muted-foreground">
                Track your progress and identify areas for improvement in your flashcard studies.
              </p>
            </div>
          </div>
        </CardHeader>
      </Card>

      {/* Stats Overview */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {stats.map((stat, index) => (
          <Card key={index} className="border-elec-yellow/20 bg-elec-gray">
            <CardContent className="p-4 text-center">
              <stat.icon className={`h-6 w-6 mx-auto mb-2 ${stat.color}`} />
              <div className="text-2xl font-bold text-white mb-1">{stat.value}</div>
              {stat.unit && <div className="text-xs text-muted-foreground mb-1">{stat.unit}</div>}
              <div className="text-xs text-muted-foreground mb-2">{stat.label}</div>
              <Badge variant="outline" className="text-xs text-green-400 border-green-400/30">
                {stat.change}
              </Badge>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        {/* Recent Activity */}
        <Card className="xl:col-span-2 border-elec-yellow/20 bg-elec-gray">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <Clock className="h-5 w-5 text-elec-yellow" />
              Recent Study Sessions
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {recentActivity.map((activity, index) => (
                <div key={index} className="border border-elec-yellow/20 rounded-lg p-4 bg-elec-dark/30">
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <h4 className="font-medium text-white text-sm mb-1">{activity.set}</h4>
                      <div className="flex items-center gap-2">
                        <Badge variant="outline" className="text-xs">{activity.category}</Badge>
                        <Badge className={`text-xs ${getDifficultyColor(activity.difficulty)}`}>
                          {activity.difficulty}
                        </Badge>
                      </div>
                    </div>
                    <span className="text-xs text-muted-foreground">{activity.time}</span>
                  </div>
                  <div className="flex justify-between items-center text-xs">
                    <span className="text-muted-foreground">{activity.cards} cards studied</span>
                    <span className={`font-medium ${
                      activity.accuracy >= 90 ? 'text-green-400' : 
                      activity.accuracy >= 75 ? 'text-yellow-400' : 'text-red-400'
                    }`}>
                      {activity.accuracy}% accuracy
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Achievements */}
        <Card className="border-elec-yellow/20 bg-elec-gray">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <Trophy className="h-5 w-5 text-elec-yellow" />
              Achievements
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {achievements.map((achievement, index) => (
                <div key={index} className={`p-3 rounded-lg border ${
                  achievement.earned 
                    ? 'border-elec-yellow/30 bg-elec-yellow/5' 
                    : 'border-gray-600/30 bg-gray-600/5'
                }`}>
                  <div className="flex items-center gap-3">
                    <achievement.icon className={`h-5 w-5 ${
                      achievement.earned ? 'text-elec-yellow' : 'text-gray-500'
                    }`} />
                    <div className="flex-1">
                      <h4 className={`font-medium text-sm ${
                        achievement.earned ? 'text-white' : 'text-gray-400'
                      }`}>
                        {achievement.title}
                      </h4>
                      <p className="text-xs text-muted-foreground">{achievement.description}</p>
                    </div>
                    {achievement.earned && (
                      <Badge className="bg-elec-yellow/20 text-elec-yellow text-xs">
                        Earned
                      </Badge>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Category Progress */}
      <Card className="border-elec-yellow/20 bg-elec-gray">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-2">
            <Target className="h-5 w-5 text-elec-yellow" />
            Progress by Category
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {categoryProgress.map((category, index) => (
              <div key={index} className="space-y-3 p-4 border border-elec-yellow/10 rounded-lg bg-elec-dark/30">
                <div className="flex justify-between items-center">
                  <span className="text-white font-medium text-sm">{category.name}</span>
                  <span className="text-elec-yellow font-bold">{category.progress}%</span>
                </div>
                <Progress 
                  value={category.progress} 
                  className="h-2"
                />
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>{category.mastered} mastered</span>
                  <span>{category.total} total cards</span>
                </div>
                <div className="text-center">
                  <Badge className={`text-xs ${getCategoryColor(category.color)} text-white`}>
                    {Math.round((category.mastered / category.total) * 100)}% Complete
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Weekly Overview */}
      <Card className="border-elec-yellow/20 bg-elec-gray">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-2">
            <Calendar className="h-5 w-5 text-elec-yellow" />
            This Week's Progress
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-7 gap-2">
            {weeklyProgress.map((day, index) => (
              <div key={index} className="text-center p-3 border border-elec-yellow/10 rounded-lg bg-elec-dark/30">
                <div className="text-sm font-medium text-white mb-2">{day.day}</div>
                <div className="text-lg font-bold text-elec-yellow mb-1">{day.cards}</div>
                <div className="text-xs text-muted-foreground">cards</div>
                <div className="text-xs text-muted-foreground mt-1">{day.time}m</div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default LearningAnalytics;
