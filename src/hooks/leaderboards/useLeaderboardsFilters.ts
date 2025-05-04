
import { useState, useMemo } from "react";
import { UserActivity } from "./useLeaderboardData";

export type TimeframeOption = 'weekly' | 'monthly' | 'alltime';

export function useLeaderboardsFilters(users: UserActivity[]) {
  const [timeframe, setTimeframe] = useState<TimeframeOption>('weekly');
  const [levelFilter, setLevelFilter] = useState<string>("all");
  const [badgeFilter, setBadgeFilter] = useState<string>("all");
  const [viewMode, setViewMode] = useState<'card' | 'table'>('card');

  // Get unique levels and badges for filter options
  const uniqueLevels = useMemo(() => 
    Array.from(new Set(users.map(user => user.level))),
    [users]
  );
  
  const uniqueBadges = useMemo(() => 
    Array.from(new Set(users.map(user => user.badge))),
    [users]
  );

  // Filter users based on selected filters
  const filteredUsers = useMemo(() => {
    return users.filter(user => {
      if (levelFilter !== "all" && user.level !== levelFilter) return false;
      if (badgeFilter !== "all" && user.badge !== badgeFilter) return false;
      
      // In a real implementation, we would filter by timeframe here as well
      // This would require the backend to track when points were earned
      
      return true;
    });
  }, [users, levelFilter, badgeFilter]);

  return {
    timeframe,
    setTimeframe,
    levelFilter,
    setLevelFilter,
    badgeFilter,
    setBadgeFilter,
    viewMode,
    setViewMode,
    uniqueLevels,
    uniqueBadges,
    filteredUsers
  };
}

// Helper functions that can be used by components
export const getLevelBadgeColor = (level: string) => {
  switch(level) {
    case 'Apprentice': return 'bg-blue-500/20 text-blue-500';
    case 'Journeyman': return 'bg-green-500/20 text-green-500';
    case 'Expert': return 'bg-purple-500/20 text-purple-500';
    case 'Master': return 'bg-yellow-500/20 text-yellow-500';
    default: return 'bg-gray-500/20 text-gray-500';
  }
};

export const getBadgeColor = (badge: string) => {
  switch(badge) {
    case 'Beginner': return 'bg-blue-500/20 text-blue-500';
    case 'Intermediate': return 'bg-green-500/20 text-green-500';
    case 'Advanced': return 'bg-purple-500/20 text-purple-500';
    case 'Expert': return 'bg-yellow-500/20 text-yellow-500';
    default: return 'bg-gray-500/20 text-gray-500';
  }
};
