
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { UserActivity } from "@/hooks/leaderboards/types";
import { ArrowUp, Award, Clock, Medal, Star, Trophy, TrendingUp, TrendingDown } from "lucide-react";
import { getBadgeColor, getLevelBadgeColor } from "@/hooks/leaderboards/filters";
import { useEffect, useState } from "react";
import { getUserDisplayName, getUserInitials, formatPoints, getTrendIndicator, getProgressLevel } from "../leaderboards/leaderboardUtils";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

interface UserRankingCardProps {
  currentUserRank: UserActivity | null;
  userRankings: UserActivity[];
  isMobile: boolean;
}

export const UserRankingCard = ({ currentUserRank, userRankings, isMobile }: UserRankingCardProps) => {
  const [animatePoints, setAnimatePoints] = useState(false);
  const navigate = useNavigate();
  const { level, progress } = currentUserRank ? getProgressLevel(currentUserRank.points) : { level: 1, progress: 0 };
  const pointsToNextLevel = currentUserRank ? Math.pow(level, 2) * 1000 - currentUserRank.points : 1000;
  
  // Get trend indicator if available
  const trendData = currentUserRank ? getTrendIndicator(currentUserRank) : { trend: 'stable', percentage: 0 };
  
  useEffect(() => {
    // Trigger animation when component mounts
    setAnimatePoints(true);
  }, []);
  
  if (!currentUserRank) {
    return (
      <Card className="border-elec-yellow/20 bg-elec-dark/40">
        <CardHeader className={isMobile ? "p-4 pb-2" : "pb-2"}>
          <CardTitle className={isMobile ? "text-lg" : ""}>Your Ranking</CardTitle>
          <CardDescription>Sign in to view your position on the leaderboard</CardDescription>
        </CardHeader>
        <CardContent className={isMobile ? "p-4" : ""}>
          <div className="flex justify-center my-3">
            <Button onClick={() => navigate("/auth/signin")}>Sign In</Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  const userPosition = userRankings.findIndex(u => u.user_id === currentUserRank.user_id) + 1;
  const isTopThree = userPosition <= 3;
  
  return (
    <Card className="border-elec-yellow/20 bg-elec-dark/40">
      <CardHeader className={isMobile ? "p-4 pb-2" : "pb-2"}>
        <div className="flex justify-between items-center">
          <div>
            <CardTitle className={isMobile ? "text-lg" : ""}>Your Ranking</CardTitle>
            <CardDescription>Your current position on the leaderboard</CardDescription>
          </div>
          
          {/* Show position change if available */}
          {trendData.trend !== 'stable' && (
            <Badge 
              variant={trendData.trend === 'up' ? "success" : "destructive"}
              className="flex items-center gap-1"
            >
              {trendData.trend === 'up' ? 
                <TrendingUp className="h-3 w-3" /> : 
                <TrendingDown className="h-3 w-3" />
              }
              {trendData.percentage}%
            </Badge>
          )}
        </div>
      </CardHeader>
      <CardContent className={isMobile ? "p-4" : ""}>
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
          {/* Position and Avatar */}
          <div className="flex items-center gap-3">
            <div className="flex items-center justify-center w-10 h-10 rounded-full bg-elec-dark text-elec-yellow border border-elec-yellow/30 font-bold">
              {userPosition === 1 ? (
                <Trophy className="h-5 w-5 text-yellow-500" />
              ) : userPosition === 2 ? (
                <Medal className="h-5 w-5 text-gray-300" />
              ) : userPosition === 3 ? (
                <Medal className="h-5 w-5 text-amber-700" />
              ) : (
                `#${userPosition}`
              )}
            </div>
            
            <Avatar className="h-10 w-10">
              {currentUserRank.profiles?.avatar_url ? (
                <AvatarImage src={currentUserRank.profiles.avatar_url} alt={getUserDisplayName(currentUserRank)} />
              ) : (
                <AvatarFallback className="bg-elec-yellow/10 text-elec-yellow">
                  {getUserInitials(currentUserRank)}
                </AvatarFallback>
              )}
            </Avatar>
          </div>
          
          {/* User Details */}
          <div className="flex-1">
            <div className="flex items-center gap-2">
              <h3 className="font-medium">{getUserDisplayName(currentUserRank)}</h3>
              <div className="flex gap-1">
                <Badge variant="outline" className={getLevelBadgeColor(currentUserRank.level)}>
                  {currentUserRank.level}
                </Badge>
                <Badge variant="outline" className={getBadgeColor(currentUserRank.badge)}>
                  {currentUserRank.badge}
                </Badge>
              </div>
            </div>
            
            <div className="flex items-center gap-3 mt-1 text-sm text-muted-foreground">
              <div className="flex items-center">
                <Clock className="h-3.5 w-3.5 mr-1" />
                {currentUserRank.streak} day streak
              </div>
              <div>•</div>
              <div className="flex items-center">
                <Star className="h-3.5 w-3.5 mr-1" />
                {currentUserRank.achievements?.length || 0} achievements
              </div>
            </div>
          </div>
          
          {/* Points and Level */}
          <div className={`flex ${isMobile ? "w-full justify-between mt-1" : "flex-col items-end"}`}>
            <div className={`font-bold text-xl ${animatePoints ? "animate-scale-in" : ""}`}>
              {formatPoints(currentUserRank.points)}
              <span className="text-sm ml-1 text-muted-foreground">pts</span>
            </div>
            <div className="text-xs text-muted-foreground">
              Level {level}
            </div>
          </div>
        </div>
        
        {/* Progress Bar */}
        <div className="mt-3 space-y-1">
          <div className="flex justify-between items-center text-xs">
            <span className="text-muted-foreground">Progress to Level {level + 1}</span>
            <span className="text-muted-foreground">{progress}%</span>
          </div>
          <Progress value={progress} className="h-1.5" />
          <div className="flex justify-end text-xs text-muted-foreground">
            <span>{pointsToNextLevel} points needed</span>
          </div>
        </div>
        
        {/* Achievements row */}
        {currentUserRank.achievements && currentUserRank.achievements.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-4">
            {currentUserRank.achievements.slice(0, isMobile ? 2 : 4).map((achievement, index) => (
              <Badge key={index} variant="outline" className="bg-elec-dark/50 flex items-center gap-1">
                <Award className="h-3 w-3 text-elec-yellow" />
                {achievement.name}
              </Badge>
            ))}
            {currentUserRank.achievements.length > (isMobile ? 2 : 4) && (
              <Badge variant="outline" className="bg-elec-dark/50">
                +{currentUserRank.achievements.length - (isMobile ? 2 : 4)} more
              </Badge>
            )}
          </div>
        )}
        
        {/* Quick Actions */}
        {!isMobile && (
          <div className="flex justify-end mt-2">
            <Button size="sm" variant="ghost" className="text-xs text-muted-foreground">
              View Profile
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default UserRankingCard;
