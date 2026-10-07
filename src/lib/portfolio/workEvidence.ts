/**
 * Electrical-specific evidence (ELE-1906).
 *
 * An apprentice's strongest evidence is work the app already holds: a
 * certificate they completed (reports), the schedule of test results inside
 * it, or a calculation they ran (calculation_reports). This module turns one
 * of those into a portfolio-ready file and a list of suggested criteria:
 *
 *   listWorkSources()      what the learner has to choose from
 *   prepareWorkEvidence()  the readable file (a PDF snapshot for a certificate
 *                          or schedule, the calculation's own PDF for a calc),
 *                          uploaded to portfolio-evidence, plus suggestions
 *
 * Suggestions come from suggest_work_evidence_criteria(), which matches what
 * the work contains against the learner's REAL qualification criteria. They
 * are only suggestions: the capture sheet lists them and the learner taps the
 * ones the work really shows, which are then saved as learner claims. Nothing
 * here claims, submits or passes anything.
 *
 * Reads `reports` only. Never writes to a certificate.
 */
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import { supabase } from '@/integrations/supabase/client';
import { sha256OfBlob } from '@/lib/portfolio/contentHash';

export type WorkKind = 'certificate' | 'test_results' | 'calculation';

export interface WorkSource {
  kind: WorkKind;
  /** reports.id or calculation_reports.id */
  id: string;
  title: string;
  /** One line under the title: number, date, circuits. */
  meta: string;
  date: string | null;
  /** 'Completed', 'In progress' or 'Draft'. */
  status: string;
  /** Number of circuits with at least one result (certs and schedules). */
  circuitsTested?: number;
}

export interface WorkSuggestion {
  unitCode: string;
  unitTitle: string;
  acCode: string;
  acText: string;
  score: number;
  /** Plain-language reason, e.g. "Your schedule records insulation resistance and polarity." */
  reason: string;
  practical: boolean;
}

/** One more file to attach alongside the main one. */
export interface PreparedExtraFile {
  name: string;
  type: string;
  size: number;
  url: string;
  sha256: string | null;
  evidenceType: 'certificate' | 'test_result' | 'calculation' | 'photo' | 'document';
  blob: Blob;
}

/** The automatic BS 7671 check of a calculation (informs the assessor only). */
export interface CalcCheck {
  verdict: 'consistent' | 'query' | 'no_data';
  note: string;
  file: PreparedExtraFile | null;
}

export interface PreparedWorkEvidence {
  kind: WorkKind;
  sourceId: string;
  title: string;
  /** Description seeded into the capture sheet. The learner rewrites it. */
  summary: string;
  workDate: string | null;
  siteRef: string;
  file: {
    name: string;
    type: string;
    size: number;
    url: string;
    sha256: string | null;
    evidenceType: 'certificate' | 'test_result' | 'calculation';
  };
  /** The blob, so the capture sheet can show and keep it like any other file. */
  blob: Blob;
  suggestions: WorkSuggestion[];
  /** Further files: the full issued certificate, or the photos of a paper schedule. */
  extraFiles?: PreparedExtraFile[];
  /** Read from a photo of a paper schedule, values confirmed by the learner. */
  fromPaper?: boolean;
}

/* ─── Certificate types ─────────────────────────────────────────────── */

const CERT_LABEL: Record<string, string> = {
  eic: 'Electrical Installation Certificate',
  eicr: 'Electrical Installation Condition Report',
  'minor-works': 'Minor Electrical Installation Works Certificate',
  'testing-only': 'Schedule of Test Results',
  'ev-charging': 'EV Charging Installation Certificate',
  'pat-testing': 'Portable Appliance Test Record',
  'emergency-lighting': 'Emergency Lighting Certificate',
  'fire-alarm': 'Fire Alarm Certificate',
  'fire-alarm-inspection': 'Fire Alarm Inspection Report',
  'smoke-co-alarm': 'Smoke and CO Alarm Certificate',
};
const CERT_SHORT: Record<string, string> = {
  eic: 'EIC',
  eicr: 'EICR',
  'minor-works': 'Minor Works',
  'testing-only': 'Test results',
  'ev-charging': 'EV charging',
  'pat-testing': 'PAT',
  'emergency-lighting': 'Emergency lighting',
  'fire-alarm': 'Fire alarm',
  'fire-alarm-inspection': 'Fire alarm',
  'smoke-co-alarm': 'Smoke and CO alarms',
};
/** Types whose data carries a schedule of test results the snapshot can read. */
const SCHEDULE_TYPES = new Set(['eic', 'eicr', 'testing-only', 'ev-charging', 'minor-works']);
const CERT_TYPES = Object.keys(CERT_LABEL);

export const certLabel = (type: string) => CERT_LABEL[type] ?? 'Certificate';
export const certShort = (type: string) => CERT_SHORT[type] ?? 'Certificate';

type Json = Record<string, unknown>;
const s = (v: unknown): string => (typeof v === 'string' ? v.trim() : typeof v === 'number' ? String(v) : '');
/** A real reading: not blank, not N/A, not a dash. */
const has = (v: unknown) => {
  const t = s(v).toLowerCase();
  return t !== '' && t !== 'n/a' && t !== 'na' && t !== '-' && t !== 'lim' && t !== 'n/v';
};

