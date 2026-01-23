/**
 * Utility functions for navigating from certificate completion to quote/invoice builders
 * with pre-filled client data and certificate attachment support.
 */

// Extract UK postcode from address string
function extractPostcode(address: string): { address: string; postcode: string } {
  if (!address) return { address: '', postcode: '' };

  // UK postcode pattern: 1-2 letters, 1-2 digits, optional letter, space, digit, 2 letters
  const postcodeRegex = /\b([A-Z]{1,2}\d{1,2}[A-Z]?\s*\d[A-Z]{2})\b/i;
  const match = address.match(postcodeRegex);

  if (match) {
    const postcode = match[1].toUpperCase().replace(/\s+/, ' '); // Normalize spacing
    // Remove postcode from address and clean up trailing comma/space
    const cleanAddress = address.replace(postcodeRegex, '').replace(/,?\s*$/, '').trim();
    return { address: cleanAddress, postcode };
  }

  return { address: address.trim(), postcode: '' };
}

export interface CertificateClientData {
  clientName: string;
  clientEmail?: string;
  clientPhone?: string;
  clientAddress?: string;
  installationAddress?: string;
  certificateType: 'EICR' | 'EIC' | 'Minor Works';
  certificateReference?: string;
  // Certificate attachment info
  reportId?: string;
  pdfUrl?: string;
  pdfStoragePath?: string;
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
      description: `Remedial work following ${data.certificateType} inspection`,
      location: fullAddress,
    },
  };

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

  sessionStorage.setItem(sessionId, JSON.stringify({ certificateData: quoteData }));

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
      description: `${data.certificateType} inspection and certification`,
      location: fullAddress,
    },
  };

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

  sessionStorage.setItem(sessionId, JSON.stringify({ certificateData: invoiceData }));

  return `/electrician/invoice-builder/create?certificateSessionId=${sessionId}`;
}
