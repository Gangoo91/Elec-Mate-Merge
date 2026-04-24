import { useState, useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { useCollegeSupabase } from '@/contexts/CollegeSupabaseContext';
import type { CollegeSection } from '@/pages/college/CollegeDashboard';

interface EPACountdownProps {
  onNavigate?: (section: CollegeSection) => void;
  studentId?: string; // If provided, show for specific student
  compact?: boolean;
}

interface GatewayRequirement {
  id: string;
  category: 'knowledge' | 'skills' | 'behaviours' | 'portfolio' | 'attendance' | 'offjob';
  title: string;
  description: string;
  required: boolean;
  status: 'complete' | 'in_progress' | 'not_started' | 'at_risk';
  progress: number; // 0-100
  dueDate?: string;
}

interface EPAStudent {
  id: string;
  name: string;
  cohort: string;
  plannedEndDate: string;
  daysRemaining: number;
  overallReadiness: number; // 0-100
  gatewayStatus: 'ready' | 'almost' | 'needs_work' | 'at_risk';
  requirements: GatewayRequirement[];
  gaps: string[];
  recommendations: string[];
}

export function EPACountdown({ onNavigate, studentId, compact = false }: EPACountdownProps) {
  const { students, epaRecords, ilps, cohorts } = useCollegeSupabase();
  const [selectedStudent, setSelectedStudent] = useState<string | null>(studentId || null);

  // Calculate EPA readiness for each student
  const epaStudents = useMemo(() => {
    const calculateStudentEPA = (studentIdToCalc: string): EPAStudent | null => {
      const student = students.find((s) => s.id === studentIdToCalc);
      if (!student || student.status !== 'Active') return null;

      const epaRecord = epaRecords.find((e) => e.studentId === studentIdToCalc);
      const studentILP = ilps.find((i) => i.studentId === studentIdToCalc);
      const cohort = cohorts.find((c) => c.id === student.cohortId);

      // Calculate planned end date (use EPA record or estimate from cohort)
      const plannedEndDate =
        epaRecord?.plannedEndDate ||
        cohort?.endDate ||
        new Date(Date.now() + 180 * 24 * 60 * 60 * 1000).toISOString();

      const endDate = new Date(plannedEndDate);
      const today = new Date();
      const daysRemaining = Math.ceil(
        (endDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24)
      );

      // Build gateway requirements
      const requirements: GatewayRequirement[] = [];
      const gaps: string[] = [];
      const recommendations: string[] = [];

      // 1. Knowledge (Theory) - from assessments
      const knowledgeProgress = student.progressPercentage || 0;
      requirements.push({
        id: 'knowledge',
        category: 'knowledge',
        title: 'Knowledge Criteria',
        description: 'All theory units completed and passed',
        required: true,
        status:
          knowledgeProgress >= 100
            ? 'complete'
            : knowledgeProgress >= 80
              ? 'in_progress'
              : 'at_risk',
        progress: Math.min(knowledgeProgress, 100),
      });
      if (knowledgeProgress < 100) {
        gaps.push(`Knowledge at ${knowledgeProgress}% - need ${100 - knowledgeProgress}% more`);
        if (knowledgeProgress < 80) {
          recommendations.push('Prioritise completing outstanding theory units');
        }
      }

      // 2. Skills (Practical) - estimate from progress
      const skillsProgress = Math.min((student.progressPercentage || 0) * 0.9, 100);
      requirements.push({
        id: 'skills',
        category: 'skills',
        title: 'Practical Skills',
        description: 'All practical assessments demonstrated',
        required: true,
        status:
          skillsProgress >= 100 ? 'complete' : skillsProgress >= 70 ? 'in_progress' : 'at_risk',
        progress: skillsProgress,
      });
      if (skillsProgress < 100) {
        gaps.push(`Practical skills at ${Math.round(skillsProgress)}%`);
      }

      // 3. Portfolio Evidence
      const portfolioProgress = epaRecord?.portfolioComplete
        ? 100
        : (student.progressPercentage || 0) * 0.7;
      requirements.push({
        id: 'portfolio',
        category: 'portfolio',
        title: 'Portfolio Evidence',
        description: 'Complete portfolio with mapped evidence',
        required: true,
        status:
          portfolioProgress >= 100
            ? 'complete'
            : portfolioProgress >= 60
              ? 'in_progress'
              : 'not_started',
        progress: portfolioProgress,
      });
      if (portfolioProgress < 100) {
        gaps.push(`Portfolio ${Math.round(portfolioProgress)}% complete`);
        recommendations.push('Upload remaining evidence and map to criteria');
      }

      // 4. Off-the-Job Training (20% requirement)
      const offJobHours = epaRecord?.offJobHours || 0;
      const requiredOffJob = 370; // Approximate for 18-month apprenticeship
      const offJobProgress = Math.min((offJobHours / requiredOffJob) * 100, 100);
      requirements.push({
        id: 'offjob',
        category: 'offjob',
        title: '20% Off-the-Job',
        description: `${offJobHours}/${requiredOffJob} hours completed`,
        required: true,
        status:
          offJobProgress >= 100 ? 'complete' : offJobProgress >= 80 ? 'in_progress' : 'at_risk',
        progress: offJobProgress,
      });
      if (offJobProgress < 100) {
        gaps.push(`Off-job training: ${offJobHours}/${requiredOffJob} hours`);
        if (offJobProgress < 80) {
          recommendations.push('Increase off-the-job training hours');
        }
      }

      // 5. Attendance
      const attendance = student.attendancePercentage || 0;
      const attendanceStatus =
        attendance >= 90 ? 'complete' : attendance >= 80 ? 'in_progress' : 'at_risk';
      requirements.push({
        id: 'attendance',
        category: 'attendance',
        title: 'Attendance',
        description: `${attendance}% attendance rate`,
        required: true,
        status: attendanceStatus,
        progress: Math.min(attendance, 100),
      });
      if (attendance < 90) {
        gaps.push(`Attendance at ${attendance}% (target: 90%)`);
        if (attendance < 80) {
          recommendations.push('Address attendance issues urgently');
        }
      }

      // 6. Behaviours
      const behavioursProgress = 85; // Default assumption
      requirements.push({
        id: 'behaviours',
        category: 'behaviours',
        title: 'Professional Behaviours',
        description: 'Demonstrated professional conduct',
        required: true,
        status: 'in_progress',
        progress: behavioursProgress,
      });

      // Calculate overall readiness
      const overallReadiness = Math.round(
        requirements.reduce((sum, r) => sum + r.progress, 0) / requirements.length
      );

      // Determine gateway status
      let gatewayStatus: 'ready' | 'almost' | 'needs_work' | 'at_risk';
      const criticalGaps = requirements.filter((r) => r.status === 'at_risk').length;

      if (overallReadiness >= 95 && criticalGaps === 0) {
        gatewayStatus = 'ready';
      } else if (overallReadiness >= 80 && criticalGaps <= 1) {
        gatewayStatus = 'almost';
      } else if (overallReadiness >= 60) {
        gatewayStatus = 'needs_work';
      } else {
        gatewayStatus = 'at_risk';
      }

      // Add time-based recommendations
      if (daysRemaining < 30 && overallReadiness < 90) {
        recommendations.unshift('URGENT: Less than 30 days to planned EPA');
      } else if (daysRemaining < 60 && overallReadiness < 80) {
        recommendations.unshift('Focus on completing gaps before gateway');
      }

      return {
        id: student.id,
        name: student.name,
        cohort: cohort?.name || 'Unknown',
        plannedEndDate,
        daysRemaining: Math.max(0, daysRemaining),
        overallReadiness,
        gatewayStatus,
        requirements,
        gaps,
        recommendations,
      };
    };

    // If specific student requested, only return that one
    if (studentId) {
      const result = calculateStudentEPA(studentId);
      return result ? [result] : [];
    }

    // Otherwise return all students approaching gateway
    return students
      .map((s) => calculateStudentEPA(s.id))
      .filter((s): s is EPAStudent => s !== null)
      .filter((s) => s.daysRemaining <= 180) // Only show students within 6 months of EPA
      .sort((a, b) => a.daysRemaining - b.daysRemaining);
  }, [students, epaRecords, ilps, cohorts, studentId]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'ready':
      case 'complete':
        return 'bg-success/20 text-success border-success/30';
      case 'almost':
      case 'in_progress':
        return 'bg-elec-yellow/20 text-elec-yellow border-elec-yellow/30';
      case 'needs_work':
      case 'not_started':
        return 'bg-amber-500/20 text-amber-500 border-amber-500/30';
      case 'at_risk':
        return 'bg-red-500/20 text-red-500 border-red-500/30';
      default:
        return 'bg-white/10 text-white border-white/20';
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'ready':
        return 'Gateway Ready';
      case 'almost':
        return 'Almost Ready';
      case 'needs_work':
        return 'Needs Work';
      case 'at_risk':
        return 'At Risk';
      default:
        return status;
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'knowledge':
        return BookOpen;
      case 'skills':
        return Target;
      case 'portfolio':
        return FileCheck;
      case 'attendance':
        return Clock;
      case 'behaviours':
        return CheckCircle2;
      case 'offjob':
        return Calendar;
      default:
        return AlertCircle;
    }
  };

  const selectedStudentData = selectedStudent
    ? epaStudents.find((s) => s.id === selectedStudent)
    : epaStudents[0];

  if (compact) {
    const nearestEPA = epaStudents[0];
    const readyCount = epaStudents.filter((s) => s.gatewayStatus === 'ready').length;
    const atRiskCount = epaStudents.filter((s) => s.gatewayStatus === 'at_risk').length;
    const almostCount = epaStudents.filter((s) => s.gatewayStatus === 'almost').length;

    return (
      <div className="relative overflow-hidden bg-[hsl(0_0%_12%)] border border-white/[0.06] rounded-2xl hover:bg-[hsl(0_0%_14%)] transition-colors">
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-green-500/70 via-emerald-400/70 to-green-500/70" />
        <div className="p-5 sm:p-6">
          {/* Header */}
          <div className="flex items-start justify-between gap-4">
            <div>
              <div className="text-[10px] font-medium uppercase tracking-[0.18em] text-white">
                EPA Gateway
              </div>
              <h3 className="mt-1.5 text-base sm:text-lg font-semibold text-white tracking-tight">
                Gateway readiness
              </h3>
            </div>
            <div className="text-right shrink-0">
              <div className="text-3xl sm:text-4xl font-semibold tabular-nums leading-none text-elec-yellow">
                {epaStudents.length}
              </div>
              <div className="mt-1 text-[10px] uppercase tracking-[0.14em] text-white">
                tracking
              </div>
            </div>
          </div>

          {/* Status pills */}
          {(readyCount > 0 || almostCount > 0 || atRiskCount > 0) && (
            <div className="mt-4 flex flex-wrap gap-1.5">
              {readyCount > 0 && (
                <span className="text-[11px] font-medium px-2 py-0.5 rounded-full bg-green-500/10 text-green-400 border border-green-500/20 tabular-nums">
                  {readyCount} ready
                </span>
              )}
              {almostCount > 0 && (
                <span className="text-[11px] font-medium px-2 py-0.5 rounded-full bg-amber-500/10 text-amber-400 border border-amber-500/20 tabular-nums">
                  {almostCount} almost
                </span>
              )}
              {atRiskCount > 0 && (
                <span className="text-[11px] font-medium px-2 py-0.5 rounded-full bg-red-500/10 text-red-400 border border-red-500/20 tabular-nums">
                  {atRiskCount} at risk
                </span>
              )}
            </div>
          )}

          {/* Nearest student */}
          {nearestEPA && (
            <div className="mt-5 pt-4 border-t border-white/[0.06]">
              <div className="text-[10px] uppercase tracking-[0.14em] text-white mb-2">
                Nearest EPA
              </div>
              <button
                onClick={() => onNavigate?.('epatracking')}
                className="w-full flex items-center justify-between gap-3 hover:bg-white/[0.02] transition-colors text-left touch-manipulation -mx-1 px-1 py-1 rounded"
              >
                <div className="min-w-0 flex-1">
                  <div className="text-sm font-medium text-white truncate">{nearestEPA.name}</div>
                  <div className="mt-0.5 text-[11px] text-white tabular-nums">
                    {nearestEPA.daysRemaining} days remaining
                  </div>
                </div>
                <div className="text-right shrink-0">
                  <div className="text-lg font-semibold tabular-nums text-white">
                    {nearestEPA.overallReadiness}%
                  </div>
                  <div className="text-[10px] text-white uppercase tracking-wider">ready</div>
                </div>
              </button>
            </div>
          )}

          <button
            onClick={() => onNavigate?.('epatracking')}
            className="mt-4 text-[12px] font-medium text-elec-yellow/90 hover:text-elec-yellow transition-colors touch-manipulation"
          >
            View EPA tracking →
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="relative overflow-hidden bg-[hsl(0_0%_12%)] border border-white/[0.06] rounded-2xl">
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-green-500/70 via-emerald-400/70 to-green-500/70" />
      <div className="p-5 sm:p-6">
        <div className="flex items-start justify-between gap-4">
          <div>
            <div className="text-[10px] font-medium uppercase tracking-[0.18em] text-white">
              EPA Gateway · Gap analysis
            </div>
            <h3 className="mt-1.5 text-xl sm:text-2xl font-semibold text-white tracking-tight">
              Gateway countdown
            </h3>
          </div>
        </div>

        {epaStudents.length > 1 && !studentId && (
          <div className="mt-5 flex gap-1.5 overflow-x-auto hide-scrollbar pb-1">
            {epaStudents.slice(0, 5).map((student) => {
              const selected =
                selectedStudent === student.id ||
                (!selectedStudent && student === epaStudents[0]);
              return (
                <button
                  key={student.id}
                  onClick={() => setSelectedStudent(student.id)}
                  className={`shrink-0 h-11 px-3.5 rounded-full text-[12px] font-medium transition-colors touch-manipulation inline-flex items-center gap-2 ${
                    selected
                      ? 'bg-elec-yellow text-black'
                      : 'bg-[hsl(0_0%_9%)] border border-white/[0.08] text-white hover:text-white'
                  }`}
                >
                  {student.name.split(' ')[0]}
                  <span className={selected ? 'text-black/60' : 'text-white'}>
                    {student.daysRemaining}d
                  </span>
                </button>
              );
            })}
          </div>
        )}

        {selectedStudentData && (
          <>
            {/* Countdown header */}
            <div className="mt-5 bg-[hsl(0_0%_10%)] border border-white/[0.06] rounded-xl p-5 flex items-center justify-between">
              <div>
                <div className="text-[15px] font-medium text-white">{selectedStudentData.name}</div>
                <div className="mt-0.5 text-[11.5px] text-white">
                  {selectedStudentData.cohort}
                </div>
              </div>
              <div className="text-right">
                <div className="text-3xl font-semibold tabular-nums text-elec-yellow leading-none">
                  {selectedStudentData.daysRemaining}
                </div>
                <div className="mt-1 text-[10px] uppercase tracking-[0.14em] text-white">
                  days to EPA
                </div>
              </div>
            </div>

            {/* Overall Readiness */}
            <div className="mt-4">
              <div className="flex items-center justify-between mb-2">
                <div className="text-[10px] font-medium uppercase tracking-[0.16em] text-white">
                  Gateway Readiness
                </div>
                <div className="flex items-center gap-2">
                  <span
                    className={`text-[11px] font-medium px-2 py-0.5 rounded-full border tabular-nums ${getStatusColor(selectedStudentData.gatewayStatus)}`}
                  >
                    {getStatusLabel(selectedStudentData.gatewayStatus)}
                  </span>
                  <span className="text-[15px] font-semibold tabular-nums text-white">
                    {selectedStudentData.overallReadiness}%
                  </span>
                </div>
              </div>
              <div className="h-1 bg-white/[0.06] rounded-full overflow-hidden">
                <div
                  className="h-full bg-green-400/80 rounded-full transition-all"
                  style={{ width: `${selectedStudentData.overallReadiness}%` }}
                />
              </div>
            </div>

            {/* Requirements */}
            <div className="mt-5">
              <div className="text-[10px] font-medium uppercase tracking-[0.16em] text-white mb-3">
                Gateway Requirements
              </div>
              <div className="space-y-2">
                {selectedStudentData.requirements.map((req) => (
                  <div
                    key={req.id}
                    className="bg-[hsl(0_0%_10%)] border border-white/[0.06] rounded-xl p-3"
                  >
                    <div className="flex items-baseline justify-between gap-2">
                      <div className="text-[13px] font-medium text-white truncate">{req.title}</div>
                      <span className="text-[13px] font-semibold tabular-nums text-white">
                        {Math.round(req.progress)}%
                      </span>
                    </div>
                    <div className="mt-0.5 text-[11px] text-white truncate">
                      {req.description}
                    </div>
                    <div className="mt-2 h-1 bg-white/[0.06] rounded-full overflow-hidden">
                      <div
                        className="h-full bg-elec-yellow/80 rounded-full"
                        style={{ width: `${req.progress}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Gaps */}
            {selectedStudentData.gaps.length > 0 && (
              <div className="mt-5">
                <div className="text-[10px] font-medium uppercase tracking-[0.16em] text-white mb-2">
                  Gaps to address
                </div>
                <ul className="space-y-1.5">
                  {selectedStudentData.gaps.map((gap, idx) => (
                    <li
                      key={idx}
                      className="flex items-start gap-2 text-[12.5px] text-amber-400 bg-amber-500/10 border border-amber-500/20 rounded-lg px-3 py-2 leading-relaxed"
                    >
                      <span aria-hidden className="text-amber-400 mt-0.5 shrink-0">
                        →
                      </span>
                      {gap}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* AI Recommendations */}
            {selectedStudentData.recommendations.length > 0 && (
              <div className="mt-5 pt-5 border-t border-white/[0.06]">
                <div className="text-[10px] font-medium uppercase tracking-[0.16em] text-white mb-2">
                  AI Recommendations
                </div>
                <ul className="space-y-1.5">
                  {selectedStudentData.recommendations.map((rec, idx) => (
                    <li key={idx} className="flex items-start gap-2 text-[13px] text-white">
                      <span aria-hidden className="text-elec-yellow mt-0.5 shrink-0">
                        →
                      </span>
                      {rec}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </>
        )}

        {epaStudents.length === 0 && (
          <div className="text-center py-10 text-white">
            <div className="text-[14px] font-medium text-white">No students approaching EPA</div>
            <p className="mt-1 text-[12px] text-white max-w-xs mx-auto">
              Students will appear here within 6 months of their planned EPA date.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
