import { useState, useEffect, useMemo, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCollegeSupabase } from '@/contexts/CollegeSupabaseContext';
import {
  Command,
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from '@/components/ui/command';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Sheet, SheetContent, SheetDescription, SheetTitle } from '@/components/ui/sheet';
import { useIsMobile } from '@/hooks/use-mobile';
import { cn } from '@/lib/utils';
import { Pill, type Tone } from '@/components/college/primitives';
import type { CollegeSection } from '@/pages/college/CollegeDashboard';
import { keyLabel } from '@/lib/college/labels';

/** Group headings in sentence case, full white (no spaced capitals). */
const GROUP_CN =
  '[&_[cmdk-group-heading]]:normal-case [&_[cmdk-group-heading]]:tracking-normal [&_[cmdk-group-heading]]:text-[13px] [&_[cmdk-group-heading]]:text-white';

/** The same cmdk layout the dialog uses, for the phone's bottom sheet. */
const SHEET_COMMAND_CN =
  'flex h-full flex-col bg-transparent [&_[cmdk-group]:not([hidden])_~[cmdk-group]]:pt-0 [&_[cmdk-group]]:px-2 [&_[cmdk-input-wrapper]]:pr-12 [&_[cmdk-input-wrapper]_svg]:h-5 [&_[cmdk-input-wrapper]_svg]:w-5 [&_[cmdk-input]]:h-12 [&_[cmdk-item]]:px-2 [&_[cmdk-item]]:py-3 [&_[cmdk-list]]:max-h-none [&_[cmdk-list]]:flex-1 [&_[cmdk-list]]:overscroll-contain [&_[cmdk-list]]:overflow-x-hidden';

interface CommandPaletteProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onNavigate: (section: CollegeSection) => void;
}

