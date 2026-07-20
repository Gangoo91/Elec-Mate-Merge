/**
 * competenceMatrix — turns the roster's credential records into the workforce
 * competence matrix every principal contractor asks for: workers as rows,
 * credential types as columns, each cell carrying the governing expiry date
 * and a red/amber/green status.
 *
 * Data sources (all already captured in the app — nothing synthesised):
 *   - employer_elec_id_profiles  → ECS card type + expiry
 *   - employer_certifications    → named certs with issue/expiry dates
 *   - employer_elec_id_training  → training records with expiry dates
 *   - employer_elec_id_qualifications → qualifications (18th Ed, 2391 …)
 *
 * Credential names are free text, so columns are derived by normalising names
 * into the canonical UK buckets a competence matrix is expected to show
 * (ECS, 18th Edition, 2391, First Aid, IPAF, PASMA, Asbestos Awareness …),
 * with any remaining credentials grouped by their own normalised name.
 */
import type { ElecIdProfile } from '@/services/elecIdService';
import type { Certification } from '@/hooks/useCertifications';
import { getQualificationLabel } from '@/data/uk-electrician-constants';

export type CellStatus = 'valid' | 'expiring' | 'expired' | 'none';

export interface MatrixCell {
  status: CellStatus;
  /** ISO date of the governing (latest) expiry, null = held with no expiry */
  expiry: string | null;
  /** The recorded credential name behind this cell (for tooltips/nudges) */
  label: string | null;
  daysLeft: number | null;
  /** Certificate/card number of the governing record — what an auditor
   *  cross-checks against the issuing body's register. Null = not recorded. */
  certNumber: string | null;
}

export interface MatrixColumn {
  key: string;
  label: string;
}

export interface MatrixWorker {
  employeeId: string;
  name: string;
  role: string;
  cells: Record<string, MatrixCell>;
  validCount: number;
  expiringCount: number;
  expiredCount: number;
}

export interface CompetenceMatrix {
  columns: MatrixColumn[];
  workers: MatrixWorker[];
  generatedAt: string;
  /** Amber threshold the matrix was built with — legend copy must match. */
  horizonDays: number;
}

/** Crew scope details threaded into exports when the matrix is filtered to a job. */
export interface MatrixScope {
  jobTitle: string;
  client: string;
  startDate: string | null;
}

/** Days until an ISO date, negative if past. */
const daysUntil = (iso: string): number =>
  Math.ceil((new Date(iso).getTime() - Date.now()) / 86_400_000);

const statusFor = (expiry: string | null, horizonDays: number): CellStatus => {
  if (!expiry) return 'valid'; // held, no expiry on record
  const d = daysUntil(expiry);
  if (d < 0) return 'expired';
  if (d <= horizonDays) return 'expiring';
  return 'valid';
};

/** Canonical credential buckets, in the order a matrix is normally read.
 *  Patterns are matched against DISPLAY names — stored slugs (e.g. `2391_52`,
 *  `ecs_gold` from UK_QUALIFICATIONS pickers) are resolved to their labels
 *  first via getQualificationLabel, so both slug-sourced and free-text
 *  credentials land in the right column. */
const CANONICAL: { key: string; label: string; match: RegExp }[] = [
  { key: '18th', label: '18th Edition', match: /18th|bs\s?7671|wiring reg|2382/i },
  {
    key: '2391',
    label: 'Inspection & Testing',
    match: /2391|2394|2395|inspection[\s,]*(&|and)?\s*testing|periodic inspection|initial verification/i,
  },
  { key: 'am2', label: 'AM2 / NVQ L3', match: /\bam2s?\b|nvq\s*(level\s*)?3|2357|5357/i },
  { key: 'pat', label: 'PAT Testing', match: /\bpat\b|2377/i },
  { key: 'firstaid', label: 'First Aid', match: /first aid|\befaw\b|\bfaw\b/i },
  { key: 'ipaf', label: 'IPAF', match: /ipaf|\bmewp\b/i },
  { key: 'pasma', label: 'PASMA', match: /pasma/i },
  { key: 'asbestos', label: 'Asbestos Awareness', match: /asbestos/i },
  { key: 'height', label: 'Working at Height', match: /work(ing)?\s*at\s*height|harness/i },
  { key: 'manual', label: 'Manual Handling', match: /manual handling/i },
  { key: 'ssts', label: 'SSSTS / SMSTS', match: /sssts|smsts|site\s*(supervisor|management)\s*safety/i },
  { key: 'fire', label: 'Fire Safety', match: /fire\s*(safety|marshal|warden|awareness)/i },
  { key: 'ev', label: 'EV Charging', match: /\bev\b|electric vehicle|2921|2919/i },
  {
    key: 'solar',
    label: 'Solar PV / Renewables',
    match: /solar|photovoltaic|\bpv\b|2399|battery\s*(energy\s*)?storage|\bbess\b/i,
  },
];