interface ReportRow {
  id: string;
  report_type: string;
  report_id: string | null;
  certificate_number: string | null;
  status: string | null;
  inspection_date: string | null;
  installation_address: string | null;
  created_at: string;
  updated_at: string;
  data: Json | null;
}

interface CircuitRow {
  circuit: string;
  description: string;
  device: string;
  conductors: string;
  r1r2: string;
  r2: string;
  ring: string;
  irLL: string;
  irLE: string;
  polarity: string;
  zs: string;
  maxZs: string;
  rcd: string;
}

function circuitsOf(r: ReportRow): CircuitRow[] {
  const d = r.data ?? {};
  if (r.report_type === 'minor-works') {
    const ring = [d.ringR1, d.ringRn, d.ringR2].map(s).filter((x) => has(x)).join(' / ');
    const row: CircuitRow = {
      circuit: s(d.circuitDesignation) || '1',
      description: s(d.circuitDescription) || s(d.workDescription).slice(0, 60),
      device: [s(d.protectiveDeviceType), s(d.protectiveDeviceRating) && `${s(d.protectiveDeviceRating)} A`]
        .filter(Boolean)
        .join(' '),
      conductors: [s(d.liveConductorSize), s(d.cpcSize)].filter(Boolean).join(' / '),
      r1r2: s(d.continuityR1R2),
      r2: s(d.r2Continuity),
      ring,
      irLL: s(d.insulationLiveLive) || s(d.insulationLiveNeutral),
      irLE: s(d.insulationLiveEarth),
      polarity: s(d.polarity),
      zs: s(d.earthFaultLoopImpedance),
      maxZs: s(d.maxPermittedZs),
      rcd: s(d.rcdOneX),
    };
    return Object.values(row).slice(4).some(has) ? [row] : [];
  }
  const rows = Array.isArray(d.scheduleOfTests) ? (d.scheduleOfTests as Json[]) : [];
  return rows
    .filter((c) => !c.isDeviceRow)
    .map((c) => ({
      circuit: s(c.circuitDesignation) || s(c.circuitNumber),
      description: s(c.circuitDescription),
      device: [s(c.protectiveDeviceType) || s(c.bsStandard).split(' ')[0], s(c.protectiveDeviceCurve), s(c.protectiveDeviceRating) && `${s(c.protectiveDeviceRating).replace(/a$/i, '')} A`]
        .filter(Boolean)
        .join(' '),
      conductors: [s(c.liveSize) || s(c.cableSize), s(c.cpcSize)].filter(Boolean).join(' / '),
      r1r2: s(c.r1r2),
      r2: s(c.r2),
      ring: [c.ringR1, c.ringRn, c.ringR2].map(s).filter((x) => has(x)).join(' / '),
      irLL: s(c.insulationLiveNeutral),
      irLE: s(c.insulationLiveEarth) || s(c.insulationResistance),
      polarity: s(c.polarity),
      zs: s(c.zs),
      maxZs: s(c.maxZs),
      rcd: s(c.rcdOneX),
    }))
    .filter((c) => [c.r1r2, c.r2, c.ring, c.irLL, c.irLE, c.zs, c.rcd].some(has) || has(c.polarity));
}

/** Which tests the work actually records, as signal keys for the matcher. */
function testSignals(circuits: CircuitRow[]): string[] {
  const out = new Set<string>();
  for (const c of circuits) {
    if (has(c.r1r2) || has(c.r2) || has(c.ring)) out.add('continuity');
    if (has(c.irLE) || has(c.irLL)) out.add('insulation');
    if (has(c.polarity)) out.add('polarity');
    if (has(c.zs)) out.add('efli');
    if (has(c.rcd)) out.add('rcd');
  }
  return [...out];
}

const SIGNAL_WORDS: Record<string, string> = {
  continuity: 'continuity',
  insulation: 'insulation resistance',
  polarity: 'polarity',
  efli: 'earth fault loop impedance',
  rcd: 'RCD tests',
  pfc: 'prospective fault current',
  certification: 'the certificate',
  inspection: 'the inspection',
  test_results: 'recorded test results',
  periodic: 'a periodic inspection',
  commissioning: 'commissioning',
  cable_size: 'cable sizing',
  voltage_drop: 'voltage drop',
  max_demand: 'maximum demand',
  science: 'the electrical science behind it',
  protective_device: 'protective device selection',
  earthing: 'earthing',
  design: 'circuit design',
};

const joinWords = (words: string[]) =>
  words.length <= 1 ? (words[0] ?? '') : `${words.slice(0, -1).join(', ')} and ${words[words.length - 1]}`;

function reportSignals(r: ReportRow, kind: WorkKind): string[] {
  const d = r.data ?? {};
  const circuits = circuitsOf(r);
  const sig = new Set<string>(testSignals(circuits));
  sig.add('test_results');
  if (has(d.prospectiveFaultCurrent)) sig.add('pfc');
  if (kind === 'certificate') {
    sig.add('certification');
    if (r.report_type === 'eic' || r.report_type === 'eicr' || r.report_type === 'ev-charging') sig.add('inspection');
    if (r.report_type === 'eicr') sig.add('periodic');
    if (r.report_type === 'eic' || r.report_type === 'ev-charging') sig.add('commissioning');
  }
  return [...sig];
}

