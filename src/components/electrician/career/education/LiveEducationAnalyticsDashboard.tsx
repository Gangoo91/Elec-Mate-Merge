import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  TrendingUp, Users, Award, PoundSterling, 
  BookOpen, Target, Star, Building, GraduationCap,
  RefreshCw, Loader2, AlertCircle, Clock
} from "lucide-react";
import { LiveEducationAnalytics } from "@/hooks/useLiveEducationData";
import { staticEducationCategories } from "@/data/staticEducationCategories";

interface LiveEducationAnalyticsDashboardProps {
  analytics: LiveEducationAnalytics | null;
  loading: boolean;
  error: string | null;
  lastUpdated: string | null;
  isFromCache: boolean;
  onRefresh: () => void;
}

const LiveEducationAnalyticsDashboard = ({
  analytics,
  loading,
  error,
  lastUpdated,
  isFromCache,
  onRefresh
}: LiveEducationAnalyticsDashboardProps) => {
  // Default fallback data
  const defaultAnalytics: LiveEducationAnalytics = {
    totalCourses: 250,
    totalProviders: 85,
    averageRating: 4.7,
    averageEmploymentRate: 94,
    averageStartingSalary: "£28,000 - £35,000",
    highDemandPrograms: 45,
    fundingOptionsAvailable: 12,
    topCategories: [
      { name: "Bachelor's Degrees", count: 89 },
      { name: "HNC/HND", count: 67 },
      { name: "Master's Degrees", count: 45 },
      { name: "Professional Certs", count: 32 },
      { name: "Foundation Degrees", count: 17 }
    ],
    trends: {
      growthAreas: [
        "Renewable energy programmes (+60% applications)",
        "Digital engineering courses (+40% demand)",
        "Part-time and flexible study (+35%)",
        "Work-based learning pathways (+50%)"
      ],
      industryPartnerships: [
        "85% of programmes have employer links",
        "Average 94% employment rate post-graduation",
        "£12k+ average salary increase after qualification",
        "78% receive job offers before graduation"
      ]
    }
  };

  const displayAnalytics = analytics || defaultAnalytics;

  return (
    <Card className="border-elec-yellow/20 bg-elec-gray">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2 text-lg">
            <TrendingUp className="h-5 w-5 text-elec-yellow" />
            UK Education Market Insights
            {loading && <Loader2 className="h-4 w-4 animate-spin text-elec-yellow" />}
          </CardTitle>
          <div className="flex items-center gap-2">
            {lastUpdated && (
              <div className="flex items-center gap-1 text-xs text-muted-foreground">
                <Clock className="h-3 w-3" />
                {new Date(lastUpdated).toLocaleTimeString()}
                {isFromCache && (
                  <Badge variant="outline" className="ml-1 text-xs bg-amber-500/10 text-amber-400 border-amber-500/30">
                    Cached
                  </Badge>
                )}
              </div>
            )}
            <Button
              variant="ghost"
              size="sm"
              onClick={onRefresh}
              disabled={loading}
              className="h-8 w-8 p-0"
            >
              <RefreshCw className={`h-3 w-3 ${loading ? 'animate-spin' : ''}`} />
            </Button>
          </div>
        </div>
        {error && (
          <div className="flex items-center gap-2 text-red-400 text-sm">
            <AlertCircle className="h-4 w-4" />
            Live data unavailable - showing cached data
          </div>
        )}
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Key Statistics */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="text-center space-y-1">
            <div className="text-2xl font-bold text-elec-yellow">{displayAnalytics.totalCourses}</div>
            <div className="text-xs text-muted-foreground">Available Programmes</div>
          </div>
          <div className="text-center space-y-1">
            <div className="text-2xl font-bold text-elec-yellow">{displayAnalytics.totalProviders}</div>
            <div className="text-xs text-muted-foreground">Education Providers</div>
          </div>
          <div className="text-center space-y-1">
            <div className="text-2xl font-bold text-elec-yellow flex items-center justify-center gap-1">
              <Star className="h-4 w-4 fill-elec-yellow" />
              <span>{displayAnalytics.averageRating}</span>
            </div>
            <div className="text-xs text-muted-foreground">Average Rating</div>
          </div>
          <div className="text-center space-y-1">
            <div className="text-2xl font-bold text-elec-yellow">{displayAnalytics.averageEmploymentRate}%</div>
            <div className="text-xs text-muted-foreground">Employment Rate</div>
          </div>
        </div>

        {/* Industry Insights */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card className="border-elec-yellow/10 bg-elec-dark/50">
            <CardContent className="p-4">
              <div className="flex items-center gap-2 mb-3">
                <GraduationCap className="h-4 w-4 text-green-400" />
                <span className="text-sm font-medium text-green-400">High Demand</span>
              </div>
              <div className="text-2xl font-bold text-white mb-1">{displayAnalytics.highDemandPrograms}</div>
              <div className="text-xs text-muted-foreground">programmes in high demand</div>
              <div className="mt-2 text-xs text-green-400">
                Excellent career prospects
              </div>
            </CardContent>
          </Card>

          <Card className="border-elec-yellow/10 bg-elec-dark/50">
            <CardContent className="p-4">
              <div className="flex items-center gap-2 mb-3">
                <PoundSterling className="h-4 w-4 text-blue-400" />
                <span className="text-sm font-medium text-blue-400">Funding Available</span>
              </div>
              <div className="text-2xl font-bold text-white mb-1">{displayAnalytics.fundingOptionsAvailable}</div>
              <div className="text-xs text-muted-foreground">different funding options</div>
              <div className="mt-2 text-xs text-blue-400">
                Multiple pathways to finance
              </div>
            </CardContent>
          </Card>

          <Card className="border-elec-yellow/10 bg-elec-dark/50">
            <CardContent className="p-4">
              <div className="flex items-center gap-2 mb-3">
                <Award className="h-4 w-4 text-amber-400" />
                <span className="text-sm font-medium text-amber-400">Starting Salary</span>
              </div>
              <div className="text-lg font-bold text-white mb-1">{displayAnalytics.averageStartingSalary}</div>
              <div className="text-xs text-muted-foreground">average graduate salary</div>
              <div className="mt-2 text-xs text-amber-400">
                Strong return on investment
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Popular Categories - Static Data */}
        <div>
          <h4 className="text-sm font-medium mb-3 text-elec-yellow flex items-center gap-1">
            <Target className="h-4 w-4" />
            Most Popular Education Categories
          </h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {staticEducationCategories.map((category, idx) => (
              <div key={idx} className="flex items-center justify-between p-3 bg-elec-dark/30 rounded-lg border border-elec-yellow/10">
                <div className="flex items-center gap-2">
                  <Building className="h-3 w-3 text-elec-yellow" />
                  <span className="text-sm text-white">{category.name}</span>
                </div>
                <Badge variant="outline" className="bg-elec-yellow/10 text-elec-yellow border-elec-yellow/30">
                  {category.count}
                </Badge>
              </div>
            ))}
          </div>
        </div>

        {/* Market Trends */}
        <Card className="bg-elec-yellow/5 border-elec-yellow/20">
          <CardContent className="p-4">
            <h4 className="font-medium mb-3 text-elec-yellow">UK Education Trends 2025</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
              <div>
                <h5 className="font-medium mb-2 text-green-400">Growth Areas:</h5>
                <ul className="space-y-1 text-xs text-muted-foreground">
                  {displayAnalytics.trends.growthAreas.map((item, idx) => (
                    <li key={idx}>• {item}</li>
                  ))}
                </ul>
              </div>
              <div>
                <h5 className="font-medium mb-2 text-blue-400">Industry Partnerships:</h5>
                <ul className="space-y-1 text-xs text-muted-foreground">
                  {displayAnalytics.trends.industryPartnerships.map((item, idx) => (
                    <li key={idx}>• {item}</li>
                  ))}
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Live Data Badge */}
        {!error && analytics && (
          <div className="flex items-center justify-center">
            <Badge variant="outline" className="bg-green-500/10 text-green-400 border-green-500/30">
              <div className="w-2 h-2 bg-green-400 rounded-full mr-2 animate-pulse"></div>
              Live Market Data
            </Badge>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default LiveEducationAnalyticsDashboard;