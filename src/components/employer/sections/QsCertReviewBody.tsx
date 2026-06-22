import React, { useState } from 'react';
import { cn } from '@/lib/utils';
import { ChevronDown } from 'lucide-react';

/**
 * Read-only technical rendering of a certificate inside the QS review sheet —
 * observations with codes, the schedule of tests, declarations and
 * limitations — so the QS can review the actual work, not just counts
 * (with the issue gate on there is often no PDF to open yet).
 */

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type CertData = Record<string, any>;

interface QsCertReviewBodyProps {
  reportType: string;
  data: CertData;
}

const CODE_STYLE: Record<string, string> = {
  C1: 'bg-red-500/20 border-red-500/40 text-red-300',
  C2: 'bg-orange-500/20 border-orange-500/40 text-orange-300',
  C3: 'bg-amber-500/20 border-amber-500/40 text-amber-300',
  FI: 'bg-blue-500/20 border-blue-500/40 text-blue-300',
};

function SectionTitle({ dot, children }: { dot: string; children: React.ReactNode }) {
  return (
    <h3 className="text-base font-semibold text-foreground flex items-center gap-2">
      <div className={cn('w-1.5 h-1.5 rounded-full', dot)}></div>
      {children}
    </h3>
  );
}

function ValueChip({ label, value }: { label: string; value: string }) {
  return (
    <span className="inline-flex items-baseline gap-1 text-[11.5px]">
      <span className="text-white/40">{label}</span>
      <span className="text-white/85 tabular-nums">{value}</span>
    </span>
  );
}

// Form inputs store strings, but AI photo-import can pass numbers through —
// coerce rather than silently hide.
function present(value: unknown): boolean {
  if (typeof value === 'number') return true;
  return typeof value === 'string' && value.trim().length > 0;
}

function asText(value: unknown): string {
  return value == null ? '' : String(value);
}

function SignatureRow({ label, name, signed }: { label: string; name?: string; signed: boolean }) {
  return (
    <div className="flex items-center justify-between gap-3 py-2">
      <div className="min-w-0">
        <p className="text-[10px] uppercase tracking-[0.14em] text-white/40">{label}</p>
        <p className="text-sm text-white truncate">{name || '—'}</p>
      </div>
      <span
        className={cn(
          'text-[10px] font-semibold uppercase tracking-[0.14em] border rounded px-1.5 py-0.5 shrink-0',
          signed ? 'border-emerald-400/40 text-emerald-300' : 'border-orange-400/40 text-orange-300'
        )}
      >
        {signed ? 'Signed' : 'Not signed'}
      </span>
    </div>
  );
}

/* ── Observations ─────────────────────────────────────────────────────────── */