/** ECS-card credentials recorded as qualifications fold into the dedicated
 *  ECS column instead of spawning "ECS Gold Card" duplicate columns. */
const ECS_MATCH = /\becs\b/i;

/** Normalise a leftover credential name into a stable column key + label. */
const leftoverColumn = (rawName: string): MatrixColumn => {
  const label = rawName.trim().replace(/\s+/g, ' ');
  return { key: `other:${label.toLowerCase()}`, label };
};

interface CredentialRecord {
  name: string;
  expiry: string | null;
  /** Certificate/card number as recorded, null if not captured. */
  number: string | null;
}

/** Pick the governing record for a cell — the one with the latest expiry;
 *  a no-expiry record only governs if nothing dated is held. */
const governing = (records: CredentialRecord[]): CredentialRecord | null => {
  if (records.length === 0) return null;
  const dated = records.filter((r) => r.expiry);
  if (dated.length === 0) return records[0];
  return dated.sort((a, b) => (a.expiry! < b.expiry! ? 1 : -1))[0];
};

export function buildCompetenceMatrix(
  profiles: ElecIdProfile[],
  certifications: Certification[],
  options: { horizonDays?: number } = {}
): CompetenceMatrix {
  const horizonDays = options.horizonDays ?? 60;
  // Gather every worker's credential records (excluding ECS, which is a
  // dedicated column straight off the profile)
  const certsByEmployee = new Map<string, CredentialRecord[]>();
  for (const c of certifications) {
    const list = certsByEmployee.get(c.employee_id) ?? [];
    list.push({ name: c.name, expiry: c.expiry_date, number: c.certificate_number });
    certsByEmployee.set(c.employee_id, list);
  }

  const workersRaw = profiles.map((p) => {
    const all: CredentialRecord[] = [
      ...(certsByEmployee.get(p.employee_id) ?? []),
      ...(p.training ?? []).map((t) => ({
        name: t.training_name,
        expiry: t.expiry_date,
        number: t.certificate_id,
      })),
      ...(p.qualifications ?? []).map((q) => ({
        name: q.qualification_name,
        expiry: q.expiry_date,
        number: q.certificate_number,
      })),
    ]
      .filter((r) => r.name?.trim())
      // Stored slugs (e.g. `2391_52`) → display labels; free text passes through
      .map((r) => ({ ...r, name: getQualificationLabel(r.name) }));
    // ECS-card records feed the dedicated ECS column, not their own columns
    const records = all.filter((r) => !ECS_MATCH.test(r.name));
    const ecsRecords = all.filter((r) => ECS_MATCH.test(r.name));
    return { profile: p, records, ecsRecords };
  });

  // Decide which canonical columns actually exist in this company's data,
  // then append leftover credentials (grouped by name) so nothing recorded
  // is invisible in the matrix.
  const usedCanonical = new Set<string>();
  const leftovers = new Map<string, MatrixColumn>();
  for (const w of workersRaw) {
    for (const r of w.records) {
      const canon = CANONICAL.find((c) => c.match.test(r.name));
      if (canon) {
        usedCanonical.add(canon.key);
      } else {
        const col = leftoverColumn(r.name);
        if (!leftovers.has(col.key)) leftovers.set(col.key, col);
      }
    }
  }

  const columns: MatrixColumn[] = [
    { key: 'ecs', label: 'ECS Card' },
    ...CANONICAL.filter((c) => usedCanonical.has(c.key)).map(({ key, label }) => ({ key, label })),
    ...[...leftovers.values()].sort((a, b) => a.label.localeCompare(b.label)),
  ];

  const workers: MatrixWorker[] = workersRaw
    .map(({ profile, records, ecsRecords }) => {
      const cells: Record<string, MatrixCell> = {};

      // ECS cell — governing record across the profile's card fields AND any
      // ECS credentials recorded as qualifications (latest expiry wins, so a
      // renewed card supersedes an expired historical record)
      const ecsCandidates: CredentialRecord[] = [
        ...(profile.ecs_card_type || profile.ecs_expiry_date || profile.ecs_card_number
          ? [
              {
                name: profile.ecs_card_type || 'ECS Card',
                expiry: profile.ecs_expiry_date,
                number: profile.ecs_card_number,
              },
            ]
          : []),
        ...ecsRecords,
      ];
      const ecsGov = governing(ecsCandidates);
      cells.ecs = ecsGov
        ? {
            status: statusFor(ecsGov.expiry, horizonDays),
            expiry: ecsGov.expiry,
            label: ecsGov.name,
            daysLeft: ecsGov.expiry ? daysUntil(ecsGov.expiry) : null,
            // The profile's ECS card number is exact — prefer it even when an
            // ECS qualification record governs the expiry
            certNumber: profile.ecs_card_number || ecsGov.number,
          }
        : { status: 'none', expiry: null, label: null, daysLeft: null, certNumber: null };

      for (const col of columns) {
        if (col.key === 'ecs') continue;
        const canon = CANONICAL.find((c) => c.key === col.key);
        const matches = records.filter((r) =>
          canon ? canon.match.test(r.name) : leftoverColumn(r.name).key === col.key
        );
        const gov = governing(matches);
        cells[col.key] = gov
          ? {
              status: statusFor(gov.expiry, horizonDays),
              expiry: gov.expiry,
              label: gov.name,
              daysLeft: gov.expiry ? daysUntil(gov.expiry) : null,
              certNumber: gov.number,
            }
          : { status: 'none', expiry: null, label: null, daysLeft: null, certNumber: null };
      }

      const all = Object.values(cells);
      return {
        employeeId: profile.employee_id,
        name: profile.employee?.name || 'Unknown',
        role: profile.employee?.role || 'Electrician',
        cells,
        validCount: all.filter((c) => c.status === 'valid').length,
        expiringCount: all.filter((c) => c.status === 'expiring').length,
        expiredCount: all.filter((c) => c.status === 'expired').length,
      };
    })
    .sort((a, b) => a.name.localeCompare(b.name));

  return { columns, workers, generatedAt: new Date().toISOString(), horizonDays };
}

