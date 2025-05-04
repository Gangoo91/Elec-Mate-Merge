
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { LeaderboardTabContent } from "./LeaderboardTabContent";
import { UserActivity } from "@/hooks/leaderboards/useLeaderboardData";

interface LeaderboardTabsProps {
  userRankings: UserActivity[];
  timeframe: 'weekly' | 'monthly' | 'alltime';
  onTimeframeChange: (value: 'weekly' | 'monthly' | 'alltime') => void;
}

export const LeaderboardTabs = ({
  userRankings,
  timeframe,
  onTimeframeChange
}: LeaderboardTabsProps) => {
  return (
    <Tabs
      defaultValue={timeframe}
      className="space-y-4"
      onValueChange={(value) => onTimeframeChange(value as 'weekly' | 'monthly' | 'alltime')}
    >
      <div className="flex justify-between items-center">
        <TabsList className="bg-elec-gray border border-elec-yellow/20">
          <TabsTrigger value="weekly">This Week</TabsTrigger>
          <TabsTrigger value="monthly">This Month</TabsTrigger>
          <TabsTrigger value="alltime">All Time</TabsTrigger>
        </TabsList>
      </div>

      {["weekly", "monthly", "alltime"].map((period) => (
        <TabsContent key={period} value={period} className="space-y-4">
          <LeaderboardTabContent
            userRankings={userRankings}
            timeframe={period as 'weekly' | 'monthly' | 'alltime'}
          />
        </TabsContent>
      ))}
    </Tabs>
  );
};
