/**
 * Formats Isolation Certificate form data into PDF Monkey payload.
 */
import { TRANSPARENT_PIXEL } from '@/utils/resolveSchemeLogo';
import { brandingFromCompanyProfile } from '@/utils/certBranding';
import { coverPayloadKeys } from '@/utils/certCoverPayload';

interface IsolationFormData {
  referenceNumber: string;
  date: string;
  time: string;
  contractorName: string;
  contractorCompany: string;
  contractorPhone: string;
  contractorEmail: string;
  registrationScheme: string;
  registrationNumber: string;
  siteName: string;
  siteAddress: string;
  siteContactName: string;
  siteContactPhone: string;
  equipmentDescription: string;
  circuitReference: string;
  locationWithinInstallation: string;
  distributionBoardRef: string;
  isolationPoints: string;
  methodMcbOff: boolean;
  methodFuseRemoved: boolean;
  methodIsolatorLocked: boolean;
  methodSupplyDisconnected: boolean;
  methodOther: boolean;
  methodOtherDescription: string;
  lockTagNumber: string;
  warningNoticesPosted: boolean;
  purposeOfWork: string;
  affectedFireAlarm: boolean;
  affectedEmergencyLighting: boolean;
  affectedSecurity: boolean;
  affectedIT: boolean;
  affectedLifts: boolean;
  affectedOther: boolean;
  affectedOtherDescription: string;
  testerMake: string;
  testerModel: string;
  testerSerialNumber: string;
  provingUnitMake: string;
  provingUnitModel: string;
  proveTestProveConfirmed: boolean;
  confirmedDead: boolean;
  dateIsolated: string;
  timeIsolated: string;
  personIsolatingName: string;
  personIsolatingSignature: string;
  personReceivingName: string;
  personReceivingPosition: string;
  personReceivingSignature: string;
  dateDeisolated: string;
  timeDeisolated: string;
  workCompleted: boolean;
  allPersonsClear: boolean;
  personDeisolatingName: string;
  personDeisolatingSignature: string;
  personAuthorisingName: string;
  personAuthorisingSignature: string;
  photos: string[];
  notes: string;
}

interface CompanyInfo {
  company_name?: string;
  company_address?: string;
  company_phone?: string;
  company_email?: string;
  company_tagline?: string;
  registration_scheme?: string;
  registration_number?: string;
  registration_scheme_logo?: string;
  // The real `company_profiles` logo columns. This interface used to declare a
  // `company_logo` that does not exist as a column while the body below read
  // `logo_data_url` / `logo_url`, which are the ones that do — so the declared
  // shape and the used shape had drifted apart.
  logo_data_url?: string;
  logo_url?: string;
  // Preferred over `registration_scheme_logo`: this is what SchemeLogoPicker
  // writes, and reading only the latter meant an electrician who picked their
  // scheme in Settings still got no logo on an isolation certificate.
  scheme_logo_data_url?: string;
}

function formatDateUK(dateStr: string): string {
  if (!dateStr) return '';
  try {
    const d = new Date(dateStr);
    if (isNaN(d.getTime())) return dateStr;
    return d.toLocaleDateString('en-GB', { day: '2-digit', month: '2-digit', year: 'numeric' });
  } catch {
    return dateStr;
  }
}

export function formatIsolationCertPayload(
  data: IsolationFormData,
  company: CompanyInfo = {}
): Record<string, unknown> {
  return {
    reference_number: data.referenceNumber,
    date: formatDateUK(data.date),
    time: data.time,

    contractor_name: data.contractorName,
    contractor_company: data.contractorCompany,
    contractor_phone: data.contractorPhone,
    contractor_email: data.contractorEmail,
    registration_scheme: data.registrationScheme || company.registration_scheme || '',
    registration_number: data.registrationNumber || company.registration_number || '',

    site_name: data.siteName,
    site_address: data.siteAddress,
    site_contact_name: data.siteContactName,
    site_contact_phone: data.siteContactPhone,

    equipment_description: data.equipmentDescription,
    circuit_reference: data.circuitReference,
    location_within_installation: data.locationWithinInstallation,
    distribution_board_ref: data.distributionBoardRef,

    isolation_points: data.isolationPoints,
    method_mcb_off: data.methodMcbOff,
    method_fuse_removed: data.methodFuseRemoved,
    method_isolator_locked: data.methodIsolatorLocked,
    method_supply_disconnected: data.methodSupplyDisconnected,
    method_other: data.methodOther,
    method_other_description: data.methodOtherDescription,
    lock_tag_number: data.lockTagNumber,
    warning_notices_posted: data.warningNoticesPosted,

    purpose_of_work: data.purposeOfWork,

    affected_fire_alarm: data.affectedFireAlarm,
    affected_emergency_lighting: data.affectedEmergencyLighting,
    affected_security: data.affectedSecurity,
    affected_it: data.affectedIT,
    affected_lifts: data.affectedLifts,
    affected_other: data.affectedOther,
    affected_other_description: data.affectedOtherDescription,

    tester_make: data.testerMake,
    tester_model: data.testerModel,
    tester_serial_number: data.testerSerialNumber,
    proving_unit_make: data.provingUnitMake,
    proving_unit_model: data.provingUnitModel,
    prove_test_prove_confirmed: data.proveTestProveConfirmed,
    confirmed_dead: data.confirmedDead,

    date_isolated: formatDateUK(data.dateIsolated),
    time_isolated: data.timeIsolated,
    person_isolating_name: data.personIsolatingName,
    person_isolating_signature: data.personIsolatingSignature,
    person_receiving_name: data.personReceivingName,
    person_receiving_position: data.personReceivingPosition,
    person_receiving_signature: data.personReceivingSignature,

    date_deisolated: formatDateUK(data.dateDeisolated),
    time_deisolated: data.timeDeisolated,
    work_completed: data.workCompleted,
    all_persons_clear: data.allPersonsClear,
    person_deisolating_name: data.personDeisolatingName,
    person_deisolating_signature: data.personDeisolatingSignature,
    person_authorising_name: data.personAuthorisingName,
    person_authorising_signature: data.personAuthorisingSignature,

    photos: data.photos,
    notes: data.notes,

    company_name: company.company_name || data.contractorCompany,
    company_address: company.company_address || '',
    company_phone: company.company_phone || data.contractorPhone,
    company_email: company.company_email || data.contractorEmail,
    // ELE-1668 — hosted URL first, data URL second. See `certBranding.ts`: the
    // data URL gets downscaled and can be stripped by the payload size guard,
    // the hosted object is fetched by the renderer at full resolution.
    // ELE-1671 — this formatter is handed the company_profiles row directly, so
    // it derives the cover palette itself rather than hopping via formData.
    ...coverPayloadKeys(brandingFromCompanyProfile(company, '#f59e0b')),
    company_logo: company.logo_url || company.logo_data_url || '',
    company_tagline: company.company_tagline || '',
    // ELE-1581 / ELE-1669 — never '': the template renders this `<img>`
    // unconditionally, so an empty src draws Chrome's broken-image glyph.
    registration_scheme_logo:
      company.scheme_logo_data_url || company.registration_scheme_logo || TRANSPARENT_PIXEL,
  };
}
