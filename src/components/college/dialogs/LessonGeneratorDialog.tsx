import { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Slider } from '@/components/ui/slider';
import { Checkbox } from '@/components/ui/checkbox';
import { cn } from '@/lib/utils';
import { supabase } from '@/integrations/supabase/client';
import type { AcRow, GenerateLessonInput } from '@/hooks/useCurriculum';
import {
  PrimaryButton,
  SecondaryButton,
  checkboxClass,
  inputClass,
} from '@/components/college/primitives';

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

type Preset = {
  id: string;
  label: string;
  length: number;
  mode: Mode;
  hw: boolean;
  diff: boolean;
  hs: boolean;
  description: string;
};

const PRESETS: Preset[] = [
  {
    id: 'quick',
    label: 'Quick session',
    length: 45,
    mode: 'classroom',
    hw: false,
    diff: false,
    hs: true,
    description: 'Fast-paced recap or single-concept drill.',
  },
  {
    id: 'standard',
    label: 'Standard lesson',
    length: 90,
    mode: 'classroom',
    hw: true,
    diff: true,
    hs: true,
    description: 'The classic 90-minute lesson arc.',
  },
  {
    id: 'workshop',
    label: 'Full workshop',
    length: 180,
    mode: 'workshop',
    hw: true,
    diff: true,
    hs: true,
    description: 'Extended practical with H&S focus.',
  },
  {
    id: 'revision',
    label: 'Exam revision',
    length: 60,
    mode: 'classroom',
    hw: true,
    diff: true,
    hs: false,
    description: 'Recall → apply → evaluate, exam-style.',
  },
];

const MODE_OPTIONS: { value: Mode; label: string }[] = [
  { value: 'classroom', label: 'Classroom' },
  { value: 'workshop', label: 'Workshop' },
  { value: 'hybrid', label: 'Hybrid' },
  { value: 'online', label: 'Online' },
];

