import { useState, useEffect, useMemo, useRef, useCallback } from 'react';
import { storageGetJSONSync, storageSetJSONSync, storageRemoveSync } from '@/utils/storage';
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useCollegeSupabase } from '@/contexts/CollegeSupabaseContext';
import type {
  CollegeStudent,
  CollegeStaff,
  CollegeCohort,
} from '@/contexts/CollegeSupabaseContext';
import { getInitials, getRoleLabel } from '@/utils/collegeHelpers';
import { Pill, type Tone } from '@/components/college/primitives';

const RECENT_SEARCHES_KEY = 'elecmate_college_recent_searches';
const MAX_RECENT = 5;

interface SmartSearchSheetProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSelectStudent: (student: CollegeStudent) => void;
  onSelectStaff: (staff: CollegeStaff) => void;
  onSelectCohort?: (cohort: CollegeCohort) => void;
}

interface RecentSearch {
  query: string;
  timestamp: number;
}

function statusTone(status: string): Tone {
  const s = status.toLowerCase();
  if (s.includes('active') || s.includes('complete') || s.includes('enrolled')) return 'green';
  if (s.includes('pending') || s.includes('progress')) return 'amber';
  if (s.includes('withdrawn') || s.includes('inactive') || s.includes('fail')) return 'red';
  return 'yellow';
}

const eyebrow = 'text-[10px] font-medium uppercase tracking-[0.16em] text-white/40';

