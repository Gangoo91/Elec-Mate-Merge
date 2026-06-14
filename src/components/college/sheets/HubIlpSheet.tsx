import { useEffect, useState } from 'react';
import { Sheet, SheetContent } from '@/components/ui/sheet';
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
    <Sheet
      open={open}
      onOpenChange={(o) => {
        onOpenChange(o);
        if (!o) onClosed?.();
      }}
    >
      <SheetContent
        side="bottom"
        className="h-[94vh] sm:max-w-3xl sm:mx-auto p-0 rounded-t-2xl overflow-hidden border-white/10 bg-[hsl(0_0%_8%)]"
      >
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="shrink-0 px-5 sm:px-6 py-4 border-b border-white/[0.06] flex items-center justify-between gap-3">
            <div className="min-w-0">
              <div className="text-[10px] font-medium uppercase tracking-[0.22em] text-elec-yellow">
                Individual learning plan
              </div>
              <h2 className="mt-0.5 text-[16px] sm:text-[18px] font-semibold text-white tracking-tight truncate">
                {active ? active.name : 'New ILP — choose a learner'}
              </h2>
            </div>
            <button
              type="button"
              onClick={() => {
                onOpenChange(false);
                onClosed?.();
              }}
              className="text-[12px] font-medium text-white/70 hover:text-white transition-colors touch-manipulation whitespace-nowrap"
            >
              Done
            </button>
          </div>

          {/* Body */}
          <div className="flex-1 overflow-y-auto px-4 sm:px-6 py-5">
            {active ? (
              <SectionIlp
                id="hub-ilp"
                studentName={active.name}
                collegeStudentId={active.id}
              />
            ) : (
              <StudentPicker
                students={filtered}
                search={search}
                onSearch={setSearch}
                getCohortName={getCohortName}
                onPick={setPicked}
              />
            )}
          </div>
        </div>
      </SheetContent>
    </Sheet>
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
    <div className="space-y-3">
      <input
        type="text"
        value={search}
        onChange={(e) => onSearch(e.target.value)}
        placeholder="Search learners…"
        className="h-11 w-full px-4 bg-[hsl(0_0%_12%)] border border-white/[0.08] rounded-xl text-white text-[13px] placeholder:text-white/55 focus:outline-none focus:border-elec-yellow/60 touch-manipulation"
      />
      {students.length === 0 ? (
        <p className="px-1 py-8 text-center text-[12.5px] text-white/55">
          No learners match “{search}”.
        </p>
      ) : (
        <ul className="rounded-2xl border border-white/[0.06] bg-[hsl(0_0%_10%)] divide-y divide-white/[0.05] overflow-hidden">
          {students.map((s) => {
            const initials = s.name
              .split(' ')
              .map((n) => n[0])
              .join('')
              .toUpperCase()
              .slice(0, 2);
            return (
              <li key={s.id}>
                <button
                  type="button"
                  onClick={() => onPick(s)}
                  className="w-full flex items-center gap-3 px-4 sm:px-5 py-3 text-left hover:bg-white/[0.02] transition-colors touch-manipulation"
                >
                  <Avatar className="h-9 w-9 shrink-0 ring-1 ring-white/[0.08]">
                    <AvatarImage src={s.photo_url ?? undefined} />
                    <AvatarFallback className="bg-white/[0.06] text-white text-xs font-semibold">
                      {initials || '?'}
                    </AvatarFallback>
                  </Avatar>
                  <div className="min-w-0 flex-1">
                    <div className="text-[13.5px] font-medium text-white truncate">{s.name}</div>
                    <div className="mt-0.5 text-[11.5px] text-white/55 truncate">
                      {getCohortName ? getCohortName(s.cohort_id) : ''}
                    </div>
                  </div>
                  <span className="text-white/70 text-[14px] shrink-0">→</span>
                </button>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
