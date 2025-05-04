
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { UserActivity } from "@/hooks/leaderboards/useLeaderboardData";
import { TimeframeOption } from "@/hooks/leaderboards/useLeaderboardsFilters";
import { LeaderboardTabContent } from "./LeaderboardTabContent";

interface LeaderboardTabsProps {
  timeframe: TimeframeOption;
  setTimeframe: (value: TimeframeOption) => void;
  filteredUsers: UserActivity[];
  viewMode: 'card' | 'table';
  maxPoints: number;
  userRankings: UserActivity[];
  isMobile: boolean;
}

export const LeaderboardTabs = ({
  timeframe,
  setTimeframe,
  filteredUsers,
  viewMode,
  maxPoints,
  userRankings,
  isMobile
}: LeaderboardTabsProps) => {
  return (
    <Tabs defaultValue={timeframe} className="space-y-4" onValueChange={(value) => setTimeframe(value as 'weekly' | 'monthly' | 'alltime')}>
      <div className="flex justify-between items-center">
        <TabsList className="bg-elec-gray border border-elec-yellow/20">
          <TabsTrigger value="weekly" className={isMobile ? "text-xs px-2 py-1.5" : ""}>This Week</TabsTrigger>
          <TabsTrigger value="monthly" className={isMobile ? "text-xs px-2 py-1.5" : ""}>This Month</TabsTrigger>
          <TabsTrigger value="alltime" className={isMobile ? "text-xs px-2 py-1.5" : ""}>All Time</TabsTrigger>
        </TabsList>
      </div>

      {["weekly", "monthly", "alltime"].map((period) => (
        <TabsContent key={period} value={period} className="space-y-4 mt-2">
          <LeaderboardTabContent
            period={period}
            filteredUsers={filteredUsers}
            viewMode={viewMode}
            maxPoints={maxPoints}
            userRankings={userRankings}
            isMobile={isMobile}
          />
        </TabsContent>
      ))}
    </Tabs>
  );
};
