/**
 * Formats Lightning Protection certificate form data for PDF generation.
 * BS EN 62305-3 Inspection & Testing
 *
 * Merges defaults, form data, and branding. Ensures all booleans are explicit.
 */

import {
  LightningProtectionFormData,
  getDefaultLightningProtectionFormData,
  TEST_INTERVAL,
} from '@/types/lightning-protection';

interface BrandingOptions {
  companyLogo?: string;
  companyName?: string;
  companyAddress?: string;
  companyPhone?: string;
  companyEmail?: string;
  registrationSchemeLogo?: string;
  registrationScheme?: string;
  registrationNumber?: string;
}

/** Form data may carry branding keys merged in at generate time. */
type FormDataWithBranding = Partial<LightningProtectionFormData> & BrandingOptions;

/** Next complete test due — interval from LPS class (2y Class I/II, 4y Class III/IV). */
const calcNextInspectionDue = (inspectionDate?: string, lpsClass?: string): string => {
  if (!inspectionDate || !lpsClass) return '';
  const interval = TEST_INTERVAL[lpsClass] || 4;
  const d = new Date(inspectionDate);
  if (isNaN(d.getTime())) return '';
  d.setFullYear(d.getFullYear() + interval);
  return d.toISOString().split('T')[0];
};

/** Next visual inspection due — always 1 year from inspection date. */
const calcNextVisualDue = (inspectionDate?: string): string => {
  if (!inspectionDate) return '';
  const d = new Date(inspectionDate);
  if (isNaN(d.getTime())) return '';
  d.setFullYear(d.getFullYear() + 1);
  return d.toISOString().split('T')[0];
};

/**
 * Main formatter — transforms LightningProtectionFormData into the PDF payload.
 * Call this before sending to the generate-lightning-protection-pdf edge function.
 */
export const formatLightningProtectionJson = (
  formData: FormDataWithBranding,
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

    // Next-due dates — the UI auto-calculates these for display but only writes
    // them to formData on manual edit, so fall back to the same calculation here.
    nextInspectionDue:
      formData.nextInspectionDue ||
      calcNextInspectionDue(formData.inspectionDate, formData.lpsClass || ''),
    nextVisualInspectionDue:
      formData.nextVisualInspectionDue || calcNextVisualDue(formData.inspectionDate),

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

    // Company branding — prefer the branding arg, then any branding keys already
    // merged into formData (generate path / pdf_payload regen). Never force-blank.
    companyLogo: branding?.companyLogo ?? formData.companyLogo ?? '',
    companyName: branding?.companyName ?? formData.companyName ?? formData.contractorCompany ?? '',
    companyAddress: branding?.companyAddress ?? formData.companyAddress ?? '',
    companyPhone: branding?.companyPhone ?? formData.companyPhone ?? '',
    companyEmail: branding?.companyEmail ?? formData.companyEmail ?? '',
    registrationSchemeLogo:
      branding?.registrationSchemeLogo ?? formData.registrationSchemeLogo ?? '',
    registrationScheme: branding?.registrationScheme ?? formData.registrationScheme ?? '',
    registrationNumber: branding?.registrationNumber ?? formData.registrationNumber ?? '',
  };

  return payload;
};
