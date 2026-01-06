import { useState, useEffect } from "react";
import { TrendingUp, TrendingDown, Minus, Users, MapPin, Award, Download, BarChart3, Calendar, Zap, Target, Trophy, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { supabase } from "@/integrations/supabase/client";

interface UserStats {
  totalContributions: number;
  areasContributed: number;
  impactScore: number;
  badges: string[];
}

interface MarketStats {
  totalSubmissions: number;
  activeContributors: number;
  regionsWithData: number;
  averagePriceChange: number;
}

const InsightsDashboard = ({ className }: { className?: string }) => {
  const [userStats, setUserStats] = useState<UserStats>({
    totalContributions: 0,
    areasContributed: 0,
    impactScore: 0,
    badges: [],
  });
  const [marketStats, setMarketStats] = useState<MarketStats>({
    totalSubmissions: 0,
    activeContributors: 0,
    regionsWithData: 12,
    averagePriceChange: 2.3,
  });
  const [topJobs, setTopJobs] = useState<{ job: string; searches: number }[]>([]);
  const [hotRegions, setHotRegions] = useState<{ region: string; change: number }[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const { data: { user } } = await supabase.auth.getUser();

        if (user) {
          const { data: userContribs, count } = await supabase
            .from('community_pricing_submissions')
            .select('postcode_district', { count: 'exact' })
            .eq('user_id', user.id);

          if (userContribs) {
            const uniqueAreas = new Set(userContribs.map(c => c.postcode_district)).size;
            setUserStats({
              totalContributions: count || 0,
              areasContributed: uniqueAreas,
              impactScore: (count || 0) * 10 + uniqueAreas * 5,
              badges: getBadges(count || 0),
            });
          }
        }

        const { count: totalCount } = await supabase
          .from('community_pricing_submissions')
          .select('*', { count: 'exact', head: true });

        setMarketStats(prev => ({
          ...prev,
          totalSubmissions: totalCount || 0,
        }));

        setTopJobs([
          { job: "EV Charger Install", searches: 1240 },
          { job: "Fuse Box Upgrade", searches: 980 },
          { job: "Socket Installation", searches: 850 },
          { job: "EICR Inspection", searches: 720 },
          { job: "Rewiring", searches: 540 },
        ]);

        setHotRegions([
          { region: "London (SW)", change: 5.2 },
          { region: "Manchester (M)", change: 3.8 },
          { region: "Birmingham (B)", change: 3.1 },
          { region: "Leeds (LS)", change: -1.2 },
          { region: "Bristol (BS)", change: 2.4 },
        ]);

      } catch (error) {
        console.error("Error fetching insights:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchStats();
  }, []);

  const getBadges = (contributions: number): string[] => {
    const badges = [];
    if (contributions >= 1) badges.push("First Contribution");
    if (contributions >= 5) badges.push("Active Contributor");
    if (contributions >= 10) badges.push("Community Helper");
    if (contributions >= 25) badges.push("Pricing Expert");
    if (contributions >= 50) badges.push("Data Champion");
    return badges;
  };

  const handleExport = () => {
    alert("Export feature coming soon!");
  };

  const TrendIndicator = ({ value }: { value: number }) => {
    const isUp = value > 0;
    const isDown = value < 0;

    return (
      <div className={cn(
        "flex items-center gap-1 text-sm font-bold",
        isUp && "text-emerald-400",
        isDown && "text-rose-400",
        !isUp && !isDown && "text-white/50"
      )}>
        {isUp && <TrendingUp className="h-4 w-4" />}
        {isDown && <TrendingDown className="h-4 w-4" />}
        {!isUp && !isDown && <Minus className="h-4 w-4" />}
        <span>{isUp && "+"}{value.toFixed(1)}%</span>
      </div>
    );
  };

  return (
    <div className={cn("space-y-6", className)}>
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-white">Your Insights</h2>
          <p className="text-sm text-white/70 mt-1">Track your community impact</p>
        </div>
        <Button
          variant="outline"
          size="sm"
          onClick={handleExport}
          className="border-white/20 bg-white/5 text-white hover:bg-white/10 hover:text-white rounded-xl h-10"
        >
          <Download className="h-4 w-4 mr-1.5" />
          Export
        </Button>
      </div>

      {/* Personal Stats - Hero Cards */}
      <div className="grid grid-cols-2 gap-3">
        {/* Contributions Card */}
        <div className="p-5 rounded-2xl bg-gradient-to-br from-blue-600 to-blue-700 border border-blue-500/30 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-20 h-20 bg-white/10 rounded-full -translate-y-8 translate-x-8" />
          <div className="relative">
            <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center mb-3">
              <BarChart3 className="h-5 w-5 text-white" />
            </div>
            <p className="text-4xl font-black text-white">{userStats.totalContributions}</p>
            <p className="text-sm text-white/80 font-medium mt-1">Contributions</p>
          </div>
        </div>

        {/* Impact Score Card */}
        <div className="p-5 rounded-2xl bg-gradient-to-br from-yellow-500 to-amber-600 border border-yellow-400/30 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-20 h-20 bg-white/10 rounded-full -translate-y-8 translate-x-8" />
          <div className="relative">
            <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center mb-3">
              <Zap className="h-5 w-5 text-white" />
            </div>
            <p className="text-4xl font-black text-white">{userStats.impactScore}</p>
            <p className="text-sm text-white/80 font-medium mt-1">Impact Score</p>
          </div>
        </div>

        {/* Areas Card */}
        <div className="p-5 rounded-2xl bg-gradient-to-br from-emerald-600 to-green-700 border border-emerald-500/30 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-20 h-20 bg-white/10 rounded-full -translate-y-8 translate-x-8" />
          <div className="relative">
            <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center mb-3">
              <MapPin className="h-5 w-5 text-white" />
            </div>
            <p className="text-4xl font-black text-white">{userStats.areasContributed}</p>
            <p className="text-sm text-white/80 font-medium mt-1">Areas Covered</p>
          </div>
        </div>

        {/* Badges Card */}
        <div className="p-5 rounded-2xl bg-gradient-to-br from-purple-600 to-violet-700 border border-purple-500/30 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-20 h-20 bg-white/10 rounded-full -translate-y-8 translate-x-8" />
          <div className="relative">
            <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center mb-3">
              <Trophy className="h-5 w-5 text-white" />
            </div>
            <p className="text-4xl font-black text-white">{userStats.badges.length}</p>
            <p className="text-sm text-white/80 font-medium mt-1">Badges Earned</p>
          </div>
        </div>
      </div>

      {/* Badges Display */}
      {userStats.badges.length > 0 && (
        <div className="space-y-3">
          <h3 className="text-sm font-semibold text-white/70 uppercase tracking-wider">Your Badges</h3>
          <div className="flex flex-wrap gap-2">
            {userStats.badges.map((badge) => (
              <span
                key={badge}
                className="inline-flex items-center gap-2 px-4 py-2 text-sm font-semibold bg-gradient-to-r from-yellow-400/20 to-amber-500/20 text-yellow-400 border border-yellow-400/30 rounded-xl"
              >
                <Star className="h-4 w-4" />
                {badge}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Market Intelligence Section */}
      <div className="pt-6 border-t border-white/10">
        <div className="flex items-center gap-2 mb-5">
          <div className="w-10 h-10 rounded-xl bg-yellow-400/20 flex items-center justify-center">
            <Target className="h-5 w-5 text-yellow-400" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-white">Market Intelligence</h3>
            <p className="text-xs text-white/60">Live pricing trends across the UK</p>
          </div>
        </div>

        {/* Market Stats Row */}
        <div className="grid grid-cols-3 gap-3 mb-5">
          <div className="p-4 rounded-2xl bg-white/5 border border-white/10 text-center">
            <p className="text-3xl font-black text-white">{marketStats.totalSubmissions.toLocaleString()}</p>
            <p className="text-xs text-white/60 font-medium mt-1">Total Prices</p>
          </div>
          <div className="p-4 rounded-2xl bg-white/5 border border-white/10 text-center">
            <p className="text-3xl font-black text-white">{marketStats.regionsWithData}</p>
            <p className="text-xs text-white/60 font-medium mt-1">UK Regions</p>
          </div>
          <div className="p-4 rounded-2xl bg-white/5 border border-white/10 text-center">
            <TrendIndicator value={marketStats.averagePriceChange} />
            <p className="text-xs text-white/60 font-medium mt-1">Avg Change</p>
          </div>
        </div>

        {/* Top Jobs & Regions */}
        <div className="grid grid-cols-1 gap-4">
          {/* Top Searched Jobs */}
          <div className="p-5 rounded-2xl bg-white/5 border border-white/10">
            <h4 className="font-bold text-white mb-4 flex items-center gap-2">
              <Calendar className="h-5 w-5 text-yellow-400" />
              Most Searched Jobs
            </h4>
            <div className="space-y-3">
              {topJobs.map((job, index) => (
                <div key={job.job} className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <span className={cn(
                      "w-8 h-8 rounded-xl flex items-center justify-center text-sm font-bold",
                      index === 0 && "bg-yellow-400 text-black",
                      index === 1 && "bg-white/30 text-white",
                      index === 2 && "bg-orange-500 text-white",
                      index > 2 && "bg-white/10 text-white/70"
                    )}>
                      {index + 1}
                    </span>
                    <span className="text-white font-medium">{job.job}</span>
                  </div>
                  <span className="text-sm text-white/50 font-semibold">{job.searches.toLocaleString()}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Regional Changes */}
          <div className="p-5 rounded-2xl bg-white/5 border border-white/10">
            <h4 className="font-bold text-white mb-4 flex items-center gap-2">
              <MapPin className="h-5 w-5 text-yellow-400" />
              Regional Price Trends
            </h4>
            <div className="space-y-3">
              {hotRegions.map((region) => (
                <div key={region.region} className="flex items-center justify-between">
                  <span className="text-white font-medium">{region.region}</span>
                  <TrendIndicator value={region.change} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Call to Action for New Users */}
      {userStats.totalContributions === 0 && (
        <div className="p-6 rounded-2xl bg-gradient-to-r from-yellow-400/20 to-amber-500/20 border-2 border-yellow-400/30">
          <div className="flex items-start gap-4">
            <div className="w-14 h-14 rounded-2xl bg-yellow-400/20 flex items-center justify-center flex-shrink-0">
              <Users className="h-7 w-7 text-yellow-400" />
            </div>
            <div>
              <h4 className="font-bold text-white text-xl">Start Contributing!</h4>
              <p className="text-white/70 mt-2 leading-relaxed">
                Submit your first job price to help fellow electricians and start earning badges. Your contributions make the community stronger.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default InsightsDashboard;
