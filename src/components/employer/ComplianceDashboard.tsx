import { useMemo } from 'react';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Skeleton } from '@/components/ui/skeleton';
import {
  Shield,
  AlertTriangle,
  CheckCircle2,
  Clock,
  Users,
  Car,
  Award,
  ChevronRight,
  TrendingUp,
  TrendingDown,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { useComplianceScore, useBusinessComplianceStats } from '@/hooks/useBusinessCompliance';
import { useQualificationStats } from '@/hooks/useEmployeeQualifications';

interface ComplianceDashboardProps {
  onCategoryClick?: (category: string) => void;
}

export function ComplianceDashboard({ onCategoryClick }: ComplianceDashboardProps) {
  const { data: scoreData, isLoading: scoreLoading } = useComplianceScore();
  const { data: businessStats, isLoading: businessLoading } = useBusinessComplianceStats();
  const { data: qualificationStats, isLoading: qualLoading } = useQualificationStats();

  const isLoading = scoreLoading || businessLoading || qualLoading;

  // Calculate score colour
  const scoreColour = useMemo(() => {
    if (!scoreData) return 'text-white';
    if (scoreData.score >= 90) return 'text-green-400';
    if (scoreData.score >= 70) return 'text-amber-400';
    return 'text-red-400';
  }, [scoreData]);

  const scoreGradient = useMemo(() => {
    if (!scoreData) return 'from-white/[0.04] to-white/[0.04]';
    if (scoreData.score >= 90) return 'from-green-500/20 to-green-600/20';
    if (scoreData.score >= 70) return 'from-amber-500/20 to-amber-600/20';
    return 'from-red-500/20 to-red-600/20';
  }, [scoreData]);

  // Total items expiring
  const totalExpiring = (businessStats?.expiring || 0) + (qualificationStats?.expiring || 0);
  const totalExpired = (businessStats?.expired || 0) + (qualificationStats?.expired || 0);

  if (isLoading) {
    return (
      <div className="space-y-4">
        <Skeleton className="h-40 w-full" />
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          <Skeleton className="h-24" />
          <Skeleton className="h-24" />
          <Skeleton className="h-24" />
          <Skeleton className="h-24" />
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Main Compliance Score Card */}
      <div
        className={cn(
          'relative bg-gradient-to-br rounded-2xl border border-white/[0.06] overflow-hidden',
          scoreGradient
        )}
      >
        <div className="p-4 md:p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="relative">
                <div
                  className={cn(
                    'w-20 h-20 md:w-24 md:h-24 rounded-full border-4 flex items-center justify-center',
                    scoreData?.score && scoreData.score >= 90
                      ? 'border-green-400/50'
                      : scoreData?.score && scoreData.score >= 70
                        ? 'border-amber-400/50'
                        : 'border-red-400/50'
                  )}
                >
                  <div className="text-center">
                    <span className={cn('text-2xl md:text-3xl font-bold', scoreColour)}>
                      {scoreData?.score || 0}
                    </span>
                    <span className="text-xs text-white block">%</span>
                  </div>
                </div>
                <div
                  className={cn(
                    'absolute -bottom-1 -right-1 p-1.5 rounded-full',
                    scoreData?.score && scoreData.score >= 90
                      ? 'bg-green-500'
                      : scoreData?.score && scoreData.score >= 70
                        ? 'bg-amber-500'
                        : 'bg-red-500'
                  )}
                >
                  {scoreData?.score && scoreData.score >= 90 ? (
                    <CheckCircle2 className="h-4 w-4 text-white" />
                  ) : scoreData?.score && scoreData.score >= 70 ? (
                    <Clock className="h-4 w-4 text-white" />
                  ) : (
                    <AlertTriangle className="h-4 w-4 text-white" />
                  )}
                </div>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-white">Compliance Score</h3>
                <p className="text-sm text-white">
                  {scoreData?.message || 'Loading...'}
                </p>
              </div>
            </div>

            <div className="hidden md:flex items-center gap-2">
              {scoreData?.score && scoreData.score >= 70 ? (
                <TrendingUp className="h-5 w-5 text-green-400" />
              ) : (
                <TrendingDown className="h-5 w-5 text-red-400" />
              )}
            </div>
          </div>

          {/* Progress bar */}
          <div className="mt-4">
            <Progress value={scoreData?.score || 0} className="h-2" />
          </div>

          {/* Alert badges */}
          {(totalExpiring > 0 || totalExpired > 0) && (
            <div className="mt-4 flex flex-wrap gap-2">
              {totalExpired > 0 && (
                <Badge variant="destructive" className="gap-1">
                  <AlertTriangle className="h-3 w-3" />
                  {totalExpired} expired
                </Badge>
              )}
              {totalExpiring > 0 && (
                <Badge variant="outline" className="gap-1 border-amber-500/50 text-amber-400">
                  <Clock className="h-3 w-3" />
                  {totalExpiring} expiring soon
                </Badge>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Category Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {/* Employee Qualifications */}
        <button
          className="bg-[hsl(0_0%_12%)] border border-white/[0.06] rounded-2xl p-4 text-left cursor-pointer hover:bg-[hsl(0_0%_15%)] active:bg-[hsl(0_0%_17%)] transition-all touch-manipulation"
          onClick={() => onCategoryClick?.('qualifications')}
        >
          <div className="flex items-center justify-between mb-3">
            <div className="p-2 rounded-lg bg-blue-500/10">
              <Users className="h-4 w-4 text-blue-400" />
            </div>
            <ChevronRight className="h-4 w-4 text-white" />
          </div>
          <p className="text-2xl font-bold text-white">{qualificationStats?.total || 0}</p>
          <p className="text-xs text-white">Employee Qualifications</p>
          {(qualificationStats?.expiring || 0) > 0 && (
            <Badge variant="outline" className="mt-2 text-xs border-amber-500/50 text-amber-400">
              {qualificationStats?.expiring} expiring
            </Badge>
          )}
        </button>

        {/* Insurance */}
        <button
          className="bg-[hsl(0_0%_12%)] border border-white/[0.06] rounded-2xl p-4 text-left cursor-pointer hover:bg-[hsl(0_0%_15%)] active:bg-[hsl(0_0%_17%)] transition-all touch-manipulation"
          onClick={() => onCategoryClick?.('Insurance')}
        >
          <div className="flex items-center justify-between mb-3">
            <div className="p-2 rounded-lg bg-green-500/10">
              <Shield className="h-4 w-4 text-green-400" />
            </div>
            <ChevronRight className="h-4 w-4 text-white" />
          </div>
          <p className="text-2xl font-bold text-white">
            {businessStats?.byCategory?.insurance || 0}
          </p>
          <p className="text-xs text-white">Insurance Policies</p>
        </button>

        {/* Memberships */}
        <button
          className="bg-[hsl(0_0%_12%)] border border-white/[0.06] rounded-2xl p-4 text-left cursor-pointer hover:bg-[hsl(0_0%_15%)] active:bg-[hsl(0_0%_17%)] transition-all touch-manipulation"
          onClick={() => onCategoryClick?.('Memberships')}
        >
          <div className="flex items-center justify-between mb-3">
            <div className="p-2 rounded-lg bg-purple-500/10">
              <Award className="h-4 w-4 text-purple-400" />
            </div>
            <ChevronRight className="h-4 w-4 text-white" />
          </div>
          <p className="text-2xl font-bold text-white">
            {businessStats?.byCategory?.memberships || 0}
          </p>
          <p className="text-xs text-white">Memberships</p>
        </button>

        {/* Vehicles */}
        <button
          className="bg-[hsl(0_0%_12%)] border border-white/[0.06] rounded-2xl p-4 text-left cursor-pointer hover:bg-[hsl(0_0%_15%)] active:bg-[hsl(0_0%_17%)] transition-all touch-manipulation"
          onClick={() => onCategoryClick?.('Vehicles')}
        >
          <div className="flex items-center justify-between mb-3">
            <div className="p-2 rounded-lg bg-cyan-500/10">
              <Car className="h-4 w-4 text-cyan-400" />
            </div>
            <ChevronRight className="h-4 w-4 text-white" />
          </div>
          <p className="text-2xl font-bold text-white">
            {businessStats?.byCategory?.vehicles || 0}
          </p>
          <p className="text-xs text-white">Vehicle Documents</p>
        </button>
      </div>
    </div>
  );
}
