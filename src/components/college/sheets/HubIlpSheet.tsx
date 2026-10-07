import { useEffect, useState } from 'react';
import { FormSheet } from '@/components/forms/FormSheet';
import { inputCn } from '@/components/forms/fieldStyles';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { SectionIlp } from '@/components/college/student360/SectionIlp';

/* ==========================================================================
   HubIlpSheet — the College Hub's ILP editor.

   Replaces the legacy JSONB `college_ilps.targets` sheets. It renders the
   exact Student 360 ILP experience (SectionIlp → useStudentIlp), so every
   edit writes `college_ilps` + `college_ilp_goals` — one source of truth
   shared with the 360. No more split-brain.

   Two modes:
     • view   — a learner is chosen up front (open an existing ILP row).
     • create — show a learner picker first, then the same editor (an empty
                ILP surfaces SectionIlp's "Generate with AI / Create blank").
   ========================================================================== */

interface PickStudent {
  id: string;
  name: string;
  photo_url?: string | null;
  cohort_id?: string | null;
}

interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  mode: 'view' | 'create';
  /** view mode — the learner whose ILP we're opening (college_students.id) */
  student?: { id: string; name: string } | null;
  /** create mode — roster to pick from */
  students?: PickStudent[];
  getCohortName?: (cohortId?: string | null) => string;
  /** Called when the sheet closes so the parent can refresh the list. */
  onClosed?: () => void;
}

export function HubIlpSheet({
  open,
  onOpenChange,
  mode,
  student,
  students = [],
  getCohortName,
  onClosed,
}: Props) {
  const [picked, setPicked] = useState<PickStudent | null>(null);
  const [search, setSearch] = useState('');

  // Reset transient picker state whenever the sheet (re)opens.
  useEffect(() => {
    if (open) {
      setPicked(null);
      setSearch('');
    }
  }, [open]);

  const active = mode === 'view' ? student ?? null : picked;

  const filtered =
    search.trim().length === 0
      ? students
      : students.filter((s) =>
          s.name.toLowerCase().includes(search.trim().toLowerCase())
        );

  return (
    <FormSheet
      open={open}
      onOpenChange={(o) => {
        onOpenChange(o);
        if (!o) onClosed?.();
      }}
      width="wide"
      eyebrow="Individual learning plan"
      title={active ? active.name : 'New ILP'}
      description={active ? undefined : 'Choose the learner this plan is for.'}
    >
      {active ? (
        <SectionIlp id="hub-ilp" studentName={active.name} collegeStudentId={active.id} />
      ) : (
        <StudentPicker
          students={filtered}
          search={search}
          onSearch={setSearch}
          getCohortName={getCohortName}
          onPick={setPicked}
        />
      )}
    </FormSheet>
  );
}

/* ──────────────────────────────────────────────────────── */

function StudentPicker({
  students,
  search,
  onSearch,
  getCohortName,
  onPick,
}: {
  students: PickStudent[];
  search: string;
  onSearch: (v: string) => void;
  getCohortName?: (cohortId?: string | null) => string;
  onPick: (s: PickStudent) => void;
}) {
  return (
    <div className="space-y-4">
      <div className="max-w-xl">
        <label className="sr-only" htmlFor="hub-ilp-search">
          Search learners
        </label>
        <input
          id="hub-ilp-search"
          type="search"
          value={search}
          onChange={(e) => onSearch(e.target.value)}
          placeholder="Search learners"
          className={inputCn}
        />
      </div>
      {students.length === 0 ? (
        <p className="px-1 py-8 text-center text-[13px] text-white">
          {search.trim() ? <>No learners match “{search}”.</> : 'No learners to choose from.'}
        </p>
      ) : (
        <ul className="grid grid-cols-1 gap-x-8 border-t border-white/[0.08] sm:grid-cols-2 lg:grid-cols-3">
          {students.map((s) => {
            const initials = s.name
              .split(' ')
              .map((n) => n[0])
              .join('')
              .toUpperCase()
              .slice(0, 2);
            const cohort = getCohortName ? getCohortName(s.cohort_id) : '';
            return (
              <li key={s.id} className="border-b border-white/[0.08]">
                <button
                  type="button"
                  onClick={() => onPick(s)}
                  className="flex min-h-[60px] w-full items-center gap-3 px-1 py-3 text-left transition-colors touch-manipulation hover:bg-white/[0.03]"
                >
                  <Avatar className="h-9 w-9 shrink-0 ring-1 ring-white/[0.08]">
                    <AvatarImage src={s.photo_url ?? undefined} />
                    <AvatarFallback className="bg-white/[0.06] text-xs font-semibold text-white">
                      {initials || '?'}
                    </AvatarFallback>
                  </Avatar>
                  <div className="min-w-0 flex-1">
                    <div className="truncate text-[14px] font-semibold text-white">{s.name}</div>
                    {cohort && <div className="mt-0.5 truncate text-[12px] text-white">{cohort}</div>}
                  </div>
                  <span className="shrink-0 text-[13px] font-semibold text-elec-yellow">Choose</span>
                </button>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
