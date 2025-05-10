
// Functions for getting display names and formatting user data for leaderboards

export const getUserDisplayName = (user: any): string => {
  return user.profiles?.full_name || user.profiles?.username || 'Anonymous User';
};

export const getUserInitials = (user: any): string => {
  if (user.profiles?.full_name) {
    return user.profiles.full_name.split(' ')
      .map((name: string) => name.charAt(0))
      .join('')
      .slice(0, 2)
      .toUpperCase();
  } else if (user.profiles?.username) {
    return user.profiles.username.substring(0, 2).toUpperCase();
  }
  return 'US';
};

export const formatPoints = (points: number): string => {
  return points >= 1000 ? `${(points / 1000).toFixed(1)}K` : points.toString();
};

export const getTrendIndicator = (user: any): { trend: 'up' | 'down' | 'stable', percentage: number } => {
  const previousPosition = user.previous_position || 0;
  const currentPosition = user.position || 0;
  
  if (previousPosition === 0 || currentPosition === 0) {
    return { trend: 'stable', percentage: 0 };
  }
  
  if (previousPosition > currentPosition) {
    // Improved rank (moved up)
    const improvement = previousPosition - currentPosition;
    const percentage = Math.min(Math.round((improvement / previousPosition) * 100), 100);
    return { trend: 'up', percentage };
  } else if (previousPosition < currentPosition) {
    // Declined rank (moved down)
    const decline = currentPosition - previousPosition;
    const percentage = Math.min(Math.round((decline / previousPosition) * 100), 100);
    return { trend: 'down', percentage };
  }
  
  return { trend: 'stable', percentage: 0 };
};

export const getCountryFlag = (countryCode: string): string => {
  // Simple function to convert country code to emoji flag
  if (!countryCode || countryCode.length !== 2) return '🌍';
  
  const codePoints = countryCode
    .toUpperCase()
    .split('')
    .map(char => 127397 + char.charCodeAt(0));
  
  return String.fromCodePoint(...codePoints);
};

export const getProgressLevel = (points: number): { level: number, progress: number } => {
  // Calculate user progress level based on points
  const basePoints = 1000;
  const level = Math.floor(Math.sqrt(points / basePoints)) + 1;
  const nextLevelPoints = Math.pow(level, 2) * basePoints;
  const currentLevelPoints = Math.pow(level - 1, 2) * basePoints;
  const pointsForNextLevel = nextLevelPoints - currentLevelPoints;
  const pointsInCurrentLevel = points - currentLevelPoints;
  const progress = Math.floor((pointsInCurrentLevel / pointsForNextLevel) * 100);
  
  return { level, progress };
};
