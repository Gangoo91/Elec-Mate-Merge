
import { useState } from "react";
import { UserActivity } from "../types";
import { TimeframeOption, LeaderboardFilters } from "./types";
import { useFiltering } from "./useFiltering";
import { useUniqueValues } from "./useUniqueValues";

export function useLeaderboardFilters(users: UserActivity[]): LeaderboardFilters {
  const [timeframe, setTimeframe] = useState<TimeframeOption>('weekly');
  const [levelFilter, setLevelFilter] = useState<string>("all");
  const [badgeFilter, setBadgeFilter] = useState<string>("all");
  const [viewMode, setViewMode] = useState<'card' | 'table'>('card');

  // Get unique values using the extracted hook
  const { uniqueLevels, uniqueBadges } = useUniqueValues(users);
  
  // Filter users using the extracted hook
  const filteredUsers = useFiltering(users, levelFilter, badgeFilter);

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
