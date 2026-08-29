/**
 * Client-side labels for the certificate import flow (ELE-1368).
 *
 * ⚠️ The authority for WHICH fields exist is the edge function's schema
 * (`supabase/functions/_shared/cert-import-schemas.ts`) — it is what the model
 * is actually asked to fill, and it runs in Deno where the client cannot import
 * from it. This file only names them for the review screen.
 *
 * The review UI falls back to the raw key when a label is missing
 * (`IMPORT_FIELD_LABEL[key] ?? key`), so a field added on the edge side shows
 * up looking unpolished rather than vanishing. That is the intended failure
 * mode: a missing label is a cosmetic bug, a missing field is a lost value.
 */

export type CertImportType = 'eicr' | 'eic' | 'minor-works';

export const CERT_IMPORT_OPTIONS: {
  value: CertImportType;
  title: string;
  subtitle: string;
}[] = [
  {
    value: 'eicr',
    title: 'EICR',
    subtitle: 'Electrical Installation Condition Report — an inspection of an existing installation',
  },
  {
    value: 'eic',
    title: 'EIC',
    subtitle: 'Electrical Installation Certificate — new work, an addition or an alteration',
  },
  {
    value: 'minor-works',
    title: 'Minor Works',
    subtitle: 'Minor Electrical Installation Works Certificate — work not extending to a new circuit',
  },
];

export const IMPORT_FIELD_LABEL: Record<string, string> = {
  /* Identity */
  certificateNumber: 'Reference on the original',
  clientName: 'Client',
  clientAddress: 'Client address',
  installationAddress: 'Installation address',
  occupier: 'Occupier',

  /* Supply */
  earthingArrangement: 'Earthing arrangement',
  nominalVoltage: 'Nominal voltage (V)',
  nominalFrequency: 'Frequency (Hz)',
  ze: 'Ze (Ω)',
  prospectiveFaultCurrent: 'Ipf (kA)',
  mainSwitchRating: 'Main switch rating (A)',
  mainSwitchLocation: 'Main switch location',
  numberOfPhases: 'Phases',

  /* EICR */
  inspectionDate: 'Date of inspection',
  nextInspectionDate: 'Next inspection due',
  purposeOfReport: 'Purpose of the report',
  extentOfInstallation: 'Extent covered',
  limitations: 'Agreed limitations',
  overallAssessment: 'Overall assessment',
  estimatedAge: 'Estimated age',
  evidenceOfAlterations: 'Evidence of alterations',

  /* EIC */
  descriptionOfWork: 'Description of the work',
  departures: 'Departures from BS 7671',
  designerName: 'Designer',
  constructorName: 'Constructor',
  testerName: 'Inspector and tester',

  /* Minor works */
  workDate: 'Date of the work',
  circuitDescription: 'Circuit altered or extended',
  protectiveDeviceType: 'Protective device',
  earthFaultLoopImpedance: 'Zs (Ω)',
  insulationResistance: 'Insulation resistance (MΩ)',
  rcdOperatingTime: 'RCD operating time (ms)',
  comments: 'Comments',

  /* Signatory */
  inspectorName: 'Signed by',
  companyName: 'Contractor',
  companyAddress: 'Contractor address',
  registrationScheme: 'Registration body',
  registrationNumber: 'Registration number',
};
