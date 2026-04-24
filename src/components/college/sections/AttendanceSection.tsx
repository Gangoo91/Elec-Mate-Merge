import { useState } from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { TakeAttendanceDialog } from '@/components/college/dialogs/TakeAttendanceDialog';
import { useCollegeSupabase } from '@/contexts/CollegeSupabaseContext';
import { useToast } from '@/hooks/use-toast';
import { getInitials } from '@/utils/collegeHelpers';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  PageFrame,
  PageHero,
  StatStrip,
  FilterBar,
  ListCard,
  Pill,
  EmptyState,
  SectionHeader,
  itemVariants,
  inputClass,
  selectTriggerClass,
  selectContentClass,
  PrimaryButton,
  SecondaryButton,
  type Tone,
} from '@/components/college/primitives';

export function AttendanceSection() {
  const { attendance, students, cohorts, updateAttendance } = useCollegeSupabase();
  const { toast } = useToast();
  const [searchQuery, setSearchQuery] = useState('');
  const [filterCohort, setFilterCohort] = useState<string>('all');
  const [dateFilter, setDateFilter] = useState<string>('week');
  const [takeAttendanceOpen, setTakeAttendanceOpen] = useState(false);
  const [editingRecordId, setEditingRecordId] = useState<string | null>(null);
  const [editStatus, setEditStatus] = useState<string>('');
  const [noteRecordId, setNoteRecordId] = useState<string | null>(null);
  const [noteText, setNoteText] = useState('');

  const getFilteredAttendance = () => {
    const now = new Date();
    let startDate = new Date();
    switch (dateFilter) {
      case 'today':
        startDate = new Date(now.setHours(0, 0, 0, 0));
        break;
      case 'week':
        startDate.setDate(startDate.getDate() - 7);
        break;
      case 'month':
        startDate.setMonth(startDate.getMonth() - 1);
        break;
    }
    return attendance.filter((record) => {
      const recordDate = new Date(record.date);
      const student = students.find((s) => s.id === record.student_id);
      const matchesDate = recordDate >= startDate;
      const matchesCohort = filterCohort === 'all' || student?.cohort_id === filterCohort;
      const matchesSearch =
        searchQuery === '' || student?.name.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesDate && matchesCohort && matchesSearch;
    });
  };

  const filteredAttendance = getFilteredAttendance();
  const totalRecords = filteredAttendance.length;
  const presentCount = filteredAttendance.filter((a) => a.status === 'Present').length;
  const absentCount = filteredAttendance.filter((a) => a.status === 'Absent').length;
  const lateCount = filteredAttendance.filter((a) => a.status === 'Late').length;
  const authorisedAbsent = filteredAttendance.filter((a) => a.status === 'Authorised').length;
  const overallAttendanceRate =
    totalRecords > 0
      ? Math.round(((presentCount + lateCount + authorisedAbsent) / totalRecords) * 100)
      : 0;

  const statusTone = (status: string | null): Tone =>
    status === 'Present'
      ? 'green'
      : status === 'Absent'
        ? 'red'
        : status === 'Late'
          ? 'amber'
          : status === 'Authorised'
            ? 'blue'
            : 'yellow';

  const getStudentInfo = (studentId: string | null) => {
    const student = students.find((s) => s.id === studentId);
    return {
      name: student?.name || 'Unknown',
      initials: student ? getInitials(student.name) : '?',
      photoUrl: student?.photo_url ?? undefined,
      cohortId: student?.cohort_id,
    };
  };
  const getCohortName = (cohortId: string | null) =>
    !cohortId ? 'Unassigned' : cohorts.find((c) => c.id === cohortId)?.name || 'Unknown';

  const getStudentAttendanceRate = (studentId: string): number => {
    const records = attendance.filter((a) => a.student_id === studentId);
    if (records.length === 0) return 100;
    const present = records.filter((a) => a.status === 'Present' || a.status === 'Late').length;
    return Math.round((present / records.length) * 100);
  };

  const studentsWithLowAttendance = students
    .filter((s) => s.status === 'Active')
    .map((s) => ({ ...s, attendanceRate: getStudentAttendanceRate(s.id) }))
    .filter((s) => s.attendanceRate < 85)
    .sort((a, b) => a.attendanceRate - b.attendanceRate)
    .slice(0, 6);

  return (
    <PageFrame>
      <motion.div variants={itemVariants}>
        <PageHero
          eyebrow="Assessment · Attendance"
          title="Registers & records"
          description={`${overallAttendanceRate}% attendance rate across the selected period.`}
          tone="green"
          actions={
            <button
              onClick={() => setTakeAttendanceOpen(true)}
              className="text-[12.5px] font-medium text-elec-yellow/90 hover:text-elec-yellow transition-colors touch-manipulation whitespace-nowrap"
            >
              Take register →
            </button>
          }
        />
      </motion.div>

      <motion.div variants={itemVariants}>
        <StatStrip
          columns={5}
          stats={[
            { value: presentCount, label: 'Present', sub: 'Attended', tone: 'green' },
            { value: absentCount, label: 'Absent', sub: 'No show', tone: 'red', accent: absentCount > 0 },
            { value: lateCount, label: 'Late', sub: 'Arrived late', tone: 'amber' },
            { value: authorisedAbsent, label: 'Authorised', sub: 'Approved absence', tone: 'blue' },
            {
              value: `${overallAttendanceRate}%`,
              label: 'Rate',
              sub: 'Overall',
              tone: overallAttendanceRate >= 85 ? 'green' : overallAttendanceRate >= 70 ? 'amber' : 'red',
            },
          ]}
        />
      </motion.div>

      {studentsWithLowAttendance.length > 0 && (
        <motion.section variants={itemVariants} className="space-y-5">
          <SectionHeader eyebrow="Priority" title="Below 85% attendance" />
          <div className="bg-[hsl(0_0%_12%)] border border-white/[0.06] rounded-2xl p-5 sm:p-6">
            <div className="flex flex-wrap gap-1.5">
              {studentsWithLowAttendance.map((student) => (
                <Pill
                  key={student.id}
                  tone={student.attendanceRate < 70 ? 'red' : 'amber'}
                >
                  {student.name} · {student.attendanceRate}%
                </Pill>
              ))}
            </div>
          </div>
        </motion.section>
      )}

      <motion.div variants={itemVariants}>
        <FilterBar
          tabs={[
            { value: 'today', label: 'Today' },
            { value: 'week', label: 'This Week' },
            { value: 'month', label: 'This Month' },
          ]}
          activeTab={dateFilter}
          onTabChange={setDateFilter}
          search={searchQuery}
          onSearchChange={setSearchQuery}
          searchPlaceholder="Search by student…"
          actions={
            <select
              value={filterCohort}
              onChange={(e) => setFilterCohort(e.target.value)}
              className="h-10 px-3 bg-[hsl(0_0%_12%)] border border-white/[0.08] rounded-full text-[13px] text-white focus:outline-none focus:border-elec-yellow/60 touch-manipulation data-[state=open]:border-elec-yellow/60"
            >
              <option value="all">All Cohorts</option>
              {cohorts
                .filter((c) => c.status === 'Active')
                .map((cohort) => (
                  <option key={cohort.id} value={cohort.id}>
                    {cohort.name}
                  </option>
                ))}
            </select>
          }
        />
      </motion.div>

      {filteredAttendance.length === 0 ? (
        <EmptyState title="No attendance records" description="No records for this period. Take a register to start." />
      ) : (
        <motion.div variants={itemVariants}>
          <ListCard>
            {filteredAttendance.map((record) => {
              const studentInfo = getStudentInfo(record.student_id);
              const tone = statusTone(record.status);

              return (
                <div key={record.id}>
                  <div className="flex items-center gap-4 px-5 sm:px-6 py-4 hover:bg-[hsl(0_0%_15%)] transition-colors">
                    <Avatar className="h-9 w-9 shrink-0 ring-1 ring-white/[0.08]">
                      <AvatarImage src={studentInfo.photoUrl} />
                      <AvatarFallback className="bg-green-500/10 text-green-400 text-xs font-semibold">
                        {studentInfo.initials}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1 min-w-0">
                      <div className="text-[14px] font-medium text-white truncate">
                        {studentInfo.name}
                      </div>
                      <div className="mt-0.5 text-[11.5px] text-white truncate">
                        {getCohortName(studentInfo.cohortId)}
                      </div>
                      {record.notes && (
                        <div className="mt-1 text-[11.5px] text-white truncate">
                          Note · {record.notes}
                        </div>
                      )}
                    </div>
                    <div className="hidden sm:block text-right shrink-0">
                      <div className="text-[10px] uppercase tracking-[0.12em] text-white">
                        {new Date(record.date).toLocaleDateString('en-GB', { weekday: 'short' })}
                      </div>
                      <div className="text-[11.5px] font-medium text-white tabular-nums">
                        {new Date(record.date).toLocaleDateString('en-GB', {
                          day: 'numeric',
                          month: 'short',
                        })}
                      </div>
                    </div>
                    <Pill tone={tone}>{record.status}</Pill>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <button
                          className="text-white hover:text-white text-[16px] leading-none px-1 touch-manipulation shrink-0"
                          aria-label="Options"
                        >
                          ⋯
                        </button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem
                          className="h-11"
                          onClick={() => {
                            setEditingRecordId(record.id);
                            setEditStatus(record.status || 'Present');
                          }}
                        >
                          Edit record
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          className="h-11"
                          onClick={() => {
                            setNoteRecordId(noteRecordId === record.id ? null : record.id);
                            setNoteText(record.notes || '');
                          }}
                        >
                          Add note
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>

                  {editingRecordId === record.id && (
                    <div className="flex items-center gap-2 px-5 sm:px-6 pb-4 bg-[hsl(0_0%_9%)]">
                      <Select value={editStatus} onValueChange={setEditStatus}>
                        <SelectTrigger className={cn(selectTriggerClass, 'flex-1')}>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent className={selectContentClass}>
                          <SelectItem value="Present">Present</SelectItem>
                          <SelectItem value="Absent">Absent</SelectItem>
                          <SelectItem value="Late">Late</SelectItem>
                          <SelectItem value="Authorised">Authorised</SelectItem>
                        </SelectContent>
                      </Select>
                      <PrimaryButton
                        onClick={async () => {
                          await updateAttendance(record.id, { status: editStatus });
                          setEditingRecordId(null);
                          toast({ title: 'Record updated', description: `Set to ${editStatus}` });
                        }}
                      >
                        Save
                      </PrimaryButton>
                      <SecondaryButton onClick={() => setEditingRecordId(null)}>
                        Cancel
                      </SecondaryButton>
                    </div>
                  )}

                  {noteRecordId === record.id && (
                    <div className="flex items-center gap-2 px-5 sm:px-6 pb-4 bg-[hsl(0_0%_9%)]">
                      <Input
                        placeholder="Add a note…"
                        value={noteText}
                        onChange={(e) => setNoteText(e.target.value)}
                        className={cn(inputClass, 'flex-1')}
                      />
                      <PrimaryButton
                        onClick={async () => {
                          await updateAttendance(record.id, { notes: noteText });
                          setNoteRecordId(null);
                          toast({ title: 'Note saved' });
                        }}
                      >
                        Save
                      </PrimaryButton>
                      <SecondaryButton onClick={() => setNoteRecordId(null)}>
                        Cancel
                      </SecondaryButton>
                    </div>
                  )}
                </div>
              );
            })}
          </ListCard>
        </motion.div>
      )}

      <TakeAttendanceDialog open={takeAttendanceOpen} onOpenChange={setTakeAttendanceOpen} />
    </PageFrame>
  );
}