/** "PE1 2AB" style outward code only. Client addresses never leave the certificate. */
function areaOf(address: string | null | undefined): string {
  const m = /\b([A-Z]{1,2}[0-9][0-9A-Z]?)\s*[0-9][A-Z]{2}\b/i.exec(address ?? '');
  return m ? m[1].toUpperCase() : '';
}

const fmtDate = (iso: string | null | undefined) =>
  iso && !Number.isNaN(Date.parse(iso))
    ? new Date(iso).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })
    : '';

function workDateOf(r: ReportRow): string | null {
  const d = r.data ?? {};
  const cand = [
    r.inspection_date,
    s(d.inspectionDate),
    s(d.testDate),
    s(d.workDate),
    s(d.dateOfCompletion),
    s(d.installationDate),
    r.updated_at,
  ].find((x) => x && !Number.isNaN(Date.parse(x)));
  return cand ? new Date(cand).toISOString().slice(0, 10) : null;
}

const statusLabel = (st: string | null) =>
  st === 'completed' ? 'Completed' : st === 'in-progress' ? 'In progress' : 'Draft';

/* ─── Listing ───────────────────────────────────────────────────────── */

/**
 * Only the parts of `data` the list needs. A full certificate's data can carry
 * board photos and logos; sixty of them would be megabytes on site signal.
 */
const LIST_DATA_KEYS = [
  'scheduleOfTests',
  'inspectionDate',
  'testDate',
  'workDate',
  'dateOfCompletion',
  'installationDate',
  'continuityR1R2',
  'r2Continuity',
  'ringR1',
  'insulationLiveLive',
  'insulationLiveNeutral',
  'insulationLiveEarth',
  'polarity',
  'earthFaultLoopImpedance',
  'rcdOneX',
];

/** The learner's OWN work only: RLS also lets a QS read their team's reports. */
export async function listWorkSources(userId: string): Promise<{ certs: WorkSource[]; schedules: WorkSource[]; calcs: WorkSource[] }> {
  const dataCols = LIST_DATA_KEYS.map((k) => `d_${k}:data->${k}`).join(', ');
  const [rep, calc] = await Promise.all([
    supabase
      .from('reports')
      .select(`id, report_type, report_id, certificate_number, status, inspection_date, installation_address, created_at, updated_at, ${dataCols}`)
      .eq('user_id', userId)
      .is('deleted_at', null)
      .is('superseded_by', null)
      .in('report_type', CERT_TYPES)
      .order('updated_at', { ascending: false })
      .limit(60),
    supabase
      .from('calculation_reports')
      .select('id, title, subtitle, calculator_slug, created_at')
      .eq('user_id', userId)
      .order('created_at', { ascending: false })
      .limit(60),
  ]);
  const rows = ((rep.data ?? []) as unknown as Record<string, unknown>[])
    .map((row) => {
      const data: Json = {};
      for (const k of LIST_DATA_KEYS) if (row[`d_${k}`] != null) data[k] = row[`d_${k}`];
      return { ...row, data } as unknown as ReportRow;
    })
    .filter((r) => r.status !== 'auto-draft' || circuitsOf(r).length > 0);
  const certs: WorkSource[] = [];
  const schedules: WorkSource[] = [];
  for (const r of rows) {
    const number = r.certificate_number || r.report_id || '';
    const date = workDateOf(r);
    const circuits = SCHEDULE_TYPES.has(r.report_type) ? circuitsOf(r) : [];
    const area = areaOf(r.installation_address);
    const meta = [number, fmtDate(date), area].filter(Boolean).join(' · ');
    if (r.report_type !== 'testing-only') {
      certs.push({
        kind: 'certificate',
        id: r.id,
        title: certShort(r.report_type) === 'Certificate' ? certLabel(r.report_type) : `${certShort(r.report_type)} ${certificateNoun(r.report_type)}`,
        meta,
        date,
        status: statusLabel(r.status),
        circuitsTested: circuits.length,
      });
    }
    if (circuits.length > 0) {
      schedules.push({
        kind: 'test_results',
        id: r.id,
        title: `Test results, ${circuits.length} circuit${circuits.length === 1 ? '' : 's'}`,
        meta: [certShort(r.report_type), meta].filter(Boolean).join(' · '),
        date,
        status: statusLabel(r.status),
        circuitsTested: circuits.length,
      });
    }
  }
  const calcs: WorkSource[] = ((calc.data ?? []) as { id: string; title: string; subtitle: string | null; created_at: string }[]).map(
    (c) => ({
      kind: 'calculation' as const,
      id: c.id,
      title: c.title || 'Calculation',
      meta: [c.subtitle, fmtDate(c.created_at)].filter(Boolean).join(' · '),
      date: c.created_at.slice(0, 10),
      status: 'Completed',
    })
  );
  return { certs, schedules, calcs };
}

function certificateNoun(type: string) {
  return type === 'eicr' || type === 'fire-alarm-inspection' ? 'report' : type === 'pat-testing' ? 'record' : 'certificate';
}

