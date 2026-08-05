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
  | 'fire-alarm-modification'
  | 'ev-charging'
  | 'emergency-lighting'
  | 'testing-only'
  | 'solar-pv'
  | 'bess'
  | 'smoke-co-alarm'
  | 'lightning-protection'
  | 'g98-commissioning'
  | 'g99-commissioning';

const DUPLICABLE_TYPES: readonly string[] = [
  'eicr', 'eic', 'minor-works',
  'fire-alarm', 'fire-alarm-design', 'fire-alarm-commissioning',
  'fire-alarm-inspection', 'fire-alarm-modification',
  'ev-charging', 'emergency-lighting', 'testing-only', 'solar-pv', 'bess',
  'smoke-co-alarm', 'lightning-protection', 'g98-commissioning', 'g99-commissioning',
];

/** Quick check — is this a type the duplicate flow accepts? */
export const isDuplicable = (type: string): type is DuplicableReportType =>
  DUPLICABLE_TYPES.includes(type);

/**
 * ⚠️ Adding a type here is NOT a one-line change (ELE-1443).
 *
 * Duplication keeps everything it doesn't explicitly strip, so a cert type
 * whose per-installation identity fields aren't listed in
 * TYPE_SPECIFIC_FIELDS_TO_STRIP will carry the PREVIOUS job's data onto a new
 * certificate — a serial number or DNO reference reaching a real cert is a
 * compliance problem, not a cosmetic one. Audit the type's fields against live
 * data first, add its strip list below, then add it here.
 *
 * Still to audit: emergency-lighting, solar-pv, bess, smoke-co-alarm,
 * lightning-protection, g98/g99-commissioning, testing-only.
 * pat-testing stays excluded — its per-appliance data is inherently per-cert.
 */

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
  // Observations deliberately CARRY (ELE-1439): the primary duplicate
  // workflow is re-issuing a Satisfactory EICR for the SAME property after
  // remedial work — the codes/comments are the record of what was found and
  // rectified. They're editable/removable on the new cert. (Block-of-flats
  // users delete them in one tap per card.)
  // Who the inspection scope was agreed with — the previous client's name; must
  // not carry into a new cert (ELE-1160). extentOfInspection is deliberately
  // kept: it's generic BS 7671 boilerplate reused across the block-of-flats flow.
  'agreedWith',
  'limitationsOfInspection',
  'operationalLimitations',
  // Photos — uploaded to that specific cert
  'inspectionPhotos',
  'photos',
  // ELE-1443 — gaps found auditing live data. The specialist certs use their
  // own names for these, and a couple of snake_case variants exist on older
  // rows, so they were surviving the strip.
  'clientTelephone',
  'client_name',
  'installation_address',
  // Every role's sign-off date and signature. Universally per-job across the
  // specialist certs — signatures re-populate from the profile on load.
  'installerSignature',
  'testerSignature',
  'responsiblePersonSignature',
  'scheduleTestedBySignature',
  'installationDate',
  'installerDate',
  'testDate',
  'testerDate',
  'commissioningDate',
  'notificationDate',
  'clientDate',
  'inspectorDate',
  'responsiblePersonDate',
  'reportAuthorisedByDate',
  'scheduleTestedByDate',
  // Per-certificate / per-job references. `referenceNumber` is the cert's own
  // auto-generated ref (e.g. testing-only "TOC-MNUCVRJT"); the rest point at
  // this job's paperwork.
  'referenceNumber',
  'reportReference',
  'jobReference',
  'previousCertificateNumber',
  'eicReference',
  'linkedEicReference',
  'riskAssessmentReference',
  'fraReference',
  'drawingReference',
  'designReference',
  'designDocReference',
  'designCertReference',
  'causeEffectReference',
  // DNO paperwork raised for THIS installation (EV, BESS, solar, G98/G99).
  'dnoReference',
  'dnoNotificationDate',
  'applicationReference',
  'approvalReference',
  'dnoApplicationRef',
  'dnoApprovalRef',
  'dnoApprovalDate',
] as const;

