import { useState } from 'react';
import { toast } from 'sonner';
import { cn } from '@/lib/utils';

import { Sheet, SheetContent } from '@/components/ui/sheet';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

import {
  PageHero,
  StatStrip,
  FilterBar,
  EmptyState,
  Eyebrow,
  TextAction,
  Field,
  FormCard,
  SheetShell,
  ListCard,
  ListRow,
  PrimaryButton,
  SecondaryButton,
  selectTriggerClass,
  selectContentClass,
  inputClass,
  type Tone,
} from '@/components/college/primitives';

import { SafetyModuleShell } from './common/SafetyModuleShell';
import { HazardSelect } from './common/HazardSelect';
import { RiskSelect } from './common/RiskSelect';
import { ReadinessGate } from './common/ReadinessGate';
import { hazardCategories } from '@/data/hazards';

// ─── Types ───

type RiskBand = 'Low' | 'Medium' | 'High' | 'Very High';

interface RiskFactor {
  id: string;
  category: string;
  description: string;
  likelihood: number;
  severity: number;
  riskLevel: RiskBand;
  controlMeasures: string[];
}

// ─── Risk scoring (preserved 5×5 methodology) ───

const calculateRiskLevel = (likelihood: number, severity: number): RiskBand => {
  const score = likelihood * severity;
  if (score <= 4) return 'Low';
  if (score <= 9) return 'Medium';
  if (score <= 16) return 'High';
  return 'Very High';
};

// One colour dimension = risk severity band.
const bandTone: Record<RiskBand, Tone> = {
  Low: 'green',
  Medium: 'amber',
  High: 'orange',
  'Very High': 'red',
};

const BAND_PILL: Record<RiskBand, string> = {
  Low: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/25',
  Medium: 'bg-amber-500/10 text-amber-400 border-amber-500/25',
  High: 'bg-orange-500/10 text-orange-400 border-orange-500/25',
  'Very High': 'bg-red-500/10 text-red-400 border-red-500/25',
};

function BandPill({ band }: { band: RiskBand }) {
  return (
    <span
      className={cn(
        'inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-medium uppercase tracking-[0.12em] border whitespace-nowrap',
        BAND_PILL[band]
      )}
    >
      {band}
    </span>
  );
}

// Suggested defaults per category (preserved realistic ratings).
const DEFAULT_LIKELIHOOD: Record<string, number> = {
  'Electrical Hazards': 3,
  'Working at Height': 3,
  'Asbestos & Hazardous Materials': 2,
  'Manual Handling': 4,
  'Fire & Explosion': 2,
  Environmental: 3,
  'Tools & Equipment': 3,
};
const DEFAULT_SEVERITY: Record<string, number> = {
  'Electrical Hazards': 4,
  'Working at Height': 5,
  'Asbestos & Hazardous Materials': 5,
  'Manual Handling': 3,
  'Fire & Explosion': 5,
  Environmental: 3,
  'Tools & Equipment': 3,
};

const hazardTemplates = hazardCategories.map((cat) => ({
  category: cat.name,
  defaultLikelihood: DEFAULT_LIKELIHOOD[cat.name] ?? 3,
  defaultSeverity: DEFAULT_SEVERITY[cat.name] ?? 3,
}));

const riskCategories = hazardCategories.map((cat) => cat.name);

const LIKELIHOOD_OPTIONS = [
  { v: 1, label: '1 — Very Unlikely' },
  { v: 2, label: '2 — Unlikely' },
  { v: 3, label: '3 — Possible' },
  { v: 4, label: '4 — Likely' },
  { v: 5, label: '5 — Very Likely' },
];
const SEVERITY_OPTIONS = [
  { v: 1, label: '1 — Negligible' },
  { v: 2, label: '2 — Minor' },
  { v: 3, label: '3 — Moderate' },
  { v: 4, label: '4 — Major' },
  { v: 5, label: '5 — Catastrophic' },
];

const FILTER_TABS: { value: RiskBand | 'all'; label: string }[] = [
  { value: 'all', label: 'All' },
  { value: 'Very High', label: 'Very High' },
  { value: 'High', label: 'High' },
  { value: 'Medium', label: 'Medium' },
  { value: 'Low', label: 'Low' },
];

// Severity ordering for sort (most severe first).
const bandRank: Record<RiskBand, number> = { 'Very High': 0, High: 1, Medium: 2, Low: 3 };

// ─── Component ───

