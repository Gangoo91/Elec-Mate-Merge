import { useMemo } from 'react';
import { useCollegeCan } from '@/hooks/useCollegeCan';
import { FormSheet } from '@/components/forms/FormSheet';
import { buttonPrimaryCn, buttonSecondaryCn } from '@/components/forms/fieldStyles';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useCollegeSupabase } from '@/contexts/CollegeSupabaseContext';
import type { CollegeStaff } from '@/contexts/CollegeSupabaseContext';
import { getInitials, getRoleLabel, formatUKDateShort } from '@/utils/collegeHelpers';
import { cn } from '@/lib/utils';

const sectionTitleCn = 'text-[15px] font-semibold text-white';
const rowCn = 'flex items-baseline justify-between gap-4 border-b border-white/[0.06] py-2.5 text-[14px] last:border-b-0';

const statusTextCn = (status: string | null | undefined) =>
  status === 'Active' ? 'text-emerald-400' : status === 'On Leave' ? 'text-orange-300' : 'text-white';

interface StaffDetailSheetProps {
  staff: CollegeStaff | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onEdit?: (staff: CollegeStaff) => void;
}

export function StaffDetailSheet({ staff, open, onOpenChange, onEdit }: StaffDetailSheetProps) {
  // ELE-1898: Edit shows for people who can manage staff, and for your own row.
  const { can, staffId: myStaffId } = useCollegeCan();
  const canEdit = !!staff && (can('staff.manage') || staff.id === myStaffId);
  const { cohorts, students } = useCollegeSupabase();

  const assignedCohorts = useMemo(() => {
    if (!staff) return [];
    return cohorts.filter((c) => c.tutor_id === staff.id);
  }, [staff, cohorts]);

  const activeCohorts = useMemo(
    () => assignedCohorts.filter((c) => c.status === 'Active'),
    [assignedCohorts]
  );

  const getStudentCount = (cohortId: string): number =>
    students.filter((s) => s.cohort_id === cohortId && s.status === 'Active').length;

  const totalStudents = useMemo(
    () => activeCohorts.reduce((sum, c) => sum + getStudentCount(c.id), 0),
    [activeCohorts, students]
  );

  if (!staff) return null;

  const quals = [
    { label: 'Teaching', value: staff.teaching_qual },
    { label: 'Assessor', value: staff.assessor_qual },
    { label: 'IQA', value: staff.iqa_qual },
  ].filter((q) => !!q.value);

  return (
    <FormSheet
      open={open}
      onOpenChange={onOpenChange}
      width="wide"
      bodyClassName="grid grid-cols-1 items-start gap-x-10 gap-y-6 lg:grid-cols-2"
      eyebrow="Staff"
      title={staff.name}
      description={
        <>
          {getRoleLabel(staff.role)} · {staff.department || 'No department'} ·{' '}
          <span className={statusTextCn(staff.status)}>{staff.status}</span>
        </>
      }
      headerTrailing={
        <Avatar className="mr-8 h-11 w-11 shrink-0 ring-1 ring-white/[0.08]">
          <AvatarImage src={staff.photo_url ?? undefined} />
          <AvatarFallback className="bg-white/[0.08] text-[15px] font-semibold text-white">
            {getInitials(staff.name)}
          </AvatarFallback>
        </Avatar>
      }
      footer={
        <div className={canEdit ? 'grid grid-cols-2 gap-2.5' : 'grid grid-cols-1'}>
          <button type="button" onClick={() => onOpenChange(false)} className={buttonSecondaryCn}>
            Close
          </button>
          {canEdit ? (
            <button type="button" onClick={() => onEdit?.(staff)} className={buttonPrimaryCn}>
              Edit
            </button>
          ) : null}
        </div>
      }
    >
      <div className="space-y-6">
        <div className="grid grid-cols-3 divide-x divide-white/[0.08] border-y border-white/[0.08] py-4">
          {[
            { label: 'Active cohorts', value: activeCohorts.length },
            { label: 'Learners', value: totalStudents },
            { label: 'Max hours a week', value: staff.max_teaching_hours ?? '—' },
          ].map((stat) => (
            <div key={stat.label} className="px-3 text-center first:pl-0 last:pr-0">
              <div className="text-[24px] font-semibold leading-none tabular-nums text-white">{stat.value}</div>
              <div className="mt-2 text-[12px] text-white">{stat.label}</div>
            </div>
          ))}
        </div>

        <section>
          <div className="flex items-baseline justify-between gap-3">
            <h3 className={sectionTitleCn}>Contact</h3>
            <div className="flex items-center gap-4">
              {staff.phone && (
                <a
                  href={`tel:${staff.phone}`}
                  className="text-[13px] font-semibold text-elec-yellow touch-manipulation"
                >
                  Call
                </a>
              )}
              <a
                href={`mailto:${staff.email}`}
                className="text-[13px] font-semibold text-elec-yellow touch-manipulation"
              >
                Email
              </a>
            </div>
          </div>
          <div className="mt-2">
            <div className={rowCn}>
              <span className="text-white">Email</span>
              <a href={`mailto:${staff.email}`} className="min-w-0 truncate text-right text-white hover:text-elec-yellow">
                {staff.email}
              </a>
            </div>
            {staff.phone && (
              <div className={rowCn}>
                <span className="text-white">Phone</span>
                <a href={`tel:${staff.phone}`} className="tabular-nums text-white hover:text-elec-yellow">
                  {staff.phone}
                </a>
              </div>
            )}
            <div className={rowCn}>
              <span className="text-white">Department</span>
              <span className="text-right text-white">{staff.department || '—'}</span>
            </div>
            {staff.max_teaching_hours && (
              <div className={rowCn}>
                <span className="text-white">Max hours</span>
                <span className="tabular-nums text-white">{staff.max_teaching_hours}h a week</span>
              </div>
            )}
          </div>
        </section>

        <section className="border-t border-white/[0.08] pt-5">
          <h3 className={sectionTitleCn}>Qualifications</h3>
          {quals.length === 0 ? (
            <p className="mt-2 text-[13px] text-white">No qualifications recorded.</p>
          ) : (
            <div className="mt-2">
              {quals.map((q) => (
                <div key={q.label} className={rowCn}>
                  <span className="text-white">{q.label}</span>
                  <span className="text-right font-medium text-white">{q.value}</span>
                </div>
              ))}
            </div>
          )}
        </section>

        {staff.specialisations && staff.specialisations.length > 0 && (
          <section className="border-t border-white/[0.08] pt-5">
            <h3 className={sectionTitleCn}>Specialisations</h3>
            <div className="mt-3 flex flex-wrap gap-1.5">
              {staff.specialisations.map((spec, i) => (
                <span
                  key={i}
                  className="rounded-full border border-white/[0.12] bg-white/[0.06] px-3 py-1 text-[12.5px] font-medium text-white"
                >
                  {spec}
                </span>
              ))}
            </div>
          </section>
        )}
      </div>

      <section className="border-t border-white/[0.08] pt-5 lg:border-t-0 lg:pt-0">
        <h3 className={sectionTitleCn}>
          Cohorts{assignedCohorts.length > 0 ? ` (${assignedCohorts.length})` : ''}
        </h3>
        {assignedCohorts.length === 0 ? (
          <p className="mt-2 text-[13px] text-white">
            Not assigned to any cohorts yet.
          </p>
        ) : (
          <div className="mt-2">
            {assignedCohorts.map((cohort) => {
              const studentCount = getStudentCount(cohort.id);
              const maxStudents = cohort.max_students ?? 20;
              const capacityPercent = Math.min(100, (studentCount / maxStudents) * 100);
              return (
                <div key={cohort.id} className="border-b border-white/[0.06] py-3.5 last:border-b-0">
                  <div className="flex items-baseline justify-between gap-3">
                    <div className="min-w-0 truncate text-[14px] font-medium text-white">{cohort.name}</div>
                    <span
                      className={cn(
                        'shrink-0 text-[12.5px] font-medium',
                        cohort.status === 'Active' ? 'text-emerald-400' : 'text-white'
                      )}
                    >
                      {cohort.status}
                    </span>
                  </div>
                  <div className="mt-2 flex items-baseline justify-between text-[12px] text-white">
                    <span className="tabular-nums">
                      {formatUKDateShort(cohort.start_date)} → {formatUKDateShort(cohort.end_date)}
                    </span>
                    <span className="tabular-nums">
                      {studentCount}/{maxStudents} learners
                    </span>
                  </div>
                  <div className="mt-1.5 h-1 overflow-hidden rounded-full bg-white/[0.06]">
                    <div className="h-full rounded-full bg-elec-yellow" style={{ width: `${capacityPercent}%` }} />
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </section>
    </FormSheet>
  );
}
