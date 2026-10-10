/**
 * Who and where a certificate is for, when it was started from a job.
 *
 * The job page and the diary's event sheet both send
 * `/electrician/inspection-testing?projectId=…&clientName=…&address=…`
 * (it was `/new`, the old type picker, retired 4 Oct 2026 — that route now
 * redirects here with the query intact).
 * Until ELE-1755 nothing read those three parameters — the type picker
 * dropped them on the way to the form, and no form looked for them — so
 * "customer and address prefilled" was a URL and nothing more.
 *
 * Read from the live URL at the moment a form builds its defaults, never
 * cached at module load: the same form component serves a resumed draft
 * later in the session, and a stale prefill would land on the wrong cert.
 */
export interface CertificatePrefill {
  projectId: string | null;
  clientName: string;
  address: string;
}

const KEYS = ['projectId', 'clientName', 'address'] as const;

export function readCertificatePrefill(): CertificatePrefill | null {
  if (typeof window === 'undefined') return null;
  const params = new URLSearchParams(window.location.search);
  const clientName = (params.get('clientName') ?? '').trim();
  const address = (params.get('address') ?? '').trim();
  const projectId = (params.get('projectId') ?? '').trim() || null;
  if (!clientName && !address && !projectId) return null;
  return { projectId, clientName, address };
}

/**
 * The same three parameters as a query string (no leading `?` or `&`), so
 * the type picker can carry them on to whichever form it opens.
 */
export function certificatePrefillQuery(): string {
  if (typeof window === 'undefined') return '';
  const from = new URLSearchParams(window.location.search);
  const out = new URLSearchParams();
  for (const k of KEYS) {
    const v = from.get(k);
    if (v) out.set(k, v);
  }
  return out.toString();
}

/**
 * `href` with the prefill carried on, when the current URL has one. Used by
 * every "start a new certificate" link in the Inspection & Testing screens so
 * a cert started from a job or booking arrives with who and where filled in.
 */
export function withCertificatePrefill(href: string): string {
  const prefill = certificatePrefillQuery();
  if (!prefill) return href;
  return `${href}${href.includes('?') ? '&' : '?'}${prefill}`;
}

/* ── Gap #3 (ELE-2068): circuits from the job's design, and the way back ── */

const CIRCUITS_PREFIX = 'elecmate:cert-prefill-circuits:';

/** A circuit as the office's circuit design keeps it (get_design_detail). */
export interface DesignCircuit {
  circuitNumber?: number | string;
  name?: string;
  loadType?: string;
  phases?: number;
  cableSize?: number | string;
  cpcSize?: number | string;
  installationMethod?: string;
  rcdProtected?: boolean;
  protectionDevice?: { type?: string; curve?: string; rating?: number | string };
  calculations?: { zs?: number | string; maxZs?: number | string };
  expectedTests?: { zs?: { expected?: number; maxPermitted?: number }; r1r2?: { at20C?: number } };
}

/**
 * The EIC schedule of tests rows for a design's circuits: the same fields the
 * EIC form fills when it opens a Circuit Designer design, readings left blank
 * for site.
 */
export function designCircuitsToEicSchedule(circuits: DesignCircuit[]): Record<string, unknown>[] {
  const s = (v: unknown) => (v == null ? '' : String(v));
  return circuits.map((c, idx) => ({
    id: `job-design-${Date.now()}-${idx + 1}`,
    circuitNumber: s(c.circuitNumber) || String(idx + 1),
    circuitDesignation: `C${idx + 1}`,
    circuitDescription: c.name || '',
    circuitType: c.loadType || '',
    phaseType: c.phases === 3 ? '3P' : '1P',
    referenceMethod: c.installationMethod || '',
    pointsServed: '',
    liveSize: s(c.cableSize),
    cpcSize: s(c.cpcSize),
    bsStandard: 'BS EN 60898',
    protectiveDeviceType: c.protectionDevice?.type || 'MCB',
    protectiveDeviceCurve: c.protectionDevice?.curve || 'B',
    protectiveDeviceRating: s(c.protectionDevice?.rating),
    protectiveDeviceKaRating: '6',
    expectedR1R2: s(c.expectedTests?.r1r2?.at20C),
    expectedZs: s(c.expectedTests?.zs?.expected ?? c.calculations?.zs),
    expectedMaxZs: s(c.expectedTests?.zs?.maxPermitted ?? c.calculations?.maxZs),
    r1r2: '',
    zs: '',
    maxZs: s(c.expectedTests?.zs?.maxPermitted ?? c.calculations?.maxZs),
    insulationTestVoltage: '500V',
    insulationLiveNeutral: '',
    insulationLiveEarth: '',
    polarity: '',
    rcdRating: c.rcdProtected ? '30mA' : '',
    rcdType: '',
    rcdOneX: '',
    rcdFiveX: '',
    pfc: '',
    functionalTesting: '',
    autoFilled: true,
    fromDesigner: true,
    notes: 'Pre-filled from the job design. Verify on site.',
  }));
}

/** Keep circuits for the form to pick up (works with no signal). Returns the URL key. */
export function stashCertificateCircuits(rows: Record<string, unknown>[]): string | null {
  if (!rows.length || typeof window === 'undefined') return null;
  const key = Math.random().toString(36).slice(2, 10);
  try {
    window.sessionStorage.setItem(CIRCUITS_PREFIX + key, JSON.stringify(rows));
    return key;
  } catch {
    return null;
  }
}

/**
 * Circuits handed over by "Start a certificate" (`?prefillCircuits=<key>`), else null.
 * Typed loose on purpose: the forms' schedule rows are untyped (`any[]`).
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function readCertificatePrefillCircuits(): any[] | null {
  if (typeof window === 'undefined') return null;
  const key = new URLSearchParams(window.location.search).get('prefillCircuits');
  if (!key || !/^[a-z0-9]{4,16}$/.test(key)) return null;
  try {
    const raw = window.sessionStorage.getItem(CIRCUITS_PREFIX + key);
    const rows = raw ? (JSON.parse(raw) as unknown) : null;
    return Array.isArray(rows) && rows.length ? rows : null;
  } catch {
    return null;
  }
}

/**
 * Where the certificate's Back goes when it was started from a job
 * (`?returnTo=`). Only a Worker Tools path, never anywhere else.
 */
export function readCertificateReturnTo(search?: string): string | null {
  if (typeof window === 'undefined' && search == null) return null;
  const raw = new URLSearchParams(search ?? window.location.search).get('returnTo');
  if (!raw) return null;
  return /^\/electrician\/worker-tools\/[a-z0-9/_-]*(\?[\w=&%.-]*)?$/i.test(raw) ? raw : null;
}
