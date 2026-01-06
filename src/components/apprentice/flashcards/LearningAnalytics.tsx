
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  TrendingUp, Clock, Target, Trophy, Calendar, Brain, Zap, Award,
  BookOpen, Flame, CheckCircle, Star, BarChart3, Activity
} from "lucide-react";

const LearningAnalytics = () => {
  const stats = [
    { label: "Cards Studied Today", value: 42, icon: Target, color: "blue", change: "+12%", changeType: "positive" },
    { label: "Study Streak", value: 14, unit: "days", icon: Flame, color: "orange", change: "+2 days", changeType: "positive" },
    { label: "Total Study Time", value: 8.5, unit: "hours", icon: Clock, color: "purple", change: "+1.2h", changeType: "positive" },
    { label: "Sets Completed", value: 6, icon: Trophy, color: "green", change: "+1 set", changeType: "positive" }
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
    { title: "Study Streak", description: "14 days in a row", icon: Flame, earned: true, color: "orange" },
    { title: "Speed Learner", description: "100+ cards in one day", icon: Zap, earned: false, color: "yellow" },
    { title: "Perfect Score", description: "100% accuracy on a set", icon: Target, earned: true, color: "blue" },
    { title: "Knowledge Master", description: "Complete all beginner sets", icon: Brain, earned: true, color: "purple" },
    { title: "Regulation Expert", description: "Master all BS 7671 cards", icon: BookOpen, earned: false, color: "green" },
    { title: "Safety Champion", description: "Perfect all safety sets", icon: Award, earned: true, color: "red" }
  ];

  const getDifficultyConfig = (difficulty: string) => {
    switch (difficulty) {
      case 'beginner':
        return { bg: 'bg-green-500/10', text: 'text-green-400', border: 'border-green-500/30' };
      case 'intermediate':
        return { bg: 'bg-elec-yellow/10', text: 'text-elec-yellow', border: 'border-elec-yellow/30' };
      case 'advanced':
        return { bg: 'bg-red-500/10', text: 'text-red-400', border: 'border-red-500/30' };
      default:
        return { bg: 'bg-white/20', text: 'text-white', border: 'border-white/20' };
    }
  };

  const getColorConfig = (color: string) => {
    const configs: Record<string, { bg: string; text: string; iconBg: string; border: string; gradient: string }> = {
      blue: { bg: 'bg-blue-500', text: 'text-blue-400', iconBg: 'bg-blue-500/10', border: 'border-blue-500/30', gradient: 'from-blue-500 to-blue-400' },
      green: { bg: 'bg-green-500', text: 'text-green-400', iconBg: 'bg-green-500/10', border: 'border-green-500/30', gradient: 'from-green-500 to-green-400' },
      yellow: { bg: 'bg-elec-yellow', text: 'text-elec-yellow', iconBg: 'bg-elec-yellow/10', border: 'border-elec-yellow/30', gradient: 'from-elec-yellow to-yellow-400' },
      purple: { bg: 'bg-purple-500', text: 'text-purple-400', iconBg: 'bg-purple-500/10', border: 'border-purple-500/30', gradient: 'from-purple-500 to-purple-400' },
      orange: { bg: 'bg-orange-500', text: 'text-orange-400', iconBg: 'bg-orange-500/10', border: 'border-orange-500/30', gradient: 'from-orange-500 to-orange-400' },
      red: { bg: 'bg-red-500', text: 'text-red-400', iconBg: 'bg-red-500/10', border: 'border-red-500/30', gradient: 'from-red-500 to-red-400' }
    };
    return configs[color] || configs.blue;
  };

  const maxCards = Math.max(...weeklyProgress.map(d => d.cards));

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header Card */}
      <Card className="border-elec-yellow/20 bg-gradient-to-br from-elec-gray to-elec-card overflow-hidden relative">
        <div className="absolute top-0 right-0 w-64 h-64 bg-elec-yellow/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
        <CardHeader className="relative">
          <div className="flex items-center gap-4">
            <div className="p-3 rounded-xl bg-gradient-to-br from-elec-yellow/20 to-elec-yellow/5 border border-elec-yellow/30">
              <TrendingUp className="h-8 w-8 text-elec-yellow" />
            </div>
            <div>
              <CardTitle className="text-2xl sm:text-3xl font-bold text-white">
                Learning <span className="text-elec-yellow">Analytics</span>
              </CardTitle>
              <p className="text-white/70 mt-1">
                Track your progress and identify areas for improvement
              </p>
            </div>
          </div>
        </CardHeader>
      </Card>

      {/* Stats Overview */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, index) => {
          const colorConfig = getColorConfig(stat.color);
          const StatIcon = stat.icon;
          return (
            <Card key={index} className="bg-gradient-to-br from-elec-gray to-elec-card border-white/10 hover:border-white/20 transition-colors">
              <CardContent className="p-4 sm:p-5">
                <div className="flex items-start justify-between mb-3">
                  <div className={`p-2.5 rounded-xl ${colorConfig.iconBg} border ${colorConfig.border}`}>
                    <StatIcon className={`h-5 w-5 ${colorConfig.text}`} />
                  </div>
                  <Badge className={`${colorConfig.iconBg} ${colorConfig.text} border ${colorConfig.border} text-xs`}>
                    {stat.change}
                  </Badge>
                </div>
                <div className="space-y-1">
                  <div className="flex items-baseline gap-1">
                    <span className="text-2xl sm:text-3xl font-bold text-white">{stat.value}</span>
                    {stat.unit && <span className="text-sm text-white/60">{stat.unit}</span>}
                  </div>
                  <div className="text-xs text-white/60">{stat.label}</div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        {/* Recent Activity */}
        <Card className="xl:col-span-2 bg-gradient-to-br from-elec-gray to-elec-card border-white/10">
          <CardHeader className="pb-4">
            <CardTitle className="text-white flex items-center gap-2">
              <div className="p-2 rounded-lg bg-blue-500/10 border border-blue-500/30">
                <Activity className="h-5 w-5 text-blue-400" />
              </div>
              Recent Study Sessions
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {recentActivity.map((activity, index) => {
                const diffConfig = getDifficultyConfig(activity.difficulty);
                return (
                  <div key={index} className="border border-white/10 rounded-xl p-4 bg-white/10 hover:border-white/20 transition-colors">
                    <div className="flex justify-between items-start mb-3">
                      <div>
                        <h4 className="font-semibold text-white text-sm mb-2">{activity.set}</h4>
                        <div className="flex items-center gap-2 flex-wrap">
                          <Badge variant="outline" className="text-xs bg-white/5 border-white/20 text-white/70">
                            {activity.category}
                          </Badge>
                          <Badge className={`text-xs ${diffConfig.bg} ${diffConfig.text} border ${diffConfig.border}`}>
                            {activity.difficulty}
                          </Badge>
                        </div>
                      </div>
                      <div className="flex items-center gap-1 text-xs text-white/60">
                        <Clock className="h-3 w-3" />
                        <span>{activity.time}</span>
                      </div>
                    </div>
                    <div className="flex justify-between items-center">
                      <div className="flex items-center gap-1 text-xs text-white/60">
                        <Target className="h-3.5 w-3.5 text-blue-400" />
                        <span>{activity.cards} cards studied</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <div className={`h-2 w-16 bg-white/10 rounded-full overflow-hidden`}>
                          <div
                            className={`h-full rounded-full transition-all ${
                              activity.accuracy >= 90 ? 'bg-gradient-to-r from-green-500 to-green-400' :
                              activity.accuracy >= 75 ? 'bg-gradient-to-r from-elec-yellow to-yellow-400' : 'bg-gradient-to-r from-red-500 to-red-400'
                            }`}
                            style={{ width: `${activity.accuracy}%` }}
                          />
                        </div>
                        <span className={`text-xs font-semibold ${
                          activity.accuracy >= 90 ? 'text-green-400' :
                          activity.accuracy >= 75 ? 'text-elec-yellow' : 'text-red-400'
                        }`}>
                          {activity.accuracy}%
                        </span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>

        {/* Achievements */}
        <Card className="bg-gradient-to-br from-elec-gray to-elec-card border-white/10">
          <CardHeader className="pb-4">
            <CardTitle className="text-white flex items-center gap-2">
              <div className="p-2 rounded-lg bg-elec-yellow/10 border border-elec-yellow/30">
                <Trophy className="h-5 w-5 text-elec-yellow" />
              </div>
              Achievements
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {achievements.map((achievement, index) => {
                const colorConfig = getColorConfig(achievement.color);
                const AchievementIcon = achievement.icon;
                return (
                  <div key={index} className={`p-3 rounded-xl border transition-colors ${
                    achievement.earned
                      ? `${colorConfig.border} ${colorConfig.iconBg}`
                      : 'border-white/10 bg-white/10 opacity-60'
                  }`}>
                    <div className="flex items-center gap-3">
                      <div className={`p-2 rounded-lg ${achievement.earned ? colorConfig.iconBg : 'bg-white/5'} border ${achievement.earned ? colorConfig.border : 'border-white/10'}`}>
                        <AchievementIcon className={`h-5 w-5 ${achievement.earned ? colorConfig.text : 'text-white/70'}`} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className={`font-semibold text-sm ${achievement.earned ? 'text-white' : 'text-white/80'}`}>
                          {achievement.title}
                        </h4>
                        <p className="text-xs text-white/60">{achievement.description}</p>
                      </div>
                      {achievement.earned && (
                        <CheckCircle className={`h-5 w-5 ${colorConfig.text} flex-shrink-0`} />
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Category Progress */}
      <Card className="bg-gradient-to-br from-elec-gray to-elec-card border-white/10">
        <CardHeader className="pb-4">
          <CardTitle className="text-white flex items-center gap-2">
            <div className="p-2 rounded-lg bg-purple-500/10 border border-purple-500/30">
              <BarChart3 className="h-5 w-5 text-purple-400" />
            </div>
            Progress by Category
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {categoryProgress.map((category, index) => {
              const colorConfig = getColorConfig(category.color);
              return (
                <div key={index} className="space-y-3 p-4 border border-white/10 rounded-xl bg-white/10 hover:border-white/20 transition-colors">
                  <div className="flex justify-between items-center">
                    <span className="text-white font-semibold text-sm">{category.name}</span>
                    <span className={`${colorConfig.text} font-bold`}>{category.progress}%</span>
                  </div>
                  <div className="h-2.5 bg-white/10 rounded-full overflow-hidden">
                    <div
                      className={`h-full bg-gradient-to-r ${colorConfig.gradient} rounded-full transition-all duration-500`}
                      style={{ width: `${category.progress}%` }}
                    />
                  </div>
                  <div className="flex justify-between text-xs text-white/60">
                    <div className="flex items-center gap-1">
                      <Star className="h-3 w-3 text-elec-yellow" />
                      <span>{category.mastered} mastered</span>
                    </div>
                    <span>{category.total} total cards</span>
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Weekly Overview */}
      <Card className="bg-gradient-to-br from-elec-gray to-elec-card border-white/10">
        <CardHeader className="pb-4">
          <CardTitle className="text-white flex items-center gap-2">
            <div className="p-2 rounded-lg bg-green-500/10 border border-green-500/30">
              <Calendar className="h-5 w-5 text-green-400" />
            </div>
            This Week's Progress
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-7 gap-2 sm:gap-3">
            {weeklyProgress.map((day, index) => {
              const heightPercentage = (day.cards / maxCards) * 100;
              const isToday = index === 6;
              return (
                <div key={index} className="text-center space-y-2">
                  <div className="h-24 sm:h-32 flex items-end justify-center">
                    <div
                      className={`w-full max-w-[40px] rounded-t-lg transition-all duration-500 ${
                        isToday
                          ? 'bg-gradient-to-t from-elec-yellow to-elec-yellow/70'
                          : 'bg-gradient-to-t from-blue-500 to-blue-400'
                      }`}
                      style={{ height: `${heightPercentage}%` }}
                    />
                  </div>
                  <div className={`text-xs font-medium ${isToday ? 'text-elec-yellow' : 'text-white/70'}`}>
                    {day.day}
                  </div>
                  <div className={`text-lg font-bold ${isToday ? 'text-elec-yellow' : 'text-white'}`}>
                    {day.cards}
                  </div>
                  <div className="text-xs text-white/80">{day.time}m</div>
                </div>
              );
            })}
          </div>
          <div className="mt-6 pt-4 border-t border-white/10 flex flex-wrap justify-center gap-6 text-sm">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded bg-gradient-to-r from-blue-500 to-blue-400" />
              <span className="text-white/70">Previous days</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded bg-gradient-to-r from-elec-yellow to-elec-yellow/70" />
              <span className="text-white/70">Today</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default LearningAnalytics;
