import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  TrendingUp, 
  TrendingDown, 
  BarChart3, 
  MapPin, 
  Award,
  Clock,
  Users,
  Target,
  Zap,
  Building2,
  Wifi,
  WifiOff,
  RefreshCw
} from "lucide-react";
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid } from "recharts";
import { useLiveMarketInsights } from "@/hooks/useLiveMarketInsights";

interface JobInsight {
  id: string;
  type: 'trend' | 'hotspot' | 'skill' | 'salary' | 'timing';
  title: string;
  description: string;
  value: string;
  change?: number;
  icon: React.ReactNode;
  color: string;
}

interface JobInsightsProps {
  jobs: any[];
  location?: string;
}

const JobInsights: React.FC<JobInsightsProps> = ({ jobs, location }) => {
  const [insights, setInsights] = useState<JobInsight[]>([]);
  const [isMobile, setIsMobile] = useState(false);
  
  // Use live market insights hook
  const {
    data: liveData,
    isLoading: isLiveLoading,
    isLive,
    lastUpdated,
    refreshLive,
    getDataAge,
    isDataFresh
  } = useLiveMarketInsights('electrician', location || 'UK');

  // Local state for live data or fallback to computed data
  const [salaryStats, setSalaryStats] = useState({ median: 0, q1: 0, q3: 0, min: 0, max: 0, count: 0 });
  const [salaryBuckets, setSalaryBuckets] = useState<{ label: string; count: number }[]>([]);
  const [jobTypeMix, setJobTypeMix] = useState<{ label: string; count: number }[]>([]);
  const [experienceMix, setExperienceMix] = useState<{ label: string; count: number }[]>([]);
  const [workingPattern, setWorkingPattern] = useState<{ label: string; count: number }[]>([]);
  const [freshness, setFreshness] = useState<{ last48hPct: number; recent7dPct: number; medianDays: number }>({ last48hPct: 0, recent7dPct: 0, medianDays: 0 });
  const [topCompanies, setTopCompanies] = useState<{ name: string; count: number }[]>([]);
  const [topSkills, setTopSkills] = useState<{ name: string; count: number }[]>([]);
  const [topCerts, setTopCerts] = useState<{ name: string; count: number }[]>([]);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 400);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  // Update state and generate insights when live data changes
  useEffect(() => {
    if (liveData) {
      console.log('🔥 Live data updated:', { 
        salaryCount: liveData.salaryStats.count,
        topCompany: liveData.topCompanies[0]?.name,
        totalJobs: liveData.jobTypeMix.reduce((sum, type) => sum + type.count, 0)
      });
      setSalaryStats(liveData.salaryStats);
      setSalaryBuckets(liveData.salaryBuckets);
      setJobTypeMix(liveData.jobTypeMix);
      setExperienceMix(liveData.experienceMix);
      setWorkingPattern(liveData.workingPattern);
      setFreshness(liveData.freshness);
      setTopCompanies(liveData.topCompanies);
      setTopSkills(liveData.topSkills);
      setTopCerts(liveData.topCerts);
      
      // Generate insights using live data immediately
      generateInsightsWithLiveData(liveData);
    } else {
      console.log('📊 Using local computation fallback');
      // Fallback to local computation when no live data
      generateInsights();
    }
  }, [liveData, jobs, location]);

  // Generate insights specifically using live market data
  const generateInsightsWithLiveData = (marketData: any) => {
    console.log('🎯 Generating insights with live data:', { salaryCount: marketData.salaryStats.count });
    const newInsights: JobInsight[] = [];

    // Average Salary from live data
    if (marketData.salaryStats.count > 0) {
      newInsights.push({
        id: 'avg-salary',
        type: 'salary',
        title: 'Average Salary',
        description: `Based on ${marketData.salaryStats.count} market jobs`,
        value: `£${marketData.salaryStats.median.toLocaleString()}`,
        icon: <TrendingUp className="h-4 w-4" />,
        color: 'text-green-400'
      });
    }

    // Most Active Employer from live data
    if (marketData.topCompanies.length > 0) {
      newInsights.push({
        id: 'top-company',
        type: 'trend',
        title: 'Most Active Employer',
        description: `${marketData.topCompanies[0].count} job postings`,
        value: marketData.topCompanies[0].name,
        icon: <Building2 className="h-4 w-4" />,
        color: 'text-elec-yellow'
      });
    }

    // Most Common Type from live data
    if (marketData.jobTypeMix.length > 0) {
      const totalJobs = marketData.jobTypeMix.reduce((sum: any, type: any) => sum + type.count, 0);
      const percentage = Math.round((marketData.jobTypeMix[0].count / totalJobs) * 100);
      newInsights.push({
        id: 'job-type',
        type: 'trend',
        title: 'Most Common Type',
        description: `${percentage}% of market jobs`,
        value: marketData.jobTypeMix[0].label,
        icon: <Target className="h-4 w-4" />,
        color: 'text-blue-400'
      });
    }

    // Market Activity from live data
    if (marketData.freshness.recent7dPct > 0) {
      newInsights.push({
        id: 'recent-activity',
        type: 'timing',
        title: 'Market Activity',
        description: `${marketData.freshness.recent7dPct}% posted this week`,
        value: `Fresh opportunities`,
        icon: <Clock className="h-4 w-4" />,
        color: 'text-purple-400'
      });
    }

    // Top Skills from live data
    if (marketData.topSkills.length > 0) {
      newInsights.push({
        id: 'top-skill',
        type: 'skill',
        title: 'Top Skill in Demand',
        description: `${marketData.topSkills[0].count} job postings`,
        value: marketData.topSkills[0].name,
        icon: <Award className="h-4 w-4" />,
        color: 'text-pink-400'
      });
    }

    // Data Freshness indicator
    newInsights.push({
      id: 'data-freshness',
      type: 'timing',
      title: 'Data Freshness',
      description: 'Market data recency',
      value: `${marketData.freshness.medianDays} days median age`,
      icon: <Zap className="h-4 w-4" />,
      color: 'text-cyan-400'
    });

    // Location Hotspots (always from local jobs as this is search-specific)
    if (jobs.length > 0) {
      const locationCounts = jobs.reduce((acc: Record<string, number>, job) => {
        const loc = job.location || 'Unknown';
        acc[loc] = (acc[loc] || 0) + 1;
        return acc;
      }, {} as Record<string, number>);

      const topLocation = Object.entries(locationCounts)
        .sort(([, a], [, b]) => (b as number) - (a as number))[0];

      if (topLocation && topLocation[0] !== 'Unknown') {
        newInsights.push({
          id: 'hot-location',
          type: 'hotspot',
          title: 'Job Hotspot',
          description: `${topLocation[1]} opportunities`,
          value: topLocation[0],
          icon: <MapPin className="h-4 w-4" />,
          color: 'text-orange-400'
        });
      }
    }

    setInsights(newInsights);
  };

  const generateInsights = () => {
    const newInsights: JobInsight[] = [];

    if (jobs.length > 0) {
      // Fallback to local computation for jobs data
      
      // Salary Analysis (basic average for insight card)
      const baseSalaries = jobs
        .filter(job => job.salary)
        .map(job => {
          const clean = job.salary.replace(/[£$,]/g, '');
          const nums = clean.match(/\d+/g);
          if (!nums) return 0;
          if (nums.length >= 2) return Math.round((parseInt(nums[0]) + parseInt(nums[1])) / 2);
          return parseInt(nums[0]);
        })
        .filter((v) => v > 0);

      if (baseSalaries.length > 0) {
        const avgSalary = Math.round(baseSalaries.reduce((sum: number, s: number) => sum + s, 0) / baseSalaries.length);
        newInsights.push({
          id: 'avg-salary',
          type: 'salary',
          title: 'Average Salary',
          description: `Based on ${baseSalaries.length} job postings`,
          value: `£${avgSalary.toLocaleString()}`,
          icon: <TrendingUp className="h-4 w-4" />,
          color: 'text-green-400'
        });
      }

      // Top Companies
      const companyCounts = jobs.reduce((acc: Record<string, number>, job) => {
        acc[job.company] = (acc[job.company] || 0) + 1;
        return acc;
      }, {} as Record<string, number>);

      const topCompany = Object.entries(companyCounts)
        .sort(([, a], [, b]) => (b as number) - (a as number))[0];

      if (topCompany) {
        newInsights.push({
          id: 'top-company',
          type: 'trend',
          title: 'Most Active Employer',
          description: `${topCompany[1]} open positions`,
          value: topCompany[0],
          icon: <Building2 className="h-4 w-4" />,
          color: 'text-elec-yellow'
        });
      }

      // Job Type Distribution
      const typeCounts = jobs.reduce((acc: Record<string, number>, job) => {
        const t = (job.type || 'Unspecified').toString();
        acc[t] = (acc[t] || 0) + 1;
        return acc;
      }, {} as Record<string, number>);

      const topType = Object.entries(typeCounts)
        .sort(([, a], [, b]) => (b as number) - (a as number))[0];

      if (topType) {
        const percentage = Math.round(((topType[1] as number) / jobs.length) * 100);
        newInsights.push({
          id: 'job-type',
          type: 'trend',
          title: 'Most Common Type',
          description: `${percentage}% of available jobs`,
          value: topType[0],
          icon: <Target className="h-4 w-4" />,
          color: 'text-blue-400'
        });
      }

      // Recent Postings Analysis
      const now = new Date();
      const recentJobs = jobs.filter(job => {
        const postedDate = new Date(job.posted_date);
        const diffDays = (now.getTime() - postedDate.getTime()) / (1000 * 3600 * 24);
        return diffDays <= 7;
      });

      if (recentJobs.length > 0) {
        const percentage = Math.round((recentJobs.length / jobs.length) * 100);
        newInsights.push({
          id: 'recent-activity',
          type: 'timing',
          title: 'Market Activity',
          description: `${percentage}% posted this week`,
          value: `${recentJobs.length} new jobs`,
          icon: <Clock className="h-4 w-4" />,
          color: 'text-purple-400'
        });
      }
    }

    // Location Hotspots (always from local jobs as this is search-specific)
    if (jobs.length > 0) {
      const locationCounts = jobs.reduce((acc: Record<string, number>, job) => {
        const loc = job.location || 'Unknown';
        acc[loc] = (acc[loc] || 0) + 1;
        return acc;
      }, {} as Record<string, number>);

      const topLocation = Object.entries(locationCounts)
        .sort(([, a], [, b]) => (b as number) - (a as number))[0];

      if (topLocation && topLocation[0] !== 'Unknown') {
        newInsights.push({
          id: 'hot-location',
          type: 'hotspot',
          title: 'Job Hotspot',
          description: `${topLocation[1]} opportunities`,
          value: topLocation[0],
          icon: <MapPin className="h-4 w-4" />,
          color: 'text-orange-400'
        });
      }
    }

    // Only compute additional data for fallback when no live data
    if (!liveData) {
      const now = new Date();
      
      // Skills & Certs Analysis
      const skillKeywords = [
        'testing', 'installation', 'maintenance', 'commissioning',
        'solar', 'led', 'commercial', 'domestic', 'industrial',
        'eicr', 'fault finding', 'controls'
      ];

      const certKeywordsMap: Record<string, string> = {
        'bs 7671': 'BS 7671 (18th Edition)',
        '18th edition': '18th Edition',
        '2391': '2391 Testing & Inspection',
        'ecs': 'ECS',
        'cscs': 'CSCS',
        'niceic': 'NICEIC',
        'napit': 'NAPIT',
        'ev': 'EV Charging',
        'solar': 'Solar'
      };

      const lowerText = (job: any) => `${job.title} ${job.description}`.toLowerCase();

      const skillCounts = skillKeywords.reduce((acc: Record<string, number>, skill) => {
        const count = jobs.filter(job => lowerText(job).includes(skill)).length;
        if (count > 0) acc[skill] = count;
        return acc;
      }, {} as Record<string, number>);

      const certCounts = Object.keys(certKeywordsMap).reduce((acc: Record<string, number>, key) => {
        const count = jobs.filter(job => lowerText(job).includes(key)).length;
        if (count > 0) acc[key] = count;
        return acc;
      }, {} as Record<string, number>);

      // Get baseSalaries and companyCounts from local jobs (fallback only)
      if (jobs.length > 0) {
        const baseSalaries = jobs
          .filter(job => job.salary)
          .map(job => {
            const clean = job.salary.replace(/[£$,]/g, '');
            const nums = clean.match(/\d+/g);
            if (!nums) return 0;
            if (nums.length >= 2) return Math.round((parseInt(nums[0]) + parseInt(nums[1])) / 2);
            return parseInt(nums[0]);
          })
          .filter((v) => v > 0);

        const companyCounts = jobs.reduce((acc: Record<string, number>, job) => {
          acc[job.company] = (acc[job.company] || 0) + 1;
          return acc;
        }, {} as Record<string, number>);

        const typeCounts = jobs.reduce((acc: Record<string, number>, job) => {
          const t = (job.type || 'Unspecified').toString();
          acc[t] = (acc[t] || 0) + 1;
          return acc;
        }, {} as Record<string, number>);

        // Compute Pay Stats (median & quartiles) and buckets
        if (baseSalaries.length > 0) {
          const sorted = [...baseSalaries].sort((a, b) => a - b);
          const n = sorted.length;
          const median = sorted[Math.floor(n / 2)];
          const q1 = sorted[Math.floor(n * 0.25)];
          const q3 = sorted[Math.floor(n * 0.75)];
          const min = sorted[0];
          const max = sorted[n - 1];
          setSalaryStats({ median, q1, q3, min, max, count: n });

          const ranges = [
            { label: 'Up to £25k', min: 0, max: 25000 },
            { label: '£25k–£35k', min: 25000, max: 35000 },
            { label: '£35k–£45k', min: 35000, max: 45000 },
            { label: '£45k–£60k', min: 45000, max: 60000 },
            { label: '£60k+', min: 60000, max: Infinity },
          ];
          setSalaryBuckets(ranges.map(r => ({
            label: r.label,
            count: sorted.filter(v => v >= r.min && v < r.max).length
          })));
        } else {
          setSalaryStats({ median: 0, q1: 0, q3: 0, min: 0, max: 0, count: 0 });
          setSalaryBuckets([]);
        }

        // Build Job Type Mix array
        setJobTypeMix(Object.entries(typeCounts).map(([label, count]) => ({ label, count: count as number })));

        // Experience Mix (parsed from text)
        const expCounters: Record<string, number> = { 'Apprentice/Trainee': 0, 'Entry': 0, 'Mid': 0, 'Senior': 0, 'Unspecified': 0 };
        jobs.forEach(job => {
          const t = lowerText(job);
          if (/(apprentice|trainee)/.test(t)) expCounters['Apprentice/Trainee'] += 1;
          else if (/(senior|lead|manager)/.test(t)) expCounters['Senior'] += 1;
          else if (/(mid|intermediate)/.test(t)) expCounters['Mid'] += 1;
          else if (/(junior|entry)/.test(t)) expCounters['Entry'] += 1;
          else expCounters['Unspecified'] += 1;
        });
        setExperienceMix(Object.entries(expCounters).map(([label, count]) => ({ label, count })));

        // Working Pattern
        const workCounters: Record<string, number> = { 'Remote': 0, 'Hybrid': 0, 'On-site': 0 };
        jobs.forEach(job => {
          const t = lowerText(job);
          if (/remote/.test(t)) workCounters['Remote'] += 1;
          else if (/hybrid/.test(t)) workCounters['Hybrid'] += 1;
          else workCounters['On-site'] += 1;
        });
        setWorkingPattern(Object.entries(workCounters).map(([label, count]) => ({ label, count })));

        // Freshness
        const ages = jobs.map(job => {
          const d = new Date(job.posted_date);
          return Math.max(0, Math.round((now.getTime() - d.getTime()) / (1000 * 3600 * 24)));
        });
        const agesSorted = [...ages].sort((a, b) => a - b);
        const medianDays = agesSorted[Math.floor(agesSorted.length / 2)] || 0;
        const last48h = jobs.filter(job => {
          const d = new Date(job.posted_date);
          return (now.getTime() - d.getTime()) <= 48 * 3600 * 1000;
        }).length;
        const last7d = jobs.filter(job => {
          const d = new Date(job.posted_date);
          return (now.getTime() - d.getTime()) <= 7 * 24 * 3600 * 1000;
        }).length;
        setFreshness({
          last48hPct: Math.round((last48h / jobs.length) * 100),
          recent7dPct: Math.round((last7d / jobs.length) * 100),
          medianDays
        });

        // Top companies list (top 5)
        const topCompaniesArr = Object.entries(companyCounts)
          .sort(([, a], [, b]) => (b as number) - (a as number))
          .slice(0, 5)
          .map(([name, count]) => ({ name, count: count as number }));
        setTopCompanies(topCompaniesArr);

        // Set top skills and certs
        const skillsArr = Object.entries(skillCounts).sort(([, a], [, b]) => (b as number) - (a as number)).slice(0, 6)
          .map(([name, count]) => ({ name: name.charAt(0).toUpperCase() + name.slice(1), count: count as number }));
        setTopSkills(skillsArr);

        const certsArr = Object.entries(certCounts).sort(([, a], [, b]) => (b as number) - (a as number)).slice(0, 6)
          .map(([key, count]) => ({ name: certKeywordsMap[key], count: count as number }));
        setTopCerts(certsArr);
      }
    }

    setInsights(newInsights);
  };

  const getCardBg = (type: string) => {
    switch (type) {
      case 'salary': return 'border-green-400/30 bg-green-400/5';
      case 'trend': return 'border-elec-yellow/30 bg-elec-yellow/5';
      case 'hotspot': return 'border-orange-400/30 bg-orange-400/5';
      case 'skill': return 'border-pink-400/30 bg-pink-400/5';
      case 'timing': return 'border-purple-400/30 bg-purple-400/5';
      default: return 'border-elec-yellow/30 bg-elec-yellow/5';
    }
  };

  if (!insights.length) return null;

  return (
    <div className="space-y-4">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between mb-4">
        <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:gap-2">
          <BarChart3 className="h-5 w-5 text-elec-yellow" />
          <h3 className="text-lg font-semibold text-elec-light">Market Insights</h3>
          <Badge 
            variant="outline" 
            className={`border-elec-yellow/30 ${isLive ? 'text-green-400 border-green-400/30' : 'text-elec-yellow'}`}
          >
            {isLive ? (
              <div className="flex items-center gap-1">
                <Wifi className="h-3 w-3" />
                Live ({liveData?.jobsCount || jobs.length} jobs)
              </div>
            ) : (
              <div className="flex items-center gap-1">
                <WifiOff className="h-3 w-3" />
                Local ({jobs.length} jobs)
              </div>
            )}
          </Badge>
          {lastUpdated && (
            <Badge variant="outline" className="border-muted text-muted-foreground text-xs">
              {getDataAge()}
            </Badge>
          )}
        </div>
        <div className="flex items-center gap-2">
          {isLive && !isDataFresh() && (
            <Badge variant="outline" className="border-amber-400/30 text-amber-400 text-xs">
              Data may be stale
            </Badge>
          )}
          <Button 
            size="sm" 
            variant="outline" 
            onClick={refreshLive}
            className="border-elec-yellow/30 hover:bg-elec-yellow/10 self-start" 
            disabled={isLiveLoading}
          >
            <RefreshCw className={`h-3 w-3 mr-1 ${isLiveLoading ? 'animate-spin' : ''}`} />
            {isLiveLoading ? 'Updating…' : 'Refresh'}
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {insights.map((insight) => (
          <Card
            key={insight.id}
            className={`${getCardBg(insight.type)} transition-all hover:scale-105`}
          >
            <CardContent className="p-4">
              <div className="flex items-start justify-between mb-2">
                <div className={`p-2 rounded-lg bg-current/10 ${insight.color}`}>
                  {insight.icon}
                </div>
                {insight.change && (
                  <div className={`flex items-center text-xs ${insight.change > 0 ? 'text-green-400' : 'text-red-400'}`}>
                    {insight.change > 0 ? <TrendingUp className="h-3 w-3" /> : <TrendingDown className="h-3 w-3" />}
                    {Math.abs(insight.change)}%
                  </div>
                )}
              </div>
              
              <div className="space-y-1">
                <h4 className="font-medium text-sm text-muted-foreground">{insight.title}</h4>
                <p className="font-semibold text-elec-light">{insight.value}</p>
                <p className="text-xs text-muted-foreground">{insight.description}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Detailed analytics */}
      {salaryStats.count > 0 && (
        <Card className="border-elec-yellow/20 bg-elec-card">
          <CardHeader className="pb-2">
            <CardTitle className="text-base text-elec-light">Salary Overview</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-sm">
              <div>
                <p className="text-muted-foreground">Median</p>
                <p className="font-semibold text-elec-light">£{salaryStats.median.toLocaleString()}</p>
              </div>
              <div>
                <p className="text-muted-foreground">Q1–Q3</p>
                <p className="font-semibold text-elec-light">£{salaryStats.q1.toLocaleString()} – £{salaryStats.q3.toLocaleString()}</p>
              </div>
              <div>
                <p className="text-muted-foreground">Range</p>
                <p className="font-semibold text-elec-light">£{salaryStats.min.toLocaleString()} – £{salaryStats.max.toLocaleString()}</p>
              </div>
            </div>
            {salaryBuckets.length > 0 && (
              <div className="h-48 text-elec-yellow pb-2">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={salaryBuckets} margin={{ top: 8, right: 8, left: 0, bottom: isMobile ? 24 : 8 }}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis 
                      dataKey="label" 
                      tickFormatter={(v) => {
                        const map: Record<string, string> = {
                          'Up to £25k': '≤£25k',
                          '£25k–£35k': '£25–35k',
                          '£35k–£45k': '£35–45k',
                          '£45k–£60k': '£45–60k',
                          '£60k+': '£60k+'
                        };
                        return isMobile ? (map[v] || v) : v;
                      }}
                      interval={0}
                      angle={isMobile ? -30 : 0}
                      textAnchor={isMobile ? 'end' : 'middle'}
                      height={isMobile ? 0 : 30}
                      tick={isMobile ? false : { fill: 'currentColor', fontSize: 12 }}
                    />
                    <YAxis allowDecimals={false} tick={{ fill: 'currentColor', fontSize: 12 }} width={28} />
                    <Tooltip wrapperStyle={{ fontSize: 12 }} />
                    <Bar dataKey="count" fill="currentColor" radius={[4,4,0,0]} maxBarSize={40} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            )}
          </CardContent>
        </Card>
      )}

      {/* Mix breakdowns */}
      <Card className="border-elec-yellow/20 bg-elec-card">
        <CardHeader className="pb-2">
          <CardTitle className="text-base text-elec-light">Job Mix & Working Patterns</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <p className="text-sm mb-2 text-elec-yellow">Job Type</p>
            <div className="space-y-2">
              {jobTypeMix.map((item) => {
                const total = Math.max(1, jobTypeMix.reduce((s, i) => s + (i.count as number), 0));
                const pct = Math.round((item.count / total) * 100);
                return (
                  <div key={`type-${item.label}`}> 
                    <div className="flex justify-between text-xs text-muted-foreground">
                      <span>{item.label}</span>
                      <span>{pct}%</span>
                    </div>
                    <div className="h-2 bg-muted rounded">
                      <div className="h-2 bg-elec-yellow rounded" style={{ width: `${pct}%` }} />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
          <div>
            <p className="text-sm mb-2 text-elec-yellow">Experience Level</p>
            <div className="space-y-2">
              {experienceMix.map((item) => {
                const total = Math.max(1, experienceMix.reduce((s, i) => s + (i.count as number), 0));
                const pct = Math.round((item.count / total) * 100);
                return (
                  <div key={`exp-${item.label}`}>
                    <div className="flex justify-between text-xs text-muted-foreground">
                      <span>{item.label}</span>
                      <span>{pct}%</span>
                    </div>
                    <div className="h-2 bg-muted rounded">
                      <div className="h-2 bg-elec-yellow rounded" style={{ width: `${pct}%` }} />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
          <div>
            <p className="text-sm mb-2 text-elec-yellow">Working Pattern</p>
            <div className="space-y-2">
              {workingPattern.map((item) => {
                const total = Math.max(1, workingPattern.reduce((s, i) => s + (i.count as number), 0));
                const pct = Math.round((item.count / total) * 100);
                return (
                  <div key={`work-${item.label}`}>
                    <div className="flex justify-between text-xs text-muted-foreground">
                      <span>{item.label}</span>
                      <span>{pct}%</span>
                    </div>
                    <div className="h-2 bg-muted rounded">
                      <div className="h-2 bg-elec-yellow rounded" style={{ width: `${pct}%` }} />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Freshness & Companies */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card className="border-elec-yellow/20 bg-elec-card">
          <CardHeader className="pb-2">
            <CardTitle className="text-base text-elec-light">Posting Freshness</CardTitle>
          </CardHeader>
          <CardContent className="grid grid-cols-3 gap-4 text-sm">
            <div>
              <p className="text-muted-foreground">Last 48h</p>
              <p className="font-semibold text-elec-light">{freshness.last48hPct}%</p>
            </div>
            <div>
              <p className="text-muted-foreground">Last 7 days</p>
              <p className="font-semibold text-elec-light">{freshness.recent7dPct}%</p>
            </div>
            <div>
              <p className="text-muted-foreground">Median age</p>
              <p className="font-semibold text-elec-light">{freshness.medianDays} days</p>
            </div>
          </CardContent>
        </Card>

        <Card className="border-elec-yellow/20 bg-elec-card">
          <CardHeader className="pb-2">
            <CardTitle className="text-base text-elec-light">Top Companies</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2 text-sm">
            {topCompanies.map((c) => (
              <div key={c.name} className="flex items-center justify-between">
                <span className="text-elec-light">{c.name}</span>
                <span className="text-muted-foreground">{c.count} roles</span>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      {/* Skills & Certifications */}
      <Card className="border-elec-yellow/20 bg-elec-card">
        <CardHeader className="pb-2">
          <CardTitle className="text-base text-elec-light">Skills & Certifications Demand</CardTitle>
        </CardHeader>
        <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <p className="text-sm mb-2 text-elec-yellow">Top Skills</p>
            <ul className="space-y-1 text-sm">
              {topSkills.map((s) => (
                <li key={s.name} className="flex items-center justify-between">
                  <span className="text-elec-light">{s.name}</span>
                  <span className="text-muted-foreground">{s.count}</span>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <p className="text-sm mb-2 text-elec-yellow">Top Certifications</p>
            <ul className="space-y-1 text-sm">
              {topCerts.map((s) => (
                <li key={s.name} className="flex items-center justify-between">
                  <span className="text-elec-light">{s.name}</span>
                  <span className="text-muted-foreground">{s.count}</span>
                </li>
              ))}
            </ul>
          </div>
        </CardContent>
      </Card>

      {/* Quick Tips */}
      <Card className="border-elec-yellow/20 bg-elec-card">
        <CardContent className="p-4">
          <div className="flex items-center gap-2 mb-3">
            <Zap className="h-4 w-4 text-elec-yellow" />
            <h4 className="font-medium text-elec-light">Quick Tips</h4>
          </div>
          <ul className="text-sm text-muted-foreground space-y-1">
            <li>• Apply within 48 hours for better response rates</li>
            <li>• Tailor your CV to highlight relevant certifications</li>
            <li>• Consider expanding your search radius for more opportunities</li>
            <li>• Peak hiring seasons are typically March-May and September-November</li>
          </ul>
        </CardContent>
      </Card>
    </div>
  );
};

export default JobInsights;