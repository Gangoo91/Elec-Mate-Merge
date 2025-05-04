import { Card, CardContent, CardDescription, CardHeader } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Trophy, Award, Clock } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { UserActivity } from "@/hooks/leaderboards/useLeaderboardData";
import { getBadgeColor, getLevelBadgeColor } from "@/hooks/leaderboards/useLeaderboardsFilters";
import { getUserInitials, getUserDisplayName } from "./leaderboardUtils";
import { LeaderboardFilters } from "@/hooks/leaderboards/filters";

interface UserRankingCardProps {
  currentUserRank: UserActivity | null;
  userRankings: UserActivity[];
  isMobile: boolean;
}

export const UserRankingCard = ({ currentUserRank, userRankings, isMobile }: UserRankingCardProps) => {
  return (
    <Card className="border-elec-yellow bg-elec-gray">
      <CardHeader>
        <CardDescription>
          Complete lessons and engage with the platform to improve your ranking.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col md:flex-row items-center md:justify-between gap-4 p-4 bg-elec-dark rounded-lg">
          <div className="flex items-center gap-4">
            <Avatar className="h-12 w-12 md:h-14 md:w-14 border-2 border-elec-yellow">
              {currentUserRank?.profiles?.avatar_url ? (
                <AvatarImage src={currentUserRank.profiles.avatar_url} alt={getUserDisplayName(currentUserRank)} />
              ) : (
                <AvatarFallback className="bg-elec-yellow/20 text-elec-yellow">
                  {currentUserRank ? getUserInitials(currentUserRank) : 'GU'}
                </AvatarFallback>
              )}
            </Avatar>
            <div>
              <h3 className="font-semibold text-center md:text-left">
                {currentUserRank ? getUserDisplayName(currentUserRank) : 'Guest User'}
              </h3>
              <div className="flex items-center justify-center md:justify-start gap-2 mt-1 flex-wrap">
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
          <div className="grid grid-cols-3 gap-2 md:gap-4 text-center w-full md:w-auto">
            <div className="p-2 md:p-3 bg-elec-gray rounded-lg">
              <div className="flex items-center justify-center mb-1">
                <Trophy className="h-4 w-4 text-elec-yellow mr-1" />
                <span className="font-medium text-xs md:text-sm">Rank</span>
              </div>
              <div className="text-base md:text-lg font-bold">
                {userRankings?.findIndex(user => 
                  currentUserRank && user.user_id === currentUserRank.user_id) + 1 || '--'}
              </div>
            </div>
            <div className="p-2 md:p-3 bg-elec-gray rounded-lg">
              <div className="flex items-center justify-center mb-1">
                <Award className="h-4 w-4 text-elec-yellow mr-1" />
                <span className="font-medium text-xs md:text-sm">Points</span>
              </div>
              <div className="text-base md:text-lg font-bold">{currentUserRank?.points || 0}</div>
            </div>
            <div className="p-2 md:p-3 bg-elec-gray rounded-lg">
              <div className="flex items-center justify-center mb-1">
                <Clock className="h-4 w-4 text-elec-yellow mr-1" />
                <span className="font-medium text-xs md:text-sm">Streak</span>
              </div>
              <div className="text-base md:text-lg font-bold">{currentUserRank?.streak || 0}</div>
            </div>
          </div>
        </div>
        
        {currentUserRank && (
          <div className="mt-4 md:mt-6">
            <div className="flex justify-between text-xs md:text-sm mb-2">
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
  );
};
