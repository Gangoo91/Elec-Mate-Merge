
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Trophy, Medal, Clock } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { UserActivity } from "@/hooks/leaderboards/useLeaderboardData";
import { format } from "date-fns";
import { getLevelBadgeColor, getBadgeColor } from "@/hooks/leaderboards/useLeaderboardsFilters";

interface LeaderboardRankCardProps {
  user: UserActivity;
  position: number;
  maxPoints: number;
}

export const LeaderboardRankCard = ({ user, position, maxPoints }: LeaderboardRankCardProps) => {
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

  return (
    <div 
      className={`
        flex items-center gap-4 p-4 rounded-lg relative
        ${position <= 3 ? "bg-elec-dark/70" : "bg-elec-dark/40"}
        transition-all hover:bg-elec-dark/80
      `}
    >
      {/* Rank */}
      {getRankBadge(position)}

      {/* User Avatar */}
      <Avatar className="h-10 w-10">
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
      <div className="flex-1">
        <div className="flex flex-wrap items-center gap-2">
          <h4 className="font-medium">{getUserDisplayName(user)}</h4>
          <Badge variant="outline" className={`text-xs ${getLevelBadgeColor(user.level)}`}>
            {user.level}
          </Badge>
          <Badge variant="outline" className={`text-xs ${getBadgeColor(user.badge)}`}>
            {user.badge}
          </Badge>
        </div>
        <div className="flex items-center gap-2 text-xs text-muted-foreground mt-1">
          <span className="flex items-center">
            <Clock className="h-3 w-3 mr-1" />
            {user.streak} day streak
          </span>
          <span className="text-muted-foreground">•</span>
          <span className="text-xs">Last active: {
            user.last_active_date ? format(new Date(user.last_active_date), 'MMM dd, yyyy') : 'Unknown'
          }</span>
        </div>
        
        {/* Progress bar */}
        <div className="mt-2 w-full">
          <Progress value={(user.points / maxPoints) * 100} className="h-1.5" />
        </div>
      </div>

      {/* Points */}
      <div className="text-right">
        <div className="font-bold">{user.points.toLocaleString()}</div>
        <div className="text-xs text-muted-foreground">points</div>
      </div>
    </div>
  );
};

export default LeaderboardRankCard;
