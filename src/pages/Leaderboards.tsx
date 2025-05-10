
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Loader2 } from "lucide-react";
import { useLeaderboardData } from "@/hooks/leaderboards/useLeaderboardData";
import { useLeaderboardFilters } from "@/hooks/leaderboards/filters";
import { useIsMobile } from "@/hooks/use-mobile";
import { CommunityStatsCards } from "@/components/leaderboards/CommunityStatsCards";
import { UserRankingCard } from "@/components/leaderboards/UserRankingCard";
import { LeaderboardFilters } from "@/components/leaderboards/LeaderboardFilters";
import { LeaderboardTabContent } from "@/components/leaderboards/LeaderboardTabContent";
import { AchievementsSection } from "@/components/leaderboards/AchievementsSection";

const Leaderboards = () => {
  const { userRankings, communityStats, currentUserRank, isLoading, error } = useLeaderboardData();
  const isMobile = useIsMobile();
  
  // Use our custom hook for filters
  const { 
    timeframe, setTimeframe,
    levelFilter, setLevelFilter,
    badgeFilter, setBadgeFilter,
    viewMode, setViewMode,
    uniqueLevels, uniqueBadges,
    filteredUsers
  } = useLeaderboardFilters(userRankings);

  // Calculate maximum points for progress bar scaling
  const maxPoints = Math.max(...userRankings.map(user => user.points), 100);

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
    <div className="space-y-6 animate-fade-in">
      <LeaderboardFilters
        timeframe={timeframe}
        setTimeframe={setTimeframe}
        levelFilter={levelFilter}
        setLevelFilter={setLevelFilter}
        badgeFilter={badgeFilter}
        setBadgeFilter={setBadgeFilter}
        viewMode={viewMode}
        setViewMode={setViewMode}
        uniqueLevels={uniqueLevels}
        uniqueBadges={uniqueBadges}
        isMobile={isMobile}
      />

      {/* Community Stats */}
      <CommunityStatsCards communityStats={communityStats} isMobile={isMobile} />

      {/* Your Ranking Card */}
      <UserRankingCard 
        currentUserRank={currentUserRank} 
        userRankings={userRankings}
        isMobile={isMobile}
      />

      {/* Main Leaderboard Content */}
      <LeaderboardTabContent 
        period={timeframe} 
        filteredUsers={filteredUsers} 
        viewMode={viewMode} 
        maxPoints={maxPoints}
        userRankings={userRankings}
        isMobile={isMobile}
      />

      {/* Achievements */}
      <AchievementsSection currentUserRank={currentUserRank} isMobile={isMobile} />
    </div>
  );
};

export default Leaderboards;
