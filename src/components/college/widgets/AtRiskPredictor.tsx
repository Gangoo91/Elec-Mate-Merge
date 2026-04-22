import { useState, useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { useCollegeSupabase } from '@/contexts/CollegeSupabaseContext';
import type { CollegeSection } from '@/pages/college/CollegeDashboard';

interface AtRiskPredictorProps {
  onNavigate?: (section: CollegeSection) => void;
  compact?: boolean;
}

interface RiskFactor {
  type: 'attendance' | 'progress' | 'grades' | 'ilp' | 'engagement';
  label: string;
  severity: 'high' | 'medium' | 'low';
  description: string;
}

interface AtRiskStudent {
  id: string;
  name: string;
  cohort: string;
  riskScore: number; // 0-100, higher = more at risk
  riskLevel: 'critical' | 'high' | 'medium' | 'watch';
  riskFactors: RiskFactor[];
  attendance: number;
  progressPercentage: number;
  lastILPReview?: string;
  recommendedActions: string[];
}

export function AtRiskPredictor({ onNavigate, compact = false }: AtRiskPredictorProps) {
  const { students, cohorts, ilps, attendance: attendanceRecords, grades: assessments } = useCollegeSupabase();
  const [selectedFilter, setSelectedFilter] = useState<'all' | 'critical' | 'high' | 'medium'>(
    'all'
  );

  // Calculate at-risk students with AI-style predictive scoring
  const atRiskStudents = useMemo(() => {
    const calculateRiskScore = (studentId: string): AtRiskStudent | null => {
      const student = students.find((s) => s.id === studentId);
      if (!student || student.status !== 'Active') return null;

      const riskFactors: RiskFactor[] = [];
      let riskScore = 0;

      // Get student's cohort
      const cohort = cohorts.find((c) => c.id === student.cohortId);

      // Get student's ILP
      const studentILP = ilps.find((i) => i.studentId === studentId);

      // 1. Attendance Risk (40% weight)
      const attendanceWeight = 40;
      const attendance = student.attendancePercentage || 0;
      if (attendance < 70) {
        riskScore += attendanceWeight;
        riskFactors.push({
          type: 'attendance',
          label: 'Critical Attendance',
          severity: 'high',
          description: `Attendance at ${attendance}% (below 70% threshold)`,
        });
      } else if (attendance < 85) {
        riskScore += attendanceWeight * 0.6;
        riskFactors.push({
          type: 'attendance',
          label: 'Low Attendance',
          severity: 'medium',
          description: `Attendance at ${attendance}% (below 85% target)`,
        });
      } else if (attendance < 90) {
        riskScore += attendanceWeight * 0.3;
        riskFactors.push({
          type: 'attendance',
          label: 'Attendance Watch',
          severity: 'low',
          description: `Attendance at ${attendance}% (monitor closely)`,
        });
      }

      // 2. Progress Risk (30% weight)
      const progressWeight = 30;
      const progress = student.progressPercentage || 0;
      const expectedProgress = 65; // Expected at this point in year
      const progressDelta = expectedProgress - progress;

      if (progressDelta > 20) {
        riskScore += progressWeight;
        riskFactors.push({
          type: 'progress',
          label: 'Behind Schedule',
          severity: 'high',
          description: `${progressDelta}% behind expected progress`,
        });
      } else if (progressDelta > 10) {
        riskScore += progressWeight * 0.5;
        riskFactors.push({
          type: 'progress',
          label: 'Progress Concern',
          severity: 'medium',
          description: `${progressDelta}% below target progress`,
        });
      }

      // 3. ILP Review Risk (20% weight)
      const ilpWeight = 20;
      if (studentILP) {
        const lastReview = studentILP.lastReviewDate ? new Date(studentILP.lastReviewDate) : null;
        const daysSinceReview = lastReview
          ? Math.floor((Date.now() - lastReview.getTime()) / (1000 * 60 * 60 * 24))
          : 999;

        if (daysSinceReview > 42) {
          // More than 6 weeks
          riskScore += ilpWeight;
          riskFactors.push({
            type: 'ilp',
            label: 'Overdue ILP Review',
            severity: 'high',
            description: `Last ILP review ${daysSinceReview} days ago`,
          });
        } else if (daysSinceReview > 28) {
          // More than 4 weeks
          riskScore += ilpWeight * 0.5;
          riskFactors.push({
            type: 'ilp',
            label: 'ILP Review Due',
            severity: 'medium',
            description: `ILP review due (${daysSinceReview} days since last)`,
          });
        }
      }

      // 4. Engagement Risk (10% weight) - Based on pattern analysis
      const engagementWeight = 10;
      // Simulate engagement analysis (in production, this would look at login patterns, submission rates, etc.)
      const engagementScore = attendance * 0.4 + progress * 0.6;
      if (engagementScore < 50) {
        riskScore += engagementWeight;
        riskFactors.push({
          type: 'engagement',
          label: 'Low Engagement',
          severity: 'medium',
          description: 'Pattern indicates reduced engagement',
        });
      }

      // Only include students with risk factors
      if (riskFactors.length === 0) return null;

      // Determine risk level
      let riskLevel: 'critical' | 'high' | 'medium' | 'watch';
      if (riskScore >= 70) riskLevel = 'critical';
      else if (riskScore >= 50) riskLevel = 'high';
      else if (riskScore >= 30) riskLevel = 'medium';
      else riskLevel = 'watch';

      // Generate recommended actions based on risk factors
      const recommendedActions: string[] = [];

      if (riskFactors.some((f) => f.type === 'attendance' && f.severity === 'high')) {
        recommendedActions.push('Schedule attendance intervention meeting');
        recommendedActions.push('Contact employer to discuss attendance support');
      } else if (riskFactors.some((f) => f.type === 'attendance')) {
        recommendedActions.push('Monitor attendance in next 2 weeks');
      }

      if (riskFactors.some((f) => f.type === 'progress')) {
        recommendedActions.push('Create catch-up plan with additional support sessions');
        recommendedActions.push('Review workload and identify barriers');
      }

      if (riskFactors.some((f) => f.type === 'ilp')) {
        recommendedActions.push('Book urgent ILP review meeting');
        recommendedActions.push('Update SMART targets');
      }

      if (riskFactors.some((f) => f.type === 'engagement')) {
        recommendedActions.push('One-to-one check-in with student');
        recommendedActions.push('Consider pastoral support referral');
      }

      return {
        id: student.id,
        name: student.name,
        cohort: cohort?.name || 'Unknown',
        riskScore: Math.round(riskScore),
        riskLevel,
        riskFactors,
        attendance: attendance,
        progressPercentage: progress,
        lastILPReview: studentILP?.lastReviewDate,
        recommendedActions,
      };
    };

    return students
      .map((s) => calculateRiskScore(s.id))
      .filter((s): s is AtRiskStudent => s !== null)
      .sort((a, b) => b.riskScore - a.riskScore);
  }, [students, cohorts, ilps, attendanceRecords, assessments]);

  const filteredStudents =
    selectedFilter === 'all'
      ? atRiskStudents
      : atRiskStudents.filter((s) => s.riskLevel === selectedFilter);

  const riskCounts = {
    critical: atRiskStudents.filter((s) => s.riskLevel === 'critical').length,
    high: atRiskStudents.filter((s) => s.riskLevel === 'high').length,
    medium: atRiskStudents.filter((s) => s.riskLevel === 'medium').length,
    watch: atRiskStudents.filter((s) => s.riskLevel === 'watch').length,
  };

  const getRiskColor = (level: string) => {
    switch (level) {
      case 'critical':
        return 'bg-red-500/20 text-red-500 border-red-500/30';
      case 'high':
        return 'bg-orange-500/20 text-orange-500 border-orange-500/30';
      case 'medium':
        return 'bg-amber-500/20 text-amber-500 border-amber-500/30';
      case 'watch':
        return 'bg-yellow-500/20 text-yellow-500 border-yellow-500/30';
      default:
        return 'bg-white/10 text-white border-white/20';
    }
  };

  const getRiskIcon = (type: string) => {
    switch (type) {
      case 'attendance':
        return Clock;
      case 'progress':
        return TrendingDown;
      case 'ilp':
        return Target;
      case 'engagement':
        return UserX;
      default:
        return AlertTriangle;
    }
  };

  if (compact) {
    return (
      <div className="relative overflow-hidden bg-[hsl(0_0%_12%)] border border-white/[0.06] rounded-2xl hover:bg-[hsl(0_0%_14%)] transition-colors">
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-orange-500/70 via-amber-400/70 to-orange-500/70" />
        <div className="p-5 sm:p-6">
          {/* Header */}
          <div className="flex items-start justify-between gap-4">
            <div>
              <div className="text-[10px] font-medium uppercase tracking-[0.18em] text-white/40">
                At-Risk · AI
              </div>
              <h3 className="mt-1.5 text-base sm:text-lg font-semibold text-white tracking-tight">
                At-risk predictor
              </h3>
            </div>
            <div className="text-right shrink-0">
              <div className="text-3xl sm:text-4xl font-semibold tabular-nums leading-none text-orange-400">
                {atRiskStudents.length}
              </div>
              <div className="mt-1 text-[10px] uppercase tracking-[0.14em] text-white/40">
                flagged
              </div>
            </div>
          </div>

          {/* Severity pills */}
          {(riskCounts.critical > 0 || riskCounts.high > 0 || riskCounts.medium > 0) && (
            <div className="mt-4 flex flex-wrap gap-1.5">
              {riskCounts.critical > 0 && (
                <span className="text-[11px] font-medium px-2 py-0.5 rounded-full bg-red-500/10 text-red-400 border border-red-500/20 tabular-nums">
                  {riskCounts.critical} critical
                </span>
              )}
              {riskCounts.high > 0 && (
                <span className="text-[11px] font-medium px-2 py-0.5 rounded-full bg-orange-500/10 text-orange-400 border border-orange-500/20 tabular-nums">
                  {riskCounts.high} high
                </span>
              )}
              {riskCounts.medium > 0 && (
                <span className="text-[11px] font-medium px-2 py-0.5 rounded-full bg-amber-500/10 text-amber-400 border border-amber-500/20 tabular-nums">
                  {riskCounts.medium} medium
                </span>
              )}
            </div>
          )}

          {/* Top students */}
          {filteredStudents.length > 0 && (
            <div className="mt-5 divide-y divide-white/[0.06] border-t border-white/[0.06]">
              {filteredStudents.slice(0, 2).map((student) => (
                <button
                  key={student.id}
                  onClick={() => onNavigate?.('progresstracking')}
                  className="w-full flex items-center justify-between gap-3 py-3 hover:bg-white/[0.02] transition-colors text-left touch-manipulation"
                >
                  <div className="min-w-0 flex-1">
                    <div className="text-sm font-medium text-white truncate">{student.name}</div>
                    <div className="mt-0.5 text-[11px] text-white/50 truncate">
                      {student.riskFactors[0]?.label}
                    </div>
                  </div>
                  <span className="text-sm font-semibold tabular-nums text-white shrink-0">
                    {student.riskScore}%
                  </span>
                </button>
              ))}
            </div>
          )}

          {/* CTA */}
          {atRiskStudents.length > 0 && (
            <button
              onClick={() => onNavigate?.('progresstracking')}
              className="mt-4 text-[12px] font-medium text-elec-yellow/90 hover:text-elec-yellow transition-colors touch-manipulation"
            >
              View all {atRiskStudents.length} at-risk students →
            </button>
          )}

          {atRiskStudents.length === 0 && (
            <div className="mt-5 pt-4 border-t border-white/[0.06] text-[12px] text-white/50">
              No at-risk students detected — all learners on track.
            </div>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="relative overflow-hidden bg-[hsl(0_0%_12%)] border border-white/[0.06] rounded-2xl">
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-orange-500/70 via-amber-400/70 to-orange-500/70" />
      <div className="p-5 sm:p-6">
        {/* Header */}
        <div className="flex items-start justify-between gap-4">
          <div>
            <div className="text-[10px] font-medium uppercase tracking-[0.18em] text-white/40">
              At-Risk · AI
            </div>
            <h3 className="mt-1.5 text-xl sm:text-2xl font-semibold text-white tracking-tight">
              At-risk predictor
            </h3>
          </div>
          <div className="text-right shrink-0">
            <div className="text-3xl sm:text-4xl font-semibold tabular-nums leading-none text-orange-400">
              {atRiskStudents.length}
            </div>
            <div className="mt-1 text-[10px] uppercase tracking-[0.14em] text-white/40">
              total flagged
            </div>
          </div>
        </div>

        {/* Risk Level Filter */}
        <div className="mt-5 grid grid-cols-4 gap-px bg-white/[0.06] border border-white/[0.06] rounded-xl overflow-hidden">
          {[
            { key: 'critical' as const, value: riskCounts.critical, label: 'Critical', color: 'text-red-400' },
            { key: 'high' as const, value: riskCounts.high, label: 'High', color: 'text-orange-400' },
            { key: 'medium' as const, value: riskCounts.medium, label: 'Medium', color: 'text-amber-400' },
            { key: 'all' as const, value: atRiskStudents.length, label: 'All', color: 'text-elec-yellow' },
          ].map((f) => (
            <button
              key={f.key}
              onClick={() => setSelectedFilter(selectedFilter === f.key ? 'all' : f.key)}
              className={`bg-[hsl(0_0%_12%)] hover:bg-[hsl(0_0%_15%)] transition-colors p-3 text-center ${selectedFilter === f.key ? 'bg-[hsl(0_0%_15%)]' : ''}`}
            >
              <div className={`text-2xl font-semibold tabular-nums ${f.color}`}>{f.value}</div>
              <div className="mt-1 text-[10px] uppercase tracking-[0.14em] text-white/50">
                {f.label}
              </div>
            </button>
          ))}
        </div>

        {/* Student List */}
        <div className="mt-5 space-y-3 max-h-[480px] overflow-y-auto">
          {filteredStudents.map((student) => (
            <div
              key={student.id}
              className="p-4 rounded-xl bg-[hsl(0_0%_10%)] border border-white/[0.06] hover:bg-[hsl(0_0%_13%)] transition-colors cursor-pointer"
              onClick={() => onNavigate?.('progresstracking')}
            >
              <div className="flex items-start justify-between gap-3 mb-3">
                <div className="min-w-0">
                  <h4 className="text-[15px] font-medium text-white truncate">{student.name}</h4>
                  <p className="mt-0.5 text-[11.5px] text-white/50 truncate">{student.cohort}</p>
                </div>
                <div className="text-right shrink-0">
                  <p className="text-xl font-semibold tabular-nums text-white leading-none">
                    {student.riskScore}%
                  </p>
                  <p className="mt-1 text-[10px] uppercase tracking-[0.14em] text-white/40">Risk</p>
                </div>
              </div>

              {/* Risk Factors */}
              <div className="flex flex-wrap gap-1">
                {student.riskFactors.map((factor, idx) => (
                  <span
                    key={idx}
                    className={`text-[11px] font-medium px-2 py-0.5 rounded-full border tabular-nums ${getRiskColor(factor.severity)}`}
                    title={factor.description}
                  >
                    {factor.label}
                  </span>
                ))}
              </div>

              {/* Metrics */}
              <div className="mt-3 grid grid-cols-2 gap-4">
                <div>
                  <div className="flex items-baseline justify-between text-[11px]">
                    <span className="text-white/50 uppercase tracking-[0.12em]">Attendance</span>
                    <span
                      className={`font-medium tabular-nums ${student.attendance < 85 ? 'text-orange-400' : 'text-white'}`}
                    >
                      {student.attendance}%
                    </span>
                  </div>
                  <div className="mt-1.5 h-1 bg-white/[0.06] rounded-full overflow-hidden">
                    <div
                      className="h-full bg-emerald-400/80 rounded-full"
                      style={{ width: `${student.attendance}%` }}
                    />
                  </div>
                </div>
                <div>
                  <div className="flex items-baseline justify-between text-[11px]">
                    <span className="text-white/50 uppercase tracking-[0.12em]">Progress</span>
                    <span
                      className={`font-medium tabular-nums ${student.progressPercentage < 50 ? 'text-orange-400' : 'text-white'}`}
                    >
                      {student.progressPercentage}%
                    </span>
                  </div>
                  <div className="mt-1.5 h-1 bg-white/[0.06] rounded-full overflow-hidden">
                    <div
                      className="h-full bg-elec-yellow/80 rounded-full"
                      style={{ width: `${student.progressPercentage}%` }}
                    />
                  </div>
                </div>
              </div>

              {/* Recommended Actions */}
              <div className="mt-3 pt-3 border-t border-white/[0.06]">
                <p className="text-[10px] font-medium uppercase tracking-[0.14em] text-white/40 mb-2">
                  AI Recommended Actions
                </p>
                <ul className="space-y-1.5">
                  {student.recommendedActions.slice(0, 2).map((action, idx) => (
                    <li key={idx} className="text-[12px] text-white/70 flex items-start gap-2">
                      <span className="text-elec-yellow mt-0.5 shrink-0">→</span>
                      {action}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}

          {filteredStudents.length === 0 && (
            <div className="text-center py-10 text-white/50">
              <p className="text-[14px] font-medium text-white">No at-risk students detected</p>
              <p className="text-[12px] mt-1 text-white/50">All learners on track.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
