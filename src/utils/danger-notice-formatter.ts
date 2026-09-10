/**
 * Formats Danger Notice form data into PDF Monkey payload.
 * Flattens the data structure and formats dates for UK display.
 */
import { TRANSPARENT_PIXEL } from '@/utils/resolveSchemeLogo';
import { brandingFromCompanyProfile } from '@/utils/certBranding';
import { coverPayloadKeys } from '@/utils/certCoverPayload';

interface DangerEntry {
  id: string;
  descriptionOfDanger: string;
  locationWithinInstallation: string;
  regulationRef: string;
  riskOfFire: boolean;
  riskOfElectricShock: boolean;
  riskOfBurns: boolean;
  riskOfInjury: boolean;
  riskOther: boolean;
  riskOtherDescription: string;
  immediateActionTaken: string;
  remedialActionRequired: string;
  circuitIsolated: boolean;
  isolationDetails: string;
  photos: string[];
}

interface DangerNoticeFormData {
  referenceNumber: string;
  date: string;
  time: string;
  linkedEicrId: string;
  linkedEicrCertNumber: string;
  contractorName: string;
  contractorCompany: string;
  contractorAddress: string;
  contractorPhone: string;
  contractorEmail: string;
  registrationScheme: string;
  registrationNumber: string;
  clientName: string;
  clientPosition: string;
  clientAddress: string;
  clientPhone: string;
  clientEmail: string;
  installationAddressDifferent: boolean;
  installationAddress: string;
  installationPostcode: string;
  dangers: DangerEntry[];
  declarationText: string;
  contractorSignature: string;
  acknowledgementText: string;
  clientSignature: string;
  clientRefusedToSign: boolean;
  witnessName: string;
  witnessSignature: string;
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
  // The real `company_profiles` columns. This interface declared a
  // `company_logo` that is not a column, while the body read `logo_data_url` /
  // `logo_url`, which are — the declared and used shapes had drifted apart.
  logo_data_url?: string;
  logo_url?: string;
  // What SchemeLogoPicker actually writes; reading only
  // `registration_scheme_logo` missed it.
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

export function formatDangerNoticePayload(
  data: DangerNoticeFormData,
  company: CompanyInfo = {}
): Record<string, unknown> {
  const installationAddress = data.installationAddressDifferent
    ? `${data.installationAddress}${data.installationPostcode ? ', ' + data.installationPostcode : ''}`
    : data.clientAddress;

  return {
    // Reference
    reference_number: data.referenceNumber,
    date: formatDateUK(data.date),
    time: data.time,

    // Linked EICR
    linked_eicr_id: data.linkedEicrId,
    linked_eicr_cert_number: data.linkedEicrCertNumber,

    // Contractor
    contractor_name: data.contractorName,
    contractor_company: data.contractorCompany,
    contractor_address: data.contractorAddress,
    contractor_phone: data.contractorPhone,
    contractor_email: data.contractorEmail,
    registration_scheme: data.registrationScheme || company.registration_scheme || '',
    registration_number: data.registrationNumber || company.registration_number || '',

    // Client
    client_name: data.clientName,
    client_position: data.clientPosition,
    client_address: data.clientAddress,
    client_phone: data.clientPhone,
    client_email: data.clientEmail,

    // Installation
    installation_address: installationAddress,
    installation_address_different: data.installationAddressDifferent,
    installation_postcode: data.installationPostcode,

    // Dangers array (for Liquid template {% for danger in dangers %})
    dangers: data.dangers.map((d, idx) => ({
      number: idx + 1,
      description: d.descriptionOfDanger,
      location: d.locationWithinInstallation,
      regulation_ref: d.regulationRef,
      risk_of_fire: d.riskOfFire,
      risk_of_electric_shock: d.riskOfElectricShock,
      risk_of_burns: d.riskOfBurns,
      risk_of_injury: d.riskOfInjury,
      risk_other: d.riskOther,
      risk_other_description: d.riskOtherDescription,
      immediate_action_taken: d.immediateActionTaken,
      remedial_action_required: d.remedialActionRequired,
      circuit_isolated: d.circuitIsolated,
      isolation_details: d.isolationDetails,
      photos: d.photos,
    })),

    // Signatures
    declaration_text: data.declarationText,
    contractor_signature: data.contractorSignature,
    acknowledgement_text: data.acknowledgementText,
    client_signature: data.clientSignature,
    client_refused_to_sign: data.clientRefusedToSign,
    witness_name: data.witnessName,
    witness_signature: data.witnessSignature,

    // Company branding
    company_name: company.company_name || data.contractorCompany,
    company_address: company.company_address || data.contractorAddress,
    company_phone: company.company_phone || data.contractorPhone,
    company_email: company.company_email || data.contractorEmail,
    // ELE-1671 — this formatter is handed the company_profiles row directly, so
    // it derives the cover palette itself rather than hopping via formData.
    ...coverPayloadKeys(brandingFromCompanyProfile(company, '#dc2626')),
    company_logo: company.logo_url || company.logo_data_url || '',
    company_tagline: company.company_tagline || '',
    registration_scheme_logo:
      company.scheme_logo_data_url || company.registration_scheme_logo || TRANSPARENT_PIXEL,
  };
}
