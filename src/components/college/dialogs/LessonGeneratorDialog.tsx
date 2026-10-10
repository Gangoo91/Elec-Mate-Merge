import { useEffect, useMemo, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useQueryClient } from '@tanstack/react-query';
import { cn } from '@/lib/utils';
import { supabase } from '@/integrations/supabase/client';
import { getMyCollegeId } from '@/lib/myCollege';
import type { AcRow, GenerateLessonInput } from '@/hooks/useCurriculum';
import {
  useLessonGenerationStream,
  type LessonGenerationInput,
} from '@/hooks/useLessonGenerationStream';
import { FormSheet } from '@/components/forms/FormSheet';
import {
  buttonPrimaryCn,
  buttonSecondaryCn,
  inputCn,
  textareaCn,
} from '@/components/forms/fieldStyles';
import { choiceCn } from '@/components/college/teaching/TeachingKit';

/** The landing-page card surface, edge to edge on a phone. */
const COLLEGE_CARD =
  '-mx-4 card-surface max-sm:!rounded-none max-sm:!border-x-0 border-y border-white/[0.08] p-5 sm:mx-0 sm:rounded-2xl sm:border sm:p-6';
import { LessonGenerationProgress } from '@/components/college/dialogs/LessonGenerationProgress';
import { ScheduleLessonDialog } from '@/components/college/dialogs/ScheduleLessonDialog';

/* ==========================================================================
   LessonGeneratorDialog: shape the session, then watch the plan being built.

   Two steps in one wide bottom sheet (FormSheet):
   1. Shape the session. Criteria, who is in the room, length, delivery,
      the room's kit, the Ofsted strands and a free note. On desktop a live
      summary on the right says exactly what will be generated.
   2. The live generation (LessonGenerationProgress), which runs here rather
      than on a separate page, and ends on Open the plan / Build slides /
      Schedule it.
   Name kept for the importers (StartLessonPlanSheet, CoursesSection); the
   prop contract is unchanged.
   ========================================================================== */

interface CohortOption {
  id: string;
  name: string;
  learner_count: number;
  send_count: number;
  eal_count: number;
  ehcp_count: number;
  first_names: string[];
}

interface Props {
  open: boolean;
  onOpenChange: (v: boolean) => void;
  qualificationCode: string;
  qualificationTitle: string;
  unitCode: string;
  unitTitle: string | null;
  initialAcs: AcRow[];
  availableAcs: AcRow[];
  cohortId?: string | null;
}

type Mode = NonNullable<GenerateLessonInput['delivery_mode']>;

const DURATIONS = [60, 90, 120, 180];

const MODE_OPTIONS: { value: Mode; label: string }[] = [
  { value: 'classroom', label: 'Classroom' },
  { value: 'workshop', label: 'Workshop' },
  { value: 'hybrid', label: 'Hybrid' },
  { value: 'online', label: 'Online' },
];

/** Starting points for the room's kit. Tutors add their own. */
const KIT_SUGGESTIONS: Record<Mode, string[]> = {
  classroom: [
    'Projector',
    'Whiteboard',
    'Printed handouts',
    'Mini whiteboards',
    'Laptops or tablets',
  ],
  workshop: [
    'Isolation training boards',
    'Multifunction testers',
    'Consumer unit rigs',
    'Workshop bays',
    'Printed handouts',
  ],
  hybrid: ['Projector', 'Webcam and mic', 'Printed handouts', 'Isolation training boards'],
  online: ['Screen share', 'Breakout rooms', 'Online quiz tool', 'Shared document'],
};

interface Flag {
  key: 'bv' | 'sc' | 'ip' | 'diff' | 'hs' | 'hw';
  label: string;
  hint: string;
}

const OFSTED_FLAGS: Flag[] = [
  {
    key: 'bv',
    label: 'British values',
    hint: 'Two or more values tied to a real activity, never a tick box.',
  },
  {
    key: 'sc',
    label: 'Stretch and challenge',
    hint: 'Extension tasks for the strongest learners, at analyse or evaluate level.',
  },
  {
    key: 'ip',
    label: 'Inclusive practice',
    hint: 'Concrete moves for SEND, EAL and EHCP, named for this cohort.',
  },
];

const OTHER_FLAGS: Flag[] = [
  { key: 'diff', label: 'Differentiation', hint: 'Support and stretch notes for each part.' },
  { key: 'hs', label: 'Health and safety', hint: 'Risks and controls for the practical work.' },
  { key: 'hw', label: 'Homework', hint: 'One independent task with a time estimate.' },
];

