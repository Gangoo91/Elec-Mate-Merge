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

function CircuitSchedule({ data }: { data: CertData }) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const circuits: any[] = Array.isArray(data?.scheduleOfTests) ? data.scheduleOfTests : [];
  const [expanded, setExpanded] = useState(false);
  const INITIAL = 8;
  const visible = expanded ? circuits : circuits.slice(0, INITIAL);

  return (
    <div className="space-y-3">
      <SectionTitle dot="bg-blue-400">
        Schedule of tests{circuits.length > 0 ? ` (${circuits.length} circuits)` : ''}
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
              return (
                <div key={i} className="px-3 py-2.5 space-y-1">
                  <p className="text-sm font-medium text-white truncate">
                    {[c.circuitNumber, c.circuitDescription].filter(Boolean).join(' — ') ||
                      `Circuit ${i + 1}`}
                  </p>
                  <div className="flex flex-wrap gap-x-3 gap-y-0.5">
                    {(device || rating) && (
                      <ValueChip label="Device" value={`${device} ${rating}`.trim()} />
                    )}
                    {present(c.zs) && <ValueChip label="Zs" value={`${asText(c.zs)}Ω`} />}
                    {present(c.r1r2) && <ValueChip label="R1+R2" value={`${asText(c.r1r2)}Ω`} />}
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
                </div>
              );
            })}
          </div>
          {circuits.length > INITIAL && (
            <button
              type="button"
              onClick={() => setExpanded((e) => !e)}
              className="h-11 w-full rounded-lg text-sm font-medium text-elec-yellow bg-white/[0.04] border border-white/[0.08] touch-manipulation active:scale-[0.98] flex items-center justify-center gap-1.5"
            >
              {expanded ? 'Show fewer circuits' : `Show all ${circuits.length} circuits`}
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

/* ── Composition ──────────────────────────────────────────────────────────── */

export function QsCertReviewBody({ reportType, data }: QsCertReviewBodyProps) {
  return (
    <div className="space-y-5">
      <Observations reportType={reportType} data={data} />
      {reportType === 'minor-works' ? (
        <MinorWorksTests data={data} />
      ) : (
        <CircuitSchedule data={data} />
      )}
      <Limitations data={data} />
      <Declarations reportType={reportType} data={data} />
    </div>
  );
}

export default QsCertReviewBody;
