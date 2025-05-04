
import { Card, CardHeader, CardContent, CardDescription, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Trophy, Award, Clock } from "lucide-react";
import { UserActivity } from "@/hooks/leaderboards/useLeaderboardData";

interface UserRankCardProps {
  currentUserRank: UserActivity | null;
  userRankings: UserActivity[];
}

export const UserRankCard = ({ currentUserRank, userRankings }: UserRankCardProps) => {
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

  const getUserDisplayName = (user: UserActivity): string => {
    return user.profiles?.full_name || user.profiles?.username || 'Anonymous User';
  };

  return (
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
  );
};