export function LessonGeneratorDialog({
  open,
  onOpenChange,
  qualificationCode,
  unitCode,
  unitTitle,
  initialAcs,
  availableAcs,
  cohortId,
}: Props) {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const gen = useLessonGenerationStream();

  const [step, setStep] = useState<'shape' | 'run'>('shape');
  const [selected, setSelected] = useState<Set<string>>(
    () => new Set(initialAcs.map((a) => a.ac_code))
  );
  const [criteriaOpen, setCriteriaOpen] = useState(initialAcs.length === 0);
  const [search, setSearch] = useState('');
  const [length, setLength] = useState(90);
  const [customLength, setCustomLength] = useState(false);
  const [mode, setMode] = useState<Mode>('classroom');
  const [flags, setFlags] = useState<Record<Flag['key'], boolean>>({
    bv: true,
    sc: true,
    ip: true,
    diff: true,
    hs: true,
    hw: true,
  });
  const [kit, setKit] = useState<string[]>([]);
  const [kitDraft, setKitDraft] = useState('');
  const [note, setNote] = useState('');
  const [groupSize, setGroupSize] = useState<number | null>(null);
  const groupSizeTouched = useRef(false);

  const [cohorts, setCohorts] = useState<CohortOption[]>([]);
  const [selectedCohortId, setSelectedCohortId] = useState<string | null>(cohortId ?? null);
  const [loadingCohorts, setLoadingCohorts] = useState(false);

  const [lastInput, setLastInput] = useState<LessonGenerationInput | null>(null);
  const [scheduleOpen, setScheduleOpen] = useState(false);
  const [scheduled, setScheduled] = useState(false);

  // Cohorts for this college, with inclusion counts, and the college's
  // Ofsted defaults (curriculum settings) for the three strands.
  useEffect(() => {
    if (!open) return;
    let cancelled = false;
    setLoadingCohorts(true);
    (async () => {
      const { data: userRes } = await supabase.auth.getUser();
      if (!userRes?.user) {
        if (!cancelled) setLoadingCohorts(false);
        return;
      }
      const collegeId = await getMyCollegeId(userRes.user.id).catch(() => null);
      if (!collegeId) {
        if (!cancelled) setLoadingCohorts(false);
        return;
      }
      const [{ data: rows }, { data: settings }] = await Promise.all([
        supabase
          .from('college_cohorts')
          .select('id, name, status')
          .eq('college_id', collegeId)
          .order('name'),
        supabase
          .from('college_curriculum_settings')
          .select('include_british_values, include_stretch_challenge, include_inclusive_practice')
          .eq('college_id', collegeId)
          .maybeSingle(),
      ]);
      if (cancelled) return;
      if (settings) {
        setFlags((f) => ({
          ...f,
          bv: settings.include_british_values ?? true,
          sc: settings.include_stretch_challenge ?? true,
          ip: settings.include_inclusive_practice ?? true,
        }));
      }
      const active = (rows ?? []).filter((r) => r.status !== 'archived' && r.status !== 'Archived');
      if (active.length === 0) {
        setCohorts([]);
        setLoadingCohorts(false);
        return;
      }
      const ids = active.map((r) => r.id as string);
      const { data: students } = await supabase
        .from('college_students')
        .select('id, name, cohort_id, send_flags, eal, ehcp_ref')
        .in('cohort_id', ids)
        .not('status', 'ilike', 'withdrawn')
        .not('status', 'ilike', 'completed');
      const byCohort = new Map<
        string,
        { names: string[]; send: number; eal: number; ehcp: number }
      >();
      for (const s of (students ?? []) as {
        name: string;
        cohort_id: string;
        send_flags: string[] | null;
        eal: boolean | null;
        ehcp_ref: string | null;
      }[]) {
        if (!s.cohort_id) continue;
        const entry = byCohort.get(s.cohort_id) ?? { names: [], send: 0, eal: 0, ehcp: 0 };
        entry.names.push((s.name ?? '').split(/\s+/)[0] ?? '');
        if (Array.isArray(s.send_flags) && s.send_flags.length > 0) entry.send++;
        if (s.eal) entry.eal++;
        if (s.ehcp_ref) entry.ehcp++;
        byCohort.set(s.cohort_id, entry);
      }
      if (cancelled) return;
      setCohorts(
        active.map((r) => {
          const e = byCohort.get(r.id as string) ?? { names: [], send: 0, eal: 0, ehcp: 0 };
          return {
            id: r.id as string,
            name: r.name as string,
            learner_count: e.names.length,
            send_count: e.send,
            eal_count: e.eal,
            ehcp_count: e.ehcp,
            first_names: e.names,
          };
        })
      );
      setLoadingCohorts(false);
    })();
    return () => {
      cancelled = true;
    };
  }, [open]);

  const selectedCohort = useMemo(
    () => cohorts.find((c) => c.id === selectedCohortId) ?? null,
    [cohorts, selectedCohortId]
  );

  // Group size follows the cohort roll until the tutor changes it.
  useEffect(() => {
    if (groupSizeTouched.current) return;
    setGroupSize(
      selectedCohort && selectedCohort.learner_count > 0 ? selectedCohort.learner_count : null
    );
  }, [selectedCohort]);

  const grouped = useMemo(() => {
    const map = new Map<number, { lo_text: string; acs: AcRow[] }>();
    for (const ac of availableAcs) {
      let g = map.get(ac.lo_number);
      if (!g) {
        g = { lo_text: ac.lo_text, acs: [] };
        map.set(ac.lo_number, g);
      }
      g.acs.push(ac);
    }
    return Array.from(map.entries()).sort((a, b) => a[0] - b[0]);
  }, [availableAcs]);

  const filteredGrouped = useMemo(() => {
    if (!search.trim()) return grouped;
    const q = search.toLowerCase();
    return grouped
      .map(
        ([n, { lo_text, acs }]) =>
          [
            n,
            {
              lo_text,
              acs: acs.filter(
                (ac) =>
                  ac.ac_code.includes(q) ||
                  ac.ac_text.toLowerCase().includes(q) ||
                  lo_text.toLowerCase().includes(q)
              ),
            },
          ] as [number, { lo_text: string; acs: AcRow[] }]
      )
      .filter(([, g]) => g.acs.length > 0);
  }, [grouped, search]);

  const selectedAcs = useMemo(
    () => availableAcs.filter((a) => selected.has(a.ac_code)),
    [availableAcs, selected]
  );
  const totalAcs = availableAcs.length;

  const toggleAc = (code: string) => {
    const next = new Set(selected);
    if (next.has(code)) next.delete(code);
    else next.add(code);
    setSelected(next);
  };

  const toggleLo = (acs: AcRow[]) => {
    const codes = acs.map((a) => a.ac_code);
    const allSelected = codes.every((c) => selected.has(c));
    const next = new Set(selected);
    if (allSelected) codes.forEach((c) => next.delete(c));
    else codes.forEach((c) => next.add(c));
    setSelected(next);
  };

  const addKit = (item: string) => {
    const v = item.trim().slice(0, 60);
    if (!v) return;
    setKit((k) =>
      k.some((x) => x.toLowerCase() === v.toLowerCase()) ? k : [...k, v].slice(0, 12)
    );
    setKitDraft('');
  };
  const toggleKit = (item: string) =>
    setKit((k) => (k.includes(item) ? k.filter((x) => x !== item) : [...k, item].slice(0, 12)));

  const lengthValid = length >= 30 && length <= 300;
  const canGenerate = selected.size > 0 && lengthValid;
  const modeLabel = MODE_OPTIONS.find((m) => m.value === mode)?.label ?? 'Classroom';

  const run = (input: LessonGenerationInput) => {
    setLastInput(input);
    setScheduled(false);
    setStep('run');
    void gen.start(input).then((result) => {
      if (result?.lesson_plan_id) {
        void queryClient.invalidateQueries({ queryKey: ['college-lesson-plans'] });
      }
    });
  };

  const handleGenerate = () => {
    if (!canGenerate) return;
    run({
      qualification_code: qualificationCode,
      unit_code: unitCode,
      ac_codes: Array.from(selected),
      cohort_id: selectedCohortId,
      session_length_mins: length,
      delivery_mode: mode,
      include_homework: flags.hw,
      include_differentiation: flags.diff,
      include_hs: flags.hs,
      include_british_values: flags.bv,
      include_stretch_challenge: flags.sc,
      include_inclusive_practice: flags.ip,
      group_size: groupSize,
      room_equipment: kit,
      tutor_note: note.trim() || null,
      save_to_db: true,
    });
  };

  const close = () => {
    if (gen.state.status === 'running') gen.cancel();
    onOpenChange(false);
  };

  const planId = gen.state.result?.lesson_plan_id ?? null;
  const goTo = (path: string, state?: unknown) => {
    onOpenChange(false);
    navigate(path, state ? { state } : undefined);
  };

  const running = gen.state.status === 'running';
  const shapeStep = step === 'shape';

  const unitLine = (
    <>
      <span className="font-mono tabular-nums">{qualificationCode}</span> · Unit{' '}
      <span className="font-mono tabular-nums">{unitCode}</span>
      {unitTitle && <> · {unitTitle}</>}
    </>
  );

  const includes = [
    ...OFSTED_FLAGS.filter((f) => flags[f.key]),
    ...OTHER_FLAGS.filter((f) => flags[f.key]),
  ].map((f) => f.label.toLowerCase());

  return (
    <>
      <FormSheet
        open={open}
        onOpenChange={(v) => !v && close()}
        width="wide"
        bodyClassName={
          shapeStep
            ? 'grid grid-cols-1 items-start gap-x-10 gap-y-7 lg:grid-cols-[minmax(0,1fr)_minmax(0,380px)]'
            : 'space-y-0'
        }
        eyebrow="Lesson planner · uses AI"
        title={
          shapeStep
            ? 'Shape the session'
            : gen.state.status === 'done'
              ? 'Your plan is ready'
              : 'Building your plan'
        }
        description={unitLine}
        footerClassName="lg:hidden"
        footer={
          shapeStep ? (
            <div className="grid grid-cols-[1fr_1.6fr] gap-2.5">
              <button type="button" onClick={close} className={buttonSecondaryCn}>
                Cancel
              </button>
              <button
                type="button"
                onClick={handleGenerate}
                disabled={!canGenerate}
                className={buttonPrimaryCn}
              >
                {selected.size === 0 ? 'Pick a criterion' : 'Build lesson plan'}
              </button>
            </div>
          ) : running ? (
            <button type="button" onClick={gen.cancel} className={cn(buttonSecondaryCn, 'w-full')}>
              Stop generating
            </button>
          ) : undefined
        }
      >
        {shapeStep ? (
          <>
            {/* ── Left: everything the tutor sets ── */}
            <div className="min-w-0 space-y-7">
              <Section
                title="Criteria to cover"
                aside={
                  <button
                    type="button"
                    onClick={() => setCriteriaOpen((v) => !v)}
                    className="inline-flex h-11 items-center px-1 text-[13px] font-semibold text-white touch-manipulation hover:text-elec-yellow"
                    aria-expanded={criteriaOpen}
                  >
                    {criteriaOpen ? 'Done' : `Change (${selected.size} of ${totalAcs})`}
                  </button>
                }
              >
                {!criteriaOpen ? (
                  selectedAcs.length === 0 ? (
                    <p className="text-[13px] text-orange-300">Pick at least one criterion.</p>
                  ) : (
                    <ul className="space-y-2">
                      {selectedAcs.map((ac) => (
                        <li key={ac.ac_code} className="flex gap-3">
                          <span className="w-10 shrink-0 font-mono text-[12.5px] font-semibold tabular-nums text-elec-yellow">
                            {ac.ac_code}
                          </span>
                          <span className="min-w-0 flex-1 text-[13.5px] leading-snug text-white">
                            {ac.ac_text}
                          </span>
                        </li>
                      ))}
                    </ul>
                  )
                ) : (
                  <>
                    <div className="flex items-center gap-3">
                      <label htmlFor="lg-search" className="sr-only">
                        Search criteria
                      </label>
                      <input
                        id="lg-search"
                        type="text"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        placeholder="Search by code or keyword"
                        className={inputCn}
                      />
                      {selected.size > 0 && (
                        <button
                          type="button"
                          onClick={() => setSelected(new Set())}
                          className="inline-flex h-11 shrink-0 items-center px-1 text-[13px] font-semibold text-white touch-manipulation hover:text-elec-yellow"
                        >
                          Clear
                        </button>
                      )}
                    </div>
                    <div className="space-y-3">
                      {filteredGrouped.length === 0 ? (
                        <div className="rounded-2xl border border-dashed border-white/[0.14] px-5 py-8 text-center text-[13px] text-white">
                          No criteria match "{search}"
                        </div>
                      ) : (
                        filteredGrouped.map(([loNum, { lo_text, acs }]) => (
                          <LoGroup
                            key={loNum}
                            loNum={loNum}
                            loText={lo_text}
                            acs={acs}
                            selected={selected}
                            onToggleAc={toggleAc}
                            onToggleAll={() => toggleLo(acs)}
                          />
                        ))
                      )}
                    </div>
                  </>
                )}
              </Section>

              <Section title="Who's in the room">
                {loadingCohorts && cohorts.length === 0 ? (
                  <p className="text-[13px] text-white">Loading cohorts…</p>
                ) : cohorts.length === 0 ? (
                  <p className="text-[13px] leading-relaxed text-white">
                    No active cohorts. You can still build a general plan.
                  </p>
                ) : (
                  <div className="flex flex-wrap gap-2">
                    <button
                      type="button"
                      aria-pressed={selectedCohortId === null}
                      onClick={() => setSelectedCohortId(null)}
                      className={choiceCn(selectedCohortId === null)}
                    >
                      No cohort
                    </button>
                    {cohorts.map((c) => (
                      <button
                        key={c.id}
                        type="button"
                        aria-pressed={selectedCohortId === c.id}
                        onClick={() => setSelectedCohortId(c.id)}
                        className={choiceCn(selectedCohortId === c.id)}
                      >
                        {c.name}
                        {c.learner_count > 0 && (
                          <span className="ml-1.5 tabular-nums">{c.learner_count}</span>
                        )}
                      </button>
                    ))}
                  </div>
                )}

                {selectedCohort && (
                  <p className="text-[13px] leading-relaxed text-white">
                    {selectedCohort.first_names.length > 0 && (
                      <>
                        {selectedCohort.first_names.slice(0, 4).join(', ')}
                        {selectedCohort.first_names.length > 4 &&
                          ` and ${selectedCohort.first_names.length - 4} more`}
                        .{' '}
                      </>
                    )}
                    {selectedCohort.send_count === 0 &&
                    selectedCohort.eal_count === 0 &&
                    selectedCohort.ehcp_count === 0
                      ? 'No inclusion needs recorded, so the plan uses general differentiation.'
                      : [
                          selectedCohort.send_count > 0 && `${selectedCohort.send_count} SEND`,
                          selectedCohort.eal_count > 0 && `${selectedCohort.eal_count} EAL`,
                          selectedCohort.ehcp_count > 0 && `${selectedCohort.ehcp_count} EHCP`,
                        ]
                          .filter(Boolean)
                          .join(', ') +
                        '. The plan adapts for them, and for where the cohort is on these criteria.'}
                  </p>
                )}

                <div className="flex items-center justify-between gap-4">
                  <div>
                    <p className="text-[13.5px] font-semibold text-white">Group size</p>
                    <p className="text-[12.5px] text-white">
                      {selectedCohort
                        ? 'From the roll. Change it if fewer are in.'
                        : 'Sets the pairs and groups.'}
                    </p>
                  </div>
                  <Stepper
                    value={groupSize}
                    onChange={(v) => {
                      groupSizeTouched.current = true;
                      setGroupSize(v);
                    }}
                  />
                </div>
              </Section>

              <Section title="Length and delivery">
                <div>
                  <p className="mb-2 text-[12px] font-medium text-white">Length</p>
                  <div className="flex flex-wrap gap-2">
                    {DURATIONS.map((d) => (
                      <button
                        key={d}
                        type="button"
                        aria-pressed={!customLength && length === d}
                        onClick={() => {
                          setCustomLength(false);
                          setLength(d);
                        }}
                        className={cn(
                          choiceCn(!customLength && length === d),
                          'min-w-[72px] tabular-nums'
                        )}
                      >
                        {d} min
                      </button>
                    ))}
                    <button
                      type="button"
                      aria-pressed={customLength}
                      onClick={() => setCustomLength(true)}
                      className={choiceCn(customLength)}
                    >
                      Custom
                    </button>
                  </div>
                  {customLength && (
                    <div className="mt-3 flex max-w-[220px] items-baseline gap-2">
                      <label htmlFor="lg-len" className="sr-only">
                        Length in minutes
                      </label>
                      <input
                        id="lg-len"
                        type="number"
                        inputMode="numeric"
                        min={30}
                        max={300}
                        step={5}
                        value={length || ''}
                        onChange={(e) => setLength(Number(e.target.value))}
                        className={cn(inputCn, 'tabular-nums')}
                        autoFocus
                      />
                      <span className="text-[13px] text-white">min</span>
                    </div>
                  )}
                  {customLength && !lengthValid && (
                    <p className="mt-1.5 text-[12.5px] text-orange-300">
                      Between 30 and 300 minutes.
                    </p>
                  )}
                </div>

                <div>
                  <p className="mb-2 text-[12px] font-medium text-white">Delivery</p>
                  <div className="flex flex-wrap gap-2">
                    {MODE_OPTIONS.map((opt) => (
                      <button
                        key={opt.value}
                        type="button"
                        aria-pressed={mode === opt.value}
                        onClick={() => setMode(opt.value)}
                        className={cn(choiceCn(mode === opt.value), 'min-w-[88px]')}
                      >
                        {opt.label}
                      </button>
                    ))}
                  </div>
                </div>
              </Section>

              <Section title="Room and equipment">
                <p className="-mt-2 text-[12.5px] leading-snug text-white">
                  Activities only use what you have. Tap what's in the room, or add your own.
                </p>
                <div className="flex flex-wrap gap-2">
                  {Array.from(new Set([...KIT_SUGGESTIONS[mode], ...kit])).map((item) => (
                    <button
                      key={item}
                      type="button"
                      aria-pressed={kit.includes(item)}
                      onClick={() => toggleKit(item)}
                      className={choiceCn(kit.includes(item))}
                    >
                      {kit.includes(item) && (
                        <span aria-hidden className="mr-1">
                          ✓
                        </span>
                      )}
                      {item}
                    </button>
                  ))}
                </div>
                <form
                  className="flex items-center gap-3"
                  onSubmit={(e) => {
                    e.preventDefault();
                    addKit(kitDraft);
                  }}
                >
                  <label htmlFor="lg-kit" className="sr-only">
                    Add equipment
                  </label>
                  <input
                    id="lg-kit"
                    type="text"
                    value={kitDraft}
                    onChange={(e) => setKitDraft(e.target.value)}
                    placeholder="Add something else, e.g. 3-phase rig"
                    className={inputCn}
                    maxLength={60}
                  />
                  <button
                    type="submit"
                    disabled={!kitDraft.trim()}
                    className="inline-flex h-11 shrink-0 items-center rounded-xl border border-white/[0.14] px-4 text-[13px] font-semibold text-white touch-manipulation hover:border-elec-yellow disabled:border-white/[0.06]"
                  >
                    Add
                  </button>
                </form>
              </Section>

              <Section title="What the plan includes">
                <div>
                  <p className="mb-2 text-[12px] font-medium text-white">Ofsted expectations</p>
                  <div className="-mx-4 divide-y divide-white/[0.06] border-y border-white/[0.08] sm:mx-0 sm:overflow-hidden sm:rounded-2xl sm:border-x">
                    {OFSTED_FLAGS.map((f) => (
                      <ToggleRow
                        key={f.key}
                        flag={f}
                        on={flags[f.key]}
                        onToggle={() => setFlags((s) => ({ ...s, [f.key]: !s[f.key] }))}
                      />
                    ))}
                  </div>
                </div>
                <div>
                  <p className="mb-2 text-[12px] font-medium text-white">Also include</p>
                  <div className="-mx-4 divide-y divide-white/[0.06] border-y border-white/[0.08] sm:mx-0 sm:overflow-hidden sm:rounded-2xl sm:border-x">
                    {OTHER_FLAGS.map((f) => (
                      <ToggleRow
                        key={f.key}
                        flag={f}
                        on={flags[f.key]}
                        onToggle={() => setFlags((s) => ({ ...s, [f.key]: !s[f.key] }))}
                      />
                    ))}
                  </div>
                </div>
              </Section>

              <Section title="Anything else?">
                <label htmlFor="lg-note" className="sr-only">
                  Anything else the plan should know
                </label>
                <textarea
                  id="lg-note"
                  value={note}
                  onChange={(e) => setNote(e.target.value.slice(0, 600))}
                  rows={3}
                  placeholder="Optional. For example: they mixed up R1+R2 and R2 last week, or two learners are on light duties."
                  className={textareaCn}
                />
              </Section>
            </div>

            {/* ── Right: what will be generated ── */}
            <aside className="lg:sticky lg:top-0">
              <div className={COLLEGE_CARD}>
                <h3 className="text-[15px] font-semibold tracking-tight text-white">
                  What you'll get
                </h3>
                <dl className="mt-4 space-y-3.5">
                  <SummaryRow label="Criteria">
                    {selected.size === 0 ? (
                      <span className="text-orange-300">None picked yet</span>
                    ) : (
                      <>
                        <span className="font-semibold tabular-nums">{selected.size}</span>
                        {' · '}
                        <span className="font-mono text-[12.5px] tabular-nums">
                          {selectedAcs.map((a) => a.ac_code).join(', ')}
                        </span>
                      </>
                    )}
                  </SummaryRow>
                  <SummaryRow label="Session">
                    {lengthValid ? (
                      <span className="tabular-nums">{length} min</span>
                    ) : (
                      'Set a length'
                    )}{' '}
                    · {modeLabel}
                  </SummaryRow>
                  <SummaryRow label="For">
                    {selectedCohort ? selectedCohort.name : 'Any group'}
                    {groupSize ? (
                      <span className="tabular-nums"> · {groupSize} learners</span>
                    ) : null}
                  </SummaryRow>
                  {kit.length > 0 && <SummaryRow label="Room">{kit.join(', ')}</SummaryRow>}
                  <SummaryRow label="Includes">
                    {includes.length > 0 ? sentence(includes) : 'The core plan only'}
                  </SummaryRow>
                  {note.trim() && <SummaryRow label="Your note">{note.trim()}</SummaryRow>}
                </dl>
                <div className="mt-5 border-t border-white/[0.08] pt-4">
                  <p className="text-[13px] leading-relaxed text-white">
                    Objectives, a timed activity plan with printable resources, a tutor's briefing,
                    questions and an exit ticket. Grounded in BS 7671, Guidance Note 3 and the
                    On-Site Guide, and saved as a draft you can edit.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={handleGenerate}
                  disabled={!canGenerate}
                  className={cn(buttonPrimaryCn, 'mt-5 hidden w-full lg:block')}
                >
                  {selected.size === 0 ? 'Pick a criterion' : 'Build lesson plan'}
                </button>
              </div>
            </aside>
          </>
        ) : (
          <LessonGenerationProgress
            state={gen.state}
            acCount={lastInput?.ac_codes.length ?? selected.size}
            unitCode={unitCode}
            durationMins={lastInput?.session_length_mins ?? length}
            onCancel={gen.cancel}
            onRetry={() => lastInput && run(lastInput)}
            onBack={() => {
              gen.reset();
              setStep('shape');
            }}
            onOpenPlan={() => planId && goTo(`/college/lessons/${planId}`, { justCreated: true })}
            onBuildSlides={() => planId && goTo(`/college/lessons/${planId}/slides`)}
            onSchedule={() => setScheduleOpen(true)}
            scheduled={scheduled}
          />
        )}
      </FormSheet>

      {planId && (
        <ScheduleLessonDialog
          open={scheduleOpen}
          onOpenChange={setScheduleOpen}
          lessonId={planId}
          planTitle={gen.state.result?.plan?.title ?? 'Lesson plan'}
          defaultDurationMins={gen.state.result?.plan?.duration_mins ?? length}
          initialCohortId={selectedCohortId}
          onScheduled={() => {
            setScheduled(true);
            void queryClient.invalidateQueries({ queryKey: ['college-lesson-plans'] });
          }}
        />
      )}
    </>
  );
}