export function SmartSearchSheet({
  open,
  onOpenChange,
  onSelectStudent,
  onSelectStaff,
  onSelectCohort,
}: SmartSearchSheetProps) {
  const { students, staff, cohorts } = useCollegeSupabase();
  const [query, setQuery] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);
  const [recentSearches, setRecentSearches] = useState<RecentSearch[]>([]);

  useEffect(() => {
    setRecentSearches(storageGetJSONSync<RecentSearch[]>(RECENT_SEARCHES_KEY, []));
  }, []);

  useEffect(() => {
    if (open) {
      setTimeout(() => inputRef.current?.focus(), 100);
      setQuery('');
    }
  }, [open]);

  const saveRecentSearch = useCallback(
    (searchQuery: string) => {
      if (!searchQuery.trim()) return;
      const updated = [
        { query: searchQuery.trim(), timestamp: Date.now() },
        ...recentSearches.filter((r) => r.query !== searchQuery.trim()),
      ].slice(0, MAX_RECENT);
      setRecentSearches(updated);
      storageSetJSONSync(RECENT_SEARCHES_KEY, updated);
    },
    [recentSearches]
  );

  const clearRecentSearches = () => {
    setRecentSearches([]);
    storageRemoveSync(RECENT_SEARCHES_KEY);
  };

  const results = useMemo(() => {
    if (!query.trim()) return { students: [], staff: [], cohorts: [] };

    const q = query.toLowerCase();

    const matchedStudents = students
      .filter(
        (s) =>
          s.name.toLowerCase().includes(q) ||
          s.email.toLowerCase().includes(q) ||
          (s.uln ?? '').toLowerCase().includes(q)
      )
      .slice(0, 5);

    const matchedStaff = staff
      .filter(
        (s) =>
          s.name.toLowerCase().includes(q) ||
          s.email.toLowerCase().includes(q) ||
          (s.department ?? '').toLowerCase().includes(q)
      )
      .slice(0, 5);

    const matchedCohorts = cohorts.filter((c) => c.name.toLowerCase().includes(q)).slice(0, 3);

    return { students: matchedStudents, staff: matchedStaff, cohorts: matchedCohorts };
  }, [query, students, staff, cohorts]);

  const totalResults = results.students.length + results.staff.length + results.cohorts.length;

  const handleSelectStudent = (student: CollegeStudent) => {
    saveRecentSearch(query);
    onOpenChange(false);
    onSelectStudent(student);
  };

  const handleSelectStaff = (member: CollegeStaff) => {
    saveRecentSearch(query);
    onOpenChange(false);
    onSelectStaff(member);
  };

  const handleSelectCohort = (cohort: CollegeCohort) => {
    saveRecentSearch(query);
    onOpenChange(false);
    onSelectCohort?.(cohort);
  };

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent side="bottom" className="h-[85vh] p-0 rounded-t-2xl overflow-hidden bg-[hsl(0_0%_8%)]">
        <div className="flex flex-col h-full">
          {/* Drag Handle */}
          <div className="flex justify-center pt-2.5 pb-1 flex-shrink-0">
            <div className="h-1 w-10 rounded-full bg-white/20" />
          </div>

          {/* Search Header */}
          <SheetHeader className="flex-shrink-0 px-5 pb-4">
            <SheetTitle className="sr-only">Search People</SheetTitle>
            <div className="relative">
              <input
                ref={inputRef}
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search students, staff, cohorts…"
                className="h-12 w-full pl-4 pr-11 bg-[hsl(0_0%_12%)] border border-white/[0.08] rounded-xl text-white text-[14px] placeholder:text-white/35 focus:outline-none focus:border-elec-yellow/60 touch-manipulation"
              />
              {query && (
                <button
                  type="button"
                  className="absolute right-3 top-1/2 -translate-y-1/2 h-7 w-7 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 text-white text-[14px] touch-manipulation"
                  onClick={() => setQuery('')}
                  aria-label="Clear"
                >
                  ×
                </button>
              )}
            </div>
          </SheetHeader>

          {/* Results */}
          <div className="flex-1 overflow-y-auto overscroll-contain px-5 pb-5">
            {/* No query — show recent searches */}
            {!query.trim() && recentSearches.length > 0 && (
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className={eyebrow}>Recent Searches</div>
                  <button
                    type="button"
                    className="text-[12px] font-medium text-white/70 hover:text-white transition-colors touch-manipulation"
                    onClick={clearRecentSearches}
                  >
                    Clear
                  </button>
                </div>
                {recentSearches.map((recent) => (
                  <button
                    key={recent.timestamp}
                    className="w-full flex items-center gap-3 p-3 rounded-xl bg-[hsl(0_0%_12%)] hover:bg-[hsl(0_0%_15%)] border border-white/[0.06] touch-manipulation transition-colors"
                    onClick={() => setQuery(recent.query)}
                  >
                    <span className="inline-block h-1.5 w-1.5 rounded-full bg-white/30 shrink-0" />
                    <span className="text-[13px] text-white">{recent.query}</span>
                  </button>
                ))}
              </div>
            )}

            {/* No query, no recent */}
            {!query.trim() && recentSearches.length === 0 && (
              <div className="bg-[hsl(0_0%_12%)] border border-white/[0.06] rounded-2xl px-6 py-14 text-center">
                <div className="text-[14px] font-medium text-white">Search everyone</div>
                <p className="mt-2 text-[12.5px] text-white/50 max-w-md mx-auto leading-relaxed">
                  Find students, staff, or cohorts by name, email, or ULN
                </p>
              </div>
            )}

            {/* Results with query */}
            {query.trim() && (
              <div className="space-y-5">
                {/* No results */}
                {totalResults === 0 && (
                  <div className="bg-[hsl(0_0%_12%)] border border-white/[0.06] rounded-2xl px-6 py-10 text-center">
                    <div className="text-[13px] text-white">No results for "{query}"</div>
                  </div>
                )}

                {/* Students */}
                {results.students.length > 0 && (
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div className={eyebrow}>Students</div>
                      <Pill tone="yellow">{results.students.length}</Pill>
                    </div>
                    {results.students.map((student) => (
                      <button
                        key={student.id}
                        className="w-full flex items-center gap-3 p-3 rounded-xl bg-[hsl(0_0%_12%)] hover:bg-[hsl(0_0%_15%)] border border-white/[0.06] touch-manipulation transition-colors"
                        onClick={() => handleSelectStudent(student)}
                      >
                        <Avatar className="h-9 w-9 shrink-0">
                          <AvatarImage src={student.photo_url ?? undefined} />
                          <AvatarFallback className="bg-elec-yellow/10 text-elec-yellow text-[11px] font-semibold">
                            {getInitials(student.name)}
                          </AvatarFallback>
                        </Avatar>
                        <div className="flex-1 min-w-0 text-left">
                          <p className="text-[13px] font-medium text-white truncate">
                            {student.name}
                          </p>
                          <p className="text-[11.5px] text-white/50 truncate">{student.email}</p>
                        </div>
                        <Pill tone={statusTone(student.status)}>{student.status}</Pill>
                      </button>
                    ))}
                  </div>
                )}

                {/* Staff */}
                {results.staff.length > 0 && (
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div className={eyebrow}>Staff</div>
                      <Pill tone="blue">{results.staff.length}</Pill>
                    </div>
                    {results.staff.map((member) => (
                      <button
                        key={member.id}
                        className="w-full flex items-center gap-3 p-3 rounded-xl bg-[hsl(0_0%_12%)] hover:bg-[hsl(0_0%_15%)] border border-white/[0.06] touch-manipulation transition-colors"
                        onClick={() => handleSelectStaff(member)}
                      >
                        <Avatar className="h-9 w-9 shrink-0">
                          <AvatarImage src={member.photo_url ?? undefined} />
                          <AvatarFallback className="bg-blue-500/10 text-blue-400 text-[11px] font-semibold">
                            {getInitials(member.name)}
                          </AvatarFallback>
                        </Avatar>
                        <div className="flex-1 min-w-0 text-left">
                          <p className="text-[13px] font-medium text-white truncate">
                            {member.name}
                          </p>
                          <p className="text-[11.5px] text-white/50 truncate">
                            {getRoleLabel(member.role)} — {member.department}
                          </p>
                        </div>
                        <Pill tone={statusTone(member.status)}>{member.status}</Pill>
                      </button>
                    ))}
                  </div>
                )}

                {/* Cohorts */}
                {results.cohorts.length > 0 && (
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div className={eyebrow}>Cohorts</div>
                      <Pill tone="green">{results.cohorts.length}</Pill>
                    </div>
                    {results.cohorts.map((cohort) => (
                      <button
                        key={cohort.id}
                        className="w-full flex items-center gap-3 p-3 rounded-xl bg-[hsl(0_0%_12%)] hover:bg-[hsl(0_0%_15%)] border border-white/[0.06] touch-manipulation transition-colors"
                        onClick={() => handleSelectCohort(cohort)}
                      >
                        <div className="h-9 w-9 rounded-full bg-green-500/10 border border-green-500/20 flex items-center justify-center shrink-0">
                          <span className="inline-block h-1.5 w-1.5 rounded-full bg-green-400" />
                        </div>
                        <div className="flex-1 min-w-0 text-left">
                          <p className="text-[13px] font-medium text-white truncate">
                            {cohort.name}
                          </p>
                        </div>
                        <Pill tone={statusTone(cohort.status)}>{cohort.status}</Pill>
                      </button>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
