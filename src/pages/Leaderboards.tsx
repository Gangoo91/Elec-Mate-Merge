import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Loader2, Trophy, Users, Star, Award, Gift, ChevronDown } from "lucide-react";
import { useLeaderboardData } from "@/hooks/leaderboards/useLeaderboardData";
import { useLeaderboardFilters } from "@/hooks/leaderboards/filters";
import { useIsMobile } from "@/hooks/use-mobile";
import { CommunityStatsCards } from "@/components/leaderboards/CommunityStatsCards";
import { UserRankingCard } from "@/components/leaderboards/UserRankingCard";
import { LeaderboardFilters } from "@/components/leaderboards/LeaderboardFilters";
import { LeaderboardTabContent } from "@/components/leaderboards/LeaderboardTabContent";
import { AchievementsSection } from "@/components/leaderboards/AchievementsSection";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";

const Leaderboards = () => {
  const { userRankings, communityStats, currentUserRank, isLoading, error } = useLeaderboardData();
  const isMobile = useIsMobile();
  const [activeTab, setActiveTab] = useState("rankings");
  
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
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl md:text-3xl font-bold tracking-tight">Leaderboards</h1>
        
        <Select value={activeTab} onValueChange={setActiveTab}>
          <SelectTrigger className="w-[180px] bg-elec-dark">
            <SelectValue placeholder="Select Section" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="rankings" className="flex items-center">
              <Trophy className="h-4 w-4 mr-2" />
              <span>Rankings</span>
            </SelectItem>
            <SelectItem value="achievements" className="flex items-center">
              <Award className="h-4 w-4 mr-2" />
              <span>Achievements</span>
            </SelectItem>
            <SelectItem value="community" className="flex items-center">
              <Users className="h-4 w-4 mr-2" />
              <span>Community</span>
            </SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-6">
        {activeTab === "rankings" && (
          <>
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

            <div className="bg-elec-dark/60 p-4 rounded-lg border border-elec-yellow/20 mb-6">
              <div className="flex justify-between items-center">
                <div>
                  <h2 className="text-lg font-semibold flex items-center">
                    <Trophy className="h-5 w-5 text-elec-yellow mr-2" />
                    Monthly Rewards
                  </h2>
                  <p className="text-sm text-muted-foreground">The top 3 users each month receive £50 vouchers</p>
                </div>
                <Badge variant="gold" className="flex items-center">
                  <Gift className="h-4 w-4 mr-1" />
                  £50 Voucher
                </Badge>
              </div>
            </div>

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
          </>
        )}

        {activeTab === "achievements" && (
          <AchievementsSection currentUserRank={currentUserRank} isMobile={isMobile} />
        )}

        {activeTab === "community" && (
          <>
            {/* Community Stats */}
            <CommunityStatsCards communityStats={communityStats} isMobile={isMobile} />
            
            {/* Community Challenges */}
            <Card className="border-elec-yellow/20 bg-elec-dark/40">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="h-5 w-5 text-elec-yellow" />
                  Community Challenges
                </CardTitle>
                <CardDescription>Work together with the community to unlock rewards</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <CommunityChallenge 
                    title="200,000 Practice Questions"
                    description="The community needs to collectively complete 200,000 practice questions"
                    progress={187650}
                    target={200000}
                    reward="Double XP Weekend + 500 pts each"
                    endsIn={4}
                  />
                  
                  <CommunityChallenge 
                    title="New Member Support"
                    description="Help 100 new members complete their first module"
                    progress={68}
                    target={100}
                    reward="Exclusive Badge + 750 pts each"
                    endsIn={14}
                  />

                  <CommunityChallenge 
                    title="Safety First Initiative"
                    description="Complete 5,000 safety assessments as a community"
                    progress={3214}
                    target={5000}
                    reward="Premium Content Unlock + 800 pts"
                    endsIn={21}
                  />
                  
                  <CommunityChallenge 
                    title="Knowledge Sharing"
                    description="Post 1,000 helpful responses in community forums"
                    progress={682}
                    target={1000}
                    reward="Special Recognition + 650 pts"
                    endsIn={10}
                  />
                </div>
                
                <div className="mt-6 flex justify-center">
                  <Button variant="outline" className="border-elec-yellow/20">
                    View All Community Challenges
                  </Button>
                </div>
              </CardContent>
            </Card>
          </>
        )}
      </div>
    </div>
  );
};

// Achievement Card Component
const AchievementCard = ({ 
  title, 
  description, 
  points, 
  progress, 
  target 
}: { 
  title: string; 
  description: string; 
  points: number; 
  progress: number; 
  target: number; 
}) => {
  const progressPercentage = Math.min(Math.round((progress / target) * 100), 100);
  
  return (
    <div className="bg-elec-dark/70 border border-elec-yellow/20 rounded-lg p-4 hover:border-elec-yellow/40 transition-all">
      <div className="flex justify-between items-start mb-2">
        <h3 className="font-semibold text-sm">{title}</h3>
        <Badge variant="outline" className="bg-elec-yellow/10 text-elec-yellow text-xs">+{points} pts</Badge>
      </div>
      <p className="text-xs text-muted-foreground mb-3">{description}</p>
      <div className="space-y-1">
        <div className="w-full bg-elec-dark h-1.5 rounded-full overflow-hidden">
          <div 
            className="bg-elec-yellow h-full rounded-full"
            style={{ width: `${progressPercentage}%` }}
          />
        </div>
        <div className="flex justify-between text-xs text-muted-foreground">
          <span>{progress} / {target}</span>
          <span>{progressPercentage}%</span>
        </div>
      </div>
    </div>
  );
};

// Community Challenge Component
const CommunityChallenge = ({ 
  title, 
  description, 
  progress, 
  target,
  reward,
  endsIn
}: { 
  title: string; 
  description: string; 
  progress: number; 
  target: number;
  reward: string;
  endsIn: number;
}) => {
  const progressPercentage = Math.min(Math.round((progress / target) * 100), 100);
  
  return (
    <div className="bg-elec-dark/70 border border-elec-yellow/20 rounded-lg p-4">
      <div className="mb-2">
        <h3 className="font-semibold text-sm mb-1">{title}</h3>
        <p className="text-xs text-muted-foreground">{description}</p>
      </div>
      <div className="space-y-1 mb-3">
        <div className="w-full bg-elec-dark h-2 rounded-full overflow-hidden">
          <div 
            className="bg-gradient-to-r from-elec-yellow/70 to-elec-yellow h-full rounded-full"
            style={{ width: `${progressPercentage}%` }}
          />
        </div>
        <div className="flex justify-between text-xs text-muted-foreground">
          <span>{progress.toLocaleString()} / {target.toLocaleString()}</span>
          <span>{progressPercentage}%</span>
        </div>
      </div>
      <div className="flex justify-between items-center text-xs">
        <div>
          <span className="text-muted-foreground">Reward: </span>
          <span className="text-elec-yellow">{reward}</span>
        </div>
        <div className="text-muted-foreground">
          Ends in {endsIn} days
        </div>
      </div>
    </div>
  );
};

export default Leaderboards;
