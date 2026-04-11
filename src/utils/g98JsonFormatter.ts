/**
 * Formats G98 Commissioning certificate form data for PDF generation.
 * Pass-through formatter — G98 PDF template uses the same camelCase
 * field names as the form, so this mainly merges branding and ensures defaults.
 *
 * EREC G98 Issue 5 — Generators ≤16A per phase
 */

interface BrandingOptions {
  companyLogo?: string;
  companyName?: string;
  companyAddress?: string;
  companyPhone?: string;
  companyEmail?: string;
}

/** G98 default protection settings (EREC G98 Issue 5) */
const G98_DEFAULTS: Record<string, string> = {
  ovStage1Voltage: '264.0',
  ovStage1Time: '1.0',
  ovStage2Voltage: '276.0',
  ovStage2Time: '0.5',
  uvStage1Voltage: '207.0',
  uvStage1Time: '1.5',
  uvStage2Voltage: '195.5',
  uvStage2Time: '0.5',
  ofStage1Freq: '50.4',
  ofStage1Time: '0.5',
  ofStage2Freq: '52.0',
  ofStage2Time: '0.5',
  ufStage1Freq: '47.5',
  ufStage1Time: '0.5',
  ufStage2Freq: '47.0',
  ufStage2Time: '0.5',
  rocoFRate: '1.0',
  rocoFTime: '0.5',
  reconnectionDelay: '60',
};

const getDefaultG98Data = (): Record<string, any> => ({
  referenceNumber: '',
  commissioningDate: '',
  notificationDate: '',
  dnoName: '',
  // Installer
  installerName: '',
  installerCompany: '',
  installerPhone: '',
  installerEmail: '',
  mcsNumber: '',
  registrationScheme: '',
  registrationNumber: '',
  // Site
  installationAddress: '',
  mpan: '',
  supplyType: 'single-phase',
  earthingArrangement: '',
  // Equipment
  equipmentType: '',
  equipmentManufacturer: '',
  equipmentModel: '',
  equipmentSerial: '',
  ratedOutput: '',
  numberOfPhases: '1',
  typeTestCertRef: '',
  inverterManufacturer: '',
  inverterModel: '',
  associatedCertRef: '',
  // Export
  exportCapable: true,
  exportLimited: false,
  exportLimit: '',
  exportMeterFitted: false,
  exportMeterSerial: '',
  segSupplier: '',
  // Protection settings
  ...G98_DEFAULTS,
  // Commissioning confirmation
  antiIslandingConfirmed: false,
  protectionSettingsVerified: false,
  systemOperating: false,
  labelsApplied: false,
  customerInformed: false,
  // Signatures
  installerSignature: '',
  installerDate: '',
  customerSignature: '',
  customerDate: '',
  notes: '',
  // Form state
  completedSections: {},
  status: 'draft',
  // Branding
  companyLogo: '',
  companyName: '',
  companyAddress: '',
  companyPhone: '',
  companyEmail: '',
});

/**
 * Main formatter — transforms G98 form data into the PDF payload.
 * Call this before sending to the generate-g98-commissioning-pdf edge function.
 */
export const formatG98Json = (
  formData: Record<string, any>,
  branding?: BrandingOptions,
) => {
  // Start with full defaults so every Liquid variable resolves
  const defaults = getDefaultG98Data();

  // Merge: defaults < formData < branding overrides
  const payload: Record<string, any> = {
    ...defaults,
    ...formData,

    // Ensure boolean fields are explicit true/false (not undefined)
    exportCapable: formData.exportCapable ?? true,
    exportLimited: formData.exportLimited ?? false,
    exportMeterFitted: formData.exportMeterFitted ?? false,
    antiIslandingConfirmed: formData.antiIslandingConfirmed ?? false,
    protectionSettingsVerified: formData.protectionSettingsVerified ?? false,
    systemOperating: formData.systemOperating ?? false,
    labelsApplied: formData.labelsApplied ?? false,
    customerInformed: formData.customerInformed ?? false,

    // Branding overrides
    ...(branding?.companyLogo && { companyLogo: branding.companyLogo }),
    ...(branding?.companyName && { companyName: branding.companyName }),
    ...(branding?.companyAddress && { companyAddress: branding.companyAddress }),
    ...(branding?.companyPhone && { companyPhone: branding.companyPhone }),
    ...(branding?.companyEmail && { companyEmail: branding.companyEmail }),
  };

  return payload;
};
