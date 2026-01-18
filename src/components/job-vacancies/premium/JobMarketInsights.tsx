/**
 * JobMarketInsights - Market analytics dashboard for UK electrician jobs
 * Shows salary trends, regional demand, and hiring patterns
 */

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Loader2 } from "lucide-react";
import {
  BarChart3,
  TrendingUp,
  MapPin,
  Building2,
  Briefcase,
  PoundSterling,
  Calendar,
  Users,
} from "lucide-react";
import { useJobMarketAnalytics } from "@/hooks/job-vacancies/useJobMarketAnalytics";
import { cn } from "@/lib/utils";

const formatCurrency = (amount: number): string => {
  if (amount >= 1000) {
    return `£${Math.round(amount / 1000)}k`;
  }
  return `£${amount}`;
};

const formatDate = (dateStr: string | null): string => {
  if (!dateStr) return 'N/A';
  const date = new Date(dateStr);
  return date.toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'short',
    hour: '2-digit',
    minute: '2-digit',
  });
};

// Regional color map for visual distinction
const regionColors: Record<string, { bg: string; text: string }> = {
  'London': { bg: 'bg-blue-500/15', text: 'text-blue-400' },
  'Manchester': { bg: 'bg-purple-500/15', text: 'text-purple-400' },
  'Birmingham': { bg: 'bg-orange-500/15', text: 'text-orange-400' },
  'Leeds': { bg: 'bg-green-500/15', text: 'text-green-400' },
  'Scotland': { bg: 'bg-cyan-500/15', text: 'text-cyan-400' },
  'Liverpool': { bg: 'bg-red-500/15', text: 'text-red-400' },
  'Bristol': { bg: 'bg-emerald-500/15', text: 'text-emerald-400' },
  'Sheffield': { bg: 'bg-amber-500/15', text: 'text-amber-400' },
  'Newcastle': { bg: 'bg-indigo-500/15', text: 'text-indigo-400' },
  'Wales': { bg: 'bg-rose-500/15', text: 'text-rose-400' },
};

const getRegionColor = (region: string) => {
  return regionColors[region] || { bg: 'bg-white/10', text: 'text-white/70' };
};

