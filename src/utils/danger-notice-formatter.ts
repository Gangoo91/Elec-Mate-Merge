/**
 * Formats Danger Notice form data into PDF Monkey payload.
 * Flattens the data structure and formats dates for UK display.
 */

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
  company_logo?: string;
  company_tagline?: string;
  registration_scheme?: string;
  registration_number?: string;
  registration_scheme_logo?: string;
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
    company_logo: company.logo_data_url || company.logo_url || '',
    company_tagline: company.company_tagline || '',
    registration_scheme_logo: company.registration_scheme_logo || '',
  };
}