const RiskAssessmentBuilder = ({ onBack }: { onBack?: () => void } = {}) => {
  const [riskFactors, setRiskFactors] = useState<RiskFactor[]>([]);
  const [showAddSheet, setShowAddSheet] = useState(false);
  const [filterBand, setFilterBand] = useState<RiskBand | 'all'>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const [currentRisk, setCurrentRisk] = useState<{
    category: string;
    description: string;
    likelihood: number;
    severity: number;
    controlMeasures: string[];
  }>({
    category: '',
    description: '',
    likelihood: 1,
    severity: 1,
    controlMeasures: [],
  });

  const resetDraft = () =>
    setCurrentRisk({ category: '', description: '', likelihood: 1, severity: 1, controlMeasures: [] });

  const closeSheet = () => {
    setShowAddSheet(false);
    resetDraft();
  };

  // ─── Readiness (every hazard has a control before save/export) ───
  const draftBand = calculateRiskLevel(currentRisk.likelihood, currentRisk.severity);
  const draftReadiness = [
    { ok: !!currentRisk.category, label: 'Hazard category selected' },
    { ok: !!currentRisk.description.trim(), label: 'Specific hazard identified' },
    { ok: currentRisk.controlMeasures.length > 0, label: 'At least one control measure recorded' },
  ];
  const draftReady = draftReadiness.every((r) => r.ok);

  const addRiskFactor = () => {
    if (!draftReady) return;
    const newRisk: RiskFactor = {
      id: Date.now().toString(),
      category: currentRisk.category,
      description: currentRisk.description.trim(),
      likelihood: currentRisk.likelihood,
      severity: currentRisk.severity,
      riskLevel: draftBand,
      controlMeasures: currentRisk.controlMeasures,
    };
    setRiskFactors((prev) => [...prev, newRisk]);
    closeSheet();
    toast.success('Risk factor added');
  };

  const removeRiskFactor = (id: string) => {
    setRiskFactors((prev) => prev.filter((r) => r.id !== id));
  };

  // ─── Stats ───
  const stats = {
    total: riskFactors.length,
    high: riskFactors.filter((r) => r.riskLevel === 'High' || r.riskLevel === 'Very High').length,
    medium: riskFactors.filter((r) => r.riskLevel === 'Medium').length,
    low: riskFactors.filter((r) => r.riskLevel === 'Low').length,
  };

  const bandCounts: Record<RiskBand, number> = {
    'Very High': riskFactors.filter((r) => r.riskLevel === 'Very High').length,
    High: riskFactors.filter((r) => r.riskLevel === 'High').length,
    Medium: riskFactors.filter((r) => r.riskLevel === 'Medium').length,
    Low: riskFactors.filter((r) => r.riskLevel === 'Low').length,
  };

  // ─── Derived list ───
  const filtered = riskFactors.filter((r) => {
    if (filterBand !== 'all' && r.riskLevel !== filterBand) return false;
    if (
      searchQuery &&
      !r.description.toLowerCase().includes(searchQuery.toLowerCase()) &&
      !r.category.toLowerCase().includes(searchQuery.toLowerCase())
    )
      return false;
    return true;
  });

  // Most severe to the top, then by score.
  const sorted = [...filtered].sort((a, b) => {
    if (bandRank[a.riskLevel] !== bandRank[b.riskLevel]) return bandRank[a.riskLevel] - bandRank[b.riskLevel];
    return b.likelihood * b.severity - a.likelihood * a.severity;
  });

  // Whole-assessment readiness — every recorded hazard has at least one control.
  const assessmentReadiness = [
    { ok: riskFactors.length > 0, label: 'At least one hazard identified' },
    {
      ok: riskFactors.length > 0 && riskFactors.every((r) => r.controlMeasures.length > 0),
      label: 'Every hazard has a control measure',
    },
  ];
  const assessmentReady = assessmentReadiness.every((r) => r.ok);

  const handleSave = () => {
    if (!assessmentReady) {
      toast.error('Resolve the readiness checklist before saving');
      return;
    }
    toast.success('Risk assessment ready to save');
  };

  const handleExport = () => {
    if (!assessmentReady) {
      toast.error('Every hazard needs a control measure before export');
      return;
    }
    toast.success('Risk assessment ready to export');
  };

  return (
    <SafetyModuleShell
      onBack={onBack ?? (() => {})}
      moduleName="Risk Assessment"
      hero={
        <PageHero
          eyebrow="Risk Assessment"
          title="Build a 5×5 risk assessment"
          description="Identify hazards, score likelihood and severity, and record the controls that bring each risk down — CDM 2015 and BS 7671 aligned."
          tone="amber"
          actions={
            <PrimaryButton
              onClick={() => {
                resetDraft();
                setShowAddSheet(true);
              }}
            >
              Add risk factor
            </PrimaryButton>
          }
        />
      }
      stats={
        riskFactors.length > 0 ? (
          <StatStrip
            stats={[
              { value: stats.total, label: 'Total', accent: true, onClick: () => setFilterBand('all') },
              { value: stats.high, label: 'High risk', tone: 'red', onClick: () => setFilterBand('High') },
              { value: stats.medium, label: 'Medium', tone: 'amber', onClick: () => setFilterBand('Medium') },
              { value: stats.low, label: 'Low', tone: 'green', onClick: () => setFilterBand('Low') },
            ]}
          />
        ) : undefined
      }
      filter={
        riskFactors.length > 0 ? (
          <FilterBar
            tabs={FILTER_TABS.map((t) => ({
              value: t.value,
              label: t.label,
              count: t.value === 'all' ? riskFactors.length : bandCounts[t.value],
            }))}
            activeTab={filterBand}
            onTabChange={(v) => setFilterBand(v as RiskBand | 'all')}
            search={searchQuery}
            onSearchChange={setSearchQuery}
            searchPlaceholder="Search hazards…"
          />
        ) : undefined
      }
    >
      {riskFactors.length === 0 ? (
        <EmptyState
          title="No risk factors identified yet"
          description="Add your first hazard — pick a category for suggested likelihood and severity, then record the controls that mitigate it."
          action="Add risk factor"
          onAction={() => {
            resetDraft();
            setShowAddSheet(true);
          }}
        />
      ) : filtered.length === 0 ? (
        <EmptyState title="No hazards match your filter" description="Try a different risk band or clear your search." />
      ) : (
        <div className="space-y-6">
          <ListCard>
            {sorted.map((risk) => {
              const score = risk.likelihood * risk.severity;
              const missingControls = risk.controlMeasures.length === 0;
              return (
                <ListRow
                  key={risk.id}
                  accent={missingControls ? 'red' : bandTone[risk.riskLevel]}
                  title={risk.description}
                  subtitle={
                    <span>
                      {risk.category} · L{risk.likelihood} × S{risk.severity} = {score}
                      {missingControls ? ' · No control recorded' : ` · ${risk.controlMeasures.length} control${risk.controlMeasures.length === 1 ? '' : 's'}`}
                    </span>
                  }
                  trailing={
                    <div className="flex items-center gap-2">
                      <BandPill band={risk.riskLevel} />
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          removeRiskFactor(risk.id);
                        }}
                        aria-label="Remove risk factor"
                        className="text-[11px] font-medium text-white/45 hover:text-red-400 transition-colors touch-manipulation h-11 px-1 -mr-1"
                      >
                        Remove
                      </button>
                    </div>
                  }
                />
              );
            })}
          </ListCard>

          {/* Pre-save / pre-export readiness gate */}
          <ReadinessGate items={assessmentReadiness} title="Ready to save?" />

          <div className="flex flex-col sm:flex-row gap-2">
            <PrimaryButton fullWidth disabled={!assessmentReady} onClick={handleSave}>
              Save assessment
            </PrimaryButton>
            <SecondaryButton fullWidth disabled={!assessmentReady} onClick={handleExport}>
              Export report
            </SecondaryButton>
          </div>
        </div>
      )}

      {/* ─── Add risk factor sheet ─── */}
      <Sheet open={showAddSheet} onOpenChange={(o) => (o ? setShowAddSheet(true) : closeSheet())}>
        <SheetContent side="bottom" className="h-[90vh] p-0 rounded-t-2xl overflow-hidden border-white/[0.08]">
          <SheetShell
            eyebrow="New risk factor"
            title="Identify a hazard"
            footer={
              <>
                <SecondaryButton onClick={closeSheet}>Cancel</SecondaryButton>
                <PrimaryButton fullWidth disabled={!draftReady} onClick={addRiskFactor}>
                  Add risk factor
                </PrimaryButton>
              </>
            }
          >
            <FormCard eyebrow="Hazard">
              <Field
                label="Category template"
                hint="Pick a category for suggested likelihood and severity defaults."
              >
                <Select
                  value={currentRisk.category || undefined}
                  onValueChange={(value) => {
                    const t = hazardTemplates.find((h) => h.category === value);
                    setCurrentRisk((prev) => ({
                      ...prev,
                      category: value,
                      likelihood: t?.defaultLikelihood ?? prev.likelihood,
                      severity: t?.defaultSeverity ?? prev.severity,
                    }));
                  }}
                >
                  <SelectTrigger className={selectTriggerClass}>
                    <SelectValue placeholder="Select a hazard category" />
                  </SelectTrigger>
                  <SelectContent className={selectContentClass}>
                    {riskCategories.map((category) => (
                      <SelectItem key={category} value={category}>
                        {category}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </Field>

              <Field label="Specific hazard" required>
                <HazardSelect
                  value={currentRisk.description}
                  onValueChange={(value) => setCurrentRisk((prev) => ({ ...prev, description: value }))}
                  placeholder="Select or search for a specific hazard…"
                  showQuickPicks={false}
                />
              </Field>
            </FormCard>

            <FormCard eyebrow="Risk rating">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <Field label="Likelihood (1–5)">
                  <Select
                    value={String(currentRisk.likelihood)}
                    onValueChange={(v) => setCurrentRisk((prev) => ({ ...prev, likelihood: Number(v) }))}
                  >
                    <SelectTrigger className={selectTriggerClass}>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className={selectContentClass}>
                      {LIKELIHOOD_OPTIONS.map((o) => (
                        <SelectItem key={o.v} value={String(o.v)}>
                          {o.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </Field>
                <Field label="Severity (1–5)">
                  <Select
                    value={String(currentRisk.severity)}
                    onValueChange={(v) => setCurrentRisk((prev) => ({ ...prev, severity: Number(v) }))}
                  >
                    <SelectTrigger className={selectTriggerClass}>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className={selectContentClass}>
                      {SEVERITY_OPTIONS.map((o) => (
                        <SelectItem key={o.v} value={String(o.v)}>
                          {o.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </Field>
              </div>

              <div className="flex items-center justify-between gap-3 px-3 h-11 rounded-xl bg-[hsl(0_0%_9%)] border border-white/[0.08]">
                <span className="text-[12.5px] text-white/70">
                  Score {currentRisk.likelihood * currentRisk.severity}/25
                </span>
                <BandPill band={draftBand} />
              </div>
            </FormCard>

            <FormCard eyebrow="Control measures">
              <Field
                label="Add a control"
                hint="Pick a recommended consequence to pull in suggested controls, or type your own below."
              >
                <RiskSelect
                  selectedHazard={currentRisk.description}
                  onValueChange={() => {}}
                  onControlMeasuresChange={(measures) =>
                    setCurrentRisk((prev) => ({
                      ...prev,
                      controlMeasures: Array.from(new Set([...prev.controlMeasures, ...measures])),
                    }))
                  }
                  placeholder="Select a potential consequence…"
                />
              </Field>

              <AddControlInput
                onAdd={(text) =>
                  setCurrentRisk((prev) => ({
                    ...prev,
                    controlMeasures: Array.from(new Set([...prev.controlMeasures, text])),
                  }))
                }
              />

              {currentRisk.controlMeasures.length > 0 ? (
                <ListCard>
                  {currentRisk.controlMeasures.map((c, i) => (
                    <div key={`${c}-${i}`} className="flex items-center gap-3 px-4 py-3">
                      <span aria-hidden className="h-1.5 w-1.5 rounded-full bg-elec-yellow shrink-0" />
                      <span className="flex-1 min-w-0 text-[12.5px] text-white/90 leading-relaxed">{c}</span>
                      <button
                        type="button"
                        onClick={() =>
                          setCurrentRisk((prev) => ({
                            ...prev,
                            controlMeasures: prev.controlMeasures.filter((_, idx) => idx !== i),
                          }))
                        }
                        aria-label="Remove control measure"
                        className="text-[11px] font-medium text-white/45 hover:text-red-400 transition-colors touch-manipulation shrink-0"
                      >
                        Remove
                      </button>
                    </div>
                  ))}
                </ListCard>
              ) : (
                <p className="text-[11px] text-amber-400/90">
                  Record at least one control measure before adding this hazard.
                </p>
              )}
            </FormCard>

            <ReadinessGate items={draftReadiness} title="Ready to add?" />
          </SheetShell>
        </SheetContent>
      </Sheet>
    </SafetyModuleShell>
  );
};

// ─── Free-text control input ───

function AddControlInput({ onAdd }: { onAdd: (text: string) => void }) {
  const [value, setValue] = useState('');
  const submit = () => {
    const t = value.trim();
    if (!t) return;
    onAdd(t);
    setValue('');
  };
  return (
    <div className="flex items-center gap-2">
      <input
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === 'Enter') {
            e.preventDefault();
            submit();
          }
        }}
        className={inputClass}
        placeholder="Type a control measure…"
      />
      <SecondaryButton onClick={submit} disabled={!value.trim()}>
        Add
      </SecondaryButton>
    </div>
  );
}

export default RiskAssessmentBuilder;