/* ────────────────────────────────────────────────────────
   Site requirements — "does everyone have X, Y, Z?"
   ──────────────────────────────────────────────────────── */

/** Requirement presets a principal contractor typically demands. Keys map to
 *  the canonical column keys above; a required key with no column in this
 *  company's data simply reads as missing for everyone — honest, not hidden. */
export const REQUIREMENT_PRESETS: { id: string; label: string; keys: string[] }[] = [
  { id: 'domestic', label: 'Domestic', keys: ['ecs', '18th'] },
  { id: 'commercial', label: 'Commercial site', keys: ['ecs', '18th', 'firstaid', 'asbestos'] },
  {
    id: 'principal',
    label: 'Principal contractor',
    keys: ['ecs', '18th', 'firstaid', 'asbestos', '2391', 'manual'],
  },
];

/** Display label for a requirement key — from the live columns first, falling
 *  back to the canonical list for keys not present in this company's data. */
export function requirementLabel(key: string, columns: MatrixColumn[]): string {
  if (key === 'ecs') return 'ECS Card';
  return (
    columns.find((c) => c.key === key)?.label ??
    CANONICAL.find((c) => c.key === key)?.label ??
    key
  );
}

export type GapReason = 'missing' | 'expired' | 'expires_before_start';

export interface WorkerGap {
  key: string;
  label: string;
  reason: GapReason;
  expiry: string | null;
}

export interface WorkerReadiness {
  employeeId: string;
  name: string;
  ready: boolean;
  gaps: WorkerGap[];
}

export interface SiteReadiness {
  workers: WorkerReadiness[];
  readyCount: number;
  total: number;
  requiredKeys: string[];
  /** ISO date expiries were judged against — the job start when a crew job is
   *  selected, otherwise today. */
  referenceDate: string;
  referenceIsJobStart: boolean;
}

/** Judge every worker against a set of required credentials. When a job start
 *  date is supplied AND is in the future, expiries are judged against the job
 *  start — a card that lapses before the crew reaches site is a gap today. */
export function assessSiteReadiness(
  matrix: CompetenceMatrix,
  requiredKeys: string[],
  jobStartDate?: string | null
): SiteReadiness {
  const today = new Date().toISOString().slice(0, 10);
  const referenceIsJobStart = Boolean(jobStartDate && jobStartDate > today);
  const referenceDate = referenceIsJobStart ? (jobStartDate as string) : today;

  const workers: WorkerReadiness[] = matrix.workers.map((w) => {
    const gaps: WorkerGap[] = [];
    for (const key of requiredKeys) {
      const label = requirementLabel(key, matrix.columns);
      const cell = w.cells[key];
      if (!cell || cell.status === 'none') {
        gaps.push({ key, label, reason: 'missing', expiry: null });
        continue;
      }
      if (!cell.expiry) continue; // held with no expiry — counts as valid
      if (cell.expiry < today) {
        gaps.push({ key, label, reason: 'expired', expiry: cell.expiry });
      } else if (referenceIsJobStart && cell.expiry < referenceDate) {
        gaps.push({ key, label, reason: 'expires_before_start', expiry: cell.expiry });
      }
    }
    return { employeeId: w.employeeId, name: w.name, ready: gaps.length === 0, gaps };
  });

  return {
    workers,
    readyCount: workers.filter((w) => w.ready).length,
    total: workers.length,
    requiredKeys,
    referenceDate,
    referenceIsJobStart,
  };
}

