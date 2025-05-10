
export type TimeframeOption = 'weekly' | 'monthly' | 'alltime';

export interface FiltersState {
  timeframe: TimeframeOption;
  levelFilter: string;
  badgeFilter: string;
  viewMode: 'card' | 'table';
}

export type DifficultyLevel = 'easy' | 'medium' | 'hard' | 'expert';

export interface LeaderboardFiltersContext {
  timeframe: TimeframeOption;
  setTimeframe: (timeframe: TimeframeOption) => void;
  levelFilter: string;
  setLevelFilter: (level: string) => void;
  badgeFilter: string;
  setBadgeFilter: (badge: string) => void;
  viewMode: 'card' | 'table';
  setViewMode: (viewMode: 'card' | 'table') => void;
}