function Observations({ reportType, data }: QsCertReviewBodyProps) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const raw: any[] = Array.isArray(data?.defectObservations)
    ? data.defectObservations
    : Array.isArray(data?.observations)
      ? data.observations
      : [];

  if (reportType === 'minor-works') return null;

  return (
    <div className="space-y-3">
      <SectionTitle dot="bg-orange-400">
        Observations{raw.length > 0 ? ` (${raw.length})` : ''}
      </SectionTitle>
      {raw.length === 0 ? (
        <p className="text-sm text-white/50">No observations recorded.</p>
      ) : (
        <div className="space-y-2">
          {raw.map((obs, i) => {
            const code = (obs.defectCode || obs.defect_code || obs.code || '').toUpperCase();
            return (
              <div
                key={obs.id || i}
                className="rounded-lg border border-white/[0.08] bg-white/[0.04] px-3 py-2.5 space-y-1.5"
              >
                <div className="flex items-start justify-between gap-2">
                  <p className="text-sm text-white/90 whitespace-pre-wrap">
                    {obs.description || obs.observation || 'No description'}
                  </p>
                  {code && (
                    <span
                      className={cn(
                        'text-[10px] font-bold border rounded px-1.5 py-0.5 shrink-0',
                        CODE_STYLE[code] || 'bg-white/[0.06] border-white/[0.15] text-white/70'
                      )}
                    >
                      {code}
                    </span>
                  )}
                </div>
                {(obs.item || obs.location) && (
                  <p className="text-[11.5px] text-white/45">{obs.item || obs.location}</p>
                )}
                {obs.recommendation && (
                  <p className="text-[11.5px] text-white/60">
                    <span className="text-white/40">Action: </span>
                    {obs.recommendation}
                  </p>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

/* ── Schedule of tests (EICR / EIC circuit arrays) ────────────────────────── */

// Parse a measured value that may carry comparators/units (">200", "<0.5",
// "1.37Ω", "N/A") into a number, or null when there's no comparable figure.
function parseMeasure(v: unknown): number | null {
  if (v == null) return null;
  const s = String(v).trim();
  if (s === '' || /^n\/?a$/i.test(s)) return null;
  const m = s.match(/-?\d+(\.\d+)?/);
  return m ? parseFloat(m[0]) : null;
}

// Objective, data-driven flags for a circuit — each uses the circuit's OWN
// recorded values (e.g. its stored maxZs), never an invented standard. These
// are the lines a QS should look at first.
function circuitFlags(c: CertData): string[] {
  const flags: string[] = [];
  const zs = parseMeasure(c.zs);
  const maxZs = parseMeasure(c.maxZs);
  if (zs != null && maxZs != null && zs > maxZs) flags.push('Zs > max');

  const ir = parseMeasure(c.insulationLiveEarth ?? c.insulationResistance);
  if (ir != null && ir < 1) flags.push('IR < 1MΩ');

  const pol = String(c.polarity ?? '').trim();
  if (pol && !/^(correct|✓|ok|satisfactory|pass|n\/?a)$/i.test(pol)) flags.push('Polarity');

  const rcd = String(c.rcdRating ?? c.rcdType ?? '').trim();
  const hasRcd = rcd !== '' && !/^n\/?a$/i.test(rcd);
  const rcdTested = parseMeasure(c.rcdOneX) != null || /✓/.test(String(c.rcdTestButton ?? ''));
  if (hasRcd && !rcdTested) flags.push('RCD untested');

  return flags;
}

function CircuitSchedule({ data }: { data: CertData }) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const circuits: any[] = Array.isArray(data?.scheduleOfTests) ? data.scheduleOfTests : [];
  const [expanded, setExpanded] = useState(false);
  const INITIAL = 8;
  const flaggedList = circuits.filter((c) => circuitFlags(c).length > 0);
  // Collapsed view leads with the circuits that need a QS's eye; if none are
  // flagged, fall back to the first handful.
  const visible = expanded
    ? circuits
    : flaggedList.length > 0
      ? flaggedList
      : circuits.slice(0, INITIAL);

  return (
    <div className="space-y-3">
      <SectionTitle dot="bg-blue-400">
        Schedule of tests
        {circuits.length > 0
          ? ` (${circuits.length} circuit${circuits.length === 1 ? '' : 's'}${flaggedList.length > 0 ? ` · ${flaggedList.length} to review` : ''})`
          : ''}
      </SectionTitle>
      {circuits.length === 0 ? (
        <p className="text-sm text-white/50">No test results recorded.</p>
      ) : (
        <>
          <div className="divide-y divide-white/[0.06] rounded-lg border border-white/[0.08] bg-white/[0.03]">
            {visible.map((c, i) => {
              const device = [c.protectiveDeviceType, c.protectiveDeviceCurve]
                .filter(Boolean)
                .join(' ');
              const rating = c.protectiveDeviceRating ? `${c.protectiveDeviceRating}A` : '';
              const flags = circuitFlags(c);
              return (
                <div
                  key={i}
                  className={cn('px-3 py-2.5 space-y-1', flags.length > 0 && 'bg-red-500/[0.07]')}
                >
                  <div className="flex items-start gap-2">
                    {flags.length > 0 && (
                      <span
                        aria-hidden
                        className="mt-1 w-[3px] h-9 rounded-full bg-red-500/70 shrink-0"
                      />
                    )}
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-white truncate">
                        {[c.circuitNumber, c.circuitDescription].filter(Boolean).join(' — ') ||
                          `Circuit ${i + 1}`}
                      </p>
                      <div className="flex flex-wrap gap-x-3 gap-y-0.5">
                        {(device || rating) && (
                          <ValueChip label="Device" value={`${device} ${rating}`.trim()} />
                        )}
                        {present(c.zs) && <ValueChip label="Zs" value={`${asText(c.zs)}Ω`} />}
                        {present(c.maxZs) && (
                          <ValueChip label="max Zs" value={`${asText(c.maxZs)}Ω`} />
                        )}
                        {present(c.r1r2) && (
                          <ValueChip label="R1+R2" value={`${asText(c.r1r2)}Ω`} />
                        )}
                        {/* Live editors write insulationLiveEarth; insulationResistance is legacy */}
                        {present(c.insulationLiveEarth || c.insulationResistance) && (
                          <ValueChip
                            label="IR"
                            value={`${asText(c.insulationLiveEarth || c.insulationResistance)}MΩ`}
                          />
                        )}
                        {present(c.polarity) && (
                          <ValueChip label="Polarity" value={asText(c.polarity)} />
                        )}
                        {present(c.rcdOneX) && (
                          <ValueChip label="RCD 1×" value={`${asText(c.rcdOneX)}ms`} />
                        )}
                      </div>
                      {flags.length > 0 && (
                        <div className="flex flex-wrap gap-1.5 mt-1">
                          {flags.map((f) => (
                            <span
                              key={f}
                              className="text-[10px] font-semibold uppercase tracking-wide border rounded px-1.5 py-0.5 bg-red-500/20 border-red-500/40 text-red-300"
                            >
                              {f}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
          {(circuits.length > visible.length || expanded) && (
            <button
              type="button"
              onClick={() => setExpanded((e) => !e)}
              className="h-11 w-full rounded-lg text-sm font-medium text-elec-yellow bg-white/[0.04] border border-white/[0.08] touch-manipulation active:scale-[0.98] flex items-center justify-center gap-1.5"
            >
              {expanded
                ? flaggedList.length > 0
                  ? 'Show flagged only'
                  : 'Show fewer circuits'
                : `Show all ${circuits.length} circuits`}
              <ChevronDown
                className={cn('h-4 w-4 transition-transform', expanded && 'rotate-180')}
              />
            </button>
          )}
        </>
      )}
    </div>
  );
}

/* ── Minor Works test values ──────────────────────────────────────────────── */

const MW_TESTS: { label: string; key: string; unit?: string }[] = [
  { label: 'R1+R2', key: 'continuityR1R2', unit: 'Ω' },
  { label: 'IR L–E', key: 'insulationLiveEarth', unit: 'MΩ' },
  { label: 'IR L–N', key: 'insulationLiveNeutral', unit: 'MΩ' },
  { label: 'Zs', key: 'earthFaultLoopImpedance', unit: 'Ω' },
  { label: 'Max Zs', key: 'maxPermittedZs', unit: 'Ω' },
  { label: 'PFC', key: 'prospectiveFaultCurrent', unit: 'kA' },
  { label: 'RCD 1×', key: 'rcdOneX', unit: 'ms' },
  { label: 'RCD button', key: 'rcdTestButton' },
  { label: 'Polarity', key: 'polarity' },
  { label: 'Functional', key: 'functionalTesting' },
];

// MW toggle fields store raw tokens — show readable labels
const MW_VALUE_LABEL: Record<string, string> = {
  pass: 'Pass',
  fail: 'Fail',
  correct: 'Correct',
  incorrect: 'Incorrect',
};

function MinorWorksTests({ data }: { data: CertData }) {
  const rows = MW_TESTS.map((t) => {
    const raw = asText(data?.[t.key]).trim();
    return { ...t, value: MW_VALUE_LABEL[raw.toLowerCase()] || raw };
  }).filter((t) => {
    const lower = t.value.toLowerCase();
    return t.value.length > 0 && lower !== 'n/a' && lower !== 'na';
  });
  const workDescription =
    data?.workDescription || data?.descriptionOfWork || data?.description || '';

  return (
    <div className="space-y-3">
      <SectionTitle dot="bg-blue-400">Work & test results</SectionTitle>
      {workDescription && (
        <p className="text-sm text-white/85 whitespace-pre-wrap">{workDescription}</p>
      )}
      {rows.length === 0 ? (
        <p className="text-sm text-white/50">No test results recorded.</p>
      ) : (
        <div className="grid grid-cols-2 gap-x-4 gap-y-2 rounded-lg border border-white/[0.08] bg-white/[0.03] px-3 py-2.5">
          {rows.map((t) => (
            <div key={t.key} className="min-w-0">
              <p className="text-[10px] uppercase tracking-[0.14em] text-white/40">{t.label}</p>
              <p className="text-sm text-white tabular-nums truncate">
                {t.value}
                {t.unit ? ` ${t.unit}` : ''}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

/* ── Declarations / signatures ────────────────────────────────────────────── */

function Declarations({ reportType, data }: QsCertReviewBodyProps) {
  let rows: { label: string; name?: string; signed: boolean }[] = [];

  if (reportType === 'eic') {
    rows = [
      { label: 'Designer', name: data?.designerName, signed: present(data?.designerSignature) },
      {
        label: 'Constructor',
        name: data?.constructorName,
        signed: present(data?.constructorSignature),
      },
      {
        label: 'Inspector & tester',
        name: data?.inspectorName,
        signed: present(data?.inspectorSignature),
      },
    ];
  } else if (reportType === 'eicr') {
    rows = [
      {
        label: 'Inspected & tested by',
        name: data?.inspectedByName || data?.inspectorName,
        signed: present(data?.inspectedBySignature) || present(data?.inspectorSignature),
      },
      {
        label: 'Report authorised by',
        name: data?.reportAuthorisedByName,
        signed: present(data?.reportAuthorisedBySignature),
      },
    ];
  } else {
    rows = [
      {
        label: 'Declaration',
        name: data?.electricianName,
        signed: present(data?.signature),
      },
    ];
  }

  return (
    <div className="space-y-1">
      <SectionTitle dot="bg-green-400">Declarations</SectionTitle>
      <div className="divide-y divide-white/[0.06]">
        {rows.map((r) => (
          <SignatureRow key={r.label} {...r} />
        ))}
      </div>
    </div>
  );
}

/* ── Limitations ──────────────────────────────────────────────────────────── */

function Limitations({ data }: { data: CertData }) {
  // limitationsOfInspection is the primary EICR agreed-limitations field
  const text =
    data?.limitationsOfInspection ||
    data?.operationalLimitations ||
    data?.limitations ||
    data?.agreedLimitations ||
    '';
  if (!present(text)) return null;
  return (
    <div className="space-y-2">
      <SectionTitle dot="bg-amber-400">Limitations</SectionTitle>
      <p className="text-sm text-white/80 whitespace-pre-wrap">{text}</p>
    </div>
  );
}

/* ── Detail rows (label / value list) ─────────────────────────────────────── */

function DetailRows({ rows }: { rows: { label: string; value: string }[] }) {
  if (rows.length === 0) return null;
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-5 gap-y-1.5">
      {rows.map((r) => (
        <div
          key={r.label}
          className="flex items-baseline justify-between gap-3 border-b border-white/[0.04] pb-1"
        >
          <span className="text-[11px] text-white/40 shrink-0">{r.label}</span>
          <span className="text-[12.5px] text-white/85 text-right break-words">{r.value}</span>
        </div>
      ))}
    </div>
  );
}

// Build a label/value list, skipping blank fields.
function buildRows(
  data: CertData,
  spec: { label: string; keys: string[]; suffix?: string; join?: string }[]
): { label: string; value: string }[] {
  const rows: { label: string; value: string }[] = [];
  for (const s of spec) {
    const parts = s.keys
      .map((k) => data?.[k])
      .filter((v) => present(v))
      .map(asText);
    if (parts.length === 0) continue;
    rows.push({ label: s.label, value: parts.join(s.join ?? ' ') + (s.suffix ?? '') });
  }
  return rows;
}

/* ── Installation & purpose ───────────────────────────────────────────────── */

function InstallationDetails({ data }: { data: CertData }) {
  const rows = buildRows(data, [
    { label: 'Client', keys: ['clientName'] },
    { label: 'Occupier', keys: ['occupier'] },
    { label: 'Installation', keys: ['installationAddress'] },
    { label: 'Type', keys: ['installationType'] },
    { label: 'Property', keys: ['propertyType'] },
    { label: 'Purpose', keys: ['purposeOfInspection', 'otherPurpose'] },
    { label: 'Extent', keys: ['extentOfInspection'] },
    { label: 'Last inspection', keys: ['dateOfLastInspection'] },
  ]);
  if (rows.length === 0) return null;
  return (
    <div className="space-y-2.5">
      <SectionTitle dot="bg-white/50">Installation &amp; purpose</SectionTitle>
      <DetailRows rows={rows} />
    </div>
  );
}

/* ── Supply & earthing ────────────────────────────────────────────────────── */

function SupplyEarthing({ reportType, data }: QsCertReviewBodyProps) {
  if (reportType === 'minor-works') return null;
  const rows = buildRows(data, [
    { label: 'Earthing system', keys: ['earthingArrangement'] },
    { label: 'Supply type', keys: ['supplyType'] },
    { label: 'Voltage', keys: ['supplyVoltage', 'supplyVoltageCustom'], suffix: ' V', join: '' },
    { label: 'Frequency', keys: ['supplyFrequency'] },
    { label: 'Phases', keys: ['phases'] },
    { label: 'PFC', keys: ['prospectiveFaultCurrent'], suffix: ' kA' },
    { label: 'Ze (external)', keys: ['externalZe'], suffix: ' Ω' },
    { label: 'Main switch', keys: ['mainSwitchType', 'mainSwitchRating'] },
    { label: 'Main switch BS EN', keys: ['mainSwitchBsEn'] },
    {
      label: 'Earthing conductor',
      keys: ['mainEarthingConductorType', 'mainEarthingConductorSize'],
    },
    { label: 'Main bonding', keys: ['mainBondingConductorType', 'mainBondingSize'] },
    { label: 'Max demand', keys: ['maximumDemand', 'maximumDemandUnit'] },
  ]);
  if (rows.length === 0) return null;
  return (
    <div className="space-y-2.5">
      <SectionTitle dot="bg-purple-400">Supply &amp; earthing</SectionTitle>
      <DetailRows rows={rows} />
    </div>
  );
}

/* ── Schedule of inspections (the visual-inspection checklist) ─────────────── */

function normaliseOutcome(outcome: unknown): string {
  return asText(outcome)
    .toLowerCase()
    .replace(/[^a-z0-9]/g, '');
}

// Anything that isn't a clean pass / N-A is worth the QS's eye.
function isFlaggedOutcome(outcome: unknown): boolean {
  const o = normaliseOutcome(outcome);
  return ![
    'satisfactory',
    'acceptable',
    'pass',
    'ok',
    'na',
    'notapplicable',
    'lim',
    'limitation',
    '',
  ].includes(o);
}

function OutcomeBadge({ outcome }: { outcome: unknown }) {
  const o = normaliseOutcome(outcome);
  const raw = asText(outcome);
  let style = 'border-emerald-400/30 text-emerald-300';
  let label = raw || '—';
  if (o === 'c1' || o === 'unsatisfactory') {
    style = CODE_STYLE.C1;
    label = o === 'c1' ? 'C1' : 'Unsat.';
  } else if (o === 'c2') {
    style = CODE_STYLE.C2;
    label = 'C2';
  } else if (o === 'c3') {
    style = CODE_STYLE.C3;
    label = 'C3';
  } else if (o === 'fi') {
    style = CODE_STYLE.FI;
    label = 'FI';
  } else if (o === 'na' || o === 'notapplicable') {
    style = 'border-white/15 text-white/40';
    label = 'N/A';
  } else if (o === 'lim' || o === 'limitation') {
    style = 'bg-amber-500/10 border-amber-500/30 text-amber-200';
    label = 'LIM';
  } else if (o === 'satisfactory' || o === 'acceptable' || o === 'pass' || o === 'ok') {
    label = '✓';
  }
  return (
    <span
      className={cn(
        'text-[10px] font-semibold uppercase tracking-wide border rounded px-1.5 py-0.5 shrink-0',
        style
      )}
    >
      {label}
    </span>
  );
}

function ScheduleOfInspections({ reportType, data }: QsCertReviewBodyProps) {
  const [showAll, setShowAll] = useState(false);
  if (reportType === 'minor-works') return null;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const items: any[] = Array.isArray(data?.inspectionItems) ? data.inspectionItems : [];
  if (items.length === 0) return null;

  const flaggedCount = items.filter((it) => isFlaggedOutcome(it?.outcome)).length;
  // Default to the items a QS must scrutinise; full list on demand.
  const visible = showAll ? items : items.filter((it) => isFlaggedOutcome(it?.outcome));

  // Group visible items by their schedule section.
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const groups = new Map<string, any[]>();
  for (const it of visible) {
    const key = [it?.sectionNumber, it?.section].filter(Boolean).join(' · ') || 'Other';
    if (!groups.has(key)) groups.set(key, []);
    groups.get(key)!.push(it);
  }

  return (
    <div className="space-y-2.5">
      <SectionTitle dot="bg-cyan-400">
        Schedule of inspections ({items.length}
        {flaggedCount > 0 ? ` · ${flaggedCount} to review` : ' · all satisfactory'})
      </SectionTitle>

      {visible.length === 0 ? (
        <p className="text-sm text-white/50">
          No items flagged.{' '}
          <button
            type="button"
            onClick={() => setShowAll(true)}
            className="text-elec-yellow touch-manipulation"
          >
            Show all {items.length} items →
          </button>
        </p>
      ) : (
        <div className="space-y-3">
          {[...groups.entries()].map(([section, rows]) => (
            <div key={section} className="space-y-1.5">
              <p className="text-[10px] uppercase tracking-[0.12em] text-white/40">{section}</p>
              {rows.map((it, i) => (
                <div
                  key={it?.id || i}
                  className="flex items-start gap-2.5 border-b border-white/[0.04] pb-1.5"
                >
                  <span className="text-[11px] text-white/40 tabular-nums shrink-0 w-8">
                    {asText(it?.number)}
                  </span>
                  <div className="flex-1 min-w-0">
                    <p className="text-[12.5px] text-white/85">{asText(it?.item)}</p>
                    {present(it?.clause) && (
                      <p className="text-[10px] text-white/35">Reg {asText(it.clause)}</p>
                    )}
                    {present(it?.notes) && (
                      <p className="text-[11px] text-white/55 mt-0.5 whitespace-pre-wrap">
                        {asText(it.notes)}
                      </p>
                    )}
                  </div>
                  <OutcomeBadge outcome={it?.outcome} />
                </div>
              ))}
            </div>
          ))}

          {!showAll && flaggedCount > 0 && (
            <button
              type="button"
              onClick={() => setShowAll(true)}
              className="flex items-center gap-1 text-[12px] font-medium text-elec-yellow touch-manipulation"
            >
              <ChevronDown className="h-3.5 w-3.5" />
              Show all {items.length} inspection items
            </button>
          )}
          {showAll && (
            <button
              type="button"
              onClick={() => setShowAll(false)}
              className="text-[12px] font-medium text-elec-yellow touch-manipulation"
            >
              Show flagged only
            </button>
          )}
        </div>
      )}
    </div>
  );
}

/* ── Distribution boards ──────────────────────────────────────────────────── */

function DistributionBoards({ reportType, data }: QsCertReviewBodyProps) {
  if (reportType === 'minor-works') return null;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const boards: any[] = Array.isArray(data?.distributionBoards) ? data.distributionBoards : [];
  if (boards.length === 0) return null;
  return (
    <div className="space-y-2.5">
      <SectionTitle dot="bg-blue-400">Distribution boards ({boards.length})</SectionTitle>
      <div className="space-y-2.5">
        {boards.map((b, i) => (
          <div key={b?.id || i} className="rounded-xl border border-white/[0.06] p-3">
            <p className="text-[13px] font-medium text-white">
              {[b?.reference, b?.name].filter(Boolean).join(' — ') || `Board ${i + 1}`}
            </p>
            <div className="mt-1.5 flex flex-wrap gap-x-4 gap-y-1">
              {present(b?.location) && <ValueChip label="Location" value={asText(b.location)} />}
              {present(b?.type) && <ValueChip label="Type" value={asText(b.type)} />}
              {present(b?.zdb) && <ValueChip label="Zdb" value={`${asText(b.zdb)}Ω`} />}
              {present(b?.ipf) && <ValueChip label="IPF" value={`${asText(b.ipf)}kA`} />}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ── Overall outcome ──────────────────────────────────────────────────────── */

function OverallOutcome({ reportType, data }: QsCertReviewBodyProps) {
  if (reportType === 'minor-works') return null;
  const assessment = asText(data?.overallAssessment || data?.satisfactoryForContinuedUse);
  const a = assessment.toLowerCase();
  const satisfactory = a === 'satisfactory' || a === 'yes';
  const unsatisfactory = a === 'unsatisfactory' || a === 'no';
  const rows = buildRows(data, [
    { label: 'Next inspection', keys: ['nextInspectionDate'] },
    { label: 'Interval', keys: ['inspectionInterval'] },
    { label: 'Reason', keys: ['intervalReasons'] },
  ]);
  if (!present(assessment) && rows.length === 0) return null;
  return (
    <div className="space-y-2.5">
      <SectionTitle dot="bg-green-400">Overall outcome</SectionTitle>
      {present(assessment) && (
        <span
          className={cn(
            'inline-block text-[11px] font-semibold uppercase tracking-wide border rounded px-2 py-0.5',
            satisfactory
              ? 'border-emerald-400/40 text-emerald-300'
              : unsatisfactory
                ? 'bg-red-500/20 border-red-500/40 text-red-300'
                : 'border-white/20 text-white/70'
          )}
        >
          {satisfactory ? 'Satisfactory' : unsatisfactory ? 'Unsatisfactory' : assessment}
        </span>
      )}
      <DetailRows rows={rows} />
    </div>
  );
}

/* ── Composition ──────────────────────────────────────────────────────────── */

export function QsCertReviewBody({ reportType, data }: QsCertReviewBodyProps) {
  return (
    <div className="space-y-5">
      <InstallationDetails data={data} />
      <SupplyEarthing reportType={reportType} data={data} />
      <ScheduleOfInspections reportType={reportType} data={data} />
      <Observations reportType={reportType} data={data} />
      {reportType === 'minor-works' ? (
        <MinorWorksTests data={data} />
      ) : (
        <CircuitSchedule data={data} />
      )}
      <DistributionBoards reportType={reportType} data={data} />
      <Limitations data={data} />
      <OverallOutcome reportType={reportType} data={data} />
      <Declarations reportType={reportType} data={data} />
    </div>
  );
}

export default QsCertReviewBody;