/* ─── The readable snapshot (jsPDF) ─────────────────────────────────── */

/** Standard PDF fonts are Latin-1: swap the symbols the certs use for words. */
const pdfText = (t: string) =>
  t
    .replace(/Ω/g, ' ohm')
    .replace(/[–—]/g, '-')
    .replace(/[‘’]/g, "'")
    .replace(/[“”]/g, '"')
    .replace(/✓/g, 'Yes')
    .replace(/✗|✘/g, 'No')
    .replace(/[^\x20-\x7E\xA0-\xFF\n]/g, '');

const INK: [number, number, number] = [17, 24, 39];
const MUTED: [number, number, number] = [75, 85, 99];
const RULE: [number, number, number] = [209, 213, 219];

function buildSnapshotPdf(
  r: ReportRow,
  kind: WorkKind,
  learnerName: string,
  source: 'app' | 'paper' = 'app'
): Blob {
  const d = r.data ?? {};
  const circuits = circuitsOf(r);
  const doc = new jsPDF({ orientation: 'landscape', unit: 'mm', format: 'a4' });
  const W = doc.internal.pageSize.getWidth();
  const M = 12;
  const number = r.certificate_number || r.report_id || 'Not numbered';
  const heading =
    kind === 'test_results' ? 'Schedule of test results' : certLabel(r.report_type);
  const short = certShort(r.report_type);
  const ref = number.toUpperCase().startsWith(short.toUpperCase()) ? number : `${short} ${number}`;

  // Masthead
  doc.setTextColor(...MUTED);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(8);
  doc.text(
    pdfText(
      source === 'paper'
        ? 'PORTFOLIO EVIDENCE: MY PAPER SCHEDULE, READ FROM A PHOTO AND CHECKED BY ME'
        : 'PORTFOLIO EVIDENCE: SUMMARY OF MY OWN WORK'
    ),
    M,
    14
  );
  doc.setTextColor(...INK);
  doc.setFontSize(17);
  doc.text(pdfText(heading), M, 22);
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(9.5);
  doc.setTextColor(...MUTED);
  doc.text(
    pdfText(
      source === 'paper'
        ? `Paper schedule · prepared for the portfolio of ${learnerName || 'the learner'}`
        : `${ref} · ${statusLabel(r.status)} · prepared for the portfolio of ${learnerName || 'the learner'}`
    ),
    M,
    28
  );
  doc.setDrawColor(...RULE);
  doc.line(M, 31, W - M, 31);

  // Key facts, two columns of label/value
  const facts: [string, string][] = [
    ['Date of work', fmtDate(workDateOf(r))],
    ['Location', areaOf(r.installation_address) ? `${areaOf(r.installation_address)} area` : 'Not shown'],
    ['Earthing arrangement', s(d.earthingArrangement)],
    ['External loop impedance (Ze)', has(d.externalZe) ? `${s(d.externalZe)} ohm` : ''],
    ['Prospective fault current', has(d.prospectiveFaultCurrent) ? `${s(d.prospectiveFaultCurrent)} kA` : ''],
    ['Supply', [s(d.supplyType), has(d.supplyVoltage) ? `${s(d.supplyVoltage).replace(/v$/i, '')} V` : ''].filter(Boolean).join(', ')],
  ];
  if (r.report_type === 'eicr') {
    const obs = Array.isArray(d.defectObservations) ? (d.defectObservations as Json[]) : [];
    const count = (code: string) => obs.filter((o) => s(o.defectCode).toUpperCase() === code).length;
    facts.push(['Overall assessment', s(d.overallAssessment) ? s(d.overallAssessment).replace(/^./, (c) => c.toUpperCase()) : '']);
    facts.push(['Observations', obs.length ? `C1 ${count('C1')} · C2 ${count('C2')} · C3 ${count('C3')} · FI ${count('FI')}` : 'None recorded']);
  }
  const shown = facts.filter(([, v]) => v);
  let y = 38;
  const colW = (W - M * 2) / 3;
  shown.forEach(([label, value], i) => {
    const col = i % 3;
    const row = Math.floor(i / 3);
    const x = M + col * colW;
    const yy = y + row * 11;
    doc.setFontSize(7.5);
    doc.setTextColor(...MUTED);
    doc.text(pdfText(label.toUpperCase()), x, yy);
    doc.setFontSize(10);
    doc.setTextColor(...INK);
    doc.text(pdfText(value).slice(0, 60), x, yy + 4.5);
  });
  y += Math.ceil(shown.length / 3) * 11 + 2;

  const work = [s(d.extentOfInstallation), s(d.description), s(d.workDescription), s(d.extentOfInspection)]
    .filter(Boolean)
    .join('. ')
    .slice(0, 700);
  if (work && kind === 'certificate') {
    doc.setFontSize(7.5);
    doc.setTextColor(...MUTED);
    doc.text('THE WORK', M, y);
    doc.setFontSize(9.5);
    doc.setTextColor(...INK);
    const lines = doc.splitTextToSize(pdfText(work), W - M * 2) as string[];
    doc.text(lines.slice(0, 5), M, y + 4.5);
    y += 4.5 + Math.min(lines.length, 5) * 4.3 + 3;
  }

  // Schedule of test results
  doc.setFontSize(7.5);
  doc.setTextColor(...MUTED);
  doc.text(
    pdfText(`TEST RESULTS · ${circuits.length} CIRCUIT${circuits.length === 1 ? '' : 'S'}`),
    M,
    y + 2
  );
  autoTable(doc, {
    startY: y + 4,
    margin: { left: M, right: M, bottom: 16 },
    head: [
      [
        'Circuit',
        'Description',
        'Device',
        'Live / cpc (mm²)',
        'R1+R2 (ohm)',
        'R2 (ohm)',
        'Ring r1 / rn / r2',
        'IR L-N (Mohm)',
        'IR L-E (Mohm)',
        'Polarity',
        'Zs (ohm)',
        'Max Zs (ohm)',
        'RCD (ms)',
      ],
    ],
    body: circuits.length
      ? circuits.map((c) =>
          [c.circuit, c.description, c.device, c.conductors, c.r1r2, c.r2, c.ring, c.irLL, c.irLE, c.polarity, c.zs, c.maxZs, c.rcd].map(
            (v) => pdfText(v || '-')
          )
        )
      : [[{ content: 'No test results are recorded on this certificate yet.', colSpan: 13 }]],
    theme: 'grid',
    styles: { font: 'helvetica', fontSize: 7.6, cellPadding: 1.4, textColor: INK, lineColor: RULE, lineWidth: 0.15, overflow: 'linebreak' },
    headStyles: { fillColor: [243, 244, 246], textColor: INK, fontStyle: 'bold', fontSize: 7 },
    columnStyles: { 1: { cellWidth: 44 }, 2: { cellWidth: 24 } },
  });

  // Footer on every page
  const pages = doc.getNumberOfPages();
  const H = doc.internal.pageSize.getHeight();
  for (let p = 1; p <= pages; p += 1) {
    doc.setPage(p);
    doc.setDrawColor(...RULE);
    doc.line(M, H - 12, W - M, H - 12);
    doc.setFontSize(7.5);
    doc.setTextColor(...MUTED);
    doc.text(
      pdfText(
        source === 'paper'
          ? `Read from the attached photo on ${fmtDate(new Date().toISOString())} and checked by the learner against their paper schedule. The photo is attached so the assessor can compare.`
          : `Taken from ${ref} in Elec-Mate on ${fmtDate(new Date().toISOString())}. Client names and full addresses are left out. The issued certificate stays with the person who signed it.`
      ),
      M,
      H - 7.5
    );
    doc.text(`${p} / ${pages}`, W - M, H - 7.5, { align: 'right' });
  }
  return doc.output('blob');
}