export function CommandPalette({ open, onOpenChange, onNavigate }: CommandPaletteProps) {
  const { students, staff, courses, cohorts, grades: assessments } = useCollegeSupabase();
  // The roll's name is `name`; the palette used to read `full_name`, which
  // does not exist, so a learner could only be found by email and showed
  // with no name.
  const cohortName = useMemo(() => new Map(cohorts.map((c) => [c.id, c.name])), [cohorts]);
  const navigate = useNavigate();
  const [search, setSearch] = useState('');
  const isMobile = useIsMobile();

  useEffect(() => {
    if (!open) setSearch('');
  }, [open]);

  // No "G O"-style chord hints: nothing listens for those keys.
  const navigationItems: { label: string; section: CollegeSection }[] = [
    { label: 'College Hub home', section: 'overview' },
    { label: 'People Hub', section: 'peoplehub' },
    { label: 'Curriculum Hub', section: 'curriculumhub' },
    { label: 'Assessment Hub', section: 'assessmenthub' },
    { label: 'Resources Hub', section: 'resourceshub' },
  ];

  const sectionItems: { label: string; section: CollegeSection }[] = [
    { label: 'Learners', section: 'students' },
    { label: 'Tutors', section: 'tutors' },
    { label: 'Cohorts', section: 'cohorts' },
    { label: 'Courses', section: 'courses' },
    { label: 'Grading', section: 'grading' },
    { label: 'Portfolios', section: 'portfolio' },
    { label: 'Attendance', section: 'attendance' },
    { label: 'Learning plans', section: 'ilpmanagement' },
    { label: 'EPA Tracking', section: 'epatracking' },
    { label: 'Employer Portal', section: 'employerportal' },
    { label: 'LTI Settings', section: 'ltisettings' },
    { label: 'College Settings', section: 'collegesettings' },
  ];

  // The daily work, as pages (not sections): the same places the Act sheet
  // and the home page send a tutor.
  const dailyWork: { label: string; hint: string; to: string }[] = [
    { label: 'Today', hint: 'Classes, what needs you, flagged learners', to: '/college/today' },
    { label: 'Inbox', hint: 'Everything waiting on you', to: '/college/inbox' },
    {
      label: 'Hours to verify',
      hint: 'Off-the-job hours learners logged',
      to: '/college/otj/inbox',
    },
    {
      label: 'Approve app learning',
      hint: 'Off-the-job time spent in the app',
      to: '/college/otj',
    },
    {
      label: 'Progress reviews',
      hint: 'Book, hold and sign the three-way review',
      to: '/college/reviews',
    },
    {
      label: 'Work queue',
      hint: 'Grades, plan reviews, gateway, evidence',
      to: '/college?section=workqueue',
    },
  ];

  const quickActions = [
    { label: 'Record a grade', action: 'grading' as CollegeSection },
    { label: 'Add a learner', action: 'students' as CollegeSection },
    { label: 'New lesson plan', action: 'lessonplans' as CollegeSection },
    { label: 'Take a register', action: 'attendance' as CollegeSection },
  ];

  const go = useCallback(
    (to: string) => {
      onOpenChange(false);
      navigate(to);
    },
    [navigate, onOpenChange]
  );

  const filteredStudents = useMemo(() => {
    if (!search || search.length < 2) return [];
    const query = search.toLowerCase();
    return students
      .filter(
        (s) =>
          (s.name || '').toLowerCase().includes(query) ||
          (s.email || '').toLowerCase().includes(query) ||
          (cohortName.get(s.cohort_id ?? '') || '').toLowerCase().includes(query)
      )
      .slice(0, 5);
  }, [students, search, cohortName]);

  const filteredStaff = useMemo(() => {
    if (!search || search.length < 2) return [];
    const query = search.toLowerCase();
    return staff
      .filter(
        (s) =>
          (s.name || '').toLowerCase().includes(query) ||
          (s.email || '').toLowerCase().includes(query) ||
          (s.role || '').toLowerCase().includes(query)
      )
      .slice(0, 5);
  }, [staff, search]);

  const filteredCourses = useMemo(() => {
    if (!search || search.length < 2) return [];
    const query = search.toLowerCase();
    return courses
      .filter(
        (c) =>
          (c.name || '').toLowerCase().includes(query) ||
          (c.code || '').toLowerCase().includes(query)
      )
      .slice(0, 3);
  }, [courses, search]);

  const filteredAssessments = useMemo(() => {
    if (!search || search.length < 2) return [];
    const query = search.toLowerCase();
    return assessments
      .filter(
        (a) =>
          (a.unit_name || '').toLowerCase().includes(query) ||
          (a.assessment_type || '').toLowerCase().includes(query)
      )
      .slice(0, 3);
  }, [assessments, search]);

  const handleSelect = useCallback(
    (section: CollegeSection) => {
      onNavigate(section);
      onOpenChange(false);
    },
    [onNavigate, onOpenChange]
  );

  // A learner result opens THAT learner's Student 360, not the students
  // list — landing on the list and searching again was the whole trip twice.
  const openStudent = useCallback(
    (studentId: string) => {
      onOpenChange(false);
      navigate(`/college?section=student360&studentId=${encodeURIComponent(studentId)}`);
    },
    [navigate, onOpenChange]
  );

  const roleTone = (role: string): Tone =>
    role === 'tutor'
      ? 'blue'
      : role === 'assessor'
        ? 'emerald'
        : role === 'iqa'
          ? 'amber'
          : role === 'head_of_department'
            ? 'purple'
            : 'yellow';

  const formatRole = (role: string) => {
    switch (role) {
      case 'tutor':
        return 'Tutor';
      case 'assessor':
        return 'Assessor';
      case 'iqa':
        return 'IQA';
      case 'head_of_department':
        return 'HoD';
      case 'admin':
        return 'Admin';
      default:
        return role;
    }
  };

  const statusTone = (status: string): Tone =>
    status === 'Active' ? 'green' : status === 'Withdrawn' ? 'red' : 'yellow';

  const assessmentStatusTone = (status: string | null): Tone =>
    status === 'Graded' ? 'green' : status === 'Pending' ? 'amber' : 'blue';

  const hasSearchResults =
    filteredStudents.length > 0 ||
    filteredStaff.length > 0 ||
    filteredCourses.length > 0 ||
    filteredAssessments.length > 0;

  const body = (
    <>
      <CommandInput
        placeholder="Search learners, staff or courses"
        value={search}
        onValueChange={setSearch}
        inputMode="search"
        enterKeyHint="search"
        autoComplete="off"
        autoCorrect="off"
        autoCapitalize="off"
      />
      <CommandList>
        <CommandEmpty>
          <div className="py-8 text-center">
            <p className="text-[13px] font-medium text-white">
              {search.trim().length < 2 ? 'Type two letters or more' : 'Nobody or nothing matches'}
            </p>
            <p className="mt-1 text-[12px] text-white">
              Search by a learner’s name or email, a member of staff, or a course.
            </p>
          </div>
        </CommandEmpty>

        {filteredStudents.length > 0 && (
          <CommandGroup className={GROUP_CN} heading="Learners">
            {filteredStudents.map((student) => {
              const initials = (student.name || '')
                .split(' ')
                .map((n: string) => n[0])
                .join('')
                .toUpperCase()
                .slice(0, 2);
              return (
                <CommandItem
                  key={student.id}
                  onSelect={() => openStudent(student.id)}
                  className="flex items-center gap-3"
                >
                  <Avatar className="h-8 w-8">
                    <AvatarFallback className="bg-white/[0.1] text-xs font-semibold text-white">
                      {initials}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1 min-w-0">
                    <p className="text-[13px] font-medium text-white">{student.name}</p>
                    <p className="text-[12px] text-white truncate">
                      {cohortName.get(student.cohort_id ?? '') ?? student.email}
                    </p>
                  </div>
                  {student.status && (
                    <Pill tone={statusTone(student.status)}>{keyLabel(student.status)}</Pill>
                  )}
                </CommandItem>
              );
            })}
          </CommandGroup>
        )}

        {filteredStaff.length > 0 && (
          <CommandGroup className={GROUP_CN} heading="Staff">
            {filteredStaff.map((member) => {
              const initials = (member.name || '')
                .split(' ')
                .map((n: string) => n[0])
                .join('')
                .toUpperCase()
                .slice(0, 2);
              return (
                <CommandItem
                  key={member.id}
                  onSelect={() => handleSelect('tutors')}
                  className="flex items-center gap-3"
                >
                  <Avatar className="h-8 w-8">
                    <AvatarFallback className="bg-white/[0.1] text-xs font-semibold text-white">
                      {initials}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1 min-w-0">
                    <p className="text-[13px] font-medium text-white">{member.name}</p>
                  </div>
                  <Pill tone={roleTone(member.role)}>{formatRole(member.role)}</Pill>
                </CommandItem>
              );
            })}
          </CommandGroup>
        )}

        {filteredCourses.length > 0 && (
          <CommandGroup className={GROUP_CN} heading="Courses">
            {filteredCourses.map((course) => (
              <CommandItem
                key={course.id}
                onSelect={() => handleSelect('courses')}
                className="flex items-center gap-3"
              >
                <div className="flex-1 min-w-0">
                  <p className="text-[13px] font-medium text-white">{course.name}</p>
                  <p className="text-[12px] text-white tabular-nums">{course.code}</p>
                </div>
              </CommandItem>
            ))}
          </CommandGroup>
        )}

        {filteredAssessments.length > 0 && (
          <CommandGroup className={GROUP_CN} heading="Assessments">
            {filteredAssessments.map((assessment) => (
              <CommandItem
                key={assessment.id}
                onSelect={() => handleSelect('grading')}
                className="flex items-center gap-3"
              >
                <div className="flex-1 min-w-0">
                  <p className="text-[13px] font-medium text-white">
                    {assessment.unit_name || 'Assessment'}
                  </p>
                  <p className="text-[12px] text-white">{keyLabel(assessment.assessment_type)}</p>
                </div>
                {assessment.status && (
                  <Pill tone={assessmentStatusTone(assessment.status)}>
                    {keyLabel(assessment.status)}
                  </Pill>
                )}
              </CommandItem>
            ))}
          </CommandGroup>
        )}

        {hasSearchResults && <CommandSeparator />}

        {(!search || search.length < 2) && (
          <>
            <CommandGroup className={GROUP_CN} heading="Your daily work">
              {dailyWork.map((d) => (
                <CommandItem
                  key={d.to}
                  value={`${d.label} ${d.hint}`}
                  onSelect={() => go(d.to)}
                  className="min-h-11"
                >
                  <div className="min-w-0 flex-1">
                    <p className="text-[13px] font-medium text-white">{d.label}</p>
                    <p className="truncate text-[12px] text-white">{d.hint}</p>
                  </div>
                </CommandItem>
              ))}
            </CommandGroup>

            <CommandSeparator />

            <CommandGroup className={GROUP_CN} heading="Quick actions">
              {quickActions.map((action) => (
                <CommandItem
                  key={action.label}
                  onSelect={() => handleSelect(action.action)}
                  className="min-h-11"
                >
                  <span className="text-[13px] text-white">{action.label}</span>
                </CommandItem>
              ))}
            </CommandGroup>

            <CommandSeparator />

            <CommandGroup className={GROUP_CN} heading="Go to">
              {[...navigationItems, ...sectionItems.slice(0, 6)].map((item) => (
                <CommandItem
                  key={item.section}
                  onSelect={() => handleSelect(item.section)}
                  className="min-h-11"
                >
                  <span className="text-[13px] text-white">{item.label}</span>
                </CommandItem>
              ))}
            </CommandGroup>
          </>
        )}
      </CommandList>

      <div className="hidden items-center justify-between border-t border-white/[0.06] p-3 text-[12px] text-white sm:flex">
        <div className="flex items-center gap-4">
          <span className="flex items-center gap-1.5">
            <kbd className="px-1.5 py-0.5 bg-white/[0.06] rounded text-[12px]">↵</kbd>
            Select
          </span>
          <span className="flex items-center gap-1.5">
            <kbd className="px-1.5 py-0.5 bg-white/[0.06] rounded text-[12px]">↑↓</kbd>
            Navigate
          </span>
          <span className="flex items-center gap-1.5">
            <kbd className="px-1.5 py-0.5 bg-white/[0.06] rounded text-[12px]">Esc</kbd>
            Close
          </span>
        </div>
      </div>
    </>
  );

  return isMobile ? (
    // A phone gets a bottom sheet with a 44px close (standard 7), not a
    // centred dialog.
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent
        side="bottom"
        className="flex h-[88dvh] flex-col overflow-hidden rounded-t-2xl border-white/[0.06] bg-[hsl(0_0%_8%)] p-0 pb-[env(safe-area-inset-bottom)]"
        onOpenAutoFocus={(e) => {
          e.preventDefault();
          (e.currentTarget as HTMLElement | null)
            ?.querySelector<HTMLInputElement>('[cmdk-input]')
            ?.focus();
        }}
      >
        <div className="mx-auto mt-3 h-1 w-12 shrink-0 rounded-full bg-white/15" aria-hidden />
        <SheetTitle className="sr-only">Search the College Hub</SheetTitle>
        <SheetDescription className="sr-only">
          Find a learner, a member of staff or a course, or jump to a page.
        </SheetDescription>
        <div className="min-h-0 flex-1 [&>div]:h-full">
          <Command className={cn(SHEET_COMMAND_CN)}>{body}</Command>
        </div>
      </SheetContent>
    </Sheet>
  ) : (
    <CommandDialog open={open} onOpenChange={onOpenChange}>
      {body}
    </CommandDialog>
  );
}