/* ─── Bits ────────────────────────────────────────────────────── */

function sentence(items: string[]): string {
  const s =
    items.length <= 1
      ? items.join('')
      : `${items.slice(0, -1).join(', ')} and ${items[items.length - 1]}`;
  return s.charAt(0).toUpperCase() + s.slice(1) + '.';
}

/** A plain section: white heading over a hairline. */
function Section({
  title,
  aside,
  children,
}: {
  title: string;
  aside?: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <section className="space-y-4 border-t border-white/[0.1] pt-4 first:border-t-0 first:pt-0">
      <div className="flex min-h-[28px] items-center justify-between gap-3">
        <h3 className="text-[15px] font-semibold tracking-tight text-white">{title}</h3>
        {aside && <div className="-my-2">{aside}</div>}
      </div>
      {children}
    </section>
  );
}

function SummaryRow({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="grid grid-cols-[76px_minmax(0,1fr)] gap-3">
      <dt className="text-[12.5px] font-medium text-white">{label}</dt>
      <dd className="min-w-0 break-words text-[13.5px] leading-snug text-white">{children}</dd>
    </div>
  );
}

function Stepper({
  value,
  onChange,
}: {
  value: number | null;
  onChange: (v: number | null) => void;
}) {
  const v = value ?? 0;
  const btn =
    'flex h-11 w-11 items-center justify-center rounded-xl border border-white/[0.14] text-[18px] font-semibold text-white touch-manipulation hover:border-elec-yellow disabled:border-white/[0.06]';
  return (
    <div className="flex shrink-0 items-center gap-2">
      <button
        type="button"
        aria-label="Fewer learners"
        disabled={v <= 1}
        onClick={() => onChange(Math.max(1, v - 1))}
        className={btn}
      >
        −
      </button>
      <span
        className="w-10 text-center text-[17px] font-semibold tabular-nums text-white"
        aria-live="polite"
      >
        {value ?? '–'}
      </span>
      <button
        type="button"
        aria-label="More learners"
        disabled={v >= 40}
        onClick={() => onChange(Math.min(40, (value ?? 11) + 1))}
        className={btn}
      >
        +
      </button>
    </div>
  );
}

