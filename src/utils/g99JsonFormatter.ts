/**
 * Formats G99 Commissioning certificate form data for PDF generation.
 * Pass-through formatter — G99 PDF template uses the same camelCase
 * field names as the form, so this mainly merges branding and ensures defaults.
 *
 * EREC G99 Issue 5 — Generators >16A per phase
 */

import { G99FormData, getDefaultG99FormData } from '@/types/g99-commissioning';

interface BrandingOptions {
  companyLogo?: string;
  companyName?: string;
  companyAddress?: string;
  companyPhone?: string;
  companyEmail?: string;
}

/**
 * Main formatter — transforms G99FormData into the PDF payload.
 * Call this before sending to the generate-g99-commissioning-pdf edge function.
 */
export const formatG99Json = (
  formData: Partial<G99FormData>,
  branding?: BrandingOptions
) => {
  // Start with full defaults so every Liquid variable resolves
  const defaults = getDefaultG99FormData();

  // Merge: defaults < formData < branding overrides
  const payload = {
    ...defaults,
    ...formData,

    // Ensure boolean fields are explicit true/false (not undefined)
    dnoApprovalReceived: formData.dnoApprovalReceived ?? false,
    networkStudyRequired: formData.networkStudyRequired ?? false,
    interTripRequired: formData.interTripRequired ?? false,
    exportCapable: formData.exportCapable ?? true,
    exportLimited: formData.exportLimited ?? false,
    exportMeterFitted: formData.exportMeterFitted ?? false,
    reactivePowerVerified: formData.reactivePowerVerified ?? false,
    activePowerControlVerified: formData.activePowerControlVerified ?? false,
    frequencyResponseVerified: formData.frequencyResponseVerified ?? false,
    dnoWitnessRequired: formData.dnoWitnessRequired ?? false,
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
