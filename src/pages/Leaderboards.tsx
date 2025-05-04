
import { useState } from "react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Loader2 } from "lucide-react";
import { useLeaderboardData } from "@/hooks/leaderboards/useLeaderboardData";
import { CommunityStats } from "@/components/leaderboards/CommunityStats";
import { UserRankCard } from "@/components/leaderboards/UserRankCard";
import { LeaderboardTabs } from "@/components/leaderboards/LeaderboardTabs";
import { AchievementGrid } from "@/components/leaderboards/AchievementGrid";

const Leaderboards = () => {
  const { userRankings, communityStats, currentUserRank, isLoading, error } = useLeaderboardData();
  const [timeframe, setTimeframe] = useState<'weekly' | 'monthly' | 'alltime'>('weekly');

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="h-8 w-8 text-elec-yellow animate-spin" />
        <span className="ml-2 text-muted-foreground">Loading leaderboard data...</span>
      </div>
    );
  }

  if (error) {
    return (
      <Alert variant="destructive" className="my-8">
        <AlertTitle>Error loading leaderboard data</AlertTitle>
        <AlertDescription>{error}</AlertDescription>
      </Alert>
    );
  }

  return (
    <div className="space-y-8 animate-fade-in">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Leaderboards</h1>
        <p className="text-muted-foreground">
          See how you rank against other electrical professionals in the community.
        </p>
      </div>

      {/* Community Stats */}
      <CommunityStats communityStats={communityStats} />

      {/* Your Ranking Card */}
      <UserRankCard 
        currentUserRank={currentUserRank}
        userRankings={userRankings}
      />

      {/* Main Leaderboard */}
      <LeaderboardTabs 
        userRankings={userRankings}
        timeframe={timeframe}
        onTimeframeChange={setTimeframe}
      />

      {/* Achievements */}
      <AchievementGrid />
    </div>
  );
};

export default Leaderboards;
