/**
 * Formats Disconnection Certificate form data into the PDF Monkey payload.
 * Flat camelCase keys to match the house template convention (see
 * smoke-co-alarm / testing-only / minor-works templates).
 */
import { TRANSPARENT_PIXEL } from '@/utils/resolveSchemeLogo';
import { brandingFromCompanyProfile } from '@/utils/certBranding';
import { coverPayloadKeys } from '@/utils/certCoverPayload';

/** Disconnection's house colour, used until the electrician sets their own. */
export const DISCONNECTION_ACCENT = '#f59e0b';

function formatDateUK(dateStr: string): string {
  if (!dateStr) return '';
  try {
    const d = new Date(dateStr);
    return isNaN(d.getTime())
      ? dateStr
      : d.toLocaleDateString('en-GB', { day: '2-digit', month: '2-digit', year: 'numeric' });
  } catch {
    return dateStr;
  }
}

const TYPE_LABELS: Record<string, string> = {
  appliance: 'Appliance',
  circuit: 'Circuit',
  both: 'Appliance & circuit',
};

/**
 * The loose shapes this formatter is handed. Declared once so the lint
 * exemption sits on the type rather than on a signature line — the previous
 * `eslint-disable-next-line` covered only the `export function` line, so it
 * stopped applying the moment the parameters wrapped onto their own lines.
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any -- pre-existing loose form-data shape
type LooseRecord = Record<string, any>;

export function formatDisconnectionCertificatePayload(
  data: LooseRecord,
  company: LooseRecord = {}
): Record<string, unknown> {
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
    // ELE-1671 — this formatter is handed the company_profiles row directly, so
    // it derives the cover palette itself rather than hopping via formData.
    ...coverPayloadKeys(brandingFromCompanyProfile(company, '#f59e0b')),
    companyLogo: company.logo_url || company.logo_data_url || '',
    schemeLogo:
      company.scheme_logo_data_url || company.registration_scheme_logo || TRANSPARENT_PIXEL,
    companyWebsite: company.company_website || '',
    // Primary is the colour an electrician means by "my colour" (Settings →
    // Business → Brand); accent is read as a fallback. Falls back to the
    // certificate's own amber when neither is set.
    companyAccentColor: company.primary_color || company.accent_color || DISCONNECTION_ACCENT,
  };
}
