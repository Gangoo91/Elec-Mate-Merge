
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
