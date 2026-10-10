import { useState, useEffect, useMemo, useRef, useCallback } from 'react';
import { storageGetJSONSync, storageSetJSONSync, storageRemoveSync } from '@/utils/storage';
import { FormSheet } from '@/components/forms/FormSheet';
import { inputCn } from '@/components/forms/fieldStyles';
import { COLLEGE_LIST, COLLEGE_ROW } from '@/components/college/ui/CollegeUi';
import { cn } from '@/lib/utils';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useCollegeSupabase } from '@/contexts/CollegeSupabaseContext';
import type {
  CollegeStudent,
  CollegeStaff,
  CollegeCohort,
} from '@/contexts/CollegeSupabaseContext';
import { getInitials, getRoleLabel } from '@/utils/collegeHelpers';
import type { Tone } from '@/components/college/primitives';

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

  const hasQuery = Boolean(query.trim());

  return (
    <FormSheet
      open={open}
      onOpenChange={onOpenChange}
      width="wide"
      eyebrow="People"
      title="Search people"
      description="Find learners, staff or cohorts by name, email or ULN."
      subheader={
        <div className="relative pb-3">
          <label htmlFor="smart-search-input" className="sr-only">
            Search learners, staff and cohorts
          </label>
          <input
            id="smart-search-input"
            ref={inputRef}
            type="text"
            enterKeyHint="search"
            autoComplete="off"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search learners, staff, cohorts…"
            className={cn(inputCn, 'pr-11')}
          />
          {query && (
            <button
              type="button"
              className="absolute right-0 top-0 flex h-11 w-11 items-center justify-center text-[18px] text-white touch-manipulation hover:text-elec-yellow"
              onClick={() => setQuery('')}
              aria-label="Clear search"
            >
              ×
            </button>
          )}
        </div>
      }
      bodyClassName={
        hasQuery && totalResults > 0
          ? 'grid grid-cols-1 items-start gap-x-10 gap-y-6 pt-5 lg:grid-cols-2'
          : 'space-y-5 pt-5'
      }
    >
      {!hasQuery && recentSearches.length > 0 && (
        <section className="max-w-2xl">
          <div className="mb-2 flex items-center justify-between">
            <h3 className="text-[13px] font-semibold text-white">Recent searches</h3>
            <button
              type="button"
              className="flex h-11 items-center px-1 text-[13px] font-semibold text-elec-yellow touch-manipulation"
              onClick={clearRecentSearches}
            >
              Clear
            </button>
          </div>
          <div className={COLLEGE_LIST}>
            {recentSearches.map((recent) => (
              <button
                type="button"
                key={recent.timestamp}
                className={COLLEGE_ROW}
                onClick={() => setQuery(recent.query)}
              >
                <span className="text-[14px] text-white">{recent.query}</span>
              </button>
            ))}
          </div>
        </section>
      )}

      {!hasQuery && recentSearches.length === 0 && (
        <p className="py-10 text-center text-[14px] text-white">
          Start typing to find learners, staff or cohorts.
        </p>
      )}

      {hasQuery && totalResults === 0 && (
        <p className="py-10 text-center text-[14px] text-white">
          Nothing matches &ldquo;{query}&rdquo;.
        </p>
      )}

      {hasQuery && results.students.length > 0 && (
        <ResultGroup title="Learners" count={results.students.length}>
          {results.students.map((student) => (
            <button
              type="button"
              key={student.id}
              className={COLLEGE_ROW}
              onClick={() => handleSelectStudent(student)}
            >
              <PersonAvatar name={student.name} photo={student.photo_url} />
              <div className="min-w-0 flex-1 text-left">
                <p className="truncate text-[14px] font-medium text-white">{student.name}</p>
                <p className="truncate text-[12.5px] text-white">{student.email}</p>
              </div>
              <StatusText status={student.status} />
            </button>
          ))}
        </ResultGroup>
      )}

      {hasQuery && (results.staff.length > 0 || results.cohorts.length > 0) && (
        <div className="space-y-6">
          {results.staff.length > 0 && (
            <ResultGroup title="Staff" count={results.staff.length}>
              {results.staff.map((member) => (
                <button
                  type="button"
                  key={member.id}
                  className={COLLEGE_ROW}
                  onClick={() => handleSelectStaff(member)}
                >
                  <PersonAvatar name={member.name} photo={member.photo_url} />
                  <div className="min-w-0 flex-1 text-left">
                    <p className="truncate text-[14px] font-medium text-white">{member.name}</p>
                    <p className="truncate text-[12.5px] text-white">
                      {getRoleLabel(member.role)}
                      {member.department ? ` · ${member.department}` : ''}
                    </p>
                  </div>
                  <StatusText status={member.status} />
                </button>
              ))}
            </ResultGroup>
          )}

          {results.cohorts.length > 0 && (
            <ResultGroup title="Cohorts" count={results.cohorts.length}>
              {results.cohorts.map((cohort) => (
                <button
                  type="button"
                  key={cohort.id}
                  className={COLLEGE_ROW}
                  onClick={() => handleSelectCohort(cohort)}
                >
                  <div className="min-w-0 flex-1 text-left">
                    <p className="truncate text-[14px] font-medium text-white">{cohort.name}</p>
                  </div>
                  <StatusText status={cohort.status} />
                </button>
              ))}
            </ResultGroup>
          )}
        </div>
      )}
    </FormSheet>
  );
}

function ResultGroup({
  title,
  count,
  children,
}: {
  title: string;
  count: number;
  children: React.ReactNode;
}) {
  return (
    <section>
      <h3 className="mb-2 text-[13px] font-semibold text-white">
        {title} <span className="tabular-nums">· {count}</span>
      </h3>
      <div className={COLLEGE_LIST}>{children}</div>
    </section>
  );
}

function PersonAvatar({ name, photo }: { name: string; photo?: string | null }) {
  return (
    <Avatar className="h-9 w-9 shrink-0">
      <AvatarImage src={photo ?? undefined} />
      <AvatarFallback className="bg-white/[0.08] text-[12px] font-semibold text-white">
        {getInitials(name)}
      </AvatarFallback>
    </Avatar>
  );
}

function StatusText({ status }: { status: string }) {
  const tone = statusTone(status);
  return (
    <span
      className={cn(
        'shrink-0 text-[12.5px] font-medium capitalize',
        tone === 'red' || tone === 'amber'
          ? 'text-orange-300'
          : tone === 'green'
            ? 'text-emerald-300'
            : 'text-white'
      )}
    >
      {status.replace(/_/g, ' ')}
    </span>
  );
}
