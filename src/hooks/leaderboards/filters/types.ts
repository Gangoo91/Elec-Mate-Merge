
import { UserActivity } from "../types";

export type TimeframeOption = 'weekly' | 'monthly' | 'alltime';

export interface LeaderboardFilters {
  timeframe: TimeframeOption;
  setTimeframe: (value: TimeframeOption) => void;
  levelFilter: string;
  setLevelFilter: (value: string) => void;
  badgeFilter: string;
  setBadgeFilter: (value: string) => void;
  viewMode: 'card' | 'table';
  setViewMode: (value: 'card' | 'table') => void;
  uniqueLevels: string[];
  uniqueBadges: string[];
  filteredUsers: UserActivity[];
}
