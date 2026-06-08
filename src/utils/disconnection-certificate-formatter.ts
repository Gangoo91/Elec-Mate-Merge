/**
 * Formats Disconnection Certificate form data into the PDF Monkey payload.
 * Flat camelCase keys to match the house template convention (see
 * smoke-co-alarm / testing-only / minor-works templates).
 */

function formatDateUK(dateStr: string): string {
  if (!dateStr) return '';
  try {
    const d = new Date(dateStr);
    return isNaN(d.getTime()) ? dateStr : d.toLocaleDateString('en-GB', { day: '2-digit', month: '2-digit', year: 'numeric' });
  } catch {
    return dateStr;
  }
}

const TYPE_LABELS: Record<string, string> = {
  appliance: 'Appliance',
  circuit: 'Circuit',
  both: 'Appliance & circuit',
};

export function formatDisconnectionCertificatePayload(data: Record<string, any>, company: Record<string, any> = {}): Record<string, unknown> {
  return {
    referenceNumber: data.referenceNumber,
    workDate: formatDateUK(data.workDate),

    // Contractor
    contractorName: data.contractorName,
    contractorCompany: data.contractorCompany,
    contractorPhone: data.contractorPhone,
    contractorEmail: data.contractorEmail,
    registrationScheme: data.registrationScheme || company.registration_scheme || '',
    registrationNumber: data.registrationNumber || company.registration_number || '',

    // Client
    clientName: data.clientName,
    clientPhone: data.clientPhone,
    clientEmail: data.clientEmail,
    installationAddress: data.installationAddress,

    // Disconnection details
    disconnectionType: TYPE_LABELS[data.disconnectionType] || data.disconnectionType,
    applianceDisconnected: data.applianceDisconnected,
    circuitDisconnected: data.circuitDisconnected,
    reasonForDisconnection: data.reasonForDisconnection,
    isolationMethod: data.isolationMethod,

    // Confirmation (booleans)
    madeDead: !!data.madeDead,
    terminationsSafe: !!data.terminationsSafe,
    labelled: !!data.labelled,
    noReconnectionRisk: !!data.noReconnectionRisk,
    remainderSafe: !!data.remainderSafe,
    reconnectionAdvised: !!data.reconnectionAdvised,

    // Declaration
    inspectorSignature: data.inspectorSignature,
    clientSignature: data.clientSignature,
    clientRefusedToSign: !!data.clientRefusedToSign,

    // Photos & notes
    photos: data.photos || [],
    notes: data.notes,

    // Company branding
    companyName: company.company_name || data.contractorCompany || '',
    companyAddress: company.company_address || '',
    companyPhone: company.company_phone || data.contractorPhone || '',
    companyEmail: company.company_email || data.contractorEmail || '',
    companyLogo: company.logo_data_url || company.logo_url || '',
    schemeLogo: company.scheme_logo_data_url || company.registration_scheme_logo || '',
  };
}
