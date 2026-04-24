import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetFooter } from '@/components/ui/sheet';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useCollegeSupabase } from '@/contexts/CollegeSupabaseContext';
import type { CollegeStaff } from '@/contexts/CollegeSupabaseContext';
import { getInitials, getRoleLabel, formatUKDateShort } from '@/utils/collegeHelpers';
import {
  ListCard,
  Pill,
  EmptyState,
  FormCard,
  Eyebrow,
  PrimaryButton,
  SecondaryButton,
  type Tone,
} from '@/components/college/primitives';

interface StaffDetailSheetProps {
  staff: CollegeStaff | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onEdit?: (staff: CollegeStaff) => void;
}

const tabVariants = {
  enter: { opacity: 0, x: 20 },
  center: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: -20 },
};

export function StaffDetailSheet({ staff, open, onOpenChange, onEdit }: StaffDetailSheetProps) {
  const { cohorts, students } = useCollegeSupabase();
  const [activeTab, setActiveTab] = useState('details');

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

  const statusTone: Tone =
    staff.status === 'Active'
      ? 'green'
      : staff.status === 'On Leave'
        ? 'amber'
        : 'red';

  const cohortStatusTone = (status: string | null): Tone =>
    status === 'Active'
      ? 'green'
      : status === 'Planning'
        ? 'blue'
        : status === 'Completed'
          ? 'yellow'
          : 'red';

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent
        side="bottom"
        className="h-[85vh] p-0 overflow-hidden bg-[hsl(0_0%_8%)]"
      >
        <div className="flex flex-col h-full bg-[hsl(0_0%_8%)]">
          <div className="flex justify-center pt-2.5 pb-1 flex-shrink-0">
            <div className="h-1 w-10 rounded-full bg-white/20" />
          </div>

          <SheetHeader className="flex-shrink-0 border-b border-white/[0.08] px-5 pb-5">
            <div className="flex items-start gap-4">
              <Avatar className="h-16 w-16 shrink-0 ring-1 ring-white/[0.08]">
                <AvatarImage src={staff.photo_url ?? undefined} />
                <AvatarFallback className="bg-blue-500/10 text-blue-400 text-lg font-semibold">
                  {getInitials(staff.name)}
                </AvatarFallback>
              </Avatar>

              <div className="flex-1 min-w-0">
                <Eyebrow>Staff</Eyebrow>
                <SheetTitle className="mt-1 text-xl text-left text-white">{staff.name}</SheetTitle>
                <p className="mt-0.5 text-[11.5px] text-white">{staff.department || 'No department'}</p>
                <div className="flex flex-wrap gap-1.5 mt-3">
                  <Pill tone={statusTone}>{staff.status}</Pill>
                  <Pill tone="blue">{getRoleLabel(staff.role)}</Pill>
                  {activeCohorts.length > 0 && (
                    <Pill tone="yellow">
                      {activeCohorts.length} cohort{activeCohorts.length !== 1 ? 's' : ''}
                    </Pill>
                  )}
                </div>
              </div>
            </div>

            <div className="flex items-center gap-4 mt-5">
              {staff.phone && (
                <a
                  href={`tel:${staff.phone}`}
                  className="text-[12.5px] font-medium text-white hover:text-elec-yellow transition-colors touch-manipulation"
                >
                  Call
                </a>
              )}
              <a
                href={`mailto:${staff.email}`}
                className="text-[12.5px] font-medium text-white hover:text-elec-yellow transition-colors touch-manipulation"
              >
                Email
              </a>
            </div>
          </SheetHeader>

          <Tabs
            value={activeTab}
            onValueChange={setActiveTab}
            className="flex-1 flex flex-col overflow-hidden"
          >
            <TabsList className="w-full justify-start gap-0 h-auto p-0 bg-transparent rounded-none border-b border-white/[0.08] flex-shrink-0">
              {['details', 'cohorts', 'notes'].map((tab) => (
                <TabsTrigger
                  key={tab}
                  value={tab}
                  className="flex-1 h-11 touch-manipulation text-[12.5px] font-medium text-white data-[state=active]:text-elec-yellow data-[state=active]:bg-transparent rounded-none capitalize"
                >
                  {tab}
                </TabsTrigger>
              ))}
            </TabsList>

            <div className="flex-1 overflow-y-auto overscroll-contain">
              <AnimatePresence mode="wait">
                {activeTab === 'details' && (
                  <motion.div
                    key="details"
                    variants={tabVariants}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    transition={{ duration: 0.2 }}
                    className="p-5 space-y-5"
                  >
                    <FormCard eyebrow="Contact">
                      <div className="space-y-2 text-[13px]">
                        <div className="flex items-center justify-between">
                          <span className="text-white">Email</span>
                          <a
                            href={`mailto:${staff.email}`}
                            className="text-white hover:text-elec-yellow truncate ml-3 max-w-[60%]"
                          >
                            {staff.email}
                          </a>
                        </div>
                        {staff.phone && (
                          <div className="flex items-center justify-between">
                            <span className="text-white">Phone</span>
                            <a
                              href={`tel:${staff.phone}`}
                              className="text-white hover:text-elec-yellow tabular-nums"
                            >
                              {staff.phone}
                            </a>
                          </div>
                        )}
                        <div className="flex items-center justify-between">
                          <span className="text-white">Department</span>
                          <span className="text-white">{staff.department || '—'}</span>
                        </div>
                        {staff.max_teaching_hours && (
                          <div className="flex items-center justify-between">
                            <span className="text-white">Max hours</span>
                            <span className="text-white tabular-nums">
                              {staff.max_teaching_hours}h/week
                            </span>
                          </div>
                        )}
                      </div>
                    </FormCard>

                    <FormCard eyebrow="Qualifications">
                      {!staff.teaching_qual && !staff.assessor_qual && !staff.iqa_qual ? (
                        <p className="text-[12.5px] text-white">
                          No qualifications recorded.
                        </p>
                      ) : (
                        <div className="space-y-3">
                          {staff.teaching_qual && (
                            <div className="flex items-center justify-between">
                              <div>
                                <Eyebrow>Teaching</Eyebrow>
                                <div className="mt-0.5 text-[13px] text-white">
                                  {staff.teaching_qual}
                                </div>
                              </div>
                              <Pill tone="green">Verified</Pill>
                            </div>
                          )}
                          {staff.assessor_qual && (
                            <div className="flex items-center justify-between">
                              <div>
                                <Eyebrow>Assessor</Eyebrow>
                                <div className="mt-0.5 text-[13px] text-white">
                                  {staff.assessor_qual}
                                </div>
                              </div>
                              <Pill tone="blue">Verified</Pill>
                            </div>
                          )}
                          {staff.iqa_qual && (
                            <div className="flex items-center justify-between">
                              <div>
                                <Eyebrow>IQA</Eyebrow>
                                <div className="mt-0.5 text-[13px] text-white">{staff.iqa_qual}</div>
                              </div>
                              <Pill tone="amber">Verified</Pill>
                            </div>
                          )}
                        </div>
                      )}
                    </FormCard>

                    {staff.specialisations && staff.specialisations.length > 0 && (
                      <FormCard eyebrow="Specialisations">
                        <div className="flex flex-wrap gap-1.5">
                          {staff.specialisations.map((spec, i) => (
                            <Pill key={i} tone="yellow">{spec}</Pill>
                          ))}
                        </div>
                      </FormCard>
                    )}

                    <div className="grid grid-cols-3 gap-px bg-white/[0.06] border border-white/[0.08] rounded-2xl overflow-hidden">
                      {[
                        { label: 'Active Cohorts', value: activeCohorts.length },
                        { label: 'Students', value: totalStudents },
                        {
                          label: 'Max Hours',
                          value: staff.max_teaching_hours ?? '—',
                        },
                      ].map((stat) => (
                        <div
                          key={stat.label}
                          className="bg-[hsl(0_0%_12%)] px-4 py-4 text-center"
                        >
                          <div className="text-2xl font-semibold tabular-nums text-white leading-none">
                            {stat.value}
                          </div>
                          <div className="mt-2 text-[10px] uppercase tracking-[0.14em] text-white">
                            {stat.label}
                          </div>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                )}

                {activeTab === 'cohorts' && (
                  <motion.div
                    key="cohorts"
                    variants={tabVariants}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    transition={{ duration: 0.2 }}
                    className="p-5"
                  >
                    {assignedCohorts.length === 0 ? (
                      <EmptyState
                        title="No assigned cohorts"
                        description="This staff member is not currently assigned to any cohorts."
                      />
                    ) : (
                      <ListCard>
                        {assignedCohorts.map((cohort) => {
                          const studentCount = getStudentCount(cohort.id);
                          const maxStudents = cohort.max_students ?? 20;
                          const capacityPercent = (studentCount / maxStudents) * 100;
                          return (
                            <div
                              key={cohort.id}
                              className="flex items-start gap-4 px-5 sm:px-6 py-5"
                            >
                              <div className="flex-1 min-w-0">
                                <div className="flex items-baseline justify-between gap-2">
                                  <div className="text-[14px] font-medium text-white truncate">
                                    {cohort.name}
                                  </div>
                                  <Pill tone={cohortStatusTone(cohort.status)}>
                                    {cohort.status}
                                  </Pill>
                                </div>
                                <div className="mt-2">
                                  <div className="flex items-baseline justify-between text-[11px]">
                                    <span className="text-white uppercase tracking-[0.12em]">
                                      Capacity
                                    </span>
                                    <span className="font-medium text-white tabular-nums">
                                      {studentCount}/{maxStudents}
                                    </span>
                                  </div>
                                  <div className="mt-1.5 h-1 bg-white/[0.06] rounded-full overflow-hidden">
                                    <div
                                      className="h-full bg-elec-yellow/80 rounded-full"
                                      style={{ width: `${capacityPercent}%` }}
                                    />
                                  </div>
                                </div>
                                <div className="mt-2 text-[11px] text-white tabular-nums">
                                  {formatUKDateShort(cohort.start_date)} →{' '}
                                  {formatUKDateShort(cohort.end_date)}
                                </div>
                              </div>
                            </div>
                          );
                        })}
                      </ListCard>
                    )}
                  </motion.div>
                )}

                {activeTab === 'notes' && (
                  <motion.div
                    key="notes"
                    variants={tabVariants}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    transition={{ duration: 0.2 }}
                    className="p-5"
                  >
                    <EmptyState
                      title="Notes coming soon"
                      description="Staff notes and communication log will appear here."
                    />
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </Tabs>

          <SheetFooter className="flex-shrink-0 border-t border-white/[0.08] p-5 flex-row items-center justify-end gap-4">
            <SecondaryButton onClick={() => onOpenChange(false)}>
              Close
            </SecondaryButton>
            {staff.status === 'Active' && (
              <SecondaryButton>Archive</SecondaryButton>
            )}
            <PrimaryButton onClick={() => onEdit?.(staff)}>
              Edit →
            </PrimaryButton>
          </SheetFooter>
        </div>
      </SheetContent>
    </Sheet>
  );
}
