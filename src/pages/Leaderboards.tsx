
import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Trophy, Medal, Clock, Award, Star, Loader2, Users, Filter, CalendarCheck } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { useLeaderboardData, UserActivity } from "@/hooks/leaderboards/useLeaderboardData";
import { format } from "date-fns";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Progress } from "@/components/ui/progress";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { BarChart } from "recharts";  // Fixed import from 'recharts'
import { Button } from "@/components/ui/button";
import { LeaderboardRankCard } from "@/components/leaderboards/LeaderboardRankCard";
import { AchievementCard } from "@/components/leaderboards/AchievementCard";
import { useLeaderboardsFilters, getLevelBadgeColor, getBadgeColor } from "@/hooks/leaderboards/useLeaderboardsFilters";

const Leaderboards = () => {
  const { userRankings, communityStats, currentUserRank, isLoading, error } = useLeaderboardData();
  
  // Use our custom hook for filters
  const { 
    timeframe, setTimeframe,
    levelFilter, setLevelFilter,
    badgeFilter, setBadgeFilter,
    viewMode, setViewMode,
    uniqueLevels, uniqueBadges,
    filteredUsers
  } = useLeaderboardsFilters(userRankings);

  // Calculate maximum points for progress bar scaling
  const maxPoints = Math.max(...userRankings.map(user => user.points), 100);

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
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Leaderboards</h1>
          <p className="text-muted-foreground">
            See how you rank against other electrical professionals in the community.
          </p>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="flex items-center gap-2">
            <CalendarCheck className="h-4 w-4 text-muted-foreground" />
            <Select value={timeframe} onValueChange={(value) => setTimeframe(value as any)}>
              <SelectTrigger className="w-[160px]">
                <SelectValue placeholder="Timeframe" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="weekly">This Week</SelectItem>
                <SelectItem value="monthly">This Month</SelectItem>
                <SelectItem value="alltime">All Time</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="flex items-center gap-2">
            <Filter className="h-4 w-4 text-muted-foreground" />
            <div className="flex gap-2">
              <Button 
                variant={viewMode === 'card' ? "secondary" : "outline"} 
                size="sm" 
                onClick={() => setViewMode('card')}
                className="h-9"
              >
                Card
              </Button>
              <Button 
                variant={viewMode === 'table' ? "secondary" : "outline"} 
                size="sm" 
                onClick={() => setViewMode('table')}
                className="h-9"
              >
                Table
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-4">
        <div className="flex items-center gap-2">
          <span className="text-sm text-muted-foreground">Level:</span>
          <Select value={levelFilter} onValueChange={setLevelFilter}>
            <SelectTrigger className="w-[160px]">
              <SelectValue placeholder="Filter by Level" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Levels</SelectItem>
              {uniqueLevels.map(level => (
                <SelectItem key={level} value={level}>{level}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        
        <div className="flex items-center gap-2">
          <span className="text-sm text-muted-foreground">Badge:</span>
          <Select value={badgeFilter} onValueChange={setBadgeFilter}>
            <SelectTrigger className="w-[160px]">
              <SelectValue placeholder="Filter by Badge" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Badges</SelectItem>
              {uniqueBadges.map(badge => (
                <SelectItem key={badge} value={badge}>{badge}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
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
                  <AvatarImage src={currentUserRank.profiles.avatar_url} alt={getUserDisplayName(currentUserRank)} />
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
                <div className="flex items-center gap-2 mt-1">
                  {currentUserRank && (
                    <>
                      <Badge variant="outline" className={`text-xs ${getLevelBadgeColor(currentUserRank.level)}`}>
                        {currentUserRank.level}
                      </Badge>
                      <Badge variant="outline" className={`text-xs ${getBadgeColor(currentUserRank.badge)}`}>
                        {currentUserRank.badge}
                      </Badge>
                    </>
                  )}
                </div>
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
          
          {currentUserRank && (
            <div className="mt-6">
              <div className="flex justify-between text-sm mb-2">
                <span>Progress to next level</span>
                <span className="font-medium">{currentUserRank.points} / {currentUserRank.level === "Apprentice" ? 1000 : 2000} points</span>
              </div>
              <Progress 
                value={(currentUserRank.points / (currentUserRank.level === "Apprentice" ? 1000 : 2000)) * 100} 
                className="h-2" 
              />
            </div>
          )}
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
                {filteredUsers.length === 0 ? (
                  <div className="text-center p-8 text-muted-foreground">
                    No leaderboard data available for the selected filters. Try a different combination.
                  </div>
                ) : viewMode === 'card' ? (
                  <div className="space-y-4">
                    {filteredUsers.map((user, index) => (
                      <LeaderboardRankCard 
                        key={user.id}
                        user={user}
                        position={index + 1}
                        maxPoints={maxPoints}
                      />
                    ))}
                  </div>
                ) : (
                  <div className="rounded-md border">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Rank</TableHead>
                          <TableHead>User</TableHead>
                          <TableHead>Level</TableHead>
                          <TableHead>Badge</TableHead>
                          <TableHead>Streak</TableHead>
                          <TableHead className="text-right">Points</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {filteredUsers.map((user, index) => (
                          <TableRow key={user.id} className={index < 3 ? "bg-elec-dark/30" : ""}>
                            <TableCell className="font-medium w-16">
                              <div className="flex items-center justify-center">
                                {index === 0 ? (
                                  <Trophy className="h-5 w-5 text-yellow-500" />
                                ) : index === 1 ? (
                                  <Medal className="h-5 w-5 text-gray-300" />
                                ) : index === 2 ? (
                                  <Medal className="h-5 w-5 text-amber-700" />
                                ) : (
                                  <span>{index + 1}</span>
                                )}
                              </div>
                            </TableCell>
                            <TableCell>
                              <div className="flex items-center gap-2">
                                <Avatar className="h-8 w-8">
                                  {user.profiles?.avatar_url ? (
                                    <AvatarImage src={user.profiles.avatar_url} alt={getUserDisplayName(user)} />
                                  ) : (
                                    <AvatarFallback className="bg-elec-yellow/10 text-elec-yellow">
                                      {getUserInitials(user)}
                                    </AvatarFallback>
                                  )}
                                </Avatar>
                                <span>{getUserDisplayName(user)}</span>
                              </div>
                            </TableCell>
                            <TableCell>
                              <Badge variant="outline" className={`${getLevelBadgeColor(user.level)}`}>
                                {user.level}
                              </Badge>
                            </TableCell>
                            <TableCell>
                              <Badge variant="outline" className={`${getBadgeColor(user.badge)}`}>
                                {user.badge}
                              </Badge>
                            </TableCell>
                            <TableCell>
                              <div className="flex items-center">
                                <Clock className="h-3 w-3 mr-1 text-muted-foreground" />
                                {user.streak} days
                              </div>
                            </TableCell>
                            <TableCell className="text-right font-medium">{user.points.toLocaleString()}</TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                )}
              </CardContent>
              <CardFooter className="text-sm text-muted-foreground border-t pt-4">
                Showing {filteredUsers.length} users from total {userRankings.length} users
              </CardFooter>
            </Card>
          </TabsContent>
        ))}
      </Tabs>

      {/* Achievements */}
      <div className="space-y-4">
        <h2 className="text-xl font-semibold">Latest Achievements</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { icon: <Award className="h-8 w-8" />, name: "First Lesson", description: "Complete your first video lesson", progress: 100 },
            { icon: <Clock className="h-8 w-8" />, name: "7-Day Streak", description: "Learn for 7 consecutive days", progress: currentUserRank?.streak ? (currentUserRank.streak / 7) * 100 : 0 },
            { icon: <Trophy className="h-8 w-8" />, name: "Quiz Master", description: "Score 100% on 5 different quizzes", progress: 60 },
            { icon: <Star className="h-8 w-8" />, name: "Top Contributor", description: "Help others in the community", progress: 30 },
          ].map((achievement, i) => (
            <AchievementCard 
              key={i}
              icon={achievement.icon}
              name={achievement.name}
              description={achievement.description}
              progress={achievement.progress}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

// Video icon component for the community stats
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
