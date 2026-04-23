import { useMemo, useState } from 'react';
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
import type { AcRow, GenerateLessonInput } from '@/hooks/useCurriculum';

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
    if (cohortId) params.set('cohort', cohortId);
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
          <DialogDescription className="text-[12.5px] sm:text-[13px] text-white/70 leading-relaxed">
            <span className="font-mono tabular-nums text-white/85">
              {qualificationCode}
            </span>
            <span className="mx-2 text-white/25">·</span>
            <span>
              Unit <span className="font-mono tabular-nums">{unitCode}</span>
            </span>
            {unitTitle && (
              <>
                <span className="mx-2 text-white/25">·</span>
                <span>{unitTitle}</span>
              </>
            )}
          </DialogDescription>
        </DialogHeader>

        {/* ─── Body ──────────────────────────────────────────────── */}
        <div className="flex-1 overflow-y-auto">
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
              <div className="flex items-center gap-3 text-[12px] text-white/70 shrink-0">
                <span className="tabular-nums">
                  <span className="text-white font-medium">{selected.size}</span>
                  <span className="text-white/40"> / {totalAcs}</span>
                </span>
                {selected.size > 0 && (
                  <button
                    type="button"
                    onClick={() => setSelected(new Set())}
                    className="text-white/65 hover:text-white transition-colors"
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
                className="h-11 w-full bg-[hsl(0_0%_13%)] border border-white/[0.08] rounded-xl px-4 text-[13.5px] text-white placeholder:text-white/40 focus:outline-none focus:border-elec-yellow/60 transition-colors"
              />
            </div>

            <div className="mt-3 space-y-2">
              {filteredGrouped.length === 0 ? (
                <div className="bg-[hsl(0_0%_13%)] border border-white/[0.06] rounded-xl px-5 py-8 text-center text-[12.5px] text-white/55">
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
                  <label className="text-[12px] font-medium text-white/85">
                    Length
                  </label>
                  <div className="text-[14px] text-white font-semibold tabular-nums">
                    {length}{' '}
                    <span className="text-[11px] text-white/55 font-normal">min</span>
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
                <div className="mt-2 flex justify-between text-[10px] font-mono tabular-nums text-white/40">
                  {LENGTH_TICKS.map((t) => (
                    <span key={t}>{t}</span>
                  ))}
                </div>
              </div>

              {/* Delivery mode tabs */}
              <div>
                <label className="text-[12px] font-medium text-white/85 mb-2 block">
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
                          : 'text-white/75 hover:text-white hover:bg-white/[0.04]'
                      )}
                    >
                      {opt.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Include toggle chips */}
              <div>
                <label className="text-[12px] font-medium text-white/85 mb-2 block">
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
            <div className="text-[12.5px] text-white/70 text-center sm:text-left">
              {selected.size === 0 ? (
                <span className="text-white/45">Pick at least one criterion to begin</span>
              ) : (
                <span>
                  <span className="text-white font-medium tabular-nums">
                    {selected.size}
                  </span>{' '}
                  criter{selected.size === 1 ? 'ion' : 'ia'}
                  <span className="mx-2 text-white/25">·</span>
                  <span className="text-white tabular-nums">{length}</span> min
                  <span className="mx-2 text-white/25">·</span>
                  <span>{modeLabel}</span>
                  {(diff || hs || hw) && (
                    <>
                      <span className="mx-2 text-white/25">·</span>
                      <span className="text-white/65">
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
              <button
                type="button"
                onClick={() => onOpenChange(false)}
                className="h-11 w-full sm:w-auto px-5 rounded-full border border-white/[0.12] text-[13px] font-medium text-white hover:bg-white/[0.06] transition-colors touch-manipulation"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleGenerate}
                disabled={!canGenerate}
                className="h-11 w-full sm:w-auto px-6 rounded-full bg-elec-yellow hover:bg-elec-yellow/90 text-black text-[13px] font-medium transition-colors disabled:opacity-40 disabled:cursor-not-allowed touch-manipulation"
              >
                Build lesson plan →
              </button>
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
      <div className="text-[10px] font-medium uppercase tracking-[0.22em] text-white/55">
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
      <div className="text-[11.5px] text-white/65 flex items-center gap-2 tabular-nums">
        <span className="text-white/90 font-medium">{timeLabel}</span>
        <span className="text-white/25">·</span>
        <span className="capitalize">{preset.mode}</span>
      </div>
      <div className="flex-1" />
      <div className="text-[11px] text-white/55 leading-snug line-clamp-2">
        {preset.description}
      </div>
      {includes.length > 0 && (
        <div className="flex items-center gap-1 flex-wrap pt-1">
          {includes.map((i) => (
            <span
              key={i}
              className="text-[9.5px] font-medium uppercase tracking-[0.12em] text-white/60 bg-white/[0.04] border border-white/[0.06] rounded-full px-1.5 py-[1px]"
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
          <span className="text-[10px] font-mono tabular-nums text-white/45 mt-0.5 shrink-0 w-8">
            LO&nbsp;{loNum}
          </span>
          <div className="text-[12.5px] text-white/90 leading-snug flex-1">{loText}</div>
        </div>
        <button
          type="button"
          onClick={onToggleAll}
          className="shrink-0 flex items-center gap-2.5 text-[11px] text-white/65 hover:text-white transition-colors"
        >
          <span className="tabular-nums">
            <span className={count > 0 ? 'text-elec-yellow font-medium' : ''}>{count}</span>
            <span className="text-white/35"> / {total}</span>
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
          className="mt-0.5 shrink-0 border-white/30 data-[state=checked]:bg-elec-yellow data-[state=checked]:border-elec-yellow data-[state=checked]:text-black"
          // Pointer-events off so only the row receives the click
          tabIndex={-1}
        />
        <span
          className={cn(
            'font-mono tabular-nums text-[11.5px] shrink-0 mt-[3px] w-10',
            checked ? 'text-elec-yellow' : 'text-white/55'
          )}
        >
          {ac.ac_code}
        </span>
        <span
          className={cn(
            'text-[12.5px] leading-relaxed flex-1 min-w-0',
            checked ? 'text-white' : 'text-white/80'
          )}
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
            on ? 'text-elec-yellow' : 'text-white/80'
          )}
        >
          {label}
        </span>
      </div>
    </button>
  );
}
