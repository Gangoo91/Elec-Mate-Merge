/**
 * Formats BESS certificate form data for PDF generation.
 * Pass-through formatter — BESS PDF template uses the same camelCase
 * field names as the form, so this mainly merges branding and ensures defaults.
 *
 * IET Code of Practice for EESS (3rd Ed) + MCS MIS 3012:2025
 * BS 7671:2018+A4:2026 + PAS 63100:2024
 */

import { BESSFormData, getDefaultBESSFormData } from '@/types/bess';
import { supabase } from '@/integrations/supabase/client';

const UUID_REGEX =
  /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

/**
 * Fetch this report's photo evidence and return public URLs matching
 * BESSFormData.photos (string[]). Photos live in the inspection_photos
 * table (written by useInspectionPhotos) — nothing ever writes
 * formData.photos, so callers must inject this at generate/email time.
 * URLs are resized via Supabase image transform (EICR pattern) so
 * PDFMonkey embeds small rasters and the emailed PDF stays under the
 * attachment limit.
 */
export const fetchBESSReportPhotos = async (reportId: string): Promise<string[]> => {
  try {
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (!user) return [];

    // inspection_photos.report_id holds the reports table UUID, not the
    // BESS-xxx report_id string — resolve it first (same as useInspectionPhotos).
    const { data: report } = await supabase
      .from('reports')
      .select('id')
      .eq('report_id', reportId)
      .eq('user_id', user.id)
      .maybeSingle();
    const reportUuid = report?.id || (UUID_REGEX.test(reportId) ? reportId : null);
    if (!reportUuid) return [];

    const { data: photoRows } = await supabase
      .from('inspection_photos')
      .select('file_path')
      .eq('report_id', reportUuid)
      .order('uploaded_at');

    return (photoRows || []).map((photo) => {
      const {
        data: { publicUrl },
      } = supabase.storage.from('inspection-photos').getPublicUrl(photo.file_path, {
        transform: { width: 1000, height: 1400, resize: 'contain', quality: 60 },
      });
      return publicUrl;
    });
  } catch {
    return [];
  }
};

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
    gridProtectionVerified: formData.gridProtectionVerified ?? false,
    iec62619Compliant: formData.iec62619Compliant ?? true,
    epsEnabled: formData.epsEnabled ?? false,
    exportLimited: formData.exportLimited ?? false,
    pmeRiskAssessment: formData.pmeRiskAssessment ?? false,
    locationSuitable: formData.locationSuitable ?? true,
    warningSignageInstalled: formData.warningSignageInstalled ?? false,
    emergencyShutdownProvided: formData.emergencyShutdownProvided ?? false,
    fireServiceInfoProvided: formData.fireServiceInfoProvided ?? false,
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
    allLabelsFitted: formData.allLabelsFitted ?? false,
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

  // CertificateClientSection stores selectedCustomerId in formData for CRM
  // linking — it is internal state, not certificate data; keep it out of the PDF.
  delete (payload as Record<string, unknown>).selectedCustomerId;

  return payload;
};
