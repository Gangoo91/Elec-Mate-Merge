
import { useMemo } from "react";
import { UserActivity } from "../types";

export function useUniqueValues(users: UserActivity[]) {
  // Get unique levels and badges for filter options
  const uniqueLevels = useMemo(() => 
    Array.from(new Set(users.map(user => user.level))),
    [users]
  );
  
  const uniqueBadges = useMemo(() => 
    Array.from(new Set(users.map(user => user.badge))),
    [users]
  );

  return { uniqueLevels, uniqueBadges };
}
