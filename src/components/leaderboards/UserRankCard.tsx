
import { Card, CardHeader, CardContent, CardDescription, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Trophy, Award, Clock } from "lucide-react";
import { UserActivity } from "@/hooks/leaderboards/useLeaderboardData";

interface UserRankCardProps {
  currentUserRank: UserActivity | null;
  userRankings: UserActivity[];
  categoryName?: string;
  prizeAmount?: string;
}

export const UserRankCard = ({ 
  currentUserRank, 
  userRankings,
  categoryName = "Leaderboard",
  prizeAmount = "£50"
}: UserRankCardProps) => {
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

  // Calculate position or distance to next rank
  const userRankIndex = userRankings.findIndex(user => 
    currentUserRank && user.user_id === currentUserRank.user_id);
  
  const nextRankUser = userRankIndex > 0 ? userRankings[userRankIndex - 1] : null;
  const pointsToNextRank = nextRankUser && currentUserRank ? nextRankUser.points - currentUserRank.points : null;

  return (
    <Card className="border-elec-yellow bg-elec-gray">
      <CardHeader>
        <CardTitle>Your {categoryName} Stats</CardTitle>
        <CardDescription>
          Complete activities to improve your ranking and qualify for the monthly {prizeAmount} voucher.
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
                {userRankIndex !== -1 ? userRankIndex + 1 : '--'}
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
                <span className="font-medium text-sm">To Next</span>
              </div>
              <div className="text-lg font-bold">
                {pointsToNextRank !== null ? pointsToNextRank : '--'}
              </div>
            </div>
          </div>
        </div>
        {userRankIndex === 0 && currentUserRank && (
          <div className="mt-4 bg-gradient-to-r from-amber-900/30 to-amber-700/30 border border-amber-500/50 p-3 rounded-lg text-center">
            <span className="font-bold text-amber-400">🏆 Congratulations!</span> You're currently in the top position to win this month's {prizeAmount} voucher!
          </div>
        )}
      </CardContent>
    </Card>
  );
};