/** One-line gap description — shared by the UI, PDF and nudge copy. */
export function gapSentence(gap: WorkerGap): string {
  if (gap.reason === 'missing') return `${gap.label} missing`;
  if (gap.reason === 'expired') return `${gap.label} expired ${fmt(gap.expiry)}`;
  return `${gap.label} expires ${fmt(gap.expiry)}, before job start`;
}

/* ────────────────────────────────────────────────────────
   Certificate register — the appendix auditors spot-check
   ──────────────────────────────────────────────────────── */

export interface RegisterRow {
  worker: string;
  /** Matrix column, e.g. "First Aid" */
  credential: string;
  /** The recorded credential name behind the cell */
  record: string;
  number: string | null;
  expiry: string | null;
  status: CellStatus;
}

/** Flatten held cells into worker → credential → number → expiry rows. Only
 *  what is actually recorded — a blank number stays honestly blank. */
export function buildCertificateRegister(matrix: CompetenceMatrix): RegisterRow[] {
  const rows: RegisterRow[] = [];
  for (const w of matrix.workers) {
    for (const col of matrix.columns) {
      const cell = w.cells[col.key];
      if (!cell || cell.status === 'none') continue;
      rows.push({
        worker: w.name,
        credential: col.label,
        record: cell.label || col.label,
        number: cell.certNumber,
        expiry: cell.expiry,
        status: cell.status,
      });
    }
  }
  return rows;
}

/** Items needing renewal for one worker — feeds the "nudge to renew" message. */
export function renewalItemsFor(worker: MatrixWorker, columns: MatrixColumn[]) {
  return columns
    .map((col) => ({ col, cell: worker.cells[col.key] }))
    .filter(({ cell }) => cell && (cell.status === 'expired' || cell.status === 'expiring'))
    .map(({ col, cell }) => ({
      column: col.label,
      label: cell.label || col.label,
      expiry: cell.expiry,
      status: cell.status as 'expired' | 'expiring',
      daysLeft: cell.daysLeft,
    }));
}

const fmt = (iso: string | null): string =>
  iso
    ? new Date(iso).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })
    : '';

/** CSV export — opens clean in Excel/Sheets for clients who ask for the raw
 *  grid. Includes the crew scope header when filtered to a job, and a
 *  certificate register section so auditors get the numbers too. */
export function buildCompetenceMatrixCsv(
  matrix: CompetenceMatrix,
  options: { scope?: MatrixScope | null } = {}
): string {
  const esc = (v: string) => `"${v.replace(/"/g, '""')}"`;
  const lines: string[] = [];

  lines.push(esc('Workforce competence matrix'));
  if (options.scope) {
    lines.push([esc('Job'), esc(options.scope.jobTitle)].join(','));
    if (options.scope.client) lines.push([esc('Client'), esc(options.scope.client)].join(','));
    if (options.scope.startDate) {
      lines.push([esc('Job start'), esc(fmt(options.scope.startDate))].join(','));
    }
  }
  lines.push([esc('Generated'), esc(fmt(matrix.generatedAt.slice(0, 10)))].join(','));
  lines.push([esc('Amber threshold'), esc(`Expires within ${matrix.horizonDays} days`)].join(','));
  lines.push('');

  lines.push(['Worker', 'Role', ...matrix.columns.map((c) => c.label)].map(esc).join(','));
  for (const w of matrix.workers) {
    lines.push(
      [
        esc(w.name),
        esc(w.role),
        ...matrix.columns.map((col) => {
          const cell = w.cells[col.key];
          if (!cell || cell.status === 'none') return esc('');
          if (!cell.expiry) return esc('Held (no expiry)');
          const label = cell.status === 'expired' ? 'EXPIRED ' : '';
          return esc(`${label}${fmt(cell.expiry)}`);
        }),
      ].join(',')
    );
  }

  // Certificate register — worker → credential → number → expiry
  const register = buildCertificateRegister(matrix);
  if (register.length > 0) {
    lines.push('');
    lines.push(esc('Certificate register'));
    lines.push(['Worker', 'Credential', 'Recorded as', 'Certificate number', 'Expiry'].map(esc).join(','));
    for (const r of register) {
      lines.push(
        [
          esc(r.worker),
          esc(r.credential),
          esc(r.record),
          esc(r.number ?? ''),
          esc(r.expiry ? fmt(r.expiry) : 'No expiry'),
        ].join(',')
      );
    }
  }

  return lines.join('\r\n');
}
