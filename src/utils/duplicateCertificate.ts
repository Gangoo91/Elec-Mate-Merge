/**
 * Duplicate Certificate — ELE-881
 *
 * Loads a source report, strips identity-specific fields, generates a new
 * certificate number, and creates a new draft report ready for editing.
 *
 * Used for "block of apartments" workflow: same supply/board/circuits across
 * many units — engineer just changes client + address per copy.
 */
import { supabase } from '@/integrations/supabase/client';
import { generateCertificateNumber } from '@/utils/certificateNumbering';

/**
 * Cert types currently supported by the duplicate flow. Subset of the broader
 * report-type universe — only types where the spec carries over meaningfully.
 * (PAT testing's per-appliance data is per-cert, so excluded.)
 */
export type DuplicableReportType =
  | 'eicr'
  | 'eic'
  | 'minor-works'
  | 'fire-alarm'
  | 'fire-alarm-design'
  | 'fire-alarm-commissioning'
  | 'fire-alarm-inspection'
  | 'fire-alarm-modification';

/** Quick check — is this a type the duplicate flow accepts? */
export const isDuplicable = (type: string): type is DuplicableReportType =>
  ['eicr', 'eic', 'minor-works', 'fire-alarm', 'fire-alarm-design',
   'fire-alarm-commissioning', 'fire-alarm-inspection', 'fire-alarm-modification']
    .includes(type);

/**
 * Best-in-class threshold for the "this is a big cert, are you sure?"
 * confirmation dialog. EICRs with 20+ circuits represent meaningful data —
 * accidentally duplicating one and editing in place could lose work if the
 * user thought they were editing the source.
 */
export const LARGE_CERT_CIRCUIT_THRESHOLD = 20;

/**
 * Count circuits in a source row's data — used by the caller to decide
 * whether to surface a confirmation dialog before duplicating.
 */
export const countCircuits = (data: unknown): number => {
  if (!data || typeof data !== 'object') return 0;
  const d = data as Record<string, unknown>;
  const sot = Array.isArray(d.scheduleOfTests) ? d.scheduleOfTests.length : 0;
  const circuits = Array.isArray(d.circuits) ? d.circuits.length : 0;
  return Math.max(sot, circuits);
};

/**
 * Fields cleared on every duplicate — these are PER-CERT identity fields
 * that must NOT carry over to a new certificate. Anything not in this list
 * is treated as reusable spec / setup data and is preserved.
 */
const IDENTITY_FIELDS_TO_STRIP = [
  // Cert metadata
  'certificateNumber',
  'reportNumber',
  'pdfUrl',
  'pdf_url',
  'pdfDocumentId',
  'pdfGeneratedAt',
  // Client / installation identity
  'clientName',
  'clientAddress',
  'clientPhone',
  'clientEmail',
  'clientPostcode',
  'installationAddress',
  'installationPostcode',
  'occupier',
  'sameAsClientAddress',
  'customer_id',
  // Inspection dates / sign-off
  'inspectionDate',
  'nextInspectionDate',
  'workDate',
  'dateOfCompletion',
  'signatureDate',
  // Signatures (re-populated from inspector profile on load)
  'inspectorSignature',
  'designerSignature',
  'constructorSignature',
  'signature',
  // Acceptance / status
  'acceptanceStatus',
  'clientSignature',
  'clientSignatureDate',
  // Defects/observations — specific to that property
  'defectObservations',
  'observations',
  'limitationsOfInspection',
  'operationalLimitations',
  // Photos — uploaded to that specific cert
  'inspectionPhotos',
  'photos',
] as const;

/**
 * Top-level row metadata fields (not formData) that must be reset.
 */
const ROW_METADATA_TO_STRIP = [
  'id',
  'report_id',
  'pdf_url',
  'pdf_generated_at',
  'created_at',
  'updated_at',
  'completed_at',
  'sent_at',
  'pdf_history',
  'edit_version',
];

export interface DuplicateResult {
  /** New report ID (cert number) */
  newReportId: string;
  /** The stripped + reset formData for the new draft */
  data: Record<string, unknown>;
  /** Source cert id for the provenance banner */
  sourceReportId: string;
}

/**
 * Load a source report and produce a fresh draft payload.
 * Does NOT write to the database — caller is expected to navigate into the
 * cert form, which will auto-save via the existing useReportSync flow.
 */
export const duplicateCertificate = async (
  reportId: string,
  reportType: DuplicableReportType
): Promise<DuplicateResult> => {
  // 1) Load source
  const { data: source, error } = await supabase
    .from('reports')
    .select('*')
    .eq('report_id', reportId)
    .single();

  if (error || !source) {
    throw new Error(`Could not load source certificate: ${error?.message || 'not found'}`);
  }

  // 2) Generate new cert number
  const newCertNumber = await generateCertificateNumber(reportType);

  // 3) Deep clone the formData payload
  const sourceData = (source.data || {}) as Record<string, unknown>;
  const cloned: Record<string, unknown> =
    typeof structuredClone === 'function'
      ? structuredClone(sourceData)
      : JSON.parse(JSON.stringify(sourceData));

  // 4) Strip identity fields
  for (const field of IDENTITY_FIELDS_TO_STRIP) {
    delete cloned[field];
  }
  // Strip row-level metadata that may have been spread into formData
  for (const field of ROW_METADATA_TO_STRIP) {
    delete cloned[field];
  }

  // 5) Set new cert number + provenance trail
  cloned.certificateNumber = newCertNumber;
  cloned.duplicatedFrom = reportId;
  cloned.status = 'draft';

  return {
    newReportId: newCertNumber,
    data: cloned,
    sourceReportId: reportId,
  };
};
