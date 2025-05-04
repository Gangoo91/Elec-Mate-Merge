
import { useState } from "react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Loader2, Trophy, Award, MessageSquare, Shield, HeartPulse, Users } from "lucide-react";
import { useLeaderboardData } from "@/hooks/leaderboards/useLeaderboardData";
import { CommunityStats } from "@/components/leaderboards/CommunityStats";
import { UserRankCard } from "@/components/leaderboards/UserRankCard";
import { LeaderboardTabs } from "@/components/leaderboards/LeaderboardTabs";
import { AchievementGrid } from "@/components/leaderboards/AchievementGrid";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import type { LeaderboardCategory } from "@/hooks/leaderboards/types";

const PRIZE_AMOUNT = "£50";

const categoryConfig = {
  learning: {
    title: "Learning Leaders",
    description: "Top performers in course completion and quiz scores",
    icon: <Trophy className="h-5 w-5 text-yellow-500" />
  },
  community: {
    title: "Community Chat Champions",
    description: "Most helpful and active members in our community discussions",
    icon: <MessageSquare className="h-5 w-5 text-blue-500" />
  }, 
  safety: {
    title: "Safety Share Stars",
    description: "Leading contributors of valuable safety information and tips",
    icon: <Shield className="h-5 w-5 text-green-500" />
  },
  mentor: {
    title: "Mentor Connect Heroes",
    description: "Most active mentors helping others grow in their careers",
    icon: <Users className="h-5 w-5 text-purple-500" />
  },
  mental: {
    title: "Wellbeing Advocates",
    description: "Champions of mental health awareness and support",
    icon: <HeartPulse className="h-5 w-5 text-red-500" />
  }
};

const Leaderboards = () => {
  const { userRankings, communityStats, currentUserRank, isLoading, error } = useLeaderboardData();
  const [timeframe, setTimeframe] = useState<'weekly' | 'monthly' | 'alltime'>('monthly');
  const [selectedCategory, setSelectedCategory] = useState<LeaderboardCategory>('learning');

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
          Monthly winners in each category receive a {PRIZE_AMOUNT} voucher.
        </p>
      </div>
      
      {/* Monthly Prize Banner */}
      <Card className="bg-gradient-to-r from-amber-900/30 to-amber-700/30 border-amber-500/50">
        <CardContent className="pt-6">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="flex items-center mb-4 md:mb-0">
              <Trophy className="h-10 w-10 text-amber-500 mr-4" />
              <div>
                <h3 className="text-xl font-bold">Monthly Rewards</h3>
                <p className="text-sm text-muted-foreground">
                  Win a {PRIZE_AMOUNT} voucher by topping any category leaderboard
                </p>
              </div>
            </div>
            <div className="bg-elec-dark/60 p-3 rounded-lg">
              <span className="text-sm text-muted-foreground">Prizes awarded: </span>
              <span className="font-bold">5x {PRIZE_AMOUNT} vouchers each month</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Community Stats */}
      <CommunityStats communityStats={communityStats} />
      
      {/* Category Select Tabs */}
      <Tabs 
        defaultValue="learning" 
        value={selectedCategory}
        onValueChange={(value) => setSelectedCategory(value as LeaderboardCategory)}
      >
        <TabsList className="grid grid-cols-5 h-auto p-1">
          {(Object.keys(categoryConfig) as LeaderboardCategory[]).map((category) => (
            <TabsTrigger 
              key={category} 
              value={category}
              className="flex items-center gap-2 py-2"
            >
              {categoryConfig[category].icon}
              <span className="hidden sm:inline">{categoryConfig[category].title}</span>
            </TabsTrigger>
          ))}
        </TabsList>

        {(Object.keys(categoryConfig) as LeaderboardCategory[]).map((category) => (
          <TabsContent key={category} value={category} className="space-y-6 mt-6">
            <div>
              <h2 className="text-2xl font-bold">{categoryConfig[category].title}</h2>
              <p className="text-muted-foreground">{categoryConfig[category].description}</p>
            </div>

            {/* Your Ranking Card */}
            <UserRankCard 
              currentUserRank={currentUserRank[category]}
              userRankings={userRankings[category] || []}
              categoryName={categoryConfig[category].title}
              prizeAmount={PRIZE_AMOUNT}
            />

            {/* Main Leaderboard */}
            <LeaderboardTabs 
              userRankings={userRankings[category] || []}
              timeframe={timeframe}
              onTimeframeChange={setTimeframe}
              categoryIcon={categoryConfig[category].icon}
            />
          </TabsContent>
        ))}
      </Tabs>

      {/* Achievements */}
      <AchievementGrid />
    </div>
  );
};

export default Leaderboards;
