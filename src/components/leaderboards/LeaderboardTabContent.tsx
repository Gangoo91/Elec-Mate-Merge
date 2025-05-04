
import { Card, CardHeader, CardContent, CardDescription, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Trophy, Medal, Award, Clock } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { UserActivity } from "@/hooks/leaderboards/useLeaderboardData";

interface LeaderboardTabContentProps {
  userRankings: UserActivity[];
  timeframe: 'weekly' | 'monthly' | 'alltime';
}

export const LeaderboardTabContent = ({ userRankings, timeframe }: LeaderboardTabContentProps) => {
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

  return (
    <Card className="border-elec-yellow/20 bg-elec-gray">
      <CardHeader>
        <CardTitle>
          {timeframe === "weekly" ? "Weekly Leaderboard" : 
           timeframe === "monthly" ? "Monthly Leaderboard" : "All-Time Leaderboard"}
        </CardTitle>
        <CardDescription>
          {timeframe === "weekly" ? "Top performers for this week" : 
           timeframe === "monthly" ? "Top performers for this month" : "Best performers of all time"}
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
  );
};