const LENGTH_TICKS = [30, 60, 90, 120, 180, 240];

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

  const [selected, setSelected] = useState<Set<string>>(
    () => new Set(initialAcs.map((a) => a.ac_code))
  );
  const [search, setSearch] = useState('');
  const [length, setLength] = useState(90);
  const [mode, setMode] = useState<Mode>('classroom');
  const [hw, setHw] = useState(true);
  const [diff, setDiff] = useState(true);
  const [hs, setHs] = useState(true);
  const [activePreset, setActivePreset] = useState<string>('standard');

  const [cohorts, setCohorts] = useState<CohortOption[]>([]);
  const [selectedCohortId, setSelectedCohortId] = useState<string | null>(
    cohortId ?? null
  );
  const [loadingCohorts, setLoadingCohorts] = useState(false);

  // Load cohorts for this college once the dialog opens, with learner
  // inclusion aggregates so the tutor sees who they're planning for.
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
      const { data: profile } = await supabase
        .from('profiles')
        .select('college_id')
        .eq('id', userRes.user.id)
        .maybeSingle();
      if (!profile?.college_id) {
        if (!cancelled) setLoadingCohorts(false);
        return;
      }
      const { data: rows } = await supabase
        .from('college_cohorts')
        .select('id, name, status')
        .eq('college_id', profile.college_id)
        .order('name');
      if (cancelled) return;
      const active = (rows ?? []).filter(
        (r) => r.status !== 'archived' && r.status !== 'Archived'
      );
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
        .neq('status', 'withdrawn')
        .neq('status', 'completed');
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
        const entry = byCohort.get(s.cohort_id) ?? {
          names: [],
          send: 0,
          eal: 0,
          ehcp: 0,
        };
        entry.names.push((s.name ?? '').split(/\s+/)[0] ?? '');
        if (Array.isArray(s.send_flags) && s.send_flags.length > 0) entry.send++;
        if (s.eal) entry.eal++;
        if (s.ehcp_ref) entry.ehcp++;
        byCohort.set(s.cohort_id, entry);
      }
      if (cancelled) return;
      setCohorts(
        active.map((r) => {
          const e = byCohort.get(r.id as string) ?? {
            names: [],
            send: 0,
            eal: 0,
            ehcp: 0,
          };
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

  // Group flat AC rows into LOs
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

  const totalAcs = useMemo(
    () => grouped.reduce((sum, [, g]) => sum + g.acs.length, 0),
    [grouped]
  );

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

  const applyPreset = (p: Preset) => {
    setActivePreset(p.id);
    setLength(p.length);
    setMode(p.mode);
    setHw(p.hw);
    setDiff(p.diff);
    setHs(p.hs);
  };

  const clearPresetIfManual = () => setActivePreset('');

  const canGenerate = selected.size > 0 && length >= 30;

  const handleGenerate = () => {
    const params = new URLSearchParams({
      q: qualificationCode,
      u: unitCode,
      ac: Array.from(selected).join(','),
      len: String(length),
      mode: mode,
      hw: hw ? '1' : '0',
      diff: diff ? '1' : '0',
      hs: hs ? '1' : '0',
    });
    if (selectedCohortId) params.set('cohort', selectedCohortId);
    onOpenChange(false);
    navigate(`/college/lessons/new?${params.toString()}`);
  };

  const modeLabel = MODE_OPTIONS.find((m) => m.value === mode)?.label ?? 'Classroom';

  return (
    <Dialog open={open} onOpenChange={(v) => !v && onOpenChange(false)}>
      <DialogContent
        className={cn(
          // Wider, taller dialog for editorial feel
          'w-[min(100vw-1rem,880px)] max-h-[92vh]',
          'bg-[hsl(0_0%_10%)] border-white/[0.08]',
          'p-0 gap-0 flex flex-col overflow-hidden',
          'sm:w-[min(100vw-2rem,880px)]'
        )}
      >
        {/* ─── Header ────────────────────────────────────────────── */}
        <DialogHeader className="shrink-0 border-b border-white/[0.06] px-6 py-5 sm:px-8 sm:py-6 space-y-2 text-left">
          <div className="text-[10px] font-medium uppercase tracking-[0.22em] text-elec-yellow/85">
            AI lesson generator
          </div>
          <DialogTitle className="text-xl sm:text-2xl font-semibold text-white tracking-tight leading-tight">
            Build a lesson plan
          </DialogTitle>
          <DialogDescription className="text-[12.5px] sm:text-[13px] text-white leading-relaxed">
            <span className="font-mono tabular-nums text-white">
              {qualificationCode}
            </span>
            <span className="mx-2 text-white/30">·</span>
            <span>
              Unit <span className="font-mono tabular-nums">{unitCode}</span>
            </span>
            {unitTitle && (
              <>
                <span className="mx-2 text-white/30">·</span>
                <span>{unitTitle}</span>
              </>
            )}
          </DialogDescription>
        </DialogHeader>

        {/* ─── Body ──────────────────────────────────────────────── */}
        <div className="flex-1 overflow-y-auto">
          {/* ── Section 0: Cohort ── */}
          <section className="px-6 sm:px-8 pt-6 sm:pt-7">
            <SectionHeader eyebrow="Planning for" title="Who's in the room" />
            <div className="mt-4">
              {loadingCohorts && cohorts.length === 0 ? (
                <div className="h-11 rounded-xl bg-[hsl(0_0%_13%)] border border-white/[0.08] flex items-center px-4 text-[12.5px] text-white/55">
                  Loading cohorts…
                </div>
              ) : cohorts.length === 0 ? (
                <div className="rounded-xl bg-[hsl(0_0%_13%)] border border-white/[0.08] px-4 py-3 text-[12.5px] text-white/60">
                  No active cohorts. You can still generate a generic plan.
                </div>
              ) : (
                <div className="space-y-2">
                  <div className="flex flex-wrap gap-1.5">
                    <button
                      type="button"
                      onClick={() => setSelectedCohortId(null)}
                      className={cn(
                        'h-9 px-3.5 rounded-full text-[12.5px] font-medium border transition-colors touch-manipulation',
                        selectedCohortId === null
                          ? 'bg-white/[0.06] border-white/[0.2] text-white'
                          : 'bg-[hsl(0_0%_13%)] border-white/[0.08] text-white/70 hover:text-white'
                      )}
                    >
                      No cohort
                    </button>
                    {cohorts.map((c) => (
                      <button
                        key={c.id}
                        type="button"
                        onClick={() => setSelectedCohortId(c.id)}
                        className={cn(
                          'h-9 px-3.5 rounded-full text-[12.5px] font-medium border transition-colors touch-manipulation',
                          selectedCohortId === c.id
                            ? 'bg-elec-yellow/[0.1] border-elec-yellow/40 text-elec-yellow'
                            : 'bg-[hsl(0_0%_13%)] border-white/[0.08] text-white/80 hover:text-white hover:border-white/[0.18]'
                        )}
                      >
                        {c.name}
                        {c.learner_count > 0 && (
                          <span className="ml-2 text-white/45 tabular-nums">
                            {c.learner_count}
                          </span>
                        )}
                      </button>
                    ))}
                  </div>

                  {selectedCohort && (
                    <div className="mt-3 rounded-xl border border-elec-yellow/25 bg-elec-yellow/[0.04] px-4 py-3.5">
                      <div className="text-[10px] font-medium uppercase tracking-[0.22em] text-elec-yellow/90 mb-1.5">
                        Planning for
                      </div>
                      <div className="text-[13.5px] text-white leading-snug">
                        <span className="font-semibold">
                          {selectedCohort.learner_count}
                        </span>{' '}
                        learner{selectedCohort.learner_count === 1 ? '' : 's'}
                        {selectedCohort.first_names.length > 0 && (
                          <span className="text-white/70">
                            {' — '}
                            {selectedCohort.first_names.slice(0, 4).join(', ')}
                            {selectedCohort.first_names.length > 4 &&
                              ` + ${selectedCohort.first_names.length - 4} more`}
                          </span>
                        )}
                      </div>
                      <div className="mt-1.5 text-[11.5px] text-white/70 tabular-nums flex flex-wrap gap-x-3 gap-y-1">
                        {selectedCohort.send_count > 0 && (
                          <span>{selectedCohort.send_count} SEND</span>
                        )}
                        {selectedCohort.eal_count > 0 && (
                          <span>{selectedCohort.eal_count} EAL</span>
                        )}
                        {selectedCohort.ehcp_count > 0 && (
                          <span>{selectedCohort.ehcp_count} EHCP</span>
                        )}
                        {selectedCohort.send_count === 0 &&
                          selectedCohort.eal_count === 0 &&
                          selectedCohort.ehcp_count === 0 && (
                            <span className="text-white/50">
                              No inclusion flags recorded — the AI will use
                              generic differentiation.
                            </span>
                          )}
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          </section>

          {/* ── Section 1: Starting point ── */}
          <section className="px-6 sm:px-8 pt-6 sm:pt-7">
            <SectionHeader eyebrow="Starting point" title="Choose a shape" />

            <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2.5">
              {PRESETS.map((p) => (
                <PresetCard
                  key={p.id}
                  preset={p}
                  active={activePreset === p.id}
                  onClick={() => applyPreset(p)}
                />
              ))}
            </div>
          </section>

          {/* ── Section 2: Criteria ── */}
          <section className="px-6 sm:px-8 pt-8 sm:pt-10">
            <div className="flex items-end justify-between gap-4 mb-4">
              <SectionHeader
                eyebrow="Coverage"
                title="Assessment criteria"
              />
              <div className="flex items-center gap-3 text-[12px] text-white shrink-0">
                <span className="tabular-nums">
                  <span className="text-white font-medium">{selected.size}</span>
                  <span className="text-white/30"> / {totalAcs}</span>
                </span>
                {selected.size > 0 && (
                  <button
                    type="button"
                    onClick={() => setSelected(new Set())}
                    className="text-white hover:text-elec-yellow transition-colors"
                  >
                    Clear
                  </button>
                )}
              </div>
            </div>

            <div className="relative">
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search by code or keyword…"
                className={inputClass}
              />
            </div>

            <div className="mt-3 space-y-2">
              {filteredGrouped.length === 0 ? (
                <div className="bg-[hsl(0_0%_13%)] border border-white/[0.06] rounded-xl px-5 py-8 text-center text-[12.5px] text-white">
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
          </section>

          {/* ── Section 3: Session shape ── */}
          <section className="px-6 sm:px-8 pt-8 sm:pt-10 pb-8">
            <SectionHeader eyebrow="Parameters" title="Session shape" />

            <div className="mt-5 space-y-6">
              {/* Length slider */}
              <div>
                <div className="flex items-baseline justify-between mb-3">
                  <label className="text-[12px] font-medium text-white">
                    Length
                  </label>
                  <div className="text-[14px] text-white font-semibold tabular-nums">
                    {length}{' '}
                    <span className="text-[11px] text-white font-normal">min</span>
                  </div>
                </div>
                <Slider
                  value={[length]}
                  min={30}
                  max={240}
                  step={15}
                  onValueChange={([v]) => {
                    setLength(v);
                    clearPresetIfManual();
                  }}
                  className="w-full"
                />
                <div className="mt-2 flex justify-between text-[10px] font-mono tabular-nums text-white/30">
                  {LENGTH_TICKS.map((t) => (
                    <span key={t}>{t}</span>
                  ))}
                </div>
              </div>

              {/* Delivery mode tabs */}
              <div>
                <label className="text-[12px] font-medium text-white mb-2 block">
                  Delivery mode
                </label>
                <div className="grid grid-cols-4 gap-1.5 p-1 bg-[hsl(0_0%_13%)] border border-white/[0.06] rounded-full">
                  {MODE_OPTIONS.map((opt) => (
                    <button
                      key={opt.value}
                      type="button"
                      onClick={() => {
                        setMode(opt.value);
                        clearPresetIfManual();
                      }}
                      className={cn(
                        'h-9 rounded-full text-[12.5px] font-medium transition-colors touch-manipulation',
                        mode === opt.value
                          ? 'bg-elec-yellow text-black'
                          : 'text-white hover:bg-white/[0.04]'
                      )}
                    >
                      {opt.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Include toggle chips */}
              <div>
                <label className="text-[12px] font-medium text-white mb-2 block">
                  Include
                </label>
                <div className="flex flex-wrap gap-2">
                  <ToggleChip
                    label="Differentiation"
                    hint="Stretch / support / SEND / EAL"
                    on={diff}
                    onToggle={() => {
                      setDiff(!diff);
                      clearPresetIfManual();
                    }}
                  />
                  <ToggleChip
                    label="Health & safety"
                    hint="Risks, controls, reg refs"
                    on={hs}
                    onToggle={() => {
                      setHs(!hs);
                      clearPresetIfManual();
                    }}
                  />
                  <ToggleChip
                    label="Homework"
                    hint="Independent study task"
                    on={hw}
                    onToggle={() => {
                      setHw(!hw);
                      clearPresetIfManual();
                    }}
                  />
                </div>
              </div>
            </div>
          </section>
        </div>

        {/* ─── Sticky footer ─────────────────────────────────────── */}
        <div className="shrink-0 border-t border-white/[0.06] bg-[hsl(0_0%_10%)] px-6 py-4 sm:px-8 sm:py-5">
          <div className="flex flex-col-reverse sm:flex-row sm:items-center sm:justify-between gap-3">
            {/* Live summary */}
            <div className="text-[12.5px] text-white text-center sm:text-left">
              {selected.size === 0 ? (
                <span className="text-white">Pick at least one criterion to begin</span>
              ) : (
                <span>
                  <span className="text-white font-medium tabular-nums">
                    {selected.size}
                  </span>{' '}
                  criter{selected.size === 1 ? 'ion' : 'ia'}
                  <span className="mx-2 text-white/30">·</span>
                  <span className="text-white tabular-nums">{length}</span> min
                  <span className="mx-2 text-white/30">·</span>
                  <span>{modeLabel}</span>
                  {(diff || hs || hw) && (
                    <>
                      <span className="mx-2 text-white/30">·</span>
                      <span className="text-white">
                        {[diff && 'Diff', hs && 'H&S', hw && 'HW']
                          .filter(Boolean)
                          .join(' · ')}
                      </span>
                    </>
                  )}
                </span>
              )}
            </div>

            {/* Actions */}
            <div className="flex items-center gap-2 flex-col-reverse sm:flex-row">
              <SecondaryButton
                onClick={() => onOpenChange(false)}
                fullWidth
                className="sm:w-auto"
              >
                Cancel
              </SecondaryButton>
              <PrimaryButton
                onClick={handleGenerate}
                disabled={!canGenerate}
                fullWidth
                className="sm:w-auto"
              >
                Build lesson plan →
              </PrimaryButton>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

/* ─── Bits ────────────────────────────────────────────────────── */

function SectionHeader({ eyebrow, title }: { eyebrow: string; title: string }) {
  return (
    <div>
      <div className="text-[10px] font-medium uppercase tracking-[0.22em] text-white">
        {eyebrow}
      </div>
      <h3 className="mt-1 text-[15px] sm:text-[16px] font-semibold text-white tracking-tight">
        {title}
      </h3>
    </div>
  );
}

function PresetCard({
  preset,
  active,
  onClick,
}: {
  preset: Preset;
  active: boolean;
  onClick: () => void;
}) {
  const hours = preset.length >= 60 ? `${Math.floor(preset.length / 60)}h` : '';
  const mins = preset.length % 60;
  const timeLabel = hours
    ? mins > 0
      ? `${hours} ${mins}m`
      : hours
    : `${preset.length}m`;

  const includes: string[] = [];
  if (preset.diff) includes.push('Diff');
  if (preset.hs) includes.push('H&S');
  if (preset.hw) includes.push('HW');

  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        'relative text-left rounded-xl border px-4 py-4 sm:px-5 sm:py-5 transition-all touch-manipulation flex flex-col gap-2 min-h-[128px]',
        active
          ? 'border-elec-yellow bg-elec-yellow/[0.06]'
          : 'border-white/[0.08] bg-[hsl(0_0%_13%)] hover:bg-[hsl(0_0%_15%)] hover:border-white/[0.14]'
      )}
    >
      {active && (
        <span
          className="absolute top-3 right-3 inline-block h-1.5 w-1.5 rounded-full bg-elec-yellow"
          aria-hidden
        />
      )}
      <div className={cn('text-[14px] font-semibold', active ? 'text-elec-yellow' : 'text-white')}>
        {preset.label}
      </div>
      <div className="text-[11.5px] text-white flex items-center gap-2 tabular-nums">
        <span className="text-white font-medium">{timeLabel}</span>
        <span className="text-white/30">·</span>
        <span className="capitalize">{preset.mode}</span>
      </div>
      <div className="flex-1" />
      <div className="text-[11px] text-white leading-snug line-clamp-2">
        {preset.description}
      </div>
      {includes.length > 0 && (
        <div className="flex items-center gap-1 flex-wrap pt-1">
          {includes.map((i) => (
            <span
              key={i}
              className="text-[9.5px] font-medium uppercase tracking-[0.12em] text-white bg-white/[0.04] border border-white/[0.06] rounded-full px-1.5 py-[1px]"
            >
              {i}
            </span>
          ))}
        </div>
      )}
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
    <div className="bg-[hsl(0_0%_13%)] border border-white/[0.06] rounded-xl overflow-hidden">
      {/* LO header */}
      <div className="px-4 sm:px-5 py-3 sm:py-3.5 flex items-start justify-between gap-3 border-b border-white/[0.05]">
        <div className="flex items-start gap-3 min-w-0 flex-1">
          <span className="text-[10px] font-mono tabular-nums text-white/30 mt-0.5 shrink-0 w-8">
            LO&nbsp;{loNum}
          </span>
          <div className="text-[12.5px] text-white leading-snug flex-1">{loText}</div>
        </div>
        <button
          type="button"
          onClick={onToggleAll}
          className="shrink-0 flex items-center gap-2.5 text-[11px] text-white hover:text-elec-yellow transition-colors"
        >
          <span className="tabular-nums">
            <span className={count > 0 ? 'text-elec-yellow font-medium' : ''}>{count}</span>
            <span className="text-white/30"> / {total}</span>
          </span>
          <span className="font-medium">{allSelected ? 'Clear' : 'All'}</span>
        </button>
      </div>

      {/* AC rows */}
      <ul className="divide-y divide-white/[0.04]">
        {acs.map((ac) => (
          <AcRowItem
            key={ac.ac_code}
            ac={ac}
            checked={selected.has(ac.ac_code)}
            onToggle={() => onToggleAc(ac.ac_code)}
          />
        ))}
      </ul>
    </div>
  );
}

function AcRowItem({
  ac,
  checked,
  onToggle,
}: {
  ac: AcRow;
  checked: boolean;
  onToggle: () => void;
}) {
  return (
    <li>
      <button
        type="button"
        onClick={onToggle}
        className={cn(
          'w-full text-left px-4 sm:px-5 py-3 flex items-start gap-3.5 touch-manipulation transition-colors',
          checked ? 'bg-elec-yellow/[0.04]' : 'hover:bg-white/[0.02]'
        )}
      >
        <Checkbox
          checked={checked}
          className={cn(checkboxClass, 'mt-0.5')}
          // Pointer-events off so only the row receives the click
          tabIndex={-1}
        />
        <span
          className={cn(
            'font-mono tabular-nums text-[11.5px] shrink-0 mt-[3px] w-10',
            checked ? 'text-elec-yellow' : 'text-white'
          )}
        >
          {ac.ac_code}
        </span>
        <span
          className="text-[12.5px] leading-relaxed flex-1 min-w-0 text-white"
        >
          {ac.ac_text}
        </span>
      </button>
    </li>
  );
}

function ToggleChip({
  label,
  hint,
  on,
  onToggle,
}: {
  label: string;
  hint: string;
  on: boolean;
  onToggle: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onToggle}
      title={hint}
      className={cn(
        'group rounded-full border px-4 py-2 text-left transition-colors touch-manipulation',
        on
          ? 'bg-elec-yellow/[0.08] border-elec-yellow/40'
          : 'bg-[hsl(0_0%_13%)] border-white/[0.08] hover:border-white/[0.18]'
      )}
    >
      <div className="flex items-center gap-2.5">
        <span
          className={cn(
            'inline-block h-1.5 w-1.5 rounded-full transition-colors',
            on ? 'bg-elec-yellow' : 'bg-white/30'
          )}
          aria-hidden
        />
        <span
          className={cn(
            'text-[12.5px] font-medium transition-colors',
            on ? 'text-elec-yellow' : 'text-white'
          )}
        >
          {label}
        </span>
      </div>
    </button>
  );
}