/* ─── Upload + suggestions ──────────────────────────────────────────── */

async function uploadEvidence(userId: string, blob: Blob, name: string): Promise<string> {
  return (await uploadEvidenceAt(userId, blob, name)).url;
}

async function uploadEvidenceAt(userId: string, blob: Blob, name: string): Promise<{ url: string; path: string }> {
  const path = `${userId}/${Date.now()}-${Math.random().toString(36).slice(2, 8)}-${name}`;
  const { data, error } = await supabase.storage
    .from('portfolio-evidence')
    .upload(path, blob, { cacheControl: '3600', upsert: false, contentType: blob.type || 'application/pdf' });
  if (error || !data) throw new Error('Could not upload the file. Check your signal and try again.');
  return { url: supabase.storage.from('portfolio-evidence').getPublicUrl(data.path).data.publicUrl, path: data.path };
}

type Rpc = (fn: string, params: Record<string, unknown>) => Promise<{ data: unknown; error: { message: string } | null }>;
// Bound: a bare supabase.rpc loses `this` and throws "reading 'rest'".
const rpc = supabase.rpc.bind(supabase) as unknown as Rpc;

export async function suggestCriteria(signals: string[], noun = 'your work'): Promise<WorkSuggestion[]> {
  if (!signals.length) return [];
  const { data, error } = await rpc('suggest_work_evidence_criteria', { p_signals: signals, p_limit: 8 });
  if (error) throw new Error(error.message);
  return ((data ?? []) as {
    unit_code: string;
    unit_title: string | null;
    ac_code: string;
    ac_text: string;
    score: number;
    matched: string[] | null;
    practical: boolean;
  }[]).map((r) => ({
    unitCode: r.unit_code,
    unitTitle: r.unit_title ?? '',
    acCode: r.ac_code,
    acText: r.ac_text,
    score: r.score,
    practical: r.practical,
    reason: r.matched?.length ? `Matches what ${noun} shows: ${joinWords(r.matched)}.` : '',
  }));
}

const slug = (t: string) =>
  t
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '')
    .slice(0, 50) || 'evidence';

