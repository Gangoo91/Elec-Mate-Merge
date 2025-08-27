import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  TrendingUp, Users, MapPin, Building, 
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
  onRefresh: (forceRefresh?: boolean) => void;
}

const LiveEducationAnalyticsDashboard = ({ 
  analytics, 
  loading, 
  error, 
  lastUpdated, 
  isFromCache,
  onRefresh 
}: LiveEducationAnalyticsDashboardProps) => {
  
  // Default analytics for fallback
  const defaultAnalytics: LiveEducationAnalytics = {
    totalCourses: 0,
    totalProviders: 0,
    averageRating: 0,
    averageEmploymentRate: 0,
    averageStartingSalary: "£0",
    highDemandPrograms: 0,
    fundingOptionsAvailable: 0,
    topCategories: [],
    trends: {
      growthAreas: [],
      industryPartnerships: []
    }
  };

  const displayAnalytics = analytics || defaultAnalytics;

  const formatLastUpdated = (timestamp: string | null) => {
    if (!timestamp) return "Never";
    try {
      const date = new Date(timestamp);
      return date.toLocaleDateString('en-GB', {
        day: 'numeric',
        month: 'short',
        hour: '2-digit',
        minute: '2-digit'
      });
    } catch {
      return "Unknown";
    }
  };

  const handleRefresh = () => {
    onRefresh(true); // Force refresh
  };

  // Loading state
  if (loading) {
    return (
      <Card className="border-elec-yellow/20 bg-elec-gray/50">
        <CardContent className="pt-6">
          <div className="flex items-center justify-center text-center p-8">
            <div className="space-y-4">
              <Loader2 className="h-12 w-12 text-elec-yellow animate-spin mx-auto" />
              <div>
                <h3 className="text-lg font-medium text-white mb-2">Loading Education Data...</h3>
                <p className="text-sm text-muted-foreground">
                  Fetching the latest live education market data. Please wait.
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  // Error state
  if (error) {
    return (
      <Card className="border-elec-yellow/20 bg-elec-gray/50">
        <CardContent className="pt-6">
          <div className="flex items-center justify-center text-center p-8">
            <div className="space-y-4">
              <AlertCircle className="h-12 w-12 text-orange-400 mx-auto" />
              <div>
                <h3 className="text-lg font-medium text-white mb-2">Data Currently Unavailable</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Live education data is temporarily unavailable. Please try refreshing.
                </p>
                <Button 
                  onClick={handleRefresh}
                  variant="outline" 
                  size="sm"
                  className="border-elec-yellow/30 text-elec-yellow hover:bg-elec-yellow/10"
                >
                  <RefreshCw className="h-4 w-4 mr-2" />
                  Try Again
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header with Last Updated */}
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold text-white">Live Education Market Data</h3>
          <div className="flex items-center gap-2 text-sm text-muted-foreground mt-1">
            <Clock className="h-3 w-3" />
            <span>Last updated: {formatLastUpdated(lastUpdated)}</span>
            {isFromCache && (
              <span className="text-xs bg-elec-yellow/20 text-elec-yellow px-2 py-0.5 rounded">Cached</span>
            )}
          </div>
        </div>
        <Button
          onClick={handleRefresh}
          variant="outline"
          size="sm"
          disabled={loading}
          className="border-elec-yellow/30 text-elec-yellow hover:bg-elec-yellow/10 hover:border-elec-yellow/50"
        >
          {loading ? (
            <Loader2 className="h-4 w-4 mr-2 animate-spin" />
          ) : (
            <RefreshCw className="h-4 w-4 mr-2" />
          )}
          Refresh Data
        </Button>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="border-elec-yellow/20 bg-elec-gray/50">
          <CardContent className="pt-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total Courses</p>
                <p className="text-2xl font-bold text-elec-yellow">{displayAnalytics.totalCourses.toLocaleString()}</p>
              </div>
              <Building className="h-8 w-8 text-elec-yellow/60" />
            </div>
          </CardContent>
        </Card>

        <Card className="border-elec-yellow/20 bg-elec-gray/50">
          <CardContent className="pt-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Providers</p>
                <p className="text-2xl font-bold text-elec-yellow">{displayAnalytics.totalProviders.toLocaleString()}</p>
              </div>
              <MapPin className="h-8 w-8 text-elec-yellow/60" />
            </div>
          </CardContent>
        </Card>

        <Card className="border-elec-yellow/20 bg-elec-gray/50">
          <CardContent className="pt-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Avg Employment Rate</p>
                <p className="text-2xl font-bold text-elec-yellow">{displayAnalytics.averageEmploymentRate}%</p>
              </div>
              <TrendingUp className="h-8 w-8 text-elec-yellow/60" />
            </div>
          </CardContent>
        </Card>

        <Card className="border-elec-yellow/20 bg-elec-gray/50">
          <CardContent className="pt-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Avg Starting Salary</p>
                <p className="text-2xl font-bold text-elec-yellow">{displayAnalytics.averageStartingSalary}</p>
              </div>
              <Users className="h-8 w-8 text-elec-yellow/60" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Trending Programs & Popular Categories */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Trending Programs */}
        <div>
          <h4 className="text-sm font-medium mb-3 text-elec-yellow flex items-center gap-1">
            <TrendingUp className="h-4 w-4" />
            Growth Areas & Partnerships
          </h4>
          <Card className="border-elec-yellow/20 bg-elec-gray/50">
            <CardContent className="pt-4">
              <div className="space-y-4">
                <div>
                  <h5 className="text-xs font-medium text-muted-foreground mb-2">GROWTH AREAS</h5>
                  <div className="space-y-1">
                    {displayAnalytics.trends.growthAreas.length > 0 ? (
                      displayAnalytics.trends.growthAreas.slice(0, 3).map((area, idx) => (
                        <div key={idx} className="text-sm text-white">• {area}</div>
                      ))
                    ) : (
                      <div className="text-sm text-muted-foreground">No growth data available</div>
                    )}
                  </div>
                </div>
                <div>
                  <h5 className="text-xs font-medium text-muted-foreground mb-2">INDUSTRY PARTNERSHIPS</h5>
                  <div className="space-y-1">
                    {displayAnalytics.trends.industryPartnerships.length > 0 ? (
                      displayAnalytics.trends.industryPartnerships.slice(0, 3).map((partnership, idx) => (
                        <div key={idx} className="text-sm text-white">• {partnership}</div>
                      ))
                    ) : (
                      <div className="text-sm text-muted-foreground">No partnership data available</div>
                    )}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Popular Categories - Static Data */}
        <div>
          <h4 className="text-sm font-medium mb-3 text-elec-yellow flex items-center gap-1">
            <Building className="h-4 w-4" />
            Most Popular Education Categories
          </h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {staticEducationCategories.map((category, idx) => (
              <div key={idx} className="flex items-center justify-between p-3 bg-elec-dark/30 rounded-lg border border-elec-yellow/10">
                <div className="flex items-center gap-2">
                  <Building className="h-3 w-3 text-elec-yellow" />
                  <span className="text-sm text-white truncate">{category.name}</span>
                </div>
                <span className="text-xs bg-elec-yellow/10 text-elec-yellow border-elec-yellow/30 px-2 py-1 rounded">
                  {category.count}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Additional Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Card className="border-elec-yellow/20 bg-elec-gray/50">
          <CardContent className="pt-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">High Demand Programs</p>
                <p className="text-xl font-bold text-elec-yellow">{displayAnalytics.highDemandPrograms}</p>
              </div>
              <TrendingUp className="h-6 w-6 text-elec-yellow/60" />
            </div>
          </CardContent>
        </Card>

        <Card className="border-elec-yellow/20 bg-elec-gray/50">
          <CardContent className="pt-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Funding Options Available</p>
                <p className="text-xl font-bold text-elec-yellow">{displayAnalytics.fundingOptionsAvailable}</p>
              </div>
              <Users className="h-6 w-6 text-elec-yellow/60" />
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default LiveEducationAnalyticsDashboard;
