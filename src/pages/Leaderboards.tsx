
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Trophy, Medal, Clock, Award, Star, Loader2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { useLeaderboardData, UserActivity } from "@/hooks/leaderboards/useLeaderboardData";
import { format } from "date-fns";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

const Leaderboards = () => {
  const { userRankings, communityStats, currentUserRank, isLoading, error } = useLeaderboardData();
  const [timeframe, setTimeframe] = useState<'weekly' | 'monthly' | 'alltime'>('weekly');

  // Function to render rank badges with different designs and colors
  const getRankBadge = (position: number) => {
    if (position === 1) {
      return (
        <div className="absolute -left-1 -top-1 h-8 w-8 rounded-full bg-yellow-500 flex items-center justify-center shadow-lg">
          <Trophy className="h-4 w-4 text-elec-dark" />
        </div>
      );
    } else if (position === 2) {
      return (
        <div className="absolute -left-1 -top-1 h-7 w-7 rounded-full bg-gray-300 flex items-center justify-center shadow-lg">
          <Medal className="h-4 w-4 text-elec-dark" />
        </div>
      );
    } else if (position === 3) {
      return (
        <div className="absolute -left-1 -top-1 h-7 w-7 rounded-full bg-amber-700 flex items-center justify-center shadow-lg">
          <Medal className="h-4 w-4 text-elec-dark" />
        </div>
      );
    }
    return <div className="w-6 text-center font-bold">{position}</div>;
  };

  // Helper function to get user initials from profile data
  const getUserInitials = (user: UserActivity): string => {
    if (user.profiles?.full_name) {
      return user.profiles.full_name.split(' ')
        .map(name => name.charAt(0))
        .join('')
        .slice(0, 2)
        .toUpperCase();
    } else if (user.profiles?.username) {
      return user.profiles.username.substring(0, 2).toUpperCase();
    }
    return 'US';
  };

  // Helper function to get user display name
  const getUserDisplayName = (user: UserActivity): string => {
    return user.profiles?.full_name || user.profiles?.username || 'Anonymous User';
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="h-8 w-8 text-elec-yellow animate-spin" />
        <span className="ml-2 text-muted-foreground">Loading leaderboard data...</span>
      </div>
    );
  }

  if (error) {
    return (
      <Alert variant="destructive" className="my-8">
        <AlertTitle>Error loading leaderboard data</AlertTitle>
        <AlertDescription>{error}</AlertDescription>
      </Alert>
    );
  }

  return (
    <div className="space-y-8 animate-fade-in">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Leaderboards</h1>
        <p className="text-muted-foreground">
          See how you rank against other electrical professionals in the community.
        </p>
      </div>

      {/* Community Stats */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card className="border-elec-yellow/20 bg-elec-gray">
          <CardContent className="pt-6 text-center">
            <Users className="h-8 w-8 text-elec-yellow mx-auto mb-3" />
            <div className="text-3xl font-bold">{communityStats?.active_users || 0}</div>
            <p className="text-sm text-muted-foreground">Active Community Members</p>
          </CardContent>
        </Card>
        <Card className="border-elec-yellow/20 bg-elec-gray">
          <CardContent className="pt-6 text-center">
            <Video className="h-8 w-8 text-elec-yellow mx-auto mb-3" />
            <div className="text-3xl font-bold">{communityStats?.lessons_completed_today || 0}</div>
            <p className="text-sm text-muted-foreground">Lessons Completed Today</p>
          </CardContent>
        </Card>
        <Card className="border-elec-yellow/20 bg-elec-gray">
          <CardContent className="pt-6 text-center">
            <Star className="h-8 w-8 text-elec-yellow mx-auto mb-3" />
            <div className="text-3xl font-bold">{communityStats?.longest_streak || 0} Days</div>
            <p className="text-sm text-muted-foreground">Longest Active Streak</p>
          </CardContent>
        </Card>
      </div>

      {/* Your Ranking Card */}
      <Card className="border-elec-yellow bg-elec-gray">
        <CardHeader>
          <CardTitle>Your Leaderboard Stats</CardTitle>
          <CardDescription>
            Complete lessons and engage with the platform to improve your ranking.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row items-center md:justify-between gap-6 p-4 bg-elec-dark rounded-lg">
            <div className="flex items-center gap-4">
              <Avatar className="h-14 w-14 border-2 border-elec-yellow">
                {currentUserRank?.profiles?.avatar_url ? (
                  <AvatarImage src={currentUserRank.profiles.avatar_url} />
                ) : (
                  <AvatarFallback className="bg-elec-yellow/20 text-elec-yellow">
                    {currentUserRank ? getUserInitials(currentUserRank) : 'GU'}
                  </AvatarFallback>
                )}
              </Avatar>
              <div>
                <h3 className="font-semibold">
                  {currentUserRank ? getUserDisplayName(currentUserRank) : 'Guest User'}
                </h3>
                <p className="text-sm text-muted-foreground">
                  {currentUserRank 
                    ? `${currentUserRank.level} - ${currentUserRank.badge}`
                    : 'Start your journey to rank on the leaderboard'}
                </p>
              </div>
            </div>
            <div className="grid grid-cols-3 gap-4 text-center">
              <div className="p-3 bg-elec-gray rounded-lg">
                <div className="flex items-center justify-center mb-1">
                  <Trophy className="h-4 w-4 text-elec-yellow mr-1" />
                  <span className="font-medium text-sm">Rank</span>
                </div>
                <div className="text-lg font-bold">
                  {userRankings?.findIndex(user => 
                    currentUserRank && user.user_id === currentUserRank.user_id) + 1 || '--'}
                </div>
              </div>
              <div className="p-3 bg-elec-gray rounded-lg">
                <div className="flex items-center justify-center mb-1">
                  <Award className="h-4 w-4 text-elec-yellow mr-1" />
                  <span className="font-medium text-sm">Points</span>
                </div>
                <div className="text-lg font-bold">{currentUserRank?.points || 0}</div>
              </div>
              <div className="p-3 bg-elec-gray rounded-lg">
                <div className="flex items-center justify-center mb-1">
                  <Clock className="h-4 w-4 text-elec-yellow mr-1" />
                  <span className="font-medium text-sm">Streak</span>
                </div>
                <div className="text-lg font-bold">{currentUserRank?.streak || 0}</div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Main Leaderboard */}
      <Tabs defaultValue={timeframe} className="space-y-4" onValueChange={(value) => setTimeframe(value as 'weekly' | 'monthly' | 'alltime')}>
        <div className="flex justify-between items-center">
          <TabsList className="bg-elec-gray border border-elec-yellow/20">
            <TabsTrigger value="weekly">This Week</TabsTrigger>
            <TabsTrigger value="monthly">This Month</TabsTrigger>
            <TabsTrigger value="alltime">All Time</TabsTrigger>
          </TabsList>
        </div>

        {["weekly", "monthly", "alltime"].map((period) => (
          <TabsContent key={period} value={period} className="space-y-4">
            <Card className="border-elec-yellow/20 bg-elec-gray">
              <CardHeader>
                <CardTitle>
                  {period === "weekly" ? "Weekly Leaderboard" : 
                   period === "monthly" ? "Monthly Leaderboard" : "All-Time Leaderboard"}
                </CardTitle>
                <CardDescription>
                  {period === "weekly" ? "Top performers for this week" : 
                   period === "monthly" ? "Top performers for this month" : "Best performers of all time"}
                </CardDescription>
              </CardHeader>
              <CardContent>
                {userRankings.length === 0 ? (
                  <div className="text-center p-8 text-muted-foreground">
                    No leaderboard data available yet. Be the first to start learning!
                  </div>
                ) : (
                  <div className="space-y-4">
                    {userRankings.map((user, index) => (
                      <div 
                        key={user.id} 
                        className={`
                          flex items-center gap-4 p-4 rounded-lg relative
                          ${index < 3 ? "bg-elec-dark/70" : "bg-elec-dark/40"}
                        `}
                      >
                        {/* Rank */}
                        {getRankBadge(index + 1)}

                        {/* User Avatar */}
                        <Avatar className="h-10 w-10">
                          {user.profiles?.avatar_url ? (
                            <AvatarImage src={user.profiles.avatar_url} />
                          ) : (
                            <AvatarFallback 
                              className={
                                index === 0 ? "bg-yellow-500/20 text-yellow-500" : 
                                index === 1 ? "bg-gray-300/20 text-gray-300" : 
                                index === 2 ? "bg-amber-700/20 text-amber-700" : 
                                "bg-elec-yellow/10 text-elec-yellow"
                              }
                            >
                              {getUserInitials(user)}
                            </AvatarFallback>
                          )}
                        </Avatar>

                        {/* User Info */}
                        <div className="flex-1">
                          <div className="flex items-center gap-2">
                            <h4 className="font-medium">{getUserDisplayName(user)}</h4>
                            <Badge 
                              variant="outline" 
                              className="text-xs border-elec-yellow/30 text-elec-yellow/90"
                            >
                              {user.level}
                            </Badge>
                          </div>
                          <div className="flex items-center gap-2 text-xs text-muted-foreground mt-1">
                            <span className="flex items-center">
                              <Award className="h-3 w-3 mr-1" />
                              {user.badge}
                            </span>
                            <span className="flex items-center">
                              <Clock className="h-3 w-3 mr-1" />
                              {user.streak} day streak
                            </span>
                          </div>
                        </div>

                        {/* Points */}
                        <div className="text-right">
                          <div className="font-bold">{user.points.toLocaleString()}</div>
                          <div className="text-xs text-muted-foreground">points</div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        ))}
      </Tabs>

      {/* Achievements */}
      <div className="space-y-4">
        <h2 className="text-xl font-semibold">Latest Achievements</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { icon: <Award className="h-8 w-8" />, name: "First Lesson", description: "Complete your first video lesson" },
            { icon: <Clock className="h-8 w-8" />, name: "7-Day Streak", description: "Learn for 7 consecutive days" },
            { icon: <Trophy className="h-8 w-8" />, name: "Quiz Master", description: "Score 100% on 5 different quizzes" },
            { icon: <Star className="h-8 w-8" />, name: "Top Contributor", description: "Help others in the community" },
          ].map((achievement, i) => (
            <Card key={i} className="border-elec-yellow/20 bg-elec-gray">
              <CardContent className="pt-6 flex flex-col items-center text-center">
                <div className="h-16 w-16 rounded-full bg-elec-dark flex items-center justify-center mb-3">
                  <div className="text-elec-yellow/50">{achievement.icon}</div>
                </div>
                <h3 className="font-medium mb-1">{achievement.name}</h3>
                <p className="text-xs text-muted-foreground">{achievement.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

// Mock data for community stats
const Users = ({ className }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
    <circle cx="9" cy="7" r="4" />
    <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
    <path d="M16 3.13a4 4 0 0 1 0 7.75" />
  </svg>
);

const Video = ({ className }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <rect width="18" height="14" x="3" y="4" rx="2" />
    <polygon points="12,8 12,14 17,11" />
  </svg>
);

export default Leaderboards;