/** Signal keys for a calculation, read from its own words. */
export function calcSignals(text: string, calculatorSlug?: string | null): string[] {
  const t = `${calculatorSlug ?? ''} ${text}`.toLowerCase();
  const out = new Set<string>();
  if (/cable|csa|conductor size|current.carrying|derat/.test(t)) out.add('cable_size');
  if (/volt(age)?.?drop/.test(t)) out.add('voltage_drop');
  if (/maximum.demand|max.demand|diversity/.test(t)) out.add('max_demand');
  if (/ohm|power.factor|power.quality|resist|watt|kva|reactance|impedance triangle|series|parallel/.test(t)) out.add('science');
  if (/fault.current|pfc|psc|pscc|breaking capacity/.test(t)) out.add('pfc');
  if (/\bzs\b|loop.impedance|max(imum)?.zs|disconnection/.test(t)) out.add('efli');
  if (/adiabatic|earthing|cpc|protective conductor|bonding/.test(t)) out.add('earthing');
  if (/selectivity|discrimination|mcb|rcbo|fuse|protective device|overcurrent|disconnection/.test(t)) out.add('protective_device');
  if (/design current|\bib\b|circuit design|cable siz/.test(t)) out.add('design');
  if (/rcd|residual/.test(t)) out.add('rcd');
  return [...out];
}

/**
 * Build the evidence for one source: a readable file in the learner's
 * evidence storage plus suggested criteria. Throws with a plain message.
 */
export async function prepareWorkEvidence(
  kind: WorkKind,
  id: string,
  learner: { userId: string; name: string },
  opts: {
    /**
     * Also attach the full issued certificate PDF. It carries the client's
     * name and address and the evidence bucket is public, so the picker
     * defaults this OFF and warns before it is turned on.
     */
    includeFullCertificate?: boolean;
  } = {}
): Promise<PreparedWorkEvidence> {
  if (kind === 'calculation') {
    const { data: row, error } = await supabase
      .from('calculation_reports')
      .select('id, title, subtitle, calculator_slug, storage_path, payload, created_at')
      .eq('id', id)
      .eq('user_id', learner.userId)
      .maybeSingle();
    if (error || !row) throw new Error('That calculation could not be found.');
    const r = row as {
      id: string;
      title: string;
      subtitle: string | null;
      calculator_slug: string | null;
      storage_path: string;
      payload: { meta?: { standard?: string; subtitle?: string }; headline?: { label?: string; value?: string; unit?: string }[]; sections?: { heading?: string; rows?: { label?: string }[] }[] } | null;
      created_at: string;
    };
    const signed = await supabase.storage.from('calculation-reports').createSignedUrl(r.storage_path, 300);
    if (signed.error || !signed.data?.signedUrl) throw new Error('The calculation PDF could not be opened.');
    const res = await fetch(signed.data.signedUrl);
    if (!res.ok) throw new Error('The calculation PDF could not be downloaded.');
    const blob = new Blob([await res.arrayBuffer()], { type: 'application/pdf' });
    const name = `${slug(r.title)}.pdf`;
    const [url, sha256] = await Promise.all([uploadEvidence(learner.userId, blob, name), sha256OfBlob(blob)]);
    const headline = (r.payload?.headline ?? [])
      .map((h) => [h.label, [h.value, h.unit].filter(Boolean).join(' ')].filter(Boolean).join(': '))
      .filter(Boolean);
    const rowWords = (r.payload?.sections ?? []).flatMap((sec) => [sec.heading ?? '', ...(sec.rows ?? []).map((x) => x.label ?? '')]);
    const text = [r.title, r.subtitle, r.payload?.meta?.standard, ...headline, ...rowWords].filter(Boolean).join(' ');
    const signals = calcSignals(text, r.calculator_slug);
    const suggestions = await suggestCriteria(signals, 'your calculation');
    return {
      kind,
      sourceId: r.id,
      title: `${r.title} calculation`,
      summary: [
        `I worked out a ${r.title.toLowerCase()} calculation${r.subtitle ? ` for ${r.subtitle}` : ''}.`,
        headline.length ? `Result: ${headline.join('; ')}.` : '',
        r.payload?.meta?.standard ? `Based on ${r.payload.meta.standard}.` : '',
      ]
        .filter(Boolean)
        .join(' '),
      workDate: r.created_at.slice(0, 10),
      siteRef: '',
      file: { name, type: 'application/pdf', size: blob.size, url, sha256, evidenceType: 'calculation' },
      blob,
      suggestions,
    };
  }

  const { data, error } = await supabase
    .from('reports')
    .select('id, report_type, report_id, certificate_number, status, inspection_date, installation_address, created_at, updated_at, data, pdf_url')
    .eq('id', id)
    .eq('user_id', learner.userId)
    .maybeSingle();
  if (error || !data) throw new Error('That certificate could not be found.');
  const r = data as unknown as ReportRow & { pdf_url: string | null };
  const number = r.certificate_number || r.report_id || '';

  // The full issued certificate, only when asked for (client details inside).
  let fullCert: PreparedExtraFile | null = null;
  if (kind === 'certificate' && opts.includeFullCertificate) {
    if (r.status !== 'completed' || !r.pdf_url) {
      throw new Error(
        'This certificate has no issued PDF yet. Finish it and make the PDF first, or attach the summary only.'
      );
    }
    const res = await fetch(r.pdf_url).catch(() => null);
    if (!res?.ok) throw new Error('The issued certificate PDF could not be downloaded. Try again.');
    const certBlob = new Blob([await res.arrayBuffer()], { type: 'application/pdf' });
    const certName = `${slug(`${number || certShort(r.report_type)}-full-certificate`)}.pdf`;
    const [certUrl, certSha] = await Promise.all([
      uploadEvidence(learner.userId, certBlob, certName),
      sha256OfBlob(certBlob),
    ]);
    fullCert = {
      name: certName,
      type: 'application/pdf',
      size: certBlob.size,
      url: certUrl,
      sha256: certSha,
      evidenceType: 'certificate',
      blob: certBlob,
    };
  }

  const blob = buildSnapshotPdf(r, kind, learner.name);
  const name = `${slug(`${number || certShort(r.report_type)}-${kind === 'test_results' ? 'test-results' : 'summary'}`)}.pdf`;
  const [url, sha256] = await Promise.all([uploadEvidence(learner.userId, blob, name), sha256OfBlob(blob)]);
  const signals = reportSignals(r, kind);
  const suggestions = await suggestCriteria(signals, kind === 'test_results' ? 'your test results' : 'your certificate');
  const circuits = circuitsOf(r);
  const tests = testSignals(circuits).map((k) => SIGNAL_WORDS[k]);
  const label = certLabel(r.report_type);
  return {
    kind,
    sourceId: r.id,
    title:
      kind === 'test_results'
        ? `Test results for ${circuits.length} circuit${circuits.length === 1 ? '' : 's'} (${certShort(r.report_type)} ${number})`.trim()
        : `${label} ${number}`.trim(),
    summary: [
      kind === 'test_results'
        ? `I tested ${circuits.length} circuit${circuits.length === 1 ? '' : 's'} and recorded the results on ${label.toLowerCase().startsWith('schedule') ? 'a schedule of test results' : `the ${label}`}.`
        : `I worked on the ${label}${number ? ` ${number}` : ''}${circuits.length ? `, which records test results for ${circuits.length} circuit${circuits.length === 1 ? '' : 's'}` : ''}.`,
      tests.length ? `The tests cover ${joinWords(tests)}.` : '',
    ]
      .filter(Boolean)
      .join(' '),
    workDate: workDateOf(r),
    siteRef: number,
    file: {
      name,
      type: 'application/pdf',
      size: blob.size,
      url,
      sha256,
      evidenceType: kind === 'test_results' ? 'test_result' : 'certificate',
    },
    blob,
    suggestions,
    extraFiles: fullCert ? [fullCert] : undefined,
  };
}

