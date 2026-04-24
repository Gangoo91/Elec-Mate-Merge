import { useState, useEffect, useMemo, useCallback } from 'react';
import { useCollegeSupabase } from '@/contexts/CollegeSupabaseContext';
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  CommandShortcut,
} from '@/components/ui/command';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Pill, type Tone } from '@/components/college/primitives';
import type { CollegeSection } from '@/pages/college/CollegeDashboard';

interface CommandPaletteProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onNavigate: (section: CollegeSection) => void;
}

export function CommandPalette({ open, onOpenChange, onNavigate }: CommandPaletteProps) {
  const { students, staff, courses, cohorts: _cohorts, grades: assessments } = useCollegeSupabase();
  const [search, setSearch] = useState('');

  useEffect(() => {
    if (!open) setSearch('');
  }, [open]);

  const navigationItems: { label: string; section: CollegeSection; shortcut: string }[] = [
    { label: 'Overview', section: 'overview', shortcut: 'G O' },
    { label: 'People Hub', section: 'peoplehub', shortcut: 'G P' },
    { label: 'Curriculum Hub', section: 'curriculumhub', shortcut: 'G C' },
    { label: 'Assessment Hub', section: 'assessmenthub', shortcut: 'G A' },
    { label: 'Resources Hub', section: 'resourceshub', shortcut: 'G R' },
  ];

  const sectionItems: { label: string; section: CollegeSection }[] = [
    { label: 'Students', section: 'students' },
    { label: 'Tutors', section: 'tutors' },
    { label: 'Cohorts', section: 'cohorts' },
    { label: 'Courses', section: 'courses' },
    { label: 'Grading', section: 'grading' },
    { label: 'Portfolios', section: 'portfolio' },
    { label: 'Attendance', section: 'attendance' },
    { label: 'ILP Management', section: 'ilpmanagement' },
    { label: 'EPA Tracking', section: 'epatracking' },
    { label: 'Employer Portal', section: 'employerportal' },
    { label: 'LTI Settings', section: 'ltisettings' },
    { label: 'College Settings', section: 'collegesettings' },
  ];

  const quickActions = [
    { label: 'Record grade', action: 'grading' as CollegeSection },
    { label: 'Add student', action: 'students' as CollegeSection },
    { label: 'New lesson plan', action: 'lessonplans' as CollegeSection },
    { label: 'Take attendance', action: 'attendance' as CollegeSection },
  ];

  const filteredStudents = useMemo(() => {
    if (!search || search.length < 2) return [];
    const query = search.toLowerCase();
    return students
      .filter(
        (s) =>
          (s.full_name || '').toLowerCase().includes(query) ||
          (s.email || '').toLowerCase().includes(query) ||
          (s.apprenticeship_standard || '').toLowerCase().includes(query)
      )
      .slice(0, 5);
  }, [students, search]);

  const filteredStaff = useMemo(() => {
    if (!search || search.length < 2) return [];
    const query = search.toLowerCase();
    return staff
      .filter(
        (s) =>
          (s.full_name || '').toLowerCase().includes(query) ||
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

  return (
    <CommandDialog open={open} onOpenChange={onOpenChange}>
      <CommandInput
        placeholder="Search students, staff, courses…"
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
            <p className="text-[13px] font-medium text-white">No results</p>
            <p className="mt-1 text-[11.5px] text-white">
              Try searching for students, staff or courses.
            </p>
          </div>
        </CommandEmpty>

        {filteredStudents.length > 0 && (
          <CommandGroup heading="Students">
            {filteredStudents.map((student) => {
              const initials = (student.full_name || '')
                .split(' ')
                .map((n: string) => n[0])
                .join('')
                .toUpperCase()
                .slice(0, 2);
              return (
                <CommandItem
                  key={student.id}
                  onSelect={() => handleSelect('students')}
                  className="flex items-center gap-3"
                >
                  <Avatar className="h-8 w-8">
                    <AvatarFallback className="text-xs bg-elec-yellow/10 text-elec-yellow">
                      {initials}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1 min-w-0">
                    <p className="text-[13px] font-medium text-white">{student.full_name}</p>
                    <p className="text-[11px] text-white truncate">
                      {student.apprenticeship_standard}
                    </p>
                  </div>
                  <Pill tone={statusTone(student.status)}>{student.status}</Pill>
                </CommandItem>
              );
            })}
          </CommandGroup>
        )}

        {filteredStaff.length > 0 && (
          <CommandGroup heading="Staff">
            {filteredStaff.map((member) => {
              const initials = (member.full_name || '')
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
                    <AvatarFallback className="text-xs bg-blue-500/10 text-blue-400">
                      {initials}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1 min-w-0">
                    <p className="text-[13px] font-medium text-white">{member.full_name}</p>
                  </div>
                  <Pill tone={roleTone(member.role)}>{formatRole(member.role)}</Pill>
                </CommandItem>
              );
            })}
          </CommandGroup>
        )}

        {filteredCourses.length > 0 && (
          <CommandGroup heading="Courses">
            {filteredCourses.map((course) => (
              <CommandItem
                key={course.id}
                onSelect={() => handleSelect('courses')}
                className="flex items-center gap-3"
              >
                <span
                  aria-hidden
                  className="h-1.5 w-1.5 rounded-full bg-emerald-400 shrink-0"
                />
                <div className="flex-1 min-w-0">
                  <p className="text-[13px] font-medium text-white">{course.name}</p>
                  <p className="text-[11px] text-white tabular-nums">{course.code}</p>
                </div>
              </CommandItem>
            ))}
          </CommandGroup>
        )}

        {filteredAssessments.length > 0 && (
          <CommandGroup heading="Assessments">
            {filteredAssessments.map((assessment) => (
              <CommandItem
                key={assessment.id}
                onSelect={() => handleSelect('grading')}
                className="flex items-center gap-3"
              >
                <span aria-hidden className="h-1.5 w-1.5 rounded-full bg-amber-400 shrink-0" />
                <div className="flex-1 min-w-0">
                  <p className="text-[13px] font-medium text-white">
                    {assessment.unit_name || 'Assessment'}
                  </p>
                  <p className="text-[11px] text-white">{assessment.assessment_type}</p>
                </div>
                {assessment.status && (
                  <Pill tone={assessmentStatusTone(assessment.status)}>{assessment.status}</Pill>
                )}
              </CommandItem>
            ))}
          </CommandGroup>
        )}

        {hasSearchResults && <CommandSeparator />}

        {(!search || search.length < 2) && (
          <>
            <CommandGroup heading="Quick actions">
              {quickActions.map((action) => (
                <CommandItem
                  key={action.label}
                  onSelect={() => handleSelect(action.action)}
                  className="flex items-center gap-3"
                >
                  <span
                    aria-hidden
                    className="h-1.5 w-1.5 rounded-full bg-elec-yellow shrink-0"
                  />
                  <span className="text-[13px] text-white flex-1">{action.label}</span>
                  <span className="text-elec-yellow/70 text-[12px]">→</span>
                </CommandItem>
              ))}
            </CommandGroup>

            <CommandSeparator />

            <CommandGroup heading="Navigation">
              {navigationItems.map((item) => (
                <CommandItem
                  key={item.section}
                  onSelect={() => handleSelect(item.section)}
                  className="flex items-center gap-3"
                >
                  <span aria-hidden className="h-1.5 w-1.5 rounded-full bg-white/40 shrink-0" />
                  <span className="text-[13px] text-white">{item.label}</span>
                  <CommandShortcut>{item.shortcut}</CommandShortcut>
                </CommandItem>
              ))}
            </CommandGroup>

            <CommandSeparator />

            <CommandGroup heading="Go to section">
              {sectionItems.slice(0, 6).map((item) => (
                <CommandItem
                  key={item.section}
                  onSelect={() => handleSelect(item.section)}
                  className="flex items-center gap-3"
                >
                  <span aria-hidden className="h-1.5 w-1.5 rounded-full bg-white/30 shrink-0" />
                  <span className="text-[13px] text-white">{item.label}</span>
                </CommandItem>
              ))}
            </CommandGroup>
          </>
        )}
      </CommandList>

      <div className="border-t border-white/[0.06] p-3 flex items-center justify-between text-[11px] text-white">
        <div className="flex items-center gap-4">
          <span className="flex items-center gap-1.5">
            <kbd className="px-1.5 py-0.5 bg-white/[0.06] rounded text-[10px]">↵</kbd>
            Select
          </span>
          <span className="flex items-center gap-1.5">
            <kbd className="px-1.5 py-0.5 bg-white/[0.06] rounded text-[10px]">↑↓</kbd>
            Navigate
          </span>
          <span className="flex items-center gap-1.5">
            <kbd className="px-1.5 py-0.5 bg-white/[0.06] rounded text-[10px]">Esc</kbd>
            Close
          </span>
        </div>
        <span className="text-elec-yellow/70 text-[11px] font-medium">AI-powered</span>
      </div>
    </CommandDialog>
  );
}
