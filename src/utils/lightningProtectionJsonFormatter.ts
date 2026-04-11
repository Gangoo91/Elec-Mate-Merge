/**
 * Formats Lightning Protection certificate form data for PDF generation.
 * BS EN 62305-3 Inspection & Testing
 *
 * Merges defaults, form data, and branding. Ensures all booleans are explicit.
 */

import { LightningProtectionFormData, getDefaultLightningProtectionFormData } from '@/types/lightning-protection';

interface BrandingOptions {
  companyLogo?: string;
  companyName?: string;
  companyAddress?: string;
  companyPhone?: string;
  companyEmail?: string;
}

/**
 * Main formatter — transforms LightningProtectionFormData into the PDF payload.
 * Call this before sending to the generate-lightning-protection-pdf edge function.
 */
export const formatLightningProtectionJson = (
  formData: Partial<LightningProtectionFormData>,
  branding?: BrandingOptions
) => {
  // Start with full defaults so every Liquid variable resolves
  const defaults = getDefaultLightningProtectionFormData();

  // Merge: defaults < formData < branding overrides
  const payload = {
    ...defaults,
    ...formData,

    // Ensure boolean fields are explicit true/false
    strikeCounterFitted: formData.strikeCounterFitted ?? false,
    riskAssessmentCompliant: formData.riskAssessmentCompliant ?? false,
    lpsDrawingAttached: formData.lpsDrawingAttached ?? false,
    hasTestLimitations: formData.hasTestLimitations ?? false,
    spd1Fitted: formData.spd1Fitted ?? false,
    spd2Fitted: formData.spd2Fitted ?? false,
    spd3Fitted: formData.spd3Fitted ?? false,

    // Ensure nested booleans in servicesBonded
    servicesBonded: {
      electrical: formData.servicesBonded?.electrical ?? false,
      gas: formData.servicesBonded?.gas ?? false,
      water: formData.servicesBonded?.water ?? false,
      telecoms: formData.servicesBonded?.telecoms ?? false,
      structuralSteel: formData.servicesBonded?.structuralSteel ?? false,
      hvac: formData.servicesBonded?.hvac ?? false,
      other: formData.servicesBonded?.other ?? '',
    },

    // Ensure arrays have defaults
    visualInspection: formData.visualInspection ?? defaults.visualInspection,
    earthElectrodeTests: formData.earthElectrodeTests ?? defaults.earthElectrodeTests,
    downConductorTests: formData.downConductorTests ?? defaults.downConductorTests,
    bondingTests: formData.bondingTests ?? defaults.bondingTests,
    spdChecks: formData.spdChecks ?? [],
    separationChecks: formData.separationChecks ?? [],
    observations: formData.observations ?? [],
    photos: formData.photos ?? [],

    // Company branding
    companyLogo: branding?.companyLogo ?? '',
    companyName: branding?.companyName ?? formData.contractorCompany ?? '',
    companyAddress: branding?.companyAddress ?? '',
    companyPhone: branding?.companyPhone ?? '',
    companyEmail: branding?.companyEmail ?? '',
  };

  return payload;
};
