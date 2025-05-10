
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Trophy, Medal, Clock, TrendingUp, TrendingDown, Star, Award, Flag } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { UserActivity } from "@/hooks/leaderboards/types";
import { format } from "date-fns";
import { getLevelBadgeColor, getBadgeColor } from "@/hooks/leaderboards/filters";
import { useIsMobile } from "@/hooks/use-mobile";
import { 
  getUserDisplayName, 
  getUserInitials, 
  formatPoints, 
  getTrendIndicator,
  getCountryFlag, 
  getProgressLevel 
} from "./leaderboardUtils";
import { useAuth } from '@/contexts/AuthContext';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { useState } from "react";

interface LeaderboardRankCardProps {
  user: UserActivity;
  position: number;
  maxPoints: number;
}

export const LeaderboardRankCard = ({ user, position, maxPoints }: LeaderboardRankCardProps) => {
  const isMobile = useIsMobile();
  const { user: currentUser, subscriptionTier, isSubscribed } = useAuth();
  const [showDetails, setShowDetails] = useState(false);
  
  // Check if this is the current user
  const isCurrentUser = currentUser && user.user_id === currentUser.id;
  
  // Get trend indicator
  const { trend, percentage } = getTrendIndicator(user);

  // Get country flag if available
  const countryFlag = user.profiles?.country_code ? getCountryFlag(user.profiles.country_code) : null;
  
  // Get level progress
  const { level, progress } = getProgressLevel(user.points);
  
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

  // Function to render user achievements
  const renderAchievements = () => {
    if (!user.achievements || user.achievements.length === 0) return null;
    
    return (
      <div className="mt-2 flex flex-wrap gap-1">
        {user.achievements.slice(0, 3).map((achievement, index) => (
          <TooltipProvider key={index}>
            <Tooltip>
              <TooltipTrigger asChild>
                <Badge variant="outline" className="bg-elec-dark/50 border-elec-yellow/30 text-xs px-2 py-0.5">
                  <Award className="h-3 w-3 mr-1 text-elec-yellow" />
                  {achievement.name}
                </Badge>
              </TooltipTrigger>
              <TooltipContent>
                <p>{achievement.description}</p>
                <p className="text-xs text-muted-foreground">Earned {format(new Date(achievement.awarded_at), 'MMM dd, yyyy')}</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        ))}
        {user.achievements.length > 3 && (
          <Badge variant="outline" className="bg-elec-dark/50 border-elec-yellow/30 text-xs">
            +{user.achievements.length - 3} more
          </Badge>
        )}
      </div>
    );
  };

  return (
    <div 
      className={`
        flex flex-col sm:flex-row items-start sm:items-center gap-3 p-3 sm:p-4 rounded-lg relative
        ${position <= 3 ? "bg-elec-dark/70" : isCurrentUser ? "bg-elec-yellow/10" : "bg-elec-dark/40"}
        transition-all hover:bg-elec-dark/80 cursor-pointer
      `}
      onClick={() => setShowDetails(!showDetails)}
    >
      {/* Rank */}
      {isMobile ? (
        <div className="absolute top-3 right-3">
          {position === 1 ? (
            <Trophy className="h-5 w-5 text-yellow-500" />
          ) : position === 2 ? (
            <Medal className="h-5 w-5 text-gray-300" />
          ) : position === 3 ? (
            <Medal className="h-5 w-5 text-amber-700" />
          ) : (
            <div className="bg-elec-gray w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold">
              {position}
            </div>
          )}
        </div>
      ) : (
        getRankBadge(position)
      )}

      <div className="flex items-center gap-3 w-full sm:w-auto">
        {/* User Avatar */}
        <Avatar className="h-10 w-10 flex-shrink-0">
          {user.profiles?.avatar_url ? (
            <AvatarImage src={user.profiles.avatar_url} alt={getUserDisplayName(user)} />
          ) : (
            <AvatarFallback 
              className={
                position === 1 ? "bg-yellow-500/20 text-yellow-500" : 
                position === 2 ? "bg-gray-300/20 text-gray-300" : 
                position === 3 ? "bg-amber-700/20 text-amber-700" : 
                "bg-elec-yellow/10 text-elec-yellow"
              }
            >
              {getUserInitials(user)}
            </AvatarFallback>
          )}
        </Avatar>

        {/* User Info */}
        <div className="flex-1 min-w-0 pr-8 sm:pr-0">
          <div className="flex items-center gap-1">
            <h4 className="font-medium text-sm sm:text-base truncate">
              {getUserDisplayName(user)}
              {isCurrentUser && <span className="ml-1.5 text-xs text-elec-yellow">(You)</span>}
            </h4>
            {countryFlag && <span className="text-sm" title={user.profiles?.country || ""}>{countryFlag}</span>}
            
            {/* Trend Indicator */}
            {trend !== 'stable' && (
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <div className={`flex items-center ml-1 ${trend === 'up' ? 'text-green-500' : 'text-red-500'}`}>
                      {trend === 'up' ? <TrendingUp className="h-3 w-3" /> : <TrendingDown className="h-3 w-3" />}
                      <span className="text-xs ml-0.5">{percentage}%</span>
                    </div>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>{trend === 'up' ? 'Improved' : 'Dropped'} ranking by {percentage}%</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            )}
          </div>
          
          <div className="flex flex-wrap items-center gap-1 mt-1">
            {isCurrentUser && isSubscribed ? (
              <Badge variant="gold" className="text-xs">
                {subscriptionTier || 'Standard'}
              </Badge>
            ) : (
              <Badge variant="outline" className={`text-xs ${getLevelBadgeColor(user.level)}`}>
                {user.level}
              </Badge>
            )}
            <Badge variant="outline" className={`text-xs ${getBadgeColor(user.badge)}`}>
              {user.badge}
            </Badge>
            {user.profiles?.is_verified && (
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <div className="flex items-center">
                      <Star className="h-3 w-3 text-elec-yellow" />
                    </div>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Verified Account</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            )}
          </div>
          
          {/* Achievements (if any) */}
          {renderAchievements()}
        </div>
      </div>

      {/* Mobile layout for streak, last active, and points */}
      {isMobile ? (
        <div className="w-full mt-2">
          <div className="flex items-center justify-between text-xs text-muted-foreground">
            <span className="flex items-center">
              <Clock className="h-3 w-3 mr-1" />
              {user.streak} day streak
            </span>
            <span className="font-bold text-base text-foreground">{formatPoints(user.points)}</span>
          </div>
          <div className="text-xs text-muted-foreground mt-1">
            Last active: {
              user.last_active_date ? format(new Date(user.last_active_date), 'MMM dd, yyyy') : 'Unknown'
            }
          </div>
          
          {/* Progress bar */}
          <div className="mt-2 w-full">
            <Progress value={(user.points / maxPoints) * 100} className="h-1.5" />
          </div>
          
          {/* Level progress */}
          <div className="flex justify-between items-center mt-1">
            <span className="text-xs text-muted-foreground">Level {level}</span>
            <span className="text-xs text-muted-foreground">{progress}%</span>
          </div>
        </div>
      ) : (
        <>
          <div className="flex-1 hidden sm:block">
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <span className="flex items-center">
                <Clock className="h-3 w-3 mr-1" />
                {user.streak} day streak
              </span>
              <span className="text-muted-foreground">•</span>
              <span>Last active: {
                user.last_active_date ? format(new Date(user.last_active_date), 'MMM dd, yyyy') : 'Unknown'
              }</span>
            </div>
            
            {/* Progress bar */}
            <div className="mt-2 w-full">
              <Progress value={(user.points / maxPoints) * 100} className="h-1.5" />
            </div>
            
            {/* Level progress */}
            <div className="flex justify-between items-center mt-1">
              <span className="text-xs text-muted-foreground">Level {level}</span>
              <span className="text-xs text-muted-foreground">{progress}%</span>
            </div>
          </div>

          {/* Points */}
          <div className="text-right hidden sm:block">
            <div className="font-bold">{formatPoints(user.points)}</div>
            <div className="text-xs text-muted-foreground">points</div>
          </div>
        </>
      )}

      {/* Expanded details (conditionally rendered) */}
      {showDetails && (
        <div className="w-full mt-3 pt-3 border-t border-elec-yellow/20 animate-fade-in">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {user.profiles?.bio && (
              <div>
                <h5 className="text-xs font-medium text-muted-foreground mb-1">Bio</h5>
                <p className="text-sm">{user.profiles.bio}</p>
              </div>
            )}
            
            {user.top_skills && user.top_skills.length > 0 && (
              <div>
                <h5 className="text-xs font-medium text-muted-foreground mb-1">Top Skills</h5>
                <div className="flex flex-wrap gap-1">
                  {user.top_skills.map((skill, index) => (
                    <Badge key={index} variant="outline" className="bg-elec-dark/50 text-xs">
                      {skill}
                    </Badge>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default LeaderboardRankCard;
