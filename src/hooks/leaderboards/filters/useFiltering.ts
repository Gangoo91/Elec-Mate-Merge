
import { useMemo } from "react";
import { UserActivity } from "../types";

export function useFiltering(users: UserActivity[], levelFilter: string, badgeFilter: string) {
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

  return filteredUsers;
}
