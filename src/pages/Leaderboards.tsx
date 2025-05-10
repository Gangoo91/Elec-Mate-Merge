
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Loader2, Trophy, Users, Star, Award } from "lucide-react";
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
      <Tabs defaultValue="rankings" className="w-full">
        <TabsList className="grid grid-cols-3 mb-6">
          <TabsTrigger value="rankings" className="flex items-center gap-2">
            <Trophy className="h-4 w-4" />
            <span>Rankings</span>
          </TabsTrigger>
          <TabsTrigger value="achievements" className="flex items-center gap-2">
            <Award className="h-4 w-4" />
            <span>Achievements</span>
          </TabsTrigger>
          <TabsTrigger value="community" className="flex items-center gap-2">
            <Users className="h-4 w-4" />
            <span>Community</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="rankings" className="space-y-6">
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
        </TabsContent>

        <TabsContent value="achievements" className="space-y-6">
          <AchievementsSection currentUserRank={currentUserRank} isMobile={isMobile} />
          
          {/* Upcoming achievements */}
          <Card className="border-elec-yellow/20 bg-elec-dark/40">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Star className="h-5 w-5 text-elec-yellow" />
                Upcoming Achievements
              </CardTitle>
              <CardDescription>Complete these challenges to earn more points and badges</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <AchievementCard 
                  title="Perfect Streak"
                  description="Complete daily activities for 7 consecutive days"
                  points={500}
                  progress={currentUserRank?.streak || 0}
                  target={7}
                />
                
                <AchievementCard 
                  title="Quiz Master"
                  description="Score 90% or higher in 5 different quizzes"
                  points={750}
                  progress={3}
                  target={5}
                />
                
                <AchievementCard 
                  title="Knowledge Explorer"
                  description="Complete all sections in one course module"
                  points={1000}
                  progress={8}
                  target={10}
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="community" className="space-y-6">
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
                  reward="Double XP Weekend"
                  endsIn={4}
                />
                
                <CommunityChallenge 
                  title="New Member Support"
                  description="Help 100 new members complete their first module"
                  progress={68}
                  target={100}
                  reward="Exclusive Community Badge"
                  endsIn={14}
                />
              </div>
              
              <div className="mt-6 flex justify-center">
                <Button variant="outline" className="border-elec-yellow/20">
                  View All Community Challenges
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
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

