import React, { createContext, useContext, ReactNode } from 'react';

export interface CertificatePhotoContextType {
  certificateNumber: string;
  certificateType: 'eicr' | 'eic' | 'minor-works';
  clientName: string;
  installationAddress: string;
}

const CertificatePhotoContext = createContext<CertificatePhotoContextType | undefined>(undefined);

export const useCertificatePhoto = () => {
  const context = useContext(CertificatePhotoContext);
  // Return undefined if not within provider (allows optional usage)
  return context;
};

interface CertificatePhotoProviderProps {
  children: ReactNode;
  certificateNumber: string;
  certificateType: 'eicr' | 'eic' | 'minor-works';
  clientName: string;
  installationAddress: string;
}

export const CertificatePhotoProvider: React.FC<CertificatePhotoProviderProps> = ({
  children,
  certificateNumber,
  certificateType,
  clientName,
  installationAddress,
}) => {
  const value: CertificatePhotoContextType = {
    certificateNumber,
    certificateType,
    clientName,
    installationAddress,
  };

  return (
    <CertificatePhotoContext.Provider value={value}>
      {children}
    </CertificatePhotoContext.Provider>
  );
};

/**
 * Generate a project reference from certificate data
 * Format: "{certNumber}_{clientName}_{address}"
 * Example: "EICR-2024-001_Smith-John_42-High-Street"
 */
export function generateProjectRef(data: {
  certificateNumber?: string;
  clientName?: string;
  installationAddress?: string;
}): string {
  const sanitize = (str: string) =>
    str.replace(/[^a-zA-Z0-9]/g, '-').replace(/-+/g, '-').replace(/^-|-$/g, '').slice(0, 20);

  const parts = [
    data.certificateNumber,
    data.clientName ? sanitize(data.clientName) : undefined,
    data.installationAddress
      ? sanitize(data.installationAddress.split(',')[0]?.trim() || '')
      : undefined,
  ].filter(Boolean);

  return parts.join('_') || `Certificate_${Date.now()}`;
}

/**
 * Map defect codes to photo documentation categories
 */
export function mapDefectCodeToCategory(defectCode: string): string {
  const code = defectCode.toUpperCase();
  switch (code) {
    case 'C1':
    case 'C2':
      return 'hazard_identification';
    case 'C3':
      return 'site_condition';
    case 'FI':
      return 'equipment_check';
    case 'LIM':
    case 'LIMITATION':
    case 'N/A':
    case 'NOT-APPLICABLE':
      return 'other';
    case 'UNSATISFACTORY':
      return 'hazard_identification';
    default:
      return 'site_condition';
  }
}
