/**
 * Formats BESS certificate form data for PDF generation.
 * Pass-through formatter — BESS PDF template uses the same camelCase
 * field names as the form, so this mainly merges branding and ensures defaults.
 *
 * IET Code of Practice for EESS (3rd Ed) + MCS MIS 3012:2025
 * BS 7671:2018+A3:2024 + PAS 63100:2024
 */

import { BESSFormData, getDefaultBESSFormData } from '@/types/bess';

interface BrandingOptions {
  companyLogo?: string;
  companyName?: string;
  companyAddress?: string;
  companyPhone?: string;
  companyEmail?: string;
  companyTagline?: string;
  companyAccentColor?: string;
  companyWebsite?: string;
  registrationScheme?: string;
  registrationNumber?: string;
  registrationSchemeLogo?: string;
}

/**
 * Main formatter — transforms BESSFormData into the PDF payload.
 * Call this before sending to the generate-bess-pdf edge function.
 */
export const formatBESSJson = (
  formData: Partial<BESSFormData>,
  branding?: BrandingOptions
) => {
  // Start with full defaults so every Liquid variable resolves
  const defaults = getDefaultBESSFormData();

  // Merge: defaults < formData < branding overrides
  const payload = {
    ...defaults,
    ...formData,

    // Ensure boolean fields are boolean (not undefined)
    associatedPV: formData.associatedPV ?? false,
    iec62619Compliant: formData.iec62619Compliant ?? true,
    epsEnabled: formData.epsEnabled ?? false,
    exportLimited: formData.exportLimited ?? false,
    pmeRiskAssessment: formData.pmeRiskAssessment ?? false,
    locationSuitable: formData.locationSuitable ?? true,
    warningSignageInstalled: formData.warningSignageInstalled ?? false,
    emergencyShutdownProvided: formData.emergencyShutdownProvided ?? false,
    fireServiceInfoProvided: formData.fireServiceInfoProvided ?? false,
    pas63100Applicable: formData.pas63100Applicable ?? true,
    notInSleepingRoom: formData.notInSleepingRoom ?? false,
    notInEscapeRoute: formData.notInEscapeRoute ?? false,
    notInLoftOrVoid: formData.notInLoftOrVoid ?? false,
    notInBasementNoAccess: formData.notInBasementNoAccess ?? false,
    enclosureNonCombustible: formData.enclosureNonCombustible ?? false,
    enclosureToolAccessOnly: formData.enclosureToolAccessOnly ?? false,
    dcFusesToolAccessOnly: formData.dcFusesToolAccessOnly ?? false,
    ik10Protection: formData.ik10Protection ?? false,
    audibleBatteryWarning: formData.audibleBatteryWarning ?? false,
    ventilationToOutdoors: formData.ventilationToOutdoors ?? false,
    ventPortMinDistance: formData.ventPortMinDistance ?? false,
    labelAtOrigin: formData.labelAtOrigin ?? false,
    labelAtMeteringPoint: formData.labelAtMeteringPoint ?? false,
    labelAtMainCU: formData.labelAtMainCU ?? false,
    labelAtIsolationPoints: formData.labelAtIsolationPoints ?? false,
    batteryEnclosureLabel: formData.batteryEnclosureLabel ?? false,
    dcIsolationLabelled: formData.dcIsolationLabelled ?? false,
    emergencyProcedureDisplayed: formData.emergencyProcedureDisplayed ?? false,
    afddInstalled: formData.afddInstalled ?? false,
    pas63100Compliant: formData.pas63100Compliant ?? false,
    dcPolarityVerified: formData.dcPolarityVerified ?? false,
    monitoringConfirmed: formData.monitoringConfirmed ?? false,
    portalRegistered: formData.portalRegistered ?? false,
    cloudMonitoringWorking: formData.cloudMonitoringWorking ?? false,
    firmwaresCurrent: formData.firmwaresCurrent ?? false,
    exportMeterFitted: formData.exportMeterFitted ?? false,
    smartMeterFitted: formData.smartMeterFitted ?? false,
    segRegistered: formData.segRegistered ?? false,
    operatingInstructionsProvided: formData.operatingInstructionsProvided ?? false,
    emergencyShutdownExplained: formData.emergencyShutdownExplained ?? false,
    maintenanceScheduleProvided: formData.maintenanceScheduleProvided ?? false,
    customerAppSetup: formData.customerAppSetup ?? false,
    dnoNotificationCopyProvided: formData.dnoNotificationCopyProvided ?? false,
    mcsCertificateProvided: formData.mcsCertificateProvided ?? false,
    warrantyRegistered: formData.warrantyRegistered ?? false,
    buildingControlNotified: formData.buildingControlNotified ?? false,

    // Ensure arrays have defaults
    photos: formData.photos ?? [],

    // Company branding
    companyLogo: branding?.companyLogo ?? '',
    companyName: branding?.companyName ?? formData.installerCompany ?? '',
    companyAddress: branding?.companyAddress ?? '',
    companyPhone: branding?.companyPhone ?? '',
    companyEmail: branding?.companyEmail ?? '',
    companyTagline: branding?.companyTagline ?? '',
    companyAccentColor: branding?.companyAccentColor ?? '#3b82f6',
    companyWebsite: branding?.companyWebsite ?? '',
    registrationScheme: branding?.registrationScheme ?? '',
    registrationNumber: branding?.registrationNumber ?? '',
    registrationSchemeLogo: branding?.registrationSchemeLogo ?? '',
  };

  return payload;
};