/* ─── Photo of a paper schedule (read by AI, confirmed by the learner) ── */

/** One circuit row as read from the photo (keys match scheduleOfTests). */
export type PaperCircuit = Record<
  | 'circuitNumber'
  | 'circuitDescription'
  | 'bsStandard'
  | 'protectiveDeviceCurve'
  | 'protectiveDeviceRating'
  | 'liveSize'
  | 'cpcSize'
  | 'ringR1'
  | 'ringRn'
  | 'ringR2'
  | 'r1r2'
  | 'r2'
  | 'insulationLiveNeutral'
  | 'insulationLiveEarth'
  | 'polarity'
  | 'zs'
  | 'maxZs'
  | 'rcdOneX',
  string
> & { unclear: string[] };

export interface PaperScheduleRead {
  found: boolean;
  circuits: PaperCircuit[];
  rowsSeen: number;
  truncated: boolean;
  unclearCount: number;
}

/** Upload the photos to the learner's own evidence folder and read them. */
export async function readPaperSchedule(
  userId: string,
  photos: Blob[]
): Promise<{ read: PaperScheduleRead; photos: PreparedExtraFile[] }> {
  const uploaded = await Promise.all(
    photos.map(async (b, i) => {
      const ext = b.type === 'image/png' ? 'png' : b.type === 'application/pdf' ? 'pdf' : 'jpg';
      const name = `paper-schedule-${i + 1}.${ext}`;
      const [{ url, path }, sha256] = await Promise.all([uploadEvidenceAt(userId, b, name), sha256OfBlob(b)]);
      return {
        path,
        file: {
          name,
          type: b.type || 'image/jpeg',
          size: b.size,
          url,
          sha256,
          evidenceType: 'photo' as const,
          blob: b,
        },
      };
    })
  );
  const { data, error } = await supabase.functions.invoke('read-paper-test-schedule', {
    body: { paths: uploaded.map((u) => u.path) },
  });
  const res = (data ?? {}) as Partial<PaperScheduleRead> & { error?: string; success?: boolean };
  if (error || !res.success) {
    let msg = res.error;
    try {
      const ctx = (error as { context?: Response } | null)?.context;
      if (!msg && ctx) msg = ((await ctx.json()) as { error?: string }).error;
    } catch {
      /* default below */
    }
    throw new Error(msg || 'Could not read that photo. Try a clearer, flatter photo in good light.');
  }
  return {
    read: {
      found: !!res.found,
      circuits: (res.circuits ?? []) as PaperCircuit[],
      rowsSeen: Number(res.rowsSeen ?? 0),
      truncated: !!res.truncated,
      unclearCount: Number(res.unclearCount ?? 0),
    },
    photos: uploaded.map((u) => u.file),
  };
}

