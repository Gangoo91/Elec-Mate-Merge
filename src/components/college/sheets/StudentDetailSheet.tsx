import { useState, useMemo, type ReactNode } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { AttendanceHeatmap } from '@/components/college/ui/AttendanceHeatmap';
import { useCollegeSupabase } from '@/contexts/CollegeSupabaseContext';
import type { CollegeStudent } from '@/contexts/CollegeSupabaseContext';
import { useCollegeSettings } from '@/hooks/college/useCollegeSettings';
import { getInitials, formatUKDateShort, computeAttendanceRate } from '@/utils/collegeHelpers';
import { cn } from '@/lib/utils';
import { FormSheet } from '@/components/forms/FormSheet';
import { buttonPrimaryCn, buttonSecondaryCn } from '@/components/forms/fieldStyles';
import { chipCn } from '@/components/college/ui/CollegeUi';

interface StudentDetailSheetProps {
  student: CollegeStudent | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onEdit?: (student: CollegeStudent) => void;
  onWithdraw?: (student: CollegeStudent) => void;
}

const TABS = [
  { value: 'overview', label: 'Overview' },
  { value: 'attendance', label: 'Attendance' },
  { value: 'ilp', label: 'ILP' },
  { value: 'notes', label: 'Notes' },
] as const;

function SectionHeading({ children }: { children: ReactNode }) {
  return (
    <h3 className="border-b border-white/[0.08] pb-2 text-[15px] font-semibold text-white">{children}</h3>
  );
}

function Fact({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div className="min-w-0">
      <div className="text-[12px] font-medium text-white">{label}</div>
      <div className="mt-1 truncate text-[14px] font-semibold tabular-nums text-white">{children}</div>
    </div>
  );
}

function Empty({ title, description }: { title: string; description?: string }) {
  return (
    <div className="rounded-xl border border-dashed border-white/[0.12] px-4 py-6 text-center">
      <p className="text-[14px] font-semibold text-white">{title}</p>
      {description ? <p className="mt-1 text-[13px] text-white">{description}</p> : null}
    </div>
  );
}

const attendanceTextTone = (s: string | null) =>
  s === 'Present'
    ? 'text-emerald-400'
    : s === 'Absent'
      ? 'text-red-400'
      : s === 'Late'
        ? 'text-orange-300'
        : 'text-white';

const targetTextTone = (s: string) =>
  s === 'Achieved' ? 'text-emerald-400' : s === 'Overdue' ? 'text-orange-300' : 'text-white';

