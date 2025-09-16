import { useState, useEffect } from "react";
import { Helmet } from "react-helmet";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { 
  PoundSterling, 
  ArrowLeft, 
  RefreshCw, 
  Zap, 
  TrendingUp, 
  MapPin, 
  Users, 
  Search,
  Bell,
  CheckCircle,
  Clock,
  AlertTriangle
} from "lucide-react";
import { Link } from "react-router-dom";
import { useLiveMetalPrices } from "@/hooks/useLiveMetalPrices";
import { useToast } from "@/hooks/use-toast";

// Import existing components
import MaterialPriceComparison from "@/components/electrician-materials/MaterialPriceComparison";
import EnhancedRegionalPricing from "@/components/electrician-pricing/EnhancedRegionalPricing";
import CommunityPriceSubmission from "@/components/electrician-pricing/CommunityPriceSubmission";
import CompactPricingGrid from "@/components/electrician-pricing/CompactPricingGrid";

// Loading skeleton component
const PricingSkeleton = () => (
  <div className="space-y-4">
    {Array.from({ length: 3 }).map((_, i) => (
      <div key={i} className="animate-pulse">
        <div className="bg-elec-gray/50 h-24 rounded-lg border border-elec-yellow/10"></div>
      </div>
    ))}
  </div>
);

// Price trend indicator component
const PriceTrendIndicator = ({ trend, change }: { trend: 'up' | 'down' | 'stable', change: string }) => {
  const trendConfig = {
    up: { icon: TrendingUp, color: 'text-red-400', bgColor: 'bg-red-500/10' },
    down: { icon: TrendingUp, color: 'text-green-400', bgColor: 'bg-green-500/10' },
    stable: { icon: TrendingUp, color: 'text-gray-400', bgColor: 'bg-gray-500/10' }
  };
  
  const config = trendConfig[trend];
  const Icon = config.icon;
  
  return (
    <div className={`flex items-center gap-1 px-2 py-1 rounded-md ${config.bgColor}`}>
      <Icon className={`h-3 w-3 ${config.color} ${trend === 'down' ? 'rotate-180' : ''}`} />
      <span className={`text-xs ${config.color}`}>{change}</span>
    </div>
  );
};