/**
 * Turn CONFIRMED paper-schedule readings into evidence: the same PDF summary
 * as a schedule done in Elec-Mate, the photos alongside it, and suggested
 * criteria. Nothing is claimed or passed here.
 */
export async function preparePaperSchedule(
  circuits: PaperCircuit[],
  photos: PreparedExtraFile[],
  learner: { userId: string; name: string },
  workDate: string | null
): Promise<PreparedWorkEvidence> {
  const nowIso = new Date().toISOString();
  const r: ReportRow = {
    id: 'paper',
    report_type: 'testing-only',
    report_id: null,
    certificate_number: null,
    status: 'completed',
    inspection_date: workDate,
    installation_address: null,
    created_at: nowIso,
    updated_at: nowIso,
    data: {
      scheduleOfTests: circuits.map(({ unclear: _u, ...c }) => ({ ...c, protectiveDeviceType: '' })),
    },
  };
  const rows = circuitsOf(r);
  if (!rows.length) throw new Error('No readings to use. Add at least one test result.');
  const blob = buildSnapshotPdf(r, 'test_results', learner.name, 'paper');
  const name = 'paper-schedule-test-results.pdf';
  const [url, sha256] = await Promise.all([uploadEvidence(learner.userId, blob, name), sha256OfBlob(blob)]);
  const suggestions = await suggestCriteria(testSignals(rows).concat('test_results'), 'your test results');
  const tests = testSignals(rows).map((k) => SIGNAL_WORDS[k]);
  return {
    kind: 'test_results',
    sourceId: 'paper',
    title: `Test results for ${rows.length} circuit${rows.length === 1 ? '' : 's'} (paper schedule)`,
    summary: [
      `I tested ${rows.length} circuit${rows.length === 1 ? '' : 's'} and recorded the results on a paper schedule of test results.`,
      tests.length ? `The tests cover ${joinWords(tests)}.` : '',
    ]
      .filter(Boolean)
      .join(' '),
    workDate,
    siteRef: '',
    file: { name, type: 'application/pdf', size: blob.size, url, sha256, evidenceType: 'test_result' },
    blob,
    suggestions,
    extraFiles: photos,
    fromPaper: true,
  };
}

/* ─── Calculation check against the BS 7671 RAG (informs, decides nothing) ── */

function buildCheckPdf(title: string, note: string, refs: { ref: string; page: number | null }[]): Blob {
  const doc = new jsPDF({ unit: 'mm', format: 'a4' });
  const M = 16;
  const W = doc.internal.pageSize.getWidth();
  doc.setTextColor(...MUTED);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(8);
  doc.text('AUTOMATIC CHECK FOR THE ASSESSOR', M, 18);
  doc.setTextColor(...INK);
  doc.setFontSize(15);
  doc.text(pdfText(`${title}: checked against BS 7671`), M, 27);
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(10.5);
  const lines = doc.splitTextToSize(pdfText(note), W - M * 2) as string[];
  doc.text(lines, M, 38);
  let y = 38 + lines.length * 5 + 6;
  if (refs.length) {
    doc.setFontSize(8);
    doc.setTextColor(...MUTED);
    doc.text('CHECKED AGAINST', M, y);
    doc.setFontSize(10);
    doc.setTextColor(...INK);
    refs.forEach((r, i) => doc.text(pdfText(`${r.ref}${r.page ? `, page ${r.page}` : ''}`), M, y + 5 + i * 5));
    y += 5 + refs.length * 5 + 4;
  }
  doc.setFontSize(8.5);
  doc.setTextColor(...MUTED);
  const foot = doc.splitTextToSize(
    pdfText(
      `Made by Elec-Mate on ${fmtDate(new Date().toISOString())} from our copy of BS 7671, the On-Site Guide and Guidance Note 3 only. It does not pass, fail or claim anything. The assessor decides.`
    ),
    W - M * 2
  ) as string[];
  doc.text(foot, M, y + 4);
  return doc.output('blob');
}

/**
 * Check a calculation that has become evidence against our regulations data
 * (check-calculation-evidence: bs7671_facets RAG only). Returns null when the
 * check could not run; the evidence is fine without it.
 */
export async function checkCalculation(
  calculationId: string,
  title: string,
  userId: string
): Promise<CalcCheck | null> {
  const { data, error } = await supabase.functions.invoke('check-calculation-evidence', {
    body: { calculation_id: calculationId },
  });
  const res = (data ?? {}) as {
    success?: boolean;
    verdict?: CalcCheck['verdict'];
    note?: string;
    refs?: { ref: string; page: number | null }[];
  };
  if (error || !res.success || !res.note || !res.verdict) return null;
  let file: PreparedExtraFile | null = null;
  try {
    const blob = buildCheckPdf(title, res.note, res.refs ?? []);
    const name = `${slug(title)}-bs7671-check.pdf`;
    const [url, sha256] = await Promise.all([uploadEvidence(userId, blob, name), sha256OfBlob(blob)]);
    file = { name, type: 'application/pdf', size: blob.size, url, sha256, evidenceType: 'document', blob };
  } catch {
    file = null;
  }
  return { verdict: res.verdict, note: res.note, file };
}