/**
 * Serial numbers of equipment INSTALLED AT THE PROPERTY. Audited from the
 * specialist form field definitions, 2026-08-05.
 *
 * The distinction that matters: an instrument serial (`testInstrumentSerial`,
 * `mftSerial`, `loopSerial`, `rcdTesterSerial`, `luxMeterSerial`,
 * `instrumentSerial`, `continuityTesterSerial`, `insulationTesterSerial`)
 * belongs to the ENGINEER and must carry — retyping your own MFT serial on
 * every cert is exactly the tedium this feature exists to remove. A serial for
 * kit bolted to the customer's wall must never carry.
 */
const TYPE_SPECIFIC_FIELDS_TO_STRIP: Partial<Record<DuplicableReportType, readonly string[]>> = {
  // Audited against all 31 live EV certs. CARRY: chargerMake/Model/Type/
  // Connection, installerCompany/Scheme/SchemeNumber, ozevScheme,
  // buildingRegsViaScheme — the point of the feature for an installer fitting
  // the same charger 30–40 times a month.
  'ev-charging': ['chargerSerial', 'openPENSerial', 'ozevGrantRef'],
  // src/types/solar-pv.ts. CARRY: MCS installerNumber (the installer's own),
  // arrayNumber (spec).
  'solar-pv': ['meterSerial', 'equipmentSerial'],
  // src/types/bess.ts. `batterySerials` is a comma-separated list of the module
  // serials in that battery stack — the single worst field to carry.
  // CARRY: mcsInstallerNumber, mcsBatteryProductCert, mcsInverterProductCert,
  // manufacturerCommRef — all identify the PRODUCT, not the installation.
  bess: [
    'batterySerials',
    'inverterSerial',
    'commModuleSerial',
    'exportMeterSerial',
    'smartMeterSerial',
    'associatedPVRef',
    'buildingControlRef',
  ],
  // CARRY: luxMeterSerial + luxMeterCalibrationDate (the engineer's meter).
  'emergency-lighting': [],
  // CARRY: mftSerial, loopSerial, rcdTesterSerial, testInstrumentSerial,
  // calibrationDate, mftCalDate, dbReference ("Main CU" / "DB1" — generic
  // board naming, identical across a block of flats).
  'testing-only': [],
  // CARRY: registrationNumber ("Niceic domestic installer Epp22499" — the
  // installer's own), testInstrumentSerial, calibrationDate.
  'smoke-co-alarm': [],
  // CARRY: instrumentSerial (the engineer's test set).
  'lightning-protection': [],
  // src/types/g99-commissioning.ts. CARRY: typeTestCertRef — the equipment
  // TYPE-test certificate, a property of the product model.
  'g98-commissioning': ['equipmentSerial', 'exportMeterSerial', 'associatedCertRef', 'prevIndexRef'],
  'g99-commissioning': ['equipmentSerial', 'exportMeterSerial', 'associatedCertRef', 'prevIndexRef'],
};

/**
 * ⚠️ Known limitation — this strips TOP-LEVEL keys only.
 *
 * A cert that nests identity data (e.g. solar-pv's `MCSDetails.installationNumber`,
 * the MCS certificate number for that specific installation) will carry it if
 * the form stores it nested rather than flattened. Every field listed above was
 * verified as top-level against live rows or the type definitions; nested
 * shapes were not exhaustively audited because most specialist types have only
 * one or two live certs to check against. Worth revisiting once those types
 * have real volume.
 */

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
  // ELE-1443 — per-installation fields unique to this cert type
  for (const field of TYPE_SPECIFIC_FIELDS_TO_STRIP[reportType] ?? []) {
    delete cloned[field];
  }

  // 5) Set new cert number + provenance trail
  cloned.certificateNumber = newCertNumber;
  // Provenance — store the HUMAN-READABLE cert number (e.g. "EICR-2026-2680"),
  // not the row's `report_id` UUID (e.g. "EICR-1768653632981-0p28c6"). The
  // human number is what the inspector recognises and what's printed on the
  // PDF. Fall back through the available sources.
  const sourceRow = source as Record<string, unknown> & {
    certificate_number?: string;
    data?: { certificateNumber?: string };
  };
  cloned.duplicatedFrom =
    sourceRow.certificate_number ||
    sourceRow.data?.certificateNumber ||
    reportId;
  cloned.status = 'draft';

  return {
    newReportId: newCertNumber,
    data: cloned,
    sourceReportId: reportId,
  };
};