const JobMarketInsights = () => {
  const { data: analytics, isLoading, error } = useJobMarketAnalytics();

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center py-16">
        <Loader2 className="h-8 w-8 animate-spin text-elec-yellow mb-3" />
        <p className="text-white/60 text-sm">Loading market data...</p>
      </div>
    );
  }

  if (error || !analytics) {
    return (
      <div className="text-center py-16">
        <BarChart3 className="h-12 w-12 mx-auto text-white/20 mb-4" />
        <h3 className="text-lg font-bold text-white mb-2">Unable to Load Data</h3>
        <p className="text-sm text-white/60">Please try again later</p>
      </div>
    );
  }

  if (analytics.totalJobs === 0) {
    return (
      <div className="text-center py-16">
        <BarChart3 className="h-12 w-12 mx-auto text-white/20 mb-4" />
        <h3 className="text-lg font-bold text-white mb-2">No Data Yet</h3>
        <p className="text-sm text-white/60">Job market data will appear once jobs are cached</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Header Stats */}
      <div className="grid grid-cols-2 gap-3">
        {/* Total Jobs */}
        <Card className="bg-gradient-to-br from-blue-500/10 to-blue-600/5 border-blue-500/20">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-blue-500/20 flex items-center justify-center">
                <Briefcase className="h-5 w-5 text-blue-400" />
              </div>
              <div>
                <p className="text-2xl font-bold text-white">{analytics.totalJobs}</p>
                <p className="text-xs text-white/50">Total Jobs</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Average Salary */}
        <Card className="bg-gradient-to-br from-green-500/10 to-green-600/5 border-green-500/20">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-green-500/20 flex items-center justify-center">
                <PoundSterling className="h-5 w-5 text-green-400" />
              </div>
              <div>
                <p className="text-2xl font-bold text-white">{formatCurrency(analytics.averageSalary)}</p>
                <p className="text-xs text-white/50">Avg Salary</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* New This Week */}
        <Card className="bg-gradient-to-br from-amber-500/10 to-amber-600/5 border-amber-500/20">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-amber-500/20 flex items-center justify-center">
                <TrendingUp className="h-5 w-5 text-amber-400" />
              </div>
              <div>
                <p className="text-2xl font-bold text-white">{analytics.newJobsThisWeek}</p>
                <p className="text-xs text-white/50">This Week</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* New Today */}
        <Card className="bg-gradient-to-br from-purple-500/10 to-purple-600/5 border-purple-500/20">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-purple-500/20 flex items-center justify-center">
                <Calendar className="h-5 w-5 text-purple-400" />
              </div>
              <div>
                <p className="text-2xl font-bold text-white">{analytics.newJobsToday}</p>
                <p className="text-xs text-white/50">Today</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Regional Demand */}
      <Card className="bg-card/50 border-white/10">
        <CardHeader className="pb-2">
          <CardTitle className="flex items-center gap-2 text-base">
            <div className="w-8 h-8 rounded-lg bg-elec-yellow/20 flex items-center justify-center">
              <MapPin className="h-4 w-4 text-elec-yellow" />
            </div>
            <span>Jobs by Region</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {analytics.regionStats.slice(0, 6).map((region, idx) => {
            const maxJobs = analytics.regionStats[0]?.jobCount || 1;
            const percentage = Math.round((region.jobCount / maxJobs) * 100);
            const colors = getRegionColor(region.region);

            return (
              <div key={region.region} className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Badge className={cn("text-xs font-medium", colors.bg, colors.text)}>
                      {region.region}
                    </Badge>
                  </div>
                  <div className="flex items-center gap-3 text-sm">
                    <span className="text-white/60">{region.jobCount} jobs</span>
                    {region.avgSalary > 0 && (
                      <span className="text-green-400 font-medium">
                        {formatCurrency(region.avgSalary)}
                      </span>
                    )}
                  </div>
                </div>
                <Progress value={percentage} className="h-2 bg-white/5" />
              </div>
            );
          })}
        </CardContent>
      </Card>

      {/* Salary Distribution */}
      <Card className="bg-card/50 border-white/10">
        <CardHeader className="pb-2">
          <CardTitle className="flex items-center gap-2 text-base">
            <div className="w-8 h-8 rounded-lg bg-green-500/20 flex items-center justify-center">
              <PoundSterling className="h-4 w-4 text-green-400" />
            </div>
            <span>Salary Distribution</span>
            <span className="ml-auto text-xs text-white/40 font-normal">
              Median: {formatCurrency(analytics.medianSalary)}
            </span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            {analytics.salaryBands.map((band) => (
              <div key={band.range} className="flex items-center gap-3">
                <span className="text-xs text-white/60 w-16">{band.range}</span>
                <div className="flex-1 h-6 bg-white/5 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-green-500/60 to-emerald-500/60 rounded-full flex items-center justify-end pr-2"
                    style={{ width: `${Math.max(band.percentage, 5)}%` }}
                  >
                    {band.percentage > 15 && (
                      <span className="text-[10px] text-white font-medium">
                        {band.percentage}%
                      </span>
                    )}
                  </div>
                </div>
                <span className="text-xs text-white/40 w-8 text-right">{band.count}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Job Types */}
      <Card className="bg-card/50 border-white/10">
        <CardHeader className="pb-2">
          <CardTitle className="flex items-center gap-2 text-base">
            <div className="w-8 h-8 rounded-lg bg-purple-500/20 flex items-center justify-center">
              <Briefcase className="h-4 w-4 text-purple-400" />
            </div>
            <span>Job Types</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-2">
            {analytics.jobTypeStats.map((type) => (
              <Badge
                key={type.type}
                className={cn(
                  "text-sm font-medium px-3 py-1.5",
                  type.type === 'Permanent'
                    ? "bg-blue-500/15 text-blue-400"
                    : type.type === 'Contract'
                    ? "bg-amber-500/15 text-amber-400"
                    : type.type === 'Temporary'
                    ? "bg-orange-500/15 text-orange-400"
                    : "bg-white/10 text-white/70"
                )}
              >
                {type.type}
                <span className="ml-2 text-white/50">{type.percentage}%</span>
              </Badge>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Top Hiring Companies */}
      <Card className="bg-card/50 border-white/10">
        <CardHeader className="pb-2">
          <CardTitle className="flex items-center gap-2 text-base">
            <div className="w-8 h-8 rounded-lg bg-cyan-500/20 flex items-center justify-center">
              <Building2 className="h-4 w-4 text-cyan-400" />
            </div>
            <span>Top Hiring</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            {analytics.topCompanies.map((company, idx) => (
              <div
                key={company.company}
                className="flex items-center justify-between py-2 border-b border-white/5 last:border-0"
              >
                <div className="flex items-center gap-3">
                  <div className="w-6 h-6 rounded-full bg-white/5 flex items-center justify-center text-xs text-white/40">
                    {idx + 1}
                  </div>
                  <span className="text-sm text-white/80 truncate max-w-[180px]">
                    {company.company}
                  </span>
                </div>
                <Badge className="bg-elec-yellow/15 text-elec-yellow text-xs">
                  {company.jobCount} {company.jobCount === 1 ? 'job' : 'jobs'}
                </Badge>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Last Updated */}
      <p className="text-center text-xs text-white/30 py-2">
        Data updated: {formatDate(analytics.lastUpdated)}
      </p>
    </div>
  );
};

export default JobMarketInsights;