export function StudentDetailSheet({
  student,
  open,
  onOpenChange,
  onEdit,
  onWithdraw,
}: StudentDetailSheetProps) {
  const { attendance, cohorts, ilps } = useCollegeSupabase();
  const { settings } = useCollegeSettings();
  const lowAttendance = settings.low_attendance_threshold_percent;
  const highAttendance = settings.high_attendance_threshold_percent;
  const [activeTab, setActiveTab] = useState<string>('overview');

  const studentAttendance = useMemo(() => {
    if (!student) return [];
    return attendance
      .filter((a) => a.student_id === student.id)
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  }, [student, attendance]);

  const attendanceRate = useMemo(
    () => computeAttendanceRate(studentAttendance),
    [studentAttendance]
  );

  const cohortName = useMemo(() => {
    if (!student?.cohort_id) return 'Unassigned';
    return cohorts.find((c) => c.id === student.cohort_id)?.name || 'Unknown';
  }, [student, cohorts]);

  const studentILP = useMemo(() => {
    if (!student) return null;
    return ilps.find((ilp) => ilp.student_id === student.id && (ilp.status ?? '').toLowerCase() === 'active') || null;
  }, [student, ilps]);

  if (!student) return null;

  const progressPercent = student.progress_percent ?? 0;
  const isAtRisk = ['medium', 'high', 'critical'].includes((student.risk_level ?? '').toLowerCase());

  const attendancePctTone =
    attendanceRate >= highAttendance
      ? 'text-emerald-400'
      : attendanceRate >= lowAttendance
        ? 'text-orange-300'
        : 'text-red-400';
  const progressPctTone =
    progressPercent >= 70 ? 'text-emerald-400' : progressPercent >= 50 ? 'text-orange-300' : 'text-red-400';

  // The host may open this read-only (Progress tracking passes no handlers):
  // only offer the buttons that do something.
  const canWithdraw = student.status === 'Active' && !!onWithdraw;
  const canEdit = !!onEdit;
  const footerCols = 1 + (canWithdraw ? 1 : 0) + (canEdit ? 1 : 0);

  return (
    <FormSheet
      open={open}
      onOpenChange={onOpenChange}
      width="wide"
      eyebrow="Student"
      title={
        <span className="flex items-center gap-3">
          <Avatar className="h-11 w-11 shrink-0 ring-1 ring-white/[0.08]">
            <AvatarImage src={student.photo_url ?? undefined} />
            <AvatarFallback className="bg-white/[0.08] text-[14px] font-semibold text-white">
              {getInitials(student.name)}
            </AvatarFallback>
          </Avatar>
          <span className="min-w-0 truncate">{student.name}</span>
        </span>
      }
      description={
        <span>
          {[student.uln ? `ULN ${student.uln}` : null, cohortName, student.status].filter(Boolean).join(' · ')}
          {isAtRisk ? (
            <span className="font-semibold text-orange-300"> · {student.risk_level} risk</span>
          ) : null}
        </span>
      }
      headerTrailing={
        <div className="flex items-center gap-4">
          {student.phone && (
            <a
              href={`tel:${student.phone}`}
              className="inline-flex h-11 items-center text-[13px] font-semibold text-elec-yellow touch-manipulation"
            >
              Call
            </a>
          )}
          <a
            href={`mailto:${student.email}`}
            className="inline-flex h-11 items-center text-[13px] font-semibold text-elec-yellow touch-manipulation"
          >
            Email
          </a>
        </div>
      }
      subheader={
        <div role="tablist" aria-label="Student sections" className="flex gap-2 overflow-x-auto pb-3">
          {TABS.map((t) => (
            <button
              key={t.value}
              type="button"
              role="tab"
              aria-selected={activeTab === t.value}
              onClick={() => setActiveTab(t.value)}
              className={chipCn(activeTab === t.value)}
            >
              {t.label}
            </button>
          ))}
        </div>
      }
      bodyClassName="pt-5"
      footer={
        <div
          className={cn(
            'grid gap-2.5',
            footerCols === 3 ? 'grid-cols-3' : footerCols === 2 ? 'grid-cols-2' : 'grid-cols-1'
          )}
        >
          <button type="button" onClick={() => onOpenChange(false)} className={buttonSecondaryCn}>
            Close
          </button>
          {canWithdraw && (
            <button
              type="button"
              onClick={() => onWithdraw?.(student)}
              className={cn(buttonSecondaryCn, 'text-red-400')}
            >
              Withdraw
            </button>
          )}
          {canEdit && (
            <button type="button" onClick={() => onEdit?.(student)} className={buttonPrimaryCn}>
              Edit
            </button>
          )}
        </div>
      }
    >
      {activeTab === 'overview' && (
        <div className="grid grid-cols-1 items-start gap-x-10 gap-y-8 lg:grid-cols-2">
          <div className="min-w-0 space-y-8">
            <section className="space-y-4">
              <SectionHeading>Contact</SectionHeading>
              <div className="space-y-3 text-[14px]">
                <div className="flex items-center justify-between gap-3">
                  <span className="text-white">Email</span>
                  <a
                    href={`mailto:${student.email}`}
                    className="max-w-[65%] truncate font-medium text-white hover:text-elec-yellow"
                  >
                    {student.email}
                  </a>
                </div>
                {student.phone && (
                  <div className="flex items-center justify-between gap-3">
                    <span className="text-white">Phone</span>
                    <a
                      href={`tel:${student.phone}`}
                      className="font-medium tabular-nums text-white hover:text-elec-yellow"
                    >
                      {student.phone}
                    </a>
                  </div>
                )}
              </div>
            </section>

            <section className="space-y-4">
              <SectionHeading>Enrolment</SectionHeading>
              <div className="grid grid-cols-2 gap-x-6 gap-y-4">
                <Fact label="Cohort">{cohortName}</Fact>
                <Fact label="Status">{student.status}</Fact>
                <Fact label="Start">{formatUKDateShort(student.start_date)}</Fact>
                <Fact label="Expected end">{formatUKDateShort(student.expected_end_date)}</Fact>
              </div>
            </section>
          </div>

          <section className="min-w-0 space-y-4">
            <SectionHeading>Progress</SectionHeading>
            <div className="flex items-baseline justify-between">
              <span className="text-[14px] text-white">Overall</span>
              <span className={cn('text-3xl font-semibold tabular-nums', progressPctTone)}>
                {progressPercent}%
              </span>
            </div>
            <div className="h-1 overflow-hidden rounded-full bg-white/[0.06]">
              <div
                className="h-full rounded-full bg-elec-yellow transition-all"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
            <div className="grid grid-cols-2 gap-6 border-t border-white/[0.08] pt-4">
              <div>
                <div className="text-[12px] font-medium text-white">Attendance</div>
                <div className={cn('mt-1 text-2xl font-semibold leading-none tabular-nums', attendancePctTone)}>
                  {attendanceRate}%
                </div>
              </div>
              <div>
                <div className="text-[12px] font-medium text-white">Complete</div>
                <div className={cn('mt-1 text-2xl font-semibold leading-none tabular-nums', progressPctTone)}>
                  {progressPercent}%
                </div>
              </div>
            </div>
          </section>
        </div>
      )}

      {activeTab === 'attendance' && (
        <div className="grid grid-cols-1 items-start gap-x-10 gap-y-8 lg:grid-cols-2">
          <div className="min-w-0 space-y-8">
            <section className="space-y-4">
              <SectionHeading>Attendance rate</SectionHeading>
              <div className="flex items-baseline justify-between">
                <div className={cn('text-4xl font-semibold leading-none tabular-nums', attendancePctTone)}>
                  {attendanceRate}%
                </div>
                <div className="text-right text-[12px] tabular-nums text-white">
                  <div>{studentAttendance.length} sessions</div>
                  <div>{studentAttendance.filter((a) => a.status === 'Present').length} present</div>
                </div>
              </div>
              <div className="h-1 overflow-hidden rounded-full bg-white/[0.06]">
                <div
                  className={cn(
                    'h-full rounded-full transition-all',
                    attendanceRate >= highAttendance
                      ? 'bg-emerald-400'
                      : attendanceRate >= lowAttendance
                        ? 'bg-orange-300'
                        : 'bg-red-400'
                  )}
                  style={{ width: `${attendanceRate}%` }}
                />
              </div>
            </section>

            <section className="space-y-4">
              <SectionHeading>Last 8 weeks</SectionHeading>
              <AttendanceHeatmap
                records={studentAttendance.map((a) => ({
                  date: a.date,
                  status: a.status,
                }))}
                weeks={8}
              />
            </section>
          </div>

          <section className="min-w-0 space-y-4">
            <SectionHeading>Recent records</SectionHeading>
            {studentAttendance.length === 0 ? (
              <Empty title="No attendance records yet" />
            ) : (
              <ul className="divide-y divide-white/[0.08]">
                {studentAttendance.slice(0, 10).map((record) => (
                  <li key={record.id} className="flex items-start justify-between gap-3 py-3">
                    <div className="min-w-0">
                      <div className="text-[14px] font-medium text-white">
                        {new Date(record.date).toLocaleDateString('en-GB', {
                          weekday: 'long',
                          day: 'numeric',
                          month: 'short',
                        })}
                      </div>
                      {record.notes ? (
                        <div className="mt-0.5 text-[13px] text-white">{record.notes}</div>
                      ) : null}
                    </div>
                    <span className={cn('shrink-0 text-[13px] font-semibold', attendanceTextTone(record.status))}>
                      {record.status}
                    </span>
                  </li>
                ))}
              </ul>
            )}
          </section>
        </div>
      )}

      {activeTab === 'ilp' &&
        (studentILP ? (
          <div className="grid grid-cols-1 items-start gap-x-10 gap-y-8 lg:grid-cols-2">
            <section className="min-w-0 space-y-4">
              <div className="flex items-baseline justify-between gap-3 border-b border-white/[0.08] pb-2">
                <h3 className="text-[15px] font-semibold text-white">Individual learning plan</h3>
                <span
                  className={cn(
                    'text-[13px] font-semibold',
                    (studentILP.status ?? '').toLowerCase() === 'active' ? 'text-emerald-400' : 'text-white'
                  )}
                >
                  {studentILP.status
                    ? studentILP.status.charAt(0).toUpperCase() + studentILP.status.slice(1)
                    : ''}
                </span>
              </div>
              <div className="grid grid-cols-2 gap-x-6 gap-y-4">
                <Fact label="Next review">{formatUKDateShort(studentILP.review_date)}</Fact>
                <Fact label="Last reviewed">{formatUKDateShort(studentILP.last_reviewed)}</Fact>
              </div>
              {studentILP.support_needs && (
                <div className="border-t border-white/[0.08] pt-4">
                  <div className="text-[12px] font-medium text-white">Support needs</div>
                  <p className="mt-1.5 text-[14px] leading-relaxed text-white">{studentILP.support_needs}</p>
                </div>
              )}
            </section>

            <section className="min-w-0 space-y-4">
              <SectionHeading>Targets</SectionHeading>
              {!studentILP.targets || studentILP.targets.length === 0 ? (
                <Empty title="No targets set yet" />
              ) : (
                <ul className="divide-y divide-white/[0.08]">
                  {studentILP.targets.map((target, i) => (
                    <li key={i} className="flex items-start justify-between gap-3 py-3">
                      <div className="min-w-0">
                        <div className="text-[14px] font-medium text-white">{target.description}</div>
                        <div className="mt-0.5 text-[13px] tabular-nums text-white">
                          Due {formatUKDateShort(target.target_date)}
                        </div>
                      </div>
                      <span className={cn('shrink-0 text-[13px] font-semibold', targetTextTone(target.status))}>
                        {target.status}
                      </span>
                    </li>
                  ))}
                </ul>
              )}
            </section>
          </div>
        ) : (
          <Empty
            title="No active ILP"
            description="This student does not have an active individual learning plan."
          />
        ))}

      {activeTab === 'notes' && (
        <Empty
          title="Notes coming soon"
          description="Student notes and the communication log will appear here."
        />
      )}
    </FormSheet>
  );
}
