import { useState, useMemo } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import {
  AlertTriangle,
  TrendingDown,
  Clock,
  Target,
  ChevronRight,
  Brain,
  Sparkles,
  UserX,
  Calendar,
  BookOpen,
} from "lucide-react";
import { useCollege } from "@/contexts/CollegeContext";
import type { CollegeSection } from "@/pages/college/CollegeDashboard";

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
  const { students, cohorts, ilps, attendanceRecords, assessments } = useCollege();
  const [selectedFilter, setSelectedFilter] = useState<'all' | 'critical' | 'high' | 'medium'>('all');

  // Calculate at-risk students with AI-style predictive scoring
  const atRiskStudents = useMemo(() => {
    const calculateRiskScore = (studentId: string): AtRiskStudent | null => {
      const student = students.find(s => s.id === studentId);
      if (!student || student.status !== 'Active') return null;

      const riskFactors: RiskFactor[] = [];
      let riskScore = 0;

      // Get student's cohort
      const cohort = cohorts.find(c => c.id === student.cohortId);

      // Get student's ILP
      const studentILP = ilps.find(i => i.studentId === studentId);

      // 1. Attendance Risk (40% weight)
      const attendanceWeight = 40;
      const attendance = student.attendancePercentage || 0;
      if (attendance < 70) {
        riskScore += attendanceWeight;
        riskFactors.push({
          type: 'attendance',
          label: 'Critical Attendance',
          severity: 'high',
          description: `Attendance at ${attendance}% (below 70% threshold)`
        });
      } else if (attendance < 85) {
        riskScore += attendanceWeight * 0.6;
        riskFactors.push({
          type: 'attendance',
          label: 'Low Attendance',
          severity: 'medium',
          description: `Attendance at ${attendance}% (below 85% target)`
        });
      } else if (attendance < 90) {
        riskScore += attendanceWeight * 0.3;
        riskFactors.push({
          type: 'attendance',
          label: 'Attendance Watch',
          severity: 'low',
          description: `Attendance at ${attendance}% (monitor closely)`
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
          description: `${progressDelta}% behind expected progress`
        });
      } else if (progressDelta > 10) {
        riskScore += progressWeight * 0.5;
        riskFactors.push({
          type: 'progress',
          label: 'Progress Concern',
          severity: 'medium',
          description: `${progressDelta}% below target progress`
        });
      }

      // 3. ILP Review Risk (20% weight)
      const ilpWeight = 20;
      if (studentILP) {
        const lastReview = studentILP.lastReviewDate ? new Date(studentILP.lastReviewDate) : null;
        const daysSinceReview = lastReview
          ? Math.floor((Date.now() - lastReview.getTime()) / (1000 * 60 * 60 * 24))
          : 999;

        if (daysSinceReview > 42) { // More than 6 weeks
          riskScore += ilpWeight;
          riskFactors.push({
            type: 'ilp',
            label: 'Overdue ILP Review',
            severity: 'high',
            description: `Last ILP review ${daysSinceReview} days ago`
          });
        } else if (daysSinceReview > 28) { // More than 4 weeks
          riskScore += ilpWeight * 0.5;
          riskFactors.push({
            type: 'ilp',
            label: 'ILP Review Due',
            severity: 'medium',
            description: `ILP review due (${daysSinceReview} days since last)`
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
          description: 'Pattern indicates reduced engagement'
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

      if (riskFactors.some(f => f.type === 'attendance' && f.severity === 'high')) {
        recommendedActions.push('Schedule attendance intervention meeting');
        recommendedActions.push('Contact employer to discuss attendance support');
      } else if (riskFactors.some(f => f.type === 'attendance')) {
        recommendedActions.push('Monitor attendance in next 2 weeks');
      }

      if (riskFactors.some(f => f.type === 'progress')) {
        recommendedActions.push('Create catch-up plan with additional support sessions');
        recommendedActions.push('Review workload and identify barriers');
      }

      if (riskFactors.some(f => f.type === 'ilp')) {
        recommendedActions.push('Book urgent ILP review meeting');
        recommendedActions.push('Update SMART targets');
      }

      if (riskFactors.some(f => f.type === 'engagement')) {
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
      .map(s => calculateRiskScore(s.id))
      .filter((s): s is AtRiskStudent => s !== null)
      .sort((a, b) => b.riskScore - a.riskScore);
  }, [students, cohorts, ilps, attendanceRecords, assessments]);

  const filteredStudents = selectedFilter === 'all'
    ? atRiskStudents
    : atRiskStudents.filter(s => s.riskLevel === selectedFilter);

  const riskCounts = {
    critical: atRiskStudents.filter(s => s.riskLevel === 'critical').length,
    high: atRiskStudents.filter(s => s.riskLevel === 'high').length,
    medium: atRiskStudents.filter(s => s.riskLevel === 'medium').length,
    watch: atRiskStudents.filter(s => s.riskLevel === 'watch').length,
  };

  const getRiskColor = (level: string) => {
    switch (level) {
      case 'critical': return 'bg-red-500/20 text-red-500 border-red-500/30';
      case 'high': return 'bg-orange-500/20 text-orange-500 border-orange-500/30';
      case 'medium': return 'bg-amber-500/20 text-amber-500 border-amber-500/30';
      case 'watch': return 'bg-yellow-500/20 text-yellow-500 border-yellow-500/30';
      default: return 'bg-muted text-muted-foreground';
    }
  };

  const getRiskIcon = (type: string) => {
    switch (type) {
      case 'attendance': return Clock;
      case 'progress': return TrendingDown;
      case 'ilp': return Target;
      case 'engagement': return UserX;
      default: return AlertTriangle;
    }
  };

  if (compact) {
    return (
      <Card className="border-elec-yellow/20 bg-elec-gray">
        <CardHeader className="pb-2">
          <CardTitle className="text-sm flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Brain className="h-4 w-4 text-elec-yellow" />
              <span>At-Risk Predictor</span>
              <Badge className="bg-elec-yellow/20 text-elec-yellow text-[10px]">
                <Sparkles className="h-2.5 w-2.5 mr-0.5" />
                AI
              </Badge>
            </div>
            <span className="text-lg font-bold text-orange-500">{atRiskStudents.length}</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-0">
          <div className="flex gap-2 mb-3">
            {riskCounts.critical > 0 && (
              <Badge className={getRiskColor('critical')}>{riskCounts.critical} Critical</Badge>
            )}
            {riskCounts.high > 0 && (
              <Badge className={getRiskColor('high')}>{riskCounts.high} High</Badge>
            )}
          </div>
          {filteredStudents.slice(0, 2).map(student => (
            <div
              key={student.id}
              className="flex items-center justify-between p-2 rounded-lg hover:bg-elec-dark/50 transition-colors cursor-pointer"
              onClick={() => onNavigate?.("progresstracking")}
            >
              <div className="min-w-0">
                <p className="text-sm font-medium truncate">{student.name}</p>
                <p className="text-xs text-muted-foreground">{student.riskFactors[0]?.label}</p>
              </div>
              <Badge className={getRiskColor(student.riskLevel)}>
                {student.riskScore}%
              </Badge>
            </div>
          ))}
          {atRiskStudents.length > 2 && (
            <Button
              variant="ghost"
              size="sm"
              className="w-full mt-2 text-elec-yellow hover:text-elec-yellow hover:bg-elec-yellow/10"
              onClick={() => onNavigate?.("progresstracking")}
            >
              View all {atRiskStudents.length} at-risk students
              <ChevronRight className="h-4 w-4 ml-1" />
            </Button>
          )}
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="border-elec-yellow/20 bg-elec-gray">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Brain className="h-5 w-5 text-elec-yellow" />
            <span>At-Risk Predictor</span>
            <Badge className="bg-elec-yellow/20 text-elec-yellow">
              <Sparkles className="h-3 w-3 mr-1" />
              AI-Powered
            </Badge>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-sm text-muted-foreground">Total at risk:</span>
            <span className="text-2xl font-bold text-orange-500">{atRiskStudents.length}</span>
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent>
        {/* Risk Level Summary */}
        <div className="grid grid-cols-4 gap-2 mb-4">
          <button
            onClick={() => setSelectedFilter(selectedFilter === 'critical' ? 'all' : 'critical')}
            className={`p-3 rounded-lg border transition-all ${
              selectedFilter === 'critical'
                ? 'border-red-500 bg-red-500/10'
                : 'border-border hover:border-red-500/50'
            }`}
          >
            <p className="text-2xl font-bold text-red-500">{riskCounts.critical}</p>
            <p className="text-xs text-muted-foreground">Critical</p>
          </button>
          <button
            onClick={() => setSelectedFilter(selectedFilter === 'high' ? 'all' : 'high')}
            className={`p-3 rounded-lg border transition-all ${
              selectedFilter === 'high'
                ? 'border-orange-500 bg-orange-500/10'
                : 'border-border hover:border-orange-500/50'
            }`}
          >
            <p className="text-2xl font-bold text-orange-500">{riskCounts.high}</p>
            <p className="text-xs text-muted-foreground">High</p>
          </button>
          <button
            onClick={() => setSelectedFilter(selectedFilter === 'medium' ? 'all' : 'medium')}
            className={`p-3 rounded-lg border transition-all ${
              selectedFilter === 'medium'
                ? 'border-amber-500 bg-amber-500/10'
                : 'border-border hover:border-amber-500/50'
            }`}
          >
            <p className="text-2xl font-bold text-amber-500">{riskCounts.medium}</p>
            <p className="text-xs text-muted-foreground">Medium</p>
          </button>
          <button
            onClick={() => setSelectedFilter('all')}
            className={`p-3 rounded-lg border transition-all ${
              selectedFilter === 'all'
                ? 'border-elec-yellow bg-elec-yellow/10'
                : 'border-border hover:border-elec-yellow/50'
            }`}
          >
            <p className="text-2xl font-bold text-elec-yellow">{atRiskStudents.length}</p>
            <p className="text-xs text-muted-foreground">All</p>
          </button>
        </div>

        {/* Student List */}
        <div className="space-y-3 max-h-[400px] overflow-y-auto">
          {filteredStudents.map(student => (
            <div
              key={student.id}
              className="p-4 rounded-lg border border-border bg-background hover:border-elec-yellow/30 transition-all cursor-pointer"
              onClick={() => onNavigate?.("progresstracking")}
            >
              <div className="flex items-start justify-between mb-3">
                <div>
                  <div className="flex items-center gap-2">
                    <h4 className="font-semibold">{student.name}</h4>
                    <Badge className={getRiskColor(student.riskLevel)}>
                      {student.riskLevel.toUpperCase()}
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground">{student.cohort}</p>
                </div>
                <div className="text-right">
                  <p className="text-2xl font-bold text-foreground">{student.riskScore}%</p>
                  <p className="text-xs text-muted-foreground">Risk Score</p>
                </div>
              </div>

              {/* Risk Factors */}
              <div className="flex flex-wrap gap-2 mb-3">
                {student.riskFactors.map((factor, idx) => {
                  const Icon = getRiskIcon(factor.type);
                  return (
                    <div
                      key={idx}
                      className={`flex items-center gap-1.5 px-2 py-1 rounded text-xs ${getRiskColor(factor.severity)}`}
                      title={factor.description}
                    >
                      <Icon className="h-3 w-3" />
                      {factor.label}
                    </div>
                  );
                })}
              </div>

              {/* Metrics */}
              <div className="grid grid-cols-2 gap-4 mb-3">
                <div>
                  <div className="flex items-center justify-between text-xs mb-1">
                    <span className="text-muted-foreground">Attendance</span>
                    <span className={student.attendance < 85 ? 'text-orange-500' : 'text-foreground'}>
                      {student.attendance}%
                    </span>
                  </div>
                  <Progress
                    value={student.attendance}
                    className="h-1.5"
                  />
                </div>
                <div>
                  <div className="flex items-center justify-between text-xs mb-1">
                    <span className="text-muted-foreground">Progress</span>
                    <span className={student.progressPercentage < 50 ? 'text-orange-500' : 'text-foreground'}>
                      {student.progressPercentage}%
                    </span>
                  </div>
                  <Progress
                    value={student.progressPercentage}
                    className="h-1.5"
                  />
                </div>
              </div>

              {/* Recommended Actions */}
              <div className="border-t border-border pt-3">
                <p className="text-xs font-medium text-muted-foreground mb-2 flex items-center gap-1">
                  <Sparkles className="h-3 w-3 text-elec-yellow" />
                  AI Recommended Actions
                </p>
                <ul className="space-y-1">
                  {student.recommendedActions.slice(0, 2).map((action, idx) => (
                    <li key={idx} className="text-xs text-foreground flex items-start gap-2">
                      <ChevronRight className="h-3 w-3 text-elec-yellow mt-0.5 shrink-0" />
                      {action}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}

          {filteredStudents.length === 0 && (
            <div className="text-center py-8 text-muted-foreground">
              <Brain className="h-12 w-12 mx-auto mb-3 opacity-50" />
              <p>No at-risk students detected</p>
              <p className="text-sm mt-1">All students are on track!</p>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
