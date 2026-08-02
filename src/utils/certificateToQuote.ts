/**
 * Utility functions for navigating from certificate completion to quote/invoice builders
 * with pre-filled client data and certificate attachment support.
 */

import { storageSetJSONSync } from '@/utils/storage';

// Extract UK postcode from address string
function extractPostcode(address: string): { address: string; postcode: string } {
  if (!address) return { address: '', postcode: '' };

  // UK postcode pattern: 1-2 letters, 1-2 digits, optional letter, space, digit, 2 letters
  const postcodeRegex = /\b([A-Z]{1,2}\d{1,2}[A-Z]?\s*\d[A-Z]{2})\b/i;
  const match = address.match(postcodeRegex);

  if (match) {
    const postcode = match[1].toUpperCase().replace(/\s+/, ' '); // Normalize spacing
    // Remove postcode from address and clean up trailing comma/space
    const cleanAddress = address
      .replace(postcodeRegex, '')
      .replace(/,?\s*$/, '')
      .trim();
    return { address: cleanAddress, postcode };
  }

  return { address: address.trim(), postcode: '' };
}

/** Line item carried from a certificate into the quote/invoice builders.
 * Matches the QuoteItem shape both wizards consume; extra traceability
 * fields (defectCode etc.) ride along harmlessly in the items JSON. */
export interface CertificateLineItem {
  id: string;
  description: string;
  quantity: number;
  unit: string;
  unitPrice: number;
  totalPrice: number;
  category: string;
  subcategory?: string;
  notes?: string;
  hours?: number;
  hourlyRate?: number;
  workerType?: string;
  defectCode?: string;
  defectDescription?: string;
  source?: string;
}

export interface CertificateClientData {
  clientName: string;
  clientEmail?: string;
  clientPhone?: string;
  clientAddress?: string;
  installationAddress?: string;
  certificateType:
    | 'EICR'
    | 'EIC'
    | 'Minor Works'
    | 'Emergency Lighting'
    | 'EV Charging'
    | 'PAT Testing'
    | 'Fire Alarm'
    | 'Solar PV'
    | 'BESS';
  certificateReference?: string;
  // Certificate attachment info
  reportId?: string;
  pdfUrl?: string;
  pdfStoragePath?: string;
  /** Pre-priced line items (e.g. EICR defect remedials) — pre-loaded into the builder */
  items?: CertificateLineItem[];
  /** Overrides the default job description (e.g. AI estimator scope of works) */
  jobDescription?: string;
}

interface QuoteClientData {
  client: {
    name: string;
    email: string;
    phone: string;
    address: string;
    postcode: string;
  };
  jobDetails: {
    title: string;
    description: string;
    location: string;
  };
  /** Pre-priced line items the builder pre-loads */
  items?: CertificateLineItem[];
  // Certificate link for attachment
  linkedCertificate?: {
    reportId: string;
    certificateType: string;
    certificateReference: string;
    pdfUrl?: string;
    pdfStoragePath?: string;
  };
}

/**
 * Creates a navigation URL to the quote builder with certificate client data pre-filled
 */
export function createQuoteFromCertificate(data: CertificateClientData): string {
  const sessionId = `cert-quote-${Date.now()}`;

  // Try to extract postcode from addresses
  const clientAddrParsed = extractPostcode(data.clientAddress || '');
  const installAddrParsed = extractPostcode(data.installationAddress || '');

  // Use installation address for job site, client address for billing
  // Use cleaned address (postcode removed) for the address field, full address for location
  const hasInstallAddr = data.installationAddress && data.installationAddress.trim().length > 0;
  const cleanedAddress = hasInstallAddr ? installAddrParsed.address : clientAddrParsed.address;
  const jobPostcode = installAddrParsed.postcode || clientAddrParsed.postcode || '';
  const fullAddress = data.installationAddress || data.clientAddress || '';

  const quoteData: QuoteClientData = {
    client: {
      name: data.clientName || '',
      email: data.clientEmail || '',
      phone: data.clientPhone || '',
      address: cleanedAddress,
      postcode: jobPostcode,
    },
    jobDetails: {
      title: data.certificateReference
        ? `Remedial Works - ${data.certificateReference}`
        : `Remedial Works - ${data.certificateType}`,
      description:
        data.jobDescription || `Remedial work following ${data.certificateType} inspection`,
      location: fullAddress,
    },
  };

  // Pre-loaded line items (e.g. defect remedials) — receiver maps these into the wizard
  if (data.items && data.items.length > 0) {
    quoteData.items = data.items;
  }

  // Add certificate link if reportId is available
  if (data.reportId) {
    quoteData.linkedCertificate = {
      reportId: data.reportId,
      certificateType: data.certificateType,
      certificateReference: data.certificateReference || '',
      pdfUrl: data.pdfUrl,
      pdfStoragePath: data.pdfStoragePath,
    };
  }

  storageSetJSONSync(sessionId, { certificateData: quoteData });

  return `/electrician/quote-builder/create?certificateSessionId=${sessionId}`;
}

/**
 * Creates a navigation URL to the invoice builder with certificate client data pre-filled
 */
export function createInvoiceFromCertificate(data: CertificateClientData): string {
  const sessionId = `cert-invoice-${Date.now()}`;

  // Try to extract postcode from addresses
  const clientAddrParsed = extractPostcode(data.clientAddress || '');
  const installAddrParsed = extractPostcode(data.installationAddress || '');

  // Use installation address for job site, client address for billing
  // Use cleaned address (postcode removed) for the address field, full address for location
  const hasInstallAddr = data.installationAddress && data.installationAddress.trim().length > 0;
  const cleanedAddress = hasInstallAddr ? installAddrParsed.address : clientAddrParsed.address;
  const jobPostcode = installAddrParsed.postcode || clientAddrParsed.postcode || '';
  const fullAddress = data.installationAddress || data.clientAddress || '';

  const invoiceData: QuoteClientData = {
    client: {
      name: data.clientName || '',
      email: data.clientEmail || '',
      phone: data.clientPhone || '',
      address: cleanedAddress,
      postcode: jobPostcode,
    },
    jobDetails: {
      title: data.certificateReference
        ? `${data.certificateType} - ${data.certificateReference}`
        : `${data.certificateType} Certificate`,
      description: data.jobDescription || `${data.certificateType} inspection and certification`,
      location: fullAddress,
    },
  };

  // Pre-loaded line items. When the certificate provides none, seed the
  // inspection/certification fee as an unpriced line — the invoice previously
  // arrived with ZERO items and the fee had no home (audit P1-5). The
  // electrician sets the price in the Items step before sending.
  invoiceData.items =
    data.items && data.items.length > 0
      ? data.items
      : [
          {
            id:
              typeof crypto !== 'undefined' && crypto.randomUUID
                ? crypto.randomUUID()
                : `cert-item-${Date.now()}`,
            description: data.certificateReference
              ? `${data.certificateType} inspection and certification — ${data.certificateReference}`
              : `${data.certificateType} inspection and certification`,
            quantity: 1,
            unit: 'each',
            unitPrice: 0,
            totalPrice: 0,
            category: 'labour',
          },
        ];

  // Add certificate link if reportId is available
  if (data.reportId) {
    invoiceData.linkedCertificate = {
      reportId: data.reportId,
      certificateType: data.certificateType,
      certificateReference: data.certificateReference || '',
      pdfUrl: data.pdfUrl,
      pdfStoragePath: data.pdfStoragePath,
    };
  }

  storageSetJSONSync(sessionId, { certificateData: invoiceData });

  return `/electrician/invoice-builder/create?certificateSessionId=${sessionId}`;
}
