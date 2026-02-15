import { useState, useEffect, useMemo, useRef, useCallback } from 'react';
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useCollegeSupabase } from '@/contexts/CollegeSupabaseContext';
import type {
  CollegeStudent,
  CollegeStaff,
  CollegeCohort,
} from '@/contexts/CollegeSupabaseContext';
import { getInitials, getStatusColour, getRoleLabel } from '@/utils/collegeHelpers';
import { Search, GraduationCap, UserCog, UsersRound, Clock, X } from 'lucide-react';

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

  // Load recent searches from localStorage
  useEffect(() => {
    try {
      const stored = localStorage.getItem(RECENT_SEARCHES_KEY);
      if (stored) setRecentSearches(JSON.parse(stored));
    } catch {
      // ignore
    }
  }, []);

  // Focus input when sheet opens
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
      localStorage.setItem(RECENT_SEARCHES_KEY, JSON.stringify(updated));
    },
    [recentSearches]
  );

  const clearRecentSearches = () => {
    setRecentSearches([]);
    localStorage.removeItem(RECENT_SEARCHES_KEY);
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
      <SheetContent side="bottom" className="h-[85vh] p-0 rounded-t-2xl overflow-hidden">
        <div className="flex flex-col h-full bg-background">
          {/* Drag Handle */}
          <div className="flex justify-center pt-2.5 pb-1 flex-shrink-0">
            <div className="h-1 w-10 rounded-full bg-white/20" />
          </div>

          {/* Search Header */}
          <SheetHeader className="flex-shrink-0 px-4 pb-3">
            <SheetTitle className="sr-only">Search People</SheetTitle>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-white" />
              <Input
                ref={inputRef}
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search students, staff, cohorts..."
                className="pl-9 pr-9 h-12 text-base touch-manipulation bg-elec-gray border-white/10 focus:border-elec-yellow"
              />
              {query && (
                <button
                  className="absolute right-3 top-1/2 -translate-y-1/2 h-6 w-6 flex items-center justify-center rounded-full bg-white/10 touch-manipulation"
                  onClick={() => setQuery('')}
                >
                  <X className="h-3.5 w-3.5 text-white" />
                </button>
              )}
            </div>
          </SheetHeader>

          {/* Results */}
          <div className="flex-1 overflow-y-auto overscroll-contain px-4 pb-4">
            {/* No query — show recent searches */}
            {!query.trim() && recentSearches.length > 0 && (
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <h3 className="text-xs font-semibold text-white uppercase tracking-wider">
                    Recent Searches
                  </h3>
                  <button
                    className="text-xs text-white touch-manipulation"
                    onClick={clearRecentSearches}
                  >
                    Clear
                  </button>
                </div>
                {recentSearches.map((recent) => (
                  <button
                    key={recent.timestamp}
                    className="w-full flex items-center gap-3 p-3 rounded-lg bg-elec-gray/50 hover:bg-elec-gray border border-white/5 touch-manipulation transition-colors"
                    onClick={() => setQuery(recent.query)}
                  >
                    <Clock className="h-4 w-4 text-white shrink-0" />
                    <span className="text-sm text-white">{recent.query}</span>
                  </button>
                ))}
              </div>
            )}

            {/* No query, no recent */}
            {!query.trim() && recentSearches.length === 0 && (
              <div className="flex flex-col items-center justify-center py-16 text-center">
                <Search className="h-12 w-12 text-white mb-3" />
                <p className="text-sm font-medium text-white">Search everyone</p>
                <p className="text-xs text-white mt-1">
                  Find students, staff, or cohorts by name, email, or ULN
                </p>
              </div>
            )}

            {/* Results with query */}
            {query.trim() && (
              <div className="space-y-4">
                {/* No results */}
                {totalResults === 0 && (
                  <div className="flex flex-col items-center py-12 text-center">
                    <Search className="h-10 w-10 text-white mb-3" />
                    <p className="text-sm text-white">No results for "{query}"</p>
                  </div>
                )}

                {/* Students */}
                {results.students.length > 0 && (
                  <div className="space-y-2">
                    <h3 className="text-xs font-semibold text-white uppercase tracking-wider flex items-center gap-2">
                      <GraduationCap className="h-3.5 w-3.5 text-elec-yellow" />
                      Students
                      <Badge variant="secondary" className="text-[10px] ml-auto">
                        {results.students.length}
                      </Badge>
                    </h3>
                    {results.students.map((student) => (
                      <button
                        key={student.id}
                        className="w-full flex items-center gap-3 p-3 rounded-lg bg-elec-gray/50 hover:bg-elec-gray border border-white/5 touch-manipulation transition-colors"
                        onClick={() => handleSelectStudent(student)}
                      >
                        <Avatar className="h-9 w-9 shrink-0">
                          <AvatarImage src={student.photo_url ?? undefined} />
                          <AvatarFallback className="bg-elec-yellow/10 text-elec-yellow text-xs font-semibold">
                            {getInitials(student.name)}
                          </AvatarFallback>
                        </Avatar>
                        <div className="flex-1 min-w-0 text-left">
                          <p className="text-sm font-medium text-white truncate">{student.name}</p>
                          <p className="text-xs text-white truncate">{student.email}</p>
                        </div>
                        <Badge
                          variant="outline"
                          className={`${getStatusColour(student.status)} text-[10px] shrink-0`}
                        >
                          {student.status}
                        </Badge>
                      </button>
                    ))}
                  </div>
                )}

                {/* Staff */}
                {results.staff.length > 0 && (
                  <div className="space-y-2">
                    <h3 className="text-xs font-semibold text-white uppercase tracking-wider flex items-center gap-2">
                      <UserCog className="h-3.5 w-3.5 text-info" />
                      Staff
                      <Badge variant="secondary" className="text-[10px] ml-auto">
                        {results.staff.length}
                      </Badge>
                    </h3>
                    {results.staff.map((member) => (
                      <button
                        key={member.id}
                        className="w-full flex items-center gap-3 p-3 rounded-lg bg-elec-gray/50 hover:bg-elec-gray border border-white/5 touch-manipulation transition-colors"
                        onClick={() => handleSelectStaff(member)}
                      >
                        <Avatar className="h-9 w-9 shrink-0">
                          <AvatarImage src={member.photo_url ?? undefined} />
                          <AvatarFallback className="bg-info/10 text-info text-xs font-semibold">
                            {getInitials(member.name)}
                          </AvatarFallback>
                        </Avatar>
                        <div className="flex-1 min-w-0 text-left">
                          <p className="text-sm font-medium text-white truncate">{member.name}</p>
                          <p className="text-xs text-white truncate">
                            {getRoleLabel(member.role)} — {member.department}
                          </p>
                        </div>
                        <Badge
                          variant="outline"
                          className={`${getStatusColour(member.status)} text-[10px] shrink-0`}
                        >
                          {member.status}
                        </Badge>
                      </button>
                    ))}
                  </div>
                )}

                {/* Cohorts */}
                {results.cohorts.length > 0 && (
                  <div className="space-y-2">
                    <h3 className="text-xs font-semibold text-white uppercase tracking-wider flex items-center gap-2">
                      <UsersRound className="h-3.5 w-3.5 text-success" />
                      Cohorts
                      <Badge variant="secondary" className="text-[10px] ml-auto">
                        {results.cohorts.length}
                      </Badge>
                    </h3>
                    {results.cohorts.map((cohort) => (
                      <button
                        key={cohort.id}
                        className="w-full flex items-center gap-3 p-3 rounded-lg bg-elec-gray/50 hover:bg-elec-gray border border-white/5 touch-manipulation transition-colors"
                        onClick={() => handleSelectCohort(cohort)}
                      >
                        <div className="h-9 w-9 rounded-full bg-success/10 flex items-center justify-center shrink-0">
                          <UsersRound className="h-4 w-4 text-success" />
                        </div>
                        <div className="flex-1 min-w-0 text-left">
                          <p className="text-sm font-medium text-white truncate">{cohort.name}</p>
                        </div>
                        <Badge
                          variant="outline"
                          className={`${getStatusColour(cohort.status)} text-[10px] shrink-0`}
                        >
                          {cohort.status}
                        </Badge>
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