function ToggleRow({ flag, on, onToggle }: { flag: Flag; on: boolean; onToggle: () => void }) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={on}
      onClick={onToggle}
      className="flex min-h-[60px] w-full items-center gap-4 bg-white/[0.03] px-4 py-3 text-left transition-colors touch-manipulation hover:bg-white/[0.06] sm:px-5"
    >
      <span className="min-w-0 flex-1">
        <span className="block text-[14px] font-semibold leading-tight text-white">
          {flag.label}
        </span>
        <span className="mt-0.5 block text-[12.5px] leading-snug text-white">{flag.hint}</span>
      </span>
      <span
        aria-hidden
        className={cn(
          'relative h-7 w-12 shrink-0 rounded-full border transition-colors',
          on ? 'border-elec-yellow bg-elec-yellow' : 'border-white/[0.2] bg-white/[0.08]'
        )}
      >
        <span
          className={cn(
            'absolute top-[3px] h-5 w-5 rounded-full transition-all',
            on ? 'left-[23px] bg-black' : 'left-[3px] bg-white'
          )}
        />
      </span>
    </button>
  );
}

function LoGroup({
  loNum,
  loText,
  acs,
  selected,
  onToggleAc,
  onToggleAll,
}: {
  loNum: number;
  loText: string;
  acs: AcRow[];
  selected: Set<string>;
  onToggleAc: (code: string) => void;
  onToggleAll: () => void;
}) {
  const count = acs.filter((a) => selected.has(a.ac_code)).length;
  const total = acs.length;
  const allSelected = count === total;

  return (
    <div className="-mx-4 overflow-hidden card-surface border-y border-white/[0.08] sm:mx-0 sm:rounded-2xl sm:border">
      <div className="flex items-start justify-between gap-3 border-b border-white/[0.06] px-4 py-3 sm:px-5">
        <div className="min-w-0 flex-1">
          <span className="block text-[12px] font-semibold tabular-nums text-white">
            Learning outcome {loNum}
          </span>
          <span className="mt-0.5 block text-[13.5px] leading-snug text-white">{loText}</span>
        </div>
        <button
          type="button"
          onClick={onToggleAll}
          className="-my-1 inline-flex h-11 shrink-0 items-center gap-2 px-1 text-[13px] text-white touch-manipulation hover:text-elec-yellow"
        >
          <span className="tabular-nums">
            <span className={count > 0 ? 'font-semibold text-elec-yellow' : ''}>{count}</span> of{' '}
            {total}
          </span>
          <span className="font-semibold">{allSelected ? 'Clear' : 'All'}</span>
        </button>
      </div>
      <ul className="divide-y divide-white/[0.06]">
        {acs.map((ac) => {
          const checked = selected.has(ac.ac_code);
          return (
            <li key={ac.ac_code}>
              <button
                type="button"
                onClick={() => onToggleAc(ac.ac_code)}
                aria-pressed={checked}
                className="flex min-h-[52px] w-full items-start gap-3.5 px-4 py-3 text-left transition-colors touch-manipulation hover:bg-white/[0.03] sm:px-5"
              >
                {/* A drawn box, not a Radix Checkbox: that renders a <button>,
                    and a button inside this row's button is invalid DOM. */}
                <span
                  aria-hidden
                  className={cn(
                    'mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-md border-2 text-[12px] font-bold leading-none',
                    checked ? 'border-elec-yellow bg-elec-yellow text-black' : 'border-white/40'
                  )}
                >
                  {checked ? '✓' : ''}
                </span>
                <span
                  className={cn(
                    'mt-[2px] w-10 shrink-0 font-mono text-[12.5px] tabular-nums',
                    checked ? 'font-semibold text-elec-yellow' : 'text-white'
                  )}
                >
                  {ac.ac_code}
                </span>
                <span className="min-w-0 flex-1 text-[13.5px] leading-relaxed text-white">
                  {ac.ac_text}
                </span>
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
