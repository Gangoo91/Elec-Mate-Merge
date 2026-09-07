import { useState, useMemo } from 'react';
import { ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import { CARD_SURFACE } from '@/components/ui/card-recipe';
import { useCollegeSupabase } from '@/contexts/CollegeSupabaseContext';
import type { CollegeSection } from '@/pages/college/CollegeDashboard';

/* ==========================================================================
   EPACountdown — who is nearest the gateway, and how ready they are.

   Hub card language: 15px volt title, a one-line status breakdown, then
   HubWorkList rows (rule · learner · days to EPA · readiness · chevron).
   "At risk" is the one word that stays red.

   Data fix (2026-09-04): the calc read `epaRecord.studentId`,
   `plannedEndDate`, `portfolioComplete`, `offJobHours`, `cohort.endDate`,
   `student.progressPercentage` and `attendancePercentage` — none of which
   exist on the rows the context exposes. The planned date therefore always
   fell through to a made-up "180 days from now", so every active learner
   was "within 6 months of EPA" at 180 days and ~14% ready. It now reads
   `epa_date` → `gateway_date` → the learner's `expected_end_date` → the
   cohort's `end_date`, and a learner with no planned date is left out
   rather than given one. Off-the-job hours and "professional behaviours"
   were a hard-coded 0/370 and a constant 85% — no data behind either — so
   they no longer count toward readiness.
   ========================================================================== */

interface EPACountdownProps {
  onNavigate?: (section: CollegeSection) => void;
  studentId?: string; // If provided, show for specific student
  compact?: boolean;
}

interface GatewayRequirement {
  id: string;
  category: 'knowledge' | 'skills' | 'portfolio' | 'attendance';
  title: string;
  description: string;
  status: 'complete' | 'in_progress' | 'not_started' | 'at_risk';
  progress: number; // 0-100
}

type GatewayStatus = 'ready' | 'almost' | 'needs_work' | 'at_risk';

interface EPAStudent {
  id: string;
  name: string;
  cohort: string;
  plannedEndDate: string;
  daysRemaining: number;
  overallReadiness: number; // 0-100
  gatewayStatus: GatewayStatus;
  requirements: GatewayRequirement[];
  gaps: string[];
  recommendations: string[];
}

const STATUS_LABEL: Record<GatewayStatus, string> = {
  ready: 'Gateway ready',
  almost: 'Almost ready',
  needs_work: 'Needs work',
  at_risk: 'At risk',
};

const CARD = cn('overflow-hidden rounded-2xl border border-elec-yellow/35', CARD_SURFACE);
const ROW =
  'flex w-full items-center gap-3 px-4 py-3.5 text-left transition-colors touch-manipulation hover:bg-white/[0.06] active:bg-white/[0.09] sm:px-5';

export function EPACountdown({ onNavigate, studentId, compact = false }: EPACountdownProps) {
  const { students, epaRecords, cohorts, attendance: attendanceRecords } = useCollegeSupabase();
  const [selectedStudent, setSelectedStudent] = useState<string | null>(studentId || null);

  const attendanceByStudent = useMemo(() => {
    const map = new Map<string, { present: number; total: number }>();
    for (const r of attendanceRecords) {
      if (!r.student_id) continue;
      const entry = map.get(r.student_id) ?? { present: 0, total: 0 };
      entry.total += 1;
      if (r.status === 'Present' || r.status === 'Late') entry.present += 1;
      map.set(r.student_id, entry);
    }
    return map;
  }, [attendanceRecords]);

  const epaStudents = useMemo(() => {
    const calculateStudentEPA = (studentIdToCalc: string): EPAStudent | null => {
      const student = students.find((s) => s.id === studentIdToCalc);
      if (!student || student.status !== 'Active') return null;

      const epaRecord = epaRecords.find((e) => e.student_id === studentIdToCalc);
      const cohort = cohorts.find((c) => c.id === student.cohort_id);

      const plannedEndDate =
        epaRecord?.epa_date ||
        epaRecord?.gateway_date ||
        student.expected_end_date ||
        cohort?.end_date ||
        null;
      // No planned date means nothing to count down to. Inventing one would
      // put every learner on the list at the same distance.
      if (!plannedEndDate) return null;

      const endDate = new Date(plannedEndDate);
      const daysRemaining = Math.ceil((endDate.getTime() - Date.now()) / (1000 * 60 * 60 * 24));

      const requirements: GatewayRequirement[] = [];
      const gaps: string[] = [];
      const recommendations: string[] = [];

      // 1. Knowledge (theory) — from recorded progress
      const knowledgeProgress = student.progress_percent ?? 0;
      requirements.push({
        id: 'knowledge',
        category: 'knowledge',
        title: 'Knowledge criteria',
        description: 'All theory units completed and passed',
        status:
          knowledgeProgress >= 100
            ? 'complete'
            : knowledgeProgress >= 80
              ? 'in_progress'
              : 'at_risk',
        progress: Math.min(knowledgeProgress, 100),
      });
      if (knowledgeProgress < 100) {
        gaps.push(`Knowledge at ${knowledgeProgress}% — needs ${100 - knowledgeProgress}% more`);
        if (knowledgeProgress < 80) {
          recommendations.push('Prioritise completing outstanding theory units');
        }
      }

      // 2. Skills (practical) — estimated from progress
      const skillsProgress = Math.min(knowledgeProgress * 0.9, 100);
      requirements.push({
        id: 'skills',
        category: 'skills',
        title: 'Practical skills',
        description: 'All practical assessments demonstrated',
        status:
          skillsProgress >= 100 ? 'complete' : skillsProgress >= 70 ? 'in_progress' : 'at_risk',
        progress: skillsProgress,
      });
      if (skillsProgress < 100) {
        gaps.push(`Practical skills at ${Math.round(skillsProgress)}%`);
      }

      // 3. Portfolio evidence — estimated from progress
      const portfolioProgress = knowledgeProgress * 0.7;
      requirements.push({
        id: 'portfolio',
        category: 'portfolio',
        title: 'Portfolio evidence',
        description: 'Complete portfolio with mapped evidence',
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

      // 4. Attendance — only when something has been recorded
      const att = attendanceByStudent.get(studentIdToCalc);
      const attendance = att && att.total > 0 ? Math.round((att.present / att.total) * 100) : null;
      if (attendance !== null) {
        requirements.push({
          id: 'attendance',
          category: 'attendance',
          title: 'Attendance',
          description: `${attendance}% attendance rate`,
          status: attendance >= 90 ? 'complete' : attendance >= 80 ? 'in_progress' : 'at_risk',
          progress: Math.min(attendance, 100),
        });
        if (attendance < 90) {
          gaps.push(`Attendance at ${attendance}% (target: 90%)`);
          if (attendance < 80) {
            recommendations.push('Address attendance issues urgently');
          }
        }
      }

      const overallReadiness = Math.round(
        requirements.reduce((sum, r) => sum + r.progress, 0) / requirements.length
      );

      let gatewayStatus: GatewayStatus;
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

    if (studentId) {
      const result = calculateStudentEPA(studentId);
      return result ? [result] : [];
    }

    return students
      .map((s) => calculateStudentEPA(s.id))
      .filter((s): s is EPAStudent => s !== null)
      .filter((s) => s.daysRemaining <= 180) // Only show students within 6 months of EPA
      .sort((a, b) => a.daysRemaining - b.daysRemaining);
  }, [students, epaRecords, cohorts, attendanceByStudent, studentId]);

  const selectedStudentData = selectedStudent
    ? epaStudents.find((s) => s.id === selectedStudent)
    : epaStudents[0];

  const counts = {
    ready: epaStudents.filter((s) => s.gatewayStatus === 'ready').length,
    almost: epaStudents.filter((s) => s.gatewayStatus === 'almost').length,
    needsWork: epaStudents.filter((s) => s.gatewayStatus === 'needs_work').length,
    atRisk: epaStudents.filter((s) => s.gatewayStatus === 'at_risk').length,
  };

  const Row = ({ student }: { student: EPAStudent }) => {
    const urgent = student.gatewayStatus === 'at_risk' || student.daysRemaining < 30;
    return (
      <button type="button" onClick={() => onNavigate?.('epatracking')} className={ROW}>
        <span
          aria-hidden="true"
          className={cn(
            'h-8 w-[3px] shrink-0 rounded-full',
            urgent ? 'bg-elec-yellow' : 'bg-white/[0.25]'
          )}
        />
        <span className="min-w-0 flex-1">
          <span className="block truncate text-[14px] font-semibold leading-tight text-white">
            {student.name}
          </span>
          <span className="mt-0.5 block truncate text-[12px] leading-tight text-white">
            {student.daysRemaining} days to EPA ·{' '}
            {student.gatewayStatus === 'at_risk' ? (
              <span className="font-semibold text-red-300">At risk</span>
            ) : (
              STATUS_LABEL[student.gatewayStatus]
            )}
          </span>
        </span>
        <span
          className={cn(
            'shrink-0 text-[13px] font-semibold tabular-nums',
            urgent ? 'text-elec-yellow' : 'text-white'
          )}
        >
          {student.overallReadiness}%
        </span>
        <ChevronRight className="h-4 w-4 shrink-0 text-white" aria-hidden="true" />
      </button>
    );
  };

  const breakdown = (
    [
      counts.atRisk > 0 ? (
        <span key="r" className="font-semibold text-red-300">
          {counts.atRisk} at risk
        </span>
      ) : null,
      counts.needsWork > 0 ? <span key="n">{counts.needsWork} need work</span> : null,
      counts.almost > 0 ? <span key="a">{counts.almost} almost ready</span> : null,
      counts.ready > 0 ? <span key="g">{counts.ready} ready</span> : null,
    ] as Array<JSX.Element | null>
  ).filter((n): n is JSX.Element => n !== null);

  if (compact) {
    return (
      <section className={CARD}>
        <div className="flex items-end justify-between gap-4 px-4 py-3.5 sm:px-5">
          <h3 className="text-[15px] font-semibold tracking-tight text-elec-yellow">EPA gateway</h3>
          <span
            className={cn(
              'text-[11px] font-semibold tabular-nums',
              counts.atRisk > 0 ? 'text-elec-yellow' : 'text-white'
            )}
          >
            {epaStudents.length} within 6 months
          </span>
        </div>

        {epaStudents.length > 0 ? (
          <>
            {breakdown.length > 0 && (
              <p className="px-4 pb-3 text-[12px] leading-snug text-white sm:px-5">
                {breakdown.map((node, i) => (
                  <span key={node.key}>
                    {i > 0 ? ' · ' : ''}
                    {node}
                  </span>
                ))}
              </p>
            )}
            <ul className="divide-y divide-white/[0.10] border-t border-white/[0.10]">
              {epaStudents.slice(0, 3).map((student) => (
                <li key={student.id}>
                  <Row student={student} />
                </li>
              ))}
            </ul>
          </>
        ) : (
          <p className="border-t border-white/[0.10] px-4 py-4 text-[12.5px] leading-snug text-white sm:px-5">
            No learners within 6 months of a planned EPA date.
          </p>
        )}

        <button
          type="button"
          onClick={() => onNavigate?.('epatracking')}
          className="flex h-11 w-full items-center justify-center border-t border-white/[0.10] text-[12.5px] font-semibold text-white transition-colors touch-manipulation hover:bg-white/[0.06] active:bg-white/[0.09]"
        >
          View EPA tracking
        </button>
      </section>
    );
  }

  return (
    <section className={CARD}>
      <div className="flex items-end justify-between gap-4 px-4 py-3.5 sm:px-5">
        <h3 className="text-[15px] font-semibold tracking-tight text-elec-yellow">
          Gateway countdown
        </h3>
        {epaStudents.length > 0 && (
          <span className="text-[11px] font-semibold tabular-nums text-white">
            {epaStudents.length} within 6 months
          </span>
        )}
      </div>

      {epaStudents.length > 1 && !studentId && (
        <div className="hide-scrollbar flex gap-2 overflow-x-auto px-4 pb-3.5 sm:px-5">
          {epaStudents.slice(0, 5).map((student) => {
            const selected =
              selectedStudent === student.id || (!selectedStudent && student === epaStudents[0]);
            return (
              <button
                key={student.id}
                type="button"
                onClick={() => setSelectedStudent(student.id)}
                className={cn(
                  'inline-flex h-11 shrink-0 items-center gap-2 rounded-xl px-3.5 text-[12.5px] font-semibold transition-colors touch-manipulation',
                  selected
                    ? 'bg-elec-yellow text-black'
                    : 'border border-white/[0.18] text-white hover:bg-white/[0.06]'
                )}
              >
                {student.name.split(' ')[0]}
                <span className={cn('tabular-nums', selected ? 'text-black/70' : 'text-white')}>
                  {student.daysRemaining}d
                </span>
              </button>
            );
          })}
        </div>
      )}

      {selectedStudentData ? (
        <>
          <div className="flex items-center gap-3 border-t border-white/[0.10] px-4 py-3.5 sm:px-5">
            <span
              aria-hidden="true"
              className={cn(
                'h-8 w-[3px] shrink-0 rounded-full',
                selectedStudentData.gatewayStatus === 'at_risk' ||
                  selectedStudentData.daysRemaining < 30
                  ? 'bg-elec-yellow'
                  : 'bg-white/[0.25]'
              )}
            />
            <span className="min-w-0 flex-1">
              <span className="block truncate text-[14px] font-semibold leading-tight text-white">
                {selectedStudentData.name}
              </span>
              <span className="mt-0.5 block truncate text-[12px] leading-tight text-white">
                {selectedStudentData.cohort} ·{' '}
                {selectedStudentData.gatewayStatus === 'at_risk' ? (
                  <span className="font-semibold text-red-300">At risk</span>
                ) : (
                  STATUS_LABEL[selectedStudentData.gatewayStatus]
                )}
              </span>
            </span>
            <span className="shrink-0 text-right">
              <span className="block text-[22px] font-semibold leading-none tabular-nums text-elec-yellow">
                {selectedStudentData.daysRemaining}
              </span>
              <span className="mt-1 block text-[11px] text-white">days to EPA</span>
            </span>
          </div>

          <div className="border-t border-white/[0.10] px-4 py-3.5 sm:px-5">
            <div className="flex items-baseline justify-between text-[12px] text-white">
              <span className="font-semibold">Gateway readiness</span>
              <span className="font-semibold tabular-nums">
                {selectedStudentData.overallReadiness}%
              </span>
            </div>
            <div className="mt-1.5 h-1 overflow-hidden rounded-full bg-white/[0.10]">
              <div
                className="h-full rounded-full bg-white transition-all"
                style={{ width: `${selectedStudentData.overallReadiness}%` }}
              />
            </div>
          </div>

          <ul className="divide-y divide-white/[0.10] border-t border-white/[0.10]">
            {selectedStudentData.requirements.map((req) => (
              <li key={req.id} className="px-4 py-3 sm:px-5">
                <div className="flex items-baseline justify-between gap-2">
                  <div className="truncate text-[13px] font-semibold text-white">{req.title}</div>
                  <span className="shrink-0 text-[13px] font-semibold tabular-nums text-white">
                    {Math.round(req.progress)}%
                  </span>
                </div>
                <div className="mt-0.5 truncate text-[12px] text-white">{req.description}</div>
                <div className="mt-2 h-1 overflow-hidden rounded-full bg-white/[0.10]">
                  <div
                    className="h-full rounded-full bg-white"
                    style={{ width: `${req.progress}%` }}
                  />
                </div>
              </li>
            ))}
          </ul>

          {selectedStudentData.gaps.length > 0 && (
            <div className="border-t border-white/[0.10] px-4 py-3.5 sm:px-5">
              <div className="text-[12px] font-semibold text-white">Gaps to address</div>
              <ul className="mt-1.5 space-y-1 text-[12px] leading-snug text-white">
                {selectedStudentData.gaps.map((gap, idx) => (
                  <li key={idx}>— {gap}</li>
                ))}
              </ul>
            </div>
          )}

          {selectedStudentData.recommendations.length > 0 && (
            <div className="border-t border-white/[0.10] px-4 py-3.5 sm:px-5">
              <div className="text-[12px] font-semibold text-white">Recommended next steps</div>
              <ul className="mt-1.5 space-y-1 text-[12px] leading-snug text-white">
                {selectedStudentData.recommendations.map((rec, idx) => (
                  <li key={idx}>— {rec}</li>
                ))}
              </ul>
            </div>
          )}
        </>
      ) : (
        <p className="border-t border-white/[0.10] px-4 py-4 text-[12.5px] leading-snug text-white sm:px-5">
          No learners within 6 months of a planned EPA date. Learners appear here once an EPA
          date, gateway date or expected end date is on their record.
        </p>
      )}
    </section>
  );
}