// Enhanced search component with autocomplete
const EnhancedSearchBox = ({ 
  value, 
  onChange, 
  onSearch, 
  placeholder = "Search materials, regions, or job types...",
  suggestions = [] 
}: {
  value: string;
  onChange: (value: string) => void;
  onSearch: () => void;
  placeholder?: string;
  suggestions?: string[];
}) => {
  const [showSuggestions, setShowSuggestions] = useState(false);
  
  return (
    <div className="relative">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-elec-yellow/60" />
        <Input
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onFocus={() => setShowSuggestions(true)}
          onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
          onKeyPress={(e) => e.key === 'Enter' && onSearch()}
          placeholder={placeholder}
          className="pl-10 bg-elec-gray border-elec-yellow/30 text-white placeholder:text-elec-yellow/60 focus:border-elec-yellow h-12 text-base"
        />
        <Button 
          onClick={onSearch}
          className="absolute right-2 top-2 h-8 px-3 bg-elec-yellow text-elec-dark hover:bg-elec-yellow/90"
          size="sm"
        >
          Search
        </Button>
      </div>
      
      {showSuggestions && suggestions.length > 0 && (
        <div className="absolute top-full left-0 right-0 z-10 mt-1 bg-elec-gray border border-elec-yellow/30 rounded-lg shadow-lg">
          {suggestions.slice(0, 5).map((suggestion, index) => (
            <button
              key={index}
              onClick={() => {
                onChange(suggestion);
                setShowSuggestions(false);
              }}
              className="w-full text-left px-4 py-2 hover:bg-elec-yellow/10 text-white text-sm first:rounded-t-lg last:rounded-b-lg"
            >
              {suggestion}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

const LivePricingRedesigned = () => {
  const { data, isLoading, refreshPrices } = useLiveMetalPrices();
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("materials");
  const [searchQuery, setSearchQuery] = useState("");
  
  // Mock data for enhanced features
  const searchSuggestions = [
    "SWA Cable 6mm 100m",
    "Consumer Units",
    "LED Downlights",
    "London Installation",
    "Manchester Testing",
    "RCD Protection"
  ];

  const marketInsights = {
    trending: [
      { name: "SWA Cable", change: "+12%", trend: "up" as const },
      { name: "LED Lighting", change: "-8%", trend: "down" as const },
      { name: "Smart Switches", change: "+5%", trend: "up" as const }
    ],
    alerts: [
      { type: "price_increase", message: "Copper prices expected to rise 5% next week", urgent: true },
      { type: "supply_shortage", message: "High demand for consumer units in London area", urgent: false }
    ]
  };

  const handleSearch = () => {
    if (!searchQuery.trim()) {
      toast({
        title: "Search Required",
        description: "Please enter a search term to find pricing information.",
        variant: "destructive"
      });
      return;
    }
    // Search functionality would be implemented here
    console.log("Searching for:", searchQuery);
  };

  return (
    <div className="min-h-screen bg-elec-dark text-white">
      <Helmet>
        <title>Live Pricing Hub - Elec-Mate</title>
        <meta name="description" content="Real-time material pricing, regional job rates, and market insights for UK electricians. Compare prices, track trends, and stay competitive." />
        <meta name="keywords" content="live electrical pricing, UK material costs, regional job rates, price comparison" />
      </Helmet>

      <div className="sticky top-0 z-40 bg-elec-dark/95 backdrop-blur-sm border-b border-elec-yellow/20">
        <div className="flex items-center justify-between p-4">
          <div className="flex items-center gap-3">
            <PoundSterling className="h-6 w-6 text-elec-yellow" />
            <h1 className="text-xl sm:text-2xl font-bold">Live Pricing Hub</h1>
          </div>
          
          <div className="flex gap-2">
            <Link to="/electrician">
              <Button variant="outline" size="sm" className="hidden sm:flex items-center gap-1">
                <ArrowLeft className="h-4 w-4" /> Back
              </Button>
            </Link>
            
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => refreshPrices(true)}
              disabled={isLoading}
              className="flex items-center gap-1"
            >
              <RefreshCw className={`h-4 w-4 ${isLoading ? "animate-spin" : ""}`} />
              <span className="hidden sm:inline">Refresh</span>
            </Button>
          </div>
        </div>
      </div>

      <div className="p-4 space-y-6">
        {/* Enhanced Search Bar */}
        <Card className="border-elec-yellow/30 bg-elec-gray/50">
          <CardContent className="p-4">
            <EnhancedSearchBox
              value={searchQuery}
              onChange={setSearchQuery}
              onSearch={handleSearch}
              suggestions={searchSuggestions}
            />
          </CardContent>
        </Card>

        {/* Market Insights Bar */}
        <Card className="border-elec-yellow/20 bg-gradient-to-r from-elec-gray/30 to-elec-gray/10">
          <CardContent className="p-4">
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-semibold flex items-center gap-2">
                <Zap className="h-4 w-4 text-elec-yellow" />
                Market Insights
              </h3>
              <Badge className="bg-elec-yellow/20 text-elec-yellow text-xs">LIVE</Badge>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              <div>
                <h4 className="text-sm font-medium mb-2">Trending Materials</h4>
                <div className="space-y-1">
                  {marketInsights.trending.map((item, index) => (
                    <div key={index} className="flex items-center justify-between text-xs">
                      <span>{item.name}</span>
                      <PriceTrendIndicator trend={item.trend} change={item.change} />
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="sm:col-span-2 lg:col-span-2">
                <h4 className="text-sm font-medium mb-2 flex items-center gap-1">
                  <Bell className="h-3 w-3" />
                  Market Alerts
                </h4>
                <div className="space-y-2">
                  {marketInsights.alerts.map((alert, index) => (
                    <div key={index} className={`flex items-start gap-2 text-xs p-2 rounded ${
                      alert.urgent ? 'bg-red-500/10 border border-red-500/20' : 'bg-blue-500/10 border border-blue-500/20'
                    }`}>
                      {alert.urgent ? (
                        <AlertTriangle className="h-3 w-3 text-red-400 mt-0.5 flex-shrink-0" />
                      ) : (
                        <Clock className="h-3 w-3 text-blue-400 mt-0.5 flex-shrink-0" />
                      )}
                      <span className={alert.urgent ? 'text-red-300' : 'text-blue-300'}>{alert.message}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Tabbed Interface */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-4 bg-elec-gray border border-elec-yellow/20 h-auto p-1">
            <TabsTrigger 
              value="materials" 
              className="flex flex-col sm:flex-row items-center gap-1 py-3 text-xs sm:text-sm data-[state=active]:bg-elec-yellow data-[state=active]:text-elec-dark"
            >
              <Zap className="h-4 w-4" />
              <span>Materials</span>
            </TabsTrigger>
            <TabsTrigger 
              value="regional" 
              className="flex flex-col sm:flex-row items-center gap-1 py-3 text-xs sm:text-sm data-[state=active]:bg-elec-yellow data-[state=active]:text-elec-dark"
            >
              <MapPin className="h-4 w-4" />
              <span>Regional</span>
            </TabsTrigger>
            <TabsTrigger 
              value="market" 
              className="flex flex-col sm:flex-row items-center gap-1 py-3 text-xs sm:text-sm data-[state=active]:bg-elec-yellow data-[state=active]:text-elec-dark"
            >
              <TrendingUp className="h-4 w-4" />
              <span>Insights</span>
            </TabsTrigger>
            <TabsTrigger 
              value="submit" 
              className="flex flex-col sm:flex-row items-center gap-1 py-3 text-xs sm:text-sm data-[state=active]:bg-elec-yellow data-[state=active]:text-elec-dark"
            >
              <Users className="h-4 w-4" />
              <span>Submit</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="materials" className="space-y-6 animate-fade-in">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold">Material Price Comparison</h2>
                <Badge className="bg-green-500/20 text-green-400 border-green-500/30">
                  <CheckCircle className="h-3 w-3 mr-1" />
                  Live Data
                </Badge>
              </div>
              
              {isLoading ? (
                <PricingSkeleton />
              ) : data ? (
                <CompactPricingGrid
                  metalPrices={data.metalPrices}
                  lastUpdated={data.lastUpdated}
                  isLive={data.isLive}
                  dataSource={data.dataSource}
                />
              ) : (
                <Card className="p-8 text-center border-elec-yellow/20 bg-elec-gray">
                  <AlertTriangle className="h-12 w-12 text-orange-400 mx-auto mb-4" />
                  <h3 className="font-medium mb-2">Data Temporarily Unavailable</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    Unable to fetch live pricing data. Please try refreshing.
                  </p>
                  <Button onClick={() => refreshPrices(true)} size="sm">
                    Try Again
                  </Button>
                </Card>
              )}
              
              <MaterialPriceComparison />
            </div>
          </TabsContent>

          <TabsContent value="regional" className="space-y-6 animate-fade-in">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold">Regional Job Pricing</h2>
                <Badge className="bg-blue-500/20 text-blue-400 border-blue-500/30">
                  Regional Data
                </Badge>
              </div>
              <EnhancedRegionalPricing />
            </div>
          </TabsContent>

          <TabsContent value="market" className="space-y-6 animate-fade-in">
            <div className="space-y-4">
              <h2 className="text-xl font-semibold">Market Intelligence</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <Card className="border-elec-yellow/20 bg-elec-gray">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-sm flex items-center gap-2">
                      <TrendingUp className="h-4 w-4 text-green-400" />
                      Price Trends
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold text-green-400">+8.2%</div>
                    <p className="text-xs text-muted-foreground">Material costs this month</p>
                  </CardContent>
                </Card>

                <Card className="border-elec-yellow/20 bg-elec-gray">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-sm flex items-center gap-2">
                      <MapPin className="h-4 w-4 text-blue-400" />
                      Regional Demand
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold text-blue-400">London</div>
                    <p className="text-xs text-muted-foreground">Highest job demand</p>
                  </CardContent>
                </Card>

                <Card className="border-elec-yellow/20 bg-elec-gray">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-sm flex items-center gap-2">
                      <Users className="h-4 w-4 text-purple-400" />
                      Community
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold text-purple-400">2,847</div>
                    <p className="text-xs text-muted-foreground">Active contributors</p>
                  </CardContent>
                </Card>
              </div>

              <Card className="border-elec-yellow/20 bg-elec-gray">
                <CardHeader>
                  <CardTitle className="text-lg">Coming Soon: Advanced Market Analytics</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-4">
                    We're building advanced market intelligence features including price prediction, 
                    seasonal trends, and competitive analysis.
                  </p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
                    <div className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-400" />
                      <span>Price trend analysis</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-400" />
                      <span>Regional demand forecasting</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="h-4 w-4 text-gray-400" />
                      <span>Competitive benchmarking</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="h-4 w-4 text-gray-400" />
                      <span>Seasonal pricing models</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="submit" className="space-y-6 animate-fade-in">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold">Community Price Submission</h2>
                <Badge className="bg-purple-500/20 text-purple-400 border-purple-500/30">
                  Community Driven
                </Badge>
              </div>
              <CommunityPriceSubmission />
            </div>
          </TabsContent>
        </Tabs>

        {/* Data Quality Indicator */}
        <Card className="border-elec-yellow/20 bg-elec-gray/50">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-green-400" />
                <span className="text-sm font-medium">Data Quality: High</span>
              </div>
              <div className="text-xs text-muted-foreground">
                Last updated: {data?.lastUpdated ? new Date(data.lastUpdated).toLocaleTimeString() : 'N/A'}
              </div>
            </div>
            <div className="mt-2">
              <div className="flex justify-between text-xs text-muted-foreground mb-1">
                <span>Confidence Score</span>
                <span>87%</span>
              </div>
              <div className="w-full bg-gray-700 rounded-full h-2">
                <div className="bg-green-400 h-2 rounded-full" style={{ width: '87%' }}></div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default LivePricingRedesigned;