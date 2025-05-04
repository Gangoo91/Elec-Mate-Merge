
import { UserActivity } from "@/hooks/leaderboards/useLeaderboardData";

// Helper function to get user initials from profile data
export const getUserInitials = (user: UserActivity): string => {
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
export const getUserDisplayName = (user: UserActivity): string => {
  return user.profiles?.full_name || user.profiles?.username || 'Anonymous User';
};
