import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useIsMobile } from "@/hooks/use-mobile";
import { useLiveMetalPrices } from "@/hooks/useLiveMetalPrices";
import { useLiveMarketData } from "@/hooks/useLiveMarketData";
import { supabase } from "@/integrations/supabase/client";
import { 
  TrendingUp, 
  Clock, 
  Users, 
  MapPin, 
  Target,
  Lightbulb,
  BookOpen,
  Award,
  Calendar,
  Zap,
  RefreshCw,
  BarChart3,
  PoundSterling,
  AlertCircle
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface RealMarketInsightsProps {
  jobCount?: number;
}

interface PriceReportData {
  total_reports: number;
  avg_price: number;
  region: string;
  job_type: string;
  total_submissions: number;
}

interface MonthlyTrend {
  month: string;
  submissions: number;
  avg_price: number;
}

const RealMarketInsights: React.FC<RealMarketInsightsProps> = ({ jobCount = 0 }) => {
  const isMobile = useIsMobile();
  const { toast } = useToast();
  const { data: metalPrices, isLoading: metalLoading, refreshPrices } = useLiveMetalPrices();
  const { marketData, loading: marketLoading, refreshData } = useLiveMarketData();
  
  const [priceData, setPriceData] = useState<PriceReportData[]>([]);
  const [monthlyTrends, setMonthlyTrends] = useState<MonthlyTrend[]>([]);
  const [loading, setLoading] = useState(true);
  const [lastUpdated, setLastUpdated] = useState<Date>(new Date());

  const fetchRealData = async () => {
    try {
      setLoading(true);
      
      // Fetch price reports data
      const { data: reports, error: reportsError } = await supabase
        .from('price_reports')
        .select('*')
        .eq('status', 'approved')
        .gte('created_at', new Date(Date.now() - 90 * 24 * 60 * 60 * 1000).toISOString());

      if (reportsError) throw reportsError;

      // Process the data
      if (reports && reports.length > 0) {
        const processedData = reports.reduce((acc: any, report) => {
          const key = `${report.region}-${report.job_type}`;
          if (!acc[key]) {
            acc[key] = {
              region: report.region,
              job_type: report.job_type,
              total_reports: 0,
              total_price: 0,
              total_submissions: reports.length
            };
          }
          acc[key].total_reports++;
          acc[key].total_price += Number(report.price);
          return acc;
        }, {});

        const finalData = Object.values(processedData).map((item: any) => ({
          ...item,
          avg_price: item.total_price / item.total_reports
        }));

        setPriceData(finalData as PriceReportData[]);

        // Process monthly trends
        const monthlyData = reports.reduce((acc: any, report) => {
          const month = new Date(report.created_at).toISOString().slice(0, 7);
          if (!acc[month]) {
            acc[month] = { submissions: 0, total_price: 0 };
          }
          acc[month].submissions++;
          acc[month].total_price += Number(report.price);
          return acc;
        }, {});

        const trends = Object.entries(monthlyData).map(([month, data]: [string, any]) => ({
          month,
          submissions: data.submissions,
          avg_price: data.total_price / data.submissions
        }));

        setMonthlyTrends(trends);
      }
      
      setLastUpdated(new Date());
    } catch (error) {
      console.error('Error fetching real market data:', error);
      toast({
        title: "Data Load Error",
        description: "Unable to load latest market insights. Using cached data.",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRealData();
  }, []);

  const handleRefresh = async () => {
    await Promise.all([
      fetchRealData(),
      refreshPrices(true),
      refreshData(true)
    ]);
    
    toast({
      title: "Data Refreshed",
      description: "Market insights updated with latest data",
    });
  };

  const totalSubmissions = priceData[0]?.total_submissions || 0;
  const avgPrice = priceData.length > 0 
    ? priceData.reduce((sum, item) => sum + item.avg_price, 0) / priceData.length 
    : 0;

  const copperPrice = metalPrices?.metalPrices?.find(metal => 
    metal.name.toLowerCase().includes('copper')
  );

  const quickTips = [
    {
      icon: Clock,
      title: "Submit data within 24 hours",
      description: "Fresh pricing data gets better community response"
    },
    {
      icon: Target,
      title: "Include specific job details",
      description: "Detailed submissions help create better market insights"
    },
    {
      icon: MapPin,
      title: "Cover your region",
      description: `${totalSubmissions} community submissions in last 90 days`
    },
    {
      icon: Calendar,
      title: "Regular updates help",
      description: "Monthly submissions build better regional data"
    },
    {
      icon: BarChart3,
      title: "Track market trends",
      description: `Average price: £${avgPrice.toFixed(0)} across all jobs`
    },
    {
      icon: Users,
      title: "Community driven",
      description: "Real electricians sharing real pricing data"
    }
  ];

  const careerDevelopment = [
    {
      icon: BookOpen,
      title: "BS7671 18th Edition",
      description: "Stay current with the latest wiring regulations and safety standards"
    },
    {
      icon: Zap,
      title: "EV Charging & Solar",
      description: `High demand - copper at £${copperPrice?.value || 'N/A'}/kg`
    },
    {
      icon: Award,
      title: "NICEIC/NAPIT Registration",
      description: "Maintain your professional registration for credibility"
    },
    {
      icon: Users,
      title: "Trade Associations",
      description: "Join professional networks for career opportunities"
    },
    {
      icon: TrendingUp,
      title: "Additional Certifications",
      description: "PAT testing, fire alarm systems, emergency lighting"
    },
    {
      icon: Lightbulb,
      title: "Smart Home Technology",
      description: "Learn home automation and IoT device installation"
    }
  ];

  const topRegions = priceData
    .sort((a, b) => b.total_reports - a.total_reports)
    .slice(0, 5);

  const topJobTypes = priceData
    .reduce((acc: any, item) => {
      if (!acc[item.job_type]) {
        acc[item.job_type] = { count: 0, avgPrice: 0 };
      }
      acc[item.job_type].count += item.total_reports;
      acc[item.job_type].avgPrice = item.avg_price;
      return acc;
    }, {});

  const topJobs = Object.entries(topJobTypes)
    .map(([jobType, data]: [string, any]) => ({ jobType, ...data }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 6);

  return (
    <div className="space-y-6">
      {/* Market Statistics */}
      <Card className="border-elec-yellow/20 bg-elec-gray">
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <CardTitle className="text-lg flex items-center gap-2 text-white">
              <TrendingUp className="h-5 w-5 text-elec-yellow" />
              Real Market Data
            </CardTitle>
            <Button
              variant="ghost"
              size="sm"
              onClick={handleRefresh}
              disabled={loading || metalLoading || marketLoading}
              className="text-elec-yellow hover:bg-elec-yellow/10"
            >
              <RefreshCw className={`h-4 w-4 ${loading ? 'animate-spin' : ''}`} />
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className={`grid gap-4 ${isMobile ? 'grid-cols-1' : 'grid-cols-3'}`}>
            <div className="text-center p-3 bg-elec-yellow/10 rounded-lg">
              <div className="text-2xl font-bold text-elec-yellow">{totalSubmissions}</div>
              <div className="text-sm text-white">Community Submissions</div>
              <div className="text-xs text-white/60 mt-1">Last 90 days</div>
            </div>
            <div className="text-center p-3 bg-elec-yellow/10 rounded-lg">
              <div className="text-2xl font-bold text-green-400">
                £{avgPrice > 0 ? avgPrice.toFixed(0) : 'N/A'}
              </div>
              <div className="text-sm text-white">Average Price</div>
              <div className="text-xs text-white/60 mt-1">Across all jobs</div>
            </div>
            <div className="text-center p-3 bg-elec-yellow/10 rounded-lg">
              <div className="text-2xl font-bold text-blue-400">
                {priceData.length}
              </div>
              <div className="text-sm text-white">Active Regions</div>
              <div className="text-xs text-white/60 mt-1">With pricing data</div>
            </div>
          </div>

          {totalSubmissions === 0 && (
            <div className="mt-4 p-4 bg-amber-500/10 border border-amber-500/20 rounded-lg">
              <div className="flex items-start gap-3">
                <AlertCircle className="h-5 w-5 text-amber-400 mt-0.5" />
                <div>
                  <div className="font-medium text-amber-400">Building Market Intelligence</div>
                  <div className="text-sm text-white/80 mt-1">
                    We're collecting community pricing data to provide real insights. 
                    Be one of the first to contribute and help build this valuable resource!
                  </div>
                </div>
              </div>
            </div>
          )}

          {metalPrices && (
            <div className="mt-4 p-3 bg-elec-yellow/5 rounded-lg border border-elec-yellow/10">
              <div className="text-sm font-medium text-white mb-2">Live Metal Prices</div>
              <div className="flex items-center gap-4 text-xs text-white/80">
                <span>Copper: £{copperPrice?.value || 'N/A'}/kg</span>
                <span>Updated: {new Date().toLocaleDateString('en-GB')}</span>
                <Badge variant="secondary" className="bg-green-500/20 text-green-400 border-green-500/30">
                  Live
                </Badge>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Real Data Insights */}
      {totalSubmissions > 0 && (
        <div className={`grid gap-6 ${isMobile ? 'grid-cols-1' : 'grid-cols-1 lg:grid-cols-2'}`}>
          {/* Top Regions */}
          <Card className="border-elec-yellow/20 bg-elec-gray">
            <CardHeader className="pb-3">
              <CardTitle className="text-lg flex items-center gap-2 text-white">
                <MapPin className="h-5 w-5 text-elec-yellow" />
                Active Regions
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {topRegions.map((region, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-elec-yellow/5 rounded-lg border border-elec-yellow/10">
                  <div>
                    <div className="font-medium text-white text-sm">{region.region}</div>
                    <div className="text-xs text-white/80">{region.job_type}</div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm font-medium text-elec-yellow">
                      £{region.avg_price.toFixed(0)}
                    </div>
                    <div className="text-xs text-white/60">
                      {region.total_reports} reports
                    </div>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Popular Job Types */}
          <Card className="border-elec-yellow/20 bg-elec-gray">
            <CardHeader className="pb-3">
              <CardTitle className="text-lg flex items-center gap-2 text-white">
                <PoundSterling className="h-5 w-5 text-elec-yellow" />
                Popular Jobs
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {topJobs.map((job, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-elec-yellow/5 rounded-lg border border-elec-yellow/10">
                  <div>
                    <div className="font-medium text-white text-sm">{job.jobType}</div>
                    <div className="text-xs text-white/80">{job.count} submissions</div>
                  </div>
                  <div className="text-sm font-medium text-elec-yellow">
                    £{job.avgPrice.toFixed(0)}
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      )}

      {/* Enhanced Tips and Development */}
      <div className={`grid gap-6 ${isMobile ? 'grid-cols-1' : 'grid-cols-1 lg:grid-cols-2'}`}>
        {/* Community Tips */}
        <Card className="border-elec-yellow/20 bg-elec-gray">
          <CardHeader className="pb-3">
            <CardTitle className="text-lg flex items-center gap-2 text-white">
              <Lightbulb className="h-5 w-5 text-elec-yellow" />
              Community Insights
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {quickTips.map((tip, index) => (
              <div key={index} className="flex items-start gap-3 p-3 bg-elec-yellow/5 rounded-lg border border-elec-yellow/10">
                <tip.icon className="h-4 w-4 text-elec-yellow mt-0.5 flex-shrink-0" />
                <div className="min-w-0 flex-1">
                  <div className="font-medium text-white text-sm">{tip.title}</div>
                  <div className="text-xs text-white/80 mt-1">{tip.description}</div>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Career Development */}
        <Card className="border-elec-yellow/20 bg-elec-gray">
          <CardHeader className="pb-3">
            <CardTitle className="text-lg flex items-center gap-2 text-white">
              <BookOpen className="h-5 w-5 text-elec-yellow" />
              Career Development
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {careerDevelopment.map((item, index) => (
              <div key={index} className="flex items-start gap-3 p-3 bg-elec-yellow/5 rounded-lg border border-elec-yellow/10">
                <item.icon className="h-4 w-4 text-elec-yellow mt-0.5 flex-shrink-0" />
                <div className="min-w-0 flex-1">
                  <div className="font-medium text-white text-sm">{item.title}</div>
                  <div className="text-xs text-white/80 mt-1">{item.description}</div>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      {/* Data freshness indicator */}
      <div className="text-center text-xs text-white/60">
        Data last updated: {lastUpdated.toLocaleString('en-GB')}
      </div>
    </div>
  );
};

export default RealMarketInsights;