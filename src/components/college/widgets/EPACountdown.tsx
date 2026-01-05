import { useState, useMemo } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import {
  Award,
  Clock,
  CheckCircle2,
  AlertCircle,
  ChevronRight,
  Target,
  FileCheck,
  BookOpen,
  Calendar,
  Sparkles,
  TrendingUp,
} from "lucide-react";
import { useCollege } from "@/contexts/CollegeContext";
import type { CollegeSection } from "@/pages/college/CollegeDashboard";

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
  const { students, epaRecords, ilps, cohorts } = useCollege();
  const [selectedStudent, setSelectedStudent] = useState<string | null>(studentId || null);

  // Calculate EPA readiness for each student
  const epaStudents = useMemo(() => {
    const calculateStudentEPA = (studentIdToCalc: string): EPAStudent | null => {
      const student = students.find(s => s.id === studentIdToCalc);
      if (!student || student.status !== 'Active') return null;

      const epaRecord = epaRecords.find(e => e.studentId === studentIdToCalc);
      const studentILP = ilps.find(i => i.studentId === studentIdToCalc);
      const cohort = cohorts.find(c => c.id === student.cohortId);

      // Calculate planned end date (use EPA record or estimate from cohort)
      const plannedEndDate = epaRecord?.plannedEndDate ||
        cohort?.endDate ||
        new Date(Date.now() + 180 * 24 * 60 * 60 * 1000).toISOString();

      const endDate = new Date(plannedEndDate);
      const today = new Date();
      const daysRemaining = Math.ceil((endDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));

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
        status: knowledgeProgress >= 100 ? 'complete' : knowledgeProgress >= 80 ? 'in_progress' : 'at_risk',
        progress: Math.min(knowledgeProgress, 100),
      });
      if (knowledgeProgress < 100) {
        gaps.push(`Knowledge at ${knowledgeProgress}% - need ${100 - knowledgeProgress}% more`);
        if (knowledgeProgress < 80) {
          recommendations.push('Prioritize completing outstanding theory units');
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
        status: skillsProgress >= 100 ? 'complete' : skillsProgress >= 70 ? 'in_progress' : 'at_risk',
        progress: skillsProgress,
      });
      if (skillsProgress < 100) {
        gaps.push(`Practical skills at ${Math.round(skillsProgress)}%`);
      }

      // 3. Portfolio Evidence
      const portfolioProgress = epaRecord?.portfolioComplete ? 100 : (student.progressPercentage || 0) * 0.7;
      requirements.push({
        id: 'portfolio',
        category: 'portfolio',
        title: 'Portfolio Evidence',
        description: 'Complete portfolio with mapped evidence',
        required: true,
        status: portfolioProgress >= 100 ? 'complete' : portfolioProgress >= 60 ? 'in_progress' : 'not_started',
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
        status: offJobProgress >= 100 ? 'complete' : offJobProgress >= 80 ? 'in_progress' : 'at_risk',
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
      const attendanceStatus = attendance >= 90 ? 'complete' : attendance >= 80 ? 'in_progress' : 'at_risk';
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
      const criticalGaps = requirements.filter(r => r.status === 'at_risk').length;

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
      .map(s => calculateStudentEPA(s.id))
      .filter((s): s is EPAStudent => s !== null)
      .filter(s => s.daysRemaining <= 180) // Only show students within 6 months of EPA
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
        return 'bg-muted text-muted-foreground';
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'ready': return 'Gateway Ready';
      case 'almost': return 'Almost Ready';
      case 'needs_work': return 'Needs Work';
      case 'at_risk': return 'At Risk';
      default: return status;
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'knowledge': return BookOpen;
      case 'skills': return Target;
      case 'portfolio': return FileCheck;
      case 'attendance': return Clock;
      case 'behaviours': return CheckCircle2;
      case 'offjob': return Calendar;
      default: return AlertCircle;
    }
  };

  const selectedStudentData = selectedStudent
    ? epaStudents.find(s => s.id === selectedStudent)
    : epaStudents[0];

  if (compact) {
    const nearestEPA = epaStudents[0];
    const readyCount = epaStudents.filter(s => s.gatewayStatus === 'ready').length;
    const atRiskCount = epaStudents.filter(s => s.gatewayStatus === 'at_risk').length;

    return (
      <Card className="backdrop-blur-xl bg-elec-dark/60 border-white/10 hover:border-success/30 transition-all duration-300">
        <CardHeader className="pb-2">
          <CardTitle className="text-sm flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="p-1.5 rounded-lg bg-gradient-to-br from-success/20 to-success/5 border border-success/20 shadow-lg shadow-success/5"><Award className="h-3.5 w-3.5 text-success" /></div>
              <span>EPA Gateway</span>
            </div>
            <span className="text-lg font-bold text-elec-yellow">{epaStudents.length}</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-0">
          <div className="flex gap-2 mb-3">
            {readyCount > 0 && (
              <Badge className={getStatusColor('ready')}>{readyCount} Ready</Badge>
            )}
            {atRiskCount > 0 && (
              <Badge className={getStatusColor('at_risk')}>{atRiskCount} At Risk</Badge>
            )}
          </div>
          {nearestEPA && (
            <div
              className="flex items-center justify-between p-2 rounded-lg hover:bg-white/5 transition-colors cursor-pointer"
              onClick={() => onNavigate?.("epatracking")}
            >
              <div className="min-w-0">
                <p className="text-sm font-medium truncate">{nearestEPA.name}</p>
                <p className="text-xs text-muted-foreground">
                  {nearestEPA.daysRemaining} days to EPA
                </p>
              </div>
              <div className="text-right">
                <p className="text-lg font-bold text-elec-yellow">{nearestEPA.overallReadiness}%</p>
                <p className="text-[10px] text-muted-foreground">ready</p>
              </div>
            </div>
          )}
          <Button
            variant="ghost"
            size="sm"
            className="w-full mt-2 text-elec-yellow hover:text-elec-yellow hover:bg-elec-yellow/10"
            onClick={() => onNavigate?.("epatracking")}
          >
            View EPA tracking
            <ChevronRight className="h-4 w-4 ml-1" />
          </Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="backdrop-blur-xl bg-elec-dark/60 border-white/10 hover:border-success/30 transition-all duration-300">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="p-1.5 rounded-xl bg-gradient-to-br from-success/20 to-success/5 border border-success/20 shadow-lg shadow-success/5"><Award className="h-4 w-4 text-success" /></div>
            <span>EPA Gateway Countdown</span>
            <Badge className="bg-elec-yellow/20 text-elec-yellow">
              <Sparkles className="h-3 w-3 mr-1" />
              Gap Analysis
            </Badge>
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent>
        {/* Student selector if multiple students */}
        {epaStudents.length > 1 && !studentId && (
          <div className="flex gap-2 mb-4 overflow-x-auto hide-scrollbar pb-2">
            {epaStudents.slice(0, 5).map(student => (
              <button
                key={student.id}
                onClick={() => setSelectedStudent(student.id)}
                className={`shrink-0 px-3 py-2 rounded-lg border transition-all ${
                  selectedStudent === student.id || (!selectedStudent && student === epaStudents[0])
                    ? 'border-elec-yellow bg-elec-yellow/10'
                    : 'border-border hover:border-elec-yellow/50'
                }`}
              >
                <p className="text-sm font-medium">{student.name.split(' ')[0]}</p>
                <p className="text-xs text-muted-foreground">{student.daysRemaining}d</p>
              </button>
            ))}
          </div>
        )}

        {selectedStudentData && (
          <>
            {/* Countdown Header */}
            <div className="flex items-center justify-between p-4 rounded-lg bg-background border border-border mb-4">
              <div>
                <h3 className="font-semibold text-lg">{selectedStudentData.name}</h3>
                <p className="text-sm text-muted-foreground">{selectedStudentData.cohort}</p>
              </div>
              <div className="text-right">
                <div className="flex items-center gap-2">
                  <Clock className="h-5 w-5 text-elec-yellow" />
                  <span className="text-3xl font-bold text-foreground">
                    {selectedStudentData.daysRemaining}
                  </span>
                </div>
                <p className="text-xs text-muted-foreground">days to EPA</p>
              </div>
            </div>

            {/* Overall Readiness */}
            <div className="mb-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium">Gateway Readiness</span>
                <div className="flex items-center gap-2">
                  <Badge className={getStatusColor(selectedStudentData.gatewayStatus)}>
                    {getStatusLabel(selectedStudentData.gatewayStatus)}
                  </Badge>
                  <span className="text-lg font-bold">{selectedStudentData.overallReadiness}%</span>
                </div>
              </div>
              <Progress value={selectedStudentData.overallReadiness} className="h-3" />
            </div>

            {/* Requirements Checklist */}
            <div className="space-y-2 mb-4">
              <h4 className="text-sm font-medium text-muted-foreground">Gateway Requirements</h4>
              {selectedStudentData.requirements.map(req => {
                const Icon = getCategoryIcon(req.category);
                return (
                  <div
                    key={req.id}
                    className="flex items-center gap-3 p-3 rounded-lg border border-border bg-background"
                  >
                    <div className={`p-2 rounded-lg ${getStatusColor(req.status)}`}>
                      <Icon className="h-4 w-4" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <p className="text-sm font-medium">{req.title}</p>
                        <span className="text-sm font-bold">{Math.round(req.progress)}%</span>
                      </div>
                      <p className="text-xs text-muted-foreground truncate">{req.description}</p>
                      <Progress value={req.progress} className="h-1.5 mt-1" />
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Gaps Analysis */}
            {selectedStudentData.gaps.length > 0 && (
              <div className="mb-4">
                <h4 className="text-sm font-medium text-muted-foreground mb-2 flex items-center gap-1">
                  <AlertCircle className="h-4 w-4 text-amber-500" />
                  Gaps to Address
                </h4>
                <div className="space-y-1">
                  {selectedStudentData.gaps.map((gap, idx) => (
                    <div
                      key={idx}
                      className="flex items-center gap-2 text-sm text-amber-500 bg-amber-500/10 px-3 py-2 rounded-lg"
                    >
                      <ChevronRight className="h-3 w-3" />
                      {gap}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* AI Recommendations */}
            {selectedStudentData.recommendations.length > 0 && (
              <div className="border-t border-border pt-4">
                <h4 className="text-sm font-medium text-muted-foreground mb-2 flex items-center gap-1">
                  <Sparkles className="h-4 w-4 text-elec-yellow" />
                  AI Recommendations
                </h4>
                <div className="space-y-1">
                  {selectedStudentData.recommendations.map((rec, idx) => (
                    <div
                      key={idx}
                      className="flex items-start gap-2 text-sm"
                    >
                      <TrendingUp className="h-3 w-3 text-elec-yellow mt-1 shrink-0" />
                      {rec}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </>
        )}

        {epaStudents.length === 0 && (
          <div className="text-center py-8 text-muted-foreground">
            <Award className="h-12 w-12 mx-auto mb-3 opacity-50" />
            <p>No students approaching EPA</p>
            <p className="text-sm mt-1">Students will appear here within 6 months of their planned EPA date</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
